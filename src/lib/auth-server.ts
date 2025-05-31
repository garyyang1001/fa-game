// src/lib/auth-server.ts
// 簡化版本 - 暫時跳過認證檢查
// TODO: 實作 Firebase Admin SDK 進行伺服器端驗證

import { NextRequest } from 'next/server';

export async function getCurrentUser(request: NextRequest) {
  // 暫時返回 null，等待 Firebase Admin SDK 設定
  // 在生產環境中，這裡應該要驗證 Firebase ID Token
  return null;
}