// ══════════════════════════════════════════
// カリキュラム: 国語（こくご）小1
// 基準テンプレ src/data/curriculum/sansuu/g1.ts と同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 依存(prerequisites/leadsTo)は kokugo.g1 内で自己完結させ、単独でも整合検査を通す。
// 表記: ひらがな主体。ただし「小1配当漢字（80字）」に含まれる漢字だけ {漢字|よみ} ルビ記法で表記する。
//      配当外の漢字は使わない（ひらがなのまま）。RubyText がルビを描画する。
//      漢字学習単元(かんじ80字)の出題対象漢字は読みを隠すため素漢字のまま（仕様の例外）。
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

// ── 領域（学習指導要領 小1国語の領域・内容に対応） ──────────

export const kokugoG1Domains: Domain[] = [
  {
    id: "kokugo.letters",
    subjectId: "kokugo",
    name: "{文字|もじ}（ひらがな・カタカナ・{漢字|かんじ}）",
    formalName: "文字・表記",
  },
  {
    id: "kokugo.vocabulary",
    subjectId: "kokugo",
    name: "{言葉|ことば}",
    formalName: "言葉・語彙",
  },
  {
    id: "kokugo.writing",
    subjectId: "kokugo",
    name: "{書|か}くこと",
    formalName: "書くこと",
  },
  {
    id: "kokugo.reading",
    subjectId: "kokugo",
    name: "{読|よ}むこと",
    formalName: "読むこと",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（自己完結）:
//
//   hiragana ─┬─▶ dakuten-youon ─▶ particles ──┐
//             ├─▶ katakana ─▶ kanji-80 ─────────┼─▶ read-story
//             └─▶ word-groups ─▶ make-sentence ─┘
//
const U = {
  hiragana: "kokugo.g1.hiragana",
  dakutenYouon: "kokugo.g1.dakuten-youon",
  katakana: "kokugo.g1.katakana",
  kanji80: "kokugo.g1.kanji-80",
  wordGroups: "kokugo.g1.word-groups",
  particles: "kokugo.g1.particles",
  makeSentence: "kokugo.g1.make-sentence",
  readStory: "kokugo.g1.read-story",
} as const;

export const kokugoG1Units: Unit[] = [
  {
    id: U.hiragana,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.letters",
    title: "ひらがな",
    order: 1,
    realWorldUse: "{名前|なまえ}を {書|か}いたり、{手紙|てがみ}を {読|よ}んだり、{毎日|まいにち} {使|つか}う {文字|もじ}だよ。",
    leadsTo: [U.dakutenYouon, U.katakana, U.wordGroups],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.dakutenYouon,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.letters",
    title: "だくてん・{小|ちい}さい{字|じ}",
    order: 2,
    realWorldUse: "「がっこう」や「でんしゃ」のように、てんてんや {小|ちい}さい{字|じ}を {読|よ}む{時|とき}に {使|つか}うよ。",
    leadsTo: [U.particles],
    prerequisites: [U.hiragana],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.katakana,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.letters",
    title: "カタカナ",
    order: 3,
    realWorldUse: "「テレビ」や「ジュース」など、{外|そと}の {国|くに}の {言葉|ことば}を {読|よ}む{時|とき}に {使|つか}うよ。",
    leadsTo: [U.kanji80],
    prerequisites: [U.hiragana],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kanji80,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.letters",
    title: "{漢字|かんじ}80{字|じ}",
    order: 4,
    realWorldUse: "「山」や「川」など、{本|ほん}や {看板|かんばん}に {出|で}てくる {漢字|かんじ}を {読|よ}めるように なるよ。",
    leadsTo: [U.readStory],
    prerequisites: [U.katakana],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.wordGroups,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.vocabulary",
    title: "{仲間|なかま}の{言葉|ことば}",
    order: 5,
    realWorldUse: "{物|もの}を {仲間|なかま}わけして {考|かんが}えると、{言葉|ことば}を たくさん {覚|おぼ}えられるよ。",
    leadsTo: [U.makeSentence],
    prerequisites: [U.hiragana],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.particles,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.writing",
    title: "じょし「は・を・へ」",
    order: 6,
    realWorldUse: "「{本|ほん}を {読|よ}む」「{学校|がっこう}へ {行|い}く」のように、{正|ただ}しい {文|ぶん}を {書|か}く{時|とき}に {使|つか}うよ。",
    leadsTo: [U.makeSentence],
    prerequisites: [U.dakutenYouon],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.makeSentence,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.writing",
    title: "{文|ぶん}を {作|つく}る",
    order: 7,
    realWorldUse: "{日記|にっき}や お{手紙|てがみ}で、{自分|じぶん}の {気持|きも}ちを {文|ぶん}で {書|か}けるように なるよ。",
    leadsTo: [U.readStory],
    prerequisites: [U.wordGroups, U.particles],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.readStory,
    subjectId: "kokugo",
    grade: 1,
    domainId: "kokugo.reading",
    title: "お{話|はなし}を {読|よ}む",
    order: 8,
    realWorldUse: "{絵本|えほん}や {教科書|きょうかしょ}の お{話|はなし}を {読|よ}んで、{内容|ないよう}が {分|わ}かるように なるよ。",
    leadsTo: [],
    prerequisites: [U.kanji80, U.makeSentence],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 問題（全問 explanation 必須・4択）────────────────────
// 注: 選択肢・answer は学習対象（かな/数字/記号）そのものなので原文のまま。
//     プロンプト/解説の地の文のうち「小1配当漢字」だけをルビ化（配当外漢字は使わない）。

const hiraganaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.hiragana}.q-1`,
    unitId: U.hiragana,
    prompt: "「いぬ」の {最初|さいしょ}の {文字|もじ}は どれ？",
    explanation: "「いぬ」は「い・ぬ」。{最初|さいしょ}は「い」だよ。",
    format: "choice",
    choices: ["い", "え", "う", "お"],
    answer: "い",
  },
  {
    id: `${U.hiragana}.q-2`,
    unitId: U.hiragana,
    prompt: "「ねこ」を {正|ただ}しく {書|か}いた ものは どれ？",
    explanation: "「ね」と「こ」で「ねこ」。「ぬ」や「れ」と {間違|まちが}えやすいよ。",
    format: "choice",
    choices: ["ねこ", "ぬこ", "れこ", "わこ"],
    answer: "ねこ",
  },
  {
    id: `${U.hiragana}.q-3`,
    unitId: U.hiragana,
    prompt: "「さかな」は {何|なん}{文字|もじ}？",
    explanation: "「さ・か・な」で 3{文字|もじ}だよ。",
    format: "choice",
    choices: ["3もじ", "2もじ", "4もじ", "5もじ"],
    answer: "3もじ",
  },
  {
    id: `${U.hiragana}.q-4`,
    unitId: U.hiragana,
    prompt: "「あ」の {次|つぎ}の {文字|もじ}は どれ？",
    explanation: "あいうえお の {順番|じゅんばん}。「あ」の {次|つぎ}は「い」だよ。",
    format: "choice",
    choices: ["い", "う", "え", "お"],
    answer: "い",
  },
  {
    id: `${U.hiragana}.q-5`,
    unitId: U.hiragana,
    prompt: "「て」と {似|に}ている {文字|もじ}は どれ？",
    explanation: "「て」と「で」は てんてん(゛)が {付|つ}くか {付|つ}かないかの {違|ちが}いだよ。",
    format: "choice",
    choices: ["で", "き", "ち", "そ"],
    answer: "で",
  },
];

const dakutenYouonQuestions: ChoiceQuestion[] = [
  {
    id: `${U.dakutenYouon}.q-1`,
    unitId: U.dakutenYouon,
    prompt: "「か」に てんてん(゛)を つけると どれ？",
    explanation: "「か」+ ゛ =「が」だよ。",
    format: "choice",
    choices: ["が", "ぱ", "ば", "だ"],
    answer: "が",
  },
  {
    id: `${U.dakutenYouon}.q-2`,
    unitId: U.dakutenYouon,
    prompt: "「は」に まる(゜)を つけると どれ？",
    explanation: "「は」+ ゜ =「ぱ」。てんてんだと「ば」だよ。",
    format: "choice",
    choices: ["ぱ", "ば", "は", "ま"],
    answer: "ぱ",
  },
  {
    id: `${U.dakutenYouon}.q-3`,
    unitId: U.dakutenYouon,
    prompt: "「がっこう」の {小|ちい}さい {文字|もじ}は どれ？",
    explanation: "{小|ちい}さい「っ」。すこし とまって よむよ。",
    format: "choice",
    choices: ["っ", "つ", "く", "こ"],
    answer: "っ",
  },
  {
    id: `${U.dakutenYouon}.q-4`,
    unitId: U.dakutenYouon,
    prompt: "「でんしゃ」を {正|ただ}しく かいた ものは？",
    explanation: "「しゃ」は {小|ちい}さい「ゃ」。「しや」では ないよ。",
    format: "choice",
    choices: ["でんしゃ", "でんしや", "てんしゃ", "でんさ"],
    answer: "でんしゃ",
  },
  {
    id: `${U.dakutenYouon}.q-5`,
    unitId: U.dakutenYouon,
    prompt: "{小|ちい}さい「ゃ」を つかう ことばは どれ？",
    explanation: "「きゃべつ」は {小|ちい}さい「ゃ」を まえと くっつけて よむよ。",
    format: "choice",
    choices: ["きゃべつ", "きやべつ", "かべつ", "きゆべつ"],
    answer: "きゃべつ",
  },
];

const katakanaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.katakana}.q-1`,
    unitId: U.katakana,
    prompt: "「テレビ」を カタカナで {正|ただ}しく かいた ものは？",
    explanation: "「テ・レ・ビ」。「ビ」は てんてんつき だよ。",
    format: "choice",
    choices: ["テレビ", "テレヒ", "テルビ", "テレピ"],
    answer: "テレビ",
  },
  {
    id: `${U.katakana}.q-2`,
    unitId: U.katakana,
    prompt: "つぎの うち カタカナは どれ？",
    explanation: "「ア」が カタカナ。「あ」は ひらがな だよ。",
    format: "choice",
    choices: ["ア", "あ", "お", "を"],
    answer: "ア",
  },
  {
    id: `${U.katakana}.q-3`,
    unitId: U.katakana,
    prompt: "「バナナ」の さいしょの {文字|もじ}は？",
    explanation: "「バ」は「ハ」に てんてん(゛)を つけた {文字|もじ}。",
    format: "choice",
    choices: ["バ", "パ", "ハ", "ナ"],
    answer: "バ",
  },
  {
    id: `${U.katakana}.q-4`,
    unitId: U.katakana,
    prompt: "のばす {音|おと}に つかう {文字|もじ}は どれ？",
    explanation: "「ー」は のばす {音|おと}。「ケーキ」のように つかうよ。",
    format: "choice",
    choices: ["ー", "＝", "。", "、"],
    answer: "ー",
  },
  {
    id: `${U.katakana}.q-5`,
    unitId: U.katakana,
    prompt: "ねこの なきごえを カタカナで かくと？",
    explanation: "なきごえは カタカナで かくよ。ねこは「ニャー」。",
    format: "choice",
    choices: ["ニャー", "ねこ", "ワン", "モー"],
    answer: "ニャー",
  },
];

// かんじ80字: 出題対象の漢字（山/川/火/三/木 など）は読みを隠すため素漢字のまま（仕様の例外）。
const kanji80Questions: ChoiceQuestion[] = [
  {
    id: `${U.kanji80}.q-1`,
    unitId: U.kanji80,
    prompt: "「山」の よみかたは どれ？",
    explanation: "「山」は「やま」。たかい やまの かたちから できた かんじ。",
    format: "choice",
    choices: ["やま", "かわ", "た", "いし"],
    answer: "やま",
  },
  {
    id: `${U.kanji80}.q-2`,
    unitId: U.kanji80,
    prompt: "「川」の よみかたは どれ？",
    explanation: "「川」は「かわ」。{水|みず}が ながれる かたちだよ。",
    format: "choice",
    choices: ["かわ", "やま", "き", "ひ"],
    answer: "かわ",
  },
  {
    id: `${U.kanji80}.q-3`,
    unitId: U.kanji80,
    prompt: "「火」の よみかたは どれ？",
    explanation: "「火」は「ひ」。もえる ひの ことだよ。",
    format: "choice",
    choices: ["ひ", "みず", "き", "つち"],
    answer: "ひ",
  },
  {
    id: `${U.kanji80}.q-4`,
    unitId: U.kanji80,
    prompt: "「三」は いくつ？",
    explanation: "「三」は「さん」= 3。よこぼうが 3{本|ぼん}だよ。",
    format: "choice",
    choices: ["3", "1", "2", "5"],
    answer: "3",
  },
  {
    id: `${U.kanji80}.q-5`,
    unitId: U.kanji80,
    prompt: "「木」の よみかたは どれ？",
    explanation: "「木」は「き」。きの かたちから できた かんじ。",
    format: "choice",
    choices: ["き", "て", "め", "くち"],
    answer: "き",
  },
];

const wordGroupsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.wordGroups}.q-1`,
    unitId: U.wordGroups,
    prompt: "つぎの うち どうぶつは どれ？",
    explanation: "うさぎは どうぶつ。りんごは くだもの だよ。",
    format: "choice",
    choices: ["うさぎ", "りんご", "あか", "つくえ"],
    answer: "うさぎ",
  },
  {
    id: `${U.wordGroups}.q-2`,
    unitId: U.wordGroups,
    prompt: "「あか・あお・きいろ」は なんの なかま？",
    explanation: "ぜんぶ いろの なまえ だね。",
    format: "choice",
    choices: ["いろ", "たべもの", "どうぶつ", "のりもの"],
    answer: "いろ",
  },
  {
    id: `${U.wordGroups}.q-3`,
    unitId: U.wordGroups,
    prompt: "くだものの なかまは どれ？",
    explanation: "みかんは くだもの。いぬは どうぶつ だよ。",
    format: "choice",
    choices: ["みかん", "いぬ", "くるま", "えんぴつ"],
    answer: "みかん",
  },
  {
    id: `${U.wordGroups}.q-4`,
    unitId: U.wordGroups,
    prompt: "「でんしゃ・くるま・ひこうき」は なんの なかま？",
    explanation: "ぜんぶ のって すすむ のりもの だよ。",
    format: "choice",
    choices: ["のりもの", "どうぶつ", "いろ", "くだもの"],
    answer: "のりもの",
  },
  {
    id: `${U.wordGroups}.q-5`,
    unitId: U.wordGroups,
    prompt: "やさいの なかまは どれ？",
    explanation: "にんじんは やさい。ねこは どうぶつ だよ。",
    format: "choice",
    choices: ["にんじん", "ねこ", "あお", "つき"],
    answer: "にんじん",
  },
];

const particlesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.particles}.q-1`,
    unitId: U.particles,
    prompt: "「わたし◯ がくせいです」。◯に {入|はい}る {文字|もじ}は？",
    explanation: "{文|ぶん}の あいだの「は」。よみは「わ」だけど かくのは「は」だよ。",
    format: "choice",
    choices: ["は", "わ", "を", "へ"],
    answer: "は",
  },
  {
    id: `${U.particles}.q-2`,
    unitId: U.particles,
    prompt: "「ほん◯ よむ」。◯に {入|はい}る {文字|もじ}は？",
    explanation: "「を」は「お」と よむ じょし。なにかを する ときに つかうよ。",
    format: "choice",
    choices: ["を", "お", "は", "へ"],
    answer: "を",
  },
  {
    id: `${U.particles}.q-3`,
    unitId: U.particles,
    prompt: "「がっこう◯ いく」。◯に {入|はい}る {文字|もじ}は？",
    explanation: "「へ」は「え」と よむ。いく ばしょの まえに つかうよ。",
    format: "choice",
    choices: ["へ", "え", "を", "は"],
    answer: "へ",
  },
  {
    id: `${U.particles}.q-4`,
    unitId: U.particles,
    prompt: "「は」を「わ」と よむのは どれ？",
    explanation: "「こんにちは」の「は」は じょし。だから「わ」と よむよ。",
    format: "choice",
    choices: ["こんにちは", "はな", "はし", "はこ"],
    answer: "こんにちは",
  },
  {
    id: `${U.particles}.q-5`,
    unitId: U.particles,
    prompt: "{正|ただ}しい {文|ぶん}は どれ？",
    explanation: "「のむ」たいしょうには「を」を つかうよ。「みずを のむ」。",
    format: "choice",
    choices: ["みずを のむ", "みずお のむ", "みずへ のむ", "みずは のむ"],
    answer: "みずを のむ",
  },
];

