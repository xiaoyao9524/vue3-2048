
export interface GameBoard {
  id: string;
  row: number;
  col: number;
  num: number;
}

export type GameRow = (GameBoard | null)[];

export type GameStatus = GameRow[];
