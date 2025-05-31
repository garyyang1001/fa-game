// src/lib/auth-server.ts
import { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// 初始化 Firebase Admin SDK
if (!getApps().length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    // 從 Authorization header 或 cookies 中獲取 ID Token
    const authHeader = request.headers.get('authorization');
    const idToken = authHeader?.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : request.cookies.get('auth-token')?.value;

    if (!idToken) {
      return null;
    }

    // 檢查 Firebase Admin SDK 是否已初始化
    if (!getApps().length) {
      console.warn('Firebase Admin SDK not initialized - missing environment variables');
      return null;
    }

    // 驗證 ID Token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    return {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      displayName: decodedToken.name || null,
      photoURL: decodedToken.picture || null,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// 用於 API 路由的認證中間件
export function withAuth(handler: Function) {
  return async (req: NextRequest, ...args: any[]) => {
    const user = await getCurrentUser(req);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 將用戶資訊添加到請求中
    (req as any).user = user;
    return handler(req, ...args);
  };
}