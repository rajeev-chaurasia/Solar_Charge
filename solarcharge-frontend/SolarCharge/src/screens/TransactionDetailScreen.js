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
import { faCircleCheck, faClock,faCoins,faIdBadge } from '@fortawesome/free-solid-svg-icons';
const device = Dimensions.get("window");
export default class TransactionScreen extends Component {
  state={
    transactionId:"xyz123",
    MinutesToCharged:"788",
    solarCoinPaid:"77",
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
                    letterSpacing:-1,
                    marginBottom: 10,
                    alignSelf: 'center',
                  }]}
                >
                  Transaction Sent 
                </Text>
                {/* <View style={{backgroundColor:"white",borderRadius:100,height:'auto',width:90,alignSelf:"center"}}> */}
                <FontAwesomeIcon icon={ faCircleCheck } elevation={50} size={130} style={{color:"green",alignSelf:"center"}} />
                {/* </View> */}

                <View>
                  <Text style={Styles.text10}>Transaction Id</Text>
                  <Input
                    elevation={50}
                    value={this.state.transactionId}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon icon={ faIdBadge } style={{fontSize: 30,color:"#10414f"}} />
                    }
                  />
                </View>

                
                <View>
                  <Text style={Styles.text10}>Minutes to Charges</Text>
                  <Input
                    elevation={50}
                    value={this.state.MinutesToCharged}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon icon={ faClock } style={{fontSize: 30,color:"#10414f"}} />
                    }
                  />
                </View>

                <View>
                  <Text style={Styles.text10}>Solar Coin to Pay</Text>
                  <Input
                    elevation={50}
                    value={this.state.solarCoinPaid}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    leftIcon={
                      <FontAwesomeIcon icon={ faCoins } style={{fontSize: 30,color:"#10414f"}} />
                    }
                  />
                </View>

                <Text style={[Styles.text12,{alignSelf:"center",color:"#ecea9f"}]}>Connect your Device to the plug on Charging station. The Charging station will activate in a moment</Text>

              </View>

            
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    );
  }
}

