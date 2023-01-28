import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useproductContext} from '../Context/product_context';
import {useCartContext} from '../Context/cart_context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useThemeContext} from '../Context/them_context';
import {CheckBox} from 'react-native-elements';
import Colors from '../Utils/Colors';
import {Entypo} from 'react-native-vector-icons/Entypo';
import metrics from '../Utils/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrewerScreen from './drewerscreen';
import axios from 'axios';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';
import Fonts from '../Utils/Fonts';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '../Utils/const';
const Drawer = createDrawerNavigator();

// const Drawercomponet = (props, { navigation, route }) => {
//   console.log("iiid----->", props.route.params.iid);

//   // const [id, setid] = useState(route.params.iid);
//   return (
//     <Drawer.Navigator drawerContent={(props) => <DrewerScreen {...props} />}>
//       <Drawer.Screen name="Drawer" component={schoolitem} />
//     </Drawer.Navigator>
//   );
// };

const schoolitem = props => {
  const [data, Setdata] = useState([]);
  const [getarray, setarray] = useState();

  const [id, setid] = useState(props.route.params.iid);
  const [school_name, SetSchool_name] = useState(props.route.params.sname);

  const [cart_item, setCartItem] = useState('');

  const {products} = useproductContext();
  const {
    addToCart,
    cart,
    increment_qty,
    descrease_qty,
    acce_cart,
    qty,
    countQty,
    countTotal,
  } = useCartContext();
  const {setTheme, colors, theme} = useThemeContext();
  const [modelVisible, setModel] = useState('');
  const [modelVisible1, setModel1] = useState('');
  const [getindex, setindex] = useState([]);
  const [getitem, setItem] = useState('');
  const [getar, setAr] = useState();
  const [getfe, setFe] = useState();
  const [getratevalue, setratevalue] = useState(0);
  const [task_arrayholder, setBranchArray] = useState([]);
  const [newArray, setArray] = useState([]);
  const [getlist, setlist] = useState([]);
  const [getcheck, setcheck] = useState([]);
  const [product_name, Setproduct_name] = useState();
  const [product_code, Setproduct_code] = useState();
  const [product_id, Setproduct_id] = useState();
  const [getgst, SetGst] = useState();
  const [refersh_array, setRefresh_array] = useState(false);
  const [loading, setLoading] = useState(false);
  const [get_idindex, Set_IdIndex] = useState([]);
  // const [getindex, setindex] = useState([]);
  const [get_incc, Set_incc] = useState('');
  useEffect(async () => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      Productlist();
    });

    return unsubscribe;
  }, [props]);

  const Productlist = async () => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('school_id', id);
    setLoading(true);
    axios
      .post(BASE_URL + 'schoolproduct', formdata, {
        headers: {
          Accept: 'application/x.drs.v1+json',
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('item=====>', res.data);
        // console.log("details", res.data.data[0].itemsdetails);
        if (res.data.success === 1) {
          Setdata(res.data.data);
          AsyncStorage.setItem('code', JSON.stringify(res.data.data));
          if (res.data.data.length > 0) {
            AsyncStorage.setItem(
              'code1',
              JSON.stringify(res.data.data[0].code),
            );
            setindex(res.data.data[0].itemsdetails);
            // setratevalue(res.data.data[0].itemsdetails.wholesale_price);
            setarray(res.data.data[0].itemsdetails);
            setBranchArray(res.data.data);
          }
          setLoading(false);
        } else {
          Toast.show(res.data.status);
          props.navigation.navigate('LoginScreen');
        }
      })

      .catch(err => {
        console.log(err);
      });
  };

  const addItemToCart = async () => {
    if (getitem === '') {
      Toast.show('Please select size');
      return;
    }
    // setLoading(true);
    setModel1(false);

    const temp = [];
    // temp.push(getar);
    // console.log("=========", getar);
    for (var i = 0; i < newArray.length; i++) {
      // temp.push(newArray[i].gender_id.id)
      // temp.push(newArray[i].size_id.id)
      // temp.push(newArray[i].wholesale_price)
      console.log('----============', newArray[i]);
      await addToCart(newArray[i]);

      await countQty();
      await countTotal();
      await setcheck([]);
      setArray([]);
      // setLoading(false);
    }
    // console.log("madhav====>>>>", temp)

    // var object = {
    //   ...cart_item,
    //   selectedItemDetails: temp,
    //   gender_ids: getar.gender_id.id,
    //   size_ids: getar.size_id.id,
    //   qty: 1,
    //   user_price: getar.wholesale_price,
    // };
    // var data = object;
    // addToCart(temp);
    // setArray([])
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const code1 = item.code ? item.code.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1 || code1.indexOf(textData) > -1;
    });

    Setdata(newData);
  };

  const check = async (item, index, value) => {
    const tempar = [];
    tempar.push(item);
    setindex(item);
    Set_IdIndex([index]);
    console.log('=======value', value);
    if (value) getcheck[index] = value;
    else getcheck[index] = !getcheck[index];

    var object = {
      ...item,
      selectedItemDetails: tempar,
      gender_ids: item.gender_id.id,
      size_ids: item.size_id.id,
      size_name: item.size_id.name,
      qty: 1,
      user_price: item.wholesale_price,
      user_Total: item.wholesale_price,
      user_name: product_name,
      user_code: product_code,
      user_id: product_id,
      getSname: school_name,
      gst: getgst,
      // scgst: Math.round(
      //   (item.wholesale_price * (getgst / 2)) / (100 + getgst / 2),
      // ),
      // scgst: (item.wholesale_price * (getgst / 2)) / (100 + getgst / 2),
      // scgst: (500 - 500 * (100 / (100 + 5))).toFixed(3),
      scgst: (
        (item.wholesale_price - item.wholesale_price * (100 / (100 + getgst))) /
        2
      ).toFixed(2),
    };
    var data = object;
    console.log('ddata-=-=>', data);
    if (getcheck[index]) setArray([...newArray, data]);
    else {
      // setArray(
      //   newArray.filter(function (i) {
      //     return i.id !== item.id;
      //   }),
      // );
      console.log('------else', newArray);
      const newPeople = await newArray.filter(
        (data, index) =>
          data.gender_ids !== item.gender_id.id ||
          data.size_ids !== item.size_id.id,
      );
      await setArray(newPeople);
    }

    if (setcheck[item] == true) {
      setlist.push(getindex);
      setlist(getindex);
      console.log('getindex-=-=-=>', getindex);
    } else {
      var temp = getcheck.filter((x, i) => x !== getindex);
      setlist(temp);
      // console.log("temp=-=-=--=>", temp)
    }
  };

  const incre = (item, index) => {
    // console.log("=--=-=>", item)
    console.log('gender_id', item.gender_id.id);
    console.log('size_id', item.size_id.id);
    Set_incc(item.gender_id.id);
    console.log(
      'gender===>',
      item.gender_id.id,
      'size======>',
      item.size_id.id,
    );
    // const Temp = newArray.find((value) => value.gender_ids === item.gender_id.id || value.size_ids === item.size_id.id)
    const array_index = newArray.findIndex(
      value =>
        value.size_ids === item.gender_id.id ||
        value.size_ids === item.size_id.id,
    );
    // console.log("dsvnjkvdsnjkv", Temp, Temp.gender_ids, Temp.size_ids)
    console.log('index----', array_index);

    const temp = newArray;
    temp[array_index].qty = temp[array_index].qty + 1 || setArray(temp);
    setRefresh_array(!refersh_array);
  };

  const descre = (item, index) => {
    // console.log("=--=-=>", item)
    console.log('gender_id', item.gender_id.id);
    console.log('size_id', item.size_id.id);
    Set_incc(item.gender_id.id);
    console.log(
      'gender===>',
      item.gender_id.id,
      'size======>',
      item.size_id.id,
    );
    // const Temp = newArray.find((value) => value.gender_ids === item.gender_id.id || value.size_ids === item.size_id.id)
    const array_index = newArray.findIndex(
      value =>
        value.size_ids === item.gender_id.id ||
        value.size_ids === item.size_id.id,
    );
    // console.log("dsvnjkvdsnjkv", Temp, Temp.gender_ids, Temp.size_ids)
    console.log('index----', array_index);

    const temp = newArray;
    temp[array_index].qty = temp[array_index].qty - 1;
    setArray(temp);
    setRefresh_array(!refersh_array);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        backgroundColor={Colors.gray}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          padding: '4%',
          flexDirection: 'row',
          backgroundColor: Colors.gray,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Colors.white}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={{color: Colors.white, fontSize: 18, marginLeft: '5%'}}>
            School Items
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
            {qty === undefined || qty === '' ? null : (
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
            color: colors.black,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
      </View>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        {loading == true ? (
          <View style={{justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              // var check = "";
              // var redux_item;
              // if (cart.length > 0) {
              //   check = cart.some((data) => data.id === item.id);
              //   redux_item = cart.find((data) => data.id === item.id);
              // }
              return (
                <View
                  style={{
                    padding: '3%',
                    backgroundColor: Colors.white,
                    margin: '1%',
                    borderRadius: 10,
                    elevation: 2,
                    borderWidth: 0.5,
                    borderColor: Colors.light,
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          width: '70%',
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: Colors.black,
                            marginLeft: '3%',
                            marginTop: metrics.HEIGHT * 0.005,
                            marginBottom: '3%',
                          }}>
                          {item.name}
                        </Text>
                        <View style={{}}>
                          <Text
                            style={{
                              fontWeight: '700',
                              marginLeft: '3%',
                              color: Colors.gray,
                            }}>
                            {item.code}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: Colors.gray,
                            width: metrics.WIDTH * 0.3,
                            height: 38,
                            borderRadius: 5,
                            marginTop: '5%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            setCartItem(item);
                            setModel1(true);
                            setarray(item.itemsdetails);
                            Setproduct_id(item.id);
                            Setproduct_name(item.name);
                            Setproduct_code(item.code);
                            SetGst(item.gst);
                            console.log('item-=->', item.gst);
                          }}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            Add to cart
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <View>
                    <Text
                      style={{
                        fontWeight: "700",
                        marginLeft: "3%",
                        color: Colors.gray,
                      }}
                    >
                      {item.code}
                    </Text>
                  </View> */}
                  </View>
                </View>
              );
            }}
          />
        )}
        {/* } */}
      </View>
      <Modal
        transparent
        visible={modelVisible1}
        onRequestClose={() => {
          setModel1(false);
          setcheck([]);
          setArray([]);
        }}>
        <View
          style={{
            backgroundColor: colors.transparent,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: metrics.WIDTH * 0.9,
              elevation: 20,
              borderRadius: 10,
              backgroundColor: colors.card,
              marginTop: '5%',
            }}>
            <ScrollView>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginLeft: '5%',
                    marginTop: '5%',
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: Colors.black,
                  }}>
                  Select Size
                </Text>
                <Text
                  style={{
                    marginLeft: metrics.WIDTH * 0.13,
                    marginTop: '5%',
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: Colors.black,
                  }}>
                  Price
                </Text>
              </View>
              <View style={{}}>
                <FlatList
                  data={getarray}
                  extraData={refersh_array}
                  renderItem={({item, index}) => {
                    var check_item = '';
                    var redux_item;
                    if (newArray.length > 0) {
                      check_item = newArray.some(
                        data =>
                          data.gender_ids === item.gender_id.id &&
                          data.size_ids === item.size_id.id,
                      );
                      redux_item = newArray.find(
                        data =>
                          data.gender_ids === item.gender_id.id &&
                          data.size_ids === item.size_id.id,
                      );
                    }
                    // console.log("-------check  ", newArray);
                    // const temp_obj = newArray.find(v => v.gender_ids === item.gender_id.id || v.size_ids === item.size_id.id)
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          // backgroundColor: 'red'
                        }}>
                        <TouchableOpacity
                          onPress={async () => {
                            await setItem(index);
                            await setAr(item);
                            // setFe(item.gender_id.name);
                            await check(item, index);
                          }}
                          style={{
                            flexDirection: 'row',
                            backgroundColor: Colors.white,
                            alignItems: 'center',
                          }}>
                          <View style={{width: '15%'}}>
                            <CheckBox
                              checked={getcheck[(item, index)]}
                              onPress={async () => {
                                await setAr(item);
                                await setItem(index);
                                // await setFe(item.gender_id.name);
                                await check(item, index);
                              }}
                            />
                            {/* <Fontisto
                            name={
                              getitem === index
                                ? "checkbox-active"
                                : "checkbox-passive"
                            }
                            size={20} color={getitem === index ? "#1971c2" : Colors.gray}
                          /> */}
                          </View>
                          <View
                            style={{
                              marginLeft: '5%',
                              backgroundColor: '#868e96',
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.white,
                                width: metrics.WIDTH * 0.25,
                                fontSize: 16,
                              }}>
                              {item.size_id.name} - {item.gender_id.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              marginLeft: '5%',
                              backgroundColor: '#868e96',
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              marginLeft: '2%',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.white,
                                width: metrics.WIDTH * 0.25,
                                fontSize: 16,
                              }}>
                              {item.wholesale_price}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {check_item ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // marginTop: '5%'
                              // backgroundColor: 'red'
                              // marginLeft: metrics.HEIGHT * 0.2,
                            }}>
                            <MaterialCommunityIcons
                              name="plus-circle"
                              size={32}
                              color={colors.icon}
                              style={{marginRight: '2%'}}
                              onPress={() => {
                                incre(item, index);
                              }}
                            />
                            <Text style={{color: Colors.black}}>
                              {redux_item.qty}
                            </Text>
                            <MaterialCommunityIcons
                              name="minus-circle"
                              size={32}
                              color={colors.icon}
                              onPress={() =>
                                redux_item.qty > 1 ? descre(item, index) : null
                              }
                            />
                          </View>
                        ) : null}
                      </View>
                    );
                  }}
                />
                {/* {getarray && getarray.length > 0
                  ? getarray.map((item, index) => {

                    const temp_obj = newArray.find(v => v.gender_ids === item.gender_id.id || v.size_ids === item.size_id.id)
                    // console.log("-----=====, ", temp_obj) */}
                {/* }) */}
                {/* : null} */}
              </View>
              <TouchableOpacity
                style={{
                  marginTop: '8%',
                  backgroundColor: Colors.gray,
                  width: metrics.WIDTH * 0.4,
                  height: metrics.HEIGHT * 0.07,
                  borderRadius: 5,
                  elevation: 5,
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '5%',
                  left: '-5%',
                }}
                onPress={() => {
                  setItem('');
                  addItemToCart();
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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

export default schoolitem;
