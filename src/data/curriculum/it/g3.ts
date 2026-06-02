// ══════════════════════════════════════════
// カリキュラム: IT・情報（じょうほう / it）小3
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>" / 問題 = "<unitId>.q-<n>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
//
// ── 表記規約（ruby-convention）──
// 全ての表示テキスト（title / name / prompt / choices / explanation / heading /
// body / caption / realWorldUse / items / left / right 等）は漢字まじり＋全漢字
// ルビ記法 {漢字|よみ} で執筆する。ひらがな・カタカナ・数字・記号はそのまま。
// RubyText レンダラが描画時に解決する。
//
// ── 棲み分け（重複回避）──
// IT分野 = コンピュータ実務寄り＋プログラミング体験（「動かす・作る」）。
// 応用(oyo) = 二進法・確率・集合など数学的本質。アルゴリズム概念は両方に出るが角度が違う。
//
// ── 申し送り（中央へ）──
// SubjectId union には既に "it" が含まれているため as キャストは不要（直接 "it" を使用）。
//   念のため確認済み: src/types/drill.ts の SubjectId に "it" あり。
// 教科定義(itSubject)は学年間で共有される単一の真実。集約(index)側で重複排除する前提
//   （並行作成される it/g1〜g6 と同一定義を出すので index 側で dedupe する）。
// 領域 slug（it.computer-basics / it.algorithm / it.programming）は並行作成中の
//   他学年 it/g*.ts と揃える前提。
// leadsTo に他学年の前方参照 "it.g4.*" を一部含む（ロードマップ依存グラフ用）。
//   それらの単元が存在するまで validate-curriculum の [2.参照] が未解決を報告するが、
//   authoring-guide の「参照先が将来存在する前提で書いてよい」方針に従う。集約時に解決見込み。
// prerequisites には実在する算数単元（sansuu.g1.*）への他教科参照を含む（順序・論理の前提）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  Question,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// ※ 教科定義は学年間で共有される単一の真実。集約(index)側で重複排除する前提。

