// ══════════════════════════════════════════
// 共通ドメイン型（drill 基盤レイヤ）
// 既存 src/types/question.ts 等とは衝突させない新規ファイル。
// ══════════════════════════════════════════

// 学年・教科の背骨（将来のカリキュラム用。今は型のみ定義）
export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export type SubjectId =
  | "kokugo" | "sansuu" | "rika" | "shakai" | "seikatsu"
  | "eigo" | "zukou" | "ongaku" | "taiiku" | "katei" | "doutoku"
  | "kyoyo" | "oyo" | "it";
// とけいは sansuu 配下の単元として扱う想定（今は据え置き）

// 学習/テストの2モード（後続波で各教科に載せる土台）
export type DrillMode = "learn" | "test";

// 共通の進捗（既存の QuestionProgress 系を一本化）
export interface QuestionProgress {
  questionId: number;
  isCorrect: boolean;
  attempts: number;
}

// 回答ボタンの状態（3ページで重複していた型）
export type ButtonState = "default" | "selected" | "correct" | "incorrect" | "disabled";

// テーマ名（教科ごとの配色）
export type ThemeName = "sky" | "orange" | "amber" | "emerald" | "rose" | "violet";
