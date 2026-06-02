// ══════════════════════════════════════════
// カリキュラム: 社会（しゃかい）小4
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
//
// 【申し送り】SubjectId は drill.ts に既に "shakai" を含むため as 等の局所吸収は不要だった
//   （指示は「未対応でも型を通す」前提だったが、実体は対応済み）。ThemeName も既存の
//   "amber"（未使用色）を採用し型を満たす。新規 ThemeName/ SVG name の追加は一切していない。
// 既存 generators は社会に非対応 → 全単元 固定 questions[]（全問 explanation 必須）。
// 学習指導要領 小4社会（都道府県と県の様子 / 飲み水・電気・ガス / ごみとくらし /
//   自然災害から守る / きょう土の伝統文化と先人 / 県内の特色ある地域）を網羅。
// 表示テキストは全てルビ記法 {漢字|よみ}（全漢字ルビ）で執筆。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type { Subject, Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const shakaiSubject: Subject = {
  id: "shakai",
  name: "しゃかい",
  formalName: "社会",
  emoji: "🌏",
  theme: "amber",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域（社会の大分類。shakai.g3 と整合する4領域命名） ──
//   shakai.geography / shakai.public-life / shakai.disaster / shakai.history-culture

export const shakaiG4Domains: Domain[] = [
  {
    id: "shakai.geography",
    subjectId: "shakai",
    name: "ちりとけんのようす",
    formalName: "地理（都道府県と県の様子）",
  },
  {
    id: "shakai.public-life",
    subjectId: "shakai",
    name: "くらしとこうきょう",
    formalName: "住みよいくらし（飲み水・電気・ガス・ごみ）",
  },
  {
    id: "shakai.disaster",
    subjectId: "shakai",
    name: "ぼうさい",
    formalName: "防災（自然災害から人々を守る）",
  },
  {
    id: "shakai.history-culture",
    subjectId: "shakai",
    name: "れきしとぶんか",
    formalName: "歴史と文化（伝統文化と先人のはたらき）",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo）。小3社会（身近な地域・くらしを守る等）を前提にし、
// 小5社会（国土・産業・情報）へつなぐ。前提/後続は他学年の id を指してよい（ロードマップ依存グラフ）。
//
//   prefectures ─▶ our-prefecture ─▶ special-regions
//   water-supply ─▶ electricity-gas ─▶ garbage
//   tradition-culture ─▶ pioneers / special-regions
//
const U = {
  prefectures: "shakai.g4.prefectures-of-japan",
  ourPrefecture: "shakai.g4.our-prefecture",
  waterSupply: "shakai.g4.water-supply",
  electricityGas: "shakai.g4.electricity-gas",
  garbage: "shakai.g4.garbage",
  disaster: "shakai.g4.disaster-prevention",
  tradition: "shakai.g4.tradition-culture",
  pioneers: "shakai.g4.pioneers",
  specialRegions: "shakai.g4.special-regions",
} as const;

// 前提となる小3社会の単元（将来 shakai/g3.ts が定義する想定の id。バリデータが最終解決を検査）
const G3 = {
  townSurvey: "shakai.g3.town-survey", // 身近な地域・市の様子
  productionSales: "shakai.g3.production-sales", // 生産・販売の仕事
  safetyKeeping: "shakai.g3.safety-keeping", // くらしを守る（消防・警察）
  cityChanges: "shakai.g3.city-changes", // 市の移り変わり
} as const;

// 後続となる小5社会の単元（将来 shakai/g5.ts が定義する想定の id）
const G5 = {
  landEnvironment: "shakai.g5.land-environment", // 国土の様子・自然環境
  foodProduction: "shakai.g5.food-production", // 食料生産
  industry: "shakai.g5.industry", // 工業生産
  information: "shakai.g5.information", // 情報化した社会
} as const;

export const shakaiG4Units: Unit[] = [
  {
    id: U.prefectures,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.geography",
    title: "47とどうふけん",
    order: 1,
    realWorldUse:
      "りょこうの ゆきさきや、てんきよほうで きく ちめいが どこに あるかを しるときに つかうよ。",
    leadsTo: [U.ourPrefecture, G5.landEnvironment],
    prerequisites: [G3.townSurvey],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.ourPrefecture,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.geography",
    title: "わたしたちのけんのようす",
    order: 2,
    realWorldUse:
      "じぶんの すむ けんの やまや かわ、まちの ようすを しって、すみよい くらしを かんがえるときに つかうよ。",
    leadsTo: [U.specialRegions, G5.landEnvironment],
    prerequisites: [U.prefectures, G3.townSurvey],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.waterSupply,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.public-life",
    title: "のみみずをささえる",
    order: 3,
    realWorldUse:
      "じゃぐちを ひねると きれいな みずが でる しくみを しって、みずを たいせつに つかうときに やくだつよ。",
    leadsTo: [U.electricityGas, U.garbage],
    prerequisites: [G3.townSurvey],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.electricityGas,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.public-life",
    title: "でんきとガスをささえる",
    order: 4,
    realWorldUse:
      "へやの あかりや りょうりの ひが どこから くるかを しって、エネルギーを せつやくするときに やくだつよ。",
    leadsTo: [U.garbage, G5.industry],
    prerequisites: [U.waterSupply],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.garbage,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.public-life",
    title: "ごみとくらし",
    order: 5,
    realWorldUse:
      "ごみの だしかた（ぶんべつ）や リサイクルを しって、きれいな まちと かんきょうを まもるときに つかうよ。",
    leadsTo: [G5.landEnvironment],
    prerequisites: [U.waterSupply],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.disaster,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.disaster",
    title: "しぜんさいがいからまもる",
    order: 6,
    realWorldUse:
      "じしんや たいふうの ときに どこへ にげるかを しって、じぶんと かぞくの いのちを まもるときに つかうよ。",
    leadsTo: [G5.landEnvironment],
    prerequisites: [U.ourPrefecture, G3.safetyKeeping],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.tradition,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.history-culture",
    title: "きょうどのでんとうとぶんか",
    order: 7,
    realWorldUse:
      "じぶんの まちの おまつりや ふるい たてものの いみを しって、ちいきを たいせつに おもうときに やくだつよ。",
    leadsTo: [U.pioneers, U.specialRegions],
    prerequisites: [G3.cityChanges],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.pioneers,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.history-culture",
    title: "せんじんのはたらき",
    order: 8,
    realWorldUse:
      "むかしの ひとが くらしを よくする ために がんばった ことを しって、いまの べんりさに かんしゃするときに つかうよ。",
    leadsTo: [G5.foodProduction],
    prerequisites: [U.tradition, G3.cityChanges],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.specialRegions,
    subjectId: "shakai",
    grade: 4,
    domainId: "shakai.geography",
    title: "とくしょくあるちいき",
    order: 9,
    realWorldUse:
      "でんとうこうげいや かんこうなど、まちの よさを いかす くふうを しって、ちいきおこしを かんがえるときに やくだつよ。",
    leadsTo: [G5.industry, G5.information],
    prerequisites: [U.ourPrefecture, U.tradition],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 社会は知識選択系 → 全単元 固定 questions[]（4択・全問 explanation 必須）。
// visual は emoji 中心（新規 SVG は追加しない / アンチ肥大）。

export const shakaiG4Contents: Record<string, UnitContent> = {
  [U.prefectures]: {
    unitId: U.prefectures,
    learn: {
      unitId: U.prefectures,
      steps: [
        {
          heading: "{日本|にほん}は いくつの けんに わかれている？",
          body: "{日本|にほん}は ぜんぶで 47の {都道府県|とどうふけん}に わかれているよ。1つの {都|と}（{東京都|とうきょうと}）、1つの {道|どう}（{北海道|ほっかいどう}）、2つの {府|ふ}（{大阪府|おおさかふ}・{京都府|きょうとふ}）、のこり 43の {県|けん}が あるんだ。",
          visual: { kind: "emoji", value: "🗾", caption: "{日本|にほん}{列島|れっとう}" },
        },
        {
          heading: "{地方|ちほう}ごとに わけてみよう",
          body: "47の {都道府県|とどうふけん}は、{北海道|ほっかいどう}・{東北|とうほく}・{関東|かんとう}・{中部|ちゅうぶ}・{近畿|きんき}・{中国|ちゅうごく}・{四国|しこく}・{九州|きゅうしゅう}の 8つの {地方|ちほう}に わけられるよ。じぶんの {県|けん}が どの {地方|ちほう}か しらべてみよう。",
          visual: { kind: "emoji", value: "🧭🗾", caption: "8つの {地方|ちほう}" },
        },
      ],
    },
    test: {
      unitId: U.prefectures,
      questions: [
        {
          id: `${U.prefectures}.q-1`,
          unitId: U.prefectures,
          prompt: "{日本|にほん}には {都道府県|とどうふけん}が いくつ ある？",
          explanation: "{日本|にほん}は 1{都|と}・1{道|どう}・2{府|ふ}・43{県|けん}で、あわせて 47だよ。",
          format: "choice",
          choices: ["47", "43", "50", "8"],
          answer: "47",
        },
        {
          id: `${U.prefectures}.q-2`,
          unitId: U.prefectures,
          prompt: "ゆいいつ「{道|どう}」が つく {都道府県|とどうふけん}は どれ？",
          explanation: "「{道|どう}」が つくのは {北海道|ほっかいどう}だけ。いちばん {北|きた}に あって {日本|にほん}で いちばん {広|ひろ}いよ。",
          format: "choice",
          choices: ["{北海道|ほっかいどう}", "{東京都|とうきょうと}", "{大阪府|おおさかふ}", "{沖縄県|おきなわけん}"],
          answer: "{北海道|ほっかいどう}",
        },
        {
          id: `${U.prefectures}.q-3`,
          unitId: U.prefectures,
          prompt: "「{府|ふ}」が つく {都道府県|とどうふけん}は どれと どれ？",
          explanation: "「{府|ふ}」は {大阪府|おおさかふ}と {京都府|きょうとふ}の 2つだけだよ。",
          format: "choice",
          choices: [
            "{大阪府|おおさかふ}と {京都府|きょうとふ}",
            "{東京都|とうきょうと}と {大阪府|おおさかふ}",
            "{京都府|きょうとふ}と {兵庫県|ひょうごけん}",
            "{愛知県|あいちけん}と {大阪府|おおさかふ}",
          ],
          answer: "{大阪府|おおさかふ}と {京都府|きょうとふ}",
        },
        {
          id: `${U.prefectures}.q-4`,
          unitId: U.prefectures,
          prompt: "{日本|にほん}は いくつの {地方|ちほう}に わけられる？",
          explanation: "{北海道|ほっかいどう}・{東北|とうほく}・{関東|かんとう}・{中部|ちゅうぶ}・{近畿|きんき}・{中国|ちゅうごく}・{四国|しこく}・{九州|きゅうしゅう}の 8{地方|ちほう}だよ。",
          format: "choice",
          choices: ["8", "6", "4", "47"],
          answer: "8",
        },
        {
          id: `${U.prefectures}.q-5`,
          unitId: U.prefectures,
          prompt: "{東京|とうきょう}が ある {地方|ちほう}は どれ？",
          explanation: "{東京都|とうきょうと}は {関東|かんとう}{地方|ちほう}に あるよ。",
          format: "choice",
          choices: ["{関東|かんとう}{地方|ちほう}", "{近畿|きんき}{地方|ちほう}", "{東北|とうほく}{地方|ちほう}", "{九州|きゅうしゅう}{地方|ちほう}"],
          answer: "{関東|かんとう}{地方|ちほう}",
        },
        {
          id: `${U.prefectures}.q-6`,
          unitId: U.prefectures,
          prompt: "{土地|とち}の ようすを うえから みて あらわした ものを なんという？",
          explanation: "{土地|とち}の ようすを うえから みて あらわした ものを {地図|ちず}と いうよ。",
          format: "choice",
          choices: ["{地図|ちず}", "{時計|とけい}", "{温度計|おんどけい}", "{辞書|じしょ}"],
          answer: "{地図|ちず}",
        },
      ],
      questionCount: 6,
    },
  },

  [U.ourPrefecture]: {
    unitId: U.ourPrefecture,
    learn: {
      unitId: U.ourPrefecture,
      steps: [
        {
          heading: "{自分|じぶん}の {県|けん}を しらべよう",
          body: "{県|けん}には {山|やま}や {川|かわ}、{海|うみ}、{平地|へいち}などの {地形|ちけい}が あるよ。{人|ひと}が おおく すむ {市|し}や、{田|た}や {畑|はたけ}が ひろがる ところなど、{場所|ばしょ}によって ようすが ちがうんだ。",
          visual: { kind: "emoji", value: "🏞️🏘️", caption: "{県|けん}の {地形|ちけい}" },
        },
        {
          heading: "{交通|こうつう}と {土地|とち}の つかいかた",
          body: "{県|けん}の なかは {鉄道|てつどう}や {道路|どうろ}で つながっているよ。{駅|えき}の まわりには {店|みせ}や {会社|かいしゃ}が あつまり、{海|うみ}や {山|やま}の ちかくでは その {土地|とち}を いかした しごとが おこなわれているよ。",
          visual: { kind: "emoji", value: "🚉🛣️", caption: "{交通|こうつう}と まち" },
        },
      ],
    },
    test: {
      unitId: U.ourPrefecture,
      questions: [
        {
          id: `${U.ourPrefecture}.q-1`,
          unitId: U.ourPrefecture,
          prompt: "{山|やま}・{川|かわ}・{平地|へいち}など {土地|とち}の かたちを なんという？",
          explanation: "{土地|とち}の かたち（{山|やま}・{川|かわ}・{平地|へいち}など）を {地形|ちけい}と いうよ。",
          format: "choice",
          choices: ["{地形|ちけい}", "{気温|きおん}", "{人口|じんこう}", "{時刻|じこく}"],
          answer: "{地形|ちけい}",
        },
        {
          id: `${U.ourPrefecture}.q-2`,
          unitId: U.ourPrefecture,
          prompt: "{人|ひと}が たくさん あつまって すんでいる ところは？",
          explanation: "{駅|えき}や {会社|かいしゃ}が あつまる {市街地|しがいち}には {人|ひと}が おおく すんでいるよ。",
          format: "choice",
          choices: ["{駅|えき}の まわりの {市街地|しがいち}", "{高|たか}い {山|やま}の うえ", "{広|ひろ}い {田|た}んぼ", "{深|ふか}い {海|うみ}の {底|そこ}"],
          answer: "{駅|えき}の まわりの {市街地|しがいち}",
        },
        {
          id: `${U.ourPrefecture}.q-3`,
          unitId: U.ourPrefecture,
          prompt: "{県|けん}の なかで {人|ひと}や ものを はこぶ のりものは？",
          explanation: "{人|ひと}や ものは {鉄道|てつどう}・バス・{自動車|じどうしゃ}などの {交通|こうつう}で {県内|けんない}を いどうするよ。",
          format: "choice",
          choices: ["{鉄道|てつどう}や バス", "ロケット", "{潜水艦|せんすいかん}", "エレベーターだけ"],
          answer: "{鉄道|てつどう}や バス",
        },
        {
          id: `${U.ourPrefecture}.q-4`,
          unitId: U.ourPrefecture,
          prompt: "{海|うみ}の ちかくの {町|まち}で さかんな しごとは？",
          explanation: "{海|うみ}の ちかくでは {魚|さかな}を とる {漁業|ぎょぎょう}が さかんだよ。{土地|とち}を いかした しごとだね。",
          format: "choice",
          choices: ["{漁業|ぎょぎょう}（{魚|さかな}を とる）", "スキー{場|じょう}の しごと", "ビルの {掃除|そうじ}だけ", "{雪|ゆき}かき"],
          answer: "{漁業|ぎょぎょう}（{魚|さかな}を とる）",
        },
        {
          id: `${U.ourPrefecture}.q-5`,
          unitId: U.ourPrefecture,
          prompt: "{田|た}・{畑|はたけ}・{住宅地|じゅうたくち}などを いろで わけた {地図|ちず}を なんという？",
          explanation: "{土地|とち}の つかいかたを いろで わけた {地図|ちず}を {土地利用|とちりよう}{図|ず}と いうよ。",
          format: "choice",
          choices: ["{土地利用|とちりよう}{図|ず}", "{天気|てんき}{図|ず}", "{設計|せっけい}{図|ず}", "{折|お}り{紙|がみ}"],
          answer: "{土地利用|とちりよう}{図|ず}",
        },
      ],
      questionCount: 5,
    },
  },

  [U.waterSupply]: {
    unitId: U.waterSupply,
    learn: {
      unitId: U.waterSupply,
      steps: [
        {
          heading: "のみ{水|みず}は どこから くる？",
          body: "わたしたちが つかう のみ{水|みず}は、{山|やま}に ふった {雨|あめ}が {川|かわ}や ダムに あつまり、{浄水場|じょうすいじょう}で きれいに そうじされてから {水道管|すいどうかん}を とおって {家|いえ}に とどくよ。",
          visual: { kind: "emoji", value: "🌧️➡️🏞️➡️🚰", caption: "{雨|あめ}から じゃぐちまで" },
        },
        {
          heading: "{水|みず}を むだに しない",
          body: "{水|みず}は かぎりある たいせつな しげんだよ。つかった {水|みず}は {下水|げすい}として {処理|しょり}され、また きれいに して {自然|しぜん}に かえすんだ。じゃぐちを こまめに しめて たいせつに つかおう。",
          visual: { kind: "emoji", value: "💧", caption: "{水|みず}は たいせつ" },
        },
      ],
    },
    test: {
      unitId: U.waterSupply,
      questions: [
        {
          id: `${U.waterSupply}.q-1`,
          unitId: U.waterSupply,
          prompt: "のみ{水|みず}を きれいに そうじする しせつは？",
          explanation: "{川|かわ}や ダムの {水|みず}を きれいに する しせつを {浄水場|じょうすいじょう}と いうよ。",
          format: "choice",
          choices: ["{浄水場|じょうすいじょう}", "{発電所|はつでんしょ}", "{消防署|しょうぼうしょ}", "{図書館|としょかん}"],
          answer: "{浄水場|じょうすいじょう}",
        },
        {
          id: `${U.waterSupply}.q-2`,
          unitId: U.waterSupply,
          prompt: "きれいに なった {水|みず}を {家|いえ}まで はこぶ くだは？",
          explanation: "きれいに なった {水|みず}は {水道管|すいどうかん}を とおって {家|いえ}の じゃぐちまで とどくよ。",
          format: "choice",
          choices: ["{水道管|すいどうかん}", "ガス{管|かん}", "{電線|でんせん}", "{線路|せんろ}"],
          answer: "{水道管|すいどうかん}",
        },
        {
          id: `${U.waterSupply}.q-3`,
          unitId: U.waterSupply,
          prompt: "{川|かわ}の {水|みず}を ためて、{水|みず}が たりない ときに そなえる しせつは？",
          explanation: "ダムは {川|かわ}の {水|みず}を ためて、{水|みず}が たりない ときに そなえるよ。",
          format: "choice",
          choices: ["ダム", "トンネル", "{橋|はし}", "{灯台|とうだい}"],
          answer: "ダム",
        },
        {
          id: `${U.waterSupply}.q-4`,
          unitId: U.waterSupply,
          prompt: "つかった あとの よごれた {水|みず}を なんという？",
          explanation: "つかって よごれた {水|みず}は {下水|げすい}と いい、{下水処理場|げすいしょりじょう}で きれいに してから {自然|しぜん}に かえすよ。",
          format: "choice",
          choices: ["{下水|げすい}", "{海水|かいすい}", "{雨水|あまみず}", "{湯|ゆ}"],
          answer: "{下水|げすい}",
        },
        {
          id: `${U.waterSupply}.q-5`,
          unitId: U.waterSupply,
          prompt: "{水|みず}を たいせつに つかう ほうほうは？",
          explanation: "{水|みず}は かぎりある しげん。こまめに じゃぐちを しめて むだづかいを へらそう。",
          format: "choice",
          choices: ["じゃぐちを こまめに しめる", "{水|みず}を ながしっぱなしに する", "のこった {水|みず}を すてる", "ダムを こわす"],
          answer: "じゃぐちを こまめに しめる",
        },
      ],
      questionCount: 5,
    },
  },

  [U.electricityGas]: {
    unitId: U.electricityGas,
    learn: {
      unitId: U.electricityGas,
      steps: [
        {
          heading: "{電気|でんき}は どうやって つくる？",
          body: "{電気|でんき}は {発電所|はつでんしょ}で つくられるよ。{水|みず}の {力|ちから}（{水力|すいりょく}）、{火|ひ}の {力|ちから}（{火力|かりょく}）、{太陽|たいよう}の {光|ひかり}（{太陽光|たいようこう}）など いろいろな つくりかたが あるんだ。",
          visual: { kind: "emoji", value: "⚡🏭", caption: "{発電所|はつでんしょ}" },
        },
        {
          heading: "ガスと エネルギーを たいせつに",
          body: "ガスは {料理|りょうり}や おふろの おゆを わかすのに つかうよ。{電気|でんき}も ガスも かぎりが あるから、つかわない あかりは けすなど {節約|せつやく}が たいせつだよ。",
          visual: { kind: "emoji", value: "🔥💡", caption: "ガスと {電気|でんき}" },
        },
      ],
    },
    test: {
      unitId: U.electricityGas,
      questions: [
        {
          id: `${U.electricityGas}.q-1`,
          unitId: U.electricityGas,
          prompt: "{電気|でんき}を つくる ところは？",
          explanation: "{電気|でんき}は {発電所|はつでんしょ}で つくられ、{電線|でんせん}を とおって {家|いえ}に とどくよ。",
          format: "choice",
          choices: ["{発電所|はつでんしょ}", "{浄水場|じょうすいじょう}", "{駅|えき}", "{学校|がっこう}"],
          answer: "{発電所|はつでんしょ}",
        },
        {
          id: `${U.electricityGas}.q-2`,
          unitId: U.electricityGas,
          prompt: "{太陽|たいよう}の {光|ひかり}で {電気|でんき}を つくる はつでんは？",
          explanation: "{太陽|たいよう}の {光|ひかり}を つかう はつでんを {太陽光|たいようこう}{発電|はつでん}と いうよ。{地球|ちきゅう}に やさしいよ。",
          format: "choice",
          choices: ["{太陽光|たいようこう}{発電|はつでん}", "{火力|かりょく}{発電|はつでん}", "{水力|すいりょく}{発電|はつでん}", "{風力|ふうりょく}{発電|はつでん}"],
          answer: "{太陽光|たいようこう}{発電|はつでん}",
        },
        {
          id: `${U.electricityGas}.q-3`,
          unitId: U.electricityGas,
          prompt: "{電気|でんき}を {家|いえ}まで はこぶのは？",
          explanation: "{発電所|はつでんしょ}の {電気|でんき}は {電線|でんせん}を とおって まちや {家|いえ}に とどくよ。",
          format: "choice",
          choices: ["{電線|でんせん}", "{水道管|すいどうかん}", "{線路|せんろ}", "ガス{管|かん}"],
          answer: "{電線|でんせん}",
        },
        {
          id: `${U.electricityGas}.q-4`,
          unitId: U.electricityGas,
          prompt: "ガスは おもに {何|なに}に つかう？",
          explanation: "ガスは こんろの {火|ひ}や おふろの おゆを わかすのに つかうよ。",
          format: "choice",
          choices: ["{料理|りょうり}や おふろを わかす", "{部屋|へや}を てらす あかり", "{時計|とけい}を うごかす", "{水|みず}を きれいに する"],
          answer: "{料理|りょうり}や おふろを わかす",
        },
        {
          id: `${U.electricityGas}.q-5`,
          unitId: U.electricityGas,
          prompt: "エネルギーを たいせつに する こうどうは？",
          explanation: "つかわない あかりを けすと {電気|でんき}の {節約|せつやく}に なるよ。エネルギーは たいせつに。",
          format: "choice",
          choices: ["つかわない あかりを けす", "つけっぱなしに する", "まどを あけて だんぼうを つよく する", "{電気|でんき}を むだに ながす"],
          answer: "つかわない あかりを けす",
        },
      ],
      questionCount: 5,
    },
  },

  [U.garbage]: {
    unitId: U.garbage,
    learn: {
      unitId: U.garbage,
      steps: [
        {
          heading: "ごみは どこへ いく？",
          body: "{家|いえ}や {学校|がっこう}から でた ごみは、ごみ{収集車|しゅうしゅうしゃ}が あつめて {清掃工場|せいそうこうじょう}に はこぶよ。もえる ごみは もやして、はいは うめたてたり {再利用|さいりよう}したり するんだ。",
          visual: { kind: "emoji", value: "🗑️🚛🏭", caption: "ごみの ゆくえ" },
        },
        {
          heading: "{分別|ぶんべつ}と リサイクル",
          body: "ごみは「もえる ごみ」「もえない ごみ」「しげん（びん・かん・ペットボトル）」などに わけて だすよ。これを {分別|ぶんべつ}と いうよ。しげんは リサイクルして あたらしい ものに うまれかわるんだ。",
          visual: { kind: "emoji", value: "♻️", caption: "リサイクル" },
        },
      ],
    },
    test: {
      unitId: U.garbage,
      questions: [
        {
          id: `${U.garbage}.q-1`,
          unitId: U.garbage,
          prompt: "{家|いえ}の ごみを あつめて はこぶのは？",
          explanation: "ごみは ごみ{収集車|しゅうしゅうしゃ}が あつめて {清掃工場|せいそうこうじょう}へ はこぶよ。",
          format: "choice",
          choices: ["ごみ{収集車|しゅうしゅうしゃ}", "{救急車|きゅうきゅうしゃ}", "{消防車|しょうぼうしゃ}", "{郵便|ゆうびん}の {車|くるま}"],
          answer: "ごみ{収集車|しゅうしゅうしゃ}",
        },
        {
          id: `${U.garbage}.q-2`,
          unitId: U.garbage,
          prompt: "もえる ごみを もやす しせつは？",
          explanation: "もえる ごみは {清掃工場|せいそうこうじょう}で もやされ、ごみの りょうを へらすよ。",
          format: "choice",
          choices: ["{清掃工場|せいそうこうじょう}", "{浄水場|じょうすいじょう}", "{発電所|はつでんしょ}", "{図書館|としょかん}"],
          answer: "{清掃工場|せいそうこうじょう}",
        },
        {
          id: `${U.garbage}.q-3`,
          unitId: U.garbage,
          prompt: "ごみを しゅるいごとに わけて だす ことを なんという？",
          explanation: "もえる・もえない・しげん などに わけて だす ことを {分別|ぶんべつ}と いうよ。",
          format: "choice",
          choices: ["{分別|ぶんべつ}", "{合計|ごうけい}", "{計算|けいさん}", "{掃除|そうじ}"],
          answer: "{分別|ぶんべつ}",
        },
        {
          id: `${U.garbage}.q-4`,
          unitId: U.garbage,
          prompt: "つかった ものを あたらしい ものに つくりかえる ことを なんという？",
          explanation: "びんや かんなどの しげんを あたらしい せいひんに つくりかえる ことを リサイクルと いうよ。",
          format: "choice",
          choices: ["リサイクル", "コレクション", "ダウンロード", "キャンセル"],
          answer: "リサイクル",
        },
        {
          id: `${U.garbage}.q-5`,
          unitId: U.garbage,
          prompt: "ペットボトルは どの ごみに わける？",
          explanation: "ペットボトルは しげんごみ。リサイクルして あたらしい せいひんに なるよ。",
          format: "choice",
          choices: ["しげんごみ", "もえる ごみ", "もえない ごみ だけ", "{粗大|そだい}ごみ"],
          answer: "しげんごみ",
        },
        {
          id: `${U.garbage}.q-6`,
          unitId: U.garbage,
          prompt: "ごみを へらす ために じぶんが できる ことは？",
          explanation: "ものを たいせつに つかい、くりかえし つかうと ごみが へるよ。",
          format: "choice",
          choices: ["つかえる ものを たいせつに つかう", "なんでも すぐに すてる", "しげんを もえる ごみに まぜる", "ふくろを たくさん もらう"],
          answer: "つかえる ものを たいせつに つかう",
        },
      ],
      questionCount: 6,
    },
  },

  [U.disaster]: {
    unitId: U.disaster,
    learn: {
      unitId: U.disaster,
      steps: [
        {
          heading: "{自然|しぜん}{災害|さいがい}って なに？",
          body: "{地震|じしん}や {台風|たいふう}、{大雨|おおあめ}による こうずい、{火事|かじ}などで くらしが あぶなく なる ことを {災害|さいがい}と いうよ。{日本|にほん}は {地震|じしん}や {台風|たいふう}が おおい くにだから、ふだんから そなえる ことが たいせつだよ。",
          visual: { kind: "emoji", value: "🌊🌀", caption: "{自然|しぜん}{災害|さいがい}" },
        },
        {
          heading: "みんなで まちを まもる",
          body: "{市|し}や {県|けん}、{消防|しょうぼう}・{警察|けいさつ}は ひなんばしょを きめたり ハザードマップを つくったり して くらしを まもるよ。{家|いえ}でも {非常|ひじょう}もちだしぶくろを よういして おこう。",
          visual: { kind: "emoji", value: "🧯🎒", caption: "そなえ" },
        },
      ],
    },
    test: {
      unitId: U.disaster,
      questions: [
        {
          id: `${U.disaster}.q-1`,
          unitId: U.disaster,
          prompt: "{地面|じめん}が おおきく ゆれる {災害|さいがい}は？",
          explanation: "{地面|じめん}が ゆれる {災害|さいがい}を {地震|じしん}と いうよ。{日本|にほん}は {地震|じしん}が おおいよ。",
          format: "choice",
          choices: ["{地震|じしん}", "にじ", "ひでり", "おんせん"],
          answer: "{地震|じしん}",
        },
        {
          id: `${U.disaster}.q-2`,
          unitId: U.disaster,
          prompt: "{大雨|おおあめ}で {川|かわ}の {水|みず}が あふれる ことを なんという？",
          explanation: "{雨|あめ}が おおく ふって {川|かわ}の {水|みず}が あふれる ことを {洪水|こうずい}と いうよ。",
          format: "choice",
          choices: ["{洪水|こうずい}", "{晴|は}れ", "{雪|ゆき}どけ", "しお"],
          answer: "{洪水|こうずい}",
        },
        {
          id: `${U.disaster}.q-3`,
          unitId: U.disaster,
          prompt: "{災害|さいがい}の ときに にげる ばしょを なんという？",
          explanation: "{学校|がっこう}や こうえんなど、{安全|あんぜん}に にげる ばしょを ひなんばしょと いうよ。",
          format: "choice",
          choices: ["ひなんばしょ", "ゆうえんち", "プール", "えいがかん"],
          answer: "ひなんばしょ",
        },
        {
          id: `${U.disaster}.q-4`,
          unitId: U.disaster,
          prompt: "{危|あぶ}ない ところや ひなんばしょを しめした {地図|ちず}を なんという？",
          explanation: "{災害|さいがい}の きけんな ばしょや ひなんばしょを しめした {地図|ちず}を ハザードマップと いうよ。",
          format: "choice",
          choices: ["ハザードマップ", "たからの {地図|ちず}", "せかい{地図|ちず}", "めいろ"],
          answer: "ハザードマップ",
        },
        {
          id: `${U.disaster}.q-5`,
          unitId: U.disaster,
          prompt: "{災害|さいがい}に そなえて {家|いえ}で よういする ものは？",
          explanation: "{水|みず}・しょくりょう・ライトなどを いれた {非常|ひじょう}もちだしぶくろを よういして おくと あんしんだよ。",
          format: "choice",
          choices: ["{非常|ひじょう}もちだしぶくろ", "おもちゃばこ だけ", "まんがの {本|ほん}", "ふうせん"],
          answer: "{非常|ひじょう}もちだしぶくろ",
        },
      ],
      questionCount: 5,
    },
  },

  [U.tradition]: {
    unitId: U.tradition,
    learn: {
      unitId: U.tradition,
      steps: [
        {
          heading: "きょうどの {伝統|でんとう}{文化|ぶんか}",
          body: "むかしから その {土地|とち}で うけつがれてきた おまつりや {年中行事|ねんちゅうぎょうじ}、{古|ふる}い たてものや {道具|どうぐ}を {伝統|でんとう}{文化|ぶんか}と いうよ。{地域|ちいき}の {人|ひと}たちが たいせつに まもって きたんだ。",
          visual: { kind: "emoji", value: "🏮🎏", caption: "おまつり" },
        },
        {
          heading: "{文化財|ぶんかざい}を まもる",
          body: "{昔|むかし}の おしろや おてら、つたわる おどりなどは {文化財|ぶんかざい}として まもられて いるよ。{博物館|はくぶつかん}や きょうど{資料館|しりょうかん}で、{昔|むかし}の くらしを しる ことが できるよ。",
          visual: { kind: "emoji", value: "🏯🏛️", caption: "{文化財|ぶんかざい}" },
        },
      ],
    },
    test: {
      unitId: U.tradition,
      questions: [
        {
          id: `${U.tradition}.q-1`,
          unitId: U.tradition,
          prompt: "むかしから うけつがれてきた おまつりや {行事|ぎょうじ}を なんという？",
          explanation: "{地域|ちいき}で {昔|むかし}から うけつがれてきた おまつりや {行事|ぎょうじ}を {伝統|でんとう}{文化|ぶんか}と いうよ。",
          format: "choice",
          choices: ["{伝統|でんとう}{文化|ぶんか}", "さいしんの ゲーム", "てんきよほう", "コンピュータ"],
          answer: "{伝統|でんとう}{文化|ぶんか}",
        },
        {
          id: `${U.tradition}.q-2`,
          unitId: U.tradition,
          prompt: "{昔|むかし}の くらしや {道具|どうぐ}を てんじして いる ところは？",
          explanation: "{昔|むかし}の {道具|どうぐ}や くらしは きょうど{資料館|しりょうかん}や {博物館|はくぶつかん}で しらべられるよ。",
          format: "choice",
          choices: ["きょうど{資料館|しりょうかん}・{博物館|はくぶつかん}", "ゆうえんち", "スーパー", "{駅|えき}"],
          answer: "きょうど{資料館|しりょうかん}・{博物館|はくぶつかん}",
        },
        {
          id: `${U.tradition}.q-3`,
          unitId: U.tradition,
          prompt: "まもり つたえる ねうちが ある {古|ふる}い たてものや {道具|どうぐ}を なんという？",
          explanation: "{昔|むかし}から たいせつに のこされてきた おしろや {道具|どうぐ}などを {文化財|ぶんかざい}と いうよ。",
          format: "choice",
          choices: ["{文化財|ぶんかざい}", "ごみ", "しょうひん", "おもちゃ"],
          answer: "{文化財|ぶんかざい}",
        },
        {
          id: `${U.tradition}.q-4`,
          unitId: U.tradition,
          prompt: "{毎年|まいとし} きまった きせつに おこなう おまつりなどを なんという？",
          explanation: "おしょうがつや なつまつりのように {毎年|まいとし} きまって おこなう ものを {年中行事|ねんちゅうぎょうじ}と いうよ。",
          format: "choice",
          choices: ["{年中行事|ねんちゅうぎょうじ}", "じゆうけんきゅう", "しゅくだい", "かいぎ"],
          answer: "{年中行事|ねんちゅうぎょうじ}",
        },
        {
          id: `${U.tradition}.q-5`,
          unitId: U.tradition,
          prompt: "{伝統|でんとう}{文化|ぶんか}を まもる ために たいせつな ことは？",
          explanation: "おまつりや ぎじゅつを こどもや まごへ つたえる ことで {伝統|でんとう}は のこって いくよ。",
          format: "choice",
          choices: ["つぎの {世代|せだい}に つたえる", "わすれて しまう", "こわして すてる", "ひとりじめ する"],
          answer: "つぎの {世代|せだい}に つたえる",
        },
      ],
      questionCount: 5,
    },
  },

  [U.pioneers]: {
    unitId: U.pioneers,
    learn: {
      unitId: U.pioneers,
      steps: [
        {
          heading: "{先人|せんじん}の はたらき",
          body: "{昔|むかし}、{地域|ちいき}の くらしを よく する ために がんばった {人|ひと}たちを {先人|せんじん}と いうよ。{用水路|ようすいろ}を つくって {田|た}に {水|みず}を ひいたり、{道|みち}や {橋|はし}を つくったり して くらしを ささえたんだ。",
          visual: { kind: "emoji", value: "👷🏗️", caption: "{先人|せんじん}の どりょく" },
        },
        {
          heading: "いまに つながる くふう",
          body: "{先人|せんじん}たちの どりょくの おかげで、いまの べんりな くらしが あるよ。{昔|むかし}の {人|ひと}が どんな くろうを して まちを つくったのか しらべて みよう。",
          visual: { kind: "emoji", value: "🌉", caption: "いまに つづく くふう" },
        },
      ],
    },
    test: {
      unitId: U.pioneers,
      questions: [
        {
          id: `${U.pioneers}.q-1`,
          unitId: U.pioneers,
          prompt: "{昔|むかし} {地域|ちいき}の くらしを よくする ために はたらいた {人|ひと}を なんという？",
          explanation: "{昔|むかし} くらしを よくする ために どりょくした {人|ひと}たちを {先人|せんじん}と いうよ。",
          format: "choice",
          choices: ["{先人|せんじん}", "おきゃくさん", "たびびと", "せんしゅ"],
          answer: "{先人|せんじん}",
        },
        {
          id: `${U.pioneers}.q-2`,
          unitId: U.pioneers,
          prompt: "{田|た}や {畑|はたけ}に {水|みず}を ひく ために つくった ものは？",
          explanation: "{先人|せんじん}は {用水路|ようすいろ}を つくって とおくの {水|みず}を {田|た}や {畑|はたけ}に ひいたよ。",
          format: "choice",
          choices: ["{用水路|ようすいろ}", "{鉄道|てつどう}", "ダムだけ", "でんわ"],
          answer: "{用水路|ようすいろ}",
        },
        {
          id: `${U.pioneers}.q-3`,
          unitId: U.pioneers,
          prompt: "{先人|せんじん}の しごとで くらしは どう なった？",
          explanation: "{道|みち}・{橋|はし}・{用水路|ようすいろ}などの おかげで くらしが べんりに なったよ。",
          format: "choice",
          choices: ["べんりに なった", "ふべんに なった", "なにも かわらない", "くらく なった"],
          answer: "べんりに なった",
        },
        {
          id: `${U.pioneers}.q-4`,
          unitId: U.pioneers,
          prompt: "{昔|むかし}の {先人|せんじん}の はたらきを しらべる ほうほうは？",
          explanation: "{資料館|しりょうかん}や のこされた {記録|きろく}・{古|ふる}い {地図|ちず}から {先人|せんじん}の はたらきが わかるよ。",
          format: "choice",
          choices: ["きょうど{資料館|しりょうかん}や {古|ふる}い {記録|きろく}を みる", "ゲームで あそぶ", "てんきを みる", "おかしを たべる"],
          answer: "きょうど{資料館|しりょうかん}や {古|ふる}い {記録|きろく}を みる",
        },
        {
          id: `${U.pioneers}.q-5`,
          unitId: U.pioneers,
          prompt: "{先人|せんじん}に たいして もつと よい きもちは？",
          explanation: "いまの べんりな くらしを つくって くれた {先人|せんじん}に かんしゃの きもちを もとう。",
          format: "choice",
          choices: ["かんしゃの きもち", "めんどうな きもち", "こわい きもち", "おこる きもち"],
          answer: "かんしゃの きもち",
        },
      ],
      questionCount: 5,
    },
  },

  [U.specialRegions]: {
    unitId: U.specialRegions,
    learn: {
      unitId: U.specialRegions,
      steps: [
        {
          heading: "とくしょくある {地域|ちいき}",
          body: "{県|けん}の なかには、{昔|むかし}から つづく {伝統|でんとう}{工芸|こうげい}が さかんな まちや、{外国|がいこく}との {交流|こうりゅう}が さかんな まち、うつくしい {自然|しぜん}を いかした まちなど、それぞれ とくちょうの ある {地域|ちいき}が あるよ。",
          visual: { kind: "emoji", value: "🏯🎎", caption: "とくしょくある {地域|ちいき}" },
        },
        {
          heading: "その {土地|とち}らしさを いかす",
          body: "{伝統|でんとう}{工芸|こうげい}（{焼|や}きものや {織物|おりもの}など）、{観光|かんこう}、{国際|こくさい}{交流|こうりゅう}など、その {地域|ちいき}の よさを いかして {人|ひと}が あつまり、まちが げんきに なるんだ。",
          visual: { kind: "emoji", value: "🏺🌍", caption: "まちの よさ" },
        },
      ],
    },
    test: {
      unitId: U.specialRegions,
      questions: [
        {
          id: `${U.specialRegions}.q-1`,
          unitId: U.specialRegions,
          prompt: "{昔|むかし}から つたわる ぎじゅつで つくる {焼|や}きものや {織物|おりもの}を なんという？",
          explanation: "{地域|ちいき}に つたわる ぎじゅつで つくる {焼|や}きものや {織物|おりもの}などを {伝統|でんとう}{工芸|こうげい}と いうよ。",
          format: "choice",
          choices: ["{伝統|でんとう}{工芸|こうげい}", "インターネット", "{自動車|じどうしゃ}", "ロボット"],
          answer: "{伝統|でんとう}{工芸|こうげい}",
        },
        {
          id: `${U.specialRegions}.q-2`,
          unitId: U.specialRegions,
          prompt: "{外国|がいこく}の {人|ひと}や まちと なかよく する ことを なんという？",
          explanation: "{外国|がいこく}と ぶんかや {人|ひと}の いきかいを する ことを {国際|こくさい}{交流|こうりゅう}と いうよ。",
          format: "choice",
          choices: ["{国際|こくさい}{交流|こうりゅう}", "ひとりあそび", "けんか", "むし"],
          answer: "{国際|こくさい}{交流|こうりゅう}",
        },
        {
          id: `${U.specialRegions}.q-3`,
          unitId: U.specialRegions,
          prompt: "うつくしい {自然|しぜん}や めいしょを みに {人|ひと}が おとずれる ことを なんという？",
          explanation: "めいしょや {自然|しぜん}を たのしみに {人|ひと}が おとずれる ことを {観光|かんこう}と いうよ。まちが げんきに なるね。",
          format: "choice",
          choices: ["{観光|かんこう}", "じゅぎょう", "かいもの だけ", "せんたく"],
          answer: "{観光|かんこう}",
        },
        {
          id: `${U.specialRegions}.q-4`,
          unitId: U.specialRegions,
          prompt: "とくしょくある {地域|ちいき}に {人|ひと}が あつまると まちは どう なる？",
          explanation: "{特色|とくしょく}を いかすと {人|ひと}が あつまり、しごとや まちが げんきに なるよ。",
          format: "choice",
          choices: ["げんきに なる", "しずかに なくなる", "くらく なる", "きえる"],
          answer: "げんきに なる",
        },
        {
          id: `${U.specialRegions}.q-5`,
          unitId: U.specialRegions,
          prompt: "{地域|ちいき}の よさを のこす ために たいせつな ことは？",
          explanation: "{地域|ちいき}の {特色|とくしょく}や {伝統|でんとう}{工芸|こうげい}を みんなで まもり つたえる ことが たいせつだよ。",
          format: "choice",
          choices: ["みんなで まもり つたえる", "かくして しまう", "こわす", "わすれる"],
          answer: "みんなで まもり つたえる",
        },
      ],
      questionCount: 5,
    },
  },
};
