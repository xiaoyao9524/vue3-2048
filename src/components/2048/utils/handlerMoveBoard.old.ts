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

import {
  getNextBoardId
} from './gameStatus';

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
      const board = row[c];

      if (!board) {
        continue
      }
      console.log('----- current-board -----: ', 'row: ', r, 'col: ', c);

      // const checkBoardList = [];
      // for (let checkRowIndex = r - 1; checkRowIndex >= 0; checkRowIndex--) {

      //   const checkBoard = gameStatus[checkRowIndex][c];
      //   checkBoardList.push(checkBoard);
      //   if (checkBoard) {
      //     console.log('check-board-position: ', 'row: ', checkRowIndex, 'col: ', c, 'key: ', checkBoard.id, 'num: ', board.num);
      //   } else {
      //     console.log('check-board-position: ', 'row: ', checkRowIndex, 'col: ', c, 'num: ', null);
      //   }
      // }

      // console.log('check-board-list: ', checkBoardList);

      // let rowIndex = board.row - 1;
      // for (let _checkBoard of checkBoardList) {
      //   console.log('checkRowIndex: ', rowIndex);
      //   if (!_checkBoard && rowIndex === 0) {
      //     console.log('检查到最上方');
      //     gameStatus[board.row][board.col] = null;
      //     board.row = rowIndex;
      //     gameStatus[rowIndex][c] = board;
      //   } else if (_checkBoard && _checkBoard.num !== board.num) {
      //     console.log('撞上了不一样的数字')
      //     if (board.row === rowIndex + 1) {
      //       continue
      //     }
      //     isMove = true;
      //     gameStatus[board.row][board.col] = null;
      //     board.row = rowIndex + 1;
      //     gameStatus[rowIndex + 1][c] = board;
      //   }
      //   rowIndex--;
      // }


      for (let checkRowIndex = r - 1; checkRowIndex >= 0; checkRowIndex--) {
        // console.log('check：', 'row: ', checkRowIndex, 'col: ', c);
        const checkBoard = gameStatus[checkRowIndex][c];
        // console.log('撞上的格子: ', checkBoard);

        // 上方没有其它格子
        if (!checkBoard && checkRowIndex === 0) {
          // console.log('上方没有其它格子')
          board.row = checkRowIndex;
          gameStatus[r][c] = null;
          gameStatus[checkRowIndex][c] = board;
          // console.log('up后的status: ', JSON.parse(JSON.stringify(gameStatus)));
          isMove = true;
          // logGameStatus(gameStatus);
          break
        } else if (checkBoard !== null && checkBoard.num === board.num) {
          // 撞上了一样的数字
          // console.log('撞上了一样的数字')
          const newBoard: GameBoard = {
            id: getNextBoardId(gameStatus),
            num: board.num * 2,
            row: checkRowIndex,
            col: c
          }
          gameStatus[checkRowIndex][c] = newBoard;

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
    gameStatus[GAME_COL_COUNT] = delBoardRow;
  }

  console.log('up后的status: ', JSON.parse(JSON.stringify(gameStatus)));
  logGameStatus(gameStatus);

  const newGameStatusResult = {
    gameStatus,
    isMove,
    score
  }

  /*
  return {
    gameStatus: [
      [
        null,
        {
          "id": 1,
          "row": 0,
          "col": 1,
          "num": 2
        },
        {
          "id": 3,
          "row": 0,
          "col": 2,
          "num": 2
        },
        null
      ],
      [
        null,
        {
          "id": 2,
          "row": 1,
          "col": 1,
          "num": 4
        },
        null,
        null
      ],
      [
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null
      ]
    ],
    isMove: true,
    score: 0
  }
  */

  return newGameStatusResult;
}

function logGameStatus(gameStatus: GameStatus) {
  const logArr = [];
  for (const row of gameStatus) {
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