// ══════════════════════════════════════════
// カリキュラム: 情報・コンピュータ（IT）小4 ─ 新教科（scope-it.md）
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 表記規約: 全表示テキストは「漢字＋全漢字ルビ」記法 {漢字|よみ} で執筆（RubyText が描画）。
//          formalName など管理用の正式名は素の漢字でよい（表示は name 側を使う）。
//
// 【申し送り（中央集約担当へ）】
//  1. SubjectId は src/types/drill.ts に "it" が既に追加済みだったため as 回避は不要（そのまま使用）。
//  2. 依存グラフ(prerequisites/leadsTo)は本ファイル＝it.g4 内でクローズさせている。
//     scope-it.md が求める「算数の順序・論理を前提に」「中学技術・高校情報へ」という越境依存は、
//     未作成の他学年/他教科 Unit.id を参照すると validate-curriculum の [2.参照] で集約時に落ちるため、
//     prerequisites 配列には入れず realWorldUse / 解説テキストで表現した。
//     it.g5/g6 や算数Unitが揃った後のレトロフィット波で leadsTo/prerequisites に越境エッジを足してよい。
//  3. 棲み分け: 本教科は「動かす・作る」実務寄り。応用(oyo)は二進法・確率等の数学的本質側。
//     アルゴリズム概念は両方に出るが、ITは手順を組んで動かす角度に統一した。
//  4. index.ts と types は本波では一切編集していない。
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
  name: "{情報|じょうほう}",
  formalName: "情報・コンピュータ",
  emoji: "💻",
  theme: "sky",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// scope-it.md の3領域。学年非依存のカテゴリ id（集約時に他学年と同一 id で重複排除される想定）。

export const itG4Domains: Domain[] = [
  {
    id: "it.computer-basics",
    subjectId: "it",
    name: "コンピュータの きほん",
    formalName: "コンピュータの基本",
  },
  {
    id: "it.algorithm",
    subjectId: "it",
    name: "アルゴリズム",
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
// 依存グラフ（it.g4 内でクローズ。prerequisites を辺に DAG）:
//
//   [きほん] hardware-software ─┬─▶ input-output ─┐
//                              └─▶ data-storage ─┴─▶ internet ─▶ info-safety
//
//   [アルゴリズム] algorithm-steps ─┬─▶ sort-search
//                                  └─▶ block-programming
//
//   [プログラミング] block-programming ─▶ variables-loops ─▶ debug
//
const U = {
  hardwareSoftware: "it.g4.hardware-software",
  inputOutput: "it.g4.input-output",
  dataStorage: "it.g4.data-storage",
  internet: "it.g4.internet",
  infoSafety: "it.g4.info-safety",
  algorithmSteps: "it.g4.algorithm-steps",
  sortSearch: "it.g4.sort-search",
  blockProgramming: "it.g4.block-programming",
  variablesLoops: "it.g4.variables-loops",
  debug: "it.g4.debug",
} as const;

export const itG4Units: Unit[] = [
  // ── 領域1: コンピュータのきほん ──
  {
    id: U.hardwareSoftware,
    subjectId: "it",
    grade: 4,
    domainId: "it.computer-basics",
    title: "ハードと ソフト",
    order: 1,
    realWorldUse:
      "スマホや ゲームきが「{機械|きかい}（ハード）」と「アプリ（ソフト）」で うごいて いる ことが わかると、こわれた とき どちらの もんだいか かんがえられるよ。",
    leadsTo: [U.inputOutput, U.dataStorage],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.inputOutput,
    subjectId: "it",
    grade: 4,
    domainId: "it.computer-basics",
    title: "{入力|にゅうりょく}と {出力|しゅつりょく}",
    order: 2,
    realWorldUse:
      "キーボードで {文字|もじ}を いれて、{画面|がめん}に {表|あらわ}す——どうぐが「いれる{係|がかり}」か「だす{係|がかり}」か わかると、きかいの しくみが {見|み}えて くるよ。",
    leadsTo: [U.internet],
    prerequisites: [U.hardwareSoftware],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.dataStorage,
    subjectId: "it",
    grade: 4,
    domainId: "it.computer-basics",
    title: "データと {記憶|きおく}",
    order: 3,
    realWorldUse:
      "{写真|しゃしん}や {動画|どうが}が なぜ「データの {大|おお}きさ」で あらわされるのか わかると、ほぞんの {容量|ようりょう}が {足|た}りるか かんがえられるよ。",
    leadsTo: [U.internet],
    prerequisites: [U.hardwareSoftware],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.internet,
    subjectId: "it",
    grade: 4,
    domainId: "it.computer-basics",
    title: "インターネットの しくみ",
    order: 4,
    realWorldUse:
      "{動画|どうが}や メッセージが せかいじゅうの コンピュータを つないで とどく しくみが わかると、つながらない とき どこが もんだいか かんがえられるよ。",
    leadsTo: [U.infoSafety],
    prerequisites: [U.inputOutput, U.dataStorage],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.infoSafety,
    subjectId: "it",
    grade: 4,
    domainId: "it.computer-basics",
    title: "{情報|じょうほう}モラルと {安全|あんぜん}",
    order: 5,
    realWorldUse:
      "パスワードを {守|まも}る・{個人|こじん}{情報|じょうほう}を {出|だ}さない・ネットで やさしく する——インターネットを {安全|あんぜん}に たのしむ ために まいにち つかう {力|ちから}だよ。",
    leadsTo: [],
    prerequisites: [U.internet],
    hasLearn: true,
    hasTest: true,
  },
  // ── 領域2: アルゴリズム ──
  {
    id: U.algorithmSteps,
    subjectId: "it",
    grade: 4,
    domainId: "it.algorithm",
    title: "{手順|てじゅん}と フローチャート",
    order: 6,
    realWorldUse:
      "りょうりや {朝|あさ}の したくのように、やる ことを ただしい {順番|じゅんばん}に ならべて {図|ず}に かくと、だれが やっても {同|おな}じ けっかに なるよ。ロボットへの しじにも つかうよ。",
    leadsTo: [U.sortSearch, U.blockProgramming],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sortSearch,
    subjectId: "it",
    grade: 4,
    domainId: "it.algorithm",
    title: "ならべかえと さがす（{効率|こうりつ}）",
    order: 7,
    realWorldUse:
      "{番号|ばんごう}じゅんに ならべて おくと {目|め}あての ものを はやく さがせる——けんさくや {名簿|めいぼ}しらべが はやい りゆうが わかるよ。",
    leadsTo: [],
    prerequisites: [U.algorithmSteps],
    hasLearn: true,
    hasTest: true,
  },
  // ── 領域3: プログラミング ──
  {
    id: U.blockProgramming,
    subjectId: "it",
    grade: 4,
    domainId: "it.programming",
    title: "ブロックで うごかす",
    order: 8,
    realWorldUse:
      "ブロックを ならべて キャラクターを うごかす プログラミングは、ゲームや ロボットを じぶんで {作|つく}る さいしょの {一歩|いっぽ}に なるよ。",
    leadsTo: [U.variablesLoops],
    prerequisites: [U.algorithmSteps],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.variablesLoops,
    subjectId: "it",
    grade: 4,
    domainId: "it.programming",
    title: "{変数|へんすう}と くりかえし・じょうけん",
    order: 9,
    realWorldUse:
      "とくてんを ためる「{変数|へんすう}」、{同|おな}じ うごきの「くりかえし」、もし〜なら の「じょうけん」を つかうと、{短|みじか}い しじで ふくざつな うごきが {作|つく}れるよ。",
    leadsTo: [U.debug],
    prerequisites: [U.blockProgramming],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.debug,
    subjectId: "it",
    grade: 4,
    domainId: "it.programming",
    title: "デバッグ（まちがいさがし）",
    order: 10,
    realWorldUse:
      "プログラムが おもいどおりに うごかない とき、どこが まちがいか さがして {直|なお}す——{作|つく}った {作品|さくひん}を かんせいさせる ために いちばん だいじな {力|ちから}だよ。",
    leadsTo: [],
    prerequisites: [U.variablesLoops],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// テストは固定 questions[]。全問 explanation 必須。全文ルビ記法。
// 図は emoji 中心（SvgParamsMap は clock / number-blocks のみのため新規 svg は使わない）。
// ══════════════════════════════════════════

// 1. ハードと ソフト ───────────────────────────
const hardwareSoftwareQuestions: (ChoiceQuestion | MatchingQuestion)[] = [
  {
    id: `${U.hardwareSoftware}.q-1`,
    unitId: U.hardwareSoftware,
    prompt: "「ハードウェア」は どれ？",
    explanation:
      "ハードウェアは {手|て}で さわれる {機械|きかい}の ぶぶん。キーボードは さわれる ので ハードだよ。",
    visual: { kind: "emoji", value: "⌨️", caption: "さわれる きかい" },
    format: "choice",
    choices: ["キーボード", "ゲームの アプリ", "ブラウザ", "{音楽|おんがく}の データ"],
    answer: "キーボード",
  },
  {
    id: `${U.hardwareSoftware}.q-2`,
    unitId: U.hardwareSoftware,
    prompt: "「ソフトウェア」は どれ？",
    explanation:
      "ソフトウェアは さわれない、コンピュータを うごかす しじや アプリ。ゲームの アプリは ソフトだよ。",
    visual: { kind: "emoji", value: "🎮", caption: "アプリ＝ソフト" },
    format: "choice",
    choices: ["ゲームの アプリ", "マウス", "{画面|がめん}", "プリンター"],
    answer: "ゲームの アプリ",
  },
  {
    id: `${U.hardwareSoftware}.q-3`,
    unitId: U.hardwareSoftware,
    prompt: "つぎの どうぐを「ハード」か「ソフト」に わけよう。",
    explanation:
      "さわれる {機械|きかい}＝ハード（マウス・{画面|がめん}）、さわれない アプリや しじ＝ソフト（ブラウザ・けいさんアプリ）だよ。",
    format: "matching",
    left: ["マウス", "ブラウザ", "{画面|がめん}", "けいさんアプリ"],
    right: ["ハード", "ソフト"],
    answerPairs: [0, 1, 0, 1],
  },
  {
    id: `${U.hardwareSoftware}.q-4`,
    unitId: U.hardwareSoftware,
    prompt: "コンピュータが しごとを する には、なにと なにが いる？",
    explanation:
      "{機械|きかい}（ハード）だけでも、しじ（ソフト）だけでも うごかない。{両方|りょうほう}が そろって はじめて うごくよ。",
    visual: { kind: "emoji", value: "🖥️➕📀", caption: "ハード＋ソフト" },
    format: "choice",
    choices: [
      "ハードと ソフトの {両方|りょうほう}",
      "ハードだけ",
      "ソフトだけ",
      "でんきだけ",
    ],
    answer: "ハードと ソフトの {両方|りょうほう}",
  },
  {
    id: `${U.hardwareSoftware}.q-5`,
    unitId: U.hardwareSoftware,
    prompt: "スマホで「アプリを いれかえる」のは、なにを かえて いる？",
    explanation:
      "アプリ＝ソフトを かえて いるよ。{本体|ほんたい}（ハード）は そのままで、する しごとを かえられるのが ソフトの よさだね。",
    visual: { kind: "emoji", value: "📱", caption: "ソフトを いれかえ" },
    format: "choice",
    choices: ["ソフト", "ハード", "でんち", "{画面|がめん}の {大|おお}きさ"],
    answer: "ソフト",
  },
  {
    id: `${U.hardwareSoftware}.q-6`,
    unitId: U.hardwareSoftware,
    prompt: "「マウス」は ハードと ソフトの どっち？",
    explanation:
      "マウスは {手|て}で さわれる {機械|きかい}なので「ハード」だよ。",
    format: "choice",
    choices: ["ハード", "ソフト", "でんき", "データ"],
    answer: "ハード",
  },
  {
    id: `${U.hardwareSoftware}.q-7`,
    unitId: U.hardwareSoftware,
    prompt: "インターネットを {見|み}る「ブラウザ」は どっち？",
    explanation:
      "ブラウザは さわれない アプリなので「ソフト」だよ。",
    format: "choice",
    choices: ["ソフト", "ハード", "でんち", "ケーブル"],
    answer: "ソフト",
  },
  {
    id: `${U.hardwareSoftware}.q-8`,
    unitId: U.hardwareSoftware,
    prompt: "コンピュータの {中|なか}で けいさんや かんがえる しごとを する ぶぶんを なんと いう？",
    explanation:
      "けいさんを する あたまの ぶぶんを「CPU（シーピーユー）」と いうよ。コンピュータの {中心|ちゅうしん}だね。",
    visual: { kind: "emoji", value: "🧠", caption: "けいさんの あたま" },
    format: "choice",
    choices: ["CPU（シーピーユー）", "マウス", "スピーカー", "でんち"],
    answer: "CPU（シーピーユー）",
  },
  {
    id: `${U.hardwareSoftware}.q-9`,
    unitId: U.hardwareSoftware,
    prompt: "つぎの うち「ハードウェア」は どれ？",
    explanation:
      "プリンターは {手|て}で さわれる {機械|きかい}なので ハードだよ。ほかは アプリ（ソフト）だね。",
    format: "choice",
    choices: ["プリンター", "ゲームアプリ", "{音楽|おんがく}アプリ", "ブラウザ"],
    answer: "プリンター",
  },
  {
    id: `${U.hardwareSoftware}.q-10`,
    unitId: U.hardwareSoftware,
    prompt: "つぎの うち「ソフトウェア」は どれ？",
    explanation:
      "おえかきアプリは さわれない しじ（ソフト）だよ。ほかは さわれる ハードだね。",
    format: "choice",
    choices: ["おえかきアプリ", "キーボード", "マウス", "スピーカー"],
    answer: "おえかきアプリ",
  },
  {
    id: `${U.hardwareSoftware}.q-11`,
    unitId: U.hardwareSoftware,
    prompt: "スマホを かった だけでは ゲームが できない。ゲームを する には なにが いる？",
    explanation:
      "ゲームの アプリ（ソフト）を いれて はじめて あそべるよ。{本体|ほんたい}（ハード）だけでは うごかないんだ。",
    visual: { kind: "emoji", value: "📱🎮", caption: "アプリを いれる" },
    format: "choice",
    choices: [
      "ゲームの アプリ（ソフト）を いれる",
      "{画面|がめん}を {大|おお}きく する",
      "でんちを ふやす",
      "なにも しなくて よい",
    ],
    answer: "ゲームの アプリ（ソフト）を いれる",
  },
  {
    id: `${U.hardwareSoftware}.q-12`,
    unitId: U.hardwareSoftware,
    prompt: "「ハードが こわれた」と いえる のは どれ？",
    explanation:
      "{画面|がめん}が われるのは さわれる {機械|きかい}（ハード）の こしょう。アプリの もんだいは ソフトの こしょうだよ。",
    format: "choice",
    choices: [
      "{画面|がめん}が われた",
      "アプリが きえた",
      "パスワードを わすれた",
      "おとを 0に した",
    ],
    answer: "{画面|がめん}が われた",
  },
  {
    id: `${U.hardwareSoftware}.q-13`,
    unitId: U.hardwareSoftware,
    prompt: "アプリ（ソフト）を あたらしく する ことを なんと いう？",
    explanation:
      "ソフトを あたらしく して よく する ことを「アップデート」と いうよ。あんぜんにも なるんだ。",
    visual: { kind: "emoji", value: "⬆️", caption: "あたらしく する" },
    format: "choice",
    choices: ["アップデート", "シャットダウン", "ログアウト", "コピー"],
    answer: "アップデート",
  },
  {
    id: `${U.hardwareSoftware}.q-14`,
    unitId: U.hardwareSoftware,
    prompt: "コンピュータの でんげんを {入|い}れて うごきはじめる ことを なんと いう？",
    explanation:
      "でんげんを {入|い}れて うごきはじめる ことを「きどう（スタート）」と いうよ。",
    format: "choice",
    choices: ["きどう（スタート）", "ほぞん", "いんさつ", "けす"],
    answer: "きどう（スタート）",
  },
  {
    id: `${U.hardwareSoftware}.q-15`,
    unitId: U.hardwareSoftware,
    prompt: "つぎの うち「さわれない」もの（ソフト）は どれ？",
    explanation:
      "アプリは さわれない ソフト。マウス・キーボード・{画面|がめん}は さわれる ハードだね。",
    format: "choice",
    choices: ["アプリ", "マウス", "キーボード", "{画面|がめん}"],
    answer: "アプリ",
  },
  {
    id: `${U.hardwareSoftware}.q-16`,
    unitId: U.hardwareSoftware,
    prompt: "タブレットの「{画面|がめん}」は ハードと ソフトの どっち？",
    explanation:
      "{画面|がめん}は さわれる {機械|きかい}なので ハードだよ。そこに うつる アプリは ソフトだね。",
    format: "choice",
    choices: ["ハード", "ソフト", "でんき", "データ"],
    answer: "ハード",
  },
  {
    id: `${U.hardwareSoftware}.q-17`,
    unitId: U.hardwareSoftware,
    prompt: "{同|おな}じ パソコンでも、いれる アプリを かえると できる ことが かわる。これは なにの おかげ？",
    explanation:
      "アプリ＝ソフトを かえると できる しごとが かわるよ。これが ソフトの べんりな ところだね。",
    format: "choice",
    choices: ["ソフト（アプリ）", "ハード", "でんち", "ケーブル"],
    answer: "ソフト（アプリ）",
  },
  {
    id: `${U.hardwareSoftware}.q-18`,
    unitId: U.hardwareSoftware,
    prompt: "けいさんアプリや おえかきアプリを まとめて なんと いう？",
    explanation:
      "アプリや しじは ぜんぶ まとめて「ソフトウェア」と いうよ。",
    format: "choice",
    choices: ["ソフトウェア", "ハードウェア", "{記憶|きおく}そうち", "ネットワーク"],
    answer: "ソフトウェア",
  },
  {
    id: `${U.hardwareSoftware}.q-19`,
    unitId: U.hardwareSoftware,
    prompt: "コンピュータが しごとを する には、ハードと なにが いる？",
    explanation:
      "ハード（{機械|きかい}）に ソフト（しじ）が あって はじめて しごとが できるよ。",
    format: "choice",
    choices: ["ソフト", "もう1つの {画面|がめん}", "おおきな つくえ", "なにも いらない"],
    answer: "ソフト",
  },
  {
    id: `${U.hardwareSoftware}.q-20`,
    unitId: U.hardwareSoftware,
    prompt: "つぎの {文|ぶん}で {正|ただ}しい のは どれ？",
    explanation:
      "コンピュータは ハード（{機械|きかい}）と ソフト（しじ）の {両方|りょうほう}が そろって うごくよ。",
    format: "choice",
    choices: [
      "ハードと ソフトの {両方|りょうほう}が いる",
      "ハードだけで うごく",
      "ソフトだけで うごく",
      "どちらも いらない",
    ],
    answer: "ハードと ソフトの {両方|りょうほう}が いる",
  },
];

// 2. 入力と出力 ───────────────────────────
const inputOutputQuestions: (ChoiceQuestion | MatchingQuestion)[] = [
  {
    id: `${U.inputOutput}.q-1`,
    unitId: U.inputOutput,
    prompt: "コンピュータに {情報|じょうほう}を「いれる」どうぐは どれ？",
    explanation:
      "キーボードは {文字|もじ}を いれる「{入力|にゅうりょく}」の どうぐ。いれる＝{入力|にゅうりょく}だよ。",
    visual: { kind: "emoji", value: "⌨️➡️🖥️", caption: "いれる＝{入力|にゅうりょく}" },
    format: "choice",
    choices: ["キーボード", "プリンター", "スピーカー", "{画面|がめん}"],
    answer: "キーボード",
  },
  {
    id: `${U.inputOutput}.q-2`,
    unitId: U.inputOutput,
    prompt: "コンピュータが けっかを「だす」どうぐは どれ？",
    explanation:
      "{画面|がめん}（ディスプレイ）は けっかを {見|み}せて だす「{出力|しゅつりょく}」の どうぐ。だす＝{出力|しゅつりょく}だよ。",
    visual: { kind: "emoji", value: "🖥️➡️👀", caption: "だす＝{出力|しゅつりょく}" },
    format: "choice",
    choices: ["{画面|がめん}", "マウス", "マイク", "カメラ"],
    answer: "{画面|がめん}",
  },
  {
    id: `${U.inputOutput}.q-3`,
    unitId: U.inputOutput,
    prompt: "つぎの どうぐを「{入力|にゅうりょく}」か「{出力|しゅつりょく}」に わけよう。",
    explanation:
      "いれる{係|がかり}＝{入力|にゅうりょく}（マウス・マイク）、だす{係|がかり}＝{出力|しゅつりょく}（プリンター・スピーカー）。{矢印|やじるし}の むきで かんがえると わかりやすいよ。",
    format: "matching",
    left: ["マウス", "プリンター", "マイク", "スピーカー"],
    right: ["{入力|にゅうりょく}", "{出力|しゅつりょく}"],
    answerPairs: [0, 1, 0, 1],
  },
  {
    id: `${U.inputOutput}.q-4`,
    unitId: U.inputOutput,
    prompt: "タッチパネルは {指|ゆび}で さわって そうさするね。これは どっち？",
    explanation:
      "さわって {命令|めいれい}を いれる ので「{入力|にゅうりょく}」だよ。{画面|がめん}に だす ところは「{出力|しゅつりょく}」で、{両方|りょうほう}の はたらきを もつ どうぐも あるよ。",
    visual: { kind: "emoji", value: "👆📱", caption: "さわって いれる" },
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}", "でんげん"],
    answer: "{入力|にゅうりょく}",
  },
  {
    id: `${U.inputOutput}.q-5`,
    unitId: U.inputOutput,
    prompt: "コンピュータの しごとの ながれで、{正|ただ}しい じゅんは？",
    explanation:
      "「{入力|にゅうりょく}（いれる）→ {処理|しょり}（かんがえる）→ {出力|しゅつりょく}（だす）」の じゅん。これが コンピュータの きほんの ながれだよ。",
    visual: { kind: "emoji", value: "⌨️➡️🧠➡️🖥️", caption: "いれる→かんがえる→だす" },
    format: "choice",
    choices: [
      "{入力|にゅうりょく}→{処理|しょり}→{出力|しゅつりょく}",
      "{出力|しゅつりょく}→{処理|しょり}→{入力|にゅうりょく}",
      "{処理|しょり}→{入力|にゅうりょく}→{出力|しゅつりょく}",
      "{出力|しゅつりょく}→{入力|にゅうりょく}→{処理|しょり}",
    ],
    answer: "{入力|にゅうりょく}→{処理|しょり}→{出力|しゅつりょく}",
  },
  {
    id: `${U.inputOutput}.q-6`,
    unitId: U.inputOutput,
    prompt: "「マイク」は {入力|にゅうりょく}と {出力|しゅつりょく}の どっち？",
    explanation:
      "マイクは こえ（{音|おと}）を コンピュータに いれる ので「{入力|にゅうりょく}」だよ。",
    visual: { kind: "emoji", value: "🎤", caption: "{音|おと}を いれる" },
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}", "{処理|しょり}"],
    answer: "{入力|にゅうりょく}",
  },
  {
    id: `${U.inputOutput}.q-7`,
    unitId: U.inputOutput,
    prompt: "「スピーカー」は どっち？",
    explanation:
      "スピーカーは {音|おと}を そとに だす ので「{出力|しゅつりょく}」だよ。",
    visual: { kind: "emoji", value: "🔊", caption: "{音|おと}を だす" },
    format: "choice",
    choices: ["{出力|しゅつりょく}", "{入力|にゅうりょく}", "{記憶|きおく}", "でんげん"],
    answer: "{出力|しゅつりょく}",
  },
  {
    id: `${U.inputOutput}.q-8`,
    unitId: U.inputOutput,
    prompt: "「カメラ」は どっち？",
    explanation:
      "カメラは {絵|え}（{画像|がぞう}）を コンピュータに いれる ので「{入力|にゅうりょく}」だよ。",
    visual: { kind: "emoji", value: "📷", caption: "{絵|え}を いれる" },
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}", "{処理|しょり}"],
    answer: "{入力|にゅうりょく}",
  },
  {
    id: `${U.inputOutput}.q-9`,
    unitId: U.inputOutput,
    prompt: "「プリンター」は どっち？",
    explanation:
      "プリンターは かみに けっかを だす ので「{出力|しゅつりょく}」だよ。",
    visual: { kind: "emoji", value: "🖨️", caption: "かみに だす" },
    format: "choice",
    choices: ["{出力|しゅつりょく}", "{入力|にゅうりょく}", "{記憶|きおく}", "でんげん"],
    answer: "{出力|しゅつりょく}",
  },
  {
    id: `${U.inputOutput}.q-10`,
    unitId: U.inputOutput,
    prompt: "ゲームの「コントローラー」は どっち？",
    explanation:
      "コントローラーは ボタンの {命令|めいれい}を いれる ので「{入力|にゅうりょく}」だよ。",
    visual: { kind: "emoji", value: "🎮", caption: "そうさを いれる" },
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}", "{処理|しょり}"],
    answer: "{入力|にゅうりょく}",
  },
  {
    id: `${U.inputOutput}.q-11`,
    unitId: U.inputOutput,
    prompt: "「ヘッドホン」は どっち？",
    explanation:
      "ヘッドホンは {音|おと}を みみに だす ので「{出力|しゅつりょく}」だよ。",
    format: "choice",
    choices: ["{出力|しゅつりょく}", "{入力|にゅうりょく}", "{記憶|きおく}", "でんげん"],
    answer: "{出力|しゅつりょく}",
  },
  {
    id: `${U.inputOutput}.q-12`,
    unitId: U.inputOutput,
    prompt: "いれた {情報|じょうほう}を コンピュータが かんがえる ことを なんと いう？",
    explanation:
      "いれた {情報|じょうほう}を けいさん・かんがえる ことを「{処理|しょり}」と いうよ。",
    visual: { kind: "emoji", value: "🧠", caption: "かんがえる" },
    format: "choice",
    choices: ["{処理|しょり}", "{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}"],
    answer: "{処理|しょり}",
  },
  {
    id: `${U.inputOutput}.q-13`,
    unitId: U.inputOutput,
    prompt: "「{画面|がめん}に {絵|え}を だす」のは {入力|にゅうりょく}と {出力|しゅつりょく}の どっち？",
    explanation:
      "{画面|がめん}に だして {見|み}せる ので「{出力|しゅつりょく}」だよ。",
    format: "choice",
    choices: ["{出力|しゅつりょく}", "{入力|にゅうりょく}", "{記憶|きおく}", "{処理|しょり}"],
    answer: "{出力|しゅつりょく}",
  },
  {
    id: `${U.inputOutput}.q-14`,
    unitId: U.inputOutput,
    prompt: "「キーボードで {名前|なまえ}を うつ」のは どっち？",
    explanation:
      "{文字|もじ}を コンピュータに いれる ので「{入力|にゅうりょく}」だよ。",
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}", "{処理|しょり}"],
    answer: "{入力|にゅうりょく}",
  },
  {
    id: `${U.inputOutput}.q-15`,
    unitId: U.inputOutput,
    prompt: "つぎの うち「{入力|にゅうりょく}そうち」だけ あつめた ものは どれ？",
    explanation:
      "キーボード・マウス・マイクは ぜんぶ いれる どうぐ（{入力|にゅうりょく}）だよ。",
    format: "choice",
    choices: [
      "キーボード・マウス・マイク",
      "{画面|がめん}・プリンター",
      "スピーカー・{画面|がめん}",
      "プリンター・スピーカー",
    ],
    answer: "キーボード・マウス・マイク",
  },
  {
    id: `${U.inputOutput}.q-16`,
    unitId: U.inputOutput,
    prompt: "つぎの うち「{出力|しゅつりょく}そうち」だけ あつめた ものは どれ？",
    explanation:
      "{画面|がめん}・プリンター・スピーカーは ぜんぶ だす どうぐ（{出力|しゅつりょく}）だよ。",
    format: "choice",
    choices: [
      "{画面|がめん}・プリンター・スピーカー",
      "キーボード・マウス",
      "マイク・カメラ",
      "マウス・キーボード",
    ],
    answer: "{画面|がめん}・プリンター・スピーカー",
  },
  {
    id: `${U.inputOutput}.q-17`,
    unitId: U.inputOutput,
    prompt: "カメラで しゃしんを とる とき、コンピュータに なにを いれて いる？",
    explanation:
      "しゃしん＝{絵|え}の {情報|じょうほう}を いれて いるよ。だから カメラは {入力|にゅうりょく}そうちだね。",
    format: "choice",
    choices: ["{絵|え}の {情報|じょうほう}（しゃしん）", "{音|おと}だけ", "でんき だけ", "なにも いれない"],
    answer: "{絵|え}の {情報|じょうほう}（しゃしん）",
  },
  {
    id: `${U.inputOutput}.q-18`,
    unitId: U.inputOutput,
    prompt: "タッチパネルで「{画面|がめん}を {指|ゆび}で さわる」のは {入力|にゅうりょく}・{出力|しゅつりょく} どっち？",
    explanation:
      "さわって {命令|めいれい}を いれる ので「{入力|にゅうりょく}」。{画面|がめん}に だす ところは {出力|しゅつりょく}で、{両方|りょうほう}を もつ どうぐだよ。",
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}", "でんげん"],
    answer: "{入力|にゅうりょく}",
  },
  {
    id: `${U.inputOutput}.q-19`,
    unitId: U.inputOutput,
    prompt: "コンピュータの ながれ「◯ → {処理|しょり} → {出力|しゅつりょく}」の ◯に {入|はい}るのは？",
    explanation:
      "さいしょは「{入力|にゅうりょく}（いれる）」だよ。いれて → かんがえて → だす、の じゅんだね。",
    visual: { kind: "emoji", value: "⌨️➡️🧠➡️🖥️", caption: "いれる→かんがえる→だす" },
    format: "choice",
    choices: ["{入力|にゅうりょく}", "{出力|しゅつりょく}", "{記憶|きおく}", "でんげん"],
    answer: "{入力|にゅうりょく}",
  },
  {
    id: `${U.inputOutput}.q-20`,
    unitId: U.inputOutput,
    prompt: "つぎの うち、コンピュータが「だす（{出力|しゅつりょく}）」もの は どれ？",
    explanation:
      "{画面|がめん}の {絵|え}や スピーカーの {音|おと}は コンピュータが だす もの（{出力|しゅつりょく}）だよ。",
    format: "choice",
    choices: [
      "{画面|がめん}の {絵|え}や {音|おと}",
      "{指|ゆび}の うごき",
      "マイクへの こえ",
      "キーボードで うつ {文字|もじ}",
    ],
    answer: "{画面|がめん}の {絵|え}や {音|おと}",
  },
];

