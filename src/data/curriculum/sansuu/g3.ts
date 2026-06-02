// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小3
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
//
// 学習指導要領（小3 算数）準拠の領域:
//   数と計算 … 大きい数・3/4けたの加減・かけ算・わり算・あまり・分数・小数
//   図形     … 円と球・三角形（二等辺/正三角形）
//   測定     … 長さ(km)・重さ(g/kg)・時こくと時間(秒)
//   データの活用 … ぼうグラフと表
//
// 注:
//  - g3 用の generator は未登録のため、テストは全て固定 questions[]（全問 explanation 付）。
//  - SVG は既定の clock / number-blocks のみ使用。他は emoji で代替（新規 svg 追加はしない）。
//  - 依存(prerequisites/leadsTo)は現存の g1 と g3 内で解決（並列作成中の g2/g4 への
//    前方参照は避け、終端は []）。学年間リンクは集約時に中央で追補する想定。
//  - 表示テキストはルビ記法 {漢字|よみ} で執筆（全漢字ルビ）。id/構造/メタは不変。
// ══════════════════════════════════════════

import type {
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  NumberInputQuestion,
  ClockReadQuestion,
} from "@/types/curriculum";

// ── 領域（g3 が新たに導入する分のみ公開。number-calc / measurement は g1 が公開済み）──

