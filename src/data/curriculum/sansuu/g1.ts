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
  {
    id: `${U.clockRead}.gen-4`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 1、{長|なが}い{針|はり}が 12 を {指|さ}しているので「1{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 1, minute: 0 }, caption: "1{時|じ}" },
    format: "clock-read",
    choices: ["1{時|じ}", "2{時|じ}", "12{時|じ}", "1{時|じ}30{分|ぷん}"],
    answer: "1{時|じ}",
  },
  {
    id: `${U.clockRead}.gen-5`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 5、{長|なが}い{針|はり}が 12 を {指|さ}しているので「5{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 5, minute: 0 }, caption: "5{時|じ}" },
    format: "clock-read",
    choices: ["5{時|じ}", "6{時|じ}", "4{時|じ}", "5{時|じ}30{分|ぷん}"],
    answer: "5{時|じ}",
  },
  {
    id: `${U.clockRead}.gen-6`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 9、{長|なが}い{針|はり}が 12 を {指|さ}しているので「9{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 9, minute: 0 }, caption: "9{時|じ}" },
    format: "clock-read",
    choices: ["9{時|じ}", "10{時|じ}", "8{時|じ}", "9{時|じ}30{分|ぷん}"],
    answer: "9{時|じ}",
  },
  {
    id: `${U.clockRead}.gen-7`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 12、{長|なが}い{針|はり}が 12 を {指|さ}しているので「12{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 12, minute: 0 }, caption: "12{時|じ}" },
    format: "clock-read",
    choices: ["12{時|じ}", "11{時|じ}", "1{時|じ}", "12{時|じ}30{分|ぷん}"],
    answer: "12{時|じ}",
  },
  {
    id: `${U.clockRead}.gen-8`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 7 の すこし{先|さき}、{長|なが}い{針|はり}が 6 を {指|さ}しているので「7{時|じ}30{分|ぷん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 7, minute: 30 }, caption: "7{時|じ}30{分|ぷん}" },
    format: "clock-read",
    choices: ["7{時|じ}30{分|ぷん}", "7{時|じ}", "8{時|じ}30{分|ぷん}", "6{時|じ}30{分|ぷん}"],
    answer: "7{時|じ}30{分|ぷん}",
  },
  {
    id: `${U.clockRead}.gen-9`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 10 の すこし{先|さき}、{長|なが}い{針|はり}が 6 を {指|さ}しているので「10{時|じ}30{分|ぷん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 10, minute: 30 }, caption: "10{時|じ}30{分|ぷん}" },
    format: "clock-read",
    choices: ["10{時|じ}30{分|ぷん}", "10{時|じ}", "11{時|じ}30{分|ぷん}", "9{時|じ}30{分|ぷん}"],
    answer: "10{時|じ}30{分|ぷん}",
  },
  {
    id: `${U.clockRead}.gen-10`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 4 の すこし{先|さき}、{長|なが}い{針|はり}が 6 を {指|さ}しているので「4{時|じ}30{分|ぷん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 4, minute: 30 }, caption: "4{時|じ}30{分|ぷん}" },
    format: "clock-read",
    choices: ["4{時|じ}30{分|ぷん}", "4{時|じ}", "5{時|じ}30{分|ぷん}", "3{時|じ}30{分|ぷん}"],
    answer: "4{時|じ}30{分|ぷん}",
  },
  {
    id: `${U.clockRead}.gen-11`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 2 の すこし{先|さき}、{長|なが}い{針|はり}が 3 を {指|さ}しているので「2{時|じ}15{分|ふん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 2, minute: 15 }, caption: "2{時|じ}15{分|ふん}" },
    format: "clock-read",
    choices: ["2{時|じ}15{分|ふん}", "2{時|じ}", "2{時|じ}30{分|ぷん}", "3{時|じ}15{分|ふん}"],
    answer: "2{時|じ}15{分|ふん}",
  },
  {
    id: `${U.clockRead}.gen-12`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 9 の すこし{先|さき}、{長|なが}い{針|はり}が 3 を {指|さ}しているので「9{時|じ}15{分|ふん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 9, minute: 15 }, caption: "9{時|じ}15{分|ふん}" },
    format: "clock-read",
    choices: ["9{時|じ}15{分|ふん}", "9{時|じ}", "9{時|じ}30{分|ぷん}", "8{時|じ}15{分|ふん}"],
    answer: "9{時|じ}15{分|ふん}",
  },
  {
    id: `${U.clockRead}.gen-13`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 11 の すこし{先|さき}、{長|なが}い{針|はり}が 3 を {指|さ}しているので「11{時|じ}15{分|ふん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 11, minute: 15 }, caption: "11{時|じ}15{分|ふん}" },
    format: "clock-read",
    choices: ["11{時|じ}15{分|ふん}", "11{時|じ}", "11{時|じ}30{分|ぷん}", "10{時|じ}15{分|ふん}"],
    answer: "11{時|じ}15{分|ふん}",
  },
  {
    id: `${U.clockRead}.gen-14`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 6、{長|なが}い{針|はり}が 12 を {指|さ}しているので「6{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 6, minute: 0 }, caption: "6{時|じ}" },
    format: "clock-read",
    choices: ["6{時|じ}", "7{時|じ}", "5{時|じ}", "6{時|じ}30{分|ぷん}"],
    answer: "6{時|じ}",
  },
  {
    id: `${U.clockRead}.gen-15`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 10、{長|なが}い{針|はり}が 12 を {指|さ}しているので「10{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 10, minute: 0 }, caption: "10{時|じ}" },
    format: "clock-read",
    choices: ["10{時|じ}", "11{時|じ}", "9{時|じ}", "10{時|じ}30{分|ぷん}"],
    answer: "10{時|じ}",
  },
  {
    id: `${U.clockRead}.gen-16`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 1 の すこし{先|さき}、{長|なが}い{針|はり}が 6 を {指|さ}しているので「1{時|じ}30{分|ぷん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 1, minute: 30 }, caption: "1{時|じ}30{分|ぷん}" },
    format: "clock-read",
    choices: ["1{時|じ}30{分|ぷん}", "1{時|じ}", "2{時|じ}30{分|ぷん}", "12{時|じ}30{分|ぷん}"],
    answer: "1{時|じ}30{分|ぷん}",
  },
  {
    id: `${U.clockRead}.gen-17`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 12 の すこし{先|さき}、{長|なが}い{針|はり}が 6 を {指|さ}しているので「12{時|じ}30{分|ぷん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 12, minute: 30 }, caption: "12{時|じ}30{分|ぷん}" },
    format: "clock-read",
    choices: ["12{時|じ}30{分|ぷん}", "12{時|じ}", "1{時|じ}30{分|ぷん}", "11{時|じ}30{分|ぷん}"],
    answer: "12{時|じ}30{分|ぷん}",
  },
  {
    id: `${U.clockRead}.gen-18`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 4 の すこし{先|さき}、{長|なが}い{針|はり}が 3 を {指|さ}しているので「4{時|じ}15{分|ふん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 4, minute: 15 }, caption: "4{時|じ}15{分|ふん}" },
    format: "clock-read",
    choices: ["4{時|じ}15{分|ふん}", "4{時|じ}", "4{時|じ}30{分|ぷん}", "5{時|じ}15{分|ふん}"],
    answer: "4{時|じ}15{分|ふん}",
  },
  {
    id: `${U.clockRead}.gen-19`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}{何|なん}{分|ぷん}？",
    explanation: "{短|みじか}い{針|はり}が 7 の すこし{先|さき}、{長|なが}い{針|はり}が 3 を {指|さ}しているので「7{時|じ}15{分|ふん}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 7, minute: 15 }, caption: "7{時|じ}15{分|ふん}" },
    format: "clock-read",
    choices: ["7{時|じ}15{分|ふん}", "7{時|じ}", "7{時|じ}30{分|ぷん}", "6{時|じ}15{分|ふん}"],
    answer: "7{時|じ}15{分|ふん}",
  },
  {
    id: `${U.clockRead}.gen-20`,
    unitId: U.clockRead,
    prompt: "{時計|とけい}は {何|なん}{時|じ}？",
    explanation: "{短|みじか}い{針|はり}が 2、{長|なが}い{針|はり}が 12 を {指|さ}しているので「2{時|じ}」だよ。",
    visual: { kind: "svg", name: "clock", params: { hour: 2, minute: 0 }, caption: "2{時|じ}" },
    format: "clock-read",
    choices: ["2{時|じ}", "3{時|じ}", "1{時|じ}", "2{時|じ}30{分|ぷん}"],
    answer: "2{時|じ}",
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
          body: "{物|もの}を {一|ひと}つずつ {指|ゆび}で {触|さわ}りながら「1、2、3…」と {声|こえ}に {出|だ}して {数|かぞ}えてみよう。{最後|さいご}に {言|い}った {数|かず}が、ぜんぶの {数|かず}だよ。りんごを {数|かぞ}えて さいごが「3」だったら、りんごは 3こ あるってこと。{急|いそ}がず ひとつずつ {指|さ}すのが こつだよ。",
          visual: { kind: "anim", name: "count-up", params: { to: 3, emoji: "🍎" }, caption: "1、2、3…りんごは 3こ" },
        },
        {
          heading: "1から10まで {順番|じゅんばん}に",
          body: "{数|かず}には {順番|じゅんばん}が あるよ。1、2、3、4、5、6、7、8、9、10。ブロックを {左|ひだり}から {一|ひと}つずつ {並|なら}べていくと、{数|かず}が {増|ふ}えていくのが {目|め}で {見|み}えるね。{指|ゆび}で {押|お}さえながら、{逆|ぎゃく}に 10、9、8…と もどる {数|かぞ}えかたも やってみよう。",
          visual: { kind: "anim", name: "count-up", params: { to: 10 }, caption: "1から10まで ならべたブロック" },
        },
        {
          heading: "なにも ないと「0（ゼロ）」",
          body: "お{皿|さら}に なにも {乗|の}っていないとき、{数|かず}は「0（ゼロ）」だよ。0は「ひとつも ない」という {意味|いみ}。たべて なくなったら 0こ、と {言|い}うんだ。1より {小|ちい}さい {数|かず}だね。",
          visual: { kind: "emoji", value: "🍽️", caption: "おさらは からっぽ＝0こ" },
        },
        {
          heading: "どっちが {多|おお}い？",
          body: "{二|ふた}つの {数|かず}を {比|くら}べてみよう。{並|なら}べたとき、{数|かず}が {大|おお}きいほうが「{多|おお}い」、{小|ちい}さいほうが「{少|すく}ない」だよ。{青|あお}が 4こ、{赤|あか}が 2こ なら、{青|あお}のほうが {多|おお}いね。{数|かず}が {同|おな}じときは「{同|おな}じ {数|かず}」と {言|い}うよ。",
          visual: { kind: "emoji", value: "🟦🟦🟦🟦\n🟥🟥", caption: "{青|あお}4こ ＞ {赤|あか}2こ" },
        },
      ],
    },
    test: {
      unitId: U.numbersTo10,
      generatorId: "sansuu.count-within-10",
      questionCount: 20,
    },
  },

  [U.addWithin10]: {
    unitId: U.addWithin10,
    learn: {
      unitId: U.addWithin10,
      steps: [
        {
          heading: "{足|た}し{算|ざん}って なに？",
          body: "{二|ふた}つの {数|かず}を「{合|あ}わせて ひとつにする」ことを {足|た}し{算|ざん}と {言|い}うよ。{合|あ}わせるときは「＋（プラス）」、{答|こた}えの {前|まえ}には「＝（イコール）」を {書|か}くよ。いちごが 2こ あって、もう 1こ もらったら、{合|あ}わせて 3こ。これを「2 ＋ 1 ＝ 3」と {書|か}くんだ。",
          visual: { kind: "anim", name: "blocks-add", params: { left: 2, right: 1 }, caption: "2 ＋ 1 ＝ 3" },
        },
        {
          heading: "ブロックで {合|あ}わせよう",
          body: "{左|ひだり}に 3こ、{右|みぎ}に 2この ブロックを {置|お}いて、{両方|りょうほう}を {寄|よ}せてみよう。{一|ひと}つに まとめてから {数|かぞ}えなおすと 5こ。{物|もの}を {寄|よ}せて {数|かぞ}えると、{足|た}し{算|ざん}の {答|こた}えが わかるよ。「3 ＋ 2 ＝ 5」だね。",
          visual: { kind: "anim", name: "blocks-add", params: { left: 3, right: 2 }, caption: "3 ＋ 2 ＝ 5" },
        },
        {
          heading: "{後|あと}から {数|かぞ}えると {速|はや}い",
          body: "{大|おお}きいほうの {数|かず}から {続|つづ}けて {数|かぞ}えると {速|はや}いよ。「4 ＋ 3」なら、4を {覚|おぼ}えておいて「5、6、7」と 3つ {進|すす}めば {答|こた}えは 7。ぜんぶ 1から {数|かぞ}えなおさなくても いいんだ。{指|ゆび}を 3{本|ぼん} {立|た}てて {進|すす}むと {数|かぞ}えやすいよ。",
          visual: { kind: "anim", name: "count-up", params: { from: 4, to: 7 }, caption: "4から 3つ すすんで 7" },
        },
        {
          heading: "{順番|じゅんばん}を かえても {同|おな}じ",
          body: "{足|た}し{算|ざん}は {順番|じゅんばん}を {入|い}れかえても {答|こた}えは {同|おな}じだよ。「2 ＋ 5」も「5 ＋ 2」も どちらも 7。だから {数|かぞ}えやすいように {大|おお}きいほうを {先|さき}にすると らくちん。それと、0を {足|た}しても {数|かず}は かわらないよ（「6 ＋ 0 ＝ 6」）。",
          visual: { kind: "emoji", value: "2＋5 ＝ 5＋2 ＝ 7", caption: "いれかえても おなじ 7" },
        },
      ],
    },
    test: {
      unitId: U.addWithin10,
      generatorId: "sansuu.addition-within-10",
      questionCount: 20,
    },
  },

  [U.subWithin10]: {
    unitId: U.subWithin10,
    learn: {
      unitId: U.subWithin10,
      steps: [
        {
          heading: "{引|ひ}き{算|ざん}って なに？",
          body: "ある {数|かず}から「{取|と}って {減|へ}らす」ことを {引|ひ}き{算|ざん}と {言|い}うよ。{減|へ}らすときは「−（マイナス）」を {使|つか}うよ。クッキーが 5こ あって 2こ {食|た}べたら、{残|のこ}りは 3こ。これを「5 − 2 ＝ 3」と {書|か}くんだ。",
          visual: { kind: "anim", name: "blocks-remove", params: { total: 5, remove: 2 }, caption: "5 − 2 ＝ 3" },
        },
        {
          heading: "ブロックで {減|へ}らそう",
          body: "7この ブロックを {並|なら}べて、そこから 3こ {手|て}で {取|と}りのけてみよう。{残|のこ}ったブロックを {数|かぞ}えると 4こ。{取|と}ったあとに {残|のこ}っている {数|かず}が {引|ひ}き{算|ざん}の {答|こた}えだよ。「7 − 3 ＝ 4」だね。",
          visual: { kind: "anim", name: "blocks-remove", params: { total: 7, remove: 3 }, caption: "7 − 3 ＝ 4" },
        },
        {
          heading: "ちがいを {比|くら}べる {引|ひ}き{算|ざん}",
          body: "「どちらが いくつ {多|おお}い？」も {引|ひ}き{算|ざん}で わかるよ。{赤|あか}が 6こ、{青|あお}が 4こ なら、{二|ふた}つを {並|なら}べて {比|くら}べると {赤|あか}が 2こ {多|おお}い。これは「6 − 4 ＝ 2」。{減|へ}らすだけでなく、{二|ふた}つの ちがいを {知|し}るときにも {使|つか}うんだ。",
          visual: { kind: "emoji", value: "🔴🔴🔴🔴🔴🔴\n🔵🔵🔵🔵", caption: "ちがいは 2こ（6−4）" },
        },
        {
          heading: "{足|た}し{算|ざん}と なかよし",
          body: "{引|ひ}き{算|ざん}は {足|た}し{算|ざん}の はんたいだよ。「3 ＋ 2 ＝ 5」なら「5 − 2 ＝ 3」。だから {答|こた}えに、{引|ひ}いた {数|かず}を {足|た}してもどせば、{合|あ}っているか たしかめられるよ。それと、{全部|ぜんぶ} {取|と}ると 0、なにも {取|と}らないと {数|かず}は そのまま（「5 − 0 ＝ 5」）。",
          visual: { kind: "emoji", value: "5−2＝3 ⇄ 3＋2＝5", caption: "ひきざんと たしざんは なかよし" },
        },
      ],
    },
    test: {
      unitId: U.subWithin10,
      generatorId: "sansuu.subtraction-within-10",
      questionCount: 20,
    },
  },

  [U.numbersTo20]: {
    unitId: U.numbersTo20,
    learn: {
      unitId: U.numbersTo20,
      steps: [
        {
          heading: "10の かたまりを つくろう",
          body: "10こ {集|あつ}まると「10の かたまり」が 1つ できるよ。10より {大|おお}きい {数|かず}は、この 10の かたまりと、{残|のこ}りの ばらの {数|かず}で {表|あらわ}せるんだ。10の かたまりが 1つと、ばらが 3こ なら 13だよ。",
          visual: { kind: "svg", name: "number-blocks", params: { tens: 1, ones: 3 }, caption: "10と 3で 13" },
        },
        {
          heading: "11から20まで {数|かぞ}えよう",
          body: "10の {次|つぎ}は 11、12、13、14、15、16、17、18、19、そして 20。「じゅういち、じゅうに…」と {読|よ}むよ。みんな「{十|じゅう}（10）」に ばらの {数|かず}を つけた {言|い}いかたなんだ。20は 10の かたまりが ちょうど 2つ だよ。",
          visual: { kind: "emoji", value: "🔟 ＋ 🔟 ＝ 20", caption: "10の かたまり 2つで 20" },
        },
        {
          heading: "「10と いくつ」で {考|かんが}える",
          body: "20までの {数|かず}は「10と いくつ」と {分|わ}けて {考|かんが}えると わかりやすいよ。16は「10と 6」、18は「10と 8」。くらいに {分|わ}けると、{大|おお}きい {数|かず}も こわくないね。{足|た}し{算|ざん}や {引|ひ}き{算|ざん}のときも この {分|わ}けかたが {役|やく}に {立|た}つよ。",
          visual: { kind: "svg", name: "number-blocks", params: { tens: 1, ones: 6 }, caption: "10と 6で 16" },
        },
        {
          heading: "{数|かず}の {大小|だいしょう}を {比|くら}べよう",
          body: "20までの {数|かず}も {順番|じゅんばん}に {並|なら}んでいるよ。{後|あと}に {出|で}てくる {数|かず}ほど {大|おお}きいんだ。だから 14は 11より {大|おお}きくて、17より {小|ちい}さい。まよったら、まず 10の かたまりの {数|かず}を {見|み}て、{同|おな}じなら ばらの {数|かず}を {比|くら}べよう。",
          visual: { kind: "emoji", value: "11 ＜ 14 ＜ 17", caption: "あとの かずほど {大|おお}きい" },
        },
      ],
    },
    test: {
      unitId: U.numbersTo20,
      generatorId: "sansuu.count-within-20",
      questionCount: 20,
    },
  },

  [U.clockRead]: {
    unitId: U.clockRead,
    learn: {
      unitId: U.clockRead,
      steps: [
        {
          heading: "{時計|とけい}には {針|はり}が 2{本|ほん}",
          body: "{時計|とけい}には「{短|みじか}い{針|はり}」と「{長|なが}い{針|はり}」が あるよ。{短|みじか}い{針|はり}は {何|なん}{時|じ}かを、{長|なが}い{針|はり}は {何|なん}{分|ぷん}かを {教|おし}えてくれるんだ。まわりの {数字|すうじ}は 1から 12まで、{順番|じゅんばん}に {並|なら}んでいるよ。",
          visual: { kind: "svg", name: "clock", params: { hour: 3, minute: 0 }, caption: "{短|みじか}い{針|はり}＝3、{長|なが}い{針|はり}＝12" },
        },
        {
          heading: "{短|みじか}い{針|はり}で「{何|なん}{時|じ}」を {読|よ}む",
          body: "まず {短|みじか}い{針|はり}が さしている {数字|すうじ}を {見|み}よう。{長|なが}い{針|はり}が 12を さしているとき、{短|みじか}い{針|はり}の {数字|すうじ}が そのまま「◯{時|じ} ちょうど」だよ。{短|みじか}い{針|はり}が 3、{長|なが}い{針|はり}が 12なら「3{時|じ}」だね。",
          visual: { kind: "anim", name: "clock-tick", params: { hour: 3, minute: 0 }, caption: "3{時|じ} ちょうど" },
        },
        {
          heading: "{長|なが}い{針|はり}が 6なら「30{分|ぷん}」",
          body: "{長|なが}い{針|はり}が ちょうど 6を さすと「30{分|ぷん}（はん）」だよ。このとき {短|みじか}い{針|はり}は {数字|すうじ}と {数字|すうじ}の あいだに きているね。{短|みじか}い{針|はり}が 8の すこし {先|さき}、{長|なが}い{針|はり}が 6なら「8{時|じ}30{分|ぷん}」と {読|よ}むよ。",
          visual: { kind: "anim", name: "clock-tick", params: { hour: 8, minute: 30 }, caption: "8{時|じ}30{分|ぷん}（はん）" },
        },
        {
          heading: "{長|なが}い{針|はり}が 3なら「15{分|ふん}」",
          body: "{長|なが}い{針|はり}は {右|みぎ}まわりに {進|すす}むよ。1めもりで 5{分|ふん}、3を さすと 5、10、15で「15{分|ふん}」だね。12に もどると つぎの {時間|じかん}に なるんだ。{短|みじか}い{針|はり}が 6の すこし {先|さき}、{長|なが}い{針|はり}が 3なら「6{時|じ}15{分|ふん}」だよ。",
          visual: { kind: "anim", name: "clock-tick", params: { hour: 6, minute: 15 }, caption: "6{時|じ}15{分|ふん}" },
        },
      ],
    },
    test: {
      unitId: U.clockRead,
      questions: clockQuestions,
      questionCount: 20,
    },
  },
};
