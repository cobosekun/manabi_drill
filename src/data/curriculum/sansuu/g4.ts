// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小4
// 学習指導要領 小4算数 4領域を網羅:
//   A 数と計算 / B 図形 / C 変化と関係 / D データの活用
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 注: g4 用の generator は未登録のため、テストは全て固定 questions[]（全問 explanation 必須）。
//     svg name は clock / number-blocks のみのため、g4 の図は emoji / none で代替。
// 表記: 全表示テキストは漢字＋ルビ {漢字|よみ}（/tmp/ruby-convention.md 準拠・全漢字ルビ）。
//       id/構造/ロジック/依存グラフ/数値解答/formalName は不変。
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
    name: "{数|かず}と{計算|けいさん}",
    formalName: "数と計算",
  },
  {
    id: "sansuu.geometry",
    subjectId: "sansuu",
    name: "{図形|ずけい}",
    formalName: "図形",
  },
  {
    id: "sansuu.change-relation",
    subjectId: "sansuu",
    name: "{変化|へんか}と{関係|かんけい}",
    formalName: "変化と関係",
  },
  {
    id: "sansuu.data",
    subjectId: "sansuu",
    name: "データの{活用|かつよう}",
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
    title: "{大|おお}きな{数|かず}（{億|おく}・{兆|ちょう}）",
    order: 1,
    realWorldUse: "にっぽんの{人口|じんこう}や、おかねの「{億|おく}」「{兆|ちょう}」など、とても{大|おお}きい{数|かず}を{読|よ}むときに{使|つか}うよ。",
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
    title: "{割|わ}り{算|ざん}の{筆算|ひっさん}",
    order: 2,
    realWorldUse: "おかしを {何人|なんにん}かで おなじ{数|かず}ずつ {分|わ}けるときに、ひとり{分|ぶん}の{数|かず}を もとめるのに{使|つか}うよ。",
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
    title: "{概数|がいすう}（{四捨五入|ししゃごにゅう}）",
    order: 3,
    realWorldUse: "「だいたい {何人|なんにん}」「やく いくら」のように、おおよその{数|かず}で{伝|つた}えたり、ねだんを {見|み}つもるときに{使|つか}うよ。",
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
    title: "{計算|けいさん}のきまり（{式|しき}と{順序|じゅんじょ}）",
    order: 4,
    realWorldUse: "かいものの {合計|ごうけい}を ひとつの{式|しき}で {書|か}いたり、（ ）や ×÷さきに のルールで ただしく{計算|けいさん}するときに{使|つか}うよ。",
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
    title: "{小数|しょうすう}（しくみと{足|た}し{引|ひ}き）",
    order: 5,
    realWorldUse: "ジュースの「1.5L」や、せの たかさ「1.3m」のように、はんぱな{数|かず}を あらわすときに{使|つか}うよ。",
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
    title: "{分数|ぶんすう}（{仮分数|かぶんすう}・{帯分数|たいぶんすう}）",
    order: 6,
    realWorldUse: "ピザを {何|なん}こかに {分|わ}けた「3{分|ぶん}の2」のように、{全体|ぜんたい}の{中|なか}の いくつ{分|ぶん}かを あらわすときに{使|つか}うよ。",
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
    title: "{角|かく}の{大|おお}きさ（{分度器|ぶんどき}）",
    order: 7,
    realWorldUse: "とけいのはりの ひらきぐあいや、すべりだいの かたむきなど、かどの {大|おお}きさを はかるときに{使|つか}うよ。",
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
    title: "{垂直|すいちょく}・{平行|へいこう}と{四角形|しかくけい}",
    order: 8,
    realWorldUse: "ノートの{線|せん}や まどわくのように、まっすぐ ましかくに くんだ かたちを {見|み}わけるときに{使|つか}うよ。",
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
    title: "{面積|めんせき}（{長方形|ちょうほうけい}・{正方形|せいほうけい}）",
    order: 9,
    realWorldUse: "へやの ひろさや、はたけの {大|おお}きさを「{何|なん}{平方|へいほう}メートル」で あらわすときに{使|つか}うよ。",
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
    title: "{直方体|ちょくほうたい}と{立方体|りっぽうたい}",
    order: 10,
    realWorldUse: "おかしのはこや サイコロのかたちの、{面|めん}・{辺|へん}・{頂点|ちょうてん}の{数|かず}を しらべるときに{使|つか}うよ。",
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
    title: "ともなってかわる2つの{量|りょう}",
    order: 11,
    realWorldUse: "「{段|だん}の{数|かず}が ふえると まわりの{長|なが}さも ふえる」のように、ふたつの{数|かず}が いっしょに かわるようすを しらべるときに{使|つか}うよ。",
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
    title: "{折|お}れ{線|せん}グラフ",
    order: 12,
    realWorldUse: "{気温|きおん}が 1{日|にち}で どうかわったかなど、じかんとともに かわるようすを グラフで{読|よ}むときに{使|つか}うよ。",
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
    title: "せいりの{表|ひょう}（{二次元|にじげん}の{表|ひょう}）",
    order: 13,
    realWorldUse: "「すきなくだもの」と「{男女|だんじょ}」を いちどに しらべた けっかを、{表|ひょう}に まとめて{読|よ}むときに{使|つか}うよ。",
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
    prompt: "10000 を 1000こ あつめた {数|かず}は？",
    explanation: "10000（{一万|いちまん}）が 1000こ で 10000000…ではなく、{一万|いちまん}の1000ばいは「{千万|せんまん}（10000000）」だよ。{一万|いちまん}のかたまりが ふえていくよ。",
    format: "choice",
    choices: ["{千万|せんまん}", "{百万|ひゃくまん}", "{一億|いちおく}", "{十万|じゅうまん}"],
    answer: "{千万|せんまん}",
  },
  {
    id: `${U.largeNumbers}.q-2`,
    unitId: U.largeNumbers,
    prompt: "1000{万|まん}を 10こ あつめた {数|かず}は？",
    explanation: "1000{万|まん}が 10こ で「1{億|おく}」だよ。{万|まん}のうえに {億|おく}のくらいが あるよ。",
    format: "choice",
    choices: ["1{億|おく}", "1{兆|ちょう}", "1000{万|まん}", "1{億|おく}{万|まん}"],
    answer: "1{億|おく}",
  },
  {
    id: `${U.largeNumbers}.q-3`,
    unitId: U.largeNumbers,
    prompt: "「38000000」は なんと{読|よ}む？",
    explanation: "みぎから 4けたずつ くぎると 3800|0000。{万|まん}のくらいまでで「{三千八百万|さんぜんはっぴゃくまん}」だよ。",
    format: "choice",
    choices: ["{三千八百万|さんぜんはっぴゃくまん}", "{三百八十万|さんびゃくはちじゅうまん}", "{三億八千万|さんおくはっせんまん}", "{三千八万|さんぜんはちまん}"],
    answer: "{三千八百万|さんぜんはっぴゃくまん}",
  },
  {
    id: `${U.largeNumbers}.q-4`,
    unitId: U.largeNumbers,
    prompt: "1{億|おく}を 10こ あつめた {数|かず}は？",
    explanation: "1{億|おく}が 10こ で「10{億|おく}」だよ。{億|おく}のくらいも {一|いち}・{十|じゅう}・{百|ひゃく}・{千|せん}と ふえていくよ。",
    format: "choice",
    choices: ["10{億|おく}", "1{兆|ちょう}", "100{億|おく}", "1{億|おく}10"],
    answer: "10{億|おく}",
  },
  {
    id: `${U.largeNumbers}.q-5`,
    unitId: U.largeNumbers,
    prompt: "1000{億|おく}を 10こ あつめた {数|かず}は？",
    explanation: "1000{億|おく}の つぎのくらいが「1{兆|ちょう}」だよ。{万|まん}→{億|おく}→{兆|ちょう} と よっつごとに あたらしいなまえに なるよ。",
    format: "choice",
    choices: ["1{兆|ちょう}", "1{億|おく}", "1{京|けい}", "1{万|まん}{億|おく}"],
    answer: "1{兆|ちょう}",
  },
  {
    id: `${U.largeNumbers}.q-6`,
    unitId: U.largeNumbers,
    prompt: "「520000」を 10ばい した {数|かず}は？",
    explanation: "10ばいすると くらいが ひとつ あがって 0 が1こ ふえるよ。520000 → 5200000（{五百二十万|ごひゃくにじゅうまん}）だよ。",
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
    prompt: "2738 を {百|ひゃく}のくらいで {四捨五入|ししゃごにゅう}すると？",
    explanation: "{百|ひゃく}のくらいまでにするので、{十|じゅう}のくらいの 3 を{見|み}るよ。3 は 5 より{小|ちい}さいので きりすて → 2700 だよ。",
    format: "number-input",
    answer: 2700,
  },
  {
    id: `${U.rounding}.q-2`,
    unitId: U.rounding,
    prompt: "4651 を {百|ひゃく}のくらいで {四捨五入|ししゃごにゅう}すると？",
    explanation: "{十|じゅう}のくらいの 5 を{見|み}るよ。5 いじょうなので くりあげ → 4700 だよ。",
    format: "number-input",
    answer: 4700,
  },
  {
    id: `${U.rounding}.q-3`,
    unitId: U.rounding,
    prompt: "836 を {十|じゅう}のくらいで {四捨五入|ししゃごにゅう}すると？",
    explanation: "{一|いち}のくらいの 6 を{見|み}るよ。5 いじょうなので くりあげ → 840 だよ。",
    format: "number-input",
    answer: 840,
  },
  {
    id: `${U.rounding}.q-4`,
    unitId: U.rounding,
    prompt: "1420 を {百|ひゃく}のくらいで {四捨五入|ししゃごにゅう}すると？",
    explanation: "{十|じゅう}のくらいの 2 を{見|み}るよ。5 より{小|ちい}さいので きりすて → 1400 だよ。",
    format: "number-input",
    answer: 1400,
  },
  {
    id: `${U.rounding}.q-5`,
    unitId: U.rounding,
    prompt: "287 を {上|うえ}から1けたの {概数|がいすう}にすると？",
    explanation: "{上|うえ}から1けた（{百|ひゃく}のくらい）にするので、つぎの{十|じゅう}のくらい 8 を{見|み}るよ。5いじょうなので 300 だよ。",
    format: "number-input",
    answer: 300,
  },
  {
    id: `${U.rounding}.q-6`,
    unitId: U.rounding,
    prompt: "198 × 3 を、198 を 200 とみて {見|み}つもると およそ いくつ？",
    explanation: "198 を 200 とみると 200 × 3 ＝ 600。だいたいの {合計|ごうけい}が すぐ わかるよ。",
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
    explanation: "×÷ を さきに {計算|けいさん}するよ。3 × 4 ＝ 12、つぎに 2 ＋ 12 ＝ 14 だよ。",
    format: "number-input",
    answer: 14,
  },
  {
    id: `${U.operationOrder}.q-2`,
    unitId: U.operationOrder,
    prompt: "(2 ＋ 3) × 4 ＝ ？",
    explanation: "（ ）の なかを さきに {計算|けいさん}するよ。2 ＋ 3 ＝ 5、つぎに 5 × 4 ＝ 20 だよ。",
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
    explanation: "6 が きょうつうなので 6 × (8 ＋ 2) ＝ 6 × 10 ＝ 60。べつべつに {計算|けいさん}しても 48 ＋ 12 ＝ 60 だよ。",
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
    explanation: "くらいを そろえて {計算|けいさん}。1.2 ＋ 0.5 ＝ 1.7 だよ。",
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
    explanation: "くらいを そろえて {計算|けいさん}。2.5 − 1.3 ＝ 1.2 だよ。",
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
    explanation: "{分母|ぶんぼ}（{下|した}）が おなじなので、{分子|ぶんし}（{上|うえ}）だけ たすよ。2 ＋ 1 ＝ 3 で 3/5 だよ。",
    format: "choice",
    choices: ["3/5", "3/10", "2/10", "1/5"],
    answer: "3/5",
  },
  {
    id: `${U.fractions}.q-2`,
    unitId: U.fractions,
    prompt: "4/7 − 2/7 ＝ ？",
    explanation: "{分母|ぶんぼ}が おなじなので {分子|ぶんし}だけ ひくよ。4 − 2 ＝ 2 で 2/7 だよ。",
    format: "choice",
    choices: ["2/7", "2/0", "6/7", "2/14"],
    answer: "2/7",
  },
  {
    id: `${U.fractions}.q-3`,
    unitId: U.fractions,
    prompt: "1 を {分数|ぶんすう}で あらわすと？（{分母|ぶんぼ} 3 のとき）",
    explanation: "{分母|ぶんぼ}と {分子|ぶんし}が おなじ{分数|ぶんすう}は 1 と おなじ。だから 3/3 だよ。",
    format: "choice",
    choices: ["3/3", "1/3", "3/1", "0/3"],
    answer: "3/3",
  },
  {
    id: `${U.fractions}.q-4`,
    unitId: U.fractions,
    prompt: "7/3 を {帯分数|たいぶんすう}に なおすと？",
    explanation: "7 ÷ 3 ＝ 2 あまり 1。{整数|せいすう}ぶが 2、のこり 1/3 で 2と1/3 だよ。",
    format: "choice",
    choices: ["2と1/3", "1と1/3", "3と1/2", "2と2/3"],
    answer: "2と1/3",
  },
  {
    id: `${U.fractions}.q-5`,
    unitId: U.fractions,
    prompt: "3/4 と 2/4 では どちらが {大|おお}きい？",
    explanation: "{分母|ぶんぼ}が おなじなら、{分子|ぶんし}が {大|おお}きいほうが {大|おお}きいよ。3 > 2 なので 3/4 だよ。",
    format: "choice",
    choices: ["3/4", "2/4", "おなじ", "くらべられない"],
    answer: "3/4",
  },
  {
    id: `${U.fractions}.q-6`,
    unitId: U.fractions,
    prompt: "5/6 ＋ 1/6 ＝ ？",
    explanation: "5 ＋ 1 ＝ 6 で 6/6。{分母|ぶんぼ}と {分子|ぶんし}が おなじなので 1 だよ。",
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
    prompt: "{直角|ちょっかく}は なん{度|ど}？",
    explanation: "{直角|ちょっかく}は きっちり 90{度|ど}だよ。{分度器|ぶんどき}の まんなかの めもりだよ。",
    format: "choice",
    choices: ["90{度|ど}", "45{度|ど}", "180{度|ど}", "60{度|ど}"],
    answer: "90{度|ど}",
  },
  {
    id: `${U.angles}.q-2`,
    unitId: U.angles,
    prompt: "まっすぐな {一直線|いっちょくせん}（{半回転|はんかいてん}）の {角|かく}は なん{度|ど}？",
    explanation: "{直角|ちょっかく} 2つぶんで まっすぐ。90 × 2 ＝ 180{度|ど}だよ。",
    format: "choice",
    choices: ["180{度|ど}", "90{度|ど}", "360{度|ど}", "120{度|ど}"],
    answer: "180{度|ど}",
  },
  {
    id: `${U.angles}.q-3`,
    unitId: U.angles,
    prompt: "90{度|ど}より {小|ちい}さい{角|かく}を なんという？",
    explanation: "{直角|ちょっかく}より {小|ちい}さい とがった{角|かく}を「{鋭角|えいかく}」というよ。",
    format: "choice",
    choices: ["{鋭角|えいかく}", "{鈍角|どんかく}", "{直角|ちょっかく}", "{平角|へいかく}"],
    answer: "{鋭角|えいかく}",
  },
  {
    id: `${U.angles}.q-4`,
    unitId: U.angles,
    prompt: "90{度|ど}より {大|おお}きく 180{度|ど}より {小|ちい}さい{角|かく}を なんという？",
    explanation: "{直角|ちょっかく}より ひらいた{角|かく}を「{鈍角|どんかく}」というよ。",
    format: "choice",
    choices: ["{鈍角|どんかく}", "{鋭角|えいかく}", "{直角|ちょっかく}", "{全角|ぜんかく}"],
    answer: "{鈍角|どんかく}",
  },
  {
    id: `${U.angles}.q-5`,
    unitId: U.angles,
    prompt: "ひとまわり（1{回転|かいてん}）の {角|かく}は なん{度|ど}？",
    explanation: "{直角|ちょっかく} 4つぶんで ひとまわり。90 × 4 ＝ 360{度|ど}だよ。",
    format: "choice",
    choices: ["360{度|ど}", "180{度|ど}", "270{度|ど}", "400{度|ど}"],
    answer: "360{度|ど}",
  },
  {
    id: `${U.angles}.q-6`,
    unitId: U.angles,
    prompt: "120{度|ど} ＋ 30{度|ど} ＝ ？",
    explanation: "{角|かく}の{大|おお}きさも {足|た}し{算|ざん}できるよ。120 ＋ 30 ＝ 150{度|ど}だよ。",
    format: "choice",
    choices: ["150{度|ど}", "90{度|ど}", "160{度|ど}", "100{度|ど}"],
    answer: "150{度|ど}",
  },
];

