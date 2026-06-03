// ══════════════════════════════════════════
// カリキュラム: 英語（えいご）小3（外国語活動・中学年）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 英語は外国語活動として「聞く・話す（やりとり）」中心。テストは4択の確認形式。
// 英単語はそのまま提示し（よみがなはカタカナで併記）、和文の説明は漢字＋全漢字ルビ {漢字|よみ} で表記。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const eigoSubject: Subject = {
  id: "eigo",
  name: "{英語|えいご}",
  formalName: "{英語|えいご}（{外国語|がいこくご}{活動|かつどう}）",
  emoji: "🔤",
  theme: "rose",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// 外国語活動（中学年）は「言語材料・表現」を体験的に学ぶ。
// 領域は実用テーマで分ける（{挨|あい}{拶|さつ}・文字・かず／いろ・きもち・すきなもの）。

export const eigoG3Domains: Domain[] = [
  {
    id: "eigo.communication",
    subjectId: "eigo",
    name: "{挨|あい}{拶|さつ}とやりとり",
    formalName: "コミュニケーション（{挨|あい}{拶|さつ}・{自己|じこ}{表現|ひょうげん}）",
  },
  {
    id: "eigo.letters",
    subjectId: "eigo",
    name: "アルファベット",
    formalName: "{文字|もじ}（{大文字|おおもじ}）",
  },
  {
    id: "eigo.words",
    subjectId: "eigo",
    name: "{言葉|ことば}（{数|かず}・{色|いろ}）",
    formalName: "{語彙|ごい}（{数|かず}・{色|いろ}）",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺に DAG 化）:
//
//   greetings ──┬─▶ feelings ──▶ likes
//               └─▶ likes
//   alphabet（独立した土台）
//   numbers（独立）
//   colors ─────────────────────▶ likes
//
const U = {
  greetings: "eigo.g3.greetings",
  alphabet: "eigo.g3.alphabet-uppercase",
  numbers: "eigo.g3.numbers-1-20",
  colors: "eigo.g3.colors",
  feelings: "eigo.g3.feelings",
  likes: "eigo.g3.likes",
} as const;

export const eigoG3Units: Unit[] = [
  {
    id: U.greetings,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.communication",
    title: "{挨|あい}{拶|さつ}（Hello！）",
    order: 1,
    realWorldUse: "{朝|あさ} {友|とも}{達|だち}や {先生|せんせい}に {会|あ}うとき「Hello！」と {英語|えいご}で {挨|あい}{拶|さつ}できるよ。",
    leadsTo: [U.feelings, U.likes],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.alphabet,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.letters",
    title: "アルファベット（{大文字|おおもじ}）",
    order: 2,
    realWorldUse: "{看板|かんばん}や お{店|みせ}の ロゴ、ローマ{字|じ}で {書|か}いた {名前|なまえ}を {読|よ}むときに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.numbers,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.words",
    title: "{数|かず}（1〜20）",
    order: 3,
    realWorldUse: "{英語|えいご}の {歌|うた}や ゲームで {数|かず}を {数|かぞ}えたり、いくつ あるかを {伝|つた}えるときに {使|つか}うよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.colors,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.words",
    title: "{色|いろ}（colors）",
    order: 4,
    realWorldUse: "{好|す}きな {色|いろ}を {英語|えいご}で {言|い}えると、{塗|ぬ}り{絵|え}や お{店|みせ}で「これが {欲|ほ}しい」と {伝|つた}えられるよ。",
    leadsTo: [U.likes],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.feelings,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.communication",
    title: "{気分|きぶん}（How are you？）",
    order: 5,
    realWorldUse: "{友|とも}{達|だち}に「How are you？」と {聞|き}かれたら、{今日|きょう}の {気分|きぶん}を {答|こた}えられるよ。",
    leadsTo: [],
    prerequisites: [U.greetings],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.likes,
    subjectId: "eigo",
    grade: 3,
    domainId: "eigo.communication",
    title: "{好|す}きな{物|もの}（I like〜）",
    order: 6,
    realWorldUse: "{自分|じぶん}の {好|す}きな {食|た}べ{物|もの}や {動物|どうぶつ}を「I like 〜.」で {友|とも}{達|だち}に {伝|つた}えられるよ。",
    leadsTo: [],
    prerequisites: [U.greetings, U.colors],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。解説は漢字＋ルビの和文。

// {挨|あい}{拶|さつ}
const greetingsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.greetings}.q-1`,
    unitId: U.greetings,
    prompt: "{朝|あさ} {人|ひと}に {会|あ}うとき、{英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "「Hello（ハロー）」は {会|あ}うときの {挨|あい}{拶|さつ}だよ。{朝|あさ}でも {昼|ひる}でも {使|つか}えるよ。",
    visual: { kind: "emoji", value: "🙋👋", caption: "やあ！" },
    format: "choice",
    choices: ["Hello", "Goodbye", "Sorry", "Good night"],
    answer: "Hello",
  },
  {
    id: `${U.greetings}.q-2`,
    unitId: U.greetings,
    prompt: "「さようなら」と {別|わか}れるとき、{英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "「Goodbye（グッバイ）」は {別|わか}れるときの {挨|あい}{拶|さつ}だよ。{短|みじか}く「Bye（バイ）」とも {言|い}うよ。",
    visual: { kind: "emoji", value: "👋🚪", caption: "またね！" },
    format: "choice",
    choices: ["Goodbye", "Hello", "Thank you", "Yes"],
    answer: "Goodbye",
  },
  {
    id: `${U.greetings}.q-3`,
    unitId: U.greetings,
    prompt: "{何|なに}か して もらって「ありがとう」と {言|い}うとき、{英語|えいご}では？",
    explanation: "「Thank you（サンキュー）」は お{礼|れい}の {言葉|ことば}だよ。{助|たす}けて もらったら {使|つか}おう。",
    visual: { kind: "emoji", value: "🎁🙏", caption: "ありがとう" },
    format: "choice",
    choices: ["Thank you", "Hello", "Goodbye", "Please"],
    answer: "Thank you",
  },
  {
    id: `${U.greetings}.q-4`,
    unitId: U.greetings,
    prompt: "「ごめんね」と {謝|あやま}るとき、{英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "「Sorry（ソーリー）」は {謝|あやま}る {言葉|ことば}だよ。{悪|わる}いことを したら {使|つか}おう。",
    visual: { kind: "emoji", value: "🙇💦", caption: "ごめんね" },
    format: "choice",
    choices: ["Sorry", "Thank you", "Hello", "Good"],
    answer: "Sorry",
  },
  {
    id: `${U.greetings}.q-5`,
    unitId: U.greetings,
    prompt: "{自分|じぶん}の {名前|なまえ}を {言|い}う「I'm Ken.」の {意味|いみ}は？",
    explanation: "「I'm（アイム）」は「{私|わたし}は〜です」の {意味|いみ}。「I'm Ken.」で「{私|わたし}は ケンです」だよ。",
    visual: { kind: "emoji", value: "🧒✨", caption: "{私|わたし}は…" },
    format: "choice",
    choices: ["{私|わたし}は ケンです", "ケンが {好|す}き", "ケン、こんにちは", "ケンは どこ？"],
    answer: "{私|わたし}は ケンです",
  },
];

// アルファベット（大文字）
const alphabetQuestions: ChoiceQuestion[] = [
  {
    id: `${U.alphabet}.q-1`,
    unitId: U.alphabet,
    prompt: "アルファベットの {一|いち}{番|ばん} {最初|さいしょ}の {文字|もじ}は どれ？",
    explanation: "アルファベットは A から {始|はじ}まるよ。A・B・C…と {順番|じゅんばん}に {並|なら}ぶよ。",
    visual: { kind: "emoji", value: "🅰️", caption: "{最初|さいしょ}は A" },
    format: "choice",
    choices: ["A", "B", "Z", "S"],
    answer: "A",
  },
  {
    id: `${U.alphabet}.q-2`,
    unitId: U.alphabet,
    prompt: "「B」の {次|つぎ}の {文字|もじ}は どれ？",
    explanation: "A・B・C の {順番|じゅんばん}だから、B の {次|つぎ}は C だよ。",
    visual: { kind: "emoji", value: "🔤", caption: "A B C…" },
    format: "choice",
    choices: ["C", "A", "D", "E"],
    answer: "C",
  },
  {
    id: `${U.alphabet}.q-3`,
    unitId: U.alphabet,
    prompt: "「apple（りんご）」の {最初|さいしょ}の {文字|もじ}は どれ？",
    explanation: "apple は エイ・ピー…と {読|よ}むよ。{最初|さいしょ}の {音|おと}は A だね。",
    visual: { kind: "emoji", value: "🍎", caption: "apple" },
    format: "choice",
    choices: ["A", "P", "E", "O"],
    answer: "A",
  },
  {
    id: `${U.alphabet}.q-4`,
    unitId: U.alphabet,
    prompt: "アルファベットは {全|ぜん}{部|ぶ}で {何|なん}{文字|もじ} あるかな？",
    explanation: "アルファベットは A から Z まで、{全|ぜん}{部|ぶ}で 26{文字|もじ} あるよ。",
    visual: { kind: "emoji", value: "🔡", caption: "A〜Z" },
    format: "choice",
    choices: ["26{文字|もじ}", "10{文字|もじ}", "50{文字|もじ}", "20{文字|もじ}"],
    answer: "26{文字|もじ}",
  },
  {
    id: `${U.alphabet}.q-5`,
    unitId: U.alphabet,
    prompt: "アルファベットの {一|いち}{番|ばん} {最後|さいご}の {文字|もじ}は どれ？",
    explanation: "アルファベットは Z で {終|お}わるよ。…X・Y・Z が {最後|さいご}の 3つだよ。",
    visual: { kind: "emoji", value: "💤", caption: "{最後|さいご}は Z" },
    format: "choice",
    choices: ["Z", "A", "Y", "W"],
    answer: "Z",
  },
];

// かず（1〜20）
const numbersQuestions: ChoiceQuestion[] = [
  {
    id: `${U.numbers}.q-1`,
    unitId: U.numbers,
    prompt: "「three（スリー）」は いくつ かな？",
    explanation: "three は 3 のことだよ。one・two・three で 1・2・3 だね。",
    visual: { kind: "emoji", value: "3️⃣", caption: "three" },
    format: "choice",
    choices: ["3", "2", "5", "8"],
    answer: "3",
  },
  {
    id: `${U.numbers}.q-2`,
    unitId: U.numbers,
    prompt: "「5」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "5 は「five（ファイブ）」だよ。{手|て}を {開|ひら}くと {指|ゆび}が 5{本|ほん} だね。",
    visual: { kind: "emoji", value: "🖐️", caption: "5" },
    format: "choice",
    choices: ["five", "four", "nine", "ten"],
    answer: "five",
  },
  {
    id: `${U.numbers}.q-3`,
    unitId: U.numbers,
    prompt: "「ten（テン）」は いくつ かな？",
    explanation: "ten は 10 のことだよ。{両手|りょうて}の {指|ゆび}を {全|ぜん}{部|ぶ} {合|あ}わせると 10 だね。",
    visual: { kind: "emoji", value: "🔟", caption: "ten" },
    format: "choice",
    choices: ["10", "1", "12", "20"],
    answer: "10",
  },
  {
    id: `${U.numbers}.q-4`,
    unitId: U.numbers,
    prompt: "「8」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "8 は「eight（エイト）」だよ。six・seven・eight で 6・7・8 だね。",
    visual: { kind: "emoji", value: "8️⃣", caption: "8" },
    format: "choice",
    choices: ["eight", "six", "seven", "nine"],
    answer: "eight",
  },
  {
    id: `${U.numbers}.q-5`,
    unitId: U.numbers,
    prompt: "「20」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "20 は「twenty（トゥエンティ）」だよ。1〜20 の {一|いち}{番|ばん} {大|おお}きい {数|かず}だね。",
    visual: { kind: "emoji", value: "🎉", caption: "20" },
    format: "choice",
    choices: ["twenty", "twelve", "ten", "two"],
    answer: "twenty",
  },
];

// いろ（colors）
const colorsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.colors}.q-1`,
    unitId: U.colors,
    prompt: "「red（レッド）」は {何色|なにいろ} かな？",
    explanation: "red は {赤色|あかいろ} だよ。りんごや いちごの {色|いろ}だね。",
    visual: { kind: "emoji", value: "🔴", caption: "red" },
    format: "choice",
    choices: ["{赤|あか}", "{青|あお}", "{黄色|きいろ}", "{緑|みどり}"],
    answer: "{赤|あか}",
  },
  {
    id: `${U.colors}.q-2`,
    unitId: U.colors,
    prompt: "「{青|あお}」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "{青|あお}は「blue（ブルー）」だよ。{空|そら}や {海|うみ}の {色|いろ}だね。",
    visual: { kind: "emoji", value: "🔵", caption: "{青|あお}" },
    format: "choice",
    choices: ["blue", "red", "green", "black"],
    answer: "blue",
  },
  {
    id: `${U.colors}.q-3`,
    unitId: U.colors,
    prompt: "「yellow（イエロー）」は {何色|なにいろ} かな？",
    explanation: "yellow は {黄色|きいろ} だよ。バナナや {太陽|たいよう}の {色|いろ}だね。",
    visual: { kind: "emoji", value: "🟡", caption: "yellow" },
    format: "choice",
    choices: ["{黄色|きいろ}", "{白|しろ}", "{赤|あか}", "{青|あお}"],
    answer: "{黄色|きいろ}",
  },
  {
    id: `${U.colors}.q-4`,
    unitId: U.colors,
    prompt: "「{緑|みどり}」は {英語|えいご}で {何|なん}と {言|い}うかな？",
    explanation: "{緑|みどり}は「green（グリーン）」だよ。{葉|は}っぱや {草|くさ}の {色|いろ}だね。",
    visual: { kind: "emoji", value: "🟢", caption: "{緑|みどり}" },
    format: "choice",
    choices: ["green", "yellow", "blue", "red"],
    answer: "green",
  },
  {
    id: `${U.colors}.q-5`,
    unitId: U.colors,
    prompt: "「white（ホワイト）」は {何色|なにいろ} かな？",
    explanation: "white は {白|しろ} だよ。{雪|ゆき}や {雲|くも}の {色|いろ}だね。",
    visual: { kind: "emoji", value: "⚪", caption: "white" },
    format: "choice",
    choices: ["{白|しろ}", "{黒|くろ}", "{赤|あか}", "{緑|みどり}"],
    answer: "{白|しろ}",
  },
];

// きぶん（How are you？）
const feelingsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.feelings}.q-1`,
    unitId: U.feelings,
    prompt: "「How are you？」の {意味|いみ}は どれ かな？",
    explanation: "「How are you？（ハウ アー ユー）」は「{元気|げんき}？／{調子|ちょうし}は どう？」と {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🤔💬", caption: "How are you？" },
    format: "choice",
    choices: ["{元気|げんき}？", "{名前|なまえ}は {何|なに}？", "{何|なん}{歳|さい}？", "どこに いるの？"],
    answer: "{元気|げんき}？",
  },
  {
    id: `${U.feelings}.q-2`,
    unitId: U.feelings,
    prompt: "{元気|げんき}な ときの {答|こた}え「I'm fine.」の {意味|いみ}は？",
    explanation: "「fine（ファイン）」は「{元気|げんき}・{大丈夫|だいじょうぶ}」だよ。「I'm fine.」で「{元気|げんき}だよ」だね。",
    visual: { kind: "emoji", value: "😄👍", caption: "I'm fine!" },
    format: "choice",
    choices: ["{元気|げんき}だよ", "{悲|かな}しいよ", "{眠|ねむ}いよ", "{怒|おこ}ってるよ"],
    answer: "{元気|げんき}だよ",
  },
  {
    id: `${U.feelings}.q-3`,
    unitId: U.feelings,
    prompt: "「happy（ハッピー）」は どんな {気持|きも}ち かな？",
    explanation: "happy は「{嬉|うれ}しい・{楽|たの}しい」{気持|きも}ち だよ。にこにこ している ときだね。",
    visual: { kind: "emoji", value: "😊", caption: "happy" },
    format: "choice",
    choices: ["{嬉|うれ}しい", "{悲|かな}しい", "{怒|おこ}ってる", "{怖|こわ}い"],
    answer: "{嬉|うれ}しい",
  },
  {
    id: `${U.feelings}.q-4`,
    unitId: U.feelings,
    prompt: "「sad（サッド）」は どんな {気持|きも}ち かな？",
    explanation: "sad は「{悲|かな}しい」{気持|きも}ち だよ。{涙|なみだ}が {出|で}そうな ときだね。",
    visual: { kind: "emoji", value: "😢", caption: "sad" },
    format: "choice",
    choices: ["{悲|かな}しい", "{嬉|うれ}しい", "{眠|ねむ}い", "お{腹|なか}すいた"],
    answer: "{悲|かな}しい",
  },
  {
    id: `${U.feelings}.q-5`,
    unitId: U.feelings,
    prompt: "「I'm hungry.」の {意味|いみ}は どれ かな？",
    explanation: "hungry（ハングリー）は「お{腹|なか}が すいた」だよ。ご{飯|はん}が {食|た}べたい ときだね。",
    visual: { kind: "emoji", value: "🍽️😋", caption: "hungry" },
    format: "choice",
    choices: ["お{腹|なか}が すいた", "{喉|のど}が {渇|かわ}いた", "{眠|ねむ}い", "{嬉|うれ}しい"],
    answer: "お{腹|なか}が すいた",
  },
];

// すきなもの（I like〜）
const likesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.likes}.q-1`,
    unitId: U.likes,
    prompt: "「I like 〜.」の {意味|いみ}は どれ かな？",
    explanation: "「I like（アイ ライク）〜.」は「{私|わたし}は 〜が {好|す}き」だよ。{好|す}きな {物|もの}を {言|い}えるね。",
    visual: { kind: "emoji", value: "❤️", caption: "I like…" },
    format: "choice",
    choices: ["{私|わたし}は 〜が {好|す}き", "{私|わたし}は 〜が {嫌|きら}い", "〜は どこ？", "〜が {欲|ほ}しい？"],
    answer: "{私|わたし}は 〜が {好|す}き",
  },
  {
    id: `${U.likes}.q-2`,
    unitId: U.likes,
    prompt: "「I like dogs.」の {意味|いみ}は どれ かな？",
    explanation: "dogs（ドッグズ）は {犬|いぬ} のこと。「I like dogs.」で「{犬|いぬ}が {好|す}き」だよ。",
    visual: { kind: "emoji", value: "🐶", caption: "dogs" },
    format: "choice",
    choices: ["{犬|いぬ}が {好|す}き", "{猫|ねこ}が {好|す}き", "{犬|いぬ}が {怖|こわ}い", "{犬|いぬ}が いない"],
    answer: "{犬|いぬ}が {好|す}き",
  },
  {
    id: `${U.likes}.q-3`,
    unitId: U.likes,
    prompt: "{好|す}きな {食|た}べ{物|もの}を {言|い}うとき、どの {言葉|ことば}で {始|はじ}める かな？",
    explanation: "{好|す}きな ものは「I like 〜.」で {伝|つた}えるよ。「I like apples.」で「りんごが {好|す}き」だね。",
    visual: { kind: "emoji", value: "🍎😋", caption: "I like apples." },
    format: "choice",
    choices: ["I like", "Goodbye", "Thank you", "How are you"],
    answer: "I like",
  },
  {
    id: `${U.likes}.q-4`,
    unitId: U.likes,
    prompt: "「Do you like blue？」の {意味|いみ}は どれ かな？",
    explanation: "「Do you like 〜？（ドゥ ユー ライク）」は「〜が {好|す}き？」と {相手|あいて}に {聞|き}く {言葉|ことば}だよ。",
    visual: { kind: "emoji", value: "🔵❓", caption: "Do you like blue？" },
    format: "choice",
    choices: ["{青|あお}が {好|す}き？", "{青|あお}が {嫌|きら}い", "{青|あお}を ください", "{青|あお}は どこ？"],
    answer: "{青|あお}が {好|す}き？",
  },
  {
    id: `${U.likes}.q-5`,
    unitId: U.likes,
    prompt: "「{好|す}き？」と {聞|き}かれて「うん、{好|す}き」と {答|こた}えるのは どれ？",
    explanation: "「Yes, I do.（イエス アイ ドゥ）」で「うん、{好|す}きだよ」と {答|こた}えられるよ。",
    visual: { kind: "emoji", value: "🙆✨", caption: "Yes, I do!" },
    format: "choice",
    choices: ["Yes, I do.", "No, thank you.", "Goodbye.", "Sorry."],
    answer: "Yes, I do.",
  },
];

