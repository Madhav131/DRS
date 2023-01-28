import React, {useEffect, useState} from 'react';
import {Text, View, Image, AsyncStorage} from 'react-native';
import Colors from '../Utils/Colors';
import metrics from '../Utils/Metrics';

const Splash = (props, {params}) => {
  const [isLogin, setLogin] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('islogin').then(value => {
      if (value) {
        setLogin(JSON.parse(value));
        console.log('isLogin=======>', value);
      }
    });
    AsyncStorage.getItem('role').then(value => {
      if (value) {
        setRole(JSON.parse(value));
        console.log('role=======>', value);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isLogin === true) {
        if (
          role === 1 ||
          role === 2 ||
          role === 4 ||
          role === '1' ||
          role === '2' ||
          role === '4'
        )
          props.navigation.replace('AdminDashboard');
        else props.navigation.replace('Product');
      } else {
        props.navigation.replace('LoginScreen');
      }
    }, 1000);
  }, [role]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/DEEPAK_LOGO-1.png')}
        style={{
          height: metrics.HEIGHT * 0.3,
          width: metrics.WIDTH * 0.6,
          marginLeft: '1%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
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
  );
};
export default Splash;
