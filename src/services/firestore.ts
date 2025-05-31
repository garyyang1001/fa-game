// src/services/firestore.ts
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
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

// 遊戲相關操作
export const gameService = {
  // 創建遊戲
  async createGame(gameData: any) {
    const docRef = await addDoc(collection(db, 'games'), {
      ...gameData,
      likes: 0,
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
      where('creatorId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // 獲取單個遊戲
  async getGame(gameId: string) {
    const gameRef = doc(db, 'games', gameId);
    const gameSnap = await getDoc(gameRef);
    return gameSnap.exists() ? { id: gameSnap.id, ...gameSnap.data() } : null;
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
  },

  // 按分類獲取遊戲
  async getGamesByCategory(ageGroup: string) {
    const q = query(
      collection(db, 'games'),
      where('isPublic', '==', true),
      where('ageGroup', '==', ageGroup),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};

// 用戶相關操作
export const userService = {
  // 創建或更新用戶資料
  async createOrUpdateUser(userId: string, userData: any) {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // 更新現有用戶
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      });
    } else {
      // 創建新用戶
      await updateDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  },

  // 獲取用戶資料
  async getUser(userId: string) {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } : null;
  }
};

// 遊戲會話相關操作
export const sessionService = {
  // 開始遊戲會話
  async startGameSession(gameId: string, playerId: string) {
    const docRef = await addDoc(collection(db, 'gameSessions'), {
      gameId,
      playerId,
      startedAt: serverTimestamp(),
      progress: {},
    });
    return docRef.id;
  },

  // 更新遊戲進度
  async updateGameProgress(sessionId: string, progress: any, score?: number) {
    const sessionRef = doc(db, 'gameSessions', sessionId);
    const updateData: any = {
      progress,
      updatedAt: serverTimestamp(),
    };
    
    if (score !== undefined) {
      updateData.score = score;
    }
    
    await updateDoc(sessionRef, updateData);
  },

  // 完成遊戲會話
  async completeGameSession(sessionId: string, finalScore: number) {
    const sessionRef = doc(db, 'gameSessions', sessionId);
    await updateDoc(sessionRef, {
      completedAt: serverTimestamp(),
      score: finalScore,
    });
  },

  // 獲取用戶的遊戲會話
  async getUserSessions(playerId: string) {
    const q = query(
      collection(db, 'gameSessions'),
      where('playerId', '==', playerId),
      orderBy('startedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};

// 點讚相關操作
export const likeService = {
  // 點讚遊戲
  async likeGame(gameId: string, userId: string) {
    // 檢查是否已經點讚
    const q = query(
      collection(db, 'likes'),
      where('gameId', '==', gameId),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // 添加點讚記錄
      await addDoc(collection(db, 'likes'), {
        gameId,
        userId,
        createdAt: serverTimestamp(),
      });
      
      // 增加遊戲的點讚數
      const gameRef = doc(db, 'games', gameId);
      await updateDoc(gameRef, {
        likes: increment(1)
      });
      
      return true;
    }
    return false; // 已經點讚過了
  },

  // 取消點讚
  async unlikeGame(gameId: string, userId: string) {
    const q = query(
      collection(db, 'likes'),
      where('gameId', '==', gameId),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // 刪除點讚記錄
      const likeDoc = querySnapshot.docs[0];
      await deleteDoc(likeDoc.ref);
      
      // 減少遊戲的點讚數
      const gameRef = doc(db, 'games', gameId);
      await updateDoc(gameRef, {
        likes: increment(-1)
      });
      
      return true;
    }
    return false; // 沒有點讚記錄
  },

  // 檢查用戶是否已點讚
  async checkUserLike(gameId: string, userId: string) {
    const q = query(
      collection(db, 'likes'),
      where('gameId', '==', gameId),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
};

// 模板相關操作
export const templateService = {
  // 創建模板
  async createTemplate(templateData: any) {
    const docRef = await addDoc(collection(db, 'templates'), {
      ...templateData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // 獲取所有模板
  async getTemplates() {
    const q = query(
      collection(db, 'templates'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // 獲取免費模板
  async getFreeTemplates() {
    const q = query(
      collection(db, 'templates'),
      where('isPremium', '==', false),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // 按分類獲取模板
  async getTemplatesByCategory(category: string) {
    const q = query(
      collection(db, 'templates'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};
