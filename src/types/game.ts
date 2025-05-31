export interface Game {
  id: string;
  title: string;
  description: string;
  template: 'matching' | 'sorting' | 'story' | 'drawing';
  ageGroup: string;
  educationalGoals: string[];
  creatorId: string;
  creatorName: string;
  thumbnail?: string;
  likes: number;
  plays: number;
  createdAt: Date;
  updatedAt: Date;
  gameConfig: any;
  isPublic: boolean;
  tags: string[];
}

export interface GameSession {
  id: string;
  gameId: string;
  playerId: string;
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  progress: any;
}

export interface GameTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  baseConfig: any;
  previewImage?: string;
  isPremium: boolean;
}