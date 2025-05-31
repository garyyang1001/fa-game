"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const games = [
  {
    id: 1,
    title: "動物認知大冒險",
    creator: "小明媽媽",
    likes: 234,
    plays: 1520,
    thumbnail: "🦁",
    ageGroup: "3-5歲",
  },
  {
    id: 2,
    title: "數字排排站",
    creator: "慧慧老師",
    likes: 189,
    plays: 980,
    thumbnail: "🔢",
    ageGroup: "4-6歲",
  },
  {
    id: 3,
    title: "顏色世界",
    creator: "小美爸爸",
    likes: 312,
    plays: 2100,
    thumbnail: "🎨",
    ageGroup: "3-5歲",
  },
  {
    id: 4,
    title: "英文ABC",
    creator: "芳芳媽媽",
    likes: 456,
    plays: 3200,
    thumbnail: "🔤",
    ageGroup: "5-8歲",
  },
];

export function GameShowcase() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-32 flex items-center justify-center text-6xl">
                {game.thumbnail}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{game.title}</h3>
                <p className="text-sm text-gray-600 mb-2">由 {game.creator} 創建</p>
                <p className="text-xs text-gray-500">適合 {game.ageGroup}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <div className="flex space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {game.likes}
                </span>
                <span className="flex items-center">
                  <Play className="w-4 h-4 mr-1" />
                  {game.plays}
                </span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-1" />
                  玩
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}