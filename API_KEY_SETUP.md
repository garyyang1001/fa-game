# API Key 設置指南

本指南將協助您設置和更新 FA-Game 所需的 API keys。

## 🔑 Google Gemini API Key

### 為什麼需要 Gemini API Key？

FA-Game 使用 Google Gemini AI 來理解您的語音輸入並生成適合的教育遊戲。沒有這個 API key，"創建遊戲"功能將無法使用。

### 如何獲取 Gemini API Key

1. **前往 Google AI Studio**
   - 訪問 [Google AI Studio](https://aistudio.google.com/app/apikey)
   - 使用您的 Google 帳號登入

2. **創建新的 API Key**
   - 點擊「Get API key」或「取得 API 金鑰」
   - 選擇現有的 Google Cloud 專案，或創建新專案
   - 複製生成的 API key

3. **保存您的 API Key**
   - 將 API key 保存在安全的地方
   - **不要**將 API key 分享給他人或提交到 Git

### 如何在 Zeabur 更新 API Key

1. **登入 Zeabur**
   - 前往 [Zeabur Dashboard](https://zeabur.com)
   - 登入您的帳號

2. **選擇專案**
   - 點擊您的 fa-game 專案

3. **更新環境變數**
   - 點擊「Variables」或「環境變數」
   - 找到 `NEXT_PUBLIC_GEMINI_API_KEY`
   - 將值更新為您的新 API key
   - 點擊保存

4. **重新部署**
   - 點擊「Redeploy」或「重新部署」
   - 等待部署完成（約 2-3 分鐘）

### 如何在 Vercel 更新 API Key

1. **登入 Vercel**
   - 前往 [Vercel Dashboard](https://vercel.com)

2. **進入專案設定**
   - 選擇您的 fa-game 專案
   - 點擊「Settings」

3. **更新環境變數**
   - 點擊「Environment Variables」
   - 找到 `NEXT_PUBLIC_GEMINI_API_KEY`
   - 更新值並保存

4. **重新部署**
   - 前往「Deployments」
   - 點擊最近的部署旁的三個點
   - 選擇「Redeploy」

## 🔒 API Key 安全提示

1. **定期更換**
   - 建議每 3-6 個月更換一次 API key

2. **設置配額**
   - 在 Google Cloud Console 設置 API 使用配額
   - 避免意外的高額費用

3. **監控使用量**
   - 定期檢查 API 使用狀況
   - 設置使用量警報

4. **限制來源**
   - 在 Google Cloud Console 中限制 API key 的使用來源
   - 只允許您的網站域名使用

## 🚨 常見問題

### Q: API key 過期了怎麼辦？
A: 按照上述步驟獲取新的 API key 並更新即可。

### Q: 出現 "QUOTA_EXCEEDED" 錯誤
A: 這表示您的 API 使用量已達上限。您需要：
- 等待配額重置（通常是每月初）
- 或在 Google Cloud Console 提高配額限制

### Q: API key 無效
A: 請確認：
- API key 複製完整，沒有多餘的空格
- API key 已在 Google Cloud Console 啟用
- Gemini API 服務已啟用

### Q: 如何查看 API 使用量？
A: 前往 [Google Cloud Console](https://console.cloud.google.com) > APIs & Services > Credentials，查看您的 API key 使用統計。

## 📞 需要幫助？

如果您在設置過程中遇到問題，請：
1. 查看 [GitHub Issues](https://github.com/garyyang1001/fa-game/issues)
2. 創建新的 Issue 描述您的問題
3. 包含錯誤訊息的截圖（記得遮蔽敏感資訊）
