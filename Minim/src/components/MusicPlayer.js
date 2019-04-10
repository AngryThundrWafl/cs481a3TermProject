import React, { Component } from "react";
import web3 from "../web3";
import Minim from "../Minim.js";
import { Container, Card } from "semantic-ui-react";

//music player npm package
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

//AudioLists for preview and full songs
const previewAudioList = [
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
];

const fullAudioList = [
    {
        name: "Bordem",
        singer: "Tyler The Creator",
        cover: "https://res.cloudinary.com/angrythundrwafl/image/upload/v1554430820/Minim%20Library/Cover%20Art/DEEg9ZmUIAAcdEb.jpg",
        musicSrc: "https://res.cloudinary.com/angrythundrwafl/video/upload/v1554430881/Minim%20Library/Music/08_Tyler_The_Creator_-_Boredom.mp3",
    },
    {
        name: "Rush Hour",
        singer: "Mac Miller",
        cover: "https://res.cloudinary.com/angrythundrwafl/image/upload/v1554431255/Minim%20Library/Cover%20Art/cover.jpg",
        musicSrc: "https://res.cloudinary.com/angrythundrwafl/video/upload/v1554431252/Minim%20Library/Music/03._Rush_Hour.mp3",
    }
];

const options = {
    //music library preview songs only go to 20 seconds
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
    constructor(props) {
        super(props);
        this.state = {
            numberOfSongs: 2,
        };
        this.buildPlaylist = this.buildPlaylist.bind(this);
    }


    //build the availible and owned playlist for the player
    buildPlaylist(){
        let playList = [];
        //loops through songs and adds them if bought or not
        for(let i = 0; i < 2; i++){
            //checks if the song is bought then full song goes to available playlist
            if(this.props.boughtSong[i] === true && this.props.isAvailable === false){
                playList.push(fullAudioList[i]);
            }//if song isnt bought we add song to preview playlist
            else if(this.props.boughtSong[i] === false && this.props.isAvailable === true){
                playList.push(previewAudioList[i]);
            }
        }
        return playList;
    }


    render() {
        let playList = this.buildPlaylist();
        return (
            <ReactJkMusicPlayer audioLists={playList} {...options}/>
        );
    }


}
