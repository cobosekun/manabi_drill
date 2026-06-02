// ══════════════════════════════════════════
// カリキュラム: 国語（こくご）小6
// 基準テンプレ src/data/curriculum/sansuu/g1.ts と同形の export 構造。
// subject/domain 命名は既存 kokugo/g2.ts に整合（kokugo.kanji / language / read / write）。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 依存(prerequisites/leadsTo)は kokugo.g6 内で自己完結させ、単独でも整合検査を通す。
// 漢字学習・熟語・古典など意図的箇所のみ漢字、ほかは基本ひらがな（高学年向けに調整）。
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
    title: "かんじ191字",
    order: 1,
    realWorldUse: "しんぶんや ほん、せつめいしょに でてくる むずかしい かんじを よみかきできるように なるよ。",
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
    realWorldUse: "なりたちが わかると、しらない じゅくごの いみも かんじから そうぞうできるように なるよ。",
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
    title: "けいごの つかいかた",
    order: 3,
    realWorldUse: "せんせいや めうえの 人と はなす とき、ていねいで しつれいのない いいかたが できるように なるよ。",
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
    title: "ことばの うつりかわり",
    order: 4,
    realWorldUse: "むかしと いまの ことばの ちがいを しると、古典や ニュースの ことばが よくわかるよ。",
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
    title: "ぶんしょうぜんたいの こうせい",
    order: 5,
    realWorldUse: "ながい せつめいぶんを「はじめ・なか・おわり」で よみとくと、ないようが すばやく つかめるよ。",
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
    title: "ひっしゃの しゅちょうを とらえる",
    order: 6,
    realWorldUse: "ニュースや いけんが「なにを いいたいか」を 見ぬく ちからが つくよ。",
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
    title: "こてんに したしむ",
    order: 7,
    realWorldUse: "竹取物語や枕草子など、むかしの 人の かんがえや くらしに ふれることが できるよ。",
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
    title: "いけんぶん・パンフレットを かく",
    order: 8,
    realWorldUse: "じぶんの かんがえを りゆうとともに つたえ、人を なっとくさせる ぶんしょうが かけるよ。",
    leadsTo: [],
    prerequisites: [U.authorsClaim, U.keigo],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 問題（全問 explanation 必須・4択）────────────────────

const kanji191Questions: ChoiceQuestion[] = [
  {
    id: `${U.kanji191}.q-1`,
    unitId: U.kanji191,
    prompt: "「我」の くんよみは どれ？",
    explanation: "「我」は「われ」。じぶんの ことを あらわす かんじだよ。",
    format: "choice",
    choices: ["われ", "あれ", "おれ", "かれ"],
    answer: "われ",
  },
  {
    id: `${U.kanji191}.q-2`,
    unitId: U.kanji191,
    prompt: "「対」を つかった ただしい じゅくごは どれ？",
    explanation: "「対立（たいりつ）」=ふたつが むかいあう こと。「対」を つかうよ。",
    format: "choice",
    choices: ["対立", "体立", "太立", "待立"],
    answer: "対立",
  },
  {
    id: `${U.kanji191}.q-3`,
    unitId: U.kanji191,
    prompt: "「著しい」の よみかたは どれ？",
    explanation: "「著しい」=いちじるしい。とても めだつ ようす だよ。",
    format: "choice",
    choices: ["いちじるしい", "あたらしい", "めずらしい", "はげしい"],
    answer: "いちじるしい",
  },
  {
    id: `${U.kanji191}.q-4`,
    unitId: U.kanji191,
    prompt: "「推理」の「推」の よみかた(おん)は どれ？",
    explanation: "「推理（すいり）」。「推」は おんよみで「すい」と よむよ。",
    format: "choice",
    choices: ["すい", "おし", "じゅう", "たい"],
    answer: "すい",
  },
  {
    id: `${U.kanji191}.q-5`,
    unitId: U.kanji191,
    prompt: "「困る」の よみかたは どれ？",
    explanation: "「困る」=こまる。どう したら いいか わからない こと。",
    format: "choice",
    choices: ["こまる", "ねむる", "くばる", "しかる"],
    answer: "こまる",
  },
  {
    id: `${U.kanji191}.q-6`,
    unitId: U.kanji191,
    prompt: "「蔵」の 部首は どれ？",
    explanation: "「蔵」の うえは くさかんむり(艹)。しまって おく ばしょの いみ。",
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
    explanation: "「高（たかい）」と「低（ひくい）」は はんたいの いみの かんじ。",
    format: "choice",
    choices: ["はんたいの いみの かんじ", "にた いみの かんじ", "うえが したを くわしくする", "しゅごと じゅつご"],
    answer: "はんたいの いみの かんじ",
  },
  {
    id: `${U.jukugo}.q-2`,
    unitId: U.jukugo,
    prompt: "「岩石」は どんな なりたち？",
    explanation: "「岩」も「石」も にた いみ。かさねて いみを つよめて いるよ。",
    format: "choice",
    choices: ["にた いみの かんじ", "はんたいの いみ", "うえが したを くわしくする", "どうさと あいて"],
    answer: "にた いみの かんじ",
  },
  {
    id: `${U.jukugo}.q-3`,
    unitId: U.jukugo,
    prompt: "「読書」（書を読む）は どんな なりたち？",
    explanation: "うえが どうさ「読」、したが その あいて「書」。〜を〜する の かたち。",
    format: "choice",
    choices: ["したが あいて（〜を〜する）", "にた いみ", "はんたいの いみ", "しゅごと じゅつご"],
    answer: "したが あいて（〜を〜する）",
  },
  {
    id: `${U.jukugo}.q-4`,
    unitId: U.jukugo,
    prompt: "「国旗」は どんな なりたち？",
    explanation: "「国の旗」。うえの「国」が したの「旗」を くわしく して いるよ。",
    format: "choice",
    choices: ["うえが したを くわしくする", "はんたいの いみ", "にた いみ", "どうさと あいて"],
    answer: "うえが したを くわしくする",
  },
  {
    id: `${U.jukugo}.q-5`,
    unitId: U.jukugo,
    prompt: "「左右」は どんな なりたち？",
    explanation: "「左」と「右」は はんたいの いみの かんじ だよ。",
    format: "choice",
    choices: ["はんたいの いみの かんじ", "にた いみ", "うえが したを くわしくする", "どうさと あいて"],
    answer: "はんたいの いみの かんじ",
  },
];

const keigoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.keigo}.q-1`,
    unitId: U.keigo,
    prompt: "「です・ます」を つかった ことばづかいを なんと いう？",
    explanation: "「です・ます」は ていねいご。だれにでも つかえる ていねいな いいかた。",
    format: "choice",
    choices: ["ていねいご", "そんけいご", "けんじょうご", "ふつうの ことば"],
    answer: "ていねいご",
  },
  {
    id: `${U.keigo}.q-2`,
    unitId: U.keigo,
    prompt: "「先生が 言う」を そんけいごに すると？",
    explanation: "あいて（先生）を たかめる そんけいご。「言う→おっしゃる」。",
    format: "choice",
    choices: ["おっしゃる", "申す", "いたす", "うかがう"],
    answer: "おっしゃる",
  },
  {
    id: `${U.keigo}.q-3`,
    unitId: U.keigo,
    prompt: "じぶんが「行く」を けんじょうごに すると？",
    explanation: "じぶんを ひくめる けんじょうご。「行く→うかがう・まいる」。",
    format: "choice",
    choices: ["うかがう", "いらっしゃる", "おいでになる", "おっしゃる"],
    answer: "うかがう",
  },
  {
    id: `${U.keigo}.q-4`,
    unitId: U.keigo,
    prompt: "あいてが「食べる」ときに つかう そんけいごは どれ？",
    explanation: "あいてが 食べる ときは「めしあがる」。「いただく」は じぶんがわの けんじょうご。",
    format: "choice",
    choices: ["めしあがる", "いただく", "食べます", "食べちゃう"],
    answer: "めしあがる",
  },
  {
    id: `${U.keigo}.q-5`,
    unitId: U.keigo,
    prompt: "けんじょうごを つかうのは どんな とき？",
    explanation: "けんじょうごは じぶんがわを ひくめて、あいてを うやまう いいかた。",
    format: "choice",
    choices: ["じぶんの どうさを ひくめて いう とき", "あいての どうさを たかめる とき", "ともだちと はなす とき", "ひとりごとの とき"],
    answer: "じぶんの どうさを ひくめて いう とき",
  },
];

const wordChangeQuestions: ChoiceQuestion[] = [
  {
    id: `${U.wordChange}.q-1`,
    unitId: U.wordChange,
    prompt: "古語「いと」は いまの どの いみに ちかい？",
    explanation: "古語の「いと」は「とても・たいへん」の いみ だよ。",
    format: "choice",
    choices: ["とても", "いやだ", "いと（糸）", "いえ"],
    answer: "とても",
  },
  {
    id: `${U.wordChange}.q-2`,
    unitId: U.wordChange,
    prompt: "「マウンテン」は どの しゅるいの ことば？",
    explanation: "そとの くにから きた ことば=外来語。カタカナで かくことが おおい。",
    format: "choice",
    choices: ["外来語", "和語", "漢語", "古語"],
    answer: "外来語",
  },
  {
    id: `${U.wordChange}.q-3`,
    unitId: U.wordChange,
    prompt: "「やま」は どの しゅるいの ことば？",
    explanation: "むかしから にほんに ある ことば=和語。くんよみで よむことが おおい。",
    format: "choice",
    choices: ["和語", "漢語", "外来語", "古語"],
    answer: "和語",
  },
  {
    id: `${U.wordChange}.q-4`,
    unitId: U.wordChange,
    prompt: "「山岳」は どの しゅるいの ことば？",
    explanation: "かんじの おんよみで よむ ことば=漢語。中国から つたわった ことば。",
    format: "choice",
    choices: ["漢語", "和語", "外来語", "古語"],
    answer: "漢語",
  },
  {
    id: `${U.wordChange}.q-5`,
    unitId: U.wordChange,
    prompt: "ことばが かわっていく りゆうに いちばん ちかいのは？",
    explanation: "あたらしい もの・ことが ふえると、それを よぶ ことばも うまれるよ。",
    format: "choice",
    choices: ["あたらしい どうぐや ぶんかが うまれるから", "じしょが なくなるから", "かんじが きえるから", "がっこうが ないから"],
    answer: "あたらしい どうぐや ぶんかが うまれるから",
  },
];

const textStructureQuestions: ChoiceQuestion[] = [
  {
    id: `${U.textStructure}.q-1`,
    unitId: U.textStructure,
    prompt: "せつめいぶんの「おわり（けつろん）」の やくわりは？",
    explanation: "「おわり」では、ぜんたいの まとめ（けつろん）を のべることが おおいよ。",
    format: "choice",
    choices: ["まとめ（けつろん）を のべる", "わだいを しめす", "れいを はじめて あげる", "あいさつを する"],
    answer: "まとめ（けつろん）を のべる",
  },
  {
    id: `${U.textStructure}.q-2`,
    unitId: U.textStructure,
    prompt: "「はじめ（じょろん）」の だんらくでは ふつう なにを する？",
    explanation: "「はじめ」では、これから なにを はなすか（わだい）を しめすよ。",
    format: "choice",
    choices: ["わだいを しめす", "けつろんを いう", "れいを くわしく かく", "かんそうだけ かく"],
    answer: "わだいを しめす",
  },
  {
    id: `${U.textStructure}.q-3`,
    unitId: U.textStructure,
    prompt: "だんらくと だんらくを つなぐ ことば（せつぞくご）は どれ？",
    explanation: "「だから・しかし・また」などは だんらくを つなぐ せつぞくご だよ。",
    format: "choice",
    choices: ["だから", "とても", "きれいな", "はしる"],
    answer: "だから",
  },
  {
    id: `${U.textStructure}.q-4`,
    unitId: U.textStructure,
    prompt: "「なか（ほんろん）」の やくわりに ちかいのは？",
    explanation: "「なか」では れいや りゆうを あげて、くわしく せつめいするよ。",
    format: "choice",
    choices: ["れいや りゆうで くわしく せつめいする", "あいさつを する", "だいめいを かく", "えを かく"],
    answer: "れいや りゆうで くわしく せつめいする",
  },
  {
    id: `${U.textStructure}.q-5`,
    unitId: U.textStructure,
    prompt: "ぶんしょうの こうせいを つかむと よいことは？",
    explanation: "こうせいが わかると、ひっしゃの しゅちょうが つかみやすく なるよ。",
    format: "choice",
    choices: ["ひっしゃの いいたいことが わかりやすい", "ぶんの ながさが きまる", "かんじが ふえる", "えが かける"],
    answer: "ひっしゃの いいたいことが わかりやすい",
  },
];

const authorsClaimQuestions: ChoiceQuestion[] = [
  {
    id: `${U.authorsClaim}.q-1`,
    unitId: U.authorsClaim,
    prompt: "ひっしゃの しゅちょうが よく あらわれる ところは？",
    explanation: "しゅちょうは まとめの だんらく（おわり）に かかれることが おおいよ。",
    format: "choice",
    choices: ["さいごの だんらく（まとめ）", "だいめいの した", "さいしょの えだけ", "ページばんごう"],
    answer: "さいごの だんらく（まとめ）",
  },
  {
    id: `${U.authorsClaim}.q-2`,
    unitId: U.authorsClaim,
    prompt: "「たとえば〜」と れいを あげるのは なんの くふう？",
    explanation: "れいを あげると、いいたいことが ぐっと わかりやすく なるよ。",
    format: "choice",
    choices: ["わかりやすく する くふう", "ながく する くふう", "むずかしく する くふう", "えを ふやす くふう"],
    answer: "わかりやすく する くふう",
  },
  {
    id: `${U.authorsClaim}.q-3`,
    unitId: U.authorsClaim,
    prompt: "ぶんしょうの なかで なんども くりかえされる ことばは なにを あらわす？",
    explanation: "くりかえされる ことばは、ひっしゃが つよく いいたい たいせつな こと だよ。",
    format: "choice",
    choices: ["ひっしゃが たいせつに している こと", "ぐうぜん", "かきまちがい", "ただの かざり"],
    answer: "ひっしゃが たいせつに している こと",
  },
  {
    id: `${U.authorsClaim}.q-4`,
    unitId: U.authorsClaim,
    prompt: "グラフや ひょうを つかう せつめいの こうかは？",
    explanation: "グラフは かずや うつりかわりを 目で みて わかりやすく する くふう。",
    format: "choice",
    choices: ["かずや へんかが ひとめで わかる", "ぶんしょうが みじかく なる", "えが きれいに なる", "かんじが へる"],
    answer: "かずや へんかが ひとめで わかる",
  },
  {
    id: `${U.authorsClaim}.q-5`,
    unitId: U.authorsClaim,
    prompt: "「みなさんは どう おもいますか」のような といかけの こうかは？",
    explanation: "といかけは、よむ人を ひきつけて かんがえさせる くふう だよ。",
    format: "choice",
    choices: ["よむ人に かんがえさせる", "こたえを かくす", "ぶんを みじかくする", "だいめいを きめる"],
    answer: "よむ人に かんがえさせる",
  },
];

const classicsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.classics}.q-1`,
    unitId: U.classics,
    prompt: "「竹取物語」の しゅじんこうは だれ？",
    explanation: "竹の なかから うまれた かぐやひめの おはなし だよ。",
    format: "choice",
    choices: ["かぐやひめ", "ももたろう", "うらしまたろう", "いっすんぼうし"],
    answer: "かぐやひめ",
  },
  {
    id: `${U.classics}.q-2`,
    unitId: U.classics,
    prompt: "「枕草子」を かいた 人は だれ？",
    explanation: "「枕草子」は せいしょうなごんが かいた ずいひつ だよ。",
    format: "choice",
    choices: ["せいしょうなごん", "むらさきしきぶ", "かものちょうめい", "まつおばしょう"],
    answer: "せいしょうなごん",
  },
  {
    id: `${U.classics}.q-3`,
    unitId: U.classics,
    prompt: "「春は あけぼの」で はじまる さくひんは どれ？",
    explanation: "「春は あけぼの」は 枕草子の ゆうめいな はじまりの ぶん。",
    format: "choice",
    choices: ["枕草子", "竹取物語", "源氏物語", "平家物語"],
    answer: "枕草子",
  },
  {
    id: `${U.classics}.q-4`,
    unitId: U.classics,
    prompt: "古語「あけぼの」の いみに ちかいのは？",
    explanation: "「あけぼの」は あさ、そらが あかるく なりはじめる ころ だよ。",
    format: "choice",
    choices: ["よあけ（あさ はやく）", "よなか", "ひるま", "ゆうがた"],
    answer: "よあけ（あさ はやく）",
  },
  {
    id: `${U.classics}.q-5`,
    unitId: U.classics,
    prompt: "竹取物語の さいご、かぐやひめは どこへ かえる？",
    explanation: "かぐやひめは つきの みやこへ かえって いくよ。",
    format: "choice",
    choices: ["月", "海", "山", "もりの なか"],
    answer: "月",
  },
];

const opinionWritingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.opinionWriting}.q-1`,
    unitId: U.opinionWriting,
    prompt: "いけんぶんで、しゅちょうの あとに かくと よいのは？",
    explanation: "しゅちょうの あとに りゆうを かくと、なっとくして もらいやすいよ。",
    format: "choice",
    choices: ["そう かんがえる りゆう", "かんけいない はなし", "だいめいだけ", "えだけ"],
    answer: "そう かんがえる りゆう",
  },
  {
    id: `${U.opinionWriting}.q-2`,
    unitId: U.opinionWriting,
    prompt: "せっとくりょくを たかめる ために くわえると よいのは？",
    explanation: "「たとえば」と ぐたいれいを あげると、しゅちょうが つよく なるよ。",
    format: "choice",
    choices: ["ぐたいてきな れい", "かんけいない かんそう", "おなじ ことの くりかえし", "らくがき"],
    answer: "ぐたいてきな れい",
  },
  {
    id: `${U.opinionWriting}.q-3`,
    unitId: U.opinionWriting,
    prompt: "「なぜなら」の あとに かくのは ふつう なに？",
    explanation: "「なぜなら〜から」で りゆうを せつめいするよ。",
    format: "choice",
    choices: ["りゆう", "けつろんの はんたい", "だいめい", "ひづけ"],
    answer: "りゆう",
  },
  {
    id: `${U.opinionWriting}.q-4`,
    unitId: U.opinionWriting,
    prompt: "パンフレットで よむ人の 目を ひく くふうは？",
    explanation: "みだし・え・いろで たいせつな ところを めだたせると つたわりやすい。",
    format: "choice",
    choices: ["みだしや えで めだたせる", "ぜんぶ おなじ おおきさの じ", "くろ1しょくだけ", "ぎっしり つめて かく"],
    answer: "みだしや えで めだたせる",
  },
  {
    id: `${U.opinionWriting}.q-5`,
    unitId: U.opinionWriting,
    prompt: "よい いけんぶんの くみたてに ちかいのは どれ？",
    explanation: "しゅちょうを りゆうと れいで ささえ、さいごに まとめると よい いけんぶんに なるよ。",
    format: "choice",
    choices: ["しゅちょう→りゆう→れい→まとめ", "れい→だいめい→え", "かんそう→かんそう→かんそう", "ひづけ→なまえ→おわり"],
    answer: "しゅちょう→りゆう→れい→まとめ",
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
          heading: "6年生の かんじ",
          body: "6年生では あたらしく 191字の かんじを ならうよ。「我・推・著・蔵」など、すこし むずかしい かんじが ふえるよ。",
          visual: { kind: "emoji", value: "📚 我 推 著 蔵", caption: "6年生で ふえる かんじ" },
        },
        {
          heading: "おんよみ と くんよみ",
          body: "ひとつの かんじに よみかたが いくつも あることが おおいよ。「対」は たい（おん）、「対する」のように つかうことも あるよ。",
          visual: { kind: "emoji", value: "対 → たい / 対する", caption: "よみを セットで おぼえる" },
        },
        {
          heading: "部首で なかまわけ",
          body: "「推」は てへん、「蔵」は くさかんむり。部首が おなじ かんじは いみが にていることが おおいよ。",
          visual: { kind: "emoji", value: "扌 てへん → 推 採 操", caption: "部首で おぼえる" },
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
          body: "「学校」「読書」のように、かんじが 2つ いじょう あつまって できた ことばを じゅくごと いうよ。",
          visual: { kind: "emoji", value: "学 ＋ 校 ＝ 学校", caption: "かんじが あつまった ことば" },
        },
        {
          heading: "なりたちには しゅるいが ある",
          body: "にた いみ（岩石）、はんたいの いみ（高低）、うえが したを くわしく（国旗）、うえが どうさ・したが あいて（読書=書を読む）など、きまりが あるよ。",
          visual: { kind: "emoji", value: "岩石 / 高低 / 国旗", caption: "なりたちの しゅるい" },
        },
        {
          heading: "なりたちで いみが わかる",
          body: "「乗車」は「車に乗る」。なりたちを かんがえると、しらない じゅくごの いみも そうぞうできるよ。",
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
          heading: "けいごって なに？",
          body: "あいてを たいせつに おもう きもちを あらわす ことばづかいだよ。「ていねいご・そんけいご・けんじょうご」の 3しゅるいが あるよ。",
          visual: { kind: "emoji", value: "🙇", caption: "あいてを うやまう" },
        },
        {
          heading: "ていねいご",
          body: "「です・ます」を つけると ていねいに なるよ。「行く→行きます」「本だ→本です」。だれにでも つかえるよ。",
          visual: { kind: "emoji", value: "行く → 行きます", caption: "です・ます" },
        },
        {
          heading: "そんけいご と けんじょうご",
          body: "あいてを たかめる そんけいご（言う→おっしゃる）、じぶんを ひくめる けんじょうご（言う→申す）。あいてに よって つかいわけるよ。",
          visual: { kind: "emoji", value: "おっしゃる ⇔ 申す", caption: "たかめる / ひくめる" },
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
          body: "むかしと いまでは、おなじ ものでも よびかたが ちがう ことが あるよ。ことばは じだいと ともに かわるんだ。",
          visual: { kind: "emoji", value: "🕰️", caption: "じだいで かわる" },
        },
        {
          heading: "和語・漢語・外来語",
          body: "「やま（和語）」「山岳（漢語）」「マウンテン（外来語）」。にほんごには この 3しゅるいの ことばが まざって いるよ。",
          visual: { kind: "emoji", value: "やま / 山岳 / マウンテン", caption: "3しゅるいの ことば" },
        },
        {
          heading: "あたらしい ことば",
          body: "「スマホ」など、あたらしい どうぐや ぶんかから、あたらしい ことばが うまれて いくよ。",
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
          heading: "ぶんしょうには かたちが ある",
          body: "せつめいぶんは「はじめ（じょろん）・なか（ほんろん）・おわり（けつろん）」の 3つの まとまりで できて いることが おおいよ。",
          visual: { kind: "emoji", value: "はじめ → なか → おわり", caption: "3つの まとまり" },
        },
        {
          heading: "だんらくの やくわり",
          body: "それぞれの だんらくが なにを いっているかを つかむと、ぜんたいの ながれが よく わかるよ。",
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
          heading: "しゅちょうって なに？",
          body: "ひっしゃが その ぶんしょうで いちばん いいたいこと=しゅちょう。さいごの だんらくや、くりかえされる ことばに ちゅうもくしよう。",
          visual: { kind: "emoji", value: "💡", caption: "いちばん いいたい こと" },
        },
        {
          heading: "せつめいの くふう",
          body: "ひっしゃは しゅちょうを つたえる ために、れい・たとえ・グラフ・といかけ などを つかうよ。どんな くふうか かんがえよう。",
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
          heading: "こてんって なに？",
          body: "むかしの 人が かいた ものがたりや ずいひつを こてん（古典）と いうよ。1000ねんも まえの ものも あるんだ。",
          visual: { kind: "emoji", value: "📜", caption: "むかしの さくひん" },
        },
        {
          heading: "竹取物語",
          body: "「いまは むかし、竹取の おきな と いう もの ありけり」で はじまる、かぐやひめの おはなし。にほんで いちばん ふるい ものがたりの ひとつだよ。",
          visual: { kind: "emoji", value: "🎋🌕", caption: "かぐやひめ" },
        },
        {
          heading: "枕草子",
          body: "せいしょうなごんが かいた ずいひつ。「春は あけぼの」で はじまり、きせつの すてきな ようすを えがいて いるよ。",
          visual: { kind: "emoji", value: "🌸", caption: "春は あけぼの" },
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
          heading: "いけんぶんって なに？",
          body: "じぶんの かんがえ（しゅちょう）と、その りゆう・れいを かいて、よむ人を なっとくさせる ぶんしょうだよ。",
          visual: { kind: "emoji", value: "✍️", caption: "かんがえを つたえる" },
        },
        {
          heading: "しゅちょう→りゆう→れい",
          body: "「わたしは 〜と かんがえる。なぜなら 〜だからだ。たとえば 〜」のように くみたてると、せっとくりょくが でるよ。",
          visual: { kind: "emoji", value: "主張 → 理由 → 例", caption: "くみたての じゅん" },
        },
        {
          heading: "パンフレットの くふう",
          body: "つたえたい ことを みだしや えで めだたせ、よむ人に わかりやすく ならべるのが パンフレットの くふうだよ。",
          visual: { kind: "emoji", value: "📰", caption: "みだし と え" },
        },
      ],
    },
    test: { unitId: U.opinionWriting, questions: opinionWritingQuestions, questionCount: 5 },
  },
};
