// ══════════════════════════════════════════
// カリキュラム: 教養（きょうよう）小4 ─ 拡張カテゴリ（標準教科外）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 表記規約: 全表示テキストは「漢字＋全漢字ルビ」記法 {漢字|よみ} で執筆（RubyText が描画）。
//          formalName など管理用の正式名は素の漢字でよい（表示は name 側を使う）。
// 【申し送り】"kyoyo" は src/types/drill.ts の SubjectId union に未追加（本波では types を触らない方針）。
//   本ファイル内で局所的に型吸収する（KYOYO_ID）。中央集約時に SubjectId へ "kyoyo" を加えれば
//   このキャストは不要になる。subject/domain は g1 と同一 id を想定（集約時 id 重複排除）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  SubjectId,
} from "@/types/curriculum";

// SubjectId 未対応の局所吸収（type-safe な逃がし）。
const KYOYO_ID = "kyoyo" as unknown as SubjectId;

// ── 教科 ──────────────────────────────────

export const kyoyoSubject: Subject = {
  id: KYOYO_ID,
  name: "{教養|きょうよう}",
  formalName: "教養",
  emoji: "🌍",
  theme: "emerald",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// scope-addition-kyoyo-oyo.md の6領域案に対応（学年非依存のカテゴリ。g1 と同一 id 想定）。

export const kyoyoG4Domains: Domain[] = [
  {
    id: "kyoyo.money-life",
    subjectId: KYOYO_ID,
    name: "おかね・くらし",
    formalName: "お金・暮らし",
  },
  {
    id: "kyoyo.world-culture",
    subjectId: KYOYO_ID,
    name: "せかいの{国|くに}・{文化|ぶんか}",
    formalName: "世界の国・文化",
  },
  {
    id: "kyoyo.history-people",
    subjectId: KYOYO_ID,
    name: "いじん・れきし",
    formalName: "偉人・歴史",
  },
  {
    id: "kyoyo.nature-space",
    subjectId: KYOYO_ID,
    name: "しぜん・うちゅう",
    formalName: "自然・宇宙",
  },
  {
    id: "kyoyo.language-proverb",
    subjectId: KYOYO_ID,
    name: "ことば・ことわざ",
    formalName: "言葉・ことわざ",
  },
  {
    id: "kyoyo.body-manner",
    subjectId: KYOYO_ID,
    name: "からだ・マナー",
    formalName: "体・マナー",
  },
];

// ── 単元 ──────────────────────────────────
// 各領域から小4相応の難度で1単元ずつ洗い出す（学年が上がるほど内容を深く）。
// 依存グラフ: 教養は領域ごとに独立した入口トピックのため prerequisites/leadsTo は本グレード内で完結
//            （[] 可）。学年間ロードマップは中央集約時に他グレードと接続する想定【申し送り】。
const U = {
  money: "kyoyo.g4.money-and-budget",
  flags: "kyoyo.g4.world-flags",
  inventors: "kyoyo.g4.inventors",
  planets: "kyoyo.g4.planets",
  proverbs: "kyoyo.g4.proverbs",
  nutrition: "kyoyo.g4.nutrition",
} as const;

export const kyoyoG4Units: Unit[] = [
  {
    id: U.money,
    subjectId: KYOYO_ID,
    grade: 4,
    domainId: "kyoyo.money-life",
    title: "かいものと おつり",
    order: 1,
    realWorldUse:
      "おこづかいで かいものを する とき、{値段|ねだん}と おつりを {計算|けいさん}して むだづかいを へらせるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.flags,
    subjectId: KYOYO_ID,
    grade: 4,
    domainId: "kyoyo.world-culture",
    title: "せかいの{国|くに}と {国旗|こっき}",
    order: 2,
    realWorldUse:
      "オリンピックや ニュースで でて くる {国|くに}の {名前|なまえ}や {国旗|こっき}が わかるように なるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.inventors,
    subjectId: KYOYO_ID,
    grade: 4,
    domainId: "kyoyo.history-people",
    title: "{発明|はつめい}した いじん",
    order: 3,
    realWorldUse:
      "{身|み}の まわりの {便利|べんり}な どうぐを だれが {発明|はつめい}したか しると、{物|もの}の しくみに きょうみが もてるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.planets,
    subjectId: KYOYO_ID,
    grade: 4,
    domainId: "kyoyo.nature-space",
    title: "うちゅうと {惑星|わくせい}",
    order: 4,
    realWorldUse:
      "よぞらの {星|ほし}や ニュースの うちゅう{探査|たんさ}の はなしが わかるように なるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.proverbs,
    subjectId: KYOYO_ID,
    grade: 4,
    domainId: "kyoyo.language-proverb",
    title: "ことわざと {慣用句|かんようく}",
    order: 5,
    realWorldUse:
      "ことわざを しると、{気持|きも}ちや {教訓|きょうくん}を みじかい {言葉|ことば}で つたえられるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.nutrition,
    subjectId: KYOYO_ID,
    grade: 4,
    domainId: "kyoyo.body-manner",
    title: "{食|た}べものと {栄養|えいよう}",
    order: 6,
    realWorldUse:
      "まいにちの {食事|しょくじ}で どの {栄養|えいよう}を とれば {元気|げんき}に なれるか えらべるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。全文ルビ記法。

// 1. かいものと おつり
const moneyQuestions: ChoiceQuestion[] = [
  {
    id: `${U.money}.q-1`,
    unitId: U.money,
    prompt: "100{円|えん}で 60{円|えん}の おかしを かいました。おつりは いくら？",
    explanation: "100 ひく 60 は 40。だから おつりは 40{円|えん}だよ。",
    visual: { kind: "emoji", value: "🪙🍬", caption: "100{円|えん} − 60{円|えん}" },
    format: "choice",
    choices: ["40{円|えん}", "30{円|えん}", "50{円|えん}", "60{円|えん}"],
    answer: "40{円|えん}",
  },
  {
    id: `${U.money}.q-2`,
    unitId: U.money,
    prompt: "{日本|にほん}の おかねの たんいは どれ？",
    explanation: "{日本|にほん}は「{円|えん}」、アメリカは「ドル」を つかうよ。",
    visual: { kind: "emoji", value: "💴", caption: "{円|えん}" },
    format: "choice",
    choices: ["{円|えん}", "ドル", "ウォン", "ユーロ"],
    answer: "{円|えん}",
  },
  {
    id: `${U.money}.q-3`,
    unitId: U.money,
    prompt: "いちばん {高|たか}い こうか（コイン）は どれ？",
    explanation: "こうかで いちばん {高|たか}いのは 500{円|えん}だよ。",
    visual: { kind: "emoji", value: "🪙", caption: "500{円|えん}" },
    format: "choice",
    choices: ["500{円|えん}", "100{円|えん}", "50{円|えん}", "10{円|えん}"],
    answer: "500{円|えん}",
  },
  {
    id: `${U.money}.q-4`,
    unitId: U.money,
    prompt: "「もったいない」の いみに あう ものは どれ？",
    explanation: "むだを へらして {物|もの}を {大切|たいせつ}に する ことだよ。せかいの {目標|もくひょう} SDGs にも つながるよ。",
    visual: { kind: "emoji", value: "♻️", caption: "もったいない" },
    format: "choice",
    choices: ["{物|もの}を {大切|たいせつ}に つかう", "すぐ すてる", "たくさん かう", "わざと こわす"],
    answer: "{物|もの}を {大切|たいせつ}に つかう",
  },
  {
    id: `${U.money}.q-5`,
    unitId: U.money,
    prompt: "つかえる おかねを きめて かいものする ことを なんと いう？",
    explanation: "つかえる {金額|きんがく}の {計画|けいかく}を「{予算|よさん}」と いうよ。",
    visual: { kind: "emoji", value: "🧾", caption: "{予算|よさん}" },
    format: "choice",
    choices: ["{予算|よさん}", "{貯金|ちょきん}", "おつり", "ねびき"],
    answer: "{予算|よさん}",
  },
];

// 2. せかいの国と国旗
const flagsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.flags}.q-1`,
    unitId: U.flags,
    prompt: "{日本|にほん}の {国旗|こっき}の まんなかの {色|いろ}は？",
    explanation: "{日本|にほん}の {国旗|こっき}は しろ地に {赤|あか}い {丸|まる}で「{日|ひ}の {丸|まる}」と いうよ。{太陽|たいよう}を あらわすよ。",
    visual: { kind: "emoji", value: "🇯🇵", caption: "{日|ひ}の {丸|まる}" },
    format: "choice",
    choices: ["{赤|あか}", "{青|あお}", "みどり", "{黄|き}"],
    answer: "{赤|あか}",
  },
  {
    id: `${U.flags}.q-2`,
    unitId: U.flags,
    prompt: "「{自由|じゆう}の {女神|めがみ}」が ある {国|くに}は？",
    explanation: "{自由|じゆう}の {女神|めがみ}は アメリカの ニューヨークに あるよ。",
    visual: { kind: "emoji", value: "🗽", caption: "アメリカ" },
    format: "choice",
    choices: ["アメリカ", "フランス", "{中国|ちゅうごく}", "エジプト"],
    answer: "アメリカ",
  },
  {
    id: `${U.flags}.q-3`,
    unitId: U.flags,
    prompt: "エッフェル{塔|とう}が ある {国|くに}は？",
    explanation: "エッフェル{塔|とう}は フランスの {首都|しゅと} パリに あるよ。",
    visual: { kind: "emoji", value: "🗼", caption: "フランス" },
    format: "choice",
    choices: ["フランス", "イタリア", "ドイツ", "イギリス"],
    answer: "フランス",
  },
  {
    id: `${U.flags}.q-4`,
    unitId: U.flags,
    prompt: "{万里|ばんり}の {長城|ちょうじょう}が ある {国|くに}は？",
    explanation: "{万里|ばんり}の {長城|ちょうじょう}は とても {長|なが}い {城壁|じょうへき}で {中国|ちゅうごく}に あるよ。",
    visual: { kind: "emoji", value: "🏯", caption: "{中国|ちゅうごく}" },
    format: "choice",
    choices: ["{中国|ちゅうごく}", "{韓国|かんこく}", "インド", "タイ"],
    answer: "{中国|ちゅうごく}",
  },
  {
    id: `${U.flags}.q-5`,
    unitId: U.flags,
    prompt: "ピラミッドが ある {国|くに}は？",
    explanation: "{有名|ゆうめい}な ピラミッドは エジプトに あるよ。",
    visual: { kind: "emoji", value: "🏜️", caption: "エジプト" },
    format: "choice",
    choices: ["エジプト", "ギリシャ", "ブラジル", "カナダ"],
    answer: "エジプト",
  },
];

// 3. 発明したいじん
const inventorsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.inventors}.q-1`,
    unitId: U.inventors,
    prompt: "{電球|でんきゅう}を {広|ひろ}めた いじんは だれ？",
    explanation: "エジソンは {電球|でんきゅう}など たくさんの ものを {発明|はつめい}し、よるを あかるく したよ。",
    visual: { kind: "emoji", value: "💡", caption: "エジソン" },
    format: "choice",
    choices: ["エジソン", "ライト{兄弟|きょうだい}", "ノーベル", "キュリー{夫人|ふじん}"],
    answer: "エジソン",
  },
  {
    id: `${U.inventors}.q-2`,
    unitId: U.inventors,
    prompt: "はじめて {飛行機|ひこうき}で {空|そら}を とんだのは だれ？",
    explanation: "ライト{兄弟|きょうだい}が エンジンつき {飛行機|ひこうき}で はじめて {空|そら}を とんだよ。",
    visual: { kind: "emoji", value: "✈️", caption: "ライト{兄弟|きょうだい}" },
    format: "choice",
    choices: ["ライト{兄弟|きょうだい}", "エジソン", "コロンブス", "ガリレオ"],
    answer: "ライト{兄弟|きょうだい}",
  },
  {
    id: `${U.inventors}.q-3`,
    unitId: U.inventors,
    prompt: "「{発明|はつめい}」の いみに あうのは どれ？",
    explanation: "{今|いま}まで なかった {新|あたら}しい {便利|べんり}な ものを {作|つく}り だす ことだよ。",
    visual: { kind: "emoji", value: "🛠️", caption: "{発明|はつめい}" },
    format: "choice",
    choices: ["なかった ものを {作|つく}る", "{物|もの}を こわす", "まねを する", "{絵|え}を かう"],
    answer: "なかった ものを {作|つく}る",
  },
  {
    id: `${U.inventors}.q-4`,
    unitId: U.inventors,
    prompt: "ノーベル{賞|しょう}に {名前|なまえ}が のこる ノーベルが {発明|はつめい}した ものは？",
    explanation: "ノーベルは ダイナマイトを {発明|はつめい}し、その {財産|ざいさん}で ノーベル{賞|しょう}が できたよ。",
    visual: { kind: "emoji", value: "🧨", caption: "ノーベル" },
    format: "choice",
    choices: ["ダイナマイト", "{電話|でんわ}", "くるま", "カメラ"],
    answer: "ダイナマイト",
  },
  {
    id: `${U.inventors}.q-5`,
    unitId: U.inventors,
    prompt: "{電話|でんわ}を {発明|はつめい}したと いわれる いじんは？",
    explanation: "{電話|でんわ}は グラハム・ベルが {発明|はつめい}したと いわれて いるよ。",
    visual: { kind: "emoji", value: "☎️", caption: "ベル" },
    format: "choice",
    choices: ["ベル", "エジソン", "ガリレオ", "コロンブス"],
    answer: "ベル",
  },
];

