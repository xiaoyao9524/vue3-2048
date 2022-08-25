import random from 'random';
import createId from './createId';

import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT
} from '../constant';

import {
  GameBoard,
  GameRow,
  GameStatus
} from '../types/gameType';

export function initGameStatus (): GameStatus {
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
interface EmptyPosition {
  row: number;
  col: number;
}
export function findEmptyBoardPositionList (gameStatus: GameStatus) {
  const ret: EmptyPosition[] = [];

  for (let r = 0; r < GAME_ROW_COUNT; r++) {
    for (let c = 0; c < GAME_COL_COUNT; c++) {
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
export function findRandomEmptyBoard (gameStatus: GameStatus): EmptyPosition | null {
  const emptyPositionList = findEmptyBoardPositionList(gameStatus);

  if (!emptyPositionList.length) {
    return null;
  } else if (emptyPositionList.length === 1) {
    return emptyPositionList[0];
  }

  const randomIndex = random.int(0, emptyPositionList.length - 1);

  return emptyPositionList[randomIndex];
}

export function getNextBoardId (gameStatus: GameStatus) {
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

export function createNewBoard (gameStatus: GameStatus) {
  const emptyPosition = findRandomEmptyBoard(gameStatus);

  if (!emptyPosition) {
    return false
  }

  const {
    row,
    col
  } = emptyPosition;

  const randomNum = random.int(0, 10);

  const board: GameBoard = {
    id: getNextBoardId(gameStatus),
    row,
    col,
    num: randomNum < 10 ? 2 : 4
  }

  return {
    row,
    col,
    board
  };
}
