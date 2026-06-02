// ══════════════════════════════════════════
// カリキュラム: 国語（こくご）小4
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形。kokugo/g2.ts と命名をそろえる。
//
// 学習指導要領（小4 国語）に基づく領域・内容:
//  ・〔知識及び技能〕: 4年配当漢字202字（音訓・読み書き）/ 熟語の構成（二字熟語）/
//                      文の組み立て（主語・述語・修飾語）/ つなぎ言葉（接続語）/
//                      きせつの言葉（四季の語彙）/ 慣用句・故事成語
//  ・〔読むこと〕: 説明文の要点・要約 / 物語の心情の変化を読み取る
// 国語は generators を持たないため、テストは全て固定 questions[]（全問 explanation 必須）。
// 【表記】ひらがな主体。地の文の漢字は「1〜4年配当（小4が読める範囲）」のみ {漢字|よみ}
//   ルビ記法で書く（RubyText が描画）。5年以上・表外漢字は配当外＝使わずひらがなにする
//   （例: 述語→じゅつご / 修飾語→しゅうしょくご / 接続語→せつぞくご / 熟語→じゅくご /
//    慣用句→かんようく / 故事成語→こじせいご / 心情→しんじょう / 矛盾→むじゅん）。
//   例外: 漢字単元(kanji-grade4)の出題・学習対象漢字（愛・健康・観察・成功 等）は
//   読みを隠すためルビ無しの素漢字にする。answer は対応 choice と完全一致させる。
// 集約(index.ts)は中央が行う＝編集しない。前提/後続は g2 と g4 内のみ参照（g3 は未作成のため張らない）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  TextInputQuestion,
} from "@/types/curriculum";

// ── 教科（g1/g2 と同一定義。中央集約時に id で重複排除される前提）──

