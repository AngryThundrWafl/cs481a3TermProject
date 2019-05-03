import React, { Component } from "react";
import web3 from "./web3";
import minim from "./Minim";
import {
    Card,
    Col,
    Container,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Row
} from 'reactstrap';
import MusicList from "./components/MusicList";
import Register from "./components/RegisterSong";

import "./styles/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: null,
            registeredSongs: []
        };

        this.buySong = this.buySong.bind(this);
    }

    componentDidMount() {
        this.getAccountInfo();
    }

    getAccountInfo = async () => {
        const account = await web3.eth.getAccounts().then(accounts => { return accounts[0] });

        let registeredSongs = [];
        const numSongsRegistered = await minim.methods.numSongsRegistered().call({
            from: account
        });

        for (let i = 0; i < numSongsRegistered; i++) {
            const songInformation = await minim.methods.getSongsRegisteredByIndex(i).call({
                from: account
            });

            let song = {
                name: songInformation[1],
                singer: songInformation[2],
                cover: songInformation[3],
                musicSrc: songInformation[4],
                duration: songInformation[5],
                price: songInformation[6],
                purchased: false
            };

            registeredSongs.push(song);
        }

        const numSongsPurchased = await minim.methods.getNumSongsPurchased().call({
            from: account
        });

        for (let i = 0; i < numSongsPurchased; i++) {
            const songName = await minim.methods.getSongsPurchasedByIndex(i).call({
                from: account
            });

            for (let i = 0; i < registeredSongs.length; i++) {
                if (registeredSongs[i].name === songName) {
                    registeredSongs[i].purchased = true;
                    break;
                }
            }
        }

        this.setState({ account: account, registeredSongs: registeredSongs });
    };

    getUnpurchasedSongs() {
        let unpurchasedSongs = [];
        for (let i = 0; i < this.state.registeredSongs.length; i++) {
            let currentSong = this.state.registeredSongs[i];
            if (!this.state.purchasedSongs.includes(currentSong)) {
                unpurchasedSongs.push(currentSong);
            }
        }

        return unpurchasedSongs;
    }

    async buySong(song) {
        await minim.methods.purchaseSong(song.name).send({
            from: this.state.account,
            value: song.price,
            gas: "1000000"
        });

        this.getAccountInfo(); // re-render song lists
    }

    render() {
        return (
            <div style={{
                backgroundColor: "rgb(0, 13, 26)"
            }}>
                <Navbar style={{
                    backgroundColor: "rgba(0, 0, 0, .4)"
                }} dark expand="md">
                    <NavbarBrand href="#home" style={{ color: "rgb(49, 194, 124)" }}>Minim: BlockChain Music Application</NavbarBrand>
                    <Nav className="ml-auto">
                        <NavItem><p style={{ color: "rgb(49, 194, 124)" }}>Account: {this.state.account}</p></NavItem>
                    </Nav>
                </Navbar>
                <br />
                <Container style={{
                    height: "100vh"
                }}>
                    <Card style={{
                        height: "86%",
                        width: "95%",
                        backgroundColor: "rgba(0, 0, 0, .4)",
                        color: "white",
                        borderColor: "rgb(49, 194, 124)",
                    }}>
                        <Tabs>
                            <TabList>
                                <Tab>Catalog</Tab>
                                <Tab>My Music</Tab>
                                <Tab>Register Song</Tab>
                            </TabList>

                            <TabPanel>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h2>Buy Music</h2>
                                            <MusicList buySong={this.buySong} songList={this.state.registeredSongs} songsArePreviews={true} />
                                        </Col>
                                    </Row>
                                </Container>
                            </TabPanel>
                            <TabPanel>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h2>My Music</h2>
                                            <MusicList buySong={this.buySong} songList={this.state.registeredSongs} songsArePreviews={false} />
                                        </Col>
                                    </Row>
                                </Container>
                            </TabPanel>
                            <TabPanel>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Register />
                                        </Col>
                                    </Row>
                                </Container>
                            </TabPanel>
                        </Tabs>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default App;
