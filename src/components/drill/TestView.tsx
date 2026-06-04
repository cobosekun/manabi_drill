"use client";

// ══════════════════════════════════════════
// TestView — 単元テストの実行UI（slot9 所有）
// TestContent を受け、questions固定 or generatorId(@/lib/generators)で出題。
// 6フォーマット対応: choice / number-input / text-input / clock-read / ordering / matching。
// 回答ごとに正誤＋explanation表示、最後にスコア、進捗を localStorage 保存、もう一度/つぎへ。
// 表示テキストは必ず <RubyText> 経由、図は <Visual spec=> 経由（UI契約）。
// 出題生成は client 側で行い（Math.random）、SSR/CSR の不一致を避けるため mount 後に生成する。
// ══════════════════════════════════════════

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Grade, SubjectId, Question, UnitContent } from "@/types/curriculum";
import { getSubject, getUnit, getUnitContent } from "@/lib/curriculum-query";
import { getGenerator } from "@/lib/generators";
import { getTheme } from "@/lib/theme";
import { loadJSON, saveJSON } from "@/lib/storage";
import { RubyText, rubyToPlainText } from "@/components/drill/RubyText";
import { ChoiceButton } from "@/components/drill/ChoiceButton";
import { ProgressBar } from "@/components/drill/ProgressBar";
import { BackLink } from "@/components/drill/BackLink";
import { Visual } from "@/components/drill/Visual";
import type { ButtonState } from "@/types/drill";

interface TestViewProps {
  subjectId: SubjectId;
  grade: Grade;
  unitId: string;
}

// テーマ名（ThemeName | undefined）。getTheme のデフォルト引数で undefined を吸収する。
type ThemeArg = Parameters<typeof getTheme>[0];

// ── 進捗（localStorage） ──────────────────
// 単元 id をキーに最高スコア/クリア有無/挑戦回数を持つ軽量マップ。
const PROGRESS_KEY = "drill-unit-progress";
interface ProgressEntry {
  bestScore: number; // 最高正答率(0-100)
  cleared: boolean; // 80%以上で一度でもクリアしたか
  attempts: number;
}
type ProgressMap = Record<string, ProgressEntry>;

function saveUnitProgress(unitId: string, correct: number, total: number): void {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const map = loadJSON<ProgressMap>(PROGRESS_KEY, {});
  const prev = map[unitId];
  map[unitId] = {
    bestScore: Math.max(prev?.bestScore ?? 0, pct),
    cleared: (prev?.cleared ?? false) || pct >= 80,
    attempts: (prev?.attempts ?? 0) + 1,
  };
  saveJSON(PROGRESS_KEY, map);
}

// ── 出題ビルド ────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function buildQuestions(content: UnitContent | undefined): Question[] {
  const test = content?.test;
  if (!test) return [];
  // 動的生成（算数・時計など）優先。未登録ならフォールバック。
  if (test.generatorId) {
    const gen = getGenerator(test.generatorId);
    if (gen) return gen(test.questionCount, content!.unitId);
  }
  if (test.questions && test.questions.length > 0) {
    const picked = shuffle(test.questions);
    const n = test.questionCount > 0 ? test.questionCount : picked.length;
    return picked.slice(0, Math.min(n, picked.length));
  }
  return [];
}

