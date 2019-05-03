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

const testSong = {
  songName: "Test Song Name",
  artistName: "Test Artist Name",
  coverArt: "https://testurl/test-cover-art.jpg",
  musicSource: "https://testurl/test-music-src.mp3",
  duration: "5:00",
  price: web3.utils.toWei('0.001', 'ether')
};

it("Test registerSong", async () => {
  await Minim.methods.registerSong(
    testSong.songName,
    testSong.artistName,
    testSong.coverArt,
    testSong.musicSource,
    testSong.duration,
    testSong.price
  )
    .send({
      from: accounts[1],
      gas: "1000000"
    });

  const numSongs = await Minim.methods.numSongsRegistered().call({
    from: accounts[1]
  });

  assert(numSongs == 1)
});

it("Test updateSongPrice", async () => {
  await Minim.methods.registerSong(
    testSong.songName,
    testSong.artistName,
    testSong.coverArt,
    testSong.musicSource,
    testSong.duration,
    testSong.price
  )
    .send({
      from: accounts[1],
      gas: "1000000"
    });

  const songInformation = await Minim.methods.getSongsRegisteredByIndex(0).call({
    from: accounts[1]
  });

  let price = songInformation[6];
  assert(price == testSong.price);

  const newPrice = web3.utils.toWei('0.002', 'ether');
  await Minim.methods.updateSongPrice(testSong.songName, newPrice).send({
    from: accounts[1],
    gas: "1000000"
  });

  const updatedSongInformation = await Minim.methods.getSongsRegisteredByIndex(0).call({
    from: accounts[1]
  });

  price = updatedSongInformation[6];

  assert(price == newPrice);
});

it("Test purchaseSong & getNumSongsPurchased", async () => {
  await Minim.methods.registerSong(
    testSong.songName,
    testSong.artistName,
    testSong.coverArt,
    testSong.musicSource,
    testSong.duration,
    testSong.price
  )
    .send({
      from: accounts[1],
      gas: "1000000"
    });

  await Minim.methods.registerSong(
    testSong.songName + "2",
    testSong.artistName + "2",
    testSong.coverArt + "2",
    testSong.musicSource + "2",
    testSong.duration + "2",
    testSong.price
  )
    .send({
      from: accounts[1],
      gas: "1000000"
    });

  await Minim.methods.purchaseSong(testSong.songName).send({
    from: accounts[1],
    value: testSong.price,
    gas: "1000000"
  });

  await Minim.methods.purchaseSong(testSong.songName + "2").send({
    from: accounts[1],
    value: testSong.price,
    gas: "1000000"
  });

  const numSongs = await Minim.methods.getNumSongsPurchased().call({
    from: accounts[1]
  });

  assert(numSongs == 2)
});

it("Test purchaseSong & getSongsPurchasedByIndex", async () => {
  await Minim.methods.registerSong(
    testSong.songName,
    testSong.artistName,
    testSong.coverArt,
    testSong.musicSource,
    testSong.duration,
    testSong.price
  )
    .send({
      from: accounts[1],
      gas: "1000000"
    });

  await Minim.methods.purchaseSong(testSong.songName).send({
    from: accounts[1],
    value: testSong.price,
    gas: "1000000"
  });

  const songName = await Minim.methods.getSongsPurchasedByIndex(0).call({
    from: accounts[1]
  });

  assert(songName == testSong.songName)
});

it("Test registerSong & getSongsRegisteredByIndex", async () => {
  await Minim.methods.registerSong(
    testSong.songName,
    testSong.artistName,
    testSong.coverArt,
    testSong.musicSource,
    testSong.duration,
    testSong.price
  )
    .send({
      from: accounts[1],
      gas: "1000000"
    });

  await Minim.methods.purchaseSong(testSong.songName).send({
    from: accounts[1],
    value: testSong.price,
    gas: "1000000"
  });

  const songInformation = await Minim.methods.getSongsRegisteredByIndex(0).call({
    from: accounts[1]
  });

  let owner = songInformation[0];
  let songName = songInformation[1];
  let artistName = songInformation[2];
  let coverArt = songInformation[3];
  let musicSource = songInformation[4];
  let duration = songInformation[5];
  let price = songInformation[6];

  assert(owner == accounts[1]);
  assert(songName == testSong.songName);
  assert(artistName == testSong.artistName);
  assert(coverArt == testSong.coverArt);
  assert(musicSource == testSong.musicSource);
  assert(duration == testSong.duration);
  assert(price == testSong.price);
});