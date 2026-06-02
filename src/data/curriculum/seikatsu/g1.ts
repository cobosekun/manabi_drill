// ══════════════════════════════════════════
// カリキュラム縦スライス: 生活（せいかつ）小1
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 教科 = SubjectId / 領域 = "<subject>.<domain-slug>"
//          単元 = "<subject>.g<grade>.<slug>"
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
//
// 【申し送り / 局所吸収メモ】
//   SubjectId は src/types/drill.ts で "seikatsu" を既に許容しているため、本ファイルは
//   そのまま型を通る（局所キャストは不要だった）。万一将来 SubjectId から外れた場合に備え、
//   下の SUBJECT_ID 定数で一点に吸収できるようにしてある（index.ts / types は未編集）。
//
// 【表記】CEO方針(2026-06-02)に従い、表示テキスト(本文/問題文/選択肢/解説/realWorldUse)は
//   漢字＋全漢字ルビ記法 {漢字|よみ} で執筆。短いナビ用ラベル(教科名/領域名/単元名)はひらがな。
// ══════════════════════════════════════════

import type {
  Subject,
  Domain,
  Unit,
  UnitContent,
  ChoiceQuestion,
} from "@/types/curriculum";

// SubjectId を一点に吸収（将来 union から外れてもここだけ直せばよい）
const SUBJECT_ID = "seikatsu" as const;

// ── 教科 ──────────────────────────────────

export const seikatsuSubject: Subject = {
  id: SUBJECT_ID,
  name: "せいかつ",
  formalName: "生活",
  emoji: "🌱",
  theme: "emerald",
  grades: [1, 2],
  testable: true,
};

// ── 領域 ──────────────────────────────────

