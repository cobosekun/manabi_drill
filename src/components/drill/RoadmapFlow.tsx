"use client";

// ══════════════════════════════════════════
// RoadmapFlow — 単元の依存グラフ（前提 → 後続）を子ども向けフローチャート表示。
// データは @/lib/roadmap の getRoadmapEdges（from→to）と @/lib/curriculum-query。
// 教科で1つにしぼり、学年（列）レイアウトで軽量に SVG 描画する。
//  ・列 = 学年（小1〜6）、列内は order 順にたてに ならべる。
//  ・エッジ = 表示中の両端ノードがそろう前提リンクだけ（曲線＋やじるし）。
//  ・ノードは <foreignObject> 内の <button>＝大きなタップ領域。tap で learn へ遷移。
//  ・表示テキストは <RubyText> 経由（データは {漢字|よみ} 記法入り）。
// 動的 Tailwind クラスは使わず getTheme の固定クラスのみ。SVG 配色は属性で指定。
// ══════════════════════════════════════════

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Subject, Unit, Grade } from "@/types/curriculum";
import { getSubjects, getAllUnits } from "@/lib/curriculum-query";
import { getRoadmapEdges } from "@/lib/roadmap";
import { getTheme } from "@/lib/theme";
import { RubyText } from "@/components/drill/RubyText";

// ── レイアウト定数 ──
const NODE_W = 168;
const NODE_H = 74;
const COL_W = 220; // 列（学年）の よこ間隔
const ROW_H = 100; // 行の たて間隔
const PAD_X = 20;
const HEADER_H = 36; // 学年ラベルの高さ

interface Pos {
  x: number;
  y: number;
}

/** unit.id（subject.g{n}.slug）から learn ルートの slug 部を取り出す。 */
function unitSlug(id: string): string {
  const parts = id.split(".");
  return parts.length >= 3 ? parts.slice(2).join(".") : id;
}

