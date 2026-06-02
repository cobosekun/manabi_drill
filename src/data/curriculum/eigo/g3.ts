// ══════════════════════════════════════════
// カリキュラム: 英語（えいご）小3（外国語活動・中学年）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 英語は外国語活動として「聞く・話す（やりとり）」中心。テストは4択の確認形式。
// 英単語は「表記（よみがな）」で提示し、解説は日本語ひらがな中心。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const eigoSubject: Subject = {
  id: "eigo",
  name: "えいご",
  formalName: "英語（外国語活動）",
  emoji: "🔤",
  theme: "rose",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// 外国語活動（中学年）は「言語材料・表現」を体験的に学ぶ。
// 領域は実用テーマで分ける（あいさつ・文字・かず／いろ・きもち・すきなもの）。

export const eigoG3Domains: Domain[] = [
  {
    id: "eigo.communication",
    subjectId: "eigo",
    name: "あいさつとやりとり",
    formalName: "コミュニケーション（あいさつ・自己表現）",
  },
  {
    id: "eigo.letters",
    subjectId: "eigo",
    name: "アルファベット",
    formalName: "文字（大文字）",
  },
  {
    id: "eigo.words",
    subjectId: "eigo",
    name: "ことば（かず・いろ）",
    formalName: "語彙（数・色）",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺に DAG 化）:
//
//   greetings ──┬─▶ feelings ──▶ likes
//               └─▶ likes
//   alphabet（独立した土台）
//   numbers（独立）
//   colors ─────────────────────▶ likes
//
const U = {
  greetings: "eigo.g3.greetings",
  alphabet: "eigo.g3.alphabet-uppercase",
  numbers: "eigo.g3.numbers-1-20",
  colors: "eigo.g3.colors",
  feelings: "eigo.g3.feelings",
  likes: "eigo.g3.likes",
} as const;

export const eigoG3Units: Unit[] = [
  {
    id: U.greetings,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.communication",
    title: "あいさつ（Hello！）",
    order: 1,
    realWorldUse: "あさ ともだちや せんせいに あうとき「Hello！」と えいごで あいさつできるよ。",
    leadsTo: [U.feelings, U.likes],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.alphabet,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.letters",
    title: "アルファベット（大文字）",
    order: 2,
    realWorldUse: "かんばんや おみせの ロゴ、ローマじで かいた なまえを よむときに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.numbers,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.words",
    title: "かず（1〜20）",
    order: 3,
    realWorldUse: "えいごの うたや ゲームで かずを かぞえたり、いくつ あるかを つたえるときに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.colors,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.words",
    title: "いろ（colors）",
    order: 4,
    realWorldUse: "すきな いろを えいごで いえると、ぬりえや おみせで「これが ほしい」と つたえられるよ。",
    leadsTo: [U.likes],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.feelings,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.communication",
    title: "きぶん（How are you？）",
    order: 5,
    realWorldUse: "ともだちに「How are you？」と きかれたら、きょうの きぶんを こたえられるよ。",
    leadsTo: [],
    prerequisites: [U.greetings],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.likes,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.communication",
    title: "すきなもの（I like〜）",
    order: 6,
    realWorldUse: "じぶんの すきな たべものや どうぶつを「I like 〜.」で ともだちに つたえられるよ。",
    leadsTo: [],
    prerequisites: [U.greetings, U.colors],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は日本語ひらがな中心。

// あいさつ
const greetingsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.greetings}.q-1`,
    unitId: U.greetings,
    prompt: "あさ ひとに あうとき、えいごで なんと いうかな？",
    explanation: "「Hello（ハロー）」は あうときの あいさつだよ。あさでも ひるでも つかえるよ。",
    visual: { kind: "emoji", value: "🙋👋", caption: "やあ！" },
    format: "choice",
    choices: ["Hello", "Goodbye", "Sorry", "Good night"],
    answer: "Hello",
  },
  {
    id: `${U.greetings}.q-2`,
    unitId: U.greetings,
    prompt: "「さようなら」と わかれるとき、えいごで なんと いうかな？",
    explanation: "「Goodbye（グッバイ）」は わかれるときの あいさつだよ。みじかく「Bye（バイ）」とも いうよ。",
    visual: { kind: "emoji", value: "👋🚪", caption: "またね！" },
    format: "choice",
    choices: ["Goodbye", "Hello", "Thank you", "Yes"],
    answer: "Goodbye",
  },
  {
    id: `${U.greetings}.q-3`,
    unitId: U.greetings,
    prompt: "なにか して もらって「ありがとう」と いうとき、えいごでは？",
    explanation: "「Thank you（サンキュー）」は おれいの ことばだよ。たすけて もらったら つかおう。",
    visual: { kind: "emoji", value: "🎁🙏", caption: "ありがとう" },
    format: "choice",
    choices: ["Thank you", "Hello", "Goodbye", "Please"],
    answer: "Thank you",
  },
  {
    id: `${U.greetings}.q-4`,
    unitId: U.greetings,
    prompt: "「ごめんね」と あやまるとき、えいごで なんと いうかな？",
    explanation: "「Sorry（ソーリー）」は あやまる ことばだよ。わるいことを したら つかおう。",
    visual: { kind: "emoji", value: "🙇💦", caption: "ごめんね" },
    format: "choice",
    choices: ["Sorry", "Thank you", "Hello", "Good"],
    answer: "Sorry",
  },
  {
    id: `${U.greetings}.q-5`,
    unitId: U.greetings,
    prompt: "じぶんの なまえを いう「I'm Ken.」の いみは？",
    explanation: "「I'm（アイム）」は「わたしは〜です」の いみ。「I'm Ken.」で「わたしは ケンです」だよ。",
    visual: { kind: "emoji", value: "🧒✨", caption: "わたしは…" },
    format: "choice",
    choices: ["わたしは ケンです", "ケンが すき", "ケン、こんにちは", "ケンは どこ？"],
    answer: "わたしは ケンです",
  },
];

// アルファベット（大文字）
const alphabetQuestions: ChoiceQuestion[] = [
  {
    id: `${U.alphabet}.q-1`,
    unitId: U.alphabet,
    prompt: "アルファベットの いちばん さいしょの もじは どれ？",
    explanation: "アルファベットは A から はじまるよ。A・B・C…と じゅんばんに ならぶよ。",
    visual: { kind: "emoji", value: "🅰️", caption: "さいしょは A" },
    format: "choice",
    choices: ["A", "B", "Z", "S"],
    answer: "A",
  },
  {
    id: `${U.alphabet}.q-2`,
    unitId: U.alphabet,
    prompt: "「B」の つぎの もじは どれ？",
    explanation: "A・B・C の じゅんばんだから、B の つぎは C だよ。",
    visual: { kind: "emoji", value: "🔤", caption: "A B C…" },
    format: "choice",
    choices: ["C", "A", "D", "E"],
    answer: "C",
  },
  {
    id: `${U.alphabet}.q-3`,
    unitId: U.alphabet,
    prompt: "「apple（りんご）」の さいしょの もじは どれ？",
    explanation: "apple は エイ・ピー…と よむよ。さいしょの おとは A だね。",
    visual: { kind: "emoji", value: "🍎", caption: "apple" },
    format: "choice",
    choices: ["A", "P", "E", "O"],
    answer: "A",
  },
  {
    id: `${U.alphabet}.q-4`,
    unitId: U.alphabet,
    prompt: "アルファベットは ぜんぶで なんもじ あるかな？",
    explanation: "アルファベットは A から Z まで、ぜんぶで 26もじ あるよ。",
    visual: { kind: "emoji", value: "🔡", caption: "A〜Z" },
    format: "choice",
    choices: ["26もじ", "10もじ", "50もじ", "20もじ"],
    answer: "26もじ",
  },
  {
    id: `${U.alphabet}.q-5`,
    unitId: U.alphabet,
    prompt: "アルファベットの いちばん さいごの もじは どれ？",
    explanation: "アルファベットは Z で おわるよ。…X・Y・Z が さいごの 3つだよ。",
    visual: { kind: "emoji", value: "💤", caption: "さいごは Z" },
    format: "choice",
    choices: ["Z", "A", "Y", "W"],
    answer: "Z",
  },
];

// かず（1〜20）
const numbersQuestions: ChoiceQuestion[] = [
  {
    id: `${U.numbers}.q-1`,
    unitId: U.numbers,
    prompt: "「three（スリー）」は いくつ かな？",
    explanation: "three は 3 のことだよ。one・two・three で 1・2・3 だね。",
    visual: { kind: "emoji", value: "3️⃣", caption: "three" },
    format: "choice",
    choices: ["3", "2", "5", "8"],
    answer: "3",
  },
  {
    id: `${U.numbers}.q-2`,
    unitId: U.numbers,
    prompt: "「5」は えいごで なんと いうかな？",
    explanation: "5 は「five（ファイブ）」だよ。てを ひらくと ゆびが 5ほん だね。",
    visual: { kind: "emoji", value: "🖐️", caption: "5" },
    format: "choice",
    choices: ["five", "four", "nine", "ten"],
    answer: "five",
  },
  {
    id: `${U.numbers}.q-3`,
    unitId: U.numbers,
    prompt: "「ten（テン）」は いくつ かな？",
    explanation: "ten は 10 のことだよ。りょうての ゆびを ぜんぶ あわせると 10 だね。",
    visual: { kind: "emoji", value: "🔟", caption: "ten" },
    format: "choice",
    choices: ["10", "1", "12", "20"],
    answer: "10",
  },
  {
    id: `${U.numbers}.q-4`,
    unitId: U.numbers,
    prompt: "「8」は えいごで なんと いうかな？",
    explanation: "8 は「eight（エイト）」だよ。six・seven・eight で 6・7・8 だね。",
    visual: { kind: "emoji", value: "8️⃣", caption: "8" },
    format: "choice",
    choices: ["eight", "six", "seven", "nine"],
    answer: "eight",
  },
  {
    id: `${U.numbers}.q-5`,
    unitId: U.numbers,
    prompt: "「20」は えいごで なんと いうかな？",
    explanation: "20 は「twenty（トゥエンティ）」だよ。1〜20 の いちばん おおきい かずだね。",
    visual: { kind: "emoji", value: "🎉", caption: "20" },
    format: "choice",
    choices: ["twenty", "twelve", "ten", "two"],
    answer: "twenty",
  },
];

// いろ（colors）
const colorsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.colors}.q-1`,
    unitId: U.colors,
    prompt: "「red（レッド）」は なにいろ かな？",
    explanation: "red は あかいろ だよ。りんごや いちごの いろだね。",
    visual: { kind: "emoji", value: "🔴", caption: "red" },
    format: "choice",
    choices: ["あか", "あお", "きいろ", "みどり"],
    answer: "あか",
  },
  {
    id: `${U.colors}.q-2`,
    unitId: U.colors,
    prompt: "「あお」は えいごで なんと いうかな？",
    explanation: "あおは「blue（ブルー）」だよ。そらや うみの いろだね。",
    visual: { kind: "emoji", value: "🔵", caption: "あお" },
    format: "choice",
    choices: ["blue", "red", "green", "black"],
    answer: "blue",
  },
  {
    id: `${U.colors}.q-3`,
    unitId: U.colors,
    prompt: "「yellow（イエロー）」は なにいろ かな？",
    explanation: "yellow は きいろ だよ。バナナや たいようの いろだね。",
    visual: { kind: "emoji", value: "🟡", caption: "yellow" },
    format: "choice",
    choices: ["きいろ", "しろ", "あか", "あお"],
    answer: "きいろ",
  },
  {
    id: `${U.colors}.q-4`,
    unitId: U.colors,
    prompt: "「みどり」は えいごで なんと いうかな？",
    explanation: "みどりは「green（グリーン）」だよ。はっぱや くさの いろだね。",
    visual: { kind: "emoji", value: "🟢", caption: "みどり" },
    format: "choice",
    choices: ["green", "yellow", "blue", "red"],
    answer: "green",
  },
  {
    id: `${U.colors}.q-5`,
    unitId: U.colors,
    prompt: "「white（ホワイト）」は なにいろ かな？",
    explanation: "white は しろ だよ。ゆきや くもの いろだね。",
    visual: { kind: "emoji", value: "⚪", caption: "white" },
    format: "choice",
    choices: ["しろ", "くろ", "あか", "みどり"],
    answer: "しろ",
  },
];

// きぶん（How are you？）
const feelingsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.feelings}.q-1`,
    unitId: U.feelings,
    prompt: "「How are you？」の いみは どれ かな？",
    explanation: "「How are you？（ハウ アー ユー）」は「げんき？／ちょうしは どう？」と きく ことばだよ。",
    visual: { kind: "emoji", value: "🤔💬", caption: "How are you？" },
    format: "choice",
    choices: ["げんき？", "なまえは なに？", "なんさい？", "どこに いるの？"],
    answer: "げんき？",
  },
  {
    id: `${U.feelings}.q-2`,
    unitId: U.feelings,
    prompt: "げんきな ときの こたえ「I'm fine.」の いみは？",
    explanation: "「fine（ファイン）」は「げんき・だいじょうぶ」だよ。「I'm fine.」で「げんきだよ」だね。",
    visual: { kind: "emoji", value: "😄👍", caption: "I'm fine!" },
    format: "choice",
    choices: ["げんきだよ", "かなしいよ", "ねむいよ", "おこってるよ"],
    answer: "げんきだよ",
  },
  {
    id: `${U.feelings}.q-3`,
    unitId: U.feelings,
    prompt: "「happy（ハッピー）」は どんな きもち かな？",
    explanation: "happy は「うれしい・たのしい」きもち だよ。にこにこ している ときだね。",
    visual: { kind: "emoji", value: "😊", caption: "happy" },
    format: "choice",
    choices: ["うれしい", "かなしい", "おこってる", "こわい"],
    answer: "うれしい",
  },
  {
    id: `${U.feelings}.q-4`,
    unitId: U.feelings,
    prompt: "「sad（サッド）」は どんな きもち かな？",
    explanation: "sad は「かなしい」きもち だよ。なみだが でそうな ときだね。",
    visual: { kind: "emoji", value: "😢", caption: "sad" },
    format: "choice",
    choices: ["かなしい", "うれしい", "ねむい", "おなかすいた"],
    answer: "かなしい",
  },
  {
    id: `${U.feelings}.q-5`,
    unitId: U.feelings,
    prompt: "「I'm hungry.」の いみは どれ かな？",
    explanation: "hungry（ハングリー）は「おなかが すいた」だよ。ごはんが たべたい ときだね。",
    visual: { kind: "emoji", value: "🍽️😋", caption: "hungry" },
    format: "choice",
    choices: ["おなかが すいた", "のどが かわいた", "ねむい", "うれしい"],
    answer: "おなかが すいた",
  },
];

// すきなもの（I like〜）
const likesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.likes}.q-1`,
    unitId: U.likes,
    prompt: "「I like 〜.」の いみは どれ かな？",
    explanation: "「I like（アイ ライク）〜.」は「わたしは 〜が すき」だよ。すきな ものを いえるね。",
    visual: { kind: "emoji", value: "❤️", caption: "I like…" },
    format: "choice",
    choices: ["わたしは 〜が すき", "わたしは 〜が きらい", "〜は どこ？", "〜が ほしい？"],
    answer: "わたしは 〜が すき",
  },
  {
    id: `${U.likes}.q-2`,
    unitId: U.likes,
    prompt: "「I like dogs.」の いみは どれ かな？",
    explanation: "dogs（ドッグズ）は いぬ のこと。「I like dogs.」で「いぬが すき」だよ。",
    visual: { kind: "emoji", value: "🐶", caption: "dogs" },
    format: "choice",
    choices: ["いぬが すき", "ねこが すき", "いぬが こわい", "いぬが いない"],
    answer: "いぬが すき",
  },
  {
    id: `${U.likes}.q-3`,
    unitId: U.likes,
    prompt: "すきな たべものを いうとき、どの ことばで はじめる かな？",
    explanation: "すきな ものは「I like 〜.」で つたえるよ。「I like apples.」で「りんごが すき」だね。",
    visual: { kind: "emoji", value: "🍎😋", caption: "I like apples." },
    format: "choice",
    choices: ["I like", "Goodbye", "Thank you", "How are you"],
    answer: "I like",
  },
  {
    id: `${U.likes}.q-4`,
    unitId: U.likes,
    prompt: "「Do you like blue？」の いみは どれ かな？",
    explanation: "「Do you like 〜？（ドゥ ユー ライク）」は「〜が すき？」と あいてに きく ことばだよ。",
    visual: { kind: "emoji", value: "🔵❓", caption: "Do you like blue？" },
    format: "choice",
    choices: ["あおが すき？", "あおが きらい", "あおを ください", "あおは どこ？"],
    answer: "あおが すき？",
  },
  {
    id: `${U.likes}.q-5`,
    unitId: U.likes,
    prompt: "「すき？」と きかれて「うん、すき」と こたえるのは どれ？",
    explanation: "「Yes, I do.（イエス アイ ドゥ）」で「うん、すきだよ」と こたえられるよ。",
    visual: { kind: "emoji", value: "🙆✨", caption: "Yes, I do!" },
    format: "choice",
    choices: ["Yes, I do.", "No, thank you.", "Goodbye.", "Sorry."],
    answer: "Yes, I do.",
  },
];

