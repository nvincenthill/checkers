import React from "react";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorDisplayed: null
    };
  }

  updateTile() {
    if (this.props.gameState[this.props.row][this.props.index] === 1) {
      this.setState({ colorDisplayed: "black" });
    } else if (this.props.gameState[this.props.row][this.props.index] === -1) {
      this.setState({ colorDisplayed: "red" });
    } else if (this.props.gameState[this.props.row][this.props.index] === "R") {
      this.setState({ colorDisplayed: "red-selected" });
    } else if (this.props.gameState[this.props.row][this.props.index] === "B") {
      this.setState({ colorDisplayed: "black-selected" });
    } else {
      this.setState({ colorDisplayed: null });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameState !== prevProps.gameState) {
      this.updateTile();
      if (
        JSON.stringify(this.props.gameState) ===
        JSON.stringify([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ])
      ) {
        this.setState({ colorDisplayed: null });
      }
    }
  }

  componentDidMount() {
    this.updateTile();
  }

  render() {
    let RedGamePiece = <div className="gamepiece-red" />;
    let BlackGamePiece = <div className="gamepiece-black" />;
    let RedGamePieceSelected = (
      <div className="gamepiece-red animated infinite jello" />
    );
    let BlackGamePieceSelected = (
      <div className="gamepiece-black animated infinite jello" />
    );
    return (
      <div
        className="tile"
        onClick={() => this.props.handleClick(this.props.row, this.props.index)}
      >
        {this.state.colorDisplayed === "red" ? RedGamePiece : null}
        {this.state.colorDisplayed === "black" ? BlackGamePiece : null}
        {this.state.colorDisplayed === "red-selected"
          ? RedGamePieceSelected
          : null}
        {this.state.colorDisplayed === "black-selected"
          ? BlackGamePieceSelected
          : null}
      </div>
    );
  }
}

export default Square;
