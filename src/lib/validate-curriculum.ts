// ══════════════════════════════════════════
// カリキュラム整合バリデーション（純関数 / 量産の安全網）
// 全worker並列authoringの破綻を機械検出する。data/UI から独立した検査ロジック。
//
// validateCurriculum(c) は整合エラーを「人間に分かる日本語メッセージ」の
// 文字列配列で返す。空配列 = 健全。副作用なし（純関数）。
// ══════════════════════════════════════════

import type { Curriculum, Unit } from "@/types/curriculum";
import { generators } from "@/lib/generators";

/**
 * Curriculum の整合性を検査し、違反メッセージ配列を返す（空＝健全）。
 *
 * カバー項目:
 *  1. Unit.id 一意
 *  2. 参照解決（prerequisites / leadsTo の各 id が units に存在）
 *  3. domainId 解決（Unit.domainId が domains に存在）
 *  4. subjectId 整合（Unit.subjectId が subjects に存在し grade が Subject.grades に含まれる）
 *  5. generatorId 解決（test.generatorId が generators レジストリに登録済み）
 *  6. test/learn 必須（hasTest=true→test必須かつ questions非空 or generatorId、hasLearn=true→learn必須かつ steps非空）
 *  7. DAG（prerequisites を辺とする有向グラフに循環がない。循環パスを報告）
 *  8. questionCount 妥当（>=1。固定 questions の場合 length>=questionCount を満たすか警告）
 */
export function validateCurriculum(c: Curriculum): string[] {
  const errors: string[] = [];

  const subjectIds = new Set(c.subjects.map((s) => s.id));
  const subjectById = new Map(c.subjects.map((s) => [s.id, s]));
  const domainIds = new Set(c.domains.map((d) => d.id));
  const generatorIds = new Set(Object.keys(generators));

  // ── 1. Unit.id 一意 ──
  const seen = new Set<string>();
  const duplicated = new Set<string>();
  for (const u of c.units) {
    if (seen.has(u.id)) duplicated.add(u.id);
    seen.add(u.id);
  }
  for (const id of duplicated) {
    errors.push(`[1.一意] Unit.id が重複しています: "${id}"`);
  }
  // 一意な id 集合（重複があっても参照検査は可能なように seen を使う）
  const unitIds = seen;

  for (const u of c.units) {
    // ── 2. 参照解決（prerequisites / leadsTo）──
    for (const pid of u.prerequisites) {
      if (!unitIds.has(pid)) {
        errors.push(`[2.参照] "${u.id}" の prerequisites "${pid}" が units に存在しません。`);
      }
    }
    for (const lid of u.leadsTo) {
      if (!unitIds.has(lid)) {
        errors.push(`[2.参照] "${u.id}" の leadsTo "${lid}" が units に存在しません。`);
      }
    }

    // ── 3. domainId 解決 ──
    if (!domainIds.has(u.domainId)) {
      errors.push(`[3.領域] "${u.id}" の domainId "${u.domainId}" が domains に存在しません。`);
    }

    // ── 4. subjectId 整合 ＋ grade ──
    if (!subjectIds.has(u.subjectId)) {
      errors.push(`[4.教科] "${u.id}" の subjectId "${u.subjectId}" が subjects に存在しません。`);
    } else {
      const subj = subjectById.get(u.subjectId)!;
      if (!subj.grades.includes(u.grade)) {
        errors.push(
          `[4.教科] "${u.id}" の grade ${u.grade} が 教科 "${u.subjectId}" の開講学年 [${subj.grades.join(", ")}] に含まれません。`,
        );
      }
    }

    // ── 6. test / learn 必須 ──
    const content = c.contents[u.id];
    if (u.hasTest) {
      const test = content?.test;
      if (!test) {
        errors.push(`[6.テスト] "${u.id}" は hasTest=true ですが contents["${u.id}"].test がありません。`);
      } else {
        const hasFixed = Array.isArray(test.questions) && test.questions.length > 0;
        const hasGen = typeof test.generatorId === "string" && test.generatorId.length > 0;
        if (!hasFixed && !hasGen) {
          errors.push(`[6.テスト] "${u.id}" の test は questions(非空) か generatorId のどちらかが必要です。`);
        }
        // ── 5. generatorId 解決 ──
        if (hasGen && !generatorIds.has(test.generatorId!)) {
          errors.push(`[5.生成器] "${u.id}" の generatorId "${test.generatorId}" が generators レジストリに未登録です。`);
        }
        // ── 8. questionCount 妥当 ──
        if (test.questionCount < 1) {
          errors.push(`[8.出題数] "${u.id}" の test.questionCount は 1 以上が必要です（現在 ${test.questionCount}）。`);
        }
        if (hasFixed && test.questions!.length < test.questionCount) {
          errors.push(
            `[8.出題数] "${u.id}" は固定 questions が ${test.questions!.length} 問しかなく questionCount(${test.questionCount}) に足りません。`,
          );
        }
      }
    }
    if (u.hasLearn) {
      const learn = content?.learn;
      if (!learn) {
        errors.push(`[6.学習] "${u.id}" は hasLearn=true ですが contents["${u.id}"].learn がありません。`);
      } else if (!Array.isArray(learn.steps) || learn.steps.length === 0) {
        errors.push(`[6.学習] "${u.id}" の learn.steps が空です（1つ以上必要）。`);
      }
    }
  }

  // ── 7. DAG（prerequisites を辺とする有向グラフの循環検出）──
  errors.push(...detectCycles(c.units));

  return errors;
}

/**
 * prerequisites を辺（prereq → unit）とみなし、有向グラフの循環を DFS で検出する。
 * 循環が見つかった場合、その循環パスを日本語メッセージで返す。
 */
function detectCycles(units: Unit[]): string[] {
  const errors: string[] = [];
  // 隣接リスト: unit.id -> 依存している prerequisites（存在するノードのみ）
  const idSet = new Set(units.map((u) => u.id));
  const adj = new Map<string, string[]>();
  for (const u of units) {
    adj.set(
      u.id,
      u.prerequisites.filter((p) => idSet.has(p)),
    );
  }

  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map<string, number>();
  for (const id of idSet) color.set(id, WHITE);
  const stack: string[] = [];
  const reported = new Set<string>();

  const dfs = (node: string): void => {
    color.set(node, GRAY);
    stack.push(node);
    for (const next of adj.get(node) ?? []) {
      if (color.get(next) === GRAY) {
        // 循環検出: stack 内の next 以降が循環パス
        const idx = stack.indexOf(next);
        const cyclePath = [...stack.slice(idx), next];
        const key = [...cyclePath].sort().join("|");
        if (!reported.has(key)) {
          reported.add(key);
          errors.push(`[7.循環] prerequisites に循環があります: ${cyclePath.join(" → ")}`);
        }
      } else if (color.get(next) === WHITE) {
        dfs(next);
      }
    }
    stack.pop();
    color.set(node, BLACK);
  };

  for (const id of idSet) {
    if (color.get(id) === WHITE) dfs(id);
  }
  return errors;
}
