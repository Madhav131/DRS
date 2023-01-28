import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../Utils/Colors';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import metrics from '../Utils/Metrics';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

const AdminDashboard = (props, {params}) => {
  const [shopList, setShopList] = useState([]);
  const [homeData, setHomeData] = useState('');
  const [token, setToken] = useState('');
  const [get_role, Set_role] = useState();
  const [selected_shop, setSelectedShop] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [getdate, SetDate] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        setToken(JSON.parse(value));
        // console.log('token=======>', value);
      }
    });
    AsyncStorage.getItem('role').then(value => {
      if (value) {
        Set_role(JSON.parse(value));
        console.log('role=======>', value);
      }
    });
  });

  useEffect(() => {
    getHomeData();
  }, [token]);

  const getHomeData = async () => {
    await axios
      .get(BASE_URL + 'home', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success === 1) {
          setHomeData(res.data.data);
          setShopList(res.data.data.shop);
        } else if (res.data.status === 'Token is Expired') {
          props.navigation.navigate('LoginScreen');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const data = moment(date).format('yyyy-MM-DD');
    SetDate(data);
    hideDatePicker();
  };

  const [getload, SetLoad] = useState(false);
  const [getdata, SetData] = useState(0);
  const submit = async () => {
    const formdata = new FormData();
    formdata.append('date', getdate);

    SetLoad(true);
    await axios
      .post(BASE_URL + 'new-home', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success === 1) {
          SetLoad(false);
          SetData(res.data.data);
        } else if (res.data.status === 'Token is Expired') {
          props.navigation.navigate('LoginScreen');
          SetLoad(false);
        }
      })
      .catch(err => {
        console.log(err);
        SetLoad(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View
        style={{
          padding: '5%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.light,
        }}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Ionicons name="md-menu-sharp" size={30} color={Colors.black} />
        </TouchableOpacity>
        <Text style={{color: Colors.black, fontSize: 18, marginLeft: '5%'}}>
          Admin Dashboard
        </Text>
      </View>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, padding: '5%'}}>
          {get_role === 4 ? null : (
            <>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  fontWeight: 'bold',
                }}>
                Select Date:
              </Text>
              <TouchableOpacity
                onPress={showDatePicker}
                style={{
                  marginTop: metrics.HEIGHT * 0.02,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.gray,
                  padding: '4%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  {getdate === '' || getdate === null
                    ? 'Select date'
                    : moment(getdate).format('DD-MM-yyyy')}
                </Text>
                <Fontisto name="date" color={Colors.black} size={25} />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginHorizontal: '10%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    SetData(0);
                    SetDate('');
                  }}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: Colors.gray,
                    marginTop: metrics.HEIGHT * 0.03,
                    padding: '5%',
                    borderRadius: 10,
                    elevation: 8,
                  }}>
                  {getload === true ? (
                    <ActivityIndicator color={Colors.white} size="small" />
                  ) : (
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: '800',
                      }}>
                      CLEAR
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    getdate === '' || getdate === null
                      ? Toast.show('Please Select Date..!!')
                      : submit();
                  }}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: Colors.gray,
                    marginTop: metrics.HEIGHT * 0.03,
                    padding: '5%',
                    borderRadius: 10,
                    elevation: 8,
                  }}>
                  {getload === true ? (
                    <ActivityIndicator color={Colors.white} size="small" />
                  ) : (
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: '800',
                      }}>
                      GO
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: metrics.HEIGHT * 0.05,
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.sky,
                  height: metrics.HEIGHT * 0.13,
                  borderRadius: 5,
                  padding: '1%',
                  alignSelf: 'center',
                }}>
                {getload === true ? (
                  <ActivityIndicator color={Colors.black} size="small" />
                ) : (
                  <Text style={styles.heading}>{getdata}</Text>
                )}
                <Text style={styles.label}>Income</Text>
              </View>
            </>
          )}
          {get_role === 4 ? (
            <>
              <View
                style={{
                  borderWidth: 0.3,
                  borderColor: Colors.gray,
                  borderRadius: 50,
                }}>
                <Picker
                  selectedValue={selected_shop}
                  style="#000"
                  onValueChange={val => setSelectedShop(val)}>
                  <Picker.Item label="General" value={''} />
                  {shopList.map((item, index) => {
                    return <Picker.Item label={item.name} value={index} />;
                  })}
                </Picker>
              </View>
              {selected_shop === '' || selected_shop === undefined ? (
                homeData !== '' || homeData !== undefined ? (
                  <View>
                    {get_role === 4 ? null : (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: '5%',
                            marginHorizontal: '8%',
                          }}>
                          {shopList && shopList.length > 0
                            ? shopList.map((item, index) => {
                                return (
                                  <View style={{}}>
                                    <View style={{}}>
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          color: Colors.black,
                                          fontWeight: 'bold',
                                        }}>
                                        {item.name}
                                      </Text>
                                      <View
                                        style={{
                                          width: '100%',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          backgroundColor: Colors.sky,
                                          height: metrics.HEIGHT * 0.13,
                                          borderRadius: 5,
                                          padding: '1%',
                                        }}>
                                        <Text style={styles.heading}>
                                          {item.todays_income}
                                        </Text>
                                        <Text style={styles.label}>
                                          Today Income
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                );
                              })
                            : null}
                        </View>

                        <Text
                          style={{
                            fontSize: 18,
                            color: Colors.black,
                            marginTop: '5%',
                            fontWeight: 'bold',
                          }}>
                          Income Details
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginTop: '5%',
                          }}>
                          {/* <View style={styles.container} >
                                                <Text style={styles.heading} >{homeData.all_income}</Text>
                                                <Text style={styles.label} >All Income</Text>
                                            </View> */}

                          <View style={styles.container}>
                            <Text style={styles.heading}>
                              {homeData.todays_income}
                            </Text>
                            <Text style={styles.label}>Today Income</Text>
                          </View>

                          <View style={styles.container}>
                            <Text style={styles.heading}>
                              {homeData.month_income}
                            </Text>
                            <Text style={styles.label}>Monthly Income</Text>
                          </View>
                          <View
                            style={{
                              width: '30%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: Colors.white,
                              height: metrics.HEIGHT * 0.13,
                              borderRadius: 5,
                              padding: '1%',
                            }}></View>
                          {/* <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.week_income}
                        </Text>
                        <Text style={styles.label}>Weekly Income</Text>
                      </View> */}
                        </View>

                        {/* <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginTop: '5%',
                      }}>
                      <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.month_income}
                        </Text>
                        <Text style={styles.label}>Monthly Income</Text>
                      </View>

                      <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.year_income}
                        </Text>
                        <Text style={styles.label}>Yearly Income</Text>
                      </View>

                      <View style={{width: '30%'}} />
                    </View> */}
                      </View>
                    )}
                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.black,
                        marginTop: '5%',
                        fontWeight: 'bold',
                      }}>
                      Order Details
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginTop: '5%',
                      }}>
                      <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.all_orders}
                        </Text>
                        <Text style={styles.label}>All Orders</Text>
                      </View>

                      <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.todays_orders}
                        </Text>
                        <Text style={styles.label}>Today Orders</Text>
                      </View>

                      <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.week_orders}
                        </Text>
                        <Text style={styles.label}>Weekly Orders</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginTop: '5%',
                      }}>
                      <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.month_orders}
                        </Text>
                        <Text style={styles.label}>Monthly Orders</Text>
                      </View>

                      <View style={styles.container}>
                        <Text style={styles.heading}>
                          {homeData.year_orders}
                        </Text>
                        <Text style={styles.label}>Yearly Orders</Text>
                      </View>

                      <View style={{width: '30%'}} />
                    </View>
                  </View>
                ) : null
              ) : shopList.length > 0 ? (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                      marginTop: '5%',
                      fontWeight: 'bold',
                    }}>
                    Order Details
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginTop: '5%',
                    }}>
                    <View style={styles.container}>
                      <Text style={styles.heading}>
                        {shopList[selected_shop].all_orders}
                      </Text>
                      <Text style={styles.label}>All Orders</Text>
                    </View>

                    <View style={styles.container}>
                      <Text style={styles.heading}>
                        {shopList[selected_shop].todays_orders}
                      </Text>
                      <Text style={styles.label}>Today Orders</Text>
                    </View>

                    <View style={styles.container}>
                      <Text style={styles.heading}>
                        {shopList[selected_shop].week_orders}
                      </Text>
                      <Text style={styles.label}>Weekly Orders</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginTop: '5%',
                    }}>
                    <View style={styles.container}>
                      <Text style={styles.heading}>
                        {shopList[selected_shop].month_orders}
                      </Text>
                      <Text style={styles.label}>Monthly Orders</Text>
                    </View>

                    <View style={styles.container}>
                      <Text style={styles.heading}>
                        {shopList[selected_shop].year_orders}
                      </Text>
                      <Text style={styles.label}>Yearly Orders</Text>
                    </View>

                    <View style={{width: '30%'}} />
                  </View>
                </View>
              ) : null}
            </>
          ) : null}
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.sky,
    height: metrics.HEIGHT * 0.13,
    borderRadius: 5,
    padding: '1%',
  },
  heading: {color: Colors.textGray, fontSize: 26, fontWeight: 'bold'},
  label: {marginTop: 5, fontSize: 15, color: Colors.lightGray},
});
