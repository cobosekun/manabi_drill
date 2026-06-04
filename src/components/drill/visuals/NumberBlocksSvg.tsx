"use client";

import type { SvgParamsMap } from "@/types/curriculum";

// SvgParamsMap["number-blocks"] = { count?, left?, right?, total?, remove?, tens?, ones? }
type NumberBlocksProps = SvgParamsMap["number-blocks"] & { size?: number };

// ── 見た目の定数（高コントラスト・子ども向け） ──
const CELL = 24; // 1マスの 1辺(px)
const GAP = 4; // マスの すきま
const PER_ROW = 10; // 1だんに ならべる さいだい数
const PAD = 8; // まわりの よはく

const COLOR = {
  blue: "#2563eb", // きほん／たし算の ひだり
  green: "#10b981", // たし算の みぎ
  amber: "#f59e0b", // 10のかたまり（位取り）
  gray: "#cbd5e1", // とりのぞいた ぶん（うすく）
  stroke: "#1e293b",
  cross: "#dc2626",
};

/** n個のマスを 1だん=PER_ROW で ならべた rect 配列と、占める幅・高さを返す。 */
function gridCells(
  n: number,
  color: string,
  originX: number,
  originY: number,
): { rects: React.ReactNode[]; width: number; height: number } {
  const rects: React.ReactNode[] = [];
  const rows = Math.max(1, Math.ceil(n / PER_ROW));
  const cols = Math.min(n, PER_ROW);
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / PER_ROW);
    const col = i % PER_ROW;
    const x = originX + col * (CELL + GAP);
    const y = originY + row * (CELL + GAP);
    rects.push(
      <rect
        key={`c-${originX}-${originY}-${i}`}
        x={x}
        y={y}
        width={CELL}
        height={CELL}
        rx={4}
        fill={color}
        stroke={COLOR.stroke}
        strokeWidth={1.5}
      />,
    );
  }
  const width = cols * CELL + (cols - 1) * GAP;
  const height = rows * CELL + (rows - 1) * GAP;
  return { rects, width, height };
}

/**
 * 数のブロック図（位取り / たし算 / ひき算 / 単純な個数）。
 * params の どのフィールドが あるかで モードを 出し分ける:
 *   tens / ones → 位取り（10のかたまり＋ばら）
 *   left / right → たし算（左ブロック ＋ 右ブロック）
 *   total / remove → ひき算（全体から remove 個を うすく×）
 *   count → 単純な個数
 */
export function NumberBlocksSvg(props: NumberBlocksProps) {
  const { count, left, right, total, remove, tens, ones, size } = props;

  // ── モード判定 ──
  if (tens !== undefined || ones !== undefined) {
    return <PlaceValue tens={tens ?? 0} ones={ones ?? 0} size={size} />;
  }
  if (left !== undefined || right !== undefined) {
    return <Addition left={left ?? 0} right={right ?? 0} size={size} />;
  }
  if (total !== undefined) {
    return <Subtraction total={total} remove={remove ?? 0} size={size} />;
  }
  return <SimpleCount count={count ?? 0} size={size} />;
}

// ── ラッパ（viewBox を内容に合わせ、size 指定時は width だけ縛る） ──
function Frame({
  vbW,
  vbH,
  size,
  label,
  children,
}: {
  vbW: number;
  vbH: number;
  size?: number;
  label: string;
  children: React.ReactNode;
}) {
  const width = size ?? Math.min(vbW, 360);
  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={width}
      role="img"
      aria-label={label}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {children}
    </svg>
  );
}

// ── 単純な個数 ──
function SimpleCount({ count, size }: { count: number; size?: number }) {
  const g = gridCells(count, COLOR.blue, PAD, PAD);
  const vbW = g.width + PAD * 2;
  const vbH = g.height + PAD * 2;
  return (
    <Frame vbW={vbW} vbH={vbH} size={size} label={`ブロックが ${count}こ`}>
      {g.rects}
    </Frame>
  );
}

