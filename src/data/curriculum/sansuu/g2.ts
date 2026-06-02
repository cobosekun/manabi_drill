// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小2
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 学習指導要領 小2算数: A数と計算 / B図形 / C測定 / Dデータの活用 を網羅。
//
// 領域は g1 で既出の "sansuu.number-calc" / "sansuu.measurement" を再利用し
// （重複定義しない / アンチ肥大）、g2 で新たに必要な "sansuu.geometry" /
// "sansuu.data" のみここで定義する。集約(index.ts)は中央が行う＝編集しない。
//
// テストは小2向け generator が未登録のため、全単元 固定 questions[]（全問 explanation 付）。
// SVG は事前定義の clock / number-blocks のみ使用（新規 svg は使わず emoji で代替）。
//
// 【レトロフィット(2026-06-02)】全表示テキスト(title / realWorldUse / heading / body /
//   visual caption / prompt / choices / explanation)を漢字＋全漢字ルビ記法 {漢字|よみ} に統一。
//   id/依存グラフ(leadsTo/prerequisites)/order/flags/domainId/generatorId/format/answer(数値)/
//   questionCount/Domain は不変更（構造・ロジック・メタの値は変えない）。
//   clock-read 等の choices/answer はルビ込みで一致を維持。g3 と同じ表記方針に整合。
// ══════════════════════════════════════════

