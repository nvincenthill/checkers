import React from "react";
import { getData, postData } from "./../../../helpers/helpers";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "Nick"
    };
  }

  componentWillMount() {
    getData();
    postData();
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.hello}.</h2>
      </div>
    );
  }
}

export default App;
