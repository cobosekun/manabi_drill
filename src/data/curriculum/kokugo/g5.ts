// ══════════════════════════════════════════
// カリキュラム: 国語（こくご）小5
// 基準テンプレ src/data/curriculum/sansuu/g1.ts と同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
//
// 学習指導要領（小5 国語）に基づく領域・内容:
//  ・知識及び技能: 漢字193字（読み・書き）/ 和語・漢語・外来語 / 敬語 / 文の組み立て（複文）
//                 / 古文・漢文の入口（音読・親しむ）
//  ・〔読むこと〕: 要旨をとらえる / 事実と意見を読み分ける
//  ・〔書くこと〕: グラフや表を用いた説明
// 国語は generators を持たないため、テストは全て固定 questions[]（全問 explanation 必須）。
// 漢字学習の単元は意図的に漢字を使う。それ以外の説明文は基本ひらがな。
// 依存(prerequisites/leadsTo)は現存の g2 と g5 内で解決（g3/g4 kokugo は未作成のため
// 前方参照は避け、終端は []）。学年間の追補リンクは集約時に中央で行う想定。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  TextInputQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const kokugoSubject: Subject = {
  id: "kokugo",
  name: "こくご",
  formalName: "国語",
  emoji: "📖",
  theme: "sky",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域（学習指導要領の領域・内容に対応。g2 と同じ id 体系を踏襲） ──────