export default function RoadmapFlow() {
  const subjects = useMemo<Subject[]>(() => getSubjects(), []);
  const allUnits = useMemo<Unit[]>(() => getAllUnits(), []);
  const edges = useMemo(() => getRoadmapEdges(), []);
  const router = useRouter();

  const [subjectId, setSubjectId] = useState<string>(subjects[0]?.id ?? "");
  const [grade, setGrade] = useState<Grade | "all">("all");

  const subject = subjects.find((s) => s.id === subjectId) ?? subjects[0];
  const theme = getTheme(subject?.theme);

  // この教科の開講学年（実在 unit から導出）
  const subjectGrades = useMemo<Grade[]>(() => {
    const set = new Set<Grade>();
    for (const u of allUnits) if (u.subjectId === subjectId) set.add(u.grade);
    return [...set].sort((a, b) => a - b) as Grade[];
  }, [allUnits, subjectId]);

  // 表示する単元（教科＋学年フィルタ）
  const visibleUnits = useMemo<Unit[]>(() => {
    return allUnits.filter(
      (u) => u.subjectId === subjectId && (grade === "all" || u.grade === grade),
    );
  }, [allUnits, subjectId, grade]);

  // 列（学年）→ ノード配置
  const { positions, columns, width, height } = useMemo(() => {
    const cols = grade === "all" ? subjectGrades : [grade as Grade];
    const byGrade = new Map<Grade, Unit[]>();
    for (const g of cols) byGrade.set(g, []);
    for (const u of visibleUnits) byGrade.get(u.grade)?.push(u);
    for (const list of byGrade.values()) list.sort((a, b) => a.order - b.order);

    const pos = new Map<string, Pos>();
    let maxRows = 0;
    cols.forEach((g, gi) => {
      const list = byGrade.get(g) ?? [];
      maxRows = Math.max(maxRows, list.length);
      list.forEach((u, ri) => {
        pos.set(u.id, {
          x: PAD_X + gi * COL_W,
          y: HEADER_H + ri * ROW_H,
        });
      });
    });

    return {
      positions: pos,
      columns: cols,
      width: PAD_X * 2 + Math.max(1, cols.length) * COL_W,
      height: HEADER_H + Math.max(1, maxRows) * ROW_H + PAD_X,
    };
  }, [visibleUnits, subjectGrades, grade]);

  // 描画するエッジ（両端が表示中のものだけ）
  const visibleEdges = useMemo(() => {
    return edges.filter((e) => positions.has(e.from) && positions.has(e.to));
  }, [edges, positions]);

  const goLearn = (u: Unit) => {
    router.push(`/learn/${u.subjectId}/${u.grade}/${unitSlug(u.id)}`);
  };

  return (
    <div className="w-full">
      {/* ── 教科えらび ── */}
      <div className="mb-3 flex flex-wrap gap-2">
        {subjects.map((s) => {
          const active = s.id === subjectId;
          const st = getTheme(s.theme);
          return (
            <button
              key={s.id}
              onClick={() => {
                setSubjectId(s.id);
                setGrade("all");
              }}
              className={`flex items-center gap-1 rounded-full border-2 px-4 py-2 text-lg font-bold transition ${
                active
                  ? `${st.primaryButton} border-transparent text-white`
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span aria-hidden>{s.emoji}</span>
              <RubyText text={s.name} />
            </button>
          );
        })}
      </div>

      {/* ── 学年えらび ── */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setGrade("all")}
          className={`rounded-full border-2 px-4 py-1.5 text-base font-bold transition ${
            grade === "all"
              ? `${theme.choiceSelected}`
              : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          ぜんぶ
        </button>
        {subjectGrades.map((g) => (
          <button
            key={g}
            onClick={() => setGrade(g)}
            className={`rounded-full border-2 px-4 py-1.5 text-base font-bold transition ${
              grade === g
                ? `${theme.choiceSelected}`
                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {g}ねん
          </button>
        ))}
      </div>

      <p className={`mb-2 text-sm ${theme.mutedText}`}>
        ← まなぶと つぎに つながるよ。カードを タップ すると がくしゅうへ いけるよ。
      </p>

      {/* ── フローチャート（よこスクロール可） ── */}
      <div className={`overflow-auto rounded-3xl p-2 ${theme.softGradient}`}>
        {visibleUnits.length === 0 ? (
          <p className="p-8 text-center text-lg text-gray-500">たんげんが ないよ。</p>
        ) : (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="mx-auto block"
            role="img"
            aria-label={`${subject?.name ?? ""}のロードマップ`}
          >
            <defs>
              <marker
                id="rm-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* 学年ラベル */}
            {columns.map((g, gi) => (
              <text
                key={`h-${g}`}
                x={PAD_X + gi * COL_W + NODE_W / 2}
                y={22}
                textAnchor="middle"
                className="fill-gray-500"
                fontSize={15}
                fontWeight={700}
              >
                {g}ねん
              </text>
            ))}

            {/* エッジ */}
            {visibleEdges.map((e) => {
              const a = positions.get(e.from)!;
              const b = positions.get(e.to)!;
              let d: string;
              if (a.x === b.x) {
                // 同じ学年（同列）: たて方向に つなぐ
                const fx = a.x + NODE_W / 2;
                const fy = a.y + (b.y > a.y ? NODE_H : 0);
                const ty = b.y + (b.y > a.y ? 0 : NODE_H);
                const mid = (fy + ty) / 2;
                d = `M ${fx} ${fy} C ${fx + 40} ${mid}, ${fx + 40} ${mid}, ${fx} ${ty}`;
              } else {
                // ちがう学年: みぎ→ひだり に つなぐ
                const fx = a.x + NODE_W;
                const fy = a.y + NODE_H / 2;
                const tx = b.x;
                const ty = b.y + NODE_H / 2;
                const dx = Math.max(30, Math.abs(tx - fx) / 2);
                d = `M ${fx} ${fy} C ${fx + dx} ${fy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
              }
              return (
                <path
                  key={`${e.from}->${e.to}`}
                  d={d}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  markerEnd="url(#rm-arrow)"
                  opacity={0.7}
                />
              );
            })}

            {/* ノード */}
            {visibleUnits.map((u) => {
              const p = positions.get(u.id);
              if (!p) return null;
              return (
                <foreignObject key={u.id} x={p.x} y={p.y} width={NODE_W} height={NODE_H}>
                  <button
                    onClick={() => goLearn(u)}
                    className={`flex h-full w-full items-center justify-center rounded-2xl border-2 bg-white px-2 text-center text-sm font-bold leading-tight shadow-sm transition hover:scale-[1.03] ${theme.choiceDefault}`}
                  >
                    <RubyText text={u.title} />
                  </button>
                </foreignObject>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
