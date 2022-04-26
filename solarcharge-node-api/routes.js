const web3 = require('web3');

const routes = (app, db, accounts, SolarChargeContract) => {
   
    app.get('/registerUser' , async(req , res) => {
             const { email , name } = req.body;
             console.log("Email : " + email);
             console.log("Name : " + name);
             try{
                const result = await SolarChargeContract.methods.registerUser(email , name).send({from : accounts[1] , gas : 200000});
                console.log(result);
                res.send("User registered successfully");
             }catch(e){
                console.error(e);
             }
    });

    app.get('/buyCoins' , async (req, res) => {
        const { email , etherAmount } = req.body;
        console.log(" Buy coins request from : " + email + " for " + etherAmount + " ether");
        try{
          const result = await SolarChargeContract.methods.buyCoins(email).send({ from: accounts[1], value: web3.utils.toWei(etherAmount , 'ether') });
          console.log(result);
          res.send('Coins bought successfully');
        }catch(e){
            console.error(e);
        }
    });

    app.get('/addStation' , async(req, res) => {
            const { ID, rate, location } = req.body;
            console.log(" New Station Add Request");
            console.log(" ID : " + ID + " Rate : " + rate + " Location : " + location);
            try{
                const result = await SolarChargeContract.methods.addStation(ID, rate, location).send({from : accounts[0]});
                console.log(result);
                res.send("Station added successfully");
            }catch(e){
                console.error(e);
            }
            
    });

    app.get('/activateStation' , async (req, res) => {
            const { email , ID , duration } = req.body;
            console.log(" Station Activation Request");
            console.log("Email : " + email + " ID : " + ID + " Duration : " + duration);
        try{
            const result = await SolarChargeContract.methods.activateStation(email , ID , duration).send({ from: accounts[1] , gas : 200000 });
            console.log(result);
            res.send('Station Activated successfully');
        }catch(e){
            console.error(e);
        }
    });

    app.get('/getStation' , async (req, res) => {
            const { ID } = req.query;
            console.log(" Get station details request");
            const result = await SolarChargeContract.methods.getStation(ID).call((error , result) => {
                if(error){
                    console.log(error);
                    throw error;
                }else{
                    console.log(result);
                    res.json(result);
                }
            });
    });

    app.get('/getUser' , async (req, res) => {
            const { email } = req.query;
            console.log(" Get user details request ");
            const result = await SolarChargeContract.methods.getUser(email).call((error , result) => {
                if(error){
                    console.log(error);
                    throw error;
                }else{
                    console.log(result);
                    res.json(result);
                }
            });;
    }); 

    app.get('/getStationState' , async (req, res) => {
            const { ID } = req.query;
            console.log("Get station state");
        try{
            const result = await SolarChargeContract.methods.getStationState(ID).call();
            res.send({"Id" : ID , "state" : result});
        }catch(e){
            console.error(e);
        }       
    });

    app.get('/numUsers' , async(req , res) => {
           const counter = await SolarChargeContract.methods.numUsers().call();
           console.log(counter);
           res.send("Number of users : " +  counter);
    });

   
    app.get('/numStations' , async(req , res) => {
        const counter = await SolarChargeContract.methods.numStations().call();
        console.log(counter);
        res.send("Number of Stations : " +  counter);
     });

}

module.exports = routes


// Note :  Check activation of station 
// it should not be reactivated i