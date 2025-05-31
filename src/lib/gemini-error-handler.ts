export class GeminiError extends Error {
  code: string;
  isApiKeyError: boolean;
  
  constructor(message: string, code: string = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'GeminiError';
    this.code = code;
    this.isApiKeyError = code === 'API_KEY_INVALID' || message.includes('API key expired');
  }
}

export function handleGeminiError(error: any): GeminiError {
  console.error('Gemini API Error:', error);
  
  // 檢查是否為 API key 相關錯誤
  if (error.message?.includes('API key expired') || 
      error.message?.includes('API_KEY_INVALID')) {
    return new GeminiError(
      '您的 AI 服務金鑰已過期，請聯絡系統管理員更新。',
      'API_KEY_INVALID'
    );
  }
  
  // 檢查是否為配額錯誤
  if (error.message?.includes('quota') || 
      error.message?.includes('RATE_LIMIT_EXCEEDED')) {
    return new GeminiError(
      'AI 服務使用量已達上限，請稍後再試。',
      'QUOTA_EXCEEDED'
    );
  }
  
  // 檢查是否為網路錯誤
  if (error.message?.includes('fetch') || 
      error.message?.includes('network')) {
    return new GeminiError(
      '網路連線問題，請檢查您的網路連線。',
      'NETWORK_ERROR'
    );
  }
  
  // 預設錯誤
  return new GeminiError(
    'AI 服務暫時無法使用，請稍後再試。',
    'UNKNOWN_ERROR'
  );
}

// 用於檢查 API key 是否設置
export function checkApiKeyConfig(): boolean {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Gemini API key is not configured');
    return false;
  }
  
  if (apiKey.length < 20) {
    console.error('Gemini API key appears to be invalid');
    return false;
  }
  
  return true;
}
