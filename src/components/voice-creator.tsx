"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Loader2, Wand2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createGameFromVoice, GameData } from "@/lib/gemini";
import { GeminiError } from "@/lib/gemini-error-handler";

interface VoiceCreatorProps {
  onGameCreated: (gameData: GameData) => void;
}

export function VoiceCreator({ onGameCreated }: VoiceCreatorProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      // Check for browser support
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        toast({
          title: "不支援",
          description: "您的瀏覽器不支援語音識別，請使用文字輸入",
          variant: "destructive",
        });
        return;
      }

      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'zh-TW';
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputText(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "錯誤",
        description: "無法啟動語音識別",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const processInput = async () => {
    const finalInput = inputText.trim();
    
    if (!finalInput) {
      toast({
        title: "請輸入內容",
        description: "請說出或輸入您的遊戲想法",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setApiError(null);
    
    try {
      const gameData = await createGameFromVoice({
        voiceInput: finalInput,
        ageGroup: "3-5",
        language: "zh-TW"
      });
      
      onGameCreated(gameData);
      
      toast({
        title: "成功",
        description: "遊戲創建成功！",
      });
      
      setInputText("");
    } catch (error) {
      console.error("Error processing input:", error);
      
      // 處理特定的 API 錯誤
      if (error instanceof GeminiError) {
        if (error.isApiKeyError) {
          setApiError(error.message);
          toast({
            title: "API 金鑰錯誤",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "處理失敗",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "處理失敗",
          description: "無法創建遊戲，請再試一次",
          variant: "destructive",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* API 錯誤提示 */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800">{apiError}</p>
            <p className="text-xs text-red-600 mt-1">
              請聯絡系統管理員更新 API 金鑰，或查看
              <a
                href="https://github.com/garyyang1001/fa-game#api-key-setup"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium mx-1"
              >
                設定指南
              </a>
              了解詳情。
            </p>
          </div>
        </div>
      )}

      {/* 文字輸入區域 */}
      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="描述您想要的遊戲..."
          className="w-full min-h-[100px] p-4 pr-12 text-base border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none resize-none"
          disabled={isProcessing}
        />
        
        {/* 麥克風按鈕 */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {isRecording ? (
            <MicOff className="w-4 h-4 text-white" />
          ) : (
            <Mic className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* 錄音狀態 */}
      {isRecording && (
        <div className="flex items-center space-x-2 text-red-500 text-sm">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span>正在聆聽...</span>
        </div>
      )}

      {/* 快速範例 */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-500">快速選擇：</span>
        {[
          "動物配對遊戲",
          "數字排序",
          "顏色認知",
          "形狀配對"
        ].map((example, index) => (
          <button
            key={index}
            onClick={() => setInputText(example)}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>

      {/* 創建按鈕 */}
      <Button
        onClick={processInput}
        disabled={!inputText.trim() || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            AI 生成中...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            使用 AI 創建遊戲
          </>
        )}
      </Button>
    </div>
  );
}
