// ══════════════════════════════════════════
// テストルート: /test/[subject]/[grade]/[unit]
// 単元の TestContent を使ったドリル画面（slot9 所有）。
// Server Component で params を解決し、unitId を組み立てて TestView(client) に委譲する。
// データ取得は共有 API @/lib/curriculum-query（純関数）に集約し、UIロジックは混ぜない。
// ══════════════════════════════════════════

import { notFound } from "next/navigation";
import { getUnit, getUnitContent } from "@/lib/curriculum-query";
import { TestView } from "@/components/drill/TestView";
import type { Grade, SubjectId } from "@/types/curriculum";

interface TestPageParams {
  subject: string;
  grade: string;
  unit: string;
}

export default async function TestPage({
  params,
}: {
  params: Promise<TestPageParams>;
}) {
  const { subject, grade, unit } = await params;
  const gradeNum = Number(grade) as Grade;
  // 単元 id は "<subject>.g<grade>.<slug>"（ID体系）。route セグメントから復元する。
  const unitId = `${subject}.g${gradeNum}.${unit}`;

  const unitDef = getUnit(unitId);
  const content = getUnitContent(unitId);
  if (!unitDef || !content?.test) notFound();

  return (
    <TestView
      subjectId={subject as SubjectId}
      grade={gradeNum}
      unitId={unitId}
    />
  );
}
