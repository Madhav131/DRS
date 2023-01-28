import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {useproductContext} from '../Context/product_context';
import {useCartContext} from '../Context/cart_context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useThemeContext} from '../Context/them_context';
import Colors from '../Utils/Colors';
import Fonts from '../Utils/Fonts';
import axios from 'axios';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrewerScreen from './drewerscreen';
import Toast from 'react-native-simple-toast';
import metrics from '../Utils/Metrics';
import {BASE_URL} from '../Utils/const';
const Drawer = createDrawerNavigator();

const Drawercomponet = () => {
  // const [getid, setid] =useState()
  return (
    <Drawer.Navigator drawerContent={props => <DrewerScreen {...props} />}>
      <Drawer.Screen name="Drawer" component={Product} />
    </Drawer.Navigator>
  );
};

const Product = props => {
  const {products} = useproductContext();
  const {addToCart, cart, increment_qty, descrease_qty, qty} = useCartContext();
  const {setTheme, colors, theme} = useThemeContext();
  const [data, Setdata] = useState([]);
  const [modelVisible, setModel] = useState('');
  const [task_arrayholder, setBranchArray] = useState([]);
  const [token, setToken] = useState('');
  const [isloading, setloading] = useState(false);
  const [get_role, Set_role] = useState();
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        setToken(JSON.parse(value));
        // console.log('token=======>', value);
      }
    });
    // AsyncStorage.getItem('role').then(value => {
    //   if (value) {
    //     Set_role(JSON.parse(value));
    //     console.log('role=======>', value);
    //   }
    // });
    Getschool();
  }, [token]);

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     Getschool();
  //   });

  //   return unsubscribe;
  // }, [props]);

  const Getschool = async () => {
    setloading(true);
    axios
      .get(BASE_URL + 'schooldetails', {
        headers: {
          Accept: 'application/x.drs.v1+json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        if (res.data.success === 1) {
          Setdata(res.data.data);
          setBranchArray(res.data.data);
          setloading(false);
        } else if (res.data.status === 'Token is Expired') {
          props.navigation.navigate('LoginScreen');
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
    });

    Setdata(newData);
  };

  console.log('-----', qty);
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* {get_role === 4 ? (
            <TouchableOpacity
              style={{ marginLeft: "5%", alignSelf: "center" }}
              onPress={() => props.navigation.toggleDrawer()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={32}
                color={Colors.white}
                onPress={() => props.navigation.replace("AdminDashboard")}
              />
            </TouchableOpacity>
          ) : ( */}
          <TouchableOpacity
            style={{marginLeft: '5%', alignSelf: 'center'}}
            onPress={() => props.navigation.toggleDrawer()}>
            <Ionicons name="md-menu-sharp" size={30} color={Colors.white} />
          </TouchableOpacity>
          {/* )} */}
          <Text style={{color: Colors.white, fontSize: 18, marginLeft: '5%'}}>
            School Names
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
            {qty === undefined || qty === 0 ? null : (
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
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: metrics.HEIGHT * 0.06,
          backgroundColor: Colors.white,
          elevation: 2,
          width: '95%',
          alignSelf: 'center',
          borderRadius: 50,
          marginTop: '5%',
          marginBottom: '2%',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: Colors.light,
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
            color: Colors.black,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
      </View>
      {isloading == true ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          style={{marginTop: '3%'}}
          // keyExtractor={(item) => item.name}
          renderItem={({item, index}) => {
            // var check = "";
            // var redux_item;
            // if (cart.length > 0) {
            //   check = cart.some((data) => data.product_id === item.product_id);
            //   redux_item = cart.find(
            //     (data) => data.product_id === item.product_id
            //   );
            // }
            return (
              <View
                style={{
                  padding: '3%',
                  backgroundColor: colors.card,
                  margin: '1%',
                  borderRadius: 3,
                  elevation: 2,
                  borderWidth: 0.5,
                  borderColor: Colors.light,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('schoolitem', {
                        iid: item.id,
                        sname: item.name,
                      })
                    }
                    style={{marginLeft: '3%', width: '70%'}}>
                    <Text
                      style={{
                        color: colors.text,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {item.name}
                    </Text>
                    {/* <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: colors.text }}>₹{item.price}</Text>

                    {check ? (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="plus-circle"
                          size={25}
                          color={colors.icon}
                          style={{ padding: "2%" }}
                          onPress={() => increment_qty(redux_item)}
                        />
                        <Text style={{ color: colors.text }}>
                          {redux_item.qty}
                        </Text>
                        <MaterialCommunityIcons
                          name="minus-circle"
                          size={25}
                          color={colors.icon}
                          style={{ padding: "2%" }}
                          onPress={() => descrease_qty(redux_item)}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          marginTop: "3%",
                          backgroundColor: colors.icon,
                          width: "38%",
                          alignSelf: "flex-end",
                          height: 38,
                          borderRadius: 5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => addToCart(item)}
                      >
                        <Text style={{ color: "black", fontWeight: "bold" }}>
                          Add to cart
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View> */}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Drawercomponet;
