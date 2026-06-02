// ══════════════════════════════════════════
// カリキュラム: 教養（きょうよう）小6
// 拡張カテゴリ「教養（kyoyo）」= 教科の枠をこえた一般教養を 学習＋テスト両モードで提供する。
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形。kyoyo/g1.ts と命名をそろえる。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 全表示テキストは ルビ記法 {漢字|よみ}（全漢字ルビ）で執筆（2026-06-02 CEO方針）。
//
// ── 申し送り（中央集約担当へ）─────────────────────────────
//  1. SubjectId union（src/types/drill.ts）に "kyoyo" がまだ無いため、本ファイルでも
//     kyoyo/g1.ts と同様 `const KYOYO: SubjectId = "kyoyo";` で局所的に型を吸収している。
//     中央で union に "kyoyo" を追加したら、この as キャストは外してよい。
//  2. kyoyoSubject（emoji 🌍 / theme emerald / grades [1..6]）は kyoyo/g1.ts が定義済みのため
//     本ファイルでは再定義しない（重複排除 / アンチ肥大）。中央は g1 の kyoyoSubject を使う。
//  3. 6領域（life-money / world-culture / people-history / nature-space /
//     language-proverbs / body-manners）も g1 が定義済み。g6 は新規領域を追加しないため
//     kyoyoG6Domains は空配列（domainId は g1 定義の id を参照＝集約時に解決）。
//  4. prerequisites / leadsTo は「集約時に必ず解決できる id」だけを指す
//     （本ファイル内の g6 単元 + 既存の kyoyo/g1 単元）。
// ══════════════════════════════════════════

import type {
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  SubjectId,
} from "@/types/curriculum";

// kyoyo は SubjectId 未対応 → 局所的に型を吸収（上の申し送り参照）。
const KYOYO: SubjectId = "kyoyo";

// ── 領域（6領域は kyoyo/g1.ts が定義済み。g6 は新規追加なし＝空配列）──
export const kyoyoG6Domains: Domain[] = [];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし）:
//
//   g1.money-basics ─▶ sdgs ─▶ money-economy
//   g1.world-flags ─▶ world-heritage ─▶ united-nations
//   g1.great-people ─▶ history-people
//   g1.seasons-weather ─▶ solar-system
//   g1.proverbs ─▶ yojijukugo
//   g1.body-manners ─▶ nutrition-health
//
const U = {
  sdgs: "kyoyo.g6.sdgs",
  moneyEconomy: "kyoyo.g6.money-economy",
  worldHeritage: "kyoyo.g6.world-heritage",
  unitedNations: "kyoyo.g6.united-nations",
  historyPeople: "kyoyo.g6.history-people",
  solarSystem: "kyoyo.g6.solar-system",
  yojijukugo: "kyoyo.g6.yojijukugo",
  nutritionHealth: "kyoyo.g6.nutrition-health",
} as const;

// kyoyo/g1 の参照先 id（前提として指す既存単元）
const G1 = {
  moneyBasics: "kyoyo.g1.money-basics",
  worldFlags: "kyoyo.g1.world-flags",
  greatPeople: "kyoyo.g1.great-people",
  seasonsWeather: "kyoyo.g1.seasons-weather",
  proverbs: "kyoyo.g1.proverbs",
  bodyManners: "kyoyo.g1.body-manners",
} as const;