export const kokugoG5Domains: Domain[] = [
  {
    id: "kokugo.kanji",
    subjectId: "kokugo",
    name: "かんじ",
    formalName: "漢字（知識及び技能）",
  },
  {
    id: "kokugo.language",
    subjectId: "kokugo",
    name: "ことばのきまり",
    formalName: "言葉の特徴や使い方（知識及び技能）",
  },
  {
    id: "kokugo.read",
    subjectId: "kokugo",
    name: "よむこと",
    formalName: "読むこと",
  },
  {
    id: "kokugo.write",
    subjectId: "kokugo",
    name: "かくこと",
    formalName: "書くこと",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。参照は g2/g5 内で解決）:
//
//   [g2.kanji-write] ─▶ kanji-read ─▶ kanji-write ─┬─▶ wago-kango-gairaigo ─▶ keigo
//                          │                        └─▶ sentence-structure
//                          └─▶ classics-intro
//   [g2.subject-predicate] ─▶ sentence-structure ─┬─▶ main-idea ─▶ fact-opinion
//                                                  └─▶ explain-with-graph
//
const U = {
  kanjiRead: "kokugo.g5.kanji-read",
  kanjiWrite: "kokugo.g5.kanji-write",
  wagoKangoGairaigo: "kokugo.g5.wago-kango-gairaigo",
  keigo: "kokugo.g5.keigo",
  sentenceStructure: "kokugo.g5.sentence-structure",
  mainIdea: "kokugo.g5.main-idea",
  factOpinion: "kokugo.g5.fact-opinion",
  classicsIntro: "kokugo.g5.classics-intro",
  explainWithGraph: "kokugo.g5.explain-with-graph",
} as const;

// 既存（g2）単元への参照（現存・解決可能）
const G2 = {
  kanjiWrite: "kokugo.g2.kanji-write",
  subjectPredicate: "kokugo.g2.subject-predicate",
} as const;

export const kokugoG5Units: Unit[] = [
  // ── 漢字 ──
  {
    id: U.kanjiRead,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.kanji",
    title: "5年の かん字（読み）",
    order: 1,
    realWorldUse: "新聞や 説明書、ニュースなど、おとなが よむ 文章の かん字を 読めるようになるよ。",
    leadsTo: [U.kanjiWrite, U.classicsIntro],
    prerequisites: [G2.kanjiWrite],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kanjiWrite,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.kanji",
    title: "5年の かん字（書き）",
    order: 2,
    realWorldUse: "作文や ノート、メールなどで、ならった かん字を 正しく 書けるようになるよ。",
    leadsTo: [U.wagoKangoGairaigo, U.sentenceStructure],
    prerequisites: [U.kanjiRead],
    hasLearn: true,
    hasTest: true,
  },

  // ── 言葉のきまり ──
  {
    id: U.wagoKangoGairaigo,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.language",
    title: "和語・漢語・外来語",
    order: 3,
    realWorldUse: "ことばの 種類が わかると、文章を 書くときに ぴったりの ことばを えらべるようになるよ。",
    leadsTo: [U.keigo],
    prerequisites: [U.kanjiRead],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.keigo,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.language",
    title: "敬語（そんけい・けんじょう・ていねい）",
    order: 4,
    realWorldUse: "先生や 目上の 人、お客さんに あいさつや お願いを するとき、ていねいに 話せるようになるよ。",
    leadsTo: [],
    prerequisites: [U.wagoKangoGairaigo],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sentenceStructure,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.language",
    title: "文の組み立て（ふく文）",
    order: 5,
    realWorldUse: "長い 文の 主語と 述語や、くわしくする ことばの かかりが わかると、文を わかりやすく 書けるよ。",
    leadsTo: [U.mainIdea, U.explainWithGraph],
    prerequisites: [G2.subjectPredicate],
    hasLearn: true,
    hasTest: true,
  },

  // ── 読むこと ──
  {
    id: U.mainIdea,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.read",
    title: "ようし（要旨）を とらえる",
    order: 6,
    realWorldUse: "長い 説明文を 読んで「いちばん いいたいこと」を つかめると、勉強や 調べものが はやくなるよ。",
    leadsTo: [U.factOpinion],
    prerequisites: [U.sentenceStructure],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.factOpinion,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.read",
    title: "事実と意見",
    order: 7,
    realWorldUse: "ニュースや 広告で「ほんとうの こと（事実）」と「考え（意見）」を 見分けられるようになるよ。",
    leadsTo: [],
    prerequisites: [U.mainIdea],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.classicsIntro,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.read",
    title: "古文・漢文の入口",
    order: 8,
    realWorldUse: "むかしの 人が 書いた 物語や ことばに ふれて、日本の 文化や ことばの れきしを 楽しめるよ。",
    leadsTo: [],
    prerequisites: [U.kanjiRead],
    hasLearn: true,
    hasTest: true,
  },

  // ── 書くこと ──
  {
    id: U.explainWithGraph,
    subjectId: "kokugo",
    grade: 5,
    domainId: "kokugo.write",
    title: "グラフや表を つかった せつめい",
    order: 9,
    realWorldUse: "調べた ことを グラフや 表で しめしながら 説明すると、相手に わかりやすく つたえられるよ。",
    leadsTo: [],
    prerequisites: [U.sentenceStructure],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// 国語は固定 questions[]。全問 explanation 必須。
// ══════════════════════════════════════════

// ── 5年の かん字（読み）──
const kanjiReadQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiRead}.q1`,
    unitId: U.kanjiRead,
    prompt: "「混ぜる」の よみかたは どれ？",
    explanation: "「混」は まぜる／コン と よむよ。いくつかの ものを 一つに あわせること。",
    format: "choice",
    choices: ["まぜる", "こぜる", "ませる", "こんぜる"],
    answer: "まぜる",
  },
  {
    id: `${U.kanjiRead}.q2`,
    unitId: U.kanjiRead,
    prompt: "「険しい」の よみかたは どれ？",
    explanation: "「険」は けわ-しい／ケン。山みちなどが きゅうで のぼりにくい ようすだよ。",
    format: "choice",
    choices: ["けわしい", "きびしい", "けんしい", "するどい"],
    answer: "けわしい",
  },
  {
    id: `${U.kanjiRead}.q3`,
    unitId: U.kanjiRead,
    prompt: "「快い」の よみかたは どれ？",
    explanation: "「快」は こころよ-い／カイ。きもちが よい ようすを あらわすよ。",
    format: "choice",
    choices: ["こころよい", "たのしい", "かいい", "すずしい"],
    answer: "こころよい",
  },
  {
    id: `${U.kanjiRead}.q4`,
    unitId: U.kanjiRead,
    prompt: "「確かめる」の よみかたは どれ？",
    explanation: "「確」は たし-か／カク。まちがいが ないか しらべることを「確かめる」というよ。",
    format: "choice",
    choices: ["たしかめる", "なぐさめる", "かくかめる", "あらためる"],
    answer: "たしかめる",
  },
  {
    id: `${U.kanjiRead}.q5`,
    unitId: U.kanjiRead,
    prompt: "「招く」の よみかたは どれ？",
    explanation: "「招」は まね-く／ショウ。人を よぶこと。「客を招く」のように つかうよ。",
    format: "choice",
    choices: ["まねく", "みちびく", "しょうく", "ひらく"],
    answer: "まねく",
  },
];

// ── 5年の かん字（書き）── text-input（こたえは漢字）
const kanjiWriteQuestions: TextInputQuestion[] = [
  {
    id: `${U.kanjiWrite}.q1`,
    unitId: U.kanjiWrite,
    prompt: "「あつい本（ぶ厚い）」の「あつい」を かん字で 書くと？（こたえは かん字 1字）",
    explanation: "「あつい本」の「あつい」は「厚」と 書くよ。「暑い」「熱い」と つかい分けてね。",
    format: "text-input",
    answer: "厚",
  },
  {
    id: `${U.kanjiWrite}.q2`,
    unitId: U.kanjiWrite,
    prompt: "「ささえる」を かん字で 書くと？（こたえは かん字 1字）",
    explanation: "「ささえる」は「支」と 書くよ。たおれないように 下から ささえること。",
    format: "text-input",
    answer: "支",
  },
  {
    id: `${U.kanjiWrite}.q3`,
    unitId: U.kanjiWrite,
    prompt: "「もえる」を かん字で 書くと？（こたえは かん字 1字）",
    explanation: "「もえる」は「燃」と 書くよ。火が つく ようすを あらわすね。",
    format: "text-input",
    answer: "燃",
  },
  {
    id: `${U.kanjiWrite}.q4`,
    unitId: U.kanjiWrite,
    prompt: "「ことわる」を かん字で 書くと？（こたえは かん字 1字）",
    explanation: "「ことわる」は「断」と 書くよ。たのみを うけ入れないこと。「決断」の「断」だね。",
    format: "text-input",
    answer: "断",
  },
];

// ── 和語・漢語・外来語 ──
const wagoKangoGairaigoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.wagoKangoGairaigo}.q1`,
    unitId: U.wagoKangoGairaigo,
    prompt: "「ホテル」は なにご？",
    explanation: "「ホテル」は 外国から 入ってきた ことば（外来語）。ふつう かたかなで 書くよ。",
    format: "choice",
    choices: ["外来語", "和語", "漢語", "古語"],
    answer: "外来語",
  },
  {
    id: `${U.wagoKangoGairaigo}.q2`,
    unitId: U.wagoKangoGairaigo,
    prompt: "「山（やま）」のように、むかしから 日本に ある ことばを なんという？",
    explanation: "訓読みで 読む、日本 もともとの ことばを「和語」というよ。",
    format: "choice",
    choices: ["和語", "漢語", "外来語", "ローマ字"],
    answer: "和語",
  },
  {
    id: `${U.wagoKangoGairaigo}.q3`,
    unitId: U.wagoKangoGairaigo,
    prompt: "「登山（とざん）」のように、音読みの ことばを なんという？",
    explanation: "中国から つたわった 読み方（音読み）の ことばを「漢語」というよ。",
    format: "choice",
    choices: ["漢語", "和語", "外来語", "なきごえ"],
    answer: "漢語",
  },
  {
    id: `${U.wagoKangoGairaigo}.q4`,
    unitId: U.wagoKangoGairaigo,
    prompt: "つぎのうち 外来語は どれ？",
    explanation: "「ニュース」は 英語から 入った 外来語。ほかは 和語・漢語だよ。",
    format: "choice",
    choices: ["ニュース", "手紙", "読書", "話し合い"],
    answer: "ニュース",
  },
  {
    id: `${U.wagoKangoGairaigo}.q5`,
    unitId: U.wagoKangoGairaigo,
    prompt: "おなじ いみで、和語は どれ？「宿（やど）」「旅館」「ホテル」",
    explanation: "「やど」は 訓読みの 和語、「旅館」は 漢語、「ホテル」は 外来語。同じ いみでも 種類が ちがうね。",
    format: "choice",
    choices: ["宿（やど）", "旅館", "ホテル", "どれも 漢語"],
    answer: "宿（やど）",
  },
];

// ── 敬語 ──
const keigoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.keigo}.q1`,
    unitId: U.keigo,
    prompt: "先生に「ごはんを 食べますか」を そんけい語で いうと？",
    explanation: "あいての 動作を 高める そんけい語。「食べる」の そんけい語は「めしあがる」だよ。",
    format: "choice",
    choices: ["めしあがりますか", "いただきますか", "食べるか", "食べてやるか"],
    answer: "めしあがりますか",
  },
  {
    id: `${U.keigo}.q2`,
    unitId: U.keigo,
    prompt: "自分が「行く」を けんじょう語で いうと？",
    explanation: "自分を ひくめて あいてを 立てる けんじょう語。「行く」は「まいる・うかがう」だよ。",
    format: "choice",
    choices: ["まいります", "いらっしゃいます", "行かれます", "行くよ"],
    answer: "まいります",
  },
  {
    id: `${U.keigo}.q3`,
    unitId: U.keigo,
    prompt: "ていねい語は つぎの どれ？",
    explanation: "「です・ます」を つける 言い方が ていねい語。だれにでも ていねいに つたえられるよ。",
    format: "choice",
    choices: ["これは 本です。", "これは 本だ。", "これ 本。", "本 なり。"],
    answer: "これは 本です。",
  },
  {
    id: `${U.keigo}.q4`,
    unitId: U.keigo,
    prompt: "「先生が 言った」を そんけい語で いうと？",
    explanation: "「言う」の そんけい語は「おっしゃる」。先生の 動作を 高めて つたえるよ。",
    format: "choice",
    choices: ["おっしゃった", "もうした", "言ってた", "言いやがった"],
    answer: "おっしゃった",
  },
  {
    id: `${U.keigo}.q5`,
    unitId: U.keigo,
    prompt: "お客さんに いう ことばで ふさわしいのは どれ？",
    explanation: "あいてに お願いするときは ていねいに。「こちらで お待ちください」が ふさわしいね。",
    format: "choice",
    choices: ["こちらで お待ちください。", "ここで 待て。", "ここで 待ちな。", "そこに いろ。"],
    answer: "こちらで お待ちください。",
  },
];

// ── 文の組み立て（ふく文）──
const sentenceStructureQuestions: ChoiceQuestion[] = [
  {
    id: `${U.sentenceStructure}.q1`,
    unitId: U.sentenceStructure,
    prompt: "「弟が ころんだ ので、わたしは たすけた。」この 文の 述語は いくつ ある？",
    explanation: "「ころんだ」と「たすけた」で 述語が 2つ。主語・述語の 組が 2つ 以上 ある 文を「ふく文」というよ。",
    format: "choice",
    choices: ["2つ", "1つ", "3つ", "0"],
    answer: "2つ",
  },
  {
    id: `${U.sentenceStructure}.q2`,
    unitId: U.sentenceStructure,
    prompt: "「赤い 花が さく。」で「赤い」が くわしく している ことばは どれ？",
    explanation: "「赤い」は「花」を くわしく している しゅうしょく語。何を くわしくするか かんがえよう。",
    format: "choice",
    choices: ["花", "さく", "赤", "が"],
    answer: "花",
  },
  {
    id: `${U.sentenceStructure}.q3`,
    unitId: U.sentenceStructure,
    prompt: "「妹が 元気に 走る。」の 主語は どれ？",
    explanation: "「だれが」に あたる「妹が」が 主語。「走る」が 述語だよ。",
    format: "choice",
    choices: ["妹が", "走る", "元気に", "妹"],
    answer: "妹が",
  },
  {
    id: `${U.sentenceStructure}.q4`,
    unitId: U.sentenceStructure,
    prompt: "「雨が ふった。だから 中止に した。」二つの 文を つなぐ ことばは どれ？",
    explanation: "「だから」は 前と あとを つなぐ つなぎことば（接続語）。理由と けっかを つなぐよ。",
    format: "choice",
    choices: ["だから", "雨が", "中止に", "ふった"],
    answer: "だから",
  },
  {
    id: `${U.sentenceStructure}.q5`,
    unitId: U.sentenceStructure,
    prompt: "「兄が 読んだ 本を 借りた。」で「読んだ」が くわしく している ことばは どれ？",
    explanation: "「読んだ」は「本」を くわしく している。どんな 本かを せつめいしているね。",
    format: "choice",
    choices: ["本", "借りた", "兄が", "読む"],
    answer: "本",
  },
];

// ── ようし（要旨）を とらえる ── 短い説明文を提示して読む
const mainIdeaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.mainIdea}.q1`,
    unitId: U.mainIdea,
    prompt:
      "【説明文】ごみを へらすには、まず ものを 大切に つかうことが 大事です。つぎに、つかえる ものは くりかえし つかいます。だから、一人一人の 心がけが いちばん たいせつなのです。\n──この 文章で いちばん つたえたいことは どれ？",
    explanation: "さいごの「だから〜たいせつなのです」が 中心。筆者は「一人一人の 心がけが たいせつ」と いいたいんだよ。",
    format: "choice",
    choices: [
      "一人一人の 心がけが たいせつ",
      "ごみは ふやしても よい",
      "ものは すぐ すてる",
      "そうじは きらい",
    ],
    answer: "一人一人の 心がけが たいせつ",
  },
  {
    id: `${U.mainIdea}.q2`,
    unitId: U.mainIdea,
    prompt: "「要旨（ようし）」とは どんな ことかな？",
    explanation: "要旨は、文章 ぜんたいで 筆者が いちばん つたえたい 中心の 内容のこと だよ。",
    format: "choice",
    choices: [
      "文章で いちばん つたえたい 中心の 内容",
      "いちばん さいしょの ことば",
      "むずかしい かん字の 数",
      "文章の 長さ",
    ],
    answer: "文章で いちばん つたえたい 中心の 内容",
  },
  {
    id: `${U.mainIdea}.q3`,
    unitId: U.mainIdea,
    prompt: "要旨を つかむとき、てがかりに すると よいのは どれ？",
    explanation: "「つまり・このように・だから」などの あとや、くりかえし 出てくる ことばに 中心の 考えが あらわれやすいよ。",
    format: "choice",
    choices: [
      "「つまり」「このように」などの まとめの ことば",
      "出てくる 人の 名前の 数",
      "さいごの 一字だけ",
      "絵の 色",
    ],
    answer: "「つまり」「このように」などの まとめの ことば",
  },
  {
    id: `${U.mainIdea}.q4`,
    unitId: U.mainIdea,
    prompt:
      "【説明文】かさは、雨の 日に 体を ぬらさない ために つかいます。また、強い 日ざしを ふせぐのにも 役立ちます。\n──この 文章に いちばん あう 題は どれ？",
    explanation: "雨と 日ざし、どちらにも つかえる ことを せつめいしているね。題は「かさの はたらき」が ぴったり。",
    format: "choice",
    choices: ["かさの はたらき", "雨の ふる 日", "夏の あつさ", "かさの ねだん"],
    answer: "かさの はたらき",
  },
];

