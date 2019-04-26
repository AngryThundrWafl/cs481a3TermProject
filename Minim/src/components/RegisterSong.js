import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import Minim from "../Minim";

let myWidget;

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songName:"",
            artistName:"",
            coverURL: "",
            sourceURL:"",
            duration: "",
            price: 0,
            message: "",
            errorMessage: "",
            loading: false,
        };
    }



    onSubmit = async event => {
        //let numSongs = await Minim.methods.getNumSongsPurchased().call();
        //console.log(parseInt(numSongs._hex, 16))
        event.preventDefault();
        this.setState({
            loading: true,
            errorMessage: "",
            message: "waiting for blockchain transaction to complete..."
        });
        console.log(this.state.songName)
        try {
            const accounts = await web3.eth.getAccounts();
            await Minim.methods
                .registerSong(this.state.songName,this.state.artistName,this.state.coverURL,this.state.sourceURL,this.state.duration,this.state.price)
                .send({
                    from: accounts[0]
                });
            this.setState({
                loading: false,
                message: "Your song has been registered"
            });
        } catch (err) {
            this.setState({
                loading: false,
                errorMessage: err.message,
                message: "User rejected transaction or transaction failed"
            });
        }
    };


    //waits until componenet is mounted to show widget
    componentWillMount() {
        myWidget = window.cloudinary.createUploadWidget({
            cloudName: "angrythundrwafl",
            uploadPreset: "xn4enrfo",
            sources: [
                "local",
                "url"
            ],
            folder:"/Minim Library/Music/",
            multiple: false,
            defaultSource: "local",
            styles: {
                palette: {
                    window: "#000D1A",
                    windowBorder: "#000D1A",
                    tabIcon: "#31C27C",
                    menuIcons: "#5A616A",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#31C27C",
                    action: "#FF620C",
                    inactiveTabIcon: "#3B7358",
                    error: "#F44235",
                    inProgress: "#31C27C",
                    complete: "#20B832",
                    sourceBg: "#E4EBF1"
                },
                fonts: {
                    default: {
                        active: true
                    }
                }
            }
        },(error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the file info: ', result.info);
                    let url = result.info.url;
                    //todo update json files with new songs added
                    //let rawdata = fs.readFileSync('../song files/fullSongs.json');
                    //let songList = JSON.parse(rawdata);
                    let newSong = {
                        name : this.state.songName,
                        singer: this.state.artistName,
                        cover: this.state.coverURL,
                        musicSrc: result.info.url,
                        duration: this.state.duration,
                        price: this.state.price,
                    };
                    //songList.push(newSong);
                    //console.log(songList)
                    //todo
                }
            }
        );
    }



    render() {
        const labelStyle = {
            color: "white"
        };


        return (
            <div style = {{display: 'block', justifyContent:'center'}} >
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label style={labelStyle}>Song Name</label>
                        <input
                            placeholder="Song Name"
                            onChange={event =>
                                this.setState({
                                    songName: event.target.value
                                })
                            }
                        />

                        <label style={labelStyle}>Artist Name</label>
                        <input
                            placeholder="Artist name"
                            onChange={event =>
                                this.setState({
                                    artistName: event.target.value
                                })
                            }
                        />

                        <label style={labelStyle}>Cover Art URL</label>
                        <input
                            placeholder="Https://yourURL.com"
                            onChange={event =>
                                this.setState({
                                    coverURL: event.target.value
                                })
                            }
                        />

                        <label style={labelStyle}>Music Source URL</label>
                        <input
                            placeholder="Https://yourURL.com"
                            onChange={event =>
                                this.setState({
                                    musicURL: event.target.value
                                })
                            }
                        />

                        <label style={labelStyle}>Duration</label>
                        <input
                            placeholder="MM:SS"
                            onChange={event =>
                                this.setState({
                                    duration: event.target.value
                                })
                            }
                        />

                        <label style={labelStyle}>Price (In Etherium)</label>
                        <input
                            placeholder="##.####"
                            onChange={event =>
                                this.setState({
                                    price: event.target.value
                                })
                            }
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary type="submit" loading={this.state.loading}>
                        <Icon name="check" />
                        Register Song
                    </Button>
                    <Button  type='button' id="upload_widget" style={{backgroundColor:"rgb(49, 194, 124)"}}  onClick={function () {
                        myWidget.open();
                    }}>Upload files</Button>
                    <hr />
                    <h2>{this.state.message}</h2>
                </Form>
            </div>
        );
    }
}
