// ══════════════════════════════════════════
// 学習モード ルート: /learn/[subject]/[grade]/[unit]
// unitId = "<subject>.g<grade>.<unit-slug>" を組み立てて単元と
// LearnContent を取得し、LearnView（子ども自律UI）へ渡す。
// データ層・index.ts・他ルートは触らない（表示の結線のみ）。
// ══════════════════════════════════════════

import { notFound } from "next/navigation";
import type { SubjectId } from "@/types/curriculum";
import {
  getUnit,
  getUnitContent,
  getSubject,
  getAllUnits,
} from "@/lib/curriculum-query";
import { getTheme } from "@/lib/theme";
import { LearnView } from "@/components/drill/LearnView";

type Params = { subject: string; grade: string; unit: string };

/** 全 learn 対応単元を静的生成（id から URL セグメントを逆算）。 */
export function generateStaticParams() {
  return getAllUnits()
    .filter((u) => u.hasLearn)
    .map((u) => ({
      subject: u.subjectId,
      grade: String(u.grade),
      unit: u.id.slice(`${u.subjectId}.g${u.grade}.`.length),
    }));
}

export default async function LearnPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subject, grade, unit } = await params;
  const unitId = `${subject}.g${grade}.${unit}`;

  const unitData = getUnit(unitId);
  const content = getUnitContent(unitId);
  if (!unitData || !content || !content.learn) notFound();

  const subj = getSubject(subject as SubjectId);
  const theme = getTheme(subj?.theme);

  return (
    <LearnView
      unit={unitData}
      content={content}
      theme={theme}
      subjectLabel={subj?.name ?? subject}
      subjectEmoji={subj?.emoji ?? "📘"}
      routeSubject={subject}
      routeGrade={grade}
      routeUnit={unit}
    />
  );
}
