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
          [`key-${board.id}`]: true,
        }"
        @click="test"
      >
        <Transition name="board-fade" appear>
          <div v-if="board.num" class="board-inner">{{ board.num }}</div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, watch } from "vue";

// hooks
import useKeyDown from "../hooks/useKeyDown";

// constant
import { GAME_ROW_COUNT, GAME_COL_COUNT } from "../constant";

//types
import { GameStatus, GameBoard } from "../types/gameType";

// utils
import { initGameStatus, createNewBoard } from "../utils/gameStatus";
import { getMoveUpStatus } from "../utils/handlerMoveBoard";

const emit = defineEmits<{
  (e: "scoreChange", value: number): void;
}>();

const gameStatus = ref<GameStatus>([]);
gameStatus.value = initGameStatus();

const score = ref(0);

// 移动完创建下一个元素的间隔
const createNextInterval = 100;
// 移动完删除元素的间隔
const deleteBoardInterval = 100;

const createBoard = () => {
  const newBoard = createNewBoard(gameStatus.value);

  if (!newBoard) {
    return;
  }

  const newGameStatus = JSON.parse(JSON.stringify(gameStatus.value));

  const { row, col, board } = newBoard;

  newGameStatus[row][col] = board;

  console.log("新增元素后修改状态...");
  gameStatus.value = newGameStatus;
};

// 创建初始元素
for (let i = 0; i < 2; i++) {
  createBoard();
}

// 将二维数组转化为一维
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

  ret.sort((a, b) => Number(a.id) - Number(b.id));

  return ret;
});

const test = () => {
  //
};

const handlerMoveUp = () => {
  const newGameStatus = getMoveUpStatus(gameStatus.value);

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
      width: 100px;
      height: 100px;
      border-radius: 3px;
      box-shadow: 0 30px 10px rgb(243 215 116 / 0%), inset 0 0 0 1px rgb(255 255 255 / 0%);
      transform: translate(0px, 0px);
      transition: 0.15s;
      .board-inner {
        text-align: center;
        font-weight: bold;
        font-size: 35px;
        line-height: 100px;
      }
      &.val-2,
      &.val-4 {
        .board-inner {
          background: #eee4da;
        }
      }
      &.val-8 {
        .board-inner {
          color: #f9f6f2;
          background: #f3b27a;
        }
      }
      &.val-16 {
        .board-inner {
          color: #f9f6f2;
          background: #f69664;
        }
      }
      &.val-32 {
        .board-inner {
          color: #f9f6f2;
          background: #f77c5f;
        }
      }
      &.val-64 {
        .board-inner {
          color: #f9f6f2;
          background: #f75f3b;
        }
      }
      &.val-128 {
        .board-inner {
          color: #f9f6f2;
          background: #edd073;
          box-shadow: 0 0 30px 10px rgb(243 215 116 / 24%),
            inset 0 0 0 1px rgb(255 255 255 / 14%);
          font-size: 45px;
        }
      }
      &.val-256 {
        .board-inner {
          color: #f9f6f2;
          background: #edcc62;
          box-shadow: 0 0 30px 10px rgb(243 215 116 / 32%),
            inset 0 0 0 1px rgb(255 255 255 / 19%);
          font-size: 45px;
        }
      }
      &.val-512 {
        .board-inner {
          color: #f9f6f2;
          background: #edc950;
          box-shadow: 0 0 30px 10px rgb(243 215 116 / 40%),
            inset 0 0 0 1px rgb(255 255 255 / 24%);
          font-size: 45px;
        }
      }
      &.val-1024 {
        .board-inner {
          color: #f9f6f2;
          background: #edc53f;
          box-shadow: 0 0 30px 10px rgb(243 215 116 / 48%),
            inset 0 0 0 1px rgb(255 255 255 / 29%);
          font-size: 35px;
        }
      }
      &.val-2048,
      &.val-4096,
      &.val-8192 {
        .board-inner {
          color: #f9f6f2;
          background: #edc22e;
          box-shadow: 0 0 30px 10px rgb(243 215 116 / 56%),
            inset 0 0 0 1px rgb(255 255 255 / 33%);
          font-size: 35px;
        }
      }

      &.position-0-0 {
        transform: translate(0px, 0px);
      }
      &.position-0-1 {
        transform: translate(112px, 0px);
      }
      &.position-0-2 {
        transform: translate(224px, 0px);
      }
      &.position-0-3 {
        transform: translate(336px, 0px);
      }

      &.position-1-0 {
        transform: translate(0px, 112px);
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
        transform: translate(0px, 224px);
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
        transform: translate(0px, 336px);
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

.board-fade-enter-active{
  transition: .08s;
}

.board-fade-enter-from{
  transform: scale(0.6);
}

.board-fade-enter-to {
  transform: scale(1);
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
        border-radius: 3px;
        /* background: #eee4da; */
        .board-inner {
          font-size: 35px;
          line-height: $board-width;
        }

        &.val-128,
        &.val-256,
        &.val-512 {
          .board-inner {
            font-size: 25px;
          }
        }
        &.val-1024 {
          .board-inner {
            font-size: 15px;
          }
        }
        &.val-2048,
        &.val-4096,
        &.val-8192 {
          .board-inner {
            font-size: 15px;
          }
        }

        &.position-0-0 {
          transform: translate(0px, 0px);
        }
        &.position-0-1 {
          transform: translate(86px, 0px);
        }
        &.position-0-2 {
          transform: translate(172px, 0px);
        }
        &.position-0-3 {
          transform: translate(258px, 0px);
        }

        &.position-1-0 {
          transform: translate(0px, 86px);
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
          transform: translate(0px, 172px);
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
          transform: translate(0px, 258px);
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
