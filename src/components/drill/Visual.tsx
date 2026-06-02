"use client";

import type { VisualSpec } from "@/types/curriculum";
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
