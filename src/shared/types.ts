export interface IBoardResponse {
  difficulty: string;
  puzzle: object;
}

export interface IValidate {
  status: string;
}

export type IBoardData = number[][];

export interface ISolution {
  difficulty: string;
  solution: IBoardData;
  status: string;
}
