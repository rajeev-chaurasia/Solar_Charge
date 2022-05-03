import 'react-native-gesture-handler'
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { Input } from 'react-native-elements'
import Styles from '../../assets/css/Styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock, faCoins } from '@fortawesome/free-solid-svg-icons'
import { BASE_IP } from '../../config'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const device = Dimensions.get('window')

export default class Transaction extends Component {
  state = {
    email: '',
    stationID: '',
    stationLocation: '',
    stationRate: 0,
    minutesToCharge: '',
    solarCoinsToPay: 0,
  }

  componentDidMount = async () => {
    const stationId = this.props.route.params.stationID

    await AsyncStorage.getItem('email').then((res) => {
      this.setState({ email: res })
    })

    try {
      const response = await axios({
        method: 'GET',
        url: `http://${BASE_IP}:3001/getStation?ID=${stationId}`,
      })

      const result = response.data
      console.log(result)
      if (result.successStatus) {
        this.setState({
          stationID: result.stationID,
          stationLocation: result.location,
          stationRate: parseInt(result.rate),
        })
      } else {
        this.props.navigation.navigate('Landing')
        alert(result.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  onSubmit = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://${BASE_IP}:3001/activateStation`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: this.state.email,
          ID: this.state.stationID,
          duration: this.state.minutesToCharge,
        }),
      })

      const result = response.data
      console.log(result)
      if (result.successStatus) {
        this.props.navigation.navigate('TransactionDetail', {
          transactionId: result.transactionId,
          minutesToCharge: result.minutesCharged,
          solarCoinsToPay: this.state.solarCoinsToPay.toString(),
        })
      } else {
        alert(result.message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <KeyboardAvoidingScrollView>
          <ImageBackground
            blurRadius={0.5}
            style={Styles.imageBackground2}
            resizeMode="cover"
            source={require('../../assets/images/m2.jpg')}
          >
            <View style={Styles.layout}>
              <View elevation={50} style={Styles.container}>
                <Text
                  style={[
                    Styles.text20,
                    {
                      marginTop: 10,
                      letterSpacing: 0,
                      marginBottom: 10,
                      alignSelf: 'center',
                    },
                  ]}
                >
                  Station Details
                </Text>

                <View>
                  <Text style={Styles.text10}>Station ID</Text>
                  <Input
                    elevation={50}
                    value={this.state.stationID}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ fontSize: 30, color: '#10414f' }}
                      />
                    }
                    editable={false}
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Location</Text>
                  <Input
                    elevation={50}
                    value={this.state.stationLocation}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ fontSize: 30, color: '#10414f' }}
                      />
                    }
                    editable={false}
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Rate/minute (SolarCoins)</Text>
                  <Input
                    elevation={50}
                    value={this.state.stationRate.toString()}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ fontSize: 30, color: '#10414f' }}
                      />
                    }
                    editable={false}
                  />
                </View>

                <View
                  elevation={50}
                  style={[
                    Styles.container,
                    { alignSelf: 'center', justifyContent: 'center' },
                  ]}
                >
                  <Text
                    style={[
                      Styles.text20,
                      {
                        marginTop: 10,
                        letterSpacing: 0,
                        marginBottom: 10,
                        alignSelf: 'center',
                      },
                    ]}
                  >
                    Confirm Transaction
                  </Text>
                  <View>
                    <Text style={Styles.text10}>Minutes to Charges</Text>
                    <Input
                      elevation={50}
                      keyboardType={'number-pad'}
                      placeholder="Enter time to charge"
                      inputContainerStyle={Styles.inputContainerStyle}
                      inputStyle={Styles.inputStyle}
                      leftIcon={
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{ fontSize: 30, color: '#10414f' }}
                        />
                      }
                      onChangeText={(value) => {
                        if (value != '') {
                          this.setState({
                            minutesToCharge: value,
                            solarCoinsToPay:
                              parseInt(value) * this.state.stationRate,
                          })
                        } else {
                          this.setState({
                            solarCoinsToPay: 0,
                          })
                        }
                      }}
                    />
                  </View>

                  <View>
                    <Text style={Styles.text10}>Solar Coin to Pay</Text>
                    <Input
                      elevation={50}
                      value={this.state.solarCoinsToPay.toString()}
                      inputContainerStyle={Styles.inputContainerStyle}
                      inputStyle={Styles.inputStyle}
                      leftIcon={
                        <FontAwesomeIcon
                          icon={faCoins}
                          style={{ fontSize: 30, color: '#10414f' }}
                        />
                      }
                      editable={false}
                    />
                  </View>
                  <TouchableOpacity
                    elevation={20}
                    style={Styles.btn2}
                    onPress={() => {
                      this.onSubmit()
                    }}
                  >
                    <Text style={[Styles.text16, { letterSpacing: -1 }]}>
                      Confirm Transaction{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    )
  }
}
