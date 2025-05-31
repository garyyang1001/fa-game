import Phaser from 'phaser';

export interface SortingGameConfig {
  items: Array<{
    id: string;
    value: number | string;
    display: string;
  }>;
  sortType: 'number' | 'size' | 'alphabet';
  theme: string;
  encouragements: string[];
}

export class SortingGameScene extends Phaser.Scene {
  private config: SortingGameConfig;
  private items: Phaser.GameObjects.Container[] = [];
  private correctOrder: string[] = [];
  private moves: number = 0;
  private startTime: number = 0;

  constructor(config: SortingGameConfig) {
    super({ key: 'SortingGame' });
    this.config = config;
  }

  preload() {
    // Load assets if needed
  }

  create() {
    this.cameras.main.setBackgroundColor('#e0f2fe');
    this.startTime = Date.now();

    // Title
    this.add.text(this.scale.width / 2, 30, '排序遊戲', {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#0369a1',
    }).setOrigin(0.5);

    // Instructions
    const instruction = this.getInstruction();
    this.add.text(this.scale.width / 2, 70, instruction, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#64748b',
    }).setOrigin(0.5);

    // Create items
    this.createItems();

    // Stats
    this.add.text(20, this.scale.height - 40, `移動: ${this.moves}`, {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#64748b',
    });
  }

  getInstruction(): string {
    switch (this.config.sortType) {
      case 'number':
        return '從小到大排列數字';
      case 'size':
        return '從小到大排列';
      case 'alphabet':
        return '按字母順序排列';
      default:
        return '按順序排列';
    }
  }

  createItems() {
    // Calculate correct order
    this.correctOrder = [...this.config.items]
      .sort((a, b) => {
        if (typeof a.value === 'number' && typeof b.value === 'number') {
          return a.value - b.value;
        }
        return String(a.value).localeCompare(String(b.value));
      })
      .map(item => item.id);

    // Shuffle items for display
    const shuffled = [...this.config.items].sort(() => Math.random() - 0.5);

    const itemWidth = 100;
    const itemHeight = 100;
    const padding = 20;
    const startX = (this.scale.width - (shuffled.length * (itemWidth + padding) - padding)) / 2;
    const y = this.scale.height / 2;

    shuffled.forEach((item, index) => {
      const x = startX + index * (itemWidth + padding);
      const container = this.createItem(x, y, itemWidth, itemHeight, item, index);
      this.items.push(container);
    });
  }

  createItem(x: number, y: number, width: number, height: number, item: any, index: number) {
    const container = this.add.container(x, y);
    
    // Item background
    const bg = this.add.rectangle(0, 0, width, height, 0x38bdf8);
    bg.setStrokeStyle(3, 0x0284c7);
    
    // Item content
    const content = this.add.text(0, 0, item.display, {
      fontSize: '36px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    
    container.add([bg, content]);
    container.setSize(width, height);
    container.setInteractive({ draggable: true });
    container.setData('item', item);
    container.setData('originalIndex', index);
    
    // Drag events
    this.input.setDraggable(container);
    
    container.on('dragstart', () => {
      container.setScale(1.1);
      this.children.bringToTop(container);
    });
    
    container.on('drag', (pointer: Phaser.Input.Pointer) => {
      container.x = pointer.x;
      container.y = pointer.y;
    });
    
    container.on('dragend', () => {
      container.setScale(1);
      this.moves++;
      this.updateMoves();
      this.rearrangeItems(container);
    });
    
    return container;
  }

  rearrangeItems(draggedItem: Phaser.GameObjects.Container) {
    // Find nearest position
    let nearestIndex = 0;
    let minDistance = Infinity;
    
    this.items.forEach((item, index) => {
      if (item === draggedItem) return;
      const distance = Math.abs(draggedItem.x - item.x);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });
    
    // Reorder items array
    const currentIndex = this.items.indexOf(draggedItem);
    this.items.splice(currentIndex, 1);
    
    if (draggedItem.x < this.items[nearestIndex].x) {
      this.items.splice(nearestIndex, 0, draggedItem);
    } else {
      this.items.splice(nearestIndex + 1, 0, draggedItem);
    }
    
    // Animate to new positions
    this.animateToPositions();
    
    // Check if sorted correctly
    this.checkWin();
  }

  animateToPositions() {
    const itemWidth = 100;
    const padding = 20;
    const startX = (this.scale.width - (this.items.length * (itemWidth + padding) - padding)) / 2;
    const y = this.scale.height / 2;
    
    this.items.forEach((item, index) => {
      const targetX = startX + index * (itemWidth + padding);
      this.tweens.add({
        targets: item,
        x: targetX,
        y: y,
        duration: 300,
        ease: 'Power2',
      });
    });
  }

  updateMoves() {
    const movesText = this.children.list.find(
      child => child instanceof Phaser.GameObjects.Text && 
      child.text.includes('移動:')
    ) as Phaser.GameObjects.Text;
    
    if (movesText) {
      movesText.setText(`移動: ${this.moves}`);
    }
  }

  checkWin() {
    const currentOrder = this.items.map(item => item.getData('item').id);
    const isCorrect = currentOrder.every((id, index) => id === this.correctOrder[index]);
    
    if (isCorrect) {
      this.showWinMessage();
    }
  }

  showWinMessage() {
    const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
    
    // Celebration animation
    this.items.forEach((item, index) => {
      this.tweens.add({
        targets: item,
        y: item.y - 20,
        duration: 300,
        delay: index * 100,
        yoyo: true,
        repeat: 1,
      });
    });
    
    // Win overlay
    const overlay = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0x000000,
      0.7
    );
    
    const winText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, '🎆 完美！ 🎆', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff',
    }).setOrigin(0.5);
    
    const statsText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 20, 
      `移動次數: ${this.moves}\n用時: ${timeElapsed} 秒`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);
    
    const playAgainButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, '再玩一次', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#0ea5e9',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive();
    
    playAgainButton.on('pointerdown', () => {
      this.scene.restart();
    });
  }
}

export const defaultSortingConfig: SortingGameConfig = {
  items: [
    { id: '1', value: 3, display: '3' },
    { id: '2', value: 1, display: '1' },
    { id: '3', value: 4, display: '4' },
    { id: '4', value: 2, display: '2' },
  ],
  sortType: 'number',
  theme: 'numbers',
  encouragements: ['加油！', '很好！', '繼續！'],
};