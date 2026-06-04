// ══════════════════════════════════════════
// テーマ → 固定クラス文字列マップ（drill 基盤レイヤ）
// Tailwind v4: 動的クラス名（テンプレートリテラルで色を組み立てる）は禁止。
// すべて「完全なクラス文字列」を固定で保持し、Tailwind の検出に確実に乗せる。
//
// 教科対応の目安: kokugo=sky/violet, sansuu=orange/pink, clock=amber/sky
// correct/incorrect/disabled は教科共通（emerald/rose/gray）なので
// コンポーネント側に固定で持つ（このマップには含めない）。
// ══════════════════════════════════════════

import { ThemeName } from "@/types/drill";

export interface DrillTheme {
  // ── ProgressBar ──
  track: string;        // トラック背景: 例 "bg-sky-100"
  bar: string;          // 進捗バー: 例 "bg-gradient-to-r from-sky-400 to-violet-500"
  // ── ChoiceButton（default / selected のみ theme 依存）──
  choiceDefault: string;
  choiceSelected: string;
  // ── テキスト系 ──
  accentText: string;   // 見出し/太字: 例 "text-sky-700"
  strongText: string;   // 強調数値: 例 "text-violet-600"
  mutedText: string;    // 補助テキスト: 例 "text-sky-500"
  // ── 面・ボタン ──
  softGradient: string;   // やわらか背景: 例 "bg-gradient-to-br from-sky-50 to-violet-50"
  primaryButton: string;  // 主ボタン: 例 "bg-gradient-to-r from-sky-500 to-violet-500"
  retryButton: string;    // もういちどボタン: 例 "bg-gradient-to-r from-violet-500 to-violet-600"
  // ── 戻る導線 ──
  link: string;           // 例 "text-sky-600 hover:text-sky-700"
}

export const themes: Record<ThemeName, DrillTheme> = {
  // こくご（kanji）— 既存 kokugo / clock のクイズ配色
  sky: {
    track: "bg-sky-100",
    bar: "bg-gradient-to-r from-sky-400 to-violet-500",
    choiceDefault: "bg-white text-sky-700 border-sky-300 hover:bg-sky-50 hover:border-sky-400",
    choiceSelected: "bg-violet-100 text-violet-700 border-violet-400",
    accentText: "text-sky-700",
    strongText: "text-violet-600",
    mutedText: "text-sky-500",
    softGradient: "bg-gradient-to-br from-sky-50 to-violet-50",
    primaryButton: "bg-gradient-to-r from-sky-500 to-violet-500",
    retryButton: "bg-gradient-to-r from-violet-500 to-violet-600",
    link: "text-sky-600 hover:text-sky-700",
  },
  // さんすう（math）— 既存 sansuu 配色
  orange: {
    track: "bg-orange-100",
    bar: "bg-gradient-to-r from-orange-400 to-pink-500",
    choiceDefault: "bg-white text-orange-700 border-orange-300 hover:bg-orange-50 hover:border-orange-400",
    choiceSelected: "bg-pink-100 text-pink-700 border-pink-400",
    accentText: "text-orange-700",
    strongText: "text-pink-600",
    mutedText: "text-orange-500",
    softGradient: "bg-gradient-to-br from-orange-50 to-pink-50",
    primaryButton: "bg-gradient-to-r from-orange-500 to-pink-500",
    retryButton: "bg-gradient-to-r from-pink-500 to-pink-600",
    link: "text-orange-600 hover:text-orange-700",
  },
  // とけい（clock）— amber 基調 + sky
  amber: {
    track: "bg-amber-100",
    bar: "bg-gradient-to-r from-amber-400 to-sky-400",
    choiceDefault: "bg-white text-amber-700 border-amber-300 hover:bg-amber-50 hover:border-amber-400",
    choiceSelected: "bg-sky-100 text-sky-700 border-sky-400",
    accentText: "text-amber-700",
    strongText: "text-amber-600",
    mutedText: "text-amber-500",
    softGradient: "bg-gradient-to-br from-amber-50 to-sky-50",
    primaryButton: "bg-gradient-to-r from-amber-400 to-sky-400",
    retryButton: "bg-gradient-to-r from-amber-500 to-amber-600",
    link: "text-amber-600 hover:text-amber-700",
  },
  // 予備（将来教科用）
  emerald: {
    track: "bg-emerald-100",
    bar: "bg-gradient-to-r from-emerald-400 to-teal-500",
    choiceDefault: "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400",
    choiceSelected: "bg-teal-100 text-teal-700 border-teal-400",
    accentText: "text-emerald-700",
    strongText: "text-teal-600",
    mutedText: "text-emerald-500",
    softGradient: "bg-gradient-to-br from-emerald-50 to-teal-50",
    primaryButton: "bg-gradient-to-r from-emerald-500 to-teal-500",
    retryButton: "bg-gradient-to-r from-teal-500 to-teal-600",
    link: "text-emerald-600 hover:text-emerald-700",
  },
  rose: {
    track: "bg-rose-100",
    bar: "bg-gradient-to-r from-rose-400 to-pink-500",
    choiceDefault: "bg-white text-rose-700 border-rose-300 hover:bg-rose-50 hover:border-rose-400",
    choiceSelected: "bg-pink-100 text-pink-700 border-pink-400",
    accentText: "text-rose-700",
    strongText: "text-pink-600",
    mutedText: "text-rose-500",
    softGradient: "bg-gradient-to-br from-rose-50 to-pink-50",
    primaryButton: "bg-gradient-to-r from-rose-500 to-pink-500",
    retryButton: "bg-gradient-to-r from-pink-500 to-pink-600",
    link: "text-rose-600 hover:text-rose-700",
  },
  violet: {
    track: "bg-violet-100",
    bar: "bg-gradient-to-r from-violet-400 to-fuchsia-500",
    choiceDefault: "bg-white text-violet-700 border-violet-300 hover:bg-violet-50 hover:border-violet-400",
    choiceSelected: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-400",
    accentText: "text-violet-700",
    strongText: "text-fuchsia-600",
    mutedText: "text-violet-500",
    softGradient: "bg-gradient-to-br from-violet-50 to-fuchsia-50",
    primaryButton: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    retryButton: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600",
    link: "text-violet-600 hover:text-violet-700",
  },
};

/** テーマ名から DrillTheme を取得（未知名は sky フォールバック）。 */
export function getTheme(name: ThemeName = "sky"): DrillTheme {
  return themes[name] ?? themes.sky;
}
