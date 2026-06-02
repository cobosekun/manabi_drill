// ══════════════════════════════════════════
// カリキュラム: 社会（しゃかい）小6
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
//
// 【SubjectId について（申し送り）】
//   drill.ts の SubjectId には "shakai" が既に含まれているため、本ファイルは
//   as / 局所型定義などの吸収を一切使わずそのまま型を通る。将来 shakai の
//   g3/g4/g5 を追加するときも、領域 slug は本ファイルの命名（politics / history /
//   international など）と整合させること。小6は通史・政治・国際の総まとめ学年。
//
// 全表示テキストはルビ記法 {漢字|よみ} で執筆（全漢字ルビ／RubyText で描画）。
// 既存 generators は社会に非対応 → 全単元 固定 questions[]（全問 explanation 必須）。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// ── 教科 ──────────────────────────────────

export const shakaiSubject: Subject = {
  id: "shakai",
  name: "しゃかい",
  formalName: "社会",
  emoji: "🌏",
  theme: "amber",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域（小6社会の3本柱: 政治 / 歴史 / 国際） ──

export const shakaiG6Domains: Domain[] = [
  {
    id: "shakai.politics",
    subjectId: "shakai",
    name: "せいじ（けんぽうとくらし）",
    formalName: "政治",
  },
  {
    id: "shakai.history",
    subjectId: "shakai",
    name: "れきし（日本のあゆみ）",
    formalName: "歴史",
  },
  {
    id: "shakai.international",
    subjectId: "shakai",
    name: "こくさい（世界の中の日本）",
    formalName: "国際",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし）:
//
//  [政治] constitution ─▶ three-powers ─▶ election
//             └──────────────────────────────▶ gendai
//  [歴史] jomon ─▶ yayoi ─▶ kofun ─▶ asuka-nara-heian ─▶ kamakura-muromachi
//             ─▶ sengoku ─▶ edo ─▶ meiji ─▶ taisho-showa ─▶ gendai
//  [国際] gendai ─▶ united-nations ─▶ international-cooperation
//
const U = {
  // 政治
  constitution: "shakai.g6.constitution",
  threePowers: "shakai.g6.three-powers",
  election: "shakai.g6.election",
  // 歴史（時代ごと）
  jomon: "shakai.g6.jomon",
  yayoi: "shakai.g6.yayoi",
  kofun: "shakai.g6.kofun",
  asukaNaraHeian: "shakai.g6.asuka-nara-heian",
  kamakuraMuromachi: "shakai.g6.kamakura-muromachi",
  sengoku: "shakai.g6.sengoku",
  edo: "shakai.g6.edo",
  meiji: "shakai.g6.meiji",
  taishoShowa: "shakai.g6.taisho-showa",
  gendai: "shakai.g6.gendai",
  // 国際
  unitedNations: "shakai.g6.united-nations",
  internationalCooperation: "shakai.g6.international-cooperation",
} as const;

export const shakaiG6Units: Unit[] = [
  // ── 政治 ──
  {
    id: U.constitution,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.politics",
    title: "{日本国憲法|にほんこくけんぽう}とくらし",
    order: 1,
    realWorldUse:
      "{選挙|せんきょ}でとうひょうしたり、{学校|がっこう}にかよえたりするのは{憲法|けんぽう}で{権利|けんり}がまもられているからだよ。まいにちのくらしのもとになっているんだ。",
    leadsTo: [U.threePowers, U.gendai],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.threePowers,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.politics",
    title: "{国|くに}の{政治|せいじ}のしくみ（{三権分立|さんけんぶんりつ}）",
    order: 2,
    realWorldUse:
      "{法律|ほうりつ}をつくる・{実行|じっこう}する・{争|あらそ}いをさばく{仕事|しごと}を3つにわけているよ。{力|ちから}がかたよらないようにするくふうだよ。",
    leadsTo: [U.election],
    prerequisites: [U.constitution],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.election,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.politics",
    title: "{選挙|せんきょ}とわたしたち",
    order: 3,
    realWorldUse:
      "{大|おお}きくなって18さいになると{投票|とうひょう}できるよ。だれに{国|くに}や{町|まち}をまかせるかを{自分|じぶん}でえらぶ{大切|たいせつ}なしくみだよ。",
    leadsTo: [],
    prerequisites: [U.threePowers],
    hasLearn: true,
    hasTest: true,
  },
  // ── 歴史（通史） ──
  {
    id: U.jomon,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{縄文|じょうもん}{時代|じだい}",
    order: 4,
    realWorldUse:
      "{大昔|おおむかし}の{人|ひと}が{自然|しぜん}とどうくらしたかがわかるよ。はくぶつかんで{土器|どき}やどぐうを{見|み}るときのてがかりになるよ。",
    leadsTo: [U.yayoi],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.yayoi,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{弥生|やよい}{時代|じだい}",
    order: 5,
    realWorldUse:
      "いまわたしたちが{毎日|まいにち}たべるお{米|こめ}づくりがはじまった{時代|じだい}だよ。{食|た}べものの{歴史|れきし}のはじまりなんだ。",
    leadsTo: [U.kofun],
    prerequisites: [U.jomon],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kofun,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{古墳|こふん}{時代|じだい}",
    order: 6,
    realWorldUse:
      "{大阪|おおさか}などにのこる{大|おお}きな{古墳|こふん}を{見|み}たとき、だれがなんのためにつくったかがわかるよ。",
    leadsTo: [U.asukaNaraHeian],
    prerequisites: [U.yayoi],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.asukaNaraHeian,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{飛鳥|あすか}・{奈良|なら}・{平安|へいあん}{時代|じだい}",
    order: 7,
    realWorldUse:
      "{奈良|なら}の{大仏|だいぶつ}や、ひらがな・カタカナのはじまりがこの{時代|じだい}だよ。{京都|きょうと}や{奈良|なら}のお{寺|てら}めぐりがたのしくなるよ。",
    leadsTo: [U.kamakuraMuromachi],
    prerequisites: [U.kofun],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.kamakuraMuromachi,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{鎌倉|かまくら}・{室町|むろまち}{時代|じだい}",
    order: 8,
    realWorldUse:
      "{武士|ぶし}が{国|くに}をおさめはじめた{時代|じだい}だよ。{金閣|きんかく}や{銀閣|ぎんかく}など、いまも{人気|にんき}のたてものがうまれたよ。",
    leadsTo: [U.sengoku],
    prerequisites: [U.asukaNaraHeian],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.sengoku,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{戦国|せんごく}{時代|じだい}",
    order: 9,
    realWorldUse:
      "{織田信長|おだのぶなが}や{豊臣秀吉|とよとみひでよし}など、テレビやゲームにもでてくる{有名|ゆうめい}な{武将|ぶしょう}がかつやくした{時代|じだい}だよ。",
    leadsTo: [U.edo],
    prerequisites: [U.kamakuraMuromachi],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.edo,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{江戸|えど}{時代|じだい}",
    order: 10,
    realWorldUse:
      "{歌舞伎|かぶき}や{浮世絵|うきよえ}、おすしなど、いまにつづく{文化|ぶんか}がたくさんうまれた{時代|じだい}だよ。",
    leadsTo: [U.meiji],
    prerequisites: [U.sengoku],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.meiji,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{明治|めいじ}{時代|じだい}",
    order: 11,
    realWorldUse:
      "{電車|でんしゃ}やランプ、{学校|がっこう}のしくみなど、{今|いま}のくらしのもとが{外国|がいこく}からはいってきた{時代|じだい}だよ。",
    leadsTo: [U.taishoShowa],
    prerequisites: [U.edo],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.taishoShowa,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{大正|たいしょう}・{昭和|しょうわ}{時代|じだい}（{戦争|せんそう}）",
    order: 12,
    realWorldUse:
      "{戦争|せんそう}のつらさと{平和|へいわ}の{大切|たいせつ}さがわかるよ。8{月|がつ}の{平和|へいわ}についてかんがえる{日|ひ}のいみもわかるんだ。",
    leadsTo: [U.gendai],
    prerequisites: [U.meiji],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.gendai,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.history",
    title: "{現代|げんだい}（{戦後|せんご}〜{今|いま}）",
    order: 13,
    realWorldUse:
      "{戦争|せんそう}のあと、どうやって{今|いま}のゆたかなくらしになったかがわかるよ。ニュースの{話題|わだい}のもとにもなっているよ。",
    leadsTo: [U.unitedNations],
    prerequisites: [U.taishoShowa, U.constitution],
    hasLearn: true,
    hasTest: true,
  },
  // ── 国際 ──
  {
    id: U.unitedNations,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.international",
    title: "{国際連合|こくさいれんごう}（{国連|こくれん}）",
    order: 14,
    realWorldUse:
      "ユニセフのぼきんや、テレビでみる{国連|こくれん}のニュースのいみがわかるよ。{世界|せかい}の{国|くに}ぐにが{力|ちから}をあわせるしくみだよ。",
    leadsTo: [U.internationalCooperation],
    prerequisites: [U.gendai],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.internationalCooperation,
    subjectId: "shakai",
    grade: 6,
    domainId: "shakai.international",
    title: "{国際協力|こくさいきょうりょく}とこれからの日本",
    order: 15,
    realWorldUse:
      "{外国|がいこく}でこまっている{人|ひと}をたすけるボランティアや、{地球|ちきゅう}かんきょうをまもる{活動|かつどう}のいみがわかるよ。",
    leadsTo: [],
    prerequisites: [U.unitedNations],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 社会は固定 questions[]（全問 explanation 必須・4択・誤答ももっともらしく）。

// 政治: 日本国憲法
const constitutionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.constitution}.q-1`,
    unitId: U.constitution,
    prompt: "{日本国憲法|にほんこくけんぽう}の3つの{原則|げんそく}にふくまれないものはどれ？",
    explanation:
      "3つの{原則|げんそく}は「{国民主権|こくみんしゅけん}」「{基本的人権|きほんてきじんけん}の{尊重|そんちょう}」「{平和主義|へいわしゅぎ}」だよ。「{王様|おうさま}{中心|ちゅうしん}」はふくまれないよ。",
    visual: { kind: "emoji", value: "📜", caption: "けんぽう" },
    format: "choice",
    choices: ["{国民主権|こくみんしゅけん}", "{基本的人権|きほんてきじんけん}の{尊重|そんちょう}", "{平和主義|へいわしゅぎ}", "{王様|おうさま}{中心|ちゅうしん}"],
    answer: "{王様|おうさま}{中心|ちゅうしん}",
  },
  {
    id: `${U.constitution}.q-2`,
    unitId: U.constitution,
    prompt: "「{国民主権|こくみんしゅけん}」とは、{国|くに}のことを{決|き}める{力|ちから}はだれにあるという{考|かんが}え？",
    explanation:
      "「{主権|しゅけん}」は{国|くに}のあり{方|かた}を{決|き}める{力|ちから}のこと。それが{国民|こくみん}（みんな）にあるのが{国民主権|こくみんしゅけん}だよ。",
    visual: { kind: "emoji", value: "🙋‍♀️🙋‍♂️", caption: "こくみん" },
    format: "choice",
    choices: ["{国民|こくみん}", "{天皇|てんのう}", "{総理大臣|そうりだいじん}", "{外国|がいこく}"],
    answer: "{国民|こくみん}",
  },
  {
    id: `${U.constitution}.q-3`,
    unitId: U.constitution,
    prompt: "{憲法|けんぽう}で{天皇|てんのう}はどんな{立場|たちば}とされている？",
    explanation:
      "いまの{天皇|てんのう}は{政治|せいじ}の{力|ちから}をもたず、日本の国や{国民|こくみん}のまとまりの「{象徴|しょうちょう}（シンボル）」とされているよ。",
    visual: { kind: "emoji", value: "🎌", caption: "しょうちょう" },
    format: "choice",
    choices: ["日本の{象徴|しょうちょう}", "{軍隊|ぐんたい}のリーダー", "{裁判官|さいばんかん}", "{学校|がっこう}の{先生|せんせい}"],
    answer: "日本の{象徴|しょうちょう}",
  },
  {
    id: `${U.constitution}.q-4`,
    unitId: U.constitution,
    prompt: "「{平和主義|へいわしゅぎ}」について{正|ただ}しいのはどれ？",
    explanation:
      "日本は{戦争|せんそう}をしないことを{憲法|けんぽう}で{決|き}めているよ。これが{平和主義|へいわしゅぎ}で、9{条|じょう}にかかれているよ。",
    visual: { kind: "emoji", value: "🕊️", caption: "へいわ" },
    format: "choice",
    choices: ["{戦争|せんそう}をしないと{決|き}めている", "いつでも{戦争|せんそう}してよい", "{外国|がいこく}をせめてよい", "{武器|ぶき}をたくさんつくる"],
    answer: "{戦争|せんそう}をしないと{決|き}めている",
  },
  {
    id: `${U.constitution}.q-5`,
    unitId: U.constitution,
    prompt: "{学校|がっこう}でべんきょうできるのは、どんな{権利|けんり}がまもられているから？",
    explanation:
      "だれもがべんきょうできる「{教育|きょういく}をうける{権利|けんり}」が{基本的人権|きほんてきじんけん}としてまもられているからだよ。",
    visual: { kind: "emoji", value: "🏫📚", caption: "まなぶけんり" },
    format: "choice",
    choices: ["{教育|きょういく}をうける{権利|けんり}", "せんそうをする{権利|けんり}", "ぜいきんをはらわない{権利|けんり}", "なんでもかう{権利|けんり}"],
    answer: "{教育|きょういく}をうける{権利|けんり}",
  },
];

// 政治: 三権分立
const threePowersQuestions: ChoiceQuestion[] = [
  {
    id: `${U.threePowers}.q-1`,
    unitId: U.threePowers,
    prompt: "{法律|ほうりつ}をつくる{仕事|しごと}（{立法|りっぽう}）をするのはどこ？",
    explanation:
      "{法律|ほうりつ}をつくるのは{国会|こっかい}だよ。{選挙|せんきょ}でえらばれた{議員|ぎいん}があつまって{話|はな}しあうところだよ。",
    visual: { kind: "emoji", value: "🏛️", caption: "こっかい" },
    format: "choice",
    choices: ["{国会|こっかい}", "{内閣|ないかく}", "{裁判所|さいばんしょ}", "{警察|けいさつ}"],
    answer: "{国会|こっかい}",
  },
  {
    id: `${U.threePowers}.q-2`,
    unitId: U.threePowers,
    prompt: "{決|き}まった{法律|ほうりつ}にそって{国|くに}の{仕事|しごと}を{進|すす}める（{行政|ぎょうせい}）のはどこ？",
    explanation:
      "{内閣|ないかく}が{行政|ぎょうせい}をするよ。リーダーは{内閣総理大臣|ないかくそうりだいじん}（{総理|そうり}）だよ。",
    visual: { kind: "emoji", value: "🏢", caption: "ないかく" },
    format: "choice",
    choices: ["{内閣|ないかく}", "{国会|こっかい}", "{裁判所|さいばんしょ}", "{学校|がっこう}"],
    answer: "{内閣|ないかく}",
  },
  {
    id: `${U.threePowers}.q-3`,
    unitId: U.threePowers,
    prompt: "{争|あらそ}いごとを{法律|ほうりつ}にもとづいてさばく（{司法|しほう}）のはどこ？",
    explanation:
      "{裁判所|さいばんしょ}が{裁判|さいばん}をして、どちらが{正|ただ}しいかを{法律|ほうりつ}でさばくよ。",
    visual: { kind: "emoji", value: "⚖️", caption: "さいばんしょ" },
    format: "choice",
    choices: ["{裁判所|さいばんしょ}", "{国会|こっかい}", "{内閣|ないかく}", "{市役所|しやくしょ}"],
    answer: "{裁判所|さいばんしょ}",
  },
  {
    id: `${U.threePowers}.q-4`,
    unitId: U.threePowers,
    prompt: "{国|くに}の{力|ちから}を3つにわけることを{何|なん}という？",
    explanation:
      "{立法|りっぽう}・{行政|ぎょうせい}・{司法|しほう}の3つにわけることを{三権分立|さんけんぶんりつ}というよ。{力|ちから}がかたよらないためのくふうだよ。",
    visual: { kind: "emoji", value: "🔱", caption: "さんけんぶんりつ" },
    format: "choice",
    choices: ["{三権分立|さんけんぶんりつ}", "{参勤交代|さんきんこうたい}", "{文明開化|ぶんめいかいか}", "{鎖国|さこく}"],
    answer: "{三権分立|さんけんぶんりつ}",
  },
  {
    id: `${U.threePowers}.q-5`,
    unitId: U.threePowers,
    prompt: "{内閣総理大臣|ないかくそうりだいじん}はどうやってえらばれる？",
    explanation:
      "{総理大臣|そうりだいじん}は{国会|こっかい}の{議員|ぎいん}の{中|なか}から、{国会|こっかい}の{話|はな}しあいでえらばれるよ。",
    visual: { kind: "emoji", value: "🗳️", caption: "こっかいでえらぶ" },
    format: "choice",
    choices: ["{国会|こっかい}でえらばれる", "{国民|こくみん}が{直接|ちょくせつ}えらぶ", "{天皇|てんのう}が{決|き}める", "{外国|がいこく}が{決|き}める"],
    answer: "{国会|こっかい}でえらばれる",
  },
];

// 政治: 選挙
const electionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.election}.q-1`,
    unitId: U.election,
    prompt: "{今|いま}の日本で{選挙|せんきょ}でとうひょうできるのは{何|なん}さいから？",
    explanation:
      "18さいになるととうひょうできるよ。2016{年|ねん}から20さいより{早|はや}い18さいにかわったよ。",
    visual: { kind: "emoji", value: "🗳️", caption: "18さい" },
    format: "choice",
    choices: ["18さい", "12さい", "15さい", "25さい"],
    answer: "18さい",
  },
  {
    id: `${U.election}.q-2`,
    unitId: U.election,
    prompt: "{選挙|せんきょ}でわたしたちは{何|なに}をする？",
    explanation:
      "{自分|じぶん}たちのかわりに{政治|せいじ}をしてほしい{人|ひと}（{代表|だいひょう}）をえらんでとうひょうするよ。",
    visual: { kind: "emoji", value: "✍️🗳️", caption: "とうひょう" },
    format: "choice",
    choices: ["{代表|だいひょう}をえらんでとうひょうする", "おかねをはらう", "{戦争|せんそう}をきめる", "{法律|ほうりつ}を{書|か}く"],
    answer: "{代表|だいひょう}をえらんでとうひょうする",
  },
  {
    id: `${U.election}.q-3`,
    unitId: U.election,
    prompt: "{選挙|せんきょ}でだれにいれたかを{他|ほか}の{人|ひと}に{言|い}わなくてよいのはなぜ？",
    explanation:
      "とうひょうはひみつ（{秘密|ひみつ}{選挙|せんきょ}）。だれにいれたかをかくせるので、{自分|じぶん}のかんがえで{自由|じゆう}にえらべるよ。",
    visual: { kind: "emoji", value: "🤫", caption: "ひみつ" },
    format: "choice",
    choices: ["とうひょうはひみつだから", "おかねがかかるから", "{法律|ほうりつ}でいわなければならないから", "{先生|せんせい}が{決|き}めるから"],
    answer: "とうひょうはひみつだから",
  },
  {
    id: `${U.election}.q-4`,
    unitId: U.election,
    prompt: "とうひょうする{人|ひと}がへると、どんなこまったことがおきる？",
    explanation:
      "とうひょうがへると、{少|すく}ない{人|ひと}のかんがえだけで{政治|せいじ}が{決|き}まってしまうよ。だからみんなが{参加|さんか}することが{大切|たいせつ}だよ。",
    visual: { kind: "emoji", value: "📉", caption: "ていとうひょう" },
    format: "choice",
    choices: [
      "{少|すく}ない{人|ひと}のかんがえで{決|き}まってしまう",
      "ぜいきんがなくなる",
      "{学校|がっこう}がふえる",
      "なにもおきない",
    ],
    answer: "{少|すく}ない{人|ひと}のかんがえで{決|き}まってしまう",
  },
  {
    id: `${U.election}.q-5`,
    unitId: U.election,
    prompt: "{市|し}や{町|まち}のリーダー（{市長|しちょう}や{町長|ちょうちょう}）はどうやって{決|き}まる？",
    explanation:
      "{市長|しちょう}や{町長|ちょうちょう}も、そこにすむ{人|ひと}たちの{選挙|せんきょ}でえらばれるよ。",
    visual: { kind: "emoji", value: "🏙️", caption: "しちょう" },
    format: "choice",
    choices: ["すむ{人|ひと}たちの{選挙|せんきょ}", "{総理大臣|そうりだいじん}が{決|き}める", "じゃんけん", "{天皇|てんのう}が{決|き}める"],
    answer: "すむ{人|ひと}たちの{選挙|せんきょ}",
  },
];

// 歴史: 縄文時代
const jomonQuestions: ChoiceQuestion[] = [
  {
    id: `${U.jomon}.q-1`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{人|ひと}は、おもにどうやって{食|た}べものをえていた？",
    explanation:
      "{縄文|じょうもん}{時代|じだい}はまだお{米|こめ}づくりがなく、けものをかったり{木|き}の{実|み}をひろったり{魚|さかな}をとったりしてくらしていたよ。",
    visual: { kind: "emoji", value: "🏹🌰🐟", caption: "かり・さいしゅう" },
    format: "choice",
    choices: ["かりやさいしゅう", "お{米|こめ}づくり", "おみせでかう", "こうじょうでつくる"],
    answer: "かりやさいしゅう",
  },
  {
    id: `${U.jomon}.q-2`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}につかわれた、なわのもようがついた{土器|どき}を{何|なん}という？",
    explanation:
      "なわをおしつけたようなもようがある{土器|どき}だから「{縄文|じょうもん}{土器|どき}」というよ。じょうぶで{食|た}べものをにるのにつかったよ。",
    visual: { kind: "emoji", value: "🏺", caption: "じょうもんどき" },
    format: "choice",
    choices: ["{縄文|じょうもん}{土器|どき}", "{弥生|やよい}{土器|どき}", "はにわ", "ガラスびん"],
    answer: "{縄文|じょうもん}{土器|どき}",
  },
  {
    id: `${U.jomon}.q-3`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{人|ひと}がすんでいた、{地面|じめん}をほってつくった{家|いえ}を{何|なん}という？",
    explanation:
      "{地面|じめん}をほりさげて{屋根|やね}をかけた「たてあな{住居|じゅうきょ}」にすんでいたよ。",
    visual: { kind: "emoji", value: "🛖", caption: "たてあなじゅうきょ" },
    format: "choice",
    choices: ["たてあな{住居|じゅうきょ}", "マンション", "おしろ", "ビル"],
    answer: "たてあな{住居|じゅうきょ}",
  },
  {
    id: `${U.jomon}.q-4`,
    unitId: U.jomon,
    prompt: "{食|た}べたあとの{貝|かい}がらやほねをすてたあとが{山|やま}になったものを{何|なん}という？",
    explanation:
      "ごみすて{場|ば}のあとが「{貝塚|かいづか}」だよ。{当時|とうじ}の{人|ひと}が{何|なに}を{食|た}べていたかがわかる{大切|たいせつ}なてがかりだよ。",
    visual: { kind: "emoji", value: "🐚", caption: "かいづか" },
    format: "choice",
    choices: ["{貝塚|かいづか}", "{古墳|こふん}", "{城|しろ}", "{神社|じんじゃ}"],
    answer: "{貝塚|かいづか}",
  },
  {
    id: `${U.jomon}.q-5`,
    unitId: U.jomon,
    prompt: "{青森|あおもり}けんにある、{大|おお}きな{縄文|じょうもん}のむらのあとを{何|なん}という？",
    explanation:
      "「{三内丸山|さんないまるやま}{遺跡|いせき}」だよ。{大|おお}きな{建物|たてもの}のあとがみつかり、{縄文|じょうもん}の{人|ひと}のくらしがよくわかるよ。",
    visual: { kind: "emoji", value: "🏞️", caption: "いせき" },
    format: "choice",
    choices: ["{三内丸山|さんないまるやま}{遺跡|いせき}", "{大阪城|おおさかじょう}", "{東大寺|とうだいじ}", "{平城京|へいじょうきょう}"],
    answer: "{三内丸山|さんないまるやま}{遺跡|いせき}",
  },
];

// 歴史: 弥生時代
const yayoiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.yayoi}.q-1`,
    unitId: U.yayoi,
    prompt: "{弥生|やよい}{時代|じだい}に{大陸|たいりく}からつたわり、くらしを{大|おお}きくかえたものは{何|なん}？",
    explanation:
      "お{米|こめ}づくり（{稲作|いなさく}）がつたわったよ。{食|た}べものをためられるようになり、むらができていったよ。",
    visual: { kind: "emoji", value: "🌾", caption: "いなさく" },
    format: "choice",
    choices: ["お{米|こめ}づくり（{稲作|いなさく}）", "{自動車|じどうしゃ}", "テレビ", "{新幹線|しんかんせん}"],
    answer: "お{米|こめ}づくり（{稲作|いなさく}）",
  },
  {
    id: `${U.yayoi}.q-2`,
    unitId: U.yayoi,
    prompt: "とれたお{米|こめ}をたくわえるためにつくられたたてものは{何|なん}？",
    explanation:
      "ゆかを{高|たか}くした「{高床倉庫|たかゆかそうこ}」にお{米|こめ}をしまったよ。ねずみやしめりけをふせぐくふうだよ。",
    visual: { kind: "emoji", value: "🏚️🌾", caption: "たかゆかそうこ" },
    format: "choice",
    choices: ["{高床倉庫|たかゆかそうこ}", "たてあな{住居|じゅうきょ}", "おしろ", "{駅|えき}"],
    answer: "{高床倉庫|たかゆかそうこ}",
  },
  {
    id: `${U.yayoi}.q-3`,
    unitId: U.yayoi,
    prompt: "お{米|こめ}づくりがはじまって、むらの{間|あいだ}でおきるようになったことは{何|なん}？",
    explanation:
      "{土地|とち}や{水|みず}、お{米|こめ}をめぐって、むらどうしの{争|あらそ}い（{戦|たたか}い）がおきるようになったよ。やがて{力|ちから}の{強|つよ}いくにができたよ。",
    visual: { kind: "emoji", value: "⚔️", caption: "むらのあらそい" },
    format: "choice",
    choices: ["むらどうしの{争|あらそ}い", "うちゅうりょこう", "オリンピック", "{選挙|せんきょ}"],
    answer: "むらどうしの{争|あらそ}い",
  },
  {
    id: `${U.yayoi}.q-4`,
    unitId: U.yayoi,
    prompt: "{邪馬台国|やまたいこく}をおさめたとされる{女王|じょおう}はだれ？",
    explanation:
      "{女王|じょおう}「{卑弥呼|ひみこ}」だよ。{中国|ちゅうごく}の{古|ふる}い{本|ほん}に、まじないで{国|くに}をおさめたとかかれているよ。",
    visual: { kind: "emoji", value: "👑", caption: "ひみこ" },
    format: "choice",
    choices: ["{卑弥呼|ひみこ}", "{紫式部|むらさきしきぶ}", "{聖徳太子|しょうとくたいし}", "{織田信長|おだのぶなが}"],
    answer: "{卑弥呼|ひみこ}",
  },
  {
    id: `${U.yayoi}.q-5`,
    unitId: U.yayoi,
    prompt: "{弥生|やよい}{時代|じだい}の{大|おお}きなむらのあとがのこる、{佐賀|さが}けんの{遺跡|いせき}は{何|なん}？",
    explanation:
      "「{吉野|よしの}ヶ{里|り}{遺跡|いせき}」だよ。まわりをほりやさくでかこんだ、{戦|たたか}いにそなえたむらのようすがわかるよ。",
    visual: { kind: "emoji", value: "🏯", caption: "いせき" },
    format: "choice",
    choices: ["{吉野|よしの}ヶ{里|り}{遺跡|いせき}", "{三内丸山|さんないまるやま}{遺跡|いせき}", "{金閣|きんかく}", "{江戸城|えどじょう}"],
    answer: "{吉野|よしの}ヶ{里|り}{遺跡|いせき}",
  },
];

// 歴史: 古墳時代
const kofunQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kofun}.q-1`,
    unitId: U.kofun,
    prompt: "{力|ちから}の{強|つよ}い{豪族|ごうぞく}や{王|おう}のためにつくられた、{大|おお}きなおはかを{何|なん}という？",
    explanation:
      "{土|つち}をもりあげてつくった{大|おお}きなおはかを「{古墳|こふん}」というよ。{力|ちから}の{大|おお}きさをしめしていたよ。",
    visual: { kind: "emoji", value: "⛰️", caption: "こふん" },
    format: "choice",
    choices: ["{古墳|こふん}", "{貝塚|かいづか}", "{神社|じんじゃ}", "ダム"],
    answer: "{古墳|こふん}",
  },
  {
    id: `${U.kofun}.q-2`,
    unitId: U.kofun,
    prompt: "{鍵穴|かぎあな}のような{形|かたち}をした、日本{独特|どくとく}の{古墳|こふん}を{何|なん}という？",
    explanation:
      "まるとしかくをあわせた{形|かたち}の「{前方後円墳|ぜんぽうこうえんふん}」だよ。{大阪|おおさか}の{大仙古墳|だいせんこふん}が{有名|ゆうめい}だよ。",
    visual: { kind: "emoji", value: "🔑", caption: "ぜんぽうこうえんふん" },
    format: "choice",
    choices: ["{前方後円墳|ぜんぽうこうえんふん}", "ピラミッド", "たてあな{住居|じゅうきょ}", "{天守閣|てんしゅかく}"],
    answer: "{前方後円墳|ぜんぽうこうえんふん}",
  },
  {
    id: `${U.kofun}.q-3`,
    unitId: U.kofun,
    prompt: "{古墳|こふん}のまわりにならべられた、{人|ひと}や{動物|どうぶつ}の{形|かたち}のやきものを{何|なん}という？",
    explanation:
      "「はにわ」だよ。{古墳|こふん}をかざったり、まもったりするためにおかれたといわれているよ。",
    visual: { kind: "emoji", value: "🗿", caption: "はにわ" },
    format: "choice",
    choices: ["はにわ", "どぐう", "{大仏|だいぶつ}", "ロボット"],
    answer: "はにわ",
  },
  {
    id: `${U.kofun}.q-4`,
    unitId: U.kofun,
    prompt: "{奈良|なら}{地方|ちほう}を{中心|ちゅうしん}に、{各地|かくち}の{豪族|ごうぞく}をまとめた{政府|せいふ}を{何|なん}という？",
    explanation:
      "「{大和朝廷|やまとちょうてい}（{大和政権|やまとせいけん}）」だよ。リーダーは「{大王|おおきみ}」とよばれ、のちの{天皇|てんのう}につながるよ。",
    visual: { kind: "emoji", value: "🏛️", caption: "やまとちょうてい" },
    format: "choice",
    choices: ["{大和朝廷|やまとちょうてい}", "{江戸幕府|えどばくふ}", "{国際連合|こくさいれんごう}", "{鎌倉幕府|かまくらばくふ}"],
    answer: "{大和朝廷|やまとちょうてい}",
  },
  {
    id: `${U.kofun}.q-5`,
    unitId: U.kofun,
    prompt: "{世界|せかい}{最大|さいだい}クラスの{古墳|こふん}「{大仙古墳|だいせんこふん}」があるのはどこ？",
    explanation:
      "{大阪|おおさか}ふの{堺|さかい}{市|し}にあるよ。{仁徳天皇|にんとくてんのう}のおはかといわれ、{世界|せかい}{遺産|いさん}にもなっているよ。",
    visual: { kind: "emoji", value: "🌍", caption: "おおさか" },
    format: "choice",
    choices: ["{大阪|おおさか}", "{北海道|ほっかいどう}", "{沖縄|おきなわ}", "{東京|とうきょう}"],
    answer: "{大阪|おおさか}",
  },
];

