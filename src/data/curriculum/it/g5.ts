// ══════════════════════════════════════════
// カリキュラム: IT・情報（じょうほう / it）小5
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と同形（Subject は it/g1.ts 側で定義する
// 想定のため、本ファイルは domains / units / contents のみ公開＝重複 export 回避）。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
//
// 【型】SubjectId(drill.ts) は既に "it" を含むため `as` 局所回避は不要（中央が対応済み）。
//       → 申し送り: it 教科の Subject 実体・theme・grades の中央定義と index.ts 集約は中央側で実施。
// 【棲み分け】IT は「動かす・作る」実務寄り（プログラミング体験を厚く）。応用(oyo)は数学的本質で角度を変える。
// 【表記】全表示テキストはルビ記法 {漢字|よみ}（全漢字ルビ）。ひらがな/カタカナ/数字/記号は素のまま。
//        formalName は管理用（漢字）のためルビ無し。RubyText レンダラ前提。
// 既存 generators は IT に非対応 → 全単元 固定 questions[]（choice / ordering / matching・全問 explanation 必須）。
// ══════════════════════════════════════════

import type { Domain, Unit, UnitContent } from "@/types/curriculum";

// ── 領域（IT 3領域。it 各学年で同一 id・同一表示名で整合させる前提） ──
// 表示名(name)はカタカナ/ひらがな主体（ルビ不要・全学年で共有しやすい）。