// 3. データと記憶 ───────────────────────────
const dataStorageQuestions: ChoiceQuestion[] = [
  {
    id: `${U.dataStorage}.q-1`,
    unitId: U.dataStorage,
    prompt: "コンピュータは {数|かず}を いくつの しるしで あらわす？",
    explanation:
      "コンピュータは 0 と 1 の 2しゅるい だけで すべての データを あらわすよ。これを「2しんすう」と いうよ。",
    visual: { kind: "emoji", value: "0️⃣1️⃣", caption: "0 と 1" },
    format: "choice",
    choices: ["2しゅるい（0と1）", "10しゅるい", "5しゅるい", "むげん"],
    answer: "2しゅるい（0と1）",
  },
  {
    id: `${U.dataStorage}.q-2`,
    unitId: U.dataStorage,
    prompt: "0 か 1 の いちばん {小|ちい}さい データの たんいを なんと いう？",
    explanation:
      "0 か 1 ひとつぶんを「1ビット」と いうよ。データの いちばん {小|ちい}さな つぶだね。",
    visual: { kind: "emoji", value: "🔘", caption: "1ビット" },
    format: "choice",
    choices: ["ビット", "メートル", "グラム", "リットル"],
    answer: "ビット",
  },
  {
    id: `${U.dataStorage}.q-3`,
    unitId: U.dataStorage,
    prompt: "ビットが 8つ あつまると なんと いう？",
    explanation:
      "8ビットを まとめて「1バイト」と いうよ。{文字|もじ}1つぶんなどに つかう {大|おお}きさだね。",
    visual: { kind: "emoji", value: "🔘×8", caption: "8ビット＝1バイト" },
    format: "choice",
    choices: ["1バイト", "1ビット", "1メガ", "1キロ"],
    answer: "1バイト",
  },
  {
    id: `${U.dataStorage}.q-4`,
    unitId: U.dataStorage,
    prompt: "{写真|しゃしん}や {動画|どうが}を ほぞんして おく ところを なんと いう？",
    explanation:
      "データを おぼえて おく ところを「{記憶|きおく}そうち」と いうよ。USBメモリや SDカードが なかまだね。",
    visual: { kind: "emoji", value: "💾", caption: "{記憶|きおく}そうち" },
    format: "choice",
    choices: ["{記憶|きおく}そうち", "{入力|にゅうりょく}そうち", "スピーカー", "でんげん"],
    answer: "{記憶|きおく}そうち",
  },
  {
    id: `${U.dataStorage}.q-5`,
    unitId: U.dataStorage,
    prompt: "データが {大|おお}きい ほど どう なる？",
    explanation:
      "データが {大|おお}きい ほど ほぞんに ばしょ（{容量|ようりょう}）を つかい、おくるのにも {時間|じかん}が かかるよ。{動画|どうが}は {写真|しゃしん}より ずっと {大|おお}きいよ。",
    visual: { kind: "emoji", value: "🎞️", caption: "{動画|どうが}は {大|おお}きい" },
    format: "choice",
    choices: [
      "ほぞんの ばしょを たくさん つかう",
      "ばしょを つかわなく なる",
      "かならず きえる",
      "{色|いろ}が かわる",
    ],
    answer: "ほぞんの ばしょを たくさん つかう",
  },
  {
    id: `${U.dataStorage}.q-6`,
    unitId: U.dataStorage,
    prompt: "1バイトは なんビット あつまった もの？",
    explanation:
      "ビットが 8つ あつまると「1バイト」だよ。",
    visual: { kind: "emoji", value: "🔘×8", caption: "8ビット＝1バイト" },
    format: "choice",
    choices: ["8ビット", "2ビット", "10ビット", "100ビット"],
    answer: "8ビット",
  },
  {
    id: `${U.dataStorage}.q-7`,
    unitId: U.dataStorage,
    prompt: "つぎの うち データを ほぞんできる ものは どれ？",
    explanation:
      "USBメモリは データを ほぞんできる どうぐだよ。SDカードも なかまだね。",
    visual: { kind: "emoji", value: "💾", caption: "ほぞんできる" },
    format: "choice",
    choices: ["USBメモリ", "えんぴつ", "ものさし", "けしゴム"],
    answer: "USBメモリ",
  },
  {
    id: `${U.dataStorage}.q-8`,
    unitId: U.dataStorage,
    prompt: "{文字|もじ}1つと しゃしん1まい、ふつう データが {大|おお}きいのは どっち？",
    explanation:
      "しゃしんは たくさんの {点|てん}（いろ）で できて いるので、{文字|もじ}1つより ずっと データが {大|おお}きいよ。",
    format: "choice",
    choices: ["しゃしん", "{文字|もじ}1つ", "どちらも 0", "おなじ"],
    answer: "しゃしん",
  },
  {
    id: `${U.dataStorage}.q-9`,
    unitId: U.dataStorage,
    prompt: "しゃしん1まいと {動画|どうが}、ふつう データが {大|おお}きいのは どっち？",
    explanation:
      "{動画|どうが}は たくさんの しゃしんが つながった ものなので、しゃしん1まいより ずっと {大|おお}きいよ。",
    visual: { kind: "emoji", value: "🎞️", caption: "{動画|どうが}は {大|おお}きい" },
    format: "choice",
    choices: ["{動画|どうが}", "しゃしん1まい", "どちらも 0", "くらべられない"],
    answer: "{動画|どうが}",
  },
  {
    id: `${U.dataStorage}.q-10`,
    unitId: U.dataStorage,
    prompt: "コンピュータが すべてを 0と1で あらわす しくみを なんと いう？",
    explanation:
      "0と1の 2つだけで あらわす しくみを「2しんすう」と いうよ。",
    visual: { kind: "emoji", value: "0️⃣1️⃣", caption: "0 と 1" },
    format: "choice",
    choices: ["2しんすう", "10しんすう", "アルゴリズム", "サーバー"],
    answer: "2しんすう",
  },
  {
    id: `${U.dataStorage}.q-11`,
    unitId: U.dataStorage,
    prompt: "SDカードは なにを する ための もの？",
    explanation:
      "SDカードは しゃしんや {動画|どうが}などの データを ほぞんする ための {記憶|きおく}そうちだよ。",
    format: "choice",
    choices: [
      "データを ほぞんする",
      "{音|おと}を だす",
      "{文字|もじ}を いれる",
      "でんきを つくる",
    ],
    answer: "データを ほぞんする",
  },
  {
    id: `${U.dataStorage}.q-12`,
    unitId: U.dataStorage,
    prompt: "データが {大|おお}きい ほど、おくる のに かかる {時間|じかん}は どう なる？",
    explanation:
      "データが {大|おお}きい ほど、おくるのに {時間|じかん}が ながく かかるよ。{動画|どうが}は とくに {大|おお}きいね。",
    format: "choice",
    choices: ["ながく かかる", "みじかく なる", "0に なる", "かわらない"],
    answer: "ながく かかる",
  },
  {
    id: `${U.dataStorage}.q-13`,
    unitId: U.dataStorage,
    prompt: "データの {大|おお}きさは「ビット」と「バイト」、{小|ちい}さいのは どっち？",
    explanation:
      "1ビットが いちばん {小|ちい}さく、8ビット あつまって 1バイト。だから ビットの ほうが {小|ちい}さいよ。",
    format: "choice",
    choices: ["ビット", "バイト", "おなじ", "きめられない"],
    answer: "ビット",
  },
  {
    id: `${U.dataStorage}.q-14`,
    unitId: U.dataStorage,
    prompt: "スマホの ほぞんが いっぱいに なった とき、できる ことは どれ？",
    explanation:
      "いらない しゃしんや アプリを けすと、ほぞんの ばしょ（{容量|ようりょう}）が あくよ。",
    format: "choice",
    choices: [
      "いらない しゃしんを けす",
      "でんげんを ずっと きる",
      "{画面|がめん}を わる",
      "{音|おと}を けす",
    ],
    answer: "いらない しゃしんを けす",
  },
  {
    id: `${U.dataStorage}.q-15`,
    unitId: U.dataStorage,
    prompt: "つぎの うち「データ」と いえる ものは どれ？",
    explanation:
      "しゃしん・{音楽|おんがく}・{文章|ぶんしょう}は コンピュータの {中|なか}の データだよ。つくえや いすは ものだね。",
    format: "choice",
    choices: [
      "しゃしん・{音楽|おんがく}・{文章|ぶんしょう}",
      "つくえ",
      "いす",
      "えんぴつ",
    ],
    answer: "しゃしん・{音楽|おんがく}・{文章|ぶんしょう}",
  },
  {
    id: `${U.dataStorage}.q-16`,
    unitId: U.dataStorage,
    prompt: "0 か 1 の しるし 1つぶんを なんと いう？",
    explanation:
      "0 か 1 ひとつぶんが「1ビット」。データの いちばん {小|ちい}さな つぶだよ。",
    format: "choice",
    choices: ["1ビット", "1バイト", "1ギガ", "1キロ"],
    answer: "1ビット",
  },
  {
    id: `${U.dataStorage}.q-17`,
    unitId: U.dataStorage,
    prompt: "データの {大|おお}きさで、いちばん {大|おお}きいのは どれ？",
    explanation:
      "キロ より メガ、メガ より ギガの ほうが {大|おお}きいよ。1ギガは とても {大|おお}きい たんいだね。",
    format: "choice",
    choices: ["ギガ", "メガ", "キロ", "ぜんぶ おなじ"],
    answer: "ギガ",
  },
  {
    id: `${U.dataStorage}.q-18`,
    unitId: U.dataStorage,
    prompt: "でんげんを きっても データを のこす には どう する？",
    explanation:
      "「ほぞん（セーブ）」して おくと、でんげんを きっても データが きえないよ。",
    visual: { kind: "emoji", value: "💾", caption: "ほぞん（セーブ）" },
    format: "choice",
    choices: [
      "ほぞん（セーブ）する",
      "なにも しない",
      "{音|おと}を だす",
      "{画面|がめん}を けす",
    ],
    answer: "ほぞん（セーブ）する",
  },
  {
    id: `${U.dataStorage}.q-19`,
    unitId: U.dataStorage,
    prompt: "コンピュータは {文字|もじ}や {絵|え}を、なにに かえて おぼえて いる？",
    explanation:
      "コンピュータは すべてを 0と1の {数|かず}に かえて おぼえて いるよ。",
    format: "choice",
    choices: [
      "0と1の {数|かず}",
      "{絵|え}の まま",
      "こえの まま",
      "なにも かえない",
    ],
    answer: "0と1の {数|かず}",
  },
  {
    id: `${U.dataStorage}.q-20`,
    unitId: U.dataStorage,
    prompt: "つぎの {文|ぶん}で {正|ただ}しい のは どれ？",
    explanation:
      "コンピュータは すべての データを 0と1で あらわすよ。これが きほんの しくみだね。",
    format: "choice",
    choices: [
      "コンピュータは 0と1で データを あらわす",
      "コンピュータは {文字|もじ}を そのまま おぼえる",
      "データに {大|おお}きさは ない",
      "{動画|どうが}は しゃしんより {小|ちい}さい",
    ],
    answer: "コンピュータは 0と1で データを あらわす",
  },
];

