// ══════════════════════════════════════════
// カリキュラム: 教養（きょうよう / kyoyo）小2 ※拡張カテゴリ
// 基準テンプレ src/data/curriculum/sansuu/g1.ts と同形の export 構造。
// ID体系: 領域 = "kyoyo.<domain-slug>" / 単元 = "kyoyo.g<grade>.<slug>"
// 依存(prerequisites/leadsTo)は kyoyo.g2 内で自己完結（単独でも整合検査を通す）。
//
// 【表記規約】全表示テキストはルビ記法 {漢字|よみ} で執筆（全漢字にルビ）。
//   ひらがな/カタカナ/数字/記号はそのまま。送り仮名は基底に含めない（例: {食|た}べる）。
//
// 【申し送り（基盤TODO）】SubjectId union に "kyoyo" が未追加。
//   基盤確定時に src/types/drill.ts の SubjectId へ "kyoyo" を追加すること。
//   それまでは下の KYOYO 定数で局所的に string 経由の型吸収を行う（このファイル内に限定）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  SubjectId,
} from "@/types/curriculum";

// 局所吸収: "kyoyo" を SubjectId として扱う（基盤で union 追加後はこのキャストを外す）。
const KYOYO = "kyoyo" as string as SubjectId;

// ── 教科 ──────────────────────────────────

