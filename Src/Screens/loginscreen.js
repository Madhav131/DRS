import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';
import Colors from '../Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';
import metrics from '../Utils/Metrics';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';

const LoginScreen = props => {
  const busref = useRef();
  const [password, setpassword] = useState();
  const [visible, setvisible] = useState(false);
  const [getemail, setemail] = useState();
  const [FcmToken, setFcmToken] = useState();
  const [getpass, setpass] = useState();

  // useEffect(async () => {
  //   await messaging().deleteToken();
  //   await checkPermission();
  //   await chaeckdevice();
  // }, []);

  // useEffect(() => {
  //   requestCameraPermission();
  // }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      requestCameraPermission();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,

                {
                  title: 'Cool Photo App Camera Permission',
                  message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                try {
                  const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,

                    {
                      title: 'Cool Photo App Camera Permission',
                      message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                      buttonNeutral: 'Ask Me Later',
                      buttonNegative: 'Cancel',
                      buttonPositive: 'OK',
                    },
                  );
                  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('nearbyshare permission asscess');
                  } else {
                    console.log('nearbyshare permission denied');
                  }
                } catch (err) {
                  console.warn(err);
                }
              } else {
                console.log('microphone permission denied');
              }
            } catch (err) {
              console.warn(err);
            }
          } else {
            console.log('loaction permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const checkPermission = async () => {
  //   // console.log('vishal');
  //   var enabled = await messaging().hasPermission();
  //   // console.log('xyz', enabled);
  //   if (enabled) {
  //     // console.log('Token');
  //     getFcmToken();
  //   } else {
  //     requestUserPermission();
  //   }
  // };

  // const getFcmToken = async () => {
  //   // console.log('method');
  //   var FcmToken = await messaging().getToken();
  //   console.log("fcm Tkon", FcmToken);
  //   if (FcmToken) {
  //     setFcmToken(FcmToken);
  //     console.log("fcm Tkon", FcmToken);
  //   } else {
  //     console.log("Failed", "No Token Received");
  //   }
  // };
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorzation status", authStatus);
  //   }
  // };

  // const chaeckdevice = async () => {
  //   const device_id = DeviceInfo.getDeviceId();
  //   setdevice_id(device_id);
  //   console.log("device_id ----------->", device_id);
  // };

  const apicalling = () => {
    if (getemail == null || getpass == '') {
      Toast.show('Please Enter Email');
    } else if (getpass == null || getpass == '') {
      Toast.show('Please Enter The password');
    } else {
      const formdata = new FormData();
      formdata.append('email', getemail);
      formdata.append('password', getpass);
      // formdata.append("role", 3);
      console.log('foramdata======', formdata);
      axios
        .post(BASE_URL + 'loginUser', formdata, {
          headers: {Accept: ACCEPT_HEADER},
        })
        .then(async res => {
          console.log('res enquire (: ', res.data);
          if (res.data.success === 1) {
            // Toast.show("Login Successfully");
            console.log(
              'name',
              JSON.stringify(res.data.data.data.name, null, 2),
            );
            await AsyncStorage.setItem('islogin', JSON.stringify(true));
            await AsyncStorage.setItem(
              'token',
              JSON.stringify(res.data.data.token),
            );
            await AsyncStorage.setItem(
              'role',
              JSON.stringify(res.data.data.data.role),
            );
            await AsyncStorage.setItem(
              'name',
              JSON.stringify(res.data.data.data.name),
            );
            if (
              res.data.data.data.role === 2 ||
              res.data.data.data.role === 1 ||
              res.data.data.data.role === 4
            )
              await props.navigation.replace('AdminDashboard');
            else await props.navigation.navigate('Product');
          } else {
            Toast.show(res.data.error);
            // props.navigation.navigate("loginScreen");
          }
        })

        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              height: metrics.HEIGHT * 0.2,
              marginTop: '25%',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/DEEPAK_LOGO-1.png')}
              style={{
                height: metrics.HEIGHT * 0.3,
                width: metrics.WIDTH * 0.6,
                marginLeft: '1%',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              resizeMode="stretch"
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 22,
                color: Colors.black,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '10%',
              }}>
              Deepak ReadyMade Store
            </Text>
          </View>
          <View
            style={{
              width: '65%',
              marginHorizontal: '17%',
              marginTop: '10%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              elevation: 10,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.light,
            }}>
            <View style={{width: '80%'}}>
              <TextInput
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: '5%',
                }}
                keyboardType="email-address"
                value={getemail}
                returnKeyType="next"
                onChangeText={getemail => setemail(getemail)}
                placeholder="Email"
                placeholderTextColor={Colors.gray}
                onSubmitEditing={() => {
                  busref.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View
            style={{
              width: '65%',
              marginHorizontal: '17%',
              marginTop: '5%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              elevation: 10,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.light,
            }}>
            <View style={{width: '80%'}}>
              <TextInput
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: '5%',
                }}
                secureTextEntry={visible == true ? true : false}
                placeholder="Password"
                placeholderTextColor={Colors.gray}
                keyboardType="default"
                value={getpass}
                ref={busref}
                onChangeText={getpass => setpass(getpass)}
              />
            </View>
            <View style={{justifyContent: 'center', width: '20%'}}>
              <Entypo
                style={{alignSelf: 'center'}}
                size={25}
                name={visible == true ? 'eye-with-line' : 'eye'}
                onPress={() => {
                  setvisible(!visible);
                }}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => apicalling()}>
            <View
              style={{
                marginTop: '10%',
                height: '25%',
                backgroundColor: '#495057',
                marginHorizontal: '15%',
                borderRadius: 10,
                width: '70%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: '800',
                }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
