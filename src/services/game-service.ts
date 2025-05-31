import { db, storage } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Game } from '@/types/game';

export class GameService {
  static async createGame(gameData: Partial<Game>): Promise<string> {
    try {
      const gameRef = doc(collection(db, 'games'));
      const game = {
        ...gameData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likes: 0,
        plays: 0,
      };
      
      await setDoc(gameRef, game);
      return gameRef.id;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  }

  static async getGame(gameId: string): Promise<Game | null> {
    try {
      const gameDoc = await getDoc(doc(db, 'games', gameId));
      if (gameDoc.exists()) {
        return { id: gameDoc.id, ...gameDoc.data() } as Game;
      }
      return null;
    } catch (error) {
      console.error('Error getting game:', error);
      throw error;
    }
  }

  static async getPopularGames(limitCount: number = 10): Promise<Game[]> {
    try {
      const gamesQuery = query(
        collection(db, 'games'),
        where('isPublic', '==', true),
        orderBy('plays', 'desc'),
        limit(limitCount)
      );
      
      const snapshot = await getDocs(gamesQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Game));
    } catch (error) {
      console.error('Error getting popular games:', error);
      throw error;
    }
  }

  static async uploadGameThumbnail(gameId: string, file: File): Promise<string> {
    try {
      const storageRef = ref(storage, `games/${gameId}/thumbnail`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update game with thumbnail URL
      await updateDoc(doc(db, 'games', gameId), {
        thumbnail: downloadURL,
        updatedAt: serverTimestamp(),
      });
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      throw error;
    }
  }

  static async incrementPlays(gameId: string): Promise<void> {
    try {
      const gameRef = doc(db, 'games', gameId);
      const gameDoc = await getDoc(gameRef);
      
      if (gameDoc.exists()) {
        const currentPlays = gameDoc.data().plays || 0;
        await updateDoc(gameRef, {
          plays: currentPlays + 1,
        });
      }
    } catch (error) {
      console.error('Error incrementing plays:', error);
      throw error;
    }
  }

  static async toggleLike(gameId: string, userId: string): Promise<boolean> {
    try {
      const likeRef = doc(db, 'likes', `${gameId}_${userId}`);
      const likeDoc = await getDoc(likeRef);
      
      if (likeDoc.exists()) {
        // Unlike
        await deleteDoc(likeRef);
        await this.updateLikeCount(gameId, -1);
        return false;
      } else {
        // Like
        await setDoc(likeRef, {
          gameId,
          userId,
          createdAt: serverTimestamp(),
        });
        await this.updateLikeCount(gameId, 1);
        return true;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }

  private static async updateLikeCount(gameId: string, delta: number): Promise<void> {
    const gameRef = doc(db, 'games', gameId);
    const gameDoc = await getDoc(gameRef);
    
    if (gameDoc.exists()) {
      const currentLikes = gameDoc.data().likes || 0;
      await updateDoc(gameRef, {
        likes: Math.max(0, currentLikes + delta),
      });
    }
  }
}