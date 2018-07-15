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
    getData("/gamedata");
    let data = { hello: "gamedata" };
    postData("/gamedata", data)
      .then(data => console.log(data))
      .catch(error => console.error(error));
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