export const kokugoSubject: Subject = {
  id: "kokugo",
  name: "こくご",
  formalName: "国語",
  emoji: "📖",
  theme: "rose",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域（kokugo/g2 と同一の id 体系を踏襲。中央集約時に id で重複排除される前提）──

export const kokugoG4Domains: Domain[] = [
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
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。参照は g2 と本ファイル内で完結）:
//
//   g2.kanji-write ─▶ kanji-grade4 ─┬─▶ jukugo-kosei ─┐
//                                    └─▶ bun-no-kumitate ─▶ tsunagi-kotoba ─▶ setsumei-youyaku ─▶ monogatari-shinjo
//   kisetsu-kotoba ─▶ kanyoku-koji ◀─ jukugo-kosei
//   g2.read-explanation ─▶ setsumei-youyaku   g2.read-story ─▶ monogatari-shinjo
//
const U = {
  kanjiGrade4: "kokugo.g4.kanji-grade4",
  jukugoKosei: "kokugo.g4.jukugo-kosei",
  bunNoKumitate: "kokugo.g4.bun-no-kumitate",
  tsunagiKotoba: "kokugo.g4.tsunagi-kotoba",
  kisetsuKotoba: "kokugo.g4.kisetsu-kotoba",
  kanyokuKoji: "kokugo.g4.kanyoku-koji",
  setsumeiYouyaku: "kokugo.g4.setsumei-youyaku",
  monogatariShinjo: "kokugo.g4.monogatari-shinjo",
} as const;

// 他学年（g2）の参照先 id
const G2 = {
  kanjiWrite: "kokugo.g2.kanji-write",
  subjectPredicate: "kokugo.g2.subject-predicate",
  readStory: "kokugo.g2.read-story",
  readExplanation: "kokugo.g2.read-explanation",
} as const;

export const kokugoG4Units: Unit[] = [
  {
    id: U.kanjiGrade4,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.kanji",
    title: "4{年生|ねんせい}の かんじ（202{字|じ}）",
    order: 1,
    realWorldUse: "「健康」「観察」「成功」など、ニュースや きょうかしょ、まちの かんばんで よく{目|め}にする かんじだよ。{読|よ}めると {文|ぶん}の いみが よくわかるね。",
    leadsTo: [U.jukugoKosei, U.bunNoKumitate],
    prerequisites: [G2.kanjiWrite],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.jukugoKosei,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.language",
    title: "じゅくごの くみたて（{二字|にじ}じゅくご）",
    order: 2,
    realWorldUse: "「{強弱|きょうじゃく}」「{読書|どくしょ}」など、{二字|にじ}の じゅくごの くみたてが わかると、{見|み}たことのない ことばの いみも {予想|よそう}できるよ。",
    leadsTo: [U.kanyokuKoji],
    prerequisites: [U.kanjiGrade4],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.bunNoKumitate,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.language",
    title: "{文|ぶん}の くみたて（{主語|しゅご}・じゅつご・しゅうしょくご）",
    order: 3,
    realWorldUse: "だれが・どうする・どのように を きちんと わけると、{長|なが}い{文|ぶん}も わかりやすく {読|よ}んだり {書|か}いたり できるよ。",
    leadsTo: [U.tsunagiKotoba],
    prerequisites: [G2.subjectPredicate],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.tsunagiKotoba,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.language",
    title: "つなぎ{言葉|ことば}（せつぞくご）",
    order: 4,
    realWorldUse: "「だから」「しかし」などの つなぎ{言葉|ことば}を つかうと、{文|ぶん}と{文|ぶん}の かんけいが はっきりして、いいたいことが よくつたわるよ。",
    leadsTo: [U.setsumeiYouyaku],
    prerequisites: [U.bunNoKumitate],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kisetsuKotoba,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.language",
    title: "きせつの {言葉|ことば}（{四季|しき}のことば）",
    order: 5,
    realWorldUse: "「さくら」「せみ」「もみじ」「{雪|ゆき}」など、きせつを あらわす ことばを しると、{手紙|てがみ}や {作文|さくぶん}が ゆたかになるよ。",
    leadsTo: [U.kanyokuKoji],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kanyokuKoji,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.language",
    title: "かんようく・こじせいご",
    order: 6,
    realWorldUse: "「{耳|みみ}をかたむける」「{五十歩百歩|ごじっぽひゃっぽ}」など、むかしから つたわる いいまわしを しると、{気|き}もちや ようすを みじかく うまくいえるよ。",
    leadsTo: [],
    prerequisites: [U.jukugoKosei, U.kisetsuKotoba],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.setsumeiYouyaku,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.read",
    title: "せつめい{文|ぶん}を {読|よ}んで {要約|ようやく}する",
    order: 7,
    realWorldUse: "ずかんや きじを {読|よ}んで「いちばん いいたいこと」を みじかく まとめる{力|ちから}は、しらべ{学|がく}しゅうや {発表|はっぴょう}で やくに{立|た}つよ。",
    leadsTo: [U.monogatariShinjo],
    prerequisites: [U.tsunagiKotoba, G2.readExplanation],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.monogatariShinjo,
    subjectId: "kokugo",
    grade: 4,
    domainId: "kokugo.read",
    title: "{物語|ものがたり}の しんじょうを {読|よ}み{取|と}る",
    order: 8,
    realWorldUse: "とうじょう{人|じん}ぶつの {気|き}もちの うつりかわりを {読|よ}みとると、おはなしを ふかく あじわえて、{自分|じぶん}の {気|き}もちを つたえる ヒントにもなるよ。",
    leadsTo: [],
    prerequisites: [G2.readStory, U.setsumeiYouyaku],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// 国語は固定 questions[]。全問 explanation 必須。
// ══════════════════════════════════════════

// ── 4年生の かんじ ──
// 出題・学習対象の漢字（愛・観察・健康・成功）は読みを隠すためルビ無しの素漢字。
const kanjiGrade4Questions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiGrade4}.q1`,
    unitId: U.kanjiGrade4,
    prompt: "「愛」の よみかたは どれ？",
    explanation: "「愛」は あい と よむよ。{大切|たいせつ}に {思|おも}う {気|き}もちを あらわす かんじだね。",
    format: "choice",
    choices: ["あい", "めい", "ねん", "おん"],
    answer: "あい",
  },
  {
    id: `${U.kanjiGrade4}.q2`,
    unitId: U.kanjiGrade4,
    prompt: "「観察」の よみかたは どれ？",
    explanation: "「観察」は かんさつ と よむよ。ものを よく{見|み}て しらべることだね。",
    format: "choice",
    choices: ["かんさつ", "かんさい", "けんさつ", "かんけい"],
    answer: "かんさつ",
  },
  {
    id: `${U.kanjiGrade4}.q3`,
    unitId: U.kanjiGrade4,
    prompt: "「健康」の よみかたは どれ？",
    explanation: "「健康」は けんこう と よむよ。{体|からだ}が じょうぶで {元気|げんき}な ようすだね。",
    format: "choice",
    choices: ["けんこう", "けんき", "けんぜん", "かんこう"],
    answer: "けんこう",
  },
  {
    id: `${U.kanjiGrade4}.q4`,
    unitId: U.kanjiGrade4,
    prompt: "「成功」の よみかたは どれ？",
    explanation: "「成功」は せいこう と よむよ。やろうとしたことが うまくいくことだね。",
    format: "choice",
    choices: ["せいこう", "せいく", "じょうこう", "せいきょう"],
    answer: "せいこう",
  },
];

const kanjiGrade4Write: TextInputQuestion = {
  id: `${U.kanjiGrade4}.q5`,
  unitId: U.kanjiGrade4,
  prompt: "「あい」を かんじで かくと？（こたえは 1{字|じ}）",
  explanation: "「あい」は かんじで「愛」と かくよ。",
  format: "text-input",
  answer: "愛",
};

// ── じゅくごの くみたて ──
const jukugoKoseiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.jukugoKosei}.q1`,
    unitId: U.jukugoKosei,
    prompt: "「{強弱|きょうじゃく}」は どんな くみたて？",
    explanation: "「{強|つよ}い」と「{弱|よわ}い」は はんたいの いみ。はんたいの いみの かんじを あわせた じゅくごだよ。",
    format: "choice",
    choices: ["はんたいの いみの かんじ", "にた いみの かんじ", "{上|うえ}が{下|した}を くわしくする", "{下|した}から かえって よむ"],
    answer: "はんたいの いみの かんじ",
  },
  {
    id: `${U.jukugoKosei}.q2`,
    unitId: U.jukugoKosei,
    prompt: "「{岩石|がんせき}」は どんな くみたて？",
    explanation: "「{岩|いわ}」も「{石|いし}」も いし の なかま。にた いみの かんじを あわせた じゅくごだよ。",
    format: "choice",
    choices: ["にた いみの かんじ", "はんたいの いみの かんじ", "{主語|しゅご}とじゅつご", "{下|した}から かえって よむ"],
    answer: "にた いみの かんじ",
  },
  {
    id: `${U.jukugoKosei}.q3`,
    unitId: U.jukugoKosei,
    prompt: "「{国旗|こっき}」は どんな くみたて？",
    explanation: "「{国|くに}の {旗|はた}」のように、{上|うえ}の{字|じ}「{国|くに}」が {下|した}の{字|じ}「{旗|はた}」を くわしく している じゅくごだよ。",
    format: "choice",
    choices: ["{上|うえ}の{字|じ}が {下|した}の{字|じ}を くわしくする", "はんたいの いみ", "にた いみ", "{下|した}から かえって よむ"],
    answer: "{上|うえ}の{字|じ}が {下|した}の{字|じ}を くわしくする",
  },
  {
    id: `${U.jukugoKosei}.q4`,
    unitId: U.jukugoKosei,
    prompt: "「{読書|どくしょ}」は どんな くみたて？",
    explanation: "「{書|しょ}（{本|ほん}）を {読|よ}む」のように、{下|した}の{字|じ}から かえって {読|よ}む じゅくごだよ（〜を〜する の かたち）。",
    format: "choice",
    choices: ["{下|した}から かえって よむ（〜を〜する）", "はんたいの いみ", "にた いみ", "{上|うえ}が{下|した}を くわしくする"],
    answer: "{下|した}から かえって よむ（〜を〜する）",
  },
  {
    id: `${U.jukugoKosei}.q5`,
    unitId: U.jukugoKosei,
    prompt: "はんたいの いみの かんじを あわせた じゅくごは どれ？",
    explanation: "「{高低|こうてい}」は「{高|たか}い」と「{低|ひく}い」で はんたいの いみ。だから はんたいの くみたてだよ。",
    format: "choice",
    choices: ["{高低|こうてい}", "{岩石|がんせき}", "{読書|どくしょ}", "{国旗|こっき}"],
    answer: "{高低|こうてい}",
  },
];

// ── 文の くみたて ──
const bunNoKumitateQuestions: ChoiceQuestion[] = [
  {
    id: `${U.bunNoKumitate}.q1`,
    unitId: U.bunNoKumitate,
    prompt: "「{赤|あか}い {花|はな}が さく。」で しゅうしょくご（くわしくする ことば）は どれ？",
    explanation: "「{赤|あか}い」は「{花|はな}」が どんな {花|はな}かを くわしく している しゅうしょくごだよ。",
    format: "choice",
    choices: ["{赤|あか}い", "{花|はな}が", "さく", "が"],
    answer: "{赤|あか}い",
  },
  {
    id: `${U.bunNoKumitate}.q2`,
    unitId: U.bunNoKumitate,
    prompt: "「{犬|いぬ}が はやく {走|はし}る。」の {主語|しゅご}は どれ？",
    explanation: "「だれが・なにが」にあたる「{犬|いぬ}が」が {主語|しゅご}だよ。",
    format: "choice",
    choices: ["{犬|いぬ}が", "{走|はし}る", "はやく", "{犬|いぬ}"],
    answer: "{犬|いぬ}が",
  },
  {
    id: `${U.bunNoKumitate}.q3`,
    unitId: U.bunNoKumitate,
    prompt: "「{犬|いぬ}が はやく {走|はし}る。」の じゅつごは どれ？",
    explanation: "「どうする」にあたる「{走|はし}る」が じゅつごだよ。",
    format: "choice",
    choices: ["{走|はし}る", "{犬|いぬ}が", "はやく", "{犬|いぬ}"],
    answer: "{走|はし}る",
  },
  {
    id: `${U.bunNoKumitate}.q4`,
    unitId: U.bunNoKumitate,
    prompt: "「{犬|いぬ}が はやく {走|はし}る。」で「はやく」は なにを くわしく している？",
    explanation: "「はやく」は「{走|はし}る」を くわしく して、どのように {走|はし}るかを あらわしているよ。",
    format: "choice",
    choices: ["{走|はし}る", "{犬|いぬ}が", "{犬|いぬ}", "。"],
    answer: "{走|はし}る",
  },
  {
    id: `${U.bunNoKumitate}.q5`,
    unitId: U.bunNoKumitate,
    prompt: "「しゅうしょくご」とは どんな ことば？",
    explanation: "しゅうしょくごは、ほかの ことばを くわしく する ことばだよ。「{赤|あか}い {花|はな}」の「{赤|あか}い」など。",
    format: "choice",
    choices: ["ほかの ことばを くわしくする ことば", "{文|ぶん}の おわりの しるし", "だれが にあたる ことば", "{音|おと}を あらわす ことば"],
    answer: "ほかの ことばを くわしくする ことば",
  },
];

// ── つなぎ言葉（せつぞくご） ──
const tsunagiKotobaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.tsunagiKotoba}.q1`,
    unitId: U.tsunagiKotoba,
    prompt: "「{雨|あめ}が ふった。（　）えんそくは {中止|ちゅうし}だ。」（　）に {入|はい}る つなぎ{言葉|ことば}は？",
    explanation: "まえが りゆうで、あとが その けっか。だから「だから」が {入|はい}るよ（じゅんせつ）。",
    format: "choice",
    choices: ["だから", "しかし", "または", "たとえば"],
    answer: "だから",
  },
  {
    id: `${U.tsunagiKotoba}.q2`,
    unitId: U.tsunagiKotoba,
    prompt: "「たくさん べんきょうした。（　）テストは わるかった。」（　）に {入|はい}るのは？",
    explanation: "まえと あとが はんたいの けっか。だから「しかし」が {入|はい}るよ（ぎゃくせつ）。",
    format: "choice",
    choices: ["しかし", "だから", "そして", "つまり"],
    answer: "しかし",
  },
  {
    id: `${U.tsunagiKotoba}.q3`,
    unitId: U.tsunagiKotoba,
    prompt: "「りんごを {買|か}った。（　）みかんも {買|か}った。」（　）に {入|はい}るのは？",
    explanation: "まえに あとを つけくわえているね。だから「そして（また）」が {入|はい}るよ。",
    format: "choice",
    choices: ["そして", "しかし", "だから", "けれども"],
    answer: "そして",
  },
  {
    id: `${U.tsunagiKotoba}.q4`,
    unitId: U.tsunagiKotoba,
    prompt: "「かれは クラスで いちばん はやい。（　）、いちばんの ランナーだ。」（　）に {入|はい}るのは？",
    explanation: "まえの ことを いいかえているね。だから「つまり」が {入|はい}るよ。",
    format: "choice",
    choices: ["つまり", "しかし", "ところが", "または"],
    answer: "つまり",
  },
  {
    id: `${U.tsunagiKotoba}.q5`,
    unitId: U.tsunagiKotoba,
    prompt: "「しかし」は どんな はたらきの つなぎ{言葉|ことば}？",
    explanation: "「しかし」は、まえと あとが はんたいに なることを しめす つなぎ{言葉|ことば}（ぎゃくせつ）だよ。",
    format: "choice",
    choices: ["まえと あとが はんたいに なる", "まえが りゆうで あとが けっか", "つけくわえる", "いいかえる"],
    answer: "まえと あとが はんたいに なる",
  },
];

// ── きせつの 言葉 ──
const kisetsuKotobaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kisetsuKotoba}.q1`,
    unitId: U.kisetsuKotoba,
    prompt: "「さくら」は どの きせつの {言葉|ことば}？",
    explanation: "さくらは はるに さく {花|はな}。はるの きせつの {言葉|ことば}だよ。",
    format: "choice",
    choices: ["はる", "なつ", "あき", "ふゆ"],
    answer: "はる",
  },
  {
    id: `${U.kisetsuKotoba}.q2`,
    unitId: U.kisetsuKotoba,
    prompt: "「せみ」は どの きせつの {言葉|ことば}？",
    explanation: "せみは なつに {鳴|な}く {虫|むし}。なつの きせつの {言葉|ことば}だよ。",
    format: "choice",
    choices: ["なつ", "はる", "あき", "ふゆ"],
    answer: "なつ",
  },
  {
    id: `${U.kisetsuKotoba}.q3`,
    unitId: U.kisetsuKotoba,
    prompt: "「もみじ」は どの きせつの {言葉|ことば}？",
    explanation: "もみじは あきに {赤|あか}や {黄色|きいろ}に なる {葉|は}。あきの きせつの {言葉|ことば}だよ。",
    format: "choice",
    choices: ["あき", "はる", "なつ", "ふゆ"],
    answer: "あき",
  },
  {
    id: `${U.kisetsuKotoba}.q4`,
    unitId: U.kisetsuKotoba,
    prompt: "「{雪|ゆき}」は どの きせつの {言葉|ことば}？",
    explanation: "{雪|ゆき}は ふゆに そらから ふってくるね。ふゆの きせつの {言葉|ことば}だよ。",
    format: "choice",
    choices: ["ふゆ", "はる", "なつ", "あき"],
    answer: "ふゆ",
  },
  {
    id: `${U.kisetsuKotoba}.q5`,
    unitId: U.kisetsuKotoba,
    prompt: "あきの きせつの {言葉|ことば}は どれ？",
    explanation: "「{月見|つきみ}」は あきの ぎょうじ。{花火|はなび}は なつ、こたつは ふゆ、さくらは はるだよ。",
    format: "choice",
    choices: ["{月見|つきみ}", "{花火|はなび}", "こたつ", "さくら"],
    answer: "{月見|つきみ}",
  },
];

