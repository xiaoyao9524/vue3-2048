
export interface GameBoard {
  id: number;
  row: number;
  col: number;
  num: number;
}

export type GameRow = (GameBoard | null)[];

export type GameStatus = GameRow[];

export type GameDirection = 'up' | 'down' | 'left' | 'right';
