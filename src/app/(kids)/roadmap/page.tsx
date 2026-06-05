// ══════════════════════════════════════════
// /roadmap — 学びの ロードマップ（依存グラフ）ページ。
// 単元の前提→後続を フローチャートで見せ、タップで がくしゅうへ。
// 本体は client の RoadmapFlow。ここは見出しと もどる導線だけの 薄いラッパ。
// ══════════════════════════════════════════

import Link from "next/link";
import RoadmapFlow from "@/components/drill/RoadmapFlow";
import { RubyText } from "@/components/drill/RubyText";

export default function RoadmapPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-700">
          🗺️ <RubyText text="まなびの ロードマップ" />
        </h1>
        <Link
          href="/"
          className="rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-base font-bold text-gray-600 hover:bg-gray-50"
        >
          🏠 ホーム
        </Link>
      </div>

      <RoadmapFlow />
    </main>
  );
}
