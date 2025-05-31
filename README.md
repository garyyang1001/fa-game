# FA-Game 🎮

一個讓父母用語音就能創建教育遊戲的社交平台，專為 3-8 歲兒童設計。
現在加入 **AI 學習助手**，讓孩子和家長都能愛上 AI！

[English](#english) | [中文](#中文)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Phaser-3.80-orange" alt="Phaser">
  <img src="https://img.shields.io/badge/Gemini_Pro-2.5-green" alt="Gemini">
  <img src="https://img.shields.io/badge/AI_Enhanced-🤖-purple" alt="AI Enhanced">
  <img src="https://img.shields.io/badge/Status-Beta-yellow" alt="Status">
</p>

## 📚 重要文檔

- 📋 [開發規劃書](ROADMAP.md) - 詳細的技術架構演進路線圖
- 🚀 [快速設置指南](SETUP.md) - 5分鐘內啟動專案
- 🤝 [貢獻指南](CONTRIBUTING.md) - 如何參與開發
- 🤖 [AI 整合指南](AI_INTEGRATION_GUIDE.md) - AI 學習助手完整使用指南

## 中文

### 🌟 核心特色

- 🎤 **語音創建**：父母只需說出想法，AI 自動生成遊戲
- 🤖 **AI 學習助手**：智能提示、個人化鼓勵、適應性難度調整
- 👨‍👩‍👧‍👦 **家長控制**：完整的 AI 功能控制面板，保護兒童隱私
- 🎨 **開源遊戲引擎**：基於 Phaser.js，確保流暢體驗
- 👥 **社群分享**：與其他父母交流創意
- 💰 **創意變現**：優質模板可以販售
- 🎮 **多種遊戲模板**：配對、排序、故事、繪畫等

### ✨ **AI 學習助手新功能**

#### 🧠 **智能學習功能**
- **智能提示**：當孩子遇到困難時，AI 提供引導性提示
- **個人化鼓勵**：根據學習進度生成適合的鼓勵話語
- **適應性難度**：自動調整遊戲難度，保持適當挑戰
- **學習分析**：提供詳細的學習進度和能力分析

#### 👨‍👩‍👧‍👦 **家長友善設計**
- **完全透明**：清楚顯示 AI 何時在工作
- **隱私優先**：所有數據本地處理，符合兒童隱私保護
- **完全控制**：可隨時開關任何 AI 功能
- **教育價值**：幫助家長了解 AI 如何輔助學習

#### 🎯 **讓孩子愛上 AI**
- **友善互動**：AI 以學習夥伴身份出現，不是冰冷的機器
- **漸進引入**：從簡單功能開始，逐步熟悉 AI
- **正面支持**：始終保持鼓勵和支持的語調

### 💡 最新更新

- ✨ **AI 學習助手系統**：完整的 AI 輔助學習功能
- 🎛️ **家長控制面板**：AI 使用統計、隱私設定、功能開關
- 📱 **智能遊戲增強**：遊戲中的 AI 提示和鼓勵系統
- 🔒 **隱私保護機制**：符合兒童隱私保護標準的 AI 實現
- 📊 **學習分析報告**：AI 驅動的學習進度洞察

### 🎯 使用場景

1. **家長**：為孩子快速創建個性化教育遊戲，並通過 AI 助手增強學習效果
2. **教師**：製作符合課程的互動教材，利用 AI 分析學生學習狀況
3. **內容創作者**：設計並銷售帶有 AI 功能的優質遊戲模板

### 🚀 快速開始

#### 環境需求

- Node.js 18+
- npm 或 yarn
- PostgreSQL 資料庫
- **Google Gemini API Key** （AI 功能必需）
- Firebase 專案

#### 安裝步驟

1. **克隆專案**
```bash
git clone https://github.com/garyyang1001/fa-game.git
cd fa-game
```

2. **安裝依賴**
```bash
npm install
```

3. **設定環境變數**
```bash
cp .env.local.example .env.local
```

編輯 `.env.local` 並填入您的 API keys：

```env
# AI 功能（推薦）
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# 資料庫（必需）
DATABASE_URL="postgresql://user:password@localhost:5432/fagame"

# 認證（必需）
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Firebase（必需）
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google OAuth（可選）
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **設定資料庫**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **啟動開發伺服器**
```bash
npm run dev
```

訪問 http://localhost:3000 查看應用

### 📁 專案結構

```
fa-game/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/             # API 路由
│   │   ├── create/          # 創建遊戲頁面
│   │   ├── games/           # 遊戲列表頁面
│   │   ├── parent-control/  # 🆕 家長控制面板
│   │   └── login/           # 登入頁面
│   ├── components/          # React 組件
│   │   ├── ai/             # 🆕 AI 助手組件
│   │   ├── ui/             # UI 基礎組件
│   │   └── ...             # 業務組件
│   ├── services/           # API 服務
│   │   ├── ai-assistant.ts # 🆕 AI 學習助手服務
│   │   ├── firebase.ts
│   │   └── game-service.ts
│   ├── lib/                # 工具函數
│   │   └── gemini.ts       # Gemini AI 整合
│   ├── hooks/              # 自定義 Hooks
│   ├── game-templates/     # 遊戲模板（AI 增強）
│   │   ├── matching-game.ts
│   │   └── sorting-game.ts
│   └── types/              # TypeScript 類型
├── public/                 # 靜態資源
├── prisma/                 # 資料庫架構
│   └── schema.prisma
├── AI_INTEGRATION_GUIDE.md # 🆕 AI 功能使用指南
└── tests/                  # 測試檔案
```

### 🎮 遊戲模板

#### 內建模板（AI 增強）

1. **配對遊戲** - 圖片、聲音、文字配對
   - ✨ AI 智能提示
   - 🎯 個人化鼓勵
   - 📊 學習進度分析

2. **排序遊戲** - 數字、大小、順序排列  
   - ✨ 適應性難度調整
   - 🎯 錯誤模式分析
   - 📊 能力評估報告

3. **故事冒險** - 選擇式互動故事（開發中）
4. **創意繪畫** - 繪畫和著色遊戲（開發中）

#### 創建新遊戲

使用改進的語音輸入介面：
- 直接在文字框輸入描述
- 或點擊麥克風按鈕語音輸入
- AI 會自動理解並生成合適的遊戲
- 🆕 可選擇啟用 AI 學習助手功能

```typescript
// 範例輸入
"我想做一個教孩子認識動物的配對遊戲，要有 AI 提示功能"
"製作數字 1-10 的排序練習，讓 AI 根據孩子表現調整難度"
"創建認識顏色的互動遊戲，需要個人化鼓勵"
```

### 🤖 AI 功能使用

#### 啟用 AI 學習助手

1. **家長控制面板**
   - 訪問 `/parent-control` 頁面
   - 設定 AI 功能開關
   - 查看使用統計和隱私說明

2. **遊戲中使用**
   - 浮動 AI 助手按鈕
   - 智能提示和鼓勵系統
   - 即時學習回饋

3. **隱私保護**
   - 所有數據本地處理
   - 可隨時關閉 AI 功能
   - 透明的使用報告

### 🛠️ 技術架構

- **前端框架**：Next.js 14 + TypeScript
- **遊戲引擎**：Phaser.js（未來整合 GDevelop）
- **AI 服務**：Google Gemini Pro 2.5
- **樣式**：Tailwind CSS + Radix UI
- **資料庫**：PostgreSQL + Prisma
- **認證**：NextAuth.js + Google OAuth
- **即時通訊**：Firebase Realtime Database
- **檔案儲存**：Firebase Storage
- **部署**：Vercel / Zeabur

### 🔧 開發指令

```bash
# 開發模式
npm run dev

# 建構生產版本
npm run build

# 啟動生產伺服器
npm start

# 執行測試
npm test

# 資料庫管理
npm run prisma:studio
npm run prisma:migrate

# 代碼檢查
npm run lint
```

### 🚀 部署

#### Vercel 部署（推薦）

1. Fork 這個 repository
2. 在 [Vercel](https://vercel.com) 導入專案
3. 設定環境變數（包含 Gemini API Key）
4. 部署！

#### Zeabur 部署

1. 在 [Zeabur](https://zeabur.com) 導入專案
2. 添加 PostgreSQL 服務
3. 設定環境變數
4. 部署！

詳細步驟請參考 [SETUP.md](SETUP.md)

### 📱 功能列表

#### 已完成 ✅
- [x] 改進的語音輸入介面
- [x] 基礎遊戲模板（配對、排序）
- [x] 使用者認證（Google OAuth）
- [x] 遊戲分享功能
- [x] 遊戲列表與搜尋
- [x] 響應式設計
- [x] **🆕 AI 學習助手系統**
- [x] **🆕 家長控制面板**
- [x] **🆕 智能提示與個人化鼓勵**
- [x] **🆕 隱私保護機制**

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

#### AI 功能隱私保護
- **本地處理**：所有 AI 分析在本地進行
- **數據最小化**：只收集必要的學習數據
- **透明度**：清楚說明 AI 如何使用數據
- **用戶控制**：完全控制 AI 功能開關
- **兒童保護**：符合兒童隱私保護標準

#### 家長控制功能
- **使用統計**：詳細的 AI 互動記錄
- **功能開關**：每個 AI 功能都可獨立控制
- **學習報告**：AI 生成的學習洞察報告
- **隱私設定**：自定義數據收集範圍

### 🤝 貢獻指南

歡迎貢獻！請先閱讀 [CONTRIBUTING.md](CONTRIBUTING.md)

我們特別需要：
- 🤖 AI 功能優化與新想法
- 🎮 遊戲模板開發
- 🌍 多語言翻譯
- 🐛 Bug 修復
- 📖 文檔改進

### 📄 授權

MIT License - 詳見 [LICENSE](LICENSE)

---

## English

### 🌟 Core Features

- 🎤 **Voice Creation**: Parents just speak their ideas, AI generates games
- 🤖 **AI Learning Assistant**: Smart hints, personalized encouragement, adaptive difficulty
- 👨‍👩‍👧‍👦 **Parent Control**: Complete AI control panel with privacy protection
- 🎨 **Open Source Game Engine**: Based on Phaser.js for smooth experience
- 👥 **Community Sharing**: Exchange ideas with other parents
- 💰 **Monetize Creativity**: Sell quality templates
- 🎮 **Multiple Game Templates**: Matching, sorting, story, drawing and more

### 🚀 Quick Start

See [SETUP.md](SETUP.md) for detailed setup instructions.

### 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Game Engine**: Phaser.js (GDevelop integration planned)
- **AI Service**: Google Gemini Pro 2.5
- **Styling**: Tailwind CSS + Radix UI
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js + Google OAuth
- **Real-time**: Firebase Realtime Database
- **Storage**: Firebase Storage
- **Deployment**: Vercel / Zeabur

### 📄 License

MIT License - see [LICENSE](LICENSE)

---

**讓每個父母都成為孩子的遊戲設計師，讓每個孩子都愛上 AI！** 🎮👨‍👩‍👧‍👦🤖

<p align="center">
  Made with ❤️ by the FA-Game Team
</p>