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
    name: "{言葉|ことば}（ようび・てんき・もの）",
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
    title: "アルファベット（{小文字|こもじ}）",
    order: 1,
    realWorldUse: "{本|ほん}や ノート、メールの {文字|もじ}は {小文字|こもじ}が おおいよ。{大文字|おおもじ}と あわせて よめるように なるよ。",
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
    title: "{曜日|ようび}と {月|つき}（days & months）",
    order: 2,
    realWorldUse: "カレンダーや よていを {英語|えいご}で「Monday」「January」のように よんだり いえたり できるよ。",
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
    title: "{天気|てんき}と あそび（weather & play）",
    order: 3,
    realWorldUse: "きょうの {天気|てんき}を {英語|えいご}で いったり、「Let's play！」と ともだちを あそびに さそえるよ。",
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
    realWorldUse: "おみせや {給食|きゅうしょく}で「I want 〜.」と じぶんの ほしい ものを つたえられるよ。",
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
    title: "{一日|いちにち}の {生活|せいかつ}（daily routine）",
    order: 5,
    realWorldUse: "「I get up.」「I go to school.」のように、じぶんの いちにちを {英語|えいご}で しょうかいできるよ。",
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
    title: "ぶんぼうぐと {食|た}べ{物|もの}（things & food）",
    order: 6,
    realWorldUse: "ふでばこの なかみや すきな {食|た}べ{物|もの}を {英語|えいご}の {単語|たんご}で いえるように なるよ。",
    leadsTo: [],
    prerequisites: [U.iWant],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は日本語ひらがな中心。

