"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";

interface GameEngineProps {
  gameConfig: any;
  template: string;
  width?: number;
  height?: number;
}

export function GameEngine({ gameConfig, template, width = 800, height = 600 }: GameEngineProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Import the appropriate scene based on template
    const loadScene = async () => {
      let Scene;
      
      switch (template) {
        case 'matching':
          const { MatchingGameScene } = await import('@/game-templates/matching-game');
          Scene = new MatchingGameScene(gameConfig);
          break;
        case 'sorting':
          const { SortingGameScene } = await import('@/game-templates/sorting-game');
          Scene = new SortingGameScene(gameConfig);
          break;
        default:
          console.error('Unknown game template:', template);
          return;
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width,
        height,
        backgroundColor: '#f0f0f0',
        scene: Scene,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
      };

      // Destroy existing game instance
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }

      // Create new game instance
      gameRef.current = new Phaser.Game(config);
    };

    loadScene();

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [gameConfig, template, width, height]);

  return (
    <div 
      ref={containerRef} 
      className="game-container"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}