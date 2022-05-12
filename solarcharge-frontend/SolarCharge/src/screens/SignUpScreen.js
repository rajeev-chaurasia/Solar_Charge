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
import Styles from '../../assets/css/Styles'
import { BASE_IP } from '../../config'
import axios from 'axios'

const device = Dimensions.get('window')

export default class SignUpScreen extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorEmail: '',
    errorName: '',
    errorPassword: '',
    errorConfirmPassword: '',
    showPassword: false,
    rightIcon: 'eye',
  }

  handlePasswordVisibility = () => {
    if (this.state.showPassword === false) {
      this.setState({
        rightIcon: 'eye-slash',
        showPassword: true,
      })
    } else if (this.state.showPassword === true) {
      this.setState({
        rightIcon: 'eye',
        showPassword: false,
      })
    }
  }

  checkEmail = () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!this.state.email || regex.test(this.state.email) === false) {
      this.setState({
        errorEmail: 'Email is not valid',
      })
      return false
    }else{
      this.setState({errot})
    return true
    }
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

    if (!this.checkEmail()) flag = 1

    if (!this.checkPassword()) flag = 1

    // check Password and ConfirmPassword
    if (!this.checkPasswordMatch()) flag = 1

    return flag == 1 ? false : true
  }

  onSubmit = async () => {
    if (this.checkFormValidation()) {
      try {
        const response = await axios({
          method: 'POST',
          url: `http://${BASE_IP}:3001/registerUser`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
          }),
        })
        if (response.data) {
          if (response.data.successStatus) {
            this.props.navigation.navigate('SignIn')
            alert(response.data.message)
          } else {
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
              <Text style={[Styles.text22]}>Solar Charge</Text>
              <View elevation={50} style={Styles.container}>
                <Text
                  style={[
                    Styles.text20,
                    {
                      marginTop: 20,
                      paddingLeft: 10,
                      marginBottom: 30,
                    },
                  ]}
                >
                  SignUp
                </Text>
                <View>
                  <Text style={Styles.text10}>Email</Text>
                  <Input
                    elevation={50}
                    placeholder="Enter your Email"
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
                    errorStyle={Styles.errorStyle}
                    errorMessage={this.state.errorEmail}
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Name</Text>
                  <Input
                    elevation={50}
                    placeholder="Enter your Name"
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <Icon
                        name="user"
                        type="font-awesome"
                        size={20}
                        color="purple"
                      />
                    }
                    onChangeText={(value) => {
                      this.setState({ name: value })
                    }}
                    errorStyle={Styles.errorStyle}
                    errorMessage={this.state.errorName}
                  />
                </View>

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

                <TouchableOpacity
                  elevation={20}
                  style={Styles.btn1}
                  onPress={() => this.onSubmit()}
                >
                  <Text style={Styles.text16}>Sign Up</Text>
                </TouchableOpacity>
                <View style={[Styles.rowCenter, { marginTop: 15 }]}>
                  <Text style={Styles.text12}>Have an account?</Text>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      this.props.navigation.navigate('SignIn')
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#f50',
                        paddingLeft: 3,
                      }}
                    >
                      Sign In
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