// アルファベット（{小文字|こもじ}）
const alphabetLowerQuestions: ChoiceQuestion[] = [
  {
    id: `${U.alphabetLower}.q-1`,
    unitId: U.alphabetLower,
    prompt: "{大文字|おおもじ}「A」の {小文字|こもじ}は どれ かな？",
    explanation: "{大文字|おおもじ} A の {小文字|こもじ}は「a」だよ。{形|かたち}が すこし ちがうから きをつけよう。",
    visual: { kind: "emoji", value: "🔠➡️🔡", caption: "A → a" },
    format: "choice",
    choices: ["a", "e", "o", "n"],
    answer: "a",
  },
  {
    id: `${U.alphabetLower}.q-2`,
    unitId: U.alphabetLower,
    prompt: "{小文字|こもじ}「b」の {大文字|おおもじ}は どれ かな？",
    explanation: "{小文字|こもじ} b の {大文字|おおもじ}は「B」だよ。b は ぼうが {左|ひだり}、d は ぼうが {右|みぎ}だよ。",
    visual: { kind: "emoji", value: "🔡➡️🔠", caption: "b → B" },
    format: "choice",
    choices: ["B", "D", "P", "R"],
    answer: "B",
  },
  {
    id: `${U.alphabetLower}.q-3`,
    unitId: U.alphabetLower,
    prompt: "{小文字|こもじ}アルファベットの いちばん さいしょは どれ かな？",
    explanation: "{小文字|こもじ}も a から はじまるよ。a・b・c…と {順番|じゅんばん}は {大文字|おおもじ}と {同|おな}じだよ。",
    visual: { kind: "emoji", value: "🔡", caption: "a b c …" },
    format: "choice",
    choices: ["a", "z", "x", "m"],
    answer: "a",
  },
  {
    id: `${U.alphabetLower}.q-4`,
    unitId: U.alphabetLower,
    prompt: "「dog（いぬ）」の さいしょの {小文字|こもじ}は どれ かな？",
    explanation: "dog は ディー・オー…と よむよ。さいしょの {文字|もじ}は {小文字|こもじ}の「d」だね。",
    visual: { kind: "emoji", value: "🐶", caption: "dog" },
    format: "choice",
    choices: ["d", "b", "g", "o"],
    answer: "d",
  },
  {
    id: `${U.alphabetLower}.q-5`,
    unitId: U.alphabetLower,
    prompt: "まちがえやすい {小文字|こもじ}「p」と にている {文字|もじ}は どれ かな？",
    explanation: "p は {下|した}に ぼうが でるよ。にている「q」は ぼうの むきが はんたいだよ。よく みくらべよう。",
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
    prompt: "「にちようび」は {英語|えいご}で なんと いうかな？",
    explanation: "にちようびは「Sunday（サンデー）」だよ。1{週間|しゅうかん}の さいしょの ひだね。",
    visual: { kind: "emoji", value: "☀️📅", caption: "Sunday" },
    format: "choice",
    choices: ["Sunday", "Monday", "Friday", "Tuesday"],
    answer: "Sunday",
  },
  {
    id: `${U.daysMonths}.q-3`,
    unitId: U.daysMonths,
    prompt: "「January（ジャニュアリー）」は なんがつ かな？",
    explanation: "January は 1がつ だよ。1ねんの さいしょの {月|つき}だね。",
    visual: { kind: "emoji", value: "🎍", caption: "January" },
    format: "choice",
    choices: ["1がつ", "2がつ", "6がつ", "12がつ"],
    answer: "1がつ",
  },
  {
    id: `${U.daysMonths}.q-4`,
    unitId: U.daysMonths,
    prompt: "「What day is it？」の {意味|いみ}は どれ かな？",
    explanation: "「What day（ワット デイ）」は「なんようび？」と きく {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔📅", caption: "What day？" },
    format: "choice",
    choices: ["なんようび？", "なんじ？", "なにいろ？", "いくつ？"],
    answer: "なんようび？",
  },
  {
    id: `${U.daysMonths}.q-5`,
    unitId: U.daysMonths,
    prompt: "「December（ディセンバー）」は なんがつ かな？",
    explanation: "December は 12がつ だよ。1ねんの さいごの {月|つき}だね。",
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
    explanation: "sunny は はれ だよ。{太陽|たいよう}が でて いる ひだね。",
    visual: { kind: "emoji", value: "☀️", caption: "sunny" },
    format: "choice",
    choices: ["はれ", "あめ", "くもり", "ゆき"],
    answer: "はれ",
  },
  {
    id: `${U.weatherPlay}.q-2`,
    unitId: U.weatherPlay,
    prompt: "「あめ」の てんきは {英語|えいご}で なんと いうかな？",
    explanation: "あめは「rainy（レイニー）」だよ。かさが いる ひだね。",
    visual: { kind: "emoji", value: "🌧️", caption: "rainy" },
    format: "choice",
    choices: ["rainy", "sunny", "snowy", "windy"],
    answer: "rainy",
  },
  {
    id: `${U.weatherPlay}.q-3`,
    unitId: U.weatherPlay,
    prompt: "「How's the weather？」の {意味|いみ}は どれ かな？",
    explanation: "「How's the weather？（ハウズ ザ ウェザー）」は「てんきは どう？」と きく {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔🌤️", caption: "How's the weather？" },
    format: "choice",
    choices: ["てんきは どう？", "なんようび？", "げんき？", "なにが すき？"],
    answer: "てんきは どう？",
  },
  {
    id: `${U.weatherPlay}.q-4`,
    unitId: U.weatherPlay,
    prompt: "「Let's play！」の {意味|いみ}は どれ かな？",
    explanation: "「Let's play！（レッツ プレイ）」は「あそぼう！」と さそう {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "⚽🙌", caption: "Let's play!" },
    format: "choice",
    choices: ["あそぼう！", "たべよう！", "ねよう！", "いこう！"],
    answer: "あそぼう！",
  },
  {
    id: `${U.weatherPlay}.q-5`,
    unitId: U.weatherPlay,
    prompt: "「snowy（スノーウィ）」は どんな てんき かな？",
    explanation: "snowy は ゆき だよ。{白|しろ}い ゆきが ふる {寒|さむ}い ひだね。",
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
    prompt: "「I want 〜.」の {意味|いみ}は どれ かな？",
    explanation: "「I want（アイ ウォント）〜.」は「わたしは 〜が ほしい」だよ。ほしい ものを つたえられるね。",
    visual: { kind: "emoji", value: "🙋🎁", caption: "I want …" },
    format: "choice",
    choices: ["わたしは 〜が ほしい", "わたしは 〜が すき", "〜は どこ？", "〜を あげる"],
    answer: "わたしは 〜が ほしい",
  },
  {
    id: `${U.iWant}.q-2`,
    unitId: U.iWant,
    prompt: "「I want an apple.」の {意味|いみ}は どれ かな？",
    explanation: "apple は りんご。「I want an apple.」で「りんごが ほしい」だよ。",
    visual: { kind: "emoji", value: "🍎", caption: "I want an apple." },
    format: "choice",
    choices: ["りんごが ほしい", "りんごが すき", "りんごを たべた", "りんごは ない"],
    answer: "りんごが ほしい",
  },
  {
    id: `${U.iWant}.q-3`,
    unitId: U.iWant,
    prompt: "「What do you want？」の {意味|いみ}は どれ かな？",
    explanation: "「What do you want？（ワット ドゥ ユー ウォント）」は「なにが ほしい？」と きく {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔❓", caption: "What do you want？" },
    format: "choice",
    choices: ["なにが ほしい？", "なにが すき？", "どこに いきたい？", "だれ？"],
    answer: "なにが ほしい？",
  },
  {
    id: `${U.iWant}.q-4`,
    unitId: U.iWant,
    prompt: "ほしい ものを つたえる ときに つかう {言葉|ことば}は どれ かな？",
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
    prompt: "「I get up.」の {意味|いみ}は どれ かな？",
    explanation: "「get up（ゲット アップ）」は「おきる」だよ。{朝|あさ} ベッドから おきる ことだね。",
    visual: { kind: "emoji", value: "🛏️🌅", caption: "I get up." },
    format: "choice",
    choices: ["おきる", "ねる", "たべる", "あるく"],
    answer: "おきる",
  },
  {
    id: `${U.dailyRoutine}.q-2`,
    unitId: U.dailyRoutine,
    prompt: "「I go to bed.」の {意味|いみ}は どれ かな？",
    explanation: "「go to bed（ゴー トゥ ベッド）」は「ねる」だよ。よる ベッドに いく ことだね。",
    visual: { kind: "emoji", value: "🛌😴", caption: "I go to bed." },
    format: "choice",
    choices: ["ねる", "おきる", "あそぶ", "はしる"],
    answer: "ねる",
  },
  {
    id: `${U.dailyRoutine}.q-3`,
    unitId: U.dailyRoutine,
    prompt: "「I eat breakfast.」の {意味|いみ}は どれ かな？",
    explanation: "breakfast（ブレックファスト）は {朝|あさ}ごはん。「I eat breakfast.」で「{朝|あさ}ごはんを たべる」だよ。",
    visual: { kind: "emoji", value: "🍞🥚", caption: "breakfast" },
    format: "choice",
    choices: ["あさごはんを たべる", "ひるごはんを たべる", "ねる", "がっこうへ いく"],
    answer: "あさごはんを たべる",
  },
  {
    id: `${U.dailyRoutine}.q-4`,
    unitId: U.dailyRoutine,
    prompt: "「がっこうへ いく」は {英語|えいご}で どれ かな？",
    explanation: "「I go to school.（ゴー トゥ スクール）」で「がっこうへ いく」だよ。",
    visual: { kind: "emoji", value: "🏫🎒", caption: "I go to school." },
    format: "choice",
    choices: ["I go to school.", "I go to bed.", "I get up.", "I eat lunch."],
    answer: "I go to school.",
  },
  {
    id: `${U.dailyRoutine}.q-5`,
    unitId: U.dailyRoutine,
    prompt: "「What time？」の {意味|いみ}は どれ かな？",
    explanation: "「What time？（ワット タイム）」は「なんじ？」と {時間|じかん}を きく {言葉|ことば}だよ。",
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
    prompt: "「けしゴム」は {英語|えいご}で なんと いうかな？",
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
    explanation: "milk は ぎゅうにゅう だよ。{白|しろ}くて あまい {飲|の}み{物|もの}だね。",
    visual: { kind: "emoji", value: "🥛", caption: "milk" },
    format: "choice",
    choices: ["ぎゅうにゅう", "みず", "ジュース", "おちゃ"],
    answer: "ぎゅうにゅう",
  },
  {
    id: `${U.stationeryFood}.q-4`,
    unitId: U.stationeryFood,
    prompt: "「ぱん」は {英語|えいご}で なんと いうかな？",
    explanation: "ぱんは「bread（ブレッド）」だよ。{朝|あさ}ごはんで よく たべるね。",
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
          heading: "{大文字|おおもじ}と {小文字|こもじ}",
          body: "アルファベットには {大文字|おおもじ}(A)と {小文字|こもじ}(a)が あるよ。{同|おな}じ {文字|もじ}でも {形|かたち}が ちがうんだ。",
          visual: { kind: "emoji", value: "🔠🔡", caption: "A a / B b / C c" },
        },
        {
          heading: "a から z まで",
          body: "{小文字|こもじ}も a・b・c…z と {順番|じゅんばん}は {大文字|おおもじ}と {同|おな}じだよ。ぜんぶで 26{文字|もじ} だね。",
          visual: { kind: "emoji", value: "🔡", caption: "a b c … z" },
        },
        {
          heading: "にている {文字|もじ}に ちゅうい",
          body: "b と d、p と q は {形|かたち}が にているよ。ぼうの むきを よく みて みわけよう。",
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
          heading: "{曜日|ようび}の {英語|えいご}",
          body: "にち=Sunday、げつ=Monday、か=Tuesday…と つづくよ。すべて さいごが「day」だね。",
          visual: { kind: "emoji", value: "📅", caption: "Sunday … Saturday" },
        },
        {
          heading: "{月|つき}の {英語|えいご}",
          body: "1がつ=January、2がつ=February…12がつ=December だよ。1ねんで 12の {月|つき}が あるね。",
          visual: { kind: "emoji", value: "🗓️", caption: "January … December" },
        },
        {
          heading: "きいて みよう",
          body: "「What day is it？」は「なんようび？」。きょうの {曜日|ようび}を {英語|えいご}で こたえてみよう。",
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
          heading: "{天気|てんき}の {英語|えいご}",
          body: "はれ=sunny、あめ=rainy、くもり=cloudy、ゆき=snowy だよ。きょうの {空|そら}は どれ かな？",
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
          heading: "{朝|あさ}の {日課|にっか}",
          body: "「I get up.」おきる、「I eat breakfast.」{朝|あさ}ごはんを たべる、「I go to school.」{学校|がっこう}へ いく だよ。",
          visual: { kind: "emoji", value: "🌅🍞🏫", caption: "get up / breakfast / school" },
        },
        {
          heading: "{夜|よる}の {日課|にっか}",
          body: "「I eat dinner.」ばんごはんを たべる、「I take a bath.」おふろに はいる、「I go to bed.」ねる だよ。",
          visual: { kind: "emoji", value: "🍛🛁🛌", caption: "dinner / bath / bed" },
        },
        {
          heading: "じぶんの {一日|いちにち}を いおう",
          body: "{順番|じゅんばん}に つなげると、じぶんの {一日|いちにち}を {英語|えいご}で しょうかいできるよ。やってみよう。",
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
          heading: "ぶんぼうぐの {英語|えいご}",
          body: "えんぴつ=pencil、けしゴム=eraser、ものさし=ruler、ノート=notebook、ペン=pen だよ。",
          visual: { kind: "emoji", value: "✏️🧽📓", caption: "pencil / eraser / notebook" },
        },
        {
          heading: "{食|た}べ{物|もの}の {英語|えいご}",
          body: "ぱん=bread、ぎゅうにゅう=milk、ごはん=rice、たまご=egg だよ。{給食|きゅうしょく}で さがしてみよう。",
          visual: { kind: "emoji", value: "🍞🥛🍚🥚", caption: "bread / milk / rice / egg" },
        },
        {
          heading: "つたえて みよう",
          body: "「I have a pen.」もっている、「I want bread.」ほしい のように、{単語|たんご}を つかって いえるね。",
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
