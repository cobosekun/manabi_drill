import Link from "next/link";
import { RubyText } from "@/components/drill/RubyText";

// (kids) グループのクローム = 子ども向けヘッダー/フッター。
// 大きなタップ領域・高コントラスト・ひらがな・絵文字で、子どもが一人で迷わず使える導線。
export default function KidsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 全ページ共通の子ども向けヘッダ（おうち＝トップへ戻る大きなタップ領域）。 */}
      <header className="sticky top-0 z-50 border-b-4 border-amber-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
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
          {/* 保護者向け紹介ページ（LP）への控えめな導線。 */}
          <Link
            href="/about"
            className="flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-bold text-amber-800/80 transition hover:bg-amber-100 active:scale-95"
          >
            おうちの方へ
          </Link>
        </div>
      </header>
      {children}
      {/* 全ページ共通フッタ。フィードバック導線を常に見える場所に置く。 */}
      <footer className="mt-8 border-t-2 border-amber-100 bg-white/60 px-4 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-sm sm:flex-row sm:justify-between">
          <p className="font-bold text-amber-800/70">まなびドリル</p>
          <nav className="flex items-center gap-4">
            <Link
              href="/about"
              className="font-bold text-amber-800/70 transition hover:text-amber-900"
            >
              おうちの方へ
            </Link>
            <Link
              href="/feedback"
              className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-4 py-2 font-bold text-orange-600 transition hover:bg-orange-200 active:scale-95"
            >
              <span aria-hidden>💬</span>
              フィードバックはこちら
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
