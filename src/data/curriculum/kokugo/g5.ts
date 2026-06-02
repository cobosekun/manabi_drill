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
    title: "5{年|ねん}の かん{字|じ}（{読|よ}み）",
    order: 1,
    realWorldUse: "{新聞|しんぶん}や {説明書|せつめいしょ}、ニュースなど、おとなが よむ {文章|ぶんしょう}の かん{字|じ}を {読|よ}めるようになるよ。",
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
    title: "5{年|ねん}の かん{字|じ}（{書|か}き）",
    order: 2,
    realWorldUse: "{作文|さくぶん}や ノート、メールなどで、ならった かん{字|じ}を {正|ただ}しく {書|か}けるようになるよ。",
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
    title: "{和語|わご}・{漢語|かんご}・{外来語|がいらいご}",
    order: 3,
    realWorldUse: "ことばの {種類|しゅるい}が わかると、{文章|ぶんしょう}を {書|か}くときに ぴったりの ことばを えらべるようになるよ。",
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
    title: "{敬語|けいご}（そんけい・けんじょう・ていねい）",
    order: 4,
    realWorldUse: "{先生|せんせい}や {目上|めうえ}の {人|ひと}、お{客|きゃく}さんに あいさつや お{願|ねが}いを するとき、ていねいに {話|はな}せるようになるよ。",
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
    title: "{文|ぶん}の{組|く}み{立|た}て（ふく{文|ぶん}）",
    order: 5,
    realWorldUse: "{長|なが}い {文|ぶん}の {主語|しゅご}と {述語|じゅつご}や、くわしくする ことばの かかりが わかると、{文|ぶん}を わかりやすく {書|か}けるよ。",
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
    title: "ようし（{要旨|ようし}）を とらえる",
    order: 6,
    realWorldUse: "{長|なが}い {説明文|せつめいぶん}を {読|よ}んで「いちばん いいたいこと」を つかめると、{勉強|べんきょう}や {調|しら}べものが はやくなるよ。",
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
    title: "{事実|じじつ}と{意見|いけん}",
    order: 7,
    realWorldUse: "ニュースや {広告|こうこく}で「ほんとうの こと（{事実|じじつ}）」と「{考|かんが}え（{意見|いけん}）」を {見分|みわ}けられるようになるよ。",
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
    title: "{古文|こぶん}・{漢文|かんぶん}の{入口|いりぐち}",
    order: 8,
    realWorldUse: "むかしの {人|ひと}が {書|か}いた {物語|ものがたり}や ことばに ふれて、{日本|にほん}の {文化|ぶんか}や ことばの れきしを {楽|たの}しめるよ。",
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
    title: "グラフや{表|ひょう}を つかった せつめい",
    order: 9,
    realWorldUse: "{調|しら}べた ことを グラフや {表|ひょう}で しめしながら {説明|せつめい}すると、{相手|あいて}に わかりやすく つたえられるよ。",
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
    explanation: "「混」は まぜる／コン と よむよ。いくつかの ものを {一|ひと}つに あわせること。",
    format: "choice",
    choices: ["まぜる", "こぜる", "ませる", "こんぜる"],
    answer: "まぜる",
  },
  {
    id: `${U.kanjiRead}.q2`,
    unitId: U.kanjiRead,
    prompt: "「険しい」の よみかたは どれ？",
    explanation: "「険」は けわ-しい／ケン。{山|やま}みちなどが きゅうで のぼりにくい ようすだよ。",
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
    explanation: "「招」は まね-く／ショウ。{人|ひと}を よぶこと。「{客|きゃく}を招く」のように つかうよ。",
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
    prompt: "「あつい{本|ほん}（ぶ厚い）」の「あつい」を かん{字|じ}で {書|か}くと？（こたえは かん{字|じ} 1{字|じ}）",
    explanation: "「あつい{本|ほん}」の「あつい」は「厚」と {書|か}くよ。「暑い」「熱い」と つかい{分|わ}けてね。",
    format: "text-input",
    answer: "厚",
  },
  {
    id: `${U.kanjiWrite}.q2`,
    unitId: U.kanjiWrite,
    prompt: "「ささえる」を かん{字|じ}で {書|か}くと？（こたえは かん{字|じ} 1{字|じ}）",
    explanation: "「ささえる」は「支」と {書|か}くよ。たおれないように {下|した}から ささえること。",
    format: "text-input",
    answer: "支",
  },
  {
    id: `${U.kanjiWrite}.q3`,
    unitId: U.kanjiWrite,
    prompt: "「もえる」を かん{字|じ}で {書|か}くと？（こたえは かん{字|じ} 1{字|じ}）",
    explanation: "「もえる」は「燃」と {書|か}くよ。{火|ひ}が つく ようすを あらわすね。",
    format: "text-input",
    answer: "燃",
  },
  {
    id: `${U.kanjiWrite}.q4`,
    unitId: U.kanjiWrite,
    prompt: "「ことわる」を かん{字|じ}で {書|か}くと？（こたえは かん{字|じ} 1{字|じ}）",
    explanation: "「ことわる」は「断」と {書|か}くよ。たのみを うけ{入|い}れないこと。「{決|けつ}断」の「断」だね。",
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
    explanation: "「ホテル」は {外国|がいこく}から {入|はい}ってきた ことば（{外来語|がいらいご}）。ふつう かたかなで {書|か}くよ。",
    format: "choice",
    choices: ["{外来語|がいらいご}", "{和語|わご}", "{漢語|かんご}", "{古語|こご}"],
    answer: "{外来語|がいらいご}",
  },
  {
    id: `${U.wagoKangoGairaigo}.q2`,
    unitId: U.wagoKangoGairaigo,
    prompt: "「{山|やま}（やま）」のように、むかしから {日本|にほん}に ある ことばを なんという？",
    explanation: "{訓読|くんよ}みで {読|よ}む、{日本|にほん} もともとの ことばを「{和語|わご}」というよ。",
    format: "choice",
    choices: ["{和語|わご}", "{漢語|かんご}", "{外来語|がいらいご}", "ローマ{字|じ}"],
    answer: "{和語|わご}",
  },
  {
    id: `${U.wagoKangoGairaigo}.q3`,
    unitId: U.wagoKangoGairaigo,
    prompt: "「{登山|とざん}（とざん）」のように、{音読|おんよ}みの ことばを なんという？",
    explanation: "{中国|ちゅうごく}から つたわった {読|よ}み{方|かた}（{音読|おんよ}み）の ことばを「{漢語|かんご}」というよ。",
    format: "choice",
    choices: ["{漢語|かんご}", "{和語|わご}", "{外来語|がいらいご}", "なきごえ"],
    answer: "{漢語|かんご}",
  },
  {
    id: `${U.wagoKangoGairaigo}.q4`,
    unitId: U.wagoKangoGairaigo,
    prompt: "つぎのうち {外来語|がいらいご}は どれ？",
    explanation: "「ニュース」は {英語|えいご}から {入|はい}った {外来語|がいらいご}。ほかは {和語|わご}・{漢語|かんご}だよ。",
    format: "choice",
    choices: ["ニュース", "{手紙|てがみ}", "{読書|どくしょ}", "{話|はな}し{合|あ}い"],
    answer: "ニュース",
  },
  {
    id: `${U.wagoKangoGairaigo}.q5`,
    unitId: U.wagoKangoGairaigo,
    prompt: "おなじ いみで、{和語|わご}は どれ？「{宿|やど}（やど）」「{旅館|りょかん}」「ホテル」",
    explanation: "「やど」は {訓読|くんよ}みの {和語|わご}、「{旅館|りょかん}」は {漢語|かんご}、「ホテル」は {外来語|がいらいご}。{同|おな}じ いみでも {種類|しゅるい}が ちがうね。",
    format: "choice",
    choices: ["{宿|やど}（やど）", "{旅館|りょかん}", "ホテル", "どれも {漢語|かんご}"],
    answer: "{宿|やど}（やど）",
  },
];

