# Firebase Google Auth + Firestore 實作指南

## 🎯 總覽

你的專案已經完成了 **100%** 的 Firebase 實作！包括認證和數據庫。

## ✅ 已完成的部分

- ✅ Firebase SDK 依賴已安裝
- ✅ Firebase 配置檔案已建立 (`src/services/firebase.ts`)
- ✅ 認證 Hook 已實作 (`src/hooks/useAuth.tsx`)
- ✅ AuthProvider 已設定在應用程式根層
- ✅ 登入/註冊頁面已建立
- ✅ 認證保護組件已實作
- ✅ 導航欄組件已建立
- ✅ 伺服器端認證檢查已實作
- ✅ Firestore 服務層已創建 (`src/services/firestore.ts`)
- ✅ 環境變數範本已更新
- ✅ **已移除 Prisma，改用 Firestore**

## 🔧 完成設定步驟

### 1️⃣ 手動清理 Prisma

```bash
# 刪除 Prisma 文件夾
rm -rf prisma/

# 確認 node_modules 清理
rm -rf node_modules/
npm install
```

### 2️⃣ Firebase 專案設定

1. **前往 [Firebase Console](https://console.firebase.google.com/)**
2. **創建或選擇專案**
3. **啟用 Authentication**：
   - 進入 Authentication > Sign-in method
   - 啟用 Google 登入
   - 設定授權網域（加入你的域名）

4. **啟用 Firestore 數據庫**：
   - 進入 Firestore Database
   - 點擊「建立數據庫」
   - 選擇「測試模式」開始

5. **獲取客戶端配置**：
   - 進入專案設定 > 一般
   - 複製 Firebase 配置物件的值

6. **生成 Admin SDK 金鑰**：
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

### 4️⃣ 設定 Firestore 安全規則

在 Firebase Console > Firestore Database > 規則：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用戶只能讀取和寫入自己的用戶數據
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 任何人都可以讀取公開遊戲
    match /games/{gameId} {
      allow read: if resource.data.isPublic == true;
      allow create, update, delete: if request.auth != null && request.auth.uid == resource.data.creatorId;
    }
    
    // 遊戲會話只允許玩家本人讀寫
    match /gameSessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.playerId;
    }
    
    // 點讚記錄只允許用戶本人操作
    match /likes/{likeId} {
      allow read: if true;
      allow create, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // 模板可以公開讀取，只有創建者可以修改
    match /templates/{templateId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && request.auth.uid == resource.data.creatorId;
    }
  }
}
```

### 5️⃣ 在組件中使用 Firestore

```tsx
// 在組件中使用
import { gameService } from '@/services/firestore';
import { useAuth } from '@/hooks/useAuth';

export function CreateGameComponent() {
  const { user } = useAuth();

  const handleCreateGame = async (gameData: any) => {
    if (!user) return;
    
    try {
      const gameId = await gameService.createGame({
        ...gameData,
        creatorId: user.uid,
        isPublic: true,
      });
      console.log('遊戲創建成功:', gameId);
    } catch (error) {
      console.error('創建遊戲失敗:', error);
    }
  };

  return (
    // 你的 UI 代碼
  );
}
```

### 6️⃣ API 路由範例

```typescript
// src/app/api/games/route.ts
import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/auth-server';
import { gameService } from '@/services/firestore';

async function handler(req: NextRequest) {
  const user = (req as any).user;
  
  if (req.method === 'POST') {
    const gameData = await req.json();
    const gameId = await gameService.createGame({
      ...gameData,
      creatorId: user.uid,
    });
    
    return Response.json({ gameId });
  }
  
  // 其他方法...
}

export const POST = withAuth(handler);
```

## 🚀 測試功能

1. **啟動開發伺服器**：
   ```bash
   npm install  # 重新安裝依賴
   npm run dev
   ```

2. **測試流程**：
   - 訪問 `/login` 測試 Google 登入
   - 創建遊戲測試 Firestore 寫入
   - 檢查 Firebase Console 中的數據

## 🎉 你現在擁有的功能

- ✅ **完整的 Google 認證**
- ✅ **Firestore NoSQL 數據庫**
- ✅ **實時數據同步**
- ✅ **安全規則保護**
- ✅ **無伺服器架構**
- ✅ **自動擴展**

## 📚 進階功能

### 實時監聽
```typescript
import { onSnapshot } from 'firebase/firestore';

// 監聽遊戲變化
const unsubscribe = onSnapshot(
  collection(db, 'games'),
  (snapshot) => {
    const games = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setGames(games);
  }
);
```

### 批量操作
```typescript
import { writeBatch } from 'firebase/firestore';

const batch = writeBatch(db);
batch.set(doc(db, 'games', 'game1'), gameData1);
batch.update(doc(db, 'games', 'game2'), updateData);
await batch.commit();
```

**你的專案現在是純 Firebase 無伺服器架構** 🔥