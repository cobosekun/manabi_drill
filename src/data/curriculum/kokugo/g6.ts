// ══════════════════════════════════════════
// カリキュラム: 国語（こくご）小6
// 基準テンプレ src/data/curriculum/sansuu/g1.ts と同形の export 構造。
// subject/domain 命名は既存 kokugo/g2.ts に整合（kokugo.kanji / language / read / write）。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 依存(prerequisites/leadsTo)は kokugo.g6 内で自己完結させ、単独でも整合検査を通す。
// 表示テキストはルビ記法 {漢字|よみ} で執筆（教育漢字 g1-6 のみ・全漢字ルビ）。
// 例外: 漢字読み書き対象字・熟語の構成例・古典作品名は「読みを隠す」国語学習の
//       対象なのでルビ無し漢字を許容（ruby-convention.md の例外条項）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
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

// ── 領域（既存 g2 と同じ命名に整合）──────────

export const kokugoG6Domains: Domain[] = [
  {
    id: "kokugo.kanji",
    subjectId: "kokugo",
    name: "{漢字|かんじ}",
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
    name: "{読|よ}むこと",
    formalName: "読むこと",
  },
  {
    id: "kokugo.write",
    subjectId: "kokugo",
    name: "{書|か}くこと",
    formalName: "書くこと",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（自己完結）:
//
//   kanji-191 ─┬─▶ jukugo ─▶ text-structure ─▶ authors-claim ─┐
//              ├─▶ text-structure                              ├─▶ opinion-writing
//              └─▶ classics                                    │
//   keigo ──────────────────────────────────────────────────┘
//   word-change ─▶ classics
//
const U = {
  kanji191: "kokugo.g6.kanji-191",
  jukugo: "kokugo.g6.jukugo",
  keigo: "kokugo.g6.keigo",
  wordChange: "kokugo.g6.word-change",
  textStructure: "kokugo.g6.text-structure",
  authorsClaim: "kokugo.g6.authors-claim",
  classics: "kokugo.g6.classics",
  opinionWriting: "kokugo.g6.opinion-writing",
} as const;

export const kokugoG6Units: Unit[] = [
  {
    id: U.kanji191,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.kanji",
    title: "{漢字|かんじ}191{字|じ}",
    order: 1,
    realWorldUse: "{新聞|しんぶん}や {本|ほん}、{説明書|せつめいしょ}に でてくる むずかしい {漢字|かんじ}を {読|よ}み{書|か}きできるように なるよ。",
    leadsTo: [U.jukugo, U.textStructure, U.classics],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.jukugo,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.language",
    title: "じゅくごの なりたち",
    order: 2,
    realWorldUse: "なりたちが わかると、しらない じゅくごの {意味|いみ}も {漢字|かんじ}から {想像|そうぞう}できるように なるよ。",
    leadsTo: [U.textStructure],
    prerequisites: [U.kanji191],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.keigo,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.language",
    title: "{敬語|けいご}の {使|つか}い{方|かた}",
    order: 3,
    realWorldUse: "{先生|せんせい}や {目上|めうえ}の {人|ひと}と {話|はな}す とき、ていねいで {失礼|しつれい}のない {言|い}い{方|かた}が できるように なるよ。",
    leadsTo: [U.opinionWriting],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.wordChange,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.language",
    title: "ことばの {移|うつ}り{変|か}わり",
    order: 4,
    realWorldUse: "{昔|むかし}と {今|いま}の ことばの ちがいを {知|し}ると、{古典|こてん}や ニュースの ことばが よく わかるよ。",
    leadsTo: [U.classics],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.textStructure,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.read",
    title: "{文章|ぶんしょう}{全体|ぜんたい}の {構成|こうせい}",
    order: 5,
    realWorldUse: "{長|なが}い {説明文|せつめいぶん}を「はじめ・なか・おわり」で {読|よ}みとくと、{内容|ないよう}が すばやく つかめるよ。",
    leadsTo: [U.authorsClaim],
    prerequisites: [U.kanji191, U.jukugo],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.authorsClaim,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.read",
    title: "{筆者|ひっしゃ}の {主張|しゅちょう}を とらえる",
    order: 6,
    realWorldUse: "ニュースや {意見|いけん}が「{何|なに}を {言|い}いたいか」を {見|み}ぬく {力|ちから}が つくよ。",
    leadsTo: [U.opinionWriting],
    prerequisites: [U.textStructure],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.classics,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.read",
    title: "{古典|こてん}に {親|した}しむ",
    order: 7,
    realWorldUse: "竹取物語や 枕草子など、{昔|むかし}の {人|ひと}の {考|かんが}えや くらしに ふれる ことが できるよ。",
    leadsTo: [],
    prerequisites: [U.kanji191, U.wordChange],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.opinionWriting,
    subjectId: "kokugo",
    grade: 6,
    domainId: "kokugo.write",
    title: "{意見文|いけんぶん}・パンフレットを {書|か}く",
    order: 8,
    realWorldUse: "{自分|じぶん}の {考|かんが}えを {理由|りゆう}と ともに つたえ、{人|ひと}を {納得|なっとく}させる {文章|ぶんしょう}が {書|か}けるよ。",
    leadsTo: [],
    prerequisites: [U.authorsClaim, U.keigo],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 問題（全問 explanation 必須・4択）────────────────────
// 漢字読み・熟語の構成は「読みを隠す」学習対象のため、出題対象の漢字は
// あえてルビ無しのまま提示する（ruby-convention.md 例外）。周辺の説明文はルビ付き。

const kanji191Questions: ChoiceQuestion[] = [
  {
    id: `${U.kanji191}.q-1`,
    unitId: U.kanji191,
    prompt: "「我」の {訓読|くんよ}みは どれ？",
    explanation: "「我」は「われ」。{自分|じぶん}の ことを あらわす {漢字|かんじ}だよ。",
    format: "choice",
    choices: ["われ", "あれ", "おれ", "かれ"],
    answer: "われ",
  },
  {
    id: `${U.kanji191}.q-2`,
    unitId: U.kanji191,
    prompt: "「対」を つかった {正|ただ}しい じゅくごは どれ？",
    explanation: "「対立（たいりつ）」={二|ふた}つが {向|む}かいあう こと。「対」を つかうよ。",
    format: "choice",
    choices: ["対立", "体立", "太立", "待立"],
    answer: "対立",
  },
  {
    id: `${U.kanji191}.q-3`,
    unitId: U.kanji191,
    prompt: "「著しい」の {読|よ}みかたは どれ？",
    explanation: "「著しい」=いちじるしい。とても {目立|めだ}つ ようす だよ。",
    format: "choice",
    choices: ["いちじるしい", "あたらしい", "めずらしい", "はげしい"],
    answer: "いちじるしい",
  },
  {
    id: `${U.kanji191}.q-4`,
    unitId: U.kanji191,
    prompt: "「推理」の「推」の {読|よ}みかた({音|おん})は どれ？",
    explanation: "「推理（すいり）」。「推」は {音読|おんよ}みで「すい」と {読|よ}むよ。",
    format: "choice",
    choices: ["すい", "おし", "じゅう", "たい"],
    answer: "すい",
  },
  {
    id: `${U.kanji191}.q-5`,
    unitId: U.kanji191,
    prompt: "「困る」の {読|よ}みかたは どれ？",
    explanation: "「困る」=こまる。どう したら いいか わからない こと。",
    format: "choice",
    choices: ["こまる", "ねむる", "くばる", "しかる"],
    answer: "こまる",
  },
  {
    id: `${U.kanji191}.q-6`,
    unitId: U.kanji191,
    prompt: "「蔵」の {部首|ぶしゅ}は どれ？",
    explanation: "「蔵」の {上|うえ}は くさかんむり(艹)。しまって おく ばしょの {意味|いみ}。",
    format: "choice",
    choices: ["くさかんむり", "てへん", "さんずい", "きへん"],
    answer: "くさかんむり",
  },
];

const jukugoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.jukugo}.q-1`,
    unitId: U.jukugo,
    prompt: "「高低」は どんな なりたち？",
    explanation: "「高（たかい）」と「低（ひくい）」は {反対|はんたい}の {意味|いみ}の {漢字|かんじ}。",
    format: "choice",
    choices: ["{反対|はんたい}の {意味|いみ}の {漢字|かんじ}", "{似|に}た {意味|いみ}の {漢字|かんじ}", "{上|うえ}が {下|した}を くわしくする", "{主語|しゅご}と {述語|じゅつご}"],
    answer: "{反対|はんたい}の {意味|いみ}の {漢字|かんじ}",
  },
  {
    id: `${U.jukugo}.q-2`,
    unitId: U.jukugo,
    prompt: "「岩石」は どんな なりたち？",
    explanation: "「岩」も「石」も {似|に}た {意味|いみ}。かさねて {意味|いみ}を {強|つよ}めて いるよ。",
    format: "choice",
    choices: ["{似|に}た {意味|いみ}の {漢字|かんじ}", "{反対|はんたい}の {意味|いみ}", "{上|うえ}が {下|した}を くわしくする", "{動作|どうさ}と あいて"],
    answer: "{似|に}た {意味|いみ}の {漢字|かんじ}",
  },
  {
    id: `${U.jukugo}.q-3`,
    unitId: U.jukugo,
    prompt: "「読書」（書を読む）は どんな なりたち？",
    explanation: "{上|うえ}が {動作|どうさ}「読」、{下|した}が その あいて「書」。〜を〜する の かたち。",
    format: "choice",
    choices: ["{下|した}が あいて（〜を〜する）", "{似|に}た {意味|いみ}", "{反対|はんたい}の {意味|いみ}", "{主語|しゅご}と {述語|じゅつご}"],
    answer: "{下|した}が あいて（〜を〜する）",
  },
  {
    id: `${U.jukugo}.q-4`,
    unitId: U.jukugo,
    prompt: "「国旗」は どんな なりたち？",
    explanation: "「国の旗」。{上|うえ}の「国」が {下|した}の「旗」を くわしく して いるよ。",
    format: "choice",
    choices: ["{上|うえ}が {下|した}を くわしくする", "{反対|はんたい}の {意味|いみ}", "{似|に}た {意味|いみ}", "{動作|どうさ}と あいて"],
    answer: "{上|うえ}が {下|した}を くわしくする",
  },
  {
    id: `${U.jukugo}.q-5`,
    unitId: U.jukugo,
    prompt: "「左右」は どんな なりたち？",
    explanation: "「左」と「右」は {反対|はんたい}の {意味|いみ}の {漢字|かんじ} だよ。",
    format: "choice",
    choices: ["{反対|はんたい}の {意味|いみ}の {漢字|かんじ}", "{似|に}た {意味|いみ}", "{上|うえ}が {下|した}を くわしくする", "{動作|どうさ}と あいて"],
    answer: "{反対|はんたい}の {意味|いみ}の {漢字|かんじ}",
  },
];

const keigoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.keigo}.q-1`,
    unitId: U.keigo,
    prompt: "「です・ます」を つかった ことばづかいを {何|なん}と いう？",
    explanation: "「です・ます」は ていねいご。だれにでも つかえる ていねいな {言|い}い{方|かた}。",
    format: "choice",
    choices: ["ていねいご", "そんけいご", "けんじょうご", "ふつうの ことば"],
    answer: "ていねいご",
  },
  {
    id: `${U.keigo}.q-2`,
    unitId: U.keigo,
    prompt: "「{先生|せんせい}が {言|い}う」を そんけいごに すると？",
    explanation: "あいて（{先生|せんせい}）を {高|たか}める そんけいご。「{言|い}う→おっしゃる」。",
    format: "choice",
    choices: ["おっしゃる", "{申|もう}す", "いたす", "うかがう"],
    answer: "おっしゃる",
  },
  {
    id: `${U.keigo}.q-3`,
    unitId: U.keigo,
    prompt: "{自分|じぶん}が「{行|い}く」を けんじょうごに すると？",
    explanation: "{自分|じぶん}を ひくめる けんじょうご。「{行|い}く→うかがう・まいる」。",
    format: "choice",
    choices: ["うかがう", "いらっしゃる", "おいでになる", "おっしゃる"],
    answer: "うかがう",
  },
  {
    id: `${U.keigo}.q-4`,
    unitId: U.keigo,
    prompt: "あいてが「{食|た}べる」ときに つかう そんけいごは どれ？",
    explanation: "あいてが {食|た}べる ときは「めしあがる」。「いただく」は {自分|じぶん}がわの けんじょうご。",
    format: "choice",
    choices: ["めしあがる", "いただく", "{食|た}べます", "{食|た}べちゃう"],
    answer: "めしあがる",
  },
  {
    id: `${U.keigo}.q-5`,
    unitId: U.keigo,
    prompt: "けんじょうごを つかうのは どんな とき？",
    explanation: "けんじょうごは {自分|じぶん}がわを ひくめて、あいてを うやまう {言|い}い{方|かた}。",
    format: "choice",
    choices: ["{自分|じぶん}の {動作|どうさ}を ひくめて {言|い}う とき", "あいての {動作|どうさ}を {高|たか}める とき", "ともだちと {話|はな}す とき", "ひとりごとの とき"],
    answer: "{自分|じぶん}の {動作|どうさ}を ひくめて {言|い}う とき",
  },
];

const wordChangeQuestions: ChoiceQuestion[] = [
  {
    id: `${U.wordChange}.q-1`,
    unitId: U.wordChange,
    prompt: "{古語|こご}「いと」は {今|いま}の どの {意味|いみ}に ちかい？",
    explanation: "{古語|こご}の「いと」は「とても・たいへん」の {意味|いみ} だよ。",
    format: "choice",
    choices: ["とても", "いやだ", "いと（{糸|いと}）", "いえ"],
    answer: "とても",
  },
  {
    id: `${U.wordChange}.q-2`,
    unitId: U.wordChange,
    prompt: "「マウンテン」は どの しゅるいの ことば？",
    explanation: "そとの {国|くに}から きた ことば={外来語|がいらいご}。カタカナで {書|か}くことが おおい。",
    format: "choice",
    choices: ["{外来語|がいらいご}", "{和語|わご}", "{漢語|かんご}", "{古語|こご}"],
    answer: "{外来語|がいらいご}",
  },
  {
    id: `${U.wordChange}.q-3`,
    unitId: U.wordChange,
    prompt: "「やま」は どの しゅるいの ことば？",
    explanation: "{昔|むかし}から にほんに ある ことば={和語|わご}。{訓読|くんよ}みで {読|よ}むことが おおい。",
    format: "choice",
    choices: ["{和語|わご}", "{漢語|かんご}", "{外来語|がいらいご}", "{古語|こご}"],
    answer: "{和語|わご}",
  },
  {
    id: `${U.wordChange}.q-4`,
    unitId: U.wordChange,
    prompt: "「{山岳|さんがく}」は どの しゅるいの ことば？",
    explanation: "{漢字|かんじ}の {音読|おんよ}みで {読|よ}む ことば={漢語|かんご}。{中国|ちゅうごく}から つたわった ことば。",
    format: "choice",
    choices: ["{漢語|かんご}", "{和語|わご}", "{外来語|がいらいご}", "{古語|こご}"],
    answer: "{漢語|かんご}",
  },
  {
    id: `${U.wordChange}.q-5`,
    unitId: U.wordChange,
    prompt: "ことばが かわっていく {理由|りゆう}に いちばん ちかいのは？",
    explanation: "あたらしい もの・ことが ふえると、それを よぶ ことばも うまれるよ。",
    format: "choice",
    choices: ["あたらしい {道具|どうぐ}や {文化|ぶんか}が うまれるから", "じしょが なくなるから", "{漢字|かんじ}が きえるから", "{学校|がっこう}が ないから"],
    answer: "あたらしい {道具|どうぐ}や {文化|ぶんか}が うまれるから",
  },
];

const textStructureQuestions: ChoiceQuestion[] = [
  {
    id: `${U.textStructure}.q-1`,
    unitId: U.textStructure,
    prompt: "{説明文|せつめいぶん}の「おわり（{結論|けつろん}）」の やくわりは？",
    explanation: "「おわり」では、{全体|ぜんたい}の まとめ（{結論|けつろん}）を のべることが おおいよ。",
    format: "choice",
    choices: ["まとめ（{結論|けつろん}）を のべる", "{話題|わだい}を しめす", "{例|れい}を はじめて あげる", "あいさつを する"],
    answer: "まとめ（{結論|けつろん}）を のべる",
  },
  {
    id: `${U.textStructure}.q-2`,
    unitId: U.textStructure,
    prompt: "「はじめ（{序論|じょろん}）」の {段落|だんらく}では ふつう {何|なに}を する？",
    explanation: "「はじめ」では、これから {何|なに}を {話|はな}すか（{話題|わだい}）を しめすよ。",
    format: "choice",
    choices: ["{話題|わだい}を しめす", "{結論|けつろん}を {言|い}う", "{例|れい}を くわしく {書|か}く", "かんそうだけ {書|か}く"],
    answer: "{話題|わだい}を しめす",
  },
  {
    id: `${U.textStructure}.q-3`,
    unitId: U.textStructure,
    prompt: "{段落|だんらく}と {段落|だんらく}を つなぐ ことば（{接続語|せつぞくご}）は どれ？",
    explanation: "「だから・しかし・また」などは {段落|だんらく}を つなぐ {接続語|せつぞくご} だよ。",
    format: "choice",
    choices: ["だから", "とても", "きれいな", "はしる"],
    answer: "だから",
  },
  {
    id: `${U.textStructure}.q-4`,
    unitId: U.textStructure,
    prompt: "「なか（{本論|ほんろん}）」の やくわりに ちかいのは？",
    explanation: "「なか」では {例|れい}や {理由|りゆう}を あげて、くわしく {説明|せつめい}するよ。",
    format: "choice",
    choices: ["{例|れい}や {理由|りゆう}で くわしく {説明|せつめい}する", "あいさつを する", "だいめいを {書|か}く", "{絵|え}を {書|か}く"],
    answer: "{例|れい}や {理由|りゆう}で くわしく {説明|せつめい}する",
  },
  {
    id: `${U.textStructure}.q-5`,
    unitId: U.textStructure,
    prompt: "{文章|ぶんしょう}の {構成|こうせい}を つかむと よいことは？",
    explanation: "{構成|こうせい}が わかると、{筆者|ひっしゃ}の {主張|しゅちょう}が つかみやすく なるよ。",
    format: "choice",
    choices: ["{筆者|ひっしゃ}の {言|い}いたいことが わかりやすい", "{文|ぶん}の ながさが きまる", "{漢字|かんじ}が ふえる", "{絵|え}が {書|か}ける"],
    answer: "{筆者|ひっしゃ}の {言|い}いたいことが わかりやすい",
  },
];

const authorsClaimQuestions: ChoiceQuestion[] = [
  {
    id: `${U.authorsClaim}.q-1`,
    unitId: U.authorsClaim,
    prompt: "{筆者|ひっしゃ}の {主張|しゅちょう}が よく あらわれる ところは？",
    explanation: "{主張|しゅちょう}は まとめの {段落|だんらく}（おわり）に {書|か}かれることが おおいよ。",
    format: "choice",
    choices: ["さいごの {段落|だんらく}（まとめ）", "だいめいの {下|した}", "さいしょの {絵|え}だけ", "ページばんごう"],
    answer: "さいごの {段落|だんらく}（まとめ）",
  },
  {
    id: `${U.authorsClaim}.q-2`,
    unitId: U.authorsClaim,
    prompt: "「たとえば〜」と {例|れい}を あげるのは {何|なん}の くふう？",
    explanation: "{例|れい}を あげると、{言|い}いたいことが ぐっと わかりやすく なるよ。",
    format: "choice",
    choices: ["わかりやすく する くふう", "ながく する くふう", "むずかしく する くふう", "{絵|え}を ふやす くふう"],
    answer: "わかりやすく する くふう",
  },
  {
    id: `${U.authorsClaim}.q-3`,
    unitId: U.authorsClaim,
    prompt: "{文章|ぶんしょう}の なかで なんども くりかえされる ことばは {何|なに}を あらわす？",
    explanation: "くりかえされる ことばは、{筆者|ひっしゃ}が つよく {言|い}いたい {大切|たいせつ}な こと だよ。",
    format: "choice",
    choices: ["{筆者|ひっしゃ}が {大切|たいせつ}に している こと", "ぐうぜん", "かきまちがい", "ただの かざり"],
    answer: "{筆者|ひっしゃ}が {大切|たいせつ}に している こと",
  },
  {
    id: `${U.authorsClaim}.q-4`,
    unitId: U.authorsClaim,
    prompt: "グラフや {表|ひょう}を つかう {説明|せつめい}の こうかは？",
    explanation: "グラフは {数|かず}や うつりかわりを {目|め}で {見|み}て わかりやすく する くふう。",
    format: "choice",
    choices: ["{数|かず}や {変化|へんか}が {一目|ひとめ}で わかる", "{文章|ぶんしょう}が みじかく なる", "{絵|え}が きれいに なる", "{漢字|かんじ}が へる"],
    answer: "{数|かず}や {変化|へんか}が {一目|ひとめ}で わかる",
  },
  {
    id: `${U.authorsClaim}.q-5`,
    unitId: U.authorsClaim,
    prompt: "「みなさんは どう {思|おも}いますか」のような {問|と}いかけの こうかは？",
    explanation: "{問|と}いかけは、{読|よ}む{人|ひと}を ひきつけて {考|かんが}えさせる くふう だよ。",
    format: "choice",
    choices: ["{読|よ}む{人|ひと}に {考|かんが}えさせる", "こたえを かくす", "{文|ぶん}を みじかくする", "だいめいを きめる"],
    answer: "{読|よ}む{人|ひと}に {考|かんが}えさせる",
  },
];

const classicsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.classics}.q-1`,
    unitId: U.classics,
    prompt: "「竹取物語」の しゅじんこうは だれ？",
    explanation: "{竹|たけ}の なかから うまれた かぐやひめの おはなし だよ。",
    format: "choice",
    choices: ["かぐやひめ", "ももたろう", "うらしまたろう", "いっすんぼうし"],
    answer: "かぐやひめ",
  },
  {
    id: `${U.classics}.q-2`,
    unitId: U.classics,
    prompt: "「枕草子」を {書|か}いた {人|ひと}は だれ？",
    explanation: "「枕草子」は せいしょうなごんが {書|か}いた ずいひつ だよ。",
    format: "choice",
    choices: ["せいしょうなごん", "むらさきしきぶ", "かものちょうめい", "まつおばしょう"],
    answer: "せいしょうなごん",
  },
  {
    id: `${U.classics}.q-3`,
    unitId: U.classics,
    prompt: "「{春|はる}は あけぼの」で はじまる さくひんは どれ？",
    explanation: "「{春|はる}は あけぼの」は 枕草子の ゆうめいな はじまりの {文|ぶん}。",
    format: "choice",
    choices: ["枕草子", "竹取物語", "源氏物語", "平家物語"],
    answer: "枕草子",
  },
  {
    id: `${U.classics}.q-4`,
    unitId: U.classics,
    prompt: "{古語|こご}「あけぼの」の {意味|いみ}に ちかいのは？",
    explanation: "「あけぼの」は {朝|あさ}、そらが あかるく なりはじめる ころ だよ。",
    format: "choice",
    choices: ["よあけ（{朝|あさ} はやく）", "よなか", "ひるま", "ゆうがた"],
    answer: "よあけ（{朝|あさ} はやく）",
  },
  {
    id: `${U.classics}.q-5`,
    unitId: U.classics,
    prompt: "竹取物語の さいご、かぐやひめは どこへ かえる？",
    explanation: "かぐやひめは {月|つき}の みやこへ かえって いくよ。",
    format: "choice",
    choices: ["{月|つき}", "{海|うみ}", "{山|やま}", "もりの なか"],
    answer: "{月|つき}",
  },
];

const opinionWritingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.opinionWriting}.q-1`,
    unitId: U.opinionWriting,
    prompt: "{意見文|いけんぶん}で、{主張|しゅちょう}の あとに {書|か}くと よいのは？",
    explanation: "{主張|しゅちょう}の あとに {理由|りゆう}を {書|か}くと、{納得|なっとく}して もらいやすいよ。",
    format: "choice",
    choices: ["そう {考|かんが}える {理由|りゆう}", "かんけいない {話|はなし}", "だいめいだけ", "{絵|え}だけ"],
    answer: "そう {考|かんが}える {理由|りゆう}",
  },
  {
    id: `${U.opinionWriting}.q-2`,
    unitId: U.opinionWriting,
    prompt: "{説得力|せっとくりょく}を たかめる ために くわえると よいのは？",
    explanation: "「たとえば」と {具体例|ぐたいれい}を あげると、{主張|しゅちょう}が つよく なるよ。",
    format: "choice",
    choices: ["{具体的|ぐたいてき}な {例|れい}", "かんけいない かんそう", "おなじ ことの くりかえし", "らくがき"],
    answer: "{具体的|ぐたいてき}な {例|れい}",
  },
  {
    id: `${U.opinionWriting}.q-3`,
    unitId: U.opinionWriting,
    prompt: "「なぜなら」の あとに {書|か}くのは ふつう {何|なに}？",
    explanation: "「なぜなら〜から」で {理由|りゆう}を {説明|せつめい}するよ。",
    format: "choice",
    choices: ["{理由|りゆう}", "{結論|けつろん}の {反対|はんたい}", "だいめい", "ひづけ"],
    answer: "{理由|りゆう}",
  },
  {
    id: `${U.opinionWriting}.q-4`,
    unitId: U.opinionWriting,
    prompt: "パンフレットで {読|よ}む{人|ひと}の {目|め}を ひく くふうは？",
    explanation: "{見出|みだ}し・{絵|え}・{色|いろ}で {大切|たいせつ}な ところを めだたせると つたわりやすい。",
    format: "choice",
    choices: ["{見出|みだ}しや {絵|え}で めだたせる", "ぜんぶ おなじ {大|おお}きさの {字|じ}", "くろ1しょくだけ", "ぎっしり つめて {書|か}く"],
    answer: "{見出|みだ}しや {絵|え}で めだたせる",
  },
  {
    id: `${U.opinionWriting}.q-5`,
    unitId: U.opinionWriting,
    prompt: "よい {意見文|いけんぶん}の くみたてに ちかいのは どれ？",
    explanation: "{主張|しゅちょう}を {理由|りゆう}と {例|れい}で ささえ、さいごに まとめると よい {意見文|いけんぶん}に なるよ。",
    format: "choice",
    choices: ["{主張|しゅちょう}→{理由|りゆう}→{例|れい}→まとめ", "{例|れい}→だいめい→{絵|え}", "かんそう→かんそう→かんそう", "ひづけ→なまえ→おわり"],
    answer: "{主張|しゅちょう}→{理由|りゆう}→{例|れい}→まとめ",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test）────────────

export const kokugoG6Contents: Record<string, UnitContent> = {
  [U.kanji191]: {
    unitId: U.kanji191,
    learn: {
      unitId: U.kanji191,
      steps: [
        {
          heading: "6{年生|ねんせい}の {漢字|かんじ}",
          body: "6{年生|ねんせい}では あたらしく 191{字|じ}の {漢字|かんじ}を ならうよ。「我・推・著・蔵」など、すこし むずかしい {漢字|かんじ}が ふえるよ。",
          visual: { kind: "emoji", value: "📚 我 推 著 蔵", caption: "6{年生|ねんせい}で ふえる かんじ" },
        },
        {
          heading: "{音読|おんよ}み と {訓読|くんよ}み",
          body: "ひとつの {漢字|かんじ}に {読|よ}みかたが いくつも あることが おおいよ。「対」は たい（{音|おん}）、「対する」のように つかうことも あるよ。",
          visual: { kind: "emoji", value: "対 → たい / 対する", caption: "よみを セットで おぼえる" },
        },
        {
          heading: "{部首|ぶしゅ}で {仲間|なかま}{分|わ}け",
          body: "「推」は てへん、「蔵」は くさかんむり。{部首|ぶしゅ}が おなじ {漢字|かんじ}は {意味|いみ}が にていることが おおいよ。",
          visual: { kind: "emoji", value: "扌 てへん → 推 採 操", caption: "{部首|ぶしゅ}で おぼえる" },
        },
      ],
    },
    test: { unitId: U.kanji191, questions: kanji191Questions, questionCount: 6 },
  },

  [U.jukugo]: {
    unitId: U.jukugo,
    learn: {
      unitId: U.jukugo,
      steps: [
        {
          heading: "じゅくごって なに？",
          body: "「学校」「読書」のように、{漢字|かんじ}が 2つ いじょう あつまって できた ことばを じゅくごと {言|い}うよ。",
          visual: { kind: "emoji", value: "学 ＋ 校 ＝ 学校", caption: "かんじが あつまった ことば" },
        },
        {
          heading: "なりたちには しゅるいが ある",
          body: "{似|に}た {意味|いみ}（岩石）、{反対|はんたい}の {意味|いみ}（高低）、{上|うえ}が {下|した}を くわしく（国旗）、{上|うえ}が {動作|どうさ}・{下|した}が あいて（読書=書を読む）など、きまりが あるよ。",
          visual: { kind: "emoji", value: "岩石 / 高低 / 国旗", caption: "なりたちの しゅるい" },
        },
        {
          heading: "なりたちで {意味|いみ}が わかる",
          body: "「乗車」は「車に乗る」。なりたちを {考|かんが}えると、しらない じゅくごの {意味|いみ}も {想像|そうぞう}できるよ。",
          visual: { kind: "emoji", value: "乗車 ＝ 車に乗る", caption: "なりたちから いみへ" },
        },
      ],
    },
    test: { unitId: U.jukugo, questions: jukugoQuestions, questionCount: 5 },
  },

  [U.keigo]: {
    unitId: U.keigo,
    learn: {
      unitId: U.keigo,
      steps: [
        {
          heading: "{敬語|けいご}って なに？",
          body: "あいてを {大切|たいせつ}に {思|おも}う きもちを あらわす ことばづかいだよ。「ていねいご・そんけいご・けんじょうご」の 3しゅるいが あるよ。",
          visual: { kind: "emoji", value: "🙇", caption: "あいてを うやまう" },
        },
        {
          heading: "ていねいご",
          body: "「です・ます」を つけると ていねいに なるよ。「{行|い}く→{行|い}きます」「{本|ほん}だ→{本|ほん}です」。だれにでも つかえるよ。",
          visual: { kind: "emoji", value: "{行|い}く → {行|い}きます", caption: "です・ます" },
        },
        {
          heading: "そんけいご と けんじょうご",
          body: "あいてを {高|たか}める そんけいご（{言|い}う→おっしゃる）、{自分|じぶん}を ひくめる けんじょうご（{言|い}う→{申|もう}す）。あいてに よって つかいわけるよ。",
          visual: { kind: "emoji", value: "おっしゃる ⇔ {申|もう}す", caption: "たかめる / ひくめる" },
        },
      ],
    },
    test: { unitId: U.keigo, questions: keigoQuestions, questionCount: 5 },
  },

  [U.wordChange]: {
    unitId: U.wordChange,
    learn: {
      unitId: U.wordChange,
      steps: [
        {
          heading: "ことばは かわっていく",
          body: "{昔|むかし}と {今|いま}では、おなじ ものでも よびかたが ちがう ことが あるよ。ことばは {時代|じだい}と ともに かわるんだ。",
          visual: { kind: "emoji", value: "🕰️", caption: "じだいで かわる" },
        },
        {
          heading: "{和語|わご}・{漢語|かんご}・{外来語|がいらいご}",
          body: "「やま（{和語|わご}）」「{山岳|さんがく}（{漢語|かんご}）」「マウンテン（{外来語|がいらいご}）」。にほんごには この 3しゅるいの ことばが まざって いるよ。",
          visual: { kind: "emoji", value: "やま / {山岳|さんがく} / マウンテン", caption: "3しゅるいの ことば" },
        },
        {
          heading: "あたらしい ことば",
          body: "「スマホ」など、あたらしい {道具|どうぐ}や {文化|ぶんか}から、あたらしい ことばが うまれて いくよ。",
          visual: { kind: "emoji", value: "📱", caption: "あたらしい ことば" },
        },
      ],
    },
    test: { unitId: U.wordChange, questions: wordChangeQuestions, questionCount: 5 },
  },

  [U.textStructure]: {
    unitId: U.textStructure,
    learn: {
      unitId: U.textStructure,
      steps: [
        {
          heading: "{文章|ぶんしょう}には かたちが ある",
          body: "{説明文|せつめいぶん}は「はじめ（{序論|じょろん}）・なか（{本論|ほんろん}）・おわり（{結論|けつろん}）」の 3つの まとまりで できて いることが おおいよ。",
          visual: { kind: "emoji", value: "はじめ → なか → おわり", caption: "3つの まとまり" },
        },
        {
          heading: "{段落|だんらく}の やくわり",
          body: "それぞれの {段落|だんらく}が {何|なに}を {言|い}っているかを つかむと、{全体|ぜんたい}の ながれが よく わかるよ。",
          visual: { kind: "emoji", value: "¶ ¶ ¶", caption: "だんらく ごとに かんがえる" },
        },
      ],
    },
    test: { unitId: U.textStructure, questions: textStructureQuestions, questionCount: 5 },
  },

  [U.authorsClaim]: {
    unitId: U.authorsClaim,
    learn: {
      unitId: U.authorsClaim,
      steps: [
        {
          heading: "{主張|しゅちょう}って なに？",
          body: "{筆者|ひっしゃ}が その {文章|ぶんしょう}で いちばん {言|い}いたいこと=しゅちょう。さいごの {段落|だんらく}や、くりかえされる ことばに ちゅうもくしよう。",
          visual: { kind: "emoji", value: "💡", caption: "いちばん いいたい こと" },
        },
        {
          heading: "{説明|せつめい}の くふう",
          body: "{筆者|ひっしゃ}は {主張|しゅちょう}を つたえる ために、{例|れい}・たとえ・グラフ・{問|と}いかけ などを つかうよ。どんな くふうか {考|かんが}えよう。",
          visual: { kind: "emoji", value: "📊", caption: "つたえる くふう" },
        },
      ],
    },
    test: { unitId: U.authorsClaim, questions: authorsClaimQuestions, questionCount: 5 },
  },

  [U.classics]: {
    unitId: U.classics,
    learn: {
      unitId: U.classics,
      steps: [
        {
          heading: "{古典|こてん}って なに？",
          body: "{昔|むかし}の {人|ひと}が {書|か}いた {物語|ものがたり}や ずいひつを {古典|こてん}と {言|い}うよ。1000ねんも まえの ものも あるんだ。",
          visual: { kind: "emoji", value: "📜", caption: "むかしの さくひん" },
        },
        {
          heading: "竹取物語",
          body: "「いまは むかし、{竹取|たけとり}の おきな と いう もの ありけり」で はじまる、かぐやひめの おはなし。にほんで いちばん ふるい {物語|ものがたり}の ひとつだよ。",
          visual: { kind: "emoji", value: "🎋🌕", caption: "かぐやひめ" },
        },
        {
          heading: "枕草子",
          body: "せいしょうなごんが {書|か}いた ずいひつ。「{春|はる}は あけぼの」で はじまり、きせつの すてきな ようすを えがいて いるよ。",
          visual: { kind: "emoji", value: "🌸", caption: "{春|はる}は あけぼの" },
        },
      ],
    },
    test: { unitId: U.classics, questions: classicsQuestions, questionCount: 5 },
  },

  [U.opinionWriting]: {
    unitId: U.opinionWriting,
    learn: {
      unitId: U.opinionWriting,
      steps: [
        {
          heading: "{意見文|いけんぶん}って なに？",
          body: "{自分|じぶん}の {考|かんが}え（{主張|しゅちょう}）と、その {理由|りゆう}・{例|れい}を {書|か}いて、{読|よ}む{人|ひと}を {納得|なっとく}させる {文章|ぶんしょう}だよ。",
          visual: { kind: "emoji", value: "✍️", caption: "かんがえを つたえる" },
        },
        {
          heading: "{主張|しゅちょう}→{理由|りゆう}→{例|れい}",
          body: "「わたしは 〜と {考|かんが}える。なぜなら 〜だからだ。たとえば 〜」のように くみたてると、{説得力|せっとくりょく}が でるよ。",
          visual: { kind: "emoji", value: "{主張|しゅちょう} → {理由|りゆう} → {例|れい}", caption: "くみたての じゅん" },
        },
        {
          heading: "パンフレットの くふう",
          body: "つたえたい ことを {見出|みだ}しや {絵|え}で めだたせ、{読|よ}む{人|ひと}に わかりやすく ならべるのが パンフレットの くふうだよ。",
          visual: { kind: "emoji", value: "📰", caption: "みだし と え" },
        },
      ],
    },
    test: { unitId: U.opinionWriting, questions: opinionWritingQuestions, questionCount: 5 },
  },
};
