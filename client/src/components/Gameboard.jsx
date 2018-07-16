import React from "react";
import Square from "./Square.jsx";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let row0 = this.props.gameState[0].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={0}
        />
      );
    });
    let row1 = this.props.gameState[1].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={1}
        />
      );
    });
    let row2 = this.props.gameState[2].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={2}
        />
      );
    });
    let row3 = this.props.gameState[3].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={3}
        />
      );
    });
    let row4 = this.props.gameState[4].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={4}
        />
      );
    });
    let row5 = this.props.gameState[5].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={5}
        />
      );
    });
    let row6 = this.props.gameState[6].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={6}
        />
      );
    });
    let row7 = this.props.gameState[7].map((square, index) => {
      return (
        <Square
          key={index}
          gameState={this.props.gameState}
          handleClick={this.props.handleClick}
          index={index}
          row={7}
        />
      );
    });

    let rotatedStyle = {
      transform: `rotate(${this.props.currentRotation}deg)`
    };

    return (
      <div id="gameboard" style={rotatedStyle}>
        {row0}
        {row1}
        {row2}
        {row3}
        {row4}
        {row5}
        {row6}
        {row7}
      </div>
    );
  }
}

export default GameBoard;