// ── たし算（左 ＋ 右） ──
function Addition({ left, right, size }: { left: number; right: number; size?: number }) {
  const l = gridCells(left, COLOR.blue, PAD, PAD);
  const plusW = 28;
  const rightOriginX = PAD + l.width + plusW;
  const r = gridCells(right, COLOR.green, rightOriginX, PAD);
  const vbW = rightOriginX + r.width + PAD;
  const vbH = Math.max(l.height, r.height) + PAD * 2;
  const plusX = PAD + l.width + plusW / 2;
  const plusY = PAD + Math.max(l.height, r.height) / 2;
  return (
    <Frame vbW={vbW} vbH={vbH} size={size} label={`${left} たす ${right}`}>
      {l.rects}
      <text x={plusX} y={plusY} textAnchor="middle" dominantBaseline="central" fontSize={26} fontWeight="bold" fill={COLOR.stroke}>
        ＋
      </text>
      {r.rects}
    </Frame>
  );
}

// ── ひき算（全体から remove 個を うすく×） ──
function Subtraction({ total, remove, size }: { total: number; remove: number; size?: number }) {
  const rects: React.ReactNode[] = [];
  const rows = Math.max(1, Math.ceil(total / PER_ROW));
  const cols = Math.min(total, PER_ROW);
  const removeStart = Math.max(0, total - remove); // うしろから remove 個を のぞく
  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / PER_ROW);
    const col = i % PER_ROW;
    const x = PAD + col * (CELL + GAP);
    const y = PAD + row * (CELL + GAP);
    const removed = i >= removeStart;
    rects.push(
      <rect
        key={`s-${i}`}
        x={x}
        y={y}
        width={CELL}
        height={CELL}
        rx={4}
        fill={removed ? COLOR.gray : COLOR.blue}
        stroke={COLOR.stroke}
        strokeWidth={1.5}
      />,
    );
    if (removed) {
      rects.push(
        <line key={`x1-${i}`} x1={x + 3} y1={y + 3} x2={x + CELL - 3} y2={y + CELL - 3} stroke={COLOR.cross} strokeWidth={2.5} strokeLinecap="round" />,
        <line key={`x2-${i}`} x1={x + CELL - 3} y1={y + 3} x2={x + 3} y2={y + CELL - 3} stroke={COLOR.cross} strokeWidth={2.5} strokeLinecap="round" />,
      );
    }
  }
  const vbW = cols * CELL + (cols - 1) * GAP + PAD * 2;
  const vbH = rows * CELL + (rows - 1) * GAP + PAD * 2;
  return (
    <Frame vbW={vbW} vbH={vbH} size={size} label={`${total}から ${remove}を とる`}>
      {rects}
    </Frame>
  );
}

// ── 位取り（10のかたまり＝たて10マスの棒 ＋ ばらの 1マス） ──
function PlaceValue({ tens, ones, size }: { tens: number; ones: number; size?: number }) {
  const rects: React.ReactNode[] = [];
  const stickGap = 10;
  let x = PAD;
  // 10のかたまり（縦に10マス積んだ棒。amber）
  for (let t = 0; t < tens; t++) {
    for (let k = 0; k < 10; k++) {
      const y = PAD + k * (CELL + 1);
      rects.push(
        <rect key={`t-${t}-${k}`} x={x} y={y} width={CELL} height={CELL} rx={3} fill={COLOR.amber} stroke={COLOR.stroke} strokeWidth={1.5} />,
      );
    }
    x += CELL + stickGap;
  }
  const tensHeight = 10 * CELL + 9 * 1;
  // ばら（ones を 1列＝最大10個、blue）
  const onesOriginX = tens > 0 ? x + stickGap : PAD;
  for (let o = 0; o < ones; o++) {
    const y = PAD + o * (CELL + GAP);
    rects.push(
      <rect key={`o-${o}`} x={onesOriginX} y={y} width={CELL} height={CELL} rx={4} fill={COLOR.blue} stroke={COLOR.stroke} strokeWidth={1.5} />,
    );
  }
  const onesHeight = ones > 0 ? ones * CELL + (ones - 1) * GAP : 0;
  const vbW = onesOriginX + (ones > 0 ? CELL : 0) + PAD;
  const vbH = Math.max(tens > 0 ? tensHeight : 0, onesHeight, CELL) + PAD * 2;
  return (
    <Frame vbW={vbW} vbH={vbH} size={size} label={`10が ${tens}こ と ばらが ${ones}こ`}>
      {rects}
    </Frame>
  );
}