// 4. インターネットのしくみ ───────────────────────────
const internetQuestions: ChoiceQuestion[] = [
  {
    id: `${U.internet}.q-1`,
    unitId: U.internet,
    prompt: "インターネットとは なに？",
    explanation:
      "せかいじゅうの コンピュータを つないだ {大|おお}きな「あみ（ネットワーク）」だよ。だから {遠|とお}くの {人|ひと}とも つながれるんだ。",
    visual: { kind: "emoji", value: "🌐", caption: "せかいの あみ" },
    format: "choice",
    choices: [
      "せかいじゅうの コンピュータを つないだ しくみ",
      "1だいの コンピュータ",
      "テレビの こと",
      "でんちの しゅるい",
    ],
    answer: "せかいじゅうの コンピュータを つないだ しくみ",
  },
  {
    id: `${U.internet}.q-2`,
    unitId: U.internet,
    prompt: "ホームページや {動画|どうが}を おいて おく コンピュータを なんと いう？",
    explanation:
      "じょうほうを わたす がわの コンピュータを「サーバー」と いうよ。みんなの きかいは うけとる がわだね。",
    visual: { kind: "emoji", value: "🗄️", caption: "サーバー" },
    format: "choice",
    choices: ["サーバー", "マウス", "プリンター", "でんち"],
    answer: "サーバー",
  },
  {
    id: `${U.internet}.q-3`,
    unitId: U.internet,
    prompt: "ケーブルが なくても インターネットに つなげる しくみは どれ？",
    explanation:
      "{電波|でんぱ}で つなぐ しくみを「Wi-Fi（ワイファイ）」と いうよ。{線|せん}が なくても つながるのが べんりだね。",
    visual: { kind: "emoji", value: "📶", caption: "Wi-Fi" },
    format: "choice",
    choices: ["Wi-Fi", "えんぴつ", "じしゃく", "かがみ"],
    answer: "Wi-Fi",
  },
  {
    id: `${U.internet}.q-4`,
    unitId: U.internet,
    prompt: "メッセージを おくると、{相手|あいて}に とどく まで データは どう うごく？",
    explanation:
      "データは {小|ちい}さく わけられ、いくつもの コンピュータを {通|とお}って {相手|あいて}に とどくよ。とちゅうで たすけあって はこぶんだ。",
    visual: { kind: "emoji", value: "✉️➡️🌐➡️📱", caption: "つたって とどく" },
    format: "choice",
    choices: [
      "いくつもの コンピュータを {通|とお}って とどく",
      "そらを とんで そのまま とどく",
      "{手紙|てがみ}で とどく",
      "とどかない",
    ],
    answer: "いくつもの コンピュータを {通|とお}って とどく",
  },
  {
    id: `${U.internet}.q-5`,
    unitId: U.internet,
    prompt: "インターネットで できる ことは どれ？",
    explanation:
      "しらべもの・メッセージ・{動画|どうが}を {見|み}る など、たくさんの ことが できるよ。べんりだけど つかいすぎには {気|き}を つけよう。",
    visual: { kind: "emoji", value: "🔎💬🎬", caption: "いろいろ できる" },
    format: "choice",
    choices: [
      "しらべもの・メッセージ・{動画|どうが}",
      "ごはんを たべる こと",
      "そとで はしる こと",
      "{絵|え}の ぐで かく こと",
    ],
    answer: "しらべもの・メッセージ・{動画|どうが}",
  },
  {
    id: `${U.internet}.q-6`,
    unitId: U.internet,
    prompt: "ホームページを {見|み}る ための アプリを なんと いう？",
    explanation:
      "インターネットの ホームページを {見|み}る アプリを「ブラウザ」と いうよ。",
    visual: { kind: "emoji", value: "🌐", caption: "ブラウザ" },
    format: "choice",
    choices: ["ブラウザ", "プリンター", "マウス", "スピーカー"],
    answer: "ブラウザ",
  },
  {
    id: `${U.internet}.q-7`,
    unitId: U.internet,
    prompt: "しらべたい ことばを {入|い}れて さがす しくみを なんと いう？",
    explanation:
      "ことばを {入|い}れて ホームページを さがす ことを「けんさく」と いうよ。",
    visual: { kind: "emoji", value: "🔎", caption: "けんさく" },
    format: "choice",
    choices: ["けんさく", "ほぞん", "いんさつ", "さいきどう"],
    answer: "けんさく",
  },
  {
    id: `${U.internet}.q-8`,
    unitId: U.internet,
    prompt: "ホームページの ばしょを あらわす もじれつ（https://… など）を なんと いう？",
    explanation:
      "ホームページの ばしょ（じゅうしょ）を あらわす もじれつを「URL（ユーアールエル）」と いうよ。",
    format: "choice",
    choices: ["URL（ユーアールエル）", "バグ", "ビット", "サーバー"],
    answer: "URL（ユーアールエル）",
  },
  {
    id: `${U.internet}.q-9`,
    unitId: U.internet,
    prompt: "ホームページや {動画|どうが}を おいて おく コンピュータを なんと いう？",
    explanation:
      "{情報|じょうほう}を わたす がわの コンピュータを「サーバー」と いうよ。",
    visual: { kind: "emoji", value: "🗄️", caption: "サーバー" },
    format: "choice",
    choices: ["サーバー", "マウス", "プリンター", "でんち"],
    answer: "サーバー",
  },
  {
    id: `${U.internet}.q-10`,
    unitId: U.internet,
    prompt: "ケーブル（{線|せん}）が なくても つなげる しくみを なんと いう？",
    explanation:
      "{電波|でんぱ}で つなぐ しくみを「Wi-Fi（ワイファイ）」と いうよ。",
    visual: { kind: "emoji", value: "📶", caption: "Wi-Fi" },
    format: "choice",
    choices: ["Wi-Fi", "USB", "えんぴつ", "じしゃく"],
    answer: "Wi-Fi",
  },
  {
    id: `${U.internet}.q-11`,
    unitId: U.internet,
    prompt: "メール（メッセージ）で できる ことは どれ？",
    explanation:
      "メールは {文字|もじ}や {写真|しゃしん}を {遠|とお}くの {人|ひと}に おくれるよ。",
    format: "choice",
    choices: [
      "{文字|もじ}や {写真|しゃしん}を おくる",
      "ごはんを やく",
      "そうじを する",
      "でんきを つくる",
    ],
    answer: "{文字|もじ}や {写真|しゃしん}を おくる",
  },
  {
    id: `${U.internet}.q-12`,
    unitId: U.internet,
    prompt: "おくった データは どのように {相手|あいて}に とどく？",
    explanation:
      "データは {小|ちい}さく わけられ、いくつもの コンピュータを {通|とお}って とどくよ。",
    format: "choice",
    choices: [
      "{小|ちい}さく わけて いくつもの コンピュータを {通|とお}って",
      "そらを とんで そのまま",
      "{手紙|てがみ}で",
      "とどかない",
    ],
    answer: "{小|ちい}さく わけて いくつもの コンピュータを {通|とお}って",
  },
  {
    id: `${U.internet}.q-13`,
    unitId: U.internet,
    prompt: "インターネットに つながらない とき、まず たしかめると よいのは どれ？",
    explanation:
      "Wi-Fiや {線|せん}が ちゃんと つながって いるか たしかめると よいよ。",
    format: "choice",
    choices: [
      "Wi-Fiが つながって いるか",
      "{画面|がめん}の {色|いろ}",
      "{音|おと}の {大|おお}きさ",
      "でんちの {色|いろ}",
    ],
    answer: "Wi-Fiが つながって いるか",
  },
  {
    id: `${U.internet}.q-14`,
    unitId: U.internet,
    prompt: "せかいじゅうの コンピュータを つないだ {大|おお}きな しくみを なんと いう？",
    explanation:
      "せかいの コンピュータを つないだ あみを「インターネット」と いうよ。",
    format: "choice",
    choices: ["インターネット", "サーバー", "ブラウザ", "Wi-Fi"],
    answer: "インターネット",
  },
  {
    id: `${U.internet}.q-15`,
    unitId: U.internet,
    prompt: "データを じぶんの きかいでは なく、インターネットの さきの サーバーに ほぞんする しくみを なんと いう？",
    explanation:
      "インターネットの さきの サーバーに ほぞんする しくみを「クラウド」と いうよ。べつの きかいからも {見|み}られるんだ。",
    visual: { kind: "emoji", value: "☁️", caption: "クラウド" },
    format: "choice",
    choices: [
      "クラウド",
      "じぶんの あたまの {中|なか}",
      "つくえの {中|なか}",
      "えんぴつ",
    ],
    answer: "クラウド",
  },
  {
    id: `${U.internet}.q-16`,
    unitId: U.internet,
    prompt: "つぎの うち インターネットで「できない」ことは どれ？",
    explanation:
      "{動画|どうが}を {見|み}る・しらべる・メッセージは できるけど、ごはんを たべるのは じぶんの からだで する ことだね。",
    format: "choice",
    choices: [
      "ごはんを たべる",
      "{動画|どうが}を {見|み}る",
      "しらべものを する",
      "メッセージを おくる",
    ],
    answer: "ごはんを たべる",
  },
  {
    id: `${U.internet}.q-17`,
    unitId: U.internet,
    prompt: "たくさんの {人|ひと}が {見|み}る ホームページの サーバーは、いつ うごいて いる？",
    explanation:
      "みんなが いつ アクセスしても {見|み}られる ように、サーバーは ずっと（24{時間|じかん}）うごいて いるよ。",
    format: "choice",
    choices: ["ずっと うごいて いる", "よるだけ", "ひるだけ", "うごいて いない"],
    answer: "ずっと うごいて いる",
  },
  {
    id: `${U.internet}.q-18`,
    unitId: U.internet,
    prompt: "しらない ホームページの「ここを おして」を むやみに おさない ほうが よい りゆうは？",
    explanation:
      "あぶない ものや うその {情報|じょうほう}が ある かも しれないから、むやみに おさないのが {安全|あんぜん}だよ。",
    format: "choice",
    choices: [
      "あぶない ものが ある かも しれないから",
      "はやく なるから",
      "{音|おと}が でるから",
      "でんちが へるから",
    ],
    answer: "あぶない ものが ある かも しれないから",
  },
  {
    id: `${U.internet}.q-19`,
    unitId: U.internet,
    prompt: "インターネットを つかうのに ひつような しくみは どれ？",
    explanation:
      "インターネットへの つながり（せつぞく）が ないと、ホームページは {見|み}られないよ。",
    format: "choice",
    choices: [
      "インターネットへの つながり",
      "えんぴつ",
      "ものさし",
      "のり",
    ],
    answer: "インターネットへの つながり",
  },
  {
    id: `${U.internet}.q-20`,
    unitId: U.internet,
    prompt: "つぎの {文|ぶん}で {正|ただ}しい のは どれ？",
    explanation:
      "インターネットは せかいじゅうの コンピュータが つながった しくみだよ。1だいの きかいでは ないんだ。",
    format: "choice",
    choices: [
      "せかいじゅうの コンピュータが つながった しくみ",
      "1だいの きかいの こと",
      "テレビと おなじ もの",
      "でんちの しゅるい",
    ],
    answer: "せかいじゅうの コンピュータが つながった しくみ",
  },
];

