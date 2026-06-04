# drill — Project Claude（Specialization Layer）
> Inherits the Universal OS at ~/.claude. This file ADDS project-specific context only.
> Principles, skills/agents, governance, and Git policy come from the Universal layer — do not duplicate them here.

## Project snapshot
- Type: Web App (educational drill) / Stage: MVP / Team: Solo / Risk Level: Low / Security Level: Basic
- Stack: Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · no backend DB · progress in `localStorage` · Vercel deploy

## What this project is
小学1年生向けの学習ドリル Web アプリ。こくご（漢字80字）・さんすう（たしざん/ひきざん）・とけい（時計の読み取り）を、子どもが一人で楽しく練習できる UI で提供する。データ収集なし・サーバDBなし。詳細は `project-context/brief.md`。

## Which Universal capabilities to use (reuse-first)
- 意思決定 → `/decide` ・ リスク/前提 → `/risk-review`
- レビュー → `/code-review` ・ 動作確認 → `verify` / `run`
- テスト方針（必要になったら）→ `/test-strategy`
- 進行管理 → `/work-status`
- セキュリティ/脅威モデルは Low リスクのため通常不要。データ収集や外部連携を追加する場合のみ `/security-review` + `/threat-model` を起動。

## Quality gates (Risk Level: Low)
- `npm run lint`（ESLint / eslint-config-next）と `npm run build`（Next.js ビルド成功）を変更マージ前に通す。
- 現状 CI なし → 手動（手元で実行）。型エラーはビルドで検出される。
- ゲートを弱める場合は ADR を残すこと。

## Project-specific boundaries
- **対象は子ども**：UI 文言は基本ひらがな、漢字を出す箇所（こくご）以外は難読語を避ける。可読性・タップ領域・コントラストに配慮。
- **データ方針**：個人情報・アカウントは持たない。進捗は `localStorage` のみ（`DrillProgress` / 日付キー）。サーバ送信・トラッキングを安易に追加しない。
- **問題データ**：`src/data/*`（漢字・計算）と型 `src/types/*` が単一の真実。問題追加・改変はここで行い、UI ロジックと混ぜない。
- Secrets / 顧客データは（もしあれば）このプロジェクト層に置く。`~/.claude` には絶対に置かない。

## Project commands / agents
- なし。Universal で充足。
