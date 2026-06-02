// ══════════════════════════════════════════
// カリキュラム: 算数（さんすう）小6
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>" / 問題 = "<unitId>.q-<n>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 学習指導要領（小6算数）準拠: 対称な図形 / 文字と式 / 分数のかけ算とわり算 /
//   比とその利用 / 拡大図と縮図 / 円の面積 / 角柱と円柱の体積 /
//   比例と反比例 / 並べ方と組み合わせ(場合の数) / データの調べ方。
// generators レジストリは g1 用の within-10/20 のみで g6 には適合しないため、
// 全単元 固定 questions[] を使用（全問 explanation 必須）。
// 表記規約: 全表示テキストは漢字＋ルビ {漢字|よみ}（全漢字ルビ）。id/構造/型/メタは不変。
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

export const sansuuSubject: Subject = {
  id: "sansuu",
  name: "{算数|さんすう}",
  formalName: "算数",
  emoji: "🔢",
  theme: "orange",
  grades: [1, 2, 3, 4, 5, 6],
  testable: true,
};

// ── 領域 ──────────────────────────────────
// 学習指導要領（高学年）の4領域に対応。number-calc は g1 と同一 id（集約で dedupe）。

export const sansuuG6Domains: Domain[] = [
  {
    id: "sansuu.number-calc",
    subjectId: "sansuu",
    name: "{数|かず}と{計算|けいさん}",
    formalName: "数と計算",
  },
  {
    id: "sansuu.geometry",
    subjectId: "sansuu",
    name: "{図形|ずけい}",
    formalName: "図形",
  },
  {
    id: "sansuu.change-relation",
    subjectId: "sansuu",
    name: "{変化|へんか}と{関係|かんけい}",
    formalName: "変化と関係",
  },
  {
    id: "sansuu.data",
    subjectId: "sansuu",
    name: "データの{活用|かつよう}",
    formalName: "データの活用",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。循環なし。g6内で自己完結）:
//
//   letters-expressions ─┬─▶ circle-area ──▶ solid-volume
//                        └─▶ proportion
//   fraction-mult-div ───▶ ratio ──▶ proportion
//   line-point-symmetry ─▶ scale-figures
//   combinatorics / data-analysis（独立）
//
const U = {
  symmetry: "sansuu.g6.line-point-symmetry",
  letters: "sansuu.g6.letters-expressions",
  fractionMulDiv: "sansuu.g6.fraction-mult-div",
  ratio: "sansuu.g6.ratio",
  scaleFigures: "sansuu.g6.scale-figures",
  circleArea: "sansuu.g6.circle-area",
  solidVolume: "sansuu.g6.solid-volume",
  proportion: "sansuu.g6.proportion",
  combinatorics: "sansuu.g6.combinatorics",
  dataAnalysis: "sansuu.g6.data-analysis",
} as const;

export const sansuuG6Units: Unit[] = [
  {
    id: U.symmetry,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "{対称|たいしょう}な{図形|ずけい}",
    order: 1,
    realWorldUse: "ちょうちょや {雪|ゆき}のけっしょう、マークの デザインなど、{左右|さゆう}や {点|てん}で つりあう {形|かたち}を {見|み}つけるのに つかうよ。",
    leadsTo: [U.scaleFigures],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.letters,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.number-calc",
    title: "{文字|もじ}と{式|しき}",
    order: 2,
    realWorldUse: "わからない {数|かず}を x や a で あらわすと、ねだんや {面積|めんせき}の きまりを ひとつの {式|しき}で かんたんに {書|か}けるよ。",
    leadsTo: [U.circleArea, U.proportion],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.fractionMulDiv,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.number-calc",
    title: "{分数|ぶんすう}のかけ{算|ざん}とわり{算|ざん}",
    order: 3,
    realWorldUse: "リボンを 2/3m ずつ {何本|なんぼん}も つかうときや、3/4L を {何人|なんにん}かで {分|わ}けるときの {計算|けいさん}に つかうよ。",
    leadsTo: [U.ratio],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.ratio,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.change-relation",
    title: "{比|ひ}とその{利用|りよう}",
    order: 4,
    realWorldUse: "ジュースと {水|みず}を 1:4 で まぜる、{料理|りょうり}の {分量|ぶんりょう}を {人数|にんずう}ぶん ふやすなど、わりあいを そろえるのに つかうよ。",
    leadsTo: [U.proportion, U.scaleFigures],
    prerequisites: [U.fractionMulDiv],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.scaleFigures,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "{拡大図|かくだいず}と{縮図|しゅくず}",
    order: 5,
    realWorldUse: "{地図|ちず}の {縮尺|しゅくしゃく}から じっさいの きょりを もとめたり、せっけい{図|ず}を {大|おお}きく・{小|ちい}さく かくのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.symmetry],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.circleArea,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "{円|えん}の{面積|めんせき}",
    order: 6,
    realWorldUse: "まるい テーブルや ピザ、{花|はな}だんの {広|ひろ}さを {計算|けいさん}するときに つかうよ。",
    leadsTo: [U.solidVolume],
    prerequisites: [U.letters],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.solidVolume,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.geometry",
    title: "{角柱|かくちゅう}と{円柱|えんちゅう}の{体積|たいせき}",
    order: 7,
    realWorldUse: "{水|みず}とうや かんづめ、はこに {入|はい}る {水|みず}や ものの かさ（{体積|たいせき}）を もとめるのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.letters, U.circleArea],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.proportion,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.change-relation",
    title: "{比例|ひれい}と{反比例|はんぴれい}",
    order: 8,
    realWorldUse: "{走|はし}る {時間|じかん}と すすむ きょり、ねだんと {個数|こすう}など、2つの {量|りょう}が どう かわるかを {予想|よそう}するのに つかうよ。",
    leadsTo: [],
    prerequisites: [U.letters, U.ratio],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.combinatorics,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.data",
    title: "{並|なら}べ{方|かた}と{組|く}み{合|あ}わせ",
    order: 9,
    realWorldUse: "リレーの {走|はし}る じゅんばんや、{試合|しあい}の {組|く}み{合|あ}わせ、メニューの えらび{方|かた}が {何通|なんとお}り あるかを {数|かぞ}えるのに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.dataAnalysis,
    subjectId: "sansuu",
    grade: 6,
    domainId: "sansuu.data",
    title: "データの{調|しら}べ{方|かた}",
    order: 10,
    realWorldUse: "テストの {点|てん}や {記録|きろく}を {整理|せいり}して、{平均値|へいきんち}・{中央値|ちゅうおうち}・{最頻値|さいひんち}で クラスの ようすを つかむのに つかうよ。",
    leadsTo: [],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 各単元の固定問題（全問 explanation 必須・全テキスト ルビ記法） ──────────────

const symmetryQuestions: Question[] = [
  {
    id: `${U.symmetry}.q-1`,
    unitId: U.symmetry,
    prompt: "{線対称|せんたいしょう}な {図形|ずけい}で、おって ぴったり かさなる おりめの {直線|ちょくせん}を なんという？",
    explanation: "{線対称|せんたいしょう}の おりめに なる {直線|ちょくせん}を「{対称|たいしょう}の{軸|じく}」と いうよ。この {軸|じく}で おると {左右|さゆう}が ぴったり かさなる。",
    format: "choice",
    choices: ["{対称|たいしょう}の{軸|じく}", "{対称|たいしょう}の{中心|ちゅうしん}", "{直径|ちょっけい}", "{対角線|たいかくせん}"],
    answer: "{対称|たいしょう}の{軸|じく}",
  },
  {
    id: `${U.symmetry}.q-2`,
    unitId: U.symmetry,
    prompt: "{点対称|てんたいしょう}な {図形|ずけい}を、ある{点|てん}を {中心|ちゅうしん}に 180°まわすと どうなる？",
    explanation: "{点対称|てんたいしょう}な {図形|ずけい}は、{対称|たいしょう}の{中心|ちゅうしん}の まわりに 180°まわすと もとの {形|かたち}に ぴったり かさなるよ。",
    format: "choice",
    choices: ["もとの{形|かたち}に ぴったり かさなる", "{大|おお}きく なる", "{形|かたち}が かわる", "うらがえる"],
    answer: "もとの{形|かたち}に ぴったり かさなる",
  },
  {
    id: `${U.symmetry}.q-3`,
    unitId: U.symmetry,
    prompt: "{正方形|せいほうけい}の {対称|たいしょう}の{軸|じく}は {何本|なんぼん} ある？",
    explanation: "{正方形|せいほうけい}は たて・よこの まん{中|なか} 2{本|ほん}と、ななめ 2{本|ほん}で あわせて 4{本|ほん}の {対称|たいしょう}の{軸|じく}が あるよ。",
    format: "number-input",
    answer: 4,
  },
  {
    id: `${U.symmetry}.q-4`,
    unitId: U.symmetry,
    prompt: "（{長方形|ちょうほうけい}でない）{平行四辺形|へいこうしへんけい}は、つぎの どれに あてはまる？",
    explanation: "{平行四辺形|へいこうしへんけい}は 180°まわすと かさなるので {点対称|てんたいしょう}。でも おって かさなる {軸|じく}は ないので {線対称|せんたいしょう}では ないよ。",
    format: "choice",
    choices: ["{点対称|てんたいしょう}だけ", "{線対称|せんたいしょう}だけ", "{線対称|せんたいしょう}でも{点対称|てんたいしょう}でもある", "どちらでもない"],
    answer: "{点対称|てんたいしょう}だけ",
  },
  {
    id: `${U.symmetry}.q-5`,
    unitId: U.symmetry,
    prompt: "{正三角形|せいさんかくけい}の {対称|たいしょう}の{軸|じく}は {何本|なんぼん} ある？",
    explanation: "{正三角形|せいさんかくけい}は それぞれの ちょう{点|てん}から {向|む}かいの {辺|へん}の まん{中|なか}へ ひいた {直線|ちょくせん} 3{本|ぼん}が {対称|たいしょう}の{軸|じく}だよ。",
    format: "number-input",
    answer: 3,
  },
];

const lettersQuestions: Question[] = [
  {
    id: `${U.letters}.q-1`,
    unitId: U.letters,
    prompt: "1{本|ぼん} x{円|えん}の ジュースを 3{本|ぼん} {買|か}ったときの {代金|だいきん}を {式|しき}で あらわすと？",
    explanation: "1{本|ぼん} x{円|えん}が 3{本|ぼん}ぶんだから x×3（{円|えん}）。{文字|もじ}を つかうと どんな ねだんでも ひとつの {式|しき}で あらわせるよ。",
    format: "choice",
    choices: ["x×3", "x＋3", "x−3", "x÷3"],
    answer: "x×3",
  },
  {
    id: `${U.letters}.q-2`,
    unitId: U.letters,
    prompt: "x×4＝20 の とき、x の あたいは いくつ？",
    explanation: "x×4＝20 だから x＝20÷4＝5。かけ{算|ざん}の ぎゃくの わり{算|ざん}で もとめられるよ。",
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.letters}.q-3`,
    unitId: U.letters,
    prompt: "x＋8＝15 の とき、x の あたいは いくつ？",
    explanation: "x＝15−8＝7。たし{算|ざん}の ぎゃくの ひき{算|ざん}で もとめるよ。",
    format: "number-input",
    answer: 7,
  },
  {
    id: `${U.letters}.q-4`,
    unitId: U.letters,
    prompt: "1{個|こ} a{円|えん}の パンを 5{個|こ} {買|か}って 1000{円|えん} はらった。おつりの {式|しき}は？",
    explanation: "パン{代|だい}は a×5 {円|えん}。1000{円|えん} から ひくので おつりは 1000−a×5（{円|えん}）だよ。",
    format: "choice",
    choices: ["1000−a×5", "1000＋a×5", "a×5−1000", "1000−a÷5"],
    answer: "1000−a×5",
  },
  {
    id: `${U.letters}.q-5`,
    unitId: U.letters,
    prompt: "たて x cm、よこ 6cm の {長方形|ちょうほうけい}の {面積|めんせき}を {式|しき}で あらわすと？",
    explanation: "{長方形|ちょうほうけい}の {面積|めんせき}は たて×よこ。だから x×6（cm²）だよ。",
    format: "choice",
    choices: ["x×6", "x＋6", "x×6×2", "(x＋6)×2"],
    answer: "x×6",
  },
];

const fractionQuestions: Question[] = [
  {
    id: `${U.fractionMulDiv}.q-1`,
    unitId: U.fractionMulDiv,
    prompt: "2/3 × 3/4 ＝ ？",
    explanation: "{分数|ぶんすう}の かけ{算|ざん}は ぶんし×ぶんし、ぶんぼ×ぶんぼ。6/12 に なり、やくぶんすると 1/2 だよ。",
    format: "choice",
    choices: ["1/2", "1/4", "5/12", "6/7"],
    answer: "1/2",
  },
  {
    id: `${U.fractionMulDiv}.q-2`,
    unitId: U.fractionMulDiv,
    prompt: "{分数|ぶんすう}の わり{算|ざん}は どう {計算|けいさん}する？",
    explanation: "わる{数|かず}の ぎゃくすう（{分母|ぶんぼ}と{分子|ぶんし}を {入|い}れかえた{数|かず}）を かければ もとめられるよ。",
    format: "choice",
    choices: ["わる{数|かず}の ぎゃくすうを かける", "そのまま かける", "ぶんぼ どうしを わる", "ぶんし だけ わる"],
    answer: "わる{数|かず}の ぎゃくすうを かける",
  },
  {
    id: `${U.fractionMulDiv}.q-3`,
    unitId: U.fractionMulDiv,
    prompt: "3/5 ÷ 2/3 ＝ ？",
    explanation: "わる{数|かず} 2/3 の ぎゃくすう 3/2 を かける。3/5×3/2＝9/10 だよ。",
    format: "choice",
    choices: ["9/10", "6/15", "2/5", "5/9"],
    answer: "9/10",
  },
  {
    id: `${U.fractionMulDiv}.q-4`,
    unitId: U.fractionMulDiv,
    prompt: "1/2 ÷ 1/4 ＝ ？（{答|こた}えは {整数|せいすう}で）",
    explanation: "1/4 の ぎゃくすう 4/1 を かける。1/2×4＝4/2＝2 だよ。",
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.fractionMulDiv}.q-5`,
    unitId: U.fractionMulDiv,
    prompt: "4/7 × 7/8 ＝ ？",
    explanation: "ぶんし×ぶんし＝28、ぶんぼ×ぶんぼ＝56 で 28/56。やくぶんして 1/2 だよ。",
    format: "choice",
    choices: ["1/2", "11/15", "4/8", "28/15"],
    answer: "1/2",
  },
];

const ratioQuestions: Question[] = [
  {
    id: `${U.ratio}.q-1`,
    unitId: U.ratio,
    prompt: "3:4 の {比|ひ}の {値|あたい}は？",
    explanation: "{比|ひ}の {値|あたい}は {前|まえ}の{数|かず}÷{後|うし}ろの{数|かず}。3÷4＝3/4 だよ。",
    format: "choice",
    choices: ["3/4", "4/3", "7", "12"],
    answer: "3/4",
  },
  {
    id: `${U.ratio}.q-2`,
    unitId: U.ratio,
    prompt: "2:3 と {等|ひと}しい {比|ひ}は どれ？",
    explanation: "{両方|りょうほう}を おなじ {数|かず}で かけても {比|ひ}は かわらない。2×2:3×2＝4:6 だよ。",
    format: "choice",
    choices: ["4:6", "2:6", "5:6", "3:2"],
    answer: "4:6",
  },
  {
    id: `${U.ratio}.q-3`,
    unitId: U.ratio,
    prompt: "12:18 を いちばん かんたんな {比|ひ}に すると？",
    explanation: "12と18の さいだいこうやくすう 6で わると 2:3 に なるよ。",
    format: "choice",
    choices: ["2:3", "6:9", "4:6", "1:2"],
    answer: "2:3",
  },
  {
    id: `${U.ratio}.q-4`,
    unitId: U.ratio,
    prompt: "みかんと りんごの {数|かず}の {比|ひ}が 2:5。みかんが 6{個|こ}の とき、りんごは {何個|なんこ}？",
    explanation: "みかんは 2→6で 3{倍|ばい}。りんごも {同|おな}じ 3{倍|ばい}だから 5×3＝15{個|こ} だよ。",
    format: "number-input",
    answer: 15,
  },
  {
    id: `${U.ratio}.q-5`,
    unitId: U.ratio,
    prompt: "さとうと {水|みず}を 1:4 で まぜる。{水|みず}が 200mL の とき、さとうは {何|なん}g？",
    explanation: "{水|みず}は 4に あたり 200mL。1に あたる さとうは 200÷4＝50g だよ。",
    format: "number-input",
    answer: 50,
  },
];

const scaleQuestions: Question[] = [
  {
    id: `${U.scaleFigures}.q-1`,
    unitId: U.scaleFigures,
    prompt: "2{倍|ばい}の {拡大図|かくだいず}を かくと、{辺|へん}の {長|なが}さは どう なる？",
    explanation: "{拡大図|かくだいず}では すべての {辺|へん}が {同|おな}じ わりあいで のびる。2{倍|ばい}の {拡大図|かくだいず}なら {辺|へん}も 2{倍|ばい}だよ。",
    format: "choice",
    choices: ["2{倍|ばい}に なる", "{半分|はんぶん}に なる", "かわらない", "4{倍|ばい}に なる"],
    answer: "2{倍|ばい}に なる",
  },
  {
    id: `${U.scaleFigures}.q-2`,
    unitId: U.scaleFigures,
    prompt: "{拡大|かくだい}・{縮小|しゅくしょう}しても かわらないのは どれ？",
    explanation: "{拡大図|かくだいず}・{縮図|しゅくず}では {辺|へん}の {長|なが}さは かわるけれど、{角|かく}の {大|おお}きさは もとの {図形|ずけい}と {同|おな}じだよ。",
    format: "choice",
    choices: ["{角|かく}の {大|おお}きさ", "{辺|へん}の {長|なが}さ", "{面積|めんせき}", "まわりの {長|なが}さ"],
    answer: "{角|かく}の {大|おお}きさ",
  },
  {
    id: `${U.scaleFigures}.q-3`,
    unitId: U.scaleFigures,
    prompt: "{縮尺|しゅくしゃく} 1/1000 の {地図|ちず}で 2cm の きょりは、じっさいは {何|なん}m？",
    explanation: "じっさいは 2cm×1000＝2000cm。100cm＝1m だから 2000cm＝20m だよ。",
    format: "number-input",
    answer: 20,
  },
  {
    id: `${U.scaleFigures}.q-4`,
    unitId: U.scaleFigures,
    prompt: "じっさいの {長|なが}さ 50m を 1/1000 の {縮図|しゅくず}に かくと {何|なん}cm？",
    explanation: "50m＝5000cm。それを 1/1000 に するから 5000÷1000＝5cm だよ。",
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.scaleFigures}.q-5`,
    unitId: U.scaleFigures,
    prompt: "もとの {図形|ずけい}を 1/3 の {縮図|しゅくず}に すると、{辺|へん}の {長|なが}さは どう なる？",
    explanation: "{縮図|しゅくず}は すべての {辺|へん}を {同|おな}じ わりあいで ちぢめる。1/3 の {縮図|しゅくず}なら {辺|へん}も 1/3 だよ。",
    format: "choice",
    choices: ["1/3に なる", "3{倍|ばい}に なる", "かわらない", "1/9に なる"],
    answer: "1/3に なる",
  },
];

const circleAreaQuestions: Question[] = [
  {
    id: `${U.circleArea}.q-1`,
    unitId: U.circleArea,
    prompt: "{円|えん}の {面積|めんせき}を もとめる {公式|こうしき}は？",
    explanation: "{円|えん}の {面積|めんせき}＝{半径|はんけい}×{半径|はんけい}×{円周率|えんしゅうりつ}（3.14）。{半径|はんけい}を 2{回|かい} かけてから 3.14 を かけるよ。",
    format: "choice",
    choices: ["{半径|はんけい}×{半径|はんけい}×3.14", "{直径|ちょっけい}×3.14", "{半径|はんけい}×2×3.14", "{半径|はんけい}×3.14"],
    answer: "{半径|はんけい}×{半径|はんけい}×3.14",
  },
  {
    id: `${U.circleArea}.q-2`,
    unitId: U.circleArea,
    prompt: "{半径|はんけい} 10cm の {円|えん}の {面積|めんせき}は {何|なん}cm²？（{円周率|えんしゅうりつ} 3.14）",
    explanation: "10×10×3.14＝314。{半径|はんけい}×{半径|はんけい}×3.14 で もとめるよ。",
    format: "number-input",
    answer: 314,
  },
  {
    id: `${U.circleArea}.q-3`,
    unitId: U.circleArea,
    prompt: "{半径|はんけい} 5cm の {円|えん}の {面積|めんせき}は {何|なん}cm²？（{円周率|えんしゅうりつ} 3.14）",
    explanation: "5×5×3.14＝78.5（cm²）だよ。",
    format: "number-input",
    answer: 78.5,
    tolerance: 0.01,
  },
  {
    id: `${U.circleArea}.q-4`,
    unitId: U.circleArea,
    prompt: "{直径|ちょっけい} 8cm の {円|えん}の {面積|めんせき}は {何|なん}cm²？（{円周率|えんしゅうりつ} 3.14）",
    explanation: "まず {半径|はんけい}＝{直径|ちょっけい}÷2＝4cm。4×4×3.14＝50.24（cm²）だよ。",
    format: "number-input",
    answer: 50.24,
    tolerance: 0.01,
  },
  {
    id: `${U.circleArea}.q-5`,
    unitId: U.circleArea,
    prompt: "{円周率|えんしゅうりつ}は およそ いくつ？",
    explanation: "{円周率|えんしゅうりつ}は {直径|ちょっけい}に たいする {円周|えんしゅう}の わりあいで、およそ 3.14 だよ。",
    format: "choice",
    choices: ["3.14", "3.41", "2.14", "31.4"],
    answer: "3.14",
  },
];

const volumeQuestions: Question[] = [
  {
    id: `${U.solidVolume}.q-1`,
    unitId: U.solidVolume,
    prompt: "{角柱|かくちゅう}や {円柱|えんちゅう}の {体積|たいせき}を もとめる {公式|こうしき}は？",
    explanation: "{角柱|かくちゅう}・{円柱|えんちゅう}の {体積|たいせき}＝{底面積|ていめんせき}×{高|たか}さ。{下|した}の {面|めん}の {広|ひろ}さに {高|たか}さを かけるよ。",
    format: "choice",
    choices: ["{底面積|ていめんせき}×{高|たか}さ", "{底面積|ていめんせき}＋{高|たか}さ", "{底面積|ていめんせき}×{高|たか}さ÷2", "まわりの{長|なが}さ×{高|たか}さ"],
    answer: "{底面積|ていめんせき}×{高|たか}さ",
  },
  {
    id: `${U.solidVolume}.q-2`,
    unitId: U.solidVolume,
    prompt: "{底面積|ていめんせき} 20cm²、{高|たか}さ 5cm の {角柱|かくちゅう}の {体積|たいせき}は {何|なん}cm³？",
    explanation: "{体積|たいせき}＝{底面積|ていめんせき}×{高|たか}さ＝20×5＝100（cm³）だよ。",
    format: "number-input",
    answer: 100,
  },
  {
    id: `${U.solidVolume}.q-3`,
    unitId: U.solidVolume,
    prompt: "たて 4cm、よこ 5cm、{高|たか}さ 10cm の {四角柱|しかくちゅう}の {体積|たいせき}は {何|なん}cm³？",
    explanation: "{底面積|ていめんせき}＝4×5＝20cm²。{体積|たいせき}＝20×10＝200（cm³）だよ。",
    format: "number-input",
    answer: 200,
  },
  {
    id: `${U.solidVolume}.q-4`,
    unitId: U.solidVolume,
    prompt: "{底面|ていめん}が {半径|はんけい} 10cm の {円|えん}、{高|たか}さ 3cm の {円柱|えんちゅう}の {体積|たいせき}は {何|なん}cm³？（{円周率|えんしゅうりつ} 3.14）",
    explanation: "{底面積|ていめんせき}＝10×10×3.14＝314cm²。{体積|たいせき}＝314×3＝942（cm³）だよ。",
    format: "number-input",
    answer: 942,
  },
  {
    id: `${U.solidVolume}.q-5`,
    unitId: U.solidVolume,
    prompt: "{円柱|えんちゅう}の {底面積|ていめんせき}を {求|もと}めるには？",
    explanation: "{底面|ていめん}は {円|えん}だから、{底面積|ていめんせき}＝{半径|はんけい}×{半径|はんけい}×3.14 で もとめるよ。",
    format: "choice",
    choices: ["{半径|はんけい}×{半径|はんけい}×3.14", "{直径|ちょっけい}×3.14", "{半径|はんけい}×{高|たか}さ", "{半径|はんけい}×2×3.14"],
    answer: "{半径|はんけい}×{半径|はんけい}×3.14",
  },
];

const proportionQuestions: Question[] = [
  {
    id: `${U.proportion}.q-1`,
    unitId: U.proportion,
    prompt: "y が x に {比例|ひれい}する とき、x が 2{倍|ばい}に なると y は？",
    explanation: "{比例|ひれい}では x が 2{倍|ばい}・3{倍|ばい}に なると、y も {同|おな}じく 2{倍|ばい}・3{倍|ばい}に なるよ。",
    format: "choice",
    choices: ["2{倍|ばい}に なる", "1/2に なる", "かわらない", "4{倍|ばい}に なる"],
    answer: "2{倍|ばい}に なる",
  },
  {
    id: `${U.proportion}.q-2`,
    unitId: U.proportion,
    prompt: "y が x に {反比例|はんぴれい}する とき、x が 2{倍|ばい}に なると y は？",
    explanation: "{反比例|はんぴれい}では x が 2{倍|ばい}に なると y は 1/2 に なる。x×y が いつも {同|おな}じ あたいに なるよ。",
    format: "choice",
    choices: ["1/2に なる", "2{倍|ばい}に なる", "かわらない", "3{倍|ばい}に なる"],
    answer: "1/2に なる",
  },
  {
    id: `${U.proportion}.q-3`,
    unitId: U.proportion,
    prompt: "y＝4×x の とき、x＝3 なら y は いくつ？",
    explanation: "y＝4×x に x＝3 を {入|い}れて 4×3＝12 だよ。",
    format: "number-input",
    answer: 12,
  },
  {
    id: `${U.proportion}.q-4`,
    unitId: U.proportion,
    prompt: "{比例|ひれい}の グラフは どんな {形|かたち}に なる？",
    explanation: "{比例|ひれい}の グラフは {原点|げんてん}（0,0）を {通|とお}る まっすぐな {直線|ちょくせん}に なるよ。",
    format: "choice",
    choices: ["{原点|げんてん}を {通|とお}る {直線|ちょくせん}", "まがった {線|せん}", "{横|よこ}に まっすぐな {線|せん}", "{円|えん}"],
    answer: "{原点|げんてん}を {通|とお}る {直線|ちょくせん}",
  },
  {
    id: `${U.proportion}.q-5`,
    unitId: U.proportion,
    prompt: "{面積|めんせき}が {一定|いってい}の {長方形|ちょうほうけい}で、たてと {横|よこ}は どんな {関係|かんけい}？",
    explanation: "たて×よこ＝{面積|めんせき}（{一定|いってい}）だから、たてが ふえると よこは へる。これは {反比例|はんぴれい}だよ。",
    format: "choice",
    choices: ["{反比例|はんぴれい}", "{比例|ひれい}", "どちらでもない", "{両方|りょうほう}"],
    answer: "{反比例|はんぴれい}",
  },
];

const combinatoricsQuestions: Question[] = [
  {
    id: `${U.combinatorics}.q-1`,
    unitId: U.combinatorics,
    prompt: "A、B の 2{人|にん}が 1れつに {並|なら}ぶ {並|なら}び{方|かた}は {何通|なんとお}り？",
    explanation: "（A,B）と（B,A）の 2{通|とお}りだよ。",
    format: "number-input",
    answer: 2,
  },
  {
    id: `${U.combinatorics}.q-2`,
    unitId: U.combinatorics,
    prompt: "A、B、C の 3{人|にん}が 1れつに {並|なら}ぶ {並|なら}び{方|かた}は {何通|なんとお}り？",
    explanation: "{先頭|せんとう}が 3{通|とお}り、つぎが 2{通|とお}り、さいごが 1{通|とお}りで 3×2×1＝6{通|とお}りだよ。",
    format: "number-input",
    answer: 6,
  },
  {
    id: `${U.combinatorics}.q-3`,
    unitId: U.combinatorics,
    prompt: "{赤|あか}・{青|あお}・{黄|き} の 3{色|しょく}から 2{色|しょく}を えらぶ {組|く}み{合|あ}わせは {何通|なんとお}り？",
    explanation: "（{赤|あか}{青|あお}）（{赤|あか}{黄|き}）（{青|あお}{黄|き}）の 3{通|とお}り。{組|く}み{合|あ}わせは じゅんばんを {考|かんが}えないよ。",
    format: "number-input",
    answer: 3,
  },
  {
    id: `${U.combinatorics}.q-4`,
    unitId: U.combinatorics,
    prompt: "4つの チームが {総|そう}{当|あ}たりで {試合|しあい}を する。{試合|しあい}は {全部|ぜんぶ}で {何試合|なんしあい}？",
    explanation: "2チームの {組|く}み{合|あ}わせの {数|かず}だから 4×3÷2＝6{試合|しあい}だよ。",
    format: "number-input",
    answer: 6,
  },
  {
    id: `${U.combinatorics}.q-5`,
    unitId: U.combinatorics,
    prompt: "「{並|なら}べ{方|かた}」と「{組|く}み{合|あ}わせ」の ちがいは？",
    explanation: "{並|なら}べ{方|かた}は じゅんばんを {考|かんが}える（A→B と B→A は べつ）。{組|く}み{合|あ}わせは じゅんばんを {考|かんが}えない（{同|おな}じ）よ。",
    format: "choice",
    choices: [
      "{並|なら}べ{方|かた}は じゅんばんを {考|かんが}え、{組|く}み{合|あ}わせは {考|かんが}えない",
      "どちらも じゅんばんを {考|かんが}える",
      "どちらも じゅんばんを {考|かんが}えない",
      "{組|く}み{合|あ}わせだけ じゅんばんを {考|かんが}える",
    ],
    answer: "{並|なら}べ{方|かた}は じゅんばんを {考|かんが}え、{組|く}み{合|あ}わせは {考|かんが}えない",
  },
];

const dataQuestions: Question[] = [
  {
    id: `${U.dataAnalysis}.q-1`,
    unitId: U.dataAnalysis,
    prompt: "{平均値|へいきんち}の もとめ{方|かた}は？",
    explanation: "{平均値|へいきんち}＝{全部|ぜんぶ}の {合計|ごうけい}÷{個数|こすう}。データを ならして 1つぶんの {大|おお}きさを {見|み}るよ。",
    format: "choice",
    choices: ["{合計|ごうけい}÷{個数|こすう}", "いちばん {大|おお}きい{数|かず}", "まん{中|なか}の{数|かず}", "いちばん {多|おお}い{数|かず}"],
    answer: "{合計|ごうけい}÷{個数|こすう}",
  },
  {
    id: `${U.dataAnalysis}.q-2`,
    unitId: U.dataAnalysis,
    prompt: "2, 4, 6, 8, 10 の {平均値|へいきんち}は？",
    explanation: "{合計|ごうけい}は 2＋4＋6＋8＋10＝30、{個数|こすう}は 5。30÷5＝6 だよ。",
    format: "number-input",
    answer: 6,
  },
  {
    id: `${U.dataAnalysis}.q-3`,
    unitId: U.dataAnalysis,
    prompt: "{中央値|ちゅうおうち}（メジアン）とは どんな {値|あたい}？",
    explanation: "{中央値|ちゅうおうち}は データを {大|おお}きさの {順|じゅん}に ならべた ときの まん{中|なか}の {値|あたい}だよ。",
    format: "choice",
    choices: ["{大|おお}きさの{順|じゅん}に ならべた まん{中|なか}の{値|あたい}", "いちばん {多|おお}い{値|あたい}", "{全部|ぜんぶ}の {合計|ごうけい}", "{平均|へいきん}の {値|あたい}"],
    answer: "{大|おお}きさの{順|じゅん}に ならべた まん{中|なか}の{値|あたい}",
  },
  {
    id: `${U.dataAnalysis}.q-4`,
    unitId: U.dataAnalysis,
    prompt: "3, 5, 5, 7, 9 の {最頻値|さいひんち}（モード）は？",
    explanation: "{最頻値|さいひんち}は いちばん {多|おお}く {出|で}て くる{値|あたい}。5が 2{回|かい}で いちばん {多|おお}いから 5 だよ。",
    format: "number-input",
    answer: 5,
  },
  {
    id: `${U.dataAnalysis}.q-5`,
    unitId: U.dataAnalysis,
    prompt: "データを ある はばの {区間|くかん}ごとに {整理|せいり}した {表|ひょう}を {何|なに}という？",
    explanation: "「0〜10」「10〜20」などの {区間|くかん}ごとに {個数|こすう}を まとめた {表|ひょう}を {度数分布表|どすうぶんぷひょう}と いうよ。",
    format: "choice",
    choices: ["{度数分布表|どすうぶんぷひょう}", "{九九表|くくひょう}", "{時間割表|じかんわりひょう}", "せいせき{表|ひょう}"],
    answer: "{度数分布表|どすうぶんぷひょう}",
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────

export const sansuuG6Contents: Record<string, UnitContent> = {
  [U.symmetry]: {
    unitId: U.symmetry,
    learn: {
      unitId: U.symmetry,
      steps: [
        {
          heading: "{線対称|せんたいしょう}って なに？",
          body: "1{本|ほん}の {直線|ちょくせん}で おると、{左右|さゆう}が ぴったり かさなる {図形|ずけい}を {線対称|せんたいしょう}と いうよ。その {直線|ちょくせん}を「{対称|たいしょう}の{軸|じく}」と いう。",
          visual: { kind: "emoji", value: "🦋", caption: "ちょうちょは {線対称|せんたいしょう}" },
        },
        {
          heading: "{点対称|てんたいしょう}って なに？",
          body: "ある{点|てん}（{対称|たいしょう}の{中心|ちゅうしん}）を {中心|ちゅうしん}に 180°まわすと もとの {形|かたち}に かさなる {図形|ずけい}を {点対称|てんたいしょう}と いうよ。",
          visual: { kind: "emoji", value: "🔁 ▢", caption: "180°まわすと かさなる" },
        },
        {
          heading: "{軸|じく}や {中心|ちゅうしん}を {見|み}つけよう",
          body: "{正方形|せいほうけい}は {軸|じく}が 4{本|ほん}で {点対称|てんたいしょう}、{円|えん}は {軸|じく}が {何本|なんぼん}も あって {点対称|てんたいしょう}。{形|かたち}ごとに しらべてみよう。",
          visual: { kind: "emoji", value: "⬜ ⭕ 🔺", caption: "{形|かたち}で ちがう {対称|たいしょう}" },
        },
      ],
    },
    test: { unitId: U.symmetry, questions: symmetryQuestions, questionCount: 5 },
  },

  [U.letters]: {
    unitId: U.letters,
    learn: {
      unitId: U.letters,
      steps: [
        {
          heading: "{文字|もじ}で {数|かず}を あらわす",
          body: "わからない {数|かず}や いろいろ かわる {数|かず}を、x や a などの {文字|もじ}で あらわすよ。「1{本|ぼん} x{円|えん}」のように つかう。",
          visual: { kind: "emoji", value: "🥤 ＝ x{円|えん}", caption: "{数|かず}の かわりに {文字|もじ}" },
        },
        {
          heading: "ことばを {式|しき}に する",
          body: "「x{円|えん}の ジュース 3{本|ぼん}」は x×3。ことばの {関係|かんけい}を そのまま {式|しき}に できるのが {便利|べんり}な ところ。",
          visual: { kind: "emoji", value: "x × 3 ＝ {代金|だいきん}", caption: "ことば → {式|しき}" },
        },
        {
          heading: "x の あたいを もとめる",
          body: "x×4＝20 のような {式|しき}から、ぎゃくの {計算|けいさん}で x＝5 と もとめられるよ。",
          visual: { kind: "emoji", value: "x×4＝20 → x＝5", caption: "ぎゃくの {計算|けいさん}" },
        },
      ],
    },
    test: { unitId: U.letters, questions: lettersQuestions, questionCount: 5 },
  },

  [U.fractionMulDiv]: {
    unitId: U.fractionMulDiv,
    learn: {
      unitId: U.fractionMulDiv,
      steps: [
        {
          heading: "{分数|ぶんすう}の かけ{算|ざん}",
          body: "{分数|ぶんすう}どうしの かけ{算|ざん}は、ぶんし×ぶんし、ぶんぼ×ぶんぼ。{最後|さいご}に やくぶんできるか たしかめよう。",
          visual: { kind: "emoji", value: "2/3 × 3/4 ＝ 1/2", caption: "ぶんし・ぶんぼを かける" },
        },
        {
          heading: "{分数|ぶんすう}の わり{算|ざん}",
          body: "わる{数|かず}を ひっくりかえした「ぎゃくすう」を かければ よいよ。3/5÷2/3＝3/5×3/2。",
          visual: { kind: "emoji", value: "÷ 2/3 → × 3/2", caption: "ぎゃくすうを かける" },
        },
      ],
    },
    test: { unitId: U.fractionMulDiv, questions: fractionQuestions, questionCount: 5 },
  },

  [U.ratio]: {
    unitId: U.ratio,
    learn: {
      unitId: U.ratio,
      steps: [
        {
          heading: "{比|ひ}って なに？",
          body: "2つの {数|かず}の わりあいを「2:3」のように あらわすのが {比|ひ}だよ。{前|まえ}÷{後|うし}ろが「{比|ひ}の{値|あたい}」。",
          visual: { kind: "emoji", value: "🥤:💧 ＝ 1:4", caption: "わりあいを あらわす" },
        },
        {
          heading: "{等|ひと}しい {比|ひ}",
          body: "{両方|りょうほう}を {同|おな}じ{数|かず}で かけても わっても {比|ひ}は かわらない。12:18 は 6で わって 2:3 に できる。",
          visual: { kind: "emoji", value: "2:3 ＝ 4:6 ＝ 6:9", caption: "{等|ひと}しい {比|ひ}" },
        },
        {
          heading: "{比|ひ}を つかう",
          body: "「2:5 で みかんが 6{個|こ}」なら 3{倍|ばい}して りんごは 15{個|こ}。わりあいを そろえて もとめるよ。",
          visual: { kind: "emoji", value: "2:5 → 6:15", caption: "{何倍|なんばい}かを {考|かんが}える" },
        },
      ],
    },
    test: { unitId: U.ratio, questions: ratioQuestions, questionCount: 5 },
  },

  [U.scaleFigures]: {
    unitId: U.scaleFigures,
    learn: {
      unitId: U.scaleFigures,
      steps: [
        {
          heading: "{拡大図|かくだいず}と {縮図|しゅくず}",
          body: "{形|かたち}を かえずに {大|おお}きくした {図|ず}が {拡大図|かくだいず}、{小|ちい}さくした {図|ず}が {縮図|しゅくず}。{辺|へん}の {長|なが}さは {同|おな}じ わりあいで かわる。",
          visual: { kind: "emoji", value: "🔺 → 🔺({大|だい})", caption: "{形|かたち}は そのまま" },
        },
        {
          heading: "{角|かく}は かわらない",
          body: "{拡大|かくだい}・{縮小|しゅくしょう}しても {角|かく}の {大|おお}きさは かわらないよ。かわるのは {辺|へん}の {長|なが}さだけ。",
          visual: { kind: "emoji", value: "∠ ＝ ∠", caption: "{角|かく}は {同|おな}じ" },
        },
        {
          heading: "{縮尺|しゅくしゃく}で きょりを もとめる",
          body: "{地図|ちず}の 1/1000 などの {縮尺|しゅくしゃく}を つかうと、{地図|ちず}の {長|なが}さから じっさいの きょりを {計算|けいさん}できるよ。",
          visual: { kind: "emoji", value: "🗺️ 2cm → 20m", caption: "{縮尺|しゅくしゃく}の {利用|りよう}" },
        },
      ],
    },
    test: { unitId: U.scaleFigures, questions: scaleQuestions, questionCount: 5 },
  },

  [U.circleArea]: {
    unitId: U.circleArea,
    learn: {
      unitId: U.circleArea,
      steps: [
        {
          heading: "{円|えん}の {面積|めんせき}の {公式|こうしき}",
          body: "{円|えん}の {面積|めんせき}＝{半径|はんけい}×{半径|はんけい}×{円周率|えんしゅうりつ}（3.14）。{半径|はんけい}を 2{回|かい} かけてから 3.14 を かけるよ。",
          visual: { kind: "emoji", value: "⭕ ＝ {半径|はんけい}×{半径|はんけい}×3.14", caption: "{公式|こうしき}を おぼえよう" },
        },
        {
          heading: "{計算|けいさん}してみよう",
          body: "{半径|はんけい} 10cm なら 10×10×3.14＝314cm²。{直径|ちょっけい}しか わからない ときは まず {半分|はんぶん}にして {半径|はんけい}を {出|だ}す。",
          visual: { kind: "emoji", value: "r=10 → 314cm²", caption: "あてはめて {計算|けいさん}" },
        },
      ],
    },
    test: { unitId: U.circleArea, questions: circleAreaQuestions, questionCount: 5 },
  },

  [U.solidVolume]: {
    unitId: U.solidVolume,
    learn: {
      unitId: U.solidVolume,
      steps: [
        {
          heading: "{体積|たいせき}の {公式|こうしき}",
          body: "{角柱|かくちゅう}も {円柱|えんちゅう}も {体積|たいせき}＝{底面積|ていめんせき}×{高|たか}さ。{下|した}の {面|めん}の {広|ひろ}さに {高|たか}さを かけるだけだよ。",
          visual: { kind: "emoji", value: "📦 ＝ {底面積|ていめんせき}×{高|たか}さ", caption: "{共通|きょうつう}の {公式|こうしき}" },
        },
        {
          heading: "{円柱|えんちゅう}の {体積|たいせき}",
          body: "{円柱|えんちゅう}は {底面|ていめん}が {円|えん}。{底面積|ていめんせき}＝{半径|はんけい}×{半径|はんけい}×3.14 を {先|さき}に {出|だ}してから {高|たか}さを かけるよ。",
          visual: { kind: "emoji", value: "🥫 r=10,h=3 → 942", caption: "{円|えん}の {底面積|ていめんせき}×{高|たか}さ" },
        },
      ],
    },
    test: { unitId: U.solidVolume, questions: volumeQuestions, questionCount: 5 },
  },

  [U.proportion]: {
    unitId: U.proportion,
    learn: {
      unitId: U.proportion,
      steps: [
        {
          heading: "{比例|ひれい}",
          body: "x が 2{倍|ばい}・3{倍|ばい}に なると y も 2{倍|ばい}・3{倍|ばい}に なる {関係|かんけい}が {比例|ひれい}。y＝きまった{数|かず}×x で あらわせるよ。",
          visual: { kind: "emoji", value: "x↑2{倍|ばい} → y↑2{倍|ばい}", caption: "{同|おな}じだけ ふえる" },
        },
        {
          heading: "{反比例|はんぴれい}",
          body: "x が 2{倍|ばい}に なると y が 1/2 に なる {関係|かんけい}が {反比例|はんぴれい}。x×y が いつも {同|おな}じに なるのが とくちょう。",
          visual: { kind: "emoji", value: "x↑2{倍|ばい} → y↓1/2", caption: "かけると {一定|いってい}" },
        },
        {
          heading: "グラフで {見|み}る",
          body: "{比例|ひれい}の グラフは {原点|げんてん}を {通|とお}る {直線|ちょくせん}、{反比例|はんぴれい}の グラフは なめらかな {曲線|きょくせん}に なるよ。",
          visual: { kind: "emoji", value: "📈 {直線|ちょくせん} / {曲線|きょくせん}", caption: "{形|かたち}の ちがい" },
        },
      ],
    },
    test: { unitId: U.proportion, questions: proportionQuestions, questionCount: 5 },
  },

  [U.combinatorics]: {
    unitId: U.combinatorics,
    learn: {
      unitId: U.combinatorics,
      steps: [
        {
          heading: "{並|なら}べ{方|かた}（じゅんばん あり）",
          body: "3{人|にん}が 1れつに {並|なら}ぶ {並|なら}び{方|かた}は、{先頭|せんとう}3{通|とお}り×つぎ2{通|とお}り×さいご1{通|とお}り＝6{通|とお}り。じゅんばんを {考|かんが}えるよ。",
          visual: { kind: "emoji", value: "ABC … 6{通|とお}り", caption: "じゅんばんを {考|かんが}える" },
        },
        {
          heading: "{組|く}み{合|あ}わせ（じゅんばん なし）",
          body: "3{色|しょく}から 2{色|しょく} えらぶような ときは じゅんばんを {考|かんが}えない。（{赤|あか}{青|あお}）と（{青|あお}{赤|あか}）は {同|おな}じで 1{通|とお}り。",
          visual: { kind: "emoji", value: "🔴🔵🟡 → 3{通|とお}り", caption: "えらぶだけ" },
        },
        {
          heading: "{落|お}ちなく {数|かぞ}える",
          body: "{図|ず}（じゅもく{図|ず}）や {表|ひょう}を つかって、もれや {重|かさ}なりが ないように {順序|じゅんじょ}よく {数|かぞ}えよう。",
          visual: { kind: "emoji", value: "🌳 じゅもく{図|ず}", caption: "もれなく {数|かぞ}える" },
        },
      ],
    },
    test: { unitId: U.combinatorics, questions: combinatoricsQuestions, questionCount: 5 },
  },

  [U.dataAnalysis]: {
    unitId: U.dataAnalysis,
    learn: {
      unitId: U.dataAnalysis,
      steps: [
        {
          heading: "3つの {代表値|だいひょうち}",
          body: "{平均値|へいきんち}（{合計|ごうけい}÷{個数|こすう}）、{中央値|ちゅうおうち}（まん{中|なか}の{値|あたい}）、{最頻値|さいひんち}（いちばん {多|おお}い{値|あたい}）で データの ようすを つかむよ。",
          visual: { kind: "emoji", value: "{平均|へいきん}・{中央|ちゅうおう}・{最頻|さいひん}", caption: "{代表値|だいひょうち}" },
        },
        {
          heading: "{度数分布表|どすうぶんぷひょう}と グラフ",
          body: "データを {区間|くかん}ごとに {整理|せいり}した {表|ひょう}が {度数分布表|どすうぶんぷひょう}。それを ぼうグラフのように したものが ヒストグラム。",
          visual: { kind: "emoji", value: "📊 {区間|くかん}ごとに {整理|せいり}", caption: "ちらばりを {見|み}る" },
        },
      ],
    },
    test: { unitId: U.dataAnalysis, questions: dataQuestions, questionCount: 5 },
  },
};
