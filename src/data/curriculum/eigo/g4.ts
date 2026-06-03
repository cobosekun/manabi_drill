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
    realWorldUse: "{本|ほん}や ノート、メールの {文字|もじ}は {小文字|こもじ}が {多|おお}いよ。{大文字|おおもじ}と {合|あ}わせて {読|よ}めるように なるよ。",
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
    realWorldUse: "カレンダーや {予定|よてい}を {英語|えいご}で「Monday」「January」のように {読|よ}んだり {言|い}えたり できるよ。",
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
    title: "{天気|てんき}と {遊|あそ}び（weather & play）",
    order: 3,
    realWorldUse: "{今日|きょう}の {天気|てんき}を {英語|えいご}で {言|い}ったり、「Let's play！」と {友達|ともだち}を {遊|あそ}びに {誘|さそ}えるよ。",
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
    title: "{欲|ほ}しい{物|もの}（I want〜）",
    order: 4,
    realWorldUse: "お{店|みせ}や {給食|きゅうしょく}で「I want 〜.」と {自分|じぶん}の {欲|ほ}しい {物|もの}を {伝|つた}えられるよ。",
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
    realWorldUse: "「I get up.」「I go to school.」のように、{自分|じぶん}の {一日|いちにち}を {英語|えいご}で {紹介|しょうかい}できるよ。",
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
    title: "{文房具|ぶんぼうぐ}と {食|た}べ{物|もの}（things & food）",
    order: 6,
    realWorldUse: "{筆箱|ふでばこ}の {中身|なかみ}や {好|す}きな {食|た}べ{物|もの}を {英語|えいご}の {単語|たんご}で {言|い}えるように なるよ。",
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
    explanation: "{大文字|おおもじ} A の {小文字|こもじ}は「a」だよ。{形|かたち}が すこし ちがうから {気|き}をつけよう。",
    visual: { kind: "emoji", value: "🔠➡️🔡", caption: "A → a" },
    format: "choice",
    choices: ["a", "e", "o", "n"],
    answer: "a",
  },
  {
    id: `${U.alphabetLower}.q-2`,
    unitId: U.alphabetLower,
    prompt: "{小文字|こもじ}「b」の {大文字|おおもじ}は どれ かな？",
    explanation: "{小文字|こもじ} b の {大文字|おおもじ}は「B」だよ。b は {棒|ぼう}が {左|ひだり}、d は {棒|ぼう}が {右|みぎ}だよ。",
    visual: { kind: "emoji", value: "🔡➡️🔠", caption: "b → B" },
    format: "choice",
    choices: ["B", "D", "P", "R"],
    answer: "B",
  },
  {
    id: `${U.alphabetLower}.q-3`,
    unitId: U.alphabetLower,
    prompt: "{小文字|こもじ}アルファベットの {一番|いちばん} {最初|さいしょ}は どれ かな？",
    explanation: "{小文字|こもじ}も a から {始|はじ}まるよ。a・b・c…と {順番|じゅんばん}は {大文字|おおもじ}と {同|おな}じだよ。",
    visual: { kind: "emoji", value: "🔡", caption: "a b c …" },
    format: "choice",
    choices: ["a", "z", "x", "m"],
    answer: "a",
  },
  {
    id: `${U.alphabetLower}.q-4`,
    unitId: U.alphabetLower,
    prompt: "「dog（{犬|いぬ}）」の {最初|さいしょ}の {小文字|こもじ}は どれ かな？",
    explanation: "dog は ディー・オー…と {読|よ}むよ。{最初|さいしょ}の {文字|もじ}は {小文字|こもじ}の「d」だね。",
    visual: { kind: "emoji", value: "🐶", caption: "dog" },
    format: "choice",
    choices: ["d", "b", "g", "o"],
    answer: "d",
  },
  {
    id: `${U.alphabetLower}.q-5`,
    unitId: U.alphabetLower,
    prompt: "{間違|まちが}えやすい {小文字|こもじ}「p」と {似|に}ている {文字|もじ}は どれ かな？",
    explanation: "p は {下|した}に {棒|ぼう}が {出|で}るよ。{似|に}ている「q」は {棒|ぼう}の {向|む}きが {反対|はんたい}だよ。よく {見|み}くらべよう。",
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
    prompt: "「Monday（マンデー）」は {何曜日|なんようび} かな？",
    explanation: "Monday は {月曜日|げつようび} だよ。Sunday(にち)・Monday(げつ)…と {続|つづ}くよ。",
    visual: { kind: "emoji", value: "📅", caption: "Monday" },
    format: "choice",
    choices: ["{月曜日|げつようび}", "{日曜日|にちようび}", "{金曜日|きんようび}", "{土曜日|どようび}"],
    answer: "{月曜日|げつようび}",
  },
  {
    id: `${U.daysMonths}.q-2`,
    unitId: U.daysMonths,
    prompt: "「{日曜日|にちようび}」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "{日曜日|にちようび}は「Sunday（サンデー）」だよ。1{週間|しゅうかん}の {最初|さいしょ}の {日|ひ}だね。",
    visual: { kind: "emoji", value: "☀️📅", caption: "Sunday" },
    format: "choice",
    choices: ["Sunday", "Monday", "Friday", "Tuesday"],
    answer: "Sunday",
  },
  {
    id: `${U.daysMonths}.q-3`,
    unitId: U.daysMonths,
    prompt: "「January（ジャニュアリー）」は {何月|なんがつ} かな？",
    explanation: "January は 1{月|がつ} だよ。1{年|ねん}の {最初|さいしょ}の {月|つき}だね。",
    visual: { kind: "emoji", value: "🎍", caption: "January" },
    format: "choice",
    choices: ["1{月|がつ}", "2{月|がつ}", "6{月|がつ}", "12{月|がつ}"],
    answer: "1{月|がつ}",
  },
  {
    id: `${U.daysMonths}.q-4`,
    unitId: U.daysMonths,
    prompt: "「What day is it？」の {意味|いみ}は どれ かな？",
    explanation: "「What day（ワット デイ）」は「{何曜日|なんようび}？」と {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔📅", caption: "What day？" },
    format: "choice",
    choices: ["{何曜日|なんようび}？", "{何時|なんじ}？", "{何色|なにいろ}？", "いくつ？"],
    answer: "{何曜日|なんようび}？",
  },
  {
    id: `${U.daysMonths}.q-5`,
    unitId: U.daysMonths,
    prompt: "「December（ディセンバー）」は {何月|なんがつ} かな？",
    explanation: "December は 12{月|がつ} だよ。1{年|ねん}の {最後|さいご}の {月|つき}だね。",
    visual: { kind: "emoji", value: "🎄", caption: "December" },
    format: "choice",
    choices: ["12{月|がつ}", "10{月|がつ}", "11{月|がつ}", "1{月|がつ}"],
    answer: "12{月|がつ}",
  },
];

