import React, {Component, useState, useEffect} from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Product from './Screens/Product';
import schoolitem from './Screens/schoolitem';
import LoginScreen from './Screens/loginscreen';
import Cart from './Screens/Cart';

import profilescreen from './Screens/profilescreen';
import orderdetails from './Screens/Orderdetails';
import placeB2b from './Screens/placeB2b';
import B2bdetails from './Screens/B2bdetails';
import PlaceOrder from './Screens/PlaceOrder';
import Accessories from './Screens/Accessories';
import Splash from './Screens/Splash';
import AdminDashboard from './Screens/AdminDashborad';
import DrawerAdmin from './Component/DrawerAdmin';
import Inventory from './Screens/Inventory';
import RawMaterial from './Screens/RawMaterial';
import OrderDetils from './Screens/OrderDetils';
import Accessoriestwo from './Screens/Accessoriestwo';
import Accessoriesthree from './Screens/Accessoriesthree';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  const [initRender, setInitRender] = useState(true);

  useEffect(() => {
    setInitRender(false);
  }, [initRender]);

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerType="slide"
      drawerContent={props => <DrawerAdmin {...props} />}
      openByDefault={false}
      initialRouteName="Home_Drw"
      drawerStyle={{width: initRender ? null : '75%'}}>
      <Drawer.Screen
        name="AdminDashboard_dw"
        component={AdminDashboard}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="placeB2b_dw"
        component={placeB2b}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="B2bdetails_dw"
        component={B2bdetails}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="Inventory"
        component={Inventory}
        options={{unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
};

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AdminDashboard" component={DrawerComponent} />

          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="schoolitem" component={schoolitem} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="profilescreen" component={profilescreen} />
          <Stack.Screen name="orderdetails" component={orderdetails} />
          <Stack.Screen name="placeB2b" component={placeB2b} />
          <Stack.Screen name="B2bdetails" component={B2bdetails} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
          <Stack.Screen name="Accessories" component={Accessories} />
          <Stack.Screen name="RawMaterial" component={RawMaterial} />
          <Stack.Screen name="OrderDetils" component={OrderDetils} />
          <Stack.Screen name="Accessoriestwo" component={Accessoriestwo} />
          <Stack.Screen name="Accessoriesthree" component={Accessoriesthree} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