// ── B2 垂直・平行と四角形 ──
const perpParallelQuestions: ChoiceQuestion[] = [
  {
    id: `${U.perpParallel}.q-1`,
    unitId: U.perpParallel,
    prompt: "2{本|ほん}の{直線|ちょくせん}が {直角|ちょっかく}に まじわっていることを なんという？",
    explanation: "90{度|ど}で まじわっているとき、その2{本|ほん}は「{垂直|すいちょく}」だよ。",
    format: "choice",
    choices: ["{垂直|すいちょく}", "{平行|へいこう}", "{対角|たいかく}", "{水平|すいへい}"],
    answer: "{垂直|すいちょく}",
  },
  {
    id: `${U.perpParallel}.q-2`,
    unitId: U.perpParallel,
    prompt: "どこまでいっても まじわらない 2{本|ほん}の{直線|ちょくせん}を なんという？",
    explanation: "はばが ずっとおなじで まじわらない 2{本|ほん}は「{平行|へいこう}」だよ。",
    format: "choice",
    choices: ["{平行|へいこう}", "{垂直|すいちょく}", "{直角|ちょっかく}", "{交差|こうさ}"],
    answer: "{平行|へいこう}",
  },
  {
    id: `${U.perpParallel}.q-3`,
    unitId: U.perpParallel,
    prompt: "むかいあう 2くみの へんが それぞれ{平行|へいこう}な {四角形|しかくけい}を なんという？",
    explanation: "2くみとも {平行|へいこう}なら「{平行四辺形|へいこうしへんけい}」だよ。",
    format: "choice",
    choices: ["{平行四辺形|へいこうしへんけい}", "{台形|だいけい}", "ひし{形|がた}だけ", "{三角形|さんかくけい}"],
    answer: "{平行四辺形|へいこうしへんけい}",
  },
  {
    id: `${U.perpParallel}.q-4`,
    unitId: U.perpParallel,
    prompt: "1くみの へんだけが {平行|へいこう}な {四角形|しかくけい}を なんという？",
    explanation: "むかいあう 1くみだけ {平行|へいこう}なのが「{台形|だいけい}」だよ。",
    format: "choice",
    choices: ["{台形|だいけい}", "{平行四辺形|へいこうしへんけい}", "{正方形|せいほうけい}", "ひし{形|がた}"],
    answer: "{台形|だいけい}",
  },
  {
    id: `${U.perpParallel}.q-5`,
    unitId: U.perpParallel,
    prompt: "4つの へんの ながさが ぜんぶ おなじ {四角形|しかくけい}を なんという？",
    explanation: "へんが ぜんぶ おなじながさなのが「ひし{形|がた}」だよ。",
    format: "choice",
    choices: ["ひし{形|がた}", "{台形|だいけい}", "{長方形|ちょうほうけい}", "{平行四辺形|へいこうしへんけい}"],
    answer: "ひし{形|がた}",
  },
  {
    id: `${U.perpParallel}.q-6`,
    unitId: U.perpParallel,
    prompt: "{長方形|ちょうほうけい}の となりあう へんは どんな かんけい？",
    explanation: "{長方形|ちょうほうけい}の かどは ぜんぶ {直角|ちょっかく}。となりあう へんは「{垂直|すいちょく}」だよ。",
    format: "choice",
    choices: ["{垂直|すいちょく}", "{平行|へいこう}", "ななめ", "おなじながさ"],
    answer: "{垂直|すいちょく}",
  },
];

