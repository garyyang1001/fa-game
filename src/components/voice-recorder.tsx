"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createGameFromVoice } from "@/lib/gemini";

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // Using Web Speech API for real-time transcription
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
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
        
        recognition.start();
      }
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
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      // In production, you would send this to your backend
      // For demo, we'll use the transcript directly
      const gameData = await createGameFromVoice({
        voiceInput: transcript || "製作一個動物配對遊戲",
        ageGroup: "3-5",
        language: "zh-TW"
      });
      
      toast({
        title: "成功",
        description: "遊戲創建成功！",
      });
      
      // Navigate to game or show preview
      console.log("Game created:", gameData);
      
    } catch (error) {
      console.error("Error processing audio:", error);
      toast({
        title: "處理失敗",
        description: "無法處理語音輸入，請再試一次",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setTranscript("");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className="relative h-20 w-20 rounded-full"
      >
        {isProcessing ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : isRecording ? (
          <MicOff className="h-8 w-8" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </Button>
      
      {isRecording && (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">正在錄音...</p>
          {transcript && (
            <p className="text-lg font-medium max-w-md">{transcript}</p>
          )}
        </div>
      )}
      
      {isProcessing && (
        <p className="text-sm text-gray-600">正在處理您的語音...</p>
      )}
      
      {!isRecording && !isProcessing && (
        <p className="text-sm text-gray-600">
          點擊開始錄音，說出您的遊戲想法
        </p>
      )}
    </div>
  );
}