// TODO: Implement react-drag-and-drop
// TODO: Implement react-flip-motion
// TODO: Implement checkers game

import React from "react";
import { getData, postData } from "./../../../helpers/helpers";
import GameBoard from "./Gameboard.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    // gamestate model to handle game logic
    this.state = {
      gamestate: [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0]
      ],
      isPlaying: true,
      isPieceSelected: false,
      nextPlayer: "Black"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row, col) {
    console.log("click");
    let board = this.state.gamestate.slice();

    if (this.state.isPlaying) {
      console.log(row, col);
      this.selectPiece(row, col, board);
      this.movePiece(row, col, board);
    }
  }

  selectPiece(row, col, board) {
    if (
      this.state.isPieceSelected === false ||
      board[row][col] === "B" ||
      board[row][col] === "R"
    ) {
      console.log("selecting piece");
      if (this.state.nextPlayer === "Black") {
        if (board[row][col] === 1) {
          board[row][col] = "B";
          this.setState({ isPieceSelected: true });
        } else if (board[row][col] === "B") {
          board[row][col] = 1;
          this.setState({ isPieceSelected: false });
        } else if (this.state.nextPlayer === "Red") {
          if (board[row][col] === -1) {
            board[row][col] = "R";
            this.setState({ isPieceSelected: true });
          }
        } else if (board[row][col] === "R") {
          board[row][col] = -1;
          this.setState({ isPieceSelected: false });
        }
      }
    }

    console.table(board);
    this.setState({ gamestate: board });
  }

  movePiece(row, col, board) {
    if (board[row][col] !== "B") {
      if (this.state.nextPlayer === "Black") {
        console.log("moving piece");
        board[row][col] = 1;
      }
    }
    this.refreshBoardView(board);
  }

  refreshBoardView(board) {
    if (this.state.isPieceSelected) {
      console.log("refreshing board");
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === "B" || board[i][j] === "R") {
            board[i][j] = 0;
            this.setState({ isPieceSelected: false });
          }
        }
      }
    }
  }

  // fetch when component mounts
  componentDidMount() {
    getData("/gamedata");
    let data = { hello: "gamedata" };
    postData("/gamedata", data)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div id="game-container">
        {/* <h1 id="title">Checkers</h1> */}
        <GameBoard
          handleClick={this.handleClick}
          gameState={this.state.gamestate}
        />
      </div>
    );
  }
}

export default App;
