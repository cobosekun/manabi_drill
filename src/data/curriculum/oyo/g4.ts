// ══════════════════════════════════════════
// カリキュラム: 応用（おうよう）小4 ─ 拡張カテゴリ（大学レベルをやさしく）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 表記規約: 全表示テキストは「漢字＋全漢字ルビ」記法 {漢字|よみ} で執筆（RubyText が描画）。
//          formalName など管理用の正式名は素の漢字でよい（表示は name 側を使う）。
// 設計方針（応用4段ルール）: 各 Unit の learn は必ず
//   ① 身近な具体 → ② 図・操作で体感 → ③ きまり発見 → ④ やってみる の4ステップ。
//   「むずかしいことを背伸びで見せる」のではなく「本質をやさしく・手を動かして解ける」を厳守。
// 小4の選定: 具体物・図で理解し実際に解ける単元に厳選（論理/集合/確率/統計/数列/対称）。
//   二進法・素数暗号・アルゴリズム・経済はより高学年で踏み込む想定【申し送り】。
// 【申し送り】"oyo" は src/types/drill.ts の SubjectId union に既に追加済みのため、
//   kyoyo のような as 局所キャストは不要（中央対応済み）。subject/domain は他グレードと
//   同一 id を想定（中央集約時に id 重複排除）。leadsTo/prerequisites は本ファイル内で
//   解決する DAG として閉じている（学年間・他教科接続は中央集約時に拡張）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  Question,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const oyoSubject: Subject = {
  id: "oyo",
  name: "{応用|おうよう}",
  formalName: "応用",
  emoji: "🚀",
  theme: "violet",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// 大学レベルの数学概念を、小4が手を動かして解ける範囲で領域化（学年非依存の id）。

