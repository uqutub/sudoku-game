import React, { useState, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Board, Header, SolutionButton, Toolbar } from "./components";
import { ROWS_LETTERS } from "./shared/constants";
import { IBoardData } from "./shared";
import { clearBoard } from './service';

const App: React.FC = memo(() => {
  const [gameState, setGameState] = useState<string>("unsolved");
  const [boardData, setBoardData] = useState<IBoardData>(clearBoard());

  return (
    <Container>
      {/* Title */}
      <Header title={'Sudoko'} />
      <div className="board">
        {/* Board */}
        <Row>
          <Col xs={12}>
            {boardData.length ? (
              <Board
                boardData={boardData}
                setBoardData={setBoardData}
                rows={ROWS_LETTERS}
              />
            ) : null}
          </Col>
        </Row>
        {/* Toolbar */}
        <Toolbar
          boardData={boardData}
          setBoardData={setBoardData}
          gameState={gameState}
          setGameState={setGameState}
        />
        <SolutionButton boardData={boardData} setBoardData={setBoardData} setGameState={setGameState} />
      </div>
    </Container >
  );
})

export default App;
