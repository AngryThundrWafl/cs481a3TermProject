import web3 from "./web3";

const address = "0x9eACA3d473ED03101444eEd83279AC2e9a7cD2f3";

const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "songName",
                "type": "string"
            },
            {
                "name": "artistName",
                "type": "string"
            },
            {
                "name": "coverArt",
                "type": "string"
            },
            {
                "name": "musicSource",
                "type": "string"
            },
            {
                "name": "duration",
                "type": "string"
            },
            {
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "registerSong",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "numSongsRegistered",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getSongsPurchasedByIndex",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "songName",
                "type": "string"
            },
            {
                "name": "newPrice",
                "type": "uint256"
            }
        ],
        "name": "updateSongPrice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getSongsRegisteredByIndex",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getNumSongsPurchased",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "songName",
                "type": "string"
            }
        ],
        "name": "purchaseSong",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];

export default new web3.eth.Contract(abi, address);
