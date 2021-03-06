// invoke the deployment with "node deploy.js" from the ethereum directory
/*
  This code was taken directly from Project 2: TrojanSecret -- web3 & React
  Credit for this code goes to:
    Dr. Joseph Gersch (http://www.cs.colostate.edu/~gersch/#/), the Instructor for CS481a3 Spring 2019 (http://www.cs.colostate.edu/~cs481a3/#/)
  As well as the TAs:
    Anurag Kumar (anurag.kumar@colostate.edu)
    Dziugas Butkus (dziugas@rams.colostate.edu)
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const compiledMinim= require("./build/Minim.json");
console.log(compiledMinim.interface);
console.log("Copy this ABI into the ABI json variable in file trojanSecret.js");


const provider = new HDWalletProvider(
  "expose scare soft swim turtle indoor need idea load scissors steel rotate",
  "https://rinkeby.infura.io/v3/d02fc78121d3408787f5e8e3dfdfd802"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  console.log("attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledMinim.interface)
  )
    .deploy({ data: compiledMinim.bytecode })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("Contract deployed to rinkeby at", result.options.address);
  console.log("Copy this contract address into the address variable in file trojanSecret.js");
};

deploy();


/*

attempting to deploy from account 0x4327D8b79AB0499F81dD801db4365CdC914d6f3f
Contract deployed to rinkeby at 0x9442086DacD07C54381D865cad2160ce921bf1A6

 */

/* Remix deployment from 0x432... deployed to Rinkeby at 0x0114a98807f33ef62c853ef55cc83acf288e54c8 */
