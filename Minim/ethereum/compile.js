// invoke the compiler by executing "node compile.js" from the ethereum directory
/*
  This code was taken directly from Project 2: TrojanSecret -- web3 & React
  Credit for this code goes to:
    Dr. Joseph Gersch (http://www.cs.colostate.edu/~gersch/#/), the Instructor for CS481a3 Spring 2019 (http://www.cs.colostate.edu/~cs481a3/#/)
  As well as the TAs:
    Anurag Kumar (anurag.kumar@colostate.edu)
    Dziugas Butkus (dziugas@rams.colostate.edu)
 */
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const TSPath = path.resolve(__dirname, "contracts", "Minim.sol");
const source = fs.readFileSync(TSPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
