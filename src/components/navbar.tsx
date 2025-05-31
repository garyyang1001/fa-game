// src/components/navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sparkles, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-primary-500" />
          <span className="text-xl font-bold">FA-Game</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/games" className="text-gray-600 hover:text-gray-900">
            探索遊戲
          </Link>
          <Link href="/create" className="text-gray-600 hover:text-gray-900">
            創建遊戲
          </Link>
          <Link href="/parent-control" className="text-gray-600 hover:text-gray-900">
            家長控制
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || '用戶'}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                  <span className="hidden sm:block">
                    {user.displayName || '用戶'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    個人資料
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-games" className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    我的遊戲
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="flex items-center text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  登出
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">登入</Link>
              </Button>
              <Button asChild>
                <Link href="/register">註冊</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}