import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import Colors from '../Utils/Colors';
import metrics from '../Utils/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from 'react-native-reanimated';
import fonts from '../Utils/Fonts';
import {NavigationActions} from '@react-navigation/compat';

const DrewerScreen = ({navigation}) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('role').then(value => {
      if (value) {
        setRole(JSON.parse(value));
        console.log('role=======>', value);
      }
    });
  }, []);

  const logout = () => {
    AsyncStorage.removeItem('islogin');
    AsyncStorage.removeItem('role');
    AsyncStorage.removeItem('token');
    // AsyncStorage.clear();
    navigation.reset({routes: [{name: 'LoginScreen'}]});
  };

  const navigateToScreen = (rout, index) => () => {
    const navigationAction = NavigationActions.navigate({
      routeName: rout,
    });
    navigation.closeDrawer();
    // navigation.dispatch(DrawerActions.closeDrawer());
    navigation.dispatch(navigationAction);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingTop: '5%'}}>
        <Image
          source={require('../../assets/avatar.jpeg')}
          style={{
            height: metrics.HEIGHT * 0.13,
            alignSelf: 'center',
            width: metrics.WIDTH * 0.25,
            // backgroundColor: 'red',
            borderWidth: 2,
            borderColor: Colors.gray,
            borderRadius: 100,
          }}></Image>
      </View>
      <View style={{justifyContent: 'center', paddingTop: '5%'}}>
        <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
          DRS
        </Text>
      </View>
      <View
        style={{height: 1, backgroundColor: Colors.gray, marginTop: '5%'}}
      />
      <TouchableOpacity
        onPress={navigateToScreen('Product')}
        style={{
          flexDirection: 'row',
          marginTop: '10%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>Home</Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
        }}
      />
      <TouchableOpacity
        onPress={navigateToScreen('profilescreen')}
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>Profile</Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
        }}
      />
      <TouchableOpacity
        onPress={navigateToScreen('Product')}
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          Place Order
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
        }}
      />
      <TouchableOpacity
        onPress={navigateToScreen('orderdetails')}
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          Order Details
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
        }}
      />
      {/* <TouchableOpacity
        onPress={navigateToScreen("placeB2b")}
        style={{
          flexDirection: "row",
          marginTop: "5%",
          marginHorizontal: "5%",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: Colors.black, fontWeight: "bold" }}>
          Place B2B
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity> */}
      {/* <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: "3%",
          marginHorizontal: "3%",
        }}
      />
      <TouchableOpacity
        onPress={navigateToScreen("B2bdetails")}
        style={{
          flexDirection: "row",
          marginTop: "5%",
          marginHorizontal: "5%",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: Colors.black, fontWeight: "bold" }}>
          B2B Details
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: "3%",
          marginHorizontal: "3%",
          // marginBottom: '20%',
        }}
      /> */}
      <TouchableOpacity
        onPress={navigateToScreen('Accessories')}
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          Accessories
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>

      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
          // marginBottom: '20%',
        }}
      />
      <TouchableOpacity
        onPress={navigateToScreen('RawMaterial')}
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          RawMaterial
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
          // marginBottom: '20%',
        }}
      />

      <TouchableOpacity
        onPress={navigateToScreen('Accessoriestwo')}
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          AccessoriesTwo
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
          // marginBottom: '20%',
        }}
      />

      <TouchableOpacity
        onPress={navigateToScreen('Accessoriesthree')}
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          AccessoriesThree
        </Text>
        <AntDesign name="rightcircle" size={20} color={Colors.gray} />
      </TouchableOpacity>

      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: '3%',
          marginHorizontal: '3%',
          // marginBottom: '20%',
        }}
      />

      <TouchableOpacity
        onPress={() => logout()}
        style={{
          backgroundColor: Colors.gray,
          flexDirection: 'row',
          alignItems: 'center',
          height: metrics.HEIGHT * 0.06,
          position: 'absolute',
          bottom: '0%',
          right: '0%',
          left: '0%',
        }}>
        <AntDesign
          name="logout"
          size={25}
          color={Colors.white}
          style={{marginHorizontal: '3%'}}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: fonts.FontsSize.h6,
            fontWeight: 'bold',
            color: Colors.white,
            marginLeft: '25%',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrewerScreen;
