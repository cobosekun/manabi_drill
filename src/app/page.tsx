"use client";

// ══════════════════════════════════════════
// トップページ（slot7 再設計）
// 全教科グリッド → 教科tapで学年えらび → /select/[subject]/[grade] へ。
// ロードマップ(/roadmap)への導線も用意。子どもが一人で迷わず使えるよう
// 大きなタップ領域・高コントラスト・ひらがなナビ・教科カラー(theme)で構成。
// 表示テキストは必ず <RubyText> 経由（データの {漢字|よみ} 記法をルビ表示）。
// 共有API @/lib/curriculum-query（slot5実装）のシグネチャ前提で import。
// ══════════════════════════════════════════

import { useState } from "react";
import Link from "next/link";
import type { Subject, Grade } from "@/types/curriculum";
import { getSubjects, getGrades } from "@/lib/curriculum-query";
import { getTheme } from "@/lib/theme";
import { RubyText } from "@/components/drill/RubyText";

export default function HomePage() {
  const subjects = getSubjects();
  // 選択中の教科。null のあいだは教科グリッド、選ぶと学年えらびを表示。
  const [selected, setSelected] = useState<Subject | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex flex-col items-center p-4 sm:p-6">
      <div className="max-w-3xl w-full">
        {/* ── ヘッダー ── */}
        <header className="text-center mt-6 mb-8">
          <div className="text-6xl mb-3 animate-float">🎒</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
            <RubyText text="まなびドリル" />
          </h1>
          <p className="text-orange-500 text-lg mt-2">
            {selected ? (
              <RubyText text="なんねんせい？" />
            ) : (
              <RubyText text="きょうかを えらんでね！" />
            )}
          </p>
        </header>

        {selected === null ? (
          /* ── 教科グリッド ── */
          <section aria-label="きょうか">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {subjects.map((subject) => {
                const theme = getTheme(subject.theme);
                return (
                  <li key={subject.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(subject)}
                      className={`w-full min-h-36 rounded-3xl p-5 flex flex-col items-center justify-center gap-2 text-white shadow-lg ring-4 ring-white transition-transform hover:scale-105 active:scale-95 ${theme.primaryButton}`}
                    >
                      <span className="text-5xl" aria-hidden>
                        {subject.emoji}
                      </span>
                      <span className="text-xl font-bold drop-shadow-sm">
                        <RubyText text={subject.name} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          /* ── 学年えらび ── */
          <GradePicker subject={selected} onBack={() => setSelected(null)} />
        )}

        {/* ── ロードマップ導線（常時表示） ── */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-lg font-bold text-indigo-600 shadow-md ring-2 ring-indigo-200 transition-transform hover:scale-105 active:scale-95"
          >
            <span className="text-2xl" aria-hidden>
              🗺️
            </span>
            <RubyText text="まなびの{地図|ちず}を みる" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── 学年えらび（選んだ教科の開講学年だけ出す）──
function GradePicker({
  subject,
  onBack,
}: {
  subject: Subject;
  onBack: () => void;
}) {
  const theme = getTheme(subject.theme);
  const grades: Grade[] = getGrades(subject.id);

  return (
    <section aria-label="がくねん">
      {/* 選択中の教科の見出し */}
      <div
        className={`mb-6 rounded-3xl p-5 flex items-center justify-center gap-3 text-white shadow-md ${theme.primaryButton}`}
      >
        <span className="text-4xl" aria-hidden>
          {subject.emoji}
        </span>
        <span className="text-2xl font-bold">
          <RubyText text={subject.name} />
        </span>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {grades.map((grade) => (
          <li key={grade}>
            <Link
              href={`/select/${subject.id}/${grade}`}
              className={`w-full min-h-28 rounded-3xl p-4 flex flex-col items-center justify-center gap-1 bg-white shadow-md ring-2 ring-white transition-transform hover:scale-105 active:scale-95 ${theme.softGradient}`}
            >
              <span className={`text-4xl font-extrabold ${theme.strongText}`}>
                {grade}
              </span>
              <span className={`text-base font-bold ${theme.accentText}`}>
                <RubyText text="ねんせい" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* もどる導線 */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-bold text-gray-600 shadow-md ring-2 ring-gray-200 transition-transform hover:scale-105 active:scale-95"
        >
          <span className="text-xl" aria-hidden>
            ←
          </span>
          <RubyText text="きょうかえらびに もどる" />
        </button>
      </div>
    </section>
  );
}
