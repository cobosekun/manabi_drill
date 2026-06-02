// ══════════════════════════════════════════
// カリキュラム: 英語（えいご）小5（外国語・高学年・教科）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 高学年の外国語（教科）は「聞く・話す＋読む・書く」へ。テストは4択の確認形式。
// 英単語は「表記（よみがな）」で提示し、解説は日本語ひらがな中心。
// prerequisites は小3・小4単元（eigo.g3.* / eigo.g4.*）を跨いで参照する（学年間ロードマップ）。
// 集約は中央（index.ts）で行うため、subject/domain の重複は中央側で id 重複排除する想定。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// g3 / g4 と同一の教科定義（中央集約時に id で重複排除される前提）。

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
// g3 / g4 と同じ領域タクソノミー（id）を継続使用（学年非依存のカテゴリ）。
// name/formalName は g5 のテーマに合わせる（中央集約時は id で同一視）。

export const eigoG5Domains: Domain[] = [
  {
    id: "eigo.communication",
    subjectId: "eigo",
    name: "あいさつとやりとり",
    formalName: "コミュニケーション（自己紹介・道案内・買い物）",
  },
  {
    id: "eigo.letters",
    subjectId: "eigo",
    name: "ローマじ",
    formalName: "文字（ローマ字表記）",
  },
  {
    id: "eigo.words",
    subjectId: "eigo",
    name: "ことば（くに・きょうか）",
    formalName: "語彙（国名・教科）",
  },
];

// ── 先行学年の単元 id（前提として参照。中央集約時に解決される） ──
const PREV = {
  greetings: "eigo.g3.greetings",
  numbers: "eigo.g3.numbers-1-20",
  alphabetLower: "eigo.g4.alphabet-lowercase",
  daysMonths: "eigo.g4.days-and-months",
} as const;

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺に DAG 化。g3/g4 → g5 へ繋がる）:
//
//   g3.greetings ──────────▶ self-introduction ─┬─▶ can-do
//                                                 ├─▶ directions-places
//                                                 ├─▶ shopping-prices
//                                                 └─▶ countries-to-visit
//   g4.alphabet-lowercase ─▶ romaji
//   g3.numbers-1-20 ───────▶ shopping-prices
//   g4.days-and-months ────▶ timetable-subjects
//
const U = {
  selfIntro: "eigo.g5.self-introduction",
  romaji: "eigo.g5.romaji",
  canDo: "eigo.g5.can-do",
  directions: "eigo.g5.directions-places",
  shopping: "eigo.g5.shopping-prices",
  countries: "eigo.g5.countries-to-visit",
  timetable: "eigo.g5.timetable-subjects",
} as const;

