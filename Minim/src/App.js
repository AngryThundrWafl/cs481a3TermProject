import React, { Component } from "react";
import web3 from "./web3";
import minim from "./Minim";
import { Container, Card } from "semantic-ui-react";
import MusicPlayer from "./components/MusicPlayer";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


class App extends Component {
    constructor (props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            boughtSong: [false, true],
            isAvailable: true,
        };
    }


  handleSelect(){
      this.setState({isAvailable:!this.state.isAvailable});
  }

  render() {
    return (
        <div>
            <h3>Minim: Blockchain Music Application</h3>
            <Tabs onSelect={this.handleSelect}>
                <TabList>
                    <Tab>Buy Music</Tab>
                    <Tab>My Music</Tab>
                </TabList>

                <TabPanel>
                    <h2>Buy Music Panel</h2>
                </TabPanel>
                <TabPanel>
                    <h2>My Music Panel</h2>
                </TabPanel>
            </Tabs>
          <MusicPlayer isAvailable={this.state.isAvailable} boughtSong={this.state.boughtSong}/>
        </div>
    );
  }
}

export default App;
