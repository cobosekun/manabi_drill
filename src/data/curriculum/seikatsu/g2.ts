// ══════════════════════════════════════════
// カリキュラム: 生活（せいかつ）小2
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 生活科は小1・小2のみ（Subject.grades=[1,2]）。
// SubjectId は drill.ts が既に "seikatsu" を持つため as 等は不要（局所吸収は発生しない）。
//   → 申し送り: ThemeName は "amber" を採用（既存教科 orange/emerald/sky/rose と非衝突）。
// 既存 generators は生活科に非対応 → 全単元 固定 questions[]（全問 explanation 必須）。
// 全表示テキストはルビ記法 {漢字|よみ} で執筆（全漢字ルビ・低学年向けにやさしく）。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type { Subject, Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const seikatsuSubject: Subject = {
  id: "seikatsu",
  name: "せいかつ",
  formalName: "生活",
  emoji: "🌱",
  theme: "amber",
  grades: [1, 2],
  testable: true,
};

// ── 領域（生活科の内容: まち / しぜん・さいばい / いきもの / つくる / じぶんの成長） ──

export const seikatsuG2Domains: Domain[] = [
  {
    id: "seikatsu.town",
    subjectId: "seikatsu",
    name: "まち（まちと くらし）",
    formalName: "地域と生活",
  },
  {
    id: "seikatsu.nature-grow",
    subjectId: "seikatsu",
    name: "しぜん・さいばい",
    formalName: "自然とのかかわり・栽培",
  },
  {
    id: "seikatsu.living-things",
    subjectId: "seikatsu",
    name: "いきもの",
    formalName: "生き物とのかかわり・飼育",
  },
  {
    id: "seikatsu.making",
    subjectId: "seikatsu",
    name: "つくる（あそびと ものづくり）",
    formalName: "遊びや工作",
  },
  {
    id: "seikatsu.self-growth",
    subjectId: "seikatsu",
    name: "じぶんの せいちょう",
    formalName: "自分の成長",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo）。生活科は他教科のスタート地点になりやすいので
// いきもの・さいばいは理科(g3)へ leadsTo でつなぐ（バリデータが最終的に参照解決を検査）。
//
//   town-explore ─┬─▶ working-people ─▶ public-facilities
//                 └─▶ public-facilities
//   vegetable-growing ─▶（理科 g3 しょくぶつの そだち）
//   living-things ─────▶（理科 g3 しぜんの かんさつ）
//   moving-toys / my-growth（単独）
//
const U = {
  townExplore: "seikatsu.g2.town-explore",
  workingPeople: "seikatsu.g2.working-people",
  publicFacilities: "seikatsu.g2.public-facilities",
  vegetableGrowing: "seikatsu.g2.vegetable-growing",
  livingThings: "seikatsu.g2.living-things",
  movingToys: "seikatsu.g2.moving-toys",
  myGrowth: "seikatsu.g2.my-growth",
} as const;

// 他教科の参照先 id（rika/g3.ts に実在。将来の中央集約で解決される前提）
const RIKA = {
  natureObservation: "rika.g3.nature-observation", // みぢかな しぜんの かんさつ
  plantGrowth: "rika.g3.plant-growth", // しょくぶつの そだち
} as const;

export const seikatsuG2Units: Unit[] = [
  {
    id: U.townExplore,
    subjectId: "seikatsu",
    grade: 2,
    domainId: "seikatsu.town",
    title: "まちたんけん",
    order: 1,
    realWorldUse:
      "まちを あるいて お{店|みせ}や こうえんを みつけるように、{自分|じぶん}の すんでいる ところを よく {知|し}るのに やくだつよ。",
    leadsTo: [U.workingPeople, U.publicFacilities],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.workingPeople,
    subjectId: "seikatsu",
    grade: 2,
    domainId: "seikatsu.town",
    title: "まちで はたらく {人|ひと}",
    order: 2,
    realWorldUse:
      "お{店|みせ}の {人|ひと}や しょうぼうしの しごとを {知|し}るように、まちの {人|ひと}が どんな しごとを しているか {分|わ}かるよ。",
    leadsTo: [U.publicFacilities],
    prerequisites: [U.townExplore],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.publicFacilities,
    subjectId: "seikatsu",
    grade: 2,
    domainId: "seikatsu.town",
    title: "こうきょうしせつと のりもの",
    order: 3,
    realWorldUse:
      "としょかんや バスを つかうときの ように、みんなが つかう ばしょや のりものを ただしく つかえるよ。",
    leadsTo: [],
    prerequisites: [U.townExplore],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.vegetableGrowing,
    subjectId: "seikatsu",
    grade: 2,
    domainId: "seikatsu.nature-grow",
    title: "やさいを {育|そだ}てる",
    order: 4,
    realWorldUse:
      "ミニトマトを {育|そだ}てて {食|た}べるように、しょくぶつを そだてて しゅうかくする よろこびが {分|わ}かるよ。",
    leadsTo: [RIKA.plantGrowth],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.livingThings,
    subjectId: "seikatsu",
    grade: 2,
    domainId: "seikatsu.living-things",
    title: "{生|い}きものと なかよし",
    order: 5,
    realWorldUse:
      "ダンゴムシや うさぎを かって せわするように、{生|い}きものを たいせつに する きもちが そだつよ。",
    leadsTo: [RIKA.natureObservation],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.movingToys,
    subjectId: "seikatsu",
    grade: 2,
    domainId: "seikatsu.making",
    title: "うごく おもちゃを {作|つく}る",
    order: 6,
    realWorldUse:
      "ゴムや かぜで うごく おもちゃを {作|つく}るように、{身|み}の まわりの ものを くふうして あそぶ ちからが つくよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.myGrowth,
    subjectId: "seikatsu",
    grade: 2,
    domainId: "seikatsu.self-growth",
    title: "じぶんの せいちょう",
    order: 7,
    realWorldUse:
      "あかちゃんの ころから いままでを ふりかえるように、{自分|じぶん}の せいちょうに きづき、これからを たのしみに できるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 生活科は emoji 中心の learn（事前定義 SVG は理数向けのため使わない）。
// test は全単元 固定 choice questions（4択・全問 explanation 必須）。

export const seikatsuG2Contents: Record<string, UnitContent> = {
  // ── 1. まちたんけん ──
  [U.townExplore]: {
    unitId: U.townExplore,
    learn: {
      unitId: U.townExplore,
      steps: [
        {
          heading: "まちを あるいてみよう",
          body: "{自分|じぶん}の まちには お{店|みせ}・こうえん・{駅|えき}など いろいろな ばしょが あるよ。あるいて さがしてみよう。",
          visual: { kind: "emoji", value: "🏪🌳🚉", caption: "まちの いろいろな ばしょ" },
        },
        {
          heading: "みつけた ことを メモしよう",
          body: "きづいた ことや すきな ばしょを {絵|え}や ことばで メモすると、あとで みんなに {伝|つた}えられるよ。",
          visual: { kind: "emoji", value: "📝🗺️", caption: "たんけんメモ" },
        },
        {
          heading: "あいさつを しよう",
          body: "お{店|みせ}の {人|ひと}に あうと「こんにちは」と あいさつ。やさしく きくと いろいろ {教|おし}えてくれるよ。",
          visual: { kind: "emoji", value: "🙇‍♀️🗣️", caption: "あいさつ たいせつ" },
        },
      ],
    },
    test: {
      unitId: U.townExplore,
      questionCount: 5,
      questions: [
        {
          id: `${U.townExplore}.q-1`,
          unitId: U.townExplore,
          prompt: "まちたんけんで みつけた ことは どう のこすと いい？",
          explanation: "{絵|え}や ことばで メモすると、あとで みんなに {伝|つた}えられるよ。",
          format: "choice",
          choices: ["{絵|え}や メモに かく", "こえに {出|だ}さない", "すぐ わすれる", "もちかえる"],
          answer: "{絵|え}や メモに かく",
        },
        {
          id: `${U.townExplore}.q-2`,
          unitId: U.townExplore,
          prompt: "でんしゃに のる ばしょは どこ？",
          explanation: "でんしゃに のったり おりたり する ばしょは「{駅|えき}」だよ。",
          format: "choice",
          choices: ["{駅|えき}", "こうえん", "びょういん", "ゆうびんきょく"],
          answer: "{駅|えき}",
        },
        {
          id: `${U.townExplore}.q-3`,
          unitId: U.townExplore,
          prompt: "お{店|みせ}の {人|ひと}に あったら さいしょに する ことは？",
          explanation: "まず「こんにちは」と あいさつ。きもちよく お{話|はなし}が できるよ。",
          format: "choice",
          choices: ["あいさつを する", "だまって {入|はい}る", "はしりまわる", "かってに さわる"],
          answer: "あいさつを する",
        },
        {
          id: `${U.townExplore}.q-4`,
          unitId: U.townExplore,
          prompt: "てがみや はがきを {出|だ}す ばしょは？",
          explanation: "てがみや はがきは「ゆうびんきょく」や ポストから {出|だ}すよ。",
          format: "choice",
          choices: ["ゆうびんきょく", "{駅|えき}", "がっこう", "こうえん"],
          answer: "ゆうびんきょく",
        },
        {
          id: `${U.townExplore}.q-5`,
          unitId: U.townExplore,
          prompt: "まちたんけんで いちばん たいせつな ことは？",
          explanation: "まわりを よく {見|み}て、あんぜんに きを つけて あるく ことが たいせつだよ。",
          format: "choice",
          choices: ["あんぜんに きを つける", "ひとりで とおくへ いく", "くるまの {道|みち}を はしる", "しらない {人|ひと}に ついていく"],
          answer: "あんぜんに きを つける",
        },
      ],
    },
  },

  // ── 2. まちで はたらく 人 ──
  [U.workingPeople]: {
    unitId: U.workingPeople,
    learn: {
      unitId: U.workingPeople,
      steps: [
        {
          heading: "まちで はたらく {人|ひと}",
          body: "まちには パンやさん・おまわりさん・うんてんしゅさんなど、たくさんの はたらく {人|ひと}が いるよ。",
          visual: { kind: "emoji", value: "👮‍♀️🧑‍🍳🚒", caption: "いろいろな しごと" },
        },
        {
          heading: "しごとを たんけんしよう",
          body: "お{店|みせ}の {人|ひと}に「どんな しごと？」と きいてみると、くふうや たいへんさが {分|わ}かるよ。",
          visual: { kind: "emoji", value: "🗣️🏪", caption: "おしごと インタビュー" },
        },
        {
          heading: "みんなの ために",
          body: "はたらく {人|ひと}は みんなが あんしんして くらせるように、まちを ささえてくれているよ。",
          visual: { kind: "emoji", value: "🤝🏙️", caption: "まちを ささえる" },
        },
      ],
    },
    test: {
      unitId: U.workingPeople,
      questionCount: 5,
      questions: [
        {
          id: `${U.workingPeople}.q-1`,
          unitId: U.workingPeople,
          prompt: "{火事|かじ}を けして くれる {人|ひと}は？",
          explanation: "{火事|かじ}を けして みんなを たすけるのは「しょうぼうし」だよ。",
          format: "choice",
          choices: ["しょうぼうし", "パンやさん", "うんてんしゅ", "おいしゃさん"],
          answer: "しょうぼうし",
        },
        {
          id: `${U.workingPeople}.q-2`,
          unitId: U.workingPeople,
          prompt: "まちの あんぜんを まもる おまわりさんが いる ところは？",
          explanation: "おまわりさんは「こうばん」や けいさつしょで まちを まもっているよ。",
          format: "choice",
          choices: ["こうばん", "パンや", "びょういん", "がっこう"],
          answer: "こうばん",
        },
        {
          id: `${U.workingPeople}.q-3`,
          unitId: U.workingPeople,
          prompt: "バスを うんてんして {人|ひと}を はこぶ {人|ひと}は？",
          explanation: "バスや でんしゃを うんてんするのは「うんてんしゅ」だよ。",
          format: "choice",
          choices: ["うんてんしゅ", "コック", "はなやさん", "せんせい"],
          answer: "うんてんしゅ",
        },
        {
          id: `${U.workingPeople}.q-4`,
          unitId: U.workingPeople,
          prompt: "はたらく {人|ひと}に しごとを きく とき、たいせつな ことは？",
          explanation: "あいさつを して、ていねいに きくと くわしく {教|おし}えてくれるよ。",
          format: "choice",
          choices: ["ていねいに きく", "むりやり きく", "だまって {見|み}る", "じゃまを する"],
          answer: "ていねいに きく",
        },
        {
          id: `${U.workingPeople}.q-5`,
          unitId: U.workingPeople,
          prompt: "まちの はたらく {人|ひと}は なんの ために はたらいている？",
          explanation: "みんなが あんしんして くらせるように、まちを ささえてくれているよ。",
          format: "choice",
          choices: ["みんなの ため", "あそぶ ため", "ねる ため", "なんとなく"],
          answer: "みんなの ため",
        },
      ],
    },
  },

  // ── 3. こうきょうしせつと のりもの ──
  [U.publicFacilities]: {
    unitId: U.publicFacilities,
    learn: {
      unitId: U.publicFacilities,
      steps: [
        {
          heading: "みんなの ばしょ",
          body: "としょかん・こうえん・{駅|えき}は みんなで つかう ばしょ（こうきょうしせつ）だよ。やさしく つかおう。",
          visual: { kind: "emoji", value: "📚🏛️🌳", caption: "みんなの しせつ" },
        },
        {
          heading: "のりものの マナー",
          body: "バスや でんしゃでは しずかにして、おとしよりに せきを ゆずると みんなが きもちいいね。",
          visual: { kind: "emoji", value: "🚌🚃", caption: "のりもの マナー" },
        },
        {
          heading: "ルールを まもろう",
          body: "としょかんでは {本|ほん}を たいせつに し、しずかに よむよ。みんなで つかう ものは ていねいに あつかおう。",
          visual: { kind: "emoji", value: "🤫📖", caption: "しずかに つかう" },
        },
      ],
    },
    test: {
      unitId: U.publicFacilities,
      questionCount: 5,
      questions: [
        {
          id: `${U.publicFacilities}.q-1`,
          unitId: U.publicFacilities,
          prompt: "{本|ほん}を かりて よめる こうきょうしせつは？",
          explanation: "たくさんの {本|ほん}を かりて よめる ばしょは「としょかん」だよ。",
          format: "choice",
          choices: ["としょかん", "びょういん", "ゆうびんきょく", "こうじょう"],
          answer: "としょかん",
        },
        {
          id: `${U.publicFacilities}.q-2`,
          unitId: U.publicFacilities,
          prompt: "バスの{中|なか}で おとしよりが きたら どう する？",
          explanation: "せきを ゆずると、おとしよりも あんしん。みんなが きもちよく のれるよ。",
          format: "choice",
          choices: ["せきを ゆずる", "ねたふりを する", "{大|おお}きな こえで さわぐ", "はしりまわる"],
          answer: "せきを ゆずる",
        },
        {
          id: `${U.publicFacilities}.q-3`,
          unitId: U.publicFacilities,
          prompt: "としょかんでの すごしかたで ただしいのは？",
          explanation: "としょかんは みんなが よむ ばしょ。しずかに すごすのが マナーだよ。",
          format: "choice",
          choices: ["しずかに する", "{大|おお}ごえで はなす", "はしる", "{本|ほん}を なげる"],
          answer: "しずかに する",
        },
        {
          id: `${U.publicFacilities}.q-4`,
          unitId: U.publicFacilities,
          prompt: "みんなで つかう こうえんの どうぐは どう つかう？",
          explanation: "じゅんばんを まもって、みんなで なかよく つかうよ。",
          format: "choice",
          choices: ["じゅんばんを まもる", "ひとりじめする", "こわす", "もちかえる"],
          answer: "じゅんばんを まもる",
        },
        {
          id: `${U.publicFacilities}.q-5`,
          unitId: U.publicFacilities,
          prompt: "でんしゃの{中|なか}で して いい ことは？",
          explanation: "でんしゃでは しずかに して、ほかの {人|ひと}の めいわくに ならないように するよ。",
          format: "choice",
          choices: ["しずかに のる", "ゆかに ねころぶ", "{大|おお}ごえで うたう", "とびはねる"],
          answer: "しずかに のる",
        },
      ],
    },
  },

  // ── 4. やさいを 育てる ──
  [U.vegetableGrowing]: {
    unitId: U.vegetableGrowing,
    learn: {
      unitId: U.vegetableGrowing,
      steps: [
        {
          heading: "なえを うえよう",
          body: "ミニトマトの なえを はちに うえて、{土|つち}を かけて みずを やるよ。",
          visual: { kind: "emoji", value: "🪴🍅", caption: "なえうえ" },
        },
        {
          heading: "まいにち せわを する",
          body: "{毎日|まいにち} みずを やり、{日|ひ}なたに おくと ぐんぐん そだつよ。{花|はな}の あとに みが できるよ。",
          visual: { kind: "emoji", value: "🌱☀️", caption: "せわを する" },
        },
        {
          heading: "しゅうかく",
          body: "{赤|あか}く なったら しゅうかく！じぶんで そだてた やさいは とても おいしいね。",
          visual: { kind: "emoji", value: "🍅😋", caption: "あかく なったら しゅうかく" },
        },
      ],
    },
    test: {
      unitId: U.vegetableGrowing,
      questionCount: 5,
      questions: [
        {
          id: `${U.vegetableGrowing}.q-1`,
          unitId: U.vegetableGrowing,
          prompt: "なえを うえた あと、まいにち する せわは？",
          explanation: "しょくぶつは みずが ひつよう。{毎日|まいにち} みずを やると そだつよ。",
          format: "choice",
          choices: ["みずを やる", "ふたを する", "{土|つち}を ほる", "なにも しない"],
          answer: "みずを やる",
        },
        {
          id: `${U.vegetableGrowing}.q-2`,
          unitId: U.vegetableGrowing,
          prompt: "ミニトマトを よく そだてるには どこに おく？",
          explanation: "しょくぶつは {日|ひ}の {光|ひかり}が すき。{日|ひ}なたに おくと よく そだつよ。",
          format: "choice",
          choices: ["{日|ひ}なた", "くらい おしいれ", "れいぞうこ", "{土|つち}の{中|なか}"],
          answer: "{日|ひ}なた",
        },
        {
          id: `${U.vegetableGrowing}.q-3`,
          unitId: U.vegetableGrowing,
          prompt: "ミニトマトの みは うれると なにいろに なる？",
          explanation: "ミニトマトは うれると みどりから {赤|あか}に かわるよ。{赤|あか}が しゅうかくの あいず。",
          format: "choice",
          choices: ["{赤|あか}", "あお", "むらさき", "くろ"],
          answer: "{赤|あか}",
        },
        {
          id: `${U.vegetableGrowing}.q-4`,
          unitId: U.vegetableGrowing,
          prompt: "{花|はな}が さいた あとに できるのは？",
          explanation: "{花|はな}が さいた あとに みが できるよ。みの{中|なか}には たねが あるよ。",
          format: "choice",
          choices: ["み", "ねっこ", "は だけ", "なにも できない"],
          answer: "み",
        },
        {
          id: `${U.vegetableGrowing}.q-5`,
          unitId: U.vegetableGrowing,
          prompt: "やさいを そだてて わかる きもちは？",
          explanation: "じぶんで そだてて しゅうかくすると、うれしい・おいしいと かんじるよ。",
          format: "choice",
          choices: ["そだてる よろこび", "つまらない", "こわい", "なにも かんじない"],
          answer: "そだてる よろこび",
        },
      ],
    },
  },

  // ── 5. 生きものと なかよし ──
  [U.livingThings]: {
    unitId: U.livingThings,
    learn: {
      unitId: U.livingThings,
      steps: [
        {
          heading: "{生|い}きものを さがそう",
          body: "こうえんや はらっぱには ダンゴムシ・バッタ・チョウなど いろいろな {生|い}きものが いるよ。",
          visual: { kind: "emoji", value: "🐞🦗🦋", caption: "いろいろな {生|い}きもの" },
        },
        {
          heading: "かって せわを する",
          body: "むしや ザリガニを かうときは、すみか・えさ・みずを ととのえて {毎日|まいにち} せわするよ。",
          visual: { kind: "emoji", value: "🦐🍃", caption: "かって せわする" },
        },
        {
          heading: "いのちを たいせつに",
          body: "{生|い}きものにも いのちが あるよ。やさしく さわり、かんさつが おわったら もとの ばしょに かえそう。",
          visual: { kind: "emoji", value: "💚🐢", caption: "いのちを たいせつに" },
        },
      ],
    },
    test: {
      unitId: U.livingThings,
      questionCount: 5,
      questions: [
        {
          id: `${U.livingThings}.q-1`,
          unitId: U.livingThings,
          prompt: "ダンゴムシが よく いる ばしょは？",
          explanation: "ダンゴムシは いしや おちばの したの じめじめした ところに いるよ。",
          format: "choice",
          choices: ["いしや おちばの した", "そらの {上|うえ}", "{水|みず}の{中|なか}", "{火|ひ}の {中|なか}"],
          answer: "いしや おちばの した",
        },
        {
          id: `${U.livingThings}.q-2`,
          unitId: U.livingThings,
          prompt: "{生|い}きものを かう とき、ようい する ものは？",
          explanation: "{生|い}きものには すみか・えさ・みずが ひつよう。ととのえて せわするよ。",
          format: "choice",
          choices: ["えさと みず", "おもちゃだけ", "なにも いらない", "{本|ほん}だけ"],
          answer: "えさと みず",
        },
        {
          id: `${U.livingThings}.q-3`,
          unitId: U.livingThings,
          prompt: "{生|い}きものに さわる ときは どう する？",
          explanation: "{生|い}きものにも いのちが あるよ。やさしく そっと さわろう。",
          format: "choice",
          choices: ["やさしく さわる", "つよく にぎる", "なげる", "ふみつける"],
          answer: "やさしく さわる",
        },
        {
          id: `${U.livingThings}.q-4`,
          unitId: U.livingThings,
          prompt: "かんさつが おわった {生|い}きものは どう する？",
          explanation: "つかまえた {生|い}きものは、もとの ばしょに かえして あげようね。",
          format: "choice",
          choices: ["もとの ばしょに かえす", "すてる", "ずっと とじこめる", "ほうっておく"],
          answer: "もとの ばしょに かえす",
        },
        {
          id: `${U.livingThings}.q-5`,
          unitId: U.livingThings,
          prompt: "バッタは おもに なにを たべる？",
          explanation: "バッタは {草|くさ}や {葉|は}っぱを たべる {生|い}きものだよ。",
          format: "choice",
          choices: ["{草|くさ}や {葉|は}っぱ", "いし", "すな", "かみ"],
          answer: "{草|くさ}や {葉|は}っぱ",
        },
      ],
    },
  },

  // ── 6. うごく おもちゃを 作る ──
  [U.movingToys]: {
    unitId: U.movingToys,
    learn: {
      unitId: U.movingToys,
      steps: [
        {
          heading: "おもちゃを {作|つく}ろう",
          body: "ペットボトルや かみコップ・ゴムを つかって、うごく おもちゃを {作|つく}れるよ。",
          visual: { kind: "emoji", value: "🪀🧪", caption: "ものづくり" },
        },
        {
          heading: "どうして うごく？",
          body: "ゴムを のばすと もどる {力|ちから}、かぜを うけると おす {力|ちから}で おもちゃが うごくよ。",
          visual: { kind: "emoji", value: "💨🎈", caption: "うごく ひみつ" },
        },
        {
          heading: "あそんで くふうしよう",
          body: "もっと とおくへ うごくように、ゴムの かずや かたちを かえて ためしてみよう。",
          visual: { kind: "emoji", value: "🛠️🏁", caption: "くふうして あそぶ" },
        },
      ],
    },
    test: {
      unitId: U.movingToys,
      questionCount: 5,
      questions: [
        {
          id: `${U.movingToys}.q-1`,
          unitId: U.movingToys,
          prompt: "ゴムを のばすと、どんな {力|ちから}が はたらく？",
          explanation: "のばした ゴムは もとに もどろうと する。その {力|ちから}で おもちゃが うごくよ。",
          format: "choice",
          choices: ["もとに もどる {力|ちから}", "つめたく する {力|ちから}", "{光|ひか}る {力|ちから}", "きえる {力|ちから}"],
          answer: "もとに もどる {力|ちから}",
        },
        {
          id: `${U.movingToys}.q-2`,
          unitId: U.movingToys,
          prompt: "ほかけぶねを うごかすのは なに？",
          explanation: "かぜが ほを おすと ふねが すすむよ。かぜの {力|ちから}を つかうよ。",
          format: "choice",
          choices: ["かぜ", "こおり", "{光|ひかり}", "おと"],
          answer: "かぜ",
        },
        {
          id: `${U.movingToys}.q-3`,
          unitId: U.movingToys,
          prompt: "おもちゃを もっと とおくへ うごかすには？",
          explanation: "ゴムの かずや つよさを かえて、なんども ためすと うまく いくよ。",
          format: "choice",
          choices: ["くふうして ためす", "なにも かえない", "こわす", "かたづける"],
          answer: "くふうして ためす",
        },
        {
          id: `${U.movingToys}.q-4`,
          unitId: U.movingToys,
          prompt: "おもちゃづくりで つかわないのは どれ？",
          explanation: "ペットボトル・かみコップ・ゴムは つかえる。{火|ひ}は あぶないので つかわないよ。",
          format: "choice",
          choices: ["{火|ひ}", "ゴム", "かみコップ", "ペットボトル"],
          answer: "{火|ひ}",
        },
        {
          id: `${U.movingToys}.q-5`,
          unitId: U.movingToys,
          prompt: "おもちゃづくりで たいせつな きもちは？",
          explanation: "うまく いかなくても、くふうして なんども ためす ことが たいせつだよ。",
          format: "choice",
          choices: ["くふうして たのしむ", "すぐ あきらめる", "ともだちを どかす", "らんぼうに する"],
          answer: "くふうして たのしむ",
        },
      ],
    },
  },

  // ── 7. じぶんの せいちょう ──
  [U.myGrowth]: {
    unitId: U.myGrowth,
    learn: {
      unitId: U.myGrowth,
      steps: [
        {
          heading: "ちいさい ころの じぶん",
          body: "あかちゃんの ころは ねんねや ハイハイだけだったね。おうちの {人|ひと}に きいてみよう。",
          visual: { kind: "emoji", value: "👶", caption: "あかちゃんの ころ" },
        },
        {
          heading: "できるように なった こと",
          body: "{歩|ある}く・はなす・じぶんで きがえる…たくさんの ことが できるように なったね。",
          visual: { kind: "emoji", value: "🚶🎒", caption: "できる ことが ふえた" },
        },
        {
          heading: "これからの じぶん",
          body: "つぎは どんな ことが できるように なりたいかな？ ゆめを {絵|え}に かいてみよう。",
          visual: { kind: "emoji", value: "🌟🎨", caption: "これからの ゆめ" },
        },
      ],
    },
    test: {
      unitId: U.myGrowth,
      questionCount: 5,
      questions: [
        {
          id: `${U.myGrowth}.q-1`,
          unitId: U.myGrowth,
          prompt: "あかちゃんの ころの ことを {知|し}るには どう する？",
          explanation: "ちいさい ころの ことは、おうちの {人|ひと}に きくと よく {分|わ}かるよ。",
          format: "choice",
          choices: ["おうちの {人|ひと}に きく", "テレビを {見|み}る", "ねて まつ", "{知|し}らなくていい"],
          answer: "おうちの {人|ひと}に きく",
        },
        {
          id: `${U.myGrowth}.q-2`,
          unitId: U.myGrowth,
          prompt: "あかちゃんの ころ できなかったのは どれ？",
          explanation: "あかちゃんは ねんねや ハイハイ。じぶんで {歩|ある}くのは そだってから できる ことだよ。",
          format: "choice",
          choices: ["じぶんで {歩|ある}く", "ねる", "なく", "ミルクを のむ"],
          answer: "じぶんで {歩|ある}く",
        },
        {
          id: `${U.myGrowth}.q-3`,
          unitId: U.myGrowth,
          prompt: "{大|おお}きく なって できるように なった ことは？",
          explanation: "はなす・{歩|ある}く・じぶんで きがえる など、できる ことが たくさん ふえたね。",
          format: "choice",
          choices: ["じぶんで きがえる", "なにも できない", "ちいさく なる", "わすれる"],
          answer: "じぶんで きがえる",
        },
        {
          id: `${U.myGrowth}.q-4`,
          unitId: U.myGrowth,
          prompt: "せいちょうを ふりかえると どんな きもちに なる？",
          explanation: "できる ことが ふえた じぶんに きづくと、うれしく なるよ。",
          format: "choice",
          choices: ["うれしい きもち", "かなしい だけ", "なにも かんじない", "おこる"],
          answer: "うれしい きもち",
        },
        {
          id: `${U.myGrowth}.q-5`,
          unitId: U.myGrowth,
          prompt: "これからの じぶんに ついて たいせつな ことは？",
          explanation: "つぎに できるように なりたい ことを {思|おも}いえがくと、がんばれるよ。",
          format: "choice",
          choices: ["なりたい じぶんを {思|おも}う", "なにも かんがえない", "あきらめる", "やめる"],
          answer: "なりたい じぶんを {思|おも}う",
        },
      ],
    },
  },
};
