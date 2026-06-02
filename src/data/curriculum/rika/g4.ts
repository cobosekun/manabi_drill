// ══════════════════════════════════════════
// カリキュラム: 理科（りか）小4
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
//
// 【型】rika は drill.ts の SubjectId / ThemeName が既に rika / emerald を持つため
//   型吸収(as 等)は不要。rikaSubject は rika/g3.ts が定義済みのため再定義しない
//   （重複排除 / アンチ肥大）。領域 4種(energy/particle/life/earth)も g3 が定義済みのため
//   本ファイルでは新規領域を追加せず rikaG4Domains は空配列にする（中央集約で g3 分が入る）。
//
// 【整合】rika/g3.ts は g4 を前方参照している（matter-weight→rika.g4.matter-states /
//   electric-circuit→rika.g4.electric-current / sun-ground→rika.g4.weather）。
//   この 3 つの id を g4 で必ず定義し、参照解決を成立させる。
//
// 【表記】CEO方針(2026-06-02〜)に従い、全表示テキストをルビ記法 {漢字|よみ} で執筆
//   （全漢字にルビ）。レンダラ RubyText は別 worker が用意。データ側は文字列のみ。
//   理科は generators 非対応 → 全単元 固定 questions[]（4択 choice、全問 explanation 必須）。図は emoji 中心。
// ══════════════════════════════════════════

