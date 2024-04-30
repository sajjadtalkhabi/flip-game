<script setup>
import GameBoard from "./components/GameBoard.vue";
</script>

<template>
  <v-app>
    <v-main>
      <GameBoard :game-moves="40" :game-timer="120" />
    </v-main>
  </v-app>
</template>
