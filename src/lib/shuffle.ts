/**
 * Fisher-Yates シャッフル。元配列を破壊せず、シャッフル済みの新しい配列を返す。
 * 既存3ページ（kokugo / sansuu / clock）に散らばっていた同一実装の集約。
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
