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
  RefreshControl
} from "react-native";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Icon } from "react-native-elements";
import { Input } from "react-native-elements";
import Styles from '../../assets/css/Styles';
import { BASE_IP } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const device = Dimensions.get("window");

export default class BuyCoins extends Component {
  state={
     email : "",
     existingSolarCoinBalance : "",
     solarCoinRate : "10000",
     ethersToPay : "",
     refreshing : false
  }

  componentDidMount = async() => {
      await AsyncStorage.getItem('email').then((res) => {
           this.setState({email : res});
      });
  
      console.log(this.state.email);

      try{
        const response = await axios({
           method : 'GET',
           url : `http://${BASE_IP}:3001/getUser?email=${this.state.email}`,
        });
        
        const result = response.data;
        console.log(result);
        this.setState({
           existingSolarCoinBalance : result.solcoins
      });
      }catch(err){
        console.log(err);
      };

  }

  onRefresh = async() => {
    try{
        const response = await axios({
           method : 'GET',
           url : `http://${BASE_IP}:3001/getUser?email=${this.state.email}`,
        });
        
        const result = response.data;
        console.log(result);
        this.setState({
           existingSolarCoinBalance : result.solcoins
      });
      }catch(err){
        console.log(err);
      };
  }

  onSubmit = async() => {
    try{
        const response = await axios({
           method : 'POST',
           url : `http://${BASE_IP}:3001/buyCoins`,
           headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
          },
          data : JSON.stringify({
            email : this.state.email ,
            etherAmount : this.state.ethersToPay
          })
        });
        
        const result = response.data;
        console.log(result);
        alert(result.message);
      }catch(err){
        console.log(err);
      }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <KeyboardAvoidingScrollView 
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} tintColor="blue"/>}
        >
          <ImageBackground
            blurRadius={0.5}
            style={Styles.imageBackground2}
            resizeMode="cover"
            source={require("../../assets/images/m2.jpg")}
          >
            <View style={Styles.layout} >
              <View elevation={50} style={Styles.container}>
                
              <View>
                  <Text style={Styles.text10}>Your SolarCoins Balance</Text>
                  <Input
                    elevation={50}
                    value={this.state.existingSolarCoinBalance}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    editable={false}
                    leftIcon={
                        <FontAwesomeIcon icon={ faCoins } style={{fontSize: 30,color:"#10414f"}} />
                      }
                  />
              </View>

              <View>
                  <Text style={Styles.text10}>Rate (SolarCoins/Wei)</Text>
                  <Input
                    elevation={50}
                    value={this.state.solarCoinRate}
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
                  <Text style={Styles.text10}>Ethers To Pay</Text>
                  <Input
                    elevation={50}
                    keyboardType={'number-pad'}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <Icon
                        name="rupee"
                        type="font-awesome"
                        size={20}
                        color="#10414f"
                      />
                    }
                    onChangeText = { (value) => {
                         this.setState({
                             ethersToPay : value
                         })
                    }}
                  />
                </View>

                <TouchableOpacity
                  elevation={20}
                  style={Styles.btn1}
                  onPress={() => this.onSubmit()}
                >
                  <Text style={Styles.text16}> Buy Coins </Text>
                </TouchableOpacity>
            
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    );
  }
}

