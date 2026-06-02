// ══════════════════════════════════════════
// カリキュラム: 応用（おうよう / oyo）小3 — 大学レベルの概念を「やさしく・手を動かして解ける」
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "oyo.<domain-slug>" / 単元 = "oyo.g<grade>.<slug>"
// 基準テンプレ実装 = src/data/curriculum/oyo/g2.ts と同形。
//
// 【SubjectId】src/types/drill.ts に "oyo" 追加済み → 局所キャスト不要（素の "oyo" を使用）。
// 【index.ts】未編集。集約は中央で行う。
//
// 【応用4段ルール（厳守）】各 Unit の learn.steps は必ず4段:
//   ① 身近な具体 → ② 図・操作で体感 → ③ きまり発見 → ④ やってみる。
//   「難しさを見せる」のではなく「本質をやさしく・手を動かして解ける」を徹底。
//
// 【ルビ記法】全表示テキストは {漢字|よみ}。ひらがな/カタカナ/数字/記号はそのまま。
//   送り仮名は基底に含めない（{食|た}べる）。出る漢字には必ずルビ。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  NumberInputQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const oyoSubject: Subject = {
  id: "oyo",
  name: "おうよう",
  formalName: "応用（大学レベルをやさしく）",
  emoji: "🚀",
  theme: "violet",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────

export const oyoG3Domains: Domain[] = [
  {
    id: "oyo.info",
    subjectId: "oyo",
    name: "{情報|じょうほう}の しくみ",
    formalName: "情報科学（二進法・暗号）",
  },
  {
    id: "oyo.logic-set",
    subjectId: "oyo",
    name: "{論理|ろんり}と {仲間|なかま}",
    formalName: "論理・集合",
  },
  {
    id: "oyo.data",
    subjectId: "oyo",
    name: "データと かくりつ",
    formalName: "統計・確率",
  },
  {
    id: "oyo.economy",
    subjectId: "oyo",
    name: "けいざいの はじまり",
    formalName: "経済",
  },
];

// ── 前提に参照する基礎単元（中央集約時に解決） ──
//   sansuu.g1.* は既存スライス、oyo.g2.* は前学年の応用スライス。
const SANSUU = {
  numbersTo10: "sansuu.g1.numbers-to-10",
  addWithin10: "sansuu.g1.add-within-10",
} as const;
const OYO_G2 = {
  grouping: "oyo.g2.grouping",
} as const;

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。oyo 内＋既存スライスへ接続）:
//
//   sansuu.g1.numbers-to-10 ─▶ binary ──┐
//   oyo.g2.grouping ─▶ logic ─▶ probability ─┼─▶ statistics ─▶ economy
//                                          ┘
//
const U = {
  binary: "oyo.g3.binary",
  logic: "oyo.g3.logic",
  probability: "oyo.g3.probability",
  statistics: "oyo.g3.statistics",
  economy: "oyo.g3.economy",
} as const;

