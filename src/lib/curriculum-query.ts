// ══════════════════════════════════════════
// 共有APIライブラリ: カリキュラム照会（slot5）
// UI結線の最優先依存。データ層 `@/data/curriculum` の単一の真実を
// UIが安全に引くための薄い純関数ラッパ（読み取り専用・副作用なし）。
// 契約: /tmp/ui-contract.md の getSubjects/getSubject/getGrades/
//       getUnitsByGrade/getUnit/getUnitContent/getAllUnits を厳密実装。
// データ(index.ts)・型(curriculum.ts)は編集しない（import のみ）。
// ══════════════════════════════════════════

import type {
  Subject,
  SubjectId,
  Grade,
  Unit,
  UnitContent,
} from "@/types/curriculum";
import { curriculum } from "@/data/curriculum";

// ── 内部インデックス（O(1)参照のための遅延構築メモ）──
// 単一の真実 = curriculum。ここでは派生インデックスを一度だけ作る。

let _unitById: Map<string, Unit> | null = null;
function unitById(): Map<string, Unit> {
  if (_unitById === null) {
    _unitById = new Map(curriculum.units.map((u) => [u.id, u]));
  }
  return _unitById;
}

// ── 教科 ──────────────────────────────────

/** 全教科を返す。 */
export function getSubjects(): Subject[] {
  return curriculum.subjects;
}

/** id から教科を1件取得（未登録は undefined）。 */
export function getSubject(id: SubjectId): Subject | undefined {
  return curriculum.subjects.find((s) => s.id === id);
}

// ── 学年 ──────────────────────────────────

/** その教科の開講学年を昇順で返す（未登録教科は空配列）。 */
export function getGrades(subjectId: SubjectId): Grade[] {
  const subject = getSubject(subjectId);
  if (!subject) return [];
  return [...subject.grades].sort((a, b) => a - b);
}

// ── 単元 ──────────────────────────────────

/** 教科×学年の単元を order 昇順で返す。 */
export function getUnitsByGrade(subjectId: SubjectId, grade: Grade): Unit[] {
  return curriculum.units
    .filter((u) => u.subjectId === subjectId && u.grade === grade)
    .sort((a, b) => a.order - b.order);
}

/** unitId から単元を1件取得（未登録は undefined）。 */
export function getUnit(unitId: string): Unit | undefined {
  return unitById().get(unitId);
}

/** unitId から単元コンテンツ（学習＋テスト）を取得（未登録は undefined）。 */
export function getUnitContent(unitId: string): UnitContent | undefined {
  return curriculum.contents[unitId];
}

/** 全単元を返す（横断的な集計・ロードマップ用）。 */
export function getAllUnits(): Unit[] {
  return curriculum.units;
}
