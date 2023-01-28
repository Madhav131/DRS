import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  FlatList,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Linking,
} from "react-native";
import moment from "moment";
import DrewerScreen from "./drewerscreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../Utils/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useThemeContext } from "../Context/them_context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useproductContext } from "../Context/product_context";
import { useCartContext } from "../Context/cart_context";
import Fonts from "../Utils/Fonts";
import metrics from "../Utils/Metrics";
import { ScrollView } from "react-native-gesture-handler";
import { ACCEPT_HEADER, BASE_URL } from "../Utils/const";

const stsuts = [
  { id: 1, title: "Details" },
  {
    id: 2,
    title: "Other Details",
  },
];


const B2bdetails = (props) => {
  const [data, setData] = useState([]);
  const { setTheme, colors, theme } = useThemeContext();
  const { addToCart, cart, increment_qty, descrease_qty, qty } =
    useCartContext();
  const [modelVisible, setModel] = useState("");
  const [isModalVisible3, setModalVisible3] = useState("");
  // const [data, setData] = useState();
  const [task_arrayholder, setBranchArray] = useState([]);
  const [child, setchild] = useState();
  const [getreqid, setreqid] = useState();
  const [getids, setids] = useState();
  const [getotherdata, setotherdara] = useState();
  const [isloading, setloading] = useState(false);
  const [get_hettp, Set_hettp] = useState();
  const searchFilter_branch = (text) => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : "".toUpperCase();

      // const name = item.employees.name
      //   ? item.employees.name.toUpperCase()
      //   : "".toUpperCase();

      const itemData = item.number
        ? item.number.toUpperCase()
        : "".toUpperCase();
      const itememail = item.qty ? item.qty.toUpperCase() : "".toUpperCase();
      const vishal = item.amount ? item.amount.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return (
        itememail.indexOf(textData) > -1 ||
        itemData.indexOf(textData) > -1 ||
        employee.indexOf(textData) > -1 ||
        vishal.indexOf(textData) > -1
        // ||

        // name.indexOf(textData) > -1
      );
      //   return itemData.startsWith(textData) || data.startsWith(textData);
    });

    setData(newData);
  };

  useEffect(async () => {
    setloading(true);
    var Token = await AsyncStorage.getItem("token");
    console.log("token=======>", Token);
    axios
      .get(BASE_URL + "B2BOrderDetail", {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + JSON.parse(Token),
        },
      })
      .then((res) => {
        console.log("vishal");
        console.log("sname", res.data);
        if (res.data.length > 0)
          setotherdara(res.data.data[0].otherData);
        setData(res.data.data);
        setBranchArray(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log("err :", err);
        setloading(false);
      });
  }, []);

  const GetInvoice = async (id) => {
    var Token = await AsyncStorage.getItem("token");
    console.log("token=======>", Token);
    console.log("id=======>", id);
    axios
      .get(BASE_URL + "B2BInvoice/" + id, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + JSON.parse(Token),
        },
      })
      .then((res) => {
        console.log("res--->", res.data)
        Linking.openURL(res.data.data)

      })
      .catch((err) => {
        console.log("err :", err);

      });

  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={{ padding: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.light }} >
        <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Ionicons name="md-menu-sharp" size={30} color={Colors.black} />
        </TouchableOpacity>
        <Text style={{ color: Colors.black, fontSize: 18, marginLeft: '5%' }} >
          B2B Details</Text>
      </View>

      <View
        style={{
          height: metrics.HEIGHT * 0.06,
          backgroundColor: Colors.white,
          elevation: 5,
          width: "95%",
          alignSelf: "center",
          borderRadius: 50,
          marginTop: "5%",
          marginBottom: "2%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="search"
          size={20}
          color={Colors.black}
          style={{ marginLeft: "4%" }}
        />
        <TextInput
          placeholder="search..."
          placeholderTextColor={Colors.black}
          style={{
            width: "82%",
            marginLeft: "2%",
            fontFamily: Fonts.FontsType.Montserrat_Regular,
            fontSize: Fonts.FontsSize.small13,
            color: Colors.black,
          }}
          onChangeText={(value) => searchFilter_branch(value)}
        />
      </View>
      {isloading == true ? (
        <View
          style={{ justifyContent: "center", flex: 1, alignSelf: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            // keyExtractor={(item) => item}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  color={Colors.black}
                  onPress={() => {
                    setModalVisible3(true);
                    setchild(item.edit_clone);
                  }}
                  style={{
                    padding: "3%",
                    elevation: 5,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    marginTop: "3%",
                    marginBottom: "1%",
                    flexDirection: "row",
                    height: metrics.HEIGHT * 0.27,
                    alignItems: "flex-start",
                    width: metrics.WIDTH * 0.96,
                    alignSelf: "center",
                  }}
                >
                  <View style={{}}>
                    {/* {item.employee !== null ? ( */}
                    <View
                      style={{
                        flexDirection: "row",
                        // backgroundColor: "red",
                        width: metrics.WIDTH * 0.9,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesome5
                          name="home"
                          size={20}
                          style={{
                            marginHorizontal: "5%",
                            color: "#1864ab",
                          }}
                        />
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: "500",
                            marginLeft: "4%",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          // marginLeft: "10%",
                        }}
                      >
                        <FontAwesome
                          name="phone"
                          size={20}
                          style={{
                            marginHorizontal: "5%",
                            color: "#1864ab",
                          }}
                        />
                        <Text
                          style={{ color: Colors.black, fontWeight: "500" }}
                        >
                          {item.number}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: "3%",
                        marginHorizontal: "3%",
                        width: metrics.WIDTH * 0.83,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          height: 2,
                          backgroundColor: colors.themeColor,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: "7%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <View
                        style={{
                          height: metrics.HEIGHT * 0.1,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 10,
                          padding: "2%",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.white,
                            marginLeft: "4%",
                            fontSize: 10,
                          }}
                        >
                          Total
                        </Text>
                        <Text
                          style={{
                            color: Colors.white,
                            textAlign: "center",
                            fontSize: 25,
                            fontWeight: "bold",
                          }}
                        >
                          {item.total_amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: metrics.HEIGHT * 0.1,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 10,
                          padding: "2%",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.white,
                            marginLeft: "4%",
                            fontSize: 10,
                          }}
                        >
                          Total Qty
                        </Text>
                        <Text
                          style={{
                            color: Colors.white,
                            textAlign: "center",
                            fontSize: 25,
                            marginTop: "8%",
                            fontWeight: "bold",
                          }}
                        >
                          {item.total_qty}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: metrics.HEIGHT * 0.1,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 10,
                          padding: "2%",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.white,
                            marginLeft: "4%",
                            fontSize: 10,
                          }}
                        >
                          Status
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            textAlign: "center",
                            fontSize: 16,
                            marginTop: "3%",
                            fontWeight: "bold",
                          }}
                        >
                          {item.status == 0 ? (
                            <View style={{}}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: Colors.white,
                                  fontWeight: "700",
                                }}
                              >
                                Pending
                              </Text>
                            </View>
                          ) : (
                            <Text
                              style={{
                                fontSize: 16,
                                color: Colors.white,
                                fontWeight: "700",
                              }}
                            >
                              Accepted
                            </Text>
                          )}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: "5%", }}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: "500",
                          marginLeft: "4%",
                        }}
                      >
                        Date:
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: "500",
                          marginLeft: "2%",
                        }}
                      >
                        {moment(item.created_at).format("DD-MM-YYYY")}
                      </Text>

                      <TouchableOpacity
                        // Linking.openURL("http://143.110.188.148/drs/b2b/109-DRS.pdf")
                        onPress={() => GetInvoice(item.id)}
                        style={{

                          height: metrics.HEIGHT * 0.05,
                          width: metrics.WIDTH * 0.25,
                          backgroundColor: Colors.gray,
                          borderRadius: 5,
                          marginLeft: metrics.HEIGHT * 0.15,
                          justifyContent: 'center'

                        }}>
                        <Text style={{ textAlign: 'center', color: Colors.white }}>
                          INVOICE
                        </Text>

                      </TouchableOpacity>

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
        onRequestClose={() => setModalVisible3(false)}
      >
        <View
          style={{
            // marginTop: "20%",
            // height: "70%",
            // marginHorizontal: "5%",
            backgroundColor: Colors.white,
            borderRadius: 5,
            flex: 1,
            elevation: 3,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible3(false)}
            style={{ padding: "5%" }}
          >
            <AntDesign name="closecircle" size={20} color={Colors.black} />
          </TouchableOpacity>
          <View
            style={{
              // marginTop: "5%",
              alignSelf: "center",
              borderBottomColor: Colors.black,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: Colors.black,
                fontSize: 18,
                fontFamily: Fonts.FontsType.PlayfairDisplay_Bold,
              }}
            >
              B2B Details
            </Text>
          </View>

          <View
            style={{
              marginTop: "5%",
              alignSelf: "center",
              borderBottomColor: Colors.black,
              // borderBottomWidth: 1,
              marginBottom: "5%",
              justifyContent: "space-around",
              width: "90%",
              // justifyContent:
              flexDirection: "row",
              borderColor: Colors.gray,
            }}
          ></View>
          <ScrollView>
            <View style={{}}>
              {child && child.length > 0
                ? child.map((item, index) => {
                  return (
                    <View
                      style={{
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginHorizontal: "5%",
                        marginBottom: "2%",
                        marginTop: "5%",
                      }}
                    >
                      {/* <View
                          style={{
                            width: "90%",
                            flexDirection: "row",
                            marginLeft: "10%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: Colors.gray,
                              fontWeight: "700",
                              width: "45%",
                            }}
                          >
                            Id :
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              // marginVertical: "7%",
                              color: Colors.black,
                              fontWeight: "700",
                              width: "40%",
                            }}
                          >
                            {item.b2b_id}
                          </Text>
                        </View> */}
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          marginLeft: "10%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "1%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          Name :
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "7%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "40%",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          marginLeft: "10%",
                          // marginTop: "7%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "2%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          Price :
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "8%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          {item.price}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          marginLeft: "10%",
                          // marginTop: "7%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "2%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          Qty :
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "8%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          {item.qty}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          marginLeft: "10%",
                          // marginTop: "3%",
                          // marginBottom: "5%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "2%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          Gst :
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "8%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          {item.gst}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          marginLeft: "10%",
                          // marginTop: "3%",
                          // marginBottom: "5%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "2%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          Gst Amount :
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "8%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          {item.gst_amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          marginLeft: "10%",
                          // marginTop: "3%",
                          // marginBottom: "5%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "2%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          Amount :
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "8%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          {item.amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          marginLeft: "10%",
                          // marginTop: "3%",
                          marginBottom: "5%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "2%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          Total :
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // marginVertical: "8%",
                            color: Colors.black,
                            fontWeight: "700",
                            width: "45%",
                          }}
                        >
                          {item.total}
                        </Text>
                      </View>

                    </View>
                  );
                })
                : null}
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* <Modal
        transparent
        visible={modelVisible}
        onRequestClose={() => setModel(false)}
      >
        <View
          style={{
            backgroundColor: colors.transparent,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              height: "30%",
              width: "90%",
              backgroundColor: colors.card,
              padding: "3%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, textAlign: "center", color: colors.text }}
            >
              Select Theme
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: "2%",
                justifyContent: "space-between",
                marginTop: "7%",
              }}
              onPress={() => {
                setTheme("dark");
                setModel(false);
              }}
            >
              <Text style={{ color: colors.text }}>Dark</Text>
              <MaterialCommunityIcons
                name={theme === "dark" ? "checkbox-marked" : "crop-square"}
                size={26}
                color={theme === "dark" ? colors.icon : "gray"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: "2%",
                justifyContent: "space-between",
              }}
              onPress={() => {
                setTheme("light");
                setModel(false);
              }}
            >
              <Text style={{ color: colors.text }}>Light</Text>
              <MaterialCommunityIcons
                name={theme === "light" ? "checkbox-marked" : "crop-square"}
                size={26}
                color={theme === "light" ? colors.icon : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default B2bdetails;