export const oyoG3Units: Unit[] = [
  {
    id: U.binary,
    subjectId: "oyo",
    grade: 3,
    domainId: "oyo.info",
    title: "0と1の せかい（{二進法|にしんほう}）",
    order: 1,
    // 中高大への接続: 二進法 → 中高の情報、大学の計算機科学・デジタル回路。
    realWorldUse: "{二進法|にしんほう}は、コンピュータや スマホが {中|なか}で かずや もじを あらわす しくみそのものだよ。",
    leadsTo: [U.statistics],
    prerequisites: [SANSUU.numbersTo10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.logic,
    subjectId: "oyo",
    grade: 3,
    domainId: "oyo.logic-set",
    title: "ろんりパズル（ぜんぶ・ある・ない）",
    order: 2,
    // 中高大への接続: 論理 → 中高の数学の証明・命題、大学の論理学・プログラミングの条件分岐。
    realWorldUse: "「ぜんぶ・ある・ない」を きちんと わけて かんがえる ちからは、なぞときや プログラムづくりに やくだつよ。",
    leadsTo: [U.probability],
    prerequisites: [OYO_G2.grouping],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.probability,
    subjectId: "oyo",
    grade: 3,
    domainId: "oyo.data",
    title: "おこりやすさ（かくりつ）",
    order: 3,
    // 中高大への接続: 確率 → 中高の確率統計、大学の統計学・データサイエンス・AI。
    realWorldUse: "おこりやすさを かずで かんがえる ことは、{天気|てんき}よほうや ゲームの さくせんに やくだつよ。",
    leadsTo: [U.statistics],
    prerequisites: [U.logic],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.statistics,
    subjectId: "oyo",
    grade: 3,
    domainId: "oyo.data",
    title: "データを しらべる（とうけい）",
    order: 4,
    // 中高大への接続: 統計 → 中高のデータの活用、大学の統計学・データサイエンス。
    realWorldUse: "データを {集|あつ}めて グラフに すると、いちばん {多|おお}い ものや ぜんたいの ようすが ひとめで わかるよ。",
    leadsTo: [U.economy],
    prerequisites: [U.binary, U.probability],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.economy,
    subjectId: "oyo",
    grade: 3,
    domainId: "oyo.economy",
    title: "こうかんと ねだん（けいざい）",
    order: 5,
    // 中高大への接続: 需要と供給 → 中高の公民・政治経済、大学の経済学（ミクロ）。
    realWorldUse: "ねだんが きまる しくみが わかると、かいものや ニュースの けいざいの はなしが よくわかるよ。",
    leadsTo: [],
    prerequisites: [U.statistics, SANSUU.addWithin10],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn[4段] + テスト test）。全問 explanation 必須・全漢字ルビ。
// ══════════════════════════════════════════

// ── 二進法 ──
const binaryQuestions: (NumberInputQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.binary}.q-1`,
    unitId: U.binary,
    prompt: "{二進法|にしんほう}の「10」は ふつうの かずで いくつ？",
    explanation: "{二進法|にしんほう}の「10」は 2の くらいが 1、1の くらいが 0。だから 2だよ。",
    visual: { kind: "emoji", value: "1️⃣0️⃣", caption: "2の くらい と 1の くらい" },
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.binary}.q-2`,
    unitId: U.binary,
    prompt: "{二進法|にしんほう}の「11」は ふつうの かずで いくつ？",
    explanation: "2の くらいが 1、1の くらいが 1。2＋1で 3だよ。",
    visual: { kind: "emoji", value: "1️⃣1️⃣", caption: "2＋1" },
    format: "number-input",
    answer: 3,
  },
  {
    id: `${U.binary}.q-3`,
    unitId: U.binary,
    prompt: "{二進法|にしんほう}の「100」は ふつうの かずで いくつ？",
    explanation: "4の くらいが 1、あとは 0。だから 4だよ。くらいは 1・2・4と 2ばいずつ あがるよ。",
    visual: { kind: "emoji", value: "1️⃣0️⃣0️⃣", caption: "4の くらい" },
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.binary}.q-4`,
    unitId: U.binary,
    prompt: "コンピュータが かずを あらわす とき、つかう すうじは いくつ？",
    explanation: "コンピュータは でんきの オン（1）と オフ（0）の 2つで すべてを あらわすよ。",
    visual: { kind: "emoji", value: "💡", caption: "オン と オフ" },
    format: "choice",
    choices: ["0と1の 2つ", "0から9の 10こ", "1だけ", "100こ"],
    answer: "0と1の 2つ",
  },
  {
    id: `${U.binary}.q-5`,
    unitId: U.binary,
    prompt: "{二進法|にしんほう}で くらいが あがる とき、{何|なん}ばいに なる？",
    explanation: "{二進法|にしんほう}は 1→2→4→8と 2ばいずつ くらいが あがるよ。ふつうの かずは 10ばいずつだね。",
    visual: { kind: "emoji", value: "🔢", caption: "2ばいずつ" },
    format: "choice",
    choices: ["2ばい", "10ばい", "5ばい", "100ばい"],
    answer: "2ばい",
  },
];

// ── ろんりパズル ──
const logicQuestions: ChoiceQuestion[] = [
  {
    id: `${U.logic}.q-1`,
    unitId: U.logic,
    prompt: "「ぜんぶの ねこは {動物|どうぶつ}」。これは ほんとう？ うそ？",
    explanation: "ねこは みんな {動物|どうぶつ}の {仲間|なかま}。だから ほんとうだよ。",
    visual: { kind: "emoji", value: "🐱", caption: "ねこ ⊂ どうぶつ" },
    format: "choice",
    choices: ["ほんとう", "うそ", "どちらでもない", "わからない"],
    answer: "ほんとう",
  },
  {
    id: `${U.logic}.q-2`,
    unitId: U.logic,
    prompt: "「ぜんぶの {動物|どうぶつ}は ねこ」。これは ほんとう？ うそ？",
    explanation: "いぬや とりも {動物|どうぶつ}だけど ねこでは ない。だから うそだよ。",
    visual: { kind: "emoji", value: "🐶🐦", caption: "ねこ じゃない どうぶつ も いる" },
    format: "choice",
    choices: ["うそ", "ほんとう", "ぜんぶ ねこ", "わからない"],
    answer: "うそ",
  },
  {
    id: `${U.logic}.q-3`,
    unitId: U.logic,
    prompt: "「この はこに りんごは ない」。なら はこに りんごは ある？",
    explanation: "「ない」と いっているので、りんごは {入|はい}っていないよ。",
    visual: { kind: "emoji", value: "📦", caption: "りんごは ない" },
    format: "choice",
    choices: ["ない", "ある", "1こ ある", "わからない"],
    answer: "ない",
  },
  {
    id: `${U.logic}.q-4`,
    unitId: U.logic,
    prompt: "「クラスの だれか {一人|ひとり}は めがねを かけている」が ほんとうの とき、たしかな ことは？",
    explanation: "「だれか {一人|ひとり}は」は、すくなくとも {一人|ひとり}は いる、と いう いみだよ。",
    visual: { kind: "emoji", value: "👓", caption: "1人いじょう いる" },
    format: "choice",
    choices: ["めがねの {人|ひと}が 1{人|にん}いじょう いる", "ぜんいん めがね", "だれも めがね なし", "めがねは 2こ"],
    answer: "めがねの {人|ひと}が 1{人|にん}いじょう いる",
  },
  {
    id: `${U.logic}.q-5`,
    unitId: U.logic,
    prompt: "ろんりパズルで いちばん だいじな ことは どれ？",
    explanation: "わかっている ことを くみあわせて、すじみちを たてて かんがえるのが ろんりだよ。",
    visual: { kind: "emoji", value: "🕵️", caption: "すじみちで かんがえる" },
    format: "choice",
    choices: ["ヒントを くみあわせて すいりする", "てきとうに きめる", "あてずっぽうで えらぶ", "かんがえない"],
    answer: "ヒントを くみあわせて すいりする",
  },
];

// ── おこりやすさ（確率） ──
const probabilityQuestions: ChoiceQuestion[] = [
  {
    id: `${U.probability}.q-1`,
    unitId: U.probability,
    prompt: "ふつうの サイコロの {目|め}は ぜんぶで いくつ？",
    explanation: "サイコロには 1から6までの 6つの {目|め}が あるよ。",
    visual: { kind: "emoji", value: "🎲", caption: "1〜6" },
    format: "choice",
    choices: ["6つ", "2つ", "10", "12"],
    answer: "6つ",
  },
  {
    id: `${U.probability}.q-2`,
    unitId: U.probability,
    prompt: "コインを なげた とき、でかたは {何|なん}とおり？",
    explanation: "コインは おもてか うらの 2とおりだよ。",
    visual: { kind: "emoji", value: "🪙", caption: "おもて か うら" },
    format: "choice",
    choices: ["おもてと うらの 2とおり", "6とおり", "1とおり", "100とおり"],
    answer: "おもてと うらの 2とおり",
  },
  {
    id: `${U.probability}.q-3`,
    unitId: U.probability,
    prompt: "サイコロで「3」が でる おこりやすさに いちばん {近|ちか}いのは？",
    explanation: "6つの {目|め}の うち 3は 1つ。だから 6{回|かい}に 1{回|かい}ぐらいだよ。",
    visual: { kind: "emoji", value: "🎲", caption: "6つの うち 1つ" },
    format: "choice",
    choices: ["6{回|かい}に 1{回|かい}ぐらい", "かならず でる", "ぜったい でない", "2{回|かい}に 1{回|かい}"],
    answer: "6{回|かい}に 1{回|かい}ぐらい",
  },
  {
    id: `${U.probability}.q-4`,
    unitId: U.probability,
    prompt: "サイコロで ぐうすう（2・4・6）が でる おこりやすさは？",
    explanation: "6つの うち ぐうすうは 2・4・6の 3つ。はんぶんだから 2{回|かい}に 1{回|かい}ぐらいだよ。",
    visual: { kind: "emoji", value: "🎲", caption: "2・4・6" },
    format: "choice",
    choices: ["2{回|かい}に 1{回|かい}ぐらい", "6{回|かい}に 1{回|かい}", "ぜったい でない", "かならず でる"],
    answer: "2{回|かい}に 1{回|かい}ぐらい",
  },
  {
    id: `${U.probability}.q-5`,
    unitId: U.probability,
    prompt: "「おこりやすさ」を かずで かんがえる ことは、{何|なに}に やくだつ？",
    explanation: "かくりつは {天気|てんき}よほうや ほけんなど、おこりやすさを よそうする ときに つかわれるよ。",
    visual: { kind: "emoji", value: "☀️☔", caption: "天気よほう" },
    format: "choice",
    choices: ["{天気|てんき}よほうや ゲームの さくせん", "ねむる こと", "{絵|え}を かく こと", "はしる こと"],
    answer: "{天気|てんき}よほうや ゲームの さくせん",
  },
];

// ── データを しらべる（統計） ──
const statisticsQuestions: (ChoiceQuestion | NumberInputQuestion)[] = [
  {
    id: `${U.statistics}.q-1`,
    unitId: U.statistics,
    prompt: "{集|あつ}めた かずを ひとめで くらべるのに べんりな かきかたは？",
    explanation: "ぼうグラフは たかさで かずを くらべられるので、いちばん {多|おお}い ものが ひとめで わかるよ。",
    visual: { kind: "emoji", value: "📊", caption: "ぼうグラフ" },
    format: "choice",
    choices: ["ぼうグラフ", "にっき", "てがみ", "ものがたり"],
    answer: "ぼうグラフ",
  },
  {
    id: `${U.statistics}.q-2`,
    unitId: U.statistics,
    prompt: "2{点|てん}・4{点|てん}・6{点|てん}の へいきんは {何|なん}{点|てん}？",
    explanation: "2＋4＋6＝12。3{人|にん}で わって 12÷3＝4。へいきんは 4{点|てん}だよ。",
    visual: { kind: "emoji", value: "🔢", caption: "たして 人数で わる" },
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.statistics}.q-3`,
    unitId: U.statistics,
    prompt: "りんご5{人|にん}・みかん3{人|にん}・ぶどう2{人|にん}。ぜんぶで {何|なん}{人|にん} こたえた？",
    explanation: "5＋3＋2＝10。ぜんぶで 10{人|にん}だよ。",
    visual: { kind: "emoji", value: "🍎🍊🍇", caption: "ぜんぶ たす" },
    format: "number-input",
    answer: 10,
  },
  {
    id: `${U.statistics}.q-4`,
    unitId: U.statistics,
    prompt: "りんご5{人|にん}・みかん3{人|にん}・ぶどう2{人|にん}。いちばん 人気の くだものは？",
    explanation: "りんごが 5{人|にん}で いちばん {多|おお}いね。グラフに すると ひとめで わかるよ。",
    visual: { kind: "emoji", value: "🍎", caption: "いちばん 多い" },
    format: "choice",
    choices: ["りんご", "みかん", "ぶどう", "なし"],
    answer: "りんご",
  },
  {
    id: `${U.statistics}.q-5`,
    unitId: U.statistics,
    prompt: "「へいきん」の いみに いちばん {近|ちか}いのは？",
    explanation: "へいきんは ぜんぶ たして 人数で わった、みんなを ならした まんなかの かずだよ。",
    visual: { kind: "emoji", value: "⚖️", caption: "ならした かず" },
    format: "choice",
    choices: ["みんなを ならした まんなかの かず", "いちばん {大|おお}きい かず", "いちばん {小|ちい}さい かず", "さいごの かず"],
    answer: "みんなを ならした まんなかの かず",
  },
];

