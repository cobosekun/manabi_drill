"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { AnimParamsMap, AnimVisual, VisualSpec } from "@/types/curriculum";
import { RubyText } from "./RubyText";
import { ClockSvg } from "./visuals/ClockSvg";
import { NumberBlocksSvg } from "./visuals/NumberBlocksSvg";

interface VisualProps {
  spec?: VisualSpec;
  /** SVG の大きさ(px)。省略時は各SVGの既定。 */
  size?: number;
  className?: string;
}

/**
 * VisualSpec を出し分ける図解レンダラ。
 *   none  → なにも描かない（null）
 *   emoji → 大きな絵文字＋（任意の）キャプション
 *   svg   → name に対応する SVG（clock / number-blocks）＋キャプション
 *   image → 画像＋キャプション（alt 必須）
 * 表示テキスト（caption / emoji値）は RubyText 経由で {漢字|よみ} をルビ表示。
 * 子ども向け・高コントラスト・Tailwind v4 固定クラス。
 */
export function Visual({ spec, size, className }: VisualProps) {
  if (!spec || spec.kind === "none") return null;

  const wrap = `flex flex-col items-center gap-2 my-2 ${className ?? ""}`;
  const captionCls = "text-sm font-bold text-slate-600 text-center";

  if (spec.kind === "emoji") {
    return (
      <figure className={wrap}>
        <div className="text-5xl leading-tight text-center break-words" aria-hidden={false}>
          <RubyText text={spec.value} />
        </div>
        {spec.caption && (
          <figcaption className={captionCls}>
            <RubyText text={spec.caption} />
          </figcaption>
        )}
      </figure>
    );
  }

  if (spec.kind === "image") {
    return (
      <figure className={wrap}>
        {/* データ駆動の任意URL画像のため next/image ではなく img を使用 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={spec.src}
          alt={spec.alt}
          className="max-w-full h-auto rounded-2xl border-2 border-slate-200 shadow-sm"
        />
      </figure>
    );
  }

  if (spec.kind === "anim") {
    return (
      <figure className={wrap}>
        <AnimView spec={spec} size={size} />
        {spec.caption && (
          <figcaption className={captionCls}>
            <RubyText text={spec.caption} />
          </figcaption>
        )}
      </figure>
    );
  }

  // spec.kind === "svg" — name で判別共用体が narrow される
  let svg: React.ReactNode = null;
  switch (spec.name) {
    case "clock":
      svg = <ClockSvg {...spec.params} size={size} />;
      break;
    case "number-blocks":
      svg = <NumberBlocksSvg {...spec.params} size={size} />;
      break;
    default: {
      // 将来 SvgParamsMap に name を足したらここで網羅性チェックされる
      const _exhaustive: never = spec;
      void _exhaustive;
      svg = null;
    }
  }

  return (
    <figure className={wrap}>
      {svg}
      {spec.caption && (
        <figcaption className={captionCls}>
          <RubyText text={spec.caption} />
        </figcaption>
      )}
    </figure>
  );
}

// ══════════════════════════════════════════
// アニメ図解（kind:"anim"）
// 既存の ClockSvg / NumberBlocksSvg を再利用し、React 状態 + Tailwind の
// transition ユーティリティだけで動かす（globals.css も @keyframes も足さない）。
// prefers-reduced-motion を尊重し、その場合は最終状態を静止表示する。
// 動きは 0.7〜1.2秒・ゆっくり（子ども向けに過度な動きを避ける）。
// ══════════════════════════════════════════

/**
 * ユーザーが「動きを減らす」設定をしているか。
 * useSyncExternalStore で購読（effect 内 setState を避ける）。
 * サーバ・初期スナップショットは false（＝SSR と一致、ハイドレーション無事故）。
 */
const RM_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}

/**
 * 入場アニメ用フラグ。reduced なら初期から true（遷移なし）、通常はマウント直後に
 * true へ切り替えて CSS transition を発火させる。setState は timeout コールバック内のみ。
 */
function useEntered(reduced: boolean): boolean {
  const [entered, setEntered] = useState(reduced);
  useEffect(() => {
    if (reduced) return; // 既に最終状態。setState せず遷移も起こさない
    const id = setTimeout(() => setEntered(true), 40);
    return () => clearTimeout(id);
  }, [reduced]);
  // reduced は hydration 後に false→true へ更新され得るが useState 初期値は追従しない。
  // 描画段で reduced を直接反映し、reduced ユーザーには必ず最終状態を見せる。
  return reduced || entered;
}

/** anim 判別共用体を name で出し分ける（網羅性は never でチェック）。 */
function AnimView({ spec, size }: { spec: AnimVisual; size?: number }) {
  switch (spec.name) {
    case "count-up":
      return <CountUp {...spec.params} />;
    case "blocks-add":
      return <BlocksAdd {...spec.params} size={size} />;
    case "blocks-remove":
      return <BlocksRemove {...spec.params} size={size} />;
    case "clock-tick":
      return <ClockTick {...spec.params} size={size} />;
    case "grow":
      return <Grow {...spec.params} />;
    default: {
      // 将来 AnimParamsMap に name を足したらここで網羅性チェックされる
      const _exhaustive: never = spec;
      void _exhaustive;
      return null;
    }
  }
}

// ── count-up: 数が from→to へ数えあがる ──
function CountUp({ to, from = 0, emoji }: AnimParamsMap["count-up"]) {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(reduced ? to : from);
  useEffect(() => {
    if (reduced) return; // 初期値が既に to
    const duration = 800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(from + (to - from) * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, from, reduced]);

  // reduced は hydration 後に true へ更新され得るため描画段で最終値 to を直接反映。
  const shown = reduced ? to : n;
  // emoji 指定時は数に合わせて並べる（多すぎは折り返し・上限20で安全に）
  const emojiCount = emoji ? Math.min(shown, 20) : 0;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-6xl font-extrabold text-sky-600 tabular-nums leading-none">{shown}</div>
      {emoji && (
        <div className="flex flex-wrap justify-center gap-0.5 text-2xl max-w-[16rem]" aria-hidden>
          {Array.from({ length: emojiCount }, (_, i) => (
            <span key={i}>{emoji}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── blocks-add: 左ブロックと右ブロックが両側からスライドして合流＝たしざん ──
function BlocksAdd({ left, right, size }: AnimParamsMap["blocks-add"] & { size?: number }) {
  const reduced = usePrefersReducedMotion();
  const entered = useEntered(reduced);
  const base = "transition-all duration-700 ease-out";
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <div className={`${base} ${entered ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
        <NumberBlocksSvg count={left} size={size} />
      </div>
      <span className="text-3xl font-bold text-slate-700">＋</span>
      <div className={`${base} ${entered ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
        <NumberBlocksSvg count={right} size={size} />
      </div>
      <span className="text-3xl font-bold text-slate-700">＝</span>
      <div className={`${base} delay-700 ${entered ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
        <NumberBlocksSvg count={left + right} size={size} />
      </div>
    </div>
  );
}

// ── blocks-remove: 全体に × がつき、のこりが ふわっと出る＝ひきざん ──
function BlocksRemove({ total, remove, size }: AnimParamsMap["blocks-remove"] & { size?: number }) {
  const reduced = usePrefersReducedMotion();
  const entered = useEntered(reduced);
  const remaining = Math.max(0, total - remove);
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* 既存 Subtraction 図（うしろ remove 個に × がつく） */}
      <NumberBlocksSvg total={total} remove={remove} size={size} />
      <span className="text-3xl font-bold text-slate-700">→</span>
      <div
        className={`transition-all duration-700 delay-500 ease-out ${
          entered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <NumberBlocksSvg count={remaining} size={size} />
      </div>
    </div>
  );
}

// ── clock-tick: ClockSvg を再利用し、針を from→to へ進める ──
function ClockTick({
  hour,
  minute,
  fromHour = 12,
  fromMinute = 0,
  size,
}: AnimParamsMap["clock-tick"] & { size?: number }) {
  const reduced = usePrefersReducedMotion();
  const startTotal = ((fromHour % 12) * 60 + fromMinute + 720) % 720; // 0–719 分（12時間）
  const endTotal = ((hour % 12) * 60 + minute + 720) % 720;
  const [cur, setCur] = useState(reduced ? endTotal : startTotal);
  useEffect(() => {
    if (reduced) return; // 初期値が既に endTotal
    // 常に時計回り（前進）で動かす。end < start なら 12時間ぶん回す。
    const target = endTotal >= startTotal ? endTotal : endTotal + 720;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCur(Math.round(startTotal + (target - startTotal) * p) % 720);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startTotal, endTotal, reduced]);

  // reduced は hydration 後に true へ更新され得るため描画段で最終時刻を直接反映。
  const shown = reduced ? endTotal : cur;
  return <ClockSvg hour={Math.floor(shown / 60) % 12} minute={shown % 60} size={size} />;
}

// ── grow: 段階絵文字を大きくしながら順に見せる（育つ） ──
const DEFAULT_GROW_STAGES = ["🌱", "🌿", "🌳"];
function Grow({ stages }: AnimParamsMap["grow"]) {
  const reduced = usePrefersReducedMotion();
  const list = stages && stages.length > 0 ? stages : DEFAULT_GROW_STAGES;
  const [idx, setIdx] = useState(reduced ? list.length - 1 : 0);
  useEffect(() => {
    if (reduced) return; // 初期値が既に最終段階
    if (idx >= list.length - 1) return;
    const t = setTimeout(() => setIdx((i) => Math.min(list.length - 1, i + 1)), 800);
    return () => clearTimeout(t);
  }, [idx, list.length, reduced]);

  // reduced は hydration 後に true へ更新され得るため描画段で最終段階を直接反映。
  const shownIdx = reduced ? list.length - 1 : idx;
  // 段階が進むほど大きく（font-size を transition でなめらかに）
  const sizeRem = 2.5 + shownIdx * 1.4;
  return (
    <span
      className="transition-all duration-500 ease-out leading-none"
      style={{ fontSize: `${sizeRem}rem` }}
      aria-hidden
    >
      {list[shownIdx]}
    </span>
  );
}
