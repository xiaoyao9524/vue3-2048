import {
  GameStatus,
  GameRow,
  GameBoard
} from '../types/gameType';

import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT
} from '../constant'

import {
  getNextBoardId,
  createNewBoard
} from './gameStatus';
import type {
  NewBoardResult
} from './gameStatus';

export interface NewGameStatusResult {
  gameStatus: GameStatus;
  isMove: boolean;
  score: number;
}

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
      for (let checkRowIndex = r - 1; checkRowIndex > -1; checkRowIndex--) {
        const checkBoard = gameStatus[checkRowIndex][c];

        // 上方没有其它格子
        if (!checkBoard && checkRowIndex === 0) {
          // console.log('上方没有其它格子')
          board.row = checkRowIndex;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex][c] = board;
          // console.log(JSON.parse(JSON.stringify(gameStatus)));
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num === board.num) {
          // 撞上了一样的数字
          // console.log('撞上了一样的数字')
          // const newBoard: GameBoard = {
          //   id: getNextBoardId(gameStatus),
          //   num: board.num * 2,
          //   row: checkRowIndex,
          //   col: c
          // }
          const newBoard = createNewBoard(gameStatus, {
            num: board.num * 2,
            row: checkRowIndex,
            col: c
          }) as NewBoardResult;

          // if (!newBoard) {
          //   return {
          //     gameStatus,
          //     isMove,
          //     score
          //   }
          // }

          gameStatus[checkRowIndex][c] = (newBoard.board);
          score += checkBoard.num * 2;
          board.row = checkBoard.row;
          
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
    gameStatus[GAME_ROW_COUNT] = delBoardRow; 
  }

  const newGameStatusResult = {
    gameStatus,
    isMove,
    score
  }
  
  return newGameStatusResult;
}

/**
 * [
 *    [00, 01, 02, 03]
 *    [10, 11, 12, 13]
 *    [20, 21, 22, 23]
 *    [30, 31, 32, 33]
 * ]
 */

export const getMoveDownStatus = (_gameStatus: GameStatus): NewGameStatusResult => {
  const gameStatus: GameStatus = JSON.parse(JSON.stringify(_gameStatus));
  const delBoardRow: GameRow = []; // 多添加一行来存储即将要删除的元素
  let isMove = false;
  let score = 0;
  // console.log('down...')

  for (let r = GAME_ROW_COUNT - 2; r >= 0; r--) {
    
    const row = gameStatus[r];
    for (let c = 0; c < row.length; c++) {
      const board = gameStatus[r][c];
      
      if (!board) {
        continue
      }
      // console.log('----- move -----: ', 'row:', r, 'col: ', c);
      
      for (let checkRowIndex = r + 1; checkRowIndex < gameStatus.length; checkRowIndex++) {
        // console.log('check: ', 'row: ', checkRowIndex, 'col: ', c);
        const checkBoard = gameStatus[checkRowIndex][c];

        // 上方没有其它格子
        if (!checkBoard && checkRowIndex === GAME_COL_COUNT - 1) {
          // console.log('下方没有其它格子')
          board.row = checkRowIndex;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex][c] = board;
          // console.log(JSON.parse(JSON.stringify(gameStatus)));
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num === board.num) {
          // 撞上了一样的数字
          const newBoard = createNewBoard(gameStatus, {
            num: board.num * 2,
            row: checkRowIndex,
            col: c
          }) as NewBoardResult;

          gameStatus[checkRowIndex][c] = (newBoard.board);
          score += checkBoard.num * 2;
          board.row = checkBoard.row;
          
          delBoardRow.push(board, checkBoard);
          gameStatus[r][c] = null;
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num !== board.num) {
          // 撞上了不一样的数字
          // console.log('撞上了不一样的数字')
          if (board.row !== checkBoard.row - 1) {
            board.row = checkBoard.row - 1;
            isMove = true;
          }
            gameStatus[r][c] = null;
            gameStatus[checkRowIndex - 1][c] = board;
          
          // logGameStatus(gameStatus);
          break
        }
      }
    }
  }

  if (delBoardRow.length) {
    gameStatus[GAME_ROW_COUNT] = delBoardRow; 
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