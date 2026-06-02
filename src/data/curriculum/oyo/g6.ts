// ══════════════════════════════════════════
// カリキュラム: 応用（おうよう / oyo）小6 — 「本質をやさしく・手を動かして解ける」
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形（Subject は別ファイルで定義する
// 想定のため、本ファイルは domains / units / contents のみ公開＝重複 export 回避）。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
//
// 【型】SubjectId(drill.ts) には既に "oyo" が含まれるため as 回避は不要（直接使用）。
//       → 中央への申し送り: 以前の kyoyo 各ファイルにある `"kyoyo" as SubjectId` の局所吸収は、
//         union 拡張済みのため整理可能（本ファイルは素の "oyo" を使う）。
// 【表記】全表示テキストはルビ記法 {漢字|よみ}（全漢字ルビ）。ひらがな/カタカナ/数字/記号は素のまま。
//        formalName は管理用（漢字）のためルビ無し。RubyText レンダラ前提。
// 【応用4段ルール】各 Unit の learn は ① 身近な具体 → ② 図・操作で体感 → ③ きまり発見 → ④ やってみる の4段。
// 既存 generators は応用に非対応 → 全単元 固定 questions[]（choice/number-input/ordering/matching・全問 explanation 必須）。
// 小6は最上学年のため、二進法・確率・素数・統計など踏み込んだ大学レベルの本質を具体物と図で噛み砕く。
// ══════════════════════════════════════════

