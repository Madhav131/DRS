import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Colors from '../Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useThemeContext} from '../Context/them_context';
import {useCartContext} from '../Context/cart_context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useproductContext} from '../Context/product_context';
import Fonts from '../Utils/Fonts';
import DrewerScreen from './drewerscreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import metrics from '../Utils/Metrics';
import Toast from 'react-native-simple-toast';
const Drawer = createDrawerNavigator();
const Drawercomponet = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrewerScreen {...props} />}>
      <Drawer.Screen name="Drawer" component={Accessories} />
    </Drawer.Navigator>
  );
};

const Accessories = props => {
  //   const [task_arrayholder, setBranchArray] = useState([]);
  const {setTheme, colors, theme} = useThemeContext();
  const [get_index, Set_index] = useState(false);
  const [get_price, Set_price] = useState();

  const {accessories_list, getAccessories, searchFilter_branch} =
    useproductContext();
  const {
    addToCart,
    cart,
    increment_qty,
    descrease_qty,
    acce_cart,
    qty,
    addToCart_accessories,
  } = useCartContext();

  useEffect(() => {
    getAccessories();
  }, []);

  const addValueInCart = async item => {
    if (get_price == '' || get_price == null) {
      Toast.show('Enter the Price..!!!');
    } else {
      const obj = {
        ...item,
        qty: 1,
        // user_price: item.price,
        user_price: get_price,
        price: get_price,
        gst: 5,
        scgst: ((get_price - get_price * (100 / (100 + 5))) / 2).toFixed(2),
      };
      var data = obj;
      console.log('datdatdat-=-=>', data);
      addToCart_accessories(data);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginLeft: '5%', alignSelf: 'center'}}
            onPress={() => props.navigation.toggleDrawer()}>
            <Ionicons name="md-menu-sharp" size={30} color={Colors.white} />
          </TouchableOpacity>
          <Text style={{color: Colors.white, fontSize: 18, marginLeft: '5%'}}>
            Accessories Names
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
            <MaterialCommunityIcons name="cart" size={32} color={colors.text} />
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
          {/* <MaterialCommunityIcons
            name="dots-vertical"
            size={32}
            color={colors.text}
            onPress={() => setModel(true)}
          /> */}
        </View>
      </View>

      <View
        style={{
          height: metrics.HEIGHT * 0.06,
          backgroundColor: Colors.white,
          elevation: 5,
          width: '95%',
          alignSelf: 'center',
          borderRadius: 50,
          marginTop: '5%',
          marginBottom: '2%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.gray}
          style={{marginLeft: '4%'}}
        />
        <TextInput
          placeholder="search..."
          placeholderTextColor={Colors.black}
          style={{
            width: '82%',
            marginLeft: '2%',
            fontFamily: Fonts.FontsType.Montserrat_Regular,
            fontSize: Fonts.FontsSize.small13,
            color: colors.black,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
      </View>

      <View style={{padding: '4%'}}>
        {/* <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
          Accessories
        </Text> */}

        <FlatList
          data={accessories_list}
          style={{marginTop: '3%', marginBottom: '10%'}}
          renderItem={({item, index}) => {
            var isCheck = acce_cart.every((val, ind) => val.id === item.id);
            // if (!isCheck) {
            return (
              <View
                style={{
                  padding: '5%',
                  margin: '1%',
                  backgroundColor: 'white',
                  elevation: 2,
                  borderWidth: 1,
                  borderColor: Colors.light,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontWeight: '700', fontSize: 18, color: 'black'}}>
                    {item.name}
                  </Text>
                  {index === get_index ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.icon,
                        width: '35%',
                        height: 38,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        addValueInCart(item);
                        Set_index('');
                      }}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Add To Cart
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.icon,
                        width: '35%',
                        height: 38,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        // addValueInCart(item)
                        Set_index(index);
                      }}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        +
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {index === get_index ? (
                  <View style={{}}>
                    <TextInput
                      keyboardType="number-pad"
                      placeholder="Enter the Price"
                      placeholderTextColor={Colors.gray}
                      underlineColorAndroid={Colors.gray}
                      style={{color: Colors.black}}
                      onChangeText={text => Set_price(text)}
                    />
                  </View>
                ) : null}
                {/* <Text
                  style={{ fontWeight: "700", fontSize: 16, color: "gray" }}
                >
                  ₹{item.price}
                </Text> */}
              </View>
            );
            // }
          }}
        />
      </View>
    </View>
  );
};

export default Drawercomponet;
