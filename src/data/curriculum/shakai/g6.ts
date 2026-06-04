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
    name: "れきし（{日本|にほん}のあゆみ）",
    formalName: "歴史",
  },
  {
    id: "shakai.international",
    subjectId: "shakai",
    name: "こくさい（{世界|せかい}の{中|なか}の{日本|にほん}）",
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
    title: "{国際協力|こくさいきょうりょく}とこれからの{日本|にほん}",
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
      "いまの{天皇|てんのう}は{政治|せいじ}の{力|ちから}をもたず、{日本|にほん}の{国|くに}や{国民|こくみん}のまとまりの「{象徴|しょうちょう}（シンボル）」とされているよ。",
    visual: { kind: "emoji", value: "🎌", caption: "しょうちょう" },
    format: "choice",
    choices: ["{日本|にほん}の{象徴|しょうちょう}", "{軍隊|ぐんたい}のリーダー", "{裁判官|さいばんかん}", "{学校|がっこう}の{先生|せんせい}"],
    answer: "{日本|にほん}の{象徴|しょうちょう}",
  },
  {
    id: `${U.constitution}.q-4`,
    unitId: U.constitution,
    prompt: "「{平和主義|へいわしゅぎ}」について{正|ただ}しいのはどれ？",
    explanation:
      "{日本|にほん}は{戦争|せんそう}をしないことを{憲法|けんぽう}で{決|き}めているよ。これが{平和主義|へいわしゅぎ}で、9{条|じょう}にかかれているよ。",
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
  {
    id: `${U.constitution}.q-6`,
    unitId: U.constitution,
    prompt: "{憲法記念日|けんぽうきねんび}は{何月|なんがつ}{何日|なんにち}？",
    explanation:
      "{日本国憲法|にほんこくけんぽう}が{使|つか}われはじめた5{月|がつ}3{日|か}が「{憲法記念日|けんぽうきねんび}」だよ。",
    format: "choice",
    choices: ["5{月|がつ}3{日|か}", "1{月|がつ}1{日|にち}", "8{月|がつ}15{日|にち}", "11{月|がつ}3{日|か}"],
    answer: "5{月|がつ}3{日|か}",
  },
  {
    id: `${U.constitution}.q-7`,
    unitId: U.constitution,
    prompt: "{国民|こくみん}の{義務|ぎむ}にあてはまるものはどれ？",
    explanation:
      "{税金|ぜいきん}を{納|おさ}めることは{国民|こくみん}の{大切|たいせつ}な{義務|ぎむ}の{一|ひと}つだよ。",
    format: "choice",
    choices: ["{税金|ぜいきん}を{納|おさ}める", "{毎日|まいにち}あそぶ", "{旅行|りょこう}する", "テレビを{見|み}る"],
    answer: "{税金|ぜいきん}を{納|おさ}める",
  },
  {
    id: `${U.constitution}.q-8`,
    unitId: U.constitution,
    prompt: "{人|ひと}として{生|う}まれながらに{大切|たいせつ}にされる{権利|けんり}を{何|なん}という？",
    explanation:
      "だれもがもつ、{人|ひと}らしく{生|い}きる{権利|けんり}を「{基本的人権|きほんてきじんけん}」というよ。",
    format: "choice",
    choices: ["{基本的人権|きほんてきじんけん}", "{参勤交代|さんきんこうたい}", "{鎖国|さこく}", "{文明開化|ぶんめいかいか}"],
    answer: "{基本的人権|きほんてきじんけん}",
  },
  {
    id: `${U.constitution}.q-9`,
    unitId: U.constitution,
    prompt: "{憲法|けんぽう}を{新|あたら}しくかえるとき、{最後|さいご}に{決|き}めるのはだれ？",
    explanation:
      "{憲法|けんぽう}をかえるには{国民投票|こくみんとうひょう}をして、{国民|こくみん}が{決|き}めるよ。",
    format: "choice",
    choices: ["{国民投票|こくみんとうひょう}で{国民|こくみん}", "{総理大臣|そうりだいじん}", "{天皇|てんのう}", "{外国|がいこく}"],
    answer: "{国民投票|こくみんとうひょう}で{国民|こくみん}",
  },
  {
    id: `${U.constitution}.q-10`,
    unitId: U.constitution,
    prompt: "{平和主義|へいわしゅぎ}が{書|か}かれているのは{憲法|けんぽう}の{第|だい}{何条|なんじょう}？",
    explanation:
      "{戦争|せんそう}をしないという{平和主義|へいわしゅぎ}は{憲法|けんぽう}の9{条|じょう}にかかれているよ。",
    format: "choice",
    choices: ["9{条|じょう}", "1{条|じょう}", "25{条|じょう}", "100{条|じょう}"],
    answer: "9{条|じょう}",
  },
  {
    id: `${U.constitution}.q-11`,
    unitId: U.constitution,
    prompt: "びょうきやこまったときに、{人|ひと}らしいくらしをまもってもらえる{権利|けんり}を{何|なん}という？",
    explanation:
      "{健康|けんこう}で{安心|あんしん}してくらす{権利|けんり}を「{生存権|せいぞんけん}」というよ。",
    format: "choice",
    choices: ["{生存権|せいぞんけん}", "{選挙権|せんきょけん}", "{鎖国|さこく}", "{参勤交代|さんきんこうたい}"],
    answer: "{生存権|せいぞんけん}",
  },
  {
    id: `${U.constitution}.q-12`,
    unitId: U.constitution,
    prompt: "{思|おも}ったことを{自由|じゆう}に{言|い}ったり{書|か}いたりできる{権利|けんり}を{何|なん}という？",
    explanation:
      "じぶんの{考|かんが}えを{自由|じゆう}にあらわせる「{言論|げんろん}の{自由|じゆう}」は{大切|たいせつ}な{人権|じんけん}だよ。",
    format: "choice",
    choices: ["{言論|げんろん}の{自由|じゆう}", "{戦争|せんそう}をする{自由|じゆう}", "{税金|ぜいきん}をはらわない{自由|じゆう}", "ものをぬすむ{自由|じゆう}"],
    answer: "{言論|げんろん}の{自由|じゆう}",
  },
  {
    id: `${U.constitution}.q-13`,
    unitId: U.constitution,
    prompt: "{男|おとこ}の{人|ひと}も{女|おんな}の{人|ひと}も{同|おな}じ{権利|けんり}をもつことを{何|なん}という？",
    explanation:
      "せいべつでさべつされず{同|おな}じあつかいをうけることを「{男女平等|だんじょびょうどう}」というよ。",
    format: "choice",
    choices: ["{男女平等|だんじょびょうどう}", "{文明開化|ぶんめいかいか}", "{鎖国|さこく}", "{元寇|げんこう}"],
    answer: "{男女平等|だんじょびょうどう}",
  },
  {
    id: `${U.constitution}.q-14`,
    unitId: U.constitution,
    prompt: "{憲法|けんぽう}にあわない{法律|ほうりつ}はどうなる？",
    explanation:
      "{憲法|けんぽう}は{国|くに}の{一番|いちばん}{強|つよ}いきまりなので、それにあわない{法律|ほうりつ}はつかえないよ。",
    format: "choice",
    choices: ["つかえない", "そのままつかう", "もっと{強|つよ}くなる", "{外国|がいこく}でつかう"],
    answer: "つかえない",
  },
  {
    id: `${U.constitution}.q-15`,
    unitId: U.constitution,
    prompt: "みんなの{代表|だいひょう}をえらんで{政治|せいじ}をすすめるやり{方|かた}を{何|なん}という？",
    explanation:
      "{国民|こくみん}が{主役|しゅやく}になって{政治|せいじ}を{決|き}めるやり{方|かた}を「{民主主義|みんしゅしゅぎ}」というよ。",
    format: "choice",
    choices: ["{民主主義|みんしゅしゅぎ}", "{鎖国|さこく}", "{独裁|どくさい}", "{身分制|みぶんせい}"],
    answer: "{民主主義|みんしゅしゅぎ}",
  },
  {
    id: `${U.constitution}.q-16`,
    unitId: U.constitution,
    prompt: "{日本国憲法|にほんこくけんぽう}が{公布|こうふ}されたのは{何年|なんねん}？",
    explanation:
      "1946{年|ねん}の11{月|がつ}3{日|か}に{公布|こうふ}され、よく{年|とし}から{使|つか}われはじめたよ。",
    format: "choice",
    choices: ["1946{年|ねん}", "1603{年|ねん}", "1192{年|ねん}", "2020{年|ねん}"],
    answer: "1946{年|ねん}",
  },
  {
    id: `${U.constitution}.q-17`,
    unitId: U.constitution,
    prompt: "{国|くに}の{力|ちから}を{立法|りっぽう}・{行政|ぎょうせい}・{司法|しほう}の3つに{分|わ}けることを{何|なん}という？",
    explanation:
      "{力|ちから}がかたよらないように3つに{分|わ}けるしくみを「{三権分立|さんけんぶんりつ}」というよ。",
    format: "choice",
    choices: ["{三権分立|さんけんぶんりつ}", "{富国強兵|ふこくきょうへい}", "{参勤交代|さんきんこうたい}", "{鎖国|さこく}"],
    answer: "{三権分立|さんけんぶんりつ}",
  },
  {
    id: `${U.constitution}.q-18`,
    unitId: U.constitution,
    prompt: "{基本的人権|きほんてきじんけん}の{尊重|そんちょう}とは、どんな{考|かんが}え{方|かた}？",
    explanation:
      "だれもがもつ{人権|じんけん}をおたがいに{大切|たいせつ}にしようという{考|かんが}え{方|かた}だよ。",
    format: "choice",
    choices: ["みんなの{人権|じんけん}を{大切|たいせつ}にする", "{一部|いちぶ}の{人|ひと}だけ{大切|たいせつ}にする", "{人権|じんけん}をなくす", "{外国|がいこく}だけ{大切|たいせつ}にする"],
    answer: "みんなの{人権|じんけん}を{大切|たいせつ}にする",
  },
  {
    id: `${U.constitution}.q-19`,
    unitId: U.constitution,
    prompt: "{選挙|せんきょ}で{代表|だいひょう}をえらび、{政治|せいじ}に{参加|さんか}できる{権利|けんり}を{何|なん}という？",
    explanation:
      "{政治|せいじ}に{参加|さんか}する{権利|けんり}を「{参政権|さんせいけん}」というよ。{選挙権|せんきょけん}もそのひとつだよ。",
    format: "choice",
    choices: ["{参政権|さんせいけん}", "{鎖国|さこく}", "{富国強兵|ふこくきょうへい}", "{文明開化|ぶんめいかいか}"],
    answer: "{参政権|さんせいけん}",
  },
  {
    id: `${U.constitution}.q-20`,
    unitId: U.constitution,
    prompt: "{憲法|けんぽう}で{戦力|せんりょく}をもたないと{決|き}めているのはなぜ？",
    explanation:
      "{二度|にど}と{戦争|せんそう}をしないという{平和|へいわ}へのねがいがこめられているからだよ。",
    format: "choice",
    choices: ["{二度|にど}と{戦争|せんそう}をしないため", "お{金|かね}がないため", "{外国|がいこく}に{言|い}われたから", "{武器|ぶき}が{高|たか}いから"],
    answer: "{二度|にど}と{戦争|せんそう}をしないため",
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
  {
    id: `${U.threePowers}.q-6`,
    unitId: U.threePowers,
    prompt: "{国会|こっかい}は2つの{議院|ぎいん}からできている。それは{何|なに}と{何|なに}？",
    explanation:
      "{国会|こっかい}は「{衆議院|しゅうぎいん}」と「{参議院|さんぎいん}」の2つの{議院|ぎいん}からできているよ。",
    format: "choice",
    choices: ["{衆議院|しゅうぎいん}と{参議院|さんぎいん}", "{内閣|ないかく}と{裁判所|さいばんしょ}", "{市役所|しやくしょ}と{県庁|けんちょう}", "{警察|けいさつ}と{消防|しょうぼう}"],
    answer: "{衆議院|しゅうぎいん}と{参議院|さんぎいん}",
  },
  {
    id: `${U.threePowers}.q-7`,
    unitId: U.threePowers,
    prompt: "{法律|ほうりつ}をつくるほかに、{国会|こっかい}がする{大切|たいせつ}な{仕事|しごと}は？",
    explanation:
      "{国会|こっかい}は{国|くに}のお{金|かね}の{使|つか}い{方|かた}（{予算|よさん}）も{決|き}めるよ。",
    format: "choice",
    choices: ["{国|くに}の{予算|よさん}を{決|き}める", "{裁判|さいばん}をする", "{戦争|せんそう}をする", "{天皇|てんのう}をえらぶ"],
    answer: "{国|くに}の{予算|よさん}を{決|き}める",
  },
  {
    id: `${U.threePowers}.q-8`,
    unitId: U.threePowers,
    prompt: "{内閣|ないかく}をまとめるリーダーを{何|なん}という？",
    explanation:
      "{内閣|ないかく}のリーダーは「{内閣総理大臣|ないかくそうりだいじん}」だよ。{総理|そうり}ともよばれるよ。",
    format: "choice",
    choices: ["{内閣総理大臣|ないかくそうりだいじん}", "{裁判官|さいばんかん}", "{知事|ちじ}", "{議長|ぎちょう}"],
    answer: "{内閣総理大臣|ないかくそうりだいじん}",
  },
  {
    id: `${U.threePowers}.q-9`,
    unitId: U.threePowers,
    prompt: "{裁判|さいばん}は、まちがいをふせぐためにふつう{何回|なんかい}までうけられる？",
    explanation:
      "{慎重|しんちょう}にさばくため、{同|おな}じ{事件|じけん}で3{回|かい}まで{裁判|さいばん}をうけられるよ（{三審制|さんしんせい}）。",
    format: "choice",
    choices: ["3{回|かい}", "1{回|かい}", "10{回|かい}", "100{回|かい}"],
    answer: "3{回|かい}",
  },
  {
    id: `${U.threePowers}.q-10`,
    unitId: U.threePowers,
    prompt: "{国民|こくみん}が{裁判|さいばん}に{参加|さんか}して{判決|はんけつ}を{考|かんが}える{制度|せいど}を{何|なん}という？",
    explanation:
      "{選|えら}ばれた{国民|こくみん}が{裁判|さいばん}に{参加|さんか}する「{裁判員制度|さいばんいんせいど}」があるよ。",
    format: "choice",
    choices: ["{裁判員制度|さいばんいんせいど}", "{参勤交代|さんきんこうたい}", "{鎖国|さこく}", "{文明開化|ぶんめいかいか}"],
    answer: "{裁判員制度|さいばんいんせいど}",
  },
  {
    id: `${U.threePowers}.q-11`,
    unitId: U.threePowers,
    prompt: "{法律|ほうりつ}が{憲法|けんぽう}にあっているか{最終的|さいしゅうてき}に{判断|はんだん}する{裁判所|さいばんしょ}を{何|なん}という？",
    explanation:
      "いちばん{上|うえ}の{裁判所|さいばんしょ}「{最高裁判所|さいこうさいばんしょ}」が{最終的|さいしゅうてき}に{判断|はんだん}するよ。",
    format: "choice",
    choices: ["{最高裁判所|さいこうさいばんしょ}", "{国会|こっかい}", "{内閣|ないかく}", "{市役所|しやくしょ}"],
    answer: "{最高裁判所|さいこうさいばんしょ}",
  },
  {
    id: `${U.threePowers}.q-12`,
    unitId: U.threePowers,
    prompt: "{国会議員|こっかいぎいん}をえらぶ{選挙|せんきょ}は、どの{力|ちから}（{権力|けんりょく}）にかかわる？",
    explanation:
      "{法律|ほうりつ}をつくる{国会|こっかい}の{議員|ぎいん}をえらぶので「{立法|りっぽう}」にかかわるよ。",
    format: "choice",
    choices: ["{立法|りっぽう}", "{司法|しほう}", "{漁業|ぎょぎょう}", "{農業|のうぎょう}"],
    answer: "{立法|りっぽう}",
  },
  {
    id: `${U.threePowers}.q-13`,
    unitId: U.threePowers,
    prompt: "{三権|さんけん}がたがいに{見|み}はりあうのは{何|なん}のため？",
    explanation:
      "1つのところに{力|ちから}がかたよらないように、たがいにチェックしあうためだよ。",
    format: "choice",
    choices: ["{力|ちから}がかたよらないように", "お{金|かね}をふやすため", "{早|はや}くするため", "{楽|らく}をするため"],
    answer: "{力|ちから}がかたよらないように",
  },
  {
    id: `${U.threePowers}.q-14`,
    unitId: U.threePowers,
    prompt: "{県|けん}の{政治|せいじ}をまとめるリーダーを{何|なん}という？",
    explanation:
      "{都道府県|とどうふけん}をまとめるリーダーを「{知事|ちじ}」というよ。{選挙|せんきょ}でえらばれるよ。",
    format: "choice",
    choices: ["{知事|ちじ}", "{将軍|しょうぐん}", "{大名|だいみょう}", "{天皇|てんのう}"],
    answer: "{知事|ちじ}",
  },
  {
    id: `${U.threePowers}.q-15`,
    unitId: U.threePowers,
    prompt: "{市議会|しぎかい}は{何|なに}をするところ？",
    explanation:
      "{市議会|しぎかい}は{市|し}のきまり（{条例|じょうれい}）や{予算|よさん}を{話|はな}しあって{決|き}めるよ。",
    format: "choice",
    choices: ["{市|し}のきまりや{予算|よさん}を{決|き}める", "{裁判|さいばん}をする", "{戦争|せんそう}を{決|き}める", "{米|こめ}をつくる"],
    answer: "{市|し}のきまりや{予算|よさん}を{決|き}める",
  },
  {
    id: `${U.threePowers}.q-16`,
    unitId: U.threePowers,
    prompt: "{国民|こくみん}の{声|こえ}を{政治|せいじ}にとどける、いちばん{基本|きほん}の{方法|ほうほう}は？",
    explanation:
      "{選挙|せんきょ}でとうひょうすることが、{国民|こくみん}が{政治|せいじ}に{参加|さんか}する{基本|きほん}だよ。",
    format: "choice",
    choices: ["{選挙|せんきょ}でとうひょうする", "なにもしない", "にげる", "だまる"],
    answer: "{選挙|せんきょ}でとうひょうする",
  },
  {
    id: `${U.threePowers}.q-17`,
    unitId: U.threePowers,
    prompt: "{内閣|ないかく}が{進|すす}める{仕事|しごと}を{何|なん}という？",
    explanation:
      "{法律|ほうりつ}にそって{国|くに}の{仕事|しごと}を{進|すす}めることを「{行政|ぎょうせい}」というよ。",
    format: "choice",
    choices: ["{行政|ぎょうせい}", "{立法|りっぽう}", "{司法|しほう}", "{農業|のうぎょう}"],
    answer: "{行政|ぎょうせい}",
  },
  {
    id: `${U.threePowers}.q-18`,
    unitId: U.threePowers,
    prompt: "{裁判官|さいばんかん}は{公正|こうせい}にさばくため、{何|なに}にしたがう？",
    explanation:
      "{裁判官|さいばんかん}はだれの{命令|めいれい}もうけず、{法律|ほうりつ}と{自分|じぶん}の{良心|りょうしん}にしたがうよ。",
    format: "choice",
    choices: ["{法律|ほうりつ}と{自分|じぶん}の{良心|りょうしん}", "{総理大臣|そうりだいじん}の{命令|めいれい}", "{多|おお}くの{人|ひと}の{人気|にんき}", "お{金|かね}"],
    answer: "{法律|ほうりつ}と{自分|じぶん}の{良心|りょうしん}",
  },
  {
    id: `${U.threePowers}.q-19`,
    unitId: U.threePowers,
    prompt: "{国会|こっかい}が{内閣|ないかく}を{信頼|しんらい}できないとき{出|だ}すものを{何|なん}という？",
    explanation:
      "{国会|こっかい}が{内閣|ないかく}に「やめてほしい」と{決|き}めることを「{内閣不信任|ないかくふしんにん}」というよ。",
    format: "choice",
    choices: ["{内閣不信任|ないかくふしんにん}", "{参勤交代|さんきんこうたい}", "{鎖国|さこく}", "{元寇|げんこう}"],
    answer: "{内閣不信任|ないかくふしんにん}",
  },
  {
    id: `${U.threePowers}.q-20`,
    unitId: U.threePowers,
    prompt: "ごみ{集|あつ}めや{道路|どうろ}・{学校|がっこう}など、みんなのための{仕事|しごと}を{何|なん}という？",
    explanation:
      "{国|くに}や{市|し}が{住民|じゅうみん}のために{行|おこな}う{仕事|しごと}を「{公共|こうきょう}の{仕事|しごと}（{行政|ぎょうせい}サービス）」というよ。",
    format: "choice",
    choices: ["みんなのための{仕事|しごと}", "{商売|しょうばい}", "あそび", "{戦争|せんそう}"],
    answer: "みんなのための{仕事|しごと}",
  },
  {
    id: `${U.threePowers}.q-21`,
    unitId: U.threePowers,
    prompt: "{三権分立|さんけんぶんりつ}で、{内閣|ないかく}がたんとうするのはどれ？",
    explanation:
      "{内閣|ないかく}は{法律|ほうりつ}にそって{仕事|しごと}を{進|すす}める「{行政|ぎょうせい}」をたんとうするよ。",
    format: "choice",
    choices: ["{行政|ぎょうせい}", "{立法|りっぽう}", "{司法|しほう}", "{選挙|せんきょ}"],
    answer: "{行政|ぎょうせい}",
  },
];

// 政治: 選挙
const electionQuestions: ChoiceQuestion[] = [
  {
    id: `${U.election}.q-1`,
    unitId: U.election,
    prompt: "{今|いま}の{日本|にほん}で{選挙|せんきょ}でとうひょうできるのは{何|なん}さいから？",
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
  {
    id: `${U.election}.q-6`,
    unitId: U.election,
    prompt: "{選挙|せんきょ}でとうひょうする{場所|ばしょ}を{何|なん}という？",
    explanation:
      "きめられた「{投票所|とうひょうじょ}」へいってとうひょうするよ。",
    format: "choice",
    choices: ["{投票所|とうひょうじょ}", "{駅|えき}", "{病院|びょういん}", "{交番|こうばん}"],
    answer: "{投票所|とうひょうじょ}",
  },
  {
    id: `${U.election}.q-7`,
    unitId: U.election,
    prompt: "{国|くに}の{代表|だいひょう}（{国会議員|こっかいぎいん}）をえらぶ{選挙|せんきょ}をまとめて{何|なん}という？",
    explanation:
      "{国|くに}の{政治|せいじ}をする{人|ひと}をえらぶ{選挙|せんきょ}を「{国政選挙|こくせいせんきょ}」というよ。",
    format: "choice",
    choices: ["{国政選挙|こくせいせんきょ}", "{学級会|がっきゅうかい}", "{運動会|うんどうかい}", "じゃんけん{大会|たいかい}"],
    answer: "{国政選挙|こくせいせんきょ}",
  },
  {
    id: `${U.election}.q-8`,
    unitId: U.election,
    prompt: "18さいになるともらえる、とうひょうできる{資格|しかく}を{何|なん}という？",
    explanation:
      "とうひょうできる{権利|けんり}を「{選挙権|せんきょけん}」というよ。{今|いま}は18さいからだよ。",
    format: "choice",
    choices: ["{選挙権|せんきょけん}", "{納税|のうぜい}", "{鎖国|さこく}", "{自由|じゆう}"],
    answer: "{選挙権|せんきょけん}",
  },
  {
    id: `${U.election}.q-9`,
    unitId: U.election,
    prompt: "{選挙|せんきょ}に{立候補|りっこうほ}して、えらばれる{側|がわ}になる{権利|けんり}を{何|なん}という？",
    explanation:
      "えらばれる{側|がわ}になる{権利|けんり}を「{被選挙権|ひせんきょけん}」というよ。",
    format: "choice",
    choices: ["{被選挙権|ひせんきょけん}", "{選挙権|せんきょけん}", "{鎖国|さこく}", "{参勤交代|さんきんこうたい}"],
    answer: "{被選挙権|ひせんきょけん}",
  },
  {
    id: `${U.election}.q-10`,
    unitId: U.election,
    prompt: "{一人|ひとり}が{一票|いっぴょう}ずつもつ、{平等|びょうどう}な{選挙|せんきょ}のきまりを{何|なん}という？",
    explanation:
      "だれもが{同|おな}じ{重|おも}さの{一票|いっぴょう}をもつことを「{平等選挙|びょうどうせんきょ}（{一人|ひとり}{一票|いっぴょう}）」というよ。",
    format: "choice",
    choices: ["{一人|ひとり}{一票|いっぴょう}", "{一人|ひとり}{十票|じゅっぴょう}", "お{金|かね}で{買|か}う", "{順番制|じゅんばんせい}"],
    answer: "{一人|ひとり}{一票|いっぴょう}",
  },
  {
    id: `${U.election}.q-11`,
    unitId: U.election,
    prompt: "だれにとうひょうしたか{他人|たにん}にわからないようにするきまりを{何|なん}という？",
    explanation:
      "とうひょうのひみつをまもることを「{秘密選挙|ひみつせんきょ}」というよ。{自由|じゆう}にえらべるためのくふうだよ。",
    format: "choice",
    choices: ["{秘密選挙|ひみつせんきょ}", "{公開選挙|こうかいせんきょ}", "{鎖国|さこく}", "{開国|かいこく}"],
    answer: "{秘密選挙|ひみつせんきょ}",
  },
  {
    id: `${U.election}.q-12`,
    unitId: U.election,
    prompt: "とうひょうする{人|ひと}（{投票率|とうひょうりつ}）が{多|おお}いと、どんなよいことがある？",
    explanation:
      "{多|おお}くの{人|ひと}の{考|かんが}えが{政治|せいじ}にとどくので、よりよい{政治|せいじ}になりやすいよ。",
    format: "choice",
    choices: ["{多|おお}くの{人|ひと}の{考|かんが}えが{反映|はんえい}される", "お{金|かね}がへる", "{学校|がっこう}がなくなる", "{戦争|せんそう}になる"],
    answer: "{多|おお}くの{人|ひと}の{考|かんが}えが{反映|はんえい}される",
  },
  {
    id: `${U.election}.q-13`,
    unitId: U.election,
    prompt: "18さいになる{前|まえ}の{子|こ}どもが、{政治|せいじ}にかんしんをもつために{大切|たいせつ}なことは？",
    explanation:
      "ニュースを{見|み}て{社会|しゃかい}のことを{知|し}ることが{大切|たいせつ}だよ。",
    format: "choice",
    choices: ["ニュースを{見|み}て{社会|しゃかい}を{知|し}る", "なにもしない", "とうひょうを{売|う}る", "うそを{広|ひろ}める"],
    answer: "ニュースを{見|み}て{社会|しゃかい}を{知|し}る",
  },
  {
    id: `${U.election}.q-14`,
    unitId: U.election,
    prompt: "{選挙|せんきょ}でえらばれた{国会議員|こっかいぎいん}があつまるところは？",
    explanation:
      "えらばれた{議員|ぎいん}は「{国会|こっかい}」にあつまって{話|はな}しあうよ。",
    format: "choice",
    choices: ["{国会|こっかい}", "{工場|こうじょう}", "{漁港|ぎょこう}", "{神社|じんじゃ}"],
    answer: "{国会|こっかい}",
  },
  {
    id: `${U.election}.q-15`,
    unitId: U.election,
    prompt: "{市長|しちょう}や{知事|ちじ}・{市議会議員|しぎかいぎいん}などをえらぶ{選挙|せんきょ}を{何|なん}という？",
    explanation:
      "{住|す}んでいる{地域|ちいき}のことを{決|き}める{選挙|せんきょ}を「{地方選挙|ちほうせんきょ}」というよ。",
    format: "choice",
    choices: ["{地方選挙|ちほうせんきょ}", "{元寇|げんこう}", "{鎖国|さこく}", "{参勤交代|さんきんこうたい}"],
    answer: "{地方選挙|ちほうせんきょ}",
  },
  {
    id: `${U.election}.q-16`,
    unitId: U.election,
    prompt: "{選挙|せんきょ}でとうひょうできる{人|ひと}（{有権者|ゆうけんしゃ}）とはどんな{人|ひと}？",
    explanation:
      "{有権者|ゆうけんしゃ}とは、{選挙権|せんきょけん}をもってとうひょうできる{人|ひと}のことだよ。",
    format: "choice",
    choices: ["とうひょうできる{人|ひと}", "{立候補|りっこうほ}した{人|ひと}だけ", "{子|こ}どもだけ", "{外国|がいこく}の{人|ひと}だけ"],
    answer: "とうひょうできる{人|ひと}",
  },
  {
    id: `${U.election}.q-17`,
    unitId: U.election,
    prompt: "だれにとうひょうするか{決|き}めるとき、{大切|たいせつ}なことは？",
    explanation:
      "{候補者|こうほしゃ}の{考|かんが}えややくそく（{公約|こうやく}）をよく{知|し}ってからえらぶことが{大切|たいせつ}だよ。",
    format: "choice",
    choices: ["{候補者|こうほしゃ}の{考|かんが}えをよく{知|し}る", "{顔|かお}だけで{決|き}める", "お{金|かね}をもらって{決|き}める", "{人|ひと}にまかせる"],
    answer: "{候補者|こうほしゃ}の{考|かんが}えをよく{知|し}る",
  },
  {
    id: `${U.election}.q-18`,
    unitId: U.election,
    prompt: "とうひょう{日|び}にいけないとき、{前|まえ}もってとうひょうできるしくみを{何|なん}という？",
    explanation:
      "とうひょう{日|び}より{前|まえ}にとうひょうできる「{期日前投票|きじつぜんとうひょう}」があるよ。",
    format: "choice",
    choices: ["{期日前投票|きじつぜんとうひょう}", "{鎖国|さこく}", "{参勤交代|さんきんこうたい}", "{文明開化|ぶんめいかいか}"],
    answer: "{期日前投票|きじつぜんとうひょう}",
  },
  {
    id: `${U.election}.q-19`,
    unitId: U.election,
    prompt: "{候補者|こうほしゃ}が、えらばれたら{何|なに}をするかやくそくすることを{何|なん}という？",
    explanation:
      "{候補者|こうほしゃ}のやくそくを「{公約|こうやく}」というよ。それを{見|み}てえらぶといいね。",
    format: "choice",
    choices: ["{公約|こうやく}", "{鎖国|さこく}", "{元寇|げんこう}", "{刀狩|かたながり}"],
    answer: "{公約|こうやく}",
  },
  {
    id: `${U.election}.q-20`,
    unitId: U.election,
    prompt: "{国民|こくみん}が{政治|せいじ}に{参加|さんか}する、いちばん{基本|きほん}の{権利|けんり}を{何|なん}という？",
    explanation:
      "{政治|せいじ}に{参加|さんか}する{権利|けんり}を「{参政権|さんせいけん}」というよ。{選挙|せんきょ}でつかうよ。",
    format: "choice",
    choices: ["{参政権|さんせいけん}", "{鎖国|さこく}", "{富国強兵|ふこくきょうへい}", "{文明開化|ぶんめいかいか}"],
    answer: "{参政権|さんせいけん}",
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
  {
    id: `${U.jomon}.q-6`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}につくられた、{人|ひと}や{動物|どうぶつ}の{形|かたち}をした{土|つち}の{人形|にんぎょう}を{何|なん}という？",
    explanation:
      "おいのりなどに{使|つか}ったとされる{土|つち}の{人形|にんぎょう}を「{土偶|どぐう}」というよ。",
    format: "choice",
    choices: ["{土偶|どぐう}", "はにわ", "{大仏|だいぶつ}", "ロボット"],
    answer: "{土偶|どぐう}",
  },
  {
    id: `${U.jomon}.q-7`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}はおよそ{何年|なんねん}{前|まえ}にはじまった？",
    explanation:
      "{縄文|じょうもん}{時代|じだい}はおよそ1{万年|まんねん}{以上|いじょう}{前|まえ}にはじまった、とても{古|ふる}い{時代|じだい}だよ。",
    format: "choice",
    choices: ["{約|やく}1{万年|まんねん}{以上|いじょう}{前|まえ}", "{約|やく}100{年|ねん}{前|まえ}", "{約|やく}50{年|ねん}{前|まえ}", "{約|やく}10{年|ねん}{前|まえ}"],
    answer: "{約|やく}1{万年|まんねん}{以上|いじょう}{前|まえ}",
  },
  {
    id: `${U.jomon}.q-8`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{人|ひと}は、どんなところにむらをつくった？",
    explanation:
      "{水|みず}や{食|た}べものが{手|て}に{入|はい}りやすい{場所|ばしょ}にむらをつくってくらしたよ。",
    format: "choice",
    choices: ["{水|みず}や{食|た}べものが{得|え}やすい{場所|ばしょ}", "{砂漠|さばく}のまん{中|なか}", "{火山|かざん}の{中|なか}", "{海|うみ}の{底|そこ}"],
    answer: "{水|みず}や{食|た}べものが{得|え}やすい{場所|ばしょ}",
  },
  {
    id: `${U.jomon}.q-9`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{土器|どき}のとくちょうは？",
    explanation:
      "{縄文|じょうもん}{土器|どき}は{厚手|あつで}で{黒|くろ}っぽく、なわ{目|め}のもようがあるよ。",
    format: "choice",
    choices: ["{厚手|あつで}でなわ{目|め}のもよう", "{金|きん}でできている", "プラスチック", "すきとおっている"],
    answer: "{厚手|あつで}でなわ{目|め}のもよう",
  },
  {
    id: `${U.jomon}.q-10`,
    unitId: U.jomon,
    prompt: "{三内丸山|さんないまるやま}{遺跡|いせき}があるのは{何県|なにけん}？",
    explanation:
      "{三内丸山|さんないまるやま}{遺跡|いせき}は{青森県|あおもりけん}にある、{大|おお}きな{縄文|じょうもん}のむらのあとだよ。",
    format: "choice",
    choices: ["{青森県|あおもりけん}", "{沖縄県|おきなわけん}", "{東京都|とうきょうと}", "{大阪府|おおさかふ}"],
    answer: "{青森県|あおもりけん}",
  },
  {
    id: `${U.jomon}.q-11`,
    unitId: U.jomon,
    prompt: "{貝塚|かいづか}を{調|しら}べると{何|なに}がわかる？",
    explanation:
      "{貝塚|かいづか}は{食|た}べたあとのごみのあとで、{当時|とうじ}の{食|た}べものやくらしがわかるよ。",
    format: "choice",
    choices: ["{当時|とうじ}の{食|た}べものやくらし", "{今|いま}の{天気|てんき}", "{未来|みらい}のこと", "{外国|がいこく}の{言葉|ことば}"],
    answer: "{当時|とうじ}の{食|た}べものやくらし",
  },
  {
    id: `${U.jomon}.q-12`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{人|ひと}が{食|た}べものをにるのに{使|つか}ったものは？",
    explanation:
      "{食|た}べものをにるのに「{縄文|じょうもん}{土器|どき}」を{使|つか}っていたよ。",
    format: "choice",
    choices: ["{縄文|じょうもん}{土器|どき}", "{電子|でんし}レンジ", "フライパン", "なべ（{金属|きんぞく}）"],
    answer: "{縄文|じょうもん}{土器|どき}",
  },
  {
    id: `${U.jomon}.q-13`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{人|ひと}がすんだ、{地面|じめん}をほってつくった{家|いえ}を{何|なん}という？",
    explanation:
      "{地面|じめん}をほって{柱|はしら}を{立|た}て、{屋根|やね}をかけた「たてあな{住居|じゅうきょ}」だよ。",
    format: "choice",
    choices: ["たてあな{住居|じゅうきょ}", "マンション", "お{城|しろ}", "ビル"],
    answer: "たてあな{住居|じゅうきょ}",
  },
  {
    id: `${U.jomon}.q-14`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{道具|どうぐ}の{材料|ざいりょう}に{多|おお}かったものは？",
    explanation:
      "{道具|どうぐ}はおもに{石|いし}・{木|き}・{骨|ほね}・{土|つち}でつくられていたよ。",
    format: "choice",
    choices: ["{石|いし}や{木|き}・{骨|ほね}・{土|つち}", "{鉄|てつ}やプラスチック", "ガラス", "コンクリート"],
    answer: "{石|いし}や{木|き}・{骨|ほね}・{土|つち}",
  },
  {
    id: `${U.jomon}.q-15`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{次|つぎ}にくる{時代|じだい}は？",
    explanation:
      "{縄文|じょうもん}{時代|じだい}のあとは、お{米|こめ}づくりがはじまる「{弥生|やよい}{時代|じだい}」だよ。",
    format: "choice",
    choices: ["{弥生|やよい}{時代|じだい}", "{江戸|えど}{時代|じだい}", "{明治|めいじ}{時代|じだい}", "{平安|へいあん}{時代|じだい}"],
    answer: "{弥生|やよい}{時代|じだい}",
  },
  {
    id: `${U.jomon}.q-16`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}に、まだ{無|な}かったものはどれ？",
    explanation:
      "{縄文|じょうもん}{時代|じだい}にはまだ{鉄|てつ}の{道具|どうぐ}や{大|おお}きな{国|くに}はなかったよ。",
    format: "choice",
    choices: ["{鉄|てつ}の{道具|どうぐ}", "{木|き}の{実|み}", "{貝|かい}", "{魚|さかな}"],
    answer: "{鉄|てつ}の{道具|どうぐ}",
  },
  {
    id: `${U.jomon}.q-17`,
    unitId: U.jomon,
    prompt: "{土偶|どぐう}にこめられたとされるねがいは？",
    explanation:
      "{食|た}べものがとれることや{健康|けんこう}などのねがいがこめられたといわれるよ。",
    format: "choice",
    choices: ["{食|た}べものや{健康|けんこう}のねがい", "{戦争|せんそう}に{勝|か}つねがいだけ", "お{金|かね}もうけ", "{旅行|りょこう}"],
    answer: "{食|た}べものや{健康|けんこう}のねがい",
  },
  {
    id: `${U.jomon}.q-18`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{人|ひと}のくらしで{正|ただ}しいのは？",
    explanation:
      "お{米|こめ}づくりはまだなく、{自然|しぜん}のめぐみをとってくらしていたよ。",
    format: "choice",
    choices: ["{自然|しぜん}のめぐみをとってくらした", "{工場|こうじょう}で{働|はたら}いた", "{車|くるま}に{乗|の}った", "{米|こめ}を{大量|たいりょう}に{作|つく}った"],
    answer: "{自然|しぜん}のめぐみをとってくらした",
  },
  {
    id: `${U.jomon}.q-19`,
    unitId: U.jomon,
    prompt: "{高床倉庫|たかゆかそうこ}は{縄文|じょうもん}{時代|じだい}にあった？",
    explanation:
      "{高床倉庫|たかゆかそうこ}はお{米|こめ}づくりが{始|はじ}まった{弥生|やよい}{時代|じだい}のもので、{縄文|じょうもん}{時代|じだい}にはまだなかったよ。",
    format: "choice",
    choices: ["なかった（{弥生|やよい}{時代|じだい}から）", "{縄文|じょうもん}{時代|じだい}からあった", "{江戸|えど}{時代|じだい}だけ", "{明治|めいじ}{時代|じだい}だけ"],
    answer: "なかった（{弥生|やよい}{時代|じだい}から）",
  },
  {
    id: `${U.jomon}.q-20`,
    unitId: U.jomon,
    prompt: "{縄文|じょうもん}{時代|じだい}の{生活|せいかつ}が{長|なが}くつづいた{理由|りゆう}は？",
    explanation:
      "{自然|しぜん}のめぐみで{安定|あんてい}してくらせたので、{長|なが}いあいだあまりかわらなかったよ。",
    format: "choice",
    choices: ["{自然|しぜん}のめぐみでくらせたから", "{戦争|せんそう}ばかりだったから", "お{金|かね}があったから", "{機械|きかい}があったから"],
    answer: "{自然|しぜん}のめぐみでくらせたから",
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
  {
    id: `${U.yayoi}.q-6`,
    unitId: U.yayoi,
    prompt: "{弥生|やよい}{時代|じだい}に{大陸|たいりく}からつたわった{金属|きんぞく}の{道具|どうぐ}は？",
    explanation:
      "{弥生|やよい}{時代|じだい}には{鉄器|てっき}や{青銅器|せいどうき}などの{金属|きんぞく}の{道具|どうぐ}がつたわったよ。",
    format: "choice",
    choices: ["{鉄器|てっき}や{青銅器|せいどうき}", "プラスチック", "ガラスびん", "{電池|でんち}"],
    answer: "{鉄器|てっき}や{青銅器|せいどうき}",
  },
  {
    id: `${U.yayoi}.q-7`,
    unitId: U.yayoi,
    prompt: "{銅鐸|どうたく}などの{青銅|せいどう}の{道具|どうぐ}は、おもに{何|なに}に{使|つか}われた？",
    explanation:
      "{銅鐸|どうたく}などはおもに、まつり（おいのり）に{使|つか}われたと{考|かんが}えられているよ。",
    format: "choice",
    choices: ["まつり（おいのり）のため", "{料理|りょうり}のため", "{戦|たたか}いの{盾|たて}", "おもちゃ"],
    answer: "まつり（おいのり）のため",
  },
  {
    id: `${U.yayoi}.q-8`,
    unitId: U.yayoi,
    prompt: "{弥生|やよい}{土器|どき}のとくちょうは？",
    explanation:
      "{弥生|やよい}{土器|どき}は{縄文|じょうもん}{土器|どき}よりうすくてかたく、{赤|あか}っぽいよ。",
    format: "choice",
    choices: ["うすくて{赤|あか}っぽい", "{金|きん}ぴか", "すきとおっている", "プラスチック"],
    answer: "うすくて{赤|あか}っぽい",
  },
  {
    id: `${U.yayoi}.q-9`,
    unitId: U.yayoi,
    prompt: "{米|こめ}づくりで、{地面|じめん}をたがやすのに{使|つか}った{木|き}の{道具|どうぐ}は？",
    explanation:
      "{木|き}でつくった「くわ」や「すき」で{田|た}をたがやしたよ。",
    format: "choice",
    choices: ["{木|き}のくわ・すき", "トラクター", "ほうちょう", "ほうき"],
    answer: "{木|き}のくわ・すき",
  },
  {
    id: `${U.yayoi}.q-10`,
    unitId: U.yayoi,
    prompt: "お{米|こめ}づくりがはじまって、むらに{何|なに}があらわれた？",
    explanation:
      "{米|こめ}や{土地|とち}をまとめる、{力|ちから}の{強|つよ}いリーダー（{指導者|しどうしゃ}）があらわれたよ。",
    format: "choice",
    choices: ["むらをまとめるリーダー", "{大|おお}きな{工場|こうじょう}", "{学校|がっこう}", "{電車|でんしゃ}"],
    answer: "むらをまとめるリーダー",
  },
  {
    id: `${U.yayoi}.q-11`,
    unitId: U.yayoi,
    prompt: "{卑弥呼|ひみこ}がおさめたとされる{国|くに}を{何|なん}という？",
    explanation:
      "{卑弥呼|ひみこ}は「{邪馬台国|やまたいこく}」という{国|くに}をおさめたと{中国|ちゅうごく}の{本|ほん}にかかれているよ。",
    format: "choice",
    choices: ["{邪馬台国|やまたいこく}", "{大和朝廷|やまとちょうてい}", "{江戸幕府|えどばくふ}", "{鎌倉幕府|かまくらばくふ}"],
    answer: "{邪馬台国|やまたいこく}",
  },
  {
    id: `${U.yayoi}.q-12`,
    unitId: U.yayoi,
    prompt: "{卑弥呼|ひみこ}が{国|くに}をおさめた{方法|ほうほう}として{中国|ちゅうごく}の{本|ほん}にあるのは？",
    explanation:
      "{卑弥呼|ひみこ}はうらない（まじない）の{力|ちから}で{国|くに}をおさめたとつたえられているよ。",
    format: "choice",
    choices: ["うらない（まじない）", "{選挙|せんきょ}", "お{金|かね}", "{鉄砲|てっぽう}"],
    answer: "うらない（まじない）",
  },
  {
    id: `${U.yayoi}.q-13`,
    unitId: U.yayoi,
    prompt: "{吉野|よしの}ヶ{里|り}{遺跡|いせき}のまわりにあった、{敵|てき}をふせぐためのものは？",
    explanation:
      "むらのまわりをほりやさくでかこみ、{物見|ものみ}やぐらをたてて{戦|たたか}いにそなえたよ。",
    format: "choice",
    choices: ["ほりやさく", "プール", "{公園|こうえん}", "ちゅうしゃ{場|じょう}"],
    answer: "ほりやさく",
  },
  {
    id: `${U.yayoi}.q-14`,
    unitId: U.yayoi,
    prompt: "{弥生|やよい}{時代|じだい}に{身分|みぶん}の{差|さ}が{生|う}まれた{理由|りゆう}は？",
    explanation:
      "{米|こめ}や{土地|とち}を{多|おお}くもつ{人|ひと}とそうでない{人|ひと}の{差|さ}ができたからだよ。",
    format: "choice",
    choices: ["{米|こめ}や{土地|とち}の{差|さ}ができたから", "みんな{同|おな}じだったから", "お{金|かね}があったから", "{学校|がっこう}ができたから"],
    answer: "{米|こめ}や{土地|とち}の{差|さ}ができたから",
  },
  {
    id: `${U.yayoi}.q-15`,
    unitId: U.yayoi,
    prompt: "{高床倉庫|たかゆかそうこ}でねずみの{侵入|しんにゅう}をふせぐくふうを{何|なん}という？",
    explanation:
      "{柱|はしら}に{板|いた}をつけてねずみがのぼれないようにした「ねずみ{返|がえ}し」があるよ。",
    format: "choice",
    choices: ["ねずみ{返|がえ}し", "かぎ", "{番犬|ばんけん}", "{電気|でんき}"],
    answer: "ねずみ{返|がえ}し",
  },
  {
    id: `${U.yayoi}.q-16`,
    unitId: U.yayoi,
    prompt: "「{弥生|やよい}{時代|じだい}」という{名前|なまえ}のもとになったものは？",
    explanation:
      "{東京|とうきょう}の{弥生|やよい}という{地名|ちめい}の{場所|ばしょ}で{土器|どき}が{見|み}つかったことが{名前|なまえ}のもとだよ。",
    format: "choice",
    choices: ["{弥生|やよい}という{地名|ちめい}", "{王様|おうさま}の{名前|なまえ}", "{米|こめ}の{種類|しゅるい}", "{山|やま}の{名前|なまえ}"],
    answer: "{弥生|やよい}という{地名|ちめい}",
  },
  {
    id: `${U.yayoi}.q-17`,
    unitId: U.yayoi,
    prompt: "{米|こめ}づくりが{広|ひろ}がって、{人|ひと}びとのくらしはどうなった？",
    explanation:
      "{食|た}べものをためられるようになり、{一|ひと}つの{場所|ばしょ}に{定住|ていじゅう}するようになったよ。",
    format: "choice",
    choices: ["{定住|ていじゅう}するようになった", "{旅|たび}ばかりした", "{海|うみ}にすんだ", "{山|やま}だけにすんだ"],
    answer: "{定住|ていじゅう}するようになった",
  },
  {
    id: `${U.yayoi}.q-18`,
    unitId: U.yayoi,
    prompt: "{弥生|やよい}{時代|じだい}の{次|つぎ}の{時代|じだい}は？",
    explanation:
      "{弥生|やよい}{時代|じだい}のあとは、{大|おお}きなおはかがつくられた「{古墳|こふん}{時代|じだい}」だよ。",
    format: "choice",
    choices: ["{古墳|こふん}{時代|じだい}", "{縄文|じょうもん}{時代|じだい}", "{平安|へいあん}{時代|じだい}", "{江戸|えど}{時代|じだい}"],
    answer: "{古墳|こふん}{時代|じだい}",
  },
  {
    id: `${U.yayoi}.q-19`,
    unitId: U.yayoi,
    prompt: "{大陸|たいりく}との{行|い}き{来|き}で{日本|にほん}につたわったものは？",
    explanation:
      "{米|こめ}づくりや{金属|きんぞく}・{文字|もじ}など、{大陸|たいりく}の{新|あたら}しい{技術|ぎじゅつ}がつたわったよ。",
    format: "choice",
    choices: ["{米|こめ}づくりや{金属|きんぞく}の{技術|ぎじゅつ}", "{自動車|じどうしゃ}", "インターネット", "{電車|でんしゃ}"],
    answer: "{米|こめ}づくりや{金属|きんぞく}の{技術|ぎじゅつ}",
  },
  {
    id: `${U.yayoi}.q-20`,
    unitId: U.yayoi,
    prompt: "{弥生|やよい}{時代|じだい}に「むら」から「くに」へすすんだ{理由|りゆう}は？",
    explanation:
      "{力|ちから}の{強|つよ}いむらが{弱|よわ}いむらをまとめて、{大|おお}きな「くに」になっていったよ。",
    format: "choice",
    choices: ["{強|つよ}いむらが{弱|よわ}いむらをまとめたから", "みんななかよしだったから", "{神様|かみさま}が{決|き}めたから", "{外国|がいこく}が{決|き}めたから"],
    answer: "{強|つよ}いむらが{弱|よわ}いむらをまとめたから",
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
    prompt: "{鍵穴|かぎあな}のような{形|かたち}をした、{日本|にほん}{独特|どくとく}の{古墳|こふん}を{何|なん}という？",
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
  {
    id: `${U.kofun}.q-6`,
    unitId: U.kofun,
    prompt: "{古墳|こふん}がさかんにつくられた{時代|じだい}を{何|なん}という？",
    explanation:
      "{大|おお}きなおはか（{古墳|こふん}）が{各地|かくち}でつくられた{時代|じだい}を「{古墳|こふん}{時代|じだい}」というよ。",
    format: "choice",
    choices: ["{古墳|こふん}{時代|じだい}", "{縄文|じょうもん}{時代|じだい}", "{江戸|えど}{時代|じだい}", "{明治|めいじ}{時代|じだい}"],
    answer: "{古墳|こふん}{時代|じだい}",
  },
  {
    id: `${U.kofun}.q-7`,
    unitId: U.kofun,
    prompt: "{大和朝廷|やまとちょうてい}のリーダーは{何|なん}とよばれた？",
    explanation:
      "{大和朝廷|やまとちょうてい}のリーダーは「{大王|おおきみ}」とよばれ、のちの{天皇|てんのう}につながるよ。",
    format: "choice",
    choices: ["{大王|おおきみ}", "{将軍|しょうぐん}", "{殿様|とのさま}", "{大統領|だいとうりょう}"],
    answer: "{大王|おおきみ}",
  },
  {
    id: `${U.kofun}.q-8`,
    unitId: U.kofun,
    prompt: "{大陸|たいりく}から{日本|にほん}へうつりすみ、{技術|ぎじゅつ}や{文化|ぶんか}をつたえた{人|ひと}びとを{何|なん}という？",
    explanation:
      "{大陸|たいりく}からきて{新|あたら}しい{技術|ぎじゅつ}をつたえた{人|ひと}びとを「{渡来人|とらいじん}」というよ。",
    format: "choice",
    choices: ["{渡来人|とらいじん}", "{武士|ぶし}", "{町人|ちょうにん}", "{農民|のうみん}"],
    answer: "{渡来人|とらいじん}",
  },
  {
    id: `${U.kofun}.q-9`,
    unitId: U.kofun,
    prompt: "{渡来人|とらいじん}がつたえたものはどれ？",
    explanation:
      "{渡来人|とらいじん}は{漢字|かんじ}や{仏教|ぶっきょう}、{土木|どぼく}や{織物|おりもの}の{技術|ぎじゅつ}などをつたえたよ。",
    format: "choice",
    choices: ["{漢字|かんじ}や{技術|ぎじゅつ}", "テレビ", "{自動車|じどうしゃ}", "{新幹線|しんかんせん}"],
    answer: "{漢字|かんじ}や{技術|ぎじゅつ}",
  },
  {
    id: `${U.kofun}.q-10`,
    unitId: U.kofun,
    prompt: "{前方後円墳|ぜんぽうこうえんふん}の{形|かたち}は？",
    explanation:
      "{前|まえ}が{四角|しかく}く、{後|うし}ろが{丸|まる}い、{鍵穴|かぎあな}のような{形|かたち}だよ。",
    format: "choice",
    choices: ["{前|まえ}が{四角|しかく}・{後|うし}ろが{丸|まる}い", "{三角形|さんかっけい}", "{星形|ほしがた}", "まん{丸|まる}だけ"],
    answer: "{前|まえ}が{四角|しかく}・{後|うし}ろが{丸|まる}い",
  },
  {
    id: `${U.kofun}.q-11`,
    unitId: U.kofun,
    prompt: "{世界|せかい}{最大|さいだい}クラスの{古墳|こふん}「{大仙古墳|だいせんこふん}」があるのは{何府|なにふ}？",
    explanation:
      "{大仙古墳|だいせんこふん}は{大阪府|おおさかふ}の{堺市|さかいし}にあり、{世界|せかい}{遺産|いさん}にもなっているよ。",
    format: "choice",
    choices: ["{大阪府|おおさかふ}", "{東京都|とうきょうと}", "{北海道|ほっかいどう}", "{沖縄県|おきなわけん}"],
    answer: "{大阪府|おおさかふ}",
  },
  {
    id: `${U.kofun}.q-12`,
    unitId: U.kofun,
    prompt: "はにわは{何|なに}でつくられている？",
    explanation:
      "はにわは{土|つち}でつくられたやきものだよ。{古墳|こふん}のまわりにならべられたよ。",
    format: "choice",
    choices: ["{土|つち}（やきもの）", "{金|きん}", "{木|き}", "{石|いし}だけ"],
    answer: "{土|つち}（やきもの）",
  },
  {
    id: `${U.kofun}.q-13`,
    unitId: U.kofun,
    prompt: "{古墳|こふん}の{大|おお}きさからわかることは？",
    explanation:
      "{大|おお}きな{古墳|こふん}ほど、ほうむられた{人|ひと}の{力|ちから}が{大|おお}きかったことがわかるよ。",
    format: "choice",
    choices: ["ほうむられた{人|ひと}の{力|ちから}の{大|おお}きさ", "すきな{色|いろ}", "{身長|しんちょう}", "{年|とし}れい"],
    answer: "ほうむられた{人|ひと}の{力|ちから}の{大|おお}きさ",
  },
  {
    id: `${U.kofun}.q-14`,
    unitId: U.kofun,
    prompt: "{古墳|こふん}をつくるには、どんな{力|ちから}が{必要|ひつよう}だった？",
    explanation:
      "{大|おお}きな{古墳|こふん}をつくるには、{多|おお}くの{人|ひと}を{働|はたら}かせる{大|おお}きな{力|ちから}が{必要|ひつよう}だったよ。",
    format: "choice",
    choices: ["{多|おお}くの{人|ひと}を{動|うご}かす{力|ちから}", "お{金|かね}だけ", "{機械|きかい}", "{一人|ひとり}の{力|ちから}"],
    answer: "{多|おお}くの{人|ひと}を{動|うご}かす{力|ちから}",
  },
  {
    id: `${U.kofun}.q-15`,
    unitId: U.kofun,
    prompt: "{古墳|こふん}の{中|なか}におさめられたものはどれ？",
    explanation:
      "{古墳|こふん}の{中|なか}には{鏡|かがみ}や{玉|たま}・{武器|ぶき}などの{宝物|たからもの}がおさめられたよ。",
    format: "choice",
    choices: ["{鏡|かがみ}や{玉|たま}・{武器|ぶき}", "テレビ", "{自転車|じてんしゃ}", "{教科書|きょうかしょ}"],
    answer: "{鏡|かがみ}や{玉|たま}・{武器|ぶき}",
  },
  {
    id: `${U.kofun}.q-16`,
    unitId: U.kofun,
    prompt: "{大和朝廷|やまとちょうてい}は5{世紀|せいき}ごろ、{日本|にほん}のどのあたりまで{勢力|せいりょく}を{広|ひろ}げた？",
    explanation:
      "{大和朝廷|やまとちょうてい}は{九州|きゅうしゅう}から{関東|かんとう}あたりまで{勢力|せいりょく}を{広|ひろ}げたよ。",
    format: "choice",
    choices: ["{九州|きゅうしゅう}から{関東|かんとう}まで", "{外国|がいこく}まで", "{北海道|ほっかいどう}だけ", "{沖縄|おきなわ}だけ"],
    answer: "{九州|きゅうしゅう}から{関東|かんとう}まで",
  },
  {
    id: `${U.kofun}.q-17`,
    unitId: U.kofun,
    prompt: "「{大王|おおきみ}」はのちに{何|なん}とよばれるようになった？",
    explanation:
      "「{大王|おおきみ}」はやがて「{天皇|てんのう}」とよばれるようになったよ。",
    format: "choice",
    choices: ["{天皇|てんのう}", "{将軍|しょうぐん}", "{大名|だいみょう}", "{殿様|とのさま}"],
    answer: "{天皇|てんのう}",
  },
  {
    id: `${U.kofun}.q-18`,
    unitId: U.kofun,
    prompt: "{大和朝廷|やまとちょうてい}の{王|おう}たちが{中国|ちゅうごく}におくったものは？",
    explanation:
      "{中国|ちゅうごく}に{使|つか}い（{使者|ししゃ}）やみつぎ{物|もの}をおくって、{力|ちから}をみとめてもらおうとしたよ。",
    format: "choice",
    choices: ["{使|つか}いやみつぎ{物|もの}", "{手紙|てがみ}だけ", "{米|こめ}", "{何|なに}もおくらない"],
    answer: "{使|つか}いやみつぎ{物|もの}",
  },
  {
    id: `${U.kofun}.q-19`,
    unitId: U.kofun,
    prompt: "{古墳|こふん}{時代|じだい}の{次|つぎ}にくる{時代|じだい}は？",
    explanation:
      "{古墳|こふん}{時代|じだい}のあとは「{飛鳥|あすか}{時代|じだい}」だよ。",
    format: "choice",
    choices: ["{飛鳥|あすか}{時代|じだい}", "{縄文|じょうもん}{時代|じだい}", "{江戸|えど}{時代|じだい}", "{平安|へいあん}{時代|じだい}"],
    answer: "{飛鳥|あすか}{時代|じだい}",
  },
  {
    id: `${U.kofun}.q-20`,
    unitId: U.kofun,
    prompt: "{古墳|こふん}がだんだんつくられなくなった{理由|りゆう}の{一|ひと}つは？",
    explanation:
      "{仏教|ぶっきょう}がつたわり、{古墳|こふん}のかわりに{寺|てら}をたてるようになったからだよ。",
    format: "choice",
    choices: ["{寺|てら}をたてるようになったから", "{土|つち}がなくなったから", "{人|ひと}がいなくなったから", "{法律|ほうりつ}でやめさせられたから"],
    answer: "{寺|てら}をたてるようになったから",
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
    prompt: "{平安|へいあん}{時代|じだい}に{日本|にほん}でうまれた、{漢字|かんじ}をもとにした{文字|もじ}は{何|なん}？",
    explanation:
      "「ひらがな」や「カタカナ」だよ。{漢字|かんじ}をくずしたりして{日本|にほん}{独自|どくじ}の{文字|もじ}がうまれ、{文学|ぶんがく}がさかんになったよ。",
    visual: { kind: "emoji", value: "✍️", caption: "かなもじ" },
    format: "choice",
    choices: ["ひらがな・カタカナ", "アルファベット", "{数字|すうじ}", "{絵文字|えもじ}"],
    answer: "ひらがな・カタカナ",
  },
  {
    id: `${U.asukaNaraHeian}.q-6`,
    unitId: U.asukaNaraHeian,
    prompt: "{聖徳太子|しょうとくたいし}が{中国|ちゅうごく}（{隋|ずい}）におくった{使|つか}いを{何|なん}という？",
    explanation:
      "{進|すす}んだ{文化|ぶんか}を{学|まな}ぶため、{隋|ずい}におくった{使|つか}いを「{遣隋使|けんずいし}」というよ。",
    format: "choice",
    choices: ["{遣隋使|けんずいし}", "{遣唐使|けんとうし}", "{渡来人|とらいじん}", "{大名|だいみょう}"],
    answer: "{遣隋使|けんずいし}",
  },
  {
    id: `${U.asukaNaraHeian}.q-7`,
    unitId: U.asukaNaraHeian,
    prompt: "710{年|ねん}に{奈良|なら}におかれた{都|みやこ}を{何|なん}という？",
    explanation:
      "{奈良|なら}におかれた{都|みやこ}を「{平城京|へいじょうきょう}」というよ。",
    format: "choice",
    choices: ["{平城京|へいじょうきょう}", "{平安京|へいあんきょう}", "{江戸|えど}", "{鎌倉|かまくら}"],
    answer: "{平城京|へいじょうきょう}",
  },
  {
    id: `${U.asukaNaraHeian}.q-8`,
    unitId: U.asukaNaraHeian,
    prompt: "{平城京|へいじょうきょう}があったのは{今|いま}の{何県|なにけん}？",
    explanation:
      "{平城京|へいじょうきょう}は{今|いま}の{奈良県|ならけん}にあったよ。",
    format: "choice",
    choices: ["{奈良県|ならけん}", "{京都府|きょうとふ}", "{東京都|とうきょうと}", "{大阪府|おおさかふ}"],
    answer: "{奈良県|ならけん}",
  },
  {
    id: `${U.asukaNaraHeian}.q-9`,
    unitId: U.asukaNaraHeian,
    prompt: "{大仏|だいぶつ}づくりに{協力|きょうりょく}し、{人|ひと}びとに{仏教|ぶっきょう}を{広|ひろ}めたお{坊|ぼう}さんはだれ？",
    explanation:
      "{各地|かくち}で{人|ひと}びとをたすけ、{大仏|だいぶつ}づくりに{協力|きょうりょく}したお{坊|ぼう}さんは「{行基|ぎょうき}」だよ。",
    format: "choice",
    choices: ["{行基|ぎょうき}", "{聖徳太子|しょうとくたいし}", "{卑弥呼|ひみこ}", "ペリー"],
    answer: "{行基|ぎょうき}",
  },
  {
    id: `${U.asukaNaraHeian}.q-10`,
    unitId: U.asukaNaraHeian,
    prompt: "{奈良|なら}{時代|じだい}につくられた、{日本|にほん}の{神話|しんわ}や{歴史|れきし}をまとめた{書物|しょもつ}は？",
    explanation:
      "「{古事記|こじき}」や「{日本書紀|にほんしょき}」に、{日本|にほん}の{古|ふる}い{話|はなし}や{歴史|れきし}がまとめられたよ。",
    format: "choice",
    choices: ["{古事記|こじき}・{日本書紀|にほんしょき}", "{源氏物語|げんじものがたり}", "{枕草子|まくらのそうし}", "{解体新書|かいたいしんしょ}"],
    answer: "{古事記|こじき}・{日本書紀|にほんしょき}",
  },
  {
    id: `${U.asukaNaraHeian}.q-11`,
    unitId: U.asukaNaraHeian,
    prompt: "{奈良|なら}{時代|じだい}の{和歌|わか}をたくさん{集|あつ}めた{歌集|かしゅう}を{何|なん}という？",
    explanation:
      "{天皇|てんのう}から{庶民|しょみん}まで{広|ひろ}く{和歌|わか}を{集|あつ}めた「{万葉集|まんようしゅう}」がつくられたよ。",
    format: "choice",
    choices: ["{万葉集|まんようしゅう}", "{源氏物語|げんじものがたり}", "{平家物語|へいけものがたり}", "{解体新書|かいたいしんしょ}"],
    answer: "{万葉集|まんようしゅう}",
  },
  {
    id: `${U.asukaNaraHeian}.q-12`,
    unitId: U.asukaNaraHeian,
    prompt: "{平安京|へいあんきょう}に{都|みやこ}をうつした{天皇|てんのう}はだれ？",
    explanation:
      "794{年|ねん}に{平安京|へいあんきょう}へ{都|みやこ}をうつしたのは「{桓武天皇|かんむてんのう}」だよ。",
    format: "choice",
    choices: ["{桓武天皇|かんむてんのう}", "{聖武天皇|しょうむてんのう}", "{明治天皇|めいじてんのう}", "{推古天皇|すいこてんのう}"],
    answer: "{桓武天皇|かんむてんのう}",
  },
  {
    id: `${U.asukaNaraHeian}.q-13`,
    unitId: U.asukaNaraHeian,
    prompt: "{平安|へいあん}{時代|じだい}に{大|おお}きな{力|ちから}をもった{貴族|きぞく}「{藤原氏|ふじわらし}」の{代表|だいひょう}はだれ？",
    explanation:
      "{藤原|ふじわら}の{中|なか}でもとくに{力|ちから}をもった「{藤原道長|ふじわらのみちなが}」が{有名|ゆうめい}だよ。",
    format: "choice",
    choices: ["{藤原道長|ふじわらのみちなが}", "{源頼朝|みなもとのよりとも}", "{徳川家康|とくがわいえやす}", "{織田信長|おだのぶなが}"],
    answer: "{藤原道長|ふじわらのみちなが}",
  },
  {
    id: `${U.asukaNaraHeian}.q-14`,
    unitId: U.asukaNaraHeian,
    prompt: "「{枕草子|まくらのそうし}」を{書|か}いた{人|ひと}はだれ？",
    explanation:
      "{宮中|きゅうちゅう}のようすをえがいた「{枕草子|まくらのそうし}」をかいたのは「{清少納言|せいしょうなごん}」だよ。",
    format: "choice",
    choices: ["{清少納言|せいしょうなごん}", "{紫式部|むらさきしきぶ}", "{卑弥呼|ひみこ}", "{紀貫之|きのつらゆき}"],
    answer: "{清少納言|せいしょうなごん}",
  },
  {
    id: `${U.asukaNaraHeian}.q-15`,
    unitId: U.asukaNaraHeian,
    prompt: "{漢字|かんじ}をくずしてできた、やわらかい{文字|もじ}を{何|なん}という？",
    explanation:
      "{漢字|かんじ}をくずしてできた{文字|もじ}が「ひらがな」だよ。{女性|じょせい}の{文学|ぶんがく}にも{使|つか}われたよ。",
    format: "choice",
    choices: ["ひらがな", "アルファベット", "ローマ{字|じ}", "{数字|すうじ}"],
    answer: "ひらがな",
  },
  {
    id: `${U.asukaNaraHeian}.q-16`,
    unitId: U.asukaNaraHeian,
    prompt: "{漢字|かんじ}の{一部|いちぶ}からできた{文字|もじ}を{何|なん}という？",
    explanation:
      "{漢字|かんじ}の{一部|いちぶ}をとってできた{文字|もじ}が「カタカナ」だよ。",
    format: "choice",
    choices: ["カタカナ", "ひらがな", "アルファベット", "{絵文字|えもじ}"],
    answer: "カタカナ",
  },
  {
    id: `${U.asukaNaraHeian}.q-17`,
    unitId: U.asukaNaraHeian,
    prompt: "{中国|ちゅうごく}（{唐|とう}）におくられた{使|つか}いを{何|なん}という？",
    explanation:
      "{唐|とう}の{進|すす}んだ{文化|ぶんか}を{学|まな}ぶためにおくった{使|つか}いを「{遣唐使|けんとうし}」というよ。",
    format: "choice",
    choices: ["{遣唐使|けんとうし}", "{遣隋使|けんずいし}", "{渡来人|とらいじん}", "{武士|ぶし}"],
    answer: "{遣唐使|けんとうし}",
  },
  {
    id: `${U.asukaNaraHeian}.q-18`,
    unitId: U.asukaNaraHeian,
    prompt: "{平安|へいあん}{時代|じだい}に{生|う}まれた、{日本|にほん}らしい{貴族|きぞく}の{文化|ぶんか}を{何|なん}という？",
    explanation:
      "{中国|ちゅうごく}の{文化|ぶんか}をもとに{日本|にほん}らしくなった{文化|ぶんか}を「{国風|こくふう}{文化|ぶんか}」というよ。",
    format: "choice",
    choices: ["{国風|こくふう}{文化|ぶんか}", "{文明開化|ぶんめいかいか}", "{町人|ちょうにん}{文化|ぶんか}", "{桃山|ももやま}{文化|ぶんか}"],
    answer: "{国風|こくふう}{文化|ぶんか}",
  },
  {
    id: `${U.asukaNaraHeian}.q-19`,
    unitId: U.asukaNaraHeian,
    prompt: "{聖武天皇|しょうむてんのう}が{仏教|ぶっきょう}の{力|ちから}で{国|くに}をまもろうと、{国|くに}ごとにたてさせた{寺|てら}を{何|なん}という？",
    explanation:
      "{国|くに}ごとにたてさせた{寺|てら}を「{国分寺|こくぶんじ}」というよ。{中心|ちゅうしん}が{奈良|なら}の{東大寺|とうだいじ}だよ。",
    format: "choice",
    choices: ["{国分寺|こくぶんじ}", "{神社|じんじゃ}", "お{城|しろ}", "{学校|がっこう}"],
    answer: "{国分寺|こくぶんじ}",
  },
  {
    id: `${U.asukaNaraHeian}.q-20`,
    unitId: U.asukaNaraHeian,
    prompt: "{飛鳥|あすか}・{奈良|なら}・{平安|へいあん}の{都|みやこ}は、おもにどの{地方|ちほう}にあった？",
    explanation:
      "これらの{都|みやこ}は、{奈良|なら}や{京都|きょうと}のある{近畿|きんき}{地方|ちほう}にあったよ。",
    format: "choice",
    choices: ["{近畿|きんき}{地方|ちほう}", "{北海道|ほっかいどう}", "{九州|きゅうしゅう}", "{関東|かんとう}{地方|ちほう}"],
    answer: "{近畿|きんき}{地方|ちほう}",
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
  {
    id: `${U.kamakuraMuromachi}.q-6`,
    unitId: U.kamakuraMuromachi,
    prompt: "{鎌倉|かまくら}{幕府|ばくふ}で、{将軍|しょうぐん}を{助|たす}けて{政治|せいじ}を{行|おこな}った{役職|やくしょく}を{何|なん}という？",
    explanation:
      "{源氏|げんじ}の{将軍|しょうぐん}が{絶|た}えたあと、{北条氏|ほうじょうし}が「{執権|しっけん}」として{政治|せいじ}を{行|おこな}ったよ。",
    format: "choice",
    choices: ["{執権|しっけん}", "{関白|かんぱく}", "{大老|たいろう}", "{総理大臣|そうりだいじん}"],
    answer: "{執権|しっけん}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-7`,
    unitId: U.kamakuraMuromachi,
    prompt: "{元寇|げんこう}のとき、{執権|しっけん}として{幕府|ばくふ}をひきいた{北条氏|ほうじょうし}の{人物|じんぶつ}はだれ？",
    explanation:
      "{元寇|げんこう}のときの{執権|しっけん}は「{北条時宗|ほうじょうときむね}」だよ。",
    format: "choice",
    choices: ["{北条時宗|ほうじょうときむね}", "{源頼朝|みなもとのよりとも}", "{足利義満|あしかがよしみつ}", "{徳川家康|とくがわいえやす}"],
    answer: "{北条時宗|ほうじょうときむね}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-8`,
    unitId: U.kamakuraMuromachi,
    prompt: "{元寇|げんこう}のあと、{武士|ぶし}（ごけにん）の{不満|ふまん}が{高|たか}まった{理由|りゆう}は？",
    explanation:
      "{元|げん}とたたかっても、{新|あたら}しい{土地|とち}が{手|て}に{入|はい}らず、{十分|じゅうぶん}なほうびがもらえなかったからだよ。",
    format: "choice",
    choices: ["ほうびがもらえなかったから", "{米|こめ}がふえすぎたから", "{平和|へいわ}すぎたから", "{税|ぜい}がなくなったから"],
    answer: "ほうびがもらえなかったから",
  },
  {
    id: `${U.kamakuraMuromachi}.q-9`,
    unitId: U.kamakuraMuromachi,
    prompt: "{鎌倉|かまくら}{時代|じだい}に{広|ひろ}まった、わかりやすい{新|あたら}しい{仏教|ぶっきょう}の{例|れい}は？",
    explanation:
      "「{念仏|ねんぶつ}」をとなえるなど、{庶民|しょみん}にもわかりやすい{新|あたら}しい{仏教|ぶっきょう}が{広|ひろ}まったよ。",
    format: "choice",
    choices: ["{念仏|ねんぶつ}をとなえる{教|おし}え", "キリスト{教|きょう}", "イスラム{教|きょう}", "{神道|しんとう}だけ"],
    answer: "{念仏|ねんぶつ}をとなえる{教|おし}え",
  },
  {
    id: `${U.kamakuraMuromachi}.q-10`,
    unitId: U.kamakuraMuromachi,
    prompt: "{室町|むろまち}{幕府|ばくふ}をひらいた{将軍|しょうぐん}はだれ？",
    explanation:
      "{京都|きょうと}に{室町|むろまち}{幕府|ばくふ}をひらいたのは「{足利尊氏|あしかがたかうじ}」だよ。",
    format: "choice",
    choices: ["{足利尊氏|あしかがたかうじ}", "{源頼朝|みなもとのよりとも}", "{徳川家康|とくがわいえやす}", "{北条時宗|ほうじょうときむね}"],
    answer: "{足利尊氏|あしかがたかうじ}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-11`,
    unitId: U.kamakuraMuromachi,
    prompt: "{金閣|きんかく}をたてた{足利義満|あしかがよしみつ}のころにさかえた{文化|ぶんか}を{何|なん}という？",
    explanation:
      "{金閣|きんかく}に{代表|だいひょう}される、{足利義満|あしかがよしみつ}のころの{文化|ぶんか}を「{北山|きたやま}{文化|ぶんか}」というよ。",
    format: "choice",
    choices: ["{北山|きたやま}{文化|ぶんか}", "{東山|ひがしやま}{文化|ぶんか}", "{国風|こくふう}{文化|ぶんか}", "{文明開化|ぶんめいかいか}"],
    answer: "{北山|きたやま}{文化|ぶんか}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-12`,
    unitId: U.kamakuraMuromachi,
    prompt: "{銀閣|ぎんかく}と{同|おな}じころにさかえた、しぶくおちついた{文化|ぶんか}を{何|なん}という？",
    explanation:
      "{銀閣|ぎんかく}に{代表|だいひょう}される{文化|ぶんか}を「{東山|ひがしやま}{文化|ぶんか}」というよ。",
    format: "choice",
    choices: ["{東山|ひがしやま}{文化|ぶんか}", "{北山|きたやま}{文化|ぶんか}", "{町人|ちょうにん}{文化|ぶんか}", "{桃山|ももやま}{文化|ぶんか}"],
    answer: "{東山|ひがしやま}{文化|ぶんか}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-13`,
    unitId: U.kamakuraMuromachi,
    prompt: "{室町|むろまち}{時代|じだい}に{発展|はってん}した、すみだけでえがく{絵|え}を{何|なん}という？",
    explanation:
      "すみのこいうすいでえがく{絵|え}を「{水墨画|すいぼくが}」というよ。",
    format: "choice",
    choices: ["{水墨画|すいぼくが}", "{浮世絵|うきよえ}", "{油絵|あぶらえ}", "まんが"],
    answer: "{水墨画|すいぼくが}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-14`,
    unitId: U.kamakuraMuromachi,
    prompt: "{水墨画|すいぼくが}を{大成|たいせい}させた{室町|むろまち}{時代|じだい}のお{坊|ぼう}さんはだれ？",
    explanation:
      "{中国|ちゅうごく}でも{学|まな}び、{水墨画|すいぼくが}を{大成|たいせい}させたのは「{雪舟|せっしゅう}」だよ。",
    format: "choice",
    choices: ["{雪舟|せっしゅう}", "{紫式部|むらさきしきぶ}", "{葛飾北斎|かつしかほくさい}", "{清少納言|せいしょうなごん}"],
    answer: "{雪舟|せっしゅう}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-15`,
    unitId: U.kamakuraMuromachi,
    prompt: "{室町|むろまち}{時代|じだい}に{生|う}まれた、{今|いま}の{和室|わしつ}につながるつくりを{何|なん}という？",
    explanation:
      "たたみや{床|とこ}の{間|ま}のある「{書院造|しょいんづくり}」が{生|う}まれたよ。",
    format: "choice",
    choices: ["{書院造|しょいんづくり}", "マンション", "ビル", "{洋館|ようかん}"],
    answer: "{書院造|しょいんづくり}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-16`,
    unitId: U.kamakuraMuromachi,
    prompt: "1467{年|ねん}に{京都|きょうと}でおこり、{戦国|せんごく}{時代|じだい}のきっかけとなった{戦|たたか}いを{何|なん}という？",
    explanation:
      "{京都|きょうと}を{中心|ちゅうしん}におこった{大|おお}きな{戦|たたか}いを「{応仁|おうにん}の{乱|らん}」というよ。",
    format: "choice",
    choices: ["{応仁|おうにん}の{乱|らん}", "{元寇|げんこう}", "{関|せき}ヶ{原|はら}の{戦|たたか}い", "{大化|たいか}の{改新|かいしん}"],
    answer: "{応仁|おうにん}の{乱|らん}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-17`,
    unitId: U.kamakuraMuromachi,
    prompt: "{能|のう}や{狂言|きょうげん}がさかんになったのは{何|なに}{時代|じだい}？",
    explanation:
      "{能|のう}や{狂言|きょうげん}は{室町|むろまち}{時代|じだい}にさかんになったよ。",
    format: "choice",
    choices: ["{室町|むろまち}{時代|じだい}", "{縄文|じょうもん}{時代|じだい}", "{明治|めいじ}{時代|じだい}", "{平安|へいあん}{時代|じだい}"],
    answer: "{室町|むろまち}{時代|じだい}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-18`,
    unitId: U.kamakuraMuromachi,
    prompt: "{鎌倉|かまくら}{幕府|ばくふ}で、{将軍|しょうぐん}に{従|したが}う{武士|ぶし}を{何|なん}という？",
    explanation:
      "{将軍|しょうぐん}とごおん・ほうこうのかんけいでむすばれた{武士|ぶし}を「ごけにん」というよ。",
    format: "choice",
    choices: ["ごけにん", "{町人|ちょうにん}", "{渡来人|とらいじん}", "{公家|くげ}"],
    answer: "ごけにん",
  },
  {
    id: `${U.kamakuraMuromachi}.q-19`,
    unitId: U.kamakuraMuromachi,
    prompt: "{鎌倉|かまくら}・{室町|むろまち}{時代|じだい}に{国|くに}をおさめたのは、おもにどんな{身分|みぶん}の{人|ひと}？",
    explanation:
      "この{時代|じだい}は{武士|ぶし}が{政治|せいじ}の{中心|ちゅうしん}となり、{国|くに}をおさめたよ。",
    format: "choice",
    choices: ["{武士|ぶし}", "{貴族|きぞく}だけ", "{農民|のうみん}", "{商人|しょうにん}"],
    answer: "{武士|ぶし}",
  },
  {
    id: `${U.kamakuraMuromachi}.q-20`,
    unitId: U.kamakuraMuromachi,
    prompt: "{元寇|げんこう}を{何回|なんかい}しりぞけた？",
    explanation:
      "{元|げん}は2{回|かい}せめてきて、{日本|にほん}は{暴風雨|ぼうふうう}などにもたすけられて2{回|かい}ともしりぞけたよ。",
    format: "choice",
    choices: ["2{回|かい}", "1{回|かい}", "5{回|かい}", "10{回|かい}"],
    answer: "2{回|かい}",
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
    prompt: "この{時代|じだい}、ザビエルらによって{日本|にほん}につたえられた{外国|がいこく}の{宗教|しゅうきょう}は{何|なん}？",
    explanation:
      "「キリストきょう」だよ。フランシスコ・ザビエルがつたえ、{西|にし}{日本|にほん}を{中心|ちゅうしん}にひろまったよ。",
    visual: { kind: "emoji", value: "✝️", caption: "キリストきょう" },
    format: "choice",
    choices: ["キリストきょう", "{仏教|ぶっきょう}", "しんとう", "イスラムきょう"],
    answer: "キリストきょう",
  },
  {
    id: `${U.sengoku}.q-6`,
    unitId: U.sengoku,
    prompt: "{鉄砲|てっぽう}がつたわった{島|しま}はどこ？",
    explanation:
      "1543{年|ねん}ごろ、{鉄砲|てっぽう}は{種子島|たねがしま}につたわったよ。",
    format: "choice",
    choices: ["{種子島|たねがしま}", "{北海道|ほっかいどう}", "{淡路島|あわじしま}", "{佐渡|さど}が{島|しま}"],
    answer: "{種子島|たねがしま}",
  },
  {
    id: `${U.sengoku}.q-7`,
    unitId: U.sengoku,
    prompt: "{鉄砲|てっぽう}をつたえたのは、どこの{国|くに}の{人|ひと}？",
    explanation:
      "{鉄砲|てっぽう}はポルトガル{人|じん}によって{日本|にほん}につたえられたよ。",
    format: "choice",
    choices: ["ポルトガル{人|じん}", "アメリカ{人|じん}", "{中国|ちゅうごく}{人|じん}", "ロシア{人|じん}"],
    answer: "ポルトガル{人|じん}",
  },
  {
    id: `${U.sengoku}.q-8`,
    unitId: U.sengoku,
    prompt: "キリスト{教|きょう}を{日本|にほん}につたえた{宣教師|せんきょうし}はだれ？",
    explanation:
      "1549{年|ねん}、フランシスコ・ザビエルがキリスト{教|きょう}をつたえたよ。",
    format: "choice",
    choices: ["ザビエル", "ペリー", "コロンブス", "マルコ・ポーロ"],
    answer: "ザビエル",
  },
  {
    id: `${U.sengoku}.q-9`,
    unitId: U.sengoku,
    prompt: "{織田信長|おだのぶなが}が{鉄砲|てっぽう}を{多|おお}く{使|つか}って{勝|か}った、{長篠|ながしの}の{戦|たたか}いの{相手|あいて}は？",
    explanation:
      "{長篠|ながしの}の{戦|たたか}いで、{信長|のぶなが}は{鉄砲|てっぽう}を{使|つか}って{武田|たけだ}の{騎馬隊|きばたい}をやぶったよ。",
    format: "choice",
    choices: ["{武田|たけだ}の{騎馬隊|きばたい}", "{元|げん}（モンゴル）", "アメリカ{軍|ぐん}", "{平氏|へいし}"],
    answer: "{武田|たけだ}の{騎馬隊|きばたい}",
  },
  {
    id: `${U.sengoku}.q-10`,
    unitId: U.sengoku,
    prompt: "{信長|のぶなが}が{商売|しょうばい}をさかんにするため、{市|いち}の{税|ぜい}をなくした{政策|せいさく}を{何|なん}という？",
    explanation:
      "だれでも{自由|じゆう}に{商売|しょうばい}できるようにした{政策|せいさく}を「{楽市楽座|らくいちらくざ}」というよ。",
    format: "choice",
    choices: ["{楽市楽座|らくいちらくざ}", "{刀狩|かたながり}", "{鎖国|さこく}", "{参勤交代|さんきんこうたい}"],
    answer: "{楽市楽座|らくいちらくざ}",
  },
  {
    id: `${U.sengoku}.q-11`,
    unitId: U.sengoku,
    prompt: "{信長|のぶなが}がきずいた、りっぱな{天守|てんしゅ}をもつ{城|しろ}を{何|なん}という？",
    explanation:
      "{信長|のぶなが}は{琵琶湖|びわこ}のそばに「{安土城|あづちじょう}」をきずいたよ。",
    format: "choice",
    choices: ["{安土城|あづちじょう}", "{大阪城|おおさかじょう}", "{江戸城|えどじょう}", "{姫路城|ひめじじょう}"],
    answer: "{安土城|あづちじょう}",
  },
  {
    id: `${U.sengoku}.q-12`,
    unitId: U.sengoku,
    prompt: "{信長|のぶなが}が、{家来|けらい}の{明智光秀|あけちみつひで}にたおされた{事件|じけん}を{何|なん}という？",
    explanation:
      "{京都|きょうと}でおこったこの{事件|じけん}を「{本能寺|ほんのうじ}の{変|へん}」というよ。",
    format: "choice",
    choices: ["{本能寺|ほんのうじ}の{変|へん}", "{関|せき}ヶ{原|はら}の{戦|たたか}い", "{応仁|おうにん}の{乱|らん}", "{元寇|げんこう}"],
    answer: "{本能寺|ほんのうじ}の{変|へん}",
  },
  {
    id: `${U.sengoku}.q-13`,
    unitId: U.sengoku,
    prompt: "{豊臣秀吉|とよとみひでよし}が{全国|ぜんこく}の{田畑|たはた}の{広|ひろ}さや{収穫|しゅうかく}を{調|しら}べた{政策|せいさく}を{何|なん}という？",
    explanation:
      "{秀吉|ひでよし}が{全国|ぜんこく}の{田畑|たはた}を{調|しら}べた{政策|せいさく}を「{検地|けんち}（{太閤検地|たいこうけんち}）」というよ。",
    format: "choice",
    choices: ["{検地|けんち}", "{鎖国|さこく}", "{文明開化|ぶんめいかいか}", "{元寇|げんこう}"],
    answer: "{検地|けんち}",
  },
  {
    id: `${U.sengoku}.q-14`,
    unitId: U.sengoku,
    prompt: "{検地|けんち}と{刀狩|かたながり}によって、はっきり{分|わ}けられたものは？",
    explanation:
      "{検地|けんち}と{刀狩|かたながり}によって、{武士|ぶし}と{農民|のうみん}の{身分|みぶん}がはっきり{分|わ}けられたよ。",
    format: "choice",
    choices: ["{武士|ぶし}と{農民|のうみん}の{身分|みぶん}", "{男|おとこ}と{女|おんな}", "{大人|おとな}と{子|こ}ども", "{都会|とかい}と{田舎|いなか}"],
    answer: "{武士|ぶし}と{農民|のうみん}の{身分|みぶん}",
  },
  {
    id: `${U.sengoku}.q-15`,
    unitId: U.sengoku,
    prompt: "{豊臣秀吉|とよとみひでよし}が{大軍|たいぐん}をおくってせめようとした{国|くに}は？",
    explanation:
      "{秀吉|ひでよし}は{中国|ちゅうごく}（{明|みん}）をせめようと、{朝鮮|ちょうせん}に{大軍|たいぐん}をおくったよ。",
    format: "choice",
    choices: ["{朝鮮|ちょうせん}", "アメリカ", "インド", "ロシア"],
    answer: "{朝鮮|ちょうせん}",
  },
  {
    id: `${U.sengoku}.q-16`,
    unitId: U.sengoku,
    prompt: "{秀吉|ひでよし}がきずいた、ごうかな{城|しろ}は？",
    explanation:
      "{秀吉|ひでよし}は{天下|てんか}とういつの{拠点|きょてん}として「{大阪城|おおさかじょう}」をきずいたよ。",
    format: "choice",
    choices: ["{大阪城|おおさかじょう}", "{安土城|あづちじょう}", "{江戸城|えどじょう}", "{名古屋城|なごやじょう}"],
    answer: "{大阪城|おおさかじょう}",
  },
  {
    id: `${U.sengoku}.q-17`,
    unitId: U.sengoku,
    prompt: "{戦国|せんごく}{時代|じだい}に{各地|かくち}を{支配|しはい}した{実力者|じつりょくしゃ}を{何|なん}という？",
    explanation:
      "{各地|かくち}で{力|ちから}をもって{領地|りょうち}を{支配|しはい}した{大名|だいみょう}を「{戦国大名|せんごくだいみょう}」というよ。",
    format: "choice",
    choices: ["{戦国大名|せんごくだいみょう}", "{貴族|きぞく}", "{渡来人|とらいじん}", "ごけにん"],
    answer: "{戦国大名|せんごくだいみょう}",
  },
  {
    id: `${U.sengoku}.q-18`,
    unitId: U.sengoku,
    prompt: "キリスト{教|きょう}を{信|しん}じるようになった{大名|だいみょう}を{何|なん}という？",
    explanation:
      "キリスト{教|きょう}の{信者|しんじゃ}になった{大名|だいみょう}を「キリシタン{大名|だいみょう}」というよ。",
    format: "choice",
    choices: ["キリシタン{大名|だいみょう}", "{執権|しっけん}", "{関白|かんぱく}", "{摂政|せっしょう}"],
    answer: "キリシタン{大名|だいみょう}",
  },
  {
    id: `${U.sengoku}.q-19`,
    unitId: U.sengoku,
    prompt: "{戦国|せんごく}{時代|じだい}に、{下|した}の{身分|みぶん}の{者|もの}が{上|うえ}の{者|もの}をたおして{力|ちから}をもつ{風潮|ふうちょう}を{何|なん}という？",
    explanation:
      "{実力|じつりょく}があれば{上|うえ}にのし{上|あ}がれる{風潮|ふうちょう}を「{下剋上|げこくじょう}」というよ。",
    format: "choice",
    choices: ["{下剋上|げこくじょう}", "{文明開化|ぶんめいかいか}", "{三権分立|さんけんぶんりつ}", "{富国強兵|ふこくきょうへい}"],
    answer: "{下剋上|げこくじょう}",
  },
  {
    id: `${U.sengoku}.q-20`,
    unitId: U.sengoku,
    prompt: "{信長|のぶなが}・{秀吉|ひでよし}が{活躍|かつやく}したころの、はなやかな{文化|ぶんか}を{何|なん}という？",
    explanation:
      "{大|おお}きな{城|しろ}やきらびやかなびょうぶにあらわれた{文化|ぶんか}を「{桃山|ももやま}{文化|ぶんか}」というよ。",
    format: "choice",
    choices: ["{桃山|ももやま}{文化|ぶんか}", "{国風|こくふう}{文化|ぶんか}", "{北山|きたやま}{文化|ぶんか}", "{文明開化|ぶんめいかいか}"],
    answer: "{桃山|ももやま}{文化|ぶんか}",
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
    prompt: "1853{年|ねん}に{黒船|くろふね}でやってきて、{日本|にほん}に{開国|かいこく}をせまったアメリカ{人|じん}はだれ？",
    explanation:
      "「ペリー」だよ。{黒船|くろふね}の{来航|らいこう}をきっかけに{鎖国|さこく}がおわり、{日本|にほん}は{大|おお}きくかわっていくよ。",
    visual: { kind: "emoji", value: "🚢", caption: "くろふね" },
    format: "choice",
    choices: ["ペリー", "ザビエル", "コロンブス", "リンカーン"],
    answer: "ペリー",
  },
  {
    id: `${U.edo}.q-6`,
    unitId: U.edo,
    prompt: "{江戸|えど}{幕府|ばくふ}をおよそ260{年間|ねんかん}おさめた{将軍|しょうぐん}の{家|いえ}は？",
    explanation:
      "{江戸|えど}{幕府|ばくふ}は{徳川家|とくがわけ}が{代々|だいだい}{将軍|しょうぐん}をつとめておさめたよ。",
    format: "choice",
    choices: ["{徳川家|とくがわけ}", "{豊臣家|とよとみけ}", "{源氏|げんじ}", "{平氏|へいし}"],
    answer: "{徳川家|とくがわけ}",
  },
  {
    id: `${U.edo}.q-7`,
    unitId: U.edo,
    prompt: "1600{年|ねん}、{家康|いえやす}が{天下|てんか}をとるきっかけになった{戦|たたか}いを{何|なん}という？",
    explanation:
      "{家康|いえやす}が{勝|か}ってこの{後|ご}の{支配|しはい}を{固|かた}めた{戦|たたか}いを「{関|せき}ヶ{原|はら}の{戦|たたか}い」というよ。",
    format: "choice",
    choices: ["{関|せき}ヶ{原|はら}の{戦|たたか}い", "{本能寺|ほんのうじ}の{変|へん}", "{応仁|おうにん}の{乱|らん}", "{元寇|げんこう}"],
    answer: "{関|せき}ヶ{原|はら}の{戦|たたか}い",
  },
  {
    id: `${U.edo}.q-8`,
    unitId: U.edo,
    prompt: "{大名|だいみょう}を{江戸|えど}と{領地|りょうち}に1{年|ねん}ごとにいったりこさせた{制度|せいど}を{何|なん}という？",
    explanation:
      "{大名|だいみょう}にお{金|かね}を{使|つか}わせ、{力|ちから}をおさえる「{参勤交代|さんきんこうたい}」だよ。",
    format: "choice",
    choices: ["{参勤交代|さんきんこうたい}", "{刀狩|かたながり}", "{元寇|げんこう}", "{三権分立|さんけんぶんりつ}"],
    answer: "{参勤交代|さんきんこうたい}",
  },
  {
    id: `${U.edo}.q-9`,
    unitId: U.edo,
    prompt: "{江戸|えど}{時代|じだい}の{身分|みぶん}で、いちばん{上|うえ}とされたのは？",
    explanation:
      "{江戸|えど}{時代|じだい}は{武士|ぶし}が{上|うえ}の{身分|みぶん}とされ、{政治|せいじ}を{行|おこな}ったよ。",
    format: "choice",
    choices: ["{武士|ぶし}", "{町人|ちょうにん}", "{百姓|ひゃくしょう}", "{公家|くげ}"],
    answer: "{武士|ぶし}",
  },
  {
    id: `${U.edo}.q-10`,
    unitId: U.edo,
    prompt: "{江戸|えど}{時代|じだい}の{人口|じんこう}の{大半|たいはん}をしめた{身分|みぶん}は？",
    explanation:
      "{人口|じんこう}の{大半|たいはん}は{米|こめ}などをつくる{百姓|ひゃくしょう}（{農民|のうみん}）だったよ。",
    format: "choice",
    choices: ["{百姓|ひゃくしょう}（{農民|のうみん}）", "{武士|ぶし}", "{大名|だいみょう}", "{公家|くげ}"],
    answer: "{百姓|ひゃくしょう}（{農民|のうみん}）",
  },
  {
    id: `${U.edo}.q-11`,
    unitId: U.edo,
    prompt: "{鎖国|さこく}の{中|なか}でも{出島|でじま}で{貿易|ぼうえき}がゆるされたヨーロッパの{国|くに}は？",
    explanation:
      "{長崎|ながさき}の{出島|でじま}で{貿易|ぼうえき}がゆるされたヨーロッパの{国|くに}は「オランダ」だよ。",
    format: "choice",
    choices: ["オランダ", "ポルトガル", "スペイン", "イギリス"],
    answer: "オランダ",
  },
  {
    id: `${U.edo}.q-12`,
    unitId: U.edo,
    prompt: "{鎖国|さこく}の{中|なか}でも{交流|こうりゅう}があった{相手|あいて}はどれ？",
    explanation:
      "オランダや{中国|ちゅうごく}・{朝鮮|ちょうせん}・{琉球|りゅうきゅう}などとは{交流|こうりゅう}があったよ。",
    format: "choice",
    choices: ["オランダや{中国|ちゅうごく}", "アメリカ", "ロシア", "インド"],
    answer: "オランダや{中国|ちゅうごく}",
  },
  {
    id: `${U.edo}.q-13`,
    unitId: U.edo,
    prompt: "{浮世絵|うきよえ}で「{富嶽三十六景|ふがくさんじゅうろっけい}」をえがいた{人|ひと}はだれ？",
    explanation:
      "{富士山|ふじさん}などをえがいた{浮世絵師|うきよえし}は「{葛飾北斎|かつしかほくさい}」だよ。",
    format: "choice",
    choices: ["{葛飾北斎|かつしかほくさい}", "{雪舟|せっしゅう}", "{紫式部|むらさきしきぶ}", "ザビエル"],
    answer: "{葛飾北斎|かつしかほくさい}",
  },
  {
    id: `${U.edo}.q-14`,
    unitId: U.edo,
    prompt: "{杉田玄白|すぎたげんぱく}らがオランダ{語|ご}の{医学書|いがくしょ}をやくした{本|ほん}を{何|なん}という？",
    explanation:
      "{人体|じんたい}の{本|ほん}をやくした「{解体新書|かいたいしんしょ}」だよ。{蘭学|らんがく}の{発展|はってん}につながったよ。",
    format: "choice",
    choices: ["{解体新書|かいたいしんしょ}", "{古事記|こじき}", "{源氏物語|げんじものがたり}", "{万葉集|まんようしゅう}"],
    answer: "{解体新書|かいたいしんしょ}",
  },
  {
    id: `${U.edo}.q-15`,
    unitId: U.edo,
    prompt: "オランダなどからつたわった{学問|がくもん}を{何|なん}という？",
    explanation:
      "オランダ{語|ご}を{通|つう}じて{学|まな}んだ{学問|がくもん}を「{蘭学|らんがく}」というよ。",
    format: "choice",
    choices: ["{蘭学|らんがく}", "{国学|こくがく}", "{漢学|かんがく}", "{兵学|へいがく}"],
    answer: "{蘭学|らんがく}",
  },
  {
    id: `${U.edo}.q-16`,
    unitId: U.edo,
    prompt: "{全国|ぜんこく}を{測量|そくりょう}して、{正確|せいかく}な{日本|にほん}{地図|ちず}をつくった{人|ひと}はだれ？",
    explanation:
      "{全国|ぜんこく}を{歩|ある}いて{測量|そくりょう}し、{正確|せいかく}な{日本|にほん}{地図|ちず}をつくったのは「{伊能忠敬|いのうただたか}」だよ。",
    format: "choice",
    choices: ["{伊能忠敬|いのうただたか}", "{杉田玄白|すぎたげんぱく}", "{本居宣長|もとおりのりなが}", "{葛飾北斎|かつしかほくさい}"],
    answer: "{伊能忠敬|いのうただたか}",
  },
  {
    id: `${U.edo}.q-17`,
    unitId: U.edo,
    prompt: "{寺子屋|てらこや}では、おもに{何|なに}を{学|まな}んだ？",
    explanation:
      "{町|まち}や{村|むら}の{子|こ}どもは{寺子屋|てらこや}で「{読|よ}み・{書|か}き・そろばん」を{学|まな}んだよ。",
    format: "choice",
    choices: ["{読|よ}み{書|か}きそろばん", "{鉄砲|てっぽう}", "{英語|えいご}", "プログラミング"],
    answer: "{読|よ}み{書|か}きそろばん",
  },
  {
    id: `${U.edo}.q-18`,
    unitId: U.edo,
    prompt: "{江戸|えど}と{各地|かくち}をむすぶ、{整備|せいび}された{主要|しゅよう}な{道|みち}を{何|なん}という？",
    explanation:
      "{東海道|とうかいどう}など、{江戸|えど}を{中心|ちゅうしん}にのびる5つの{主要|しゅよう}な{道|みち}を「{五街道|ごかいどう}」というよ。",
    format: "choice",
    choices: ["{五街道|ごかいどう}", "{新幹線|しんかんせん}", "{高速道路|こうそくどうろ}", "{運河|うんが}"],
    answer: "{五街道|ごかいどう}",
  },
  {
    id: `${U.edo}.q-19`,
    unitId: U.edo,
    prompt: "{米|こめ}のねだんが{上|あ}がり{生活|せいかつ}がくるしくなると、{百姓|ひゃくしょう}がおこしたうったえを{何|なん}という？",
    explanation:
      "{百姓|ひゃくしょう}が{団結|だんけつ}してうったえをおこすことを「{百姓一揆|ひゃくしょういっき}」というよ。",
    format: "choice",
    choices: ["{百姓一揆|ひゃくしょういっき}", "{参勤交代|さんきんこうたい}", "{元寇|げんこう}", "{文明開化|ぶんめいかいか}"],
    answer: "{百姓一揆|ひゃくしょういっき}",
  },
  {
    id: `${U.edo}.q-20`,
    unitId: U.edo,
    prompt: "ペリーが{来航|らいこう}して{開国|かいこく}のきっかけになった、1854{年|ねん}の{条約|じょうやく}を{何|なん}という？",
    explanation:
      "ペリーとむすんだ「{日米和親条約|にちべいわしんじょうやく}」で{日本|にほん}は{開国|かいこく}へむかったよ。",
    format: "choice",
    choices: ["{日米和親条約|にちべいわしんじょうやく}", "{大日本帝国憲法|だいにっぽんていこくけんぽう}", "{御成敗式目|ごせいばいしきもく}", "ベルサイユ{条約|じょうやく}"],
    answer: "{日米和親条約|にちべいわしんじょうやく}",
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
    prompt: "1889{年|ねん}に{発布|はっぷ}された、{日本|にほん}ではじめての{憲法|けんぽう}を{何|なん}という？",
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
    prompt: "{明治|めいじ}{時代|じだい}に{日本|にほん}がたたかった、ロシアとの{戦争|せんそう}を{何|なん}という？",
    explanation:
      "「{日露戦争|にちろせんそう}」だよ。その{前|まえ}には{中国|ちゅうごく}（しん）とたたかった{日清戦争|にっしんせんそう}もあったよ。",
    visual: { kind: "emoji", value: "⚔️", caption: "せんそう" },
    format: "choice",
    choices: ["{日露戦争|にちろせんそう}", "{元寇|げんこう}", "{第二次世界大戦|だいにじせかいたいせん}", "{応仁|おうにん}の{乱|らん}"],
    answer: "{日露戦争|にちろせんそう}",
  },
  {
    id: `${U.meiji}.q-6`,
    unitId: U.meiji,
    prompt: "{明治|めいじ}{政府|せいふ}が{藩|はん}をやめて{県|けん}をおいた{改革|かいかく}を{何|なん}という？",
    explanation:
      "{藩|はん}をなくして{県|けん}や{府|ふ}をおいた{改革|かいかく}を「{廃藩置県|はいはんちけん}」というよ。",
    format: "choice",
    choices: ["{廃藩置県|はいはんちけん}", "{参勤交代|さんきんこうたい}", "{鎖国|さこく}", "{文明開化|ぶんめいかいか}"],
    answer: "{廃藩置県|はいはんちけん}",
  },
  {
    id: `${U.meiji}.q-7`,
    unitId: U.meiji,
    prompt: "{身分制度|みぶんせいど}をなくし、みんなをほぼ{平等|びょうどう}としたことを{何|なん}という？",
    explanation:
      "{武士|ぶし}や{百姓|ひゃくしょう}などの{身分|みぶん}をなくしたことを「{四民平等|しみんびょうどう}」というよ。",
    format: "choice",
    choices: ["{四民平等|しみんびょうどう}", "{富国強兵|ふこくきょうへい}", "{鎖国|さこく}", "{元寇|げんこう}"],
    answer: "{四民平等|しみんびょうどう}",
  },
  {
    id: `${U.meiji}.q-8`,
    unitId: U.meiji,
    prompt: "6さい{以上|いじょう}の{子|こ}どもが{学校|がっこう}へかようように{定|さだ}めた{制度|せいど}を{何|なん}という？",
    explanation:
      "すべての{子|こ}どもが{学校|がっこう}で{学|まな}べるように{定|さだ}めた{制度|せいど}を「{学制|がくせい}」というよ。",
    format: "choice",
    choices: ["{学制|がくせい}", "{兵役|へいえき}", "{鎖国|さこく}", "{検地|けんち}"],
    answer: "{学制|がくせい}",
  },
  {
    id: `${U.meiji}.q-9`,
    unitId: U.meiji,
    prompt: "20さい{以上|いじょう}の{男子|だんし}に{兵隊|へいたい}になる{義務|ぎむ}を{定|さだ}めたことを{何|なん}という？",
    explanation:
      "{国|くに}をまもる{軍隊|ぐんたい}をつくるため、{兵隊|へいたい}になる{義務|ぎむ}を{定|さだ}めた「{徴兵令|ちょうへいれい}」だよ。",
    format: "choice",
    choices: ["{徴兵令|ちょうへいれい}", "{学制|がくせい}", "{地租改正|ちそかいせい}", "{廃藩置県|はいはんちけん}"],
    answer: "{徴兵令|ちょうへいれい}",
  },
  {
    id: `${U.meiji}.q-10`,
    unitId: U.meiji,
    prompt: "{税|ぜい}を{米|こめ}でなくお{金|かね}で{納|おさ}めさせるようにした{改革|かいかく}を{何|なん}という？",
    explanation:
      "{土地|とち}のねだんをもとにお{金|かね}で{税|ぜい}を{納|おさ}めさせた{改革|かいかく}を「{地租改正|ちそかいせい}」というよ。",
    format: "choice",
    choices: ["{地租改正|ちそかいせい}", "{刀狩|かたながり}", "{鎖国|さこく}", "{検地|けんち}"],
    answer: "{地租改正|ちそかいせい}",
  },
  {
    id: `${U.meiji}.q-11`,
    unitId: U.meiji,
    prompt: "{国会|こっかい}をひらくことや{憲法|けんぽう}をもとめた、{国民|こくみん}の{運動|うんどう}を{何|なん}という？",
    explanation:
      "{国民|こくみん}の{声|こえ}を{政治|せいじ}にいかそうとした{運動|うんどう}を「{自由民権運動|じゆうみんけんうんどう}」というよ。",
    format: "choice",
    choices: ["{自由民権運動|じゆうみんけんうんどう}", "{文明開化|ぶんめいかいか}", "{鎖国|さこく}", "{元寇|げんこう}"],
    answer: "{自由民権運動|じゆうみんけんうんどう}",
  },
  {
    id: `${U.meiji}.q-12`,
    unitId: U.meiji,
    prompt: "{自由民権運動|じゆうみんけんうんどう}の{中心|ちゅうしん}となり、{自由党|じゆうとう}をつくったのはだれ？",
    explanation:
      "{国会|こっかい}をひらくようもとめ、{自由党|じゆうとう}をつくったのは「{板垣退助|いたがきたいすけ}」だよ。",
    format: "choice",
    choices: ["{板垣退助|いたがきたいすけ}", "{徳川家康|とくがわいえやす}", "{織田信長|おだのぶなが}", "{聖徳太子|しょうとくたいし}"],
    answer: "{板垣退助|いたがきたいすけ}",
  },
  {
    id: `${U.meiji}.q-13`,
    unitId: U.meiji,
    prompt: "ヨーロッパで{憲法|けんぽう}を{学|まな}び、はじめての{内閣総理大臣|ないかくそうりだいじん}になったのはだれ？",
    explanation:
      "{大日本帝国憲法|だいにっぽんていこくけんぽう}づくりにかかわり、{初代|しょだい}{総理大臣|そうりだいじん}になったのは「{伊藤博文|いとうひろぶみ}」だよ。",
    format: "choice",
    choices: ["{伊藤博文|いとうひろぶみ}", "{板垣退助|いたがきたいすけ}", "{西郷隆盛|さいごうたかもり}", "{大久保利通|おおくぼとしみち}"],
    answer: "{伊藤博文|いとうひろぶみ}",
  },
  {
    id: `${U.meiji}.q-14`,
    unitId: U.meiji,
    prompt: "{明治|めいじ}{政府|せいふ}で{活躍|かつやく}し、のちに{西南戦争|せいなんせんそう}をおこした{薩摩|さつま}の{人物|じんぶつ}はだれ？",
    explanation:
      "{明治維新|めいじいしん}でかつやくし、のちに{西南戦争|せいなんせんそう}をおこしたのは「{西郷隆盛|さいごうたかもり}」だよ。",
    format: "choice",
    choices: ["{西郷隆盛|さいごうたかもり}", "{伊藤博文|いとうひろぶみ}", "{徳川慶喜|とくがわよしのぶ}", "ペリー"],
    answer: "{西郷隆盛|さいごうたかもり}",
  },
  {
    id: `${U.meiji}.q-15`,
    unitId: U.meiji,
    prompt: "「{学問|がくもん}のすゝめ」を{書|か}いて、{新|あたら}しい{考|かんが}えを{広|ひろ}めたのはだれ？",
    explanation:
      "「{天|てん}は{人|ひと}の{上|うえ}に{人|ひと}をつくらず」で{有名|ゆうめい}な「{福沢諭吉|ふくざわゆきち}」だよ。",
    format: "choice",
    choices: ["{福沢諭吉|ふくざわゆきち}", "{伊藤博文|いとうひろぶみ}", "{板垣退助|いたがきたいすけ}", "{夏目漱石|なつめそうせき}"],
    answer: "{福沢諭吉|ふくざわゆきち}",
  },
  {
    id: `${U.meiji}.q-16`,
    unitId: U.meiji,
    prompt: "{群馬県|ぐんまけん}につくられ、{世界|せかい}{遺産|いさん}にもなった{官営|かんえい}の{製糸場|せいしじょう}を{何|なん}という？",
    explanation:
      "{生糸|きいと}をつくった{官営|かんえい}の{工場|こうじょう}「{富岡製糸場|とみおかせいしじょう}」だよ。",
    format: "choice",
    choices: ["{富岡製糸場|とみおかせいしじょう}", "{八幡製鉄所|やはたせいてつしょ}", "{東大寺|とうだいじ}", "{出島|でじま}"],
    answer: "{富岡製糸場|とみおかせいしじょう}",
  },
  {
    id: `${U.meiji}.q-17`,
    unitId: U.meiji,
    prompt: "{明治|めいじ}{政府|せいふ}が{外国|がいこく}とむすんだ、{日本|にほん}に{不利|ふり}な{条約|じょうやく}を{何|なん}という？",
    explanation:
      "{関税|かんぜい}などで{日本|にほん}に{不利|ふり}だった{条約|じょうやく}を「{不平等条約|ふびょうどうじょうやく}」というよ。{改正|かいせい}に{長|なが}い{年月|ねんげつ}がかかったよ。",
    format: "choice",
    choices: ["{不平等条約|ふびょうどうじょうやく}", "{日米和親条約|にちべいわしんじょうやく}", "{平和条約|へいわじょうやく}", "{三国同盟|さんごくどうめい}"],
    answer: "{不平等条約|ふびょうどうじょうやく}",
  },
  {
    id: `${U.meiji}.q-18`,
    unitId: U.meiji,
    prompt: "{明治|めいじ}{時代|じだい}に{日本|にほん}がたたかった、{中国|ちゅうごく}（{清|しん}）との{戦争|せんそう}を{何|なん}という？",
    explanation:
      "{中国|ちゅうごく}（{清|しん}）とたたかった{戦争|せんそう}を「{日清戦争|にっしんせんそう}」というよ。",
    format: "choice",
    choices: ["{日清戦争|にっしんせんそう}", "{日露戦争|にちろせんそう}", "{元寇|げんこう}", "{応仁|おうにん}の{乱|らん}"],
    answer: "{日清戦争|にっしんせんそう}",
  },
  {
    id: `${U.meiji}.q-19`,
    unitId: U.meiji,
    prompt: "{明治|めいじ}{時代|じだい}に{日本|にほん}がたたかった、ロシアとの{戦争|せんそう}を{何|なん}という？",
    explanation:
      "{大国|たいこく}ロシアとたたかった{戦争|せんそう}を「{日露戦争|にちろせんそう}」というよ。",
    format: "choice",
    choices: ["{日露戦争|にちろせんそう}", "{日清戦争|にっしんせんそう}", "{元寇|げんこう}", "{第二次世界大戦|だいにじせかいたいせん}"],
    answer: "{日露戦争|にちろせんそう}",
  },
  {
    id: `${U.meiji}.q-20`,
    unitId: U.meiji,
    prompt: "{文明開化|ぶんめいかいか}で、{人|ひと}びとのくらしや{町|まち}はどうかわった？",
    explanation:
      "{洋服|ようふく}やランプ・れんがの{建物|たてもの}など、{西洋風|せいようふう}のものがふえたよ。",
    format: "choice",
    choices: ["{洋服|ようふく}やランプがふえた", "みんな{着物|きもの}にもどった", "{電気|でんき}がきえた", "{車|くるま}がなくなった"],
    answer: "{洋服|ようふく}やランプがふえた",
  },
];

// 歴史: 大正・昭和（戦争）
const taishoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.taishoShowa}.q-1`,
    unitId: U.taishoShowa,
    prompt: "1941{年|ねん}から1945{年|ねん}まで{日本|にほん}もたたかった、{世界|せかい}じゅうをまきこんだ{戦争|せんそう}を{何|なん}という？",
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
    prompt: "{日本|にほん}が{戦争|せんそう}にまけて、{戦争|せんそう}がおわったのは{何年|なんねん}？",
    explanation:
      "1945{年|ねん}だよ。8{月|がつ}15{日|にち}に{戦争|せんそう}がおわり、{日本|にほん}は{新|あたら}しい{出発|しゅっぱつ}をすることになったよ。",
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
  {
    id: `${U.taishoShowa}.q-6`,
    unitId: U.taishoShowa,
    prompt: "{第一次|だいいちじ}{世界大戦|せかいたいせん}のあと、{世界|せかい}の{平和|へいわ}のためにつくられた{組織|そしき}を{何|なん}という？",
    explanation:
      "{戦争|せんそう}をふせぐために{各国|かっこく}があつまった「{国際連盟|こくさいれんめい}」だよ。{今|いま}の{国際連合|こくさいれんごう}のもとになったよ。",
    format: "choice",
    choices: ["{国際連盟|こくさいれんめい}", "{国際連合|こくさいれんごう}", "{幕府|ばくふ}", "{朝廷|ちょうてい}"],
    answer: "{国際連盟|こくさいれんめい}",
  },
  {
    id: `${U.taishoShowa}.q-7`,
    unitId: U.taishoShowa,
    prompt: "1923{年|ねん}に{関東|かんとう}{地方|ちほう}をおそった{大|おお}きな{災害|さいがい}を{何|なん}という？",
    explanation:
      "{多|おお}くの{被害|ひがい}を{出|だ}したこの{地震|じしん}を「{関東大震災|かんとうだいしんさい}」というよ。",
    format: "choice",
    choices: ["{関東大震災|かんとうだいしんさい}", "{東日本大震災|ひがしにほんだいしんさい}", "{阪神|はんしん}・{淡路|あわじ}{大震災|だいしんさい}", "{元寇|げんこう}"],
    answer: "{関東大震災|かんとうだいしんさい}",
  },
  {
    id: `${U.taishoShowa}.q-8`,
    unitId: U.taishoShowa,
    prompt: "25さい{以上|いじょう}の{男子|だんし}{全員|ぜんいん}に{選挙権|せんきょけん}があたえられたことを{何|なん}という？",
    explanation:
      "{財産|ざいさん}に{関係|かんけい}なく{男子|だんし}{全員|ぜんいん}にあたえられたので「{普通選挙|ふつうせんきょ}」というよ。",
    format: "choice",
    choices: ["{普通選挙|ふつうせんきょ}", "{鎖国|さこく}", "{文明開化|ぶんめいかいか}", "{検地|けんち}"],
    answer: "{普通選挙|ふつうせんきょ}",
  },
  {
    id: `${U.taishoShowa}.q-9`,
    unitId: U.taishoShowa,
    prompt: "{太平洋戦争|たいへいようせんそう}がはじまるきっかけとなった、1941{年|ねん}の{攻撃|こうげき}は？",
    explanation:
      "ハワイの{真珠湾|しんじゅわん}への{攻撃|こうげき}などをきっかけに{太平洋戦争|たいへいようせんそう}がはじまったよ。",
    format: "choice",
    choices: ["{真珠湾|しんじゅわん}への{攻撃|こうげき}", "{黒船|くろふね}{来航|らいこう}", "{元寇|げんこう}", "{関|せき}ヶ{原|はら}の{戦|たたか}い"],
    answer: "{真珠湾|しんじゅわん}への{攻撃|こうげき}",
  },
  {
    id: `${U.taishoShowa}.q-10`,
    unitId: U.taishoShowa,
    prompt: "{戦争|せんそう}{中|ちゅう}、{食|た}べものや{物|もの}が{足|た}りず、{決|き}められた{量|りょう}だけ{配|くば}られた{制度|せいど}を{何|なん}という？",
    explanation:
      "{物|もの}が{不足|ふそく}し、{決|き}められた{量|りょう}を{配|くば}る「{配給|はいきゅう}」が{行|おこな}われたよ。",
    format: "choice",
    choices: ["{配給|はいきゅう}", "バーゲン", "{参勤交代|さんきんこうたい}", "{鎖国|さこく}"],
    answer: "{配給|はいきゅう}",
  },
  {
    id: `${U.taishoShowa}.q-11`,
    unitId: U.taishoShowa,
    prompt: "{戦争|せんそう}がはげしくなり、{中学生|ちゅうがくせい}らも{工場|こうじょう}などで{働|はたら}かされたことを{何|なん}という？",
    explanation:
      "{大人|おとな}が{戦争|せんそう}にいったため、{学生|がくせい}も{働|はたら}かされた「{勤労動員|きんろうどういん}」だよ。",
    format: "choice",
    choices: ["{勤労動員|きんろうどういん}", "{遠足|えんそく}", "{修学旅行|しゅうがくりょこう}", "{運動会|うんどうかい}"],
    answer: "{勤労動員|きんろうどういん}",
  },
  {
    id: `${U.taishoShowa}.q-12`,
    unitId: U.taishoShowa,
    prompt: "1945{年|ねん}、{地上戦|ちじょうせん}が{行|おこな}われ{多|おお}くの{住民|じゅうみん}が{犠牲|ぎせい}になった{県|けん}は？",
    explanation:
      "はげしい{地上戦|ちじょうせん}で{多|おお}くの{命|いのち}がうばわれたのは「{沖縄県|おきなわけん}」だよ。",
    format: "choice",
    choices: ["{沖縄県|おきなわけん}", "{北海道|ほっかいどう}", "{東京都|とうきょうと}", "{青森県|あおもりけん}"],
    answer: "{沖縄県|おきなわけん}",
  },
  {
    id: `${U.taishoShowa}.q-13`,
    unitId: U.taishoShowa,
    prompt: "{広島|ひろしま}に{原子|げんし}ばくだんがおとされた{日|ひ}は？",
    explanation:
      "1945{年|ねん}8{月|がつ}6{日|か}、{広島|ひろしま}に{原子|げんし}ばくだんがおとされたよ。",
    format: "choice",
    choices: ["8{月|がつ}6{日|か}", "8{月|がつ}9{日|か}", "8{月|がつ}15{日|にち}", "12{月|がつ}8{日|か}"],
    answer: "8{月|がつ}6{日|か}",
  },
  {
    id: `${U.taishoShowa}.q-14`,
    unitId: U.taishoShowa,
    prompt: "{長崎|ながさき}に{原子|げんし}ばくだんがおとされた{日|ひ}は？",
    explanation:
      "1945{年|ねん}8{月|がつ}9{日|か}、{長崎|ながさき}に{原子|げんし}ばくだんがおとされたよ。",
    format: "choice",
    choices: ["8{月|がつ}9{日|か}", "8{月|がつ}6{日|か}", "8{月|がつ}15{日|にち}", "1{月|がつ}1{日|にち}"],
    answer: "8{月|がつ}9{日|か}",
  },
  {
    id: `${U.taishoShowa}.q-15`,
    unitId: U.taishoShowa,
    prompt: "{戦争|せんそう}がおわったことが{国民|こくみん}につたえられた{日|ひ}は？",
    explanation:
      "1945{年|ねん}8{月|がつ}15{日|にち}に{戦争|せんそう}がおわったことがつたえられたよ。",
    format: "choice",
    choices: ["8{月|がつ}15{日|にち}", "8{月|がつ}6{日|か}", "8{月|がつ}9{日|か}", "11{月|がつ}3{日|か}"],
    answer: "8{月|がつ}15{日|にち}",
  },
  {
    id: `${U.taishoShowa}.q-16`,
    unitId: U.taishoShowa,
    prompt: "{戦争|せんそう}{中|ちゅう}、{都市|とし}が{空|そら}から{爆撃|ばくげき}されたことを{何|なん}という？",
    explanation:
      "{飛行機|ひこうき}から{爆弾|ばくだん}をおとされて{町|まち}がやかれたことを「{空襲|くうしゅう}」というよ。",
    format: "choice",
    choices: ["{空襲|くうしゅう}", "{津波|つなみ}", "{地震|じしん}", "ふん{火|か}"],
    answer: "{空襲|くうしゅう}",
  },
  {
    id: `${U.taishoShowa}.q-17`,
    unitId: U.taishoShowa,
    prompt: "{日本|にほん}が{降伏|こうふく}を{受|う}け{入|い}れた{宣言|せんげん}を{何|なん}という？",
    explanation:
      "{日本|にほん}が{受|う}け{入|い}れて{戦争|せんそう}がおわるもとになった「ポツダム{宣言|せんげん}」だよ。",
    format: "choice",
    choices: ["ポツダム{宣言|せんげん}", "{独立|どくりつ}{宣言|せんげん}", "{五箇条|ごかじょう}の{御誓文|ごせいもん}", "{解体新書|かいたいしんしょ}"],
    answer: "ポツダム{宣言|せんげん}",
  },
  {
    id: `${U.taishoShowa}.q-18`,
    unitId: U.taishoShowa,
    prompt: "{戦争|せんそう}で{多|おお}くの{命|いのち}がうしなわれた{教訓|きょうくん}から、わたしたちが{大切|たいせつ}にすべきことは？",
    explanation:
      "{二度|にど}と{戦争|せんそう}をしないという「{平和|へいわ}」を{大切|たいせつ}にしようね。",
    format: "choice",
    choices: ["{平和|へいわ}", "{戦争|せんそう}", "{武器|ぶき}", "あらそい"],
    answer: "{平和|へいわ}",
  },
  {
    id: `${U.taishoShowa}.q-19`,
    unitId: U.taishoShowa,
    prompt: "{大正|たいしょう}{時代|じだい}にふきゅうしはじめた、{新|あたら}しいものの{例|れい}はどれ？",
    explanation:
      "{大正|たいしょう}{時代|じだい}にはラジオや{電車|でんしゃ}・{洋風|ようふう}の{生活|せいかつ}が{広|ひろ}まりはじめたよ。",
    format: "choice",
    choices: ["ラジオや{電車|でんしゃ}", "スマートフォン", "{新幹線|しんかんせん}", "インターネット"],
    answer: "ラジオや{電車|でんしゃ}",
  },
  {
    id: `${U.taishoShowa}.q-20`,
    unitId: U.taishoShowa,
    prompt: "{戦争|せんそう}{中|ちゅう}、{子|こ}どもたちが{都市|とし}から{地方|ちほう}へ{集団|しゅうだん}でうつったことを{何|なん}という？",
    explanation:
      "{空襲|くうしゅう}をさけて{子|こ}どもが{地方|ちほう}へうつったことを「{集団疎開|しゅうだんそかい}（{学童疎開|がくどうそかい}）」というよ。",
    format: "choice",
    choices: ["{集団疎開|しゅうだんそかい}", "{修学旅行|しゅうがくりょこう}", "{参勤交代|さんきんこうたい}", "{文明開化|ぶんめいかいか}"],
    answer: "{集団疎開|しゅうだんそかい}",
  },
];

// 歴史: 現代
const gendaiQuestions: ChoiceQuestion[] = [
  {
    id: `${U.gendai}.q-1`,
    unitId: U.gendai,
    prompt: "1946{年|ねん}に{公布|こうふ}された、{今|いま}の{日本|にほん}のもとになっている{憲法|けんぽう}は{何|なん}？",
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
    prompt: "{戦後|せんご}、{日本|にほん}の{経済|けいざい}が{急|きゅう}に{大|おお}きく{成長|せいちょう}したことを{何|なん}という？",
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
    prompt: "{今|いま}の{日本国憲法|にほんこくけんぽう}で、{戦争|せんそう}についてどう{決|き}められている？",
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
    prompt: "{戦後|せんご}の{日本|にほん}で、{女|おんな}の{人|ひと}についてかわった{大切|たいせつ}なことは{何|なん}？",
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
  {
    id: `${U.gendai}.q-6`,
    unitId: U.gendai,
    prompt: "{日本国憲法|にほんこくけんぽう}が{公布|こうふ}された{年|とし}は？",
    explanation:
      "{日本国憲法|にほんこくけんぽう}は1946{年|ねん}に{公布|こうふ}されたよ。",
    format: "choice",
    choices: ["1946{年|ねん}", "1853{年|ねん}", "1192{年|ねん}", "2000{年|ねん}"],
    answer: "1946{年|ねん}",
  },
  {
    id: `${U.gendai}.q-7`,
    unitId: U.gendai,
    prompt: "{日本国憲法|にほんこくけんぽう}が{使|つか}われはじめた（{施行|しこう}された）{年|とし}は？",
    explanation:
      "{公布|こうふ}のよく{年|とし}、1947{年|ねん}から{日本国憲法|にほんこくけんぽう}が{使|つか}われはじめたよ。",
    format: "choice",
    choices: ["1947{年|ねん}", "1945{年|ねん}", "1603{年|ねん}", "1989{年|ねん}"],
    answer: "1947{年|ねん}",
  },
  {
    id: `${U.gendai}.q-8`,
    unitId: U.gendai,
    prompt: "{戦後|せんご}、{土地|とち}を{地主|じぬし}から{小作人|こさくにん}に{分|わ}けあたえた{改革|かいかく}を{何|なん}という？",
    explanation:
      "{多|おお}くの{農家|のうか}が{自分|じぶん}の{土地|とち}をもてるようになった「{農地改革|のうちかいかく}」だよ。",
    format: "choice",
    choices: ["{農地改革|のうちかいかく}", "{地租改正|ちそかいせい}", "{刀狩|かたながり}", "{検地|けんち}"],
    answer: "{農地改革|のうちかいかく}",
  },
  {
    id: `${U.gendai}.q-9`,
    unitId: U.gendai,
    prompt: "1951{年|ねん}、{日本|にほん}が{独立|どくりつ}を{回復|かいふく}した{条約|じょうやく}を{何|なん}という？",
    explanation:
      "{多|おお}くの{国|くに}とむすび{独立|どくりつ}を{回復|かいふく}した「サンフランシスコ{平和条約|へいわじょうやく}」だよ。",
    format: "choice",
    choices: ["サンフランシスコ{平和条約|へいわじょうやく}", "{日米和親条約|にちべいわしんじょうやく}", "ポツダム{宣言|せんげん}", "{大日本帝国憲法|だいにっぽんていこくけんぽう}"],
    answer: "サンフランシスコ{平和条約|へいわじょうやく}",
  },
  {
    id: `${U.gendai}.q-10`,
    unitId: U.gendai,
    prompt: "1956{年|ねん}、{日本|にほん}が{加盟|かめい}をみとめられた{世界|せかい}の{組織|そしき}は？",
    explanation:
      "1956{年|ねん}、{日本|にほん}は「{国際連合|こくさいれんごう}」への{加盟|かめい}をみとめられたよ。",
    format: "choice",
    choices: ["{国際連合|こくさいれんごう}", "{国際連盟|こくさいれんめい}", "{幕府|ばくふ}", "{朝廷|ちょうてい}"],
    answer: "{国際連合|こくさいれんごう}",
  },
  {
    id: `${U.gendai}.q-11`,
    unitId: U.gendai,
    prompt: "{高度経済成長|こうどけいざいせいちょう}のころ、{家庭|かてい}に{広|ひろ}まった{電化製品|でんかせいひん}の{例|れい}は？",
    explanation:
      "テレビ・{冷蔵庫|れいぞうこ}・{洗濯機|せんたくき}などがあこがれの{品|しな}として{広|ひろ}まったよ。",
    format: "choice",
    choices: ["テレビ・{冷蔵庫|れいぞうこ}・{洗濯機|せんたくき}", "{自動車|じどうしゃ}・{船|ふね}・{飛行機|ひこうき}", "{刀|かたな}・{弓|ゆみ}・{鉄砲|てっぽう}", "スマホ・パソコン・タブレット"],
    answer: "テレビ・{冷蔵庫|れいぞうこ}・{洗濯機|せんたくき}",
  },
  {
    id: `${U.gendai}.q-12`,
    unitId: U.gendai,
    prompt: "1964{年|ねん}に{東京|とうきょう}と{新大阪|しんおおさか}の{間|あいだ}に{開通|かいつう}した{鉄道|てつどう}を{何|なん}という？",
    explanation:
      "{東京|とうきょう}オリンピックにあわせて{開通|かいつう}した「{東海道新幹線|とうかいどうしんかんせん}」だよ。",
    format: "choice",
    choices: ["{東海道新幹線|とうかいどうしんかんせん}", "リニア", "{地下鉄|ちかてつ}", "{路面電車|ろめんでんしゃ}"],
    answer: "{東海道新幹線|とうかいどうしんかんせん}",
  },
  {
    id: `${U.gendai}.q-13`,
    unitId: U.gendai,
    prompt: "{高度経済成長|こうどけいざいせいちょう}の{一方|いっぽう}で、ふかこくになった{問題|もんだい}は？",
    explanation:
      "{工場|こうじょう}のけむりや{排水|はいすい}などによる「{公害|こうがい}（{環境問題|かんきょうもんだい}）」がふかこくになったよ。",
    format: "choice",
    choices: ["{公害|こうがい}（{環境問題|かんきょうもんだい}）", "{鎖国|さこく}", "{元寇|げんこう}", "{文明開化|ぶんめいかいか}"],
    answer: "{公害|こうがい}（{環境問題|かんきょうもんだい}）",
  },
  {
    id: `${U.gendai}.q-14`,
    unitId: U.gendai,
    prompt: "1972{年|ねん}に{日本|にほん}に{返還|へんかん}された{県|けん}は？",
    explanation:
      "{戦後|せんご}アメリカにおさめられていた「{沖縄県|おきなわけん}」が1972{年|ねん}に{日本|にほん}へ{返還|へんかん}されたよ。",
    format: "choice",
    choices: ["{沖縄県|おきなわけん}", "{北海道|ほっかいどう}", "{東京都|とうきょうと}", "{長崎県|ながさきけん}"],
    answer: "{沖縄県|おきなわけん}",
  },
  {
    id: `${U.gendai}.q-15`,
    unitId: U.gendai,
    prompt: "{戦後|せんご}、{女性|じょせい}にみとめられた{大切|たいせつ}な{権利|けんり}は？",
    explanation:
      "{女性|じょせい}も{選挙|せんきょ}でとうひょうできる「{選挙権|せんきょけん}」がみとめられたよ。",
    format: "choice",
    choices: ["{選挙権|せんきょけん}", "{鎖国|さこく}の{権利|けんり}", "{武士|ぶし}になる{権利|けんり}", "なにもない"],
    answer: "{選挙権|せんきょけん}",
  },
  {
    id: `${U.gendai}.q-16`,
    unitId: U.gendai,
    prompt: "{今|いま}の{日本|にほん}がかかえる、{子|こ}どもがへり{高齢者|こうれいしゃ}がふえる{問題|もんだい}を{何|なん}という？",
    explanation:
      "{子|こ}どもの{数|かず}がへり、お{年寄|としよ}りがふえることを「{少子高齢化|しょうしこうれいか}」というよ。",
    format: "choice",
    choices: ["{少子高齢化|しょうしこうれいか}", "{高度経済成長|こうどけいざいせいちょう}", "{文明開化|ぶんめいかいか}", "{鎖国|さこく}"],
    answer: "{少子高齢化|しょうしこうれいか}",
  },
  {
    id: `${U.gendai}.q-17`,
    unitId: U.gendai,
    prompt: "2011{年|ねん}に{東北|とうほく}{地方|ちほう}を{中心|ちゅうしん}におそった{大|おお}きな{災害|さいがい}を{何|なん}という？",
    explanation:
      "{大|おお}きな{地震|じしん}と{津波|つなみ}による「{東日本大震災|ひがしにほんだいしんさい}」だよ。",
    format: "choice",
    choices: ["{東日本大震災|ひがしにほんだいしんさい}", "{関東大震災|かんとうだいしんさい}", "{元寇|げんこう}", "ふん{火|か}"],
    answer: "{東日本大震災|ひがしにほんだいしんさい}",
  },
  {
    id: `${U.gendai}.q-18`,
    unitId: U.gendai,
    prompt: "{戦後|せんご}の{日本|にほん}が、{外国|がいこく}とあらそわずまもりつづけてきた{方針|ほうしん}は？",
    explanation:
      "{憲法|けんぽう}にもとづき、{戦争|せんそう}をしない「{平和主義|へいわしゅぎ}」をまもりつづけてきたよ。",
    format: "choice",
    choices: ["{平和主義|へいわしゅぎ}", "{富国強兵|ふこくきょうへい}", "{鎖国|さこく}", "{下剋上|げこくじょう}"],
    answer: "{平和主義|へいわしゅぎ}",
  },
  {
    id: `${U.gendai}.q-19`,
    unitId: U.gendai,
    prompt: "{情報|じょうほう}や{通信|つうしん}が{発達|はったつ}した{今|いま}の{社会|しゃかい}を{何|なん}という？",
    explanation:
      "コンピューターやインターネットが{発達|はったつ}した{社会|しゃかい}を「{情報社会|じょうほうしゃかい}」というよ。",
    format: "choice",
    choices: ["{情報社会|じょうほうしゃかい}", "{縄文|じょうもん}{社会|しゃかい}", "{戦国|せんごく}{社会|しゃかい}", "{鎖国|さこく}{社会|しゃかい}"],
    answer: "{情報社会|じょうほうしゃかい}",
  },
  {
    id: `${U.gendai}.q-20`,
    unitId: U.gendai,
    prompt: "これからの{日本|にほん}で{大切|たいせつ}にしたいことは？",
    explanation:
      "{平和|へいわ}をまもり、{世界|せかい}と{協力|きょうりょく}し、{環境|かんきょう}を{守|まも}ることが{大切|たいせつ}だよ。",
    format: "choice",
    choices: ["{平和|へいわ}と{国際協力|こくさいきょうりょく}", "{戦争|せんそう}をふやすこと", "{鎖国|さこく}", "{公害|こうがい}をふやすこと"],
    answer: "{平和|へいわ}と{国際協力|こくさいきょうりょく}",
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
  {
    id: `${U.unitedNations}.q-6`,
    unitId: U.unitedNations,
    prompt: "{国際連合|こくさいれんごう}の{本部|ほんぶ}があるのは、どこの{都市|とし}？",
    explanation:
      "{国連|こくれん}の{本部|ほんぶ}はアメリカのニューヨークにあるよ。",
    format: "choice",
    choices: ["ニューヨーク", "{東京|とうきょう}", "パリ", "ロンドン"],
    answer: "ニューヨーク",
  },
  {
    id: `${U.unitedNations}.q-7`,
    unitId: U.unitedNations,
    prompt: "{国際連合|こくさいれんごう}がつくられた、おもな{目的|もくてき}は？",
    explanation:
      "{二度|にど}と{戦争|せんそう}をくりかえさないよう、{世界|せかい}の{平和|へいわ}と{安全|あんぜん}をまもるためにつくられたよ。",
    format: "choice",
    choices: ["{世界|せかい}の{平和|へいわ}をまもる", "{戦争|せんそう}を{広|ひろ}げる", "お{金|かね}もうけ", "{鎖国|さこく}"],
    answer: "{世界|せかい}の{平和|へいわ}をまもる",
  },
  {
    id: `${U.unitedNations}.q-8`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}の{国|くに}ぐにの{代表|だいひょう}があつまって{話|はな}しあう、{国連|こくれん}の{中心|ちゅうしん}の{会議|かいぎ}を{何|なん}という？",
    explanation:
      "すべての{加盟国|かめいこく}があつまる{会議|かいぎ}を「{総会|そうかい}」というよ。",
    format: "choice",
    choices: ["{総会|そうかい}", "{国会|こっかい}", "{幕府|ばくふ}", "{朝廷|ちょうてい}"],
    answer: "{総会|そうかい}",
  },
  {
    id: `${U.unitedNations}.q-9`,
    unitId: U.unitedNations,
    prompt: "{戦争|せんそう}やあらそいをとめるための{話|はな}しあいをする、{国連|こくれん}の{重要|じゅうよう}な{会議|かいぎ}を{何|なん}という？",
    explanation:
      "{平和|へいわ}と{安全|あんぜん}をまもる{役目|やくめ}をもつ「{安全保障理事会|あんぜんほしょうりじかい}」だよ。",
    format: "choice",
    choices: ["{安全保障理事会|あんぜんほしょうりじかい}", "{学級会|がっきゅうかい}", "{株主総会|かぶぬしそうかい}", "{町内会|ちょうないかい}"],
    answer: "{安全保障理事会|あんぜんほしょうりじかい}",
  },
  {
    id: `${U.unitedNations}.q-10`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}の{人|ひと}びとの{健康|けんこう}をまもる{国連|こくれん}の{機関|きかん}を{何|なん}という？",
    explanation:
      "{世界|せかい}の{健康|けんこう}をまもる{機関|きかん}を「WHO（{世界保健機関|せかいほけんきかん}）」というよ。",
    format: "choice",
    choices: ["WHO", "ユニセフ", "ユネスコ", "NASA"],
    answer: "WHO",
  },
  {
    id: `${U.unitedNations}.q-11`,
    unitId: U.unitedNations,
    prompt: "{戦争|せんそう}で{国|くに}をおわれた{人|ひと}（{難民|なんみん}）に{対|たい}して、{国連|こくれん}は{何|なに}をする？",
    explanation:
      "{国連|こくれん}は{難民|なんみん}を{保護|ほご}して、{安全|あんぜん}にくらせるようにたすけているよ。",
    format: "choice",
    choices: ["{保護|ほご}してたすける", "おいかえす", "むしする", "わらう"],
    answer: "{保護|ほご}してたすける",
  },
  {
    id: `${U.unitedNations}.q-12`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}の{子|こ}どもにワクチンや{教育|きょういく}をとどける{国連|こくれん}の{機関|きかん}は？",
    explanation:
      "{世界|せかい}の{子|こ}どもをたすける{機関|きかん}を「ユニセフ」というよ。",
    format: "choice",
    choices: ["ユニセフ", "ユネスコ", "WHO", "NGO"],
    answer: "ユニセフ",
  },
  {
    id: `${U.unitedNations}.q-13`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}{遺産|いさん}を{決|き}めて{文化|ぶんか}や{自然|しぜん}をまもる{機関|きかん}を{何|なん}という？",
    explanation:
      "{文化|ぶんか}や{教育|きょういく}・{世界|せかい}{遺産|いさん}をまもる{機関|きかん}を「ユネスコ」というよ。",
    format: "choice",
    choices: ["ユネスコ", "ユニセフ", "WHO", "NASA"],
    answer: "ユネスコ",
  },
  {
    id: `${U.unitedNations}.q-14`,
    unitId: U.unitedNations,
    prompt: "SDGsは{何年|なんねん}までの{達成|たっせい}をめざす{目標|もくひょう}？",
    explanation:
      "SDGsは2030{年|ねん}までの{達成|たっせい}をめざす、{世界|せかい}{共通|きょうつう}の{目標|もくひょう}だよ。",
    format: "choice",
    choices: ["2030{年|ねん}", "2000{年|ねん}", "1945{年|ねん}", "2100{年|ねん}"],
    answer: "2030{年|ねん}",
  },
  {
    id: `${U.unitedNations}.q-15`,
    unitId: U.unitedNations,
    prompt: "SDGsの{目標|もくひょう}の{数|かず}はいくつ？",
    explanation:
      "SDGsには{貧困|ひんこん}や{環境|かんきょう}など、17の{目標|もくひょう}があるよ。",
    format: "choice",
    choices: ["17", "5", "100", "3"],
    answer: "17",
  },
  {
    id: `${U.unitedNations}.q-16`,
    unitId: U.unitedNations,
    prompt: "あらそいのおきた{地域|ちいき}へ{派遣|はけん}される、{国連|こくれん}の{平和|へいわ}をまもる{活動|かつどう}を{何|なん}という？",
    explanation:
      "{停戦|ていせん}の{見|み}まもりなどをする{活動|かつどう}を「{平和維持活動|へいわいじかつどう}（PKO）」というよ。",
    format: "choice",
    choices: ["{平和維持活動|へいわいじかつどう}", "{参勤交代|さんきんこうたい}", "{鎖国|さこく}", "{元寇|げんこう}"],
    answer: "{平和維持活動|へいわいじかつどう}",
  },
  {
    id: `${U.unitedNations}.q-17`,
    unitId: U.unitedNations,
    prompt: "{日本|にほん}も{国連|こくれん}にお{金|かね}や{人|ひと}を{出|だ}して{協力|きょうりょく}している。これは{何|なん}のため？",
    explanation:
      "{世界|せかい}の{平和|へいわ}と{発展|はってん}のために{協力|きょうりょく}しているよ。",
    format: "choice",
    choices: ["{世界|せかい}の{平和|へいわ}のため", "{戦争|せんそう}のため", "{自分|じぶん}だけのため", "{鎖国|さこく}のため"],
    answer: "{世界|せかい}の{平和|へいわ}のため",
  },
  {
    id: `${U.unitedNations}.q-18`,
    unitId: U.unitedNations,
    prompt: "{国連|こくれん}は{第二次世界大戦|だいにじせかいたいせん}のあと、{何年|なんねん}につくられた？",
    explanation:
      "{国際連合|こくさいれんごう}は1945{年|ねん}につくられたよ。",
    format: "choice",
    choices: ["1945{年|ねん}", "1603{年|ねん}", "1192{年|ねん}", "2020{年|ねん}"],
    answer: "1945{年|ねん}",
  },
  {
    id: `${U.unitedNations}.q-19`,
    unitId: U.unitedNations,
    prompt: "{世界|せかい}の{多|おお}くの{国|くに}が{加盟|かめい}している{国連|こくれん}の{加盟国|かめいこく}は、およそ{何|なん}か{国|こく}？",
    explanation:
      "{国連|こくれん}には{今|いま}、{世界|せかい}のおよそ190か{国|こく}が{加盟|かめい}しているよ。",
    format: "choice",
    choices: ["{約|やく}190か{国|こく}", "{約|やく}5か{国|こく}", "{約|やく}20か{国|こく}", "{約|やく}1000か{国|こく}"],
    answer: "{約|やく}190か{国|こく}",
  },
  {
    id: `${U.unitedNations}.q-20`,
    unitId: U.unitedNations,
    prompt: "{国連|こくれん}が{大切|たいせつ}にしている、あらそいを{解決|かいけつ}する{基本|きほん}の{方法|ほうほう}は？",
    explanation:
      "{力|ちから}ではなく「{話|はな}しあい」であらそいを{解決|かいけつ}することを{大切|たいせつ}にしているよ。",
    format: "choice",
    choices: ["{話|はな}しあい", "{戦争|せんそう}", "むし", "{力|ちから}ずく"],
    answer: "{話|はな}しあい",
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
    prompt: "{日本|にほん}の{青年|せいねん}が{外国|がいこく}へいって{技術|ぎじゅつ}をおしえる、JICAの{活動|かつどう}を{何|なん}という？",
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
  {
    id: `${U.internationalCooperation}.q-6`,
    unitId: U.internationalCooperation,
    prompt: "{政府|せいふ}が{外国|がいこく}をたすけるために{行|おこな}う、お{金|かね}や{技術|ぎじゅつ}の{援助|えんじょ}を{何|なん}という？",
    explanation:
      "{国|くに}（{政府|せいふ}）が{発展|はってん}{途上国|とじょうこく}をたすける{援助|えんじょ}を「ODA（{政府開発援助|せいふかいはつえんじょ}）」というよ。",
    format: "choice",
    choices: ["ODA", "NGO", "GDP", "ATM"],
    answer: "ODA",
  },
  {
    id: `${U.internationalCooperation}.q-7`,
    unitId: U.internationalCooperation,
    prompt: "{日本|にほん}のODAやボランティアの{派遣|はけん}を{行|おこな}う{政府|せいふ}の{機関|きかん}を{何|なん}という？",
    explanation:
      "{国際協力|こくさいきょうりょく}をすすめる{日本|にほん}の{機関|きかん}を「JICA（ジャイカ）」というよ。",
    format: "choice",
    choices: ["JICA", "NASA", "WHO", "NHK"],
    answer: "JICA",
  },
  {
    id: `${U.internationalCooperation}.q-8`,
    unitId: U.internationalCooperation,
    prompt: "{青年海外協力隊|せいねんかいがいきょうりょくたい}の{人|ひと}たちは、{外国|がいこく}で{何|なに}をする？",
    explanation:
      "{農業|のうぎょう}やスポーツ・{勉強|べんきょう}などの{技術|ぎじゅつ}をおしえて{現地|げんち}の{人|ひと}をたすけるよ。",
    format: "choice",
    choices: ["{技術|ぎじゅつ}や{勉強|べんきょう}をおしえる", "{戦争|せんそう}をする", "{観光|かんこう}だけ", "なにもしない"],
    answer: "{技術|ぎじゅつ}や{勉強|べんきょう}をおしえる",
  },
  {
    id: `${U.internationalCooperation}.q-9`,
    unitId: U.internationalCooperation,
    prompt: "{地球温暖化|ちきゅうおんだんか}のおもな{原因|げんいん}とされる{気体|きたい}は？",
    explanation:
      "{二酸化炭素|にさんかたんそ}（CO2）がふえることが、おもな{原因|げんいん}とされているよ。",
    format: "choice",
    choices: ["{二酸化炭素|にさんかたんそ}", "{酸素|さんそ}", "ちっ{素|そ}", "{水|みず}"],
    answer: "{二酸化炭素|にさんかたんそ}",
  },
  {
    id: `${U.internationalCooperation}.q-10`,
    unitId: U.internationalCooperation,
    prompt: "{地球温暖化|ちきゅうおんだんか}をふせぐため、{世界|せかい}の{国|くに}ぐにが{協力|きょうりょく}してむすんだやくそくを{何|なん}という？",
    explanation:
      "{世界|せかい}{共通|きょうつう}の{目標|もくひょう}をきめたやくそくを「パリ{協定|きょうてい}」というよ。",
    format: "choice",
    choices: ["パリ{協定|きょうてい}", "{日米和親条約|にちべいわしんじょうやく}", "ポツダム{宣言|せんげん}", "{御成敗式目|ごせいばいしきもく}"],
    answer: "パリ{協定|きょうてい}",
  },
  {
    id: `${U.internationalCooperation}.q-11`,
    unitId: U.internationalCooperation,
    prompt: "{戦争|せんそう}やはくがいで{自分|じぶん}の{国|くに}をおわれた{人|ひと}びとを{何|なん}という？",
    explanation:
      "{自分|じぶん}の{国|くに}にいられなくなった{人|ひと}びとを「{難民|なんみん}」というよ。",
    format: "choice",
    choices: ["{難民|なんみん}", "{観光客|かんこうきゃく}", "{武士|ぶし}", "{大名|だいみょう}"],
    answer: "{難民|なんみん}",
  },
  {
    id: `${U.internationalCooperation}.q-12`,
    unitId: U.internationalCooperation,
    prompt: "{限|かぎ}りある{資源|しげん}を{大切|たいせつ}にし、ごみをへらす{取|と}り{組|く}みのキーワードは？",
    explanation:
      "へらす・くりかえし{使|つか}う・{資源|しげん}にもどす、の3つを「3R（スリーアール）」というよ。",
    format: "choice",
    choices: ["3R（スリーアール）", "{富国強兵|ふこくきょうへい}", "{鎖国|さこく}", "{下剋上|げこくじょう}"],
    answer: "3R（スリーアール）",
  },
  {
    id: `${U.internationalCooperation}.q-13`,
    unitId: U.internationalCooperation,
    prompt: "{政府|せいふ}ではなく、{民間|みんかん}の{人|ひと}たちが{世界|せかい}のために{活動|かつどう}する{団体|だんたい}を{何|なん}という？",
    explanation:
      "{民間|みんかん}の{団体|だんたい}を「NGO（{非政府|ひせいふ}{組織|そしき}）」というよ。",
    format: "choice",
    choices: ["NGO", "{幕府|ばくふ}", "{朝廷|ちょうてい}", "{国会|こっかい}"],
    answer: "NGO",
  },
  {
    id: `${U.internationalCooperation}.q-14`,
    unitId: U.internationalCooperation,
    prompt: "{発展|はってん}{途上国|とじょうこく}の{人|ひと}がつくったものを、{公正|こうせい}なねだんで{買|か}う{取|と}り{組|く}みを{何|なん}という？",
    explanation:
      "つくった{人|ひと}に{正|ただ}しい{利益|りえき}がとどくよう、{公正|こうせい}に{取引|とりひき}することを「フェアトレード」というよ。",
    format: "choice",
    choices: ["フェアトレード", "{鎖国|さこく}", "{参勤交代|さんきんこうたい}", "{元寇|げんこう}"],
    answer: "フェアトレード",
  },
  {
    id: `${U.internationalCooperation}.q-15`,
    unitId: U.internationalCooperation,
    prompt: "{世界|せかい}にはきれいな{水|みず}や{食|た}べものが{足|た}りない{地域|ちいき}がある。これをたすける{活動|かつどう}は？",
    explanation:
      "{井戸|いど}や{水道|すいどう}・{食料|しょくりょう}をとどけるなど、{生活|せいかつ}をささえる{支援|しえん}が{行|おこな}われているよ。",
    format: "choice",
    choices: ["{水|みず}や{食料|しょくりょう}の{支援|しえん}", "{武器|ぶき}をおくる", "むしする", "{旅行|りょこう}する"],
    answer: "{水|みず}や{食料|しょくりょう}の{支援|しえん}",
  },
  {
    id: `${U.internationalCooperation}.q-16`,
    unitId: U.internationalCooperation,
    prompt: "{日本|にほん}が{国際協力|こくさいきょうりょく}で{大切|たいせつ}にしている、{戦争|せんそう}をしない{立場|たちば}を{何|なん}という？",
    explanation:
      "{憲法|けんぽう}にもとづく「{平和主義|へいわしゅぎ}」を{大切|たいせつ}にして{協力|きょうりょく}しているよ。",
    format: "choice",
    choices: ["{平和主義|へいわしゅぎ}", "{富国強兵|ふこくきょうへい}", "{鎖国|さこく}", "{下剋上|げこくじょう}"],
    answer: "{平和主義|へいわしゅぎ}",
  },
  {
    id: `${U.internationalCooperation}.q-17`,
    unitId: U.internationalCooperation,
    prompt: "ちがう{文化|ぶんか}をもつ{人|ひと}びとが、たがいにみとめあってくらす{社会|しゃかい}を{何|なん}という？",
    explanation:
      "ちがいをみとめあってともにくらす{社会|しゃかい}を「{多文化共生|たぶんかきょうせい}」というよ。",
    format: "choice",
    choices: ["{多文化共生|たぶんかきょうせい}", "{鎖国|さこく}{社会|しゃかい}", "{身分|みぶん}{社会|しゃかい}", "{戦国|せんごく}{社会|しゃかい}"],
    answer: "{多文化共生|たぶんかきょうせい}",
  },
  {
    id: `${U.internationalCooperation}.q-18`,
    unitId: U.internationalCooperation,
    prompt: "{世界|せかい}の{人|ひと}びとが{協力|きょうりょく}して{達成|たっせい}をめざす17の{目標|もくひょう}を{何|なん}という？",
    explanation:
      "{持続可能|じぞくかのう}なよりよい{世界|せかい}をめざす17の{目標|もくひょう}を「SDGs」というよ。",
    format: "choice",
    choices: ["SDGs", "GDP", "ODA", "ATM"],
    answer: "SDGs",
  },
  {
    id: `${U.internationalCooperation}.q-19`,
    unitId: U.internationalCooperation,
    prompt: "{国境|こっきょう}をこえて{医療|いりょう}を{行|おこな}うNGOの{活動|かつどう}の{例|れい}は？",
    explanation:
      "びょうきやけがの{人|ひと}を、{国|くに}のちがいをこえてたすける{活動|かつどう}があるよ。",
    format: "choice",
    choices: ["びょうきの{人|ひと}の{治療|ちりょう}をたすける", "{戦争|せんそう}を{売|う}る", "{観光|かんこう}{案内|あんない}", "お{金|かね}もうけ"],
    answer: "びょうきの{人|ひと}の{治療|ちりょう}をたすける",
  },
  {
    id: `${U.internationalCooperation}.q-20`,
    unitId: U.internationalCooperation,
    prompt: "これからの{世界|せかい}で、わたしたち{一人|ひとり}ひとりにできることは？",
    explanation:
      "{世界|せかい}のことを{知|し}り、できる{協力|きょうりょく}やおもいやりをもつことが{大切|たいせつ}だよ。",
    format: "choice",
    choices: ["{世界|せかい}を{知|し}り{協力|きょうりょく}する", "むしする", "あらそう", "なにも{考|かんが}えない"],
    answer: "{世界|せかい}を{知|し}り{協力|きょうりょく}する",
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
          body: "{憲法|けんぽう}は{国|くに}のいちばん{大切|たいせつ}な「{約束|やくそく}」だよ。クラスのルールよりずっと{大|おお}きくて、{国|くに}じゅうのきまり（{法律|ほうりつ}）はぜんぶ{憲法|けんぽう}にあわせてつくるんだ。だから{憲法|けんぽう}は「ルールのおおもと」なんだよ。",
          visual: { kind: "emoji", value: "📜", caption: "くにのいちばんのルール" },
        },
        {
          heading: "3つの{大切|たいせつ}な{柱|はしら}",
          body: "{日本国憲法|にほんこくけんぽう}には3つの{柱|はしら}があるよ。①{国|くに}のことはみんなで{決|き}める「{国民主権|こくみんしゅけん}」、②だれもが{大切|たいせつ}にされる「{基本的人権|きほんてきじんけん}の{尊重|そんちょう}」、③{戦争|せんそう}をしない「{平和主義|へいわしゅぎ}」だよ。",
          visual: { kind: "anim", name: "count-up", params: { to: 3, emoji: "🏛️" }, caption: "3つのはしら" },
        },
        {
          heading: "くらしとのつながり",
          body: "まいにち{学校|がっこう}にいけるのも、{思|おも}ったことを{言|い}えるのも、{憲法|けんぽう}できみの{権利|けんり}がまもられているからだよ。たとえば「{教育|きょういく}をうける{権利|けんり}」があるから、だれでもべんきょうできるんだ。",
          visual: { kind: "emoji", value: "🏫💬", caption: "けんりがまもられる" },
        },
        {
          heading: "5{月|がつ}3{日|か}は{憲法記念日|けんぽうきねんび}",
          body: "{日本国憲法|にほんこくけんぽう}がつかわれはじめた{日|ひ}をおいわいするのが、5{月|がつ}3{日|か}の「{憲法記念日|けんぽうきねんび}」だよ。{国民|こくみん}みんなのお{休|やす}みの{日|ひ}（しゅくじつ）になっているんだ。",
          visual: { kind: "emoji", value: "📅🎌", caption: "けんぽうきねんび" },
        },
      ],
    },
    test: { unitId: U.constitution, questions: constitutionQuestions, questionCount: 20 },
  },

  [U.threePowers]: {
    unitId: U.threePowers,
    learn: {
      unitId: U.threePowers,
      steps: [
        {
          heading: "3つの{仕事|しごと}にわける",
          body: "{国|くに}の{政治|せいじ}をひとつのところにまかせると、{力|ちから}がつよくなりすぎてあぶないよ。だから「{法律|ほうりつ}をつくる」「{実行|じっこう}する」「さばく」の3つの{仕事|しごと}にわけているんだ。これを{三権分立|さんけんぶんりつ}というよ。",
          visual: { kind: "anim", name: "count-up", params: { to: 3, emoji: "⚖️" }, caption: "3つにわける" },
        },
        {
          heading: "だれがやるの？",
          body: "{法律|ほうりつ}をつくるのは{国会|こっかい}（{立法|りっぽう}）、それにそって{国|くに}の{仕事|しごと}をするのは{内閣|ないかく}（{行政|ぎょうせい}）、ルールでさばくのは{裁判所|さいばんしょ}（{司法|しほう}）だよ。クラスでいうと、きまりづくり・じっこうがかり・しんぱん、みたいにやくわりをわけるんだ。",
          visual: { kind: "emoji", value: "🏛️ 🏢 ⚖️", caption: "こっかい・ないかく・さいばんしょ" },
        },
        {
          heading: "おたがいをチェック",
          body: "3つはべつべつにしながら、おたがいを{見|み}はりあうよ。たとえば{裁判所|さいばんしょ}は、{法律|ほうりつ}が{憲法|けんぽう}にあっているかをしらべられるんだ。こうして1つのところが{力|ちから}をもちすぎないようにしているよ。",
          visual: { kind: "emoji", value: "🔁", caption: "ちからをかたよらせない" },
        },
        {
          heading: "わたしたちとのつながり",
          body: "{国会|こっかい}の{議員|ぎいん}は{選挙|せんきょ}でえらばれるよ。だからわたしたちのとうひょうが、{政治|せいじ}の3つの{力|ちから}のスタートになっているんだ。",
          visual: { kind: "emoji", value: "🗳️", caption: "せんきょがスタート" },
        },
      ],
    },
    test: { unitId: U.threePowers, questions: threePowersQuestions, questionCount: 20 },
  },

  [U.election]: {
    unitId: U.election,
    learn: {
      unitId: U.election,
      steps: [
        {
          heading: "{選挙|せんきょ}ってなに？",
          body: "{国|くに}や{町|まち}のことを{決|き}める{人|ひと}（{代表|だいひょう}）を、みんなのとうひょうでえらぶことを{選挙|せんきょ}というよ。クラスの{学級委員|がっきゅういいん}をえらぶのとにているね。",
          visual: { kind: "emoji", value: "🗳️", caption: "だいひょうをえらぶ" },
        },
        {
          heading: "18さいになったらとうひょう",
          body: "{今|いま}の{日本|にほん}では18さいになるととうひょうできるよ。むかしは20さいからだったけれど、2016{年|ねん}から18さいにかわったんだ。きみも18さいになったら、{国|くに}や{町|まち}をえらぶ{役|やく}をもつよ。",
          visual: { kind: "anim", name: "count-up", params: { to: 18 }, caption: "18さいから" },
        },
        {
          heading: "とうひょうはひみつ",
          body: "だれにいれたかは、ほかの{人|ひと}に{言|い}わなくていいよ（{秘密|ひみつ}{選挙|せんきょ}）。だからまわりにえんりょせず、{自分|じぶん}のかんがえで{自由|じゆう}にえらべるんだ。",
          visual: { kind: "emoji", value: "🤫", caption: "だれにいれたかはひみつ" },
        },
        {
          heading: "1{票|ぴょう}の{大切|たいせつ}さ",
          body: "とうひょうする{人|ひと}がへると、{少|すく}ない{人|ひと}のかんがえだけで{政治|せいじ}が{決|き}まってしまうよ。みんなが1{票|ぴょう}ずつ{出|だ}すと、いろいろな{声|こえ}が{政治|せいじ}にとどくんだ。だから1{票|ぴょう}はとても{大切|たいせつ}だよ。",
          visual: { kind: "emoji", value: "✅", caption: "いっぴょうをいかす" },
        },
      ],
    },
    test: { unitId: U.election, questions: electionQuestions, questionCount: 20 },
  },

  // ── 歴史 ──
  [U.jomon]: {
    unitId: U.jomon,
    learn: {
      unitId: U.jomon,
      steps: [
        {
          heading: "かりとさいしゅうのくらし",
          body: "{縄文|じょうもん}{時代|じだい}の{人|ひと}は、しかやいのししをかったり、どんぐりなどの{木|き}の{実|み}、{海|うみ}の{貝|かい}や{魚|さかな}をとったりして{食|た}べものをえていたよ。{田|た}んぼはまだなくて、しぜんのめぐみでくらしていたんだ。",
          visual: { kind: "emoji", value: "🏹🌰🐟", caption: "かり・さいしゅう" },
        },
        {
          heading: "{縄文|じょうもん}{土器|どき}とたてあな{住居|じゅうきょ}",
          body: "なわをころがしたようなもようの「{縄文|じょうもん}{土器|どき}」で、{食|た}べものをにたきしたよ。{地面|じめん}をほって{屋根|やね}をかけた「たてあな{住居|じゅうきょ}」にすんでいたんだ。",
          visual: { kind: "emoji", value: "🏺🛖", caption: "どきとすまい" },
        },
        {
          heading: "どぐうと{貝塚|かいづか}",
          body: "{土|つち}でつくった「どぐう」は、ぶじやほうさくをいのるおまもりだったといわれるよ。たべたあとの{貝|かい}がらをすてた「{貝塚|かいづか}」からは、{当時|とうじ}のくらしのようすがわかるんだ。",
          visual: { kind: "emoji", value: "🗿🐚", caption: "どぐう・かいづか" },
        },
        {
          heading: "{三内丸山遺跡|さんないまるやまいせき}",
          body: "{青森県|あおもりけん}の{三内丸山遺跡|さんないまるやまいせき}では、{大|おお}きなむらのあとが{見|み}つかったよ。{縄文|じょうもん}の{人|ひと}も、なかまとあつまってながいあいだくらしていたんだね。",
          visual: { kind: "emoji", value: "🛖🌲", caption: "むらのあと" },
        },
      ],
    },
    test: { unitId: U.jomon, questions: jomonQuestions, questionCount: 20 },
  },

  [U.yayoi]: {
    unitId: U.yayoi,
    learn: {
      unitId: U.yayoi,
      steps: [
        {
          heading: "お{米|こめ}づくりがはじまる",
          body: "{大陸|たいりく}からお{米|こめ}づくり（{稲作|いなさく}）がつたわったよ。{秋|あき}にとれたお{米|こめ}をためておけるようになり、{食|た}べものの{心配|しんぱい}がへって、くらしがあんていしたんだ。",
          visual: { kind: "emoji", value: "🌾", caption: "いなさく" },
        },
        {
          heading: "むらから「くに」へ",
          body: "お{米|こめ}や{水|みず}、{土地|とち}をめぐって、むらどうしがあらそうようになったよ。かったむらは{大|おお}きくなり、やがて{力|ちから}のつよい「くに」がうまれたんだ。",
          visual: { kind: "anim", name: "grow", params: { stages: ["🏠", "🏘️", "🏯"] }, caption: "むらからくにへ" },
        },
        {
          heading: "{卑弥呼|ひみこ}と{邪馬台国|やまたいこく}",
          body: "{中国|ちゅうごく}のふるい{本|ほん}に、{邪馬台国|やまたいこく}の{女王|じょおう}「{卑弥呼|ひみこ}」のことがかかれているよ。うらないやまつりの{力|ちから}で、30あまりのくにをまとめたといわれているんだ。",
          visual: { kind: "emoji", value: "👑", caption: "ひみこ" },
        },
        {
          heading: "{弥生|やよい}{土器|どき}とどうたく",
          body: "{弥生|やよい}{時代|じだい}には、うすくてかたい「{弥生|やよい}{土器|どき}」や、{青銅|せいどう}でできた「どうたく」がつくられたよ。どうたくはお{米|こめ}づくりのまつりにつかわれたとかんがえられているんだ。",
          visual: { kind: "emoji", value: "🏺🔔", caption: "やよいどき・どうたく" },
        },
      ],
    },
    test: { unitId: U.yayoi, questions: yayoiQuestions, questionCount: 20 },
  },

  [U.kofun]: {
    unitId: U.kofun,
    learn: {
      unitId: U.kofun,
      steps: [
        {
          heading: "{大|おお}きなおはか「{古墳|こふん}」",
          body: "{力|ちから}のつよい{王|おう}や{豪族|ごうぞく}がなくなると、{土|つち}を{山|やま}のようにもりあげた{大|おお}きなおはか「{古墳|こふん}」をつくったよ。うえから{見|み}ると、かぎあなのかたちをした「{前方後円墳|ぜんぽうこうえんふん}」もあるんだ。",
          visual: { kind: "anim", name: "grow", params: { stages: ["🟫", "⛰️", "🗻"] }, caption: "どんどん大きく" },
        },
        {
          heading: "{大仙古墳|だいせんこふん}",
          body: "{大阪府|おおさかふ}の{大仙古墳|だいせんこふん}（{仁徳天皇陵|にんとくてんのうりょう}）は、{世界|せかい}でもいちばんクラスの{大|おお}きさだよ。これだけ{大|おお}きいと、つくるのにたくさんの{人|ひと}と{力|ちから}がひつようだったとわかるね。",
          visual: { kind: "emoji", value: "⛰️🔑", caption: "ぜんぽうこうえんふん" },
        },
        {
          heading: "はにわ",
          body: "{古墳|こふん}のまわりには、{土|つち}でつくった「はにわ」がならべられたよ。{人|ひと}・{馬|うま}・{家|いえ}などのかたちがあって、{当時|とうじ}のくらしのようすをおしえてくれるんだ。",
          visual: { kind: "emoji", value: "🗿🐴", caption: "はにわ" },
        },
        {
          heading: "{大和朝廷|やまとちょうてい}",
          body: "{奈良|なら}を{中心|ちゅうしん}に、{各地|かくち}の{豪族|ごうぞく}をまとめた「{大和朝廷|やまとちょうてい}」ができたよ。リーダーは「{大王|おおきみ}」とよばれ、のちの{天皇|てんのう}につながっていくんだ。",
          visual: { kind: "emoji", value: "👑", caption: "やまとちょうてい" },
        },
      ],
    },
    test: { unitId: U.kofun, questions: kofunQuestions, questionCount: 20 },
  },

  [U.asukaNaraHeian]: {
    unitId: U.asukaNaraHeian,
    learn: {
      unitId: U.asukaNaraHeian,
      steps: [
        {
          heading: "{天皇|てんのう}{中心|ちゅうしん}の{国|くに}づくり",
          body: "{飛鳥|あすか}{時代|じだい}、{聖徳太子|しょうとくたいし}が「{十七条|じゅうしちじょう}の{憲法|けんぽう}」をつくり、{役人|やくにん}の{心|こころ}がまえをしめしたよ。{天皇|てんのう}を{中心|ちゅうしん}にした{国|くに}づくりがすすんだんだ。",
          visual: { kind: "emoji", value: "📜", caption: "しょうとくたいし" },
        },
        {
          heading: "{奈良|なら}の{大仏|だいぶつ}",
          body: "{奈良|なら}{時代|じだい}、{聖武天皇|しょうむてんのう}が{東大寺|とうだいじ}に{大|おお}きな{大仏|だいぶつ}をつくらせたよ。たかさは15メートルもあって、{国|くに}のあんぜんをねがう{気持|きも}ちがこめられているんだ。",
          visual: { kind: "anim", name: "grow", params: { stages: ["🧱", "🏗️", "🙏"] }, caption: "だいぶつができるまで" },
        },
        {
          heading: "{遣唐使|けんとうし}と{大陸|たいりく}の{文化|ぶんか}",
          body: "{中国|ちゅうごく}（{唐|とう}）へ「{遣唐使|けんとうし}」をおくり、すすんだ{文化|ぶんか}やしくみをまなんだよ。お{寺|てら}やみやこのつくりにも、そのえいきょうがのこっているんだ。",
          visual: { kind: "emoji", value: "⛵🌏", caption: "けんとうし" },
        },
        {
          heading: "かな{文字|もじ}と{貴族|きぞく}の{文化|ぶんか}",
          body: "{平安|へいあん}{時代|じだい}には、{漢字|かんじ}をもとにひらがな・カタカナがうまれたよ。{紫式部|むらさきしきぶ}の「{源氏物語|げんじものがたり}」や{清少納言|せいしょうなごん}の「{枕草子|まくらのそうし}」など、かな{文字|もじ}の{物語|ものがたり}がかかれたんだ。",
          visual: { kind: "emoji", value: "📖✍️", caption: "かなもじ" },
        },
      ],
    },
    test: { unitId: U.asukaNaraHeian, questions: asukaQuestions, questionCount: 20 },
  },

  [U.kamakuraMuromachi]: {
    unitId: U.kamakuraMuromachi,
    learn: {
      unitId: U.kamakuraMuromachi,
      steps: [
        {
          heading: "{武士|ぶし}の{世|よ}のはじまり",
          body: "{源頼朝|みなもとのよりとも}が{鎌倉|かまくら}に{幕府|ばくふ}をひらき、{武士|ぶし}が{政治|せいじ}をする{時代|じだい}がはじまったよ。{将軍|しょうぐん}が{土地|とち}をあたえ、そのかわりに{武士|ぶし}が{戦|たたか}う、というやくそく（ごおんとほうこう）でむすばれていたんだ。",
          visual: { kind: "emoji", value: "🏇", caption: "かまくらばくふ" },
        },
        {
          heading: "{元寇|げんこう}",
          body: "{元|げん}（モンゴル）が2{度|ど}も{海|うみ}をこえてせめてきたよ（{元寇|げんこう}）。{武士|ぶし}たちはひっしにたたかい、{暴風雨|ぼうふうう}にもたすけられてしりぞけたけれど、{幕府|ばくふ}はだんだんよわっていったんだ。",
          visual: { kind: "anim", name: "count-up", params: { to: 2, emoji: "⛵" }, caption: "2どせめてきた" },
        },
        {
          heading: "{金閣|きんかく}と{銀閣|ぎんかく}",
          body: "{室町|むろまち}{時代|じだい}には、{足利義満|あしかがよしみつ}がきらきらの「{金閣|きんかく}」、{足利義政|あしかがよしまさ}がしずかな「{銀閣|ぎんかく}」をたてたよ。どちらも{今|いま}も{京都|きょうと}で{見|み}られる{人気|にんき}のたてものだよ。",
          visual: { kind: "emoji", value: "🏯✨", caption: "きんかく・ぎんかく" },
        },
        {
          heading: "{今|いま}にのこる{文化|ぶんか}",
          body: "{銀閣|ぎんかく}のそばの{部屋|へや}は、たたみやしょうじのある「{書院造|しょいんづくり}」で、{今|いま}の{和室|わしつ}のもとになったよ。お{茶|ちゃ}や{生|い}け{花|ばな}、すみで{絵|え}をかく「すいぼくが」もこのころにひろがったんだ。",
          visual: { kind: "emoji", value: "🍵🎴", caption: "わしつ・おちゃ" },
        },
      ],
    },
    test: { unitId: U.kamakuraMuromachi, questions: kamakuraQuestions, questionCount: 20 },
  },

  [U.sengoku]: {
    unitId: U.sengoku,
    learn: {
      unitId: U.sengoku,
      steps: [
        {
          heading: "{戦国|せんごく}の{世|よ}",
          body: "{各地|かくち}の{戦国大名|せんごくだいみょう}が、{自分|じぶん}の{国|くに}をひろげようとあらそった{時代|じだい}だよ。{力|ちから}のつよいものがかちのこる、はげしい{世|よ}の{中|なか}だったんだ。",
          visual: { kind: "emoji", value: "🏯⚔️", caption: "せんごくのよ" },
        },
        {
          heading: "{鉄砲|てっぽう}とキリストきょう",
          body: "ヨーロッパから{鉄砲|てっぽう}がつたわり、{戦|たたか}い{方|かた}が{大|おお}きくかわったよ。ザビエルがキリストきょうをつたえ、{南蛮|なんばん}{貿易|ぼうえき}もはじまったんだ。",
          visual: { kind: "emoji", value: "🔫✝️", caption: "てっぽう・キリストきょう" },
        },
        {
          heading: "{天下|てんか}とういつへ",
          body: "{織田信長|おだのぶなが}が{鉄砲|てっぽう}をうまくつかって{力|ちから}をのばし、そのあとをついだ{豊臣秀吉|とよとみひでよし}が{全国|ぜんこく}をひとつにまとめたよ（{天下統一|てんかとういつ}）。",
          visual: { kind: "anim", name: "grow", params: { stages: ["⚔️", "🏇", "👑"] }, caption: "てんかとういつ" },
        },
        {
          heading: "{秀吉|ひでよし}の{政治|せいじ}",
          body: "{秀吉|ひでよし}は、{田|た}んぼの{広|ひろ}さやとれ{高|だか}をはかる「{検地|けんち}」や、{百姓|ひゃくしょう}から{刀|かたな}をあつめる「{刀狩|かたながり}」をおこなったよ。これで{武士|ぶし}と{百姓|ひゃくしょう}の{身分|みぶん}がはっきりわかれていったんだ。",
          visual: { kind: "emoji", value: "📏🗡️", caption: "けんち・かたながり" },
        },
      ],
    },
    test: { unitId: U.sengoku, questions: sengokuQuestions, questionCount: 20 },
  },

  [U.edo]: {
    unitId: U.edo,
    learn: {
      unitId: U.edo,
      steps: [
        {
          heading: "{江戸|えど}{幕府|ばくふ}のはじまり",
          body: "{徳川家康|とくがわいえやす}が{江戸|えど}（{今|いま}の{東京|とうきょう}）に{幕府|ばくふ}をひらいたよ。ここから{戦|いくさ}のない{平和|へいわ}な{世|よ}の{中|なか}が、なんと260{年|ねん}ちかくもつづいたんだ。",
          visual: { kind: "anim", name: "count-up", params: { to: 260 }, caption: "やく260年つづいた" },
        },
        {
          heading: "{参勤交代|さんきんこうたい}で{大名|だいみょう}をおさえる",
          body: "{幕府|ばくふ}は{大名|だいみょう}に、1{年|ねん}おきに{江戸|えど}と{自分|じぶん}の{国|くに}をいったりきたりさせたよ（{参勤交代|さんきんこうたい}）。たくさんお{金|かね}がかかるので、{大名|だいみょう}は{幕府|ばくふ}にはむかいにくくなったんだ。",
          visual: { kind: "emoji", value: "🚶🏯", caption: "さんきんこうたい" },
        },
        {
          heading: "{鎖国|さこく}",
          body: "{幕府|ばくふ}は{外国|がいこく}とのつきあいを{制限|せいげん}したよ（{鎖国|さこく}）。{長崎|ながさき}の「{出島|でじま}」で、{中国|ちゅうごく}とオランダだけとぼうえきをつづけたんだ。",
          visual: { kind: "emoji", value: "🚪", caption: "さこく" },
        },
        {
          heading: "{町人|ちょうにん}の{文化|ぶんか}とペリー",
          body: "{歌舞伎|かぶき}や{浮世絵|うきよえ}など、{町人|ちょうにん}がたのしむ{文化|ぶんか}がさかえたよ。さいごは1853{年|ねん}にペリーの{黒船|くろふね}がきて、{日本|にほん}は{開国|かいこく}することになったんだ。",
          visual: { kind: "emoji", value: "🎭🚢", caption: "かぶき・くろふね" },
        },
      ],
    },
    test: { unitId: U.edo, questions: edoQuestions, questionCount: 20 },
  },

  [U.meiji]: {
    unitId: U.meiji,
    learn: {
      unitId: U.meiji,
      steps: [
        {
          heading: "{明治維新|めいじいしん}",
          body: "{江戸|えど}{幕府|ばくふ}がたおれ、{天皇|てんのう}を{中心|ちゅうしん}にした{新|あたら}しい{国|くに}づくりがはじまったよ（{明治維新|めいじいしん}）。{武士|ぶし}や{百姓|ひゃくしょう}といった{身分|みぶん}のしくみもなくなっていったんだ。",
          visual: { kind: "emoji", value: "🌅", caption: "めいじいしん" },
        },
        {
          heading: "{文明開化|ぶんめいかいか}",
          body: "{西洋|せいよう}のくらしがどっとはいってきたよ。ランプから{電灯|でんとう}へ、{馬|うま}から{鉄道|てつどう}へ。ようふくをきた{人|ひと}やレンガのたてものがふえ、{町|まち}のようすがすっかりかわったんだ。",
          visual: { kind: "anim", name: "grow", params: { stages: ["🏮", "💡", "🚂"] }, caption: "ぶんめいかいか" },
        },
        {
          heading: "{学校|がっこう}とあたらしいしくみ",
          body: "「だれもがべんきょうできるように」と、{全国|ぜんこく}に{小学校|しょうがっこう}がつくられたよ。ゆうびんやおかねのしくみも、このころにととのったんだ。",
          visual: { kind: "emoji", value: "🏫📮", caption: "がっこう・ゆうびん" },
        },
        {
          heading: "{憲法|けんぽう}と{戦争|せんそう}",
          body: "{大日本帝国憲法|だいにっぽんていこくけんぽう}ができ、つよい{国|くに}をめざす「{富国強兵|ふこくきょうへい}」がすすめられたよ。やがて{日清|にっしん}{戦争|せんそう}・{日露|にちろ}{戦争|せんそう}もおこったんだ。",
          visual: { kind: "emoji", value: "📜🏭", caption: "けんぽう・ふこくきょうへい" },
        },
      ],
    },
    test: { unitId: U.meiji, questions: meijiQuestions, questionCount: 20 },
  },

  [U.taishoShowa]: {
    unitId: U.taishoShowa,
    learn: {
      unitId: U.taishoShowa,
      steps: [
        {
          heading: "{大正|たいしょう}デモクラシー",
          body: "{大正|たいしょう}{時代|じだい}には、{国民|こくみん}の{声|こえ}を{政治|せいじ}にいかそうという{動|うご}きがひろがったよ（{大正|たいしょう}デモクラシー）。25さい{以上|いじょう}のすべての{男子|だんし}が、とうひょうできるようにもなったんだ。",
          visual: { kind: "emoji", value: "📣", caption: "たいしょうデモクラシー" },
        },
        {
          heading: "{戦争|せんそう}へすすむ{日本|にほん}",
          body: "{昭和|しょうわ}になると、{日本|にほん}は{大|おお}きな{戦争|せんそう}へすすんでいったよ。やがて{第二次世界大戦|だいにじせかいたいせん}がはじまり、{日本|にほん}もまきこまれていったんだ。",
          visual: { kind: "emoji", value: "🌐", caption: "せんそう" },
        },
        {
          heading: "{戦争|せんそう}{中|ちゅう}のくらし",
          body: "{戦争|せんそう}{中|ちゅう}は{食|た}べものや{服|ふく}がたりなくなり、{空襲|くうしゅう}をさけて{子|こ}どもたちは{地方|ちほう}へうつったよ（そかい）。まいにちのくらしが、とてもくるしかったんだ。",
          visual: { kind: "emoji", value: "🏚️", caption: "くるしいくらし" },
        },
        {
          heading: "{戦争|せんそう}のおわりと{平和|へいわ}のねがい",
          body: "1945{年|ねん}8{月|がつ}、{広島|ひろしま}と{長崎|ながさき}に{原子|げんし}ばくだんがおとされ、{戦争|せんそう}はおわったよ。たくさんのいのちがうしなわれたことをわすれず、{平和|へいわ}を{大切|たいせつ}にしようね。",
          visual: { kind: "emoji", value: "🕊️", caption: "へいわ" },
        },
      ],
    },
    test: { unitId: U.taishoShowa, questions: taishoQuestions, questionCount: 20 },
  },

  [U.gendai]: {
    unitId: U.gendai,
    learn: {
      unitId: U.gendai,
      steps: [
        {
          heading: "{新|あたら}しい{日本|にほん}のはじまり",
          body: "{戦後|せんご}、{日本国憲法|にほんこくけんぽう}ができたよ。{国民主権|こくみんしゅけん}・{基本的人権|きほんてきじんけん}の{尊重|そんちょう}・{平和主義|へいわしゅぎ}を3つの{柱|はしら}にした、{新|あたら}しい{国|くに}にうまれかわったんだ。",
          visual: { kind: "emoji", value: "📜🕊️", caption: "にほんこくけんぽう" },
        },
        {
          heading: "ゆたかになる{日本|にほん}",
          body: "1950{年|ねん}ごろからけいざいが{大|おお}きく{成長|せいちょう}したよ（{高度経済成長|こうどけいざいせいちょう}）。テレビ・{洗濯機|せんたくき}・{冷蔵庫|れいぞうこ}・{車|くるま}がどんどんひろまって、くらしがべんりになったんだ。",
          visual: { kind: "anim", name: "grow", params: { stages: ["📻", "📺", "🚗"] }, caption: "くらしがゆたかに" },
        },
        {
          heading: "1964{年|ねん} {東京|とうきょう}オリンピック",
          body: "1964{年|ねん}には、アジアではじめての{東京|とうきょう}オリンピックがひらかれたよ。{新幹線|しんかんせん}も{走|はし}りはじめ、{世界|せかい}に「{元気|げんき}になった{日本|にほん}」をしめしたんだ。",
          visual: { kind: "emoji", value: "🏅🚄", caption: "とうきょうオリンピック" },
        },
        {
          heading: "{今|いま}のくらしと{課題|かだい}",
          body: "コンピューターやスマートフォンがひろまり、くらしはとてもべんりになったよ。いっぽうで、{少子高齢化|しょうしこうれいか}やかんきょうの{問題|もんだい}など、これからみんなでかんがえることもふえているんだ。",
          visual: { kind: "emoji", value: "📱🌏", caption: "これからのかだい" },
        },
      ],
    },
    test: { unitId: U.gendai, questions: gendaiQuestions, questionCount: 20 },
  },

  // ── 国際 ──
  [U.unitedNations]: {
    unitId: U.unitedNations,
    learn: {
      unitId: U.unitedNations,
      steps: [
        {
          heading: "{国際連合|こくさいれんごう}（{国連|こくれん}）",
          body: "{二度|にど}と{戦争|せんそう}をくりかえさないように、{世界|せかい}じゅうの{国|くに}があつまってつくったのが{国際連合|こくさいれんごう}（{国連|こくれん}）だよ。{今|いま}では193もの{国|くに}が、なかまになっているんだ。",
          visual: { kind: "anim", name: "count-up", params: { to: 193 }, caption: "193の国がなかま" },
        },
        {
          heading: "{話|はな}しあいで{平和|へいわ}をまもる",
          body: "{国連|こくれん}では、{世界|せかい}の{国|くに}ぐにが{集|あつ}まって{話|はな}しあい、{争|あらそ}いをふせごうとするよ。{平和|へいわ}をまもる「PKO（{平和|へいわ}いじかつどう）」では、{日本|にほん}の{人|ひと}もかつやくしているんだ。",
          visual: { kind: "emoji", value: "🌐🤝", caption: "こくれん" },
        },
        {
          heading: "ユニセフとユネスコ",
          body: "{国連|こくれん}にはいろいろなしごとのなかまがいるよ。ユニセフは{世界|せかい}の{子|こ}どもをたすけ、ユネスコは{文化|ぶんか}や{世界遺産|せかいいさん}をまもるんだ。",
          visual: { kind: "emoji", value: "🧒🏛️", caption: "ユニセフ・ユネスコ" },
        },
        {
          heading: "SDGs（17の{目標|もくひょう}）",
          body: "2030{年|ねん}までに{世界|せかい}みんなでめざす17の{目標|もくひょう}が「SDGs」だよ。びんぼうをなくす、かんきょうをまもるなど、だれもがしあわせにくらせる{世界|せかい}をめざしているんだ。",
          visual: { kind: "anim", name: "count-up", params: { to: 17, emoji: "🌍" }, caption: "17のもくひょう" },
        },
      ],
    },
    test: { unitId: U.unitedNations, questions: unQuestions, questionCount: 20 },
  },

  [U.internationalCooperation]: {
    unitId: U.internationalCooperation,
    learn: {
      unitId: U.internationalCooperation,
      steps: [
        {
          heading: "{国際協力|こくさいきょうりょく}ってなに？",
          body: "ゆたかな{国|くに}が、こまっている{国|くに}を{技術|ぎじゅつ}やお{金|かね}でたすけあうことを{国際協力|こくさいきょうりょく}というよ。{学校|がっこう}や{病院|びょういん}、{水道|すいどう}づくりなどをきょうりょくするんだ。",
          visual: { kind: "emoji", value: "🤝🌍", caption: "こくさいきょうりょく" },
        },
        {
          heading: "{日本|にほん}のとりくみ",
          body: "{日本|にほん}は「ODA（せいふかいはつえんじょ）」で{多|おお}くの{国|くに}をたすけているよ。{青年海外協力隊|せいねんかいがいきょうりょくたい}やNGOの{人|ひと}たちが、{世界|せかい}じゅうで{技術|ぎじゅつ}をおしえたり{人|ひと}をたすけたりしているんだ。",
          visual: { kind: "emoji", value: "🌏👷", caption: "きょうりょくたい・エヌジーオー" },
        },
        {
          heading: "{世界|せかい}みんなの{問題|もんだい}",
          body: "{地球温暖化|ちきゅうおんだんか}・{難民|なんみん}・しょくりょうぶそくなど、1つの{国|くに}だけではかいけつできない{問題|もんだい}がふえているよ。だからこそ、{世界|せかい}の{国|くに}ぐにがてをとりあうことが{大切|たいせつ}なんだ。",
          visual: { kind: "emoji", value: "🌡️🌍", caption: "せかいのもんだい" },
        },
        {
          heading: "これからの{日本|にほん}とわたしたち",
          body: "ちがう{国|くに}や{文化|ぶんか}の{人|ひと}とも、なかまとしてたすけあう{気持|きも}ちが{大切|たいせつ}だよ。きみが{世界|せかい}のニュースに{目|め}をむけることも、りっぱな{国際協力|こくさいきょうりょく}のはじまりなんだ。",
          visual: { kind: "anim", name: "grow", params: { stages: ["🤝", "🌏", "💗"] }, caption: "たすけあいの{輪|わ}" },
        },
      ],
    },
    test: {
      unitId: U.internationalCooperation,
      questions: cooperationQuestions,
      questionCount: 20,
    },
  },
};