export const kyoyoSubject: Subject = {
  id: KYOYO,
  name: "きょうよう",
  formalName: "教養",
  emoji: "🌍",
  theme: "emerald",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域（scope-addition の教養Domain案に対応）──────────

export const kyoyoG2Domains: Domain[] = [
  { id: "kyoyo.money", subjectId: KYOYO, name: "お{金|かね}・くらし", formalName: "お金・暮らし" },
  { id: "kyoyo.world", subjectId: KYOYO, name: "{世界|せかい}の{国|くに}・{文化|ぶんか}", formalName: "世界の国・文化" },
  { id: "kyoyo.history", subjectId: KYOYO, name: "{偉人|いじん}・れきし", formalName: "偉人・歴史" },
  { id: "kyoyo.nature", subjectId: KYOYO, name: "しぜん・うちゅう", formalName: "自然・宇宙" },
  { id: "kyoyo.language", subjectId: KYOYO, name: "ことば・ことわざ", formalName: "言葉・ことわざ" },
  { id: "kyoyo.body", subjectId: KYOYO, name: "{体|からだ}・マナー", formalName: "体・マナー" },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（kyoyo.g2 内で自己完結）:
//   animals ─┬─▶ weather-season
//            └─▶ body-food ─▶ manners ◀─ money-basics
//
const U = {
  moneyBasics: "kyoyo.g2.money-basics",
  worldFlags: "kyoyo.g2.world-flags",
  inventions: "kyoyo.g2.inventions",
  animals: "kyoyo.g2.animals",
  weatherSeason: "kyoyo.g2.weather-season",
  proverbs: "kyoyo.g2.proverbs",
  bodyFood: "kyoyo.g2.body-food",
  manners: "kyoyo.g2.manners",
} as const;

export const kyoyoG2Units: Unit[] = [
  {
    id: U.moneyBasics,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.money",
    title: "お{金|かね}って{何|なに}？",
    order: 1,
    realWorldUse: "おかいものや おこづかいの{使|つか}いかたを かんがえる ときに{役|やく}に{立|た}つよ。",
    leadsTo: [U.manners],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.worldFlags,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.world",
    title: "{世界|せかい}の{国|くに}と{国旗|こっき}",
    order: 2,
    realWorldUse: "オリンピックや りょこうで、いろいろな{国|くに}を しる ときに{役|やく}に{立|た}つよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.inventions,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.history",
    title: "べんりな{発明|はつめい}",
    order: 3,
    realWorldUse: "まわりの どうぐが どうやって うまれたかを しると、ものづくりに きょうみが もてるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.animals,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.nature",
    title: "{動物|どうぶつ}の ひみつ",
    order: 4,
    realWorldUse: "どうぶつえんや そとで いきものを みる とき、もっと たのしく かんさつできるよ。",
    leadsTo: [U.weatherSeason, U.bodyFood],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.weatherSeason,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.nature",
    title: "{天気|てんき}と{季節|きせつ}",
    order: 5,
    realWorldUse: "あしたの{服|ふく}や もちものを じぶんで えらべるように なるよ。",
    leadsTo: [],
    prerequisites: [U.animals],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.proverbs,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.language",
    title: "ことわざ",
    order: 6,
    realWorldUse: "{気持|きも}ちや ようすを、みじかい ことばで うまく つたえられるように なるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.bodyFood,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.body",
    title: "{体|からだ}と{食|た}べ{物|もの}",
    order: 7,
    realWorldUse: "げんきに すごす ために、{食|た}べる ものを じぶんで かんがえられるように なるよ。",
    leadsTo: [U.manners],
    prerequisites: [U.animals],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.manners,
    subjectId: KYOYO,
    grade: 2,
    domainId: "kyoyo.body",
    title: "あいさつと マナー",
    order: 8,
    realWorldUse: "{家|いえ}・{学校|がっこう}・おみせで、まわりの{人|ひと}と きもちよく すごせるよ。",
    leadsTo: [],
    prerequisites: [U.moneyBasics, U.bodyFood],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 問題（全問 explanation 必須・4択・全文ルビ）─────────────

const moneyQuestions: ChoiceQuestion[] = [
  {
    id: `${U.moneyBasics}.q-1`,
    unitId: U.moneyBasics,
    prompt: "お{金|かね}は おもに{何|なに}の ために{使|つか}う？",
    explanation: "お{金|かね}は ほしい{物|もの}と こうかんする ための どうぐ だよ。",
    format: "choice",
    choices: ["{物|もの}と こうかんする ため", "{捨|す}てる ため", "なげる ため", "{隠|かく}す ため"],
    answer: "{物|もの}と こうかんする ため",
  },
  {
    id: `${U.moneyBasics}.q-2`,
    unitId: U.moneyBasics,
    prompt: "{日本|にほん}の{硬貨|こうか}で いちばん{高|たか}いのは どれ？",
    explanation: "{硬貨|こうか}（コイン）の{中|なか}で いちばん{高|たか}いのは 500{円|えん}だよ。",
    format: "choice",
    choices: ["500{円|えん}", "100{円|えん}", "10{円|えん}", "1{円|えん}"],
    answer: "500{円|えん}",
  },
  {
    id: `${U.moneyBasics}.q-3`,
    unitId: U.moneyBasics,
    prompt: "100{円|えん}の おかしを{買|か}って 500{円|えん}を{出|だ}すと、おつりは いくら？",
    explanation: "500ー100＝400。おつりは 400{円|えん}だよ。",
    format: "choice",
    choices: ["400{円|えん}", "100{円|えん}", "600{円|えん}", "500{円|えん}"],
    answer: "400{円|えん}",
  },
  {
    id: `${U.moneyBasics}.q-4`,
    unitId: U.moneyBasics,
    prompt: "「もったいない」に いちばん{近|ちか}い かんがえは どれ？",
    explanation: "もったいないは、{物|もの}を むだに しない{大切|たいせつ}な{心|こころ}だよ。",
    format: "choice",
    choices: ["{物|もの}を{大切|たいせつ}に{使|つか}う", "すぐ{捨|す}てる", "たくさん こわす", "ぜんぶ なくす"],
    answer: "{物|もの}を{大切|たいせつ}に{使|つか}う",
  },
  {
    id: `${U.moneyBasics}.q-5`,
    unitId: U.moneyBasics,
    prompt: "お{金|かね}が なかった むかし、{人|ひと}は どうやって{物|もの}を{手|て}に{入|い}れた？",
    explanation: "むかしは{物々交換|ぶつぶつこうかん}（{物|もの}と{物|もの}の こうかん）を していたよ。",
    format: "choice",
    choices: ["{物|もの}どうしを こうかんした", "ひろった", "つくらなかった", "ねむった"],
    answer: "{物|もの}どうしを こうかんした",
  },
];

const worldQuestions: ChoiceQuestion[] = [
  {
    id: `${U.worldFlags}.q-1`,
    unitId: U.worldFlags,
    prompt: "{日本|にほん}の{国旗|こっき}の もようは どれ？",
    explanation: "{日本|にほん}の{国旗|こっき}は「{日|ひ}の{丸|まる}」。{白地|しろじ}に{赤|あか}い まるだよ。",
    format: "choice",
    choices: ["{白|しろ}に{赤|あか}い まる", "{星|ほし}と しま", "みどりの{木|き}", "{青|あお}と{白|しろ}"],
    answer: "{白|しろ}に{赤|あか}い まる",
  },
  {
    id: `${U.worldFlags}.q-2`,
    unitId: U.worldFlags,
    prompt: "えいごで「こんにちは」は どれ？",
    explanation: "えいごの あいさつは「ハロー」だよ。",
    format: "choice",
    choices: ["ハロー", "ボンジュール", "ニーハオ", "アンニョン"],
    answer: "ハロー",
  },
  {
    id: `${U.worldFlags}.q-3`,
    unitId: U.worldFlags,
    prompt: "{世界|せかい}に{国|くに}は およそ いくつ ある？",
    explanation: "{世界|せかい}には 190いじょうの{国|くに}が あるよ。",
    format: "choice",
    choices: ["190いじょう", "10ぐらい", "2つ", "1000まん"],
    answer: "190いじょう",
  },
  {
    id: `${U.worldFlags}.q-4`,
    unitId: U.worldFlags,
    prompt: "アメリカの{国旗|こっき}に ある もようは どれ？",
    explanation: "アメリカの{国旗|こっき}は{星|ほし}と しまもよう（{星条旗|せいじょうき}）だよ。",
    format: "choice",
    choices: ["{星|ほし}と しま", "{日|ひ}の{丸|まる}", "{月|つき}", "ぞう"],
    answer: "{星|ほし}と しま",
  },
  {
    id: `${U.worldFlags}.q-5`,
    unitId: U.worldFlags,
    prompt: "ちがう{国|くに}の{人|ひと}と なかよく する ために{大切|たいせつ}なのは？",
    explanation: "ことばや{文化|ぶんか}の ちがいを みとめあうと なかよく できるよ。",
    format: "choice",
    choices: ["ちがいを みとめあう", "むしする", "わらう", "おこる"],
    answer: "ちがいを みとめあう",
  },
];

const inventionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.inventions}.q-1`,
    unitId: U.inventions,
    prompt: "{電球|でんきゅう}を じっさいに{使|つか}えるように した{人|ひと}は だれ？",
    explanation: "エジソンは{電球|でんきゅう}など たくさんの{発明|はつめい}を したよ。",
    format: "choice",
    choices: ["エジソン", "ニュートン", "ピカソ", "モーツァルト"],
    answer: "エジソン",
  },
  {
    id: `${U.inventions}.q-2`,
    unitId: U.inventions,
    prompt: "{発明|はつめい}の せつめいに いちばん{近|ちか}いのは？",
    explanation: "{発明|はつめい}は くらしを べんりに する あたらしい かんがえだよ。",
    format: "choice",
    choices: ["べんりな どうぐを かんがえだす", "{物|もの}を こわす", "ねる", "あそぶ"],
    answer: "べんりな どうぐを かんがえだす",
  },
  {
    id: `${U.inventions}.q-3`,
    unitId: U.inventions,
    prompt: "{電気|でんき}が なかった むかし、よるの あかりに{使|つか}っていたのは？",
    explanation: "{電気|でんき}が ない{時代|じだい}は{火|ひ}（ろうそくなど）で あかりを とっていたよ。",
    format: "choice",
    choices: ["{火|ひ}", "スマホ", "{電気|でんき}", "たいよう"],
    answer: "{火|ひ}",
  },
  {
    id: `${U.inventions}.q-4`,
    unitId: U.inventions,
    prompt: "つぎの うち「{人|ひと}が{発明|はつめい}した どうぐ」は どれ？",
    explanation: "{電話|でんわ}は{人|ひと}が{発明|はつめい}した どうぐ。{雲|くも}や{山|やま}は しぜんの ものだよ。",
    format: "choice",
    choices: ["{電話|でんわ}", "{雲|くも}", "{山|やま}", "{雨|あめ}"],
    answer: "{電話|でんわ}",
  },
  {
    id: `${U.inventions}.q-5`,
    unitId: U.inventions,
    prompt: "{発明|はつめい}は わたしたちの くらしを どう する？",
    explanation: "{発明|はつめい}は くらしを より べんりで ゆたかに してくれるよ。",
    format: "choice",
    choices: ["べんりに する", "つまらなく する", "くらく する", "へらす"],
    answer: "べんりに する",
  },
];

const animalQuestions: ChoiceQuestion[] = [
  {
    id: `${U.animals}.q-1`,
    unitId: U.animals,
    prompt: "くさや{葉|は}を{食|た}べる{動物|どうぶつ}を{何|なに}と いう？",
    explanation: "くさや{葉|は}を{食|た}べる{動物|どうぶつ}を{草食|そうしょく}どうぶつと いうよ。",
    format: "choice",
    choices: ["{草食|そうしょく}どうぶつ", "{肉食|にくしょく}どうぶつ", "{魚|さかな}", "とり"],
    answer: "{草食|そうしょく}どうぶつ",
  },
  {
    id: `${U.animals}.q-2`,
    unitId: U.animals,
    prompt: "ライオンは おもに{何|なに}を{食|た}べる？",
    explanation: "ライオンは{肉|にく}を{食|た}べる{肉食|にくしょく}どうぶつだよ。",
    format: "choice",
    choices: ["{肉|にく}", "くさ", "{石|いし}", "かみ"],
    answer: "{肉|にく}",
  },
  {
    id: `${U.animals}.q-3`,
    unitId: U.animals,
    prompt: "カメが{身|み}を{守|まも}る ために{使|つか}うのは？",
    explanation: "カメは かたい こうらの{中|なか}に{体|からだ}を かくして{守|まも}るよ。",
    format: "choice",
    choices: ["こうら", "つばさ", "とげ", "どく"],
    answer: "こうら",
  },
  {
    id: `${U.animals}.q-4`,
    unitId: U.animals,
    prompt: "つぎの うち うみで くらす{動物|どうぶつ}は どれ？",
    explanation: "イルカは うみで くらす{動物|どうぶつ}だよ。",
    format: "choice",
    choices: ["イルカ", "ぞう", "きりん", "らくだ"],
    answer: "イルカ",
  },
  {
    id: `${U.animals}.q-5`,
    unitId: U.animals,
    prompt: "{動物|どうぶつ}が とげや こうらを もつのは{何|なに}の ため？",
    explanation: "てきから{身|み}を{守|まも}る ための くふうだよ。",
    format: "choice",
    choices: ["{身|み}を{守|まも}る ため", "あそぶ ため", "とぶ ため", "ねむる ため"],
    answer: "{身|み}を{守|まも}る ため",
  },
];

const weatherQuestions: ChoiceQuestion[] = [
  {
    id: `${U.weatherSeason}.q-1`,
    unitId: U.weatherSeason,
    prompt: "さくらが さく{季節|きせつ}は どれ？",
    explanation: "さくらは{春|はる}に さく{花|はな}だよ。",
    format: "choice",
    choices: ["{春|はる}", "{夏|なつ}", "{秋|あき}", "{冬|ふゆ}"],
    answer: "{春|はる}",
  },
  {
    id: `${U.weatherSeason}.q-2`,
    unitId: U.weatherSeason,
    prompt: "ゆきが ふる ことが おおい{季節|きせつ}は どれ？",
    explanation: "{冬|ふゆ}は さむくて ゆきが ふることが あるよ。",
    format: "choice",
    choices: ["{冬|ふゆ}", "{春|はる}", "{夏|なつ}", "{秋|あき}"],
    answer: "{冬|ふゆ}",
  },
  {
    id: `${U.weatherSeason}.q-3`,
    unitId: U.weatherSeason,
    prompt: "そらに くろい{雲|くも}が ふえると、つぎに くる ことが おおい{天気|てんき}は？",
    explanation: "くろい{雲|くも}が ふえると あめが ふりやすく なるよ。",
    format: "choice",
    choices: ["あめ", "かいせい", "にじ", "ほし"],
    answer: "あめ",
  },
  {
    id: `${U.weatherSeason}.q-4`,
    unitId: U.weatherSeason,
    prompt: "{葉|は}っぱが あかや きいろに なる{季節|きせつ}は どれ？",
    explanation: "{秋|あき}には{葉|は}が あかや きいろに かわる（こうよう）よ。",
    format: "choice",
    choices: ["{秋|あき}", "{春|はる}", "{夏|なつ}", "{冬|ふゆ}"],
    answer: "{秋|あき}",
  },
  {
    id: `${U.weatherSeason}.q-5`,
    unitId: U.weatherSeason,
    prompt: "{日本|にほん}の{季節|きせつ}は ぜんぶで いくつ？",
    explanation: "{春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ}の 4つだよ。",
    format: "choice",
    choices: ["4つ", "2つ", "1つ", "10"],
    answer: "4つ",
  },
];

const proverbQuestions: ChoiceQuestion[] = [
  {
    id: `${U.proverbs}.q-1`,
    unitId: U.proverbs,
    prompt: "「{猿|さる}も{木|き}から{落|お}ちる」の いみは どれ？",
    explanation: "{得意|とくい}な{人|ひと}でも ときには しっぱいする、という ことわざだよ。",
    format: "choice",
    choices: ["{上手|じょうず}な{人|ひと}でも しっぱいする", "{猿|さる}は{木|き}が きらい", "{木|き}は たかい", "おちると いたい"],
    answer: "{上手|じょうず}な{人|ひと}でも しっぱいする",
  },
  {
    id: `${U.proverbs}.q-2`,
    unitId: U.proverbs,
    prompt: "「{急|いそ}がば まわれ」の いみに{近|ちか}いのは？",
    explanation: "{急|いそ}ぐ ときほど あわてず かくじつな ほうほうが よい、という いみ。",
    format: "choice",
    choices: ["{急|いそ}ぐ ときほど あんぜんな{道|みち}を", "はやく はしる", "まわって あそぶ", "とまる"],
    answer: "{急|いそ}ぐ ときほど あんぜんな{道|みち}を",
  },
  {
    id: `${U.proverbs}.q-3`,
    unitId: U.proverbs,
    prompt: "ことわざは どんな ことば？",
    explanation: "ことわざは むかしの{人|ひと}の ちえや きょうくんを みじかく したものだよ。",
    format: "choice",
    choices: ["むかしから つたわる ちえの ことば", "あたらしい うた", "がいこくの なまえ", "かずの ことば"],
    answer: "むかしから つたわる ちえの ことば",
  },
  {
    id: `${U.proverbs}.q-4`,
    unitId: U.proverbs,
    prompt: "「ちりも つもれば{山|やま}と なる」の いみは どれ？",
    explanation: "ほんの すこしでも つみかさねれば おおきな ものに なる、という いみ。",
    format: "choice",
    choices: ["すこしずつでも つづければ おおきく なる", "ちりは きたない", "{山|やま}は たかい", "つもると さむい"],
    answer: "すこしずつでも つづければ おおきく なる",
  },
  {
    id: `${U.proverbs}.q-5`,
    unitId: U.proverbs,
    prompt: "「{花|はな}より だんご」に いちばん{近|ちか}い いみは？",
    explanation: "うつくしさより じっさいに やくだつ ほうを えらぶ、という いみだよ。",
    format: "choice",
    choices: ["みためより{役|やく}に{立|た}つ ものが よい", "{花|はな}が すき", "だんごは あまい", "{春|はる}が すき"],
    answer: "みためより{役|やく}に{立|た}つ ものが よい",
  },
];

const bodyFoodQuestions: ChoiceQuestion[] = [
  {
    id: `${U.bodyFood}.q-1`,
    unitId: U.bodyFood,
    prompt: "{血|ち}を{体|からだ}じゅうに{送|おく}る ぶぶんは どれ？",
    explanation: "{心臓|しんぞう}は ポンプの ように{血|ち}を{送|おく}っているよ。",
    format: "choice",
    choices: ["{心臓|しんぞう}", "{目|め}", "{耳|みみ}", "かみ"],
    answer: "{心臓|しんぞう}",
  },
  {
    id: `${U.bodyFood}.q-2`,
    unitId: U.bodyFood,
    prompt: "いきを する（こきゅう）ぶぶんは どれ？",
    explanation: "{肺|はい}で いきを すって、さんそを とりこむよ。",
    format: "choice",
    choices: ["{肺|はい}", "{胃|い}", "あし", "て"],
    answer: "{肺|はい}",
  },
  {
    id: `${U.bodyFood}.q-3`,
    unitId: U.bodyFood,
    prompt: "{体|からだ}を つくる もとに なる{食|た}べ{物|もの}は どれ？",
    explanation: "{肉|にく}・{魚|さかな}・たまごなどは{体|からだ}（きんにくなど）を つくる もとだよ。",
    format: "choice",
    choices: ["{肉|にく}や{魚|さかな}", "あめ", "ジュース", "ガム"],
    answer: "{肉|にく}や{魚|さかな}",
  },
  {
    id: `${U.bodyFood}.q-4`,
    unitId: U.bodyFood,
    prompt: "{体|からだ}の ちょうしを ととのえる{食|た}べ{物|もの}は どれ？",
    explanation: "やさいや くだものは{体|からだ}の ちょうしを ととのえる はたらきが あるよ。",
    format: "choice",
    choices: ["やさい", "チョコ", "あぶら", "さとう"],
    answer: "やさい",
  },
  {
    id: `${U.bodyFood}.q-5`,
    unitId: U.bodyFood,
    prompt: "げんきな{体|からだ}の ために いちばん よい{食|た}べかたは？",
    explanation: "いろいろな ものを バランスよく{食|た}べると げんきに なるよ。",
    format: "choice",
    choices: ["バランスよく いろいろ{食|た}べる", "すきな ものだけ", "{食|た}べない", "おかしだけ"],
    answer: "バランスよく いろいろ{食|た}べる",
  },
];

const mannerQuestions: ChoiceQuestion[] = [
  {
    id: `${U.manners}.q-1`,
    unitId: U.manners,
    prompt: "あさ あった{時|とき}の あいさつは どれ？",
    explanation: "あさの あいさつは「おはよう」だよ。",
    format: "choice",
    choices: ["おはよう", "おやすみ", "ごめんなさい", "さようなら"],
    answer: "おはよう",
  },
  {
    id: `${U.manners}.q-2`,
    unitId: U.manners,
    prompt: "{助|たす}けて もらった{時|とき}に いう ことばは どれ？",
    explanation: "かんしゃの{気持|きも}ちは「ありがとう」で つたえるよ。",
    format: "choice",
    choices: ["ありがとう", "いやだ", "しらない", "だめ"],
    answer: "ありがとう",
  },
  {
    id: `${U.manners}.q-3`,
    unitId: U.manners,
    prompt: "ごはんを{食|た}べる まえに いう ことばは どれ？",
    explanation: "{食|た}べる まえは「いただきます」と いって かんしゃするよ。",
    format: "choice",
    choices: ["いただきます", "ごちそうさま", "おやすみ", "ただいま"],
    answer: "いただきます",
  },
  {
    id: `${U.manners}.q-4`,
    unitId: U.manners,
    prompt: "{人|ひと}が ならんでいる{時|とき}、どうするのが よい？",
    explanation: "じゅんばんを まもると みんなが きもちよく すごせるよ。",
    format: "choice",
    choices: ["じゅんばんを まもる", "わりこむ", "おす", "はしる"],
    answer: "じゅんばんを まもる",
  },
  {
    id: `${U.manners}.q-5`,
    unitId: U.manners,
    prompt: "マナーの もとに なる{気持|きも}ちは どれ？",
    explanation: "まわりの{人|ひと}を おもう{気持|きも}ちが マナーの もとだよ。",
    format: "choice",
    choices: ["{相手|あいて}を おもう{気持|きも}ち", "じぶんだけの{気持|きも}ち", "いそぐ{気持|きも}ち", "おこる{気持|きも}ち"],
    answer: "{相手|あいて}を おもう{気持|きも}ち",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test）────────────

export const kyoyoG2Contents: Record<string, UnitContent> = {
  [U.moneyBasics]: {
    unitId: U.moneyBasics,
    learn: {
      unitId: U.moneyBasics,
      steps: [
        {
          heading: "お{金|かね}は{何|なに}に{使|つか}う？",
          body: "お{金|かね}は、ほしい{物|もの}や{食|た}べ{物|もの}と こうかんする ための どうぐだよ。",
          visual: { kind: "emoji", value: "💰", caption: "お{金|かね}" },
        },
        {
          heading: "{硬貨|こうか}と おさつ",
          body: "{日本|にほん}の お{金|かね}には 1・5・10・50・100・500{円|えん}の{硬貨|こうか}と、1000・5000・10000{円|えん}の おさつが あるよ。",
          visual: { kind: "emoji", value: "🪙💴", caption: "コインと おさつ" },
        },
        {
          heading: "もったいないの{心|こころ}",
          body: "{物|もの}を{大切|たいせつ}に{使|つか}うと、お{金|かね}も しげんも むだに ならないよ。",
          visual: { kind: "emoji", value: "♻️", caption: "{大切|たいせつ}に{使|つか}う" },
        },
      ],
    },
    test: { unitId: U.moneyBasics, questions: moneyQuestions, questionCount: 5 },
  },

  [U.worldFlags]: {
    unitId: U.worldFlags,
    learn: {
      unitId: U.worldFlags,
      steps: [
        {
          heading: "{世界|せかい}には たくさんの{国|くに}",
          body: "{地球|ちきゅう}には 190いじょうの{国|くに}が あるよ。それぞれ ちがう ことばや{文化|ぶんか}が あるんだ。",
          visual: { kind: "emoji", value: "🌍", caption: "ちきゅう" },
        },
        {
          heading: "{国旗|こっき}は{国|くに}の しるし",
          body: "それぞれの{国|くに}には{国旗|こっき}が あるよ。{日本|にほん}の{国旗|こっき}は{白|しろ}に{赤|あか}い まる（{日|ひ}の{丸|まる}）だね。",
          visual: { kind: "emoji", value: "🇯🇵", caption: "{日|ひ}の{丸|まる}" },
        },
        {
          heading: "あいさつも いろいろ",
          body: "えいごは「ハロー」、フランスごは「ボンジュール」。{国|くに}に よって あいさつも ちがうよ。",
          visual: { kind: "emoji", value: "👋", caption: "{世界|せかい}の あいさつ" },
        },
      ],
    },
    test: { unitId: U.worldFlags, questions: worldQuestions, questionCount: 5 },
  },

  [U.inventions]: {
    unitId: U.inventions,
    learn: {
      unitId: U.inventions,
      steps: [
        {
          heading: "{発明|はつめい}って{何|なに}？",
          body: "くらしを べんりに する あたらしい どうぐや しくみを かんがえだす ことを{発明|はつめい}と いうよ。",
          visual: { kind: "emoji", value: "💡", caption: "あたらしい かんがえ" },
        },
        {
          heading: "{電気|でんき}の あかり",
          body: "むかしは{火|ひ}で あかりを とっていたけど、エジソンが{電球|でんきゅう}を{使|つか}えるように して、よるも あかるく なったよ。",
          visual: { kind: "emoji", value: "💡", caption: "{電球|でんきゅう}" },
        },
        {
          heading: "{今|いま}も つづく{発明|はつめい}",
          body: "{電話|でんわ}や じどうしゃ、コンピュータも{発明|はつめい}。{今|いま}も あたらしい{物|もの}が うまれているよ。",
          visual: { kind: "emoji", value: "🚗", caption: "いろいろな{発明|はつめい}" },
        },
      ],
    },
    test: { unitId: U.inventions, questions: inventionQuestions, questionCount: 5 },
  },

  [U.animals]: {
    unitId: U.animals,
    learn: {
      unitId: U.animals,
      steps: [
        {
          heading: "{動物|どうぶつ}の すみか",
          body: "{動物|どうぶつ}は、うみ・やま・もりなど、すみやすい ばしょで くらしているよ。",
          visual: { kind: "emoji", value: "🐾", caption: "いろいろな すみか" },
        },
        {
          heading: "{食|た}べ{物|もの}の ちがい",
          body: "うさぎは くさを{食|た}べる「{草食|そうしょく}」、ライオンは{肉|にく}を{食|た}べる「{肉食|にくしょく}」だよ。",
          visual: { kind: "emoji", value: "🦁🐰", caption: "{肉食|にくしょく}と{草食|そうしょく}" },
        },
        {
          heading: "{身|み}を{守|まも}る くふう",
          body: "ハリネズミは とげ、カメは こうらで{身|み}を{守|まも}るよ。{動物|どうぶつ}は いきのこる くふうを もっているんだ。",
          visual: { kind: "emoji", value: "🐢", caption: "こうらで{守|まも}る" },
        },
      ],
    },
    test: { unitId: U.animals, questions: animalQuestions, questionCount: 5 },
  },

  [U.weatherSeason]: {
    unitId: U.weatherSeason,
    learn: {
      unitId: U.weatherSeason,
      steps: [
        {
          heading: "4つの{季節|きせつ}",
          body: "{日本|にほん}には{春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ}の 4つの{季節|きせつ}が あるよ。",
          visual: { kind: "emoji", value: "🌸☀️🍁⛄", caption: "{春|はる}{夏|なつ}{秋|あき}{冬|ふゆ}" },
        },
        {
          heading: "{天気|てんき}の しゅるい",
          body: "はれ・くもり・あめ・ゆき。そらの ようすで{天気|てんき}が かわるよ。",
          visual: { kind: "emoji", value: "⛅", caption: "そらの ようす" },
        },
        {
          heading: "{季節|きせつ}で かわる くらし",
          body: "{夏|なつ}は あつくて{海|うみ}、{冬|ふゆ}は さむくて あったかい{服|ふく}。{季節|きせつ}で すごしかたが かわるね。",
          visual: { kind: "emoji", value: "🧥", caption: "{季節|きせつ}の{服|ふく}" },
        },
      ],
    },
    test: { unitId: U.weatherSeason, questions: weatherQuestions, questionCount: 5 },
  },

  [U.proverbs]: {
    unitId: U.proverbs,
    learn: {
      unitId: U.proverbs,
      steps: [
        {
          heading: "ことわざって{何|なに}？",
          body: "むかしから つたわる、{生活|せいかつ}の ちえや きょうくんを みじかく あらわした ことばだよ。",
          visual: { kind: "emoji", value: "📜", caption: "ちえの ことば" },
        },
        {
          heading: "どうぶつの ことわざ",
          body: "「{猿|さる}も{木|き}から{落|お}ちる」は、{上手|じょうず}な{人|ひと}でも しっぱいする ことが ある、という いみだよ。",
          visual: { kind: "emoji", value: "🐒", caption: "{猿|さる}も{木|き}から{落|お}ちる" },
        },
        {
          heading: "つかってみよう",
          body: "ことわざを しると、{気持|きも}ちや ようすを みじかく うまく つたえられるよ。",
          visual: { kind: "emoji", value: "💬", caption: "つたえる ちから" },
        },
      ],
    },
    test: { unitId: U.proverbs, questions: proverbQuestions, questionCount: 5 },
  },

  [U.bodyFood]: {
    unitId: U.bodyFood,
    learn: {
      unitId: U.bodyFood,
      steps: [
        {
          heading: "{体|からだ}の しくみ",
          body: "{心臓|しんぞう}は{血|ち}を{送|おく}る ポンプ、{肺|はい}は いきを する ところ。{体|からだ}は たくさんの ぶぶんで はたらいているよ。",
          visual: { kind: "emoji", value: "🫀", caption: "{心臓|しんぞう}" },
        },
        {
          heading: "{食|た}べ{物|もの}の{力|ちから}",
          body: "ごはんは げんき（エネルギー）、{肉|にく}や{魚|さかな}は{体|からだ}を つくり、やさいは{体|からだ}の ちょうしを ととのえるよ。",
          visual: { kind: "emoji", value: "🍚🥦", caption: "いろいろな{食|た}べ{物|もの}" },
        },
        {
          heading: "バランスよく{食|た}べよう",
          body: "すきな ものだけでなく、いろいろな ものを{食|た}べると{体|からだ}が げんきに なるよ。",
          visual: { kind: "emoji", value: "🍱", caption: "バランス ごはん" },
        },
      ],
    },
    test: { unitId: U.bodyFood, questions: bodyFoodQuestions, questionCount: 5 },
  },

  [U.manners]: {
    unitId: U.manners,
    learn: {
      unitId: U.manners,
      steps: [
        {
          heading: "あいさつは{心|こころ}の とびら",
          body: "「おはよう」「ありがとう」「ごめんなさい」。あいさつは{人|ひと}と なかよく する はじめの{一歩|いっぽ}だよ。",
          visual: { kind: "emoji", value: "👋", caption: "あいさつ" },
        },
        {
          heading: "{食事|しょくじ}の マナー",
          body: "「いただきます」「ごちそうさま」。{食|た}べ{物|もの}や つくってくれた{人|ひと}へ かんしゃの{気持|きも}ちを つたえよう。",
          visual: { kind: "emoji", value: "🍽️", caption: "{食事|しょくじ}の あいさつ" },
        },
        {
          heading: "{相手|あいて}を おもう こと",
          body: "じゅんばんを まもる、しずかに する。まわりの{人|ひと}を おもう{気持|きも}ちが マナーの もとだよ。",
          visual: { kind: "emoji", value: "🤝", caption: "おもいやり" },
        },
      ],
    },
    test: { unitId: U.manners, questions: mannerQuestions, questionCount: 5 },
  },
};
