import createID from './createId';

import {
  GameStatus,
  GameRow,
  GameBoard
} from '../types/gameType';

import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT
} from '../constant'

interface NewGameStatusResult {
  gameStatus: GameStatus;
  isMove: boolean;
  score: number;
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
  let isMove = false;
  let score = 0;

  for (let r = 1; r < gameStatus.length; r++) {
    const row = gameStatus[r];
    for (let c = 0; c < row.length; c++) {
      const board = gameStatus[r][c];
      
      if (!board) {
        continue
      }
      // console.log('move：', 'row: ',  r, 'col: ', c);

      for (let checkRowIndex = r - 1; checkRowIndex > -1; checkRowIndex--) {
        // console.log('check：', 'row: ', checkRowIndex, 'col: ', c);
        const checkBoard = gameStatus[checkRowIndex][c];
        // console.log('撞上的格子: ', checkBoard);

        // 上方没有其它格子
        if (!checkBoard && checkRowIndex === 0) {
          // console.log('上方没有其它格子')
          board.row = checkRowIndex;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex][c] = board;
          console.log(JSON.parse(JSON.stringify(gameStatus)));
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num === board.num) {
          // 撞上了一样的数字
          // console.log('撞上了一样的数字')
          const newBoard: GameBoard = {
            id: createID(),
            num: board.num * 2,
            row: checkRowIndex,
            col: c
          }
          gameStatus[checkRowIndex][c] = newBoard;
          // checkBoard.num = checkBoard.num * 2;
          score += checkBoard.num * 2;
          board.row = checkBoard.row;
          // await new Promise((resolve) => {
          //   setTimeout(() => {
          //     //
          //     resolve();
          //   }, 500)
          // })
          delBoardRow.push(board, checkBoard);
          gameStatus[r][c] = null;
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num !== board.num) {
          // 撞上了不一样的数字
          // console.log('撞上了不一样的数字')
          if (board.row !== checkBoard.row + 1) {
            board.row = checkBoard.row + 1;
            isMove = true;
          }
            gameStatus[r][c] = null;
            gameStatus[checkRowIndex + 1][c] = board;
          
          // logGameStatus(gameStatus);
          break
        }
      }
    }
  }

  if (delBoardRow.length) {
    gameStatus[GAME_COL_COUNT] = delBoardRow; 
  }

  

  const newGameStatusResult = {
    gameStatus,
    isMove,
    score
  }
  
  return newGameStatusResult;
}

function logGameStatus(gameStatus: GameStatus) {
  const logArr = [];
  for (const row of gameStatus ) {
    const _row = [];
    for (const board of row) {
      if (!board) {
        _row.push(0)
      } else {
        _row.push(board.num);
      }
    }
    logArr.push(_row);
    console.log(_row);
  }
}