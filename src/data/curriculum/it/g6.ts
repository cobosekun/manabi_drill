// ══════════════════════════════════════════
// カリキュラム: IT分野（じょうほう）小6
// 新教科「IT（it）」= コンピュータ実務寄り＋プログラミング体験を 学習＋テスト両モードで提供。
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 全表示テキストは ルビ記法 {漢字|よみ}（全漢字ルビ）で執筆（2026-06-02 CEO方針）。
// SubjectId には "it" が中央で追加済み → as キャスト不要。
//
// ── 申し送り（中央集約担当へ）─────────────────────────────
//  1. it/ は本ファイルが最初のスライス（g1-g5 は並行作成中）。itSubject と 3領域
//     （computer-basics / algorithm / programming）は scope-it.md 由来の id で本ファイルに定義する。
//     並行作成の g1-g5 も同 scope 由来で同 id を使う想定 → 中央集約時に id で重複排除すること。
//  2. emoji 💻 / theme violet（tech 寄り。既存教科と被ってよい）/ grades [1..6] / testable:true。
//  3. prerequisites / leadsTo は本ファイル内（it.g6.*）で完結（集約時に必ず解決）。
//     中学「技術」・高校「情報」への接続は realWorldUse に記述（id ではなく文章で）。
//  4. 棲み分け: IT＝「動かす・作る」実務寄り / 応用(oyo)＝二進法・確率等の数学的本質。
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
  theme: "violet",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域（scope-it.md の3領域） ──────────────────────────