// ── B3 面積（長方形・正方形）──
const areaQuestions: NumberInputQuestion[] = [
  {
    id: `${U.area}.q-1`,
    unitId: U.area,
    prompt: "たて 3cm、よこ 5cm の {長方形|ちょうほうけい}の {面積|めんせき}は？（cm²）",
    explanation: "{長方形|ちょうほうけい}の{面積|めんせき} ＝ たて × よこ。3 × 5 ＝ 15 で 15cm² だよ。",
    format: "number-input",
    answer: 15,
  },
  {
    id: `${U.area}.q-2`,
    unitId: U.area,
    prompt: "1ぺん 4cm の {正方形|せいほうけい}の {面積|めんせき}は？（cm²）",
    explanation: "{正方形|せいほうけい}は たてもよこも おなじ。4 × 4 ＝ 16 で 16cm² だよ。",
    format: "number-input",
    answer: 16,
  },
  {
    id: `${U.area}.q-3`,
    unitId: U.area,
    prompt: "たて 6cm、よこ 7cm の {長方形|ちょうほうけい}の {面積|めんせき}は？（cm²）",
    explanation: "6 × 7 ＝ 42 で 42cm² だよ。",
    format: "number-input",
    answer: 42,
  },
  {
    id: `${U.area}.q-4`,
    unitId: U.area,
    prompt: "1ぺん 10cm の {正方形|せいほうけい}の {面積|めんせき}は？（cm²）",
    explanation: "10 × 10 ＝ 100 で 100cm² だよ。",
    format: "number-input",
    answer: 100,
  },
  {
    id: `${U.area}.q-5`,
    unitId: U.area,
    prompt: "たて 2m、よこ 8m の {長方形|ちょうほうけい}の {面積|めんせき}は？（m²）",
    explanation: "2 × 8 ＝ 16 で 16m² だよ。たんいが m のときは m² になるよ。",
    format: "number-input",
    answer: 16,
  },
  {
    id: `${U.area}.q-6`,
    unitId: U.area,
    prompt: "{面積|めんせき} 20cm²、たて 4cm の {長方形|ちょうほうけい}の よこは なんcm？",
    explanation: "よこ ＝ {面積|めんせき} ÷ たて。20 ÷ 4 ＝ 5 で 5cm だよ。",
    format: "number-input",
    answer: 5,
  },
];