const makeSentenceQuestions: ChoiceQuestion[] = [
  {
    id: `${U.makeSentence}.q-1`,
    unitId: U.makeSentence,
    prompt: "{文|ぶん}の おわりに つける ものは どれ？",
    explanation: "{文|ぶん}の おわりは まる「。」だよ。",
    format: "choice",
    choices: ["。", "、", "ー", "゛"],
    answer: "。",
  },
  {
    id: `${U.makeSentence}.q-2`,
    unitId: U.makeSentence,
    prompt: "ちょっと {休|やす}む ところに つける ものは？",
    explanation: "とちゅうで {休|やす}む ところは てん「、」だよ。",
    format: "choice",
    choices: ["、", "。", "ー", "゜"],
    answer: "、",
  },
  {
    id: `${U.makeSentence}.q-3`,
    unitId: U.makeSentence,
    prompt: "「ねこ◯ ねる」を {文|ぶん}に するには ◯に なにを {入|い}れる？",
    explanation: "「だれが」を あらわす「が」。「ねこが ねる」だよ。",
    format: "choice",
    choices: ["が", "を", "へ", "。"],
    answer: "が",
  },
  {
    id: `${U.makeSentence}.q-4`,
    unitId: U.makeSentence,
    prompt: "{正|ただ}しい {文|ぶん}は どれ？",
    explanation: "「だれが どうする」の じゅんで、おわりに まる「。」を つけるよ。",
    format: "choice",
    choices: ["とりが とぶ。", "とりが とぶ、", "とぶ とりが。", "とりとぶが。"],
    answer: "とりが とぶ。",
  },
  {
    id: `${U.makeSentence}.q-5`,
    unitId: U.makeSentence,
    prompt: "「はなが さく」の「さく」は どんな ことば？",
    explanation: "「さく」は はなが する うごきの ことば だよ。",
    format: "choice",
    choices: ["どうする(うごき)", "だれが", "いろ", "かず"],
    answer: "どうする(うごき)",
  },
];

