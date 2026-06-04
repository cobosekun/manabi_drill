// ══════════════════════════════════════════
// カリキュラム・データモデル（全教科×全学年の背骨）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックとは分離する。
// 既存の基盤型は drill.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type { Grade, SubjectId, ThemeName, DrillMode } from "./drill";

export type { Grade, SubjectId, ThemeName, DrillMode };

// ── 教科 ──────────────────────────────────

export interface Subject {
  id: SubjectId;
  /** 表示名（基本ひらがな）例: "さんすう" */
  name: string;
  /** 正式教科名（漢字。説明・管理用）例: "算数" */
  formalName: string;
  emoji: string;
  theme: ThemeName;
  /** 開講学年（例: 理科・社会・英語は [3,4,5,6]、生活は [1,2]、家庭は [5,6]） */
  grades: Grade[];
  /** ドリル/テスト形式に厚く乗る教科か（算数/国語/理科/社会/英語=true、図工/音楽/体育/家庭/道徳=false=学習中心） */
  testable: boolean;
}

// ── 領域（教科内の大分類。学習指導要領の「領域・内容」に対応） ──
// 例: 算数="数と計算"/"図形"/"測定"/"変化と関係"/"データの活用"
export interface Domain {
  /** 例: "sansuu.number-calc" */
  id: string;
  subjectId: SubjectId;
  /** 表示名（ひらがな寄り）例: "かずとけいさん" */
  name: string;
  /** 正式名（漢字）例: "数と計算" */
  formalName: string;
}

// ── 単元（ロードマップの最小ノード。学習・テスト・メタを束ねる） ──
export interface Unit {
  /** 例: "sansuu.g1.add-within-10" */
  id: string;
  subjectId: SubjectId;
  grade: Grade;
  /** 所属領域 Domain.id */
  domainId: string;
  /** 単元名（基本ひらがな）例: "10までのたしざん" */
  title: string;
  /** 学年×教科内での並び順 */
  order: number;

  // ── 必須メタ情報（CEO要件: ロードマップ依存グラフの元データ） ──
  /** この学習が世の中の何に使えるか（実用例） */
  realWorldUse: string;
  /** 次に何の学習につながるか（後続単元の Unit.id 配列） */
  leadsTo: string[];
  /** 学ぶ前に必要な前提単元（先行単元の Unit.id 配列） */
  prerequisites: string[];

  // ── 2モード対応フラグ ──
  /** 学習モードを提供するか */
  hasLearn: boolean;
  /** テストモードを提供するか（testable=false の教科は確認クイズ程度 or false） */
  hasTest: boolean;
}

// ══════════════════════════════════════════
// 学習モード コンテンツ
// ══════════════════════════════════════════

// 図解・アニメの仕様（軽量実装: emoji / 事前定義SVG / 画像）。判別共用体。
//
// SVG は「name 別に params を型レベルで縛る」判別共用体にする。
// 将来 SVG を増やすときは SvgParamsMap に1行足すだけで型安全に拡張できる（量産で効く）。

/** svg名 → params型 の対応表。新しい図を足すときはここに1行追加する。 */
export interface SvgParamsMap {
  /** アナログ時計（提示時刻） */
  clock: { hour: number; minute: number };
  /** ブロック図。用途別フィールドを optional 集合で許容（単純個数 / たしざん / ひきざん / 位取り） */
  "number-blocks": {
    count?: number;                    // 単純な個数表示
    left?: number; right?: number;     // たしざん（左右に分けて合わせる）
    total?: number; remove?: number;   // ひきざん（全体から取り除く）
    tens?: number; ones?: number;      // 位取り（10のかたまり＋ばら）
  };
}

export type SvgName = keyof SvgParamsMap;

/** name と params を型レベルで一致させた svg ビジュアル */
export type SvgVisual = {
  [K in SvgName]: { kind: "svg"; name: K; params: SvgParamsMap[K]; caption?: string };
}[SvgName];

// ── アニメ（概念理解を助ける軽量 CSS/状態アニメ） ───────────────
// svg と同じく「name 別に params を型で縛る」判別共用体。静止の svg とは
// kind を分けて後方互換（既存 svg/emoji/image/none は一切変わらない）。
// prefers-reduced-motion 時は Visual.tsx 側で最終状態を静止表示する。
// 新しいアニメを足すときは AnimParamsMap に1行追加するだけ（量産で効く）。

/** anim名 → params型 の対応表。 */
export interface AnimParamsMap {
  /** 数が from(既定0)→to へ数えあがる。emoji 指定でその絵も to 個まで増える */
  "count-up": { to: number; from?: number; emoji?: string };
  /** 左右のブロックが合流＝たしざん（left ＋ right → 合計が ふわっと出る） */
  "blocks-add": { left: number; right: number };
  /** 全体から remove 個が消える＝ひきざん（total − remove → のこりが出る） */
  "blocks-remove": { total: number; remove: number };
  /** 針が from→to へ動く時計（from 省略時は 12時ちょうどから） */
  "clock-tick": { hour: number; minute: number; fromHour?: number; fromMinute?: number };
  /** だんだん育つ（種→芽→…）。stages 省略時は植物の既定段階を大きくしながら見せる */
  grow: { stages?: string[] };
}

