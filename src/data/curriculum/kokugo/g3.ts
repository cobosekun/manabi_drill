// ══════════════════════════════════════════
// カリキュラム: 国語（こくご）小3
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>" / 問題 = "<unitId>.q-<n>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 学習指導要領（小3国語）準拠: ローマ字 / 漢字200字 / 修飾語 /
//   国語辞典の使い方 / 段落 / 慣用句・ことわざ / 説明文・物語。
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

export const kokugoSubject: Subject = {
  id: "kokugo",
  name: "こくご",
  formalName: "国語",
  emoji: "📖",
  theme: "rose",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// 学習指導要領の構成に対応:
//   〔知識及び技能〕→ ことばのちしき（ローマ字/漢字/修飾語/辞典/慣用句ことわざ）
//   〔C 読むこと〕  → よむこと（段落/説明文/物語）

export const kokugoG3Domains: Domain[] = [
  {
    id: "kokugo.knowledge",
    subjectId: "kokugo",
    name: "ことばのちしき",
    formalName: "知識及び技能",
  },
  {
    id: "kokugo.reading",
    subjectId: "kokugo",
    name: "よむこと",
    formalName: "読むこと",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし。g3内で自己完結）:
//
//   romaji（独立）
//   kanji-200 ──┬─▶ idioms ─────────┐
//               ├─▶ explanatory     │
//               └─▶ narrative       │
//   dictionary ─┴─▶ idioms          │
//   modifiers ──┬─▶ explanatory     │
//               └─▶ narrative       │
//   paragraph ──┴─▶ explanatory / narrative
//
const U = {
  romaji: "kokugo.g3.romaji",
  kanji200: "kokugo.g3.kanji-200",
  modifiers: "kokugo.g3.modifiers",
  dictionary: "kokugo.g3.dictionary",
  idioms: "kokugo.g3.idioms",
  paragraph: "kokugo.g3.paragraph",
  explanatory: "kokugo.g3.explanatory",
  narrative: "kokugo.g3.narrative",
} as const;

export const kokugoG3Units: Unit[] = [
  {
    id: U.romaji,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.knowledge",
    title: "ローマ字",
    order: 1,
    realWorldUse: "コンピュータや タブレットで じを うつときや、まちの かんばん・えきの なまえを よむときに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kanji200,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.knowledge",
    title: "3年生の かんじ（200字）",
    order: 2,
    realWorldUse: "本や しんぶん、ポスターを よむときや、じぶんの きもちを 文に かくときに たくさん つかうよ。",
    leadsTo: [U.idioms, U.explanatory, U.narrative],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.modifiers,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.knowledge",
    title: "くわしく する ことば（修飾語）",
    order: 3,
    realWorldUse: "「白い 犬が はやく はしる」のように、ようすを くわしく つたえる 文を かくときに つかうよ。",
    leadsTo: [U.explanatory, U.narrative],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.dictionary,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.knowledge",
    title: "こくごじてんの つかいかた",
    order: 4,
    realWorldUse: "しらない ことばに であったとき、いみや つかいかたを じぶんで しらべるのに つかうよ。",
    leadsTo: [U.idioms],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.idioms,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.knowledge",
    title: "かんようく・ことわざ",
    order: 5,
    realWorldUse: "「ねこの 手も かりたい」のように、気もちや ようすを みじかく うまく いいあらわすときに つかうよ。",
    leadsTo: [U.narrative],
    prerequisites: [U.kanji200, U.dictionary],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.paragraph,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.reading",
    title: "だんらく",
    order: 6,
    realWorldUse: "ながい 文しょうを よむときや かくときに、話の くぎりを みつけて わかりやすく まとめるのに つかうよ。",
    leadsTo: [U.explanatory, U.narrative],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.explanatory,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.reading",
    title: "せつめい文を よむ",
    order: 7,
    realWorldUse: "ずかんや きょうかしょ、せつめいの 文しょうを よんで、たいせつな ことを みつけるのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.kanji200, U.modifiers, U.paragraph],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.narrative,
    subjectId: "kokugo",
    grade: 3,
    domainId: "kokugo.reading",
    title: "ものがたりを よむ",
    order: 8,
    realWorldUse: "お話の 本を よんで、とうじょう人ぶつの 気もちや できごとを あじわうのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.kanji200, U.modifiers, U.paragraph],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 各単元の固定問題（全問 explanation 必須） ──────────────

const romajiQuestions: Question[] = [
  {
    id: `${U.romaji}.q-1`,
    unitId: U.romaji,
    prompt: "「さくら」を ローマ字で かくと どれ？",
    explanation: "さ=sa、く=ku、ら=ra だから「sakura」だよ。おとを ひとつずつ ローマ字に なおそう。",
    format: "choice",
    choices: ["sakura", "sakora", "sukura", "sakara"],
    answer: "sakura",
  },
  {
    id: `${U.romaji}.q-2`,
    unitId: U.romaji,
    prompt: "「ki」は どの おとかな？",
    explanation: "k のあとに i がつくと「き」と よむよ。ka=か、ki=き、ku=く、ke=け、ko=こ。",
    format: "choice",
    choices: ["き", "か", "く", "こ"],
    answer: "き",
  },
  {
    id: `${U.romaji}.q-3`,
    unitId: U.romaji,
    prompt: "「ねこ」を ローマ字で かくと どれ？",
    explanation: "ね=ne、こ=ko だから「neko」。c ではなく k を つかうよ。",
    format: "choice",
    choices: ["neko", "neco", "neku", "naco"],
    answer: "neko",
  },
  {
    id: `${U.romaji}.q-4`,
    unitId: U.romaji,
    prompt: "ローマ字の ぼいん（あいうえお）は どれかな？",
    explanation: "あ=a、い=i、う=u、え=e、お=o の 5つが ぼいん。ほかの おとは これに k や s を つけて つくるよ。",
    format: "choice",
    choices: ["a i u e o", "a e i o u", "i a u e o", "a i u o e"],
    answer: "a i u e o",
  },
  {
    id: `${U.romaji}.q-5`,
    unitId: U.romaji,
    prompt: "「やま」を ローマ字で かくと どれ？",
    explanation: "や=ya、ま=ma だから「yama」。「や ゆ よ」は y を つかうよ。",
    format: "choice",
    choices: ["yama", "yana", "iama", "yamu"],
    answer: "yama",
  },
];

const kanji200Questions: Question[] = [
  {
    id: `${U.kanji200}.q-1`,
    unitId: U.kanji200,
    prompt: "「橋」の よみかたは どれ？",
    explanation: "「橋」は はし と よむよ。川を わたるための はし。木へんが ついているね。",
    format: "choice",
    choices: ["はし", "いし", "みち", "かわ"],
    answer: "はし",
  },
  {
    id: `${U.kanji200}.q-2`,
    unitId: U.kanji200,
    prompt: "「がっこう」の「こう」は どの かんじ？",
    explanation: "学校の「こう」は「校」。木へんに「交」で がっこうの 校だよ。",
    format: "choice",
    choices: ["校", "交", "高", "工"],
    answer: "校",
  },
  {
    id: `${U.kanji200}.q-3`,
    unitId: U.kanji200,
    prompt: "「島」の よみかたは どれ？",
    explanation: "「島」は しま。うみに かこまれた りく。鳥（とり）と 山が あわさった かたちだよ。",
    format: "choice",
    choices: ["しま", "やま", "とり", "うみ"],
    answer: "しま",
  },
  {
    id: `${U.kanji200}.q-4`,
    unitId: U.kanji200,
    prompt: "「うごく」を あらわす かんじは どれ？",
    explanation: "「動く」の「動」だよ。「重」と「力」が あわさって、力で うごく ようすを あらわすよ。",
    format: "choice",
    choices: ["動", "働", "重", "力"],
    answer: "動",
  },
  {
    id: `${U.kanji200}.q-5`,
    unitId: U.kanji200,
    prompt: "つぎの ことばを かんじで かこう：「やね」",
    explanation: "「屋根」と かくよ。「屋」は たてもの、「根」は ねもと。どちらも 3年生で ならう かんじ。",
    format: "text-input",
    answer: "屋根",
    acceptableAnswers: ["屋根"],
  },
  {
    id: `${U.kanji200}.q-6`,
    unitId: U.kanji200,
    prompt: "「practice をする」=「れんしゅう」を かんじで かこう",
    explanation: "「練習」と かくよ。「練」も「習」も 3年生の かんじ。なんども やって おぼえる ことだね。",
    format: "text-input",
    answer: "練習",
    acceptableAnswers: ["練習"],
  },
];

const modifiersQuestions: Question[] = [
  {
    id: `${U.modifiers}.q-1`,
    unitId: U.modifiers,
    prompt: "「大きな 犬」で、「大きな」は どの ことばを くわしく している？",
    explanation: "くわしく する ことばは、すぐ あとの ことばに かかるよ。「大きな」は「犬」を くわしく している。",
    format: "choice",
    choices: ["犬", "大きな", "は", "いる"],
    answer: "犬",
  },
  {
    id: `${U.modifiers}.q-2`,
    unitId: U.modifiers,
    prompt: "「赤い はなが さく」で、くわしく する ことばは どれ？",
    explanation: "「赤い」が「はな」の いろを くわしく つたえているよ。ようすを あらわす ことばが しゅうしょくご。",
    format: "choice",
    choices: ["赤い", "はな", "さく", "が"],
    answer: "赤い",
  },
  {
    id: `${U.modifiers}.q-3`,
    unitId: U.modifiers,
    prompt: "「ゆっくり あるく」の「ゆっくり」は なにを あらわしている？",
    explanation: "「ゆっくり」は「あるく」の しかた（ようす）を くわしく しているよ。どんなふうに あるくか がわかる。",
    format: "choice",
    choices: ["あるきかた", "あるく ばしょ", "あるく 人", "あるく じかん"],
    answer: "あるきかた",
  },
  {
    id: `${U.modifiers}.q-4`,
    unitId: U.modifiers,
    prompt: "つぎの 文を、もっと くわしく したのは どれ？",
    explanation: "「小さな 鳥が たかく とぶ」は、ようすを くわしく する ことばが ふえて、ばめんが よくわかるね。",
    format: "choice",
    choices: ["小さな 鳥が たかく とぶ", "鳥が とぶ", "とぶ", "鳥"],
    answer: "小さな 鳥が たかく とぶ",
  },
  {
    id: `${U.modifiers}.q-5`,
    unitId: U.modifiers,
    prompt: "「青い そらに しろい くもが うかぶ」で、「しろい」は どの ことばを くわしく している？",
    explanation: "「しろい」は すぐ あとの「くも」の いろを くわしく しているよ。",
    format: "choice",
    choices: ["くも", "そら", "うかぶ", "青い"],
    answer: "くも",
  },
];

const dictionaryQuestions: Question[] = [
  {
    id: `${U.dictionary}.q-1`,
    unitId: U.dictionary,
    prompt: "こくごじてんで さきに でて くるのは どっち？",
    explanation: "じてんは あいうえおの じゅん。「い」は「う」より さきだから「いぬ」が さきに でて くるよ。",
    format: "choice",
    choices: ["いぬ", "うし", "おに", "えき"],
    answer: "いぬ",
  },
  {
    id: `${U.dictionary}.q-2`,
    unitId: U.dictionary,
    prompt: "「さくら」と「さかな」、じてんで さきに でて くるのは？",
    explanation: "1字めは どちらも「さ」。2字めで くらべると「か」は「く」より さきだから「さかな」が さきだよ。",
    format: "choice",
    choices: ["さかな", "さくら", "おなじ", "わからない"],
    answer: "さかな",
  },
  {
    id: `${U.dictionary}.q-3`,
    unitId: U.dictionary,
    prompt: "こくごじてんで しらべられるのは どれ？",
    explanation: "こくごじてんは「ことばの いみや つかいかた」を しらべる ほん。てんきや じかんは のっていないよ。",
    format: "choice",
    choices: ["ことばの いみ", "きょうの てんき", "でんしゃの じかん", "ともだちの でんわ"],
    answer: "ことばの いみ",
  },
  {
    id: `${U.dictionary}.q-4`,
    unitId: U.dictionary,
    prompt: "つぎの ことばを、じてんに でて くる じゅんに ならべよう。",
    explanation: "あいうえおの じゅんだから、あめ → いし → うみ の じゅん。1字めの「あ・い・う」で きまるよ。",
    format: "ordering",
    items: ["うみ", "あめ", "いし"],
    answerOrder: [1, 2, 0],
  },
  {
    id: `${U.dictionary}.q-5`,
    unitId: U.dictionary,
    prompt: "ことばを じてんで さがすとき、まず どこを みる？",
    explanation: "はじめの 字で だいたいの ばしょを さがし、つぎの 字で しぼっていくよ。1字めから じゅんに みる。",
    format: "choice",
    choices: ["1字めの おと", "さいごの 字", "字の かず", "ページの ばんごう"],
    answer: "1字めの おと",
  },
];

const idiomsQuestions: Question[] = [
  {
    id: `${U.idioms}.q-1`,
    unitId: U.idioms,
    prompt: "「ねこの 手も かりたい」の いみは？",
    explanation: "とても いそがしくて、だれの 手でも かりたいほど、という いみの かんようくだよ。",
    format: "choice",
    choices: ["とても いそがしい", "ねこが すきだ", "手が つめたい", "ねむたい"],
    answer: "とても いそがしい",
  },
  {
    id: `${U.idioms}.q-2`,
    unitId: U.idioms,
    prompt: "「さるも 木から おちる」の いみは？",
    explanation: "木のぼりが じょうずな さるでも おちる ことがある。じょうずな 人でも ときには しっぱいする、という ことわざ。",
    format: "choice",
    choices: ["じょうずな 人でも しっぱいする", "さるは 木が にがて", "木は たかい", "おちると いたい"],
    answer: "じょうずな 人でも しっぱいする",
  },
  {
    id: `${U.idioms}.q-3`,
    unitId: U.idioms,
    prompt: "「口が かるい」は どんな 人の こと？",
    explanation: "ひみつや 話を すぐ ほかの 人に 話して しまう 人の ことだよ。「口がかたい」は その はんたい。",
    format: "choice",
    choices: ["ひみつを すぐ 話す 人", "たくさん たべる 人", "はやく はしる 人", "こえが 小さい 人"],
    answer: "ひみつを すぐ 話す 人",
  },
  {
    id: `${U.idioms}.q-4`,
    unitId: U.idioms,
    prompt: "「ちりも つもれば 山と なる」の いみは？",
    explanation: "小さな ちりでも あつまれば 山に なる。すこしずつでも つづければ 大きな ものに なる、という ことわざ。",
    format: "choice",
    choices: ["すこしずつでも つづければ 大きく なる", "山には ちりが おおい", "そうじを しよう", "山は たかい"],
    answer: "すこしずつでも つづければ 大きく なる",
  },
  {
    id: `${U.idioms}.q-5`,
    unitId: U.idioms,
    prompt: "「いそがば まわれ」の いみは？",
    explanation: "いそぐ ときほど、あんぜんで たしかな みちを えらんだ ほうが けっきょく はやい、という ことわざ。",
    format: "choice",
    choices: ["いそぐ ときほど あんぜんな みちを", "まわり道は だめ", "はしれば はやい", "いそぐと ころぶ"],
    answer: "いそぐ ときほど あんぜんな みちを",
  },
];

const paragraphQuestions: Question[] = [
  {
    id: `${U.paragraph}.q-1`,
    unitId: U.paragraph,
    prompt: "あたらしい だんらくは どう かきはじめる？",
    explanation: "あたらしい だんらくは、ぎょうの あたまを 一ます さげて かきはじめる きまりだよ。",
    format: "choice",
    choices: ["一ます さげて かく", "あかい じで かく", "大きな じで かく", "なにも かえない"],
    answer: "一ます さげて かく",
  },
  {
    id: `${U.paragraph}.q-2`,
    unitId: U.paragraph,
    prompt: "だんらくは なんの まとまり？",
    explanation: "だんらくは「いみ（話）の まとまり」。一つの だんらくに、だいたい 一つの 話が 入っているよ。",
    format: "choice",
    choices: ["いみの まとまり", "字の かずの まとまり", "色の まとまり", "ページの まとまり"],
    answer: "いみの まとまり",
  },
  {
    id: `${U.paragraph}.q-3`,
    unitId: U.paragraph,
    prompt: "文しょうを だんらくに わけると、どんな いいことが ある？",
    explanation: "話の くぎりが はっきりして、よみやすく わかりやすく なるよ。",
    format: "choice",
    choices: ["話の くぎりが わかって よみやすい", "字が きれいに なる", "ページが ふえる", "色が つく"],
    answer: "話の くぎりが わかって よみやすい",
  },
  {
    id: `${U.paragraph}.q-4`,
    unitId: U.paragraph,
    prompt: "つぎの 文しょうは いくつの だんらくに わけると よい？「あさ おきた。→ ごはんを たべた。→ がっこうへ いった。」",
    explanation: "話の まとまりが 3つ（おきる・たべる・いく）あるので、3つの だんらくに わけると わかりやすいね。",
    format: "choice",
    choices: ["3つ", "1つ", "5つ", "10こ"],
    answer: "3つ",
  },
  {
    id: `${U.paragraph}.q-5`,
    unitId: U.paragraph,
    prompt: "話が かわる ところでは、なにを すると よい？",
    explanation: "話が かわる ところで だんらくを かえる（ぎょうを かえて 一ます さげる）と、まとまりが はっきりするよ。",
    format: "choice",
    choices: ["だんらくを かえる", "字を 大きくする", "色を かえる", "なにも しない"],
    answer: "だんらくを かえる",
  },
];

const explanatoryQuestions: Question[] = [
  {
    id: `${U.explanatory}.q-1`,
    unitId: U.explanatory,
    prompt: "せつめい文の もくてきは なに？",
    explanation: "せつめい文は、ものごとを わかりやすく つたえる ための 文しょうだよ。",
    format: "choice",
    choices: ["ものごとを わかりやすく つたえる", "わらわせる", "うたを うたう", "えを かく"],
    answer: "ものごとを わかりやすく つたえる",
  },
  {
    id: `${U.explanatory}.q-2`,
    unitId: U.explanatory,
    prompt: "「なぜ〜でしょうか」という 文は なに？",
    explanation: "よみ手に なげかける「といかけ」だよ。せつめい文は、といかけ → こたえ の じゅんで すすむ ことが おおい。",
    format: "choice",
    choices: ["といかけ", "こたえ", "あいさつ", "なまえ"],
    answer: "といかけ",
  },
  {
    id: `${U.explanatory}.q-3`,
    unitId: U.explanatory,
    prompt: "せつめい文を よむとき、たいせつなのは どれ？",
    explanation: "「なにを・なぜ・どうやって」を じゅんじょよく つかむこと。りゆうや れいを 見つけながら よむよ。",
    format: "choice",
    choices: ["じゅんじょと りゆうを つかむ", "字の 色を 見る", "ページ数を かぞえる", "はやく とばして よむ"],
    answer: "じゅんじょと りゆうを つかむ",
  },
  {
    id: `${U.explanatory}.q-4`,
    unitId: U.explanatory,
    prompt: "だんらくの 中で いちばん つたえたい 大じな 文を なんと いう？",
    explanation: "だんらくの ちゅうしんに なる 大じな 文を「ちゅうしん文（中心文）」と いうよ。ここを 見つけると ようやくできる。",
    format: "choice",
    choices: ["ちゅうしん文", "なまえ", "といかけ", "あいさつ"],
    answer: "ちゅうしん文",
  },
  {
    id: `${U.explanatory}.q-5`,
    unitId: U.explanatory,
    prompt: "「たとえば〜」と いう ことばの あとには、なにが くる？",
    explanation: "「たとえば」の あとには、せつめいを わかりやすくする ための「れい（例）」が くるよ。",
    format: "choice",
    choices: ["れい（具体れい）", "といかけ", "なまえ", "おわりの あいさつ"],
    answer: "れい（具体れい）",
  },
];

const narrativeQuestions: Question[] = [
  {
    id: `${U.narrative}.q-1`,
    unitId: U.narrative,
    prompt: "ものがたりに かならず でて くるのは どれ？",
    explanation: "ものがたりには、お話の 中で うごく「とうじょう人ぶつ」が でて くるよ。",
    format: "choice",
    choices: ["とうじょう人ぶつ", "といかけ", "ねだん", "ちず"],
    answer: "とうじょう人ぶつ",
  },
  {
    id: `${U.narrative}.q-2`,
    unitId: U.narrative,
    prompt: "とうじょう人ぶつの 気もちは、どこから よみとる？",
    explanation: "人ぶつの ことばや こうどう、ようすから 気もちを かんがえるよ。「とびはねた」なら うれしい、など。",
    format: "choice",
    choices: ["ことばや こうどう、ようす", "ページの ばんごう", "字の 大きさ", "本の ねだん"],
    answer: "ことばや こうどう、ようす",
  },
  {
    id: `${U.narrative}.q-3`,
    unitId: U.narrative,
    prompt: "「いつ・どこで・だれが」を おさえると、なにが わかる？",
    explanation: "「いつ・どこで・だれが」を つかむと、その ばめん（できごとの ようす）が はっきり わかるよ。",
    format: "choice",
    choices: ["ばめんの ようす", "字の かず", "本の おもさ", "ねだん"],
    answer: "ばめんの ようす",
  },
  {
    id: `${U.narrative}.q-4`,
    unitId: U.narrative,
    prompt: "「うれしくて とびはねた」から わかる 気もちは？",
    explanation: "「とびはねる」は うれしい ときの こうどう。だから この人ぶつは「うれしい」気もちだと わかるよ。",
    format: "choice",
    choices: ["うれしい", "かなしい", "おこっている", "こわい"],
    answer: "うれしい",
  },
  {
    id: `${U.narrative}.q-5`,
    unitId: U.narrative,
    prompt: "お話が すすんで、人ぶつの 気もちが かわる ところを なんと いう？",
    explanation: "お話が 大きく うごき、気もちが かわる ところを「ばめんの うつりかわり」と いうよ。ここに ちゅうもくしよう。",
    format: "choice",
    choices: ["ばめんの うつりかわり", "だんらくの 字数", "なまえの じゅん", "ページの 色"],
    answer: "ばめんの うつりかわり",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────

export const kokugoG3Contents: Record<string, UnitContent> = {
  [U.romaji]: {
    unitId: U.romaji,
    learn: {
      unitId: U.romaji,
      steps: [
        {
          heading: "ローマ字って なに？",
          body: "アルファベット（a b c …）を つかって、にほんごの おとを かく かきかただよ。",
          visual: { kind: "emoji", value: "🇦🇧🇨 ＝ あ い う", caption: "アルファベットで おとを かく" },
        },
        {
          heading: "あいうえおを ローマ字で",
          body: "あ=a、い=i、う=u、え=e、お=o。これに k や s を つけると、か=ka、さ=sa の ように かけるよ。",
          visual: { kind: "emoji", value: "あ→a / か→ka / さ→sa", caption: "おとを ひとつずつ なおす" },
        },
        {
          heading: "ローマ字は どこで つかう？",
          body: "コンピュータの にゅうりょくや、えきの なまえ、ローマ字の かんばんで つかうよ。みのまわりで さがしてみよう。",
          visual: { kind: "emoji", value: "💻🚉🪧", caption: "みのまわりの ローマ字" },
        },
      ],
    },
    test: {
      unitId: U.romaji,
      questions: romajiQuestions,
      questionCount: 5,
    },
  },

  [U.kanji200]: {
    unitId: U.kanji200,
    learn: {
      unitId: U.kanji200,
      steps: [
        {
          heading: "3年生の かんじ",
          body: "3年生では あたらしく 200字の かんじを ならうよ。「島・橋・動・practice の 練習」など、つかう ばめんが ふえるよ。",
          visual: { kind: "emoji", value: "📚 島 橋 動 練習", caption: "3年生で ふえる かんじ" },
        },
        {
          heading: "おんよみ と くんよみ",
          body: "かんじには よみかたが 2つ あることが おおいよ。「校」は こう（おん）、「学校」のように つかう。よみかたを セットで おぼえよう。",
          visual: { kind: "emoji", value: "校 → こう / 学校", caption: "おん と くん" },
        },
        {
          heading: "へん と つくり",
          body: "かんじは ぶぶん（部首）で できているよ。「橋」は 木へん。なかまの かんじを ぶぶんで おぼえると わすれにくい。",
          visual: { kind: "emoji", value: "🌳 木へん → 橋 板 様", caption: "ぶぶんで おぼえる" },
        },
      ],
    },
    test: {
      unitId: U.kanji200,
      questions: kanji200Questions,
      questionCount: 6,
    },
  },

  [U.modifiers]: {
    unitId: U.modifiers,
    learn: {
      unitId: U.modifiers,
      steps: [
        {
          heading: "くわしく する ことば",
          body: "「犬が はしる」より「白い 犬が はやく はしる」の ほうが ようすが よくわかるね。「白い」「はやく」が くわしく する ことばだよ。",
          visual: { kind: "emoji", value: "🐕 → 白い 犬が はやく はしる", caption: "ようすを くわしく" },
        },
        {
          heading: "どの ことばを くわしく する？",
          body: "くわしく する ことばは、すぐ あとの ことばに かかるよ。「赤い はな」なら「赤い」が「はな」を くわしく している。",
          visual: { kind: "emoji", value: "赤い → はな 🌺", caption: "すぐ あとに かかる" },
        },
      ],
    },
    test: {
      unitId: U.modifiers,
      questions: modifiersQuestions,
      questionCount: 5,
    },
  },

  [U.dictionary]: {
    unitId: U.dictionary,
    learn: {
      unitId: U.dictionary,
      steps: [
        {
          heading: "こくごじてんって なに？",
          body: "ことばの いみや つかいかたを しらべる ほんだよ。しらない ことばに であったとき じぶんで しらべられる。",
          visual: { kind: "emoji", value: "📕🔎", caption: "ことばを しらべる ほん" },
        },
        {
          heading: "ことばの ならびかた",
          body: "じてんの ことばは あいうえおの じゅんに ならんでいるよ。「あ」→「い」→「う」… の じゅん。",
          visual: { kind: "emoji", value: "あ→い→う→え→お", caption: "あいうえおの じゅん" },
        },
        {
          heading: "みつけかた",
          body: "1字めで だいたいの ばしょを さがし、おなじなら 2字めで くらべるよ。「さくら」と「さかな」は 2字めで きまる。",
          visual: { kind: "emoji", value: "さ|か … さ|く", caption: "1字め→2字めで さがす" },
        },
      ],
    },
    test: {
      unitId: U.dictionary,
      questions: dictionaryQuestions,
      questionCount: 5,
    },
  },

  [U.idioms]: {
    unitId: U.idioms,
    learn: {
      unitId: U.idioms,
      steps: [
        {
          heading: "かんようく って なに？",
          body: "いくつかの ことばが あわさって、べつの いみを あらわす いいかただよ。「あたまが いたい」=こまっている、など。",
          visual: { kind: "emoji", value: "🐈 ねこの手も かりたい", caption: "ことばで ようすを いう" },
        },
        {
          heading: "ことわざ って なに？",
          body: "むかしから つたわる、ちえや きょうくんの みじかい ことば。「いそがば まわれ」「さるも 木から おちる」など。",
          visual: { kind: "emoji", value: "🐒⬇️🌳", caption: "むかしの ちえ" },
        },
      ],
    },
    test: {
      unitId: U.idioms,
      questions: idiomsQuestions,
      questionCount: 5,
    },
  },

  [U.paragraph]: {
    unitId: U.paragraph,
    learn: {
      unitId: U.paragraph,
      steps: [
        {
          heading: "だんらく って なに？",
          body: "ながい 文しょうを、いみの まとまりで わけた ものだよ。一つの だんらくに だいたい 一つの 話が 入っている。",
          visual: { kind: "emoji", value: "📄 まとまり①／②／③", caption: "いみで わける" },
        },
        {
          heading: "だんらくの かきはじめ",
          body: "あたらしい だんらくは、ぎょうの あたまを 一ます さげて かきはじめる きまりだよ。",
          visual: { kind: "emoji", value: "□ あたらしい だんらく…", caption: "一ます さげる" },
        },
      ],
    },
    test: {
      unitId: U.paragraph,
      questions: paragraphQuestions,
      questionCount: 5,
    },
  },

  [U.explanatory]: {
    unitId: U.explanatory,
    learn: {
      unitId: U.explanatory,
      steps: [
        {
          heading: "せつめい文 って なに？",
          body: "ものごとを わかりやすく せつめいする 文しょうだよ。「といかけ」と「こたえ」、りゆうや れいが ある。",
          visual: { kind: "emoji", value: "❓→💡", caption: "といかけ → こたえ" },
        },
        {
          heading: "じゅんじょよく よもう",
          body: "「なにを・なぜ・どうやって」を じゅんに つかむよ。だんらくの 大じな 文（ちゅうしん文）を 見つけよう。",
          visual: { kind: "emoji", value: "①→②→③", caption: "じゅんじょを おさえる" },
        },
      ],
    },
    test: {
      unitId: U.explanatory,
      questions: explanatoryQuestions,
      questionCount: 5,
    },
  },

  [U.narrative]: {
    unitId: U.narrative,
    learn: {
      unitId: U.narrative,
      steps: [
        {
          heading: "ものがたり って なに？",
          body: "とうじょう人ぶつが いて、できごとが すすんでいく お話だよ。「いつ・どこで・だれが」を おさえよう。",
          visual: { kind: "emoji", value: "👧🐰🏞️", caption: "人ぶつと できごと" },
        },
        {
          heading: "気もちを よみとろう",
          body: "とうじょう人ぶつの ことばや こうどう、ようすから 気もちを かんがえるよ。「とびはねた」なら うれしい。",
          visual: { kind: "emoji", value: "😊⤴️ とびはねた", caption: "こうどうから 気もちへ" },
        },
        {
          heading: "ばめんの うつりかわり",
          body: "お話が すすむと ばめんが かわるよ。気もちが かわる ところに ちゅうもくすると、お話が よくわかる。",
          visual: { kind: "emoji", value: "🌅→🌙", caption: "ばめんが かわる" },
        },
      ],
    },
    test: {
      unitId: U.narrative,
      questions: narrativeQuestions,
      questionCount: 5,
    },
  },
};
