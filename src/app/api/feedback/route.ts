// ══════════════════════════════════════════
// POST /api/feedback — フィードバック送信（Resend でメール送信）
// 迷惑メール対策を多層で実施（「ある程度」のセキュリティ）:
//   1. Vercel BotID         … bot 検知（next.config の withBotId + layout の BotIdClient と対）
//   2. ハニーポット          … 人間が触れない隠しフィールドが埋まっていたら拒否
//   3. 送信タイミング        … フォーム表示から極端に速い投稿（bot）を拒否
//   4. レート制限            … 同一IPの短時間連投を拒否（warm instance 内のベストエフォート）
//   5. 入力バリデーション    … 必須/型/最大長を検査し、巨大ペイロードを弾く
// 宛先・差出人・APIキーは環境変数（リポジトリに秘密を置かない）。
//   RESEND_API_KEY        : 必須。Resend の API キー（Vercel env に設定）
//   FEEDBACK_TO_EMAIL     : 任意。既定 kce.hello@gmail.com
//   FEEDBACK_FROM_EMAIL   : 任意。既定 "まなびドリル <onboarding@resend.dev>"
// ══════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";

export const runtime = "nodejs";

// ── 制限値 ──
const MIN_SUBMIT_MS = 2_500; // これより速い投稿は bot とみなす
const MAX_FORM_AGE_MS = 60 * 60 * 1000; // フォームが古すぎる（1時間超）投稿は拒否
const RATE_WINDOW_MS = 60_000; // レート制限の時間窓
const RATE_MAX = 3; // 窓内の最大送信回数/IP
const MAX_MESSAGE_LEN = 2_000;
const MAX_CONTACT_LEN = 200;
// クライアント(/feedback)の選択肢と一致させること。
const CATEGORIES = ["不具合", "要望", "感想", "その他"] as const;

// ── レート制限（warm instance 内のメモリ。完全ではないが「ある程度」を満たす）──
const hits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // メモリ肥大防止: たまに古いエントリを掃除
  if (hits.size > 5_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_MAX;
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  // 1. BotID（失敗時はフェイルオープン: 他の対策で守る。実ユーザーを誤ブロックしない）
  try {
    const verdict = await checkBotId();
    if (verdict.isBot) {
      return NextResponse.json({ ok: false, error: "bot" }, { status: 403 });
    }
  } catch {
    // BotID 未設定/エラー時は素通り（honeypot/timing/rate-limit が残る）
  }

  // 4. レート制限
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  // ボディ取得
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const data = (body ?? {}) as Record<string, unknown>;

  // 2. ハニーポット（隠しフィールド website が埋まっていたら bot）
  if (typeof data.website === "string" && data.website.trim() !== "") {
    // bot には成功を装って静かに破棄（再試行を誘発しない）
    return NextResponse.json({ ok: true });
  }

  // 3. 送信タイミング
  const ts = Number(data.ts);
  const age = Date.now() - ts;
  if (!Number.isFinite(ts) || age < MIN_SUBMIT_MS || age > MAX_FORM_AGE_MS) {
    return NextResponse.json({ ok: false, error: "timing" }, { status: 400 });
  }

  // 5. バリデーション
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const contact = typeof data.contact === "string" ? data.contact.trim() : "";
  const category =
    typeof data.category === "string" &&
    (CATEGORIES as readonly string[]).includes(data.category)
      ? data.category
      : "その他";

  if (message.length === 0) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LEN || contact.length > MAX_CONTACT_LEN) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }

  // 送信（Resend）
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[feedback] RESEND_API_KEY 未設定のため送信できません");
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const to = process.env.FEEDBACK_TO_EMAIL || "kce.hello@gmail.com";
  const from =
    process.env.FEEDBACK_FROM_EMAIL || "まなびドリル <onboarding@resend.dev>";
  const ua = req.headers.get("user-agent") ?? "unknown";

  const text = [
    `カテゴリ: ${category}`,
    `連絡先: ${contact || "（なし）"}`,
    "",
    "── 内容 ──",
    message,
    "",
    "──────────",
    `IP: ${ip}`,
    `UA: ${ua}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[まなびドリル] フィードバック（${category}）`,
      replyTo: contact && contact.includes("@") ? contact : undefined,
      text,
    });
    if (error) {
      console.error("[feedback] Resend エラー:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("[feedback] 送信例外:", e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
