"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { kanjiQuestions } from "@/data/kanji-questions";
import { KanjiQuestion, QuestionProgress, QUESTIONS_PER_SESSION } from "@/types/question";
import { ButtonState } from "@/types/drill";
import { ProgressBar, ChoiceButton, ResultModal } from "@/components/drill";
import { shuffle } from "@/lib/shuffle";
import { dailyKey, loadJSON, saveJSON } from "@/lib/storage";

// ── localStorage（共通ヘルパ @/lib/storage に集約。キーは kanji-drill-YYYY-MM-DD で従来互換）──

function loadProgress(): QuestionProgress[] {
  const parsed = loadJSON<QuestionProgress[] | null>(dailyKey("kanji"), null);
  if (parsed && parsed.length === kanjiQuestions.length) return parsed;
  return initProgress();
}

function saveProgress(progress: QuestionProgress[]): void {
  saveJSON(dailyKey("kanji"), progress);
}

function initProgress(): QuestionProgress[] {
  return kanjiQuestions.map((q) => ({ questionId: q.id, isCorrect: false, attempts: 0 }));
}

// ── Labels ──

const questionTypeLabels: Record<string, string> = {
  reading: "よみ",
  writing: "かき",
  fill: "あなうめ",
  choice: "4たく",
};

// ══════════════════════════════════════════
// Components
// ══════════════════════════════════════════

// ── QuestionCard ──