const readStoryQuestions: ChoiceQuestion[] = [
  {
    id: `${U.readStory}.q-1`,
    unitId: U.readStory,
    prompt: "「うさぎが にんじんを たべました。」だれが たべた？",
    explanation: "「うさぎが たべました」と かいてあるね。",
    format: "choice",
    choices: ["うさぎ", "にんじん", "ねこ", "いぬ"],
    answer: "うさぎ",
  },
  {
    id: `${U.readStory}.q-2`,
    unitId: U.readStory,
    prompt: "「うさぎが にんじんを たべました。」なにを たべた？",
    explanation: "たべた ものは「にんじん」だよ。",
    format: "choice",
    choices: ["にんじん", "りんご", "パン", "みず"],
    answer: "にんじん",
  },
  {
    id: `${U.readStory}.q-3`,
    unitId: U.readStory,
    prompt: "「{雨|あめ}が ふったので かさを さしました。」なぜ かさを さした？",
    explanation: "「{雨|あめ}が ふったので」が りゆう だよ。",
    format: "choice",
    choices: ["あめが ふったから", "さむいから", "ねむいから", "おなかが すいたから"],
    answer: "あめが ふったから",
  },
  {
    id: `${U.readStory}.q-4`,
    unitId: U.readStory,
    prompt: "「たろうは うれしくて わらいました。」たろうは どんな きもち？",
    explanation: "「うれしくて わらいました」と かいてあるね。",
    format: "choice",
    choices: ["うれしい", "かなしい", "こわい", "おこってる"],
    answer: "うれしい",
  },
  {
    id: `${U.readStory}.q-5`,
    unitId: U.readStory,
    prompt: "おはなしを よむ とき、さいしょに {気|き}を つけると よいのは どれ？",
    explanation: "「だれが でてくるか」を つかむと よみやすく なるよ。",
    format: "choice",
    choices: ["だれが でてくるか", "なんじか", "てんき", "ねだん"],
    answer: "だれが でてくるか",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test）────────────

export const kokugoG1Contents: Record<string, UnitContent> = {
  [U.hiragana]: {
    unitId: U.hiragana,
    learn: {
      unitId: U.hiragana,
      steps: [
        {
          heading: "ひらがなって なに？",
          body: "ことばを かくときに つかう {文字|もじ}だよ。「あいうえお」から はじまる 46この {文字|もじ}が あるよ。",
          visual: { kind: "emoji", value: "あいうえお", caption: "ひらがな" },
        },
        {
          heading: "えと いっしょに おぼえよう",
          body: "「あり」の あ、「いぬ」の い のように、えと むすびつけると おぼえやすいよ。",
          visual: { kind: "emoji", value: "🐜🐶", caption: "あり・いぬ" },
        },
        {
          heading: "にている {文字|もじ}に {気|き}をつけて",
          body: "「ね」と「れ」、「は」と「ほ」は かたちが にているよ。よく{見|み}て よもう。",
          visual: { kind: "emoji", value: "👀", caption: "よく{見|み}よう" },
        },
      ],
    },
    test: { unitId: U.hiragana, questions: hiraganaQuestions, questionCount: 5 },
  },

  [U.dakutenYouon]: {
    unitId: U.dakutenYouon,
    learn: {
      unitId: U.dakutenYouon,
      steps: [
        {
          heading: "てんてん(゛)と まる(゜)",
          body: "「か」に てんてんで「が」、「は」に まるで「ぱ」。{音|おと}が かわるよ。",
          visual: { kind: "emoji", value: "か→が　は→ぱ" },
        },
        {
          heading: "{小|ちい}さい ゃ・ゅ・ょ",
          body: "「きゃ・きゅ・きょ」は {小|ちい}さい {文字|もじ}を まえと くっつけて、ひとつの {音|おと}で よむよ。",
          visual: { kind: "emoji", value: "きゃ きゅ きょ" },
        },
        {
          heading: "{小|ちい}さい っ",
          body: "「がっこう」の {小|ちい}さい「っ」は、すこし とまって よむよ。",
          visual: { kind: "emoji", value: "🏫", caption: "がっこう" },
        },
      ],
    },
    test: { unitId: U.dakutenYouon, questions: dakutenYouonQuestions, questionCount: 5 },
  },

  [U.katakana]: {
    unitId: U.katakana,
    learn: {
      unitId: U.katakana,
      steps: [
        {
          heading: "カタカナって なに？",
          body: "そとの くにの ことばや、どうぶつの なきごえなどに つかう {文字|もじ}だよ。",
          visual: { kind: "emoji", value: "🍦", caption: "アイス" },
        },
        {
          heading: "ひらがなと {見|み}くらべよう",
          body: "「カ」は ひらがなの「か」と にているね。にている {文字|もじ}を {見|み}くらべて おぼえよう。",
          visual: { kind: "emoji", value: "か　カ" },
        },
        {
          heading: "のばす {音|おと}「ー」",
          body: "「ラーメン」のように、のばす {音|おと}は「ー」で かくよ。",
          visual: { kind: "emoji", value: "🍜", caption: "ラーメン" },
        },
      ],
    },
    test: { unitId: U.katakana, questions: katakanaQuestions, questionCount: 5 },
  },

  [U.kanji80]: {
    unitId: U.kanji80,
    learn: {
      unitId: U.kanji80,
      steps: [
        {
          heading: "かんじって なに？",
          body: "ものの かたちから できた {文字|もじ}だよ。「山」は やまの かたち、「川」は かわの ながれ。",
          visual: { kind: "emoji", value: "⛰️🌊", caption: "山・川" },
        },
        {
          heading: "よみかたは いくつも ある",
          body: "「日」は「ひ」とも「にち」とも よむよ。ことばに よって かわるんだ。",
          visual: { kind: "emoji", value: "☀️", caption: "日" },
        },
        {
          heading: "かずの かんじ",
          body: "「一・二・三」は ぼうの かずで おぼえやすいよ。",
          visual: { kind: "emoji", value: "一 二 三" },
        },
      ],
    },
    test: { unitId: U.kanji80, questions: kanji80Questions, questionCount: 5 },
  },

  [U.wordGroups]: {
    unitId: U.wordGroups,
    learn: {
      unitId: U.wordGroups,
      steps: [
        {
          heading: "なかまで あつめよう",
          body: "「いぬ・ねこ・うさぎ」は ぜんぶ どうぶつ。おなじ なかまで あつめると おぼえやすいよ。",
          visual: { kind: "emoji", value: "🐶🐱🐰", caption: "どうぶつ" },
        },
        {
          heading: "いろいろな なかま",
          body: "「あか・あお・きいろ」は いろ、「りんご・みかん」は くだもの。なかまを かんがえよう。",
          visual: { kind: "emoji", value: "🍎🍊", caption: "くだもの" },
        },
      ],
    },
    test: { unitId: U.wordGroups, questions: wordGroupsQuestions, questionCount: 5 },
  },

  [U.particles]: {
    unitId: U.particles,
    learn: {
      unitId: U.particles,
      steps: [
        {
          heading: "「は」は「わ」と よむ",
          body: "「わたしは」の「は」は「わ」と よむよ。{文|ぶん}の あいだに つかう とくべつな つかいかた。",
          visual: { kind: "emoji", value: "🗣️", caption: "わたしは=わたしわ" },
        },
        {
          heading: "「を」と「へ」",
          body: "「ごはんを たべる」の「を」、「がっこうへ いく」の「へ」。「を」は「お」、「へ」は「え」と よむよ。",
          visual: { kind: "emoji", value: "🍚🏫", caption: "を・へ" },
        },
      ],
    },
    test: { unitId: U.particles, questions: particlesQuestions, questionCount: 5 },
  },

  [U.makeSentence]: {
    unitId: U.makeSentence,
    learn: {
      unitId: U.makeSentence,
      steps: [
        {
          heading: "てん(、)と まる(。)",
          body: "{文|ぶん}の おわりには まる「。」、ちょっと {休|やす}む ところには てん「、」を つけるよ。",
          visual: { kind: "emoji", value: "。 、" },
        },
        {
          heading: "だれが どうする",
          body: "「いぬが はしる」のように「だれが」「どうする」を つなげると {文|ぶん}に なるよ。",
          visual: { kind: "emoji", value: "🐶💨", caption: "いぬが はしる" },
        },
      ],
    },
    test: { unitId: U.makeSentence, questions: makeSentenceQuestions, questionCount: 5 },
  },

  [U.readStory]: {
    unitId: U.readStory,
    learn: {
      unitId: U.readStory,
      steps: [
        {
          heading: "だれが でてくる？",
          body: "おはなしを よむ ときは、まず「だれが でてくるか」に {気|き}を つけて よもう。",
          visual: { kind: "emoji", value: "📖", caption: "おはなし" },
        },
        {
          heading: "なにを した？",
          body: "つぎに「なにを したか」「どうなったか」を かんがえると、おはなしが よくわかるよ。",
          visual: { kind: "emoji", value: "🤔", caption: "かんがえよう" },
        },
      ],
    },
    test: { unitId: U.readStory, questions: readStoryQuestions, questionCount: 5 },
  },
};