export const kyoyoG6Units: Unit[] = [
  {
    id: U.sdgs,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.life-money",
    title: "SDGs と もちぞくかのうな{世界|せかい}",
    order: 1,
    realWorldUse:
      "{食|た}べ{物|もの}を のこさない、ごみを {分|わ}けるなど、まいにちの くらしで {地球|ちきゅう}の {未来|みらい}を まもる {行動|こうどう}に つながるよ。",
    leadsTo: [U.moneyEconomy],
    prerequisites: [G1.moneyBasics],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.moneyEconomy,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.life-money",
    title: "おかねと{経済|けいざい}（{税金|ぜいきん}・{貯金|ちょきん}）",
    order: 2,
    realWorldUse:
      "かいものの {消費税|しょうひぜい}や、{銀行|ぎんこう}に おかねを あずける {貯金|ちょきん}のように、おかねの まわり{方|かた}を {知|し}るのに {役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [G1.moneyBasics, U.sdgs],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.worldHeritage,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.world-culture",
    title: "{世界遺産|せかいいさん}",
    order: 3,
    realWorldUse:
      "{富士山|ふじさん}や ピラミッドのように、せかいで {大切|たいせつ}に まもられている {場所|ばしょ}を {知|し}って、{旅行|りょこう}や ニュースを たのしめるよ。",
    leadsTo: [U.unitedNations],
    prerequisites: [G1.worldFlags],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.unitedNations,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.world-culture",
    title: "{国際連合|こくさいれんごう}と{世界|せかい}の つながり",
    order: 4,
    realWorldUse:
      "{世界|せかい}の {国|くに}が {協力|きょうりょく}して {平和|へいわ}や {環境|かんきょう}を まもる しくみを {知|し}ると、ニュースの {意味|いみ}が よく わかるよ。",
    leadsTo: [],
    prerequisites: [U.worldHeritage],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.historyPeople,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.people-history",
    title: "{歴史|れきし}を うごかした{人物|じんぶつ}",
    order: 5,
    realWorldUse:
      "{聖徳太子|しょうとくたいし}や {織田信長|おだのぶなが}など、{昔|むかし}の {人物|じんぶつ}の はたらきを {知|し}ると、いまの {日本|にほん}が できた りゆうが わかるよ。",
    leadsTo: [],
    prerequisites: [G1.greatPeople],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.solarSystem,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.nature-space",
    title: "{太陽系|たいようけい}の わく{星|せい}と{宇宙|うちゅう}",
    order: 6,
    realWorldUse:
      "よぞらの {星|ほし}や {月|つき}、ロケットの ニュースのように、{太陽|たいよう}の まわりを まわる わく{星|せい}や {宇宙|うちゅう}の ことを {知|し}るのに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [G1.seasonsWeather],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.yojijukugo,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.language-proverbs",
    title: "{四字熟語|よじじゅくご}",
    order: 7,
    realWorldUse:
      "「{一石二鳥|いっせきにちょう}」のように、{気持|きも}ちや ようすを みじかい {四字|よじ}で うまく {言|い}いあらわせるよ。{作文|さくぶん}や {会話|かいわ}で {使|つか}えるよ。",
    leadsTo: [],
    prerequisites: [G1.proverbs],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.nutritionHealth,
    subjectId: KYOYO,
    grade: 6,
    domainId: "kyoyo.body-manners",
    title: "{栄養|えいよう}と{健康|けんこう}",
    order: 8,
    realWorldUse:
      "{毎日|まいにち}の {食事|しょくじ}で バランスよく {栄養|えいよう}を とる ことや、すいみんの 大切さを {知|し}って、{元気|げんき}な {体|からだ}を つくれるよ。",
    leadsTo: [],
    prerequisites: [G1.bodyManners],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// 全テキストはルビ記法 {漢字|よみ}。テストは固定 choice questions[]（全問 explanation 必須）。
// ══════════════════════════════════════════

export const kyoyoG6Contents: Record<string, UnitContent> = {
  // ── 1. SDGs ──
  [U.sdgs]: {
    unitId: U.sdgs,
    learn: {
      unitId: U.sdgs,
      steps: [
        {
          heading: "SDGs って{何|なに}?",
          body: "SDGs は「{持続可能|じぞくかのう}な {開発|かいはつ} {目標|もくひょう}」のことで、2030{年|ねん}までに {世界|せかい}を よくする 17の {目標|もくひょう}だよ。",
          visual: { kind: "emoji", value: "🌍🎯", caption: "17の {目標|もくひょう}" },
        },
        {
          heading: "どんな{目標|もくひょう}?",
          body: "「{貧困|ひんこん}を なくそう」「{海|うみ}の ゆたかさを まもろう」など、{人|ひと}と {地球|ちきゅう}の ための {目標|もくひょう}が あるよ。",
          visual: { kind: "emoji", value: "🍚🌊🌳", caption: "{人|ひと}と {地球|ちきゅう}を まもる" },
        },
        {
          heading: "わたしたちに できること",
          body: "{食|た}べ{物|もの}を のこさない、ごみを {分|わ}ける、{電気|でんき}を むだに しない。{身近|みぢか}な {行動|こうどう}が SDGs に つながるよ。",
          visual: { kind: "emoji", value: "♻️💡", caption: "まいにちの {行動|こうどう}" },
        },
      ],
    },
    test: {
      unitId: U.sdgs,
      questionCount: 4,
      questions: [
        {
          id: `${U.sdgs}.q-1`,
          unitId: U.sdgs,
          prompt: "SDGs の {目標|もくひょう}は ぜんぶで いくつ?",
          explanation: "SDGs は 17の {目標|もくひょう}で できているよ。",
          format: "choice",
          choices: ["17", "5", "10", "100"],
          answer: "17",
        },
        {
          id: `${U.sdgs}.q-2`,
          unitId: U.sdgs,
          prompt: "SDGs は {何|なに}の ための {目標|もくひょう}?",
          explanation: "SDGs は {人|ひと}と {地球|ちきゅう}の {未来|みらい}を よくする ための {目標|もくひょう}だよ。",
          format: "choice",
          choices: ["{人|ひと}と {地球|ちきゅう}の {未来|みらい}", "ゲームの {点数|てんすう}", "スポーツの {記録|きろく}", "おかしの {数|かず}"],
          answer: "{人|ひと}と {地球|ちきゅう}の {未来|みらい}",
        },
        {
          id: `${U.sdgs}.q-3`,
          unitId: U.sdgs,
          prompt: "SDGs に つながる {身近|みぢか}な {行動|こうどう}は?",
          explanation: "{食|た}べ{物|もの}を のこさない・ごみを {分|わ}けるなど、{身近|みぢか}な {行動|こうどう}が SDGs に つながるよ。",
          format: "choice",
          choices: ["{食|た}べ{物|もの}を のこさない", "{電気|でんき}を つけっぱなしにする", "ごみを まぜて すてる", "{水|みず}を {出|だ}しっぱなしにする"],
          answer: "{食|た}べ{物|もの}を のこさない",
        },
        {
          id: `${U.sdgs}.q-4`,
          unitId: U.sdgs,
          prompt: "SDGs の「{持続可能|じぞくかのう}」に {近|ちか}い {意味|いみ}は?",
          explanation: "「{持続可能|じぞくかのう}」は、これからも ずっと つづけられる、という {意味|いみ}だよ。",
          format: "choice",
          choices: ["ずっと つづけられる", "すぐ おわる", "1{回|かい}だけ", "つかいすてる"],
          answer: "ずっと つづけられる",
        },
      ],
    },
  },

  // ── 2. おかねと経済 ──
  [U.moneyEconomy]: {
    unitId: U.moneyEconomy,
    learn: {
      unitId: U.moneyEconomy,
      steps: [
        {
          heading: "{税金|ぜいきん}って{何|なに}?",
          body: "かいものを すると ねだんに {消費税|しょうひぜい}が かかるよ。{集|あつ}めた {税金|ぜいきん}は {学校|がっこう}や {道路|どうろ}など みんなの ために {使|つか}われるよ。",
          visual: { kind: "emoji", value: "🛒💴🏫", caption: "{税金|ぜいきん}は みんなの ため" },
        },
        {
          heading: "{貯金|ちょきん}と{銀行|ぎんこう}",
          body: "つかわない おかねを {銀行|ぎんこう}に あずける ことを {貯金|ちょきん}と いうよ。{銀行|ぎんこう}は あずかった おかねを {役立|やくだ}てるよ。",
          visual: { kind: "emoji", value: "🏦🐷", caption: "おかねを あずける" },
        },
        {
          heading: "ほしい{人|ひと}と{物|もの}の{数|かず}",
          body: "ほしい {人|ひと}が {多|おお}くて {物|もの}が {少|すく}ないと ねだんは {上|あ}がり、{物|もの}が あまると ねだんは {下|さ}がりやすいよ。",
          visual: { kind: "emoji", value: "📈📉", caption: "ねだんが かわる" },
        },
      ],
    },
    test: {
      unitId: U.moneyEconomy,
      questionCount: 4,
      questions: [
        {
          id: `${U.moneyEconomy}.q-1`,
          unitId: U.moneyEconomy,
          prompt: "かいものの ときに ねだんに かかる おかねを なんという?",
          explanation: "かいものの ときに かかる {税金|ぜいきん}を {消費税|しょうひぜい}と いうよ。",
          format: "choice",
          choices: ["{消費税|しょうひぜい}", "{貯金|ちょきん}", "おこづかい", "おつり"],
          answer: "{消費税|しょうひぜい}",
        },
        {
          id: `${U.moneyEconomy}.q-2`,
          unitId: U.moneyEconomy,
          prompt: "{集|あつ}めた {税金|ぜいきん}は {何|なに}に {使|つか}われる?",
          explanation: "{税金|ぜいきん}は {学校|がっこう}・{道路|どうろ}・{消防|しょうぼう}など みんなの ために {使|つか}われるよ。",
          format: "choice",
          choices: ["{学校|がっこう}や {道路|どうろ}など みんなの ため", "{一人|ひとり}の おこづかい", "ゲーム", "おかし だけ"],
          answer: "{学校|がっこう}や {道路|どうろ}など みんなの ため",
        },
        {
          id: `${U.moneyEconomy}.q-3`,
          unitId: U.moneyEconomy,
          prompt: "つかわない おかねを {銀行|ぎんこう}に あずける ことを なんという?",
          explanation: "つかわない おかねを あずける ことを {貯金|ちょきん}と いうよ。",
          format: "choice",
          choices: ["{貯金|ちょきん}", "{買|か}いもの", "{税金|ぜいきん}", "りょこう"],
          answer: "{貯金|ちょきん}",
        },
        {
          id: `${U.moneyEconomy}.q-4`,
          unitId: U.moneyEconomy,
          prompt: "ほしい {人|ひと}が {多|おお}くて {物|もの}が {少|すく}ないと、ねだんは?",
          explanation: "ほしい {人|ひと}が {多|おお}く {物|もの}が {少|すく}ないと、ねだんは {上|あ}がりやすいよ。",
          format: "choice",
          choices: ["{上|あ}がりやすい", "{下|さ}がりやすい", "0に なる", "かわらない"],
          answer: "{上|あ}がりやすい",
        },
      ],
    },
  },

  // ── 3. 世界遺産 ──
  [U.worldHeritage]: {
    unitId: U.worldHeritage,
    learn: {
      unitId: U.worldHeritage,
      steps: [
        {
          heading: "{世界遺産|せかいいさん}って{何|なに}?",
          body: "{世界|せかい}で {大切|たいせつ}に まもり、{未来|みらい}に のこそうと きめられた {場所|ばしょ}を {世界遺産|せかいいさん}と いうよ。ユネスコが えらぶよ。",
          visual: { kind: "emoji", value: "🏛️🌏", caption: "{未来|みらい}に のこす たから" },
        },
        {
          heading: "2つの しゅるい",
          body: "{人|ひと}が つくった {建物|たてもの}などの「{文化遺産|ぶんかいさん}」と、{自然|しぜん}の「{自然遺産|しぜんいさん}」が あるよ。",
          visual: { kind: "emoji", value: "🏯🏔️", caption: "{文化|ぶんか}と {自然|しぜん}" },
        },
        {
          heading: "{有名|ゆうめい}な{世界遺産|せかいいさん}",
          body: "{日本|にほん}の {富士山|ふじさん}や {姫路城|ひめじじょう}、エジプトの ピラミッド、{中国|ちゅうごく}の {万里|ばんり}の {長城|ちょうじょう}などが あるよ。",
          visual: { kind: "emoji", value: "🗻🏯", caption: "{富士山|ふじさん}・ピラミッド" },
        },
      ],
    },
    test: {
      unitId: U.worldHeritage,
      questionCount: 4,
      questions: [
        {
          id: `${U.worldHeritage}.q-1`,
          unitId: U.worldHeritage,
          prompt: "{世界遺産|せかいいさん}を えらぶ {国際|こくさい}の きかんは?",
          explanation: "{世界遺産|せかいいさん}は ユネスコ（{国連|こくれん}の きかん）が えらぶよ。",
          format: "choice",
          choices: ["ユネスコ", "オリンピック", "NASA", "{銀行|ぎんこう}"],
          answer: "ユネスコ",
        },
        {
          id: `${U.worldHeritage}.q-2`,
          unitId: U.worldHeritage,
          prompt: "{人|ひと}が つくった {建物|たてもの}などの {世界遺産|せかいいさん}を なんという?",
          explanation: "{人|ひと}が つくった {建物|たてもの}や {遺跡|いせき}は「{文化遺産|ぶんかいさん}」だよ。{自然|しぜん}のものは「{自然遺産|しぜんいさん}」。",
          format: "choice",
          choices: ["{文化遺産|ぶんかいさん}", "{自然遺産|しぜんいさん}", "{食|た}べ{物|もの}", "{動物|どうぶつ}"],
          answer: "{文化遺産|ぶんかいさん}",
        },
        {
          id: `${U.worldHeritage}.q-3`,
          unitId: U.worldHeritage,
          prompt: "エジプトに ある {有名|ゆうめい}な {世界遺産|せかいいさん}は?",
          explanation: "エジプトの ピラミッドは とても {有名|ゆうめい}な {世界遺産|せかいいさん}だよ。",
          format: "choice",
          choices: ["ピラミッド", "{富士山|ふじさん}", "{自由|じゆう}の {女神|めがみ}", "{東京|とうきょう}タワー"],
          answer: "ピラミッド",
        },
        {
          id: `${U.worldHeritage}.q-4`,
          unitId: U.worldHeritage,
          prompt: "{世界遺産|せかいいさん}に えらばれる りゆうに {近|ちか}いのは?",
          explanation: "{世界遺産|せかいいさん}は、{未来|みらい}に のこす ねうちが あると みとめられた {場所|ばしょ}だよ。",
          format: "choice",
          choices: ["{未来|みらい}に のこす ねうちが ある", "{新|あたら}しく できた", "{人|ひと}が {住|す}んでいない", "{大|おお}きい だけ"],
          answer: "{未来|みらい}に のこす ねうちが ある",
        },
      ],
    },
  },

  // ── 4. 国際連合と世界のつながり ──
  [U.unitedNations]: {
    unitId: U.unitedNations,
    learn: {
      unitId: U.unitedNations,
      steps: [
        {
          heading: "{国際連合|こくさいれんごう}（{国連|こくれん}）",
          body: "{世界|せかい}の {国|くに}が あつまって、{戦争|せんそう}を ふせぎ {平和|へいわ}を まもる ために つくられた しくみが {国際連合|こくさいれんごう}だよ。",
          visual: { kind: "emoji", value: "🕊️🌐", caption: "{世界|せかい}の {協力|きょうりょく}" },
        },
        {
          heading: "こまった{人|ひと}を たすける",
          body: "ユニセフは {世界|せかい}の こどもを たすける しくみ。{病気|びょうき}や {食|た}べ{物|もの}が ない {国|くに}を {助|たす}けるよ。",
          visual: { kind: "emoji", value: "🤝🧒", caption: "こどもを まもる" },
        },
      ],
    },
    test: {
      unitId: U.unitedNations,
      questionCount: 4,
      questions: [
        {
          id: `${U.unitedNations}.q-1`,
          unitId: U.unitedNations,
          prompt: "{世界|せかい}の {国|くに}が {平和|へいわ}の ために あつまる しくみは?",
          explanation: "{世界|せかい}の {国|くに}が {協力|きょうりょく}して {平和|へいわ}を まもる しくみが {国際連合|こくさいれんごう}（{国連|こくれん}）だよ。",
          format: "choice",
          choices: ["{国際連合|こくさいれんごう}", "オリンピック", "{銀行|ぎんこう}", "{会社|かいしゃ}"],
          answer: "{国際連合|こくさいれんごう}",
        },
        {
          id: `${U.unitedNations}.q-2`,
          unitId: U.unitedNations,
          prompt: "{国際連合|こくさいれんごう}の おもな ねらいは?",
          explanation: "{戦争|せんそう}を ふせいで {世界|せかい}の {平和|へいわ}を まもる ことが おもな ねらいだよ。",
          format: "choice",
          choices: ["{世界|せかい}の {平和|へいわ}を まもる", "ゲームを つくる", "おかしを {売|う}る", "{星|ほし}を しらべる"],
          answer: "{世界|せかい}の {平和|へいわ}を まもる",
        },
        {
          id: `${U.unitedNations}.q-3`,
          unitId: U.unitedNations,
          prompt: "{世界|せかい}の こどもを {助|たす}ける しくみは?",
          explanation: "ユニセフは {世界|せかい}の こどもを {病気|びょうき}や ひもじさから {助|たす}ける しくみだよ。",
          format: "choice",
          choices: ["ユニセフ", "ユネスコ", "NASA", "{消防|しょうぼう}しょ"],
          answer: "ユニセフ",
        },
        {
          id: `${U.unitedNations}.q-4`,
          unitId: U.unitedNations,
          prompt: "{世界|せかい}の {国|くに}が つながって たいせつに する ことは?",
          explanation: "{国|くに}どうしが {協力|きょうりょく}し {助|たす}け{合|あ}う ことが たいせつだよ。",
          format: "choice",
          choices: ["{協力|きょうりょく}し {助|たす}け{合|あ}う", "けんかを する", "つながらない", "ひみつに する"],
          answer: "{協力|きょうりょく}し {助|たす}け{合|あ}う",
        },
      ],
    },
  },

  // ── 5. 歴史を動かした人物 ──
  [U.historyPeople]: {
    unitId: U.historyPeople,
    learn: {
      unitId: U.historyPeople,
      steps: [
        {
          heading: "{昔|むかし}の{国|くに}づくり",
          body: "{聖徳太子|しょうとくたいし}は {今|いま}から 1400{年|ねん}ほど {前|まえ}、きまりを つくって {国|くに}を まとめようと した {人物|じんぶつ}だよ。",
          visual: { kind: "emoji", value: "📜👤", caption: "{聖徳太子|しょうとくたいし}" },
        },
        {
          heading: "{戦国|せんごく}の{世|よ}を まとめる",
          body: "{織田信長|おだのぶなが}・{豊臣秀吉|とよとみひでよし}・{徳川家康|とくがわいえやす}は、{争|あらそ}いの {多|おお}い {時代|じだい}を まとめ、{平和|へいわ}な {世|よ}に つなげたよ。",
          visual: { kind: "emoji", value: "🏯⚔️", caption: "{戦国|せんごく}の {武将|ぶしょう}" },
        },
      ],
    },
    test: {
      unitId: U.historyPeople,
      questionCount: 4,
      questions: [
        {
          id: `${U.historyPeople}.q-1`,
          unitId: U.historyPeople,
          prompt: "{今|いま}から 1400{年|ねん}ほど {前|まえ}、きまりで {国|くに}を まとめようと した {人物|じんぶつ}は?",
          explanation: "{聖徳太子|しょうとくたいし}は きまり（{十七条|じゅうしちじょう}の {憲法|けんぽう}）を つくった {人物|じんぶつ}だよ。",
          format: "choice",
          choices: ["{聖徳太子|しょうとくたいし}", "{織田信長|おだのぶなが}", "{徳川家康|とくがわいえやす}", "{野口英世|のぐちひでよ}"],
          answer: "{聖徳太子|しょうとくたいし}",
        },
        {
          id: `${U.historyPeople}.q-2`,
          unitId: U.historyPeople,
          prompt: "{江戸|えど}に {幕府|ばくふ}を ひらき、{長|なが}い {平和|へいわ}な {世|よ}を つくったのは?",
          explanation: "{徳川家康|とくがわいえやす}は {江戸|えど}{幕府|ばくふ}を ひらき、{長|なが}い {平和|へいわ}な {時代|じだい}の もとを つくったよ。",
          format: "choice",
          choices: ["{徳川家康|とくがわいえやす}", "{聖徳太子|しょうとくたいし}", "{卑弥呼|ひみこ}", "{福沢諭吉|ふくざわゆきち}"],
          answer: "{徳川家康|とくがわいえやす}",
        },
        {
          id: `${U.historyPeople}.q-3`,
          unitId: U.historyPeople,
          prompt: "{織田信長|おだのぶなが}が いきた、{争|あらそ}いの {多|おお}い {時代|じだい}を なんという?",
          explanation: "{武将|ぶしょう}どうしが {争|あらそ}った {時代|じだい}を {戦国|せんごく}{時代|じだい}と いうよ。",
          format: "choice",
          choices: ["{戦国|せんごく}{時代|じだい}", "{平成|へいせい}", "{縄文|じょうもん}{時代|じだい}", "{未来|みらい}"],
          answer: "{戦国|せんごく}{時代|じだい}",
        },
        {
          id: `${U.historyPeople}.q-4`,
          unitId: U.historyPeople,
          prompt: "{歴史|れきし}の {人物|じんぶつ}を {学|まな}ぶと わかる ことは?",
          explanation: "{昔|むかし}の {人物|じんぶつ}の はたらきから、{今|いま}の {社会|しゃかい}が できた りゆうが わかるよ。",
          format: "choice",
          choices: ["{今|いま}の {社会|しゃかい}が できた りゆう", "あしたの {天気|てんき}", "ゲームの {点数|てんすう}", "{星|ほし}の {数|かず}"],
          answer: "{今|いま}の {社会|しゃかい}が できた りゆう",
        },
      ],
    },
  },

  // ── 6. 太陽系の惑星と宇宙 ──
  [U.solarSystem]: {
    unitId: U.solarSystem,
    learn: {
      unitId: U.solarSystem,
      steps: [
        {
          heading: "{太陽系|たいようけい}の なかま",
          body: "{太陽|たいよう}の まわりを 8つの わく{星|せい}が まわっているよ。{近|ちか}い {順|じゅん}に {水星|すいせい}・{金星|きんせい}・{地球|ちきゅう}・{火星|かせい}…と つづくよ。",
          visual: { kind: "emoji", value: "☀️🪐🌍", caption: "{太陽|たいよう}と 8わく{星|せい}" },
        },
        {
          heading: "わたしたちの{地球|ちきゅう}",
          body: "{地球|ちきゅう}は {太陽|たいよう}から 3{番目|ばんめ}の わく{星|せい}。{水|みず}と {空気|くうき}が あり、{生|い}き{物|もの}が くらせる とくべつな {星|ほし}だよ。",
          visual: { kind: "emoji", value: "🌍💧", caption: "{生|い}き{物|もの}の いる {星|ほし}" },
        },
        {
          heading: "いちばん{大|おお}きい わく{星|せい}",
          body: "{木星|もくせい}は {太陽系|たいようけい}で いちばん {大|おお}きい わく{星|せい}だよ。{土星|どせい}には きれいな わ（リング）が あるよ。",
          visual: { kind: "emoji", value: "🪐", caption: "{木星|もくせい}・{土星|どせい}" },
        },
      ],
    },
    test: {
      unitId: U.solarSystem,
      questionCount: 5,
      questions: [
        {
          id: `${U.solarSystem}.q-1`,
          unitId: U.solarSystem,
          prompt: "{太陽|たいよう}の まわりを まわる わく{星|せい}は いくつ?",
          explanation: "{太陽系|たいようけい}には 8つの わく{星|せい}が あるよ。",
          format: "choice",
          choices: ["8つ", "5つ", "12", "100"],
          answer: "8つ",
        },
        {
          id: `${U.solarSystem}.q-2`,
          unitId: U.solarSystem,
          prompt: "{地球|ちきゅう}は {太陽|たいよう}から {何番目|なんばんめ}の わく{星|せい}?",
          explanation: "{地球|ちきゅう}は {太陽|たいよう}から 3{番目|ばんめ}の わく{星|せい}だよ。",
          format: "choice",
          choices: ["3{番目|ばんめ}", "1{番目|ばんめ}", "8{番目|ばんめ}", "5{番目|ばんめ}"],
          answer: "3{番目|ばんめ}",
        },
        {
          id: `${U.solarSystem}.q-3`,
          unitId: U.solarSystem,
          prompt: "{太陽系|たいようけい}で いちばん {大|おお}きい わく{星|せい}は?",
          explanation: "いちばん {大|おお}きい わく{星|せい}は {木星|もくせい}だよ。",
          format: "choice",
          choices: ["{木星|もくせい}", "{地球|ちきゅう}", "{水星|すいせい}", "{火星|かせい}"],
          answer: "{木星|もくせい}",
        },
        {
          id: `${U.solarSystem}.q-4`,
          unitId: U.solarSystem,
          prompt: "きれいな わ（リング）を もつ わく{星|せい}は?",
          explanation: "{土星|どせい}には こおりや いわで できた きれいな わ（リング）が あるよ。",
          format: "choice",
          choices: ["{土星|どせい}", "{金星|きんせい}", "{地球|ちきゅう}", "{水星|すいせい}"],
          answer: "{土星|どせい}",
        },
        {
          id: `${U.solarSystem}.q-5`,
          unitId: U.solarSystem,
          prompt: "{地球|ちきゅう}に {生|い}き{物|もの}が くらせる りゆうに {近|ちか}いのは?",
          explanation: "{地球|ちきゅう}には {水|みず}と {空気|くうき}が あるので {生|い}き{物|もの}が くらせるよ。",
          format: "choice",
          choices: ["{水|みず}と {空気|くうき}が ある", "とても あつい", "{光|ひかり}が ない", "{氷|こおり}だけ"],
          answer: "{水|みず}と {空気|くうき}が ある",
        },
      ],
    },
  },

  // ── 7. 四字熟語 ──
  [U.yojijukugo]: {
    unitId: U.yojijukugo,
    learn: {
      unitId: U.yojijukugo,
      steps: [
        {
          heading: "{四字熟語|よじじゅくご}って{何|なに}?",
          body: "かんじ {四|よっ}つで できた、とくべつな {意味|いみ}を もつ ことばを {四字熟語|よじじゅくご}と いうよ。",
          visual: { kind: "emoji", value: "🀄✨", caption: "かんじ {四|よっ}つ" },
        },
        {
          heading: "やさしい{例|れい}",
          body: "「{一石二鳥|いっせきにちょう}」は 1つの ことで 2つの とくを する {意味|いみ}。「{十人十色|じゅうにんといろ}」は {人|ひと}に よって {考|かんが}えが ちがう {意味|いみ}だよ。",
          visual: { kind: "emoji", value: "🐦🐦", caption: "{一石二鳥|いっせきにちょう}" },
        },
      ],
    },
    test: {
      unitId: U.yojijukugo,
      questionCount: 5,
      questions: [
        {
          id: `${U.yojijukugo}.q-1`,
          unitId: U.yojijukugo,
          prompt: "「{一石二鳥|いっせきにちょう}」の {意味|いみ}は?",
          explanation: "1つの ことを して 2つの とくを する ことを「{一石二鳥|いっせきにちょう}」と いうよ。",
          format: "choice",
          choices: ["1つで 2つの とくを する", "{何|なに}も しない", "2{回|かい} しっぱいする", "とりを 2わ かう"],
          answer: "1つで 2つの とくを する",
        },
        {
          id: `${U.yojijukugo}.q-2`,
          unitId: U.yojijukugo,
          prompt: "「{十人十色|じゅうにんといろ}」の {意味|いみ}は?",
          explanation: "{人|ひと}に よって {考|かんが}えや このみが ちがう ことを「{十人十色|じゅうにんといろ}」と いうよ。",
          format: "choice",
          choices: ["{人|ひと}それぞれ ちがう", "みんな おなじ", "10{色|いろ}の えのぐ", "10{人|にん} ならぶ"],
          answer: "{人|ひと}それぞれ ちがう",
        },
        {
          id: `${U.yojijukugo}.q-3`,
          unitId: U.yojijukugo,
          prompt: "「{一期一会|いちごいちえ}」の {意味|いみ}に {近|ちか}いのは?",
          explanation: "{一生|いっしょう}に {一度|いちど}の であいを {大切|たいせつ}に する、という {意味|いみ}だよ。",
          format: "choice",
          choices: ["{一度|いちど}の であいを {大切|たいせつ}に", "{毎日|まいにち} あう", "{一人|ひとり}で いる", "{一回|いっかい} やすむ"],
          answer: "{一度|いちど}の であいを {大切|たいせつ}に",
        },
        {
          id: `${U.yojijukugo}.q-4`,
          unitId: U.yojijukugo,
          prompt: "{四字熟語|よじじゅくご}は かんじ {何|なん}{文字|もじ}で できている?",
          explanation: "{四字熟語|よじじゅくご}は その {名|な}の とおり かんじ {四|よ}{文字|もじ}で できているよ。",
          format: "choice",
          choices: ["4{文字|もじ}", "2{文字|もじ}", "3{文字|もじ}", "5{文字|もじ}"],
          answer: "4{文字|もじ}",
        },
        {
          id: `${U.yojijukugo}.q-5`,
          unitId: U.yojijukugo,
          prompt: "「{自業自得|じごうじとく}」の {意味|いみ}に {近|ちか}いのは?",
          explanation: "{自分|じぶん}の した ことの けっかは {自分|じぶん}に かえってくる、という {意味|いみ}だよ。",
          format: "choice",
          choices: ["した ことが {自分|じぶん}に かえる", "{人|ひと}の せいに する", "{何|なに}も おきない", "ふたりで わける"],
          answer: "した ことが {自分|じぶん}に かえる",
        },
      ],
    },
  },

  // ── 8. 栄養と健康 ──
  [U.nutritionHealth]: {
    unitId: U.nutritionHealth,
    learn: {
      unitId: U.nutritionHealth,
      steps: [
        {
          heading: "{体|からだ}を つくる{栄養|えいよう}",
          body: "{食|た}べ{物|もの}には、{力|ちから}の もとに なる もの、{体|からだ}を つくる もの、{調子|ちょうし}を ととのえる ものが あるよ。",
          visual: { kind: "emoji", value: "🍚🐟🥦", caption: "3つの はたらき" },
        },
        {
          heading: "バランスよく{食|た}べる",
          body: "ごはん（{力|ちから}）・{肉|にく}や {魚|さかな}（{体|からだ}づくり）・{野菜|やさい}（{調子|ちょうし}）を バランスよく {食|た}べると {元気|げんき}に なるよ。",
          visual: { kind: "emoji", value: "🍽️", caption: "いろいろ {食|た}べよう" },
        },
        {
          heading: "すいみんも{大切|たいせつ}",
          body: "よく {寝|ね}る ことも {健康|けんこう}に たいせつ。すいみん{中|ちゅう}に {体|からだ}が {成長|せいちょう}し、{元気|げんき}が もどるよ。",
          visual: { kind: "emoji", value: "😴🌙", caption: "よく {寝|ね}る" },
        },
      ],
    },
    test: {
      unitId: U.nutritionHealth,
      questionCount: 4,
      questions: [
        {
          id: `${U.nutritionHealth}.q-1`,
          unitId: U.nutritionHealth,
          prompt: "おもに {体|からだ}を つくる はたらきの {食|た}べ{物|もの}は?",
          explanation: "{肉|にく}・{魚|さかな}・たまご・{豆|まめ}などは {体|からだ}（{血|ち}や {筋肉|きんにく}）を つくる はたらきが あるよ。",
          format: "choice",
          choices: ["{肉|にく}や {魚|さかな}", "ごはん だけ", "{水|みず} だけ", "あめ だけ"],
          answer: "{肉|にく}や {魚|さかな}",
        },
        {
          id: `${U.nutritionHealth}.q-2`,
          unitId: U.nutritionHealth,
          prompt: "おもに {力|ちから}の もとに なる {食|た}べ{物|もの}は?",
          explanation: "ごはん・パン・めんなどは {力|ちから}（エネルギー）の もとに なるよ。",
          format: "choice",
          choices: ["ごはんや パン", "{野菜|やさい} だけ", "{魚|さかな} だけ", "{塩|しお} だけ"],
          answer: "ごはんや パン",
        },
        {
          id: `${U.nutritionHealth}.q-3`,
          unitId: U.nutritionHealth,
          prompt: "{体|からだ}の {調子|ちょうし}を ととのえる はたらきが {強|つよ}いのは?",
          explanation: "{野菜|やさい}や くだものは {体|からだ}の {調子|ちょうし}を ととのえる はたらきが あるよ。",
          format: "choice",
          choices: ["{野菜|やさい}や くだもの", "あぶら だけ", "さとう だけ", "ごはん だけ"],
          answer: "{野菜|やさい}や くだもの",
        },
        {
          id: `${U.nutritionHealth}.q-4`,
          unitId: U.nutritionHealth,
          prompt: "{健康|けんこう}な {体|からだ}の ために、{食事|しょくじ}の ほかに たいせつなのは?",
          explanation: "よく {寝|ね}る（すいみん）ことも {健康|けんこう}や {成長|せいちょう}に たいせつだよ。",
          format: "choice",
          choices: ["よく {寝|ね}る こと", "あまり {動|うご}かない こと", "{夜|よる}ふかし", "{食|た}べない こと"],
          answer: "よく {寝|ね}る こと",
        },
      ],
    },
  },
};
