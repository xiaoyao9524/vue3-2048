<template>
  <div class="game-main">
    <game-header />
    <section class="above-game">
      <div class="tips">
        <p class="tip-item">组合数字最终达到<strong>2048</strong>!!!</p>
        <a class="go-learn" href="javascript:void(0);">怎么玩？→</a>
      </div>

      <a class="new-game-btn" href="javascript:;">新游戏</a>
    </section>

    <section class="game-container-wrapper">
      <game-container />
    </section>
  </div>
</template>

<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue";
import GameHeader from "./components/GameHeader.vue";

// import useResize from "@/hooks/useResize";

// const innerWidth = useResize();
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
      margin-top: 20px;
      padding: 10px;
      width: 355px;
    }
  }
}
</style>