export const eigoG5Units: Unit[] = [
  {
    id: U.selfIntro,
    subjectId: "eigo",
    grade: 5,
    domainId: "eigo.communication",
    title: "じこしょうかい（self-introduction）",
    order: 1,
    realWorldUse: "はじめて あった ひとに、なまえ・しゅっしん・たんじょうびを えいごで しょうかいできるよ。",
    leadsTo: [U.canDo, U.directions, U.shopping, U.countries],
    prerequisites: [PREV.greetings],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.romaji,
    subjectId: "eigo",
    grade: 5,
    domainId: "eigo.letters",
    title: "ローマじ（romaji）",
    order: 2,
    realWorldUse: "じぶんの なまえや ちめいを、パスポートや かんばんのように アルファベットで かけるよ。",
    leadsTo: [],
    prerequisites: [PREV.alphabetLower],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.canDo,
    subjectId: "eigo",
    grade: 5,
    domainId: "eigo.communication",
    title: "できること（I can〜）",
    order: 3,
    realWorldUse: "「I can swim.」のように、じぶんの できることや とくいなことを ともだちに つたえられるよ。",
    leadsTo: [],
    prerequisites: [U.selfIntro],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.directions,
    subjectId: "eigo",
    grade: 5,
    domainId: "eigo.communication",
    title: "みちあんないと ばしょ（directions）",
    order: 4,
    realWorldUse: "「えきは どこ？」と きかれたとき、「まっすぐ いって みぎ」と えいごで みちを おしえられるよ。",
    leadsTo: [],
    prerequisites: [U.selfIntro],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.shopping,
    subjectId: "eigo",
    grade: 5,
    domainId: "eigo.communication",
    title: "ねだんと かいもの（shopping）",
    order: 5,
    realWorldUse: "おみせで「How much？（いくら？）」と ねだんを きいて、かいものが できるよ。",
    leadsTo: [],
    prerequisites: [U.selfIntro, PREV.numbers],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.countries,
    subjectId: "eigo",
    grade: 5,
    domainId: "eigo.words",
    title: "いきたいくに（countries）",
    order: 6,
    realWorldUse: "「I want to go to Italy.」のように、いってみたい くにを えいごで いえるよ。せかいに きょうみが ひろがるね。",
    leadsTo: [],
    prerequisites: [U.selfIntro],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.timetable,
    subjectId: "eigo",
    grade: 5,
    domainId: "eigo.words",
    title: "じかんわりと きょうか（subjects）",
    order: 7,
    realWorldUse: "「I like science.」のように、すきな きょうかや きょうの じかんわりを えいごで いえるよ。",
    leadsTo: [],
    prerequisites: [PREV.daysMonths],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は日本語ひらがな中心。

// じこしょうかい（self-introduction）
const selfIntroQuestions: ChoiceQuestion[] = [
  {
    id: `${U.selfIntro}.q-1`,
    unitId: U.selfIntro,
    prompt: "はじめて あった ひとに いう「Nice to meet you.」の いみは？",
    explanation: "「Nice to meet you（ナイス トゥ ミート ユー）」は「はじめまして」だよ。あく しゅしながら いうことも あるよ。",
    visual: { kind: "emoji", value: "🤝😊", caption: "Nice to meet you." },
    format: "choice",
    choices: ["はじめまして", "さようなら", "ありがとう", "ごめんね"],
    answer: "はじめまして",
  },
  {
    id: `${U.selfIntro}.q-2`,
    unitId: U.selfIntro,
    prompt: "「My name is Ken.」の いみは どれ かな？",
    explanation: "「My name is（マイ ネイム イズ）〜.」は「わたしの なまえは 〜です」だよ。じぶんの なまえを いえるね。",
    visual: { kind: "emoji", value: "🧒📛", caption: "My name is Ken." },
    format: "choice",
    choices: ["わたしの なまえは ケンです", "ケンが すき", "ケンは どこ？", "ケン、こんにちは"],
    answer: "わたしの なまえは ケンです",
  },
  {
    id: `${U.selfIntro}.q-3`,
    unitId: U.selfIntro,
    prompt: "「I'm from Japan.」の いみは どれ かな？",
    explanation: "「I'm from（アイム フロム）〜.」は「わたしは 〜の しゅっしんです」だよ。Japan は にほんだね。",
    visual: { kind: "emoji", value: "🗾", caption: "I'm from Japan." },
    format: "choice",
    choices: ["にほん しゅっしんです", "にほんが すき", "にほんに いきたい", "にほんは とおい"],
    answer: "にほん しゅっしんです",
  },
  {
    id: `${U.selfIntro}.q-4`,
    unitId: U.selfIntro,
    prompt: "「When is your birthday？」の いみは どれ かな？",
    explanation: "「When（ウェン）」は「いつ？」。birthday は たんじょうび。「たんじょうびは いつ？」とたずねる ことばだよ。",
    visual: { kind: "emoji", value: "🎂❓", caption: "When is your birthday？" },
    format: "choice",
    choices: ["たんじょうびは いつ？", "なんさい？", "なまえは？", "どこに すんでる？"],
    answer: "たんじょうびは いつ？",
  },
  {
    id: `${U.selfIntro}.q-5`,
    unitId: U.selfIntro,
    prompt: "なまえの つづりを きく「How do you spell it？」の いみは？",
    explanation: "「spell（スペル）」は「つづりを いう」こと。「どう つづるの？」と もじを たしかめる ことばだよ。",
    visual: { kind: "emoji", value: "🔤❓", caption: "How do you spell it？" },
    format: "choice",
    choices: ["どう つづるの？", "なんさい？", "どこ しゅっしん？", "なにが すき？"],
    answer: "どう つづるの？",
  },
];

// ローマじ（romaji）
const romajiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.romaji}.q-1`,
    unitId: U.romaji,
    prompt: "「やま」を ローマじで かくと どれ かな？",
    explanation: "や=ya、ま=ma だから「yama」だよ。ローマじは こえの おとを アルファベットで あらわすよ。",
    visual: { kind: "emoji", value: "⛰️", caption: "yama" },
    format: "choice",
    choices: ["yama", "yana", "yamma", "tama"],
    answer: "yama",
  },
  {
    id: `${U.romaji}.q-2`,
    unitId: U.romaji,
    prompt: "ローマじ「sora」は どう よむ かな？",
    explanation: "so=そ、ra=ら だから「そら」だよ。アルファベットを 2もじずつ よんでいくよ。",
    visual: { kind: "emoji", value: "🌤️", caption: "sora" },
    format: "choice",
    choices: ["そら", "さら", "そな", "すら"],
    answer: "そら",
  },
  {
    id: `${U.romaji}.q-3`,
    unitId: U.romaji,
    prompt: "なまえ「けん」を ローマじで かくと どれ かな？",
    explanation: "け=ke、ん=n だから「ken」だよ。「ん」は n 1もじで かくよ。",
    visual: { kind: "emoji", value: "🧒", caption: "ken" },
    format: "choice",
    choices: ["ken", "kenn", "kem", "kan"],
    answer: "ken",
  },
  {
    id: `${U.romaji}.q-4`,
    unitId: U.romaji,
    prompt: "ローマじは どんな ときに つかう かな？",
    explanation: "ローマじは、にほんごの なまえや ちめいを アルファベットで あらわすときに つかうよ。かんばんや パスポートで みるね。",
    visual: { kind: "emoji", value: "🪧", caption: "TOKYO / Tanaka" },
    format: "choice",
    choices: ["なまえや ちめいを アルファベットで かく", "かずを かぞえる", "えを かく", "うたを うたう"],
    answer: "なまえや ちめいを アルファベットで かく",
  },
  {
    id: `${U.romaji}.q-5`,
    unitId: U.romaji,
    prompt: "「ねこ」を ローマじで かくと どれ かな？",
    explanation: "ね=ne、こ=ko だから「neko」だよ。1もじずつ おとを あてはめよう。",
    visual: { kind: "emoji", value: "🐱", caption: "neko" },
    format: "choice",
    choices: ["neko", "nako", "neco", "neeko"],
    answer: "neko",
  },
];

// できること（I can〜）
const canDoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.canDo}.q-1`,
    unitId: U.canDo,
    prompt: "「I can swim.」の いみは どれ かな？",
    explanation: "「can（キャン）」は「〜できる」。swim は およぐ。「およげるよ」と できることを つたえる ことばだよ。",
    visual: { kind: "emoji", value: "🏊", caption: "I can swim." },
    format: "choice",
    choices: ["およげる", "およげない", "およぎたい", "うみが すき"],
    answer: "およげる",
  },
  {
    id: `${U.canDo}.q-2`,
    unitId: U.canDo,
    prompt: "「Can you play the piano？」の いみは どれ かな？",
    explanation: "「Can you 〜？」は「〜できる？」と あいてに きく ことば。「ピアノ ひける？」だよ。",
    visual: { kind: "emoji", value: "🎹❓", caption: "Can you play the piano？" },
    format: "choice",
    choices: ["ピアノ ひける？", "ピアノが すき？", "ピアノは どこ？", "ピアノを かう？"],
    answer: "ピアノ ひける？",
  },
  {
    id: `${U.canDo}.q-3`,
    unitId: U.canDo,
    prompt: "じぶんの できることを いう ときに つかう ことばは どれ かな？",
    explanation: "できることは「I can 〜.」で つたえるよ。「I can run.」で「はしれる」だね。",
    visual: { kind: "emoji", value: "💪", caption: "I can …" },
    format: "choice",
    choices: ["I can", "I want", "I'm from", "How much"],
    answer: "I can",
  },
  {
    id: `${U.canDo}.q-4`,
    unitId: U.canDo,
    prompt: "「I can run fast.」の いみは どれ かな？",
    explanation: "fast（ファスト）は「はやく」。「I can run fast.」で「はやく はしれる」だよ。",
    visual: { kind: "emoji", value: "🏃💨", caption: "I can run fast." },
    format: "choice",
    choices: ["はやく はしれる", "はやく はしれない", "はしるのが きらい", "はやく あるく"],
    answer: "はやく はしれる",
  },
  {
    id: `${U.canDo}.q-5`,
    unitId: U.canDo,
    prompt: "「I can't sing.」の いみは どれ かな？",
    explanation: "「can't（キャント）」は「〜できない」。sing は うたう。「うたえない」だよ。can の はんたいだね。",
    visual: { kind: "emoji", value: "🎤🚫", caption: "I can't sing." },
    format: "choice",
    choices: ["うたえない", "うたえる", "うたが すき", "うたいたい"],
    answer: "うたえない",
  },
];

