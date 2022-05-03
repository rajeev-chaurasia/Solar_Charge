//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract SolarCharge {

	struct User {
		string name;
	    address userAccount;
        uint amountPaid;
        uint solcoins;
        bool userAdded;
    }

    mapping (bytes32 => User) public users;

    struct Station {
        uint rate;
        string location;
        uint coinBalance;
        uint lastActivated;
        uint lastDuration;
    }

    mapping (uint => Station) public stations;

	address public owner;
	uint public numUsers;
	uint public numStations;
	uint public coinRate; // coins per ether

    constructor (){
        owner = msg.sender;
		numUsers = 0;
		numStations = 0;
		coinRate = 100000;
    }

	function registerUser(string memory _email, string memory _name) public {
		bytes32 email = stringToBytes(_email);

		if(users[email].userAdded){
			revert();
		}
		
		User storage u = users[email]; 
        u.userAccount = msg.sender;
        u.name = _name;
        u.amountPaid = 0;
        u.solcoins =0;
        u.userAdded = true;
		numUsers += 1;
	}

	function buyCoins(string memory _email) public payable {
		bytes32 email = stringToBytes(_email);

		if(users[email].userAccount!=msg.sender){
			revert();
		}
        users[email].amountPaid += msg.value;
        users[email].solcoins += msg.value*coinRate;
	}

	function addStation(uint ID, uint _rate, string memory _location) public payable {
		if(msg.sender!=owner){
			revert();
		}
		if(stations[ID].rate!=0){
			revert();
		}

		Station storage s = stations[ID]; 
        s.coinBalance = 0;
        s.lastActivated = 0;
        s.lastDuration = 0;
        s.location = _location;
        s.rate = _rate;
        numStations += 1;
	}

	function activateStation(string memory _email, uint ID, uint duration) public {
		bytes32 email = stringToBytes(_email);

		// Station does not exist
		if(stations[ID].rate==0){
			revert("Station doesnot exist");
		}

		// Station is busy
		if(block.timestamp < (stations[ID].lastActivated+stations[ID].lastDuration)){
			revert("Station is busy");
		}

		uint coinsRequired = stations[ID].rate*duration;

		// User has insufficient coins
		if (users[email].solcoins<coinsRequired){
			revert("Insufficient coins");
		}

        users[email].solcoins -= coinsRequired;
        stations[ID].coinBalance += coinsRequired;
        stations[ID].lastActivated = block.timestamp;
        stations[ID].lastDuration = duration*60;
	}

	function getStationState(uint ID) public view returns (bool){
		if(block.timestamp<(stations[ID].lastActivated+stations[ID].lastDuration)){
			return true;
		}else{
			return false;
		}            	
	}

	function getUser(string memory _email) public view returns (string memory name, 
        address userAccount, uint amountPaid, uint solcoins){
		bytes32 email = stringToBytes(_email);
		name = users[email].name;
		userAccount = users[email].userAccount;
        amountPaid = users[email].amountPaid;
        solcoins = users[email].solcoins;
	}

	function getStation(uint ID) public view returns (uint rate, 
            string memory location, uint coinBalance, 
            uint lastActivated, uint lastDuration){
		rate = stations[ID].rate;
        location = stations[ID].location;
        coinBalance = stations[ID].coinBalance;
        lastActivated = stations[ID].lastActivated;
        lastDuration = stations[ID].lastDuration;
	}

	// Converts 'string' to 'bytes32'
	function stringToBytes(string memory s) public pure returns (bytes32) {
	  bytes memory b = bytes(s);
	  uint r = 0;
	  for (uint i = 0; i < 32; i++) {
	      if (i < b.length) {
	          r = r | uint(uint8(b[i]));
	      }
	      if (i < 31) r = r * 256;
	  }
	  return bytes32(r);
	}

}

