// ══════════════════════════════════════════
// カリキュラム縦スライス: 情報・コンピュータ（IT）小1
// 新教科「IT（it）」= コンピュータの基本・アルゴリズム・プログラミング体験を
// 学習＋テスト両モードで提供する（小1〜6開講・学年で難度調整）。
// 棲み分け: IT は「動かす・作る」実務寄り（応用 oyo は二進法・確率等の数学的本質）。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 全表示テキストは ルビ記法 {漢字|よみ}（全漢字ルビ）で執筆（2026-06-02 CEO方針）。
//
// ── 申し送り（中央集約担当へ）─────────────────────────────
//  1. SubjectId union（src/types/drill.ts）には既に "it" が含まれているため、本ファイルは
//     `as SubjectId` キャスト不要でそのまま型を通している（局所回避は使っていない）。
//     "it" Subject 定義（emoji 💻 / theme sky / grades [1..6] / testable:true）は本ファイルの
//     itSubject をそのまま使える。
//  2. index.ts への合流（subjects/domains/units/contents への push）は中央が行う。
//     本ファイルは index.ts・types を一切編集していない（並列衝突防止）。
//  3. prerequisites / leadsTo は「集約時に必ず解決できる id」だけを指している
//     （本ファイル内の it.g1 単元 + 既存の sansuu.g1.numbers-to-10）。中学「技術」・高校「情報」への
//     forward link はバリデーション緑維持のため意図的に未記載（後続波で他学年 it 単元へ接続可能）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  OrderingQuestion,
  MatchingQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const itSubject: Subject = {
  id: "it",
  name: "じょうほう",
  formalName: "情報・コンピュータ",
  emoji: "💻",
  theme: "sky",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域（スコープ案の3領域に対応） ──────────────────────

export const itG1Domains: Domain[] = [
  {
    id: "it.computer-basics",
    subjectId: "it",
    name: "コンピュータの きほん",
    formalName: "コンピュータの基本",
  },
  {
    id: "it.algorithm",
    subjectId: "it",
    name: "てじゅん（アルゴリズム）",
    formalName: "アルゴリズム",
  },
  {
    id: "it.programming",
    subjectId: "it",
    name: "プログラミング",
    formalName: "プログラミング",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし）:
//
//   computer-around-us ──┬─▶ input-output ──────────────┐
//                        └─▶ net-safety                  ├─▶ command-robot
//   (sansuu.g1.numbers-to-10) ──▶ order-steps ──┬────────┤
//                                               └─▶ repeat-branch ─▶ command-robot
//
const U = {
  computerAroundUs: "it.g1.computer-around-us",
  inputOutput: "it.g1.input-output",
  netSafety: "it.g1.net-safety",
  orderSteps: "it.g1.order-steps",
  repeatBranch: "it.g1.repeat-branch",
  commandRobot: "it.g1.command-robot",
} as const;

export const itG1Units: Unit[] = [
  {
    id: U.computerAroundUs,
    subjectId: "it",
    grade: 1,
    domainId: "it.computer-basics",
    title: "みのまわりの コンピュータ",
    order: 1,
    realWorldUse:
      "スマホや ゲーム、れいぞうこの なかにも コンピュータが いるよ。どこで {動|うご}いているか わかると、{道具|どうぐ}を じょうずに つかえるよ。",
    leadsTo: [U.inputOutput, U.netSafety],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.inputOutput,
    subjectId: "it",
    grade: 1,
    domainId: "it.computer-basics",
    title: "いれる と でる（にゅうりょく・しゅつりょく）",
    order: 2,
    realWorldUse:
      "ボタンを おすと {画面|がめん}に でる、こえを いれると おとが でる。スマホや ゲームを つかうときの しくみだよ。",
    leadsTo: [U.commandRobot],
    prerequisites: [U.computerAroundUs],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.netSafety,
    subjectId: "it",
    grade: 1,
    domainId: "it.computer-basics",
    title: "ネットの やくそく",
    order: 3,
    realWorldUse:
      "パスワードや {名前|なまえ}を むやみに {教|おし}えないなど、インターネットを あんぜんに つかう やくそくが わかるよ。",
    leadsTo: [],
    prerequisites: [U.computerAroundUs],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.orderSteps,
    subjectId: "it",
    grade: 1,
    domainId: "it.algorithm",
    title: "てじゅんを かんがえる",
    order: 4,
    realWorldUse:
      "りょうりや したくは「やる じゅんばん」が だいじ。ただしい {手順|てじゅん}を かんがえる ちからは ロボットや AI を {動|うご}かすときにも つかうよ。",
    // 「じゅんばん・数の順序」の感覚が前提（既存の算数小1単元へ cross-subject link）
    prerequisites: ["sansuu.g1.numbers-to-10"],
    leadsTo: [U.repeatBranch, U.commandRobot],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.repeatBranch,
    subjectId: "it",
    grade: 1,
    domainId: "it.algorithm",
    title: "くりかえし と もしも",
    order: 5,
    realWorldUse:
      "「3かい くりかえす」「あめなら かさを もつ」のように、おなじ ことを くりかえしたり えらんだり する かんがえだよ。",
    leadsTo: [U.commandRobot],
    prerequisites: [U.orderSteps],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.commandRobot,
    subjectId: "it",
    grade: 1,
    domainId: "it.programming",
    title: "めいれいで うごかす",
    order: 6,
    realWorldUse:
      "「まえへ」「みぎへ」の {命令|めいれい}を ならべると ロボットを ゴールまで うごかせるよ。これが プログラミングの はじめの いっぽだよ。",
    leadsTo: [],
    prerequisites: [U.inputOutput, U.orderSteps, U.repeatBranch],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 固定問題（IT小1は choice / ordering（手順並べ替え）/ matching を活用・全問 explanation 必須） ──

const computerAroundUsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.computerAroundUs}.q-1`,
    unitId: U.computerAroundUs,
    prompt: "つぎの なかで コンピュータが はいって いない ものは どれ？",
    explanation: "スマホ・ゲーム・しんごうきには コンピュータが いるよ。えんぴつには ないね。",
    format: "choice",
    choices: ["えんぴつ", "スマホ", "ゲームき", "しんごうき"],
    answer: "えんぴつ",
  },
  {
    id: `${U.computerAroundUs}.q-2`,
    unitId: U.computerAroundUs,
    prompt: "コンピュータは どんな ことが とくい？",
    explanation: "コンピュータは {計算|けいさん}や おなじ しごとを はやく せいかくに できるよ。",
    format: "choice",
    choices: ["はやく {計算|けいさん}する", "ごはんを たべる", "ねむる", "なく"],
    answer: "はやく {計算|けいさん}する",
  },
  {
    id: `${U.computerAroundUs}.q-3`,
    unitId: U.computerAroundUs,
    prompt: "スマホや パソコンの「{道具|どうぐ}」や「ゲーム」など、なかみの プログラムを なんと いう？",
    explanation: "{機械|きかい}そのものを ハード、なかみの プログラムを ソフト と いうよ。",
    format: "choice",
    choices: ["ソフト", "いし", "みず", "かみ"],
    answer: "ソフト",
  },
  {
    id: `${U.computerAroundUs}.q-4`,
    unitId: U.computerAroundUs,
    prompt: "コンピュータを {動|うご}かすために いる ものは？",
    explanation: "コンピュータは {電気|でんき}で {動|うご}くよ。でんちや コンセントから {電気|でんき}を もらうんだ。",
    format: "choice",
    choices: ["{電気|でんき}", "すな", "は", "あめ"],
    answer: "{電気|でんき}",
  },
  {
    id: `${U.computerAroundUs}.q-5`,
    unitId: U.computerAroundUs,
    prompt: "おうちの なかで コンピュータが はいって いそうな ものは？",
    explanation: "テレビや れいぞうこ、せんたくきにも コンピュータが はいって {動|うご}いているよ。",
    format: "choice",
    choices: ["テレビ", "まくら", "コップ", "タオル"],
    answer: "テレビ",
  },
];

// 「いれる（にゅうりょく）／だす（しゅつりょく）」の対応づけ = matching が活きる
const inputOutputMatching: MatchingQuestion = {
  id: `${U.inputOutput}.q-1`,
  unitId: U.inputOutput,
  prompt: "つぎの ぶひんは「いれる（にゅうりょく）」「だす（しゅつりょく）」の どっち？ せんで むすぼう。",
  explanation:
    "キーボードや マウスは じょうほうを コンピュータに「いれる」、{画面|がめん}や スピーカーは「だす」どうぐだよ。",
  format: "matching",
  left: ["キーボード", "マウス", "{画面|がめん}", "スピーカー"],
  right: ["もじを いれる", "クリックして いれる", "えを だす", "おとを だす"],
  answerPairs: [0, 1, 2, 3],
};

const inputOutputQuestions: ChoiceQuestion[] = [
  {
    id: `${U.inputOutput}.q-2`,
    unitId: U.inputOutput,
    prompt: "キーボードで もじを うつのは どっち？",
    explanation: "もじを コンピュータに「いれる」ので にゅうりょく だよ。",
    format: "choice",
    choices: ["いれる（にゅうりょく）", "だす（しゅつりょく）", "けす", "ねる"],
    answer: "いれる（にゅうりょく）",
  },
  {
    id: `${U.inputOutput}.q-3`,
    unitId: U.inputOutput,
    prompt: "{画面|がめん}に えが でるのは どっち？",
    explanation: "{画面|がめん}は コンピュータから えを「だす」ので しゅつりょく だよ。",
    format: "choice",
    choices: ["だす（しゅつりょく）", "いれる（にゅうりょく）", "とぶ", "はしる"],
    answer: "だす（しゅつりょく）",
  },
  {
    id: `${U.inputOutput}.q-4`,
    unitId: U.inputOutput,
    prompt: "マイクに こえを いれると、スピーカーから なにが でる？",
    explanation: "こえを いれる（にゅうりょく）と、おとが でる（しゅつりょく）よ。",
    format: "choice",
    choices: ["おと", "みず", "ひかり だけ", "なにも でない"],
    answer: "おと",
  },
  {
    id: `${U.inputOutput}.q-5`,
    unitId: U.inputOutput,
    prompt: "ボタンを おすと {画面|がめん}が かわるのは なぜ？",
    explanation: "ボタンで「いれた」あいずを コンピュータが よんで、{画面|がめん}に「だす」からだよ。",
    format: "choice",
    choices: ["いれた あいずを よんで だすから", "まほうだから", "ぐうぜん", "だれかが おしているから"],
    answer: "いれた あいずを よんで だすから",
  },
];

const netSafetyQuestions: ChoiceQuestion[] = [
  {
    id: `${U.netSafety}.q-1`,
    unitId: U.netSafety,
    prompt: "パスワードは どうすると よい？",
    explanation: "パスワードは じぶんだけの ひみつ。ほかの {人|ひと}に {教|おし}えないでね。",
    format: "choice",
    choices: ["ひみつに する", "ともだちに {教|おし}える", "おおきく はりだす", "こえに だす"],
    answer: "ひみつに する",
  },
  {
    id: `${U.netSafety}.q-2`,
    unitId: U.netSafety,
    prompt: "インターネットで しらない {人|ひと}に {教|おし}えては いけない ものは？",
    explanation: "{名前|なまえ}・じゅうしょ・でんわばんごうなどの {個人|こじん}じょうほうは {教|おし}えないでね。",
    format: "choice",
    choices: ["じぶんの {名前|なまえ}や じゅうしょ", "すきな いろ", "すきな どうぶつ", "きょうの てんき"],
    answer: "じぶんの {名前|なまえ}や じゅうしょ",
  },
  {
    id: `${U.netSafety}.q-3`,
    unitId: U.netSafety,
    prompt: "こまった ことや こわい がめんが でたら どうする？",
    explanation: "ひとりで なやまず、おうちの {人|ひと}や せんせいに すぐ そうだんしようね。",
    format: "choice",
    choices: ["おとなに そうだんする", "だまって つづける", "ともだちに おくる", "けさずに ほうっておく"],
    answer: "おとなに そうだんする",
  },
  {
    id: `${U.netSafety}.q-4`,
    unitId: U.netSafety,
    prompt: "メッセージを おくる ときに きを つけることは？",
    explanation: "あいての {気持|きも}ちを かんがえて、いやな ことばを つかわないようにしようね。",
    format: "choice",
    choices: ["あいてが いやな ことを かかない", "おおきな もじだけ つかう", "はやく おくる", "なんども おくる"],
    answer: "あいてが いやな ことを かかない",
  },
  {
    id: `${U.netSafety}.q-5`,
    unitId: U.netSafety,
    prompt: "ゲームや どうがは どうやって つかうと よい？",
    explanation: "じかんを きめて つかうと、めや からだに やさしいよ。",
    format: "choice",
    choices: ["じかんを きめて つかう", "ねないで つづける", "ごはん中も つづける", "ずっと つかう"],
    answer: "じかんを きめて つかう",
  },
];

// 手順の並べ替え = ordering が活きる
const handWashOrdering: OrderingQuestion = {
  id: `${U.orderSteps}.q-1`,
  unitId: U.orderSteps,
  prompt: "てを あらう てじゅんを ただしい じゅんばんに ならべよう。",
  explanation:
    "「みずで ぬらす → せっけんを つける → あわで あらう → みずで ながす」の じゅんが ただしいよ。じゅんばんを まちがえると きれいに ならないね。",
  format: "ordering",
  items: ["みずで てを ぬらす", "せっけんを つける", "あわで ごしごし あらう", "みずで ながす"],
  answerOrder: [0, 1, 2, 3],
};

const morningOrdering: OrderingQuestion = {
  id: `${U.orderSteps}.q-2`,
  unitId: U.orderSteps,
  prompt: "あさ おきてから がっこうへ いくまでを じゅんばんに ならべよう。",
  explanation: "「おきる → かおを あらう → ごはんを たべる → がっこうへ いく」の じゅんが しぜんだよ。",
  format: "ordering",
  items: ["おきる", "かおを あらう", "ごはんを たべる", "がっこうへ いく"],
  answerOrder: [0, 1, 2, 3],
};

const orderStepsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.orderSteps}.q-3`,
    unitId: U.orderSteps,
    prompt: "ものごとを やる「じゅんばん」や「やりかた」を なんと いう？",
    explanation: "やる じゅんばんの ことを {手順|てじゅん}（アルゴリズム）と いうよ。",
    format: "choice",
    choices: ["{手順|てじゅん}", "いろ", "おもさ", "におい"],
    answer: "{手順|てじゅん}",
  },
  {
    id: `${U.orderSteps}.q-4`,
    unitId: U.orderSteps,
    prompt: "{手順|てじゅん}の じゅんばんを まちがえると どうなる？",
    explanation: "じゅんばんが ちがうと、うまく いかなかったり へんな けっかに なるよ。",
    format: "choice",
    choices: ["うまく いかない ことが ある", "かならず せいこうする", "はやく なる", "なにも かわらない"],
    answer: "うまく いかない ことが ある",
  },
  {
    id: `${U.orderSteps}.q-5`,
    unitId: U.orderSteps,
    prompt: "ロボットや コンピュータは どうやって しごとを する？",
    explanation: "コンピュータは おしえた {手順|てじゅん}の とおりに じゅんばんに しごとを するよ。",
    format: "choice",
    choices: ["おしえた {手順|てじゅん}どおりに うごく", "きぶんで うごく", "ねむる", "じぶんで かんがえて あそぶ"],
    answer: "おしえた {手順|てじゅん}どおりに うごく",
  },
];

const repeatBranchQuestions: ChoiceQuestion[] = [
  {
    id: `${U.repeatBranch}.q-1`,
    unitId: U.repeatBranch,
    prompt: "「ジャンプを 3かい する」のように、おなじ ことを なんども するのを なんと いう？",
    explanation: "おなじ ことを なんども するのを「くりかえし」と いうよ。",
    format: "choice",
    choices: ["くりかえし", "もしも", "おわり", "はじめ"],
    answer: "くりかえし",
  },
  {
    id: `${U.repeatBranch}.q-2`,
    unitId: U.repeatBranch,
    prompt: "「あめなら かさを もつ、はれなら ぼうしを もつ」のように えらぶのを なんと いう？",
    explanation: "じょうけんで えらぶことを「もしも（じょうけん）」と いうよ。",
    format: "choice",
    choices: ["もしも（じょうけん）", "くりかえし", "ならべかえ", "けいさん"],
    answer: "もしも（じょうけん）",
  },
  {
    id: `${U.repeatBranch}.q-3`,
    unitId: U.repeatBranch,
    prompt: "「★を 5こ かく」とき、くりかえしを つかうと どう いえる？",
    explanation: "「★を かく」を 5かい くりかえす、と いえば みじかく できるよ。",
    format: "choice",
    choices: ["『★を かく』を 5かい くりかえす", "★を 1こ かく", "なにも しない", "○を かく"],
    answer: "『★を かく』を 5かい くりかえす",
  },
  {
    id: `${U.repeatBranch}.q-4`,
    unitId: U.repeatBranch,
    prompt: "「もしも あかしんごう なら とまる」。あおしんごうの ときは？",
    explanation: "じょうけんが「あか」のときだけ とまるよ。あおなら すすむんだね。",
    format: "choice",
    choices: ["すすむ", "とまる", "ねる", "もどる"],
    answer: "すすむ",
  },
  {
    id: `${U.repeatBranch}.q-5`,
    unitId: U.repeatBranch,
    prompt: "くりかえしを つかうと いい ことは？",
    explanation: "おなじ {命令|めいれい}を なんども かかずに すむので、みじかく かけるよ。",
    format: "choice",
    choices: ["みじかく かける", "ながく なる", "むずかしく なる", "おそく なる"],
    answer: "みじかく かける",
  },
];

// 命令の並べ替え（ロボットを ゴールへ）= ordering が活きる
const robotMoveOrdering: OrderingQuestion = {
  id: `${U.commandRobot}.q-1`,
  unitId: U.commandRobot,
  prompt: "ロボットを 〇から ★まで うごかす {命令|めいれい}を ならべよう（まえ・まえ・みぎ・まえ の みち）。",
  explanation:
    "みちの とおりに「まえ → まえ → みぎ → まえ」と {命令|めいれい}を ならべると、ロボットは ★に たどりつくよ。",
  format: "ordering",
  items: ["まえへ すすむ", "まえへ すすむ", "みぎを むく", "まえへ すすむ"],
  answerOrder: [0, 1, 2, 3],
};

const commandRobotQuestions: ChoiceQuestion[] = [
  {
    id: `${U.commandRobot}.q-2`,
    unitId: U.commandRobot,
    prompt: "コンピュータや ロボットに「こう うごいて」と つたえる ことばを なんと いう？",
    explanation: "コンピュータへの しじを「{命令|めいれい}」と いうよ。{命令|めいれい}を ならべると プログラムだよ。",
    format: "choice",
    choices: ["{命令|めいれい}", "おはなし", "うた", "おえかき"],
    answer: "{命令|めいれい}",
  },
  {
    id: `${U.commandRobot}.q-3`,
    unitId: U.commandRobot,
    prompt: "プログラムが おもうように {動|うご}かない とき、まちがいを さがして なおす ことを なんと いう？",
    explanation: "まちがい（バグ）を さがして なおす ことを「デバッグ」と いうよ。",
    format: "choice",
    choices: ["デバッグ", "ジャンプ", "おひるね", "おかわり"],
    answer: "デバッグ",
  },
  {
    id: `${U.commandRobot}.q-4`,
    unitId: U.commandRobot,
    prompt: "「まえ・まえ」と いう つもりが「まえ」だけで とまった。なにが おきた？",
    explanation: "{命令|めいれい}が ひとつ たりないね。これも バグ。たりない {命令|めいれい}を たすと なおるよ。",
    format: "choice",
    choices: ["{命令|めいれい}が たりない（バグ）", "ロボットが つよい", "{電気|でんき}が おおい", "ただしく うごいた"],
    answer: "{命令|めいれい}が たりない（バグ）",
  },
  {
    id: `${U.commandRobot}.q-5`,
    unitId: U.commandRobot,
    prompt: "ブロックを つなげて つくる かんたんな プログラミングの やりかたは？",
    explanation: "{命令|めいれい}の ブロックを つなげて つくる やりかたを ブロックプログラミング と いうよ。",
    format: "choice",
    choices: ["ブロックを つなげる", "すなを なげる", "うたを うたう", "えを ぬる だけ"],
    answer: "ブロックを つなげる",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// learn=図/emoji で段階的に説明、test=choice/ordering/matching・全問 explanation。

export const itG1Contents: Record<string, UnitContent> = {
  [U.computerAroundUs]: {
    unitId: U.computerAroundUs,
    learn: {
      unitId: U.computerAroundUs,
      steps: [
        {
          heading: "コンピュータって なに？",
          body: "コンピュータは「{計算|けいさん}したり おぼえたり する {機械|きかい}」だよ。とても はやく せいかくに しごとが できるんだ。",
          visual: { kind: "emoji", value: "💻", caption: "{計算|けいさん}が とくいな {機械|きかい}" },
        },
        {
          heading: "みのまわりに いっぱい",
          body: "スマホ・ゲーム・テレビ・れいぞうこの なかにも コンピュータが いて、いつも はたらいて いるよ。",
          visual: { kind: "emoji", value: "📱🎮📺", caption: "いろいろな ものの なかに いる" },
        },
        {
          heading: "ハード と ソフト",
          body: "さわれる {機械|きかい}を「ハード」、なかみの プログラムを「ソフト」と いうよ。ふたつ そろって {動|うご}くんだ。",
          visual: { kind: "emoji", value: "🧱✨", caption: "ハード（{機械|きかい}）と ソフト（なかみ）" },
        },
      ],
    },
    test: {
      unitId: U.computerAroundUs,
      questions: computerAroundUsQuestions,
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
          body: "キーボードで もじを うつ、マウスで クリックする。コンピュータに じょうほうを「いれる」ことを にゅうりょくと いうよ。",
          visual: { kind: "emoji", value: "⌨️🖱️", caption: "じょうほうを いれる どうぐ" },
        },
        {
          heading: "だす（しゅつりょく）",
          body: "{画面|がめん}に えが でる、スピーカーから おとが でる。コンピュータが けっかを「だす」ことを しゅつりょくと いうよ。",
          visual: { kind: "emoji", value: "🖥️🔊", caption: "けっかを だす どうぐ" },
        },
        {
          heading: "いれる → かんがえる → だす",
          body: "コンピュータは「いれた」じょうほうを なかで かんがえて、けっかを「だす」。この ながれで {動|うご}いて いるよ。",
          visual: { kind: "emoji", value: "➡️🧠➡️", caption: "いれて・かんがえて・だす" },
        },
      ],
    },
    test: {
      unitId: U.inputOutput,
      questions: [inputOutputMatching, ...inputOutputQuestions],
      questionCount: 5,
    },
  },

  [U.netSafety]: {
    unitId: U.netSafety,
    learn: {
      unitId: U.netSafety,
      steps: [
        {
          heading: "パスワードは ひみつ",
          body: "パスワードは おうちの かぎと おなじ。じぶんだけの ひみつに して、ほかの {人|ひと}に {教|おし}えないでね。",
          visual: { kind: "emoji", value: "🔑", caption: "じぶんだけの ひみつの かぎ" },
        },
        {
          heading: "{個人|こじん}じょうほうを まもる",
          body: "{名前|なまえ}・じゅうしょ・でんわばんごうは たいせつな じょうほう。しらない {人|ひと}に {教|おし}えないようにしようね。",
          visual: { kind: "emoji", value: "🙅", caption: "むやみに {教|おし}えない" },
        },
        {
          heading: "こまったら そうだん",
          body: "こわい がめんや いやな ことが あったら、ひとりで なやまず おうちの {人|ひと}や せんせいに そうだんしよう。",
          visual: { kind: "emoji", value: "🧑‍🏫", caption: "おとなに そうだんする" },
        },
      ],
    },
    test: {
      unitId: U.netSafety,
      questions: netSafetyQuestions,
      questionCount: 5,
    },
  },

  [U.orderSteps]: {
    unitId: U.orderSteps,
    learn: {
      unitId: U.orderSteps,
      steps: [
        {
          heading: "じゅんばんが だいじ",
          body: "ものごとには「やる じゅんばん」が あるよ。この じゅんばん（やりかた）を {手順|てじゅん}（アルゴリズム）と いうんだ。",
          visual: { kind: "emoji", value: "1️⃣2️⃣3️⃣", caption: "やる じゅんばん" },
        },
        {
          heading: "てを あらう てじゅん",
          body: "「ぬらす → せっけん → あらう → ながす」。じゅんばんを まちがえると きれいに ならないね。",
          visual: { kind: "emoji", value: "🚰🧼🙌💧", caption: "ただしい じゅんばんで" },
        },
        {
          heading: "コンピュータも おなじ",
          body: "コンピュータや ロボットは、おしえた {手順|てじゅん}の とおりに じゅんばんに うごくよ。だから じゅんばんが だいじなんだ。",
          visual: { kind: "emoji", value: "🤖", caption: "{手順|てじゅん}どおりに うごく" },
        },
      ],
    },
    test: {
      unitId: U.orderSteps,
      questions: [handWashOrdering, morningOrdering, ...orderStepsQuestions],
      questionCount: 5,
    },
  },

  [U.repeatBranch]: {
    unitId: U.repeatBranch,
    learn: {
      unitId: U.repeatBranch,
      steps: [
        {
          heading: "くりかえし",
          body: "「ジャンプを 3かい」のように、おなじ ことを なんども するのを「くりかえし」と いうよ。みじかく かけて べんりだよ。",
          visual: { kind: "emoji", value: "🔁", caption: "おなじ ことを なんども" },
        },
        {
          heading: "もしも（じょうけん）",
          body: "「あめなら かさ、はれなら ぼうし」。そのときの ようすで えらぶことを「もしも（じょうけん）」と いうよ。",
          visual: { kind: "emoji", value: "🌧️☀️", caption: "ようすで えらぶ" },
        },
        {
          heading: "くみあわせて つかう",
          body: "くりかえしと もしもを くみあわせると、ロボットに かしこい うごきを させられるよ。",
          visual: { kind: "emoji", value: "🤖🔁", caption: "くりかえし＋もしも" },
        },
      ],
    },
    test: {
      unitId: U.repeatBranch,
      questions: repeatBranchQuestions,
      questionCount: 5,
    },
  },

  [U.commandRobot]: {
    unitId: U.commandRobot,
    learn: {
      unitId: U.commandRobot,
      steps: [
        {
          heading: "{命令|めいれい}で うごかす",
          body: "「まえへ」「みぎへ」の {命令|めいれい}を ならべると、ロボットを すきな ところへ うごかせるよ。",
          visual: { kind: "emoji", value: "🤖➡️", caption: "{命令|めいれい}を ならべる" },
        },
        {
          heading: "ブロックを つなげる",
          body: "{命令|めいれい}の ブロックを つなげて つくる やりかたを ブロックプログラミングと いうよ。Scratch みたいな かんがえだね。",
          visual: { kind: "emoji", value: "🧩", caption: "ブロックを つなげて プログラム" },
        },
        {
          heading: "デバッグ（まちがいさがし）",
          body: "おもうように うごかない ときは、まちがい（バグ）を さがして なおすよ。これを「デバッグ」と いうんだ。",
          visual: { kind: "emoji", value: "🐛🔍", caption: "まちがいを さがして なおす" },
        },
      ],
    },
    test: {
      unitId: U.commandRobot,
      questions: [robotMoveOrdering, ...commandRobotQuestions],
      questionCount: 5,
    },
  },
};