export const sansuuG3Domains: Domain[] = [
  {
    id: "sansuu.geometry",
    subjectId: "sansuu",
    name: "ずけい",
    formalName: "図形",
  },
  {
    id: "sansuu.data",
    subjectId: "sansuu",
    name: "データのかつよう",
    formalName: "データの活用",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（おおまかな流れ）:
//   [g1.numbers-to-20] ─▶ large-numbers ─▶ add-sub-3digit ─▶ multiplication ─▶ division ─┬─▶ division-remainder
//                                                                                         └─▶ fractions ─▶ decimals
//   circle-sphere ─▶ triangles
//   length-km ─▶ weight
//   [g1.clock-read] ─▶ time-seconds
//   bar-graph（独立）
//
const U = {
  largeNumbers: "sansuu.g3.large-numbers",
  addSub3digit: "sansuu.g3.add-sub-3digit",
  multiplication: "sansuu.g3.multiplication",
  division: "sansuu.g3.division",
  divisionRemainder: "sansuu.g3.division-remainder",
  fractions: "sansuu.g3.fractions",
  decimals: "sansuu.g3.decimals",
  circleSphere: "sansuu.g3.circle-sphere",
  triangles: "sansuu.g3.triangles",
  lengthKm: "sansuu.g3.length-km",
  weight: "sansuu.g3.weight",
  timeSeconds: "sansuu.g3.time-seconds",
  barGraph: "sansuu.g3.bar-graph",
} as const;

// 既存（g1）単元への参照（現存・解決可能）
const G1 = {
  numbersTo20: "sansuu.g1.numbers-to-20",
  addWithin10: "sansuu.g1.add-within-10",
  clockRead: "sansuu.g1.clock-read",
} as const;

export const sansuuG3Units: Unit[] = [
  // ── 数と計算 ──
  {
    id: U.largeNumbers,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.number-calc",
    title: "{大|おお}きい{数|かず}（{万|まん}のくらい）",
    order: 1,
    realWorldUse: "ねだんや まちの {人口|じんこう}など、1000より {大|おお}きい {数|かず}を よむときに つかうよ。",
    leadsTo: [U.addSub3digit],
    prerequisites: [G1.numbersTo20],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.addSub3digit,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.number-calc",
    title: "3けた・4けたの {足|た}し{算|ざん} {引|ひ}き{算|ざん}（{筆算|ひっさん}）",
    order: 2,
    realWorldUse: "おかいものの ごうけいや おつりを {計算|けいさん}するときに つかうよ。",
    leadsTo: [U.multiplication],
    prerequisites: [U.largeNumbers, G1.addWithin10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.multiplication,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.number-calc",
    title: "{掛|か}け{算|ざん}（{筆算|ひっさん}）",
    order: 3,
    realWorldUse: "おなじ {数|かず}の まとまりが いくつぶんか（はこ{入|い}りの おかしの {数|かず}など）を もとめるときに つかうよ。",
    leadsTo: [U.division],
    prerequisites: [G1.addWithin10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.division,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.number-calc",
    title: "{割|わ}り{算|ざん}",
    order: 4,
    realWorldUse: "おかしを みんなで おなじ {数|かず}ずつ わけるときに つかうよ。",
    leadsTo: [U.divisionRemainder, U.fractions],
    prerequisites: [U.multiplication],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.divisionRemainder,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.number-calc",
    title: "あまりの ある {割|わ}り{算|ざん}",
    order: 5,
    realWorldUse: "ものを わけたときに のこりが でる {数|かず}を しるときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.division],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.fractions,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.number-calc",
    title: "{分数|ぶんすう}",
    order: 6,
    realWorldUse: "ピザや ケーキを おなじ {大|おお}きさに わけた 1つぶんを あらわすときに つかうよ。",
    leadsTo: [U.decimals],
    prerequisites: [U.division],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.decimals,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.number-calc",
    title: "{小数|しょうすう}",
    order: 7,
    realWorldUse: "1Lより すこし すくない かさや、{身長|しんちょう}の こまかい ところを あらわすときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.fractions],
    hasLearn: true,
    hasTest: true,
  },

  // ── 図形 ──
  {
    id: U.circleSphere,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.geometry",
    title: "{円|えん}と{球|きゅう}",
    order: 8,
    realWorldUse: "コインや ボール、タイヤなど まるい ものの かたちを しらべるときに つかうよ。",
    leadsTo: [U.triangles],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.triangles,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.geometry",
    title: "{三角形|さんかくけい}（{二等辺|にとうへん}・{正三角形|せいさんかくけい}）",
    order: 9,
    realWorldUse: "おにぎりや ぼうしの かたち、もようづくりなどで {三角|さんかく}の とくちょうを しるときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.circleSphere],
    hasLearn: true,
    hasTest: true,
  },

  // ── 測定 ──
  {
    id: U.lengthKm,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.measurement",
    title: "{長|なが}さ（km・まきじゃく）",
    order: 10,
    realWorldUse: "いえから {学校|がっこう}までの きょりや、{長|なが}い ものの {長|なが}さを はかるときに つかうよ。",
    leadsTo: [U.weight],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.weight,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.measurement",
    title: "{重|おも}さ（g・kg）",
    order: 11,
    realWorldUse: "ランドセルや くだものの {重|おも}さを はかりで しらべるときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.lengthKm],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.timeSeconds,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.measurement",
    title: "{時刻|じこく}と {時間|じかん}（びょう）",
    order: 12,
    realWorldUse: "かかった {時間|じかん}を はかったり、{出|で}かける {時刻|じこく}を もとめたりするときに つかうよ。",
    leadsTo: [],
    prerequisites: [G1.clockRead],
    hasLearn: true,
    hasTest: true,
  },

  // ── データの活用 ──
  {
    id: U.barGraph,
    subjectId: "sansuu",
    grade: 3,
    domainId: "sansuu.data",
    title: "ぼうグラフと {表|ひょう}",
    order: 13,
    realWorldUse: "すきな ものしらべの けっかなど、{数|かず}の おおい すくないを ひとめで くらべるときに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── テスト用 固定問題（全問 explanation 付） ──────────────

// 1) 大きいかず（万のくらい）
const largeNumberQuestions: (NumberInputQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.largeNumbers}.q-1`,
    unitId: U.largeNumbers,
    prompt: "1000を 10こ あつめた {数|かず}は いくつ？",
    explanation: "1000が 10こで「10000（{一万|いちまん}）」だよ。くらいが 1つ ふえるね。",
    format: "number-input",
    answer: 10000,
  },
  {
    id: `${U.largeNumbers}.q-2`,
    unitId: U.largeNumbers,
    prompt: "10000は 1000を なんこ あつめた {数|かず}？",
    explanation: "10000 ÷ 1000 ＝ 10 だから、1000が 10こぶん だよ。",
    format: "number-input",
    answer: 10,
  },
  {
    id: `${U.largeNumbers}.q-3`,
    unitId: U.largeNumbers,
    prompt: "5{万|まん}3{千|せん}を すうじで かくと？",
    explanation: "5{万|まん}＝50000、3{千|せん}＝3000。あわせて「53000」だよ。",
    format: "choice",
    choices: ["53000", "5300", "530000", "5030"],
    answer: "53000",
  },
  {
    id: `${U.largeNumbers}.q-4`,
    unitId: U.largeNumbers,
    prompt: "3000と 400と 50と 6 で できる {数|かず}は？",
    explanation: "くらいごとに たすと 3000＋400＋50＋6＝3456 だよ。",
    format: "number-input",
    answer: 3456,
  },
  {
    id: `${U.largeNumbers}.q-5`,
    unitId: U.largeNumbers,
    prompt: "9000より 1000 {大|おお}きい {数|かず}は？",
    explanation: "9000に 1000 たすと 10000（{一万|いちまん}）になるよ。",
    format: "number-input",
    answer: 10000,
  },
];

// 2) 3けた・4けたの たしざん ひきざん
const addSub3digitQuestions: NumberInputQuestion[] = [
  {
    id: `${U.addSub3digit}.q-1`,
    unitId: U.addSub3digit,
    prompt: "245 ＋ 132 ＝ ？",
    explanation: "くらいを そろえて たすよ。{一|いち}のくらい5+2=7、{十|じゅう}のくらい4+3=7、{百|ひゃく}のくらい2+1=3 で 377。",
    format: "number-input",
    answer: 377,
  },
  {
    id: `${U.addSub3digit}.q-2`,
    unitId: U.addSub3digit,
    prompt: "476 − 158 ＝ ？",
    explanation: "{一|いち}のくらいは 6−8 が できないので {十|じゅう}のくらいから くりさげるよ。こたえは 318。",
    format: "number-input",
    answer: 318,
  },
  {
    id: `${U.addSub3digit}.q-3`,
    unitId: U.addSub3digit,
    prompt: "528 ＋ 264 ＝ ？",
    explanation: "{一|いち}のくらい 8+4=12 で くりあがり。じゅんに たして 792 だよ。",
    format: "number-input",
    answer: 792,
  },
  {
    id: `${U.addSub3digit}.q-4`,
    unitId: U.addSub3digit,
    prompt: "300 − 145 ＝ ？",
    explanation: "0が つづくときも くりさげて {計算|けいさん}。300−145＝155 だよ。",
    format: "number-input",
    answer: 155,
  },
  {
    id: `${U.addSub3digit}.q-5`,
    unitId: U.addSub3digit,
    prompt: "1000 − 375 ＝ ？",
    explanation: "1000から 375 ひくと 625。おつりの {計算|けいさん}と おなじだね。",
    format: "number-input",
    answer: 625,
  },
];

// 3) かけ算（ひっさん）
const multiplicationQuestions: NumberInputQuestion[] = [
  {
    id: `${U.multiplication}.q-1`,
    unitId: U.multiplication,
    prompt: "23 × 3 ＝ ？",
    explanation: "20×3=60、3×3=9。あわせて 69 だよ。",
    format: "number-input",
    answer: 69,
  },
  {
    id: `${U.multiplication}.q-2`,
    unitId: U.multiplication,
    prompt: "14 × 5 ＝ ？",
    explanation: "10×5=50、4×5=20。あわせて 70 だよ。",
    format: "number-input",
    answer: 70,
  },
  {
    id: `${U.multiplication}.q-3`,
    unitId: U.multiplication,
    prompt: "123 × 2 ＝ ？",
    explanation: "くらいごとに 2を かけて、100×2=200、20×2=40、3×2=6 で 246。",
    format: "number-input",
    answer: 246,
  },
  {
    id: `${U.multiplication}.q-4`,
    unitId: U.multiplication,
    prompt: "12 × 12 ＝ ？",
    explanation: "12×10=120、12×2=24。あわせて 144 だよ。",
    format: "number-input",
    answer: 144,
  },
  {
    id: `${U.multiplication}.q-5`,
    unitId: U.multiplication,
    prompt: "6 × 0 ＝ ？",
    explanation: "どんな {数|かず}も 0を かけると こたえは 0 になるよ。",
    format: "number-input",
    answer: 0,
  },
];

// 4) わり算
const divisionQuestions: NumberInputQuestion[] = [
  {
    id: `${U.division}.q-1`,
    unitId: U.division,
    prompt: "12 ÷ 3 ＝ ？",
    explanation: "3が なんこで 12 になるかな？ 3×4=12 だから こたえは 4。",
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.division}.q-2`,
    unitId: U.division,
    prompt: "20 ÷ 4 ＝ ？",
    explanation: "4×5=20 だから、20÷4＝5 だよ。",
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.division}.q-3`,
    unitId: U.division,
    prompt: "18 ÷ 2 ＝ ？",
    explanation: "2×9=18 だから、18÷2＝9 だよ。",
    format: "number-input",
    answer: 9,
  },
  {
    id: `${U.division}.q-4`,
    unitId: U.division,
    prompt: "0 ÷ 5 ＝ ？",
    explanation: "0こを わけても 0。0を どんな {数|かず}で わっても こたえは 0 だよ。",
    format: "number-input",
    answer: 0,
  },
  {
    id: `${U.division}.q-5`,
    unitId: U.division,
    prompt: "あめが 15こ。3{人|にん}で おなじ {数|かず}ずつ わけると 1{人|にん} なんこ？",
    explanation: "15÷3＝5。3×5=15 だから 1{人|にん} 5こずつ だよ。",
    format: "number-input",
    answer: 5,
  },
];

// 5) あまりの ある わり算（こたえに あまりが でるので choice）
const divisionRemainderQuestions: ChoiceQuestion[] = [
  {
    id: `${U.divisionRemainder}.q-1`,
    unitId: U.divisionRemainder,
    prompt: "13 ÷ 4 ＝ ？",
    explanation: "4×3=12 で 13に いちばん ちかい。13−12=1 のこるので「3 あまり 1」。",
    format: "choice",
    choices: ["3 あまり 1", "4 あまり 0", "2 あまり 5", "3 あまり 2"],
    answer: "3 あまり 1",
  },
  {
    id: `${U.divisionRemainder}.q-2`,
    unitId: U.divisionRemainder,
    prompt: "17 ÷ 5 ＝ ？",
    explanation: "5×3=15。17−15=2 のこるので「3 あまり 2」。あまりは わる{数|かず}より {小|ちい}さいよ。",
    format: "choice",
    choices: ["3 あまり 2", "2 あまり 7", "3 あまり 1", "4 あまり 0"],
    answer: "3 あまり 2",
  },
  {
    id: `${U.divisionRemainder}.q-3`,
    unitId: U.divisionRemainder,
    prompt: "10 ÷ 3 ＝ ？",
    explanation: "3×3=9。10−9=1 のこるので「3 あまり 1」だよ。",
    format: "choice",
    choices: ["3 あまり 1", "3 あまり 0", "2 あまり 4", "4 あまり 1"],
    answer: "3 あまり 1",
  },
  {
    id: `${U.divisionRemainder}.q-4`,
    unitId: U.divisionRemainder,
    prompt: "あめ 14こを 4こずつ ふくろに {入|い}れると、ふくろは いくつ できて なんこ あまる？",
    explanation: "14÷4＝3 あまり 2。4こずつ 3ふくろ できて、2こ あまるよ。",
    format: "choice",
    choices: ["3ふくろ できて 2こ あまる", "4ふくろ できて 0こ あまる", "2ふくろ できて 6こ あまる", "3ふくろ できて 1こ あまる"],
    answer: "3ふくろ できて 2こ あまる",
  },
  {
    id: `${U.divisionRemainder}.q-5`,
    unitId: U.divisionRemainder,
    prompt: "23 ÷ 5 ＝ ？",
    explanation: "5×4=20。23−20=3 のこるので「4 あまり 3」だよ。",
    format: "choice",
    choices: ["4 あまり 3", "5 あまり 0", "4 あまり 2", "3 あまり 8"],
    answer: "4 あまり 3",
  },
];

// 6) 分数（choice と number-input の まぜ）
const fractionQuestions: (ChoiceQuestion | NumberInputQuestion)[] = [
  {
    id: `${U.fractions}.q-1`,
    unitId: U.fractions,
    prompt: "1Lを おなじ {大|おお}きさに 3つに わけた 1つぶんは どれ？",
    explanation: "3つに わけた 1つぶんは「3ぶんの1（1/3）」L だよ。",
    format: "choice",
    choices: ["3ぶんの1 L", "1ぶんの3 L", "3 L", "1 L"],
    answer: "3ぶんの1 L",
  },
  {
    id: `${U.fractions}.q-2`,
    unitId: U.fractions,
    prompt: "5ぶんの2 と 5ぶんの1 を たすと？",
    explanation: "ぶんぼが おなじ ときは ぶんしを たすよ。2+1=3 で「5ぶんの3」。",
    format: "choice",
    choices: ["5ぶんの3", "5ぶんの1", "10ぶんの3", "5ぶんの2"],
    answer: "5ぶんの3",
  },
  {
    id: `${U.fractions}.q-3`,
    unitId: U.fractions,
    prompt: "7ぶんの3 と 7ぶんの4 では どちらが {大|おお}きい？",
    explanation: "ぶんぼが おなじ ときは ぶんしが {大|おお}きい ほうが {大|おお}きい。4>3 で「7ぶんの4」。",
    format: "choice",
    choices: ["7ぶんの4", "7ぶんの3", "おなじ", "くらべられない"],
    answer: "7ぶんの4",
  },
  {
    id: `${U.fractions}.q-4`,
    unitId: U.fractions,
    prompt: "1は 4ぶんの1 の なんこぶん？",
    explanation: "4ぶんの1 が 4こ あつまると 1（4/4）になるよ。こたえは 4。",
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.fractions}.q-5`,
    unitId: U.fractions,
    prompt: "3ぶんの2 は 3ぶんの1 の なんこぶん？",
    explanation: "3ぶんの2 は 3ぶんの1 が 2こぶん だよ。こたえは 2。",
    format: "number-input",
    answer: 2,
  },
];

// 7) 小数（choice と number-input の まぜ）
const decimalQuestions: (NumberInputQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.decimals}.q-1`,
    unitId: U.decimals,
    prompt: "0.1を 10こ あつめた {数|かず}は？",
    explanation: "0.1が 10こで 1。0.1の 10こぶんは 1 だよ。",
    format: "number-input",
    answer: 1,
  },
  {
    id: `${U.decimals}.q-2`,
    unitId: U.decimals,
    prompt: "0.3 ＋ 0.4 ＝ ？",
    explanation: "0.1が 3こと 4こで 7こ。だから 0.7 だよ。",
    format: "number-input",
    answer: 0.7,
  },
  {
    id: `${U.decimals}.q-3`,
    unitId: U.decimals,
    prompt: "1 − 0.6 ＝ ？",
    explanation: "1は 0.1が 10こ。10こ から 6こ ひくと 4こ で 0.4 だよ。",
    format: "number-input",
    answer: 0.4,
  },
  {
    id: `${U.decimals}.q-4`,
    unitId: U.decimals,
    prompt: "2.5 と 2.3 では どちらが {大|おお}きい？",
    explanation: "{整数|せいすう}ぶは おなじ 2。{小数|しょうすう}ぶが 5>3 なので「2.5」が {大|おお}きい。",
    format: "choice",
    choices: ["2.5", "2.3", "おなじ", "くらべられない"],
    answer: "2.5",
  },
  {
    id: `${U.decimals}.q-5`,
    unitId: U.decimals,
    prompt: "0.1が 7こで いくつ？",
    explanation: "0.1の 7こぶんは 0.7 だよ。",
    format: "number-input",
    answer: 0.7,
  },
];

// 8) 円と球
const circleSphereQuestions: (ChoiceQuestion | NumberInputQuestion)[] = [
  {
    id: `${U.circleSphere}.q-1`,
    unitId: U.circleSphere,
    prompt: "{円|えん}の まんなかの {点|てん}を なんという？",
    explanation: "{円|えん}の まんなかの {点|てん}は「{中心|ちゅうしん}」だよ。",
    format: "choice",
    choices: ["ちゅうしん", "はんけい", "ちょっけい", "かど"],
    answer: "ちゅうしん",
  },
  {
    id: `${U.circleSphere}.q-2`,
    unitId: U.circleSphere,
    prompt: "{中心|ちゅうしん}から まわりまでの {長|なが}さを なんという？",
    explanation: "{中心|ちゅうしん}から {円|えん}の まわりまでの {長|なが}さは「{半径|はんけい}」だよ。",
    format: "choice",
    choices: ["はんけい", "ちょっけい", "ちゅうしん", "へん"],
    answer: "はんけい",
  },
  {
    id: `${U.circleSphere}.q-3`,
    unitId: U.circleSphere,
    prompt: "はんけいが 5cmの {円|えん}の ちょっけいは なんcm？",
    explanation: "{直径|ちょっけい}は はんけいの 2ばい。5×2＝10cm だよ。",
    format: "number-input",
    answer: 10,
  },
  {
    id: `${U.circleSphere}.q-4`,
    unitId: U.circleSphere,
    prompt: "ちょっけいが 8cmの {円|えん}の はんけいは なんcm？",
    explanation: "はんけいは ちょっけいの はんぶん。8÷2＝4cm だよ。",
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.circleSphere}.q-5`,
    unitId: U.circleSphere,
    prompt: "ボールのように どこから {見|み}ても まるい かたちを なんという？",
    explanation: "どこから {見|み}ても {円|えん}に {見|み}える かたちは「{球|きゅう}」だよ。",
    format: "choice",
    choices: ["きゅう", "えん", "さんかく", "しかく"],
    answer: "きゅう",
  },
];

// 9) 三角形
const triangleQuestions: (ChoiceQuestion | NumberInputQuestion)[] = [
  {
    id: `${U.triangles}.q-1`,
    unitId: U.triangles,
    prompt: "3つの {辺|へん}の {長|なが}さが ぜんぶ おなじ {三角形|さんかくけい}を なんという？",
    explanation: "3つの {辺|へん}が ぜんぶ おなじ {三角形|さんかくけい}は「{正三角形|せいさんかくけい}」だよ。",
    format: "choice",
    choices: ["{正三角形|せいさんかくけい}", "{二等辺三角形|にとうへんさんかくけい}", "{直角三角形|ちょっかくさんかくけい}", "まる"],
    answer: "{正三角形|せいさんかくけい}",
  },
  {
    id: `${U.triangles}.q-2`,
    unitId: U.triangles,
    prompt: "2つの {辺|へん}の {長|なが}さが おなじ {三角形|さんかくけい}を なんという？",
    explanation: "2つの {辺|へん}が おなじ {三角形|さんかくけい}は「{二等辺三角形|にとうへんさんかくけい}」だよ。",
    format: "choice",
    choices: ["{二等辺三角形|にとうへんさんかくけい}", "{正三角形|せいさんかくけい}", "しかく", "{直角三角形|ちょっかくさんかくけい}"],
    answer: "{二等辺三角形|にとうへんさんかくけい}",
  },
  {
    id: `${U.triangles}.q-3`,
    unitId: U.triangles,
    prompt: "{正三角形|せいさんかくけい}の 3つの {角|かど}の {大|おお}きさは？",
    explanation: "{正三角形|せいさんかくけい}は {辺|へん}も {角|かど}も ぜんぶ おなじ {大|おお}きさ だよ。",
    format: "choice",
    choices: ["ぜんぶ おなじ", "ぜんぶ ちがう", "2つだけ おなじ", "わからない"],
    answer: "ぜんぶ おなじ",
  },
  {
    id: `${U.triangles}.q-4`,
    unitId: U.triangles,
    prompt: "{二等辺三角形|にとうへんさんかくけい}で {大|おお}きさが おなじ {角|かど}は いくつ ある？",
    explanation: "{二等辺三角形|にとうへんさんかくけい}は おなじ {長|なが}さの {辺|へん}の あいだ{以外|いがい}の 2つの {角|かど}が おなじ。こたえは 2。",
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.triangles}.q-5`,
    unitId: U.triangles,
    prompt: "{三角形|さんかくけい}の {辺|へん}は いくつ ある？",
    explanation: "{三角形|さんかくけい}は「{三|さん}（3）」の かく かたち。{辺|へん}は 3つ あるよ。",
    format: "number-input",
    answer: 3,
  },
];

// 10) ながさ（km・まきじゃく）
const lengthQuestions: (NumberInputQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.lengthKm}.q-1`,
    unitId: U.lengthKm,
    prompt: "1km は なんm？",
    explanation: "1km＝1000m。kは「1000ばい」をあらわすよ。",
    format: "number-input",
    answer: 1000,
  },
  {
    id: `${U.lengthKm}.q-2`,
    unitId: U.lengthKm,
    prompt: "1500m は なんkm なんm？",
    explanation: "1000mで 1km。のこり 500mで「1km 500m」だよ。",
    format: "choice",
    choices: ["1km 500m", "15km", "1km 50m", "150km"],
    answer: "1km 500m",
  },
  {
    id: `${U.lengthKm}.q-3`,
    unitId: U.lengthKm,
    prompt: "2km は なんm？",
    explanation: "1km＝1000m だから、2km＝2000m だよ。",
    format: "number-input",
    answer: 2000,
  },
  {
    id: `${U.lengthKm}.q-4`,
    unitId: U.lengthKm,
    prompt: "1km 200m ＋ 800m ＝ なんkm？",
    explanation: "1200m＋800m＝2000m。2000m＝2km だよ。",
    format: "choice",
    choices: ["2km", "1km", "10km", "2km 800m"],
    answer: "2km",
  },
  {
    id: `${U.lengthKm}.q-5`,
    unitId: U.lengthKm,
    prompt: "まるい ものや {長|なが}い きょりを はかるのに べんりな どうぐは？",
    explanation: "まきとれる「まきじゃく」は {長|なが}い ものや まがった ところを はかれるよ。",
    format: "choice",
    choices: ["まきじゃく", "30cmものさし", "てんびん", "とけい"],
    answer: "まきじゃく",
  },
];

