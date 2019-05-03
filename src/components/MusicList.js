import React, { Component } from "react";
import web3 from "../web3";
import MusicPlayer from "./MusicPlayer";
import { Button, Table } from "reactstrap";

export default class MusicList extends Component {
    constructor(props) {
        super(props);
        this.buildtable = this.buildtable.bind(this);
    }

    buildtable() {
        let tableBody = [];

        for (let i = 0; i < this.props.songList.length; i++) {
            let currentSong = this.props.songList[i];

            if (this.props.songsArePreviews) {
                tableBody.push(
                    <tr key={"previewTableRow" + i}>
                        <td>{currentSong.singer}</td>
                        <td>{currentSong.name}</td>
                        <td>{currentSong.duration}</td>
                        <td>{web3.utils.fromWei(currentSong.price.toString(), "ether")}</td>
                        <td>
                            <Button
                                color="white"
                                style={{ backgroundColor: "rgb(49, 194, 124)" }}
                                disabled={currentSong.purchased}
                                onClick={() => this.props.buySong(currentSong)}
                            >
                                Buy
                            </Button>
                        </td>
                    </tr>
                );
            } else {
                if (currentSong.purchased) {
                    tableBody.push(
                        <tr key={"purchasedTableRow" + i}>
                            <td>{currentSong.singer}</td>
                            <td>{currentSong.name}</td>
                            <td>{currentSong.duration}</td>
                        </tr>
                    );
                }
            }
        }

        return tableBody;
    }

    render() {
        let tableHead = [<th key="thArtist">Artist</th>, <th key="thTitle">Title</th>, <th key="thDuration">Duration</th>];
        if (this.props.songsArePreviews) {
            tableHead.push(<th key="thPrice">Price (Ether)</th>);
            tableHead.push(<th key="thPurchase">Purchase</th>)
        }
        let tableBody = this.buildtable();
        return (
            <div>
                <Table dark stripped={"true"} hover borderless
                    style={{
                        backgroundColor: "rgba(0, 0, 0, .3)"
                    }}
                >
                    <thead>
                        <tr>
                            {tableHead}
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
                <MusicPlayer songList={this.props.songList} songsArePreviews={this.props.songsArePreviews} />
            </div>
        );
    }
}