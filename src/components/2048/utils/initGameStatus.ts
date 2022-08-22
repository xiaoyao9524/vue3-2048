import {
  GameRow,
  GameStatus
} from '../types/gameType';

function initGameStatus (): GameStatus {
  const rowCount = 4;
  const colCount = 4;

  const gameStatus: GameStatus = [];

  for (let r = 0; r < rowCount; r++) {
    const row: GameRow = [];

    for (let c = 0; c < colCount; c++) {
      row.push(null);
    }

    gameStatus.push(row);
  }

  return gameStatus;
}

export default initGameStatus;
