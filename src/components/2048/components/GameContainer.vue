<template>
  <div class="game-container">
    <div class="row-container">
      <div v-for="r in GAME_ROW_COUNT" :key="r" class="game-row">
        <div v-for="c in GAME_COL_COUNT" :key="c" class="game-board"></div>
      </div>
    </div>
    <div class="board-container">
      <div class="board-item val-2 position-0-0">2</div>
      <div class="board-item val-4 position-0-1">4</div>
      <div class="board-item val-8 position-0-2">8</div>
      <div class="board-item val-16 position-0-3">16</div>

      <div class="board-item val-32 position-1-0">32</div>
      <div class="board-item val-64 position-1-1">64</div>
      <div class="board-item val-128 position-1-2">128</div>
      <div class="board-item val-256 position-1-3">256</div>

      <div class="board-item val-512 position-2-0">512</div>
      <div class="board-item val-1024 position-2-1">1024</div>
      <div class="board-item val-2048 position-2-2">2048</div>
      <div class="board-item val-4096 position-2-3">4096</div>

      <div class="board-item val-2 position-3-0">2</div>
      <div class="board-item val-4 position-3-1">4</div>
      <div class="board-item val-8 position-3-2">8</div>
      <div class="board-item val-16 position-3-3">16</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import random from "random";

// constant
import { GAME_ROW_COUNT, GAME_COL_COUNT } from "../constant";

//types
import { GameStatus } from "../types/gameType";

// utils
import { initGameStatus, createBoard } from "../utils/gameStatus";

const gameStatus = ref<GameStatus>([]);
gameStatus.value = initGameStatus();

for (let i = 0; i < 2; i++) {
  const newBoard = createBoard(gameStatus.value);

  if (!newBoard) {
    break;
  }

  const { row, col, board } = newBoard;

  console.log(row, col);

  gameStatus.value[row][col] = board;
}

console.log("gameStatus: ", gameStatus.value);

// createBoard(gameStatus.value);
// for (let i = 0; i < 10; i++) {
//   console.log(findRandomEmptyBoard(gameStatus.value));
// }

/*
testRandom();
function testRandom () {
  const obj: any = {};

  for (let i = 0; i < 100; i++) {
    const num = random.int(0, 4);
    if (obj[num]) {
      obj[num]++;
    } else {
      obj[num] = 1;
    }
  }

  console.log(obj);
}
*/
</script>

