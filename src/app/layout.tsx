import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "まなびドリル — 小学生のがくしゅうドリル",
  description:
    "小学1〜6年生の さんすう・こくご・えいご・りか・しゃかい などを楽しく練習できる学習ドリルアプリ",
};

// ルートレイアウトは html/body のみを持つ。
// ヘッダー/フッターは route group ごとのレイアウトに分離する：
//   (kids) … 子ども向けクローム  /  (site) … 保護者(大人)向けクローム
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
