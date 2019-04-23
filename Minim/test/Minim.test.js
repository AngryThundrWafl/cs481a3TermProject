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

it("Test registerSong", async () => {
  await Minim.methods.registerSong("This is just a test!",0.001).send({
    from: accounts[1],
    gas: "1000000"
  });
  const numSongs = await Minim.methods.numSongsRegistered().call({
    from: accounts[1]
  });

  assert(numSongs == 1)
});

it("Test getSongPrice", async () => {
  await Minim.methods.registerSong("price test",1).send({
    from: accounts[1],
    gas: "1000000"
  });
  const songPrice = await Minim.methods.getSongPrice("price test").call({
    from: accounts[1]
  });

  assert(songPrice == 1)
});

it("Test purchaseSong & getNumSongsPurchased", async () => {
  await Minim.methods.registerSong("buy me!",1).send({
    from: accounts[1],
    gas: "1000000"
  });

  await Minim.methods.registerSong("buy us both!",2).send({
    from: accounts[1],
    gas: "1000000"
  });


  await Minim.methods.purchaseSong("buy me!").send({
    from: accounts[1],
    value: 1,
    gas: "1000000"
  });

  await Minim.methods.purchaseSong("buy us both!").send({
    from: accounts[1],
    value: 2,
    gas: "1000000"
  });

  const numSongs = await Minim.methods.getNumSongsPurchased().call({
    from: accounts[1]
  });

  assert(numSongs == 2)
});

it("Test purchaseSong & getSongsPurchasedByIndex", async () => {
  await Minim.methods.registerSong("buy me!",1).send({
    from: accounts[1],
    gas: "1000000"
  });

  await Minim.methods.purchaseSong("buy me!").send({
    from: accounts[1],
    value: 1,
    gas: "1000000"
  });

  const songName = await Minim.methods.getSongsPurchasedByIndex(0).call({
    from: accounts[1]
  });

  assert(songName == "buy me!")
});

it("Test registerSong & getSongsRegisteredByIndex", async () => {
  await Minim.methods.registerSong("buy me!",1).send({
    from: accounts[1],
    gas: "1000000"
  });

  await Minim.methods.purchaseSong("buy me!").send({
    from: accounts[1],
    value: 1,
    gas: "1000000"
  });
  const songName = await Minim.methods.getSongsRegisteredByIndex(0).call({
    from: accounts[1]
  });

  assert(songName == "buy me!")
});