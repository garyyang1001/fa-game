"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, Heart, TrendingUp, Settings, X } from 'lucide-react';
import { AILearningAssistant } from '@/services/ai-assistant';

interface AIAssistantPanelProps {
  gameType: string;
  gameState?: any;
  playerProgress?: any;
  onClose?: () => void;
  className?: string;
}

export function AIAssistantPanel({ 
  gameType, 
  gameState, 
  playerProgress,
  onClose,
  className = "" 
}: AIAssistantPanelProps) {
  const [aiAssistant] = useState(() => new AILearningAssistant());
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [encouragement, setEncouragement] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 檢查AI是否可用
    setIsEnabled(aiAssistant.isAvailable());
  }, [aiAssistant]);

  const requestHint = async () => {
    if (!isEnabled) return;
    
    setIsLoading(true);
    try {
      const hint = await aiAssistant.generateHint({
        gameType,
        difficulty: gameState?.difficulty || 1,
        currentProgress: gameState,
        mistakeHistory: playerProgress?.mistakes || []
      });
      
      if (hint) {
        setCurrentHint(hint.content);
      }
    } catch (error) {
      console.error('Failed to get hint:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEncouragement = async () => {
    if (!isEnabled) return;
    
    try {
      const response = await aiAssistant.generateEncouragement({
        gameType,
        difficulty: gameState?.difficulty || 1,
        playerAge: playerProgress?.age,
        currentProgress: gameState,
        mistakeHistory: []
      });
      
      if (response) {
        setEncouragement(response.content);
        // 自動清除鼓勵話語
        setTimeout(() => setEncouragement(null), 3000);
      }
    } catch (error) {
      console.error('Failed to get encouragement:', error);
    }
  };

  // 如果AI不可用，不渲染組件
  if (!isEnabled) {
    return null;
  }

  return (
    <Card className={`ai-assistant-panel ${className}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            🤖
          </div>
          <span className="font-medium text-sm">學習小助手</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* 鼓勵話語顯示 */}
        {encouragement && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-green-600 font-medium">{encouragement}</div>
            <div className="text-xs text-green-500 mt-1">來自AI小助手的鼓勵</div>
          </div>
        )}

        {/* 提示顯示 */}
        {currentHint && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm text-blue-800">{currentHint}</div>
                <div className="text-xs text-blue-600 mt-1">AI提示</div>
              </div>
            </div>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={requestHint}
            disabled={isLoading}
            className="text-xs"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            {isLoading ? '思考中...' : '要提示'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={getEncouragement}
            className="text-xs"
          >
            <Heart className="w-3 h-3 mr-1" />
            鼓勵我
          </Button>
        </div>

        {/* AI說明 */}
        <div className="text-xs text-gray-500 text-center border-t pt-2">
          AI助手會根據你的學習狀況提供個人化幫助
        </div>
      </div>
    </Card>
  );
}

// 簡化版的浮動AI助手
export function FloatingAIAssistant({ 
  gameType, 
  gameState 
}: { 
  gameType: string; 
  gameState?: any; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [aiAssistant] = useState(() => new AILearningAssistant());

  // 檢查AI是否啟用
  if (!aiAssistant.isAvailable()) {
    return null;
  }

  return (
    <>
      {/* 浮動按鈕 */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
        >
          🤖
        </Button>
      </div>

      {/* 展開的面板 */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80">
          <AIAssistantPanel
            gameType={gameType}
            gameState={gameState}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
}

// AI進度分析組件
export function AIProgressAnalysis({ 
  playerData 
}: { 
  playerData: any 
}) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [aiAssistant] = useState(() => new AILearningAssistant());

  useEffect(() => {
    if (aiAssistant.isAvailable() && playerData) {
      aiAssistant.analyzeProgress(playerData).then(setAnalysis);
    }
  }, [playerData, aiAssistant]);

  if (!analysis) {
    return null;
  }

  return (
    <Card className="ai-progress-analysis">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium">AI學習分析</h3>
        </div>

        <div className="space-y-4">
          {/* 優勢 */}
          <div>
            <h4 className="text-sm font-medium text-green-600 mb-2">學習優勢</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.strengths.map((strength: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* 建議 */}
          <div>
            <h4 className="text-sm font-medium text-blue-600 mb-2">AI建議</h4>
            <ul className="space-y-1">
              {analysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-xs text-gray-600 flex items-start">
                  <span className="text-blue-500 mr-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4 pt-2 border-t">
          ✨ 由AI分析生成，建議僅供參考
        </div>
      </div>
    </Card>
  );
}