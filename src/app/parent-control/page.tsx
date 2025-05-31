"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  TrendingUp, 
  Settings, 
  Eye, 
  Heart,
  Brain,
  Clock,
  Award
} from 'lucide-react';
import { AILearningAssistant } from '@/services/ai-assistant';

interface AIUsageStats {
  hintsRequested: number;
  encouragementsGiven: number;
  difficultyAdjustments: number;
  totalInteractions: number;
  averageSessionTime: number;
  learningGains: number;
}

interface ParentDashboardData {
  childName: string;
  totalGamesPlayed: number;
  favoriteGameType: string;
  weeklyProgress: number;
  aiUsageStats: AIUsageStats;
  learningInsights: string[];
}

export default function ParentControlPage() {
  const [aiAssistant] = useState(() => new AILearningAssistant());
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiFeatures, setAiFeatures] = useState({
    smartHints: false,
    adaptiveDifficulty: false,
    progressAnalysis: true,
    contentGeneration: false
  });
  const [dashboardData, setDashboardData] = useState<ParentDashboardData | null>(null);
  const [showAIExplanation, setShowAIExplanation] = useState(false);

  useEffect(() => {
    // 載入現有配置
    loadAISettings();
    loadDashboardData();
  }, []);

  const loadAISettings = () => {
    // 從localStorage載入設定（實際應用中應該從用戶設定載入）
    const saved = localStorage.getItem('ai-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setAiEnabled(settings.enabled || false);
      setAiFeatures(settings.features || aiFeatures);
    }
  };

  const loadDashboardData = () => {
    // 模擬數據（實際應用中從API載入）
    setDashboardData({
      childName: '小明',
      totalGamesPlayed: 47,
      favoriteGameType: '配對遊戲',
      weeklyProgress: 85,
      aiUsageStats: {
        hintsRequested: 12,
        encouragementsGiven: 28,
        difficultyAdjustments: 5,
        totalInteractions: 45,
        averageSessionTime: 15,
        learningGains: 23
      },
      learningInsights: [
        '空間記憶能力有顯著提升',
        '對數字遊戲特別有興趣', 
        '學習專注度保持穩定',
        '社交學習傾向明顯'
      ]
    });
  };

  const handleAIToggle = (enabled: boolean) => {
    setAiEnabled(enabled);
    aiAssistant.updateConfig({ enabled });
    saveSettings();
  };

  const handleFeatureToggle = (feature: keyof typeof aiFeatures) => {
    const newFeatures = { ...aiFeatures, [feature]: !aiFeatures[feature] };
    setAiFeatures(newFeatures);
    aiAssistant.updateConfig({ features: newFeatures });
    saveSettings();
  };

  const saveSettings = () => {
    localStorage.setItem('ai-settings', JSON.stringify({
      enabled: aiEnabled,
      features: aiFeatures
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 標題 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">家長控制面板</h1>
            <p className="text-gray-600">管理AI學習助手，了解孩子的學習進度</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI設定區 */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="w-5 h-5 text-blue-500" />
                  <h2 className="font-semibold">AI助手設定</h2>
                </div>

                {/* 總開關 */}
                <div className="flex items-center justify-between mb-6 p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium">啟用AI助手</div>
                    <div className="text-sm text-gray-600">為孩子提供智能學習協助</div>
                  </div>
                  <Switch
                    checked={aiEnabled}
                    onCheckedChange={handleAIToggle}
                  />
                </div>

                {/* 功能設定 */}
                {aiEnabled && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-gray-700">AI功能設定</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">智能提示</div>
                          <div className="text-xs text-gray-500">卡住時提供引導</div>
                        </div>
                        <Switch
                          checked={aiFeatures.smartHints}
                          onCheckedChange={() => handleFeatureToggle('smartHints')}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">難度調整</div>
                          <div className="text-xs text-gray-500">自動調整遊戲難度</div>
                        </div>
                        <Switch
                          checked={aiFeatures.adaptiveDifficulty}
                          onCheckedChange={() => handleFeatureToggle('adaptiveDifficulty')}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">學習分析</div>
                          <div className="text-xs text-gray-500">提供進度洞察</div>
                        </div>
                        <Switch
                          checked={aiFeatures.progressAnalysis}
                          onCheckedChange={() => handleFeatureToggle('progressAnalysis')}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* AI說明 */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIExplanation(!showAIExplanation)}
                  className="w-full mt-4"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showAIExplanation ? '隱藏' : '了解'}AI如何幫助學習
                </Button>

                {showAIExplanation && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                    <p className="mb-2">🤖 <strong>AI助手的工作原理：</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• 分析孩子的學習模式和困難點</li>
                      <li>• 在適當時機提供個人化提示</li>
                      <li>• 根據表現調整遊戲難度</li>
                      <li>• 生成鼓勵話語增強學習動機</li>
                    </ul>
                    <p className="mt-2 text-green-600">🛡️ 我們重視隱私：所有數據僅用於改善學習體驗</p>
                  </div>
                )}
              </Card>

              {/* 隱私保護 */}
              <Card className="p-6 mt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-5 h-5 text-green-500" />
                  <h2 className="font-semibold">隱私保護</h2>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    數據本地處理，不上傳個人信息
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    AI分析僅用於改善學習體驗
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    可隨時關閉AI功能
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    符合兒童隱私保護標準
                  </div>
                </div>
              </Card>
            </div>

            {/* 數據展示區 */}
            <div className="lg:col-span-2">
              {dashboardData && (
                <div className="space-y-6">
                  {/* 概覽卡片 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {dashboardData.totalGamesPlayed}
                      </div>
                      <div className="text-sm text-gray-600">遊戲次數</div>
                    </Card>
                    
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {dashboardData.weeklyProgress}%
                      </div>
                      <div className="text-sm text-gray-600">本週進步</div>
                    </Card>
                    
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {dashboardData.aiUsageStats.totalInteractions}
                      </div>
                      <div className="text-sm text-gray-600">AI互動次數</div>
                    </Card>
                    
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {dashboardData.aiUsageStats.averageSessionTime}分
                      </div>
                      <div className="text-sm text-gray-600">平均學習時長</div>
                    </Card>
                  </div>

                  {/* AI使用統計 */}
                  {aiEnabled && (
                    <Card className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Brain className="w-5 h-5 text-purple-500" />
                        <h2 className="font-semibold">AI協助統計</h2>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {dashboardData.aiUsageStats.hintsRequested}
                          </div>
                          <div className="text-xs text-gray-600">提示請求</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {dashboardData.aiUsageStats.encouragementsGiven}
                          </div>
                          <div className="text-xs text-gray-600">鼓勵次數</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {dashboardData.aiUsageStats.difficultyAdjustments}
                          </div>
                          <div className="text-xs text-gray-600">難度調整</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">
                            +{dashboardData.aiUsageStats.learningGains}%
                          </div>
                          <div className="text-xs text-gray-600">學習提升</div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* 學習洞察 */}
                  <Card className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <h2 className="font-semibold">學習洞察</h2>
                      {aiEnabled && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          AI分析
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {dashboardData.learningInsights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Award className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{insight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {!aiEnabled && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                        💡 啟用AI助手可獲得更詳細的學習分析和個人化建議
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}