export const oyoG4Domains: Domain[] = [
  {
    id: "oyo.logic",
    subjectId: "oyo",
    name: "ろんり・パズル",
    formalName: "論理",
  },
  {
    id: "oyo.sets",
    subjectId: "oyo",
    name: "しゅうごう（なかま{分|わ}け）",
    formalName: "集合",
  },
  {
    id: "oyo.probability",
    subjectId: "oyo",
    name: "かくりつ（{起|お}こりやすさ）",
    formalName: "確率",
  },
  {
    id: "oyo.statistics",
    subjectId: "oyo",
    name: "とうけい（データ）",
    formalName: "統計",
  },
  {
    id: "oyo.pattern",
    subjectId: "oyo",
    name: "すうれつ・パターン",
    formalName: "数列・規則",
  },
  {
    id: "oyo.shape-topology",
    subjectId: "oyo",
    name: "かたちの ふしぎ（{対称|たいしょう}）",
    formalName: "トポロジー・対称",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（本ファイル内で閉じる DAG / 循環なし）:
//
//   logic ──▶ sets ──▶ probability ──▶ statistics
//   pattern（独立の入口）
//   symmetry（独立の入口）
//
const U = {
  logic: "oyo.g4.logic-puzzle",
  sets: "oyo.g4.sets-venn",
  probability: "oyo.g4.probability-basics",
  statistics: "oyo.g4.statistics-average",
  pattern: "oyo.g4.number-pattern",
  symmetry: "oyo.g4.symmetry-onestroke",
} as const;

export const oyoG4Units: Unit[] = [
  {
    id: U.logic,
    subjectId: "oyo",
    grade: 4,
    domainId: "oyo.logic",
    title: "ろんり・パズル（ぜんぶ・ある・ない）",
    order: 1,
    realWorldUse:
      "コンピュータの「もし〜なら」や プログラム、なぞときに つかうよ。{正|ただ}しく かんがえる ちからは {数学|すうがく}の {証明|しょうめい}や AI の どだいに なるよ。",
    leadsTo: [U.sets],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sets,
    subjectId: "oyo",
    grade: 4,
    domainId: "oyo.sets",
    title: "しゅうごう・ベン{図|ず}（なかま{分|わ}け）",
    order: 2,
    realWorldUse:
      "{図書館|としょかん}の {本|ほん}の {分類|ぶんるい}や、けんさくで「AかつB」を しぼる ときに つかうよ。{高校|こうこう}・{大学|だいがく}の {集合|しゅうごう}の {考|かんが}え{方|かた}の {入口|いりぐち}だよ。",
    leadsTo: [U.probability],
    prerequisites: [U.logic],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.probability,
    subjectId: "oyo",
    grade: 4,
    domainId: "oyo.probability",
    title: "かくりつ（さいころと くじ）",
    order: 3,
    realWorldUse:
      "{天気|てんき}よほうの「{降水|こうすい}かくりつ」や、ゲーム・ほけんの {計算|けいさん}に つかうよ。{起|お}こりやすさを {数|かず}で あらわす {大学|だいがく}の かくりつろんに つながるよ。",
    leadsTo: [U.statistics],
    prerequisites: [U.sets],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.statistics,
    subjectId: "oyo",
    grade: 4,
    domainId: "oyo.statistics",
    title: "とうけい（へいきんと グラフ）",
    order: 4,
    realWorldUse:
      "テストの へいきんてんや、アンケートの けっか、ニュースの グラフを {読|よ}む ときに つかうよ。データから {真実|しんじつ}を {見|み}ぬく とうけいがくの {入口|いりぐち}だよ。",
    leadsTo: [],
    prerequisites: [U.probability],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.pattern,
    subjectId: "oyo",
    grade: 4,
    domainId: "oyo.pattern",
    title: "すうれつ・パターン（ふえ{方|かた}の きまり）",
    order: 5,
    realWorldUse:
      "{植物|しょくぶつ}の はの ならび{方|かた}や、{音楽|おんがく}・もようの くりかえしに かくれて いるよ。{大学|だいがく}の すうれつ・かんすうの {考|かんが}え{方|かた}に つながるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.symmetry,
    subjectId: "oyo",
    grade: 4,
    domainId: "oyo.shape-topology",
    title: "かたちの ふしぎ（{対称|たいしょう}と {一筆書|ひとふでが}き）",
    order: 6,
    realWorldUse:
      "デザインや けんちく、ちずの ルート{探|さが}しに つかうよ。{一筆書|ひとふでが}きは {大学|だいがく}の グラフりろん（トポロジー）の はじまりだよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn[4段] + テスト test） ──────────────
// テストは固定 questions[]（choice / number-input / ordering / matching を使い分け）。
// 全問 explanation 必須。全文ルビ記法。

// ══════════════════════════════════════════
// 1. ろんり・パズル
// ══════════════════════════════════════════
const logicQuestions: Question[] = [
  {
    id: `${U.logic}.q-1`,
    unitId: U.logic,
    prompt: "「{犬|いぬ}は ぜんぶ {動物|どうぶつ}」は ただしいよ。では「{動物|どうぶつ}は ぜんぶ {犬|いぬ}」は？",
    explanation:
      "{犬|いぬ}は {動物|どうぶつ}の なかまの {一部|いちぶ}だけ。ねこも {動物|どうぶつ}だから「{動物|どうぶつ}は ぜんぶ {犬|いぬ}」は まちがいだよ。{逆|ぎゃく}は いつも {正|ただ}しいとは かぎらないんだ。",
    visual: { kind: "emoji", value: "🐶🐱🐰", caption: "{動物|どうぶつ}には いろいろ いる" },
    format: "choice",
    choices: ["まちがい", "ただしい", "どちらとも いえない", "{犬|いぬ}しか いない"],
    answer: "まちがい",
  },
  {
    id: `${U.logic}.q-2`,
    unitId: U.logic,
    prompt: "「すべての りんごは あかい」が うそだと いえるのは どんな とき？",
    explanation:
      "「すべて」を くずすには、あてはまらない {例|れい}が たった 1こ あれば いいよ。あかくない りんごが 1こ でも あれば うそだと いえるんだ（{反例|はんれい}）。",
    visual: { kind: "emoji", value: "🍏🍎", caption: "みどりの りんごが 1こ" },
    format: "choice",
    choices: [
      "あかくない りんごが 1こ でも あるとき",
      "あかい りんごが あるとき",
      "りんごが おいしいとき",
      "りんごが たくさん あるとき",
    ],
    answer: "あかくない りんごが 1こ でも あるとき",
  },
  {
    id: `${U.logic}.q-3`,
    unitId: U.logic,
    prompt: "「もし〜なら」で つながる ものを むすぼう。",
    explanation:
      "「もし {雨|あめ}なら かさ」「もし さむいなら コート」のように、じょうけんと けっかは セットで かんがえるよ。これが プログラムの「if（もし）」の もとだよ。",
    visual: { kind: "emoji", value: "🌧️🧥", caption: "じょうけん → けっか" },
    format: "matching",
    left: ["{雨|あめ}が ふる", "さむい", "おなかが すいた"],
    right: ["かさを さす", "コートを きる", "ごはんを たべる"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.logic}.q-4`,
    unitId: U.logic,
    prompt: "AとBの ふたり。{1人|ひとり}は いつも {本当|ほんとう}、{1人|ひとり}は いつも うそ。Aが「ぼくは うそつき」と いった。これは？",
    explanation:
      "{本当|ほんとう}の{人|ひと}なら「うそつき」と いわない。うそつきは ほんとうは うそつきだけど『うそ』を いうから「うそつき」とは いえない。どちらでも あわない＝この {発言|はつげん}は ありえないんだ。",
    visual: { kind: "emoji", value: "🤔", caption: "うそつきの パラドックス" },
    format: "choice",
    choices: ["どちらでも ありえない", "Aは {本当|ほんとう}の{人|ひと}", "Aは うそつき", "Bが うそつき"],
    answer: "どちらでも ありえない",
  },
  {
    id: `${U.logic}.q-5`,
    unitId: U.logic,
    prompt: "「{犬|いぬ}でも ねこでも ない どうぶつ」は つぎの どれ？",
    explanation:
      "「{犬|いぬ}」の なかまにも「ねこ」の なかまにも {入|はい}らない ものを えらぶよ。うさぎは どちらでも ない から せいかい。ベン{図|ず}の どちらの {丸|まる}にも {入|はい}らない ばしょだね。",
    visual: { kind: "emoji", value: "🐰", caption: "うさぎ" },
    format: "choice",
    choices: ["うさぎ", "{子犬|こいぬ}", "{子|こ}ねこ", "{大|おお}きい {犬|いぬ}"],
    answer: "うさぎ",
  },
  {
    id: `${U.logic}.q-6`,
    unitId: U.logic,
    prompt: "「すずめは {鳥|とり}」「{鳥|とり}は そらを とぶ」。では すずめは？",
    explanation:
      "「すずめは {鳥|とり}」「{鳥|とり}は そらを とぶ」の ふたつを つなげると、すずめも そらを とぶと いえるよ。じょうけんを つなげて こたえを {導|みちび}く ことを「{三段論法|さんだんろんぽう}」と いうんだ。",
    visual: { kind: "emoji", value: "🐦", caption: "つなげて かんがえる" },
    format: "choice",
    choices: ["そらを とぶ", "およぐ", "はしる だけ", "{鳥|とり}じゃ ない"],
    answer: "そらを とぶ",
  },
  {
    id: `${U.logic}.q-7`,
    unitId: U.logic,
    prompt: "「{赤|あか}くて {丸|まる}い」ボール。{青|あお}くて {丸|まる}い ボールは これに あてはまる？",
    explanation:
      "「{赤|あか}くて {丸|まる}い」は、{赤|あか}い『かつ』{丸|まる}いの りょうほうが いるよ。{青|あお}い ボールは {丸|まる}くても {赤|あか}くないから あてはまらない。「かつ（AND）」は きびしい じょうけんだね。",
    visual: { kind: "emoji", value: "🔴🔵", caption: "りょうほう いる？" },
    format: "choice",
    choices: ["あてはまらない", "あてはまる", "{丸|まる}いから あてはまる", "わからない"],
    answer: "あてはまらない",
  },
  {
    id: `${U.logic}.q-8`,
    unitId: U.logic,
    prompt: "「{赤|あか}い か {青|あお}い ふうせん」。みどりの ふうせんは あてはまる？",
    explanation:
      "「{赤|あか}い『または』{青|あお}い」は、どちらか 1つでも あえば OK。でも みどりは {赤|あか}でも {青|あお}でも ないから あてはまらないよ。「または（OR）」は やさしい じょうけんだね。",
    visual: { kind: "emoji", value: "🎈", caption: "どちらか あえば OK" },
    format: "choice",
    choices: ["あてはまらない", "あてはまる", "{赤|あか}だから あてはまる", "どちらとも いえない"],
    answer: "あてはまらない",
  },
  {
    id: `${U.logic}.q-9`,
    unitId: U.logic,
    prompt: "「{犬|いぬ}では ない どうぶつ」に あてはまるのは どれ？",
    explanation:
      "「〜では ない（NOT）」は、その なかまを ぜんぶ そとに する ことばだよ。ねこは {犬|いぬ}じゃ ない から あてはまる。{子犬|こいぬ}や しろい {犬|いぬ}は {犬|いぬ}だから あてはまらないね。",
    visual: { kind: "emoji", value: "🐱", caption: "{犬|いぬ}いがいを えらぶ" },
    format: "choice",
    choices: ["ねこ", "{子犬|こいぬ}", "{大|おお}きい {犬|いぬ}", "しろい {犬|いぬ}"],
    answer: "ねこ",
  },
  {
    id: `${U.logic}.q-10`,
    unitId: U.logic,
    prompt: "「すべての {数|かず}は 5より おおきい」が うそだと いえる {数|かず}は？",
    explanation:
      "「すべて」を くずすには、あてはまらない {例|れい}（{反例|はんれい}）を 1つ さがすよ。3 は 5より おおきく ない から、これ 1つで うそだと いえるんだ。",
    visual: { kind: "emoji", value: "3️⃣", caption: "1つでも あれば くずれる" },
    format: "choice",
    choices: ["3", "6", "8", "10"],
    answer: "3",
  },
  {
    id: `${U.logic}.q-11`,
    unitId: U.logic,
    prompt: "クラス ぜんいんが {帽子|ぼうし}を かぶって いる。これは「ぜんぶ・ある・ない」の どれ？",
    explanation:
      "ひとり {残|のこ}らず かぶって いるなら「ぜんぶ（すべて）」だよ。{何人|なんにん}かなら「ある（いる）」、ひとりも いなければ「ない」と {使|つか}い{分|わ}けるんだ。",
    visual: { kind: "emoji", value: "🧢🧢🧢", caption: "ひとり のこらず" },
    format: "choice",
    choices: ["ぜんぶ", "ある", "ない", "はんぶん"],
    answer: "ぜんぶ",
  },
  {
    id: `${U.logic}.q-12`,
    unitId: U.logic,
    prompt: "クラスで かさを もって いる {人|ひと}は ひとりも いない。これは どれ？",
    explanation:
      "ひとりも いない＝0{人|にん}の ときは「ない」だよ。「ぜんぶ」「ある」「ない」の 3つを はっきり {区別|くべつ}できると ろんりが つよく なるよ。",
    visual: { kind: "emoji", value: "🚫☂️", caption: "ひとりも いない" },
    format: "choice",
    choices: ["ない", "ぜんぶ", "ある", "おおい"],
    answer: "ない",
  },
  {
    id: `${U.logic}.q-13`,
    unitId: U.logic,
    prompt: "クラスで {何人|なんにん}かが めがねを かけて いる。これは どれ？",
    explanation:
      "ぜんいんでも 0{人|にん}でも なく、{何人|なんにん}か いる ときは「ある（いる）」だよ。「すくなくとも ひとりは いる」ことを あらわす ことばなんだ。",
    visual: { kind: "emoji", value: "👓", caption: "{何人|なんにん}か いる" },
    format: "choice",
    choices: ["ある（いる）", "ぜんぶ", "ない", "ぜろ"],
    answer: "ある（いる）",
  },
  {
    id: `${U.logic}.q-14`,
    unitId: U.logic,
    prompt: "「もし {雨|あめ}なら かさを さす」。いま {雨|あめ}が ふって いる。どう する？",
    explanation:
      "じょうけん「{雨|あめ}」が {本当|ほんとう}に なったから、けっか「かさを さす」が おきるよ。「もし〜なら」の じょうけんが あった ときに けっかが きまる、これが プログラムの「if」と おなじ かんがえ{方|かた}だよ。",
    visual: { kind: "emoji", value: "🌧️☂️", caption: "じょうけん → けっか" },
    format: "choice",
    choices: ["かさを さす", "かさを ささない", "ねる", "はしる"],
    answer: "かさを さす",
  },
  {
    id: `${U.logic}.q-15`,
    unitId: U.logic,
    prompt:
      "3つの はこ（{赤|あか}・{青|あお}・{黄|き}）。1つだけ あたり。「{赤|あか}は はずれ」「{青|あお}は はずれ」と わかった。あたりは？",
    explanation:
      "{赤|あか}も {青|あお}も はずれと わかったので、のこった {黄|き}いろが あたりだね。あてはまらない ものを {消|け}して いって こたえを {見|み}つける、これも ろんりの ちからだよ。",
    visual: { kind: "emoji", value: "🟨", caption: "のこりは {黄|き}いろ" },
    format: "choice",
    choices: ["{黄|き}いろ", "{赤|あか}", "{青|あお}", "どれも はずれ"],
    answer: "{黄|き}いろ",
  },
  {
    id: `${U.logic}.q-16`,
    unitId: U.logic,
    prompt: "「すべての ねこは どうぶつ」「タマは ねこ」。タマは どうぶつ？",
    explanation:
      "「ねこは どうぶつ」「タマは ねこ」を つなげると、タマも どうぶつだと いえるね。これも {三段論法|さんだんろんぽう}。{正|ただ}しい じょうけんを つなぐと {正|ただ}しい こたえに なるよ。",
    visual: { kind: "emoji", value: "🐈", caption: "ねこ → どうぶつ" },
    format: "choice",
    choices: ["どうぶつ", "どうぶつじゃ ない", "{鳥|とり}", "わからない"],
    answer: "どうぶつ",
  },
  {
    id: `${U.logic}.q-17`,
    unitId: U.logic,
    prompt: "せが たかい じゅんに ならべよう。A=120cm・B=130cm・C=125cm。",
    explanation:
      "{数|かず}を くらべて たかい じゅんに ならべると B(130)→C(125)→A(120)。じょうほうを ただしく ならべる ことも ろんりの きほんだよ。",
    visual: { kind: "emoji", value: "📏", caption: "たかい じゅん" },
    format: "ordering",
    items: ["A(120cm)", "B(130cm)", "C(125cm)"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.logic}.q-18`,
    unitId: U.logic,
    prompt: "「もし〜なら」で つながる ものを むすぼう。",
    explanation:
      "「{暗|くら}いなら {電気|でんき}」「のどが かわいたら {水|みず}」「{眠|ねむ}いなら {寝|ね}る」。じょうけんと けっかは セットで かんがえると わかりやすいよ。",
    visual: { kind: "emoji", value: "💡💧😴", caption: "じょうけん → けっか" },
    format: "matching",
    left: ["{暗|くら}い", "のどが かわいた", "{眠|ねむ}い"],
    right: ["{電気|でんき}を つける", "{水|みず}を のむ", "{寝|ね}る"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.logic}.q-19`,
    unitId: U.logic,
    prompt:
      "「{犬|いぬ}は どうぶつ」は ただしい。では ぎゃくの「どうぶつは ぜんぶ {犬|いぬ}」は？",
    explanation:
      "「{犬|いぬ}は どうぶつ」が ただしくても、ぎゃくに した「どうぶつは ぜんぶ {犬|いぬ}」は まちがい。ねこを {反例|はんれい}に すれば くずれるね。ぎゃくは いつも ただしいとは かぎらないんだ。",
    visual: { kind: "emoji", value: "🐱", caption: "ぎゃくは あやしい" },
    format: "choice",
    choices: ["まちがい", "ただしい", "どちらとも いえない", "かならず ただしい"],
    answer: "まちがい",
  },
  {
    id: `${U.logic}.q-20`,
    unitId: U.logic,
    prompt: "「{暗|くら}いなら {電気|でんき}を つける」。いま {明|あか}るい。{電気|でんき}は かならず つける？",
    explanation:
      "じょうけん「{暗|くら}い」が おきて いない ときは、けっか「{電気|でんき}を つける」は きまって いないよ。だから「かならず つける」とは いえないんだ。じょうけんを よく {見|み}る ことが {大切|たいせつ}だよ。",
    visual: { kind: "emoji", value: "☀️", caption: "じょうけんが おきて いない" },
    format: "choice",
    choices: ["つけるとは かぎらない", "かならず つける", "ぜったい つけない", "{暗|くら}く なる"],
    answer: "つけるとは かぎらない",
  },
];

// ══════════════════════════════════════════
// 2. しゅうごう・ベン図
// ══════════════════════════════════════════
const setsQuestions: Question[] = [
  {
    id: `${U.sets}.q-1`,
    unitId: U.sets,
    prompt:
      "「{赤|あか}い くだもの」と「{丸|まる}い くだもの」の りょうほうに {入|はい}るのは どれ？",
    explanation:
      "りんごは {赤|あか}くて {丸|まる}い。だから ふたつの なかまが かさなる ところ（{共通|きょうつう}）に {入|はい}るよ。これを ベン{図|ず}の「かさなり」と いうよ。",
    visual: { kind: "emoji", value: "🍎", caption: "{赤|あか}くて {丸|まる}い" },
    format: "choice",
    choices: ["りんご", "バナナ", "きゅうり", "ぶどう"],
    answer: "りんご",
  },
  {
    id: `${U.sets}.q-2`,
    unitId: U.sets,
    prompt: "なかま{分|わ}けで、おなじ なかまどうしを むすぼう。",
    explanation:
      "「{乗|の}りもの」「くだもの」「どうぶつ」のように、おなじ {仲間|なかま}に {入|はい}る ものを あつめる ことを「{集合|しゅうごう}を {作|つく}る」と いうよ。",
    visual: { kind: "emoji", value: "🚗🍓🐶", caption: "なかま{分|わ}け" },
    format: "matching",
    left: ["バス", "みかん", "ライオン"],
    right: ["{乗|の}りもの", "くだもの", "どうぶつ"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.sets}.q-3`,
    unitId: U.sets,
    prompt:
      "クラスで いぬが すきな{人|ひと} 8{人|にん}、ねこが すきな{人|ひと} 5{人|にん}、{両方|りょうほう}すきな{人|ひと} 3{人|にん}。いぬ「だけ」すきな{人|ひと}は {何人|なんにん}？",
    explanation:
      "いぬが すき 8{人|にん}の うち、{両方|りょうほう}すきな 3{人|にん}を のぞくと いぬ「だけ」が のこるよ。8 ひく 3 で 5{人|にん}。ベン{図|ず}の かさならない ところだね。",
    visual: { kind: "emoji", value: "🐶", caption: "8 − 3 = 5" },
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.sets}.q-4`,
    unitId: U.sets,
    prompt:
      "「{偶数|ぐうすう}（2で わりきれる)」の {集合|しゅうごう}に {入|はい}る {数|かず}は どれ？",
    explanation:
      "2で わりきれる {数|かず}を {偶数|ぐうすう}と いうよ。6 は 2で わると 3 で わりきれるから {偶数|ぐうすう}。7 は わりきれないから {入|はい}らないよ。",
    visual: { kind: "emoji", value: "🔢", caption: "2で わりきれる" },
    format: "choice",
    choices: ["6", "7", "9", "11"],
    answer: "6",
  },
  {
    id: `${U.sets}.q-5`,
    unitId: U.sets,
    prompt:
      "りんご・みかん・バナナ ぜんぶを ふくむ おおきな なかまの {名前|なまえ}は？",
    explanation:
      "りんごも みかんも バナナも ぜんぶ「くだもの」だね。ぜんぶを ふくむ いちばん {大|おお}きな なかまを「{全体集合|ぜんたいしゅうごう}」と いうよ。",
    visual: { kind: "emoji", value: "🍎🍊🍌", caption: "ぜんぶ くだもの" },
    format: "choice",
    choices: ["くだもの", "やさい", "{乗|の}りもの", "どうぶつ"],
    answer: "くだもの",
  },
  {
    id: `${U.sets}.q-6`,
    unitId: U.sets,
    prompt: "「そらを とぶ」と「{鳥|とり}」の {両方|りょうほう}に {入|はい}るのは どれ？",
    explanation:
      "すずめは {鳥|とり}で、そらも とぶ。だから ふたつの なかまが かさなる ところに {入|はい}るよ。ひこうきは とぶけど {鳥|とり}じゃ ない、ねこは {鳥|とり}でも とびもしないね。",
    visual: { kind: "emoji", value: "🐦", caption: "とぶ かつ {鳥|とり}" },
    format: "choice",
    choices: ["すずめ", "ひこうき", "ねこ", "{魚|さかな}"],
    answer: "すずめ",
  },
  {
    id: `${U.sets}.q-7`,
    unitId: U.sets,
    prompt: "「{算数|さんすう}すき」7{人|にん}、「{国語|こくご}すき」6{人|にん}、{両方|りょうほう}すき 4{人|にん}。{算数|さんすう}「だけ」すきは {何人|なんにん}？",
    explanation:
      "{算数|さんすう}すき 7{人|にん}から、{両方|りょうほう}すきの 4{人|にん}を のぞくと {算数|さんすう}「だけ」が のこるよ。7 ひく 4 で 3{人|にん}。ベン{図|ず}の かさならない ところだね。",
    visual: { kind: "emoji", value: "🔢", caption: "7 − 4 = 3" },
    format: "number-input",
    answer: 3,
  },
  {
    id: `${U.sets}.q-8`,
    unitId: U.sets,
    prompt: "いぬすき 8{人|にん}、ねこすき 5{人|にん}、{両方|りょうほう}すき 3{人|にん}。どちらか すきな {人|ひと}は ぜんぶで {何人|なんにん}？",
    explanation:
      "8 たす 5 だと、{両方|りょうほう}すきの 3{人|にん}を 2かい かぞえて しまう。だから 8＋5−3＝10{人|にん}。かさなりを 1かい ひくのが コツだよ。",
    visual: { kind: "emoji", value: "🐶🐱", caption: "8 + 5 − 3 = 10" },
    format: "number-input",
    answer: 10,
  },
  {
    id: `${U.sets}.q-9`,
    unitId: U.sets,
    prompt: "1・3・5・7 の {数|かず}の なかまを なんと いう？",
    explanation:
      "2で わりきれない {数|かず}を「{奇数|きすう}」と いうよ。1・3・5・7・9… と つづくね。2で わりきれる 2・4・6 は「{偶数|ぐうすう}」だよ。",
    visual: { kind: "emoji", value: "🔢", caption: "わりきれない なかま" },
    format: "choice",
    choices: ["{奇数|きすう}", "{偶数|ぐうすう}", "ばいすう", "せいほうけい"],
    answer: "{奇数|きすう}",
  },
  {
    id: `${U.sets}.q-10`,
    unitId: U.sets,
    prompt: "「{偶数|ぐうすう}では ない」{数|かず}は どれ？",
    explanation:
      "「{偶数|ぐうすう}では ない」＝2で わりきれない {数|かず}（{奇数|きすう}）だよ。5 は 2で わりきれない から せいかい。4・8・10 は {偶数|ぐうすう}だから ちがうね。",
    visual: { kind: "emoji", value: "5️⃣", caption: "わりきれない" },
    format: "choice",
    choices: ["5", "4", "8", "10"],
    answer: "5",
  },
  {
    id: `${U.sets}.q-11`,
    unitId: U.sets,
    prompt: "いぬも ねこも すきじゃ ない {人|ひと}は、ベン{図|ず}の どこに {入|はい}る？",
    explanation:
      "どちらの {丸|まる}にも {入|はい}らない {人|ひと}は、ふたつの {丸|まる}の そとがわに {入|はい}るよ。これも {大切|たいせつ}な なかま（「どちらでも ない」）なんだ。",
    visual: { kind: "emoji", value: "⭕", caption: "{丸|まる}の そと" },
    format: "choice",
    choices: ["{丸|まる}の そと", "かさなり", "いぬの {丸|まる}", "ねこの {丸|まる}"],
    answer: "{丸|まる}の そと",
  },
  {
    id: `${U.sets}.q-12`,
    unitId: U.sets,
    prompt: "なかま{分|わ}けで、おなじ なかまどうしを むすぼう。",
    explanation:
      "きゅうりは「やさい」、いちごは「くだもの」、{飛行機|ひこうき}は「{乗|の}りもの」。にて いても なかまが ちがう ものを {分|わ}けるのが {集合|しゅうごう}の {考|かんが}え{方|かた}だよ。",
    visual: { kind: "emoji", value: "🥒🍓✈️", caption: "なかま{分|わ}け" },
    format: "matching",
    left: ["きゅうり", "いちご", "{飛行機|ひこうき}"],
    right: ["やさい", "くだもの", "{乗|の}りもの"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.sets}.q-13`,
    unitId: U.sets,
    prompt: "「{丸|まる}くて あかい」に あてはまらないのは どれ？",
    explanation:
      "りんご・トマト・さくらんぼは {丸|まる}くて あかい。でも バナナは {丸|まる}くも あかくも ない から あてはまらないね。「かつ」の じょうけんを 2つとも たしかめよう。",
    visual: { kind: "emoji", value: "🍌", caption: "{丸|まる}くも あかくも ない" },
    format: "choice",
    choices: ["バナナ", "りんご", "トマト", "さくらんぼ"],
    answer: "バナナ",
  },
  {
    id: `${U.sets}.q-14`,
    unitId: U.sets,
    prompt: "「{4|よん}つあし（あしが 4{本|ほん}）」と「{鳥|とり}」の {両方|りょうほう}に {入|はい}る どうぶつは？",
    explanation:
      "{鳥|とり}の あしは 2{本|ほん}だから、「あしが 4{本|ほん}」と「{鳥|とり}」の {両方|りょうほう}に {入|はい}る どうぶつは いないよ。かさなりが「ない（から）」ことも {集合|しゅうごう}の {大切|たいせつ}な こたえなんだ。",
    visual: { kind: "emoji", value: "🐦", caption: "かさなりは なし" },
    format: "choice",
    choices: ["いない", "いぬ", "すずめ", "うし"],
    answer: "いない",
  },
  {
    id: `${U.sets}.q-15`,
    unitId: U.sets,
    prompt: "「{動物|どうぶつ}」「{犬|いぬ}」「{子犬|こいぬ}」。いちばん {大|おお}きい（{多|おお}くを ふくむ）なかまは？",
    explanation:
      "{子犬|こいぬ}は {犬|いぬ}の なかま、{犬|いぬ}は {動物|どうぶつ}の なかま。だから いちばん {大|おお}きく ぜんぶを ふくむのは「{動物|どうぶつ}」だよ。なかまの なかに なかまが ある、これを ぶぶんしゅうごうと いうんだ。",
    visual: { kind: "emoji", value: "🐶", caption: "{動物|どうぶつ} ⊃ {犬|いぬ} ⊃ {子犬|こいぬ}" },
    format: "choice",
    choices: ["{動物|どうぶつ}", "{犬|いぬ}", "{子犬|こいぬ}", "しろい {子犬|こいぬ}"],
    answer: "{動物|どうぶつ}",
  },
  {
    id: `${U.sets}.q-16`,
    unitId: U.sets,
    prompt: "「{乗|の}りもの」の なかまに {入|はい}らないのは どれ？",
    explanation:
      "バス・でんしゃ・ふねは {人|ひと}や ものを はこぶ「{乗|の}りもの」だね。ぞうは どうぶつだから この なかまには {入|はい}らないよ。",
    visual: { kind: "emoji", value: "🐘", caption: "{乗|の}りものじゃ ない" },
    format: "choice",
    choices: ["ぞう", "バス", "でんしゃ", "ふね"],
    answer: "ぞう",
  },
  {
    id: `${U.sets}.q-17`,
    unitId: U.sets,
    prompt: "2・4・6・8 は どんな なかま？",
    explanation:
      "ぜんぶ 2で わりきれる から「{偶数|ぐうすう}」の なかまだよ。{偶数|ぐうすう}どうしを あつめた もの、これも 1つの {集合|しゅうごう}だね。",
    visual: { kind: "emoji", value: "🔢", caption: "2で わりきれる" },
    format: "choice",
    choices: ["{偶数|ぐうすう}", "{奇数|きすう}", "{素数|そすう}", "ぶんすう"],
    answer: "{偶数|ぐうすう}",
  },
  {
    id: `${U.sets}.q-18`,
    unitId: U.sets,
    prompt: "「{赤|あか}い くだもの」と「{黄|き}いろい くだもの」、{両方|りょうほう}に {入|はい}る ものは？",
    explanation:
      "りんごは {赤|あか}、バナナは {黄|き}いろ。1つの くだものは ふつう どちらか 1つの {色|いろ}だから、{両方|りょうほう}に {入|はい}る ものは ないね。かさなりが「ない」ことも こたえに なるよ。",
    visual: { kind: "emoji", value: "🍎🍌", caption: "かさなりは なし" },
    format: "choice",
    choices: ["ない", "りんご", "バナナ", "ぜんぶ"],
    answer: "ない",
  },
  {
    id: `${U.sets}.q-19`,
    unitId: U.sets,
    prompt: "りんご・みかん・バナナ ぜんぶを ふくむ いちばん {大|おお}きな なかまを なんと いう？",
    explanation:
      "{調|しら}べる ぜんぶを ふくむ いちばん {大|おお}きな なかまを「{全体集合|ぜんたいしゅうごう}」と いうよ。ベン{図|ず}では いちばん そとの {四角|しかく}で あらわすんだ。",
    visual: { kind: "emoji", value: "🟩", caption: "ぜんぶを かこむ {四角|しかく}" },
    format: "choice",
    choices: ["{全体集合|ぜんたいしゅうごう}", "{共通|きょうつう}{部分|ぶぶん}", "そとがわ", "{奇数|きすう}"],
    answer: "{全体集合|ぜんたいしゅうごう}",
  },
  {
    id: `${U.sets}.q-20`,
    unitId: U.sets,
    prompt: "ふたつの なかまが かさなる ところ（{両方|りょうほう}に {入|はい}る ぶぶん）を なんと いう？",
    explanation:
      "ふたつの {丸|まる}が かさなった ところを「{共通|きょうつう}{部分|ぶぶん}」と いうよ。「AかつB」の ぶぶんで、けんさくで しぼりこむ ときと おなじ {考|かんが}え{方|かた}だよ。",
    visual: { kind: "emoji", value: "🔴🟡", caption: "かさなり" },
    format: "choice",
    choices: ["{共通|きょうつう}{部分|ぶぶん}", "{全体|ぜんたい}", "そとがわ", "ばらばら"],
    answer: "{共通|きょうつう}{部分|ぶぶん}",
  },
];

// ══════════════════════════════════════════
// 3. かくりつ
// ══════════════════════════════════════════
const probabilityQuestions: Question[] = [
  {
    id: `${U.probability}.q-1`,
    unitId: U.probability,
    prompt: "さいころの {目|め}（1〜6）は ぜんぶで いくつ ある？",
    explanation:
      "さいころには 1・2・3・4・5・6 の 6つの {目|め}が あるよ。{起|お}こりうる ぜんぶの {場合|ばあい}の {数|かず}を かぞえる ことが かくりつの {第一歩|だいいっぽ}だよ。",
    visual: { kind: "emoji", value: "🎲", caption: "{目|め}は 6つ" },
    format: "number-input",
    answer: 6,
  },
  {
    id: `${U.probability}.q-2`,
    unitId: U.probability,
    prompt:
      "コインを 1かい なげる。おもてが でる {起|お}こりやすさは どのくらい？",
    explanation:
      "おもてと うらの 2つの うち 1つ。だから「2かいに 1かい（はんぶん）」の わりあいで でると かんがえるよ。",
    visual: { kind: "emoji", value: "🪙", caption: "おもて か うら" },
    format: "choice",
    choices: ["2かいに 1かい（はんぶん）", "かならず でる", "ぜったい でない", "6かいに 1かい"],
    answer: "2かいに 1かい（はんぶん）",
  },
  {
    id: `${U.probability}.q-3`,
    unitId: U.probability,
    prompt: "さいころで「3」が でる {場合|ばあい}は、6つの {目|め}の うち いくつ？",
    explanation:
      "「3」は 1つだけ。6つの {目|め}の うち あたりは 1つ だから「6かいに 1かい」くらい でると かんがえるよ。",
    visual: { kind: "emoji", value: "🎲", caption: "あたりは 1つ" },
    format: "number-input",
    answer: 1,
  },
  {
    id: `${U.probability}.q-4`,
    unitId: U.probability,
    prompt:
      "あたりくじ。Aは 10{本|ぽん}{中|ちゅう} 2{本|ほん} あたり、Bは 10{本|ぽん}{中|ちゅう} 5{本|ほん} あたり。あたりやすいのは？",
    explanation:
      "おなじ 10{本|ぽん}でも、あたりが おおい ほうが あたりやすいよ。B（5{本|ほん}）は A（2{本|ほん}）より あたりやすいね。",
    visual: { kind: "emoji", value: "🎫", caption: "B の ほうが おおい" },
    format: "choice",
    choices: ["B", "A", "おなじ", "どちらも あたらない"],
    answer: "B",
  },
  {
    id: `${U.probability}.q-5`,
    unitId: U.probability,
    prompt:
      "「あした {太陽|たいよう}は のぼる」のように、かならず {起|お}きる ことの かくりつは？",
    explanation:
      "ぜったいに {起|お}きる ことは「100パーセント（かならず）」、ぜったい {起|お}きない ことは「0パーセント」と いうよ。かくりつは 0〜100% の あいだで あらわすんだ。",
    visual: { kind: "emoji", value: "🌅", caption: "かならず のぼる" },
    format: "choice",
    choices: ["100パーセント（かならず）", "50パーセント", "0パーセント", "わからない"],
    answer: "100パーセント（かならず）",
  },
  {
    id: `${U.probability}.q-6`,
    unitId: U.probability,
    prompt: "コインを 1かい なげる。でかた（おもて・うら）は ぜんぶで なんとおり？",
    explanation:
      "コインは「おもて」か「うら」の 2とおり。{起|お}こりうる ぜんぶの {場合|ばあい}の {数|かず}を かぞえるのが かくりつの {第一歩|だいいっぽ}だよ。",
    visual: { kind: "emoji", value: "🪙", caption: "おもて・うら" },
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.probability}.q-7`,
    unitId: U.probability,
    prompt: "さいころで {偶数|ぐうすう}（2・4・6）が でる {目|め}は いくつ ある？",
    explanation:
      "{偶数|ぐうすう}は 2・4・6 の 3つ。6つの {目|め}の うち あたりは 3つ だから「2かいに 1かい（はんぶん）」くらい でる かんじだね。",
    visual: { kind: "emoji", value: "🎲", caption: "2・4・6" },
    format: "number-input",
    answer: 3,
  },
  {
    id: `${U.probability}.q-8`,
    unitId: U.probability,
    prompt: "さいころで「1か2」が でる {目|め}は いくつ ある？",
    explanation:
      "「1」と「2」の 2つだね。6つの {目|め}の うち あたりは 2つ。あたりの {数|かず}を かぞえると {起|お}こりやすさが くらべられるよ。",
    visual: { kind: "emoji", value: "🎲", caption: "1 と 2" },
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.probability}.q-9`,
    unitId: U.probability,
    prompt: "{赤|あか}い {玉|たま} 3こ、{白|しろ}い {玉|たま} 1この ふくろ。{出|で}やすいのは どっち？",
    explanation:
      "{赤|あか}が 3こ、{白|しろ}が 1こ。{数|かず}が おおい {赤|あか}の ほうが {出|で}やすいよ。{出|で}やすさは「その {色|いろ}の {数|かず} ÷ ぜんぶの {数|かず}」で くらべられるね。",
    visual: { kind: "emoji", value: "🔴⚪", caption: "{赤|あか}が おおい" },
    format: "choice",
    choices: ["{赤|あか}い {玉|たま}", "{白|しろ}い {玉|たま}", "おなじ", "どちらも でない"],
    answer: "{赤|あか}い {玉|たま}",
  },
  {
    id: `${U.probability}.q-10`,
    unitId: U.probability,
    prompt: "ふつうの さいころで「7」が でる かくりつは？",
    explanation:
      "さいころに 7の {目|め}は ないよね。ぜったいに {起|お}きない ことは「0パーセント」と いうんだ。0% は「ありえない」を あらわすよ。",
    visual: { kind: "emoji", value: "🎲", caption: "7は ない" },
    format: "choice",
    choices: ["0パーセント（でない）", "100パーセント", "50パーセント", "6かいに 1かい"],
    answer: "0パーセント（でない）",
  },
  {
    id: `${U.probability}.q-11`,
    unitId: U.probability,
    prompt: "さいころで「1から6の どれか」が でる かくりつは？",
    explanation:
      "さいころの {目|め}は ぜんぶ 1〜6 だから、どれかは かならず でるね。かならず {起|お}きる ことは「100パーセント」だよ。",
    visual: { kind: "emoji", value: "🎲", caption: "どれかは でる" },
    format: "choice",
    choices: ["100パーセント", "50パーセント", "0パーセント", "わからない"],
    answer: "100パーセント",
  },
  {
    id: `${U.probability}.q-12`,
    unitId: U.probability,
    prompt: "あたり 1{本|ぽん}・はずれ 1{本|ぽん}の くじ。あたる {起|お}こりやすさは？",
    explanation:
      "あたりと はずれ、おなじ 1{本|ぽん}ずつ。だから「2かいに 1かい（はんぶん）」の わりあいで あたるよ。コインの おもてと おなじだね。",
    visual: { kind: "emoji", value: "🎫", caption: "1 たい 1" },
    format: "choice",
    choices: ["2かいに 1かい（はんぶん）", "かならず あたる", "ぜったい あたらない", "6かいに 1かい"],
    answer: "2かいに 1かい（はんぶん）",
  },
  {
    id: `${U.probability}.q-13`,
    unitId: U.probability,
    prompt:
      "Aは 10{本|ぽん}{中|ちゅう} 3{本|ぼん} あたり。Bも 10{本|ぽん}{中|ちゅう} 3{本|ぼん} あたり。あたりやすさは？",
    explanation:
      "ぜんぶの {数|かず}も あたりの {数|かず}も おなじ なら、あたりやすさも おなじだよ。わりあいが おなじか どうかで くらべるのが コツだね。",
    visual: { kind: "emoji", value: "🎫", caption: "おなじ わりあい" },
    format: "choice",
    choices: ["おなじ", "A", "B", "どちらも あたらない"],
    answer: "おなじ",
  },
  {
    id: `${U.probability}.q-14`,
    unitId: U.probability,
    prompt: "ふつうの（いかさまの ない）さいころ。いちばん でやすい {目|め}は？",
    explanation:
      "ただしい さいころなら、どの {目|め}も おなじ「6かいに 1かい」で でるよ。だから「どれも おなじ」が せいかい。とくべつ でやすい {目|め}は ないんだ。",
    visual: { kind: "emoji", value: "🎲", caption: "どれも おなじ" },
    format: "choice",
    choices: ["どれも おなじ", "1", "6", "3"],
    answer: "どれも おなじ",
  },
  {
    id: `${U.probability}.q-15`,
    unitId: U.probability,
    prompt: "あたり 2{本|ほん}・はずれ 8{本|ほん}の くじ 10{本|ぽん}。{出|で}やすいのは どっち？",
    explanation:
      "あたり 2{本|ほん}より はずれ 8{本|ほん}の ほうが ずっと おおいね。{数|かず}が おおい「はずれ」の ほうが {出|で}やすいんだ。",
    visual: { kind: "emoji", value: "🎫", caption: "はずれが おおい" },
    format: "choice",
    choices: ["はずれ", "あたり", "おなじ", "どちらも でない"],
    answer: "はずれ",
  },
  {
    id: `${U.probability}.q-16`,
    unitId: U.probability,
    prompt:
      "「ぜったい {起|お}きない」ことの かくりつは {何|なん}パーセント？（{数字|すうじ}で）",
    explanation:
      "ぜったいに {起|お}きない ことは 0パーセント。かくりつは 0%（ありえない）〜100%（かならず）の あいだで あらわすよ。",
    visual: { kind: "emoji", value: "🚫", caption: "ありえない = 0%" },
    format: "number-input",
    answer: 0,
  },
  {
    id: `${U.probability}.q-17`,
    unitId: U.probability,
    prompt:
      "「かならず {起|お}きる」ことの かくりつは {何|なん}パーセント？（{数字|すうじ}で）",
    explanation:
      "かならず {起|お}きる ことは 100パーセント。「あした {太陽|たいよう}が のぼる」のように たしかな ことだね。",
    visual: { kind: "emoji", value: "🌅", caption: "かならず = 100%" },
    format: "number-input",
    answer: 100,
  },
  {
    id: `${U.probability}.q-18`,
    unitId: U.probability,
    prompt: "{起|お}こりやすさと パーセントを むすぼう。",
    explanation:
      "「かならず」は 100%、「はんぶん（コインの おもて）」は 50%、「ぜったい ない」は 0%。{言葉|ことば}と {数|かず}を つなげると かくりつが わかりやすく なるよ。",
    visual: { kind: "emoji", value: "📊", caption: "{言葉|ことば} → パーセント" },
    format: "matching",
    left: ["かならず おきる", "はんぶんの かくりつ", "ぜったい おきない"],
    right: ["100パーセント", "50パーセント", "0パーセント"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.probability}.q-19`,
    unitId: U.probability,
    prompt: "コインを 2かい なげる。でかたの くみあわせは ぜんぶで なんとおり？",
    explanation:
      "1かいめが おもて・うらの 2とおり、2かいめも 2とおり。「おもて・おもて」「おもて・うら」「うら・おもて」「うら・うら」で 2×2＝4とおり だよ。",
    visual: { kind: "emoji", value: "🪙🪙", caption: "2 × 2 = 4" },
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.probability}.q-20`,
    unitId: U.probability,
    prompt: "{天気|てんき}よほうの「{降水|こうすい}かくりつ 80パーセント」は どういう {意味|いみ}？",
    explanation:
      "80% は 100%（かならず）に ちかいね。だから「{雨|あめ}が ふりやすい」と いう {意味|いみ}だよ。かくりつが {大|おお}きいほど {起|お}こりやすいんだ。",
    visual: { kind: "emoji", value: "🌧️", caption: "ふりやすい" },
    format: "choice",
    choices: ["{雨|あめ}が ふりやすい", "ぜったい ふらない", "ゆきが ふる", "かぜが つよい"],
    answer: "{雨|あめ}が ふりやすい",
  },
];

// ══════════════════════════════════════════
// 4. とうけい（へいきんと グラフ）
// ══════════════════════════════════════════
const statisticsQuestions: Question[] = [
  {
    id: `${U.statistics}.q-1`,
    unitId: U.statistics,
    prompt: "2・4・6 の 3つの {数|かず}の へいきんは いくつ？",
    explanation:
      "へいきんは「ぜんぶ たして、こ{数|すう}で わる」だよ。2＋4＋6＝12、12 を 3 で わって 4。だから へいきんは 4。",
    visual: { kind: "emoji", value: "⚖️", caption: "(2+4+6)÷3" },
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.statistics}.q-2`,
    unitId: U.statistics,
    prompt:
      "3{人|にん}が とった てんすうは 10・8・6。ぜんぶ あわせると {何点|なんてん}？",
    explanation:
      "データを へいきんする まえに、まず ぜんぶ たすよ。10＋8＋6＝24。この あと こ{数|すう}3で わると へいきん 8 が もとまるよ。",
    visual: { kind: "emoji", value: "📝", caption: "10+8+6" },
    format: "number-input",
    answer: 24,
  },
  {
    id: `${U.statistics}.q-3`,
    unitId: U.statistics,
    prompt:
      "すきな くだものの {人数|にんずう}を、おおい じゅんに ならべると？（りんご5・みかん2・ぶどう8）",
    explanation:
      "おおい じゅんに ならべると ぶどう(8)→りんご(5)→みかん(2)。グラフは おおきい ものから ならべると {見|み}やすいよ。",
    visual: { kind: "emoji", value: "📊", caption: "おおい じゅん" },
    format: "ordering",
    items: ["りんご(5)", "みかん(2)", "ぶどう(8)"],
    answerOrder: [2, 0, 1],
  },
  {
    id: `${U.statistics}.q-4`,
    unitId: U.statistics,
    prompt:
      "{数|かず}の おおきさを「ぼう（はしら）」の {長|なが}さで くらべる グラフを なんと いう？",
    explanation:
      "ぼうの {長|なが}さで かずを くらべる グラフを「ぼうグラフ」と いうよ。どれが おおいか ひと{目|め}で わかるね。",
    visual: { kind: "emoji", value: "📊", caption: "ぼうグラフ" },
    format: "choice",
    choices: ["ぼうグラフ", "とけい", "ちず", "カレンダー"],
    answer: "ぼうグラフ",
  },
  {
    id: `${U.statistics}.q-5`,
    unitId: U.statistics,
    prompt:
      "クラスで いちばん おおかった すきな {色|いろ}（データで いちばん おおい あたい）を なんと いう？",
    explanation:
      "いちばん {多|おお}く でて くる あたいを「さいひんち（モード）」と いうよ。データの とくちょうを つかむ {大切|たいせつ}な {見方|みかた}だよ。",
    visual: { kind: "emoji", value: "🎨", caption: "いちばん おおい" },
    format: "choice",
    choices: ["さいひんち", "へいきん", "ごうけい", "おつり"],
    answer: "さいひんち",
  },
  {
    id: `${U.statistics}.q-6`,
    unitId: U.statistics,
    prompt: "3・5・7 の 3つの {数|かず}の へいきんは いくつ？",
    explanation:
      "ぜんぶ たすと 3＋5＋7＝15。それを こ{数|すう}3で わると 15÷3＝5。だから へいきんは 5だよ。",
    visual: { kind: "emoji", value: "⚖️", caption: "(3+5+7)÷3" },
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.statistics}.q-7`,
    unitId: U.statistics,
    prompt: "10・20 の 2つの {数|かず}の へいきんは いくつ？",
    explanation:
      "10＋20＝30、こ{数|すう}は 2 だから 30÷2＝15。へいきんは ちょうど まんなかの 15に なるね。",
    visual: { kind: "emoji", value: "⚖️", caption: "(10+20)÷2" },
    format: "number-input",
    answer: 15,
  },
  {
    id: `${U.statistics}.q-8`,
    unitId: U.statistics,
    prompt: "2・4・6・8 を ぜんぶ たすと いくつ？",
    explanation:
      "2＋4＝6、6＋6＝12、12＋8＝20。へいきんを だす まえに、まず ぜんぶ たす ことが {大切|たいせつ}だよ。",
    visual: { kind: "emoji", value: "📝", caption: "2+4+6+8" },
    format: "number-input",
    answer: 20,
  },
  {
    id: `${U.statistics}.q-9`,
    unitId: U.statistics,
    prompt: "2・4・6・8 の 4つの {数|かず}の へいきんは いくつ？",
    explanation:
      "ぜんぶ たすと 20、こ{数|すう}は 4。20÷4＝5 だから へいきんは 5だよ。「たして こ{数|すう}で わる」が へいきんの きまりだね。",
    visual: { kind: "emoji", value: "⚖️", caption: "20 ÷ 4 = 5" },
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.statistics}.q-10`,
    unitId: U.statistics,
    prompt: "テストで 5{人|にん}が とった てんすう 60・70・80・90・100 の へいきんは？",
    explanation:
      "ぜんぶ たすと 60＋70＋80＋90＋100＝400。こ{数|すう}5で わって 400÷5＝80。へいきんは 80てんだよ。",
    visual: { kind: "emoji", value: "📝", caption: "400 ÷ 5 = 80" },
    format: "number-input",
    answer: 80,
  },
  {
    id: `${U.statistics}.q-11`,
    unitId: U.statistics,
    prompt: "データを「ぜんぶ たして こ{数|すう}で わった」あたいを なんと いう？",
    explanation:
      "ぜんぶ たして こ{数|すう}で わった あたいを「へいきん」と いうよ。データの まんなかぐらいを あらわす {大切|たいせつ}な {数|かず}だね。",
    visual: { kind: "emoji", value: "⚖️", caption: "ならした まんなか" },
    format: "choice",
    choices: ["へいきん", "さいひんち", "ごうけい", "おおきさ"],
    answer: "へいきん",
  },
  {
    id: `${U.statistics}.q-12`,
    unitId: U.statistics,
    prompt: "わりあい（ぜんたいを 100とした ときの ぶんけ）を {見|み}るのに よい グラフは？",
    explanation:
      "{丸|まる}い {円|えん}を きって わりあいを {見|み}せる グラフを「{円|えん}グラフ」と いうよ。ぜんたいの なかの しめる {大|おお}きさが ひと{目|め}で わかるね。",
    visual: { kind: "emoji", value: "🥧", caption: "{円|えん}グラフ" },
    format: "choice",
    choices: ["{円|えん}グラフ", "ぼうグラフ", "{折|お}れ{線|せん}グラフ", "{表|ひょう}"],
    answer: "{円|えん}グラフ",
  },
  {
    id: `${U.statistics}.q-13`,
    unitId: U.statistics,
    prompt: "{気温|きおん}が {時間|じかん}で {上|あ}がり{下|さ}がりする ようすを {見|み}るのに よい グラフは？",
    explanation:
      "{点|てん}を {線|せん}で つないで かわり{方|かた}を {見|み}せる「{折|お}れ{線|せん}グラフ」が いいよ。だんだん {上|あ}がる・{下|さ}がるの ながれが よく わかるね。",
    visual: { kind: "emoji", value: "📈", caption: "{折|お}れ{線|せん}グラフ" },
    format: "choice",
    choices: ["{折|お}れ{線|せん}グラフ", "{円|えん}グラフ", "しゃしん", "ちず"],
    answer: "{折|お}れ{線|せん}グラフ",
  },
  {
    id: `${U.statistics}.q-14`,
    unitId: U.statistics,
    prompt: "いちばん {多|おお}く でて くる あたい（データで いちばん おおい もの）を なんと いう？",
    explanation:
      "いちばん {多|おお}く あらわれる あたいを「さいひんち（モード）」と いうよ。クラスで いちばん おおい すきな {色|いろ}などが これだね。",
    visual: { kind: "emoji", value: "🎨", caption: "いちばん おおい あたい" },
    format: "choice",
    choices: ["さいひんち", "へいきん", "ごうけい", "へんさ"],
    answer: "さいひんち",
  },
  {
    id: `${U.statistics}.q-15`,
    unitId: U.statistics,
    prompt: "{身長|しんちょう} 120cm・135cm・128cm を、ひくい じゅんに ならべると？",
    explanation:
      "ちいさい（ひくい）じゅんに ならべると 120→128→135。データを ならべかえると くらべやすく なるよ。",
    visual: { kind: "emoji", value: "📏", caption: "ひくい じゅん" },
    format: "ordering",
    items: ["120cm", "135cm", "128cm"],
    answerOrder: [0, 2, 1],
  },
  {
    id: `${U.statistics}.q-16`,
    unitId: U.statistics,
    prompt: "{票|ひょう}の {数|かず}を おおい じゅんに ならべると？（A=3・B=7・C=5）",
    explanation:
      "おおい じゅんに ならべると B(7)→C(5)→A(3)。グラフも おおきい ものから ならべると {見|み}やすいよ。",
    visual: { kind: "emoji", value: "📊", caption: "おおい じゅん" },
    format: "ordering",
    items: ["A(3)", "B(7)", "C(5)"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.statistics}.q-17`,
    unitId: U.statistics,
    prompt: "とうけいの {言葉|ことば}と {意味|いみ}を むすぼう。",
    explanation:
      "「へいきん」は ならした まんなか、「さいひんち」は いちばん おおい あたい、「ごうけい」は ぜんぶ たした {数|かず}。{言葉|ことば}の {意味|いみ}を おぼえると データが {読|よ}めるよ。",
    visual: { kind: "emoji", value: "📊", caption: "{言葉|ことば} → {意味|いみ}" },
    format: "matching",
    left: ["へいきん", "さいひんち", "ごうけい"],
    right: ["ならした まんなか", "いちばん おおい あたい", "ぜんぶ たした {数|かず}"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.statistics}.q-18`,
    unitId: U.statistics,
    prompt: "3{人|にん}の てんすう 6・6・9 の へいきんは いくつ？",
    explanation:
      "6＋6＋9＝21、こ{数|すう}3で わって 21÷3＝7。へいきんは 7だよ。おなじ {数|かず}が あっても やり{方|かた}は おなじだね。",
    visual: { kind: "emoji", value: "⚖️", caption: "21 ÷ 3 = 7" },
    format: "number-input",
    answer: 7,
  },
  {
    id: `${U.statistics}.q-19`,
    unitId: U.statistics,
    prompt: "「{正|せい}の{字|じ}」で かぞえると、{正|せい}の{字|じ} 1つ かんせいで いくつ ぶん？",
    explanation:
      "「{正|せい}」の{字|じ}は ５かくで かくから、1つ かくと 5こ ぶんを あらわすよ。データを かぞえる ときに べんりな しるしだね。",
    visual: { kind: "emoji", value: "✋", caption: "{正|せい} = 5" },
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.statistics}.q-20`,
    unitId: U.statistics,
    prompt: "{数|かず}の おおきさを「ぼう（はしら）の {長|なが}さ」で くらべる グラフを なんと いう？",
    explanation:
      "ぼうの {長|なが}さで {数|かず}を くらべる グラフを「ぼうグラフ」と いうよ。どれが おおいか ひと{目|め}で わかる、いちばん よく つかう グラフだね。",
    visual: { kind: "emoji", value: "📊", caption: "ぼうグラフ" },
    format: "choice",
    choices: ["ぼうグラフ", "{円|えん}グラフ", "ちず", "カレンダー"],
    answer: "ぼうグラフ",
  },
];

