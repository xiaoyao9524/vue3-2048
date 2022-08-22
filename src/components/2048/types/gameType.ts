
export interface GameBoard {
  id: number;
  x: number;
  y: number;
  num: number;
}

export type GameRow = (GameBoard | null)[];

export type GameStatus = GameRow[];