// てんきと あそび
const weatherPlayQuestions: ChoiceQuestion[] = [
  {
    id: `${U.weatherPlay}.q-1`,
    unitId: U.weatherPlay,
    prompt: "「sunny（サニー）」は どんな {天気|てんき} かな？",
    explanation: "sunny は {晴|は}れ だよ。{太陽|たいよう}が {出|で}て いる {日|ひ}だね。",
    visual: { kind: "emoji", value: "☀️", caption: "sunny" },
    format: "choice",
    choices: ["{晴|は}れ", "{雨|あめ}", "{曇|くも}り", "{雪|ゆき}"],
    answer: "{晴|は}れ",
  },
  {
    id: `${U.weatherPlay}.q-2`,
    unitId: U.weatherPlay,
    prompt: "「{雨|あめ}」の {天気|てんき}は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "{雨|あめ}は「rainy（レイニー）」だよ。{傘|かさ}が いる {日|ひ}だね。",
    visual: { kind: "emoji", value: "🌧️", caption: "rainy" },
    format: "choice",
    choices: ["rainy", "sunny", "snowy", "windy"],
    answer: "rainy",
  },
  {
    id: `${U.weatherPlay}.q-3`,
    unitId: U.weatherPlay,
    prompt: "「How's the weather？」の {意味|いみ}は どれ かな？",
    explanation: "「How's the weather？（ハウズ ザ ウェザー）」は「{天気|てんき}は どう？」と {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔🌤️", caption: "How's the weather？" },
    format: "choice",
    choices: ["{天気|てんき}は どう？", "{何曜日|なんようび}？", "{元気|げんき}？", "{何|なに}が {好|す}き？"],
    answer: "{天気|てんき}は どう？",
  },
  {
    id: `${U.weatherPlay}.q-4`,
    unitId: U.weatherPlay,
    prompt: "「Let's play！」の {意味|いみ}は どれ かな？",
    explanation: "「Let's play！（レッツ プレイ）」は「{遊|あそ}ぼう！」と {誘|さそ}う {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "⚽🙌", caption: "Let's play!" },
    format: "choice",
    choices: ["{遊|あそ}ぼう！", "{食|た}べよう！", "{寝|ね}よう！", "{行|い}こう！"],
    answer: "{遊|あそ}ぼう！",
  },
  {
    id: `${U.weatherPlay}.q-5`,
    unitId: U.weatherPlay,
    prompt: "「snowy（スノーウィ）」は どんな {天気|てんき} かな？",
    explanation: "snowy は {雪|ゆき} だよ。{白|しろ}い {雪|ゆき}が {降|ふ}る {寒|さむ}い {日|ひ}だね。",
    visual: { kind: "emoji", value: "❄️", caption: "snowy" },
    format: "choice",
    choices: ["{雪|ゆき}", "{晴|は}れ", "{雨|あめ}", "{風|かぜ}"],
    answer: "{雪|ゆき}",
  },
];