// ── 慣用句・故事成語（かんようく・こじせいご） ──
const kanyokuKojiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanyokuKoji}.q1`,
    unitId: U.kanyokuKoji,
    prompt: "「{耳|みみ}を かたむける」の いみは？",
    explanation: "「{耳|みみ}を かたむける」は、ちゅういして よく {聞|き}く という いみの かんようくだよ。",
    format: "choice",
    choices: ["よく {聞|き}く", "{聞|き}こえない ふりをする", "{大|おお}きな {声|こえ}を{出|だ}す", "わすれる"],
    answer: "よく {聞|き}く",
  },
  {
    id: `${U.kanyokuKoji}.q2`,
    unitId: U.kanyokuKoji,
    prompt: "「ねこの {手|て}も かりたい」の いみは？",
    explanation: "とても いそがしくて、だれの {手|て}でも かりたいくらいだ、という いみだよ。",
    format: "choice",
    choices: ["とても いそがしい", "ねこが すきだ", "ひまで たいくつだ", "{手|て}が つめたい"],
    answer: "とても いそがしい",
  },
  {
    id: `${U.kanyokuKoji}.q3`,
    unitId: U.kanyokuKoji,
    prompt: "「{頭|あたま}を ひねる」の いみは？",
    explanation: "「{頭|あたま}を ひねる」は、いっしょうけんめい {考|かんが}える という いみの かんようくだよ。",
    format: "choice",
    choices: ["いっしょうけんめい {考|かんが}える", "{頭|あたま}が いたい", "おこる", "ねむくなる"],
    answer: "いっしょうけんめい {考|かんが}える",
  },
  {
    id: `${U.kanyokuKoji}.q4`,
    unitId: U.kanyokuKoji,
    prompt: "こじせいご「{五十歩百歩|ごじっぽひゃっぽ}」の いみは？",
    explanation: "すこしの ちがいは あっても、だいたい おなじで たいした ちがいは ない、という いみだよ。",
    format: "choice",
    choices: ["たいして ちがいが ない", "とても {大|おお}きな ちがいだ", "{百|ひゃく}ばい りっぱだ", "あるく のが はやい"],
    answer: "たいして ちがいが ない",
  },
  {
    id: `${U.kanyokuKoji}.q5`,
    unitId: U.kanyokuKoji,
    prompt: "こじせいご「{漁夫|ぎょふ}の{利|り}」の いみは？",
    explanation: "{二人|ふたり}が あらそって いる あいだに、ほかの {人|ひと}が とくを する こと、という いみだよ。",
    format: "choice",
    choices: ["あらそいの あいだに ほかの{人|ひと}が とくをする", "{魚|さかな}つりが じょうずだ", "りょうしが もうかる", "あらそいに かつ"],
    answer: "あらそいの あいだに ほかの{人|ひと}が とくをする",
  },
  {
    id: `${U.kanyokuKoji}.q6`,
    unitId: U.kanyokuKoji,
    prompt: "「むじゅん」の いみは？",
    explanation: "{言|い}っている ことの つじつまが あわない こと、という いみの こじせいごだよ。",
    format: "choice",
    choices: ["つじつまが あわない", "とても かたい", "{強|つよ}い ぶき", "{正|ただ}しい こと"],
    answer: "つじつまが あわない",
  },
];

// ── せつめい文を 読んで 要約する ──
// 短い説明文を prompt に提示し、要点・要約を読みとる。
const SETSUMEI =
  "【せつめい{文|ぶん}】ペンギンは とりですが、そらを とびません。そのかわり、つばさを つかって {海|うみ}の{中|なか}を じょうずに およぎます。";

const setsumeiYouyakuQuestions: ChoiceQuestion[] = [
  {
    id: `${U.setsumeiYouyaku}.q1`,
    unitId: U.setsumeiYouyaku,
    prompt: `${SETSUMEI}\n──ペンギンは そらを とぶ？`,
    explanation: "「そらを とびません」と {書|か}いてあるね。だから「とばない」が こたえだよ。",
    format: "choice",
    choices: ["とばない", "とぶ", "ときどき とぶ", "わからない"],
    answer: "とばない",
  },
  {
    id: `${U.setsumeiYouyaku}.q2`,
    unitId: U.setsumeiYouyaku,
    prompt: `${SETSUMEI}\n──ペンギンは つばさを なにに つかう？`,
    explanation: "「つばさを つかって {海|うみ}の{中|なか}を およぎます」と あるね。およぐために つかうよ。",
    format: "choice",
    choices: ["{海|うみ}を およぐため", "そらを とぶため", "あるくため", "{食|た}べるため"],
    answer: "{海|うみ}を およぐため",
  },
  {
    id: `${U.setsumeiYouyaku}.q3`,
    unitId: U.setsumeiYouyaku,
    prompt: `${SETSUMEI}\n──この{文|ぶん}の {要点|ようてん}（いちばん つたえたいこと）は どれ？`,
    explanation: "{中心|ちゅうしん}は「ペンギンは つばさで {海|うみ}を およぐ とり」ということ。これが {要点|ようてん}だよ。",
    format: "choice",
    choices: [
      "ペンギンは つばさで {海|うみ}を およぐ とりだ",
      "ペンギンは そらを {高|たか}く とぶ",
      "ペンギンは {虫|むし}を {食|た}べる",
      "ペンギンは とりでは ない",
    ],
    answer: "ペンギンは つばさで {海|うみ}を およぐ とりだ",
  },
  {
    id: `${U.setsumeiYouyaku}.q4`,
    unitId: U.setsumeiYouyaku,
    prompt: "{文|ぶん}を {要約|ようやく}する とき たいせつな ことは どれ？",
    explanation: "{要約|ようやく}は、{中心|ちゅうしん}と なる {語|ご}や {文|ぶん}を えらんで、みじかく まとめることが たいせつだよ。",
    format: "choice",
    choices: [
      "{中心|ちゅうしん}と なる {語|ご}や {文|ぶん}を えらぶ",
      "ぜんぶの {文|ぶん}を そのまま うつす",
      "さいごの {一文|いちぶん}だけ よむ",
      "すきな ところだけ えらぶ",
    ],
    answer: "{中心|ちゅうしん}と なる {語|ご}や {文|ぶん}を えらぶ",
  },
];

// ── 物語の 心情を 読み取る ──
const MONOGATARI =
  "【{物語|ものがたり}】けんは リレーの せんしゅに えらばれなかった。{下|した}を むいて {家|いえ}に かえった。でも つぎの{日|ひ}、「もう{一|いち}ど チャレンジしよう」と きめ、にっこり わらった。";

const monogatariShinjoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.monogatariShinjo}.q1`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──えらばれなかった とき、けんは どんな {気|き}もち？`,
    explanation: "せんしゅに えらばれず、{下|した}を むいているね。がっかりした かなしい {気|き}もちだよ。",
    format: "choice",
    choices: ["がっかりした {気|き}もち", "うれしい {気|き}もち", "おこった {気|き}もち", "ねむい {気|き}もち"],
    answer: "がっかりした {気|き}もち",
  },
  {
    id: `${U.monogatariShinjo}.q2`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──「{下|した}を むいて かえった」から わかる {気|き}もちは？`,
    explanation: "{下|した}を むく ようすから、{元気|げんき}が なく {落|お}ちこんでいる {気|き}もちが わかるよ。",
    format: "choice",
    choices: ["{落|お}ちこんでいる", "わくわくしている", "おなかが すいている", "いそいでいる"],
    answer: "{落|お}ちこんでいる",
  },
  {
    id: `${U.monogatariShinjo}.q3`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──つぎの{日|ひ}、けんの {気|き}もちは どう かわった？`,
    explanation: "「もう{一|いち}ど チャレンジしよう」と きめているね。まえむきな {気|き}もちに かわったよ。",
    format: "choice",
    choices: ["まえむきに なった", "もっと かなしくなった", "おこりだした", "なにも {思|おも}わなかった"],
    answer: "まえむきに なった",
  },
  {
    id: `${U.monogatariShinjo}.q4`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──さいごに けんが にっこり わらったのは なぜ？`,
    explanation: "「もう{一|いち}ど チャレンジしよう」と きめて、{気|き}もちが まえむきに なったから わらったんだよ。",
    format: "choice",
    choices: [
      "もう{一|いち}ど がんばろうと きめたから",
      "せんしゅに えらばれたから",
      "リレーが なくなったから",
      "ともだちに わらわれたから",
    ],
    answer: "もう{一|いち}ど がんばろうと きめたから",
  },
];

