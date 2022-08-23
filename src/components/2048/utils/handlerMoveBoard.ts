import {
  GameStatus,
  GameRow
} from '../types/gameType';

import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT
} from '../constant'

interface NewGameStatusResult {
  gameStatus: GameStatus;
}
/**
 * [
 *    [00, 01, 02, 03]
 *    [10, 11, 12, 13]
 *    [20, 21, 22, 23]
 *    [30, 31, 32, 33]
 * ]
 */
export const getMoveUpStatus = (_gameStatus: GameStatus): NewGameStatusResult => {
  const gameStatus: GameStatus = JSON.parse(JSON.stringify(_gameStatus));
  const delBoardRow: GameRow = []; // 多添加一行来存储即将要删除的元素

  for (let r = 1; r < gameStatus.length; r++) {
    const row = gameStatus[r];
    for (let c = 0; c < row.length; c++) {
      const board = gameStatus[r][c];
      
      if (!board) {
        continue
      }
      console.log('当前移动块：', 'row: ',  r, 'col: ', c);

      for (let checkRowIndex = r - 1; checkRowIndex > -1; checkRowIndex--) {
        console.log('当前检查块：', 'row: ', checkRowIndex, 'col: ', c);
        const checkBoard = gameStatus[checkRowIndex][c];
        console.log('checkBoard: ', checkBoard);

        // 上方没有其它格子
        if (!checkBoard && checkRowIndex === 0) {
          console.log('上方没有其它格子')
          board.row = checkRowIndex;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex][c] = board;
          console.log(JSON.parse(JSON.stringify(gameStatus)));
        } else if (checkBoard !== null && checkBoard.num === board.num) {
          // 撞上了一样的数字
          console.log('撞上了一样的数字')
          checkBoard.num = checkBoard.num * 2;
          board.row = checkBoard.row;
          gameStatus[r][c] = null;
          delBoardRow.push(board);
        } else if (checkBoard !== null && checkBoard.num !== board.num) {
          // 撞上了不一样的数字
          console.log('撞上了不一样的数字')
          board.row = checkBoard.row + 1;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex + 1][c] = board;
        }
      }
    }
  }

  if (delBoardRow.length) {
    gameStatus[GAME_COL_COUNT] = delBoardRow; 
  }

  const newGameStatusResult = {
    gameStatus
  }
  
  return newGameStatusResult;
}