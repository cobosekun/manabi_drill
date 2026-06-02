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
// 文言は基本ひらがな。漢字を出すのは「漢字学習」の意図的箇所のみ。
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
    title: "かずと ときの かんじ",
    order: 1,
    realWorldUse: "ねだんの「百えん」、カレンダーの「曜日」、とけいの「午前・午後」など、まいにち目にするかんじだよ。",
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
    title: "しぜんの かんじ",
    order: 2,
    realWorldUse: "てんきよほうの「晴れ・雨・雪」や、ちずの「海・池・里」を よむときにつかうよ。",
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
    title: "せいかつの かんじ",
    order: 3,
    realWorldUse: "「朝・昼・夜」や「食べる・買う・歩く」など、いちにちのくらしをあらわすかんじだよ。",
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
    title: "かんじの かきかた（ひつじゅん・画数）",
    order: 4,
    realWorldUse: "ただしいかきじゅんでかくと、字がきれいになって、はやく書けるようになるよ。",
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
    realWorldUse: "「だれが」「どうする」をはっきりさせると、ことばがあいてに正しくつたわるよ。",
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
    title: "かたかなで かく ことば",
    order: 6,
    realWorldUse: "「テレビ」「ノート」など、外国からきたことばや音をあらわすときに かたかなをつかうよ。",
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
    realWorldUse: "文のおわりに「。」、くぎりに「、」、はなしたことばに「」をつけると、文が読みやすくなるよ。",
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
    title: "ものがたりを よむ",
    order: 8,
    realWorldUse: "だれが・どこで・どうしたを読みとると、おはなしのたのしさが よくわかるよ。",
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
    title: "せつめい文を よむ",
    order: 9,
    realWorldUse: "「なにが・どんなじゅんばんで」を読みとると、ずかんや作りかたの文がわかるようになるよ。",
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
    title: "かんさつ記録文を かく",
    order: 10,
    realWorldUse: "そだてているやさいや虫を「いつ・なにを・どうだったか」じゅんばんに書いて、きろくにのこせるよ。",
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
    title: "てがみを かく",
    order: 11,
    realWorldUse: "おじいちゃんやおともだちに、きもちをつたえる手紙やはがきを書くときにつかうよ。",
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

// ── かずと ときの かんじ ──
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

// ── しぜんの かんじ ──
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
    explanation: "「星」は ほし と よむよ。よるの そらに ひかって見えるね。",
    format: "choice",
    choices: ["ほし", "つき", "ひ", "そら"],
    answer: "ほし",
  },
];