// みちあんないと ばしょ（directions）
const directionsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.directions}.q-1`,
    unitId: U.directions,
    prompt: "「Turn right.」の いみは どれ かな？",
    explanation: "「Turn（ターン）」は まがる、right は みぎ。「みぎに まがる」だよ。みちあんないで つかうね。",
    visual: { kind: "emoji", value: "➡️", caption: "Turn right." },
    format: "choice",
    choices: ["みぎに まがる", "ひだりに まがる", "まっすぐ いく", "とまる"],
    answer: "みぎに まがる",
  },
  {
    id: `${U.directions}.q-2`,
    unitId: U.directions,
    prompt: "「Go straight.」の いみは どれ かな？",
    explanation: "「straight（ストレート）」は まっすぐ。「まっすぐ いく」だよ。みちを すすむ ときに つかうね。",
    visual: { kind: "emoji", value: "⬆️", caption: "Go straight." },
    format: "choice",
    choices: ["まっすぐ いく", "みぎに まがる", "ひだりに まがる", "もどる"],
    answer: "まっすぐ いく",
  },
  {
    id: `${U.directions}.q-3`,
    unitId: U.directions,
    prompt: "「Where is the station？」の いみは どれ かな？",
    explanation: "「Where（ウェア）」は「どこ？」、station は えき。「えきは どこ？」と ばしょを きく ことばだよ。",
    visual: { kind: "emoji", value: "🚉❓", caption: "Where is the station？" },
    format: "choice",
    choices: ["えきは どこ？", "えきは とおい？", "えきに いきたい", "えきが すき"],
    answer: "えきは どこ？",
  },
  {
    id: `${U.directions}.q-4`,
    unitId: U.directions,
    prompt: "「library（ライブラリー）」は どんな ばしょ かな？",
    explanation: "library は としょかん だよ。ほんを よんだり かりたり する ところだね。",
    visual: { kind: "emoji", value: "📚🏛️", caption: "library" },
    format: "choice",
    choices: ["としょかん", "びょういん", "こうえん", "ゆうびんきょく"],
    answer: "としょかん",
  },
  {
    id: `${U.directions}.q-5`,
    unitId: U.directions,
    prompt: "「Turn left.」の いみは どれ かな？",
    explanation: "left は ひだり。「ひだりに まがる」だよ。right（みぎ）と まちがえないように しよう。",
    visual: { kind: "emoji", value: "⬅️", caption: "Turn left." },
    format: "choice",
    choices: ["ひだりに まがる", "みぎに まがる", "まっすぐ いく", "はしる"],
    answer: "ひだりに まがる",
  },
];

// ねだんと かいもの（shopping）
const shoppingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.shopping}.q-1`,
    unitId: U.shopping,
    prompt: "おみせで ねだんを きく「How much？」の いみは？",
    explanation: "「How much（ハウ マッチ）？」は「いくら？」だよ。かいたい ものの ねだんを きく ことばだね。",
    visual: { kind: "emoji", value: "💰❓", caption: "How much？" },
    format: "choice",
    choices: ["いくら？", "なんこ？", "なにいろ？", "どこ？"],
    answer: "いくら？",
  },
  {
    id: `${U.shopping}.q-2`,
    unitId: U.shopping,
    prompt: "「It's 300 yen.」の いみは どれ かな？",
    explanation: "yen（エン）は えん。「It's 300 yen.」で「300えんです」だよ。ねだんを こたえる ことばだね。",
    visual: { kind: "emoji", value: "🪙", caption: "300 yen" },
    format: "choice",
    choices: ["300えんです", "3こ あります", "3じです", "300メートル"],
    answer: "300えんです",
  },
  {
    id: `${U.shopping}.q-3`,
    unitId: U.shopping,
    prompt: "ねだんを たずねる ときに つかう ことばは どれ かな？",
    explanation: "ねだんは「How much？」で きくよ。「How many？」は かずを きく ことばだから ちがうよ。",
    visual: { kind: "emoji", value: "🛒", caption: "How much？" },
    format: "choice",
    choices: ["How much？", "How are you？", "What time？", "Where？"],
    answer: "How much？",
  },
  {
    id: `${U.shopping}.q-4`,
    unitId: U.shopping,
    prompt: "「これを ください」と かう ときの「I'll take it.」の いみは？",
    explanation: "「I'll take it（アイル テイク イット）.」は「これに します／これを かいます」だよ。かう ときに つかうね。",
    visual: { kind: "emoji", value: "🛍️", caption: "I'll take it." },
    format: "choice",
    choices: ["これを かいます", "これは いりません", "これは どこ？", "これは すき"],
    answer: "これを かいます",
  },
  {
    id: `${U.shopping}.q-5`,
    unitId: U.shopping,
    prompt: "ものを てわたす ときの「Here you are.」の いみは？",
    explanation: "「Here you are（ヒア ユー アー）.」は「はい、どうぞ」だよ。なにかを わたす ときに つかう ことばだね。",
    visual: { kind: "emoji", value: "🤲", caption: "Here you are." },
    format: "choice",
    choices: ["はい、どうぞ", "ありがとう", "いくら？", "さようなら"],
    answer: "はい、どうぞ",
  },
];