// 5. 情報モラルと安全 ───────────────────────────
const infoSafetyQuestions: (ChoiceQuestion | MatchingQuestion)[] = [
  {
    id: `${U.infoSafety}.q-1`,
    unitId: U.infoSafety,
    prompt: "よい パスワードの つくりかたは どれ？",
    explanation:
      "じぶんの {名前|なまえ}や たんじょうびは すぐ ばれて しまうよ。あてられにくい ながい パスワードに しよう。",
    visual: { kind: "emoji", value: "🔑", caption: "ひみつの かぎ" },
    format: "choice",
    choices: [
      "あてられにくい ながい ことば",
      "じぶんの {名前|なまえ}",
      "1234",
      "たんじょうび",
    ],
    answer: "あてられにくい ながい ことば",
  },
  {
    id: `${U.infoSafety}.q-2`,
    unitId: U.infoSafety,
    prompt: "ネットに かいては いけない ものは どれ？",
    explanation:
      "じゅうしょ・でんわばんごう・{学校|がっこう}の {名前|なまえ}などの「{個人|こじん}じょうほう」は、しらない {人|ひと}に おしえては だめだよ。",
    visual: { kind: "emoji", value: "🚫🏠", caption: "じゅうしょは ひみつ" },
    format: "choice",
    choices: [
      "じぶんの じゅうしょ",
      "すきな {色|いろ}",
      "すきな どうぶつ",
      "きょうの てんき",
    ],
    answer: "じぶんの じゅうしょ",
  },
  {
    id: `${U.infoSafety}.q-3`,
    unitId: U.infoSafety,
    prompt: "しらない {人|ひと}から「{会|あ}おう」と メッセージが きたら？",
    explanation:
      "しらない {人|ひと}と {会|あ}う やくそくは あぶないよ。すぐに おうちの {人|ひと}に そうだんしよう。",
    visual: { kind: "emoji", value: "🙅", caption: "おとなに そうだん" },
    format: "choice",
    choices: [
      "おうちの {人|ひと}に そうだんする",
      "ひとりで {会|あ}いに いく",
      "じゅうしょを おしえる",
      "{写真|しゃしん}を おくる",
    ],
    answer: "おうちの {人|ひと}に そうだんする",
  },
  {
    id: `${U.infoSafety}.q-4`,
    unitId: U.infoSafety,
    prompt: "メッセージを おくる ときに よい のは どれ？",
    explanation:
      "{相手|あいて}の {顔|かお}が {見|み}えなくても、やさしい ことばで かこう。きつい ことばは {相手|あいて}を かなしく させるよ。",
    visual: { kind: "emoji", value: "😊💬", caption: "やさしい ことば" },
    format: "choice",
    choices: [
      "{相手|あいて}が よろこぶ やさしい ことば",
      "わるぐち",
      "うそ",
      "{大|おお}きな こえで おこる",
    ],
    answer: "{相手|あいて}が よろこぶ やさしい ことば",
  },
  {
    id: `${U.infoSafety}.q-5`,
    unitId: U.infoSafety,
    prompt: "ネットを つかう ときに {正|ただ}しい のは どれ？",
    explanation:
      "つかう {時間|じかん}を きめ、こまったら すぐ おとなに そうだん。これが {安全|あんぜん}に たのしむ こつだよ。",
    format: "matching",
    left: ["パスワード", "{個人|こじん}じょうほう", "こまった とき", "メッセージ"],
    right: ["ひみつに する", "おとなに そうだん", "やさしく かく", "{出|だ}さない"],
    answerPairs: [0, 3, 1, 2],
  },
  {
    id: `${U.infoSafety}.q-6`,
    unitId: U.infoSafety,
    prompt: "パスワードを ともだちに きかれたら どう する？",
    explanation:
      "パスワードは じぶんだけの ひみつ。なかよしの ともだちにも おしえないのが やくそくだよ。",
    visual: { kind: "emoji", value: "🤐", caption: "ひみつ" },
    format: "choice",
    choices: [
      "おしえない（ひみつに する）",
      "すぐ おしえる",
      "こくばんに かく",
      "みんなに いう",
    ],
    answer: "おしえない（ひみつに する）",
  },
  {
    id: `${U.infoSafety}.q-7`,
    unitId: U.infoSafety,
    prompt: "ネットで {見|み}つけた {絵|え}や {写真|しゃしん}は どう あつかう？",
    explanation:
      "{絵|え}や {写真|しゃしん}は つくった {人|ひと}の たいせつな もの。かってに じぶんの ものに しては だめだよ。",
    format: "choice",
    choices: [
      "かってに つかわない",
      "ぜんぶ じぶんの ものに する",
      "うって よい",
      "{名前|なまえ}を けせば つかってよい",
    ],
    answer: "かってに つかわない",
  },
  {
    id: `${U.infoSafety}.q-8`,
    unitId: U.infoSafety,
    prompt: "しらない {人|ひと}から「プレゼントを おくるので じゅうしょを おしえて」と きたら？",
    explanation:
      "しらない {人|ひと}に じゅうしょを おしえては だめ。すぐ おうちの {人|ひと}に そうだんしよう。",
    format: "choice",
    choices: [
      "おしえないで おとなに そうだんする",
      "すぐ おしえる",
      "{学校|がっこう}の {名前|なまえ}を おしえる",
      "{写真|しゃしん}を おくる",
    ],
    answer: "おしえないで おとなに そうだんする",
  },
  {
    id: `${U.infoSafety}.q-9`,
    unitId: U.infoSafety,
    prompt: "ともだちの はずかしい {写真|しゃしん}を かってに みんなに おくっても よい？",
    explanation:
      "{相手|あいて}が いやがる {写真|しゃしん}を かってに ひろめては だめ。{相手|あいて}の きもちを かんがえようね。",
    format: "choice",
    choices: [
      "だめ（おくらない）",
      "おもしろければ よい",
      "ひとりになら よい",
      "みんなに おくる",
    ],
    answer: "だめ（おくらない）",
  },
  {
    id: `${U.infoSafety}.q-10`,
    unitId: U.infoSafety,
    prompt: "ネットに かいて ある {情報|じょうほう}は ぜんぶ {正|ただ}しい？",
    explanation:
      "ネットには まちがいや うそも あるよ。ぜんぶ しんじず、ほかでも たしかめる ことが だいじだね。",
    format: "choice",
    choices: [
      "ぜんぶ {正|ただ}しいとは かぎらない",
      "ぜんぶ {正|ただ}しい",
      "ぜんぶ うそ",
      "かんがえなくて よい",
    ],
    answer: "ぜんぶ {正|ただ}しいとは かぎらない",
  },
  {
    id: `${U.infoSafety}.q-11`,
    unitId: U.infoSafety,
    prompt: "ゲームや {動画|どうが}を ながい {時間|じかん} つづけない ために どう する？",
    explanation:
      "つかう {時間|じかん}を きめて まもると、{目|め}や からだに よくて、ほかの ことも できるよ。",
    visual: { kind: "emoji", value: "⏰", caption: "{時間|じかん}を きめる" },
    format: "choice",
    choices: [
      "つかう {時間|じかん}を きめる",
      "ずっと つづける",
      "よる ねないで する",
      "ごはんを たべないで する",
    ],
    answer: "つかう {時間|じかん}を きめる",
  },
  {
    id: `${U.infoSafety}.q-12`,
    unitId: U.infoSafety,
    prompt: "ともだちが だれかの わるぐちを ネットに かいて いた。どう する？",
    explanation:
      "わるぐちは {人|ひと}を かなしく させるよ。いっしょに しないで、こまったら おとなに そうだんしよう。",
    format: "choice",
    choices: [
      "いっしょに しない",
      "じぶんも かく",
      "みんなに ひろめる",
      "わらう",
    ],
    answer: "いっしょに しない",
  },
  {
    id: `${U.infoSafety}.q-13`,
    unitId: U.infoSafety,
    prompt: "じぶんの {顔|かお}の {写真|しゃしん}を ネットに のせる まえに する ことは？",
    explanation:
      "{写真|しゃしん}は いちど のせると ひろがる ことが あるよ。のせる まえに おうちの {人|ひと}に そうだんしよう。",
    format: "choice",
    choices: [
      "おうちの {人|ひと}に そうだんする",
      "すぐ のせる",
      "じゅうしょも かく",
      "みんなに おくる",
    ],
    answer: "おうちの {人|ひと}に そうだんする",
  },
  {
    id: `${U.infoSafety}.q-14`,
    unitId: U.infoSafety,
    prompt: "しらない ところから きた ファイルや リンクは どう する？",
    explanation:
      "しらない ファイルや リンクには あぶない ものが ある かも。あけずに おとなに そうだんしよう。",
    format: "choice",
    choices: [
      "あけずに おとなに そうだん",
      "すぐ あける",
      "ともだちに おくる",
      "ぜんぶ ほぞんする",
    ],
    answer: "あけずに おとなに そうだん",
  },
  {
    id: `${U.infoSafety}.q-15`,
    unitId: U.infoSafety,
    prompt: "つよい（あんぜんな）パスワードは どんな もの？",
    explanation:
      "あてられにくい ながい ことばが よい パスワード。{名前|なまえ}や たんじょうびは すぐ ばれるよ。",
    format: "choice",
    choices: [
      "あてられにくい ながい もの",
      "じぶんの {名前|なまえ}",
      "1234",
      "たんじょうび",
    ],
    answer: "あてられにくい ながい もの",
  },
  {
    id: `${U.infoSafety}.q-16`,
    unitId: U.infoSafety,
    prompt: "ネットの つかいかたで、ただしい くみあわせに しよう。",
    explanation:
      "パスワードは ひみつ、{個人|こじん}じょうほうは {出|だ}さない、わるぐちは かかない、こまったら そうだん。これが {安全|あんぜん}の きほんだよ。",
    format: "matching",
    left: ["パスワード", "{個人|こじん}じょうほう", "わるぐち", "こまった とき"],
    right: ["ひみつに する", "{出|だ}さない", "かかない", "おとなに そうだん"],
    answerPairs: [0, 1, 2, 3],
  },
  {
    id: `${U.infoSafety}.q-17`,
    unitId: U.infoSafety,
    prompt: "ネットで しらない {人|ひと}に「ともだちに なって {会|あ}おう」と いわれたら？",
    explanation:
      "ネットの しらない {人|ひと}を すぐ しんようせず、かならず おうちの {人|ひと}に そうだんしよう。",
    format: "choice",
    choices: [
      "すぐ しんようせず おとなに そうだん",
      "ひとりで {会|あ}いに いく",
      "じゅうしょを おしえる",
      "{写真|しゃしん}を おくる",
    ],
    answer: "すぐ しんようせず おとなに そうだん",
  },
  {
    id: `${U.infoSafety}.q-18`,
    unitId: U.infoSafety,
    prompt: "ネットの かいものページで「かう」ボタンを かるい きもちで おしても よい？",
    explanation:
      "かいものは おかねが かかるよ。かう まえに かならず おうちの {人|ひと}に きいてからね。",
    format: "choice",
    choices: [
      "おうちの {人|ひと}に きいてから",
      "すきに おして よい",
      "なんども おす",
      "ともだちに おしてもらう",
    ],
    answer: "おうちの {人|ひと}に きいてから",
  },
  {
    id: `${U.infoSafety}.q-19`,
    unitId: U.infoSafety,
    prompt: "ネットで じぶんが いやな ことを されたら どう する？",
    explanation:
      "ひとりで なやまないで、すぐ おうちの {人|ひと}や せんせいに そうだんしよう。",
    format: "choice",
    choices: [
      "ひとりで なやまず おとなに そうだん",
      "がまんして だまって いる",
      "やりかえす",
      "けして わすれる",
    ],
    answer: "ひとりで なやまず おとなに そうだん",
  },
  {
    id: `${U.infoSafety}.q-20`,
    unitId: U.infoSafety,
    prompt: "つぎの うち、やっては いけない のは どれ？",
    explanation:
      "{人|ひと}の わるぐちを かくのは いけない こと。やさしい ことばで つたえようね。",
    format: "choice",
    choices: [
      "{人|ひと}の わるぐちを かく",
      "やさしい ことばを かく",
      "パスワードを ひみつに する",
      "こまったら そうだんする",
    ],
    answer: "{人|ひと}の わるぐちを かく",
  },
];

