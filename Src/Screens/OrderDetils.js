import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
  DeviceEventEmitter,
} from 'react-native';
import moment from 'moment';
import DrewerScreen from '../Component/DrawerAdmin';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Utils/Colors';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useThemeContext} from '../Context/them_context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useproductContext} from '../Context/product_context';
import {useCartContext} from '../Context/cart_context';
import Fonts from '../Utils/Fonts';
import metrics from '../Utils/Metrics';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'tp-react-native-bluetooth-printer';
import {BASE_URL} from '../Utils/const';

const DATA = [
  {
    id: 1,
    name: 'ali',
  },
];
const stsuts = [
  {id: 1, title: 'Details'},
  {
    id: 2,
    title: 'Other Details',
  },
  {
    id: 3,
    title: 'Raw Material',
  },
  {
    id: 4,
    title: 'Other Details Two',
  },
  {
    id: 5,
    title: 'Other Details Three',
  },
];

const Drawer = createDrawerNavigator();

const Drawercomponet = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrewerScreen {...props} />}>
      <Drawer.Screen name="Drawer" component={OrderDetils} />
    </Drawer.Navigator>
  );
};

const OrderDetils = props => {
  const {setTheme, colors, theme} = useThemeContext();
  const [getindex, SetIndex] = useState();
  const {addToCart, cart, increment_qty, descrease_qty, qty} = useCartContext();
  const [modelVisible, setModel] = useState('');
  const [isModalVisible3, setModalVisible3] = useState('');
  const [child, setchild] = useState([]);
  const [getreqid, setreqid] = useState();
  const [getids, setids] = useState(1);
  const [getotherdata, setotherdara] = useState();
  const [task_arrayholder, setBranchArray] = useState([]);
  const [data, setData] = useState();
  const [isloading, setloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [getdeta, setdata] = useState([]);
  const [total_qty, SetTotal_Qty] = useState();
  const [get_total, set_Total] = useState();
  const [getsodata, setsodata] = useState([]);
  const [get_id, set_id] = useState([]);
  const [get_childid, set_childid] = useState();
  const [get_idddd, set_iddd] = useState([]);
  const [get_qty, Set_Qty] = useState();
  const [getid, SetId] = useState();
  const [getqty, SetQty] = useState();
  const [getass_two, Setass_Two] = useState([]);
  const [getass_three, Setass_Three] = useState([]);
  // useEffect(async () => {
  //   orderDetail();
  // }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      orderDetail();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);
  const orderDetail = async () => {
    setloading(true);
    setRefreshing(true);
    var Token = await AsyncStorage.getItem('token');
    console.log('token=======>', Token);
    axios
      .get(BASE_URL + 'orderDetail', {
        headers: {
          Accept: 'application/x.drs.v1+json',
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      // .then((data) => setData(data))
      .then(res => {
        // console.log('vishal');
        // console.log('sname', res.data);
        // console.log("id", res.data.data[0].otherData);
        // setotherdara(res.data.data[0].otherData);

        // setreqid(res.data.childData.id);
        // console.log("id-=-=-=-=>", res.data.data.childData[0].id);
        setData(res.data.data);
        setBranchArray(res.data.data);
        setloading(false);
        setRefreshing(false);
      })

      .catch(err => {
        console.log(err);
      });
  };

  const returnapi = async id => {
    // for (var i = 0; i < get_childid.length; i++) {
    //   console.log("vishalbharvadiya", get_childid[i].id);
    //   set_iddd(get_childid[i].id);
    // }

    console.log('getid--->', getid);
    console.log('getqty---->', getqty);
    if (get_qty > getqty) {
      Toast.show('Qty Exist...!!');
    } else {
      var Token = await AsyncStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('type_id', getids);
      formdata.append('id', getid);
      formdata.append('qty', get_qty);
      console.log('formdata', formdata);
      axios
        .post(BASE_URL + 'deleteChildOrder', formdata, {
          headers: {
            Accept: 'application/x.drs.v1+json',
            Authorization: 'Bearer ' + JSON.parse(Token),
          },
        })
        .then(res => {
          console.log('return', res.data);

          if (res.data.success == 1) {
            setModalVisible3(false);
            Toast.show(res.data.message);
            setModel(false);
            get_qty('');
            orderDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      // const name = item.employees.name
      //   ? item.employees.name.toUpperCase()
      //   : "".toUpperCase();
      const itemData = item.number
        ? item.number.toUpperCase()
        : ''.toUpperCase();
      // const itememail = item.grand_total_amount
      //   ? item.grand_total_amount.toUpperCase()
      //   : "".toUpperCase();
      // const vishal = item.grand_total_qty
      //   ? item.grand_total_qty.toUpperCase()
      //   : "".toUpperCase();
      const time = item.created_at
        ? item.created_at.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return (
        // itememail.indexOf(textData) > -1 ||
        itemData.indexOf(textData) > -1 ||
        // employee.indexOf(textData) > -1 ||
        // vishal.indexOf(textData) > -1 ||
        time.indexOf(textData) > -1
        // ||

        // name.indexOf(textData) > -1
      );
      //   return itemData.startsWith(textData) || data.startsWith(textData);
    });

    setData(newData);
  };

  const methodcall = () => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        if (enabled == true) {
          bluetoothon();
          bluetoothlist();
          // bluetoothconnect();
        } else {
          bluetoothoff();
        }
        // alert(enabled); // enabled ==> true /false
      },
      err => {
        alert(err);
      },
    );
  };
  const bluetoothoff = () => {
    BluetoothManager.disableBluetooth().then(
      () => {
        alert('Please On Bluetooth...!!');
        // do something.
      },
      err => {
        alert(err);
      },
    );
  };
  const bluetoothon = () => {
    BluetoothManager.enableBluetooth().then(
      r => {
        var paired = [];
        if (r && r.length > 0) {
          for (var i = 0; i < r.length; i++) {
            try {
              console.log(r.length, i);
              paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
            } catch (e) {
              //ignore
            }
          }
        }
        console.log('bluetooth on-------', JSON.stringify(paired));
        bluetoothconnect(paired.address);
        setdata(paired);
        // AsyncStorage.setItem(paired.address);
      },
      err => {
        alert(err);
      },
    );
  };
  const printbill = async () => {
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.setBlob(0);

    await BluetoothEscposPrinter.printText('DEEPAK READYMADE HOUSE\r\n', {
      encoding: 'GBK',
      codepage: 0,
      fonttype: 2,
      widthtimes: 1,
      heigthtimes: 1,
    });
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    // await BluetoothEscposPrinter.setBlob(0);

    await BluetoothEscposPrinter.printText(
      'Phone: (0281) - 2222318 / 2223318 2570596\r\n',
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      },
    );
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    // await BluetoothEscposPrinter.setBlob(0);

    await BluetoothEscposPrinter.printText('GSTIN: 24AAOPV5680R1ZJ\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    // await BluetoothEscposPrinter.setBlob(0);

    await BluetoothEscposPrinter.printText(
      'SUBJECT TO RAJKOT JURISDICTION\r\n',
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      },
    );
    await BluetoothEscposPrinter.printText(' \n\r', {});

    // await BluetoothEscposPrinter.printerAlign(
    //   BluetoothEscposPrinter.ALIGN.LEFT
    // );
    // await BluetoothEscposPrinter.printText("BILL ON: 1\n\r", {});
    // await BluetoothEscposPrinter.printText(
    //   "--------------------------------\n\r",
    //   {}
    // );
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT,
    );
    await BluetoothEscposPrinter.printText(
      'SCHOOLNAME    ITEM     QTY    PRICE   GST%    GSTAMOUNT    TOTAL\n\r\n',
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      },
    );
    // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.HEIGHT);
    for (var i = 0; i < child.length; i++) {
      await BluetoothEscposPrinter.printText(
        // `${data[i].child_data[0].schools.name}  ${data[i].child_data[0].product.name}   ${data[i].grand_total_qty}  ${data[i].child_data[0].amount}.00  ${data[i].child_data[0].gst_per}% ${data[i].child_data[0].gst_amount}%  ${data[i].child_data[0].amount_before_gst}  \n`,
        `${child[i].schools.name.slice(0, 10)}   ${child[i].product.name.slice(
          0,
          10,
        )}   ${child[i].qty}      ${child[i].amount_before_gst}    ${
          child[i].gst_per
        }%         ${child[i].gst_amount}      ${child[i].amount} \n`,
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }

    for (var i = 0; i < getotherdata.length; i++) {
      await BluetoothEscposPrinter.printText(
        // `${data[i].child_data[0].schools.name}  ${data[i].child_data[0].product.name}   ${data[i].grand_total_qty}  ${data[i].child_data[0].amount}.00  ${data[i].child_data[0].gst_per}% ${data[i].child_data[0].gst_amount}%  ${data[i].child_data[0].amount_before_gst}  \n`,
        `             ${getotherdata[i].name.slice(0, 10)}    ${
          getotherdata[i].qty
        }     ${getotherdata[i].amount_before_gst}    ${
          getotherdata[i].gst_per
        }%         ${getotherdata[i].gst_amount}      ${
          getotherdata[i].amount
        } \n`,
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }

    for (var i = 0; i < getsodata.length; i++) {
      await BluetoothEscposPrinter.printText(
        // `${data[i].child_data[0].schools.name}  ${data[i].child_data[0].product.name}   ${data[i].grand_total_qty}  ${data[i].child_data[0].amount}.00  ${data[i].child_data[0].gst_per}% ${data[i].child_data[0].gst_amount}%  ${data[i].child_data[0].amount_before_gst}  \n`,
        `             ${getsodata[i].name.slice(0, 10)}   ${
          getsodata[i].qty
        }     ${getsodata[i].amount_before_gst}    ${
          getsodata[i].gst_per
        }%         ${getsodata[i].gst_amount}      ${getsodata[i].amount} \n`,
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }

    await BluetoothEscposPrinter.printText(
      `TOTAL AMOUNT              ${total_qty}                              ${get_total}.00\n\r`,
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      },
    );
    await BluetoothEscposPrinter.printText(
      '------------------------------------------------\n\r',
      {},
    );
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText(
      'TIMING: Mon to Sat 9.00 AM to 8.30 PM(12.45 PM TO 3.30 PM Lunch break)\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(' \n\r', {});
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText(
      'For any feedback drop a mail to drhu1963@gmail.com\n\r',
      {},
    );
    // await BluetoothEscposPrinter.printText(
    //   " \n\r",
    //   {}
    // );

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT,
    );
    await BluetoothEscposPrinter.printText(
      'Branch 1: Opp. Panchnath Temple, Panchnath main road, Nr. Limda Chowk, Rajkot, 02812222318\n\r',
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 2,
      },
    );
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT,
    );
    await BluetoothEscposPrinter.printText(
      'Branch 2: Opp. Bhid Bhajan Mahadev Temple, Tirupati Nagar main road, Opp. Nirmala School, Rajkot, 02812570596\n\r',
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 2,
      },
    );
    await BluetoothEscposPrinter.printText(
      '------------------------------------------------\n\r',
      {},
    );
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText(
      'Thanks for payment\n\r\n\r\n\r',
      {},
    );
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT,
    );
  };
  const bluetoothconnect = () => {
    BluetoothManager.connect('03:34:E2:36:EF:2F') // the device address scanned.
      .then(
        s => {
          console.log('successs :', s);
          printbill();
          // setaddress("66:22:65:59:0A:55");
          setloading(false);

          //   this.setState({
          //     loading: false,
          //     boundAddress: address,
          //   });
        },
        e => {
          console.log('er : ', e);
          Toast.show('Not Connect Bluetooth...!!');
          setloading(false);
          // this.setState({
          //   loading: false,
          // });
          // alert(e);
        },
      );
  };
  const bluetoothlist = () => {
    DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
      rsp => {
        console.log(rsp);
        this._deviceAlreadPaired(rsp); // rsp.devices would returns the paired devices array in JSON string.
      },
    );
    DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
      this._deviceFoundEvent(rsp); // rsp.devices would returns the found device object in JSON string
    });
  };

  return (
    <View style={{flex: 1}}>
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
          Order Details
        </Text>
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
          color={Colors.black}
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
        <View style={{justifyContent: 'center', flex: 1, alignSelf: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={orderDetail} />
            }
            // keyExtractor={(item) => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  color={Colors.black}
                  onPress={() => {
                    setModalVisible3(true);
                    setchild(item.child_data.slice(0, 10));
                    setotherdara(item.other_data);
                    set_Total(item.grand_total_amount);
                    SetTotal_Qty(item.grand_total_qty);
                    setsodata(item.soraw_data);
                    set_id(item.id);
                    set_childid(item.child_data);
                    Setass_Two(item.other_data_two);
                    Setass_Three(item.other_data_three);
                  }}
                  style={{
                    padding: '3%',
                    elevation: 5,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    marginTop: '1%',
                    marginBottom: '1%',
                    flexDirection: 'row',
                    height: metrics.HEIGHT * 0.27,
                    alignItems: 'flex-start',
                    width: metrics.WIDTH * 0.96,
                    alignSelf: 'center',
                  }}>
                  <View style={{}}>
                    {/* {item.employee !== null ? ( */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: metrics.WIDTH * 0.9,
                        // marginLeft: "10%",
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <FontAwesome
                          name="phone"
                          size={20}
                          style={{
                            marginHorizontal: '5%',
                            color: '#1864ab',
                          }}
                        />
                        <Text style={{color: Colors.black, fontWeight: '500'}}>
                          {item.number}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Ionicons
                          name="person-circle"
                          size={20}
                          style={{
                            marginHorizontal: '5%',
                            color: '#1864ab',
                          }}
                        />
                        <Text style={{color: Colors.black, fontWeight: '500'}}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: '3%',
                        marginHorizontal: '3%',
                        width: metrics.WIDTH * 0.83,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          height: 2,
                          backgroundColor: Colors.gray,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: '7%',
                        justifyContent: 'space-evenly',
                      }}>
                      <View
                        style={{
                          height: metrics.HEIGHT * 0.1,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 10,
                          padding: '2%',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            marginLeft: '4%',
                            fontSize: 10,
                          }}>
                          Total
                        </Text>
                        <Text
                          style={{
                            color: Colors.white,
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 'bold',
                          }}>
                          {item.grand_total_amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: metrics.HEIGHT * 0.1,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 10,
                          padding: '2%',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            marginLeft: '4%',
                            fontSize: 10,
                          }}>
                          Total Qty
                        </Text>
                        <Text
                          style={{
                            color: Colors.white,
                            textAlign: 'center',
                            fontSize: 25,
                            marginTop: '8%',
                            fontWeight: 'bold',
                          }}>
                          {item.grand_total_qty}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: metrics.HEIGHT * 0.1,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 10,
                          padding: '2%',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            marginLeft: '4%',
                            fontSize: 10,
                          }}>
                          Status
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            textAlign: 'center',
                            fontSize: 16,
                            marginTop: '3%',
                            fontWeight: 'bold',
                          }}>
                          {item.status == 0 ? (
                            <View style={{}}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: Colors.white,
                                  fontWeight: '700',
                                }}>
                                Pending
                              </Text>
                            </View>
                          ) : (
                            <Text
                              style={{
                                fontSize: 16,
                                color: Colors.white,
                                fontWeight: '700',
                              }}>
                              Accepted
                            </Text>
                          )}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: '5%'}}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: '500',
                          marginLeft: '4%',
                        }}>
                        Date:
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: '500',
                          marginLeft: '2%',
                        }}>
                        {moment(item.created_at).format('DD-MM-YYYY')}
                      </Text>

                      {/* <TouchableOpacity
                        // Linking.openURL("http://143.110.188.148/drs/b2b/109-DRS.pdf")
                        // onPress={() => GetInvoice(item.id)}
                        onPress={() => methodcall()}
                        style={{

                          height: metrics.HEIGHT * 0.05,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 5,
                          marginLeft: metrics.HEIGHT * 0.15,
                          justifyContent: 'center'

                        }}>
                        <Text style={{ textAlign: 'center', color: Colors.white }}>
                          Print
                        </Text>

                      </TouchableOpacity> */}
                    </View>
                    {/* ) : ( */}
                    {/* <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            color: colors.themeColor,
                            fontWeight: "700",
                          }}
                        >
                          Employee:
                        </Text>
                        <Text
                          style={{
                            color: colors.grey,
                            marginLeft: "4%",
                          }}
                        >
                          {item.admins.name}
                        </Text>
                      </View>
                    )}
                    {item.admins !== null ? (
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            color: colors.themeColor,
                            fontWeight: "700",
                          }}
                        >
                          Employee:
                        </Text>
                        <Text
                          style={{
                            color: colors.gray,
                            marginLeft: "4%",
                          }}
                        >
                          {item.employee.name}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={{ color: colors.themeColor, fontWeight: "700" }}
                      >
                        Branch:
                      </Text>
                    )}
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ color: colors.themeColor, fontWeight: "700" }}
                      >
                        Total No. of clint code :
                      </Text>
                      <Text style={{ color: colors.gray, marginLeft: "4%" }}>
                        {item.no_of_client}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ color: colors.themeColor, fontWeight: "700" }}
                      >
                        Total Intraday :
                      </Text>
                      <Text style={{ color: colors.gray, marginLeft: "4%" }}>
                        {item.intraday}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ color: colors.themeColor, fontWeight: "700" }}
                      >
                        Total Delivery :
                      </Text>
                      <Text style={{ color: colors.gray, marginLeft: "4%" }}>
                        {item.delivery}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{ color: colors.themeColor, fontWeight: "700" }}
                      >
                        Date/Time :
                      </Text>
                      <Text style={{ color: colors.gray, marginLeft: "4%" }}>
                        {item.updated_at}
                      </Text>
                    </View> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible3}
        onRequestClose={() => setModalVisible3(false)}>
        <View
          style={{
            // marginTop: "20%",
            // height: "70%",
            // marginHorizontal: "5%",
            backgroundColor: Colors.white,
            borderRadius: 5,
            flex: 1,
            elevation: 3,
          }}>
          <View
            style={{
              marginTop: '2%',
              alignSelf: 'center',
              borderBottomColor: Colors.black,
              // borderBottomWidth: 1,
              marginBottom: '5%',
              justifyContent: 'space-around',
              width: '90%',
              // justifyContent:
              flexDirection: 'row',
              borderColor: Colors.gray,
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible3(false)}
              // style={{ justifyContent: "flex-end" }}
            >
              <AntDesign name="closecircle" size={20} color={Colors.black} />
            </TouchableOpacity>
            <View
              style={{
                paddingTop: '3%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                // alignContent: "center",
              }}>
              <FlatList
                numColumns={3}
                data={stsuts}
                renderItem={({item, index}) => {
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => {
                          setids(item.id);
                          SetIndex(item.id);
                        }}
                        style={{
                          backgroundColor: getids === item.id ? 'red' : 'black',
                          borderRadius: 5,
                          flexDirection: 'row',
                          width: metrics.WIDTH * 0.25,
                          marginLeft: '5%',
                          height: metrics.HEIGHT * 0.06,
                          alignItems: 'center',
                          elevation: 5,
                          marginBottom: '5%',
                          marginTop: '15%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontWeight: '700',
                          }}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <ScrollView style={{}}>
            {getids === 1 ? (
              <View style={{}}>
                {child && child.length > 0 ? (
                  child.map((item, index) => {
                    return (
                      <View
                        style={{
                          borderColor: Colors.gray,
                          borderWidth: 1,
                          borderRadius: 10,
                          marginHorizontal: '5%',
                          marginTop: '3%',
                        }}>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            School Name:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.schools.name.length > 10
                              ? item.schools.name
                                  .slice(0)
                                  .substring(0, 10)
                                  .concat('...')
                              : item.schools.name.slice(0)}
                            {/* {item.schools.name} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "1%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Product Name :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.product.name.length > 7
                              ? item.product.name
                                  .slice(0)
                                  .substring(0, 7)
                                  .concat('...')
                              : item.product.name.slice(0)}
                            {/* {item.product.name} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Size :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.sizes.name} - {item.genders.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Qty :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.qty}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Prize :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '42%',
                            }}>
                            Wholesale Price :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              marginLeft: '3%',
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.wholesale_Price}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "3%",
                            marginBottom: '5%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Amount :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.amount}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setModel(true);
                            SetId(item.id);
                            SetQty(item.qty);
                          }}
                          // onPress={() => returnapi(item.id)}
                          style={{
                            width: metrics.WIDTH * 0.9,
                            height: metrics.HEIGHT * 0.05,
                            backgroundColor: Colors.gray,

                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            // bottom: '1%'
                            // position: "absolute",
                          }}>
                          <Text style={{color: Colors.white}}>Return</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.gray,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Data Not Found....!!!
                    </Text>
                  </View>
                )}
              </View>
            ) : getids === 2 ? (
              <View style={{}}>
                {getotherdata && getotherdata.length > 0 ? (
                  getotherdata.map((item, index) => {
                    return (
                      <View
                        style={{
                          borderColor: Colors.black,
                          borderWidth: 1,
                          borderRadius: 10,
                          marginHorizontal: '5%',
                          marginTop: '3%',
                        }}>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            marginTop: '3%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Name:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "1%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Price :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Qty :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.qty}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "3%",
                            marginBottom: '5%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Amount :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.amount}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setModel(true);
                            SetId(item.id);
                            SetQty(item.qty);
                          }}
                          // onPress={() => returnapi(item.id)}
                          style={{
                            width: metrics.WIDTH * 0.9,
                            height: metrics.HEIGHT * 0.05,
                            backgroundColor: Colors.gray,

                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            // bottom: '1%'
                            // position: "absolute",
                          }}>
                          <Text style={{color: Colors.white}}>Return</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.gray,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Data Not Found....!!!
                    </Text>
                  </View>
                )}
              </View>
            ) : getids === 3 ? (
              <View style={{}}>
                {getsodata && getsodata.length > 0 ? (
                  getsodata.map((item, index) => {
                    return (
                      <View
                        style={{
                          borderColor: Colors.black,
                          borderWidth: 1,
                          borderRadius: 10,
                          marginHorizontal: '5%',
                          marginTop: '3%',
                        }}>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            marginTop: '3%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Name:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "1%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Price :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Qty :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.qty}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "3%",
                            marginBottom: '5%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Amount :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.amount}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setModel(true);
                            SetId(item.id);
                            SetQty(item.qty);
                          }}
                          // onPress={() => returnapi(item.id)}
                          style={{
                            width: metrics.WIDTH * 0.9,
                            height: metrics.HEIGHT * 0.05,
                            backgroundColor: Colors.gray,

                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            // bottom: '1%'
                            // position: "absolute",
                          }}>
                          <Text style={{color: Colors.white}}>Return</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.gray,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Data Not Found....!!!
                    </Text>
                  </View>
                )}
              </View>
            ) : getids === 4 ? (
              <View style={{}}>
                {getass_two && getass_two.length > 0 ? (
                  getass_two.map((item, index) => {
                    return (
                      <View
                        style={{
                          borderColor: Colors.black,
                          borderWidth: 1,
                          borderRadius: 10,
                          marginHorizontal: '5%',
                          marginTop: '3%',
                        }}>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            marginTop: '3%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Name:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "1%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Price :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Qty :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.qty}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "3%",
                            marginBottom: '5%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Amount :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.amount}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setModel(true);
                            SetId(item.id);
                            SetQty(item.qty);
                          }}
                          // onPress={() => returnapi(item.id)}
                          style={{
                            width: metrics.WIDTH * 0.9,
                            height: metrics.HEIGHT * 0.05,
                            backgroundColor: Colors.gray,

                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            // bottom: '1%'
                            // position: "absolute",
                          }}>
                          <Text style={{color: Colors.white}}>Return</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.gray,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Data Not Found....!!!
                    </Text>
                  </View>
                )}
              </View>
            ) : getids === 5 ? (
              <View style={{}}>
                {getass_three && getass_three.length > 0 ? (
                  getass_three.map((item, index) => {
                    return (
                      <View
                        style={{
                          borderColor: Colors.black,
                          borderWidth: 1,
                          borderRadius: 10,
                          marginHorizontal: '5%',
                          marginTop: '3%',
                        }}>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            marginTop: '3%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Name:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "1%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Price :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "7%",
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Qty :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.qty}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            // marginTop: "3%",
                            marginBottom: '5%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "2%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            Amount :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "8%",
                              color: Colors.black,
                              fontWeight: '700',
                              width: '45%',
                            }}>
                            {item.amount}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setModel(true);
                            SetId(item.id);
                            SetQty(item.qty);
                          }}
                          // onPress={() => returnapi(item.id)}
                          style={{
                            width: metrics.WIDTH * 0.9,
                            height: metrics.HEIGHT * 0.05,
                            backgroundColor: Colors.gray,

                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            // bottom: '1%'
                            // position: "absolute",
                          }}>
                          <Text style={{color: Colors.white}}>Return</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.gray,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Data Not Found....!!!
                    </Text>
                  </View>
                )}
              </View>
            ) : null}
          </ScrollView>
          {/* <View style={{ backgroundColor: 'red', position: 'absolute', top: '90%' }}>
            <Text>
              madhva
            </Text>
          </View> */}
          {/* <TouchableOpacity
            onPress={() => methodcall()}
            style={{
              position: "absolute",
              top: "90%",
              backgroundColor: "red",
              borderRadius: 5,

              width: metrics.WIDTH * 0.25,

              height: metrics.HEIGHT * 0.06,

              elevation: 3,
              marginBottom: "5%",
              justifyContent: "center",

              marginLeft: "60%",
              marginHorizontal: "5%",
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Print
            
            </Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => setModel(false)}>
        <View
          style={{
            marginTop: '50%',
            height: '30%',
            marginHorizontal: '5%',
            backgroundColor: Colors.light,
            borderRadius: 5,
            // flex: 1,
            elevation: 3,
          }}>
          <View
            style={{
              marginTop: '2%',

              borderBottomColor: Colors.black,
              // borderBottomWidth: 1,
              marginBottom: '5%',
              marginLeft: '2%',
              width: '90%',

              borderColor: Colors.gray,
            }}>
            <TouchableOpacity
              onPress={() => setModel(false)}
              // style={{ justifyContent: "flex-end" }}
            >
              <AntDesign name="closecircle" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: Colors.black,
              fontSize: 18,
              fontWeight: '600',
              marginLeft: '5%',
            }}>
            Enter Qty:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors.black,
              borderRadius: 10,
              marginHorizontal: '5%',
              marginTop: '5%',
              fontSize: 16,
            }}
            placeholder="Enter The Qty"
            onChangeText={text => Set_Qty(text)}
            placeholderTextColor={Colors.gray}
          />
          <TouchableOpacity
            onPress={() => returnapi()}
            style={{
              backgroundColor: Colors.gray,
              width: metrics.WIDTH * 0.2,
              height: metrics.HEIGHT * 0.05,
              marginTop: '5%',
              borderRadius: 10,
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginRight: '5%',
              // position: 'absolute'
            }}>
            <Text
              style={{color: Colors.white, fontSize: 16, textAlign: 'center'}}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Drawercomponet;
