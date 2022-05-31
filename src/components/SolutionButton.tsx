import { useState } from 'react';
import { Row, Button, Spinner } from "react-bootstrap";
import { sudoku_board_slove } from '../service'
import { IBoardData, ISolution } from '../shared';

type Props = {
  boardData: IBoardData,
  setBoardData: (boardData: IBoardData) => void,
  setGameState: (state: string) => void
}

const SolutionButton: React.FC<Props> = ({ setBoardData, boardData, setGameState }) => {
  const [loader, setLoader] = useState<boolean>(false)

  const sloveBoard = async (data: IBoardData): Promise<void> => {
    setLoader(true);
    const { solution, status }: ISolution = await sudoku_board_slove(data);
    setBoardData(solution);
    setGameState(status);
    setLoader(false);
  }

  const onSloveHandler = () => {
    sloveBoard(boardData);
  }

  return (
    <Row className="my-2">
      <Button variant="light" onClick={onSloveHandler}>
        Solve {
          loader && (<Spinner animation="border" size="sm" />)
        }
      </Button>
    </Row>
  );
}

SolutionButton.defaultProps = {
  boardData: [],
  setBoardData: () => { },
  setGameState: () => { }
}

export default SolutionButton;
