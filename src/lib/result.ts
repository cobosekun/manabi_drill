// ══════════════════════════════════════════
// 結果判定の共通化（drill 基盤レイヤ）
// 既存 ResultModal の getResult() と同一の閾値（100/80/60/40）。
// color は教科非依存の汎用パレット（yellow/emerald/sky/violet/rose）に寄せる。
// （kokugo/clock の既存値と一致。sansuu は 60%帯 orange / 40%帯 pink だったが、
//  「見た目を大きく変えない」範囲で汎用色へ統一。）
// ══════════════════════════════════════════

export interface ResultTier {
  emoji: string;
  message: string;
  color: string;
}

/** 正答率（0–100）から結果ティアを返す。閾値は既存と同一。 */
export function getResultTier(percentage: number): ResultTier {
  if (percentage === 100) return { emoji: "👑", message: "パーフェクト！すごい！", color: "text-yellow-500" };
  if (percentage >= 80) return { emoji: "🌟", message: "とてもよくできました！", color: "text-emerald-500" };
  if (percentage >= 60) return { emoji: "😊", message: "よくがんばりました！", color: "text-sky-500" };
  if (percentage >= 40) return { emoji: "📚", message: "もうすこしがんばろう！", color: "text-violet-500" };
  return { emoji: "💪", message: "またちょうせんしよう！", color: "text-rose-500" };
}

/** 正答率（0–100）から星の数（0–5）を返す。既存と同一: Math.ceil(percentage / 20) */
export function starCount(percentage: number): number {
  return Math.ceil(percentage / 20);
}
