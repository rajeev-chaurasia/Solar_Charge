import 'react-native-gesture-handler'
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'react-native-elements'
import { Input } from 'react-native-elements'
import Styles from '../../assets/css/Styles'
import { BASE_IP } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const device = Dimensions.get('window')

export default class Wallet extends Component {
  state = {
    name: '',
    email: '',
    walletAddress: '',
    amountPaid: '',
    solarCoinBalance: '',
    refreshing : false
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('email').then((res) => {
      this.setState({ email: res })
    })

    console.log(this.state.email)

    try {
      const response = await axios({
        method: 'GET',
        url: `http://${BASE_IP}:3001/getUser?email=${this.state.email}`,
      })

      const result = response.data
      console.log(result)
      this.setState({
        name: result.name,
        email: result.email,
        walletAddress: result.userAccount,
        amountPaid: result.amountPaid,
        solarCoinBalance: result.solcoins,
      })
    } catch (err) {
      console.log(err)
    }
  }

  onRefresh = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `http://${BASE_IP}:3001/getUser?email=${this.state.email}`,
      })

      const result = response.data
      console.log(result)
      this.setState({
        amountPaid: result.amountPaid,
        solarCoinBalance: result.solcoins,
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <KeyboardAvoidingScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="blue"
            />
          }
        >
          <ImageBackground
            blurRadius={0.5}
            style={Styles.imageBackground2}
            resizeMode="cover"
            source={require('../../assets/images/m2.jpg')}
          >
            <View style={Styles.layout}>
              <View elevation={50} style={Styles.container}>
                <View>
                  <Text style={Styles.text10}>Name</Text>
                  <Input
                    elevation={50}
                    value={this.state.name}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                      <Icon
                        name="user"
                        type="font-awesome"
                        size={20}
                        color="#10414f"
                      />
                    }
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Email</Text>
                  <Input
                    elevation={50}
                    value={this.state.email}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                      <Icon
                        name="envelope"
                        type="font-awesome"
                        size={20}
                        color="#10414f"
                      />
                    }
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Wallet Address</Text>
                  <Input
                    elevation={50}
                    value={this.state.walletAddress}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                      <Icon
                        name="map"
                        type="font-awesome"
                        size={20}
                        color="#10414f"
                      />
                    }
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Amount Paid</Text>
                  <Input
                    elevation={50}
                    value={this.state.amountPaid}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                      <Icon
                        name="rupee"
                        type="font-awesome"
                        size={20}
                        color="#10414f"
                      />
                    }
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Solar Coin Balance</Text>
                  <Input
                    elevation={50}
                    value={this.state.solarCoinBalance}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faCoins}
                        style={{ fontSize: 30, color: '#10414f' }}
                      />
                    }
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    )
  }
}
