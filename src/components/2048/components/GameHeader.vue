<template>
  <header class="head">
    <h1 class="title">2048</h1>
    <div class="score-wrapper">
      <div class="score">
        <h3 class="label">score</h3>
        <p class="value">{{ props.score }}</p>
      </div>
      <div class="best">
        <h3 class="label">best</h3>
        <p class="value">{{ props.bestScore }}</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  score: number;
  bestScore: number;
}>();
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  /* align-items: flex-end; */
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
</style>

<style lang="scss" scoped>
@media only all and (max-width: 750px) {
  .head {
    margin-bottom: 10px;
    .title {
      margin-top: 18px;
      font-size: 28px;
    }
  }
}
</style>
