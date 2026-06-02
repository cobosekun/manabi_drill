// ══════════════════════════════════════════
// カリキュラム: 国語（こくご）小2
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 基準テンプレ実装 = src/data/curriculum/sansuu/g1.ts と同形。
//
// 学習指導要領（小2 国語）に基づく領域・内容:
//  ・知識及び技能: 漢字160字 / かたかなで書く語 / 句読点・かぎかっこ / 主語と述語
//  ・〔書くこと〕: かんさつ記録文 / 手紙
//  ・〔読むこと〕: 物語 / せつめい文
// 国語は generators を持たないため、テストは全て固定 questions[]（全問 explanation 必須）。
// 文言は漢字+ルビ {漢字|よみ}（学年配当漢字のみ・全漢字ルビ）。漢字学習で読みを問う箇所はルビ無しを許容（例外）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  TextInputQuestion,
  OrderingQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const kokugoSubject: Subject = {
  id: "kokugo",
  name: "こくご",
  formalName: "国語",
  emoji: "📖",
  theme: "rose",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域（学習指導要領の領域・内容に対応） ──────────────

export const kokugoG2Domains: Domain[] = [
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
// 依存グラフ（prerequisites を辺とする DAG。参照は本ファイル内で完結させ並列衝突を防ぐ）:
//
//   kanji-numbers ─┐
//   kanji-nature ──┼─▶ kanji-write
//   kanji-life ────┘
//
//   subject-predicate ─┬─▶ punctuation ─┬─▶ letter
//   katakana-words ────┘     │          └─▶ observation-record ◀─┐
//                            └─▶ read-story ─▶ read-explanation ─┘
//
const U = {
  kanjiNumbers: "kokugo.g2.kanji-numbers",
  kanjiNature: "kokugo.g2.kanji-nature",
  kanjiLife: "kokugo.g2.kanji-life",
  kanjiWrite: "kokugo.g2.kanji-write",
  subjectPredicate: "kokugo.g2.subject-predicate",
  katakanaWords: "kokugo.g2.katakana-words",
  punctuation: "kokugo.g2.punctuation",
  readStory: "kokugo.g2.read-story",
  readExplanation: "kokugo.g2.read-explanation",
  observationRecord: "kokugo.g2.observation-record",
  letter: "kokugo.g2.letter",
} as const;

export const kokugoG2Units: Unit[] = [
  {
    id: U.kanjiNumbers,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.kanji",
    title: "{数|かず}と{時|とき}のかんじ",
    order: 1,
    realWorldUse: "ねだんの「{百|ひゃく}えん」、カレンダーの「{曜日|ようび}」、とけいの「{午前|ごぜん}・{午後|ごご}」など、{毎日|まいにち}{目|め}にするかんじだよ。",
    leadsTo: [U.kanjiWrite],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kanjiNature,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.kanji",
    title: "しぜんのかんじ",
    order: 2,
    realWorldUse: "てんきよほうの「{晴|は}れ・{雨|あめ}・{雪|ゆき}」や、ちずの「{海|うみ}・{池|いけ}・{里|さと}」を{読|よ}むときにつかうよ。",
    leadsTo: [U.kanjiWrite],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kanjiLife,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.kanji",
    title: "{生活|せいかつ}のかんじ",
    order: 3,
    realWorldUse: "「{朝|あさ}・{昼|ひる}・{夜|よる}」や「{食|た}べる・{買|か}う・{歩|ある}く」など、{一日|いちにち}のくらしをあらわすかんじだよ。",
    leadsTo: [U.kanjiWrite],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kanjiWrite,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.kanji",
    title: "かんじの{書|か}きかた（ひつじゅん・{画数|かくすう}）",
    order: 4,
    realWorldUse: "{正|ただ}しい{書|か}きじゅんで{書|か}くと、{字|じ}がきれいになって、{早|はや}く{書|か}けるようになるよ。",
    leadsTo: [],
    prerequisites: [U.kanjiNumbers, U.kanjiNature, U.kanjiLife],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.subjectPredicate,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.language",
    title: "しゅごと じゅつご",
    order: 5,
    realWorldUse: "「だれが」「どうする」をはっきりさせると、ことばがあいてに{正|ただ}しくつたわるよ。",
    leadsTo: [U.punctuation, U.readStory],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.katakanaWords,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.language",
    title: "かたかなで{書|か}くことば",
    order: 6,
    realWorldUse: "「テレビ」「ノート」など、{外国|がいこく}から{来|き}たことばや{音|おと}をあらわすときにかたかなをつかうよ。",
    leadsTo: [U.punctuation],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.punctuation,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.language",
    title: "まる・てん・かぎ（。、「」）",
    order: 7,
    realWorldUse: "{文|ぶん}のおわりに「。」、くぎりに「、」、はなしたことばに「」をつけると、{文|ぶん}が{読|よ}みやすくなるよ。",
    leadsTo: [U.letter, U.observationRecord],
    prerequisites: [U.subjectPredicate, U.katakanaWords],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.readStory,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.read",
    title: "ものがたりを{読|よ}む",
    order: 8,
    realWorldUse: "だれが・どこで・どうしたを{読|よ}みとると、おはなしのたのしさがよくわかるよ。",
    leadsTo: [U.readExplanation],
    prerequisites: [U.subjectPredicate],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.readExplanation,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.read",
    title: "せつめい{文|ぶん}を{読|よ}む",
    order: 9,
    realWorldUse: "「なにが・どんなじゅんばんで」を{読|よ}みとると、ずかんや{作|つく}りかたの{文|ぶん}がわかるようになるよ。",
    leadsTo: [U.observationRecord],
    prerequisites: [U.readStory],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.observationRecord,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.write",
    title: "かんさつきろく{文|ぶん}を{書|か}く",
    order: 10,
    realWorldUse: "そだてているやさいや{虫|むし}を「いつ・なにを・どうだったか」じゅんばんに{書|か}いて、きろくにのこせるよ。",
    leadsTo: [],
    prerequisites: [U.punctuation, U.readExplanation],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.letter,
    subjectId: "kokugo",
    grade: 2,
    domainId: "kokugo.write",
    title: "{手紙|てがみ}を{書|か}く",
    order: 11,
    realWorldUse: "おじいちゃんやおともだちに、きもちをつたえる{手紙|てがみ}やはがきを{書|か}くときにつかうよ。",
    leadsTo: [],
    prerequisites: [U.punctuation],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// 国語は固定 questions[]。全問 explanation 必須。
// ══════════════════════════════════════════

// ── 数と時のかんじ ──
// 読み取りクイズ: 対象漢字は読みを問うため意図的にルビ無し（例外）。
const kanjiNumbersQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiNumbers}.q1`,
    unitId: U.kanjiNumbers,
    prompt: "「百」の よみかたは どれ？",
    explanation: "「百」は ひゃく と よむよ。100 のことだね。",
    format: "choice",
    choices: ["ひゃく", "せん", "まん", "じゅう"],
    answer: "ひゃく",
  },
  {
    id: `${U.kanjiNumbers}.q2`,
    unitId: U.kanjiNumbers,
    prompt: "「千」の よみかたは どれ？",
    explanation: "「千」は せん と よむよ。1000 のことだね。",
    format: "choice",
    choices: ["せん", "ひゃく", "まん", "百"],
    answer: "せん",
  },
  {
    id: `${U.kanjiNumbers}.q3`,
    unitId: U.kanjiNumbers,
    prompt: "「金曜日」の「金」の よみかたは どれ？",
    explanation: "ようびの「金」は きん と よむよ。月・火・水・木・金・土・日 のなかまだね。",
    format: "choice",
    choices: ["きん", "かね", "つち", "ひ"],
    answer: "きん",
  },
  {
    id: `${U.kanjiNumbers}.q4`,
    unitId: U.kanjiNumbers,
    prompt: "「午前」と はんたいの ことばは どれ？",
    explanation: "ひるより まえが「午前」、ひるより あとが「午後」だよ。",
    format: "choice",
    choices: ["午後", "午中", "正午", "毎日"],
    answer: "午後",
  },
];

// ── しぜんのかんじ ──
const kanjiNatureQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiNature}.q1`,
    unitId: U.kanjiNature,
    prompt: "「雪」の よみかたは どれ？",
    explanation: "「雪」は ゆき と よむよ。ふゆに そらから ふってくる しろいものだね。",
    format: "choice",
    choices: ["ゆき", "あめ", "くも", "ほし"],
    answer: "ゆき",
  },
  {
    id: `${U.kanjiNature}.q2`,
    unitId: U.kanjiNature,
    prompt: "「海」の よみかたは どれ？",
    explanation: "「海」は うみ と よむよ。とても ひろい みずの ばしょだね。",
    format: "choice",
    choices: ["うみ", "いけ", "かわ", "やま"],
    answer: "うみ",
  },
  {
    id: `${U.kanjiNature}.q3`,
    unitId: U.kanjiNature,
    prompt: "「晴れ」の よみかたは どれ？",
    explanation: "「晴れ」は はれ と よむよ。そらに くもが すくなくて おひさまがでているてんきだね。",
    format: "choice",
    choices: ["はれ", "あめ", "ゆき", "かぜ"],
    answer: "はれ",
  },
  {
    id: `${U.kanjiNature}.q4`,
    unitId: U.kanjiNature,
    prompt: "「星」の よみかたは どれ？",
    explanation: "「星」は ほし と よむよ。よるの そらに ひかって{見|み}えるね。",
    format: "choice",
    choices: ["ほし", "つき", "ひ", "そら"],
    answer: "ほし",
  },
];

// ── 生活のかんじ ──
const kanjiLifeQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiLife}.q1`,
    unitId: U.kanjiLife,
    prompt: "「朝」の よみかたは どれ？",
    explanation: "「朝」は あさ と よむよ。{一日|いちにち}の はじまりの じかんだね。",
    format: "choice",
    choices: ["あさ", "ひる", "よる", "ばん"],
    answer: "あさ",
  },
  {
    id: `${U.kanjiLife}.q2`,
    unitId: U.kanjiLife,
    prompt: "「食べる」の よみかたは どれ？",
    explanation: "「食べる」は たべる と よむよ。ごはんを{口|くち}に{入|い}れることだね。",
    format: "choice",
    choices: ["たべる", "かべる", "しょくべる", "のべる"],
    answer: "たべる",
  },
  {
    id: `${U.kanjiLife}.q3`,
    unitId: U.kanjiLife,
    prompt: "「買う」の よみかたは どれ？",
    explanation: "「買う」は かう と よむよ。おみせで おかねを はらって{手|て}に{入|い}れることだね。",
    format: "choice",
    choices: ["かう", "うる", "もらう", "ばう"],
    answer: "かう",
  },
  {
    id: `${U.kanjiLife}.q4`,
    unitId: U.kanjiLife,
    prompt: "「歩く」の よみかたは どれ？",
    explanation: "「歩く」は あるく と よむよ。あしを つかって まえに すすむことだね。",
    format: "choice",
    choices: ["あるく", "はしる", "ほく", "ふく"],
    answer: "あるく",
  },
];

// ── かんじの書きかた（ひつじゅん・画数） ──
const kanjiWriteQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiWrite}.q1`,
    unitId: U.kanjiWrite,
    prompt: "かんじを{書|か}くとき、ふつう どのじゅんばんで{書|か}く？",
    explanation: "かんじは「うえから した」「ひだりから みぎ」のじゅんばんで{書|か}くのが きほんだよ。",
    format: "choice",
    choices: ["うえから したへ", "したから うえへ", "みぎから ひだりへ", "まんなかから そとへ"],
    answer: "うえから したへ",
  },
  {
    id: `${U.kanjiWrite}.q2`,
    unitId: U.kanjiWrite,
    prompt: "「{画数|かくすう}」とは なにの ことかな？",
    explanation: "{画数|かくすう}は、かんじを{書|か}くときの せんの{数|かず}のことだよ。たとえば「二」は 2{画|かく}だね。",
    format: "choice",
    choices: ["せんの{数|かず}", "よみかたの{数|かず}", "いみの{数|かず}", "{字|じ}の おおきさ"],
    answer: "せんの{数|かず}",
  },
  {
    id: `${U.kanjiWrite}.q3`,
    unitId: U.kanjiWrite,
    prompt: "「十」の{画数|かくすう}は なん{画|かく}？",
    explanation: "「十」は よこの せんと たての せんで、ぜんぶで 2{画|かく}だよ。",
    format: "choice",
    choices: ["2{画|かく}", "1{画|かく}", "3{画|かく}", "4{画|かく}"],
    answer: "2{画|かく}",
  },
  {
    id: `${U.kanjiWrite}.q4`,
    unitId: U.kanjiWrite,
    prompt: "「川」を{書|か}くとき、いちばん さいしょに{書|か}く せんは どれ？",
    explanation: "「川」は ひだりの たてせんから{書|か}きはじめるよ。ひだりから みぎへ じゅんばんに{書|か}くよ。",
    format: "choice",
    choices: ["ひだりの たてせん", "まんなかの たてせん", "みぎの たてせん", "どれでもよい"],
    answer: "ひだりの たてせん",
  },
];

