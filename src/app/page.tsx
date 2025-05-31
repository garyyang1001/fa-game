"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Play, Share2, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceRecorder } from "@/components/voice-recorder";
import { GameShowcase } from "@/components/game-showcase";
import Link from "next/link";

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-bold text-gray-800">FA-Game</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/games">
              <Button variant="ghost">遊戲廣場</Button>
            </Link>
            <Link href="/create">
              <Button variant="ghost">創建遊戲</Button>
            </Link>
            <Link href="/login">
              <Button>登入</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            用語音為孩子
            <span className="text-primary-500">創造遊戲</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            父母說出想法，AI 自動生成教育遊戲
            <br />
            專為 3-8 歲兒童設計的創意平台
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <VoiceRecorder />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow">
              <Mic className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">語音創建</h3>
              <p className="text-gray-600">
                只需說出您的想法，AI 就能理解並創建適合的教育遊戲
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow">
              <Share2 className="w-12 h-12 text-secondary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">社群分享</h3>
              <p className="text-gray-600">
                與其他父母分享創意，探索豐富的遊戲模板庫
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow">
              <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">創意變現</h3>
              <p className="text-gray-600">
                優質遊戲模板可以出售，讓您的創意產生價值
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Game Showcase */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">熱門遊戲</h2>
        <GameShowcase />
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            開始為您的孩子創造專屬遊戲
          </h2>
          <p className="text-white/90 mb-8">
            加入我們，成為創意父母社群的一員
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              免費開始
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}