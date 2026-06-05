// ══════════════════════════════════════════
// /about — 保護者向けランディングページ（マーケLP）
// 子ども向けの利用フロー(/)は触らず、端末を渡す前の「おうちの方」に
// 価値・安心（登録不要・無料・データ収集なし）・対応範囲を伝える。
// 主CTAは「アプリをはじめる」→ / （登録もメール収集もしない）。
// 数値・対応学年・教科は src/data（curriculum）から実データで生成し、
// 実態にない実績・お客様の声・ロゴは載せない（誇張しない）。
// 既存のデザイン言語（暖色グラデ・角丸・絵文字・theme色）に揃える。
// サーバーコンポーネント（SEO/OGP重視・クライアントJS不要）。
// ══════════════════════════════════════════

import type { Metadata } from "next";
import Link from "next/link";
import { getSubjects, getGrades } from "@/lib/curriculum-query";
import { curriculum } from "@/data/curriculum";
import { getTheme } from "@/lib/theme";
import { rubyToPlainText } from "@/components/drill/RubyText";

export const metadata: Metadata = {
  title: "まなびドリル｜小学生のための無料・登録不要の学習ドリル",
  description:
    "小学1〜6年生が、さんすう・こくご・英語・りか・しゃかいなど9教科を、一人で楽しく繰り返し練習できる無料の学習ドリル。登録不要・データ収集なし・端末内だけに進捗を保存。漢字にはふりがな付き。",
};

// 教科ごとの保護者向けの短い説明（実態に沿った範囲で）。
const SUBJECT_BLURB: Record<string, string> = {
  sansuu: "たし算・ひき算から、かけ算・わり算・分数まで",
  kokugo: "漢字・ことば・文章の読み取り（漢字はふりがな付き）",
  eigo: "アルファベット・単語・かんたんな英語にふれる",
  rika: "しぜん・生きもの・身近なふしぎを観察して学ぶ",
  shakai: "くらし・地図・歴史など社会のしくみを知る",
  seikatsu: "身のまわりの発見から「学ぶ楽しさ」をはぐくむ",
  kyoyo: "はば広い教養・雑学で世界への興味を広げる",
  oyo: "考える力をきたえる、ちょっと歯ごたえのある問題",
  it: "コンピュータ・情報とのつきあい方のきほん",
};

