import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIAssistantConfig {
  enabled: boolean;
  features: {
    smartHints: boolean;
    adaptiveDifficulty: boolean;
    progressAnalysis: boolean;
    contentGeneration: boolean;
  };
  personality: 'encouraging' | 'patient' | 'playful';
}

interface LearningContext {
  gameType: string;
  difficulty: number;
  playerAge?: number;
  currentProgress: any;
  mistakeHistory: string[];
}

interface AIResponse {
  type: 'hint' | 'encouragement' | 'explanation' | 'suggestion';
  content: string;
  timing: 'immediate' | 'delayed' | 'on-request';
  confidence: number;
}

export class AILearningAssistant {
  private gemini: GoogleGenerativeAI;
  private config: AIAssistantConfig;

  constructor(config: AIAssistantConfig = this.getDefaultConfig()) {
    this.gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    this.config = config;
  }

  private getDefaultConfig(): AIAssistantConfig {
    return {
      enabled: false, // 預設關閉，保持向後兼容
      features: {
        smartHints: false,
        adaptiveDifficulty: false,
        progressAnalysis: false,
        contentGeneration: false,
      },
      personality: 'encouraging'
    };
  }

  // 智能提示生成
  async generateHint(context: LearningContext): Promise<AIResponse | null> {
    if (!this.config.enabled || !this.config.features.smartHints) {
      return null;
    }

    try {
      const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = this.buildHintPrompt(context);
      const result = await model.generateContent(prompt);
      
      return {
        type: 'hint',
        content: result.response.text(),
        timing: 'on-request',
        confidence: 0.8
      };
    } catch (error) {
      console.error('AI hint generation failed:', error);
      return null;
    }
  }

  // 鼓勵話語生成
  async generateEncouragement(context: LearningContext): Promise<AIResponse | null> {
    if (!this.config.enabled) return null;

    try {
      const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        為一個${context.playerAge || '小'}朋友在玩${context.gameType}遊戲時，
        生成一句${this.config.personality === 'playful' ? '活潑有趣' : '溫暖鼓勵'}的話。
        要求：
        - 不超過15個字
        - 符合兒童語言習慣
        - 積極正面
        - 不要提及AI或機器人
      `;
      
      const result = await model.generateContent(prompt);
      
      return {
        type: 'encouragement',
        content: result.response.text(),
        timing: 'immediate',
        confidence: 0.9
      };
    } catch (error) {
      console.error('AI encouragement generation failed:', error);
      return null;
    }
  }

  // 難度調整建議
  async suggestDifficultyAdjustment(context: LearningContext): Promise<{ 
    shouldAdjust: boolean; 
    newDifficulty: number; 
    reason: string;
  } | null> {
    if (!this.config.enabled || !this.config.features.adaptiveDifficulty) {
      return null;
    }

    // 簡單的邏輯判斷（可以後續用AI增強）
    const mistakes = context.mistakeHistory.length;
    const currentDifficulty = context.difficulty;

    if (mistakes > 5 && currentDifficulty > 1) {
      return {
        shouldAdjust: true,
        newDifficulty: Math.max(1, currentDifficulty - 1),
        reason: '降低難度讓學習更輕鬆'
      };
    }

    if (mistakes === 0 && currentDifficulty < 5) {
      return {
        shouldAdjust: true,
        newDifficulty: currentDifficulty + 1,
        reason: '提高難度增加挑戰'
      };
    }

    return null;
  }

  // 學習進度分析
  async analyzeProgress(playerData: any): Promise<{
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  } | null> {
    if (!this.config.enabled || !this.config.features.progressAnalysis) {
      return null;
    }

    try {
      const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        分析這個孩子的學習數據：${JSON.stringify(playerData)}
        
        請提供：
        1. 3個學習優勢（每個不超過10字）
        2. 2個可改進點（每個不超過10字）
        3. 3個具體建議（每個不超過15字）
        
        用正面、鼓勵的語氣，適合家長閱讀。
      `;
      
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // 這裡需要解析AI的回應，簡化起見先返回模擬數據
      return {
        strengths: ['記憶力很棒', '邏輯思維清晰', '學習專注度高'],
        improvements: ['可以更耐心', '嘗試新策略'],
        recommendations: ['多玩記憶遊戲', '增加邏輯挑戰', '保持學習節奏']
      };
    } catch (error) {
      console.error('AI progress analysis failed:', error);
      return null;
    }
  }

  private buildHintPrompt(context: LearningContext): string {
    return `
      作為一個友善的學習助手，為一個正在玩${context.gameType}遊戲的${context.playerAge || '小'}朋友提供幫助。
      
      遊戲情況：
      - 難度等級：${context.difficulty}
      - 當前進度：${JSON.stringify(context.currentProgress)}
      - 最近錯誤：${context.mistakeHistory.slice(-3).join(', ')}
      
      請提供一個簡短的提示（不超過20字），要求：
      - 不直接給出答案
      - 用引導的方式
      - 語言要親切友善
      - 適合兒童理解
    `;
  }

  // 更新AI配置
  updateConfig(newConfig: Partial<AIAssistantConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // 檢查AI是否可用
  isAvailable(): boolean {
    return this.config.enabled && !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }
}