"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { GameData } from "@/lib/gemini";

interface GamePreviewProps {
  template: string | null;
  gameData: GameData | null;
}

export function GamePreview({ template, gameData }: GamePreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || (!template && !gameData)) return;

    // Clear previous content
    canvasRef.current.innerHTML = '';

    // Create preview based on template or gameData
    const previewTemplate = gameData?.template || template;
    
    if (previewTemplate === 'matching') {
      createMatchingPreview();
    } else if (previewTemplate === 'sorting') {
      createSortingPreview();
    } else if (previewTemplate === 'story') {
      createStoryPreview();
    } else if (previewTemplate === 'drawing') {
      createDrawingPreview();
    }
  }, [template, gameData]);

  const createMatchingPreview = () => {
    const preview = document.createElement('div');
    preview.className = 'p-8 text-center';
    preview.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${gameData?.title || '配對遊戲'}</h3>
      <p class="text-gray-600 mb-6">${gameData?.description || '找出相同的圖片'}</p>
      <div class="grid grid-cols-3 gap-4 max-w-md mx-auto">
        ${Array(6).fill(0).map((_, i) => `
          <div class="bg-primary-100 rounded-lg aspect-square flex items-center justify-center text-2xl">
            ${['🐶', '🐱', '🐭', '🐶', '🐱', '🐭'][i]}
          </div>
        `).join('')}
      </div>
    `;
    canvasRef.current?.appendChild(preview);
  };

  const createSortingPreview = () => {
    const preview = document.createElement('div');
    preview.className = 'p-8 text-center';
    preview.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${gameData?.title || '排序遊戲'}</h3>
      <p class="text-gray-600 mb-6">${gameData?.description || '按順序排列數字'}</p>
      <div class="flex justify-center space-x-4">
        ${[3, 1, 4, 2].map(num => `
          <div class="bg-green-100 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
            ${num}
          </div>
        `).join('')}
      </div>
    `;
    canvasRef.current?.appendChild(preview);
  };

  const createStoryPreview = () => {
    const preview = document.createElement('div');
    preview.className = 'p-8 text-center';
    preview.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${gameData?.title || '故事冒險'}</h3>
      <div class="bg-purple-100 rounded-lg p-6 mb-4">
        <p class="text-lg mb-4">小熊在森林裡發現了一條小路...</p>
      </div>
      <div class="space-y-2">
        <button class="w-full bg-white rounded-lg p-3 text-left hover:bg-gray-50">
          A. 沿著小路探險
        </button>
        <button class="w-full bg-white rounded-lg p-3 text-left hover:bg-gray-50">
          B. 回家找媽媽
        </button>
      </div>
    `;
    canvasRef.current?.appendChild(preview);
  };

  const createDrawingPreview = () => {
    const preview = document.createElement('div');
    preview.className = 'p-8 text-center';
    preview.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${gameData?.title || '創意繪畫'}</h3>
      <div class="bg-white border-2 border-gray-300 rounded-lg h-64 mb-4 relative">
        <canvas class="absolute inset-0" width="400" height="250"></canvas>
      </div>
      <div class="flex justify-center space-x-2">
        ${['🔴', '🟡', '🟢', '🔵', '🟣'].map(color => `
          <button class="text-2xl">${color}</button>
        `).join('')}
      </div>
    `;
    canvasRef.current?.appendChild(preview);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div ref={canvasRef} className="w-full max-w-2xl" />
    </div>
  );
}