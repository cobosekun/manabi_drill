// ══════════════════════════════════════════
// カリキュラム: 教養（きょうよう / kyoyo）小5
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形（Subject は g1 ファイル側で定義する
// 想定のため、本ファイルは domains / units / contents のみ公開＝重複 export 回避）。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
//
// 【型】SubjectId(drill.ts) は "kyoyo" 未対応。types/index は変更しないルールのため、
//       本ファイル内で `"kyoyo" as SubjectId` の局所吸収で型を通す（→中央へ申し送り: SubjectId に kyoyo/oyo 追加）。
// 【表記】全表示テキストはルビ記法 {漢字|よみ}（全漢字ルビ）。ひらがな/カタカナ/数字/記号は素のまま。
//        formalName は管理用（漢字）のためルビ無し。RubyText レンダラ前提。
// 既存 generators は教養に非対応 → 全単元 固定 questions[]（choice 中心・全問 explanation 必須）。
// ══════════════════════════════════════════

import type { Domain, Unit, UnitContent, SubjectId } from "@/types/curriculum";

// SubjectId の局所吸収（types を変更しないための一点集約。中央で union 拡張後は不要）
const KYOYO: SubjectId = "kyoyo";

// ── 領域（教養6領域。kyoyo/g1.ts と同一 id・同一表示名で整合させる前提） ──
// 表示名(name)は漢字を含まないひらがな表記で統一（ルビ不要・全学年で共有しやすい）。

