import React, { Component } from "react";
import web3 from "./web3";
import minim from "./Minim";
import { Container, Card } from "semantic-ui-react";
import MusicPlayer from "./components/MusicPlayer";


class App extends Component {
  state = {
    value: "",
    message: ""
  };

  render() {
    return (
        <div>
          <h3>Minim: Blockchain Music Application</h3>
          <MusicPlayer/>
        </div>
    );
  }
}

export default App;
