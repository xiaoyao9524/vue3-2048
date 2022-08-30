import {
  GameStatus,
  GameRow
} from '../types/gameType';

import {
  GAME_ROW_COUNT,
  GAME_COL_COUNT
} from '../constant'

import {
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
          board.row = checkRowIndex;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex][c] = board;
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num === board.num) {
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

export const getMoveDownStatus = (_gameStatus: GameStatus): NewGameStatusResult => {
  const gameStatus: GameStatus = JSON.parse(JSON.stringify(_gameStatus));
  const delBoardRow: GameRow = []; // 多添加一行来存储即将要删除的元素
  let isMove = false;
  let score = 0;

  for (let r = GAME_ROW_COUNT - 2; r >= 0; r--) {
    
    const row = gameStatus[r];
    for (let c = 0; c < row.length; c++) {
      const board = gameStatus[r][c];
      
      if (!board) {
        continue
      }
      
      for (let checkRowIndex = r + 1; checkRowIndex < gameStatus.length; checkRowIndex++) {
        const checkBoard = gameStatus[checkRowIndex][c];

        // 下方没有其它格子
        if (!checkBoard && checkRowIndex === GAME_ROW_COUNT - 1) {
          board.row = checkRowIndex;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex][c] = board;
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

 export const getMoveRightStatus = (_gameStatus: GameStatus): NewGameStatusResult => {
  const gameStatus: GameStatus = JSON.parse(JSON.stringify(_gameStatus));
  const delBoardRow: GameRow = []; // 多添加一行来存储即将要删除的元素
  let isMove = false;
  let score = 0;

  for (let r = 0; r < gameStatus.length; r++) {
    const row = gameStatus[r];

    for (let c = row.length - 2; c >= 0; c--) {
      const board = gameStatus[r][c];
      
      if (!board) {
        continue
      }
      
      for (let checkColIndex = board.col + 1; checkColIndex < row.length; checkColIndex++) {
        const checkBoard = gameStatus[r][checkColIndex];

        // 右侧没有其它格子
        if (!checkBoard && checkColIndex === GAME_COL_COUNT - 1) {
          board.col = checkColIndex;
          gameStatus[r][c] = null;
          gameStatus[r][checkColIndex] = board;
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num === board.num) {
          // 撞上了一样的数字
          const newBoard = createNewBoard(gameStatus, {
            num: board.num * 2,
            row: r,
            col: checkColIndex
          }) as NewBoardResult;

          gameStatus[r][checkColIndex] = (newBoard.board);
          score += checkBoard.num * 2;
          board.col = checkBoard.col;
          
          delBoardRow.push(board, checkBoard);
          gameStatus[r][c] = null;
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num !== board.num) {
          // 撞上了不一样的数字
          if (board.col !== checkBoard.col - 1) {
            board.col = checkBoard.col - 1;
            isMove = true;
          }
            gameStatus[r][c] = null;
            gameStatus[r][checkBoard.col - 1] = board;
          
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

export const getMoveLeftStatus = (_gameStatus: GameStatus): NewGameStatusResult => {
  const gameStatus: GameStatus = JSON.parse(JSON.stringify(_gameStatus));
  const delBoardRow: GameRow = []; // 多添加一行来存储即将要删除的元素
  let isMove = false;
  let score = 0;

  for (let r = 0; r < gameStatus.length; r++) {
    const row = gameStatus[r];

    for (let c = 1; c < row.length; c++) {
      const board = gameStatus[r][c];
      
      if (!board) {
        continue
      }
      
      for (let checkColIndex = board.col - 1; checkColIndex >= 0; checkColIndex--) {
        const checkBoard = gameStatus[r][checkColIndex];

        
        // 左侧没有其它格子
        if (!checkBoard && checkColIndex === 0) {
          board.col = checkColIndex;
          gameStatus[r][c] = null;
          gameStatus[r][checkColIndex] = board;
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num === board.num) {
          // 撞上了一样的数字
          const newBoard = createNewBoard(gameStatus, {
            num: board.num * 2,
            row: r,
            col: checkColIndex
          }) as NewBoardResult;

          gameStatus[r][checkColIndex] = (newBoard.board);
          score += checkBoard.num * 2;
          board.col = checkBoard.col;
          
          delBoardRow.push(board, checkBoard);
          gameStatus[r][c] = null;
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num !== board.num) {
          // 撞上了不一样的数字
          if (board.col !== checkBoard.col + 1) {
            board.col = checkBoard.col + 1;
            isMove = true;
          }
            gameStatus[r][c] = null;
            gameStatus[r][checkBoard.col + 1] = board;
          
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

/*
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
*/