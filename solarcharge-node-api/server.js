const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient;
const contract = require('@truffle/contract');
const artifacts = require('./build/contracts/SolarCharge.json');
const SOLARCHARGE_ABI = require('./config');
const SOLARCHARGE_ADDRESS = require('./config');
const MONGODB_USERNAME = require('./config');
const MONGODB_PASSWORD = require('./config');

app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
        var web3 = new Web3(web3.currentProvider); 
} else {
        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

mongodb.connect('mongodb://' + MONGODB_USERNAME.MONGODB_USERNAME+ ':' + MONGODB_PASSWORD.MONGODB_PASSWORD + '@127.0.0.1:27017/solarcharge-node-api',
        {
                authSource:'admin',
                useUnifiedTopology: true,
        }, async (err, client) => {
        const db =client.db();
        const accounts = await web3.eth.getAccounts();
        const SolarChargeContract = new web3.eth.Contract(SOLARCHARGE_ABI.SOLARCHARGE_ABI, SOLARCHARGE_ADDRESS.SOLARCHARGE_ADDRESS);
        routes(app, db, accounts, SolarChargeContract);
        app.listen(process.env.PORT || 3001, () => {
                console.log('listening on port '+ (process.env.PORT || 3001));
        });
});