import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
  AsyncStorage,
  TextInput,
} from "react-native";
import DrewerScreen from "./drewerscreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../Utils/Colors";
import { useThemeContext } from "../Context/them_context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useproductContext } from "../Context/product_context";
import { useCartContext } from "../Context/cart_context";
import axios from "axios";
import metrics from "../Utils/Metrics";

const Drawer = createDrawerNavigator();

const Drawercomponet = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrewerScreen {...props} />}>
      <Drawer.Screen name="Drawer" component={profilescreen} />
    </Drawer.Navigator>
  );
};

const profilescreen = (props) => {
  useEffect(async () => {
    var Token = await AsyncStorage.getItem("token");
    console.log("token=======>", Token);
    axios
      .get("https://theapplified.com/drs//api/v1/user", {
        headers: {
          Accept: "application/x.drs.v1+json",
          Authorization: "Bearer " + JSON.parse(Token),
        },
      })
      // .then((data) => setData(data))
      .then((res) => {
        console.log("vishal");
        console.log("sname", res.data);
        console.log("id", res.data.user.shop.name);
        // AsyncStorage.setItem("id", JSON.stringify(res.data.data.id));
        Setdata(res.data.user.name);
        Setshop(res.data.user.shop.name);
        Setemail(res.data.user.email);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [data, Setdata] = useState();
  const [emails, Setemail] = useState();
  const [shop, Setshop] = useState();
  const { setTheme, colors, theme } = useThemeContext();
  const { addToCart, cart, increment_qty, descrease_qty, qty } =
    useCartContext();
  const [modelVisible, setModel] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.gray}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={{
          height: 60,
          backgroundColor: Colors.gray,
          padding: "4%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: "5%", alignSelf: "center" }}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <Ionicons name="md-menu-sharp" size={30} color={Colors.white} />
          </TouchableOpacity>
          <Text style={{ color: Colors.white, fontSize: 18, marginLeft: "5%" }}>
            Profile
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", marginRight: "10%" }}
            onPress={() => props.navigation.navigate("Cart")}
          >
            <MaterialCommunityIcons
              name="cart"
              size={32}
              color={Colors.black}
            />
            <View
              style={{
                height: 19,
                width: 19,
                backgroundColor: "red",
                borderRadius: 50,
                position: "absolute",
                right: -5,
                top: -10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 13 }}>{qty}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: metrics.HEIGHT * 0.8,
          width: metrics.WIDTH * 0.9,
          backgroundColor: Colors.white,
          elevation: 10,
          marginHorizontal: "5%",
          borderRadius: 10,
          marginTop: "5%",
        }}
      >
        <View
          style={{
            width: "90%",
            marginTop: "10%",
            // backgroundColor: "red",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ color: Colors.black, marginLeft: "5%", fontSize: 15 }}>
            Name :
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            marginHorizontal: "5%",
            marginTop: "5%",
            backgroundColor: "#adb5bd",
            borderRadius: 10,
            elevation: 10,
            flexDirection: "row",
          }}
        >
          <View style={{ width: "80%" }}>
            <TextInput
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: "600",
                marginLeft: "5%",
              }}
              // keyboardType="ema"
              value={data}
              editable={false}
              // onChangeText={(Setdata) => data(Setdata)}
              placeholder="vishal"
              placeholderTextColor={Colors.white}
            />
          </View>
        </View>
        <View
          style={{
            width: "90%",
            marginTop: "10%",
            // backgroundColor: "red",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ color: Colors.black, marginLeft: "5%", fontSize: 15 }}>
            Email :
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            marginHorizontal: "5%",
            marginTop: "5%",
            backgroundColor: "#adb5bd",
            borderRadius: 10,
            elevation: 10,
            flexDirection: "row",
          }}
        >
          <View style={{ width: "90%" }}>
            <TextInput
              style={{
                color: Colors.black,
                fontSize: 16,
                fontWeight: "600",
                marginLeft: "5%",
              }}
              // keyboardType="ema"
              value={emails}
              editable={false}
              // onChangeText={(getemail) => setemail(getemail)}
              placeholder="Vishal@email.com"
              placeholderTextColor={Colors.white}
            />
          </View>
        </View>
        <View
          style={{
            width: "90%",
            marginTop: "10%",
            // backgroundColor: "red",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ color: Colors.black, marginLeft: "5%", fontSize: 15 }}>
            Shop Name :
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            marginHorizontal: "5%",
            marginTop: "5%",
            height: metrics.HEIGHT * 0.07,
            backgroundColor: "#adb5bd",
            borderRadius: 10,
            justifyContent: "center",
            elevation: 10,
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontWeight: "500",
              marginLeft: "5%",
              fontSize: 15,
            }}
          >
            {shop}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Drawercomponet;
