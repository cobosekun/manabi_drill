// ══════════════════════════════════════════
// カリキュラム縦スライス: 教養（きょうよう）小1
// 拡張カテゴリ「教養（kyoyo）」= 教科の枠をこえた一般教養を 学習＋テスト両モードで提供する。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 全表示テキストは ルビ記法 {漢字|よみ}（全漢字ルビ）で執筆（2026-06-02 CEO方針）。
//
// ── 申し送り（中央集約担当へ）─────────────────────────────
//  1. SubjectId union（src/types/drill.ts）に "kyoyo" がまだ無いため、本ファイルでは
//     `const KYOYO: SubjectId = "kyoyo";` で局所的に型を吸収している。
//     中央で union に "kyoyo" を追加したら、この as キャストは外してよい（不要になる）。
//  2. index.ts への合流（subjects/domains/units/contents への push）は中央が行う。
//     Subject 定義（emoji 🌍 / theme emerald / grades [1..6] / testable:true）は本ファイルの
//     kyoyoSubject をそのまま使える。
//  3. prerequisites / leadsTo は「集約時に必ず解決できる id」だけを指している
//     （本ファイル内の g1 単元 + 既存の sansuu.g1.numbers-to-10）。将来の他学年 kyoyo 単元への
//     forward link はバリデーション緑維持のため意図的に未記載。中央/後続波で拡張可能。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  SubjectId,
} from "@/types/curriculum";

// kyoyo は SubjectId 未対応 → 局所的に型を吸収（上の申し送り参照）。
const KYOYO: SubjectId = "kyoyo";

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

// ── 領域（スコープ案の6領域に対応） ──────────────────────

