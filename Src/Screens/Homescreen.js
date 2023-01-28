import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  AsyncStorage,
} from 'react-native';
import DrewerScreen from './drewerscreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Utils/Colors';
import {useThemeContext} from '../Context/them_context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useproductContext} from '../Context/product_context';
import {useCartContext} from '../Context/cart_context';

const Drawer = createDrawerNavigator();

const Drawercomponet = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrewerScreen {...props} />}>
      <Drawer.Screen name="Drawer" component={Homescreen} />
    </Drawer.Navigator>
  );
};

const Homescreen = props => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('role').then(value => {
        if (value) {
          setRole(JSON.parse(value));
          console.log('hii role-->>', value);
        }
      });
    });

    return unsubscribe;
  }, [props]);
  const {setTheme, colors, theme} = useThemeContext();
  const {addToCart, cart, increment_qty, descrease_qty, qty} = useCartContext();
  const [modelVisible, setModel] = useState('');
  const [role, setRole] = useState();

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.gray}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          height: 60,
          backgroundColor: Colors.gray,
          padding: '4%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {role === 4 ? null : (
            <TouchableOpacity
              style={{marginLeft: '5%', alignSelf: 'center'}}
              onPress={() => props.navigation.toggleDrawer()}>
              <Ionicons name="md-menu-sharp" size={30} color={Colors.white} />
            </TouchableOpacity>
          )}
          <Text style={{color: Colors.white, fontSize: 18, marginLeft: '5%'}}>
            Home
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', marginRight: '10%'}}
            onPress={() => props.navigation.navigate('Cart')}>
            <MaterialCommunityIcons
              name="cart"
              size={32}
              color={Colors.black}
            />
            <View
              style={{
                height: 19,
                width: 19,
                backgroundColor: 'red',
                borderRadius: 50,
                position: 'absolute',
                right: -5,
                top: -10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 13}}>{qty}</Text>
            </View>
          </TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={32}
            color={Colors.black}
            onPress={() => setModel(true)}
          />
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: "5%", alignSelf: "center" }}
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Ionicons name="md-menu-sharp" size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={{ color: Colors.white, fontSize: 18, marginLeft: "5%" }}>
          School Names
        </Text>
      </View> */}
      {/* <TouchableOpacity
        style={{ marginLeft: "5%", marginTop: "5%" }}
        onPress={() => props.navigation.toggleDrawer()}
      >
        <Ionicons name="md-menu-sharp" size={30} color={Colors.gray} />
      </TouchableOpacity> */}
      <View style={{justifyContent: 'center', marginTop: '10%'}}>
        <Text style={{color: 'black', textAlign: 'center'}}>Hello</Text>
      </View>
      <Modal
        transparent
        visible={modelVisible}
        onRequestClose={() => setModel(false)}>
        <View
          style={{
            backgroundColor: colors.transparent,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              height: '30%',
              width: '90%',
              backgroundColor: colors.card,
              padding: '3%',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontSize: 18, textAlign: 'center', color: colors.text}}>
              Select Theme
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '2%',
                justifyContent: 'space-between',
                marginTop: '7%',
              }}
              onPress={() => {
                setTheme('dark');
                setModel(false);
              }}>
              <Text style={{color: colors.text}}>Dark</Text>
              <MaterialCommunityIcons
                name={theme === 'dark' ? 'checkbox-marked' : 'crop-square'}
                size={26}
                color={theme === 'dark' ? colors.icon : 'gray'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '2%',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                setTheme('light');
                setModel(false);
              }}>
              <Text style={{color: colors.text}}>Light</Text>
              <MaterialCommunityIcons
                name={theme === 'light' ? 'checkbox-marked' : 'crop-square'}
                size={26}
                color={theme === 'light' ? colors.icon : 'gray'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Drawercomponet;
