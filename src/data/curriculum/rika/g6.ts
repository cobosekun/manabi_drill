// ══════════════════════════════════════════
// カリキュラム: 理科（りか）小6
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 理科4領域（エネルギー / 粒子 / 生命 / 地球）を g3 と同名で継続使用。
// 既存 generators は理科に非対応 → 全単元 固定 questions[]（全問 explanation 必須）。
//
// 【申し送り 1: SubjectId】 drill.ts の SubjectId は既に "rika" を含むため、
//   subjectId: "rika" はそのまま型を通る（as 等の局所吸収は不要）。types は触っていない。
// 【申し送り 2: ルビ記法】 CEO方針(2026-06-02)に従い、単元レベルの表示テキスト
//   （Unit.title / realWorldUse / LearnStep.heading,body,caption / Question.prompt,choices,
//   explanation,caption）は全て「漢字＋全漢字ルビ {漢字|よみ}」で執筆。
//   一方 Subject / Domain のメタ名（name/formalName）は g3 と完全一致のプレーン表記を維持し、
//   中央集約(index.ts)での id 重複排除を綺麗に保つ。g3 等の既存スライスのルビ化は
//   レトロフィット波で実施する想定（RubyText レンダラはプレーン文字列を安全にそのまま表示）。
// ══════════════════════════════════════════

