import React from "react";

// ══════════════════════════════════════════
// RubyText — 「漢字＋ルビ（ふりがな）」記法のレンダラ
// 記法: {base|reading} を <ruby>base<rt>reading</rt></ruby> に変換する。
//   例: "{学校|がっこう}へ いく" → ルビ付き「学校」＋「へ いく」
// 記法外テキストはそのまま。不正記法（| 欠落・} 未閉じ・空）は
// 生文字フォールバックして絶対に壊れない（純関数 parseRuby に分離）。
// データ層は触らず、表示層でのみルビ化する（単一の真実＝data はプレーン文字列）。
// ══════════════════════════════════════════

/** parseRuby が返すセグメント（判別共用体）。 */
export type RubySegment =
  | { type: "text"; value: string }
  | { type: "ruby"; base: string; reading: string };

/**
 * 文字列を `{base|reading}` 記法でセグメント配列に分解する純関数。
 * テスト容易性のためコンポーネントから分離して export する。
 *
 * フォールバック方針（壊さない）:
 *  - `{` に対応する `}` が無い → 残り全体を生テキストとして扱う。
 *  - `{...}` 内に `|` が無い / base or reading が空 → その `{...}` を生テキストとして扱う。
 * 連続する text セグメントは結合して返す（描画の無駄を減らす）。
 */
export function parseRuby(input: string): RubySegment[] {
  const segments: RubySegment[] = [];
  let buffer = "";

  const flushText = () => {
    if (buffer.length > 0) {
      segments.push({ type: "text", value: buffer });
      buffer = "";
    }
  };

  let i = 0;
  const n = input.length;
  while (i < n) {
    const ch = input[i];
    if (ch !== "{") {
      buffer += ch;
      i += 1;
      continue;
    }

    // `{` 発見。対応する `}` を探す（ネストは想定せず最初の `}` まで）。
    const close = input.indexOf("}", i + 1);
    if (close === -1) {
      // 未閉じ → 残り全体を生テキスト。
      buffer += input.slice(i);
      break;
    }

    const inner = input.slice(i + 1, close);
    const bar = inner.indexOf("|");
    if (bar === -1) {
      // `|` 欠落 → `{...}` を生テキストとして扱う。
      buffer += input.slice(i, close + 1);
      i = close + 1;
      continue;
    }

    const base = inner.slice(0, bar);
    const reading = inner.slice(bar + 1);
    if (base.length === 0 || reading.length === 0 || reading.includes("|")) {
      // 空 base/reading、または `|` 複数 → 不正。生テキストにフォールバック。
      buffer += input.slice(i, close + 1);
      i = close + 1;
      continue;
    }

    // 正常なルビ記法。
    flushText();
    segments.push({ type: "ruby", base, reading });
    i = close + 1;
  }

  flushText();
  return segments;
}

/**
 * ルビ記法を取り除いた素のテキスト（基底文字のみ）を返す。
 * aria-label など「読み上げ／属性用の文字列」に使う。
 */
export function rubyToPlainText(input: string): string {
  return parseRuby(input)
    .map((seg) => (seg.type === "ruby" ? seg.base : seg.value))
    .join("");
}

interface RubyTextProps {
  /** `{base|reading}` 記法を含みうる表示テキスト。 */
  text: string;
  /** 外側 <span> に付与する追加クラス。 */
  className?: string;
}

/**
 * `{base|reading}` 記法をルビ表示する React コンポーネント。
 * rt は小さな上付き（text-[0.6em]）。ruby 要素自体はインラインなので
 * 親のフォントサイズ・タップ領域を変えない（ふりがなは行の上に乗るだけ）。
 */
export function RubyText({ text, className }: RubyTextProps) {
  const segments = parseRuby(text);
  return (
    <span className={className}>
      {segments.map((seg, idx) =>
        seg.type === "ruby" ? (
          <ruby key={idx} className="ruby-base">
            {seg.base}
            <rt className="text-[0.6em] font-normal leading-none tracking-tight opacity-80">
              {seg.reading}
            </rt>
          </ruby>
        ) : (
          <React.Fragment key={idx}>{seg.value}</React.Fragment>
        ),
      )}
    </span>
  );
}