// ══════════════════════════════════════════
// 5. すうれつ・パターン
// ══════════════════════════════════════════
const patternQuestions: Question[] = [
  {
    id: `${U.pattern}.q-1`,
    unitId: U.pattern,
    prompt: "2・4・6・8・… つぎの {数|かず}は？",
    explanation:
      "2ずつ ふえて いく きまりだね。8 の つぎは 8＋2＝10。きまりを {見|み}つければ つぎが わかるよ。",
    visual: { kind: "svg", name: "number-blocks", params: { count: 10 }, caption: "2ずつ ふえる" },
    format: "number-input",
    answer: 10,
  },
  {
    id: `${U.pattern}.q-2`,
    unitId: U.pattern,
    prompt: "1・2・4・8・… つぎの {数|かず}は？（ばいばいに ふえる）",
    explanation:
      "まえの {数|かず}を 2ばいに する きまりだよ。8 の 2ばいは 16。たし{算|ざん}じゃなく かけ{算|ざん}で ふえる パターンだね。",
    visual: { kind: "emoji", value: "✖️2️⃣", caption: "2ばいずつ" },
    format: "number-input",
    answer: 16,
  },
  {
    id: `${U.pattern}.q-3`,
    unitId: U.pattern,
    prompt: "1・1・2・3・5・… つぎの {数|かず}は？（まえの 2つを たす）",
    explanation:
      "まえの 2つの {数|かず}を たす きまり（フィボナッチ）だよ。3＋5＝8。{自然|しぜん}の {花|はな}びらの {数|かず}にも かくれて いるんだ。",
    visual: { kind: "emoji", value: "🌻", caption: "3+5=8" },
    format: "number-input",
    answer: 8,
  },
  {
    id: `${U.pattern}.q-4`,
    unitId: U.pattern,
    prompt: "▲●▲●▲… つぎに くる かたちは？",
    explanation:
      "▲と● が こうごに くりかえす きまりだよ。さいごが ▲ だから つぎは ●。もようの くりかえしも すうれつの なかまだよ。",
    visual: { kind: "emoji", value: "🔺⚫", caption: "こうご に ならぶ" },
    format: "choice",
    choices: ["●", "▲", "■", "★"],
    answer: "●",
  },
  {
    id: `${U.pattern}.q-5`,
    unitId: U.pattern,
    prompt: "バラバラの {数|かず} 5・1・3 を、ちいさい じゅんに ならべると？",
    explanation:
      "ちいさい じゅんに ならべると 1→3→5。きまりよく ならべかえる ことも、すうれつや アルゴリズムの きほんだよ。",
    visual: { kind: "emoji", value: "🔢", caption: "ちいさい じゅん" },
    format: "ordering",
    items: ["5", "1", "3"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.pattern}.q-6`,
    unitId: U.pattern,
    prompt: "5・10・15・20・… つぎの {数|かず}は？",
    explanation:
      "5ずつ ふえて いく きまりだね。20 の つぎは 20＋5＝25。「いくつ ふえたか」を {見|み}つけると つぎが わかるよ。",
    visual: { kind: "emoji", value: "🔢", caption: "5ずつ ふえる" },
    format: "number-input",
    answer: 25,
  },
  {
    id: `${U.pattern}.q-7`,
    unitId: U.pattern,
    prompt: "10・8・6・4・… つぎの {数|かず}は？",
    explanation:
      "こんどは 2ずつ「へって」いく きまりだよ。4 の つぎは 4−2＝2。ふえる だけでなく へる パターンも あるんだね。",
    visual: { kind: "emoji", value: "📉", caption: "2ずつ へる" },
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.pattern}.q-8`,
    unitId: U.pattern,
    prompt: "1・3・5・7・… つぎの {数|かず}は？",
    explanation:
      "2ずつ ふえる {奇数|きすう}の ならびだよ。7 の つぎは 7＋2＝9。1・3・5・7・9… と つづくね。",
    visual: { kind: "emoji", value: "🔢", caption: "2ずつ ふえる（{奇数|きすう}）" },
    format: "number-input",
    answer: 9,
  },
  {
    id: `${U.pattern}.q-9`,
    unitId: U.pattern,
    prompt: "3・6・9・12・… つぎの {数|かず}は？",
    explanation:
      "3ずつ ふえる、3の だんの きまりだよ。12 の つぎは 12＋3＝15。かけ{算|ざん}の だんも すうれつの なかまなんだ。",
    visual: { kind: "emoji", value: "🔢", caption: "3ずつ ふえる" },
    format: "number-input",
    answer: 15,
  },
  {
    id: `${U.pattern}.q-10`,
    unitId: U.pattern,
    prompt: "1・2・4・8・16・… つぎの {数|かず}は？（2ばいずつ）",
    explanation:
      "まえの {数|かず}を 2ばいに する きまりだよ。16 の 2ばいは 32。たし{算|ざん}じゃ なく かけ{算|ざん}で ふえる パターンだね。",
    visual: { kind: "emoji", value: "✖️2️⃣", caption: "2ばいずつ" },
    format: "number-input",
    answer: 32,
  },
  {
    id: `${U.pattern}.q-11`,
    unitId: U.pattern,
    prompt: "1・4・9・16・… つぎの {数|かず}は？（おなじ {数|かず}を 2かい かける）",
    explanation:
      "1＝1×1、4＝2×2、9＝3×3、16＝4×4。つぎは 5×5＝25 だよ。これを「{平方数|へいほうすう}（{四角|しかく}の {数|かず}）」と いうんだ。",
    visual: { kind: "emoji", value: "⬜", caption: "5 × 5 = 25" },
    format: "number-input",
    answer: 25,
  },
  {
    id: `${U.pattern}.q-12`,
    unitId: U.pattern,
    prompt: "2・3・5・8・12・… つぎの {数|かず}は？（ふえ{方|かた}が 1ずつ ふえる）",
    explanation:
      "ふえる {数|かず}が ＋1・＋2・＋3・＋4 と ふえて いくよ。12 の つぎは ＋5 で 12＋5＝17。ふえ{方|かた}にも きまりが あるんだね。",
    visual: { kind: "emoji", value: "🔢", caption: "+1 +2 +3 +4 +5" },
    format: "number-input",
    answer: 17,
  },
  {
    id: `${U.pattern}.q-13`,
    unitId: U.pattern,
    prompt: "フィボナッチ 1・1・2・3・5・8・… つぎの {数|かず}は？",
    explanation:
      "まえの 2つの {数|かず}を たす きまり（フィボナッチ）だよ。5＋8＝13。{自然|しぜん}の {花|はな}びらの {数|かず}にも かくれて いるんだ。",
    visual: { kind: "emoji", value: "🌻", caption: "5 + 8 = 13" },
    format: "number-input",
    answer: 13,
  },
  {
    id: `${U.pattern}.q-14`,
    unitId: U.pattern,
    prompt: "100・90・80・70・… つぎの {数|かず}は？",
    explanation:
      "10ずつ へって いく きまりだよ。70 の つぎは 70−10＝60。おおきい {数|かず}でも きまりが わかれば つぎが {読|よ}めるね。",
    visual: { kind: "emoji", value: "📉", caption: "10ずつ へる" },
    format: "number-input",
    answer: 60,
  },
  {
    id: `${U.pattern}.q-15`,
    unitId: U.pattern,
    prompt: "{階段|かいだん}を 1だん・3だん・5だん・7だん… つぎは {何|なん}だん？",
    explanation:
      "2だんずつ ふえて いくね。7 の つぎは 7＋2＝9だん。みのまわりの ふえ{方|かた}にも きまりが かくれて いるよ。",
    visual: { kind: "emoji", value: "🪜", caption: "2だんずつ" },
    format: "number-input",
    answer: 9,
  },
  {
    id: `${U.pattern}.q-16`,
    unitId: U.pattern,
    prompt: "○●●○●●○… つぎに くる かたちは？",
    explanation:
      "「○●●」の 3つが くりかえす きまりだよ。さいごが ○ だから つぎは ●。なんこ ごとに くりかえすか {見|み}つけるのが コツだね。",
    visual: { kind: "emoji", value: "⚪⚫⚫", caption: "○●● の くりかえし" },
    format: "choice",
    choices: ["●", "○", "■", "★"],
    answer: "●",
  },
  {
    id: `${U.pattern}.q-17`,
    unitId: U.pattern,
    prompt: "△△○△△○△△… つぎに くる かたちは？",
    explanation:
      "「△△○」の 3つが くりかえす きまりだよ。△が 2つ つづいた あとだから つぎは ○。もようの くりかえしも すうれつの なかまだね。",
    visual: { kind: "emoji", value: "🔺🔺⚪", caption: "△△○ の くりかえし" },
    format: "choice",
    choices: ["○", "△", "■", "◇"],
    answer: "○",
  },
  {
    id: `${U.pattern}.q-18`,
    unitId: U.pattern,
    prompt: "すうれつと きまりを むすぼう。",
    explanation:
      "「2・4・6・8」は 2ずつ ふえる、「1・2・4・8」は 2ばいずつ、「1・1・2・3」は まえ2つを たす（フィボナッチ）。きまりを {見|み}ぬくと つぎが よめるよ。",
    visual: { kind: "emoji", value: "🔢", caption: "すうれつ → きまり" },
    format: "matching",
    left: ["2・4・6・8", "1・2・4・8", "1・1・2・3"],
    right: ["2ずつ ふえる", "2ばいずつ", "まえ2つを たす"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.pattern}.q-19`,
    unitId: U.pattern,
    prompt: "{月|げつ}・{火|か}・{水|すい}・{木|もく}・… つぎの ようびは？",
    explanation:
      "ようびは {月|げつ}・{火|か}・{水|すい}・{木|もく}・{金|きん}・{土|ど}・{日|にち}の じゅんに くりかえすよ。{木|もく}の つぎは {金|きん}だね。カレンダーも くりかえしの パターンなんだ。",
    visual: { kind: "emoji", value: "📅", caption: "ようびの じゅん" },
    format: "choice",
    choices: ["{金|きん}", "{土|ど}", "{日|にち}", "{月|げつ}"],
    answer: "{金|きん}",
  },
  {
    id: `${U.pattern}.q-20`,
    unitId: U.pattern,
    prompt: "バラバラの {数|かず} 8・2・5 を、おおきい じゅんに ならべると？",
    explanation:
      "おおきい じゅんに ならべると 8→5→2。きまりよく ならべかえる ことも、すうれつや アルゴリズムの きほんだよ。",
    visual: { kind: "emoji", value: "🔢", caption: "おおきい じゅん" },
    format: "ordering",
    items: ["8", "2", "5"],
    answerOrder: [0, 2, 1],
  },
];

// ══════════════════════════════════════════
// 6. かたちの ふしぎ（対称・一筆書き）
// ══════════════════════════════════════════
const symmetryQuestions: Question[] = [
  {
    id: `${U.symmetry}.q-1`,
    unitId: U.symmetry,
    prompt:
      "{真|ま}んなかで {折|お}ると ぴったり かさなる（{左右対称|さゆうたいしょう}）ものは どれ？",
    explanation:
      "ちょうちょは {真|ま}んなかの {線|せん}で {折|お}ると {左|ひだり}と {右|みぎ}が ぴったり かさなるよ。これを「{線対称|せんたいしょう}」と いうんだ。",
    visual: { kind: "emoji", value: "🦋", caption: "{左右|さゆう}が おなじ" },
    format: "choice",
    choices: ["ちょうちょ", "くつ {片方|かたほう}", "うずまき", "アルファベットの P"],
    answer: "ちょうちょ",
  },
  {
    id: `${U.symmetry}.q-2`,
    unitId: U.symmetry,
    prompt:
      "アルファベットの「A」を たての {線|せん}で {折|お}ると {左右|さゆう}は どうなる？",
    explanation:
      "「A」は たての {真|ま}んなかの {線|せん}で {折|お}ると {左|ひだり}と {右|みぎ}が かさなる {線対称|せんたいしょう}の もじだよ。「H」「M」「T」も そうだよ。",
    visual: { kind: "emoji", value: "🅰️", caption: "A は {対称|たいしょう}" },
    format: "choice",
    choices: ["ぴったり かさなる", "ぜんぜん ちがう", "{大|おお}きく なる", "きえる"],
    answer: "ぴったり かさなる",
  },
  {
    id: `${U.symmetry}.q-3`,
    unitId: U.symmetry,
    prompt:
      "{一筆書|ひとふでが}き（ペンを はなさず ぜんぶ なぞる）が できるのは どっち？",
    explanation:
      "{三角形|さんかくけい}は どの {頂点|ちょうてん}からも {一筆|ひとふで}で かけるよ。{線|せん}の あつまる {点|てん}の つながり{方|かた}で {一筆書|ひとふでが}きできるか きまる、これが トポロジーの {考|かんが}え{方|かた}だよ。",
    visual: { kind: "emoji", value: "🔺", caption: "{三角形|さんかくけい}" },
    format: "choice",
    choices: ["{三角形|さんかくけい}", "ばらばらの 2つの {丸|まる}", "つながって いない {線|せん}", "とじて いない ぐちゃぐちゃ"],
    answer: "{三角形|さんかくけい}",
  },
  {
    id: `${U.symmetry}.q-4`,
    unitId: U.symmetry,
    prompt:
      "{正方形|せいほうけい}（ましかく）を {一筆|ひとふで}で かく じゅんばんに ならべよう。",
    explanation:
      "かどを じゅんに たどって ①→②→③→④→①に もどると ましかくが {一筆|ひとふで}で かけるよ。{頂点|ちょうてん}を きれずに たどるのが コツ。",
    visual: { kind: "emoji", value: "⬜", caption: "かどを じゅんに" },
    format: "ordering",
    items: ["①ひだり{上|うえ}", "②みぎ{上|うえ}", "③みぎ{下|した}", "④ひだり{下|した}"],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.symmetry}.q-5`,
    unitId: U.symmetry,
    prompt:
      "{真|ま}んなかの {点|てん}を {中心|ちゅうしん}に {半|はん}かいてん（180ど まわす）しても おなじに {見|み}える もじは？",
    explanation:
      "「S」は 180ど まわしても おなじ かたちに {見|み}えるよ。これを「{点対称|てんたいしょう}」と いうんだ。「N」「Z」も そうだよ。",
    visual: { kind: "emoji", value: "🔄", caption: "まわしても おなじ" },
    format: "choice",
    choices: ["S", "A", "B", "E"],
    answer: "S",
  },
  {
    id: `${U.symmetry}.q-6`,
    unitId: U.symmetry,
    prompt: "たての {線|せん}で {折|お}ると {左右|さゆう}が ぴったり かさなる もじは？",
    explanation:
      "「M」は たての {真|ま}んなかの {線|せん}で {折|お}ると {左|ひだり}と {右|みぎ}が かさなる {線対称|せんたいしょう}の もじだよ。「A」「H」「T」「U」も そうだね。",
    visual: { kind: "emoji", value: "🅼", caption: "M は {対称|たいしょう}" },
    format: "choice",
    choices: ["M", "F", "G", "R"],
    answer: "M",
  },
  {
    id: `${U.symmetry}.q-7`,
    unitId: U.symmetry,
    prompt: "たての {線|せん}で {折|お}っても かさならない（{線対称|せんたいしょう}じゃ ない）もじは？",
    explanation:
      "「A」「H」「T」は {折|お}ると かさなるけど、「R」は {左右|さゆう}が ちがう かたちで かさならないよ。だから {線対称|せんたいしょう}じゃ ないんだ。",
    visual: { kind: "emoji", value: "🆁", caption: "R は かさならない" },
    format: "choice",
    choices: ["R", "A", "H", "T"],
    answer: "R",
  },
  {
    id: `${U.symmetry}.q-8`,
    unitId: U.symmetry,
    prompt: "{真|ま}んなかを {中心|ちゅうしん}に 180ど まわすと おなじに {見|み}える もじは？",
    explanation:
      "「N」は 180ど まわしても おなじ かたちに {見|み}えるよ。これを「{点対称|てんたいしょう}」と いうんだ。「S」「Z」「O」「X」も そうだね。",
    visual: { kind: "emoji", value: "🔄", caption: "まわしても おなじ" },
    format: "choice",
    choices: ["N", "A", "B", "C"],
    answer: "N",
  },
  {
    id: `${U.symmetry}.q-9`,
    unitId: U.symmetry,
    prompt: "{真|ま}んなかで {折|お}ると {左右|さゆう}が ぴったり かさなる かたちは？",
    explanation:
      "ハートは {真|ま}んなかの たての {線|せん}で {折|お}ると {左|ひだり}と {右|みぎ}が ぴったり かさなるよ。これが「{線対称|せんたいしょう}（{左右対称|さゆうたいしょう}）」だね。",
    visual: { kind: "emoji", value: "❤️", caption: "{左右|さゆう}が おなじ" },
    format: "choice",
    choices: ["ハート", "くつ {片方|かたほう}", "うずまき", "{手|て}の かたち"],
    answer: "ハート",
  },
  {
    id: `${U.symmetry}.q-10`,
    unitId: U.symmetry,
    prompt: "{一筆書|ひとふでが}き（ペンを はなさず ぜんぶ なぞる）が できるのは どれ？",
    explanation:
      "{三角形|さんかくけい}は ちょうてんを じゅんに たどれば {一筆|ひとふで}で かけるよ。{線|せん}が つながって いない ものや、{離|はな}れた かたちは {一筆|ひとふで}では かけないんだ。",
    visual: { kind: "emoji", value: "🔺", caption: "{三角形|さんかくけい}" },
    format: "choice",
    choices: ["{三角形|さんかくけい}", "ばらばらの {点|てん}", "つながらない 2{本|ほん}の {線|せん}", "{離|はな}れた 2つの {丸|まる}"],
    answer: "{三角形|さんかくけい}",
  },
  {
    id: `${U.symmetry}.q-11`,
    unitId: U.symmetry,
    prompt: "{一筆書|ひとふでが}きが できるか どうかは、おもに なにで きまる？",
    explanation:
      "{線|せん}が あつまる {点|てん}に、なん{本|ぼん}の {線|せん}が つながって いるかで きまるんだ。これが {大学|だいがく}の グラフりろん（トポロジー）の {考|かんが}え{方|かた}だよ。",
    visual: { kind: "emoji", value: "🔗", caption: "{点|てん}に あつまる {線|せん}の {数|かず}" },
    format: "choice",
    choices: ["あつまる {線|せん}の {数|かず}", "かたちの {色|いろ}", "かたちの {大|おお}きさ", "かみの まいすう"],
    answer: "あつまる {線|せん}の {数|かず}",
  },
  {
    id: `${U.symmetry}.q-12`,
    unitId: U.symmetry,
    prompt: "{正方形|せいほうけい}（ましかく）を たての {線|せん}で {折|お}ると {左右|さゆう}は どうなる？",
    explanation:
      "ましかくは たての {真|ま}んなかで {折|お}ると {左|ひだり}と {右|みぎ}が ぴったり かさなるよ。ましかくは {線対称|せんたいしょう}な かたちなんだ。",
    visual: { kind: "emoji", value: "⬜", caption: "{折|お}ると かさなる" },
    format: "choice",
    choices: ["ぴったり かさなる", "ぜんぜん ちがう", "{大|おお}きく なる", "きえる"],
    answer: "ぴったり かさなる",
  },
  {
    id: `${U.symmetry}.q-13`,
    unitId: U.symmetry,
    prompt: "{円|えん}（まる）には、{折|お}ると かさなる たいしょうの {線|せん}が なん{本|ぼん} ある？",
    explanation:
      "{円|えん}は {中心|ちゅうしん}を とおる {線|せん}なら どこで {折|お}っても ぴったり かさなるよ。だから たいしょうの {線|せん}は「なん{本|ぼん}も（むげん）」あるんだ。いちばん たいしょうな かたちだね。",
    visual: { kind: "emoji", value: "⭕", caption: "どこで {折|お}っても かさなる" },
    format: "choice",
    choices: ["なん{本|ぼん}も（むげん）", "1{本|ぽん}だけ", "2{本|ほん}", "ない"],
    answer: "なん{本|ぼん}も（むげん）",
  },
  {
    id: `${U.symmetry}.q-14`,
    unitId: U.symmetry,
    prompt: "{正方形|せいほうけい}（ましかく）の たいしょうの {線|せん}は ぜんぶで なん{本|ぼん}？",
    explanation:
      "ましかくは たて・よこ・ななめ2{本|ほん}の あわせて 4{本|ほん}で {折|お}ると かさなるよ。だから たいしょうの {線|せん}は 4{本|ほん}。とても たいしょうな かたちだね。",
    visual: { kind: "emoji", value: "⬜", caption: "たて・よこ・ななめ2" },
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.symmetry}.q-15`,
    unitId: U.symmetry,
    prompt: "{長方形|ちょうほうけい}（たてよこ ちがう しかく）の たいしょうの {線|せん}は なん{本|ぼん}？",
    explanation:
      "{長方形|ちょうほうけい}は たての {線|せん}と よこの {線|せん}の 2{本|ほん}で {折|お}ると かさなるよ。ななめでは かさならない から、ましかくより すくない 2{本|ほん}だね。",
    visual: { kind: "emoji", value: "▭", caption: "たて・よこ の 2{本|ほん}" },
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.symmetry}.q-16`,
    unitId: U.symmetry,
    prompt: "{三角形|さんかくけい}を {一筆|ひとふで}で かく じゅんばんに ならべよう。",
    explanation:
      "ちょうてんA→B→C→と たどって さいごに Aへ もどると {三角形|さんかくけい}が {一筆|ひとふで}で かけるよ。{頂点|ちょうてん}を じゅんに たどるのが コツだね。",
    visual: { kind: "emoji", value: "🔺", caption: "A → B → C" },
    format: "ordering",
    items: ["①ちょうてんA", "②ちょうてんB", "③ちょうてんC"],
    answerOrder: [0, 1, 2],
  },
  {
    id: `${U.symmetry}.q-17`,
    unitId: U.symmetry,
    prompt: "かたちと とくちょうを むすぼう。",
    explanation:
      "ちょうちょは {真|ま}んなかで {折|お}ると かさなる「{線対称|せんたいしょう}」、「S」は まわすと おなじ「{点対称|てんたいしょう}」、{三角形|さんかくけい}は ペンを はなさず かける「{一筆書|ひとふでが}き」。とくちょうを {見|み}わけよう。",
    visual: { kind: "emoji", value: "🦋", caption: "とくちょう{分|わ}け" },
    format: "matching",
    left: ["ちょうちょ", "アルファベットの S", "{三角形|さんかくけい}"],
    right: ["{線対称|せんたいしょう}", "{点対称|てんたいしょう}", "{一筆書|ひとふでが}き できる"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.symmetry}.q-18`,
    unitId: U.symmetry,
    prompt: "180ど まわしても おなじに {見|み}える（{点対称|てんたいしょう}な）{数字|すうじ}は？",
    explanation:
      "「8」は 180ど まわしても おなじ「8」に {見|み}えるよ。これが {点対称|てんたいしょう}だね。「0」も そうだよ。",
    visual: { kind: "emoji", value: "🔄", caption: "まわしても 8" },
    format: "choice",
    choices: ["8", "4", "7", "3"],
    answer: "8",
  },
  {
    id: `${U.symmetry}.q-19`,
    unitId: U.symmetry,
    prompt: "たての {線|せん}で {折|お}ると {左右|さゆう}が かさなる（{線対称|せんたいしょう}な）{数字|すうじ}は？",
    explanation:
      "「0」は たての {真|ま}んなかで {折|お}ると {左|ひだり}と {右|みぎ}が かさなるよ。「8」も そうだね。2 や 3 や 7 は かさならないんだ。",
    visual: { kind: "emoji", value: "0️⃣", caption: "{折|お}ると かさなる" },
    format: "choice",
    choices: ["0", "2", "3", "7"],
    answer: "0",
  },
  {
    id: `${U.symmetry}.q-20`,
    unitId: U.symmetry,
    prompt: "{離|はな}れた ふたつの {丸|まる}（○ ○）は {一筆書|ひとふでが}き できる？",
    explanation:
      "ふたつの {丸|まる}は つながって いないね。ペンを はなさず かくには {線|せん}が ぜんぶ つながって いる ひつようが あるから、これは {一筆|ひとふで}では かけないよ。",
    visual: { kind: "emoji", value: "⭕⭕", caption: "つながって いない" },
    format: "choice",
    choices: ["できない", "できる", "かんたんに できる", "いつでも できる"],
    answer: "できない",
  },
];

// ── 集約: unitId -> UnitContent（学習4段 + テスト） ──────────────
export const oyoG4Contents: Record<string, UnitContent> = {
  [U.logic]: {
    unitId: U.logic,
    learn: {
      unitId: U.logic,
      steps: [
        {
          heading: "① みのまわりの「ぜんぶ・ある・ない」",
          body: "クラスに 30{人|にん} いるよ。ぜんいんが ぼうしを かぶって いれば「ぜんぶ（すべて）」、10{人|にん}だけ かぶって いれば「ある（いる）」、ひとりも いなければ「ない」。この 3つを 口に だして つかい{分|わ}けて みよう。まいにち つかう ことばだけど、はっきり {区別|くべつ}できると ろんりが つよく なるよ。",
          visual: { kind: "emoji", value: "🧢🧢🧢", caption: "ぜんぶ かぶって いる" },
        },
        {
          heading: "② パズルで たしかめよう",
          body: "「もし {雨|あめ}なら かさを さす」を ためそう。①いま {雨|あめ}？→ふって いる。②なら けっか「かさを さす」が おきる。じょうけん（もし〜）と けっか（〜する）を ①②の じゅんに たどると、コンピュータの「if（もし）」と おなじ かんがえ{方|かた}に なるんだ。",
          visual: { kind: "emoji", value: "🌧️➡️☂️", caption: "もし〜なら" },
        },
        {
          heading: "③ きまりを {見|み}つける（{反例|はんれい}）",
          body: "「すべての りんごは あかい」を くずすには？ みどりの りんごを たった 1こ {見|み}つければ いい。この 1こを「{反例|はんれい}」と いうよ。たくさん しらべなくても、あてはまらない {例|れい}が 1こ あれば「すべて」は くずせるんだ。{数学|すうがく}の {証明|しょうめい}でも つかう つよい わざだよ。",
          visual: { kind: "emoji", value: "🍏", caption: "1こ でも ちがえば くずれる" },
        },
        {
          heading: "④ やってみよう",
          body: "「{犬|いぬ}は ぜんぶ {動物|どうぶつ}」は {正|ただ}しい。じゃあ ひっくりかえした「{動物|どうぶつ}は ぜんぶ {犬|いぬ}」は？ ねこも {動物|どうぶつ}だから {反例|はんれい}に なって、これは まちがい。{逆|ぎゃく}に した ことが いつも {正|ただ}しいとは かぎらないんだ。テストで ためそう。",
          visual: { kind: "emoji", value: "🐶🐱", caption: "{逆|ぎゃく}は {正|ただ}しいとは かぎらない" },
        },
      ],
    },
    test: { unitId: U.logic, questions: logicQuestions, questionCount: 20 },
  },

  [U.sets]: {
    unitId: U.sets,
    learn: {
      unitId: U.sets,
      steps: [
        {
          heading: "① おもちゃばこの なかま{分|わ}け",
          body: "つみき・ぬいぐるみ・くるまを はこに {分|わ}けると かたづけやすいね。「{乗|の}りもの」「どうぶつ」のように おなじ {仲間|なかま}を あつめた もの、それが「{集合|しゅうごう}」だよ。にて いても なかまが ちがう ものを {分|わ}ける、なかま{分|わ}けが {集合|しゅうごう}の だいいっぽ だよ。",
          visual: { kind: "emoji", value: "🧸🚗🧱", caption: "なかまで あつめる" },
        },
        {
          heading: "② ベン{図|ず}で かさなりを {見|み}る",
          body: "「{赤|あか}い もの」の {丸|まる}と「{丸|まる}い もの」の {丸|まる}を かさねて かいて みよう。りんごは {赤|あか}くて {丸|まる}いから、{両方|りょうほう}の {丸|まる}が かさなった ところに {入|はい}る。この かさなりを「{共通|きょうつう}{部分|ぶぶん}（AかつB）」と いうよ。けんさくで しぼりこむ ときと おなじ {考|かんが}え{方|かた}だね。",
          visual: { kind: "emoji", value: "🔴🟡", caption: "ふたつの {丸|まる}の かさなり" },
        },
        {
          heading: "③ きまりを {見|み}つける（だけ・りょうほう）",
          body: "ふたつの {丸|まる}を かくと、ばしょは 4つに わかれる。いぬ「だけ」・ねこ「だけ」・「{両方|りょうほう}」・「どちらでも ない」。「{両方|りょうほう}」は かさなり、「どちらでも ない」は {丸|まる}の そと。それぞれ たし{算|ざん}・ひき{算|ざん}で {人数|にんずう}が もとめられるよ。",
          visual: { kind: "emoji", value: "🐶🐱", caption: "4つの ばしょ" },
        },
        {
          heading: "④ やってみよう",
          body: "いぬ すき 8{人|にん}の うち、{両方|りょうほう}すきが 3{人|にん}。いぬ「だけ」すきは、8 から かさなりの 3 を ひいて 8−3＝5{人|にん}。ブロックが 3こ きえて 5こ のこる ようすを {見|み}て、{自分|じぶん}でも ベン{図|ず}を かいて たしかめよう。",
          visual: { kind: "anim", name: "blocks-remove", params: { total: 8, remove: 3 }, caption: "8 − 3 = 5" },
        },
      ],
    },
    test: { unitId: U.sets, questions: setsQuestions, questionCount: 20 },
  },

  [U.probability]: {
    unitId: U.probability,
    learn: {
      unitId: U.probability,
      steps: [
        {
          heading: "① さいころと くじで あそぼう",
          body: "さいころを ふると、どの {目|め}が でるか まえもって わからない。でも なんども ふると「{出|で}やすい・{出|で}にくい」の ちがいが {見|み}えて くる。この「{起|お}こりやすさ」を {数|かず}で あらわすのが かくりつだよ。",
          visual: { kind: "emoji", value: "🎲", caption: "どれが でるかな" },
        },
        {
          heading: "② {場合|ばあい}の {数|かず}を かぞえる",
          body: "まず「ぜんぶで なんとおり あるか」を かぞえよう。さいころの {目|め}は 1・2・3・4・5・6 の 6とおり。コインは おもて・うらの 2とおり。この ぜんぶの {数|かず}を「{場合|ばあい}の {数|かず}」と いうよ。これが かくりつの {第一歩|だいいっぽ}だよ。",
          visual: { kind: "anim", name: "count-up", params: { to: 6, emoji: "🎲" }, caption: "{目|め}は 6とおり" },
        },
        {
          heading: "③ きまりを {見|み}つける（あたり ÷ ぜんぶ）",
          body: "「あたりの {数|かず}」を「ぜんぶの {数|かず}」で くらべると {起|お}こりやすさが わかる。さいころで 3 が でるのは、6つの {目|め}の うち あたりが 1つ だから「6かいに 1かい」。あたりの わりあいが おおきいほど {起|お}こりやすいんだ。",
          visual: { kind: "emoji", value: "🎯", caption: "1 / 6" },
        },
        {
          heading: "④ やってみよう",
          body: "10{本|ぽん}{中|ちゅう} 2{本|ほん} あたりの A と、5{本|ほん} あたりの B。あたりが おおい B の ほうが あたりやすいね。かくりつは 0%（ぜったい ない）から 100%（かならず）の あいだで あらわす。{天気|てんき}の「{降水|こうすい}かくりつ」も この かんがえ{方|かた}だよ。",
          visual: { kind: "emoji", value: "🎫", caption: "おおい ほうが あたりやすい" },
        },
      ],
    },
    test: { unitId: U.probability, questions: probabilityQuestions, questionCount: 20 },
  },

  [U.statistics]: {
    unitId: U.statistics,
    learn: {
      unitId: U.statistics,
      steps: [
        {
          heading: "① すきな くだものを しらべよう",
          body: "クラスの みんなに すきな くだものを きいて、「{正|せい}の{字|じ}」で 1・2・3…と かぞえて いく。りんご5・みかん2・ぶどう8 のように {数|かず}に すると くらべられる。これが データ{集|あつ}めの はじまりだよ。",
          visual: { kind: "emoji", value: "🍎🍊🍌", caption: "アンケート" },
        },
        {
          heading: "② {表|ひょう}と グラフで {見|み}える{化|か}",
          body: "{集|あつ}めた {数|かず}を {表|ひょう}に かいて、ぼうグラフに すると、ぼうの {長|なが}さで どれが おおいか ひと{目|め}で わかるよ。いちばん おおい ぶどう(8)が いちばん {長|なが}い ぼうに なるね。",
          visual: { kind: "emoji", value: "📊", caption: "ぼうグラフ" },
        },
        {
          heading: "③ きまりを {見|み}つける（へいきん）",
          body: "「ぜんぶ たして、こ{数|すう}で わる」と へいきんが もとまる。2・4・6 なら、たして 2＋4＋6＝12、こ{数|すう}3で わって 12÷3＝4。でこぼこを たいらに「ならした」{数|かず}が へいきんだよ。",
          visual: { kind: "anim", name: "count-up", params: { to: 4 }, caption: "ならすと 4" },
        },
        {
          heading: "④ やってみよう",
          body: "てんすう 10・8・6 の へいきんは？ ①ぜんぶ たす→10＋8＋6＝24。②こ{数|すう}3で わる→24÷3＝8。①②の じゅんに すれば いつでも もとまるよ。{自分|じぶん}で データを {集|あつ}めて へいきんを だして みよう。",
          visual: { kind: "anim", name: "count-up", params: { to: 24 }, caption: "10+8+6 = 24" },
        },
      ],
    },
    test: { unitId: U.statistics, questions: statisticsQuestions, questionCount: 20 },
  },

  [U.pattern]: {
    unitId: U.pattern,
    learn: {
      unitId: U.pattern,
      steps: [
        {
          heading: "① もようの くりかえし",
          body: "あか・あお・あか・あお…と ならぶ もよう。なんこ ごとに くりかえすかを {見|み}つければ、つぎは あか だと よそうできる。みのまわりは こんな パターンで いっぱいだよ。",
          visual: { kind: "emoji", value: "🔴🔵🔴🔵", caption: "くりかえし" },
        },
        {
          heading: "② ブロックで ふえ{方|かた}を {見|み}る",
          body: "2・4・6・8…と {数|かず}を 0から かぞえあげて いくと、2ずつ ふえて いくのが {目|め}で {見|み}える。「まえの {数|かず}より いくつ ふえたか」を しらべるのが きまり{見|み}つけの コツだよ。",
          visual: { kind: "anim", name: "count-up", params: { to: 8 }, caption: "2ずつ ふえる" },
        },
        {
          heading: "③ きまりを {見|み}つける",
          body: "ふえ{方|かた}を しらべよう。1・2・4・8 は 2ばいずつ ふえる。1・1・2・3・5 は まえの 2つを たす「フィボナッチ」。これは ひまわりの たねの ならびや {花|はな}びらの {数|かず}にも かくれて いるんだ。",
          visual: { kind: "anim", name: "grow", params: {}, caption: "だんだん そだつ" },
        },
        {
          heading: "④ やってみよう",
          body: "きまりが わかれば つぎが よめる。2・4・6・8 の つぎは ＋2 で 10、1・1・2・3・5 の つぎは 3＋5 で 8。テストで いろいろな すうれつの パターンを {当|あ}てて みよう。",
          visual: { kind: "emoji", value: "🔢", caption: "つぎは なに？" },
        },
      ],
    },
    test: { unitId: U.pattern, questions: patternQuestions, questionCount: 20 },
  },

  [U.symmetry]: {
    unitId: U.symmetry,
    learn: {
      unitId: U.symmetry,
      steps: [
        {
          heading: "① かみを {折|お}って たしかめよう",
          body: "かみに ちょうちょを かいて {真|ま}んなかで パタンと {折|お}って みよう。{左|ひだり}の はねと {右|みぎ}の はねが ぴったり かさなる。この「{折|お}ると かさなる」を「{線対称|せんたいしょう}（{左右対称|さゆうたいしょう}）」と いうよ。",
          visual: { kind: "emoji", value: "🦋", caption: "{折|お}ると かさなる" },
        },
        {
          heading: "② いろいろな かたちで {体感|たいかん}",
          body: "ハートや アルファベットの「A」「H」も {真|ま}んなかの たての {線|せん}で {左右|さゆう}が おなじ。いっぽう「S」や「N」は {折|お}っても かさならないけど、{真|ま}んなかを {中心|ちゅうしん}に 180ど まわすと おなじに {見|み}える（{点対称|てんたいしょう}）。{手|て}で まわして たしかめよう。",
          visual: { kind: "emoji", value: "❤️", caption: "{線|せん}で おりかえす" },
        },
        {
          heading: "③ きまりを {見|み}つける（{一筆書|ひとふでが}き）",
          body: "ペンを はなさず ぜんぶ なぞれる かたちと、なぞれない かたちが ある。{線|せん}が あつまる {点|てん}に なん{本|ぼん}の {線|せん}が つながって いるかで きまるんだ。これが {大学|だいがく}の グラフりろん（トポロジー）の はじまりだよ。",
          visual: { kind: "emoji", value: "🔺", caption: "{一筆|ひとふで}で かける？" },
        },
        {
          heading: "④ やってみよう",
          body: "{三角形|さんかくけい}や ましかくは、かどを ①→②→③→…と じゅんに たどれば {一筆|ひとふで}で かける。{真|ま}んなかで {折|お}ると かさなる {対称|たいしょう}な もじ さがしと、{一筆書|ひとふでが}きに ちょうせん しよう。",
          visual: { kind: "emoji", value: "✏️", caption: "なぞって みよう" },
        },
      ],
    },
    test: { unitId: U.symmetry, questions: symmetryQuestions, questionCount: 20 },
  },
};
