import * as React from 'react'
import 'react-native-gesture-handler'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { Icon } from 'react-native-elements'
import Wallet from './WalletScreen'
import Transaction from './TransactionScreen'
import Landing from './LandingScreen'
import BuyCoins from './BuyCoins'

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Sign Out"
        style={{ color: 'red' }}
        labelStyle={{ color: '#10414f' }}
        icon={({ focused, color, size }) => {
          ;<Icon name="sun" type="font-awesome" size={50} color="purple" />
        }}
        onPress={() => props.navigation.navigate('SignIn')}
      />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'black',
          width: 240,
          opacity: 1,
        },
        drawerActiveTintColor: '#ecea9f',
        drawerInactiveTintColor: '#10414f',
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: true,
          title: 'Solar Charge',
          headerTintColor: '#ecea9f',
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: true,
          headerTintColor: '#ecea9f',
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />

      <Drawer.Screen
        name="BuyCoins"
        component={BuyCoins}
        options={{
          headerShown: true,
          headerTintColor: '#ecea9f',
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />
    </Drawer.Navigator>
  )
}

export default function HomePageScreen() {
  return <MyDrawer />
}