// ── しゅごと じゅつご ──
const subjectPredicateQuestions: ChoiceQuestion[] = [
  {
    id: `${U.subjectPredicate}.q1`,
    unitId: U.subjectPredicate,
    prompt: "「{犬|いぬ}が{走|はし}る。」の しゅご（だれが・なにが）は どれ？",
    explanation: "「だれが・なにが」にあたる ことばが しゅごだよ。ここでは「{犬|いぬ}が」が しゅごだね。",
    format: "choice",
    choices: ["{犬|いぬ}が", "{走|はし}る", "が", "。"],
    answer: "{犬|いぬ}が",
  },
  {
    id: `${U.subjectPredicate}.q2`,
    unitId: U.subjectPredicate,
    prompt: "「{犬|いぬ}が{走|はし}る。」の じゅつご（どうする・どんなだ）は どれ？",
    explanation: "「どうする・どんなだ」にあたる ことばが じゅつごだよ。ここでは「{走|はし}る」が じゅつごだね。",
    format: "choice",
    choices: ["{走|はし}る", "{犬|いぬ}が", "が", "{犬|いぬ}"],
    answer: "{走|はし}る",
  },
  {
    id: `${U.subjectPredicate}.q3`,
    unitId: U.subjectPredicate,
    prompt: "「お{花|はな}が きれいだ。」の しゅごは どれ？",
    explanation: "「なにが」にあたる「お{花|はな}が」が しゅごだよ。「きれいだ」は じゅつごだね。",
    format: "choice",
    choices: ["お{花|はな}が", "きれいだ", "きれい", "{花|はな}"],
    answer: "お{花|はな}が",
  },
  {
    id: `${U.subjectPredicate}.q4`,
    unitId: U.subjectPredicate,
    prompt: "つぎの{文|ぶん}で じゅつごは どれ？「ぼくは{本|ほん}を{読|よ}む。」",
    explanation: "「どうする」にあたる「{読|よ}む」が じゅつごだよ。しゅごは「ぼくは」だね。",
    format: "choice",
    choices: ["{読|よ}む", "ぼくは", "{本|ほん}を", "{本|ほん}"],
    answer: "{読|よ}む",
  },
];

