"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import * as Phaser from "phaser";
import { MatchingGameScene, defaultMatchingConfig } from "@/game-templates/matching-game";
import { SortingGameScene, defaultSortingConfig } from "@/game-templates/sorting-game";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Heart, Share2, Settings } from "lucide-react";
import Link from "next/link";
import { FloatingAIAssistant } from "@/components/ai/ai-assistant-panel";

export default function GamePlayPage() {
  const params = useParams();
  const gameRef = useRef<Phaser.Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState<any>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [showAISettings, setShowAISettings] = useState(false);
  const [aiSettings, setAISettings] = useState({
    enabled: false,
    smartHints: false,
    personalizedEncouragement: false
  });

  useEffect(() => {
    // Fetch game data
    fetchGameData();
    
    // 載入AI設定
    loadAISettings();
    
    return () => {
      // Cleanup Phaser game on unmount
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, [params.id]);

  const fetchGameData = async () => {
    try {
      const response = await fetch(`/api/games/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setGameData(data);
        initializeGame(data);
      }
    } catch (error) {
      console.error("Error fetching game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAISettings = () => {
    const saved = localStorage.getItem('ai-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setAISettings({
        enabled: settings.enabled || false,
        smartHints: settings.features?.smartHints || false,
        personalizedEncouragement: settings.features?.personalizedEncouragement || false
      });
    }
  };

  const initializeGame = (data: any) => {
    // Destroy existing game instance
    if (gameRef.current) {
      gameRef.current.destroy(true);
    }

    // Configure Phaser
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-game',
      width: 800,
      height: 600,
      backgroundColor: '#f0f0f0',
      scene: getSceneForTemplate(data.template, data.gameConfig),
    };

    // Create new game instance
    gameRef.current = new Phaser.Game(config);
  };

  const getSceneForTemplate = (template: string, config: any) => {
    // 添加AI增強配置（如果啟用）
    const enhancedConfig = {
      ...config,
      aiEnhanced: aiSettings.enabled ? {
        enabled: true,
        smartHints: aiSettings.smartHints,
        personalizedEncouragement: aiSettings.personalizedEncouragement,
        adaptiveDifficulty: false // 可以根據需要添加
      } : { enabled: false }
    };

    switch (template) {
      case 'matching':
        return new MatchingGameScene(enhancedConfig || {
          ...defaultMatchingConfig,
          aiEnhanced: enhancedConfig.aiEnhanced
        });
      case 'sorting':
        return new SortingGameScene(enhancedConfig || defaultSortingConfig);
      default:
        return new MatchingGameScene({
          ...defaultMatchingConfig,
          aiEnhanced: enhancedConfig.aiEnhanced
        });
    }
  };

  const handleLike = async () => {
    // Toggle like (would call API in production)
    setHasLiked(!hasLiked);
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: gameData?.title,
        text: `快來玩這個有趣的教育遊戲：${gameData?.title}`,
        url: window.location.href,
      });
    }
  };

  const toggleAISettings = () => {
    setShowAISettings(!showAISettings);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p>載入遊戲中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/games" className="flex items-center space-x-2">
            <ArrowLeft className="w-6 h-6" />
            <span className="text-lg">返回遊戲列表</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={hasLiked ? "text-red-500" : ""}
            >
              <Heart className={`w-6 h-6 ${hasLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-6 h-6" />
            </Button>
            {/* AI設定按鈕 */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleAISettings}
              title="AI助手設定"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* AI設定面板 */}
          {showAISettings && (
            <Card className="mb-6 p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-blue-800">🤖 AI學習助手設定</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleAISettings}
                  className="text-blue-600"
                >
                  收起
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ai-enabled"
                    checked={aiSettings.enabled}
                    onChange={(e) => {
                      const newSettings = { ...aiSettings, enabled: e.target.checked };
                      setAISettings(newSettings);
                      localStorage.setItem('ai-settings', JSON.stringify({
                        enabled: newSettings.enabled,
                        features: {
                          smartHints: newSettings.smartHints,
                          personalizedEncouragement: newSettings.personalizedEncouragement
                        }
                      }));
                    }}
                    className="rounded"
                  />
                  <label htmlFor="ai-enabled" className="text-blue-700">
                    啟用AI助手
                  </label>
                </div>
                
                {aiSettings.enabled && (
                  <>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="smart-hints"
                        checked={aiSettings.smartHints}
                        onChange={(e) => {
                          const newSettings = { ...aiSettings, smartHints: e.target.checked };
                          setAISettings(newSettings);
                          localStorage.setItem('ai-settings', JSON.stringify({
                            enabled: newSettings.enabled,
                            features: {
                              smartHints: newSettings.smartHints,
                              personalizedEncouragement: newSettings.personalizedEncouragement
                            }
                          }));
                        }}
                        className="rounded"
                      />
                      <label htmlFor="smart-hints" className="text-blue-700">
                        智能提示
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="personalized-encouragement"
                        checked={aiSettings.personalizedEncouragement}
                        onChange={(e) => {
                          const newSettings = { ...aiSettings, personalizedEncouragement: e.target.checked };
                          setAISettings(newSettings);
                          localStorage.setItem('ai-settings', JSON.stringify({
                            enabled: newSettings.enabled,
                            features: {
                              smartHints: newSettings.smartHints,
                              personalizedEncouragement: newSettings.personalizedEncouragement
                            }
                          }));
                        }}
                        className="rounded"
                      />
                      <label htmlFor="personalized-encouragement" className="text-blue-700">
                        個人化鼓勵
                      </label>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-3 text-xs text-blue-600">
                💡 更改設定後請重新開始遊戲以應用新設定
              </div>
            </Card>
          )}

          {/* Game Info */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {gameData?.title || "載入中..."}
            </h1>
            <p className="text-gray-600 mb-4">
              {gameData?.description}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>由 {gameData?.creatorName} 創建</span>
              <span>•</span>
              <span>適合 {gameData?.ageGroup} 歲</span>
              <span>•</span>
              <span>{gameData?.plays} 次遊玩</span>
              {/* AI狀態指示 */}
              {aiSettings.enabled && (
                <>
                  <span>•</span>
                  <span className="text-blue-600 font-medium">🤖 AI增強</span>
                </>
              )}
            </div>
          </div>

          {/* Game Container */}
          <Card className="overflow-hidden relative">
            <div id="phaser-game" className="flex justify-center items-center min-h-[600px] bg-gray-100">
              {/* Phaser will render here */}
            </div>
            
            {/* 浮動AI助手（如果啟用） */}
            {aiSettings.enabled && gameData && (
              <FloatingAIAssistant 
                gameType={gameData.template || 'matching'}
                gameState={{ 
                  difficulty: 1,
                  template: gameData.template 
                }}
              />
            )}
          </Card>

          {/* Game Controls */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => initializeGame(gameData)}
              className="mr-4"
            >
              <Play className="w-5 h-5 mr-2" />
              重新開始
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/create'}
            >
              創建我的遊戲
            </Button>
          </div>

          {/* Educational Goals */}
          {gameData?.educationalGoals && gameData.educationalGoals.length > 0 && (
            <Card className="mt-8 p-6">
              <h2 className="text-xl font-semibold mb-4">教育目標</h2>
              <ul className="space-y-2">
                {gameData.educationalGoals.map((goal: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* AI學習說明（如果啟用） */}
          {aiSettings.enabled && (
            <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">🤖 關於AI學習助手</h2>
              <div className="text-sm text-blue-700 space-y-2">
                <p>• AI助手會根據你的學習狀況提供個人化幫助</p>
                <p>• 所有數據僅用於改善學習體驗，不會分享給第三方</p>
                <p>• 你可以隨時在設定中關閉AI功能</p>
                <p>• AI建議僅供參考，學習的主導權始終在你手中</p>
              </div>
              <div className="mt-4">
                <Link href="/parent-control" className="text-blue-600 underline text-sm">
                  家長控制面板 →
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}