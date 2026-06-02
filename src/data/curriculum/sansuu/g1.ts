// ══════════════════════════════════════════
// カリキュラム縦スライス実証: 算数（さんすう）小1
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
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
    title: "10までのかず",
    order: 1,
    realWorldUse: "おかしのかずをかぞえたり、おさらにくばるときにつかうよ。",
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
    title: "10までのたしざん",
    order: 2,
    realWorldUse: "あめを 2こ と 3こ もらったら ぜんぶで なんこ？ のように、ものをあわせるときにつかうよ。",
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
    title: "10までのひきざん",
    order: 3,
    realWorldUse: "クッキーが 7こ あって 2こ たべたら なんこ のこる？ のように、へったかずをしるときにつかうよ。",
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
    title: "20までのかず",
    order: 4,
    realWorldUse: "クラスのおともだちのかずや、カレンダーのひにちをかぞえるときにつかうよ。",
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
    title: "とけい（なんじなんぷん）",
    order: 5,
    realWorldUse: "あさおきるじかんや、がっこうがはじまるじかんを とけいでよむときにつかうよ。",
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
    prompt: "とけいは なんじ？",
    explanation: "みじかいはりが 3、ながいはりが 12 をさしているので「3じ」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 3, minute: 0 }, caption: "3じ" },
    format: "clock-read",
    choices: ["3じ", "4じ", "2じ", "3じ30ぷん"],
    answer: "3じ",
  },
  {
    id: `${U.clockRead}.gen-2`,
    unitId: U.clockRead,
    prompt: "とけいは なんじなんぷん？",
    explanation: "みじかいはりが 8 のすこしさき、ながいはりが 6 をさしているので「8じ30ぷん」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 8, minute: 30 }, caption: "8じ30ぷん" },
    format: "clock-read",
    choices: ["8じ30ぷん", "8じ", "9じ30ぷん", "7じ30ぷん"],
    answer: "8じ30ぷん",
  },
  {
    id: `${U.clockRead}.gen-3`,
    unitId: U.clockRead,
    prompt: "とけいは なんじなんぷん？",
    explanation: "みじかいはりが 6 のすこしさき、ながいはりが 3 をさしているので「6じ15ぷん」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 6, minute: 15 }, caption: "6じ15ぷん" },
    format: "clock-read",
    choices: ["6じ15ぷん", "6じ", "5じ15ぷん", "6じ30ぷん"],
    answer: "6じ15ぷん",
  },
];

export const sansuuG1Contents: Record<string, UnitContent> = {
  [U.numbersTo10]: {
    unitId: U.numbersTo10,
    learn: {
      unitId: U.numbersTo10,
      steps: [
        {
          heading: "かずをかぞえてみよう",
          body: "ものを ひとつずつ「1、2、3…」とゆびでさしながら かぞえると、いくつあるかわかるよ。",
          visual: { kind: "emoji", value: "🍎🍎🍎", caption: "りんごが 3こ" },
        },
        {
          heading: "10までのかず",
          body: "1 から 10 まで、じゅんばんに かぞえられるかな？ ブロックをならべると かずがめでみえるよ。",
          visual: { kind: "svg", name: "number-blocks", params: { count: 10 }, caption: "10この ブロック" },
        },
        {
          heading: "おおい・すくない",
          body: "ふたつのかずをくらべて、どちらがおおいか みてみよう。かずがおおきいほうが「おおい」だよ。",
          visual: { kind: "emoji", value: "🟦🟦🟦🟦🟥🟥", caption: "あおが おおい" },
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
          heading: "たしざんって なに？",
          body: "ふたつのかずを「あわせる」ことを たしざん というよ。「＋」のきごうをつかうよ。",
          visual: { kind: "emoji", value: "🍓🍓 ＋ 🍓 ＝ 🍓🍓🍓", caption: "2 ＋ 1 ＝ 3" },
        },
        {
          heading: "ブロックであわせよう",
          body: "3この ブロックと 2この ブロックを あわせると、ぜんぶで 5こ になるね。",
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
          heading: "ひきざんって なに？",
          body: "あるかずから「へらす」ことを ひきざん というよ。「−」のきごうをつかうよ。",
          visual: { kind: "emoji", value: "🍪🍪🍪🍪🍪 − 🍪🍪 ＝ 🍪🍪🍪", caption: "5 − 2 ＝ 3" },
        },
        {
          heading: "ブロックでへらそう",
          body: "7この ブロックから 3こ とると、のこりは 4こ になるね。",
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
          heading: "10のかたまり",
          body: "10こ あつまると「10のかたまり」になるよ。10と のこりのかずで 20までかぞえられるね。",
          visual: { kind: "svg", name: "number-blocks", params: { tens: 1, ones: 3 }, caption: "10と 3で 13" },
        },
        {
          heading: "11から20まで",
          body: "10のつぎは 11、12、13…と つづくよ。20まで じゅんばんにかぞえてみよう。",
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
          heading: "とけいのはり",
          body: "とけいには「みじかいはり（じ）」と「ながいはり（ぷん）」があるよ。みじかいはりで なんじか わかるよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 3, minute: 0 }, caption: "3じ ちょうど" },
        },
        {
          heading: "ながいはりをよもう",
          body: "ながいはりが 12 をさすと「ちょうど」、6 をさすと「30ぷん（はん）」だよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 8, minute: 30 }, caption: "8じ30ぷん" },
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
