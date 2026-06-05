// ══════════════════════════════════════════
// /about — 保護者向け紹介ページ（マーケLP）
// 子ども向けの利用フロー(/)は触らず、端末を渡す前の「保護者」に
// 価値・安心（登録不要・無料・データ収集なし）・対応範囲を伝える。
// 主CTAは「アプリを始める」→ / （登録もメール収集もしない）。
// 数値・対応学年・教科は src/data（curriculum）から実データで生成し、
// 実態にない実績・お客様の声・ロゴは載せない（誇張しない）。
// デザインは保護者(大人)向け：落ち着いた配色・抑えた装飾・漢字主体の日本語。
// （固有名詞「まなびドリル」と外来語・助詞等の仮名標準語は除き、漢字化する）
// サーバーコンポーネント（SEO/OGP重視・クライアントJS不要）。
// ══════════════════════════════════════════

import type { Metadata } from "next";
import Link from "next/link";
import { getSubjects, getGrades } from "@/lib/curriculum-query";
import { curriculum } from "@/data/curriculum";
import { rubyToPlainText } from "@/components/drill/RubyText";

export const metadata: Metadata = {
  title: "まなびドリル｜小学生のための無料・登録不要の学習ドリル",
  description:
    "小学1〜6年生が、算数・国語・英語・理科・社会など9教科を、一人でも繰り返し練習できる無料の学習ドリル。登録不要・データ収集なし・端末内だけに進捗を保存。漢字には振り仮名付き。",
};

// 大人向けページ用の教科名（漢字表記）。データ側の表示名は子ども向けに
// かな主体（さんすう/こくご 等）のため、この面では漢字名で上書きする。
const SUBJECT_NAME_JA: Record<string, string> = {
  sansuu: "算数",
  kokugo: "国語",
  eigo: "英語",
  rika: "理科",
  shakai: "社会",
  seikatsu: "生活",
  kyoyo: "教養",
  oyo: "応用",
  it: "情報",
};

// 教科ごとの保護者向けの短い説明（実態に沿った範囲で）。
const SUBJECT_BLURB: Record<string, string> = {
  sansuu: "足し算・引き算から、掛け算・割り算・分数まで",
  kokugo: "漢字・語彙・文章読解（漢字には振り仮名付き）",
  eigo: "アルファベット・単語・基礎的な英語に触れる",
  rika: "自然・生き物・身近な現象を観察して学ぶ",
  shakai: "暮らし・地図・歴史など社会の仕組みを知る",
  seikatsu: "身の回りの発見から学ぶ楽しさを育てる",
  kyoyo: "幅広い教養で世界への興味を広げる",
  oyo: "思考力を鍛える、やや発展的な問題",
  it: "コンピュータ・情報との付き合い方の基礎",
};

