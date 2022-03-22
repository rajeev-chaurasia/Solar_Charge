import 'react-native-gesture-handler';
import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { Icon } from "react-native-elements";
import { Input } from "react-native-elements";
import Styles from '../../assets/css/Styles';
const device = Dimensions.get("window");
export default class SignInScreen extends Component {
  state={
      email:"",
      password:"",
      errorEmail:"error",
      errorPassword:"",
      showPassword:false,
      rightIcon:'eye',
  }
  handlePasswordVisibility = () => {
    if (this.state.showPassword=== false) {
        this.setState({
          rightIcon:'eye-slash',
          showPassword:true,
        });
    }
    else if  (this.state.showPassword=== true) {
        this.setState({
        rightIcon:'eye',
        showPassword:false,
       });
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <KeyboardAvoidingScrollView>
          <ImageBackground
            blurRadius={0.5}
            style={Styles.imageBackground}
            resizeMode="cover"
            source={require("../../assets/images/m2.jpg")}
          >
            <View
              style={Styles.layout}
            >
                <Text style={[Styles.text22,]}>Solar Charge</Text>
              <View
                elevation={50}
                style={Styles.container}
              >
                <Text
                  style={[Styles.text20,{
                    marginTop: 50,
                    paddingLeft: 10,
                    marginBottom: 30,
                  }]}
                >
                  Login
                </Text>
                <View>
                  <Text style={Styles.text10}>Email</Text>
                  <Input
                    elevation={50}
                    placeholder="Enter your Email"
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
                    onChangeText={(value)=>{
                        this.setState({email:value})
                    }}
                    errorStyle={Styles.errorStyle}
                    errorMessage={this.state.errorEmail}
                  />
                </View>
                <View>
                  <Text style={Styles.text10} > Password  </Text>
                  <Input
                    elevation={50}
                    placeholder="Enter your Password"
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    onChangeText={(val)=>{this.setState({password:val})}}
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
                        onPress={()=>{
                            this.handlePasswordVisibility();
                        }}
                      />
                    
                    }
                    secureTextEntry={this.state.showPassword}
                    errorStyle={{ color: "red" }}
                    errorMessage={this.state.errorPassword}
                  />
                </View>
                <TouchableOpacity style={{ marginTop: -20, marginRight: 15 }}>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      fontSize: 11,
                      color: "#d2d2d2",
                    }}
                  >
                    Forget Password ?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  elevation={20}
                  style={Styles.btn1}
                  onPress={() => {
                    this.props.navigation.navigate("Home");
                  }}
                >
                  <Text style={Styles.text16} >LOGIN </Text>
                </TouchableOpacity>

                <View
                  style={[Styles.rowCenter,{marginTop: 10,}]}
                >
                  <Text
                    style={Styles.text12}
                  >
                    Don't have a account?
                  </Text>
                  <TouchableOpacity
                    style={{}}
                    onPress={()=>{this.props.navigation.navigate('SignUp')}}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#f50",
                        paddingLeft: 3,
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    );
  }
}