export const kyoyoG1Domains: Domain[] = [
  {
    id: "kyoyo.life-money",
    subjectId: KYOYO,
    name: "おかね・くらし",
    formalName: "お金と暮らし",
  },
  {
    id: "kyoyo.world-culture",
    subjectId: KYOYO,
    name: "せかいの国・ぶんか",
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
    id: "kyoyo.language-proverbs",
    subjectId: KYOYO,
    name: "ことば・ことわざ",
    formalName: "言葉・ことわざ",
  },
  {
    id: "kyoyo.body-manners",
    subjectId: KYOYO,
    name: "からだ・マナー",
    formalName: "体・マナー",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし）:
//
//   world-flags ──▶ great-people
//   (sansuu.g1.numbers-to-10) ──▶ money-basics
//   seasons-weather / proverbs / body-manners は g1 では入口（前提なし）
//
const U = {
  worldFlags: "kyoyo.g1.world-flags",
  greatPeople: "kyoyo.g1.great-people",
  seasonsWeather: "kyoyo.g1.seasons-weather",
  moneyBasics: "kyoyo.g1.money-basics",
  proverbs: "kyoyo.g1.proverbs",
  bodyManners: "kyoyo.g1.body-manners",
} as const;

export const kyoyoG1Units: Unit[] = [
  {
    id: U.worldFlags,
    subjectId: KYOYO,
    grade: 1,
    domainId: "kyoyo.world-culture",
    title: "せかいの国とこっき",
    order: 1,
    realWorldUse:
      "テレビや オリンピックで いろいろな {国|くに}の こっきを {見|み}たときに、どこの {国|くに}か わかるよ。",
    leadsTo: [U.greatPeople],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.greatPeople,
    subjectId: KYOYO,
    grade: 1,
    domainId: "kyoyo.people-history",
    title: "いじんと はつめい",
    order: 2,
    realWorldUse:
      "{昔|むかし}の すごい {人|ひと}や はつめいを しると、いまの べんりな くらしの りゆうが わかるよ。",
    leadsTo: [],
    prerequisites: [U.worldFlags],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.seasonsWeather,
    subjectId: KYOYO,
    grade: 1,
    domainId: "kyoyo.nature-space",
    title: "きせつと てんき",
    order: 3,
    realWorldUse:
      "あしたの てんきや きせつが わかると、きょう {着|き}る ふくや もちものを えらべるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.moneyBasics,
    subjectId: KYOYO,
    grade: 1,
    domainId: "kyoyo.life-money",
    title: "おかねの やくわり",
    order: 4,
    realWorldUse:
      "おかいものを するときや おこづかいを つかうときに、いくら はらうか・おつりは いくらか わかるよ。",
    leadsTo: [],
    // 数をかぞえる力が前提（既存の算数小1単元へ cross-subject link）
    prerequisites: ["sansuu.g1.numbers-to-10"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.proverbs,
    subjectId: KYOYO,
    grade: 1,
    domainId: "kyoyo.language-proverbs",
    title: "やさしい ことわざ",
    order: 5,
    realWorldUse:
      "ことわざを しると、{昔|むかし}の {人|ひと}の ちえを みじかい ことばで おぼえられるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.bodyManners,
    subjectId: KYOYO,
    grade: 1,
    domainId: "kyoyo.body-manners",
    title: "からだと あいさつ",
    order: 6,
    realWorldUse:
      "じぶんの からだを たいせつに したり、おともだちと なかよく するときに やくに たつよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 固定問題（教養は知識選択系 = choice 中心・全問 explanation 必須） ──────────

const worldFlagsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.worldFlags}.q-1`,
    unitId: U.worldFlags,
    prompt: "{日本|にほん}の こっき（ひのまる）の まんなかの いろは？",
    explanation: "ひのまるは しろい はたに あかい まるが かいてあるよ。",
    format: "choice",
    choices: ["あか", "あお", "みどり", "きいろ"],
    answer: "あか",
  },
  {
    id: `${U.worldFlags}.q-2`,
    unitId: U.worldFlags,
    prompt: "「ニーハオ」は どこの {国|くに}の あいさつ？",
    explanation: "「ニーハオ」は {中国語|ちゅうごくご}の こんにちは だよ。",
    format: "choice",
    choices: ["{中国|ちゅうごく}", "アメリカ", "フランス", "インド"],
    answer: "{中国|ちゅうごく}",
  },
  {
    id: `${U.worldFlags}.q-3`,
    unitId: U.worldFlags,
    prompt: "{地球|ちきゅう}には だいたい いくつの {国|くに}が ある？",
    explanation: "せかいには 190より おおくの {国|くに}が あるよ。",
    format: "choice",
    choices: ["190いじょう", "10ぐらい", "3つ", "1つ"],
    answer: "190いじょう",
  },
  {
    id: `${U.worldFlags}.q-4`,
    unitId: U.worldFlags,
    prompt: "「ハロー」は なに{語|ご}の あいさつ？",
    explanation: "「ハロー」は {英語|えいご}の あいさつ だよ。",
    format: "choice",
    choices: ["{英語|えいご}", "にほんご", "かんこくご", "スペイン{語|ご}"],
    answer: "{英語|えいご}",
  },
  {
    id: `${U.worldFlags}.q-5`,
    unitId: U.worldFlags,
    prompt: "こっきは なんの ために ある？",
    explanation: "こっきは その {国|くに}を あらわす たいせつな しるし だよ。",
    format: "choice",
    choices: ["{国|くに}の しるし", "たべもの", "のりもの", "どうぐ"],
    answer: "{国|くに}の しるし",
  },
];

const greatPeopleQuestions: ChoiceQuestion[] = [
  {
    id: `${U.greatPeople}.q-1`,
    unitId: U.greatPeople,
    prompt: "{電球|でんきゅう}（あかり）を ひろめた はつめいかは だれ？",
    explanation: "エジソンは {電球|でんきゅう}など たくさんの ものを はつめいしたよ。",
    format: "choice",
    choices: ["エジソン", "ピカソ", "モーツァルト", "コロンブス"],
    answer: "エジソン",
  },
  {
    id: `${U.greatPeople}.q-2`,
    unitId: U.greatPeople,
    prompt: "「いじん」とは どんな {人|ひと}？",
    explanation: "みんなの ためになる ことを した {人|ひと}を いじんと いうよ。",
    format: "choice",
    choices: ["せかいを よくした すごい {人|ひと}", "ねぼうな {人|ひと}", "おこりんぼな {人|ひと}", "いつも ねている {人|ひと}"],
    answer: "せかいを よくした すごい {人|ひと}",
  },
  {
    id: `${U.greatPeople}.q-3`,
    unitId: U.greatPeople,
    prompt: "{電球|でんきゅう}が ない {昔|むかし}、よるは どうやって あかりを とった？",
    explanation: "{電気|でんき}が ない ころは ひや ろうそくを つかっていたよ。",
    format: "choice",
    choices: ["ひや ろうそく", "スマホ", "テレビ", "でんち"],
    answer: "ひや ろうそく",
  },
  {
    id: `${U.greatPeople}.q-4`,
    unitId: U.greatPeople,
    prompt: "おさつ（おかね）に かいてあるのは？",
    explanation: "おさつには れきしに のこる えらい {人|ひと}の かおが かいてあるよ。",
    format: "choice",
    choices: ["{昔|むかし}の えらい {人|ひと}の かお", "どうぶつ", "おかし", "くるま"],
    answer: "{昔|むかし}の えらい {人|ひと}の かお",
  },
  {
    id: `${U.greatPeople}.q-5`,
    unitId: U.greatPeople,
    prompt: "あたらしい はつめいが できると くらしは どうなる？",
    explanation: "あたらしい はつめいで くらしは どんどん べんりに なるよ。",
    format: "choice",
    choices: ["べんりに なる", "こまる", "なにも かわらない", "くらく なる"],
    answer: "べんりに なる",
  },
];

const seasonsWeatherQuestions: ChoiceQuestion[] = [
  {
    id: `${U.seasonsWeather}.q-1`,
    unitId: U.seasonsWeather,
    prompt: "さくらが さく きせつは？",
    explanation: "さくらは あたたかい はるに さくよ。",
    format: "choice",
    choices: ["はる", "なつ", "あき", "ふゆ"],
    answer: "はる",
  },
  {
    id: `${U.seasonsWeather}.q-2`,
    unitId: U.seasonsWeather,
    prompt: "ゆきが ふる いちばん さむい きせつは？",
    explanation: "ゆきは いちばん さむい ふゆに ふるよ。",
    format: "choice",
    choices: ["ふゆ", "なつ", "はる", "あき"],
    answer: "ふゆ",
  },
  {
    id: `${U.seasonsWeather}.q-3`,
    unitId: U.seasonsWeather,
    prompt: "{日本|にほん}の きせつは いくつ ある？",
    explanation: "はる・なつ・あき・ふゆの 4つだよ。",
    format: "choice",
    choices: ["4つ", "2つ", "12こ", "1つ"],
    answer: "4つ",
  },
  {
    id: `${U.seasonsWeather}.q-4`,
    unitId: U.seasonsWeather,
    prompt: "あめの ひに もっていくと よい ものは？",
    explanation: "あめに ぬれないように かさを もっていくよ。",
    format: "choice",
    choices: ["かさ", "サングラス", "てぶくろ", "うきわ"],
    answer: "かさ",
  },
  {
    id: `${U.seasonsWeather}.q-5`,
    unitId: U.seasonsWeather,
    prompt: "はっぱ（もみじ）が あかや きいろに なって おちる きせつは？",
    explanation: "あきに なると はっぱが あかや きいろに なって おちるよ。",
    format: "choice",
    choices: ["あき", "はる", "なつ", "ふゆ"],
    answer: "あき",
  },
];

const moneyBasicsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.moneyBasics}.q-1`,
    unitId: U.moneyBasics,
    prompt: "100えんで 60えんの おかしを {買|か}いました。おつりは いくら？",
    explanation: "100から 60を ひくと 40。おつりは 40えんだよ。",
    format: "choice",
    choices: ["40えん", "60えん", "160えん", "0えん"],
    answer: "40えん",
  },
  {
    id: `${U.moneyBasics}.q-2`,
    unitId: U.moneyBasics,
    prompt: "10えんだまが 3つ あります。ぜんぶで いくら？",
    explanation: "10が 3つで 10＋10＋10＝30。30えんだよ。",
    format: "choice",
    choices: ["30えん", "13えん", "103えん", "3えん"],
    answer: "30えん",
  },
  {
    id: `${U.moneyBasics}.q-3`,
    unitId: U.moneyBasics,
    prompt: "「もったいない」とは どんな いみ？",
    explanation: "ものや おかねを むだに しないで たいせつに することだよ。",
    format: "choice",
    choices: ["むだに しないこと", "たくさん すてること", "はやく つかうこと", "かくすこと"],
    answer: "むだに しないこと",
  },
  {
    id: `${U.moneyBasics}.q-4`,
    unitId: U.moneyBasics,
    prompt: "おかねで できる ことは？",
    explanation: "おかねは ほしい ものと こうかん するために つかうよ。",
    format: "choice",
    choices: ["ものと こうかんする", "そらを とぶ", "あめを ふらす", "じかんを とめる"],
    answer: "ものと こうかんする",
  },
  {
    id: `${U.moneyBasics}.q-5`,
    unitId: U.moneyBasics,
    prompt: "この なかで いちばん たかい（かちが おおきい）おかねは？",
    explanation: "100えんが この なかで いちばん おおきい かちだよ。",
    format: "choice",
    choices: ["100えん", "10えん", "5えん", "1えん"],
    answer: "100えん",
  },
];

const proverbsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.proverbs}.q-1`,
    unitId: U.proverbs,
    prompt: "「さるも {木|き}から おちる」の いみは？",
    explanation: "とくいな ことでも しっぱいする ことが あるという いみだよ。",
    format: "choice",
    choices: ["じょうずでも しっぱいする ことが ある", "さるは {木|き}が すき", "やまは たかい", "あめが ふる"],
    answer: "じょうずでも しっぱいする ことが ある",
  },
  {
    id: `${U.proverbs}.q-2`,
    unitId: U.proverbs,
    prompt: "「ちりも つもれば やまと なる」の いみは？",
    explanation: "ちいさな ことも つみかさねれば おおきな ものに なるよ。",
    format: "choice",
    choices: ["すこしずつでも つづければ おおきく なる", "やまは たかい", "そうじは たいへん", "ちりは きたない"],
    answer: "すこしずつでも つづければ おおきく なる",
  },
  {
    id: `${U.proverbs}.q-3`,
    unitId: U.proverbs,
    prompt: "ことわざは いつから つたわって いる ことば？",
    explanation: "ことわざは {昔|むかし}の {人|ひと}が のこした ちえの ことばだよ。",
    format: "choice",
    choices: ["{昔|むかし}から", "きょうから", "あしたから", "らいねんから"],
    answer: "{昔|むかし}から",
  },
  {
    id: `${U.proverbs}.q-4`,
    unitId: U.proverbs,
    prompt: "「いそがば まわれ」に いちばん ちかい かんがえは？",
    explanation: "いそぐ ときほど あわてず あんぜんな ほうほうが けっきょく はやいよ。",
    format: "choice",
    choices: ["あんぜんな みちを いくと けっきょく はやい", "とにかく はしる", "とまって ねる", "あきらめる"],
    answer: "あんぜんな みちを いくと けっきょく はやい",
  },
  {
    id: `${U.proverbs}.q-5`,
    unitId: U.proverbs,
    prompt: "ことわざを おぼえると なにが よい？",
    explanation: "みじかい ことばで {昔|むかし}の {人|ひと}の ちえを まなべるよ。",
    format: "choice",
    choices: ["{昔|むかし}の ちえが わかる", "せが のびる", "おかねが もらえる", "はやく はしれる"],
    answer: "{昔|むかし}の ちえが わかる",
  },
];

const bodyMannersQuestions: ChoiceQuestion[] = [
  {
    id: `${U.bodyManners}.q-1`,
    unitId: U.bodyManners,
    prompt: "ごはんを たべた あとに することは？",
    explanation: "たべた あとは はみがきを して、むしばから はを まもろう。",
    format: "choice",
    choices: ["はみがき", "すぐ はしる", "なにも しない", "ずっと ねる"],
    answer: "はみがき",
  },
  {
    id: `${U.bodyManners}.q-2`,
    unitId: U.bodyManners,
    prompt: "ものを もらった とき なんて いう？",
    explanation: "してもらったら「ありがとう」と おれいを いおうね。",
    format: "choice",
    choices: ["ありがとう", "さようなら", "おやすみ", "いってきます"],
    answer: "ありがとう",
  },
  {
    id: `${U.bodyManners}.q-3`,
    unitId: U.bodyManners,
    prompt: "からだを げんきに うごかす もとに なる ものは？",
    explanation: "ごはんの えいようで からだは げんきに うごくよ。",
    format: "choice",
    choices: ["たべもの（えいよう）", "テレビ", "ゲーム", "おもちゃ"],
    answer: "たべもの（えいよう）",
  },
  {
    id: `${U.bodyManners}.q-4`,
    unitId: U.bodyManners,
    prompt: "あさ ともだちに あった とき なんて いう？",
    explanation: "あさの あいさつは「おはよう」だよ。",
    format: "choice",
    choices: ["おはよう", "おやすみ", "ごめんね", "いただきます"],
    answer: "おはよう",
  },
  {
    id: `${U.bodyManners}.q-5`,
    unitId: U.bodyManners,
    prompt: "わるい ことを して しまった とき なんて いう？",
    explanation: "わるかった ときは「ごめんね」と すなおに あやまろう。",
    format: "choice",
    choices: ["ごめんね", "ありがとう", "おはよう", "やったー"],
    answer: "ごめんね",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// learn=図/emoji で段階的に説明、test=choice中心・全問 explanation。

export const kyoyoG1Contents: Record<string, UnitContent> = {
  [U.worldFlags]: {
    unitId: U.worldFlags,
    learn: {
      unitId: U.worldFlags,
      steps: [
        {
          heading: "{世界|せかい}には たくさんの {国|くに}",
          body: "{地球|ちきゅう}には 190いじょうの {国|くに}が あるよ。それぞれ ことばや たべものが ちがうんだ。",
          visual: { kind: "emoji", value: "🌍", caption: "ひとつの {地球|ちきゅう}に たくさんの {国|くに}" },
        },
        {
          heading: "こっきって なに？",
          body: "{国|くに}には それぞれ「こっき」と いう はたが あるよ。{日本|にほん}の こっきは しろに あかい まる（ひのまる）だね。",
          visual: { kind: "emoji", value: "🇯🇵", caption: "{日本|にほん}の こっき（ひのまる）" },
        },
        {
          heading: "せかいの あいさつ",
          body: "{英語|えいご}では「ハロー」、{中国語|ちゅうごくご}では「ニーハオ」。{国|くに}に よって あいさつが ちがうよ。",
          visual: { kind: "emoji", value: "👋", caption: "こんにちは を いろいろな ことばで" },
        },
      ],
    },
    test: {
      unitId: U.worldFlags,
      questions: worldFlagsQuestions,
      questionCount: 5,
    },
  },

  [U.greatPeople]: {
    unitId: U.greatPeople,
    learn: {
      unitId: U.greatPeople,
      steps: [
        {
          heading: "いじんって なに？",
          body: "せかいを よくする ことを した すごい {人|ひと}を「いじん」と いうよ。",
          visual: { kind: "emoji", value: "🌟", caption: "みんなの ためになる ことを した {人|ひと}" },
        },
        {
          heading: "はつめいで くらしが かわる",
          body: "あかりの {電球|でんきゅう}を ひろめた エジソンの おかげで、よるも あかるく すごせるよ。",
          visual: { kind: "emoji", value: "💡", caption: "エジソンの {電球|でんきゅう}" },
        },
        {
          heading: "おさつに のこる いじん",
          body: "おさつ（おかね）には {昔|むかし}の えらい {人|ひと}の かおが かいてあるよ。さがして みよう。",
          visual: { kind: "emoji", value: "💴", caption: "おさつの かお" },
        },
      ],
    },
    test: {
      unitId: U.greatPeople,
      questions: greatPeopleQuestions,
      questionCount: 5,
    },
  },

  [U.seasonsWeather]: {
    unitId: U.seasonsWeather,
    learn: {
      unitId: U.seasonsWeather,
      steps: [
        {
          heading: "4つの きせつ",
          body: "{日本|にほん}には はる・なつ・あき・ふゆの 4つの きせつが あるよ。",
          visual: { kind: "emoji", value: "🌸☀️🍁⛄", caption: "はる・なつ・あき・ふゆ" },
        },
        {
          heading: "てんきの いろいろ",
          body: "はれ・くもり・あめ・ゆきなど、そらの ようすを「てんき」と いうよ。",
          visual: { kind: "emoji", value: "🌦️", caption: "きょうの てんきは？" },
        },
        {
          heading: "なぜ きせつが ある？",
          body: "{地球|ちきゅう}が ちょっと かたむいて {太陽|たいよう}の まわりを まわるから、あつい きせつと さむい きせつが できるよ。",
          visual: { kind: "emoji", value: "🌍☀️", caption: "{地球|ちきゅう}は {太陽|たいよう}の まわりを まわる" },
        },
      ],
    },
    test: {
      unitId: U.seasonsWeather,
      questions: seasonsWeatherQuestions,
      questionCount: 5,
    },
  },

  [U.moneyBasics]: {
    unitId: U.moneyBasics,
    learn: {
      unitId: U.moneyBasics,
      steps: [
        {
          heading: "お{金|かね}って なに？",
          body: "ものを {買|か}うときに {使|つか}う たいせつな ものだよ。ほしい ものと こうかんできるんだ。",
          visual: { kind: "emoji", value: "💰", caption: "おかねで ものを かう" },
        },
        {
          heading: "コインの しゅるい",
          body: "{日本|にほん}の おかねには 1えん・5えん・10えん・100えん などが あるよ。あつめると おおきな かずに なるね。",
          visual: { kind: "emoji", value: "🪙", caption: "いろいろな コイン" },
        },
        {
          heading: "もったいない の {気持|きも}ち",
          body: "ものや おかねを むだに しないことを「もったいない」と いうよ。たいせつに つかおうね。",
          visual: { kind: "emoji", value: "♻️", caption: "たいせつに つかう" },
        },
      ],
    },
    test: {
      unitId: U.moneyBasics,
      questions: moneyBasicsQuestions,
      questionCount: 5,
    },
  },

  [U.proverbs]: {
    unitId: U.proverbs,
    learn: {
      unitId: U.proverbs,
      steps: [
        {
          heading: "ことわざって なに？",
          body: "{昔|むかし}から つたわる、ちえや たいせつな おしえを みじかく あらわした ことばだよ。",
          visual: { kind: "emoji", value: "📖", caption: "{昔|むかし}の {人|ひと}の ちえ" },
        },
        {
          heading: "「さるも {木|き}から おちる」",
          body: "{木|き}のぼりが じょうずな さるでも、ときには {木|き}から おちる。とくいな ことでも しっぱいする ことが あるよ。",
          visual: { kind: "emoji", value: "🐒", caption: "じょうずでも しっぱいする" },
        },
        {
          heading: "「ちりも つもれば やまと なる」",
          body: "ちいさな ちりも つもれば やまに なる。すこしずつでも つづければ おおきく なるという おしえだよ。",
          visual: { kind: "emoji", value: "⛰️", caption: "すこしずつ つみかさねる" },
        },
      ],
    },
    test: {
      unitId: U.proverbs,
      questions: proverbsQuestions,
      questionCount: 5,
    },
  },

  [U.bodyManners]: {
    unitId: U.bodyManners,
    learn: {
      unitId: U.bodyManners,
      steps: [
        {
          heading: "からだの しくみ",
          body: "ごはんを たべると、おなかの なかで えいように なって、からだが げんきに うごくよ。",
          visual: { kind: "emoji", value: "🍚", caption: "たべて げんきに なる" },
        },
        {
          heading: "はを たいせつに",
          body: "たべた あとは はみがきを しよう。むしばを ふせいで、じょうぶな はを まもれるよ。",
          visual: { kind: "emoji", value: "🦷", caption: "はみがきで はを まもる" },
        },
        {
          heading: "あいさつと マナー",
          body: "「おはよう」「ありがとう」「ごめんね」が いえると、みんなと なかよく なれるよ。",
          visual: { kind: "emoji", value: "🙇", caption: "あいさつは なかよしの もと" },
        },
      ],
    },
    test: {
      unitId: U.bodyManners,
      questions: bodyMannersQuestions,
      questionCount: 5,
    },
  },
};
