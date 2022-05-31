import { ROWS_LETTERS, IBoardData } from "../shared";

type Props = {
  boardData: IBoardData,
  setBoardData: (boardData: IBoardData) => void,
  rows: string[],
}

const Board: React.FC<Props> = ({ boardData, setBoardData, rows }) => {

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number
  ) => {
    const numericReg = /^[1-9]$/;
    if (numericReg.test(event.target.value)) {
      const data = [...boardData];
      data[rowIndex][columnIndex] = parseInt(event.target.value);
      setBoardData(data);
    }
  };

  return (
    <>
      {boardData.map((items, idx) => (
        <div className="d-flex justify-content-center align-items-center" key={idx}>
          {items.map((item, i) => (
            <input
              key={`${rows[idx]}${i}`}
              name={`${rows[idx]}${i}`}
              className="board-cell"
              readOnly={!!item}
              value={item || ""}
              onChange={(ev) => handleFormChange(ev, idx, i)}
              autoComplete="off"
            />
          ))}
        </div>
      ))}
    </>
  );
}

Board.defaultProps = {
  boardData: [],
  setBoardData: () => { },
  rows: ROWS_LETTERS,
}


export default Board;
