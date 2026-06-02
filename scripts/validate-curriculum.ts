// ══════════════════════════════════════════
// カリキュラム整合バリデーション ランナー（build ゲート）
// src/data/curriculum/index.ts の集約 Curriculum を読み、
// validateCurriculum で全項目を検査する。
// 問題があれば一覧を stderr に出して exit(1)、無ければ "OK (N units)"。
//
// 実行: npx tsx scripts/validate-curriculum.ts （npm run validate / build から）
// Next の構成と干渉しないよう app 外（scripts/）に置く。
// ══════════════════════════════════════════

import { curriculum } from "@/data/curriculum";
import { validateCurriculum } from "@/lib/validate-curriculum";

const errors = validateCurriculum(curriculum);

if (errors.length > 0) {
  console.error(`❌ カリキュラム整合エラー: ${errors.length} 件`);
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  process.exit(1);
}

console.log(`✅ curriculum: OK (${curriculum.units.length} units)`);