import type { Subject, Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// g3 と同一の教科定義（中央集約時に id で重複排除される前提。メタはプレーン維持）。

export const rikaSubject: Subject = {
  id: "rika",
  name: "りか",
  formalName: "理科",
  emoji: "🔬",
  theme: "emerald",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域（理科4領域: エネルギー / 粒子 / 生命 / 地球。g3 と同名） ──

export const rikaG6Domains: Domain[] = [
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

// ── 先行学年の単元 id（前提として参照。実在する g3 単元のみ指定して参照解決を保証） ──
const G3 = {
  plantGrowth: "rika.g3.plant-growth",
  windRubber: "rika.g3.wind-rubber",
  electricCircuit: "rika.g3.electric-circuit",
  sunGround: "rika.g3.sun-ground",
} as const;

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺に DAG 化。g3 → g6 と g6内で連結。循環なし）:
//
//   combustion-air ─┬─▶ human-body ─▶ living-environment
//                   └─▶ aqueous-solution
//   g3.plant-growth ─▶ plant-nutrition ─▶ living-environment
//   g3.wind-rubber ──▶ lever
//   g3.electric-circuit ─▶ electricity-use
//   g3.sun-ground ─┬─▶ land-changes
//                  └─▶ moon-sun
//
const U = {
  combustionAir: "rika.g6.combustion-air",
  humanBody: "rika.g6.human-body",
  plantNutrition: "rika.g6.plant-nutrition",
  livingEnvironment: "rika.g6.living-environment",
  aqueousSolution: "rika.g6.aqueous-solution",
  lever: "rika.g6.lever",
  electricityUse: "rika.g6.electricity-use",
  landChanges: "rika.g6.land-changes",
  moonSun: "rika.g6.moon-sun",
} as const;

export const rikaG6Units: Unit[] = [
  {
    id: U.combustionAir,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.particle",
    title: "{物|もの}の{燃|も}え{方|かた}と{空気|くうき}",
    order: 1,
    realWorldUse:
      "キャンプの たき{火|び}や ガスコンロのように、ものが よく{燃|も}えるには{空気|くうき}（{酸素|さんそ}）が いることを{知|し}るのに{役|やく}だつよ。",
    leadsTo: [U.humanBody, U.aqueousSolution],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.humanBody,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.life",
    title: "{人|ひと}や{動物|どうぶつ}の{体|からだ}",
    order: 2,
    realWorldUse:
      "{走|はし}ると{息|いき}が はずむ・ごはんを{食|た}べると{元気|げんき}に なるのは なぜかを、{呼吸|こきゅう}や{消化|しょうか}の しくみから{説明|せつめい}できるよ。",
    leadsTo: [U.livingEnvironment],
    prerequisites: [U.combustionAir],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.plantNutrition,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.life",
    title: "{植物|しょくぶつ}の{養分|ようぶん}と{水|みず}",
    order: 3,
    realWorldUse:
      "{野菜|やさい}や{木|き}が{日光|にっこう}で{育|そだ}つ しくみが わかり、{植物|しょくぶつ}を{元気|げんき}に{育|そだ}てる ことに{役|やく}だつよ。",
    leadsTo: [U.livingEnvironment],
    prerequisites: [G3.plantGrowth],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.livingEnvironment,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.life",
    title: "{生物|せいぶつ}と{環境|かんきょう}",
    order: 4,
    realWorldUse:
      "{食|た}べる・{食|た}べられる つながりや{空気|くうき}・{水|みず}の めぐりを{知|し}り、{自然|しぜん}を まもる{行動|こうどう}を{考|かんが}えるのに{役|やく}だつよ。",
    leadsTo: [],
    prerequisites: [U.humanBody, U.plantNutrition],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.aqueousSolution,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.particle",
    title: "{水溶液|すいようえき}の{性質|せいしつ}",
    order: 5,
    realWorldUse:
      "{台所|だいどころ}の おすや{重|じゅう}そう{水|すい}のように、{身|み}の まわりの{液|えき}を{酸性|さんせい}・アルカリ{性|せい}で なかま{分|わ}けするのに{役|やく}だつよ。",
    leadsTo: [],
    prerequisites: [U.combustionAir],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.lever,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.energy",
    title: "てこの{働|はたら}き",
    order: 6,
    realWorldUse:
      "はさみや くぎぬきのように、{小|ちい}さな{力|ちから}で{重|おも}い ものを うごかす{道具|どうぐ}の しくみを{知|し}るのに{役|やく}だつよ。",
    leadsTo: [],
    prerequisites: [G3.windRubber],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.electricityUse,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.energy",
    title: "{電気|でんき}の{利用|りよう}",
    order: 7,
    realWorldUse:
      "{発電|はつでん}や{節電|せつでん}の しくみが わかり、{電気|でんき}を{無駄|むだ}なく つかう くふうを{考|かんが}えるのに{役|やく}だつよ。",
    leadsTo: [],
    prerequisites: [G3.electricCircuit],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.landChanges,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.earth",
    title: "{土地|とち}の つくりと{変化|へんか}",
    order: 8,
    realWorldUse:
      "がけの しまもよう（{地層|ちそう}）や{火山|かざん}・{地震|じしん}の しくみを{知|し}り、{災害|さいがい}に そなえる ことに{役|やく}だつよ。",
    leadsTo: [],
    prerequisites: [G3.sunGround],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.moonSun,
    subjectId: "rika",
    grade: 6,
    domainId: "rika.earth",
    title: "{月|つき}と{太陽|たいよう}",
    order: 9,
    realWorldUse:
      "{夜空|よぞら}の{月|つき}の{形|かたち}が 日に よって{変|か}わる わけが わかり、{月|つき}や{星|ほし}の{観察|かんさつ}が もっと{楽|たの}しくなるよ。",
    leadsTo: [],
    prerequisites: [G3.sunGround],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 理科は固定 questions[]（4択 choice、全問 explanation 必須）。図は emoji 中心。
// 表示テキストは全漢字ルビ記法 {漢字|よみ}。

export const rikaG6Contents: Record<string, UnitContent> = {
  // ── 1. ものの燃え方と空気 ──
  [U.combustionAir]: {
    unitId: U.combustionAir,
    learn: {
      unitId: U.combustionAir,
      steps: [
        {
          heading: "ものが{燃|も}えるには{空気|くうき}",
          body: "ものが{燃|も}えつづけるには、{新|あたら}しい{空気|くうき}が いるよ。びんを かぶせて ふたを すると、{火|ひ}は やがて きえてしまうよ。",
          visual: { kind: "emoji", value: "🔥🫙", caption: "{空気|くうき}が ないと きえる" },
        },
        {
          heading: "{空気|くうき}の なかみ",
          body: "{空気|くうき}には ちっそが やく8{割|わり}、{酸素|さんそ}が やく2{割|わり} ふくまれているよ。ものを{燃|も}やす はたらきが あるのは{酸素|さんそ}だよ。",
          visual: { kind: "emoji", value: "🌬️", caption: "ちっそと{酸素|さんそ}" },
        },
        {
          heading: "{燃|も}えた あと",
          body: "ものが{燃|も}えると{酸素|さんそ}が つかわれ、{二酸化炭素|にさんかたんそ}が できるよ。{石灰水|せっかいすい}を 入れて ふると{白|しろ}く にごるよ。",
          visual: { kind: "emoji", value: "🔥➡️🫧", caption: "{二酸化炭素|にさんかたんそ}が できる" },
        },
      ],
    },
    test: {
      unitId: U.combustionAir,
      questionCount: 5,
      questions: [
        {
          id: `${U.combustionAir}.q-1`,
          unitId: U.combustionAir,
          prompt: "ものが{燃|も}えつづけるのに{必要|ひつよう}な{気体|きたい}は どれ？",
          explanation: "ものを{燃|も}やす はたらきが あるのは{酸素|さんそ}だよ。{酸素|さんそ}が なくなると{火|ひ}は きえるよ。",
          format: "choice",
          choices: ["{酸素|さんそ}", "{二酸化炭素|にさんかたんそ}", "ちっそ", "{水素|すいそ}"],
          answer: "{酸素|さんそ}",
        },
        {
          id: `${U.combustionAir}.q-2`,
          unitId: U.combustionAir,
          prompt: "{空気|くうき}に いちばん{多|おお}く ふくまれる{気体|きたい}は どれ？",
          explanation: "{空気|くうき}の やく8{割|わり}は ちっそ。{酸素|さんそ}は やく2{割|わり}だよ。",
          format: "choice",
          choices: ["ちっそ", "{酸素|さんそ}", "{二酸化炭素|にさんかたんそ}", "けむり"],
          answer: "ちっそ",
        },
        {
          id: `${U.combustionAir}.q-3`,
          unitId: U.combustionAir,
          prompt: "ものが{燃|も}えた あとに ふえる{気体|きたい}は どれ？",
          explanation: "ものが{燃|も}えると{酸素|さんそ}が つかわれ、{二酸化炭素|にさんかたんそ}が ふえるよ。",
          format: "choice",
          choices: ["{二酸化炭素|にさんかたんそ}", "{酸素|さんそ}", "ちっそ", "ヘリウム"],
          answer: "{二酸化炭素|にさんかたんそ}",
        },
        {
          id: `${U.combustionAir}.q-4`,
          unitId: U.combustionAir,
          prompt: "{二酸化炭素|にさんかたんそ}を{調|しら}べる{石灰水|せっかいすい}は どうなる？",
          explanation: "{二酸化炭素|にさんかたんそ}が あると、{石灰水|せっかいすい}は{白|しろ}く にごるよ。",
          format: "choice",
          choices: ["{白|しろ}く にごる", "{赤|あか}くなる", "{青|あお}くなる", "こおる"],
          answer: "{白|しろ}く にごる",
        },
        {
          id: `${U.combustionAir}.q-5`,
          unitId: U.combustionAir,
          prompt: "びんの{中|なか}で ろうそくを{燃|も}やし ふたを すると やがて どうなる？",
          explanation: "{新|あたら}しい{空気|くうき}が{入|はい}らず{酸素|さんそ}が なくなるので、{火|ひ}は きえるよ。",
          format: "choice",
          choices: ["{火|ひ}が きえる", "{大|おお}きく{燃|も}える", "ずっと{燃|も}える", "{色|いろ}が{変|か}わる"],
          answer: "{火|ひ}が きえる",
        },
      ],
    },
  },

  // ── 2. 人や動物の体（呼吸・消化・血液循環） ──
  [U.humanBody]: {
    unitId: U.humanBody,
    learn: {
      unitId: U.humanBody,
      steps: [
        {
          heading: "{呼吸|こきゅう}",
          body: "{息|いき}を すって{肺|はい}で{酸素|さんそ}を{体|からだ}に とり入れ、いらなく なった{二酸化炭素|にさんかたんそ}を はき{出|だ}すよ。これを{呼吸|こきゅう}というよ。",
          visual: { kind: "emoji", value: "🫁", caption: "{肺|はい}で{呼吸|こきゅう}" },
        },
        {
          heading: "{消化|しょうか}",
          body: "{食|た}べ{物|もの}は{口|くち}→{胃|い}→{小腸|しょうちょう}と すすむ{間|あいだ}に こなされ、{養分|ようぶん}が{体|からだ}に とり入れられるよ。これを{消化|しょうか}というよ。",
          visual: { kind: "emoji", value: "🍙", caption: "{口|くち}→{胃|い}→{小腸|しょうちょう}" },
        },
        {
          heading: "{血液|けつえき}の めぐり",
          body: "{心臓|しんぞう}は ポンプの ように{血液|けつえき}を おし{出|だ}し、{血管|けっかん}を とおって{全身|ぜんしん}に{酸素|さんそ}や{養分|ようぶん}を はこぶよ。",
          visual: { kind: "emoji", value: "❤️", caption: "{心臓|しんぞう}が おくり{出|だ}す" },
        },
      ],
    },
    test: {
      unitId: U.humanBody,
      questionCount: 5,
      questions: [
        {
          id: `${U.humanBody}.q-1`,
          unitId: U.humanBody,
          prompt: "{空気|くうき}を すって{酸素|さんそ}を とり入れる{体|からだ}の{部分|ぶぶん}は どこ？",
          explanation: "{肺|はい}で{酸素|さんそ}を とり入れ、{二酸化炭素|にさんかたんそ}を はき{出|だ}すよ。",
          format: "choice",
          choices: ["{肺|はい}", "{胃|い}", "{心臓|しんぞう}", "{小腸|しょうちょう}"],
          answer: "{肺|はい}",
        },
        {
          id: `${U.humanBody}.q-2`,
          unitId: U.humanBody,
          prompt: "{食|た}べ{物|もの}を こなして{養分|ようぶん}を とり入れる はたらきを なんという？",
          explanation: "{食|た}べ{物|もの}を{体|からだ}に とり入れやすく する はたらきを{消化|しょうか}というよ。",
          format: "choice",
          choices: ["{消化|しょうか}", "{呼吸|こきゅう}", "{蒸散|じょうさん}", "{発電|はつでん}"],
          answer: "{消化|しょうか}",
        },
        {
          id: `${U.humanBody}.q-3`,
          unitId: U.humanBody,
          prompt: "{血液|けつえき}を{全身|ぜんしん}に おくり{出|だ}す ポンプの やくわりは どれ？",
          explanation: "{心臓|しんぞう}が ちぢんだり ゆるんだり して{血液|けつえき}を おし{出|だ}すよ。",
          format: "choice",
          choices: ["{心臓|しんぞう}", "{肺|はい}", "{胃|い}", "{脳|のう}"],
          answer: "{心臓|しんぞう}",
        },
        {
          id: `${U.humanBody}.q-4`,
          unitId: U.humanBody,
          prompt: "{息|いき}を はくとき、{多|おお}く{出|だ}す{気体|きたい}は どれ？",
          explanation: "{体|からだ}で つかわれた あと、{二酸化炭素|にさんかたんそ}を{多|おお}く はき{出|だ}すよ。",
          format: "choice",
          choices: ["{二酸化炭素|にさんかたんそ}", "{酸素|さんそ}", "ちっそ", "{水素|すいそ}"],
          answer: "{二酸化炭素|にさんかたんそ}",
        },
        {
          id: `${U.humanBody}.q-5`,
          unitId: U.humanBody,
          prompt: "{食|た}べ{物|もの}の{養分|ようぶん}が おもに とり入れられる{場所|ばしょ}は どこ？",
          explanation: "こなされた{養分|ようぶん}は おもに{小腸|しょうちょう}で{体|からだ}に とり入れられるよ。",
          format: "choice",
          choices: ["{小腸|しょうちょう}", "{口|くち}", "{肺|はい}", "{心臓|しんぞう}"],
          answer: "{小腸|しょうちょう}",
        },
      ],
    },
  },

  // ── 3. 植物の養分と水（光合成） ──
  [U.plantNutrition]: {
    unitId: U.plantNutrition,
    learn: {
      unitId: U.plantNutrition,
      steps: [
        {
          heading: "{葉|は}で{養分|ようぶん}を つくる",
          body: "{植物|しょくぶつ}は{葉|は}に{日光|にっこう}が{当|あ}たると、でんぷん（{養分|ようぶん}）を じぶんで つくるよ。これを{光合成|こうごうせい}というよ。",
          visual: { kind: "emoji", value: "🌿☀️", caption: "{葉|は}＋{日光|にっこう}で{養分|ようぶん}" },
        },
        {
          heading: "{水|みず}の とおり{道|みち}",
          body: "{根|ね}から すい{上|あ}げた{水|みず}は、くきを とおって{葉|は}まで はこばれるよ。",
          visual: { kind: "emoji", value: "💧🌱", caption: "{根|ね}→くき→{葉|は}" },
        },
        {
          heading: "{水|みず}は{葉|は}から{出|で}る",
          body: "{葉|は}に とどいた{水|みず}は、{水蒸気|すいじょうき}に なって{空気|くうき}{中|ちゅう}へ{出|で}ていくよ。これを{蒸散|じょうさん}というよ。",
          visual: { kind: "emoji", value: "🌫️🍃", caption: "{葉|は}から{蒸散|じょうさん}" },
        },
      ],
    },
    test: {
      unitId: U.plantNutrition,
      questionCount: 5,
      questions: [
        {
          id: `${U.plantNutrition}.q-1`,
          unitId: U.plantNutrition,
          prompt: "{葉|は}に{日光|にっこう}が{当|あ}たって できる{養分|ようぶん}は どれ？",
          explanation: "{光合成|こうごうせい}で{葉|は}に できる{養分|ようぶん}は でんぷんだよ。",
          format: "choice",
          choices: ["でんぷん", "{食塩|しょくえん}", "{鉄|てつ}", "{酸素|さんそ}だけ"],
          answer: "でんぷん",
        },
        {
          id: `${U.plantNutrition}.q-2`,
          unitId: U.plantNutrition,
          prompt: "{植物|しょくぶつ}が{日光|にっこう}を つかって{養分|ようぶん}を つくる はたらきを なんという？",
          explanation: "{葉|は}で{日光|にっこう}を つかい{養分|ようぶん}を つくる はたらきを{光合成|こうごうせい}というよ。",
          format: "choice",
          choices: ["{光合成|こうごうせい}", "{消化|しょうか}", "{呼吸|こきゅう}", "{蒸発|じょうはつ}"],
          answer: "{光合成|こうごうせい}",
        },
        {
          id: `${U.plantNutrition}.q-3`,
          unitId: U.plantNutrition,
          prompt: "でんぷんが あるか{調|しら}べる ヨウ{素|そ}{液|えき}を つけると{色|いろ}は どうなる？",
          explanation: "でんぷんに ヨウ{素|そ}{液|えき}を つけると{青|あお}むらさき{色|いろ}に なるよ。",
          format: "choice",
          choices: ["{青|あお}むらさき{色|いろ}になる", "{赤|あか}くなる", "{白|しろ}くなる", "{色|いろ}が きえる"],
          answer: "{青|あお}むらさき{色|いろ}になる",
        },
        {
          id: `${U.plantNutrition}.q-4`,
          unitId: U.plantNutrition,
          prompt: "{植物|しょくぶつ}が{水|みず}を とり入れる{部分|ぶぶん}は どこ？",
          explanation: "{植物|しょくぶつ}は おもに{根|ね}から{水|みず}を すい{上|あ}げるよ。",
          format: "choice",
          choices: ["{根|ね}", "{花|はな}", "{葉|は}の うら", "み"],
          answer: "{根|ね}",
        },
        {
          id: `${U.plantNutrition}.q-5`,
          unitId: U.plantNutrition,
          prompt: "{葉|は}から{水|みず}が{水蒸気|すいじょうき}に なって{出|で}ることを なんという？",
          explanation: "{葉|は}から{水|みず}が{水蒸気|すいじょうき}に なって{出|で}ることを{蒸散|じょうさん}というよ。",
          format: "choice",
          choices: ["{蒸散|じょうさん}", "{光合成|こうごうせい}", "{消化|しょうか}", "{結実|けつじつ}"],
          answer: "{蒸散|じょうさん}",
        },
      ],
    },
  },

  // ── 4. 生物と環境 ──
  [U.livingEnvironment]: {
    unitId: U.livingEnvironment,
    learn: {
      unitId: U.livingEnvironment,
      steps: [
        {
          heading: "{食|た}べる・{食|た}べられる",
          body: "{生物|せいぶつ}は「{食|た}べる もの」と「{食|た}べられる もの」の くさりで つながっているよ。これを{食物連鎖|しょくもつれんさ}というよ。",
          visual: { kind: "emoji", value: "🌿🐛🐦", caption: "{食物連鎖|しょくもつれんさ}" },
        },
        {
          heading: "もとは{植物|しょくぶつ}",
          body: "{植物|しょくぶつ}は{日光|にっこう}で{養分|ようぶん}を つくれるので、{食|た}べ{物|もの}の くさりの{出発点|しゅっぱつてん}だよ。",
          visual: { kind: "emoji", value: "🌱☀️", caption: "{植物|しょくぶつ}が{出発点|しゅっぱつてん}" },
        },
        {
          heading: "{空気|くうき}と{水|みず}で つながる",
          body: "{生物|せいぶつ}は{空気|くうき}・{水|みず}・{食|た}べ{物|もの}を つうじて、まわりの{環境|かんきょう}と かかわって{生|い}きているよ。",
          visual: { kind: "emoji", value: "🌍💧", caption: "{環境|かんきょう}と かかわる" },
        },
      ],
    },
    test: {
      unitId: U.livingEnvironment,
      questionCount: 5,
      questions: [
        {
          id: `${U.livingEnvironment}.q-1`,
          unitId: U.livingEnvironment,
          prompt: "「{食|た}べる・{食|た}べられる」の つながりを なんという？",
          explanation: "{生物|せいぶつ}どうしの{食|た}べる・{食|た}べられる つながりを{食物連鎖|しょくもつれんさ}というよ。",
          format: "choice",
          choices: ["{食物連鎖|しょくもつれんさ}", "{光合成|こうごうせい}", "{消化|しょうか}", "{蒸散|じょうさん}"],
          answer: "{食物連鎖|しょくもつれんさ}",
        },
        {
          id: `${U.livingEnvironment}.q-2`,
          unitId: U.livingEnvironment,
          prompt: "{食物連鎖|しょくもつれんさ}の{出発点|しゅっぱつてん}に なる{生物|せいぶつ}は どれ？",
          explanation: "{植物|しょくぶつ}は じぶんで{養分|ようぶん}を つくれるので、くさりの{出発点|しゅっぱつてん}だよ。",
          format: "choice",
          choices: ["{植物|しょくぶつ}", "ライオン", "ヘビ", "ワシ"],
          answer: "{植物|しょくぶつ}",
        },
        {
          id: `${U.livingEnvironment}.q-3`,
          unitId: U.livingEnvironment,
          prompt: "{植物|しょくぶつ}が{光合成|こうごうせい}で つくり{出|だ}し、{動物|どうぶつ}も つかう{気体|きたい}は どれ？",
          explanation: "{植物|しょくぶつ}は{光合成|こうごうせい}で{酸素|さんそ}を{出|だ}し、{動物|どうぶつ}は それを{呼吸|こきゅう}に つかうよ。",
          format: "choice",
          choices: ["{酸素|さんそ}", "ちっそ", "けむり", "{水蒸気|すいじょうき}"],
          answer: "{酸素|さんそ}",
        },
        {
          id: `${U.livingEnvironment}.q-4`,
          unitId: U.livingEnvironment,
          prompt: "{食物連鎖|しょくもつれんさ}の もとに なる エネルギーは どこから?",
          explanation: "{植物|しょくぶつ}は{太陽|たいよう}の{光|ひかり}で{養分|ようぶん}を つくる ので、もとは{太陽|たいよう}の{光|ひかり}だよ。",
          format: "choice",
          choices: ["{太陽|たいよう}の{光|ひかり}", "{月|つき}の{光|ひかり}", "{電気|でんき}", "{風|かぜ}"],
          answer: "{太陽|たいよう}の{光|ひかり}",
        },
        {
          id: `${U.livingEnvironment}.q-5`,
          unitId: U.livingEnvironment,
          prompt: "{人|ひと}が{自然|しぜん}を まもる ために{大切|たいせつ}な ことは どれ？",
          explanation: "{空気|くうき}や{水|みず}を よごさない ことが、{生物|せいぶつ}や{環境|かんきょう}を まもる ことに つながるよ。",
          format: "choice",
          choices: ["{空気|くうき}や{水|みず}を よごさない", "ごみを{川|かわ}に{捨|す}てる", "{木|き}を ぜんぶ{切|き}る", "{生|い}き{物|もの}を とりつくす"],
          answer: "{空気|くうき}や{水|みず}を よごさない",
        },
      ],
    },
  },

  // ── 5. 水溶液の性質 ──
  [U.aqueousSolution]: {
    unitId: U.aqueousSolution,
    learn: {
      unitId: U.aqueousSolution,
      steps: [
        {
          heading: "3つの なかま",
          body: "{水溶液|すいようえき}には{酸性|さんせい}・{中性|ちゅうせい}・アルカリ{性|せい}の 3つの なかまが あるよ。",
          visual: { kind: "emoji", value: "🧪", caption: "{酸性|さんせい}・{中性|ちゅうせい}・アルカリ{性|せい}" },
        },
        {
          heading: "リトマス{紙|し}で しらべる",
          body: "{青|あお}い リトマス{紙|し}が{赤|あか}くなると{酸性|さんせい}、{赤|あか}い リトマス{紙|し}が{青|あお}くなると アルカリ{性|せい}だよ。どちらも{変|か}わらなければ{中性|ちゅうせい}だよ。",
          visual: { kind: "emoji", value: "🟦🟥", caption: "リトマス{紙|し}の{色|いろ}" },
        },
        {
          heading: "とけている もの",
          body: "{炭酸水|たんさんすい}には{二酸化炭素|にさんかたんそ}が、{食塩水|しょくえんすい}には{食塩|しょくえん}が とけているよ。{水|みず}を{蒸発|じょうはつ}させると とけていた ものが 出てくる ことが あるよ。",
          visual: { kind: "emoji", value: "💨🧂", caption: "{蒸発|じょうはつ}で{残|のこ}る" },
        },
      ],
    },
    test: {
      unitId: U.aqueousSolution,
      questionCount: 5,
      questions: [
        {
          id: `${U.aqueousSolution}.q-1`,
          unitId: U.aqueousSolution,
          prompt: "{水溶液|すいようえき}の なかま{分|わ}けは{酸性|さんせい}・アルカリ{性|せい}と あと ひとつは？",
          explanation: "どちらでも ない なかまを{中性|ちゅうせい}というよ。{水|みず}や{食塩水|しょくえんすい}が{中性|ちゅうせい}だよ。",
          format: "choice",
          choices: ["{中性|ちゅうせい}", "{気体|きたい}", "{金属|きんぞく}", "{固体|こたい}"],
          answer: "{中性|ちゅうせい}",
        },
        {
          id: `${U.aqueousSolution}.q-2`,
          unitId: U.aqueousSolution,
          prompt: "{青|あお}い リトマス{紙|し}を{赤|あか}く する{水溶液|すいようえき}は どの なかま？",
          explanation: "{青|あお}い リトマス{紙|し}を{赤|あか}く するのは{酸性|さんせい}だよ。",
          format: "choice",
          choices: ["{酸性|さんせい}", "アルカリ{性|せい}", "{中性|ちゅうせい}", "{金属|きんぞく}{性|せい}"],
          answer: "{酸性|さんせい}",
        },
        {
          id: `${U.aqueousSolution}.q-3`,
          unitId: U.aqueousSolution,
          prompt: "{炭酸水|たんさんすい}に とけている{気体|きたい}は どれ？",
          explanation: "{炭酸水|たんさんすい}には{二酸化炭素|にさんかたんそ}が とけていて、あわと なって 出てくるよ。",
          format: "choice",
          choices: ["{二酸化炭素|にさんかたんそ}", "{酸素|さんそ}", "ちっそ", "{水素|すいそ}"],
          answer: "{二酸化炭素|にさんかたんそ}",
        },
        {
          id: `${U.aqueousSolution}.q-4`,
          unitId: U.aqueousSolution,
          prompt: "うすい{塩酸|えんさん}に{鉄|てつ}を 入れると どうなる？",
          explanation: "{塩酸|えんさん}は{鉄|てつ}を あわを{出|だ}しながら とかすよ。",
          format: "choice",
          choices: ["あわを{出|だ}して とける", "こおる", "{色|いろ}が きえる", "{重|おも}くなる"],
          answer: "あわを{出|だ}して とける",
        },
        {
          id: `${U.aqueousSolution}.q-5`,
          unitId: U.aqueousSolution,
          prompt: "{食塩水|しょくえんすい}の{水|みず}を{蒸発|じょうはつ}させると あとに{残|のこ}る ものは？",
          explanation: "{水|みず}だけが{蒸発|じょうはつ}し、とけていた{食塩|しょくえん}が あとに{残|のこ}るよ。",
          format: "choice",
          choices: ["{食塩|しょくえん}", "{砂糖|さとう}", "{鉄|てつ}", "なにも{残|のこ}らない"],
          answer: "{食塩|しょくえん}",
        },
      ],
    },
  },

  // ── 6. てこのはたらき ──
  [U.lever]: {
    unitId: U.lever,
    learn: {
      unitId: U.lever,
      steps: [
        {
          heading: "てこの 3つの{点|てん}",
          body: "てこには、ささえる{支点|してん}・{力|ちから}を 入れる{力点|りきてん}・ものに{力|ちから}が はたらく{作用点|さようてん}の 3つの{点|てん}が あるよ。",
          visual: { kind: "emoji", value: "⚖️", caption: "{支点|してん}・{力点|りきてん}・{作用点|さようてん}" },
        },
        {
          heading: "{小|ちい}さな{力|ちから}で うごかす",
          body: "{支点|してん}から{力点|りきてん}までを{長|なが}くすると、{小|ちい}さな{力|ちから}でも{重|おも}い ものを もち{上|あ}げられるよ。",
          visual: { kind: "emoji", value: "🪨🔧", caption: "{長|なが}いほど{楽|らく}" },
        },
        {
          heading: "{身|み}の まわりの てこ",
          body: "はさみ・せんぬき・くぎぬきは、てこの しくみを つかった{道具|どうぐ}だよ。",
          visual: { kind: "emoji", value: "✂️", caption: "てこの{道具|どうぐ}" },
        },
      ],
    },
    test: {
      unitId: U.lever,
      questionCount: 5,
      questions: [
        {
          id: `${U.lever}.q-1`,
          unitId: U.lever,
          prompt: "てこで ささえに なる{点|てん}を なんという？",
          explanation: "てこを ささえる うごかない{点|てん}を{支点|してん}というよ。",
          format: "choice",
          choices: ["{支点|してん}", "{力点|りきてん}", "{作用点|さようてん}", "{中心点|ちゅうしんてん}"],
          answer: "{支点|してん}",
        },
        {
          id: `${U.lever}.q-2`,
          unitId: U.lever,
          prompt: "てこで{力|ちから}を 入れる{点|てん}を なんという？",
          explanation: "{手|て}で おして{力|ちから}を 入れる{点|てん}を{力点|りきてん}というよ。",
          format: "choice",
          choices: ["{力点|りきてん}", "{支点|してん}", "{作用点|さようてん}", "{起点|きてん}"],
          answer: "{力点|りきてん}",
        },
        {
          id: `${U.lever}.q-3`,
          unitId: U.lever,
          prompt: "{小|ちい}さな{力|ちから}で{重|おも}い ものを 上げるには、{支点|してん}から{力点|りきてん}までを どうする？",
          explanation: "{支点|してん}から{力点|りきてん}までを{長|なが}くするほど、{小|ちい}さな{力|ちから}で すむよ。",
          format: "choice",
          choices: ["{長|なが}くする", "{短|みじか}くする", "なくす", "{重|おも}くする"],
          answer: "{長|なが}くする",
        },
        {
          id: `${U.lever}.q-4`,
          unitId: U.lever,
          prompt: "つぎの うち、てこを つかった{道具|どうぐ}は どれ？",
          explanation: "はさみは 2まいの{刃|は}が{支点|してん}で つながった、てこの{道具|どうぐ}だよ。",
          format: "choice",
          choices: ["はさみ", "{虫|むし}めがね", "{方位|ほうい}じしん", "{温度計|おんどけい}"],
          answer: "はさみ",
        },
        {
          id: `${U.lever}.q-5`,
          unitId: U.lever,
          prompt: "てこが つり{合|あ}うのは、{左右|さゆう}の「おもさ×{支点|してん}からの きょり」が どうなる とき？",
          explanation: "{左右|さゆう}の「おもさ×きょり」が{等|ひと}しい とき、てこは つり{合|あ}うよ。",
          format: "choice",
          choices: ["{等|ひと}しい とき", "{右|みぎ}が 大きい とき", "{左|ひだり}が 大きい とき", "{両方|りょうほう} 0 の とき"],
          answer: "{等|ひと}しい とき",
        },
      ],
    },
  },

  // ── 7. 電気の利用 ──
  [U.electricityUse]: {
    unitId: U.electricityUse,
    learn: {
      unitId: U.electricityUse,
      steps: [
        {
          heading: "{電気|でんき}を つくる",
          body: "{手回|てまわ}し{発電機|はつでんき}を まわしたり、{光電池|こうでんち}に{日光|にっこう}を{当|あ}てると、{電気|でんき}を つくる ことが できるよ。",
          visual: { kind: "emoji", value: "🔌⚡", caption: "{発電|はつでん}する" },
        },
        {
          heading: "{電気|でんき}を ためる",
          body: "つくった{電気|でんき}は、コンデンサーに ためて おく ことが できるよ。ためた{電気|でんき}は あとから つかえるよ。",
          visual: { kind: "emoji", value: "🔋", caption: "{電気|でんき}を ためる" },
        },
        {
          heading: "{電気|でんき}を いろいろに{変|か}える",
          body: "{電気|でんき}は{光|ひかり}・{音|おと}・{熱|ねつ}・{運動|うんどう}に{変|か}えて つかえるよ。LED は{豆電球|まめでんきゅう}より{少|すく}ない{電気|でんき}で{光|ひか}るよ。",
          visual: { kind: "emoji", value: "💡🔊♨️", caption: "{光|ひかり}・{音|おと}・{熱|ねつ}に{変|か}える" },
        },
      ],
    },
    test: {
      unitId: U.electricityUse,
      questionCount: 5,
      questions: [
        {
          id: `${U.electricityUse}.q-1`,
          unitId: U.electricityUse,
          prompt: "{手|て}で まわして{電気|でんき}を つくる{道具|どうぐ}は どれ？",
          explanation: "{手回|てまわ}し{発電機|はつでんき}は、まわす{運動|うんどう}を{電気|でんき}に{変|か}える{道具|どうぐ}だよ。",
          format: "choice",
          choices: ["{手回|てまわ}し{発電機|はつでんき}", "{温度計|おんどけい}", "{方位|ほうい}じしん", "{虫|むし}めがね"],
          answer: "{手回|てまわ}し{発電機|はつでんき}",
        },
        {
          id: `${U.electricityUse}.q-2`,
          unitId: U.electricityUse,
          prompt: "つくった{電気|でんき}を ためて おく{道具|どうぐ}は どれ？",
          explanation: "コンデンサーは{電気|でんき}を ためて おく ことが できる{道具|どうぐ}だよ。",
          format: "choice",
          choices: ["コンデンサー", "{豆電球|まめでんきゅう}", "スイッチ", "どうせん"],
          answer: "コンデンサー",
        },
        {
          id: `${U.electricityUse}.q-3`,
          unitId: U.electricityUse,
          prompt: "{光|ひかり}を{電気|でんき}に{変|か}える{道具|どうぐ}は どれ？",
          explanation: "{光電池|こうでんち}（ソーラーパネル）は{日光|にっこう}を{電気|でんき}に{変|か}えるよ。",
          format: "choice",
          choices: ["{光電池|こうでんち}", "{鏡|かがみ}", "{電熱線|でんねつせん}", "じしゃく"],
          answer: "{光電池|こうでんち}",
        },
        {
          id: `${U.electricityUse}.q-4`,
          unitId: U.electricityUse,
          prompt: "アイロンや ヒーターは、{電気|でんき}を おもに なにに{変|か}えている？",
          explanation: "アイロンや ヒーターは{電気|でんき}を{熱|ねつ}に{変|か}えて つかっているよ。",
          format: "choice",
          choices: ["{熱|ねつ}", "{音|おと}", "{光|ひかり}だけ", "{風|かぜ}だけ"],
          answer: "{熱|ねつ}",
        },
        {
          id: `${U.electricityUse}.q-5`,
          unitId: U.electricityUse,
          prompt: "{豆電球|まめでんきゅう}と LED、{少|すく}ない{電気|でんき}で{長|なが}く{光|ひか}るのは どちら？",
          explanation: "LED は{豆電球|まめでんきゅう}より{少|すく}ない{電気|でんき}で{光|ひか}るので、{長|なが}く つかえるよ。",
          format: "choice",
          choices: ["LED", "{豆電球|まめでんきゅう}", "どちらも おなじ", "ろうそく"],
          answer: "LED",
        },
      ],
    },
  },

  // ── 8. 土地のつくりと変化 ──
  [U.landChanges]: {
    unitId: U.landChanges,
    learn: {
      unitId: U.landChanges,
      steps: [
        {
          heading: "{地層|ちそう}",
          body: "{土地|とち}を ほったり がけを 見ると、すな・どろ・れき などが{重|かさ}なった しまもようが あるよ。これを{地層|ちそう}というよ。",
          visual: { kind: "emoji", value: "🪨", caption: "{重|かさ}なった{地層|ちそう}" },
        },
        {
          heading: "{地層|ちそう}の でき{方|かた}",
          body: "{流|なが}れる{水|みず}が はこんだ つぶや、{火山|かざん}の はいが{積|つ}もって、{長|なが}い{年月|ねんげつ}を かけて できるよ。{化石|かせき}が 見つかる ことも あるよ。",
          visual: { kind: "emoji", value: "🌊🐚", caption: "{積|つ}もって できる" },
        },
        {
          heading: "{土地|とち}の{変化|へんか}",
          body: "{火山|かざん}の ふん{火|か}や{地震|じしん}で、{土地|とち}の ようすが 大きく{変|か}わる ことが あるよ。",
          visual: { kind: "emoji", value: "🌋", caption: "ふん{火|か}・{地震|じしん}で{変化|へんか}" },
        },
      ],
    },
    test: {
      unitId: U.landChanges,
      questionCount: 5,
      questions: [
        {
          id: `${U.landChanges}.q-1`,
          unitId: U.landChanges,
          prompt: "すな・どろ・れきが{重|かさ}なった しまもようを なんという？",
          explanation: "つぶが{重|かさ}なって できた しまもようを{地層|ちそう}というよ。",
          format: "choice",
          choices: ["{地層|ちそう}", "{化石|かせき}", "{火山灰|かざんばい}", "{断層|だんそう}"],
          answer: "{地層|ちそう}",
        },
        {
          id: `${U.landChanges}.q-2`,
          unitId: U.landChanges,
          prompt: "{地層|ちそう}から 見つかる、{大昔|おおむかし}の{生物|せいぶつ}の あとを なんという？",
          explanation: "{大昔|おおむかし}の{生物|せいぶつ}の{体|からだ}や あとが{残|のこ}った ものを{化石|かせき}というよ。",
          format: "choice",
          choices: ["{化石|かせき}", "{鉱物|こうぶつ}", "{結晶|けっしょう}", "{宝石|ほうせき}"],
          answer: "{化石|かせき}",
        },
        {
          id: `${U.landChanges}.q-3`,
          unitId: U.landChanges,
          prompt: "{地層|ちそう}を つくる つぶを はこぶ、おもな はたらきは どれ？",
          explanation: "{流|なが}れる{水|みず}が つぶを はこび、{海|うみ}や{湖|みずうみ}の{底|そこ}に{積|つ}もらせるよ。",
          format: "choice",
          choices: ["{流|なが}れる{水|みず}", "{月|つき}の{光|ひかり}", "{音|おと}", "じしゃく"],
          answer: "{流|なが}れる{水|みず}",
        },
        {
          id: `${U.landChanges}.q-4`,
          unitId: U.landChanges,
          prompt: "{土地|とち}の ようすを 大きく{変化|へんか}させる{自然|しぜん}の はたらきは どれ？",
          explanation: "{火山|かざん}の ふん{火|か}や{地震|じしん}は、{土地|とち}を 大きく{変|か}える ことが あるよ。",
          format: "choice",
          choices: ["{火山|かざん}や{地震|じしん}", "{月|つき}の みちかけ", "{呼吸|こきゅう}", "{光合成|こうごうせい}"],
          answer: "{火山|かざん}や{地震|じしん}",
        },
        {
          id: `${U.landChanges}.q-5`,
          unitId: U.landChanges,
          prompt: "{火山|かざん}が ふん{火|か}すると{出|で}て、{積|つ}もって{地層|ちそう}に なる ものは どれ？",
          explanation: "ふん{火|か}で{出|で}る{火山灰|かざんばい}が{積|つ}もって{地層|ちそう}に なる ことが あるよ。",
          format: "choice",
          choices: ["{火山灰|かざんばい}", "{雪|ゆき}", "{食塩|しょくえん}", "{鉄|てつ}"],
          answer: "{火山灰|かざんばい}",
        },
      ],
    },
  },

  // ── 9. 月と太陽 ──
  [U.moonSun]: {
    unitId: U.moonSun,
    learn: {
      unitId: U.moonSun,
      steps: [
        {
          heading: "{月|つき}は{光|ひかり}を はね{返|かえ}す",
          body: "{月|つき}は じぶんで{光|ひか}らず、{太陽|たいよう}の{光|ひかり}を はね{返|かえ}して{光|ひか}って 見えるよ。",
          visual: { kind: "emoji", value: "🌙☀️", caption: "{太陽|たいよう}の{光|ひかり}を はね{返|かえ}す" },
        },
        {
          heading: "{月|つき}の{形|かたち}が{変|か}わる",
          body: "{太陽|たいよう}と{月|つき}と{地球|ちきゅう}の{位置|いち}の かんけいで、{月|つき}の{形|かたち}は 日に よって{変|か}わって 見えるよ。これを みちかけというよ。",
          visual: { kind: "emoji", value: "🌒🌓🌔", caption: "{月|つき}の みちかけ" },
        },
        {
          heading: "{表面|ひょうめん}の ようす",
          body: "{太陽|たいよう}は みずから{光|ひか}り、とても{熱|あつ}いよ。{月|つき}の{表面|ひょうめん}には クレーターと よばれる くぼみが あるよ。",
          visual: { kind: "emoji", value: "🌕", caption: "{月|つき}の クレーター" },
        },
      ],
    },
    test: {
      unitId: U.moonSun,
      questionCount: 5,
      questions: [
        {
          id: `${U.moonSun}.q-1`,
          unitId: U.moonSun,
          prompt: "{月|つき}が{光|ひか}って 見えるのは なぜ？",
          explanation: "{月|つき}は じぶんで{光|ひか}らず、{太陽|たいよう}の{光|ひかり}を はね{返|かえ}して{光|ひか}って 見えるよ。",
          format: "choice",
          choices: ["{太陽|たいよう}の{光|ひかり}を はね{返|かえ}すから", "みずから{燃|も}えているから", "{電気|でんき}で{光|ひか}るから", "{星|ほし}の{光|ひかり}を{集|あつ}めるから"],
          answer: "{太陽|たいよう}の{光|ひかり}を はね{返|かえ}すから",
        },
        {
          id: `${U.moonSun}.q-2`,
          unitId: U.moonSun,
          prompt: "{月|つき}の{形|かたち}が 日に よって{変|か}わって 見えることを なんという？",
          explanation: "{月|つき}の 見える{形|かたち}が{変|か}わる ことを みちかけというよ。",
          format: "choice",
          choices: ["みちかけ", "にっしょく", "{蒸散|じょうさん}", "{反射|はんしゃ}"],
          answer: "みちかけ",
        },
        {
          id: `${U.moonSun}.q-3`,
          unitId: U.moonSun,
          prompt: "みずから{光|ひか}って いるのは{月|つき}と{太陽|たいよう}の どちら？",
          explanation: "{太陽|たいよう}は みずから{光|ひか}り{熱|ねつ}を{出|だ}す。{月|つき}は{光|ひかり}を はね{返|かえ}すだけだよ。",
          format: "choice",
          choices: ["{太陽|たいよう}", "{月|つき}", "{両方|りょうほう}", "どちらも ちがう"],
          answer: "{太陽|たいよう}",
        },
        {
          id: `${U.moonSun}.q-4`,
          unitId: U.moonSun,
          prompt: "{月|つき}の{形|かたち}が{変|か}わって 見えるのは、なにの かんけい？",
          explanation: "{太陽|たいよう}・{月|つき}・{地球|ちきゅう}の{位置|いち}の かんけいで、{月|つき}の{光|ひか}る{部分|ぶぶん}の 見え{方|かた}が{変|か}わるよ。",
          format: "choice",
          choices: ["{太陽|たいよう}と{月|つき}と{地球|ちきゅう}の{位置|いち}", "その日の{天気|てんき}", "{気温|きおん}", "{風|かぜ}の{強|つよ}さ"],
          answer: "{太陽|たいよう}と{月|つき}と{地球|ちきゅう}の{位置|いち}",
        },
        {
          id: `${U.moonSun}.q-5`,
          unitId: U.moonSun,
          prompt: "{月|つき}の{表面|ひょうめん}に ある まるい くぼみを なんという？",
          explanation: "{月|つき}の{表面|ひょうめん}に ある くぼみを クレーターというよ。",
          format: "choice",
          choices: ["クレーター", "{地層|ちそう}", "{火口|かこう}", "オアシス"],
          answer: "クレーター",
        },
      ],
    },
  },
};
