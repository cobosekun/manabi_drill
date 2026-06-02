// ══════════════════════════════════════════
// カリキュラム: 英語（えいご）小5（外国語・高学年・教科）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 高学年の外国語（教科）は「聞く・話す＋読む・書く」へ。テストは4択の確認形式。
// 英単語は「表記（よみがな）」で提示し、解説は日本語（漢字＋ルビ）中心。
// 表示テキスト（title/realWorldUse/heading/body/prompt/choices/explanation）は
// 小5までの配当漢字のみを用い、全漢字にルビ {漢字|よみ} を付す（配当外漢字は使わない）。
// 英単語・ローマ字・カタカナはそのまま（ルビ対象外）。
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
    realWorldUse: "はじめて あった {人|ひと}に、{名前|なまえ}・{出身|しゅっしん}・たんじょうびを {英語|えいご}で しょうかいできるよ。",
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
    realWorldUse: "じぶんの {名前|なまえ}や {地名|ちめい}を、パスポートや かんばんのように アルファベットで かけるよ。",
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
    title: "{道|みち}{案内|あんない}と {場所|ばしょ}（directions）",
    order: 4,
    realWorldUse: "「{駅|えき}は どこ？」と きかれたとき、「まっすぐ いって {右|みぎ}」と {英語|えいご}で {道|みち}を おしえられるよ。",
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
    realWorldUse: "お{店|みせ}で「How much？（いくら？）」と ねだんを きいて、かいものが できるよ。",
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
    title: "いきたい{国|くに}（countries）",
    order: 6,
    realWorldUse: "「I want to go to Italy.」のように、いってみたい {国|くに}を {英語|えいご}で いえるよ。{世界|せかい}に {興味|きょうみ}が ひろがるね。",
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
    title: "じかんわりと {教科|きょうか}（subjects）",
    order: 7,
    realWorldUse: "「I like science.」のように、すきな {教科|きょうか}や きょうの じかんわりを {英語|えいご}で いえるよ。",
    leadsTo: [],
    prerequisites: [PREV.daysMonths],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は日本語（漢字＋ルビ）中心。

// じこしょうかい（self-introduction）
const selfIntroQuestions: ChoiceQuestion[] = [
  {
    id: `${U.selfIntro}.q-1`,
    unitId: U.selfIntro,
    prompt: "はじめて あった {人|ひと}に いう「Nice to meet you.」の {意味|いみ}は？",
    explanation: "「Nice to meet you（ナイス トゥ ミート ユー）」は「はじめまして」だよ。あくしゅ しながら いうことも あるよ。",
    visual: { kind: "emoji", value: "🤝😊", caption: "Nice to meet you." },
    format: "choice",
    choices: ["はじめまして", "さようなら", "ありがとう", "ごめんね"],
    answer: "はじめまして",
  },
  {
    id: `${U.selfIntro}.q-2`,
    unitId: U.selfIntro,
    prompt: "「My name is Ken.」の {意味|いみ}は どれ かな？",
    explanation: "「My name is（マイ ネイム イズ）〜.」は「わたしの {名前|なまえ}は 〜です」だよ。じぶんの {名前|なまえ}を いえるね。",
    visual: { kind: "emoji", value: "🧒📛", caption: "My name is Ken." },
    format: "choice",
    choices: ["わたしの {名前|なまえ}は ケンです", "ケンが すき", "ケンは どこ？", "ケン、こんにちは"],
    answer: "わたしの {名前|なまえ}は ケンです",
  },
  {
    id: `${U.selfIntro}.q-3`,
    unitId: U.selfIntro,
    prompt: "「I'm from Japan.」の {意味|いみ}は どれ かな？",
    explanation: "「I'm from（アイム フロム）〜.」は「わたしは 〜の {出身|しゅっしん}です」だよ。Japan は {日本|にほん}だね。",
    visual: { kind: "emoji", value: "🗾", caption: "I'm from Japan." },
    format: "choice",
    choices: ["{日本|にほん} {出身|しゅっしん}です", "{日本|にほん}が すき", "{日本|にほん}に いきたい", "{日本|にほん}は {遠|とお}い"],
    answer: "{日本|にほん} {出身|しゅっしん}です",
  },
  {
    id: `${U.selfIntro}.q-4`,
    unitId: U.selfIntro,
    prompt: "「When is your birthday？」の {意味|いみ}は どれ かな？",
    explanation: "「When（ウェン）」は「いつ？」。birthday は たんじょうび。「たんじょうびは いつ？」とたずねる {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🎂❓", caption: "When is your birthday？" },
    format: "choice",
    choices: ["たんじょうびは いつ？", "なんさい？", "{名前|なまえ}は？", "どこに すんでる？"],
    answer: "たんじょうびは いつ？",
  },
  {
    id: `${U.selfIntro}.q-5`,
    unitId: U.selfIntro,
    prompt: "{名前|なまえ}の つづりを きく「How do you spell it？」の {意味|いみ}は？",
    explanation: "「spell（スペル）」は「つづりを いう」こと。「どう つづるの？」と {文字|もじ}を たしかめる {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🔤❓", caption: "How do you spell it？" },
    format: "choice",
    choices: ["どう つづるの？", "なんさい？", "どこ {出身|しゅっしん}？", "なにが すき？"],
    answer: "どう つづるの？",
  },
];

