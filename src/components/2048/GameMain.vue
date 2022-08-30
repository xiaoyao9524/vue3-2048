<template>
  <div class="game-main">
    <game-header :score="score" :bestScore="bestScore" />
    <section class="above-game">
      <div class="tips">
        <p class="tip-item">组合数字最终达到<strong>2048</strong>!!!</p>
        <a class="go-learn" href="javascript:void(0);">怎么玩？→</a>
      </div>

      <a class="new-game-btn" href="javascript:;" @click="startNewGame">新游戏</a>
    </section>

    <section class="game-container-wrapper">
      <game-container
        ref="gameContainerRef"
        @scoreChange="handlerScoreChange"
        @bestScoreChange="handlerBestScoreChange"
        @gameOver="handlerGameOver"
      />
      <game-over ref="gameOverRef" @tryAgain="startNewGame" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameContainer from "./components/GameContainer.vue";
import GameHeader from "./components/GameHeader.vue";
import GameOver from './components/GameOver.vue';

const gameContainerRef = ref<InstanceType<typeof GameContainer> | null>(null);
const gameOverRef = ref<InstanceType<typeof GameOver> | null>(null);

const score = ref(0);
const bestScore = ref(0);

const handlerScoreChange = (newScore: number) => {
  score.value = newScore;
};

const handlerBestScoreChange = (newBestScore: number) => {
  bestScore.value = newBestScore;
};

// import useResize from "@/hooks/useResize";

// const innerWidth = useResize();

const handlerGameOver = () => {
  gameOverRef.value?.open();
}

const startNewGame = () => {
  gameContainerRef.value?.startNewGame();
}
</script>

<style lang="scss" scoped>
.game-main {
  margin: 30px auto 0;
  padding: 20px;
  box-sizing: border-box;
  max-width: 500px;
  width: 100vw;

  .above-game {
    display: flex;
    .tips {
      flex: 1;
      line-height: 1.2;
      font-size: 18px;
      color: #776e65;

      .go-learn {
        color: #776e65;
      }
    }
    .new-game-btn {
      flex: 0 0 auto;
      background: #8f7a66;
      border-radius: 3px;
      padding: 0 20px;
      color: #f9f6f2;
      height: 40px;
      line-height: 42px;
      cursor: pointer;
      text-align: center;
      flex-shrink: 0;
    }
  }

  .game-container-wrapper {
    margin: 40px auto 0;
    /* margin-top: 40px; */
    padding: 12px;
    width: 460px;
    box-sizing: border-box;
    border-radius: 6px;
    background: #bbada0;
  }
}
</style>

<style lang="scss" scoped>
@media only all and (max-width: 750px) {
  .game-main {
    padding: 10px;

    .above-game {
      .tips {
        font-size: 14px;
      }
    }

    .game-container-wrapper {
      position: relative;
      margin-top: 20px;
      padding: 10px;
      width: 355px;
    }
  }
}
</style>
