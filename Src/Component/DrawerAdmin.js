import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Colors from '../Utils/Colors';
import metrics from '../Utils/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationActions} from '@react-navigation/compat';

const DrawerAdmin = (props, {navigation}) => {
  const [get_role, Set_role] = useState();
  const navigateToScreen = (rout, param) => () => {
    const navigationAction = NavigationActions.navigate({
      routeName: rout,
      params: param,
    });
    props.navigation.closeDrawer();
    // navigation.dispatch(DrawerActions.closeDrawer());
    props.navigation.dispatch(navigationAction);
  };

  useEffect(() => {
    AsyncStorage.getItem('role').then(value => {
      if (value) {
        Set_role(JSON.parse(value));
        console.log('role=======>', value);
      }
    });
  }, [props]);

  const onLogout = async () => {
    AsyncStorage.clear();
    props.navigation.reset({routes: [{name: 'LoginScreen'}]});
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: metrics.HEIGHT * 0.22,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 0.7,
          borderBottomColor: Colors.gray,
        }}>
        <Image
          source={require('../../assets/avatar.jpeg')}
          style={{
            height: 75,
            width: 75,
            borderRadius: 100,
            borderColor: Colors.textLight,
            borderWidth: 1,
          }}
        />
        <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
          DRS Admin
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.White,
          height: metrics.HEIGHT * 0.72,
        }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={navigateToScreen('AdminDashboard_dw')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
              borderBottomWidth: 0.7,
              borderBottomColor: Colors.gray,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Home
            </Text>
            <AntDesign name="rightcircle" size={20} color={Colors.black} />
          </TouchableOpacity>
          {/* {get_role === 4 ? (
            <>
              <TouchableOpacity
                onPress={navigateToScreen("Homescreen")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "5%",
                  borderBottomWidth: 0.7,
                  borderBottomColor: Colors.gray,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  sell
                </Text>
                <AntDesign name="rightcircle" size={20} color={Colors.black} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToScreen("Accessories")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "5%",
                  borderBottomWidth: 0.7,
                  borderBottomColor: Colors.gray,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Accessories
                </Text>
                <AntDesign name="rightcircle" size={20} color={Colors.black} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToScreen("RawMaterial")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "5%",
                  borderBottomWidth: 0.7,
                  borderBottomColor: Colors.gray,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  RawMaterial
                </Text>
                <AntDesign name="rightcircle" size={20} color={Colors.black} />
              </TouchableOpacity>
            </>
          ) : null} */}
          <TouchableOpacity
            onPress={navigateToScreen('Inventory')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
              borderBottomWidth: 0.7,
              borderBottomColor: Colors.gray,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Inventory
            </Text>
            <AntDesign name="rightcircle" size={20} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToScreen('placeB2b_dw')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
              borderBottomWidth: 0.7,
              borderBottomColor: Colors.gray,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Place B2B
            </Text>
            <AntDesign name="rightcircle" size={20} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToScreen('B2bdetails_dw')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
              borderBottomWidth: 0.7,
              borderBottomColor: Colors.gray,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              B2B Details
            </Text>
            <AntDesign name="rightcircle" size={20} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToScreen('OrderDetils')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
              borderBottomWidth: 0.7,
              borderBottomColor: Colors.gray,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Order Details
            </Text>
            <AntDesign name="rightcircle" size={20} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onLogout()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
              borderBottomWidth: 0.7,
              borderBottomColor: Colors.gray,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Logout
            </Text>
            <AntDesign name="rightcircle" size={20} color={Colors.black} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default DrawerAdmin;
