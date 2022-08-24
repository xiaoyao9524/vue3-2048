<template>
  <div class="game-container">
    <div class="row-container">
      <div v-for="r in GAME_ROW_COUNT" :key="r" class="game-row">
        <div v-for="c in GAME_COL_COUNT" :key="c" class="game-board"></div>
      </div>
    </div>
    <div class="board-container">
      <div
        v-for="board in renderBoards"
        :key="board.id"
        :class="{
          'board-item': true,
          [`val-${board.num}`]: true,
          [`position-${board.row}-${board.col}`]: true,
        }"
        @click="test(board)"
      >
        {{ board.num }}
      </div>
      <!-- <div class="board-item val-2 position-0-0">2</div>
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
      <div class="board-item val-16 position-3-3">16</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import random from "random";

// hooks
import useKeyDown from "../hooks/useKeyDown";

// constant
import { GAME_ROW_COUNT, GAME_COL_COUNT } from "../constant";

//types
import { GameStatus, GameBoard, GameRow } from "../types/gameType";

// utils
import { initGameStatus, createNewBoard } from "../utils/gameStatus";
import { getMoveUpStatus } from "../utils/handlerMoveBoard";

const emit = defineEmits<{
  (e: "scoreChange", value: number): void;
}>();

const gameStatus = ref<GameStatus>([]);
gameStatus.value = initGameStatus();
/*
gameStatus.value = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [
    {
      id: "test1",
      row: 3,
      col: 0,
      num: 2,
    },
    {
      id: "test2",
      row: 3,
      col: 1,
      num: 2,
    },
    {
      id: "test3",
      row: 3,
      col: 2,
      num: 4,
    },
    {
      id: "test4",
      row: 3,
      col: 3,
      num: 4,
    },
  ],
];
*/
const score = ref(0);

const createNextInterval = 500;

const deleteBoardInterval = 500;

const createBoard = () => {
  const newBoard = createNewBoard(gameStatus.value);

  if (!newBoard) {
    return;
  }

  const newGameStatus = JSON.parse(JSON.stringify(gameStatus.value))

  const { row, col, board } = newBoard;

  console.log(row, col);

  newGameStatus[row][col] = board;

  gameStatus.value = newGameStatus;
};

for (let i = 0; i < 2; i++) {
  createBoard();
}
/*
gameStatus.value[1][0] = {
  id: 'fksdlg',
  num: 4,
  row: 1,
  col: 0

}

gameStatus.value[2][0] = {
  id: 'gsdger',
  num: 4,
  row: 2,
  col: 0
}

gameStatus.value[1][1] = {
  id: 'gdfg',
  num: 2,
  row: 1,
  col: 1
}

gameStatus.value[2][1] = {
  id: 'hdhnfg',
  num: 4,
  row: 2,
  col: 1
}

gameStatus.value[1][2] = {
  id: 'gdhergd',
  num: 4,
  row: 1,
  col: 2
}

gameStatus.value[2][2] = {
  id: 'etrgfd',
  num: 2,
  row: 2,
  col: 2
}

gameStatus.value[3][2] = {
  id: 'etrgfd',
  num: 2,
  row: 3,
  col: 2
}
*/

/*
gameStatus.value[0][3] = {
  id: 'etrgfd',
  num: 4,
  row: 0,
  col: 3
}

gameStatus.value[1][3] = {
  id: 'flksdjf',
  num: 4,
  row: 1,
  col: 3
}

gameStatus.value[2][3] = {
  id: 'ghodsg',
  num: 2,
  row: 2,
  col: 3
}

gameStatus.value[3][3] = {
  id: 'begrdf',
  num: 2,
  row: 3,
  col: 3
}
*/
console.log("gameStatus: ", gameStatus.value);

// 将二维数组转化为普通数组
const renderBoards = computed(() => {
  const ret: GameBoard[] = [];

  for (let row = 0; row < gameStatus.value.length; row++) {
    for (let col = 0; col < gameStatus.value[row].length; col++) {
      const board = gameStatus.value[row][col];

      if (board) {
        ret.push(board);
      }
    }
  }

  return ret;
});

const test = (board: GameBoard) => {
  const newGameStatus = JSON.parse(JSON.stringify(gameStatus.value));
  

  gameStatus.value = newGameStatus;
};

// console.log('测试转换：', getMoveUpStatus(gameStatus.value));

const handlerMoveUp = () => {
  const newGameStatus = getMoveUpStatus(gameStatus.value);
  console.log("up: ", newGameStatus.gameStatus);
  gameStatus.value = newGameStatus.gameStatus;

  score.value += newGameStatus.score;
  emit("scoreChange", score.value);

  if (newGameStatus.gameStatus[GAME_ROW_COUNT]) {
    if (newGameStatus.isMove) {
      setTimeout(() => {
        const _newGameStatus = [...gameStatus.value].slice(
          0,
          gameStatus.value.length - 1
        );

        gameStatus.value = _newGameStatus;

        setTimeout(() => {
          createBoard();
        }, createNextInterval);
      }, deleteBoardInterval);
    }
  } else {
    if (newGameStatus.isMove) {
      setTimeout(() => {
        createBoard();
      }, createNextInterval);
    }
  }
};

// 初始化键盘事件
useKeyDown({
  up: handlerMoveUp,
  left: () => {
    console.log("left: ");
  },
  right: () => {
    console.log("right: ");
  },
  down: () => {
    console.log("bottom: ");
  },
});

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
      transform: translate(0, 0);
      transition: 0.5s;
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
