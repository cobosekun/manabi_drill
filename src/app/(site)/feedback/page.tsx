"use client";

// ══════════════════════════════════════════
// /feedback — フィードバック投稿フォーム（「フィードバックはこちら」の宛先）
// /api/feedback に JSON を POST。迷惑メール対策はサーバ側で多層実施するが、
// クライアントでも 2 つ仕込む:
//   - ハニーポット: 画面外の隠しフィールド website（人間は触れない）
//   - 送信タイミング: マウント時刻 ts を一緒に送る（極端に速い投稿を弾くため）
// 既存のデザイン言語（暖色グラデ・角丸・大きなタップ領域）に合わせる。
// ══════════════════════════════════════════

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CATEGORIES = ["ふぐあい", "ようぼう", "かんそう", "そのほか"] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function FeedbackPage() {
  const tsRef = useRef<number>(0);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("かんそう");
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
      setErrorMsg("通信に失敗しました。時間をおいて もう一度お試しください。");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-center">
          <div className="text-6xl" aria-hidden>
            💬
          </div>
          <h1 className="mt-3 text-2xl font-extrabold text-gray-800 sm:text-3xl">
            フィードバックはこちら
          </h1>
          <p className="mt-2 text-gray-600">
            お気づきの点・ごようぼう・かんそうを お聞かせください。
            <br className="hidden sm:block" />
            いただいた内容は今後の改善に活用します。
          </p>
        </div>

        {status === "sent" ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-md ring-2 ring-white">
            <div className="text-5xl" aria-hidden>
              🎉
            </div>
            <h2 className="mt-3 text-xl font-bold text-emerald-600">
              送信しました！
            </h2>
            <p className="mt-2 text-gray-600">
              ありがとうございます。とても はげみになります。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded-full bg-white px-6 py-3 font-bold text-orange-500 shadow ring-2 ring-orange-200 transition active:scale-95 hover:bg-orange-50"
              >
                つづけて送る
              </button>
              <Link
                href="/"
                className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 font-bold text-white shadow transition active:scale-95 hover:scale-105"
              >
                ホームへ
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-md ring-2 ring-white sm:p-8"
          >
            {/* ハニーポット（画面外・スクリーンリーダーからも隠す） */}
            <div aria-hidden className="absolute left-[-9999px] top-[-9999px]" >
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

            {/* カテゴリ */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                しゅるい
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition active:scale-95 ${
                      category === c
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow"
                        : "bg-orange-50 text-orange-500 ring-2 ring-orange-100 hover:bg-orange-100"
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
                className="mb-2 block text-sm font-bold text-gray-700"
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
                placeholder="例）◯◯の問題のこたえが まちがっているようです／△△の教科をふやしてほしい など"
                className="w-full resize-y rounded-2xl border-4 border-gray-200 p-4 text-base outline-none focus:border-orange-400"
              />
              <p className="mt-1 text-right text-xs text-gray-400">
                {message.length} / 2000
              </p>
            </div>

            {/* 連絡先（任意） */}
            <div>
              <label
                htmlFor="fb-contact"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                お返事用の連絡先（任意・メールアドレスなど）
              </label>
              <input
                id="fb-contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={200}
                autoComplete="email"
                placeholder="返信が不要なら 空のままでOK"
                className="w-full rounded-2xl border-4 border-gray-200 p-3 text-base outline-none focus:border-orange-400"
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="rounded-2xl bg-rose-50 p-3 text-sm font-bold text-rose-600 ring-2 ring-rose-100"
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-lg ring-4 ring-white transition active:scale-95 hover:scale-[1.02] disabled:opacity-60"
            >
              {status === "sending" ? "送信中…" : "送信する"}
            </button>

            <p className="text-center text-xs text-gray-400">
              ※ 迷惑メール対策のため、送信に少し条件があります。うまくいかない場合は
              時間をおいてお試しください。
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

function errorTextFor(httpStatus: number, code?: string): string {
  if (httpStatus === 429 || code === "rate_limited") {
    return "送信が続いたため、一時的に制限されています。少し時間をおいてください。";
  }
  if (code === "not_configured") {
    return "ただいま送信機能の準備中です。お手数ですが時間をおいてお試しください。";
  }
  if (code === "empty") return "メッセージを入力してください。";
  if (code === "too_long") return "入力が長すぎます。短くしてお試しください。";
  if (code === "timing") {
    return "送信に失敗しました。ページを開き直して もう一度お試しください。";
  }
  return "送信に失敗しました。時間をおいて もう一度お試しください。";
}
