// ══════════════════════════════════════════
// カリキュラム: 社会（しゃかい）小5
// 基準テンプレ = src/data/curriculum/sansuu/g1.ts と完全同形の export 構造。
// 単一の真実 = src/types(型) + src/data(データ)。UIロジックは混ぜない。
// ID体系: 領域 = "<subject>.<domain-slug>" / 単元 = "<subject>.g<grade>.<slug>"
// 社会は小3スタート。SubjectId は drill.ts が既に "shakai" を持つため as 等は不要。
//   （申し送り: 万一 SubjectId 未対応だった場合に備え、本ファイルは
//    型を局所で満たす形で書いているが、実際には drill.ts に "shakai" が存在するため未使用）
// 既存 generators は社会に非対応 → 全単元 固定 questions[]（全問 explanation 必須）。
// 表記規約: 全表示テキストは漢字＋全漢字ルビ `{漢字|よみ}`（2026-06-02 CEO方針）。
//   数字・ひらがな・カタカナ・記号はそのまま。RubyText が `<ruby>` に変換して描画する。
// 型は src/types/curriculum.ts を再利用（重複定義しない / アンチ肥大）。
// ══════════════════════════════════════════

import type { Subject, Domain, Unit, UnitContent } from "@/types/curriculum";

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

// ── 領域（小5社会4領域: 地理(国土)/産業/情報/環境） ──
// 申し送り: g3/g4 が未作成のため domain slug は学年共通で使える命名にした。
//   g3/g4 でも shakai.geography / shakai.information / shakai.environment を共有し、
//   産業系は shakai.industry を使う想定（命名整合の起点）。

export const shakaiG5Domains: Domain[] = [
  {
    id: "shakai.geography",
    subjectId: "shakai",
    name: "{国土|こくど}と{地形|ちけい}・{気候|きこう}",
    formalName: "国土と地形・気候",
  },
  {
    id: "shakai.industry",
    subjectId: "shakai",
    name: "{産業|さんぎょう}（{食料|しょくりょう}{生産|せいさん}・{工業|こうぎょう}）",
    formalName: "産業（食料生産・工業）",
  },
  {
    id: "shakai.information",
    subjectId: "shakai",
    name: "{情報|じょうほう}",
    formalName: "情報",
  },
  {
    id: "shakai.environment",
    subjectId: "shakai",
    name: "{自然|しぜん}{環境|かんきょう}と{暮|く}らし",
    formalName: "自然環境と暮らし",
  },
];

// ── 単元 ──────────────────────────────────
// 依存グラフ（prerequisites / leadsTo）。g3/g4(地域・都道府県)を前提に、g6(歴史・政治・国際)へつなぐ。
// 他学年 id は将来 worker が用意する前提で文字列指定（バリデータが最終的に参照解決を検査）。
//
//   world-japan ─▶ landforms ─▶ climate ─▶ regional-life
//                     │            └─▶ rice-farming ─┐
//                     ├─▶ fishery ──────────────────┼─▶ food-import ─▶ trade-transport
//                     ├─▶ industry-overview ─▶ automobile-industry ─┘
//                     └─▶ natural-disaster ─▶ forest ─▶ pollution
//   media-info ─▶ info-society
//
const U = {
  worldJapan: "shakai.g5.world-japan",
  landforms: "shakai.g5.landforms",
  climate: "shakai.g5.climate",
  regionalLife: "shakai.g5.regional-life",
  riceFarming: "shakai.g5.rice-farming",
  fishery: "shakai.g5.fishery",
  foodImport: "shakai.g5.food-import",
  industryOverview: "shakai.g5.industry-overview",
  automobileIndustry: "shakai.g5.automobile-industry",
  tradeTransport: "shakai.g5.trade-transport",
  mediaInfo: "shakai.g5.media-info",
  infoSociety: "shakai.g5.info-society",
  naturalDisaster: "shakai.g5.natural-disaster",
  forest: "shakai.g5.forest",
  pollution: "shakai.g5.pollution",
} as const;

// 他学年/他教科の参照先 id（将来 worker が用意する前提で文字列指定）
const G4 = {
  prefectures: "shakai.g4.prefectures", // 都道府県のようす
  disaster: "shakai.g4.disaster-prevention", // 自然災害からくらしを守る
} as const;
const G6 = {
  global: "shakai.g6.global-society", // 世界の中の日本（国際）
  politics: "shakai.g6.politics", // 政治・くらしと政治
  environment: "shakai.g6.global-environment", // 地球環境とわたしたち
} as const;

export const shakaiG5Units: Unit[] = [
  // ── 地理（国土） ──
  {
    id: U.worldJapan,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.geography",
    title: "{世界|せかい}の{中|なか}の{日本|にほん}",
    order: 1,
    realWorldUse:
      "ニュースや{地図|ちず}で{日本|にほん}の{位置|いち}や{周|まわ}りの{国|くに}を{見|み}るときのように、{世界|せかい}の{中|なか}で{日本|にほん}がどこにあるかを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [U.landforms, U.climate, G6.global],
    prerequisites: [G4.prefectures],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.landforms,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.geography",
    title: "{日本|にほん}の{地形|ちけい}",
    order: 2,
    realWorldUse:
      "{旅行|りょこう}の{計画|けいかく}や{防災|ぼうさい}のときに、{山地|さんち}や{平野|へいや}・{川|かわ}のようすを{知|し}っておくと{役立|やくだ}つよ。",
    leadsTo: [U.climate, U.riceFarming, U.fishery, U.industryOverview, U.naturalDisaster, U.forest],
    prerequisites: [U.worldJapan],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.climate,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.geography",
    title: "{日本|にほん}の{気候|きこう}",
    order: 3,
    realWorldUse:
      "{天気|てんき}{予報|よほう}を{見|み}て{服|ふく}をえらんだり、{季節|きせつ}にあった{農業|のうぎょう}を{考|かんが}えるときに{役立|やくだ}つよ。",
    leadsTo: [U.regionalLife, U.riceFarming],
    prerequisites: [U.landforms],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.regionalLife,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.geography",
    title: "{土地|とち}の{特色|とくしょく}と{人々|ひとびと}の{暮|く}らし",
    order: 4,
    realWorldUse:
      "あたたかい{土地|とち}やさむい{土地|とち}・{高|たか}い{土地|とち}を{旅|たび}するときに、その{場所|ばしょ}の{暮|く}らしの{工夫|くふう}が{分|わ}かるよ。",
    leadsTo: [G6.global],
    prerequisites: [U.climate, U.landforms],
    hasLearn: true,
    hasTest: true,
  },

  // ── 産業（食料生産・工業） ──
  {
    id: U.riceFarming,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.industry",
    title: "{米|こめ}づくりの{さかんな}{地域|ちいき}",
    order: 5,
    realWorldUse:
      "{毎日|まいにち}{食|た}べているごはんが、どこで・どうやって{作|つく}られているかを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [U.foodImport],
    prerequisites: [U.climate, U.landforms],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.fishery,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.industry",
    title: "{水産業|すいさんぎょう}のさかんな{地域|ちいき}",
    order: 6,
    realWorldUse:
      "おすしや{焼|や}き{魚|ざかな}の{魚|さかな}が、どうやってとられて{食卓|しょくたく}にとどくかを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [U.foodImport],
    prerequisites: [U.landforms],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.foodImport,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.industry",
    title: "これからの{食料|しょくりょう}{生産|せいさん}",
    order: 7,
    realWorldUse:
      "スーパーの{食品|しょくひん}が{国産|こくさん}か{輸入|ゆにゅう}かを{見|み}て、{食|しょく}の{安全|あんぜん}や{自給率|じきゅうりつ}を{考|かんが}えるのに{役立|やくだ}つよ。",
    leadsTo: [U.tradeTransport],
    prerequisites: [U.riceFarming, U.fishery],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.industryOverview,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.industry",
    title: "{日本|にほん}の{工業|こうぎょう}",
    order: 8,
    realWorldUse:
      "{身|み}の{回|まわ}りの{製品|せいひん}が、どんな{工業|こうぎょう}でどこの{地域|ちいき}で{作|つく}られているかを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [U.automobileIndustry, U.tradeTransport],
    prerequisites: [U.landforms],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.automobileIndustry,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.industry",
    title: "{自動車|じどうしゃ}をつくる{工業|こうぎょう}",
    order: 9,
    realWorldUse:
      "{道|みち}を{走|はし}る{自動車|じどうしゃ}が、たくさんの{部品|ぶひん}と{人|ひと}の{手|て}でどう{作|つく}られるかを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [U.tradeTransport],
    prerequisites: [U.industryOverview],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.tradeTransport,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.industry",
    title: "{貿易|ぼうえき}と{運輸|うんゆ}",
    order: 10,
    realWorldUse:
      "{外国|がいこく}から{来|き}たものや{外国|がいこく}へ{送|おく}るものが、{船|ふね}や{飛行機|ひこうき}でどう{運|はこ}ばれるかを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [G6.global],
    prerequisites: [U.industryOverview, U.automobileIndustry, U.foodImport],
    hasLearn: true,
    hasTest: true,
  },

  // ── 情報 ──
  {
    id: U.mediaInfo,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.information",
    title: "{情報|じょうほう}を{伝|つた}える{産業|さんぎょう}",
    order: 11,
    realWorldUse:
      "テレビや{新聞|しんぶん}・インターネットのニュースが、どうやって{作|つく}られて{届|とど}くかを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [U.infoSociety],
    prerequisites: [],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.infoSociety,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.information",
    title: "{情報|じょうほう}を{生|い}かす{社会|しゃかい}",
    order: 12,
    realWorldUse:
      "{買|か}い{物|もの}や{病院|びょういん}で{使|つか}われる{情報|じょうほう}や、ネットを{安全|あんぜん}に{使|つか}うルールを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [G6.politics],
    prerequisites: [U.mediaInfo],
    hasLearn: true,
    hasTest: true,
  },

  // ── 環境（自然環境と暮らし） ──
  {
    id: U.naturalDisaster,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.environment",
    title: "{自然|しぜん}{災害|さいがい}を{防|ふせ}ぐ",
    order: 13,
    realWorldUse:
      "{地震|じしん}や{台風|たいふう}・{洪水|こうずい}にそなえて、{家|いえ}や{町|まち}でできる{備|そな}えを{考|かんが}えるのに{役立|やくだ}つよ。",
    leadsTo: [U.forest, G6.politics],
    prerequisites: [U.landforms, U.climate, G4.disaster],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.forest,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.environment",
    title: "{森林|しんりん}とわたしたちの{暮|く}らし",
    order: 14,
    realWorldUse:
      "{家|いえ}や{紙|かみ}に{使|つか}う{木材|もくざい}や、{水|みず}をたくわえる{森|もり}のはたらきを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [U.pollution],
    prerequisites: [U.landforms],
    hasLearn: true,
    hasTest: true,
  },
  {
    id: U.pollution,
    subjectId: "shakai",
    grade: 5,
    domainId: "shakai.environment",
    title: "{公害|こうがい}を{防|ふせ}ぎ{環境|かんきょう}を{守|まも}る",
    order: 15,
    realWorldUse:
      "{昔|むかし}おきた{公害|こうがい}と、{今|いま}みんなで{空気|くうき}や{水|みず}をきれいに{守|まも}る{取|と}り{組|く}みを{知|し}るのに{役立|やくだ}つよ。",
    leadsTo: [G6.environment],
    prerequisites: [U.naturalDisaster],
    hasLearn: true,
    hasTest: true,
  },
];

