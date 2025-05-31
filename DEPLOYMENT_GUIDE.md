# 🚀 FA-Game 部署指南

本指南將協助您將 FA-Game 部署到雲端，使用 Supabase 作為資料庫和 Firebase 用於檔案儲存。

## 📋 前置準備

### 1. Supabase 設定

1. 前往 [Supabase](https://supabase.com) 並創建新專案
2. 在 Project Settings > Database 中找到：
   - **Database URL**: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
   - **Project URL**: `https://[PROJECT-REF].supabase.co`
   - **API Keys** > `anon` key

### 2. Firebase 設定

1. 前往 [Firebase Console](https://console.firebase.google.com)
2. 創建新專案
3. 啟用 Storage 服務
4. 在專案設定中獲取配置資訊
5. 生成 Admin SDK 私鑰 (服務帳戶)

### 3. Google Gemini API

1. 前往 [Google AI Studio](https://aistudio.google.com)
2. 獲取 Gemini API Key

### 4. Google OAuth (可選)

1. 前往 [Google Cloud Console](https://console.cloud.google.com)
2. 啟用 Google+ API
3. 創建 OAuth 2.0 客戶端 ID

## 🔧 本地開發設定

### 1. 克隆專案

```bash
git clone https://github.com/garyyang1001/fa-game.git
cd fa-game
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 設定環境變數

```bash
cp .env.local.example .env.local
```

編輯 `.env.local` 並填入您的設定：

```env
# Supabase 配置
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# AI 功能
NEXT_PUBLIC_GEMINI_API_KEY="your-gemini-api-key"

# 認證
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-32-chars-minimum"

# Google OAuth (可選)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Firebase Admin
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
```

### 4. 設定資料庫

```bash
# 生成 Prisma 客戶端
npx prisma generate

# 推送資料庫架構到 Supabase
npx prisma db push

# 或者使用 migration (推薦用於生產環境)
npx prisma migrate dev --name init
```

### 5. 啟動開發伺服器

```bash
npm run dev
```

訪問 http://localhost:3000 查看應用程式。

## 🌐 Vercel 部署

### 1. 部署到 Vercel

1. Fork 此 repository
2. 在 [Vercel](https://vercel.com) 導入專案
3. 設定環境變數 (見下方)
4. 部署！

### 2. Vercel 環境變數設定

在 Vercel Dashboard > Project Settings > Environment Variables 中添加：

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-32-chars-minimum
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n
```

### 3. 部署後設定

部署完成後：

1. 更新 Google OAuth 重定向 URI：
   - 添加 `https://your-domain.vercel.app/api/auth/callback/google`

2. 更新 Firebase 授權網域：
   - 在 Firebase Console > Authentication > Settings > Authorized domains
   - 添加您的 Vercel 網域

## 🔧 Zeabur 部署

### 1. 部署到 Zeabur

1. 在 [Zeabur](https://zeabur.com) 導入專案
2. 添加 PostgreSQL 服務 (或使用外部 Supabase)
3. 設定環境變數
4. 部署！

### 2. Zeabur 環境變數設定

設定與 Vercel 相同的環境變數。

## 🗄️ 資料庫管理

### Prisma Studio

```bash
npx prisma studio
```

### 資料庫遷移

```bash
# 創建新的遷移
npx prisma migrate dev --name your-migration-name

# 應用遷移到生產環境
npx prisma migrate deploy

# 重置資料庫 (開發環境)
npx prisma migrate reset
```

### 資料庫同步

```bash
# 將 Prisma schema 推送到資料庫
npx prisma db push

# 從資料庫生成 Prisma schema
npx prisma db pull
```

## 🐛 常見問題解決

### 1. 資料庫連接失敗

- 檢查 `DATABASE_URL` 是否正確
- 確認 Supabase 專案是否啟動
- 檢查 IP 允許清單設定

### 2. 環境變數未載入

- 確認 `.env.local` 檔案存在
- 重啟開發伺服器
- 檢查變數名稱是否正確

### 3. Firebase 權限錯誤

- 檢查 Firebase 規則設定
- 確認服務帳戶私鑰格式正確
- 檢查專案 ID 是否匹配

### 4. Prisma 生成錯誤

```bash
# 清除並重新生成
rm -rf node_modules/.prisma
npx prisma generate
```

### 5. 部署後 500 錯誤

- 檢查 Vercel 函數日誌
- 確認所有環境變數已設定
- 檢查資料庫連接狀態

## 📊 監控與維護

### 1. 日誌查看

- **Vercel**: Dashboard > Functions > View Function Logs
- **Zeabur**: Dashboard > Logs

### 2. 效能監控

- 使用 Vercel Analytics
- 監控 Supabase Dashboard 中的資料庫效能

### 3. 定期維護

- 定期備份資料庫
- 更新依賴套件
- 監控 API 使用量

## 🔒 安全性檢查清單

- [ ] 所有敏感資訊都放在環境變數中
- [ ] Firebase 安全規則已正確設定
- [ ] Supabase RLS (Row Level Security) 已啟用
- [ ] NEXTAUTH_SECRET 使用強密碼
- [ ] 定期輪換 API 金鑰
- [ ] 監控異常訪問模式

## 📞 支援

如果遇到問題：

1. 檢查此文檔的常見問題解決
2. 查看專案的 GitHub Issues
3. 參考各服務的官方文檔：
   - [Supabase Docs](https://supabase.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Next.js Docs](https://nextjs.org/docs)
   - [Prisma Docs](https://www.prisma.io/docs)

---

**祝您部署順利！** 🚀