// 歴史: 飛鳥・奈良・平安
const asukaQuestions: ChoiceQuestion[] = [
  {
    id: `${U.asukaNaraHeian}.q-1`,
    unitId: U.asukaNaraHeian,
    prompt: "{天皇|てんのう}を{中心|ちゅうしん}とした{国|くに}づくりをすすめ、{十七条|じゅうしちじょう}の{憲法|けんぽう}をつくったとされる{人|ひと}はだれ？",
    explanation:
      "「{聖徳太子|しょうとくたいし}」だよ。{役人|やくにん}のこころがまえをしめした{十七条|じゅうしちじょう}の{憲法|けんぽう}をつくったとされるよ。",
    visual: { kind: "emoji", value: "📜", caption: "しょうとくたいし" },
    format: "choice",
    choices: ["{聖徳太子|しょうとくたいし}", "{織田信長|おだのぶなが}", "{徳川家康|とくがわいえやす}", "{源頼朝|みなもとのよりとも}"],
    answer: "{聖徳太子|しょうとくたいし}",
  },
  {
    id: `${U.asukaNaraHeian}.q-2`,
    unitId: U.asukaNaraHeian,
    prompt: "{奈良|なら}の{東大寺|とうだいじ}に{大|おお}きな{大仏|だいぶつ}をつくらせた{天皇|てんのう}はだれ？",
    explanation:
      "「{聖武天皇|しょうむてんのう}」だよ。{病気|びょうき}や{災害|さいがい}から{国|くに}をまもろうと{大仏|だいぶつ}をつくらせたよ。",
    visual: { kind: "emoji", value: "🙏", caption: "だいぶつ" },
    format: "choice",
    choices: ["{聖武天皇|しょうむてんのう}", "{卑弥呼|ひみこ}", "{豊臣秀吉|とよとみひでよし}", "{足利義満|あしかがよしみつ}"],
    answer: "{聖武天皇|しょうむてんのう}",
  },
  {
    id: `${U.asukaNaraHeian}.q-3`,
    unitId: U.asukaNaraHeian,
    prompt: "794{年|ねん}に{京都|きょうと}にうつされた{都|みやこ}を{何|なん}という？",
    explanation:
      "「{平安京|へいあんきょう}」だよ。「{鳴|な}くよ（794）うぐいす{平安京|へいあんきょう}」とおぼえるよ。",
    visual: { kind: "emoji", value: "🏯", caption: "へいあんきょう" },
    format: "choice",
    choices: ["{平安京|へいあんきょう}", "{江戸|えど}", "{鎌倉|かまくら}", "{大阪|おおさか}"],
    answer: "{平安京|へいあんきょう}",
  },
  {
    id: `${U.asukaNaraHeian}.q-4`,
    unitId: U.asukaNaraHeian,
    prompt: "{平安|へいあん}{時代|じだい}に「{源氏物語|げんじものがたり}」をかいた{人|ひと}はだれ？",
    explanation:
      "「{紫式部|むらさきしきぶ}」だよ。ひらがなをつかって{長|なが}い{物語|ものがたり}をかいたよ。「{枕草子|まくらのそうし}」の{清少納言|せいしょうなごん}とならぶ{有名|ゆうめい}な{作家|さっか}だよ。",
    visual: { kind: "emoji", value: "📖", caption: "げんじものがたり" },
    format: "choice",
    choices: ["{紫式部|むらさきしきぶ}", "{聖徳太子|しょうとくたいし}", "{徳川家康|とくがわいえやす}", "{卑弥呼|ひみこ}"],
    answer: "{紫式部|むらさきしきぶ}",
  },
  {
    id: `${U.asukaNaraHeian}.q-5`,
    unitId: U.asukaNaraHeian,
    prompt: "{平安|へいあん}{時代|じだい}に日本でうまれた、{漢字|かんじ}をもとにした{文字|もじ}は{何|なん}？",
    explanation:
      "「ひらがな」や「カタカナ」だよ。{漢字|かんじ}をくずしたりして日本{独自|どくじ}の{文字|もじ}がうまれ、{文学|ぶんがく}がさかんになったよ。",
    visual: { kind: "emoji", value: "✍️", caption: "かなもじ" },
    format: "choice",
    choices: ["ひらがな・カタカナ", "アルファベット", "{数字|すうじ}", "{絵文字|えもじ}"],
    answer: "ひらがな・カタカナ",
  },
];

