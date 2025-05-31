# Firebase Google Auth 實作指南

## 🎯 總覽

你的專案已經完成了 **90%** 的 Firebase Google Auth 實作！以下是完整的設定步驟。

## ✅ 已完成的部分

- ✅ Firebase SDK 依賴已安裝
- ✅ Firebase 配置檔案已建立 (`src/services/firebase.ts`)
- ✅ 認證 Hook 已實作 (`src/hooks/useAuth.tsx`)
- ✅ AuthProvider 已設定在應用程式根層
- ✅ 登入/註冊頁面已建立
- ✅ 認證保護組件已實作
- ✅ 導航欄組件已建立
- ✅ 伺服器端認證檢查已實作
- ✅ 環境變數範本已更新

## 🔧 完成設定步驟

### 1️⃣ 安裝新依賴

```bash
npm install firebase-admin@^12.1.0
```

### 2️⃣ Firebase 專案設定

1. **前往 [Firebase Console](https://console.firebase.google.com/)**
2. **創建或選擇專案**
3. **啟用 Authentication**：
   - 進入 Authentication > Sign-in method
   - 啟用 Google 登入
   - 設定授權網域（加入你的域名）

4. **獲取客戶端配置**：
   - 進入專案設定 > 一般
   - 複製 Firebase 配置物件的值

5. **生成 Admin SDK 金鑰**：
   - 進入專案設定 > 服務帳戶
   - 點擊「生成新的私鑰」
   - 下載 JSON 檔案

### 3️⃣ 環境變數設定

複製 `.env.local.example` 為 `.env.local` 並填入：

```env
# Firebase 客戶端配置
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK（從下載的 JSON 檔案中獲取）
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n你的私鑰內容\n-----END PRIVATE KEY-----\n"
```

### 4️⃣ 添加導航欄到主頁面

更新你需要的頁面，例如首頁：

```tsx
import { Navbar } from '@/components/navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* 你的頁面內容 */}
    </>
  );
}
```

### 5️⃣ 保護需要認證的路由

對於需要登入的頁面，使用 `ProtectedRoute`：

```tsx
import { ProtectedRoute } from '@/components/protected-route';

export default function CreatePage() {
  return (
    <ProtectedRoute>
      {/* 你的頁面內容 */}
    </ProtectedRoute>
  );
}
```

### 6️⃣ API 路由認證（可選）

對於需要認證的 API 路由：

```tsx
// src/app/api/games/route.ts
import { withAuth } from '@/lib/auth-server';

async function handler(req: NextRequest) {
  const user = (req as any).user; // 認證用戶資訊
  // 你的 API 邏輯
}

export const POST = withAuth(handler);
```

## 🚀 測試功能

1. **啟動開發伺服器**：
   ```bash
   npm run dev
   ```

2. **測試流程**：
   - 訪問 `/login` 測試 Google 登入
   - 訪問 `/create` 測試認證保護
   - 檢查導航欄的用戶狀態顯示

## 🔍 常見問題

### Q: Google 登入失敗？
- 檢查 Firebase Console 中的授權網域設定
- 確認環境變數填寫正確
- 檢查 Google OAuth 同意畫面設定

### Q: 伺服器端認證失敗？
- 確認 Firebase Admin SDK 環境變數正確
- 檢查私鑰格式（包含 \\n 換行符號）
- 確認服務帳戶權限

### Q: 用戶狀態不持久？
- Firebase 會自動處理 token 刷新
- 檢查 useAuth hook 的 onAuthStateChanged 監聽

## 📝 下一步優化

1. **錯誤處理**：添加更詳細的錯誤訊息
2. **載入狀態**：優化認證載入體驗
3. **用戶資料**：整合 Firestore 儲存用戶資料
4. **權限系統**：實作角色權限管理

## 🎉 完成！

你的 Firebase Google Auth 已經完全設定好了！現在用戶可以：
- 使用 Google 帳戶登入/註冊
- 訪問受保護的頁面
- 在導航欄看到登入狀態
- 安全地登出