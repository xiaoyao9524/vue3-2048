<template>
  <div class="game-main">
    <div class="game-row">
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
    </div>
    <div class="game-row">
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
    </div>
    <div class="game-row">
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
    </div>
    <div class="game-row">
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
      <div class="game-tile"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'

// const gameStatus = ref([
//   [
    
//   ]
// ])
</script>

<style scoped lang="scss">
.game-main {
  touch-action: none;
  .game-row {
    margin-bottom: 15px;
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
    display: flex;
    .game-tile {
      flex: 1;
      margin-right: 15px;
      width: 107px;
      height: 107px;
      line-height: 107px;
      border-radius: 3px;
      background: rgba(238, 228, 218, 0.35);
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
    }
  }
}
</style>
