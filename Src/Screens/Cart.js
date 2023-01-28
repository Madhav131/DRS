import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import {useproductContext} from '../Context/product_context';
import {useCartContext} from '../Context/cart_context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useThemeContext} from '../Context/them_context';
import Colors from '../Utils/Colors';
import metrics from '../Utils/Metrics';

const Cart = props => {
  const [getdata, setdata] = useState();
  const [getcode, setcode] = useState();
  const [getitems, setitems] = useState();
  const [getfe, setFe] = useState();

  const {accessories_list, getAccessories} = useproductContext();
  const {
    cart,
    total,
    removeFromCart,
    increment_qty,
    descrease_qty,
    addToCart_accessories,
    acce_cart,

    removedItemFromCart_accessories,
    removedItemFromCart_rawmaterial,
    removedItemFromCart_aassThree,
    increment_qty_acce,
    increment_qty_raw,
    descrease_qty_acce,
    descrease_qty_raw,
    qty,
    raw_cart,
    AssTwo_cart,
    removedItemFromCart_aassTwo,
    increment_qty_asstwo,
    descrease_qty_asstwo,
    AccThree_cart,
    increment_qty_assthree,
    descrease_qty_assthree,
  } = useCartContext();
  const {setTheme, colors, theme} = useThemeContext();

  useEffect(() => {
    getAccessories();
    console.log('qty---->', qty);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        backgroundColor={Colors.gray}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          backgroundColor: Colors.gray,
          padding: '4%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={32}
          color={Colors.white}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={{color: Colors.white, fontSize: 18, marginLeft: '5%'}}>
          Cart
        </Text>
      </View>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{marginBottom: '20%'}}>
          {cart.length > 0 ? (
            <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
              <Text style={{fontSize: 20, color: Colors.black}}>Product</Text>
            </View>
          ) : null}
          <View>
            <FlatList
              data={cart}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: '3%',
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: Colors.light,
                      borderRadius: 15,
                      backgroundColor: Colors.white,
                      marginTop: '3%',
                      margin: '2%',
                      width: metrics.WIDTH * 0.96,
                    }}>
                    <View style={{width: '100%'}}>
                      <View style={{marginLeft: '3%', width: '70%'}}>
                        <View style={{marginLeft: '3%'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: metrics.WIDTH * 0.85,
                              justifyContent: 'space-between',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{color: '#228be6', fontWeight: 'bold'}}>
                                School:
                              </Text>
                              <Text
                                style={{
                                  color: Colors.black,
                                  fontWeight: 'bold',
                                  fontSize: 15,
                                  width: metrics.WIDTH * 0.35,
                                  marginLeft: '5%',
                                }}>
                                {item.getSname}
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: Colors.gray,
                                borderRadius: 3,
                              }}>
                              <MaterialCommunityIcons
                                name="close"
                                color={Colors.white}
                                size={26}
                                onPress={() => removeFromCart(index)}
                              />
                            </View>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontWeight: 'bold',
                                color: '#228be6',
                              }}>
                              Name:
                            </Text>
                            <Text
                              style={{
                                color: Colors.black,
                                fontWeight: 'bold',
                                width: metrics.WIDTH * 0.3,
                                marginLeft: '9%',
                              }}>
                              {item.user_name}
                            </Text>
                          </View>
                        </View>
                        <View style={{}}>
                          <View style={{justifyContent: 'space-between'}}>
                            <View>
                              {item.selectedItemDetails &&
                              item.selectedItemDetails.length > 0
                                ? item.selectedItemDetails.map((val, ind) => {
                                    return (
                                      <>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: '2%',
                                          }}>
                                          <Text
                                            style={{
                                              color: '#228be6',
                                              fontWeight: 'bold',
                                              marginLeft: '3%',
                                            }}>
                                            Gender :
                                          </Text>
                                          <Text
                                            style={{
                                              color: Colors.black,
                                              fontWeight: 'bold',
                                              width: metrics.WIDTH * 0.3,
                                              marginLeft: '3%',
                                            }}>
                                            {val.gender_id.name}
                                          </Text>
                                        </View>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            marginTop: '2%',
                                          }}>
                                          <Text
                                            style={{
                                              color: '#228be6',
                                              fontWeight: 'bold',
                                              marginLeft: '3%',
                                            }}>
                                            Size :
                                          </Text>
                                          <Text
                                            style={{
                                              color: Colors.black,
                                              fontWeight: 'bold',
                                              marginLeft: '10%',
                                            }}>
                                            {val.size_id.name}
                                          </Text>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginLeft: metrics.HEIGHT * 0.2,
                                            }}>
                                            <Text style={{marginRight: '3%'}}>
                                              ₹
                                            </Text>
                                            <Text
                                              style={{
                                                marginRight: '3%',
                                                color: Colors.black,
                                              }}>
                                              {item.user_Total * item.qty}
                                            </Text>
                                            <MaterialCommunityIcons
                                              name="plus-circle"
                                              size={25}
                                              color={colors.icon}
                                              style={{marginRight: '2%'}}
                                              onPress={() =>
                                                increment_qty(index)
                                              }
                                            />
                                            <Text style={{color: Colors.black}}>
                                              {item.qty}
                                            </Text>
                                            <MaterialCommunityIcons
                                              name="minus-circle"
                                              size={25}
                                              color={colors.icon}
                                              onPress={() =>
                                                item.qty > 1
                                                  ? descrease_qty(index)
                                                  : null
                                              }
                                            />
                                          </View>
                                        </View>
                                      </>
                                    );
                                  })
                                : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {acce_cart.length > 0 ? (
            <View style={{marginHorizontal: '5%'}}>
              <Text style={{fontSize: 20, color: Colors.black}}>
                Accessories
              </Text>
            </View>
          ) : null}
          <View>
            <FlatList
              data={acce_cart}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: '3%',
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: Colors.light,
                      borderRadius: 15,
                      backgroundColor: Colors.white,
                      marginTop: '3%',
                      margin: '2%',
                      width: metrics.WIDTH * 0.96,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Name :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '7%',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Price :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '9%',
                        }}>
                        ₹{item.user_price}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.gray,
                        borderRadius: 3,
                        position: 'absolute',
                        top: '19%',
                        right: '3%',
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        color={Colors.white}
                        size={26}
                        onPress={() => removedItemFromCart_accessories(index)}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        marginRight: '1%',
                      }}>
                      <Text style={{marginRight: '3%', color: Colors.black}}>
                        ₹ {item.user_price}
                      </Text>
                      <MaterialCommunityIcons
                        name="plus-circle"
                        size={25}
                        color={colors.icon}
                        style={{marginRight: '1%'}}
                        onPress={() => increment_qty_acce(index)}
                      />
                      <Text style={{color: Colors.black, marginRight: '1%'}}>
                        {item.qty}
                      </Text>
                      <MaterialCommunityIcons
                        name="minus-circle"
                        size={25}
                        color={colors.icon}
                        onPress={() =>
                          item.qty > 1 ? descrease_qty_acce(index) : null
                        }
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {AssTwo_cart.length > 0 ? (
            <View style={{marginHorizontal: '5%'}}>
              <Text style={{fontSize: 20, color: Colors.black}}>
                Accessories Two
              </Text>
            </View>
          ) : null}
          <View>
            <FlatList
              data={AssTwo_cart}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: '3%',
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: Colors.light,
                      borderRadius: 15,
                      backgroundColor: Colors.white,
                      marginTop: '3%',
                      margin: '2%',
                      width: metrics.WIDTH * 0.96,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Name :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '7%',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Price :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '9%',
                        }}>
                        ₹{item.user_price}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.gray,
                        borderRadius: 3,
                        position: 'absolute',
                        top: '19%',
                        right: '3%',
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        color={Colors.white}
                        size={26}
                        onPress={() => removedItemFromCart_aassTwo(index)}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        marginRight: '1%',
                      }}>
                      <Text style={{marginRight: '3%', color: Colors.black}}>
                        ₹ {item.user_price * item.qty}
                      </Text>
                      <MaterialCommunityIcons
                        name="plus-circle"
                        size={25}
                        color={colors.icon}
                        style={{marginRight: '1%'}}
                        onPress={() => increment_qty_asstwo(index)}
                      />
                      <Text style={{color: Colors.black, marginRight: '1%'}}>
                        {item.qty}
                      </Text>
                      <MaterialCommunityIcons
                        name="minus-circle"
                        size={25}
                        color={colors.icon}
                        onPress={() =>
                          item.qty > 1 ? descrease_qty_asstwo(index) : null
                        }
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {AccThree_cart.length > 0 ? (
            <View style={{marginHorizontal: '5%'}}>
              <Text style={{fontSize: 20, color: Colors.black}}>
                Accessories Three
              </Text>
            </View>
          ) : null}
          <View>
            <FlatList
              data={AccThree_cart}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: '3%',
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: Colors.light,
                      borderRadius: 15,
                      backgroundColor: Colors.white,
                      marginTop: '3%',
                      margin: '2%',
                      width: metrics.WIDTH * 0.96,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Name :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '7%',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Price :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '9%',
                        }}>
                        ₹{item.user_price}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.gray,
                        borderRadius: 3,
                        position: 'absolute',
                        top: '19%',
                        right: '3%',
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        color={Colors.white}
                        size={26}
                        onPress={() => removedItemFromCart_aassThree(index)}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        marginRight: '1%',
                      }}>
                      <Text style={{marginRight: '3%', color: Colors.black}}>
                        ₹ {item.user_price * item.qty}
                      </Text>
                      <MaterialCommunityIcons
                        name="plus-circle"
                        size={25}
                        color={colors.icon}
                        style={{marginRight: '1%'}}
                        onPress={() => increment_qty_assthree(index)}
                      />
                      <Text style={{color: Colors.black, marginRight: '1%'}}>
                        {item.qty}
                      </Text>
                      <MaterialCommunityIcons
                        name="minus-circle"
                        size={25}
                        color={colors.icon}
                        onPress={() =>
                          item.qty > 1 ? descrease_qty_assthree(index) : null
                        }
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>

          {raw_cart.length > 0 ? (
            <View style={{marginHorizontal: '5%'}}>
              <Text style={{fontSize: 20, color: Colors.black}}>
                RawMaterial
              </Text>
            </View>
          ) : null}
          <View>
            <FlatList
              data={raw_cart}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: '3%',
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: Colors.light,
                      borderRadius: 15,
                      backgroundColor: Colors.white,
                      marginTop: '3%',
                      margin: '2%',
                      width: metrics.WIDTH * 0.96,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Name :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '7%',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#228be6', fontWeight: 'bold'}}>
                        Price :
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 15,
                          width: metrics.WIDTH * 0.3,
                          marginLeft: '9%',
                        }}>
                        ₹{item.total_price}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.gray,
                        borderRadius: 3,
                        position: 'absolute',
                        top: '19%',
                        right: '3%',
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        color={Colors.white}
                        size={26}
                        onPress={() => removedItemFromCart_rawmaterial(index)}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        marginRight: '1%',
                      }}>
                      <Text
                        style={{
                          marginRight: '3%',
                          color: Colors.black,
                          fontWeight: '500',
                        }}>
                        ₹ {item.total_price}
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          marginRight: '1%',
                          fontWeight: '500',
                        }}>
                        Qty:{item.qty}
                      </Text>
                      {/* <MaterialCommunityIcons
                        name="plus-circle"
                        size={25}
                        color={colors.icon}
                        style={{ marginRight: "1%" }}
                        onPress={() => increment_qty_raw(index)}
                      />
                     
                      <MaterialCommunityIcons
                        name="minus-circle"
                        size={25}
                        color={colors.icon}
                        onPress={() =>
                          item.qty > 1 ? descrease_qty_raw(index) : null
                        }
                      /> */}
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            padding: '4%',
            elevation: 5,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: colors.text, fontSize: 18, fontWeight: '600'}}>
            Total : ₹{total}
          </Text>
          <Text style={{color: colors.text, fontSize: 18, fontWeight: '600'}}>
            Qty: {qty}
          </Text>
          {/* {cart.length > 0 ? ( */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.icon,
              width: '35%',
              height: 42,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => props.navigation.navigate('PlaceOrder')}>
            <Text style={{color: 'white'}}>Continue</Text>
          </TouchableOpacity>
          {/* ) : null} */}
        </View>
      </View>
    </View>
  );
};

export default Cart;
