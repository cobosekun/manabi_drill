// ══════════════════════════════════════════
// カリキュラム: 社会（しゃかい）小3
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 基準テンプレ実装 = src/data/curriculum/sansuu/g1.ts と同形。
//
// 【申し送り（中央集約者へ）】
//  ・SubjectId（src/types/drill.ts）には既に "shakai" が定義済みのため、本ファイルは型を通る。
//    （Manager 指示の「SubjectId 未対応でも型を通す局所吸収」は不要だった＝types は未編集のまま）。
//  ・index.ts は未編集。集約（curriculum への合流）は中央で行うこと。
//
// 【ルビ記法（2026-06-02〜 全 authoring 必須）】
//  ・全表示テキスト（title / realWorldUse / 本文 / 問題文 / 選択肢 / 解説）は {漢字|よみ} 記法。
//  ・ひらがな/カタカナ/数字/記号はそのまま。送り仮名は基底に含めない（{食|た}べる）。
//  ・Subject.formalName / Domain.formalName は管理用メタのため通常のプレーン漢字（非表示前提）。
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
  emoji: "🗺️",
  theme: "amber",
  grades: [3, 4, 5, 6],
  testable: true,
};

// ── 領域（学習指導要領 小3社会の内容に対応） ──────────────

export const shakaiG3Domains: Domain[] = [
  {
    id: "shakai.geography",
    subjectId: "shakai",
    name: "{地域|ちいき}の ようす",
    formalName: "地理（身近な地域・市の様子）",
  },
  {
    id: "shakai.work",
    subjectId: "shakai",
    name: "くらしと しごと",
    formalName: "生産・販売の仕事",
  },
  {
    id: "shakai.safety",
    subjectId: "shakai",
    name: "くらしを まもる",
    formalName: "地域の安全を守る働き",
  },
  {
    id: "shakai.history",
    subjectId: "shakai",
    name: "うつりかわり",
    formalName: "市の移り変わり（歴史のはじまり）",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites を辺とする DAG。参照は本ファイル内で完結させ並列衝突を防ぐ）:
//
//   town-features ─┬─▶ map-symbols ─┬─▶ factory-farm
//                  ├─▶ shops-shopping ─▶ factory-farm
//                  ├─▶ map-symbols ──▶ fire-police
//                  └─▶ old-tools
//
const U = {
  townFeatures: "shakai.g3.town-features",
  mapSymbols: "shakai.g3.map-symbols",
  shopsShopping: "shakai.g3.shops-shopping",
  factoryFarm: "shakai.g3.factory-farm",
  firePolice: "shakai.g3.fire-police",
  oldTools: "shakai.g3.old-tools",
} as const;

export const shakaiG3Units: Unit[] = [
  {
    id: U.townFeatures,
    subjectId: "shakai",
    grade: 3,
    domainId: "shakai.geography",
    title: "{町|まち}の ようす",
    order: 1,
    realWorldUse: "{自分|じぶん}の すんでいる {町|まち}に なにが あるか わかると、おでかけや {引|ひ}っこしの ときに やくだつよ。",
    leadsTo: [U.mapSymbols, U.shopsShopping, U.oldTools],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.mapSymbols,
    subjectId: "shakai",
    grade: 3,
    domainId: "shakai.geography",
    title: "{地図|ちず}{記号|きごう}と {方位|ほうい}",
    order: 2,
    realWorldUse: "{地図|ちず}{記号|きごう}や {方位|ほうい}が わかると、{知|し}らない {町|まち}でも {地図|ちず}を {見|み}て あるけるよ。",
    leadsTo: [U.factoryFarm, U.firePolice],
    prerequisites: [U.townFeatures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.shopsShopping,
    subjectId: "shakai",
    grade: 3,
    domainId: "shakai.work",
    title: "{店|みせ}で はたらく {人|ひと}と {買|か}い{物|もの}",
    order: 3,
    realWorldUse: "お{店|みせ}の くふうが わかると、{買|か}い{物|もの}が じょうずに できて、はたらく {人|ひと}の しごとも わかるよ。",
    leadsTo: [U.factoryFarm],
    prerequisites: [U.townFeatures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.factoryFarm,
    subjectId: "shakai",
    grade: 3,
    domainId: "shakai.work",
    title: "{工場|こうじょう}や {農家|のうか}の しごと",
    order: 4,
    realWorldUse: "やさいや しなものが どうやって {作|つく}られるか わかると、{毎日|まいにち}の ごはんや {道具|どうぐ}を たいせつに できるよ。",
    leadsTo: [],
    prerequisites: [U.shopsShopping, U.mapSymbols],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.firePolice,
    subjectId: "shakai",
    grade: 3,
    domainId: "shakai.safety",
    title: "くらしを {守|まも}る（{消防|しょうぼう}・{警察|けいさつ}）",
    order: 5,
    realWorldUse: "{火事|かじ}や じこの とき、だれに どう しらせれば よいか わかると、じぶんや みんなを {守|まも}れるよ。",
    leadsTo: [],
    prerequisites: [U.mapSymbols],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.oldTools,
    subjectId: "shakai",
    grade: 3,
    domainId: "shakai.history",
    title: "{市|し}の うつりかわりと {昔|むかし}の {道具|どうぐ}",
    order: 6,
    realWorldUse: "{昔|むかし}と {今|いま}の くらしを くらべると、{道具|どうぐ}が べんりに なってきた ことが わかるよ。",
    leadsTo: [],
    prerequisites: [U.townFeatures],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// テストは固定 questions[]（4択）。全問 explanation 必須。文言は全漢字ルビ。

// {町|まち}の ようす
const townFeaturesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.townFeatures}.q-1`,
    unitId: U.townFeatures,
    prompt: "{町|まち}を {高|たか}い ところから {見|み}ると、よく わかるのは どれ かな？",
    explanation: "{高|たか}い ところから {見|み}ると、どこに {家|いえ}や {店|みせ}・{田|た}んぼが あるか、{町|まち}{全体|ぜんたい}の ようすが わかるよ。",
    visual: { kind: "emoji", value: "🏙️👀", caption: "{町|まち}を 見わたす" },
    format: "choice",
    choices: ["{土地|とち}の ようす", "{明日|あした}の てんき", "{人|ひと}の きもち", "{時計|とけい}の {時間|じかん}"],
    answer: "{土地|とち}の ようす",
  },
  {
    id: `${U.townFeatures}.q-2`,
    unitId: U.townFeatures,
    prompt: "{駅|えき}の まわりに {多|おお}いのは どれ かな？",
    explanation: "{駅|えき}の まわりは {人|ひと}が あつまるので、お{店|みせ}や ビルが {多|おお}いよ。",
    visual: { kind: "emoji", value: "🚉🏬", caption: "{駅|えき}の まわり" },
    format: "choice",
    choices: ["お{店|みせ}や ビル", "{広|ひろ}い {田|た}んぼ", "{高|たか}い {山|やま}", "{大|おお}きな {湖|みずうみ}"],
    answer: "お{店|みせ}や ビル",
  },
  {
    id: `${U.townFeatures}.q-3`,
    unitId: U.townFeatures,
    prompt: "{田|た}んぼや {畑|はたけ}が {広|ひろ}がるのは どんな ところ かな？",
    explanation: "{田|た}んぼや {畑|はたけ}は、{土地|とち}が {広|ひろ}くて {水|みず}が ある まちはずれや {郊外|こうがい}に {多|おお}いよ。",
    visual: { kind: "emoji", value: "🌾🚜", caption: "{田|た}んぼと {畑|はたけ}" },
    format: "choice",
    choices: ["{土地|とち}の {広|ひろ}い ところ", "{駅|えき}の まんなか", "ビルの {屋上|おくじょう}", "{海|うみ}の {中|なか}"],
    answer: "{土地|とち}の {広|ひろ}い ところ",
  },
  {
    id: `${U.townFeatures}.q-4`,
    unitId: U.townFeatures,
    prompt: "{町|まち}の ようすを しらべる ほうほうは どれ かな？",
    explanation: "じっさいに あるいて しらべる「たんけん」や「{見学|けんがく}」を すると、{町|まち}の ようすが よく わかるよ。",
    visual: { kind: "emoji", value: "🚶🔍", caption: "まちたんけん" },
    format: "choice",
    choices: ["あるいて たんけんする", "{目|め}を つぶる", "テレビゲームを する", "なにも しない"],
    answer: "あるいて たんけんする",
  },
  {
    id: `${U.townFeatures}.q-5`,
    unitId: U.townFeatures,
    prompt: "しらべた {町|まち}の ようすを みんなに つたえる ときは どうする かな？",
    explanation: "しらべた ことを {絵|え}{地図|ちず}や ポスターに まとめると、ほかの {人|ひと}にも わかりやすく つたえられるよ。",
    visual: { kind: "emoji", value: "🗺️✏️", caption: "{絵|え}{地図|ちず}に まとめる" },
    format: "choice",
    choices: ["{絵|え}{地図|ちず}に まとめる", "{秘密|ひみつ}に する", "わすれる", "{捨|す}てる"],
    answer: "{絵|え}{地図|ちず}に まとめる",
  },
];

// {地図|ちず}{記号|きごう}と {方位|ほうい}
const mapSymbolsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.mapSymbols}.q-1`,
    unitId: U.mapSymbols,
    prompt: "{地図|ちず}で ふつう {上|うえ} は どの {方位|ほうい} かな？",
    explanation: "{地図|ちず}は とくに しるしが なければ、{上|うえ}が「{北|きた}」だよ。{下|した}が {南|みなみ}、{右|みぎ}が {東|ひがし}、{左|ひだり}が {西|にし}だね。",
    visual: { kind: "emoji", value: "🧭⬆️", caption: "{上|うえ}は {北|きた}" },
    format: "choice",
    choices: ["{北|きた}", "{南|みなみ}", "{東|ひがし}", "{西|にし}"],
    answer: "{北|きた}",
  },
  {
    id: `${U.mapSymbols}.q-2`,
    unitId: U.mapSymbols,
    prompt: "「{文|ぶん}」の かたちの {地図|ちず}{記号|きごう}は なにを あらわす かな？",
    explanation: "「{文|ぶん}」は {学校|がっこう}の {地図|ちず}{記号|きごう}だよ。{字|じ}を {学|まな}ぶ ところ だから「{文|ぶん}」なんだ。",
    visual: { kind: "emoji", value: "🏫", caption: "{学校|がっこう}＝{文|ぶん}" },
    format: "choice",
    choices: ["{学校|がっこう}", "{病院|びょういん}", "{駅|えき}", "{公園|こうえん}"],
    answer: "{学校|がっこう}",
  },
  {
    id: `${U.mapSymbols}.q-3`,
    unitId: U.mapSymbols,
    prompt: "「〒」の {記号|きごう}は なにを あらわす かな？",
    explanation: "「〒」は {郵便局|ゆうびんきょく}の {記号|きごう}だよ。{手紙|てがみ}や {荷物|にもつ}を おくる ところ だね。",
    visual: { kind: "emoji", value: "📮", caption: "〒＝{郵便局|ゆうびんきょく}" },
    format: "choice",
    choices: ["{郵便局|ゆうびんきょく}", "{学校|がっこう}", "{交番|こうばん}", "{図書館|としょかん}"],
    answer: "{郵便局|ゆうびんきょく}",
  },
  {
    id: `${U.mapSymbols}.q-4`,
    unitId: U.mapSymbols,
    prompt: "{方位|ほうい}を しらべる ときに つかう {道具|どうぐ}は どれ かな？",
    explanation: "「{方位|ほうい}{磁針|じしん}（ほういじしん）」は はりが {北|きた}を さすので、{方位|ほうい}が わかるよ。",
    visual: { kind: "emoji", value: "🧭", caption: "{方位|ほうい}{磁針|じしん}" },
    format: "choice",
    choices: ["{方位|ほうい}{磁針|じしん}", "ものさし", "{時計|とけい}", "はさみ"],
    answer: "{方位|ほうい}{磁針|じしん}",
  },
  {
    id: `${U.mapSymbols}.q-5`,
    unitId: U.mapSymbols,
    prompt: "{鳥居|とりい}の かたちの {地図|ちず}{記号|きごう}は なにを あらわす かな？",
    explanation: "{鳥居|とりい}の かたちは「{神社|じんじゃ}」の {記号|きごう}だよ。おまつりの ある ところ だね。",
    visual: { kind: "emoji", value: "⛩️", caption: "{神社|じんじゃ}" },
    format: "choice",
    choices: ["{神社|じんじゃ}", "お{寺|てら}", "{病院|びょういん}", "{工場|こうじょう}"],
    answer: "{神社|じんじゃ}",
  },
];

// {店|みせ}で はたらく {人|ひと}と {買|か}い{物|もの}
const shopsShoppingQuestions: ChoiceQuestion[] = [
  {
    id: `${U.shopsShopping}.q-1`,
    unitId: U.shopsShopping,
    prompt: "スーパーマーケットで しなものを {見|み}やすく する くふうは どれ かな？",
    explanation: "{同|おな}じ なかまの しなものを まとめて ならべると、おきゃくさんが さがしやすく なるよ。",
    visual: { kind: "emoji", value: "🛒🧺", caption: "なかまごとに ならべる" },
    format: "choice",
    choices: ["なかまごとに ならべる", "ばらばらに おく", "かくして おく", "{外|そと}に だす"],
    answer: "なかまごとに ならべる",
  },
  {
    id: `${U.shopsShopping}.q-2`,
    unitId: U.shopsShopping,
    prompt: "しなものの ねだんが わかるように つける ものは どれ かな？",
    explanation: "{値札|ねふだ}（ねふだ）を つけると、いくらか ひとめで わかるよ。",
    visual: { kind: "emoji", value: "🏷️💴", caption: "ねふだ" },
    format: "choice",
    choices: ["ねふだ", "シール{絵|え}", "おもちゃ", "{鏡|かがみ}"],
    answer: "ねふだ",
  },
  {
    id: `${U.shopsShopping}.q-3`,
    unitId: U.shopsShopping,
    prompt: "やさいが どこで {作|つく}られたかを しめす ものは どれ かな？",
    explanation: "「{産地|さんち}（さんち）」の ひょうじを {見|み}ると、どこで {作|つく}られた やさいか わかるよ。",
    visual: { kind: "emoji", value: "🥬🗾", caption: "{産地|さんち}の ひょうじ" },
    format: "choice",
    choices: ["{産地|さんち}の ひょうじ", "おもさだけ", "{色|いろ}だけ", "なにも ない"],
    answer: "{産地|さんち}の ひょうじ",
  },
  {
    id: `${U.shopsShopping}.q-4`,
    unitId: U.shopsShopping,
    prompt: "おきゃくさんに やすい {品物|しなもの}を しらせる ための ものは どれ かな？",
    explanation: "「ちらし（{広告|こうこく}）」を {配|くば}ると、おやすい {品物|しなもの}や {特売|とくばい}を しらせられるよ。",
    visual: { kind: "emoji", value: "📰", caption: "ちらし" },
    format: "choice",
    choices: ["ちらし", "{石|いし}", "かさ", "ボール"],
    answer: "ちらし",
  },
  {
    id: `${U.shopsShopping}.q-5`,
    unitId: U.shopsShopping,
    prompt: "{品物|しなもの}を {店|みせ}まで はこぶのに つかう ものは どれ かな？",
    explanation: "とおくの {産地|さんち}から、トラックで まいにち しんせんな {品物|しなもの}を はこんで くるよ。",
    visual: { kind: "emoji", value: "🚚", caption: "トラックで はこぶ" },
    format: "choice",
    choices: ["トラック", "じてんしゃ かご", "ベビーカー", "ぼうし"],
    answer: "トラック",
  },
];

// {工場|こうじょう}や {農家|のうか}の しごと
const factoryFarmQuestions: ChoiceQuestion[] = [
  {
    id: `${U.factoryFarm}.q-1`,
    unitId: U.factoryFarm,
    prompt: "{農家|のうか}の {人|ひと}が そだてる ものは どれ かな？",
    explanation: "{農家|のうか}の {人|ひと}は やさいや くだもの、{米|こめ}などを そだてて、わたしたちの ごはんを ささえて いるよ。",
    visual: { kind: "emoji", value: "🥕🍅🌾", caption: "やさいや くだもの" },
    format: "choice",
    choices: ["やさいや くだもの", "じどうしゃ", "テレビ", "ふく"],
    answer: "やさいや くだもの",
  },
  {
    id: `${U.factoryFarm}.q-2`,
    unitId: U.factoryFarm,
    prompt: "{工場|こうじょう}で たくさんの ものを {作|つく}る ために つかう ものは どれ かな？",
    explanation: "{工場|こうじょう}では {機械|きかい}（きかい）を つかって、{同|おな}じ ものを はやく たくさん {作|つく}れるよ。",
    visual: { kind: "emoji", value: "🏭⚙️", caption: "きかいで {作|つく}る" },
    format: "choice",
    choices: ["きかい", "えんぴつ だけ", "ゆび だけ", "おはし"],
    answer: "きかい",
  },
  {
    id: `${U.factoryFarm}.q-3`,
    unitId: U.factoryFarm,
    prompt: "{食|た}べものを {作|つく}る {工場|こうじょう}で とくに きを つける ことは どれ かな？",
    explanation: "{食|た}べものの {工場|こうじょう}では、せいけつ（きれいに する こと）と あんぜんに とても きを つけて いるよ。",
    visual: { kind: "emoji", value: "🧼🥛", caption: "せいけつ・あんぜん" },
    format: "choice",
    choices: ["せいけつに する", "よごす", "あそぶ", "ねる"],
    answer: "せいけつに する",
  },
  {
    id: `${U.factoryFarm}.q-4`,
    unitId: U.factoryFarm,
    prompt: "{作|つく}った やさいや {品物|しなもの}は どうやって {店|みせ}へ いく かな？",
    explanation: "{作|つく}った ものは トラックなどで {店|みせ}まで はこばれて、わたしたちが {買|か}えるように なるよ。",
    visual: { kind: "emoji", value: "🚚🏬", caption: "{店|みせ}へ はこぶ" },
    format: "choice",
    choices: ["トラックで はこぶ", "そのまま {畑|はたけ}に おく", "{空|そら}に なげる", "{土|つち}に うめる"],
    answer: "トラックで はこぶ",
  },
  {
    id: `${U.factoryFarm}.q-5`,
    unitId: U.factoryFarm,
    prompt: "{農家|のうか}の {人|ひと}が てんきを よく {気|き}に するのは なぜ かな？",
    explanation: "やさいや {米|こめ}は てんきで そだちかたが かわるので、{農家|のうか}は てんきを よく {見|み}て せわを するよ。",
    visual: { kind: "emoji", value: "☀️🌧️🌾", caption: "てんきと そだち" },
    format: "choice",
    choices: ["そだちかたが かわるから", "あそびたいから", "ねむいから", "{関係|かんけい}ないから"],
    answer: "そだちかたが かわるから",
  },
];

// くらしを {守|まも}る（{消防|しょうぼう}・{警察|けいさつ}）
const firePoliceQuestions: ChoiceQuestion[] = [
  {
    id: `${U.firePolice}.q-1`,
    unitId: U.firePolice,
    prompt: "{火事|かじ}の ときに かける {電話|でんわ}{番号|ばんごう}は どれ かな？",
    explanation: "{火事|かじ}や きゅうびょうの ときは「119」を かけると、{消防車|しょうぼうしゃ}や {救急車|きゅうきゅうしゃ}が きて くれるよ。",
    visual: { kind: "emoji", value: "🚒🔥", caption: "119" },
    format: "choice",
    choices: ["119", "110", "117", "100"],
    answer: "119",
  },
  {
    id: `${U.firePolice}.q-2`,
    unitId: U.firePolice,
    prompt: "じこや どろぼうの ときに かける {電話|でんわ}{番号|ばんごう}は どれ かな？",
    explanation: "じこや じけんの ときは「110」を かけると、{警察|けいさつ}が きて くれるよ。",
    visual: { kind: "emoji", value: "🚓", caption: "110" },
    format: "choice",
    choices: ["110", "119", "118", "111"],
    answer: "110",
  },
  {
    id: `${U.firePolice}.q-3`,
    unitId: U.firePolice,
    prompt: "{火|ひ}を けす しごとを する {人|ひと}は だれ かな？",
    explanation: "「{消防士|しょうぼうし}（しょうぼうし）」が {火事|かじ}を けしたり、{人|ひと}を たすけたり するよ。",
    visual: { kind: "emoji", value: "🧑‍🚒", caption: "{消防士|しょうぼうし}" },
    format: "choice",
    choices: ["{消防士|しょうぼうし}", "{先生|せんせい}", "コック", "うんてんしゅ"],
    answer: "{消防士|しょうぼうし}",
  },
  {
    id: `${U.firePolice}.q-4`,
    unitId: U.firePolice,
    prompt: "{町|まち}の あんぜんを {守|まも}る {警察|けいさつ}の {小|ちい}さな たてものは どれ かな？",
    explanation: "「{交番|こうばん}（こうばん）」には {警察|けいさつ}の {人|ひと}が いて、まちの あんぜんを {守|まも}って いるよ。",
    visual: { kind: "emoji", value: "🚨🏠", caption: "{交番|こうばん}" },
    format: "choice",
    choices: ["{交番|こうばん}", "{病院|びょういん}", "{図書館|としょかん}", "{駅|えき}"],
    answer: "{交番|こうばん}",
  },
  {
    id: `${U.firePolice}.q-5`,
    unitId: U.firePolice,
    prompt: "{火事|かじ}に そなえて まちの ところどころに ある ものは どれ かな？",
    explanation: "「{消火|しょうか}せん（しょうかせん）」は {火事|かじ}の とき {水|みず}を だす ための もので、まちの あちこちに あるよ。",
    visual: { kind: "emoji", value: "🚒💧", caption: "{消火|しょうか}せん" },
    format: "choice",
    choices: ["{消火|しょうか}せん", "じはんき", "ポスト", "ベンチ"],
    answer: "{消火|しょうか}せん",
  },
];

// {市|し}の うつりかわりと {昔|むかし}の {道具|どうぐ}
const oldToolsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.oldTools}.q-1`,
    unitId: U.oldTools,
    prompt: "{昔|むかし}、ごはんを たくのに つかった {道具|どうぐ}は どれ かな？",
    explanation: "{昔|むかし}は「かまど」で まきを もやして ごはんを たいて いたよ。{今|いま}は すいはんきが あるね。",
    visual: { kind: "emoji", value: "🔥🍚", caption: "かまど" },
    format: "choice",
    choices: ["かまど", "れいぞうこ", "そうじき", "テレビ"],
    answer: "かまど",
  },
  {
    id: `${U.oldTools}.q-2`,
    unitId: U.oldTools,
    prompt: "{昔|むかし}、{水|みず}を くんだ ところは どれ かな？",
    explanation: "{昔|むかし}は「{井戸|いど}（いど）」から {水|みず}を くんで いたよ。{今|いま}は すいどうが あって べんりだね。",
    visual: { kind: "emoji", value: "🪣💧", caption: "{井戸|いど}" },
    format: "choice",
    choices: ["{井戸|いど}", "じゃぐち", "シャワー", "プール"],
    answer: "{井戸|いど}",
  },
  {
    id: `${U.oldTools}.q-3`,
    unitId: U.oldTools,
    prompt: "{昔|むかし}、せんたくに つかった {道具|どうぐ}は どれ かな？",
    explanation: "{昔|むかし}は「せんたく{板|いた}（せんたくいた）」で {手|て}で こすって あらって いたよ。{今|いま}は せんたくきが あるね。",
    visual: { kind: "emoji", value: "🧺", caption: "せんたく{板|いた}" },
    format: "choice",
    choices: ["せんたく{板|いた}", "せんたくき", "そうじき", "ドライヤー"],
    answer: "せんたく{板|いた}",
  },
  {
    id: `${U.oldTools}.q-4`,
    unitId: U.oldTools,
    prompt: "{今|いま}と {昔|むかし}の くらしを くらべる しらべかたは どれ かな？",
    explanation: "{年表|ねんぴょう}や、{古|ふる}い {道具|どうぐ}を あつめた {資料館|しりょうかん}を {見|み}ると、うつりかわりが わかるよ。",
    visual: { kind: "emoji", value: "📜🏛️", caption: "{年表|ねんぴょう}・{資料館|しりょうかん}" },
    format: "choice",
    choices: ["{年表|ねんぴょう}で くらべる", "{目|め}を つぶる", "ゲームを する", "なにも しない"],
    answer: "{年表|ねんぴょう}で くらべる",
  },
  {
    id: `${U.oldTools}.q-5`,
    unitId: U.oldTools,
    prompt: "{道具|どうぐ}が {昔|むかし}より べんりに なった おかげで くらしは どう なった かな？",
    explanation: "{電気|でんき}や {機械|きかい}の {道具|どうぐ}が ふえて、{家事|かじ}が らくに なり、{時間|じかん}を ほかの ことに つかえるように なったよ。",
    visual: { kind: "emoji", value: "💡🧺", caption: "べんりな くらし" },
    format: "choice",
    choices: ["らくに なった", "たいへんに なった", "なにも かわらない", "くらく なった"],
    answer: "らくに なった",
  },
];

export const shakaiG3Contents: Record<string, UnitContent> = {
  [U.townFeatures]: {
    unitId: U.townFeatures,
    learn: {
      unitId: U.townFeatures,
      steps: [
        {
          heading: "{町|まち}を たんけんしよう",
          body: "{自分|じぶん}の すむ {町|まち}を あるいて みよう。{家|いえ}・お{店|みせ}・{学校|がっこう}・{田|た}んぼ・{川|かわ}など、いろいろな ものが あるね。",
          visual: { kind: "emoji", value: "🚶🏘️", caption: "まちたんけん" },
        },
        {
          heading: "{土地|とち}の つかわれかた",
          body: "{駅|えき}の まわりは お{店|みせ}が {多|おお}く、まちはずれには {田|た}んぼや {畑|はたけ}が {広|ひろ}がるよ。ばしょで ようすが ちがうね。",
          visual: { kind: "emoji", value: "🚉🌾", caption: "ばしょで ちがう" },
        },
        {
          heading: "{絵|え}{地図|ちず}に まとめよう",
          body: "しらべた ことを {絵|え}{地図|ちず}に かくと、{町|まち}の ようすが ひとめで わかって、みんなに つたえやすいよ。",
          visual: { kind: "emoji", value: "🗺️✏️", caption: "{絵|え}{地図|ちず}づくり" },
        },
      ],
    },
    test: {
      unitId: U.townFeatures,
      questions: townFeaturesQuestions,
      questionCount: 5,
    },
  },

  [U.mapSymbols]: {
    unitId: U.mapSymbols,
    learn: {
      unitId: U.mapSymbols,
      steps: [
        {
          heading: "{方位|ほうい}を しろう",
          body: "{方位|ほうい}には {北|きた}・{南|みなみ}・{東|ひがし}・{西|にし}が あるよ。{地図|ちず}は とくに しるしが なければ {上|うえ}が {北|きた}だよ。",
          visual: { kind: "emoji", value: "🧭", caption: "{北|きた}・{南|みなみ}・{東|ひがし}・{西|にし}" },
        },
        {
          heading: "{地図|ちず}{記号|きごう}を おぼえよう",
          body: "{地図|ちず}には きまった しるし（{記号|きごう}）が あるよ。{学校|がっこう}は「{文|ぶん}」、{郵便局|ゆうびんきょく}は「〒」、{神社|じんじゃ}は {鳥居|とりい}の かたちだね。",
          visual: { kind: "emoji", value: "🏫📮⛩️", caption: "{記号|きごう}いろいろ" },
        },
        {
          heading: "{地図|ちず}を つかって みよう",
          body: "{方位|ほうい}と {記号|きごう}が わかると、{地図|ちず}を {見|み}て「ここから {北|きた}に {学校|がっこう}が ある」のように よめるよ。",
          visual: { kind: "emoji", value: "🗺️👀", caption: "{地図|ちず}を よむ" },
        },
      ],
    },
    test: {
      unitId: U.mapSymbols,
      questions: mapSymbolsQuestions,
      questionCount: 5,
    },
  },

  [U.shopsShopping]: {
    unitId: U.shopsShopping,
    learn: {
      unitId: U.shopsShopping,
      steps: [
        {
          heading: "お{店|みせ}の くふう",
          body: "スーパーマーケットは、{品物|しなもの}を なかまごとに ならべたり、ねふだを つけたりして、{買|か}い{物|もの}しやすく くふうして いるよ。",
          visual: { kind: "emoji", value: "🛒🏷️", caption: "ならべかたの くふう" },
        },
        {
          heading: "{品物|しなもの}は どこから くる？",
          body: "やさいや さかなは、とおくの {産地|さんち}から トラックで はこばれて くるよ。ひょうじを {見|み}ると {産地|さんち}が わかるね。",
          visual: { kind: "emoji", value: "🚚🥬", caption: "{産地|さんち}から はこぶ" },
        },
        {
          heading: "はたらく {人|ひと}の しごと",
          body: "お{店|みせ}では、しなものを ならべる {人|ひと}、レジの {人|ひと}など、たくさんの {人|ひと}が きょうりょくして はたらいて いるよ。",
          visual: { kind: "emoji", value: "🧑‍🍳🧾", caption: "みんなで はたらく" },
        },
      ],
    },
    test: {
      unitId: U.shopsShopping,
      questions: shopsShoppingQuestions,
      questionCount: 5,
    },
  },

  [U.factoryFarm]: {
    unitId: U.factoryFarm,
    learn: {
      unitId: U.factoryFarm,
      steps: [
        {
          heading: "{農家|のうか}の しごと",
          body: "{農家|のうか}の {人|ひと}は、てんきや きせつに あわせて やさい・くだもの・{米|こめ}を そだてて いるよ。",
          visual: { kind: "emoji", value: "🚜🌾", caption: "やさいを そだてる" },
        },
        {
          heading: "{工場|こうじょう}の しごと",
          body: "{工場|こうじょう}では きかいを つかって、{同|おな}じ ものを はやく たくさん {作|つく}るよ。{食|た}べものの {工場|こうじょう}は せいけつに きを つけるよ。",
          visual: { kind: "emoji", value: "🏭⚙️", caption: "きかいで {作|つく}る" },
        },
        {
          heading: "{作|つく}った ものの ゆくえ",
          body: "{農家|のうか}や {工場|こうじょう}で {作|つく}られた ものは、トラックで お{店|みせ}に はこばれて、わたしたちの くらしに とどくよ。",
          visual: { kind: "emoji", value: "🚚🏬", caption: "{店|みせ}へ とどく" },
        },
      ],
    },
    test: {
      unitId: U.factoryFarm,
      questions: factoryFarmQuestions,
      questionCount: 5,
    },
  },

  [U.firePolice]: {
    unitId: U.firePolice,
    learn: {
      unitId: U.firePolice,
      steps: [
        {
          heading: "{火事|かじ}から {守|まも}る",
          body: "{火事|かじ}の ときは「119」。{消防士|しょうぼうし}が {消防車|しょうぼうしゃ}で きて、{火|ひ}を けしたり {人|ひと}を たすけたり するよ。",
          visual: { kind: "emoji", value: "🚒🔥", caption: "{消防|しょうぼう}" },
        },
        {
          heading: "じこや じけんから {守|まも}る",
          body: "じこや どろぼうの ときは「110」。{警察|けいさつ}の {人|ひと}が {交番|こうばん}や パトカーで まちの あんぜんを {守|まも}って いるよ。",
          visual: { kind: "emoji", value: "🚓🚨", caption: "{警察|けいさつ}" },
        },
        {
          heading: "まちの そなえ",
          body: "まちには {消火|しょうか}せんや ひじょうベルなど、{火事|かじ}や きけんに そなえた せつびが たくさん あるよ。",
          visual: { kind: "emoji", value: "💧🔔", caption: "まちの そなえ" },
        },
      ],
    },
    test: {
      unitId: U.firePolice,
      questions: firePoliceQuestions,
      questionCount: 5,
    },
  },

  [U.oldTools]: {
    unitId: U.oldTools,
    learn: {
      unitId: U.oldTools,
      steps: [
        {
          heading: "{昔|むかし}の {道具|どうぐ}",
          body: "{昔|むかし}は かまどで ごはんを たき、{井戸|いど}で {水|みず}を くみ、せんたく{板|いた}で あらって いたよ。{今|いま}とは ずいぶん ちがうね。",
          visual: { kind: "emoji", value: "🔥🪣🧺", caption: "{昔|むかし}の くらし" },
        },
        {
          heading: "{今|いま}との くらべっこ",
          body: "{今|いま}は {電気|でんき}や すいどう、きかいの {道具|どうぐ}が あって、くらしが とても べんりに なったよ。",
          visual: { kind: "emoji", value: "💡🚿", caption: "べんりな {今|いま}" },
        },
        {
          heading: "うつりかわりを しらべる",
          body: "{年表|ねんぴょう}や {古|ふる}い {道具|どうぐ}の {資料館|しりょうかん}を {見|み}ると、{市|し}や {道具|どうぐ}が どう かわってきたか わかるよ。",
          visual: { kind: "emoji", value: "📜🏛️", caption: "しらべる" },
        },
      ],
    },
    test: {
      unitId: U.oldTools,
      questions: oldToolsQuestions,
      questionCount: 5,
    },
  },
};
