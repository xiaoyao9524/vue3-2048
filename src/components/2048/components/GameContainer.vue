<template>
  <div ref="gameContainerEl" class="game-container" @touchstart="handlerTouchStart" @touchmove="handlerTouchMove">
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
      >
        <Transition name="board-fade" appear>
          <div class="board-inner">{{ board.num }}</div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, watch, defineExpose, onMounted, onUnmounted } from 'vue';

// hooks
import useKeyDown from "../hooks/useKeyDown";
import useTouch from "../hooks/useTouch";

// constant
import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT,
  GAME_2048_BEST_SCORE_LOCAL_SAVE_KEY,
} from "../constant";

//types
import { GameStatus, GameBoard, GameDirection } from "../types/gameType";

// utils
import { initGameStatus, createNewBoard, checkGameIsOver } from "../utils/gameStatus";

import type { NewGameStatusResult } from "../utils/handlerMoveBoard";
import {
  getMoveUpStatus,
  getMoveRightStatus,
  getMoveDownStatus,
  getMoveLeftStatus,
} from "../utils/handlerMoveBoard";

const emit = defineEmits<{
  (e: "scoreChange", score: number): void;
  (e: "bestScoreChange", bestScore: number): void;
  (e: "gameOver"): void;
}>();

const gameContainerEl = ref<HTMLElement>();

const gameStatus = ref<GameStatus>([]);
gameStatus.value = initGameStatus();

/*
gameStatus.value = [
  [
    {
      id: 1,
      num: 2,
      row: 0,
      col: 0,
    },
    {
      id: 2,
      num: 4,
      row: 0,
      col: 1,
    },
    {
      id: 3,
      num: 2,
      row: 0,
      col: 2,
    },
    {
      id: 4,
      num: 4,
      row: 0,
      col: 3,
    },
  ],
  [
    {
      id: 5,
      num: 4,
      row: 1,
      col: 0,
    },
    {
      id: 6,
      num: 2,
      row: 1,
      col: 1,
    },
    {
      id: 7,
      num: 4,
      row: 1,
      col: 2,
    },
    {
      id: 8,
      num: 2,
      row: 1,
      col: 3,
    },
  ],
  [
    {
      id: 9,
      num: 2,
      row: 2,
      col: 0,
    },
    {
      id: 10,
      num: 4,
      row: 2,
      col: 1,
    },
    {
      id: 11,
      num: 2,
      row: 2,
      col: 2,
    },
    {
      id: 12,
      num: 4,
      row: 2,
      col: 3,
    },
  ],
  [null, null, null, null],
];
*/
const score = ref(0);

// ?????????
const localBestScore = localStorage.getItem(GAME_2048_BEST_SCORE_LOCAL_SAVE_KEY);
const bestScore = ref(localBestScore ? Number(localBestScore) : 0);
emit("bestScoreChange", bestScore.value);

const isGameOver = ref(false);

// ???????????????????????????????????????
const createNextInterval = 100;
// ??????????????????????????????
const deleteBoardInterval = 100;

const createBoard = () => {
  const newBoard = createNewBoard(gameStatus.value);

  if (!newBoard) {
    return;
  }

  const newGameStatus = JSON.parse(JSON.stringify(gameStatus.value));

  const { row, col, board } = newBoard;

  newGameStatus[row][col] = board;

  gameStatus.value = newGameStatus;
};

// ??????????????????
for (let i = 0; i < 2; i++) {
  createBoard();
}

// ??????????????????????????????
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

// ????????????????????????
const checkGameOver = () => {
  const checkResult = checkGameIsOver(gameStatus.value);

  if (checkResult) {
    isGameOver.value = true;
    emit("gameOver");
  }
};

// ??????????????????
const innerGameContainerBoards = computed(() => {
  const ret: GameBoard[] = [];

  for (let row = 0; row < GAME_ROW_COUNT; row++) {
    for (let col = 0; col < GAME_COL_COUNT; col++) {
      if (!gameStatus.value[row]) {
        break;
      }
      const board = gameStatus.value[row][col];

      if (board) {
        ret.push(board);
      }
    }
  }

  ret.sort((a, b) => Number(a.id) - Number(b.id));

  return ret;
});

watch(innerGameContainerBoards, (val) => {
  if (val.length >= GAME_ROW_COUNT * GAME_COL_COUNT) {
    checkGameOver();
  }
});

const handlerMove = (direction: GameDirection) => {
  let newGameStatus: NewGameStatusResult | null = null;

  switch (direction) {
    case "up":
      newGameStatus = getMoveUpStatus(gameStatus.value);
      break;
    case "down":
      newGameStatus = getMoveDownStatus(gameStatus.value);
      break;
    case "left":
      newGameStatus = getMoveLeftStatus(gameStatus.value);
      break;
    case "right":
      newGameStatus = getMoveRightStatus(gameStatus.value);
      break;
    default:
      // newGameStatus = gameStatus.value;
      return;
  }

  if (newGameStatus) {
    handlerAfterMovingUpdateStatus(newGameStatus);
  }
};

const handlerAfterMovingUpdateStatus = (newGameStatus: NewGameStatusResult) => {
  gameStatus.value = newGameStatus.gameStatus;

  score.value += newGameStatus.score;
  emit("scoreChange", score.value);

  if (bestScore.value < score.value) {
    bestScore.value = score.value;
    localStorage.setItem(GAME_2048_BEST_SCORE_LOCAL_SAVE_KEY, `${score.value}`);
    emit("bestScoreChange", bestScore.value);
  }

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

// ???????????????
const startNewGame = () => {
  score.value = 0;
  emit("scoreChange", 0);

  gameStatus.value = initGameStatus();

  for (let i = 0; i < 2; i++) {
    createBoard();
  }

  isGameOver.value = false;
};

defineExpose({
  startNewGame,
});

const eventHandler = {
  up: () => {
    handlerMove("up");
  },
  left: () => {
    handlerMove("left");
  },
  right: () => {
    handlerMove("right");
  },
  down: () => {
    handlerMove("down");
  },
};

const {
  handlerTouchStart,
  handlerTouchMove,
  handlerTouchEnd
} = useTouch(eventHandler)

// ?????????touch??????
onMounted(() => {
  document.addEventListener('touchend', handlerTouchEnd);
});
onUnmounted(() => {
  document.removeEventListener('touchend', handlerTouchEnd);
});

// ?????????????????????
useKeyDown(eventHandler);
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

.board-fade-enter-active {
  transition: 0.08s;
}

.board-fade-enter-from {
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
