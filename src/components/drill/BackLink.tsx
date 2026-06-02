"use client";

import Link from "next/link";
import { ThemeName } from "@/types/drill";
import { getTheme } from "@/lib/theme";

interface BackLinkProps {
  onClick?: () => void;
  href?: string;
  label?: string;
  theme?: ThemeName;
}

/**
 * 「← もどる」「← きょうかえらび」等の戻る導線を共通化。
 * href があれば next/link、なければ button(onClick) として動作。
 * 既存ページの戻る導線スタイルを踏襲。色は theme で切替。
 */
export function BackLink({
  onClick,
  href,
  label = "← もどる",
  theme = "sky",
}: BackLinkProps) {
  const t = getTheme(theme);
  const className = `inline-flex items-center gap-1 ${t.link} font-bold py-2 px-3 rounded-xl hover:bg-white/50 transition-all`;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className={className}>
      {label}
    </button>
  );
}
