// ══════════════════════════════════════════
// カリキュラム: IT分野（じょうほう）小2
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId("it") / 領域 = "it.<domain-slug>"
//          単元 = "it.g2.<slug>"
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形。
// 全表示テキストはルビ記法 {漢字|よみ}（全漢字ルビ）で記述。
// IT分野 = 「動かす・作る」実務寄り（応用 oyo は数学的本質で角度を変える）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  Question,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// ※ Subject 定義は各学年ファイルに重複して置く形（テンプレ同形）。
//   中央集約時はどれか1つを採用する（申し送り）。SubjectId は drill.ts に "it" 追加済み。

export const itSubject: Subject = {
  id: "it",
  name: "{情報|じょうほう}",
  formalName: "情報・コンピュータ",
  emoji: "💻",
  theme: "sky",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────

export const itG2Domains: Domain[] = [
  {
    id: "it.computer-basics",
    subjectId: "it",
    name: "コンピュータのきほん",
    formalName: "コンピュータの基本",
  },
  {
    id: "it.algorithm",
    subjectId: "it",
    name: "アルゴリズム",
    formalName: "アルゴリズム（手順）",
  },
  {
    id: "it.programming",
    subjectId: "it",
    name: "プログラミング",
    formalName: "プログラミング",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ:
//
//   computer-around-us ─┬─▶ input-output ──▶ command-move ──▶ debug
//                       └─▶ password-safe
//   (sansuu.g1.numbers-to-10) ─▶ steps-order ─┬─▶ repeat-loop ─▶ command-move
//                                             └─▶ command-move
//
// ※ leadsTo の一部は it.g3.* を先行参照（将来 g3 が作られる前提。バリデータが最終解決を検査）。
//
const U = {
  computerAround: "it.g2.computer-around-us",
  inputOutput: "it.g2.input-output",
  passwordSafe: "it.g2.password-safe",
  stepsOrder: "it.g2.steps-order",
  repeatLoop: "it.g2.repeat-loop",
  commandMove: "it.g2.command-move",
  debug: "it.g2.debug",
} as const;

// 先行参照（他学年・他教科。存在を仮定して依存グラフを張る）
const REF = {
  sansuuNumbersTo10: "sansuu.g1.numbers-to-10", // 算数の数・順序の感覚（実在）
  itG3InfoMoral: "it.g3.info-safety",            // 情報モラル発展（g3 で作成予定）
  itG3VariableIntro: "it.g3.commands",    // 変数の入口（g3 で作成予定）
  itG3Flowchart: "it.g3.flowchart",             // フローチャート（g3 で作成予定）
} as const;

export const itG2Units: Unit[] = [
  {
    id: U.computerAround,
    subjectId: "it",
    grade: 2,
    domainId: "it.computer-basics",
    title: "みのまわりのコンピュータ",
    order: 1,
    realWorldUse:
      "スマホ・ゲームき・でんしレンジ・しんごうきなど、{身|み}の{回|まわ}りには コンピュータが いっぱい かくれて いるよ。",
    leadsTo: [U.inputOutput, U.passwordSafe],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.inputOutput,
    subjectId: "it",
    grade: 2,
    domainId: "it.computer-basics",
    title: "いれるとだす（にゅうりょく・しゅつりょく）",
    order: 2,
    realWorldUse:
      "ボタンを おす（いれる）と {音|おと}や {絵|え}が でる（だす）。ゲームや スマホは いつも これを して いるよ。",
    leadsTo: [U.commandMove],
    prerequisites: [U.computerAround],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.passwordSafe,
    subjectId: "it",
    grade: 2,
    domainId: "it.computer-basics",
    title: "パスワードとあんぜん",
    order: 3,
    realWorldUse:
      "じぶんの たいせつな {物|もの}を まもる かぎが パスワード。{名前|なまえ}や じゅうしょを かってに おしえない ことも まなぶよ。",
    leadsTo: [REF.itG3InfoMoral],
    prerequisites: [U.computerAround],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.stepsOrder,
    subjectId: "it",
    grade: 2,
    domainId: "it.algorithm",
    title: "てじゅんのじゅんばん",
    order: 4,
    realWorldUse:
      "りょうりや したくは じゅんばんが たいせつ。「{何|なに}を さきに するか」を かんがえる ちからは ロボットや AI を うごかす もとに なるよ。",
    leadsTo: [U.repeatLoop, U.commandMove],
    prerequisites: [REF.sansuuNumbersTo10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.repeatLoop,
    subjectId: "it",
    grade: 2,
    domainId: "it.algorithm",
    title: "くりかえし",
    order: 5,
    realWorldUse:
      "おなじ ことを なんども する とき「くりかえし」を つかうと みじかく かける。ダンスや たいそうの ふりつけも くりかえしだよ。",
    leadsTo: [U.commandMove, REF.itG3Flowchart],
    prerequisites: [U.stepsOrder],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.commandMove,
    subjectId: "it",
    grade: 2,
    domainId: "it.programming",
    title: "めいれいでうごかす",
    order: 6,
    realWorldUse:
      "「みぎ」「うえ」などの めいれいを ならべると ロボットや キャラクターが その とおりに うごく。これが プログラミングの はじまりだよ。",
    leadsTo: [U.debug, REF.itG3VariableIntro],
    prerequisites: [U.stepsOrder, U.inputOutput],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.debug,
    subjectId: "it",
    grade: 2,
    domainId: "it.programming",
    title: "まちがいさがし（デバッグ）",
    order: 7,
    realWorldUse:
      "プログラムが おもいどおりに うごかない とき、どこが まちがいか さがして なおす ことを デバッグと いうよ。",
    leadsTo: [REF.itG3Flowchart],
    prerequisites: [U.commandMove, U.repeatLoop],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// IT分野は固定 questions[]（動的 generator は算数系のみ）。全問 explanation 必須。

// 単元1: みのまわりのコンピュータ（choice 知識）
const computerAroundQuestions: Question[] = [
  {
    id: `${U.computerAround}.q-1`,
    unitId: U.computerAround,
    prompt: "つぎの うち、コンピュータが はいって いる ものは どれ？",
    explanation:
      "スマホの {中|なか}には ちいさな コンピュータが あるよ。{石|いし}や はっぱ には ないね。",
    visual: { kind: "emoji", value: "📱", caption: "スマホ" },
    format: "choice",
    choices: ["スマホ", "{石|いし}", "はっぱ", "コップ"],
    answer: "スマホ",
  },
  {
    id: `${U.computerAround}.q-2`,
    unitId: U.computerAround,
    prompt: "ゲームきの 中で、{絵|え}を うごかして いる ものは なに？",
    explanation:
      "ゲームきの 中では コンピュータが はやく {計算|けいさん}して {絵|え}を うごかして いるよ。",
    visual: { kind: "emoji", value: "🎮", caption: "ゲームき" },
    format: "choice",
    choices: ["コンピュータ", "{水|みず}", "{砂|すな}", "ふうせん"],
    answer: "コンピュータ",
  },
  {
    id: `${U.computerAround}.q-3`,
    unitId: U.computerAround,
    prompt: "つぎの うち、コンピュータが つかわれて いない ものは どれ？",
    explanation:
      "でんしレンジ・しんごうき・じどうはんばいきには コンピュータが あるよ。えんぴつには ないね。",
    format: "choice",
    choices: ["えんぴつ", "でんしレンジ", "しんごうき", "じどうはんばいき"],
    answer: "えんぴつ",
  },
  {
    id: `${U.computerAround}.q-4`,
    unitId: U.computerAround,
    prompt: "コンピュータは どんな ことが とくい？",
    explanation:
      "コンピュータは おなじ ことを はやく なんども するのが とくいだよ。つかれないのが すごい ところ。",
    format: "choice",
    choices: [
      "おなじ ことを はやく なんども する",
      "ごはんを たべる",
      "ねむく なる",
      "かぜを ひく",
    ],
    answer: "おなじ ことを はやく なんども する",
  },
  {
    id: `${U.computerAround}.q-5`,
    unitId: U.computerAround,
    prompt: "コンピュータは じぶんで かってに {考|かんが}えて うごく？",
    explanation:
      "コンピュータは {人|ひと}が おしえた めいれいの とおりに うごくよ。かってには うごかないんだ。",
    format: "choice",
    choices: [
      "ううん、{人|ひと}の めいれいの とおりに うごく",
      "うん、なんでも かってに きめる",
      "きぶんで うごく",
      "ねて いる",
    ],
    answer: "ううん、{人|ひと}の めいれいの とおりに うごく",
  },
];

// 単元2: いれるとだす（matching + choice）
const inputOutputQuestions: Question[] = [
  {
    id: `${U.inputOutput}.q-1`,
    unitId: U.inputOutput,
    prompt: "「いれる（にゅうりょく）」と「だす（しゅつりょく）」を ただしく つなげよう。",
    explanation:
      "ボタンや キーは「いれる」どうぐ、{画面|がめん}や スピーカーは「だす」どうぐだよ。",
    format: "matching",
    left: ["キーボード", "{画面|がめん}", "スピーカー"],
    right: ["{文字|もじ}を いれる", "{絵|え}を だす", "{音|おと}を だす"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.inputOutput}.q-2`,
    unitId: U.inputOutput,
    prompt: "スマホの がめんを ゆびで さわるのは どっち？",
    explanation:
      "ゆびで さわって めいれいを いれるので「にゅうりょく（いれる）」だよ。",
    visual: { kind: "emoji", value: "👆📱", caption: "タッチ" },
    format: "choice",
    choices: ["いれる（にゅうりょく）", "だす（しゅつりょく）", "どちらでもない", "こわれて いる"],
    answer: "いれる（にゅうりょく）",
  },
  {
    id: `${U.inputOutput}.q-3`,
    unitId: U.inputOutput,
    prompt: "スピーカーから {音|おと}が きこえるのは どっち？",
    explanation:
      "コンピュータが {音|おと}を そとに だして いるので「しゅつりょく（だす）」だよ。",
    visual: { kind: "emoji", value: "🔊", caption: "おと" },
    format: "choice",
    choices: ["だす（しゅつりょく）", "いれる（にゅうりょく）", "どちらでもない", "ないしょ"],
    answer: "だす（しゅつりょく）",
  },
  {
    id: `${U.inputOutput}.q-4`,
    unitId: U.inputOutput,
    prompt: "つぎの うち「いれる どうぐ」は どれ？",
    explanation:
      "マイクは {声|こえ}を いれる どうぐ。{画面|がめん}・プリンター・スピーカーは だす どうぐだよ。",
    format: "choice",
    choices: ["マイク", "{画面|がめん}", "プリンター", "スピーカー"],
    answer: "マイク",
  },
  {
    id: `${U.inputOutput}.q-5`,
    unitId: U.inputOutput,
    prompt: "ボタンを おすと {音|おと}が なる。これは どんな ながれ？",
    explanation:
      "ボタンで「いれて」、{音|おと}を「だす」。いれる→だす の ながれだよ。",
    format: "choice",
    choices: [
      "いれる → だす",
      "だす → いれる",
      "だす だけ",
      "なにも しない",
    ],
    answer: "いれる → だす",
  },
];

// 単元3: パスワードとあんぜん（choice 情報モラル）
const passwordSafeQuestions: Question[] = [
  {
    id: `${U.passwordSafe}.q-1`,
    unitId: U.passwordSafe,
    prompt: "パスワードは どう するのが よい？",
    explanation:
      "パスワードは じぶんの たいせつな かぎ。{人|ひと}に おしえず ひみつに するよ。",
    visual: { kind: "emoji", value: "🔑", caption: "かぎ" },
    format: "choice",
    choices: [
      "じぶんだけの ひみつに する",
      "ともだち みんなに おしえる",
      "かべに はって おく",
      "おおきな こえで いう",
    ],
    answer: "じぶんだけの ひみつに する",
  },
  {
    id: `${U.passwordSafe}.q-2`,
    unitId: U.passwordSafe,
    prompt: "ネットで しらない {人|ひと}に「{名前|なまえ}と じゅうしょを おしえて」と いわれたら？",
    explanation:
      "{名前|なまえ}や じゅうしょは たいせつな {自分|じぶん}の {情報|じょうほう}。しらない {人|ひと}に おしえないで、おうちの {人|ひと}に そうだんしよう。",
    format: "choice",
    choices: [
      "おしえないで おうちの {人|ひと}に そうだんする",
      "すぐに おしえる",
      "じゅうしょだけ おしえる",
      "しゃしんも おくる",
    ],
    answer: "おしえないで おうちの {人|ひと}に そうだんする",
  },
  {
    id: `${U.passwordSafe}.q-3`,
    unitId: U.passwordSafe,
    prompt: "つよい パスワードは どれ？",
    explanation:
      "「1234」や「じぶんの なまえ」は すぐ ばれて しまう。ながくて バラバラな ほうが つよいよ。",
    format: "choice",
    choices: ["k7m@p2q", "1234", "なまえ", "0000"],
    answer: "k7m@p2q",
  },
  {
    id: `${U.passwordSafe}.q-4`,
    unitId: U.passwordSafe,
    prompt: "ともだちに いやな ことを かいて おくるのは どう？",
    explanation:
      "ネットでも {相手|あいて}の {気持|きも}ちを かんがえる ことが たいせつ。いやな ことは おくらないよ。",
    format: "choice",
    choices: [
      "おくらない（{相手|あいて}が かなしむ）",
      "こっそり おくる",
      "なんども おくる",
      "みんなに ひろめる",
    ],
    answer: "おくらない（{相手|あいて}が かなしむ）",
  },
  {
    id: `${U.passwordSafe}.q-5`,
    unitId: U.passwordSafe,
    prompt: "へんな メッセージや「あたり！」が きたら どう する？",
    explanation:
      "あやしい ものは じぶんで さわらず、おうちの {人|ひと}に みせて たしかめて もらおう。",
    format: "choice",
    choices: [
      "さわらず おうちの {人|ひと}に みせる",
      "すぐ おす",
      "{番号|ばんごう}を いれる",
      "ともだちに まわす",
    ],
    answer: "さわらず おうちの {人|ひと}に みせる",
  },
];

// 単元4: てじゅんのじゅんばん（ordering）
const stepsOrderQuestions: Question[] = [
  {
    id: `${U.stepsOrder}.q-1`,
    unitId: U.stepsOrder,
    prompt: "あさ おきてから がっこうへ いく じゅんばんに ならべよう。",
    explanation:
      "おきる → {顔|かお}を {洗|あら}う → ふくを {着|き}る → いえを {出|で}る、の じゅんばんだよ。",
    format: "ordering",
    items: ["いえを {出|で}る", "おきる", "ふくを {着|き}る", "{顔|かお}を {洗|あら}う"],
    answerOrder: [1, 3, 2, 0],
  },
  {
    id: `${U.stepsOrder}.q-2`,
    unitId: U.stepsOrder,
    prompt: "カップラーメンを つくる じゅんばんに ならべよう。",
    explanation:
      "ふたを あける → おゆを いれる → 3ぷん まつ → たべる、の じゅんばん。さきに おゆを いれないと できないね。",
    format: "ordering",
    items: ["3ぷん まつ", "ふたを あける", "たべる", "おゆを いれる"],
    answerOrder: [1, 3, 0, 2],
  },
  {
    id: `${U.stepsOrder}.q-3`,
    unitId: U.stepsOrder,
    prompt: "{手|て}を あらう じゅんばんに ならべよう。",
    explanation:
      "みずで ぬらす → せっけんを つける → あわで あらう → みずで ながす、の じゅんばんだよ。",
    format: "ordering",
    items: ["あわで あらう", "みずで ぬらす", "みずで ながす", "せっけんを つける"],
    answerOrder: [1, 3, 0, 2],
  },
  {
    id: `${U.stepsOrder}.q-4`,
    unitId: U.stepsOrder,
    prompt: "じゅんばんを まちがえると どう なる？",
    explanation:
      "てじゅんは じゅんばんが たいせつ。さきに する ことを まちがえると うまく いかないよ。",
    format: "choice",
    choices: [
      "うまく できない ことが ある",
      "かならず せいこうする",
      "はやく なる",
      "なにも かわらない",
    ],
    answer: "うまく できない ことが ある",
  },
];

// 単元5: くりかえし（choice + ordering）
const repeatLoopQuestions: Question[] = [
  {
    id: `${U.repeatLoop}.q-1`,
    unitId: U.repeatLoop,
    prompt: "「ジャンプ・ジャンプ・ジャンプ」を みじかく かくと？",
    explanation:
      "おなじ ことを 3かい するので「ジャンプを 3かい くりかえす」と かけるよ。",
    visual: { kind: "emoji", value: "🦘🦘🦘", caption: "3かい" },
    format: "choice",
    choices: [
      "ジャンプを 3かい くりかえす",
      "ジャンプを 1かい",
      "あるくを 3かい",
      "なにも しない",
    ],
    answer: "ジャンプを 3かい くりかえす",
  },
  {
    id: `${U.repeatLoop}.q-2`,
    unitId: U.repeatLoop,
    prompt: "「くりかえし」を つかうと よい ことは なに？",
    explanation:
      "おなじ めいれいを なんども かかずに すむので、みじかく かけて まちがいも へるよ。",
    format: "choice",
    choices: [
      "みじかく かけて まちがいが へる",
      "ながく なる",
      "むずかしく なる",
      "うごかなく なる",
    ],
    answer: "みじかく かけて まちがいが へる",
  },
  {
    id: `${U.repeatLoop}.q-3`,
    unitId: U.repeatLoop,
    prompt: "🔵を 5こ ならべる めいれいは どれ？",
    explanation:
      "「🔵を おく」を 5かい くりかえせば 5こ ならぶね。",
    format: "choice",
    choices: [
      "「🔵を おく」を 5かい くりかえす",
      "「🔵を おく」を 1かい",
      "「🔴を おく」を 5かい",
      "なにも おかない",
    ],
    answer: "「🔵を おく」を 5かい くりかえす",
  },
  {
    id: `${U.repeatLoop}.q-4`,
    unitId: U.repeatLoop,
    prompt: "ラジオたいそうの「て を 4かい たたく」を てじゅんに ならべよう。",
    explanation:
      "おなじ「たたく」を 4かい くりかえす、これが くりかえしだよ。",
    format: "ordering",
    items: ["たたく(2かいめ)", "たたく(1かいめ)", "たたく(4かいめ)", "たたく(3かいめ)"],
    answerOrder: [1, 0, 3, 2],
  },
];

// 単元6: めいれいでうごかす（ordering + choice）
const commandMoveQuestions: Question[] = [
  {
    id: `${U.commandMove}.q-1`,
    unitId: U.commandMove,
    prompt: "ロボットを 🟦から 🎯まで うごかす めいれいを ならべよう（みぎ・みぎ・うえ）。",
    explanation:
      "みぎへ 2かい、つぎに うえへ 1かいで ゴールに つくよ。めいれいの じゅんばんが たいせつ。",
    visual: { kind: "emoji", value: "🟦➡️➡️⬆️🎯", caption: "ゴールまで" },
    format: "ordering",
    items: ["うえ", "みぎ", "みぎ"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.commandMove}.q-2`,
    unitId: U.commandMove,
    prompt: "「まえに すすむ」めいれいを 2つ ならべると ロボットは どう なる？",
    explanation:
      "まえに すすむを 2かい するので、2ます まえに いくよ。",
    format: "choice",
    choices: ["2ます まえに いく", "1ます まえ", "うしろに さがる", "とまる"],
    answer: "2ます まえに いく",
  },
  {
    id: `${U.commandMove}.q-3`,
    unitId: U.commandMove,
    prompt: "コンピュータは めいれいを どの じゅんで よむ？",
    explanation:
      "コンピュータは うえから したへ、ならべた じゅんばんの とおりに めいれいを よむよ。",
    format: "choice",
    choices: [
      "うえから じゅんばんに",
      "すきな じゅんで",
      "したから だけ",
      "よまない",
    ],
    answer: "うえから じゅんばんに",
  },
  {
    id: `${U.commandMove}.q-4`,
    unitId: U.commandMove,
    prompt: "ブロックを つなげて プログラムを つくる かんがえかたは？",
    explanation:
      "めいれいの ブロックを じゅんばんに つなげると、その とおりに うごく。これが ブロックプログラミングだよ。",
    format: "choice",
    choices: [
      "めいれいの ブロックを じゅんに つなげる",
      "ブロックを ばらばらに おく",
      "{絵|え}を かくだけ",
      "なにも つなげない",
    ],
    answer: "めいれいの ブロックを じゅんに つなげる",
  },
  {
    id: `${U.commandMove}.q-5`,
    unitId: U.commandMove,
    prompt: "おなじ めいれいを たくさん ならべる かわりに つかえるのは？",
    explanation:
      "おなじ めいれいが つづく ときは「くりかえし」を つかうと みじかく かけるよ。",
    format: "choice",
    choices: ["くりかえし", "けしゴム", "いろえんぴつ", "ものさし"],
    answer: "くりかえし",
  },
];

// 単元7: まちがいさがし（デバッグ）（choice + matching）
const debugQuestions: Question[] = [
  {
    id: `${U.debug}.q-1`,
    unitId: U.debug,
    prompt: "プログラムが おもいどおりに うごかない とき、まず する ことは？",
    explanation:
      "どこが まちがいか さがして なおす ことを デバッグと いうよ。あわてず ひとつずつ しらべよう。",
    format: "choice",
    choices: [
      "どこが まちがいか さがす",
      "コンピュータを なげる",
      "そのまま ほうって おく",
      "けして やめる",
    ],
    answer: "どこが まちがいか さがす",
  },
  {
    id: `${U.debug}.q-2`,
    unitId: U.debug,
    prompt: "🎯は うえに あるのに ロボットが「した」へ いった。どの めいれいを なおす？",
    explanation:
      "いきたい ほうこうと はんたいの「した」が まちがい。「うえ」に なおせば ゴールできるよ。",
    visual: { kind: "emoji", value: "🎯⬆️ vs ⬇️", caption: "ほうこうの まちがい" },
    format: "choice",
    choices: ["「した」を「うえ」に なおす", "もっと「した」を ふやす", "「みぎ」を けす", "なにも しない"],
    answer: "「した」を「うえ」に なおす",
  },
  {
    id: `${U.debug}.q-3`,
    unitId: U.debug,
    prompt: "🔵を 3こ ならべたいのに 2こ しか ない。どう なおす？",
    explanation:
      "くりかえしの かいすうが 1つ たりない。3かいに ふやせば 3こ ならぶよ。",
    format: "choice",
    choices: [
      "くりかえしを 3かいに ふやす",
      "くりかえしを 1かいに へらす",
      "🔵を けす",
      "🔴に かえる",
    ],
    answer: "くりかえしを 3かいに ふやす",
  },
  {
    id: `${U.debug}.q-4`,
    unitId: U.debug,
    prompt: "まちがいの ようすと なおしかたを つなげよう。",
    explanation:
      "とおりすぎ→かいすうを へらす、たりない→ふやす、ほうこうちがい→むきを なおす、が きほんだよ。",
    format: "matching",
    left: ["とおりすぎた", "とどかない", "むきが ちがう"],
    right: ["すすむ かいすうを へらす", "すすむ かいすうを ふやす", "ほうこうを なおす"],
    answerPairs: [0, 1, 2],
  },
  {
    id: `${U.debug}.q-5`,
    unitId: U.debug,
    prompt: "デバッグが できると どんな いい ことが ある？",
    explanation:
      "まちがいを じぶんで みつけて なおせると、プログラムを おもいどおりに うごかせるように なるよ。",
    format: "choice",
    choices: [
      "プログラムを おもいどおりに うごかせる",
      "もっと こわれる",
      "なにも かわらない",
      "おそく なる だけ",
    ],
    answer: "プログラムを おもいどおりに うごかせる",
  },
];

export const itG2Contents: Record<string, UnitContent> = {
  [U.computerAround]: {
    unitId: U.computerAround,
    learn: {
      unitId: U.computerAround,
      steps: [
        {
          heading: "コンピュータって どこに ある？",
          body: "スマホ・ゲームき・でんしレンジ・しんごうき…。{身|み}の{回|まわ}りには コンピュータが かくれて いる ものが いっぱい あるよ。",
          visual: { kind: "emoji", value: "📱🎮📺🚦", caption: "みのまわりの コンピュータ" },
        },
        {
          heading: "コンピュータは なにが とくい？",
          body: "コンピュータは おなじ ことを とても はやく なんども するのが とくい。つかれないで {計算|けいさん}できるよ。",
          visual: { kind: "emoji", value: "💻⚡", caption: "はやく けいさん" },
        },
        {
          heading: "かってには うごかない",
          body: "コンピュータは {人|ひと}が おしえた めいれいの とおりに うごくよ。だから「どう うごかすか」を かんがえる ことが だいじ。",
          visual: { kind: "emoji", value: "🧑‍💻➡️🤖", caption: "めいれいで うごく" },
        },
      ],
    },
    test: {
      unitId: U.computerAround,
      questions: computerAroundQuestions,
      questionCount: 5,
    },
  },

  [U.inputOutput]: {
    unitId: U.inputOutput,
    learn: {
      unitId: U.inputOutput,
      steps: [
        {
          heading: "いれる（にゅうりょく）",
          body: "ボタンを おす・がめんを さわる・{声|こえ}を いう。これは コンピュータに「いれる」こと。にゅうりょくと いうよ。",
          visual: { kind: "emoji", value: "👆⌨️🎤", caption: "いれる どうぐ" },
        },
        {
          heading: "だす（しゅつりょく）",
          body: "がめんに {絵|え}が でる・スピーカーから {音|おと}が でる。これは コンピュータが「だす」こと。しゅつりょくと いうよ。",
          visual: { kind: "emoji", value: "🖥️🔊🖨️", caption: "だす どうぐ" },
        },
        {
          heading: "いれる → だす",
          body: "ボタンを おす（いれる）と {音|おと}が なる（だす）。コンピュータは いつも「いれる」と「だす」を して いるんだ。",
          visual: { kind: "emoji", value: "👆➡️🔊", caption: "いれる→だす" },
        },
      ],
    },
    test: {
      unitId: U.inputOutput,
      questions: inputOutputQuestions,
      questionCount: 5,
    },
  },

  [U.passwordSafe]: {
    unitId: U.passwordSafe,
    learn: {
      unitId: U.passwordSafe,
      steps: [
        {
          heading: "パスワードは かぎ",
          body: "パスワードは じぶんの たいせつな {物|もの}を まもる かぎ。{人|ひと}に おしえず ひみつに するよ。",
          visual: { kind: "emoji", value: "🔑🔒", caption: "ひみつの かぎ" },
        },
        {
          heading: "たいせつな {情報|じょうほう}を まもる",
          body: "{名前|なまえ}・じゅうしょ・しゃしんは たいせつな {自分|じぶん}の {物|もの}。しらない {人|ひと}に かってに おしえないよ。",
          visual: { kind: "emoji", value: "🙅‍♂️📛", caption: "おしえない" },
        },
        {
          heading: "こまったら そうだん",
          body: "へんな メッセージや あやしい ものが きたら、じぶんで さわらず おうちの {人|ひと}に そうだんしよう。",
          visual: { kind: "emoji", value: "🧑‍🦱❓👪", caption: "そうだんする" },
        },
      ],
    },
    test: {
      unitId: U.passwordSafe,
      questions: passwordSafeQuestions,
      questionCount: 5,
    },
  },

  [U.stepsOrder]: {
    unitId: U.stepsOrder,
    learn: {
      unitId: U.stepsOrder,
      steps: [
        {
          heading: "てじゅんって なに？",
          body: "なにかを する ときの「やる じゅんばん」を てじゅんと いうよ。りょうりも したくも てじゅんが あるね。",
          visual: { kind: "emoji", value: "1️⃣2️⃣3️⃣", caption: "じゅんばん" },
        },
        {
          heading: "じゅんばんが たいせつ",
          body: "カップラーメンは「おゆを いれる」を さきに しないと できないよ。じゅんばんを まちがえると うまく いかないんだ。",
          visual: { kind: "emoji", value: "🍜➡️💧➡️⏰", caption: "ただしい じゅんばん" },
        },
      ],
    },
    test: {
      unitId: U.stepsOrder,
      questions: stepsOrderQuestions,
      questionCount: 4,
    },
  },

  [U.repeatLoop]: {
    unitId: U.repeatLoop,
    learn: {
      unitId: U.repeatLoop,
      steps: [
        {
          heading: "おなじ ことを なんども",
          body: "「ジャンプ・ジャンプ・ジャンプ」のように おなじ ことを なんども する とき「くりかえし」を つかうよ。",
          visual: { kind: "emoji", value: "🦘🦘🦘", caption: "3かい くりかえし" },
        },
        {
          heading: "くりかえしは べんり",
          body: "おなじ めいれいを なんども かかずに「3かい くりかえす」と かける。みじかく なって まちがいも へるよ。",
          visual: { kind: "emoji", value: "🔁3️⃣", caption: "みじかく かける" },
        },
      ],
    },
    test: {
      unitId: U.repeatLoop,
      questions: repeatLoopQuestions,
      questionCount: 4,
    },
  },

  [U.commandMove]: {
    unitId: U.commandMove,
    learn: {
      unitId: U.commandMove,
      steps: [
        {
          heading: "めいれいで うごかす",
          body: "「みぎ」「うえ」などの めいれいを ならべると、ロボットや キャラクターが その とおりに うごくよ。",
          visual: { kind: "emoji", value: "🤖➡️⬆️", caption: "めいれいで うごく" },
        },
        {
          heading: "ブロックを つなげる",
          body: "めいれいの ブロックを じゅんばんに つなげると プログラムが できるよ。これが ブロックプログラミングだよ。",
          visual: { kind: "emoji", value: "🧩🧩🧩", caption: "ブロックを つなぐ" },
        },
        {
          heading: "じゅんばんが だいじ",
          body: "コンピュータは うえから じゅんばんに めいれいを よむよ。ならべる じゅんを かえると うごきも かわるんだ。",
          visual: { kind: "emoji", value: "⬇️📋", caption: "うえから じゅんに" },
        },
      ],
    },
    test: {
      unitId: U.commandMove,
      questions: commandMoveQuestions,
      questionCount: 5,
    },
  },

  [U.debug]: {
    unitId: U.debug,
    learn: {
      unitId: U.debug,
      steps: [
        {
          heading: "デバッグって なに？",
          body: "プログラムが おもいどおりに うごかない とき、どこが まちがいか さがして なおす ことを デバッグと いうよ。",
          visual: { kind: "emoji", value: "🐞🔍", caption: "まちがいさがし" },
        },
        {
          heading: "ひとつずつ しらべる",
          body: "あわてず めいれいを ひとつずつ みて、おかしい ところを みつけよう。むきや かいすうが まちがいやすいよ。",
          visual: { kind: "emoji", value: "🔎🧩", caption: "ひとつずつ" },
        },
        {
          heading: "なおして もういちど",
          body: "まちがいを なおしたら、もういちど うごかして たしかめよう。じぶんで なおせると プログラミングが もっと たのしく なるよ。",
          visual: { kind: "emoji", value: "🛠️✅", caption: "なおして たしかめる" },
        },
      ],
    },
    test: {
      unitId: U.debug,
      questions: debugQuestions,
      questionCount: 5,
    },
  },
};