// 11) おもさ（g・kg）
const weightQuestions: (NumberInputQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.weight}.q-1`,
    unitId: U.weight,
    prompt: "1kg は なんg？",
    explanation: "1kg＝1000g。kは「1000ばい」をあらわすよ。",
    format: "number-input",
    answer: 1000,
  },
  {
    id: `${U.weight}.q-2`,
    unitId: U.weight,
    prompt: "1000g は なんkg？",
    explanation: "1000gで ちょうど 1kg だよ。",
    format: "number-input",
    answer: 1,
  },
  {
    id: `${U.weight}.q-3`,
    unitId: U.weight,
    prompt: "500g ＋ 700g ＝ なんkg なんg？",
    explanation: "500g＋700g＝1200g。1000gで 1kgだから「1kg 200g」。",
    format: "choice",
    choices: ["1kg 200g", "12kg", "1kg 2g", "120g"],
    answer: "1kg 200g",
  },
  {
    id: `${U.weight}.q-4`,
    unitId: U.weight,
    prompt: "ものの {重|おも}さを はかる どうぐは？",
    explanation: "「はかり」を つかうと ものの {重|おも}さが わかるよ。",
    format: "choice",
    choices: ["はかり", "ものさし", "とけい", "コンパス"],
    answer: "はかり",
  },
  {
    id: `${U.weight}.q-5`,
    unitId: U.weight,
    prompt: "1t（トン）は なんkg？",
    explanation: "1t＝1000kg。とても {重|おも}い ものを あらわすときに つかうよ。",
    format: "number-input",
    answer: 1000,
  },
];

// 12) 時こくと 時間（びょう）。1問は clock SVG を使う
const timeQuestions: (NumberInputQuestion | ChoiceQuestion | ClockReadQuestion)[] = [
  {
    id: `${U.timeSeconds}.q-1`,
    unitId: U.timeSeconds,
    prompt: "1ぷんは なんびょう？",
    explanation: "1ぷん＝60びょう。とけいの ながいはりが 1めもり すすむのが 1びょう だよ。",
    format: "number-input",
    answer: 60,
  },
  {
    id: `${U.timeSeconds}.q-2`,
    unitId: U.timeSeconds,
    prompt: "1じかんは なんぷん？",
    explanation: "1じかん＝60ぷん。ながいはりが 1しゅう すると 1じかん だよ。",
    format: "number-input",
    answer: 60,
  },
  {
    id: `${U.timeSeconds}.q-3`,
    unitId: U.timeSeconds,
    prompt: "120びょうは なんぷん？",
    explanation: "60びょうで 1ぷん。120÷60＝2 で 2ふん だよ。",
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.timeSeconds}.q-4`,
    unitId: U.timeSeconds,
    prompt: "とけいは なんじ なんぷん？",
    explanation: "みじかいはりが 4の すこしさき、ながいはりが 6 をさすので「4じ30ぷん」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 4, minute: 30 }, caption: "なんじ なんぷん？" },
    format: "clock-read",
    choices: ["4じ30ぷん", "4じ", "5じ30ぷん", "3じ30ぷん"],
    answer: "4じ30ぷん",
  },
  {
    id: `${U.timeSeconds}.q-5`,
    unitId: U.timeSeconds,
    prompt: "あさ 8じ20ぷんに いえを {出|で}て、20ぷん あるくと {学校|がっこう}に つくのは なんじ なんぷん？",
    explanation: "8じ20ぷんに 20ぷん たすと 8じ40ぷん だよ。",
    format: "choice",
    choices: ["8じ40ぷん", "8じ20ぷん", "9じ", "8じ30ぷん"],
    answer: "8じ40ぷん",
  },
];