export const itG6Domains: Domain[] = [
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
// 依存グラフ（prerequisites を辺とする DAG。循環なし）:
//
//   network-internet ─▶ info-security
//   algorithm-efficiency ─▶ variables-code ─▶ loop-condition ─┬─▶ debug ─▶ make-work
//                                                              └─▶ make-work
//
const U = {
  networkInternet: "it.g6.network-internet",
  infoSecurity: "it.g6.info-security",
  algorithmEfficiency: "it.g6.algorithm-efficiency",
  variablesCode: "it.g6.variables-code",
  loopCondition: "it.g6.loop-condition",
  debug: "it.g6.debug",
  makeWork: "it.g6.make-work",
} as const;

export const itG6Units: Unit[] = [
  {
    id: U.networkInternet,
    subjectId: "it",
    grade: 6,
    domainId: "it.computer-basics",
    title: "ネットワークと インターネットの しくみ",
    order: 1,
    realWorldUse:
      "スマホや ゲームが {世界中|せかいじゅう}と つながるのは インターネットの おかげ。どう {情報|じょうほう}が {届|とど}くかを {知|し}ると {安全|あんぜん}に {使|つか}えるよ。",
    leadsTo: [U.infoSecurity],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.infoSecurity,
    subjectId: "it",
    grade: 6,
    domainId: "it.computer-basics",
    title: "{情報|じょうほう}モラルと セキュリティ",
    order: 2,
    realWorldUse:
      "パスワードを {守|まも}る、{個人|こじん}{情報|じょうほう}を {出|だ}さない など、ネットを {安全|あんぜん}に {正|ただ}しく {使|つか}う ために {役立|やくだ}つよ。",
    leadsTo: [],
    prerequisites: [U.networkInternet],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.algorithmEfficiency,
    subjectId: "it",
    grade: 6,
    domainId: "it.algorithm",
    title: "{効率|こうりつ}と アルゴリズムの くらべ{方|かた}",
    order: 3,
    realWorldUse:
      "たくさんの データから ほしい ものを はやく さがす しくみは、けんさくや ちずアプリなど {身近|みぢか}な ところで {使|つか}われているよ。",
    leadsTo: [U.variablesCode],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.variablesCode,
    subjectId: "it",
    grade: 6,
    domainId: "it.programming",
    title: "{変数|へんすう}を つかった コード",
    order: 4,
    realWorldUse:
      "ゲームの とくてんや のこり ライフを {覚|おぼ}えておくのが {変数|へんすう}。アプリが {数|かず}や {名前|なまえ}を {記憶|きおく}する しくみだよ。",
    leadsTo: [U.loopCondition],
    prerequisites: [U.algorithmEfficiency],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.loopCondition,
    subjectId: "it",
    grade: 6,
    domainId: "it.programming",
    title: "くり{返|かえ}しと {条件|じょうけん}の コード",
    order: 5,
    realWorldUse:
      "「100{回|かい} くりかえす」「もし〜なら うごく」など、ゲームや ロボットを 思いどおりに うごかす プログラムの {基本|きほん}だよ。",
    leadsTo: [U.debug, U.makeWork],
    prerequisites: [U.variablesCode],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.debug,
    subjectId: "it",
    grade: 6,
    domainId: "it.programming",
    title: "デバッグ（まちがいさがし）",
    order: 6,
    realWorldUse:
      "アプリが おかしく {動|うご}く ときに げんいんを 見つけて なおす ことを デバッグと いうよ。プログラマーが まいにち する しごとだよ。",
    leadsTo: [U.makeWork],
    prerequisites: [U.loopCondition],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.makeWork,
    subjectId: "it",
    grade: 6,
    domainId: "it.programming",
    title: "かんたんな {作品|さくひん}づくり",
    order: 7,
    realWorldUse:
      "{自分|じぶん}で {考|かんが}えた ゲームや アニメを プログラムで つくる たいけんは、ものづくりや くふうする {力|ちから}を そだてるよ。",
    leadsTo: [],
    prerequisites: [U.loopCondition, U.debug],
    hasLearn: true,
    hasTest: true,
  },
];

// ══════════════════════════════════════════
// 単元コンテンツ（学習 learn + テスト test）
// 全テキストはルビ記法。test は choice / ordering / matching を活用、全問 explanation 必須。
// （コード中の英単語・記号・数字は ルビ対象外。和文部分のみルビ。）
// ══════════════════════════════════════════

export const itG6Contents: Record<string, UnitContent> = {
  // ── 1. ネットワークとインターネットのしくみ ──
  [U.networkInternet]: {
    unitId: U.networkInternet,
    learn: {
      unitId: U.networkInternet,
      steps: [
        {
          heading: "コンピュータが つながる",
          body: "コンピュータどうしを つないで {情報|じょうほう}を やりとりする しくみを ネットワークと いうよ。{世界中|せかいじゅう}を つないだ {大|おお}きな ネットワークが インターネットだよ。",
          visual: { kind: "emoji", value: "💻🔗🌐", caption: "{世界中|せかいじゅう}が つながる" },
        },
        {
          heading: "{情報|じょうほう}は 小さく {分|わ}けて {送|おく}る",
          body: "メールや {画像|がぞう}は 小さな かたまりに {分|わ}けられて {送|おく}られ、とどいた {先|さき}で もとに もどるよ。だから はやく たくさん {送|おく}れるんだ。",
          visual: { kind: "emoji", value: "✉️➡️📦📦➡️✉️", caption: "{分|わ}けて {送|おく}る" },
        },
        {
          heading: "サーバーと ブラウザ",
          body: "ホームページの {情報|じょうほう}を {持|も}つ コンピュータが サーバー。それを {見|み}る ソフトが ブラウザだよ。",
          visual: { kind: "emoji", value: "🖥️↔️🔍", caption: "サーバーと ブラウザ" },
        },
      ],
    },
    test: {
      unitId: U.networkInternet,
      questionCount: 4,
      questions: [
        {
          id: `${U.networkInternet}.q-1`,
          unitId: U.networkInternet,
          prompt: "{世界中|せかいじゅう}の コンピュータを つないだ {大|おお}きな ネットワークを なんという?",
          explanation: "{世界中|せかいじゅう}を つないだ ネットワークが インターネットだよ。",
          format: "choice",
          choices: ["インターネット", "テレビ", "でんわちょう", "ラジオ"],
          answer: "インターネット",
        },
        {
          id: `${U.networkInternet}.q-2`,
          unitId: U.networkInternet,
          prompt: "インターネットで {大|おお}きな データを {送|おく}る ときの くふうは?",
          explanation: "データを 小さな かたまりに {分|わ}けて {送|おく}り、{届|とど}いた {先|さき}で もとに もどすよ。",
          format: "choice",
          choices: ["小さく {分|わ}けて {送|おく}る", "そのまま 1つで {送|おく}る", "{送|おく}らない", "{紙|かみ}で {送|おく}る"],
          answer: "小さく {分|わ}けて {送|おく}る",
        },
        {
          id: `${U.networkInternet}.q-3`,
          unitId: U.networkInternet,
          prompt: "ホームページを {見|み}る ための ソフトを なんという?",
          explanation: "ホームページを {見|み}る ソフトを ブラウザと いうよ。",
          format: "choice",
          choices: ["ブラウザ", "サーバー", "プリンタ", "キーボード"],
          answer: "ブラウザ",
        },
        {
          id: `${U.networkInternet}.q-4`,
          unitId: U.networkInternet,
          prompt: "つぎの ことばと はたらきを 正しく むすびつけよう。",
          explanation: "サーバー＝{情報|じょうほう}を {届|とど}ける コンピュータ、ブラウザ＝ホームページを {見|み}る ソフト、Wi-Fi＝むせんで つなぐ しくみ だよ。",
          format: "matching",
          left: ["サーバー", "ブラウザ", "Wi-Fi"],
          right: [
            "ホームページを {見|み}る ソフト",
            "{情報|じょうほう}を {届|とど}ける コンピュータ",
            "むせんで つなぐ しくみ",
          ],
          answerPairs: [1, 0, 2],
        },
      ],
    },
  },

  // ── 2. 情報モラルとセキュリティ ──
  [U.infoSecurity]: {
    unitId: U.infoSecurity,
    learn: {
      unitId: U.infoSecurity,
      steps: [
        {
          heading: "パスワードを {守|まも}る",
          body: "パスワードは {家|いえ}の かぎと {同|おな}じ。{人|ひと}に おしえず、たんじゅんすぎない ものに しよう。",
          visual: { kind: "emoji", value: "🔑🔒", caption: "パスワードは かぎ" },
        },
        {
          heading: "{個人|こじん}{情報|じょうほう}を {出|だ}さない",
          body: "{名前|なまえ}・じゅうしょ・でんわ{番号|ばんごう}・がっこう名などは ネットに かんたんに {書|か}かない ことが たいせつだよ。",
          visual: { kind: "emoji", value: "🙅📝", caption: "{個人|こじん}{情報|じょうほう}は ひみつ" },
        },
        {
          heading: "ネットの マナー",
          body: "{相手|あいて}が 見えなくても、いやな ことを {書|か}かない。{困|こま}ったら おとなに そうだんしよう。",
          visual: { kind: "emoji", value: "💬🤝", caption: "やさしい ことばで" },
        },
      ],
    },
    test: {
      unitId: U.infoSecurity,
      questionCount: 4,
      questions: [
        {
          id: `${U.infoSecurity}.q-1`,
          unitId: U.infoSecurity,
          prompt: "パスワードの あつかいで 正しいのは?",
          explanation: "パスワードは {家|いえ}の かぎと {同|おな}じ。{人|ひと}に おしえず じぶんだけが {知|し}っておくよ。",
          format: "choice",
          choices: ["{人|ひと}に おしえない", "ともだちに 教える", " noteに 大きく はる", "「1234」に する"],
          answer: "{人|ひと}に おしえない",
        },
        {
          id: `${U.infoSecurity}.q-2`,
          unitId: U.infoSecurity,
          prompt: "ネットに かんたんに {書|か}いては いけない ものは?",
          explanation: "{名前|なまえ}・じゅうしょ・でんわ{番号|ばんごう}などの {個人|こじん}{情報|じょうほう}は {出|だ}さないようにするよ。",
          format: "choice",
          choices: ["じゅうしょや でんわ{番号|ばんごう}", "すきな {色|いろ}", "今日の {天気|てんき}", "1たす1の {答|こた}え"],
          answer: "じゅうしょや でんわ{番号|ばんごう}",
        },
        {
          id: `${U.infoSecurity}.q-3`,
          unitId: U.infoSecurity,
          prompt: "ネットで いやな ことが あって {困|こま}ったら?",
          explanation: "{一人|ひとり}で なやまず、おうちの {人|ひと}や 先生など おとなに そうだんしようね。",
          format: "choice",
          choices: ["おとなに そうだんする", "{一人|ひとり}で がまんする", "やりかえす", "ずっと {見|み}つづける"],
          answer: "おとなに そうだんする",
        },
        {
          id: `${U.infoSecurity}.q-4`,
          unitId: U.infoSecurity,
          prompt: "あんぜんな パスワードに {近|ちか}いのは?",
          explanation: "たんじゅんすぎる ものは あぶない。{文字|もじ}や {数字|すうじ}を まぜた {長|なが}めの ものが あんぜんだよ。",
          format: "choice",
          choices: ["{文字|もじ}と {数字|すうじ}を まぜた {長|なが}い もの", "1111", "abc", "{自分|じぶん}の {名前|なまえ}だけ"],
          answer: "{文字|もじ}と {数字|すうじ}を まぜた {長|なが}い もの",
        },
      ],
    },
  },

  // ── 3. 効率とアルゴリズムのくらべ方 ──
  [U.algorithmEfficiency]: {
    unitId: U.algorithmEfficiency,
    learn: {
      unitId: U.algorithmEfficiency,
      steps: [
        {
          heading: "アルゴリズム＝{手順|てじゅん}",
          body: "やりたい ことを かなえる ための {決|き}まった {手順|てじゅん}を アルゴリズムと いうよ。{同|おな}じ ことでも {手順|てじゅん}は いくつも あるよ。",
          visual: { kind: "emoji", value: "📋➡️✅", caption: "{決|き}まった {手順|てじゅん}" },
        },
        {
          heading: "はやい {手順|てじゅん}・おそい {手順|てじゅん}",
          body: "じしょで ことばを さがす とき、{先頭|せんとう}から 1つずつより、まん{中|なか}を {見|み}て はんぶんに しぼる ほうが ずっと はやいよ。",
          visual: { kind: "emoji", value: "📖🔍", caption: "はんぶんに しぼると はやい" },
        },
        {
          heading: "くらべて えらぶ",
          body: "{答|こた}えが {同|おな}じでも、{手順|てじゅん}が 少なく はやい ほうが「{効率|こうりつ}が よい」アルゴリズムだよ。",
          visual: { kind: "emoji", value: "🐢 vs 🐇", caption: "{効率|こうりつ}を くらべる" },
        },
      ],
    },
    test: {
      unitId: U.algorithmEfficiency,
      questionCount: 4,
      questions: [
        {
          id: `${U.algorithmEfficiency}.q-1`,
          unitId: U.algorithmEfficiency,
          prompt: "やりたい ことを かなえる {決|き}まった {手順|てじゅん}を なんという?",
          explanation: "{決|き}まった {手順|てじゅん}を アルゴリズムと いうよ。",
          format: "choice",
          choices: ["アルゴリズム", "パスワード", "ブラウザ", "サーバー"],
          answer: "アルゴリズム",
        },
        {
          id: `${U.algorithmEfficiency}.q-2`,
          unitId: U.algorithmEfficiency,
          prompt: "ならんだ データから さがす とき、はやいのは?",
          explanation: "まん{中|なか}を {見|み}て はんぶんに しぼっていく ほうが、{先頭|せんとう}から 1つずつより はやいよ。",
          format: "choice",
          choices: ["まん{中|なか}を {見|み}て はんぶんに しぼる", "{先頭|せんとう}から 1つずつ ぜんぶ", "てきとうに さがす", "さがさない"],
          answer: "まん{中|なか}を {見|み}て はんぶんに しぼる",
        },
        {
          id: `${U.algorithmEfficiency}.q-3`,
          unitId: U.algorithmEfficiency,
          prompt: "「{効率|こうりつ}が よい」アルゴリズムとは?",
          explanation: "{同|おな}じ {答|こた}えを、より 少ない {手順|てじゅん}で はやく 出せる ものだよ。",
          format: "choice",
          choices: ["少ない {手順|てじゅん}で はやい", "{手順|てじゅん}が 多い", "おそい ほど よい", "{答|こた}えが ちがう"],
          answer: "少ない {手順|てじゅん}で はやい",
        },
        {
          id: `${U.algorithmEfficiency}.q-4`,
          unitId: U.algorithmEfficiency,
          prompt: "{数|かず}を 小さい {順|じゅん}に ならべる「{選|えら}んで ならべる」{手順|てじゅん}を 正しい {順|じゅん}に ならべよう。",
          explanation: "いちばん 小さい {数|かず}を さがす→{前|まえ}に おく→のこりで くりかえす→ぜんぶ ならぶまで つづける、の {順|じゅん}だよ。",
          format: "ordering",
          items: [
            "いちばん 小さい {数|かず}を さがす",
            "それを いちばん {前|まえ}に おく",
            "のこりから また 小さい {数|かず}を さがす",
            "ぜんぶ ならぶまで くりかえす",
          ],
          answerOrder: [0, 1, 2, 3],
        },
      ],
    },
  },

  // ── 4. 変数をつかったコード ──
  [U.variablesCode]: {
    unitId: U.variablesCode,
    learn: {
      unitId: U.variablesCode,
      steps: [
        {
          heading: "{変数|へんすう}は はこ",
          body: "{数|かず}や {文字|もじ}を {入|い}れておく「{名前|なまえ}つきの はこ」が {変数|へんすう}だよ。あとで {中身|なかみ}を {取|と}り{出|だ}したり {変|か}えたり できるよ。",
          visual: { kind: "emoji", value: "📦🏷️", caption: "{名前|なまえ}つきの はこ" },
        },
        {
          heading: "{入|い}れて つかう",
          body: "たとえば コードで `score = 0` と {書|か}くと、score という はこに 0 が {入|い}るよ。`score = score + 10` で 10 ふえるよ。",
          visual: { kind: "emoji", value: "📦0➡️📦10", caption: "{中身|なかみ}を {変|か}える" },
        },
      ],
    },
    test: {
      unitId: U.variablesCode,
      questionCount: 4,
      questions: [
        {
          id: `${U.variablesCode}.q-1`,
          unitId: U.variablesCode,
          prompt: "{数|かず}や {文字|もじ}を {入|い}れておく「{名前|なまえ}つきの はこ」を なんという?",
          explanation: "{値|あたい}を {入|い}れておく {名前|なまえ}つきの はこを {変数|へんすう}と いうよ。",
          format: "choice",
          choices: ["{変数|へんすう}", "サーバー", "マウス", "アルゴリズム"],
          answer: "{変数|へんすう}",
        },
        {
          id: `${U.variablesCode}.q-2`,
          unitId: U.variablesCode,
          prompt: "`score = 0` の あと `score = score + 10` を {実行|じっこう}すると score は?",
          explanation: "0 に 10 を たすので、score は 10 に なるよ。",
          format: "choice",
          choices: ["10", "0", "1010", "100"],
          answer: "10",
        },
        {
          id: `${U.variablesCode}.q-3`,
          unitId: U.variablesCode,
          prompt: "`x = 5` の あと `x = 8` を {実行|じっこう}すると x は?",
          explanation: "あとから {入|い}れた 8 で {上書|うわが}きされるので、x は 8 だよ。",
          format: "choice",
          choices: ["8", "5", "13", "58"],
          answer: "8",
        },
        {
          id: `${U.variablesCode}.q-4`,
          unitId: U.variablesCode,
          prompt: "ゲームの とくてんを {覚|おぼ}えておくのに ぴったりなのは?",
          explanation: "とくてんのように あとで {変|か}わる {値|あたい}を {覚|おぼ}えるには {変数|へんすう}を {使|つか}うよ。",
          format: "choice",
          choices: ["{変数|へんすう}", "プリンタ", "Wi-Fi", "パスワード"],
          answer: "{変数|へんすう}",
        },
      ],
    },
  },

  // ── 5. くり返しと条件のコード ──
  [U.loopCondition]: {
    unitId: U.loopCondition,
    learn: {
      unitId: U.loopCondition,
      steps: [
        {
          heading: "くり{返|かえ}し（ループ）",
          body: "{同|おな}じ {命令|めいれい}を {何度|なんど}も する ときは「くり{返|かえ}し」を {使|つか}うよ。`10回 くりかえす` と {書|か}けば 10{回|かい} うごくよ。",
          visual: { kind: "emoji", value: "🔁", caption: "{何度|なんど}も くりかえす" },
        },
        {
          heading: "{条件|じょうけん}（もし〜なら）",
          body: "「もし〜なら …する」を {条件|じょうけん}{分岐|ぶんき}と いうよ。`もし てんすうが 80いじょうなら「ごうかく」と {出|だ}す`の ように {使|つか}うよ。",
          visual: { kind: "emoji", value: "❓➡️✅/❌", caption: "もし〜なら" },
        },
        {
          heading: "{組|く}み{合|あ}わせる",
          body: "くり{返|かえ}しと {条件|じょうけん}を {組|く}み{合|あ}わせると、ゲームや ロボットを 思いどおりに うごかせるよ。",
          visual: { kind: "emoji", value: "🔁❓🤖", caption: "{組|く}み{合|あ}わせて うごかす" },
        },
      ],
    },
    test: {
      unitId: U.loopCondition,
      questionCount: 4,
      questions: [
        {
          id: `${U.loopCondition}.q-1`,
          unitId: U.loopCondition,
          prompt: "{同|おな}じ {命令|めいれい}を {何度|なんど}も する しくみを なんという?",
          explanation: "{同|おな}じ ことを くりかえす しくみを くり{返|かえ}し（ループ）と いうよ。",
          format: "choice",
          choices: ["くり{返|かえ}し", "{変数|へんすう}", "デバッグ", "サーバー"],
          answer: "くり{返|かえ}し",
        },
        {
          id: `${U.loopCondition}.q-2`,
          unitId: U.loopCondition,
          prompt: "`3回 くりかえす: 「やあ」と {言|い}う` を {実行|じっこう}すると「やあ」は {何回|なんかい}?",
          explanation: "3{回|かい} くりかえすので「やあ」は 3{回|かい} {出|で}るよ。",
          format: "choice",
          choices: ["3{回|かい}", "1{回|かい}", "0{回|かい}", "{何度|なんど}も ずっと"],
          answer: "3{回|かい}",
        },
        {
          id: `${U.loopCondition}.q-3`,
          unitId: U.loopCondition,
          prompt: "「もし てんすうが 80いじょうなら『ごうかく』」。てんすうが 75の とき {出|で}るのは?",
          explanation: "75は 80いじょうでは ないので、{条件|じょうけん}に あわず「ごうかく」は {出|で}ないよ。",
          format: "choice",
          choices: ["{何|なに}も {出|で}ない", "ごうかく", "エラー", "80"],
          answer: "{何|なに}も {出|で}ない",
        },
        {
          id: `${U.loopCondition}.q-4`,
          unitId: U.loopCondition,
          prompt: "「もし〜なら …する」のように {場合|ばあい}で うごきを かえる しくみを なんという?",
          explanation: "{条件|じょうけん}に よって うごきを かえる しくみを {条件|じょうけん}{分岐|ぶんき}と いうよ。",
          format: "choice",
          choices: ["{条件|じょうけん}{分岐|ぶんき}", "くり{返|かえ}し", "{保存|ほぞん}", "{印刷|いんさつ}"],
          answer: "{条件|じょうけん}{分岐|ぶんき}",
        },
      ],
    },
  },

  // ── 6. デバッグ（まちがいさがし）──
  [U.debug]: {
    unitId: U.debug,
    learn: {
      unitId: U.debug,
      steps: [
        {
          heading: "バグと デバッグ",
          body: "プログラムの まちがいを「バグ」、それを 見つけて なおす ことを「デバッグ」と いうよ。",
          visual: { kind: "emoji", value: "🐛🔧", caption: "まちがいを なおす" },
        },
        {
          heading: "見つけ{方|かた}",
          body: "うごきを 1つずつ たしかめ、思った とおりに ならない ところを さがすよ。{順番|じゅんばん}・{数|かず}・{条件|じょうけん}の まちがいが 多いよ。",
          visual: { kind: "emoji", value: "🔍📋", caption: "1つずつ たしかめる" },
        },
      ],
    },
    test: {
      unitId: U.debug,
      questionCount: 4,
      questions: [
        {
          id: `${U.debug}.q-1`,
          unitId: U.debug,
          prompt: "プログラムの まちがいを なんという?",
          explanation: "プログラムの まちがいを「バグ」と いうよ。なおす ことが デバッグ。",
          format: "choice",
          choices: ["バグ", "サーバー", "ループ", "マウス"],
          answer: "バグ",
        },
        {
          id: `${U.debug}.q-2`,
          unitId: U.debug,
          prompt: "まちがいを 見つけて なおす ことを なんという?",
          explanation: "バグを 見つけて なおす ことを デバッグと いうよ。",
          format: "choice",
          choices: ["デバッグ", "ログイン", "{保存|ほぞん}", "コピー"],
          answer: "デバッグ",
        },
        {
          id: `${U.debug}.q-3`,
          unitId: U.debug,
          prompt: "`x = 2` `x = x + 3` の あと「x は 6」と 出た。正しい {答|こた}えは?",
          explanation: "2 に 3 を たすので 5。「6」は まちがい（バグ）だよ。",
          format: "choice",
          choices: ["5", "6", "23", "2"],
          answer: "5",
        },
        {
          id: `${U.debug}.q-4`,
          unitId: U.debug,
          prompt: "デバッグの こつとして 正しいのは?",
          explanation: "うごきを 1つずつ たしかめて、思った とおりに ならない ところを さがすのが こつだよ。",
          format: "choice",
          choices: ["1つずつ たしかめる", "ぜんぶ けす", "見ないで なおす", "そのままに する"],
          answer: "1つずつ たしかめる",
        },
      ],
    },
  },

  // ── 7. かんたんな作品づくり ──
  [U.makeWork]: {
    unitId: U.makeWork,
    learn: {
      unitId: U.makeWork,
      steps: [
        {
          heading: "{作|つく}る {前|まえ}に {考|かんが}える",
          body: "どんな {作品|さくひん}（ゲームや アニメ）を つくるか、まず {考|かんが}えて かんたんな {計画|けいかく}を 立てるよ。",
          visual: { kind: "emoji", value: "💡📝", caption: "{計画|けいかく}を 立てる" },
        },
        {
          heading: "{命令|めいれい}を ならべて うごかす",
          body: "{変数|へんすう}・くり{返|かえ}し・{条件|じょうけん}を {組|く}み{合|あ}わせて {命令|めいれい}を ならべ、{動|うご}かして たしかめるよ。",
          visual: { kind: "emoji", value: "🧩▶️", caption: "ならべて うごかす" },
        },
        {
          heading: "なおして かんせい",
          body: "うまく {動|うご}かない ところは デバッグして なおすよ。すこしずつ よく して かんせいさせよう。",
          visual: { kind: "emoji", value: "🔧🎉", caption: "なおして かんせい" },
        },
      ],
    },
    test: {
      unitId: U.makeWork,
      questionCount: 4,
      questions: [
        {
          id: `${U.makeWork}.q-1`,
          unitId: U.makeWork,
          prompt: "{作品|さくひん}づくりの {手順|てじゅん}を 正しい {順|じゅん}に ならべよう。",
          explanation: "どんな {作品|さくひん}か {考|かんが}える→{命令|めいれい}を ならべる→{動|うご}かして たしかめる→まちがいを なおす（デバッグ）の {順|じゅん}だよ。",
          format: "ordering",
          items: [
            "どんな {作品|さくひん}か {考|かんが}える",
            "ひつような {命令|めいれい}を ならべる",
            "{動|うご}かして たしかめる",
            "まちがいを なおす",
          ],
          answerOrder: [0, 1, 2, 3],
        },
        {
          id: `${U.makeWork}.q-2`,
          unitId: U.makeWork,
          prompt: "{作品|さくひん}づくりで いちばん さいしょに する ことは?",
          explanation: "まず どんな {作品|さくひん}を つくるか {考|かんが}えて {計画|けいかく}を 立てるよ。",
          format: "choice",
          choices: ["どんな {作品|さくひん}か {考|かんが}える", "いきなり こうかいする", "けす", "なにも しない"],
          answer: "どんな {作品|さくひん}か {考|かんが}える",
        },
        {
          id: `${U.makeWork}.q-3`,
          unitId: U.makeWork,
          prompt: "{作品|さくひん}を {動|うご}かして うまく いかない とき する ことは?",
          explanation: "うまく {動|うご}かない ところは デバッグして なおすよ。",
          format: "choice",
          choices: ["デバッグして なおす", "あきらめる", "けして やめる", "そのままに する"],
          answer: "デバッグして なおす",
        },
        {
          id: `${U.makeWork}.q-4`,
          unitId: U.makeWork,
          prompt: "プログラムで {作品|さくひん}を つくる たいけんで そだつ {力|ちから}は?",
          explanation: "{自分|じぶん}で {考|かんが}え くふうして つくる ことで、ものづくりや {問題|もんだい}を {解決|かいけつ}する {力|ちから}が そだつよ。",
          format: "choice",
          choices: ["くふうして つくる {力|ちから}", "なにも そだたない", "はやく あきる {力|ちから}", "わすれる {力|ちから}"],
          answer: "くふうして つくる {力|ちから}",
        },
      ],
    },
  },
};
