// ══════════════════════════════════════════
// カリキュラム: 応用（おうよう）小2 — 大学レベルの概念を「やさしく・手を動かして解ける」
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 基準テンプレ実装 = src/data/curriculum/sansuu/g1.ts と同形。
//
// 【申し送り（中央集約者へ）】
//  ・SubjectId（src/types/drill.ts）に "oyo" が未追加。types は本波で編集しない方針のため、
//    本ファイル内で局所吸収（二重キャスト）する。中央で SubjectId に "oyo" を追加し、
//    Subject 定義（oyoSubject）を index に合流させたら、下の OYO キャストは素の "oyo" に戻してよい。
//  ・oyoSubject.grades は [1,2,3,4,5,6]（全学年開講・学年で難度調整）/ testable: true。
//  ・index.ts は未編集。集約は中央で行うこと。
//
// 【応用4段ルール（厳守）】各 Unit の learn.steps は必ず4段:
//   ① 身近な具体 → ② 図・操作で体感 → ③ きまり発見 → ④ やってみる。
//   「難しさを見せる」のではなく「本質をやさしく・手を動かして解ける」を徹底。
//
// 【ルビ記法（2026-06-02〜 全 authoring 必須）】全表示テキストは {漢字|よみ}。
//   ひらがな/カタカナ/数字/記号はそのまま。送り仮名は基底に含めない（{食|た}べる）。
//   低学年なのでやさしい言いまわしを優先しつつ、出る漢字には必ずルビ。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  SubjectId,
  ChoiceQuestion,
  NumberInputQuestion,
  OrderingQuestion,
  MatchingQuestion,
} from "@/types/curriculum";

// 局所吸収: "oyo" を SubjectId として扱う（中央が types に追加するまでの暫定）。
const OYO = "oyo" as unknown as SubjectId;

// ── 教科 ──────────────────────────────────

