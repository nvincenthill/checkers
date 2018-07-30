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
    } else if (
      this.props.gameState[this.props.row][this.props.index] === "RK"
    ) {
      this.setState({ colorDisplayed: "red-king" });
    } else if (
      this.props.gameState[this.props.row][this.props.index] === "BK"
    ) {
      this.setState({ colorDisplayed: "black-king" });
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
    const redGamePiece = <div className="gamepiece-red animated flipInX" />;
    const blackGamePiece = <div className="gamepiece-black animated flipInX" />;
    const redKing = <div className="gamepiece-red-king animated flipInX" />;
    const blackKing = <div className="gamepiece-black-king animated flipInX" />;
    const redGamePieceSelected = (
      <div className="gamepiece-red animated infinite jello" />
    );
    const blackGamePieceSelected = (
      <div className="gamepiece-black animated infinite jello" />
    );
    return (
      <div
        className="tile"
        onClick={() => this.props.handleClick(this.props.row, this.props.index)}
      >
        {this.state.colorDisplayed === "red" ? redGamePiece : null}
        {this.state.colorDisplayed === "black" ? blackGamePiece : null}
        {this.state.colorDisplayed === "red-king" ? redKing : null}
        {this.state.colorDisplayed === "black-king" ? blackKing : null}
        {this.state.colorDisplayed === "red-selected"
          ? redGamePieceSelected
          : null}
        {this.state.colorDisplayed === "black-selected"
          ? blackGamePieceSelected
          : null}
      </div>
    );
  }
}

export default Square;
