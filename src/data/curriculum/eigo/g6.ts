// ══════════════════════════════════════════
// カリキュラム: 英語（えいご）小6（外国語・高学年／教科）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 高学年は教科「外国語」。過去・未来の表現、世界の文化、頻度、中学校への接続を扱う。
// 英単語は「表記（よみがな）」で提示し、解説は日本語ひらがな中心。
// 表記規約（2026-06-02 レトロフィット）: 日本語の表示テキストは「漢字＋全漢字ルビ」記法
//   {漢字|よみ} で執筆（小6配当までの漢字のみ。配当外の漢字は使わずひらがなのまま。英単語はそのまま）。
//   formalName など管理用の正式名は素の漢字でよい。
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
    name: "{言葉|ことば}（{国|くに}・{文化|ぶんか}）",
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
    title: "{過|す}ぎた {出来事|できごと}（I went / I ate）",
    order: 1,
    realWorldUse:
      "{昨日|きのう}や {休日|きゅうじつ}に「どこへ {行|い}って・{何|なに}を {食|た}べたか」を {英語|えいご}で {伝|つた}えられるよ。",
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
    title: "{夏|なつ}の {思|おも}い{出|で}（My summer vacation）",
    order: 2,
    realWorldUse:
      "{夏休|なつやす}みに したことを「I enjoyed 〜.」「It was fun.」で {発表|はっぴょう}できるよ。",
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
    title: "{一日|いちにち}と ひんど（always / usually）",
    order: 3,
    realWorldUse:
      "「いつも・たいてい・ときどき」を {付|つ}けて、{自分|じぶん}の {生活|せいかつ}の {習慣|しゅうかん}を {伝|つた}えられるよ。",
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
    title: "{世界|せかい}と つながる {文化|ぶんか}（world cultures）",
    order: 4,
    realWorldUse:
      "いろいろな {国|くに}の {食|た}べ{物|もの}や {有名|ゆうめい}な {物|もの}を {知|し}って、「{行|い}ってみたい{国|くに}」を {伝|つた}えられるよ。",
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
    title: "{将来|しょうらい}の {夢|ゆめ}（I want to be〜）",
    order: 5,
    realWorldUse:
      "{自分|じぶん}の なりたい {仕事|しごと}を「I want to be a 〜.」で {発表|はっぴょう}できるよ。",
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
    title: "{中学校|ちゅうがっこう}で したいこと（junior high）",
    order: 6,
    realWorldUse:
      "{中学|ちゅうがく}で {入|はい}りたい {部活|ぶかつ}や {勉強|べんきょう}したい {教科|きょうか}を {英語|えいご}で {伝|つた}えられるよ。",
    leadsTo: [],
    prerequisites: [U.futureDream, U.dailyFrequency],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は漢字＋ルビ／英単語はそのまま。

