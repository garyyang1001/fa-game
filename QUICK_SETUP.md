# ⚡ FA-Game 快速設定指南

## 🎯 5 分鐘快速部署

### 步驟 1：設定 Supabase 資料庫

1. 前往 [Supabase](https://supabase.com) 註冊並建立新專案
2. 在 **Project Settings > Database** 中獲取：
   ```
   Database URL: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
3. 在 **Project Settings > API** 中獲取：
   ```
   Project URL: https://[PROJECT-REF].supabase.co
   anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 步驟 2：設定 Gemini AI

1. 前往 [Google AI Studio](https://aistudio.google.com)
2. 點擊 **Get API Key** 並建立新的 API 金鑰
3. 記錄您的 Gemini API Key

### 步驟 3：部署到 Vercel

1. **Fork 此專案** 到您的 GitHub 帳戶
2. 前往 [Vercel](https://vercel.com) 並點擊 **New Project**
3. 選擇您剛才 fork 的 `fa-game` repository
4. 在 **Environment Variables** 中添加：

```bash
# 必要變數 (一定要設定)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-super-secret-32-chars-minimum-key-here
```

5. 點擊 **Deploy** 按鈕

### 步驟 4：設定資料庫架構

部署完成後，在 Vercel Dashboard 中：

1. 前往 **Functions** 標籤
2. 找到任何一個 API 函數的 URL（例如 `/api/health`）
3. 訪問 `https://your-project.vercel.app/api/setup-db` 來自動建立資料庫表格

### 步驟 5：完成！

🎉 您的 FA-Game 應用程式現在已經可以使用了！

訪問 `https://your-project.vercel.app` 開始創建您的第一個教育遊戲。

---

## 🔧 本地開發設定

如果您想在本地開發：

```bash
# 1. 克隆專案
git clone https://github.com/garyyang1001/fa-game.git
cd fa-game

# 2. 安裝依賴
npm install

# 3. 複製環境變數範本
cp .env.local.example .env.local

# 4. 編輯 .env.local 填入您的設定
# (使用相同的 Supabase 和 Gemini 設定)

# 5. 設定資料庫
npx prisma generate
npx prisma db push

# 6. 啟動開發伺服器
npm run dev
```

---

## 🆘 常見問題

### Q: 部署後出現 500 錯誤
**A:** 檢查 Vercel 中的環境變數是否都正確設定，特別是 `DATABASE_URL` 和 `NEXTAUTH_SECRET`

### Q: 資料庫連接失敗
**A:** 確認 Supabase 專案是否已啟動，Database URL 是否正確（包含密碼）

### Q: AI 功能無法使用
**A:** 檢查 `NEXT_PUBLIC_GEMINI_API_KEY` 是否正確設定且有效

### Q: 登入功能不工作
**A:** 確認 `NEXTAUTH_URL` 設定為您的實際網域，且 `NEXTAUTH_SECRET` 至少 32 個字元

---

## 📞 需要協助？

- 📖 查看 [完整部署指南](DEPLOYMENT_GUIDE.md)
- 🐛 在 [GitHub Issues](https://github.com/garyyang1001/fa-game/issues) 回報問題
- 💡 有想法？歡迎提出 [Feature Request](https://github.com/garyyang1001/fa-game/issues/new)

**祝您使用愉快！** 🚀
