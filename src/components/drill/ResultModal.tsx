"use client";

import { ThemeName } from "@/types/drill";
import { getTheme } from "@/lib/theme";
import { getResultTier, starCount } from "@/lib/result";

interface ResultModalProps {
  isOpen: boolean;
  correctCount: number;
  totalCount: number;
  onRetry: () => void;
  onClose: () => void;
  theme?: ThemeName;
}

/**
 * 既存3ページの ResultModal を統合（clock の onHome は onClose に名称統一）。
 * getResultTier / starCount を使用。星・パーセント・2ボタン（もういちど / トップへ）を維持。
 * animate-float / animate-bounce-in / animate-sparkle を維持。
 */
export function ResultModal({
  isOpen,
  correctCount,
  totalCount,
  onRetry,
  onClose,
  theme = "sky",
}: ResultModalProps) {
  if (!isOpen) return null;
  const t = getTheme(theme);
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const result = getResultTier(percentage);
  const stars = Array.from({ length: 5 }, (_, i) => i < starCount(percentage));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-label="ドリルのけっか"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <span className="text-6xl block animate-float">{result.emoji}</span>
        </div>
        <h2 className={`text-2xl font-bold text-center mb-4 ${result.color}`}>{result.message}</h2>

        <div className={`${t.softGradient} rounded-2xl p-6 mb-6`}>
          <div className="text-center">
            <p className={`font-bold mb-2 ${t.accentText}`}>けっか</p>
            <p className="text-5xl font-bold">
              <span className="text-emerald-500">{correctCount}</span>
              <span className={`text-3xl ${t.mutedText}`}> / </span>
              <span className={t.accentText}>{totalCount}</span>
            </p>
            <p className={`text-lg mt-2 ${t.mutedText}`}>{percentage}% せいかい</p>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {stars.map((filled, i) => (
              <span
                key={i}
                className={`text-3xl ${filled ? "text-yellow-400 animate-sparkle" : "text-gray-200"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={onRetry}
            aria-label="もういちどチャレンジ"
            className={`w-full py-4 px-6 ${t.retryButton} text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all`}
          >
            🔄 もういちどチャレンジ
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="トップへもどる"
            className="w-full py-3 px-6 bg-gray-100 text-gray-600 text-lg font-bold rounded-2xl hover:bg-gray-200 transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            🏠 トップへもどる
          </button>
        </div>
      </div>
    </div>
  );
}
