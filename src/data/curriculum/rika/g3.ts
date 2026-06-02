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
    name: "いのち（生き物）",
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
      "こうえんや にわで 生き物を さがして かんさつ するときのように、まわりの しぜんに きづいて くらべる力を つかうよ。",
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
      "アサガオや ホウセンカを そだてて 花や たねを とるときのように、しょくぶつが どう そだつかを しるのに やくだつよ。",
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
      "チョウや バッタを かって せい虫まで そだてるときのように、こん虫の からだの つくりや そだちかたを しるのに つかうよ。",
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
      "かがみで ひかりを はね返したり、たいこの おとを 出すあそびのように、ひかりや おとの しくみを しるのに やくだつよ。",
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
    title: "かぜと ゴムの 力",
    order: 7,
    realWorldUse:
      "ほかけ車や ゴムで うごく おもちゃのように、かぜや ゴムの 力で ものを うごかす しくみを しるのに つかうよ。",
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
          heading: "生き物を さがそう",
          body: "こうえんや にわには いろいろな 生き物が いるよ。どこに いるか、どんな ようすかを よく みてみよう。",
          visual: { kind: "emoji", value: "🌳🐞🦋🌸", caption: "いろいろな 生き物" },
        },
        {
          heading: "むしめがねで 大きく みる",
          body: "ちいさい 生き物は むしめがねで 大きく して みると、からだの ようすが よく わかるよ。",
          visual: { kind: "emoji", value: "🔍🐜", caption: "むしめがねで かんさつ" },
        },
        {
          heading: "くらべて きづく",
          body: "生き物には いろ・大きさ・かたちに ちがいが あるよ。すんでいる ばしょも くらべてみよう。",
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
          prompt: "ちいさい 生き物を 大きく して みる どうぐは?",
          explanation: "むしめがねは ちいさい ものを 大きく して みる どうぐだよ。",
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
          choices: ["いしや おちばの した", "そらの 上", "あつい ひの中", "つめたい こおりの中"],
          answer: "いしや おちばの した",
        },
        {
          id: `${U.natureObservation}.q-3`,
          unitId: U.natureObservation,
          prompt: "タンポポが よく みられるのは どんな ばしょ?",
          explanation: "タンポポは 日あたりの よい あかるい ところで よく そだつよ。",
          format: "choice",
          choices: ["日あたりの よい ところ", "くらい みずの中", "ひの中", "こおりの中"],
          answer: "日あたりの よい ところ",
        },
        {
          id: `${U.natureObservation}.q-4`,
          unitId: U.natureObservation,
          prompt: "生き物の ながさを はかる どうぐは?",
          explanation: "ながさや 大きさを はかるには ものさしを つかうよ。",
          format: "choice",
          choices: ["ものさし", "むしめがね", "ほうしんばこ", "おんどけい"],
          answer: "ものさし",
        },
        {
          id: `${U.natureObservation}.q-5`,
          unitId: U.natureObservation,
          prompt: "生き物の いろや 大きさや かたちは?",
          explanation: "生き物には いろ・大きさ・かたちに それぞれ ちがいが あるよ。",
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
          heading: "たねから め が 出る",
          body: "たねを まいて みずを やると、さいしょに「ふたば」が 出てくるよ。そのあと はが ふえていくよ。",
          visual: { kind: "emoji", value: "🌰→🌱→🌿", caption: "たね→め→は" },
        },
        {
          heading: "しょくぶつの からだ",
          body: "しょくぶつの からだは「ねっこ」「くき」「は」で できているよ。それぞれ やくわりが あるよ。",
          visual: { kind: "emoji", value: "🌿", caption: "ね・くき・は" },
        },
        {
          heading: "花が さいて たねが できる",
          body: "そだつと 花が さき、花の あとに たね（み）が できるよ。たねは また つぎの しょくぶつに なるよ。",
          visual: { kind: "emoji", value: "🌸→🌰", caption: "花→たね" },
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
          prompt: "たねを まいて さいしょに 出てくるのは?",
          explanation: "さいしょに 出てくるのは「ふたば（子葉）」。そのあと はが ふえるよ。",
          format: "choice",
          choices: ["ふたば", "花", "み", "ねっこだけ"],
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
          explanation: "たね→め→は→花→み（たね）の じゅんに そだつよ。",
          format: "choice",
          choices: ["たね→め→は→花→み", "花→たね→は", "み→花→め", "は→たね→花"],
          answer: "たね→め→は→花→み",
        },
        {
          id: `${U.plantGrowth}.q-4`,
          unitId: U.plantGrowth,
          prompt: "花が さいた あとに できるのは?",
          explanation: "花の あとには たね（み）が できるよ。たねから また そだつよ。",
          format: "choice",
          choices: ["たね", "ふたば", "ねっこ", "くき"],
          answer: "たね",
        },
        {
          id: `${U.plantGrowth}.q-5`,
          unitId: U.plantGrowth,
          prompt: "しょくぶつが そだつのに いるものは?",
          explanation: "しょくぶつは みずと 日光（と くうき）で そだつよ。",
          format: "choice",
          choices: ["みずと 日光", "くらやみ", "こおり", "おとだけ"],
          answer: "みずと 日光",
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
          heading: "こん虫の からだ",
          body: "こん虫の からだは「あたま」「むね」「はら」の 3つに わかれているよ。",
          visual: { kind: "emoji", value: "🐝", caption: "あたま・むね・はら" },
        },
        {
          heading: "あしは 6本",
          body: "こん虫の あしは ぜんぶで 6本。みんな「むね」から 出ているよ。はねも むねに ついているよ。",
          visual: { kind: "emoji", value: "🦗", caption: "あしは むねから 6本" },
        },
        {
          heading: "そだちかたの ちがい",
          body: "チョウは たまご→よう虫→さなぎ→せい虫。バッタは さなぎに ならず よう虫から せい虫に なるよ。",
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
          prompt: "こん虫の からだ「あたま・むね」と あと ひとつは?",
          explanation: "こん虫の からだは あたま・むね・はらの 3つに わかれるよ。",
          format: "choice",
          choices: ["はら", "あし", "はね", "せなか"],
          answer: "はら",
        },
        {
          id: `${U.insectBody}.q-2`,
          unitId: U.insectBody,
          prompt: "こん虫の あしは ぜんぶで なん本?",
          explanation: "こん虫の あしは むねから 6本 出ているよ。",
          format: "choice",
          choices: ["6本", "4本", "8本", "2本"],
          answer: "6本",
        },
        {
          id: `${U.insectBody}.q-3`,
          unitId: U.insectBody,
          prompt: "チョウの そだちかたで ただしいのは?",
          explanation: "チョウは たまご→よう虫→さなぎ→せい虫の じゅんに そだつよ。",
          format: "choice",
          choices: [
            "たまご→よう虫→さなぎ→せい虫",
            "たまご→さなぎ→せい虫",
            "よう虫→たまご→せい虫",
            "せい虫→たまご→よう虫",
          ],
          answer: "たまご→よう虫→さなぎ→せい虫",
        },
        {
          id: `${U.insectBody}.q-4`,
          unitId: U.insectBody,
          prompt: "バッタは そだつとき「さなぎ」に なる?",
          explanation: "バッタは さなぎに ならず、よう虫から せい虫に なるよ。",
          format: "choice",
          choices: ["ならない", "なる", "2かい なる", "たまごで なる"],
          answer: "ならない",
        },
        {
          id: `${U.insectBody}.q-5`,
          unitId: U.insectBody,
          prompt: "こん虫の あしや はねは からだの どこに ついている?",
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
          body: "かがみで 日光を はね返すと、ひかりは まっすぐ すすむよ。むきを かえると ひかりも かわるよ。",
          visual: { kind: "emoji", value: "🪞➡️☀️", caption: "ひかりは まっすぐ" },
        },
        {
          heading: "ひかりを あつめると あつい",
          body: "かがみや 虫めがねで 日光を 一つの ところに あつめると、そこは あかるく あつく なるよ。",
          visual: { kind: "emoji", value: "🔍☀️🔥", caption: "あつめると あつくなる" },
        },
        {
          heading: "おとは ふるえている",
          body: "おとが 出ている ものは ふるえているよ。おとが 大きいほど ふるえも 大きいよ。",
          visual: { kind: "emoji", value: "🥁〰️", caption: "ふるえて おとが 出る" },
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
          prompt: "かがみで はね返した 日光は どう すすむ?",
          explanation: "ひかりは まっすぐ すすむよ。だから かがみの むきで あたる ところが かわるよ。",
          format: "choice",
          choices: ["まっすぐ すすむ", "まがって すすむ", "下に おちる", "すぐ きえる"],
          answer: "まっすぐ すすむ",
        },
        {
          id: `${U.lightSound}.q-2`,
          unitId: U.lightSound,
          prompt: "日光を かがみで あつめた ところは どうなる?",
          explanation: "日光を あつめると あかるく、あたたかく（あつく）なるよ。",
          format: "choice",
          choices: ["あかるく あたたかくなる", "くらく つめたくなる", "あおくなる", "なにも かわらない"],
          answer: "あかるく あたたかくなる",
        },
        {
          id: `${U.lightSound}.q-3`,
          unitId: U.lightSound,
          prompt: "おとが 出ている ものは どうなっている?",
          explanation: "おとが 出ている ものは ふるえているよ。さわると ふるえが わかるよ。",
          format: "choice",
          choices: ["ふるえている", "とまっている", "ひかっている", "つめたい"],
          answer: "ふるえている",
        },
        {
          id: `${U.lightSound}.q-4`,
          unitId: U.lightSound,
          prompt: "おとが 大きいほど ものの ふるえは どうなる?",
          explanation: "おとが 大きいほど ふるえも 大きくなるよ。",
          format: "choice",
          choices: ["大きくなる", "小さくなる", "なくなる", "かわらない"],
          answer: "大きくなる",
        },
        {
          id: `${U.lightSound}.q-5`,
          unitId: U.lightSound,
          prompt: "虫めがねで 日光を 一つの ところに あつめると 紙は?",
          explanation: "ひかりを 一てんに あつめると とても あつくなり、紙が こげることも あるよ。",
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
          body: "じしゃくは「てつ」で できた ものに つくよ。木や ガラスや ゴムには つかないよ。",
          visual: { kind: "emoji", value: "🧲📎", caption: "てつに つく" },
        },
        {
          heading: "2つの きょく",
          body: "じしゃくには N きょくと S きょくの 2つの きょくが あるよ。きょくの ところが いちばん つよく つくよ。",
          visual: { kind: "emoji", value: "🧲 N–S", caption: "NきょくとSきょく" },
        },
        {
          heading: "引き合う・しりぞけ合う",
          body: "ちがう きょくは 引き合い、おなじ きょくは しりぞけ合うよ。はなれていても てつを 引きつけるよ。",
          visual: { kind: "emoji", value: "N↔S 引く / N↔N おす", caption: "きょくの きまり" },
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
          explanation: "じしゃくは てつで できた ものに つくよ。木・ガラス・ゴムには つかないよ。",
          format: "choice",
          choices: ["てつ", "木", "ガラス", "ゴム"],
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
          prompt: "じしゃくの おなじ きょくどうしを 近づけると?",
          explanation: "おなじ きょくどうしは しりぞけ合う（おし合う）よ。",
          format: "choice",
          choices: ["しりぞけ合う", "引き合う", "ひかる", "おもくなる"],
          answer: "しりぞけ合う",
        },
        {
          id: `${U.magnet}.q-4`,
          unitId: U.magnet,
          prompt: "じしゃくの ちがう きょくどうしを 近づけると?",
          explanation: "ちがう きょくどうしは 引き合う（くっつく）よ。",
          format: "choice",
          choices: ["引き合う", "しりぞけ合う", "なにもしない", "こおる"],
          answer: "引き合う",
        },
        {
          id: `${U.magnet}.q-5`,
          unitId: U.magnet,
          prompt: "じしゃくは すこし はなれていても てつを?",
          explanation: "じしゃくは はなれていても てつを 引きつける力が あるよ。",
          format: "choice",
          choices: ["引きつける", "引きつけない", "おしのける", "あたためる"],
          answer: "引きつける",
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
          body: "かん電池・どうせん・豆電球が 一つの わ に つながると、電気が ながれて 豆電球が つくよ。この みちを「かいろ」というよ。",
          visual: { kind: "emoji", value: "🔋➰💡", caption: "ひとまわりの わ" },
        },
        {
          heading: "とちゅうが きれると つかない",
          body: "どうせんが とちゅうで きれていたり はずれていると、電気が ながれず 豆電球は つかないよ。",
          visual: { kind: "emoji", value: "🔋✂️💡", caption: "きれると つかない" },
        },
        {
          heading: "電気を 通すもの・通さないもの",
          body: "てつや どうなどの 金ぞくは 電気を 通すよ。木・ゴム・プラスチックは 通さないよ。",
          visual: { kind: "emoji", value: "🔩⭕ / 🪵❌", caption: "金ぞくは 通す" },
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
          prompt: "豆電球が つくのは どんなとき?",
          explanation: "かん電池・どうせん・豆電球が ひとまわりの わ（かいろ）に なっているとき つくよ。",
          format: "choice",
          choices: ["わ（かいろ）に なっているとき", "とちゅうが きれているとき", "くらいとき", "つめたいとき"],
          answer: "わ（かいろ）に なっているとき",
        },
        {
          id: `${U.electricCircuit}.q-2`,
          unitId: U.electricCircuit,
          prompt: "電気を よく 通すものは?",
          explanation: "てつや どうなどの 金ぞくは 電気を 通すよ。",
          format: "choice",
          choices: ["てつや どうなどの 金ぞく", "木", "ゴム", "紙"],
          answer: "てつや どうなどの 金ぞく",
        },
        {
          id: `${U.electricCircuit}.q-3`,
          unitId: U.electricCircuit,
          prompt: "電気を 通さないものは?",
          explanation: "プラスチックや 木・ゴムは 電気を 通さないよ。",
          format: "choice",
          choices: ["プラスチック", "てつのくぎ", "アルミ", "どうせん"],
          answer: "プラスチック",
        },
        {
          id: `${U.electricCircuit}.q-4`,
          unitId: U.electricCircuit,
          prompt: "どうせんが とちゅうで きれていると 豆電球は?",
          explanation: "わが とちゅうで きれると 電気が ながれず、豆電球は つかないよ。",
          format: "choice",
          choices: ["つかない", "つく", "あかるくなる", "2つ つく"],
          answer: "つかない",
        },
        {
          id: `${U.electricCircuit}.q-5`,
          unitId: U.electricCircuit,
          prompt: "電気が ながれる ひとまわりの みちを なんという?",
          explanation: "電気が ながれる ひとまわりの みちを「かいろ」というよ。",
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
          heading: "かぜの 力で うごく",
          body: "ほを つけた 車に かぜを あてると すすむよ。かぜが つよいほど とおくまで すすむよ。",
          visual: { kind: "emoji", value: "💨⛵🚗", caption: "かぜで うごく" },
        },
        {
          heading: "ゴムの 力で うごく",
          body: "のばした ゴムは もとに もどろうと するよ。その 力で 車を うごかせるよ。ゴムを 長く のばすほど とおくまで すすむよ。",
          visual: { kind: "emoji", value: "🪢➡️🚗", caption: "ゴムで うごく" },
        },
        {
          heading: "力の 大きさを かえる",
          body: "かぜや ゴムの 力を 大きくすると ものは とおくまで、小さくすると みじかく しか うごかないよ。",
          visual: { kind: "emoji", value: "💨💨 > 💨", caption: "力で きょりが かわる" },
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
          prompt: "かぜを つよく すると 車は どうなる?",
          explanation: "かぜが つよいほど 車は とおくまで すすむよ。",
          format: "choice",
          choices: ["とおくまで すすむ", "とまる", "ぎゃくに もどる", "かわらない"],
          answer: "とおくまで すすむ",
        },
        {
          id: `${U.windRubber}.q-2`,
          unitId: U.windRubber,
          prompt: "ゴムを 長く のばすと 車は どうなる?",
          explanation: "ゴムを 長く のばすほど 力が 大きくなり、とおくまで すすむよ。",
          format: "choice",
          choices: ["とおくまで すすむ", "すすまない", "おそくなる", "とまる"],
          answer: "とおくまで すすむ",
        },
        {
          id: `${U.windRubber}.q-3`,
          unitId: U.windRubber,
          prompt: "かぜや ゴムには ものを うごかす なにが ある?",
          explanation: "かぜや ゴムには ものを うごかす「力」が あるよ。",
          format: "choice",
          choices: ["力", "おと", "ひかり", "いろ"],
          answer: "力",
        },
        {
          id: `${U.windRubber}.q-4`,
          unitId: U.windRubber,
          prompt: "かぜを よわく すると 車の すすむ きょりは?",
          explanation: "かぜが よわいと 力が 小さく、すすむ きょりは みじかくなるよ。",
          format: "choice",
          choices: ["みじかくなる", "ながくなる", "かわらない", "ぎゃくに なる"],
          answer: "みじかくなる",
        },
        {
          id: `${U.windRubber}.q-5`,
          unitId: U.windRubber,
          prompt: "のばした ゴムが もとに もどろうと する力を つかうのは?",
          explanation: "のびた ゴムが もどる 力で うごく おもちゃに つかわれているよ。",
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
          heading: "形を かえても 重さは おなじ",
          body: "おなじ ねんどを まるめても のばしても、重さは かわらないよ。形が かわっても もとの 重さは おなじだよ。",
          visual: { kind: "emoji", value: "⚪=🟦", caption: "形が かわっても おなじ" },
        },
        {
          heading: "しゅるいで 重さが ちがう",
          body: "おなじ 大きさでも、てつと 木では 重さが ちがうよ。ものの しゅるいで 重さは かわるよ。",
          visual: { kind: "emoji", value: "🔩 > 🪵", caption: "おなじ 大きさでも ちがう" },
        },
        {
          heading: "はかりで くらべる",
          body: "重さは「はかり」で はかるよ。g（グラム）や kg（キログラム）で あらわすよ。",
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
          prompt: "おなじ ねんどの 形を かえると 重さは?",
          explanation: "形を かえても 重さは かわらないよ。もとの ねんどは おなじ ぶんだけ あるからね。",
          format: "choice",
          choices: ["かわらない", "おもくなる", "かるくなる", "きえる"],
          answer: "かわらない",
        },
        {
          id: `${U.matterWeight}.q-2`,
          unitId: U.matterWeight,
          prompt: "おなじ 大きさでも しゅるいが ちがうと 重さは?",
          explanation: "てつと 木のように、しゅるいが ちがうと おなじ 大きさでも 重さは ちがうよ。",
          format: "choice",
          choices: ["ちがう", "おなじ", "かならず おもい", "かならず かるい"],
          answer: "ちがう",
        },
        {
          id: `${U.matterWeight}.q-3`,
          unitId: U.matterWeight,
          prompt: "ものの 重さを はかる どうぐは?",
          explanation: "重さは「はかり」で はかるよ。",
          format: "choice",
          choices: ["はかり", "ものさし", "とけい", "おんどけい"],
          answer: "はかり",
        },
        {
          id: `${U.matterWeight}.q-4`,
          unitId: U.matterWeight,
          prompt: "1kg の わたと 1kg の てつ。重さは?",
          explanation: "どちらも 1kg だから 重さは おなじだよ。見た目の 大きさは ちがうけどね。",
          format: "choice",
          choices: ["おなじ", "わたが おもい", "てつが おもい", "くらべられない"],
          answer: "おなじ",
        },
        {
          id: `${U.matterWeight}.q-5`,
          unitId: U.matterWeight,
          prompt: "ものを こまかく わけて ぜんぶ あつめると 重さは?",
          explanation: "わけても ぜんぶ あつめれば、もとの 重さと おなじに なるよ。",
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
          body: "太陽の ひかりが ものに あたると、太陽の はんたいがわに かげが できるよ。",
          visual: { kind: "emoji", value: "☀️🧍▒", caption: "はんたいがわに かげ" },
        },
        {
          heading: "太陽は うごく",
          body: "太陽は 東から 出て、南の 空を とおり、西に しずむよ。だから かげの むきも 1日で かわるよ。",
          visual: { kind: "emoji", value: "🌅→🌞→🌇", caption: "東→南→西" },
        },
        {
          heading: "日なたと 日かげ",
          body: "日なたの 地面は あたたかく かわいていて、日かげは つめたく しめっているよ。",
          visual: { kind: "emoji", value: "☀️🟫 / ☁️🟫", caption: "日なたは あたたかい" },
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
          prompt: "かげは 太陽の どちらがわに できる?",
          explanation: "かげは 太陽の はんたいがわに できるよ。",
          format: "choice",
          choices: ["太陽の はんたいがわ", "太陽と おなじがわ", "上だけ", "下だけ"],
          answer: "太陽の はんたいがわ",
        },
        {
          id: `${U.sunGround}.q-2`,
          unitId: U.sunGround,
          prompt: "太陽は 1日に どちらから どちらへ うごく?",
          explanation: "太陽は 東から 出て、南の 空を とおり、西に しずむよ。",
          format: "choice",
          choices: ["東→南→西", "西→東", "北→南", "うごかない"],
          answer: "東→南→西",
        },
        {
          id: `${U.sunGround}.q-3`,
          unitId: U.sunGround,
          prompt: "日なたと 日かげ、地面が あたたかいのは?",
          explanation: "太陽が あたる 日なたの 地面は あたたかいよ。",
          format: "choice",
          choices: ["日なた", "日かげ", "どちらも おなじ", "よる"],
          answer: "日なた",
        },
        {
          id: `${U.sunGround}.q-4`,
          unitId: U.sunGround,
          prompt: "かげの むきは 1日の あいだに?",
          explanation: "太陽が うごくので、かげの むきも 1日で かわるよ。",
          format: "choice",
          choices: ["かわる", "かわらない", "きえる", "ふえる"],
          answer: "かわる",
        },
        {
          id: `${U.sunGround}.q-5`,
          unitId: U.sunGround,
          prompt: "日なたの 地面は 日かげと くらべて どう?",
          explanation: "日なたの 地面は あたたかくて かわいているよ。日かげは つめたく しめっているよ。",
          format: "choice",
          choices: ["かわいて あたたかい", "しめって つめたい", "おなじ", "こおっている"],
          answer: "かわいて あたたかい",
        },
      ],
    },
  },
};