import type { Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 領域（g2 で新規追加分のみ。number-calc / measurement は g1 で定義済み）──

export const sansuuG2Domains: Domain[] = [
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
// 依存グラフ（g1 の単元へさかのぼる前提も張る。前提=prerequisites / 後続=leadsTo）:
//
//   g1.numbers-to-20 ─▶ numbers-to-1000 ─┬▶ add-2digit ─▶ sub-2digit ─▶ multiplication ─▶ simple-fraction
//                                         └▶ sub-2digit
//   triangle-quadrilateral ─▶ box-shape
//   g1.numbers-to-20 ─▶ length ─▶ volume
//   g1.clock-read ─▶ time-duration
//   g1.numbers-to-20 ─▶ table-graph
//
const U = {
  numbersTo1000: "sansuu.g2.numbers-to-1000",
  add2digit: "sansuu.g2.add-2digit",
  sub2digit: "sansuu.g2.sub-2digit",
  multiplication: "sansuu.g2.multiplication",
  simpleFraction: "sansuu.g2.simple-fraction",
  triangleQuad: "sansuu.g2.triangle-quadrilateral",
  boxShape: "sansuu.g2.box-shape",
  length: "sansuu.g2.length",
  volume: "sansuu.g2.volume",
  timeDuration: "sansuu.g2.time-duration",
  tableGraph: "sansuu.g2.table-graph",
} as const;

// 他学年（g1）の参照先 id
const G1 = {
  numbersTo20: "sansuu.g1.numbers-to-20",
  addWithin10: "sansuu.g1.add-within-10",
  subWithin10: "sansuu.g1.sub-within-10",
  clockRead: "sansuu.g1.clock-read",
} as const;

export const sansuuG2Units: Unit[] = [
  {
    id: U.numbersTo1000,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.number-calc",
    title: "1000までの{数|かず}",
    order: 1,
    realWorldUse: "おかしの ねだんや、{本|ほん}の ページ{数|すう}、おかいものの {金額|きんがく}を {読|よ}むときに つかうよ。",
    leadsTo: [U.add2digit, U.sub2digit],
    prerequisites: [G1.numbersTo20],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.add2digit,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.number-calc",
    title: "2けたの {足|た}し{算|ざん}（{筆算|ひっさん}）",
    order: 2,
    realWorldUse: "32{円|えん}の あめと 25{円|えん}の ガムを {買|か}ったら {全部|ぜんぶ}で いくら？ のように、{大|おお}きい{数|かず}を {足|た}すときに つかうよ。",
    leadsTo: [U.sub2digit, U.multiplication],
    prerequisites: [G1.addWithin10, U.numbersTo1000],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sub2digit,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.number-calc",
    title: "2けたの {引|ひ}き{算|ざん}（{筆算|ひっさん}）",
    order: 3,
    realWorldUse: "50{円|えん} {持|も}っていて 28{円|えん}の ジュースを {買|か}ったら おつりは いくら？ のように、{大|おお}きい{数|かず}を {引|ひ}くときに つかうよ。",
    leadsTo: [U.multiplication],
    prerequisites: [G1.subWithin10, U.add2digit],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.multiplication,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.number-calc",
    title: "{掛|か}け{算|ざん}（{九九|くく}）",
    order: 4,
    realWorldUse: "1ふくろ 5こ {入|い}りの あめが 3ふくろ あったら {全部|ぜんぶ}で なんこ？ のように、{同|おな}じ{数|かず}の あつまりを {数|かぞ}えるときに つかうよ。",
    leadsTo: [U.simpleFraction],
    prerequisites: [U.add2digit],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.simpleFraction,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.number-calc",
    title: "かんたんな {分数|ぶんすう}",
    order: 5,
    realWorldUse: "ピザや ケーキを {同|おな}じ {大|おお}きさに {分|わ}けて「{半分|はんぶん}」「4{分|ぶん}の1」を {考|かんが}えるときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.multiplication],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.triangleQuad,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.geometry",
    title: "{三角形|さんかくけい}と {四角形|しかくけい}",
    order: 6,
    realWorldUse: "おにぎりは {三角|さんかく}、ノートは {四角|しかく}。{身|み}のまわりの {形|かたち}を なかまわけするときに つかうよ。",
    leadsTo: [U.boxShape],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.boxShape,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.geometry",
    title: "{箱|はこ}の {形|かたち}",
    order: 7,
    realWorldUse: "ティッシュ{箱|ばこ}や さいころの「{面|めん}・{辺|へん}・{頂点|ちょうてん}」を {調|しら}べるときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.triangleQuad],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.length,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.measurement",
    title: "{長|なが}さ（cm・mm・m）",
    order: 8,
    realWorldUse: "えんぴつや つくえの {長|なが}さを ものさしで {測|はか}るときに つかうよ。",
    leadsTo: [U.volume],
    prerequisites: [G1.numbersTo20],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.volume,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.measurement",
    title: "かさ（L・dL・mL）",
    order: 9,
    realWorldUse: "{牛乳|ぎゅうにゅう}や ジュースが どれだけ {入|はい}っているかを {調|しら}べるときに つかうよ。",
    leadsTo: [],
    prerequisites: [U.length],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.timeDuration,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.measurement",
    title: "{時刻|じこく}と {時間|じかん}",
    order: 10,
    realWorldUse: "「あと なん{分|ぷん}で {出発|しゅっぱつ}？」のように、{時刻|じこく}の {間|あいだ}の {時間|じかん}を {考|かんが}えるときに つかうよ。",
    leadsTo: [],
    prerequisites: [G1.clockRead],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.tableGraph,
    subjectId: "sansuu",
    grade: 2,
    domainId: "sansuu.data",
    title: "{表|ひょう}と グラフ",
    order: 11,
    realWorldUse: "クラスで すきな {果物|くだもの}を {調|しら}べて、{多|おお}い{少|すく}ないを {表|ひょう}や グラフで {見|み}るときに つかうよ。",
    leadsTo: [],
    prerequisites: [G1.numbersTo20],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test）──────────────

export const sansuuG2Contents: Record<string, UnitContent> = {
  // ── 1000までのかず ──
  [U.numbersTo1000]: {
    unitId: U.numbersTo1000,
    learn: {
      unitId: U.numbersTo1000,
      steps: [
        {
          heading: "100の かたまり",
          body: "10が 10こ あつまると 100だよ。100の かたまりで {数|かぞ}えると {大|おお}きい{数|かず}も すぐ{分|わ}かるね。",
          visual: { kind: "emoji", value: "🟧🟧🟧", caption: "100が 3こ で 300" },
        },
        {
          heading: "{位|くらい}どり（{百|ひゃく}の{位|くらい}・{十|じゅう}の{位|くらい}・{一|いち}の{位|くらい}）",
          body: "352は「100が3こ・10が5こ・1が2こ」だよ。{位|くらい}ごとに {数|かず}を{分|わ}けて {読|よ}むんだ。",
          visual: { kind: "svg", name: "number-blocks", params: { tens: 5, ones: 2 }, caption: "{十|じゅう}の{位|くらい}5・{一|いち}の{位|くらい}2" },
        },
        {
          heading: "{数|かず}の {大|おお}きさ{比|くら}べ",
          body: "{大|おお}きい{位|くらい}から {比|くら}べるよ。たとえば 540と 480なら、{百|ひゃく}の{位|くらい}が 5と4だから 540の{方|ほう}が{大|おお}きいね。",
          visual: { kind: "emoji", value: "540 ＞ 480", caption: "{百|ひゃく}の{位|くらい}で{比|くら}べる" },
        },
      ],
    },
    test: {
      unitId: U.numbersTo1000,
      questionCount: 6,
      questions: [
        {
          id: `${U.numbersTo1000}.q-1`,
          unitId: U.numbersTo1000,
          prompt: "100が 3こ、10が 5こ、1が 2こ で いくつ？",
          explanation: "100が3で300、10が5で50、1が2で2。{合|あ}わせて 352 だよ。",
          format: "number-input",
          answer: 352,
        },
        {
          id: `${U.numbersTo1000}.q-2`,
          unitId: U.numbersTo1000,
          prompt: "10が 10こ あつまると いくつ？",
          explanation: "10の かたまりが 10こ で 100 になるよ。",
          format: "number-input",
          answer: 100,
        },
        {
          id: `${U.numbersTo1000}.q-3`,
          unitId: U.numbersTo1000,
          prompt: "470の {十|じゅう}の{位|くらい}の {数字|すうじ}は どれ？",
          explanation: "470は「{百|ひゃく}の{位|くらい}4・{十|じゅう}の{位|くらい}7・{一|いち}の{位|くらい}0」。{十|じゅう}の{位|くらい}は 7 だよ。",
          format: "choice",
          choices: ["7", "4", "0", "47"],
          answer: "7",
        },
        {
          id: `${U.numbersTo1000}.q-4`,
          unitId: U.numbersTo1000,
          prompt: "630と 603、{大|おお}きいのは どっち？",
          explanation: "{十|じゅう}の{位|くらい}が 3と0。630の{方|ほう}が {大|おお}きいよ（{百|ひゃく}の{位|くらい}は{同|おな}じ6）。",
          format: "choice",
          choices: ["630", "603", "{同|おな}じ", "わからない"],
          answer: "630",
        },
        {
          id: `${U.numbersTo1000}.q-5`,
          unitId: U.numbersTo1000,
          prompt: "699の {次|つぎ}の {数|かず}は？",
          explanation: "699の {次|つぎ}は 700。{一|いち}の{位|くらい}が9の{次|つぎ}は {繰|く}り{上|あ}がって 700だよ。",
          format: "number-input",
          answer: 700,
        },
        {
          id: `${U.numbersTo1000}.q-6`,
          unitId: U.numbersTo1000,
          prompt: "「ひゃくにじゅうご」を {数字|すうじ}で {書|か}くと？",
          explanation: "{百|ひゃく}が1・{十|じゅう}が2・{一|いち}が5 だから 125 だよ。",
          format: "number-input",
          answer: 125,
        },
      ],
    },
  },

  // ── 2けたの たしざん（ひっさん）──
  [U.add2digit]: {
    unitId: U.add2digit,
    learn: {
      unitId: U.add2digit,
      steps: [
        {
          heading: "{位|くらい}を {揃|そろ}える",
          body: "{筆算|ひっさん}は {一|いち}の{位|くらい} どうし、{十|じゅう}の{位|くらい} どうしを {縦|たて}に {揃|そろ}えて {書|か}くよ。",
          visual: { kind: "emoji", value: "3 2\n＋2 5", caption: "{位|くらい}を{揃|そろ}える" },
        },
        {
          heading: "{一|いち}の{位|くらい}から {足|た}す",
          body: "32＋25は、まず 2＋5＝7（{一|いち}の{位|くらい}）、{次|つぎ}に 3＋2＝5（{十|じゅう}の{位|くらい}）。{答|こた}えは 57 だよ。",
          visual: { kind: "emoji", value: "32 ＋ 25 ＝ 57", caption: "{一|いち}の{位|くらい}から" },
        },
        {
          heading: "{繰|く}り{上|あ}がりに {気|き}をつけよう",
          body: "{一|いち}の{位|くらい}が 10{以上|いじょう}に なったら、{十|じゅう}の{位|くらい}へ 1 {繰|く}り{上|あ}げるよ。28＋14＝42 だね。",
          visual: { kind: "emoji", value: "28 ＋ 14 ＝ 42", caption: "{繰|く}り{上|あ}がり" },
        },
      ],
    },
    test: {
      unitId: U.add2digit,
      questionCount: 6,
      questions: [
        { id: `${U.add2digit}.q-1`, unitId: U.add2digit, prompt: "32 ＋ 25 ＝ ？", explanation: "{一|いち}の{位|くらい} 2＋5＝7、{十|じゅう}の{位|くらい} 3＋2＝5。{答|こた}えは 57 だよ。", format: "number-input", answer: 57 },
        { id: `${U.add2digit}.q-2`, unitId: U.add2digit, prompt: "14 ＋ 23 ＝ ？", explanation: "{一|いち}の{位|くらい} 4＋3＝7、{十|じゅう}の{位|くらい} 1＋2＝3。{答|こた}えは 37 だよ。", format: "number-input", answer: 37 },
        { id: `${U.add2digit}.q-3`, unitId: U.add2digit, prompt: "28 ＋ 14 ＝ ？", explanation: "{一|いち}の{位|くらい} 8＋4＝12 で{繰|く}り{上|あ}がり。{十|じゅう}の{位|くらい}は 2＋1＋1＝4。{答|こた}えは 42 だよ。", format: "number-input", answer: 42 },
        { id: `${U.add2digit}.q-4`, unitId: U.add2digit, prompt: "45 ＋ 36 ＝ ？", explanation: "5＋6＝11 で{繰|く}り{上|あ}がり。4＋3＋1＝8。{答|こた}えは 81 だよ。", format: "number-input", answer: 81 },
        { id: `${U.add2digit}.q-5`, unitId: U.add2digit, prompt: "60 ＋ 25 ＝ ？", explanation: "0＋5＝5、6＋2＝8。{答|こた}えは 85 だよ。", format: "number-input", answer: 85 },
        { id: `${U.add2digit}.q-6`, unitId: U.add2digit, prompt: "57 ＋ 38 ＝ ？", explanation: "7＋8＝15 で{繰|く}り{上|あ}がり。5＋3＋1＝9。{答|こた}えは 95 だよ。", format: "number-input", answer: 95 },
      ],
    },
  },

  // ── 2けたの ひきざん（ひっさん）──
  [U.sub2digit]: {
    unitId: U.sub2digit,
    learn: {
      unitId: U.sub2digit,
      steps: [
        {
          heading: "{位|くらい}を {揃|そろ}えて{書|か}く",
          body: "{引|ひ}き{算|ざん}の {筆算|ひっさん}も、{一|いち}の{位|くらい}・{十|じゅう}の{位|くらい}を {縦|たて}に{揃|そろ}えて{書|か}くよ。",
          visual: { kind: "emoji", value: "5 7\n−2 4", caption: "{位|くらい}を{揃|そろ}える" },
        },
        {
          heading: "{一|いち}の{位|くらい}から {引|ひ}く",
          body: "57−24は、{一|いち}の{位|くらい} 7−4＝3、{十|じゅう}の{位|くらい} 5−2＝3。{答|こた}えは 33 だよ。",
          visual: { kind: "emoji", value: "57 − 24 ＝ 33", caption: "{一|いち}の{位|くらい}から" },
        },
        {
          heading: "{繰|く}り{下|さ}がりに {気|き}をつけよう",
          body: "{一|いち}の{位|くらい}が {引|ひ}けないときは、{十|じゅう}の{位|くらい}から 10 {借|か}りてくるよ。52−18＝34 だね。",
          visual: { kind: "emoji", value: "52 − 18 ＝ 34", caption: "{繰|く}り{下|さ}がり" },
        },
      ],
    },
    test: {
      unitId: U.sub2digit,
      questionCount: 6,
      questions: [
        { id: `${U.sub2digit}.q-1`, unitId: U.sub2digit, prompt: "57 − 24 ＝ ？", explanation: "{一|いち}の{位|くらい} 7−4＝3、{十|じゅう}の{位|くらい} 5−2＝3。{答|こた}えは 33 だよ。", format: "number-input", answer: 33 },
        { id: `${U.sub2digit}.q-2`, unitId: U.sub2digit, prompt: "68 − 35 ＝ ？", explanation: "8−5＝3、6−3＝3。{答|こた}えは 33 だよ。", format: "number-input", answer: 33 },
        { id: `${U.sub2digit}.q-3`, unitId: U.sub2digit, prompt: "52 − 18 ＝ ？", explanation: "{一|いち}の{位|くらい}は 2−8 が{引|ひ}けないので {十|じゅう}から{借|か}りて 12−8＝4。{十|じゅう}の{位|くらい}は 4−1＝3。{答|こた}えは 34 だよ。", format: "number-input", answer: 34 },
        { id: `${U.sub2digit}.q-4`, unitId: U.sub2digit, prompt: "40 − 16 ＝ ？", explanation: "0−6 は{借|か}りて 10−6＝4。{十|じゅう}の{位|くらい}は 3−1＝2（4から1{借|か}りた）。{答|こた}えは 24 だよ。", format: "number-input", answer: 24 },
        { id: `${U.sub2digit}.q-5`, unitId: U.sub2digit, prompt: "83 − 29 ＝ ？", explanation: "3−9 は{借|か}りて 13−9＝4。8−2−1＝5。{答|こた}えは 54 だよ。", format: "number-input", answer: 54 },
        { id: `${U.sub2digit}.q-6`, unitId: U.sub2digit, prompt: "90 − 45 ＝ ？", explanation: "0−5 は{借|か}りて 10−5＝5。9−4−1＝4。{答|こた}えは 45 だよ。", format: "number-input", answer: 45 },
      ],
    },
  },

  // ── かけざん（くく）──
  [U.multiplication]: {
    unitId: U.multiplication,
    learn: {
      unitId: U.multiplication,
      steps: [
        {
          heading: "{掛|か}け{算|ざん}って なに？",
          body: "{同|おな}じ{数|かず}の あつまりを まとめて{数|かぞ}えるのが {掛|か}け{算|ざん}だよ。「×」の{記号|きごう}を{使|つか}うよ。",
          visual: { kind: "emoji", value: "🍓🍓🍓 🍓🍓🍓", caption: "3こが 2つで 3×2＝6" },
        },
        {
          heading: "くく（{九九|くく}）を {覚|おぼ}えよう",
          body: "「2の{段|だん}」は 2,4,6,8…と 2ずつ{増|ふ}えるよ。「ににんがし」のように {声|こえ}に{出|だ}すと {覚|おぼ}えやすいね。",
          visual: { kind: "emoji", value: "2 4 6 8 10 12", caption: "2の{段|だん}" },
        },
        {
          heading: "{順番|じゅんばん}を {変|か}えても {同|おな}じ",
          body: "3×4も 4×3も {答|こた}えは 12。{掛|か}ける {順番|じゅんばん}を {変|か}えても {答|こた}えは{同|おな}じだよ。",
          visual: { kind: "emoji", value: "3×4 ＝ 4×3 ＝ 12", caption: "{順番|じゅんばん}を{変|か}えても" },
        },
      ],
    },
    test: {
      unitId: U.multiplication,
      questionCount: 8,
      questions: [
        { id: `${U.multiplication}.q-1`, unitId: U.multiplication, prompt: "2 × 3 ＝ ？", explanation: "2が 3つで 6。「にさんがろく」だね。", format: "number-input", answer: 6 },
        { id: `${U.multiplication}.q-2`, unitId: U.multiplication, prompt: "5 × 4 ＝ ？", explanation: "5が 4つで 20。「ごしにじゅう」だよ。", format: "number-input", answer: 20 },
        { id: `${U.multiplication}.q-3`, unitId: U.multiplication, prompt: "3 × 6 ＝ ？", explanation: "3が 6つで 18。「さぶろくじゅうはち」だね。", format: "number-input", answer: 18 },
        { id: `${U.multiplication}.q-4`, unitId: U.multiplication, prompt: "7 × 2 ＝ ？", explanation: "7が 2つで 14。「しちにじゅうし」だよ。", format: "number-input", answer: 14 },
        { id: `${U.multiplication}.q-5`, unitId: U.multiplication, prompt: "4 × 4 ＝ ？", explanation: "4が 4つで 16。「ししじゅうろく」だね。", format: "number-input", answer: 16 },
        { id: `${U.multiplication}.q-6`, unitId: U.multiplication, prompt: "8 × 3 ＝ ？", explanation: "8が 3つで 24。「はちさんにじゅうし」だよ。", format: "number-input", answer: 24 },
        { id: `${U.multiplication}.q-7`, unitId: U.multiplication, prompt: "6 × 5 ＝ ？", explanation: "6が 5つで 30。「ろくごさんじゅう」だね。", format: "number-input", answer: 30 },
        { id: `${U.multiplication}.q-8`, unitId: U.multiplication, prompt: "9 × 9 ＝ ？", explanation: "9が 9つで 81。「くくはちじゅういち」だよ。", format: "number-input", answer: 81 },
      ],
    },
  },

  // ── かんたんな ぶんすう ──
  [U.simpleFraction]: {
    unitId: U.simpleFraction,
    learn: {
      unitId: U.simpleFraction,
      steps: [
        {
          heading: "{半分|はんぶん}＝2{分|ぶん}の1",
          body: "ピザを {同|おな}じ{大|おお}きさに 2つに {分|わ}けた 1つ{分|ぶん}を「2{分|ぶん}の1」というよ。「{半分|はんぶん}」と{同|おな}じだね。",
          visual: { kind: "emoji", value: "🍕", caption: "2つに{分|わ}けた1つ{分|ぶん}＝2{分|ぶん}の1" },
        },
        {
          heading: "4{分|ぶん}の1・3{分|ぶん}の1",
          body: "{同|おな}じ{大|おお}きさに 4つに{分|わ}けた 1つ{分|ぶん}が「4{分|ぶん}の1」、3つに{分|わ}けた 1つ{分|ぶん}が「3{分|ぶん}の1」だよ。",
          visual: { kind: "emoji", value: "🍰🍰🍰🍰", caption: "4つに{分|わ}けた1つ＝4{分|ぶん}の1" },
        },
      ],
    },
    test: {
      unitId: U.simpleFraction,
      questionCount: 5,
      questions: [
        {
          id: `${U.simpleFraction}.q-1`,
          unitId: U.simpleFraction,
          prompt: "ピザを {同|おな}じ{大|おお}きさに 2つに {分|わ}けた 1つ{分|ぶん}を なんという？",
          explanation: "2つに{分|わ}けた1つ{分|ぶん}だから「2{分|ぶん}の1」。{半分|はんぶん}と{同|おな}じだよ。",
          format: "choice",
          choices: ["2{分|ぶん}の1", "2ばい", "2こ", "4{分|ぶん}の1"],
          answer: "2{分|ぶん}の1",
        },
        {
          id: `${U.simpleFraction}.q-2`,
          unitId: U.simpleFraction,
          prompt: "「4{分|ぶん}の1」は なんこに {分|わ}けた 1つ{分|ぶん}？",
          explanation: "4{分|ぶん}の1は {同|おな}じ{大|おお}きさに 4つに{分|わ}けた 1つ{分|ぶん}だよ。",
          format: "choice",
          choices: ["4こ", "2こ", "3こ", "1こ"],
          answer: "4こ",
        },
        {
          id: `${U.simpleFraction}.q-3`,
          unitId: U.simpleFraction,
          prompt: "「{半分|はんぶん}」と {同|おな}じ いいかたは どれ？",
          explanation: "{半分|はんぶん}は 2つに{分|わ}けた1つ{分|ぶん}＝2{分|ぶん}の1 だよ。",
          format: "choice",
          choices: ["2{分|ぶん}の1", "3{分|ぶん}の1", "4{分|ぶん}の1", "{全部|ぜんぶ}"],
          answer: "2{分|ぶん}の1",
        },
        {
          id: `${U.simpleFraction}.q-4`,
          unitId: U.simpleFraction,
          prompt: "{大|おお}きいのは どっち？ 「2{分|ぶん}の1」と「4{分|ぶん}の1」",
          explanation: "{同|おな}じ{大|おお}きさを {分|わ}ける{数|かず}が {少|すく}ないほど 1つ{分|ぶん}は{大|おお}きい。2{分|ぶん}の1の{方|ほう}が{大|おお}きいよ。",
          format: "choice",
          choices: ["2{分|ぶん}の1", "4{分|ぶん}の1", "{同|おな}じ", "わからない"],
          answer: "2{分|ぶん}の1",
        },
        {
          id: `${U.simpleFraction}.q-5`,
          unitId: U.simpleFraction,
          prompt: "ケーキを 3つに {同|おな}じように {分|わ}けた 1つ{分|ぶん}を なんという？",
          explanation: "3つに{分|わ}けた1つ{分|ぶん}だから「3{分|ぶん}の1」だよ。",
          format: "choice",
          choices: ["3{分|ぶん}の1", "3ばい", "2{分|ぶん}の1", "3こ"],
          answer: "3{分|ぶん}の1",
        },
      ],
    },
  },

  // ── さんかくけいと しかくけい ──
  [U.triangleQuad]: {
    unitId: U.triangleQuad,
    learn: {
      unitId: U.triangleQuad,
      steps: [
        {
          heading: "{三角形|さんかくけい}と {四角形|しかくけい}",
          body: "3{本|ぼん}の まっすぐな {辺|へん}で {囲|かこ}まれた {形|かたち}が「{三角形|さんかくけい}」、4{本|ほん}で {囲|かこ}まれた {形|かたち}が「{四角形|しかくけい}」だよ。",
          visual: { kind: "emoji", value: "🔺 ⬜", caption: "{辺|へん}3{本|ぼん}＝さんかく / {辺|へん}4{本|ほん}＝しかく" },
        },
        {
          heading: "{直角|ちょっかく}",
          body: "{紙|かみ}の {角|かど}のように、ぴったり「L」の{形|かたち}になった {角|かど}を「{直角|ちょっかく}」というよ。",
          visual: { kind: "emoji", value: "📐", caption: "{角|かど}が{直角|ちょっかく}" },
        },
        {
          heading: "{長方形|ちょうほうけい}と {正方形|せいほうけい}",
          body: "{角|かど}が {全部|ぜんぶ} {直角|ちょっかく}の {四角|しかく}が「{長方形|ちょうほうけい}」。その{中|なか}で {辺|へん}の {長|なが}さが {全部|ぜんぶ}{同|おな}じものが「{正方形|せいほうけい}」だよ。",
          visual: { kind: "emoji", value: "▭ ⬛", caption: "{長方形|ちょうほうけい} / {正方形|せいほうけい}" },
        },
      ],
    },
    test: {
      unitId: U.triangleQuad,
      questionCount: 5,
      questions: [
        {
          id: `${U.triangleQuad}.q-1`,
          unitId: U.triangleQuad,
          prompt: "{辺|へん}が 3{本|ぼん}ある {形|かたち}を なんという？",
          explanation: "まっすぐな {辺|へん}が 3{本|ぼん}で {囲|かこ}まれた {形|かたち}は「{三角形|さんかくけい}」だよ。",
          format: "choice",
          choices: ["{三角形|さんかくけい}", "{四角形|しかくけい}", "まる", "{直角|ちょっかく}"],
          answer: "{三角形|さんかくけい}",
        },
        {
          id: `${U.triangleQuad}.q-2`,
          unitId: U.triangleQuad,
          prompt: "{角|かど}が {全部|ぜんぶ} {直角|ちょっかく}で、{辺|へん}の {長|なが}さが {全部|ぜんぶ} {同|おな}じ {四角|しかく}は？",
          explanation: "{角|かど}が{直角|ちょっかく}＋{辺|へん}が{全部|ぜんぶ}{同|おな}じ＝「{正方形|せいほうけい}」だよ。",
          format: "choice",
          choices: ["{正方形|せいほうけい}", "{長方形|ちょうほうけい}", "{三角形|さんかくけい}", "ひしがた"],
          answer: "{正方形|せいほうけい}",
        },
        {
          id: `${U.triangleQuad}.q-3`,
          unitId: U.triangleQuad,
          prompt: "「{長方形|ちょうほうけい}」の {角|かど}は どんな {角|かど}？",
          explanation: "{長方形|ちょうほうけい}の {角|かど}は 4つとも {直角|ちょっかく}だよ。",
          format: "choice",
          choices: ["{全部|ぜんぶ} {直角|ちょっかく}", "まるい {角|かど}", "とがった {角|かど}", "{角|かど}がない"],
          answer: "{全部|ぜんぶ} {直角|ちょっかく}",
        },
        {
          id: `${U.triangleQuad}.q-4`,
          unitId: U.triangleQuad,
          prompt: "{四角形|しかくけい}の {辺|へん}は なん{本|ぼん}？",
          explanation: "{四角形|しかくけい}は まっすぐな {辺|へん}が 4{本|ほん}だよ。",
          format: "number-input",
          answer: 4,
        },
        {
          id: `${U.triangleQuad}.q-5`,
          unitId: U.triangleQuad,
          prompt: "{紙|かみ}の {角|かど}のような「L」の{形|かたち}の {角|かど}を なんという？",
          explanation: "ぴったりL{字|じ}になった {角|かど}を「{直角|ちょっかく}」というよ。",
          format: "choice",
          choices: ["{直角|ちょっかく}", "{辺|へん}", "{頂点|ちょうてん}", "まる"],
          answer: "{直角|ちょっかく}",
        },
      ],
    },
  },

  // ── はこの かたち ──
  [U.boxShape]: {
    unitId: U.boxShape,
    learn: {
      unitId: U.boxShape,
      steps: [
        {
          heading: "{面|めん}・{辺|へん}・{頂点|ちょうてん}",
          body: "{箱|はこ}の {平|たい}らな ところが「{面|めん}」、{面|めん}と {面|めん}の {境|さかい}の {線|せん}が「{辺|へん}」、{角|かど}の {点|てん}が「{頂点|ちょうてん}」だよ。",
          visual: { kind: "emoji", value: "📦", caption: "{面|めん}・{辺|へん}・{頂点|ちょうてん}" },
        },
        {
          heading: "さいころの {数|かず}",
          body: "さいころ（{立方体|りっぽうたい}）には {面|めん}が 6つ、{辺|へん}が 12{本|ほん}、{頂点|ちょうてん}が 8こ あるよ。",
          visual: { kind: "emoji", value: "🎲", caption: "{面|めん}6・{辺|へん}12・{頂点|ちょうてん}8" },
        },
      ],
    },
    test: {
      unitId: U.boxShape,
      questionCount: 5,
      questions: [
        {
          id: `${U.boxShape}.q-1`,
          unitId: U.boxShape,
          prompt: "{箱|はこ}の {平|たい}らな ところを なんという？",
          explanation: "{箱|はこ}の {平|たい}らな ところは「{面|めん}」というよ。",
          format: "choice",
          choices: ["{面|めん}", "{辺|へん}", "{頂点|ちょうてん}", "まる"],
          answer: "{面|めん}",
        },
        {
          id: `${U.boxShape}.q-2`,
          unitId: U.boxShape,
          prompt: "さいころ（{箱|はこ}の{形|かたち}）の {面|めん}は いくつ？",
          explanation: "さいころには {面|めん}が 6つ あるよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.boxShape}.q-3`,
          unitId: U.boxShape,
          prompt: "さいころの {頂点|ちょうてん}（{角|かど}の{点|てん}）は いくつ？",
          explanation: "さいころの {頂点|ちょうてん}は 8こ あるよ。",
          format: "number-input",
          answer: 8,
        },
        {
          id: `${U.boxShape}.q-4`,
          unitId: U.boxShape,
          prompt: "{面|めん}と {面|めん}の {境|さかい}の まっすぐな {線|せん}を なんという？",
          explanation: "{面|めん}と{面|めん}の {境|さかい}の {線|せん}は「{辺|へん}」というよ。",
          format: "choice",
          choices: ["{辺|へん}", "{面|めん}", "{頂点|ちょうてん}", "{縦|たて}"],
          answer: "{辺|へん}",
        },
        {
          id: `${U.boxShape}.q-5`,
          unitId: U.boxShape,
          prompt: "さいころの {辺|へん}は なん{本|ぼん}？",
          explanation: "さいころ（{立方体|りっぽうたい}）の {辺|へん}は 12{本|ほん}だよ。",
          format: "number-input",
          answer: 12,
        },
      ],
    },
  },

  // ── ながさ（cm・mm・m）──
  [U.length]: {
    unitId: U.length,
    learn: {
      unitId: U.length,
      steps: [
        {
          heading: "ものさしで {測|はか}る",
          body: "{長|なが}さは ものさしで {測|はか}るよ。{単位|たんい}は「cm（せんち）」「mm（みり）」「m（めーとる）」を{使|つか}うんだ。",
          visual: { kind: "emoji", value: "📏", caption: "ものさし" },
        },
        {
          heading: "cmと mm",
          body: "1cmを {同|おな}じ{大|おお}きさに 10こ に{分|わ}けた 1つ{分|ぶん}が 1mm。だから 1cm＝10mm だよ。",
          visual: { kind: "emoji", value: "1cm ＝ 10mm", caption: "1cmは10mm" },
        },
        {
          heading: "mと cm",
          body: "1m は とても {長|なが}い{長|なが}さ。1m＝100cm だよ。{背|せ}の {高|たか}さなどに {使|つか}うね。",
          visual: { kind: "emoji", value: "1m ＝ 100cm", caption: "1mは100cm" },
        },
      ],
    },
    test: {
      unitId: U.length,
      questionCount: 6,
      questions: [
        { id: `${U.length}.q-1`, unitId: U.length, prompt: "1cm は なんmm？", explanation: "1cmを 10こに{分|わ}けた 1つ{分|ぶん}が 1mm。だから 1cm＝10mm だよ。", format: "number-input", answer: 10 },
        { id: `${U.length}.q-2`, unitId: U.length, prompt: "1m は なんcm？", explanation: "1m＝100cm だよ。", format: "number-input", answer: 100 },
        { id: `${U.length}.q-3`, unitId: U.length, prompt: "3cm は なんmm？", explanation: "1cm＝10mm だから、3cm＝30mm だよ。", format: "number-input", answer: 30 },
        {
          id: `${U.length}.q-4`,
          unitId: U.length,
          prompt: "えんぴつの {長|なが}さを {測|はか}るのに ちょうどいい {単位|たんい}は？",
          explanation: "えんぴつくらいの {長|なが}さは cm（せんち）で {表|あらわ}すのが ちょうどいいよ。",
          format: "choice",
          choices: ["cm", "m", "L", "kg"],
          answer: "cm",
        },
        { id: `${U.length}.q-5`, unitId: U.length, prompt: "5cm3mm は なんmm？", explanation: "5cm＝50mm、それに 3mm を{足|た}して 53mm だよ。", format: "number-input", answer: 53 },
        {
          id: `${U.length}.q-6`,
          unitId: U.length,
          prompt: "{長|なが}いのは どっち？ 「1m」と「90cm」",
          explanation: "1m＝100cm。100cmと90cmなら 1m（100cm）の{方|ほう}が{長|なが}いよ。",
          format: "choice",
          choices: ["1m", "90cm", "{同|おな}じ", "わからない"],
          answer: "1m",
        },
      ],
    },
  },

  // ── かさ（L・dL・mL）──
  [U.volume]: {
    unitId: U.volume,
    learn: {
      unitId: U.volume,
      steps: [
        {
          heading: "かさって なに？",
          body: "{入|い}れ{物|もの}に どれだけ {水|みず}が {入|はい}るかを「かさ」というよ。{単位|たんい}は L・dL・mL を{使|つか}うんだ。",
          visual: { kind: "emoji", value: "🥛🪣", caption: "どれだけ {入|はい}るか＝かさ" },
        },
        {
          heading: "Lと dL と mL",
          body: "1L＝10dL、1L＝1000mL、1dL＝100mL だよ。{牛乳|ぎゅうにゅう}パックは だいたい 1L だね。",
          visual: { kind: "emoji", value: "1L ＝ 10dL ＝ 1000mL", caption: "かさの{単位|たんい}" },
        },
      ],
    },
    test: {
      unitId: U.volume,
      questionCount: 5,
      questions: [
        { id: `${U.volume}.q-1`, unitId: U.volume, prompt: "1L は なんdL？", explanation: "1L＝10dL だよ。", format: "number-input", answer: 10 },
        { id: `${U.volume}.q-2`, unitId: U.volume, prompt: "1L は なんmL？", explanation: "1L＝1000mL だよ。", format: "number-input", answer: 1000 },
        { id: `${U.volume}.q-3`, unitId: U.volume, prompt: "1dL は なんmL？", explanation: "1dL＝100mL だよ。", format: "number-input", answer: 100 },
        {
          id: `${U.volume}.q-4`,
          unitId: U.volume,
          prompt: "{牛乳|ぎゅうにゅう}パック いっぱいの かさに {近|ちか}い {単位|たんい}は？",
          explanation: "{牛乳|ぎゅうにゅう}パックは だいたい 1L。{大|おお}きな かさは L で{表|あらわ}すよ。",
          format: "choice",
          choices: ["L", "mL", "cm", "g"],
          answer: "L",
        },
        {
          id: `${U.volume}.q-5`,
          unitId: U.volume,
          prompt: "{多|おお}いのは どっち？ 「1L」と「8dL」",
          explanation: "1L＝10dL。10dLと8dLなら 1Lの{方|ほう}が{多|おお}いよ。",
          format: "choice",
          choices: ["1L", "8dL", "{同|おな}じ", "わからない"],
          answer: "1L",
        },
      ],
    },
  },

  // ── じこくと じかん ──
  [U.timeDuration]: {
    unitId: U.timeDuration,
    learn: {
      unitId: U.timeDuration,
      steps: [
        {
          heading: "{時刻|じこく}と {時間|じかん}",
          body: "{時計|とけい}が さす {今|いま}の {時|とき}が「{時刻|じこく}」、{時刻|じこく}と {時刻|じこく}の {間|あいだ}の {長|なが}さが「{時間|じかん}」だよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 9, minute: 0 }, caption: "9じ（{時刻|じこく}）" },
        },
        {
          heading: "1{時間|じかん}＝60ぷん",
          body: "{長|なが}い{針|はり}が ぐるっと 1{周|しゅう}すると 60{分|ぷん}。これが 1{時間|じかん}だよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 10, minute: 0 }, caption: "9{時|じ}から10{時|じ}までで1{時間|じかん}" },
        },
        {
          heading: "{午前|ごぜん}と {午後|ごご}",
          body: "{夜|よる}の 12{時|じ}から {昼|ひる}の 12{時|じ}までが「{午前|ごぜん}」、{昼|ひる}の 12{時|じ}から {夜|よる}の 12{時|じ}までが「{午後|ごご}」だよ。",
          visual: { kind: "emoji", value: "🌅🌇", caption: "{午前|ごぜん} / {午後|ごご}" },
        },
      ],
    },
    test: {
      unitId: U.timeDuration,
      questionCount: 6,
      questions: [
        { id: `${U.timeDuration}.q-1`, unitId: U.timeDuration, prompt: "1{時間|じかん}は なん{分|ぷん}？", explanation: "{長|なが}い{針|はり}が 1{周|しゅう}で 60{分|ぷん}。1{時間|じかん}＝60{分|ぷん} だよ。", format: "number-input", answer: 60 },
        {
          id: `${U.timeDuration}.q-2`,
          unitId: U.timeDuration,
          prompt: "{時計|とけい}は なん{時|じ}？",
          explanation: "{短|みじか}い{針|はり}が 9、{長|なが}い{針|はり}が 12 をさしているので「9{時|じ}」だよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 9, minute: 0 }, caption: "9じ" },
          format: "clock-read",
          choices: ["9{時|じ}", "12{時|じ}", "8{時|じ}", "9{時|じ}30{分|ぷん}"],
          answer: "9{時|じ}",
        },
        {
          id: `${U.timeDuration}.q-3`,
          unitId: U.timeDuration,
          prompt: "9{時|じ}から 10{時|じ}までは なん{時間|じかん}？",
          explanation: "9{時|じ}と10{時|じ}の {間|あいだ}は 1{時間|じかん}だよ。",
          format: "number-input",
          answer: 1,
        },
        { id: `${U.timeDuration}.q-4`, unitId: U.timeDuration, prompt: "30{分|ぷん}は {半|はん}（{半分|はんぶん}）。1{時間|じかん}の {半分|はんぶん}は なん{分|ぷん}？", explanation: "1{時間|じかん}＝60{分|ぷん}。その{半分|はんぶん}は 30{分|ぷん} だよ。", format: "number-input", answer: 30 },
        {
          id: `${U.timeDuration}.q-5`,
          unitId: U.timeDuration,
          prompt: "{朝|あさ} {起|お}きる {時間|じかん}は {午前|ごぜん}？ {午後|ごご}？",
          explanation: "{夜|よる}12{時|じ}から {昼|ひる}12{時|じ}までが {午前|ごぜん}。{朝|あさ}は {午前|ごぜん}だよ。",
          format: "choice",
          choices: ["{午前|ごぜん}", "{午後|ごご}", "どちらも", "ない"],
          answer: "{午前|ごぜん}",
        },
        {
          id: `${U.timeDuration}.q-6`,
          unitId: U.timeDuration,
          prompt: "{時計|とけい}は なん{時|じ}{半|はん}？",
          explanation: "{短|みじか}い{針|はり}が 3の{少|すこ}し{先|さき}、{長|なが}い{針|はり}が 6 をさしているので「3{時|じ}{半|はん}（3{時|じ}30{分|ぷん}）」だよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 3, minute: 30 }, caption: "3じ30ぷん" },
          format: "clock-read",
          choices: ["3{時|じ}{半|はん}", "3{時|じ}", "6{時|じ}", "3{時|じ}15{分|ふん}"],
          answer: "3{時|じ}{半|はん}",
        },
      ],
    },
  },

  // ── ひょうと グラフ ──
  [U.tableGraph]: {
    unitId: U.tableGraph,
    learn: {
      unitId: U.tableGraph,
      steps: [
        {
          heading: "{表|ひょう}に {整理|せいり}する",
          body: "{調|しら}べた {数|かず}を「{表|ひょう}」に {書|か}くと、どれが いくつあるか {分|わ}かりやすいよ。",
          visual: { kind: "emoji", value: "🍎3 🍌2 🍇4", caption: "{果物|くだもの}の {数|かず}を {表|ひょう}に" },
        },
        {
          heading: "グラフで {比|くら}べる",
          body: "{同|おな}じ{数|かず}だけ ○や {四角|しかく}を {積|つ}み{上|あ}げる「グラフ」にすると、{多|おお}い{少|すく}ないが ひとめで{分|わ}かるよ。",
          visual: { kind: "emoji", value: "🍇🍇🍇🍇\n🍎🍎🍎\n🍌🍌", caption: "{高|たか}いほど {多|おお}い" },
        },
      ],
    },
    test: {
      unitId: U.tableGraph,
      questionCount: 5,
      questions: [
        {
          id: `${U.tableGraph}.q-1`,
          unitId: U.tableGraph,
          prompt: "🍎🍎🍎 🍌🍌 🍇🍇🍇🍇 のとき、{一番|いちばん} {多|おお}い {果物|くだもの}は？",
          explanation: "りんご3・バナナ2・ぶどう4。{一番|いちばん} {多|おお}いのは ぶどう（4こ）だよ。",
          format: "choice",
          choices: ["ぶどう", "りんご", "バナナ", "{同|おな}じ"],
          answer: "ぶどう",
        },
        {
          id: `${U.tableGraph}.q-2`,
          unitId: U.tableGraph,
          prompt: "🍎🍎🍎 🍌🍌 🍇🍇🍇🍇 のとき、{一番|いちばん} {少|すく}ない {果物|くだもの}は？",
          explanation: "りんご3・バナナ2・ぶどう4。{一番|いちばん} {少|すく}ないのは バナナ（2こ）だよ。",
          format: "choice",
          choices: ["バナナ", "りんご", "ぶどう", "{同|おな}じ"],
          answer: "バナナ",
        },
        {
          id: `${U.tableGraph}.q-3`,
          unitId: U.tableGraph,
          prompt: "🍎🍎🍎 🍌🍌 🍇🍇🍇🍇 のとき、{果物|くだもの}は {全部|ぜんぶ}で なんこ？",
          explanation: "3＋2＋4＝9。{全部|ぜんぶ}で 9こ だよ。",
          format: "number-input",
          answer: 9,
        },
        {
          id: `${U.tableGraph}.q-4`,
          unitId: U.tableGraph,
          prompt: "🍎🍎🍎 と 🍇🍇🍇🍇 では、ぶどうは りんごより なんこ {多|おお}い？",
          explanation: "ぶどう4 − りんご3 ＝ 1。ぶどうの{方|ほう}が 1こ {多|おお}いよ。",
          format: "number-input",
          answer: 1,
        },
        {
          id: `${U.tableGraph}.q-5`,
          unitId: U.tableGraph,
          prompt: "{多|おお}い{少|すく}ないを ひとめで {比|くら}べるのに {便利|べんり}なのは？",
          explanation: "○や {四角|しかく}を {積|つ}み{上|あ}げた グラフは、{高|たか}さで {多|おお}い{少|すく}ないが すぐ{分|わ}かるよ。",
          format: "choice",
          choices: ["グラフ", "{時計|とけい}", "ものさし", "さいころ"],
          answer: "グラフ",
        },
      ],
    },
  },
};
