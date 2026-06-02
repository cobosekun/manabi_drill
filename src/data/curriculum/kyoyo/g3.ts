// ══════════════════════════════════════════
// カリキュラム: 教養（きょうよう / kyoyo）小3
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>" / 問題 = "<unitId>.q-<n>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
//
// ── 表記規約（ruby-convention）──
// 全ての表示テキスト（title / name / prompt / choices / explanation / heading /
// body / caption / realWorldUse 等）は漢字まじり＋全漢字ルビ記法 {漢字|よみ} で執筆する。
// ひらがな・カタカナ・数字・記号はそのまま。RubyText レンダラが描画時に解決する。
//
// ── 申し送り（中央へ）──
// SubjectId union に "kyoyo" がまだ無い（scope-addition-kyoyo-oyo.md でデータモデル拡張予定）。
// 当面この1箇所のキャストで局所吸収する。union に "kyoyo" 追加後は `as unknown as SubjectId`
// を外して `const KYOYO: SubjectId = "kyoyo"` に戻せる。
// 領域 slug（money-life / world-culture / people-history / nature-space /
// language-saying / body-manner）は並行作成中の kyoyo/g1.ts と揃える前提。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  Question,
  SubjectId,
} from "@/types/curriculum";

// 申し送り: SubjectId 未拡張のため局所吸収（中央拡張後に解消）。
const KYOYO: SubjectId = "kyoyo";

// ── 教科 ──────────────────────────────────
// ※ 教科定義は学年間で共有される単一の真実。集約(index)側で重複排除する前提。