export type AnimName = keyof AnimParamsMap;

/** name と params を型レベルで一致させた anim ビジュアル */
export type AnimVisual = {
  [K in AnimName]: { kind: "anim"; name: K; params: AnimParamsMap[K]; caption?: string };
}[AnimName];

export type VisualSpec =
  | { kind: "none" }
  | { kind: "emoji"; value: string; caption?: string }
  | SvgVisual
  | AnimVisual
  | { kind: "image"; src: string; alt: string };

export interface LearnStep {
  /** 小見出し（ひらがな） */
  heading: string;
  /** 説明本文（ひらがな中心。子どもが一人で読める平易さ） */
  body: string;
  /** 段階的に見せる図・アニメ */
  visual?: VisualSpec;
}

export interface LearnContent {
  unitId: string;
  /** 段階的な説明ステップ（視覚的・段階的に理解を促す） */
  steps: LearnStep[];
  /** 学習の最後に出す理解確認クイズ（任意。testable=false 教科でも確認に使える） */
  checkQuestions?: Question[];
}

// ══════════════════════════════════════════
// テストモード 問題（教科横断の判別共用体）
// ══════════════════════════════════════════

export type QuestionFormat =
  | "choice"        // 4択など（漢字・社会・理科・英語の多く）
  | "number-input"  // 数値入力（算数）
  | "text-input"    // 文字入力（漢字書き取り等）
  | "clock-read"    // 時計の読み取り（SVG提示→選択 or 入力）
  | "ordering"      // 並べ替え
  | "matching";     // 対応付け

export interface BaseQuestion {
  id: string;
  unitId: string;
  /** 問題文（ひらがな中心。漢字学習等の意図的箇所のみ漢字） */
  prompt: string;
  /** 回答ごとに表示する解説（テストモード必須） */
  explanation: string;
  /** 問題に添える図・時計など */
  visual?: VisualSpec;
}

export interface ChoiceQuestion extends BaseQuestion {
  format: "choice";
  choices: string[];
  answer: string;
}
export interface NumberInputQuestion extends BaseQuestion {
  format: "number-input";
  answer: number;
  /** 入力誤差許容（基本0=完全一致） */
  tolerance?: number;
}
export interface TextInputQuestion extends BaseQuestion {
  format: "text-input";
  answer: string;
  /** 別解（送り仮名揺れ等） */
  acceptableAnswers?: string[];
}
export interface ClockReadQuestion extends BaseQuestion {
  format: "clock-read";
  /** SVG時計の提示時刻は visual(kind:"svg",name:"clock",params) で表現。回答は選択肢で */
  choices: string[];
  answer: string;
}
export interface OrderingQuestion extends BaseQuestion {
  format: "ordering";
  items: string[];
  /** 正しい並び（items のインデックス順） */
  answerOrder: number[];
}
export interface MatchingQuestion extends BaseQuestion {
  format: "matching";
  left: string[];
  right: string[];
  /** left[i] に対応する right のインデックス */
  answerPairs: number[];
}

export type Question =
  | ChoiceQuestion
  | NumberInputQuestion
  | TextInputQuestion
  | ClockReadQuestion
  | OrderingQuestion
  | MatchingQuestion;

// ══════════════════════════════════════════
// テストコンテンツ（固定問題リスト or 動的ジェネレータ）
// ══════════════════════════════════════════

export interface TestContent {
  unitId: string;
  /** 固定の問題リスト（漢字・社会など） */
  questions?: Question[];
  /**
   * 動的生成の場合に参照するジェネレータID（算数・時計など無限生成系）。
   * 実体は src/lib/generators のレジストリに登録（data には関数を置かず参照のみ＝data/UI/ロジック分離）。
   */
  generatorId?: string;
  /** 1セッションの出題数 */
  questionCount: number;
}

// 単元の全コンテンツ（学習＋テストを束ねる）
export interface UnitContent {
  unitId: string;
  learn?: LearnContent;
  test?: TestContent;
}

// ══════════════════════════════════════════
// 集約型（src/data が公開する単一の真実の形）
// ══════════════════════════════════════════

export interface Curriculum {
  subjects: Subject[];
  domains: Domain[];
  units: Unit[];
  /** unitId -> コンテンツ */
  contents: Record<string, UnitContent>;
}

// ロードマップ描画用の依存エッジ（prerequisites/leadsTo から導出可能）
export interface RoadmapEdge {
  from: string; // 前提 Unit.id
  to: string;   // 後続 Unit.id
}

// 進捗（単元単位。既存の問題単位 QuestionProgress は drill.ts を継続利用）
export interface UnitProgress {
  unitId: string;
  mode: DrillMode;
  /** 直近のテスト正答率(0-100) */
  bestScore?: number;
  /** 学習モードを最後まで見たか */
  learnCompleted?: boolean;
  /** 取得済みバッジ等の達成フラグ */
  cleared: boolean;
}
