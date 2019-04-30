import React, { Component } from "react";
import web3 from "./web3";
import minim from "./Minim";
import { Container } from "semantic-ui-react";
import {
    Card,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import MusicPlayer from "./components/MusicPlayer";
import MusicList from "./components/MusicList";
import Register from "./components/RegisterSong";

import "./styles/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



const fullAudioList = require('./song files/fullSongs.json');


class App extends Component {
    constructor (props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.buySong = this.buySong.bind(this);
        this.uploadSong = this.uploadSong.bind(this);
        this.state = {
            boughtSong: [false, true],
            isAvailable: true,
            account: "",
            catalog: "",
        };
    }



  handleSelect(index){
      this.setState({isAvailable:index!==1});
  }


  buySong(index){
    //todo
  }

  uploadSong(){

  }

  getAccount = async () =>{
        //gets current account
        const account = await web3.eth.getAccounts();
        //todo solidity call to retrieve owned music
        //todo set the state of the bought songs array to reflect what they have purchased


        //todo
        this.setState({account});

  };

  getCatalog(){
      //todo get all the songs from the contract

      //todo update current state of the contract
  }

  render() {
      //get ethereum account and display their information
      this.getAccount();

        return (
        <div style={{
            backgroundColor: "rgb(0, 13, 26)",
            height: "100%",
        }}>
            <Navbar style={{
                backgroundColor: "rgba(0,0,0, .4)"
            }} dark expand="md">
                <NavbarBrand href="#home" style={{color: "rgb(49, 194, 124)"}}>Minim: BlockChain Music Application</NavbarBrand>
                <Nav className="mr-auto">
                    <NavLink href="#home" style={{color: 'white', textDecoration: 'none'}}>Home</NavLink>
                </Nav>
                <Nav>
                    <NavItem><p style={{color: "rgb(49, 194, 124)"}}>Account: {this.state.account}</p></NavItem>
                </Nav>
            </Navbar>
            <br />
            <Container style={{
                height: "90vh",
                overflow: 'auto'
            }}>
            <Card style={{
                height:"90%",
                width:"95%",
                backgroundColor: "rgba(0,0,0, .4)",
                color: "white",
                borderColor: "rgb(49, 194, 124)",
                overflow: 'auto'
            }}>
                <Tabs onSelect={this.handleSelect} >
                    <TabList>
                        <Tab>Catalog</Tab>
                        <Tab>My Music</Tab>
                        <Tab>Register Song</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Buy Music Panel</h2>
                        <MusicList buySong={this.buySong} fullAudioList={fullAudioList} isAvailable={this.state.isAvailable} boughtSong={this.state.boughtSong}/>
                    </TabPanel>
                    <TabPanel>
                        <h2>My Music Panel</h2>
                        <MusicList buySong={this.buySong} fullAudioList={fullAudioList} isAvailable={this.state.isAvailable} boughtSong={this.state.boughtSong}/>
                    </TabPanel>
                    <TabPanel>
                        <Register/>
                    </TabPanel>
                </Tabs>
            </Card>
            </Container>
            <br />
            <MusicPlayer fullAudioList={fullAudioList} isAvailable={this.state.isAvailable} boughtSong={this.state.boughtSong}/>
        </div>
        );
    }
}

export default App;
