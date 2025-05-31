# FA-Game 部署指南

## 部署選項

### 選項 1：Zeabur（已配置）

專案已經配置好使用 Debian 基礎映像，這能提供更好的 Prisma 兼容性。

1. 在 Zeabur 中導入專案
2. 設定以下環境變數：
   - `DATABASE_URL` - PostgreSQL 資料庫連接字串
   - `NEXTAUTH_URL` - 你的應用 URL（例如：https://你的應用.zeabur.app）
   - `NEXTAUTH_SECRET` - 隨機生成的密鑰（可使用 `openssl rand -base64 32`）
   - `GOOGLE_CLIENT_ID` - Google OAuth 客戶端 ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth 客戶端密鑰
3. 部署應用

### 選項 2：Vercel（推薦）

Vercel 是 Next.js 的官方託管平台，提供最佳的兼容性。

1. 前往 [vercel.com](https://vercel.com)
2. 使用 GitHub 登入並導入 `fa-game` 專案
3. 設定相同的環境變數
4. 點擊部署

### 選項 3：Docker（本地或任何雲端）

使用提供的 Dockerfile：

```bash
# 使用 Debian 版本（推薦）
docker build -f Dockerfile.debian -t fa-game .
docker run -p 3000:3000 --env-file .env fa-game

# 或使用 Alpine 版本
docker build -t fa-game .
docker run -p 3000:3000 --env-file .env fa-game
```

## 環境變數設定

創建 `.env` 檔案：

```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 資料庫設定

在部署前，確保執行資料庫遷移：

```bash
npx prisma migrate deploy
```

## 疑難排解

### Prisma 相關錯誤

如果遇到 Prisma 相關的錯誤：

1. 確保 `DATABASE_URL` 正確設定
2. 確保資料庫可以從部署環境訪問
3. 檢查 Prisma 二進制檔案是否正確生成

### OpenSSL 錯誤

專案已配置多個 Dockerfile 版本：
- `Dockerfile.debian` - 使用 Debian 基礎映像（更穩定）
- `Dockerfile` - 使用 Alpine Linux（更輕量）

Zeabur 預設使用 `Dockerfile.debian`。

### 建議

對於生產環境，我們推薦使用 Vercel，因為它提供：
- 自動的 SSL 證書
- 全球 CDN
- 自動擴展
- 零配置部署
- 最佳的 Next.js 支援