// ほしいもの（I want〜）
const iWantQuestions: ChoiceQuestion[] = [
  {
    id: `${U.iWant}.q-1`,
    unitId: U.iWant,
    prompt: "「I want 〜.」の {意味|いみ}は どれ かな？",
    explanation: "「I want（アイ ウォント）〜.」は「{私|わたし}は 〜が {欲|ほ}しい」だよ。{欲|ほ}しい {物|もの}を {伝|つた}えられるね。",
    visual: { kind: "emoji", value: "🙋🎁", caption: "I want …" },
    format: "choice",
    choices: ["{私|わたし}は 〜が {欲|ほ}しい", "{私|わたし}は 〜が {好|す}き", "〜は どこ？", "〜を あげる"],
    answer: "{私|わたし}は 〜が {欲|ほ}しい",
  },
  {
    id: `${U.iWant}.q-2`,
    unitId: U.iWant,
    prompt: "「I want an apple.」の {意味|いみ}は どれ かな？",
    explanation: "apple は りんご。「I want an apple.」で「りんごが {欲|ほ}しい」だよ。",
    visual: { kind: "emoji", value: "🍎", caption: "I want an apple." },
    format: "choice",
    choices: ["りんごが {欲|ほ}しい", "りんごが {好|す}き", "りんごを {食|た}べた", "りんごは ない"],
    answer: "りんごが {欲|ほ}しい",
  },
  {
    id: `${U.iWant}.q-3`,
    unitId: U.iWant,
    prompt: "「What do you want？」の {意味|いみ}は どれ かな？",
    explanation: "「What do you want？（ワット ドゥ ユー ウォント）」は「{何|なに}が {欲|ほ}しい？」と {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔❓", caption: "What do you want？" },
    format: "choice",
    choices: ["{何|なに}が {欲|ほ}しい？", "{何|なに}が {好|す}き？", "どこに {行|い}きたい？", "{誰|だれ}？"],
    answer: "{何|なに}が {欲|ほ}しい？",
  },
  {
    id: `${U.iWant}.q-4`,
    unitId: U.iWant,
    prompt: "{欲|ほ}しい {物|もの}を {伝|つた}える ときに {使|つか}う {言葉|ことば}は どれ かな？",
    explanation: "{欲|ほ}しい ときは「I want 〜.」を {使|つか}うよ。「I like 〜.」は {好|す}きな {物|もの} だよ。",
    visual: { kind: "emoji", value: "🛒", caption: "I want …" },
    format: "choice",
    choices: ["I want", "Goodbye", "How are you", "Thank you"],
    answer: "I want",
  },
  {
    id: `${U.iWant}.q-5`,
    unitId: U.iWant,
    prompt: "{丁寧|ていねい}に {頼|たの}む「〜, please.」の「please」の {意味|いみ}は？",
    explanation: "please（プリーズ）は「お{願|ねが}いします」だよ。{最後|さいご}に つけると {丁寧|ていねい}に なるよ。",
    visual: { kind: "emoji", value: "🙏", caption: "…, please." },
    format: "choice",
    choices: ["お{願|ねが}いします", "ありがとう", "ごめんね", "さようなら"],
    answer: "お{願|ねが}いします",
  },
];

