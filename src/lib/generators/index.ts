// ══════════════════════════════════════════
// 問題ジェネレータ・レジストリ（drill ロジック層）
// data には関数を置かず generatorId 参照のみ＝data / UI / ロジックの分離。
// TestContent.generatorId からこのレジストリを引いて動的に問題を生成する。
// 算数の生成ロジックは既存 src/data/math-questions.ts を参考にしつつ、
// カリキュラム共通型 NumberInputQuestion を返すスタブとして実装する。
// ══════════════════════════════════════════

import type { Question, NumberInputQuestion } from "@/types/curriculum";

/**
 * 問題ジェネレータ。1セッション分（count問）の Question 配列を返す。
 * unitId は生成される BaseQuestion.unitId に使う任意引数（複数単元で同じ
 * ジェネレータを共有できるよう外から渡せる）。省略時は各ジェネレータの
 * 代表 unitId を使う。レジストリ型としては (count) => Question[] で呼べる。
 */
export type QuestionGenerator = (count: number, unitId?: string) => Question[];

/** 1〜max の整数をランダムに返す */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 同じ絵文字を n 個ならべた文字列 */
function repeatEmoji(emoji: string, n: number): string {
  return Array.from({ length: n }, () => emoji).join("");
}

// ── 10までのたしざん ──────────────────────
function generateAdditionWithin10(
  count: number,
  unitId = "sansuu.g1.add-within-10",
): NumberInputQuestion[] {
  const out: NumberInputQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const operand1 = randInt(1, 9);
    const operand2 = randInt(1, 10 - operand1); // 和が 10 以下
    const answer = operand1 + operand2;
    out.push({
      id: `${unitId}.gen-${i + 1}`,
      unitId,
      prompt: `${operand1} ＋ ${operand2} ＝ ？`,
      explanation: `${operand1} と ${operand2} をあわせると ${answer} だよ。`,
      visual: { kind: "emoji", value: `${repeatEmoji("🔵", operand1)} ＋ ${repeatEmoji("🟢", operand2)}` },
      format: "number-input",
      answer,
    });
  }
  return out;
}

// ── 10までのひきざん ──────────────────────
function generateSubtractionWithin10(
  count: number,
  unitId = "sansuu.g1.sub-within-10",
): NumberInputQuestion[] {
  const out: NumberInputQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const operand1 = randInt(2, 10);
    const operand2 = randInt(1, operand1); // 答えが 0 以上
    const answer = operand1 - operand2;
    out.push({
      id: `${unitId}.gen-${i + 1}`,
      unitId,
      prompt: `${operand1} − ${operand2} ＝ ？`,
      explanation: `${operand1} から ${operand2} へらすと ${answer} だよ。`,
      visual: { kind: "emoji", value: repeatEmoji("🍪", operand1) },
      format: "number-input",
      answer,
    });
  }
  return out;
}

// ── 10までのかず（かぞえる） ──────────────
function generateCountWithin(
  max: number,
  count: number,
  unitId: string,
): NumberInputQuestion[] {
  const out: NumberInputQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const n = randInt(1, max);
    out.push({
      id: `${unitId}.gen-${i + 1}`,
      unitId,
      prompt: "🍎 は なんこ あるかな？",
      explanation: `ひとつずつ かぞえると ${n} こ だよ。`,
      visual: { kind: "emoji", value: repeatEmoji("🍎", n), caption: "かぞえてみよう" },
      format: "number-input",
      answer: n,
    });
  }
  return out;
}

function generateCountWithin10(count: number, unitId = "sansuu.g1.numbers-to-10"): NumberInputQuestion[] {
  return generateCountWithin(10, count, unitId);
}
function generateCountWithin20(count: number, unitId = "sansuu.g1.numbers-to-20"): NumberInputQuestion[] {
  return generateCountWithin(20, count, unitId);
}

// ── レジストリ ────────────────────────────
export const generators: Record<string, QuestionGenerator> = {
  "sansuu.addition-within-10": generateAdditionWithin10,
  "sansuu.subtraction-within-10": generateSubtractionWithin10,
  "sansuu.count-within-10": generateCountWithin10,
  "sansuu.count-within-20": generateCountWithin20,
};

/** generatorId からジェネレータを取得（未登録は undefined）。 */
export function getGenerator(id: string): QuestionGenerator | undefined {
  return generators[id];
}
