import { ROWS_LETTERS, IBoardData, } from '../shared'

export const parseBoardData = (puzzle: object): IBoardData => {
    return Object.values(
        Object.keys(puzzle).reduce((acc: Object, i: string) => {
            var alpha: string = i.charAt(0);
            var index: number = parseInt(i.charAt(1)) - 1;
            const obj = acc as any;
            if (!obj[alpha]) {
                obj[alpha] = new Array(9).fill(0);
            }
            obj[alpha][index] = parseInt((puzzle as any)[i]);
            return acc;
        }, {})
    );
};

export const clearBoard = (): IBoardData => {
    return ROWS_LETTERS.map(() => new Array(9).fill(0))
}