// 4. うちゅうと惑星
const planetsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.planets}.q-1`,
    unitId: U.planets,
    prompt: "{太陽系|たいようけい}の {惑星|わくせい}は ぜんぶで いくつ？",
    explanation: "いまは 8つの {惑星|わくせい}が あると されて いるよ。",
    visual: { kind: "emoji", value: "🪐", caption: "8つの {惑星|わくせい}" },
    format: "choice",
    choices: ["8つ", "9つ", "7つ", "10こ"],
    answer: "8つ",
  },
  {
    id: `${U.planets}.q-2`,
    unitId: U.planets,
    prompt: "わたしたちが すむ {惑星|わくせい}は どれ？",
    explanation: "わたしたちが すむのは {地球|ちきゅう}だよ。{太陽|たいよう}から 3ばんめだよ。",
    visual: { kind: "emoji", value: "🌍", caption: "{地球|ちきゅう}" },
    format: "choice",
    choices: ["{地球|ちきゅう}", "{火星|かせい}", "{金星|きんせい}", "{木星|もくせい}"],
    answer: "{地球|ちきゅう}",
  },
  {
    id: `${U.planets}.q-3`,
    unitId: U.planets,
    prompt: "{太陽|たいよう}に いちばん {近|ちか}い {惑星|わくせい}は？",
    explanation: "いちばん {内側|うちがわ}を まわるのは {水星|すいせい}だよ。",
    visual: { kind: "emoji", value: "☀️", caption: "{水星|すいせい}" },
    format: "choice",
    choices: ["{水星|すいせい}", "{地球|ちきゅう}", "{土星|どせい}", "{海王星|かいおうせい}"],
    answer: "{水星|すいせい}",
  },
  {
    id: `${U.planets}.q-4`,
    unitId: U.planets,
    prompt: "いちばん {大|おお}きい {惑星|わくせい}は どれ？",
    explanation: "{木星|もくせい}は {太陽系|たいようけい}で いちばん {大|おお}きい {惑星|わくせい}だよ。",
    visual: { kind: "emoji", value: "🪐", caption: "{木星|もくせい}" },
    format: "choice",
    choices: ["{木星|もくせい}", "{地球|ちきゅう}", "{火星|かせい}", "{水星|すいせい}"],
    answer: "{木星|もくせい}",
  },
  {
    id: `${U.planets}.q-5`,
    unitId: U.planets,
    prompt: "「わ（リング）」が ある ことで {有名|ゆうめい}な {惑星|わくせい}は？",
    explanation: "{土星|どせい}には こおりや いわで できた きれいな わ（リング）が あるよ。",
    visual: { kind: "emoji", value: "🪐", caption: "{土星|どせい}" },
    format: "choice",
    choices: ["{土星|どせい}", "{水星|すいせい}", "{金星|きんせい}", "{地球|ちきゅう}"],
    answer: "{土星|どせい}",
  },
];

// 5. ことわざと慣用句
const proverbsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.proverbs}.q-1`,
    unitId: U.proverbs,
    prompt: "「さるも {木|き}から おちる」の いみは？",
    explanation: "どんな {名人|めいじん}でも ときには しっぱいする、と いう いみだよ。",
    visual: { kind: "emoji", value: "🐒", caption: "さるも {木|き}から おちる" },
    format: "choice",
    choices: [
      "{上手|じょうず}な {人|ひと}でも しっぱいする",
      "さるは {木|き}が きらい",
      "{木|き}は あぶない",
      "さるは およげない",
    ],
    answer: "{上手|じょうず}な {人|ひと}でも しっぱいする",
  },
  {
    id: `${U.proverbs}.q-2`,
    unitId: U.proverbs,
    prompt: "「{石|いし}の {上|うえ}にも {三年|さんねん}」が おしえて いるのは？",
    explanation: "つらくても がまんして つづければ いつか むくわれる、と いう いみだよ。",
    visual: { kind: "emoji", value: "🪨", caption: "{石|いし}の {上|うえ}にも {三年|さんねん}" },
    format: "choice",
    choices: [
      "がまんして つづければ むくわれる",
      "{石|いし}は つめたい",
      "{三年|さんねん}で おわる",
      "すぐ あきらめる",
    ],
    answer: "がまんして つづければ むくわれる",
  },
  {
    id: `${U.proverbs}.q-3`,
    unitId: U.proverbs,
    prompt: "{慣用句|かんようく}「{頭|あたま}が かたい」の いみに ちかいのは？",
    explanation: "ゆうずうが きかない、かんがえを かえにくい ことを いうよ。じっさいに {頭|あたま}が かたい わけでは ないよ。",
    visual: { kind: "emoji", value: "🗿", caption: "{頭|あたま}が かたい" },
    format: "choice",
    choices: ["かんがえを かえられない", "{頭|あたま}が いたい", "とても かしこい", "ねむい"],
    answer: "かんがえを かえられない",
  },
  {
    id: `${U.proverbs}.q-4`,
    unitId: U.proverbs,
    prompt: "つぎの うち「ことわざ」は どれ？",
    explanation: "「ちりも つもれば {山|やま}と なる」は、すこしでも つづければ {大|おお}きく なる、と いう ことわざだよ。",
    visual: { kind: "emoji", value: "⛰️", caption: "ちりも つもれば {山|やま}と なる" },
    format: "choice",
    choices: ["ちりも つもれば {山|やま}と なる", "おはよう", "ありがとう", "さようなら"],
    answer: "ちりも つもれば {山|やま}と なる",
  },
  {
    id: `${U.proverbs}.q-5`,
    unitId: U.proverbs,
    prompt: "「{急|いそ}がば まわれ」の いみは？",
    explanation: "{急|いそ}ぐ ときほど {安全|あんぜん}で {確実|かくじつ}な {方法|ほうほう}を えらぶ ほうが けっきょく {早|はや}い、と いう いみだよ。",
    visual: { kind: "emoji", value: "🛤️", caption: "{急|いそ}がば まわれ" },
    format: "choice",
    choices: [
      "{確実|かくじつ}な {道|みち}を えらぶ ほうが {早|はや}い",
      "はしれば かならず かつ",
      "まわると いつも おそい",
      "とにかく いそいで いこう",
    ],
    answer: "{確実|かくじつ}な {道|みち}を えらぶ ほうが {早|はや}い",
  },
];