// ── B4 直方体と立方体 ──
const solidQuestions: ChoiceQuestion[] = [
  {
    id: `${U.solids}.q-1`,
    unitId: U.solids,
    prompt: "{立方体|りっぽうたい}の {面|めん}は いくつ ある？",
    explanation: "サイコロのかたち。{面|めん}は ぜんぶで 6つ あるよ。",
    format: "choice",
    choices: ["6つ", "4つ", "8つ", "12こ"],
    answer: "6つ",
  },
  {
    id: `${U.solids}.q-2`,
    unitId: U.solids,
    prompt: "{直方体|ちょくほうたい}の へん（たて・よこ・たかさの ぼう）は いくつ ある？",
    explanation: "{直方体|ちょくほうたい}の へんは ぜんぶで 12こ。{立方体|りっぽうたい}も おなじ 12こ だよ。",
    format: "choice",
    choices: ["12こ", "6つ", "8つ", "4つ"],
    answer: "12こ",
  },
  {
    id: `${U.solids}.q-3`,
    unitId: U.solids,
    prompt: "{直方体|ちょくほうたい}の {頂点|ちょうてん}（かど）は いくつ ある？",
    explanation: "かどの てんは ぜんぶで 8つ あるよ。{立方体|りっぽうたい}も おなじ 8つ だよ。",
    format: "choice",
    choices: ["8つ", "6つ", "12こ", "4つ"],
    answer: "8つ",
  },
  {
    id: `${U.solids}.q-4`,
    unitId: U.solids,
    prompt: "{面|めん}が ぜんぶ {正方形|せいほうけい}の {立体|りったい}を なんという？",
    explanation: "6つの{面|めん}が ぜんぶ おなじ{正方形|せいほうけい}なのが「{立方体|りっぽうたい}」だよ。",
    format: "choice",
    choices: ["{立方体|りっぽうたい}", "{直方体|ちょくほうたい}", "{三角柱|さんかくちゅう}", "{円柱|えんちゅう}"],
    answer: "{立方体|りっぽうたい}",
  },
  {
    id: `${U.solids}.q-5`,
    unitId: U.solids,
    prompt: "{立体|りったい}を ひらいて {平|たい}らにした ずを なんという？",
    explanation: "はこを きりひらいて {平|たい}らにした ずを「{展開図|てんかいず}」というよ。",
    format: "choice",
    choices: ["{展開図|てんかいず}", "{見取図|みとりず}", "{設計図|せっけいず}", "{平面図|へいめんず}"],
    answer: "{展開図|てんかいず}",
  },
];