// いきたいくに（countries）
const countriesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.countries}.q-1`,
    unitId: U.countries,
    prompt: "「I want to go to Italy.」の いみは どれ かな？",
    explanation: "「want to go to（ウォント トゥ ゴー トゥ）〜」は「〜に いきたい」。Italy は イタリア。「イタリアに いきたい」だよ。",
    visual: { kind: "emoji", value: "🇮🇹✈️", caption: "I want to go to Italy." },
    format: "choice",
    choices: ["イタリアに いきたい", "イタリアが すき", "イタリアに すんでる", "イタリアは とおい"],
    answer: "イタリアに いきたい",
  },
  {
    id: `${U.countries}.q-2`,
    unitId: U.countries,
    prompt: "「アメリカ」は えいごで なんと いうかな？",
    explanation: "アメリカは「America（アメリカ）」だよ。ハンバーガーや じゆうのめがみで しられる くにだね。",
    visual: { kind: "emoji", value: "🇺🇸", caption: "America" },
    format: "choice",
    choices: ["America", "Italy", "France", "India"],
    answer: "America",
  },
  {
    id: `${U.countries}.q-3`,
    unitId: U.countries,
    prompt: "いきたい くにを いう ときに つかう ことばは どれ かな？",
    explanation: "いきたい くには「I want to go to 〜.」で つたえるよ。go は「いく」だね。",
    visual: { kind: "emoji", value: "🌍✈️", caption: "I want to go to …" },
    format: "choice",
    choices: ["I want to go to", "I can swim", "How much", "I'm from"],
    answer: "I want to go to",
  },
  {
    id: `${U.countries}.q-4`,
    unitId: U.countries,
    prompt: "「France（フランス）」は どこの くに かな？",
    explanation: "France は フランス だよ。エッフェルとうで しられる ヨーロッパの くにだね。",
    visual: { kind: "emoji", value: "🇫🇷🗼", caption: "France" },
    format: "choice",
    choices: ["フランス", "アメリカ", "インド", "ブラジル"],
    answer: "フランス",
  },
  {
    id: `${U.countries}.q-5`,
    unitId: U.countries,
    prompt: "「Australia（オーストラリア）」は どこの くに かな？",
    explanation: "Australia は オーストラリア だよ。コアラや カンガルーが いる くにだね。",
    visual: { kind: "emoji", value: "🇦🇺🐨", caption: "Australia" },
    format: "choice",
    choices: ["オーストラリア", "イタリア", "フランス", "エジプト"],
    answer: "オーストラリア",
  },
];

// じかんわりと きょうか（subjects）
const timetableQuestions: ChoiceQuestion[] = [
  {
    id: `${U.timetable}.q-1`,
    unitId: U.timetable,
    prompt: "「math（マス）」は なんの きょうか かな？",
    explanation: "math は さんすう だよ。かずや けいさんを べんきょうする きょうかだね。",
    visual: { kind: "emoji", value: "🔢", caption: "math" },
    format: "choice",
    choices: ["さんすう", "こくご", "りか", "おんがく"],
    answer: "さんすう",
  },
  {
    id: `${U.timetable}.q-2`,
    unitId: U.timetable,
    prompt: "「りか」は えいごで なんと いうかな？",
    explanation: "りかは「science（サイエンス）」だよ。じっけんや しぜんを しらべる きょうかだね。",
    visual: { kind: "emoji", value: "🔬", caption: "science" },
    format: "choice",
    choices: ["science", "math", "music", "English"],
    answer: "science",
  },
  {
    id: `${U.timetable}.q-3`,
    unitId: U.timetable,
    prompt: "「I like P.E.」の いみは どれ かな？",
    explanation: "P.E.（ピーイー）は たいいく だよ。「I like P.E.」で「たいいくが すき」だね。",
    visual: { kind: "emoji", value: "🏃⚽", caption: "P.E." },
    format: "choice",
    choices: ["たいいくが すき", "おんがくが すき", "さんすうが すき", "りかが すき"],
    answer: "たいいくが すき",
  },
  {
    id: `${U.timetable}.q-4`,
    unitId: U.timetable,
    prompt: "「What subject do you like？」の いみは どれ かな？",
    explanation: "「subject（サブジェクト）」は きょうか。「どの きょうかが すき？」と たずねる ことばだよ。",
    visual: { kind: "emoji", value: "📚❓", caption: "What subject do you like？" },
    format: "choice",
    choices: ["どの きょうかが すき？", "なんようび？", "なんじ？", "なにいろ？"],
    answer: "どの きょうかが すき？",
  },
  {
    id: `${U.timetable}.q-5`,
    unitId: U.timetable,
    prompt: "「music（ミュージック）」は なんの きょうか かな？",
    explanation: "music は おんがく だよ。うたを うたったり がっきを ひいたり する きょうかだね。",
    visual: { kind: "emoji", value: "🎵", caption: "music" },
    format: "choice",
    choices: ["おんがく", "ずこう", "たいいく", "さんすう"],
    answer: "おんがく",
  },
];

export const eigoG5Contents: Record<string, UnitContent> = {
  [U.selfIntro]: {
    unitId: U.selfIntro,
    learn: {
      unitId: U.selfIntro,
      steps: [
        {
          heading: "はじめまして",
          body: "はじめて あった ひとには「Nice to meet you.（ナイス トゥ ミート ユー）＝はじめまして」と いうよ。",
          visual: { kind: "emoji", value: "🤝😊", caption: "Nice to meet you." },
        },
        {
          heading: "なまえと しゅっしん",
          body: "「My name is 〜.」で なまえ、「I'm from 〜.」で しゅっしんを いえるよ。「I'm from Japan.」で「にほん しゅっしん」だね。",
          visual: { kind: "emoji", value: "📛🗾", caption: "My name is … / I'm from …" },
        },
        {
          heading: "たんじょうびを いおう",
          body: "「When is your birthday？」は「たんじょうびは いつ？」。「My birthday is 〜.」で こたえられるよ。",
          visual: { kind: "emoji", value: "🎂", caption: "When is your birthday？" },
        },
      ],
    },
    test: {
      unitId: U.selfIntro,
      questions: selfIntroQuestions,
      questionCount: 5,
    },
  },

  [U.romaji]: {
    unitId: U.romaji,
    learn: {
      unitId: U.romaji,
      steps: [
        {
          heading: "ローマじって なに？",
          body: "にほんごの おとを アルファベットで あらわす かきかたが ローマじだよ。あ=a、か=ka、さ=sa のように きまっているよ。",
          visual: { kind: "emoji", value: "🔤", caption: "a ka sa ta na" },
        },
        {
          heading: "なまえを かいてみよう",
          body: "「やま」=yama、「そら」=sora、「ねこ」=neko のように、おとを 2もじずつ あてはめるよ。じぶんの なまえも かけるね。",
          visual: { kind: "emoji", value: "✍️", caption: "yama / sora / neko" },
        },
        {
          heading: "まちで さがそう",
          body: "えきの かんばんや みちの ひょうしきにも ローマじが あるよ。TOKYO や Tanaka を さがしてみよう。",
          visual: { kind: "emoji", value: "🪧", caption: "TOKYO" },
        },
      ],
    },
    test: {
      unitId: U.romaji,
      questions: romajiQuestions,
      questionCount: 5,
    },
  },

  [U.canDo]: {
    unitId: U.canDo,
    learn: {
      unitId: U.canDo,
      steps: [
        {
          heading: "I can 〜.",
          body: "「I can 〜.（アイ キャン）」は「わたしは 〜できる」だよ。「I can swim.」で「およげる」だね。",
          visual: { kind: "emoji", value: "💪🏊", caption: "I can swim." },
        },
        {
          heading: "できない ときは",
          body: "「I can't 〜.（アイ キャント）」で「〜できない」。「I can't sing.」で「うたえない」だよ。",
          visual: { kind: "emoji", value: "🚫🎤", caption: "I can't sing." },
        },
        {
          heading: "あいてに きいてみよう",
          body: "「Can you 〜？」は「〜できる？」。「Yes, I can.／No, I can't.」で こたえられるよ。",
          visual: { kind: "emoji", value: "🙋❓", caption: "Can you …？" },
        },
      ],
    },
    test: {
      unitId: U.canDo,
      questions: canDoQuestions,
      questionCount: 5,
    },
  },

  [U.directions]: {
    unitId: U.directions,
    learn: {
      unitId: U.directions,
      steps: [
        {
          heading: "ばしょの たんご",
          body: "えき=station、としょかん=library、こうえん=park、びょういん=hospital、ゆうびんきょく=post office だよ。",
          visual: { kind: "emoji", value: "🚉📚🏥", caption: "station / library / hospital" },
        },
        {
          heading: "みちを たずねる",
          body: "「Where is 〜？」は「〜は どこ？」。「Where is the station？」で「えきは どこ？」だね。",
          visual: { kind: "emoji", value: "❓🗺️", caption: "Where is …？" },
        },
        {
          heading: "みちを おしえる",
          body: "「Go straight.」まっすぐ、「Turn right.」みぎへ、「Turn left.」ひだりへ で あんないできるよ。",
          visual: { kind: "emoji", value: "⬆️➡️⬅️", caption: "straight / right / left" },
        },
      ],
    },
    test: {
      unitId: U.directions,
      questions: directionsQuestions,
      questionCount: 5,
    },
  },

  [U.shopping]: {
    unitId: U.shopping,
    learn: {
      unitId: U.shopping,
      steps: [
        {
          heading: "ねだんを きく",
          body: "「How much？（ハウ マッチ）」は「いくら？」。かいたい ものの ねだんを きく ことばだよ。",
          visual: { kind: "emoji", value: "💰❓", caption: "How much？" },
        },
        {
          heading: "ねだんを こたえる",
          body: "「It's 〜 yen.」で「〜えんです」。yen は えん だよ。「It's 500 yen.」で「500えん」だね。",
          visual: { kind: "emoji", value: "🪙", caption: "It's 500 yen." },
        },
        {
          heading: "かいものの やりとり",
          body: "「I'll take it.」これを かいます、「Here you are.」はい どうぞ。さいごに「Thank you.」と いえると いいね。",
          visual: { kind: "emoji", value: "🛍️🤲", caption: "I'll take it. / Here you are." },
        },
      ],
    },
    test: {
      unitId: U.shopping,
      questions: shoppingQuestions,
      questionCount: 5,
    },
  },

  [U.countries]: {
    unitId: U.countries,
    learn: {
      unitId: U.countries,
      steps: [
        {
          heading: "くにの えいご",
          body: "にほん=Japan、アメリカ=America、イタリア=Italy、フランス=France、オーストラリア=Australia だよ。",
          visual: { kind: "emoji", value: "🇯🇵🇺🇸🇮🇹", caption: "Japan / America / Italy" },
        },
        {
          heading: "いきたい くにを いおう",
          body: "「I want to go to 〜.」は「〜に いきたい」。「I want to go to Italy.」で「イタリアに いきたい」だね。",
          visual: { kind: "emoji", value: "✈️🌍", caption: "I want to go to …" },
        },
        {
          heading: "なぜ いきたい？",
          body: "「I can see 〜.（〜が みられる）」や ゆうめいな ものを そえると、もっと つたわるよ。",
          visual: { kind: "emoji", value: "🗼🐨", caption: "France / Australia" },
        },
      ],
    },
    test: {
      unitId: U.countries,
      questions: countriesQuestions,
      questionCount: 5,
    },
  },

  [U.timetable]: {
    unitId: U.timetable,
    learn: {
      unitId: U.timetable,
      steps: [
        {
          heading: "きょうかの えいご",
          body: "さんすう=math、こくご=Japanese、りか=science、しゃかい=social studies、えいご=English だよ。",
          visual: { kind: "emoji", value: "🔢🔬📖", caption: "math / science / Japanese" },
        },
        {
          heading: "すきな きょうかを いおう",
          body: "「What subject do you like？」は「どの きょうかが すき？」。「I like music.」で こたえられるよ。",
          visual: { kind: "emoji", value: "🎵❓", caption: "What subject do you like？" },
        },
        {
          heading: "じかんわりを いおう",
          body: "「I have math on Monday.」のように、ようび（g4でならった days）と あわせて じかんわりを いえるよ。",
          visual: { kind: "emoji", value: "📅📚", caption: "math on Monday" },
        },
      ],
    },
    test: {
      unitId: U.timetable,
      questions: timetableQuestions,
      questionCount: 5,
    },
  },
};
