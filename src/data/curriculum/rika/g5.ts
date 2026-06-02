// ══════════════════════════════════════════
// カリキュラム: 理科（りか）小5
// 基準テンプレ src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
//
// 学習指導要領（小5 理科）の内容・4領域（エネルギー/粒子/生命/地球）:
//  ・生命: 植物の発芽と成長 / 花のつくりと実や種子 / 動物の誕生（メダカ）
//  ・地球: 天気の変化と雲 / 流れる水のはたらきと土地
//  ・粒子: もののとけ方
//  ・エネルギー: ふりこのきまり / 電流がうみ出す力（電磁石）
//
// 申し送り（Manager宛）:
//  1. SubjectId（src/types/drill.ts）には既に "rika" が含まれており、id:"rika" は型を通る。
//     →「rika 未対応のための局所吸収」は不要だった（キャスト等は入れていない）。
//  2. rika/g3.ts が leadsTo で本ファイルの単元 id を前方参照している:
//       "rika.g5.plant-fruit" / "rika.g5.life-continuity"
//     → この2 id は g3 の期待に合わせて厳守して定義済み（集約時に g3 の参照が解決する）。
//  3. rikaSubject / rikaG5Domains は g3 と同一の構造値（ルビ無し）で据え置き。
//     共有される構造オブジェクトのため g3 と一致させた（中央集約での dedup 整合）。
//     表示テキスト（title / realWorldUse / learn / test）は全てルビ記法 {漢字|よみ} で執筆。
//  4. 国語/理科は generators を持たないため、テストは固定 questions[]（全問 explanation 必須）。
// 依存(prerequisites/leadsTo)は現存の g3 と g5 内で解決（g4/g6 への前方参照は避け、終端は []）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// ── 教科（g3 と同一。構造オブジェクトのため非ルビ据え置き）──

