"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Puzzle, ArrowUpDown, BookOpen, Palette } from "lucide-react";

interface GameTemplatesProps {
  selectedTemplate: string | null;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  {
    id: "matching",
    name: "配對遊戲",
    description: "圖片、聲音或文字配對",
    icon: Puzzle,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "sorting",
    name: "排序遊戲",
    description: "數字、大小或順序排列",
    icon: ArrowUpDown,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "story",
    name: "故事冒險",
    description: "互動式故事和選擇",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "drawing",
    name: "創意繪畫",
    description: "繪畫和著色遊戲",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
  },
];

export function GameTemplates({ selectedTemplate, onSelectTemplate }: GameTemplatesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => {
        const Icon = template.icon;
        const isSelected = selectedTemplate === template.id;
        
        return (
          <Card
            key={template.id}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-md",
              isSelected && "ring-2 ring-primary-500 shadow-md"
            )}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={cn("p-3 rounded-full", template.color)}>
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}