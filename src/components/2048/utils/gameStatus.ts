import random from 'random';


import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT
} from '../constant';

import type {
  GameBoard,
  GameRow,
  GameStatus
} from '../types/gameType';

export function initGameStatus(): GameStatus {
  const gameStatus: GameStatus = [];

  for (let r = 0; r < GAME_ROW_COUNT; r++) {
    const row: GameRow = [];

    for (let c = 0; c < GAME_COL_COUNT; c++) {
      row.push(null);
    }

    gameStatus.push(row);
  }

  return gameStatus;
}

// 获取所有的空白块位置
interface BoardPosition {
  comment?: string;
  row: number;
  col: number;
}
export function findEmptyBoardPositionList(gameStatus: GameStatus) {
  const ret: BoardPosition[] = [];

  for (let r = 0; r < GAME_ROW_COUNT; r++) {
    for (let c = 0; c < GAME_COL_COUNT; c++) {
      if (!gameStatus[r]) {
        break;
      }
      const board = gameStatus[r][c];
      if (!board) {
        ret.push({
          row: r,
          col: c
        })
      }
    }
  }
  return ret;
}

// 获取一个随机的空白块位置
export function findRandomEmptyBoard(gameStatus: GameStatus): BoardPosition | null {
  const emptyPositionList = findEmptyBoardPositionList(gameStatus);

  if (!emptyPositionList.length) {
    return null;
  } else if (emptyPositionList.length === 1) {
    return emptyPositionList[0];
  }

  const randomIndex = random.int(0, emptyPositionList.length - 1);

  return emptyPositionList[randomIndex];
}

export function getNextBoardId(gameStatus: GameStatus) {
  let ids: number[] = [];

  for (const row of gameStatus) {
    for (const board of row) {
      if (board) {
        ids.push(board.id);
      }
    }
  }

  return ids.length ? Math.max(...ids) + 1 : 1;
}

type BoardInfoPartial = Partial<GameBoard>;
export interface NewBoardResult {
  row: number;
  col: number;
  board: GameBoard;
}
export function createNewBoard(gameStatus: GameStatus, boardInfo: BoardInfoPartial = {}): false | NewBoardResult {
  let emptyPosition = null;

  let id = boardInfo.id ? boardInfo.id : getNextBoardId(gameStatus);
  let row = boardInfo.row;
  let col = boardInfo.col;
  let num = boardInfo.num ? boardInfo.num : (random.int(0, 10) < 10 ? 2 : 4);

  if (row === undefined || col === undefined) {
    emptyPosition = findRandomEmptyBoard(gameStatus);

    if (!emptyPosition) {
      return false;
    }

    if (row === undefined) {
      row = emptyPosition.row;
    }

    if (col === undefined) {
      col = emptyPosition.col;
    }
  }

  const board: GameBoard = {
    id,
    row,
    col,
    num
  }

  return {
    row,
    col,
    board
  };
}

/**
 * [
 *    [00, 01, 02, 03]
 *    [10, 11, 12, 13]
 *    [20, 21, 22, 23]
 *    [30, 31, 32, 33]
 * ]
 */

export function checkGameIsOver (gameStatus: GameStatus): boolean {
  for (let r = 0; r < GAME_ROW_COUNT; r++) {
    for (let c = 0; c < GAME_COL_COUNT; c++) {
      const currentBoard = gameStatus[r][c];

      if (!currentBoard) {
        // 说明还有空位，游戏未结束
        return false;
      }

      let checkPoint: BoardPosition[] = [];

      const isTop = r === 0;
      const isBottom = r === GAME_ROW_COUNT - 1;
      const isLeft = c === 0;
      const isRight = c === GAME_COL_COUNT - 1;
      
      // 获取上方检查点
      if (!isTop) {
        checkPoint.push({
          comment: '上',
          row: r - 1,
          col: c
        })
      }

      // 获取左侧检查点
      if(!isLeft) {
        checkPoint.push({
          comment: '左',
          row: r,
          col: c - 1
        })
      }

      // 获取右侧检查点
      if(!isRight) {
        checkPoint.push({
          comment: '右',
          row: r,
          col: c + 1
        })
      }

      // 获取下方检查点
      if(!isBottom) {
        checkPoint.push({
          comment: '下',
          row: r + 1,
          col: c
        })
      }

      for (let checkPosition of checkPoint) {
        const {
          row,
          col
        } = checkPosition;
        const checkBoard = gameStatus[row][col];

        if (checkBoard && currentBoard.num === checkBoard.num) {
          // 周围有相同的块，可以移动，游戏未结束
          return false;
        }
      }
    }
  }

  return true;
}
