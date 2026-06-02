// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小4
// 学習指導要領 小4算数 4領域を網羅:
//   A 数と計算 / B 図形 / C 変化と関係 / D データの活用
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 注: g4 用の generator は未登録のため、テストは全て固定 questions[]（全問 explanation 必須）。
//     svg name は clock / number-blocks のみのため、g4 の図は emoji / none で代替。
// ══════════════════════════════════════════

import type {
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  NumberInputQuestion,
} from "@/types/curriculum";

// ── 領域 ──────────────────────────────────

export const sansuuG4Domains: Domain[] = [
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
// 依存グラフ（数と計算を背骨に、図形・変化と関係・データへ枝分かれ）:
//
//   (g1)numbers-to-20 ─▶ large-numbers ─┬─▶ rounding-estimation ─▶ operation-order
//                                         └─▶ decimals ─▶ fractions
//   division-algorithm ─▶ operation-order, area
//   angles ─▶ perpendicular-parallel ─┬─▶ area
//                                       └─▶ rectangular-solids
//   changing-quantities ─▶ line-graph ─▶ two-way-table
//
const U = {
  largeNumbers: "sansuu.g4.large-numbers",
  divisionAlgo: "sansuu.g4.division-algorithm",
  rounding: "sansuu.g4.rounding-estimation",
  operationOrder: "sansuu.g4.operation-order",
  decimals: "sansuu.g4.decimals",
  fractions: "sansuu.g4.fractions",
  angles: "sansuu.g4.angles",
  perpParallel: "sansuu.g4.perpendicular-parallel",
  area: "sansuu.g4.area",
  solids: "sansuu.g4.rectangular-solids",
  changing: "sansuu.g4.changing-quantities",
  lineGraph: "sansuu.g4.line-graph",
  twoWayTable: "sansuu.g4.two-way-table",
} as const;

// 検証済みの先行学年単元（g1）への前提リンク
const G1_NUMBERS_TO_20 = "sansuu.g1.numbers-to-20";

export const sansuuG4Units: Unit[] = [
  // ── A 数と計算 ──
  {
    id: U.largeNumbers,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.number-calc",
    title: "おおきなかず（億・兆）",
    order: 1,
    realWorldUse: "にっぽんのじんこうや、おかねの「おく」「ちょう」など、とてもおおきいかずをよむときにつかうよ。",
    leadsTo: [U.rounding, U.decimals],
    prerequisites: [G1_NUMBERS_TO_20],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.divisionAlgo,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.number-calc",
    title: "わり算のひっさん",
    order: 2,
    realWorldUse: "おかしを なんにんかで おなじかずずつ わけるときに、ひとりぶんのかずをもとめるのにつかうよ。",
    leadsTo: [U.operationOrder, U.area],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.rounding,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.number-calc",
    title: "がい数（四捨五入）",
    order: 3,
    realWorldUse: "「だいたい なんにん」「やく いくら」のように、おおよそのかずでつたえたり、ねだんを見つもるときにつかうよ。",
    leadsTo: [U.operationOrder],
    prerequisites: [U.largeNumbers],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.operationOrder,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.number-calc",
    title: "計算のきまり（しきとじゅんじょ）",
    order: 4,
    realWorldUse: "かいものの ごうけいを ひとつのしきで かいたり、（ ）や ×÷さきに のルールでただしくけいさんするときにつかうよ。",
    leadsTo: [],
    prerequisites: [U.divisionAlgo, U.rounding],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.decimals,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.number-calc",
    title: "小数（しくみとたしひき）",
    order: 5,
    realWorldUse: "ジュースの「1.5L」や、せの たかさ「1.3m」のように、はんぱなかずをあらわすときにつかうよ。",
    leadsTo: [U.fractions],
    prerequisites: [U.largeNumbers],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.fractions,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.number-calc",
    title: "分数（仮分数・帯分数）",
    order: 6,
    realWorldUse: "ピザを なんこかに わけた「3ぶんの2」のように、ぜんたいのなかのいくつぶんかをあらわすときにつかうよ。",
    leadsTo: [],
    prerequisites: [U.decimals],
    hasLearn: true,
    hasTest: true,
  },

  // ── B 図形 ──
  {
    id: U.angles,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.geometry",
    title: "角の大きさ（分度器）",
    order: 7,
    realWorldUse: "とけいのはりの ひらきぐあいや、すべりだいの かたむきなど、かどの おおきさをはかるときにつかうよ。",
    leadsTo: [U.perpParallel],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.perpParallel,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.geometry",
    title: "垂直・平行と四角形",
    order: 8,
    realWorldUse: "ノートのせんや まどわくのように、まっすぐ ましかくに くんだ かたちを見わけるときにつかうよ。",
    leadsTo: [U.area, U.solids],
    prerequisites: [U.angles],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.area,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.geometry",
    title: "面積（長方形・正方形）",
    order: 9,
    realWorldUse: "へやの ひろさや、はたけの おおきさを「なんへいほうメートル」であらわすときにつかうよ。",
    leadsTo: [],
    prerequisites: [U.perpParallel, U.divisionAlgo],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.solids,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.geometry",
    title: "直方体と立方体",
    order: 10,
    realWorldUse: "おかしのはこや サイコロのかたちの、めん・へん・ちょうてんのかずを しらべるときにつかうよ。",
    leadsTo: [],
    prerequisites: [U.perpParallel],
    hasLearn: true,
    hasTest: true,
  },

  // ── C 変化と関係 ──
  {
    id: U.changing,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.change-relation",
    title: "ともなってかわる2つのりょう",
    order: 11,
    realWorldUse: "「だんのかずがふえると まわりのながさもふえる」のように、ふたつのかずがいっしょにかわるようすをしらべるときにつかうよ。",
    leadsTo: [U.lineGraph],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },

  // ── D データの活用 ──
  {
    id: U.lineGraph,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.data",
    title: "折れ線グラフ",
    order: 12,
    realWorldUse: "きおんが 1にちでどうかわったかなど、じかんとともにかわるようすを グラフでよむときにつかうよ。",
    leadsTo: [U.twoWayTable],
    prerequisites: [U.changing],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.twoWayTable,
    subjectId: "sansuu",
    grade: 4,
    domainId: "sansuu.data",
    title: "せいりのひょう（二次元の表）",
    order: 13,
    realWorldUse: "「すきなくだもの」と「だんじょ」を いちどに しらべた けっかを、ひょうにまとめてよむときにつかうよ。",
    leadsTo: [],
    prerequisites: [U.lineGraph],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test：固定 questions[]）
// ══════════════════════════════════════════

// ── A1 大きな数 ──
const largeNumberQuestions: ChoiceQuestion[] = [
  {
    id: `${U.largeNumbers}.q-1`,
    unitId: U.largeNumbers,
    prompt: "10000 を 1000こ あつめた かずは？",
    explanation: "10000（一万）が 1000こ で 10000000…ではなく、一万の1000ばいは「千万（10000000）」だよ。一万のかたまりがふえていくよ。",
    format: "choice",
    choices: ["千万", "百万", "一億", "十万"],
    answer: "千万",
  },
  {
    id: `${U.largeNumbers}.q-2`,
    unitId: U.largeNumbers,
    prompt: "1000万を 10こ あつめた かずは？",
    explanation: "1000万が 10こ で「1億」だよ。万のうえに 億のくらいがあるよ。",
    format: "choice",
    choices: ["1億", "1兆", "1000万", "1億万"],
    answer: "1億",
  },
  {
    id: `${U.largeNumbers}.q-3`,
    unitId: U.largeNumbers,
    prompt: "「38000000」は なんとよむ？",
    explanation: "みぎから 4けたずつ くぎると 3800|0000。万のくらいまでで「三千八百万」だよ。",
    format: "choice",
    choices: ["三千八百万", "三百八十万", "三億八千万", "三千八万"],
    answer: "三千八百万",
  },
  {
    id: `${U.largeNumbers}.q-4`,
    unitId: U.largeNumbers,
    prompt: "1億を 10こ あつめた かずは？",
    explanation: "1億が 10こ で「10億」だよ。億のくらいも 一・十・百・千とふえていくよ。",
    format: "choice",
    choices: ["10億", "1兆", "100億", "1億10"],
    answer: "10億",
  },
  {
    id: `${U.largeNumbers}.q-5`,
    unitId: U.largeNumbers,
    prompt: "1000億を 10こ あつめた かずは？",
    explanation: "1000億の つぎのくらいが「1兆」だよ。万→億→兆 とよっつごとに あたらしいなまえになるよ。",
    format: "choice",
    choices: ["1兆", "1億", "1京", "1万億"],
    answer: "1兆",
  },
  {
    id: `${U.largeNumbers}.q-6`,
    unitId: U.largeNumbers,
    prompt: "「520000」を 10ばい した かずは？",
    explanation: "10ばいすると くらいが ひとつあがって 0 が1こふえるよ。520000 → 5200000（五百二十万）だよ。",
    format: "choice",
    choices: ["5200000", "52000", "520000", "52000000"],
    answer: "5200000",
  },
];

// ── A2 わり算の筆算（あまりなしの整数）──
const divisionQuestions: NumberInputQuestion[] = [
  {
    id: `${U.divisionAlgo}.q-1`,
    unitId: U.divisionAlgo,
    prompt: "84 ÷ 4 ＝ ？",
    explanation: "8 ÷ 4 ＝ 2、4 ÷ 4 ＝ 1 で 21。たしかめは 21 × 4 ＝ 84 だよ。",
    format: "number-input",
    answer: 21,
  },
  {
    id: `${U.divisionAlgo}.q-2`,
    unitId: U.divisionAlgo,
    prompt: "96 ÷ 3 ＝ ？",
    explanation: "9 ÷ 3 ＝ 3、6 ÷ 3 ＝ 2 で 32。32 × 3 ＝ 96 だよ。",
    format: "number-input",
    answer: 32,
  },
  {
    id: `${U.divisionAlgo}.q-3`,
    unitId: U.divisionAlgo,
    prompt: "75 ÷ 5 ＝ ？",
    explanation: "7 ÷ 5 ＝ 1 あまり 2、のこり 25 ÷ 5 ＝ 5 で 15。15 × 5 ＝ 75 だよ。",
    format: "number-input",
    answer: 15,
  },
  {
    id: `${U.divisionAlgo}.q-4`,
    unitId: U.divisionAlgo,
    prompt: "144 ÷ 6 ＝ ？",
    explanation: "14 ÷ 6 ＝ 2 あまり 2、のこり 24 ÷ 6 ＝ 4 で 24。24 × 6 ＝ 144 だよ。",
    format: "number-input",
    answer: 24,
  },
  {
    id: `${U.divisionAlgo}.q-5`,
    unitId: U.divisionAlgo,
    prompt: "256 ÷ 8 ＝ ？",
    explanation: "25 ÷ 8 ＝ 3 あまり 1、のこり 16 ÷ 8 ＝ 2 で 32。32 × 8 ＝ 256 だよ。",
    format: "number-input",
    answer: 32,
  },
  {
    id: `${U.divisionAlgo}.q-6`,
    unitId: U.divisionAlgo,
    prompt: "92 ÷ 4 ＝ ？",
    explanation: "9 ÷ 4 ＝ 2 あまり 1、のこり 12 ÷ 4 ＝ 3 で 23。23 × 4 ＝ 92 だよ。",
    format: "number-input",
    answer: 23,
  },
];

// ── A3 がい数（四捨五入）──
const roundingQuestions: NumberInputQuestion[] = [
  {
    id: `${U.rounding}.q-1`,
    unitId: U.rounding,
    prompt: "2738 を 百のくらいで 四捨五入すると？",
    explanation: "百のくらいまでにするので、十のくらいの 3 を見るよ。3 は 5 より小さいので きりすて → 2700 だよ。",
    format: "number-input",
    answer: 2700,
  },
  {
    id: `${U.rounding}.q-2`,
    unitId: U.rounding,
    prompt: "4651 を 百のくらいで 四捨五入すると？",
    explanation: "十のくらいの 5 を見るよ。5 いじょうなので くりあげ → 4700 だよ。",
    format: "number-input",
    answer: 4700,
  },
  {
    id: `${U.rounding}.q-3`,
    unitId: U.rounding,
    prompt: "836 を 十のくらいで 四捨五入すると？",
    explanation: "一のくらいの 6 を見るよ。5 いじょうなので くりあげ → 840 だよ。",
    format: "number-input",
    answer: 840,
  },
  {
    id: `${U.rounding}.q-4`,
    unitId: U.rounding,
    prompt: "1420 を 百のくらいで 四捨五入すると？",
    explanation: "十のくらいの 2 を見るよ。5 より小さいので きりすて → 1400 だよ。",
    format: "number-input",
    answer: 1400,
  },
  {
    id: `${U.rounding}.q-5`,
    unitId: U.rounding,
    prompt: "287 を 上から1けたの がい数にすると？",
    explanation: "上から1けた（百のくらい）にするので、つぎの十のくらい 8 を見るよ。5いじょうなので 300 だよ。",
    format: "number-input",
    answer: 300,
  },
  {
    id: `${U.rounding}.q-6`,
    unitId: U.rounding,
    prompt: "198 × 3 を、198 を 200 とみて 見つもると およそ いくつ？",
    explanation: "198 を 200 とみると 200 × 3 ＝ 600。だいたいの ごうけいが すぐわかるよ。",
    format: "number-input",
    answer: 600,
  },
];

// ── A4 計算のきまり ──
const operationOrderQuestions: NumberInputQuestion[] = [
  {
    id: `${U.operationOrder}.q-1`,
    unitId: U.operationOrder,
    prompt: "2 ＋ 3 × 4 ＝ ？",
    explanation: "×÷ を さきに けいさんするよ。3 × 4 ＝ 12、つぎに 2 ＋ 12 ＝ 14 だよ。",
    format: "number-input",
    answer: 14,
  },
  {
    id: `${U.operationOrder}.q-2`,
    unitId: U.operationOrder,
    prompt: "(2 ＋ 3) × 4 ＝ ？",
    explanation: "（ ）の なかを さきにけいさんするよ。2 ＋ 3 ＝ 5、つぎに 5 × 4 ＝ 20 だよ。",
    format: "number-input",
    answer: 20,
  },
  {
    id: `${U.operationOrder}.q-3`,
    unitId: U.operationOrder,
    prompt: "20 − 12 ÷ 4 ＝ ？",
    explanation: "÷ を さきに。12 ÷ 4 ＝ 3、つぎに 20 − 3 ＝ 17 だよ。",
    format: "number-input",
    answer: 17,
  },
  {
    id: `${U.operationOrder}.q-4`,
    unitId: U.operationOrder,
    prompt: "100 − (40 ＋ 30) ＝ ？",
    explanation: "（ ）の なかを さきに。40 ＋ 30 ＝ 70、つぎに 100 − 70 ＝ 30 だよ。",
    format: "number-input",
    answer: 30,
  },
  {
    id: `${U.operationOrder}.q-5`,
    unitId: U.operationOrder,
    prompt: "6 × 8 ＋ 6 × 2 ＝ ？（6 × (8＋2) とおなじ）",
    explanation: "6 が きょうつうなので 6 × (8 ＋ 2) ＝ 6 × 10 ＝ 60。べつべつにけいさんしても 48 ＋ 12 ＝ 60 だよ。",
    format: "number-input",
    answer: 60,
  },
  {
    id: `${U.operationOrder}.q-6`,
    unitId: U.operationOrder,
    prompt: "50 ＋ 6 × 5 ＝ ？",
    explanation: "× を さきに。6 × 5 ＝ 30、つぎに 50 ＋ 30 ＝ 80 だよ。",
    format: "number-input",
    answer: 80,
  },
];

// ── A5 小数（たし算・ひき算）──
const decimalQuestions: NumberInputQuestion[] = [
  {
    id: `${U.decimals}.q-1`,
    unitId: U.decimals,
    prompt: "0.3 ＋ 0.4 ＝ ？",
    explanation: "0.1 が 3こ と 4こ で 7こ。だから 0.7 だよ。",
    format: "number-input",
    answer: 0.7,
  },
  {
    id: `${U.decimals}.q-2`,
    unitId: U.decimals,
    prompt: "1.2 ＋ 0.5 ＝ ？",
    explanation: "くらいを そろえて けいさん。1.2 ＋ 0.5 ＝ 1.7 だよ。",
    format: "number-input",
    answer: 1.7,
  },
  {
    id: `${U.decimals}.q-3`,
    unitId: U.decimals,
    prompt: "0.8 − 0.3 ＝ ？",
    explanation: "0.1 が 8こ から 3こ ひくと 5こ。だから 0.5 だよ。",
    format: "number-input",
    answer: 0.5,
  },
  {
    id: `${U.decimals}.q-4`,
    unitId: U.decimals,
    prompt: "2.5 − 1.3 ＝ ？",
    explanation: "くらいを そろえて けいさん。2.5 − 1.3 ＝ 1.2 だよ。",
    format: "number-input",
    answer: 1.2,
  },
  {
    id: `${U.decimals}.q-5`,
    unitId: U.decimals,
    prompt: "0.1 が 26こ あつまると いくつ？",
    explanation: "0.1 が 10こ で 1。26こ なので 2.6 だよ。",
    format: "number-input",
    answer: 2.6,
  },
  {
    id: `${U.decimals}.q-6`,
    unitId: U.decimals,
    prompt: "1 − 0.4 ＝ ？",
    explanation: "1 は 0.1 が 10こ。10こ から 4こ ひくと 6こ で 0.6 だよ。",
    format: "number-input",
    answer: 0.6,
  },
];

// ── A6 分数（仮分数・帯分数・同分母の加減）──
const fractionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.fractions}.q-1`,
    unitId: U.fractions,
    prompt: "2/5 ＋ 1/5 ＝ ？",
    explanation: "ぶんぼ（した）が おなじなので、ぶんし（うえ）だけ たすよ。2 ＋ 1 ＝ 3 で 3/5 だよ。",
    format: "choice",
    choices: ["3/5", "3/10", "2/10", "1/5"],
    answer: "3/5",
  },
  {
    id: `${U.fractions}.q-2`,
    unitId: U.fractions,
    prompt: "4/7 − 2/7 ＝ ？",
    explanation: "ぶんぼが おなじなので ぶんしだけ ひくよ。4 − 2 ＝ 2 で 2/7 だよ。",
    format: "choice",
    choices: ["2/7", "2/0", "6/7", "2/14"],
    answer: "2/7",
  },
  {
    id: `${U.fractions}.q-3`,
    unitId: U.fractions,
    prompt: "1 を 分数で あらわすと？（ぶんぼ 3 のとき）",
    explanation: "ぶんぼと ぶんしが おなじ分数は 1 とおなじ。だから 3/3 だよ。",
    format: "choice",
    choices: ["3/3", "1/3", "3/1", "0/3"],
    answer: "3/3",
  },
  {
    id: `${U.fractions}.q-4`,
    unitId: U.fractions,
    prompt: "7/3 を 帯分数に なおすと？",
    explanation: "7 ÷ 3 ＝ 2 あまり 1。せいすうぶが 2、のこり 1/3 で 2と1/3 だよ。",
    format: "choice",
    choices: ["2と1/3", "1と1/3", "3と1/2", "2と2/3"],
    answer: "2と1/3",
  },
  {
    id: `${U.fractions}.q-5`,
    unitId: U.fractions,
    prompt: "3/4 と 2/4 では どちらが 大きい？",
    explanation: "ぶんぼが おなじなら、ぶんしが 大きいほうが 大きいよ。3 > 2 なので 3/4 だよ。",
    format: "choice",
    choices: ["3/4", "2/4", "おなじ", "くらべられない"],
    answer: "3/4",
  },
  {
    id: `${U.fractions}.q-6`,
    unitId: U.fractions,
    prompt: "5/6 ＋ 1/6 ＝ ？",
    explanation: "5 ＋ 1 ＝ 6 で 6/6。ぶんぼと ぶんしが おなじなので 1 だよ。",
    format: "choice",
    choices: ["1", "6/12", "6/6だけ", "5/6"],
    answer: "1",
  },
];

// ── B1 角の大きさ ──
const angleQuestions: ChoiceQuestion[] = [
  {
    id: `${U.angles}.q-1`,
    unitId: U.angles,
    prompt: "直角は なん度？",
    explanation: "直角は きっちり 90度だよ。分度器の まんなかの めもりだよ。",
    format: "choice",
    choices: ["90度", "45度", "180度", "60度"],
    answer: "90度",
  },
  {
    id: `${U.angles}.q-2`,
    unitId: U.angles,
    prompt: "まっすぐな いっちょくせん（半回転）の 角は なん度？",
    explanation: "直角 2つぶんで まっすぐ。90 × 2 ＝ 180度だよ。",
    format: "choice",
    choices: ["180度", "90度", "360度", "120度"],
    answer: "180度",
  },
  {
    id: `${U.angles}.q-3`,
    unitId: U.angles,
    prompt: "90度より 小さい角を なんという？",
    explanation: "直角より 小さい とがった角を「鋭角（えいかく）」というよ。",
    format: "choice",
    choices: ["鋭角", "鈍角", "直角", "平角"],
    answer: "鋭角",
  },
  {
    id: `${U.angles}.q-4`,
    unitId: U.angles,
    prompt: "90度より 大きく 180度より 小さい角を なんという？",
    explanation: "直角より ひらいた角を「鈍角（どんかく）」というよ。",
    format: "choice",
    choices: ["鈍角", "鋭角", "直角", "全角"],
    answer: "鈍角",
  },
  {
    id: `${U.angles}.q-5`,
    unitId: U.angles,
    prompt: "ひとまわり（1回転）の 角は なん度？",
    explanation: "直角 4つぶんで ひとまわり。90 × 4 ＝ 360度だよ。",
    format: "choice",
    choices: ["360度", "180度", "270度", "400度"],
    answer: "360度",
  },
  {
    id: `${U.angles}.q-6`,
    unitId: U.angles,
    prompt: "120度 ＋ 30度 ＝ ？",
    explanation: "角の大きさも たし算できるよ。120 ＋ 30 ＝ 150度だよ。",
    format: "choice",
    choices: ["150度", "90度", "160度", "100度"],
    answer: "150度",
  },
];

// ── B2 垂直・平行と四角形 ──
const perpParallelQuestions: ChoiceQuestion[] = [
  {
    id: `${U.perpParallel}.q-1`,
    unitId: U.perpParallel,
    prompt: "2本の直線が 直角に まじわっていることを なんという？",
    explanation: "90度で まじわっているとき、その2本は「垂直（すいちょく）」だよ。",
    format: "choice",
    choices: ["垂直", "平行", "対角", "水平"],
    answer: "垂直",
  },
  {
    id: `${U.perpParallel}.q-2`,
    unitId: U.perpParallel,
    prompt: "どこまでいっても まじわらない 2本の直線を なんという？",
    explanation: "はばが ずっとおなじで まじわらない 2本は「平行（へいこう）」だよ。",
    format: "choice",
    choices: ["平行", "垂直", "直角", "交差"],
    answer: "平行",
  },
  {
    id: `${U.perpParallel}.q-3`,
    unitId: U.perpParallel,
    prompt: "むかいあう 2くみの へんが それぞれ平行な 四角形を なんという？",
    explanation: "2くみとも 平行なら「平行四辺形（へいこうしへんけい）」だよ。",
    format: "choice",
    choices: ["平行四辺形", "台形", "ひし形だけ", "三角形"],
    answer: "平行四辺形",
  },
  {
    id: `${U.perpParallel}.q-4`,
    unitId: U.perpParallel,
    prompt: "1くみの へんだけが 平行な 四角形を なんという？",
    explanation: "むかいあう 1くみだけ 平行なのが「台形（だいけい）」だよ。",
    format: "choice",
    choices: ["台形", "平行四辺形", "正方形", "ひし形"],
    answer: "台形",
  },
  {
    id: `${U.perpParallel}.q-5`,
    unitId: U.perpParallel,
    prompt: "4つの へんの ながさが ぜんぶ おなじ 四角形を なんという？",
    explanation: "へんが ぜんぶ おなじながさなのが「ひし形（ひしがた）」だよ。",
    format: "choice",
    choices: ["ひし形", "台形", "長方形", "平行四辺形"],
    answer: "ひし形",
  },
  {
    id: `${U.perpParallel}.q-6`,
    unitId: U.perpParallel,
    prompt: "長方形の となりあう へんは どんなかんけい？",
    explanation: "長方形の かどは ぜんぶ 直角。となりあう へんは「垂直」だよ。",
    format: "choice",
    choices: ["垂直", "平行", "ななめ", "おなじながさ"],
    answer: "垂直",
  },
];

// ── B3 面積（長方形・正方形）──
const areaQuestions: NumberInputQuestion[] = [
  {
    id: `${U.area}.q-1`,
    unitId: U.area,
    prompt: "たて 3cm、よこ 5cm の 長方形の 面積は？（cm²）",
    explanation: "長方形の面積 ＝ たて × よこ。3 × 5 ＝ 15 で 15cm² だよ。",
    format: "number-input",
    answer: 15,
  },
  {
    id: `${U.area}.q-2`,
    unitId: U.area,
    prompt: "1ぺん 4cm の 正方形の 面積は？（cm²）",
    explanation: "正方形は たてもよこも おなじ。4 × 4 ＝ 16 で 16cm² だよ。",
    format: "number-input",
    answer: 16,
  },
  {
    id: `${U.area}.q-3`,
    unitId: U.area,
    prompt: "たて 6cm、よこ 7cm の 長方形の 面積は？（cm²）",
    explanation: "6 × 7 ＝ 42 で 42cm² だよ。",
    format: "number-input",
    answer: 42,
  },
  {
    id: `${U.area}.q-4`,
    unitId: U.area,
    prompt: "1ぺん 10cm の 正方形の 面積は？（cm²）",
    explanation: "10 × 10 ＝ 100 で 100cm² だよ。",
    format: "number-input",
    answer: 100,
  },
  {
    id: `${U.area}.q-5`,
    unitId: U.area,
    prompt: "たて 2m、よこ 8m の 長方形の 面積は？（m²）",
    explanation: "2 × 8 ＝ 16 で 16m² だよ。たんいが m のときは m² になるよ。",
    format: "number-input",
    answer: 16,
  },
  {
    id: `${U.area}.q-6`,
    unitId: U.area,
    prompt: "面積 20cm²、たて 4cm の 長方形の よこは なんcm？",
    explanation: "よこ ＝ 面積 ÷ たて。20 ÷ 4 ＝ 5 で 5cm だよ。",
    format: "number-input",
    answer: 5,
  },
];

// ── B4 直方体と立方体 ──
const solidQuestions: ChoiceQuestion[] = [
  {
    id: `${U.solids}.q-1`,
    unitId: U.solids,
    prompt: "立方体の 面は いくつ ある？",
    explanation: "サイコロのかたち。面は ぜんぶで 6つ あるよ。",
    format: "choice",
    choices: ["6つ", "4つ", "8つ", "12こ"],
    answer: "6つ",
  },
  {
    id: `${U.solids}.q-2`,
    unitId: U.solids,
    prompt: "直方体の へん（たて・よこ・たかさの ぼう）は いくつ ある？",
    explanation: "直方体の へんは ぜんぶで 12こ。立方体もおなじ 12こ だよ。",
    format: "choice",
    choices: ["12こ", "6つ", "8つ", "4つ"],
    answer: "12こ",
  },
  {
    id: `${U.solids}.q-3`,
    unitId: U.solids,
    prompt: "直方体の ちょうてん（かど）は いくつ ある？",
    explanation: "かどの てんは ぜんぶで 8つ あるよ。立方体もおなじ 8つ だよ。",
    format: "choice",
    choices: ["8つ", "6つ", "12こ", "4つ"],
    answer: "8つ",
  },
  {
    id: `${U.solids}.q-4`,
    unitId: U.solids,
    prompt: "面が ぜんぶ 正方形の 立体を なんという？",
    explanation: "6つの面が ぜんぶ おなじ正方形なのが「立方体（りっぽうたい）」だよ。",
    format: "choice",
    choices: ["立方体", "直方体", "三角柱", "円柱"],
    answer: "立方体",
  },
  {
    id: `${U.solids}.q-5`,
    unitId: U.solids,
    prompt: "立体を ひらいて 平らにした ずを なんという？",
    explanation: "はこを きりひらいて 平らにした ずを「展開図（てんかいず）」というよ。",
    format: "choice",
    choices: ["展開図", "見取図", "設計図", "平面図"],
    answer: "展開図",
  },
];

// ── C1 ともなってかわる2つのりょう ──
const changingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.changing}.q-1`,
    unitId: U.changing,
    prompt: "1こ 50円の あめ。3こ かうと だい金は？",
    explanation: "こすうが ふえると だい金も ふえるよ。50 × 3 ＝ 150円だよ。",
    format: "choice",
    choices: ["150円", "100円", "53円", "53こ"],
    answer: "150円",
  },
  {
    id: `${U.changing}.q-2`,
    unitId: U.changing,
    prompt: "正方形の 1ぺんが 1cm ふえると、まわりのながさは なんcm ふえる？",
    explanation: "へんは 4つ あるので、1ぺん 1cm ふえると まわりは 4cm ふえるよ。",
    format: "choice",
    choices: ["4cm", "1cm", "2cm", "8cm"],
    answer: "4cm",
  },
  {
    id: `${U.changing}.q-3`,
    unitId: U.changing,
    prompt: "「だんの数」が ふえると「まわりのながさ」も ふえる。この 2つの かんけいを しらべるには？",
    explanation: "2つの りょうを ひょうに ならべて、どうかわるかを 見つけるよ。",
    format: "choice",
    choices: ["ひょうに ならべてしらべる", "1つだけ見る", "けいさんしない", "じゃんけんする"],
    answer: "ひょうに ならべてしらべる",
  },
  {
    id: `${U.changing}.q-4`,
    unitId: U.changing,
    prompt: "水を 1ぷんに 2Lずつ ためる。5ふんでは なんL？",
    explanation: "じかんが ふえると 水も ふえるよ。2 × 5 ＝ 10L だよ。",
    format: "choice",
    choices: ["10L", "7L", "2L", "25L"],
    answer: "10L",
  },
  {
    id: `${U.changing}.q-5`,
    unitId: U.changing,
    prompt: "△が 1 ふえると □が いつも 3 ふえる。△が 4 のとき、はじめ 0 から□は？",
    explanation: "□ ＝ △ × 3 のかんけい。4 × 3 ＝ 12 だよ。",
    format: "choice",
    choices: ["12", "7", "3", "4"],
    answer: "12",
  },
];