export const kokugoG4Contents: Record<string, UnitContent> = {
  [U.kanjiGrade4]: {
    unitId: U.kanjiGrade4,
    learn: {
      unitId: U.kanjiGrade4,
      steps: [
        {
          heading: "4{年生|ねんせい}は 202{字|じ}",
          body: "4{年生|ねんせい}では あたらしく 202{字|じ}の かんじを ならうよ。「愛・健康・観察・成功」など、いみの ある {言葉|ことば}で おぼえると わすれにくいね。",
          visual: { kind: "emoji", value: "📖✏️", caption: "202{字|じ}に ちょうせん" },
        },
        {
          heading: "{音|おん}と{訓|くん}",
          body: "おなじ かんじにも、おんよみ と くんよみが あるよ。れい:「成」は「せい（成功）」と「なる」。",
          visual: { kind: "emoji", value: "🔤", caption: "おんよみ・くんよみ" },
        },
        {
          heading: "{言葉|ことば}で おぼえよう",
          body: "{一字|いちじ}ずつより、「観察する」「健康な {体|からだ}」のように {言葉|ことば}や {文|ぶん}で おぼえると、つかいかたも {身|み}につくよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.kanjiGrade4,
      questions: [...kanjiGrade4Questions, kanjiGrade4Write],
      questionCount: 5,
    },
  },

  [U.jukugoKosei]: {
    unitId: U.jukugoKosei,
    learn: {
      unitId: U.jukugoKosei,
      steps: [
        {
          heading: "{二字|にじ}じゅくごの くみたて",
          body: "{二|ふた}つの かんじで できた{言葉|ことば}を {二字|にじ}じゅくごというよ。くみたてには いくつかの しゅるいが あるんだ。",
          visual: { kind: "emoji", value: "🧩", caption: "かんじ＋かんじ" },
        },
        {
          heading: "にた いみ・はんたいの いみ",
          body: "「{岩石|がんせき}」は にた いみ、「{強弱|きょうじゃく}」は はんたいの いみの くみあわせ。いみを かんがえると {見|み}分けられるよ。",
          visual: { kind: "emoji", value: "⛰️↔️", caption: "{岩石|がんせき} / {強弱|きょうじゃく}" },
        },
        {
          heading: "くわしくする・かえって よむ",
          body: "「{国旗|こっき}」は {上|うえ}が{下|した}を くわしくする、「{読書|どくしょ}」は「{書|しょ}を {読|よ}む」と {下|した}から かえって よむ くみたてだよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.jukugoKosei,
      questions: jukugoKoseiQuestions,
      questionCount: 5,
    },
  },

  [U.bunNoKumitate]: {
    unitId: U.bunNoKumitate,
    learn: {
      unitId: U.bunNoKumitate,
      steps: [
        {
          heading: "{主語|しゅご}と じゅつご",
          body: "「だれが・なにが」が {主語|しゅご}、「どうする・どんなだ」が じゅつご。{文|ぶん}の ほねぐみだよ。",
          visual: { kind: "emoji", value: "🐕🏃", caption: "{犬|いぬ}が（{主語|しゅご}）{走|はし}る（じゅつご）" },
        },
        {
          heading: "しゅうしょくご",
          body: "「{赤|あか}い {花|はな}」「はやく {走|はし}る」の「{赤|あか}い」「はやく」のように、ほかの {言葉|ことば}を くわしくする {言葉|ことば}を しゅうしょくごというよ。",
          visual: { kind: "emoji", value: "🌸", caption: "{赤|あか}い→{花|はな}を くわしく" },
        },
        {
          heading: "つないで {長|なが}い{文|ぶん}に",
          body: "{主語|しゅご}・じゅつごに しゅうしょくごを くわえると、ようすが くわしく わかる {文|ぶん}に なるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.bunNoKumitate,
      questions: bunNoKumitateQuestions,
      questionCount: 5,
    },
  },

  [U.tsunagiKotoba]: {
    unitId: U.tsunagiKotoba,
    learn: {
      unitId: U.tsunagiKotoba,
      steps: [
        {
          heading: "つなぎ{言葉|ことば}って なに？",
          body: "{文|ぶん}と {文|ぶん}を つなぐ {言葉|ことば}を つなぎ{言葉|ことば}（せつぞくご）というよ。「だから」「しかし」などだね。",
          visual: { kind: "emoji", value: "🔗", caption: "{文|ぶん}と{文|ぶん}を つなぐ" },
        },
        {
          heading: "じゅんせつ と ぎゃくせつ",
          body: "りゆう→けっか は「だから」（じゅんせつ）、はんたいの けっかは「しかし」（ぎゃくせつ）で つなぐよ。",
          visual: { kind: "emoji", value: "➡️↩️", caption: "だから / しかし" },
        },
        {
          heading: "つけたす・いいかえる",
          body: "「そして・また」で つけたし、「つまり」で いいかえ。つなぎ{言葉|ことば}で {文|ぶん}の かんけいが はっきりするよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.tsunagiKotoba,
      questions: tsunagiKotobaQuestions,
      questionCount: 5,
    },
  },

  [U.kisetsuKotoba]: {
    unitId: U.kisetsuKotoba,
    learn: {
      unitId: U.kisetsuKotoba,
      steps: [
        {
          heading: "きせつの {言葉|ことば}",
          body: "{日本|にほん}には {春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ} の {四|よっ}つの きせつが あり、それぞれに あう {言葉|ことば}が あるよ。",
          visual: { kind: "emoji", value: "🌸🌻🍁⛄", caption: "{春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ}" },
        },
        {
          heading: "{見|み}つけて つかおう",
          body: "「さくら（{春|はる}）」「せみ（{夏|なつ}）」「もみじ（{秋|あき}）」「{雪|ゆき}（{冬|ふゆ}）」など。{手紙|てがみ}や {作文|さくぶん}に つかうと きせつが つたわるよ。",
          visual: { kind: "emoji", value: "✉️", caption: "{手紙|てがみ}に きせつを" },
        },
      ],
    },
    test: {
      unitId: U.kisetsuKotoba,
      questions: kisetsuKotobaQuestions,
      questionCount: 5,
    },
  },

  [U.kanyokuKoji]: {
    unitId: U.kanyokuKoji,
    learn: {
      unitId: U.kanyokuKoji,
      steps: [
        {
          heading: "かんようく",
          body: "{二|ふた}つ{以上|いじょう}の {言葉|ことば}が むすびついて、とくべつな いみを あらわす いいまわしを かんようくというよ。れい:「{耳|みみ}を かたむける」＝よく {聞|き}く。",
          visual: { kind: "emoji", value: "👂", caption: "{耳|みみ}を かたむける" },
        },
        {
          heading: "こじせいご",
          body: "むかしの {中国|ちゅうごく}の はなし（こじ）から できた {言葉|ことば}を こじせいごというよ。れい:「{五十歩百歩|ごじっぽひゃっぽ}」「{漁夫|ぎょふ}の{利|り}」。",
          visual: { kind: "emoji", value: "📜", caption: "むかしの はなしから" },
        },
        {
          heading: "{気|き}もちや ようすを みじかく",
          body: "かんようくや こじせいごを つかうと、{気|き}もちや ようすを みじかく うまく つたえられるよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.kanyokuKoji,
      questions: kanyokuKojiQuestions,
      questionCount: 6,
    },
  },

  [U.setsumeiYouyaku]: {
    unitId: U.setsumeiYouyaku,
    learn: {
      unitId: U.setsumeiYouyaku,
      steps: [
        {
          heading: "なにに ついての {文|ぶん}かな",
          body: "せつめい{文|ぶん}は、まず「なにに ついて」{書|か}いてあるかを つかもう。だんらくごとの {話題|わだい}に {注目|ちゅうもく}だよ。",
          visual: { kind: "emoji", value: "🐧", caption: "ペンギンの せつめい" },
        },
        {
          heading: "{中心|ちゅうしん}と なる {文|ぶん}を さがす",
          body: "いちばん つたえたい「{中心|ちゅうしん}と なる {文|ぶん}」を {見|み}つけると、{要点|ようてん}が わかるよ。",
          visual: { kind: "emoji", value: "🔍", caption: "{中心|ちゅうしん}の {文|ぶん}を さがす" },
        },
        {
          heading: "みじかく まとめる＝{要約|ようやく}",
          body: "{中心|ちゅうしん}と なる {語|ご}や {文|ぶん}を つかって、みじかく まとめることを {要約|ようやく}というよ。",
          visual: { kind: "none" },
        },
      ],
    },
    test: {
      unitId: U.setsumeiYouyaku,
      questions: setsumeiYouyakuQuestions,
      questionCount: 4,
    },
  },

  [U.monogatariShinjo]: {
    unitId: U.monogatariShinjo,
    learn: {
      unitId: U.monogatariShinjo,
      steps: [
        {
          heading: "{気|き}もちは どこに {出|で}る？",
          body: "とうじょう{人|じん}ぶつの {言葉|ことば}・ようす・{行|こう}どう（うごき）から、{気|き}もちを {読|よ}みとろう。「{下|した}を むく」＝{落|お}ちこむ など。",
          visual: { kind: "emoji", value: "😔", caption: "ようすから {気|き}もちを" },
        },
        {
          heading: "{気|き}もちの うつりかわり",
          body: "おはなしの はじめと おわりで、{気|き}もちが どう かわったかを おさえると、{物語|ものがたり}が ふかく わかるよ。",
          visual: { kind: "emoji", value: "😔➡️😊", caption: "{落|お}ちこむ→まえむき" },
        },
      ],
    },
    test: {
      unitId: U.monogatariShinjo,
      questions: monogatariShinjoQuestions,
      questionCount: 4,
    },
  },
};
