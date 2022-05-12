import * as React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from './src/screens/SignUpScreen'
import SignInScreen from './src/screens/SignInScreen'
import HomePageScreen from './src/screens/HomePageScreen'
import Wallet from './src/screens/WalletScreen'
import Transaction from './src/screens/TransactionScreen'
import TransactionDetail from './src/screens/TransactionDetailScreen'
import ForgotPassword from './src/screens/ForgotPassword'


const Stack = createStackNavigator()

function App() {
   LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
   LogBox.ignoreAllLogs();
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
            headerShown: false,
            title: 'Solar Charge',
          }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown : false,
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
          options={{
            headerShown: true,
            headerTintColor: '#ecea9f',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerLeft: () => null,
            gestureEnabled : false
          }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