// ── D1 折れ線グラフ ──
const lineGraphQuestions: ChoiceQuestion[] = [
  {
    id: `${U.lineGraph}.q-1`,
    unitId: U.lineGraph,
    prompt: "じかんとともに かわる きおんを あらわすのに よいグラフは？",
    explanation: "つづけて かわるようすは、てんを せんでむすぶ「折れ線グラフ」がよいよ。",
    format: "choice",
    choices: ["折れ線グラフ", "ぼうグラフ", "円グラフ", "ひょう"],
    answer: "折れ線グラフ",
  },
  {
    id: `${U.lineGraph}.q-2`,
    unitId: U.lineGraph,
    prompt: "折れ線が 右上がりの とき、その りょうは どうなっている？",
    explanation: "せんが 上に あがっていくと、その りょうは「ふえている」よ。",
    format: "choice",
    choices: ["ふえている", "へっている", "かわらない", "0になった"],
    answer: "ふえている",
  },
  {
    id: `${U.lineGraph}.q-3`,
    unitId: U.lineGraph,
    prompt: "折れ線が 右下がりの とき、その りょうは どうなっている？",
    explanation: "せんが 下に さがると、その りょうは「へっている」よ。",
    format: "choice",
    choices: ["へっている", "ふえている", "かわらない", "ばいになった"],
    answer: "へっている",
  },
  {
    id: `${U.lineGraph}.q-4`,
    unitId: U.lineGraph,
    prompt: "せんの かたむきが いちばん 急なところは どんなとき？",
    explanation: "かたむきが 急なほど、みじかいじかんで 大きくかわった ところだよ。",
    format: "choice",
    choices: ["かわりかたが いちばん大きい", "かわっていない", "0のところ", "おわりのところ"],
    answer: "かわりかたが いちばん大きい",
  },
  {
    id: `${U.lineGraph}.q-5`,
    unitId: U.lineGraph,
    prompt: "折れ線グラフの よこのじく（→）には ふつう なにを とる？",
    explanation: "よこのじくには じかんなど「かわっていくもと」を、たてのじくに りょうを とるよ。",
    format: "choice",
    choices: ["じかん", "なまえ", "いろ", "ばしょ"],
    answer: "じかん",
  },
];