// すぎた できごと（過去のできごと）
const pastEventsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.pastEvents}.q-1`,
    unitId: U.pastEvents,
    prompt: "「I went to the park.」の went の {意味|いみ}は どれ かな？",
    explanation: "went（ウェント）は go（{行|い}く）の {過|す}ぎた {形|かたち} だよ。「{公園|こうえん}に {行|い}った」だね。",
    visual: { kind: "emoji", value: "🏞️🚶", caption: "I went …" },
    format: "choice",
    choices: ["{行|い}った", "{行|い}く", "{来|く}る", "{帰|かえ}る"],
    answer: "{行|い}った",
  },
  {
    id: `${U.pastEvents}.q-2`,
    unitId: U.pastEvents,
    prompt: "「I ate ice cream.」の ate の {意味|いみ}は どれ かな？",
    explanation: "ate（エイト）は eat（{食|た}べる）の {過|す}ぎた {形|かたち} だよ。「アイスを {食|た}べた」だね。",
    visual: { kind: "emoji", value: "🍦😋", caption: "I ate …" },
    format: "choice",
    choices: ["{食|た}べた", "{食|た}べる", "{飲|の}んだ", "{作|つく}った"],
    answer: "{食|た}べた",
  },
  {
    id: `${U.pastEvents}.q-3`,
    unitId: U.pastEvents,
    prompt: "「I saw a movie.」の saw の {意味|いみ}は どれ かな？",
    explanation: "saw（ソー）は see（{見|み}る）の {過|す}ぎた {形|かたち} だよ。「{映画|えいが}を {見|み}た」だね。",
    visual: { kind: "emoji", value: "🎬👀", caption: "I saw …" },
    format: "choice",
    choices: ["{見|み}た", "{見|み}る", "{聞|き}いた", "{行|い}った"],
    answer: "{見|み}た",
  },
  {
    id: `${U.pastEvents}.q-4`,
    unitId: U.pastEvents,
    prompt: "「{楽|たの}しかった」は {英語|えいご}で どれ かな？",
    explanation: "「It was fun.（イット ワズ ファン）」で「{楽|たの}しかった」だよ。was は is の {過|す}ぎた {形|かたち} だよ。",
    visual: { kind: "emoji", value: "🎉😆", caption: "It was fun." },
    format: "choice",
    choices: ["It was fun.", "It is fun.", "I like fun.", "It will be fun."],
    answer: "It was fun.",
  },
  {
    id: `${U.pastEvents}.q-5`,
    unitId: U.pastEvents,
    prompt: "{過|す}ぎた {出来事|できごと}を {話|はな}すとき、うごきの {言葉|ことば}は どうなる かな？",
    explanation: "{過|す}ぎた ことを {言|い}うときは {動|うご}きの {言葉|ことば}が {形|かたち}を {変|か}えるよ（go→went、eat→ate のように）。",
    visual: { kind: "emoji", value: "⏪", caption: "go → went" },
    format: "choice",
    choices: ["{形|かたち}が {変|か}わる", "ずっと {同|おな}じ", "なくなる", "{二|ふた}つに なる"],
    answer: "{形|かたち}が {変|か}わる",
  },
];

// なつの おもいで
const summerMemoriesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.summerMemories}.q-1`,
    unitId: U.summerMemories,
    prompt: "「summer vacation（サマー バケーション）」の {意味|いみ}は どれ かな？",
    explanation: "summer は {夏|なつ}、vacation は {休|やす}み。{合|あ}わせて「{夏休|なつやす}み」だよ。",
    visual: { kind: "emoji", value: "🏖️☀️", caption: "summer vacation" },
    format: "choice",
    choices: ["{夏休|なつやす}み", "{冬休|ふゆやす}み", "{春休|はるやす}み", "{宿題|しゅくだい}"],
    answer: "{夏休|なつやす}み",
  },
  {
    id: `${U.summerMemories}.q-2`,
    unitId: U.summerMemories,
    prompt: "「I went to the sea.」の {意味|いみ}は どれ かな？",
    explanation: "sea（シー）は {海|うみ}。went は go の {過|す}ぎた {形|かたち}。「{海|うみ}に {行|い}った」だよ。",
    visual: { kind: "emoji", value: "🌊", caption: "the sea" },
    format: "choice",
    choices: ["{海|うみ}に {行|い}った", "{山|やま}に {行|い}った", "{海|うみ}が {好|す}き", "{海|うみ}を {見|み}る"],
    answer: "{海|うみ}に {行|い}った",
  },
  {
    id: `${U.summerMemories}.q-3`,
    unitId: U.summerMemories,
    prompt: "「I enjoyed swimming.」の enjoyed の {意味|いみ}は どれ かな？",
    explanation: "enjoyed（エンジョイド）は「{楽|たの}しんだ」だよ。swimming は {泳|およ}ぐこと だね。",
    visual: { kind: "emoji", value: "🏊😊", caption: "I enjoyed …" },
    format: "choice",
    choices: ["{楽|たの}しんだ", "{楽|たの}しむ", "{終|お}わった", "{始|はじ}めた"],
    answer: "{楽|たの}しんだ",
  },
  {
    id: `${U.summerMemories}.q-4`,
    unitId: U.summerMemories,
    prompt: "「It was delicious.」の delicious の {意味|いみ}は どれ かな？",
    explanation: "delicious（デリシャス）は「おいしい」だよ。was だから「おいしかった」だね。",
    visual: { kind: "emoji", value: "🍉😋", caption: "delicious" },
    format: "choice",
    choices: ["おいしい", "{楽|たの}しい", "{美|うつく}しい", "{大|おお}きい"],
    answer: "おいしい",
  },
  {
    id: `${U.summerMemories}.q-5`,
    unitId: U.summerMemories,
    prompt: "{夏|なつ}の {思|おも}い{出|で}を {発表|はっぴょう}する とき、どの {形|かたち}を {使|つか}う かな？",
    explanation: "もう {終|お}わった {出来事|できごと} だから、{過|す}ぎた {形|かたち}（went・ate・enjoyed など）を {使|つか}うよ。",
    visual: { kind: "emoji", value: "📷", caption: "{思|おも}い{出|で}＝{過|す}ぎたこと" },
    format: "choice",
    choices: ["{過|す}ぎた {形|かたち}", "これからの {形|かたち}", "{今|いま}の {形|かたち}", "{聞|き}く {形|かたち}"],
    answer: "{過|す}ぎた {形|かたち}",
  },
];

