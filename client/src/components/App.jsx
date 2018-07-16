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
      isPlaying: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row, idx) {
    let board = this.state.gamestate.slice();

    if (this.state.isPlaying) {
      console.log(row, idx);
    }
  }

  // fetch when component mounts
  componentWillMount() {
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
