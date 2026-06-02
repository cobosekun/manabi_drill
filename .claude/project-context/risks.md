# リスク登録簿（Risk Register）
カテゴリ: Technical · Security · Product · Business · Operational · Legal · Compliance
各リスク: 内容 · 可能性 × 影響 · オーナー · 緩和策 · 状態
優先順位付け・前提からの昇格は Universal `/risk-review` と連携。

## Product
- **問題データの誤り（誤った読み・答え・時刻判定）** · 可能性: 中 × 影響: 高 · owner: keisuke · 緩和: `src/data`/判定ロジックの突合レビュー、最小 unit test で答えを検証 · 状態: オープン
- **子どもが自力で操作できない（UI 可読性/操作性不足）** · 可能性: 中 × 影響: 中 · owner: keisuke · 緩和: 実機・実ユーザーで試用観察、ひらがな主体・大きめタップ領域 · 状態: オープン

## Technical
- **テスト皆無による回帰** · 可能性: 中 × 影響: 中 · owner: keisuke · 緩和: 出題ロジックに最小 unit test、変更前に `lint`+`build` · 状態: オープン
- **進捗データ消失（localStorage クリア/端末変更）** · 可能性: 中 × 影響: 低 · owner: keisuke · 緩和: 個人用途では許容、必要なら export/import を将来検討 · 状態: 受容
- **Next.js 16 / React 19 など最新メジャー依存の破壊的変更** · 可能性: 低 × 影響: 中 · owner: keisuke · 緩和: 更新時にリリースノート確認、ビルドゲート · 状態: 監視

## Security
- 攻撃面は小さい（認証なし・サーバDBなし・PII なし）。`/api/questions` は静的データの GET のみ · 可能性: 低 × 影響: 低 · 緩和: 外部入力・データ収集を追加する場合に `/security-review` を起動 · 状態: 受容

## Legal / Compliance
- **子ども向けサービスの個人情報規制（COPPA / 個人情報保護法 等）** · 可能性: 低（現状データ収集なし）× 影響: 高（公開・収集を始めた場合）· owner: keisuke · 緩和: データ収集・公開へ方針変更する前に再評価し ADR を残す · 状態: 監視（現状は個人・家族用で非該当）

## Operational
- ホスティングは Vercel 依存 · 可能性: 低 × 影響: 低 · 緩和: 静的中心のため移行容易 · 状態: 受容
