# FA-Game 🎮

一個讓父母用語音就能創建教育遊戲的社交平台，專為 3-8 歲兒童設計。

[English](#english) | [中文](#中文)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Phaser-3.80-orange" alt="Phaser">
  <img src="https://img.shields.io/badge/Gemini_Pro-2.5-green" alt="Gemini">
  <img src="https://img.shields.io/badge/Status-Beta-yellow" alt="Status">
</p>

## 📚 重要文檔

- 📋 [開發規劃書](ROADMAP.md) - 詳細的技術架構演進路線圖
- 🚀 [快速設置指南](SETUP.md) - 5分鐘內啟動專案
- 🤝 [貢獻指南](CONTRIBUTING.md) - 如何參與開發

## 中文

### 🌟 核心特色

- 🎤 **語音創建**：父母只需說出想法，AI 自動生成遊戲
- 🤖 **Gemini Pro 2.5**：強大的 AI 助手，理解並實現創意
- 🎨 **開源遊戲引擎**：基於 Phaser.js，確保流暢體驗
- 👥 **社群分享**：與其他父母交流創意
- 💰 **創意變現**：優質模板可以販售
- 🎮 **多種遊戲模板**：配對、排序、故事、繪畫等

### 💡 最新更新

- ✨ **改進的語音輸入 UI**：文字輸入框 + 麥克風按鈕的直觀設計
- 📱 **響應式設計**：完美支援手機和平板
- 🚀 **Phase 1 MVP**：基礎功能已完成，正在收集用戶反饋

### 🎯 使用場景

1. **家長**：為孩子快速創建個性化教育遊戲
2. **教師**：製作符合課程的互動教材
3. **內容創作者**：設計並銷售優質遊戲模板

### 🚀 快速開始

#### 環境需求

- Node.js 18+
- npm 或 yarn
- PostgreSQL 資料庫
- Gemini API Key
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

編輯 `.env.local` 並填入您的 API keys（詳見 [SETUP.md](SETUP.md)）

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
│   │   └── login/           # 登入頁面
│   ├── components/          # React 組件
│   │   ├── ui/             # UI 基礎組件
│   │   └── ...             # 業務組件
│   ├── lib/                # 工具函數
│   │   └── gemini.ts       # Gemini AI 整合
│   ├── hooks/              # 自定義 Hooks
│   ├── game-templates/     # 遊戲模板
│   │   ├── matching-game.ts
│   │   └── sorting-game.ts
│   ├── services/           # API 服務
│   │   ├── firebase.ts
│   │   └── game-service.ts
│   └── types/              # TypeScript 類型
├── public/                 # 靜態資源
├── prisma/                 # 資料庫架構
│   └── schema.prisma
└── tests/                  # 測試檔案
```

### 🎮 遊戲模板

#### 內建模板

1. **配對遊戲** - 圖片、聲音、文字配對
2. **排序遊戲** - 數字、大小、順序排列  
3. **故事冒險** - 選擇式互動故事（開發中）
4. **創意繪畫** - 繪畫和著色遊戲（開發中）

#### 創建新遊戲

使用改進的語音輸入介面：
- 直接在文字框輸入描述
- 或點擊麥克風按鈕語音輸入
- AI 會自動理解並生成合適的遊戲

```typescript
// 範例輸入
"我想做一個教孩子認識動物的配對遊戲"
"製作數字 1-10 的排序練習"
"創建認識顏色的互動遊戲"
```

### 🛠️ 技術架構

- **前端框架**：Next.js 14 + TypeScript
- **遊戲引擎**：Phaser.js（未來整合 GDevelop）
- **AI 服務**：Google Gemini Pro 2.5
- **樣式**：Tailwind CSS + Radix UI
- **資料庫**：PostgreSQL + Prisma
- **認證**：NextAuth.js + Google OAuth
- **即時通訊**：Firebase Realtime Database
- **檔案儲存**：Firebase Storage
- **部署**：Vercel

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

#### 開發中 🚧
- [ ] 社群互動功能
- [ ] 模板市集
- [ ] 遊戲數據分析
- [ ] 更多遊戲模板

#### 計劃中 📋
- [ ] GDevelop 整合
- [ ] 多語言支援
- [ ] 手機 App 版本
- [ ] AI 模型優化

### 🤝 貢獻指南

歡迎貢獻！請先閱讀 [CONTRIBUTING.md](CONTRIBUTING.md)

我們特別需要：
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
- 🤖 **Gemini Pro 2.5**: Powerful AI assistant to understand and realize creativity
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
- **Deployment**: Vercel

### 📄 License

MIT License - see [LICENSE](LICENSE)

---

**讓每個父母都成為孩子的遊戲設計師！** 🎮👨‍👩‍👧‍👦

<p align="center">
  Made with ❤️ by the FA-Game Team
</p>