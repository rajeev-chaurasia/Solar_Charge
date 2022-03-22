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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock,faCoins } from '@fortawesome/free-solid-svg-icons';
const device = Dimensions.get("window");
export default class TransactionScreen extends Component {
  state={
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <KeyboardAvoidingScrollView>
          <ImageBackground
            blurRadius={0.5}
            style={Styles.imageBackground2}
            resizeMode="cover"
            source={require("../../assets/images/m2.jpg")}
          >
            <View style={Styles.layout} >
              <View elevation={50} style={Styles.container} >
                <Text
                  style={[Styles.text20,{
                    marginTop: 10,
                    letterSpacing:0,
                    marginBottom: 10,
                    alignSelf: 'center',
                  }]}
                >
                  Confirm Transaction
                </Text>
                <View elevation={50} style={[Styles.container,{alignSelf:'center',justifyContent:"center"}]} >
                <View>
                  <Text style={Styles.text10}>Minutes to Charges</Text>
                  <Input
                    elevation={50}
                    placeholder="Enter time"
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon icon={ faClock } style={{fontSize: 30,color:"#10414f"}} />
                    }
                    onChangeText={(value)=>{
                        this.setState({email:value})
                    }}
                    errorStyle={Styles.errorStyle}
                    errorMessage={this.state.errorEmail}
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Solar Coin to Pay</Text>
                  <Input
                    elevation={50}
                    placeholder="Enter time"
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon icon={ faCoins } style={{fontSize: 30,color:"#10414f"}} />
                    }
                    onChangeText={(value)=>{
                        this.setState({email:value})
                    }}
                    errorStyle={Styles.errorStyle}
                    errorMessage={this.state.errorEmail}
                  />
                </View>
                <TouchableOpacity
                  elevation={20}
                  style={Styles.btn2}
                  onPress={()=>{this.props.navigation.navigate('TransactionDetail')}}
                >
                  <Text style={[Styles.text16,{letterSpacing:-1}]} >Confirm Transaction </Text>
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

