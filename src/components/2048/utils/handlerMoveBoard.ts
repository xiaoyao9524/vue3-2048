import {
  GameStatus,
  GameRow
} from '../types/gameType';

import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT
} from '../constant'

/**
 * up:
 * [
 *  [00, 01, 02, 03]
 *  [10, 11, 12, 13]
 *  [20, 21, 22, 23]
 *  [30, 31, 32, 33]
 * ]
 * 转换后：
 * [
 *  [00, 10, 20, 30]
 *  [01, 11, 21, 31]
 *  [02, 12, 22, 32]
 *  [03, 13, 23, 33]
 * ]
 */

export const transferMoveUp = (gameStatus: GameStatus) => {
  const ret: GameStatus = [];

  for (let row = 0; row < GAME_ROW_COUNT; row++) {
    ret.push([]);
  } 

  for (let row = 0; row < GAME_ROW_COUNT; row++) {
    for (let col = 0; col < GAME_COL_COUNT; col++) {
      const board = gameStatus[row][col];
      console.log('board: ', board);
      

      ret[col].push(board);
    }
  }

  console.log('upData: ', ret)
  return ret;
}