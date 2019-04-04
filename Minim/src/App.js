import React, { Component } from "react";
import web3 from "./web3";
import minim from "./Minim";
import { Container, Card } from "semantic-ui-react";
//music player npm package
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

class App extends Component {
  state = {
    value: "",
    message: ""
  };

  render() {
    return (
      <Container>
        <div>
          <h3>Minim: Blockchain Music Application</h3>
        </div>
      </Container>
    );
  }
}

export default App;
