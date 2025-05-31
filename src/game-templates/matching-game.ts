import Phaser from 'phaser';

export interface MatchingGameConfig {
  pairs: Array<{
    id: string;
    content: string;
    match: string;
  }>;
  theme: string;
  encouragements: string[];
}

export class MatchingGameScene extends Phaser.Scene {
  private config: MatchingGameConfig;
  private cards: Phaser.GameObjects.Container[] = [];
  private selectedCards: Phaser.GameObjects.Container[] = [];
  private matchedPairs: number = 0;
  private moves: number = 0;

  constructor(config: MatchingGameConfig) {
    super({ key: 'MatchingGame' });
    this.config = config;
  }

  preload() {
    // Load assets if needed
  }

  create() {
    // Set background
    this.cameras.main.setBackgroundColor('#f3f4f6');

    // Create title
    this.add.text(this.scale.width / 2, 30, '配對遊戲', {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#1f2937',
    }).setOrigin(0.5);

    // Create cards
    this.createCards();

    // Add score display
    this.add.text(20, this.scale.height - 40, `移動次數: ${this.moves}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#6b7280',
    });
  }

  createCards() {
    const cardWidth = 120;
    const cardHeight = 150;
    const padding = 20;
    const cols = 4;
    const rows = Math.ceil(this.config.pairs.length * 2 / cols);
    
    // Duplicate and shuffle pairs
    const allCards = [...this.config.pairs, ...this.config.pairs]
      .sort(() => Math.random() - 0.5);

    allCards.forEach((cardData, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = 100 + col * (cardWidth + padding);
      const y = 120 + row * (cardHeight + padding);

      const card = this.createCard(x, y, cardWidth, cardHeight, cardData);
      this.cards.push(card);
    });
  }

  createCard(x: number, y: number, width: number, height: number, cardData: any) {
    const container = this.add.container(x, y);
    
    // Card back
    const back = this.add.rectangle(0, 0, width, height, 0xf43f5e);
    back.setStrokeStyle(2, 0xbe123c);
    
    // Card front
    const front = this.add.rectangle(0, 0, width, height, 0xffffff);
    front.setStrokeStyle(2, 0xe5e7eb);
    front.setVisible(false);
    
    // Card content (emoji or text)
    const content = this.add.text(0, 0, cardData.content, {
      fontSize: '40px',
      fontFamily: 'Arial',
      color: '#1f2937',
    }).setOrigin(0.5);
    content.setVisible(false);
    
    container.add([back, front, content]);
    container.setSize(width, height);
    container.setInteractive();
    container.setData('cardData', cardData);
    container.setData('isFlipped', false);
    container.setData('isMatched', false);
    
    // Add click handler
    container.on('pointerdown', () => this.onCardClick(container));
    container.on('pointerover', () => {
      if (!container.getData('isFlipped')) {
        back.setFillStyle(0xe11d48);
      }
    });
    container.on('pointerout', () => {
      if (!container.getData('isFlipped')) {
        back.setFillStyle(0xf43f5e);
      }
    });
    
    return container;
  }

  onCardClick(card: Phaser.GameObjects.Container) {
    if (card.getData('isFlipped') || card.getData('isMatched')) {
      return;
    }
    
    if (this.selectedCards.length >= 2) {
      return;
    }
    
    this.flipCard(card, true);
    this.selectedCards.push(card);
    
    if (this.selectedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  flipCard(card: Phaser.GameObjects.Container, flip: boolean) {
    const back = card.list[0] as Phaser.GameObjects.Rectangle;
    const front = card.list[1] as Phaser.GameObjects.Rectangle;
    const content = card.list[2] as Phaser.GameObjects.Text;
    
    card.setData('isFlipped', flip);
    back.setVisible(!flip);
    front.setVisible(flip);
    content.setVisible(flip);
    
    // Add flip animation
    this.tweens.add({
      targets: card,
      scaleX: flip ? 1.1 : 1,
      scaleY: flip ? 1.1 : 1,
      duration: 200,
      yoyo: true,
    });
  }

  checkMatch() {
    const [card1, card2] = this.selectedCards;
    const data1 = card1.getData('cardData');
    const data2 = card2.getData('cardData');
    
    if (data1.id === data2.id) {
      // Match found!
      this.matchedPairs++;
      card1.setData('isMatched', true);
      card2.setData('isMatched', true);
      
      // Show encouragement
      this.showEncouragement();
      
      // Add match animation
      [card1, card2].forEach(card => {
        this.tweens.add({
          targets: card,
          scale: 1.2,
          angle: 360,
          duration: 500,
          onComplete: () => {
            card.setScale(1);
            card.setAngle(0);
          }
        });
      });
      
      this.selectedCards = [];
      
      // Check win condition
      if (this.matchedPairs === this.config.pairs.length) {
        this.showWinMessage();
      }
    } else {
      // No match
      this.time.delayedCall(1000, () => {
        this.flipCard(card1, false);
        this.flipCard(card2, false);
        this.selectedCards = [];
      });
    }
  }

  showEncouragement() {
    const encouragement = Phaser.Utils.Array.GetRandom(this.config.encouragements);
    const text = this.add.text(this.scale.width / 2, this.scale.height / 2, encouragement, {
      fontSize: '40px',
      fontFamily: 'Arial',
      color: '#f43f5e',
      stroke: '#ffffff',
      strokeThickness: 4,
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: text,
      scale: { from: 0, to: 1.5 },
      alpha: { from: 1, to: 0 },
      duration: 1500,
      onComplete: () => text.destroy()
    });
  }

  showWinMessage() {
    const overlay = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0x000000,
      0.7
    );
    
    const winText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, '🎉 恭喜完成！ 🎉', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff',
    }).setOrigin(0.5);
    
    const scoreText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 20, `移動次數: ${this.moves}`, {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
    }).setOrigin(0.5);
    
    const playAgainButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 80, '再玩一次', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#f43f5e',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive();
    
    playAgainButton.on('pointerdown', () => {
      this.scene.restart();
    });
  }
}

// Default configuration
export const defaultMatchingConfig: MatchingGameConfig = {
  pairs: [
    { id: '1', content: '🐶', match: '🐶' },
    { id: '2', content: '🐱', match: '🐱' },
    { id: '3', content: '🐭', match: '🐭' },
    { id: '4', content: '🐰', match: '🐰' },
  ],
  theme: 'animals',
  encouragements: ['太棒了！', '繼續加油！', '真聪明！', '很好！'],
};