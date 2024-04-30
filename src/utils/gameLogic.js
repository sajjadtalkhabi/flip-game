// GameLogic.js

export class GameLogic {
    game;

    constructor(game) {
        this.game = game;
    }

    trollCard(index) {
        if (this.game.gameOver.value) return;
        if (this.game.images.value[index].active) return;
        // Start timer on first card click
        if (!this.game.timer.isStarted) {
            this.game.timer.isStarted = true;
            this.game.timer.start();
        }
        this.game.images.value[index].active = true;
        this.game.remainingMoves.value -= 1;

        const flippedCards = this.game.images.value.filter((card) => card.active && !card.matched);
        if (flippedCards.length > 2) {
            this.game.images.value[index].active = false;
            this.game.remainingMoves.value += 1;
            return;
        }

        if (flippedCards.length === 2) {
            if (flippedCards[0].image === flippedCards[1].image) {
                flippedCards.forEach((card) => (card.matched = true));
            } else {
                setTimeout(() => {
                    flippedCards.forEach((card) => (card.active = false));
                }, 1000);
            }
        }

        if (this.game.remainingMoves.value === 0 || this.game.images.value.every((card) => card.matched)) {
            this.game.gameOver.value = true;
            this.game.timer.stop();
        }
    }
}
