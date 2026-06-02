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
// 文言は基本ひらがな。漢字を出すのは「漢字・熟語・慣用句・読解の題材」の意図的箇所のみ。
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
    title: "4年生の かんじ（202字）",
    order: 1,
    realWorldUse: "「健康」「観察」「成功」など、ニュースや きょうかしょ、まちの かんばんで よく目にする かんじだよ。読めると 文の いみが よくわかるね。",
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
    title: "じゅくごの くみたて（二字熟語）",
    order: 2,
    realWorldUse: "「強弱」「読書」など、二字の じゅくごの くみたてが わかると、見たことのない ことばの いみも 予想できるよ。",
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
    title: "文の くみたて（主語・述語・修飾語）",
    order: 3,
    realWorldUse: "だれが・どうする・どのように を きちんと わけると、長い文も わかりやすく 読んだり 書いたり できるよ。",
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
    title: "つなぎ言葉（接続語）",
    order: 4,
    realWorldUse: "「だから」「しかし」などの つなぎ言葉を つかうと、文と文の かんけいが はっきりして、いいたいことが よくつたわるよ。",
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
    title: "きせつの 言葉（四季のことば）",
    order: 5,
    realWorldUse: "「さくら」「せみ」「もみじ」「雪」など、きせつを あらわす ことばを しると、手紙や 作文が ゆたかになるよ。",
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
    title: "慣用句・故事成語",
    order: 6,
    realWorldUse: "「耳をかたむける」「五十歩百歩」など、むかしから つたわる いいまわしを しると、気もちや ようすを みじかく うまくいえるよ。",
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
    title: "せつめい文を 読んで 要約する",
    order: 7,
    realWorldUse: "ずかんや きじを 読んで「いちばん いいたいこと」を みじかく まとめる力は、しらべ学しゅうや 発表で やくに立つよ。",
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
    title: "物語の 心情を 読み取る",
    order: 8,
    realWorldUse: "とうじょう人ぶつの 気もちの うつりかわりを 読みとると、おはなしを ふかく あじわえて、自分の 気もちを つたえる ヒントにもなるよ。",
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
const kanjiGrade4Questions: ChoiceQuestion[] = [
  {
    id: `${U.kanjiGrade4}.q1`,
    unitId: U.kanjiGrade4,
    prompt: "「愛」の よみかたは どれ？",
    explanation: "「愛」は あい と よむよ。大切に 思う 気もちを あらわす かんじだね。",
    format: "choice",
    choices: ["あい", "めい", "ねん", "おん"],
    answer: "あい",
  },
  {
    id: `${U.kanjiGrade4}.q2`,
    unitId: U.kanjiGrade4,
    prompt: "「観察」の よみかたは どれ？",
    explanation: "「観察」は かんさつ と よむよ。ものを よく見て しらべることだね。",
    format: "choice",
    choices: ["かんさつ", "かんさい", "けんさつ", "かんけい"],
    answer: "かんさつ",
  },
  {
    id: `${U.kanjiGrade4}.q3`,
    unitId: U.kanjiGrade4,
    prompt: "「健康」の よみかたは どれ？",
    explanation: "「健康」は けんこう と よむよ。体が じょうぶで 元気な ようすだね。",
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
  prompt: "「あい」を かんじで かくと？（こたえは 1字）",
  explanation: "「あい」は かんじで「愛」と かくよ。",
  format: "text-input",
  answer: "愛",
};

// ── じゅくごの くみたて ──
const jukugoKoseiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.jukugoKosei}.q1`,
    unitId: U.jukugoKosei,
    prompt: "「強弱（きょうじゃく）」は どんな くみたて？",
    explanation: "「強い」と「弱い」は はんたいの いみ。はんたいの いみの かんじを あわせた じゅくごだよ。",
    format: "choice",
    choices: ["はんたいの いみの かんじ", "にた いみの かんじ", "上が下を くわしくする", "下から かえって よむ"],
    answer: "はんたいの いみの かんじ",
  },
  {
    id: `${U.jukugoKosei}.q2`,
    unitId: U.jukugoKosei,
    prompt: "「岩石（がんせき）」は どんな くみたて？",
    explanation: "「岩」も「石」も いし の なかま。にた いみの かんじを あわせた じゅくごだよ。",
    format: "choice",
    choices: ["にた いみの かんじ", "はんたいの いみの かんじ", "主語と述語", "下から かえって よむ"],
    answer: "にた いみの かんじ",
  },
  {
    id: `${U.jukugoKosei}.q3`,
    unitId: U.jukugoKosei,
    prompt: "「国旗（こっき）」は どんな くみたて？",
    explanation: "「国の 旗」のように、上の字「国」が 下の字「旗」を くわしく している じゅくごだよ。",
    format: "choice",
    choices: ["上の字が 下の字を くわしくする", "はんたいの いみ", "にた いみ", "下から かえって よむ"],
    answer: "上の字が 下の字を くわしくする",
  },
  {
    id: `${U.jukugoKosei}.q4`,
    unitId: U.jukugoKosei,
    prompt: "「読書（どくしょ）」は どんな くみたて？",
    explanation: "「書（本）を 読む」のように、下の字から かえって 読む じゅくごだよ（〜を〜する の かたち）。",
    format: "choice",
    choices: ["下から かえって よむ（〜を〜する）", "はんたいの いみ", "にた いみ", "上が下を くわしくする"],
    answer: "下から かえって よむ（〜を〜する）",
  },
  {
    id: `${U.jukugoKosei}.q5`,
    unitId: U.jukugoKosei,
    prompt: "はんたいの いみの かんじを あわせた じゅくごは どれ？",
    explanation: "「高低」は「高い」と「低い」で はんたいの いみ。だから はんたいの くみたてだよ。",
    format: "choice",
    choices: ["高低", "岩石", "読書", "国旗"],
    answer: "高低",
  },
];

// ── 文の くみたて ──
const bunNoKumitateQuestions: ChoiceQuestion[] = [
  {
    id: `${U.bunNoKumitate}.q1`,
    unitId: U.bunNoKumitate,
    prompt: "「赤い 花が さく。」で 修飾語（くわしくする ことば）は どれ？",
    explanation: "「赤い」は「花」が どんな 花かを くわしく している 修飾語だよ。",
    format: "choice",
    choices: ["赤い", "花が", "さく", "が"],
    answer: "赤い",
  },
  {
    id: `${U.bunNoKumitate}.q2`,
    unitId: U.bunNoKumitate,
    prompt: "「犬が はやく 走る。」の 主語は どれ？",
    explanation: "「だれが・なにが」にあたる「犬が」が 主語だよ。",
    format: "choice",
    choices: ["犬が", "走る", "はやく", "犬"],
    answer: "犬が",
  },
  {
    id: `${U.bunNoKumitate}.q3`,
    unitId: U.bunNoKumitate,
    prompt: "「犬が はやく 走る。」の 述語は どれ？",
    explanation: "「どうする」にあたる「走る」が 述語だよ。",
    format: "choice",
    choices: ["走る", "犬が", "はやく", "犬"],
    answer: "走る",
  },
  {
    id: `${U.bunNoKumitate}.q4`,
    unitId: U.bunNoKumitate,
    prompt: "「犬が はやく 走る。」で「はやく」は なにを くわしく している？",
    explanation: "「はやく」は「走る」を くわしく して、どのように 走るかを あらわしているよ。",
    format: "choice",
    choices: ["走る", "犬が", "犬", "。"],
    answer: "走る",
  },
  {
    id: `${U.bunNoKumitate}.q5`,
    unitId: U.bunNoKumitate,
    prompt: "「修飾語」とは どんな ことば？",
    explanation: "修飾語は、ほかの ことばを くわしく する ことばだよ。「赤い 花」の「赤い」など。",
    format: "choice",
    choices: ["ほかの ことばを くわしくする ことば", "文の おわりの しるし", "だれが にあたる ことば", "音を あらわす ことば"],
    answer: "ほかの ことばを くわしくする ことば",
  },
];

// ── つなぎ言葉（接続語） ──
const tsunagiKotobaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.tsunagiKotoba}.q1`,
    unitId: U.tsunagiKotoba,
    prompt: "「雨が ふった。（　）えんそくは 中止だ。」（　）に 入る つなぎ言葉は？",
    explanation: "まえが りゆうで、あとが その けっか。だから「だから」が 入るよ（順接）。",
    format: "choice",
    choices: ["だから", "しかし", "または", "たとえば"],
    answer: "だから",
  },
  {
    id: `${U.tsunagiKotoba}.q2`,
    unitId: U.tsunagiKotoba,
    prompt: "「たくさん べんきょうした。（　）テストは わるかった。」（　）に 入るのは？",
    explanation: "まえと あとが はんたいの けっか。だから「しかし」が 入るよ（逆接）。",
    format: "choice",
    choices: ["しかし", "だから", "そして", "つまり"],
    answer: "しかし",
  },
  {
    id: `${U.tsunagiKotoba}.q3`,
    unitId: U.tsunagiKotoba,
    prompt: "「りんごを 買った。（　）みかんも 買った。」（　）に 入るのは？",
    explanation: "まえに あとを つけくわえているね。だから「そして（また）」が 入るよ。",
    format: "choice",
    choices: ["そして", "しかし", "だから", "けれども"],
    answer: "そして",
  },
  {
    id: `${U.tsunagiKotoba}.q4`,
    unitId: U.tsunagiKotoba,
    prompt: "「かれは クラスで いちばん はやい。（　）、いちばんの ランナーだ。」（　）に 入るのは？",
    explanation: "まえの ことを いいかえているね。だから「つまり」が 入るよ。",
    format: "choice",
    choices: ["つまり", "しかし", "ところが", "または"],
    answer: "つまり",
  },
  {
    id: `${U.tsunagiKotoba}.q5`,
    unitId: U.tsunagiKotoba,
    prompt: "「しかし」は どんな はたらきの つなぎ言葉？",
    explanation: "「しかし」は、まえと あとが はんたいに なることを しめす つなぎ言葉（逆接）だよ。",
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
    prompt: "「さくら」は どの きせつの 言葉？",
    explanation: "さくらは はるに さく 花。はるの きせつの 言葉だよ。",
    format: "choice",
    choices: ["はる", "なつ", "あき", "ふゆ"],
    answer: "はる",
  },
  {
    id: `${U.kisetsuKotoba}.q2`,
    unitId: U.kisetsuKotoba,
    prompt: "「せみ」は どの きせつの 言葉？",
    explanation: "せみは なつに 鳴く 虫。なつの きせつの 言葉だよ。",
    format: "choice",
    choices: ["なつ", "はる", "あき", "ふゆ"],
    answer: "なつ",
  },
  {
    id: `${U.kisetsuKotoba}.q3`,
    unitId: U.kisetsuKotoba,
    prompt: "「もみじ」は どの きせつの 言葉？",
    explanation: "もみじは あきに 赤や 黄色に なる 葉。あきの きせつの 言葉だよ。",
    format: "choice",
    choices: ["あき", "はる", "なつ", "ふゆ"],
    answer: "あき",
  },
  {
    id: `${U.kisetsuKotoba}.q4`,
    unitId: U.kisetsuKotoba,
    prompt: "「雪」は どの きせつの 言葉？",
    explanation: "雪は ふゆに そらから ふってくるね。ふゆの きせつの 言葉だよ。",
    format: "choice",
    choices: ["ふゆ", "はる", "なつ", "あき"],
    answer: "ふゆ",
  },
  {
    id: `${U.kisetsuKotoba}.q5`,
    unitId: U.kisetsuKotoba,
    prompt: "あきの きせつの 言葉は どれ？",
    explanation: "「月見（つきみ）」は あきの ぎょうじ。花火は なつ、こたつは ふゆ、さくらは はるだよ。",
    format: "choice",
    choices: ["月見", "花火", "こたつ", "さくら"],
    answer: "月見",
  },
];

