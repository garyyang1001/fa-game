"use client";

import { useState } from "react";
import { ArrowLeft, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceCreator } from "@/components/voice-creator";
import { GameTemplates } from "@/components/game-templates";
import { GamePreview } from "@/components/game-preview";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/protected-route";

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [gameData, setGameData] = useState<any>(null);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg">返回首頁</span>
            </Link>
            <h1 className="text-2xl font-bold">創建遊戲</h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </nav>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Creation Tools */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <Wand2 className="w-6 h-6 text-primary-500 mr-2" />
                  <h2 className="text-xl font-semibold">創建工具</h2>
                </div>

                {/* Voice Creator */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">語音創建</h3>
                  <VoiceCreator
                    onGameCreated={(data) => {
                      setGameData(data);
                      setSelectedTemplate(data.template);
                    }}
                  />
                </div>

                {/* Template Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-4">或選擇模板</h3>
                  <GameTemplates
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={setSelectedTemplate}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Right Panel - Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 h-full">
                <h2 className="text-xl font-semibold mb-6">遊戲預覽</h2>
                {selectedTemplate || gameData ? (
                  <GamePreview
                    template={selectedTemplate}
                    gameData={gameData}
                  />
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-gray-400">
                    <p>選擇模板或使用語音創建遊戲</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Action Buttons */}
          {(selectedTemplate || gameData) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex justify-center space-x-4"
            >
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTemplate(null);
                  setGameData(null);
                }}
              >
                重新開始
              </Button>
              <Button>
                保存並分享
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}