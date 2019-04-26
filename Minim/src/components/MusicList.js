import React, { Component } from "react";
import web3 from "../web3";
import Minim from "../Minim.js";
import { Container, Card } from "semantic-ui-react";
import { Button,Table } from 'reactstrap';

export default class MusicList extends Component {
    constructor(props) {
        super(props);
        this.buildtable = this.buildtable.bind(this);
    }

    buildtable(){
        let tableBody = [];
        let coverFound = false;
        for(let i = 0; i < 2; i++){
            if(this.props.boughtSong[i] === true && this.props.isAvailable === false){
                tableBody.push(
                    <tr>
                        <td>{this.props.fullAudioList[i].singer}</td>
                        <td>{this.props.fullAudioList[i].name}</td>
                        <td>{this.props.fullAudioList[i].duration}</td>
                    </tr>
                );
            }//if song isn't bought we add song to preview playlist
            else if(this.props.boughtSong[i] === false && this.props.isAvailable === true){
                tableBody.push(
                    <tr>
                        <td>{this.props.previewAudioList[i].singer}</td>
                        <td>{this.props.previewAudioList[i].name}</td>
                        <td>{this.props.previewAudioList[i].duration}</td>
                        <td>{this.props.previewAudioList[i].price}</td>
                        <td><Button color="white" style={{backgroundColor:"rgb(49, 194, 124)"}} onClick={() => this.props.buySong(i)}>Buy</Button></td>
                    </tr>
                );
            }
        }
        return tableBody;
    }

    render() {
        let tableHead = [<th>Artist</th>,<th>Title</th>,<th>Duration</th>];
        if(this.props.isAvailable === true){
            tableHead.push(<th>Price</th>);
            tableHead.push(<th>Purchase</th>)
        }
        let tableBody = this.buildtable();
        return (
            <div>
                <Table dark stripped={"true"} hover borderless
                    style={{
                        backgroundColor: "rgba(0,0,0, .3)"
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
            </div>
        );
    }
}