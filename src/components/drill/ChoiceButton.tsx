"use client";

import React from "react";
import { ButtonState, ThemeName } from "@/types/drill";
import { getTheme } from "@/lib/theme";

interface ChoiceButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  state?: ButtonState;
  disabled?: boolean;
  theme?: ThemeName;
}

/**
 * 既存3ページの ChoiceButton を統合。
 * sparkle 演出・⭕❌・animate-*（bounce-in / shake / sparkle）を維持。
 * default / selected のみ theme 依存。correct / incorrect / disabled は教科共通。
 */
export function ChoiceButton({
  children,
  onClick,
  state = "default",
  disabled = false,
  theme = "sky",
}: ChoiceButtonProps) {
  const t = getTheme(theme);
  const stateStyles: Record<ButtonState, string> = {
    default: t.choiceDefault,
    selected: t.choiceSelected,
    correct: "bg-emerald-100 text-emerald-700 border-emerald-400 animate-bounce-in",
    incorrect: "bg-rose-100 text-rose-700 border-rose-400 animate-shake",
    disabled: "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60",
  };
  const currentState = disabled ? "disabled" : state;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || state === "correct" || state === "incorrect"}
      aria-label={String(children)}
      className={`relative w-full py-4 px-6 text-xl font-bold rounded-2xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg ${stateStyles[currentState]}`}
      style={{ borderWidth: "3px", borderStyle: "solid" }}
    >
      <span className="flex items-center justify-center gap-2">
        {state === "correct" && <span className="text-2xl">⭕</span>}
        {state === "incorrect" && <span className="text-2xl">❌</span>}
        {children}
      </span>
      {state === "correct" && (
        <>
          <span className="absolute top-1 left-2 text-lg animate-sparkle">✨</span>
          <span className="absolute top-2 right-3 text-sm animate-sparkle" style={{ animationDelay: "0.2s" }}>⭐</span>
          <span className="absolute bottom-2 left-4 text-sm animate-sparkle" style={{ animationDelay: "0.4s" }}>✨</span>
          <span className="absolute bottom-1 right-2 text-lg animate-sparkle" style={{ animationDelay: "0.3s" }}>🌟</span>
        </>
      )}
    </button>
  );
}