<style scoped lang="scss">
.game-container {
  position: relative;
  z-index: 1;
  touch-action: none;
  .row-container {
    position: relative;
    z-index: 2;
    .game-row {
      display: flex;
      margin-bottom: 12px;
      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
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

  .board-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    .board-item {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 5;
      text-align: center;
      font-weight: bold;
      width: 100px;
      height: 100px;
      font-size: 35px;
      line-height: 100px;
      border-radius: 3px;
      box-shadow: 0 30px 10px rgb(243 215 116 / 0%), inset 0 0 0 1px rgb(255 255 255 / 0%);
      transition: .1s easy-in-out;
      &.val-2 {
        background: #eee4da;
      }
      &.val-4 {
        background: #eee1c9;
      }
      &.val-8 {
        color: #f9f6f2;
        background: #f3b27a;
      }
      &.val-16 {
        color: #f9f6f2;
        background: #f69664;
      }
      &.val-32 {
        color: #f9f6f2;
        background: #f77c5f;
      }
      &.val-64 {
        color: #f9f6f2;
        background: #f75f3b;
      }
      &.val-128 {
        color: #f9f6f2;
        background: #edd073;
        box-shadow: 0 0 30px 10px rgb(243 215 116 / 24%),
          inset 0 0 0 1px rgb(255 255 255 / 14%);
        font-size: 45px;
      }
      &.val-256 {
        color: #f9f6f2;
        background: #edcc62;
        box-shadow: 0 0 30px 10px rgb(243 215 116 / 32%),
          inset 0 0 0 1px rgb(255 255 255 / 19%);
        font-size: 45px;
      }
      &.val-512 {
        color: #f9f6f2;
        background: #edc950;
        box-shadow: 0 0 30px 10px rgb(243 215 116 / 40%),
          inset 0 0 0 1px rgb(255 255 255 / 24%);
        font-size: 45px;
      }
      &.val-1024 {
        color: #f9f6f2;
        background: #edc53f;
        box-shadow: 0 0 30px 10px rgb(243 215 116 / 48%),
          inset 0 0 0 1px rgb(255 255 255 / 29%);
        font-size: 35px;
      }
      &.val-2048,
      &.val-4096,
      &.val-8192 {
        color: #f9f6f2;
        background: #edc22e;
        box-shadow: 0 0 30px 10px rgb(243 215 116 / 56%),
          inset 0 0 0 1px rgb(255 255 255 / 33%);
        font-size: 35px;
      }

      &.position-0-0 {
        transform: translate(0, 0);
      }
      &.position-0-1 {
        transform: translate(112px, 0);
      }
      &.position-0-2 {
        transform: translate(224px, 0);
      }
      &.position-0-3 {
        transform: translate(336px, 0);
      }

      &.position-1-0 {
        transform: translate(0, 112px);
      }
      &.position-1-1 {
        transform: translate(112px, 112px);
      }
      &.position-1-2 {
        transform: translate(224px, 112px);
      }
      &.position-1-3 {
        transform: translate(336px, 112px);
      }

      &.position-2-0 {
        transform: translate(0, 224px);
      }
      &.position-2-1 {
        transform: translate(112px, 224px);
      }
      &.position-2-2 {
        transform: translate(224px, 224px);
      }
      &.position-2-3 {
        transform: translate(336px, 224px);
      }

      &.position-3-0 {
        transform: translate(0, 336px);
      }
      &.position-3-1 {
        transform: translate(112px, 336px);
      }
      &.position-3-2 {
        transform: translate(224px, 336px);
      }
      &.position-3-3 {
        transform: translate(336px, 336px);
      }
    }
  }
}

@media only all and (max-width: 750px) {
  $board-width: 76px;
  $board-margin: 10px;

  .game-container {
    .row-container {
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

    .board-container {
      .board-item {
        width: $board-width;
        height: $board-width;
        font-size: 35px;
        line-height: $board-width;
        border-radius: 3px;
        background: #eee4da;

        &.val-128,
        &.val-256,
        &.val-512 {
          font-size: 25px;
        }
        &.val-1024 {
          font-size: 15px;
        }
        &.val-2048,
        &.val-4096,
        &.val-8192 {
          font-size: 15px;
        }

        &.position-0-0 {
          transform: translate(0, 0);
        }
        &.position-0-1 {
          transform: translate(86px, 0);
        }
        &.position-0-2 {
          transform: translate(172px, 0);
        }
        &.position-0-3 {
          transform: translate(258px, 0);
        }

        &.position-1-0 {
          transform: translate(0, 86px);
        }
        &.position-1-1 {
          transform: translate(86px, 86px);
        }
        &.position-1-2 {
          transform: translate(172px, 86px);
        }
        &.position-1-3 {
          transform: translate(258px, 86px);
        }

        &.position-2-0 {
          transform: translate(0, 172px);
        }
        &.position-2-1 {
          transform: translate(86px, 172px);
        }
        &.position-2-2 {
          transform: translate(172px, 172px);
        }
        &.position-2-3 {
          transform: translate(258px, 172px);
        }

        &.position-3-0 {
          transform: translate(0, 258px);
        }
        &.position-3-1 {
          transform: translate(86px, 258px);
        }
        &.position-3-2 {
          transform: translate(172px, 258px);
        }
        &.position-3-3 {
          transform: translate(258px, 258px);
        }
      }
    }
  }
}
</style>
