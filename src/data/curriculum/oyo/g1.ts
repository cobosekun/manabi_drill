// ══════════════════════════════════════════
// カリキュラム: 応用（おうよう）小1
// 拡張カテゴリ「応用（oyo）」= 大学レベルの概念を、具体物・図・段階的足場かけで
// 小学生が「本質をやさしく・手を動かして解ける」ところまで噛み砕く。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 全表示テキストは ルビ記法 {漢字|よみ}（全漢字ルビ。低学年なので やさしい漢字＋ルビ）。
//
// ── 申し送り（中央集約担当へ）─────────────────────────────
//  1. SubjectId union（src/types/drill.ts）に "oyo" がまだ無いため、本ファイルでは
//     `const OYO = "oyo" as SubjectId;` で局所的に型を吸収している（kyoyo と同じ流儀）。
//     中央で union に "oyo" を追加したら、この as キャストは外してよい。types は触っていない。
//  2. 【応用4段ルール】各 Unit の learn.steps は必ず4段:
//     ① 身近な具体 → ② 図・操作で体感 → ③ きまり発見 → ④ やってみる。
//  3. Unit.leadsTo は型上 Unit.id[]（参照解決をバリデータが検査）。スコープが求める
//     「中学・高校・大学の何につながるか」の narrative は realWorldUse 本文に織り込み、
//     leadsTo には集約時に必ず解決できる id（本ファイル内 + 既存 sansuu.g1.*）だけを置く。
//  4. prerequisites は実在する sansuu.g1 単元（numbers-to-10 / add-within-10）を参照。
//     Subject 定義（emoji 🚀 / theme violet / grades [1..6] / testable:true）は本ファイルの
//     oyoSubject をそのまま使える。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
  NumberInputQuestion,
  OrderingQuestion,
  MatchingQuestion,
  SubjectId,
} from "@/types/curriculum";

// oyo は SubjectId 未対応 → 局所的に型を吸収（上の申し送り参照）。
const OYO = "oyo" as SubjectId;

// ── 教科 ──────────────────────────────────