export default function AboutPage() {
  const subjects = getSubjects();
  const unitCount = curriculum.units.length;
  const subjectCount = subjects.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {/* ── Hero ── */}
        <section className="text-center">
          <div className="mb-4 text-7xl animate-float" aria-hidden>
            🎒
          </div>
          <p className="mb-3 inline-block rounded-full bg-white/80 px-4 py-1 text-sm font-bold text-orange-500 ring-2 ring-orange-100">
            小学1〜6年生・全{subjectCount}教科・ぜんぶ無料
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-gray-800 sm:text-5xl">
            おうちで、一人でも。
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              楽しく続く学習ドリル
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            「まなびドリル」は、小学生が自分のペースで くりかえし練習できる
            Web アプリです。
            <strong className="font-bold text-gray-800">
              登録もログインも不要。完全無料
            </strong>
            。端末を渡すだけで、子どもが一人で「まなぶ→テスト」を進められます。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-14 items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-xl font-bold text-white shadow-lg ring-4 ring-white transition-transform hover:scale-105 active:scale-95"
            >
              <span aria-hidden>▶</span>
              アプリをはじめる
            </Link>
            <a
              href="#how"
              className="inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-7 py-4 text-lg font-bold text-orange-500 shadow-md ring-2 ring-orange-200 transition-transform hover:scale-105 active:scale-95"
            >
              つかい方を見る
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            ※ インストール不要・ブラウザですぐ使えます
          </p>
        </section>

        {/* ── 数値バー（実データ＝誇張なし）── */}
        <section
          aria-label="このアプリの規模"
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            { n: `${subjectCount}`, label: "教科" },
            { n: "1〜6", label: "学年" },
            { n: `${unitCount}`, label: "単元（ユニット）" },
            { n: "¥0", label: "ずっと無料" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-3xl bg-white p-5 text-center shadow-md ring-2 ring-white"
            >
              <div className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
                {s.n}
              </div>
              <div className="mt-1 text-sm font-bold text-gray-500">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* ── Problem ── */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 sm:text-3xl">
            こんなお悩み、ありませんか？
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                emoji: "📝",
                text: "紙のドリルは、採点や丸つけが毎回たいへん。",
              },
              {
                emoji: "🔁",
                text: "同じ問題ばかりで、くりかえし練習がしづらい。",
              },
              {
                emoji: "🙋",
                text: "子どもが一人だと、なかなか進められない。",
              },
            ].map((p) => (
              <li
                key={p.text}
                className="rounded-3xl bg-white/80 p-6 text-center shadow-sm ring-2 ring-white"
              >
                <div className="text-4xl" aria-hidden>
                  {p.emoji}
                </div>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  {p.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 特長（Value / Features）── */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 sm:text-3xl">
            まなびドリルの特長
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                emoji: "✅",
                title: "その場で○×・即時フィードバック",
                body: "答えたらすぐに正解・不正解がわかるから、まちがいに気づいてすぐ直せます。",
              },
              {
                emoji: "📚",
                title: "「まなぶ」→「テスト」の2ステップ",
                body: "各単元にやさしい解説があり、理解してから問題に挑戦できます。",
              },
              {
                emoji: "🈂️",
                title: "漢字にふりがな・ひらがな主体のUI",
                body: "まだ読めない漢字にも読みがなが付き、小さな子でも一人で操作できます。",
              },
              {
                emoji: "🗺️",
                title: "まなびの地図で進みが見える",
                body: "どこまで進んだかが地図でわかるので、達成感が続きます。",
              },
              {
                emoji: "🖨️",
                title: "印刷してオフラインでも",
                body: "プリントして紙でも練習可能。デジタルと紙を使い分けられます。",
              },
              {
                emoji: "📱",
                title: "スマホ・タブレット対応",
                body: "大きなボタンと見やすい配色で、タッチ操作に最適化しています。",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl bg-white p-6 shadow-md ring-2 ring-white"
              >
                <div className="text-4xl" aria-hidden>
                  {f.emoji}
                </div>
                <h3 className="mt-3 text-lg font-bold text-gray-800">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 教科一覧（実データ）── */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 sm:text-3xl">
            ぜんぶで{subjectCount}教科
          </h2>
          <p className="mt-2 text-center text-gray-500">
            学年に合わせて、ちょうどよい単元から始められます。
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const theme = getTheme(subject.theme);
              const grades = getGrades(subject.id);
              const name = rubyToPlainText(subject.name);
              const gradeLabel =
                grades.length > 0
                  ? `${grades[0]}〜${grades[grades.length - 1]}年`
                  : "";
              return (
                <li
                  key={subject.id}
                  className={`rounded-3xl p-5 shadow-md ring-2 ring-white ${theme.softGradient}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl" aria-hidden>
                      {subject.emoji}
                    </span>
                    <div>
                      <div className={`text-lg font-extrabold ${theme.strongText}`}>
                        {name}
                      </div>
                      <div className={`text-xs font-bold ${theme.accentText}`}>
                        {gradeLabel}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {SUBJECT_BLURB[subject.id] ?? ""}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="mt-16 scroll-mt-20">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 sm:text-3xl">
            つかい方は3ステップ
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "1",
                emoji: "🎯",
                title: "教科と学年をえらぶ",
                body: "トップで好きな教科をタップし、学年を選びます。",
              },
              {
                step: "2",
                emoji: "📖",
                title: "「まなぶ」で理解する",
                body: "イラストやアニメ付きの解説で、ポイントを確認。",
              },
              {
                step: "3",
                emoji: "✏️",
                title: "「テスト」で力だめし",
                body: "問題に挑戦して、その場で答え合わせ。くりかえし練習。",
              },
            ].map((s) => (
              <li
                key={s.step}
                className="relative rounded-3xl bg-white p-6 text-center shadow-md ring-2 ring-white"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-1 text-sm font-bold text-white shadow">
                  STEP {s.step}
                </div>
                <div className="mt-3 text-5xl" aria-hidden>
                  {s.emoji}
                </div>
                <h3 className="mt-3 text-lg font-bold text-gray-800">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 安心（保護者向けプライバシー）── */}
        <section className="mt-16 rounded-3xl bg-white p-8 shadow-md ring-2 ring-white sm:p-10">
          <div className="text-center">
            <div className="text-5xl" aria-hidden>
              🔒
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-gray-800 sm:text-3xl">
              安心して使えます
            </h2>
            <p className="mt-2 text-gray-500">
              子どもが使うものだから、データの扱いはシンプルにしています。
            </p>
          </div>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {[
              "アカウント登録・ログインは不要です",
              "個人情報やメールアドレスを集めません",
              "進捗はお使いの端末（ブラウザ）の中だけに保存され、サーバーには送りません",
              "広告は表示しません",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-2xl bg-green-50 p-4 ring-2 ring-green-100"
              >
                <span className="text-xl text-green-600" aria-hidden>
                  ✔
                </span>
                <span className="text-sm leading-relaxed text-gray-700">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 sm:text-3xl">
            よくある質問
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {[
              {
                q: "料金はかかりますか？",
                a: "いいえ。すべての教科・単元を無料で使えます。課金や有料プランはありません。",
              },
              {
                q: "アカウント登録は必要ですか？",
                a: "不要です。ページを開けばすぐに練習を始められます。",
              },
              {
                q: "進捗はどこに保存されますか？",
                a: "お使いの端末のブラウザ内（localStorage）にのみ保存します。サーバーへの送信や同期は行いません。そのため、ブラウザのデータを消したり別の端末で開くと進捗は引き継がれません。",
              },
              {
                q: "対応している学年・教科は？",
                a: `小学1〜6年生に対応し、全${subjectCount}教科・${unitCount}単元を用意しています（教科によって対応学年は異なります）。`,
              },
              {
                q: "オフラインでも使えますか？",
                a: "練習の中心はオンラインのアプリですが、印刷ページからプリントすれば紙でもオフライン練習ができます。",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-white p-5 shadow-sm ring-2 ring-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-bold text-gray-800 marker:content-none">
                  <span>{item.q}</span>
                  <span
                    className="text-orange-400 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    ＋
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="mt-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 p-10 text-center text-white shadow-lg">
          <div className="text-5xl" aria-hidden>
            🎒
          </div>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            さっそく、はじめてみましょう
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            登録なし・無料で、今すぐ練習をスタートできます。
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-9 py-4 text-xl font-bold text-orange-500 shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <span aria-hidden>▶</span>
            アプリをはじめる
          </Link>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-14 border-t-2 border-orange-100 pt-8 text-center text-sm text-gray-400">
          <p className="font-bold text-gray-500">まなびドリル</p>
          <p className="mt-1">
            小学生のための、無料・登録不要の学習ドリル
          </p>
        </footer>
      </div>
    </main>
  );
}