// ── 慣用句・故事成語 ──
const kanyokuKojiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kanyokuKoji}.q1`,
    unitId: U.kanyokuKoji,
    prompt: "「耳を かたむける」の いみは？",
    explanation: "「耳を かたむける」は、ちゅういして よく 聞く という いみの 慣用句だよ。",
    format: "choice",
    choices: ["よく 聞く", "聞こえない ふりをする", "大きな 声を出す", "わすれる"],
    answer: "よく 聞く",
  },
  {
    id: `${U.kanyokuKoji}.q2`,
    unitId: U.kanyokuKoji,
    prompt: "「ねこの 手も 借りたい」の いみは？",
    explanation: "とても いそがしくて、だれの 手でも かりたいくらいだ、という いみだよ。",
    format: "choice",
    choices: ["とても いそがしい", "ねこが すきだ", "ひまで たいくつだ", "手が つめたい"],
    answer: "とても いそがしい",
  },
  {
    id: `${U.kanyokuKoji}.q3`,
    unitId: U.kanyokuKoji,
    prompt: "「頭を ひねる」の いみは？",
    explanation: "「頭を ひねる」は、いっしょうけんめい 考える という いみの 慣用句だよ。",
    format: "choice",
    choices: ["いっしょうけんめい 考える", "頭が いたい", "おこる", "ねむくなる"],
    answer: "いっしょうけんめい 考える",
  },
  {
    id: `${U.kanyokuKoji}.q4`,
    unitId: U.kanyokuKoji,
    prompt: "故事成語「五十歩百歩（ごじっぽひゃっぽ）」の いみは？",
    explanation: "すこしの ちがいは あっても、だいたい おなじで たいした ちがいは ない、という いみだよ。",
    format: "choice",
    choices: ["たいして ちがいが ない", "とても 大きな ちがいだ", "百ばい りっぱだ", "あるく のが はやい"],
    answer: "たいして ちがいが ない",
  },
  {
    id: `${U.kanyokuKoji}.q5`,
    unitId: U.kanyokuKoji,
    prompt: "故事成語「漁夫の利（ぎょふのり）」の いみは？",
    explanation: "二人が あらそって いる あいだに、ほかの 人が とくを する こと、という いみだよ。",
    format: "choice",
    choices: ["あらそいの あいだに ほかの人が とくをする", "魚つりが じょうずだ", "りょうしが もうかる", "あらそいに かつ"],
    answer: "あらそいの あいだに ほかの人が とくをする",
  },
  {
    id: `${U.kanyokuKoji}.q6`,
    unitId: U.kanyokuKoji,
    prompt: "「矛盾（むじゅん）」の いみは？",
    explanation: "言っている ことの つじつまが あわない こと、という いみの 故事成語だよ。",
    format: "choice",
    choices: ["つじつまが あわない", "とても かたい", "強い ぶき", "正しい こと"],
    answer: "つじつまが あわない",
  },
];

// ── せつめい文を 読んで 要約する ──
// 短い説明文を prompt に提示し、要点・要約を読みとる。
const SETSUMEI =
  "【せつめい文】ペンギンは とりですが、そらを とびません。そのかわり、つばさを つかって 海の中を じょうずに およぎます。";

const setsumeiYouyakuQuestions: ChoiceQuestion[] = [
  {
    id: `${U.setsumeiYouyaku}.q1`,
    unitId: U.setsumeiYouyaku,
    prompt: `${SETSUMEI}\n──ペンギンは そらを とぶ？`,
    explanation: "「そらを とびません」と 書いてあるね。だから「とばない」が こたえだよ。",
    format: "choice",
    choices: ["とばない", "とぶ", "ときどき とぶ", "わからない"],
    answer: "とばない",
  },
  {
    id: `${U.setsumeiYouyaku}.q2`,
    unitId: U.setsumeiYouyaku,
    prompt: `${SETSUMEI}\n──ペンギンは つばさを なにに つかう？`,
    explanation: "「つばさを つかって 海の中を およぎます」と あるね。およぐために つかうよ。",
    format: "choice",
    choices: ["海を およぐため", "そらを とぶため", "あるくため", "食べるため"],
    answer: "海を およぐため",
  },
  {
    id: `${U.setsumeiYouyaku}.q3`,
    unitId: U.setsumeiYouyaku,
    prompt: `${SETSUMEI}\n──この文の 要点（いちばん つたえたいこと）は どれ？`,
    explanation: "中心は「ペンギンは つばさで 海を およぐ とり」ということ。これが 要点だよ。",
    format: "choice",
    choices: [
      "ペンギンは つばさで 海を およぐ とりだ",
      "ペンギンは そらを 高く とぶ",
      "ペンギンは 虫を 食べる",
      "ペンギンは とりでは ない",
    ],
    answer: "ペンギンは つばさで 海を およぐ とりだ",
  },
  {
    id: `${U.setsumeiYouyaku}.q4`,
    unitId: U.setsumeiYouyaku,
    prompt: "文を 要約する とき たいせつな ことは どれ？",
    explanation: "要約は、中心と なる 語や 文を えらんで、みじかく まとめることが たいせつだよ。",
    format: "choice",
    choices: [
      "中心と なる 語や 文を えらぶ",
      "ぜんぶの 文を そのまま うつす",
      "さいごの 一文だけ よむ",
      "すきな ところだけ えらぶ",
    ],
    answer: "中心と なる 語や 文を えらぶ",
  },
];

// ── 物語の 心情を 読み取る ──
const MONOGATARI =
  "【物語】けんは リレーの せんしゅに えらばれなかった。下を むいて 家に かえった。でも つぎの日、「もう一ど チャレンジしよう」と きめ、にっこり わらった。";

const monogatariShinjoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.monogatariShinjo}.q1`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──えらばれなかった とき、けんは どんな 気もち？`,
    explanation: "せんしゅに えらばれず、下を むいているね。がっかりした かなしい 気もちだよ。",
    format: "choice",
    choices: ["がっかりした 気もち", "うれしい 気もち", "おこった 気もち", "ねむい 気もち"],
    answer: "がっかりした 気もち",
  },
  {
    id: `${U.monogatariShinjo}.q2`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──「下を むいて かえった」から わかる 気もちは？`,
    explanation: "下を むく ようすから、元気が なく 落ちこんでいる 気もちが わかるよ。",
    format: "choice",
    choices: ["落ちこんでいる", "わくわくしている", "おなかが すいている", "いそいでいる"],
    answer: "落ちこんでいる",
  },
  {
    id: `${U.monogatariShinjo}.q3`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──つぎの日、けんの 気もちは どう かわった？`,
    explanation: "「もう一ど チャレンジしよう」と きめているね。まえむきな 気もちに かわったよ。",
    format: "choice",
    choices: ["まえむきに なった", "もっと かなしくなった", "おこりだした", "なにも 思わなかった"],
    answer: "まえむきに なった",
  },
  {
    id: `${U.monogatariShinjo}.q4`,
    unitId: U.monogatariShinjo,
    prompt: `${MONOGATARI}\n──さいごに けんが にっこり わらったのは なぜ？`,
    explanation: "「もう一ど チャレンジしよう」と きめて、気もちが まえむきに なったから わらったんだよ。",
    format: "choice",
    choices: [
      "もう一ど がんばろうと きめたから",
      "せんしゅに えらばれたから",
      "リレーが なくなったから",
      "ともだちに わらわれたから",
    ],
    answer: "もう一ど がんばろうと きめたから",
  },
];

export const kokugoG4Contents: Record<string, UnitContent> = {
  [U.kanjiGrade4]: {
    unitId: U.kanjiGrade4,
    learn: {
      unitId: U.kanjiGrade4,
      steps: [
        {
          heading: "4年生は 202字",
          body: "4年生では あたらしく 202字の かんじを ならうよ。「愛・健康・観察・成功」など、いみの ある 言葉で おぼえると わすれにくいね。",
          visual: { kind: "emoji", value: "📖✏️", caption: "202字に ちょうせん" },
        },
        {
          heading: "音と訓（おんとくん）",
          body: "おなじ かんじにも、おんよみ と くんよみが あるよ。れい:「成」は「せい（成功）」と「なる」。",
          visual: { kind: "emoji", value: "🔤", caption: "おんよみ・くんよみ" },
        },
        {
          heading: "言葉で おぼえよう",
          body: "一字ずつより、「観察する」「健康な 体」のように 言葉や 文で おぼえると、つかいかたも 身につくよ。",
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
          heading: "二字熟語の くみたて",
          body: "二つの かんじで できた言葉を 二字熟語というよ。くみたてには いくつかの しゅるいが あるんだ。",
          visual: { kind: "emoji", value: "🧩", caption: "かんじ＋かんじ" },
        },
        {
          heading: "にた いみ・はんたいの いみ",
          body: "「岩石」は にた いみ、「強弱」は はんたいの いみの くみあわせ。いみを かんがえると 見分けられるよ。",
          visual: { kind: "emoji", value: "⛰️↔️", caption: "岩石 / 強弱" },
        },
        {
          heading: "くわしくする・かえって よむ",
          body: "「国旗」は 上が下を くわしくする、「読書」は「書を 読む」と 下から かえって よむ くみたてだよ。",
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
          heading: "主語と 述語",
          body: "「だれが・なにが」が 主語、「どうする・どんなだ」が 述語。文の ほねぐみだよ。",
          visual: { kind: "emoji", value: "🐕🏃", caption: "犬が（主語）走る（述語）" },
        },
        {
          heading: "修飾語",
          body: "「赤い 花」「はやく 走る」の「赤い」「はやく」のように、ほかの 言葉を くわしくする 言葉を 修飾語というよ。",
          visual: { kind: "emoji", value: "🌸", caption: "赤い→花を くわしく" },
        },
        {
          heading: "つないで 長い文に",
          body: "主語・述語に 修飾語を くわえると、ようすが くわしく わかる 文に なるよ。",
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
          heading: "つなぎ言葉って なに？",
          body: "文と 文を つなぐ 言葉を つなぎ言葉（接続語）というよ。「だから」「しかし」などだね。",
          visual: { kind: "emoji", value: "🔗", caption: "文と文を つなぐ" },
        },
        {
          heading: "じゅんせつ と ぎゃくせつ",
          body: "りゆう→けっか は「だから」（順接）、はんたいの けっかは「しかし」（逆接）で つなぐよ。",
          visual: { kind: "emoji", value: "➡️↩️", caption: "だから / しかし" },
        },
        {
          heading: "つけたす・いいかえる",
          body: "「そして・また」で つけたし、「つまり」で いいかえ。つなぎ言葉で 文の かんけいが はっきりするよ。",
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
          heading: "きせつの 言葉",
          body: "日本には 春・夏・秋・冬 の 四つの きせつが あり、それぞれに あう 言葉が あるよ。",
          visual: { kind: "emoji", value: "🌸🌻🍁⛄", caption: "春・夏・秋・冬" },
        },
        {
          heading: "見つけて つかおう",
          body: "「さくら（春）」「せみ（夏）」「もみじ（秋）」「雪（冬）」など。手紙や 作文に つかうと きせつが つたわるよ。",
          visual: { kind: "emoji", value: "✉️", caption: "手紙に きせつを" },
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
          heading: "慣用句（かんようく）",
          body: "二つ以上の 言葉が むすびついて、とくべつな いみを あらわす いいまわしを 慣用句というよ。れい:「耳を かたむける」＝よく 聞く。",
          visual: { kind: "emoji", value: "👂", caption: "耳を かたむける" },
        },
        {
          heading: "故事成語（こじせいご）",
          body: "むかしの 中国の はなし（故事）から できた 言葉を 故事成語というよ。れい:「五十歩百歩」「漁夫の利」。",
          visual: { kind: "emoji", value: "📜", caption: "むかしの はなしから" },
        },
        {
          heading: "気もちや ようすを みじかく",
          body: "慣用句や 故事成語を つかうと、気もちや ようすを みじかく うまく つたえられるよ。",
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
          heading: "なにに ついての 文かな",
          body: "せつめい文は、まず「なにに ついて」書いてあるかを つかもう。だんらくごとの 話題に 注目だよ。",
          visual: { kind: "emoji", value: "🐧", caption: "ペンギンの せつめい" },
        },
        {
          heading: "中心と なる 文を さがす",
          body: "いちばん つたえたい「中心と なる 文」を 見つけると、要点が わかるよ。",
          visual: { kind: "emoji", value: "🔍", caption: "中心の 文を さがす" },
        },
        {
          heading: "みじかく まとめる＝要約",
          body: "中心と なる 語や 文を つかって、みじかく まとめることを 要約というよ。",
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
          heading: "気もちは どこに 出る？",
          body: "とうじょう人ぶつの 言葉・ようす・行どう（うごき）から、気もちを 読みとろう。「下を むく」＝落ちこむ など。",
          visual: { kind: "emoji", value: "😔", caption: "ようすから 気もちを" },
        },
        {
          heading: "気もちの うつりかわり",
          body: "おはなしの はじめと おわりで、気もちが どう かわったかを おさえると、物語が ふかく わかるよ。",
          visual: { kind: "emoji", value: "😔➡️😊", caption: "落ちこむ→まえむき" },
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
