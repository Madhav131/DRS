import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import DrewerScreen from "./drewerscreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../Utils/Colors";
import { useThemeContext } from "../Context/them_context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useproductContext } from "../Context/product_context";
import { useCartContext } from "../Context/cart_context";
import metrics from "../Utils/Metrics";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { add } from "react-native-reanimated";


const PlaceB2b = (props) => {
  const [getarray, setarray] = useState();
  const [data, Setdata] = useState();
  const { setTheme, colors, theme } = useThemeContext();
  const { addToCart, cart, increment_qty, descrease_qty, qty } = useCartContext();
  var [inputarray, setinputarray] = useState([]);
  var [inputarray1, setinputarray1] = useState([]);
  var [inputarray2, setinputarray2] = useState([]);
  const [names, setnames] = useState();
  const [numbers, setnumbers] = useState();
  const [addresses, setaddress] = useState();
  const [geIndex, setindex123] = useState();
  const [product_name, Setproduct_name] = useState();
  const [product_qty, SetProduct_qty] = useState();
  const [product_price, SetProduct_price] = useState();
  const [product_array, setproduct_array] = useState([]);
  const [ismodal, setmodal] = useState(false);
  const [getqty, setqty] = useState();
  const [gettotal, settotal] = useState();
  const [get_gst, Set_gst] = useState();
  const [obj_price, setobj_price] = useState();
  const [address2, setaddress2] = useState();
  const [address3, setaddress3] = useState();
  const [gstnumber, setgstnumber] = useState()
  const [pannumber, setpannumber] = useState();
  const [getemail, setemail] = useState();
  setChange = async (text, index, item) => {
    console.log("text ----->", text);
    console.log("index ----->", index);
    setindex123(index);

    var check_id_exist = inputarray.some((index) => index.index === index);
    var exist_index = inputarray.findIndex((index) => index.index === index);

    console.log("-===========", check_id_exist, exist_index);
    const temp = inputarray;

    if (check_id_exist) {
      temp[exist_index].text = text;
      inputarray = temp;
      // console.log("-"
    } else {
      inputarray.push({ index: index, text: text });
    }
    console.log("inputarray--->", inputarray);
  };

  setChange1 = async (number, index, item) => {
    console.log("number ----->", number);
    console.log("index ----->", index);
    // console.log("item1 ----->", item);

    var check_id_exist1 = inputarray1.some((index) => index.index === index);
    var exist_index1 = inputarray1.findIndex((index) => index.index === index);

    console.log("-===========", check_id_exist1, exist_index1);
    const temp1 = inputarray1;

    if (check_id_exist1) {
      temp1[exist_index1].number = number;
      inputarray1 = temp1;
      // console.log("-"
    } else {
      inputarray1.push({ index: index, number: number });
    }
    console.log("inputarray--->", inputarray1);
  };

  setChange2 = async (number, index, item) => {
    console.log("number ----->", number);
    console.log("index ----->", index);
    // console.log("item1 ----->", item);

    var check_id_exist2 = inputarray2.some((index) => index.index === index);
    var exist_index2 = inputarray2.findIndex((index) => index.index === index);

    console.log("-===========", check_id_exist2, exist_index2);
    const temp2 = inputarray2;

    if (check_id_exist2) {
      temp2[exist_index2].number = number;
      inputarray2 = temp2;
      // console.log("-"
    } else {
      inputarray2.push({ index: index, number: number });
    }
    console.log("inputarray--->", inputarray2);
  };

  const placeb2b_order = async () => {
    // console.log("")

    console.log("product_array---->", product_array);
    if (names == null || names == "") {
      Toast.show("Please Enter Name");
    } else if (numbers == null || numbers == "") {
      Toast.show("Plase Enter Number");
    } else if (product_array == null || product_array == "") {
      Toast.show("Please enter product");
    } else {
      var Token = await AsyncStorage.getItem("token");

      const formdata = new FormData();
      formdata.append("name", names);
      formdata.append("number", numbers);
      formdata.append("address", addresses);
      formdata.append("addres2", address2);
      formdata.append("addres3", address3);
      formdata.append("pan_no", pannumber);
      formdata.append("gstin", gstnumber);
      formdata.append("email", getemail);
      for (var i = 0; i < product_array.length; i++) {
        formdata.append("product_name[" + i + "]", product_array[i].pname);
      }
      for (var f = 0; f < product_array.length; f++) {
        formdata.append("product_price[" + f + "]", product_array[f].fff);
      }
      for (var c = 0; c < product_array.length; c++) {
        formdata.append("product_qty[" + c + "]", product_array[c].pqty);
      }
      for (var g = 0; g < product_array.length; g++) {
        formdata.append("gst[" + g + "]", product_array[g].pgst);
      }
      console.log("formdata---->", formdata);

      axios
        .post("https://theapplified.com/drs//api/v1/B2BPlaceOrder", formdata, {
          headers: {
            Accept: "application/x.drs.v1+json",
            Authorization: "Bearer " + JSON.parse(Token),
          },
        })
        .then((res) => {
          console.log("data=>", res.data);
          setaddress(false);
          Toast.show(res.data.message);
          props.navigation.navigate("B2bdetails_dw");
        });
    }
  };

  const addArray = async () => {
    if (product_name === null || product_name === "") {
      Toast.show("enter the name");
    } else if (product_qty == null || product_qty == "") {
      Toast.show("enter the qty");
    } else if (product_price == null || product_price == "") {
      Toast.show("enter the price");
    } else {
      const obj = {
        pname: product_name,
        pqty: product_qty,
        fff: product_price,
        pprice: product_price * product_qty,
        pgst: get_gst,
        pgstAmonut: product_price * product_qty * get_gst / 100,
        ptotal: product_price * product_qty + product_price * product_qty * get_gst / 100
      };
      const data = obj;
      await setproduct_array([...product_array, data]);
      Setproduct_name("");
      SetProduct_qty("");
      SetProduct_price("");
      Set_gst("")
      setobj_price("")
    }
  };

  const removePerson = (index) => {
    let filteredArray = product_array.filter((item, i) => i !== index);
    setproduct_array(filteredArray);
  };

  useEffect(() => {
    var total_qty = 0;
    var total_price = 0;
    for (var c = 0; c < product_array.length; c++) {
      total_qty = Number(total_qty) + Number(product_array[c].pqty);
    }
    for (var j = 0; j < product_array.length; j++) {
      total_price =
        Number(total_price) +
        Number(product_array[j].ptotal);
    }
    setqty(total_qty);
    settotal(total_price);
  }, [product_array]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />

      <View style={{ padding: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.light }} >
        <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Ionicons name="md-menu-sharp" size={30} color={Colors.black} />
        </TouchableOpacity>
        <Text style={{ color: Colors.black, fontSize: 18, marginLeft: '5%' }} >
          Place B2B</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{}}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: "5%", marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            Name :</Text>
          <Text style={{ marginLeft: metrics.HEIGHT * 0.2, marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            Number :</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: "2%", width: metrics.WIDTH * 0.9, marginHorizontal: "5%", justifyContent: "space-between", height: metrics.HEIGHT * 0.07, }}        >
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              value={data}
              placeholder="Enter a name"
              onChangeText={(text) => setnames(text)}
              placeholderTextColor={Colors.white}
            />
          </View>
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              keyboardType="phone-pad"
              value={data}
              onChangeText={(number) => setnumbers(number)}
              placeholder="Enter a number"
              placeholderTextColor={Colors.white}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: "5%", marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            Address1 :</Text>
          <Text style={{ marginLeft: metrics.HEIGHT * 0.17, marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            Address2 :</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: "2%", width: metrics.WIDTH * 0.9, marginHorizontal: "5%", justifyContent: "space-between", height: metrics.HEIGHT * 0.07, }}        >
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              value={data}
              placeholder="Enter a Address1"
              // onChangeText={(text) => setnames(text)}
              onChangeText={(text) => setaddress(text)}
              placeholderTextColor={Colors.white}
            />
          </View>
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              // keyboardType="phone-pad"
              // value={data}
              onChangeText={(text) => setaddress2(text)}
              placeholder="Enter a Address2"
              placeholderTextColor={Colors.white}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: "5%", marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            Address3 :</Text>
          <Text style={{ marginLeft: metrics.HEIGHT * 0.17, marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            Email :</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: "2%", width: metrics.WIDTH * 0.9, marginHorizontal: "5%", justifyContent: "space-between", height: metrics.HEIGHT * 0.07, }}        >
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              value={data}
              placeholder="Enter a Address3"
              onChangeText={(text) => setaddress3(text)}
              placeholderTextColor={Colors.white}
            />
          </View>
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              // keyboardType="phone-pad"
              value={data}
              onChangeText={(text) => setemail(text)}
              placeholder="Enter a Email"
              placeholderTextColor={Colors.white}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: "5%", marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            GST-IN :</Text>
          <Text style={{ marginLeft: metrics.HEIGHT * 0.17, marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            PAN No :</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: "2%", width: metrics.WIDTH * 0.9, marginHorizontal: "5%", justifyContent: "space-between", height: metrics.HEIGHT * 0.07, }}        >
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              value={data}
              placeholder="Enter a Gst No"
              onChangeText={(text) => setgstnumber(text)}
              placeholderTextColor={Colors.white}
            />
          </View>
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              // keyboardType="phone-pad"
              value={data}
              onChangeText={(text) => setpannumber(text)}
              placeholder="Enter a Pan No"
              placeholderTextColor={Colors.white}
            />
          </View>
        </View>
        {/* <View style={{ marginTop: "2%", marginHorizontal: "5%", }}        >
          <Text style={{ fontWeight: "bold", color: Colors.black }}>
            Address :</Text>
        </View>
        <View
          style={{ width: "90%", marginHorizontal: "5%", marginTop: "3%", backgroundColor: "#adb5bd", borderRadius: 10, elevation: 10, flexDirection: "row", }}        >
          <View style={{ width: "80%" }}>
            <TextInput
              style={{ color: Colors.black, fontSize: 16, fontWeight: "600", marginLeft: "5%", }}
              value={data}
              placeholder="address"
              onChangeText={(text) => setaddress(text)}
              placeholderTextColor={Colors.white}
            />
          </View>
        </View> */}

        <View style={{ marginTop: "2%", height: metrics.HEIGHT * 0.17, }}        >
          <FlatList
            data={product_array}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{ marginBottom: "2%", borderWidth: 0.5, borderColor: Colors.gray, padding: "4%", backgroundColor: colors.white, borderRadius: 4, marginHorizontal: "8%", }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      Name:</Text>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      {item.pname}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      Qty:</Text>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      {item.pqty}</Text>
                  </View>
                  {/* <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      Price:</Text>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      {item.fff} </Text>
                  </View> */}
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      Price:</Text>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      {item.pprice} </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      Gst:</Text>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      {item.pgst}%</Text>
                  </View>
                  {/* <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      Gst Amount:</Text>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      {item.pgstAmonut}</Text>
                  </View> */}
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      Total:</Text>
                    <Text style={{ fontSize: 16, color: Colors.black }}>
                      ₹{item.ptotal}
                    </Text>
                  </View>
                  <Ionicons name="close" size={28} color={colors.gray} style={{ position: "absolute", right: "1%", top: 15, }}
                    onPress={() => removePerson(index)}
                  />
                </View>
              );
            }}
          />
        </View>

        <View style={{ flexDirection: "row", position: "absolute", bottom: "20%" }}>
          <Text style={{ marginLeft: "5%", marginTop: "5%", fontWeight: "bold", color: Colors.black, }}>
            Total Qty :</Text>
          <Text style={{ marginLeft: metrics.HEIGHT * 0.18, marginTop: "5%", fontWeight: "bold", color: Colors.black, }}          >
            Total Amount :</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: "2%", position: "absolute", bottom: "12%", width: metrics.WIDTH * 0.9, marginHorizontal: "5%", justifyContent: "space-between", height: metrics.HEIGHT * 0.07, }}        >
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}          >
            <Text style={{ color: Colors.white, textAlign: "center", fontSize: 16 }}>
              {getqty}</Text>
          </View>
          <View style={{ width: metrics.WIDTH * 0.4, height: metrics.HEIGHT * 0.06, justifyContent: "center", borderRadius: 10, backgroundColor: "#adb5bd", elevation: 10, }}>
            <Text style={{ color: Colors.white, textAlign: "center", fontSize: 16 }}>
              {gettotal}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => { setmodal(true); }}
        style={{
          backgroundColor: "#adb5bd", width: 60, height: 60, borderRadius: 60, position: "absolute", bottom: "3%", left: "5%", justifyContent: "center", elevation: 10,
        }}
      >
        <Feather name="plus" color={Colors.white} size={29} style={{ alignSelf: "center" }} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={ismodal}
        onRequestClose={() => setmodal(false)}
      >
        <View
          style={{ backgroundColor: colors.transparent, flex: 1, justifyContent: "center", alignItems: "center", }}        >
          <View
            style={{
              height: metrics.HEIGHT * 0.7, width: metrics.WIDTH * 1, elevation: 10, borderRadius: 10, backgroundColor: colors.card, padding: "3%", marginTop: "5%",
            }}
          >
            <TouchableOpacity onPress={() => setmodal(false)}
            // style={{ justifyContent: "flex-end" }}
            >
              <AntDesign name="closecircle" size={20} color={Colors.black} />
            </TouchableOpacity>

            <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
              <Text
                style={{ fontWeight: "700", color: Colors.black, fontSize: 20 }}
              >
                Name :</Text>
              <TextInput
                placeholder="Enter Product Name"
                placeholderTextColor={Colors.black}
                underlineColorAndroid={Colors.gray}
                // key={index}
                style={{ color: Colors.black }}
                onChangeText={
                  (text) => Setproduct_name(text)
                  // this.setChange(text, index, item)
                }
              // value={input.user_sets}
              />
              <Text style={{ fontWeight: "700", color: Colors.black, fontSize: 20, marginTop: "10%", }}              >
                Qty :</Text>
              <TextInput
                placeholder="Enter Product qty"
                underlineColorAndroid={Colors.gray}
                placeholderTextColor={Colors.black}
                keyboardType="number-pad"
                // key={index}
                style={{ color: Colors.black }}
                onChangeText={
                  (number) => SetProduct_qty(number)
                  // this.setChange1(number, index, item)
                }
              // value={input1.user_sets1}
              />

              <Text style={{ fontWeight: "700", color: Colors.black, fontSize: 20, marginTop: "10%", }}              >
                Price :</Text>

              <TextInput
                placeholder="Enter Product price"
                underlineColorAndroid={Colors.gray}
                placeholderTextColor={Colors.black}
                keyboardType="number-pad"
                // key={index}
                style={{ color: Colors.black }}
                onChangeText={
                  (number) => SetProduct_price(number)
                  // this.setChange2(number, index, item)
                }
              // value={input2.user_sets2}
              />

              <Text style={{ fontWeight: "700", color: Colors.black, fontSize: 20, marginTop: "10%", }}              >
                GST :</Text>

              <TextInput
                placeholder="Enter GST%"
                underlineColorAndroid={Colors.gray}
                placeholderTextColor={Colors.black}
                keyboardType="number-pad"
                // key={index}
                style={{ color: Colors.black }}
                onChangeText={
                  (number) => Set_gst(number)
                  // this.setChange2(number, index, item)
                }
              // value={input2.user_sets2}
              />

            </View>

            <TouchableOpacity
              onPress={() => {
                addArray();
                setobj_price(product_price)
                setmodal(false);
              }}
              style={{
                backgroundColor: "#adb5bd",
                width: metrics.WIDTH * 0.4,
                height: metrics.HEIGHT * 0.07,
                borderRadius: 5,
                position: "absolute",
                bottom: "3%",
                right: "5%",
                justifyContent: "center",
                elevation: 10,
                // alignContent: 'center',
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "700", color: Colors.white, }}              >
                Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          placeb2b_order();
        }}
        style={{
          backgroundColor: "#adb5bd",
          width: metrics.WIDTH * 0.4,
          height: metrics.HEIGHT * 0.07,
          borderRadius: 5,
          position: "absolute",
          bottom: "3%",
          right: "5%",
          justifyContent: "center",
          elevation: 10,
          // alignContent: 'center',
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "700", color: Colors.white, }}        >
          Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceB2b;