// ══════════════════════════════════════════
// カリキュラム: 英語（えいご）小6（外国語・高学年／教科）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 高学年は教科「外国語」。過去・未来の表現、世界の文化、頻度、中学校への接続を扱う。
// 英単語は「表記（よみがな）」で提示し、解説は日本語ひらがな中心。
// subject/domain 命名は g3.ts / g4.ts と同一（中央集約時に id で重複排除される前提）。
// prerequisites は g4 単元（eigo.g4.*）を跨いで参照する（学年間ロードマップ）。
// 集約は中央（index.ts）で行う。本ファイルは index.ts を編集しない。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// g3/g4 と同一の教科定義（中央集約時に id で重複排除される前提）。

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
// g3/g4 と同じ領域タクソノミーを継続使用（学年非依存のカテゴリ）。
// 高学年の表現は「コミュニケーション（やりとり・発表）」と「ことば（語彙）」に収まる。

export const eigoG6Domains: Domain[] = [
  {
    id: "eigo.communication",
    subjectId: "eigo",
    name: "あいさつとやりとり",
    formalName: "コミュニケーション（やりとり・発表）",
  },
  {
    id: "eigo.words",
    subjectId: "eigo",
    name: "ことば（くに・ぶんか）",
    formalName: "語彙（国・文化・身のまわり）",
  },
];

// ── g4 単元 id（前提として参照する。中央集約時に解決される） ──
const G4 = {
  dailyRoutine: "eigo.g4.daily-routine",
} as const;

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺に DAG 化。g4 → g6 へ繋がる）:
//
//   g4.daily-routine ─▶ past-events ─┬─▶ summer-memories ─┐
//                                    └─▶ daily-frequency ─┼─▶ junior-high
//   world-cultures ───────────────────▶ future-dream ────┘
//                       summer-memories ─▶ future-dream
//
const U = {
  pastEvents: "eigo.g6.past-events",
  summerMemories: "eigo.g6.summer-memories",
  dailyFrequency: "eigo.g6.daily-life-frequency",
  worldCultures: "eigo.g6.world-cultures",
  futureDream: "eigo.g6.future-dream",
  juniorHigh: "eigo.g6.junior-high",
} as const;