// ローマじ（romaji）
const romajiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.romaji}.q-1`,
    unitId: U.romaji,
    prompt: "「やま」を ローマじで かくと どれ かな？",
    explanation: "や=ya、ま=ma だから「yama」だよ。ローマじは こえの {音|おと}を アルファベットで あらわすよ。",
    visual: { kind: "emoji", value: "⛰️", caption: "yama" },
    format: "choice",
    choices: ["yama", "yana", "yamma", "tama"],
    answer: "yama",
  },
  {
    id: `${U.romaji}.q-2`,
    unitId: U.romaji,
    prompt: "ローマじ「sora」は どう よむ かな？",
    explanation: "so=そ、ra=ら だから「そら」だよ。アルファベットを 2{文字|もじ}ずつ よんでいくよ。",
    visual: { kind: "emoji", value: "🌤️", caption: "sora" },
    format: "choice",
    choices: ["そら", "さら", "そな", "すら"],
    answer: "そら",
  },
  {
    id: `${U.romaji}.q-3`,
    unitId: U.romaji,
    prompt: "{名前|なまえ}「けん」を ローマじで かくと どれ かな？",
    explanation: "け=ke、ん=n だから「ken」だよ。「ん」は n 1{文字|もじ}で かくよ。",
    visual: { kind: "emoji", value: "🧒", caption: "ken" },
    format: "choice",
    choices: ["ken", "kenn", "kem", "kan"],
    answer: "ken",
  },
  {
    id: `${U.romaji}.q-4`,
    unitId: U.romaji,
    prompt: "ローマじは どんな ときに つかう かな？",
    explanation: "ローマじは、{日本語|にほんご}の {名前|なまえ}や {地名|ちめい}を アルファベットで あらわすときに つかうよ。かんばんや パスポートで みるね。",
    visual: { kind: "emoji", value: "🪧", caption: "TOKYO / Tanaka" },
    format: "choice",
    choices: ["{名前|なまえ}や {地名|ちめい}を アルファベットで かく", "{数|かず}を かぞえる", "えを かく", "{歌|うた}を うたう"],
    answer: "{名前|なまえ}や {地名|ちめい}を アルファベットで かく",
  },
  {
    id: `${U.romaji}.q-5`,
    unitId: U.romaji,
    prompt: "「ねこ」を ローマじで かくと どれ かな？",
    explanation: "ね=ne、こ=ko だから「neko」だよ。1{文字|もじ}ずつ {音|おと}を あてはめよう。",
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
    prompt: "「I can swim.」の {意味|いみ}は どれ かな？",
    explanation: "「can（キャン）」は「〜できる」。swim は およぐ。「およげるよ」と できることを つたえる {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🏊", caption: "I can swim." },
    format: "choice",
    choices: ["およげる", "およげない", "およぎたい", "{海|うみ}が すき"],
    answer: "およげる",
  },
  {
    id: `${U.canDo}.q-2`,
    unitId: U.canDo,
    prompt: "「Can you play the piano？」の {意味|いみ}は どれ かな？",
    explanation: "「Can you 〜？」は「〜できる？」と {相手|あいて}に きく {言葉|ことば}。「ピアノ ひける？」だよ。",
    visual: { kind: "emoji", value: "🎹❓", caption: "Can you play the piano？" },
    format: "choice",
    choices: ["ピアノ ひける？", "ピアノが すき？", "ピアノは どこ？", "ピアノを かう？"],
    answer: "ピアノ ひける？",
  },
  {
    id: `${U.canDo}.q-3`,
    unitId: U.canDo,
    prompt: "じぶんの できることを いう ときに つかう {言葉|ことば}は どれ かな？",
    explanation: "できることは「I can 〜.」で つたえるよ。「I can run.」で「はしれる」だね。",
    visual: { kind: "emoji", value: "💪", caption: "I can …" },
    format: "choice",
    choices: ["I can", "I want", "I'm from", "How much"],
    answer: "I can",
  },
  {
    id: `${U.canDo}.q-4`,
    unitId: U.canDo,
    prompt: "「I can run fast.」の {意味|いみ}は どれ かな？",
    explanation: "fast（ファスト）は「はやく」。「I can run fast.」で「はやく はしれる」だよ。",
    visual: { kind: "emoji", value: "🏃💨", caption: "I can run fast." },
    format: "choice",
    choices: ["はやく はしれる", "はやく はしれない", "はしるのが きらい", "はやく あるく"],
    answer: "はやく はしれる",
  },
  {
    id: `${U.canDo}.q-5`,
    unitId: U.canDo,
    prompt: "「I can't sing.」の {意味|いみ}は どれ かな？",
    explanation: "「can't（キャント）」は「〜できない」。sing は うたう。「うたえない」だよ。can の {反対|はんたい}だね。",
    visual: { kind: "emoji", value: "🎤🚫", caption: "I can't sing." },
    format: "choice",
    choices: ["うたえない", "うたえる", "{歌|うた}が すき", "うたいたい"],
    answer: "うたえない",
  },
];

// みちあんないと ばしょ（directions）
const directionsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.directions}.q-1`,
    unitId: U.directions,
    prompt: "「Turn right.」の {意味|いみ}は どれ かな？",
    explanation: "「Turn（ターン）」は まがる、right は {右|みぎ}。「{右|みぎ}に まがる」だよ。{道|みち}{案内|あんない}で つかうね。",
    visual: { kind: "emoji", value: "➡️", caption: "Turn right." },
    format: "choice",
    choices: ["{右|みぎ}に まがる", "{左|ひだり}に まがる", "まっすぐ いく", "とまる"],
    answer: "{右|みぎ}に まがる",
  },
  {
    id: `${U.directions}.q-2`,
    unitId: U.directions,
    prompt: "「Go straight.」の {意味|いみ}は どれ かな？",
    explanation: "「straight（ストレート）」は まっすぐ。「まっすぐ いく」だよ。{道|みち}を すすむ ときに つかうね。",
    visual: { kind: "emoji", value: "⬆️", caption: "Go straight." },
    format: "choice",
    choices: ["まっすぐ いく", "{右|みぎ}に まがる", "{左|ひだり}に まがる", "もどる"],
    answer: "まっすぐ いく",
  },
  {
    id: `${U.directions}.q-3`,
    unitId: U.directions,
    prompt: "「Where is the station？」の {意味|いみ}は どれ かな？",
    explanation: "「Where（ウェア）」は「どこ？」、station は {駅|えき}。「{駅|えき}は どこ？」と {場所|ばしょ}を きく {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🚉❓", caption: "Where is the station？" },
    format: "choice",
    choices: ["{駅|えき}は どこ？", "{駅|えき}は {遠|とお}い？", "{駅|えき}に いきたい", "{駅|えき}が すき"],
    answer: "{駅|えき}は どこ？",
  },
  {
    id: `${U.directions}.q-4`,
    unitId: U.directions,
    prompt: "「library（ライブラリー）」は どんな {場所|ばしょ} かな？",
    explanation: "library は {図書館|としょかん} だよ。{本|ほん}を よんだり かりたり する ところだね。",
    visual: { kind: "emoji", value: "📚🏛️", caption: "library" },
    format: "choice",
    choices: ["{図書館|としょかん}", "{病院|びょういん}", "{公園|こうえん}", "ゆうびんきょく"],
    answer: "{図書館|としょかん}",
  },
  {
    id: `${U.directions}.q-5`,
    unitId: U.directions,
    prompt: "「Turn left.」の {意味|いみ}は どれ かな？",
    explanation: "left は {左|ひだり}。「{左|ひだり}に まがる」だよ。right（{右|みぎ}）と まちがえないように しよう。",
    visual: { kind: "emoji", value: "⬅️", caption: "Turn left." },
    format: "choice",
    choices: ["{左|ひだり}に まがる", "{右|みぎ}に まがる", "まっすぐ いく", "はしる"],
    answer: "{左|ひだり}に まがる",
  },
];

