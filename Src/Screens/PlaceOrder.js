import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  AsyncStorage,
} from 'react-native';
import metrics from '../Utils/Metrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Utils/Colors';
import Toast from 'react-native-simple-toast';
import {useCartContext} from '../Context/cart_context';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'tp-react-native-bluetooth-printer';
import RNModal from 'react-native-modal';
import {round} from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import axios from 'axios';

const PlaceOrder = (props, {params}) => {
  const [getname, setname] = useState('');
  const [getbill, SetBill] = useState('');
  const [getamount, SetAmount] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('name').then(value => {
      if (value) {
        setname(JSON.parse(value));
      }
    });
    SetDiv_Ver(DeviceInfo.getVersion());
  });

  const {
    total,
    PlaceOrder,
    cart,
    acce_cart,

    qty,
    raw_cart,
    scgst,
    AssTwo_cart,
    AccThree_cart,
    Orderdone,
  } = useCartContext();
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setloading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [getaddress, setaddress] = useState('');
  const [getdeta, setdata] = useState([]);
  const [getcondation, SetCondation] = useState(false);
  const [div_ver, SetDiv_Ver] = useState('');
  const [getin_number, SetIN_Number] = useState();
  const [is_loading, set_Loading] = useState(false);
  const onSubmit = async () => {
    if (number === '') {
      Toast.show('Please enter number');
      return;
    }
    const formData = new FormData();
    formData.append('number', number);
    formData.append('name', String(getname));
    // formData.append("address", address)
    for (var i = 0; i < cart.length; i++) {
      formData.append('product_id[' + i + ']', cart[i].user_id);
      formData.append('size_id[' + i + ']', cart[i].size_ids);
      formData.append('gender_id[' + i + ']', cart[i].gender_ids);
      formData.append('qty[' + i + ']', cart[i].qty);
    }
    for (var i = 0; i < acce_cart.length; i++) {
      formData.append('other_name[' + i + ']', acce_cart[i].name);
      formData.append('other_price[' + i + ']', acce_cart[i].user_price);
      formData.append('other_qty[' + i + ']', acce_cart[i].qty);
    }
    for (var i = 0; i < raw_cart.length; i++) {
      formData.append('soraw_name[' + i + ']', raw_cart[i].name);
      formData.append('soraw_price[' + i + ']', raw_cart[i].user_price);
      formData.append('soraw_qty[' + i + ']', raw_cart[i].user_qty);
    }
    for (var i = 0; i < AssTwo_cart.length; i++) {
      formData.append('other_name_two[' + i + ']', AssTwo_cart[i].name);
      formData.append('other_price_two[' + i + ']', AssTwo_cart[i].user_price);
      formData.append('other_qty_two[' + i + ']', AssTwo_cart[i].user_qty);
    }
    for (var i = 0; i < AccThree_cart.length; i++) {
      formData.append('other_name_three[' + i + ']', AccThree_cart[i].name);
      formData.append(
        'other_price_three[' + i + ']',
        AccThree_cart[i].user_price,
      );
      formData.append('other_qty_three[' + i + ']', AccThree_cart[i].user_qty);
    }
    var token = await AsyncStorage.getItem('token');
    console.log('fromdata-->>', formData);
    // PlaceOrder(formData, props);

    axios
      .post(BASE_URL + 'newplaceOrder', formData, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(async res => {
        if (res.data.success === 1) {
          console.log('repons_id', res.data.order.id);

          props.navigation.navigate('Product');
          Toast.show(res.data.message);
          Orderdone();
          printbill(res.data.order.id);
          set_Loading(false);
        } else {
          Toast.show(res.data.error);
        }
      })
      .catch(err => {
        Toast.show('Inventory not found');
      });
  };

  const methodcall = () => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        if (enabled == true) {
          bluetoothon();
          bluetoothlist();
          if (getaddress === '') {
            setModalVisible(true);
            set_Loading(true);
          }
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
              paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
            } catch (e) {
              console.log('errrr-->1', e);
              //ignore
            }
          }
        }
        console.log('bluetooth on-------', JSON.stringify(paired));
        // bluetoothconnect(paired.address);
        setdata(paired);
        // AsyncStorage.setItem(paired.address);
      },
      err => {
        alert(err);
      },
    );
  };

  const printbill = async id => {
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.setBlob(0);

    await BluetoothEscposPrinter.printText('DEEPAK READYMADE HOUSE\r\n\n', {
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
      'Phone: (0281) -  2223318 2570596\r\n',
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
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText(`${new Date()}\r\n`, {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });

    await BluetoothEscposPrinter.printText(' \n\r', {});
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT,
    );
    await BluetoothEscposPrinter.printText(
      `Invoice Number: ${id}  Customer Number:${number}\r\n`,
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 6,
      },
    );
    await BluetoothEscposPrinter.printText(
      '------------------------------------------------\n\r',
      {},
    );

    let columnWidths = [12, 6, 6, 8, 8, 8];
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['ITEM', 'SIZE', 'QTY', 'SGST', 'CGST', 'TOTAL'],
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 6,
      },
    );
    await BluetoothEscposPrinter.printText('\n', {});
    for (var i = 0; i < cart.length; i++) {
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],

        [
          `${cart[i].getSname}`,
          `${''}`,
          `${''}`,
          `${cart[i].gst / 2}%`,
          `${cart[i].gst / 2}%`,
          `${''}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        [
          `${cart[i].user_name}`,
          `${cart[i].size_name}`,
          `${cart[i].qty}`,
          `${(
            (cart[i].user_Total -
              cart[i].user_Total * (100 / (100 + cart[i].gst))) /
            2
          ).toFixed(2)}`,
          `${(
            (cart[i].user_Total -
              cart[i].user_Total * (100 / (100 + cart[i].gst))) /
            2
          ).toFixed(2)}`,
          `${cart[i].qty * cart[i].user_Total}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }

    for (var i = 0; i < acce_cart.length; i++) {
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],

        [
          `${''}`,
          `${''}`,
          `${''}`,
          `${acce_cart[i].gst / 2}%`,
          `${acce_cart[i].gst / 2}%`,
          `${''}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],

        //  `${(
        //     (cart[i].user_Total -
        //       cart[i].user_Total * (100 / (100 + cart[i].gst))) /
        //     2
        //   ).toFixed(2)}`,
        [
          `${acce_cart[i].name}`,
          `${''}`,
          `${acce_cart[i].qty}`,
          `${(
            (acce_cart[i].user_price -
              (acce_cart[i].user_price * 100) / (100 + acce_cart[i].gst)) /
            2
          ).toFixed(2)}`,
          `${(
            (acce_cart[i].user_price -
              (acce_cart[i].user_price * 100) / (100 + acce_cart[i].gst)) /
            2
          ).toFixed(2)}`,
          `${acce_cart[i].user_price}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }

    for (var i = 0; i < raw_cart.length; i++) {
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],

        [
          `${raw_cart[i].name}`,
          `${''}`,
          `${raw_cart[i].user_qty}`,
          `${'0'}%`,
          `${'0'}%`,
          `${raw_cart[i].user_qty * raw_cart[i].user_price}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }

    for (var i = 0; i < AssTwo_cart.length; i++) {
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],

        [
          `${''}`,
          `${''}`,
          `${''}`,
          `${AssTwo_cart[i].gst / 2}%`,
          `${AssTwo_cart[i].gst / 2}%`,
          `${''}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        //  scgst: ((get_price - get_price * (100 / (100 + 18))) / 2).toFixed(2),
        [
          `${AssTwo_cart[i].name}`,
          `${''}`,
          `${AssTwo_cart[i].qty}`,
          `${(
            (AssTwo_cart[i].total_price -
              AssTwo_cart[i].total_price * (100 / (100 + AssTwo_cart[i].gst))) /
            2
          ).toFixed(2)}`,
          `${(
            (AssTwo_cart[i].total_price -
              AssTwo_cart[i].total_price * (100 / (100 + AssTwo_cart[i].gst))) /
            2
          ).toFixed(2)}`,
          `${AssTwo_cart[i].total_price}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }

    for (var i = 0; i < AccThree_cart.length; i++) {
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],

        [
          `${''}`,
          `${''}`,
          `${''}`,
          `${AccThree_cart[i].gst / 2}%`,
          `${AccThree_cart[i].gst / 2}%`,
          `${''}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        //  scgst: ((get_price - get_price * (100 / (100 + 18))) / 2).toFixed(2),
        [
          `${AccThree_cart[i].name}`,
          `${''}`,
          `${AccThree_cart[i].qty}`,
          `${(
            (AccThree_cart[i].total_price -
              AccThree_cart[i].total_price *
                (100 / (100 + AccThree_cart[i].gst))) /
            2
          ).toFixed(2)}`,
          `${(
            (AccThree_cart[i].total_price -
              AccThree_cart[i].total_price *
                (100 / (100 + AccThree_cart[i].gst))) /
            2
          ).toFixed(2)}`,
          `${AccThree_cart[i].total_price}`,
        ],
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 6,
        },
      );
      await BluetoothEscposPrinter.printText(
        '------------------------------------------------\n\r',
        {},
      );
    }
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      [`${'Total'}`, `${''}`, `${qty}`, `${scgst}`, `${scgst}`, `${total}`],
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 6,
      },
    );
    await BluetoothEscposPrinter.printText(
      '------------------------------------------------\n\r',
      {},
    );
    // let columnWidths1 = [12];
    // await BluetoothEscposPrinter.printColumn(
    //   columnWidths1,
    //   [BluetoothEscposPrinter.ALIGN],
    //   [`${total}`],
    //   {
    //     encoding: 'GBK',
    //     codepage: 0,
    //     fonttype: 2,
    //     widthtimes: 1,
    //     heigthtimes: 1,
    //   },
    // );
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText(`Total: ${total}\r\n\n`, {
      encoding: 'GBK',
      codepage: 0,
      fonttype: 2,
      widthtimes: 1,
      heigthtimes: 1,
    });

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText(
      'TIMING: Mon to Sat 9.30 AM to 8.30 PM\n\r(12.45 PM TO 3.30 PM Lunch break)\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(' \n\r', {});
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText(
      'For any feedback drop a mail to\n\rdrhu1963@gmail.com\n\r',
      {},
    );

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
    await BluetoothEscposPrinter.printText(`${getname} (${div_ver}) `, {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 2,
    });
    await BluetoothEscposPrinter.printText(' \n\r', {});
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

  const bluetoothconnect = address => {
    console.log('address-=-=->', address);

    BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          console.log('successs :', s);

          onSubmit();
          // setTimeout(() => {
          //   printbill();
          //   setloading(false);
          // }, 6000);
        },
        e => {
          console.log('er : ', e);
          set_Loading(false);
          Toast.show('Not Connect Bluetooth...!!');
          // setloading(false);
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
          Place Order
        </Text>
      </View>

      <View style={{padding: '5%'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              borderWidth: 0.7,
              borderColor: Colors.gray,
              borderRadius: 5,
            }}>
            <TextInput
              placeholder="Mobile Number"
              keyboardType="numeric"
              maxLength={10}
              placeholderTextColor={Colors.gray}
              style={{fontSize: 18, color: Colors.black}}
              onChangeText={val => setNumber(val)}
            />
          </View>
          {/* <View
            style={{
              borderWidth: 0.7,
              borderColor: Colors.gray,
              borderRadius: 5,
              marginTop: "5%",
            }}
          >
            <TextInput
              placeholder="Address"
              style={{ fontSize: 18 }}
              onChangeText={(val) => setAddress(val)}
            />
          </View> */}
          <View
            style={{
              borderWidth: 0.7,
              borderColor: Colors.gray,
              borderRadius: 5,
              marginTop: '5%',
              padding: '5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.black, fontSize: 18}}>Qty </Text>
              <Text style={{color: Colors.black, fontSize: 18}}>{qty}</Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.7,
              borderColor: Colors.gray,
              borderRadius: 5,
              marginTop: '5%',
              padding: '5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.black, fontSize: 18}}>Total </Text>
              <Text style={{color: Colors.black, fontSize: 18}}>₹{total}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: '45%',
              backgroundColor: 'orange',
              marginTop: '10%',
              alignSelf: 'center',
              height: 42,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={() => {
            //   number === '' ? Toast.show('Please enter number') : methodcall();
            // }}
            onPress={() => {
              methodcall();
            }}>
            {is_loading ? (
              <ActivityIndicator size={'small'} color={Colors.white} />
            ) : (
              <Text style={{color: Colors.white}}>Print</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <RNModal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            height: '90%',
            marginHorizontal: '5%',
            backgroundColor: Colors.white,
            borderRadius: 5,
          }}>
          <FlatList
            data={getdeta}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginTop: '5%',
                    marginHorizontal: '5%',

                    borderBottomColor: Colors.black,
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setaddress(`${item.address}`);
                      setModalVisible(false);
                      bluetoothconnect(`${item.address}`);
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '500',
                        marginBottom: '2%',
                        color: Colors.black,
                      }}>
                      {`${item.name}`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '500',
                        marginBottom: '2%',
                        color: Colors.black,
                      }}>
                      {`${item.address}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </RNModal>
    </View>
  );
};
export default PlaceOrder;
