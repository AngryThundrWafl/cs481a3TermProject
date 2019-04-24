pragma solidity ^0.4.25;

contract Minim {

    struct Song {
        address owner;
        string songName;
        string artistName;
        string coverArt;
        string musicSource;
        string duration;
        uint price;
    }

    uint numSongsRegistered;
    string[] songsRegistered;
    mapping(string => Song) songInformation;

    mapping(address => uint) numSongsPurchased;
    mapping(address => string[]) songsPurchased;

    function compareStrings(string a, string b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function registerSong(string songName,string artistName,string coverArt, string musicSource, string duration, uint price) public {
        require(!compareStrings(songName, ""), "The song name must not be empty");
        require(songInformation[songName].owner == address(0), "A song with that name already exists");
        numSongsRegistered++;
        songsRegistered.push(songName);
        songInformation[songName] = Song(msg.sender, songName, artistName, coverArt, musicSource, duration, price);
    }

    function updateSongPrice(string songName, uint newPrice) public {
        require(songInformation[songName].owner == msg.sender, "You do not own that song");
        songInformation[songName].price = newPrice;
    }

    function purchaseSong(string songName) public payable {
        require(songInformation[songName].owner != address(0), "A song with that name does not exist");
        require(msg.value == songInformation[songName].price, "The amount sent did not match the price of the song with that name");
        songInformation[songName].owner.transfer(msg.value);
        songsPurchased[msg.sender].push(songName);
        numSongsPurchased[msg.sender] += 1;
    }

    function getSongsRegisteredByIndex(uint index) public view returns(string) {
        require(index >= 0 && index < numSongsRegistered, "Invalid index");
        return songsRegistered[index];
    }

    function getNumSongsPurchased() public view returns(uint) {
        return numSongsPurchased[msg.sender];
    }

    function getSongsPurchasedByIndex(uint index) public view returns(string) {
        require(index >= 0 && index < numSongsPurchased[msg.sender], "Invalid index");
        return songsPurchased[msg.sender][index];
    }

    function getSongPrice(string songName) public view returns(uint) {
        require(songInformation[songName].owner != address(0), "A song with that name does not exist");
        return songInformation[songName].price;
    }

    function getNumSongsRegistered() public view returns(uint) {
        return numSongsRegistered;
    }
}
