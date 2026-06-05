import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  /* config options here */
};

// Vercel BotID を有効化（/api/feedback への bot 投稿を検知）。
// ローカル開発では no-op（実ユーザーをブロックしない）。
export default withBotId(nextConfig);
