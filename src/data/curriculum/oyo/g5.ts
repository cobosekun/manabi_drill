// ══════════════════════════════════════════
// カリキュラム: 応用（おうよう）小5 — 大学レベルの概念をやさしく・手を動かして
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId("oyo") / 領域 = "oyo.<domain-slug>"
//          単元 = "oyo.g5.<slug>"
// 応用4段ルール: 各 learn は ①身近な具体 → ②図操作で体感 → ③きまり発見 → ④やってみる の4ステップ。
// 全表示テキストは漢字＋全漢字ルビ記法 {漢字|よみ}。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  Question,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────
// ※ index.ts への集約は中央が実施（このファイルでは編集しない）。
//    SubjectId に "oyo" は既に追加済み・theme "violet" も定義済みのため as 回避は不要だった（申し送り済み）。

export const oyoSubject: Subject = {
  id: "oyo",
  name: "おうよう",
  formalName: "応用",
  emoji: "🚀",
  theme: "violet",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────

export const oyoG5Domains: Domain[] = [
  {
    id: "oyo.number-magic",
    subjectId: "oyo",
    name: "すうのふしぎ",
    formalName: "数の世界",
  },
  {
    id: "oyo.data-chance",
    subjectId: "oyo",
    name: "データとかくりつ",
    formalName: "データと確率",
  },
  {
    id: "oyo.logic-step",
    subjectId: "oyo",
    name: "ろんりとてじゅん",
    formalName: "論理と手順",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。算数の既存単元にも接続）:
//
//   sansuu.g1.numbers-to-20 ──┬─▶ binary ──▶ algorithm ──┐
//                             ├─▶ primes-cipher ─────────┴─▶ sequences
//                             └─▶ probability ──▶ statistics
//
const U = {
  binary: "oyo.g5.binary",
  primesCipher: "oyo.g5.primes-cipher",
  probability: "oyo.g5.probability",
  statistics: "oyo.g5.statistics",
  algorithm: "oyo.g5.algorithm",
  sequences: "oyo.g5.sequences",
} as const;

// 算数の既存単元（前提として参照。集約時に解決される）
const SANSUU = {
  numbersTo20: "sansuu.g1.numbers-to-20",
  addWithin10: "sansuu.g1.add-within-10",
} as const;

export const oyoG5Units: Unit[] = [
  {
    id: U.binary,
    subjectId: "oyo",
    grade: 5,
    domainId: "oyo.number-magic",
    title: "{二進法|にしんほう}（0と1のすうじ）",
    order: 1,
    realWorldUse:
      "コンピュータや スマホは、{電気|でんき}の オン(1)と オフ(0)だけで すべての すうじや もじを あらわしているよ。{二進法|にしんほう}は そのしくみの もとだよ。",
    leadsTo: [U.algorithm],
    prerequisites: [SANSUU.numbersTo20],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.primesCipher,
    subjectId: "oyo",
    grade: 5,
    domainId: "oyo.number-magic",
    title: "{素数|そすう}と{暗号|あんごう}",
    order: 2,
    realWorldUse:
      "インターネットで パスワードや クレジットカードを まもる{暗号|あんごう}は、おおきな{素数|そすう}の かけ{算|ざん}を つかっているよ。{素数|そすう}は ひみつを まもる かぎだよ。",
    leadsTo: [U.sequences],
    prerequisites: [SANSUU.numbersTo20],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.probability,
    subjectId: "oyo",
    grade: 5,
    domainId: "oyo.data-chance",
    title: "{確率|かくりつ}（{起|お}こりやすさ）",
    order: 3,
    realWorldUse:
      "あしたの あめの ふりやすさ（こうすいかくりつ）や、ゲームの あたりやすさは {確率|かくりつ}で あらわすよ。{保険|ほけん}や {天気|てんき}よほうでも つかわれているよ。",
    leadsTo: [U.statistics],
    prerequisites: [SANSUU.numbersTo20],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.statistics,
    subjectId: "oyo",
    grade: 5,
    domainId: "oyo.data-chance",
    title: "{統計|とうけい}（データを{読|よ}む）",
    order: 4,
    realWorldUse:
      "テストの {平均点|へいきんてん}や、クラスの すきな たべものしらべは {統計|とうけい}だよ。お{店|みせ}の うれゆきや くにの 人{口|こう}しらべにも つかうよ。",
    leadsTo: [],
    prerequisites: [U.probability, SANSUU.addWithin10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.algorithm,
    subjectId: "oyo",
    grade: 5,
    domainId: "oyo.logic-step",
    title: "アルゴリズム（てじゅんの{科学|かがく}）",
    order: 5,
    realWorldUse:
      "けんさくや カーナビの みちあんないは、コンピュータが はやく こたえを みつける「アルゴリズム（{手順|てじゅん}）」で うごいているよ。",
    leadsTo: [U.sequences],
    prerequisites: [U.binary],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sequences,
    subjectId: "oyo",
    grade: 5,
    domainId: "oyo.number-magic",
    title: "{数列|すうれつ}と{規則|きそく}（ふえ{方|かた}のきまり）",
    order: 6,
    realWorldUse:
      "うずまきの かいがらや、はなびらの かずには {数列|すうれつ}の きまり（フィボナッチ）が かくれているよ。きまりが わかると {次|つぎ}を よそうできるよ。",
    leadsTo: [],
    prerequisites: [U.primesCipher, U.algorithm],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn[応用4段] + テスト test[全問 explanation]） ──────

// 二進法の固定問題（解ける問題に落とす）
const binaryQuestions: Question[] = [
  {
    id: `${U.binary}.q-1`,
    unitId: U.binary,
    format: "choice",
    prompt: "{電気|でんき}の オン/オフ 💡⚫💡💡 は 1011。これを ふつうの すうじ（{十進法|じっしんほう}）に なおすと？",
    explanation: "{位|くらい}は {右|みぎ}から 1,2,4,8 だよ。1011 は 8＋0＋2＋1＝11 になるよ。",
    visual: { kind: "emoji", value: "💡⚫💡💡", caption: "1011" },
    choices: ["11", "8", "1011", "101"],
    answer: "11",
  },
  {
    id: `${U.binary}.q-2`,
    unitId: U.binary,
    format: "choice",
    prompt: "6 を {二進法|にしんほう}（0と1）で あらわすと？",
    explanation: "6 は 4＋2 だね。8の{位|くらい}は なし、4と2は あり、1は なし → 110 だよ。",
    choices: ["110", "101", "011", "100"],
    answer: "110",
  },
  {
    id: `${U.binary}.q-3`,
    unitId: U.binary,
    format: "number-input",
    prompt: "{二進法|にしんほう}の 100 は ふつうの すうじで いくつ？",
    explanation: "{右|みぎ}から 1,2,4 の{位|くらい}。100 は 4の{位|くらい}だけ あるので 4 だよ。",
    answer: 4,
  },
  {
    id: `${U.binary}.q-4`,
    unitId: U.binary,
    format: "number-input",
    prompt: "{二進法|にしんほう}の 111 は ふつうの すうじで いくつ？",
    explanation: "4＋2＋1＝7。111 は ぜんぶの{位|くらい}が ついているので 7 だよ。",
    answer: 7,
  },
  {
    id: `${U.binary}.q-5`,
    unitId: U.binary,
    format: "ordering",
    prompt: "{二進法|にしんほう}の {位|くらい}（{右|みぎ}から）を ちいさいじゅんに ならべよう。",
    explanation: "{二進法|にしんほう}の{位|くらい}は {右|みぎ}から 2{倍|ばい}ずつ おおきくなるよ：1→2→4→8。",
    items: ["8", "1", "4", "2"],
    answerOrder: [1, 3, 2, 0],
  },
  {
    id: `${U.binary}.q-6`,
    unitId: U.binary,
    format: "choice",
    prompt: "5 を {二進法|にしんほう}で あらわすと？",
    explanation: "5 は 4＋1 だね。4と1は あり、2は なし → 101 だよ。",
    choices: ["101", "110", "011", "111"],
    answer: "101",
  },
];

// 素数と暗号の固定問題
const primesQuestions: Question[] = [
  {
    id: `${U.primesCipher}.q-1`,
    unitId: U.primesCipher,
    format: "choice",
    prompt: "{次|つぎ}のうち {素数|そすう}（1と じぶんでしか われない{数|かず}）は どれ？",
    explanation: "7 は 1と7でしか われないので {素数|そすう}。9＝3×3、15＝3×5、21＝3×7 で われるよ。",
    choices: ["7", "9", "15", "21"],
    answer: "7",
  },
  {
    id: `${U.primesCipher}.q-2`,
    unitId: U.primesCipher,
    format: "choice",
    prompt: "12 を きれいな {長方形|ちょうほうけい}に ならべられない ならべ{方|かた}は どれ？",
    explanation: "12＝2×6＝3×4＝1×12 で ならべられるよ。5の だんには われないので 5×□ は むり。",
    visual: { kind: "emoji", value: "🟪🟪🟪🟪\n🟪🟪🟪🟪\n🟪🟪🟪🟪", caption: "3×4＝12" },
    choices: ["5こずつ", "2こずつ", "3こずつ", "4こずつ"],
    answer: "5こずつ",
  },
  {
    id: `${U.primesCipher}.q-3`,
    unitId: U.primesCipher,
    format: "ordering",
    prompt: "{素数|そすう}を ちいさいじゅんに 4つ ならべよう。",
    explanation: "ちいさい {素数|そすう}は 2,3,5,7 だよ。4は2×2、6は2×3なので {素数|そすう}じゃないよ。",
    items: ["5", "2", "7", "3"],
    answerOrder: [1, 3, 0, 2],
  },
  {
    id: `${U.primesCipher}.q-4`,
    unitId: U.primesCipher,
    format: "number-input",
    prompt: "15 を {素数|そすう}の かけ{算|ざん}で あらわすと 3×□。□は いくつ？",
    explanation: "15＝3×5。3も5も {素数|そすう}だね。これが {暗号|あんごう}の もとになる「{素因数分解|そいんすうぶんかい}」だよ。",
    answer: 5,
  },
  {
    id: `${U.primesCipher}.q-5`,
    unitId: U.primesCipher,
    format: "matching",
    prompt: "それぞれの {数|かず}が {素数|そすう}か どうか むすぼう。",
    explanation: "11は1と11だけ→{素数|そすう}。9＝3×3、14＝2×7 は ほかの{数|かず}でも われるので {素数|そすう}じゃないよ。13も1と13だけ→{素数|そすう}。",
    left: ["11", "9", "13", "14"],
    right: ["{素数|そすう}", "{素数|そすう}じゃない"],
    answerPairs: [0, 1, 0, 1],
  },
];

// 確率の固定問題
const probabilityQuestions: Question[] = [
  {
    id: `${U.probability}.q-1`,
    unitId: U.probability,
    format: "choice",
    prompt: "コインを なげて おもてが でる {確率|かくりつ}は？",
    explanation: "おもてと うらの 2とおりで、おもては その1つ。だから 2{分|ぶん}の1（はんぶん）だよ。",
    visual: { kind: "emoji", value: "🪙", caption: "おもて or うら" },
    choices: ["2分の1", "1", "6分の1", "3分の1"],
    answer: "2分の1",
  },
  {
    id: `${U.probability}.q-2`,
    unitId: U.probability,
    format: "choice",
    prompt: "さいころを ふって 3が でる {確率|かくりつ}は？",
    explanation: "さいころの {目|め}は 1〜6 の 6とおり。3は その1つなので 6{分|ぶん}の1 だよ。",
    visual: { kind: "emoji", value: "🎲", caption: "1〜6" },
    choices: ["6分の1", "3分の1", "2分の1", "6分の3"],
    answer: "6分の1",
  },
  {
    id: `${U.probability}.q-3`,
    unitId: U.probability,
    format: "choice",
    prompt: "さいころで {偶数|ぐうすう}（2,4,6）が でる {確率|かくりつ}は？",
    explanation: "{偶数|ぐうすう}は 2,4,6 の 3つ。6とおり{中|ちゅう} 3つだから 6{分|ぶん}の3＝はんぶん だよ。",
    choices: ["2分の1", "6分の1", "3分の1", "6分の2"],
    answer: "2分の1",
  },
  {
    id: `${U.probability}.q-4`,
    unitId: U.probability,
    format: "choice",
    prompt: "あたりが 2{本|ほん}、はずれが 8{本|ほん}の くじ。あたる {確率|かくりつ}は？",
    explanation: "ぜんぶで 10{本|ほん}、あたりは 2{本|ほん}。10{分|ぶん}の2＝5{分|ぶん}の1 だよ。",
    choices: ["5分の1", "2分の1", "10分の8", "8分の2"],
    answer: "5分の1",
  },
  {
    id: `${U.probability}.q-5`,
    unitId: U.probability,
    format: "choice",
    prompt: "いちばん {起|お}こりやすいのは どれ？",
    explanation: "ぜんぶ さいころ1つで、4{以下|いか}（1,2,3,4）が いちばん おおく 4とおり。だから いちばん おこりやすいよ。",
    choices: ["4以下が でる", "6が でる", "1が でる", "5が でる"],
    answer: "4以下が でる",
  },
];

// 統計の固定問題
const statisticsQuestions: Question[] = [
  {
    id: `${U.statistics}.q-1`,
    unitId: U.statistics,
    format: "number-input",
    prompt: "テストの {点数|てんすう} 4, 6, 8 の {平均|へいきん}は？",
    explanation: "{平均|へいきん}＝{合計|ごうけい}÷{個数|こすう}。(4＋6＋8)÷3＝18÷3＝6 だよ。",
    answer: 6,
  },
  {
    id: `${U.statistics}.q-2`,
    unitId: U.statistics,
    format: "number-input",
    prompt: "3人の {身長|しんちょう}が 130, 140, 150cm。{平均|へいきん}は {何|なん}cm？",
    explanation: "(130＋140＋150)÷3＝420÷3＝140cm だよ。{平均|へいきん}は まん{中|なか}くらいの あたいに なるよ。",
    answer: 140,
  },
  {
    id: `${U.statistics}.q-3`,
    unitId: U.statistics,
    format: "choice",
    prompt: "🍎4 🍌2 🍇3 🍊1。いちばん {多|おお}い くだものは？",
    explanation: "{表|ひょう}に すると りんご4が いちばん おおいね。データは {数|かぞ}えて くらべると わかりやすいよ。",
    visual: { kind: "emoji", value: "🍎🍎🍎🍎 🍌🍌 🍇🍇🍇 🍊", caption: "すきな くだもの" },
    choices: ["りんご", "ぶどう", "バナナ", "みかん"],
    answer: "りんご",
  },
  {
    id: `${U.statistics}.q-4`,
    unitId: U.statistics,
    format: "number-input",
    prompt: "🍎4 🍌2 🍇3 🍊1。くだものは ぜんぶで {何|なん}こ？",
    explanation: "4＋2＋3＋1＝10こ。{合計|ごうけい}は それぞれの かずを たすと もとめられるよ。",
    answer: 10,
  },
  {
    id: `${U.statistics}.q-5`,
    unitId: U.statistics,
    format: "choice",
    prompt: "2, 2, 2, 8 の {平均|へいきん}は 3.5。いちばん {多|おお}く でてくる {数|かず}（さいひんち）は？",
    explanation: "2が 3{回|かい} でてくるので さいひんち（いちばん おおい あたい）は 2。{平均|へいきん}とは ちがうことが あるよ。",
    choices: ["2", "8", "3", "4"],
    answer: "2",
  },
];

// アルゴリズムの固定問題
const algorithmQuestions: Question[] = [
  {
    id: `${U.algorithm}.q-1`,
    unitId: U.algorithm,
    format: "ordering",
    prompt: "{数|かず} 3, 1, 2 を ちいさいじゅんに ならべよう（せいれつ）。",
    explanation: "ちいさいものから さがして ならべると 1→2→3。これが「せいれつ（ソート）」の アルゴリズムだよ。",
    items: ["3", "1", "2"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.algorithm}.q-2`,
    unitId: U.algorithm,
    format: "ordering",
    prompt: "カレーを つくる {手順|てじゅん}を ただしい じゅんに ならべよう。",
    explanation: "{材料|ざいりょう}を きる → いためる → にる → できあがり、の じゅん。{手順|てじゅん}を まちがえると うまく できないよ。",
    items: ["にる", "きる", "できあがり", "いためる"],
    answerOrder: [1, 3, 0, 2],
  },
  {
    id: `${U.algorithm}.q-3`,
    unitId: U.algorithm,
    format: "choice",
    prompt: "1〜100 の カードから あるカードを はやく さがすには？（カードは ちいさいじゅん）",
    explanation: "まん{中|なか}を みて おおきいか ちいさいか で はんぶんに へらす「にぶんたんさく」が いちばん はやいよ。",
    choices: ["まん中を みて はんぶんに へらす", "はしから 1まいずつ みる", "てきとうに めくる", "うしろから 1まいずつ みる"],
    answer: "まん中を みて はんぶんに へらす",
  },
  {
    id: `${U.algorithm}.q-4`,
    unitId: U.algorithm,
    format: "choice",
    prompt: "「にぶんたんさく」で 1〜8 から 7 を さがす。さいしょに しらべる まん{中|なか}は どこ？",
    explanation: "まん{中|なか}あたりの 4 を しらべて、7は それより おおきいので {右|みぎ}はんぶんに しぼるよ。",
    choices: ["4あたり", "1", "8", "7"],
    answer: "4あたり",
  },
  {
    id: `${U.algorithm}.q-5`,
    unitId: U.algorithm,
    format: "matching",
    prompt: "やりたいこと と あう アルゴリズムを むすぼう。",
    explanation: "ならべる→せいれつ(ソート)、さがす→たんさく(サーチ)。やりたいことに あった {手順|てじゅん}を えらぶよ。",
    left: ["{数|かず}を ならべる", "ものを さがす"],
    right: ["せいれつ（ソート）", "たんさく（サーチ）"],
    answerPairs: [0, 1],
  },
];

// 数列と規則の固定問題
const sequencesQuestions: Question[] = [
  {
    id: `${U.sequences}.q-1`,
    unitId: U.sequences,
    format: "number-input",
    prompt: "2, 4, 6, 8, □。□に はいる {数|かず}は？",
    explanation: "2ずつ ふえる きまり（とうさ）だね。8の {次|つぎ}は 8＋2＝10 だよ。",
    answer: 10,
  },
  {
    id: `${U.sequences}.q-2`,
    unitId: U.sequences,
    format: "number-input",
    prompt: "1, 1, 2, 3, 5, 8, □。□に はいる {数|かず}は？",
    explanation: "{前|まえ}の 2つを たす きまり（フィボナッチ）。5＋8＝13 だよ。しぜんの かいがらにも あらわれるよ。",
    answer: 13,
  },
  {
    id: `${U.sequences}.q-3`,
    unitId: U.sequences,
    format: "number-input",
    prompt: "1, 3, 5, 7, □。□に はいる {数|かず}は？",
    explanation: "2ずつ ふえる きすう（おどの {数|かず}）。7の {次|つぎ}は 9 だよ。",
    answer: 9,
  },
  {
    id: `${U.sequences}.q-4`,
    unitId: U.sequences,
    format: "choice",
    prompt: "1, 2, 4, 8, 16 の きまりは？",
    explanation: "{前|まえ}の {数|かず}を 2{倍|ばい}している（とうひ）。16の {次|つぎ}は 32 になるよ。",
    choices: ["2倍ずつ ふえる", "2ずつ ふえる", "3ずつ ふえる", "前の2つを たす"],
    answer: "2倍ずつ ふえる",
  },
  {
    id: `${U.sequences}.q-5`,
    unitId: U.sequences,
    format: "ordering",
    prompt: "三角{形|けい}に つむ ●の かず 1, 3, 6, 10（さんかくすう）を ちいさいじゅんに ならべよう。",
    explanation: "1→3→6→10 は つむ だんが ふえる「さんかくすう」。さは 2,3,4 と ふえていくよ。",
    items: ["6", "1", "10", "3"],
    answerOrder: [1, 3, 0, 2],
  },
];

export const oyoG5Contents: Record<string, UnitContent> = {
  [U.binary]: {
    unitId: U.binary,
    learn: {
      unitId: U.binary,
      steps: [
        {
          heading: "① {電気|でんき}の オンと オフ",
          body: "{電球|でんきゅう}は「ついてる」か「きえてる」の 2つしか ないよ。ついてる＝1、きえてる＝0 と きめてみよう。",
          visual: { kind: "emoji", value: "💡＝1　⚫＝0", caption: "オンと オフ" },
        },
        {
          heading: "② {指|ゆび}で かずを つくろう",
          body: "{電球|でんきゅう}を ならべて、それぞれの {位|くらい}に 1,2,4,8 の おおきさを あげるよ。ついてる {位|くらい}の かずを たすと、その かずに なるよ。",
          visual: { kind: "emoji", value: "💡⚫💡＝4＋0＋1＝5", caption: "101 は 5" },
        },
        {
          heading: "③ きまりを みつけよう",
          body: "{位|くらい}は {右|みぎ}から 1,2,4,8 と 2{倍|ばい}ずつ ふえるよ。0と1の ならびだけで、どんな かずも つくれるのが {二進法|にしんほう}だよ。",
          visual: { kind: "emoji", value: "8 4 2 1", caption: "{位|くらい}は 2{倍|ばい}ずつ" },
        },
        {
          heading: "④ やってみよう",
          body: "6 を つくるには？ 6＝4＋2 だから、4と2の {位|くらい}を オン、ほかを オフ → 110 だよ。じぶんでも ためしてみよう。",
          visual: { kind: "emoji", value: "💡💡⚫＝110", caption: "6 は 110" },
        },
      ],
    },
    test: {
      unitId: U.binary,
      questions: binaryQuestions,
      questionCount: 6,
    },
  },

  [U.primesCipher]: {
    unitId: U.primesCipher,
    learn: {
      unitId: U.primesCipher,
      steps: [
        {
          heading: "① おはじきを ならべよう",
          body: "おはじき 6こは 2×3 の {長方形|ちょうほうけい}に きれいに ならぶよ。でも 7こは 1れつにしか ならばないね。",
          visual: { kind: "emoji", value: "⚪⚪⚪\n⚪⚪⚪", caption: "6＝2×3" },
        },
        {
          heading: "② {割|わ}れる かずで わけよう",
          body: "ある かずを われる かず（{約数|やくすう}）で わけてみよう。6は 1,2,3,6 で われる。7は 1と7でしか われないよ。",
          visual: { kind: "emoji", value: "7＝1×7 のみ", caption: "7は ほそながいだけ" },
        },
        {
          heading: "③ {素数|そすう}を みつけよう",
          body: "1と じぶんでしか われない かずを {素数|そすう}と いうよ。2, 3, 5, 7, 11, 13… ふしぎな かずたちだね。",
          visual: { kind: "emoji", value: "2 3 5 7 11 13", caption: "{素数|そすう}のなかま" },
        },
        {
          heading: "④ {暗号|あんごう}を つくろう",
          body: "おおきな かずを {素数|そすう}の かけ{算|ざん}に わけるのは とても むずかしいよ。このむずかしさが、ひみつを まもる {暗号|あんごう}の かぎに なるんだ。15＝3×5 で ためそう。",
          visual: { kind: "emoji", value: "15 ＝ 3 × 5", caption: "{素数|そすう}の かけ{算|ざん}" },
        },
      ],
    },
    test: {
      unitId: U.primesCipher,
      questions: primesQuestions,
      questionCount: 5,
    },
  },

  [U.probability]: {
    unitId: U.probability,
    learn: {
      unitId: U.probability,
      steps: [
        {
          heading: "① さいころと くじ",
          body: "さいころを ふると 1〜6 の どれかが でるね。どれが でるかは やってみないと わからない。これを「{確率|かくりつ}」で かんがえるよ。",
          visual: { kind: "emoji", value: "🎲", caption: "1〜6 の どれか" },
        },
        {
          heading: "② ぜんぶの ばあいを かぞえよう",
          body: "コインは おもてと うらの 2とおり。さいころは 6とおり。おこりうる ぜんぶの かずを まず かぞえるよ。",
          visual: { kind: "emoji", value: "🪙→2とおり　🎲→6とおり", caption: "ぜんぶの かず" },
        },
        {
          heading: "③ きまりを みつけよう",
          body: "{確率|かくりつ}＝（あたりの かず）÷（ぜんぶの かず）だよ。さいころで 3が でるのは 6{分|ぶん}の1。おおいほど おこりやすいね。",
          visual: { kind: "emoji", value: "3が でる ＝ 1 ÷ 6", caption: "6{分|ぶん}の1" },
        },
        {
          heading: "④ やってみよう",
          body: "さいころで {偶数|ぐうすう}（2,4,6）が でる {確率|かくりつ}は？ あたりは 3つ、ぜんぶは 6つ → 6{分|ぶん}の3＝はんぶん だよ。",
          visual: { kind: "emoji", value: "2 4 6 ＝ 3つ", caption: "6{分|ぶん}の3" },
        },
      ],
    },
    test: {
      unitId: U.probability,
      questions: probabilityQuestions,
      questionCount: 5,
    },
  },

  [U.statistics]: {
    unitId: U.statistics,
    learn: {
      unitId: U.statistics,
      steps: [
        {
          heading: "① データを あつめよう",
          body: "クラスの すきな くだものを ひとりずつ きいて あつめるよ。あつめた かずが「データ」だよ。",
          visual: { kind: "emoji", value: "🍎🍌🍇🍊", caption: "すきな くだもの" },
        },
        {
          heading: "② {表|ひょう}や グラフに しよう",
          body: "あつめた データを {表|ひょう}や ぼうグラフに すると、どれが おおいか ひとめで わかるよ。",
          visual: { kind: "emoji", value: "🍎🍎🍎🍎\n🍌🍌\n🍇🍇🍇", caption: "ぼうグラフ" },
        },
        {
          heading: "③ {平均|へいきん}を みつけよう",
          body: "{平均|へいきん}＝{合計|ごうけい}÷{個数|こすう}。みんなを ならして まん{中|なか}くらいの あたいを だすと、くらべやすいよ。",
          visual: { kind: "emoji", value: "(4＋6＋8)÷3 ＝ 6", caption: "{平均|へいきん}は 6" },
        },
        {
          heading: "④ やってみよう",
          body: "60{点|てん}, 80{点|てん}, 70{点|てん}の {平均|へいきん}は？ (60＋80＋70)÷3＝210÷3＝70{点|てん} だよ。",
          visual: { kind: "emoji", value: "210 ÷ 3 ＝ 70", caption: "{平均|へいきん} 70{点|てん}" },
        },
      ],
    },
    test: {
      unitId: U.statistics,
      questions: statisticsQuestions,
      questionCount: 5,
    },
  },

  [U.algorithm]: {
    unitId: U.algorithm,
    learn: {
      unitId: U.algorithm,
      steps: [
        {
          heading: "① あさの {準備|じゅんび}の {手順|てじゅん}",
          body: "おきる → かおを あらう → ごはん → はみがき。じゅんばんを まもると うまく いくね。この じゅんばんが「アルゴリズム」だよ。",
          visual: { kind: "emoji", value: "⏰→🚿→🍚→🪥", caption: "あさの {手順|てじゅん}" },
        },
        {
          heading: "② カードを ならべて みよう",
          body: "ばらばらの カードを ちいさいものから さがして 1まいずつ ならべると、きれいに じゅんばんに なるよ（せいれつ）。",
          visual: { kind: "emoji", value: "3 1 2 → 1 2 3", caption: "せいれつ（ソート）" },
        },
        {
          heading: "③ きまりを みつけよう",
          body: "おなじ {手順|てじゅん}なら だれが やっても おなじ こたえに なるよ。さがすときは まん{中|なか}から しらべると はやい（にぶんたんさく）。",
          visual: { kind: "emoji", value: "まん{中|なか}→はんぶん→はんぶん", caption: "はやい さがし{方|かた}" },
        },
        {
          heading: "④ やってみよう",
          body: "1〜8 の カードから 7 を さがそう。まん{中|なか}の 4 を みて、7は おおきいから {右|みぎ}はんぶんへ。これを くりかえすと すぐ みつかるよ。",
          visual: { kind: "emoji", value: "4? → 6? → 7!", caption: "にぶんたんさく" },
        },
      ],
    },
    test: {
      unitId: U.algorithm,
      questions: algorithmQuestions,
      questionCount: 5,
    },
  },

  [U.sequences]: {
    unitId: U.sequences,
    learn: {
      unitId: U.sequences,
      steps: [
        {
          heading: "① かいだんと カレンダー",
          body: "かいだんは 1だん、2だん、3だん…と ふえるね。{数|かず}が きまりよく ならんだものを「{数列|すうれつ}」と いうよ。",
          visual: { kind: "emoji", value: "1 2 3 4 5", caption: "1ずつ ふえる" },
        },
        {
          heading: "② ●を ふやして みよう",
          body: "1, 2, 3 と ●を ふやしたり、1, 1, 2, 3, 5 と {前|まえ}の 2つを たして ふやしたり。ならべると ふえ{方|かた}が めで みえるよ。",
          visual: { kind: "emoji", value: "● ● ●● ●●● ●●●●●", caption: "フィボナッチ" },
        },
        {
          heading: "③ きまりを みつけよう",
          body: "となりとの さが おなじ（2,4,6,8…）＝とうさ。{前|まえ}の 2つを たす（1,1,2,3,5,8…）＝フィボナッチ。きまりを みつけよう。",
          visual: { kind: "emoji", value: "5＋8 ＝ 13", caption: "{前|まえ}2つの {和|わ}" },
        },
        {
          heading: "④ やってみよう",
          body: "1, 1, 2, 3, 5, 8 の {次|つぎ}は？ {前|まえ}の 2つ 5と8を たして 13 だよ。きまりが わかると {次|つぎ}を よそうできるね。",
          visual: { kind: "emoji", value: "… 8, 13, 21 …", caption: "{次|つぎ}は 13" },
        },
      ],
    },
    test: {
      unitId: U.sequences,
      questions: sequencesQuestions,
      questionCount: 5,
    },
  },
};