// ── こうかんと ねだん（経済） ──
const economyQuestions: ChoiceQuestion[] = [
  {
    id: `${U.economy}.q-1`,
    unitId: U.economy,
    prompt: "お{金|かね}が なかった むかし、ほしい ものを どうやって {手|て}に {入|い}れた？",
    explanation: "むかしは {物々|ぶつぶつ}こうかん（ものと ものの とりかえ）を していたよ。",
    visual: { kind: "emoji", value: "🐟🥬", caption: "ものと ものを とりかえ" },
    format: "choice",
    choices: ["ものと ものを こうかんした", "ひろった", "つくらなかった", "なにも しなかった"],
    answer: "ものと ものを こうかんした",
  },
  {
    id: `${U.economy}.q-2`,
    unitId: U.economy,
    prompt: "ほしい {人|ひと}が {多|おお}くて、ものが すくない とき、ねだんは どう なりやすい？",
    explanation: "ほしい {人|ひと}が {多|おお}いのに ものが すくないと、ねだんは たかく なりやすいよ。",
    visual: { kind: "emoji", value: "🙋🙋🙋", caption: "ほしい 人が 多い" },
    format: "choice",
    choices: ["たかく なる", "やすく なる", "ただに なる", "かわらない"],
    answer: "たかく なる",
  },
  {
    id: `${U.economy}.q-3`,
    unitId: U.economy,
    prompt: "ものが あまって いる（たくさん ある）とき、ねだんは どう なりやすい？",
    explanation: "ものが あまると、うる ために ねだんを やすく する ことが {多|おお}いよ。",
    visual: { kind: "emoji", value: "📦📦📦", caption: "もの が あまる" },
    format: "choice",
    choices: ["やすく なる", "たかく なる", "100ばいに なる", "かわらない"],
    answer: "やすく なる",
  },
  {
    id: `${U.economy}.q-4`,
    unitId: U.economy,
    prompt: "「ほしい {人|ひと}の {多|おお}さ」を あらわす ことばは どれ？",
    explanation: "ほしい {人|ひと}の {多|おお}さを「{需要|じゅよう}」と いうよ。",
    visual: { kind: "emoji", value: "🛒", caption: "ほしい 人の 多さ" },
    format: "choice",
    choices: ["{需要|じゅよう}", "{供給|きょうきゅう}", "おつり", "ちょきん"],
    answer: "{需要|じゅよう}",
  },
  {
    id: `${U.economy}.q-5`,
    unitId: U.economy,
    prompt: "「うれる ものの りょう」を あらわす ことばは どれ？",
    explanation: "うり{手|て}が だせる ものの りょうを「{供給|きょうきゅう}」と いうよ。",
    visual: { kind: "emoji", value: "🏪", caption: "うる ものの りょう" },
    format: "choice",
    choices: ["{供給|きょうきゅう}", "{需要|じゅよう}", "ねだん", "せいかつ"],
    answer: "{供給|きょうきゅう}",
  },
];

