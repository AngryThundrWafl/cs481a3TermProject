import React, { Component } from "react";
import web3 from "../web3";
import Minim from "../Minim.js";
import { Container, Card } from "semantic-ui-react";

//music player npm package
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";


const options = {
    //music library preview songs only go to 20 seconds
    defaultPosition: {
        top: 300,
        left: 120
    },
    mode: "full",
    autoPlay: false,
    once: true,
    showDownload: false,
    remove: false,
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
                playList.push(this.props.fullAudioList[i]);
            }//if song isnt bought we add song to preview playlist
            else if(this.props.boughtSong[i] === false && this.props.isAvailable === true){
                playList.push(this.props.previewAudioList[i]);
            }
        }
        return playList;
    }


    render() {
        let playList = this.buildPlaylist();
        let option = options;
        return (
            <ReactJkMusicPlayer audioLists={playList} {...option}/>
        );
    }


}
