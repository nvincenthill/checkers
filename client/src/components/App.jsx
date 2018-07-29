// TODO: Implement react-drag-and-drop
// TODO: Implement react-flip-motion
// TODO: Implement checkers game
// TODO: Add promotions
// TODO: Add multiple captures

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
    if (this.isValidMove(row, col, board)) {
      console.log("moving piece");
      if (this.state.nextPlayer === "Black") {
        board[row][col] = 1;
        this.setState({ nextPlayer: "Red" });
      } else {
        board[row][col] = -1;
        this.setState({ nextPlayer: "Black" });
      }
      board = this.refreshBoardView(board);
      this.promoteKings(board);
      console.table(board);
      this.setState({ gamestate: board });
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
    return board;
  }

  isValidMove(row, col, board) {
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
    let rowToCheck = (this.state.selectedRow + row) / 2;
    let colToCheck = (this.state.selectedCol + col) / 2;

    if (
      this.isValidCaptureRow(row) &&
      this.isValidCaptureCol(col) &&
      board[row][col] === 0 &&
      board[rowToCheck][colToCheck] !== 0
    ) {
      this.handleCapture(row, col, board);
      return true;
    }
  }

  promoteKings(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[board.length - 1][i] === 1) {
        console.log("Black king to promote");
      }
      if (board[0][i] === -1) {
        console.log("Red king to promote");
      }
    }
  }

  removePiece(row, col, board) {
    board[row][col] = 0;
    this.refreshBoardView(board);
  }

  handleCapture(row, col, board) {
    // console.log("move from: ", this.state.selectedRow, this.state.selectedCol);
    // console.log("move to: ", row, col);
    let rowToRemove = (this.state.selectedRow + row) / 2;
    let colToRemove = (this.state.selectedCol + col) / 2;
    // console.log("removing ", rowToRemove, colToRemove);
    this.removePiece(rowToRemove, colToRemove, board);
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
    if (this.state.nextPlayer === "Red") {
      if (row === this.state.selectedRow - 2) {
        return true;
      } else {
        return false;
      }
    } else {
      if (row === this.state.selectedRow + 2) {
        return true;
      } else {
        return false;
      }
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
    // TODO: check for piece to hop over
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
