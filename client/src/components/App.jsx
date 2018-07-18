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
    let board = this.state.gamestate.slice();

    if (this.state.isPlaying) {
      console.log(row, col);
      this.handlePieceSelection(row, col, board);
      if (this.state.isPieceSelected) {
        this.movePiece(row, col, board);
      }
    }
  }

  handlePieceSelection(row, col, board) {
    if (
      this.state.isPieceSelected === false ||
      board[row][col] === "B" ||
      board[row][col] === "R"
    ) {
      console.log("handling piece selection");
      if (this.state.nextPlayer === "Black") {
        console.log("selecting black piece");
        this.selectBlackPiece(row, col, board);
      }

      if (this.state.nextPlayer === "Red") {
        console.log("selecting red piece");
        this.selectRedPiece(row, col, board);
      }

      this.setState({ gamestate: board });
    }
  }

  selectRedPiece(row, col, board) {
    if (board[row][col] === -1) {
      board[row][col] = "R";
      this.toggleSelection(row, col);
    } else if (board[row][col] === "R") {
      board[row][col] = -1;
      this.toggleSelection(row, col);
    }
  }

  selectBlackPiece(row, col, board) {
    if (board[row][col] === 1) {
      board[row][col] = "B";
      this.toggleSelection(row, col);
    } else if (board[row][col] === "B") {
      board[row][col] = 1;
      this.toggleSelection(row, col);
    }
  }

  toggleSelection(row, col) {
    if (this.state.isPieceSelected) {
      this.setState({ isPieceSelected: false });
      this.setState({ selectedRow: null });
      this.setState({ selectedCol: null });
    } else {
      this.setState({ isPieceSelected: true });
      this.setState({ selectedRow: row });
      this.setState({ selectedCol: col });
    }
  }

  movePiece(row, col, board) {
    if (this.validateMove(row, col, board)) {
      console.log("moving piece");
      if (this.state.nextPlayer === "Black") {
        board[row][col] = 1;
        this.setState({ nextPlayer: "Red" });
      } else {
        board[row][col] = -1;
        this.setState({ nextPlayer: "Black" });
      }
      this.refreshBoardView(board);
    }
  }

  refreshBoardView(board) {
    if (this.state.isPieceSelected) {
      console.log("refreshing board");
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === "B" || board[i][j] === "R") {
            board[i][j] = 0;
            this.toggleSelection();
          }
        }
      }
    }
    this.setState({ gamestate: board });
  }

  validateMove(row, col, board) {
    console.log("validating move");
    return this.isValidMove(row, col, board);
  }

  isValidMove(row, col, board) {
    // TODO: handle backwards moves and captures

    // validate basic move
    if (
      this.isValidRow(row) &&
      this.isValidCol(col) &&
      this.isEmpty(row, col, board)
    ) {
      console.log("move is valid");
      return true;
    }

    // validate captures
    if (this.isValidCapture(row, col, board)) {
      return true;
    }
  }

  isValidCapture(row, col, board) {
    //TODO: validate capture only if piece is capable of capture
    if (this.isValidCaptureRow(row) && this.isValidCaptureCol(col)) {
      return true;
    }
  }

  isEmpty(row, col, board) {
    if (board[row][col] === 0) {
      return true;
    } else {
      return false;
    }
  }

  isValidRow(row) {
    if (this.state.nextPlayer === "Red") {
      if (row === this.state.selectedRow - 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (row === this.state.selectedRow + 1) {
        return true;
      } else {
        return false;
      }
    }
  }

  isValidCaptureRow(row) {
    if (
      row === this.state.selectedRow + 2 ||
      row === this.state.selectedRow - 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  isValidCol(col) {
    if (
      col === this.state.selectedCol + 1 ||
      col === this.state.selectedCol - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  isValidCaptureCol(col) {
    if (
      col === this.state.selectedCol + 2 ||
      col === this.state.selectedCol - 2
    ) {
      return true;
    } else {
      return false;
    }
  }

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
        <GameBoard
          handleClick={this.handleClick}
          gameState={this.state.gamestate}
        />
      </div>
    );
  }
}

export default App;
