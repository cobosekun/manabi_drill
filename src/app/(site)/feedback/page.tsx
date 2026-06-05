"use client";

// ══════════════════════════════════════════
// /feedback — フィードバック投稿フォーム（「フィードバックはこちら」の宛先）
// メール送信は端末のメーラーに委ねる（mailto:）。サーバ送信・API キー・bot 対策
// は持たない（no-backend 方針）。送信ボタンを押すと、入力内容を件名・本文に
// 差し込んだ状態でメール作成画面が開く。
// デザインは保護者(大人)向け：白基調・slate文字・amber差し色・漢字主体（/about と統一）。
// ══════════════════════════════════════════

import { useState } from "react";
import Link from "next/link";

// 受信先メールアドレス（公開しても問題ない問い合わせ用アドレス）。
const FEEDBACK_TO = "kce.hello@gmail.com";

const CATEGORIES = ["不具合", "要望", "感想", "その他"] as const;

type Status = "idle" | "opened";

export default function FeedbackPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("感想");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  // メーラーを開いた後は、フォールバック（直接送付先）を案内する画面に切り替える。
  const [status, setStatus] = useState<Status>("idle");

  function buildMailto(): string {
    const subject = `[まなびドリル] フィードバック（${category}）`;
    const body = [
      `カテゴリ: ${category}`,
      `連絡先: ${contact.trim() || "（なし）"}`,
      "",
      "── 内容 ──",
      message.trim(),
    ].join("\n");
    return `mailto:${FEEDBACK_TO}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim() === "") {
      setError("メッセージを入力してください。");
      return;
    }
    setError("");
    // 端末のメール作成画面を開く（内容を差し込み済み）。
    window.location.href = buildMailto();
    setStatus("opened");
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

        {status === "opened" ? (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
              ✉
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              メール作成画面を開きました
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              ご利用のメールソフトに切り替わります。そのまま送信してください。
              <br />
              画面が開かない場合は、お手数ですが下記のアドレス宛に直接お送りください。
            </p>
            <p className="mt-4 select-all rounded-lg bg-slate-50 px-4 py-2 font-mono text-sm text-slate-800">
              {FEEDBACK_TO}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                入力に戻る
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

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-amber-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              メールで送る
            </button>

            <p className="text-xs leading-relaxed text-slate-400">
              ※ ボタンを押すと、ご利用のメールソフトに内容を差し込んだ状態で送信画面が開きます。内容を確認してそのまま送信してください。
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
