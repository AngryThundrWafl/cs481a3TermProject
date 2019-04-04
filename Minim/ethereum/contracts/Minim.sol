pragma solidity ^0.4.25;

contract Minim {
    // Data Types

    // Remember: simple variables can be viewed with a CALL without having to define a getter function

    string public name;
    string public symbol;

    uint amount_for_unlock;
    uint public memberCount;

    mapping (string => address)Trojans;     // account names
    mapping (string => string) secrets;     // account secret messages
    mapping (string => address[]) access;   // dynamic list of accounts that have unlocked a particular account secret
    mapping (address => uint) balance;      // account piggy-banks.  No ether, just increments each time someone unlocks my secret.


    //Constructor

    // Set up state variables
    constructor() public{
        name = "Secrets";                   // not really used for anything
        symbol = "S";                       // neither is this one
        amount_for_unlock =1 ether;         // how much ether need to unlock a secret
        // don't need to set memberCount, it is already zero, so don't waste gas
    }

    //functions

    // utility function to compare strings
    function compareStrings (string a, string b) view returns (bool){
        return keccak256(a) == keccak256(b);
    }

    // Register a new Trojan account
    function registerTrojan(string name) public {
        // throw exception if user name is null or already registered
        require( !compareStrings(name, "") && Trojans[name] == address(0) );
        memberCount ++;
        Trojans[name] = msg.sender;
    }

    // Delete a user account
    function unregisterTrojan(string name) public {
        // ensure that the account exists and belongs to the sender
        require( Trojans[name] != address(0) && Trojans[name] == msg.sender );
        Trojans[name] = address(0);
        memberCount --;
    }

    // Create a secret message for an account
    function setSecret(string name, string message) public{
        // ensure that the account exists and belongs to the sender
        require( Trojans[name] != address(0) && Trojans[name] == msg.sender );
        secrets[name] = message;

    }

    // read the secret message if it is unlocked
    function getSecret(string name) public view returns(string){
        require( Trojans[name] != address(0) );
        bool flag = false;  // this is a memory variable; just FYI

        // check to see if user is in list of users that have unlocked the message
        for ( uint i = 0 ; i < access[name].length ; i ++){
            if(access[name][i] == msg.sender){
                flag = true;
                break;
            }
        }
        if (flag ){
            return secrets[name];
        }
        return "message is locked";
    }


    // pay to play:  unlock someone's message
    function unlockMessage(string name ) public payable {
        require( Trojans[name] != address(0) &&  msg.value == amount_for_unlock);
        balance[Trojans[name]] += msg.value;
        Trojans[name].transfer(msg.value);
        access[name].push(msg.sender);
    }

    // piggy-bank to keep track of how much money I made from users that have unlocked my secret message
    function getBalance() public view returns(uint) {
        return balance[msg.sender];
    }

}