import 'react-native-gesture-handler'
import axios from 'axios'
import React, { Component } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { Icon, Input } from 'react-native-elements'
import Styles from '../../assets/css/Styles'
import { BASE_IP } from '../../config'

const device = Dimensions.get('window')

export default class ForgotPassword extends Component {
  state = {
    email: '',
    showOtp: false,
    isOtpCorrect: false,
    generatedOtp: '',
    otp: '',
    errorotp: '',
    password: '',
    errorPassword: '',
    confirmPassword: '',
    errorConfirmPassword: '',
  }
  
  componentDidMount = () => {
    const digits = '0123456789'
    let OTP = ''
    for (let i = 0; i < 5; i++) {
      OTP += digits[Math.floor(Math.random() * 10)]
    }
    this.setState({ generatedOtp: OTP })
  }

  onSubmit = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://${BASE_IP}:3001/checkEmail`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: this.state.email,
          subject: 'OTP Generated for Updating Password - Solar Charge',
          body: `Your generated OTP is ${this.state.generatedOtp}`,
        }),
      })
      if (response.data) {
        if (response.data.successStatus) {
          this.setState({ showOtp: true })
        } else {
          alert(response.data.message)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  checkOtp = () => {
    console.log('OTP' + this.state.otp)
    console.log('Generated OTP ' + this.state.generatedOtp)
    if (this.state.otp === this.state.generatedOtp)
      this.setState({ showOtp : false, isOtpCorrect: true, errorotp: '' })
    else this.setState({ showOtp : true , isOtpCorrect: false, errorotp: 'Incorrect OTP' })
  }

  checkPassword = () => {
    if (this.state.password.length == 0) {
      this.setState({ errorPassword: 'Password is required' })
      return false
    } else if (this.state.password.length < 6) {
      this.setState({
        errorPassword: 'Password should be minimum 6 characters',
      })
      return false
    } else if (this.state.password.indexOf(' ') >= 0) {
      this.setState({ errorPassword: 'Password cannot contain spaces' })
      return false
    } else {
      this.setState({ errorPassword: '' })
      return true
    }
  }

  checkPasswordMatch = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorConfirmPassword: "Passwords don't match" })
      return false
    } else {
      this.setState({ errorConfirmPassword: '' })
      return true
    }
  }

  checkFormValidation = () => {
    let flag = 0

    if (!this.checkPassword()) flag = 1

    if (!this.checkPasswordMatch()) flag = 1

    return flag == 1 ? false : true
  }

  changePassword = async () => {
    if (this.checkFormValidation()) {
      try {
        const response = await axios({
          method: 'POST',
          url: `http://${BASE_IP}:3001/changePassword`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        })
        if (response.data) {
          if (response.data.successStatus) {
            this.props.navigation.navigate('SignIn')
            alert(response.data.message)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <KeyboardAvoidingScrollView>
          <ImageBackground
            blurRadius={0.5}
            style={Styles.imageBackground}
            resizeMode="cover"
            source={require('../../assets/images/m4.webp')}
          >
            <View style={Styles.layout}>
              <Text style={[Styles.text22]}>Forgot Password</Text>
              <View elevation={50} style={Styles.container}>
                <View style={{ marginTop: 30 }}>
                  <Text style={Styles.text10}>Email</Text>
                  <Input
                    elevation={50}
                    placeholder="Enter your registered Email Id"
                    keyboardType="email-address"
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <Icon
                        name="envelope"
                        type="font-awesome"
                        size={20}
                        color="purple"
                      />
                    }
                    onChangeText={(value) => {
                      this.setState({ email: value })
                    }}
                  />

                  {this.state.showOtp && (
                    <View>
                      <Text style={Styles.text10}>OTP</Text>
                      <Input
                        elevation={50}
                        placeholder="Enter the OTP received"
                        keyboardType="number-pad"
                        inputContainerStyle={Styles.inputContainerStyle}
                        inputStyle={Styles.inputStyle}
                        leftIcon={
                          <Icon
                            name="envelope"
                            type="font-awesome"
                            size={20}
                            color="purple"
                          />
                        }
                        onChangeText={(value) => {
                          this.setState({ otp: value })
                        }}
                        errorStyle={Styles.errorStyle}
                        errorMessage={this.state.errorotp}
                      />
                    </View>
                  )}

                  {this.state.isOtpCorrect && (
                    <View>
                      <View>
                        <Text style={Styles.text10}> Password </Text>
                        <Input
                          elevation={50}
                          placeholder="Enter your Password"
                          inputContainerStyle={Styles.inputContainerStyle}
                          inputStyle={Styles.inputStyle}
                          onChangeText={(val) => {
                            this.setState({ password: val })
                          }}
                          leftIcon={
                            <Icon
                              name="key"
                              type="font-awesome"
                              size={20}
                              color="purple"
                            />
                          }
                          rightIcon={
                            <Icon
                              name={this.state.rightIcon}
                              type="font-awesome"
                              size={18}
                              color="purple"
                              onPress={() => {
                                this.handlePasswordVisibility()
                              }}
                            />
                          }
                          secureTextEntry={this.state.showPassword}
                          errorStyle={{ color: 'red' }}
                          errorMessage={this.state.errorPassword}
                        />
                      </View>

                      <View>
                        <Text style={Styles.text10}> Confirm Password </Text>
                        <Input
                          elevation={50}
                          placeholder="Confirm Password"
                          inputContainerStyle={Styles.inputContainerStyle}
                          inputStyle={Styles.inputStyle}
                          onChangeText={(val) => {
                            this.setState({ confirmPassword: val })
                          }}
                          leftIcon={
                            <Icon
                              name="key"
                              type="font-awesome"
                              size={20}
                              color="purple"
                            />
                          }
                          secureTextEntry={true}
                          errorStyle={{ color: 'red' }}
                          errorMessage={this.state.errorConfirmPassword}
                        />
                      </View>
                    </View>
                  )}
                  {this.state.showOtp ? (
                    <TouchableOpacity
                      elevation={20}
                      style={Styles.btn1}
                      onPress={() => this.checkOtp()}
                    >
                      <Text style={Styles.text16}>Check OTP</Text>
                    </TouchableOpacity>
                  ) : this.state.isOtpCorrect ? (
                    <TouchableOpacity
                      elevation={20}
                      style={Styles.btn1}
                      onPress={() => this.changePassword()}
                    >
                      <Text style={Styles.text16}>Change Password</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      elevation={20}
                      style={Styles.btn1}
                      onPress={() => this.onSubmit()}
                    >
                      <Text style={Styles.text16}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    )
  }
}
