import type { Metadata } from "next";
import Link from "next/link";
import { RubyText } from "@/components/drill/RubyText";
import "./globals.css";

export const metadata: Metadata = {
  title: "まなびドリル — 小学生のがくしゅうドリル",
  description: "小学1〜6年生の さんすう・こくご・えいご・りか・しゃかい などを楽しく練習できる学習ドリルアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {/* 全ページ共通の子ども向けヘッダ（おうち＝トップへ戻る大きなタップ領域）。 */}
        <header className="sticky top-0 z-50 border-b-4 border-amber-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Link
              href="/"
              aria-label="おうちにもどる"
              className="flex min-h-14 items-center gap-2 rounded-2xl bg-amber-100 px-5 py-3 text-2xl font-bold text-amber-900 shadow-sm transition active:scale-95 hover:bg-amber-200"
            >
              <span aria-hidden="true" className="text-3xl leading-none">
                🏠
              </span>
              <RubyText text="おうち" />
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