interface QuestionCardProps {
  question: KanjiQuestion;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

function QuestionCard({ question, onAnswer, onNext, questionNumber, totalQuestions }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<"unanswered" | "correct" | "incorrect">("unanswered");

  const handleSelectAnswer = (choice: string) => {
    if (answerState !== "unanswered") return;
    setSelectedAnswer(choice);
    const isCorrect = choice === question.answer;
    setAnswerState(isCorrect ? "correct" : "incorrect");
    onAnswer(isCorrect);
  };

  const getButtonState = (choice: string): ButtonState => {
    if (answerState === "unanswered") return selectedAnswer === choice ? "selected" : "default";
    if (choice === question.answer) return "correct";
    if (choice === selectedAnswer && answerState === "incorrect") return "incorrect";
    return "disabled";
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-violet-100 text-violet-700 text-sm font-bold px-3 py-1 rounded-full">
          {questionTypeLabels[question.type] ?? question.type}
        </span>
        <span className="text-sky-500 font-bold text-sm">{questionNumber} / {totalQuestions}</span>
      </div>

      {(question.type === "reading") && (
        <div className="text-center mb-6">
          <div className="text-8xl font-bold text-sky-800 bg-gradient-to-br from-sky-50 to-violet-50 rounded-2xl py-8 px-4 shadow-inner border-4 border-dashed border-sky-200">
            {question.kanji}
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <p className="text-xl font-bold text-sky-800 leading-relaxed">{question.question}</p>
        {question.hint && answerState === "unanswered" && (
          <p className="text-sm text-sky-500 mt-2">💡 ヒント: {question.hint}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {question.choices.map((choice, index) => (
          <ChoiceButton
            key={`${question.id}-${index}`}
            onClick={() => handleSelectAnswer(choice)}
            state={getButtonState(choice)}
            disabled={answerState !== "unanswered"}
            theme="sky"
          >
            {choice}
          </ChoiceButton>
        ))}
      </div>

      {answerState !== "unanswered" && (
        <div className={`text-center p-4 rounded-2xl mb-4 animate-bounce-in ${
          answerState === "correct" ? "bg-emerald-50 border-2 border-emerald-200" : "bg-rose-50 border-2 border-rose-200"
        }`}>
          {answerState === "correct" ? (
            <div>
              <p className="text-2xl font-bold text-emerald-600">🎉 せいかい！ 🎉</p>
              <p className="text-emerald-600">「{question.kanji}」は「{question.reading}」とよむよ！</p>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-bold text-rose-600">おしい！</p>
              <p className="text-rose-600">こたえは「{question.answer}」だよ 📚</p>
            </div>
          )}
        </div>
      )}

      {answerState !== "unanswered" && (
        <button
          type="button"
          onClick={onNext}
          aria-label={questionNumber < totalQuestions ? "つぎのもんだいへ" : "けっかをみる"}
          className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-violet-500 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all animate-bounce-in"
        >
          {questionNumber < totalQuestions ? (
            <span className="flex items-center justify-center gap-2">つぎのもんだい →</span>
          ) : (
            <span className="flex items-center justify-center gap-2">けっかをみる 🏆</span>
          )}
        </button>
      )}
    </div>
  );
}

// ── QuestionList (grid) ──

interface QuestionListProps {
  questions: KanjiQuestion[];
  progressData: QuestionProgress[];
  onSelectQuestion: (id: number) => void;
}

function QuestionList({ questions, progressData, onSelectQuestion }: QuestionListProps) {
  const getProgress = (qid: number) => progressData.find((p) => p.questionId === qid);

  const getStatusColor = (p?: QuestionProgress) => {
    if (!p || p.attempts === 0) return "bg-gray-100 border-gray-200 text-gray-500";
    if (p.isCorrect) return "bg-emerald-50 border-emerald-300 text-emerald-700";
    return "bg-rose-50 border-rose-300 text-rose-700";
  };

  const getStatusIcon = (p?: QuestionProgress) => {
    if (!p || p.attempts === 0) return <span className="text-gray-300 text-sm">○</span>;
    if (p.isCorrect) return <span className="text-emerald-500 text-sm">✓</span>;
    return <span className="text-rose-400 text-sm">✗</span>;
  };

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
      {questions.map((q) => {
        const p = getProgress(q.id);
        return (
          <button
            key={q.id}
            type="button"
            onClick={() => onSelectQuestion(q.id)}
            aria-label={`${q.kanji} — ${!p || p.attempts === 0 ? "みちょうせん" : p.isCorrect ? "せいかい" : "ふせいかい"}`}
            className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-md active:scale-95 ${getStatusColor(p)}`}
          >
            <span className="text-2xl font-bold">{q.kanji}</span>
            <span className="absolute top-0.5 right-0.5">{getStatusIcon(p)}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── PrintContent ──

interface PrintContentProps {
  pages: KanjiQuestion[][];
  showAnswers: boolean;
  printMode: string;
  practiceCount: number;
  questionsPerPage: number;
  isPreview: boolean;
}

function PrintContent({ pages, showAnswers, printMode, practiceCount, questionsPerPage, isPreview }: PrintContentProps) {
  return (
    <div>
      {pages.map((pageQuestions, pageIndex) => (
        <div key={pageIndex} className={`print-page bg-white ${isPreview ? "mb-4" : "p-8"}`}>
          <div className="shrink-0 flex items-center justify-between mb-1 border-b border-sky-200 pb-1">
            <h1 className="text-base font-bold text-sky-700">
              小1かんじドリル
              {printMode === "writing" && " - かきとり"}
              {printMode === "reading" && " - よみとり"}
              {printMode === "all" && " - かき＆よみ"}
            </h1>
            <p className="text-sky-500 text-xs">({pageIndex + 1}/{pages.length})</p>
          </div>

          {pageIndex === 0 && (
            <div className="shrink-0 mb-1 flex items-center gap-1 text-xs">
              <span className="font-bold text-sky-700">なまえ：</span>
              <div className="flex-1 border-b border-sky-300 h-5" />
              <span className="font-bold text-sky-700 ml-2">ひづけ：</span>
              <div className="w-20 border-b border-sky-300 h-5" />
              <span className="font-bold text-sky-700 ml-2">てんすう：</span>
              <div className="w-12 border-b border-sky-300 h-5" />
              <span className="text-sky-500">/ {pages.flat().length}</span>
            </div>
          )}

          <div className="print-questions space-y-0 flex-1">
            {pageQuestions.map((question, index) => (
              <div key={question.id} className="print-card border border-sky-200 rounded-lg px-2 py-1">
                <div className="flex items-center gap-2">
                  <div className="shrink-0 w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold text-xs">
                    {pageIndex * questionsPerPage + index + 1}
                  </div>

                  {(printMode === "writing" || printMode === "all") && (
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-violet-100 text-violet-700 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: '10px' }}>かきとり</span>
                        <span className="text-sm font-bold text-sky-800">
                          「<span className="text-violet-600 text-base">{question.reading}</span>」をかんじでかこう
                        </span>
                        <div className="flex items-center gap-0.5 ml-auto">
                          {Array.from({ length: practiceCount }).map((_, i) => (
                            <div key={i} className="w-9 h-9 border border-sky-300 rounded relative bg-white">
                              <div className="absolute top-1/2 left-0 right-0 h-px bg-sky-200" />
                              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-200" />
                              {showAnswers && i === 0 && (
                                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-300 pointer-events-none" style={{ fontFamily: 'var(--font-mincho)' }}>
                                  {question.kanji}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {(printMode === "reading" || printMode === "all") && (
                    <div className={`flex-1 ${printMode === "all" ? "border-l border-sky-100 pl-2" : ""}`}>
                      <div className="flex items-center gap-2">
                        <span className="bg-sky-100 text-sky-700 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: '10px' }}>よみとり</span>
                        <div className="w-10 h-10 border border-violet-300 rounded flex items-center justify-center text-2xl font-bold text-violet-700 bg-violet-50">
                          {question.kanji}
                        </div>
                        <span className="text-sky-600 text-sm">→</span>
                        <div className="relative w-24 h-8 border-b border-dashed border-sky-300">
                          {showAnswers && (
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-300 pointer-events-none" style={{ fontFamily: 'var(--font-mincho)' }}>
                              {question.reading}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 mt-auto pt-1 border-t border-sky-100 text-center text-sky-400" style={{ fontSize: '9px' }}>
            小1かんじドリル - {showAnswers ? "なぞりがき" : "れんしゅうよう"}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PrintPage ──

interface PrintPageProps {
  onBack: () => void;
}

function PrintPage({ onBack }: PrintPageProps) {
  const [printMode, setPrintMode] = useState("writing");
  const [showAnswers, setShowAnswers] = useState(false);
  const [practiceCount, setPracticeCount] = useState(3);
  const [isRandom, setIsRandom] = useState(false);
  const [randomized, setRandomized] = useState<KanjiQuestion[]>([]);
  const questionsPerPage = 8;

  const baseQuestions = kanjiQuestions.slice(0, 80);
  const filteredQuestions = isRandom && randomized.length > 0 ? randomized : baseQuestions;

  const handleRandomToggle = (checked: boolean) => {
    setIsRandom(checked);
    if (checked) setRandomized(shuffle(baseQuestions));
  };
  const handleShuffle = () => setRandomized(shuffle(baseQuestions));

  const pages: KanjiQuestion[][] = [];
  for (let i = 0; i < filteredQuestions.length; i += questionsPerPage) {
    pages.push(filteredQuestions.slice(i, i + questionsPerPage));
  }

  const handlePrint = () => window.print();

  return (
    <>
      {/* 設定画面 */}
      <div className="no-print min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-violet-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button type="button" onClick={onBack} aria-label="もどる" className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold py-2 px-3 rounded-xl hover:bg-white/50 transition-all mb-4">
            ← もどる
          </button>

          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-sky-700 mb-4 text-center flex items-center justify-center gap-2">
              🖨️ いんさつせってい
            </h2>

            <div className="mb-5">
              <label className="block text-sky-700 font-bold mb-2">ドリルのしゅるい</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: "writing", label: "✏️ かきとり", desc: "よみがなをみて かく" },
                  { value: "reading", label: "📖 よみとり", desc: "かんじをみて よむ" },
                  { value: "all", label: "📝 りょうほう", desc: "かき＋よみ" },
                ] as const).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPrintMode(option.value)}
                    className={`py-3 px-3 rounded-xl font-bold transition-all text-sm ${
                      printMode === option.value ? "bg-sky-500 text-white shadow-md" : "bg-sky-100 text-sky-700 hover:bg-sky-200"
                    }`}
                  >
                    <div>{option.label}</div>
                    <div className="text-xs mt-1 opacity-80">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sky-700 font-bold mb-2">れんしゅうマスのかず</label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 4, 5].map((num) => (
                  <button key={num} type="button" onClick={() => setPracticeCount(num)} className={`py-2 px-4 rounded-xl font-bold transition-all ${practiceCount === num ? "bg-violet-500 text-white" : "bg-violet-100 text-violet-700 hover:bg-violet-200"}`}>
                    {num}マス
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-3 rounded-xl">
                <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="w-5 h-5 rounded border-sky-300 text-sky-500 focus:ring-sky-400" />
                <span className="text-sky-700 font-bold">なぞりがき（うすいじをなぞる）</span>
              </label>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer flex-1">
                  <input type="checkbox" checked={isRandom} onChange={(e) => handleRandomToggle(e.target.checked)} className="w-5 h-5 rounded border-sky-300 text-sky-500 focus:ring-sky-400" />
                  <span className="text-sky-700 font-bold">ランダムにしゅつだい</span>
                </label>
                {isRandom && (
                  <button type="button" onClick={handleShuffle} aria-label="シャッフル" className="py-1.5 px-4 bg-sky-500 text-white text-sm font-bold rounded-xl hover:bg-sky-600 active:scale-95 transition-all">
                    🔀 シャッフル
                  </button>
                )}
              </div>
            </div>

            <button type="button" onClick={handlePrint} aria-label="いんさつする" className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-violet-500 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all">
              <span className="flex items-center justify-center gap-2">🖨️ いんさつする</span>
            </button>

            <p className="text-center text-sky-500 mt-4 text-sm">
              {filteredQuestions.length}もん / {pages.length}ページ
            </p>
          </div>

          {/* プレビュー */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-lg font-bold text-sky-700 mb-4 text-center">📄 プレビュー</h3>
            <div className="border-2 border-dashed border-sky-200 rounded-xl p-4 bg-sky-50/50 overflow-auto max-h-96">
              <PrintContent pages={[pages[0] || []]} showAnswers={showAnswers} printMode={printMode} practiceCount={practiceCount} questionsPerPage={questionsPerPage} isPreview={true} />
            </div>
          </div>
        </div>
      </div>

      {/* 印刷用 */}
      <div className="print-only">
        <PrintContent pages={pages} showAnswers={showAnswers} printMode={printMode} practiceCount={practiceCount} questionsPerPage={questionsPerPage} isPreview={false} />
      </div>
    </>
  );
}

// ══════════════════════════════════════════
// Main App
// ══════════════════════════════════════════

type Page = "home" | "quiz" | "list" | "print";

export default function KanjiDrillApp() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-violet-100 flex items-center justify-center"><p className="text-sky-600 font-bold text-lg">よみこみちゅう...</p></div>}>
      <KanjiDrillContent />
    </Suspense>
  );
}

function KanjiDrillContent() {
  const searchParams = useSearchParams();
  const initialPage = searchParams.get("mode") === "print" ? "print" : "home";
  const [page, setPage] = useState<Page>(initialPage);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState<QuestionProgress[]>(initProgress);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const shuffleQuestions = useCallback(() => {
    const indices = kanjiQuestions.map((_, i) => i);
    return shuffle(indices).slice(0, QUESTIONS_PER_SESSION);
  }, []);

  // Hydrate from localStorage（localStorage と Math.random はクライアント専用のため、
  // SSR と初期描画を一致させる目的で mount 後に同期する。set-state-in-effect は意図的。）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
    setQuestionOrder(shuffleQuestions());
    setHydrated(true);
  }, [shuffleQuestions]);

  // Persist progress
  useEffect(() => {
    if (hydrated) saveProgress(progress);
  }, [progress, hydrated]);

  const handleAnswer = (isCorrect: boolean) => {
    const currentQuestion = page === "quiz"
      ? kanjiQuestions[questionOrder[currentQuestionIndex]]
      : kanjiQuestions.find((q) => q.id === selectedQuestionId);
    if (!currentQuestion) return;

    setProgress((prev) => prev.map((p) =>
      p.questionId === currentQuestion.id
        ? { ...p, isCorrect: isCorrect || p.isCorrect, attempts: p.attempts + 1 }
        : p
    ));
    if (isCorrect) setSessionCorrectCount((prev) => prev + 1);
  };

  const handleNext = () => {
    if (page === "list") { setSelectedQuestionId(null); return; }
    if (currentQuestionIndex < questionOrder.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsResultModalOpen(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSessionCorrectCount(0);
    setQuestionOrder(shuffleQuestions());
    setIsResultModalOpen(false);
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSessionCorrectCount(0);
    setQuestionOrder(shuffleQuestions());
    setPage("quiz");
  };

  const correctCount = progress.filter((p) => p.isCorrect).length;
  const attemptedCount = progress.filter((p) => p.attempts > 0).length;

  // ── Print ──
  if (page === "print") {
    return <PrintPage onBack={() => setPage("home")} />;
  }

  // ── Home ──
  if (page === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-violet-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full text-center">
          <Link href="/" className="inline-flex items-center gap-1 text-sky-500 hover:text-sky-600 font-bold text-sm mb-4 transition-all">
            ← きょうかえらび
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500 mb-2">小1かんじ</h1>
            <h2 className="text-2xl font-bold text-sky-600">ドリル</h2>
            <p className="text-sky-400 mt-2 text-lg">80字マスター！</p>
          </div>

          <div className="text-7xl mb-6 animate-float">📖</div>

          <div className="bg-gradient-to-br from-sky-50 to-violet-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-sky-700 mb-4">きょうのしんちょく</h3>
            <ProgressBar current={attemptedCount} total={kanjiQuestions.length} correctCount={correctCount} size="lg" theme="sky" />
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-white/80 rounded-xl p-2">
                <p className="text-2xl font-bold text-sky-600">{kanjiQuestions.length}</p>
                <p className="text-xs text-sky-400">ぜんぶ</p>
              </div>
              <div className="bg-white/80 rounded-xl p-2">
                <p className="text-2xl font-bold text-violet-600">{attemptedCount}</p>
                <p className="text-xs text-violet-400">ちょうせん</p>
              </div>
              <div className="bg-white/80 rounded-xl p-2">
                <p className="text-2xl font-bold text-emerald-600">{correctCount}</p>
                <p className="text-xs text-emerald-400">せいかい</p>
              </div>
            </div>
          </div>

          <button type="button" onClick={handleStartQuiz} aria-label="はじめる" className="w-full py-5 px-8 bg-gradient-to-r from-sky-500 to-violet-500 text-white text-2xl font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.03] active:scale-95 transition-all mb-4">
            <span className="flex items-center justify-center gap-3">🚀 はじめる</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setPage("list")} aria-label="いちらん" className="py-3 px-4 bg-sky-100 text-sky-700 text-lg font-bold rounded-xl hover:bg-sky-200 transform hover:scale-[1.02] active:scale-95 transition-all">
              📋 いちらん
            </button>
            <button type="button" onClick={() => setPage("print")} aria-label="いんさつ" className="py-3 px-4 bg-violet-100 text-violet-700 text-lg font-bold rounded-xl hover:bg-violet-200 transform hover:scale-[1.02] active:scale-95 transition-all">
              🖨️ いんさつ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  if (page === "quiz") {
    const currentQuestion = kanjiQuestions[questionOrder[currentQuestionIndex]];

    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-violet-100 p-4">
        <div className="max-w-lg mx-auto">
          <button type="button" onClick={() => { setPage("home"); setIsResultModalOpen(false); }} aria-label="もどる" className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold py-2 px-3 rounded-xl hover:bg-white/50 transition-all mb-4">
            ← もどる
          </button>

          <div className="mb-6">
            <ProgressBar current={currentQuestionIndex + 1} total={questionOrder.length} correctCount={sessionCorrectCount} size="md" theme="sky" />
          </div>

          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNext}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questionOrder.length}
            />
          )}

          <ResultModal
            isOpen={isResultModalOpen}
            correctCount={sessionCorrectCount}
            totalCount={questionOrder.length}
            onRetry={handleRetry}
            onClose={() => { setPage("home"); setIsResultModalOpen(false); }}
            theme="sky"
          />
        </div>
      </div>
    );
  }

  // ── List ──
  if (page === "list") {
    if (selectedQuestionId !== null) {
      const selectedQuestion = kanjiQuestions.find((q) => q.id === selectedQuestionId);
      const questionIndex = kanjiQuestions.findIndex((q) => q.id === selectedQuestionId);

      return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-violet-100 p-4">
          <div className="max-w-lg mx-auto">
            <button type="button" onClick={() => setSelectedQuestionId(null)} aria-label="いちらんにもどる" className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold py-2 px-3 rounded-xl hover:bg-white/50 transition-all mb-4">
              ← いちらんにもどる
            </button>
            {selectedQuestion && (
              <QuestionCard
                key={selectedQuestion.id}
                question={selectedQuestion}
                onAnswer={handleAnswer}
                onNext={handleNext}
                questionNumber={questionIndex + 1}
                totalQuestions={kanjiQuestions.length}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-violet-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button type="button" onClick={() => setPage("home")} aria-label="もどる" className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold py-2 px-3 rounded-xl hover:bg-white/50 transition-all mb-4">
            ← もどる
          </button>

          <h1 className="text-2xl font-bold text-sky-700 text-center mb-6">80もんいちらん</h1>

          <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
            <ProgressBar current={attemptedCount} total={kanjiQuestions.length} correctCount={correctCount} size="md" theme="sky" />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
            <QuestionList questions={kanjiQuestions} progressData={progress} onSelectQuestion={setSelectedQuestionId} />
          </div>

          <div className="flex justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-gray-100 border border-gray-200" />
              <span className="text-gray-500">みちょうせん</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-emerald-50 border border-emerald-300" />
              <span className="text-emerald-600">せいかい</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-rose-50 border border-rose-300" />
              <span className="text-rose-500">ふせいかい</span>
            </div>
          </div>

          <button type="button" onClick={handleStartQuiz} aria-label="ランダムにチャレンジ" className="w-full mt-6 py-4 px-8 bg-gradient-to-r from-violet-500 to-violet-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all">
            🔄 ランダムにチャレンジ
          </button>
        </div>
      </div>
    );
  }

  return null;
}
