pragma solidity ^0.4.25;

contract Minim {

    uint songPrice;

    uint numSongsRegistered;
    string[] songsRegistered;
    mapping(string => address) songOwners;

    mapping(address => uint) numSongsPurchased;
    mapping(address => string[]) songsPurchased;

    constructor() public {
        songPrice = 0.1 ether;
        // numSongsRegistered initialized to 0 by default
    }

    function compareStrings(string a, string b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function registerSong(string songName) public {
        require(!compareStrings(songName, ""), "The song name must not be empty");
        require(songOwners[songName] == address(0), "A song with that name already exists");
        numSongsRegistered++;
        songsRegistered.push(songName);
        songOwners[songName] = msg.sender;
    }

    function purchaseSong(string songName) public payable {
        require(songOwners[songName] != address(0), "A song with that name does not exist");
        require(msg.value == songPrice, "Exactly 0.1 ether is required to purchase a song");
        songOwners[songName].transfer(msg.value);
        songsPurchased[msg.sender].push(songName);
        numSongsPurchased[msg.sender] += 1;
    }

    function getSongsRegisteredByIndex(uint index) public view returns(string) {
        require(index >= 0 && index < numSongsPurchased[msg.sender], "Invalid index");
        return songsRegistered[index];
    }

    function getNumSongsPurchased() public view returns(uint) {
        return numSongsPurchased[msg.sender];
    }

    function getSongsPurchasedByIndex(uint index) public view returns(string) {
        require(index >= 0 && index < numSongsPurchased[msg.sender], "Invalid index");
        return songsPurchased[msg.sender][index];
    }

}
