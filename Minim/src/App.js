import React, { Component } from "react";
import web3 from "./web3";
import minim from "./Minim";
import { Container } from "semantic-ui-react";
import {
    Card,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    NavLink} from 'reactstrap';
import MusicPlayer from "./components/MusicPlayer";
import MusicList from "./components/MusicList";
import Register from "./components/RegisterSong";

import "./styles/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



//AudioLists for preview and full songs
const previewAudioList = require('./song files/previewSongs.json');

const fullAudioList = require('./song files/fullSongs.json');


class App extends Component {
    constructor (props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.buySong = this.buySong.bind(this);
        this.getAccount = this.getAccount.bind(this);
        this.state = {
            boughtSong: [false, true],
            isAvailable: true,
            account: "",
        };
    }



  handleSelect(){
      this.setState({isAvailable:!this.state.isAvailable});
  }


  buySong(index){
    //todo
  }

  getAccount = async () =>{
        //gets current account
        const account = await web3.eth.getAccounts();
        //todo solidity call to retrieve owned music
        //todo set the state of the bought songs array to reflect what they have purchased


        //todo
        this.setState({account});

  };


  render() {
      this.getAccount();

        return (
        <div style={{
            backgroundColor: "rgb(0, 13, 26)",
            height: "100vh",
        }}>
            <Navbar style={{
                backgroundColor: "rgba(0,0,0, .4)"
            }} dark expand="md">
                <NavbarBrand href="#home" style={{color: "rgb(49, 194, 124)"}}>Minim: BlockChain Music Application</NavbarBrand>
                <Nav className="mr-auto">
                    <NavLink href="#home" style={{color: 'white', textDecoration: 'none'}}>Home</NavLink>
                    <NavLink href="#nav2" style={{color: 'white', textDecoration: 'none'}}>nav2</NavLink>
                    <NavLink href="#nav2" style={{color: 'white', textDecoration: 'none'}}>nav3</NavLink>
                </Nav>
                <Nav>
                    <NavItem><p style={{color: "rgb(49, 194, 124)"}}>Account: {this.state.account}</p></NavItem>
                </Nav>
            </Navbar>
            <br />
            <Container style={{
                height: "100vh"
            }}>
            <Card style={{
                height:"86%",
                width:"95%",
                backgroundColor: "rgba(0,0,0, .4)",
                color: "white",
                borderColor: "rgb(49, 194, 124)",
            }}>
                <Tabs onSelect={this.handleSelect}>
                    <TabList>
                        <Tab>Catalog</Tab>
                        <Tab>My Music</Tab>
                        <Tab>Register Song</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Buy Music Panel</h2>
                        <MusicList buySong={this.buySong} fullAudioList={fullAudioList} previewAudioList={previewAudioList} isAvailable={this.state.isAvailable} boughtSong={this.state.boughtSong}/>
                    </TabPanel>
                    <TabPanel>
                        <h2>My Music Panel</h2>
                        <MusicList buySong={this.buySong} fullAudioList={fullAudioList} previewAudioList={previewAudioList} isAvailable={this.state.isAvailable} boughtSong={this.state.boughtSong}/>
                    </TabPanel>
                    <TabPanel>
                        <Register/>
                    </TabPanel>
                </Tabs>
            </Card>
            </Container>
            <br />
            <MusicPlayer fullAudioList={fullAudioList} previewAudioList={previewAudioList} isAvailable={this.state.isAvailable} boughtSong={this.state.boughtSong}/>
        </div>
        );
    }
}

export default App;