export const kyoyoG5Domains: Domain[] = [
  { id: "kyoyo.money-life", subjectId: KYOYO, name: "おかね・くらし", formalName: "お金と暮らし" },
  { id: "kyoyo.world-culture", subjectId: KYOYO, name: "せかいのくに・ぶんか", formalName: "世界の国・文化" },
  { id: "kyoyo.history-people", subjectId: KYOYO, name: "いじん・れきし", formalName: "偉人・歴史" },
  { id: "kyoyo.nature-space", subjectId: KYOYO, name: "しぜん・うちゅう", formalName: "自然・宇宙" },
  { id: "kyoyo.language-proverb", subjectId: KYOYO, name: "ことば・ことわざ", formalName: "言葉・ことわざ" },
  { id: "kyoyo.body-manner", subjectId: KYOYO, name: "からだ・マナー", formalName: "体・マナー" },
  // 【新領域 2026-06-03 CEO直轄】きまり・ほうりつ（重複定義OK・index 側で id 重複排除）
  { id: "kyoyo.rules-law", subjectId: "kyoyo", name: "きまり・ほうりつ", formalName: "きまり・法律" },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo）。標準教科や他学年の教養 Unit と将来つなぐ
// （バリデータが最終的に参照解決を検査。g4/g6 教養の slug は中央で命名調整の可能性あり）。
const U = {
  moneyTax: "kyoyo.g5.money-and-tax",
  worldCountries: "kyoyo.g5.world-countries",
  greatPeople: "kyoyo.g5.great-people",
  natureSpace: "kyoyo.g5.nature-and-space",
  proverbs: "kyoyo.g5.proverbs-idioms",
  bodyNutrition: "kyoyo.g5.body-nutrition",
} as const;

export const kyoyoG5Units: Unit[] = [
  {
    id: U.moneyTax,
    subjectId: KYOYO,
    grade: 5,
    domainId: "kyoyo.money-life",
    title: "お{金|かね}のはたらきと{税金|ぜいきん}",
    order: 1,
    realWorldUse:
      "おかいものや、まちの{道路|どうろ}・{学校|がっこう}が どんな お{金|かね}で ささえられているかを{考|かんが}えるときに{役|やく}だつよ。",
    leadsTo: ["kyoyo.g6.money-economy"],
    prerequisites: ["sansuu.g5.ratio-percentage"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.worldCountries,
    subjectId: KYOYO,
    grade: 5,
    domainId: "kyoyo.world-culture",
    title: "{世界|せかい}の{国|くに}と{文化|ぶんか}",
    order: 2,
    realWorldUse:
      "テレビや{本|ほん}で{外国|がいこく}の ニュースや りょこうを{見|み}るときに、その{国|くに}の ことを{知|し}っていると もっと たのしめるよ。",
    leadsTo: ["kyoyo.g6.united-nations"],
    prerequisites: ["kyoyo.g4.world-flags"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.greatPeople,
    subjectId: KYOYO,
    grade: 5,
    domainId: "kyoyo.history-people",
    title: "{偉人|いじん}と{歴史|れきし}",
    order: 3,
    realWorldUse:
      "{今|いま}の べんりな くらしは、むかしの 人の{発明|はつめい}や{発見|はっけん}の おかげ。それを{知|し}ると ものごとの しくみが わかるよ。",
    leadsTo: ["kyoyo.g6.history-people"],
    prerequisites: ["kyoyo.g4.inventors"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.natureSpace,
    subjectId: KYOYO,
    grade: 5,
    domainId: "kyoyo.nature-space",
    title: "{自然|しぜん}と{宇宙|うちゅう}",
    order: 4,
    realWorldUse:
      "よぞらの ほしや、てんきの しくみを{知|し}ると、{自然|しぜん}の ふしぎが もっと おもしろく{感|かん}じられるよ。",
    leadsTo: ["rika.g6.moon-sun"],
    prerequisites: ["rika.g4.weather"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.proverbs,
    subjectId: KYOYO,
    grade: 5,
    domainId: "kyoyo.language-proverb",
    title: "ことわざと{四字熟語|よじじゅくご}",
    order: 5,
    realWorldUse:
      "ことわざや{四字熟語|よじじゅくご}を{知|し}っていると、{気持|きも}ちや{考|かんが}えを みじかい ことばで うまく つたえられるよ。",
    leadsTo: ["kyoyo.g6.yojijukugo"],
    prerequisites: ["kokugo.g4.kanyoku-koji"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.bodyNutrition,
    subjectId: KYOYO,
    grade: 5,
    domainId: "kyoyo.body-manner",
    title: "{体|からだ}のしくみと{栄養|えいよう}",
    order: 6,
    realWorldUse:
      "じぶんの{体|からだ}の しくみや、{食|た}べものの えいようを{知|し}ると、{元気|げんき}に すごす くふうが できるよ。",
    leadsTo: ["rika.g6.human-body"],
    prerequisites: ["rika.g4.body-movement"],
    hasLearn: true,
    hasTest: true,
  },
  // 【新領域】きまり・ほうりつ（g5: けんりと ぎむ / けんぽうと ほうりつ。依存は g5 内で完結）
  {
    id: "kyoyo.g5.rights-duties",
    subjectId: "kyoyo",
    grade: 5,
    domainId: "kyoyo.rules-law",
    title: "けんりと ぎむ",
    order: 10,
    realWorldUse: "{自分|じぶん}にも ほかの{人|ひと}にも ある「けんり」を{知|し}ると、おたがいを{大切|たいせつ}に できるよ。",
    leadsTo: ["kyoyo.g5.constitution-law"],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: "kyoyo.g5.constitution-law",
    subjectId: "kyoyo",
    grade: 5,
    domainId: "kyoyo.rules-law",
    title: "けんぽうと ほうりつ",
    order: 11,
    realWorldUse: "ニュースで でて くる「{憲法|けんぽう}」や「{法律|ほうりつ}」の{意味|いみ}が わかるように なるよ。",
    leadsTo: [],
    prerequisites: ["kyoyo.g5.rights-duties"],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 全テキストはルビ記法。test は 4択 choice・全問 explanation 必須。

export const kyoyoG5Contents: Record<string, UnitContent> = {
  // ── 1. お金のはたらきと税金 ──
  [U.moneyTax]: {
    unitId: U.moneyTax,
    learn: {
      unitId: U.moneyTax,
      steps: [
        {
          heading: "お{金|かね}は こうかんの どうぐ",
          body: "むかしは ものと ものを とりかえる「ぶつぶつこうかん」を していたよ。お{金|かね}が できて、ほしい ものと かんたんに こうかんできるように なったよ。",
          visual: { kind: "emoji", value: "🍎↔️🐟 → 💴", caption: "ものから お金へ" },
        },
        {
          heading: "{税金|ぜいきん}って なに?",
          body: "みんなが{少|すこ}しずつ おさめる お{金|かね}を{税金|ぜいきん}というよ。{学校|がっこう}や{道路|どうろ}、{公園|こうえん}など みんなで つかう ものに つかわれるよ。",
          visual: { kind: "emoji", value: "🏫🛣️🏞️", caption: "みんなの ための お金" },
        },
        {
          heading: "もったいないと SDGs",
          body: "ものを{大切|たいせつ}に つかい、むだを へらす ことは、みらいも{続|つづ}く しゃかい(SDGs)の ために{大事|だいじ}だよ。",
          visual: { kind: "emoji", value: "♻️🌍", caption: "みらいの ための くふう" },
        },
      ],
    },
    test: {
      unitId: U.moneyTax,
      questionCount: 5,
      questions: [
        {
          id: `${U.moneyTax}.q-1`,
          unitId: U.moneyTax,
          prompt: "お{金|かね}が なかった むかし、ものを{手|て}に{入|い}れる ほうほうは?",
          explanation: "むかしは ぶつぶつこうかん(ものと ものの こうかん)で ものを{手|て}に{入|い}れていたよ。",
          format: "choice",
          choices: ["ものと ものを こうかんする", "{銀行|ぎんこう}から かりる", "カードで{払|はら}う", "インターネットで{買|か}う"],
          answer: "ものと ものを こうかんする",
        },
        {
          id: `${U.moneyTax}.q-2`,
          unitId: U.moneyTax,
          prompt: "みんなが おさめて、{学校|がっこう}や{道路|どうろ}に つかわれる お{金|かね}を なんという?",
          explanation: "{税金|ぜいきん}は みんなで つかう ものの ために おさめる お{金|かね}だよ。",
          format: "choice",
          choices: ["{税金|ぜいきん}", "おこづかい", "ちょきん", "しょうきん"],
          answer: "{税金|ぜいきん}",
        },
        {
          id: `${U.moneyTax}.q-3`,
          unitId: U.moneyTax,
          prompt: "SDGs は なんのための もくひょう?",
          explanation: "SDGs は みらいまで{続|つづ}く しゃかいを つくる せかいの もくひょうだよ。",
          format: "choice",
          choices: ["みらいも{続|つづ}く しゃかい", "お{金|かね}もちに なる", "ゲームに{勝|か}つ", "{速|はや}く{走|はし}る"],
          answer: "みらいも{続|つづ}く しゃかい",
        },
        {
          id: `${U.moneyTax}.q-4`,
          unitId: U.moneyTax,
          prompt: "「もったいない」を へらす こうどうは?",
          explanation: "ものを{大切|たいせつ}に つかい、リサイクルする ことで むだを へらせるよ。",
          format: "choice",
          choices: ["ものを{大切|たいせつ}に つかう", "すぐ すてる", "たくさん{買|か}って あまらせる", "つかわず ためこむ"],
          answer: "ものを{大切|たいせつ}に つかう",
        },
        {
          id: `${U.moneyTax}.q-5`,
          unitId: U.moneyTax,
          prompt: "ものの ねだんは おもに なにで きまる?",
          explanation: "ほしい人(じゅよう)が{多|おお}く{品物|しなもの}(きょうきゅう)が{少|すく}ないと ねだんは{上|あ}がるよ。",
          format: "choice",
          choices: ["ほしい人の{多|おお}さと{品物|しなもの}の{量|りょう}", "{店員|てんいん}の きぶん", "てんきの よさ", "{曜日|ようび}だけ"],
          answer: "ほしい人の{多|おお}さと{品物|しなもの}の{量|りょう}",
        },
      ],
    },
  },

  // ── 2. 世界の国と文化 ──
  [U.worldCountries]: {
    unitId: U.worldCountries,
    learn: {
      unitId: U.worldCountries,
      steps: [
        {
          heading: "いろいろな{国|くに}と{国旗|こっき}",
          body: "{世界|せかい}には たくさんの{国|くに}が あり、それぞれ{国旗|こっき}や ことばが ちがうよ。",
          visual: { kind: "emoji", value: "🇯🇵🇫🇷🇺🇸🇨🇳", caption: "いろいろな国旗" },
        },
        {
          heading: "{有名|ゆうめい}な{建物|たてもの}・{世界遺産|せかいいさん}",
          body: "エジプトの ピラミッドや、フランスの エッフェル{塔|とう}など、{世界|せかい}には ゆうめいな ばしょが あるよ。たいせつな ものは{世界遺産|せかいいさん}として まもられるよ。",
          visual: { kind: "emoji", value: "🗼🏛️🐫", caption: "世界の名所" },
        },
        {
          heading: "あいさつの ことば",
          body: "{中国|ちゅうごく}では「ニーハオ」、フランスでは「ボンジュール」。あいさつは{国|くに}に よって ちがうよ。",
          visual: { kind: "emoji", value: "👋🌍", caption: "世界のあいさつ" },
        },
      ],
    },
    test: {
      unitId: U.worldCountries,
      questionCount: 5,
      questions: [
        {
          id: `${U.worldCountries}.q-1`,
          unitId: U.worldCountries,
          prompt: "フランスの しゅとは どこ?",
          explanation: "フランスの しゅとは パリ。エッフェル{塔|とう}が ゆうめいだよ。",
          format: "choice",
          choices: ["パリ", "ローマ", "ロンドン", "ベルリン"],
          answer: "パリ",
        },
        {
          id: `${U.worldCountries}.q-2`,
          unitId: U.worldCountries,
          prompt: "ピラミッドが ある{国|くに}は?",
          explanation: "ピラミッドは アフリカの エジプトに ある むかしの たてものだよ。",
          format: "choice",
          choices: ["エジプト", "ブラジル", "カナダ", "インド"],
          answer: "エジプト",
        },
        {
          id: `${U.worldCountries}.q-3`,
          unitId: U.worldCountries,
          prompt: "{自由|じゆう}の{女神|めがみ}の{像|ぞう}が ある{国|くに}は?",
          explanation: "{自由|じゆう}の{女神|めがみ}は アメリカの ニューヨークに あるよ。",
          format: "choice",
          choices: ["アメリカ", "オーストラリア", "ドイツ", "タイ"],
          answer: "アメリカ",
        },
        {
          id: `${U.worldCountries}.q-4`,
          unitId: U.worldCountries,
          prompt: "「ニーハオ」は どこの{国|くに}の あいさつ?",
          explanation: "「ニーハオ」は{中国語|ちゅうごくご}の あいさつだよ。",
          format: "choice",
          choices: ["{中国|ちゅうごく}", "フランス", "イタリア", "スペイン"],
          answer: "{中国|ちゅうごく}",
        },
        {
          id: `${U.worldCountries}.q-5`,
          unitId: U.worldCountries,
          prompt: "{世界遺産|せかいいさん}を まもる こくさいの きかんは?",
          explanation: "ユネスコ(UNESCO)は たいせつな{世界遺産|せかいいさん}を まもる{国際連合|こくさいれんごう}の きかんだよ。",
          format: "choice",
          choices: ["ユネスコ", "オリンピック", "NASA", "コンビニ"],
          answer: "ユネスコ",
        },
      ],
    },
  },

  // ── 3. 偉人と歴史 ──
  [U.greatPeople]: {
    unitId: U.greatPeople,
    learn: {
      unitId: U.greatPeople,
      steps: [
        {
          heading: "{発明|はつめい}した 人たち",
          body: "エジソンは{電球|でんきゅう}など たくさんの ものを{発明|はつめい}したよ。べんりな どうぐには つくった 人が いるよ。",
          visual: { kind: "emoji", value: "💡🔌", caption: "発明" },
        },
        {
          heading: "{科学|かがく}の{発見|はっけん}",
          body: "ニュートンは ものが{下|した}に おちる りゆう(ばんゆういんりょく)を{見|み}つけたよ。",
          visual: { kind: "emoji", value: "🍎⬇️", caption: "りんごと引力" },
        },
        {
          heading: "{世界|せかい}と{日本|にほん}の{偉人|いじん}",
          body: "ナイチンゲールは、けがや びょうきの 人を{助|たす}ける かんごの しくみを つくったよ。",
          visual: { kind: "emoji", value: "🕯️🩺", caption: "看護のはじまり" },
        },
      ],
    },
    test: {
      unitId: U.greatPeople,
      questionCount: 5,
      questions: [
        {
          id: `${U.greatPeople}.q-1`,
          unitId: U.greatPeople,
          prompt: "{電球|でんきゅう}などを{発明|はつめい}した アメリカの 人は?",
          explanation: "エジソンは{電球|でんきゅう}など 1000を こえる{発明|はつめい}を したよ。",
          format: "choice",
          choices: ["エジソン", "ピカソ", "モーツァルト", "コロンブス"],
          answer: "エジソン",
        },
        {
          id: `${U.greatPeople}.q-2`,
          unitId: U.greatPeople,
          prompt: "ものが{下|した}に おちる りゆうを{見|み}つけた{科学者|かがくしゃ}は?",
          explanation: "ニュートンは ばんゆういんりょく(ものを{引|ひ}く 力)を{見|み}つけたよ。",
          format: "choice",
          choices: ["ニュートン", "エジソン", "ダーウィン", "ベートーベン"],
          answer: "ニュートン",
        },
        {
          id: `${U.greatPeople}.q-3`,
          unitId: U.greatPeople,
          prompt: "「{地球|ちきゅう}は うごいている」と{考|かんが}えた{科学者|かがくしゃ}は?",
          explanation: "ガリレオは{地球|ちきゅう}が うごいている(ちどうせつ)と{考|かんが}えたよ。",
          format: "choice",
          choices: ["ガリレオ", "ナイチンゲール", "エジソン", "コロンブス"],
          answer: "ガリレオ",
        },
        {
          id: `${U.greatPeople}.q-4`,
          unitId: U.greatPeople,
          prompt: "かんごの しくみを ととのえた イギリスの 人は?",
          explanation: "ナイチンゲールは けがや びょうきの 人を{助|たす}ける かんごの しくみを ととのえたよ。",
          format: "choice",
          choices: ["ナイチンゲール", "キュリー", "リンカーン", "シェイクスピア"],
          answer: "ナイチンゲール",
        },
        {
          id: `${U.greatPeople}.q-5`,
          unitId: U.greatPeople,
          prompt: "「{学問|がくもん}のすゝめ」を かいた{日本|にほん}の 人は?",
          explanation: "{福沢諭吉|ふくざわゆきち}は「{学問|がくもん}のすゝめ」を かき、{一万円札|いちまんえんさつ}にも なった 人だよ。",
          format: "choice",
          choices: ["{福沢諭吉|ふくざわゆきち}", "{野口英世|のぐちひでよ}", "{紫式部|むらさきしきぶ}", "{徳川家康|とくがわいえやす}"],
          answer: "{福沢諭吉|ふくざわゆきち}",
        },
      ],
    },
  },

  // ── 4. 自然と宇宙 ──
  [U.natureSpace]: {
    unitId: U.natureSpace,
    learn: {
      unitId: U.natureSpace,
      steps: [
        {
          heading: "{太陽|たいよう}と わくせい",
          body: "{太陽|たいよう}の まわりを まわる ほしを わくせいというよ。{地球|ちきゅう}も わくせいの ひとつだよ。",
          visual: { kind: "emoji", value: "☀️🪐🌍", caption: "太陽系" },
        },
        {
          heading: "{月|つき}は{地球|ちきゅう}の えいせい",
          body: "{月|つき}は{地球|ちきゅう}の まわりを まわる えいせい。じぶんでは ひからず{太陽|たいよう}の{光|ひかり}を はね{返|かえ}しているよ。",
          visual: { kind: "emoji", value: "🌍🌕", caption: "地球と月" },
        },
        {
          heading: "{季節|きせつ}が かわる りゆう",
          body: "{地球|ちきゅう}は すこし かたむいたまま{太陽|たいよう}の まわりを まわるよ。だから{季節|きせつ}が かわるよ。",
          visual: { kind: "emoji", value: "🌸☀️🍂❄️", caption: "四季" },
        },
      ],
    },
    test: {
      unitId: U.natureSpace,
      questionCount: 5,
      questions: [
        {
          id: `${U.natureSpace}.q-1`,
          unitId: U.natureSpace,
          prompt: "{太陽|たいよう}の まわりを まわる ほしを なんという?",
          explanation: "{太陽|たいよう}の まわりを まわる ほしが わくせい。{地球|ちきゅう}や{火星|かせい}が なかまだよ。",
          format: "choice",
          choices: ["わくせい", "えいせい", "こうせい", "ながれぼし"],
          answer: "わくせい",
        },
        {
          id: `${U.natureSpace}.q-2`,
          unitId: U.natureSpace,
          prompt: "「あかい ほし」と よばれる、{地球|ちきゅう}の そとがわの となりの わくせいは?",
          explanation: "{火星|かせい}は あかく{見|み}える わくせいで、{地球|ちきゅう}の そとがわの となりだよ。",
          format: "choice",
          choices: ["{火星|かせい}", "{金星|きんせい}", "{木星|もくせい}", "{土星|どせい}"],
          answer: "{火星|かせい}",
        },
        {
          id: `${U.natureSpace}.q-3`,
          unitId: U.natureSpace,
          prompt: "{地球|ちきゅう}の まわりを まわる ほしは?",
          explanation: "{月|つき}は{地球|ちきゅう}の まわりを まわる えいせいだよ。",
          format: "choice",
          choices: ["{月|つき}", "{太陽|たいよう}", "{北極星|ほっきょくせい}", "すいせい"],
          answer: "{月|つき}",
        },
        {
          id: `${U.natureSpace}.q-4`,
          unitId: U.natureSpace,
          prompt: "{太陽系|たいようけい}で いちばん{大|おお}きい わくせいは?",
          explanation: "{木星|もくせい}は{太陽系|たいようけい}で いちばん{大|おお}きい わくせいだよ。",
          format: "choice",
          choices: ["{木星|もくせい}", "{地球|ちきゅう}", "{水星|すいせい}", "{火星|かせい}"],
          answer: "{木星|もくせい}",
        },
        {
          id: `${U.natureSpace}.q-5`,
          unitId: U.natureSpace,
          prompt: "{季節|きせつ}が かわるのは{地球|ちきゅう}が どうしているから?",
          explanation: "{地球|ちきゅう}が かたむいたまま{太陽|たいよう}の まわりを まわる(こうてん)ため{季節|きせつ}が かわるよ。",
          format: "choice",
          choices: ["かたむいて まわっている", "とまっている", "ちいさくなる", "ひかっている"],
          answer: "かたむいて まわっている",
        },
      ],
    },
  },

  // ── 5. ことわざと四字熟語 ──
  [U.proverbs]: {
    unitId: U.proverbs,
    learn: {
      unitId: U.proverbs,
      steps: [
        {
          heading: "ことわざって なに?",
          body: "むかしの 人の ちえを みじかい ことばに したものが ことわざ。「{石|いし}の{上|うえ}にも{三年|さんねん}」など、いみを{覚|おぼ}えると べんりだよ。",
          visual: { kind: "emoji", value: "📜💡", caption: "昔の人のちえ" },
        },
        {
          heading: "{四字熟語|よじじゅくご}",
          body: "{漢字|かんじ}4つで できた ことばを{四字熟語|よじじゅくご}というよ。「{一石二鳥|いっせきにちょう}」は ひとつの ことで ふたつ とくする いみだよ。",
          visual: { kind: "emoji", value: "🪨🐦🐦", caption: "一石二鳥" },
        },
        {
          heading: "{慣用句|かんようく}",
          body: "「{手|て}を かす」のように、ことばを くみあわせて べつの いみを{表|あらわ}す いいかたを{慣用句|かんようく}というよ。",
          visual: { kind: "emoji", value: "🤝", caption: "手をかす" },
        },
      ],
    },
    test: {
      unitId: U.proverbs,
      questionCount: 5,
      questions: [
        {
          id: `${U.proverbs}.q-1`,
          unitId: U.proverbs,
          prompt: "「{石|いし}の{上|うえ}にも{三年|さんねん}」の いみは?",
          explanation: "つらくても がまんして{続|つづ}ければ、いつか よい けっかが でる、という いみだよ。",
          format: "choice",
          choices: ["がまんづよく{続|つづ}ければ むくわれる", "いしは つめたい", "{三年|さんねん}で やめる", "いしを{投|な}げる"],
          answer: "がまんづよく{続|つづ}ければ むくわれる",
        },
        {
          id: `${U.proverbs}.q-2`,
          unitId: U.proverbs,
          prompt: "「{一石二鳥|いっせきにちょう}」の いみは?",
          explanation: "ひとつの こうどうで、ふたつの よい ことが ある、という いみだよ。",
          format: "choice",
          choices: ["ひとつの ことで ふたつ とくする", "とりを かう", "いしが ふたつ ある", "{二回|にかい}{投|な}げる"],
          answer: "ひとつの ことで ふたつ とくする",
        },
        {
          id: `${U.proverbs}.q-3`,
          unitId: U.proverbs,
          prompt: "「{急|いそ}がば{回|まわ}れ」の いみは?",
          explanation: "いそぐ ときほど、あわてず あんぜんで かくじつな ほうほうを えらぶ ほうが よい、という いみだよ。",
          format: "choice",
          choices: ["いそぐ ときほど あんぜんな みちを", "{走|はし}って いく", "まわり{道|みち}は だめ", "ゆっくり ねる"],
          answer: "いそぐ ときほど あんぜんな みちを",
        },
        {
          id: `${U.proverbs}.q-4`,
          unitId: U.proverbs,
          prompt: "「{百聞|ひゃくぶん}は{一見|いっけん}に{如|し}かず」の いみは?",
          explanation: "{話|はなし}を{何度|なんど}も{聞|き}くより、じっさいに{一度|いちど}{見|み}る ほうが よく わかる、という いみだよ。",
          format: "choice",
          choices: ["{何回|なんかい}{聞|き}くより{一度|いちど}{見|み}る ほうが よい", "100{回|かい}{聞|き}く", "目を とじる", "{聞|き}いては だめ"],
          answer: "{何回|なんかい}{聞|き}くより{一度|いちど}{見|み}る ほうが よい",
        },
        {
          id: `${U.proverbs}.q-5`,
          unitId: U.proverbs,
          prompt: "「{十人十色|じゅうにんといろ}」の いみは?",
          explanation: "{考|かんが}えや このみは、人に よって それぞれ ちがう、という いみだよ。",
          format: "choice",
          choices: ["人それぞれ ちがう", "{十人|じゅうにん} あつまる", "いろが{十|とお}", "みんな おなじ"],
          answer: "人それぞれ ちがう",
        },
      ],
    },
  },

  // ── 6. 体のしくみと栄養 ──
  [U.bodyNutrition]: {
    unitId: U.bodyNutrition,
    learn: {
      unitId: U.bodyNutrition,
      steps: [
        {
          heading: "{食|た}べものの{通|とお}り{道|みち}",
          body: "{口|くち}から{入|はい}った{食|た}べものは、{胃|い}や{腸|ちょう}(しょうかき)で こなされて えいように なるよ。",
          visual: { kind: "emoji", value: "🍙➡️💪", caption: "消化のしくみ" },
        },
        {
          heading: "{心臓|しんぞう}と{肺|はい}",
          body: "{心臓|しんぞう}は{血|ち}を{全身|ぜんしん}に おくる ポンプ。{肺|はい}は いきを すって さんそを とりこむよ。",
          visual: { kind: "emoji", value: "❤️🫁", caption: "心臓と肺" },
        },
        {
          heading: "えいようと マナー",
          body: "たんぱくしつは{体|からだ}を つくる もと。{食事|しょくじ}の まえには「いただきます」と あいさつ しようね。",
          visual: { kind: "emoji", value: "🍳🙏", caption: "栄養とあいさつ" },
        },
      ],
    },
    test: {
      unitId: U.bodyNutrition,
      questionCount: 5,
      questions: [
        {
          id: `${U.bodyNutrition}.q-1`,
          unitId: U.bodyNutrition,
          prompt: "{食|た}べものを こなして えいようを とりこむ ところは?",
          explanation: "{食|た}べものは{胃|い}や{腸|ちょう}(しょうかき)で こなされ、えいようが とりこまれるよ。",
          format: "choice",
          choices: ["{胃|い}や{腸|ちょう}", "{耳|みみ}", "{目|め}", "ほね"],
          answer: "{胃|い}や{腸|ちょう}",
        },
        {
          id: `${U.bodyNutrition}.q-2`,
          unitId: U.bodyNutrition,
          prompt: "{血|ち}を{全身|ぜんしん}に おくる ポンプの やくわりを する ところは?",
          explanation: "{心臓|しんぞう}は ちぢんだり ひろがったり して{血|ち}を{全身|ぜんしん}に おくるよ。",
          format: "choice",
          choices: ["{心臓|しんぞう}", "{肺|はい}", "{胃|い}", "のう"],
          answer: "{心臓|しんぞう}",
        },
        {
          id: `${U.bodyNutrition}.q-3`,
          unitId: U.bodyNutrition,
          prompt: "いきを すって さんそを とりこむ ところは?",
          explanation: "{肺|はい}は すった くうきから さんそを とりこみ、にさんかたんそを だすよ。",
          format: "choice",
          choices: ["{肺|はい}", "{心臓|しんぞう}", "{腸|ちょう}", "ほね"],
          answer: "{肺|はい}",
        },
        {
          id: `${U.bodyNutrition}.q-4`,
          unitId: U.bodyNutrition,
          prompt: "{体|からだ}を つくる もとに なる えいようは?",
          explanation: "たんぱくしつは にくや たまご・まめに{多|おお}く、{体|からだ}を つくる もとに なるよ。",
          format: "choice",
          choices: ["たんぱくしつ", "さとう だけ", "しお だけ", "みず だけ"],
          answer: "たんぱくしつ",
        },
        {
          id: `${U.bodyNutrition}.q-5`,
          unitId: U.bodyNutrition,
          prompt: "{食事|しょくじ}の まえに いう あいさつは?",
          explanation: "{食事|しょくじ}の まえは「いただきます」、おわりは「ごちそうさま」と いうのが マナーだよ。",
          format: "choice",
          choices: ["いただきます", "おやすみ", "ただいま", "さようなら"],
          answer: "いただきます",
        },
      ],
    },
  },

  // 【新領域】きまり・ほうりつ
  ["kyoyo.g5.rights-duties"]: {
    unitId: "kyoyo.g5.rights-duties",
    learn: {
      unitId: "kyoyo.g5.rights-duties",
      steps: [
        {
          heading: "けんりって なに？",
          body: "まなぶ・あそぶ・あんぜんに くらす など、だれもが もっている{大切|たいせつ}な ものが「{権利|けんり}」だよ。",
          visual: { kind: "emoji", value: "🙋", caption: "だれもが もつ もの" },
        },
        {
          heading: "ぎむも ある",
          body: "{権利|けんり}が ある いっぽうで、きまりを まもる・{勉強|べんきょう}する などの「ぎむ（しなければ ならない こと）」も あるよ。",
          visual: { kind: "emoji", value: "⚖️", caption: "けんりと ぎむ" },
        },
      ],
    },
    test: {
      unitId: "kyoyo.g5.rights-duties",
      questionCount: 3,
      questions: [
        {
          id: "kyoyo.g5.rights-duties.q-1",
          unitId: "kyoyo.g5.rights-duties",
          prompt: "「{権利|けんり}」に いちばん{近|ちか}いのは？",
          explanation: "{権利|けんり}は、まなぶ・あんぜんに くらす など だれもが もつ{大切|たいせつ}な ものだよ。",
          format: "choice",
          choices: ["だれもが もつ{大切|たいせつ}な もの", "おかねで{買|か}う もの", "つよい{人|ひと}だけの もの", "ゲームの どうぐ"],
          answer: "だれもが もつ{大切|たいせつ}な もの",
        },
        {
          id: "kyoyo.g5.rights-duties.q-2",
          unitId: "kyoyo.g5.rights-duties",
          prompt: "{学校|がっこう}で まなぶ ことは こどもの なに？",
          explanation: "まなぶ ことは こどもの{大切|たいせつ}な{権利|けんり}だよ。",
          format: "choice",
          choices: ["{権利|けんり}（まなぶ けんり）", "ばつ", "しごと だけ", "あそび だけ"],
          answer: "{権利|けんり}（まなぶ けんり）",
        },
        {
          id: "kyoyo.g5.rights-duties.q-3",
          unitId: "kyoyo.g5.rights-duties",
          prompt: "{自分|じぶん}の けんりと おなじくらい{大切|たいせつ}なのは？",
          explanation: "{自分|じぶん}と おなじように、ほかの{人|ひと}の{権利|けんり}も{大切|たいせつ}に しようね。",
          format: "choice",
          choices: ["ほかの{人|ひと}の けんり", "かつ こと", "おかね", "じかん"],
          answer: "ほかの{人|ひと}の けんり",
        },
      ],
    },
  },

  ["kyoyo.g5.constitution-law"]: {
    unitId: "kyoyo.g5.constitution-law",
    learn: {
      unitId: "kyoyo.g5.constitution-law",
      steps: [
        {
          heading: "{憲法|けんぽう}は おおもとの きまり",
          body: "{国|くに}の いちばん おおもとの きまりが「{憲法|けんぽう}」。すべての{法律|ほうりつ}は{憲法|けんぽう}に もとづいて つくられるよ。",
          visual: { kind: "emoji", value: "📜", caption: "いちばん おおもと" },
        },
        {
          heading: "{日本国憲法|にほんこくけんぽう}の{3|みっ}つの{柱|はしら}",
          body: "「{国民|こくみん}が きめる」「へいわ」「{基本的人権|きほんてきじんけん}（みんなの けんり）」の{3|みっ}つが{大切|たいせつ}に されているよ。",
          visual: { kind: "emoji", value: "🏛️", caption: "{3|みっ}つの{柱|はしら}" },
        },
      ],
    },
    test: {
      unitId: "kyoyo.g5.constitution-law",
      questionCount: 3,
      questions: [
        {
          id: "kyoyo.g5.constitution-law.q-1",
          unitId: "kyoyo.g5.constitution-law",
          prompt: "{国|くに}の いちばん おおもとの きまりを なんという？",
          explanation: "{国|くに}の おおもとの きまりが{憲法|けんぽう}。{法律|ほうりつ}は これに もとづくよ。",
          format: "choice",
          choices: ["{憲法|けんぽう}", "しゅくだい", "ルールブック", "カレンダー"],
          answer: "{憲法|けんぽう}",
        },
        {
          id: "kyoyo.g5.constitution-law.q-2",
          unitId: "kyoyo.g5.constitution-law",
          prompt: "{法律|ほうりつ}は なにに もとづいて つくられる？",
          explanation: "すべての{法律|ほうりつ}は{憲法|けんぽう}に もとづいて つくられるよ。",
          format: "choice",
          choices: ["{憲法|けんぽう}", "{天気|てんき}", "ゲーム", "うた"],
          answer: "{憲法|けんぽう}",
        },
        {
          id: "kyoyo.g5.constitution-law.q-3",
          unitId: "kyoyo.g5.constitution-law",
          prompt: "{日本国憲法|にほんこくけんぽう}が{大切|たいせつ}に している ものは？",
          explanation: "{日本国憲法|にほんこくけんぽう}は へいわと{基本的人権|きほんてきじんけん}（みんなの けんり）を{大切|たいせつ}に しているよ。",
          format: "choice",
          choices: ["へいわと みんなの けんり", "せんそう", "おかねもち だけ", "つよい{人|ひと} だけ"],
          answer: "へいわと みんなの けんり",
        },
      ],
    },
  },
};