// いちにちの せいかつ（daily routine）
const dailyRoutineQuestions: ChoiceQuestion[] = [
  {
    id: `${U.dailyRoutine}.q-1`,
    unitId: U.dailyRoutine,
    prompt: "「I get up.」の {意味|いみ}は どれ かな？",
    explanation: "「get up（ゲット アップ）」は「{起|お}きる」だよ。{朝|あさ} ベッドから {起|お}きる ことだね。",
    visual: { kind: "emoji", value: "🛏️🌅", caption: "I get up." },
    format: "choice",
    choices: ["{起|お}きる", "{寝|ね}る", "{食|た}べる", "{歩|ある}く"],
    answer: "{起|お}きる",
  },
  {
    id: `${U.dailyRoutine}.q-2`,
    unitId: U.dailyRoutine,
    prompt: "「I go to bed.」の {意味|いみ}は どれ かな？",
    explanation: "「go to bed（ゴー トゥ ベッド）」は「{寝|ね}る」だよ。{夜|よる} ベッドに {行|い}く ことだね。",
    visual: { kind: "emoji", value: "🛌😴", caption: "I go to bed." },
    format: "choice",
    choices: ["{寝|ね}る", "{起|お}きる", "{遊|あそ}ぶ", "{走|はし}る"],
    answer: "{寝|ね}る",
  },
  {
    id: `${U.dailyRoutine}.q-3`,
    unitId: U.dailyRoutine,
    prompt: "「I eat breakfast.」の {意味|いみ}は どれ かな？",
    explanation: "breakfast（ブレックファスト）は {朝|あさ}ごはん。「I eat breakfast.」で「{朝|あさ}ごはんを {食|た}べる」だよ。",
    visual: { kind: "emoji", value: "🍞🥚", caption: "breakfast" },
    format: "choice",
    choices: ["{朝|あさ}ごはんを {食|た}べる", "{昼|ひる}ごはんを {食|た}べる", "{寝|ね}る", "{学校|がっこう}へ {行|い}く"],
    answer: "{朝|あさ}ごはんを {食|た}べる",
  },
  {
    id: `${U.dailyRoutine}.q-4`,
    unitId: U.dailyRoutine,
    prompt: "「{学校|がっこう}へ {行|い}く」は {英語|えいご}で どれ かな？",
    explanation: "「I go to school.（ゴー トゥ スクール）」で「{学校|がっこう}へ {行|い}く」だよ。",
    visual: { kind: "emoji", value: "🏫🎒", caption: "I go to school." },
    format: "choice",
    choices: ["I go to school.", "I go to bed.", "I get up.", "I eat lunch."],
    answer: "I go to school.",
  },
  {
    id: `${U.dailyRoutine}.q-5`,
    unitId: U.dailyRoutine,
    prompt: "「What time？」の {意味|いみ}は どれ かな？",
    explanation: "「What time？（ワット タイム）」は「{何時|なんじ}？」と {時間|じかん}を {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🕐", caption: "What time？" },
    format: "choice",
    choices: ["{何時|なんじ}？", "{何曜日|なんようび}？", "どこ？", "{何色|なにいろ}？"],
    answer: "{何時|なんじ}？",
  },
];