// いちにちと ひんど
const dailyFrequencyQuestions: ChoiceQuestion[] = [
  {
    id: `${U.dailyFrequency}.q-1`,
    unitId: U.dailyFrequency,
    prompt: "「always（オールウェイズ）」の {意味|いみ}は どれ かな？",
    explanation: "always は「いつも」だよ。{毎回|まいかい} {必|かなら}ず する ことに {使|つか}うよ。",
    visual: { kind: "emoji", value: "🔁", caption: "always = いつも" },
    format: "choice",
    choices: ["いつも", "ときどき", "ぜんぜん", "たまに"],
    answer: "いつも",
  },
  {
    id: `${U.dailyFrequency}.q-2`,
    unitId: U.dailyFrequency,
    prompt: "「sometimes（サムタイムズ）」の {意味|いみ}は どれ かな？",
    explanation: "sometimes は「ときどき」だよ。たまに する ことに {使|つか}うよ。",
    visual: { kind: "emoji", value: "🕐", caption: "sometimes = ときどき" },
    format: "choice",
    choices: ["ときどき", "いつも", "けっして〜ない", "たいてい"],
    answer: "ときどき",
  },
  {
    id: `${U.dailyFrequency}.q-3`,
    unitId: U.dailyFrequency,
    prompt: "「usually（ユージュアリー）」の {意味|いみ}は どれ かな？",
    explanation: "usually は「たいてい」だよ。always（いつも）ほどでは ないけど よく する ことだよ。",
    visual: { kind: "emoji", value: "📅", caption: "usually = たいてい" },
    format: "choice",
    choices: ["たいてい", "ぜんぜん", "ときどき", "{昨日|きのう}"],
    answer: "たいてい",
  },
  {
    id: `${U.dailyFrequency}.q-4`,
    unitId: U.dailyFrequency,
    prompt: "「I always get up at six.」の {意味|いみ}は どれ かな？",
    explanation: "get up は {起|お}きる、six は 6{時|じ}。「{私|わたし}は いつも 6{時|じ}に {起|お}きる」だよ。",
    visual: { kind: "emoji", value: "⏰🌅", caption: "always get up at six" },
    format: "choice",
    choices: ["いつも 6{時|じ}に {起|お}きる", "ときどき 6{時|じ}に {寝|ね}る", "6{時|じ}に {家|いえ}を {出|で}る", "6{時|じ}が {好|す}き"],
    answer: "いつも 6{時|じ}に {起|お}きる",
  },
  {
    id: `${U.dailyFrequency}.q-5`,
    unitId: U.dailyFrequency,
    prompt: "ひんど（どれくらい するか）を {表|あらわ}す {言葉|ことば}は どれ かな？",
    explanation: "always・usually・sometimes は どれくらい よく するかを {表|あらわ}す「ひんど」の {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "📊", caption: "ひんどの {言葉|ことば}" },
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
    prompt: "「Australia（オーストラリア）」は {何|なに}の {名前|なまえ} かな？",
    explanation: "Australia は {国|くに}の {名前|なまえ} だよ。コアラや カンガルーが いる {国|くに}だね。",
    visual: { kind: "emoji", value: "🇦🇺🐨", caption: "Australia" },
    format: "choice",
    choices: ["{国|くに}", "{食|た}べ{物|もの}", "{動物|どうぶつ}", "{色|いろ}"],
    answer: "{国|くに}",
  },
  {
    id: `${U.worldCultures}.q-2`,
    unitId: U.worldCultures,
    prompt: "「Where do you want to go？」の {意味|いみ}は どれ かな？",
    explanation: "「Where（ウェア）」は「どこ」。「どこへ {行|い}きたい？」と {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🗺️✈️", caption: "Where do you want to go？" },
    format: "choice",
    choices: ["どこへ {行|い}きたい？", "{何|なに}が {欲|ほ}しい？", "{誰|だれ}が {好|す}き？", "{何|なん}{時|じ}？"],
    answer: "どこへ {行|い}きたい？",
  },
  {
    id: `${U.worldCultures}.q-3`,
    unitId: U.worldCultures,
    prompt: "「You can eat pizza in Italy.」の {意味|いみ}に {近|ちか}いのは どれ かな？",
    explanation: "「You can 〜」は「〜できるよ」。「イタリアでは ピザが {食|た}べられる」だよ。",
    visual: { kind: "emoji", value: "🍕🇮🇹", caption: "pizza in Italy" },
    format: "choice",
    choices: [
      "イタリアでは ピザが {食|た}べられる",
      "イタリアで ピザを {作|つく}った",
      "ピザが {好|す}き",
      "ピザは {高|たか}い",
    ],
    answer: "イタリアでは ピザが {食|た}べられる",
  },
  {
    id: `${U.worldCultures}.q-4`,
    unitId: U.worldCultures,
    prompt: "「culture（カルチャー）」の {意味|いみ}は どれ かな？",
    explanation: "culture は「{文化|ぶんか}」だよ。{国|くに}ごとの {食|た}べ{物|もの}や {祭|まつ}り、{言葉|ことば}などの ことだね。",
    visual: { kind: "emoji", value: "🌍🎎", caption: "culture = {文化|ぶんか}" },
    format: "choice",
    choices: ["{文化|ぶんか}", "{地図|ちず}", "お{金|かね}", "{天気|てんき}"],
    answer: "{文化|ぶんか}",
  },
  {
    id: `${U.worldCultures}.q-5`,
    unitId: U.worldCultures,
    prompt: "「I want to go to America.」の {意味|いみ}は どれ かな？",
    explanation: "「I want to go to 〜」は「〜へ {行|い}きたい」。「アメリカへ {行|い}きたい」だよ。",
    visual: { kind: "emoji", value: "🇺🇸", caption: "go to America" },
    format: "choice",
    choices: ["アメリカへ {行|い}きたい", "アメリカが {好|す}き", "アメリカに {行|い}った", "アメリカは {遠|とお}い"],
    answer: "アメリカへ {行|い}きたい",
  },
];