// ── 敬語 ──
const keigoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.keigo}.q1`,
    unitId: U.keigo,
    prompt: "{先生|せんせい}に「ごはんを {食|た}べますか」を そんけい{語|ご}で いうと？",
    explanation: "あいての {動作|どうさ}を {高|たか}める そんけい{語|ご}。「{食|た}べる」の そんけい{語|ご}は「めしあがる」だよ。",
    format: "choice",
    choices: ["めしあがりますか", "いただきますか", "{食|た}べるか", "{食|た}べてやるか"],
    answer: "めしあがりますか",
  },
  {
    id: `${U.keigo}.q2`,
    unitId: U.keigo,
    prompt: "{自分|じぶん}が「{行|い}く」を けんじょう{語|ご}で いうと？",
    explanation: "{自分|じぶん}を ひくめて あいてを {立|た}てる けんじょう{語|ご}。「{行|い}く」は「まいる・うかがう」だよ。",
    format: "choice",
    choices: ["まいります", "いらっしゃいます", "{行|い}かれます", "{行|い}くよ"],
    answer: "まいります",
  },
  {
    id: `${U.keigo}.q3`,
    unitId: U.keigo,
    prompt: "ていねい{語|ご}は つぎの どれ？",
    explanation: "「です・ます」を つける {言|い}い{方|かた}が ていねい{語|ご}。だれにでも ていねいに つたえられるよ。",
    format: "choice",
    choices: ["これは {本|ほん}です。", "これは {本|ほん}だ。", "これ {本|ほん}。", "{本|ほん} なり。"],
    answer: "これは {本|ほん}です。",
  },
  {
    id: `${U.keigo}.q4`,
    unitId: U.keigo,
    prompt: "「{先生|せんせい}が {言|い}った」を そんけい{語|ご}で いうと？",
    explanation: "「{言|い}う」の そんけい{語|ご}は「おっしゃる」。{先生|せんせい}の {動作|どうさ}を {高|たか}めて つたえるよ。",
    format: "choice",
    choices: ["おっしゃった", "もうした", "言ってた", "言いやがった"],
    answer: "おっしゃった",
  },
  {
    id: `${U.keigo}.q5`,
    unitId: U.keigo,
    prompt: "お{客|きゃく}さんに いう ことばで ふさわしいのは どれ？",
    explanation: "あいてに お{願|ねが}いするときは ていねいに。「こちらで お{待|ま}ちください」が ふさわしいね。",
    format: "choice",
    choices: ["こちらで お{待|ま}ちください。", "ここで {待|ま}て。", "ここで {待|ま}ちな。", "そこに いろ。"],
    answer: "こちらで お{待|ま}ちください。",
  },
];

// ── 文の組み立て（ふく文）──
const sentenceStructureQuestions: ChoiceQuestion[] = [
  {
    id: `${U.sentenceStructure}.q1`,
    unitId: U.sentenceStructure,
    prompt: "「{弟|おとうと}が ころんだ ので、わたしは たすけた。」この {文|ぶん}の {述語|じゅつご}は いくつ ある？",
    explanation: "「ころんだ」と「たすけた」で {述語|じゅつご}が 2つ。{主語|しゅご}・{述語|じゅつご}の {組|くみ}が 2つ {以上|いじょう} ある {文|ぶん}を「ふく{文|ぶん}」というよ。",
    format: "choice",
    choices: ["2つ", "1つ", "3つ", "0"],
    answer: "2つ",
  },
  {
    id: `${U.sentenceStructure}.q2`,
    unitId: U.sentenceStructure,
    prompt: "「{赤|あか}い {花|はな}が さく。」で「{赤|あか}い」が くわしく している ことばは どれ？",
    explanation: "「{赤|あか}い」は「{花|はな}」を くわしく している しゅうしょく{語|ご}。{何|なに}を くわしくするか かんがえよう。",
    format: "choice",
    choices: ["{花|はな}", "さく", "{赤|あか}", "が"],
    answer: "{花|はな}",
  },
  {
    id: `${U.sentenceStructure}.q3`,
    unitId: U.sentenceStructure,
    prompt: "「{妹|いもうと}が {元気|げんき}に {走|はし}る。」の {主語|しゅご}は どれ？",
    explanation: "「だれが」に あたる「{妹|いもうと}が」が {主語|しゅご}。「{走|はし}る」が {述語|じゅつご}だよ。",
    format: "choice",
    choices: ["{妹|いもうと}が", "{走|はし}る", "{元気|げんき}に", "{妹|いもうと}"],
    answer: "{妹|いもうと}が",
  },
  {
    id: `${U.sentenceStructure}.q4`,
    unitId: U.sentenceStructure,
    prompt: "「{雨|あめ}が ふった。だから {中止|ちゅうし}に した。」{二|ふた}つの {文|ぶん}を つなぐ ことばは どれ？",
    explanation: "「だから」は {前|まえ}と あとを つなぐ つなぎことば（{接続語|せつぞくご}）。{理由|りゆう}と けっかを つなぐよ。",
    format: "choice",
    choices: ["だから", "{雨|あめ}が", "{中止|ちゅうし}に", "ふった"],
    answer: "だから",
  },
  {
    id: `${U.sentenceStructure}.q5`,
    unitId: U.sentenceStructure,
    prompt: "「{兄|あに}が {読|よ}んだ {本|ほん}を {借|か}りた。」で「{読|よ}んだ」が くわしく している ことばは どれ？",
    explanation: "「{読|よ}んだ」は「{本|ほん}」を くわしく している。どんな {本|ほん}かを せつめいしているね。",
    format: "choice",
    choices: ["{本|ほん}", "{借|か}りた", "{兄|あに}が", "{読|よ}む"],
    answer: "{本|ほん}",
  },
];

// ── ようし（要旨）を とらえる ── 短い説明文を提示して読む
const mainIdeaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.mainIdea}.q1`,
    unitId: U.mainIdea,
    prompt:
      "【{説明文|せつめいぶん}】ごみを へらすには、まず ものを {大切|たいせつ}に つかうことが {大事|だいじ}です。つぎに、つかえる ものは くりかえし つかいます。だから、{一人一人|ひとりひとり}の {心|こころ}がけが いちばん たいせつなのです。\n──この {文章|ぶんしょう}で いちばん つたえたいことは どれ？",
    explanation: "さいごの「だから〜たいせつなのです」が {中心|ちゅうしん}。{筆者|ひっしゃ}は「{一人一人|ひとりひとり}の {心|こころ}がけが たいせつ」と いいたいんだよ。",
    format: "choice",
    choices: [
      "{一人一人|ひとりひとり}の {心|こころ}がけが たいせつ",
      "ごみは ふやしても よい",
      "ものは すぐ すてる",
      "そうじは きらい",
    ],
    answer: "{一人一人|ひとりひとり}の {心|こころ}がけが たいせつ",
  },
  {
    id: `${U.mainIdea}.q2`,
    unitId: U.mainIdea,
    prompt: "「{要旨|ようし}（ようし）」とは どんな ことかな？",
    explanation: "{要旨|ようし}は、{文章|ぶんしょう} ぜんたいで {筆者|ひっしゃ}が いちばん つたえたい {中心|ちゅうしん}の {内容|ないよう}のこと だよ。",
    format: "choice",
    choices: [
      "{文章|ぶんしょう}で いちばん つたえたい {中心|ちゅうしん}の {内容|ないよう}",
      "いちばん さいしょの ことば",
      "むずかしい かん{字|じ}の {数|かず}",
      "{文章|ぶんしょう}の {長|なが}さ",
    ],
    answer: "{文章|ぶんしょう}で いちばん つたえたい {中心|ちゅうしん}の {内容|ないよう}",
  },
  {
    id: `${U.mainIdea}.q3`,
    unitId: U.mainIdea,
    prompt: "{要旨|ようし}を つかむとき、てがかりに すると よいのは どれ？",
    explanation: "「つまり・このように・だから」などの あとや、くりかえし {出|で}てくる ことばに {中心|ちゅうしん}の {考|かんが}えが あらわれやすいよ。",
    format: "choice",
    choices: [
      "「つまり」「このように」などの まとめの ことば",
      "{出|で}てくる {人|ひと}の {名前|なまえ}の {数|かず}",
      "さいごの {一字|いちじ}だけ",
      "{絵|え}の {色|いろ}",
    ],
    answer: "「つまり」「このように」などの まとめの ことば",
  },
  {
    id: `${U.mainIdea}.q4`,
    unitId: U.mainIdea,
    prompt:
      "【{説明文|せつめいぶん}】かさは、{雨|あめ}の {日|ひ}に {体|からだ}を ぬらさない ために つかいます。また、{強|つよ}い {日|ひ}ざしを ふせぐのにも {役立|やくだ}ちます。\n──この {文章|ぶんしょう}に いちばん あう {題|だい}は どれ？",
    explanation: "{雨|あめ}と {日|ひ}ざし、どちらにも つかえる ことを せつめいしているね。{題|だい}は「かさの はたらき」が ぴったり。",
    format: "choice",
    choices: ["かさの はたらき", "{雨|あめ}の ふる {日|ひ}", "{夏|なつ}の あつさ", "かさの ねだん"],
    answer: "かさの はたらき",
  },
];