export const oyoSubject: Subject = {
  id: OYO,
  name: "おうよう",
  formalName: "応用（大学レベルをやさしく）",
  emoji: "🚀",
  theme: "violet",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────

export const oyoG2Domains: Domain[] = [
  {
    id: "oyo.logic-set",
    subjectId: OYO,
    name: "{論理|ろんり}と {仲間|なかま}",
    formalName: "論理・集合",
  },
  {
    id: "oyo.shape",
    subjectId: OYO,
    name: "かたちの ふしぎ",
    formalName: "図形・トポロジー（対称・一筆書き）",
  },
  {
    id: "oyo.pattern",
    subjectId: OYO,
    name: "パターンと きまり",
    formalName: "数列・アルゴリズム",
  },
];

// ── 前提に参照する算数の基礎単元（中央集約時に解決） ──
const SANSUU = {
  numbersTo10: "sansuu.g1.numbers-to-10",
  addWithin10: "sansuu.g1.add-within-10",
} as const;

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。oyo 内＋算数基礎へ接続）:
//
//   sansuu.g1.numbers-to-10 ─▶ grouping ──┐
//   symmetry ─▶ one-stroke                ├─▶ sorting
//   sansuu.g1.add-within-10 ─▶ number-patterns ─┘
//
const U = {
  grouping: "oyo.g2.grouping",
  symmetry: "oyo.g2.symmetry",
  oneStroke: "oyo.g2.one-stroke",
  numberPatterns: "oyo.g2.number-patterns",
  sorting: "oyo.g2.sorting",
} as const;

export const oyoG2Units: Unit[] = [
  {
    id: U.grouping,
    subjectId: OYO,
    grade: 2,
    domainId: "oyo.logic-set",
    title: "{仲間|なかま}{分|わ}け（しゅうごう）",
    order: 1,
    // 中高大への接続: 集合・ベン図 → 中学の集合、高校の集合と論理、大学のデータベース/分類。
    realWorldUse: "{仲間|なかま}{分|わ}けは、おもちゃを かたづける ときや、{図書館|としょかん}で {本|ほん}を しゅるいごとに ならべる ときに やくだつよ。",
    leadsTo: [U.sorting],
    prerequisites: [SANSUU.numbersTo10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.symmetry,
    subjectId: OYO,
    grade: 2,
    domainId: "oyo.shape",
    title: "{左右|さゆう}{対称|たいしょう}（かがみの かたち）",
    order: 2,
    // 中高大への接続: 対称 → 中学の図形の対称、高校の関数のグラフ、大学の対称性（群論・物理）。
    realWorldUse: "{左右|さゆう}{対称|たいしょう}は、ちょうちょや かおの かたち、マークや {建物|たてもの}の デザインに つかわれているよ。",
    leadsTo: [U.oneStroke],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.oneStroke,
    subjectId: OYO,
    grade: 2,
    domainId: "oyo.shape",
    title: "{一筆|ひとふで}{書|が}き（いっぴつがき）",
    order: 3,
    // 中高大への接続: 一筆書き → グラフ理論（オイラー路）→ 大学の配送ルート最適化・ネットワーク。
    realWorldUse: "{一筆|ひとふで}{書|が}きの かんがえは、ゆうびんを むだなく {配|くば}る {道|みち}じゅんを {見|み}つける ときに やくだつよ。",
    leadsTo: [],
    prerequisites: [U.symmetry],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.numberPatterns,
    subjectId: OYO,
    grade: 2,
    domainId: "oyo.pattern",
    title: "ふえ{方|かた}の パターン（すうれつ）",
    order: 4,
    // 中高大への接続: 規則性 → 中学の文字式・関数、高校の数列、大学の解析・自然界のフィボナッチ。
    realWorldUse: "ふえ{方|かた}の パターンが わかると、つぎに なにが くるかを {予想|よそう}できて、カレンダーや もようづくりに やくだつよ。",
    leadsTo: [U.sorting],
    prerequisites: [SANSUU.addWithin10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sorting,
    subjectId: OYO,
    grade: 2,
    domainId: "oyo.pattern",
    title: "ならべかえの て{順|じゅん}（アルゴリズム）",
    order: 5,
    // 中高大への接続: 並べ替え/探索 → 中高の情報、大学のアルゴリズム（ソート・計算量）。
    realWorldUse: "ならべかえの て{順|じゅん}は、コンピュータが データを はやく {整理|せいり}したり さがしたり する しくみの もとに なるよ。",
    leadsTo: [],
    prerequisites: [U.grouping, U.numberPatterns],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn[4段] + テスト test）。全問 explanation 必須・全漢字ルビ。
// ══════════════════════════════════════════

// ── 仲間分け（集合） ──
const groupingQuestions: (ChoiceQuestion | MatchingQuestion)[] = [
  {
    id: `${U.grouping}.q-1`,
    unitId: U.grouping,
    prompt: "つぎの {中|なか}で、{仲間|なかま}はずれは どれ かな？",
    explanation: "いぬ・ねこ・うさぎは どうぶつの {仲間|なかま}。りんごだけ くだものなので {仲間|なかま}はずれだよ。",
    visual: { kind: "emoji", value: "🐶🐱🐰🍎", caption: "どれが ちがう？" },
    format: "choice",
    choices: ["りんご", "いぬ", "ねこ", "うさぎ"],
    answer: "りんご",
  },
  {
    id: `${U.grouping}.q-2`,
    unitId: U.grouping,
    prompt: "それぞれを ただしい {仲間|なかま}に つなげよう。",
    explanation: "バナナは くだもの、いぬは どうぶつ、でんしゃは のりもの。{仲間|なかま}ごとに わけられたね。",
    visual: { kind: "emoji", value: "🍌🐶🚃", caption: "なかまに わける" },
    format: "matching",
    left: ["バナナ", "いぬ", "でんしゃ"],
    right: ["くだもの", "どうぶつ", "のりもの"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.grouping}.q-3`,
    unitId: U.grouping,
    prompt: "「あかい もの」の わ と「まるい もの」の わ、{両方|りょうほう}に {入|はい}るのは どれ かな？",
    explanation: "りんごは あかくて まるいので、2つの わが かさなる まんなかに {入|はい}るよ。これが ベン{図|ず}の「{共通|きょうつう}」だよ。",
    visual: { kind: "emoji", value: "🔴⭕", caption: "２つの わの まんなか" },
    format: "choice",
    choices: ["りんご", "バナナ", "あおい ボール", "きいろい レモン"],
    answer: "りんご",
  },
  {
    id: `${U.grouping}.q-4`,
    unitId: U.grouping,
    prompt: "{仲間|なかま}{分|わ}けが やくだつ ばめんは どれ かな？",
    explanation: "{本|ほん}を しゅるいごとに たなへ ならべると、あとで さがしやすく なるね。これが {仲間|なかま}{分|わ}けの ちからだよ。",
    visual: { kind: "emoji", value: "📚", caption: "ほんを ならべる" },
    format: "choice",
    choices: [
      "{本|ほん}を しゅるいごとに たなへ ならべる",
      "{目|め}を つぶって あるく",
      "そらを とぶ",
      "なにも しない",
    ],
    answer: "{本|ほん}を しゅるいごとに たなへ ならべる",
  },
  {
    id: `${U.grouping}.q-5`,
    unitId: U.grouping,
    prompt: "「どうぶつの わ」にも「のりものの わ」にも {入|はい}らない ものは どこに おく かな？",
    explanation: "どちらの {仲間|なかま}でも ない ものは、わの そとに おくよ。{全体|ぜんたい}の {中|なか}での いちで わかるね。",
    visual: { kind: "emoji", value: "🐶🚗❓", caption: "どこに おく？" },
    format: "choice",
    choices: ["わの そと", "どうぶつの わ", "のりものの わ", "２つの まんなか"],
    answer: "わの そと",
  },
];

// ── 左右対称 ──
const symmetryQuestions: ChoiceQuestion[] = [
  {
    id: `${U.symmetry}.q-1`,
    unitId: U.symmetry,
    prompt: "{左右|さゆう}{対称|たいしょう}（まんなかで おると ぴったり かさなる）な ものは どれ かな？",
    explanation: "ちょうちょは まんなかで おると {左右|さゆう}が ぴったり かさなるよ。だから {左右|さゆう}{対称|たいしょう}だね。",
    visual: { kind: "emoji", value: "🦋", caption: "ちょうちょ" },
    format: "choice",
    choices: ["ちょうちょ", "スプーン", "バナナ", "かたっぽの くつ"],
    answer: "ちょうちょ",
  },
  {
    id: `${U.symmetry}.q-2`,
    unitId: U.symmetry,
    prompt: "{左右|さゆう}{対称|たいしょう}な アルファベットは どれ かな？",
    explanation: "「A」は まんなかの たての {線|せん}で おると {左右|さゆう}が かさなるよ。F・R・L は かさならないね。",
    visual: { kind: "emoji", value: "🔤", caption: "A / F / R / L" },
    format: "choice",
    choices: ["A", "F", "R", "L"],
    answer: "A",
  },
  {
    id: `${U.symmetry}.q-3`,
    unitId: U.symmetry,
    prompt: "{左右|さゆう}{対称|たいしょう}な すうじは どれ かな？",
    explanation: "「8」は まんなかの たての {線|せん}で おると {左右|さゆう}が かさなるよ。7・4・2 は かさならないね。",
    visual: { kind: "emoji", value: "🔢", caption: "8 / 7 / 4 / 2" },
    format: "choice",
    choices: ["8", "7", "4", "2"],
    answer: "8",
  },
  {
    id: `${U.symmetry}.q-4`,
    unitId: U.symmetry,
    prompt: "かみを はんぶんに おって きると、できる かたちは どう なる かな？",
    explanation: "おりめを {軸|じく}にして きると、{左右|さゆう}が おなじ かたち（{左右|さゆう}{対称|たいしょう}）に なるよ。",
    visual: { kind: "emoji", value: "✂️📄", caption: "おって きる" },
    format: "choice",
    choices: [
      "{左右|さゆう}が おなじ かたち",
      "ばらばらの かたち",
      "{丸|まる}い あな だけ",
      "なにも できない",
    ],
    answer: "{左右|さゆう}が おなじ かたち",
  },
  {
    id: `${U.symmetry}.q-5`,
    unitId: U.symmetry,
    prompt: "まんなかで おって {左右|さゆう}が かさなる ときの、おりめの {線|せん}を なんと いう かな？",
    explanation: "{左右|さゆう}を おなじに する まんなかの {線|せん}を「{対称|たいしょう}の {軸|じく}（じく）」と いうよ。",
    visual: { kind: "emoji", value: "🪞", caption: "まんなかの せん" },
    format: "choice",
    choices: ["{対称|たいしょう}の {軸|じく}", "ものさし", "とおりみち", "そら"],
    answer: "{対称|たいしょう}の {軸|じく}",
  },
];

// ── 一筆書き ──
const oneStrokeQuestions: ChoiceQuestion[] = [
  {
    id: `${U.oneStroke}.q-1`,
    unitId: U.oneStroke,
    prompt: "{一筆|ひとふで}{書|が}きって どんな かきかた かな？",
    explanation: "ペンを かみから はなさず、おなじ {線|せん}を 2{回|かい} なぞらずに ひとつづきで かく ことだよ。",
    visual: { kind: "emoji", value: "✏️➰", caption: "ひとつづきで かく" },
    format: "choice",
    choices: [
      "ペンを はなさず ひとつづきで かく",
      "なんども ペンを あげて かく",
      "{色|いろ}を ぬる",
      "{目|め}を つぶって かく",
    ],
    answer: "ペンを はなさず ひとつづきで かく",
  },
  {
    id: `${U.oneStroke}.q-2`,
    unitId: U.oneStroke,
    prompt: "{三角|さんかく}（△）は {一筆|ひとふで}{書|が}きで かける かな？",
    explanation: "△は どの かどからも {線|せん}が 2{本|ほん}ずつ でているね。だから {一筆|ひとふで}で かけるよ。",
    visual: { kind: "emoji", value: "🔺", caption: "△" },
    format: "choice",
    choices: ["かける", "かけない", "{色|いろ}が いる", "わからない"],
    answer: "かける",
  },
  {
    id: `${U.oneStroke}.q-3`,
    unitId: U.oneStroke,
    prompt: "ほし（☆）は {一筆|ひとふで}{書|が}きで かける かな？",
    explanation: "☆も どの かどからも {線|せん}が 2{本|ほん}ずつ。だから ひとつづきで かけるよ。やってみよう。",
    visual: { kind: "emoji", value: "⭐", caption: "☆" },
    format: "choice",
    choices: ["かける", "かけない", "２つ いる", "うらがえす"],
    answer: "かける",
  },
  {
    id: `${U.oneStroke}.q-4`,
    unitId: U.oneStroke,
    prompt: "{一筆|ひとふで}{書|が}きの かんがえが やくだつ ばめんは どれ かな？",
    explanation: "ゆうびんやさんが {同|おな}じ {道|みち}を 2{回|かい} とおらずに {配|くば}る じゅんを {考|かんが}える ときに やくだつよ。",
    visual: { kind: "emoji", value: "📮🚶", caption: "むだのない みちじゅん" },
    format: "choice",
    choices: [
      "ゆうびんを むだなく {配|くば}る {道|みち}じゅん",
      "ごはんを {作|つく}る",
      "うたを うたう",
      "ねる じかん",
    ],
    answer: "ゆうびんを むだなく {配|くば}る {道|みち}じゅん",
  },
  {
    id: `${U.oneStroke}.q-5`,
    unitId: U.oneStroke,
    prompt: "{一筆|ひとふで}{書|が}きで かきやすい かたちの とくちょうは どれ かな？",
    explanation: "それぞれの かどから でる {線|せん}の かずが 2や4などの ぐうすう（２でわりきれる かず）だと かきやすいよ。",
    visual: { kind: "emoji", value: "📐", caption: "かどの せんの かず" },
    format: "choice",
    choices: [
      "かどの {線|せん}が ぐうすう",
      "かどが まるい",
      "{色|いろ}が おおい",
      "{大|おお}きい",
    ],
    answer: "かどの {線|せん}が ぐうすう",
  },
];

// ── ふえ方のパターン（数列） ──
const numberPatternsQuestions: (NumberInputQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.numberPatterns}.q-1`,
    unitId: U.numberPatterns,
    prompt: "2、4、6、8、… つぎの {数|かず}は？",
    explanation: "2ずつ ふえる パターンだね。8の つぎは 8＋2で 10だよ。",
    visual: { kind: "emoji", value: "🔢", caption: "2ずつ ふえる" },
    format: "number-input",
    answer: 10,
  },
  {
    id: `${U.numberPatterns}.q-2`,
    unitId: U.numberPatterns,
    prompt: "1、3、5、7、… つぎの {数|かず}は？",
    explanation: "2ずつ ふえる パターンだよ。7の つぎは 7＋2で 9だね。",
    visual: { kind: "emoji", value: "🔢", caption: "2ずつ ふえる" },
    format: "number-input",
    answer: 9,
  },
  {
    id: `${U.numberPatterns}.q-3`,
    unitId: U.numberPatterns,
    prompt: "5、10、15、20、… つぎの {数|かず}は？",
    explanation: "5ずつ ふえる パターンだよ。20の つぎは 20＋5で 25だね。",
    visual: { kind: "emoji", value: "🖐️", caption: "5ずつ ふえる" },
    format: "number-input",
    answer: 25,
  },
  {
    id: `${U.numberPatterns}.q-4`,
    unitId: U.numberPatterns,
    prompt: "1、1、2、3、5、… つぎの {数|かず}は？（ヒント: まえの 2つを たす）",
    explanation: "まえの 2つを たす パターンだよ。3＋5で 8。これは「フィボナッチ」と いう ゆうめいな パターンだよ。",
    visual: { kind: "emoji", value: "🌻", caption: "まえ2つを たす" },
    format: "number-input",
    answer: 8,
  },
  {
    id: `${U.numberPatterns}.q-5`,
    unitId: U.numberPatterns,
    prompt: "「3ずつ ふえる」パターンは どれ かな？",
    explanation: "3、6、9、12 は 3ずつ ふえているね。きまり（ふえる {数|かず}）を {見|み}つけるのが だいじだよ。",
    visual: { kind: "emoji", value: "➕", caption: "ふえる かずを さがす" },
    format: "choice",
    choices: ["3、6、9、12", "2、4、6、8", "1、2、3、4", "5、10、15、20"],
    answer: "3、6、9、12",
  },
];

// ── ならべかえの手順（アルゴリズム） ──
const sortingQuestions: (OrderingQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.sorting}.q-1`,
    unitId: U.sorting,
    prompt: "{数|かず}の カードを {小|ちい}さい じゅんに ならべよう。",
    explanation: "{小|ちい}さい じゅんは 1、2、3。となりどうしを くらべて いれかえると ならべられるよ。",
    visual: { kind: "emoji", value: "🃏", caption: "3・1・2 を ならべる" },
    format: "ordering",
    items: ["3", "1", "2"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.sorting}.q-2`,
    unitId: U.sorting,
    prompt: "{数|かず}の カードを {小|ちい}さい じゅんに ならべよう。",
    explanation: "{小|ちい}さい じゅんは 1、2、5、8。いちばん {小|ちい}さい カードから ならべると わかりやすいよ。",
    visual: { kind: "emoji", value: "🃏", caption: "5・2・8・1 を ならべる" },
    format: "ordering",
    items: ["5", "2", "8", "1"],
    answerOrder: [3, 1, 0, 2],
  },
  {
    id: `${U.sorting}.q-3`,
    unitId: U.sorting,
    prompt: "ならべかえる とき、はじめに する ことは どれ かな？",
    explanation: "となりどうしを くらべて、{小|ちい}さい ほうを まえに する。これを くりかえすと ぜんぶ ならぶよ。",
    visual: { kind: "emoji", value: "⚖️", caption: "となりと くらべる" },
    format: "choice",
    choices: [
      "となりどうしを くらべる",
      "{目|め}を つぶる",
      "ぜんぶ すてる",
      "かぞえない",
    ],
    answer: "となりどうしを くらべる",
  },
  {
    id: `${U.sorting}.q-4`,
    unitId: U.sorting,
    prompt: "{数|かず}や {名前|なまえ}を じゅんに ならべると、どんな よい ことが ある かな？",
    explanation: "ならんでいると、さがしたい ものを はやく {見|み}つけられるよ。じしょや でんわちょうも じゅんに ならんでいるね。",
    visual: { kind: "emoji", value: "🔎", caption: "さがしやすい" },
    format: "choice",
    choices: [
      "あとで さがしやすく なる",
      "わかりにくく なる",
      "なくなる",
      "おもく なる",
    ],
    answer: "あとで さがしやすく なる",
  },
  {
    id: `${U.sorting}.q-5`,
    unitId: U.sorting,
    prompt: "たくさんの データを はやく {整理|せいり}する ために、コンピュータも やっている ことは どれ かな？",
    explanation: "コンピュータも きまった て{順|じゅん}（アルゴリズム）で データを ならべかえているよ。これを「ソート」と いうよ。",
    visual: { kind: "emoji", value: "💻", caption: "ならべかえ＝ソート" },
    format: "choice",
    choices: ["ならべかえ（ソート）", "おひるね", "おかいもの", "おさんぽ"],
    answer: "ならべかえ（ソート）",
  },
];

export const oyoG2Contents: Record<string, UnitContent> = {
  [U.grouping]: {
    unitId: U.grouping,
    learn: {
      unitId: U.grouping,
      steps: [
        {
          // ① 身近な具体
          heading: "おもちゃを かたづけよう",
          body: "おもちゃばこの {中|なか}に、くるま・どうぶつの ぬいぐるみ・ブロックが まざっているよ。どう かたづける？",
          visual: { kind: "emoji", value: "🚗🧸🧱", caption: "まざっている" },
        },
        {
          // ② 図・操作で体感
          heading: "わっかに わけて みよう",
          body: "{大|おお}きな わっかを 2つ かいて、「のりもの」と「どうぶつ」に わけて {入|い}れて みよう。スッキリ するね。",
          visual: { kind: "emoji", value: "⭕⭕", caption: "２つの わに わける" },
        },
        {
          // ③ きまり発見
          heading: "まんなかは「{両方|りょうほう}」",
          body: "2つの わが かさなる まんなかには、{両方|りょうほう}の {仲間|なかま}に {入|はい}る ものを おくよ。これを ベン{図|ず}と いうよ。",
          visual: { kind: "emoji", value: "🔵🟡", caption: "かさなる まんなか" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "「あかい もの」と「まるい もの」の わを かいて、りんご・バナナ・ボールは どこに {入|はい}るか かんがえて みよう。",
          visual: { kind: "emoji", value: "🍎🍌⚽", caption: "どこに 入る？" },
        },
      ],
    },
    test: {
      unitId: U.grouping,
      questions: groupingQuestions,
      questionCount: 5,
    },
  },

  [U.symmetry]: {
    unitId: U.symmetry,
    learn: {
      unitId: U.symmetry,
      steps: [
        {
          // ① 身近な具体
          heading: "ちょうちょの はね",
          body: "ちょうちょの はねは、{左|ひだり}と {右|みぎ}が おなじ かたち・もように なっているよ。かおや ハートも そうだね。",
          visual: { kind: "emoji", value: "🦋❤️", caption: "左右が おなじ" },
        },
        {
          // ② 図・操作で体感
          heading: "おって たしかめよう",
          body: "かみに かたちを かいて、まんなかで パタンと おって みよう。{左右|さゆう}が ぴったり かさなるかな？",
          visual: { kind: "emoji", value: "📄↩️", caption: "まんなかで おる" },
        },
        {
          // ③ きまり発見
          heading: "ぴったり＝{左右|さゆう}{対称|たいしょう}",
          body: "おって ぴったり かさなる かたちを「{左右|さゆう}{対称|たいしょう}」と いうよ。おりめの {線|せん}が「{対称|たいしょう}の {軸|じく}」だよ。",
          visual: { kind: "emoji", value: "🪞", caption: "かがみの ように" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "アルファベットの A や すうじの 8 は {左右|さゆう}{対称|たいしょう}かな？ まんなかで おる つもりで しらべて みよう。",
          visual: { kind: "emoji", value: "🔤🔢", caption: "A・8 を しらべる" },
        },
      ],
    },
    test: {
      unitId: U.symmetry,
      questions: symmetryQuestions,
      questionCount: 5,
    },
  },

  [U.oneStroke]: {
    unitId: U.oneStroke,
    learn: {
      unitId: U.oneStroke,
      steps: [
        {
          // ① 身近な具体
          heading: "ペンを はなさず かく あそび",
          body: "ペンを かみから はなさず、{同|おな}じ {線|せん}を 2{回|かい} なぞらずに かたちを かく あそびを しって いるかな？",
          visual: { kind: "emoji", value: "✏️", caption: "ひとつづきで" },
        },
        {
          // ② 図・操作で体感
          heading: "いろいろ ためそう",
          body: "{三角|さんかく}（△）・しかく（□）・ほし（☆）を {一筆|ひとふで}で かけるか、じっさいに ゆびで なぞって みよう。",
          visual: { kind: "emoji", value: "🔺⭐", caption: "なぞって ためす" },
        },
        {
          // ③ きまり発見
          heading: "かどの {線|せん}の かず",
          body: "それぞれの かどから でる {線|せん}の かずを かぞえよう。どの かども ぐうすう（2や4）だと、{一筆|ひとふで}で かけるよ。",
          visual: { kind: "emoji", value: "📐", caption: "せんの かずを かぞえる" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "いえや きごうを {一筆|ひとふで}で かけるか ためそう。かけたら、はいたつの {道|みち}じゅんを {考|かんが}える ヒントにも なるよ。",
          visual: { kind: "emoji", value: "🏠➰", caption: "かけるかな？" },
        },
      ],
    },
    test: {
      unitId: U.oneStroke,
      questions: oneStrokeQuestions,
      questionCount: 5,
    },
  },

  [U.numberPatterns]: {
    unitId: U.numberPatterns,
    learn: {
      unitId: U.numberPatterns,
      steps: [
        {
          // ① 身近な具体
          heading: "とびとびに かぞえる",
          body: "2、4、6、8 のように とびとびに かぞえた こと あるかな？ {数|かず}には じゅんばんの きまりが あるよ。",
          visual: { kind: "emoji", value: "👣", caption: "2ずつ" },
        },
        {
          // ② 図・操作で体感
          heading: "おはじきで ならべよう",
          body: "おはじきを 1こ、3こ、5こ… と ならべて みよう。だんだん ふえていく ようすが {目|め}で わかるね。",
          visual: { kind: "emoji", value: "⚪⚪⚪", caption: "ならべて 見る" },
        },
        {
          // ③ きまり発見
          heading: "ふえる {数|かず}を さがす",
          body: "「いくつずつ ふえているか」を 見つけると、つぎの {数|かず}が わかるよ。まえの 2つを たす パターンも あるよ。",
          visual: { kind: "emoji", value: "🔍➕", caption: "きまりを みつける" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "2、4、6、8 の つぎは？ 1、1、2、3、5 の つぎは？ きまりを 見つけて こたえて みよう。",
          visual: { kind: "emoji", value: "❓", caption: "つぎは なに？" },
        },
      ],
    },
    test: {
      unitId: U.numberPatterns,
      questions: numberPatternsQuestions,
      questionCount: 5,
    },
  },

  [U.sorting]: {
    unitId: U.sorting,
    learn: {
      unitId: U.sorting,
      steps: [
        {
          // ① 身近な具体
          heading: "せの じゅんに ならぶ",
          body: "たいいくの とき、せの {小|ちい}さい {人|ひと}から じゅんに ならんだ こと あるね。それも「ならべかえ」だよ。",
          visual: { kind: "emoji", value: "🧍🧍‍♂️", caption: "せの じゅん" },
        },
        {
          // ② 図・操作で体感
          heading: "カードで くらべよう",
          body: "{数|かず}の カードを 2まいずつ くらべて、{小|ちい}さい ほうを まえに おく。これを くりかえして みよう。",
          visual: { kind: "emoji", value: "🃏⚖️", caption: "となりと くらべる" },
        },
        {
          // ③ きまり発見
          heading: "くりかえすと ならぶ",
          body: "「となりと くらべて いれかえる」を なんども くりかえすと、ぜんぶ {小|ちい}さい じゅんに ならぶよ。これが て{順|じゅん}（アルゴリズム）だよ。",
          visual: { kind: "emoji", value: "🔁", caption: "くりかえす" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "3・1・2 や 5・2・8・1 の カードを、{小|ちい}さい じゅんに ならべて みよう。コンピュータも おなじ ことを しているよ。",
          visual: { kind: "emoji", value: "💻", caption: "ならべかえる" },
        },
      ],
    },
    test: {
      unitId: U.sorting,
      questions: sortingQuestions,
      questionCount: 5,
    },
  },
};
