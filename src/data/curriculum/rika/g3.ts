// ══════════════════════════════════════════
// カリキュラム: 理科（りか）小3
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 理科は小3スタート。SubjectId/ThemeName は drill.ts が既に rika / emerald を持つため as 等は不要。
// 既存 generators は理科に非対応 → 全単元 固定 questions[]（全問 explanation 必須）。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type { Subject, Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const rikaSubject: Subject = {
  id: "rika",
  name: "りか",
  formalName: "理科",
  emoji: "🔬",
  theme: "emerald",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域（理科4領域: エネルギー / 粒子 / 生命 / 地球） ──

export const rikaG3Domains: Domain[] = [
  {
    id: "rika.energy",
    subjectId: "rika",
    name: "エネルギー",
    formalName: "エネルギー",
  },
  {
    id: "rika.particle",
    subjectId: "rika",
    name: "つぶ（もののせいしつ）",
    formalName: "粒子",
  },
  {
    id: "rika.life",
    subjectId: "rika",
    name: "いのち（{生|い}き{物|もの}）",
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
// 依存グラフ（prerequisites / leadsTo）。生活科(g1-2)を前提にしたり g4以降へつなぐ
// 前提で他学年/他教科 id を指す（バリデータが最終的に参照解決を検査）。
//
//   nature-observation ─▶ plant-growth / insect-body
//   electric-circuit ─▶ magnet（エネルギー系）
//   wind-rubber / light-sound（エネルギー系）
//   matter-weight（粒子） / sun-ground（地球）
//
const U = {
  natureObservation: "rika.g3.nature-observation",
  plantGrowth: "rika.g3.plant-growth",
  insectBody: "rika.g3.insect-body",
  lightSound: "rika.g3.light-sound",
  magnet: "rika.g3.magnet",
  electricCircuit: "rika.g3.electric-circuit",
  windRubber: "rika.g3.wind-rubber",
  matterWeight: "rika.g3.matter-weight",
  sunGround: "rika.g3.sun-ground",
} as const;

// 他学年/他教科の参照先 id（将来 worker が用意する前提で文字列指定）
const SEIKATSU = {
  livingThings: "seikatsu.g2.living-things", // 生活科の生き物単元
} as const;
const G4 = {
  matterStates: "rika.g4.matter-states", // もののすがた（水のすがた等）
  electricCurrent: "rika.g4.electric-current", // 電気のはたらき
  weather: "rika.g4.weather", // 天気と気温
} as const;
const G5 = {
  plantSeed: "rika.g5.plant-fruit", // 植物の発芽・成長・結実
  insectMetamorphosis: "rika.g5.life-continuity",
} as const;

export const rikaG3Units: Unit[] = [
  {
    id: U.natureObservation,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.life",
    title: "みぢかな しぜんの かんさつ",
    order: 1,
    realWorldUse:
      "こうえんや にわで {生|い}き{物|もの}を さがして かんさつ するときのように、まわりの しぜんに きづいて くらべる{力|ちから}を つかうよ。",
    leadsTo: [U.plantGrowth, U.insectBody],
    prerequisites: [SEIKATSU.livingThings],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.plantGrowth,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.life",
    title: "しょくぶつの そだち",
    order: 2,
    realWorldUse:
      "アサガオや ホウセンカを そだてて {花|はな}や たねを とるときのように、しょくぶつが どう そだつかを しるのに やくだつよ。",
    leadsTo: [G5.plantSeed],
    prerequisites: [U.natureObservation],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.insectBody,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.life",
    title: "こんちゅうの からだと そだち",
    order: 3,
    realWorldUse:
      "チョウや バッタを かって せい{虫|ちゅう}まで そだてるときのように、こん{虫|ちゅう}の からだの つくりや そだちかたを しるのに つかうよ。",
    leadsTo: [G5.insectMetamorphosis],
    prerequisites: [U.natureObservation],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.lightSound,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.energy",
    title: "ひかりと おとの せいしつ",
    order: 4,
    realWorldUse:
      "かがみで ひかりを はね{返|かえ}したり、たいこの おとを {出|だ}すあそびのように、ひかりや おとの しくみを しるのに やくだつよ。",
    leadsTo: [],
    prerequisites: [U.natureObservation],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.magnet,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.energy",
    title: "じしゃくの ふしぎ",
    order: 5,
    realWorldUse:
      "れいぞうこに メモを とめる じしゃくや、さかなつりゲームのように、じしゃくが なにに つくか・どう はたらくかを しるのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.electricCircuit],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.electricCircuit,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.energy",
    title: "でんきの とおりみち",
    order: 6,
    realWorldUse:
      "かいちゅうでんとうや まめでんきゅうを つけるときのように、でんきが ながれる みち（かいろ）を しるのに やくだつよ。",
    leadsTo: [U.magnet, G4.electricCurrent],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.windRubber,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.energy",
    title: "かぜと ゴムの {力|ちから}",
    order: 7,
    realWorldUse:
      "ほかけ{車|くるま}や ゴムで うごく おもちゃのように、かぜや ゴムの {力|ちから}で ものを うごかす しくみを しるのに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.matterWeight,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.particle",
    title: "ものと おもさ",
    order: 8,
    realWorldUse:
      "ねんどや すなの おもさを はかりで くらべるときのように、ものの かたちや しゅるいと おもさの かんけいを しるのに やくだつよ。",
    leadsTo: [G4.matterStates],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sunGround,
    subjectId: "rika",
    grade: 3,
    domainId: "rika.earth",
    title: "たいようと じめんの ようす",
    order: 9,
    realWorldUse:
      "ひなたと ひかげの あたたかさの ちがいや、かげふみあそびのように、たいようの うごきと じめんの ようすを しるのに つかうよ。",
    leadsTo: [G4.weather],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 理科は固定 questions[]（4択 choice、全問 explanation 必須）。図は emoji 中心。

export const rikaG3Contents: Record<string, UnitContent> = {
  // ── 1. 身近な自然の観察 ──
  [U.natureObservation]: {
    unitId: U.natureObservation,
    learn: {
      unitId: U.natureObservation,
      steps: [
        {
          heading: "{生|い}き{物|もの}を さがそう",
          body: "こうえんや にわには いろいろな {生|い}き{物|もの}が いるよ。どこに いるか、どんな ようすかを よく みてみよう。",
          visual: { kind: "emoji", value: "🌳🐞🦋🌸", caption: "いろいろな {生|い}き{物|もの}" },
        },
        {
          heading: "むしめがねで {大|おお}きく みる",
          body: "ちいさい {生|い}き{物|もの}は むしめがねで {大|おお}きく して みると、からだの ようすが よく わかるよ。",
          visual: { kind: "emoji", value: "🔍🐜", caption: "むしめがねで かんさつ" },
        },
        {
          heading: "くらべて きづく",
          body: "{生|い}き{物|もの}には いろ・{大|おお}きさ・かたちに ちがいが あるよ。すんでいる ばしょも くらべてみよう。",
          visual: { kind: "emoji", value: "🐞 vs 🦗", caption: "ちがいを くらべる" },
        },
      ],
    },
    test: {
      unitId: U.natureObservation,
      questionCount: 5,
      questions: [
        {
          id: `${U.natureObservation}.q-1`,
          unitId: U.natureObservation,
          prompt: "ちいさい {生|い}き{物|もの}を {大|おお}きく して みる どうぐは?",
          explanation: "むしめがねは ちいさい ものを {大|おお}きく して みる どうぐだよ。",
          format: "choice",
          choices: ["むしめがね", "ものさし", "とけい", "はかり"],
          answer: "むしめがね",
        },
        {
          id: `${U.natureObservation}.q-2`,
          unitId: U.natureObservation,
          prompt: "ダンゴムシが よく いる ばしょは?",
          explanation: "ダンゴムシは いしや おちばの したの じめじめした ところに よく いるよ。",
          format: "choice",
          choices: ["いしや おちばの した", "そらの {上|うえ}", "あつい ひの{中|なか}", "つめたい こおりの{中|なか}"],
          answer: "いしや おちばの した",
        },
        {
          id: `${U.natureObservation}.q-3`,
          unitId: U.natureObservation,
          prompt: "タンポポが よく みられるのは どんな ばしょ?",
          explanation: "タンポポは {日|ひ}あたりの よい あかるい ところで よく そだつよ。",
          format: "choice",
          choices: ["{日|ひ}あたりの よい ところ", "くらい みずの{中|なか}", "ひの{中|なか}", "こおりの{中|なか}"],
          answer: "{日|ひ}あたりの よい ところ",
        },
        {
          id: `${U.natureObservation}.q-4`,
          unitId: U.natureObservation,
          prompt: "{生|い}き{物|もの}の ながさを はかる どうぐは?",
          explanation: "ながさや {大|おお}きさを はかるには ものさしを つかうよ。",
          format: "choice",
          choices: ["ものさし", "むしめがね", "ほうしんばこ", "おんどけい"],
          answer: "ものさし",
        },
        {
          id: `${U.natureObservation}.q-5`,
          unitId: U.natureObservation,
          prompt: "{生|い}き{物|もの}の いろや {大|おお}きさや かたちは?",
          explanation: "{生|い}き{物|もの}には いろ・{大|おお}きさ・かたちに それぞれ ちがいが あるよ。",
          format: "choice",
          choices: ["しゅるいで ちがう", "ぜんぶ おなじ", "いろだけ おなじ", "かたちだけ おなじ"],
          answer: "しゅるいで ちがう",
        },
      ],
    },
  },

  // ── 2. 植物の育ち ──
  [U.plantGrowth]: {
    unitId: U.plantGrowth,
    learn: {
      unitId: U.plantGrowth,
      steps: [
        {
          heading: "たねから め が {出|で}る",
          body: "たねを まいて みずを やると、さいしょに「ふたば」が {出|で}てくるよ。そのあと はが ふえていくよ。",
          visual: { kind: "emoji", value: "🌰→🌱→🌿", caption: "たね→め→は" },
        },
        {
          heading: "しょくぶつの からだ",
          body: "しょくぶつの からだは「ねっこ」「くき」「は」で できているよ。それぞれ やくわりが あるよ。",
          visual: { kind: "emoji", value: "🌿", caption: "ね・くき・は" },
        },
        {
          heading: "{花|はな}が さいて たねが できる",
          body: "そだつと {花|はな}が さき、{花|はな}の あとに たね（み）が できるよ。たねは また つぎの しょくぶつに なるよ。",
          visual: { kind: "emoji", value: "🌸→🌰", caption: "{花|はな}→たね" },
        },
      ],
    },
    test: {
      unitId: U.plantGrowth,
      questionCount: 5,
      questions: [
        {
          id: `${U.plantGrowth}.q-1`,
          unitId: U.plantGrowth,
          prompt: "たねを まいて さいしょに {出|で}てくるのは?",
          explanation: "さいしょに {出|で}てくるのは「ふたば（{子|し}{葉|よう}）」。そのあと はが ふえるよ。",
          format: "choice",
          choices: ["ふたば", "{花|はな}", "み", "ねっこだけ"],
          answer: "ふたば",
        },
        {
          id: `${U.plantGrowth}.q-2`,
          unitId: U.plantGrowth,
          prompt: "しょくぶつの からだ「ねっこ・くき」と あと ひとつは?",
          explanation: "しょくぶつの からだは ねっこ・くき・はの 3つで できているよ。",
          format: "choice",
          choices: ["は", "み", "つち", "みず"],
          answer: "は",
        },
        {
          id: `${U.plantGrowth}.q-3`,
          unitId: U.plantGrowth,
          prompt: "しょくぶつが そだつ じゅんばんで ただしいのは?",
          explanation: "たね→め→は→{花|はな}→み（たね）の じゅんに そだつよ。",
          format: "choice",
          choices: ["たね→め→は→{花|はな}→み", "{花|はな}→たね→は", "み→{花|はな}→め", "は→たね→{花|はな}"],
          answer: "たね→め→は→{花|はな}→み",
        },
        {
          id: `${U.plantGrowth}.q-4`,
          unitId: U.plantGrowth,
          prompt: "{花|はな}が さいた あとに できるのは?",
          explanation: "{花|はな}の あとには たね（み）が できるよ。たねから また そだつよ。",
          format: "choice",
          choices: ["たね", "ふたば", "ねっこ", "くき"],
          answer: "たね",
        },
        {
          id: `${U.plantGrowth}.q-5`,
          unitId: U.plantGrowth,
          prompt: "しょくぶつが そだつのに いるものは?",
          explanation: "しょくぶつは みずと {日光|にっこう}（と くうき）で そだつよ。",
          format: "choice",
          choices: ["みずと {日光|にっこう}", "くらやみ", "こおり", "おとだけ"],
          answer: "みずと {日光|にっこう}",
        },
      ],
    },
  },

  // ── 3. こん虫の体と育ち ──
  [U.insectBody]: {
    unitId: U.insectBody,
    learn: {
      unitId: U.insectBody,
      steps: [
        {
          heading: "こん{虫|ちゅう}の からだ",
          body: "こん{虫|ちゅう}の からだは「あたま」「むね」「はら」の 3つに わかれているよ。",
          visual: { kind: "emoji", value: "🐝", caption: "あたま・むね・はら" },
        },
        {
          heading: "あしは 6{本|ほん}",
          body: "こん{虫|ちゅう}の あしは ぜんぶで 6{本|ほん}。みんな「むね」から {出|で}ているよ。はねも むねに ついているよ。",
          visual: { kind: "emoji", value: "🦗", caption: "あしは むねから 6{本|ほん}" },
        },
        {
          heading: "そだちかたの ちがい",
          body: "チョウは たまご→よう{虫|ちゅう}→さなぎ→せい{虫|ちゅう}。バッタは さなぎに ならず よう{虫|ちゅう}から せい{虫|ちゅう}に なるよ。",
          visual: { kind: "emoji", value: "🥚→🐛→🛡️→🦋", caption: "チョウの そだち" },
        },
      ],
    },
    test: {
      unitId: U.insectBody,
      questionCount: 5,
      questions: [
        {
          id: `${U.insectBody}.q-1`,
          unitId: U.insectBody,
          prompt: "こん{虫|ちゅう}の からだ「あたま・むね」と あと ひとつは?",
          explanation: "こん{虫|ちゅう}の からだは あたま・むね・はらの 3つに わかれるよ。",
          format: "choice",
          choices: ["はら", "あし", "はね", "せなか"],
          answer: "はら",
        },
        {
          id: `${U.insectBody}.q-2`,
          unitId: U.insectBody,
          prompt: "こん{虫|ちゅう}の あしは ぜんぶで なん{本|ほん}?",
          explanation: "こん{虫|ちゅう}の あしは むねから 6{本|ほん} {出|で}ているよ。",
          format: "choice",
          choices: ["6{本|ほん}", "4{本|ほん}", "8{本|ほん}", "2{本|ほん}"],
          answer: "6{本|ほん}",
        },
        {
          id: `${U.insectBody}.q-3`,
          unitId: U.insectBody,
          prompt: "チョウの そだちかたで ただしいのは?",
          explanation: "チョウは たまご→よう{虫|ちゅう}→さなぎ→せい{虫|ちゅう}の じゅんに そだつよ。",
          format: "choice",
          choices: [
            "たまご→よう{虫|ちゅう}→さなぎ→せい{虫|ちゅう}",
            "たまご→さなぎ→せい{虫|ちゅう}",
            "よう{虫|ちゅう}→たまご→せい{虫|ちゅう}",
            "せい{虫|ちゅう}→たまご→よう{虫|ちゅう}",
          ],
          answer: "たまご→よう{虫|ちゅう}→さなぎ→せい{虫|ちゅう}",
        },
        {
          id: `${U.insectBody}.q-4`,
          unitId: U.insectBody,
          prompt: "バッタは そだつとき「さなぎ」に なる?",
          explanation: "バッタは さなぎに ならず、よう{虫|ちゅう}から せい{虫|ちゅう}に なるよ。",
          format: "choice",
          choices: ["ならない", "なる", "2かい なる", "たまごで なる"],
          answer: "ならない",
        },
        {
          id: `${U.insectBody}.q-5`,
          unitId: U.insectBody,
          prompt: "こん{虫|ちゅう}の あしや はねは からだの どこに ついている?",
          explanation: "あしも はねも「むね」に ついているよ。",
          format: "choice",
          choices: ["むね", "あたま", "はら", "ぜんぶ"],
          answer: "むね",
        },
      ],
    },
  },

  // ── 4. 光と音の性質 ──
  [U.lightSound]: {
    unitId: U.lightSound,
    learn: {
      unitId: U.lightSound,
      steps: [
        {
          heading: "ひかりは まっすぐ すすむ",
          body: "かがみで {日光|にっこう}を はね{返|かえ}すと、ひかりは まっすぐ すすむよ。むきを かえると ひかりも かわるよ。",
          visual: { kind: "emoji", value: "🪞➡️☀️", caption: "ひかりは まっすぐ" },
        },
        {
          heading: "ひかりを あつめると あつい",
          body: "かがみや {虫|むし}めがねで {日光|にっこう}を {一|ひと}つの ところに あつめると、そこは あかるく あつく なるよ。",
          visual: { kind: "emoji", value: "🔍☀️🔥", caption: "あつめると あつくなる" },
        },
        {
          heading: "おとは ふるえている",
          body: "おとが {出|で}ている ものは ふるえているよ。おとが {大|おお}きいほど ふるえも {大|おお}きいよ。",
          visual: { kind: "emoji", value: "🥁〰️", caption: "ふるえて おとが {出|で}る" },
        },
      ],
    },
    test: {
      unitId: U.lightSound,
      questionCount: 5,
      questions: [
        {
          id: `${U.lightSound}.q-1`,
          unitId: U.lightSound,
          prompt: "かがみで はね{返|かえ}した {日光|にっこう}は どう すすむ?",
          explanation: "ひかりは まっすぐ すすむよ。だから かがみの むきで あたる ところが かわるよ。",
          format: "choice",
          choices: ["まっすぐ すすむ", "まがって すすむ", "{下|した}に おちる", "すぐ きえる"],
          answer: "まっすぐ すすむ",
        },
        {
          id: `${U.lightSound}.q-2`,
          unitId: U.lightSound,
          prompt: "{日光|にっこう}を かがみで あつめた ところは どうなる?",
          explanation: "{日光|にっこう}を あつめると あかるく、あたたかく（あつく）なるよ。",
          format: "choice",
          choices: ["あかるく あたたかくなる", "くらく つめたくなる", "あおくなる", "なにも かわらない"],
          answer: "あかるく あたたかくなる",
        },
        {
          id: `${U.lightSound}.q-3`,
          unitId: U.lightSound,
          prompt: "おとが {出|で}ている ものは どうなっている?",
          explanation: "おとが {出|で}ている ものは ふるえているよ。さわると ふるえが わかるよ。",
          format: "choice",
          choices: ["ふるえている", "とまっている", "ひかっている", "つめたい"],
          answer: "ふるえている",
        },
        {
          id: `${U.lightSound}.q-4`,
          unitId: U.lightSound,
          prompt: "おとが {大|おお}きいほど ものの ふるえは どうなる?",
          explanation: "おとが {大|おお}きいほど ふるえも {大|おお}きくなるよ。",
          format: "choice",
          choices: ["{大|おお}きくなる", "{小|ちい}さくなる", "なくなる", "かわらない"],
          answer: "{大|おお}きくなる",
        },
        {
          id: `${U.lightSound}.q-5`,
          unitId: U.lightSound,
          prompt: "{虫|むし}めがねで {日光|にっこう}を {一|ひと}つの ところに あつめると {紙|かみ}は?",
          explanation: "ひかりを {一|いっ}てんに あつめると とても あつくなり、{紙|かみ}が こげることも あるよ。",
          format: "choice",
          choices: ["あつくなって こげる", "つめたくなる", "あおくなる", "ぬれる"],
          answer: "あつくなって こげる",
        },
      ],
    },
  },

  // ── 5. 磁石のふしぎ ──
  [U.magnet]: {
    unitId: U.magnet,
    learn: {
      unitId: U.magnet,
      steps: [
        {
          heading: "じしゃくに つくもの",
          body: "じしゃくは「てつ」で できた ものに つくよ。{木|き}や ガラスや ゴムには つかないよ。",
          visual: { kind: "emoji", value: "🧲📎", caption: "てつに つく" },
        },
        {
          heading: "2つの きょく",
          body: "じしゃくには N きょくと S きょくの 2つの きょくが あるよ。きょくの ところが いちばん つよく つくよ。",
          visual: { kind: "emoji", value: "🧲 N–S", caption: "NきょくとSきょく" },
        },
        {
          heading: "{引|ひ}き{合|あ}う・しりぞけ{合|あ}う",
          body: "ちがう きょくは {引|ひ}き{合|あ}い、おなじ きょくは しりぞけ{合|あ}うよ。はなれていても てつを {引|ひ}きつけるよ。",
          visual: { kind: "emoji", value: "N↔S {引|ひ}く / N↔N おす", caption: "きょくの きまり" },
        },
      ],
    },
    test: {
      unitId: U.magnet,
      questionCount: 5,
      questions: [
        {
          id: `${U.magnet}.q-1`,
          unitId: U.magnet,
          prompt: "じしゃくに つくのは?",
          explanation: "じしゃくは てつで できた ものに つくよ。{木|き}・ガラス・ゴムには つかないよ。",
          format: "choice",
          choices: ["てつ", "{木|き}", "ガラス", "ゴム"],
          answer: "てつ",
        },
        {
          id: `${U.magnet}.q-2`,
          unitId: U.magnet,
          prompt: "じしゃくの きょくは いくつ ある?",
          explanation: "じしゃくには Nきょくと Sきょくの 2つの きょくが あるよ。",
          format: "choice",
          choices: ["2つ", "1つ", "3つ", "4つ"],
          answer: "2つ",
        },
        {
          id: `${U.magnet}.q-3`,
          unitId: U.magnet,
          prompt: "じしゃくの おなじ きょくどうしを {近|ちか}づけると?",
          explanation: "おなじ きょくどうしは しりぞけ{合|あ}う（おし{合|あ}う）よ。",
          format: "choice",
          choices: ["しりぞけ{合|あ}う", "{引|ひ}き{合|あ}う", "ひかる", "おもくなる"],
          answer: "しりぞけ{合|あ}う",
        },
        {
          id: `${U.magnet}.q-4`,
          unitId: U.magnet,
          prompt: "じしゃくの ちがう きょくどうしを {近|ちか}づけると?",
          explanation: "ちがう きょくどうしは {引|ひ}き{合|あ}う（くっつく）よ。",
          format: "choice",
          choices: ["{引|ひ}き{合|あ}う", "しりぞけ{合|あ}う", "なにもしない", "こおる"],
          answer: "{引|ひ}き{合|あ}う",
        },
        {
          id: `${U.magnet}.q-5`,
          unitId: U.magnet,
          prompt: "じしゃくは すこし はなれていても てつを?",
          explanation: "じしゃくは はなれていても てつを {引|ひ}きつける{力|ちから}が あるよ。",
          format: "choice",
          choices: ["{引|ひ}きつける", "{引|ひ}きつけない", "おしのける", "あたためる"],
          answer: "{引|ひ}きつける",
        },
      ],
    },
  },

  // ── 6. 電気の通り道 ──
  [U.electricCircuit]: {
    unitId: U.electricCircuit,
    learn: {
      unitId: U.electricCircuit,
      steps: [
        {
          heading: "わ（かいろ）に なると つく",
          body: "かん{電池|でんち}・どうせん・{豆|まめ}{電球|でんきゅう}が {一|ひと}つの わ に つながると、{電気|でんき}が ながれて {豆|まめ}{電球|でんきゅう}が つくよ。この みちを「かいろ」というよ。",
          visual: { kind: "emoji", value: "🔋➰💡", caption: "ひとまわりの わ" },
        },
        {
          heading: "とちゅうが きれると つかない",
          body: "どうせんが とちゅうで きれていたり はずれていると、{電気|でんき}が ながれず {豆|まめ}{電球|でんきゅう}は つかないよ。",
          visual: { kind: "emoji", value: "🔋✂️💡", caption: "きれると つかない" },
        },
        {
          heading: "{電気|でんき}を {通|とお}すもの・{通|とお}さないもの",
          body: "てつや どうなどの {金|きん}ぞくは {電気|でんき}を {通|とお}すよ。{木|き}・ゴム・プラスチックは {通|とお}さないよ。",
          visual: { kind: "emoji", value: "🔩⭕ / 🪵❌", caption: "{金|きん}ぞくは {通|とお}す" },
        },
      ],
    },
    test: {
      unitId: U.electricCircuit,
      questionCount: 5,
      questions: [
        {
          id: `${U.electricCircuit}.q-1`,
          unitId: U.electricCircuit,
          prompt: "{豆|まめ}{電球|でんきゅう}が つくのは どんなとき?",
          explanation: "かん{電池|でんち}・どうせん・{豆|まめ}{電球|でんきゅう}が ひとまわりの わ（かいろ）に なっているとき つくよ。",
          format: "choice",
          choices: ["わ（かいろ）に なっているとき", "とちゅうが きれているとき", "くらいとき", "つめたいとき"],
          answer: "わ（かいろ）に なっているとき",
        },
        {
          id: `${U.electricCircuit}.q-2`,
          unitId: U.electricCircuit,
          prompt: "{電気|でんき}を よく {通|とお}すものは?",
          explanation: "てつや どうなどの {金|きん}ぞくは {電気|でんき}を {通|とお}すよ。",
          format: "choice",
          choices: ["てつや どうなどの {金|きん}ぞく", "{木|き}", "ゴム", "{紙|かみ}"],
          answer: "てつや どうなどの {金|きん}ぞく",
        },
        {
          id: `${U.electricCircuit}.q-3`,
          unitId: U.electricCircuit,
          prompt: "{電気|でんき}を {通|とお}さないものは?",
          explanation: "プラスチックや {木|き}・ゴムは {電気|でんき}を {通|とお}さないよ。",
          format: "choice",
          choices: ["プラスチック", "てつのくぎ", "アルミ", "どうせん"],
          answer: "プラスチック",
        },
        {
          id: `${U.electricCircuit}.q-4`,
          unitId: U.electricCircuit,
          prompt: "どうせんが とちゅうで きれていると {豆|まめ}{電球|でんきゅう}は?",
          explanation: "わが とちゅうで きれると {電気|でんき}が ながれず、{豆|まめ}{電球|でんきゅう}は つかないよ。",
          format: "choice",
          choices: ["つかない", "つく", "あかるくなる", "2つ つく"],
          answer: "つかない",
        },
        {
          id: `${U.electricCircuit}.q-5`,
          unitId: U.electricCircuit,
          prompt: "{電気|でんき}が ながれる ひとまわりの みちを なんという?",
          explanation: "{電気|でんき}が ながれる ひとまわりの みちを「かいろ」というよ。",
          format: "choice",
          choices: ["かいろ", "きょく", "スイッチ", "でんち"],
          answer: "かいろ",
        },
      ],
    },
  },

  // ── 7. 風とゴムの力 ──
  [U.windRubber]: {
    unitId: U.windRubber,
    learn: {
      unitId: U.windRubber,
      steps: [
        {
          heading: "かぜの {力|ちから}で うごく",
          body: "ほを つけた {車|くるま}に かぜを あてると すすむよ。かぜが つよいほど とおくまで すすむよ。",
          visual: { kind: "emoji", value: "💨⛵🚗", caption: "かぜで うごく" },
        },
        {
          heading: "ゴムの {力|ちから}で うごく",
          body: "のばした ゴムは もとに もどろうと するよ。その {力|ちから}で {車|くるま}を うごかせるよ。ゴムを {長|なが}く のばすほど とおくまで すすむよ。",
          visual: { kind: "emoji", value: "🪢➡️🚗", caption: "ゴムで うごく" },
        },
        {
          heading: "{力|ちから}の {大|おお}きさを かえる",
          body: "かぜや ゴムの {力|ちから}を {大|おお}きくすると ものは とおくまで、{小|ちい}さくすると みじかく しか うごかないよ。",
          visual: { kind: "emoji", value: "💨💨 > 💨", caption: "{力|ちから}で きょりが かわる" },
        },
      ],
    },
    test: {
      unitId: U.windRubber,
      questionCount: 5,
      questions: [
        {
          id: `${U.windRubber}.q-1`,
          unitId: U.windRubber,
          prompt: "かぜを つよく すると {車|くるま}は どうなる?",
          explanation: "かぜが つよいほど {車|くるま}は とおくまで すすむよ。",
          format: "choice",
          choices: ["とおくまで すすむ", "とまる", "ぎゃくに もどる", "かわらない"],
          answer: "とおくまで すすむ",
        },
        {
          id: `${U.windRubber}.q-2`,
          unitId: U.windRubber,
          prompt: "ゴムを {長|なが}く のばすと {車|くるま}は どうなる?",
          explanation: "ゴムを {長|なが}く のばすほど {力|ちから}が {大|おお}きくなり、とおくまで すすむよ。",
          format: "choice",
          choices: ["とおくまで すすむ", "すすまない", "おそくなる", "とまる"],
          answer: "とおくまで すすむ",
        },
        {
          id: `${U.windRubber}.q-3`,
          unitId: U.windRubber,
          prompt: "かぜや ゴムには ものを うごかす なにが ある?",
          explanation: "かぜや ゴムには ものを うごかす「{力|ちから}」が あるよ。",
          format: "choice",
          choices: ["{力|ちから}", "おと", "ひかり", "いろ"],
          answer: "{力|ちから}",
        },
        {
          id: `${U.windRubber}.q-4`,
          unitId: U.windRubber,
          prompt: "かぜを よわく すると {車|くるま}の すすむ きょりは?",
          explanation: "かぜが よわいと {力|ちから}が {小|ちい}さく、すすむ きょりは みじかくなるよ。",
          format: "choice",
          choices: ["みじかくなる", "ながくなる", "かわらない", "ぎゃくに なる"],
          answer: "みじかくなる",
        },
        {
          id: `${U.windRubber}.q-5`,
          unitId: U.windRubber,
          prompt: "のばした ゴムが もとに もどろうと する{力|ちから}を つかうのは?",
          explanation: "のびた ゴムが もどる {力|ちから}で うごく おもちゃに つかわれているよ。",
          format: "choice",
          choices: ["ゴムで うごく おもちゃ", "でんち", "じしゃく", "かがみ"],
          answer: "ゴムで うごく おもちゃ",
        },
      ],
    },
  },

  // ── 8. 物と重さ ──
  [U.matterWeight]: {
    unitId: U.matterWeight,
    learn: {
      unitId: U.matterWeight,
      steps: [
        {
          heading: "{形|かたち}を かえても {重|おも}さは おなじ",
          body: "おなじ ねんどを まるめても のばしても、{重|おも}さは かわらないよ。{形|かたち}が かわっても もとの {重|おも}さは おなじだよ。",
          visual: { kind: "emoji", value: "⚪=🟦", caption: "{形|かたち}が かわっても おなじ" },
        },
        {
          heading: "しゅるいで {重|おも}さが ちがう",
          body: "おなじ {大|おお}きさでも、てつと {木|き}では {重|おも}さが ちがうよ。ものの しゅるいで {重|おも}さは かわるよ。",
          visual: { kind: "emoji", value: "🔩 > 🪵", caption: "おなじ {大|おお}きさでも ちがう" },
        },
        {
          heading: "はかりで くらべる",
          body: "{重|おも}さは「はかり」で はかるよ。g（グラム）や kg（キログラム）で あらわすよ。",
          visual: { kind: "emoji", value: "⚖️", caption: "はかりで はかる" },
        },
      ],
    },
    test: {
      unitId: U.matterWeight,
      questionCount: 5,
      questions: [
        {
          id: `${U.matterWeight}.q-1`,
          unitId: U.matterWeight,
          prompt: "おなじ ねんどの {形|かたち}を かえると {重|おも}さは?",
          explanation: "{形|かたち}を かえても {重|おも}さは かわらないよ。もとの ねんどは おなじ ぶんだけ あるからね。",
          format: "choice",
          choices: ["かわらない", "おもくなる", "かるくなる", "きえる"],
          answer: "かわらない",
        },
        {
          id: `${U.matterWeight}.q-2`,
          unitId: U.matterWeight,
          prompt: "おなじ {大|おお}きさでも しゅるいが ちがうと {重|おも}さは?",
          explanation: "てつと {木|き}のように、しゅるいが ちがうと おなじ {大|おお}きさでも {重|おも}さは ちがうよ。",
          format: "choice",
          choices: ["ちがう", "おなじ", "かならず おもい", "かならず かるい"],
          answer: "ちがう",
        },
        {
          id: `${U.matterWeight}.q-3`,
          unitId: U.matterWeight,
          prompt: "ものの {重|おも}さを はかる どうぐは?",
          explanation: "{重|おも}さは「はかり」で はかるよ。",
          format: "choice",
          choices: ["はかり", "ものさし", "とけい", "おんどけい"],
          answer: "はかり",
        },
        {
          id: `${U.matterWeight}.q-4`,
          unitId: U.matterWeight,
          prompt: "1kg の わたと 1kg の てつ。{重|おも}さは?",
          explanation: "どちらも 1kg だから {重|おも}さは おなじだよ。{見|み}た{目|め}の {大|おお}きさは ちがうけどね。",
          format: "choice",
          choices: ["おなじ", "わたが おもい", "てつが おもい", "くらべられない"],
          answer: "おなじ",
        },
        {
          id: `${U.matterWeight}.q-5`,
          unitId: U.matterWeight,
          prompt: "ものを こまかく わけて ぜんぶ あつめると {重|おも}さは?",
          explanation: "わけても ぜんぶ あつめれば、もとの {重|おも}さと おなじに なるよ。",
          format: "choice",
          choices: ["もとと おなじ", "かるくなる", "おもくなる", "きえる"],
          answer: "もとと おなじ",
        },
      ],
    },
  },

  // ── 9. 太陽と地面の様子 ──
  [U.sunGround]: {
    unitId: U.sunGround,
    learn: {
      unitId: U.sunGround,
      steps: [
        {
          heading: "かげの できかた",
          body: "{太陽|たいよう}の ひかりが ものに あたると、{太陽|たいよう}の はんたいがわに かげが できるよ。",
          visual: { kind: "emoji", value: "☀️🧍▒", caption: "はんたいがわに かげ" },
        },
        {
          heading: "{太陽|たいよう}は うごく",
          body: "{太陽|たいよう}は {東|ひがし}から {出|で}て、{南|みなみ}の {空|そら}を とおり、{西|にし}に しずむよ。だから かげの むきも 1{日|にち}で かわるよ。",
          visual: { kind: "emoji", value: "🌅→🌞→🌇", caption: "{東|ひがし}→{南|みなみ}→{西|にし}" },
        },
        {
          heading: "{日|ひ}なたと {日|ひ}かげ",
          body: "{日|ひ}なたの {地面|じめん}は あたたかく かわいていて、{日|ひ}かげは つめたく しめっているよ。",
          visual: { kind: "emoji", value: "☀️🟫 / ☁️🟫", caption: "{日|ひ}なたは あたたかい" },
        },
      ],
    },
    test: {
      unitId: U.sunGround,
      questionCount: 5,
      questions: [
        {
          id: `${U.sunGround}.q-1`,
          unitId: U.sunGround,
          prompt: "かげは {太陽|たいよう}の どちらがわに できる?",
          explanation: "かげは {太陽|たいよう}の はんたいがわに できるよ。",
          format: "choice",
          choices: ["{太陽|たいよう}の はんたいがわ", "{太陽|たいよう}と おなじがわ", "{上|うえ}だけ", "{下|した}だけ"],
          answer: "{太陽|たいよう}の はんたいがわ",
        },
        {
          id: `${U.sunGround}.q-2`,
          unitId: U.sunGround,
          prompt: "{太陽|たいよう}は 1{日|にち}に どちらから どちらへ うごく?",
          explanation: "{太陽|たいよう}は {東|ひがし}から {出|で}て、{南|みなみ}の {空|そら}を とおり、{西|にし}に しずむよ。",
          format: "choice",
          choices: ["{東|ひがし}→{南|みなみ}→{西|にし}", "{西|にし}→{東|ひがし}", "{北|きた}→{南|みなみ}", "うごかない"],
          answer: "{東|ひがし}→{南|みなみ}→{西|にし}",
        },
        {
          id: `${U.sunGround}.q-3`,
          unitId: U.sunGround,
          prompt: "{日|ひ}なたと {日|ひ}かげ、{地面|じめん}が あたたかいのは?",
          explanation: "{太陽|たいよう}が あたる {日|ひ}なたの {地面|じめん}は あたたかいよ。",
          format: "choice",
          choices: ["{日|ひ}なた", "{日|ひ}かげ", "どちらも おなじ", "よる"],
          answer: "{日|ひ}なた",
        },
        {
          id: `${U.sunGround}.q-4`,
          unitId: U.sunGround,
          prompt: "かげの むきは 1{日|にち}の あいだに?",
          explanation: "{太陽|たいよう}が うごくので、かげの むきも 1{日|にち}で かわるよ。",
          format: "choice",
          choices: ["かわる", "かわらない", "きえる", "ふえる"],
          answer: "かわる",
        },
        {
          id: `${U.sunGround}.q-5`,
          unitId: U.sunGround,
          prompt: "{日|ひ}なたの {地面|じめん}は {日|ひ}かげと くらべて どう?",
          explanation: "{日|ひ}なたの {地面|じめん}は あたたかくて かわいているよ。{日|ひ}かげは つめたく しめっているよ。",
          format: "choice",
          choices: ["かわいて あたたかい", "しめって つめたい", "おなじ", "こおっている"],
          answer: "かわいて あたたかい",
        },
      ],
    },
  },
};
