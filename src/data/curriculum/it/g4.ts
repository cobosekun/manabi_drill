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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
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
      questionCount: 5,
    },
  },
};
