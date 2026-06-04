// ══════════════════════════════════════════
// 漢字配当ギャップ抽出（決定論スクリプト）
// kokugo 各学年(g1-6)の「漢字単元」で現在 出題対象になっている漢字を抽出し、
// 学年別漢字配当表（src/data/kanji-allocation.ts）との不足字を学年別に書き出す。
//   出力: /tmp/drill-mgr/kanji-missing-g<N>.txt（不足漢字を連結。1ファイル=1学年）
//   標準出力には数値（配当数/被覆数/不足数）のみ。漢字は列挙しない。
//
// 抽出方針（出題対象字の高信号フィールドのみ採る）:
//   - prompt: ルビ記法 {漢字|よみ}（＝既習の付随漢字）を除去した後に残る「素漢字」＝出題対象。
//             （漢字学習単元では対象字を読み隠しのため素漢字で出す仕様。index/各gファイル冒頭に明記）
//   - answer / acceptableAnswers: 書き取り等の対象漢字（素漢字）。
//   - ordering(items) / matching(left/right): ルビ除去後の素漢字。
//   distractor 汚染を避けるため choices からは採らない（正解は answer 経由で採れる）。
//
// 実行: npx tsx scripts/kanji-gap.ts
// Next 構成と干渉しないよう app 外（scripts/）に置く（validate-curriculum.ts と同様）。
// ══════════════════════════════════════════

import { mkdirSync, writeFileSync } from "node:fs";
import { curriculum } from "@/data/curriculum";
import { KANJI_ALLOCATION } from "@/data/kanji-allocation";
import type { Grade, Question } from "@/types/curriculum";

const OUT_DIR = "/tmp/drill-mgr";
const KANJI_RE = /[一-鿿]/g; // CJK統合漢字（教育漢字は全てこの範囲）
const RUBY_RE = /\{[^}|]*\|[^}]*\}/g; // {base|reading} ルビ記法＝付随漢字（除去対象）

/** 文字列中の CJK 漢字を set に集める。 */
function addKanji(s: string | undefined, set: Set<string>): void {
  if (!s) return;
  const m = s.match(KANJI_RE);
  if (m) for (const ch of m) set.add(ch);
}

/** 1問から「出題対象字」を抽出して set に加える。 */
function collectTargets(q: Question, set: Set<string>): void {
  // prompt はルビ(既習漢字)を取り除いてから素漢字＝対象字を採る
  addKanji(q.prompt.replace(RUBY_RE, ""), set);
  // 解答系フィールド（書き取り・じゅくご等の対象漢字）
  if ("answer" in q && typeof q.answer === "string") addKanji(q.answer, set);
  if ("acceptableAnswers" in q && q.acceptableAnswers) {
    for (const a of q.acceptableAnswers) addKanji(a, set);
  }
  if ("items" in q) for (const a of q.items) addKanji(a.replace(RUBY_RE, ""), set);
  if ("left" in q) for (const a of q.left) addKanji(a.replace(RUBY_RE, ""), set);
  if ("right" in q) for (const a of q.right) addKanji(a.replace(RUBY_RE, ""), set);
}

const GRADES: Grade[] = [1, 2, 3, 4, 5, 6];
mkdirSync(OUT_DIR, { recursive: true });

const rows: { grade: Grade; alloc: number; covered: number; missing: number }[] = [];

for (const g of GRADES) {
  // 当該学年の「漢字単元」（id に kanji を含む kokugo 単元）
  const units = curriculum.units.filter(
    (u) => u.subjectId === "kokugo" && u.grade === g && /kanji/i.test(u.id),
  );

  const targets = new Set<string>();
  for (const u of units) {
    const content = curriculum.contents[u.id];
    const questions: Question[] = [
      ...(content?.test?.questions ?? []),
      ...(content?.learn?.checkQuestions ?? []),
    ];
    for (const q of questions) collectTargets(q, targets);
  }

  const alloc = KANJI_ALLOCATION[g];
  const missing = alloc.filter((k) => !targets.has(k));
  writeFileSync(`${OUT_DIR}/kanji-missing-g${g}.txt`, missing.join(""), "utf8");

  rows.push({ grade: g, alloc: alloc.length, covered: alloc.length - missing.length, missing: missing.length });
}

// 数値のみ（漢字は列挙しない＝content filter 回避）
console.log("kanji-gap (kokugo) — 数値のみ:");
for (const r of rows) {
  console.log(
    `  g${r.grade}: alloc=${r.alloc} covered=${r.covered} missing=${r.missing}` +
      ` -> ${OUT_DIR}/kanji-missing-g${r.grade}.txt`,
  );
}
