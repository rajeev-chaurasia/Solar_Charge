const web3 = require('web3')

const routes = (app, db, accounts, SolarChargeContract) => {
  // Register User
  app.post('/registerUser', async (req, res) => {
    const { email, name, password } = req.body
    console.log('Email : ' + email)
    console.log('Name : ' + name)
    console.log('Password : ' + password)
    try {
      const user = await db.collection('users').findOne({ email: email })
      if (user) {
        console.log(user)
        res.json({
          successStatus: false,
          message: 'User already registered.Please login.',
        })
      } else {
        await db
          .collection('users')
          .insertOne({ email: email, name: name, password: password })

        const result = await SolarChargeContract.methods
          .registerUser(email, name)
          .send({ from: accounts[1], gas: 200000 })
        console.log(result)

        res.json({
          successStatus: true,
          message: 'User registered successfully.',
        })
      }
    } catch (e) {
      console.error(e)
    }
  })

  //Login User
  app.post('/loginUser', async (req, res) => {
    const { email, password } = req.body
    console.log('Email : ' + email)
    console.log('Password : ' + password)

    try {
      const user = await db.collection('users').findOne({ email: email })
      if (user) {
        if (user.password !== password) {
          res.json({
            successStatus: false,
            message: 'Incorrect password.',
          })
        } else {
          const result = await SolarChargeContract.methods
            .getUser(email)
            .call((error, result) => {
              if (error) {
                console.log(error)
                throw error
              } else {
                console.log(result)
                res.json({
                  successStatus: true,
                  message: 'User logged in successfully.',
                  email: email,
                })
              }
            })
        }
      } else {
        res.json({
          successStatus: false,
          message: 'User doesnot exist',
        })
      }
    } catch (err) {
      console.error(err)
    }
  })

  // Buy Coins
  app.post('/buyCoins', async (req, res) => {
    const { email, etherAmount } = req.body
    console.log(
      ' Buy coins request from : ' + email + ' for ' + etherAmount + ' ether',
    )
    try {
      const result = await SolarChargeContract.methods.buyCoins(email).send({
        from: accounts[1],
        value: web3.utils.toWei(etherAmount, 'ether'),
      })
      console.log(result)
      res.json({
        successStatus: 'true',
        message: 'Coins bought successfully.',
      })
    } catch (e) {
      res.json({
        successStatus: 'false',
        message: e.data.stack.split('\n')[0],
      })
    }
  })

  //Add Station
  app.post('/addStation', async (req, res) => {
    const { ID, rate, location } = req.body
    console.log(' New Station Add Request')
    console.log(' ID : ' + ID + ' Rate : ' + rate + ' Location : ' + location)
    try {
      const result = await SolarChargeContract.methods
        .addStation(ID, rate, location)
        .send({ from: accounts[0] })
      console.log(result)
      res.send('Station added successfully')
    } catch (e) {
      console.error(e)
    }
  })

  // Activate Station
  app.post('/activateStation', async (req, res) => {
    const { email, ID, duration } = req.body
    console.log(' Station Activation Request')
    console.log('Email : ' + email + ' ID : ' + ID + ' Duration : ' + duration)
    try {
      const result = await SolarChargeContract.methods
        .activateStation(email, ID, duration)
        .send({ from: accounts[1], gas: 200000 })
      console.log(result)
      res.json({
        successStatus: true,
        message: `Station with Id ${ID} activated successfully.`,
        transactionId : result.transactionHash,
        minutesCharged : duration
      })
    } catch (e) {
      res.json({
        successStatus: false,
        message: e.data[Object.keys(e.data)[0]].reason,
      })
    }
  })

  // Get Station Details
  app.get('/getStation', async (req, res) => {
    const { ID } = req.query
    console.log(' Get station details request')
    const result = await SolarChargeContract.methods
      .getStation(ID)
      .call((error, result) => {
        if (error) {
          console.log(error)
          throw error
        } else {
          console.log(result)
          if (result.rate === '0') {
            res.json({ successStatus: false, message: 'Incorrect station Id.' })
          } else {
            const object = {
              stationID: ID,
              rate: result.rate,
              location: result.location,
              coinBalance: result.coinBalance,
              lastActivated: result.lastActivated,
              lastDuration: result.lastDuration,
              successStatus: true,
            }
            res.json(object)
          }
        }
      })
  })

  // Get User Details
  app.get('/getUser', async (req, res) => {
    const { email } = req.query
    console.log(' Get user details request ')
    const result = await SolarChargeContract.methods
      .getUser(email)
      .call((error, result) => {
        if (error) {
          console.log(error)
          throw error
        } else {
          console.log(result)
          const object = {
            email: email,
            name: result.name,
            userAccount: result.userAccount,
            amountPaid: result.amountPaid,
            solcoins: result.solcoins,
          }
          res.json(object)
        }
      })
  })

  // Get Station State
  app.get('/getStationState', async (req, res) => {
    const { ID } = req.query
    console.log('Get station state')
    try {
      const result = await SolarChargeContract.methods
        .getStationState(ID)
        .call()
      res.send({ Id: ID, state: result })
    } catch (e) {
      console.error(e)
    }
  })

  // Get Number of Users
  app.get('/numUsers', async (req, res) => {
    const counter = await SolarChargeContract.methods.numUsers().call()
    console.log(counter)
    res.send('Number of users : ' + counter)
  })

  // Get Number of Stations
  app.get('/numStations', async (req, res) => {
    const counter = await SolarChargeContract.methods.numStations().call()
    console.log(counter)
    res.send('Number of Stations : ' + counter)
  })
}

module.exports = routes