export const rikaSubject: Subject = {
  id: "rika",
  name: "りか",
  formalName: "理科",
  emoji: "🔬",
  theme: "emerald",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域（理科4領域。g3 と同一 id・同一値で据え置き）──

export const rikaG5Domains: Domain[] = [
  {
    id: "rika.energy",
    subjectId: "rika",
    name: "エネルギー",
    formalName: "エネルギー",
  },
  {
    id: "rika.particle",
    subjectId: "rika",
    name: "りゅうし",
    formalName: "粒子",
  },
  {
    id: "rika.life",
    subjectId: "rika",
    name: "せいめい",
    formalName: "生命",
  },
  {
    id: "rika.earth",
    subjectId: "rika",
    name: "ちきゅう",
    formalName: "地球",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。g3/g5 内で解決）:
//
//   [g3.plant-growth] ─▶ plant-fruit ─▶ flower-seed
//   [g3.insect-body]  ─▶ life-continuity
//   [g3.sun-ground]   ─▶ weather-change ─▶ running-water
//   [g3.matter-weight]─▶ dissolving
//   [g3.wind-rubber]  ─▶ pendulum
//   [g3.electric-circuit, g3.magnet] ─▶ electromagnet
//
const U = {
  plantFruit: "rika.g5.plant-fruit",
  flowerSeed: "rika.g5.flower-seed",
  lifeContinuity: "rika.g5.life-continuity",
  weatherChange: "rika.g5.weather-change",
  runningWater: "rika.g5.running-water",
  dissolving: "rika.g5.dissolving",
  pendulum: "rika.g5.pendulum",
  electromagnet: "rika.g5.electromagnet",
} as const;

// 既存（g3）単元への参照（現存・解決可能）
const G3 = {
  plantGrowth: "rika.g3.plant-growth",
  insectBody: "rika.g3.insect-body",
  sunGround: "rika.g3.sun-ground",
  matterWeight: "rika.g3.matter-weight",
  windRubber: "rika.g3.wind-rubber",
  electricCircuit: "rika.g3.electric-circuit",
  magnet: "rika.g3.magnet",
} as const;

export const rikaG5Units: Unit[] = [
  // ── 生命 ──
  {
    id: U.plantFruit,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.life",
    title: "{植物|しょくぶつ}の{発芽|はつが}と{成長|せいちょう}",
    order: 1,
    realWorldUse: "{野菜|やさい}や{花|はな}を{育|そだ}てるとき、{種|たね}が{芽|め}を{出|だ}す{条件|じょうけん}や、よく{育|そだ}つ{育|そだ}て{方|かた}がわかるよ。",
    leadsTo: [U.flowerSeed],
    prerequisites: [G3.plantGrowth],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.flowerSeed,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.life",
    title: "{花|はな}のつくりと{実|み}や{種子|しゅし}",
    order: 2,
    realWorldUse: "{花|はな}が{実|み}になる しくみがわかると、{果物|くだもの}や{野菜|やさい}が どうやって できるか{理解|りかい}できるよ。",
    leadsTo: [],
    prerequisites: [U.plantFruit],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.lifeContinuity,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.life",
    title: "メダカの{誕生|たんじょう}（{動物|どうぶつ}の{発生|はっせい}）",
    order: 3,
    realWorldUse: "メダカが たまごから うまれて{育|そだ}つようすから、{生|い}きものの{命|いのち}のつながりがわかるよ。",
    leadsTo: [],
    prerequisites: [G3.insectBody],
    hasLearn: true,
    hasTest: true,
  },

  // ── 地球 ──
  {
    id: U.weatherChange,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.earth",
    title: "{天気|てんき}の{変化|へんか}と{雲|くも}",
    order: 4,
    realWorldUse: "{雲|くも}のようすや{天気|てんき}のうつりかわりがわかると、あしたの{天気|てんき}をよそうしたり、{台風|たいふう}にそなえたりできるよ。",
    leadsTo: [U.runningWater],
    prerequisites: [G3.sunGround],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.runningWater,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.earth",
    title: "{流|なが}れる{水|みず}のはたらきと{土地|とち}",
    order: 5,
    realWorldUse: "{流|なが}れる{水|みず}が{土地|とち}をけずったり はこんだりするはたらきを{知|し}ると、{洪水|こうずい}のきけんや{堤防|ていぼう}の{役割|やくわり}がわかるよ。",
    leadsTo: [],
    prerequisites: [U.weatherChange],
    hasLearn: true,
    hasTest: true,
  },

  // ── 粒子 ──
  {
    id: U.dissolving,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.particle",
    title: "もののとけ{方|かた}",
    order: 6,
    realWorldUse: "{食塩|しょくえん}やさとうが{水|みず}にとけるようすを{知|し}ると、{料理|りょうり}や のみものづくりに{役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [G3.matterWeight],
    hasLearn: true,
    hasTest: true,
  },

  // ── エネルギー ──
  {
    id: U.pendulum,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.energy",
    title: "ふりこのきまり",
    order: 7,
    realWorldUse: "ふりこのきまりを{知|し}ると、ふりこ{時計|どけい}やメトロノームのしくみがわかるよ。",
    leadsTo: [],
    prerequisites: [G3.windRubber],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.electromagnet,
    subjectId: "rika",
    grade: 5,
    domainId: "rika.energy",
    title: "{電流|でんりゅう}がうみ{出|だ}す{力|ちから}（{電磁石|でんじしゃく}）",
    order: 8,
    realWorldUse: "{電磁石|でんじしゃく}のしくみを{知|し}ると、モーターやリニアモーターカー、クレーンなど{身|み}のまわりのきかいがわかるよ。",
    leadsTo: [],
    prerequisites: [G3.electricCircuit, G3.magnet],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// 全表示テキストはルビ記法 {漢字|よみ}。テストは固定 questions[]（全問 explanation 必須・4択）。
// ══════════════════════════════════════════

// ── 植物の発芽と成長 ──
const plantFruitQuestions: ChoiceQuestion[] = [
  {
    id: `${U.plantFruit}.q1`,
    unitId: U.plantFruit,
    prompt: "{種子|しゅし}が{発芽|はつが}するのに{必要|ひつよう}ないものはどれ？",
    explanation: "{発芽|はつが}に{必要|ひつよう}なのは{水|みず}・{空気|くうき}・てきした{温度|おんど}の3つ。{日光|にっこう}や{肥料|ひりょう}はなくても{芽|め}が{出|で}るよ。",
    format: "choice",
    choices: ["{日光|にっこう}", "{水|みず}", "{空気|くうき}", "てきした{温度|おんど}"],
    answer: "{日光|にっこう}",
  },
  {
    id: `${U.plantFruit}.q2`,
    unitId: U.plantFruit,
    prompt: "でんぷんがあるか{調|しら}べる{薬|くすり}（{液|えき}）はどれ？",
    explanation: "ヨウ{素|そ}{液|えき}は でんぷんにつけると{青|あお}むらさき{色|いろ}に{変|か}わるよ。",
    format: "choice",
    choices: ["ヨウ{素|そ}{液|えき}", "{食塩水|しょくえんすい}", "{石灰水|せっかいすい}", "さとう{水|みず}"],
    answer: "ヨウ{素|そ}{液|えき}",
  },
  {
    id: `${U.plantFruit}.q3`,
    unitId: U.plantFruit,
    prompt: "{植物|しょくぶつ}がよく{成長|せいちょう}するために{役立|やくだ}つものはどれ？",
    explanation: "{発芽|はつが}のあとの{成長|せいちょう}には、{日光|にっこう}と{肥料|ひりょう}（{養分|ようぶん}）が{役立|やくだ}つよ。",
    format: "choice",
    choices: ["{日光|にっこう}と{肥料|ひりょう}", "くらやみ", "{冷|つめ}たい{氷|こおり}", "{大|おお}きな{音|おと}"],
    answer: "{日光|にっこう}と{肥料|ひりょう}",
  },
  {
    id: `${U.plantFruit}.q4`,
    unitId: U.plantFruit,
    prompt: "{芽生|めば}えた はじめの{養分|ようぶん}は どこにあった？",
    explanation: "はじめは{種子|しゅし}の{中|なか}のでんぷん（{養分|ようぶん}）をつかって{育|そだ}つよ。",
    format: "choice",
    choices: ["{種子|しゅし}の{中|なか}", "{土|つち}の{中|なか}だけ", "{空気|くうき}の{中|なか}", "{雲|くも}の{中|なか}"],
    answer: "{種子|しゅし}の{中|なか}",
  },
  {
    id: `${U.plantFruit}.q5`,
    unitId: U.plantFruit,
    prompt: "インゲンマメで{発芽|はつが}の{養分|ようぶん}をたくわえている{部分|ぶぶん}はどれ？",
    explanation: "インゲンマメは{子葉|しよう}に{養分|ようぶん}をたくわえ、{発芽|はつが}につかうよ。",
    format: "choice",
    choices: ["{子葉|しよう}", "{根|ね}", "くき", "{花|はな}"],
    answer: "{子葉|しよう}",
  },
];

// ── 花のつくりと実や種子 ──
const flowerSeedQuestions: ChoiceQuestion[] = [
  {
    id: `${U.flowerSeed}.q1`,
    unitId: U.flowerSeed,
    prompt: "{花粉|かふん}をつくるのは{花|はな}のどの{部分|ぶぶん}？",
    explanation: "おしべの{先|さき}（やく）で{花粉|かふん}がつくられるよ。",
    format: "choice",
    choices: ["おしべ", "めしべ", "{花|はな}びら", "がく"],
    answer: "おしべ",
  },
  {
    id: `${U.flowerSeed}.q2`,
    unitId: U.flowerSeed,
    prompt: "やがて{実|み}になるのは どの{部分|ぶぶん}？",
    explanation: "めしべのもと（{子房|しぼう}）が{育|そだ}って{実|み}になるよ。",
    format: "choice",
    choices: ["めしべのもと", "おしべ", "{花|はな}びら", "がく"],
    answer: "めしべのもと",
  },
  {
    id: `${U.flowerSeed}.q3`,
    unitId: U.flowerSeed,
    prompt: "おしべの{花粉|かふん}がめしべにつくことをなんという？",
    explanation: "{花粉|かふん}がめしべにつく「{受粉|じゅふん}」がおきると、{実|み}ができはじめるよ。",
    format: "choice",
    choices: ["{受粉|じゅふん}", "{発芽|はつが}", "{蒸発|じょうはつ}", "{消化|しょうか}"],
    answer: "{受粉|じゅふん}",
  },
  {
    id: `${U.flowerSeed}.q4`,
    unitId: U.flowerSeed,
    prompt: "ヘチマのように おばなとめばながわかれているとき、{実|み}ができるのはどっち？",
    explanation: "めしべのある めばなが{受粉|じゅふん}して{実|み}になるよ。おばなには めしべがないよ。",
    format: "choice",
    choices: ["めばな", "おばな", "どちらも", "どちらもできない"],
    answer: "めばな",
  },
  {
    id: `${U.flowerSeed}.q5`,
    unitId: U.flowerSeed,
    prompt: "{受粉|じゅふん}を{助|たす}けてくれる いきものはどれ？",
    explanation: "ハチやチョウが{花|はな}から{花|はな}へ{花粉|かふん}をはこんで{受粉|じゅふん}を{助|たす}けるよ。",
    format: "choice",
    choices: ["ミツバチ", "メダカ", "ミミズ", "カエル"],
    answer: "ミツバチ",
  },
];

// ── メダカの誕生 ──
const lifeContinuityQuestions: ChoiceQuestion[] = [
  {
    id: `${U.lifeContinuity}.q1`,
    unitId: U.lifeContinuity,
    prompt: "メダカのおすを{見分|みわ}けるところはどれ？",
    explanation: "おすはせびれにきれこみがあり、めすにはないよ。ひれのかたちで{見分|みわ}けるよ。",
    format: "choice",
    choices: ["せびれ・しりびれのかたち", "{色|いろ}のなまえ", "{大|おお}きさだけ", "すむ{場所|ばしょ}"],
    answer: "せびれ・しりびれのかたち",
  },
  {
    id: `${U.lifeContinuity}.q2`,
    unitId: U.lifeContinuity,
    prompt: "めすのたまごとおすの{精子|せいし}が{結|むす}びつくことをなんという？",
    explanation: "たまごと{精子|せいし}が{結|むす}びつくのが「{受精|じゅせい}」。{受精|じゅせい}したたまごが{育|そだ}っていくよ。",
    format: "choice",
    choices: ["{受精|じゅせい}", "{受粉|じゅふん}", "{発芽|はつが}", "{消化|しょうか}"],
    answer: "{受精|じゅせい}",
  },
  {
    id: `${U.lifeContinuity}.q3`,
    unitId: U.lifeContinuity,
    prompt: "{小|ちい}さなメダカのたまごのようすを かんさつする{道具|どうぐ}はどれ？",
    explanation: "{小|ちい}さなたまごのようすは けんびきょうで{大|おお}きくして{見|み}るよ。",
    format: "choice",
    choices: ["けんびきょう", "とけい", "はかり", "じしゃく"],
    answer: "けんびきょう",
  },
  {
    id: `${U.lifeContinuity}.q4`,
    unitId: U.lifeContinuity,
    prompt: "うまれたばかりの{子|こ}メダカは、しばらく{何|なに}で{育|そだ}つ？",
    explanation: "うまれてすぐは、はらのふくろにある{養分|ようぶん}をつかって{育|そだ}つよ。",
    format: "choice",
    choices: ["はらのふくろの{養分|ようぶん}", "すぐにえさ", "{日光|にっこう}だけ", "{空気|くうき}だけ"],
    answer: "はらのふくろの{養分|ようぶん}",
  },
  {
    id: `${U.lifeContinuity}.q5`,
    unitId: U.lifeContinuity,
    prompt: "メダカのたまごがよく{育|そだ}つようにするには？",
    explanation: "{明|あか}るくきれいな{水|みず}でかうと、たまごがよく{育|そだ}つよ。{水|みず}はときどきかえるよ。",
    format: "choice",
    choices: ["{明|あか}るい{所|ところ}で{水|みず}をきれいにたもつ", "くらい{所|ところ}にずっとおく", "{水|みず}をまったくかえない", "{冷蔵庫|れいぞうこ}に{入|い}れる"],
    answer: "{明|あか}るい{所|ところ}で{水|みず}をきれいにたもつ",
  },
];

// ── 天気の変化と雲 ──
const weatherChangeQuestions: ChoiceQuestion[] = [
  {
    id: `${U.weatherChange}.q1`,
    unitId: U.weatherChange,
    prompt: "{日本|にほん}の{天気|てんき}は、おもにどちらからどちらへかわる？",
    explanation: "{雲|くも}が{西|にし}から{東|ひがし}へうごくので、{天気|てんき}も{西|にし}から{東|ひがし}へかわることが{多|おお}いよ。",
    format: "choice",
    choices: ["{西|にし}から{東|ひがし}", "{東|ひがし}から{西|にし}", "{南|みなみ}から{北|きた}", "{北|きた}から{南|みなみ}"],
    answer: "{西|にし}から{東|ひがし}",
  },
  {
    id: `${U.weatherChange}.q2`,
    unitId: U.weatherChange,
    prompt: "{空|そら}の{雲|くも}がふえてくると、{天気|てんき}はどうなりやすい？",
    explanation: "{雲|くも}がふえると{雨|あめ}がふりやすくなるよ。{雲|くも}の{量|りょう}で{天気|てんき}がかわるんだ。",
    format: "choice",
    choices: ["{雨|あめ}になりやすい", "かならず{晴|は}れる", "{雪|ゆき}だけになる", "まったくかわらない"],
    answer: "{雨|あめ}になりやすい",
  },
  {
    id: `${U.weatherChange}.q3`,
    unitId: U.weatherChange,
    prompt: "{雲|くも}のうごきを{宇宙|うちゅう}からしらべる{道具|どうぐ}はどれ？",
    explanation: "{気象衛星|きしょうえいせい}の{雲|くも}の{画像|がぞう}で、{雲|くも}のうごきがわかるよ。",
    format: "choice",
    choices: ["{気象衛星|きしょうえいせい}", "けんびきょう", "{方位|ほうい}じしん", "ふりこ"],
    answer: "{気象衛星|きしょうえいせい}",
  },
  {
    id: `${U.weatherChange}.q4`,
    unitId: U.weatherChange,
    prompt: "{台風|たいふう}が{近|ちか}づくとどうなる？",
    explanation: "{台風|たいふう}は{強|つよ}い{風|かぜ}と{大雨|おおあめ}をもたらすので、はやめのそなえが{大切|たいせつ}だよ。",
    format: "choice",
    choices: ["{強|つよ}い{風|かぜ}と{大雨|おおあめ}になる", "かならず{晴|は}れる", "{気温|きおん}が0{度|ど}になる", "{風|かぜ}がまったくなくなる"],
    answer: "{強|つよ}い{風|かぜ}と{大雨|おおあめ}になる",
  },
  {
    id: `${U.weatherChange}.q5`,
    unitId: U.weatherChange,
    prompt: "あしたの{天気|てんき}をよそうするのに{役立|やくだ}つのはどれ？",
    explanation: "{雲|くも}のうごきや{気象|きしょう}じょうほうをもとに、{天気|てんき}のうつりかわりをよそうするよ。",
    format: "choice",
    choices: ["{雲|くも}のうごきや{気象|きしょう}じょうほう", "きのうのゆめ", "すきな{色|いろ}", "コインのうら{表|おもて}"],
    answer: "{雲|くも}のうごきや{気象|きしょう}じょうほう",
  },
];

// ── 流れる水のはたらきと土地 ──
const runningWaterQuestions: ChoiceQuestion[] = [
  {
    id: `${U.runningWater}.q1`,
    unitId: U.runningWater,
    prompt: "{流|なが}れる{水|みず}が{土地|とち}をけずるはたらきをなんという？",
    explanation: "けずるはたらきが「しんしょく」。{水|みず}の{勢|いきお}いが{強|つよ}いほど{大|おお}きくなるよ。",
    format: "choice",
    choices: ["しんしょく", "うんぱん", "たいせき", "じょうはつ"],
    answer: "しんしょく",
  },
  {
    id: `${U.runningWater}.q2`,
    unitId: U.runningWater,
    prompt: "{流|なが}れる{水|みず}がすなや{土|つち}をはこぶはたらきをなんという？",
    explanation: "はこぶはたらきが「うんぱん」だよ。つもらせるのは「たいせき」だよ。",
    format: "choice",
    choices: ["うんぱん", "しんしょく", "たいせき", "ねっとう"],
    answer: "うんぱん",
  },
  {
    id: `${U.runningWater}.q3`,
    unitId: U.runningWater,
    prompt: "{川|かわ}の{水|みず}の{量|りょう}がふえてはたらきが{大|おお}きくなるのはどんなとき？",
    explanation: "{大雨|おおあめ}がふると{川|かわ}の{水|みず}がふえ、けずる・はこぶはたらきが{大|おお}きくなるよ。",
    format: "choice",
    choices: ["{大雨|おおあめ}がふったとき", "{晴|は}れた{日|ひ}がつづいたとき", "{夜|よる}になったとき", "{風|かぜ}がやんだとき"],
    answer: "{大雨|おおあめ}がふったとき",
  },
  {
    id: `${U.runningWater}.q4`,
    unitId: U.runningWater,
    prompt: "{川|かわ}の{上流|じょうりゅう}の{石|いし}のようすで{正|ただ}しいのはどれ？",
    explanation: "{上流|じょうりゅう}は{大|おお}きく かどばった{石|いし}、{下流|かりゅう}へいくほど{小|ちい}さくまるい{石|いし}になるよ。",
    format: "choice",
    choices: ["{大|おお}きくて かどがある", "{小|ちい}さくて まるい", "すなだけしかない", "{石|いし}がまったくない"],
    answer: "{大|おお}きくて かどがある",
  },
  {
    id: `${U.runningWater}.q5`,
    unitId: U.runningWater,
    prompt: "{洪水|こうずい}からまちをまもる くふうはどれ？",
    explanation: "{堤防|ていぼう}やダムで{水|みず}の{量|りょう}を{調節|ちょうせつ}し、{洪水|こうずい}をふせぐよ。",
    format: "choice",
    choices: ["{堤防|ていぼう}やダム", "{花|はな}だん", "{看板|かんばん}", "ベンチ"],
    answer: "{堤防|ていぼう}やダム",
  },
];

// ── もののとけ方 ──
const dissolvingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.dissolving}.q1`,
    unitId: U.dissolving,
    prompt: "{食塩|しょくえん}を{水|みず}にとかすと、ぜんたいの{重|おも}さはどうなる？",
    explanation: "とけても なくならないので、{水|みず}と{食塩|しょくえん}をあわせた{重|おも}さはかわらないよ。",
    format: "choice",
    choices: ["とかす{前|まえ}とかわらない", "{軽|かる}くなる", "とけたぶんふえる", "0になる"],
    answer: "とかす{前|まえ}とかわらない",
  },
  {
    id: `${U.dissolving}.q2`,
    unitId: U.dissolving,
    prompt: "{水|みず}にとけるものの{量|りょう}をふやすには、まずどうする？",
    explanation: "{水|みず}の{量|りょう}をふやすと、とける{量|りょう}もふえるよ。",
    format: "choice",
    choices: ["{水|みず}の{量|りょう}をふやす", "{水|みず}をへらす", "ふたをする", "{暗|くら}くする"],
    answer: "{水|みず}の{量|りょう}をふやす",
  },
  {
    id: `${U.dissolving}.q3`,
    unitId: U.dissolving,
    prompt: "ミョウバンを{水|みず}によくとかすには{温度|おんど}をどうする？",
    explanation: "ミョウバンは{水|みず}の{温度|おんど}を{高|たか}くするほど、とける{量|りょう}がふえるよ。",
    format: "choice",
    choices: ["{高|たか}くする", "0{度|ど}にする", "かえない", "{下|さ}げる"],
    answer: "{高|たか}くする",
  },
  {
    id: `${U.dissolving}.q4`,
    unitId: U.dissolving,
    prompt: "とけた{食塩|しょくえん}をふたたびとり{出|だ}すには？",
    explanation: "{水|みず}をじょうはつさせると、とけていた{食塩|しょくえん}がでてくるよ。",
    format: "choice",
    choices: ["{水|みず}をじょうはつさせる", "さとうをいれる", "ただふる", "{色|いろ}をぬる"],
    answer: "{水|みず}をじょうはつさせる",
  },
  {
    id: `${U.dissolving}.q5`,
    unitId: U.dissolving,
    prompt: "{水|みず}にとけたもののようすで{正|ただ}しいのはどれ？",
    explanation: "とけると とうめいになり、こさが ぜんたいでおなじになるよ。",
    format: "choice",
    choices: ["とうめいで ぜんたいに{広|ひろ}がる", "そこにしずむ", "うかんでいる", "かならず{色|いろ}がつく"],
    answer: "とうめいで ぜんたいに{広|ひろ}がる",
  },
];

// ── ふりこのきまり ──
const pendulumQuestions: ChoiceQuestion[] = [
  {
    id: `${U.pendulum}.q1`,
    unitId: U.pendulum,
    prompt: "ふりこが1おうふくする{時間|じかん}をかえるものはどれ？",
    explanation: "1おうふくの{時間|じかん}は、ふりこの{長|なが}さだけでかわるよ。",
    format: "choice",
    choices: ["ふりこの{長|なが}さ", "おもりの{重|おも}さ", "ふれはば", "おもりの{色|いろ}"],
    answer: "ふりこの{長|なが}さ",
  },
  {
    id: `${U.pendulum}.q2`,
    unitId: U.pendulum,
    prompt: "おもりを{重|おも}くすると、1おうふくの{時間|じかん}はどうなる？",
    explanation: "おもりの{重|おも}さをかえても、1おうふくの{時間|じかん}はかわらないよ。",
    format: "choice",
    choices: ["かわらない", "{長|なが}くなる", "{短|みじか}くなる", "0になる"],
    answer: "かわらない",
  },
  {
    id: `${U.pendulum}.q3`,
    unitId: U.pendulum,
    prompt: "ふりこを{長|なが}くすると、1おうふくの{時間|じかん}はどうなる？",
    explanation: "ふりこが{長|なが}いほど、1おうふくの{時間|じかん}は{長|なが}くなるよ。",
    format: "choice",
    choices: ["{長|なが}くなる", "{短|みじか}くなる", "かわらない", "とまる"],
    answer: "{長|なが}くなる",
  },
  {
    id: `${U.pendulum}.q4`,
    unitId: U.pendulum,
    prompt: "ふれはば（ふれる{角度|かくど}）をかえると、1おうふくの{時間|じかん}は？",
    explanation: "ふれはばをかえても、1おうふくの{時間|じかん}はほとんどかわらないよ。",
    format: "choice",
    choices: ["ほとんどかわらない", "とても{長|なが}くなる", "{半分|はんぶん}になる", "2ばいになる"],
    answer: "ほとんどかわらない",
  },
  {
    id: `${U.pendulum}.q5`,
    unitId: U.pendulum,
    prompt: "ふりこのきまりをつかった{道具|どうぐ}はどれ？",
    explanation: "ふりこがいつもおなじ{時間|じかん}でゆれることをつかって、ふりこ{時計|どけい}になっているよ。",
    format: "choice",
    choices: ["ふりこ{時計|どけい}", "{電子|でんし}レンジ", "ものさし", "ストロー"],
    answer: "ふりこ{時計|どけい}",
  },
];

// ── 電流がうみ出す力（電磁石）──
const electromagnetQuestions: ChoiceQuestion[] = [
  {
    id: `${U.electromagnet}.q1`,
    unitId: U.electromagnet,
    prompt: "コイルに{電流|でんりゅう}をながすとできるものはどれ？",
    explanation: "コイルに{電流|でんりゅう}をながすと、じしゃくのはたらきをする{電磁石|でんじしゃく}になるよ。",
    format: "choice",
    choices: ["{電磁石|でんじしゃく}", "{永久|えいきゅう}じしゃく", "かがみ", "レンズ"],
    answer: "{電磁石|でんじしゃく}",
  },
  {
    id: `${U.electromagnet}.q2`,
    unitId: U.electromagnet,
    prompt: "{電磁石|でんじしゃく}を{強|つよ}くするには どうする？",
    explanation: "{電流|でんりゅう}を{大|おお}きくしたり、コイルのまき{数|かず}をふやすと{強|つよ}くなるよ。",
    format: "choice",
    choices: ["{電流|でんりゅう}を{大|おお}きくする", "{電流|でんりゅう}をとめる", "まき{数|かず}をへらす", "{色|いろ}をかえる"],
    answer: "{電流|でんりゅう}を{大|おお}きくする",
  },
  {
    id: `${U.electromagnet}.q3`,
    unitId: U.electromagnet,
    prompt: "{電磁石|でんじしゃく}のNきょくとSきょくを{入|い}れかえるには？",
    explanation: "{電流|でんりゅう}の{向|む}きをぎゃくにすると、NきょくとSきょくが{入|い}れかわるよ。",
    format: "choice",
    choices: ["{電流|でんりゅう}の{向|む}きをかえる", "コイルをはずす", "おもくする", "{長|なが}くする"],
    answer: "{電流|でんりゅう}の{向|む}きをかえる",
  },
  {
    id: `${U.electromagnet}.q4`,
    unitId: U.electromagnet,
    prompt: "ふつうのじしゃくとくらべた{電磁石|でんじしゃく}のとくちょうはどれ？",
    explanation: "{電磁石|でんじしゃく}は{電流|でんりゅう}をながしたときだけ じしゃくになり、{切|き}るとじりょくがなくなるよ。",
    format: "choice",
    choices: ["{電流|でんりゅう}を{切|き}るとじりょくがなくなる", "ずっとじりょくがつづく", "とてもおもい", "{光|ひか}る"],
    answer: "{電流|でんりゅう}を{切|き}るとじりょくがなくなる",
  },
  {
    id: `${U.electromagnet}.q5`,
    unitId: U.electromagnet,
    prompt: "{電磁石|でんじしゃく}をつかっている{道具|どうぐ}はどれ？",
    explanation: "モーターやクレーンなど、{電磁石|でんじしゃく}は{多|おお}くのきかいにつかわれているよ。",
    format: "choice",
    choices: ["モーター", "ガラスのコップ", "えんぴつ", "タオル"],
    answer: "モーター",
  },
];

// ── 集約（unitId -> コンテンツ）──

export const rikaG5Contents: Record<string, UnitContent> = {
  [U.plantFruit]: {
    unitId: U.plantFruit,
    learn: {
      unitId: U.plantFruit,
      steps: [
        {
          heading: "{発芽|はつが}の{条件|じょうけん}",
          body: "{種子|しゅし}が{芽|め}を{出|だ}すには、{水|みず}・{空気|くうき}・てきした{温度|おんど}の3つが{必要|ひつよう}だよ。{日光|にっこう}や{肥料|ひりょう}は{発芽|はつが}にはいらないんだ。",
          visual: { kind: "emoji", value: "🌱", caption: "{芽|め}が{出|で}る" },
        },
        {
          heading: "{成長|せいちょう}の{条件|じょうけん}",
          body: "{発芽|はつが}したあと、よく{育|そだ}つには{日光|にっこう}と{肥料|ひりょう}（{養分|ようぶん}）が{必要|ひつよう}になるよ。",
          visual: { kind: "emoji", value: "☀️🌿", caption: "{日光|にっこう}と{養分|ようぶん}" },
        },
        {
          heading: "{種子|しゅし}の{養分|ようぶん}",
          body: "{芽生|めば}えのはじめは、{種子|しゅし}の{中|なか}の{養分|ようぶん}（でんぷん）をつかって{育|そだ}つよ。",
          visual: { kind: "emoji", value: "🌰", caption: "でんぷん" },
        },
      ],
    },
    test: { unitId: U.plantFruit, questions: plantFruitQuestions, questionCount: 5 },
  },

  [U.flowerSeed]: {
    unitId: U.flowerSeed,
    learn: {
      unitId: U.flowerSeed,
      steps: [
        {
          heading: "{花|はな}のつくり",
          body: "{花|はな}には おしべ・めしべ・{花|はな}びら・がくがあるよ。めしべのもとが やがて{実|み}になるんだ。",
          visual: { kind: "emoji", value: "🌸", caption: "おしべとめしべ" },
        },
        {
          heading: "{受粉|じゅふん}",
          body: "おしべの{花粉|かふん}がめしべの{先|さき}につくことを{受粉|じゅふん}というよ。{受粉|じゅふん}すると{実|み}ができはじめる。",
          visual: { kind: "emoji", value: "🐝", caption: "{花粉|かふん}をはこぶ" },
        },
        {
          heading: "{実|み}と{種子|しゅし}",
          body: "{受粉|じゅふん}しためしべは{育|そだ}って{実|み}になり、その{中|なか}に{種子|しゅし}ができるよ。",
          visual: { kind: "emoji", value: "🍎", caption: "{実|み}の{中|なか}の{種子|しゅし}" },
        },
      ],
    },
    test: { unitId: U.flowerSeed, questions: flowerSeedQuestions, questionCount: 5 },
  },

  [U.lifeContinuity]: {
    unitId: U.lifeContinuity,
    learn: {
      unitId: U.lifeContinuity,
      steps: [
        {
          heading: "おすとめす",
          body: "メダカは せびれや しりびれのかたちで、おすとめすを{見分|みわ}けられるよ。",
          visual: { kind: "emoji", value: "🐟", caption: "ひれでみわける" },
        },
        {
          heading: "たまごのへんか",
          body: "{受精|じゅせい}したたまごは、{日|ひ}がたつにつれて{中|なか}でメダカのからだができていくよ。",
          visual: { kind: "emoji", value: "🥚", caption: "たまごの{中|なか}" },
        },
        {
          heading: "{誕生|たんじょう}",
          body: "やがて たまごのまくをやぶって{子|こ}メダカがうまれるよ。はじめは はらのふくろの{養分|ようぶん}で{育|そだ}つ。",
          visual: { kind: "emoji", value: "🐠", caption: "うまれた{子|こ}メダカ" },
        },
      ],
    },
    test: { unitId: U.lifeContinuity, questions: lifeContinuityQuestions, questionCount: 5 },
  },

  [U.weatherChange]: {
    unitId: U.weatherChange,
    learn: {
      unitId: U.weatherChange,
      steps: [
        {
          heading: "{雲|くも}と{天気|てんき}",
          body: "{雲|くも}の{量|りょう}やうごきで{天気|てんき}がかわるよ。{雲|くも}がふえると{雨|あめ}になりやすいんだ。",
          visual: { kind: "emoji", value: "☁️", caption: "{雲|くも}のようす" },
        },
        {
          heading: "{天気|てんき}のうつりかわり",
          body: "{日本|にほん}では{天気|てんき}は{西|にし}から{東|ひがし}へかわっていくことが{多|おお}いよ。",
          visual: { kind: "emoji", value: "🌤️", caption: "{西|にし}から{東|ひがし}へ" },
        },
        {
          heading: "{台風|たいふう}",
          body: "{夏|なつ}から{秋|あき}にかけて{台風|たいふう}が{近|ちか}づくと、{強|つよ}い{風|かぜ}と{雨|あめ}になるよ。",
          visual: { kind: "emoji", value: "🌀", caption: "{台風|たいふう}" },
        },
      ],
    },
    test: { unitId: U.weatherChange, questions: weatherChangeQuestions, questionCount: 5 },
  },

  [U.runningWater]: {
    unitId: U.runningWater,
    learn: {
      unitId: U.runningWater,
      steps: [
        {
          heading: "3つのはたらき",
          body: "{流|なが}れる{水|みず}には、けずる（しんしょく）・はこぶ（うんぱん）・つもらせる（たいせき）の3つのはたらきがあるよ。",
          visual: { kind: "emoji", value: "🌊", caption: "{水|みず}のはたらき" },
        },
        {
          heading: "{水|みず}の{量|りょう}とはたらき",
          body: "{雨|あめ}で{水|みず}の{量|りょう}がふえると、けずったりはこんだりするはたらきが{大|おお}きくなるよ。",
          visual: { kind: "emoji", value: "🏞️", caption: "{水|みず}の{量|りょう}" },
        },
        {
          heading: "{川|かわ}と{土地|とち}",
          body: "{川|かわ}の{上流|じょうりゅう}は{土地|とち}を{大|おお}きくけずり、{下流|かりゅう}は{土|つち}やすなをつもらせるよ。",
          visual: { kind: "emoji", value: "⛰️", caption: "{上流|じょうりゅう}と{下流|かりゅう}" },
        },
      ],
    },
    test: { unitId: U.runningWater, questions: runningWaterQuestions, questionCount: 5 },
  },

  [U.dissolving]: {
    unitId: U.dissolving,
    learn: {
      unitId: U.dissolving,
      steps: [
        {
          heading: "とけるってどういうこと",
          body: "ものが{水|みず}にとけて{見|み}えなくなっても、なくなってはいないよ。とけたぶんだけ{重|おも}さはのこっているんだ。",
          visual: { kind: "emoji", value: "🧂", caption: "{食塩|しょくえん}がとける" },
        },
        {
          heading: "とける{量|りょう}には{限|かぎ}りがある",
          body: "{水|みず}の{量|りょう}や{温度|おんど}によって、とける{量|りょう}がかわるよ。{水|みず}をふやすともっととけるんだ。",
          visual: { kind: "emoji", value: "💧", caption: "{水|みず}の{量|りょう}と{温度|おんど}" },
        },
        {
          heading: "とり{出|だ}す",
          body: "とけたものは、{水|みず}をじょうはつさせたり ひやしたりすると、ふたたびとり{出|だ}せるよ。",
          visual: { kind: "emoji", value: "🔬", caption: "じょうはつ・れいきゃく" },
        },
      ],
    },
    test: { unitId: U.dissolving, questions: dissolvingQuestions, questionCount: 5 },
  },

  [U.pendulum]: {
    unitId: U.pendulum,
    learn: {
      unitId: U.pendulum,
      steps: [
        {
          heading: "ふりことは",
          body: "{糸|いと}におもりをつけてゆらすものをふりこというよ。1おうふくにかかる{時間|じかん}をしらべるんだ。",
          visual: { kind: "emoji", value: "⏳", caption: "ふりこのゆれ" },
        },
        {
          heading: "{周期|しゅうき}をきめるもの",
          body: "ふりこが1おうふくする{時間|じかん}は、ふりこの{長|なが}さでかわるよ。おもりの{重|おも}さやふれはばではかわらないんだ。",
          visual: { kind: "emoji", value: "🔵", caption: "{長|なが}さでかわる" },
        },
        {
          heading: "たしかめよう",
          body: "ふりこを{長|なが}くすると、1おうふくの{時間|じかん}は{長|なが}くなるよ。じっけんでたしかめよう。",
          visual: { kind: "emoji", value: "📏", caption: "{長|なが}さをかえる" },
        },
      ],
    },
    test: { unitId: U.pendulum, questions: pendulumQuestions, questionCount: 5 },
  },

  [U.electromagnet]: {
    unitId: U.electromagnet,
    learn: {
      unitId: U.electromagnet,
      steps: [
        {
          heading: "{電磁石|でんじしゃく}とは",
          body: "コイル（どう{線|せん}をまいたもの）に{電流|でんりゅう}をながすと、じしゃくのはたらきをするよ。これを{電磁石|でんじしゃく}というよ。",
          visual: { kind: "emoji", value: "🧲", caption: "コイルと{電流|でんりゅう}" },
        },
        {
          heading: "{強|つよ}さをかえる",
          body: "{電流|でんりゅう}を{大|おお}きくしたり、コイルのまき{数|かず}をふやすと、{電磁石|でんじしゃく}は{強|つよ}くなるよ。",
          visual: { kind: "emoji", value: "🔋", caption: "{電流|でんりゅう}とまき{数|かず}" },
        },
        {
          heading: "NきょくとSきょく",
          body: "{電流|でんりゅう}の{向|む}きをかえると、{電磁石|でんじしゃく}のNきょくとSきょくが{入|い}れかわるよ。",
          visual: { kind: "emoji", value: "🔁", caption: "{向|む}きでかわる" },
        },
      ],
    },
    test: { unitId: U.electromagnet, questions: electromagnetQuestions, questionCount: 5 },
  },
};
