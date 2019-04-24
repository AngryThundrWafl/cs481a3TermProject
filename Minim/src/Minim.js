import web3 from "./web3";

const address = "0x1daf37d3dda022519759dddbf6b3761bf7b150f6";

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
                "type": "string"
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
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "songName",
                "type": "string"
            }
        ],
        "name": "getSongPrice",
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
        "inputs": [],
        "name": "getNumSongsRegistered",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

export default new web3.eth.Contract(abi, address);
