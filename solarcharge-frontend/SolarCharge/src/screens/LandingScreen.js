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
export default class LandingScreen extends Component {
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
            <View
              style={Styles.layout}
            >
              <View
                elevation={50}
                style={Styles.container}
              >
                
            
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    );
  }
}