// ── D2 せいりのひょう（二次元の表）──
const twoWayTableQuestions: ChoiceQuestion[] = [
  {
    id: `${U.twoWayTable}.q-1`,
    unitId: U.twoWayTable,
    prompt: "「すきなくだもの」と「だんじょ」のように、2つのことを いちどに しらべた けっかを まとめるのに よいのは？",
    explanation: "2つの ことがらを たてとよこで くみあわせる「二次元の表」がよいよ。",
    format: "choice",
    choices: ["二次元の表", "折れ線グラフ", "数だけかく", "え"],
    answer: "二次元の表",
  },
  {
    id: `${U.twoWayTable}.q-2`,
    unitId: U.twoWayTable,
    prompt: "表の たてと よこが まじわる ますには なにを かく？",
    explanation: "たての なかま と よこの なかまの 両方に あてはまる「人数（かず）」を かくよ。",
    format: "choice",
    choices: ["あてはまる かず", "なまえ", "ひづけ", "いろ"],
    answer: "あてはまる かず",
  },
  {
    id: `${U.twoWayTable}.q-3`,
    unitId: U.twoWayTable,
    prompt: "表の 「ごうけい」のらんは なにを あらわす？",
    explanation: "たて・よこ それぞれの かずを ぜんぶ たした「合計」だよ。けんざんに つかえるよ。",
    format: "choice",
    choices: ["ぜんぶ たした かず", "いちばん大きいかず", "へいきん", "0のかず"],
    answer: "ぜんぶ たした かず",
  },
  {
    id: `${U.twoWayTable}.q-4`,
    unitId: U.twoWayTable,
    prompt: "男子 8人、女子 7人 の クラス。ぜんいんは なん人？",
    explanation: "男女の ごうけいが ぜんいん。8 ＋ 7 ＝ 15人だよ。",
    format: "choice",
    choices: ["15人", "1人", "87人", "14人"],
    answer: "15人",
  },
  {
    id: `${U.twoWayTable}.q-5`,
    unitId: U.twoWayTable,
    prompt: "表を つかうと どんな よいことが ある？",
    explanation: "どの くみあわせが おおいか・すくないかが、ひとめで わかるようになるよ。",
    format: "choice",
    choices: ["くみあわせが ひとめでわかる", "見にくくなる", "かずがきえる", "いろがつく"],
    answer: "くみあわせが ひとめでわかる",
  },
];

