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
} from 'react-native'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { Icon } from 'react-native-elements'
import { Input } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Styles from '../../assets/css/Styles'
import QRCodeScanner from './QRCodeScanner'

const device = Dimensions.get('window')

export default class Landing extends Component {
  state = {
    qrVisible: false,
    manualVisible: false,
    stationID: '',
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
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 50,
                      margin: 5,
                      padding: 5,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'orange',
                    }}
                    onPress={() =>
                      this.setState({
                        qrVisible: true,
                        manualVisible: false,
                      })
                    }
                  >
                    <Text style={Styles.text16}> Scan QR Code</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 50,
                      margin: 5,
                      padding: 5,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'green',
                    }}
                    onPress={() =>
                      this.setState({
                        qrVisible: false,
                        manualVisible: true,
                      })
                    }
                  >
                    <Text style={Styles.text16}>
                      {' '}
                      Enter Station ID manually
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.state.qrVisible && (
                  <QRCodeScanner navigation={this.props.navigation} />
                )}

                {this.state.manualVisible && (
                  <View>
                    <View>
                      <Text style={Styles.text10}>Station ID</Text>
                      <Input
                        elevation={50}
                        placeholder={'Enter Station Id here'}
                        keyboardType="number-pad"
                        inputContainerStyle={Styles.inputContainerStyle}
                        inputStyle={Styles.inputStyle}
                        onChangeText={(value) => {
                          this.setState({ stationID: value })
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      elevation={20}
                      style={Styles.btn1}
                      onPress={() => {
                        console.log(this.state.stationID)
                        this.props.navigation.navigate('Transaction', {
                          stationID: this.state.stationID,
                        })
                      }}
                    >
                      <Text style={Styles.text16}> Submit </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    )
  }
}
