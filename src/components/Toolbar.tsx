import { useState, useEffect } from 'react';
import { Row, Col, InputGroup, FormControl, Spinner } from "react-bootstrap";
import { sudoku_board_validate, generate_sudoku_board, parseBoardData, clearBoard } from '../service';
import { DIFFICULTIES, IBoardData, IValidate, IBoardResponse } from '../shared';
import RadioToggleButton from './RadioToggleButton';

type Props = {
  boardData: IBoardData,
  setBoardData: (boardData: IBoardData) => void,
  gameState: string,
  setGameState: (state: string) => void,
}

const Toolbar: React.FC<Props> = ({ boardData, setBoardData, gameState, setGameState }) => {
  const [validateLoader, setValidateLoader] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>(DIFFICULTIES[0]);

  useEffect(() => {
    getBoardData(DIFFICULTIES[0]);
  }, []);

  const getBoardData = async (difficultyLevel: string): Promise<void> => {
    const { difficulty, puzzle }: IBoardResponse = await generate_sudoku_board(difficultyLevel);
    setBoardData(parseBoardData(puzzle));
    setDifficulty(difficulty);
    setGameState('unsolved');
  }

  const onValidate = async (): Promise<void> => {
    setValidateLoader(true);
    const { status }: IValidate = await sudoku_board_validate(boardData);
    setGameState(status);
    setValidateLoader(false);
  };

  const difficultyChangeHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (value === 'Clear') {
      const _data = clearBoard();
      setBoardData(_data);
      return;
    }
    if (value !== 'random') {
      setDifficulty(value);
    }
    getBoardData(value);
  }

  return (
    <>
      <Row className="my-2">
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <strong>Generate:</strong>
          {
            DIFFICULTIES.map((item, idx) => (
              <RadioToggleButton
                key={idx}
                idx={idx}
                value={item}
                name={"radio"}
                difficultyChangeHandler={difficultyChangeHandler}
                selectedValue={difficulty}
              />
            ))
          }
          <RadioToggleButton
            idx={`radio-clear`}
            value={'Clear'}
            name={"radio"}
            difficultyChangeHandler={difficultyChangeHandler}
            selectedValue={difficulty}
          />

        </Col>
      </Row>

      <Row className="my-2">
        <Col xs={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text className="cursor-pointer" onClick={onValidate}>
              <span className="mx-1">Validate</span> {
                validateLoader && (<Spinner animation="border" size="sm" />)
              }
            </InputGroup.Text>
            <FormControl id="validate" value={gameState} readOnly />
          </InputGroup>
        </Col>
        <Col xs={6}>
          <InputGroup className="mb-3">
            <FormControl id="difficulty" className="text-capitalize" value={difficulty} readOnly />
            <InputGroup.Text>
              Difficulty
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
}

Toolbar.defaultProps = {
  boardData: [],
  setBoardData: () => { },
  gameState: '',
  setGameState: () => { }
}

export default Toolbar;