export const eigoG6Units: Unit[] = [
  {
    id: U.pastEvents,
    subjectId: "eigo",
    grade: 6,
    domainId: "eigo.communication",
    title: "すぎた できごと（I went / I ate）",
    order: 1,
    realWorldUse: "きのうや きゅうじつに「どこへ いって・なにを たべたか」を えいごで つたえられるよ。",
    leadsTo: [U.summerMemories, U.dailyFrequency],
    prerequisites: [G4.dailyRoutine],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.summerMemories,
    subjectId: "eigo",
    grade: 6,
    domainId: "eigo.communication",
    title: "なつの おもいで（My summer vacation）",
    order: 2,
    realWorldUse: "なつやすみに したことを「I enjoyed 〜.」「It was fun.」で はっぴょうできるよ。",
    leadsTo: [U.futureDream],
    prerequisites: [U.pastEvents],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.dailyFrequency,
    subjectId: "eigo",
    grade: 6,
    domainId: "eigo.communication",
    title: "いちにちと ひんど（always / usually）",
    order: 3,
    realWorldUse: "「いつも・たいてい・ときどき」を つけて、じぶんの せいかつの しゅうかんを つたえられるよ。",
    leadsTo: [U.juniorHigh],
    prerequisites: [U.pastEvents],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.worldCultures,
    subjectId: "eigo",
    grade: 6,
    domainId: "eigo.words",
    title: "せかいと つながる ぶんか（world cultures）",
    order: 4,
    realWorldUse: "いろいろな くにの たべものや ゆうめいな ものを しって、「行ってみたい国」を つたえられるよ。",
    leadsTo: [U.futureDream],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.futureDream,
    subjectId: "eigo",
    grade: 6,
    domainId: "eigo.communication",
    title: "しょうらいの ゆめ（I want to be〜）",
    order: 5,
    realWorldUse: "じぶんの なりたい しごとを「I want to be a 〜.」で はっぴょうできるよ。",
    leadsTo: [U.juniorHigh],
    prerequisites: [U.summerMemories, U.worldCultures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.juniorHigh,
    subjectId: "eigo",
    grade: 6,
    domainId: "eigo.communication",
    title: "ちゅうがっこうで したいこと（junior high）",
    order: 6,
    realWorldUse: "ちゅうがくで はいりたい ぶかつや べんきょうしたい きょうかを えいごで つたえられるよ。",
    leadsTo: [],
    prerequisites: [U.futureDream, U.dailyFrequency],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は日本語ひらがな中心。

// すぎた できごと（過去のできごと）
const pastEventsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.pastEvents}.q-1`,
    unitId: U.pastEvents,
    prompt: "「I went to the park.」の went の いみは どれ かな？",
    explanation: "went（ウェント）は go（いく）の すぎた かたち だよ。「こうえんに いった」だね。",
    visual: { kind: "emoji", value: "🏞️🚶", caption: "I went …" },
    format: "choice",
    choices: ["いった", "いく", "くる", "かえる"],
    answer: "いった",
  },
  {
    id: `${U.pastEvents}.q-2`,
    unitId: U.pastEvents,
    prompt: "「I ate ice cream.」の ate の いみは どれ かな？",
    explanation: "ate（エイト）は eat（たべる）の すぎた かたち だよ。「アイスを たべた」だね。",
    visual: { kind: "emoji", value: "🍦😋", caption: "I ate …" },
    format: "choice",
    choices: ["たべた", "たべる", "のんだ", "つくった"],
    answer: "たべた",
  },
  {
    id: `${U.pastEvents}.q-3`,
    unitId: U.pastEvents,
    prompt: "「I saw a movie.」の saw の いみは どれ かな？",
    explanation: "saw（ソー）は see（みる）の すぎた かたち だよ。「えいがを みた」だね。",
    visual: { kind: "emoji", value: "🎬👀", caption: "I saw …" },
    format: "choice",
    choices: ["みた", "みる", "きいた", "いった"],
    answer: "みた",
  },
  {
    id: `${U.pastEvents}.q-4`,
    unitId: U.pastEvents,
    prompt: "「たのしかった」は えいごで どれ かな？",
    explanation: "「It was fun.（イット ワズ ファン）」で「たのしかった」だよ。was は is の すぎた かたち だよ。",
    visual: { kind: "emoji", value: "🎉😆", caption: "It was fun." },
    format: "choice",
    choices: ["It was fun.", "It is fun.", "I like fun.", "It will be fun."],
    answer: "It was fun.",
  },
  {
    id: `${U.pastEvents}.q-5`,
    unitId: U.pastEvents,
    prompt: "すぎた できごとを はなすとき、どうぶつことば（うごきの ことば）は どうなる かな？",
    explanation: "すぎた ことを いうときは うごきの ことばが かたちを かえるよ（go→went、eat→ate のように）。",
    visual: { kind: "emoji", value: "⏪", caption: "go → went" },
    format: "choice",
    choices: ["かたちが かわる", "ずっと おなじ", "なくなる", "ふたつに なる"],
    answer: "かたちが かわる",
  },
];

// なつの おもいで
const summerMemoriesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.summerMemories}.q-1`,
    unitId: U.summerMemories,
    prompt: "「summer vacation（サマー バケーション）」の いみは どれ かな？",
    explanation: "summer は なつ、vacation は やすみ。あわせて「なつやすみ」だよ。",
    visual: { kind: "emoji", value: "🏖️☀️", caption: "summer vacation" },
    format: "choice",
    choices: ["なつやすみ", "ふゆやすみ", "はるやすみ", "しゅくだい"],
    answer: "なつやすみ",
  },
  {
    id: `${U.summerMemories}.q-2`,
    unitId: U.summerMemories,
    prompt: "「I went to the sea.」の いみは どれ かな？",
    explanation: "sea（シー）は うみ。went は go の すぎた かたち。「うみに いった」だよ。",
    visual: { kind: "emoji", value: "🌊", caption: "the sea" },
    format: "choice",
    choices: ["うみに いった", "やまに いった", "うみが すき", "うみを みる"],
    answer: "うみに いった",
  },
  {
    id: `${U.summerMemories}.q-3`,
    unitId: U.summerMemories,
    prompt: "「I enjoyed swimming.」の enjoyed の いみは どれ かな？",
    explanation: "enjoyed（エンジョイド）は「たのしんだ」だよ。swimming は およぐこと だね。",
    visual: { kind: "emoji", value: "🏊😊", caption: "I enjoyed …" },
    format: "choice",
    choices: ["たのしんだ", "たのしむ", "おわった", "はじめた"],
    answer: "たのしんだ",
  },
  {
    id: `${U.summerMemories}.q-4`,
    unitId: U.summerMemories,
    prompt: "「It was delicious.」の delicious の いみは どれ かな？",
    explanation: "delicious（デリシャス）は「おいしい」だよ。was だから「おいしかった」だね。",
    visual: { kind: "emoji", value: "🍉😋", caption: "delicious" },
    format: "choice",
    choices: ["おいしい", "たのしい", "うつくしい", "おおきい"],
    answer: "おいしい",
  },
  {
    id: `${U.summerMemories}.q-5`,
    unitId: U.summerMemories,
    prompt: "なつの おもいでを はっぴょうする とき、どの かたちを つかう かな？",
    explanation: "もう おわった できごと だから、すぎた かたち（went・ate・enjoyed など）を つかうよ。",
    visual: { kind: "emoji", value: "📷", caption: "おもいで＝すぎたこと" },
    format: "choice",
    choices: ["すぎた かたち", "これからの かたち", "いまの かたち", "きく かたち"],
    answer: "すぎた かたち",
  },
];