export const oyoG3Contents: Record<string, UnitContent> = {
  [U.binary]: {
    unitId: U.binary,
    learn: {
      unitId: U.binary,
      steps: [
        {
          // ① 身近な具体
          heading: "でんきの オン と オフ",
          body: "でんきの スイッチには「ついている（オン）」と「きえている（オフ）」の 2つしか ないね。コンピュータも この 2つで うごいているよ。",
          visual: { kind: "emoji", value: "💡", caption: "オン＝1 / オフ＝0" },
        },
        {
          // ② 図・操作で体感
          heading: "ゆびで かぞえよう",
          body: "ゆびを「おりた＝0」「のばした＝1」と きめて、1と0の ならびで かずを あらわして みよう。",
          visual: { kind: "emoji", value: "✋", caption: "のばす＝1 おる＝0" },
        },
        {
          // ③ きまり発見
          heading: "くらいは 2ばいずつ",
          body: "ふだんの かずは 1・10・100と 10ばいずつ。{二進法|にしんほう}は {右|みぎ}から 1・2・4・8と 2ばいずつ くらいが あがるよ。",
          visual: { kind: "emoji", value: "🔢", caption: "8 4 2 1 の くらい" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "「101」は 4と1で 5。「110」は 4と2で 6。0と1の ならびから かずを もとめて みよう。",
          visual: { kind: "emoji", value: "❓", caption: "101 は いくつ？" },
        },
      ],
    },
    test: { unitId: U.binary, questions: binaryQuestions, questionCount: 5 },
  },

  [U.logic]: {
    unitId: U.logic,
    learn: {
      unitId: U.logic,
      steps: [
        {
          // ① 身近な具体
          heading: "「ぜんぶ」「ある」「ない」",
          body: "「クラス ぜんいんが ぼうしを かぶる」「だれか {一人|ひとり}は めがね」「だれも かさを もって ない」。ことばで きまりを あらわせるよ。",
          visual: { kind: "emoji", value: "🧢👓☂️", caption: "ぜんぶ / ある / ない" },
        },
        {
          // ② 図・操作で体感
          heading: "{絵|え}で たしかめよう",
          body: "「ぜんぶの ねこは {動物|どうぶつ}」は ほんとう。「ぜんぶの {動物|どうぶつ}は ねこ」は うそ。{仲間|なかま}の わ（ベン{図|ず}）で たしかめよう。",
          visual: { kind: "emoji", value: "🐱⊂🐾", caption: "わの 中と そと" },
        },
        {
          // ③ きまり発見
          heading: "うそつきを {見|み}やぶる",
          body: "わかっている ヒントを 1つずつ あてはめると、どれが ほんとうで どれが うそかを すいり できるよ。",
          visual: { kind: "emoji", value: "🕵️", caption: "ヒントを くみあわせる" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "「この はこに りんごは ない」なら、りんごは ある？ ない？ ことばの いみを よく かんがえて こたえよう。",
          visual: { kind: "emoji", value: "📦❓", caption: "ある？ ない？" },
        },
      ],
    },
    test: { unitId: U.logic, questions: logicQuestions, questionCount: 5 },
  },

  [U.probability]: {
    unitId: U.probability,
    learn: {
      unitId: U.probability,
      steps: [
        {
          // ① 身近な具体
          heading: "おこりやすい？ おこりにくい？",
          body: "あした {雨|あめ}が ふるか、サイコロで 1が でるか。「おこりやすさ」には ちがいが あるね。",
          visual: { kind: "emoji", value: "🎲", caption: "でやすい？" },
        },
        {
          // ② 図・操作で体感
          heading: "サイコロを ふろう",
          body: "サイコロの {目|め}は 1〜6の 6つ。どれも おなじくらい でやすいよ。なんども ふって たしかめよう。",
          visual: { kind: "emoji", value: "🎲🎲", caption: "6つの 目" },
        },
        {
          // ③ きまり発見
          heading: "かずで あらわす",
          body: "ぜんぶで 6とおり、そのうち 1が でるのは 1とおり。だから「6{回|かい}に 1{回|かい}ぐらい」と かんがえられるよ。",
          visual: { kind: "emoji", value: "🔢", caption: "6つの うち 1つ" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "コインの おもてが でる おこりやすさは？ サイコロで ぐうすうが でる おこりやすさは？ かんがえて みよう。",
          visual: { kind: "emoji", value: "🪙❓", caption: "どれくらい？" },
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
          // ① 身近な具体
          heading: "すきな くだもの しらべ",
          body: "クラスで すきな くだものを きいて、りんご5{人|にん}・みかん3{人|にん}… のように {集|あつ}めた こと あるかな？",
          visual: { kind: "emoji", value: "🍎🍊🍇", caption: "数を 集める" },
        },
        {
          // ② 図・操作で体感
          heading: "{表|ひょう}と グラフ",
          body: "{集|あつ}めた かずを {表|ひょう}に かいて、たかさの ぼうグラフに すると、どれが 人気か ひとめで わかるよ。",
          visual: { kind: "emoji", value: "📊", caption: "ぼうグラフ" },
        },
        {
          // ③ きまり発見
          heading: "へいきんで ならす",
          body: "{点|てん}すうを ぜんぶ たして 人数で わると「へいきん」。みんなを ならした まんなかの かずだよ。",
          visual: { kind: "emoji", value: "⚖️", caption: "たして わる" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "2{点|てん}・4{点|てん}・6{点|てん}の へいきんは？ ぜんぶで 12、3{人|にん}で わって 4{点|てん}。データから よみとって みよう。",
          visual: { kind: "emoji", value: "❓", caption: "へいきんは？" },
        },
      ],
    },
    test: { unitId: U.statistics, questions: statisticsQuestions, questionCount: 5 },
  },

  [U.economy]: {
    unitId: U.economy,
    learn: {
      unitId: U.economy,
      steps: [
        {
          // ① 身近な具体
          heading: "こうかんから はじまった",
          body: "むかしは「さかな」と「やさい」を こうかんして いた。ほしい もの どうしを とりかえて いたんだよ。",
          visual: { kind: "emoji", value: "🐟🥬", caption: "物々こうかん" },
        },
        {
          // ② 図・操作で体感
          heading: "おはじきで みせやさん",
          body: "おはじきを お{金|かね}に みたてて、おみせやさんごっこ。ほしい {人|ひと}が {多|おお}いと、ねだんは どう なるかな？",
          visual: { kind: "emoji", value: "🪙🏪", caption: "みせやさんごっこ" },
        },
        {
          // ③ きまり発見
          heading: "ほしい {人|ひと}と ある かず",
          body: "ほしい {人|ひと}が {多|おお}くて ものが すくないと ねだんは たかく、ものが あまると ねだんは やすく なるよ。これが {需要|じゅよう}と {供給|きょうきゅう}だよ。",
          visual: { kind: "emoji", value: "⚖️", caption: "じゅよう と きょうきゅう" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "にんきの おもちゃが すこししか ない とき、ねだんは たかく なる？ やすく なる？ かんがえて みよう。",
          visual: { kind: "emoji", value: "❓", caption: "ねだんは どっち？" },
        },
      ],
    },
    test: { unitId: U.economy, questions: economyQuestions, questionCount: 5 },
  },
};
