"use client";

// ══════════════════════════════════════════
// LearnView — 学習モードの本体（子ども自律UI）
// LearnContent.steps を heading / body / <Visual> で段階表示し、
// 最後に checkQuestions があれば「たしかめ」、その後 完了画面で
// テスト・がくしゅうマップ・たんげんえらび への導線を出す。
// 表示テキストはすべて <RubyText text={...} /> 経由（データは {漢字|よみ} 記法）。
// 進捗（学習を見終わったか）は localStorage に保存（サーバ送信なし）。
// データ層は触らない（表示層のみ）。
// ══════════════════════════════════════════

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Unit, UnitContent, Question } from "@/types/curriculum";
import type { DrillTheme } from "@/lib/theme";
import { RubyText } from "@/components/drill/RubyText";
import { Visual } from "@/components/drill/Visual";
import { saveJSON } from "@/lib/storage";

interface LearnViewProps {
  unit: Unit;
  content: UnitContent;
  theme: DrillTheme;
  /** 教科の表示名（{漢字|よみ} 記法を含みうる） */
  subjectLabel: string;
  subjectEmoji: string;
  /** URL セグメント（導線リンク用） */
  routeSubject: string;
  routeGrade: string;
  routeUnit: string;
}

type Phase = "learn" | "check" | "done";

/** 確認問題の「こたえ」を読める文字列に整える（形式ごとに分岐）。 */
function answerText(q: Question): string {
  switch (q.format) {
    case "choice":
    case "text-input":
    case "clock-read":
      return q.answer;
    case "number-input":
      return String(q.answer);
    case "ordering":
      return q.answerOrder.map((i) => q.items[i]).join(" → ");
    case "matching":
      return q.answerPairs.map((r, l) => `${q.left[l]}＝${q.right[r]}`).join(" / ");
    default:
      return "";
  }
}

export function LearnView({
  unit,
  content,
  theme,
  subjectLabel,
  subjectEmoji,
  routeSubject,
  routeGrade,
  routeUnit,
}: LearnViewProps) {
  const steps = content.learn?.steps ?? [];
  const checks = content.learn?.checkQuestions ?? [];

  const [phase, setPhase] = useState<Phase>(steps.length > 0 ? "learn" : "done");
  const [idx, setIdx] = useState(0);

  // 完了したら「学習を見終わった」フラグを保存（次回バッジ表示などに使える）
  useEffect(() => {
    if (phase === "done") {
      saveJSON(`learn-done:${unit.id}`, true);
    }
  }, [phase, unit.id]);

  const isLastStep = idx >= steps.length - 1;

  const goNext = () => {
    if (!isLastStep) {
      setIdx((i) => i + 1);
      return;
    }
    setPhase(checks.length > 0 ? "check" : "done");
  };
  const goPrev = () => setIdx((i) => Math.max(0, i - 1));

  return (
    <main className={`min-h-screen ${theme.softGradient} px-4 py-6`}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        {/* ── ヘッダ ── */}
        <header className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="ホームへ もどる"
            className={`text-3xl ${theme.link}`}
          >
            🏠
          </Link>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="text-2xl" aria-hidden>
              {subjectEmoji}
            </span>
            <span className={theme.accentText}>
              <RubyText text={subjectLabel} />
            </span>
          </div>
          <span className={`text-sm font-bold ${theme.mutedText}`}>まなぶ</span>
        </header>

        {/* ── 単元タイトル ── */}
        <h1 className="text-center text-3xl font-extrabold leading-snug text-slate-800">
          <RubyText text={unit.title} />
        </h1>

        {phase === "learn" && steps.length > 0 && (
          <LearnStepCard
            theme={theme}
            stepNumber={idx + 1}
            stepTotal={steps.length}
            heading={steps[idx].heading}
            body={steps[idx].body}
            visual={steps[idx].visual}
            isLast={isLastStep}
            onPrev={idx > 0 ? goPrev : undefined}
            onNext={goNext}
          />
        )}

        {phase === "check" && (
          <CheckSection
            theme={theme}
            questions={checks}
            onDone={() => setPhase("done")}
          />
        )}

        {phase === "done" && (
          <DoneSection
            theme={theme}
            unit={unit}
            routeSubject={routeSubject}
            routeGrade={routeGrade}
            routeUnit={routeUnit}
            onReview={
              steps.length > 0
                ? () => {
                    setIdx(0);
                    setPhase("learn");
                  }
                : undefined
            }
          />
        )}
      </div>
    </main>
  );
}

