import { SUDOKU_GENERATE_API, SUDOKU_VALIDATE_API, SUDOKU_SLOVE_API } from '../shared/constants';
import { IBoardResponse, IValidate, ISolution, IBoardData } from "../shared/types";

export const generate_sudoku_board = async (difficulty: string = 'easy'): Promise<IBoardResponse> => {
    const response = await fetch(`${SUDOKU_GENERATE_API}?difficulty=${difficulty}`);
    const data: IBoardResponse = await response.json();
    return data;
}

export const sudoku_board_validate = async (body: IBoardData): Promise<IValidate> => {
    const response = await fetch(SUDOKU_VALIDATE_API, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data: IValidate = await response.json();
    return data;
};

export const sudoku_board_slove = async (body: IBoardData): Promise<ISolution> => {
    const response = await fetch(SUDOKU_SLOVE_API, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data: ISolution = await response.json();
    return data;
};