// ── 単元コンテンツ（学習 learn + テスト test） ──────────────
// 社会は知識系のため generator は使わず、全単元 固定 questions[]（4択・全問 explanation 必須）。
// visual は emoji のみ（地図SVGは SvgParamsMap 未定義のため使わない＝アンチ肥大）。

export const shakaiG5Contents: Record<string, UnitContent> = {
  // 1. 世界の中の日本
  [U.worldJapan]: {
    unitId: U.worldJapan,
    learn: {
      unitId: U.worldJapan,
      steps: [
        {
          heading: "{地球|ちきゅう}の{上|うえ}の{日本|にほん}",
          body: "{日本|にほん}は{ユーラシア}{大陸|たいりく}の{東|ひがし}、{太平洋|たいへいよう}にうかぶ{島国|しまぐに}だよ。{北|きた}から{南|みなみ}に{細|ほそ}くつらなっているよ。",
          visual: { kind: "emoji", value: "🌏🗾", caption: "ユーラシア大陸の 東の 島国" },
        },
        {
          heading: "{4|よっ}つの{大|おお}きな{島|しま}",
          body: "{日本|にほん}は{北海道|ほっかいどう}・{本州|ほんしゅう}・{四国|しこく}・{九州|きゅうしゅう}の{4|よっ}つの{大|おお}きな{島|しま}と、たくさんの{小|ちい}さな{島|しま}でできているよ。",
          visual: { kind: "emoji", value: "🏝️🏝️🏝️🏝️", caption: "北海道・本州・四国・九州" },
        },
        {
          heading: "{周|まわ}りの{国|くに}と{領土|りょうど}",
          body: "{日本|にほん}の{周|まわ}りには{中国|ちゅうごく}・{韓国|かんこく}・ロシアなどの{国|くに}があるよ。{海|うみ}にかこまれ、{国|くに}の{範囲|はんい}を{領土|りょうど}というよ。",
          visual: { kind: "emoji", value: "🧭🌊", caption: "海に かこまれた 国" },
        },
      ],
    },
    test: {
      unitId: U.worldJapan,
      questionCount: 5,
      questions: [
        {
          id: `${U.worldJapan}.q-1`,
          unitId: U.worldJapan,
          prompt: "{日本|にほん}は どんな{国|くに}？",
          explanation: "{日本|にほん}は{海|うみ}にかこまれた「{島国|しまぐに}」だよ。{大陸|たいりく}と{陸|りく}つづきではないよ。",
          format: "choice",
          choices: ["{海|うみ}にかこまれた{島国|しまぐに}", "{大陸|たいりく}とつながった{国|くに}", "{砂漠|さばく}の{国|くに}", "{氷|こおり}だけの{国|くに}"],
          answer: "{海|うみ}にかこまれた{島国|しまぐに}",
        },
        {
          id: `${U.worldJapan}.q-2`,
          unitId: U.worldJapan,
          prompt: "{日本|にほん}の{4|よっ}つの{大|おお}きな{島|しま}にふくまれないのは？",
          explanation: "{4|よっ}つの{大|おお}きな{島|しま}は{北海道|ほっかいどう}・{本州|ほんしゅう}・{四国|しこく}・{九州|きゅうしゅう}だよ。{沖縄|おきなわ}は{小|ちい}さな{島|しま}の{1|ひと}つだよ。",
          format: "choice",
          choices: ["{沖縄|おきなわ}", "{本州|ほんしゅう}", "{四国|しこく}", "{九州|きゅうしゅう}"],
          answer: "{沖縄|おきなわ}",
        },
        {
          id: `${U.worldJapan}.q-3`,
          unitId: U.worldJapan,
          prompt: "{日本|にほん}の{東|ひがし}に{広|ひろ}がる{大|おお}きな{海|うみ}は？",
          explanation: "{日本|にほん}の{東|ひがし}がわには{世界|せかい}でいちばん{広|ひろ}い「{太平洋|たいへいよう}」が{広|ひろ}がっているよ。",
          format: "choice",
          choices: ["{太平洋|たいへいよう}", "{日本海|にほんかい}", "{地中海|ちちゅうかい}", "{大西洋|たいせいよう}"],
          answer: "{太平洋|たいへいよう}",
        },
        {
          id: `${U.worldJapan}.q-4`,
          unitId: U.worldJapan,
          prompt: "{国|くに}がもっている{陸地|りくち}の{範囲|はんい}を{何|なに}という？",
          explanation: "{国|くに}がもつ{陸地|りくち}の{範囲|はんい}を「{領土|りょうど}」というよ。{海|うみ}は{領海|りょうかい}というよ。",
          format: "choice",
          choices: ["{領土|りょうど}", "{首都|しゅと}", "{県境|けんきょう}", "{大陸|たいりく}"],
          answer: "{領土|りょうど}",
        },
        {
          id: `${U.worldJapan}.q-5`,
          unitId: U.worldJapan,
          prompt: "{日本|にほん}と{海|うみ}をへだてて となりあう{国|くに}は？",
          explanation: "{日本|にほん}の{近|ちか}くには{中国|ちゅうごく}・{韓国|かんこく}・ロシアなどがあるよ。アメリカは{太平洋|たいへいよう}をはさんで{遠|とお}くにあるよ。",
          format: "choice",
          choices: ["{韓国|かんこく}", "ブラジル", "エジプト", "オーストラリア"],
          answer: "{韓国|かんこく}",
        },
      ],
    },
  },

  // 2. 日本の地形
  [U.landforms]: {
    unitId: U.landforms,
    learn: {
      unitId: U.landforms,
      steps: [
        {
          heading: "{山|やま}が{多|おお}い{国|くに}",
          body: "{日本|にほん}は{国土|こくど}のおよそ{4|よん}{分|ぶん}の{3|さん}が{山地|さんち}だよ。{中央|ちゅうおう}には{高|たか}い{山|やま}がつらなる{山脈|さんみゃく}があるよ。",
          visual: { kind: "emoji", value: "⛰️🏔️⛰️", caption: "国土の 多くが 山地" },
        },
        {
          heading: "{平野|へいや}と{川|かわ}",
          body: "{海|うみ}の{近|ちか}くの{平|たい}らな{土地|とち}を{平野|へいや}というよ。{川|かわ}が{運|はこ}んだ{土|つち}でできていて、{田|た}んぼや{町|まち}が{広|ひろ}がるよ。",
          visual: { kind: "emoji", value: "🏞️🌾🏘️", caption: "川ぞいに 広がる 平野" },
        },
      ],
    },
    test: {
      unitId: U.landforms,
      questionCount: 5,
      questions: [
        {
          id: `${U.landforms}.q-1`,
          unitId: U.landforms,
          prompt: "{日本|にほん}の{国土|こくど}でいちばん{多|おお}い{地形|ちけい}は？",
          explanation: "{日本|にほん}は{国土|こくど}のおよそ{4|よん}{分|ぶん}の{3|さん}が{山地|さんち}だよ。{平|たい}らな{土地|とち}は{少|すく}ないよ。",
          format: "choice",
          choices: ["{山地|さんち}", "{砂漠|さばく}", "{湖|みずうみ}", "{氷河|ひょうが}"],
          answer: "{山地|さんち}",
        },
        {
          id: `${U.landforms}.q-2`,
          unitId: U.landforms,
          prompt: "{川|かわ}が{運|はこ}んだ{土|つち}でできた、{海|うみ}の{近|ちか}くの{平|たい}らな{土地|とち}を{何|なに}という？",
          explanation: "{川|かわ}が{運|はこ}んだ{土|つち}が つもってできた{平|たい}らな{土地|とち}を「{平野|へいや}」というよ。{人|ひと}が{多|おお}く{住|す}むよ。",
          format: "choice",
          choices: ["{平野|へいや}", "{山脈|さんみゃく}", "{半島|はんとう}", "{台地|だいち}"],
          answer: "{平野|へいや}",
        },
        {
          id: `${U.landforms}.q-3`,
          unitId: U.landforms,
          prompt: "{高|たか}い{山|やま}がいくつも つらなっているところを{何|なに}という？",
          explanation: "{高|たか}い{山|やま}が{列|れつ}のようにつらなったところを「{山脈|さんみゃく}」というよ。{日本|にほん}の{背骨|せぼね}のようだね。",
          format: "choice",
          choices: ["{山脈|さんみゃく}", "{平野|へいや}", "{海岸|かいがん}", "{盆地|ぼんち}"],
          answer: "{山脈|さんみゃく}",
        },
        {
          id: `${U.landforms}.q-4`,
          unitId: U.landforms,
          prompt: "{日本|にほん}の{川|かわ}は{外国|がいこく}の{川|かわ}とくらべて どんな{特色|とくしょく}がある？",
          explanation: "{日本|にほん}は{山|やま}から{海|うみ}までが{近|ちか}いので、{川|かわ}は{短|みじか}くて{流|なが}れが{急|きゅう}だよ。",
          format: "choice",
          choices: ["{短|みじか}くて{流|なが}れが{急|きゅう}", "{長|なが}くてゆるやか", "{流|なが}れがとまっている", "{塩水|しおみず}が{流|なが}れる"],
          answer: "{短|みじか}くて{流|なが}れが{急|きゅう}",
        },
        {
          id: `${U.landforms}.q-5`,
          unitId: U.landforms,
          prompt: "{まわ}りを{山|やま}にかこまれた{平|たい}らな{土地|とち}を{何|なに}という？",
          explanation: "{まわ}りを{山|やま}にかこまれた{平|たい}らな{土地|とち}を「{盆地|ぼんち}」というよ。{昼|ひる}と{夜|よる}の{気温|きおん}の{差|さ}が{大|おお}きいよ。",
          format: "choice",
          choices: ["{盆地|ぼんち}", "{平野|へいや}", "{半島|はんとう}", "{湾|わん}"],
          answer: "{盆地|ぼんち}",
        },
      ],
    },
  },

  // 3. 日本の気候
  [U.climate]: {
    unitId: U.climate,
    learn: {
      unitId: U.climate,
      steps: [
        {
          heading: "{4|よっ}つの{季節|きせつ}",
          body: "{日本|にほん}には{春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ}の{4|よっ}つの{季節|きせつ}があるよ。{夏|なつ}と{冬|ふゆ}で{風|かぜ}のむき（{季節風|きせつふう}）がかわるよ。",
          visual: { kind: "emoji", value: "🌸☀️🍁❄️", caption: "春・夏・秋・冬" },
        },
        {
          heading: "{地域|ちいき}でちがう{気候|きこう}",
          body: "{北海道|ほっかいどう}はすずしく{冬|ふゆ}が{長|なが}く、{沖縄|おきなわ}は{一年中|いちねんじゅう}あたたかいよ。{日本海|にほんかい}がわは{冬|ふゆ}に{雪|ゆき}が{多|おお}いよ。",
          visual: { kind: "emoji", value: "🌨️🏝️", caption: "北はさむく 南はあたたかい" },
        },
      ],
    },
    test: {
      unitId: U.climate,
      questionCount: 5,
      questions: [
        {
          id: `${U.climate}.q-1`,
          unitId: U.climate,
          prompt: "{季節|きせつ}によって ふく むきがかわる{風|かぜ}を{何|なに}という？",
          explanation: "{夏|なつ}と{冬|ふゆ}で ふく むきがかわる{風|かぜ}を「{季節風|きせつふう}」というよ。{日本|にほん}の{気候|きこう}に{大|おお}きく{関係|かんけい}するよ。",
          format: "choice",
          choices: ["{季節風|きせつふう}", "{台風|たいふう}", "{つむじ風|かぜ}", "{陸風|りくふう}"],
          answer: "{季節風|きせつふう}",
        },
        {
          id: `${U.climate}.q-2`,
          unitId: U.climate,
          prompt: "{冬|ふゆ}に{雪|ゆき}がとても{多|おお}くふるのはどこがわ？",
          explanation: "{冬|ふゆ}の{季節風|きせつふう}が{日本海|にほんかい}の{水|みず}をふくみ、{山|やま}にぶつかって{日本海|にほんかい}がわに{多|おお}くの{雪|ゆき}をふらせるよ。",
          format: "choice",
          choices: ["{日本海|にほんかい}がわ", "{太平洋|たいへいよう}がわ", "{沖縄|おきなわ}", "{砂漠|さばく}"],
          answer: "{日本海|にほんかい}がわ",
        },
        {
          id: `${U.climate}.q-3`,
          unitId: U.climate,
          prompt: "{一年中|いちねんじゅう}あたたかく、{冬|ふゆ}でもすごしやすいのはどこ？",
          explanation: "{南|みなみ}にある{沖縄|おきなわ}は{一年中|いちねんじゅう}あたたかいよ。{逆|ぎゃく}に{北|きた}の{北海道|ほっかいどう}はすずしいよ。",
          format: "choice",
          choices: ["{沖縄|おきなわ}", "{北海道|ほっかいどう}", "{東北|とうほく}", "{日本海|にほんかい}がわ"],
          answer: "{沖縄|おきなわ}",
        },
        {
          id: `${U.climate}.q-4`,
          unitId: U.climate,
          prompt: "{6|ろく}{月|がつ}ごろ{雨|あめ}が{多|おお}くふる{時期|じき}を{何|なに}という？",
          explanation: "{初夏|しょか}に{雨|あめ}がつづく{時期|じき}を「{梅雨|つゆ}」というよ。{米|こめ}づくりに{大切|たいせつ}な{水|みず}になるよ。",
          format: "choice",
          choices: ["{梅雨|つゆ}", "{真冬|まふゆ}", "{台風|たいふう}", "{乾季|かんき}"],
          answer: "{梅雨|つゆ}",
        },
        {
          id: `${U.climate}.q-5`,
          unitId: U.climate,
          prompt: "{夏|なつ}から{秋|あき}にかけて{強|つよ}い{風|かぜ}と{雨|あめ}をもたらすものは？",
          explanation: "{夏|なつ}から{秋|あき}にかけて{南|みなみ}の{海|うみ}から やってくる「{台風|たいふう}」は、{強|つよ}い{風|かぜ}と{大雨|おおあめ}をもたらすよ。",
          format: "choice",
          choices: ["{台風|たいふう}", "{季節風|きせつふう}", "{梅雨|つゆ}", "{雪|ゆき}"],
          answer: "{台風|たいふう}",
        },
      ],
    },
  },

  // 4. 土地の特色と人々の暮らし
  [U.regionalLife]: {
    unitId: U.regionalLife,
    learn: {
      unitId: U.regionalLife,
      steps: [
        {
          heading: "あたたかい{土地|とち}の{暮|く}らし",
          body: "{沖縄|おきなわ}では{台風|たいふう}にそなえて{家|いえ}のまわりを{石垣|いしがき}でかこんだり、{屋根|やね}を{低|ひく}くする{工夫|くふう}があるよ。",
          visual: { kind: "emoji", value: "🏝️🏠", caption: "あたたかい 土地の くらし" },
        },
        {
          heading: "さむい{土地|とち}・{高|たか}い{土地|とち}の{暮|く}らし",
          body: "{北海道|ほっかいどう}では{雪|ゆき}にそなえた{家|いえ}づくりをし、{高|たか}い{土地|とち}ではすずしさを{生|い}かして{野菜|やさい}を{育|そだ}てるよ。",
          visual: { kind: "emoji", value: "❄️🏠🥬", caption: "さむさ・すずしさを 生かす" },
        },
      ],
    },
    test: {
      unitId: U.regionalLife,
      questionCount: 5,
      questions: [
        {
          id: `${U.regionalLife}.q-1`,
          unitId: U.regionalLife,
          prompt: "{沖縄|おきなわ}の{家|いえ}に{多|おお}い{工夫|くふう}は？",
          explanation: "{沖縄|おきなわ}は{台風|たいふう}が{多|おお}いので、{家|いえ}を{石垣|いしがき}でかこんだり{屋根|やね}を{低|ひく}くして{風|かぜ}にそなえるよ。",
          format: "choice",
          choices: ["{石垣|いしがき}で{家|いえ}をかこむ", "{屋根|やね}に{雪|ゆき}どめをつける", "{二重|にじゅう}まどにする", "{地下|ちか}に{家|いえ}をつくる"],
          answer: "{石垣|いしがき}で{家|いえ}をかこむ",
        },
        {
          id: `${U.regionalLife}.q-2`,
          unitId: U.regionalLife,
          prompt: "{北海道|ほっかいどう}など{雪|ゆき}の{多|おお}い{土地|とち}の{家|いえ}の{工夫|くふう}は？",
          explanation: "{雪|ゆき}の{多|おお}い{土地|とち}では、{屋根|やね}の{雪|ゆき}をおとす{工夫|くふう}や、{家|いえ}をあたたかくたもつ{二重|にじゅう}まどなどがあるよ。",
          format: "choice",
          choices: ["{雪|ゆき}がおちやすい{屋根|やね}", "{石垣|いしがき}で{風|かぜ}をふせぐ", "{屋根|やね}をひらたくする", "まどをなくす"],
          answer: "{雪|ゆき}がおちやすい{屋根|やね}",
        },
        {
          id: `${U.regionalLife}.q-3`,
          unitId: U.regionalLife,
          prompt: "{高|たか}い{土地|とち}のすずしい{気候|きこう}を{生|い}かして{育|そだ}てられるのは？",
          explanation: "{高原|こうげん}などすずしい{土地|とち}では、レタスやキャベツなどの{野菜|やさい}を{夏|なつ}に{育|そだ}てて{出荷|しゅっか}するよ。",
          format: "choice",
          choices: ["すずしさを{好|この}む{野菜|やさい}", "あたたかい{南国|なんごく}のくだもの", "{米|こめ}だけ", "{海|うみ}の{魚|さかな}"],
          answer: "すずしさを{好|この}む{野菜|やさい}",
        },
        {
          id: `${U.regionalLife}.q-4`,
          unitId: U.regionalLife,
          prompt: "{土地|とち}の{特色|とくしょく}にあわせた{暮|く}らしをするのはなぜ？",
          explanation: "{気候|きこう}や{地形|ちけい}は{場所|ばしょ}ごとにちがうので、その{土地|とち}にあった{工夫|くふう}をすると{暮|く}らしやすくなるよ。",
          format: "choice",
          choices: ["その{土地|とち}で{暮|く}らしやすくするため", "{有名|ゆうめい}になるため", "ぜいたくをするため", "{税金|ぜいきん}を{集|あつ}めるため"],
          answer: "その{土地|とち}で{暮|く}らしやすくするため",
        },
        {
          id: `${U.regionalLife}.q-5`,
          unitId: U.regionalLife,
          prompt: "あたたかい{気候|きこう}を{生|い}かして{沖縄|おきなわ}で さかんなのは？",
          explanation: "あたたかい{沖縄|おきなわ}では、さとうきびや{南国|なんごく}のくだもの{作|づく}り、そして{観光|かんこう}がさかんだよ。",
          format: "choice",
          choices: ["さとうきびや{観光|かんこう}", "りんご{作|づく}り", "{雪|ゆき}まつり", "{石油|せきゆ}の{採掘|さいくつ}"],
          answer: "さとうきびや{観光|かんこう}",
        },
      ],
    },
  },

  // 5. 米づくりのさかんな地域
  [U.riceFarming]: {
    unitId: U.riceFarming,
    learn: {
      unitId: U.riceFarming,
      steps: [
        {
          heading: "{米|こめ}ができるまで",
          body: "{春|はる}に{苗|なえ}を{育|そだ}てて{田|た}んぼに{植|う}え（{田植|たう}え）、{夏|なつ}にせわをし、{秋|あき}に{刈|か}り{取|と}る（{稲|いね}かり）よ。{1|いち}{年|ねん}かけて{育|そだ}てるよ。",
          visual: { kind: "emoji", value: "🌱🌾🌾", caption: "田植え → 育てる → 稲かり" },
        },
        {
          heading: "さかんな{地域|ちいき}と{工夫|くふう}",
          body: "{雪|ゆき}どけ{水|みず}が{豊|ゆた}かな{東北|とうほく}や{北陸|ほくりく}で さかんだよ。{機械|きかい}を{使|つか}い、おいしい{品種|ひんしゅ}を{作|つく}る{工夫|くふう}をしているよ。",
          visual: { kind: "emoji", value: "🚜🌾🍚", caption: "機械と 品種改良の 工夫" },
        },
      ],
    },
    test: {
      unitId: U.riceFarming,
      questionCount: 5,
      questions: [
        {
          id: `${U.riceFarming}.q-1`,
          unitId: U.riceFarming,
          prompt: "{春|はる}に{苗|なえ}を{田|た}んぼに{植|う}える{作業|さぎょう}を{何|なに}という？",
          explanation: "{育|そだ}てた{苗|なえ}を{田|た}んぼに{植|う}える{作業|さぎょう}を「{田植|たう}え」というよ。{米|こめ}づくりのはじまりだよ。",
          format: "choice",
          choices: ["{田植|たう}え", "{稲|いね}かり", "{種|たね}まき", "{草|くさ}とり"],
          answer: "{田植|たう}え",
        },
        {
          id: `${U.riceFarming}.q-2`,
          unitId: U.riceFarming,
          prompt: "{秋|あき}に{実|みの}った{稲|いね}を{刈|か}り{取|と}る{作業|さぎょう}を{何|なに}という？",
          explanation: "{秋|あき}に{実|みの}った{稲|いね}を{刈|か}り{取|と}ることを「{稲|いね}かり」というよ。いまはコンバインという{機械|きかい}を{使|つか}うことが{多|おお}いよ。",
          format: "choice",
          choices: ["{稲|いね}かり", "{田植|たう}え", "{田|た}おこし", "{水|みず}やり"],
          answer: "{稲|いね}かり",
        },
        {
          id: `${U.riceFarming}.q-3`,
          unitId: U.riceFarming,
          prompt: "{米|こめ}づくりがさかんな{地域|ちいき}に{多|おお}いのは？",
          explanation: "{雪|ゆき}どけ{水|みず}が{豊|ゆた}かで{広|ひろ}い{平野|へいや}がある{東北|とうほく}や{北陸|ほくりく}で{米|こめ}づくりがさかんだよ。",
          format: "choice",
          choices: ["{東北|とうほく}や{北陸|ほくりく}", "{沖縄|おきなわ}", "{砂漠|さばく}のある{地域|ちいき}", "{都会|とかい}の{中心|ちゅうしん}"],
          answer: "{東北|とうほく}や{北陸|ほくりく}",
        },
        {
          id: `${U.riceFarming}.q-4`,
          unitId: U.riceFarming,
          prompt: "おいしくて{病気|びょうき}に{強|つよ}い{米|こめ}を{作|つく}るための{工夫|くふう}を{何|なに}という？",
          explanation: "よりよい{米|こめ}を{作|つく}るために{品種|ひんしゅ}をかけあわせる{工夫|くふう}を「{品種|ひんしゅ}{改良|かいりょう}」というよ。",
          format: "choice",
          choices: ["{品種|ひんしゅ}{改良|かいりょう}", "{輸入|ゆにゅう}", "{減反|げんたん}", "{出荷|しゅっか}"],
          answer: "{品種|ひんしゅ}{改良|かいりょう}",
        },
        {
          id: `${U.riceFarming}.q-5`,
          unitId: U.riceFarming,
          prompt: "{米|こめ}づくりで{機械|きかい}を{使|つか}うようになって{変|か}わったことは？",
          explanation: "トラクターやコンバインなどの{機械|きかい}を{使|つか}うことで、{作業|さぎょう}が{楽|らく}になり{少|すく}ない{人数|にんずう}で{広|ひろ}い{田|た}んぼを{作|つく}れるようになったよ。",
          format: "choice",
          choices: ["{少|すく}ない{人数|にんずう}でできるようになった", "もっと{人手|ひとで}が{必要|ひつよう}になった", "{米|こめ}がとれなくなった", "{田|た}んぼがなくなった"],
          answer: "{少|すく}ない{人数|にんずう}でできるようになった",
        },
      ],
    },
  },

  // 6. 水産業のさかんな地域
  [U.fishery]: {
    unitId: U.fishery,
    learn: {
      unitId: U.fishery,
      steps: [
        {
          heading: "{魚|さかな}をとる{仕事|しごと}",
          body: "{船|ふね}で{海|うみ}に{出|で}て{魚|さかな}をとる{仕事|しごと}を{漁業|ぎょぎょう}というよ。{近|ちか}くの{海|うみ}でとる{漁|りょう}も、{遠|とお}くの{海|うみ}まで{行|い}く{漁|りょう}もあるよ。",
          visual: { kind: "emoji", value: "🚢🐟🐟", caption: "船で 魚を とる" },
        },
        {
          heading: "{育|そだ}てる{漁業|ぎょぎょう}",
          body: "{魚|さかな}や{貝|かい}を いけすなどで{育|そだ}ててからとる「{養殖|ようしょく}」もあるよ。{安定|あんてい}して{魚|さかな}をとどけられる{工夫|くふう}だよ。",
          visual: { kind: "emoji", value: "🐠🦪", caption: "育ててから とる 養殖" },
        },
      ],
    },
    test: {
      unitId: U.fishery,
      questionCount: 5,
      questions: [
        {
          id: `${U.fishery}.q-1`,
          unitId: U.fishery,
          prompt: "{海|うみ}で{魚|さかな}や{貝|かい}をとる{仕事|しごと}を{何|なに}という？",
          explanation: "{海|うみ}で{魚|さかな}や{貝|かい}をとる{仕事|しごと}を「{漁業|ぎょぎょう}」というよ。{食卓|しょくたく}の{魚|さかな}をささえているよ。",
          format: "choice",
          choices: ["{漁業|ぎょぎょう}", "{農業|のうぎょう}", "{林業|りんぎょう}", "{工業|こうぎょう}"],
          answer: "{漁業|ぎょぎょう}",
        },
        {
          id: `${U.fishery}.q-2`,
          unitId: U.fishery,
          prompt: "{魚|さかな}や{貝|かい}を いけすで{育|そだ}ててからとる{方法|ほうほう}を{何|なに}という？",
          explanation: "いけすなどで{魚|さかな}を{育|そだ}ててからとる{方法|ほうほう}を「{養殖|ようしょく}」というよ。{計画|けいかく}{的|てき}に{出荷|しゅっか}できるよ。",
          format: "choice",
          choices: ["{養殖|ようしょく}", "{遠洋|えんよう}{漁業|ぎょぎょう}", "{品種|ひんしゅ}{改良|かいりょう}", "{輸入|ゆにゅう}"],
          answer: "{養殖|ようしょく}",
        },
        {
          id: `${U.fishery}.q-3`,
          unitId: U.fishery,
          prompt: "{魚|さかな}がたくさん{集|あつ}まる、{栄養|えいよう}{豊|ゆた}かな{海|うみ}の{場所|ばしょ}を{何|なに}という？",
          explanation: "あたたかい{海水|かいすい}とつめたい{海水|かいすい}がぶつかる「{潮目|しおめ}」には{魚|さかな}がたくさん{集|あつ}まり、よい{漁場|ぎょじょう}になるよ。",
          format: "choice",
          choices: ["{潮目|しおめ}", "{砂浜|すなはま}", "{湖|みずうみ}", "{港|みなと}"],
          answer: "{潮目|しおめ}",
        },
        {
          id: `${U.fishery}.q-4`,
          unitId: U.fishery,
          prompt: "とりすぎで{魚|さかな}がへらないようにする{取|と}り{組|く}みは？",
          explanation: "とる{量|りょう}や{時期|じき}を{決|き}めるなど、{魚|さかな}をとりすぎないようにして{資源|しげん}を{守|まも}る{工夫|くふう}がされているよ。",
          format: "choice",
          choices: ["とる{量|りょう}や{時期|じき}を{決|き}める", "できるだけ{多|おお}くとる", "{小|ちい}さい{魚|さかな}もすべてとる", "{漁|りょう}をやめる"],
          answer: "とる{量|りょう}や{時期|じき}を{決|き}める",
        },
        {
          id: `${U.fishery}.q-5`,
          unitId: U.fishery,
          prompt: "とれた{魚|さかな}が{新鮮|しんせん}なまま{店|みせ}にとどくのはなぜ？",
          explanation: "{魚|さかな}は{冷|ひ}やしたり{冷凍|れいとう}して、トラックなどですばやく{運|はこ}ぶので{新鮮|しんせん}なまま{店|みせ}にとどくよ。",
          format: "choice",
          choices: ["{冷|ひ}やしてはやく{運|はこ}ぶから", "{時間|じかん}をかけて{運|はこ}ぶから", "{店|みせ}で{育|そだ}てるから", "{乾|かわ}かして{運|はこ}ぶから"],
          answer: "{冷|ひ}やしてはやく{運|はこ}ぶから",
        },
      ],
    },
  },

  // 7. これからの食料生産
  [U.foodImport]: {
    unitId: U.foodImport,
    learn: {
      unitId: U.foodImport,
      steps: [
        {
          heading: "{食料|しょくりょう}{自給率|じきゅうりつ}",
          body: "{国内|こくない}で{食|た}べるもののうち、{国内|こくない}で{作|つく}っている{割合|わりあい}を「{食料|しょくりょう}{自給率|じきゅうりつ}」というよ。{日本|にほん}は{多|おお}くを{外国|がいこく}から{輸入|ゆにゅう}しているよ。",
          visual: { kind: "emoji", value: "🍞🥩🌽", caption: "多くを 輸入に たよる" },
        },
        {
          heading: "これからの{課題|かだい}",
          body: "{農家|のうか}の{人|ひと}がへって{高齢|こうれい}になっていることや、{食|しょく}の{安全|あんぜん}・{地産地消|ちさんちしょう}が{大切|たいせつ}な{課題|かだい}だよ。",
          visual: { kind: "emoji", value: "👨‍🌾🥬♻️", caption: "安全と 地産地消の くふう" },
        },
      ],
    },
    test: {
      unitId: U.foodImport,
      questionCount: 5,
      questions: [
        {
          id: `${U.foodImport}.q-1`,
          unitId: U.foodImport,
          prompt: "{国内|こくない}で{食|た}べるもののうち{国内|こくない}で{作|つく}る{割合|わりあい}を{何|なに}という？",
          explanation: "{国内|こくない}でまかなえている{割合|わりあい}を「{食料|しょくりょう}{自給率|じきゅうりつ}」というよ。{日本|にほん}はこの{割合|わりあい}が{低|ひく}めだよ。",
          format: "choice",
          choices: ["{食料|しょくりょう}{自給率|じきゅうりつ}", "{出荷|しゅっか}{量|りょう}", "{生産|せいさん}{高|だか}", "{貿易|ぼうえき}{額|がく}"],
          answer: "{食料|しょくりょう}{自給率|じきゅうりつ}",
        },
        {
          id: `${U.foodImport}.q-2`,
          unitId: U.foodImport,
          prompt: "{日本|にほん}が{外国|がいこく}から{多|おお}く{買|か}っている{食料|しょくりょう}を{何|なに}という？",
          explanation: "{外国|がいこく}から{買|か}い{入|い}れることを「{輸入|ゆにゅう}」というよ。{日本|にほん}は{小麦|こむぎ}や{肉|にく}などを{多|おお}く{輸入|ゆにゅう}しているよ。",
          format: "choice",
          choices: ["{輸入|ゆにゅう}{食料|しょくりょう}", "{輸出|ゆしゅつ}{食料|しょくりょう}", "{国産|こくさん}{食料|しょくりょう}", "{加工|かこう}{食品|しょくひん}"],
          answer: "{輸入|ゆにゅう}{食料|しょくりょう}",
        },
        {
          id: `${U.foodImport}.q-3`,
          unitId: U.foodImport,
          prompt: "{地元|じもと}でとれたものを{地元|じもと}で{食|た}べることを{何|なに}という？",
          explanation: "{地元|じもと}で{生産|せいさん}したものを{地元|じもと}で{消費|しょうひ}することを「{地産地消|ちさんちしょう}」というよ。{新鮮|しんせん}で{運|はこ}ぶ{距離|きょり}も{短|みじか}いよ。",
          format: "choice",
          choices: ["{地産地消|ちさんちしょう}", "{輸入|ゆにゅう}", "{自給率|じきゅうりつ}", "{品種|ひんしゅ}{改良|かいりょう}"],
          answer: "{地産地消|ちさんちしょう}",
        },
        {
          id: `${U.foodImport}.q-4`,
          unitId: U.foodImport,
          prompt: "いまの{農業|のうぎょう}がかかえる{問題|もんだい}は？",
          explanation: "{農業|のうぎょう}をする{人|ひと}がへり、{年|とし}をとった{人|ひと}が{多|おお}くなっていることが{大|おお}きな{問題|もんだい}だよ。",
          format: "choice",
          choices: ["{農家|のうか}がへり{高齢化|こうれいか}している", "{農家|のうか}がふえすぎている", "{田|た}んぼが{足|た}りないほど{人|ひと}が{多|おお}い", "{作物|さくもつ}がとれすぎている"],
          answer: "{農家|のうか}がへり{高齢化|こうれいか}している",
        },
        {
          id: `${U.foodImport}.q-5`,
          unitId: U.foodImport,
          prompt: "{食|た}べ{物|もの}の{安全|あんぜん}のために{表示|ひょうじ}されているものは？",
          explanation: "{食品|しょくひん}には{産地|さんち}や{原材料|げんざいりょう}が{表示|ひょうじ}されていて、どこで{作|つく}られたか{安心|あんしん}して{選|えら}べるようになっているよ。",
          format: "choice",
          choices: ["{産地|さんち}や{原材料|げんざいりょう}の{表示|ひょうじ}", "{作|つく}った{人|ひと}の{住所|じゅうしょ}", "ねだんだけ", "{重|おも}さだけ"],
          answer: "{産地|さんち}や{原材料|げんざいりょう}の{表示|ひょうじ}",
        },
      ],
    },
  },

  // 8. 日本の工業
  [U.industryOverview]: {
    unitId: U.industryOverview,
    learn: {
      unitId: U.industryOverview,
      steps: [
        {
          heading: "{工業|こうぎょう}の{種類|しゅるい}",
          body: "{機械|きかい}・{金属|きんぞく}・{化学|かがく}・{食料品|しょくりょうひん}などの{工業|こうぎょう}があるよ。{原料|げんりょう}を{加工|かこう}して{役|やく}に{立|た}つ{製品|せいひん}をつくるよ。",
          visual: { kind: "emoji", value: "🏭⚙️🧪", caption: "原料を 製品に かえる" },
        },
        {
          heading: "{工業|こうぎょう}のさかんな{場所|ばしょ}",
          body: "{海|うみ}ぞいの{平野|へいや}に{工場|こうじょう}が{集|あつ}まり、{工業|こうぎょう}{地帯|ちたい}・{地域|ちいき}をつくっているよ。{原料|げんりょう}や{製品|せいひん}を{船|ふね}で{運|はこ}びやすいからだよ。",
          visual: { kind: "emoji", value: "🏭🚢🌊", caption: "海ぞいに 工場が 集まる" },
        },
      ],
    },
    test: {
      unitId: U.industryOverview,
      questionCount: 5,
      questions: [
        {
          id: `${U.industryOverview}.q-1`,
          unitId: U.industryOverview,
          prompt: "{自動車|じどうしゃ}や{電気|でんき}{製品|せいひん}をつくる{工業|こうぎょう}を{何|なに}{工業|こうぎょう}という？",
          explanation: "{機械|きかい}や{自動車|じどうしゃ}・{電気|でんき}{製品|せいひん}をつくる{工業|こうぎょう}を「{機械|きかい}{工業|こうぎょう}」というよ。{日本|にほん}でいちばんさかんだよ。",
          format: "choice",
          choices: ["{機械|きかい}{工業|こうぎょう}", "{食料品|しょくりょうひん}{工業|こうぎょう}", "{化学|かがく}{工業|こうぎょう}", "せんい{工業|こうぎょう}"],
          answer: "{機械|きかい}{工業|こうぎょう}",
        },
        {
          id: `${U.industryOverview}.q-2`,
          unitId: U.industryOverview,
          prompt: "{工場|こうじょう}が{海|うみ}ぞいの{平野|へいや}に{多|おお}いのはなぜ？",
          explanation: "{原料|げんりょう}や{製品|せいひん}を{船|ふね}で{運|はこ}びやすいので、{工場|こうじょう}は{海|うみ}ぞいの{平野|へいや}に{多|おお}く{集|あつ}まるよ。",
          format: "choice",
          choices: ["{船|ふね}で{運|はこ}びやすいから", "{山|やま}が{近|ちか}いから", "{雪|ゆき}が{多|おお}いから", "{人|ひと}が{少|すく}ないから"],
          answer: "{船|ふね}で{運|はこ}びやすいから",
        },
        {
          id: `${U.industryOverview}.q-3`,
          unitId: U.industryOverview,
          prompt: "{工場|こうじょう}が{集|あつ}まってできた{地域|ちいき}を{何|なに}という？",
          explanation: "{工場|こうじょう}が{帯|おび}のように{集|あつ}まったところを「{工業|こうぎょう}{地帯|ちたい}」や「{工業|こうぎょう}{地域|ちいき}」というよ。",
          format: "choice",
          choices: ["{工業|こうぎょう}{地帯|ちたい}", "{農業|のうぎょう}{地帯|ちたい}", "{漁港|ぎょこう}", "{商店街|しょうてんがい}"],
          answer: "{工業|こうぎょう}{地帯|ちたい}",
        },
        {
          id: `${U.industryOverview}.q-4`,
          unitId: U.industryOverview,
          prompt: "{日本|にほん}の{工場|こうじょう}の{多|おお}くをしめるのは？",
          explanation: "{日本|にほん}の{工場|こうじょう}の{大半|たいはん}は、{働|はたら}く{人|ひと}が{少|すく}ない「{中小|ちゅうしょう}{工場|こうじょう}」だよ。すぐれた{技術|ぎじゅつ}をもつ{工場|こうじょう}も{多|おお}いよ。",
          format: "choice",
          choices: ["{中小|ちゅうしょう}{工場|こうじょう}", "{大|おお}きな{工場|こうじょう}だけ", "{外国|がいこく}の{工場|こうじょう}", "{農家|のうか}"],
          answer: "{中小|ちゅうしょう}{工場|こうじょう}",
        },
        {
          id: `${U.industryOverview}.q-5`,
          unitId: U.industryOverview,
          prompt: "{工業|こうぎょう}でする「{加工|かこう}」とはどんなこと？",
          explanation: "{鉄|てつ}や{石油|せきゆ}などの{原料|げんりょう}に{手|て}をくわえて、{役|やく}に{立|た}つ{製品|せいひん}につくりかえることを「{加工|かこう}」というよ。",
          format: "choice",
          choices: ["{原料|げんりょう}を{製品|せいひん}につくりかえること", "{作物|さくもつ}を{育|そだ}てること", "{魚|さかな}をとること", "ものを{運|はこ}ぶこと"],
          answer: "{原料|げんりょう}を{製品|せいひん}につくりかえること",
        },
      ],
    },
  },

  // 9. 自動車をつくる工業
  [U.automobileIndustry]: {
    unitId: U.automobileIndustry,
    learn: {
      unitId: U.automobileIndustry,
      steps: [
        {
          heading: "ながれ{作業|さぎょう}でつくる",
          body: "{自動車|じどうしゃ}は{流|なが}れてくるラインで、{部品|ぶひん}をじゅんばんに{組|く}み{立|た}ててつくるよ。たくさんの{自動車|じどうしゃ}をはやくつくれるよ。",
          visual: { kind: "emoji", value: "🚗🔧🏭", caption: "ラインで 組み立てる" },
        },
        {
          heading: "{部品|ぶひん}をつくる{工場|こうじょう}",
          body: "{1|いち}{台|だい}の{自動車|じどうしゃ}は{約|やく}{3|さん}{万|まん}この{部品|ぶひん}でできているよ。{多|おお}くの{関連|かんれん}{工場|こうじょう}が{必要|ひつよう}な{部品|ぶひん}をとどけるよ。",
          visual: { kind: "emoji", value: "⚙️🚚🏭", caption: "関連工場から 部品が とどく" },
        },
      ],
    },
    test: {
      unitId: U.automobileIndustry,
      questionCount: 5,
      questions: [
        {
          id: `${U.automobileIndustry}.q-1`,
          unitId: U.automobileIndustry,
          prompt: "{自動車|じどうしゃ}を{流|なが}れるラインでじゅんばんに{組|く}み{立|た}てる{作業|さぎょう}を{何|なに}という？",
          explanation: "{流|なが}れてくる{車|くるま}に じゅんばんに{部品|ぶひん}をつける{作業|さぎょう}を「ながれ{作業|さぎょう}（ライン{生産|せいさん}）」というよ。",
          format: "choice",
          choices: ["ながれ{作業|さぎょう}", "{手|て}づくり", "{品種|ひんしゅ}{改良|かいりょう}", "{養殖|ようしょく}"],
          answer: "ながれ{作業|さぎょう}",
        },
        {
          id: `${U.automobileIndustry}.q-2`,
          unitId: U.automobileIndustry,
          prompt: "{自動車|じどうしゃ}{工場|こうじょう}に{部品|ぶひん}をとどける{工場|こうじょう}を{何|なに}という？",
          explanation: "{自動車|じどうしゃ}{会社|がいしゃ}に{部品|ぶひん}をとどける{工場|こうじょう}を「{関連|かんれん}{工場|こうじょう}」というよ。たくさんの{工場|こうじょう}がささえているよ。",
          format: "choice",
          choices: ["{関連|かんれん}{工場|こうじょう}", "{製鉄所|せいてつじょ}", "{発電所|はつでんしょ}", "{農場|のうじょう}"],
          answer: "{関連|かんれん}{工場|こうじょう}",
        },
        {
          id: `${U.automobileIndustry}.q-3`,
          unitId: U.automobileIndustry,
          prompt: "{必要|ひつよう}な{部品|ぶひん}を{必要|ひつよう}な{分|ぶん}だけとどける{仕組|しく}みのよさは？",
          explanation: "{必要|ひつよう}な{時|とき}に{必要|ひつよう}な{量|りょう}だけ{部品|ぶひん}をとどけると、{置|お}き{場所|ばしょ}やむだをへらせるよ。",
          format: "choice",
          choices: ["むだをへらせる", "{部品|ぶひん}があまる", "{時間|じかん}がかかる", "{値段|ねだん}が{高|たか}くなる"],
          answer: "むだをへらせる",
        },
        {
          id: `${U.automobileIndustry}.q-4`,
          unitId: U.automobileIndustry,
          prompt: "{重|おも}くて あぶない{作業|さぎょう}でよく{使|つか}われるものは？",
          explanation: "{重|おも}い{部品|ぶひん}をはこんだり ようせつしたりする あぶない{作業|さぎょう}では「{産業|さんぎょう}ロボット」が{活躍|かつやく}するよ。",
          format: "choice",
          choices: ["{産業|さんぎょう}ロボット", "{動物|どうぶつ}", "{船|ふね}", "{飛行機|ひこうき}"],
          answer: "{産業|さんぎょう}ロボット",
        },
        {
          id: `${U.automobileIndustry}.q-5`,
          unitId: U.automobileIndustry,
          prompt: "{地球|ちきゅう}の{環境|かんきょう}にやさしい{自動車|じどうしゃ}の{工夫|くふう}は？",
          explanation: "{電気|でんき}で{走|はし}る{車|くるま}など、{排気|はいき}ガスを{減|へ}らす{自動車|じどうしゃ}の{開発|かいはつ}が{進|すす}んでいるよ。",
          format: "choice",
          choices: ["{電気|でんき}で{走|はし}る{車|くるま}", "より{大|おお}きな{排気|はいき}ガスを{出|だ}す{車|くるま}", "{走|はし}らない{車|くるま}", "{木|き}でできた{車|くるま}"],
          answer: "{電気|でんき}で{走|はし}る{車|くるま}",
        },
      ],
    },
  },

  // 10. 貿易と運輸
  [U.tradeTransport]: {
    unitId: U.tradeTransport,
    learn: {
      unitId: U.tradeTransport,
      steps: [
        {
          heading: "{輸出|ゆしゅつ}と{輸入|ゆにゅう}",
          body: "{外国|がいこく}に{売|う}ることを{輸出|ゆしゅつ}、{外国|がいこく}から{買|か}うことを{輸入|ゆにゅう}というよ。{2|ふた}つあわせて「{貿易|ぼうえき}」というよ。",
          visual: { kind: "emoji", value: "📦➡️🌍⬅️🛢️", caption: "輸出と 輸入" },
        },
        {
          heading: "{船|ふね}と{飛行機|ひこうき}で{運|はこ}ぶ",
          body: "{重|おも}いものや{大量|たいりょう}のものは{船|ふね}で、{軽|かる}くて{急|いそ}ぐものは{飛行機|ひこうき}で{運|はこ}ぶよ。{運|はこ}ぶ{仕事|しごと}を{運輸|うんゆ}というよ。",
          visual: { kind: "emoji", value: "🚢✈️", caption: "ものを 運ぶ 運輸" },
        },
      ],
    },
    test: {
      unitId: U.tradeTransport,
      questionCount: 5,
      questions: [
        {
          id: `${U.tradeTransport}.q-1`,
          unitId: U.tradeTransport,
          prompt: "{外国|がいこく}に{品物|しなもの}を{売|う}ることを{何|なに}という？",
          explanation: "{外国|がいこく}へ{品物|しなもの}を{売|う}ることを「{輸出|ゆしゅつ}」というよ。{日本|にほん}は{自動車|じどうしゃ}や{機械|きかい}を{多|おお}く{輸出|ゆしゅつ}するよ。",
          format: "choice",
          choices: ["{輸出|ゆしゅつ}", "{輸入|ゆにゅう}", "{生産|せいさん}", "{加工|かこう}"],
          answer: "{輸出|ゆしゅつ}",
        },
        {
          id: `${U.tradeTransport}.q-2`,
          unitId: U.tradeTransport,
          prompt: "{外国|がいこく}から{品物|しなもの}を{買|か}い{入|い}れることを{何|なに}という？",
          explanation: "{外国|がいこく}から{品物|しなもの}を{買|か}うことを「{輸入|ゆにゅう}」というよ。{日本|にほん}は{石油|せきゆ}や{食料|しょくりょう}を{多|おお}く{輸入|ゆにゅう}するよ。",
          format: "choice",
          choices: ["{輸入|ゆにゅう}", "{輸出|ゆしゅつ}", "{貿易|ぼうえき}{黒字|くろじ}", "{出荷|しゅっか}"],
          answer: "{輸入|ゆにゅう}",
        },
        {
          id: `${U.tradeTransport}.q-3`,
          unitId: U.tradeTransport,
          prompt: "{石油|せきゆ}や{自動車|じどうしゃ}など{重|おも}くて{量|りょう}が{多|おお}いものを{運|はこ}ぶのに{向|む}くのは？",
          explanation: "{重|おも}くて{量|りょう}の{多|おお}いものは、いちどにたくさん{運|はこ}べる「{船|ふね}」で{運|はこ}ぶのが{向|む}いているよ。",
          format: "choice",
          choices: ["{船|ふね}", "{飛行機|ひこうき}", "{自転車|じてんしゃ}", "{歩|ある}いて"],
          answer: "{船|ふね}",
        },
        {
          id: `${U.tradeTransport}.q-4`,
          unitId: U.tradeTransport,
          prompt: "{軽|かる}くて{急|いそ}ぐ{品物|しなもの}を{遠|とお}くへ はやく{運|はこ}ぶのに{向|む}くのは？",
          explanation: "{軽|かる}くて{急|いそ}ぐものは「{飛行機|ひこうき}」で{運|はこ}ぶよ。はやいけれど{費用|ひよう}は{高|たか}いよ。",
          format: "choice",
          choices: ["{飛行機|ひこうき}", "{船|ふね}", "{牛車|ぎっしゃ}", "いかだ"],
          answer: "{飛行機|ひこうき}",
        },
        {
          id: `${U.tradeTransport}.q-5`,
          unitId: U.tradeTransport,
          prompt: "{輸出|ゆしゅつ}と{輸入|ゆにゅう}をまとめて{何|なに}という？",
          explanation: "{国|くに}と{国|くに}とのあいだで{品物|しなもの}を{売|う}り{買|か}いすることを「{貿易|ぼうえき}」というよ。",
          format: "choice",
          choices: ["{貿易|ぼうえき}", "{運輸|うんゆ}", "{生産|せいさん}", "{消費|しょうひ}"],
          answer: "{貿易|ぼうえき}",
        },
      ],
    },
  },

  // 11. 情報を伝える産業
  [U.mediaInfo]: {
    unitId: U.mediaInfo,
    learn: {
      unitId: U.mediaInfo,
      steps: [
        {
          heading: "いろいろなメディア",
          body: "ニュースを{伝|つた}えるものを「メディア」というよ。テレビ・{新聞|しんぶん}・ラジオ・インターネットなどがあるよ。",
          visual: { kind: "emoji", value: "📺📰📻📱", caption: "情報を 伝える メディア" },
        },
        {
          heading: "ニュースができるまで",
          body: "{記者|きしゃ}が{取材|しゅざい}して{事実|じじつ}をたしかめ、{原稿|げんこう}にまとめ、まちがいがないか{確|たし}かめてから{伝|つた}えるよ。",
          visual: { kind: "emoji", value: "🎤📝✅", caption: "取材 → まとめ → 確認" },
        },
      ],
    },
    test: {
      unitId: U.mediaInfo,
      questionCount: 5,
      questions: [
        {
          id: `${U.mediaInfo}.q-1`,
          unitId: U.mediaInfo,
          prompt: "ニュースなどの{情報|じょうほう}を{多|おお}くの{人|ひと}に{伝|つた}えるものを{何|なに}という？",
          explanation: "テレビや{新聞|しんぶん}など、{多|おお}くの{人|ひと}に{情報|じょうほう}を{伝|つた}えるものを「メディア（マスメディア）」というよ。",
          format: "choice",
          choices: ["メディア", "{工場|こうじょう}", "{漁港|ぎょこう}", "{役所|やくしょ}"],
          answer: "メディア",
        },
        {
          id: `${U.mediaInfo}.q-2`,
          unitId: U.mediaInfo,
          prompt: "{事件|じけん}や{出来事|できごと}を{調|しら}べて{記事|きじ}を{書|か}く{人|ひと}を{何|なに}という？",
          explanation: "{出来事|できごと}を{調|しら}べて{伝|つた}える{人|ひと}を「{記者|きしゃ}」というよ。{現場|げんば}で{取材|しゅざい}するよ。",
          format: "choice",
          choices: ["{記者|きしゃ}", "{農家|のうか}", "{漁師|りょうし}", "{運転手|うんてんしゅ}"],
          answer: "{記者|きしゃ}",
        },
        {
          id: `${U.mediaInfo}.q-3`,
          unitId: U.mediaInfo,
          prompt: "ニュースを{伝|つた}えるときにいちばん{大切|たいせつ}なことは？",
          explanation: "{多|おお}くの{人|ひと}が{見|み}るので、まちがいのない{正|ただ}しい{事実|じじつ}を{伝|つた}えることがいちばん{大切|たいせつ}だよ。",
          format: "choice",
          choices: ["{正|ただ}しい{事実|じじつ}を{伝|つた}える", "おもしろくつくりかえる", "はやさだけ", "{長|なが}くする"],
          answer: "{正|ただ}しい{事実|じじつ}を{伝|つた}える",
        },
        {
          id: `${U.mediaInfo}.q-4`,
          unitId: U.mediaInfo,
          prompt: "{文字|もじ}や{写真|しゃしん}で くわしく つたえ、あとから よみ{返|かえ}せるメディアは？",
          explanation: "{新聞|しんぶん}は{文字|もじ}や{写真|しゃしん}でくわしく{伝|つた}え、あとからよみ{返|かえ}せるのがよいところだよ。",
          format: "choice",
          choices: ["{新聞|しんぶん}", "ラジオ", "{電話|でんわ}", "{手紙|てがみ}"],
          answer: "{新聞|しんぶん}",
        },
        {
          id: `${U.mediaInfo}.q-5`,
          unitId: U.mediaInfo,
          prompt: "{自分|じぶん}でいつでも{調|しら}べたり{発信|はっしん}できるメディアは？",
          explanation: "インターネットは、{自分|じぶん}でいつでも{調|しら}べたり{発信|はっしん}できるのが{特色|とくしょく}だよ。だからこそ{正|ただ}しく{使|つか}う{力|ちから}が{必要|ひつよう}だよ。",
          format: "choice",
          choices: ["インターネット", "{新聞|しんぶん}", "ラジオ", "かいだん{放送|ほうそう}"],
          answer: "インターネット",
        },
      ],
    },
  },

  // 12. 情報を生かす社会
  [U.infoSociety]: {
    unitId: U.infoSociety,
    learn: {
      unitId: U.infoSociety,
      steps: [
        {
          heading: "{情報|じょうほう}を{生|い}かす{仕事|しごと}",
          body: "{店|みせ}では{売|う}れた{品物|しなもの}の{情報|じょうほう}を{集|あつ}めて{仕入|しい}れに{役立|やくだ}て、{病院|びょういん}では{情報|じょうほう}を{共有|きょうゆう}して{治療|ちりょう}に{生|い}かすよ。",
          visual: { kind: "emoji", value: "🏪💳🏥", caption: "情報を 生かす しごと" },
        },
        {
          heading: "{情報|じょうほう}を{正|ただ}しく{使|つか}う",
          body: "うその{情報|じょうほう}もあるので、たしかめて{使|つか}う{力|ちから}が{大切|たいせつ}だよ。{個人|こじん}{情報|じょうほう}を{守|まも}り、ルールを{守|まも}って{使|つか}おうね。",
          visual: { kind: "emoji", value: "⚠️🔒", caption: "たしかめて 安全に 使う" },
        },
      ],
    },
    test: {
      unitId: U.infoSociety,
      questionCount: 5,
      questions: [
        {
          id: `${U.infoSociety}.q-1`,
          unitId: U.infoSociety,
          prompt: "コンビニで{売|う}れた{品物|しなもの}を{記録|きろく}し{仕入|しい}れに{生|い}かす{仕組|しく}みを{何|なに}という？",
          explanation: "レジで{売|う}れた{品物|しなもの}の{情報|じょうほう}をその{場|ば}で{記録|きろく}する{仕組|しく}みを「POS（ポス）システム」というよ。{仕入|しい}れに{役立|やくだ}つよ。",
          format: "choice",
          choices: ["POSシステム", "{天気|てんき}{予報|よほう}", "カーナビ", "{時刻表|じこくひょう}"],
          answer: "POSシステム",
        },
        {
          id: `${U.infoSociety}.q-2`,
          unitId: U.infoSociety,
          prompt: "{名前|なまえ}や{住所|じゅうしょ}など、その{人|ひと}だとわかる{情報|じょうほう}を{何|なに}という？",
          explanation: "{名前|なまえ}・{住所|じゅうしょ}・{電話|でんわ}{番号|ばんごう}など その{人|ひと}を{表|あらわ}す{情報|じょうほう}を「{個人|こじん}{情報|じょうほう}」というよ。{大切|たいせつ}に{守|まも}るよ。",
          format: "choice",
          choices: ["{個人|こじん}{情報|じょうほう}", "{天気|てんき}{情報|じょうほう}", "{交通|こうつう}{情報|じょうほう}", "{広告|こうこく}"],
          answer: "{個人|こじん}{情報|じょうほう}",
        },
        {
          id: `${U.infoSociety}.q-3`,
          unitId: U.infoSociety,
          prompt: "インターネットの{情報|じょうほう}を{使|つか}うときに{気|き}をつけることは？",
          explanation: "ネットにはうその{情報|じょうほう}もあるので、{正|ただ}しいかどうか たしかめてから{使|つか}うことが{大切|たいせつ}だよ。",
          format: "choice",
          choices: ["{正|ただ}しいか たしかめる", "ぜんぶ そのまま{信|しん}じる", "すぐに{広|ひろ}める", "{人|ひと}の{秘密|ひみつ}を{書|か}く"],
          answer: "{正|ただ}しいか たしかめる",
        },
        {
          id: `${U.infoSociety}.q-4`,
          unitId: U.infoSociety,
          prompt: "{病院|びょういん}で{情報|じょうほう}を{共有|きょうゆう}すると どんなよいことがある？",
          explanation: "{患者|かんじゃ}の{情報|じょうほう}を{医師|いし}どうしで{共有|きょうゆう}すると、てきせつな{治療|ちりょう}をはやくおこなえるよ。",
          format: "choice",
          choices: ["てきせつな{治療|ちりょう}がはやくできる", "{待|ま}ち{時間|じかん}が{長|なが}くなる", "{薬|くすり}がなくなる", "{値段|ねだん}が{上|あ}がるだけ"],
          answer: "てきせつな{治療|ちりょう}がはやくできる",
        },
        {
          id: `${U.infoSociety}.q-5`,
          unitId: U.infoSociety,
          prompt: "{情報|じょうほう}を{正|ただ}しく{安全|あんぜん}に{使|つか}う{心|こころ}がけを{何|なに}という？",
          explanation: "{情報|じょうほう}を{正|ただ}しく{安全|あんぜん}に{使|つか}うための{心|こころ}がけやマナーを「{情報|じょうほう}モラル」というよ。",
          format: "choice",
          choices: ["{情報|じょうほう}モラル", "{自給率|じきゅうりつ}", "{貿易|ぼうえき}", "{品種|ひんしゅ}{改良|かいりょう}"],
          answer: "{情報|じょうほう}モラル",
        },
      ],
    },
  },

  // 13. 自然災害を防ぐ
  [U.naturalDisaster]: {
    unitId: U.naturalDisaster,
    learn: {
      unitId: U.naturalDisaster,
      steps: [
        {
          heading: "{日本|にほん}でおきる{災害|さいがい}",
          body: "{日本|にほん}では{地震|じしん}・{津波|つなみ}・{台風|たいふう}・{洪水|こうずい}・{火山|かざん}のふん{火|か}などの{自然|しぜん}{災害|さいがい}がおきやすいよ。",
          visual: { kind: "emoji", value: "🌊🌋🌀", caption: "地震・津波・台風など" },
        },
        {
          heading: "そなえる{工夫|くふう}",
          body: "ていぼうやダム、ひなん{訓練|くんれん}、ハザードマップなどで{災害|さいがい}にそなえるよ。{国|くに}や{県|けん}・{市|し}と{人々|ひとびと}が{協力|きょうりょく}するよ。",
          visual: { kind: "emoji", value: "🗺️🚨🏃", caption: "そなえと ひなん訓練" },
        },
      ],
    },
    test: {
      unitId: U.naturalDisaster,
      questionCount: 5,
      questions: [
        {
          id: `${U.naturalDisaster}.q-1`,
          unitId: U.naturalDisaster,
          prompt: "{地震|じしん}のあとに{海|うみ}からおしよせることがある{大|おお}きな{波|なみ}を{何|なに}という？",
          explanation: "{海|うみ}の{底|そこ}で{地震|じしん}がおきると、おしよせる{大|おお}きな{波|なみ}「{津波|つなみ}」が{発生|はっせい}することがあるよ。",
          format: "choice",
          choices: ["{津波|つなみ}", "{台風|たいふう}", "{洪水|こうずい}", "{なだれ}"],
          answer: "{津波|つなみ}",
        },
        {
          id: `${U.naturalDisaster}.q-2`,
          unitId: U.naturalDisaster,
          prompt: "{災害|さいがい}のときに あぶない{場所|ばしょ}やにげ{場|ば}をしめした{地図|ちず}を{何|なに}という？",
          explanation: "{災害|さいがい}の{危険|きけん}な{場所|ばしょ}やひなん{場所|ばしょ}をしめした{地図|ちず}を「ハザードマップ」というよ。",
          format: "choice",
          choices: ["ハザードマップ", "{天気|てんき}{図|ず}", "{路線|ろせん}{図|ず}", "{設計|せっけい}{図|ず}"],
          answer: "ハザードマップ",
        },
        {
          id: `${U.naturalDisaster}.q-3`,
          unitId: U.naturalDisaster,
          prompt: "{大雨|おおあめ}で{川|かわ}の{水|みず}があふれることを{何|なに}という？",
          explanation: "{台風|たいふう}や{大雨|おおあめ}で{川|かわ}の{水|みず}があふれ、まちがしずむことを「{洪水|こうずい}」というよ。ていぼうなどでふせぐよ。",
          format: "choice",
          choices: ["{洪水|こうずい}", "{地震|じしん}", "ふん{火|か}", "{干|ひ}でり"],
          answer: "{洪水|こうずい}",
        },
        {
          id: `${U.naturalDisaster}.q-4`,
          unitId: U.naturalDisaster,
          prompt: "{災害|さいがい}にそなえて{町|まち}でおこなわれることは？",
          explanation: "にげる{道|みち}や{場所|ばしょ}をたしかめる「ひなん{訓練|くんれん}」をして、いざというときに{落|お}ち{着|つ}いて{行動|こうどう}できるようにするよ。",
          format: "choice",
          choices: ["ひなん{訓練|くんれん}", "{運動会|うんどうかい}", "{遠足|えんそく}", "なにもしない"],
          answer: "ひなん{訓練|くんれん}",
        },
        {
          id: `${U.naturalDisaster}.q-5`,
          unitId: U.naturalDisaster,
          prompt: "{災害|さいがい}からくらしを{守|まも}るために{大切|たいせつ}なことは？",
          explanation: "{国|くに}・{県|けん}・{市|し}と{地域|ちいき}の{人々|ひとびと}が{協力|きょうりょく}してそなえることが、{被害|ひがい}を{小|ちい}さくするのに{大切|たいせつ}だよ。",
          format: "choice",
          choices: ["みんなで{協力|きょうりょく}してそなえる", "{一人|ひとり}でがまんする", "なにもしない", "{災害|さいがい}がすぎるのを{待|ま}つだけ"],
          answer: "みんなで{協力|きょうりょく}してそなえる",
        },
      ],
    },
  },

  // 14. 森林とわたしたちの暮らし
  [U.forest]: {
    unitId: U.forest,
    learn: {
      unitId: U.forest,
      steps: [
        {
          heading: "{森林|しんりん}のはたらき",
          body: "{森林|しんりん}は{国土|こくど}のおよそ{3|さん}{分|ぶん}の{2|に}をしめるよ。{雨水|あまみず}をたくわえ、{空気|くうき}をきれいにし、{土|つち}がくずれるのをふせぐよ。",
          visual: { kind: "emoji", value: "🌳💧🌲", caption: "水をたくわえ 土を守る" },
        },
        {
          heading: "{木|き}を{育|そだ}て{使|つか}う{林業|りんぎょう}",
          body: "{木|き}を{植|う}え、{育|そだ}て、{切|き}り{出|だ}して{木材|もくざい}にする{仕事|しごと}を{林業|りんぎょう}というよ。{森|もり}を{手入|てい}れしてまもることが{大切|たいせつ}だよ。",
          visual: { kind: "emoji", value: "🌲🪓🪵", caption: "植えて 育てて 使う" },
        },
      ],
    },
    test: {
      unitId: U.forest,
      questionCount: 5,
      questions: [
        {
          id: `${U.forest}.q-1`,
          unitId: U.forest,
          prompt: "{日本|にほん}の{国土|こくど}でおよそ{3|さん}{分|ぶん}の{2|に}をしめるのは？",
          explanation: "{日本|にほん}は{国土|こくど}のおよそ{3|さん}{分|ぶん}の{2|に}が{森林|しんりん}だよ。とても{森|もり}の{多|おお}い{国|くに}だね。",
          format: "choice",
          choices: ["{森林|しんりん}", "{田|た}んぼ", "{道路|どうろ}", "{海|うみ}"],
          answer: "{森林|しんりん}",
        },
        {
          id: `${U.forest}.q-2`,
          unitId: U.forest,
          prompt: "{森林|しんりん}のはたらきとして{正|ただ}しいのは？",
          explanation: "{森林|しんりん}は{雨水|あまみず}をたくわえて{少|すこ}しずつ{流|なが}すので「{緑|みどり}のダム」とよばれるよ。{洪水|こうずい}をふせぐのにも{役立|やくだ}つよ。",
          format: "choice",
          choices: ["{雨水|あまみず}をたくわえる", "{雨|あめ}をふらせなくする", "{土|つち}をくずす", "{空気|くうき}をよごす"],
          answer: "{雨水|あまみず}をたくわえる",
        },
        {
          id: `${U.forest}.q-3`,
          unitId: U.forest,
          prompt: "{木|き}を{植|う}え{育|そだ}てて{木材|もくざい}をとる{仕事|しごと}を{何|なに}という？",
          explanation: "{木|き}を{植|う}え・{育|そだ}て・{切|き}り{出|だ}す{仕事|しごと}を「{林業|りんぎょう}」というよ。{長|なが}い{年月|としつき}がかかるよ。",
          format: "choice",
          choices: ["{林業|りんぎょう}", "{漁業|ぎょぎょう}", "{農業|のうぎょう}", "{工業|こうぎょう}"],
          answer: "{林業|りんぎょう}",
        },
        {
          id: `${U.forest}.q-4`,
          unitId: U.forest,
          prompt: "よい{森林|しんりん}をたもつために{必要|ひつよう}なことは？",
          explanation: "{枝|えだ}をはらったり{弱|よわ}い{木|き}を{切|き}る「{手入|てい}れ」をすると、{木|き}が よく{育|そだ}ち よい{森林|しんりん}になるよ。",
          format: "choice",
          choices: ["{森|もり}の{手入|てい}れをする", "{木|き}をすべて{切|き}る", "なにもしない", "ごみをすてる"],
          answer: "{森|もり}の{手入|てい}れをする",
        },
        {
          id: `${U.forest}.q-5`,
          unitId: U.forest,
          prompt: "{森林|しんりん}が{土|つち}にあたえるよいはたらきは？",
          explanation: "{木|き}の{根|ね}が{土|つち}をしっかりつかむので、{雨|あめ}で{土|つち}や{山|やま}がくずれるのをふせぐよ。",
          format: "choice",
          choices: ["{土|つち}がくずれるのをふせぐ", "{土|つち}をかわかす", "{土|つち}をなくす", "{石|いし}にかえる"],
          answer: "{土|つち}がくずれるのをふせぐ",
        },
      ],
    },
  },

  // 15. 公害を防ぎ環境を守る
  [U.pollution]: {
    unitId: U.pollution,
    learn: {
      unitId: U.pollution,
      steps: [
        {
          heading: "{公害|こうがい}とは",
          body: "{工場|こうじょう}のけむりや{排水|はいすい}などで{空気|くうき}や{水|みず}がよごれ、{人|ひと}の{健康|けんこう}や{自然|しぜん}がそこなわれることを{公害|こうがい}というよ。{昔|むかし}{大|おお}きな{問題|もんだい}になったよ。",
          visual: { kind: "emoji", value: "🏭💨🌫️", caption: "空気や 水の よごれ" },
        },
        {
          heading: "{環境|かんきょう}を{守|まも}る",
          body: "いまは{法律|ほうりつ}やルールをつくり、{排水|はいすい}をきれいにしたり、ごみをへらしてリサイクルするなど、みんなで{環境|かんきょう}を{守|まも}っているよ。",
          visual: { kind: "emoji", value: "♻️🌱💧", caption: "ルールと リサイクルで 守る" },
        },
      ],
    },
    test: {
      unitId: U.pollution,
      questionCount: 5,
      questions: [
        {
          id: `${U.pollution}.q-1`,
          unitId: U.pollution,
          prompt: "{工場|こうじょう}のけむりや{排水|はいすい}で{空気|くうき}や{水|みず}がよごれ、{健康|けんこう}がそこなわれることを{何|なに}という？",
          explanation: "{産業|さんぎょう}が さかんになった{昔|むかし}、{空気|くうき}や{水|みず}のよごれで{健康|けんこう}{被害|ひがい}がおきたよ。これを「{公害|こうがい}」というよ。",
          format: "choice",
          choices: ["{公害|こうがい}", "{災害|さいがい}", "{貿易|ぼうえき}", "{輸入|ゆにゅう}"],
          answer: "{公害|こうがい}",
        },
        {
          id: `${U.pollution}.q-2`,
          unitId: U.pollution,
          prompt: "{公害|こうがい}をふせぐために{国|くに}がつくったものは？",
          explanation: "{公害|こうがい}をふせぐため、{国|くに}は{法律|ほうりつ}やきまりをつくって、{工場|こうじょう}に{排水|はいすい}やけむりをきれいにするよう{決|き}めたよ。",
          format: "choice",
          choices: ["{公害|こうがい}をふせぐ{法律|ほうりつ}", "もっとけむりを{出|だ}すきまり", "なにもしない", "{工場|こうじょう}をふやすきまり"],
          answer: "{公害|こうがい}をふせぐ{法律|ほうりつ}",
        },
        {
          id: `${U.pollution}.q-3`,
          unitId: U.pollution,
          prompt: "ごみをへらし、{資源|しげん}としてもう{一度|いちど}{使|つか}うことを{何|なに}という？",
          explanation: "あきかんやペットボトルなどを{資源|しげん}としてもう{一度|いちど}{使|つか}うことを「リサイクル」というよ。{環境|かんきょう}を{守|まも}るたいせつな{取|と}り{組|く}みだよ。",
          format: "choice",
          choices: ["リサイクル", "{輸出|ゆしゅつ}", "{養殖|ようしょく}", "{加工|かこう}"],
          answer: "リサイクル",
        },
        {
          id: `${U.pollution}.q-4`,
          unitId: U.pollution,
          prompt: "{環境|かんきょう}を{守|まも}るためにわたしたちができることは？",
          explanation: "ごみを{分|わ}けて{出|だ}す、{水|みず}や{電気|でんき}をむだにしないなど、{身近|みぢか}なことから{環境|かんきょう}を{守|まも}れるよ。",
          format: "choice",
          choices: ["ごみを{分|わ}けて{出|だ}す", "{水|みず}を{出|だ}しっぱなしにする", "ごみをすてる", "{電気|でんき}をつけっぱなしにする"],
          answer: "ごみを{分|わ}けて{出|だ}す",
        },
        {
          id: `${U.pollution}.q-5`,
          unitId: U.pollution,
          prompt: "{公害|こうがい}の{経験|けいけん}から{今|いま}の{社会|しゃかい}が{大切|たいせつ}にしていることは？",
          explanation: "{昔|むかし}の{公害|こうがい}の{反省|はんせい}から、{産業|さんぎょう}をのばすだけでなく{環境|かんきょう}を{守|まも}ることも{大切|たいせつ}にするようになったよ。",
          format: "choice",
          choices: ["{環境|かんきょう}を{守|まも}ること", "{公害|こうがい}をふやすこと", "{自然|しぜん}を こわすこと", "ごみをふやすこと"],
          answer: "{環境|かんきょう}を{守|まも}ること",
        },
      ],
    },
  },
};