import type { Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 領域（応用4領域。oyo 他学年と同一 id・同一表示名で整合させる前提） ──
// 表示名(name)はひらがな/カタカナ表記で統一（ルビ不要）。formalName は管理用漢字。

export const oyoG6Domains: Domain[] = [
  { id: "oyo.computing", subjectId: "oyo", name: "コンピュータのしくみ", formalName: "計算機科学" },
  { id: "oyo.probability-logic", subjectId: "oyo", name: "かくりつ・ろんり", formalName: "確率・論理" },
  { id: "oyo.number-theory", subjectId: "oyo", name: "かずのひみつ", formalName: "数論" },
  { id: "oyo.data-science", subjectId: "oyo", name: "データのかがく", formalName: "統計・データ" },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo）。prerequisites は実在する算数 g5/g6 単元へ繋ぎ
// （ロードマップが断線しないよう実 id を採用）、leadsTo は同学年応用内・後続概念へ繋ぐ。
// 循環なし（binary→algorithm の一方向、他は算数を前提に持つだけ）。
const U = {
  binary: "oyo.g6.binary",
  probability: "oyo.g6.probability",
  primesCipher: "oyo.g6.primes-cipher",
  statistics: "oyo.g6.statistics",
  algorithm: "oyo.g6.algorithm",
} as const;

export const oyoG6Units: Unit[] = [
  {
    id: U.binary,
    subjectId: "oyo",
    grade: 6,
    domainId: "oyo.computing",
    title: "{二|に}{進|しん}{法|ほう}（0と1のせかい）",
    order: 1,
    realWorldUse:
      "スマホや パソコンは、{電気|でんき}の オン・オフ＝1と0だけで {文字|もじ}や {絵|え}を {表|あらわ}しているよ。デジタルの {世界|せかい}の おおもとの しくみだよ。",
    leadsTo: [U.algorithm],
    prerequisites: ["sansuu.g5.integers-decimals"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.probability,
    subjectId: "oyo",
    grade: 6,
    domainId: "oyo.probability-logic",
    title: "かくりつ（{起|お}こりやすさを{数|かず}で）",
    order: 2,
    realWorldUse:
      "てんき{予報|よほう}の「あめ70％」や、ゲームの あたりやすさ、ほけんの しくみは、{起|お}こりやすさを {数|かず}で {表|あらわ}した かくりつの {考|かんが}えだよ。",
    leadsTo: [U.statistics],
    prerequisites: ["sansuu.g6.combinatorics", "sansuu.g6.fraction-mult-div"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.primesCipher,
    subjectId: "oyo",
    grade: 6,
    domainId: "oyo.number-theory",
    title: "{素|そ}{数|すう}と あんごう",
    order: 3,
    realWorldUse:
      "インターネットの ひみつの {通信|つうしん}（あんごう）は、{大|おお}きな {素|そ}{数|すう}の かけ算を つかって まもられているよ。{買|か}いものの ときの あんぜんも {素|そ}{数|すう}の おかげだよ。",
    leadsTo: [U.algorithm],
    prerequisites: ["sansuu.g5.multiples-divisors"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.statistics,
    subjectId: "oyo",
    grade: 6,
    domainId: "oyo.data-science",
    title: "とうけい（データを{集|あつ}めて{読|よ}む）",
    order: 4,
    realWorldUse:
      "テストの へいきん{点|てん}や、すきな ものしらべ、しょうらいの ニュースの グラフを {読|よ}むときに つかうよ。たくさんの {数|かず}を まとめて {見|み}る {力|ちから}だよ。",
    leadsTo: [],
    prerequisites: ["sansuu.g5.average", "sansuu.g6.data-analysis"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.algorithm,
    subjectId: "oyo",
    grade: 6,
    domainId: "oyo.computing",
    title: "アルゴリズム（{手|て}{順|じゅん}の{科|か}{学|がく}）",
    order: 5,
    realWorldUse:
      "けんさくや カーナビの みちあんない、ゲームの うごきは、ぜんぶ「やる {順|じゅん}ばん（アルゴリズム）」で うごいているよ。だんどりよく すすめる {力|ちから}にも なるよ。",
    leadsTo: [],
    prerequisites: [U.binary],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn〔応用4段〕 + テスト test〔解ける問題・全問 explanation〕） ──

export const oyoG6Contents: Record<string, UnitContent> = {
  // ── 1. 二進法（0と1のせかい） ──
  [U.binary]: {
    unitId: U.binary,
    learn: {
      unitId: U.binary,
      steps: [
        {
          // ① 身近な具体
          heading: "スイッチは オンと オフの 2つだけ",
          body: "へやの {電気|でんき}の スイッチは「ついた（オン）」か「きえた（オフ）」の 2つだけ。コンピュータも おなじで、{電気|でんき}が ながれる「1」と ながれない「0」だけで うごいているよ。",
          visual: { kind: "emoji", value: "💡=1 / ⚫=0", caption: "オン=1・オフ=0" },
        },
        {
          // ② 図・操作で体感
          heading: "1・2・4 の カードで 数を つくる",
          body: "「1」「2」「4」の カードを よういするよ。おもてに する カードの {数|かず}を たすと、いろいろな {数|かず}が つくれるよ。1と4を おもてに すると 1＋4＝5 だね。",
          visual: { kind: "emoji", value: "④🔛 ②⚫ ①🔛 → 5", caption: "4と1で 5" },
        },
        {
          // ③ きまり発見
          heading: "{位|くらい}は 2ばいずつ ふえる",
          body: "ふだんの {数|かず}（十{進|しん}{法|ほう}）は {位|くらい}が 1・10・100と 10ばいずつ。二{進|しん}{法|ほう}は 1・2・4・8と 2ばいずつ ふえるのが きまりだよ。だから 0と1だけで どんな {数|かず}も つくれるよ。",
          visual: { kind: "emoji", value: "①②④⑧ ← ×2 ×2 ×2", caption: "位は2倍ずつ" },
        },
        {
          // ④ やってみる
          heading: "5を 二{進|しん}{法|ほう}で かいてみよう",
          body: "5は 4＋1。だから 4の {位|くらい}と 1の {位|くらい}を「1」、2の {位|くらい}を「0」にして「101」と かくよ。よんで みると「いち・ぜろ・いち」だね。",
          visual: { kind: "emoji", value: "5 = 1·4 + 0·2 + 1·1 = 101", caption: "5は 101" },
        },
      ],
    },
    test: {
      unitId: U.binary,
      questionCount: 5,
      questions: [
        {
          id: `${U.binary}.q-1`,
          unitId: U.binary,
          prompt: "二{進|しん}{法|ほう}では、どんな {数|かず}を つかう?",
          explanation: "二{進|しん}{法|ほう}は {電気|でんき}の オン・オフに あわせて 0と1の 2つだけを つかうよ。",
          format: "choice",
          choices: ["0と1", "1から9", "0から10", "あ と ん"],
          answer: "0と1",
        },
        {
          id: `${U.binary}.q-2`,
          unitId: U.binary,
          prompt: "二{進|しん}{法|ほう}の「101」は、ふだんの {数|かず}（十{進|しん}{法|ほう}）で いくつ?",
          explanation: "1の {位|くらい}が4・つぎが2・つぎが1。101 は 1×4＋0×2＋1×1＝5 だよ。",
          format: "number-input",
          answer: 5,
        },
        {
          id: `${U.binary}.q-3`,
          unitId: U.binary,
          prompt: "ふだんの {数|かず}の「6」を 二{進|しん}{法|ほう}で かくと?",
          explanation: "6は 4＋2。4の {位|くらい}と 2の {位|くらい}を 1、1の {位|くらい}を 0に して「110」だよ。",
          format: "choice",
          choices: ["110", "101", "011", "100"],
          answer: "110",
        },
        {
          id: `${U.binary}.q-4`,
          unitId: U.binary,
          prompt: "つぎの 二{進|しん}{法|ほう}の {数|かず}を、{小|ちい}さい {順|じゅん}に ならべると?",
          explanation: "十{進|しん}{法|ほう}に なおすと 10=2・0=0・11=3・1=1。{小|ちい}さい {順|じゅん}は 0→1→10→11 だよ。",
          format: "ordering",
          items: ["10", "0", "11", "1"],
          answerOrder: [1, 3, 0, 2],
        },
        {
          id: `${U.binary}.q-5`,
          unitId: U.binary,
          prompt: "ふだんの {数|かず}と 二{進|しん}{法|ほう}を ただしく つなげると?",
          explanation: "2=10、3=11、4=100。{位|くらい}が 2ばいずつ なのを たしかめて つなごう。",
          format: "matching",
          left: ["2", "3", "4"],
          right: ["100", "10", "11"],
          answerPairs: [1, 2, 0],
        },
      ],
    },
  },

  // ── 2. かくりつ（起こりやすさを数で） ──
  [U.probability]: {
    unitId: U.probability,
    learn: {
      unitId: U.probability,
      steps: [
        {
          // ① 身近な具体
          heading: "コインや さいころで あそぼう",
          body: "コインを なげると「おもて」か「うら」。さいころを ふると 1〜6の どれか。どれが {出|で}るかは やってみないと わからないね。この「{出|で}やすさ」を {数|かず}で {表|あらわ}すのが かくりつだよ。",
          visual: { kind: "emoji", value: "🪙🎲", caption: "コインとさいころ" },
        },
        {
          // ② 図・操作で体感
          heading: "{起|お}こりかたを ぜんぶ ならべる",
          body: "さいころの 目は 1・2・3・4・5・6の 6{通|とお}り。これが「ぜんぶの {場合|ばあい}」。その うち「3が {出|で}る」のは 1つだけだね。",
          visual: { kind: "emoji", value: "⚀⚁⚂⚃⚄⚅", caption: "ぜんぶで 6通り" },
        },
        {
          // ③ きまり発見
          heading: "かくりつ ＝ あてはまる {数|かず} ÷ ぜんぶの {数|かず}",
          body: "かくりつは「あてはまる {場合|ばあい}の {数|かず}」を「ぜんぶの {場合|ばあい}の {数|かず}」で わって {出|だ}すよ。さいころで 3が {出|で}るのは 1÷6 で「6ぶんの1」だね。",
          visual: { kind: "emoji", value: "1 ÷ 6 = 6ぶんの1", caption: "あてはまる ÷ ぜんぶ" },
        },
        {
          // ④ やってみる
          heading: "ぐうすうが {出|で}る かくりつは?",
          body: "さいころで ぐうすう（2・4・6）が {出|で}るのは 3{通|とお}り。3÷6 で「2ぶんの1」。{半分|はんぶん}の {出|で}やすさだと わかるね。",
          visual: { kind: "emoji", value: "⚁⚃⚅ → 3 ÷ 6 = 2ぶんの1", caption: "偶数は 2ぶんの1" },
        },
      ],
    },
    test: {
      unitId: U.probability,
      questionCount: 5,
      questions: [
        {
          id: `${U.probability}.q-1`,
          unitId: U.probability,
          prompt: "コインを 1かい なげる。おもてが {出|で}る かくりつは?",
          explanation: "おもて・うらの 2{通|とお}りの うち おもては 1つ。1÷2 で「2ぶんの1」だよ。",
          format: "choice",
          choices: ["2ぶんの1", "3ぶんの1", "6ぶんの1", "1"],
          answer: "2ぶんの1",
        },
        {
          id: `${U.probability}.q-2`,
          unitId: U.probability,
          prompt: "さいころを 1かい ふる。3の 目が {出|で}る かくりつは?",
          explanation: "目は ぜんぶで 6{通|とお}り、3は 1つだけ。1÷6 で「6ぶんの1」だよ。",
          format: "choice",
          choices: ["6ぶんの1", "2ぶんの1", "3ぶんの1", "1ぶんの6"],
          answer: "6ぶんの1",
        },
        {
          id: `${U.probability}.q-3`,
          unitId: U.probability,
          prompt: "さいころの 目は ぜんぶで {何|なん}{通|とお}り?",
          explanation: "1・2・3・4・5・6 の 6{通|とお}り。これが かくりつの「ぜんぶの {場合|ばあい}」だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.probability}.q-4`,
          unitId: U.probability,
          prompt: "さいころで「4より {大|おお}きい 目（5か6）」が {出|で}る かくりつは?",
          explanation: "5と6の 2{通|とお}りが あてはまる。2÷6 で「3ぶんの1」だよ。",
          format: "choice",
          choices: ["3ぶんの1", "2ぶんの1", "6ぶんの1", "3ぶんの2"],
          answer: "3ぶんの1",
        },
        {
          id: `${U.probability}.q-5`,
          unitId: U.probability,
          prompt: "{起|お}こりやすい {順|じゅん}（かくりつの {大|おお}きい {順|じゅん}）に ならべると?",
          explanation: "「かならず {起|お}こる」は1、「コインで おもて」は2ぶんの1、「さいころで1」は6ぶんの1。{大|おお}きい {順|じゅん}だよ。",
          format: "ordering",
          items: ["さいころで 1が {出|で}る", "コインで おもて", "あさに なれば {太陽|たいよう}が のぼる"],
          answerOrder: [2, 1, 0],
        },
      ],
    },
  },

  // ── 3. 素数と あんごう ──
  [U.primesCipher]: {
    unitId: U.primesCipher,
    learn: {
      unitId: U.primesCipher,
      steps: [
        {
          // ① 身近な具体
          heading: "ブロックを {長|なが}{方|ほう}{形|けい}に ならべる",
          body: "6この ブロックは 2×3の {長|なが}{方|ほう}{形|けい}に きれいに ならべられるね。でも 7この ブロックは、1れつに するしか なくて、{長|なが}{方|ほう}{形|けい}に ならばないよ。",
          visual: { kind: "emoji", value: "🟦🟦🟦 / 🟦🟦🟦", caption: "6は 2×3" },
        },
        {
          // ② 図・操作で体感
          heading: "わり{算|ざん}で たしかめる",
          body: "12は 2でも 3でも 4でも 6でも わりきれる（いろいろな ならべかた）。でも 7は 1と 7でしか わりきれない。7のような {数|かず}を「{素|そ}{数|すう}」と いうよ。",
          visual: { kind: "emoji", value: "7 = 1 × 7 だけ", caption: "7は素数" },
        },
        {
          // ③ きまり発見
          heading: "{素|そ}{数|すう}は 1と じぶんでしか わりきれない",
          body: "1と じぶん {自身|じしん}でしか わりきれない 2いじょうの {数|かず}が {素|そ}{数|すう}だよ。2・3・5・7・11… と つづくよ。どんな {数|かず}も {素|そ}{数|すう}の かけ算で つくれる、{数|かず}の「ぶひん」なんだ。",
          visual: { kind: "emoji", value: "2 3 5 7 11 13 …", caption: "数のぶひん=素数" },
        },
        {
          // ④ やってみる
          heading: "あんごうに つかえる りゆう",
          body: "3×5＝15 の ように かけ算は かんたん。でも「15を 2つの {数|かず}の かけ算に わけて」と {言|い}われると さがすのが たいへん。{大|おお}きい {素|そ}{数|すう}だと もっと むずかしい。この「わけにくさ」が あんごうに つかわれているよ。",
          visual: { kind: "emoji", value: "3 × 5 → 15 (かんたん) / 15 → ?×? (むずかしい)", caption: "わけにくさが鍵" },
        },
      ],
    },
    test: {
      unitId: U.primesCipher,
      questionCount: 5,
      questions: [
        {
          id: `${U.primesCipher}.q-1`,
          unitId: U.primesCipher,
          prompt: "つぎの うち、{素|そ}{数|すう}は どれ?",
          explanation: "7は 1と 7でしか わりきれない {素|そ}{数|すう}。8・9・10は ほかの {数|かず}でも わりきれるよ。",
          format: "choice",
          choices: ["7", "8", "9", "10"],
          answer: "7",
        },
        {
          id: `${U.primesCipher}.q-2`,
          unitId: U.primesCipher,
          prompt: "1から 10までに、{素|そ}{数|すう}は いくつ ある?",
          explanation: "2・3・5・7 の 4つ。1は {素|そ}{数|すう}に いれない やくそくだよ。",
          format: "number-input",
          answer: 4,
        },
        {
          id: `${U.primesCipher}.q-3`,
          unitId: U.primesCipher,
          prompt: "15を、1と じぶん {以外|いがい}の かけ算で あらわすと?",
          explanation: "15＝3×5。3も 5も {素|そ}{数|すう}だから、これが いちばん こまかい ぶひんだよ。",
          format: "choice",
          choices: ["3×5", "2×7", "4×4", "2×8"],
          answer: "3×5",
        },
        {
          id: `${U.primesCipher}.q-4`,
          unitId: U.primesCipher,
          prompt: "{素|そ}{数|すう}を {小|ちい}さい {順|じゅん}に ならべると?",
          explanation: "{小|ちい}さい ほうから 2・3・5・7。となりとの あいだは ばらばらなのが {素|そ}{数|すう}の とくちょうだよ。",
          format: "ordering",
          items: ["5", "2", "7", "3"],
          answerOrder: [1, 3, 0, 2],
        },
        {
          id: `${U.primesCipher}.q-5`,
          unitId: U.primesCipher,
          prompt: "{大|おお}きな {数|かず}の かけ算が あんごうに つかえるのは、なぜ?",
          explanation: "かける のは かんたんでも、もとの 2つの {数|かず}に わける（{素|そ}{因|いん}{数|すう}に わける）のが とても むずかしいからだよ。",
          format: "choice",
          choices: [
            "かけ算は かんたんでも、もとの {数|かず}に わけるのが むずかしいから",
            "{数|かず}が {大|おお}きいと きれいだから",
            "1は {素|そ}{数|すう}だから",
            "ぐうすうは わりやすいから",
          ],
          answer: "かけ算は かんたんでも、もとの {数|かず}に わけるのが むずかしいから",
        },
      ],
    },
  },

  // ── 4. とうけい（データを集めて読む） ──
  [U.statistics]: {
    unitId: U.statistics,
    learn: {
      unitId: U.statistics,
      steps: [
        {
          // ① 身近な具体
          heading: "クラスで しらべて みよう",
          body: "「すきな くだもの」を クラスで しらべると、りんごが {何|なん}人、みかんが {何|なん}人… と {数|かず}が あつまるね。これが「データ」だよ。",
          visual: { kind: "emoji", value: "🍎🍊🍌 → 📋", caption: "あつめた数=データ" },
        },
        {
          // ② 図・操作で体感
          heading: "{表|ひょう}を グラフに する",
          body: "あつめた {数|かず}を ぼうの {高|たか}さに すると、どれが {多|おお}いか ひとめで わかるね。グラフに すると データが「{見|み}える」ように なるよ。",
          visual: { kind: "emoji", value: "🍌▉▉▉▉▉ / 🍎▉▉▉", caption: "ぼうグラフ" },
        },
        {
          // ③ きまり発見
          heading: "へいきん ＝ {合計|ごうけい} ÷ {個|こ}{数|すう}",
          body: "ばらばらの {数|かず}を ならす {代表|だいひょう}の {数|かず}が「へいきん」。ぜんぶ たして {個|こ}{数|すう}で わると {出|で}るよ。2・4・6 なら (2＋4＋6)÷3＝4 だね。",
          visual: { kind: "emoji", value: "(2+4+6) ÷ 3 = 4", caption: "ならした数=平均" },
        },
        {
          // ④ やってみる
          heading: "テストの へいきん{点|てん}を {出|だ}そう",
          body: "8{点|てん}・6{点|てん}・10{点|てん} の へいきんは、たして 24、÷3 で 8{点|てん}。へいきんを {見|み}ると、ぜんたいの ようすが つかめるよ。",
          visual: { kind: "emoji", value: "(8+6+10) ÷ 3 = 8", caption: "平均8点" },
        },
      ],
    },
    test: {
      unitId: U.statistics,
      questionCount: 5,
      questions: [
        {
          id: `${U.statistics}.q-1`,
          unitId: U.statistics,
          prompt: "2・4・6 の へいきんは いくつ?",
          explanation: "たすと 2＋4＋6＝12、{個|こ}{数|すう}は 3こ。12÷3＝4 だよ。",
          format: "number-input",
          answer: 4,
        },
        {
          id: `${U.statistics}.q-2`,
          unitId: U.statistics,
          prompt: "10・20・30 の へいきんは いくつ?",
          explanation: "10＋20＋30＝60、÷3 で 20。まん{中|なか}の {数|かず}に なっているね。",
          format: "number-input",
          answer: 20,
        },
        {
          id: `${U.statistics}.q-3`,
          unitId: U.statistics,
          prompt: "あつめた データを、どれが {多|おお}いか {見|み}やすく した {図|ず}を {何|なん}と いう?",
          explanation: "ぼうの {高|たか}さなどで {数|かず}を {表|あらわ}した {図|ず}を グラフと いうよ。データが {見|み}えるように なるね。",
          format: "choice",
          choices: ["グラフ", "とけい", "ちず", "カレンダー"],
          answer: "グラフ",
        },
        {
          id: `${U.statistics}.q-4`,
          unitId: U.statistics,
          prompt: "すきな くだものしらべで、りんご5人・みかん3人・ばなな8人。いちばん {人|にん}{気|き}は?",
          explanation: "{数|かず}が いちばん {多|おお}いのは ばななの 8人。グラフなら ぼうが いちばん {高|たか}く なるよ。",
          format: "choice",
          choices: ["ばなな", "りんご", "みかん", "ぶどう"],
          answer: "ばなな",
        },
        {
          id: `${U.statistics}.q-5`,
          unitId: U.statistics,
          prompt: "テストの {点|てん}が 7・7・7・7。へいきん{点|てん}は?",
          explanation: "ぜんぶ おなじ 7{点|てん}なので、たして 28、÷4 で 7。みんな おなじ ときは へいきんも おなじだよ。",
          format: "number-input",
          answer: 7,
        },
      ],
    },
  },

  // ── 5. アルゴリズム（手順の科学） ──
  [U.algorithm]: {
    unitId: U.algorithm,
    learn: {
      unitId: U.algorithm,
      steps: [
        {
          // ① 身近な具体
          heading: "あさの じゅんびにも {順|じゅん}ばんが ある",
          body: "あさは「おきる→かおを あらう→{服|ふく}を きる→ごはん」の {順|じゅん}ばんで うごくね。りょうりの レシピも おなじ。やる ことを ただしい {順|じゅん}に ならべた ものを アルゴリズムと いうよ。",
          visual: { kind: "emoji", value: "⏰→🚿→👕→🍚", caption: "朝のじゅんび" },
        },
        {
          // ② 図・操作で体感
          heading: "カードを {小|ちい}さい {順|じゅん}に ならべかえる",
          body: "ばらばらの {数|かず}の カードを、となりどうしを くらべて {大|おお}きい ほうを {後|うし}ろに ずらす。これを くりかえすと、いつのまにか {小|ちい}さい {順|じゅん}に そろうよ。",
          visual: { kind: "emoji", value: "3 1 2 → 1 2 3", caption: "となりを比べて並べる" },
        },
        {
          // ③ きまり発見
          heading: "{半分|はんぶん}ずつ さがすと はやい",
          body: "{順|じゅん}に ならんだ ものから さがす ときは、まん{中|なか}を {見|み}て「もっと {前|まえ}か {後|うし}ろか」を きめると、{毎回|まいかい} のこりが {半分|はんぶん}に なる。1つずつ さがすより ずっと はやいよ。",
          visual: { kind: "emoji", value: "📖 まん中 → 半分 → 半分", caption: "二分たんさく" },
        },
        {
          // ④ やってみる
          heading: "おなじ {手|て}{順|じゅん}を くりかえせば 必ず できる",
          body: "アルゴリズムの よい ところは、おなじ {手|て}{順|じゅん}を まちがえずに くりかえせば、だれが やっても・コンピュータでも、{必|かなら}ず こたえに たどりつく ことだよ。",
          visual: { kind: "emoji", value: "🔁 → ✅", caption: "くりかえせば必ず解ける" },
        },
      ],
    },
    test: {
      unitId: U.algorithm,
      questionCount: 5,
      questions: [
        {
          id: `${U.algorithm}.q-1`,
          unitId: U.algorithm,
          prompt: "アルゴリズムとは、どんな もの?",
          explanation: "アルゴリズムは「もんだいを とくための、ただしい {手|て}{順|じゅん}」のこと。りょうりの レシピも アルゴリズムの なかまだよ。",
          format: "choice",
          choices: ["もんだいを とくための {手|て}{順|じゅん}", "コンピュータの 名まえ", "ゲームの 名まえ", "{計算|けいさん}の どうぐ"],
          answer: "もんだいを とくための {手|て}{順|じゅん}",
        },
        {
          id: `${U.algorithm}.q-2`,
          unitId: U.algorithm,
          prompt: "カレーを つくる {手|て}{順|じゅん}を、ただしい {順|じゅん}ばんに ならべると?",
          explanation: "まず {野|や}{菜|さい}を きり、つぎに にて、あじを つけ、さいごに もりつける。{順|じゅん}ばんを まちがえると できないね。",
          format: "ordering",
          items: ["{野|や}{菜|さい}を きる", "おさらに もる", "なべで にる", "あじを つける"],
          answerOrder: [0, 2, 3, 1],
        },
        {
          id: `${U.algorithm}.q-3`,
          unitId: U.algorithm,
          prompt: "3・1・2 の カードを {小|ちい}さい {順|じゅん}に ならべると?",
          explanation: "{小|ちい}さい ほうから 1・2・3。となりを くらべて 入れかえる {手|て}{順|じゅん}を くりかえすと そろうよ。",
          format: "ordering",
          items: ["3", "1", "2"],
          answerOrder: [1, 2, 0],
        },
        {
          id: `${U.algorithm}.q-4`,
          unitId: U.algorithm,
          prompt: "{順|じゅん}に ならんだ ものから、はやく さがす よい ほうほうは?",
          explanation: "まん{中|なか}を {見|み}て {半分|はんぶん}に しぼる「二{分|ぶん}たんさく」が はやいよ。1つずつ さがすより ずっと すくない かいすうで みつかるよ。",
          format: "choice",
          choices: [
            "まん{中|なか}を {見|み}て {半分|はんぶん}ずつ しぼる",
            "ぜんぶ 1つずつ {見|み}る",
            "てきとうに えらぶ",
            "さがさない",
          ],
          answer: "まん{中|なか}を {見|み}て {半分|はんぶん}ずつ しぼる",
        },
        {
          id: `${U.algorithm}.q-5`,
          unitId: U.algorithm,
          prompt: "{手|て}{順|じゅん}の しゅるいと、みのまわりの れいを ただしく つなげると?",
          explanation: "「ならべかえ」は せの {高|たか}い {順|じゅん}に ならぶこと、「さがす」は じしょで ことばを ひくこと。どちらも アルゴリズムだよ。",
          format: "matching",
          left: ["ならべかえ", "さがす"],
          right: ["じしょで ことばを ひく", "せの {高|たか}い {順|じゅん}に ならぶ"],
          answerPairs: [1, 0],
        },
      ],
    },
  },
};
