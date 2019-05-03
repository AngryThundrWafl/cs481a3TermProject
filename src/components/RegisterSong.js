import React, { Component } from "react";
import { Button, Container, Form, Icon, Message } from "semantic-ui-react";
import web3 from "../web3";
import Minim from "../Minim";

let musicUpload, coverUpload;

const uploadOptions = {
    cloudName: "angrythundrwafl",
    uploadPreset: "xn4enrfo",
    sources: [
        "local",
        "url"
    ],
    folder: "/Minim Library/Music/",
    multiple: false,
    defaultSource: "local",
    maxFiles: 1,
    showPoweredBy: false,

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
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: "",
            artistName: "",
            coverURL: "",
            sourceURL: "",
            duration: "",
            price: 0,
            message: "",
            errorMessage: "",
            loading: false,
            shown: true,
            songUploaded: false,
            coverUploaded: false,
        };
    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({
            loading: true,
            errorMessage: "",
            message: "waiting for blockchain transaction to complete..."
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await Minim.methods
                .registerSong(
                    this.state.songName,
                    this.state.artistName,
                    this.state.coverURL,
                    this.state.sourceURL,
                    this.state.duration,
                    web3.utils.toWei(this.state.price, 'ether'))
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

    //waits until component is mounted to show widget
    componentWillMount() {
        musicUpload = window.cloudinary.createUploadWidget(uploadOptions, (error, result) => {
            if (!error && result && result.event === "success") {
                let url = result.info.secure_url;
                this.setState({ sourceURL: url });
                this.setState({
                    songUploaded: true
                });
                if (this.state.songUploaded === true && this.state.coverUploaded === true) {
                    this.setState({
                        shown: !this.state.shown
                    })
                }
            }
        });

        let coverOptions = uploadOptions;
        coverOptions.folder = "/Minim Library/Cover Art/";
        coverUpload = window.cloudinary.createUploadWidget(uploadOptions, (error, result) => {
            if (!error && result && result.event === "success") {
                let url = result.info.secure_url;
                this.setState({ coverURL: url });
                this.setState({ coverUploaded: true });
                if (this.state.songUploaded === true && this.state.coverUploaded === true) {
                    this.setState({ shown: !this.state.shown });
                }
            }
        });
    }

    render() {
        const labelStyle = {
            color: "white"
        };

        let hidden = {
            display: this.state.shown ? "none" : "block"
        };

        return (
            <div style={{ display: 'block', justifyContent: 'center' }} >
                <Container>
                    <img
                        src={this.state.coverURL}
                        alt="new"
                        style={{
                            display: this.state.shown ? "none" : "block",
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '50%',
                        }}
                    />
                    <br style={hidden} />
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field style={hidden}>
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

                            <label style={labelStyle}>Duration</label>
                            <input
                                placeholder="MM:SS"
                                onChange={event =>
                                    this.setState({
                                        duration: event.target.value
                                    })
                                }
                            />

                            <label style={labelStyle}>Price (In Ether)</label>
                            <input
                                placeholder="##.####"
                                onChange={event =>
                                    this.setState({
                                        price: event.target.value
                                    })
                                }
                            />
                        </Form.Field>
                        <br style={hidden} />
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button className="mt-2" style={hidden} primary type="submit" loading={this.state.loading}>
                            <Icon name="check" />
                            Register Song
                    </Button>
                        <br style={hidden} />
                        <h5 style={{ display: !this.state.shown ? "none" : "block" }}>Upload a song first then populate fields to register your song.</h5>
                        <Button type='button' id="upload_widget" style={{ backgroundColor: "rgb(49, 194, 124)" }} onClick={function () {
                            musicUpload.open();
                        }}>Upload Song</Button>
                        <Button type='button' id="upload_widget" style={{ backgroundColor: "rgb(49, 194, 124)" }} onClick={function () {
                            coverUpload.open();
                        }}>Upload Cover</Button>
                        <hr />
                        <h2>{this.state.message}</h2>
                    </Form>
                </Container>
            </div>
        );
    }
}
