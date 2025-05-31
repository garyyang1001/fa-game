"use client";

import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createGameFromVoice, GameData } from "@/lib/gemini";

interface VoiceCreatorProps {
  onGameCreated: (gameData: GameData) => void;
}

export function VoiceCreator({ onGameCreated }: VoiceCreatorProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      // Check for browser support
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        toast({
          title: "不支援",
          description: "您的瀏覽器不支援語音識別",
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
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        toast({
          title: "識別錯誤",
          description: "語音識別失敗，請再試一次",
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        setIsRecording(false);
        if (transcript) {
          processTranscript();
        }
      };
      
      recognition.start();
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
    setIsRecording(false);
    // Recognition will stop automatically
  };

  const processTranscript = async () => {
    if (!transcript) {
      toast({
        title: "沒有輸入",
        description: "請說出您的遊戲想法",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const gameData = await createGameFromVoice({
        voiceInput: transcript,
        ageGroup: "3-5",
        language: "zh-TW"
      });
      
      onGameCreated(gameData);
      
      toast({
        title: "成功",
        description: "遊戲創建成功！",
      });
      
      setTranscript("");
    } catch (error) {
      console.error("Error processing transcript:", error);
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
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <Button
          size="lg"
          variant={isRecording ? "destructive" : "default"}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className="relative"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              處理中...
            </>
          ) : isRecording ? (
            <>
              <Mic className="mr-2 h-4 w-4 animate-pulse" />
              停止錄音
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" />
              開始說話
            </>
          )}
        </Button>
      </div>
      
      {(isRecording || transcript) && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">您說的是：</p>
          <p className="text-lg">{transcript || "正在聆聽..."}</p>
        </div>
      )}
      
      {transcript && !isRecording && !isProcessing && (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setTranscript("")}
          >
            清除
          </Button>
          <Button onClick={processTranscript}>
            創建遊戲
          </Button>
        </div>
      )}
    </div>
  );
}