import Link from "next/link";

// (site) グループのクローム = 保護者(大人)向けヘッダー/フッター。
// /about の刷新デザインに合わせ、白基調・slate文字・amber差し色の落ち着いたトーン。
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/about"
            className="text-lg font-bold tracking-tight text-slate-900"
          >
            まなびドリル
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/feedback"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline-flex"
            >
              フィードバック
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              アプリをはじめる
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row">
          <p className="font-semibold text-slate-700">まなびドリル</p>
          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-slate-500 transition hover:text-slate-900"
            >
              このアプリについて
            </Link>
            <Link
              href="/feedback"
              className="text-slate-500 transition hover:text-slate-900"
            >
              フィードバック
            </Link>
            <Link
              href="/"
              className="text-slate-500 transition hover:text-slate-900"
            >
              アプリをはじめる
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