// 歴史: 鎌倉・室町
const kamakuraQuestions: ChoiceQuestion[] = [
  {
    id: `${U.kamakuraMuromachi}.q-1`,
    unitId: U.kamakuraMuromachi,
    prompt: "{鎌倉|かまくら}に{幕府|ばくふ}をひらき、{武士|ぶし}の{政治|せいじ}をはじめた{人|ひと}はだれ？",
    explanation:
      "「{源頼朝|みなもとのよりとも}」だよ。{征夷大将軍|せいいたいしょうぐん}となり、{鎌倉|かまくら}{幕府|ばくふ}をひらいたよ。",
    visual: { kind: "emoji", value: "🏇", caption: "みなもとのよりとも" },
    format: "choice",
    choices: ["{源頼朝|みなもとのよりとも}", "{聖徳太子|しょうとくたいし}", "{豊臣秀吉|とよとみひでよし}", "{卑弥呼|ひみこ}"],
    answer: "{源頼朝|みなもとのよりとも}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-2`,
    unitId: U.kamakuraMuromachi,
    prompt: "{鎌倉|かまくら}{時代|じだい}に、{元|げん}（モンゴル）が2{度|ど}せめてきたできごとを{何|なん}という？",
    explanation:
      "「{元寇|げんこう}」だよ。{暴風雨|ぼうふうう}などもあって{元|げん}をしりぞけたけれど、{幕府|ばくふ}はよわっていったよ。",
    visual: { kind: "emoji", value: "🌊⛵", caption: "げんこう" },
    format: "choice",
    choices: ["{元寇|げんこう}", "{鎖国|さこく}", "{文明開化|ぶんめいかいか}", "{大化|たいか}の{改新|かいしん}"],
    answer: "{元寇|げんこう}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-3`,
    unitId: U.kamakuraMuromachi,
    prompt: "{京都|きょうと}に{金|きん}ぴかの「{金閣|きんかく}」をたてた{室町|むろまち}{幕府|ばくふ}の{将軍|しょうぐん}はだれ？",
    explanation:
      "「{足利義満|あしかがよしみつ}」だよ。{金閣|きんかく}は{今|いま}も{京都|きょうと}の{人気|にんき}のかんこうちだよ。",
    visual: { kind: "emoji", value: "🏯✨", caption: "きんかく" },
    format: "choice",
    choices: ["{足利義満|あしかがよしみつ}", "{徳川家康|とくがわいえやす}", "{源頼朝|みなもとのよりとも}", "{明治天皇|めいじてんのう}"],
    answer: "{足利義満|あしかがよしみつ}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-4`,
    unitId: U.kamakuraMuromachi,
    prompt: "しずかでおちついた「{銀閣|ぎんかく}」をたてた{将軍|しょうぐん}はだれ？",
    explanation:
      "「{足利義政|あしかがよしまさ}」だよ。このころ、たたみや{床|とこ}の{間|ま}など{今|いま}の{和室|わしつ}につながる{文化|ぶんか}がうまれたよ。",
    visual: { kind: "emoji", value: "🏯", caption: "ぎんかく" },
    format: "choice",
    choices: ["{足利義政|あしかがよしまさ}", "{足利義満|あしかがよしみつ}", "{織田信長|おだのぶなが}", "{聖武天皇|しょうむてんのう}"],
    answer: "{足利義政|あしかがよしまさ}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-5`,
    unitId: U.kamakuraMuromachi,
    prompt: "{鎌倉|かまくら}{時代|じだい}、{将軍|しょうぐん}と{武士|ぶし}（ごけにん）はどんなかんけいでむすばれていた？",
    explanation:
      "{将軍|しょうぐん}が{土地|とち}をまもり（ごおん）、{武士|ぶし}は{戦|たたか}いで{力|ちから}をつくす（ほうこう）かんけいだよ。これを「ごおんとほうこう」というよ。",
    visual: { kind: "emoji", value: "🤝", caption: "ごおんとほうこう" },
    format: "choice",
    choices: ["ごおんとほうこう", "{鎖国|さこく}", "{三権分立|さんけんぶんりつ}", "{参勤交代|さんきんこうたい}"],
    answer: "ごおんとほうこう",
  },
];

