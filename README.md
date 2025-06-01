# FA-Game 🎮

一個讓父母用語音就能創建教育遊戲的社交平台，專為 3-8 歲兒童設計。
現在加入 **AI 學習助手**，讓孩子和家長都能愛上 AI！

[English](#english) | [中文](#中文)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Phaser-3.80-orange" alt="Phaser">
  <img src="https://img.shields.io/badge/Supabase-Ready-green" alt="Supabase">
  <img src="https://img.shields.io/badge/Gemini_Pro-2.5-green" alt="Gemini">
  <img src="https://img.shields.io/badge/AI_Enhanced-🤖-purple" alt="AI Enhanced">
  <img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen" alt="Status">
</p>

## 📚 重要文檔

- 🚀 **[完整部署指南](DEPLOYMENT_GUIDE.md)** - 詳細的雲端部署教學
- 🔑 **[API Key 設置指南](API_KEY_SETUP.md)** - 如何設置和更新 API Keys
- 📋 [開發規劃書](ROADMAP.md) - 詳細的技術架構演進路線圖
- 🤝 [貢獻指南](CONTRIBUTING.md) - 如何參與開發
- 🤖 [AI 整合指南](AI_INTEGRATION_GUIDE.md) - AI 學習助手完整使用指南

## 中文

### 🌟 核心特色

- 🎤 **語音創建**：父母只需說出想法，AI 自動生成遊戲
- 🤖 **AI 學習助手**：智能提示、個人化鼓勵、適應性難度調整
- 🎨 **創意映射系統**：將孩子的想像力轉化為獨特的遊戲效果
- 👨‍👩‍👧‍👦 **家長控制**：完整的 AI 功能控制面板，保護兒童隱私
- 🎮 **多種遊戲模板**：配對、排序、接水果等多種玩法
- ✨ **即時預覽**：創作過程中即時看到遊戲效果
- 👥 **社群分享**：與其他父母交流創意
- 💰 **創意變現**：優質模板可以販售

### ✨ 最新更新 (v2.1) - MVP 優化版

- 🎯 **聚焦 MVP 體驗**：專注於「接水果」遊戲，創造無限變化
- 🎨 **創意映射系統**：30+ 種預設物品和效果組合
- 👀 **即時效果預覽**：選擇後立即看到視覺效果
- 🤖 **AI 理解優化**：專注理解創意，不涉及技術細節
- 🌈 **豐富的視覺效果**：彩虹色、發光、軌跡等特效
- 📱 **完美的觸控體驗**：針對手機優化的操作方式

### 🎮 接水果遊戲的無限可能

同一個遊戲框架，因為孩子的創意不同，每個成品都是獨特的：

**小明的創作**：用魔法棒接彩虹色的星星 → 夢幻的魔法遊戲
**小美的創作**：用擁抱接愛心 → 溫馨的情感表達遊戲  
**小華的創作**：用籃子接會跳的香蕉 → 歡樂的水果派對

每個選擇都有獨特效果：
- 🍎 蘋果：正常掉落，接到時有咬一口的音效
- ⭐ 星星：之字形飄落，接到時整個畫面會閃閃發光
- ❤️ 愛心：溫柔地飄落，接到時畫面充滿愛心
- 🪄 魔法棒：點擊可以瞬間移動
- 🤗 擁抱：有吸引力，東西會自動靠近

### 🚀 快速開始

#### 環境需求

- Node.js 18+
- npm 或 yarn
- **Supabase 帳戶** （主要資料庫）
- **Google Gemini API Key** （AI 功能必需） ⚠️ **重要：請確保 API Key 有效**
- Firebase 專案 （檔案儲存）

> ⚠️ **注意**：如果您看到 "API key expired" 錯誤，請參考 [API Key 設置指南](API_KEY_SETUP.md) 更新您的 API Key。

#### 5 分鐘快速部署

1. **Fork 此專案**
2. **設定 Supabase**：
   - 建立新專案
   - 獲取 Database URL 和 API Keys
3. **取得 Google Gemini API Key**：
   - 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
   - 創建新的 API Key
4. **部署到 Vercel**：
   - 導入 GitHub repository
   - 設定環境變數（包含 Gemini API Key）
   - 一鍵部署！

詳細步驟請參考 **[完整部署指南](DEPLOYMENT_GUIDE.md)**

#### 本地開發設定

```bash
# 1. 克隆專案
git clone https://github.com/garyyang1001/fa-game.git
cd fa-game

# 2. 安裝依賴
npm install

# 3. 設定環境變數
cp .env.local.example .env.local
# 編輯 .env.local 填入您的 API keys

# 4. 設定資料庫
npx prisma generate
npx prisma db push

# 5. 啟動開發伺服器
npm run dev
```

### 🛠️ 技術架構

- **前端框架**：Next.js 14 + TypeScript
- **資料庫**：Supabase (PostgreSQL) + Prisma ORM
- **遊戲引擎**：Phaser.js
- **AI 服務**：Google Gemini Pro 2.5
- **檔案儲存**：Firebase Storage
- **認證**：NextAuth.js + Google OAuth
- **樣式**：Tailwind CSS + Radix UI
- **部署**：Vercel / Zeabur (支援一鍵部署)

### 📁 專案結構

```
fa-game/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   ├── create/            # 創建遊戲頁面
│   │   ├── games/             # 遊戲列表頁面
│   │   ├── parent-control/    # 家長控制面板
│   │   └── login/             # 登入頁面
│   ├── components/            # React 組件
│   │   ├── ai/               # AI 助手組件
│   │   ├── creation/         # 🆕 創作流程組件
│   │   │   └── live-preview.tsx # 🆕 即時預覽
│   │   ├── ui/               # UI 基礎組件
│   │   └── ...               # 業務組件
│   ├── lib/                  # 核心配置
│   │   ├── prisma.ts         # Prisma 客戶端
│   │   ├── supabase.ts       # Supabase 客戶端
│   │   ├── gemini.ts         # 🆕 增強的 Gemini AI 整合
│   │   ├── game-mappings.ts  # 🆕 創意映射系統
│   │   ├── gemini-error-handler.ts # API 錯誤處理
│   │   └── auth-server.ts    # 認證服務
│   ├── services/             # API 服務
│   ├── hooks/                # 自定義 Hooks
│   ├── game-templates/       # 遊戲模板
│   │   ├── catch-game.ts     # 🆕 接水果遊戲模板
│   │   ├── matching-game.ts  # 配對遊戲
│   │   └── sorting-game.ts   # 排序遊戲
│   └── types/                # TypeScript 類型
├── prisma/                   # 資料庫架構
│   └── schema.prisma
├── API_KEY_SETUP.md          # API Key 設置指南
├── DEPLOYMENT_GUIDE.md       # 完整部署指南
└── tests/                    # 測試檔案
```

### 🔧 開發指令

```bash
# 開發模式
npm run dev

# 建構生產版本
npm run build

# 啟動生產伺服器
npm start

# 資料庫管理
npm run prisma:studio    # 打開資料庫管理介面
npm run prisma:migrate   # 執行資料庫遷移
npm run prisma:push      # 推送 schema 到資料庫

# 代碼檢查和測試
npm run lint
npm test
```

### 🚀 雲端部署

#### Vercel 部署（推薦）

1. Fork 這個 repository
2. 在 [Vercel](https://vercel.com) 導入專案
3. 設定環境變數（詳見部署指南）
4. 一鍵部署！

#### 其他平台

- **Zeabur**：支援一鍵部署
- **Railway**：完全相容
- **Netlify**：需要額外配置

詳細步驟請參考 **[完整部署指南](DEPLOYMENT_GUIDE.md)**

### 📱 功能列表

#### 已完成 ✅
- [x] 改進的語音輸入介面
- [x] 基礎遊戲模板（配對、排序）
- [x] **🆕 接水果遊戲模板**
- [x] **🆕 創意映射系統**
- [x] **🆕 即時效果預覽**
- [x] 使用者認證（Google OAuth）
- [x] 遊戲分享功能
- [x] 遊戲列表與搜尋
- [x] 響應式設計
- [x] **AI 學習助手系統**
- [x] **家長控制面板**
- [x] **智能提示與個人化鼓勵**
- [x] **隱私保護機制**
- [x] **Supabase 整合**
- [x] **生產就緒部署**
- [x] **完整錯誤處理**
- [x] **API Key 錯誤提示**

#### 開發中 🚧
- [ ] 社群互動功能
- [ ] 模板市集
- [ ] 更多 AI 驅動的遊戲模板
- [ ] 語音交互 AI 助手

#### 計劃中 📋
- [ ] GDevelop 整合
- [ ] 多語言支援（AI 輔助翻譯）
- [ ] 手機 App 版本
- [ ] AI 模型本地化部署

### 🔒 隱私與安全

#### 資料保護
- **端到端加密**：所有敏感資料都經過加密
- **最小權限原則**：只收集必要的用戶資料
- **GDPR 合規**：完全符合歐盟資料保護法規
- **兒童隱私**：特別保護 13 歲以下兒童的隱私

#### 安全措施
- **環境變數保護**：所有敏感配置都通過環境變數管理
- **SQL 注入防護**：使用 Prisma ORM 防止 SQL 注入
- **XSS 防護**：內建 Next.js 安全特性
- **CSRF 保護**：使用 NextAuth.js 內建保護機制

### 🤝 貢獻指南

歡迎貢獻！我們特別需要：

- 🤖 **AI 功能開發**：新的 AI 助手功能
- 🎮 **遊戲模板**：創新的教育遊戲類型
- 🌍 **國際化**：多語言支援
- 🐛 **Bug 修復**：提高系統穩定性
- 📖 **文檔改進**：讓更多人能輕鬆使用

請先閱讀 [CONTRIBUTING.md](CONTRIBUTING.md)

### 🆘 支援與反饋

- 📖 **文檔**：查看 [部署指南](DEPLOYMENT_GUIDE.md) 和 [API Key 設置指南](API_KEY_SETUP.md)
- 🐛 **Bug 回報**：在 GitHub Issues 中報告
- 💡 **功能建議**：歡迎在 Issues 中提出想法
- 💬 **社群討論**：加入我們的討論區

### 📄 授權

MIT License - 詳見 [LICENSE](LICENSE)

---

## English

### 🌟 Core Features

- 🎤 **Voice Creation**: Parents just speak their ideas, AI generates games
- 🤖 **AI Learning Assistant**: Smart hints, personalized encouragement, adaptive difficulty
- 🎨 **Creative Mapping System**: Transform children's imagination into unique game effects
- 👨‍👩‍👧‍👦 **Parent Control**: Complete AI control panel with privacy protection
- 🗄️ **Modern Database**: Powered by Supabase + Prisma for optimal performance
- 🎮 **Multiple Game Templates**: Matching, sorting, catch games and more
- ✨ **Live Preview**: See game effects in real-time during creation
- 👥 **Community Sharing**: Exchange ideas with other parents
- 💰 **Monetize Creativity**: Sell quality templates

### 🚀 Quick Start

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed setup instructions.

### 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Game Engine**: Phaser.js
- **AI Service**: Google Gemini Pro 2.5
- **Storage**: Firebase Storage
- **Auth**: NextAuth.js + Google OAuth
- **Styling**: Tailwind CSS + Radix UI
- **Deployment**: Vercel / Zeabur (One-click deploy)

### 📄 License

MIT License - see [LICENSE](LICENSE)

---

**讓每個父母都成為孩子的遊戲設計師，讓每個孩子都愛上 AI！** 🎮👨‍👩‍👧‍👦🤖

<p align="center">
  <strong>現在就開始：<a href="DEPLOYMENT_GUIDE.md">5 分鐘快速部署</a></strong>
</p>

<p align="center">
  Made with ❤️ by the FA-Game Team
</p>