export default function AboutPage() {
  const subjects = getSubjects();
  const unitCount = curriculum.units.length;
  const subjectCount = subjects.length;

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* ── Hero ── */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-amber-50/40 to-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center sm:py-28">
          <p className="inline-block rounded-full border border-amber-200 bg-white px-4 py-1.5 text-sm font-medium text-amber-700">
            小学1〜6年生・全{subjectCount}教科・無料
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            子供が自分のペースで続けられる、シンプルな学習ドリル
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            まなびドリルは、小学生が一人でも取り組める Web
            学習ドリルです。アカウント登録もログインも不要で、全て無料。算数・国語・英語など{subjectCount}教科を、学年に合わせて繰り返し練習できます。
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-amber-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              アプリを始める
            </Link>
            <a
              href="#features"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              特長を見る
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            インストール不要・ブラウザですぐにご利用いただけます
          </p>
        </div>
      </section>

      {/* ── 数値（実データ＝誇張なし）── */}
      <section className="border-b border-slate-100">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 divide-x divide-slate-100 px-6 sm:grid-cols-4">
          {[
            { n: `${subjectCount}`, label: "教科" },
            { n: "1〜6", label: "対応学年" },
            { n: `${unitCount}`, label: "単元" },
            { n: "無料", label: "利用料金" },
          ].map((s) => (
            <div key={s.label} className="px-2 py-8 text-center">
              <div className="text-3xl font-bold text-slate-900 sm:text-4xl">
                {s.n}
              </div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            こんな場面はありませんか
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "丸付けの負担",
                text: "紙のドリルは採点や答え合わせに、毎回どうしても手間が掛かります。",
              },
              {
                title: "反復のしづらさ",
                text: "同じ問題ばかりになりがちで、繰り返し練習の準備が大変です。",
              },
              {
                title: "一人だと続かない",
                text: "保護者が付き添えないと、子供だけでは学習が進みにくいことも。",
              },
            ].map((p) => (
              <li
                key={p.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 特長（Value / Features）── */}
      <section id="features" className="scroll-mt-20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            まなびドリルの特長
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "即時フィードバック",
                body: "解答するとすぐに正誤が分かります。間違いにその場で気付き、理解しながら進められます。",
              },
              {
                title: "「学ぶ」→「テスト」の2段階",
                body: "各単元に易しい解説を用意。内容を理解してから問題に取り組めます。",
              },
              {
                title: "漢字に振り仮名",
                body: "まだ読めない漢字にも読み仮名を表示。低学年の子供も一人で操作できます。",
              },
              {
                title: "学習の進捗を可視化",
                body: "どこまで進んだかを「学びの地図」で確認でき、達成感が続きます。",
              },
              {
                title: "印刷してオフラインでも",
                body: "プリント機能で紙の練習にも対応。デジタルと紙を使い分けられます。",
              },
              {
                title: "スマホ・タブレット対応",
                body: "見やすい配色と十分な大きさのボタンで、タッチ操作に最適化しています。",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white p-6">
                <h3 className="text-base font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 教科一覧（実データ）── */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            全{subjectCount}教科に対応
          </h2>
          <p className="mt-3 text-center text-slate-500">
            学年に合わせて、ちょうど良い単元から始められます。
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const grades = getGrades(subject.id);
              const name =
                SUBJECT_NAME_JA[subject.id] ?? rubyToPlainText(subject.name);
              const gradeLabel =
                grades.length > 0
                  ? `${grades[0]}〜${grades[grades.length - 1]}年`
                  : "";
              return (
                <li
                  key={subject.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900">
                      {name}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                      {gradeLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {SUBJECT_BLURB[subject.id] ?? ""}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── How it works ── */}
      <section>
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            使い方は3ステップ
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "教科と学年を選ぶ",
                body: "トップ画面で教科を選び、お子様の学年を選択します。",
              },
              {
                step: "02",
                title: "「学ぶ」で理解する",
                body: "図やアニメーション付きの解説で、要点を確認します。",
              },
              {
                step: "03",
                title: "「テスト」で確かめる",
                body: "問題に取り組み、その場で答え合わせ。繰り返し練習できます。",
              },
            ].map((s) => (
              <li key={s.step}>
                <div className="text-sm font-semibold text-amber-600">
                  {s.step}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 安心（保護者向けプライバシー）── */}
      <section className="bg-slate-900 text-slate-100">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              安心してお使いいただけます
            </h2>
            <p className="mt-3 text-slate-400">
              子供が使うものだからこそ、データの扱いはシンプルにしています。
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {[
              "アカウント登録・ログインは不要です",
              "個人情報やメールアドレスを収集しません",
              "進捗はご利用の端末（ブラウザ）内にのみ保存し、サーバーへは送信しません",
              "広告は表示しません",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800/60 p-4"
              >
                <span className="mt-0.5 text-amber-400" aria-hidden>
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-slate-200">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section>
        <div className="mx-auto w-full max-w-3xl px-6 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            よくあるご質問
          </h2>
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {[
              {
                q: "料金は掛かりますか？",
                a: "いいえ。全ての教科・単元を無料でご利用いただけます。課金や有料プランはありません。",
              },
              {
                q: "アカウント登録は必要ですか？",
                a: "不要です。ページを開けばすぐに学習を始められます。",
              },
              {
                q: "進捗はどこに保存されますか？",
                a: "ご利用の端末のブラウザ内（localStorage）にのみ保存します。サーバーへの送信や端末間の同期は行いません。そのため、ブラウザのデータを削除したり別の端末で開いた場合、進捗は引き継がれません。",
              },
              {
                q: "対応している学年・教科は？",
                a: `小学1〜6年生に対応し、全${subjectCount}教科・${unitCount}単元を用意しています（教科によって対応学年は異なります）。`,
              },
              {
                q: "オフラインでも使えますか？",
                a: "学習の中心はオンラインのアプリですが、印刷ページからプリントすれば紙でのオフライン学習も可能です。",
              },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-medium text-slate-900 marker:content-none">
                  <span>{item.q}</span>
                  <span
                    className="text-slate-400 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    ＋
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-slate-100 bg-amber-50/50">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            まずは試してみてください
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            登録なし・無料で、今すぐ学習を始められます。
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-amber-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            アプリを始める
          </Link>
        </div>
      </section>
    </main>
  );
}