// 6. 食べものと栄養
const nutritionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.nutrition}.q-1`,
    unitId: U.nutrition,
    prompt: "からだ（きんにくや {血|ち}）を つくる なかまは どれ？",
    explanation: "たんぱくしつの おおい にく・{魚|さかな}・たまご・まめが からだを つくるよ（{赤|あか}の なかま）。",
    visual: { kind: "emoji", value: "🍖🐟🥚", caption: "{赤|あか}の なかま" },
    format: "choice",
    choices: ["にく・{魚|さかな}・たまご", "ごはん・パン", "やさい・くだもの", "あぶら・さとう"],
    answer: "にく・{魚|さかな}・たまご",
  },
  {
    id: `${U.nutrition}.q-2`,
    unitId: U.nutrition,
    prompt: "エネルギー（{力|ちから}）の もとに なる なかまは どれ？",
    explanation: "ごはんや パンなどの {炭水化物|たんすいかぶつ}は {力|ちから}の もとに なるよ（{黄|き}の なかま）。",
    visual: { kind: "emoji", value: "🍚🍞", caption: "{黄|き}の なかま" },
    format: "choice",
    choices: ["ごはん・パン", "にく・たまご", "やさい", "みず"],
    answer: "ごはん・パン",
  },
  {
    id: `${U.nutrition}.q-3`,
    unitId: U.nutrition,
    prompt: "からだの {調子|ちょうし}を ととのえる なかまは どれ？",
    explanation: "やさいや くだものに おおい ビタミンが からだの {調子|ちょうし}を ととのえるよ（みどりの なかま）。",
    visual: { kind: "emoji", value: "🥦🍎", caption: "みどりの なかま" },
    format: "choice",
    choices: ["やさい・くだもの", "にく", "さとう", "あぶら"],
    answer: "やさい・くだもの",
  },
  {
    id: `${U.nutrition}.q-4`,
    unitId: U.nutrition,
    prompt: "{元気|げんき}に すごす ために いちばん たいせつな たべかたは？",
    explanation: "{赤|あか}・{黄|き}・みどりの 3つの なかまを バランスよく {食|た}べる ことが たいせつだよ。",
    visual: { kind: "emoji", value: "🍱", caption: "バランスよく" },
    format: "choice",
    choices: [
      "いろいろな ものを バランスよく {食|た}べる",
      "おかしだけ {食|た}べる",
      "なにも {食|た}べない",
      "{同|おな}じ ものだけ {食|た}べる",
    ],
    answer: "いろいろな ものを バランスよく {食|た}べる",
  },
  {
    id: `${U.nutrition}.q-5`,
    unitId: U.nutrition,
    prompt: "{食事|しょくじ}の まえに する マナーは どれ？",
    explanation: "{食|た}べものや {作|つく}って くれた {人|ひと}へ かんしゃして「いただきます」と いうよ。",
    visual: { kind: "emoji", value: "🙏", caption: "いただきます" },
    format: "choice",
    choices: ["「いただきます」と いう", "だまって たべる", "はしを なめる", "たちあがって たべる"],
    answer: "「いただきます」と いう",
  },
];

export const kyoyoG4Contents: Record<string, UnitContent> = {
  [U.money]: {
    unitId: U.money,
    learn: {
      unitId: U.money,
      steps: [
        {
          heading: "おかねの たんい",
          body: "{日本|にほん}の おかねは「{円|えん}」だよ。1・5・10・50・100・500{円|えん}の こうか（コイン）と、おさつ（{紙|かみ}の おかね）が あるよ。",
          visual: { kind: "emoji", value: "🪙💴", caption: "こうかと おさつ" },
        },
        {
          heading: "おつりの しくみ",
          body: "{払|はら}った おかねから {値段|ねだん}を ひいた のこりが「おつり」だよ。100{円|えん}で 70{円|えん}の ものを かうと、おつりは 30{円|えん}。",
          visual: { kind: "emoji", value: "🧾", caption: "100 − 70 = 30" },
        },
        {
          heading: "もったいないと SDGs",
          body: "{物|もの}を {大切|たいせつ}に つかい、むだを へらす ことを「もったいない」と いうよ。これは せかいの {目標|もくひょう}「SDGs」にも つながるんだ。",
          visual: { kind: "emoji", value: "♻️🌍", caption: "もったいない" },
        },
      ],
    },
    test: { unitId: U.money, questions: moneyQuestions, questionCount: 5 },
  },

  [U.flags]: {
    unitId: U.flags,
    learn: {
      unitId: U.flags,
      steps: [
        {
          heading: "せかいには たくさんの {国|くに}",
          body: "せかいには 190 いじょうの {国|くに}が あるよ。それぞれ {言葉|ことば}や {文化|ぶんか}、たべものが ちがうんだ。",
          visual: { kind: "emoji", value: "🌍", caption: "せかいの {国|くに}" },
        },
        {
          heading: "{国旗|こっき}には いみが ある",
          body: "{国旗|こっき}の {色|いろ}や かたちには その {国|くに}の {願|ねが}いが こめられて いるよ。{日本|にほん}は しろに {赤|あか}い {丸|まる}で「{日|ひ}の {丸|まる}」だよ。",
          visual: { kind: "emoji", value: "🇯🇵", caption: "{日|ひ}の {丸|まる}" },
        },
        {
          heading: "あいさつも いろいろ",
          body: "えいごは「Hello」、フランスは「Bonjour（ボンジュール）」、{中国|ちゅうごく}は「ニーハオ」だよ。{国|くに}に よって ちがうね。",
          visual: { kind: "emoji", value: "👋", caption: "せかいの あいさつ" },
        },
      ],
    },
    test: { unitId: U.flags, questions: flagsQuestions, questionCount: 5 },
  },

  [U.inventors]: {
    unitId: U.inventors,
    learn: {
      unitId: U.inventors,
      steps: [
        {
          heading: "{発明|はつめい}って なに？",
          body: "{今|いま}まで なかった {便利|べんり}な ものを {作|つく}り だす ことを「{発明|はつめい}」と いうよ。{身|み}の まわりには {発明|はつめい}が いっぱい。",
          visual: { kind: "emoji", value: "💡", caption: "{発明|はつめい}" },
        },
        {
          heading: "{電球|でんきゅう}の エジソン",
          body: "アメリカの エジソンは {電球|でんきゅう}を {実用化|じつようか}して、よるも あかるく すごせるように したよ。",
          visual: { kind: "emoji", value: "🔦", caption: "エジソン" },
        },
        {
          heading: "{空|そら}を とんだ ライト{兄弟|きょうだい}",
          body: "ライト{兄弟|きょうだい}は はじめて エンジンの ついた {飛行機|ひこうき}で {空|そら}を とぶ ことに {成功|せいこう}したよ。",
          visual: { kind: "emoji", value: "✈️", caption: "ライト{兄弟|きょうだい}" },
        },
      ],
    },
    test: { unitId: U.inventors, questions: inventorsQuestions, questionCount: 5 },
  },

  [U.planets]: {
    unitId: U.planets,
    learn: {
      unitId: U.planets,
      steps: [
        {
          heading: "{太陽系|たいようけい}",
          body: "{太陽|たいよう}の まわりを まわる 8つの {惑星|わくせい}の なかまを「{太陽系|たいようけい}」と いうよ。",
          visual: { kind: "emoji", value: "☀️🪐", caption: "{太陽系|たいようけい}" },
        },
        {
          heading: "{地球|ちきゅう}は 3ばんめ",
          body: "{太陽|たいよう}に {近|ちか}い ほうから {水星|すいせい}・{金星|きんせい}・{地球|ちきゅう}・{火星|かせい}…。わたしたちの {地球|ちきゅう}は 3ばんめだよ。",
          visual: { kind: "emoji", value: "🌍", caption: "{地球|ちきゅう}" },
        },
        {
          heading: "いちばん {大|おお}きい {惑星|わくせい}",
          body: "8つの なかで いちばん {大|おお}きいのは {木星|もくせい}、わ（リング）が きれいなのは {土星|どせい}だよ。",
          visual: { kind: "emoji", value: "🪐", caption: "{木星|もくせい}と {土星|どせい}" },
        },
      ],
    },
    test: { unitId: U.planets, questions: planetsQuestions, questionCount: 5 },
  },

  [U.proverbs]: {
    unitId: U.proverbs,
    learn: {
      unitId: U.proverbs,
      steps: [
        {
          heading: "ことわざって なに？",
          body: "むかしから つたわる、{教|おし}えや {知恵|ちえ}を みじかく まとめた {言葉|ことば}を「ことわざ」と いうよ。",
          visual: { kind: "emoji", value: "📜", caption: "ことわざ" },
        },
        {
          heading: "{動物|どうぶつ}が でて くる ことわざ",
          body: "「さるも {木|き}から おちる」は、{上手|じょうず}な {人|ひと}でも ときには しっぱいする、と いう いみだよ。",
          visual: { kind: "emoji", value: "🐒", caption: "さるも {木|き}から おちる" },
        },
        {
          heading: "{慣用句|かんようく}",
          body: "「{頭|あたま}が かたい」のように、いくつかの {言葉|ことば}を あわせて べつの いみを あらわす ものを「{慣用句|かんようく}」と いうよ。",
          visual: { kind: "emoji", value: "🗣️", caption: "{慣用句|かんようく}" },
        },
      ],
    },
    test: { unitId: U.proverbs, questions: proverbsQuestions, questionCount: 5 },
  },

  [U.nutrition]: {
    unitId: U.nutrition,
    learn: {
      unitId: U.nutrition,
      steps: [
        {
          heading: "{栄養|えいよう}の 3つの なかま",
          body: "{食|た}べものは はたらきで 3つに わけられるよ。からだを つくる（{赤|あか}）、エネルギーに なる（{黄|き}）、{調子|ちょうし}を ととのえる（みどり）。",
          visual: { kind: "emoji", value: "🍱", caption: "{赤|あか}・{黄|き}・みどり" },
        },
        {
          heading: "{赤|あか}の なかま",
          body: "にくや {魚|さかな}、たまご、まめは からだ（きんにくや {血|ち}）を つくる もとに なるよ。",
          visual: { kind: "emoji", value: "🍖🐟", caption: "{赤|あか}の なかま" },
        },
        {
          heading: "みどりの なかま",
          body: "やさいや くだものは ビタミンが おおく、からだの {調子|ちょうし}を ととのえて {病気|びょうき}を ふせぐよ。",
          visual: { kind: "emoji", value: "🥦🍎", caption: "みどりの なかま" },
        },
      ],
    },
    test: { unitId: U.nutrition, questions: nutritionQuestions, questionCount: 5 },
  },
};