export const sansuuG4Contents: Record<string, UnitContent> = {
  // ── A 数と計算 ──
  [U.largeNumbers]: {
    unitId: U.largeNumbers,
    learn: {
      unitId: U.largeNumbers,
      steps: [
        {
          heading: "万のつぎは？",
          body: "一・十・百・千・万 とすすむと、つぎは「十万・百万・千万」。そのつぎが「億（おく）」、もっと大きいのが「兆（ちょう）」だよ。",
          visual: { kind: "emoji", value: "1▶10▶100▶1000▶万▶億▶兆", caption: "くらいが あがっていく" },
        },
        {
          heading: "4けたずつ くぎろう",
          body: "大きなかずは みぎから 4けたずつ くぎると よみやすいよ。38|0000 なら「38万」だね。",
          visual: { kind: "emoji", value: "3800|0000", caption: "三千八百万" },
        },
        {
          heading: "10ばい・100ばい",
          body: "10ばいすると 0 が1こ ふえて くらいが ひとつあがるよ。520000 を10ばいで 5200000 だね。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.largeNumbers, questions: largeNumberQuestions, questionCount: 5 },
  },

  [U.divisionAlgo]: {
    unitId: U.divisionAlgo,
    learn: {
      unitId: U.divisionAlgo,
      steps: [
        {
          heading: "わり算の ひっさん",
          body: "大きいくらいから じゅんに「たてる→かける→ひく→おろす」をくりかえすよ。84 ÷ 4 なら まず 8 ÷ 4 ＝ 2 だね。",
          visual: { kind: "emoji", value: "84 ÷ 4 ＝ 21", caption: "たて・かけ・ひき・おろし" },
        },
        {
          heading: "あまりに きをつけて",
          body: "わりきれないと「あまり」がでるよ。あまりは わるかずより かならず 小さくなるよ。",
          visual: { kind: "none" },
        },
        {
          heading: "たしかめよう",
          body: "「商 × わるかず ＋ あまり ＝ わられるかず」になれば せいかい。21 × 4 ＝ 84 だね。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.divisionAlgo, questions: divisionQuestions, questionCount: 6 },
  },

  [U.rounding]: {
    unitId: U.rounding,
    learn: {
      unitId: U.rounding,
      steps: [
        {
          heading: "がい数って なに？",
          body: "「だいたい いくつ」と あらわすかずが がい数だよ。こまかいかずを まるめて つかいやすくするよ。",
          visual: { kind: "emoji", value: "2738 ≈ 2700", caption: "だいたい 2700" },
        },
        {
          heading: "四捨五入",
          body: "まるめる くらいの すぐ下を見て、0〜4 なら きりすて、5〜9 なら くりあげ するよ。",
          visual: { kind: "emoji", value: "0 1 2 3 4 ▶すて / 5 6 7 8 9 ▶あげ", caption: "5でわかれる" },
        },
      ],
    },
    test: { unitId: U.rounding, questions: roundingQuestions, questionCount: 6 },
  },

  [U.operationOrder]: {
    unitId: U.operationOrder,
    learn: {
      unitId: U.operationOrder,
      steps: [
        {
          heading: "けいさんの じゅんじょ",
          body: "ふつうは まえから。でも ×÷ は ＋− より さきに けいさんするよ。2 ＋ 3 × 4 は 12 をさきに たすよ。",
          visual: { kind: "emoji", value: "× ÷ ▶さき / ＋ − ▶あと", caption: "かけわり さきに" },
        },
        {
          heading: "（ ）は いちばんさき",
          body: "（ ）が あるときは、その なかを いちばんさきに けいさんするよ。",
          visual: { kind: "emoji", value: "(2＋3)×4 ＝ 5×4 ＝ 20", caption: "かっこ さいゆうせん" },
        },
      ],
    },
    test: { unitId: U.operationOrder, questions: operationOrderQuestions, questionCount: 6 },
  },

  [U.decimals]: {
    unitId: U.decimals,
    learn: {
      unitId: U.decimals,
      steps: [
        {
          heading: "小数の しくみ",
          body: "1 を 10こに わけた 1つぶんが 0.1 だよ。0.1 が 10こ あつまると 1 にもどるよ。",
          visual: { kind: "emoji", value: "0.1 × 10 ＝ 1", caption: "0.1 が 10こで 1" },
        },
        {
          heading: "くらいを そろえて",
          body: "小数の たし算ひき算は、小数点（てん）を たてに そろえて けいさんするよ。",
          visual: { kind: "emoji", value: "0.3 ＋ 0.4 ＝ 0.7", caption: "てんを そろえる" },
        },
      ],
    },
    test: { unitId: U.decimals, questions: decimalQuestions, questionCount: 6 },
  },

  [U.fractions]: {
    unitId: U.fractions,
    learn: {
      unitId: U.fractions,
      steps: [
        {
          heading: "分数の なまえ",
          body: "した が ぶんぼ、うえ が ぶんし。ぶんしが ぶんぼより 大きい分数を「仮分数」、せいすうと分数を ならべたのが「帯分数」だよ。",
          visual: { kind: "emoji", value: "7/3 ＝ 2と1/3", caption: "仮分数⇄帯分数" },
        },
        {
          heading: "おなじぶんぼで たしひき",
          body: "ぶんぼが おなじなら、ぶんし だけ たしたり ひいたり するよ。2/5 ＋ 1/5 ＝ 3/5 だね。",
          visual: { kind: "emoji", value: "🍕", caption: "ピザを わけて かんがえる" },
        },
      ],
    },
    test: { unitId: U.fractions, questions: fractionQuestions, questionCount: 6 },
  },

  // ── B 図形 ──
  [U.angles]: {
    unitId: U.angles,
    learn: {
      unitId: U.angles,
      steps: [
        {
          heading: "角の 大きさ",
          body: "2本の へんの ひらきぐあいが 角の 大きさ。たんいは「度（ど・°）」だよ。直角は 90度だね。",
          visual: { kind: "emoji", value: "📐", caption: "直角 ＝ 90度" },
        },
        {
          heading: "分度器で はかろう",
          body: "分度器の まんなかを かどに あわせ、0度の せんから よむよ。90度より小さいと鋭角、大きいと鈍角だよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.angles, questions: angleQuestions, questionCount: 6 },
  },

  [U.perpParallel]: {
    unitId: U.perpParallel,
    learn: {
      unitId: U.perpParallel,
      steps: [
        {
          heading: "垂直と 平行",
          body: "直角に まじわる 2本は「垂直」、どこまでも まじわらない 2本は「平行」だよ。",
          visual: { kind: "emoji", value: "┃━ 垂直 / ＝ 平行", caption: "まじわり方でちがう" },
        },
        {
          heading: "いろいろな 四角形",
          body: "平行が 1くみなら 台形、2くみなら 平行四辺形。へんが ぜんぶおなじなら ひし形だよ。",
          visual: { kind: "emoji", value: "▱ 平行四辺形 / ◇ ひし形", caption: "平行のしかたで なまえがかわる" },
        },
      ],
    },
    test: { unitId: U.perpParallel, questions: perpParallelQuestions, questionCount: 6 },
  },

  [U.area]: {
    unitId: U.area,
    learn: {
      unitId: U.area,
      steps: [
        {
          heading: "面積って なに？",
          body: "ひろさのことだよ。1ぺん 1cm の 正方形（1cm²）が なんこ ならぶかで あらわすよ。",
          visual: { kind: "emoji", value: "🟦", caption: "1cm² の ます" },
        },
        {
          heading: "長方形の 面積",
          body: "長方形の 面積 ＝ たて × よこ。正方形は 1ぺん × 1ぺん だよ。",
          visual: { kind: "emoji", value: "3 × 5 ＝ 15cm²", caption: "たて×よこ" },
        },
      ],
    },
    test: { unitId: U.area, questions: areaQuestions, questionCount: 6 },
  },

  [U.solids]: {
    unitId: U.solids,
    learn: {
      unitId: U.solids,
      steps: [
        {
          heading: "はこの かたち",
          body: "直方体・立方体には「面・辺・頂点」があるよ。面は 6つ、辺は 12こ、頂点は 8つ だよ。",
          visual: { kind: "emoji", value: "📦🎲", caption: "面6・辺12・頂点8" },
        },
        {
          heading: "展開図",
          body: "はこを きりひらいて 平らにした ずが「展開図」。くみたてると もとの はこに もどるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.solids, questions: solidQuestions, questionCount: 5 },
  },

  // ── C 変化と関係 ──
  [U.changing]: {
    unitId: U.changing,
    learn: {
      unitId: U.changing,
      steps: [
        {
          heading: "いっしょに かわる かず",
          body: "「こすう」が ふえると「だい金」も ふえる。このように いっしょに かわる 2つの かずが あるよ。",
          visual: { kind: "emoji", value: "🍬×3 ▶ 150円", caption: "こすうと だい金" },
        },
        {
          heading: "ひょうで しらべよう",
          body: "2つの かずを ひょうに ならべると、どんなふうに かわるか きまりが 見えてくるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.changing, questions: changingQuestions, questionCount: 5 },
  },

  // ── D データの活用 ──
  [U.lineGraph]: {
    unitId: U.lineGraph,
    learn: {
      unitId: U.lineGraph,
      steps: [
        {
          heading: "折れ線グラフ",
          body: "てんを せんで むすんだ グラフだよ。じかんとともに かわるようす（きおんなど）をあらわすのに ぴったりだよ。",
          visual: { kind: "emoji", value: "📈", caption: "つながって かわる" },
        },
        {
          heading: "ふえた？へった？",
          body: "せんが 右上がりなら ふえている、右下がりなら へっている。かたむきが 急なほど かわり方が 大きいよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.lineGraph, questions: lineGraphQuestions, questionCount: 5 },
  },

  [U.twoWayTable]: {
    unitId: U.twoWayTable,
    learn: {
      unitId: U.twoWayTable,
      steps: [
        {
          heading: "2つを いちどに",
          body: "「くだもの」と「だんじょ」のように、2つのことを いちどに しらべた けっかは「二次元の表」にまとめるよ。",
          visual: { kind: "emoji", value: "🗂️", caption: "たて×よこ の 表" },
        },
        {
          heading: "ごうけいで たしかめ",
          body: "たて・よこの かずを たした「合計」が あうか たしかめよう。くみあわせの おおい・すくないが ひとめでわかるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.twoWayTable, questions: twoWayTableQuestions, questionCount: 5 },
  },
};