// ── 事実と意見 ──
const factOpinionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.factOpinion}.q1`,
    unitId: U.factOpinion,
    prompt: "「{今日|きょう}は {雨|あめ}が ふった。」この {文|ぶん}は {事実|じじつ}？ それとも {意見|いけん}？",
    explanation: "じっさいに あった こと、たしかめられる ことは「{事実|じじつ}」だよ。",
    format: "choice",
    choices: ["{事実|じじつ}", "{意見|いけん}", "どちらでもない", "しつもん"],
    answer: "{事実|じじつ}",
  },
  {
    id: `${U.factOpinion}.q2`,
    unitId: U.factOpinion,
    prompt: "「この {本|ほん}は とても おもしろい。」この {文|ぶん}は {事実|じじつ}？ {意見|いけん}？",
    explanation: "「おもしろい」は {人|ひと}に よって ちがう {感|かん}じ{方|かた}。だから これは「{意見|いけん}（{考|かんが}え）」だよ。",
    format: "choice",
    choices: ["{意見|いけん}", "{事実|じじつ}", "しつもん", "めいれい"],
    answer: "{意見|いけん}",
  },
  {
    id: `${U.factOpinion}.q3`,
    unitId: U.factOpinion,
    prompt: "{意見|いけん}を あらわす ことばは つぎの どれ？",
    explanation: "「〜と {思|おも}う」「〜べきだ」などは {書|か}いた {人|ひと}の {考|かんが}え（{意見|いけん}）を あらわす ことばだよ。",
    format: "choice",
    choices: ["〜と {思|おも}う", "〜である", "〜が あった", "〜と {書|か}いてある"],
    answer: "〜と {思|おも}う",
  },
  {
    id: `${U.factOpinion}.q4`,
    unitId: U.factOpinion,
    prompt: "「{気温|きおん}は 30{度|ど}だった。」この {文|ぶん}は {事実|じじつ}？ {意見|いけん}？",
    explanation: "{数字|すうじ}で たしかめられる こと（30{度|ど}）は「{事実|じじつ}」だよ。",
    format: "choice",
    choices: ["{事実|じじつ}", "{意見|いけん}", "ねがい", "そうぞう"],
    answer: "{事実|じじつ}",
  },
  {
    id: `${U.factOpinion}.q5`,
    unitId: U.factOpinion,
    prompt: "{文章|ぶんしょう}を {読|よ}むとき、{事実|じじつ}と {意見|いけん}を {見分|みわ}けると なにが よい？",
    explanation: "{事実|じじつ}と {意見|いけん}を {分|わ}けると、ほんとうの ことと {書|か}き{手|て}の {考|かんが}えを ごちゃまぜに せず {正|ただ}しく うけとれるよ。",
    format: "choice",
    choices: [
      "ほんとうの ことと {考|かんが}えを {正|ただ}しく うけとれる",
      "{字|じ}が きれいに なる",
      "{読|よ}むのが おそく なる",
      "かん{字|じ}を おぼえなくてよい",
    ],
    answer: "ほんとうの ことと {考|かんが}えを {正|ただ}しく うけとれる",
  },
];

// ── 古文・漢文の入口（やさしく）──
const classicsIntroQuestions: ChoiceQuestion[] = [
  {
    id: `${U.classicsIntro}.q1`,
    unitId: U.classicsIntro,
    prompt: "「{竹取物語|たけとりものがたり}」の はじめ「いまは むかし」の いみは どれ？",
    explanation: "「いまは むかし」は「{今|いま}と なっては むかしの ことだが」という、むかしの {物語|ものがたり}の はじまりの {言|い}い{方|かた}だよ。",
    format: "choice",
    choices: [
      "{今|いま}と なっては むかしの ことだが",
      "{今|いま}は あさだ",
      "むかしは なかった",
      "{今|いま}すぐ いこう",
    ],
    answer: "{今|いま}と なっては むかしの ことだが",
  },
  {
    id: `${U.classicsIntro}.q2`,
    unitId: U.classicsIntro,
    prompt: "{古文|こぶん}で よく {出|で}てくる「をかし」の いみに ちかいのは どれ？",
    explanation: "「をかし」は むかしの ことばで「おもむきが ある・すてきだ」という いみだよ。",
    format: "choice",
    choices: ["すてきだ・おもむきが ある", "おかしくて わらえる", "こわい", "つまらない"],
    answer: "すてきだ・おもむきが ある",
  },
  {
    id: `${U.classicsIntro}.q3`,
    unitId: U.classicsIntro,
    prompt: "{漢文|かんぶん}を {読|よ}むときの「レ{点|てん}」の はたらきは どれ？",
    explanation: "「レ{点|てん}」は すぐ {下|した}の {字|じ}を {先|さき}に {読|よ}み、その あと {上|うえ}の {字|じ}に もどる しるしだよ。",
    format: "choice",
    choices: [
      "{下|した}の {字|じ}を {先|さき}に {読|よ}んで {上|うえ}に もどる",
      "{上|うえ}から じゅんに {読|よ}む",
      "{読|よ}まない {字|じ}の しるし",
      "{文|ぶん}の おわりの しるし",
    ],
    answer: "{下|した}の {字|じ}を {先|さき}に {読|よ}んで {上|うえ}に もどる",
  },
  {
    id: `${U.classicsIntro}.q4`,
    unitId: U.classicsIntro,
    prompt: "「{春|はる}は あけぼの」で はじまる むかしの {作品|さくひん}は どれ？",
    explanation: "「{春|はる}は あけぼの」は『まくら{草子|そうし}（まくらのそうし）』の はじめの {一文|いちぶん}。せいしょうなごんが {書|か}いた ずいひつだよ。",
    format: "choice",
    choices: ["まくら{草子|そうし}", "{竹取物語|たけとりものがたり}", "ももたろう", "{走|はし}れメロス"],
    answer: "まくら{草子|そうし}",
  },
];

// ── グラフや表を つかった せつめい ──
const explainWithGraphQuestions: ChoiceQuestion[] = [
  {
    id: `${U.explainWithGraph}.q1`,
    unitId: U.explainWithGraph,
    prompt:
      "【すきな スポーツしらべ（{人数|にんずう}）】サッカー 12{人|にん} / {野球|やきゅう} 8{人|にん} / {水|すい}えい 5{人|にん}。\n──いちばん {人数|にんずう}が {多|おお}い スポーツは どれ？",
    explanation: "{表|ひょう}の {人数|にんずう}を くらべると サッカーが 12{人|にん}で いちばん {多|おお}いね。{表|ひょう}は {数|かず}を くらべるのに べんりだよ。",
    format: "choice",
    choices: ["サッカー", "{野球|やきゅう}", "{水|すい}えい", "ぜんぶ おなじ"],
    answer: "サッカー",
  },
  {
    id: `${U.explainWithGraph}.q2`,
    unitId: U.explainWithGraph,
    prompt: "せつめいに グラフや {表|ひょう}を つかう よさは どれ？",
    explanation: "グラフや {表|ひょう}は、{数|かず}の {大小|だいしょう}や わりあいが ひと{目|め}で わかるので、ことばだけより つたわりやすいよ。",
    format: "choice",
    choices: [
      "{数|かず}の {大小|だいしょう}が ひと{目|め}で わかる",
      "{色|いろ}が きれいに なるだけ",
      "{字|じ}を へらせる だけ",
      "{読|よ}まなくて よくなる",
    ],
    answer: "{数|かず}の {大小|だいしょう}が ひと{目|め}で わかる",
  },
  {
    id: `${U.explainWithGraph}.q3`,
    unitId: U.explainWithGraph,
    prompt: "グラフを {見|み}せて せつめいするとき、わすれずに {書|か}くと よいのは どれ？",
    explanation: "「{何|なに}を あらわす グラフか」（{題|だい}）や めもりの {単位|たんい}を {書|か}くと、{見|み}る {人|ひと}が ただしく {読|よ}みとれるよ。",
    format: "choice",
    choices: [
      "{何|なに}を あらわす グラフかの {題|だい}や {単位|たんい}",
      "じぶんの すきな {色|いろ}だけ",
      "{書|か}いた {日|ひ}づけだけ",
      "なにも {書|か}かない",
    ],
    answer: "{何|なに}を あらわす グラフかの {題|だい}や {単位|たんい}",
  },
  {
    id: `${U.explainWithGraph}.q4`,
    unitId: U.explainWithGraph,
    prompt: "もののうつりかわり（へんか）を あらわすのに あう グラフは どれ？",
    explanation: "{気温|きおん}の うつりかわりなど、へんかを あらわすのは「おれ{線|せん}グラフ」が あうよ。ぼうグラフは {数|かず}の くらべに あうね。",
    format: "choice",
    choices: ["おれ{線|せん}グラフ", "ぼうグラフ", "ひょう（{表|ひょう}）だけ", "え（{絵|え}）だけ"],
    answer: "おれ{線|せん}グラフ",
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
          heading: "5{年|ねん}の かん{字|じ}は むずかしい？",
          body: "5{年|ねん}では 193{字|じ}の かん{字|じ}を ならうよ。{読|よ}み{方|かた}が いくつも ある {字|じ}や、にた かたちの {字|じ}が ふえるよ。",
          visual: { kind: "emoji", value: "📖", caption: "混・険・快・確・招" },
        },
        {
          heading: "{音読|おんよ}みと {訓読|くんよ}み",
          body: "「混」は コン（{音|おん}）と まぜる（{訓|くん}）のように、{一|ひと}つの {字|じ}に {読|よ}み{方|かた}が いくつも あるよ。ことばに あわせて よみわけよう。",
          visual: { kind: "none" },
        },
        {
          heading: "ことばの {中|なか}で おぼえる",
          body: "「確かめる」「険しい {山|やま}」のように、ことばの {中|なか}で おぼえると {意味|いみ}も いっしょに わかるよ。",
          visual: { kind: "emoji", value: "⛰️", caption: "険しい {山|やま}" },
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
          heading: "{正|ただ}しく {書|か}くコツ",
          body: "かきじゅんを まもり、とめ・はね・はらいに {気|き}をつけると、{読|よ}みやすい {字|じ}に なるよ。",
          visual: { kind: "emoji", value: "✏️", caption: "とめ・はね・はらい" },
        },
        {
          heading: "おくりがなに {注意|ちゅうい}",
          body: "「厚い」「支える」「断る」など、おくりがなを まちがえやすい {字|じ}は とくに れんしゅうしよう。",
          visual: { kind: "none" },
        },
        {
          heading: "にた {字|じ}を くらべる",
          body: "「断」と「継」など、かたちの にた {字|じ}は くらべて おぼえると まちがえにくいよ。",
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
          body: "ことばには、むかしから {日本|にほん}に ある「{和語|わご}」、{中国|ちゅうごく}から きた「{漢語|かんご}」、{外国|がいこく}から きた「{外来語|がいらいご}」が あるよ。",
          visual: { kind: "emoji", value: "🗾🀄🌏", caption: "{和語|わご}・{漢語|かんご}・{外来語|がいらいご}" },
        },
        {
          heading: "{読|よ}み{方|かた}で {見分|みわ}ける",
          body: "{訓読|くんよ}みは {和語|わご}（やま）、{音読|おんよ}みは {漢語|かんご}（とざん）が おおいよ。かたかなの ことばは たいてい {外来語|がいらいご}。",
          visual: { kind: "none" },
        },
        {
          heading: "{同|おな}じ いみでも ちがう",
          body: "「やど・{旅館|りょかん}・ホテル」は どれも にた いみだけど、{和語|わご}・{漢語|かんご}・{外来語|がいらいご}と なかまが ちがうね。",
          visual: { kind: "emoji", value: "🏨", caption: "やど＝{旅館|りょかん}＝ホテル" },
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
          heading: "{敬語|けいご}は 3しゅるい",
          body: "あいてを {立|た}てる「そんけい{語|ご}」、{自分|じぶん}を ひくめる「けんじょう{語|ご}」、ていねいに いう「ていねい{語|ご}」が あるよ。",
          visual: { kind: "emoji", value: "🙇", caption: "そんけい・けんじょう・ていねい" },
        },
        {
          heading: "つかい{分|わ}けよう",
          body: "あいての {動作|どうさ}には そんけい{語|ご}（めしあがる）、{自分|じぶん}の {動作|どうさ}には けんじょう{語|ご}（いただく）を つかうよ。",
          visual: { kind: "none" },
        },
        {
          heading: "ていねい{語|ご}は きほん",
          body: "「です・ます」を つける ていねい{語|ご}は、だれに {話|はな}すときにも つかえる {基本|きほん}の {敬語|けいご}だよ。",
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
          heading: "{主語|しゅご}と {述語|じゅつご}を さがす",
          body: "「だれが」が {主語|しゅご}、「どうする・どんなだ」が {述語|じゅつご}。まず この 2つを {見|み}つけよう。",
          visual: { kind: "emoji", value: "🐕🏃", caption: "いぬが はしる" },
        },
        {
          heading: "くわしくする ことば",
          body: "「{赤|あか}い {花|はな}」の「{赤|あか}い」のように、ほかの ことばを くわしく する ことばを しゅうしょく{語|ご}というよ。",
          visual: { kind: "emoji", value: "🌹", caption: "{赤|あか}い {花|はな}" },
        },
        {
          heading: "ふく{文|ぶん}",
          body: "「{弟|おとうと}が ころんだ ので、たすけた」のように {主語|しゅご}・{述語|じゅつご}の {組|くみ}が 2つ {以上|いじょう} ある {文|ぶん}を「ふく{文|ぶん}」というよ。",
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
          heading: "{要旨|ようし}って なに？",
          body: "{要旨|ようし}は、{文章|ぶんしょう} ぜんたいで {筆者|ひっしゃ}が いちばん つたえたい {中心|ちゅうしん}の {考|かんが}えのこと だよ。",
          visual: { kind: "emoji", value: "🎯", caption: "{中心|ちゅうしん}の {考|かんが}え" },
        },
        {
          heading: "まとめの ことばに {注目|ちゅうもく}",
          body: "「つまり」「このように」「だから」の あとには、まとめや {中心|ちゅうしん}の {考|かんが}えが くることが おおいよ。",
          visual: { kind: "none" },
        },
        {
          heading: "くりかえしに {注目|ちゅうもく}",
          body: "{何度|なんど}も {出|で}てくる ことばは、{筆者|ひっしゃ}が {大事|だいじ}に {思|おも}って いる しるし。{要旨|ようし}の てがかりに なるよ。",
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
          heading: "{事実|じじつ}って なに？",
          body: "じっさいに あった ことや、たしかめられる ことが「{事実|じじつ}」。「{雨|あめ}が ふった」「30{度|ど}だった」など。",
          visual: { kind: "emoji", value: "🌧️", caption: "たしかめられる こと" },
        },
        {
          heading: "{意見|いけん}って なに？",
          body: "{書|か}いた {人|ひと}の {考|かんが}えや {感|かん}じ{方|かた}が「{意見|いけん}」。「おもしろい」「〜べきだ」「〜と {思|おも}う」など。",
          visual: { kind: "emoji", value: "💭", caption: "{考|かんが}え・{感|かん}じ{方|かた}" },
        },
        {
          heading: "{見分|みわ}ける れんしゅう",
          body: "{文|ぶん}の おわりの ことばに {注目|ちゅうもく}。「〜だ・〜した」は {事実|じじつ}、「〜と {思|おも}う・〜べきだ」は {意見|いけん}が おおいよ。",
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
          heading: "{古文|こぶん}に ふれよう",
          body: "むかしの {人|ひと}が {書|か}いた {文章|ぶんしょう}を「{古文|こぶん}」というよ。「いまは むかし」「をかし」など、{今|いま}と ちがう {言|い}い{方|かた}が あるね。",
          visual: { kind: "emoji", value: "📜", caption: "むかしの ことば" },
        },
        {
          heading: "{音読|おんどく}で {楽|たの}しむ",
          body: "「{春|はる}は あけぼの」のように、{声|こえ}に {出|だ}して {読|よ}むと むかしの ことばの リズムが {楽|たの}しめるよ。",
          visual: { kind: "emoji", value: "🌸", caption: "{春|はる}は あけぼの" },
        },
        {
          heading: "{漢文|かんぶん}の しるし",
          body: "{漢文|かんぶん}には「レ{点|てん}」など {読|よ}む じゅんを かえる しるしが あるよ。{下|した}の {字|じ}を {先|さき}に {読|よ}むなど、ルールが あるんだ。",
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
          heading: "{数|かず}を {見|み}せて つたえる",
          body: "{調|しら}べた {数|かず}は、グラフや {表|ひょう}に すると、ことばだけより わかりやすく つたえられるよ。",
          visual: { kind: "emoji", value: "📊", caption: "グラフで しめす" },
        },
        {
          heading: "グラフの えらび{方|かた}",
          body: "{数|かず}を くらべるなら ぼうグラフ、うつりかわりを {見|み}せるなら おれ{線|せん}グラフが あうよ。",
          visual: { kind: "emoji", value: "📈", caption: "ぼう／おれ{線|せん}" },
        },
        {
          heading: "{題|だい}と {単位|たんい}を わすれずに",
          body: "「{何|なに}を あらわす グラフか」（{題|だい}）や めもりの {単位|たんい}を {書|か}くと、{見|み}る {人|ひと}に ただしく つたわるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: { unitId: U.explainWithGraph, questions: explainWithGraphQuestions, questionCount: 4 },
  },
};