export const eigoG3Contents: Record<string, UnitContent> = {
  [U.greetings]: {
    unitId: U.greetings,
    learn: {
      unitId: U.greetings,
      steps: [
        {
          heading: "{挨|あい}{拶|さつ}って {何|なに}？",
          body: "{人|ひと}に {会|あ}ったとき {英語|えいご}では「Hello（ハロー）」と {言|い}うよ。{笑顔|えがお}で {言|い}ってみよう。",
          visual: { kind: "emoji", value: "🙋👋", caption: "Hello！" },
        },
        {
          heading: "いろいろな {挨|あい}{拶|さつ}",
          body: "{別|わか}れるときは「Goodbye（グッバイ）」、お{礼|れい}は「Thank you（サンキュー）」、{謝|あやま}るときは「Sorry（ソーリー）」だよ。",
          visual: { kind: "emoji", value: "👋🙏🙇", caption: "Goodbye / Thank you / Sorry" },
        },
        {
          heading: "{名前|なまえ}を {言|い}ってみよう",
          body: "「I'm 〜.（アイム）」で「{私|わたし}は 〜です」。「I'm Ken.」で「{私|わたし}は ケンです」だよ。",
          visual: { kind: "emoji", value: "🧒✨", caption: "I'm Ken." },
        },
      ],
    },
    test: {
      unitId: U.greetings,
      questions: greetingsQuestions,
      questionCount: 5,
    },
  },

  [U.alphabet]: {
    unitId: U.alphabet,
    learn: {
      unitId: U.alphabet,
      steps: [
        {
          heading: "アルファベットって {何|なに}？",
          body: "{英語|えいご}の {文字|もじ}を アルファベット と {言|い}うよ。A から Z まで、{全|ぜん}{部|ぶ}で 26{文字|もじ} あるよ。",
          visual: { kind: "emoji", value: "🔤", caption: "A B C … Z" },
        },
        {
          heading: "{順番|じゅんばん}を {覚|おぼ}えよう",
          body: "A・B・C・D…と {順番|じゅんばん}が {決|き}まっているよ。{歌|うた}に のせて {読|よ}むと {覚|おぼ}えやすいよ。",
          visual: { kind: "emoji", value: "🎵🔡", caption: "ABCの{歌|うた}" },
        },
        {
          heading: "{身|み}の{回|まわ}りの {文字|もじ}",
          body: "{看板|かんばん}や ロゴにも アルファベットの {大文字|おおもじ}が {使|つか}われているよ。{探|さが}してみよう。",
          visual: { kind: "emoji", value: "🚌🏪", caption: "BUS / OPEN" },
        },
      ],
    },
    test: {
      unitId: U.alphabet,
      questions: alphabetQuestions,
      questionCount: 5,
    },
  },

  [U.numbers]: {
    unitId: U.numbers,
    learn: {
      unitId: U.numbers,
      steps: [
        {
          heading: "1から10まで",
          body: "one(1)・two(2)・three(3)・four(4)・five(5)…と {数|かぞ}えるよ。{指|ゆび}で {数|かぞ}えてみよう。",
          visual: { kind: "svg", name: "number-blocks", params: { count: 10 }, caption: "1〜10" },
        },
        {
          heading: "11から20まで",
          body: "ten(10)の {次|つぎ}は eleven(11)・twelve(12)…twenty(20) と {続|つづ}くよ。",
          visual: { kind: "emoji", value: "🔟➡️🎉", caption: "10 → 20" },
        },
        {
          heading: "{使|つか}ってみよう",
          body: "「How many？（ハウ メニー）」は「いくつ？」。{数|かず}を {英語|えいご}で {答|こた}えてみよう。",
          visual: { kind: "emoji", value: "🍎🍎🍎", caption: "three apples" },
        },
      ],
    },
    test: {
      unitId: U.numbers,
      questions: numbersQuestions,
      questionCount: 5,
    },
  },

  [U.colors]: {
    unitId: U.colors,
    learn: {
      unitId: U.colors,
      steps: [
        {
          heading: "{色|いろ}の {英語|えいご}",
          body: "{赤|あか}=red、{青|あお}=blue、{黄色|きいろ}=yellow、{緑|みどり}=green だよ。{身|み}の{回|まわ}りの {色|いろ}を {言|い}ってみよう。",
          visual: { kind: "emoji", value: "🔴🔵🟡🟢", caption: "red / blue / yellow / green" },
        },
        {
          heading: "もっと {色|いろ}",
          body: "{白|しろ}=white、{黒|くろ}=black、ピンク=pink、オレンジ=orange だよ。{好|す}きな {色|いろ}は どれ？",
          visual: { kind: "emoji", value: "⚪⚫🌸🟠", caption: "white / black / pink / orange" },
        },
        {
          heading: "{使|つか}ってみよう",
          body: "「What color？（ワット カラー）」は「{何色|なにいろ}？」。「It's red.」で「{赤|あか}だよ」と {答|こた}えられるよ。",
          visual: { kind: "emoji", value: "🌈", caption: "What color？" },
        },
      ],
    },
    test: {
      unitId: U.colors,
      questions: colorsQuestions,
      questionCount: 5,
    },
  },

  [U.feelings]: {
    unitId: U.feelings,
    learn: {
      unitId: U.feelings,
      steps: [
        {
          heading: "How are you？",
          body: "「How are you？（ハウ アー ユー）」は「{元気|げんき}？」と {聞|き}く {言葉|ことば}だよ。{挨|あい}{拶|さつ}の {次|つぎ}に よく {使|つか}うよ。",
          visual: { kind: "emoji", value: "🤔💬", caption: "How are you？" },
        },
        {
          heading: "{気分|きぶん}を {答|こた}えよう",
          body: "「I'm fine.」{元気|げんき}、「I'm happy.」{嬉|うれ}しい、「I'm sad.」{悲|かな}しい、「I'm sleepy.」{眠|ねむ}い だよ。",
          visual: { kind: "emoji", value: "😄😊😢😴", caption: "fine / happy / sad / sleepy" },
        },
        {
          heading: "やりとりして みよう",
          body: "「How are you？」「I'm happy！」のように、{聞|き}かれたら {自分|じぶん}の {気分|きぶん}を {言|い}ってみよう。",
          visual: { kind: "emoji", value: "🙋😊", caption: "I'm happy!" },
        },
      ],
    },
    test: {
      unitId: U.feelings,
      questions: feelingsQuestions,
      questionCount: 5,
    },
  },

  [U.likes]: {
    unitId: U.likes,
    learn: {
      unitId: U.likes,
      steps: [
        {
          heading: "I like 〜.",
          body: "「I like 〜.（アイ ライク）」は「{私|わたし}は 〜が {好|す}き」だよ。{好|す}きな {物|もの}を {伝|つた}えられるね。",
          visual: { kind: "emoji", value: "❤️", caption: "I like …" },
        },
        {
          heading: "{好|す}きな {物|もの}を {言|い}おう",
          body: "「I like dogs.」{犬|いぬ}が {好|す}き、「I like apples.」りんごが {好|す}き、「I like blue.」{青|あお}が {好|す}き だよ。",
          visual: { kind: "emoji", value: "🐶🍎🔵", caption: "dogs / apples / blue" },
        },
        {
          heading: "{相手|あいて}に {聞|き}いて みよう",
          body: "「Do you like 〜？」は「〜が {好|す}き？」。「Yes, I do.」うん／「No, I don't.」ううん で {答|こた}えるよ。",
          visual: { kind: "emoji", value: "🙆🙅", caption: "Yes, I do. / No, I don't." },
        },
      ],
    },
    test: {
      unitId: U.likes,
      questions: likesQuestions,
      questionCount: 5,
    },
  },
};