// ── せいかつの かんじ ──
const kanjiLifeQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiLife}.q1`,
    unitId: U.kanjiLife,
    prompt: "「朝」の よみかたは どれ？",
    explanation: "「朝」は あさ と よむよ。いちにちの はじまりの じかんだね。",
    format: "choice",
    choices: ["あさ", "ひる", "よる", "ばん"],
    answer: "あさ",
  },
  {
    id: `${U.kanjiLife}.q2`,
    unitId: U.kanjiLife,
    prompt: "「食べる」の よみかたは どれ？",
    explanation: "「食べる」は たべる と よむよ。ごはんを 口に入れることだね。",
    format: "choice",
    choices: ["たべる", "かべる", "しょくべる", "のべる"],
    answer: "たべる",
  },
  {
    id: `${U.kanjiLife}.q3`,
    unitId: U.kanjiLife,
    prompt: "「買う」の よみかたは どれ？",
    explanation: "「買う」は かう と よむよ。おみせで おかねを はらって 手に入れることだね。",
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

// ── かんじの かきかた（ひつじゅん・画数） ──
const kanjiWriteQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiWrite}.q1`,
    unitId: U.kanjiWrite,
    prompt: "かんじを かくとき、ふつう どのじゅんばんで かく？",
    explanation: "かんじは「うえから した」「ひだりから みぎ」のじゅんばんで かくのが きほんだよ。",
    format: "choice",
    choices: ["うえから したへ", "したから うえへ", "みぎから ひだりへ", "まんなかから そとへ"],
    answer: "うえから したへ",
  },
  {
    id: `${U.kanjiWrite}.q2`,
    unitId: U.kanjiWrite,
    prompt: "「画数（かくすう）」とは なにの ことかな？",
    explanation: "画数は、かんじを かくときの せんの かずのことだよ。たとえば「二」は 2画 だね。",
    format: "choice",
    choices: ["せんの かず", "よみかたの かず", "いみの かず", "字の おおきさ"],
    answer: "せんの かず",
  },
  {
    id: `${U.kanjiWrite}.q3`,
    unitId: U.kanjiWrite,
    prompt: "「十」の 画数は なん画？",
    explanation: "「十」は よこの せんと たての せんで、ぜんぶで 2画 だよ。",
    format: "choice",
    choices: ["2画", "1画", "3画", "4画"],
    answer: "2画",
  },
  {
    id: `${U.kanjiWrite}.q4`,
    unitId: U.kanjiWrite,
    prompt: "「川」を かくとき、いちばん さいしょに かく せんは どれ？",
    explanation: "「川」は ひだりの たてせんから かきはじめるよ。ひだりから みぎへ じゅんばんに かくよ。",
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
    prompt: "「いぬが はしる。」の しゅご（だれが・なにが）は どれ？",
    explanation: "「だれが・なにが」にあたる ことばが しゅごだよ。ここでは「いぬが」が しゅごだね。",
    format: "choice",
    choices: ["いぬが", "はしる", "が", "。"],
    answer: "いぬが",
  },
  {
    id: `${U.subjectPredicate}.q2`,
    unitId: U.subjectPredicate,
    prompt: "「いぬが はしる。」の じゅつご（どうする・どんなだ）は どれ？",
    explanation: "「どうする・どんなだ」にあたる ことばが じゅつごだよ。ここでは「はしる」が じゅつごだね。",
    format: "choice",
    choices: ["はしる", "いぬが", "が", "いぬ"],
    answer: "はしる",
  },
  {
    id: `${U.subjectPredicate}.q3`,
    unitId: U.subjectPredicate,
    prompt: "「おはなが きれいだ。」の しゅごは どれ？",
    explanation: "「なにが」にあたる「おはなが」が しゅごだよ。「きれいだ」は じゅつごだね。",
    format: "choice",
    choices: ["おはなが", "きれいだ", "きれい", "はな"],
    answer: "おはなが",
  },
  {
    id: `${U.subjectPredicate}.q4`,
    unitId: U.subjectPredicate,
    prompt: "つぎの 文で じゅつごは どれ？「ぼくは ほんを よむ。」",
    explanation: "「どうする」にあたる「よむ」が じゅつごだよ。しゅごは「ぼくは」だね。",
    format: "choice",
    choices: ["よむ", "ぼくは", "ほんを", "ほん"],
    answer: "よむ",
  },
];