// 歴史: 戦国
const sengokuQuestions: ChoiceQuestion[] = [
  {
    id: `${U.sengoku}.q-1`,
    unitId: U.sengoku,
    prompt: "1543{年|ねん}ごろ、たねがしまにつたわって{戦|たたか}い{方|かた}をかえた{武器|ぶき}は{何|なん}？",
    explanation:
      "「{鉄砲|てっぽう}」だよ。ポルトガル{人|じん}からつたわり、{戦|たたか}いのしかたが{大|おお}きくかわったよ。",
    visual: { kind: "emoji", value: "🔫", caption: "てっぽう" },
    format: "choice",
    choices: ["{鉄砲|てっぽう}", "{刀|かたな}", "{弓矢|ゆみや}", "ミサイル"],
    answer: "{鉄砲|てっぽう}",
  },
  {
    id: `${U.sengoku}.q-2`,
    unitId: U.sengoku,
    prompt: "{鉄砲|てっぽう}をうまくつかい、{天下|てんか}とういつをめざした{武将|ぶしょう}はだれ？",
    explanation:
      "「{織田信長|おだのぶなが}」だよ。{楽市楽座|らくいちらくざ}など{新|あたら}しいやり{方|かた}で{力|ちから}をのばしたよ。",
    visual: { kind: "emoji", value: "🏯", caption: "おだのぶなが" },
    format: "choice",
    choices: ["{織田信長|おだのぶなが}", "{源頼朝|みなもとのよりとも}", "{聖徳太子|しょうとくたいし}", "{紫式部|むらさきしきぶ}"],
    answer: "{織田信長|おだのぶなが}",
  },
  {
    id: `${U.sengoku}.q-3`,
    unitId: U.sengoku,
    prompt: "{信長|のぶなが}のあとをついで{全国|ぜんこく}をとういつした{武将|ぶしょう}はだれ？",
    explanation:
      "「{豊臣秀吉|とよとみひでよし}」だよ。{検地|けんち}や{刀狩|かたながり}をおこなって{天下|てんか}とういつをなしとげたよ。",
    visual: { kind: "emoji", value: "🍶", caption: "とよとみひでよし" },
    format: "choice",
    choices: ["{豊臣秀吉|とよとみひでよし}", "{徳川家康|とくがわいえやす}", "{足利義満|あしかがよしみつ}", "{卑弥呼|ひみこ}"],
    answer: "{豊臣秀吉|とよとみひでよし}",
  },
  {
    id: `${U.sengoku}.q-4`,
    unitId: U.sengoku,
    prompt: "{秀吉|ひでよし}が、{農民|のうみん}から{刀|かたな}などの{武器|ぶき}をとりあげた{政策|せいさく}を{何|なん}という？",
    explanation:
      "「{刀狩|かたながり}」だよ。{農民|のうみん}と{武士|ぶし}の{身分|みぶん}をはっきり{分|わ}けるねらいがあったよ。",
    visual: { kind: "emoji", value: "🗡️", caption: "かたながり" },
    format: "choice",
    choices: ["{刀狩|かたながり}", "{参勤交代|さんきんこうたい}", "{文明開化|ぶんめいかいか}", "{元寇|げんこう}"],
    answer: "{刀狩|かたながり}",
  },
  {
    id: `${U.sengoku}.q-5`,
    unitId: U.sengoku,
    prompt: "この{時代|じだい}、ザビエルらによって日本につたえられた{外国|がいこく}の{宗教|しゅうきょう}は{何|なん}？",
    explanation:
      "「キリストきょう」だよ。フランシスコ・ザビエルがつたえ、{西|にし}日本を{中心|ちゅうしん}にひろまったよ。",
    visual: { kind: "emoji", value: "✝️", caption: "キリストきょう" },
    format: "choice",
    choices: ["キリストきょう", "{仏教|ぶっきょう}", "しんとう", "イスラムきょう"],
    answer: "キリストきょう",
  },
];