// いちにちと ひんど
const dailyFrequencyQuestions: ChoiceQuestion[] = [
  {
    id: `${U.dailyFrequency}.q-1`,
    unitId: U.dailyFrequency,
    prompt: "「always（オールウェイズ）」の いみは どれ かな？",
    explanation: "always は「いつも」だよ。まいかい かならず する ことに つかうよ。",
    visual: { kind: "emoji", value: "🔁", caption: "always = いつも" },
    format: "choice",
    choices: ["いつも", "ときどき", "ぜんぜん", "たまに"],
    answer: "いつも",
  },
  {
    id: `${U.dailyFrequency}.q-2`,
    unitId: U.dailyFrequency,
    prompt: "「sometimes（サムタイムズ）」の いみは どれ かな？",
    explanation: "sometimes は「ときどき」だよ。たまに する ことに つかうよ。",
    visual: { kind: "emoji", value: "🕐", caption: "sometimes = ときどき" },
    format: "choice",
    choices: ["ときどき", "いつも", "けっして〜ない", "たいてい"],
    answer: "ときどき",
  },
  {
    id: `${U.dailyFrequency}.q-3`,
    unitId: U.dailyFrequency,
    prompt: "「usually（ユージュアリー）」の いみは どれ かな？",
    explanation: "usually は「たいてい」だよ。always（いつも）ほどでは ないけど よく する ことだよ。",
    visual: { kind: "emoji", value: "📅", caption: "usually = たいてい" },
    format: "choice",
    choices: ["たいてい", "ぜんぜん", "ときどき", "きのう"],
    answer: "たいてい",
  },
  {
    id: `${U.dailyFrequency}.q-4`,
    unitId: U.dailyFrequency,
    prompt: "「I always get up at six.」の いみは どれ かな？",
    explanation: "get up は おきる、six は 6じ。「わたしは いつも 6じに おきる」だよ。",
    visual: { kind: "emoji", value: "⏰🌅", caption: "always get up at six" },
    format: "choice",
    choices: ["いつも 6じに おきる", "ときどき 6じに ねる", "6じに いえを でる", "6じが すき"],
    answer: "いつも 6じに おきる",
  },
  {
    id: `${U.dailyFrequency}.q-5`,
    unitId: U.dailyFrequency,
    prompt: "ひんど（どれくらい するか）を あらわす ことばは どれ かな？",
    explanation: "always・usually・sometimes は どれくらい よく するかを あらわす「ひんど」の ことばだよ。",
    visual: { kind: "emoji", value: "📊", caption: "ひんどの ことば" },
    format: "choice",
    choices: ["always", "apple", "happy", "school"],
    answer: "always",
  },
];

