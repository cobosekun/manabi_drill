// ══════════════════════════════════════════
// 汎用 localStorage ヘルパ（drill 基盤レイヤ）
// 既存の todayKey / loadProgress / saveProgress / loadDailyStats /
// saveDailyStats が、この上に薄く乗せられる形にする。
// 既存のキー名（kanji-drill-... / math-drill-...）と完全互換。
// ══════════════════════════════════════════

/**
 * 教科ごとの日付キーを返す。形式: `${subject}-drill-YYYY-MM-DD`
 * 既存の `kanji-drill-...` / `math-drill-...` と同じ形式（後方互換）。
 * 例: dailyKey("kanji") -> "kanji-drill-2026-06-02"
 */
export function dailyKey(subject: string, date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${subject}-drill-${y}-${m}-${d}`;
}

/**
 * localStorage から JSON を読み込む。
 * SSR 安全（window 未定義時は fallback）・パース失敗/破損時も fallback を返す。
 */
export function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * localStorage へ JSON を書き込む。SSR 安全（window 未定義時は何もしない）。
 */
export function saveJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota 超過等は無視 */
  }
}