// しょうらいの ゆめ
const futureDreamQuestions: ChoiceQuestion[] = [
  {
    id: `${U.futureDream}.q-1`,
    unitId: U.futureDream,
    prompt: "「I want to be a teacher.」の {意味|いみ}は どれ かな？",
    explanation: "「I want to be a 〜」は「〜に なりたい」。teacher は {先生|せんせい}。「{先生|せんせい}に なりたい」だよ。",
    visual: { kind: "emoji", value: "🧑‍🏫", caption: "I want to be a teacher." },
    format: "choice",
    choices: ["{先生|せんせい}に なりたい", "{先生|せんせい}が {好|す}き", "{先生|せんせい}に なった", "{先生|せんせい}を {見|み}た"],
    answer: "{先生|せんせい}に なりたい",
  },
  {
    id: `${U.futureDream}.q-2`,
    unitId: U.futureDream,
    prompt: "「doctor（ドクター）」の {意味|いみ}は どれ かな？",
    explanation: "doctor は「{医者|いしゃ}」だよ。{病気|びょうき}の {人|ひと}を {治|なお}す {仕事|しごと}だね。",
    visual: { kind: "emoji", value: "🧑‍⚕️", caption: "doctor" },
    format: "choice",
    choices: ["{医者|いしゃ}", "{先生|せんせい}", "{警察官|けいさつかん}", "コック"],
    answer: "{医者|いしゃ}",
  },
  {
    id: `${U.futureDream}.q-3`,
    unitId: U.futureDream,
    prompt: "「What do you want to be？」の {意味|いみ}は どれ かな？",
    explanation: "「{何|なに}に なりたい？」と {将来|しょうらい}の {夢|ゆめ}を {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔💭", caption: "What do you want to be？" },
    format: "choice",
    choices: ["{何|なに}に なりたい？", "{何|なに}が {欲|ほ}しい？", "どこに {行|い}きたい？", "{何|なに}が {好|す}き？"],
    answer: "{何|なに}に なりたい？",
  },
  {
    id: `${U.futureDream}.q-4`,
    unitId: U.futureDream,
    prompt: "「soccer player（サッカー プレイヤー）」の {意味|いみ}は どれ かな？",
    explanation: "soccer player は「サッカー{選手|せんしゅ}」だよ。{好|す}きな スポーツを {仕事|しごと}に する {夢|ゆめ}だね。",
    visual: { kind: "emoji", value: "⚽", caption: "soccer player" },
    format: "choice",
    choices: ["サッカー{選手|せんしゅ}", "{野球|やきゅう}{選手|せんしゅ}", "{運動|うんどう}の {先生|せんせい}", "コーチ"],
    answer: "サッカー{選手|せんしゅ}",
  },
  {
    id: `${U.futureDream}.q-5`,
    unitId: U.futureDream,
    prompt: "なりたい {仕事|しごと}を {伝|つた}える ときに {使|つか}う {言葉|ことば}は どれ かな？",
    explanation: "なりたい ときは「I want to be 〜.」を {使|つか}うよ。「I want 〜.」は {欲|ほ}しい {物|もの} だよ。",
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
    prompt: "「junior high school（ジュニア ハイ スクール）」の {意味|いみ}は どれ かな？",
    explanation: "junior high school は「{中学校|ちゅうがっこう}」だよ。{小学校|しょうがっこう}の つぎに {行|い}く {学校|がっこう}だね。",
    visual: { kind: "emoji", value: "🏫", caption: "junior high school" },
    format: "choice",
    choices: ["{中学校|ちゅうがっこう}", "{小学校|しょうがっこう}", "{高校|こうこう}", "{大学|だいがく}"],
    answer: "{中学校|ちゅうがっこう}",
  },
  {
    id: `${U.juniorHigh}.q-2`,
    unitId: U.juniorHigh,
    prompt: "「I want to join the brass band.」の join の {意味|いみ}は どれ かな？",
    explanation: "join（ジョイン）は「{入|はい}る」だよ。brass band は {吹奏楽|すいそうがく}{部|ぶ}。「{吹奏楽|すいそうがく}{部|ぶ}に {入|はい}りたい」だね。",
    visual: { kind: "emoji", value: "🎺", caption: "join the brass band" },
    format: "choice",
    choices: ["{入|はい}る", "やめる", "{作|つく}る", "{見|み}る"],
    answer: "{入|はい}る",
  },
  {
    id: `${U.juniorHigh}.q-3`,
    unitId: U.juniorHigh,
    prompt: "「I want to study English.」の study の {意味|いみ}は どれ かな？",
    explanation: "study（スタディ）は「{勉強|べんきょう}する」だよ。「{英語|えいご}を {勉強|べんきょう}したい」だね。",
    visual: { kind: "emoji", value: "📚", caption: "study English" },
    format: "choice",
    choices: ["{勉強|べんきょう}する", "{遊|あそ}ぶ", "{教|おし}える", "{覚|おぼ}える"],
    answer: "{勉強|べんきょう}する",
  },
  {
    id: `${U.juniorHigh}.q-4`,
    unitId: U.juniorHigh,
    prompt: "「What club do you want to join？」の {意味|いみ}は どれ かな？",
    explanation: "club は {部活|ぶかつ}。「どの {部活|ぶかつ}に {入|はい}りたい？」と {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🏀🎨🎻", caption: "What club？" },
    format: "choice",
    choices: ["どの {部活|ぶかつ}に {入|はい}りたい？", "{何|なに}が {好|す}き？", "どこに {行|い}きたい？", "{何|なに}に なりたい？"],
    answer: "どの {部活|ぶかつ}に {入|はい}りたい？",
  },
  {
    id: `${U.juniorHigh}.q-5`,
    unitId: U.juniorHigh,
    prompt: "「I want to enjoy school events.」の event の {意味|いみ}は どれ かな？",
    explanation: "event（イベント）は「{行事|ぎょうじ}」だよ。{運動会|うんどうかい}や {遠足|えんそく}などの ことだね。",
    visual: { kind: "emoji", value: "🎏🎒", caption: "school events" },
    format: "choice",
    choices: ["{行事|ぎょうじ}", "{授業|じゅぎょう}", "{休|やす}み", "{給食|きゅうしょく}"],
    answer: "{行事|ぎょうじ}",
  },
];