// せかいと つながる ぶんか
const worldCulturesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.worldCultures}.q-1`,
    unitId: U.worldCultures,
    prompt: "「Australia（オーストラリア）」は なにの なまえ かな？",
    explanation: "Australia は くにの なまえ だよ。コアラや カンガルーが いる くにだね。",
    visual: { kind: "emoji", value: "🇦🇺🐨", caption: "Australia" },
    format: "choice",
    choices: ["くに", "たべもの", "どうぶつ", "いろ"],
    answer: "くに",
  },
  {
    id: `${U.worldCultures}.q-2`,
    unitId: U.worldCultures,
    prompt: "「Where do you want to go？」の いみは どれ かな？",
    explanation: "「Where（ウェア）」は「どこ」。「どこへ いきたい？」と きく ことばだよ。",
    visual: { kind: "emoji", value: "🗺️✈️", caption: "Where do you want to go？" },
    format: "choice",
    choices: ["どこへ いきたい？", "なにが ほしい？", "だれが すき？", "なんじ？"],
    answer: "どこへ いきたい？",
  },
  {
    id: `${U.worldCultures}.q-3`,
    unitId: U.worldCultures,
    prompt: "「You can eat pizza in Italy.」の いみに ちかいのは どれ かな？",
    explanation: "「You can 〜」は「〜できるよ」。「イタリアでは ピザが たべられる」だよ。",
    visual: { kind: "emoji", value: "🍕🇮🇹", caption: "pizza in Italy" },
    format: "choice",
    choices: [
      "イタリアでは ピザが たべられる",
      "イタリアで ピザを つくった",
      "ピザが すき",
      "ピザは たかい",
    ],
    answer: "イタリアでは ピザが たべられる",
  },
  {
    id: `${U.worldCultures}.q-4`,
    unitId: U.worldCultures,
    prompt: "「culture（カルチャー）」の いみは どれ かな？",
    explanation: "culture は「ぶんか」だよ。くにごとの たべものや まつり、ことばなどの ことだね。",
    visual: { kind: "emoji", value: "🌍🎎", caption: "culture = ぶんか" },
    format: "choice",
    choices: ["ぶんか", "ちず", "おかね", "てんき"],
    answer: "ぶんか",
  },
  {
    id: `${U.worldCultures}.q-5`,
    unitId: U.worldCultures,
    prompt: "「I want to go to America.」の いみは どれ かな？",
    explanation: "「I want to go to 〜」は「〜へ いきたい」。「アメリカへ いきたい」だよ。",
    visual: { kind: "emoji", value: "🇺🇸", caption: "go to America" },
    format: "choice",
    choices: ["アメリカへ いきたい", "アメリカが すき", "アメリカに いった", "アメリカは とおい"],
    answer: "アメリカへ いきたい",
  },
];

// しょうらいの ゆめ
const futureDreamQuestions: ChoiceQuestion[] = [
  {
    id: `${U.futureDream}.q-1`,
    unitId: U.futureDream,
    prompt: "「I want to be a teacher.」の いみは どれ かな？",
    explanation: "「I want to be a 〜」は「〜に なりたい」。teacher は せんせい。「せんせいに なりたい」だよ。",
    visual: { kind: "emoji", value: "🧑‍🏫", caption: "I want to be a teacher." },
    format: "choice",
    choices: ["せんせいに なりたい", "せんせいが すき", "せんせいに なった", "せんせいを みた"],
    answer: "せんせいに なりたい",
  },
  {
    id: `${U.futureDream}.q-2`,
    unitId: U.futureDream,
    prompt: "「doctor（ドクター）」の いみは どれ かな？",
    explanation: "doctor は「いしゃ」だよ。びょうきの 人を なおす しごとだね。",
    visual: { kind: "emoji", value: "🧑‍⚕️", caption: "doctor" },
    format: "choice",
    choices: ["いしゃ", "せんせい", "けいさつかん", "コック"],
    answer: "いしゃ",
  },
  {
    id: `${U.futureDream}.q-3`,
    unitId: U.futureDream,
    prompt: "「What do you want to be？」の いみは どれ かな？",
    explanation: "「なにに なりたい？」と しょうらいの ゆめを きく ことばだよ。",
    visual: { kind: "emoji", value: "🤔💭", caption: "What do you want to be？" },
    format: "choice",
    choices: ["なにに なりたい？", "なにが ほしい？", "どこに いきたい？", "なにが すき？"],
    answer: "なにに なりたい？",
  },
  {
    id: `${U.futureDream}.q-4`,
    unitId: U.futureDream,
    prompt: "「soccer player（サッカー プレイヤー）」の いみは どれ かな？",
    explanation: "soccer player は「サッカーせんしゅ」だよ。すきな スポーツを しごとに する ゆめだね。",
    visual: { kind: "emoji", value: "⚽", caption: "soccer player" },
    format: "choice",
    choices: ["サッカーせんしゅ", "やきゅうせんしゅ", "うんどうの せんせい", "コーチ"],
    answer: "サッカーせんしゅ",
  },
  {
    id: `${U.futureDream}.q-5`,
    unitId: U.futureDream,
    prompt: "なりたい しごとを つたえる ときに つかう ことばは どれ かな？",
    explanation: "なりたい ときは「I want to be 〜.」を つかうよ。「I want 〜.」は ほしい もの だよ。",
    visual: { kind: "emoji", value: "🌟", caption: "I want to be …" },
    format: "choice",
    choices: ["I want to be", "I want", "I went", "I like"],
    answer: "I want to be",
  },
];

// ちゅうがっこうで したいこと
const juniorHighQuestions: ChoiceQuestion[] = [
  {
    id: `${U.juniorHigh}.q-1`,
    unitId: U.juniorHigh,
    prompt: "「junior high school（ジュニア ハイ スクール）」の いみは どれ かな？",
    explanation: "junior high school は「ちゅうがっこう」だよ。しょうがっこうの つぎに いく がっこうだね。",
    visual: { kind: "emoji", value: "🏫", caption: "junior high school" },
    format: "choice",
    choices: ["ちゅうがっこう", "しょうがっこう", "こうこう", "だいがく"],
    answer: "ちゅうがっこう",
  },
  {
    id: `${U.juniorHigh}.q-2`,
    unitId: U.juniorHigh,
    prompt: "「I want to join the brass band.」の join の いみは どれ かな？",
    explanation: "join（ジョイン）は「はいる」だよ。brass band は すいそうがくぶ。「すいそうがくぶに はいりたい」だね。",
    visual: { kind: "emoji", value: "🎺", caption: "join the brass band" },
    format: "choice",
    choices: ["はいる", "やめる", "つくる", "みる"],
    answer: "はいる",
  },
  {
    id: `${U.juniorHigh}.q-3`,
    unitId: U.juniorHigh,
    prompt: "「I want to study English.」の study の いみは どれ かな？",
    explanation: "study（スタディ）は「べんきょうする」だよ。「えいごを べんきょうしたい」だね。",
    visual: { kind: "emoji", value: "📚", caption: "study English" },
    format: "choice",
    choices: ["べんきょうする", "あそぶ", "おしえる", "おぼえる"],
    answer: "べんきょうする",
  },
  {
    id: `${U.juniorHigh}.q-4`,
    unitId: U.juniorHigh,
    prompt: "「What club do you want to join？」の いみは どれ かな？",
    explanation: "club は ぶかつ。「どの ぶかつに はいりたい？」と きく ことばだよ。",
    visual: { kind: "emoji", value: "🏀🎨🎻", caption: "What club？" },
    format: "choice",
    choices: ["どの ぶかつに はいりたい？", "なにが すき？", "どこに いきたい？", "なにに なりたい？"],
    answer: "どの ぶかつに はいりたい？",
  },
  {
    id: `${U.juniorHigh}.q-5`,
    unitId: U.juniorHigh,
    prompt: "「I want to enjoy school events.」の event の いみは どれ かな？",
    explanation: "event（イベント）は「ぎょうじ」だよ。うんどうかいや えんそくなどの ことだね。",
    visual: { kind: "emoji", value: "🎏🎒", caption: "school events" },
    format: "choice",
    choices: ["ぎょうじ", "じゅぎょう", "やすみ", "きゅうしょく"],
    answer: "ぎょうじ",
  },
];

export const eigoG6Contents: Record<string, UnitContent> = {
  [U.pastEvents]: {
    unitId: U.pastEvents,
    learn: {
      unitId: U.pastEvents,
      steps: [
        {
          heading: "すぎた ことを いおう",
          body: "もう おわった できごとを いうときは、うごきの ことばが かたちを かえるよ。go（いく）→ went（いった）。",
          visual: { kind: "emoji", value: "⏪🚶", caption: "go → went" },
        },
        {
          heading: "よく つかう すぎた かたち",
          body: "「went（いった）」「ate（たべた）」「saw（みた）」「enjoyed（たのしんだ）」を おぼえよう。",
          visual: { kind: "emoji", value: "🍦🎬🏞️", caption: "went / ate / saw" },
        },
        {
          heading: "was で きもちを いおう",
          body: "「It was fun.（たのしかった）」「It was good.（よかった）」の was は is の すぎた かたち だよ。",
          visual: { kind: "emoji", value: "😆", caption: "It was fun." },
        },
      ],
    },
    test: {
      unitId: U.pastEvents,
      questions: pastEventsQuestions,
      questionCount: 5,
    },
  },

  [U.summerMemories]: {
    unitId: U.summerMemories,
    learn: {
      unitId: U.summerMemories,
      steps: [
        {
          heading: "なつやすみの はなし",
          body: "「My summer vacation（わたしの なつやすみ）」を テーマに、したことを はっぴょうするよ。",
          visual: { kind: "emoji", value: "🏖️", caption: "summer vacation" },
        },
        {
          heading: "どこへ いった？ なにを した？",
          body: "「I went to the sea.（うみに いった）」「I enjoyed swimming.（およぐのを たのしんだ）」のように いうよ。",
          visual: { kind: "emoji", value: "🌊🏊", caption: "I went / I enjoyed" },
        },
        {
          heading: "かんそうを つたえよう",
          body: "「It was fun.（たのしかった）」「It was delicious.（おいしかった）」で きもちを つたえよう。",
          visual: { kind: "emoji", value: "🍉😋", caption: "It was delicious." },
        },
      ],
    },
    test: {
      unitId: U.summerMemories,
      questions: summerMemoriesQuestions,
      questionCount: 5,
    },
  },

  [U.dailyFrequency]: {
    unitId: U.dailyFrequency,
    learn: {
      unitId: U.dailyFrequency,
      steps: [
        {
          heading: "どれくらい する？",
          body: "「いつも・たいてい・ときどき」を あらわす ことばを つかうと、しゅうかんが つたわるよ。",
          visual: { kind: "emoji", value: "📊", caption: "ひんどの ことば" },
        },
        {
          heading: "ひんどの ことば",
          body: "always（いつも）・usually（たいてい）・sometimes（ときどき）を おぼえよう。",
          visual: { kind: "emoji", value: "🔁🕐", caption: "always / usually / sometimes" },
        },
        {
          heading: "いちにちと あわせて",
          body: "「I always get up at six.（いつも 6じに おきる）」のように、せいかつと あわせて いえるよ。",
          visual: { kind: "emoji", value: "⏰🌅", caption: "I always get up at six." },
        },
      ],
    },
    test: {
      unitId: U.dailyFrequency,
      questions: dailyFrequencyQuestions,
      questionCount: 5,
    },
  },

  [U.worldCultures]: {
    unitId: U.worldCultures,
    learn: {
      unitId: U.worldCultures,
      steps: [
        {
          heading: "せかいの くに",
          body: "Australia（オーストラリア）・Italy（イタリア）・America（アメリカ）など、くにの なまえを しろう。",
          visual: { kind: "emoji", value: "🌍", caption: "world countries" },
        },
        {
          heading: "その くにの ぶんか",
          body: "「You can eat pizza in Italy.（イタリアでは ピザが たべられる）」のように、できることを いえるよ。",
          visual: { kind: "emoji", value: "🍕🇮🇹", caption: "You can …" },
        },
        {
          heading: "いきたい くにを いおう",
          body: "「Where do you want to go？（どこへ いきたい？）」「I want to go to 〜.（〜へ いきたい）」で やりとりしよう。",
          visual: { kind: "emoji", value: "✈️🗺️", caption: "Where do you want to go？" },
        },
      ],
    },
    test: {
      unitId: U.worldCultures,
      questions: worldCulturesQuestions,
      questionCount: 5,
    },
  },

  [U.futureDream]: {
    unitId: U.futureDream,
    learn: {
      unitId: U.futureDream,
      steps: [
        {
          heading: "I want to be 〜.",
          body: "「I want to be a 〜.（〜に なりたい）」で しょうらいの ゆめを いえるよ。",
          visual: { kind: "emoji", value: "🌟", caption: "I want to be …" },
        },
        {
          heading: "しごとの ことば",
          body: "teacher（せんせい）・doctor（いしゃ）・soccer player（サッカーせんしゅ）など、しごとの たんごを おぼえよう。",
          visual: { kind: "emoji", value: "🧑‍🏫🧑‍⚕️⚽", caption: "teacher / doctor / player" },
        },
        {
          heading: "あいてに きいて みよう",
          body: "「What do you want to be？（なにに なりたい？）」と きいて、ゆめを はなしあおう。",
          visual: { kind: "emoji", value: "💭", caption: "What do you want to be？" },
        },
      ],
    },
    test: {
      unitId: U.futureDream,
      questions: futureDreamQuestions,
      questionCount: 5,
    },
  },

  [U.juniorHigh]: {
    unitId: U.juniorHigh,
    learn: {
      unitId: U.juniorHigh,
      steps: [
        {
          heading: "ちゅうがっこうへ",
          body: "「junior high school（ちゅうがっこう）」で したいことを えいごで いえるように なろう。",
          visual: { kind: "emoji", value: "🏫", caption: "junior high school" },
        },
        {
          heading: "はいりたい ぶかつ",
          body: "「I want to join the 〜.（〜に はいりたい）」で ぶかつを いえるよ。brass band（すいそうがくぶ）など。",
          visual: { kind: "emoji", value: "🎺🏀", caption: "I want to join …" },
        },
        {
          heading: "べんきょう・ぎょうじ",
          body: "「I want to study English.（えいごを べんきょうしたい）」「I want to enjoy school events.（ぎょうじを たのしみたい）」。",
          visual: { kind: "emoji", value: "📚🎏", caption: "study / events" },
        },
      ],
    },
    test: {
      unitId: U.juniorHigh,
      questions: juniorHighQuestions,
      questionCount: 5,
    },
  },
};