export const itG5Domains: Domain[] = [
  { id: "it.computer-basics", subjectId: "it", name: "コンピュータのきほん", formalName: "コンピュータの基本" },
  { id: "it.algorithm", subjectId: "it", name: "アルゴリズム", formalName: "アルゴリズム" },
  { id: "it.programming", subjectId: "it", name: "プログラミング", formalName: "プログラミング" },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo）。将来の it.g4 / it.g6 や 算数の順序・論理 Unit と接続
// （バリデータが最終的に参照解決を検査。it.g4 / it.g6 の slug は中央で命名調整の可能性あり＝申し送り）。
//
//   data-storage ─┬─▶ info-safety
//                 └─▶ variables ─▶ loop-condition ─▶ debug
//   flowchart ────┬─▶ sort-search
//                 └─▶ loop-condition
//
const U = {
  dataStorage: "it.g5.data-storage",
  infoSafety: "it.g5.info-safety",
  flowchart: "it.g5.flowchart",
  sortSearch: "it.g5.sort-search",
  variables: "it.g5.variables",
  loopCondition: "it.g5.loop-condition",
  debug: "it.g5.debug",
} as const;

export const itG5Units: Unit[] = [
  {
    id: U.dataStorage,
    subjectId: "it",
    grade: 5,
    domainId: "it.computer-basics",
    title: "データと{記憶|きおく}（ビット・バイト）",
    order: 1,
    realWorldUse:
      "スマホの しゃしんや ゲームの セーブデータが どれくらいの{大|おお}きさか（ギガ）を{考|かんが}えるときに{役|やく}だつよ。",
    leadsTo: [U.infoSafety, U.variables],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.infoSafety,
    subjectId: "it",
    grade: 5,
    domainId: "it.computer-basics",
    title: "{情報|じょうほう}モラルと{安全|あんぜん}",
    order: 2,
    realWorldUse:
      "スマホで パスワードを つくったり、SNS や ゲームで{知|し}らない人と やりとりする ときに、{自分|じぶん}を まもる ために{役|やく}だつよ。",
    leadsTo: ["it.g6.network-security"],
    prerequisites: [U.dataStorage],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.flowchart,
    subjectId: "it",
    grade: 5,
    domainId: "it.algorithm",
    title: "フローチャート（{手順|てじゅん}の{図|ず}）",
    order: 3,
    realWorldUse:
      "ロボットそうじきや{自動|じどう}ドアが「もし〜なら〜する」と どう うごくか、{手順|てじゅん}を{図|ず}で あらわす ときに{役|やく}だつよ。",
    leadsTo: [U.sortSearch, U.loopCondition],
    prerequisites: ["sansuu.g5.multiples-divisors"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sortSearch,
    subjectId: "it",
    grade: 5,
    domainId: "it.algorithm",
    title: "ならべかえと さがす（{効率|こうりつ}）",
    order: 4,
    realWorldUse:
      "ネットで しらべものを する ときや、ゲームの ランキングを{順番|じゅんばん}に ならべる ときに、コンピュータが やっている しごとと おなじだよ。",
    leadsTo: ["it.g6.algorithm-efficiency"],
    prerequisites: [U.flowchart, "sansuu.g5.multiples-divisors"],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.variables,
    subjectId: "it",
    grade: 5,
    domainId: "it.programming",
    title: "{変数|へんすう}（データの はこ）",
    order: 5,
    realWorldUse:
      "ゲームの とくてんや のこり ライフを{数|かぞ}える ところは、ぜんぶ{変数|へんすう}という はこ で データを おぼえているよ。",
    leadsTo: [U.loopCondition],
    prerequisites: [U.dataStorage],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.loopCondition,
    subjectId: "it",
    grade: 5,
    domainId: "it.programming",
    title: "くり{返|かえ}しと{条件|じょうけん}",
    order: 6,
    realWorldUse:
      "ゲームの キャラクターが「ボタンを おしたら ジャンプ」「{敵|てき}に あたったら ミス」と うごくのは、くり{返|かえ}しと{条件|じょうけん}の プログラムだよ。",
    leadsTo: [U.debug, "it.g6.programming-project"],
    prerequisites: [U.variables, U.flowchart],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.debug,
    subjectId: "it",
    grade: 5,
    domainId: "it.programming",
    title: "デバッグ（まちがいさがし）",
    order: 7,
    realWorldUse:
      "アプリや ゲームが おかしな うごきを する とき、どこが まちがいか さがして なおす しごと（デバッグ）に つながるよ。",
    leadsTo: ["it.g6.programming-project"],
    prerequisites: [U.loopCondition],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 全テキストはルビ記法。test は choice / ordering / matching を活用・全問 explanation 必須。

export const itG5Contents: Record<string, UnitContent> = {
  // ── 1. データと記憶（ビット・バイト） ──
  [U.dataStorage]: {
    unitId: U.dataStorage,
    learn: {
      unitId: U.dataStorage,
      steps: [
        {
          heading: "コンピュータは 0 と 1 で おぼえる",
          body: "コンピュータの{中|なか}では、すべての データを 0 と 1 の ２つの{数|かず}だけで あらわすよ。この 0 か 1 ひとつぶんを「ビット」と いうよ。",
          visual: { kind: "emoji", value: "0️⃣1️⃣", caption: "0 と 1（ビット）" },
        },
        {
          heading: "ビットが あつまって バイト",
          body: "ビットが ８こ あつまると「１バイト」に なるよ。{文字|もじ}１つは だいたい １〜３バイトで あらわせるよ。バイトが あつまると キロバイト・メガバイト・ギガバイトと{大|おお}きく なるよ。",
          visual: { kind: "emoji", value: "🔢➡️🔡", caption: "8ビット = 1バイト" },
        },
        {
          heading: "きおくする ばしょ",
          body: "データを ためて おく ところを「メモリ」や「ストレージ」と いうよ。スマホの しゃしんや ゲームの セーブは ストレージに{記憶|きおく}されるよ。",
          visual: { kind: "emoji", value: "💾📱", caption: "データをためる" },
        },
      ],
    },
    test: {
      unitId: U.dataStorage,
      questionCount: 5,
      questions: [
        {
          id: `${U.dataStorage}.q-1`,
          unitId: U.dataStorage,
          prompt: "コンピュータは データを なにで あらわす?",
          explanation: "コンピュータは すべてを 0 と 1 の ２つの{数|かず}だけで あらわすよ。",
          format: "choice",
          choices: ["0 と 1", "1 から 10", "あ から ん", "あか と あお"],
          answer: "0 と 1",
        },
        {
          id: `${U.dataStorage}.q-2`,
          unitId: U.dataStorage,
          prompt: "0 か 1 ひとつぶんの{大|おお}きさを なんという?",
          explanation: "0 か 1 ひとつぶんを「ビット」と いうよ。データの いちばん ちいさな たんいだよ。",
          format: "choice",
          choices: ["ビット", "メートル", "グラム", "リットル"],
          answer: "ビット",
        },
        {
          id: `${U.dataStorage}.q-3`,
          unitId: U.dataStorage,
          prompt: "ビットが{何|なん}こ あつまると 1バイトに なる?",
          explanation: "ビットが ８こ あつまると 1バイトに なるよ。",
          format: "choice",
          choices: ["8こ", "2こ", "10こ", "100こ"],
          answer: "8こ",
        },
        {
          id: `${U.dataStorage}.q-4`,
          unitId: U.dataStorage,
          prompt: "つぎの データの たんいを、ちいさい じゅんに ならべよう。",
          explanation: "ちいさい じゅんは バイト → キロバイト → メガバイト → ギガバイト だよ。ギガが いちばん{大|おお}きいよ。",
          format: "ordering",
          items: ["メガバイト", "バイト", "ギガバイト", "キロバイト"],
          answerOrder: [1, 3, 0, 2],
        },
        {
          id: `${U.dataStorage}.q-5`,
          unitId: U.dataStorage,
          prompt: "ことばと いみを{正|ただ}しく むすぼう。",
          explanation: "ビット=0か1ひとつ、バイト=8ビット、ストレージ=データをためる ところ、だよ。",
          format: "matching",
          left: ["ビット", "バイト", "ストレージ"],
          right: ["データを ためて おく ところ", "0 か 1 ひとつぶん", "8ビット ぶん"],
          answerPairs: [1, 2, 0],
        },
      ],
    },
  },

  // ── 2. 情報モラルと安全 ──
  [U.infoSafety]: {
    unitId: U.infoSafety,
    learn: {
      unitId: U.infoSafety,
      steps: [
        {
          heading: "パスワードは かぎ",
          body: "パスワードは{自分|じぶん}だけの「かぎ」だよ。たんじょうびや「1234」の ような かんたんな ものは あぶないよ。{長|なが}くて{他人|たにん}に わからない ものに しよう。",
          visual: { kind: "emoji", value: "🔑🔒", caption: "パスワードはかぎ" },
        },
        {
          heading: "{個人情報|こじんじょうほう}は まもる",
          body: "{名前|なまえ}・じゅうしょ・{学校|がっこう}・{電話番号|でんわばんごう}などは{大切|たいせつ}な{個人情報|こじんじょうほう}。ネットで{知|し}らない人に おしえては いけないよ。",
          visual: { kind: "emoji", value: "🙅📛", caption: "個人情報を守る" },
        },
        {
          heading: "ネットの マナー",
          body: "{相手|あいて}の{顔|かお}が{見|み}えなくても、その{先|さき}には人が いるよ。わるぐちや うそを かかない、こまったら おとなに そうだんする、が たいせつだよ。",
          visual: { kind: "emoji", value: "💬🤝", caption: "やさしいやりとり" },
        },
      ],
    },
    test: {
      unitId: U.infoSafety,
      questionCount: 5,
      questions: [
        {
          id: `${U.infoSafety}.q-1`,
          unitId: U.infoSafety,
          prompt: "{安全|あんぜん}な パスワードは どれ?",
          explanation: "たんじょうびや「1234」「password」は すぐ ばれて あぶないよ。{長|なが}くて バラバラな ものが{安全|あんぜん}だよ。",
          format: "choice",
          choices: ["Tora7!kumo29", "1234", "じぶんの たんじょうび", "password"],
          answer: "Tora7!kumo29",
        },
        {
          id: `${U.infoSafety}.q-2`,
          unitId: U.infoSafety,
          prompt: "ネットで{知|し}らない人に おしえては いけない ものは?",
          explanation: "{名前|なまえ}・じゅうしょ・{学校|がっこう}などの{個人情報|こじんじょうほう}は{知|し}らない人に おしえては だめだよ。",
          format: "choice",
          choices: ["{自分|じぶん}の じゅうしょや{学校|がっこう}", "すきな{色|いろ}", "すきな ゲームの ジャンル", "きょうの てんき"],
          answer: "{自分|じぶん}の じゅうしょや{学校|がっこう}",
        },
        {
          id: `${U.infoSafety}.q-3`,
          unitId: U.infoSafety,
          prompt: "ネットで いやな メッセージが きた とき、いちばん よい こうどうは?",
          explanation: "{自分|じぶん}だけで なやまず、おうちの人や{先生|せんせい}など おとなに そうだんしようね。",
          format: "choice",
          choices: ["おとなに そうだんする", "やりかえして わるぐちを かく", "{自分|じぶん}だけで がまんする", "もっと{個人情報|こじんじょうほう}を{送|おく}る"],
          answer: "おとなに そうだんする",
        },
        {
          id: `${U.infoSafety}.q-4`,
          unitId: U.infoSafety,
          prompt: "ネットの マナーとして{正|ただ}しいのは?",
          explanation: "{相手|あいて}の{顔|かお}が{見|み}えなくても{先|さき}には人が いるよ。やさしい ことばで やりとりしよう。",
          format: "choice",
          choices: ["{相手|あいて}を おもいやって かく", "うそを ひろめる", "わるぐちを かく", "へんじを むしして あおる"],
          answer: "{相手|あいて}を おもいやって かく",
        },
        {
          id: `${U.infoSafety}.q-5`,
          unitId: U.infoSafety,
          prompt: "やって よい こと と、いけない こと を{正|ただ}しく むすぼう。",
          explanation: "パスワードは ひみつ、{個人情報|こじんじょうほう}は まもる、こまったら そうだん、が{正|ただ}しい こうどうだよ。",
          format: "matching",
          left: ["パスワード", "{知|し}らない人への{個人情報|こじんじょうほう}", "こまった とき"],
          right: ["おとなに そうだんする", "{他人|たにん}に おしえない（ひみつ）", "おしえない"],
          answerPairs: [1, 2, 0],
        },
      ],
    },
  },

  // ── 3. フローチャート（手順の図） ──
  [U.flowchart]: {
    unitId: U.flowchart,
    learn: {
      unitId: U.flowchart,
      steps: [
        {
          heading: "{手順|てじゅん}を{図|ず}に する",
          body: "やる ことを{順番|じゅんばん}に ならべて、{図|ず}に あらわした ものを「フローチャート」と いうよ。コンピュータに しごとを たのむ ときの せっけいずだよ。",
          visual: { kind: "emoji", value: "⬜➡️⬜➡️⬜", caption: "じゅんばんにつなぐ" },
        },
        {
          heading: "「もし〜なら」の わかれみち",
          body: "ひしがたの{記号|きごう}は「もし〜なら」と わかれる ところ。はい か いいえ で すすむ みちが かわるよ。{条件|じょうけん}で うごきを かえられるよ。",
          visual: { kind: "emoji", value: "🔶↙️↘️", caption: "はい / いいえ" },
        },
        {
          heading: "あさの したくで{練習|れんしゅう}",
          body: "「おきる → かおを あらう → ごはんを たべる → でかける」の ように、まいにちの こうどうも フローチャートで かけるよ。",
          visual: { kind: "emoji", value: "⏰🧼🍚🎒", caption: "あさのてじゅん" },
        },
      ],
    },
    test: {
      unitId: U.flowchart,
      questionCount: 5,
      questions: [
        {
          id: `${U.flowchart}.q-1`,
          unitId: U.flowchart,
          prompt: "フローチャートとは なに?",
          explanation: "フローチャートは{手順|てじゅん}を{順番|じゅんばん}に{図|ず}で あらわした ものだよ。",
          format: "choice",
          choices: ["{手順|てじゅん}を{図|ず}で あらわした もの", "ゲームの なまえ", "けいさんの こたえ", "うたの かしわ"],
          answer: "{手順|てじゅん}を{図|ず}で あらわした もの",
        },
        {
          id: `${U.flowchart}.q-2`,
          unitId: U.flowchart,
          prompt: "「もし〜なら」と みちが わかれる{記号|きごう}の かたちは?",
          explanation: "ひしがた（◇）は「もし〜なら」の わかれみち（はい／いいえ）を あらわすよ。",
          format: "choice",
          choices: ["ひしがた（◇）", "まる（〇）だけ", "さんかく（△）", "ほし（☆）"],
          answer: "ひしがた（◇）",
        },
        {
          id: `${U.flowchart}.q-3`,
          unitId: U.flowchart,
          prompt: "あさの したくの{手順|てじゅん}を、ただしい{順番|じゅんばん}に ならべよう。",
          explanation: "おきる → かおを あらう → ごはんを たべる → でかける、の{順番|じゅんばん}だよ。",
          format: "ordering",
          items: ["ごはんを たべる", "おきる", "でかける", "かおを あらう"],
          answerOrder: [1, 3, 0, 2],
        },
        {
          id: `${U.flowchart}.q-4`,
          unitId: U.flowchart,
          prompt: "カレーを つくる{手順|てじゅん}を、ただしい{順番|じゅんばん}に ならべよう。",
          explanation: "やさいを きる → いためる → みずで にる → ルウを{入|い}れる、の{順番|じゅんばん}だよ。",
          format: "ordering",
          items: ["ルウを{入|い}れる", "やさいを きる", "みずで にる", "いためる"],
          answerOrder: [1, 3, 2, 0],
        },
        {
          id: `${U.flowchart}.q-5`,
          unitId: U.flowchart,
          prompt: "フローチャートで「もし あめ なら かさを もつ」は どの{記号|きごう}を つかう?",
          explanation: "「もし〜なら」は{条件|じょうけん}の わかれみちなので、ひしがた（◇）を つかうよ。",
          format: "choice",
          choices: ["ひしがた（◇）の わかれみち", "ながしかくの しょり", "やじるしだけ", "まるの はじまり"],
          answer: "ひしがた（◇）の わかれみち",
        },
      ],
    },
  },

  // ── 4. ならべかえと さがす（効率） ──
  [U.sortSearch]: {
    unitId: U.sortSearch,
    learn: {
      unitId: U.sortSearch,
      steps: [
        {
          heading: "ならべかえ（ソート）",
          body: "ばらばらの{数|かず}を、ちいさい じゅん や{大|おお}きい じゅんに ならべる ことを「ならべかえ（ソート）」と いうよ。ランキングや{名前|なまえ}の あいうえお{順|じゅん}も ソートだよ。",
          visual: { kind: "emoji", value: "🔀➡️📊", caption: "じゅんばんにする" },
        },
        {
          heading: "さがす（サーチ）",
          body: "たくさんの データの 中から ほしい ものを{見|み}つける ことを「さがす（サーチ）」と いうよ。ネットの けんさくも おなじ しくみだよ。",
          visual: { kind: "emoji", value: "🔍📚", caption: "ほしいものをさがす" },
        },
        {
          heading: "はやい{手順|てじゅん}・おそい{手順|てじゅん}",
          body: "おなじ ことでも、{手順|てじゅん}に よって はやさが ちがうよ。まんなかから さがす ほうほうは、はしから 1こずつ さがすより ずっと はやいよ。これを「{効率|こうりつ}」と いうよ。",
          visual: { kind: "emoji", value: "🐢🐇", caption: "はやい・おそい" },
        },
      ],
    },
    test: {
      unitId: U.sortSearch,
      questionCount: 5,
      questions: [
        {
          id: `${U.sortSearch}.q-1`,
          unitId: U.sortSearch,
          prompt: "ばらばらの{数|かず}を{順番|じゅんばん}に ならべる ことを なんという?",
          explanation: "ちいさい じゅんや{大|おお}きい じゅんに ならべる ことを「ならべかえ（ソート）」と いうよ。",
          format: "choice",
          choices: ["ならべかえ（ソート）", "けいさん", "コピー", "デバッグ"],
          answer: "ならべかえ（ソート）",
        },
        {
          id: `${U.sortSearch}.q-2`,
          unitId: U.sortSearch,
          prompt: "5、2、8、1 を ちいさい じゅんに ならべよう。",
          explanation: "ちいさい じゅんは 1 → 2 → 5 → 8 だよ。",
          format: "ordering",
          items: ["5", "2", "8", "1"],
          answerOrder: [3, 1, 0, 2],
        },
        {
          id: `${U.sortSearch}.q-3`,
          unitId: U.sortSearch,
          prompt: "たくさんの 中から ほしい データを{見|み}つける ことを なんという?",
          explanation: "ほしい ものを{見|み}つける ことを「さがす（サーチ）」と いうよ。ネットの けんさくも これだよ。",
          format: "choice",
          choices: ["さがす（サーチ）", "ならべかえ", "ほぞん", "いんさつ"],
          answer: "さがす（サーチ）",
        },
        {
          id: `${U.sortSearch}.q-4`,
          unitId: U.sortSearch,
          prompt: "1 から 100 の カードから あたりを さがす とき、はやいのは どっち?",
          explanation: "まんなかから「{大|おお}きい? ちいさい?」と しらべて はんぶんに へらす ほうが ずっと はやいよ（こうりつが よい）。",
          format: "choice",
          choices: ["まんなかから しらべて はんぶんに へらす", "1から じゅんに 1まいずつ", "うしろから 1まいずつ", "てきとうに ずっと めくる"],
          answer: "まんなかから しらべて はんぶんに へらす",
        },
        {
          id: `${U.sortSearch}.q-5`,
          unitId: U.sortSearch,
          prompt: "ことばと いみを{正|ただ}しく むすぼう。",
          explanation: "ソート=ならべかえ、サーチ=さがす、{効率|こうりつ}=はやさ・むだの すくなさ、だよ。",
          format: "matching",
          left: ["ソート", "サーチ", "{効率|こうりつ}"],
          right: ["さがす こと", "はやさ・むだの すくなさ", "ならべかえる こと"],
          answerPairs: [2, 0, 1],
        },
      ],
    },
  },

  // ── 5. 変数（データのはこ） ──
  [U.variables]: {
    unitId: U.variables,
    learn: {
      unitId: U.variables,
      steps: [
        {
          heading: "{変数|へんすう}は データの はこ",
          body: "プログラムで{数|かず}や ことばを おぼえて おく「はこ」を{変数|へんすう}と いうよ。はこに{名前|なまえ}を つけて、{中|なか}に データを{入|い}れて つかうよ。",
          visual: { kind: "emoji", value: "📦🔢", caption: "なまえのついたはこ" },
        },
        {
          heading: "{中身|なかみ}を かえられる",
          body: "{変数|へんすう}の{中身|なかみ}は あとから かえられるよ。たとえば「とくてん」という はこを 0 から はじめて、あたるたびに 1 ふやして いくよ。",
          visual: { kind: "emoji", value: "0️⃣➡️🔟", caption: "とくてんがふえる" },
        },
        {
          heading: "ゲームで つかう{変数|へんすう}",
          body: "「ライフ」「コイン」「レベル」なども ぜんぶ{変数|へんすう}。プログラムは{変数|へんすう}の{中身|なかみ}を{見|み}て、{画面|がめん}に{数|かず}を{表示|ひょうじ}するよ。",
          visual: { kind: "emoji", value: "❤️🪙⭐", caption: "ゲームのデータ" },
        },
      ],
    },
    test: {
      unitId: U.variables,
      questionCount: 5,
      questions: [
        {
          id: `${U.variables}.q-1`,
          unitId: U.variables,
          prompt: "{変数|へんすう}とは なに?",
          explanation: "{変数|へんすう}は{数|かず}や ことばを おぼえて おく「データの はこ」だよ。",
          format: "choice",
          choices: ["データを おぼえて おく はこ", "けいさんきの ボタン", "{画面|がめん}の{色|いろ}", "インターネット"],
          answer: "データを おぼえて おく はこ",
        },
        {
          id: `${U.variables}.q-2`,
          unitId: U.variables,
          prompt: "「とくてん」という{変数|へんすう}が 5 の とき、あたって 3 ふえると いくつ?",
          explanation: "5 に 3 を たすので 5 + 3 = 8 に なるよ。{変数|へんすう}の{中身|なかみ}は かわるよ。",
          format: "choice",
          choices: ["8", "5", "3", "53"],
          answer: "8",
        },
        {
          id: `${U.variables}.q-3`,
          unitId: U.variables,
          prompt: "{変数|へんすう}の{中身|なかみ}に ついて{正|ただ}しいのは?",
          explanation: "{変数|へんすう}の{中身|なかみ}は あとから なんども かえる ことが できるよ。",
          format: "choice",
          choices: ["あとから かえられる", "ぜったいに かえられない", "{数|かず}しか{入|はい}らない", "1かいしか つかえない"],
          answer: "あとから かえられる",
        },
        {
          id: `${U.variables}.q-4`,
          unitId: U.variables,
          prompt: "「コイン」を 0 から はじめて、3こ・2こ・5こ ひろう{命令|めいれい}を{順|じゅん}に じっこうした。さいごは いくつ?",
          explanation: "0 + 3 + 2 + 5 = 10。{変数|へんすう}コインは じゅんばんに ふえて さいごは 10 だよ。",
          format: "choice",
          choices: ["10", "5", "8", "0"],
          answer: "10",
        },
        {
          id: `${U.variables}.q-5`,
          unitId: U.variables,
          prompt: "ゲームの データと、はいる{変数|へんすう}を{正|ただ}しく むすぼう。",
          explanation: "のこり{命|いのち}=ライフ、もっている お{金|かね}=コイン、つよさの だんかい=レベル、だよ。",
          format: "matching",
          left: ["ライフ", "コイン", "レベル"],
          right: ["もっている お{金|かね}の{数|かず}", "のこり{命|いのち}の{数|かず}", "つよさの だんかい"],
          answerPairs: [1, 0, 2],
        },
      ],
    },
  },

  // ── 6. くり返しと条件 ──
  [U.loopCondition]: {
    unitId: U.loopCondition,
    learn: {
      unitId: U.loopCondition,
      steps: [
        {
          heading: "くり{返|かえ}し（ループ）",
          body: "おなじ{命令|めいれい}を{何回|なんかい}も する とき、「10かい くり{返|かえ}す」と いっぺんに かけるよ。これを ループと いうよ。おなじ ことを{何度|なんど}も かかなくて すむよ。",
          visual: { kind: "emoji", value: "🔁", caption: "くりかえす" },
        },
        {
          heading: "{条件|じょうけん}（もし〜なら）",
          body: "「もし ボタンが おされたら ジャンプする」の ように、ようすに よって うごきを かえる ことを{条件|じょうけん}（もし〜なら）と いうよ。",
          visual: { kind: "emoji", value: "❓➡️🦘", caption: "もし〜なら" },
        },
        {
          heading: "くみあわせて うごかす",
          body: "くり{返|かえ}しと{条件|じょうけん}を くみあわせると、「{敵|てき}が いる あいだ うちつづける」の ような ふくざつな うごきも つくれるよ。",
          visual: { kind: "emoji", value: "🔁❓👾", caption: "くみあわせ" },
        },
      ],
    },
    test: {
      unitId: U.loopCondition,
      questionCount: 5,
      questions: [
        {
          id: `${U.loopCondition}.q-1`,
          unitId: U.loopCondition,
          prompt: "おなじ{命令|めいれい}を{何回|なんかい}も くり{返|かえ}す しくみを なんという?",
          explanation: "おなじ ことを くり{返|かえ}す しくみを「ループ（くり{返|かえ}し）」と いうよ。",
          format: "choice",
          choices: ["ループ（くり{返|かえ}し）", "{変数|へんすう}", "デバッグ", "コピー"],
          answer: "ループ（くり{返|かえ}し）",
        },
        {
          id: `${U.loopCondition}.q-2`,
          unitId: U.loopCondition,
          prompt: "「{前|まえ}に すすむ」を 4かい くり{返|かえ}すと、なんマス すすむ?",
          explanation: "1マスを 4かい くり{返|かえ}すので、4マス すすむよ。",
          format: "choice",
          choices: ["4マス", "1マス", "8マス", "0マス"],
          answer: "4マス",
        },
        {
          id: `${U.loopCondition}.q-3`,
          unitId: U.loopCondition,
          prompt: "「もし あめ なら かさを もつ」。きょうは はれ。どう なる?",
          explanation: "{条件|じょうけん}は「もし あめ なら」。きょうは はれ なので、かさは もたないよ。",
          format: "choice",
          choices: ["かさを もたない", "かさを もつ", "{学校|がっこう}を やすむ", "ながぐつを はく"],
          answer: "かさを もたない",
        },
        {
          id: `${U.loopCondition}.q-4`,
          unitId: U.loopCondition,
          prompt: "「四角を かく」プログラムの{手順|てじゅん}を ただしい{順番|じゅんばん}に ならべよう。",
          explanation: "「まっすぐ すすむ → みぎに まがる」を 4かい くり{返|かえ}すと 四角が かけるよ。さいしょは すすむ、つぎに まがる、を くり{返|かえ}すよ。",
          format: "ordering",
          items: ["「まがる」を する", "4かい くり{返|かえ}す はじまり", "「まっすぐ すすむ」を する", "くり{返|かえ}し おわり"],
          answerOrder: [1, 2, 0, 3],
        },
        {
          id: `${U.loopCondition}.q-5`,
          unitId: U.loopCondition,
          prompt: "くり{返|かえ}しを つかう よさは?",
          explanation: "おなじ{命令|めいれい}を{何度|なんど}も かかずに すみ、プログラムが みじかく わかりやすく なるよ。",
          format: "choice",
          choices: ["おなじ{命令|めいれい}を{何度|なんど}も かかずに すむ", "プログラムが ながく なる", "うごきが おそく なる", "{変数|へんすう}が つかえなく なる"],
          answer: "おなじ{命令|めいれい}を{何度|なんど}も かかずに すむ",
        },
      ],
    },
  },

  // ── 7. デバッグ（まちがいさがし） ──
  [U.debug]: {
    unitId: U.debug,
    learn: {
      unitId: U.debug,
      steps: [
        {
          heading: "バグと デバッグ",
          body: "プログラムの まちがいを「バグ」と いうよ。バグを みつけて なおす ことを「デバッグ」と いうよ。プロの プログラマーも たくさん デバッグするよ。",
          visual: { kind: "emoji", value: "🐛🔧", caption: "バグをなおす" },
        },
        {
          heading: "1つずつ たしかめる",
          body: "どこで おかしく なるか、{命令|めいれい}を{上|うえ}から 1つずつ うごかして たしかめると、まちがいの ばしょが みつけやすいよ。",
          visual: { kind: "emoji", value: "🔎📝", caption: "ひとつずつかくにん" },
        },
        {
          heading: "なおして もういちど",
          body: "まちがいを なおしたら、もう いちど うごかして たしかめよう。{思|おも}った とおりに うごけば デバッグ せいこうだよ。",
          visual: { kind: "emoji", value: "✅🔁", caption: "なおして確認" },
        },
      ],
    },
    test: {
      unitId: U.debug,
      questionCount: 5,
      questions: [
        {
          id: `${U.debug}.q-1`,
          unitId: U.debug,
          prompt: "プログラムの まちがいの ことを なんという?",
          explanation: "プログラムの まちがいを「バグ」と いうよ。むしの ことばが もとに なっているよ。",
          format: "choice",
          choices: ["バグ", "ループ", "データ", "メモリ"],
          answer: "バグ",
        },
        {
          id: `${U.debug}.q-2`,
          unitId: U.debug,
          prompt: "バグを みつけて なおす ことを なんという?",
          explanation: "まちがい（バグ）を みつけて なおす ことを「デバッグ」と いうよ。",
          format: "choice",
          choices: ["デバッグ", "セーブ", "コピー", "ログイン"],
          answer: "デバッグ",
        },
        {
          id: `${U.debug}.q-3`,
          unitId: U.debug,
          prompt: "「3を たす」べき ところが「3を ひく」に なっていた。とくてんが あわない りゆうは?",
          explanation: "「たす」を「ひく」と かいた まちがい（バグ）だよ。+ に なおせば{正|ただ}しく うごくよ。",
          format: "choice",
          choices: ["「たす」を「ひく」と まちがえた", "ゲームが こわれた", "コンピュータの でんき", "{画面|がめん}の{色|いろ}"],
          answer: "「たす」を「ひく」と まちがえた",
        },
        {
          id: `${U.debug}.q-4`,
          unitId: U.debug,
          prompt: "バグを みつける よい ほうほうは?",
          explanation: "{命令|めいれい}を{上|うえ}から 1つずつ うごかして、どこで おかしく なるか たしかめると みつけやすいよ。",
          format: "choice",
          choices: ["{命令|めいれい}を 1つずつ たしかめる", "ぜんぶ けして やめる", "{目|め}を とじて まつ", "もっと{命令|めいれい}を ふやす"],
          answer: "{命令|めいれい}を 1つずつ たしかめる",
        },
        {
          id: `${U.debug}.q-5`,
          unitId: U.debug,
          prompt: "デバッグの{手順|てじゅん}を ただしい{順番|じゅんばん}に ならべよう。",
          explanation: "まちがいを みつける → なおす → もういちど うごかして たしかめる、の{順番|じゅんばん}だよ。",
          format: "ordering",
          items: ["なおす", "まちがいを みつける", "もういちど うごかして たしかめる"],
          answerOrder: [1, 0, 2],
        },
      ],
    },
  },
};
