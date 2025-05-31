# FA-Game Setup Guide 🚀

這是一份快速設置指南，幫助您在 5 分鐘內啟動 FA-Game 專案。

## 必要準備

1. **Gemini API Key**
   - 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
   - 創建新的 API Key
   - 複製保存

2. **Firebase 專案**
   - 前往 [Firebase Console](https://console.firebase.google.com/)
   - 創建新專案
   - 啟用 Authentication (Google 登入)
   - 啟用 Realtime Database
   - 啟用 Storage
   - 在專案設定中取得配置資訊

3. **Google OAuth**
   - 在 [Google Cloud Console](https://console.cloud.google.com/)
   - 創建 OAuth 2.0 客戶端 ID
   - 添加授權重定向 URI：
     - `http://localhost:3000/api/auth/callback/google`
     - `https://your-domain.vercel.app/api/auth/callback/google`

## 本地開發

```bash
# 1. 克隆專案
git clone https://github.com/garyyang1001/fa-game.git
cd fa-game

# 2. 安裝依賴
npm install

# 3. 設置環境變數
cp .env.local.example .env.local
# 編輯 .env.local 填入您的 API keys

# 4. 啟動資料庫 (使用 Docker)
docker-compose up -d postgres

# 5. 初始化資料庫
npx prisma generate
npx prisma migrate dev

# 6. 啟動開發伺服器
npm run dev
```

訪問 http://localhost:3000

## 部署到 Vercel

1. **Fork 此專案**

2. **導入到 Vercel**
   - 前往 [Vercel](https://vercel.com/new)
   - 導入您 fork 的專案

3. **設置環境變數**
   在 Vercel 專案設置中添加所有環境變數

4. **部署**
   Vercel 會自動部署您的應用

## 功能測試

1. **語音創建遊戲**
   - 點擊麥克風按鈕
   - 說："我想做一個教孩子認識水果的配對遊戲"
   - AI 會自動生成遊戲

2. **使用模板**
   - 進入創建頁面
   - 選擇預設模板
   - 自定義內容

3. **分享遊戲**
   - 創建完成後點擊分享
   - 其他用戶可以玩您的遊戲

## 問題排除

### 語音識別不工作
- 確保使用 Chrome 或 Edge 瀏覽器
- 允許麥克風權限
- 檢查 HTTPS 連接（生產環境）

### Gemini API 錯誤
- 檢查 API Key 是否正確
- 確認 API 配額未超限

### 資料庫連接失敗
- 確認 PostgreSQL 正在運行
- 檢查 DATABASE_URL 格式

## 聯繫支援

如有問題，請在 [GitHub Issues](https://github.com/garyyang1001/fa-game/issues) 提出。

---

**Happy Gaming! 🎮**