// ── 正誤判定（フォーマット別） ──────────────
function arraysEqual(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function TestView({ subjectId, grade, unitId }: TestViewProps) {
  const unit = getUnit(unitId);
  const content = getUnitContent(unitId);
  const subject = getSubject(subjectId);
  const theme = getTheme(subject?.theme);

  // 出題は mount 後に生成（SSR/CSR 不一致回避）。
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<"playing" | "done">("playing");
  const [round, setRound] = useState(0); // もう一度で再生成するためのトリガ

  useEffect(() => {
    setQuestions(buildQuestions(content));
    setIdx(0);
    setAnswered(false);
    setWasCorrect(false);
    setCorrectCount(0);
    setPhase("playing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId, round]);

  // 結果が出たら進捗保存（1回だけ）。
  useEffect(() => {
    if (phase === "done" && questions && questions.length > 0) {
      saveUnitProgress(unitId, correctCount, questions.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const selectLink = `/select/${subjectId}/${grade}`;

  // ── ローディング / 空 ──
  if (questions === null) {
    return (
      <main className={`min-h-screen ${theme.softGradient} flex items-center justify-center p-4`}>
        <p className={`text-lg font-bold ${theme.accentText}`}>よみこみちゅう...</p>
      </main>
    );
  }
  if (questions.length === 0) {
    return (
      <main className={`min-h-screen ${theme.softGradient} flex flex-col items-center justify-center gap-4 p-4`}>
        <p className={`text-lg font-bold ${theme.accentText}`}>もんだいが ありません</p>
        <BackLink href={selectLink} label="← もどる" theme={subject?.theme} />
      </main>
    );
  }

  const total = questions.length;
  const current = questions[idx];

  function handleAnswer(isCorrect: boolean) {
    if (answered) return;
    setAnswered(true);
    setWasCorrect(isCorrect);
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (idx < total - 1) {
      setIdx((i) => i + 1);
      setAnswered(false);
      setWasCorrect(false);
    } else {
      setPhase("done");
    }
  }

  function handleRetry() {
    setRound((r) => r + 1);
  }

  // ── 結果画面 ──
  if (phase === "done") {
    const pct = Math.round((correctCount / total) * 100);
    const emoji = pct === 100 ? "🏆" : pct >= 80 ? "🎉" : pct >= 50 ? "😊" : "💪";
    const message = pct === 100 ? "ぜんもん せいかい！" : pct >= 80 ? "よくできました！" : pct >= 50 ? "あと すこし！" : "もう いちど やってみよう！";
    return (
      <main className={`min-h-screen ${theme.softGradient} flex items-center justify-center p-4`}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-bounce-in">
          <span className="text-7xl block mb-4 animate-float">{emoji}</span>
          <h2 className={`text-2xl font-bold mb-4 ${theme.accentText}`}>{message}</h2>
          <p className="text-5xl font-bold mb-2">
            <span className="text-emerald-500">{correctCount}</span>
            <span className={`text-3xl ${theme.mutedText}`}> / {total}</span>
          </p>
          <p className={`text-lg mb-6 ${theme.mutedText}`}>{pct}% せいかい</p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleRetry}
              aria-label="もういちどチャレンジ"
              className={`w-full py-4 px-6 ${theme.retryButton} text-white text-lg font-bold rounded-2xl shadow-lg active:scale-95 transition-all`}
            >
              🔄 もういちど
            </button>
            <Link
              href={selectLink}
              aria-label="つぎへ（たんげんえらび）"
              className={`block w-full py-4 px-6 ${theme.primaryButton} text-white text-lg font-bold rounded-2xl shadow-lg active:scale-95 transition-all`}
            >
              ➡️ つぎへ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── 出題画面 ──
  return (
    <main className={`min-h-screen ${theme.softGradient} p-4`}>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <BackLink href={selectLink} label="← もどる" theme={subject?.theme} />
          <span className={`text-sm font-bold ${theme.mutedText}`}>テスト</span>
        </div>

        {unit && (
          <h1 className={`text-xl font-bold mb-3 ${theme.accentText} text-center`}>
            <RubyText text={unit.title} />
          </h1>
        )}

        <div className="mb-5">
          <ProgressBar current={idx + 1} total={total} correctCount={correctCount} theme={subject?.theme} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-5 mb-4">
          {/* 問題文 */}
          <p className="text-xl font-bold text-gray-800 leading-relaxed text-center mb-3">
            <RubyText text={current.prompt} />
          </p>

          {/* 図（時計など） */}
          {current.visual && current.visual.kind !== "none" && (
            <div className="flex justify-center mb-4">
              <Visual spec={current.visual} />
            </div>
          )}

          {/* 回答UI（フォーマット別。key=idx で問題ごとに内部状態リセット） */}
          <QuestionBody
            key={idx}
            question={current}
            answered={answered}
            onAnswer={handleAnswer}
            themeName={subject?.theme}
          />
        </div>

        {/* 正誤＋解説 */}
        {answered && (
          <div
            className={`rounded-2xl p-4 mb-4 animate-bounce-in border-2 ${
              wasCorrect ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
            }`}
          >
            <p className={`text-xl font-bold mb-1 ${wasCorrect ? "text-emerald-600" : "text-rose-600"}`}>
              {wasCorrect ? "🎉 せいかい！" : "おしい！"}
            </p>
            <p className="text-gray-700 leading-relaxed">
              <RubyText text={current.explanation} />
            </p>
            <button
              type="button"
              onClick={handleNext}
              aria-label={idx < total - 1 ? "つぎのもんだいへ" : "けっかをみる"}
              className={`mt-4 w-full py-3 px-6 ${theme.primaryButton} text-white text-lg font-bold rounded-2xl shadow-md active:scale-95 transition-all`}
            >
              {idx < total - 1 ? "つぎへ ➡️" : "けっかを みる 🏁"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

// ══════════════════════════════════════════
// フォーマット別の回答UI
// ══════════════════════════════════════════

interface QuestionBodyProps {
  question: Question;
  answered: boolean;
  onAnswer: (isCorrect: boolean) => void;
  themeName: ThemeArg;
}

function QuestionBody({ question, answered, onAnswer, themeName }: QuestionBodyProps) {
  switch (question.format) {
    case "choice":
    case "clock-read":
      return <ChoiceAnswer question={question} answered={answered} onAnswer={onAnswer} themeName={themeName} />;
    case "number-input":
      return <NumberAnswer question={question} answered={answered} onAnswer={onAnswer} themeName={themeName} />;
    case "text-input":
      return <TextAnswer question={question} answered={answered} onAnswer={onAnswer} themeName={themeName} />;
    case "ordering":
      return <OrderingAnswer question={question} answered={answered} onAnswer={onAnswer} themeName={themeName} />;
    case "matching":
      return <MatchingAnswer question={question} answered={answered} onAnswer={onAnswer} themeName={themeName} />;
    default:
      return null;
  }
}

// ── choice / clock-read ──
function ChoiceAnswer({
  question,
  answered,
  onAnswer,
  themeName,
}: {
  question: Extract<Question, { format: "choice" | "clock-read" }>;
  answered: boolean;
  onAnswer: (ok: boolean) => void;
  themeName: ThemeArg;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  function pick(choice: string) {
    if (answered) return;
    setSelected(choice);
    onAnswer(choice === question.answer);
  }

  function stateOf(choice: string): ButtonState {
    if (!answered) return "default";
    if (choice === question.answer) return "correct";
    if (choice === selected) return "incorrect";
    return "disabled";
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {question.choices.map((choice, i) => (
        <ChoiceButton
          key={`${question.id}-${i}`}
          onClick={() => pick(choice)}
          state={stateOf(choice)}
          disabled={answered}
          theme={themeName}
        >
          {choice}
        </ChoiceButton>
      ))}
    </div>
  );
}

// ── number-input ──
function NumberAnswer({
  question,
  answered,
  onAnswer,
  themeName,
}: {
  question: Extract<Question, { format: "number-input" }>;
  answered: boolean;
  onAnswer: (ok: boolean) => void;
  themeName: ThemeArg;
}) {
  const theme = getTheme(themeName);
  const [value, setValue] = useState("");

  function submit() {
    if (answered || value.trim() === "") return;
    const num = Number(value);
    const tol = question.tolerance ?? 0;
    const ok = !Number.isNaN(num) && Math.abs(num - question.answer) <= tol;
    onAnswer(ok);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        disabled={answered}
        aria-label="こたえを すうじで いれてね"
        className="w-40 text-center text-3xl font-bold py-3 rounded-2xl border-4 border-gray-200 focus:border-sky-400 outline-none disabled:bg-gray-100"
      />
      {!answered && (
        <button
          type="button"
          onClick={submit}
          aria-label="こたえる"
          className={`py-3 px-10 ${theme.primaryButton} text-white text-lg font-bold rounded-2xl shadow-md active:scale-95 transition-all`}
        >
          こたえる
        </button>
      )}
    </div>
  );
}

// ── text-input ──
function TextAnswer({
  question,
  answered,
  onAnswer,
  themeName,
}: {
  question: Extract<Question, { format: "text-input" }>;
  answered: boolean;
  onAnswer: (ok: boolean) => void;
  themeName: ThemeArg;
}) {
  const theme = getTheme(themeName);
  const [value, setValue] = useState("");

  function submit() {
    if (answered || value.trim() === "") return;
    const norm = value.trim();
    const ok = norm === question.answer || (question.acceptableAnswers?.includes(norm) ?? false);
    onAnswer(ok);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        disabled={answered}
        aria-label="こたえを いれてね"
        className="w-full max-w-xs text-center text-2xl font-bold py-3 rounded-2xl border-4 border-gray-200 focus:border-sky-400 outline-none disabled:bg-gray-100"
      />
      {!answered && (
        <button
          type="button"
          onClick={submit}
          aria-label="こたえる"
          className={`py-3 px-10 ${theme.primaryButton} text-white text-lg font-bold rounded-2xl shadow-md active:scale-95 transition-all`}
        >
          こたえる
        </button>
      )}
    </div>
  );
}

// ── ordering（タップして じゅんばんに ならべる） ──
function OrderingAnswer({
  question,
  answered,
  onAnswer,
  themeName,
}: {
  question: Extract<Question, { format: "ordering" }>;
  answered: boolean;
  onAnswer: (ok: boolean) => void;
  themeName: ThemeArg;
}) {
  const theme = getTheme(themeName);
  const [order, setOrder] = useState<number[]>([]); // items のインデックス順

  const used = new Set(order);

  function tap(i: number) {
    if (answered || used.has(i)) return;
    setOrder((o) => [...o, i]);
  }
  function reset() {
    if (answered) return;
    setOrder([]);
  }
  function submit() {
    if (answered || order.length !== question.items.length) return;
    onAnswer(arraysEqual(order, question.answerOrder));
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 選んだ じゅんばん */}
      <div className="flex flex-wrap justify-center gap-2 min-h-[3rem]">
        {order.map((itemIdx, pos) => (
          <span
            key={pos}
            className={`px-4 py-2 rounded-xl font-bold ${theme.choiceSelected} border-2`}
          >
            <span className={`text-sm ${theme.mutedText} mr-1`}>{pos + 1}.</span>
            <RubyText text={question.items[itemIdx]} />
          </span>
        ))}
      </div>
      {/* えらべる items */}
      <div className="flex flex-wrap justify-center gap-2">
        {question.items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tap(i)}
            disabled={answered || used.has(i)}
            aria-label={rubyToPlainText(item)}
            className={`px-4 py-3 rounded-xl font-bold border-2 active:scale-95 transition-all ${
              used.has(i) ? "bg-gray-100 text-gray-300 border-gray-200" : `${theme.choiceDefault}`
            }`}
          >
            <RubyText text={item} />
          </button>
        ))}
      </div>
      {!answered && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            aria-label="やりなおす"
            className="py-2 px-5 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95"
          >
            やりなおす
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={order.length !== question.items.length}
            aria-label="こたえる"
            className={`py-2 px-8 ${theme.primaryButton} text-white font-bold rounded-xl shadow-md active:scale-95 transition-all disabled:opacity-40`}
          >
            こたえる
          </button>
        </div>
      )}
    </div>
  );
}

// ── matching（ひだりに あう みぎを えらぶ） ──
function MatchingAnswer({
  question,
  answered,
  onAnswer,
  themeName,
}: {
  question: Extract<Question, { format: "matching" }>;
  answered: boolean;
  onAnswer: (ok: boolean) => void;
  themeName: ThemeArg;
}) {
  const theme = getTheme(themeName);
  const [pairs, setPairs] = useState<number[]>(() => question.left.map(() => -1));

  function choose(leftIdx: number, rightIdx: number) {
    if (answered) return;
    setPairs((p) => {
      const next = [...p];
      next[leftIdx] = rightIdx;
      return next;
    });
  }
  function submit() {
    if (answered || pairs.some((v) => v === -1)) return;
    onAnswer(arraysEqual(pairs, question.answerPairs));
  }

  return (
    <div className="flex flex-col gap-3">
      {question.left.map((leftItem, li) => (
        <div key={li} className="flex flex-col gap-1 border-b border-gray-100 pb-2">
          <span className={`font-bold ${theme.accentText}`}>
            <RubyText text={leftItem} />
          </span>
          <div className="flex flex-wrap gap-2">
            {question.right.map((rightItem, ri) => (
              <button
                key={ri}
                type="button"
                onClick={() => choose(li, ri)}
                disabled={answered}
                aria-label={rubyToPlainText(rightItem)}
                className={`px-3 py-2 rounded-lg text-sm font-bold border-2 active:scale-95 transition-all ${
                  pairs[li] === ri ? theme.choiceSelected : theme.choiceDefault
                }`}
              >
                <RubyText text={rightItem} />
              </button>
            ))}
          </div>
        </div>
      ))}
      {!answered && (
        <button
          type="button"
          onClick={submit}
          disabled={pairs.some((v) => v === -1)}
          aria-label="こたえる"
          className={`mt-1 py-3 px-8 ${theme.primaryButton} text-white font-bold rounded-2xl shadow-md active:scale-95 transition-all disabled:opacity-40`}
        >
          こたえる
        </button>
      )}
    </div>
  );
}
