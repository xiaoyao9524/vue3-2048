<template>
  <div class="container">
    <!-- <test-fade /> -->
    <!-- <p>innerWidth: {{innerWidth}}</p> -->
    <header class="head">
      <h1 class="title">2048</h1>
      <div class="score-wrapper">
        <div class="score">
          <h3 class="label">score</h3>
          <p class="value">24</p>
        </div>
        <div class="best">
          <h3 class="label">best</h3>
          <p class="value">48</p>
        </div>
      </div>
    </header>
    <section class="above-game">
      <div class="tips">
        <p class="tip-item">组合数字最终达到<strong>2048</strong>!!!</p>
        <a class="go-learn" href="javascript:void(0);">怎么玩？→</a>
      </div>

      <a class="new-game-btn" href="javascript:;">新游戏</a>
    </section>

    <section class="game-container">
      <game-main />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import GameMain from './components/GameMain.vue'
// import TestFade from './components/TestFade.vue';

const innerWidth = ref(window.innerWidth);

// const title = ref("hello");
window.addEventListener('resize', e => {
  console.log('resize: ', window.innerWidth);
  innerWidth.value = window.innerWidth;
})
</script>

<style lang="scss" scoped>
.container {
  margin: 30px auto 0;
  padding: 20px;
  box-sizing: border-box;
  width: 500px;
  .head {
    display: flex;
    .title {
      flex: 1;
      font-size: 80px;
      font-weight: bold;
      color: #776e65;
    }
    .score-wrapper {
      flex: 0 0 auto;
      display: flex;
      height: 56px;
      .score {
        margin-right: 5px;
      }
      .score,
      .best {
        flex: 1;
        padding: 0 25px;
        text-align: center;
        border-radius: 3px;
        background: #bbada0;
        .label {
          margin-top: 4px;
          font-size: 14px;
          line-height: 13px;
          color: #eee4da;
        }
        .value {
          font-size: 26px;
          height: 38px;
          line-height: 38px;
          font-weight: bold;
          border-radius: 3px;
          color: white;
          text-align: center;
        }
      }
    }
  }

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

  .game-container {
    margin-top: 40px;
    padding: 15px;
    /* width: 470px;
    height: 470px; */

    border-radius: 6px;
    background: #bbada0;
  }
}
</style>
