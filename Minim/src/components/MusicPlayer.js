import React, { Component } from "react";

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
    //build the available and owned playlist for the player
    buildPlaylist() {
        let playList = [];

        for (let i = 0; i < this.props.songList.length; i++) {
            let currentSong = this.props.songList[i];
            if (this.props.songsArePreviews) {
                playList.push(this.previewSong(currentSong));
            } else if (currentSong.purchased) {
                playList.push(currentSong);
            }
        }

        return playList;
    }

    //function creates a preview audio from full audio
    previewSong(fullSong) {
        const baseurl = 'https://res.cloudinary.com/angrythundrwafl/video/upload/';
        let preview = JSON.parse(JSON.stringify(fullSong)); // clone song object
        let fullurl = fullSong.musicSrc;
        let first = fullurl.substr(0, baseurl.length);
        let last = fullurl.substr(baseurl.length, fullurl.length);
        preview.musicSrc = first + "so_0,eo_20/" + last;
        preview.duration = "0:20";

        return preview;
    }

    render() {
        return (
            <ReactJkMusicPlayer audioLists={this.buildPlaylist()} {...options} />
        );
    }
}