// ── 事実と意見 ──
const factOpinionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.factOpinion}.q1`,
    unitId: U.factOpinion,
    prompt: "「今日は 雨が ふった。」この 文は 事実？ それとも 意見？",
    explanation: "じっさいに あった こと、たしかめられる ことは「事実」だよ。",
    format: "choice",
    choices: ["事実", "意見", "どちらでもない", "しつもん"],
    answer: "事実",
  },
  {
    id: `${U.factOpinion}.q2`,
    unitId: U.factOpinion,
    prompt: "「この 本は とても おもしろい。」この 文は 事実？ 意見？",
    explanation: "「おもしろい」は 人に よって ちがう 感じ方。だから これは「意見（考え）」だよ。",
    format: "choice",
    choices: ["意見", "事実", "しつもん", "めいれい"],
    answer: "意見",
  },
  {
    id: `${U.factOpinion}.q3`,
    unitId: U.factOpinion,
    prompt: "意見を あらわす ことばは つぎの どれ？",
    explanation: "「〜と 思う」「〜べきだ」などは 書いた 人の 考え（意見）を あらわす ことばだよ。",
    format: "choice",
    choices: ["〜と 思う", "〜である", "〜が あった", "〜と 書いてある"],
    answer: "〜と 思う",
  },
  {
    id: `${U.factOpinion}.q4`,
    unitId: U.factOpinion,
    prompt: "「気温は 30度だった。」この 文は 事実？ 意見？",
    explanation: "数字で たしかめられる こと（30度）は「事実」だよ。",
    format: "choice",
    choices: ["事実", "意見", "ねがい", "そうぞう"],
    answer: "事実",
  },
  {
    id: `${U.factOpinion}.q5`,
    unitId: U.factOpinion,
    prompt: "文章を 読むとき、事実と 意見を 見分けると なにが よい？",
    explanation: "事実と 意見を 分けると、ほんとうの ことと 書き手の 考えを ごちゃまぜに せず 正しく うけとれるよ。",
    format: "choice",
    choices: [
      "ほんとうの ことと 考えを 正しく うけとれる",
      "字が きれいに なる",
      "読むのが おそく なる",
      "かん字を おぼえなくてよい",
    ],
    answer: "ほんとうの ことと 考えを 正しく うけとれる",
  },
];

// ── 古文・漢文の入口（やさしく）──
const classicsIntroQuestions: ChoiceQuestion[] = [
  {
    id: `${U.classicsIntro}.q1`,
    unitId: U.classicsIntro,
    prompt: "「竹取物語」の はじめ「いまは むかし」の いみは どれ？",
    explanation: "「いまは むかし」は「今と なっては むかしの ことだが」という、むかしの 物語の はじまりの 言い方だよ。",
    format: "choice",
    choices: [
      "今と なっては むかしの ことだが",
      "今は あさだ",
      "むかしは なかった",
      "今すぐ いこう",
    ],
    answer: "今と なっては むかしの ことだが",
  },
  {
    id: `${U.classicsIntro}.q2`,
    unitId: U.classicsIntro,
    prompt: "古文で よく 出てくる「をかし」の いみに ちかいのは どれ？",
    explanation: "「をかし」は むかしの ことばで「趣（おもむき）が ある・すてきだ」という いみだよ。",
    format: "choice",
    choices: ["すてきだ・趣が ある", "おかしくて わらえる", "こわい", "つまらない"],
    answer: "すてきだ・趣が ある",
  },
  {
    id: `${U.classicsIntro}.q3`,
    unitId: U.classicsIntro,
    prompt: "漢文を 読むときの「レ点」の はたらきは どれ？",
    explanation: "「レ点」は すぐ 下の 字を 先に 読み、その あと 上の 字に もどる しるしだよ。",
    format: "choice",
    choices: [
      "下の 字を 先に 読んで 上に もどる",
      "上から じゅんに 読む",
      "読まない 字の しるし",
      "文の おわりの しるし",
    ],
    answer: "下の 字を 先に 読んで 上に もどる",
  },
  {
    id: `${U.classicsIntro}.q4`,
    unitId: U.classicsIntro,
    prompt: "「春は あけぼの」で はじまる むかしの 作品は どれ？",
    explanation: "「春は あけぼの」は『枕草子（まくらのそうし）』の はじめの 一文。清少納言が 書いた ずいひつだよ。",
    format: "choice",
    choices: ["枕草子", "竹取物語", "ももたろう", "走れメロス"],
    answer: "枕草子",
  },
];

// ── グラフや表を つかった せつめい ──
const explainWithGraphQuestions: ChoiceQuestion[] = [
  {
    id: `${U.explainWithGraph}.q1`,
    unitId: U.explainWithGraph,
    prompt:
      "【すきな スポーツしらべ（人数）】サッカー 12人 / 野球 8人 / 水えい 5人。\n──いちばん 人数が 多い スポーツは どれ？",
    explanation: "表の 人数を くらべると サッカーが 12人で いちばん 多いね。表は 数を くらべるのに べんりだよ。",
    format: "choice",
    choices: ["サッカー", "野球", "水えい", "ぜんぶ おなじ"],
    answer: "サッカー",
  },
  {
    id: `${U.explainWithGraph}.q2`,
    unitId: U.explainWithGraph,
    prompt: "せつめいに グラフや 表を つかう よさは どれ？",
    explanation: "グラフや 表は、数の 大小や わりあいが ひと目で わかるので、ことばだけより つたわりやすいよ。",
    format: "choice",
    choices: [
      "数の 大小が ひと目で わかる",
      "色が きれいに なるだけ",
      "字を へらせる だけ",
      "読まなくて よくなる",
    ],
    answer: "数の 大小が ひと目で わかる",
  },
  {
    id: `${U.explainWithGraph}.q3`,
    unitId: U.explainWithGraph,
    prompt: "グラフを 見せて せつめいするとき、わすれずに 書くと よいのは どれ？",
    explanation: "「何を あらわす グラフか」（題）や めもりの 単位を 書くと、見る 人が ただしく 読みとれるよ。",
    format: "choice",
    choices: [
      "何を あらわす グラフかの 題や 単位",
      "じぶんの すきな 色だけ",
      "書いた 日づけだけ",
      "なにも 書かない",
    ],
    answer: "何を あらわす グラフかの 題や 単位",
  },
  {
    id: `${U.explainWithGraph}.q4`,
    unitId: U.explainWithGraph,
    prompt: "もののうつりかわり（へんか）を あらわすのに あう グラフは どれ？",
    explanation: "気温の うつりかわりなど、へんかを あらわすのは「おれ線グラフ」が あうよ。ぼうグラフは 数の くらべに あうね。",
    format: "choice",
    choices: ["おれ線グラフ", "ぼうグラフ", "ひょう（表）だけ", "え（絵）だけ"],
    answer: "おれ線グラフ",
  },
];

// ── 集約（unitId -> コンテンツ）──

export const kokugoG5Contents: Record<string, UnitContent> = {
  [U.kanjiRead]: {
    unitId: U.kanjiRead,
    learn: {
      unitId: U.kanjiRead,
      steps: [
        {
          heading: "5年の かん字は むずかしい？",
          body: "5年では 193字の かん字を ならうよ。読み方が いくつも ある 字や、にた かたちの 字が ふえるよ。",
          visual: { kind: "emoji", value: "📖", caption: "混・険・快・確・招" },
        },
        {
          heading: "音読みと 訓読み",
          body: "「混」は コン（音）と まぜる（訓）のように、一つの 字に 読み方が いくつも あるよ。ことばに あわせて よみわけよう。",
          visual: { kind: "none" },
        },
        {
          heading: "ことばの 中で おぼえる",
          body: "「確かめる」「険しい 山」のように、ことばの 中で おぼえると 意味も いっしょに わかるよ。",
          visual: { kind: "emoji", value: "⛰️", caption: "険しい 山" },
        },
      ],
    },
    test: { unitId: U.kanjiRead, questions: kanjiReadQuestions, questionCount: 5 },
  },

  [U.kanjiWrite]: {
    unitId: U.kanjiWrite,
    learn: {
      unitId: U.kanjiWrite,
      steps: [
        {
          heading: "正しく 書くコツ",
          body: "かきじゅんを まもり、とめ・はね・はらいに 気をつけると、読みやすい 字に なるよ。",
          visual: { kind: "emoji", value: "✏️", caption: "とめ・はね・はらい" },
        },
        {
          heading: "おくりがなに 注意",
          body: "「厚い」「支える」「断る」など、おくりがなを まちがえやすい 字は とくに れんしゅうしよう。",
          visual: { kind: "none" },
        },
        {
          heading: "にた 字を くらべる",
          body: "「断」と「継」など、かたちの にた 字は くらべて おぼえると まちがえにくいよ。",
          visual: { kind: "emoji", value: "🔍", caption: "くらべて おぼえる" },
        },
      ],
    },
    test: { unitId: U.kanjiWrite, questions: kanjiWriteQuestions, questionCount: 4 },
  },

  [U.wagoKangoGairaigo]: {
    unitId: U.wagoKangoGairaigo,
    learn: {
      unitId: U.wagoKangoGairaigo,
      steps: [
        {
          heading: "3つの ことばの なかま",
          body: "ことばには、むかしから 日本に ある「和語」、中国から きた「漢語」、外国から きた「外来語」が あるよ。",
          visual: { kind: "emoji", value: "🗾🀄🌏", caption: "和語・漢語・外来語" },
        },
        {
          heading: "読み方で 見分ける",
          body: "訓読みは 和語（やま）、音読みは 漢語（とざん）が おおいよ。かたかなの ことばは たいてい 外来語。",
          visual: { kind: "none" },
        },
        {
          heading: "同じ いみでも ちがう",
          body: "「やど・旅館・ホテル」は どれも にた いみだけど、和語・漢語・外来語と なかまが ちがうね。",
          visual: { kind: "emoji", value: "🏨", caption: "やど＝旅館＝ホテル" },
        },
      ],
    },
    test: { unitId: U.wagoKangoGairaigo, questions: wagoKangoGairaigoQuestions, questionCount: 5 },
  },

  [U.keigo]: {
    unitId: U.keigo,
    learn: {
      unitId: U.keigo,
      steps: [
        {
          heading: "敬語は 3しゅるい",
          body: "あいてを 立てる「そんけい語」、自分を ひくめる「けんじょう語」、ていねいに いう「ていねい語」が あるよ。",
          visual: { kind: "emoji", value: "🙇", caption: "そんけい・けんじょう・ていねい" },
        },
        {
          heading: "つかい分けよう",
          body: "あいての 動作には そんけい語（めしあがる）、自分の 動作には けんじょう語（いただく）を つかうよ。",
          visual: { kind: "none" },
        },
        {
          heading: "ていねい語は きほん",
          body: "「です・ます」を つける ていねい語は、だれに 話すときにも つかえる 基本の 敬語だよ。",
          visual: { kind: "emoji", value: "💬", caption: "〜です・〜ます" },
        },
      ],
    },
    test: { unitId: U.keigo, questions: keigoQuestions, questionCount: 5 },
  },

  [U.sentenceStructure]: {
    unitId: U.sentenceStructure,
    learn: {
      unitId: U.sentenceStructure,
      steps: [
        {
          heading: "主語と 述語を さがす",
          body: "「だれが」が 主語、「どうする・どんなだ」が 述語。まず この 2つを 見つけよう。",
          visual: { kind: "emoji", value: "🐕🏃", caption: "いぬが はしる" },
        },
        {
          heading: "くわしくする ことば",
          body: "「赤い 花」の「赤い」のように、ほかの ことばを くわしく する ことばを しゅうしょく語というよ。",
          visual: { kind: "emoji", value: "🌹", caption: "赤い 花" },
        },
        {
          heading: "ふく文",
          body: "「弟が ころんだ ので、たすけた」のように 主語・述語の 組が 2つ 以上 ある 文を「ふく文」というよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.sentenceStructure, questions: sentenceStructureQuestions, questionCount: 5 },
  },

  [U.mainIdea]: {
    unitId: U.mainIdea,
    learn: {
      unitId: U.mainIdea,
      steps: [
        {
          heading: "要旨って なに？",
          body: "要旨は、文章 ぜんたいで 筆者が いちばん つたえたい 中心の 考えのこと だよ。",
          visual: { kind: "emoji", value: "🎯", caption: "中心の 考え" },
        },
        {
          heading: "まとめの ことばに 注目",
          body: "「つまり」「このように」「だから」の あとには、まとめや 中心の 考えが くることが おおいよ。",
          visual: { kind: "none" },
        },
        {
          heading: "くりかえしに 注目",
          body: "何度も 出てくる ことばは、筆者が 大事に 思って いる しるし。要旨の てがかりに なるよ。",
          visual: { kind: "emoji", value: "🔁", caption: "くりかえす ことば" },
        },
      ],
    },
    test: { unitId: U.mainIdea, questions: mainIdeaQuestions, questionCount: 4 },
  },

  [U.factOpinion]: {
    unitId: U.factOpinion,
    learn: {
      unitId: U.factOpinion,
      steps: [
        {
          heading: "事実って なに？",
          body: "じっさいに あった ことや、たしかめられる ことが「事実」。「雨が ふった」「30度だった」など。",
          visual: { kind: "emoji", value: "🌧️", caption: "たしかめられる こと" },
        },
        {
          heading: "意見って なに？",
          body: "書いた 人の 考えや 感じ方が「意見」。「おもしろい」「〜べきだ」「〜と 思う」など。",
          visual: { kind: "emoji", value: "💭", caption: "考え・感じ方" },
        },
        {
          heading: "見分ける れんしゅう",
          body: "文の おわりの ことばに 注目。「〜だ・〜した」は 事実、「〜と 思う・〜べきだ」は 意見が おおいよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.factOpinion, questions: factOpinionQuestions, questionCount: 5 },
  },

  [U.classicsIntro]: {
    unitId: U.classicsIntro,
    learn: {
      unitId: U.classicsIntro,
      steps: [
        {
          heading: "古文に ふれよう",
          body: "むかしの 人が 書いた 文章を「古文」というよ。「いまは むかし」「をかし」など、今と ちがう 言い方が あるね。",
          visual: { kind: "emoji", value: "📜", caption: "むかしの ことば" },
        },
        {
          heading: "音読で 楽しむ",
          body: "「春は あけぼの」のように、声に 出して 読むと むかしの ことばの リズムが 楽しめるよ。",
          visual: { kind: "emoji", value: "🌸", caption: "春は あけぼの" },
        },
        {
          heading: "漢文の しるし",
          body: "漢文には「レ点」など 読む じゅんを かえる しるしが あるよ。下の 字を 先に 読むなど、ルールが あるんだ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.classicsIntro, questions: classicsIntroQuestions, questionCount: 4 },
  },

  [U.explainWithGraph]: {
    unitId: U.explainWithGraph,
    learn: {
      unitId: U.explainWithGraph,
      steps: [
        {
          heading: "数を 見せて つたえる",
          body: "調べた 数は、グラフや 表に すると、ことばだけより わかりやすく つたえられるよ。",
          visual: { kind: "emoji", value: "📊", caption: "グラフで しめす" },
        },
        {
          heading: "グラフの えらび方",
          body: "数を くらべるなら ぼうグラフ、うつりかわりを 見せるなら おれ線グラフが あうよ。",
          visual: { kind: "emoji", value: "📈", caption: "ぼう／おれ線" },
        },
        {
          heading: "題と 単位を わすれずに",
          body: "「何を あらわす グラフか」（題）や めもりの 単位を 書くと、見る 人に ただしく つたわるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.explainWithGraph, questions: explainWithGraphQuestions, questionCount: 4 },
  },
};
