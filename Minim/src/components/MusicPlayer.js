import React, { Component } from "react";
import web3 from "../web3";
import Minim from "../Minim.js";
import { Container, Card } from "semantic-ui-react";
//music player npm package
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

//Options for music player react component audioList contains info of our music source, title, and song name
const options = {
    //music library preview songs only go to 20 seconds
    audioLists: [
        {
            name: "Bordem",
            singer: "Tyler The Creator",
            cover: "https://res.cloudinary.com/angrythundrwafl/image/upload/v1554430820/Minim%20Library/Cover%20Art/DEEg9ZmUIAAcdEb.jpg",
            musicSrc: "https://res.cloudinary.com/angrythundrwafl/video/upload/v1554436480/Minim%20Library/Music%20Preview/08_Tyler_The_Creator_-_Boredom-Preview.mp3",
        },
        {
            name: "Rush Hour",
            singer: "Mac Miller",
            cover: "https://res.cloudinary.com/angrythundrwafl/image/upload/v1554431255/Minim%20Library/Cover%20Art/cover.jpg",
            musicSrc: "https://res.cloudinary.com/angrythundrwafl/video/upload/v1554436475/Minim%20Library/Music%20Preview/03._Rush_Hour-Preview.mp3",
        }
    ],
    defaultPosition: {
        top: 300,
        left: 120
    },
    mode: "full",
    autoPlay: false,
    once: true,
    defaultPlayIndex: 0,
};

export default class MusicPlayer extends Component {

    render() {
        return (
            <ReactJkMusicPlayer {...options}/>
        );
    }


}
