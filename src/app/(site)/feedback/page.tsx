"use client";

// ══════════════════════════════════════════
// /feedback — フィードバック投稿フォーム（「フィードバックはこちら」の宛先）
// /api/feedback に JSON を POST。迷惑メール対策はサーバ側で多層実施するが、
// クライアントでも 2 つ仕込む:
//   - ハニーポット: 画面外の隠しフィールド website（人間は触れない）
//   - 送信タイミング: マウント時刻 ts を一緒に送る（極端に速い投稿を弾くため）
// デザインは保護者(大人)向け：白基調・slate文字・amber差し色・漢字主体（/about と統一）。
// ※ CATEGORIES は API(/api/feedback) 側の検証値と一致させること。
// ══════════════════════════════════════════

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CATEGORIES = ["不具合", "要望", "感想", "その他"] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function FeedbackPage() {
  const tsRef = useRef<number>(0);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("感想");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // ハニーポット
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    tsRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (message.trim() === "") {
      setErrorMsg("メッセージを入力してください。");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          message: message.trim(),
          contact: contact.trim(),
          website, // 空であるべき
          ts: tsRef.current,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        setMessage("");
        setContact("");
      } else {
        setStatus("error");
        setErrorMsg(errorTextFor(res.status, json?.error));
      }
    } catch {
      setStatus("error");
      setErrorMsg("通信に失敗しました。時間を置いてもう一度お試しください。");
    }
  }

  return (
    <main className="bg-white text-slate-800">
      <div className="mx-auto w-full max-w-xl px-6 py-16">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            フィードバック
          </h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            お気付きの点・ご要望・ご感想をお聞かせください。いただいた内容は今後の改善に活用します。
          </p>
        </header>

        {status === "sent" ? (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
              ✓
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              送信しました
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              ありがとうございます。今後の改善の励みになります。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                続けて送る
              </button>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
              >
                ホームへ
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* ハニーポット（画面外・スクリーンリーダーからも隠す） */}
            <div aria-hidden className="absolute left-[-9999px] top-[-9999px]">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            {/* 種類 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                種類
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      category === c
                        ? "bg-amber-600 text-white"
                        : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* メッセージ */}
            <div>
              <label
                htmlFor="fb-message"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                メッセージ <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="fb-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                maxLength={2000}
                required
                placeholder="例）◯◯の問題の答えが間違っているようです／△△の教科を増やしてほしい など"
                className="w-full resize-y rounded-lg border border-slate-300 p-3 text-base text-slate-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
              <p className="mt-1 text-right text-xs text-slate-400">
                {message.length} / 2000
              </p>
            </div>

            {/* 連絡先（任意） */}
            <div>
              <label
                htmlFor="fb-contact"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                返信先（任意・メールアドレスなど）
              </label>
              <input
                id="fb-contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={200}
                autoComplete="email"
                placeholder="返信が不要な場合は空欄のままで構いません"
                className="w-full rounded-lg border border-slate-300 p-3 text-base text-slate-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-600"
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-amber-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:opacity-60"
            >
              {status === "sending" ? "送信中…" : "送信する"}
            </button>

            <p className="text-xs leading-relaxed text-slate-400">
              ※ 迷惑メール対策のため、送信に一定の条件を設けています。うまく送信できない場合は、時間を置いてお試しください。
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

function errorTextFor(httpStatus: number, code?: string): string {
  if (httpStatus === 429 || code === "rate_limited") {
    return "送信が続いたため、一時的に制限されています。少し時間を置いてください。";
  }
  if (code === "not_configured") {
    return "現在、送信機能を準備中です。お手数ですが時間を置いてお試しください。";
  }
  if (code === "empty") return "メッセージを入力してください。";
  if (code === "too_long") return "入力が長すぎます。短くしてお試しください。";
  if (code === "timing") {
    return "送信に失敗しました。ページを開き直してもう一度お試しください。";
  }
  return "送信に失敗しました。時間を置いてもう一度お試しください。";
}