// 13) ぼうグラフと ひょう（しらべ: りんご5・みかん8・ばなな3）
const barGraphQuestions: (ChoiceQuestion | NumberInputQuestion)[] = [
  {
    id: `${U.barGraph}.q-1`,
    unitId: U.barGraph,
    prompt: "すきな くだものしらべ：りんご5{人|にん}・みかん8{人|にん}・ばなな3{人|にん}。いちばん おおいのは？",
    explanation: "8{人|にん}の みかんが いちばん おおいね。ぼうグラフでは ぼうが いちばん {長|なが}くなるよ。",
    format: "choice",
    choices: ["みかん", "りんご", "ばなな", "ぜんぶ おなじ"],
    answer: "みかん",
  },
  {
    id: `${U.barGraph}.q-2`,
    unitId: U.barGraph,
    prompt: "おなじ しらべで いちばん すくないのは？",
    explanation: "3{人|にん}の ばななが いちばん すくないよ。ぼうが いちばん みじかいね。",
    format: "choice",
    choices: ["ばなな", "りんご", "みかん", "ぜんぶ おなじ"],
    answer: "ばなな",
  },
  {
    id: `${U.barGraph}.q-3`,
    unitId: U.barGraph,
    prompt: "りんご(5{人|にん})と ばなな(3{人|にん})の {人数|にんずう}の ちがいは なん{人|にん}？",
    explanation: "5−3＝2。ぼうの {長|なが}さの ちがいで くらべられるよ。",
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.barGraph}.q-4`,
    unitId: U.barGraph,
    prompt: "ぜんぶで なん{人|にん}が こたえた？",
    explanation: "5＋8＋3＝16。ぜんぶの {人数|にんずう}を たすよ。",
    format: "number-input",
    answer: 16,
  },
  {
    id: `${U.barGraph}.q-5`,
    unitId: U.barGraph,
    prompt: "{表|ひょう}や ぼうグラフを つかうと どんな よさが ある？",
    explanation: "ぼうグラフは ぼうの {長|なが}さで、おおい すくないが ひとめで わかるよ。",
    format: "choice",
    choices: ["おおい すくないが ひとめで わかる", "あじが わかる", "{重|おも}さが わかる", "じかんが わかる"],
    answer: "おおい すくないが ひとめで わかる",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────

export const sansuuG3Contents: Record<string, UnitContent> = {
  [U.largeNumbers]: {
    unitId: U.largeNumbers,
    learn: {
      unitId: U.largeNumbers,
      steps: [
        {
          heading: "1000より {大|おお}きい {数|かず}",
          body: "1000が 10こ あつまると 10000（{一万|いちまん}）になるよ。くらいが 1つ ふえて、もっと {大|おお}きい {数|かず}が あらわせるね。",
          visual: { kind: "emoji", value: "💴×10 ＝ 10000", caption: "1000が 10こで 10000" },
        },
        {
          heading: "くらいを よもう",
          body: "{大|おお}きい {数|かず}は {右|みぎ}から「{一|いち}・{十|じゅう}・{百|ひゃく}・{千|せん}・{一万|いちまん}…」と くらいが ならぶよ。くらいごとに {数|かず}を {見|み}ると よみやすいね。",
          visual: { kind: "emoji", value: "5 3 0 0 0", caption: "53000 ＝ 5{万|まん}3{千|せん}" },
        },
        {
          heading: "つくってみよう",
          body: "3000と 400と 50と 6 を あわせると 3456。くらいごとに たすと {大|おお}きい {数|かず}が できるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.largeNumbers, questions: largeNumberQuestions, questionCount: 5 },
  },

  [U.addSub3digit]: {
    unitId: U.addSub3digit,
    learn: {
      unitId: U.addSub3digit,
      steps: [
        {
          heading: "くらいを そろえる",
          body: "{筆算|ひっさん}では くらいを たてに そろえて かくよ。{一|いち}のくらいから じゅんに {計算|けいさん}するのが こつ。",
          visual: { kind: "emoji", value: "2 4 5\n＋1 3 2", caption: "くらいを そろえる" },
        },
        {
          heading: "くりあがり・くりさがり",
          body: "たして 10{以上|いじょう}に なったら {上|うえ}の くらいへ「くりあがり」。ひけない ときは {上|うえ}から「くりさげ」るよ。",
          visual: { kind: "svg", name: "number-blocks", params: { tens: 1, ones: 2 }, caption: "10の かたまりで かんがえる" },
        },
      ],
    },
    test: { unitId: U.addSub3digit, questions: addSub3digitQuestions, questionCount: 5 },
  },

  [U.multiplication]: {
    unitId: U.multiplication,
    learn: {
      unitId: U.multiplication,
      steps: [
        {
          heading: "{掛|か}け{算|ざん}は まとまりの {数|かず}",
          body: "おなじ {数|かず}の まとまりが いくつぶん あるかを もとめるのが {掛|か}け{算|ざん}。23×3は 23の 3つぶん だよ。",
          visual: { kind: "emoji", value: "🍬🍬🍬", caption: "おなじ まとまりが 3つ" },
        },
        {
          heading: "くらいに わけて かける",
          body: "23×3は 20×3＝60 と 3×3＝9 に わけて、あわせて 69。{大|おお}きい {数|かず}も くらいに わければ {計算|けいさん}できるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.multiplication, questions: multiplicationQuestions, questionCount: 5 },
  },

  [U.division]: {
    unitId: U.division,
    learn: {
      unitId: U.division,
      steps: [
        {
          heading: "{割|わ}り{算|ざん}って なに？",
          body: "おなじ {数|かず}ずつ わけることを {割|わ}り{算|ざん} というよ。「÷」の きごうを つかうよ。",
          visual: { kind: "emoji", value: "🍪🍪🍪🍪🍪🍪 ➗ 3", caption: "6 ÷ 3 ＝ 2" },
        },
        {
          heading: "{掛|か}け{算|ざん}で かんがえる",
          body: "12÷3は「3に なにを かけると 12？」とかんがえると はやいよ。3×4＝12 だから こたえは 4。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.division, questions: divisionQuestions, questionCount: 5 },
  },

  [U.divisionRemainder]: {
    unitId: U.divisionRemainder,
    learn: {
      unitId: U.divisionRemainder,
      steps: [
        {
          heading: "わりきれない とき",
          body: "13÷4のように きれいに わけられない ときは「あまり」が でるよ。13は 4が 3こで 12、のこり 1。",
          visual: { kind: "emoji", value: "🍪🍪🍪🍪 🍪🍪🍪🍪 🍪🍪🍪🍪 ＋🍪", caption: "4こずつ 3つと あまり 1" },
        },
        {
          heading: "あまりの きまり",
          body: "あまりは いつも わる {数|かず}より {小|ちい}さく なるよ。あまりが わる {数|かず} いじょうなら、まだ わけられる しるし。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.divisionRemainder, questions: divisionRemainderQuestions, questionCount: 5 },
  },

  [U.fractions]: {
    unitId: U.fractions,
    learn: {
      unitId: U.fractions,
      steps: [
        {
          heading: "{分数|ぶんすう}って なに？",
          body: "おなじ {大|おお}きさに わけた 1つぶんを あらわすのが {分数|ぶんすう}。3つに わけた 1つは「3ぶんの1（1/3）」だよ。",
          visual: { kind: "emoji", value: "🍕🍕🍕", caption: "3つに わけた 1つが 3ぶんの1" },
        },
        {
          heading: "ぶんぼと ぶんし",
          body: "{下|した}の {数|かず}（ぶんぼ）は いくつに わけたか、{上|うえ}の {数|かず}（ぶんし）は いくつぶんか をあらわすよ。",
          visual: { kind: "none" },
        },
        {
          heading: "おなじ ぶんぼの {足|た}し{算|ざん}",
          body: "ぶんぼが おなじ なら ぶんしを たすだけ。5ぶんの2 ＋ 5ぶんの1 ＝ 5ぶんの3 だよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.fractions, questions: fractionQuestions, questionCount: 5 },
  },

  [U.decimals]: {
    unitId: U.decimals,
    learn: {
      unitId: U.decimals,
      steps: [
        {
          heading: "{小数|しょうすう}って なに？",
          body: "1を 10こに わけた 1つぶんが 0.1。1より {小|ちい}さい はんぱな {数|かず}を {小数|しょうすう}で あらわせるよ。",
          visual: { kind: "emoji", value: "🧃", caption: "0.1L が 10こで 1L" },
        },
        {
          heading: "0.1の いくつぶん",
          body: "0.3は 0.1が 3こぶん。0.1が なんこ あるかで かんがえると {小数|しょうすう}の {足|た}し{算|ざん} {引|ひ}き{算|ざん}も できるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.decimals, questions: decimalQuestions, questionCount: 5 },
  },

  [U.circleSphere]: {
    unitId: U.circleSphere,
    learn: {
      unitId: U.circleSphere,
      steps: [
        {
          heading: "{円|えん}の なかま",
          body: "まんなかの {点|てん}が「ちゅうしん」、そこから まわりまでが「はんけい」、まわりから まわりを とおって まんなかを とおる {長|なが}さが「ちょっけい」。",
          visual: { kind: "emoji", value: "⭕", caption: "{円|えん}" },
        },
        {
          heading: "ちょっけいは はんけいの 2ばい",
          body: "ちょっけいは はんけいの 2ばいだよ。はんけい 5cm なら ちょっけいは 10cm。",
          visual: { kind: "none" },
        },
        {
          heading: "{球|きゅう}",
          body: "ボールのように どこから {見|み}ても {円|えん}に {見|み}える かたちが「{球|きゅう}」。きったところは いつも {円|えん}に なるよ。",
          visual: { kind: "emoji", value: "🔴", caption: "{球|きゅう}" },
        },
      ],
    },
    test: { unitId: U.circleSphere, questions: circleSphereQuestions, questionCount: 5 },
  },

  [U.triangles]: {
    unitId: U.triangles,
    learn: {
      unitId: U.triangles,
      steps: [
        {
          heading: "{辺|へん}の {長|なが}さで わける",
          body: "2つの {辺|へん}が おなじ {三角形|さんかくけい}が「{二等辺三角形|にとうへんさんかくけい}」、3つとも おなじが「{正三角形|せいさんかくけい}」だよ。",
          visual: { kind: "emoji", value: "🔺", caption: "{三角形|さんかくけい}" },
        },
        {
          heading: "{角|かど}の {大|おお}きさ",
          body: "{二等辺三角形|にとうへんさんかくけい}は おなじ {大|おお}きさの {角|かど}が 2つ、{正三角形|せいさんかくけい}は 3つとも おなじ {大|おお}きさ だよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.triangles, questions: triangleQuestions, questionCount: 5 },
  },

  [U.lengthKm]: {
    unitId: U.lengthKm,
    learn: {
      unitId: U.lengthKm,
      steps: [
        {
          heading: "あたらしい たんい km",
          body: "とても {長|なが}い きょりは「km（キロメートル）」で あらわすよ。1km＝1000m だよ。",
          visual: { kind: "emoji", value: "🏫➡️🏠", caption: "いえから {学校|がっこう}までの きょり" },
        },
        {
          heading: "まきじゃく",
          body: "「まきじゃく」は まきとれる ものさし。{長|なが}い ものや まがった ところも はかれるよ。",
          visual: { kind: "emoji", value: "📏", caption: "まきじゃく" },
        },
      ],
    },
    test: { unitId: U.lengthKm, questions: lengthQuestions, questionCount: 5 },
  },

  [U.weight]: {
    unitId: U.weight,
    learn: {
      unitId: U.weight,
      steps: [
        {
          heading: "{重|おも}さの たんい",
          body: "{重|おも}さは「g（グラム）」や「kg（キログラム）」で あらわすよ。1kg＝1000g だよ。",
          visual: { kind: "emoji", value: "⚖️", caption: "はかりで {重|おも}さを しらべる" },
        },
        {
          heading: "g と kg を つかいわける",
          body: "けしゴムは g、ランドセルは kg のように、{重|おも}さに あわせて たんいを えらぶよ。1000gで 1kgに かわるね。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.weight, questions: weightQuestions, questionCount: 5 },
  },

  [U.timeSeconds]: {
    unitId: U.timeSeconds,
    learn: {
      unitId: U.timeSeconds,
      steps: [
        {
          heading: "びょう・ふん・じかん",
          body: "みじかい {時間|じかん}は「びょう」で あらわすよ。60びょうで 1ぷん、60ぷんで 1じかん だよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 3, minute: 0 }, caption: "3じ ちょうど" },
        },
        {
          heading: "{時間|じかん}を {計算|けいさん}する",
          body: "{出|で}かける {時刻|じこく}に かかる {時間|じかん}を たすと、つく {時刻|じこく}が わかるよ。8じ20ぷん＋20ぷん＝8じ40ぷん。",
          visual: { kind: "svg", name: "clock", params: { hour: 8, minute: 30 }, caption: "8じ30ぷん" },
        },
      ],
    },
    test: { unitId: U.timeSeconds, questions: timeQuestions, questionCount: 5 },
  },

  [U.barGraph]: {
    unitId: U.barGraph,
    learn: {
      unitId: U.barGraph,
      steps: [
        {
          heading: "{表|ひょう}に まとめる",
          body: "しらべた {数|かず}は {表|ひょう}に まとめると {見|み}やすいよ。なにが いくつ あるかを せいりするんだ。",
          visual: { kind: "emoji", value: "📋", caption: "{表|ひょう}に まとめる" },
        },
        {
          heading: "ぼうグラフで くらべる",
          body: "ぼうの {長|なが}さで {数|かず}を あらわすのが ぼうグラフ。{長|なが}い ぼうほど おおく、ひとめで くらべられるよ。",
          visual: { kind: "emoji", value: "📊", caption: "ぼうグラフ" },
        },
      ],
    },
    test: { unitId: U.barGraph, questions: barGraphQuestions, questionCount: 5 },
  },
};
