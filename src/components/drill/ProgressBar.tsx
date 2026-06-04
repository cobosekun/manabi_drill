"use client";

import { ThemeName } from "@/types/drill";
import { getTheme } from "@/lib/theme";

interface ProgressBarProps {
  current: number;
  total: number;
  correctCount?: number;
  size?: "sm" | "md" | "lg";
  theme?: ThemeName;
}

const heights: Record<NonNullable<ProgressBarProps["size"]>, string> = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
};

/**
 * 既存3ページの ProgressBar を統合。
 * 二層バー（せいかい数を下地に重ね、上に進捗バーを半透明で重ねる）・
 * role="progressbar" と aria 属性を維持。色は theme で切替（theme.ts）。
 */
export function ProgressBar({
  current,
  total,
  correctCount = 0,
  size = "md",
  theme = "sky",
}: ProgressBarProps) {
  const t = getTheme(theme);
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const correctPercentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`進捗: ${current}/${total}問`}
    >
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className={`font-bold ${t.accentText}`}>
          <span className={`text-lg ${t.strongText}`}>{current}</span>
          <span className={t.mutedText}> / {total} もん</span>
        </span>
        {correctCount > 0 && (
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <span>⭐</span>{correctCount} せいかい
          </span>
        )}
      </div>
      <div className={`relative w-full ${t.track} rounded-full overflow-hidden shadow-inner ${heights[size]}`}>
        {correctCount > 0 && (
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${correctPercentage}%` }}
          />
        )}
        <div
          className={`absolute inset-y-0 left-0 ${t.bar} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%`, opacity: correctCount > 0 ? 0.7 : 1 }}
        />
      </div>
    </div>
  );
}
