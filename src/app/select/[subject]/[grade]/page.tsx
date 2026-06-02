"use client";

// ══════════════════════════════════════════
// 単元えらび画面（slot11）— トップ → ここ → learn/test の中間導線
// ルート: /select/[subject]/[grade]
//   getUnitsByGrade(subject, grade) で単元一覧を order 順に表示し、
//   各単元に「まなぶ」(/learn) と「テスト」(/test) ボタン＋進捗バッジを出す。
// 子ども向け: 大きいタップ領域・高コントラスト・ナビ文言はひらがな。
// 表示テキストは必ず <RubyText> 経由（データは {漢字|よみ} 記法入り）。
// 進捗は localStorage（@/lib/storage の loadJSON）。サーバ送信なし。
// 共有API（@/lib/curriculum-query）はシグネチャ確定済み前提で import。
// ══════════════════════════════════════════

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Grade, SubjectId } from "@/types/curriculum";
import { getSubject, getGrades, getUnitsByGrade } from "@/lib/curriculum-query";
import { getTheme } from "@/lib/theme";
import { loadJSON } from "@/lib/storage";
import { BackLink, RubyText } from "@/components/drill";

// ── 進捗の読み取り規約 ──────────────────────
// 単元単位の進捗を 1つの map（unitId -> 達成情報）で localStorage に持つ前提。
// 書き込みは learn(slot8)/test(slot9) が担当。ここでは読み取りのみ・防御的に扱う
// （未実装・別形でも badge を出さないだけで壊れない）。型は UnitProgress を緩く反映。
const PROGRESS_KEY = "drill-unit-progress";

interface UnitProgressLite {
  learnCompleted?: boolean;
  bestScore?: number; // 0-100
  cleared?: boolean;
}
type ProgressMap = Record<string, UnitProgressLite>;

// 進捗を localStorage から購読する外部ストア（useSyncExternalStore 用）。
// SSR/ハイドレーション時は getServerSnapshot の安定空オブジェクトを使い不整合を回避し、
// マウント後にクライアント値へ自動で切替わる（effect 内の同期 setState を排除）。
// 書き手(learn/test)は値更新後に PROGRESS_EVENT を dispatch すれば同一タブでも即反映される。
const PROGRESS_EVENT = "drill-unit-progress-update";
const EMPTY_PROGRESS: ProgressMap = {};

// getSnapshot は安定参照を返す必要があるため raw 文字列が変わらない限り同じ参照を返す。
let _cacheRaw: string | null = null;
let _cacheValue: ProgressMap = EMPTY_PROGRESS;

function subscribeProgress(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(PROGRESS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PROGRESS_EVENT, callback);
  };
}

function getProgressSnapshot(): ProgressMap {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(PROGRESS_KEY);
  } catch {
    raw = null;
  }
  if (raw === _cacheRaw) return _cacheValue;
  _cacheRaw = raw;
  _cacheValue = loadJSON<ProgressMap>(PROGRESS_KEY, EMPTY_PROGRESS);
  return _cacheValue;
}

function getProgressServerSnapshot(): ProgressMap {
  return EMPTY_PROGRESS;
}

const GRADE_LABEL = ["", "1ねんせい", "2ねんせい", "3ねんせい", "4ねんせい", "5ねんせい", "6ねんせい"];