// 6. 手順とフローチャート ───────────────────────────
const algorithmStepsQuestions: (OrderingQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.algorithmSteps}.q-1`,
    unitId: U.algorithmSteps,
    prompt: "「やる ことを {正|ただ}しい じゅんに ならべた もの」を なんと いう？",
    explanation:
      "もんだいを とく ための「{手順|てじゅん}」を アルゴリズムと いうよ。りょうりの レシピも アルゴリズムの なかまだね。",
    visual: { kind: "emoji", value: "📋", caption: "{手順|てじゅん}" },
    format: "choice",
    choices: ["アルゴリズム", "パスワード", "サーバー", "ビット"],
    answer: "アルゴリズム",
  },
  {
    id: `${U.algorithmSteps}.q-2`,
    unitId: U.algorithmSteps,
    prompt: "「カップラーメンを {作|つく}る」{手順|てじゅん}を {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「ふたを あける → おゆを いれる → 3ぷん まつ → できあがり」。じゅんが ちがうと うまく できないね。",
    format: "ordering",
    items: ["ふたを あける", "おゆを いれる", "3ぷん まつ", "できあがり"],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.algorithmSteps}.q-3`,
    unitId: U.algorithmSteps,
    prompt: "{手順|てじゅん}を {図|ず}に かいて わかりやすく した ものを なんと いう？",
    explanation:
      "{矢印|やじるし}や はこで ながれを あらわした {図|ず}を「フローチャート」と いうよ。{手順|てじゅん}が {一目|ひとめ}で わかるね。",
    visual: { kind: "emoji", value: "🔽", caption: "ながれの {図|ず}" },
    format: "choice",
    choices: ["フローチャート", "カレンダー", "ちず", "グラフ"],
    answer: "フローチャート",
  },
  {
    id: `${U.algorithmSteps}.q-4`,
    unitId: U.algorithmSteps,
    prompt: "「{朝|あさ}の したく」の {手順|てじゅん}を {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「おきる → かおを あらう → きがえる → ごはんを たべる」。まいにちの ことも {手順|てじゅん}で せいりできるよ。",
    format: "ordering",
    items: ["おきる", "かおを あらう", "きがえる", "ごはんを たべる"],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.algorithmSteps}.q-5`,
    unitId: U.algorithmSteps,
    prompt: "{手順|てじゅん}を きちんと きめる よさは どれ？",
    explanation:
      "{手順|てじゅん}が はっきり して いれば、だれが やっても・コンピュータが やっても {同|おな}じ けっかに なるよ。",
    visual: { kind: "emoji", value: "✅", caption: "だれでも {同|おな}じ" },
    format: "choice",
    choices: [
      "だれが やっても {同|おな}じ けっかに なる",
      "まいかい けっかが かわる",
      "おそく なる",
      "むずかしく なる",
    ],
    answer: "だれが やっても {同|おな}じ けっかに なる",
  },
  {
    id: `${U.algorithmSteps}.q-6`,
    unitId: U.algorithmSteps,
    prompt: "りょうりの レシピは なにの なかま？",
    explanation:
      "レシピは やる ことを じゅんに ならべた「アルゴリズム（{手順|てじゅん}）」の なかまだよ。",
    format: "choice",
    choices: ["アルゴリズム（{手順|てじゅん}）", "サーバー", "ビット", "バグ"],
    answer: "アルゴリズム（{手順|てじゅん}）",
  },
  {
    id: `${U.algorithmSteps}.q-7`,
    unitId: U.algorithmSteps,
    prompt: "「{歯|は}を みがく」{手順|てじゅん}を {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「コップに {水|みず} → はブラシに はみがきこ → みがく → {口|くち}を ゆすぐ」。じゅんが だいじだね。",
    format: "ordering",
    items: ["コップに {水|みず}を くむ", "はブラシに はみがきこ", "みがく", "{口|くち}を ゆすぐ"],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.algorithmSteps}.q-8`,
    unitId: U.algorithmSteps,
    prompt: "「もし {雨|あめ}なら かさを もつ」のように、ばあいで わかれる ことを なんと いう？",
    explanation:
      "「もし〜なら」で わかれる ことを「じょうけん（{分岐|ぶんき}）」と いうよ。",
    visual: { kind: "emoji", value: "☔", caption: "もし〜なら" },
    format: "choice",
    choices: ["じょうけん（{分岐|ぶんき}）", "くりかえし", "じゅんじ", "ソート"],
    answer: "じょうけん（{分岐|ぶんき}）",
  },
  {
    id: `${U.algorithmSteps}.q-9`,
    unitId: U.algorithmSteps,
    prompt: "「{同|おな}じ ことを なんども する」を まとめる しくみを なんと いう？",
    explanation:
      "{同|おな}じ ことを まとめて する しくみを「くりかえし（ループ）」と いうよ。",
    visual: { kind: "emoji", value: "🔁", caption: "くりかえし" },
    format: "choice",
    choices: ["くりかえし（ループ）", "じょうけん", "じゅんじ", "バグ"],
    answer: "くりかえし（ループ）",
  },
  {
    id: `${U.algorithmSteps}.q-10`,
    unitId: U.algorithmSteps,
    prompt: "{手順|てじゅん}を {上|うえ}から じゅんばんに する ことを なんと いう？",
    explanation:
      "{上|うえ}から じゅんに 1つずつ する ことを「じゅんじ（じゅんばん）」と いうよ。",
    format: "choice",
    choices: ["じゅんじ（じゅんばん）", "{分岐|ぶんき}", "くりかえし", "バグ"],
    answer: "じゅんじ（じゅんばん）",
  },
  {
    id: `${U.algorithmSteps}.q-11`,
    unitId: U.algorithmSteps,
    prompt: "フローチャートの「やじるし（→）」は なにを あらわす？",
    explanation:
      "やじるしは つぎに すすむ むき（ながれ）を あらわすよ。",
    visual: { kind: "emoji", value: "➡️", caption: "ながれの むき" },
    format: "choice",
    choices: [
      "つぎに すすむ むき（ながれ）",
      "{音|おと}の {大|おお}きさ",
      "{時間|じかん}の ながさ",
      "{色|いろ}",
    ],
    answer: "つぎに すすむ むき（ながれ）",
  },
  {
    id: `${U.algorithmSteps}.q-12`,
    unitId: U.algorithmSteps,
    prompt: "「おにぎりを {作|つく}る」{手順|てじゅん}を {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「ごはんを よういする → しおを つける → にぎる → のりを まく」の じゅんだね。",
    format: "ordering",
    items: ["ごはんを よういする", "しおを つける", "にぎる", "のりを まく"],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.algorithmSteps}.q-13`,
    unitId: U.algorithmSteps,
    prompt: "{手順|てじゅん}が はっきり して いると、だれが やっても どう なる？",
    explanation:
      "{手順|てじゅん}が はっきり して いれば、だれが やっても {同|おな}じ けっかに なるよ。",
    format: "choice",
    choices: [
      "{同|おな}じ けっかに なる",
      "まいかい かわる",
      "できなく なる",
      "おそく なる",
    ],
    answer: "{同|おな}じ けっかに なる",
  },
  {
    id: `${U.algorithmSteps}.q-14`,
    unitId: U.algorithmSteps,
    prompt: "つぎの うち アルゴリズム（{手順|てじゅん}）と いえる ものは どれ？",
    explanation:
      "カレーの レシピは やる ことを じゅんに ならべた {手順|てじゅん}＝アルゴリズムだよ。",
    format: "choice",
    choices: ["カレーの レシピ", "つくえ", "えんぴつ", "いし"],
    answer: "カレーの レシピ",
  },
  {
    id: `${U.algorithmSteps}.q-15`,
    unitId: U.algorithmSteps,
    prompt: "ロボットや コンピュータに しごとを させる には、まず なにが ひつよう？",
    explanation:
      "{正|ただ}しい {手順|てじゅん}（プログラム）が ないと、ロボットは うまく うごけないよ。",
    format: "choice",
    choices: [
      "{正|ただ}しい {手順|てじゅん}",
      "{大|おお}きな こえ",
      "おかし",
      "なにも いらない",
    ],
    answer: "{正|ただ}しい {手順|てじゅん}",
  },
  {
    id: `${U.algorithmSteps}.q-16`,
    unitId: U.algorithmSteps,
    prompt: "「もし はれなら そとで あそぶ、ちがえば {中|なか}で あそぶ」これは なに？",
    explanation:
      "ばあいに よって うごきを かえて いるので「じょうけん（{分岐|ぶんき}）」だよ。",
    format: "choice",
    choices: ["じょうけん（{分岐|ぶんき}）", "くりかえし", "じゅんじ", "ソート"],
    answer: "じょうけん（{分岐|ぶんき}）",
  },
  {
    id: `${U.algorithmSteps}.q-17`,
    unitId: U.algorithmSteps,
    prompt: "{手順|てじゅん}を {図|ず}（フローチャート）に する よさは どれ？",
    explanation:
      "{図|ず}に すると ながれが {一目|ひとめ}で わかり、ほかの {人|ひと}にも つたえやすいよ。",
    format: "choice",
    choices: [
      "ながれが {一目|ひとめ}で わかる",
      "おもく なる",
      "むずかしく なる",
      "おそく なる",
    ],
    answer: "ながれが {一目|ひとめ}で わかる",
  },
  {
    id: `${U.algorithmSteps}.q-18`,
    unitId: U.algorithmSteps,
    prompt: "ゲームの「スタート → あそぶ → おわり」で、いちばん さいしょに くるのは？",
    explanation:
      "さいしょは「スタート」だね。{手順|てじゅん}には はじめと おわりが あるよ。",
    format: "choice",
    choices: ["スタート", "あそぶ", "おわり", "じょうけん"],
    answer: "スタート",
  },
  {
    id: `${U.algorithmSteps}.q-19`,
    unitId: U.algorithmSteps,
    prompt: "「{朝|あさ}の したく」を {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「おきる → かおを あらう → ふくを きる → {学校|がっこう}へ いく」の じゅんだね。",
    format: "ordering",
    items: ["おきる", "かおを あらう", "ふくを きる", "{学校|がっこう}へ いく"],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.algorithmSteps}.q-20`,
    unitId: U.algorithmSteps,
    prompt: "{手順|てじゅん}（じゅんばん）を まちがえると どう なる？",
    explanation:
      "じゅんが ちがうと、おもった けっかに ならない ことが あるよ。だから じゅんが だいじなんだ。",
    format: "choice",
    choices: [
      "おもった けっかに ならない ことが ある",
      "かならず うまく いく",
      "はやく なる",
      "なにも かわらない",
    ],
    answer: "おもった けっかに ならない ことが ある",
  },
];

// 7. ならべかえとさがす（効率） ───────────────────────────
const sortSearchQuestions: (OrderingQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.sortSearch}.q-1`,
    unitId: U.sortSearch,
    prompt: "5, 1, 3, 2, 4 を {小|ちい}さい じゅんに ならべよう。",
    explanation:
      "{小|ちい}さい じゅんは 1, 2, 3, 4, 5。データを じゅんに ならべる ことを「ソート（ならべかえ）」と いうよ。",
    format: "ordering",
    items: ["5", "1", "3", "2", "4"],
    answerOrder: [1, 3, 2, 4, 0],
  },
  {
    id: `${U.sortSearch}.q-2`,
    unitId: U.sortSearch,
    prompt: "{本|ほん}を {番号|ばんごう}じゅんに ならべて おくと、どんな よさが ある？",
    explanation:
      "じゅんに ならんで いれば、{目|め}あての {本|ほん}を はやく さがせるよ。ばらばらだと さがすのに {時間|じかん}が かかるね。",
    visual: { kind: "emoji", value: "📚", caption: "じゅんに ならべる" },
    format: "choice",
    choices: [
      "はやく さがせる",
      "さがしにくく なる",
      "{本|ほん}が ふえる",
      "{重|おも}く なる",
    ],
    answer: "はやく さがせる",
  },
  {
    id: `${U.sortSearch}.q-3`,
    unitId: U.sortSearch,
    prompt: "1〜100の カードから「50」を さがすとき、はやい さがしかたは？",
    explanation:
      "じゅんに ならんで いれば、まん{中|なか}を {見|み}て「もっと {大|おお}きい？{小|ちい}さい？」と はんぶんずつ へらすと はやく {見|み}つかるよ。",
    visual: { kind: "emoji", value: "🔍", caption: "はんぶんずつ" },
    format: "choice",
    choices: [
      "まん{中|なか}を {見|み}て はんぶんずつ さがす",
      "1から じゅんに ぜんぶ {見|み}る",
      "100から じゅんに ぜんぶ {見|み}る",
      "てきとうに めくる",
    ],
    answer: "まん{中|なか}を {見|み}て はんぶんずつ さがす",
  },
  {
    id: `${U.sortSearch}.q-4`,
    unitId: U.sortSearch,
    prompt: "おなじ こたえでも、ステップが {少|すく}ない {手順|てじゅん}は どう いえる？",
    explanation:
      "やる ことが {少|すく}ない ほど はやく おわるね。これを「{効率|こうりつ}が よい」と いうよ。",
    visual: { kind: "emoji", value: "⚡", caption: "はやい {手順|てじゅん}" },
    format: "choice",
    choices: [
      "{効率|こうりつ}が よい",
      "{効率|こうりつ}が わるい",
      "まちがって いる",
      "つかえない",
    ],
    answer: "{効率|こうりつ}が よい",
  },
  {
    id: `${U.sortSearch}.q-5`,
    unitId: U.sortSearch,
    prompt: "3, 9, 1, 7 を {大|おお}きい じゅんに ならべよう。",
    explanation:
      "{大|おお}きい じゅんは 9, 7, 3, 1。「{大|おお}きい じゅん」と「{小|ちい}さい じゅん」を まちがえないように しよう。",
    format: "ordering",
    items: ["3", "9", "1", "7"],
    answerOrder: [1, 3, 0, 2],
  },
  {
    id: `${U.sortSearch}.q-6`,
    unitId: U.sortSearch,
    prompt: "データを じゅんに ならべる ことを なんと いう？",
    explanation:
      "{小|ちい}さい じゅんや {大|おお}きい じゅんに ならべる ことを「ソート（ならべかえ）」と いうよ。",
    format: "choice",
    choices: ["ソート（ならべかえ）", "バグ", "サーバー", "ループ"],
    answer: "ソート（ならべかえ）",
  },
  {
    id: `${U.sortSearch}.q-7`,
    unitId: U.sortSearch,
    prompt: "2, 8, 5, 1 を {小|ちい}さい じゅんに ならべよう。",
    explanation:
      "{小|ちい}さい じゅんは 1, 2, 5, 8 だね。",
    format: "ordering",
    items: ["2", "8", "5", "1"],
    answerOrder: [3, 0, 2, 1],
  },
  {
    id: `${U.sortSearch}.q-8`,
    unitId: U.sortSearch,
    prompt: "6, 4, 9, 2 を {大|おお}きい じゅんに ならべよう。",
    explanation:
      "{大|おお}きい じゅんは 9, 6, 4, 2 だね。",
    format: "ordering",
    items: ["6", "4", "9", "2"],
    answerOrder: [2, 0, 1, 3],
  },
  {
    id: `${U.sortSearch}.q-9`,
    unitId: U.sortSearch,
    prompt: "1〜100で まん{中|なか}の 50を {見|み}て「もっと {大|おお}きい」と わかった。つぎは どこを さがす？",
    explanation:
      "50より {大|おお}きい ので、つぎは 51〜100を さがすよ。はんぶんに へらせるんだ。",
    visual: { kind: "emoji", value: "🔍", caption: "はんぶんに へらす" },
    format: "choice",
    choices: ["51〜100", "1〜49", "1〜10", "ぜんぶ もう{一|いち}ど"],
    answer: "51〜100",
  },
  {
    id: `${U.sortSearch}.q-10`,
    unitId: U.sortSearch,
    prompt: "ならんで いない データから {目|め}あての ものを さがす ときは、どう する？",
    explanation:
      "ばらばらの ときは、はじめから 1つずつ じゅんに {見|み}て さがす しか ないよ。だから ならべて おくと はやいんだ。",
    format: "choice",
    choices: [
      "はじめから 1つずつ さがす",
      "まん{中|なか}だけ {見|み}る",
      "さいごだけ {見|み}る",
      "さがさない",
    ],
    answer: "はじめから 1つずつ さがす",
  },
  {
    id: `${U.sortSearch}.q-11`,
    unitId: U.sortSearch,
    prompt: "クラスの {名簿|めいぼ}を あいうえおじゅんに ならべる よさは どれ？",
    explanation:
      "じゅんに ならんで いれば、{目|め}あての {名前|なまえ}を はやく さがせるよ。",
    format: "choice",
    choices: [
      "さがしやすく なる",
      "さがしにくく なる",
      "{人|ひと}が ふえる",
      "{重|おも}く なる",
    ],
    answer: "さがしやすく なる",
  },
  {
    id: `${U.sortSearch}.q-12`,
    unitId: U.sortSearch,
    prompt: "おなじ こたえでも、ステップが {少|すく}ない {手順|てじゅん}を なんと いう？",
    explanation:
      "やる ことが {少|すく}なく はやく おわる {手順|てじゅん}を「{効率|こうりつ}が よい」と いうよ。",
    visual: { kind: "emoji", value: "⚡", caption: "はやい {手順|てじゅん}" },
    format: "choice",
    choices: [
      "{効率|こうりつ}が よい",
      "{効率|こうりつ}が わるい",
      "まちがって いる",
      "つかえない",
    ],
    answer: "{効率|こうりつ}が よい",
  },
  {
    id: `${U.sortSearch}.q-13`,
    unitId: U.sortSearch,
    prompt: "7, 3, 5 を {小|ちい}さい じゅんに ならべよう。",
    explanation:
      "{小|ちい}さい じゅんは 3, 5, 7 だね。",
    format: "ordering",
    items: ["7", "3", "5"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.sortSearch}.q-14`,
    unitId: U.sortSearch,
    prompt: "じしょ（ことばの {本|ほん}）で ことばが はやく ひける のは なぜ？",
    explanation:
      "じしょは あいうえおじゅんに ならんで いるので、{目|め}あての ことばを はやく さがせるんだ。",
    format: "choice",
    choices: [
      "あいうえおじゅんに ならんで いるから",
      "ばらばらだから",
      "{絵|え}が あるから",
      "{重|おも}いから",
    ],
    answer: "あいうえおじゅんに ならんで いるから",
  },
  {
    id: `${U.sortSearch}.q-15`,
    unitId: U.sortSearch,
    prompt: "トランプを {数|かず}の じゅんに ならべる ことを なんと いう？",
    explanation:
      "{数|かず}の じゅんに ならべる ことも「ソート（ならべかえ）」だよ。",
    format: "choice",
    choices: ["ソート（ならべかえ）", "けんさく", "バグ", "ループ"],
    answer: "ソート（ならべかえ）",
  },
  {
    id: `${U.sortSearch}.q-16`,
    unitId: U.sortSearch,
    prompt: "100まいの カードを ばらばらの まま さがすと、ならべて さがすより どう なる？",
    explanation:
      "ばらばらだと 1まいずつ {見|み}る ことに なり、{時間|じかん}が かかるよ。ならべて おくと はやいね。",
    format: "choice",
    choices: [
      "{時間|じかん}が かかる",
      "はやく なる",
      "かわらない",
      "さがせる ように なる",
    ],
    answer: "{時間|じかん}が かかる",
  },
  {
    id: `${U.sortSearch}.q-17`,
    unitId: U.sortSearch,
    prompt: "10, 1, 100 を {大|おお}きい じゅんに ならべよう。",
    explanation:
      "{大|おお}きい じゅんは 100, 10, 1 だね。",
    format: "ordering",
    items: ["10", "1", "100"],
    answerOrder: [2, 0, 1],
  },
  {
    id: `${U.sortSearch}.q-18`,
    unitId: U.sortSearch,
    prompt: "としょかんの {本|ほん}に {番号|ばんごう}が ついて いる りゆうは どれ？",
    explanation:
      "{番号|ばんごう}じゅんに ならべて おくと、{目|め}あての {本|ほん}を はやく さがせるからだよ。",
    format: "choice",
    choices: [
      "はやく さがせる ように する ため",
      "{本|ほん}を {重|おも}く する ため",
      "{色|いろ}を つける ため",
      "いみは ない",
    ],
    answer: "はやく さがせる ように する ため",
  },
  {
    id: `${U.sortSearch}.q-19`,
    unitId: U.sortSearch,
    prompt: "おなじ こたえに なる 2つの やりかた。よい のは どっち？",
    explanation:
      "ステップが {少|すく}なく はやく おわる ほう（{効率|こうりつ}が よい）が べんりだよ。",
    format: "choice",
    choices: [
      "はやく おわる ほう",
      "おそく おわる ほう",
      "どちらも だめ",
      "きめられない",
    ],
    answer: "はやく おわる ほう",
  },
  {
    id: `${U.sortSearch}.q-20`,
    unitId: U.sortSearch,
    prompt: "つぎの {文|ぶん}で {正|ただ}しい のは どれ？",
    explanation:
      "じゅんに ならべて おくと、{目|め}あての ものを はやく さがせるよ。",
    format: "choice",
    choices: [
      "ならべて おくと はやく さがせる",
      "ばらばらの ほうが はやい",
      "ならべると さがせなく なる",
      "じゅんは かんけいない",
    ],
    answer: "ならべて おくと はやく さがせる",
  },
];

