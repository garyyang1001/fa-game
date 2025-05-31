// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 公開路徑（不需要登入）
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/api/auth',
];

// 需要登入的路徑
const protectedPaths = [
  '/create',
  '/parent-control',
  '/api/games', // POST, PUT, DELETE 需要驗證
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 檢查是否是公開路徑
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // 檢查是否是需要保護的路徑
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // 如果是 API 路由且是 GET 請求，允許訪問
  if (pathname.startsWith('/api/games') && request.method === 'GET') {
    return NextResponse.next();
  }

  // 由於 middleware 無法直接檢查 Firebase Auth 狀態
  // 我們將在客戶端組件中處理認證檢查
  // 這裡只做基本的路由配置
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};