export const seikatsuG1Domains: Domain[] = [
  {
    id: "seikatsu.school",
    subjectId: SUBJECT_ID,
    name: "がっこうとともだち",
    formalName: "学校と友だち",
  },
  {
    id: "seikatsu.town-safety",
    subjectId: SUBJECT_ID,
    name: "まちとあんぜん",
    formalName: "町と安全",
  },
  {
    id: "seikatsu.nature-season",
    subjectId: SUBJECT_ID,
    name: "しぜんときせつ",
    formalName: "自然と季節",
  },
  {
    id: "seikatsu.living-plant",
    subjectId: SUBJECT_ID,
    name: "いきものとしょくぶつ",
    formalName: "生き物と植物",
  },
  {
    id: "seikatsu.self-family",
    subjectId: SUBJECT_ID,
    name: "じぶんとかぞく",
    formalName: "自分と家族",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo が双方向に繋がるよう設計）:
//
//   school-explore ─┬─▶ friends-teachers ─┬─▶ public-manners
//                   └─▶ route-safety ─────┘   ▲
//                                 friends-teachers ─▶ family-roles ─▶ public-manners
//
//   seasons-play ─┬─▶ grow-asagao ─▶ animals-friends
//                 └─▶ animals-friends
//
const U = {
  schoolExplore: "seikatsu.g1.school-explore",
  friendsTeachers: "seikatsu.g1.friends-teachers",
  routeSafety: "seikatsu.g1.school-route-safety",
  publicManners: "seikatsu.g1.public-manners",
  seasonsPlay: "seikatsu.g1.seasons-play",
  growAsagao: "seikatsu.g1.grow-asagao",
  animalsFriends: "seikatsu.g1.animals-friends",
  familyRoles: "seikatsu.g1.family-roles",
} as const;

export const seikatsuG1Units: Unit[] = [
  {
    id: U.schoolExplore,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.school",
    title: "がっこうたんけん",
    order: 1,
    realWorldUse:
      "{学校|がっこう}には ほけんしつや としょしつ、こうていなど いろいろな へやが あるよ。どこで なにを するか わかると、こまった ときに じぶんで うごけるよ。",
    leadsTo: [U.friendsTeachers, U.routeSafety],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.friendsTeachers,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.school",
    title: "せんせいやともだち",
    order: 2,
    realWorldUse:
      "あいさつや「ありがとう」を つたえると、ともだちが ふえて まいにちを たのしく すごせるよ。",
    leadsTo: [U.publicManners, U.familyRoles],
    prerequisites: [U.schoolExplore],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.routeSafety,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.town-safety",
    title: "つうがくろとこうつうルール",
    order: 3,
    realWorldUse:
      "みちを あるく ときの ルールを {覚|おぼ}えると、じこに あわず あんぜんに {学校|がっこう}へ いけるよ。",
    leadsTo: [U.publicManners],
    prerequisites: [U.schoolExplore],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.publicManners,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.town-safety",
    title: "みんなでつかうもののマナー",
    order: 4,
    realWorldUse:
      "みんなで つかう ものを たいせつに すると、つぎの ひとも きもちよく つかえるよ。",
    leadsTo: [],
    prerequisites: [U.friendsTeachers, U.routeSafety, U.familyRoles],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.seasonsPlay,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.nature-season",
    title: "きせつとあそび",
    order: 5,
    realWorldUse:
      "はる・なつ・あき・ふゆで てんきや しぜんが かわるよ。きせつに あった あそびや ふくを えらべるよ。",
    leadsTo: [U.growAsagao, U.animalsFriends],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.growAsagao,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.living-plant",
    title: "あさがおをそだてる",
    order: 6,
    realWorldUse:
      "たねを まいて {水|みず}を やると、{植物|しょくぶつ}が そだつよ。せわを する たいせつさが わかるよ。",
    leadsTo: [U.animalsFriends],
    prerequisites: [U.seasonsPlay],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.animalsFriends,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.living-plant",
    title: "いきものとふれあう",
    order: 7,
    realWorldUse:
      "むしや どうぶつの すみかや たべものを {知|し}ると、やさしく せっする ことが できるよ。",
    leadsTo: [],
    prerequisites: [U.seasonsPlay, U.growAsagao],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.familyRoles,
    subjectId: SUBJECT_ID,
    grade: 1,
    domainId: "seikatsu.self-family",
    title: "かぞくとじぶんのやくわり",
    order: 8,
    realWorldUse:
      "いえの おてつだいや じぶんの ことを じぶんで すると、{家族|かぞく}の やくに たてるよ。",
    leadsTo: [U.publicManners],
    prerequisites: [U.friendsTeachers],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 生活は知識・態度の確認系のため固定 questions[]（全問 explanation 必須・choice 4択）。

const schoolExploreQuestions: ChoiceQuestion[] = [
  {
    id: `${U.schoolExplore}.q-1`,
    unitId: U.schoolExplore,
    prompt: "けがを した ときに いく へやは どこ？",
    explanation:
      "{保健室|ほけんしつ}には けがや びょうきを {見|み}てくれる せんせいが いるよ。",
    format: "choice",
    choices: ["{保健室|ほけんしつ}", "{図書室|としょしつ}", "{音楽室|おんがくしつ}", "こうてい"],
    answer: "{保健室|ほけんしつ}",
  },
  {
    id: `${U.schoolExplore}.q-2`,
    unitId: U.schoolExplore,
    prompt: "{本|ほん}を よんだり かりたり する へやは？",
    explanation: "{図書室|としょしつ}には たくさんの {本|ほん}が あって、しずかに よむ ところだよ。",
    format: "choice",
    choices: ["{図書室|としょしつ}", "{給食室|きゅうしょくしつ}", "たいいくかん", "しょくいんしつ"],
    answer: "{図書室|としょしつ}",
  },
  {
    id: `${U.schoolExplore}.q-3`,
    unitId: U.schoolExplore,
    prompt: "ろうかの あるきかたで ただしいのは どれ？",
    explanation:
      "ろうかは しずかに {右|みぎ}がわを あるくよ。はしると ぶつかって あぶないよ。",
    format: "choice",
    choices: ["しずかに {右|みぎ}がわを あるく", "はしって いく", "ともだちと ふざける", "ねころぶ"],
    answer: "しずかに {右|みぎ}がわを あるく",
  },
  {
    id: `${U.schoolExplore}.q-4`,
    unitId: U.schoolExplore,
    prompt: "うたを うたったり がっきを ひいたり する へやは？",
    explanation: "{音楽室|おんがくしつ}には ピアノなどの がっきが あって、おんがくの べんきょうを するよ。",
    format: "choice",
    choices: ["{音楽室|おんがくしつ}", "{保健室|ほけんしつ}", "としょしつ", "こうてい"],
    answer: "{音楽室|おんがくしつ}",
  },
  {
    id: `${U.schoolExplore}.q-5`,
    unitId: U.schoolExplore,
    prompt: "みんなで うんどうを する ひろい ところは？",
    explanation: "こうていは そとの ひろい ばしょで、はしったり あそんだり できるよ。",
    format: "choice",
    choices: ["こうてい", "{保健室|ほけんしつ}", "しょくいんしつ", "げんかん"],
    answer: "こうてい",
  },
];

const friendsTeachersQuestions: ChoiceQuestion[] = [
  {
    id: `${U.friendsTeachers}.q-1`,
    unitId: U.friendsTeachers,
    prompt: "あさ あった ときの あいさつは？",
    explanation: "あさは「おはよう」と あいさつ するよ。あいさつは なかよしの だいいっぽだよ。",
    format: "choice",
    choices: ["おはよう", "さようなら", "おやすみ", "いただきます"],
    answer: "おはよう",
  },
  {
    id: `${U.friendsTeachers}.q-2`,
    unitId: U.friendsTeachers,
    prompt: "ともだちに なにか して もらったら なんて いう？",
    explanation: "して もらったら「ありがとう」と つたえると、あいても うれしい きもちに なるよ。",
    format: "choice",
    choices: ["ありがとう", "いやだ", "しらない", "だめ"],
    answer: "ありがとう",
  },
  {
    id: `${U.friendsTeachers}.q-3`,
    unitId: U.friendsTeachers,
    prompt: "わるい ことを して しまったら どうする？",
    explanation: "わるい ことを したら「ごめんね」と あやまると なかなおり できるよ。",
    format: "choice",
    choices: ["「ごめんね」と あやまる", "にげる", "だまって いる", "わらう"],
    answer: "「ごめんね」と あやまる",
  },
  {
    id: `${U.friendsTeachers}.q-4`,
    unitId: U.friendsTeachers,
    prompt: "こまった ことが あったら だれに きく？",
    explanation: "こまった ときは せんせいに「おしえて ください」と きくと たすけて もらえるよ。",
    format: "choice",
    choices: ["せんせい", "だれにも きかない", "いぬ", "テレビ"],
    answer: "せんせい",
  },
  {
    id: `${U.friendsTeachers}.q-5`,
    unitId: U.friendsTeachers,
    prompt: "ともだちと なかよく する ほうほうは？",
    explanation: "やさしい ことばを つかうと、ともだちと なかよく あそべるよ。",
    format: "choice",
    choices: ["やさしい ことばを つかう", "おもちゃを とる", "たたく", "むしする"],
    answer: "やさしい ことばを つかう",
  },
];

const routeSafetyQuestions: ChoiceQuestion[] = [
  {
    id: `${U.routeSafety}.q-1`,
    unitId: U.routeSafety,
    prompt: "しんごうが {赤|あか}の とき どうする？",
    explanation: "{赤|あか}は「とまれ」だよ。{車|くるま}が くるので ぜったいに わたらないよ。",
    format: "choice",
    choices: ["とまる", "すすむ", "はしって わたる", "そのまま わたる"],
    answer: "とまる",
  },
  {
    id: `${U.routeSafety}.q-2`,
    unitId: U.routeSafety,
    prompt: "しんごうが {青|あお}に なった とき、まず する ことは？",
    explanation: "{青|あお}でも すぐ わたらず、{右|みぎ}と {左|ひだり}を {見|み}て あんぜんを たしかめるよ。",
    format: "choice",
    choices: ["{右|みぎ}と {左|ひだり}を {見|み}る", "すぐ はしる", "めを つぶる", "とまったまま うごかない"],
    answer: "{右|みぎ}と {左|ひだり}を {見|み}る",
  },
  {
    id: `${U.routeSafety}.q-3`,
    unitId: U.routeSafety,
    prompt: "おうだんほどうを わたる とき なにを する？",
    explanation: "{手|て}を あげると {車|くるま}の ひとに きづいて もらえて あんぜんだよ。",
    format: "choice",
    choices: ["{手|て}を あげて わたる", "ねころぶ", "すわる", "はしりながら わたる"],
    answer: "{手|て}を あげて わたる",
  },
  {
    id: `${U.routeSafety}.q-4`,
    unitId: U.routeSafety,
    prompt: "みちや ちゅうしゃじょうで あそんでも いい？",
    explanation: "みちや ちゅうしゃじょうは {車|くるま}が きて あぶないので あそばないよ。",
    format: "choice",
    choices: ["あそばない", "ボールで あそぶ", "ねっころがる", "はしりまわる"],
    answer: "あそばない",
  },
  {
    id: `${U.routeSafety}.q-5`,
    unitId: U.routeSafety,
    prompt: "{車|くるま}が ちかづいて きた ときは？",
    explanation: "とまって {車|くるま}が とおりすぎるのを まつと あんぜんだよ。とびだしは あぶないよ。",
    format: "choice",
    choices: ["とまって まつ", "とびだす", "めを つぶる", "{車|くるま}に ちかづく"],
    answer: "とまって まつ",
  },
  {
    id: `${U.routeSafety}.q-6`,
    unitId: U.routeSafety,
    prompt: "くらい よみちで あんぜんに あるく ために いいのは？",
    explanation: "あかるい いろや はんしゃ(ひかる)ものを つけると、{車|くるま}から よく {見|み}えるよ。",
    format: "choice",
    choices: ["あかるい いろや はんしゃを つける", "くろい ふくだけ きる", "ライトを けす", "めを つぶる"],
    answer: "あかるい いろや はんしゃを つける",
  },
];

const publicMannersQuestions: ChoiceQuestion[] = [
  {
    id: `${U.publicManners}.q-1`,
    unitId: U.publicManners,
    prompt: "ブランコで あそぶ ときの マナーは？",
    explanation: "じゅんばんを まもって ならんで まつと、みんなが あそべるよ。",
    format: "choice",
    choices: ["じゅんばんを まもる", "ずっと ひとりじめ", "おしのける", "なげる"],
    answer: "じゅんばんを まもる",
  },
  {
    id: `${U.publicManners}.q-2`,
    unitId: U.publicManners,
    prompt: "つかった ものは どうする？",
    explanation: "もとの ばしょに もどすと、つぎ つかう ひとが こまらないよ。",
    format: "choice",
    choices: ["もとの ばしょに もどす", "ほうって おく", "かくす", "こわす"],
    answer: "もとの ばしょに もどす",
  },
  {
    id: `${U.publicManners}.q-3`,
    unitId: U.publicManners,
    prompt: "ごみは どこに すてる？",
    explanation: "ごみは ごみばこに すてて、まちを きれいに たもつよ。",
    format: "choice",
    choices: ["ごみばこ", "みち", "こうえんの すな", "かわ"],
    answer: "ごみばこ",
  },
  {
    id: `${U.publicManners}.q-4`,
    unitId: U.publicManners,
    prompt: "{図書室|としょしつ}で {本|ほん}を よむ ときは？",
    explanation: "{図書室|としょしつ}は みんなが しずかに よむ ところ。おおごえは めいわくに なるよ。",
    format: "choice",
    choices: ["しずかに する", "おおごえで はなす", "はしりまわる", "{本|ほん}を やぶる"],
    answer: "しずかに する",
  },
  {
    id: `${U.publicManners}.q-5`,
    unitId: U.publicManners,
    prompt: "みんなの ものを つかう ときの きもちは？",
    explanation: "みんなの ものは たいせつに つかうと、ながく つかえて つぎの ひとも うれしいよ。",
    format: "choice",
    choices: ["たいせつに つかう", "らんぼうに つかう", "じぶんの ものに する", "こわしても いい"],
    answer: "たいせつに つかう",
  },
];

const seasonsPlayQuestions: ChoiceQuestion[] = [
  {
    id: `${U.seasonsPlay}.q-1`,
    unitId: U.seasonsPlay,
    prompt: "さくらの はなが さく きせつは？",
    explanation: "はるは あたたかく なり、さくらの はなが さくよ。",
    format: "choice",
    choices: ["はる", "なつ", "あき", "ふゆ"],
    answer: "はる",
  },
  {
    id: `${U.seasonsPlay}.q-2`,
    unitId: U.seasonsPlay,
    prompt: "みずあそびが きもちいい、あつい きせつは？",
    explanation: "なつは いちばん あつい きせつで、みずあそびが きもちいいよ。",
    format: "choice",
    choices: ["なつ", "ふゆ", "はる", "あき"],
    answer: "なつ",
  },
  {
    id: `${U.seasonsPlay}.q-3`,
    unitId: U.seasonsPlay,
    prompt: "はっぱが {赤|あか}や きいろに なる きせつは？",
    explanation: "あきに なると はっぱが {赤|あか}や きいろに いろづいて おちるよ。",
    format: "choice",
    choices: ["あき", "なつ", "はる", "ふゆ"],
    answer: "あき",
  },
  {
    id: `${U.seasonsPlay}.q-4`,
    unitId: U.seasonsPlay,
    prompt: "ゆきが ふる さむい きせつは？",
    explanation: "ふゆは いちばん さむい きせつで、ゆきが ふる ところも あるよ。",
    format: "choice",
    choices: ["ふゆ", "なつ", "はる", "あき"],
    answer: "ふゆ",
  },
  {
    id: `${U.seasonsPlay}.q-5`,
    unitId: U.seasonsPlay,
    prompt: "ゆきだるまを つくって あそべる きせつは？",
    explanation: "ゆきは ふゆに ふるので、ゆきだるまは ふゆの あそびだよ。",
    format: "choice",
    choices: ["ふゆ", "なつ", "はる", "あき"],
    answer: "ふゆ",
  },
  {
    id: `${U.seasonsPlay}.q-6`,
    unitId: U.seasonsPlay,
    prompt: "セミが ないて いる きせつは？",
    explanation: "セミは あつい なつに なくよ。なつの しぜんを かんじられるね。",
    format: "choice",
    choices: ["なつ", "ふゆ", "はる", "あき"],
    answer: "なつ",
  },
];

const growAsagaoQuestions: ChoiceQuestion[] = [
  {
    id: `${U.growAsagao}.q-1`,
    unitId: U.growAsagao,
    prompt: "あさがおを そだてる とき、いちばん さいしょに する ことは？",
    explanation: "つちに たねを まく ところから はじまるよ。",
    format: "choice",
    choices: ["たねを まく", "はなを とる", "ぬいて すてる", "{水|みず}を かけない"],
    answer: "たねを まく",
  },
  {
    id: `${U.growAsagao}.q-2`,
    unitId: U.growAsagao,
    prompt: "あさがおに まいにち する せわは？",
    explanation: "まいにち あさ {水|みず}を やると、げんきに そだつよ。",
    format: "choice",
    choices: ["{水|みず}を やる", "ひに あてない", "つちを とる", "たべる"],
    answer: "{水|みず}を やる",
  },
  {
    id: `${U.growAsagao}.q-3`,
    unitId: U.growAsagao,
    prompt: "たねを まいた あと、さいしょに つちから でて くるのは？",
    explanation: "さいしょに「め」が でて、それから はが ふえて いくよ。",
    format: "choice",
    choices: ["め", "はな", "み", "えだ"],
    answer: "め",
  },
  {
    id: `${U.growAsagao}.q-4`,
    unitId: U.growAsagao,
    prompt: "あさがおの はなが よく さく きせつは？",
    explanation: "あさがおは あつい なつに あおや むらさきの はなを さかせるよ。",
    format: "choice",
    choices: ["なつ", "ふゆ", "はる", "あき"],
    answer: "なつ",
  },
  {
    id: `${U.growAsagao}.q-5`,
    unitId: U.growAsagao,
    prompt: "はなが さいた あとに できる、また まける ものは？",
    explanation: "はなの あとに たねが できるよ。その たねを また まいて そだてられるね。",
    format: "choice",
    choices: ["たね", "いし", "{水|みず}", "つち"],
    answer: "たね",
  },
];

const animalsFriendsQuestions: ChoiceQuestion[] = [
  {
    id: `${U.animalsFriends}.q-1`,
    unitId: U.animalsFriends,
    prompt: "いしの したに いる ことが おおい むしは？",
    explanation: "だんごむしは くらくて しめった いしの したを すみかに して いるよ。",
    format: "choice",
    choices: ["だんごむし", "ちょうちょ", "とんぼ", "せみ"],
    answer: "だんごむし",
  },
  {
    id: `${U.animalsFriends}.q-2`,
    unitId: U.animalsFriends,
    prompt: "{水|みず}の なかに すんで いる いきものは？",
    explanation: "めだかは {水|みず}の なかで およいで くらして いるよ。",
    format: "choice",
    choices: ["めだか", "あり", "ちょうちょ", "だんごむし"],
    answer: "めだか",
  },
  {
    id: `${U.animalsFriends}.q-3`,
    unitId: U.animalsFriends,
    prompt: "つかまえた いきものは、さいごに どうする?",
    explanation: "もとの ばしょに かえして あげると、いきものは げんきに くらせるよ。",
    format: "choice",
    choices: ["もとの ばしょに かえす", "いえに とじこめる", "ほうりなげる", "ふむ"],
    answer: "もとの ばしょに かえす",
  },
  {
    id: `${U.animalsFriends}.q-4`,
    unitId: U.animalsFriends,
    prompt: "はなの みつを すいに くる むしは？",
    explanation: "ちょうちょは はなの みつを すって くらして いるよ。",
    format: "choice",
    choices: ["ちょうちょ", "だんごむし", "めだか", "ありだけ"],
    answer: "ちょうちょ",
  },
  {
    id: `${U.animalsFriends}.q-5`,
    unitId: U.animalsFriends,
    prompt: "いきものに さわる ときの やりかたは？",
    explanation: "そっと やさしく さわると、いきものを きずつけないよ。",
    format: "choice",
    choices: ["そっと やさしく さわる", "つよく にぎる", "なげる", "たたく"],
    answer: "そっと やさしく さわる",
  },
  {
    id: `${U.animalsFriends}.q-6`,
    unitId: U.animalsFriends,
    prompt: "あめの ひに よく でて くる、からを せおった いきものは？",
    explanation: "かたつむりは あめの ひに げんきに でて きて、からを せおって いるよ。",
    format: "choice",
    choices: ["かたつむり", "せみ", "とんぼ", "ばった"],
    answer: "かたつむり",
  },
];

const familyRolesQuestions: ChoiceQuestion[] = [
  {
    id: `${U.familyRoles}.q-1`,
    unitId: U.familyRoles,
    prompt: "ごはんの まえに できる おてつだいは？",
    explanation: "しょっきを ならべると、ごはんの じゅんびが すすんで {家族|かぞく}が たすかるよ。",
    format: "choice",
    choices: ["しょっきを ならべる", "ねて しまう", "テレビを みる", "そとで あそぶ"],
    answer: "しょっきを ならべる",
  },
  {
    id: `${U.familyRoles}.q-2`,
    unitId: U.familyRoles,
    prompt: "げんかんで できる おてつだいは？",
    explanation: "くつを そろえると げんかんが きれいに なって、みんなが きもちいいよ。",
    format: "choice",
    choices: ["くつを そろえる", "くつを なげる", "どろで よごす", "あけっぱなしに する"],
    answer: "くつを そろえる",
  },
  {
    id: `${U.familyRoles}.q-3`,
    unitId: U.familyRoles,
    prompt: "じぶんで できる ことは どれ？",
    explanation: "はみがきは じぶんの こと。じぶんで できると かっこいいね。",
    format: "choice",
    choices: ["じぶんで はを みがく", "ぜんぶ やって もらう", "なにも しない", "なく"],
    answer: "じぶんで はを みがく",
  },
  {
    id: `${U.familyRoles}.q-4`,
    unitId: U.familyRoles,
    prompt: "おてつだいを すると {家族|かぞく}は どう おもう？",
    explanation: "おてつだいを すると {家族|かぞく}は うれしく なって、「ありがとう」と いって もらえるよ。",
    format: "choice",
    choices: ["うれしい", "かなしい", "おこる", "こまる"],
    answer: "うれしい",
  },
  {
    id: `${U.familyRoles}.q-5`,
    unitId: U.familyRoles,
    prompt: "ぬいだ ふくは どうする?",
    explanation: "ぬいだ ふくは たたんで かたづけると、へやが きれいに なるよ。",
    format: "choice",
    choices: ["たたんで かたづける", "ゆかに ちらかす", "すてる", "ふむ"],
    answer: "たたんで かたづける",
  },
];

export const seikatsuG1Contents: Record<string, UnitContent> = {
  [U.schoolExplore]: {
    unitId: U.schoolExplore,
    learn: {
      unitId: U.schoolExplore,
      steps: [
        {
          heading: "がっこうを たんけんしよう",
          body: "{学校|がっこう}には いろいろな へやが あるよ。{保健室|ほけんしつ}・{図書室|としょしつ}・{音楽室|おんがくしつ}・こうていを さがして みよう。",
          visual: { kind: "emoji", value: "🏫", caption: "わたしたちの {学校|がっこう}" },
        },
        {
          heading: "へやの やくわりを しろう",
          body: "{保健室|ほけんしつ}は けがを した ときに いく ところ、{図書室|としょしつ}は {本|ほん}を よむ ところ。へやごとに やくわりが あるよ。",
          visual: { kind: "emoji", value: "🏥📚🎵", caption: "ほけんしつ・としょしつ・おんがくしつ" },
        },
        {
          heading: "あんぜんに たんけん",
          body: "ろうかは {右|みぎ}がわを しずかに あるくよ。はしらないで うごくと あんぜんに たんけんできるね。",
          visual: { kind: "emoji", value: "🚶", caption: "しずかに あるこう" },
        },
      ],
    },
    test: {
      unitId: U.schoolExplore,
      questions: schoolExploreQuestions,
      questionCount: 5,
    },
  },

  [U.friendsTeachers]: {
    unitId: U.friendsTeachers,
    learn: {
      unitId: U.friendsTeachers,
      steps: [
        {
          heading: "あいさつを しよう",
          body: "あさは「おはよう」、かえりは「さようなら」。{元気|げんき}に あいさつ すると きもちが いいね。",
          visual: { kind: "emoji", value: "👋😊", caption: "おはよう！" },
        },
        {
          heading: "ともだちと なかよく",
          body: "「ありがとう」「ごめんね」を つたえると、けんかしても なかなおり できるよ。",
          visual: { kind: "emoji", value: "🤝", caption: "なかよし" },
        },
        {
          heading: "せんせいに きこう",
          body: "こまった ときは せんせいに「おしえて ください」と きいて みよう。きっと たすけて くれるよ。",
          visual: { kind: "emoji", value: "🧑‍🏫", caption: "せんせい" },
        },
      ],
    },
    test: {
      unitId: U.friendsTeachers,
      questions: friendsTeachersQuestions,
      questionCount: 5,
    },
  },

  [U.routeSafety]: {
    unitId: U.routeSafety,
    learn: {
      unitId: U.routeSafety,
      steps: [
        {
          heading: "しんごうを まもろう",
          body: "{青|あお}は すすめ、{赤|あか}は とまれ。{青|あお}に なっても {右|みぎ}・{左|ひだり}を {見|み}てから わたろう。",
          visual: { kind: "emoji", value: "🚦", caption: "あおで わたる" },
        },
        {
          heading: "おうだんほどうを わたる",
          body: "{手|て}を あげて、{車|くるま}が とまったのを たしかめてから わたるよ。",
          visual: { kind: "emoji", value: "🚸", caption: "てを あげて わたる" },
        },
        {
          heading: "あぶない あそびは しない",
          body: "みちや ちゅうしゃじょうで あそぶと {車|くるま}が きて あぶないよ。こうえんで あそぼう。",
          visual: { kind: "emoji", value: "🚗", caption: "みちで あそばない" },
        },
      ],
    },
    test: {
      unitId: U.routeSafety,
      questions: routeSafetyQuestions,
      questionCount: 6,
    },
  },

  [U.publicManners]: {
    unitId: U.publicManners,
    learn: {
      unitId: U.publicManners,
      steps: [
        {
          heading: "じゅんばんを まもる",
          body: "ブランコや すべりだいは じゅんばんこ。ならんで まつと みんなが あそべるよ。",
          visual: { kind: "emoji", value: "🛝", caption: "じゅんばんこ" },
        },
        {
          heading: "もとに もどす",
          body: "つかった ものは もとの ばしょに もどすと、つぎ つかう ひとが こまらないよ。",
          visual: { kind: "emoji", value: "🧹", caption: "おかたづけ" },
        },
        {
          heading: "ごみは ごみばこへ",
          body: "ごみは ごみばこに すてて、まちや こうえんを きれいに たもとう。",
          visual: { kind: "emoji", value: "🗑️", caption: "ごみばこへ" },
        },
      ],
    },
    test: {
      unitId: U.publicManners,
      questions: publicMannersQuestions,
      questionCount: 5,
    },
  },

  [U.seasonsPlay]: {
    unitId: U.seasonsPlay,
    learn: {
      unitId: U.seasonsPlay,
      steps: [
        {
          heading: "はると なつ",
          body: "はるは さくらが さき、なつは あつくて みずあそびが たのしいよ。",
          visual: { kind: "emoji", value: "🌸☀️", caption: "はる・なつ" },
        },
        {
          heading: "あきと ふゆ",
          body: "あきは はっぱが {赤|あか}や きいろに なり、ふゆは さむくて ゆきが ふるよ。",
          visual: { kind: "emoji", value: "🍁⛄", caption: "あき・ふゆ" },
        },
        {
          heading: "きせつの あそび",
          body: "なつは セミとり、ふゆは ゆきだるま。きせつで あそびが かわるね。",
          visual: { kind: "emoji", value: "🌻❄️", caption: "きせつの あそび" },
        },
      ],
    },
    test: {
      unitId: U.seasonsPlay,
      questions: seasonsPlayQuestions,
      questionCount: 6,
    },
  },

  [U.growAsagao]: {
    unitId: U.growAsagao,
    learn: {
      unitId: U.growAsagao,
      steps: [
        {
          heading: "たねを まこう",
          body: "あさがおの たねを つちに まいて、うえから そっと つちを かけるよ。",
          visual: { kind: "emoji", value: "🌱", caption: "たねまき" },
        },
        {
          heading: "{水|みず}を やろう",
          body: "まいにち あさ {水|みず}を やると、めが でて はが ふえて いくよ。",
          visual: { kind: "emoji", value: "💧🪴", caption: "まいにち みずやり" },
        },
        {
          heading: "はなが さく",
          body: "なつに なると あおや むらさきの はなが さくよ。はなの あとには たねも とれるね。",
          visual: { kind: "emoji", value: "🌺", caption: "あさがおの はな" },
        },
      ],
    },
    test: {
      unitId: U.growAsagao,
      questions: growAsagaoQuestions,
      questionCount: 5,
    },
  },

  [U.animalsFriends]: {
    unitId: U.animalsFriends,
    learn: {
      unitId: U.animalsFriends,
      steps: [
        {
          heading: "いきものを さがそう",
          body: "こうえんや はらっぱには だんごむし・ちょうちょ・ありが いるよ。そっと さがして みよう。",
          visual: { kind: "emoji", value: "🐛🦋🐜", caption: "いろいろな いきもの" },
        },
        {
          heading: "すみかを しろう",
          body: "だんごむしは いしの した、めだかは {水|みず}の なかに すんで いるよ。",
          visual: { kind: "emoji", value: "🐟", caption: "すみか" },
        },
        {
          heading: "やさしく ふれあう",
          body: "いきものは そっと さわり、つかまえたら もとの ばしょに かえして あげよう。",
          visual: { kind: "emoji", value: "🐢", caption: "やさしく" },
        },
      ],
    },
    test: {
      unitId: U.animalsFriends,
      questions: animalsFriendsQuestions,
      questionCount: 6,
    },
  },

  [U.familyRoles]: {
    unitId: U.familyRoles,
    learn: {
      unitId: U.familyRoles,
      steps: [
        {
          heading: "かぞくを しろう",
          body: "おとうさん・おかあさん・きょうだい・おじいちゃん…いろいろな {家族|かぞく}が いるね。",
          visual: { kind: "emoji", value: "👨‍👩‍👧‍👦", caption: "わたしの かぞく" },
        },
        {
          heading: "おてつだい",
          body: "しょっきを ならべる、くつを そろえる。できる おてつだいを やって みよう。",
          visual: { kind: "emoji", value: "🍽️", caption: "おてつだい" },
        },
        {
          heading: "じぶんの こと",
          body: "じぶんの ふくを たたむ、はを みがく。じぶんの ことを じぶんで できると かっこいいね。",
          visual: { kind: "emoji", value: "🪥", caption: "じぶんで できる" },
        },
      ],
    },
    test: {
      unitId: U.familyRoles,
      questions: familyRolesQuestions,
      questionCount: 5,
    },
  },
};
