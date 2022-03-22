// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from "./src/screens/SignInScreen";
import HomePageScreen from "./src/screens/HomePageScreen";
import Wallet from './src/screens/WalletScreen';
import Transaction from './src/screens/TransactionScreen';
import TransactionDetail from './src/screens/TransactionDetailScreen';
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePageScreen}
          options={{
            headerShown:false,
            title:"Solar Charge"
          }}
        />

        <Stack.Screen
          name="SignUp"  
          component={SignUpScreen}
          options={{
            headerShown: false,
  
          }}
        />
          <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="Transaction"
          component={Transaction}
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetail}
          options={{ headerShown: true,
            headerTintColor:'#ecea9f',
            headerStyle:{
              backgroundColor:"black",
            }
          }}
        />


   
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
