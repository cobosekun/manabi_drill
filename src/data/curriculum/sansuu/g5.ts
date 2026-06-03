// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小5
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts（export構造・命名・粒度を合わせる）。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 小5は既存 generators（10までの加減・計数のみ）が使えないため、全単元 固定 questions[]。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 表記規約: 全表示テキストは漢字＋ルビ {漢字|よみ}（全漢字ルビ）。id/構造/メタは不変。
// ══════════════════════════════════════════

import type { Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 領域 ──────────────────────────────────
// 数と計算 は g1 と同じ領域id（sansuu.number-calc）を共有する（学年をまたぐ同一領域）。

export const sansuuG5Domains: Domain[] = [
  {
    id: "sansuu.number-calc",
    subjectId: "sansuu",
    name: "{数|かず}と{計算|けいさん}",
    formalName: "数と計算",
  },
  {
    id: "sansuu.geometry",
    subjectId: "sansuu",
    name: "{図形|ずけい}",
    formalName: "図形",
  },
  {
    id: "sansuu.change-relation",
    subjectId: "sansuu",
    name: "{変化|へんか}と{関係|かんけい}",
    formalName: "変化と関係",
  },
  {
    id: "sansuu.data",
    subjectId: "sansuu",
    name: "データの{活用|かつよう}",
    formalName: "データの活用",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo）。g4 を前提、g6 へつながる前提で id を指す
// （他worker/他学年の単元と将来つながる。バリデータが最終的に参照解決を検査）。
//
//   integers-decimals ─▶ decimal-mul-div ─▶ per-unit-quantity ─▶ ratio-percentage
//   multiples-divisors ─▶ fraction-add-sub
//   area-figures ─▶ regular-polygon-circle / volume
//   average / band-pie-graph（データの活用）
//
const U = {
  integersDecimals: "sansuu.g5.integers-decimals",
  multiplesDivisors: "sansuu.g5.multiples-divisors",
  decimalMulDiv: "sansuu.g5.decimal-mul-div",
  fractionAddSub: "sansuu.g5.fraction-add-sub",
  areaFigures: "sansuu.g5.area-figures",
  regularPolygonCircle: "sansuu.g5.regular-polygon-circle",
  volume: "sansuu.g5.volume",
  perUnitQuantity: "sansuu.g5.per-unit-quantity",
  ratioPercentage: "sansuu.g5.ratio-percentage",
  average: "sansuu.g5.average",
  bandPieGraph: "sansuu.g5.band-pie-graph",
} as const;

// 他学年の参照先 id（将来 g4/g6 worker が用意する前提で文字列指定）
const G4 = {
  decimalAddSub: "sansuu.g4.decimals",
  fractionMeaning: "sansuu.g4.fractions",
  areaRectangle: "sansuu.g4.area",
  divisionWhole: "sansuu.g4.division-algorithm",
} as const;
const G6 = {
  fractionMulDiv: "sansuu.g6.fraction-mult-div",
  ratioProportion: "sansuu.g6.ratio",
  circleArea: "sansuu.g6.circle-area",
  prismVolume: "sansuu.g6.solid-volume",
  speed: "sansuu.g6.proportion",
} as const;

export const sansuuG5Units: Unit[] = [
  {
    id: U.integersDecimals,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "{整数|せいすう}と{小数|しょうすう}",
    order: 1,
    realWorldUse:
      "{値段|ねだん}を 10{倍|ばい}・100{倍|ばい} したり、グラムを キログラムに {直|なお}すときのように、{桁|けた}を {動|うご}かして {数|かず}の {大|おお}きさを {変|か}えるときに {使|つか}うよ。",
    leadsTo: [U.decimalMulDiv],
    prerequisites: [G4.decimalAddSub],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.multiplesDivisors,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "{倍数|ばいすう}と{約数|やくすう}",
    order: 2,
    realWorldUse:
      "{同|おな}じ {間隔|かんかく}で {並|なら}ぶ ものの {時間|じかん}を {揃|そろ}えたり、{飴|あめ}を {余|あま}りなく {分|わ}けられる {人数|にんずう}を {考|かんが}えるときに {使|つか}うよ。",
    leadsTo: [U.fractionAddSub],
    prerequisites: [G4.divisionWhole],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.decimalMulDiv,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "{小数|しょうすう}の {掛|か}け{算|ざん}・{割|わ}り{算|ざん}",
    order: 3,
    realWorldUse:
      "1mで 80{円|えん}の リボンを 2.5m {買|か}ったときの {値段|ねだん}のように、{半端|はんぱ}な {数|かず}の {掛|か}け{算|ざん}・{割|わ}り{算|ざん}に {使|つか}うよ。",
    leadsTo: [U.perUnitQuantity, G6.fractionMulDiv],
    prerequisites: [U.integersDecimals],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.fractionAddSub,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.number-calc",
    title: "{分数|ぶんすう}の {足|た}し{算|ざん}・{引|ひ}き{算|ざん}",
    order: 4,
    realWorldUse:
      "ピザを 1/2 と 1/3 {食|た}べた {全部|ぜんぶ}の {量|りょう}のように、{分母|ぶんぼ}の {違|ちが}う {分数|ぶんすう}を {合|あ}わせたり {減|へ}らしたりするときに {使|つか}うよ。",
    leadsTo: [G6.fractionMulDiv],
    prerequisites: [U.multiplesDivisors, G4.fractionMeaning],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.areaFigures,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.geometry",
    title: "{三角形|さんかくけい}・{四角形|しかくけい}の {面積|めんせき}",
    order: 5,
    realWorldUse:
      "{三角|さんかく}の {旗|はた}や {平行四辺形|へいこうしへんけい}の {壁|かべ}の {広|ひろ}さを {求|もと}めるときのように、いろいろな {形|かたち}の {面積|めんせき}を {測|はか}るときに {使|つか}うよ。",
    leadsTo: [U.regularPolygonCircle, G6.circleArea],
    prerequisites: [G4.areaRectangle],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.regularPolygonCircle,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.geometry",
    title: "{正多角形|せいたかくけい}と{円|えん}",
    order: 6,
    realWorldUse:
      "{丸|まる}い お{皿|さら}の {縁|ふち}の {長|なが}さ（{円周|えんしゅう}）や、タイヤが 1{回転|かいてん}で {進|すす}む {距離|きょり}を {求|もと}めるときに {使|つか}うよ。",
    leadsTo: [G6.circleArea],
    prerequisites: [U.areaFigures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.volume,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.geometry",
    title: "{体積|たいせき}",
    order: 7,
    realWorldUse:
      "{箱|はこ}や {水槽|すいそう}に どれだけ {水|みず}や {物|もの}が {入|はい}るかを {求|もと}めるときのように、{入|い}れ{物|もの}の {大|おお}きさ（かさ）を {知|し}るときに {使|つか}うよ。",
    leadsTo: [G6.prismVolume],
    prerequisites: [U.areaFigures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.perUnitQuantity,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.change-relation",
    title: "{単位量|たんいりょう}あたりの {大|おお}きさ",
    order: 8,
    realWorldUse:
      "お{菓子|かし} 1こ {分|ぶん}の {値段|ねだん}や、{車|くるま}が 1L で {進|すす}む {距離|きょり}を {比|くら}べて、どちらが お{得|とく}か {考|かんが}えるときに {使|つか}うよ。",
    leadsTo: [U.ratioPercentage, G6.speed],
    prerequisites: [U.decimalMulDiv],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.ratioPercentage,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.change-relation",
    title: "{割合|わりあい}と{百分率|ひゃくぶんりつ}",
    order: 9,
    realWorldUse:
      "お{店|みせ}の「20%{引|び}き」や、テストの {正解率|せいかいりつ}のように、{全体|ぜんたい}を {基|もと}にした {割合|わりあい}を {考|かんが}えるときに {使|つか}うよ。",
    leadsTo: [U.bandPieGraph, G6.ratioProportion],
    prerequisites: [U.perUnitQuantity],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.average,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.data",
    title: "{平均|へいきん}",
    order: 10,
    realWorldUse:
      "テストの {平均点|へいきんてん}や、1{日|にち}に {読|よ}む {本|ほん}の ページ{数|すう}のように、でこぼこした {数|かず}を {均|なら}して {表|あらわ}すときに {使|つか}うよ。",
    leadsTo: [U.bandPieGraph],
    prerequisites: [G4.divisionWhole],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.bandPieGraph,
    subjectId: "sansuu",
    grade: 5,
    domainId: "sansuu.data",
    title: "{帯|おび}グラフと{円|えん}グラフ",
    order: 11,
    realWorldUse:
      "クラスの {好|す}きな {教科|きょうか}や、{使|つか}った お{小遣|こづか}いの {内訳|うちわけ}のように、{全体|ぜんたい}に {対|たい}する {割合|わりあい}を {絵|え}で {比|くら}べるときに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [U.ratioPercentage],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 算数小5は既存 generators が対応しないため、全単元 固定 questions[]（全問 explanation 必須）。

export const sansuuG5Contents: Record<string, UnitContent> = {
  // ── 1. 整数と小数 ──
  [U.integersDecimals]: {
    unitId: U.integersDecimals,
    learn: {
      unitId: U.integersDecimals,
      steps: [
        {
          heading: "10{倍|ばい}・100{倍|ばい}すると?",
          body: "{数|かず}を 10{倍|ばい} すると {位|くらい}が {一|ひと}つ {上|あ}がって、{点|てん}が {右|みぎ}へ {動|うご}くよ。100{倍|ばい}なら {二|ふた}つ {上|あ}がるよ。",
          visual: { kind: "emoji", value: "2.5 → 25 → 250", caption: "10{倍|ばい}・100{倍|ばい}" },
        },
        {
          heading: "1/10・1/100にすると?",
          body: "{数|かず}を 1/10 にすると {位|くらい}が {一|ひと}つ {下|さ}がって、{点|てん}が {左|ひだり}へ {動|うご}くよ。100{分|ぶん}の1なら {二|ふた}つ {下|さ}がるよ。",
          visual: { kind: "emoji", value: "38 → 3.8 → 0.38", caption: "1/10・1/100" },
        },
        {
          heading: "0.01が {何|なん}こ{分|ぶん}?",
          body: "0.74 は 0.1 が 7こ と 0.01 が 4こ。{全部|ぜんぶ}で 0.01 が 74こ {集|あつ}まった {数|かず}とも {言|い}えるよ。",
          visual: { kind: "emoji", value: "0.74 = 0.01 × 74", caption: "{小|ちい}さい {位|くらい}で {数|かぞ}える" },
        },
      ],
    },
    test: {
      unitId: U.integersDecimals,
      questionCount: 5,
      questions: [
        {
          id: `${U.integersDecimals}.q-1`,
          unitId: U.integersDecimals,
          prompt: "2.5 を 10{倍|ばい} すると いくつ?",
          explanation: "10{倍|ばい}すると {位|くらい}が {一|ひと}つ {上|あ}がるよ。{点|てん}が {右|みぎ}へ {動|うご}いて 25 になるよ。",
          format: "number-input",
          answer: 25,
        },
        {
          id: `${U.integersDecimals}.q-2`,
          unitId: U.integersDecimals,
          prompt: "38 を 1/10 に すると いくつ?",
          explanation: "1/10 にすると {位|くらい}が {一|ひと}つ {下|さ}がるよ。{点|てん}が {左|ひだり}へ {動|うご}いて 3.8 になるよ。",
          format: "number-input",
          answer: 3.8,
        },
        {
          id: `${U.integersDecimals}.q-3`,
          unitId: U.integersDecimals,
          prompt: "0.74 は 0.01 を {何|なん}こ {集|あつ}めた {数|かず}?",
          explanation: "0.74 = 0.01 × 74。だから 0.01 が 74こ {集|あつ}まった {数|かず}だよ。",
          format: "number-input",
          answer: 74,
        },
        {
          id: `${U.integersDecimals}.q-4`,
          unitId: U.integersDecimals,
          prompt: "6.2 を 100{倍|ばい} すると いくつ?",
          explanation: "100{倍|ばい}は {位|くらい}が {二|ふた}つ {上|あ}がるよ。6.2 → 62 → 620 で 620 だよ。",
          format: "number-input",
          answer: 620,
        },
        {
          id: `${U.integersDecimals}.q-5`,
          unitId: U.integersDecimals,
          prompt: "4.5 を 1/100 に すると いくつ?",
          explanation: "1/100 は {位|くらい}が {二|ふた}つ {下|さ}がるよ。4.5 → 0.45 → 0.045 で 0.045 だよ。",
          format: "number-input",
          answer: 0.045,
        },
      ],
    },
  },

  // ── 2. 倍数と約数 ──
  [U.multiplesDivisors]: {
    unitId: U.multiplesDivisors,
    learn: {
      unitId: U.multiplesDivisors,
      steps: [
        {
          heading: "{倍数|ばいすう}って {何|なに}?",
          body: "ある {数|かず}を 1{倍|ばい}・2{倍|ばい}・3{倍|ばい}… した {数|かず}を「{倍数|ばいすう}」というよ。3の {倍数|ばいすう}は 3, 6, 9, 12… だね。",
          visual: { kind: "emoji", value: "3 6 9 12 15", caption: "3の {倍数|ばいすう}" },
        },
        {
          heading: "{約数|やくすう}って {何|なに}?",
          body: "ある {数|かず}を {割|わ}りきれる {数|かず}を「{約数|やくすう}」というよ。12 の {約数|やくすう}は 1, 2, 3, 4, 6, 12 だよ。",
          visual: { kind: "emoji", value: "12 ÷ 1,2,3,4,6,12", caption: "12を {割|わ}りきれる {数|かず}" },
        },
        {
          heading: "{公倍数|こうばいすう}・{公約数|こうやくすう}",
          body: "{二|ふた}つの {数|かず}に {共通|きょうつう}の {倍数|ばいすう}が {公倍数|こうばいすう}、{共通|きょうつう}の {約数|やくすう}が {公約数|こうやくすう}。{一番|いちばん} {小|ちい}さい/{大|おお}きい ものに {注目|ちゅうもく}するよ。",
          visual: { kind: "emoji", value: "6と8 → 24 / 12と18 → 6", caption: "{最小公倍数|さいしょうこうばいすう}・{最大公約数|さいだいこうやくすう}" },
        },
      ],
    },
    test: {
      unitId: U.multiplesDivisors,
      questionCount: 5,
      questions: [
        {
          id: `${U.multiplesDivisors}.q-1`,
          unitId: U.multiplesDivisors,
          prompt: "6 と 8 の {最小公倍数|さいしょうこうばいすう} は?",
          explanation: "6の {倍数|ばいすう} 6,12,18,24… と 8の {倍数|ばいすう} 8,16,24… で {初|はじ}めて {揃|そろ}うのが 24 だよ。",
          format: "number-input",
          answer: 24,
        },
        {
          id: `${U.multiplesDivisors}.q-2`,
          unitId: U.multiplesDivisors,
          prompt: "12 と 18 の {最大公約数|さいだいこうやくすう} は?",
          explanation: "12の {約数|やくすう}と 18の {約数|やくすう}で {共通|きょうつう}の {一番|いちばん} {大|おお}きい {数|かず}は 6 だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.multiplesDivisors}.q-3`,
          unitId: U.multiplesDivisors,
          prompt: "{次|つぎ}の うち {偶数|ぐうすう} は どれ?",
          explanation: "{偶数|ぐうすう}は 2で {割|わ}りきれる {数|かず}。14 は 2で {割|わ}りきれるので {偶数|ぐうすう}だよ。",
          format: "choice",
          choices: ["14", "7", "9", "21"],
          answer: "14",
        },
        {
          id: `${U.multiplesDivisors}.q-4`,
          unitId: U.multiplesDivisors,
          prompt: "15 の {約数|やくすう} は {何|なん}こ ある?",
          explanation: "15 を {割|わ}りきれるのは 1, 3, 5, 15 の 4こ だよ。",
          format: "number-input",
          answer: 4,
        },
        {
          id: `${U.multiplesDivisors}.q-5`,
          unitId: U.multiplesDivisors,
          prompt: "3 の {倍数|ばいすう} を {小|ちい}さい {順|じゅん}に {並|なら}べたとき、4{番目|ばんめ} は?",
          explanation: "3, 6, 9, 12… だから 4{番目|ばんめ}は 12 だよ。",
          format: "number-input",
          answer: 12,
        },
      ],
    },
  },

  // ── 3. 小数のかけ算・わり算 ──
  [U.decimalMulDiv]: {
    unitId: U.decimalMulDiv,
    learn: {
      unitId: U.decimalMulDiv,
      steps: [
        {
          heading: "{小数|しょうすう}の {掛|か}け{算|ざん}",
          body: "{点|てん}を ないものとして {整数|せいすう}の ように {掛|か}けて、{最後|さいご}に {元|もと}の {小数|しょうすう}の {桁|けた}{分|ぶん} {点|てん}を {打|う}つよ。2.4 × 3 なら 24 × 3 = 72 → 7.2。",
          visual: { kind: "emoji", value: "2.4 × 3 = 7.2", caption: "{桁|けた}{分|ぶん} {点|てん}を {打|う}つ" },
        },
        {
          heading: "{小数|しょうすう}の {割|わ}り{算|ざん}",
          body: "{割|わ}る {数|かず}を {整数|せいすう}に なるように 10{倍|ばい}・100{倍|ばい} して、{割|わ}られる {数|かず}も {同|おな}じだけ {動|うご}かしてから {割|わ}るよ。",
          visual: { kind: "emoji", value: "7.2 ÷ 0.9 = 72 ÷ 9 = 8", caption: "{割|わ}る {数|かず}を {整数|せいすう}に" },
        },
        {
          heading: "1より {小|ちい}さい {数|かず}を {掛|か}ける",
          body: "1.5 × 0.4 のように 1より {小|ちい}さい {数|かず}を {掛|か}けると、{答|こた}えは {元|もと}の {数|かず}より {小|ちい}さく なるよ。",
          visual: { kind: "emoji", value: "1.5 × 0.4 = 0.6", caption: "{小|ちい}さく なる" },
        },
      ],
    },
    test: {
      unitId: U.decimalMulDiv,
      questionCount: 5,
      questions: [
        {
          id: `${U.decimalMulDiv}.q-1`,
          unitId: U.decimalMulDiv,
          prompt: "2.4 × 3 = ?",
          explanation: "24 × 3 = 72。{小数|しょうすう}1{桁|けた}{分|ぶん} {点|てん}を {打|う}って 7.2 だよ。",
          format: "number-input",
          answer: 7.2,
        },
        {
          id: `${U.decimalMulDiv}.q-2`,
          unitId: U.decimalMulDiv,
          prompt: "1.5 × 0.4 = ?",
          explanation: "15 × 4 = 60。{小数|しょうすう}2{桁|けた}{分|ぶん} {点|てん}を {打|う}って 0.60 = 0.6 だよ。",
          format: "number-input",
          answer: 0.6,
        },
        {
          id: `${U.decimalMulDiv}.q-3`,
          unitId: U.decimalMulDiv,
          prompt: "4.8 ÷ 6 = ?",
          explanation: "48 ÷ 6 = 8。{位|くらい}を そろえて 0.8 だよ。",
          format: "number-input",
          answer: 0.8,
        },
        {
          id: `${U.decimalMulDiv}.q-4`,
          unitId: U.decimalMulDiv,
          prompt: "7.2 ÷ 0.9 = ?",
          explanation: "{割|わ}る {数|かず} 0.9 を 10{倍|ばい}して 9、{割|わ}られる {数|かず}も 10{倍|ばい}して 72。72 ÷ 9 = 8 だよ。",
          format: "number-input",
          answer: 8,
        },
        {
          id: `${U.decimalMulDiv}.q-5`,
          unitId: U.decimalMulDiv,
          prompt: "0.6 × 0.5 = ?",
          explanation: "6 × 5 = 30。{小数|しょうすう}2{桁|けた}{分|ぶん} {点|てん}を {打|う}って 0.30 = 0.3 だよ。",
          format: "number-input",
          answer: 0.3,
        },
      ],
    },
  },

  // ── 4. 分数のたし算・ひき算 ──
  [U.fractionAddSub]: {
    unitId: U.fractionAddSub,
    learn: {
      unitId: U.fractionAddSub,
      steps: [
        {
          heading: "{通分|つうぶん}って {何|なに}?",
          body: "{分母|ぶんぼ}（{下|した}の {数|かず}）が {違|ちが}う {分数|ぶんすう}は、そのまま {足|た}せないよ。{分母|ぶんぼ}を {揃|そろ}えることを「{通分|つうぶん}」というよ。",
          visual: { kind: "emoji", value: "1/2 = 3/6 , 1/3 = 2/6", caption: "{分母|ぶんぼ}を 6に {揃|そろ}える" },
        },
        {
          heading: "{分母|ぶんぼ}を そろえて {足|た}す・{引|ひ}く",
          body: "{通分|つうぶん}したら {分子|ぶんし}（{上|うえ}の {数|かず}）どうしを {足|た}したり {引|ひ}いたり するよ。1/2 + 1/3 = 3/6 + 2/6 = 5/6。",
          visual: { kind: "emoji", value: "3/6 + 2/6 = 5/6", caption: "{分子|ぶんし}を {足|た}す" },
        },
        {
          heading: "{約分|やくぶん}で かんたんに",
          body: "{答|こた}えの {分数|ぶんすう}は、{分母|ぶんぼ}と {分子|ぶんし}を {同|おな}じ {数|かず}で {割|わ}って {小|ちい}さく できるよ（{約分|やくぶん}）。3/6 = 1/2 だね。",
          visual: { kind: "emoji", value: "3/6 = 1/2", caption: "{約分|やくぶん}" },
        },
      ],
    },
    test: {
      unitId: U.fractionAddSub,
      questionCount: 5,
      questions: [
        {
          id: `${U.fractionAddSub}.q-1`,
          unitId: U.fractionAddSub,
          prompt: "1/2 + 1/3 = ?",
          explanation: "{分母|ぶんぼ}を 6に {通分|つうぶん}して 3/6 + 2/6 = 5/6 だよ。",
          format: "choice",
          choices: ["5/6", "2/5", "1/6", "2/6"],
          answer: "5/6",
        },
        {
          id: `${U.fractionAddSub}.q-2`,
          unitId: U.fractionAddSub,
          prompt: "3/4 − 1/2 = ?",
          explanation: "1/2 を 2/4 にして 3/4 − 2/4 = 1/4 だよ。",
          format: "choice",
          choices: ["1/4", "2/4", "1/2", "2/2"],
          answer: "1/4",
        },
        {
          id: `${U.fractionAddSub}.q-3`,
          unitId: U.fractionAddSub,
          prompt: "2/3 + 5/6 = ?",
          explanation: "2/3 を 4/6 にして 4/6 + 5/6 = 9/6。{約分|やくぶん}して 3/2 だよ。",
          format: "choice",
          choices: ["3/2", "7/9", "1/2", "9/9"],
          answer: "3/2",
        },
        {
          id: `${U.fractionAddSub}.q-4`,
          unitId: U.fractionAddSub,
          prompt: "5/6 − 1/3 = ?",
          explanation: "1/3 を 2/6 にして 5/6 − 2/6 = 3/6。{約分|やくぶん}して 1/2 だよ。",
          format: "choice",
          choices: ["1/2", "4/3", "4/6", "2/3"],
          answer: "1/2",
        },
        {
          id: `${U.fractionAddSub}.q-5`,
          unitId: U.fractionAddSub,
          prompt: "1/5 + 3/10 = ?",
          explanation: "1/5 を 2/10 にして 2/10 + 3/10 = 5/10。{約分|やくぶん}して 1/2 だよ。",
          format: "choice",
          choices: ["1/2", "4/15", "5/10", "2/5"],
          answer: "1/2",
        },
      ],
    },
  },

  // ── 5. 三角形・四角形の面積 ──
  [U.areaFigures]: {
    unitId: U.areaFigures,
    learn: {
      unitId: U.areaFigures,
      steps: [
        {
          heading: "{三角形|さんかくけい}の {面積|めんせき}",
          body: "{三角形|さんかくけい}の {面積|めんせき}は「{底|そこ} × {高|たか}さ ÷ 2」で {求|もと}めるよ。{長四角|ながしかく}の {半分|はんぶん}と {考|かんが}えると {分|わ}かりやすいね。",
          visual: { kind: "emoji", value: "△ = {底|そこ} × {高|たか}さ ÷ 2", caption: "{長四角|ながしかく}の {半分|はんぶん}" },
        },
        {
          heading: "{平行四辺形|へいこうしへんけい}の {面積|めんせき}",
          body: "{平行四辺形|へいこうしへんけい}の {面積|めんせき}は「{底|そこ} × {高|たか}さ」だよ。{横|よこ}に {切|き}って {動|うご}かすと {長四角|ながしかく}に なるからだね。",
          visual: { kind: "emoji", value: "▱ = {底|そこ} × {高|たか}さ", caption: "{長四角|ながしかく}に {直|なお}せる" },
        },
        {
          heading: "{単位|たんい}は {平方|へいほう} cm",
          body: "{面積|めんせき}の {単位|たんい}は cm²（{平方|へいほう}センチメートル）。1cmの ますが {何|なん}こ {分|ぶん}かで {考|かんが}えるよ。",
          visual: { kind: "emoji", value: "⬛ = 1cm²", caption: "ますの {数|かず}" },
        },
      ],
    },
    test: {
      unitId: U.areaFigures,
      questionCount: 5,
      questions: [
        {
          id: `${U.areaFigures}.q-1`,
          unitId: U.areaFigures,
          prompt: "{底|そこ} 4cm、{高|たか}さ 3cm の {三角形|さんかくけい}の {面積|めんせき}は {何|なん} cm²?",
          explanation: "{底|そこ} × {高|たか}さ ÷ 2 = 4 × 3 ÷ 2 = 6 cm² だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.areaFigures}.q-2`,
          unitId: U.areaFigures,
          prompt: "{底|そこ} 8cm、{高|たか}さ 5cm の {平行四辺形|へいこうしへんけい}の {面積|めんせき}は {何|なん} cm²?",
          explanation: "{底|そこ} × {高|たか}さ = 8 × 5 = 40 cm² だよ。",
          format: "number-input",
          answer: 40,
        },
        {
          id: `${U.areaFigures}.q-3`,
          unitId: U.areaFigures,
          prompt: "{縦|たて} 6cm、{横|よこ} 4cm の {長四角|ながしかく}の {面積|めんせき}は {何|なん} cm²?",
          explanation: "{縦|たて} × {横|よこ} = 6 × 4 = 24 cm² だよ。",
          format: "number-input",
          answer: 24,
        },
        {
          id: `${U.areaFigures}.q-4`,
          unitId: U.areaFigures,
          prompt: "{底|そこ} 10cm、{高|たか}さ 4cm の {三角形|さんかくけい}の {面積|めんせき}は {何|なん} cm²?",
          explanation: "{底|そこ} × {高|たか}さ ÷ 2 = 10 × 4 ÷ 2 = 20 cm² だよ。",
          format: "number-input",
          answer: 20,
        },
        {
          id: `${U.areaFigures}.q-5`,
          unitId: U.areaFigures,
          prompt: "1{辺|ぺん} 7cm の {正方形|せいほうけい}の {面積|めんせき}は {何|なん} cm²?",
          explanation: "{正方形|せいほうけい}は {縦|たて} × {横|よこ}。7 × 7 = 49 cm² だよ。",
          format: "number-input",
          answer: 49,
        },
      ],
    },
  },

  // ── 6. 正多角形と円 ──
  [U.regularPolygonCircle]: {
    unitId: U.regularPolygonCircle,
    learn: {
      unitId: U.regularPolygonCircle,
      steps: [
        {
          heading: "{正多角形|せいたかくけい}って {何|なに}?",
          body: "{辺|へん}の {長|なが}さが {全部|ぜんぶ} {同|おな}じで、{角|かど}の {大|おお}きさも {全部|ぜんぶ} {同|おな}じ {多角形|たかくけい}を「{正多角形|せいたかくけい}」というよ。{正五角形|せいごかくけい}は {辺|へん}が 5つ だね。",
          visual: { kind: "emoji", value: "⬡ {正六角形|せいろっかくけい}", caption: "{辺|へん}も {角|かど}も {同|おな}じ" },
        },
        {
          heading: "{円周|えんしゅう}の {求|もと}めかた",
          body: "{円|えん}の {周|まわ}りの {長|なが}さ（{円周|えんしゅう}）は「{直径|ちょっけい} × 3.14」で {求|もと}めるよ。3.14 を {円周率|えんしゅうりつ} というよ。",
          visual: { kind: "emoji", value: "{円周|えんしゅう} = {直径|ちょっけい} × 3.14", caption: "{円周率|えんしゅうりつ} 3.14" },
        },
        {
          heading: "{半径|はんけい}から{直径|ちょっけい}",
          body: "{直径|ちょっけい}は {半径|はんけい}の 2{倍|ばい}。{半径|はんけい} 5cm なら {直径|ちょっけい}は 10cm。それから × 3.14 するよ。",
          visual: { kind: "emoji", value: "{直径|ちょっけい} = {半径|はんけい} × 2", caption: "まず {直径|ちょっけい}に" },
        },
      ],
    },
    test: {
      unitId: U.regularPolygonCircle,
      questionCount: 5,
      questions: [
        {
          id: `${U.regularPolygonCircle}.q-1`,
          unitId: U.regularPolygonCircle,
          prompt: "{直径|ちょっけい} 10cm の {円|えん}の {円周|えんしゅう}は {何|なん} cm?（{円周率|えんしゅうりつ} 3.14）",
          explanation: "{直径|ちょっけい} × 3.14 = 10 × 3.14 = 31.4 cm だよ。",
          format: "number-input",
          answer: 31.4,
        },
        {
          id: `${U.regularPolygonCircle}.q-2`,
          unitId: U.regularPolygonCircle,
          prompt: "{半径|はんけい} 4cm の {円|えん}の {円周|えんしゅう}は {何|なん} cm?（{円周率|えんしゅうりつ} 3.14）",
          explanation: "{直径|ちょっけい}は 4 × 2 = 8cm。8 × 3.14 = 25.12 cm だよ。",
          format: "number-input",
          answer: 25.12,
        },
        {
          id: `${U.regularPolygonCircle}.q-3`,
          unitId: U.regularPolygonCircle,
          prompt: "{正五角形|せいごかくけい}の {辺|へん}の {数|かず}は いくつ?",
          explanation: "{正五角形|せいごかくけい}は {辺|へん}が 5つ ある {多角形|たかくけい}だよ。",
          format: "number-input",
          answer: 5,
        },
        {
          id: `${U.regularPolygonCircle}.q-4`,
          unitId: U.regularPolygonCircle,
          prompt: "{正六角形|せいろっかくけい}の {辺|へん}の {数|かず}は いくつ?",
          explanation: "{正六角形|せいろっかくけい}は {辺|へん}が 6つ ある {多角形|たかくけい}だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.regularPolygonCircle}.q-5`,
          unitId: U.regularPolygonCircle,
          prompt: "{円周|えんしゅう}が 18.84cm の {円|えん}の {直径|ちょっけい}は {何|なん} cm?（{円周率|えんしゅうりつ} 3.14）",
          explanation: "{円周|えんしゅう} ÷ 3.14 = 18.84 ÷ 3.14 = 6 cm だよ。",
          format: "number-input",
          answer: 6,
        },
      ],
    },
  },

  // ── 7. 体積 ──
  [U.volume]: {
    unitId: U.volume,
    learn: {
      unitId: U.volume,
      steps: [
        {
          heading: "{体積|たいせき}って {何|なに}?",
          body: "{物|もの}が {場所|ばしょ}を {取|と}る {大|おお}きさ（かさ）を「{体積|たいせき}」というよ。{単位|たんい}は cm³（{立方|りっぽう}センチメートル）だよ。",
          visual: { kind: "emoji", value: "🧊 = 1cm³", caption: "1cmの さいころ" },
        },
        {
          heading: "{直方体|ちょくほうたい}の {体積|たいせき}",
          body: "{直方体|ちょくほうたい}の {体積|たいせき}は「{縦|たて} × {横|よこ} × {高|たか}さ」で {求|もと}めるよ。1cmの さいころが {何|なん}こ {分|ぶん}かと {同|おな}じだね。",
          visual: { kind: "emoji", value: "{縦|たて} × {横|よこ} × {高|たか}さ", caption: "さいころの {数|かず}" },
        },
        {
          heading: "1L は 1000cm³",
          body: "1{辺|ぺん} 10cm の {立方体|りっぽうたい}の {体積|たいせき}は 1000cm³。これが ちょうど 1L（リットル）だよ。",
          visual: { kind: "emoji", value: "10 × 10 × 10 = 1000cm³ = 1L", caption: "かさの {単位|たんい}" },
        },
      ],
    },
    test: {
      unitId: U.volume,
      questionCount: 5,
      questions: [
        {
          id: `${U.volume}.q-1`,
          unitId: U.volume,
          prompt: "{縦|たて} 2cm、{横|よこ} 3cm、{高|たか}さ 4cm の {直方体|ちょくほうたい}の {体積|たいせき}は {何|なん} cm³?",
          explanation: "{縦|たて} × {横|よこ} × {高|たか}さ = 2 × 3 × 4 = 24 cm³ だよ。",
          format: "number-input",
          answer: 24,
        },
        {
          id: `${U.volume}.q-2`,
          unitId: U.volume,
          prompt: "1{辺|ぺん} 5cm の {立方体|りっぽうたい}の {体積|たいせき}は {何|なん} cm³?",
          explanation: "{立方体|りっぽうたい}は 5 × 5 × 5 = 125 cm³ だよ。",
          format: "number-input",
          answer: 125,
        },
        {
          id: `${U.volume}.q-3`,
          unitId: U.volume,
          prompt: "{縦|たて} 10cm、{横|よこ} 10cm、{高|たか}さ 10cm の {箱|はこ}の {体積|たいせき}は {何|なん} cm³?",
          explanation: "10 × 10 × 10 = 1000 cm³。これは 1L と{同|おな}じだよ。",
          format: "number-input",
          answer: 1000,
        },
        {
          id: `${U.volume}.q-4`,
          unitId: U.volume,
          prompt: "{縦|たて} 4cm、{横|よこ} 5cm、{高|たか}さ 2cm の {直方体|ちょくほうたい}の {体積|たいせき}は {何|なん} cm³?",
          explanation: "4 × 5 × 2 = 40 cm³ だよ。",
          format: "number-input",
          answer: 40,
        },
        {
          id: `${U.volume}.q-5`,
          unitId: U.volume,
          prompt: "1L は {何|なん} cm³?",
          explanation: "1L は 1{辺|ぺん} 10cm の {立方体|りっぽうたい}{分|ぶん}。10 × 10 × 10 = 1000 cm³ だよ。",
          format: "number-input",
          answer: 1000,
        },
      ],
    },
  },

  // ── 8. 単位量あたりの大きさ ──
  [U.perUnitQuantity]: {
    unitId: U.perUnitQuantity,
    learn: {
      unitId: U.perUnitQuantity,
      steps: [
        {
          heading: "1こあたり・1{人|にん}あたり",
          body: "「1こあたり いくら」「1{人|にん}あたり {何|なん}こ」のように、{一|ひと}つ {分|ぶん}に {揃|そろ}えると {比|くら}べやすく なるよ。",
          visual: { kind: "emoji", value: "240{円|えん} ÷ 3こ = 80{円|えん}", caption: "1こ {分|ぶん}の {値段|ねだん}" },
        },
        {
          heading: "{割|わ}り{算|ざん}で {揃|そろ}える",
          body: "{全体|ぜんたい}の {量|りょう}を {個数|こすう}や {人数|にんずう}で {割|わ}ると、1つ {分|ぶん}の {大|おお}きさが {求|もと}まるよ。",
          visual: { kind: "emoji", value: "{全体|ぜんたい} ÷ {個数|こすう} = 1こあたり", caption: "{割|わ}って {揃|そろ}える" },
        },
        {
          heading: "{込|こ}み{具合|ぐあい}の {比|くら}べ",
          body: "{広|ひろ}さあたりの {人数|にんずう}など、{単位量|たんいりょう}あたりで {比|くら}べると どちらが {混|こ}んでいるか {分|わ}かるよ。",
          visual: { kind: "emoji", value: "👥 / m²", caption: "1m²あたりの {人数|にんずう}" },
        },
      ],
    },
    test: {
      unitId: U.perUnitQuantity,
      questionCount: 5,
      questions: [
        {
          id: `${U.perUnitQuantity}.q-1`,
          unitId: U.perUnitQuantity,
          prompt: "3こ で 240{円|えん} の お{菓子|かし}。1こ {分|ぶん}の {値段|ねだん}は {何|なん}{円|えん}?",
          explanation: "240 ÷ 3 = 80。1こ あたり 80{円|えん} だよ。",
          format: "number-input",
          answer: 80,
        },
        {
          id: `${U.perUnitQuantity}.q-2`,
          unitId: U.perUnitQuantity,
          prompt: "{車|くるま}が 4L で 60km {走|はし}る。1L で {何|なん} km {走|はし}る?",
          explanation: "60 ÷ 4 = 15。1L あたり 15km だよ。",
          format: "number-input",
          answer: 15,
        },
        {
          id: `${U.perUnitQuantity}.q-3`,
          unitId: U.perUnitQuantity,
          prompt: "5{枚|まい} で 400{円|えん} の シール。1{枚|まい} {分|ぶん}は {何|なん}{円|えん}?",
          explanation: "400 ÷ 5 = 80。1{枚|まい} あたり 80{円|えん} だよ。",
          format: "number-input",
          answer: 80,
        },
        {
          id: `${U.perUnitQuantity}.q-4`,
          unitId: U.perUnitQuantity,
          prompt: "{飴|あめ} 30こ を 6{人|にん} で {同|おな}じ {数|かず}ずつ {分|わ}けると、1{人|にん} {何|なん}こ?",
          explanation: "30 ÷ 6 = 5。1{人|にん} あたり 5こ だよ。",
          format: "number-input",
          answer: 5,
        },
        {
          id: `${U.perUnitQuantity}.q-5`,
          unitId: U.perUnitQuantity,
          prompt: "2m で 300g の {針金|はりがね}。1m {分|ぶん}の {重|おも}さは {何|なん} g?",
          explanation: "300 ÷ 2 = 150。1m あたり 150g だよ。",
          format: "number-input",
          answer: 150,
        },
      ],
    },
  },

  // ── 9. 割合と百分率 ──
  [U.ratioPercentage]: {
    unitId: U.ratioPercentage,
    learn: {
      unitId: U.ratioPercentage,
      steps: [
        {
          heading: "{割合|わりあい}って {何|なに}?",
          body: "{比|くら}べる {量|りょう}が {基|もと}に する {量|りょう}の {何|なん}{倍|ばい}に あたるかを「{割合|わりあい}」というよ。{割合|わりあい} = {比|くら}べる{量|りょう} ÷ {基|もと}にする{量|りょう}。",
          visual: { kind: "emoji", value: "{割合|わりあい} = {比|くら}べる ÷ {基|もと}", caption: "{何|なん}{倍|ばい}{分|ぶん}?" },
        },
        {
          heading: "{百分率|ひゃくぶんりつ}（%）",
          body: "{割合|わりあい}を 100{倍|ばい}して {表|あらわ}したのが {百分率|ひゃくぶんりつ}（%）。0.2 は 20% だよ。",
          visual: { kind: "emoji", value: "0.2 → 20%", caption: "100{倍|ばい}して %" },
        },
        {
          heading: "{割合|わりあい}から {量|りょう}を {求|もと}める",
          body: "{基|もと}にする {量|りょう} × {割合|わりあい} で {比|くら}べる {量|りょう}が {求|もと}まるよ。500{円|えん} の 20% は 500 × 0.2 = 100{円|えん}。",
          visual: { kind: "emoji", value: "500 × 0.2 = 100", caption: "{基|もと} × {割合|わりあい}" },
        },
      ],
    },
    test: {
      unitId: U.ratioPercentage,
      questionCount: 5,
      questions: [
        {
          id: `${U.ratioPercentage}.q-1`,
          unitId: U.ratioPercentage,
          prompt: "20{人|にん} の 30% は {何|なん}{人|にん}?",
          explanation: "20 × 0.3 = 6。だから 6{人|にん} だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.ratioPercentage}.q-2`,
          unitId: U.ratioPercentage,
          prompt: "500{円|えん} の 20% は {何|なん}{円|えん}?",
          explanation: "500 × 0.2 = 100。だから 100{円|えん} だよ。",
          format: "number-input",
          answer: 100,
        },
        {
          id: `${U.ratioPercentage}.q-3`,
          unitId: U.ratioPercentage,
          prompt: "50こ の うち 10こ は {全体|ぜんたい}の {何|なん} %?",
          explanation: "10 ÷ 50 = 0.2。100{倍|ばい}して 20% だよ。",
          format: "number-input",
          answer: 20,
        },
        {
          id: `${U.ratioPercentage}.q-4`,
          unitId: U.ratioPercentage,
          prompt: "{割合|わりあい} 0.25 を {百分率|ひゃくぶんりつ}（%）で {表|あらわ}すと?",
          explanation: "0.25 を 100{倍|ばい}すると 25。だから 25% だよ。",
          format: "number-input",
          answer: 25,
        },
        {
          id: `${U.ratioPercentage}.q-5`,
          unitId: U.ratioPercentage,
          prompt: "800{円|えん} の {品物|しなもの}を 10%{引|び}き で {買|か}うと いくら?",
          explanation: "10%は 800 × 0.1 = 80{円|えん}。800 − 80 = 720{円|えん} だよ。",
          format: "number-input",
          answer: 720,
        },
      ],
    },
  },

  // ── 10. 平均 ──
  [U.average]: {
    unitId: U.average,
    learn: {
      unitId: U.average,
      steps: [
        {
          heading: "{平均|へいきん}って {何|なに}?",
          body: "いくつかの {数|かず}を {均|なら}して、{同|おな}じ {大|おお}きさに したものが「{平均|へいきん}」だよ。でこぼこを {平|たい}らに する {考|かんが}えかただね。",
          visual: { kind: "emoji", value: "▮▯▮▯ → ▮▮▮▮", caption: "{均|なら}して {揃|そろ}える" },
        },
        {
          heading: "{平均|へいきん}の {求|もと}めかた",
          body: "{平均|へいきん} = {全部|ぜんぶ}の {合計|ごうけい} ÷ {個数|こすう}。4, 6, 8 なら (4+6+8) ÷ 3 = 6 だよ。",
          visual: { kind: "emoji", value: "(4+6+8) ÷ 3 = 6", caption: "{合計|ごうけい} ÷ {個数|こすう}" },
        },
        {
          heading: "0も {数|かぞ}える",
          body: "「0こ」の {日|ひ}も {個数|こすう}に {含|ふく}めて {割|わ}るよ。{忘|わす}れると {平均|へいきん}が {大|おお}きく なりすぎるよ。",
          visual: { kind: "emoji", value: "5,5,10,0 → ÷4", caption: "0も 1こと {数|かぞ}える" },
        },
      ],
    },
    test: {
      unitId: U.average,
      questionCount: 5,
      questions: [
        {
          id: `${U.average}.q-1`,
          unitId: U.average,
          prompt: "4, 6, 8 の {平均|へいきん}は いくつ?",
          explanation: "(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6 だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.average}.q-2`,
          unitId: U.average,
          prompt: "10, 20, 30, 40 の {平均|へいきん}は いくつ?",
          explanation: "(10 + 20 + 30 + 40) ÷ 4 = 100 ÷ 4 = 25 だよ。",
          format: "number-input",
          answer: 25,
        },
        {
          id: `${U.average}.q-3`,
          unitId: U.average,
          prompt: "テストの {点数|てんすう} 80, 90, 70 の {平均|へいきん}は {何|なん}{点|てん}?",
          explanation: "(80 + 90 + 70) ÷ 3 = 240 ÷ 3 = 80{点|てん} だよ。",
          format: "number-input",
          answer: 80,
        },
        {
          id: `${U.average}.q-4`,
          unitId: U.average,
          prompt: "3{日|にち}で {集|あつ}めた {数|かず} 6こ, 4こ, 8こ。1{日|にち} {平均|へいきん} {何|なん}こ?",
          explanation: "(6 + 4 + 8) ÷ 3 = 18 ÷ 3 = 6こ だよ。",
          format: "number-input",
          answer: 6,
        },
        {
          id: `${U.average}.q-5`,
          unitId: U.average,
          prompt: "5, 5, 10, 0 の {平均|へいきん}は いくつ?",
          explanation: "0も {個数|こすう}に {入|い}れて (5 + 5 + 10 + 0) ÷ 4 = 20 ÷ 4 = 5 だよ。",
          format: "number-input",
          answer: 5,
        },
      ],
    },
  },

  // ── 11. 帯グラフと円グラフ ──
  [U.bandPieGraph]: {
    unitId: U.bandPieGraph,
    learn: {
      unitId: U.bandPieGraph,
      steps: [
        {
          heading: "{割合|わりあい}を {表|あらわ}す グラフ",
          body: "{帯|おび}グラフや {円|えん}グラフは、{全体|ぜんたい}を 100% とみて、それぞれが どれだけの {割合|わりあい}かを {絵|え}で {表|あらわ}すよ。",
          visual: { kind: "emoji", value: "🟦🟥🟨🟩", caption: "{全体|ぜんたい} = 100%" },
        },
        {
          heading: "{帯|おび}グラフ",
          body: "{長|なが}い {帯|おび}を {割合|わりあい}で {区切|くぎ}るよ。{普通|ふつう} {割合|わりあい}の {大|おお}きい ものから {左|ひだり}に {並|なら}べるよ。",
          visual: { kind: "emoji", value: "🟦🟦🟦🟥🟥🟨", caption: "{大|おお}きい {順|じゅん}に {左|ひだり}から" },
        },
        {
          heading: "{円|えん}グラフ",
          body: "{丸|まる}を {割合|わりあい}で {区切|くぎ}るよ。{全体|ぜんたい}は 360{度|ど}。25% なら 360 × 0.25 = 90{度|ど} だよ。",
          visual: { kind: "emoji", value: "◔ 25% = 90{度|ど}", caption: "{全体|ぜんたい} 360{度|ど}" },
        },
      ],
    },
    test: {
      unitId: U.bandPieGraph,
      questionCount: 5,
      questions: [
        {
          id: `${U.bandPieGraph}.q-1`,
          unitId: U.bandPieGraph,
          prompt: "{円|えん}グラフ {全体|ぜんたい}は {何|なん} %?",
          explanation: "{円|えん}グラフは {全体|ぜんたい}を 100% とみて {割合|わりあい}を {表|あらわ}すよ。",
          format: "choice",
          choices: ["100%", "50%", "360%", "10%"],
          answer: "100%",
        },
        {
          id: `${U.bandPieGraph}.q-2`,
          unitId: U.bandPieGraph,
          prompt: "{帯|おび}グラフでは {普通|ふつう} {割合|わりあい}の {大|おお}きい ものを どこから {並|なら}べる?",
          explanation: "{帯|おび}グラフは {割合|わりあい}の {大|おお}きい ものから {左|ひだり}に {並|なら}べるのが {基本|きほん}だよ。",
          format: "choice",
          choices: ["{左|ひだり}から", "{右|みぎ}から", "{真|ま}ん{中|なか}から", "{順番|じゅんばん}なし"],
          answer: "{左|ひだり}から",
        },
        {
          id: `${U.bandPieGraph}.q-3`,
          unitId: U.bandPieGraph,
          prompt: "{円|えん}グラフで 25% は {何|なん}{度|ど} の {扇形|おうぎがた}?",
          explanation: "{全体|ぜんたい} 360{度|ど} の 25%。360 × 0.25 = 90{度|ど} だよ。",
          format: "choice",
          choices: ["90{度|ど}", "45{度|ど}", "180{度|ど}", "100{度|ど}"],
          answer: "90{度|ど}",
        },
        {
          id: `${U.bandPieGraph}.q-4`,
          unitId: U.bandPieGraph,
          prompt: "{全体|ぜんたい} 200{人|にん} で「{好|す}き」が 50% のとき、{何|なん}{人|にん}?",
          explanation: "200 × 0.5 = 100。だから 100{人|にん} だよ。",
          format: "choice",
          choices: ["100{人|にん}", "50{人|にん}", "150{人|にん}", "200{人|にん}"],
          answer: "100{人|にん}",
        },
        {
          id: `${U.bandPieGraph}.q-5`,
          unitId: U.bandPieGraph,
          prompt: "{全体|ぜんたい}に {対|たい}する {割合|わりあい}を {見|み}るのに むいて いる グラフは?",
          explanation: "{円|えん}グラフ（や {帯|おび}グラフ）は {全体|ぜんたい}に {対|たい}する {割合|わりあい}を {見|み}るのに むいているよ。",
          format: "choice",
          choices: ["{円|えん}グラフ", "{棒|ぼう}グラフ", "{折|お}れ{線|せん}グラフ", "{表|ひょう}"],
          answer: "{円|えん}グラフ",
        },
      ],
    },
  },
};
