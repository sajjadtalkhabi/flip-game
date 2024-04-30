<script setup>
import {onMounted, ref, computed, defineProps} from "vue";
import {Game} from "@/utils/game";
import {GameLogic} from "@/utils/gameLogic";

const props = defineProps({
  gameTimer: {
    type: Number,
    default: 120
  },
  gameMoves: {
    type: Number,
    default: 40
  }
})
const timerTime = ref(props.gameTimer);
const game = new Game();
const {images, remainingMoves, gameOver} = game;
const gameLogic = new GameLogic(game);
const {trollCard} = gameLogic;
const restart = () => {
  timerTime.value = props.gameTimer;
  game.restartGame(props.gameTimer, props.gameMoves);
}
const formattedTimer = computed(() => {
  const minutes = Math.floor(timerTime.value / 60);
  const seconds = timerTime.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
})
const listenEmitter = () => {
  game.timer.emitter.on("timerFinished", () => {
    gameOver.value = true;// update gameOver when time finished
  });
  game.timer.emitter.on("timeChange", (time) => {
    timerTime.value = time; // update timer time when event is emitted
  });
};
onMounted(() => {
  game.initializeGame(timerTime.value, props.gameMoves);
  listenEmitter();
  console.log(images.value);
});
</script>
<template>
  <div class="game-container">
    <div class="rtl d-flex justify-lg-space-between align-center w-100 mb-6">
      <div>زمان : <span>{{ formattedTimer }}</span></div>
      <div>تعداد حرکت : <span>{{ remainingMoves }}</span></div>
    </div>
    <div class="pr-container">
      <div v-for="(item, index) in images" :key="index" class="pr-item">
        <div
            :class="[
            'pr-item__card',
            { 'pr-item__card--matched': item.active || item.matched },
          ]"
            @click="trollCard(index)"
        >
          <div class="pr-item__card--side front">
            <div
                class="pr-item__front--number h-100 d-flex align-center justify-center"
            >
              {{ index + 1 }}
            </div>
          </div>
          <div class="pr-item__card--side back">
            <div class="pr-item__back--image">
              <img :src="item.image" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 mt-6">
      <v-btn @click="restart" v-if="gameOver" color="warning" elevation="0" size="large">
        <div class="text-black"> شروع دوباره</div>
      </v-btn>
    </div>

  </div>
</template>
<style scoped lang="scss">
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 25%;
  margin: 0 auto;
}

.pr-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.pr-item {
  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    perspective: 150rem;
    position: relative;
    height: 100px;
    width: 100px;
    cursor: pointer;
    box-shadow: none;
    background: none;


    &--side {
      height: 35rem;
      border-radius: 15px;
      transition: all 0.8s ease;
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      color: #fff;
    }

    .pr-item__front--number {
      font-size: 22px;
    }

    .back {
      transform: rotateY(-180deg);
      height: 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .front {
      background-color: #dc3755;
      height: 100%;
      border-radius: 10px;
    }

    &--matched .front {
      transform: rotateY(180deg);
    }

    &--matched .back {
      transform: rotateY(0deg);
      cursor: default;
    }
  }
}
</style>