export const eigoG6Contents: Record<string, UnitContent> = {
  [U.pastEvents]: {
    unitId: U.pastEvents,
    learn: {
      unitId: U.pastEvents,
      steps: [
        {
          heading: "{過|す}ぎた ことを いおう",
          body: "もう {終|お}わった {出来事|できごと}を {言|い}うときは、{動|うご}きの {言葉|ことば}が {形|かたち}を {変|か}えるよ。go（{行|い}く）→ went（{行|い}った）。",
          visual: { kind: "emoji", value: "⏪🚶", caption: "go → went" },
        },
        {
          heading: "よく {使|つか}う {過|す}ぎた {形|かたち}",
          body: "「went（{行|い}った）」「ate（{食|た}べた）」「saw（{見|み}た）」「enjoyed（{楽|たの}しんだ）」を {覚|おぼ}えよう。",
          visual: { kind: "emoji", value: "🍦🎬🏞️", caption: "went / ate / saw" },
        },
        {
          heading: "was で {気持|きも}ちを いおう",
          body: "「It was fun.（{楽|たの}しかった）」「It was good.（よかった）」の was は is の {過|す}ぎた {形|かたち} だよ。",
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
          heading: "{夏休|なつやす}みの {話|はなし}",
          body: "「My summer vacation（{私|わたし}の {夏休|なつやす}み）」を テーマに、したことを {発表|はっぴょう}するよ。",
          visual: { kind: "emoji", value: "🏖️", caption: "summer vacation" },
        },
        {
          heading: "どこへ {行|い}った？ {何|なに}を した？",
          body: "「I went to the sea.（{海|うみ}に {行|い}った）」「I enjoyed swimming.（{泳|およ}ぐのを {楽|たの}しんだ）」のように {言|い}うよ。",
          visual: { kind: "emoji", value: "🌊🏊", caption: "I went / I enjoyed" },
        },
        {
          heading: "{感想|かんそう}を {伝|つた}えよう",
          body: "「It was fun.（{楽|たの}しかった）」「It was delicious.（おいしかった）」で {気持|きも}ちを {伝|つた}えよう。",
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
          body: "「いつも・たいてい・ときどき」を {表|あらわ}す {言葉|ことば}を {使|つか}うと、{習慣|しゅうかん}が {伝|つた}わるよ。",
          visual: { kind: "emoji", value: "📊", caption: "ひんどの {言葉|ことば}" },
        },
        {
          heading: "ひんどの {言葉|ことば}",
          body: "always（いつも）・usually（たいてい）・sometimes（ときどき）を {覚|おぼ}えよう。",
          visual: { kind: "emoji", value: "🔁🕐", caption: "always / usually / sometimes" },
        },
        {
          heading: "{一日|いちにち}と {合|あ}わせて",
          body: "「I always get up at six.（いつも 6{時|じ}に {起|お}きる）」のように、{生活|せいかつ}と {合|あ}わせて {言|い}えるよ。",
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
          heading: "{世界|せかい}の {国|くに}",
          body: "Australia（オーストラリア）・Italy（イタリア）・America（アメリカ）など、{国|くに}の {名前|なまえ}を {知|し}ろう。",
          visual: { kind: "emoji", value: "🌍", caption: "world countries" },
        },
        {
          heading: "その {国|くに}の {文化|ぶんか}",
          body: "「You can eat pizza in Italy.（イタリアでは ピザが {食|た}べられる）」のように、できることを {言|い}えるよ。",
          visual: { kind: "emoji", value: "🍕🇮🇹", caption: "You can …" },
        },
        {
          heading: "{行|い}きたい {国|くに}を いおう",
          body: "「Where do you want to go？（どこへ {行|い}きたい？）」「I want to go to 〜.（〜へ {行|い}きたい）」で やりとりしよう。",
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
          body: "「I want to be a 〜.（〜に なりたい）」で {将来|しょうらい}の {夢|ゆめ}を {言|い}えるよ。",
          visual: { kind: "emoji", value: "🌟", caption: "I want to be …" },
        },
        {
          heading: "{仕事|しごと}の {言葉|ことば}",
          body: "teacher（{先生|せんせい}）・doctor（{医者|いしゃ}）・soccer player（サッカー{選手|せんしゅ}）など、{仕事|しごと}の {単語|たんご}を {覚|おぼ}えよう。",
          visual: { kind: "emoji", value: "🧑‍🏫🧑‍⚕️⚽", caption: "teacher / doctor / player" },
        },
        {
          heading: "{相手|あいて}に {聞|き}いて みよう",
          body: "「What do you want to be？（{何|なに}に なりたい？）」と {聞|き}いて、{夢|ゆめ}を {話|はな}し{合|あ}おう。",
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
          heading: "{中学校|ちゅうがっこう}へ",
          body: "「junior high school（{中学校|ちゅうがっこう}）」で したいことを {英語|えいご}で {言|い}えるように なろう。",
          visual: { kind: "emoji", value: "🏫", caption: "junior high school" },
        },
        {
          heading: "{入|はい}りたい {部活|ぶかつ}",
          body: "「I want to join the 〜.（〜に {入|はい}りたい）」で {部活|ぶかつ}を {言|い}えるよ。brass band（{吹奏楽|すいそうがく}{部|ぶ}）など。",
          visual: { kind: "emoji", value: "🎺🏀", caption: "I want to join …" },
        },
        {
          heading: "{勉強|べんきょう}・{行事|ぎょうじ}",
          body: "「I want to study English.（{英語|えいご}を {勉強|べんきょう}したい）」「I want to enjoy school events.（{行事|ぎょうじ}を {楽|たの}しみたい）」。",
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