// 歴史: 江戸
const edoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.edo}.q-1`,
    unitId: U.edo,
    prompt: "1603{年|ねん}に{江戸|えど}に{幕府|ばくふ}をひらいた{武将|ぶしょう}はだれ？",
    explanation:
      "「{徳川家康|とくがわいえやす}」だよ。これからおよそ260{年|ねん}つづく{江戸|えど}{幕府|ばくふ}のはじまりだよ。",
    visual: { kind: "emoji", value: "🏯", caption: "とくがわいえやす" },
    format: "choice",
    choices: ["{徳川家康|とくがわいえやす}", "{豊臣秀吉|とよとみひでよし}", "{源頼朝|みなもとのよりとも}", "{明治天皇|めいじてんのう}"],
    answer: "{徳川家康|とくがわいえやす}",
  },
  {
    id: `${U.edo}.q-2`,
    unitId: U.edo,
    prompt: "{大名|だいみょう}が1{年|ねん}ごとに{江戸|えど}と{領地|りょうち}をいったりきたりさせられた{制度|せいど}を{何|なん}という？",
    explanation:
      "「{参勤交代|さんきんこうたい}」だよ。たくさんのおかねをつかわせ、{大名|だいみょう}が{力|ちから}をもちすぎないようにしたよ。",
    visual: { kind: "emoji", value: "🚶‍♂️🏯", caption: "さんきんこうたい" },
    format: "choice",
    choices: ["{参勤交代|さんきんこうたい}", "{刀狩|かたながり}", "{元寇|げんこう}", "{三権分立|さんけんぶんりつ}"],
    answer: "{参勤交代|さんきんこうたい}",
  },
  {
    id: `${U.edo}.q-3`,
    unitId: U.edo,
    prompt: "{江戸|えど}{幕府|ばくふ}が、{外国|がいこく}とのつきあいを{大|おお}きく{制限|せいげん}した{政策|せいさく}を{何|なん}という？",
    explanation:
      "「{鎖国|さこく}」だよ。{長崎|ながさき}の{出島|でじま}などにかぎって、{中国|ちゅうごく}やオランダとだけ{貿易|ぼうえき}したよ。",
    visual: { kind: "emoji", value: "🚪", caption: "さこく" },
    format: "choice",
    choices: ["{鎖国|さこく}", "{開国|かいこく}", "{文明開化|ぶんめいかいか}", "{選挙|せんきょ}"],
    answer: "{鎖国|さこく}",
  },
  {
    id: `${U.edo}.q-4`,
    unitId: U.edo,
    prompt: "{江戸|えど}{時代|じだい}に{町人|ちょうにん}の{間|あいだ}でさかえた、{今|いま}も{人気|にんき}のしばいは{何|なん}？",
    explanation:
      "「{歌舞伎|かぶき}」だよ。{浮世絵|うきよえ}という{絵|え}とともに、{町人|ちょうにん}{文化|ぶんか}としてさかえたよ。",
    visual: { kind: "emoji", value: "🎭", caption: "かぶき" },
    format: "choice",
    choices: ["{歌舞伎|かぶき}", "サッカー", "オペラ", "アニメ"],
    answer: "{歌舞伎|かぶき}",
  },
  {
    id: `${U.edo}.q-5`,
    unitId: U.edo,
    prompt: "1853{年|ねん}に{黒船|くろふね}でやってきて、日本に{開国|かいこく}をせまったアメリカ{人|じん}はだれ？",
    explanation:
      "「ペリー」だよ。{黒船|くろふね}の{来航|らいこう}をきっかけに{鎖国|さこく}がおわり、日本は{大|おお}きくかわっていくよ。",
    visual: { kind: "emoji", value: "🚢", caption: "くろふね" },
    format: "choice",
    choices: ["ペリー", "ザビエル", "コロンブス", "リンカーン"],
    answer: "ペリー",
  },
];

// 歴史: 明治
const meijiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.meiji}.q-1`,
    unitId: U.meiji,
    prompt: "{江戸|えど}{幕府|ばくふ}がたおれ、{天皇|てんのう}{中心|ちゅうしん}の{新|あたら}しい{国|くに}づくりがはじまったことを{何|なん}という？",
    explanation:
      "「{明治維新|めいじいしん}」だよ。{政治|せいじ}や{社会|しゃかい}のしくみが{大|おお}きくかわったよ。",
    visual: { kind: "emoji", value: "🌅", caption: "めいじいしん" },
    format: "choice",
    choices: ["{明治維新|めいじいしん}", "{大化|たいか}の{改新|かいしん}", "{鎖国|さこく}", "{元寇|げんこう}"],
    answer: "{明治維新|めいじいしん}",
  },
  {
    id: `${U.meiji}.q-2`,
    unitId: U.meiji,
    prompt: "{西洋|せいよう}のくらしや{技術|ぎじゅつ}がはいり、{町|まち}のようすが{大|おお}きくかわったことを{何|なん}という？",
    explanation:
      "「{文明開化|ぶんめいかいか}」だよ。{電灯|でんとう}・{鉄道|てつどう}・ようふくなど、{今|いま}につながるものがひろまったよ。",
    visual: { kind: "emoji", value: "🚂💡", caption: "ぶんめいかいか" },
    format: "choice",
    choices: ["{文明開化|ぶんめいかいか}", "{参勤交代|さんきんこうたい}", "{刀狩|かたながり}", "{平和主義|へいわしゅぎ}"],
    answer: "{文明開化|ぶんめいかいか}",
  },
  {
    id: `${U.meiji}.q-3`,
    unitId: U.meiji,
    prompt: "1889{年|ねん}に{発布|はっぷ}された、日本ではじめての{憲法|けんぽう}を{何|なん}という？",
    explanation:
      "「{大日本帝国憲法|だいにっぽんていこくけんぽう}」だよ。{天皇|てんのう}が{中心|ちゅうしん}の{憲法|けんぽう}で、いまの{日本国憲法|にほんこくけんぽう}とはちがうよ。",
    visual: { kind: "emoji", value: "📜", caption: "けんぽう" },
    format: "choice",
    choices: [
      "{大日本帝国憲法|だいにっぽんていこくけんぽう}",
      "{日本国憲法|にほんこくけんぽう}",
      "{十七条|じゅうしちじょう}の{憲法|けんぽう}",
      "{御成敗式目|ごせいばいしきもく}",
    ],
    answer: "{大日本帝国憲法|だいにっぽんていこくけんぽう}",
  },
  {
    id: `${U.meiji}.q-4`,
    unitId: U.meiji,
    prompt: "{国|くに}を{強|つよ}くゆたかにするためにかかげられた、{明治|めいじ}{時代|じだい}のスローガンは{何|なん}？",
    explanation:
      "「{富国強兵|ふこくきょうへい}」だよ。{産業|さんぎょう}をさかんにし、{軍隊|ぐんたい}を{強|つよ}くしようとしたよ。",
    visual: { kind: "emoji", value: "🏭", caption: "ふこくきょうへい" },
    format: "choice",
    choices: ["{富国強兵|ふこくきょうへい}", "{鎖国|さこく}", "{元寇|げんこう}", "{平和主義|へいわしゅぎ}"],
    answer: "{富国強兵|ふこくきょうへい}",
  },
  {
    id: `${U.meiji}.q-5`,
    unitId: U.meiji,
    prompt: "{明治|めいじ}{時代|じだい}に日本がたたかった、ロシアとの{戦争|せんそう}を{何|なん}という？",
    explanation:
      "「{日露戦争|にちろせんそう}」だよ。その{前|まえ}には{中国|ちゅうごく}（しん）とたたかった{日清戦争|にっしんせんそう}もあったよ。",
    visual: { kind: "emoji", value: "⚔️", caption: "せんそう" },
    format: "choice",
    choices: ["{日露戦争|にちろせんそう}", "{元寇|げんこう}", "{第二次世界大戦|だいにじせかいたいせん}", "{応仁|おうにん}の{乱|らん}"],
    answer: "{日露戦争|にちろせんそう}",
  },
];

