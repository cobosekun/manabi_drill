// ══════════════════════════════════════════
// カリキュラム縦スライス実証: 算数（さんすう）小1
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
//
// 【レトロフィット(2026-06-02)】全表示テキスト(title / realWorldUse / heading / body /
//   visual caption / prompt / choices / explanation)を漢字＋全漢字ルビ記法 {漢字|よみ} に統一。
//   小1相応の語彙のまま、出現する漢字には学年に関係なく全てルビを付す（ruby-convention 準拠）。
//   id/依存グラフ(leadsTo/prerequisites)/order/flags/domainId/generatorId/format/answer/
//   questionCount/Subject/Domain は不変更。clock-read の choices/answer はルビ込みで一致を維持。
//   こ（個）等のカウンタは こども向けに かな据え置き、数字・記号はそのまま。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ClockReadQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

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

export const sansuuG1Domains: Domain[] = [
  {
    id: "sansuu.number-calc",
    subjectId: "sansuu",
    name: "かずとけいさん",
    formalName: "数と計算",
  },
  {
    id: "sansuu.measurement",
    subjectId: "sansuu",
    name: "そくてい（とけい）",
    formalName: "測定",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo が双方向に繋がるよう設計）:
//
//   numbers-to-10 ──┬─▶ add-within-10 ──▶ sub-within-10 ──▶ numbers-to-20
//                   ├─▶ numbers-to-20 ◀──────────────────────┘
//                   └─▶ clock-read
//
const U = {
  numbersTo10: "sansuu.g1.numbers-to-10",
  addWithin10: "sansuu.g1.add-within-10",
  subWithin10: "sansuu.g1.sub-within-10",
  numbersTo20: "sansuu.g1.numbers-to-20",
  clockRead: "sansuu.g1.clock-read",
} as const;

export const sansuuG1Units: Unit[] = [
  {
    id: U.numbersTo10,
    subjectId: "sansuu",
    grade: 1,
    domainId: "sansuu.number-calc",
    title: "10までの{数|かず}",
    order: 1,
    realWorldUse: "お{菓子|かし}の{数|かず}を {数|かぞ}えたり、お{皿|さら}に {配|くば}るときに {使|つか}うよ。",
    leadsTo: [U.addWithin10, U.numbersTo20, U.clockRead],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.addWithin10,
    subjectId: "sansuu",
    grade: 1,
    domainId: "sansuu.number-calc",
    title: "10までの{足|た}し{算|ざん}",
    order: 2,
    realWorldUse: "{飴|あめ}を 2こ と 3こ もらったら {全部|ぜんぶ}で {何|なん}こ？ のように、{物|もの}を {合|あ}わせるときに {使|つか}うよ。",
    leadsTo: [U.subWithin10],
    prerequisites: [U.numbersTo10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.subWithin10,
    subjectId: "sansuu",
    grade: 1,
    domainId: "sansuu.number-calc",
    title: "10までの{引|ひ}き{算|ざん}",
    order: 3,
    realWorldUse: "クッキーが 7こ あって 2こ {食|た}べたら {何|なん}こ {残|のこ}る？ のように、{減|へ}った{数|かず}を {知|し}るときに {使|つか}うよ。",
    leadsTo: [U.numbersTo20],
    prerequisites: [U.addWithin10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.numbersTo20,
    subjectId: "sansuu",
    grade: 1,
    domainId: "sansuu.number-calc",
    title: "20までの{数|かず}",
    order: 4,
    realWorldUse: "クラスの お{友達|ともだち}の{数|かず}や、カレンダーの{日|ひ}にちを {数|かぞ}えるときに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [U.numbersTo10, U.subWithin10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.clockRead,
    subjectId: "sansuu",
    grade: 1,
    domainId: "sansuu.measurement",
    title: "{時計|とけい}（{何|なん}{時|じ}{何|なん}{分|ぷん}）",
    order: 5,
    realWorldUse: "{朝|あさ} {起|お}きる{時間|じかん}や、{学校|がっこう}が {始|はじ}まる{時間|じかん}を {時計|とけい}で {読|よ}むときに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [U.numbersTo10],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────

// とけい単元の固定問題（3問）。SVG時計は visual(kind:"svg", name:"clock", params)で提示。
const clockQuestions: ClockReadQuestion[] = [
  {
    id: `${U.clockRead}.gen-1`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 3、{長|なが}い{針|はり}が 12 を {指|さ}しているので「3{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 3, minute: 0 }, caption: "3{時|じ}" },
    format: "clock-read",
    choices: ["3{時|じ}", "4{時|じ}", "2{時|じ}", "3{時|じ}30{分|ぷん}"],
    answer: "3{時|じ}",
  },
  {
    id: `${U.clockRead}.gen-2`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 8 の すこし{先|さき}、{長|なが}い{針|はり}が 6 を {指|さ}しているので「8{時|じ}30{分|ぷん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 8, minute: 30 }, caption: "8{時|じ}30{分|ぷん}" },
    format: "clock-read",
    choices: ["8{時|じ}30{分|ぷん}", "8{時|じ}", "9{時|じ}30{分|ぷん}", "7{時|じ}30{分|ぷん}"],
    answer: "8{時|じ}30{分|ぷん}",
  },
  {
    id: `${U.clockRead}.gen-3`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 6 の すこし{先|さき}、{長|なが}い{針|はり}が 3 を {指|さ}しているので「6{時|じ}15{分|ふん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 6, minute: 15 }, caption: "6{時|じ}15{分|ふん}" },
    format: "clock-read",
    choices: ["6{時|じ}15{分|ふん}", "6{時|じ}", "5{時|じ}15{分|ふん}", "6{時|じ}30{分|ぷん}"],
    answer: "6{時|じ}15{分|ふん}",
  },
];

export const sansuuG1Contents: Record<string, UnitContent> = {
  [U.numbersTo10]: {
    unitId: U.numbersTo10,
    learn: {
      unitId: U.numbersTo10,
      steps: [
        {
          heading: "{数|かず}を {数|かぞ}えてみよう",
          body: "{物|もの}を {一|ひと}つずつ「1、2、3…」と {指|ゆび}で {指|さ}しながら {数|かぞ}えると、{幾|いく}つ あるか {分|わ}かるよ。",
          visual: { kind: "emoji", value: "🍎🍎🍎", caption: "りんごが 3こ" },
        },
        {
          heading: "10までの{数|かず}",
          body: "1 から 10 まで、{順番|じゅんばん}に {数|かぞ}えられるかな？ ブロックを {並|なら}べると {数|かず}が {目|め}で {見|み}えるよ。",
          visual: { kind: "svg", name: "number-blocks", params: { count: 10 }, caption: "10この ブロック" },
        },
        {
          heading: "{多|おお}い・{少|すく}ない",
          body: "{二|ふた}つの{数|かず}を {比|くら}べて、どちらが {多|おお}いか {見|み}てみよう。{数|かず}が {大|おお}きい{方|ほう}が「{多|おお}い」だよ。",
          visual: { kind: "emoji", value: "🟦🟦🟦🟦🟥🟥", caption: "{青|あお}が {多|おお}い" },
        },
      ],
    },
    test: {
      unitId: U.numbersTo10,
      generatorId: "sansuu.count-within-10",
      questionCount: 5,
    },
  },

  [U.addWithin10]: {
    unitId: U.addWithin10,
    learn: {
      unitId: U.addWithin10,
      steps: [
        {
          heading: "{足|た}し{算|ざん}って なに？",
          body: "{二|ふた}つの{数|かず}を「{合|あ}わせる」ことを {足|た}し{算|ざん}と{言|い}うよ。「＋」の {記号|きごう}を {使|つか}うよ。",
          visual: { kind: "emoji", value: "🍓🍓 ＋ 🍓 ＝ 🍓🍓🍓", caption: "2 ＋ 1 ＝ 3" },
        },
        {
          heading: "ブロックで {合|あ}わせよう",
          body: "3この ブロックと 2この ブロックを {合|あ}わせると、{全部|ぜんぶ}で 5こ に なるね。",
          visual: { kind: "svg", name: "number-blocks", params: { left: 3, right: 2 }, caption: "3 ＋ 2 ＝ 5" },
        },
      ],
    },
    test: {
      unitId: U.addWithin10,
      generatorId: "sansuu.addition-within-10",
      questionCount: 10,
    },
  },

  [U.subWithin10]: {
    unitId: U.subWithin10,
    learn: {
      unitId: U.subWithin10,
      steps: [
        {
          heading: "{引|ひ}き{算|ざん}って なに？",
          body: "ある{数|かず}から「{減|へ}らす」ことを {引|ひ}き{算|ざん}と{言|い}うよ。「−」の {記号|きごう}を {使|つか}うよ。",
          visual: { kind: "emoji", value: "🍪🍪🍪🍪🍪 − 🍪🍪 ＝ 🍪🍪🍪", caption: "5 − 2 ＝ 3" },
        },
        {
          heading: "ブロックで {減|へ}らそう",
          body: "7この ブロックから 3こ {取|と}ると、{残|のこ}りは 4こ に なるね。",
          visual: { kind: "svg", name: "number-blocks", params: { total: 7, remove: 3 }, caption: "7 − 3 ＝ 4" },
        },
      ],
    },
    test: {
      unitId: U.subWithin10,
      generatorId: "sansuu.subtraction-within-10",
      questionCount: 10,
    },
  },

  [U.numbersTo20]: {
    unitId: U.numbersTo20,
    learn: {
      unitId: U.numbersTo20,
      steps: [
        {
          heading: "10の かたまり",
          body: "10こ {集|あつ}まると「10の かたまり」に なるよ。10と {残|のこ}りの{数|かず}で 20まで {数|かぞ}えられるね。",
          visual: { kind: "svg", name: "number-blocks", params: { tens: 1, ones: 3 }, caption: "10と 3で 13" },
        },
        {
          heading: "11から20まで",
          body: "10の {次|つぎ}は 11、12、13…と {続|つづ}くよ。20まで {順番|じゅんばん}に {数|かぞ}えてみよう。",
          visual: { kind: "emoji", value: "🔟➕🔟", caption: "10と 10で 20" },
        },
      ],
    },
    test: {
      unitId: U.numbersTo20,
      generatorId: "sansuu.count-within-20",
      questionCount: 5,
    },
  },

  [U.clockRead]: {
    unitId: U.clockRead,
    learn: {
      unitId: U.clockRead,
      steps: [
        {
          heading: "{時計|とけい}の {針|はり}",
          body: "{時計|とけい}には「{短|みじか}い{針|はり}（{時|じ}）」と「{長|なが}い{針|はり}（{分|ぷん}）」が あるよ。{短|みじか}い{針|はり}で {何|なん}{時|じ}か {分|わ}かるよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 3, minute: 0 }, caption: "3{時|じ} ちょうど" },
        },
        {
          heading: "{長|なが}い{針|はり}を {読|よ}もう",
          body: "{長|なが}い{針|はり}が 12 を {指|さ}すと「ちょうど」、6 を {指|さ}すと「30{分|ぷん}（はん）」だよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 8, minute: 30 }, caption: "8{時|じ}30{分|ぷん}" },
        },
      ],
    },
    test: {
      unitId: U.clockRead,
      questions: clockQuestions,
      questionCount: 3,
    },
  },
};
