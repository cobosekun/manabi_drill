// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小5
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts（export構造・命名・粒度を合わせる）。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 小5は既存 generators（10までの加減・計数のみ）が使えないため、全単元 固定 questions[]。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type { Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 領域 ──────────────────────────────────
// 数と計算 は g1 と同じ領域id（sansuu.number-calc）を共有する（学年をまたぐ同一領域）。

export const sansuuG5Domains: Domain[] = [
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
// 依存グラフ（prerequisites / leadsTo）。g4 を前提、g6 へつながる前提で id を指す
// （他worker/他学年の単元と将来つながる。バリデータが最終的に参照解決を検査）。
//
//   integers-decimals ─▶ decimal-mul-div ─▶ per-unit-quantity ─▶ ratio-percentage
//   multiples-divisors ─▶ fraction-add-sub
//   area-figures ─▶ regular-polygon-circle / volume
//   average / band-pie-graph（データの活用）
//
const U = {
  integersDecimals: "sansuu.g5.integers-decimals",
  multiplesDivisors: "sansuu.g5.multiples-divisors",
  decimalMulDiv: "sansuu.g5.decimal-mul-div",
  fractionAddSub: "sansuu.g5.fraction-add-sub",
  areaFigures: "sansuu.g5.area-figures",
  regularPolygonCircle: "sansuu.g5.regular-polygon-circle",
  volume: "sansuu.g5.volume",
  perUnitQuantity: "sansuu.g5.per-unit-quantity",
  ratioPercentage: "sansuu.g5.ratio-percentage",
  average: "sansuu.g5.average",
  bandPieGraph: "sansuu.g5.band-pie-graph",
} as const;

// 他学年の参照先 id（将来 g4/g6 worker が用意する前提で文字列指定）
const G4 = {
  decimalAddSub: "sansuu.g4.decimal-add-sub",
  fractionMeaning: "sansuu.g4.fraction-meaning",
  areaRectangle: "sansuu.g4.area-rectangle",
  divisionWhole: "sansuu.g4.division",
} as const;
const G6 = {
  fractionMulDiv: "sansuu.g6.fraction-mul-div",
  ratioProportion: "sansuu.g6.ratio-proportion",
  circleArea: "sansuu.g6.circle-area",
  prismVolume: "sansuu.g6.prism-volume",
  speed: "sansuu.g6.speed",
} as const;

export const sansuuG5Units: Unit[] = [
  {
    id: U.integersDecimals,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "せいすうとしょうすう",
    order: 1,
    realWorldUse:
      "ねだんを 10ばい・100ばい したり、グラムを キログラムに なおすときのように、けたを うごかして かずの おおきさを かえるときに つかうよ。",
    leadsTo: [U.decimalMulDiv],
    prerequisites: [G4.decimalAddSub],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.multiplesDivisors,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "ばいすうとやくすう",
    order: 2,
    realWorldUse:
      "おなじ かんかくで ならぶ ものの じかんを そろえたり、あめを あまりなく わけられる にんずうを かんがえるときに つかうよ。",
    leadsTo: [U.fractionAddSub],
    prerequisites: [G4.divisionWhole],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.decimalMulDiv,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "しょうすうの かけざん・わりざん",
    order: 3,
    realWorldUse:
      "1mで 80えんの リボンを 2.5m かったときの ねだんのように、はんぱな かずの かけざん・わりざんに つかうよ。",
    leadsTo: [U.perUnitQuantity, G6.fractionMulDiv],
    prerequisites: [U.integersDecimals],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.fractionAddSub,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "ぶんすうの たしざん・ひきざん",
    order: 4,
    realWorldUse:
      "ピザを 1/2 と 1/3 たべた ぜんぶの りょうのように、ぶんぼの ちがう ぶんすうを あわせたり へらしたりするときに つかうよ。",
    leadsTo: [G6.fractionMulDiv],
    prerequisites: [U.multiplesDivisors, G4.fractionMeaning],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.areaFigures,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.geometry",
    title: "さんかくけい・しかくけいの めんせき",
    order: 5,
    realWorldUse:
      "さんかくの はたや へいこうしへんけいの かべの ひろさを もとめるときのように、いろいろな かたちの めんせきを はかるときに つかうよ。",
    leadsTo: [U.regularPolygonCircle, G6.circleArea],
    prerequisites: [G4.areaRectangle],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.regularPolygonCircle,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.geometry",
    title: "せいたかくけいと えん",
    order: 6,
    realWorldUse:
      "まるい おさらの ふちの ながさ（えんしゅう）や、タイヤが 1かいてんで すすむ きょりを もとめるときに つかうよ。",
    leadsTo: [G6.circleArea],
    prerequisites: [U.areaFigures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.volume,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.geometry",
    title: "たいせき",
    order: 7,
    realWorldUse:
      "はこや すいそうに どれだけ みずや ものが はいるかを もとめるときのように、いれものの おおきさ（かさ）を しるときに つかうよ。",
    leadsTo: [G6.prismVolume],
    prerequisites: [U.areaFigures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.perUnitQuantity,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.change-relation",
    title: "たんいりょうあたりの おおきさ",
    order: 8,
    realWorldUse:
      "おかし 1こ ぶんの ねだんや、くるまが 1L で すすむ きょりを くらべて、どちらが おとくか かんがえるときに つかうよ。",
    leadsTo: [U.ratioPercentage, G6.speed],
    prerequisites: [U.decimalMulDiv],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.ratioPercentage,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.change-relation",
    title: "わりあいと ひゃくぶんりつ",
    order: 9,
    realWorldUse:
      "おみせの「20%びき」や、テストの せいかいりつのように、ぜんたいを もとにした わりあいを かんがえるときに つかうよ。",
    leadsTo: [U.bandPieGraph, G6.ratioProportion],
    prerequisites: [U.perUnitQuantity],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.average,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.data",
    title: "へいきん",
    order: 10,
    realWorldUse:
      "テストの へいきんてんや、1にちに よむ ほんの ページすうのように、でこぼこした かずを ならして あらわすときに つかうよ。",
    leadsTo: [U.bandPieGraph],
    prerequisites: [G4.divisionWhole],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.bandPieGraph,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.data",
    title: "おびグラフと えんグラフ",
    order: 11,
    realWorldUse:
      "クラスの すきな きょうかや、つかった おこづかいの うちわけのように、ぜんたいに たいする わりあいを えで くらべるときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.ratioPercentage],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 算数小5は既存 generators が対応しないため、全単元 固定 questions[]（全問 explanation 必須）。

export const sansuuG5Contents: Record<string, UnitContent> = {
  // ── 1. 整数と小数 ──
  [U.integersDecimals]: {
    unitId: U.integersDecimals,
    learn: {
      unitId: U.integersDecimals,
      steps: [
        {
          heading: "10ばい・100ばいすると?",
          body: "かずを 10ばい すると くらいが ひとつ あがって、てんが みぎへ うごくよ。100ばいなら ふたつ あがるよ。",
          visual: { kind: "emoji", value: "2.5 → 25 → 250", caption: "10ばい・100ばい" },
        },
        {
          heading: "1/10・1/100にすると?",
          body: "かずを 1/10 にすると くらいが ひとつ さがって、てんが ひだりへ うごくよ。100ぶんの1なら ふたつ さがるよ。",
          visual: { kind: "emoji", value: "38 → 3.8 → 0.38", caption: "1/10・1/100" },
        },
        {
          heading: "0.01が なんこ分?",
          body: "0.74 は 0.1 が 7こ と 0.01 が 4こ。ぜんぶで 0.01 が 74こ あつまった かずとも いえるよ。",
          visual: { kind: "emoji", value: "0.74 = 0.01 × 74", caption: "ちいさい くらいで かぞえる" },
        },
      ],
    },
    test: {
      unitId: U.integersDecimals,
      questionCount: 5,
      questions: [
        {
          id: `${U.integersDecimals}.q-1`,
          unitId: U.integersDecimals,
          prompt: "2.5 を 10ばい すると いくつ?",
          explanation: "10ばいすると くらいが ひとつ あがるよ。てんが みぎへ うごいて 25 になるよ。",
          format: "number-input",
          answer: 25,
        },
        {
          id: `${U.integersDecimals}.q-2`,
          unitId: U.integersDecimals,
          prompt: "38 を 1/10 に すると いくつ?",
          explanation: "1/10 にすると くらいが ひとつ さがるよ。てんが ひだりへ うごいて 3.8 になるよ。",
          format: "number-input",
          answer: 3.8,
        },
        {
          id: `${U.integersDecimals}.q-3`,
          unitId: U.integersDecimals,
          prompt: "0.74 は 0.01 を なんこ あつめた かず?",
          explanation: "0.74 = 0.01 × 74。だから 0.01 が 74こ あつまった かずだよ。",
          format: "number-input",
          answer: 74,
        },
        {
          id: `${U.integersDecimals}.q-4`,
          unitId: U.integersDecimals,
          prompt: "6.2 を 100ばい すると いくつ?",
          explanation: "100ばいは くらいが ふたつ あがるよ。6.2 → 62 → 620 で 620 だよ。",
          format: "number-input",
          answer: 620,
        },
        {
          id: `${U.integersDecimals}.q-5`,
          unitId: U.integersDecimals,
          prompt: "4.5 を 1/100 に すると いくつ?",
          explanation: "1/100 は くらいが ふたつ さがるよ。4.5 → 0.45 → 0.045 で 0.045 だよ。",
          format: "number-input",
          answer: 0.045,
        },
      ],
    },
  },

  // ── 2. 倍数と約数 ──
  [U.multiplesDivisors]: {
    unitId: U.multiplesDivisors,
    learn: {
      unitId: U.multiplesDivisors,
      steps: [
        {
          heading: "ばいすうって なに?",
          body: "ある かずを 1ばい・2ばい・3ばい… した かずを「ばいすう」というよ。3の ばいすうは 3, 6, 9, 12… だね。",
          visual: { kind: "emoji", value: "3 6 9 12 15", caption: "3の ばいすう" },
        },
        {
          heading: "やくすうって なに?",
          body: "ある かずを わりきれる かずを「やくすう」というよ。12 の やくすうは 1, 2, 3, 4, 6, 12 だよ。",
          visual: { kind: "emoji", value: "12 ÷ 1,2,3,4,6,12", caption: "12を わりきれる かず" },
        },
        {
          heading: "こうばいすう・こうやくすう",
          body: "ふたつの かずに きょうつうの ばいすうが こうばいすう、きょうつうの やくすうが こうやくすう。いちばん ちいさい/おおきい ものに ちゅうもくするよ。",
          visual: { kind: "emoji", value: "6と8 → 24 / 12と18 → 6", caption: "さいしょうこうばいすう・さいだいこうやくすう" },
        },
      ],
    },
    test: {
      unitId: U.multiplesDivisors,
      questionCount: 5,
      questions: [
        {
          id: `${U.multiplesDivisors}.q-1`,
          unitId: U.multiplesDivisors,
          prompt: "6 と 8 の さいしょうこうばいすう は?",
          explanation: "6の ばいすう 6,12,18,24… と 8の ばいすう 8,16,24… で はじめて そろうのが 24 だよ。",
          format: "number-input",
          answer: 24,
        },
        {
          id: `${U.multiplesDivisors}.q-2`,
          unitId: U.multiplesDivisors,
          prompt: "12 と 18 の さいだいこうやくすう は?",
          explanation: "12の やくすうと 18の やくすうで きょうつうの いちばん おおきい かずは 6 だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.multiplesDivisors}.q-3`,
          unitId: U.multiplesDivisors,
          prompt: "つぎの うち ぐうすう は どれ?",
          explanation: "ぐうすうは 2で わりきれる かず。14 は 2で わりきれるので ぐうすうだよ。",
          format: "choice",
          choices: ["14", "7", "9", "21"],
          answer: "14",
        },
        {
          id: `${U.multiplesDivisors}.q-4`,
          unitId: U.multiplesDivisors,
          prompt: "15 の やくすう は なんこ ある?",
          explanation: "15 を わりきれるのは 1, 3, 5, 15 の 4こ だよ。",
          format: "number-input",
          answer: 4,
        },
        {
          id: `${U.multiplesDivisors}.q-5`,
          unitId: U.multiplesDivisors,
          prompt: "3 の ばいすう を ちいさい じゅんに ならべたとき、4ばんめ は?",
          explanation: "3, 6, 9, 12… だから 4ばんめは 12 だよ。",
          format: "number-input",
          answer: 12,
        },
      ],
    },
  },

  // ── 3. 小数のかけ算・わり算 ──
  [U.decimalMulDiv]: {
    unitId: U.decimalMulDiv,
    learn: {
      unitId: U.decimalMulDiv,
      steps: [
        {
          heading: "しょうすうの かけざん",
          body: "てんを ないものとして せいすうの ように かけて、さいごに もとの しょうすうの けたぶん てんを うつよ。2.4 × 3 なら 24 × 3 = 72 → 7.2。",
          visual: { kind: "emoji", value: "2.4 × 3 = 7.2", caption: "けたぶん てんを うつ" },
        },
        {
          heading: "しょうすうの わり算",
          body: "わる かずを せいすうに なるように 10ばい・100ばい して、わられる かずも おなじだけ うごかしてから わるよ。",
          visual: { kind: "emoji", value: "7.2 ÷ 0.9 = 72 ÷ 9 = 8", caption: "わる かずを せいすうに" },
        },
        {
          heading: "1より ちいさい かずを かける",
          body: "1.5 × 0.4 のように 1より ちいさい かずを かけると、こたえは もとの かずより ちいさく なるよ。",
          visual: { kind: "emoji", value: "1.5 × 0.4 = 0.6", caption: "ちいさく なる" },
        },
      ],
    },
    test: {
      unitId: U.decimalMulDiv,
      questionCount: 5,
      questions: [
        {
          id: `${U.decimalMulDiv}.q-1`,
          unitId: U.decimalMulDiv,
          prompt: "2.4 × 3 = ?",
          explanation: "24 × 3 = 72。しょうすう1けたぶん てんを うって 7.2 だよ。",
          format: "number-input",
          answer: 7.2,
        },
        {
          id: `${U.decimalMulDiv}.q-2`,
          unitId: U.decimalMulDiv,
          prompt: "1.5 × 0.4 = ?",
          explanation: "15 × 4 = 60。しょうすう2けたぶん てんを うって 0.60 = 0.6 だよ。",
          format: "number-input",
          answer: 0.6,
        },
        {
          id: `${U.decimalMulDiv}.q-3`,
          unitId: U.decimalMulDiv,
          prompt: "4.8 ÷ 6 = ?",
          explanation: "48 ÷ 6 = 8。くらいを そろえて 0.8 だよ。",
          format: "number-input",
          answer: 0.8,
        },
        {
          id: `${U.decimalMulDiv}.q-4`,
          unitId: U.decimalMulDiv,
          prompt: "7.2 ÷ 0.9 = ?",
          explanation: "わる かず 0.9 を 10ばいして 9、わられる かずも 10ばいして 72。72 ÷ 9 = 8 だよ。",
          format: "number-input",
          answer: 8,
        },
        {
          id: `${U.decimalMulDiv}.q-5`,
          unitId: U.decimalMulDiv,
          prompt: "0.6 × 0.5 = ?",
          explanation: "6 × 5 = 30。しょうすう2けたぶん てんを うって 0.30 = 0.3 だよ。",
          format: "number-input",
          answer: 0.3,
        },
      ],
    },
  },

  // ── 4. 分数のたし算・ひき算 ──
  [U.fractionAddSub]: {
    unitId: U.fractionAddSub,
    learn: {
      unitId: U.fractionAddSub,
      steps: [
        {
          heading: "つうぶんって なに?",
          body: "ぶんぼ（したの かず）が ちがう ぶんすうは、そのまま たせないよ。ぶんぼを そろえることを「つうぶん」というよ。",
          visual: { kind: "emoji", value: "1/2 = 3/6 , 1/3 = 2/6", caption: "ぶんぼを 6に そろえる" },
        },
        {
          heading: "ぶんぼを そろえて たす・ひく",
          body: "つうぶんしたら ぶんし（うえの かず）どうしを たしたり ひいたり するよ。1/2 + 1/3 = 3/6 + 2/6 = 5/6。",
          visual: { kind: "emoji", value: "3/6 + 2/6 = 5/6", caption: "ぶんしを たす" },
        },
        {
          heading: "やくぶんで かんたんに",
          body: "こたえの ぶんすうは、ぶんぼと ぶんしを おなじ かずで わって ちいさく できるよ（やくぶん）。3/6 = 1/2 だね。",
          visual: { kind: "emoji", value: "3/6 = 1/2", caption: "やくぶん" },
        },
      ],
    },
    test: {
      unitId: U.fractionAddSub,
      questionCount: 5,
      questions: [
        {
          id: `${U.fractionAddSub}.q-1`,
          unitId: U.fractionAddSub,
          prompt: "1/2 + 1/3 = ?",
          explanation: "ぶんぼを 6に つうぶんして 3/6 + 2/6 = 5/6 だよ。",
          format: "choice",
          choices: ["5/6", "2/5", "1/6", "2/6"],
          answer: "5/6",
        },
        {
          id: `${U.fractionAddSub}.q-2`,
          unitId: U.fractionAddSub,
          prompt: "3/4 − 1/2 = ?",
          explanation: "1/2 を 2/4 にして 3/4 − 2/4 = 1/4 だよ。",
          format: "choice",
          choices: ["1/4", "2/4", "1/2", "2/2"],
          answer: "1/4",
        },
        {
          id: `${U.fractionAddSub}.q-3`,
          unitId: U.fractionAddSub,
          prompt: "2/3 + 5/6 = ?",
          explanation: "2/3 を 4/6 にして 4/6 + 5/6 = 9/6。やくぶんして 3/2 だよ。",
          format: "choice",
          choices: ["3/2", "7/9", "1/2", "9/9"],
          answer: "3/2",
        },
        {
          id: `${U.fractionAddSub}.q-4`,
          unitId: U.fractionAddSub,
          prompt: "5/6 − 1/3 = ?",
          explanation: "1/3 を 2/6 にして 5/6 − 2/6 = 3/6。やくぶんして 1/2 だよ。",
          format: "choice",
          choices: ["1/2", "4/3", "4/6", "2/3"],
          answer: "1/2",
        },
        {
          id: `${U.fractionAddSub}.q-5`,
          unitId: U.fractionAddSub,
          prompt: "1/5 + 3/10 = ?",
          explanation: "1/5 を 2/10 にして 2/10 + 3/10 = 5/10。やくぶんして 1/2 だよ。",
          format: "choice",
          choices: ["1/2", "4/15", "5/10", "2/5"],
          answer: "1/2",
        },
      ],
    },
  },

  // ── 5. 三角形・四角形の面積 ──
  [U.areaFigures]: {
    unitId: U.areaFigures,
    learn: {
      unitId: U.areaFigures,
      steps: [
        {
          heading: "さんかくけいの めんせき",
          body: "さんかくけいの めんせきは「そこ × たかさ ÷ 2」で もとめるよ。ながしかくの はんぶんと かんがえると わかりやすいね。",
          visual: { kind: "emoji", value: "△ = そこ × たかさ ÷ 2", caption: "ながしかくの はんぶん" },
        },
        {
          heading: "へいこうしへんけいの めんせき",
          body: "へいこうしへんけいの めんせきは「そこ × たかさ」だよ。よこに きって うごかすと ながしかくに なるからだね。",
          visual: { kind: "emoji", value: "▱ = そこ × たかさ", caption: "ながしかくに なおせる" },
        },
        {
          heading: "たんいは へいほう cm",
          body: "めんせきの たんいは cm²（へいほうセンチメートル）。1cmの ますが なんこ ぶんかで かんがえるよ。",
          visual: { kind: "emoji", value: "⬛ = 1cm²", caption: "ますの かず" },
        },
      ],
    },
    test: {
      unitId: U.areaFigures,
      questionCount: 5,
      questions: [
        {
          id: `${U.areaFigures}.q-1`,
          unitId: U.areaFigures,
          prompt: "そこ 4cm、たかさ 3cm の さんかくけいの めんせきは なん cm²?",
          explanation: "そこ × たかさ ÷ 2 = 4 × 3 ÷ 2 = 6 cm² だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.areaFigures}.q-2`,
          unitId: U.areaFigures,
          prompt: "そこ 8cm、たかさ 5cm の へいこうしへんけいの めんせきは なん cm²?",
          explanation: "そこ × たかさ = 8 × 5 = 40 cm² だよ。",
          format: "number-input",
          answer: 40,
        },
        {
          id: `${U.areaFigures}.q-3`,
          unitId: U.areaFigures,
          prompt: "たて 6cm、よこ 4cm の ながしかくの めんせきは なん cm²?",
          explanation: "たて × よこ = 6 × 4 = 24 cm² だよ。",
          format: "number-input",
          answer: 24,
        },
        {
          id: `${U.areaFigures}.q-4`,
          unitId: U.areaFigures,
          prompt: "そこ 10cm、たかさ 4cm の さんかくけいの めんせきは なん cm²?",
          explanation: "そこ × たかさ ÷ 2 = 10 × 4 ÷ 2 = 20 cm² だよ。",
          format: "number-input",
          answer: 20,
        },
        {
          id: `${U.areaFigures}.q-5`,
          unitId: U.areaFigures,
          prompt: "1ぺん 7cm の せいほうけいの めんせきは なん cm²?",
          explanation: "せいほうけいは たて × よこ。7 × 7 = 49 cm² だよ。",
          format: "number-input",
          answer: 49,
        },
      ],
    },
  },

  // ── 6. 正多角形と円 ──
  [U.regularPolygonCircle]: {
    unitId: U.regularPolygonCircle,
    learn: {
      unitId: U.regularPolygonCircle,
      steps: [
        {
          heading: "せいたかくけいって なに?",
          body: "へんの ながさが ぜんぶ おなじで、かどの おおきさも ぜんぶ おなじ たかくけいを「せいたかくけい」というよ。せいごかくけいは へんが 5つ だね。",
          visual: { kind: "emoji", value: "⬡ せいろっかくけい", caption: "へんも かども おなじ" },
        },
        {
          heading: "えんしゅうの もとめかた",
          body: "えんの まわりの ながさ（えんしゅう）は「ちょっけい × 3.14」で もとめるよ。3.14 を えんしゅうりつ というよ。",
          visual: { kind: "emoji", value: "えんしゅう = ちょっけい × 3.14", caption: "えんしゅうりつ 3.14" },
        },
        {
          heading: "はんけいから ちょっけい",
          body: "ちょっけいは はんけいの 2ばい。はんけい 5cm なら ちょっけいは 10cm。それから × 3.14 するよ。",
          visual: { kind: "emoji", value: "ちょっけい = はんけい × 2", caption: "まず ちょっけいに" },
        },
      ],
    },
    test: {
      unitId: U.regularPolygonCircle,
      questionCount: 5,
      questions: [
        {
          id: `${U.regularPolygonCircle}.q-1`,
          unitId: U.regularPolygonCircle,
          prompt: "ちょっけい 10cm の えんの えんしゅうは なん cm?（えんしゅうりつ 3.14）",
          explanation: "ちょっけい × 3.14 = 10 × 3.14 = 31.4 cm だよ。",
          format: "number-input",
          answer: 31.4,
        },
        {
          id: `${U.regularPolygonCircle}.q-2`,
          unitId: U.regularPolygonCircle,
          prompt: "はんけい 4cm の えんの えんしゅうは なん cm?（えんしゅうりつ 3.14）",
          explanation: "ちょっけいは 4 × 2 = 8cm。8 × 3.14 = 25.12 cm だよ。",
          format: "number-input",
          answer: 25.12,
        },
        {
          id: `${U.regularPolygonCircle}.q-3`,
          unitId: U.regularPolygonCircle,
          prompt: "せいごかくけいの へんの かずは いくつ?",
          explanation: "せいごかくけいは へんが 5つ ある たかくけいだよ。",
          format: "number-input",
          answer: 5,
        },
        {
          id: `${U.regularPolygonCircle}.q-4`,
          unitId: U.regularPolygonCircle,
          prompt: "せいろっかくけいの へんの かずは いくつ?",
          explanation: "せいろっかくけいは へんが 6つ ある たかくけいだよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.regularPolygonCircle}.q-5`,
          unitId: U.regularPolygonCircle,
          prompt: "えんしゅうが 18.84cm の えんの ちょっけいは なん cm?（えんしゅうりつ 3.14）",
          explanation: "えんしゅう ÷ 3.14 = 18.84 ÷ 3.14 = 6 cm だよ。",
          format: "number-input",
          answer: 6,
        },
      ],
    },
  },

  // ── 7. 体積 ──
  [U.volume]: {
    unitId: U.volume,
    learn: {
      unitId: U.volume,
      steps: [
        {
          heading: "たいせきって なに?",
          body: "ものが ばしょを とる おおきさ（かさ）を「たいせき」というよ。たんいは cm³（りっぽうセンチメートル）だよ。",
          visual: { kind: "emoji", value: "🧊 = 1cm³", caption: "1cmの さいころ" },
        },
        {
          heading: "ちょくほうたいの たいせき",
          body: "ちょくほうたいの たいせきは「たて × よこ × たかさ」で もとめるよ。1cmの さいころが なんこ ぶんかと おなじだね。",
          visual: { kind: "emoji", value: "たて × よこ × たかさ", caption: "さいころの かず" },
        },
        {
          heading: "1L は 1000cm³",
          body: "1ぺん 10cm の りっぽうたいの たいせきは 1000cm³。これが ちょうど 1L（リットル）だよ。",
          visual: { kind: "emoji", value: "10 × 10 × 10 = 1000cm³ = 1L", caption: "かさの たんい" },
        },
      ],
    },
    test: {
      unitId: U.volume,
      questionCount: 5,
      questions: [
        {
          id: `${U.volume}.q-1`,
          unitId: U.volume,
          prompt: "たて 2cm、よこ 3cm、たかさ 4cm の ちょくほうたいの たいせきは なん cm³?",
          explanation: "たて × よこ × たかさ = 2 × 3 × 4 = 24 cm³ だよ。",
          format: "number-input",
          answer: 24,
        },
        {
          id: `${U.volume}.q-2`,
          unitId: U.volume,
          prompt: "1ぺん 5cm の りっぽうたいの たいせきは なん cm³?",
          explanation: "りっぽうたいは 5 × 5 × 5 = 125 cm³ だよ。",
          format: "number-input",
          answer: 125,
        },
        {
          id: `${U.volume}.q-3`,
          unitId: U.volume,
          prompt: "たて 10cm、よこ 10cm、たかさ 10cm の はこの たいせきは なん cm³?",
          explanation: "10 × 10 × 10 = 1000 cm³。これは 1L とおなじだよ。",
          format: "number-input",
          answer: 1000,
        },
        {
          id: `${U.volume}.q-4`,
          unitId: U.volume,
          prompt: "たて 4cm、よこ 5cm、たかさ 2cm の ちょくほうたいの たいせきは なん cm³?",
          explanation: "4 × 5 × 2 = 40 cm³ だよ。",
          format: "number-input",
          answer: 40,
        },
        {
          id: `${U.volume}.q-5`,
          unitId: U.volume,
          prompt: "1L は なん cm³?",
          explanation: "1L は 1ぺん 10cm の りっぽうたいぶん。10 × 10 × 10 = 1000 cm³ だよ。",
          format: "number-input",
          answer: 1000,
        },
      ],
    },
  },

  // ── 8. 単位量あたりの大きさ ──
  [U.perUnitQuantity]: {
    unitId: U.perUnitQuantity,
    learn: {
      unitId: U.perUnitQuantity,
      steps: [
        {
          heading: "1こあたり・1人あたり",
          body: "「1こあたり いくら」「1人あたり なんこ」のように、ひとつ ぶんに そろえると くらべやすく なるよ。",
          visual: { kind: "emoji", value: "240えん ÷ 3こ = 80えん", caption: "1こ ぶんの ねだん" },
        },
        {
          heading: "わり算で そろえる",
          body: "ぜんたいの りょうを こすうや にんずうで わると、1つ ぶんの おおきさが もとまるよ。",
          visual: { kind: "emoji", value: "ぜんたい ÷ こすう = 1こあたり", caption: "わって そろえる" },
        },
        {
          heading: "こみぐあいの くらべ",
          body: "ひろさあたりの にんずうなど、たんいりょうあたりで くらべると どちらが こんでいるか わかるよ。",
          visual: { kind: "emoji", value: "👥 / m²", caption: "1m²あたりの 人数" },
        },
      ],
    },
    test: {
      unitId: U.perUnitQuantity,
      questionCount: 5,
      questions: [
        {
          id: `${U.perUnitQuantity}.q-1`,
          unitId: U.perUnitQuantity,
          prompt: "3こ で 240えん の おかし。1こ ぶんの ねだんは なんえん?",
          explanation: "240 ÷ 3 = 80。1こ あたり 80えん だよ。",
          format: "number-input",
          answer: 80,
        },
        {
          id: `${U.perUnitQuantity}.q-2`,
          unitId: U.perUnitQuantity,
          prompt: "くるまが 4L で 60km はしる。1L で なん km はしる?",
          explanation: "60 ÷ 4 = 15。1L あたり 15km だよ。",
          format: "number-input",
          answer: 15,
        },
        {
          id: `${U.perUnitQuantity}.q-3`,
          unitId: U.perUnitQuantity,
          prompt: "5まい で 400えん の シール。1まい ぶんは なんえん?",
          explanation: "400 ÷ 5 = 80。1まい あたり 80えん だよ。",
          format: "number-input",
          answer: 80,
        },
        {
          id: `${U.perUnitQuantity}.q-4`,
          unitId: U.perUnitQuantity,
          prompt: "あめ 30こ を 6人 で おなじ かずずつ わけると、1人 なんこ?",
          explanation: "30 ÷ 6 = 5。1人 あたり 5こ だよ。",
          format: "number-input",
          answer: 5,
        },
        {
          id: `${U.perUnitQuantity}.q-5`,
          unitId: U.perUnitQuantity,
          prompt: "2m で 300g の はりがね。1m ぶんの おもさは なん g?",
          explanation: "300 ÷ 2 = 150。1m あたり 150g だよ。",
          format: "number-input",
          answer: 150,
        },
      ],
    },
  },

  // ── 9. 割合と百分率 ──
  [U.ratioPercentage]: {
    unitId: U.ratioPercentage,
    learn: {
      unitId: U.ratioPercentage,
      steps: [
        {
          heading: "わりあいって なに?",
          body: "くらべる りょうが もとに する りょうの なんばいに あたるかを「わりあい」というよ。わりあい = くらべるりょう ÷ もとにするりょう。",
          visual: { kind: "emoji", value: "わりあい = くらべる ÷ もと", caption: "なんばいぶん?" },
        },
        {
          heading: "ひゃくぶんりつ（%）",
          body: "わりあいを 100ばいして あらわしたのが ひゃくぶんりつ（%）。0.2 は 20% だよ。",
          visual: { kind: "emoji", value: "0.2 → 20%", caption: "100ばいして %" },
        },
        {
          heading: "わりあいから りょうを もとめる",
          body: "もとにする りょう × わりあい で くらべる りょうが もとまるよ。500えん の 20% は 500 × 0.2 = 100えん。",
          visual: { kind: "emoji", value: "500 × 0.2 = 100", caption: "もと × わりあい" },
        },
      ],
    },
    test: {
      unitId: U.ratioPercentage,
      questionCount: 5,
      questions: [
        {
          id: `${U.ratioPercentage}.q-1`,
          unitId: U.ratioPercentage,
          prompt: "20人 の 30% は なん人?",
          explanation: "20 × 0.3 = 6。だから 6人 だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.ratioPercentage}.q-2`,
          unitId: U.ratioPercentage,
          prompt: "500えん の 20% は なんえん?",
          explanation: "500 × 0.2 = 100。だから 100えん だよ。",
          format: "number-input",
          answer: 100,
        },
        {
          id: `${U.ratioPercentage}.q-3`,
          unitId: U.ratioPercentage,
          prompt: "50こ の うち 10こ は ぜんたいの なん %?",
          explanation: "10 ÷ 50 = 0.2。100ばいして 20% だよ。",
          format: "number-input",
          answer: 20,
        },
        {
          id: `${U.ratioPercentage}.q-4`,
          unitId: U.ratioPercentage,
          prompt: "わりあい 0.25 を ひゃくぶんりつ（%）で あらわすと?",
          explanation: "0.25 を 100ばいすると 25。だから 25% だよ。",
          format: "number-input",
          answer: 25,
        },
        {
          id: `${U.ratioPercentage}.q-5`,
          unitId: U.ratioPercentage,
          prompt: "800えん の しなものを 10%びき で かうと いくら?",
          explanation: "10%は 800 × 0.1 = 80えん。800 − 80 = 720えん だよ。",
          format: "number-input",
          answer: 720,
        },
      ],
    },
  },

  // ── 10. 平均 ──
  [U.average]: {
    unitId: U.average,
    learn: {
      unitId: U.average,
      steps: [
        {
          heading: "へいきんって なに?",
          body: "いくつかの かずを ならして、おなじ おおきさに したものが「へいきん」だよ。でこぼこを たいらに する かんがえかただね。",
          visual: { kind: "emoji", value: "▮▯▮▯ → ▮▮▮▮", caption: "ならして そろえる" },
        },
        {
          heading: "へいきんの もとめかた",
          body: "へいきん = ぜんぶの ごうけい ÷ こすう。4, 6, 8 なら (4+6+8) ÷ 3 = 6 だよ。",
          visual: { kind: "emoji", value: "(4+6+8) ÷ 3 = 6", caption: "ごうけい ÷ こすう" },
        },
        {
          heading: "0も かぞえる",
          body: "「0こ」の ひも こすうに ふくめて わるよ。わすれると へいきんが おおきく なりすぎるよ。",
          visual: { kind: "emoji", value: "5,5,10,0 → ÷4", caption: "0も 1こと かぞえる" },
        },
      ],
    },
    test: {
      unitId: U.average,
      questionCount: 5,
      questions: [
        {
          id: `${U.average}.q-1`,
          unitId: U.average,
          prompt: "4, 6, 8 の へいきんは いくつ?",
          explanation: "(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6 だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.average}.q-2`,
          unitId: U.average,
          prompt: "10, 20, 30, 40 の へいきんは いくつ?",
          explanation: "(10 + 20 + 30 + 40) ÷ 4 = 100 ÷ 4 = 25 だよ。",
          format: "number-input",
          answer: 25,
        },
        {
          id: `${U.average}.q-3`,
          unitId: U.average,
          prompt: "テストの てんすう 80, 90, 70 の へいきんは なんてん?",
          explanation: "(80 + 90 + 70) ÷ 3 = 240 ÷ 3 = 80てん だよ。",
          format: "number-input",
          answer: 80,
        },
        {
          id: `${U.average}.q-4`,
          unitId: U.average,
          prompt: "3にちで あつめた かず 6こ, 4こ, 8こ。1にち へいきん なんこ?",
          explanation: "(6 + 4 + 8) ÷ 3 = 18 ÷ 3 = 6こ だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.average}.q-5`,
          unitId: U.average,
          prompt: "5, 5, 10, 0 の へいきんは いくつ?",
          explanation: "0も こすうに いれて (5 + 5 + 10 + 0) ÷ 4 = 20 ÷ 4 = 5 だよ。",
          format: "number-input",
          answer: 5,
        },
      ],
    },
  },

  // ── 11. 帯グラフと円グラフ ──
  [U.bandPieGraph]: {
    unitId: U.bandPieGraph,
    learn: {
      unitId: U.bandPieGraph,
      steps: [
        {
          heading: "わりあいを あらわす グラフ",
          body: "おびグラフや えんグラフは、ぜんたいを 100% とみて、それぞれが どれだけの わりあいかを えで あらわすよ。",
          visual: { kind: "emoji", value: "🟦🟥🟨🟩", caption: "ぜんたい = 100%" },
        },
        {
          heading: "おびグラフ",
          body: "ながい おびを わりあいで くぎるよ。ふつう わりあいの おおきい ものから ひだりに ならべるよ。",
          visual: { kind: "emoji", value: "🟦🟦🟦🟥🟥🟨", caption: "おおきい じゅんに ひだりから" },
        },
        {
          heading: "えんグラフ",
          body: "まるを わりあいで くぎるよ。ぜんたいは 360ど。25% なら 360 × 0.25 = 90ど だよ。",
          visual: { kind: "emoji", value: "◔ 25% = 90ど", caption: "ぜんたい 360ど" },
        },
      ],
    },
    test: {
      unitId: U.bandPieGraph,
      questionCount: 5,
      questions: [
        {
          id: `${U.bandPieGraph}.q-1`,
          unitId: U.bandPieGraph,
          prompt: "えんグラフ ぜんたいは なん %?",
          explanation: "えんグラフは ぜんたいを 100% とみて わりあいを あらわすよ。",
          format: "choice",
          choices: ["100%", "50%", "360%", "10%"],
          answer: "100%",
        },
        {
          id: `${U.bandPieGraph}.q-2`,
          unitId: U.bandPieGraph,
          prompt: "おびグラフでは ふつう わりあいの おおきい ものを どこから ならべる?",
          explanation: "おびグラフは わりあいの おおきい ものから ひだりに ならべるのが きほんだよ。",
          format: "choice",
          choices: ["ひだりから", "みぎから", "まんなかから", "じゅんばんなし"],
          answer: "ひだりから",
        },
        {
          id: `${U.bandPieGraph}.q-3`,
          unitId: U.bandPieGraph,
          prompt: "えんグラフで 25% は なんど の おうぎがた?",
          explanation: "ぜんたい 360ど の 25%。360 × 0.25 = 90ど だよ。",
          format: "choice",
          choices: ["90ど", "45ど", "180ど", "100ど"],
          answer: "90ど",
        },
        {
          id: `${U.bandPieGraph}.q-4`,
          unitId: U.bandPieGraph,
          prompt: "ぜんたい 200人 で「すき」が 50% のとき、なん人?",
          explanation: "200 × 0.5 = 100。だから 100人 だよ。",
          format: "choice",
          choices: ["100人", "50人", "150人", "200人"],
          answer: "100人",
        },
        {
          id: `${U.bandPieGraph}.q-5`,
          unitId: U.bandPieGraph,
          prompt: "ぜんたいに たいする わりあいを みるのに むいて いる グラフは?",
          explanation: "えんグラフ（や おびグラフ）は ぜんたいに たいする わりあいを みるのに むいているよ。",
          format: "choice",
          choices: ["えんグラフ", "ぼうグラフ", "おれせんグラフ", "ひょう"],
          answer: "えんグラフ",
        },
      ],
    },
  },
};