// 歴史: 大正・昭和（戦争）
const taishoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.taishoShowa}.q-1`,
    unitId: U.taishoShowa,
    prompt: "1941{年|ねん}から1945{年|ねん}まで日本もたたかった、{世界|せかい}じゅうをまきこんだ{戦争|せんそう}を{何|なん}という？",
    explanation:
      "「{第二次世界大戦|だいにじせかいたいせん}」だよ。{太平洋|たいへいよう}でのたたかいは{太平洋戦争|たいへいようせんそう}ともよばれるよ。",
    visual: { kind: "emoji", value: "🌐", caption: "せかいたいせん" },
    format: "choice",
    choices: [
      "{第二次世界大戦|だいにじせかいたいせん}",
      "{日露戦争|にちろせんそう}",
      "{元寇|げんこう}",
      "{応仁|おうにん}の{乱|らん}",
    ],
    answer: "{第二次世界大戦|だいにじせかいたいせん}",
  },
  {
    id: `${U.taishoShowa}.q-2`,
    unitId: U.taishoShowa,
    prompt: "1945{年|ねん}8{月|がつ}、{原子|げんし}ばくだんがおとされた2つの{都市|とし}はどこ？",
    explanation:
      "「{広島|ひろしま}」と「{長崎|ながさき}」だよ。8{月|がつ}6{日|か}に{広島|ひろしま}、9{日|か}に{長崎|ながさき}におとされ、{多|おお}くの{命|いのち}がうばわれたよ。",
    visual: { kind: "emoji", value: "🕊️", caption: "へいわをねがう" },
    format: "choice",
    choices: ["{広島|ひろしま}と{長崎|ながさき}", "{東京|とうきょう}と{大阪|おおさか}", "{京都|きょうと}と{奈良|なら}", "{札幌|さっぽろ}と{福岡|ふくおか}"],
    answer: "{広島|ひろしま}と{長崎|ながさき}",
  },
  {
    id: `${U.taishoShowa}.q-3`,
    unitId: U.taishoShowa,
    prompt: "日本が{戦争|せんそう}にまけて、{戦争|せんそう}がおわったのは{何年|なんねん}？",
    explanation:
      "1945{年|ねん}だよ。8{月|がつ}15{日|にち}に{戦争|せんそう}がおわり、日本は{新|あたら}しい{出発|しゅっぱつ}をすることになったよ。",
    visual: { kind: "emoji", value: "📅", caption: "1945ねん" },
    format: "choice",
    choices: ["1945{年|ねん}", "1603{年|ねん}", "1192{年|ねん}", "2000{年|ねん}"],
    answer: "1945{年|ねん}",
  },
  {
    id: `${U.taishoShowa}.q-4`,
    unitId: U.taishoShowa,
    prompt: "{戦争|せんそう}{中|ちゅう}、{都市|とし}の{子|こ}どもたちが{空襲|くうしゅう}をさけて{田舎|いなか}へうつったことを{何|なん}という？",
    explanation:
      "「そかい（がくどうそかい）」だよ。{安全|あんぜん}のため、{家族|かぞく}とはなれて{地方|ちほう}でくらした{子|こ}どももたくさんいたよ。",
    visual: { kind: "emoji", value: "🎒", caption: "そかい" },
    format: "choice",
    choices: ["そかい", "{遠足|えんそく}", "{修学旅行|しゅうがくりょこう}", "{参勤交代|さんきんこうたい}"],
    answer: "そかい",
  },
  {
    id: `${U.taishoShowa}.q-5`,
    unitId: U.taishoShowa,
    prompt: "{大正|たいしょう}{時代|じだい}に{広|ひろ}まった、{国民|こくみん}の{声|こえ}を{政治|せいじ}にいかそうとする{動|うご}きを{何|なん}という？",
    explanation:
      "「{大正|たいしょう}デモクラシー」だよ。{選挙|せんきょ}のしくみをひろげようとする{動|うご}きなどがおこったよ。",
    visual: { kind: "emoji", value: "📣", caption: "たいしょうデモクラシー" },
    format: "choice",
    choices: ["{大正|たいしょう}デモクラシー", "{文明開化|ぶんめいかいか}", "{明治維新|めいじいしん}", "{鎖国|さこく}"],
    answer: "{大正|たいしょう}デモクラシー",
  },
];

// 歴史: 現代
const gendaiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.gendai}.q-1`,
    unitId: U.gendai,
    prompt: "1946{年|ねん}に{公布|こうふ}された、{今|いま}の日本のもとになっている{憲法|けんぽう}は{何|なん}？",
    explanation:
      "「{日本国憲法|にほんこくけんぽう}」だよ。{国民主権|こくみんしゅけん}・{基本的人権|きほんてきじんけん}・{平和主義|へいわしゅぎ}の3つが{柱|はしら}だよ。",
    visual: { kind: "emoji", value: "📜", caption: "にほんこくけんぽう" },
    format: "choice",
    choices: [
      "{日本国憲法|にほんこくけんぽう}",
      "{大日本帝国憲法|だいにっぽんていこくけんぽう}",
      "{十七条|じゅうしちじょう}の{憲法|けんぽう}",
      "{御成敗式目|ごせいばいしきもく}",
    ],
    answer: "{日本国憲法|にほんこくけんぽう}",
  },
  {
    id: `${U.gendai}.q-2`,
    unitId: U.gendai,
    prompt: "{戦後|せんご}、日本の{経済|けいざい}が{急|きゅう}に{大|おお}きく{成長|せいちょう}したことを{何|なん}という？",
    explanation:
      "「{高度経済成長|こうどけいざいせいちょう}」だよ。テレビやれいぞうこ、{車|くるま}がひろまり、くらしがゆたかになったよ。",
    visual: { kind: "emoji", value: "📈", caption: "こうどけいざいせいちょう" },
    format: "choice",
    choices: [
      "{高度経済成長|こうどけいざいせいちょう}",
      "{文明開化|ぶんめいかいか}",
      "{鎖国|さこく}",
      "{大正|たいしょう}デモクラシー",
    ],
    answer: "{高度経済成長|こうどけいざいせいちょう}",
  },
  {
    id: `${U.gendai}.q-3`,
    unitId: U.gendai,
    prompt: "1964{年|ねん}にアジアではじめて{東京|とうきょう}でひらかれた{世界|せかい}のスポーツの{大会|たいかい}は{何|なん}？",
    explanation:
      "「{東京|とうきょう}オリンピック」だよ。これにあわせて{新幹線|しんかんせん}や{高速道路|こうそくどうろ}もつくられたよ。",
    visual: { kind: "emoji", value: "🏅", caption: "オリンピック" },
    format: "choice",
    choices: ["{東京|とうきょう}オリンピック", "ばんぱく", "ワールドカップ", "{選挙|せんきょ}"],
    answer: "{東京|とうきょう}オリンピック",
  },
  {
    id: `${U.gendai}.q-4`,
    unitId: U.gendai,
    prompt: "{今|いま}の日本国憲法で、{戦争|せんそう}についてどう{決|き}められている？",
    explanation:
      "「{戦争|せんそう}をしない（{平和主義|へいわしゅぎ}）」と{決|き}められているよ。{戦争|せんそう}のはんせいから{生|う}まれた{大切|たいせつ}な{考|かんが}えだよ。",
    visual: { kind: "emoji", value: "🕊️", caption: "へいわしゅぎ" },
    format: "choice",
    choices: ["{戦争|せんそう}をしない", "いつでも{戦争|せんそう}する", "{外国|がいこく}をせめる", "{軍隊|ぐんたい}が{政治|せいじ}をする"],
    answer: "{戦争|せんそう}をしない",
  },
  {
    id: `${U.gendai}.q-5`,
    unitId: U.gendai,
    prompt: "{戦後|せんご}の日本で、{女|おんな}の{人|ひと}についてかわった{大切|たいせつ}なことは{何|なん}？",
    explanation:
      "{女|おんな}の{人|ひと}も{選挙|せんきょ}でとうひょうできるようになったよ（{男女|だんじょ}びょうどう）。みんなが{同|おな}じ{権利|けんり}をもつようになったよ。",
    visual: { kind: "emoji", value: "🙋‍♀️🗳️", caption: "だんじょびょうどう" },
    format: "choice",
    choices: [
      "{女|おんな}の{人|ひと}も{選挙|せんきょ}でとうひょうできるようになった",
      "{学校|がっこう}がなくなった",
      "{鎖国|さこく}がはじまった",
      "{武士|ぶし}が{復活|ふっかつ}した",
    ],
    answer: "{女|おんな}の{人|ひと}も{選挙|せんきょ}でとうひょうできるようになった",
  },
];

// 国際: 国際連合
const unQuestions: ChoiceQuestion[] = [
  {
    id: `${U.unitedNations}.q-1`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}の{平和|へいわ}をまもるために、{多|おお}くの{国|くに}があつまってつくった{組織|そしき}を{何|なん}という？",
    explanation:
      "「{国際連合|こくさいれんごう}（{国連|こくれん}）」だよ。{第二次世界大戦|だいにじせかいたいせん}のあと、1945{年|ねん}につくられたよ。",
    visual: { kind: "emoji", value: "🌐", caption: "こくれん" },
    format: "choice",
    choices: ["{国際連合|こくさいれんごう}", "{江戸幕府|えどばくふ}", "{大和朝廷|やまとちょうてい}", "オリンピック"],
    answer: "{国際連合|こくさいれんごう}",
  },
  {
    id: `${U.unitedNations}.q-2`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}の{子|こ}どもたちをたすける{国連|こくれん}の{機関|きかん}を{何|なん}という？",
    explanation:
      "「ユニセフ（UNICEF）」だよ。{食|た}べものやワクチン、{教育|きょういく}をとどけて{子|こ}どもをまもっているよ。",
    visual: { kind: "emoji", value: "🧒💗", caption: "ユニセフ" },
    format: "choice",
    choices: ["ユニセフ", "ペリー", "NASA", "{幕府|ばくふ}"],
    answer: "ユニセフ",
  },
  {
    id: `${U.unitedNations}.q-3`,
    unitId: U.unitedNations,
    prompt: "{教育|きょういく}や{文化|ぶんか}、{世界|せかい}{遺産|いさん}をまもる{国連|こくれん}の{機関|きかん}を{何|なん}という？",
    explanation:
      "「ユネスコ（UNESCO）」だよ。{世界|せかい}{遺産|いさん}をきめて、{大切|たいせつ}な{文化|ぶんか}や{自然|しぜん}をまもっているよ。",
    visual: { kind: "emoji", value: "🏛️", caption: "ユネスコ" },
    format: "choice",
    choices: ["ユネスコ", "ユニセフ", "{警察|けいさつ}", "{消防署|しょうぼうしょ}"],
    answer: "ユネスコ",
  },
  {
    id: `${U.unitedNations}.q-4`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}の{国|くに}ぐにが2030{年|ねん}までにめざす、17の{目標|もくひょう}をまとめたものを{何|なん}という？",
    explanation:
      "「SDGs（エスディージーズ）」だよ。びんぼうをなくす、かんきょうをまもるなど、みんなでめざす{目標|もくひょう}だよ。",
    visual: { kind: "emoji", value: "🌱", caption: "エスディージーズ" },
    format: "choice",
    choices: ["SDGs", "GDP", "ATM", "DNA"],
    answer: "SDGs",
  },
  {
    id: `${U.unitedNations}.q-5`,
    unitId: U.unitedNations,
    prompt: "{国連|こくれん}が{戦争|せんそう}や{争|あらそ}いをふせぐために{大切|たいせつ}にしていることは{何|なん}？",
    explanation:
      "{国|くに}どうしが{話|はな}しあって{平和|へいわ}にときあうこと（{話|はな}しあいによる{解決|かいけつ}）を{大切|たいせつ}にしているよ。",
    visual: { kind: "emoji", value: "🤝", caption: "はなしあい" },
    format: "choice",
    choices: ["{話|はな}しあいによる{解決|かいけつ}", "{力|ちから}でせめること", "{鎖国|さこく}", "むしすること"],
    answer: "{話|はな}しあいによる{解決|かいけつ}",
  },
];