export const eigoG3Contents: Record<string, UnitContent> = {
  [U.greetings]: {
    unitId: U.greetings,
    learn: {
      unitId: U.greetings,
      steps: [
        {
          heading: "あいさつって なに？",
          body: "ひとに あったとき えいごでは「Hello（ハロー）」と いうよ。えがおで いってみよう。",
          visual: { kind: "emoji", value: "🙋👋", caption: "Hello！" },
        },
        {
          heading: "いろいろな あいさつ",
          body: "わかれるときは「Goodbye（グッバイ）」、おれいは「Thank you（サンキュー）」、あやまるときは「Sorry（ソーリー）」だよ。",
          visual: { kind: "emoji", value: "👋🙏🙇", caption: "Goodbye / Thank you / Sorry" },
        },
        {
          heading: "なまえを いってみよう",
          body: "「I'm 〜.（アイム）」で「わたしは 〜です」。「I'm Ken.」で「わたしは ケンです」だよ。",
          visual: { kind: "emoji", value: "🧒✨", caption: "I'm Ken." },
        },
      ],
    },
    test: {
      unitId: U.greetings,
      questions: greetingsQuestions,
      questionCount: 5,
    },
  },

  [U.alphabet]: {
    unitId: U.alphabet,
    learn: {
      unitId: U.alphabet,
      steps: [
        {
          heading: "アルファベットって なに？",
          body: "えいごの もじを アルファベット というよ。A から Z まで、ぜんぶで 26もじ あるよ。",
          visual: { kind: "emoji", value: "🔤", caption: "A B C … Z" },
        },
        {
          heading: "じゅんばんを おぼえよう",
          body: "A・B・C・D…と じゅんばんが きまっているよ。うたに のせて よむと おぼえやすいよ。",
          visual: { kind: "emoji", value: "🎵🔡", caption: "ABCのうた" },
        },
        {
          heading: "みのまわりの もじ",
          body: "かんばんや ロゴにも アルファベットの 大文字が つかわれているよ。さがしてみよう。",
          visual: { kind: "emoji", value: "🚌🏪", caption: "BUS / OPEN" },
        },
      ],
    },
    test: {
      unitId: U.alphabet,
      questions: alphabetQuestions,
      questionCount: 5,
    },
  },

  [U.numbers]: {
    unitId: U.numbers,
    learn: {
      unitId: U.numbers,
      steps: [
        {
          heading: "1から10まで",
          body: "one(1)・two(2)・three(3)・four(4)・five(5)…と かぞえるよ。ゆびで かぞえてみよう。",
          visual: { kind: "svg", name: "number-blocks", params: { count: 10 }, caption: "1〜10" },
        },
        {
          heading: "11から20まで",
          body: "ten(10)の つぎは eleven(11)・twelve(12)…twenty(20) と つづくよ。",
          visual: { kind: "emoji", value: "🔟➡️🎉", caption: "10 → 20" },
        },
        {
          heading: "つかってみよう",
          body: "「How many？（ハウ メニー）」は「いくつ？」。かずを えいごで こたえてみよう。",
          visual: { kind: "emoji", value: "🍎🍎🍎", caption: "three apples" },
        },
      ],
    },
    test: {
      unitId: U.numbers,
      questions: numbersQuestions,
      questionCount: 5,
    },
  },

  [U.colors]: {
    unitId: U.colors,
    learn: {
      unitId: U.colors,
      steps: [
        {
          heading: "いろの えいご",
          body: "あか=red、あお=blue、きいろ=yellow、みどり=green だよ。みのまわりの いろを いってみよう。",
          visual: { kind: "emoji", value: "🔴🔵🟡🟢", caption: "red / blue / yellow / green" },
        },
        {
          heading: "もっと いろ",
          body: "しろ=white、くろ=black、ピンク=pink、オレンジ=orange だよ。すきな いろは どれ？",
          visual: { kind: "emoji", value: "⚪⚫🌸🟠", caption: "white / black / pink / orange" },
        },
        {
          heading: "つかってみよう",
          body: "「What color？（ワット カラー）」は「なにいろ？」。「It's red.」で「あかだよ」と こたえられるよ。",
          visual: { kind: "emoji", value: "🌈", caption: "What color？" },
        },
      ],
    },
    test: {
      unitId: U.colors,
      questions: colorsQuestions,
      questionCount: 5,
    },
  },

  [U.feelings]: {
    unitId: U.feelings,
    learn: {
      unitId: U.feelings,
      steps: [
        {
          heading: "How are you？",
          body: "「How are you？（ハウ アー ユー）」は「げんき？」と きく ことばだよ。あいさつの つぎに よく つかうよ。",
          visual: { kind: "emoji", value: "🤔💬", caption: "How are you？" },
        },
        {
          heading: "きぶんを こたえよう",
          body: "「I'm fine.」げんき、「I'm happy.」うれしい、「I'm sad.」かなしい、「I'm sleepy.」ねむい だよ。",
          visual: { kind: "emoji", value: "😄😊😢😴", caption: "fine / happy / sad / sleepy" },
        },
        {
          heading: "やりとりして みよう",
          body: "「How are you？」「I'm happy！」のように、きかれたら じぶんの きぶんを いってみよう。",
          visual: { kind: "emoji", value: "🙋😊", caption: "I'm happy!" },
        },
      ],
    },
    test: {
      unitId: U.feelings,
      questions: feelingsQuestions,
      questionCount: 5,
    },
  },

  [U.likes]: {
    unitId: U.likes,
    learn: {
      unitId: U.likes,
      steps: [
        {
          heading: "I like 〜.",
          body: "「I like 〜.（アイ ライク）」は「わたしは 〜が すき」だよ。すきな ものを つたえられるね。",
          visual: { kind: "emoji", value: "❤️", caption: "I like …" },
        },
        {
          heading: "すきな ものを いおう",
          body: "「I like dogs.」いぬが すき、「I like apples.」りんごが すき、「I like blue.」あおが すき だよ。",
          visual: { kind: "emoji", value: "🐶🍎🔵", caption: "dogs / apples / blue" },
        },
        {
          heading: "あいてに きいて みよう",
          body: "「Do you like 〜？」は「〜が すき？」。「Yes, I do.」うん／「No, I don't.」ううん で こたえるよ。",
          visual: { kind: "emoji", value: "🙆🙅", caption: "Yes, I do. / No, I don't." },
        },
      ],
    },
    test: {
      unitId: U.likes,
      questions: likesQuestions,
      questionCount: 5,
    },
  },
};