// ── かたかなで書くことば ──
const katakanaWordsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.katakanaWords}.q1`,
    unitId: U.katakanaWords,
    prompt: "かたかなで{書|か}くことばは どれ？",
    explanation: "「テレビ」は{外国|がいこく}から{来|き}たことば（{外来語|がいらいご}）なので かたかなで{書|か}くよ。",
    format: "choice",
    choices: ["テレビ", "いぬ", "やま", "はな"],
    answer: "テレビ",
  },
  {
    id: `${U.katakanaWords}.q2`,
    unitId: U.katakanaWords,
    prompt: "「わんわん」のような どうぶつの なきごえは、ふつう どちらで{書|か}く？",
    explanation: "ものの{音|おと}や なきごえ（ぎおんご）は、かたかなで{書|か}くことが おおいよ。れい:「ワンワン」。",
    format: "choice",
    choices: ["かたかな", "ひらがな", "かんじ", "ローマ{字|じ}"],
    answer: "かたかな",
  },
  {
    id: `${U.katakanaWords}.q3`,
    unitId: U.katakanaWords,
    prompt: "「ノート」を{正|ただ}しく{書|か}いているのは どれ？",
    explanation: "のばす{音|おと}（ー）は かたかなでは ぼう「ー」で{書|か}くよ。「ノート」が{正|ただ}しいね。",
    format: "choice",
    choices: ["ノート", "ノオト", "のうと", "ノ−と"],
    answer: "ノート",
  },
  {
    id: `${U.katakanaWords}.q4`,
    unitId: U.katakanaWords,
    prompt: "つぎのうち、かたかなで{書|か}かないことばは どれ？",
    explanation: "「さくら」は{日本|にほん}に むかしからある ことばなので ひらがなや かんじで{書|か}くよ。ほかは{外来語|がいらいご}だね。",
    format: "choice",
    choices: ["さくら", "パン", "バス", "ケーキ"],
    answer: "さくら",
  },
];

// ── まる・てん・かぎ ──
const punctuationQuestions: ChoiceQuestion[] = [
  {
    id: `${U.punctuation}.q1`,
    unitId: U.punctuation,
    prompt: "{文|ぶん}の おわりに つける しるしは どれ？",
    explanation: "{文|ぶん}の おわりには まる「。」（くてん）を つけるよ。",
    format: "choice",
    choices: ["。", "、", "「", "？のみ"],
    answer: "。",
  },
  {
    id: `${U.punctuation}.q2`,
    unitId: U.punctuation,
    prompt: "{文|ぶん}の とちゅうの くぎりに つける しるしは どれ？",
    explanation: "ことばの くぎりには てん「、」（とうてん）を つけて{読|よ}みやすくするよ。",
    format: "choice",
    choices: ["、", "。", "」", "・"],
    answer: "、",
  },
  {
    id: `${U.punctuation}.q3`,
    unitId: U.punctuation,
    prompt: "はなした ことばを かこむ しるしは どれ？",
    explanation: "{人|ひと}が はなした ことばは かぎかっこ「」で かこむよ。れい:「おはよう」と{言|い}った。",
    format: "choice",
    choices: ["「 」", "（ ）", "。 。", "ーー"],
    answer: "「 」",
  },
  {
    id: `${U.punctuation}.q4`,
    unitId: U.punctuation,
    prompt: "{正|ただ}しく しるしを つけているのは どれ？",
    explanation: "{文|ぶん}の おわりに「。」が ついている「きょうは はれです。」が{正|ただ}しいよ。",
    format: "choice",
    choices: [
      "きょうは はれです。",
      "きょうは はれです、",
      "きょうは。はれです",
      "きょうは はれです",
    ],
    answer: "きょうは はれです。",
  },
];

// ── ものがたりを読む ──
// 短い物語文を prompt 内に提示し、内容を読みとる。
const readStoryQuestions: ChoiceQuestion[] = [
  {
    id: `${U.readStory}.q1`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】{朝|あさ}、うさぎの ぴょんは{森|もり}へ{出|で}かけました。「きょうは どんぐりを ひろうぞ。」\n──ぴょんは どこへ{出|で}かけた？",
    explanation: "{文|ぶん}の{中|なか}に「{森|もり}へ{出|で}かけました」と あるね。だから こたえは「{森|もり}」だよ。",
    format: "choice",
    choices: ["{森|もり}", "{海|うみ}", "{山|やま}", "{学校|がっこう}"],
    answer: "{森|もり}",
  },
  {
    id: `${U.readStory}.q2`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】{朝|あさ}、うさぎの ぴょんは{森|もり}へ{出|で}かけました。「きょうは どんぐりを ひろうぞ。」\n──ぴょんは なにを ひろうと{言|い}った？",
    explanation: "かぎ「」の{中|なか}で「どんぐりを ひろうぞ」と{言|い}っているね。こたえは「どんぐり」だよ。",
    format: "choice",
    choices: ["どんぐり", "きのこ", "はっぱ", "{石|いし}"],
    answer: "どんぐり",
  },
  {
    id: `${U.readStory}.q3`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】ぴょんが{歩|ある}いていると、こりすが ないていました。「{足|あし}を けがしたの。」\n──こりすは どうして ないていた？",
    explanation: "こりすは「{足|あし}を けがした」と{言|い}っているね。だから「{足|あし}を けがしたから」が こたえだよ。",
    format: "choice",
    choices: ["{足|あし}を けがしたから", "おなかが すいたから", "まいごに なったから", "ねむいから"],
    answer: "{足|あし}を けがしたから",
  },
  {
    id: `${U.readStory}.q4`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】ぴょんは こりすに「だいじょうぶ?」と やさしく{声|こえ}を かけました。\n──このとき ぴょんは どんな きもち？",
    explanation: "やさしく{声|こえ}を かけているね。こりすを「しんぱいする」きもちだと わかるよ。",
    format: "choice",
    choices: ["しんぱいする きもち", "おこった きもち", "うれしい きもち", "こわい きもち"],
    answer: "しんぱいする きもち",
  },
];

// ── せつめい文を読む ──
const readExplanationQuestions: ChoiceQuestion[] = [
  {
    id: `${U.readExplanation}.q1`,
    unitId: U.readExplanation,
    prompt:
      "【せつめい{文|ぶん}】たんぽぽは、{春|はる}に きいろい{花|はな}を さかせます。{花|はな}が おわると、わたげに かわります。\n──たんぽぽは どんな いろの{花|はな}を さかせる？",
    explanation: "「きいろい{花|はな}を さかせます」と{書|か}いてあるね。こたえは「きいろ」だよ。",
    format: "choice",
    choices: ["きいろ", "あか", "しろ", "あお"],
    answer: "きいろ",
  },
  {
    id: `${U.readExplanation}.q2`,
    unitId: U.readExplanation,
    prompt:
      "【せつめい{文|ぶん}】たんぽぽは、{春|はる}に きいろい{花|はな}を さかせます。{花|はな}が おわると、わたげに かわります。\n──{花|はな}が おわると なにに かわる？",
    explanation: "「わたげに かわります」と あるね。こたえは「わたげ」だよ。",
    format: "choice",
    choices: ["わたげ", "み", "は", "ねっこ"],
    answer: "わたげ",
  },
  {
    id: `${U.readExplanation}.q3`,
    unitId: U.readExplanation,
    prompt:
      "【せつめい{文|ぶん}】まず、たねを まきます。つぎに、{水|みず}を やります。さいごに、めが{出|で}ます。\n──いちばん さいしょに することは どれ？",
    explanation: "「まず」と あるところに ちゅうもく。さいしょは「たねを まく」だよ。じゅんばんを あらわす ことばに{気|き}をつけよう。",
    format: "choice",
    choices: ["たねを まく", "{水|みず}を やる", "めが{出|で}る", "{花|はな}が さく"],
    answer: "たねを まく",
  },
  {
    id: `${U.readExplanation}.q4`,
    unitId: U.readExplanation,
    prompt: "せつめい{文|ぶん}を{読|よ}むとき、たいせつな{読|よ}みかたは どれ？",
    explanation:
      "せつめい{文|ぶん}は「なにが・どんなじゅんばんか」を{読|よ}みとるのが たいせつ。「まず・つぎに・さいごに」などの ことばを てがかりにするよ。",
    format: "choice",
    choices: [
      "じゅんばんの ことばに{気|き}をつける",
      "{音|おと}だけ きく",
      "えだけ{見|み}る",
      "さいごの{字|じ}だけ{読|よ}む",
    ],
    answer: "じゅんばんの ことばに{気|き}をつける",
  },
];

// ── かんさつきろく文を書く ──
// じゅんばん（ordering）と 書き方の知識（choice）を ミックス。
const observationOrdering: OrderingQuestion = {
  id: `${U.observationRecord}.q1`,
  unitId: U.observationRecord,
  prompt: "かんさつきろく{文|ぶん}を{書|か}くじゅんばんに ならべかえよう。",
  explanation:
    "かんさつきろく{文|ぶん}は「いつ → なにを → どうだったか → おもったこと」のじゅんに{書|か}くと わかりやすいよ。",
  format: "ordering",
  items: ["{五月十日|ごがつとおか}（いつ）", "ミニトマトを{見|み}た（なにを）", "みが{赤|あか}くなった（どうだった）", "うれしかった（おもったこと）"],
  answerOrder: [0, 1, 2, 3],
};

const observationChoiceQuestions: ChoiceQuestion[] = [
  {
    id: `${U.observationRecord}.q2`,
    unitId: U.observationRecord,
    prompt: "かんさつきろく{文|ぶん}に{書|か}くと よいことは どれ？",
    explanation:
      "{大|おお}きさ・いろ・かたちなど、{見|み}て わかった「ようす」を くわしく{書|か}くと よいきろく{文|ぶん}になるよ。",
    format: "choice",
    choices: ["{大|おお}きさや いろ", "ともだちの{名前|なまえ}", "すきな テレビ", "あしたの てんき"],
    answer: "{大|おお}きさや いろ",
  },
  {
    id: `${U.observationRecord}.q3`,
    unitId: U.observationRecord,
    prompt: "つぎのうち、ようすを くわしく あらわしている{文|ぶん}は どれ？",
    explanation:
      "「{赤|あか}くて{丸|まる}い みが{三|みっ}つ ついた」は、いろ・かたち・{数|かず}を くわしく あらわしているね。",
    format: "choice",
    choices: [
      "{赤|あか}くて{丸|まる}い みが{三|みっ}つ ついた。",
      "みが あった。",
      "{見|み}た。",
      "トマト。",
    ],
    answer: "{赤|あか}くて{丸|まる}い みが{三|みっ}つ ついた。",
  },
];

// ── 手紙を書く ──
const letterOrdering: OrderingQuestion = {
  id: `${U.letter}.q1`,
  unitId: U.letter,
  prompt: "{手紙|てがみ}を{書|か}くじゅんばんに ならべかえよう。",
  explanation:
    "{手紙|てがみ}は「あいさつ → つたえたいこと → むすび → {名前|なまえ}」のじゅんに{書|か}くと、きもちが よくつたわるよ。",
  format: "ordering",
  items: ["こんにちは。（あいさつ）", "うんどうかいに{来|き}てね。（つたえたいこと）", "またね。（むすび）", "たろうより（{名前|なまえ}）"],
  answerOrder: [0, 1, 2, 3],
};

const letterChoiceQuestions: ChoiceQuestion[] = [
  {
    id: `${U.letter}.q2`,
    unitId: U.letter,
    prompt: "{手紙|てがみ}の はじめに{書|か}くと よい ことばは どれ？",
    explanation: "{手紙|てがみ}の はじめは「こんにちは」などの あいさつから{書|か}きはじめると よいよ。",
    format: "choice",
    choices: ["こんにちは", "またね", "おわり", "{名前|なまえ}"],
    answer: "こんにちは",
  },
  {
    id: `${U.letter}.q3`,
    unitId: U.letter,
    prompt: "だれかに{手紙|てがみ}を{書|か}くとき、たいせつなことは どれ？",
    explanation:
      "あいてに あわせて、つたえたいきもちを ていねいに{書|か}くことが たいせつだよ。",
    format: "choice",
    choices: [
      "あいてに きもちが つたわるように{書|か}く",
      "{字|じ}を できるだけ{小|ちい}さく{書|か}く",
      "{名前|なまえ}を{書|か}かない",
      "おなじ ことばだけ{書|か}く",
    ],
    answer: "あいてに きもちが つたわるように{書|か}く",
  },
];

const kanjiWriteText: TextInputQuestion = {
  id: `${U.kanjiWrite}.q5`,
  unitId: U.kanjiWrite,
  prompt: "「あさ」を かんじで{書|か}くと？（こたえは 1{字|じ}）",
  explanation: "「あさ」は かんじで「朝」と{書|か}くよ。",
  format: "text-input",
  answer: "朝",
};

export const kokugoG2Contents: Record<string, UnitContent> = {
  [U.kanjiNumbers]: {
    unitId: U.kanjiNumbers,
    learn: {
      unitId: U.kanjiNumbers,
      steps: [
        {
          heading: "{大|おお}きな{数|かず}のかんじ",
          body: "100 は「{百|ひゃく}」、1000 は「{千|せん}」、10000 は「{万|まん}」と{書|か}くよ。おかいものの ねだんで よく{見|み}るね。",
          visual: { kind: "emoji", value: "💴 百・千・万", caption: "おかねの かんじ" },
        },
        {
          heading: "ようびの かんじ",
          body: "{月|げつ}・{火|か}・{水|すい}・{木|もく}・{金|きん}・{土|ど}・{日|にち} で「ようび」をあらわすよ。カレンダーで たしかめてみよう。",
          visual: { kind: "emoji", value: "📅", caption: "月火水木金土日" },
        },
        {
          heading: "とけいの ことば",
          body: "ひるより まえが「{午前|ごぜん}」、あとが「{午後|ごご}」だよ。とけいや よていひょうで つかうね。",
          visual: { kind: "emoji", value: "🕐", caption: "{午前|ごぜん}と{午後|ごご}" },
        },
      ],
    },
    test: {
      unitId: U.kanjiNumbers,
      questions: kanjiNumbersQuestions,
      questionCount: 4,
    },
  },

  [U.kanjiNature]: {
    unitId: U.kanjiNature,
    learn: {
      unitId: U.kanjiNature,
      steps: [
        {
          heading: "てんきの かんじ",
          body: "{晴|は}れ・{雨|あめ}・{雪|ゆき}・{風|かぜ} など、てんきを あらわす かんじが あるよ。てんきよほうで{見|み}つけてみよう。",
          visual: { kind: "emoji", value: "☀️🌧️❄️", caption: "{晴|は}れ・{雨|あめ}・{雪|ゆき}" },
        },
        {
          heading: "{水|みず}と{土地|とち}の かんじ",
          body: "{海|うみ}・{池|いけ}・{川|かわ}・{里|さと} など、しぜんの ばしょを あらわす かんじだよ。ちずで さがしてみよう。",
          visual: { kind: "emoji", value: "🌊🏞️", caption: "{海|うみ}・{池|いけ}・{川|かわ}" },
        },
        {
          heading: "そらの かんじ",
          body: "{星|ほし}・{雲|くも}・{月|つき} など、そらに あるものの かんじも おぼえよう。よるの そらを{思|おも}いうかべてね。",
          visual: { kind: "emoji", value: "⭐🌙☁️", caption: "{星|ほし}・{月|つき}・{雲|くも}" },
        },
      ],
    },
    test: {
      unitId: U.kanjiNature,
      questions: kanjiNatureQuestions,
      questionCount: 4,
    },
  },

  [U.kanjiLife]: {
    unitId: U.kanjiLife,
    learn: {
      unitId: U.kanjiLife,
      steps: [
        {
          heading: "{一日|いちにち}の かんじ",
          body: "{朝|あさ}・{昼|ひる}・{夜|よる} で{一日|いちにち}の じかんを あらわすよ。じぶんの{一日|いちにち}と くらべてみよう。",
          visual: { kind: "emoji", value: "🌅🌞🌙", caption: "{朝|あさ}・{昼|ひる}・{夜|よる}" },
        },
        {
          heading: "うごきの かんじ",
          body: "{食|た}べる・{買|か}う・{歩|ある}く・{走|はし}る など、うごきを あらわす かんじだよ。どんなときに つかうか かんがえてみよう。",
          visual: { kind: "emoji", value: "🍚🛒🚶", caption: "{食|た}べる・{買|か}う・{歩|ある}く" },
        },
      ],
    },
    test: {
      unitId: U.kanjiLife,
      questions: kanjiLifeQuestions,
      questionCount: 4,
    },
  },

  [U.kanjiWrite]: {
    unitId: U.kanjiWrite,
    learn: {
      unitId: U.kanjiWrite,
      steps: [
        {
          heading: "{書|か}きじゅんの きほん",
          body: "かんじは「うえから した」「ひだりから みぎ」のじゅんに{書|か}くよ。これを まもると きれいに{書|か}けるよ。",
          visual: { kind: "emoji", value: "⬆️➡️", caption: "うえ→した・ひだり→みぎ" },
        },
        {
          heading: "{画数|かくすう}",
          body: "せんの{数|かず}を「{画数|かくすう}」というよ。「一」は 1{画|かく}、「十」は 2{画|かく}、「川」は 3{画|かく}だね。",
          visual: { kind: "emoji", value: "✏️", caption: "せんの{数|かず}を かぞえる" },
        },
        {
          heading: "ていねいに{書|か}こう",
          body: "とめ・はね・はらい に{気|き}をつけて、ます{目|め}の まんなかに{大|おお}きく{書|か}こう。",
          visual: { kind: "emoji", value: "🔤", caption: "とめ・はね・はらい" },
        },
      ],
    },
    test: {
      unitId: U.kanjiWrite,
      questions: [...kanjiWriteQuestions, kanjiWriteText],
      questionCount: 5,
    },
  },

  [U.subjectPredicate]: {
    unitId: U.subjectPredicate,
    learn: {
      unitId: U.subjectPredicate,
      steps: [
        {
          heading: "しゅごって なに？",
          body: "「だれが・なにが」にあたる ことばを しゅご というよ。れい:「{犬|いぬ}が{走|はし}る。」の「{犬|いぬ}が」。",
          visual: { kind: "emoji", value: "🐕", caption: "{犬|いぬ}が ＝ しゅご" },
        },
        {
          heading: "じゅつごって なに？",
          body: "「どうする・どんなだ・なんだ」にあたる ことばを じゅつご というよ。れい:「{犬|いぬ}が{走|はし}る。」の「{走|はし}る」。",
          visual: { kind: "emoji", value: "🏃", caption: "{走|はし}る ＝ じゅつご" },
        },
        {
          heading: "ふたつで{文|ぶん}に なる",
          body: "しゅごと じゅつごが そろうと、いみの わかる{文|ぶん}になるよ。「だれが・どうする」をさがしてみよう。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.subjectPredicate,
      questions: subjectPredicateQuestions,
      questionCount: 4,
    },
  },

  [U.katakanaWords]: {
    unitId: U.katakanaWords,
    learn: {
      unitId: U.katakanaWords,
      steps: [
        {
          heading: "かたかなで{書|か}くことば",
          body: "{外国|がいこく}から{来|き}たことば（テレビ・パン・バス）は かたかなで{書|か}くよ。",
          visual: { kind: "emoji", value: "📺🍞🚌", caption: "テレビ・パン・バス" },
        },
        {
          heading: "{音|おと}や なきごえ",
          body: "「ワンワン」「ガタガタ」のような{音|おと}や なきごえも かたかなで{書|か}くことが おおいよ。",
          visual: { kind: "emoji", value: "🐶", caption: "ワンワン" },
        },
        {
          heading: "のばす{音|おと}は ー",
          body: "かたかなで のばす{音|おと}は ぼう「ー」で{書|か}くよ。れい:「ノート」「ケーキ」。",
          visual: { kind: "emoji", value: "🎂", caption: "ケーキ" },
        },
      ],
    },
    test: {
      unitId: U.katakanaWords,
      questions: katakanaWordsQuestions,
      questionCount: 4,
    },
  },

  [U.punctuation]: {
    unitId: U.punctuation,
    learn: {
      unitId: U.punctuation,
      steps: [
        {
          heading: "まる「。」",
          body: "{文|ぶん}の おわりには まる「。」を つけるよ。これで{一|ひと}つの{文|ぶん}の おわりが わかるね。",
          visual: { kind: "emoji", value: "🔵", caption: "。＝ぶんの おわり" },
        },
        {
          heading: "てん「、」",
          body: "{文|ぶん}の とちゅうの くぎりには てん「、」を つけると{読|よ}みやすくなるよ。",
          visual: { kind: "none" },
        },
        {
          heading: "かぎ「」",
          body: "{人|ひと}が はなした ことばは かぎかっこ「」で かこむよ。れい:「おはよう」と{言|い}った。",
          visual: { kind: "emoji", value: "💬", caption: "「はなしことば」" },
        },
      ],
    },
    test: {
      unitId: U.punctuation,
      questions: punctuationQuestions,
      questionCount: 4,
    },
  },

  [U.readStory]: {
    unitId: U.readStory,
    learn: {
      unitId: U.readStory,
      steps: [
        {
          heading: "だれが・どこで・どうした",
          body: "ものがたりは「だれが」「どこで」「どうした」を{読|よ}みとると たのしさが わかるよ。",
          visual: { kind: "emoji", value: "📖", caption: "おはなしを{読|よ}む" },
        },
        {
          heading: "きもちを かんがえる",
          body: "とうじょう{人|じん}ぶつの ことばや うごきから、その{人|ひと}の きもちを{思|おも}いうかべてみよう。",
          visual: { kind: "emoji", value: "🐰", caption: "どんな きもち？" },
        },
      ],
    },
    test: {
      unitId: U.readStory,
      questions: readStoryQuestions,
      questionCount: 4,
    },
  },

  [U.readExplanation]: {
    unitId: U.readExplanation,
    learn: {
      unitId: U.readExplanation,
      steps: [
        {
          heading: "なにに ついての{文|ぶん}かな",
          body: "せつめい{文|ぶん}は「なにに ついて」{書|か}いてあるかを さいしょに つかもう。",
          visual: { kind: "emoji", value: "🌼", caption: "たんぽぽの せつめい" },
        },
        {
          heading: "じゅんばんの ことば",
          body: "「まず・つぎに・さいごに」などの ことばを てがかりに、ものごとの じゅんばんを{読|よ}みとろう。",
          visual: { kind: "emoji", value: "1️⃣2️⃣3️⃣", caption: "まず→つぎに→さいごに" },
        },
      ],
    },
    test: {
      unitId: U.readExplanation,
      questions: readExplanationQuestions,
      questionCount: 4,
    },
  },

  [U.observationRecord]: {
    unitId: U.observationRecord,
    learn: {
      unitId: U.observationRecord,
      steps: [
        {
          heading: "かんさつきろく{文|ぶん}って？",
          body: "そだてている やさいや{虫|むし}を よく{見|み}て、「いつ・なにを・どうだったか」を{書|か}きのこす{文|ぶん}だよ。",
          visual: { kind: "emoji", value: "🍅🔍", caption: "よく{見|み}て{書|か}く" },
        },
        {
          heading: "ようすを くわしく",
          body: "{大|おお}きさ・いろ・かたち・{数|かず}を くわしく{書|か}くと、あとで{見|み}ても よくわかる きろくになるよ。",
          visual: { kind: "emoji", value: "📏", caption: "{大|おお}きさ・いろ・{数|かず}" },
        },
        {
          heading: "じゅんばんに{書|か}く",
          body: "「いつ → なにを → どうだった → おもったこと」の じゅんに{書|か}くと まとまるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.observationRecord,
      questions: [observationOrdering, ...observationChoiceQuestions],
      questionCount: 3,
    },
  },

  [U.letter]: {
    unitId: U.letter,
    learn: {
      unitId: U.letter,
      steps: [
        {
          heading: "{手紙|てがみ}の かたち",
          body: "{手紙|てがみ}は「あいさつ → つたえたいこと → むすび → {名前|なまえ}」のじゅんに{書|か}くよ。",
          visual: { kind: "emoji", value: "✉️", caption: "{手紙|てがみ}の じゅんばん" },
        },
        {
          heading: "きもちを つたえる",
          body: "あいてに あわせて、つたえたい きもちを ていねいに{書|か}こう。さいごに じぶんの{名前|なまえ}を{書|か}くよ。",
          visual: { kind: "emoji", value: "💌", caption: "きもちを つたえる" },
        },
      ],
    },
    test: {
      unitId: U.letter,
      questions: [letterOrdering, ...letterChoiceQuestions],
      questionCount: 3,
    },
  },
};
