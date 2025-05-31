"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, TrendingUp, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { GameShowcase } from "@/components/game-showcase";
import Link from "next/link";

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "全部", icon: "🎮" },
    { id: "matching", name: "配對", icon: "🧩" },
    { id: "sorting", name: "排序", icon: "🔢" },
    { id: "story", name: "故事", icon: "📚" },
    { id: "drawing", name: "繪畫", icon: "🎨" },
  ];

  const sortOptions = [
    { id: "popular", name: "最受歡迎", icon: TrendingUp },
    { id: "recent", name: "最新上架", icon: Clock },
    { id: "liked", name: "最多讚", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎮</span>
            <span className="text-xl font-bold">FA-Game</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/create">
              <Button>創建遊戲</Button>
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
        >
          遊戲廣場
        </motion.h1>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="搜尋遊戲..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              篩選
            </Button>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8 flex-wrap"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-8"
        >
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant={sortBy === option.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSortBy(option.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {option.name}
              </Button>
            );
          })}
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GameShowcase />
        </motion.div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            載入更多
          </Button>
        </div>
      </div>
    </div>
  );
}