// ぶんぼうぐと たべもの（things & food）
const stationeryFoodQuestions: ChoiceQuestion[] = [
  {
    id: `${U.stationeryFood}.q-1`,
    unitId: U.stationeryFood,
    prompt: "「pencil（ペンスル）」は {何|なに} かな？",
    explanation: "pencil は {鉛筆|えんぴつ} だよ。{字|じ}を {書|か}く {文房具|ぶんぼうぐ}だね。",
    visual: { kind: "emoji", value: "✏️", caption: "pencil" },
    format: "choice",
    choices: ["{鉛筆|えんぴつ}", "{消|け}しゴム", "ノート", "{物差|ものさ}し"],
    answer: "{鉛筆|えんぴつ}",
  },
  {
    id: `${U.stationeryFood}.q-2`,
    unitId: U.stationeryFood,
    prompt: "「{消|け}しゴム」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "{消|け}しゴムは「eraser（イレイサー）」だよ。{字|じ}を {消|け}す {道具|どうぐ}だね。",
    visual: { kind: "emoji", value: "🧽", caption: "eraser" },
    format: "choice",
    choices: ["eraser", "pencil", "ruler", "pen"],
    answer: "eraser",
  },
  {
    id: `${U.stationeryFood}.q-3`,
    unitId: U.stationeryFood,
    prompt: "「milk（ミルク）」は {何|なに} かな？",
    explanation: "milk は {牛乳|ぎゅうにゅう} だよ。{白|しろ}くて {甘|あま}い {飲|の}み{物|もの}だね。",
    visual: { kind: "emoji", value: "🥛", caption: "milk" },
    format: "choice",
    choices: ["{牛乳|ぎゅうにゅう}", "{水|みず}", "ジュース", "お{茶|ちゃ}"],
    answer: "{牛乳|ぎゅうにゅう}",
  },
  {
    id: `${U.stationeryFood}.q-4`,
    unitId: U.stationeryFood,
    prompt: "「ぱん」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "ぱんは「bread（ブレッド）」だよ。{朝|あさ}ごはんで よく {食|た}べるね。",
    visual: { kind: "emoji", value: "🍞", caption: "bread" },
    format: "choice",
    choices: ["bread", "rice", "egg", "milk"],
    answer: "bread",
  },
  {
    id: `${U.stationeryFood}.q-5`,
    unitId: U.stationeryFood,
    prompt: "「notebook（ノートブック）」は {何|なに} かな？",
    explanation: "notebook は ノート だよ。{字|じ}や {絵|え}を {書|か}く {文房具|ぶんぼうぐ}だね。",
    visual: { kind: "emoji", value: "📓", caption: "notebook" },
    format: "choice",
    choices: ["ノート", "{鉛筆|えんぴつ}", "{筆箱|ふでばこ}", "{物差|ものさ}し"],
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
          body: "{小文字|こもじ}も a・b・c…z と {順番|じゅんばん}は {大文字|おおもじ}と {同|おな}じだよ。{全部|ぜんぶ}で 26{文字|もじ} だね。",
          visual: { kind: "emoji", value: "🔡", caption: "a b c … z" },
        },
        {
          heading: "{似|に}ている {文字|もじ}に {注意|ちゅうい}",
          body: "b と d、p と q は {形|かたち}が {似|に}ているよ。{棒|ぼう}の {向|む}きを よく {見|み}て {見分|みわ}けよう。",
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
          body: "にち=Sunday、げつ=Monday、か=Tuesday…と {続|つづ}くよ。{全|すべ}て {最後|さいご}が「day」だね。",
          visual: { kind: "emoji", value: "📅", caption: "Sunday … Saturday" },
        },
        {
          heading: "{月|つき}の {英語|えいご}",
          body: "1{月|がつ}=January、2{月|がつ}=February…12{月|がつ}=December だよ。1{年|ねん}で 12の {月|つき}が あるね。",
          visual: { kind: "emoji", value: "🗓️", caption: "January … December" },
        },
        {
          heading: "{聞|き}いて みよう",
          body: "「What day is it？」は「{何曜日|なんようび}？」。{今日|きょう}の {曜日|ようび}を {英語|えいご}で {答|こた}えてみよう。",
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
          body: "{晴|は}れ=sunny、{雨|あめ}=rainy、{曇|くも}り=cloudy、{雪|ゆき}=snowy だよ。{今日|きょう}の {空|そら}は どれ かな？",
          visual: { kind: "emoji", value: "☀️🌧️☁️❄️", caption: "sunny / rainy / cloudy / snowy" },
        },
        {
          heading: "{天気|てんき}を {聞|き}こう",
          body: "「How's the weather？」は「{天気|てんき}は どう？」。「It's sunny.」で「{晴|は}れだよ」と {答|こた}えるよ。",
          visual: { kind: "emoji", value: "🌤️", caption: "How's the weather？" },
        },
        {
          heading: "{遊|あそ}びに {誘|さそ}おう",
          body: "「Let's play！」は「{遊|あそ}ぼう！」。{晴|は}れの {日|ひ}は {外|そと}で {遊|あそ}ぶと {気持|きも}ちいいね。",
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
          body: "「I want 〜.（アイ ウォント）」は「{私|わたし}は 〜が {欲|ほ}しい」だよ。{欲|ほ}しい {物|もの}を {伝|つた}えられるね。",
          visual: { kind: "emoji", value: "🙋🎁", caption: "I want …" },
        },
        {
          heading: "{何|なに}が {欲|ほ}しい？",
          body: "「What do you want？」は「{何|なに}が {欲|ほ}しい？」。「I want a ball.」で「ボールが {欲|ほ}しい」だよ。",
          visual: { kind: "emoji", value: "⚽🤔", caption: "What do you want？" },
        },
        {
          heading: "{丁寧|ていねい}に {頼|たの}もう",
          body: "{最後|さいご}に「please（プリーズ）」を つけると {丁寧|ていねい}だよ。「An apple, please.」のように {言|い}えるね。",
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
          body: "「I get up.」{起|お}きる、「I eat breakfast.」{朝|あさ}ごはんを {食|た}べる、「I go to school.」{学校|がっこう}へ {行|い}く だよ。",
          visual: { kind: "emoji", value: "🌅🍞🏫", caption: "get up / breakfast / school" },
        },
        {
          heading: "{夜|よる}の {日課|にっか}",
          body: "「I eat dinner.」{晩|ばん}ごはんを {食|た}べる、「I take a bath.」お{風呂|ふろ}に {入|はい}る、「I go to bed.」{寝|ね}る だよ。",
          visual: { kind: "emoji", value: "🍛🛁🛌", caption: "dinner / bath / bed" },
        },
        {
          heading: "{自分|じぶん}の {一日|いちにち}を {言|い}おう",
          body: "{順番|じゅんばん}に つなげると、{自分|じぶん}の {一日|いちにち}を {英語|えいご}で {紹介|しょうかい}できるよ。やってみよう。",
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
          heading: "{文房具|ぶんぼうぐ}の {英語|えいご}",
          body: "{鉛筆|えんぴつ}=pencil、{消|け}しゴム=eraser、{物差|ものさ}し=ruler、ノート=notebook、ペン=pen だよ。",
          visual: { kind: "emoji", value: "✏️🧽📓", caption: "pencil / eraser / notebook" },
        },
        {
          heading: "{食|た}べ{物|もの}の {英語|えいご}",
          body: "ぱん=bread、{牛乳|ぎゅうにゅう}=milk、ごはん=rice、{卵|たまご}=egg だよ。{給食|きゅうしょく}で {探|さが}してみよう。",
          visual: { kind: "emoji", value: "🍞🥛🍚🥚", caption: "bread / milk / rice / egg" },
        },
        {
          heading: "{伝|つた}えて みよう",
          body: "「I have a pen.」{持|も}っている、「I want bread.」{欲|ほ}しい のように、{単語|たんご}を {使|つか}って {言|い}えるね。",
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
