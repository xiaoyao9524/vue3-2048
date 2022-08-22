<template>
  <div class="game-container">
    <div v-for="i in 4" :key="i" class="game-row">
      <div class="game-board"></div>
      <div class="game-board"></div>
      <div class="game-board"></div>
      <div class="game-board"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

//types
import {
  GameStatus
} from '../types/gameType';

// utils
import initGameStatus from '../utils/initGameStatus'


const gameStatus = ref<GameStatus>([])

gameStatus.value = initGameStatus();



</script>

<style scoped lang="scss">
.game-container {
  touch-action: none;
  .game-row {
    margin-bottom: 12px;
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
    display: flex;
    .game-board {
      flex: 0 0 auto;
      margin-right: 12px;
      width: 100px;
      height: 100px;
      line-height: 100px;
      border-radius: 3px;
      background: rgba(238, 228, 218, 0.35);
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
    }
  }
}

@media only all and (max-width: 750px) {
  $board-width: 76px;
  $board-margin: 10px;
  
  .game-container {
    .game-row {
      margin-bottom: $board-margin;
      .game-board {
        margin-right: $board-margin;
        width: $board-width;
        height: $board-width;
        line-height: $board-width;
      }
    }
  }
}
</style>