// 国際: 国際協力
const cooperationQuestions: ChoiceQuestion[] = [
  {
    id: `${U.internationalCooperation}.q-1`,
    unitId: U.internationalCooperation,
    prompt: "ゆたかな{国|くに}が、まずしい{国|くに}を{技術|ぎじゅつ}やおかねでたすけることを{何|なん}という？",
    explanation:
      "「{国際協力|こくさいきょうりょく}」だよ。{学校|がっこう}づくりや{水道|すいどう}づくりなど、{世界|せかい}のためにきょうりょくするんだ。",
    visual: { kind: "emoji", value: "🤝🌍", caption: "こくさいきょうりょく" },
    format: "choice",
    choices: ["{国際協力|こくさいきょうりょく}", "{鎖国|さこく}", "{参勤交代|さんきんこうたい}", "{元寇|げんこう}"],
    answer: "{国際協力|こくさいきょうりょく}",
  },
  {
    id: `${U.internationalCooperation}.q-2`,
    unitId: U.internationalCooperation,
    prompt: "日本の{青年|せいねん}が{外国|がいこく}へいって{技術|ぎじゅつ}をおしえる、JICAの{活動|かつどう}を{何|なん}という？",
    explanation:
      "「{青年海外協力隊|せいねんかいがいきょうりょくたい}」だよ。{農業|のうぎょう}やスポーツ、{勉強|べんきょう}をおしえて{現地|げんち}の{人|ひと}をたすけているよ。",
    visual: { kind: "emoji", value: "🌏👷", caption: "きょうりょくたい" },
    format: "choice",
    choices: [
      "{青年海外協力隊|せいねんかいがいきょうりょくたい}",
      "{自衛隊|じえいたい}",
      "{警察|けいさつ}",
      "{消防団|しょうぼうだん}",
    ],
    answer: "{青年海外協力隊|せいねんかいがいきょうりょくたい}",
  },
  {
    id: `${U.internationalCooperation}.q-3`,
    unitId: U.internationalCooperation,
    prompt: "せいふではなく、{民間|みんかん}の{人|ひと}たちが{世界|せかい}のためにかつどうする{団体|だんたい}を{何|なん}という？",
    explanation:
      "「NGO（{非政府|ひせいふ}{組織|そしき}）」だよ。{医療|いりょう}やきょういく、かんきょうなどいろいろなぶんやでかつやくしているよ。",
    visual: { kind: "emoji", value: "🙌", caption: "エヌジーオー" },
    format: "choice",
    choices: ["NGO", "ATM", "GPS", "USB"],
    answer: "NGO",
  },
  {
    id: `${U.internationalCooperation}.q-4`,
    unitId: U.internationalCooperation,
    prompt: "{今|いま}、{世界|せかい}じゅうでとりくんでいる、{地球|ちきゅう}があたたかくなりすぎる{問題|もんだい}を{何|なん}という？",
    explanation:
      "「{地球温暖化|ちきゅうおんだんか}」だよ。{二酸化炭素|にさんかたんそ}をへらすために、{世界|せかい}のみんなできょうりょくしているよ。",
    visual: { kind: "emoji", value: "🌡️🌍", caption: "おんだんか" },
    format: "choice",
    choices: ["{地球温暖化|ちきゅうおんだんか}", "{文明開化|ぶんめいかいか}", "{高度経済成長|こうどけいざいせいちょう}", "{鎖国|さこく}"],
    answer: "{地球温暖化|ちきゅうおんだんか}",
  },
  {
    id: `${U.internationalCooperation}.q-5`,
    unitId: U.internationalCooperation,
    prompt: "{戦争|せんそう}やさいがいで{国|くに}をおわれた{人|ひと}（{難民|なんみん}）に、わたしたちができることは{何|なん}？",
    explanation:
      "ぼきんをしたり、{難民|なんみん}をうけいれたりしてたすけあうことができるよ。{世界|せかい}の{人|ひと}みんながなかまだという{気持|きも}ちが{大切|たいせつ}だよ。",
    visual: { kind: "emoji", value: "💗🌏", caption: "たすけあい" },
    format: "choice",
    choices: [
      "ぼきんや{受|う}けいれでたすける",
      "むしする",
      "おいかえす",
      "わらう",
    ],
    answer: "ぼきんや{受|う}けいれでたすける",
  },
];

