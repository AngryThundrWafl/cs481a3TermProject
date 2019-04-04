const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledMinim = require("../ethereum/build/Minim.json");

let accounts;
let Minim;

// this mocha test suite is executed by the command "npm run test"


// each "it" block will execute a clean slate deployment of the contract with automatic "beforeEach" invocation
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // console.log(accounts);

  Minim = await new web3.eth.Contract(
    JSON.parse(compiledMinim.interface)
  )
    .deploy({ data: compiledMinim.bytecode })
    .send({ from: accounts[0], gas: "2000000" });
});

// The test suite is given in a DESCRIBE function calling multiple IT functions as tests

describe("Minim Contract", () => {

  it("contract can be deployed", () => {
    assert.ok(Minim.options.address);
  });

});
