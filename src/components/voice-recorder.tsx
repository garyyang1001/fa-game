"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createGameFromVoice } from "@/lib/gemini";

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
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
        setTranscript(transcript);
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
      
      toast({
        title: "開始錄音",
        description: "請說出您的遊戲想法",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "錯誤",
        description: "無法存取麥克風，請確認權限設定",
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
    
    try {
      const gameData = await createGameFromVoice({
        voiceInput: finalInput,
        ageGroup: "3-5",
        language: "zh-TW"
      });
      
      toast({
        title: "成功",
        description: "遊戲創建成功！",
      });
      
      // Navigate to game or show preview
      console.log("Game created:", gameData);
      
      // Clear input
      setInputText("");
      setTranscript("");
      
    } catch (error) {
      console.error("Error processing input:", error);
      toast({
        title: "處理失敗",
        description: "無法創建遊戲，請再試一次",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 主要輸入區域 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          說出或輸入您的遊戲想法
        </h3>
        
        {/* 文字輸入框 */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="例如：我想做一個教孩子認識動物的配對遊戲..."
            className="w-full min-h-[120px] p-4 pr-12 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none"
            disabled={isProcessing}
          />
          
          {/* 麥克風按鈕（浮動在輸入框內） */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`absolute bottom-4 right-4 p-3 rounded-full transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* 錄音狀態提示 */}
        {isRecording && (
          <div className="flex items-center space-x-2 text-red-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm">正在聆聽...</span>
          </div>
        )}

        {/* 範例提示 */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">您可以這樣說：</p>
          <div className="flex flex-wrap gap-2">
            {[
              "做一個認識水果的配對遊戲",
              "教數字排序的遊戲",
              "認識顏色的互動遊戲",
              "學習英文字母的遊戲"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setInputText(example)}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* 提交按鈕 */}
        <Button
          onClick={processInput}
          disabled={!inputText.trim() || isProcessing}
          className="w-full h-12 text-lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              AI 正在創建遊戲...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              創建遊戲
            </>
          )}
        </Button>
      </div>

      {/* 使用提示 */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>💡 提示：點擊麥克風圖標開始語音輸入，或直接在文字框中輸入</p>
      </div>
    </div>
  );
}