export const shakaiG6Contents: Record<string, UnitContent> = {
  // ── 政治 ──
  [U.constitution]: {
    unitId: U.constitution,
    learn: {
      unitId: U.constitution,
      steps: [
        {
          heading: "{憲法|けんぽう}ってなに？",
          body: "{憲法|けんぽう}は{国|くに}のいちばん{大切|たいせつ}なルールだよ。ほかのどんな{法律|ほうりつ}よりもつよくて、{国|くに}のかたちをきめているよ。",
          visual: { kind: "emoji", value: "📜", caption: "くにのいちばんのルール" },
        },
        {
          heading: "3つの{原則|げんそく}",
          body: "{日本国憲法|にほんこくけんぽう}には「{国民主権|こくみんしゅけん}」「{基本的人権|きほんてきじんけん}の{尊重|そんちょう}」「{平和主義|へいわしゅぎ}」の3つの{柱|はしら}があるよ。",
          visual: { kind: "emoji", value: "🙋‍♀️ ✊ 🕊️", caption: "しゅけん・じんけん・へいわ" },
        },
        {
          heading: "くらしとのつながり",
          body: "{学校|がっこう}にいけたり、{言|い}いたいことを{言|い}えたりするのは、{憲法|けんぽう}でわたしたちの{権利|けんり}がまもられているからだよ。",
          visual: { kind: "emoji", value: "🏫💬", caption: "けんりがまもられる" },
        },
      ],
    },
    test: { unitId: U.constitution, questions: constitutionQuestions, questionCount: 5 },
  },

  [U.threePowers]: {
    unitId: U.threePowers,
    learn: {
      unitId: U.threePowers,
      steps: [
        {
          heading: "3つの{仕事|しごと}にわける",
          body: "{国|くに}の{政治|せいじ}は「{法律|ほうりつ}をつくる」「{実行|じっこう}する」「さばく」の3つにわかれているよ。これを{三権分立|さんけんぶんりつ}というよ。",
          visual: { kind: "emoji", value: "🏛️ 🏢 ⚖️", caption: "こっかい・ないかく・さいばんしょ" },
        },
        {
          heading: "だれがやるの？",
          body: "{法律|ほうりつ}は{国会|こっかい}、{実行|じっこう}は{内閣|ないかく}、さばくのは{裁判所|さいばんしょ}。それぞれがべつべつにたんとうするよ。",
          visual: { kind: "emoji", value: "🤝", caption: "やくわりをわける" },
        },
        {
          heading: "なぜわけるの？",
          body: "1つのところが{力|ちから}をもちすぎるとあぶないから、3つにわけておたがいをチェックしあうんだ。",
          visual: { kind: "emoji", value: "🔱", caption: "ちからをかたよらせない" },
        },
      ],
    },
    test: { unitId: U.threePowers, questions: threePowersQuestions, questionCount: 5 },
  },

  [U.election]: {
    unitId: U.election,
    learn: {
      unitId: U.election,
      steps: [
        {
          heading: "{選挙|せんきょ}ってなに？",
          body: "{自分|じぶん}たちのかわりに{政治|せいじ}をしてくれる{代表|だいひょう}を、とうひょうでえらぶことを{選挙|せんきょ}というよ。",
          visual: { kind: "emoji", value: "🗳️", caption: "だいひょうをえらぶ" },
        },
        {
          heading: "18さいからとうひょう",
          body: "{今|いま}の日本では18さいになるととうひょうできるよ。きみたちも{大|おお}きくなったら{国|くに}や{町|まち}をえらぶ{役|やく}をもつんだ。",
          visual: { kind: "emoji", value: "🔞🙋", caption: "18さい〜" },
        },
        {
          heading: "1{票|ぴょう}の{大切|たいせつ}さ",
          body: "みんながとうひょうすると、いろいろな{人|ひと}のかんがえが{政治|せいじ}にとどくよ。1{票|ぴょう}1{票|ぴょう}がとても{大切|たいせつ}だよ。",
          visual: { kind: "emoji", value: "✅", caption: "いっぴょうをいかす" },
        },
      ],
    },
    test: { unitId: U.election, questions: electionQuestions, questionCount: 5 },
  },

  // ── 歴史 ──
  [U.jomon]: {
    unitId: U.jomon,
    learn: {
      unitId: U.jomon,
      steps: [
        {
          heading: "かりとさいしゅうのくらし",
          body: "{縄文|じょうもん}{時代|じだい}の{人|ひと}は、けものをかったり{木|き}の{実|み}や{貝|かい}をとったりして{食|た}べものをえていたよ。",
          visual: { kind: "emoji", value: "🏹🌰🐟", caption: "かり・さいしゅう" },
        },
        {
          heading: "{土器|どき}とたてあな{住居|じゅうきょ}",
          body: "なわのもようの{縄文|じょうもん}{土器|どき}で{食|た}べものをにて、{地面|じめん}をほった「たてあな{住居|じゅうきょ}」にすんでいたよ。",
          visual: { kind: "emoji", value: "🏺🛖", caption: "どきとすまい" },
        },
      ],
    },
    test: { unitId: U.jomon, questions: jomonQuestions, questionCount: 5 },
  },

  [U.yayoi]: {
    unitId: U.yayoi,
    learn: {
      unitId: U.yayoi,
      steps: [
        {
          heading: "お{米|こめ}づくりがはじまる",
          body: "{大陸|たいりく}からお{米|こめ}づくり（{稲作|いなさく}）がつたわったよ。{食|た}べものをためられるようになり、くらしがかわったよ。",
          visual: { kind: "emoji", value: "🌾", caption: "いなさく" },
        },
        {
          heading: "むらから「くに」へ",
          body: "お{米|こめ}や{土地|とち}をめぐってむらどうしがあらそい、やがて{力|ちから}の{強|つよ}い「くに」ができたよ。{卑弥呼|ひみこ}の{邪馬台国|やまたいこく}が{有名|ゆうめい}だよ。",
          visual: { kind: "emoji", value: "👑", caption: "ひみこ" },
        },
      ],
    },
    test: { unitId: U.yayoi, questions: yayoiQuestions, questionCount: 5 },
  },

  [U.kofun]: {
    unitId: U.kofun,
    learn: {
      unitId: U.kofun,
      steps: [
        {
          heading: "{大|おお}きなおはか「{古墳|こふん}」",
          body: "{力|ちから}の{強|つよ}い{王|おう}や{豪族|ごうぞく}のために、{土|つち}をもりあげた{大|おお}きなおはか「{古墳|こふん}」がつくられたよ。",
          visual: { kind: "emoji", value: "⛰️🔑", caption: "ぜんぽうこうえんふん" },
        },
        {
          heading: "{大和朝廷|やまとちょうてい}",
          body: "{奈良|なら}を{中心|ちゅうしん}に、{各地|かくち}の{豪族|ごうぞく}をまとめた{大和朝廷|やまとちょうてい}ができたよ。リーダーは「{大王|おおきみ}」とよばれたよ。",
          visual: { kind: "emoji", value: "🗿", caption: "はにわとちょうてい" },
        },
      ],
    },
    test: { unitId: U.kofun, questions: kofunQuestions, questionCount: 5 },
  },

  [U.asukaNaraHeian]: {
    unitId: U.asukaNaraHeian,
    learn: {
      unitId: U.asukaNaraHeian,
      steps: [
        {
          heading: "{天皇|てんのう}{中心|ちゅうしん}の{国|くに}づくり",
          body: "{聖徳太子|しょうとくたいし}が{十七条|じゅうしちじょう}の{憲法|けんぽう}をつくるなど、{天皇|てんのう}を{中心|ちゅうしん}にした{国|くに}づくりがすすんだよ。",
          visual: { kind: "emoji", value: "📜", caption: "しょうとくたいし" },
        },
        {
          heading: "{奈良|なら}の{大仏|だいぶつ}",
          body: "{聖武天皇|しょうむてんのう}が{東大寺|とうだいじ}に{大|おお}きな{大仏|だいぶつ}をつくらせたよ。{国|くに}をまもろうとねがう{気持|きも}ちがこめられているよ。",
          visual: { kind: "emoji", value: "🙏", caption: "だいぶつ" },
        },
        {
          heading: "かな{文字|もじ}と{貴族|きぞく}の{文化|ぶんか}",
          body: "{平安|へいあん}{時代|じだい}にはひらがな・カタカナがうまれ、{紫式部|むらさきしきぶ}の「{源氏物語|げんじものがたり}」などがかかれたよ。",
          visual: { kind: "emoji", value: "📖✍️", caption: "かなもじ" },
        },
      ],
    },
    test: { unitId: U.asukaNaraHeian, questions: asukaQuestions, questionCount: 5 },
  },

  [U.kamakuraMuromachi]: {
    unitId: U.kamakuraMuromachi,
    learn: {
      unitId: U.kamakuraMuromachi,
      steps: [
        {
          heading: "{武士|ぶし}の{世|よ}のはじまり",
          body: "{源頼朝|みなもとのよりとも}が{鎌倉|かまくら}に{幕府|ばくふ}をひらき、{武士|ぶし}が{政治|せいじ}をする{時代|じだい}がはじまったよ。",
          visual: { kind: "emoji", value: "🏇", caption: "かまくらばくふ" },
        },
        {
          heading: "{元寇|げんこう}",
          body: "{元|げん}（モンゴル）が2{度|ど}せめてきたよ。{暴風雨|ぼうふうう}などもあってしりぞけたけれど、{幕府|ばくふ}はだんだんよわっていったよ。",
          visual: { kind: "emoji", value: "🌊⛵", caption: "げんこう" },
        },
        {
          heading: "{金閣|きんかく}と{銀閣|ぎんかく}",
          body: "{室町|むろまち}{時代|じだい}には{足利義満|あしかがよしみつ}の{金閣|きんかく}、{足利義政|あしかがよしまさ}の{銀閣|ぎんかく}がたてられたよ。{今|いま}の{和室|わしつ}のもともうまれたよ。",
          visual: { kind: "emoji", value: "🏯✨", caption: "きんかく・ぎんかく" },
        },
      ],
    },
    test: { unitId: U.kamakuraMuromachi, questions: kamakuraQuestions, questionCount: 5 },
  },

  [U.sengoku]: {
    unitId: U.sengoku,
    learn: {
      unitId: U.sengoku,
      steps: [
        {
          heading: "{鉄砲|てっぽう}とキリストきょう",
          body: "ヨーロッパから{鉄砲|てっぽう}やキリストきょうがつたわり、{戦|たたか}い{方|かた}やくらしが{大|おお}きくかわったよ。",
          visual: { kind: "emoji", value: "🔫✝️", caption: "てっぽう・キリストきょう" },
        },
        {
          heading: "{天下|てんか}とういつへ",
          body: "{織田信長|おだのぶなが}・{豊臣秀吉|とよとみひでよし}が{力|ちから}をのばし、{秀吉|ひでよし}が{全国|ぜんこく}をとういつしたよ。{刀狩|かたながり}や{検地|けんち}もおこなったよ。",
          visual: { kind: "emoji", value: "🏯⚔️", caption: "てんかとういつ" },
        },
      ],
    },
    test: { unitId: U.sengoku, questions: sengokuQuestions, questionCount: 5 },
  },

  [U.edo]: {
    unitId: U.edo,
    learn: {
      unitId: U.edo,
      steps: [
        {
          heading: "{江戸|えど}{幕府|ばくふ}のはじまり",
          body: "{徳川家康|とくがわいえやす}が{江戸|えど}に{幕府|ばくふ}をひらいたよ。{参勤交代|さんきんこうたい}などで{大名|だいみょう}をおさえ、{長|なが}い{平和|へいわ}がつづいたよ。",
          visual: { kind: "emoji", value: "🏯", caption: "えどばくふ" },
        },
        {
          heading: "{鎖国|さこく}",
          body: "{幕府|ばくふ}は{外国|がいこく}とのつきあいを{制限|せいげん}したよ（{鎖国|さこく}）。{長崎|ながさき}の{出島|でじま}などでだけ{貿易|ぼうえき}したよ。",
          visual: { kind: "emoji", value: "🚪", caption: "さこく" },
        },
        {
          heading: "{町人|ちょうにん}の{文化|ぶんか}",
          body: "{歌舞伎|かぶき}や{浮世絵|うきよえ}など、{町人|ちょうにん}がたのしむ{文化|ぶんか}がさかえたよ。さいごはペリーの{来航|らいこう}で{開国|かいこく}したよ。",
          visual: { kind: "emoji", value: "🎭🚢", caption: "かぶき・くろふね" },
        },
      ],
    },
    test: { unitId: U.edo, questions: edoQuestions, questionCount: 5 },
  },

  [U.meiji]: {
    unitId: U.meiji,
    learn: {
      unitId: U.meiji,
      steps: [
        {
          heading: "{明治維新|めいじいしん}",
          body: "{幕府|ばくふ}がたおれ、{天皇|てんのう}{中心|ちゅうしん}の{新|あたら}しい{国|くに}づくり（{明治維新|めいじいしん}）がはじまったよ。",
          visual: { kind: "emoji", value: "🌅", caption: "めいじいしん" },
        },
        {
          heading: "{文明開化|ぶんめいかいか}",
          body: "{鉄道|てつどう}・{電灯|でんとう}・ようふくなど、{西洋|せいよう}のくらしがはいってきて{町|まち}が{大|おお}きくかわったよ。",
          visual: { kind: "emoji", value: "🚂💡", caption: "ぶんめいかいか" },
        },
        {
          heading: "{憲法|けんぽう}と{戦争|せんそう}",
          body: "{大日本帝国憲法|だいにっぽんていこくけんぽう}ができ、{富国強兵|ふこくきょうへい}をすすめたよ。{日清|にっしん}・{日露|にちろ}の{戦争|せんそう}もおこったよ。",
          visual: { kind: "emoji", value: "📜🏭", caption: "けんぽう・ふこくきょうへい" },
        },
      ],
    },
    test: { unitId: U.meiji, questions: meijiQuestions, questionCount: 5 },
  },

  [U.taishoShowa]: {
    unitId: U.taishoShowa,
    learn: {
      unitId: U.taishoShowa,
      steps: [
        {
          heading: "{大正|たいしょう}デモクラシー",
          body: "{大正|たいしょう}{時代|じだい}には、{国民|こくみん}の{声|こえ}を{政治|せいじ}にいかそうとする{動|うご}き（{大正|たいしょう}デモクラシー）がひろがったよ。",
          visual: { kind: "emoji", value: "📣", caption: "たいしょうデモクラシー" },
        },
        {
          heading: "{第二次世界大戦|だいにじせかいたいせん}",
          body: "{昭和|しょうわ}になると{大|おお}きな{戦争|せんそう}がおこり、日本もまきこまれたよ。{空襲|くうしゅう}やそかいで、くらしはとてもくるしかったよ。",
          visual: { kind: "emoji", value: "🌐", caption: "せんそう" },
        },
        {
          heading: "{戦争|せんそう}のおわりと{平和|へいわ}のねがい",
          body: "1945{年|ねん}、{広島|ひろしま}・{長崎|ながさき}への{原爆|げんばく}のあと{戦争|せんそう}はおわったよ。{平和|へいわ}の{大切|たいせつ}さをわすれないようにしようね。",
          visual: { kind: "emoji", value: "🕊️", caption: "へいわ" },
        },
      ],
    },
    test: { unitId: U.taishoShowa, questions: taishoQuestions, questionCount: 5 },
  },

  [U.gendai]: {
    unitId: U.gendai,
    learn: {
      unitId: U.gendai,
      steps: [
        {
          heading: "{新|あたら}しい日本のはじまり",
          body: "{戦後|せんご}、{日本国憲法|にほんこくけんぽう}ができたよ。{国民主権|こくみんしゅけん}・{基本的人権|きほんてきじんけん}・{平和主義|へいわしゅぎ}を{柱|はしら}にした{新|あたら}しい{国|くに}になったよ。",
          visual: { kind: "emoji", value: "📜🕊️", caption: "にほんこくけんぽう" },
        },
        {
          heading: "ゆたかになる日本",
          body: "{高度経済成長|こうどけいざいせいちょう}で{経済|けいざい}が{大|おお}きく{成長|せいちょう}し、テレビや{車|くるま}がひろまったよ。1964{年|ねん}には{東京|とうきょう}オリンピックもひらかれたよ。",
          visual: { kind: "emoji", value: "📈🏅", caption: "こうどけいざいせいちょう" },
        },
      ],
    },
    test: { unitId: U.gendai, questions: gendaiQuestions, questionCount: 5 },
  },

  // ── 国際 ──
  [U.unitedNations]: {
    unitId: U.unitedNations,
    learn: {
      unitId: U.unitedNations,
      steps: [
        {
          heading: "{国際連合|こくさいれんごう}（{国連|こくれん}）",
          body: "{世界|せかい}の{平和|へいわ}をまもるために、{多|おお}くの{国|くに}があつまってつくったのが{国際連合|こくさいれんごう}だよ。{話|はな}しあいで{争|あらそ}いをふせぐよ。",
          visual: { kind: "emoji", value: "🌐🤝", caption: "こくれん" },
        },
        {
          heading: "ユニセフとユネスコ",
          body: "ユニセフは{世界|せかい}の{子|こ}どもをたすけ、ユネスコは{文化|ぶんか}や{世界|せかい}{遺産|いさん}をまもるよ。みんな{国連|こくれん}のなかまだよ。",
          visual: { kind: "emoji", value: "🧒🏛️", caption: "ユニセフ・ユネスコ" },
        },
        {
          heading: "SDGs",
          body: "{世界|せかい}じゅうで2030{年|ねん}までにめざす17の{目標|もくひょう}がSDGsだよ。びんぼうやかんきょうの{問題|もんだい}をみんなでかいけつしようとしているよ。",
          visual: { kind: "emoji", value: "🌱", caption: "エスディージーズ" },
        },
      ],
    },
    test: { unitId: U.unitedNations, questions: unQuestions, questionCount: 5 },
  },

  [U.internationalCooperation]: {
    unitId: U.internationalCooperation,
    learn: {
      unitId: U.internationalCooperation,
      steps: [
        {
          heading: "{国際協力|こくさいきょうりょく}ってなに？",
          body: "ゆたかな{国|くに}が、こまっている{国|くに}を{技術|ぎじゅつ}やおかねでたすけることだよ。{学校|がっこう}や{水道|すいどう}づくりなどをきょうりょくするよ。",
          visual: { kind: "emoji", value: "🤝🌍", caption: "こくさいきょうりょく" },
        },
        {
          heading: "日本のとりくみ",
          body: "{青年海外協力隊|せいねんかいがいきょうりょくたい}やNGOの{人|ひと}たちが、{世界|せかい}じゅうで{技術|ぎじゅつ}をおしえたり{人|ひと}をたすけたりしているよ。",
          visual: { kind: "emoji", value: "🌏👷", caption: "きょうりょくたい・エヌジーオー" },
        },
        {
          heading: "これからの世界と日本",
          body: "{地球温暖化|ちきゅうおんだんか}や{難民|なんみん}など、{世界|せかい}みんなの{問題|もんだい}がふえているよ。なかまとして、たすけあう{気持|きも}ちが{大切|たいせつ}だよ。",
          visual: { kind: "emoji", value: "💗🌏", caption: "たすけあい" },
        },
      ],
    },
    test: {
      unitId: U.internationalCooperation,
      questions: cooperationQuestions,
      questionCount: 5,
    },
  },
};