// 8. ブロックで うごかす ───────────────────────────
const blockProgrammingQuestions: (OrderingQuestion | ChoiceQuestion)[] = [
  {
    id: `${U.blockProgramming}.q-1`,
    unitId: U.blockProgramming,
    prompt: "コンピュータに させたい ことを かいた しじを なんと いう？",
    explanation:
      "コンピュータへの しじの あつまりを「プログラム」と いうよ。プログラムを つくる ことが プログラミングだね。",
    visual: { kind: "emoji", value: "🧩", caption: "しじの あつまり" },
    format: "choice",
    choices: ["プログラム", "サーバー", "パスワード", "ビット"],
    answer: "プログラム",
  },
  {
    id: `${U.blockProgramming}.q-2`,
    unitId: U.blockProgramming,
    prompt: "ブロックを「うえから じゅんに」つむと、どう うごく？",
    explanation:
      "プログラムは うえから したへ じゅんばんに 1つずつ {実|じっ}こうされるよ。これを「じゅんじ（じゅんばん）」と いうよ。",
    visual: { kind: "emoji", value: "⬇️", caption: "うえから じゅんに" },
    format: "choice",
    choices: [
      "うえから したへ じゅんばんに",
      "したから うえへ",
      "ばらばらに",
      "うごかない",
    ],
    answer: "うえから したへ じゅんばんに",
  },
  {
    id: `${U.blockProgramming}.q-3`,
    unitId: U.blockProgramming,
    prompt:
      "ネコを「{右|みぎ}に すすむ → ジャンプ → ニャーと なく」と うごかす ブロックの じゅんは？",
    explanation:
      "ならべた じゅんに 1つずつ うごくよ。「{右|みぎ}に すすむ → ジャンプ → なく」の じゅんで {実|じっ}こうされるね。",
    format: "ordering",
    items: ["{右|みぎ}に すすむ", "ジャンプ", "ニャーと なく"],
    answerOrder: [0, 1, 2],
  },
  {
    id: `${U.blockProgramming}.q-4`,
    unitId: U.blockProgramming,
    prompt: "ブロックプログラミングの よい ところは どれ？",
    explanation:
      "ブロックを はめこむ だけなので、{文字|もじ}を まちがえず くみたてられるよ。はじめての プログラミングに ぴったりだね。",
    visual: { kind: "emoji", value: "🧱", caption: "はめこむ だけ" },
    format: "choice",
    choices: [
      "{文字|もじ}を まちがえず くみたてられる",
      "でんきが いらない",
      "インターネットが はやく なる",
      "{絵|え}が じょうずに なる",
    ],
    answer: "{文字|もじ}を まちがえず くみたてられる",
  },
  {
    id: `${U.blockProgramming}.q-5`,
    unitId: U.blockProgramming,
    prompt: "プログラムの とおりに キャラクターが うごくのは なぜ？",
    explanation:
      "コンピュータは かかれた しじを その とおりに {実|じっ}こうするよ。だから しじが ちがえば うごきも かわるんだ。",
    visual: { kind: "emoji", value: "🤖", caption: "しじの とおり" },
    format: "choice",
    choices: [
      "しじ（プログラム）の とおりに うごくから",
      "きもちで うごくから",
      "ぐうぜん うごくから",
      "{人|ひと}が おして いるから",
    ],
    answer: "しじ（プログラム）の とおりに うごくから",
  },
  {
    id: `${U.blockProgramming}.q-6`,
    unitId: U.blockProgramming,
    prompt: "ブロックを はめこんで プログラムを つくる やりかたを なんと いう？",
    explanation:
      "ブロックを はめこんで くみたてる やりかたを「ブロックプログラミング」と いうよ。",
    visual: { kind: "emoji", value: "🧱", caption: "ブロックを はめこむ" },
    format: "choice",
    choices: ["ブロックプログラミング", "けんさく", "ソート", "デバッグ"],
    answer: "ブロックプログラミング",
  },
  {
    id: `${U.blockProgramming}.q-7`,
    unitId: U.blockProgramming,
    prompt: "つみあげた ブロックは どの じゅんに じっこうされる？",
    explanation:
      "プログラムは {上|うえ}から {下|した}へ じゅんばんに 1つずつ じっこうされるよ。",
    visual: { kind: "emoji", value: "⬇️", caption: "{上|うえ}から {下|した}へ" },
    format: "choice",
    choices: [
      "{上|うえ}から {下|した}へ じゅんに",
      "{下|した}から {上|うえ}へ",
      "ばらばらに",
      "うごかない",
    ],
    answer: "{上|うえ}から {下|した}へ じゅんに",
  },
  {
    id: `${U.blockProgramming}.q-8`,
    unitId: U.blockProgramming,
    prompt: "ネコを「すすむ → まわる → すすむ」と うごかす ブロックの じゅんは？",
    explanation:
      "ならべた じゅんに 1つずつ うごくよ。「すすむ → まわる → すすむ」の じゅんだね。",
    format: "ordering",
    items: ["すすむ", "まわる", "すすむ"],
    answerOrder: [0, 1, 2],
  },
  {
    id: `${U.blockProgramming}.q-9`,
    unitId: U.blockProgramming,
    prompt: "ブロックプログラミングで {文字|もじ}の うちまちがいが おきにくい のは なぜ？",
    explanation:
      "ブロックを えらんで はめこむ だけなので、{文字|もじ}を うちまちがえないんだ。",
    format: "choice",
    choices: [
      "ブロックを はめこむ だけだから",
      "でんきが いらないから",
      "{画面|がめん}が {大|おお}きいから",
      "{音|おと}が でるから",
    ],
    answer: "ブロックを はめこむ だけだから",
  },
  {
    id: `${U.blockProgramming}.q-10`,
    unitId: U.blockProgramming,
    prompt: "キャラクターを {右|みぎ}に 3ぽ うごかしたい。どの ブロックを つかう？",
    explanation:
      "「{右|みぎ}に すすむ」ブロックを つかうと、キャラクターが {右|みぎ}へ うごくよ。",
    format: "choice",
    choices: [
      "「{右|みぎ}に すすむ」ブロック",
      "「{音|おと}を ならす」ブロック",
      "「いろを かえる」ブロック",
      "「とまる」ブロック",
    ],
    answer: "「{右|みぎ}に すすむ」ブロック",
  },
  {
    id: `${U.blockProgramming}.q-11`,
    unitId: U.blockProgramming,
    prompt: "プログラムの とおりに キャラクターが うごく のは なぜ？",
    explanation:
      "コンピュータは かかれた しじを その とおりに じっこうするからだよ。",
    format: "choice",
    choices: [
      "かかれた しじの とおりに うごくから",
      "きもちで うごくから",
      "ぐうぜん うごくから",
      "{人|ひと}が おすから",
    ],
    answer: "かかれた しじの とおりに うごくから",
  },
  {
    id: `${U.blockProgramming}.q-12`,
    unitId: U.blockProgramming,
    prompt: "ブロックの じゅんばんを いれかえると、うごきは どう なる？",
    explanation:
      "じゅんが かわると うごきも かわるよ。だから ならべる じゅんが だいじなんだ。",
    format: "choice",
    choices: ["かわる", "かわらない", "とまる", "きえる"],
    answer: "かわる",
  },
  {
    id: `${U.blockProgramming}.q-13`,
    unitId: U.blockProgramming,
    prompt: "「10ぽ すすむ」ブロックを 1つ おくと、キャラクターは どう うごく？",
    explanation:
      "「10ぽ すすむ」と かいた とおり、10ぽ すすむよ。",
    format: "choice",
    choices: ["10ぽ すすむ", "うごかない", "1ぽ すすむ", "もどる"],
    answer: "10ぽ すすむ",
  },
  {
    id: `${U.blockProgramming}.q-14`,
    unitId: U.blockProgramming,
    prompt: "ゲームや ロボットを じぶんで {作|つく}る さいしょの {一歩|いっぽ}に なるのは どれ？",
    explanation:
      "プログラミングを おぼえると、ゲームや ロボットを じぶんで {作|つく}れる ように なるよ。",
    format: "choice",
    choices: ["プログラミング", "そうじ", "けんさく", "いんさつ"],
    answer: "プログラミング",
  },
  {
    id: `${U.blockProgramming}.q-15`,
    unitId: U.blockProgramming,
    prompt: "「{音|おと}を ならす」ブロックを じっこうすると どう なる？",
    explanation:
      "かいた しじの とおり、{音|おと}が なるよ。",
    format: "choice",
    choices: ["{音|おと}が なる", "{画面|がめん}が きえる", "とまる", "もどる"],
    answer: "{音|おと}が なる",
  },
  {
    id: `${U.blockProgramming}.q-16`,
    unitId: U.blockProgramming,
    prompt: "ブロックを なにも つなげない と、キャラクターは どう なる？",
    explanation:
      "しじが ないので、キャラクターは うごかないよ。",
    format: "choice",
    choices: ["うごかない", "かってに うごく", "きえる", "ふえる"],
    answer: "うごかない",
  },
  {
    id: `${U.blockProgramming}.q-17`,
    unitId: U.blockProgramming,
    prompt: "「すすむ → ジャンプ → なく」を ぎゃくの じゅんに したら、さいしょに する のは？",
    explanation:
      "ぎゃくに すると「なく → ジャンプ → すすむ」。さいしょは「なく」に なるね。",
    format: "choice",
    choices: ["なく", "すすむ", "ジャンプ", "とまる"],
    answer: "なく",
  },
  {
    id: `${U.blockProgramming}.q-18`,
    unitId: U.blockProgramming,
    prompt: "コンピュータに させたい ことを かいた しじの あつまりを なんと いう？",
    explanation:
      "しじの あつまりを「プログラム」と いうよ。",
    format: "choice",
    choices: ["プログラム", "サーバー", "ビット", "バグ"],
    answer: "プログラム",
  },
  {
    id: `${U.blockProgramming}.q-19`,
    unitId: U.blockProgramming,
    prompt: "「ジャンプ → まえに すすむ → とまる」の じゅんに ブロックを ならべよう。",
    explanation:
      "ならべた じゅんに うごくよ。「ジャンプ → まえに すすむ → とまる」の じゅんだね。",
    format: "ordering",
    items: ["ジャンプ", "まえに すすむ", "とまる"],
    answerOrder: [0, 1, 2],
  },
  {
    id: `${U.blockProgramming}.q-20`,
    unitId: U.blockProgramming,
    prompt: "プログラミングで だいじな ことは どれ？",
    explanation:
      "しじを {正|ただ}しい じゅんで ならべる ことが だいじだよ。じゅんが ちがうと おもった ように うごかないんだ。",
    format: "choice",
    choices: [
      "しじを {正|ただ}しい じゅんで ならべる",
      "てきとうに ならべる",
      "{大|おお}きな こえを だす",
      "はやく うごく",
    ],
    answer: "しじを {正|ただ}しい じゅんで ならべる",
  },
];