export const oyoSubject: Subject = {
  id: OYO,
  name: "おうよう",
  formalName: "応用（大学レベルをやさしく）",
  emoji: "🚀",
  theme: "violet",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// 応用の本質エリアで分ける（将来の確率・素数・統計・経済も この4領域に収まる）。

export const oyoG1Domains: Domain[] = [
  {
    id: "oyo.logic-sets",
    subjectId: OYO,
    name: "ろんり・なかま",
    formalName: "論理・集合",
  },
  {
    id: "oyo.shape-space",
    subjectId: OYO,
    name: "かたち・くうかん",
    formalName: "図形・空間（トポロジー・対称）",
  },
  {
    id: "oyo.pattern-number",
    subjectId: OYO,
    name: "きまり・かず",
    formalName: "パターン・数（数列・記数法）",
  },
  {
    id: "oyo.algorithm",
    subjectId: OYO,
    name: "てじゅん",
    formalName: "アルゴリズム（手順の科学）",
  },
];

// ── 先行/関連 単元 id（実在する sansuu.g1 のみ参照して解決を保証） ──
const SANSUU = {
  numbersTo10: "sansuu.g1.numbers-to-10",
  addWithin10: "sansuu.g1.add-within-10",
} as const;

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺に DAG 化。算数 g1 → 応用 g1。循環なし）:
//
//   sansuu.g1.numbers-to-10 ─┬─▶ sets-grouping ─(leadsTo)─▶ algorithm-steps
//                            ├─▶ algorithm-steps
//                            └─▶ binary-onoff
//   sansuu.g1.add-within-10 ─▶ patterns-sequence
//   symmetry-shapes（図形の直感。算数前提なし）
//
const U = {
  sets: "oyo.g1.sets-grouping",
  symmetry: "oyo.g1.symmetry-shapes",
  patterns: "oyo.g1.patterns-sequence",
  algorithm: "oyo.g1.algorithm-steps",
  binary: "oyo.g1.binary-onoff",
} as const;

export const oyoG1Units: Unit[] = [
  {
    id: U.sets,
    subjectId: OYO,
    grade: 1,
    domainId: "oyo.logic-sets",
    title: "なかま{分|わ}け（{集合|しゅうごう}）",
    order: 1,
    realWorldUse:
      "おもちゃや データを なかま{分|わ}けする ときに つかうよ。{中学|ちゅうがく}・{高校|こうこう}の『{集合|しゅうごう}（ベン{図|ず}）』や、コンピュータの データせいりに つながるよ。",
    leadsTo: [U.algorithm],
    prerequisites: [SANSUU.numbersTo10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.symmetry,
    subjectId: OYO,
    grade: 1,
    domainId: "oyo.shape-space",
    title: "ひだり{右|みぎ} おなじ かたち（{対称|たいしょう}）",
    order: 2,
    realWorldUse:
      "もようや デザイン、ちょうちょや かおの かたちに あるよ。{高校|こうこう}の『{対称|たいしょう}』や{大学|だいがく}の『トポロジー（かたちの{学問|がくもん}）』に つながるよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.patterns,
    subjectId: OYO,
    grade: 1,
    domainId: "oyo.pattern-number",
    title: "ならびの きまり（{数列|すうれつ}）",
    order: 3,
    realWorldUse:
      "もようや おんがくの リズム、カレンダーの くりかえしに あるよ。{高校|こうこう}の『{数列|すうれつ}』や、{自然|しぜん}の フィボナッチに つながるよ。",
    leadsTo: [],
    prerequisites: [SANSUU.addWithin10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.algorithm,
    subjectId: OYO,
    grade: 1,
    domainId: "oyo.algorithm",
    title: "てじゅんで とく（アルゴリズム）",
    order: 4,
    realWorldUse:
      "りょうりの てじゅんや、ものを さがす・ならべる ときに つかうよ。{大学|だいがく}の『アルゴリズム』や プログラミングに つながるよ。",
    leadsTo: [],
    prerequisites: [SANSUU.numbersTo10],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.binary,
    subjectId: OYO,
    grade: 1,
    domainId: "oyo.pattern-number",
    title: "0 と 1 で あらわす（{二進法|にしんほう}）",
    order: 5,
    realWorldUse:
      "コンピュータや スマホは でんきの オン・オフ（0と1）で うごいているよ。{大学|だいがく}の『{情報|じょうほう}』や プログラミングに つながるよ。",
    leadsTo: [],
    prerequisites: [SANSUU.numbersTo10],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn = 応用4段 / テスト test = 解ける問題＋全問 explanation） ──
// 表示テキストは全漢字ルビ記法 {漢字|よみ}。

export const oyoG1Contents: Record<string, UnitContent> = {
  // ── 1. なかま分け（集合） ──
  [U.sets]: {
    unitId: U.sets,
    learn: {
      unitId: U.sets,
      steps: [
        {
          // ① 身近な具体
          heading: "おもちゃばこを かたづけよう",
          body: "おもちゃばこを かたづける とき、くるまは くるま、どうぶつは どうぶつ、と にた ものを あつめるよね。これが「なかま{分|わ}け」だよ。",
          visual: { kind: "emoji", value: "🚗🐶🍎", caption: "にた ものを あつめる" },
        },
        {
          // ② 図・操作で体感
          heading: "わ の{中|なか}に 入れてみよう",
          body: "おおきな まる（わ）を かいて、その{中|なか}に「あかい もの」を ぜんぶ 入れてみよう。わの{中|なか}が なかま、{外|そと}は ちがう なかまだよ。",
          visual: { kind: "emoji", value: "⭕🍅🍓", caption: "わの{中|なか}＝なかま" },
        },
        {
          // ③ きまり発見
          heading: "{両方|りょうほう}に 入る ものが ある",
          body: "「まるい もの」の わと「あかい もの」の わを かさねると、かさなった ところには「あかくて まるい もの」が 入るよ。これが ベン{図|ず}の はじまりだよ。",
          visual: { kind: "emoji", value: "🔴⭕", caption: "かさなり＝{両方|りょうほう}" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "いぬ・ねこ・りんご・ぱん を「どうぶつ」と「たべもの」の なかまに{分|わ}けてみよう。どっちの なかまかな？",
          visual: { kind: "emoji", value: "🐶🐱🍎🍞", caption: "どうぶつ？ たべもの？" },
        },
      ],
    },
    test: {
      unitId: U.sets,
      questionCount: 5,
      questions: [
        {
          id: `${U.sets}.q-1`,
          unitId: U.sets,
          prompt: "いぬ・ねこ・りんご の{中|なか}で「たべもの」の なかまは どれ？",
          explanation: "いぬと ねこは どうぶつ、りんごは たべものの なかまだよ。",
          format: "choice",
          choices: ["りんご", "いぬ", "ねこ", "とり"],
          answer: "りんご",
        } as ChoiceQuestion,
        {
          id: `${U.sets}.q-2`,
          unitId: U.sets,
          prompt: "「あかい もの」の わに 入るのは どれ？",
          explanation: "トマトは あかいね。バナナは きいろ、そらは あお、はっぱは みどりだよ。",
          format: "choice",
          choices: ["トマト", "バナナ", "そら", "はっぱ"],
          answer: "トマト",
        } as ChoiceQuestion,
        {
          id: `${U.sets}.q-3`,
          unitId: U.sets,
          prompt: "「まるい もの」と「あかい もの」、{両方|りょうほう}の わに 入るのは どれ？",
          explanation: "あかい ボールは、まるくて あかいから{両方|りょうほう}の わに 入るよ。",
          format: "choice",
          choices: ["あかい ボール", "あおい さんかく", "きいろい しかく", "みどりの ひも"],
          answer: "あかい ボール",
        } as ChoiceQuestion,
        {
          id: `${U.sets}.q-4`,
          unitId: U.sets,
          prompt: "なかまを せんで つなげよう。",
          explanation: "いぬは どうぶつ、ぱんは たべものの なかまだよ。",
          format: "matching",
          left: ["いぬ", "ぱん"],
          right: ["たべもの", "どうぶつ"],
          answerPairs: [1, 0],
        } as MatchingQuestion,
        {
          id: `${U.sets}.q-5`,
          unitId: U.sets,
          prompt: "くるま・ひこうき・ふね は ぜんぶ あつめると なんの なかま？",
          explanation: "くるま・ひこうき・ふね は、ぜんぶ「のりもの」の なかまだよ。",
          format: "choice",
          choices: ["のりもの", "たべもの", "どうぶつ", "おはな"],
          answer: "のりもの",
        } as ChoiceQuestion,
      ],
    },
  },

  // ── 2. 左右対称（トポロジー・対称） ──
  [U.symmetry]: {
    unitId: U.symmetry,
    learn: {
      unitId: U.symmetry,
      steps: [
        {
          // ① 身近な具体
          heading: "ちょうちょの はね",
          body: "ちょうちょの はねや、{人|ひと}の かおは、ひだりと{右|みぎ}が おなじ かたちに なっているよ。よく 見てみよう。",
          visual: { kind: "emoji", value: "🦋", caption: "ひだりと{右|みぎ}が おなじ" },
        },
        {
          // ② 図・操作で体感
          heading: "まん{中|なか}で おってみよう",
          body: "かみに かいた かたちを、まん{中|なか}の せんで パタンと おってみよう。ぴったり {重|かさ}なったら「ひだり{右|みぎ} おなじ（{対称|たいしょう}）」だよ。",
          visual: { kind: "emoji", value: "📄↔️", caption: "おって {重|かさ}ねる" },
        },
        {
          // ③ きまり発見
          heading: "まん{中|なか}の せんが ある",
          body: "{対称|たいしょう}な かたちには、まん{中|なか}に「おりめ の せん」が あって、その ひだりと{右|みぎ}が そっくり{同|おな}じに なっているよ。",
          visual: { kind: "emoji", value: "🔺", caption: "まん{中|なか}で おなじ" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "▲（さんかく）・ハート・かたつむり の{中|なか}で、まん{中|なか}で おると ぴったり{重|かさ}なるのは どれかな？ さがしてみよう。",
          visual: { kind: "emoji", value: "🔺❤️🐌", caption: "どれが {対称|たいしょう}？" },
        },
      ],
    },
    test: {
      unitId: U.symmetry,
      questionCount: 5,
      questions: [
        {
          id: `${U.symmetry}.q-1`,
          unitId: U.symmetry,
          prompt: "ちょうちょの はねは、ひだりと{右|みぎ}が おなじ かたち？",
          explanation: "ちょうちょの はねは ひだりと{右|みぎ}が おなじ。だから「{対称|たいしょう}」だよ。",
          format: "choice",
          choices: ["おなじ（{対称|たいしょう}）", "ぜんぜん ちがう", "{上下|じょうげ}だけ おなじ", "{色|いろ}だけ おなじ"],
          answer: "おなじ（{対称|たいしょう}）",
        } as ChoiceQuestion,
        {
          id: `${U.symmetry}.q-2`,
          unitId: U.symmetry,
          prompt: "まん{中|なか}で おると ひだり{右|みぎ} ぴったり {重|かさ}なる かたちは どれ？",
          explanation: "▲（せいさんかく）は まん{中|なか}で おると ぴったり{重|かさ}なるよ。Ｌ・Ｆ・Ｐ は{重|かさ}ならないよ。",
          format: "choice",
          choices: ["▲", "Ｌ", "Ｆ", "Ｐ"],
          answer: "▲",
        } as ChoiceQuestion,
        {
          id: `${U.symmetry}.q-3`,
          unitId: U.symmetry,
          prompt: "{対称|たいしょう}な ものを まん{中|なか}で おると どうなる？",
          explanation: "{対称|たいしょう}な ものは、まん{中|なか}で おると ひだりと{右|みぎ}が ぴったり{重|かさ}なるよ。",
          format: "choice",
          choices: ["ぴったり {重|かさ}なる", "ばらばらに なる", "{大|おお}きくなる", "{色|いろ}が{変|か}わる"],
          answer: "ぴったり {重|かさ}なる",
        } as ChoiceQuestion,
        {
          id: `${U.symmetry}.q-4`,
          unitId: U.symmetry,
          prompt: "ひと{筆|ふで}がき（えんぴつを はなさず かく）で かけるのは どれ？",
          explanation: "まる（〇）は えんぴつを はなさず ひと{筆|ふで}で かけるよ。これも かたちの ふしぎ（トポロジー）の さわりだよ。",
          format: "choice",
          choices: ["まる〇", "てんが ばらばらの え", "{字|じ}の『{田|た}』ぜんぶ", "ばらばらの{点|てん}"],
          answer: "まる〇",
        } as ChoiceQuestion,
        {
          id: `${U.symmetry}.q-5`,
          unitId: U.symmetry,
          prompt: "つぎの うち、ひだり{右|みぎ} おなじ（{対称|たいしょう}）に 見える ものは どれ？",
          explanation: "{人|ひと}の かおは ひだりと{右|みぎ}が だいたい おなじ。{対称|たいしょう}に 見えるよ。",
          format: "choice",
          choices: ["{人|ひと}の かお", "ぐにゃぐにゃの{線|せん}", "やぶれた かみ", "ちらかった つくえ"],
          answer: "{人|ひと}の かお",
        } as ChoiceQuestion,
      ],
    },
  },

  // ── 3. ならびのきまり（数列） ──
  [U.patterns]: {
    unitId: U.patterns,
    learn: {
      unitId: U.patterns,
      steps: [
        {
          // ① 身近な具体
          heading: "しんごうの くりかえし",
          body: "しんごうは あお→きいろ→あか→あお… と くりかえすね。カレンダーも{月|げつ}・{火|か}・{水|すい}… と じゅんばんが きまっているよ。",
          visual: { kind: "emoji", value: "🟢🟡🔴", caption: "くりかえす ならび" },
        },
        {
          // ② 図・操作で体感
          heading: "ブロックを ならべよう",
          body: "〇△〇△〇△… と ブロックを ならべて みよう。つぎに くるのは なにかな？ ゆびで さして いってみよう。",
          visual: { kind: "emoji", value: "⚪🔺⚪🔺", caption: "つぎは なに？" },
        },
        {
          // ③ きまり発見
          heading: "「ふえる」きまり",
          body: "1, 2, 3, 4 … は 1ずつ ふえる ならび。2, 4, 6, 8 … は 2ずつ ふえるよ。きまりが わかれば つぎが よめるね。",
          visual: { kind: "emoji", value: "➕1➕1", caption: "1ずつ ふえる" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "2, 4, 6, □ の □は いくつ？ また 〇〇△ 〇〇△ の つぎは どれ？ きまりを 見つけて こたえよう。",
          visual: { kind: "emoji", value: "❓", caption: "つぎは？" },
        },
      ],
    },
    test: {
      unitId: U.patterns,
      questionCount: 5,
      questions: [
        {
          id: `${U.patterns}.q-1`,
          unitId: U.patterns,
          prompt: "1, 2, 3, 4, □  □に 入る かずは？",
          explanation: "1ずつ ふえる ならびだよ。4の つぎは 5だね。",
          format: "number-input",
          answer: 5,
        } as NumberInputQuestion,
        {
          id: `${U.patterns}.q-2`,
          unitId: U.patterns,
          prompt: "2, 4, 6, 8, □  □に 入る かずは？",
          explanation: "2ずつ ふえる ならびだよ。8の つぎは 10だね。",
          format: "number-input",
          answer: 10,
        } as NumberInputQuestion,
        {
          id: `${U.patterns}.q-3`,
          unitId: U.patterns,
          prompt: "5, 4, 3, 2, □  □に 入る かずは？",
          explanation: "こんどは 1ずつ へる ならびだよ。2の つぎは 1だね。",
          format: "number-input",
          answer: 1,
        } as NumberInputQuestion,
        {
          id: `${U.patterns}.q-4`,
          unitId: U.patterns,
          prompt: "〇 △ 〇 △ 〇 △ の つぎに くるのは？",
          explanation: "〇 と △ が くりかえす ならび。△ の つぎは 〇 だよ。",
          format: "choice",
          choices: ["〇", "△", "▢", "☆"],
          answer: "〇",
        } as ChoiceQuestion,
        {
          id: `${U.patterns}.q-5`,
          unitId: U.patterns,
          prompt: "1, 3, 5, 7, □  □に 入る かずは？",
          explanation: "2ずつ ふえる ならびだよ。7の つぎは 9だね。",
          format: "number-input",
          answer: 9,
        } as NumberInputQuestion,
      ],
    },
  },

  // ── 4. てじゅんで とく（アルゴリズム） ──
  [U.algorithm]: {
    unitId: U.algorithm,
    learn: {
      unitId: U.algorithm,
      steps: [
        {
          // ① 身近な具体
          heading: "あさの じゅんばん",
          body: "あさ おきたら「{顔|かお}を あらう→ごはんを{食|た}べる→{歯|は}を みがく」と じゅんばんが あるね。やる ことには「てじゅん」が あるよ。",
          visual: { kind: "emoji", value: "🧼🍙🪥", caption: "じゅんばんが ある" },
        },
        {
          // ② 図・操作で体感
          heading: "せの じゅんに ならべよう",
          body: "3{人|にん}を せの ひくい じゅんに ならべよう。となりの{人|ひと}と くらべて、ひくい ほうを まえに 入れかえれば できるよ。",
          visual: { kind: "emoji", value: "🧒🧑‍🦱🧓", caption: "となりと くらべる" },
        },
        {
          // ③ きまり発見
          heading: "「くらべて 入れかえ」",
          body: "ちいさい じゅんに ならべる「ならべかえ」は、となりどうし くらべて 入れかえる、を くりかえせば かならず できるよ。これが アルゴリズム（とき{方|かた}の てじゅん）だよ。",
          visual: { kind: "emoji", value: "🔁", caption: "くらべて 入れかえ" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "3, 1, 2 を ちいさい じゅんに ならべると どうなる？ となりと くらべながら やってみよう。",
          visual: { kind: "emoji", value: "3️⃣1️⃣2️⃣", caption: "ちいさい じゅんに" },
        },
      ],
    },
    test: {
      unitId: U.algorithm,
      questionCount: 5,
      questions: [
        {
          id: `${U.algorithm}.q-1`,
          unitId: U.algorithm,
          prompt: "3, 1, 2 を ちいさい じゅんに ならべかえよう。",
          explanation: "ちいさい じゅんは 1 → 2 → 3 だよ。",
          format: "ordering",
          items: ["3", "1", "2"],
          answerOrder: [1, 2, 0],
        } as OrderingQuestion,
        {
          id: `${U.algorithm}.q-2`,
          unitId: U.algorithm,
          prompt: "あさの じゅんばんに ならべよう。",
          explanation: "おきる → ごはんを{食|た}べる → {歯|は}を みがく の じゅんだね。",
          format: "ordering",
          items: ["ごはんを{食|た}べる", "おきる", "{歯|は}を みがく"],
          answerOrder: [1, 0, 2],
        } as OrderingQuestion,
        {
          id: `${U.algorithm}.q-3`,
          unitId: U.algorithm,
          prompt: "5, 2, 8 を ちいさい じゅんに したとき、さいしょに くる かずは？",
          explanation: "いちばん ちいさいのは 2 だよ。だから さいしょは 2 だね。",
          format: "number-input",
          answer: 2,
        } as NumberInputQuestion,
        {
          id: `${U.algorithm}.q-4`,
          unitId: U.algorithm,
          prompt: "たくさんの ものから 1つを さがす とき、たしかな さがし{方|かた}は どれ？",
          explanation: "はじめから じゅんばんに 1つずつ 見ていけば、かならず 見つかるよ。",
          format: "choice",
          choices: ["じゅんばんに 1つずつ 見る", "{目|め}を つぶって える", "さがさない", "なげて みる"],
          answer: "じゅんばんに 1つずつ 見る",
        } as ChoiceQuestion,
        {
          id: `${U.algorithm}.q-5`,
          unitId: U.algorithm,
          prompt: "3, 1, 2 を ちいさい じゅんに したとき、まん{中|なか}に くる かずは？",
          explanation: "1, 2, 3 と ならぶから、まん{中|なか}は 2 だよ。",
          format: "number-input",
          answer: 2,
        } as NumberInputQuestion,
      ],
    },
  },

  // ── 5. 0と1で あらわす（二進法のさわり） ──
  [U.binary]: {
    unitId: U.binary,
    learn: {
      unitId: U.binary,
      steps: [
        {
          // ① 身近な具体
          heading: "でんきの スイッチ",
          body: "でんきの スイッチは「ついてる（オン）」か「きえてる（オフ）」の 2つだけ。その{間|あいだ}は ないね。",
          visual: { kind: "emoji", value: "💡🌑", caption: "オン と オフ" },
        },
        {
          // ② 図・操作で体感
          heading: "オン＝1、オフ＝0",
          body: "オンを「1」、オフを「0」と かいて みよう。ライト 1こで「0」か「1」の 2とおりを あらわせるよ。",
          visual: { kind: "emoji", value: "1️⃣0️⃣", caption: "オン1 / オフ0" },
        },
        {
          // ③ きまり発見
          heading: "ライトが ふえると とおりも ふえる",
          body: "ライト 2こなら 00・01・10・11 の 4とおり。0と1だけで いろいろな かずを あらわせるよ。これが「{二進法|にしんほう}」だよ。",
          visual: { kind: "emoji", value: "🔢", caption: "00 01 10 11" },
        },
        {
          // ④ やってみる
          heading: "やってみよう",
          body: "ライト 2この「オン・オフ」の くみあわせは ぜんぶで なんとおり あるかな？ かぞえて みよう。",
          visual: { kind: "emoji", value: "💡💡", caption: "なんとおり？" },
        },
      ],
    },
    test: {
      unitId: U.binary,
      questionCount: 5,
      questions: [
        {
          id: `${U.binary}.q-1`,
          unitId: U.binary,
          prompt: "でんきの スイッチの じょうたいは いくつ ある？",
          explanation: "「オン（ついてる）」と「オフ（きえてる）」の 2つだよ。",
          format: "choice",
          choices: ["2つ", "1つ", "3つ", "10こ"],
          answer: "2つ",
        } as ChoiceQuestion,
        {
          id: `${U.binary}.q-2`,
          unitId: U.binary,
          prompt: "オンを「1」と するなら、オフは いくつ？",
          explanation: "オフは「0」と あらわすよ。0と1の 2つだけ つかうよ。",
          format: "number-input",
          answer: 0,
        } as NumberInputQuestion,
        {
          id: `${U.binary}.q-3`,
          unitId: U.binary,
          prompt: "ライト 1こで あらわせる じょうたいは なんとおり？",
          explanation: "「0（オフ）」か「1（オン）」の 2とおりだよ。",
          format: "number-input",
          answer: 2,
        } as NumberInputQuestion,
        {
          id: `${U.binary}.q-4`,
          unitId: U.binary,
          prompt: "ライト 2この オン・オフの くみあわせは ぜんぶで なんとおり？",
          explanation: "00・01・10・11 の 4とおりだよ。1こ ふえるごとに とおりは ばいに なるよ。",
          format: "number-input",
          answer: 4,
        } as NumberInputQuestion,
        {
          id: `${U.binary}.q-5`,
          unitId: U.binary,
          prompt: "コンピュータの{中|なか}は、なにで うごいている？",
          explanation: "コンピュータは でんきの オン・オフ（0と1）で うごいているよ。これが{二進法|にしんほう}だよ。",
          format: "choice",
          choices: ["でんきの オン・オフ（0と1）", "{水|みず}", "{風|かぜ}", "{音|おと}だけ"],
          answer: "でんきの オン・オフ（0と1）",
        } as ChoiceQuestion,
      ],
    },
  },
};
