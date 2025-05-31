# 🧹 Prisma 清理指南 & Firebase Firestore 遷移

## 🎯 為什麼移除 Prisma？

如果你使用 **Firebase** 作為後端解決方案，Prisma 是多餘的，因為：
- ✅ **Firebase Firestore** 已經提供了 NoSQL 數據庫
- ✅ **Firebase Auth** 已經處理用戶認證
- ✅ **Firebase Storage** 可以處理文件存儲
- ✅ **Firebase Functions** 可以處理伺服器邏輯

## 🗂️ 需要手動清理的文件

請手動刪除以下文件和文件夾：

```bash
# 刪除 Prisma 文件夾
rm -rf prisma/

# 如果有以下文件也要刪除
rm -f prisma.schema
```

## 🔥 使用 Firebase Firestore 替代

### 1️⃣ **安裝和配置**
你的 Firebase 已經配置好了！在 `src/services/firebase.ts` 中：

```typescript
import { getFirestore } from 'firebase/firestore';
export const db = getFirestore(app); // 已經配置好了
```

### 2️⃣ **數據結構設計**

**Firestore 集合結構**（替代 Prisma models）：

```
fa-game/
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── name: string
│       ├── image: string
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
├── games/
│   └── {gameId}/
│       ├── title: string
│       ├── description: string
│       ├── template: string
│       ├── ageGroup: string
│       ├── educationalGoals: array
│       ├── gameConfig: object
│       ├── thumbnail: string
│       ├── isPublic: boolean
│       ├── tags: array
│       ├── creatorId: string
│       ├── likes: number
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
├── gameSessions/
│   └── {sessionId}/
│       ├── gameId: string
│       ├── playerId: string
│       ├── startedAt: timestamp
│       ├── completedAt: timestamp
│       ├── score: number
│       └── progress: object
├── templates/
│   └── {templateId}/
│       ├── name: string
│       ├── description: string
│       ├── category: string
│       ├── baseConfig: object
│       ├── price: number
│       ├── isPremium: boolean
│       ├── creatorId: string
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
└── likes/
    └── {likeId}/
        ├── gameId: string
        ├── userId: string
        └── createdAt: timestamp
```

### 3️⃣ **基本 Firestore 操作範例**

創建一個數據服務文件 `src/services/firestore.ts`：

```typescript
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// 遊戲相關操作
export const gameService = {
  // 創建遊戲
  async createGame(gameData: any) {
    const docRef = await addDoc(collection(db, 'games'), {
      ...gameData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // 獲取所有公開遊戲
  async getPublicGames() {
    const q = query(
      collection(db, 'games'), 
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // 獲取用戶的遊戲
  async getUserGames(userId: string) {
    const q = query(
      collection(db, 'games'), 
      where('creatorId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // 更新遊戲
  async updateGame(gameId: string, updateData: any) {
    const gameRef = doc(db, 'games', gameId);
    await updateDoc(gameRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
  },

  // 刪除遊戲
  async deleteGame(gameId: string) {
    await deleteDoc(doc(db, 'games', gameId));
  }
};

// 用戶相關操作
export const userService = {
  // 創建或更新用戶資料
  async createOrUpdateUser(userId: string, userData: any) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
  },

  // 獲取用戶資料
  async getUser(userId: string) {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  }
};
```

### 4️⃣ **在組件中使用**

```typescript
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
      });
      console.log('遊戲創建成功:', gameId);
    } catch (error) {
      console.error('創建遊戲失敗:', error);
    }
  };

  // ...
}
```

## ✅ **清理完成檢查**

確認以下步驟都完成了：

- [ ] 刪除 `prisma/` 文件夾
- [ ] 確認 `package.json` 中沒有 `@prisma/client` 和 `prisma`
- [ ] 確認沒有 `postinstall` 腳本執行 `prisma generate`
- [ ] 設定 `.env.local` 只包含 Firebase 配置
- [ ] 使用 Firestore 替代 Prisma 進行數據操作

## 🚀 **現在你可以**

1. **重新部署** - 構建應該會成功！
2. **使用 Firestore** - 比 Prisma 更適合 Firebase 生態系統
3. **享受無伺服器** - 完全的 Firebase 解決方案

**你的專案現在是純 Firebase 架構** 🎉