export const kyoyoSubject: Subject = {
  id: KYOYO,
  name: "{教養|きょうよう}",
  formalName: "教養",
  emoji: "🌍",
  theme: "emerald",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// scope-addition の6領域案に対応（slug は g1 と統一する前提）。

export const kyoyoG3Domains: Domain[] = [
  {
    id: "kyoyo.money-life",
    subjectId: KYOYO,
    name: "おかね・くらし",
    formalName: "お金と暮らし",
  },
  {
    id: "kyoyo.world-culture",
    subjectId: KYOYO,
    name: "せかいの{国|くに}・{文化|ぶんか}",
    formalName: "世界の国・文化",
  },
  {
    id: "kyoyo.people-history",
    subjectId: KYOYO,
    name: "いじん・れきし",
    formalName: "偉人・歴史",
  },
  {
    id: "kyoyo.nature-space",
    subjectId: KYOYO,
    name: "しぜん・うちゅう",
    formalName: "自然・宇宙",
  },
  {
    id: "kyoyo.language-saying",
    subjectId: KYOYO,
    name: "ことば・ことわざ",
    formalName: "言葉・ことわざ",
  },
  {
    id: "kyoyo.body-manner",
    subjectId: KYOYO,
    name: "からだ・マナー",
    formalName: "体・マナー",
  },
  // 【新領域 2026-06-03 CEO直轄】きまり・ほうりつ（重複定義OK・index 側で id 重複排除）
  {
    id: "kyoyo.rules-law",
    subjectId: "kyoyo",
    name: "きまり・ほうりつ",
    formalName: "きまり・法律",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし。g3内で自己完結）:
//
//   money-role ──▶ mottainai-sdgs
//   weather-season ──▶ planets
//   body-nutrition ──▶ manners
//   flags-countries / inventors / proverbs（独立）
//
const U = {
  moneyRole: "kyoyo.g3.money-role",
  mottainai: "kyoyo.g3.mottainai-sdgs",
  flags: "kyoyo.g3.flags-countries",
  inventors: "kyoyo.g3.inventors",
  weather: "kyoyo.g3.weather-season",
  planets: "kyoyo.g3.planets",
  proverbs: "kyoyo.g3.proverbs",
  body: "kyoyo.g3.body-nutrition",
  manners: "kyoyo.g3.manners",
} as const;

export const kyoyoG3Units: Unit[] = [
  {
    id: U.moneyRole,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.money-life",
    title: "{お金|おかね}の{役割|やくわり}とねだん",
    order: 1,
    realWorldUse: "{買|か}い{物|もの}をするときや、おこづかいを{計画|けいかく}{的|てき}に{使|つか}うときに{役立|やくだ}つよ。",
    leadsTo: [U.mottainai],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.mottainai,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.money-life",
    title: "もったいないとSDGs",
    order: 2,
    realWorldUse: "ごみをへらしたり、{水|みず}や{電気|でんき}をむだにしない くらしの くふうに つながるよ。",
    leadsTo: [],
    prerequisites: [U.moneyRole],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.flags,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.world-culture",
    title: "{世界|せかい}の{国|くに}と{国旗|こっき}",
    order: 3,
    realWorldUse: "オリンピックや{世界|せかい}の ニュースを{見|み}るときに、{国|くに}や{国旗|こっき}が わかると たのしいよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.inventors,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.people-history",
    title: "{昔|むかし}の{偉人|いじん}と{発明|はつめい}",
    order: 4,
    realWorldUse: "{今|いま}つかっている{便利|べんり}な{道具|どうぐ}が だれの おかげかを{知|し}ると、{物|もの}を{大切|たいせつ}にできるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.weather,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.nature-space",
    title: "{天気|てんき}と{季節|きせつ}のしくみ",
    order: 5,
    realWorldUse: "あしたの{天気|てんき}を{予想|よそう}して、おでかけや せんたくの{計画|けいかく}を{立|た}てるのに{役立|やくだ}つよ。",
    leadsTo: [U.planets],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.planets,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.nature-space",
    title: "{惑星|わくせい}と{宇宙|うちゅう}",
    order: 6,
    realWorldUse: "{夜空|よぞら}の ほしや{月|つき}を{見|み}たり、ロケットの ニュースを{楽|たの}しむときに{役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [U.weather],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.proverbs,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.language-saying",
    title: "ことわざと{四字熟語|よじじゅくご}",
    order: 7,
    realWorldUse: "{気持|きも}ちや できごとを みじかいことばで うまく{言|い}いあらわすときに{使|つか}えるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.body,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.body-manner",
    title: "{体|からだ}のしくみと{栄養|えいよう}",
    order: 8,
    realWorldUse: "{元気|げんき}にすごすために、バランスよく{食|た}べる くふうを じぶんで かんがえられるよ。",
    leadsTo: [U.manners],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.manners,
    subjectId: KYOYO,
    grade: 3,
    domainId: "kyoyo.body-manner",
    title: "あいさつとマナー",
    order: 9,
    realWorldUse: "{家|いえ}や{学校|がっこう}、でんしゃの{中|なか}など、まわりの{人|ひと}と{気持|きも}ちよく すごすのに{役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [U.body],
    hasLearn: true,
    hasTest: true,
  },
  // 【新領域】きまり・ほうりつ（g3: ほうりつって なに / しゃかいの ルール。依存は g3 内で完結）
  {
    id: "kyoyo.g3.what-is-law",
    subjectId: "kyoyo",
    grade: 3,
    domainId: "kyoyo.rules-law",
    title: "ほうりつって なに？",
    order: 10,
    realWorldUse: "「やって よいこと・いけないこと」を{知|し}って、{安心|あんしん}して くらす ために{役立|やくだ}つよ。",
    leadsTo: ["kyoyo.g3.social-rules"],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: "kyoyo.g3.social-rules",
    subjectId: "kyoyo",
    grade: 3,
    domainId: "kyoyo.rules-law",
    title: "しゃかいの ルール",
    order: 11,
    realWorldUse: "でんしゃや みせ など、しらない{人|ひと}も いる ばしょで みんなが こまらない ために{役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: ["kyoyo.g3.what-is-law"],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 各単元の固定問題（全問 explanation 必須・全テキスト ルビ記法） ──────────────

const moneyRoleQuestions: Question[] = [
  {
    id: `${U.moneyRole}.q-1`,
    unitId: U.moneyRole,
    prompt: "{お金|おかね}の いちばん{大切|たいせつ}な{役割|やくわり}は どれ？",
    explanation: "{お金|おかね}は ほしい{物|もの}と{交換|こうかん}するための{道具|どうぐ}だよ。だから「{物|もの}と{交換|こうかん}できる」が{答|こた}え。",
    format: "choice",
    choices: ["{物|もの}と{交換|こうかん}できる", "{重|おも}くて かたい", "ひかって きれい", "あつめて かざる"],
    answer: "{物|もの}と{交換|こうかん}できる",
  },
  {
    id: `${U.moneyRole}.q-2`,
    unitId: U.moneyRole,
    prompt: "むかし、{お金|おかね}の かわりに{使|つか}われていた{物|もの}は？",
    explanation: "{大昔|おおむかし}は{貝|かい}や{米|こめ}を{お金|おかね}の かわりに{使|つか}っていたんだよ。",
    format: "choice",
    choices: ["{貝|かい}や{米|こめ}", "プラスチック", "ガラス", "ゴム"],
    answer: "{貝|かい}や{米|こめ}",
  },
  {
    id: `${U.moneyRole}.q-3`,
    unitId: U.moneyRole,
    prompt: "ねだんが{高|たか}くなりやすいのは どんな{物|もの}？",
    explanation: "{作|つく}るのが{大変|たいへん}で、ほしい{人|ひと}が{多|おお}い（{人気|にんき}な）{物|もの}ほど ねだんは{高|たか}くなりやすいよ。",
    format: "choice",
    choices: ["{作|つく}るのが{大変|たいへん}で{人気|にんき}な{物|もの}", "どこにでも たくさん ある{物|もの}", "{古|ふる}くなった{物|もの}", "{軽|かる}い{物|もの}"],
    answer: "{作|つく}るのが{大変|たいへん}で{人気|にんき}な{物|もの}",
  },
  {
    id: `${U.moneyRole}.q-4`,
    unitId: U.moneyRole,
    prompt: "{お金|おかね}を{使|つか}わずに ためておくことを なんという？",
    explanation: "あとで{使|つか}うために{お金|おかね}を ためておくことを「{貯金|ちょきん}」というよ。",
    format: "choice",
    choices: ["{貯金|ちょきん}", "{買|か}い{物|もの}", "{交換|こうかん}", "{両替|りょうがえ}"],
    answer: "{貯金|ちょきん}",
  },
  {
    id: `${U.moneyRole}.q-5`,
    unitId: U.moneyRole,
    prompt: "{計画|けいかく}を{立|た}てずに{お金|おかね}を{使|つか}うと どうなりやすい？",
    explanation: "かんがえずに{使|つか}うと、すぐに たりなくなって こまってしまうよ。{計画|けいかく}が{大切|たいせつ}。",
    format: "choice",
    choices: ["たりなくなって こまる", "もっと ふえる", "なにも かわらない", "{物|もの}が{安|やす}くなる"],
    answer: "たりなくなって こまる",
  },
];

const mottainaiQuestions: Question[] = [
  {
    id: `${U.mottainai}.q-1`,
    unitId: U.mottainai,
    prompt: "「もったいない」は どんな{気持|きも}ち？",
    explanation: "まだ{使|つか}える{物|もの}を むだに しない、{物|もの}を{大切|たいせつ}に する{気持|きも}ちだよ。",
    format: "choice",
    choices: ["{物|もの}を むだに しない{気持|きも}ち", "はやく すてたい{気持|きも}ち", "もっと ほしい{気持|きも}ち", "{勝|か}ちたい{気持|きも}ち"],
    answer: "{物|もの}を むだに しない{気持|きも}ち",
  },
  {
    id: `${U.mottainai}.q-2`,
    unitId: U.mottainai,
    prompt: "{使|つか}いおわった{物|もの}を べつの{物|もの}に つくりかえることを なんという？",
    explanation: "あきかんや ペットボトルを{新|あたら}しい{物|もの}に つくりかえることを「リサイクル」というよ。",
    format: "choice",
    choices: ["リサイクル", "リデュース", "コレクション", "プレゼント"],
    answer: "リサイクル",
  },
  {
    id: `${U.mottainai}.q-3`,
    unitId: U.mottainai,
    prompt: "SDGsが めざしているのは どんなこと？",
    explanation: "SDGsは、{世界|せかい}じゅうの{人|ひと}が しあわせに くらし、{地球|ちきゅう}を{守|まも}るための{目標|もくひょう}だよ。",
    format: "choice",
    choices: ["{世界|せかい}の{人|ひと}が しあわせに くらすこと", "{お金|おかね}を たくさん あつめること", "ビルを たくさん{建|た}てること", "ゲームに{勝|か}つこと"],
    answer: "{世界|せかい}の{人|ひと}が しあわせに くらすこと",
  },
  {
    id: `${U.mottainai}.q-4`,
    unitId: U.mottainai,
    prompt: "ごみを へらすために いちばん よいのは どれ？",
    explanation: "むだな{物|もの}を{買|か}わず、{今|いま}ある{物|もの}を{大切|たいせつ}に{使|つか}うと、ごみが へるよ。",
    format: "choice",
    choices: ["むだな{物|もの}を{買|か}わず{大切|たいせつ}に{使|つか}う", "なんでも すぐ すてる", "たくさん{買|か}って ためる", "{使|つか}わずに しまっておく"],
    answer: "むだな{物|もの}を{買|か}わず{大切|たいせつ}に{使|つか}う",
  },
  {
    id: `${U.mottainai}.q-5`,
    unitId: U.mottainai,
    prompt: "{水|みず}や{電気|でんき}を むだに しないことは、なにに つながる？",
    explanation: "{水|みず}や{電気|でんき}を{大切|たいせつ}に{使|つか}うと、{地球|ちきゅう}に やさしい くらしに つながるよ。",
    format: "choice",
    choices: ["{地球|ちきゅう}に やさしい くらし", "ねだんが{上|あ}がる", "ごみが ふえる", "{暑|あつ}くなる"],
    answer: "{地球|ちきゅう}に やさしい くらし",
  },
];

const flagsQuestions: Question[] = [
  {
    id: `${U.flags}.q-1`,
    unitId: U.flags,
    prompt: "{日本|にほん}の{国旗|こっき}の{真|ま}ん{中|なか}の{赤|あか}い{丸|まる}は なにを あらわす？",
    explanation: "{日本|にほん}の{国旗|こっき}「{日|ひ}の{丸|まる}」の{赤|あか}い{丸|まる}は{太陽|たいよう}を あらわしているよ。",
    format: "choice",
    choices: ["{太陽|たいよう}", "{月|つき}", "{花|はな}", "ボール"],
    answer: "{太陽|たいよう}",
  },
  {
    id: `${U.flags}.q-2`,
    unitId: U.flags,
    prompt: "{世界|せかい}には{国|くに}が だいたい いくつ ある？",
    explanation: "{今|いま}、{世界|せかい}には 190いじょうの{国|くに}が あるんだよ。",
    format: "choice",
    choices: ["190いじょう", "10ぐらい", "5つ", "1000まん"],
    answer: "190いじょう",
  },
  {
    id: `${U.flags}.q-3`,
    unitId: U.flags,
    prompt: "「ニーハオ」は どこの{国|くに}の あいさつ？",
    explanation: "「ニーハオ」は{中国|ちゅうごく}の あいさつだよ。{国|くに}によって ことばが ちがうね。",
    format: "choice",
    choices: ["{中国|ちゅうごく}", "アメリカ", "フランス", "ブラジル"],
    answer: "{中国|ちゅうごく}",
  },
  {
    id: `${U.flags}.q-4`,
    unitId: U.flags,
    prompt: "フランスに ある{有名|ゆうめい}な{建物|たてもの}は どれ？",
    explanation: "フランスの{首都|しゅと}パリには「エッフェル{塔|とう}」という{高|たか}い{塔|とう}が あるよ。",
    format: "choice",
    choices: ["エッフェル{塔|とう}", "ピラミッド", "{万里|ばんり}の{長城|ちょうじょう}", "{自由|じゆう}の{女神|めがみ}"],
    answer: "エッフェル{塔|とう}",
  },
  {
    id: `${U.flags}.q-5`,
    unitId: U.flags,
    prompt: "{国|くに}ごとに ちがうものは どれ？",
    explanation: "{国|くに}によって ことばや{文化|ぶんか}（{食|た}べ{物|もの}や おまつりなど）が ちがうよ。",
    format: "choice",
    choices: ["ことばや{文化|ぶんか}", "{空|そら}の{色|いろ}", "{1|いち}{日|にち}の{時間|じかん}", "{水|みず}の{重|おも}さ"],
    answer: "ことばや{文化|ぶんか}",
  },
];

const inventorsQuestions: Question[] = [
  {
    id: `${U.inventors}.q-1`,
    unitId: U.inventors,
    prompt: "{電球|でんきゅう}を{広|ひろ}めた{発明家|はつめいか}は だれ？",
    explanation: "エジソンは{電球|でんきゅう}を{改良|かいりょう}して{広|ひろ}め、{夜|よる}も あかるく すごせるように したよ。",
    format: "choice",
    choices: ["エジソン", "ガリレオ", "ニュートン", "ライト{兄弟|きょうだい}"],
    answer: "エジソン",
  },
  {
    id: `${U.inventors}.q-2`,
    unitId: U.inventors,
    prompt: "ライト{兄弟|きょうだい}が{発明|はつめい}した のりものは？",
    explanation: "ライト{兄弟|きょうだい}は、{空|そら}を とぶ「{飛行機|ひこうき}」を はじめて{作|つく}った{人|ひと}たちだよ。",
    format: "choice",
    choices: ["{飛行機|ひこうき}", "{自動車|じどうしゃ}", "{電車|でんしゃ}", "ふね"],
    answer: "{飛行機|ひこうき}",
  },
  {
    id: `${U.inventors}.q-3`,
    unitId: U.inventors,
    prompt: "「{偉人|いじん}」とは どんな{人|ひと}のこと？",
    explanation: "{世|よ}の{中|なか}のために{役立|やくだ}つ すごいことを した{人|ひと}を「{偉人|いじん}」というよ。",
    format: "choice",
    choices: ["{世|よ}の{中|なか}のために{役立|やくだ}つことをした{人|ひと}", "せが{高|たか}い{人|ひと}", "{走|はし}るのが{速|はや}い{人|ひと}", "{有名|ゆうめい}な ゲームの{人|ひと}"],
    answer: "{世|よ}の{中|なか}のために{役立|やくだ}つことをした{人|ひと}",
  },
  {
    id: `${U.inventors}.q-4`,
    unitId: U.inventors,
    prompt: "{日本|にほん}の{偉人|いじん}・{野口|のぐち}{英世|ひでよ}の しごとは？",
    explanation: "{野口|のぐち}{英世|ひでよ}は、{病気|びょうき}を なおすために{研究|けんきゅう}を した{医者|いしゃ}だよ。",
    format: "choice",
    choices: ["{病気|びょうき}を{研究|けんきゅう}する{医者|いしゃ}", "{絵|え}をかく{画家|がか}", "うたう{歌手|かしゅ}", "りょうりを{作|つく}る{人|ひと}"],
    answer: "{病気|びょうき}を{研究|けんきゅう}する{医者|いしゃ}",
  },
  {
    id: `${U.inventors}.q-5`,
    unitId: U.inventors,
    prompt: "{発明|はつめい}の よいところは どれ？",
    explanation: "{発明|はつめい}は、わたしたちの くらしを{便利|べんり}で{楽|らく}にして くれるよ。",
    format: "choice",
    choices: ["くらしを{便利|べんり}にする", "ごみを ふやす", "{時間|じかん}を むだにする", "けんかを ふやす"],
    answer: "くらしを{便利|べんり}にする",
  },
];

const weatherQuestions: Question[] = [
  {
    id: `${U.weather}.q-1`,
    unitId: U.weather,
    prompt: "{雨|あめ}が ふりやすいのは どんなとき？",
    explanation: "{空|そら}に{雲|くも}が ふえて あつくなると、{雨|あめ}が ふりやすくなるよ。",
    format: "choice",
    choices: ["{雲|くも}が ふえたとき", "{星|ほし}が{多|おお}いとき", "{風|かぜ}が ないとき", "{月|つき}が{丸|まる}いとき"],
    answer: "{雲|くも}が ふえたとき",
  },
  {
    id: `${U.weather}.q-2`,
    unitId: U.weather,
    prompt: "{春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ}の{季節|きせつ}が できるのは なぜ？",
    explanation: "{地球|ちきゅう}が{太陽|たいよう}の まわりを まわっているから、{季節|きせつ}が かわるんだよ。",
    format: "choice",
    choices: ["{地球|ちきゅう}が{太陽|たいよう}の まわりを まわるから", "{雲|くも}が うごくから", "{海|うみ}が ひろいから", "{山|やま}が{高|たか}いから"],
    answer: "{地球|ちきゅう}が{太陽|たいよう}の まわりを まわるから",
  },
  {
    id: `${U.weather}.q-3`,
    unitId: U.weather,
    prompt: "{秋|あき}の つぎに くる{季節|きせつ}は？",
    explanation: "{季節|きせつ}は{春|はる}→{夏|なつ}→{秋|あき}→{冬|ふゆ}の じゅん。{秋|あき}の つぎは{冬|ふゆ}だよ。",
    format: "choice",
    choices: ["{冬|ふゆ}", "{夏|なつ}", "{春|はる}", "つゆ"],
    answer: "{冬|ふゆ}",
  },
  {
    id: `${U.weather}.q-4`,
    unitId: U.weather,
    prompt: "{天気|てんき}よほうは なにを{予想|よそう}するもの？",
    explanation: "{天気|てんき}よほうは、これからの{天気|てんき}（あしたなど）を{予想|よそう}して おしえて くれるよ。",
    format: "choice",
    choices: ["これからの{天気|てんき}", "テストの{点|てん}", "ゲームの{結果|けっか}", "でんしゃの ねだん"],
    answer: "これからの{天気|てんき}",
  },
  {
    id: `${U.weather}.q-5`,
    unitId: U.weather,
    prompt: "{虹|にじ}が できやすいのは どんなとき？",
    explanation: "{雨|あめ}が やんで{太陽|たいよう}が{出|で}ると、{空|そら}の{水|みず}のつぶに{光|ひかり}が あたって{虹|にじ}が できるよ。",
    format: "choice",
    choices: ["{雨|あめ}のあと{太陽|たいよう}が{出|で}たとき", "{夜|よる}まっくらなとき", "{雪|ゆき}がふるとき", "かぜが つよいとき"],
    answer: "{雨|あめ}のあと{太陽|たいよう}が{出|で}たとき",
  },
];

const planetsQuestions: Question[] = [
  {
    id: `${U.planets}.q-1`,
    unitId: U.planets,
    prompt: "{太陽|たいよう}の まわりを まわっている{惑星|わくせい}は いくつ？",
    explanation: "{太陽系|たいようけい}には{水星|すいせい}から{海王星|かいおうせい}まで 8つの{惑星|わくせい}が あるよ。",
    format: "choice",
    choices: ["8つ", "3つ", "100", "1つ"],
    answer: "8つ",
  },
  {
    id: `${U.planets}.q-2`,
    unitId: U.planets,
    prompt: "わたしたちが すんでいる{惑星|わくせい}は どれ？",
    explanation: "わたしたちが すんでいるのは{地球|ちきゅう}。{水|みず}と{空気|くうき}が あって{生|い}き{物|もの}が くらせるよ。",
    format: "choice",
    choices: ["{地球|ちきゅう}", "{火星|かせい}", "{太陽|たいよう}", "{月|つき}"],
    answer: "{地球|ちきゅう}",
  },
  {
    id: `${U.planets}.q-3`,
    unitId: U.planets,
    prompt: "{地球|ちきゅう}の まわりを まわっているのは どれ？",
    explanation: "{月|つき}は{地球|ちきゅう}の まわりを まわる「{衛星|えいせい}」だよ。",
    format: "choice",
    choices: ["{月|つき}", "{太陽|たいよう}", "{雲|くも}", "ロケット"],
    answer: "{月|つき}",
  },
  {
    id: `${U.planets}.q-4`,
    unitId: U.planets,
    prompt: "{宇宙|うちゅう}とは どんな ところ？",
    explanation: "{宇宙|うちゅう}は{地球|ちきゅう}の{外|そと}に{広|ひろ}がる、ほしが たくさん ある{広|ひろ}い{世界|せかい}だよ。",
    format: "choice",
    choices: ["ほしが たくさん ある{広|ひろ}い{世界|せかい}", "{海|うみ}の{底|そこ}", "{山|やま}の{中|なか}", "{土|つち}の{中|なか}"],
    answer: "ほしが たくさん ある{広|ひろ}い{世界|せかい}",
  },
  {
    id: `${U.planets}.q-5`,
    unitId: U.planets,
    prompt: "{昼|ひる}の{空|そら}で あかるく ひかって{見|み}えるのは？",
    explanation: "{昼|ひる}に{空|そら}で あかるく ひかるのは{太陽|たいよう}。みずから{光|ひかり}を{出|だ}している ほしだよ。",
    format: "choice",
    choices: ["{太陽|たいよう}", "{月|つき}", "{星|ほし}", "{雲|くも}"],
    answer: "{太陽|たいよう}",
  },
];

const proverbsQuestions: Question[] = [
  {
    id: `${U.proverbs}.q-1`,
    unitId: U.proverbs,
    prompt: "「{一石二鳥|いっせきにちょう}」の いみは？",
    explanation: "ひとつの{石|いし}で{二|に}{羽|わ}の{鳥|とり}を とる、つまり ひとつのことで ふたつ とくをすること だよ。",
    format: "choice",
    choices: ["ひとつのことで ふたつ とくをする", "{石|いし}を なげること", "{鳥|とり}を かうこと", "{二|に}{回|かい}{失敗|しっぱい}する"],
    answer: "ひとつのことで ふたつ とくをする",
  },
  {
    id: `${U.proverbs}.q-2`,
    unitId: U.proverbs,
    prompt: "「{十人十色|じゅうにんといろ}」の いみは？",
    explanation: "{十人|じゅうにん}いれば{十|とお}の{色|いろ}、つまり{人|ひと}それぞれ かんがえや このみが ちがう ということ。",
    format: "choice",
    choices: ["{人|ひと}それぞれ ちがうこと", "みんな おなじこと", "{色|いろ}が{十|とお}あること", "{十人|じゅうにん}{集|あつ}まること"],
    answer: "{人|ひと}それぞれ ちがうこと",
  },
  {
    id: `${U.proverbs}.q-3`,
    unitId: U.proverbs,
    prompt: "「ことわざ」とは どんなもの？",
    explanation: "ことわざは、{昔|むかし}から つたわる ちえや{教|おし}えを みじかく あらわした ことばだよ。",
    format: "choice",
    choices: ["{昔|むかし}から つたわる ちえの ことば", "{新|あたら}しい うた", "むずかしい けいさん", "{外国|がいこく}の{名前|なまえ}"],
    answer: "{昔|むかし}から つたわる ちえの ことば",
  },
  {
    id: `${U.proverbs}.q-4`,
    unitId: U.proverbs,
    prompt: "「{百聞|ひゃくぶん}は{一見|いっけん}に しかず」の いみは？",
    explanation: "{何回|なんかい}も{話|はなし}を{聞|き}くより、{一度|いちど}じぶんの{目|め}で{見|み}たほうが よくわかる という いみ。",
    format: "choice",
    choices: ["{聞|き}くより{一度|いちど}{見|み}るほうが よくわかる", "{百|ひゃく}{回|かい}{聞|き}くとよい", "{見|み}ては いけない", "{何|なに}も{言|い}わない"],
    answer: "{聞|き}くより{一度|いちど}{見|み}るほうが よくわかる",
  },
  {
    id: `${U.proverbs}.q-5`,
    unitId: U.proverbs,
    prompt: "{四字熟語|よじじゅくご}は{漢字|かんじ} いくつで できている？",
    explanation: "{四字熟語|よじじゅくご}は その{名前|なまえ}のとおり、{漢字|かんじ} 4つで できた ことばだよ。",
    format: "choice",
    choices: ["4つ", "2つ", "3つ", "10こ"],
    answer: "4つ",
  },
];

const bodyQuestions: Question[] = [
  {
    id: `${U.body}.q-1`,
    unitId: U.body,
    prompt: "{食|た}べた{物|もの}を こなして とりこむのは{体|からだ}の どこ？",
    explanation: "{食|た}べた{物|もの}は{胃|い}や{腸|ちょう}で こなされて、{体|からだ}の{力|ちから}や{栄養|えいよう}に なるよ。",
    format: "choice",
    choices: ["{胃|い}や{腸|ちょう}", "{耳|みみ}", "{目|め}", "かみの{毛|け}"],
    answer: "{胃|い}や{腸|ちょう}",
  },
  {
    id: `${U.body}.q-2`,
    unitId: U.body,
    prompt: "{体|からだ}を つくる もとに なる{食|た}べ{物|もの}は どれ？",
    explanation: "{肉|にく}・{魚|さかな}・{豆|まめ}・{卵|たまご}などは、{筋肉|きんにく}や{骨|ほね}など{体|からだ}を つくる もとに なるよ。",
    format: "choice",
    choices: ["{肉|にく}や{魚|さかな}、{豆|まめ}", "あめだけ", "{水|みず}だけ", "ジュースだけ"],
    answer: "{肉|にく}や{魚|さかな}、{豆|まめ}",
  },
  {
    id: `${U.body}.q-3`,
    unitId: U.body,
    prompt: "{元気|げんき}に すごすために いちばん{大切|たいせつ}なのは？",
    explanation: "いろいろな{物|もの}を バランスよく{食|た}べて、よく ねることが{元気|げんき}の もとだよ。",
    format: "choice",
    choices: ["バランスよく{食|た}べて よくねる", "おかしだけ{食|た}べる", "ねないで あそぶ", "{食|た}べないで がまんする"],
    answer: "バランスよく{食|た}べて よくねる",
  },
  {
    id: `${U.body}.q-4`,
    unitId: U.body,
    prompt: "{野菜|やさい}には どんな はたらきが ある？",
    explanation: "{野菜|やさい}には、{体|からだ}の{調子|ちょうし}を ととのえる はたらきが あるよ。",
    format: "choice",
    choices: ["{体|からだ}の{調子|ちょうし}を ととのえる", "{体|からだ}を{重|おも}くする", "{歯|は}を よわくする", "ねむれなくする"],
    answer: "{体|からだ}の{調子|ちょうし}を ととのえる",
  },
  {
    id: `${U.body}.q-5`,
    unitId: U.body,
    prompt: "あさごはんを{食|た}べると どうなる？",
    explanation: "あさごはんを{食|た}べると{力|ちから}が{出|で}て、{午前|ごぜん}{中|ちゅう}も{元気|げんき}に すごせるよ。",
    format: "choice",
    choices: ["{力|ちから}が{出|で}て{元気|げんき}に すごせる", "ねむく なるだけ", "{力|ちから}が なくなる", "なにも かわらない"],
    answer: "{力|ちから}が{出|で}て{元気|げんき}に すごせる",
  },
];

const mannersQuestions: Question[] = [
  {
    id: `${U.manners}.q-1`,
    unitId: U.manners,
    prompt: "あさ{人|ひと}に あったとき いう あいさつは？",
    explanation: "あさは「おはよう（ございます）」と あいさつ するよ。あいさつは なかよしの{第一歩|だいいっぽ}。",
    format: "choice",
    choices: ["おはよう", "おやすみ", "さようなら", "いただきます"],
    answer: "おはよう",
  },
  {
    id: `${U.manners}.q-2`,
    unitId: U.manners,
    prompt: "しょくじの まえに いう ことばは？",
    explanation: "{食|た}べる まえに「いただきます」と{言|い}って、{食|た}べ{物|もの}や{作|つく}った{人|ひと}に かんしゃ するよ。",
    format: "choice",
    choices: ["いただきます", "ごちそうさま", "ただいま", "おはよう"],
    answer: "いただきます",
  },
  {
    id: `${U.manners}.q-3`,
    unitId: U.manners,
    prompt: "たすけて もらったとき いう ことばは？",
    explanation: "なにかを して もらったら「ありがとう」と つたえると、おたがい{気持|きも}ちが いいね。",
    format: "choice",
    choices: ["ありがとう", "ごめんなさい", "さようなら", "もしもし"],
    answer: "ありがとう",
  },
  {
    id: `${U.manners}.q-4`,
    unitId: U.manners,
    prompt: "{図書館|としょかん}での マナーは どれ？",
    explanation: "{図書館|としょかん}や でんしゃの{中|なか}では、まわりの{人|ひと}の めいわくに ならないよう しずかに するよ。",
    format: "choice",
    choices: ["しずかに する", "{大|おお}ごえで さわぐ", "{走|はし}りまわる", "{歌|うた}を うたう"],
    answer: "しずかに する",
  },
  {
    id: `${U.manners}.q-5`,
    unitId: U.manners,
    prompt: "あいさつを すると どんな よいことが ある？",
    explanation: "あいさつを すると、まわりの{人|ひと}と{気持|きも}ちよく なかよく なれるよ。",
    format: "choice",
    choices: ["まわりの{人|ひと}と なかよく なれる", "{背|せ}が{高|たか}くなる", "{足|あし}が{速|はや}くなる", "おかしが もらえる"],
    answer: "まわりの{人|ひと}と なかよく なれる",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────

export const kyoyoG3Contents: Record<string, UnitContent> = {
  [U.moneyRole]: {
    unitId: U.moneyRole,
    learn: {
      unitId: U.moneyRole,
      steps: [
        {
          heading: "{お金|おかね}って なに？",
          body: "{お金|おかね}は、ほしい{物|もの}と{交換|こうかん}するための{道具|どうぐ}だよ。{大昔|おおむかし}は{貝|かい}や{米|こめ}を{使|つか}っていたんだ。",
          visual: { kind: "emoji", value: "💰🪙", caption: "{交換|こうかん}の{道具|どうぐ}" },
        },
        {
          heading: "ねだんの ひみつ",
          body: "{物|もの}には ねだんが あるよ。{作|つく}るのが{大変|たいへん}で ほしい{人|ひと}が{多|おお}い{物|もの}ほど、ねだんは{高|たか}くなりやすい。",
          visual: { kind: "emoji", value: "🏷️", caption: "ねだんは かわる" },
        },
        {
          heading: "{使|つか}う・ためる・{役立|やくだ}てる",
          body: "{お金|おかね}は{使|つか}う・ためる（{貯金|ちょきん}）・{人|ひと}のために{使|つか}う ことが できるよ。{計画|けいかく}を{立|た}てて{使|つか}おう。",
          visual: { kind: "emoji", value: "🐷", caption: "{計画|けいかく}{的|てき}に{使|つか}う" },
        },
      ],
    },
    test: { unitId: U.moneyRole, questions: moneyRoleQuestions, questionCount: 5 },
  },

  [U.mottainai]: {
    unitId: U.mottainai,
    learn: {
      unitId: U.mottainai,
      steps: [
        {
          heading: "もったいないって なに？",
          body: "まだ{使|つか}える{物|もの}を むだに すてることを「もったいない」というよ。{物|もの}を{大切|たいせつ}に する{気持|きも}ちだね。",
          visual: { kind: "emoji", value: "🍙♻️", caption: "むだに しない" },
        },
        {
          heading: "{3|さん}つの R",
          body: "へらす（リデュース）・くりかえし{使|つか}う（リユース）・つくりかえる（リサイクル）。これで ごみを へらせるよ。",
          visual: { kind: "emoji", value: "♻️", caption: "ごみを へらす くふう" },
        },
        {
          heading: "SDGsって なに？",
          body: "{世界|せかい}じゅうの{人|ひと}が しあわせに くらすための{目標|もくひょう}だよ。{地球|ちきゅう}を{守|まも}る やくそく。",
          visual: { kind: "emoji", value: "🌍", caption: "{地球|ちきゅう}を{守|まも}る{目標|もくひょう}" },
        },
      ],
    },
    test: { unitId: U.mottainai, questions: mottainaiQuestions, questionCount: 5 },
  },

  [U.flags]: {
    unitId: U.flags,
    learn: {
      unitId: U.flags,
      steps: [
        {
          heading: "{世界|せかい}には たくさんの{国|くに}",
          body: "{地球|ちきゅう}には 190いじょうの{国|くに}が あるよ。それぞれ ことばや{文化|ぶんか}が ちがうんだ。",
          visual: { kind: "emoji", value: "🌎", caption: "いろいろな{国|くに}" },
        },
        {
          heading: "{国旗|こっき}には いみが ある",
          body: "{日本|にほん}の{国旗|こっき}は{太陽|たいよう}を あらわす{日|ひ}の{丸|まる}。{国旗|こっき}には その{国|くに}の{大切|たいせつ}な ものが えがかれて いるよ。",
          visual: { kind: "emoji", value: "🇯🇵", caption: "{日|ひ}の{丸|まる}は{太陽|たいよう}" },
        },
        {
          heading: "あいさつも いろいろ",
          body: "{英語|えいご}は「ハロー」、{中国語|ちゅうごくご}は「ニーハオ」。{国|くに}に よって あいさつが ちがうね。",
          visual: { kind: "emoji", value: "👋", caption: "{国|くに}ごとの あいさつ" },
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
          heading: "{偉人|いじん}って どんな{人|ひと}？",
          body: "{世|よ}の{中|なか}の ために すごいことを した{人|ひと}を「{偉人|いじん}」というよ。",
          visual: { kind: "emoji", value: "🌟", caption: "{役立|やくだ}つことを した{人|ひと}" },
        },
        {
          heading: "{発明|はつめい}が くらしを かえた",
          body: "{電球|でんきゅう}を{広|ひろ}めた エジソンの おかげで、{夜|よる}も あかるく すごせるように なったよ。",
          visual: { kind: "emoji", value: "💡", caption: "エジソンの{電球|でんきゅう}" },
        },
        {
          heading: "{日本|にほん}の{偉人|いじん}",
          body: "{野口|のぐち}{英世|ひでよ}は、{病気|びょうき}を なおす{研究|けんきゅう}を した{医者|いしゃ}だよ。",
          visual: { kind: "emoji", value: "🔬", caption: "{病気|びょうき}と たたかう{研究|けんきゅう}" },
        },
      ],
    },
    test: { unitId: U.inventors, questions: inventorsQuestions, questionCount: 5 },
  },

  [U.weather]: {
    unitId: U.weather,
    learn: {
      unitId: U.weather,
      steps: [
        {
          heading: "{天気|てんき}は なぜ かわる？",
          body: "{空|そら}の{雲|くも}の ようすで{天気|てんき}が かわるよ。{雲|くも}が ふえると{雨|あめ}が ふりやすい。",
          visual: { kind: "emoji", value: "⛅", caption: "{雲|くも}で{天気|てんき}が かわる" },
        },
        {
          heading: "{季節|きせつ}の しくみ",
          body: "{地球|ちきゅう}が{太陽|たいよう}の まわりを まわるから、{春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ}が できるよ。",
          visual: { kind: "emoji", value: "🌸☀️🍁⛄", caption: "{4|よん}つの{季節|きせつ}" },
        },
        {
          heading: "{天気|てんき}よほう",
          body: "これからの{天気|てんき}を{予想|よそう}するのが{天気|てんき}よほう。せんたくや おでかけに{役立|やくだ}つよ。",
          visual: { kind: "emoji", value: "📺☔", caption: "あしたの{天気|てんき}を{知|し}る" },
        },
      ],
    },
    test: { unitId: U.weather, questions: weatherQuestions, questionCount: 5 },
  },

  [U.planets]: {
    unitId: U.planets,
    learn: {
      unitId: U.planets,
      steps: [
        {
          heading: "{宇宙|うちゅう}って どんな ところ？",
          body: "{地球|ちきゅう}の{外|そと}に{広|ひろ}がる、ほしで いっぱいの{世界|せかい}が{宇宙|うちゅう}だよ。",
          visual: { kind: "emoji", value: "🌌", caption: "ほしの{世界|せかい}" },
        },
        {
          heading: "{太陽系|たいようけい}の{惑星|わくせい}",
          body: "{太陽|たいよう}の まわりを 8つの{惑星|わくせい}が まわって いるよ。{地球|ちきゅう}も その ひとつ。",
          visual: { kind: "emoji", value: "🪐", caption: "8つの{惑星|わくせい}" },
        },
        {
          heading: "{月|つき}は{地球|ちきゅう}の なかま",
          body: "{月|つき}は{地球|ちきゅう}の まわりを まわる「{衛星|えいせい}」。{夜|よる}に ひかって{見|み}えるね。",
          visual: { kind: "emoji", value: "🌕", caption: "{地球|ちきゅう}の{衛星|えいせい}" },
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
          body: "{昔|むかし}から つたわる、ちえや{教|おし}えの みじかい ことばだよ。",
          visual: { kind: "emoji", value: "📜", caption: "{昔|むかし}の ちえ" },
        },
        {
          heading: "{四字熟語|よじじゅくご}",
          body: "{漢字|かんじ} 4つで できた ことば。「{一石二鳥|いっせきにちょう}」は ひとつで ふたつ とくを すること。",
          visual: { kind: "emoji", value: "🐦🐦", caption: "{一石二鳥|いっせきにちょう}" },
        },
        {
          heading: "{使|つか}って みよう",
          body: "「{十人十色|じゅうにんといろ}」は{人|ひと}それぞれ かんがえが ちがう こと。ぴったりの ばめんで{使|つか}って みよう。",
          visual: { kind: "emoji", value: "🎨", caption: "{人|ひと}それぞれ" },
        },
      ],
    },
    test: { unitId: U.proverbs, questions: proverbsQuestions, questionCount: 5 },
  },

  [U.body]: {
    unitId: U.body,
    learn: {
      unitId: U.body,
      steps: [
        {
          heading: "{体|からだ}の なかの はたらき",
          body: "{食|た}べた{物|もの}は{胃|い}や{腸|ちょう}で こなされて、{体|からだ}を うごかす{力|ちから}に なるよ。",
          visual: { kind: "emoji", value: "🫶", caption: "{食|た}べ{物|もの}が{力|ちから}に なる" },
        },
        {
          heading: "{3|さん}つの{栄養|えいよう}",
          body: "{力|ちから}の もと・{体|からだ}を つくる もと・{調子|ちょうし}を ととのえる もの。バランスよく{食|た}べよう。",
          visual: { kind: "emoji", value: "🍚🥩🥦", caption: "バランスよく" },
        },
        {
          heading: "{早寝|はやね}{早起|はやお}き",
          body: "よく ねて よく うごくと、{体|からだ}が{元気|げんき}に なるよ。",
          visual: { kind: "emoji", value: "😴☀️", caption: "{元気|げんき}の もと" },
        },
      ],
    },
    test: { unitId: U.body, questions: bodyQuestions, questionCount: 5 },
  },

  [U.manners]: {
    unitId: U.manners,
    learn: {
      unitId: U.manners,
      steps: [
        {
          heading: "あいさつは{心|こころ}の はじまり",
          body: "「おはよう」「ありがとう」の あいさつは、まわりの{人|ひと}と なかよく する{第一歩|だいいっぽ}だよ。",
          visual: { kind: "emoji", value: "🙇", caption: "あいさつから" },
        },
        {
          heading: "しょくじの マナー",
          body: "「いただきます」「ごちそうさま」を{言|い}うと、{食|た}べ{物|もの}や{作|つく}って くれた{人|ひと}への かんしゃに なるね。",
          visual: { kind: "emoji", value: "🍽️", caption: "かんしゃの ことば" },
        },
        {
          heading: "{公共|こうきょう}の マナー",
          body: "でんしゃや{図書館|としょかん}では、まわりの{人|ひと}の ことを かんがえて しずかに すごすのが マナーだよ。",
          visual: { kind: "emoji", value: "🤫📚", caption: "しずかに すごす" },
        },
      ],
    },
    test: { unitId: U.manners, questions: mannersQuestions, questionCount: 5 },
  },

  // 【新領域】きまり・ほうりつ
  ["kyoyo.g3.what-is-law"]: {
    unitId: "kyoyo.g3.what-is-law",
    learn: {
      unitId: "kyoyo.g3.what-is-law",
      steps: [
        {
          heading: "ほうりつ＝くにの きまり",
          body: "{国|くに}に すむ みんなが まもる、いちばん おおきな きまりが「{法律|ほうりつ}」だよ。",
          visual: { kind: "emoji", value: "📜", caption: "くにの きまり" },
        },
        {
          heading: "きまりの レベル",
          body: "{学校|がっこう}の きまり、まちの きまり、{国|くに}の{法律|ほうりつ}。だんだん おおきな はんいの やくそくに なるよ。",
          visual: { kind: "emoji", value: "🏛️", caption: "だんだん おおきく" },
        },
      ],
    },
    test: {
      unitId: "kyoyo.g3.what-is-law",
      questionCount: 3,
      questions: [
        {
          id: "kyoyo.g3.what-is-law.q-1",
          unitId: "kyoyo.g3.what-is-law",
          prompt: "{国|くに}じゅうの{人|ひと}が まもる いちばん おおきな きまりを なんという？",
          explanation: "{国|くに}の みんなが まもる おおきな きまりが{法律|ほうりつ}だよ。",
          format: "choice",
          choices: ["{法律|ほうりつ}", "あいことば", "うた", "クイズ"],
          answer: "{法律|ほうりつ}",
        },
        {
          id: "kyoyo.g3.what-is-law.q-2",
          unitId: "kyoyo.g3.what-is-law",
          prompt: "{法律|ほうりつ}は なんの ために ある？",
          explanation: "{法律|ほうりつ}は みんなが{安全|あんぜん}に{安心|あんしん}して くらす ために あるよ。",
          format: "choice",
          choices: ["みんなが{安心|あんしん}して くらす ため", "{一部|いちぶ}の{人|ひと}が とくする ため", "あそぶ ため", "こまらせる ため"],
          answer: "みんなが{安心|あんしん}して くらす ため",
        },
        {
          id: "kyoyo.g3.what-is-law.q-3",
          unitId: "kyoyo.g3.what-is-law",
          prompt: "ほかの{人|ひと}の ものを とったら どうなる？",
          explanation: "{人|ひと}の ものを とるのは{法律|ほうりつ}で きんしされて いるよ。",
          format: "choice",
          choices: ["{法律|ほうりつ}いはんに なる", "ほめられる", "なにも ない", "おかねが もらえる"],
          answer: "{法律|ほうりつ}いはんに なる",
        },
      ],
    },
  },

  ["kyoyo.g3.social-rules"]: {
    unitId: "kyoyo.g3.social-rules",
    learn: {
      unitId: "kyoyo.g3.social-rules",
      steps: [
        {
          heading: "みんなの ルール",
          body: "{社会|しゃかい}には、{交通|こうつう}ルールや じゅんばん など みんなで まもる ルールが たくさん あるよ。",
          visual: { kind: "emoji", value: "🚦", caption: "みんなで まもる" },
        },
        {
          heading: "まもると どうなる？",
          body: "ルールを まもると、しらない{人|ひと}どうしでも あんぜんで きもちよく すごせるよ。",
          visual: { kind: "emoji", value: "🚃", caption: "きもちよく すごす" },
        },
      ],
    },
    test: {
      unitId: "kyoyo.g3.social-rules",
      questionCount: 3,
      questions: [
        {
          id: "kyoyo.g3.social-rules.q-1",
          unitId: "kyoyo.g3.social-rules",
          prompt: "でんしゃの{中|なか}での マナーは？",
          explanation: "でんしゃは みんなの ばしょ。しずかにして こまっている{人|ひと}に せきを ゆずろう。",
          format: "choice",
          choices: ["しずかに する・せきを ゆずる", "{大|おお}ごえで{電話|でんわ}", "{走|はし}りまわる", "ごみを すてる"],
          answer: "しずかに する・せきを ゆずる",
        },
        {
          id: "kyoyo.g3.social-rules.q-2",
          unitId: "kyoyo.g3.social-rules",
          prompt: "あかしんごうを むしして わたると？",
          explanation: "あかしんごうは とまれ。むしすると あぶないし ルールいはんだよ。",
          format: "choice",
          choices: ["あぶなくて ルールいはん", "はやく つける", "ほめられる", "とくを する"],
          answer: "あぶなくて ルールいはん",
        },
        {
          id: "kyoyo.g3.social-rules.q-3",
          unitId: "kyoyo.g3.social-rules",
          prompt: "ルールは だれの ために ある？",
          explanation: "ルールは{自分|じぶん}を ふくむ みんなが あんぜんに すごす ための ものだよ。",
          format: "choice",
          choices: ["みんな（{自分|じぶん}も ふくむ）の ため", "ほかの{人|ひと}だけ", "おとなだけ", "だれの ためでもない"],
          answer: "みんな（{自分|じぶん}も ふくむ）の ため",
        },
      ],
    },
  },
};
