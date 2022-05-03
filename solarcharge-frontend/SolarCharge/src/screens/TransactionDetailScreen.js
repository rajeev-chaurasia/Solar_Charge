import 'react-native-gesture-handler'
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { Icon } from 'react-native-elements'
import { Input } from 'react-native-elements'
import Styles from '../../assets/css/Styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faCircleCheck,
  faClock,
  faCoins,
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons'
const device = Dimensions.get('window')

export default class TransactionDetail extends Component {
  state = {
    transactionId: '',
    MinutesToCharged: '',
    solarCoinPaid: '',
  }

  componentDidMount = () => {
    const {
      transactionId,
      minutesToCharge,
      solarCoinsToPay,
    } = this.props.route.params

    this.setState({
      transactionId: transactionId,
      MinutesToCharged: minutesToCharge,
      solarCoinPaid : solarCoinsToPay
    })

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
                      letterSpacing: -1,
                      marginBottom: 10,
                      alignSelf: 'center',
                    },
                  ]}
                >
                  Transaction Sent
                </Text>

                <FontAwesomeIcon
                  icon={faCircleCheck}
                  elevation={50}
                  size={130}
                  style={{ color: 'green', alignSelf: 'center' }}
                />

                <View>
                  <Text style={Styles.text10}>Transaction Id</Text>
                  <Input
                    elevation={50}
                    value={this.state.transactionId}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faIdBadge}
                        style={{ fontSize: 30, color: '#10414f' }}
                      />
                    }
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Minutes to Charge</Text>
                  <Input
                    elevation={50}
                    value={this.state.MinutesToCharged}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ fontSize: 30, color: '#10414f' }}
                      />
                    }
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Solar Coins to Pay</Text>
                  <Input
                    elevation={50}
                    value={this.props.route.params.solarCoinsToPay}
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

                <Text
                  style={[
                    Styles.text12,
                    { alignSelf: 'center', color: '#ecea9f' },
                  ]}
                >
                  Connect your Device to the plug on Charging station. The
                  Charging station will activate in a moment
                </Text>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => this.props.navigation.navigate('Landing')}
                >
                  <Text style={styles.appButtonText}>Go to Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop : 45
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
})