export const itSubject: Subject = {
  id: "it",
  name: "{情報|じょうほう}",
  formalName: "情報・コンピュータ",
  emoji: "💻",
  theme: "violet",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────

export const itG3Domains: Domain[] = [
  {
    id: "it.computer-basics",
    subjectId: "it",
    name: "コンピュータの きほん",
    formalName: "コンピュータの基本",
  },
  {
    id: "it.algorithm",
    subjectId: "it",
    name: "アルゴリズム（てじゅん）",
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
// 依存グラフ（prerequisites / leadsTo）:
//
//   what-is-computer ─┬─▶ input-output ──▶ commands ──┐
//                     ├─▶ internet-basics ─▶ info-safety
//                     └─▶ info-safety
//   steps ─┬─▶ repeat-branch ──▶ block-programming ◀── commands
//          └─▶ flowchart ──────▶ debug ◀────────────── block-programming
//
const U = {
  whatIsComputer: "it.g3.what-is-computer",
  inputOutput: "it.g3.input-output",
  internetBasics: "it.g3.internet-basics",
  infoSafety: "it.g3.info-safety",
  steps: "it.g3.steps",
  repeatBranch: "it.g3.repeat-branch",
  flowchart: "it.g3.flowchart",
  commands: "it.g3.commands",
  blockProgramming: "it.g3.block-programming",
  debug: "it.g3.debug",
} as const;

export const itG3Units: Unit[] = [
  // ── 領域1: コンピュータのきほん ──
  {
    id: U.whatIsComputer,
    subjectId: "it",
    grade: 3,
    domainId: "it.computer-basics",
    title: "コンピュータって なに？",
    order: 1,
    realWorldUse:
      "スマホ・ゲームき・れいぞうこ…みのまわりの{機械|きかい}の{中|なか}には コンピュータが{入|はい}っているよ。どうやって{動|うご}くか{知|し}ると、もっと{上手|じょうず}に{使|つか}えるんだ。",
    leadsTo: [U.inputOutput, U.internetBasics, U.infoSafety],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.inputOutput,
    subjectId: "it",
    grade: 3,
    domainId: "it.computer-basics",
    title: "{入力|にゅうりょく}と{出力|しゅつりょく}",
    order: 2,
    realWorldUse:
      "キーボードで{文字|もじ}を{打|う}つ（{入力|にゅうりょく}）と、{画面|がめん}に{出|で}てくる（{出力|しゅつりょく}）よ。ゲームのコントローラーやスピーカーも{同|おな}じしくみだよ。",
    leadsTo: [U.commands],
    prerequisites: [U.whatIsComputer],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.internetBasics,
    subjectId: "it",
    grade: 3,
    domainId: "it.computer-basics",
    title: "インターネットの しくみ",
    order: 3,
    realWorldUse:
      "{動画|どうが}を{見|み}たり、とおくの{人|ひと}とメッセージを やりとりできるのは インターネットのおかげだよ。せかいじゅうのコンピュータが つながっているんだ。",
    leadsTo: [U.infoSafety],
    prerequisites: [U.whatIsComputer],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.infoSafety,
    subjectId: "it",
    grade: 3,
    domainId: "it.computer-basics",
    title: "{情報|じょうほう}モラル・{安全|あんぜん}",
    order: 4,
    realWorldUse:
      "パスワードを{秘密|ひみつ}にしたり、{名前|なまえ}やじゅうしょを かんたんに{教|おし}えないことで、じぶんを{守|まも}れるよ。ネットでも やさしいことばを{使|つか}おう。",
    leadsTo: ["it.g4.info-safety"],
    prerequisites: [U.whatIsComputer, U.internetBasics],
    hasLearn: true,
    hasTest: true,
  },

  // ── 領域2: アルゴリズム ──
  {
    id: U.steps,
    subjectId: "it",
    grade: 3,
    domainId: "it.algorithm",
    title: "{手順|てじゅん}を かんがえる",
    order: 5,
    realWorldUse:
      "りょうりや{朝|あさ}のしたくのように、ものごとには「やるじゅんばん」があるよ。じゅんばんを{正|ただ}しくならべる{力|ちから}は、プログラミングの きほんだよ。",
    leadsTo: [U.repeatBranch, U.flowchart],
    prerequisites: ["sansuu.g1.numbers-to-10"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.repeatBranch,
    subjectId: "it",
    grade: 3,
    domainId: "it.algorithm",
    title: "くりかえしと ぶんき",
    order: 6,
    realWorldUse:
      "「10かい ジャンプする」はくりかえし、「あめなら かさをもつ」はぶんきだよ。コンピュータに{同|おな}じことを{何回|なんかい}もさせたり、ばあいで{分|わ}けたりできるよ。",
    leadsTo: [U.blockProgramming],
    prerequisites: [U.steps],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.flowchart,
    subjectId: "it",
    grade: 3,
    domainId: "it.algorithm",
    title: "フローチャート",
    order: 7,
    realWorldUse:
      "{手順|てじゅん}を{図|ず}にかくと、{流|なが}れが ひとめで わかるよ。{矢印|やじるし}でつなぐと、つぎに{何|なに}をするか まよわないんだ。",
    leadsTo: [U.debug],
    prerequisites: [U.steps],
    hasLearn: true,
    hasTest: true,
  },

  // ── 領域3: プログラミング ──
  {
    id: U.commands,
    subjectId: "it",
    grade: 3,
    domainId: "it.programming",
    title: "{命令|めいれい}で うごかす",
    order: 8,
    realWorldUse:
      "ロボットそうじきや{自動|じどう}ドアは、「こうしなさい」という{命令|めいれい}どおりに{動|うご}いているよ。コンピュータは{命令|めいれい}の{言|い}うとおりにしか{動|うご}かないんだ。",
    leadsTo: [U.blockProgramming],
    prerequisites: [U.inputOutput],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.blockProgramming,
    subjectId: "it",
    grade: 3,
    domainId: "it.programming",
    title: "ブロックプログラミング",
    order: 9,
    realWorldUse:
      "Scratch のように、{命令|めいれい}のブロックを ならべるだけで キャラクターを{動|うご}かせるよ。むずかしい{文字|もじ}を{書|か}かなくても プログラムが{作|つく}れるんだ。",
    leadsTo: [U.debug, "it.g4.block-programming"],
    prerequisites: [U.commands, U.repeatBranch],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.debug,
    subjectId: "it",
    grade: 3,
    domainId: "it.programming",
    title: "デバッグ（まちがいさがし）",
    order: 10,
    realWorldUse:
      "プログラムが おもいどおりに{動|うご}かないとき、どこが まちがいか さがして{直|なお}すことを「デバッグ」というよ。{作|つく}る{人|ひと}はみんな これをしているよ。",
    leadsTo: ["it.g4.debug"],
    prerequisites: [U.blockProgramming, U.flowchart],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────

// ── 領域1: コンピュータのきほん ──

const whatIsComputerQuestions: Question[] = [
  {
    id: `${U.whatIsComputer}.q-1`,
    unitId: U.whatIsComputer,
    prompt: "コンピュータが とくいなことは どれ？",
    explanation:
      "コンピュータは すごいはやさで けいさんをするのが とくいだよ。たべたり ねむったりはできないね。",
    format: "choice",
    choices: ["はやく {計算|けいさん}する", "ごはんを たべる", "ねむる", "かぜを ひく"],
    answer: "はやく {計算|けいさん}する",
  },
  {
    id: `${U.whatIsComputer}.q-2`,
    unitId: U.whatIsComputer,
    prompt: "{手|て}でさわれる コンピュータの{部分|ぶぶん}を なんという？",
    explanation:
      "キーボードや{画面|がめん}など、{手|て}でさわれる{部分|ぶぶん}を「ハードウェア」というよ。",
    format: "choice",
    choices: ["ハードウェア", "ソフトウェア", "インターネット", "パスワード"],
    answer: "ハードウェア",
  },
  {
    id: `${U.whatIsComputer}.q-3`,
    unitId: U.whatIsComputer,
    prompt: "コンピュータの{中|なか}で{動|うご}く プログラムを なんという？",
    explanation:
      "{中|なか}で{動|うご}いて しごとをする プログラムを「ソフトウェア」というよ。ハードとソフトは{体|からだ}とこころみたいな かんけいだね。",
    format: "choice",
    choices: ["ソフトウェア", "ハードウェア", "マウス", "コンセント"],
    answer: "ソフトウェア",
  },
  {
    id: `${U.whatIsComputer}.q-4`,
    unitId: U.whatIsComputer,
    prompt: "つぎのうち コンピュータが{入|はい}っていないものは どれ？",
    explanation:
      "スマホ・ゲームき・しんごうきには コンピュータが{入|はい}っているよ。{木|き}のいすには{入|はい}っていないね。",
    format: "choice",
    choices: ["{木|き}のいす", "スマホ", "ゲームき", "しんごうき"],
    answer: "{木|き}のいす",
  },
  {
    id: `${U.whatIsComputer}.q-5`,
    unitId: U.whatIsComputer,
    prompt: "コンピュータについて {正|ただ}しいのは どれ？",
    explanation:
      "コンピュータは{命令|めいれい}のとおりに{動|うご}くよ。じぶんで{考|かんが}えてはいないので、ただしく{命令|めいれい}することが{大切|たいせつ}だよ。",
    format: "choice",
    choices: [
      "{命令|めいれい}のとおりに{動|うご}く",
      "つかれて やすむ",
      "じぶんの きもちで{動|うご}く",
      "{何|なに}もしなくても かんがえてくれる",
    ],
    answer: "{命令|めいれい}のとおりに{動|うご}く",
  },
];

const inputOutputQuestions: Question[] = [
  {
    id: `${U.inputOutput}.q-1`,
    unitId: U.inputOutput,
    prompt: "{装置|そうち}を「{入力|にゅうりょく}」と「{出力|しゅつりょく}」に わけよう。",
    explanation:
      "キーボード・マウスは{人|ひと}がコンピュータに つたえる「{入力|にゅうりょく}」、{画面|がめん}・スピーカーはコンピュータが{人|ひと}に{見|み}せる「{出力|しゅつりょく}」だよ。",
    format: "matching",
    left: ["キーボード", "マウス", "{画面|がめん}", "スピーカー"],
    right: ["{入力|にゅうりょく}", "{入力|にゅうりょく}", "{出力|しゅつりょく}", "{出力|しゅつりょく}"],
    answerPairs: [0, 1, 2, 3],
  },
  {
    id: `${U.inputOutput}.q-2`,
    unitId: U.inputOutput,
    prompt: "{文字|もじ}を{打|う}ちこむ「{入力|にゅうりょく}」の{道具|どうぐ}は どれ？",
    explanation:
      "キーボードは{文字|もじ}を{入力|にゅうりょく}する{道具|どうぐ}だよ。{画面|がめん}やスピーカーは{出力|しゅつりょく}だね。",
    format: "choice",
    choices: ["キーボード", "{画面|がめん}", "スピーカー", "プリンター"],
    answer: "キーボード",
  },
  {
    id: `${U.inputOutput}.q-3`,
    unitId: U.inputOutput,
    prompt: "おとを{出|だ}す「{出力|しゅつりょく}」の{道具|どうぐ}は どれ？",
    explanation:
      "スピーカーは おとを{出力|しゅつりょく}する{道具|どうぐ}だよ。マイクは おとを{入力|にゅうりょく}する{道具|どうぐ}だね。",
    format: "choice",
    choices: ["スピーカー", "マイク", "キーボード", "マウス"],
    answer: "スピーカー",
  },
  {
    id: `${U.inputOutput}.q-4`,
    unitId: U.inputOutput,
    prompt: "コンピュータの しごとの じゅんばんで{正|ただ}しいのは どれ？",
    explanation:
      "コンピュータは「{入力|にゅうりょく}」→「{処理|しょり}（けいさん）」→「{出力|しゅつりょく}」のじゅんで しごとをするよ。",
    format: "choice",
    choices: [
      "{入力|にゅうりょく} → {処理|しょり} → {出力|しゅつりょく}",
      "{出力|しゅつりょく} → {入力|にゅうりょく} → {処理|しょり}",
      "{処理|しょり} → {出力|しゅつりょく} → {入力|にゅうりょく}",
      "{出力|しゅつりょく} → {処理|しょり} → {入力|にゅうりょく}",
    ],
    answer: "{入力|にゅうりょく} → {処理|しょり} → {出力|しゅつりょく}",
  },
  {
    id: `${U.inputOutput}.q-5`,
    unitId: U.inputOutput,
    prompt: "カメラは おもに どちらの{道具|どうぐ}？",
    explanation:
      "カメラは{景色|けしき}や{顔|かお}をコンピュータに とりこむので「{入力|にゅうりょく}」の{道具|どうぐ}だよ。",
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "どちらでもない", "コンセント"],
    answer: "{入力|にゅうりょく}",
  },
];

const internetBasicsQuestions: Question[] = [
  {
    id: `${U.internetBasics}.q-1`,
    unitId: U.internetBasics,
    prompt: "インターネットとは どんなもの？",
    explanation:
      "インターネットは せかいじゅうのコンピュータを つなぐ しくみだよ。だから とおくの{人|ひと}とも やりとりできるんだ。",
    format: "choice",
    choices: [
      "せかいじゅうのコンピュータを つなぐ しくみ",
      "{大|おお}きな れいぞうこ",
      "あたらしい ゲーム",
      "{紙|かみ}のじしょ",
    ],
    answer: "せかいじゅうのコンピュータを つなぐ しくみ",
  },
  {
    id: `${U.internetBasics}.q-2`,
    unitId: U.internetBasics,
    prompt: "インターネットで できることは どれ？",
    explanation:
      "{動画|どうが}を{見|み}たり、メッセージを{送|おく}ったり、しらべものができるよ。{全部|ぜんぶ} つながっているからできるんだ。",
    format: "choice",
    choices: [
      "{動画|どうが}を{見|み}る",
      "ごはんを たべる",
      "そとで はしる",
      "つみきで あそぶ",
    ],
    answer: "{動画|どうが}を{見|み}る",
  },
  {
    id: `${U.internetBasics}.q-3`,
    unitId: U.internetBasics,
    prompt: "{画面|がめん}に{文字|もじ}や{絵|え}を{出|だ}す「ホームページ」を{見|み}る ソフトを なんという？",
    explanation:
      "ホームページを{見|み}るソフトを「ブラウザ」というよ。むしの くもの{巣|す}（ウェブ）をたどるイメージだね。",
    format: "choice",
    choices: ["ブラウザ", "プリンター", "キーボード", "バッテリー"],
    answer: "ブラウザ",
  },
  {
    id: `${U.internetBasics}.q-4`,
    unitId: U.internetBasics,
    prompt: "インターネットの じょうほうについて {正|ただ}しいのは どれ？",
    explanation:
      "インターネットには まちがった じょうほうも あるよ。{本当|ほんとう}かどうか たしかめることが{大切|たいせつ}だね。",
    format: "choice",
    choices: [
      "まちがいも あるので たしかめる",
      "{全部|ぜんぶ} ただしい",
      "{全部|ぜんぶ} うそ",
      "{見|み}てはいけない",
    ],
    answer: "まちがいも あるので たしかめる",
  },
  {
    id: `${U.internetBasics}.q-5`,
    unitId: U.internetBasics,
    prompt: "とおくの{人|ひと}と すぐに やりとりするには どれをつかう？",
    explanation:
      "メッセージや メールは インターネットをとおして すぐに とどくよ。てがみよりずっと はやいね。",
    format: "choice",
    choices: ["メッセージ（メール）", "てがみを ポストに{入|い}れる", "{大|おお}ごえで さけぶ", "はとを とばす"],
    answer: "メッセージ（メール）",
  },
];

const infoSafetyQuestions: Question[] = [
  {
    id: `${U.infoSafety}.q-1`,
    unitId: U.infoSafety,
    prompt: "パスワードは どうするのが よい？",
    explanation:
      "パスワードは じぶんだけの ひみつのカギだよ。{人|ひと}に{教|おし}えず、わかりにくいものにしようね。",
    format: "choice",
    choices: [
      "{人|ひと}に{教|おし}えず ひみつにする",
      "ともだち{全員|ぜんいん}に{教|おし}える",
      "「1234」にする",
      "{机|つくえ}に はっておく",
    ],
    answer: "{人|ひと}に{教|おし}えず ひみつにする",
  },
  {
    id: `${U.infoSafety}.q-2`,
    unitId: U.infoSafety,
    prompt: "ネットで しらない{人|ひと}に{聞|き}かれても{教|おし}えてはいけないのは どれ？",
    explanation:
      "{名前|なまえ}・じゅうしょ・{学校|がっこう}などの{個人|こじん}じょうほうは{教|おし}えてはいけないよ。じぶんを{守|まも}るためだよ。",
    format: "choice",
    choices: [
      "じぶんの じゅうしょ",
      "すきな{色|いろ}",
      "すきな たべもの",
      "きのうの てんき",
    ],
    answer: "じぶんの じゅうしょ",
  },
  {
    id: `${U.infoSafety}.q-3`,
    unitId: U.infoSafety,
    prompt: "ネットで メッセージを{送|おく}るとき、{気|き}をつけることは？",
    explanation:
      "{相手|あいて}の{顔|かお}が{見|み}えなくても、やさしいことばを{使|つか}おう。{文字|もじ}だけだと きもちが つたわりにくいからだよ。",
    format: "choice",
    choices: [
      "やさしいことばを{使|つか}う",
      "わるぐちを{書|か}く",
      "うそを{書|か}く",
      "{大文字|おおもじ}で どなる",
    ],
    answer: "やさしいことばを{使|つか}う",
  },
  {
    id: `${U.infoSafety}.q-4`,
    unitId: U.infoSafety,
    prompt: "へんなメッセージや こわいがめんが{出|で}たら どうする？",
    explanation:
      "じぶんで かってに きめず、すぐ おうちの{人|ひと}や せんせいに{相談|そうだん}しよう。それが いちばん{安全|あんぜん}だよ。",
    format: "choice",
    choices: [
      "おとなに{相談|そうだん}する",
      "そのまま{押|お}してみる",
      "ともだちに まわす",
      "ひみつにする",
    ],
    answer: "おとなに{相談|そうだん}する",
  },
  {
    id: `${U.infoSafety}.q-5`,
    unitId: U.infoSafety,
    prompt: "{他|ほか}の{人|ひと}の しゃしんを かってに ネットに のせるのは？",
    explanation:
      "{人|ひと}のしゃしんを かってに のせてはいけないよ。のせる{前|まえ}に かならず その{人|ひと}に きこうね。",
    format: "choice",
    choices: [
      "いけない（その{人|ひと}に きく）",
      "いつでも よい",
      "ともだちなら よい",
      "{先生|せんせい}なら よい",
    ],
    answer: "いけない（その{人|ひと}に きく）",
  },
];

// ── 領域2: アルゴリズム ──

const stepsQuestions: Question[] = [
  {
    id: `${U.steps}.q-1`,
    unitId: U.steps,
    prompt: "「はみがき」を {正|ただ}しいじゅんばんに ならべよう。",
    explanation:
      "ハブラシをとる → はみがきこをつける → みがく → くちをゆすぐ、のじゅんだよ。じゅんばんが{大切|たいせつ}だね。",
    format: "ordering",
    items: [
      "ハブラシを とる",
      "はみがきこを つける",
      "は を みがく",
      "くちを ゆすぐ",
    ],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.steps}.q-2`,
    unitId: U.steps,
    prompt: "「カップラーメンを つくる」じゅんばんに ならべよう。",
    explanation:
      "ふたをあける → おゆを{入|い}れる → 3{分|ぷん}まつ → たべる、のじゅんだよ。まつ{手順|てじゅん}をわすれないでね。",
    format: "ordering",
    items: [
      "ふたを あける",
      "おゆを{入|い}れる",
      "3{分|ぷん} まつ",
      "たべる",
    ],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.steps}.q-3`,
    unitId: U.steps,
    prompt: "「{学校|がっこう}へ いく{朝|あさ}のしたく」を ならべよう。",
    explanation:
      "おきる → きがえる → ごはんをたべる → いえを{出|で}る、のじゅんだよ。きがえる{前|まえ}に いえを{出|で}たら こまるね。",
    format: "ordering",
    items: [
      "おきる",
      "きがえる",
      "ごはんを たべる",
      "いえを{出|で}る",
    ],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.steps}.q-4`,
    unitId: U.steps,
    prompt: "「{手順|てじゅん}（アルゴリズム）」とは どんなもの？",
    explanation:
      "ものごとを やるための「じゅんばん・やりかた」を{手順|てじゅん}（アルゴリズム）というよ。",
    format: "choice",
    choices: [
      "ものごとを やる じゅんばん",
      "コンピュータの{色|いろ}",
      "{大|おお}きな{数|かず}",
      "あたらしい ゲーム",
    ],
    answer: "ものごとを やる じゅんばん",
  },
  {
    id: `${U.steps}.q-5`,
    unitId: U.steps,
    prompt: "じゅんばんを まちがえると どうなる？",
    explanation:
      "じゅんばんが ちがうと、おもいどおりの けっかにならないよ。だから{手順|てじゅん}は{正|ただ}しいじゅんに することが{大切|たいせつ}だよ。",
    format: "choice",
    choices: [
      "うまくいかないことがある",
      "かならず せいこうする",
      "はやくなる",
      "なにも かわらない",
    ],
    answer: "うまくいかないことがある",
  },
];

const repeatBranchQuestions: Question[] = [
  {
    id: `${U.repeatBranch}.q-1`,
    unitId: U.repeatBranch,
    prompt: "「10かい ジャンプする」は どのしくみ？",
    explanation:
      "{同|おな}じことを{何回|なんかい}もすることを「くりかえし（ループ）」というよ。10かいジャンプは くりかえしだね。",
    format: "choice",
    choices: ["くりかえし", "ぶんき", "{入力|にゅうりょく}", "{出力|しゅつりょく}"],
    answer: "くりかえし",
  },
  {
    id: `${U.repeatBranch}.q-2`,
    unitId: U.repeatBranch,
    prompt: "「あめなら かさをもつ、はれなら ぼうしをかぶる」は どのしくみ？",
    explanation:
      "ばあいによって やることを{分|わ}けることを「ぶんき（じょうけん）」というよ。",
    format: "choice",
    choices: ["ぶんき", "くりかえし", "{記憶|きおく}", "{出力|しゅつりょく}"],
    answer: "ぶんき",
  },
  {
    id: `${U.repeatBranch}.q-3`,
    unitId: U.repeatBranch,
    prompt: "くりかえしを{使|つか}う よいところは？",
    explanation:
      "{同|おな}じ{命令|めいれい}を{何回|なんかい}も{書|か}かなくてよいので、プログラムが みじかく かんたんになるよ。",
    format: "choice",
    choices: [
      "{命令|めいれい}を みじかく できる",
      "{命令|めいれい}が ながくなる",
      "コンピュータが こわれる",
      "おそくなる だけ",
    ],
    answer: "{命令|めいれい}を みじかく できる",
  },
  {
    id: `${U.repeatBranch}.q-4`,
    unitId: U.repeatBranch,
    prompt: "「ボタンを{押|お}したら 音がなる」のように、{何|なに}かが おきたら{動|うご}くのは？",
    explanation:
      "「〜だったら…する」は ぶんき（じょうけん）だよ。ボタンが{押|お}されたか どうかで{分|わ}かれるね。",
    format: "choice",
    choices: ["ぶんき（じょうけん）", "くりかえし", "{入力|にゅうりょく}そうち", "ハードウェア"],
    answer: "ぶんき（じょうけん）",
  },
  {
    id: `${U.repeatBranch}.q-5`,
    unitId: U.repeatBranch,
    prompt: "つぎのうち くりかえしの れいは どれ？",
    explanation:
      "「かべに{当|あ}たるまで まっすぐ すすむ」は{同|おな}じことを くりかえしているよ。",
    format: "choice",
    choices: [
      "かべに{当|あ}たるまで すすむ",
      "あめなら かさをもつ",
      "おなかが すいたら たべる",
      "あついなら まどをあける",
    ],
    answer: "かべに{当|あ}たるまで すすむ",
  },
];

const flowchartQuestions: Question[] = [
  {
    id: `${U.flowchart}.q-1`,
    unitId: U.flowchart,
    prompt: "フローチャートとは どんなもの？",
    explanation:
      "{手順|てじゅん}の{流|なが}れを{図|ず}にあらわしたものを フローチャートというよ。{矢印|やじるし}でつぎの{動|うご}きを しめすんだ。",
    format: "choice",
    choices: [
      "{手順|てじゅん}を{図|ず}にしたもの",
      "コンピュータの なまえ",
      "ゲームのなまえ",
      "おかしの{名前|なまえ}",
    ],
    answer: "{手順|てじゅん}を{図|ず}にしたもの",
  },
  {
    id: `${U.flowchart}.q-2`,
    unitId: U.flowchart,
    prompt: "フローチャートで つぎの{動|うご}きを しめすのは どれ？",
    explanation:
      "{矢印|やじるし}（→）で つぎに すすむほうこうを しめすよ。だから{流|なが}れが わかるんだ。",
    format: "choice",
    choices: ["{矢印|やじるし}（→）", "まる だけ", "{数字|すうじ}だけ", "いろ"],
    answer: "{矢印|やじるし}（→）",
  },
  {
    id: `${U.flowchart}.q-3`,
    unitId: U.flowchart,
    prompt: "「ひしがた（◇）」の{記号|きごう}は フローチャートで{何|なに}をあらわす？",
    explanation:
      "ひしがた ◇ は「〜なら？」と{分|わ}かれる ぶんき（じょうけん）をあらわすよ。",
    format: "choice",
    choices: [
      "ぶんき（じょうけん）",
      "はじまり",
      "おわり",
      "けいさん だけ",
    ],
    answer: "ぶんき（じょうけん）",
  },
  {
    id: `${U.flowchart}.q-4`,
    unitId: U.flowchart,
    prompt: "フローチャートを{書|か}く よいところは？",
    explanation:
      "{流|なが}れが{目|め}で{見|み}てわかるので、まちがいに{気|き}づきやすく、{人|ひと}にも せつめいしやすいよ。",
    format: "choice",
    choices: [
      "{流|なが}れが ひとめでわかる",
      "{絵|え}がきれいになる",
      "ゲームが はやくなる",
      "でんきがいらない",
    ],
    answer: "{流|なが}れが ひとめでわかる",
  },
  {
    id: `${U.flowchart}.q-5`,
    unitId: U.flowchart,
    prompt: "「おゆを わかす → カップに{入|い}れる → まつ」を{図|ず}にするとき、いちばん{大切|たいせつ}なことは？",
    explanation:
      "フローチャートでは じゅんばん（{流|なが}れ）を{正|ただ}しくつなぐことが いちばん{大切|たいせつ}だよ。",
    format: "choice",
    choices: [
      "じゅんばんを{正|ただ}しくつなぐ",
      "いろを ぬる",
      "{大|おお}きく かく",
      "はやく かく",
    ],
    answer: "じゅんばんを{正|ただ}しくつなぐ",
  },
];

// ── 領域3: プログラミング ──

const commandsQuestions: Question[] = [
  {
    id: `${U.commands}.q-1`,
    unitId: U.commands,
    prompt: "ロボットを「まえに1ます すすめて みぎをむく」じゅんに{命令|めいれい}を ならべよう。",
    explanation:
      "「まえに すすむ」→「みぎを むく」のじゅんで{命令|めいれい}するよ。コンピュータは{命令|めいれい}のじゅんどおりに{動|うご}くんだ。",
    format: "ordering",
    items: ["まえに 1ます すすむ", "みぎを むく"],
    answerOrder: [0, 1],
  },
  {
    id: `${U.commands}.q-2`,
    unitId: U.commands,
    prompt: "コンピュータは{命令|めいれい}を どう{動|うご}く？",
    explanation:
      "コンピュータは{命令|めいれい}のとおりにしか{動|うご}かないよ。だから{命令|めいれい}を{正|ただ}しく{書|か}くことが{大切|たいせつ}だね。",
    format: "choice",
    choices: [
      "{命令|めいれい}のとおりに{動|うご}く",
      "すきなように{動|うご}く",
      "{動|うご}かない",
      "じぶんで かんがえる",
    ],
    answer: "{命令|めいれい}のとおりに{動|うご}く",
  },
  {
    id: `${U.commands}.q-3`,
    unitId: U.commands,
    prompt: "{命令|めいれい}のじゅんばんを いれかえると どうなる？",
    explanation:
      "じゅんばんが かわると、ロボットの{動|うご}きも かわるよ。「みぎをむく→すすむ」と「すすむ→みぎをむく」では いきさきが ちがうね。",
    format: "choice",
    choices: [
      "{動|うご}きが かわる",
      "なにも かわらない",
      "はやくなる だけ",
      "こわれる",
    ],
    answer: "{動|うご}きが かわる",
  },
  {
    id: `${U.commands}.q-4`,
    unitId: U.commands,
    prompt: "みのまわりで{命令|めいれい}どおりに{動|うご}くものは どれ？",
    explanation:
      "{自動|じどう}ドアは「{人|ひと}が きたら ひらく」という{命令|めいれい}で{動|うご}いているよ。",
    format: "choice",
    choices: ["{自動|じどう}ドア", "{木|き}", "いし", "くも"],
    answer: "{自動|じどう}ドア",
  },
  {
    id: `${U.commands}.q-5`,
    unitId: U.commands,
    prompt: "ロボットを おもいどおりに{動|うご}かすには？",
    explanation:
      "やってほしいことを じゅんばんに、こまかく{命令|めいれい}することが{大切|たいせつ}だよ。",
    format: "choice",
    choices: [
      "じゅんばんに こまかく{命令|めいれい}する",
      "おねがいを いう だけ",
      "まつ だけ",
      "{見|み}つめる",
    ],
    answer: "じゅんばんに こまかく{命令|めいれい}する",
  },
];

const blockProgrammingQuestions: Question[] = [
  {
    id: `${U.blockProgramming}.q-1`,
    unitId: U.blockProgramming,
    prompt: "ブロックプログラミングとは どんなもの？",
    explanation:
      "{命令|めいれい}のブロックを ならべて プログラムを{作|つく}るやりかただよ。むずかしい{文字|もじ}を{書|か}かなくてよいんだ。",
    format: "choice",
    choices: [
      "{命令|めいれい}のブロックを ならべて{作|つく}る",
      "つみきで いえを{作|つく}る",
      "{絵|え}をかく",
      "{歌|うた}をうたう",
    ],
    answer: "{命令|めいれい}のブロックを ならべて{作|つく}る",
  },
  {
    id: `${U.blockProgramming}.q-2`,
    unitId: U.blockProgramming,
    prompt: "ブロックプログラミングの よいところは？",
    explanation:
      "{文字|もじ}を{打|う}たずに ブロックをならべるだけなので、はじめてでも かんたんに プログラムが{作|つく}れるよ。",
    format: "choice",
    choices: [
      "{文字|もじ}を{書|か}かずに かんたんに{作|つく}れる",
      "でんきが いらない",
      "インターネットが はやくなる",
      "{絵|え}が うまくなる",
    ],
    answer: "{文字|もじ}を{書|か}かずに かんたんに{作|つく}れる",
  },
  {
    id: `${U.blockProgramming}.q-3`,
    unitId: U.blockProgramming,
    prompt: "「10かい うごく」をブロックで{作|つく}るとき{使|つか}うのは？",
    explanation:
      "{同|おな}じ{動|うご}きを{何回|なんかい}もさせるときは「くりかえし」のブロックを{使|つか}うよ。",
    format: "choice",
    choices: [
      "くりかえしの ブロック",
      "{音|おと}の ブロック",
      "いろの ブロック",
      "おわりの ブロック",
    ],
    answer: "くりかえしの ブロック",
  },
  {
    id: `${U.blockProgramming}.q-4`,
    unitId: U.blockProgramming,
    prompt: "Scratch（スクラッチ）のような ツールで{動|うご}かすのは おもに{何|なに}？",
    explanation:
      "ねこなどの キャラクター（スプライト）を{命令|めいれい}ブロックで{動|うご}かして{作品|さくひん}を{作|つく}るよ。",
    format: "choice",
    choices: ["キャラクター", "{本物|ほんもの}の どうぶつ", "じどうしゃ", "ひこうき"],
    answer: "キャラクター",
  },
  {
    id: `${U.blockProgramming}.q-5`,
    unitId: U.blockProgramming,
    prompt: "ブロックを ならべるとき{大切|たいせつ}なことは？",
    explanation:
      "ブロックも じゅんばんが{大切|たいせつ}だよ。ならべるじゅんで{動|うご}きが きまるからね。",
    format: "choice",
    choices: [
      "ならべる じゅんばん",
      "ブロックの いろ",
      "ブロックの{大|おお}きさ",
      "ブロックの かず だけ",
    ],
    answer: "ならべる じゅんばん",
  },
];

const debugQuestions: Question[] = [
  {
    id: `${U.debug}.q-1`,
    unitId: U.debug,
    prompt: "「デバッグ」とは どんなこと？",
    explanation:
      "プログラムの まちがい（バグ）を さがして{直|なお}すことを「デバッグ」というよ。",
    format: "choice",
    choices: [
      "まちがいを さがして{直|なお}す",
      "あたらしく{作|つく}る",
      "{消|け}してしまう",
      "{色|いろ}を ぬる",
    ],
    answer: "まちがいを さがして{直|なお}す",
  },
  {
    id: `${U.debug}.q-2`,
    unitId: U.debug,
    prompt: "プログラムの まちがいのことを なんという？",
    explanation:
      "プログラムの まちがいを「バグ（むし）」というよ。それを とりのぞくのが デバッグだね。",
    format: "choice",
    choices: ["バグ", "ハード", "ソフト", "マウス"],
    answer: "バグ",
  },
  {
    id: `${U.debug}.q-3`,
    unitId: U.debug,
    prompt: "プログラムが おもいどおりに{動|うご}かないとき、まず どうする？",
    explanation:
      "どこで まちがっているか、じゅんばんに たしかめて さがすよ。あわてず ひとつずつ しらべるのが こつだよ。",
    format: "choice",
    choices: [
      "どこが まちがいか さがす",
      "{全部|ぜんぶ}{消|け}す",
      "コンピュータを たたく",
      "あきらめる",
    ],
    answer: "どこが まちがいか さがす",
  },
  {
    id: `${U.debug}.q-4`,
    unitId: U.debug,
    prompt: "「まえに すすむ」を 1かい わすれていたら どうする？",
    explanation:
      "たりない{命令|めいれい}を ただしいばしょに{足|た}せばいいよ。まちがいの{場所|ばしょ}を 見つけて{直|なお}すのがデバッグだね。",
    format: "choice",
    choices: [
      "たりない{命令|めいれい}を{足|た}す",
      "{命令|めいれい}を{全部|ぜんぶ}{消|け}す",
      "そのままにする",
      "コンピュータを かえる",
    ],
    answer: "たりない{命令|めいれい}を{足|た}す",
  },
  {
    id: `${U.debug}.q-5`,
    unitId: U.debug,
    prompt: "デバッグについて {正|ただ}しいのは どれ？",
    explanation:
      "プログラムを{作|つく}る{人|ひと}は みんな まちがえるよ。だから デバッグは はずかしいことではなく、だいじな しごとだよ。",
    format: "choice",
    choices: [
      "だれでも まちがえるので だいじな しごと",
      "じょうずな{人|ひと}は しない",
      "むだな こと",
      "1かいで かならず{直|なお}る",
    ],
    answer: "だれでも まちがえるので だいじな しごと",
  },
];

export const itG3Contents: Record<string, UnitContent> = {
  // ── 領域1: コンピュータのきほん ──
  [U.whatIsComputer]: {
    unitId: U.whatIsComputer,
    learn: {
      unitId: U.whatIsComputer,
      steps: [
        {
          heading: "コンピュータは けいさんが とくい",
          body: "コンピュータは すごいはやさで {計算|けいさん}をして、{文字|もじ}や{絵|え}を{画面|がめん}に{出|だ}したり、{音|おと}を{鳴|な}らしたりする{機械|きかい}だよ。",
          visual: { kind: "emoji", value: "💻", caption: "けいさんが とくい" },
        },
        {
          heading: "ハードと ソフト",
          body: "{手|て}でさわれる{部分|ぶぶん}を「ハードウェア」、{中|なか}で{動|うご}くプログラムを「ソフトウェア」というよ。{体|からだ}とこころみたいな かんけいだね。",
          visual: { kind: "emoji", value: "🧩", caption: "ハード と ソフト" },
        },
        {
          heading: "みのまわりの コンピュータ",
          body: "スマホ・ゲームき・しんごうき・れいぞうこ…たくさんの{機械|きかい}の{中|なか}に コンピュータが{入|はい}っているよ。さがしてみよう。",
          visual: { kind: "emoji", value: "📱🎮🚦", caption: "どこにでも あるよ" },
        },
      ],
    },
    test: { unitId: U.whatIsComputer, questions: whatIsComputerQuestions, questionCount: 5 },
  },

  [U.inputOutput]: {
    unitId: U.inputOutput,
    learn: {
      unitId: U.inputOutput,
      steps: [
        {
          heading: "{入力|にゅうりょく}って なに？",
          body: "{人|ひと}がコンピュータに つたえることを「{入力|にゅうりょく}」というよ。キーボードで{文字|もじ}を{打|う}つ、マウスでクリックするのが{入力|にゅうりょく}だね。",
          visual: { kind: "emoji", value: "⌨️🖱️", caption: "コンピュータに つたえる" },
        },
        {
          heading: "{出力|しゅつりょく}って なに？",
          body: "コンピュータが{人|ひと}に{見|み}せたり{聞|き}かせたりすることを「{出力|しゅつりょく}」というよ。{画面|がめん}の{文字|もじ}や スピーカーの{音|おと}が{出力|しゅつりょく}だよ。",
          visual: { kind: "emoji", value: "🖥️🔊", caption: "コンピュータが かえす" },
        },
      ],
    },
    test: { unitId: U.inputOutput, questions: inputOutputQuestions, questionCount: 5 },
  },

  [U.internetBasics]: {
    unitId: U.internetBasics,
    learn: {
      unitId: U.internetBasics,
      steps: [
        {
          heading: "せかいが つながっている",
          body: "インターネットは せかいじゅうの コンピュータを つなぐ{大|おお}きな しくみだよ。だから とおくの{人|ひと}とも やりとりできるんだ。",
          visual: { kind: "emoji", value: "🌐", caption: "せかいが つながる" },
        },
        {
          heading: "なにが できる？",
          body: "{動画|どうが}を{見|み}たり、メッセージを{送|おく}ったり、しらべものをしたり。べんりだけど、まちがった じょうほうも あるから たしかめようね。",
          visual: { kind: "emoji", value: "🔍📨", caption: "しらべる・つたえる" },
        },
      ],
    },
    test: { unitId: U.internetBasics, questions: internetBasicsQuestions, questionCount: 5 },
  },

  [U.infoSafety]: {
    unitId: U.infoSafety,
    learn: {
      unitId: U.infoSafety,
      steps: [
        {
          heading: "じぶんを まもる",
          body: "パスワードは じぶんだけの ひみつのカギ。{名前|なまえ}・じゅうしょなどの{大切|たいせつ}なことは、しらない{人|ひと}に{教|おし}えないようにしようね。",
          visual: { kind: "emoji", value: "🔑", caption: "ひみつの カギ" },
        },
        {
          heading: "ネットでも やさしく",
          body: "{相手|あいて}の{顔|かお}が{見|み}えなくても、その{先|さき}には{人|ひと}がいるよ。やさしいことばを{使|つか}い、こまったら おとなに{相談|そうだん}しよう。",
          visual: { kind: "emoji", value: "💬😊", caption: "やさしいことばで" },
        },
      ],
    },
    test: { unitId: U.infoSafety, questions: infoSafetyQuestions, questionCount: 5 },
  },

  // ── 領域2: アルゴリズム ──
  [U.steps]: {
    unitId: U.steps,
    learn: {
      unitId: U.steps,
      steps: [
        {
          heading: "じゅんばんが だいじ",
          body: "ものごとには「やるじゅんばん」があるよ。はみがきも、おゆをわかすのも、じゅんばんを まちがえると うまくいかないんだ。",
          visual: { kind: "emoji", value: "1️⃣2️⃣3️⃣", caption: "じゅんばんに やる" },
        },
        {
          heading: "{手順|てじゅん}（アルゴリズム）",
          body: "やることを じゅんばんに ならべたものを「{手順|てじゅん}（アルゴリズム）」というよ。コンピュータも この{手順|てじゅん}どおりに{動|うご}くんだ。",
          visual: { kind: "emoji", value: "📝", caption: "やりかたの じゅんばん" },
        },
      ],
    },
    test: { unitId: U.steps, questions: stepsQuestions, questionCount: 5 },
  },

  [U.repeatBranch]: {
    unitId: U.repeatBranch,
    learn: {
      unitId: U.repeatBranch,
      steps: [
        {
          heading: "くりかえし",
          body: "{同|おな}じことを{何回|なんかい}もすることを「くりかえし（ループ）」というよ。「10かい ジャンプ」みたいに、{命令|めいれい}をみじかくできるんだ。",
          visual: { kind: "emoji", value: "🔁", caption: "おなじことを なんかいも" },
        },
        {
          heading: "ぶんき（じょうけん）",
          body: "「あめなら かさをもつ、はれなら ぼうしをかぶる」のように、ばあいで やることを{分|わ}けることを「ぶんき」というよ。",
          visual: { kind: "emoji", value: "🔀☔☀️", caption: "ばあいで わかれる" },
        },
      ],
    },
    test: { unitId: U.repeatBranch, questions: repeatBranchQuestions, questionCount: 5 },
  },

  [U.flowchart]: {
    unitId: U.flowchart,
    learn: {
      unitId: U.flowchart,
      steps: [
        {
          heading: "{手順|てじゅん}を{図|ず}にする",
          body: "やることの{流|なが}れを{図|ず}にしたものを「フローチャート」というよ。{矢印|やじるし}（→）で つぎの{動|うご}きを しめすんだ。",
          visual: { kind: "emoji", value: "⬇️➡️", caption: "{矢印|やじるし}で つなぐ" },
        },
        {
          heading: "わかれみち ◇",
          body: "ひしがた ◇ は「〜なら？」とわかれる ぶんきを あらわすよ。{図|ず}にすると、{流|なが}れが ひとめで わかるんだ。",
          visual: { kind: "emoji", value: "🔷", caption: "じょうけんで わかれる" },
        },
      ],
    },
    test: { unitId: U.flowchart, questions: flowchartQuestions, questionCount: 5 },
  },

  // ── 領域3: プログラミング ──
  [U.commands]: {
    unitId: U.commands,
    learn: {
      unitId: U.commands,
      steps: [
        {
          heading: "{命令|めいれい}で うごく",
          body: "コンピュータやロボットは、「こうしなさい」という{命令|めいれい}どおりに{動|うご}くよ。じぶんで かってには うごかないんだ。",
          visual: { kind: "emoji", value: "🤖", caption: "{命令|めいれい}のとおりに" },
        },
        {
          heading: "じゅんばんが {命令|めいれい}を きめる",
          body: "「すすむ→みぎをむく」と「みぎをむく→すすむ」では いきさきが ちがうよ。{命令|めいれい}のじゅんばんは とても{大切|たいせつ}だね。",
          visual: { kind: "emoji", value: "⬆️➡️", caption: "じゅんばんで かわる" },
        },
      ],
    },
    test: { unitId: U.commands, questions: commandsQuestions, questionCount: 5 },
  },

  [U.blockProgramming]: {
    unitId: U.blockProgramming,
    learn: {
      unitId: U.blockProgramming,
      steps: [
        {
          heading: "ブロックを ならべる",
          body: "Scratch のように、{命令|めいれい}のブロックを ならべるだけで キャラクターを{動|うご}かせるよ。むずかしい{文字|もじ}を{書|か}かなくてよいんだ。",
          visual: { kind: "emoji", value: "🧱🐱", caption: "ブロックで うごかす" },
        },
        {
          heading: "くりかえし も つかえる",
          body: "「くりかえし」のブロックを{使|つか}うと、{同|おな}じ{動|うご}きを{何回|なんかい}もさせられるよ。ブロックも ならべるじゅんばんが{大切|たいせつ}だよ。",
          visual: { kind: "emoji", value: "🔁🧱", caption: "くりかえしブロック" },
        },
      ],
    },
    test: { unitId: U.blockProgramming, questions: blockProgrammingQuestions, questionCount: 5 },
  },

  [U.debug]: {
    unitId: U.debug,
    learn: {
      unitId: U.debug,
      steps: [
        {
          heading: "まちがい（バグ）を さがす",
          body: "プログラムが おもいどおりに{動|うご}かないとき、まちがい（バグ）を さがして{直|なお}すことを「デバッグ」というよ。",
          visual: { kind: "emoji", value: "🐛🔍", caption: "バグを さがす" },
        },
        {
          heading: "ひとつずつ たしかめる",
          body: "あわてず、どこで まちがったか じゅんばんに しらべよう。{作|つく}る{人|ひと}は みんな まちがえるから、デバッグは だいじな しごとだよ。",
          visual: { kind: "emoji", value: "🔧✅", caption: "ひとつずつ なおす" },
        },
      ],
    },
    test: { unitId: U.debug, questions: debugQuestions, questionCount: 5 },
  },
};
