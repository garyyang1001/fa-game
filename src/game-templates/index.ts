import { MatchingGameScene, defaultMatchingConfig } from './matching-game';
import { SortingGameScene, defaultSortingConfig } from './sorting-game';
import { CatchGameScene, defaultCatchConfig } from './catch-game';

export {
  MatchingGameScene,
  defaultMatchingConfig,
  SortingGameScene,
  defaultSortingConfig,
  CatchGameScene,
  defaultCatchConfig
};

// Game template types
export type GameTemplate = 'matching' | 'sorting' | 'catch' | 'story' | 'puzzle';

// Template configurations
export const gameTemplates = {
  matching: {
    Scene: MatchingGameScene,
    defaultConfig: defaultMatchingConfig,
    name: '配對遊戲',
    description: '找出相同的圖案配對'
  },
  sorting: {
    Scene: SortingGameScene,
    defaultConfig: defaultSortingConfig,
    name: '排序遊戲',
    description: '按照規則排列物品'
  },
  catch: {
    Scene: CatchGameScene,
    defaultConfig: defaultCatchConfig,
    name: '接物遊戲',
    description: '接住掉落的物品'
  }
};