export default function SelectUnitsPage() {
  const params = useParams<{ subject: string; grade: string }>();
  const subjectId = params.subject as SubjectId;
  const gradeNum = Number(params.grade);

  const subject = getSubject(subjectId);
  const validGrade =
    Number.isInteger(gradeNum) &&
    !!subject &&
    getGrades(subjectId).includes(gradeNum as Grade);
  const grade = gradeNum as Grade;

  const theme = getTheme(subject?.theme);

  // 進捗バッジ用 localStorage を外部ストアとして購読。
  // SSR は空 {}、マウント後にクライアント値へ自動切替（同期 setState なし）。
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getProgressServerSnapshot,
  );

  // ── 無効な教科/学年 → 子どもにもわかる案内 ──
  if (!subject || !validGrade) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-6xl" aria-hidden>
          🤔
        </div>
        <p className="text-xl font-bold text-gray-600 text-center">
          この きょうかや がくねんは みつからなかったよ。
        </p>
        <BackLink href="/" label="← トップへ もどる" />
      </main>
    );
  }

  const units = getUnitsByGrade(subjectId, grade);

  return (
    <main className={`min-h-screen ${theme.softGradient} px-4 py-6 sm:px-6`}>
      <div className="mx-auto w-full max-w-2xl">
        {/* ── ヘッダ（戻る導線＋見出し） ── */}
        <header className="mb-6">
          <BackLink href="/" label="← きょうかえらび" theme={subject.theme} />
          <div className="mt-3 flex items-center gap-3">
            <span className="text-5xl" aria-hidden>
              {subject.emoji}
            </span>
            <div>
              <h1 className={`text-3xl font-extrabold ${theme.accentText}`}>
                <RubyText text={subject.name} />
              </h1>
              <p className={`text-lg font-bold ${theme.mutedText}`}>
                {GRADE_LABEL[grade]} ・ たんげんを えらんでね
              </p>
            </div>
          </div>
        </header>

        {/* ── 単元一覧 ── */}
        {units.length === 0 ? (
          <p className="text-center text-lg font-bold text-gray-500 py-12">
            この がくねんの たんげんは じゅんびちゅうだよ。
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {units.map((unit, i) => {
              const p = progress[unit.id];
              // learn/test ルートは [unit] に slug を期待し unitId=subject.g{grade}.{slug} を再合成する。
              // ここでフルIDを渡すと二重接頭辞で notFound になるため slug を抽出して渡す。
              const slug = unit.id.split(".").slice(2).join(".");
              const base = `/${subjectId}/${grade}/${slug}`;
              return (
                <li
                  key={unit.id}
                  className="rounded-3xl bg-white/80 shadow-sm border-2 border-white p-4 sm:p-5"
                >
                  {/* タイトル行＋進捗バッジ */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`shrink-0 grid place-items-center w-9 h-9 rounded-full text-base font-extrabold text-white ${theme.primaryButton}`}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 break-words">
                        <RubyText text={unit.title} />
                      </h2>
                    </div>
                    <ProgressBadge p={p} />
                  </div>

                  {/* 実用例（なにに つかう？） */}
                  {unit.realWorldUse && (
                    <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed">
                      <RubyText text={unit.realWorldUse} />
                    </p>
                  )}

                  {/* アクションボタン（大きいタップ領域） */}
                  <div className="mt-4 flex gap-3">
                    {unit.hasLearn && (
                      <Link
                        href={`/learn${base}`}
                        aria-label={`${unit.title} を まなぶ`}
                        className={`flex-1 text-center py-4 rounded-2xl text-lg font-extrabold text-white shadow-sm active:scale-95 transition-transform ${theme.primaryButton}`}
                      >
                        📖 まなぶ
                      </Link>
                    )}
                    {unit.hasTest && (
                      <Link
                        href={`/test${base}`}
                        aria-label={`${unit.title} の テスト`}
                        className={`flex-1 text-center py-4 rounded-2xl text-lg font-extrabold border-2 active:scale-95 transition-transform ${theme.choiceDefault}`}
                      >
                        ✏️ テスト
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

// ── 進捗バッジ（クリア / がくしゅうずみ / すこし / みちょうせん） ──
function ProgressBadge({ p }: { p?: UnitProgressLite }) {
  const score = p?.bestScore;
  const cleared = p?.cleared || (typeof score === "number" && score >= 80);

  let label: string;
  let cls: string;
  if (cleared) {
    label = "⭐ クリア";
    cls = "bg-emerald-100 text-emerald-700";
  } else if (typeof score === "number") {
    label = `${score}てん`;
    cls = "bg-amber-100 text-amber-700";
  } else if (p?.learnCompleted) {
    label = "がくしゅうずみ";
    cls = "bg-sky-100 text-sky-700";
  } else {
    label = "はじめよう";
    cls = "bg-gray-100 text-gray-500";
  }

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${cls}`}
    >
      {label}
    </span>
  );
}