// ── かたかなで かく ことば ──
const katakanaWordsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.katakanaWords}.q1`,
    unitId: U.katakanaWords,
    prompt: "かたかなで かく ことばは どれ？",
    explanation: "「テレビ」は 外国から きた ことば（外来語）なので かたかなで かくよ。",
    format: "choice",
    choices: ["テレビ", "いぬ", "やま", "はな"],
    answer: "テレビ",
  },
  {
    id: `${U.katakanaWords}.q2`,
    unitId: U.katakanaWords,
    prompt: "「わんわん」のような どうぶつの なきごえは、ふつう どちらで かく？",
    explanation: "ものの音や なきごえ（ぎおんご）は、かたかなで かくことが おおいよ。れい:「ワンワン」。",
    format: "choice",
    choices: ["かたかな", "ひらがな", "かんじ", "ローマ字"],
    answer: "かたかな",
  },
  {
    id: `${U.katakanaWords}.q3`,
    unitId: U.katakanaWords,
    prompt: "「ノート」を ただしく かいているのは どれ？",
    explanation: "のばす音（ー）は かたかなでは ぼう「ー」で かくよ。「ノート」が ただしいね。",
    format: "choice",
    choices: ["ノート", "ノオト", "のうと", "ノ−と"],
    answer: "ノート",
  },
  {
    id: `${U.katakanaWords}.q4`,
    unitId: U.katakanaWords,
    prompt: "つぎのうち、かたかなで かかない ことばは どれ？",
    explanation: "「さくら」は 日本に むかしからある ことばなので ひらがなや かんじで かくよ。ほかは 外来語だね。",
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
    prompt: "文の おわりに つける しるしは どれ？",
    explanation: "文の おわりには まる「。」（くてん）を つけるよ。",
    format: "choice",
    choices: ["。", "、", "「", "？のみ"],
    answer: "。",
  },
  {
    id: `${U.punctuation}.q2`,
    unitId: U.punctuation,
    prompt: "文の とちゅうの くぎりに つける しるしは どれ？",
    explanation: "ことばの くぎりには てん「、」（とうてん）を つけて 読みやすくするよ。",
    format: "choice",
    choices: ["、", "。", "」", "・"],
    answer: "、",
  },
  {
    id: `${U.punctuation}.q3`,
    unitId: U.punctuation,
    prompt: "はなした ことばを かこむ しるしは どれ？",
    explanation: "人が はなした ことばは かぎかっこ「」で かこむよ。れい:「おはよう」と いった。",
    format: "choice",
    choices: ["「 」", "（ ）", "。 。", "ーー"],
    answer: "「 」",
  },
  {
    id: `${U.punctuation}.q4`,
    unitId: U.punctuation,
    prompt: "ただしく しるしを つけているのは どれ？",
    explanation: "文の おわりに「。」が ついている「きょうは はれです。」が ただしいよ。",
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

// ── ものがたりを よむ ──
// 短い物語文を prompt 内に提示し、内容を読みとる。
const readStoryQuestions: ChoiceQuestion[] = [
  {
    id: `${U.readStory}.q1`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】あさ、うさぎの ぴょんは もりへ でかけました。「きょうは どんぐりを ひろうぞ。」\n──ぴょんは どこへ でかけた？",
    explanation: "文の中に「もりへ でかけました」と あるね。だから こたえは「もり」だよ。",
    format: "choice",
    choices: ["もり", "うみ", "やま", "がっこう"],
    answer: "もり",
  },
  {
    id: `${U.readStory}.q2`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】あさ、うさぎの ぴょんは もりへ でかけました。「きょうは どんぐりを ひろうぞ。」\n──ぴょんは なにを ひろうと いった？",
    explanation: "かぎ「」の中で「どんぐりを ひろうぞ」と いっているね。こたえは「どんぐり」だよ。",
    format: "choice",
    choices: ["どんぐり", "きのこ", "はっぱ", "いし"],
    answer: "どんぐり",
  },
  {
    id: `${U.readStory}.q3`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】ぴょんが あるいていると、こりすが ないていました。「あしを けがしたの。」\n──こりすは どうして ないていた？",
    explanation: "こりすは「あしを けがした」と いっているね。だから「あしを けがしたから」が こたえだよ。",
    format: "choice",
    choices: ["あしを けがしたから", "おなかが すいたから", "まいごに なったから", "ねむいから"],
    answer: "あしを けがしたから",
  },
  {
    id: `${U.readStory}.q4`,
    unitId: U.readStory,
    prompt:
      "【ものがたり】ぴょんは こりすに「だいじょうぶ?」と やさしく こえを かけました。\n──このとき ぴょんは どんな きもち？",
    explanation: "やさしく こえを かけているね。こりすを「しんぱいする」きもちだと わかるよ。",
    format: "choice",
    choices: ["しんぱいする きもち", "おこった きもち", "うれしい きもち", "こわい きもち"],
    answer: "しんぱいする きもち",
  },
];

// ── せつめい文を よむ ──
const readExplanationQuestions: ChoiceQuestion[] = [
  {
    id: `${U.readExplanation}.q1`,
    unitId: U.readExplanation,
    prompt:
      "【せつめい文】たんぽぽは、はるに きいろい はなを さかせます。はなが おわると、わたげに かわります。\n──たんぽぽは どんな いろの はなを さかせる？",
    explanation: "「きいろい はなを さかせます」と 書いてあるね。こたえは「きいろ」だよ。",
    format: "choice",
    choices: ["きいろ", "あか", "しろ", "あお"],
    answer: "きいろ",
  },
  {
    id: `${U.readExplanation}.q2`,
    unitId: U.readExplanation,
    prompt:
      "【せつめい文】たんぽぽは、はるに きいろい はなを さかせます。はなが おわると、わたげに かわります。\n──はなが おわると なにに かわる？",
    explanation: "「わたげに かわります」と あるね。こたえは「わたげ」だよ。",
    format: "choice",
    choices: ["わたげ", "み", "は", "ねっこ"],
    answer: "わたげ",
  },
  {
    id: `${U.readExplanation}.q3`,
    unitId: U.readExplanation,
    prompt:
      "【せつめい文】まず、たねを まきます。つぎに、みずを やります。さいごに、めが でます。\n──いちばん さいしょに することは どれ？",
    explanation: "「まず」と あるところに ちゅうもく。さいしょは「たねを まく」だよ。じゅんばんを あらわす ことばに 気をつけよう。",
    format: "choice",
    choices: ["たねを まく", "みずを やる", "めが でる", "はなが さく"],
    answer: "たねを まく",
  },
  {
    id: `${U.readExplanation}.q4`,
    unitId: U.readExplanation,
    prompt: "せつめい文を よむとき、たいせつな よみかたは どれ？",
    explanation:
      "せつめい文は「なにが・どんなじゅんばんか」を 読みとるのが たいせつ。「まず・つぎに・さいごに」などの ことばを てがかりにするよ。",
    format: "choice",
    choices: [
      "じゅんばんの ことばに 気をつける",
      "音だけ きく",
      "えだけ 見る",
      "さいごの 字だけ よむ",
    ],
    answer: "じゅんばんの ことばに 気をつける",
  },
];

// ── かんさつ記録文を かく ──
// じゅんばん（ordering）と 書き方の知識（choice）を ミックス。
const observationOrdering: OrderingQuestion = {
  id: `${U.observationRecord}.q1`,
  unitId: U.observationRecord,
  prompt: "かんさつ記録文を かくじゅんばんに ならべかえよう。",
  explanation:
    "かんさつ記録文は「いつ → なにを → どうだったか → おもったこと」のじゅんに 書くと わかりやすいよ。",
  format: "ordering",
  items: ["五月十日（いつ）", "ミニトマトを 見た（なにを）", "みが あかくなった（どうだった）", "うれしかった（おもったこと）"],
  answerOrder: [0, 1, 2, 3],
};

const observationChoiceQuestions: ChoiceQuestion[] = [
  {
    id: `${U.observationRecord}.q2`,
    unitId: U.observationRecord,
    prompt: "かんさつ記録文に かくと よいことは どれ？",
    explanation:
      "大きさ・いろ・かたちなど、見て わかった「ようす」を くわしく かくと よい記録文になるよ。",
    format: "choice",
    choices: ["大きさや いろ", "ともだちの なまえ", "すきな テレビ", "あしたの てんき"],
    answer: "大きさや いろ",
  },
  {
    id: `${U.observationRecord}.q3`,
    unitId: U.observationRecord,
    prompt: "つぎのうち、ようすを くわしく あらわしている 文は どれ？",
    explanation:
      "「赤くて まるい みが 三つ ついた」は、いろ・かたち・かずを くわしく あらわしているね。",
    format: "choice",
    choices: [
      "赤くて まるい みが 三つ ついた。",
      "みが あった。",
      "見た。",
      "トマト。",
    ],
    answer: "赤くて まるい みが 三つ ついた。",
  },
];

// ── てがみを かく ──
const letterOrdering: OrderingQuestion = {
  id: `${U.letter}.q1`,
  unitId: U.letter,
  prompt: "てがみを かくじゅんばんに ならべかえよう。",
  explanation:
    "手紙は「あいさつ → つたえたいこと → むすび → なまえ」のじゅんに 書くと、きもちが よくつたわるよ。",
  format: "ordering",
  items: ["こんにちは。（あいさつ）", "うんどうかいに きてね。（つたえたいこと）", "またね。（むすび）", "たろうより（なまえ）"],
  answerOrder: [0, 1, 2, 3],
};

const letterChoiceQuestions: ChoiceQuestion[] = [
  {
    id: `${U.letter}.q2`,
    unitId: U.letter,
    prompt: "手紙の はじめに かくと よい ことばは どれ？",
    explanation: "手紙の はじめは「こんにちは」などの あいさつから 書きはじめると よいよ。",
    format: "choice",
    choices: ["こんにちは", "またね", "おわり", "なまえ"],
    answer: "こんにちは",
  },
  {
    id: `${U.letter}.q3`,
    unitId: U.letter,
    prompt: "だれかに 手紙を かくとき、たいせつなことは どれ？",
    explanation:
      "あいてに あわせて、つたえたいきもちを ていねいに 書くことが たいせつだよ。",
    format: "choice",
    choices: [
      "あいてに きもちが つたわるように かく",
      "字を できるだけ 小さくかく",
      "なまえを 書かない",
      "おなじ ことばだけ かく",
    ],
    answer: "あいてに きもちが つたわるように かく",
  },
];

const kanjiWriteText: TextInputQuestion = {
  id: `${U.kanjiWrite}.q5`,
  unitId: U.kanjiWrite,
  prompt: "「あさ」を かんじで かくと？（こたえは 1字）",
  explanation: "「あさ」は かんじで「朝」と かくよ。",
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
          heading: "おおきな かずの かんじ",
          body: "100 は「百」、1000 は「千」、10000 は「万」と かくよ。おかいものの ねだんで よく見るね。",
          visual: { kind: "emoji", value: "💴 百・千・万", caption: "おかねの かんじ" },
        },
        {
          heading: "ようびの かんじ",
          body: "月・火・水・木・金・土・日 で「ようび」をあらわすよ。カレンダーで たしかめてみよう。",
          visual: { kind: "emoji", value: "📅", caption: "月火水木金土日" },
        },
        {
          heading: "とけいの ことば",
          body: "ひるより まえが「午前」、あとが「午後」だよ。とけいや よていひょうで つかうね。",
          visual: { kind: "emoji", value: "🕐", caption: "午前と午後" },
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
          body: "晴れ・雨・雪・風 など、てんきを あらわす かんじが あるよ。てんきよほうで 見つけてみよう。",
          visual: { kind: "emoji", value: "☀️🌧️❄️", caption: "晴れ・雨・雪" },
        },
        {
          heading: "みずと 土地の かんじ",
          body: "海・池・川・里 など、しぜんの ばしょを あらわす かんじだよ。ちずで さがしてみよう。",
          visual: { kind: "emoji", value: "🌊🏞️", caption: "海・池・川" },
        },
        {
          heading: "そらの かんじ",
          body: "星・雲・月 など、そらに あるものの かんじも おぼえよう。よるの そらを 思いうかべてね。",
          visual: { kind: "emoji", value: "⭐🌙☁️", caption: "星・月・雲" },
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
          heading: "いちにちの かんじ",
          body: "朝・昼・夜 で いちにちの じかんを あらわすよ。じぶんの 一日と くらべてみよう。",
          visual: { kind: "emoji", value: "🌅🌞🌙", caption: "朝・昼・夜" },
        },
        {
          heading: "うごきの かんじ",
          body: "食べる・買う・歩く・走る など、うごきを あらわす かんじだよ。どんなときに つかうか かんがえてみよう。",
          visual: { kind: "emoji", value: "🍚🛒🚶", caption: "食べる・買う・歩く" },
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
          heading: "かきじゅんの きほん",
          body: "かんじは「うえから した」「ひだりから みぎ」のじゅんに かくよ。これを まもると きれいに 書けるよ。",
          visual: { kind: "emoji", value: "⬆️➡️", caption: "うえ→した・ひだり→みぎ" },
        },
        {
          heading: "画数（かくすう）",
          body: "せんの かずを「画数」というよ。「一」は 1画、「十」は 2画、「川」は 3画 だね。",
          visual: { kind: "emoji", value: "✏️", caption: "せんの かずを かぞえる" },
        },
        {
          heading: "ていねいに かこう",
          body: "とめ・はね・はらい に 気をつけて、ます目の まんなかに 大きく かこう。",
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
          body: "「だれが・なにが」にあたる ことばを しゅご というよ。れい:「いぬが はしる。」の「いぬが」。",
          visual: { kind: "emoji", value: "🐕", caption: "いぬが ＝ しゅご" },
        },
        {
          heading: "じゅつごって なに？",
          body: "「どうする・どんなだ・なんだ」にあたる ことばを じゅつご というよ。れい:「いぬが はしる。」の「はしる」。",
          visual: { kind: "emoji", value: "🏃", caption: "はしる ＝ じゅつご" },
        },
        {
          heading: "ふたつで 文に なる",
          body: "しゅごと じゅつごが そろうと、いみの わかる 文になるよ。「だれが・どうする」をさがしてみよう。",
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
          heading: "かたかなで かく ことば",
          body: "外国から きた ことば（テレビ・パン・バス）は かたかなで かくよ。",
          visual: { kind: "emoji", value: "📺🍞🚌", caption: "テレビ・パン・バス" },
        },
        {
          heading: "音や なきごえ",
          body: "「ワンワン」「ガタガタ」のような 音や なきごえも かたかなで かくことが おおいよ。",
          visual: { kind: "emoji", value: "🐶", caption: "ワンワン" },
        },
        {
          heading: "のばす音は ー",
          body: "かたかなで のばす音は ぼう「ー」で かくよ。れい:「ノート」「ケーキ」。",
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
          body: "文の おわりには まる「。」を つけるよ。これで 一つの 文の おわりが わかるね。",
          visual: { kind: "emoji", value: "🔵", caption: "。＝ぶんの おわり" },
        },
        {
          heading: "てん「、」",
          body: "文の とちゅうの くぎりには てん「、」を つけると 読みやすくなるよ。",
          visual: { kind: "none" },
        },
        {
          heading: "かぎ「」",
          body: "人が はなした ことばは かぎかっこ「」で かこむよ。れい:「おはよう」と いった。",
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
          body: "ものがたりは「だれが」「どこで」「どうした」を 読みとると たのしさが わかるよ。",
          visual: { kind: "emoji", value: "📖", caption: "おはなしを よむ" },
        },
        {
          heading: "きもちを かんがえる",
          body: "とうじょう人ぶつの ことばや うごきから、その人の きもちを 思いうかべてみよう。",
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
          heading: "なにに ついての 文かな",
          body: "せつめい文は「なにに ついて」書いてあるかを さいしょに つかもう。",
          visual: { kind: "emoji", value: "🌼", caption: "たんぽぽの せつめい" },
        },
        {
          heading: "じゅんばんの ことば",
          body: "「まず・つぎに・さいごに」などの ことばを てがかりに、ものごとの じゅんばんを 読みとろう。",
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
          heading: "かんさつ記録文って？",
          body: "そだてている やさいや 虫を よく見て、「いつ・なにを・どうだったか」を 書きのこす 文だよ。",
          visual: { kind: "emoji", value: "🍅🔍", caption: "よく 見て かく" },
        },
        {
          heading: "ようすを くわしく",
          body: "大きさ・いろ・かたち・かずを くわしく 書くと、あとで 見ても よくわかる 記録になるよ。",
          visual: { kind: "emoji", value: "📏", caption: "大きさ・いろ・かず" },
        },
        {
          heading: "じゅんばんに かく",
          body: "「いつ → なにを → どうだった → おもったこと」の じゅんに 書くと まとまるよ。",
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
          heading: "手紙の かたち",
          body: "手紙は「あいさつ → つたえたいこと → むすび → なまえ」のじゅんに 書くよ。",
          visual: { kind: "emoji", value: "✉️", caption: "手紙の じゅんばん" },
        },
        {
          heading: "きもちを つたえる",
          body: "あいてに あわせて、つたえたい きもちを ていねいに 書こう。さいごに じぶんの なまえを 書くよ。",
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