// 9. 変数とくりかえし・じょうけん ───────────────────────────
const variablesLoopsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.variablesLoops}.q-1`,
    unitId: U.variablesLoops,
    prompt: "とくてんなど、かわる {数|かず}を おぼえて おく いれものを なんと いう？",
    explanation:
      "あたいを {入|い}れて おぼえる いれものを「{変数|へんすう}」と いうよ。とくてんや のこり{回数|かいすう}を おぼえるのに つかうね。",
    visual: { kind: "emoji", value: "📦", caption: "あたいの いれもの" },
    format: "choice",
    choices: ["{変数|へんすう}", "プリンター", "サーバー", "マウス"],
    answer: "{変数|へんすう}",
  },
  {
    id: `${U.variablesLoops}.q-2`,
    unitId: U.variablesLoops,
    prompt: "「{同|おな}じ うごきを 10かい する」とき べんりな しくみは どれ？",
    explanation:
      "{同|おな}じ しじを なんども {書|か}かずに すむ「くりかえし（ループ）」を つかうと、みじかく かけて わかりやすいよ。",
    visual: { kind: "emoji", value: "🔁", caption: "くりかえし" },
    format: "choice",
    choices: ["くりかえし（ループ）", "{変数|へんすう}", "{入力|にゅうりょく}", "サーバー"],
    answer: "くりかえし（ループ）",
  },
  {
    id: `${U.variablesLoops}.q-3`,
    unitId: U.variablesLoops,
    prompt: "「もし ボタンが おされたら {音|おと}を ならす」のような しくみを なんと いう？",
    explanation:
      "「もし〜なら」で うごきを えらぶ しくみを「じょうけん（{分岐|ぶんき}）」と いうよ。ばあいに よって うごきを かえられるね。",
    visual: { kind: "emoji", value: "❓", caption: "もし〜なら" },
    format: "choice",
    choices: [
      "じょうけん（{分岐|ぶんき}）",
      "くりかえし",
      "{記憶|きおく}そうち",
      "{出力|しゅつりょく}",
    ],
    answer: "じょうけん（{分岐|ぶんき}）",
  },
  {
    id: `${U.variablesLoops}.q-4`,
    unitId: U.variablesLoops,
    prompt:
      "とくてんの {変数|へんすう}が 0 で、リンゴを 3こ とった。とくてんは いくつ？",
    explanation:
      "リンゴを とる たびに とくてんに 1を たすと、0 → 1 → 2 → 3。{変数|へんすう}の あたいは かわって いくよ。",
    visual: { kind: "emoji", value: "🍎🍎🍎", caption: "0 ＋ 3" },
    format: "choice",
    choices: ["3", "0", "1", "10"],
    answer: "3",
  },
  {
    id: `${U.variablesLoops}.q-5`,
    unitId: U.variablesLoops,
    prompt: "「☆を かく」を 4かい くりかえすと、☆は いくつ かける？",
    explanation:
      "くりかえす {回数|かいすう}ぶん {実|じっ}こうされるよ。4かい くりかえせば ☆は 4つ かけるね。",
    visual: { kind: "emoji", value: "⭐⭐⭐⭐", caption: "4かい くりかえし" },
    format: "choice",
    choices: ["4つ", "1つ", "8つ", "0こ"],
    answer: "4つ",
  },
  {
    id: `${U.variablesLoops}.q-6`,
    unitId: U.variablesLoops,
    prompt: "「☆を かく」を 5かい くりかえすと、☆は いくつ かける？",
    explanation:
      "くりかえす {回数|かいすう}ぶん かけるよ。5かいなら ☆は 5つだね。",
    visual: { kind: "emoji", value: "⭐⭐⭐⭐⭐", caption: "5かい" },
    format: "choice",
    choices: ["5つ", "1つ", "10こ", "0こ"],
    answer: "5つ",
  },
  {
    id: `${U.variablesLoops}.q-7`,
    unitId: U.variablesLoops,
    prompt: "とくてんの {変数|へんすう}が 2。そこに 3てん ふえると いくつ？",
    explanation:
      "2 に 3を たすと 5。{変数|へんすう}の あたいは かわって いくよ。",
    visual: { kind: "emoji", value: "🔢", caption: "2 ＋ 3" },
    format: "choice",
    choices: ["5", "2", "3", "6"],
    answer: "5",
  },
  {
    id: `${U.variablesLoops}.q-8`,
    unitId: U.variablesLoops,
    prompt: "とくてんの {変数|へんすう}が 10。そこから 4てん へると いくつ？",
    explanation:
      "10 から 4を ひくと 6だね。",
    format: "choice",
    choices: ["6", "14", "4", "10"],
    answer: "6",
  },
  {
    id: `${U.variablesLoops}.q-9`,
    unitId: U.variablesLoops,
    prompt: "「もし 100てん なら はなまるを だす」のような しくみを なんと いう？",
    explanation:
      "「もし〜なら」で うごきを えらぶ しくみを「じょうけん」と いうよ。",
    visual: { kind: "emoji", value: "❓", caption: "もし〜なら" },
    format: "choice",
    choices: ["じょうけん", "くりかえし", "{変数|へんすう}", "ソート"],
    answer: "じょうけん",
  },
  {
    id: `${U.variablesLoops}.q-10`,
    unitId: U.variablesLoops,
    prompt: "「{同|おな}じ うごきを なんども する」しくみを なんと いう？",
    explanation:
      "{同|おな}じ うごきを まとめて する しくみを「くりかえし（ループ）」と いうよ。",
    visual: { kind: "emoji", value: "🔁", caption: "くりかえし" },
    format: "choice",
    choices: ["くりかえし", "じょうけん", "{変数|へんすう}", "デバッグ"],
    answer: "くりかえし",
  },
  {
    id: `${U.variablesLoops}.q-11`,
    unitId: U.variablesLoops,
    prompt: "とくてんなど、かわる {数|かず}を おぼえて おく いれものを なんと いう？",
    explanation:
      "あたいを おぼえて おく いれものを「{変数|へんすう}」と いうよ。",
    visual: { kind: "emoji", value: "📦", caption: "あたいの いれもの" },
    format: "choice",
    choices: ["{変数|へんすう}", "くりかえし", "じょうけん", "サーバー"],
    answer: "{変数|へんすう}",
  },
  {
    id: `${U.variablesLoops}.q-12`,
    unitId: U.variablesLoops,
    prompt: "くりかえしを つかう よさは どれ？",
    explanation:
      "{同|おな}じ しじを なんども {書|か}かずに すむ ので、みじかく わかりやすく かけるよ。",
    format: "choice",
    choices: [
      "みじかく かける",
      "ながく なる",
      "うごかなく なる",
      "むずかしく なる",
    ],
    answer: "みじかく かける",
  },
  {
    id: `${U.variablesLoops}.q-13`,
    unitId: U.variablesLoops,
    prompt: "{変数|へんすう}「のこり」が 5。1つ つかうと いくつに なる？",
    explanation:
      "5 から 1 つかうと、のこりは 4だね。{変数|へんすう}の あたいは かわるよ。",
    format: "choice",
    choices: ["4", "5", "6", "1"],
    answer: "4",
  },
  {
    id: `${U.variablesLoops}.q-14`,
    unitId: U.variablesLoops,
    prompt: "「ボタンを おしたら {音|おと}を ならす」これは くりかえし？ じょうけん？",
    explanation:
      "「もし おされたら」で うごきが きまる ので「じょうけん」だよ。",
    format: "choice",
    choices: ["じょうけん", "くりかえし", "{変数|へんすう}", "{入力|にゅうりょく}"],
    answer: "じょうけん",
  },
  {
    id: `${U.variablesLoops}.q-15`,
    unitId: U.variablesLoops,
    prompt: "「ジャンプ」を 3かい くりかえすと、ジャンプは {何|なん}かい する？",
    explanation:
      "くりかえす {回数|かいすう}ぶん するので、3かい ジャンプするよ。",
    format: "choice",
    choices: ["3かい", "1かい", "6かい", "0かい"],
    answer: "3かい",
  },
  {
    id: `${U.variablesLoops}.q-16`,
    unitId: U.variablesLoops,
    prompt: "{変数|へんすう}に「とくてん」などの {名前|なまえ}を つける りゆうは どれ？",
    explanation:
      "{名前|なまえ}を つけると、どの あたいの ことか わかりやすく なるよ。",
    format: "choice",
    choices: [
      "なんの あたいか わかりやすく する ため",
      "{重|おも}く する ため",
      "けす ため",
      "いみは ない",
    ],
    answer: "なんの あたいか わかりやすく する ため",
  },
  {
    id: `${U.variablesLoops}.q-17`,
    unitId: U.variablesLoops,
    prompt: "とくてんの {変数|へんすう}が 0。リンゴを 2こ、また 2こ とった（1こ1てん）。とくてんは？",
    explanation:
      "2こ ＋ 2こ で 4こ。1こ 1てんなので とくては 4だね。",
    visual: { kind: "emoji", value: "🍎🍎🍎🍎", caption: "2 ＋ 2" },
    format: "choice",
    choices: ["4", "2", "0", "8"],
    answer: "4",
  },
  {
    id: `${U.variablesLoops}.q-18`,
    unitId: U.variablesLoops,
    prompt: "「もし {雨|あめ}なら かさ、ちがえば ぼうし」。{雨|あめ}の とき もつ のは？",
    explanation:
      "「もし {雨|あめ}なら かさ」だから、{雨|あめ}の ときは かさを もつよ。じょうけんで うごきが かわるね。",
    format: "choice",
    choices: ["かさ", "ぼうし", "なにも もたない", "{両方|りょうほう}"],
    answer: "かさ",
  },
  {
    id: `${U.variablesLoops}.q-19`,
    unitId: U.variablesLoops,
    prompt: "くりかえしの {回数|かいすう}を 0かいに すると、その うごきは {何|なん}かい する？",
    explanation:
      "0かいなので、1かいも しないよ。",
    format: "choice",
    choices: ["1かいも しない", "1かい する", "ずっと する", "10かい する"],
    answer: "1かいも しない",
  },
  {
    id: `${U.variablesLoops}.q-20`,
    unitId: U.variablesLoops,
    prompt: "つぎの {文|ぶん}で {正|ただ}しい のは どれ？",
    explanation:
      "{変数|へんすう}は あたいを おぼえて おく いれもの。さわれる {機械|きかい}では ないよ。",
    format: "choice",
    choices: [
      "{変数|へんすう}は あたいを おぼえる いれもの",
      "{変数|へんすう}は さわれる {機械|きかい}",
      "くりかえしは いつも 1かいだけ",
      "じょうけんは いつも {同|おな}じ うごき",
    ],
    answer: "{変数|へんすう}は あたいを おぼえる いれもの",
  },
];

// 10. デバッグ（まちがいさがし） ───────────────────────────
const debugQuestions: (ChoiceQuestion | OrderingQuestion)[] = [
  {
    id: `${U.debug}.q-1`,
    unitId: U.debug,
    prompt: "プログラムの まちがいを なんと いう？",
    explanation:
      "プログラムの まちがいを「バグ」と いうよ。バグを {見|み}つけて {直|なお}す ことを「デバッグ」と いうんだ。",
    visual: { kind: "emoji", value: "🐛", caption: "バグ" },
    format: "choice",
    choices: ["バグ", "サーバー", "ビット", "ループ"],
    answer: "バグ",
  },
  {
    id: `${U.debug}.q-2`,
    unitId: U.debug,
    prompt: "プログラムが おもいどおりに うごかない とき、まず する ことは？",
    explanation:
      "どこで おかしく なるか、{上|うえ}から 1つずつ たしかめるよ。やみくもに {直|なお}さず、げんいんを さがすのが こつだね。",
    visual: { kind: "emoji", value: "🔎", caption: "1つずつ たしかめる" },
    format: "choice",
    choices: [
      "どこが おかしいか 1つずつ たしかめる",
      "ぜんぶ けす",
      "なにも しない",
      "コンピュータを たたく",
    ],
    answer: "どこが おかしいか 1つずつ たしかめる",
  },
  {
    id: `${U.debug}.q-3`,
    unitId: U.debug,
    prompt:
      "「{右|みぎ}に すすむ」を {入|い}れわすれた プログラム。{直|なお}すには どう する？",
    explanation:
      "たりない しじを {入|い}れれば {直|なお}るよ。バグは「ぬけて いる」「じゅんが ちがう」など いろいろ あるんだ。",
    visual: { kind: "emoji", value: "➕", caption: "たりない しじを {入|い}れる" },
    format: "choice",
    choices: [
      "「{右|みぎ}に すすむ」の しじを {入|い}れる",
      "ぜんぶ けす",
      "そのままに する",
      "{電|でん}げんを きる",
    ],
    answer: "「{右|みぎ}に すすむ」の しじを {入|い}れる",
  },
  {
    id: `${U.debug}.q-4`,
    unitId: U.debug,
    prompt: "デバッグの {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「うごかして みる → まちがいを {見|み}つける → {直|なお}す → もう{一|いち}ど うごかして たしかめる」。{直|なお}したら かならず たしかめよう。",
    format: "ordering",
    items: [
      "うごかして みる",
      "まちがいを {見|み}つける",
      "{直|なお}す",
      "もう{一|いち}ど たしかめる",
    ],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.debug}.q-5`,
    unitId: U.debug,
    prompt: "プログラムを {直|なお}したら、さいごに する ことは？",
    explanation:
      "{直|なお}した あとは もう{一|いち}ど うごかして、ちゃんと なおったか たしかめよう。たしかめないと まだ バグが のこって いる かも しれないよ。",
    visual: { kind: "emoji", value: "✅", caption: "もう{一|いち}ど たしかめる" },
    format: "choice",
    choices: [
      "もう{一|いち}ど うごかして たしかめる",
      "すぐ おわりに する",
      "{電|でん}げんを きる",
      "ほかの プログラムを けす",
    ],
    answer: "もう{一|いち}ど うごかして たしかめる",
  },
  {
    id: `${U.debug}.q-6`,
    unitId: U.debug,
    prompt: "プログラムの バグを {見|み}つけて {直|なお}す ことを なんと いう？",
    explanation:
      "バグを {見|み}つけて {直|なお}す ことを「デバッグ」と いうよ。",
    visual: { kind: "emoji", value: "🐛", caption: "デバッグ" },
    format: "choice",
    choices: ["デバッグ", "ソート", "けんさく", "セーブ"],
    answer: "デバッグ",
  },
  {
    id: `${U.debug}.q-7`,
    unitId: U.debug,
    prompt: "プログラムが おもいどおりに うごかない とき、まず する ことは？",
    explanation:
      "どこで おかしく なるか、{上|うえ}から 1つずつ たしかめるのが こつだよ。",
    format: "choice",
    choices: [
      "どこが おかしいか 1つずつ たしかめる",
      "ぜんぶ けす",
      "なにも しない",
      "コンピュータを たたく",
    ],
    answer: "どこが おかしいか 1つずつ たしかめる",
  },
  {
    id: `${U.debug}.q-8`,
    unitId: U.debug,
    prompt: "「{右|みぎ}に すすむ」の しじが ぬけて いた。これは どんな バグ？",
    explanation:
      "ひつような しじが「ぬけて いる（たりない）」バグだよ。たりない しじを {入|い}れれば {直|なお}るね。",
    format: "choice",
    choices: [
      "しじが たりない（ぬけて いる）",
      "しじが {多|おお}すぎる",
      "バグでは ない",
      "{画面|がめん}の もんだい",
    ],
    answer: "しじが たりない（ぬけて いる）",
  },
  {
    id: `${U.debug}.q-9`,
    unitId: U.debug,
    prompt: "しじの じゅんばんが ぎゃくに なって いた。これも バグ？",
    explanation:
      "じゅんが ちがうのも バグの 1つ。ただしい じゅんに ならべなおせば {直|なお}るよ。",
    format: "choice",
    choices: ["バグ（まちがい）", "バグでは ない", "アルゴリズム", "{変数|へんすう}"],
    answer: "バグ（まちがい）",
  },
  {
    id: `${U.debug}.q-10`,
    unitId: U.debug,
    prompt: "プログラムを {直|なお}したら、さいごに する ことは？",
    explanation:
      "{直|なお}した あとは もう{一|いち}ど うごかして、ちゃんと なおったか たしかめようね。",
    visual: { kind: "emoji", value: "✅", caption: "たしかめる" },
    format: "choice",
    choices: [
      "もう{一|いち}ど うごかして たしかめる",
      "すぐ おわりに する",
      "でんげんを きる",
      "ほかを けす",
    ],
    answer: "もう{一|いち}ど うごかして たしかめる",
  },
  {
    id: `${U.debug}.q-11`,
    unitId: U.debug,
    prompt: "デバッグの {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「うごかして みる → まちがいを {見|み}つける → {直|なお}す → もう{一|いち}ど たしかめる」の じゅんだよ。",
    format: "ordering",
    items: [
      "うごかして みる",
      "まちがいを {見|み}つける",
      "{直|なお}す",
      "もう{一|いち}ど たしかめる",
    ],
    answerOrder: [0, 1, 2, 3],
  },
  {
    id: `${U.debug}.q-12`,
    unitId: U.debug,
    prompt: "バグは だれの プログラムにも おこる？",
    explanation:
      "バグは だれの プログラムにも おこる ふつうの ことだよ。だから デバッグが だいじなんだ。",
    format: "choice",
    choices: [
      "だれにも おこる ふつうの こと",
      "へたな {人|ひと}だけ おこる",
      "ぜったいに おこらない",
      "コンピュータの こしょう",
    ],
    answer: "だれにも おこる ふつうの こと",
  },
  {
    id: `${U.debug}.q-13`,
    unitId: U.debug,
    prompt: "バグを さがす とき、やみくもに あちこち {直|なお}すのは よい？",
    explanation:
      "やみくもに {直|なお}すと もっと わからなく なる ことが あるよ。1つずつ たしかめるのが こつだね。",
    format: "choice",
    choices: [
      "よくない（1つずつ たしかめる）",
      "よい（どんどん {直|なお}す）",
      "ぜんぶ けす",
      "なにも しない",
    ],
    answer: "よくない（1つずつ たしかめる）",
  },
  {
    id: `${U.debug}.q-14`,
    unitId: U.debug,
    prompt: "「ジャンプ」の しじを よけいに 2かい {書|か}いて いた。{直|なお}すには？",
    explanation:
      "よけいな しじを けせば {直|なお}るよ。バグは「ぬけ」だけでなく「よけい」も あるんだ。",
    format: "choice",
    choices: [
      "よけいな しじを けす",
      "もっと ふやす",
      "そのままに する",
      "でんげんを きる",
    ],
    answer: "よけいな しじを けす",
  },
  {
    id: `${U.debug}.q-15`,
    unitId: U.debug,
    prompt: "プログラムが とちゅうで とまる とき、どこを しらべると よい？",
    explanation:
      "とまった ところの すぐ まえを しらべると、げんいんが {見|み}つかりやすいよ。",
    format: "choice",
    choices: [
      "とまった ところの まえ",
      "いちばん さいご",
      "{画面|がめん}の {色|いろ}",
      "でんちの {数|かず}",
    ],
    answer: "とまった ところの まえ",
  },
  {
    id: `${U.debug}.q-16`,
    unitId: U.debug,
    prompt: "{直|なお}した つもりでも、たしかめないと どう なる かも しれない？",
    explanation:
      "たしかめないと、まだ バグが のこって いる かも しれないよ。だから かならず たしかめよう。",
    format: "choice",
    choices: [
      "バグが のこって いる かも",
      "ぜったい なおって いる",
      "はやく なる",
      "かわらない",
    ],
    answer: "バグが のこって いる かも",
  },
  {
    id: `${U.debug}.q-17`,
    unitId: U.debug,
    prompt: "バグが なかなか {見|み}つからない とき、よい ほうほうは どれ？",
    explanation:
      "1つずつ ゆっくり たしかめたり、ほかの {人|ひと}に きいたり すると {見|み}つかりやすいよ。",
    format: "choice",
    choices: [
      "1つずつ たしかめる・{人|ひと}に きく",
      "ぜんぶ けして やめる",
      "コンピュータを たたく",
      "そのままに する",
    ],
    answer: "1つずつ たしかめる・{人|ひと}に きく",
  },
  {
    id: `${U.debug}.q-18`,
    unitId: U.debug,
    prompt: "ためしに うごかして みる（テスト）のは なんの ため？",
    explanation:
      "じっさいに うごかすと、バグ（まちがい）が ある か どうか たしかめられるよ。",
    format: "choice",
    choices: [
      "バグを {見|み}つける ため",
      "でんちを へらす ため",
      "{音|おと}を だす ため",
      "いみは ない",
    ],
    answer: "バグを {見|み}つける ため",
  },
  {
    id: `${U.debug}.q-19`,
    unitId: U.debug,
    prompt: "プログラムづくりの {正|ただ}しい じゅんに ならべよう。",
    explanation:
      "「プログラムを {書|か}く → うごかして みる → バグを {直|なお}す」の じゅんで かんせいに ちかづくよ。",
    format: "ordering",
    items: ["プログラムを {書|か}く", "うごかして みる", "バグを {直|なお}す"],
    answerOrder: [0, 1, 2],
  },
  {
    id: `${U.debug}.q-20`,
    unitId: U.debug,
    prompt: "つぎの {文|ぶん}で {正|ただ}しい のは どれ？",
    explanation:
      "バグは {見|み}つけて {直|なお}せるよ。{直|なお}したら かならず たしかめる ことが だいじだね。",
    format: "choice",
    choices: [
      "バグは {見|み}つけて {直|なお}せる",
      "バグは {直|なお}せない",
      "{直|なお}したら たしかめなくてよい",
      "バグは だれも おこさない",
    ],
    answer: "バグは {見|み}つけて {直|なお}せる",
  },
];

