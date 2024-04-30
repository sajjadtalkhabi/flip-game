// Game.js
import { ref } from "vue";
import { Timer } from "./timer";
import cloneDeep from "lodash/cloneDeep";

export class Game {
  images = ref([]);
  timer;
  remainingMoves = ref(null);
  gameOver = ref(false);

  constructor() {
    this.timer = new Timer(null);
  }

  initializeGame(time, moves) {
    this.timer.time = time;
    this.remainingMoves.value = moves;

    this.loadImages();
  }

  loadImages() {
    let pictures = [];
    for (let i = 0; i < 8; i++) {
      pictures.push(require(`@/assets/images/product-${i + 1}.jpg`));
    }
    pictures = [...cloneDeep(pictures), ...cloneDeep(pictures)]; // duplicate pictures
    pictures = this.shuffle(pictures); // shuffle pictures
    this.images.value = pictures.map((image, index) => ({
      image,
      active: false,
      matched: false,
      id: index,
    }));
  }

  shuffle(array) {
    const clonedArray = cloneDeep(array);
    return clonedArray.sort(() => 0.5 - Math.random());
  }

  restartGame(time, moves) {
    this.gameOver.value = false;
    this.timer.stop();
    this.initializeGame(time, moves);
  }
}