// ── C1 ともなってかわる2つのりょう ──
const changingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.changing}.q-1`,
    unitId: U.changing,
    prompt: "1こ 50{円|えん}の あめ。3こ かうと {代金|だいきん}は？",
    explanation: "こすうが ふえると {代金|だいきん}も ふえるよ。50 × 3 ＝ 150{円|えん}だよ。",
    format: "choice",
    choices: ["150{円|えん}", "100{円|えん}", "53{円|えん}", "53こ"],
    answer: "150{円|えん}",
  },
  {
    id: `${U.changing}.q-2`,
    unitId: U.changing,
    prompt: "{正方形|せいほうけい}の 1ぺんが 1cm ふえると、まわりのながさは なんcm ふえる？",
    explanation: "へんは 4つ あるので、1ぺん 1cm ふえると まわりは 4cm ふえるよ。",
    format: "choice",
    choices: ["4cm", "1cm", "2cm", "8cm"],
    answer: "4cm",
  },
  {
    id: `${U.changing}.q-3`,
    unitId: U.changing,
    prompt: "「{段|だん}の{数|かず}」が ふえると「まわりのながさ」も ふえる。この 2つの かんけいを しらべるには？",
    explanation: "2つの {量|りょう}を {表|ひょう}に ならべて、どうかわるかを {見|み}つけるよ。",
    format: "choice",
    choices: ["{表|ひょう}に ならべてしらべる", "1つだけ{見|み}る", "{計算|けいさん}しない", "じゃんけんする"],
    answer: "{表|ひょう}に ならべてしらべる",
  },
  {
    id: `${U.changing}.q-4`,
    unitId: U.changing,
    prompt: "{水|みず}を 1ぷんに 2Lずつ ためる。5ふんでは なんL？",
    explanation: "じかんが ふえると {水|みず}も ふえるよ。2 × 5 ＝ 10L だよ。",
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
    prompt: "じかんとともに かわる {気温|きおん}を あらわすのに よいグラフは？",
    explanation: "つづけて かわるようすは、てんを せんで むすぶ「{折|お}れ{線|せん}グラフ」がよいよ。",
    format: "choice",
    choices: ["{折|お}れ{線|せん}グラフ", "ぼうグラフ", "{円|えん}グラフ", "ひょう"],
    answer: "{折|お}れ{線|せん}グラフ",
  },
  {
    id: `${U.lineGraph}.q-2`,
    unitId: U.lineGraph,
    prompt: "{折|お}れ{線|せん}が {右|みぎ}{上|あ}がりの とき、その {量|りょう}は どうなっている？",
    explanation: "せんが {上|うえ}に あがっていくと、その {量|りょう}は「ふえている」よ。",
    format: "choice",
    choices: ["ふえている", "へっている", "かわらない", "0になった"],
    answer: "ふえている",
  },
  {
    id: `${U.lineGraph}.q-3`,
    unitId: U.lineGraph,
    prompt: "{折|お}れ{線|せん}が {右|みぎ}{下|さ}がりの とき、その {量|りょう}は どうなっている？",
    explanation: "せんが {下|した}に さがると、その {量|りょう}は「へっている」よ。",
    format: "choice",
    choices: ["へっている", "ふえている", "かわらない", "ばいになった"],
    answer: "へっている",
  },
  {
    id: `${U.lineGraph}.q-4`,
    unitId: U.lineGraph,
    prompt: "せんの かたむきが いちばん {急|きゅう}なところは どんなとき？",
    explanation: "かたむきが {急|きゅう}なほど、みじかいじかんで {大|おお}きくかわった ところだよ。",
    format: "choice",
    choices: ["かわりかたが いちばん{大|おお}きい", "かわっていない", "0のところ", "おわりのところ"],
    answer: "かわりかたが いちばん{大|おお}きい",
  },
  {
    id: `${U.lineGraph}.q-5`,
    unitId: U.lineGraph,
    prompt: "{折|お}れ{線|せん}グラフの よこのじく（→）には ふつう なにを とる？",
    explanation: "よこのじくには じかんなど「かわっていくもと」を、たてのじくに {量|りょう}を とるよ。",
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
    prompt: "「すきなくだもの」と「{男女|だんじょ}」のように、2つのことを いちどに しらべた けっかを まとめるのに よいのは？",
    explanation: "2つの ことがらを たてとよこで くみあわせる「{二次元|にじげん}の{表|ひょう}」がよいよ。",
    format: "choice",
    choices: ["{二次元|にじげん}の{表|ひょう}", "{折|お}れ{線|せん}グラフ", "{数|かず}だけかく", "え"],
    answer: "{二次元|にじげん}の{表|ひょう}",
  },
  {
    id: `${U.twoWayTable}.q-2`,
    unitId: U.twoWayTable,
    prompt: "{表|ひょう}の たてと よこが まじわる ますには なにを かく？",
    explanation: "たての なかま と よこの なかまの {両方|りょうほう}に あてはまる「{人数|にんずう}（かず）」を かくよ。",
    format: "choice",
    choices: ["あてはまる かず", "なまえ", "ひづけ", "いろ"],
    answer: "あてはまる かず",
  },
  {
    id: `${U.twoWayTable}.q-3`,
    unitId: U.twoWayTable,
    prompt: "{表|ひょう}の 「ごうけい」のらんは なにを あらわす？",
    explanation: "たて・よこ それぞれの {数|かず}を ぜんぶ たした「{合計|ごうけい}」だよ。けんざんに つかえるよ。",
    format: "choice",
    choices: ["ぜんぶ たした かず", "いちばん{大|おお}きいかず", "へいきん", "0のかず"],
    answer: "ぜんぶ たした かず",
  },
  {
    id: `${U.twoWayTable}.q-4`,
    unitId: U.twoWayTable,
    prompt: "{男子|だんし} 8{人|にん}、{女子|じょし} 7{人|にん} の クラス。ぜんいんは なん{人|にん}？",
    explanation: "{男女|だんじょ}の ごうけいが ぜんいん。8 ＋ 7 ＝ 15{人|にん}だよ。",
    format: "choice",
    choices: ["15{人|にん}", "1{人|にん}", "87{人|にん}", "14{人|にん}"],
    answer: "15{人|にん}",
  },
  {
    id: `${U.twoWayTable}.q-5`,
    unitId: U.twoWayTable,
    prompt: "{表|ひょう}を つかうと どんな よいことが ある？",
    explanation: "どの くみあわせが おおいか・すくないかが、ひとめで わかるようになるよ。",
    format: "choice",
    choices: ["くみあわせが ひとめでわかる", "{見|み}にくくなる", "かずがきえる", "いろがつく"],
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
          heading: "{万|まん}のつぎは？",
          body: "{一|いち}・{十|じゅう}・{百|ひゃく}・{千|せん}・{万|まん} とすすむと、つぎは「{十万|じゅうまん}・{百万|ひゃくまん}・{千万|せんまん}」。そのつぎが「{億|おく}」、もっと{大|おお}きいのが「{兆|ちょう}」だよ。",
          visual: { kind: "emoji", value: "1▶10▶100▶1000▶{万|まん}▶{億|おく}▶{兆|ちょう}", caption: "くらいが あがっていく" },
        },
        {
          heading: "4けたずつ くぎろう",
          body: "{大|おお}きな{数|かず}は みぎから 4けたずつ くぎると よみやすいよ。38|0000 なら「38{万|まん}」だね。",
          visual: { kind: "emoji", value: "3800|0000", caption: "{三千八百万|さんぜんはっぴゃくまん}" },
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
          heading: "{割|わ}り{算|ざん}の {筆算|ひっさん}",
          body: "{大|おお}きいくらいから じゅんに「たてる→かける→ひく→おろす」を くりかえすよ。84 ÷ 4 なら まず 8 ÷ 4 ＝ 2 だね。",
          visual: { kind: "emoji", value: "84 ÷ 4 ＝ 21", caption: "たて・かけ・ひき・おろし" },
        },
        {
          heading: "あまりに きをつけて",
          body: "わりきれないと「あまり」が でるよ。あまりは わるかずより かならず {小|ちい}さくなるよ。",
          visual: { kind: "none" },
        },
        {
          heading: "たしかめよう",
          body: "「{商|しょう} × わるかず ＋ あまり ＝ わられるかず」になれば せいかい。21 × 4 ＝ 84 だね。",
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
          heading: "{概数|がいすう}って なに？",
          body: "「だいたい いくつ」と あらわす{数|かず}が {概数|がいすう}だよ。こまかい{数|かず}を まるめて つかいやすくするよ。",
          visual: { kind: "emoji", value: "2738 ≈ 2700", caption: "だいたい 2700" },
        },
        {
          heading: "{四捨五入|ししゃごにゅう}",
          body: "まるめる くらいの すぐ{下|した}を{見|み}て、0〜4 なら きりすて、5〜9 なら くりあげ するよ。",
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
          heading: "{計算|けいさん}の {順序|じゅんじょ}",
          body: "ふつうは まえから。でも ×÷ は ＋− より さきに {計算|けいさん}するよ。2 ＋ 3 × 4 は 12 を さきに たすよ。",
          visual: { kind: "emoji", value: "× ÷ ▶さき / ＋ − ▶あと", caption: "かけわり さきに" },
        },
        {
          heading: "（ ）は いちばんさき",
          body: "（ ）が あるときは、その なかを いちばんさきに {計算|けいさん}するよ。",
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
          heading: "{小数|しょうすう}の しくみ",
          body: "1 を 10こに わけた 1つぶんが 0.1 だよ。0.1 が 10こ あつまると 1 にもどるよ。",
          visual: { kind: "emoji", value: "0.1 × 10 ＝ 1", caption: "0.1 が 10こで 1" },
        },
        {
          heading: "くらいを そろえて",
          body: "{小数|しょうすう}の {足|た}し{算|ざん}{引|ひ}き{算|ざん}は、{小数点|しょうすうてん}（てん）を たてに そろえて {計算|けいさん}するよ。",
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
          heading: "{分数|ぶんすう}の なまえ",
          body: "{下|した} が {分母|ぶんぼ}、{上|うえ} が {分子|ぶんし}。{分子|ぶんし}が {分母|ぶんぼ}より {大|おお}きい{分数|ぶんすう}を「{仮分数|かぶんすう}」、{整数|せいすう}と{分数|ぶんすう}を ならべたのが「{帯分数|たいぶんすう}」だよ。",
          visual: { kind: "emoji", value: "7/3 ＝ 2と1/3", caption: "{仮分数|かぶんすう}⇄{帯分数|たいぶんすう}" },
        },
        {
          heading: "おなじ{分母|ぶんぼ}で {足|た}し{引|ひ}き",
          body: "{分母|ぶんぼ}が おなじなら、{分子|ぶんし} だけ たしたり ひいたり するよ。2/5 ＋ 1/5 ＝ 3/5 だね。",
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
          heading: "{角|かく}の {大|おお}きさ",
          body: "2{本|ほん}の へんの ひらきぐあいが {角|かく}の {大|おお}きさ。たんいは「{度|ど}（ど・°）」だよ。{直角|ちょっかく}は 90{度|ど}だね。",
          visual: { kind: "emoji", value: "📐", caption: "{直角|ちょっかく} ＝ 90{度|ど}" },
        },
        {
          heading: "{分度器|ぶんどき}で はかろう",
          body: "{分度器|ぶんどき}の まんなかを かどに あわせ、0{度|ど}の せんから よむよ。90{度|ど}より{小|ちい}さいと{鋭角|えいかく}、{大|おお}きいと{鈍角|どんかく}だよ。",
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
          heading: "{垂直|すいちょく}と {平行|へいこう}",
          body: "{直角|ちょっかく}に まじわる 2{本|ほん}は「{垂直|すいちょく}」、どこまでも まじわらない 2{本|ほん}は「{平行|へいこう}」だよ。",
          visual: { kind: "emoji", value: "┃━ {垂直|すいちょく} / ＝ {平行|へいこう}", caption: "まじわり{方|かた}でちがう" },
        },
        {
          heading: "いろいろな {四角形|しかくけい}",
          body: "{平行|へいこう}が 1くみなら {台形|だいけい}、2くみなら {平行四辺形|へいこうしへんけい}。へんが ぜんぶおなじなら ひし{形|がた}だよ。",
          visual: { kind: "emoji", value: "▱ {平行四辺形|へいこうしへんけい} / ◇ ひし{形|がた}", caption: "{平行|へいこう}のしかたで なまえがかわる" },
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
          heading: "{面積|めんせき}って なに？",
          body: "ひろさのことだよ。1ぺん 1cm の {正方形|せいほうけい}（1cm²）が なんこ ならぶかで あらわすよ。",
          visual: { kind: "emoji", value: "🟦", caption: "1cm² の ます" },
        },
        {
          heading: "{長方形|ちょうほうけい}の {面積|めんせき}",
          body: "{長方形|ちょうほうけい}の {面積|めんせき} ＝ たて × よこ。{正方形|せいほうけい}は 1ぺん × 1ぺん だよ。",
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
          body: "{直方体|ちょくほうたい}・{立方体|りっぽうたい}には「{面|めん}・{辺|へん}・{頂点|ちょうてん}」が あるよ。{面|めん}は 6つ、{辺|へん}は 12こ、{頂点|ちょうてん}は 8つ だよ。",
          visual: { kind: "emoji", value: "📦🎲", caption: "{面|めん}6・{辺|へん}12・{頂点|ちょうてん}8" },
        },
        {
          heading: "{展開図|てんかいず}",
          body: "はこを きりひらいて {平|たい}らにした ずが「{展開図|てんかいず}」。くみたてると もとの はこに もどるよ。",
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
          heading: "いっしょに かわる {数|かず}",
          body: "「こすう」が ふえると「{代金|だいきん}」も ふえる。このように いっしょに かわる 2つの {数|かず}が あるよ。",
          visual: { kind: "emoji", value: "🍬×3 ▶ 150{円|えん}", caption: "こすうと {代金|だいきん}" },
        },
        {
          heading: "{表|ひょう}で しらべよう",
          body: "2つの {数|かず}を {表|ひょう}に ならべると、どんなふうに かわるか きまりが {見|み}えてくるよ。",
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
          heading: "{折|お}れ{線|せん}グラフ",
          body: "てんを せんで むすんだ グラフだよ。じかんとともに かわるようす（{気温|きおん}など）を あらわすのに ぴったりだよ。",
          visual: { kind: "emoji", value: "📈", caption: "つながって かわる" },
        },
        {
          heading: "ふえた？へった？",
          body: "せんが {右|みぎ}{上|あ}がりなら ふえている、{右|みぎ}{下|さ}がりなら へっている。かたむきが {急|きゅう}なほど かわり{方|かた}が {大|おお}きいよ。",
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
          body: "「くだもの」と「{男女|だんじょ}」のように、2つのことを いちどに しらべた けっかは「{二次元|にじげん}の{表|ひょう}」に まとめるよ。",
          visual: { kind: "emoji", value: "🗂️", caption: "たて×よこ の {表|ひょう}" },
        },
        {
          heading: "{合計|ごうけい}で たしかめ",
          body: "たて・よこの {数|かず}を たした「{合計|ごうけい}」が あうか たしかめよう。くみあわせの おおい・すくないが ひとめでわかるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.twoWayTable, questions: twoWayTableQuestions, questionCount: 5 },
  },
};