// ねだんと かいもの（shopping）
const shoppingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.shopping}.q-1`,
    unitId: U.shopping,
    prompt: "お{店|みせ}で ねだんを きく「How much？」の {意味|いみ}は？",
    explanation: "「How much（ハウ マッチ）？」は「いくら？」だよ。かいたい ものの ねだんを きく {言葉|ことば}だね。",
    visual: { kind: "emoji", value: "💰❓", caption: "How much？" },
    format: "choice",
    choices: ["いくら？", "なんこ？", "なに{色|いろ}？", "どこ？"],
    answer: "いくら？",
  },
  {
    id: `${U.shopping}.q-2`,
    unitId: U.shopping,
    prompt: "「It's 300 yen.」の {意味|いみ}は どれ かな？",
    explanation: "yen（エン）は えん。「It's 300 yen.」で「300えんです」だよ。ねだんを こたえる {言葉|ことば}だね。",
    visual: { kind: "emoji", value: "🪙", caption: "300 yen" },
    format: "choice",
    choices: ["300えんです", "3こ あります", "3じです", "300メートル"],
    answer: "300えんです",
  },
  {
    id: `${U.shopping}.q-3`,
    unitId: U.shopping,
    prompt: "ねだんを たずねる ときに つかう {言葉|ことば}は どれ かな？",
    explanation: "ねだんは「How much？」で きくよ。「How many？」は {数|かず}を きく {言葉|ことば}だから ちがうよ。",
    visual: { kind: "emoji", value: "🛒", caption: "How much？" },
    format: "choice",
    choices: ["How much？", "How are you？", "What time？", "Where？"],
    answer: "How much？",
  },
  {
    id: `${U.shopping}.q-4`,
    unitId: U.shopping,
    prompt: "「これを ください」と かう ときの「I'll take it.」の {意味|いみ}は？",
    explanation: "「I'll take it（アイル テイク イット）.」は「これに します／これを かいます」だよ。かう ときに つかうね。",
    visual: { kind: "emoji", value: "🛍️", caption: "I'll take it." },
    format: "choice",
    choices: ["これを かいます", "これは いりません", "これは どこ？", "これは すき"],
    answer: "これを かいます",
  },
  {
    id: `${U.shopping}.q-5`,
    unitId: U.shopping,
    prompt: "ものを てわたす ときの「Here you are.」の {意味|いみ}は？",
    explanation: "「Here you are（ヒア ユー アー）.」は「はい、どうぞ」だよ。なにかを わたす ときに つかう {言葉|ことば}だね。",
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
    prompt: "「I want to go to Italy.」の {意味|いみ}は どれ かな？",
    explanation: "「want to go to（ウォント トゥ ゴー トゥ）〜」は「〜に いきたい」。Italy は イタリア。「イタリアに いきたい」だよ。",
    visual: { kind: "emoji", value: "🇮🇹✈️", caption: "I want to go to Italy." },
    format: "choice",
    choices: ["イタリアに いきたい", "イタリアが すき", "イタリアに すんでる", "イタリアは {遠|とお}い"],
    answer: "イタリアに いきたい",
  },
  {
    id: `${U.countries}.q-2`,
    unitId: U.countries,
    prompt: "「アメリカ」は {英語|えいご}で なんと いうかな？",
    explanation: "アメリカは「America（アメリカ）」だよ。ハンバーガーや {自由|じゆう}のめがみで しられる {国|くに}だね。",
    visual: { kind: "emoji", value: "🇺🇸", caption: "America" },
    format: "choice",
    choices: ["America", "Italy", "France", "India"],
    answer: "America",
  },
  {
    id: `${U.countries}.q-3`,
    unitId: U.countries,
    prompt: "いきたい {国|くに}を いう ときに つかう {言葉|ことば}は どれ かな？",
    explanation: "いきたい {国|くに}は「I want to go to 〜.」で つたえるよ。go は「いく」だね。",
    visual: { kind: "emoji", value: "🌍✈️", caption: "I want to go to …" },
    format: "choice",
    choices: ["I want to go to", "I can swim", "How much", "I'm from"],
    answer: "I want to go to",
  },
  {
    id: `${U.countries}.q-4`,
    unitId: U.countries,
    prompt: "「France（フランス）」は どこの {国|くに} かな？",
    explanation: "France は フランス だよ。エッフェルとうで しられる ヨーロッパの {国|くに}だね。",
    visual: { kind: "emoji", value: "🇫🇷🗼", caption: "France" },
    format: "choice",
    choices: ["フランス", "アメリカ", "インド", "ブラジル"],
    answer: "フランス",
  },
  {
    id: `${U.countries}.q-5`,
    unitId: U.countries,
    prompt: "「Australia（オーストラリア）」は どこの {国|くに} かな？",
    explanation: "Australia は オーストラリア だよ。コアラや カンガルーが いる {国|くに}だね。",
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
    prompt: "「math（マス）」は なんの {教科|きょうか} かな？",
    explanation: "math は さんすう だよ。{数|かず}や {計算|けいさん}を {勉強|べんきょう}する {教科|きょうか}だね。",
    visual: { kind: "emoji", value: "🔢", caption: "math" },
    format: "choice",
    choices: ["{算数|さんすう}", "{国語|こくご}", "{理科|りか}", "{音楽|おんがく}"],
    answer: "{算数|さんすう}",
  },
  {
    id: `${U.timetable}.q-2`,
    unitId: U.timetable,
    prompt: "「りか」は {英語|えいご}で なんと いうかな？",
    explanation: "{理科|りか}は「science（サイエンス）」だよ。{実験|じっけん}や {自然|しぜん}を しらべる {教科|きょうか}だね。",
    visual: { kind: "emoji", value: "🔬", caption: "science" },
    format: "choice",
    choices: ["science", "math", "music", "English"],
    answer: "science",
  },
  {
    id: `${U.timetable}.q-3`,
    unitId: U.timetable,
    prompt: "「I like P.E.」の {意味|いみ}は どれ かな？",
    explanation: "P.E.（ピーイー）は {体育|たいいく} だよ。「I like P.E.」で「{体育|たいいく}が すき」だね。",
    visual: { kind: "emoji", value: "🏃⚽", caption: "P.E." },
    format: "choice",
    choices: ["{体育|たいいく}が すき", "{音楽|おんがく}が すき", "{算数|さんすう}が すき", "{理科|りか}が すき"],
    answer: "{体育|たいいく}が すき",
  },
  {
    id: `${U.timetable}.q-4`,
    unitId: U.timetable,
    prompt: "「What subject do you like？」の {意味|いみ}は どれ かな？",
    explanation: "「subject（サブジェクト）」は {教科|きょうか}。「どの {教科|きょうか}が すき？」と たずねる {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "📚❓", caption: "What subject do you like？" },
    format: "choice",
    choices: ["どの {教科|きょうか}が すき？", "なん{曜日|ようび}？", "なんじ？", "なに{色|いろ}？"],
    answer: "どの {教科|きょうか}が すき？",
  },
  {
    id: `${U.timetable}.q-5`,
    unitId: U.timetable,
    prompt: "「music（ミュージック）」は なんの {教科|きょうか} かな？",
    explanation: "music は おんがく だよ。{歌|うた}を うたったり {楽器|がっき}を ひいたり する {教科|きょうか}だね。",
    visual: { kind: "emoji", value: "🎵", caption: "music" },
    format: "choice",
    choices: ["{音楽|おんがく}", "{図工|ずこう}", "{体育|たいいく}", "{算数|さんすう}"],
    answer: "{音楽|おんがく}",
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
          body: "はじめて あった {人|ひと}には「Nice to meet you.（ナイス トゥ ミート ユー）＝はじめまして」と いうよ。",
          visual: { kind: "emoji", value: "🤝😊", caption: "Nice to meet you." },
        },
        {
          heading: "{名前|なまえ}と {出身|しゅっしん}",
          body: "「My name is 〜.」で {名前|なまえ}、「I'm from 〜.」で {出身|しゅっしん}を いえるよ。「I'm from Japan.」で「{日本|にほん} {出身|しゅっしん}」だね。",
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
          body: "{日本語|にほんご}の {音|おと}を アルファベットで あらわす かきかたが ローマじだよ。あ=a、か=ka、さ=sa のように きまっているよ。",
          visual: { kind: "emoji", value: "🔤", caption: "a ka sa ta na" },
        },
        {
          heading: "{名前|なまえ}を かいてみよう",
          body: "「やま」=yama、「そら」=sora、「ねこ」=neko のように、{音|おと}を 2{文字|もじ}ずつ あてはめるよ。じぶんの {名前|なまえ}も かけるね。",
          visual: { kind: "emoji", value: "✍️", caption: "yama / sora / neko" },
        },
        {
          heading: "{町|まち}で さがそう",
          body: "{駅|えき}の かんばんや {道|みち}の ひょうしきにも ローマじが あるよ。TOKYO や Tanaka を さがしてみよう。",
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
          heading: "{相手|あいて}に きいてみよう",
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
          heading: "{場所|ばしょ}の {単語|たんご}",
          body: "{駅|えき}=station、{図書館|としょかん}=library、{公園|こうえん}=park、{病院|びょういん}=hospital、ゆうびんきょく=post office だよ。",
          visual: { kind: "emoji", value: "🚉📚🏥", caption: "station / library / hospital" },
        },
        {
          heading: "{道|みち}を たずねる",
          body: "「Where is 〜？」は「〜は どこ？」。「Where is the station？」で「{駅|えき}は どこ？」だね。",
          visual: { kind: "emoji", value: "❓🗺️", caption: "Where is …？" },
        },
        {
          heading: "{道|みち}を おしえる",
          body: "「Go straight.」まっすぐ、「Turn right.」{右|みぎ}へ、「Turn left.」{左|ひだり}へ で {案内|あんない}できるよ。",
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
          body: "「How much？（ハウ マッチ）」は「いくら？」。かいたい ものの ねだんを きく {言葉|ことば}だよ。",
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
          heading: "{国|くに}の {英語|えいご}",
          body: "{日本|にほん}=Japan、アメリカ=America、イタリア=Italy、フランス=France、オーストラリア=Australia だよ。",
          visual: { kind: "emoji", value: "🇯🇵🇺🇸🇮🇹", caption: "Japan / America / Italy" },
        },
        {
          heading: "いきたい {国|くに}を いおう",
          body: "「I want to go to 〜.」は「〜に いきたい」。「I want to go to Italy.」で「イタリアに いきたい」だね。",
          visual: { kind: "emoji", value: "✈️🌍", caption: "I want to go to …" },
        },
        {
          heading: "なぜ いきたい？",
          body: "「I can see 〜.（〜が みられる）」や {有名|ゆうめい}な ものを そえると、もっと つたわるよ。",
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
          heading: "{教科|きょうか}の {英語|えいご}",
          body: "{算数|さんすう}=math、{国語|こくご}=Japanese、{理科|りか}=science、{社会|しゃかい}=social studies、{英語|えいご}=English だよ。",
          visual: { kind: "emoji", value: "🔢🔬📖", caption: "math / science / Japanese" },
        },
        {
          heading: "すきな {教科|きょうか}を いおう",
          body: "「What subject do you like？」は「どの {教科|きょうか}が すき？」。「I like music.」で こたえられるよ。",
          visual: { kind: "emoji", value: "🎵❓", caption: "What subject do you like？" },
        },
        {
          heading: "じかんわりを いおう",
          body: "「I have math on Monday.」のように、{曜日|ようび}（g4でならった days）と あわせて じかんわりを いえるよ。",
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
