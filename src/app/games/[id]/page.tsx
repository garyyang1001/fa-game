"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import * as Phaser from "phaser";
import { MatchingGameScene, defaultMatchingConfig } from "@/game-templates/matching-game";
import { SortingGameScene, defaultSortingConfig } from "@/game-templates/sorting-game";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Heart, Share2 } from "lucide-react";
import Link from "next/link";

export default function GamePlayPage() {
  const params = useParams();
  const gameRef = useRef<Phaser.Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState<any>(null);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Fetch game data
    fetchGameData();
    
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
    switch (template) {
      case 'matching':
        return new MatchingGameScene(config || defaultMatchingConfig);
      case 'sorting':
        return new SortingGameScene(config || defaultSortingConfig);
      default:
        return new MatchingGameScene(defaultMatchingConfig);
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
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
            </div>
          </div>

          {/* Game Container */}
          <Card className="overflow-hidden">
            <div id="phaser-game" className="flex justify-center items-center min-h-[600px] bg-gray-100">
              {/* Phaser will render here */}
            </div>
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
        </div>
      </div>
    </div>
  );
}