// ── 1ステップの表示カード ─────────────────
function LearnStepCard({
  theme,
  stepNumber,
  stepTotal,
  heading,
  body,
  visual,
  isLast,
  onPrev,
  onNext,
}: {
  theme: DrillTheme;
  stepNumber: number;
  stepTotal: number;
  heading: string;
  body: string;
  visual?: Parameters<typeof Visual>[0]["spec"];
  isLast: boolean;
  onPrev?: () => void;
  onNext: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur">
      {/* ステップ進み具合（丸ドット） */}
      <div className="flex justify-center gap-2" aria-label={`${stepTotal}この うち ${stepNumber}こめ`}>
        {Array.from({ length: stepTotal }).map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full ${i + 1 === stepNumber ? theme.bar : theme.track}`}
          />
        ))}
      </div>

      <h2 className={`text-center text-2xl font-extrabold ${theme.accentText}`}>
        <RubyText text={heading} />
      </h2>

      {visual && (
        <div className="flex justify-center py-2 text-2xl">
          <Visual spec={visual} />
        </div>
      )}

      <p className="text-center text-xl leading-relaxed text-slate-700">
        <RubyText text={body} />
      </p>

      {/* ナビ：まえへ / つぎへ */}
      <div className="mt-2 flex items-center justify-between gap-3">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className={`rounded-2xl px-5 py-3 text-lg font-bold ${theme.track} ${theme.accentText}`}
          >
            ← まえ
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onNext}
          className={`rounded-2xl px-8 py-3 text-xl font-extrabold text-white shadow-md ${theme.primaryButton}`}
        >
          {isLast ? "できた！" : "つぎへ →"}
        </button>
      </div>
    </section>
  );
}

// ── たしかめ（checkQuestions）─────────────
function CheckSection({
  theme,
  questions,
  onDone,
}: {
  theme: DrillTheme;
  questions: Question[];
  onDone: () => void;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur">
      <h2 className={`text-center text-2xl font-extrabold ${theme.accentText}`}>
        たしかめて みよう
      </h2>
      <ul className="flex flex-col gap-4">
        {questions.map((q) => (
          <CheckItem key={q.id} theme={theme} question={q} />
        ))}
      </ul>
      <button
        type="button"
        onClick={onDone}
        className={`mt-2 rounded-2xl px-8 py-3 text-xl font-extrabold text-white shadow-md ${theme.primaryButton}`}
      >
        おわり →
      </button>
    </section>
  );
}

function CheckItem({ theme, question }: { theme: DrillTheme; question: Question }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-2xl border-2 border-slate-100 p-4">
      <p className="text-lg font-bold text-slate-700">
        <RubyText text={question.prompt} />
      </p>
      {question.visual && (
        <div className="flex justify-center py-2">
          <Visual spec={question.visual} />
        </div>
      )}
      {open ? (
        <div className="mt-2 flex flex-col gap-1">
          <p className={`text-lg font-extrabold ${theme.strongText}`}>
            こたえ: <RubyText text={answerText(question)} />
          </p>
          <p className="text-base leading-relaxed text-slate-600">
            <RubyText text={question.explanation} />
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`mt-2 rounded-xl px-4 py-2 text-base font-bold ${theme.track} ${theme.accentText}`}
        >
          こたえを みる
        </button>
      )}
    </li>
  );
}

// ── 完了画面（導線）─────────────────────
function DoneSection({
  theme,
  unit,
  routeSubject,
  routeGrade,
  routeUnit,
  onReview,
}: {
  theme: DrillTheme;
  unit: Unit;
  routeSubject: string;
  routeGrade: string;
  routeUnit: string;
  onReview?: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl bg-white/80 p-6 text-center shadow-lg backdrop-blur">
      <p className="text-5xl" aria-hidden>
        🎉
      </p>
      <h2 className={`text-2xl font-extrabold ${theme.accentText}`}>がくしゅう かんりょう！</h2>

      {/* なんの やくに たつ？ */}
      <p className="rounded-2xl bg-amber-50 px-4 py-3 text-base leading-relaxed text-slate-700">
        💡 <RubyText text={unit.realWorldUse} />
      </p>

      <div className="flex flex-col gap-3">
        {unit.hasTest && (
          <Link
            href={`/test/${routeSubject}/${routeGrade}/${routeUnit}`}
            className={`rounded-2xl px-6 py-4 text-xl font-extrabold text-white shadow-md ${theme.primaryButton}`}
          >
            ✏️ テストに ちょうせん
          </Link>
        )}
        <Link
          href={`/select/${routeSubject}/${routeGrade}`}
          className={`rounded-2xl px-6 py-4 text-lg font-bold ${theme.track} ${theme.accentText}`}
        >
          📚 ほかの たんげん
        </Link>
        <Link
          href="/roadmap"
          className={`rounded-2xl px-6 py-4 text-lg font-bold ${theme.track} ${theme.accentText}`}
        >
          🗺️ がくしゅうマップ
        </Link>
        {onReview && (
          <button
            type="button"
            onClick={onReview}
            className={`text-base font-bold ${theme.link}`}
          >
            もういちど みる
          </button>
        )}
      </div>
    </section>
  );
}