import type { Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 領域（4領域は rika/g3.ts が定義済み。g4 は新規追加なし＝空配列）──
export const rikaG4Domains: Domain[] = [];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。g3 と本ファイル内で参照を完結）:
//
//   air-water ─▶ temp-volume ─┬─▶ warming
//                             └─▶ matter-states
//   g3.matter-weight ─▶ matter-states
//   g3.electric-circuit ─▶ electric-current
//   g3.sun-ground ─▶ moon-star / rain-ground ─▶ weather ◀─ g3.sun-ground
//   g3.plant-growth ─▶ season-life
//
const U = {
  airWater: "rika.g4.air-water",
  matterStates: "rika.g4.matter-states",
  tempVolume: "rika.g4.temp-volume",
  warming: "rika.g4.warming",
  electricCurrent: "rika.g4.electric-current",
  bodyMovement: "rika.g4.body-movement",
  seasonLife: "rika.g4.season-life",
  moonStar: "rika.g4.moon-star",
  rainGround: "rika.g4.rain-ground",
  weather: "rika.g4.weather",
} as const;

// g3（前提として参照する既存単元 id）
const G3 = {
  matterWeight: "rika.g3.matter-weight",
  electricCircuit: "rika.g3.electric-circuit",
  sunGround: "rika.g3.sun-ground",
  plantGrowth: "rika.g3.plant-growth",
} as const;

export const rikaG4Units: Unit[] = [
  {
    id: U.airWater,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.particle",
    title: "{空気|くうき}と{水|みず}の{性質|せいしつ}",
    order: 1,
    realWorldUse:
      "ボールや タイヤに {空気|くうき}を {入|い}れて かたくする ときのように、{閉|と}じこめた {空気|くうき}を {押|お}すと どうなるかを {知|し}るのに {役立|やくだ}つよ。",
    leadsTo: [U.tempVolume],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.tempVolume,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.particle",
    title: "{金属|きんぞく}・{水|みず}・{空気|くうき}と{温度|おんど}",
    order: 2,
    realWorldUse:
      "あたためると {体積|たいせき}が {増|ふ}える せいしつは、レールの つなぎ目の すき間や、{温度計|おんどけい}の しくみに {使|つか}われているよ。",
    leadsTo: [U.warming, U.matterStates],
    prerequisites: [U.airWater],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.warming,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.particle",
    title: "ものの{温|あたた}まり{方|かた}",
    order: 3,
    realWorldUse:
      "フライパンや おふろ、エアコンの しくみのように、{金属|きんぞく}・{水|みず}・{空気|くうき}が どう {温|あたた}まって いくかを {知|し}るのに {役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [U.tempVolume],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.matterStates,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.particle",
    title: "{水|みず}の すがたと{変化|へんか}",
    order: 4,
    realWorldUse:
      "やかんの {湯気|ゆげ}、まどの {結露|けつろ}、せんたく{物|もの}が かわく ことのように、{水|みず}が {氷|こおり}・{水|みず}・{水蒸気|すいじょうき}に {姿|すがた}を {変|か}える ことを {知|し}るのに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [U.tempVolume, G3.matterWeight],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.electricCurrent,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.energy",
    title: "{電気|でんき}の はたらき（{直列|ちょくれつ}・{並列|へいれつ}）",
    order: 5,
    realWorldUse:
      "かい{中|ちゅう}{電灯|でんとう}や おもちゃの {電池|でんち}の つなぎ{方|かた}のように、{乾電池|かんでんち}の つなぎ{方|かた}で {明|あか}るさや {速|はや}さが かわる ことを {知|し}るのに {役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [G3.electricCircuit],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.bodyMovement,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.life",
    title: "{人|ひと}の{体|からだ}の つくりと{運動|うんどう}",
    order: 6,
    realWorldUse:
      "うでを {曲|ま}げたり ものを {持|も}ち{上|あ}げたり する ときのように、{骨|ほね}・{関節|かんせつ}・{筋肉|きんにく}が どう はたらいて {体|からだ}を {動|うご}かすかを {知|し}るのに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.seasonLife,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.life",
    title: "{季節|きせつ}と{生|い}き{物|もの}",
    order: 7,
    realWorldUse:
      "{春|はる}の サクラ、{夏|なつ}の セミ、{秋|あき}の {虫|むし}の {声|こえ}のように、{季節|きせつ}が かわると {生|い}き{物|もの}の ようすが どう かわるかを {知|し}るのに {役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [G3.plantGrowth],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.moonStar,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.earth",
    title: "{月|つき}と{星|ほし}",
    order: 8,
    realWorldUse:
      "よるに {月|つき}や {星|ほし}を {見|み}て {時間|じかん}と ともに うごく ようすを たしかめる ときのように、{月|つき}や {星|ほし}の うごき・{明|あか}るさ・{色|いろ}を {知|し}るのに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [G3.sunGround],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.rainGround,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.earth",
    title: "{雨水|あまみず}の ゆくえと{地面|じめん}",
    order: 9,
    realWorldUse:
      "{雨|あめ}の{日|ひ}に {水|みず}たまりが できる ところと できない ところの ちがいのように、{雨水|あまみず}の {流|なが}れや しみこみ{方|かた}を {知|し}るのに {役立|やくだ}つよ。",
    leadsTo: [U.weather],
    prerequisites: [G3.sunGround],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.weather,
    subjectId: "rika",
    grade: 4,
    domainId: "rika.earth",
    title: "{天気|てんき}と{気温|きおん}",
    order: 10,
    realWorldUse:
      "あさと ひるで {気温|きおん}が かわる ことや、{晴|は}れと くもりで すごしやすさが ちがう ことのように、{天気|てんき}と {気温|きおん}の かんけいを {知|し}るのに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [G3.sunGround, U.rainGround],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// 全テキストはルビ記法 {漢字|よみ}。テストは固定 questions[]（全問 explanation 必須）。
// ══════════════════════════════════════════

export const rikaG4Contents: Record<string, UnitContent> = {
  // ── 1. 空気と水の性質 ──
  [U.airWater]: {
    unitId: U.airWater,
    learn: {
      unitId: U.airWater,
      steps: [
        {
          heading: "{閉|と}じこめた{空気|くうき}を{押|お}す",
          body: "つつに {閉|と}じこめた {空気|くうき}を {押|お}すと、ちぢんで かさ（{体積|たいせき}）が {小|ちい}さく なるよ。{手|て}を はなすと もとに もどるよ。",
          visual: { kind: "emoji", value: "💨🔵⬇️", caption: "{空気|くうき}は ちぢむ" },
        },
        {
          heading: "{水|みず}は ちぢまない",
          body: "おなじように {水|みず}を {閉|と}じこめて {押|お}しても、{水|みず}は ほとんど ちぢまないよ。ここが {空気|くうき}と ちがう ところだね。",
          visual: { kind: "emoji", value: "💧🚫⬇️", caption: "{水|みず}は ちぢまない" },
        },
        {
          heading: "{押|お}し{返|かえ}す{力|ちから}",
          body: "ちぢんだ {空気|くうき}は もとに もどろうと して、{押|お}し{返|かえ}す {力|ちから}が {強|つよ}く なるよ。{空気|くうき}でっぽうは この {力|ちから}を {使|つか}うよ。",
          visual: { kind: "emoji", value: "🔫💨", caption: "{空気|くうき}でっぽう" },
        },
      ],
    },
    test: {
      unitId: U.airWater,
      questionCount: 4,
      questions: [
        {
          id: `${U.airWater}.q-1`,
          unitId: U.airWater,
          prompt: "{閉|と}じこめた {空気|くうき}を {押|お}すと どうなる?",
          explanation: "{空気|くうき}は {押|お}すと ちぢんで {体積|たいせき}が {小|ちい}さく なるよ。",
          format: "choice",
          choices: ["ちぢんで {小|ちい}さくなる", "ふくらんで {大|おお}きくなる", "かわらない", "きえる"],
          answer: "ちぢんで {小|ちい}さくなる",
        },
        {
          id: `${U.airWater}.q-2`,
          unitId: U.airWater,
          prompt: "{閉|と}じこめた {水|みず}を {押|お}すと どうなる?",
          explanation: "{水|みず}は {押|お}しても ほとんど ちぢまないよ。{空気|くうき}との 大きな ちがいだね。",
          format: "choice",
          choices: ["ほとんど ちぢまない", "{空気|くうき}より よく ちぢむ", "きえる", "こおる"],
          answer: "ほとんど ちぢまない",
        },
        {
          id: `${U.airWater}.q-3`,
          unitId: U.airWater,
          prompt: "ちぢんだ {空気|くうき}は どうしようと する?",
          explanation: "ちぢんだ {空気|くうき}は もとに もどろうと して、{押|お}し{返|かえ}す {力|ちから}が {強|つよ}く なるよ。",
          format: "choice",
          choices: ["もとに もどろうと する", "もっと ちぢもうと する", "なくなる", "つめたくなる"],
          answer: "もとに もどろうと する",
        },
        {
          id: `${U.airWater}.q-4`,
          unitId: U.airWater,
          prompt: "{空気|くうき}でっぽうが たまを とばせるのは どんな {力|ちから}?",
          explanation: "ちぢめた {空気|くうき}が もとに もどろうと {押|お}し{返|かえ}す {力|ちから}で たまが とぶよ。",
          format: "choice",
          choices: ["ちぢんだ {空気|くうき}が {押|お}し{返|かえ}す {力|ちから}", "じしゃくの {力|ちから}", "{電気|でんき}の {力|ちから}", "{水|みず}の {重|おも}さ"],
          answer: "ちぢんだ {空気|くうき}が {押|お}し{返|かえ}す {力|ちから}",
        },
      ],
    },
  },

  // ── 2. 金属・水・空気と温度（体積変化）──
  [U.tempVolume]: {
    unitId: U.tempVolume,
    learn: {
      unitId: U.tempVolume,
      steps: [
        {
          heading: "あたためると{体積|たいせき}が{増|ふ}える",
          body: "{金属|きんぞく}・{水|みず}・{空気|くうき}は、あたためると かさ（{体積|たいせき}）が {増|ふ}えるよ。ひやすと もとに もどって {小|ちい}さく なるよ。",
          visual: { kind: "emoji", value: "🔥⬆️ / ❄️⬇️", caption: "あたためると ふくらむ" },
        },
        {
          heading: "ふくらみ{方|かた}の ちがい",
          body: "おなじ あたため{方|かた}でも、ふくらみ{方|かた}は {空気|くうき}が いちばん 大きく、つぎに {水|みず}、{金属|きんぞく}は とても {小|ちい}さいよ。",
          visual: { kind: "emoji", value: "💨>💧>🔩", caption: "{空気|くうき}が いちばん ふくらむ" },
        },
      ],
    },
    test: {
      unitId: U.tempVolume,
      questionCount: 4,
      questions: [
        {
          id: `${U.tempVolume}.q-1`,
          unitId: U.tempVolume,
          prompt: "{空気|くうき}を あたためると {体積|たいせき}は?",
          explanation: "{空気|くうき}は あたためると {体積|たいせき}が {増|ふ}えて ふくらむよ。",
          format: "choice",
          choices: ["{増|ふ}える", "{減|へ}る", "かわらない", "こおる"],
          answer: "{増|ふ}える",
        },
        {
          id: `${U.tempVolume}.q-2`,
          unitId: U.tempVolume,
          prompt: "{金属|きんぞく}の {玉|たま}を あたためると わを?",
          explanation: "{金属|きんぞく}も あたためると すこし {大|おお}きく なるので、わを とおらなく なる ことが あるよ。",
          format: "choice",
          choices: ["とおりにくくなる", "かるくなる", "きえる", "つめたくなる"],
          answer: "とおりにくくなる",
        },
        {
          id: `${U.tempVolume}.q-3`,
          unitId: U.tempVolume,
          prompt: "あたためた ものを ひやすと {体積|たいせき}は?",
          explanation: "ひやすと {体積|たいせき}は もとに もどって {小|ちい}さく なるよ。",
          format: "choice",
          choices: ["{小|ちい}さくなる", "もっと {大|おお}きくなる", "かわらない", "われる"],
          answer: "{小|ちい}さくなる",
        },
        {
          id: `${U.tempVolume}.q-4`,
          unitId: U.tempVolume,
          prompt: "あたためた ときの ふくらみ{方|かた}が いちばん {大|おお}きいのは?",
          explanation: "ふくらみ{方|かた}は {空気|くうき}が いちばん 大きく、つぎに {水|みず}、{金属|きんぞく}は とても {小|ちい}さいよ。",
          format: "choice",
          choices: ["{空気|くうき}", "{水|みず}", "{金属|きんぞく}", "ぜんぶ おなじ"],
          answer: "{空気|くうき}",
        },
      ],
    },
  },

  // ── 3. もののあたたまり方 ──
  [U.warming]: {
    unitId: U.warming,
    learn: {
      unitId: U.warming,
      steps: [
        {
          heading: "{金属|きんぞく}の あたたまり{方|かた}",
          body: "{金属|きんぞく}は {熱|ねっ}した ところから {順|じゅん}に、{近|ちか}い ところから {遠|とお}い ところへ つたわって あたたまるよ。",
          visual: { kind: "emoji", value: "🔥🥄➡️", caption: "{近|ちか}い ところから {順|じゅん}に" },
        },
        {
          heading: "{水|みず}と{空気|くうき}の あたたまり{方|かた}",
          body: "{水|みず}や {空気|くうき}は、あたたまった ものが {上|うえ}へ {動|うご}き、つめたい ものが {下|した}へ きて、{全体|ぜんたい}が まわって あたたまるよ。",
          visual: { kind: "emoji", value: "🔥🍲🔁", caption: "あたたかい ものが {上|うえ}へ" },
        },
      ],
    },
    test: {
      unitId: U.warming,
      questionCount: 4,
      questions: [
        {
          id: `${U.warming}.q-1`,
          unitId: U.warming,
          prompt: "{金属|きんぞく}の ぼうは どこから あたたまる?",
          explanation: "{金属|きんぞく}は {熱|ねっ}した ところに {近|ちか}い ところから {順|じゅん}に あたたまるよ。",
          format: "choice",
          choices: ["{熱|ねっ}した ところから {順|じゅん}に", "とおい ところから", "ぜんぶ {同時|どうじ}に", "あたたまらない"],
          answer: "{熱|ねっ}した ところから {順|じゅん}に",
        },
        {
          id: `${U.warming}.q-2`,
          unitId: U.warming,
          prompt: "{水|みず}を {下|した}から {熱|ねっ}すると、あたたかい {水|みず}は?",
          explanation: "あたたかい {水|みず}は かるくなって {上|うえ}へ {動|うご}くよ。つめたい {水|みず}が {下|した}へ きて まわるよ。",
          format: "choice",
          choices: ["{上|うえ}へ {動|うご}く", "{下|した}に たまる", "うごかない", "こおる"],
          answer: "{上|うえ}へ {動|うご}く",
        },
        {
          id: `${U.warming}.q-3`,
          unitId: U.warming,
          prompt: "{空気|くうき}の あたたまり{方|かた}は {水|みず}と?",
          explanation: "{空気|くうき}も {水|みず}と {同|おな}じで、あたたまった ものが {上|うえ}へ {動|うご}いて まわって あたたまるよ。",
          format: "choice",
          choices: ["{同|おな}じ", "ぜんぜん ちがう", "あたたまらない", "{下|した}へ いく"],
          answer: "{同|おな}じ",
        },
        {
          id: `${U.warming}.q-4`,
          unitId: U.warming,
          prompt: "へやで あたたかい {空気|くうき}が たまりやすいのは?",
          explanation: "あたたかい {空気|くうき}は {上|うえ}へ {動|うご}くので、へやの {天井|てんじょう}{近|ちか}くが あたたかく なりやすいよ。",
          format: "choice",
          choices: ["{天井|てんじょう}の {近|ちか}く", "ゆかの {近|ちか}く", "どこも {同|おな}じ", "そとだけ"],
          answer: "{天井|てんじょう}の {近|ちか}く",
        },
      ],
    },
  },

  // ── 4. 水のすがたと変化 ──
  [U.matterStates]: {
    unitId: U.matterStates,
    learn: {
      unitId: U.matterStates,
      steps: [
        {
          heading: "{水|みず}は 3つの すがた",
          body: "{水|みず}は つめたいと {氷|こおり}（こたい）、ふつうは {水|みず}（えきたい）、あたためると {水蒸気|すいじょうき}（きたい）に すがたを {変|か}えるよ。",
          visual: { kind: "emoji", value: "🧊💧💨", caption: "{氷|こおり}・{水|みず}・{水蒸気|すいじょうき}" },
        },
        {
          heading: "0{度|ど}と 100{度|ど}",
          body: "{水|みず}は 0{度|ど}で こおり、100{度|ど}で さかんに わきたつ（{沸騰|ふっとう}）よ。{沸騰|ふっとう}すると {水蒸気|すいじょうき}に なって {出|で}ていくよ。",
          visual: { kind: "emoji", value: "🌡️🔥🫧", caption: "100{度|ど}で {沸騰|ふっとう}" },
        },
        {
          heading: "{蒸発|じょうはつ}と{結露|けつろ}",
          body: "{水|みず}は あたためなくても すこしずつ {水蒸気|すいじょうき}に なる（{蒸発|じょうはつ}）よ。ひえた まどに {水蒸気|すいじょうき}が もどると {水|みず}つぶ（{結露|けつろ}）に なるよ。",
          visual: { kind: "emoji", value: "🪟💧", caption: "まどの {結露|けつろ}" },
        },
      ],
    },
    test: {
      unitId: U.matterStates,
      questionCount: 5,
      questions: [
        {
          id: `${U.matterStates}.q-1`,
          unitId: U.matterStates,
          prompt: "{水|みず}は {何度|なんど}で こおる?",
          explanation: "{水|みず}は 0{度|ど}で こおって {氷|こおり}に なるよ。",
          format: "choice",
          choices: ["0{度|ど}", "100{度|ど}", "10{度|ど}", "50{度|ど}"],
          answer: "0{度|ど}",
        },
        {
          id: `${U.matterStates}.q-2`,
          unitId: U.matterStates,
          prompt: "{水|みず}が さかんに わきたつ（{沸騰|ふっとう}）のは {何度|なんど}?",
          explanation: "{水|みず}は 100{度|ど}で {沸騰|ふっとう}して さかんに {水蒸気|すいじょうき}に なるよ。",
          format: "choice",
          choices: ["100{度|ど}", "0{度|ど}", "60{度|ど}", "200{度|ど}"],
          answer: "100{度|ど}",
        },
        {
          id: `${U.matterStates}.q-3`,
          unitId: U.matterStates,
          prompt: "やかんの {口|くち}から {出|で}る {白|しろ}い ものの しょうたいに{近|ちか}いのは?",
          explanation: "{白|しろ}く {見|み}える {湯気|ゆげ}は、{水蒸気|すいじょうき}が ひえて できた {小|ちい}さな {水|みず}つぶだよ。",
          format: "choice",
          choices: ["{小|ちい}さな {水|みず}つぶ", "けむり", "{空気|くうき}だけ", "{氷|こおり}"],
          answer: "{小|ちい}さな {水|みず}つぶ",
        },
        {
          id: `${U.matterStates}.q-4`,
          unitId: U.matterStates,
          prompt: "{水|みず}が あたためなくても {水蒸気|すいじょうき}に なる ことを なんという?",
          explanation: "{水|みず}が じょじょに {水蒸気|すいじょうき}に なる ことを {蒸発|じょうはつ}と いうよ。せんたく{物|もの}が かわくのも これだよ。",
          format: "choice",
          choices: ["{蒸発|じょうはつ}", "{結露|けつろ}", "{沸騰|ふっとう}", "こおる"],
          answer: "{蒸発|じょうはつ}",
        },
        {
          id: `${U.matterStates}.q-5`,
          unitId: U.matterStates,
          prompt: "ひえた まどに {水|みず}つぶが つくのを なんという?",
          explanation: "{空気|くうき}{中|ちゅう}の {水蒸気|すいじょうき}が ひえて {水|みず}つぶに もどる ことを {結露|けつろ}と いうよ。",
          format: "choice",
          choices: ["{結露|けつろ}", "{蒸発|じょうはつ}", "{沸騰|ふっとう}", "{氷|こおり}"],
          answer: "{結露|けつろ}",
        },
      ],
    },
  },

  // ── 5. 電気のはたらき（直列・並列）──
  [U.electricCurrent]: {
    unitId: U.electricCurrent,
    learn: {
      unitId: U.electricCurrent,
      steps: [
        {
          heading: "{直列|ちょくれつ}つなぎ",
          body: "{乾電池|かんでんち}を {一列|いちれつ}に つなぐ ことを {直列|ちょくれつ}つなぎと いうよ。{電流|でんりゅう}が {大|おお}きく なり、{豆電球|まめでんきゅう}は より {明|あか}るく なるよ。",
          visual: { kind: "emoji", value: "🔋🔋➡️💡", caption: "{直列|ちょくれつ}は {明|あか}るい" },
        },
        {
          heading: "{並列|へいれつ}つなぎ",
          body: "{乾電池|かんでんち}を よこに ならべて つなぐ ことを {並列|へいれつ}つなぎと いうよ。{明|あか}るさは {電池|でんち}1つの ときと あまり かわらないが、{長|なが}く つかえるよ。",
          visual: { kind: "emoji", value: "🔋⏸️🔋💡", caption: "{並列|へいれつ}は {長|なが}もち" },
        },
        {
          heading: "{光電池|こうでんち}",
          body: "{光電池|こうでんち}（ソーラー）は {光|ひかり}が {当|あ}たると {電気|でんき}を つくるよ。{光|ひかり}が {強|つよ}いほど {電流|でんりゅう}は {大|おお}きく なるよ。",
          visual: { kind: "emoji", value: "☀️🔆⚡", caption: "{光|ひかり}で {電気|でんき}" },
        },
      ],
    },
    test: {
      unitId: U.electricCurrent,
      questionCount: 5,
      questions: [
        {
          id: `${U.electricCurrent}.q-1`,
          unitId: U.electricCurrent,
          prompt: "{乾電池|かんでんち}2つを {直列|ちょくれつ}に つなぐと {豆電球|まめでんきゅう}は?",
          explanation: "{直列|ちょくれつ}つなぎは {電流|でんりゅう}が {大|おお}きく なるので、{電池|でんち}1つより {明|あか}るく なるよ。",
          format: "choice",
          choices: ["より {明|あか}るくなる", "くらくなる", "つかない", "かわらない"],
          answer: "より {明|あか}るくなる",
        },
        {
          id: `${U.electricCurrent}.q-2`,
          unitId: U.electricCurrent,
          prompt: "{乾電池|かんでんち}を {一列|いちれつ}に つなぐ つなぎ{方|かた}を なんという?",
          explanation: "{電池|でんち}を {一列|いちれつ}に つなぐ つなぎ{方|かた}を {直列|ちょくれつ}つなぎと いうよ。",
          format: "choice",
          choices: ["{直列|ちょくれつ}つなぎ", "{並列|へいれつ}つなぎ", "わつなぎ", "ばらつなぎ"],
          answer: "{直列|ちょくれつ}つなぎ",
        },
        {
          id: `${U.electricCurrent}.q-3`,
          unitId: U.electricCurrent,
          prompt: "{並列|へいれつ}つなぎの よい ところは?",
          explanation: "{並列|へいれつ}つなぎは {明|あか}るさは あまり かわらないが、{電池|でんち}が {長|なが}く もつよ。",
          format: "choice",
          choices: ["{長|なが}く つかえる", "とても {明|あか}るい", "{電気|でんき}が {消|き}える", "{重|おも}くなる"],
          answer: "{長|なが}く つかえる",
        },
        {
          id: `${U.electricCurrent}.q-4`,
          unitId: U.electricCurrent,
          prompt: "{光電池|こうでんち}は {何|なに}が {当|あ}たると {電気|でんき}を つくる?",
          explanation: "{光電池|こうでんち}は {光|ひかり}が {当|あ}たると {電気|でんき}を つくるよ。",
          format: "choice",
          choices: ["{光|ひかり}", "{音|おと}", "{水|みず}", "じしゃく"],
          answer: "{光|ひかり}",
        },
        {
          id: `${U.electricCurrent}.q-5`,
          unitId: U.electricCurrent,
          prompt: "{光電池|こうでんち}に {当|あ}たる {光|ひかり}を {強|つよ}くすると {電流|でんりゅう}は?",
          explanation: "{光|ひかり}が {強|つよ}いほど {光電池|こうでんち}が つくる {電流|でんりゅう}は {大|おお}きく なるよ。",
          format: "choice",
          choices: ["{大|おお}きくなる", "{小|ちい}さくなる", "0に なる", "かわらない"],
          answer: "{大|おお}きくなる",
        },
      ],
    },
  },

  // ── 6. 人の体のつくりと運動 ──
  [U.bodyMovement]: {
    unitId: U.bodyMovement,
    learn: {
      unitId: U.bodyMovement,
      steps: [
        {
          heading: "{骨|ほね}と{関節|かんせつ}",
          body: "{体|からだ}を ささえる かたい ものが {骨|ほね}、{骨|ほね}と {骨|ほね}の つなぎ目で {曲|ま}がる ところが {関節|かんせつ}だよ。",
          visual: { kind: "emoji", value: "🦴🦿", caption: "{骨|ほね}と {関節|かんせつ}" },
        },
        {
          heading: "{筋肉|きんにく}で{動|うご}かす",
          body: "{骨|ほね}の まわりの {筋肉|きんにく}が ちぢんだり ゆるんだり する ことで、{関節|かんせつ}が {曲|ま}がって {体|からだ}が {動|うご}くよ。",
          visual: { kind: "emoji", value: "💪", caption: "{筋肉|きんにく}が ちぢむ" },
        },
      ],
    },
    test: {
      unitId: U.bodyMovement,
      questionCount: 4,
      questions: [
        {
          id: `${U.bodyMovement}.q-1`,
          unitId: U.bodyMovement,
          prompt: "{体|からだ}の {中|なか}で うでが {曲|ま}がる つなぎ目を なんという?",
          explanation: "{骨|ほね}と {骨|ほね}の つなぎ目で {曲|ま}がる ところを {関節|かんせつ}と いうよ。",
          format: "choice",
          choices: ["{関節|かんせつ}", "{筋肉|きんにく}", "{皮|かわ}", "{血|ち}"],
          answer: "{関節|かんせつ}",
        },
        {
          id: `${U.bodyMovement}.q-2`,
          unitId: U.bodyMovement,
          prompt: "{体|からだ}を ささえる かたい ものは?",
          explanation: "{体|からだ}を ささえ、{形|かたち}を つくる かたい ものが {骨|ほね}だよ。",
          format: "choice",
          choices: ["{骨|ほね}", "{筋肉|きんにく}", "{空気|くうき}", "{水|みず}"],
          answer: "{骨|ほね}",
        },
        {
          id: `${U.bodyMovement}.q-3`,
          unitId: U.bodyMovement,
          prompt: "うでを {曲|ま}げる とき {筋肉|きんにく}は どうなる?",
          explanation: "うでを {曲|ま}げる がわの {筋肉|きんにく}が ちぢむ ことで {関節|かんせつ}が {曲|ま}がるよ。",
          format: "choice",
          choices: ["ちぢむ", "きえる", "こおる", "{長|なが}く なる だけ"],
          answer: "ちぢむ",
        },
        {
          id: `${U.bodyMovement}.q-4`,
          unitId: U.bodyMovement,
          prompt: "{体|からだ}を {動|うご}かすのは {骨|ほね}・{関節|かんせつ}と {何|なに}の はたらき?",
          explanation: "{骨|ほね}・{関節|かんせつ}・{筋肉|きんにく}が いっしょに はたらいて {体|からだ}を {動|うご}かすよ。",
          format: "choice",
          choices: ["{筋肉|きんにく}", "{毛|け}", "つめ", "なみだ"],
          answer: "{筋肉|きんにく}",
        },
      ],
    },
  },

  // ── 7. 季節と生き物 ──
  [U.seasonLife]: {
    unitId: U.seasonLife,
    learn: {
      unitId: U.seasonLife,
      steps: [
        {
          heading: "{季節|きせつ}で かわる ようす",
          body: "{気温|きおん}が {高|たか}い {夏|なつ}は {生|い}き{物|もの}の {活動|かつどう}が さかんで、{気温|きおん}が {低|ひく}い {冬|ふゆ}は しずかに なるよ。",
          visual: { kind: "emoji", value: "🌸☀️🍁⛄", caption: "{春|はる}{夏|なつ}{秋|あき}{冬|ふゆ}" },
        },
        {
          heading: "{植物|しょくぶつ}と{動物|どうぶつ}",
          body: "サクラは {春|はる}に {花|はな}を さかせ、ツバメは あたたかい {季節|きせつ}に やってくるよ。{気温|きおん}と {生|い}き{物|もの}の ようすは つながって いるよ。",
          visual: { kind: "emoji", value: "🌸🐦", caption: "サクラと ツバメ" },
        },
      ],
    },
    test: {
      unitId: U.seasonLife,
      questionCount: 4,
      questions: [
        {
          id: `${U.seasonLife}.q-1`,
          unitId: U.seasonLife,
          prompt: "{気温|きおん}が {高|たか}い {夏|なつ}、{生|い}き{物|もの}の {活動|かつどう}は?",
          explanation: "あたたかい {夏|なつ}は {生|い}き{物|もの}の {活動|かつどう}が さかんに なるよ。",
          format: "choice",
          choices: ["さかんに なる", "とまる", "かわらない", "へる だけ"],
          answer: "さかんに なる",
        },
        {
          id: `${U.seasonLife}.q-2`,
          unitId: U.seasonLife,
          prompt: "{気温|きおん}が {低|ひく}い {冬|ふゆ}、{多|おお}くの {生|い}き{物|もの}は?",
          explanation: "{冬|ふゆ}は {気温|きおん}が {下|さ}がり、{活動|かつどう}が にぶく なる {生|い}き{物|もの}が {多|おお}いよ。",
          format: "choice",
          choices: ["{活動|かつどう}が にぶくなる", "もっと {元気|げんき}に なる", "{大|おお}きく なる", "ふえる"],
          answer: "{活動|かつどう}が にぶくなる",
        },
        {
          id: `${U.seasonLife}.q-3`,
          unitId: U.seasonLife,
          prompt: "サクラが {花|はな}を さかせる {季節|きせつ}は?",
          explanation: "サクラは あたたかく なる {春|はる}に {花|はな}を さかせるよ。",
          format: "choice",
          choices: ["{春|はる}", "{夏|なつ}", "{秋|あき}", "{冬|ふゆ}"],
          answer: "{春|はる}",
        },
        {
          id: `${U.seasonLife}.q-4`,
          unitId: U.seasonLife,
          prompt: "{季節|きせつ}が かわると {生|い}き{物|もの}の ようすが かわるのは {何|なに}と かんけいが {深|ふか}い?",
          explanation: "{季節|きせつ}による {気温|きおん}の {変化|へんか}と、{生|い}き{物|もの}の ようすは {深|ふか}く つながって いるよ。",
          format: "choice",
          choices: ["{気温|きおん}", "{音|おと}", "いろ", "おもさ"],
          answer: "{気温|きおん}",
        },
      ],
    },
  },

  // ── 8. 月と星 ──
  [U.moonStar]: {
    unitId: U.moonStar,
    learn: {
      unitId: U.moonStar,
      steps: [
        {
          heading: "{月|つき}の うごき",
          body: "{月|つき}も {太陽|たいよう}と {同|おな}じように、{東|ひがし}の{方|ほう}から {出|で}て {南|みなみ}の {空|そら}を とおり {西|にし}へ うごくよ。{形|かたち}は {日|ひ}に よって かわるよ。",
          visual: { kind: "emoji", value: "🌒🌕🌖", caption: "{月|つき}の {形|かたち}は かわる" },
        },
        {
          heading: "{星|ほし}の {明|あか}るさと{色|いろ}",
          body: "{星|ほし}には {明|あか}るい ものや くらい もの、{赤|あか}っぽい ものや {青|あお}白い ものが あるよ。{明|あか}るさや {色|いろ}は {星|ほし}に よって ちがうよ。",
          visual: { kind: "emoji", value: "⭐✨🌟", caption: "{明|あか}るさ・{色|いろ}は さまざま" },
        },
        {
          heading: "{星|ほし}の ならびは かわらない",
          body: "{時間|じかん}が たつと {星|ほし}の {位置|いち}は うごくけれど、{星|ほし}どうしの ならび{方|かた}（{星座|せいざ}の {形|かたち}）は かわらないよ。",
          visual: { kind: "emoji", value: "🌌", caption: "{星座|せいざ}の {形|かたち}は そのまま" },
        },
      ],
    },
    test: {
      unitId: U.moonStar,
      questionCount: 5,
      questions: [
        {
          id: `${U.moonStar}.q-1`,
          unitId: U.moonStar,
          prompt: "{月|つき}は {空|そら}を どの{方|ほう}へ うごく?",
          explanation: "{月|つき}も {太陽|たいよう}と {同|おな}じく、{東|ひがし}から {南|みなみ}を とおって {西|にし}へ うごくよ。",
          format: "choice",
          choices: ["{東|ひがし}から {西|にし}へ", "{西|にし}から {東|ひがし}へ", "{北|きた}から {南|みなみ}へ", "うごかない"],
          answer: "{東|ひがし}から {西|にし}へ",
        },
        {
          id: `${U.moonStar}.q-2`,
          unitId: U.moonStar,
          prompt: "{月|つき}の {形|かたち}は?",
          explanation: "{月|つき}の {形|かたち}は {三日月|みかづき}や {満月|まんげつ}など、{日|ひ}に よって かわって {見|み}えるよ。",
          format: "choice",
          choices: ["{日|ひ}に よって かわる", "いつも まんまる", "いつも {三日月|みかづき}", "{四角|しかく}い"],
          answer: "{日|ひ}に よって かわる",
        },
        {
          id: `${U.moonStar}.q-3`,
          unitId: U.moonStar,
          prompt: "{星|ほし}の {明|あか}るさや {色|いろ}は?",
          explanation: "{星|ほし}に よって {明|あか}るさも {色|いろ}も ちがうよ。{赤|あか}っぽい {星|ほし}や {青|あお}白い {星|ほし}が あるよ。",
          format: "choice",
          choices: ["{星|ほし}に よって ちがう", "ぜんぶ {同|おな}じ", "ぜんぶ {赤|あか}い", "ぜんぶ {白|しろ}い"],
          answer: "{星|ほし}に よって ちがう",
        },
        {
          id: `${U.moonStar}.q-4`,
          unitId: U.moonStar,
          prompt: "{時間|じかん}が たつと {星座|せいざ}の {形|かたち}（ならび）は?",
          explanation: "{星|ほし}の {位置|いち}は うごくけれど、{星|ほし}どうしの ならび{方|かた}（{星座|せいざ}の {形|かたち}）は かわらないよ。",
          format: "choice",
          choices: ["かわらない", "ばらばらに なる", "{消|き}える", "{大|おお}きくなる"],
          answer: "かわらない",
        },
        {
          id: `${U.moonStar}.q-5`,
          unitId: U.moonStar,
          prompt: "{時間|じかん}が たつと {星|ほし}の {位置|いち}（{見|み}える ところ）は?",
          explanation: "{星|ほし}ぜんたいは {時間|じかん}とともに {東|ひがし}から {西|にし}へ {動|うご}いて {見|み}えるよ。",
          format: "choice",
          choices: ["うごいて {見|み}える", "ずっと {同|おな}じ", "{消|き}える", "ふえる"],
          answer: "うごいて {見|み}える",
        },
      ],
    },
  },

  // ── 9. 雨水のゆくえと地面 ──
  [U.rainGround]: {
    unitId: U.rainGround,
    learn: {
      unitId: U.rainGround,
      steps: [
        {
          heading: "{雨水|あまみず}は{低|ひく}い{方|ほう}へ",
          body: "{雨水|あまみず}は {高|たか}い ところから {低|ひく}い ところへ {流|なが}れて いくよ。だから {地面|じめん}の かたむきで {流|なが}れる むきが きまるよ。",
          visual: { kind: "emoji", value: "🌧️⛰️➡️", caption: "{高|たか}い→{低|ひく}い" },
        },
        {
          heading: "{土|つち}に しみこむ",
          body: "{雨水|あまみず}は {土|つち}に しみこむよ。すなの ように {粒|つぶ}が {大|おお}きい ところほど {水|みず}は はやく しみこむよ。",
          visual: { kind: "emoji", value: "💧🟫", caption: "{土|つち}に しみこむ" },
        },
      ],
    },
    test: {
      unitId: U.rainGround,
      questionCount: 4,
      questions: [
        {
          id: `${U.rainGround}.q-1`,
          unitId: U.rainGround,
          prompt: "{雨水|あまみず}は どの{方|ほう}へ {流|なが}れる?",
          explanation: "{雨水|あまみず}は {高|たか}い ところから {低|ひく}い ところへ {流|なが}れるよ。",
          format: "choice",
          choices: ["{高|たか}い ところから {低|ひく}い ところへ", "{低|ひく}い ところから {高|たか}い ところへ", "{上|うえ}へ のぼる", "{流|なが}れない"],
          answer: "{高|たか}い ところから {低|ひく}い ところへ",
        },
        {
          id: `${U.rainGround}.q-2`,
          unitId: U.rainGround,
          prompt: "{水|みず}たまりが できやすいのは どんな ところ?",
          explanation: "まわりより {低|ひく}くて {水|みず}が {集|あつ}まる ところに {水|みず}たまりが できやすいよ。",
          format: "choice",
          choices: ["まわりより {低|ひく}い ところ", "いちばん {高|たか}い ところ", "ななめの さか", "かぜの {強|つよ}い ところ"],
          answer: "まわりより {低|ひく}い ところ",
        },
        {
          id: `${U.rainGround}.q-3`,
          unitId: U.rainGround,
          prompt: "{水|みず}が はやく しみこむのは {粒|つぶ}が どんな {土|つち}?",
          explanation: "すなの ように {粒|つぶ}が {大|おお}きい {土|つち}ほど {水|みず}が はやく しみこむよ。",
          format: "choice",
          choices: ["{粒|つぶ}が {大|おお}きい {土|つち}", "{粒|つぶ}が {細|こま}かい {土|つち}", "かたい いし", "こおった {土|つち}"],
          answer: "{粒|つぶ}が {大|おお}きい {土|つち}",
        },
        {
          id: `${U.rainGround}.q-4`,
          unitId: U.rainGround,
          prompt: "{雨水|あまみず}の {流|なが}れる むきを きめるのは?",
          explanation: "{地面|じめん}の かたむき（{高|たか}い・{低|ひく}い）で {雨水|あまみず}の {流|なが}れる むきが きまるよ。",
          format: "choice",
          choices: ["{地面|じめん}の かたむき", "かぜの {色|いろ}", "{星|ほし}の {数|かず}", "{音|おと}の {大|おお}きさ"],
          answer: "{地面|じめん}の かたむき",
        },
      ],
    },
  },

  // ── 10. 天気と気温 ──
  [U.weather]: {
    unitId: U.weather,
    learn: {
      unitId: U.weather,
      steps: [
        {
          heading: "{1日|いちにち}の{気温|きおん}の{変化|へんか}",
          body: "{気温|きおん}は あさ {低|ひく}く、ひるすぎに いちばん {高|たか}く なり、ゆうがたに また {下|さ}がるよ。{温度計|おんどけい}で はかって くらべよう。",
          visual: { kind: "emoji", value: "🌡️🌅🌞🌇", caption: "ひるすぎが いちばん {高|たか}い" },
        },
        {
          heading: "{天気|てんき}と{気温|きおん}",
          body: "{晴|は}れの{日|ひ}は {気温|きおん}の {上|あ}がり{下|さ}がりが {大|おお}きく、くもりや {雨|あめ}の{日|ひ}は {変化|へんか}が {小|ちい}さいよ。",
          visual: { kind: "emoji", value: "☀️↕️ / ☁️➖", caption: "{晴|は}れは {変化|へんか}が {大|おお}きい" },
        },
      ],
    },
    test: {
      unitId: U.weather,
      questionCount: 4,
      questions: [
        {
          id: `${U.weather}.q-1`,
          unitId: U.weather,
          prompt: "{晴|は}れの{日|ひ}、{気温|きおん}が いちばん {高|たか}く なるのは いつごろ?",
          explanation: "{気温|きおん}は ひるすぎ（{午後|ごご}1〜2{時|じ}ごろ）に いちばん {高|たか}く なる ことが {多|おお}いよ。",
          format: "choice",
          choices: ["ひるすぎ", "あさ {早|はや}く", "{真夜中|まよなか}", "ゆうがた"],
          answer: "ひるすぎ",
        },
        {
          id: `${U.weather}.q-2`,
          unitId: U.weather,
          prompt: "{気温|きおん}を はかる どうぐは?",
          explanation: "{気温|きおん}は {温度計|おんどけい}で はかるよ。{日光|にっこう}が {直接|ちょくせつ} {当|あ}たらない ところで はかるよ。",
          format: "choice",
          choices: ["{温度計|おんどけい}", "ものさし", "はかり", "とけい"],
          answer: "{温度計|おんどけい}",
        },
        {
          id: `${U.weather}.q-3`,
          unitId: U.weather,
          prompt: "{1日|いちにち}の {気温|きおん}の {変化|へんか}が {大|おお}きいのは どんな{天気|てんき}の{日|ひ}?",
          explanation: "{晴|は}れの{日|ひ}は {気温|きおん}の {上|あ}がり{下|さ}がりが {大|おお}きいよ。くもり・{雨|あめ}の{日|ひ}は {小|ちい}さいよ。",
          format: "choice",
          choices: ["{晴|は}れの{日|ひ}", "くもりの{日|ひ}", "{雨|あめ}の{日|ひ}", "ゆきの{日|ひ}"],
          answer: "{晴|は}れの{日|ひ}",
        },
        {
          id: `${U.weather}.q-4`,
          unitId: U.weather,
          prompt: "{気温|きおん}を はかる ときに ただしいのは?",
          explanation: "{気温|きおん}は {日光|にっこう}が {直接|ちょくせつ} {当|あ}たらない、{風|かぜ}とおしの よい ところで はかるよ。",
          format: "choice",
          choices: ["{日光|にっこう}が {当|あ}たらない ところで はかる", "{温度計|おんどけい}を {太陽|たいよう}に むける", "{手|て}で にぎって はかる", "{水|みず}の {中|なか}で はかる"],
          answer: "{日光|にっこう}が {当|あ}たらない ところで はかる",
        },
      ],
    },
  },
};
