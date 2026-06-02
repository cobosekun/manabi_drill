// ══════════════════════════════════════════
// カリキュラム: 英語（えいご）小4（外国語活動・中学年）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 英語は外国語活動として「聞く・話す（やりとり）」中心。テストは4択の確認形式。
// 英単語は「表記（よみがな）」で提示し、解説は日本語ひらがな中心。
// prerequisites は小3単元（eigo.g3.*）を跨いで参照する（学年間ロードマップ）。
// 集約は中央（index.ts）で行うため、subject/domain の重複は中央側で id 重複排除する想定。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// g3 と同一の教科定義（中央集約時に id で重複排除される前提）。

export const eigoSubject: Subject = {
  id: "eigo",
  name: "えいご",
  formalName: "英語（外国語活動）",
  emoji: "🔤",
  theme: "rose",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// g3 と同じ領域タクソノミーを継続使用（学年非依存のカテゴリ）。

export const eigoG4Domains: Domain[] = [
  {
    id: "eigo.communication",
    subjectId: "eigo",
    name: "あいさつとやりとり",
    formalName: "コミュニケーション（あいさつ・自己表現）",
  },
  {
    id: "eigo.letters",
    subjectId: "eigo",
    name: "アルファベット",
    formalName: "文字（小文字）",
  },
  {
    id: "eigo.words",
    subjectId: "eigo",
    name: "ことば（ようび・てんき・もの）",
    formalName: "語彙（曜日・天気・身のまわりの物）",
  },
];

// ── 小3単元 id（前提として参照する。中央集約時に解決される） ──
const G3 = {
  alphabetUpper: "eigo.g3.alphabet-uppercase",
  numbers: "eigo.g3.numbers-1-20",
  feelings: "eigo.g3.feelings",
  likes: "eigo.g3.likes",
} as const;

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺に DAG 化。g3 → g4 へ繋がる）:
//
//   g3.alphabet-uppercase ─▶ alphabet-lowercase
//   g3.numbers-1-20 ───────▶ days-and-months ─▶ daily-routine
//   g3.feelings ───────────▶ weather-and-play
//   g3.likes ──────────────▶ i-want ─▶ stationery-and-food
//
const U = {
  alphabetLower: "eigo.g4.alphabet-lowercase",
  daysMonths: "eigo.g4.days-and-months",
  weatherPlay: "eigo.g4.weather-and-play",
  iWant: "eigo.g4.i-want",
  dailyRoutine: "eigo.g4.daily-routine",
  stationeryFood: "eigo.g4.stationery-and-food",
} as const;

export const eigoG4Units: Unit[] = [
  {
    id: U.alphabetLower,
    subjectId: "eigo",
    grade: 4,
    domainId: "eigo.letters",
    title: "アルファベット（小文字）",
    order: 1,
    realWorldUse: "ほんや ノート、メールの もじは 小文字が おおいよ。大文字と あわせて よめるように なるよ。",
    leadsTo: [],
    prerequisites: [G3.alphabetUpper],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.daysMonths,
    subjectId: "eigo",
    grade: 4,
    domainId: "eigo.words",
    title: "ようびと つき（days & months）",
    order: 2,
    realWorldUse: "カレンダーや よていを えいごで「Monday」「January」のように よんだり いえたり できるよ。",
    leadsTo: [U.dailyRoutine],
    prerequisites: [G3.numbers],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.weatherPlay,
    subjectId: "eigo",
    grade: 4,
    domainId: "eigo.words",
    title: "てんきと あそび（weather & play）",
    order: 3,
    realWorldUse: "きょうの てんきを えいごで いったり、「Let's play！」と ともだちを あそびに さそえるよ。",
    leadsTo: [],
    prerequisites: [G3.feelings],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.iWant,
    subjectId: "eigo",
    grade: 4,
    domainId: "eigo.communication",
    title: "ほしいもの（I want〜）",
    order: 4,
    realWorldUse: "おみせや きゅうしょくで「I want 〜.」と じぶんの ほしい ものを つたえられるよ。",
    leadsTo: [U.stationeryFood],
    prerequisites: [G3.likes],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.dailyRoutine,
    subjectId: "eigo",
    grade: 4,
    domainId: "eigo.communication",
    title: "いちにちの せいかつ（daily routine）",
    order: 5,
    realWorldUse: "「I get up.」「I go to school.」のように、じぶんの いちにちを えいごで しょうかいできるよ。",
    leadsTo: [],
    prerequisites: [U.daysMonths],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.stationeryFood,
    subjectId: "eigo",
    grade: 4,
    domainId: "eigo.words",
    title: "ぶんぼうぐと たべもの（things & food）",
    order: 6,
    realWorldUse: "ふでばこの なかみや すきな たべものを えいごの たんごで いえるように なるよ。",
    leadsTo: [],
    prerequisites: [U.iWant],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は日本語ひらがな中心。

// アルファベット（小文字）
const alphabetLowerQuestions: ChoiceQuestion[] = [
  {
    id: `${U.alphabetLower}.q-1`,
    unitId: U.alphabetLower,
    prompt: "大文字「A」の 小文字は どれ かな？",
    explanation: "大文字 A の 小文字は「a」だよ。かたちが すこし ちがうから きをつけよう。",
    visual: { kind: "emoji", value: "🔠➡️🔡", caption: "A → a" },
    format: "choice",
    choices: ["a", "e", "o", "n"],
    answer: "a",
  },
  {
    id: `${U.alphabetLower}.q-2`,
    unitId: U.alphabetLower,
    prompt: "小文字「b」の 大文字は どれ かな？",
    explanation: "小文字 b の 大文字は「B」だよ。b は ぼうが ひだり、d は ぼうが みぎだよ。",
    visual: { kind: "emoji", value: "🔡➡️🔠", caption: "b → B" },
    format: "choice",
    choices: ["B", "D", "P", "R"],
    answer: "B",
  },
  {
    id: `${U.alphabetLower}.q-3`,
    unitId: U.alphabetLower,
    prompt: "小文字アルファベットの いちばん さいしょは どれ かな？",
    explanation: "小文字も a から はじまるよ。a・b・c…と じゅんばんは 大文字と おなじだよ。",
    visual: { kind: "emoji", value: "🔡", caption: "a b c …" },
    format: "choice",
    choices: ["a", "z", "x", "m"],
    answer: "a",
  },
  {
    id: `${U.alphabetLower}.q-4`,
    unitId: U.alphabetLower,
    prompt: "「dog（いぬ）」の さいしょの 小文字は どれ かな？",
    explanation: "dog は ディー・オー…と よむよ。さいしょの もじは 小文字の「d」だね。",
    visual: { kind: "emoji", value: "🐶", caption: "dog" },
    format: "choice",
    choices: ["d", "b", "g", "o"],
    answer: "d",
  },
  {
    id: `${U.alphabetLower}.q-5`,
    unitId: U.alphabetLower,
    prompt: "まちがえやすい 小文字「p」と にている もじは どれ かな？",
    explanation: "p は したに ぼうが でるよ。にている「q」は ぼうの むきが はんたいだよ。よく みくらべよう。",
    visual: { kind: "emoji", value: "🔍", caption: "p / q" },
    format: "choice",
    choices: ["q", "a", "e", "s"],
    answer: "q",
  },
];

// ようびと つき
const daysMonthsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.daysMonths}.q-1`,
    unitId: U.daysMonths,
    prompt: "「Monday（マンデー）」は なんようび かな？",
    explanation: "Monday は げつようび だよ。Sunday(にち)・Monday(げつ)…と つづくよ。",
    visual: { kind: "emoji", value: "📅", caption: "Monday" },
    format: "choice",
    choices: ["げつようび", "にちようび", "きんようび", "どようび"],
    answer: "げつようび",
  },
  {
    id: `${U.daysMonths}.q-2`,
    unitId: U.daysMonths,
    prompt: "「にちようび」は えいごで なんと いうかな？",
    explanation: "にちようびは「Sunday（サンデー）」だよ。1しゅうかんの さいしょの ひだね。",
    visual: { kind: "emoji", value: "☀️📅", caption: "Sunday" },
    format: "choice",
    choices: ["Sunday", "Monday", "Friday", "Tuesday"],
    answer: "Sunday",
  },
  {
    id: `${U.daysMonths}.q-3`,
    unitId: U.daysMonths,
    prompt: "「January（ジャニュアリー）」は なんがつ かな？",
    explanation: "January は 1がつ だよ。1ねんの さいしょの つきだね。",
    visual: { kind: "emoji", value: "🎍", caption: "January" },
    format: "choice",
    choices: ["1がつ", "2がつ", "6がつ", "12がつ"],
    answer: "1がつ",
  },
  {
    id: `${U.daysMonths}.q-4`,
    unitId: U.daysMonths,
    prompt: "「What day is it？」の いみは どれ かな？",
    explanation: "「What day（ワット デイ）」は「なんようび？」と きく ことばだよ。",
    visual: { kind: "emoji", value: "🤔📅", caption: "What day？" },
    format: "choice",
    choices: ["なんようび？", "なんじ？", "なにいろ？", "いくつ？"],
    answer: "なんようび？",
  },
  {
    id: `${U.daysMonths}.q-5`,
    unitId: U.daysMonths,
    prompt: "「December（ディセンバー）」は なんがつ かな？",
    explanation: "December は 12がつ だよ。1ねんの さいごの つきだね。",
    visual: { kind: "emoji", value: "🎄", caption: "December" },
    format: "choice",
    choices: ["12がつ", "10がつ", "11がつ", "1がつ"],
    answer: "12がつ",
  },
];

// てんきと あそび
const weatherPlayQuestions: ChoiceQuestion[] = [
  {
    id: `${U.weatherPlay}.q-1`,
    unitId: U.weatherPlay,
    prompt: "「sunny（サニー）」は どんな てんき かな？",
    explanation: "sunny は はれ だよ。たいようが でて いる ひだね。",
    visual: { kind: "emoji", value: "☀️", caption: "sunny" },
    format: "choice",
    choices: ["はれ", "あめ", "くもり", "ゆき"],
    answer: "はれ",
  },
  {
    id: `${U.weatherPlay}.q-2`,
    unitId: U.weatherPlay,
    prompt: "「あめ」の てんきは えいごで なんと いうかな？",
    explanation: "あめは「rainy（レイニー）」だよ。かさが いる ひだね。",
    visual: { kind: "emoji", value: "🌧️", caption: "rainy" },
    format: "choice",
    choices: ["rainy", "sunny", "snowy", "windy"],
    answer: "rainy",
  },
  {
    id: `${U.weatherPlay}.q-3`,
    unitId: U.weatherPlay,
    prompt: "「How's the weather？」の いみは どれ かな？",
    explanation: "「How's the weather？（ハウズ ザ ウェザー）」は「てんきは どう？」と きく ことばだよ。",
    visual: { kind: "emoji", value: "🤔🌤️", caption: "How's the weather？" },
    format: "choice",
    choices: ["てんきは どう？", "なんようび？", "げんき？", "なにが すき？"],
    answer: "てんきは どう？",
  },
  {
    id: `${U.weatherPlay}.q-4`,
    unitId: U.weatherPlay,
    prompt: "「Let's play！」の いみは どれ かな？",
    explanation: "「Let's play！（レッツ プレイ）」は「あそぼう！」と さそう ことばだよ。",
    visual: { kind: "emoji", value: "⚽🙌", caption: "Let's play!" },
    format: "choice",
    choices: ["あそぼう！", "たべよう！", "ねよう！", "いこう！"],
    answer: "あそぼう！",
  },
  {
    id: `${U.weatherPlay}.q-5`,
    unitId: U.weatherPlay,
    prompt: "「snowy（スノーウィ）」は どんな てんき かな？",
    explanation: "snowy は ゆき だよ。しろい ゆきが ふる さむい ひだね。",
    visual: { kind: "emoji", value: "❄️", caption: "snowy" },
    format: "choice",
    choices: ["ゆき", "はれ", "あめ", "かぜ"],
    answer: "ゆき",
  },
];

// ほしいもの（I want〜）
const iWantQuestions: ChoiceQuestion[] = [
  {
    id: `${U.iWant}.q-1`,
    unitId: U.iWant,
    prompt: "「I want 〜.」の いみは どれ かな？",
    explanation: "「I want（アイ ウォント）〜.」は「わたしは 〜が ほしい」だよ。ほしい ものを つたえられるね。",
    visual: { kind: "emoji", value: "🙋🎁", caption: "I want …" },
    format: "choice",
    choices: ["わたしは 〜が ほしい", "わたしは 〜が すき", "〜は どこ？", "〜を あげる"],
    answer: "わたしは 〜が ほしい",
  },
  {
    id: `${U.iWant}.q-2`,
    unitId: U.iWant,
    prompt: "「I want an apple.」の いみは どれ かな？",
    explanation: "apple は りんご。「I want an apple.」で「りんごが ほしい」だよ。",
    visual: { kind: "emoji", value: "🍎", caption: "I want an apple." },
    format: "choice",
    choices: ["りんごが ほしい", "りんごが すき", "りんごを たべた", "りんごは ない"],
    answer: "りんごが ほしい",
  },
  {
    id: `${U.iWant}.q-3`,
    unitId: U.iWant,
    prompt: "「What do you want？」の いみは どれ かな？",
    explanation: "「What do you want？（ワット ドゥ ユー ウォント）」は「なにが ほしい？」と きく ことばだよ。",
    visual: { kind: "emoji", value: "🤔❓", caption: "What do you want？" },
    format: "choice",
    choices: ["なにが ほしい？", "なにが すき？", "どこに いきたい？", "だれ？"],
    answer: "なにが ほしい？",
  },
  {
    id: `${U.iWant}.q-4`,
    unitId: U.iWant,
    prompt: "ほしい ものを つたえる ときに つかう ことばは どれ かな？",
    explanation: "ほしい ときは「I want 〜.」を つかうよ。「I like 〜.」は すきな もの だよ。",
    visual: { kind: "emoji", value: "🛒", caption: "I want …" },
    format: "choice",
    choices: ["I want", "Goodbye", "How are you", "Thank you"],
    answer: "I want",
  },
  {
    id: `${U.iWant}.q-5`,
    unitId: U.iWant,
    prompt: "ていねいに たのむ「〜, please.」の「please」の いみは？",
    explanation: "please（プリーズ）は「おねがいします」だよ。さいごに つけると ていねいに なるよ。",
    visual: { kind: "emoji", value: "🙏", caption: "…, please." },
    format: "choice",
    choices: ["おねがいします", "ありがとう", "ごめんね", "さようなら"],
    answer: "おねがいします",
  },
];

// いちにちの せいかつ（daily routine）
const dailyRoutineQuestions: ChoiceQuestion[] = [
  {
    id: `${U.dailyRoutine}.q-1`,
    unitId: U.dailyRoutine,
    prompt: "「I get up.」の いみは どれ かな？",
    explanation: "「get up（ゲット アップ）」は「おきる」だよ。あさ ベッドから おきる ことだね。",
    visual: { kind: "emoji", value: "🛏️🌅", caption: "I get up." },
    format: "choice",
    choices: ["おきる", "ねる", "たべる", "あるく"],
    answer: "おきる",
  },
  {
    id: `${U.dailyRoutine}.q-2`,
    unitId: U.dailyRoutine,
    prompt: "「I go to bed.」の いみは どれ かな？",
    explanation: "「go to bed（ゴー トゥ ベッド）」は「ねる」だよ。よる ベッドに いく ことだね。",
    visual: { kind: "emoji", value: "🛌😴", caption: "I go to bed." },
    format: "choice",
    choices: ["ねる", "おきる", "あそぶ", "はしる"],
    answer: "ねる",
  },
  {
    id: `${U.dailyRoutine}.q-3`,
    unitId: U.dailyRoutine,
    prompt: "「I eat breakfast.」の いみは どれ かな？",
    explanation: "breakfast（ブレックファスト）は あさごはん。「I eat breakfast.」で「あさごはんを たべる」だよ。",
    visual: { kind: "emoji", value: "🍞🥚", caption: "breakfast" },
    format: "choice",
    choices: ["あさごはんを たべる", "ひるごはんを たべる", "ねる", "がっこうへ いく"],
    answer: "あさごはんを たべる",
  },
  {
    id: `${U.dailyRoutine}.q-4`,
    unitId: U.dailyRoutine,
    prompt: "「がっこうへ いく」は えいごで どれ かな？",
    explanation: "「I go to school.（ゴー トゥ スクール）」で「がっこうへ いく」だよ。",
    visual: { kind: "emoji", value: "🏫🎒", caption: "I go to school." },
    format: "choice",
    choices: ["I go to school.", "I go to bed.", "I get up.", "I eat lunch."],
    answer: "I go to school.",
  },
  {
    id: `${U.dailyRoutine}.q-5`,
    unitId: U.dailyRoutine,
    prompt: "「What time？」の いみは どれ かな？",
    explanation: "「What time？（ワット タイム）」は「なんじ？」と じかんを きく ことばだよ。",
    visual: { kind: "emoji", value: "🕐", caption: "What time？" },
    format: "choice",
    choices: ["なんじ？", "なんようび？", "どこ？", "なにいろ？"],
    answer: "なんじ？",
  },
];

// ぶんぼうぐと たべもの（things & food）
const stationeryFoodQuestions: ChoiceQuestion[] = [
  {
    id: `${U.stationeryFood}.q-1`,
    unitId: U.stationeryFood,
    prompt: "「pencil（ペンスル）」は なに かな？",
    explanation: "pencil は えんぴつ だよ。じを かく ぶんぼうぐだね。",
    visual: { kind: "emoji", value: "✏️", caption: "pencil" },
    format: "choice",
    choices: ["えんぴつ", "けしゴム", "ノート", "ものさし"],
    answer: "えんぴつ",
  },
  {
    id: `${U.stationeryFood}.q-2`,
    unitId: U.stationeryFood,
    prompt: "「けしゴム」は えいごで なんと いうかな？",
    explanation: "けしゴムは「eraser（イレイサー）」だよ。じを けす どうぐだね。",
    visual: { kind: "emoji", value: "🧽", caption: "eraser" },
    format: "choice",
    choices: ["eraser", "pencil", "ruler", "pen"],
    answer: "eraser",
  },
  {
    id: `${U.stationeryFood}.q-3`,
    unitId: U.stationeryFood,
    prompt: "「milk（ミルク）」は なに かな？",
    explanation: "milk は ぎゅうにゅう だよ。しろくて あまい のみものだね。",
    visual: { kind: "emoji", value: "🥛", caption: "milk" },
    format: "choice",
    choices: ["ぎゅうにゅう", "みず", "ジュース", "おちゃ"],
    answer: "ぎゅうにゅう",
  },
  {
    id: `${U.stationeryFood}.q-4`,
    unitId: U.stationeryFood,
    prompt: "「ぱん」は えいごで なんと いうかな？",
    explanation: "ぱんは「bread（ブレッド）」だよ。あさごはんで よく たべるね。",
    visual: { kind: "emoji", value: "🍞", caption: "bread" },
    format: "choice",
    choices: ["bread", "rice", "egg", "milk"],
    answer: "bread",
  },
  {
    id: `${U.stationeryFood}.q-5`,
    unitId: U.stationeryFood,
    prompt: "「notebook（ノートブック）」は なに かな？",
    explanation: "notebook は ノート だよ。じや えを かく ぶんぼうぐだね。",
    visual: { kind: "emoji", value: "📓", caption: "notebook" },
    format: "choice",
    choices: ["ノート", "えんぴつ", "ふでばこ", "ものさし"],
    answer: "ノート",
  },
];

export const eigoG4Contents: Record<string, UnitContent> = {
  [U.alphabetLower]: {
    unitId: U.alphabetLower,
    learn: {
      unitId: U.alphabetLower,
      steps: [
        {
          heading: "大文字と 小文字",
          body: "アルファベットには 大文字(A)と 小文字(a)が あるよ。おなじ もじでも かたちが ちがうんだ。",
          visual: { kind: "emoji", value: "🔠🔡", caption: "A a / B b / C c" },
        },
        {
          heading: "a から z まで",
          body: "小文字も a・b・c…z と じゅんばんは 大文字と おなじだよ。ぜんぶで 26もじ だね。",
          visual: { kind: "emoji", value: "🔡", caption: "a b c … z" },
        },
        {
          heading: "にている もじに ちゅうい",
          body: "b と d、p と q は かたちが にているよ。ぼうの むきを よく みて みわけよう。",
          visual: { kind: "emoji", value: "🔍", caption: "b d / p q" },
        },
      ],
    },
    test: {
      unitId: U.alphabetLower,
      questions: alphabetLowerQuestions,
      questionCount: 5,
    },
  },

  [U.daysMonths]: {
    unitId: U.daysMonths,
    learn: {
      unitId: U.daysMonths,
      steps: [
        {
          heading: "ようびの えいご",
          body: "にち=Sunday、げつ=Monday、か=Tuesday…と つづくよ。すべて さいごが「day」だね。",
          visual: { kind: "emoji", value: "📅", caption: "Sunday … Saturday" },
        },
        {
          heading: "つきの えいご",
          body: "1がつ=January、2がつ=February…12がつ=December だよ。1ねんで 12の つきが あるね。",
          visual: { kind: "emoji", value: "🗓️", caption: "January … December" },
        },
        {
          heading: "きいて みよう",
          body: "「What day is it？」は「なんようび？」。きょうの ようびを えいごで こたえてみよう。",
          visual: { kind: "emoji", value: "🤔📅", caption: "What day？" },
        },
      ],
    },
    test: {
      unitId: U.daysMonths,
      questions: daysMonthsQuestions,
      questionCount: 5,
    },
  },

  [U.weatherPlay]: {
    unitId: U.weatherPlay,
    learn: {
      unitId: U.weatherPlay,
      steps: [
        {
          heading: "てんきの えいご",
          body: "はれ=sunny、あめ=rainy、くもり=cloudy、ゆき=snowy だよ。きょうの そらは どれ かな？",
          visual: { kind: "emoji", value: "☀️🌧️☁️❄️", caption: "sunny / rainy / cloudy / snowy" },
        },
        {
          heading: "てんきを きこう",
          body: "「How's the weather？」は「てんきは どう？」。「It's sunny.」で「はれだよ」と こたえるよ。",
          visual: { kind: "emoji", value: "🌤️", caption: "How's the weather？" },
        },
        {
          heading: "あそびに さそおう",
          body: "「Let's play！」は「あそぼう！」。はれの ひは そとで あそぶと きもちいいね。",
          visual: { kind: "emoji", value: "⚽🙌", caption: "Let's play!" },
        },
      ],
    },
    test: {
      unitId: U.weatherPlay,
      questions: weatherPlayQuestions,
      questionCount: 5,
    },
  },

  [U.iWant]: {
    unitId: U.iWant,
    learn: {
      unitId: U.iWant,
      steps: [
        {
          heading: "I want 〜.",
          body: "「I want 〜.（アイ ウォント）」は「わたしは 〜が ほしい」だよ。ほしい ものを つたえられるね。",
          visual: { kind: "emoji", value: "🙋🎁", caption: "I want …" },
        },
        {
          heading: "なにが ほしい？",
          body: "「What do you want？」は「なにが ほしい？」。「I want a ball.」で「ボールが ほしい」だよ。",
          visual: { kind: "emoji", value: "⚽🤔", caption: "What do you want？" },
        },
        {
          heading: "ていねいに たのもう",
          body: "さいごに「please（プリーズ）」を つけると ていねいだよ。「An apple, please.」のように いえるね。",
          visual: { kind: "emoji", value: "🙏", caption: "…, please." },
        },
      ],
    },
    test: {
      unitId: U.iWant,
      questions: iWantQuestions,
      questionCount: 5,
    },
  },

  [U.dailyRoutine]: {
    unitId: U.dailyRoutine,
    learn: {
      unitId: U.dailyRoutine,
      steps: [
        {
          heading: "あさの にっか",
          body: "「I get up.」おきる、「I eat breakfast.」あさごはんを たべる、「I go to school.」がっこうへ いく だよ。",
          visual: { kind: "emoji", value: "🌅🍞🏫", caption: "get up / breakfast / school" },
        },
        {
          heading: "よるの にっか",
          body: "「I eat dinner.」ばんごはんを たべる、「I take a bath.」おふろに はいる、「I go to bed.」ねる だよ。",
          visual: { kind: "emoji", value: "🍛🛁🛌", caption: "dinner / bath / bed" },
        },
        {
          heading: "じぶんの いちにちを いおう",
          body: "じゅんばんに つなげると、じぶんの いちにちを えいごで しょうかいできるよ。やってみよう。",
          visual: { kind: "emoji", value: "🗣️🕐", caption: "My day" },
        },
      ],
    },
    test: {
      unitId: U.dailyRoutine,
      questions: dailyRoutineQuestions,
      questionCount: 5,
    },
  },

  [U.stationeryFood]: {
    unitId: U.stationeryFood,
    learn: {
      unitId: U.stationeryFood,
      steps: [
        {
          heading: "ぶんぼうぐの えいご",
          body: "えんぴつ=pencil、けしゴム=eraser、ものさし=ruler、ノート=notebook、ペン=pen だよ。",
          visual: { kind: "emoji", value: "✏️🧽📓", caption: "pencil / eraser / notebook" },
        },
        {
          heading: "たべものの えいご",
          body: "ぱん=bread、ぎゅうにゅう=milk、ごはん=rice、たまご=egg だよ。きゅうしょくで さがしてみよう。",
          visual: { kind: "emoji", value: "🍞🥛🍚🥚", caption: "bread / milk / rice / egg" },
        },
        {
          heading: "つたえて みよう",
          body: "「I have a pen.」もっている、「I want bread.」ほしい のように、たんごを つかって いえるね。",
          visual: { kind: "emoji", value: "🗣️", caption: "I have / I want" },
        },
      ],
    },
    test: {
      unitId: U.stationeryFood,
      questions: stationeryFoodQuestions,
      questionCount: 5,
    },
  },
};
