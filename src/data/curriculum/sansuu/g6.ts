// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小6
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>" / 問題 = "<unitId>.q-<n>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 学習指導要領（小6算数）準拠: 対称な図形 / 文字と式 / 分数のかけ算とわり算 /
//   比とその利用 / 拡大図と縮図 / 円の面積 / 角柱と円柱の体積 /
//   比例と反比例 / 並べ方と組み合わせ(場合の数) / データの調べ方。
// generators レジストリは g1 用の within-10/20 のみで g6 には適合しないため、
// 全単元 固定 questions[] を使用（全問 explanation 必須）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  Question,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// ※ 教科定義は学年間で共有される単一の真実。集約(index)側で重複排除する前提。

export const sansuuSubject: Subject = {
  id: "sansuu",
  name: "さんすう",
  formalName: "算数",
  emoji: "🔢",
  theme: "orange",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// 学習指導要領（高学年）の4領域に対応。number-calc は g1 と同一 id（集約で dedupe）。

export const sansuuG6Domains: Domain[] = [
  {
    id: "sansuu.number-calc",
    subjectId: "sansuu",
    name: "かずとけいさん",
    formalName: "数と計算",
  },
  {
    id: "sansuu.geometry",
    subjectId: "sansuu",
    name: "ずけい",
    formalName: "図形",
  },
  {
    id: "sansuu.change-relation",
    subjectId: "sansuu",
    name: "へんかとかんけい",
    formalName: "変化と関係",
  },
  {
    id: "sansuu.data",
    subjectId: "sansuu",
    name: "データのかつよう",
    formalName: "データの活用",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし。g6内で自己完結）:
//
//   letters-expressions ─┬─▶ circle-area ──▶ solid-volume
//                        └─▶ proportion
//   fraction-mult-div ───▶ ratio ──▶ proportion
//   line-point-symmetry ─▶ scale-figures
//   combinatorics / data-analysis（独立）
//
const U = {
  symmetry: "sansuu.g6.line-point-symmetry",
  letters: "sansuu.g6.letters-expressions",
  fractionMulDiv: "sansuu.g6.fraction-mult-div",
  ratio: "sansuu.g6.ratio",
  scaleFigures: "sansuu.g6.scale-figures",
  circleArea: "sansuu.g6.circle-area",
  solidVolume: "sansuu.g6.solid-volume",
  proportion: "sansuu.g6.proportion",
  combinatorics: "sansuu.g6.combinatorics",
  dataAnalysis: "sansuu.g6.data-analysis",
} as const;

export const sansuuG6Units: Unit[] = [
  {
    id: U.symmetry,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "対称な図形",
    order: 1,
    realWorldUse: "ちょうちょや 雪のけっしょう、マークの デザインなど、左右や 点で つりあう 形を 見つけるのに つかうよ。",
    leadsTo: [U.scaleFigures],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.letters,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.number-calc",
    title: "文字と式",
    order: 2,
    realWorldUse: "わからない 数を x や a で あらわすと、ねだんや 面積の きまりを ひとつの 式で かんたんに 書けるよ。",
    leadsTo: [U.circleArea, U.proportion],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.fractionMulDiv,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.number-calc",
    title: "分数のかけ算とわり算",
    order: 3,
    realWorldUse: "リボンを 2/3m ずつ 何本も つかうときや、3/4L を 何人かで 分けるときの 計算に つかうよ。",
    leadsTo: [U.ratio],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.ratio,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.change-relation",
    title: "比とその利用",
    order: 4,
    realWorldUse: "ジュースと 水を 1:4 で まぜる、料理の 分量を 人数ぶん ふやすなど、わりあいを そろえるのに つかうよ。",
    leadsTo: [U.proportion, U.scaleFigures],
    prerequisites: [U.fractionMulDiv],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.scaleFigures,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "拡大図と縮図",
    order: 5,
    realWorldUse: "地図の 縮尺から じっさいの きょりを もとめたり、せっけい図を 大きく・小さく かくのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.symmetry],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.circleArea,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "円の面積",
    order: 6,
    realWorldUse: "まるい テーブルや ピザ、花だんの 広さを 計算するときに つかうよ。",
    leadsTo: [U.solidVolume],
    prerequisites: [U.letters],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.solidVolume,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "角柱と円柱の体積",
    order: 7,
    realWorldUse: "水とうや かんづめ、はこに 入る 水や ものの かさ（体積）を もとめるのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.letters, U.circleArea],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.proportion,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.change-relation",
    title: "比例と反比例",
    order: 8,
    realWorldUse: "走る 時間と すすむ きょり、ねだんと 個数など、2つの 量が どう かわるかを 予想するのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.letters, U.ratio],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.combinatorics,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.data",
    title: "並べ方と組み合わせ",
    order: 9,
    realWorldUse: "リレーの 走る じゅんばんや、試合の 組み合わせ、メニューの えらび方が 何通り あるかを 数えるのに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.dataAnalysis,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.data",
    title: "データの調べ方",
    order: 10,
    realWorldUse: "テストの 点や 記録を 整理して、平均値・中央値・最頻値で クラスの ようすを つかむのに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 各単元の固定問題（全問 explanation 必須） ──────────────

const symmetryQuestions: Question[] = [
  {
    id: `${U.symmetry}.q-1`,
    unitId: U.symmetry,
    prompt: "線対称な 図形で、おって ぴったり かさなる おりめの 直線を なんという？",
    explanation: "線対称の おりめに なる 直線を「対称の軸」と いうよ。この 軸で おると 左右が ぴったり かさなる。",
    format: "choice",
    choices: ["対称の軸", "対称の中心", "直径", "対角線"],
    answer: "対称の軸",
  },
  {
    id: `${U.symmetry}.q-2`,
    unitId: U.symmetry,
    prompt: "点対称な 図形を、ある点を 中心に 180°まわすと どうなる？",
    explanation: "点対称な 図形は、対称の中心の まわりに 180°まわすと もとの 形に ぴったり かさなるよ。",
    format: "choice",
    choices: ["もとの形に ぴったり かさなる", "大きく なる", "形が かわる", "うらがえる"],
    answer: "もとの形に ぴったり かさなる",
  },
  {
    id: `${U.symmetry}.q-3`,
    unitId: U.symmetry,
    prompt: "正方形の 対称の軸は 何本 ある？",
    explanation: "正方形は たて・よこの まん中 2本と、ななめ 2本で あわせて 4本の 対称の軸が あるよ。",
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.symmetry}.q-4`,
    unitId: U.symmetry,
    prompt: "（長方形でない）平行四辺形は、つぎの どれに あてはまる？",
    explanation: "平行四辺形は 180°まわすと かさなるので 点対称。でも おって かさなる 軸は ないので 線対称では ないよ。",
    format: "choice",
    choices: ["点対称だけ", "線対称だけ", "線対称でも点対称でもある", "どちらでもない"],
    answer: "点対称だけ",
  },
  {
    id: `${U.symmetry}.q-5`,
    unitId: U.symmetry,
    prompt: "正三角形の 対称の軸は 何本 ある？",
    explanation: "正三角形は それぞれの ちょう点から 向かいの 辺の まん中へ ひいた 直線 3本が 対称の軸だよ。",
    format: "number-input",
    answer: 3,
  },
];

const lettersQuestions: Question[] = [
  {
    id: `${U.letters}.q-1`,
    unitId: U.letters,
    prompt: "1本 x円の ジュースを 3本 買ったときの 代金を 式で あらわすと？",
    explanation: "1本 x円が 3本ぶんだから x×3（円）。文字を つかうと どんな ねだんでも ひとつの 式で あらわせるよ。",
    format: "choice",
    choices: ["x×3", "x＋3", "x−3", "x÷3"],
    answer: "x×3",
  },
  {
    id: `${U.letters}.q-2`,
    unitId: U.letters,
    prompt: "x×4＝20 の とき、x の あたいは いくつ？",
    explanation: "x×4＝20 だから x＝20÷4＝5。かけ算の ぎゃくの わり算で もとめられるよ。",
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.letters}.q-3`,
    unitId: U.letters,
    prompt: "x＋8＝15 の とき、x の あたいは いくつ？",
    explanation: "x＝15−8＝7。たし算の ぎゃくの ひき算で もとめるよ。",
    format: "number-input",
    answer: 7,
  },
  {
    id: `${U.letters}.q-4`,
    unitId: U.letters,
    prompt: "1個 a円の パンを 5個 買って 1000円 はらった。おつりの 式は？",
    explanation: "パン代は a×5 円。1000円 から ひくので おつりは 1000−a×5（円）だよ。",
    format: "choice",
    choices: ["1000−a×5", "1000＋a×5", "a×5−1000", "1000−a÷5"],
    answer: "1000−a×5",
  },
  {
    id: `${U.letters}.q-5`,
    unitId: U.letters,
    prompt: "たて x cm、よこ 6cm の 長方形の 面積を 式で あらわすと？",
    explanation: "長方形の 面積は たて×よこ。だから x×6（cm²）だよ。",
    format: "choice",
    choices: ["x×6", "x＋6", "x×6×2", "(x＋6)×2"],
    answer: "x×6",
  },
];

const fractionQuestions: Question[] = [
  {
    id: `${U.fractionMulDiv}.q-1`,
    unitId: U.fractionMulDiv,
    prompt: "2/3 × 3/4 ＝ ？",
    explanation: "分数の かけ算は ぶんし×ぶんし、ぶんぼ×ぶんぼ。6/12 に なり、やくぶんすると 1/2 だよ。",
    format: "choice",
    choices: ["1/2", "1/4", "5/12", "6/7"],
    answer: "1/2",
  },
  {
    id: `${U.fractionMulDiv}.q-2`,
    unitId: U.fractionMulDiv,
    prompt: "分数の わり算は どう 計算する？",
    explanation: "わる数の ぎゃくすう（分母と分子を 入れかえた数）を かければ もとめられるよ。",
    format: "choice",
    choices: ["わる数の ぎゃくすうを かける", "そのまま かける", "ぶんぼ どうしを わる", "ぶんし だけ わる"],
    answer: "わる数の ぎゃくすうを かける",
  },
  {
    id: `${U.fractionMulDiv}.q-3`,
    unitId: U.fractionMulDiv,
    prompt: "3/5 ÷ 2/3 ＝ ？",
    explanation: "わる数 2/3 の ぎゃくすう 3/2 を かける。3/5×3/2＝9/10 だよ。",
    format: "choice",
    choices: ["9/10", "6/15", "2/5", "5/9"],
    answer: "9/10",
  },
  {
    id: `${U.fractionMulDiv}.q-4`,
    unitId: U.fractionMulDiv,
    prompt: "1/2 ÷ 1/4 ＝ ？（答えは 整数で）",
    explanation: "1/4 の ぎゃくすう 4/1 を かける。1/2×4＝4/2＝2 だよ。",
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.fractionMulDiv}.q-5`,
    unitId: U.fractionMulDiv,
    prompt: "4/7 × 7/8 ＝ ？",
    explanation: "ぶんし×ぶんし＝28、ぶんぼ×ぶんぼ＝56 で 28/56。やくぶんして 1/2 だよ。",
    format: "choice",
    choices: ["1/2", "11/15", "4/8", "28/15"],
    answer: "1/2",
  },
];

const ratioQuestions: Question[] = [
  {
    id: `${U.ratio}.q-1`,
    unitId: U.ratio,
    prompt: "3:4 の 比の 値は？",
    explanation: "比の 値は 前の数÷後ろの数。3÷4＝3/4 だよ。",
    format: "choice",
    choices: ["3/4", "4/3", "7", "12"],
    answer: "3/4",
  },
  {
    id: `${U.ratio}.q-2`,
    unitId: U.ratio,
    prompt: "2:3 と 等しい 比は どれ？",
    explanation: "両方を おなじ 数で かけても 比は かわらない。2×2:3×2＝4:6 だよ。",
    format: "choice",
    choices: ["4:6", "2:6", "5:6", "3:2"],
    answer: "4:6",
  },
  {
    id: `${U.ratio}.q-3`,
    unitId: U.ratio,
    prompt: "12:18 を いちばん かんたんな 比に すると？",
    explanation: "12と18の さいだいこうやくすう 6で わると 2:3 に なるよ。",
    format: "choice",
    choices: ["2:3", "6:9", "4:6", "1:2"],
    answer: "2:3",
  },
  {
    id: `${U.ratio}.q-4`,
    unitId: U.ratio,
    prompt: "みかんと りんごの 数の 比が 2:5。みかんが 6個の とき、りんごは 何個？",
    explanation: "みかんは 2→6で 3倍。りんごも 同じ 3倍だから 5×3＝15個 だよ。",
    format: "number-input",
    answer: 15,
  },
  {
    id: `${U.ratio}.q-5`,
    unitId: U.ratio,
    prompt: "さとうと 水を 1:4 で まぜる。水が 200mL の とき、さとうは 何g？",
    explanation: "水は 4に あたり 200mL。1に あたる さとうは 200÷4＝50g だよ。",
    format: "number-input",
    answer: 50,
  },
];

const scaleQuestions: Question[] = [
  {
    id: `${U.scaleFigures}.q-1`,
    unitId: U.scaleFigures,
    prompt: "2倍の 拡大図を かくと、辺の 長さは どう なる？",
    explanation: "拡大図では すべての 辺が 同じ わりあいで のびる。2倍の 拡大図なら 辺も 2倍だよ。",
    format: "choice",
    choices: ["2倍に なる", "半分に なる", "かわらない", "4倍に なる"],
    answer: "2倍に なる",
  },
  {
    id: `${U.scaleFigures}.q-2`,
    unitId: U.scaleFigures,
    prompt: "拡大・縮小しても かわらないのは どれ？",
    explanation: "拡大図・縮図では 辺の 長さは かわるけれど、角の 大きさは もとの 図形と 同じだよ。",
    format: "choice",
    choices: ["角の 大きさ", "辺の 長さ", "面積", "まわりの 長さ"],
    answer: "角の 大きさ",
  },
  {
    id: `${U.scaleFigures}.q-3`,
    unitId: U.scaleFigures,
    prompt: "縮尺 1/1000 の 地図で 2cm の きょりは、じっさいは 何m？",
    explanation: "じっさいは 2cm×1000＝2000cm。100cm＝1m だから 2000cm＝20m だよ。",
    format: "number-input",
    answer: 20,
  },
  {
    id: `${U.scaleFigures}.q-4`,
    unitId: U.scaleFigures,
    prompt: "じっさいの 長さ 50m を 1/1000 の 縮図に かくと 何cm？",
    explanation: "50m＝5000cm。それを 1/1000 に するから 5000÷1000＝5cm だよ。",
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.scaleFigures}.q-5`,
    unitId: U.scaleFigures,
    prompt: "もとの 図形を 1/3 の 縮図に すると、辺の 長さは どう なる？",
    explanation: "縮図は すべての 辺を 同じ わりあいで ちぢめる。1/3 の 縮図なら 辺も 1/3 だよ。",
    format: "choice",
    choices: ["1/3に なる", "3倍に なる", "かわらない", "1/9に なる"],
    answer: "1/3に なる",
  },
];

const circleAreaQuestions: Question[] = [
  {
    id: `${U.circleArea}.q-1`,
    unitId: U.circleArea,
    prompt: "円の 面積を もとめる 公式は？",
    explanation: "円の 面積＝半径×半径×円周率（3.14）。半径を 2回 かけてから 3.14 を かけるよ。",
    format: "choice",
    choices: ["半径×半径×3.14", "直径×3.14", "半径×2×3.14", "半径×3.14"],
    answer: "半径×半径×3.14",
  },
  {
    id: `${U.circleArea}.q-2`,
    unitId: U.circleArea,
    prompt: "半径 10cm の 円の 面積は 何cm²？（円周率 3.14）",
    explanation: "10×10×3.14＝314。半径×半径×3.14 で もとめるよ。",
    format: "number-input",
    answer: 314,
  },
  {
    id: `${U.circleArea}.q-3`,
    unitId: U.circleArea,
    prompt: "半径 5cm の 円の 面積は 何cm²？（円周率 3.14）",
    explanation: "5×5×3.14＝78.5（cm²）だよ。",
    format: "number-input",
    answer: 78.5,
    tolerance: 0.01,
  },
  {
    id: `${U.circleArea}.q-4`,
    unitId: U.circleArea,
    prompt: "直径 8cm の 円の 面積は 何cm²？（円周率 3.14）",
    explanation: "まず 半径＝直径÷2＝4cm。4×4×3.14＝50.24（cm²）だよ。",
    format: "number-input",
    answer: 50.24,
    tolerance: 0.01,
  },
  {
    id: `${U.circleArea}.q-5`,
    unitId: U.circleArea,
    prompt: "円周率は およそ いくつ？",
    explanation: "円周率は 直径に たいする 円周の わりあいで、およそ 3.14 だよ。",
    format: "choice",
    choices: ["3.14", "3.41", "2.14", "31.4"],
    answer: "3.14",
  },
];

const volumeQuestions: Question[] = [
  {
    id: `${U.solidVolume}.q-1`,
    unitId: U.solidVolume,
    prompt: "角柱や 円柱の 体積を もとめる 公式は？",
    explanation: "角柱・円柱の 体積＝底面積×高さ。下の 面の 広さに 高さを かけるよ。",
    format: "choice",
    choices: ["底面積×高さ", "底面積＋高さ", "底面積×高さ÷2", "まわりの長さ×高さ"],
    answer: "底面積×高さ",
  },
  {
    id: `${U.solidVolume}.q-2`,
    unitId: U.solidVolume,
    prompt: "底面積 20cm²、高さ 5cm の 角柱の 体積は 何cm³？",
    explanation: "体積＝底面積×高さ＝20×5＝100（cm³）だよ。",
    format: "number-input",
    answer: 100,
  },
  {
    id: `${U.solidVolume}.q-3`,
    unitId: U.solidVolume,
    prompt: "たて 4cm、よこ 5cm、高さ 10cm の 四角柱の 体積は 何cm³？",
    explanation: "底面積＝4×5＝20cm²。体積＝20×10＝200（cm³）だよ。",
    format: "number-input",
    answer: 200,
  },
  {
    id: `${U.solidVolume}.q-4`,
    unitId: U.solidVolume,
    prompt: "底面が 半径 10cm の 円、高さ 3cm の 円柱の 体積は 何cm³？（円周率 3.14）",
    explanation: "底面積＝10×10×3.14＝314cm²。体積＝314×3＝942（cm³）だよ。",
    format: "number-input",
    answer: 942,
  },
  {
    id: `${U.solidVolume}.q-5`,
    unitId: U.solidVolume,
    prompt: "円柱の 底面積を もとめるには？",
    explanation: "底面は 円だから、底面積＝半径×半径×3.14 で もとめるよ。",
    format: "choice",
    choices: ["半径×半径×3.14", "直径×3.14", "半径×高さ", "半径×2×3.14"],
    answer: "半径×半径×3.14",
  },
];

const proportionQuestions: Question[] = [
  {
    id: `${U.proportion}.q-1`,
    unitId: U.proportion,
    prompt: "y が x に 比例する とき、x が 2倍に なると y は？",
    explanation: "比例では x が 2倍・3倍に なると、y も 同じく 2倍・3倍に なるよ。",
    format: "choice",
    choices: ["2倍に なる", "1/2に なる", "かわらない", "4倍に なる"],
    answer: "2倍に なる",
  },
  {
    id: `${U.proportion}.q-2`,
    unitId: U.proportion,
    prompt: "y が x に 反比例する とき、x が 2倍に なると y は？",
    explanation: "反比例では x が 2倍に なると y は 1/2 に なる。x×y が いつも 同じ あたいに なるよ。",
    format: "choice",
    choices: ["1/2に なる", "2倍に なる", "かわらない", "3倍に なる"],
    answer: "1/2に なる",
  },
  {
    id: `${U.proportion}.q-3`,
    unitId: U.proportion,
    prompt: "y＝4×x の とき、x＝3 なら y は いくつ？",
    explanation: "y＝4×x に x＝3 を 入れて 4×3＝12 だよ。",
    format: "number-input",
    answer: 12,
  },
  {
    id: `${U.proportion}.q-4`,
    unitId: U.proportion,
    prompt: "比例の グラフは どんな 形に なる？",
    explanation: "比例の グラフは 原点（0,0）を 通る まっすぐな 直線に なるよ。",
    format: "choice",
    choices: ["原点を 通る 直線", "まがった 線", "横に まっすぐな 線", "円"],
    answer: "原点を 通る 直線",
  },
  {
    id: `${U.proportion}.q-5`,
    unitId: U.proportion,
    prompt: "面積が いつも 同じ 長方形で、たてと よこは どんな 関係？",
    explanation: "たて×よこ＝面積（一定）だから、たてが ふえると よこは へる。これは 反比例だよ。",
    format: "choice",
    choices: ["反比例", "比例", "どちらでもない", "両方"],
    answer: "反比例",
  },
];

const combinatoricsQuestions: Question[] = [
  {
    id: `${U.combinatorics}.q-1`,
    unitId: U.combinatorics,
    prompt: "A、B の 2人が 1れつに 並ぶ 並び方は 何通り？",
    explanation: "（A,B）と（B,A）の 2通りだよ。",
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.combinatorics}.q-2`,
    unitId: U.combinatorics,
    prompt: "A、B、C の 3人が 1れつに 並ぶ 並び方は 何通り？",
    explanation: "先頭が 3通り、つぎが 2通り、さいごが 1通りで 3×2×1＝6通りだよ。",
    format: "number-input",
    answer: 6,
  },
  {
    id: `${U.combinatorics}.q-3`,
    unitId: U.combinatorics,
    prompt: "赤・青・黄 の 3色から 2色を えらぶ 組み合わせは 何通り？",
    explanation: "（赤青）（赤黄）（青黄）の 3通り。組み合わせは じゅんばんを 考えないよ。",
    format: "number-input",
    answer: 3,
  },
  {
    id: `${U.combinatorics}.q-4`,
    unitId: U.combinatorics,
    prompt: "4つの チームが 総当たりで 試合を する。試合は 全部で 何試合？",
    explanation: "2チームの 組み合わせの 数だから 4×3÷2＝6試合だよ。",
    format: "number-input",
    answer: 6,
  },
  {
    id: `${U.combinatorics}.q-5`,
    unitId: U.combinatorics,
    prompt: "「並べ方」と「組み合わせ」の ちがいは？",
    explanation: "並べ方は じゅんばんを 考える（A→B と B→A は べつ）。組み合わせは じゅんばんを 考えない（同じ）よ。",
    format: "choice",
    choices: [
      "並べ方は じゅんばんを 考え、組み合わせは 考えない",
      "どちらも じゅんばんを 考える",
      "どちらも じゅんばんを 考えない",
      "組み合わせだけ じゅんばんを 考える",
    ],
    answer: "並べ方は じゅんばんを 考え、組み合わせは 考えない",
  },
];

const dataQuestions: Question[] = [
  {
    id: `${U.dataAnalysis}.q-1`,
    unitId: U.dataAnalysis,
    prompt: "平均値の もとめ方は？",
    explanation: "平均値＝全部の 合計÷個数。データを ならして 1つぶんの 大きさを 見るよ。",
    format: "choice",
    choices: ["合計÷個数", "いちばん 大きい数", "まん中の数", "いちばん 多い数"],
    answer: "合計÷個数",
  },
  {
    id: `${U.dataAnalysis}.q-2`,
    unitId: U.dataAnalysis,
    prompt: "2, 4, 6, 8, 10 の 平均値は？",
    explanation: "合計は 2＋4＋6＋8＋10＝30、個数は 5。30÷5＝6 だよ。",
    format: "number-input",
    answer: 6,
  },
  {
    id: `${U.dataAnalysis}.q-3`,
    unitId: U.dataAnalysis,
    prompt: "中央値（メジアン）とは どんな 値？",
    explanation: "中央値は データを 大きさの じゅんに ならべた ときの まん中の 値だよ。",
    format: "choice",
    choices: ["大きさの順に ならべた まん中の値", "いちばん 多い値", "全部の 合計", "平均の 値"],
    answer: "大きさの順に ならべた まん中の値",
  },
  {
    id: `${U.dataAnalysis}.q-4`,
    unitId: U.dataAnalysis,
    prompt: "3, 5, 5, 7, 9 の 最頻値（モード）は？",
    explanation: "最頻値は いちばん 多く 出て くる値。5が 2回で いちばん 多いから 5 だよ。",
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.dataAnalysis}.q-5`,
    unitId: U.dataAnalysis,
    prompt: "データを ある はばの 区間ごとに 整理した 表を 何という？",
    explanation: "「0〜10」「10〜20」などの 区間ごとに 個数を まとめた 表を 度数分布表と いうよ。",
    format: "choice",
    choices: ["度数分布表", "九九表", "時間割表", "せいせき表"],
    answer: "度数分布表",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────

export const sansuuG6Contents: Record<string, UnitContent> = {
  [U.symmetry]: {
    unitId: U.symmetry,
    learn: {
      unitId: U.symmetry,
      steps: [
        {
          heading: "線対称って なに？",
          body: "1本の 直線で おると、左右が ぴったり かさなる 図形を 線対称と いうよ。その 直線を「対称の軸」と いう。",
          visual: { kind: "emoji", value: "🦋", caption: "ちょうちょは 線対称" },
        },
        {
          heading: "点対称って なに？",
          body: "ある点（対称の中心）を 中心に 180°まわすと もとの 形に かさなる 図形を 点対称と いうよ。",
          visual: { kind: "emoji", value: "🔁 ▢", caption: "180°まわすと かさなる" },
        },
        {
          heading: "軸や 中心を 見つけよう",
          body: "正方形は 軸が 4本で 点対称、円は 軸が 何本も あって 点対称。形ごとに しらべてみよう。",
          visual: { kind: "emoji", value: "⬜ ⭕ 🔺", caption: "形で ちがう 対称" },
        },
      ],
    },
    test: { unitId: U.symmetry, questions: symmetryQuestions, questionCount: 5 },
  },

  [U.letters]: {
    unitId: U.letters,
    learn: {
      unitId: U.letters,
      steps: [
        {
          heading: "文字で 数を あらわす",
          body: "わからない 数や いろいろ かわる 数を、x や a などの 文字で あらわすよ。「1本 x円」のように つかう。",
          visual: { kind: "emoji", value: "🥤 ＝ x円", caption: "数の かわりに 文字" },
        },
        {
          heading: "ことばを 式に する",
          body: "「x円の ジュース 3本」は x×3。ことばの 関係を そのまま 式に できるのが 便利な ところ。",
          visual: { kind: "emoji", value: "x × 3 ＝ 代金", caption: "ことば → 式" },
        },
        {
          heading: "x の あたいを もとめる",
          body: "x×4＝20 のような 式から、ぎゃくの 計算で x＝5 と もとめられるよ。",
          visual: { kind: "emoji", value: "x×4＝20 → x＝5", caption: "ぎゃくの 計算" },
        },
      ],
    },
    test: { unitId: U.letters, questions: lettersQuestions, questionCount: 5 },
  },

  [U.fractionMulDiv]: {
    unitId: U.fractionMulDiv,
    learn: {
      unitId: U.fractionMulDiv,
      steps: [
        {
          heading: "分数の かけ算",
          body: "分数どうしの かけ算は、ぶんし×ぶんし、ぶんぼ×ぶんぼ。最後に やくぶんできるか たしかめよう。",
          visual: { kind: "emoji", value: "2/3 × 3/4 ＝ 1/2", caption: "ぶんし・ぶんぼを かける" },
        },
        {
          heading: "分数の わり算",
          body: "わる数を ひっくりかえした「ぎゃくすう」を かければ よいよ。3/5÷2/3＝3/5×3/2。",
          visual: { kind: "emoji", value: "÷ 2/3 → × 3/2", caption: "ぎゃくすうを かける" },
        },
      ],
    },
    test: { unitId: U.fractionMulDiv, questions: fractionQuestions, questionCount: 5 },
  },

  [U.ratio]: {
    unitId: U.ratio,
    learn: {
      unitId: U.ratio,
      steps: [
        {
          heading: "比って なに？",
          body: "2つの 数の わりあいを「2:3」のように あらわすのが 比だよ。前÷後ろが「比の値」。",
          visual: { kind: "emoji", value: "🥤:💧 ＝ 1:4", caption: "わりあいを あらわす" },
        },
        {
          heading: "等しい 比",
          body: "両方を 同じ数で かけても わっても 比は かわらない。12:18 は 6で わって 2:3 に できる。",
          visual: { kind: "emoji", value: "2:3 ＝ 4:6 ＝ 6:9", caption: "等しい 比" },
        },
        {
          heading: "比を つかう",
          body: "「2:5 で みかんが 6個」なら 3倍して りんごは 15個。わりあいを そろえて もとめるよ。",
          visual: { kind: "emoji", value: "2:5 → 6:15", caption: "何倍かを 考える" },
        },
      ],
    },
    test: { unitId: U.ratio, questions: ratioQuestions, questionCount: 5 },
  },

  [U.scaleFigures]: {
    unitId: U.scaleFigures,
    learn: {
      unitId: U.scaleFigures,
      steps: [
        {
          heading: "拡大図と 縮図",
          body: "形を かえずに 大きくした 図が 拡大図、小さくした 図が 縮図。辺の 長さは 同じ わりあいで かわる。",
          visual: { kind: "emoji", value: "🔺 → 🔺(大)", caption: "形は そのまま" },
        },
        {
          heading: "角は かわらない",
          body: "拡大・縮小しても 角の 大きさは かわらないよ。かわるのは 辺の 長さだけ。",
          visual: { kind: "emoji", value: "∠ ＝ ∠", caption: "角は 同じ" },
        },
        {
          heading: "縮尺で きょりを もとめる",
          body: "地図の 1/1000 などの 縮尺を つかうと、地図の 長さから じっさいの きょりを 計算できるよ。",
          visual: { kind: "emoji", value: "🗺️ 2cm → 20m", caption: "縮尺の 利用" },
        },
      ],
    },
    test: { unitId: U.scaleFigures, questions: scaleQuestions, questionCount: 5 },
  },

  [U.circleArea]: {
    unitId: U.circleArea,
    learn: {
      unitId: U.circleArea,
      steps: [
        {
          heading: "円の 面積の 公式",
          body: "円の 面積＝半径×半径×円周率（3.14）。半径を 2回 かけてから 3.14 を かけるよ。",
          visual: { kind: "emoji", value: "⭕ ＝ 半径×半径×3.14", caption: "公式を おぼえよう" },
        },
        {
          heading: "計算してみよう",
          body: "半径 10cm なら 10×10×3.14＝314cm²。直径しか わからない ときは まず 半分にして 半径を 出す。",
          visual: { kind: "emoji", value: "r=10 → 314cm²", caption: "あてはめて 計算" },
        },
      ],
    },
    test: { unitId: U.circleArea, questions: circleAreaQuestions, questionCount: 5 },
  },

  [U.solidVolume]: {
    unitId: U.solidVolume,
    learn: {
      unitId: U.solidVolume,
      steps: [
        {
          heading: "体積の 公式",
          body: "角柱も 円柱も 体積＝底面積×高さ。下の 面の 広さに 高さを かけるだけだよ。",
          visual: { kind: "emoji", value: "📦 ＝ 底面積×高さ", caption: "共通の 公式" },
        },
        {
          heading: "円柱の 体積",
          body: "円柱は 底面が 円。底面積＝半径×半径×3.14 を 先に 出してから 高さを かけるよ。",
          visual: { kind: "emoji", value: "🥫 r=10,h=3 → 942", caption: "円の 底面積×高さ" },
        },
      ],
    },
    test: { unitId: U.solidVolume, questions: volumeQuestions, questionCount: 5 },
  },

  [U.proportion]: {
    unitId: U.proportion,
    learn: {
      unitId: U.proportion,
      steps: [
        {
          heading: "比例",
          body: "x が 2倍・3倍に なると y も 2倍・3倍に なる 関係が 比例。y＝きまった数×x で あらわせるよ。",
          visual: { kind: "emoji", value: "x↑2倍 → y↑2倍", caption: "同じだけ ふえる" },
        },
        {
          heading: "反比例",
          body: "x が 2倍に なると y が 1/2 に なる 関係が 反比例。x×y が いつも 同じに なるのが とくちょう。",
          visual: { kind: "emoji", value: "x↑2倍 → y↓1/2", caption: "かけると 一定" },
        },
        {
          heading: "グラフで 見る",
          body: "比例の グラフは 原点を 通る 直線、反比例の グラフは なめらかな 曲線に なるよ。",
          visual: { kind: "emoji", value: "📈 直線 / 曲線", caption: "形の ちがい" },
        },
      ],
    },
    test: { unitId: U.proportion, questions: proportionQuestions, questionCount: 5 },
  },

  [U.combinatorics]: {
    unitId: U.combinatorics,
    learn: {
      unitId: U.combinatorics,
      steps: [
        {
          heading: "並べ方（じゅんばん あり）",
          body: "3人が 1れつに 並ぶ 並び方は、先頭3通り×つぎ2通り×さいご1通り＝6通り。じゅんばんを 考えるよ。",
          visual: { kind: "emoji", value: "ABC … 6通り", caption: "じゅんばんを 考える" },
        },
        {
          heading: "組み合わせ（じゅんばん なし）",
          body: "3色から 2色 えらぶような ときは じゅんばんを 考えない。（赤青）と（青赤）は 同じで 1通り。",
          visual: { kind: "emoji", value: "🔴🔵🟡 → 3通り", caption: "えらぶだけ" },
        },
        {
          heading: "落ちなく 数える",
          body: "図（じゅもく図）や 表を つかって、もれや 重なりが ないように 順序よく 数えよう。",
          visual: { kind: "emoji", value: "🌳 じゅもく図", caption: "もれなく 数える" },
        },
      ],
    },
    test: { unitId: U.combinatorics, questions: combinatoricsQuestions, questionCount: 5 },
  },

  [U.dataAnalysis]: {
    unitId: U.dataAnalysis,
    learn: {
      unitId: U.dataAnalysis,
      steps: [
        {
          heading: "3つの 代表値",
          body: "平均値（合計÷個数）、中央値（まん中の値）、最頻値（いちばん 多い値）で データの ようすを つかむよ。",
          visual: { kind: "emoji", value: "平均・中央・最頻", caption: "代表値" },
        },
        {
          heading: "度数分布表と グラフ",
          body: "データを 区間ごとに 整理した 表が 度数分布表。それを ぼうグラフのように したものが ヒストグラム。",
          visual: { kind: "emoji", value: "📊 区間ごとに 整理", caption: "ちらばりを 見る" },
        },
      ],
    },
    test: { unitId: U.dataAnalysis, questions: dataQuestions, questionCount: 5 },
  },
};