export const itG4Contents: Record<string, UnitContent> = {
  [U.hardwareSoftware]: {
    unitId: U.hardwareSoftware,
    learn: {
      unitId: U.hardwareSoftware,
      steps: [
        {
          heading: "コンピュータは 2つで できて いる",
          body: "スマホや ゲームきは、さわれる「{機械|きかい}（ハードウェア）」と、その{中|なか}で うごく「しじ・アプリ（ソフトウェア）」で できて いるよ。",
          visual: { kind: "emoji", value: "🖥️➕📀", caption: "ハード＋ソフト" },
        },
        {
          heading: "ハードウェアって なに？",
          body: "{手|て}で さわれる ぶぶんが ハードウェア。キーボード・マウス・{画面|がめん}などだよ。",
          visual: { kind: "emoji", value: "⌨️🖱️🖥️", caption: "さわれる きかい" },
        },
        {
          heading: "ソフトウェアって なに？",
          body: "さわれない、コンピュータを うごかす アプリや しじが ソフトウェア。ゲームや ブラウザは ソフトだよ。{両方|りょうほう}が そろって はじめて うごくんだ。",
          visual: { kind: "emoji", value: "🎮", caption: "アプリ＝ソフト" },
        },
      ],
    },
    test: {
      unitId: U.hardwareSoftware,
      questions: hardwareSoftwareQuestions,
      questionCount: 20,
    },
  },

  [U.inputOutput]: {
    unitId: U.inputOutput,
    learn: {
      unitId: U.inputOutput,
      steps: [
        {
          heading: "いれる・かんがえる・だす",
          body: "コンピュータは「{入力|にゅうりょく}（いれる）→ {処理|しょり}（かんがえる）→ {出力|しゅつりょく}（だす）」の じゅんで しごとを するよ。",
          visual: { kind: "emoji", value: "⌨️➡️🧠➡️🖥️", caption: "いれる→かんがえる→だす" },
        },
        {
          heading: "{入力|にゅうりょく}＝いれる どうぐ",
          body: "キーボード・マウス・マイク・カメラは、{情報|じょうほう}を コンピュータに いれる どうぐだよ。",
          visual: { kind: "emoji", value: "⌨️🖱️🎤", caption: "いれる{係|がかり}" },
        },
        {
          heading: "{出力|しゅつりょく}＝だす どうぐ",
          body: "{画面|がめん}・プリンター・スピーカーは、けっかを そとに だす どうぐだよ。{矢印|やじるし}の むきで かんがえると わかりやすいね。",
          visual: { kind: "emoji", value: "🖥️🖨️🔊", caption: "だす{係|がかり}" },
        },
      ],
    },
    test: {
      unitId: U.inputOutput,
      questions: inputOutputQuestions,
      questionCount: 20,
    },
  },

  [U.dataStorage]: {
    unitId: U.dataStorage,
    learn: {
      unitId: U.dataStorage,
      steps: [
        {
          heading: "コンピュータは 0 と 1",
          body: "コンピュータは「0」と「1」の 2つだけで すべての {文字|もじ}や {絵|え}を あらわすよ。これを 2しんすうと いうよ。",
          visual: { kind: "emoji", value: "0️⃣1️⃣", caption: "0 と 1" },
        },
        {
          heading: "ビットと バイト",
          body: "0 か 1 ひとつを「1ビット」、8ビットを まとめて「1バイト」と いうよ。データの {大|おお}きさを はかる たんいだね。",
          visual: { kind: "emoji", value: "🔘", caption: "1ビット" },
        },
        {
          heading: "おぼえて おく ばしょ",
          body: "{写真|しゃしん}や {動画|どうが}を ほぞんする ところが「{記憶|きおく}そうち」。{動画|どうが}は データが {大|おお}きいので ばしょを たくさん つかうよ。",
          visual: { kind: "emoji", value: "💾", caption: "{記憶|きおく}そうち" },
        },
      ],
    },
    test: {
      unitId: U.dataStorage,
      questions: dataStorageQuestions,
      questionCount: 20,
    },
  },

  [U.internet]: {
    unitId: U.internet,
    learn: {
      unitId: U.internet,
      steps: [
        {
          heading: "せかいを つなぐ あみ",
          body: "インターネットは せかいじゅうの コンピュータを つないだ {大|おお}きな「あみ」だよ。だから {遠|とお}くの {人|ひと}とも つながれるんだ。",
          visual: { kind: "emoji", value: "🌐", caption: "せかいの あみ" },
        },
        {
          heading: "サーバーと Wi-Fi",
          body: "ホームページや {動画|どうが}を おいて いる コンピュータを「サーバー」と いうよ。{線|せん}なしで つなぐ しくみが「Wi-Fi」だよ。",
          visual: { kind: "emoji", value: "🗄️📶", caption: "サーバーと Wi-Fi" },
        },
        {
          heading: "データは つたって とどく",
          body: "おくった データは {小|ちい}さく わけられ、いくつもの コンピュータを {通|とお}って {相手|あいて}に とどくよ。べんりだけど つかいすぎには {気|き}を つけよう。",
          visual: { kind: "emoji", value: "✉️➡️🌐➡️📱", caption: "つたって とどく" },
        },
      ],
    },
    test: {
      unitId: U.internet,
      questions: internetQuestions,
      questionCount: 20,
    },
  },

  [U.infoSafety]: {
    unitId: U.infoSafety,
    learn: {
      unitId: U.infoSafety,
      steps: [
        {
          heading: "パスワードは ひみつの かぎ",
          body: "パスワードは じぶんだけの かぎ。{名前|なまえ}や たんじょうびは すぐ ばれるので、あてられにくい ながい ことばに しよう。",
          visual: { kind: "emoji", value: "🔑", caption: "ひみつの かぎ" },
        },
        {
          heading: "{個人|こじん}じょうほうは {出|だ}さない",
          body: "じゅうしょ・でんわばんごう・{学校|がっこう}の {名前|なまえ}は、しらない {人|ひと}に おしえては だめだよ。これを {個人|こじん}じょうほうと いうよ。",
          visual: { kind: "emoji", value: "🚫🏠", caption: "じゅうしょは ひみつ" },
        },
        {
          heading: "ネットでも やさしく",
          body: "{相手|あいて}の {顔|かお}が {見|み}えなくても、やさしい ことばで つたえよう。こまった ことが あったら すぐ おとなに そうだんしてね。",
          visual: { kind: "emoji", value: "😊💬", caption: "やさしい ことば" },
        },
      ],
    },
    test: {
      unitId: U.infoSafety,
      questions: infoSafetyQuestions,
      questionCount: 20,
    },
  },

  [U.algorithmSteps]: {
    unitId: U.algorithmSteps,
    learn: {
      unitId: U.algorithmSteps,
      steps: [
        {
          heading: "{手順|てじゅん}＝アルゴリズム",
          body: "やる ことを {正|ただ}しい じゅんに ならべた ものを「アルゴリズム（{手順|てじゅん}）」と いうよ。りょうりの レシピも なかまだね。",
          visual: { kind: "emoji", value: "📋", caption: "{手順|てじゅん}" },
        },
        {
          heading: "じゅんが だいじ",
          body: "「おゆを いれる」まえに「ふたを あける」——じゅんが ちがうと うまく できないよ。だから {正|ただ}しい じゅんを かんがえるんだ。",
          visual: { kind: "emoji", value: "🍜", caption: "じゅんばん" },
        },
        {
          heading: "フローチャートで {見|み}える{化|か}",
          body: "{矢印|やじるし}や はこで ながれを かいた {図|ず}を「フローチャート」と いうよ。{手順|てじゅん}が {一目|ひとめ}で わかるね。",
          visual: { kind: "emoji", value: "🔽", caption: "ながれの {図|ず}" },
        },
      ],
    },
    test: {
      unitId: U.algorithmSteps,
      questions: algorithmStepsQuestions,
      questionCount: 20,
    },
  },

  [U.sortSearch]: {
    unitId: U.sortSearch,
    learn: {
      unitId: U.sortSearch,
      steps: [
        {
          heading: "ならべかえ（ソート）",
          body: "データを {小|ちい}さい じゅんや {大|おお}きい じゅんに ならべる ことを「ソート」と いうよ。{番号|ばんごう}じゅんに そろえるんだ。",
          visual: { kind: "emoji", value: "🔢", caption: "じゅんに ならべる" },
        },
        {
          heading: "ならべると さがしやすい",
          body: "じゅんに ならんで いれば、{目|め}あての ものを はやく さがせるよ。ばらばらだと さがすのに {時間|じかん}が かかるね。",
          visual: { kind: "emoji", value: "📚", caption: "さがしやすい" },
        },
        {
          heading: "はやい {手順|てじゅん}＝{効率|こうりつ}が よい",
          body: "まん{中|なか}から はんぶんずつ へらして さがすと、ぜんぶ {見|み}るより ずっと はやいよ。ステップが {少|すく}ない {手順|てじゅん}を「{効率|こうりつ}が よい」と いうよ。",
          visual: { kind: "emoji", value: "⚡", caption: "はやい {手順|てじゅん}" },
        },
      ],
    },
    test: {
      unitId: U.sortSearch,
      questions: sortSearchQuestions,
      questionCount: 20,
    },
  },

  [U.blockProgramming]: {
    unitId: U.blockProgramming,
    learn: {
      unitId: U.blockProgramming,
      steps: [
        {
          heading: "プログラム＝コンピュータへの しじ",
          body: "コンピュータに させたい ことを かいた しじの あつまりを「プログラム」と いうよ。それを つくるのが プログラミングだね。",
          visual: { kind: "emoji", value: "🧩", caption: "しじの あつまり" },
        },
        {
          heading: "ブロックを つむ",
          body: "ブロックを はめこんで しじを くみたてる やりかたが「ブロックプログラミング」。{文字|もじ}を まちがえず くみたてられるよ。",
          visual: { kind: "emoji", value: "🧱", caption: "はめこむ だけ" },
        },
        {
          heading: "うえから じゅんに うごく",
          body: "プログラムは うえから したへ 1つずつ {実|じっ}こうされるよ。「{右|みぎ}に すすむ → ジャンプ → なく」の じゅんで キャラクターが うごくんだ。",
          visual: { kind: "emoji", value: "🐱", caption: "じゅんに うごく" },
        },
      ],
    },
    test: {
      unitId: U.blockProgramming,
      questions: blockProgrammingQuestions,
      questionCount: 20,
    },
  },

  [U.variablesLoops]: {
    unitId: U.variablesLoops,
    learn: {
      unitId: U.variablesLoops,
      steps: [
        {
          heading: "{変数|へんすう}＝あたいの いれもの",
          body: "とくてんや のこり{回数|かいすう}など、かわる {数|かず}を おぼえて おく いれものを「{変数|へんすう}」と いうよ。",
          visual: { kind: "emoji", value: "📦", caption: "あたいの いれもの" },
        },
        {
          heading: "くりかえし（ループ）",
          body: "{同|おな}じ うごきを なんども する ときは「くりかえし」を つかうよ。10かい {書|か}かなくても 1つに まとめられて べんりだね。",
          visual: { kind: "emoji", value: "🔁", caption: "くりかえし" },
        },
        {
          heading: "じょうけん（もし〜なら）",
          body: "「もし ボタンが おされたら {音|おと}を ならす」のように、ばあいに よって うごきを かえる しくみが「じょうけん」だよ。",
          visual: { kind: "emoji", value: "❓", caption: "もし〜なら" },
        },
      ],
    },
    test: {
      unitId: U.variablesLoops,
      questions: variablesLoopsQuestions,
      questionCount: 20,
    },
  },

  [U.debug]: {
    unitId: U.debug,
    learn: {
      unitId: U.debug,
      steps: [
        {
          heading: "バグと デバッグ",
          body: "プログラムの まちがいを「バグ」、それを {見|み}つけて {直|なお}す ことを「デバッグ」と いうよ。だれの プログラムにも バグは おこるんだ。",
          visual: { kind: "emoji", value: "🐛", caption: "バグ" },
        },
        {
          heading: "1つずつ たしかめる",
          body: "おもいどおりに うごかない ときは、{上|うえ}から 1つずつ どこで おかしく なるか たしかめよう。やみくもに {直|なお}さないのが こつだよ。",
          visual: { kind: "emoji", value: "🔎", caption: "1つずつ" },
        },
        {
          heading: "{直|なお}したら もう{一|いち}ど たしかめる",
          body: "「うごかす → {見|み}つける → {直|なお}す → もう{一|いち}ど たしかめる」。{直|なお}した あとに たしかめると、ちゃんと なおったか わかるよ。",
          visual: { kind: "emoji", value: "✅", caption: "たしかめる" },
        },
      ],
    },
    test: {
      unitId: U.debug,
      questions: debugQuestions,
      questionCount: 20,
    },
  },
};
