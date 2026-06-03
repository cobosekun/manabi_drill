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
          body: "クラスの ぜんいんが ぼうしを かぶって いれば「ぜんぶ」、{何人|なんにん}かなら「ある（いる）」、ひとりも いなければ「ない」。まいにち つかう ことばだね。",
          visual: { kind: "emoji", value: "🧢🧢🧢", caption: "ぜんぶ かぶって いる" },
        },
        {
          heading: "② パズルで たしかめよう",
          body: "「もし {雨|あめ}なら かさを さす」。{雨|あめ}が ふって いるのに かさが なければ おかしいね。じょうけんと けっかを ならべて {手|て}で たしかめよう。",
          visual: { kind: "emoji", value: "🌧️➡️☂️", caption: "もし〜なら" },
        },
        {
          heading: "③ きまりを {見|み}つける（{反例|はんれい}）",
          body: "「すべて〜」を くずすには、あてはまらない {例|れい}が たった 1こ あれば いいよ。これを「{反例|はんれい}」と いうんだ。{数学|すうがく}の {証明|しょうめい}でも つかう つよい わざ。",
          visual: { kind: "emoji", value: "🍏", caption: "1こ でも ちがえば くずれる" },
        },
        {
          heading: "④ やってみよう",
          body: "「{犬|いぬ}は ぜんぶ {動物|どうぶつ}」は {正|ただ}しい。でも「{動物|どうぶつ}は ぜんぶ {犬|いぬ}」は？ ねこを {反例|はんれい}に すれば まちがいと わかるね。テストで ためそう。",
          visual: { kind: "emoji", value: "🐶🐱", caption: "{逆|ぎゃく}は {正|ただ}しいとは かぎらない" },
        },
      ],
    },
    test: { unitId: U.logic, questions: logicQuestions, questionCount: 5 },
  },

  [U.sets]: {
    unitId: U.sets,
    learn: {
      unitId: U.sets,
      steps: [
        {
          heading: "① おもちゃばこの なかま{分|わ}け",
          body: "つみき・ぬいぐるみ・くるまを はこに {分|わ}けると かたづけやすいね。おなじ {仲間|なかま}を あつめた もの、それが「{集合|しゅうごう}」だよ。",
          visual: { kind: "emoji", value: "🧸🚗🧱", caption: "なかまで あつめる" },
        },
        {
          heading: "② ベン{図|ず}で かさなりを {見|み}る",
          body: "「{赤|あか}い もの」の {丸|まる}と「{丸|まる}い もの」の {丸|まる}を かさねると、りんごは {両方|りょうほう}に {入|はい}る。かさなった ところが「{共通|きょうつう}」だよ。",
          visual: { kind: "emoji", value: "🔴🟡", caption: "ふたつの {丸|まる}の かさなり" },
        },
        {
          heading: "③ きまりを {見|み}つける（だけ・りょうほう）",
          body: "いぬ「だけ」「ねこ だけ」「{両方|りょうほう}」「どちらでも ない」の 4つの ばしょに わかれるよ。たし{算|ざん}・ひき{算|ざん}で {人数|にんずう}が もとめられる。",
          visual: { kind: "emoji", value: "🐶🐱", caption: "4つの ばしょ" },
        },
        {
          heading: "④ やってみよう",
          body: "いぬ すき 8{人|にん}、{両方|りょうほう}すき 3{人|にん}なら、いぬ「だけ」は 8−3＝5{人|にん}。ベン{図|ず}を かいて {手|て}で かぞえて みよう。",
          visual: { kind: "emoji", value: "✏️", caption: "8 − 3 = 5" },
        },
      ],
    },
    test: { unitId: U.sets, questions: setsQuestions, questionCount: 5 },
  },

  [U.probability]: {
    unitId: U.probability,
    learn: {
      unitId: U.probability,
      steps: [
        {
          heading: "① さいころと くじで あそぼう",
          body: "さいころを ふると どの {目|め}が でるか わからない。でも「{起|お}こりやすい・おこりにくい」の ちがいは あるよね。",
          visual: { kind: "emoji", value: "🎲", caption: "どれが でるかな" },
        },
        {
          heading: "② {場合|ばあい}の {数|かず}を かぞえる",
          body: "さいころの {目|め}は 1〜6 の 6とおり。コインは おもて・うらの 2とおり。まず ぜんぶの {場合|ばあい}を かぞえるのが コツだよ。",
          visual: { kind: "emoji", value: "🪙", caption: "おもて・うら = 2とおり" },
        },
        {
          heading: "③ きまりを {見|み}つける（あたり ÷ ぜんぶ）",
          body: "「あたりの {数|かず}」を「ぜんぶの {数|かず}」で くらべると {起|お}こりやすさが わかるよ。さいころで 3 が でるのは 6つに 1つだね。",
          visual: { kind: "emoji", value: "🎯", caption: "1 / 6" },
        },
        {
          heading: "④ やってみよう",
          body: "10{本|ぽん}{中|ちゅう} 2{本|ほん} あたりの A と、5{本|ほん} あたりの B、あたりやすいのは B。0%（ぜったい ない）〜100%（かならず）で {考|かんが}えて みよう。",
          visual: { kind: "emoji", value: "🎫", caption: "おおい ほうが あたりやすい" },
        },
      ],
    },
    test: { unitId: U.probability, questions: probabilityQuestions, questionCount: 5 },
  },

  [U.statistics]: {
    unitId: U.statistics,
    learn: {
      unitId: U.statistics,
      steps: [
        {
          heading: "① すきな くだものを しらべよう",
          body: "クラスの みんなに すきな くだものを きいて、「{正|せい}の{字|じ}」で {数|かず}を かぞえる。これが データ{集|あつ}めの はじまりだよ。",
          visual: { kind: "emoji", value: "🍎🍊🍌", caption: "アンケート" },
        },
        {
          heading: "② {表|ひょう}と グラフで {見|み}える{化|か}",
          body: "{集|あつ}めた {数|かず}を {表|ひょう}に かいて、ぼうグラフに すると どれが おおいか ひと{目|め}で わかるよ。",
          visual: { kind: "emoji", value: "📊", caption: "ぼうグラフ" },
        },
        {
          heading: "③ きまりを {見|み}つける（へいきん）",
          body: "「ぜんぶ たして こ{数|すう}で わる」と へいきんが もとまるよ。2・4・6 なら (2+4+6)÷3＝4。データの まんなかを あらわすよ。",
          visual: { kind: "emoji", value: "⚖️", caption: "ならすと 4" },
        },
        {
          heading: "④ やってみよう",
          body: "てんすう 10・8・6 の へいきんは？ ぜんぶ たすと 24、3で わって 8。{自分|じぶん}で データを {集|あつ}めて へいきんを だして みよう。",
          visual: { kind: "emoji", value: "📝", caption: "24 ÷ 3 = 8" },
        },
      ],
    },
    test: { unitId: U.statistics, questions: statisticsQuestions, questionCount: 5 },
  },

  [U.pattern]: {
    unitId: U.pattern,
    learn: {
      unitId: U.pattern,
      steps: [
        {
          heading: "① もようの くりかえし",
          body: "あか・あお・あか・あお…と ならぶ もよう。つぎは あか だと よそうできるね。みのまわりは パターンで いっぱいだよ。",
          visual: { kind: "emoji", value: "🔴🔵🔴🔵", caption: "くりかえし" },
        },
        {
          heading: "② ブロックで ふえ{方|かた}を {見|み}る",
          body: "2・4・6・8…と ブロックを ならべると、2ずつ ふえて いくのが {目|め}で {見|み}えるよ。",
          visual: { kind: "svg", name: "number-blocks", params: { count: 8 }, caption: "2ずつ ふえる" },
        },
        {
          heading: "③ きまりを {見|み}つける",
          body: "「いくつ ふえたか」「かけ{算|ざん}か」を しらべると きまりが わかるよ。1・2・4・8 は ばいばい、1・1・2・3・5 は まえ2つの たし{算|ざん}（フィボナッチ）。",
          visual: { kind: "emoji", value: "🌻", caption: "1+1=2, 2+1=3, 3+2=5" },
        },
        {
          heading: "④ やってみよう",
          body: "きまりが わかれば つぎが よめる。2・4・6・8 の つぎは 10、1・1・2・3・5 の つぎは 8。テストで パターンを {当|あ}てて みよう。",
          visual: { kind: "emoji", value: "🔢", caption: "つぎは なに？" },
        },
      ],
    },
    test: { unitId: U.pattern, questions: patternQuestions, questionCount: 5 },
  },

  [U.symmetry]: {
    unitId: U.symmetry,
    learn: {
      unitId: U.symmetry,
      steps: [
        {
          heading: "① かみを {折|お}って たしかめよう",
          body: "かみに ちょうちょを かいて {真|ま}んなかで {折|お}ると、{左|ひだり}と {右|みぎ}が ぴったり かさなる。これが「{左右対称|さゆうたいしょう}」だよ。",
          visual: { kind: "emoji", value: "🦋", caption: "{折|お}ると かさなる" },
        },
        {
          heading: "② いろいろな かたちで {体感|たいかん}",
          body: "ハートや 「A」「H」も {真|ま}んなかの {線|せん}で {左右|さゆう}が おなじ。「S」は まわすと おなじ（{点対称|てんたいしょう}）。{手|て}を うごかして たしかめよう。",
          visual: { kind: "emoji", value: "❤️", caption: "{線|せん}で おりかえす" },
        },
        {
          heading: "③ きまりを {見|み}つける（{一筆書|ひとふでが}き）",
          body: "ペンを はなさず ぜんぶ なぞれる かたちと なぞれない かたちが ある。{線|せん}の あつまる {点|てん}の つながり{方|かた}で きまるんだ（トポロジー）。",
          visual: { kind: "emoji", value: "🔺", caption: "{一筆|ひとふで}で かける？" },
        },
        {
          heading: "④ やってみよう",
          body: "{三角形|さんかくけい}や ましかくは かどを じゅんに たどれば {一筆|ひとふで}で かける。{対称|たいしょう}な もじ さがしと {一筆書|ひとふでが}きに ちょうせん しよう。",
          visual: { kind: "emoji", value: "✏️", caption: "なぞって みよう" },
        },
      ],
    },
    test: { unitId: U.symmetry, questions: symmetryQuestions, questionCount: 5 },
  },
};
