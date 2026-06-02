"use client";

import type { SvgParamsMap } from "@/types/curriculum";

// SvgParamsMap["clock"] = { hour: number; minute: number }
type ClockProps = SvgParamsMap["clock"] & { size?: number };

/**
 * アナログ時計の SVG（子ども向け・高コントラスト）。
 * hour(0–11) / minute(0–55, 5刻み想定) を受け取り、短針・長針・数字・目盛りを描く。
 * 既存の clock/page.tsx の ClockFace を共通レンダラへ移植したもの。
 */
export function ClockSvg({ hour, minute, size = 200 }: ClockProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;

  // 針の角度（12時を 0° として時計回り。SVG は -90° から）
  const minuteAngle = (minute / 60) * 360 - 90;
  const hourAngle = (((hour % 12) + minute / 60) / 12) * 360 - 90;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const minuteHandLen = r * 0.78;
  const hourHandLen = r * 0.54;

  const minuteTip = {
    x: cx + minuteHandLen * Math.cos(toRad(minuteAngle)),
    y: cy + minuteHandLen * Math.sin(toRad(minuteAngle)),
  };
  const hourTip = {
    x: cx + hourHandLen * Math.cos(toRad(hourAngle)),
    y: cy + hourHandLen * Math.sin(toRad(hourAngle)),
  };

  // 数字（1–12）
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const angle = toRad((n / 12) * 360 - 90);
    const nr = r * 0.8;
    return { n, x: cx + nr * Math.cos(angle), y: cy + nr * Math.sin(angle) };
  });

  // 目盛り（60本。5の倍数は太く）
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = toRad((i / 60) * 360 - 90);
    const isHour = i % 5 === 0;
    const outer = r * 0.97;
    const inner = isHour ? r * 0.88 : r * 0.92;
    return {
      x1: cx + inner * Math.cos(angle),
      y1: cy + inner * Math.sin(angle),
      x2: cx + outer * Math.cos(angle),
      y2: cy + outer * Math.sin(angle),
      isHour,
    };
  });

  const dispHour = hour % 12 === 0 ? 12 : hour % 12;
  const label = minute === 0 ? `${dispHour}じ` : `${dispHour}じ${minute}ふん`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${label}を しめす とけい`}
    >
      {/* 外枠 */}
      <circle cx={cx} cy={cy} r={r + 4} fill="#fef9c3" stroke="#fbbf24" strokeWidth="4" />
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#475569" strokeWidth="2.5" />

      {/* 目盛り */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={t.isHour ? "#334155" : "#94a3b8"}
          strokeWidth={t.isHour ? 2.5 : 1}
          strokeLinecap="round"
        />
      ))}

      {/* 数字 */}
      {numbers.map(({ n, x, y }) => (
        <text
          key={n}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.11}
          fontWeight="bold"
          fill="#1e293b"
        >
          {n}
        </text>
      ))}

      {/* 長針（分・青） */}
      <line
        x1={cx}
        y1={cy}
        x2={minuteTip.x}
        y2={minuteTip.y}
        stroke="#0ea5e9"
        strokeWidth={size * 0.03}
        strokeLinecap="round"
      />
      {/* 短針（時・紫） */}
      <line
        x1={cx}
        y1={cy}
        x2={hourTip.x}
        y2={hourTip.y}
        stroke="#7c3aed"
        strokeWidth={size * 0.045}
        strokeLinecap="round"
      />
      {/* 中心 */}
      <circle cx={cx} cy={cy} r={size * 0.035} fill="#1e293b" />
    </svg>
  );
}
