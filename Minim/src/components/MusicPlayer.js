import React, { Component } from "react";
import Minim from "../Minim.js";

//music player npm package
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";


//let playList = [];

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
        this.previewSong = this.previewSong.bind(this);
    }

    //componentWillMount() {
    //    playList =  this.buildPlaylist();
    //}

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
                let preview = this.previewSong(this.props.fullAudioList[i]);
                //console.log(preview);
                playList.push(preview);
            }
        }
        return playList;
    }

    //function creates a preview audio from full audio
    previewSong(fullSong){
        let preview = fullSong;
        let fullurl = fullSong.musicSrc;
        let first = fullurl.substr(0,56);
        //console.log("first", first);
        let last = fullurl.substr(55, fullurl.length);
        //console.log('last',last);
        preview.musicSrc = first + "so_0,eo_20" + last;
        return preview;
    }


    render() {
        //playList = this.buildPlaylist();
        return (
            <ReactJkMusicPlayer audioLists={this.buildPlaylist()} {...options}/>
        );
    }


}
