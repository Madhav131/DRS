import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import Colors from '../Utils/Colors';
import { ACCEPT_HEADER, BASE_URL } from '../Utils/const';
import metrics from '../Utils/Metrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-picker/picker'
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modal'
import Toast from 'react-native-simple-toast'
import Fonts from "../Utils/Fonts";

const Inventory = (props, { params, }) => {
    const [token, setToken] = useState('')
    const [inventory_list, setInventory] = useState([])
    const [inventory_id, setInventory_id] = useState('')
    const [modal_visibl, setVisible] = useState(false)
    const [txt_inventory, setInventory_txt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [task_arrayholder, setBranchArray] = useState([]);



    useEffect(() => {
        AsyncStorage.getItem("token").then((value) => {
            if (value) {
                setToken(JSON.parse(value))
                console.log("token=======>", value);
            }
        });
    })

    useEffect(() => {
        getInventory()
    }, [token])

    const getInventory = async () => {
        await axios.get(BASE_URL + "inventory-view", {
            headers: {
                "Accept": ACCEPT_HEADER,
                "Authorization": "Bearer " + token
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.success === 1) {
                setInventory(res.data.data)
                setBranchArray(res.data.data);
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    const updateInventory = async () => {
        if (txt_inventory === '') {
            Toast.show("Please enter inventory")
            return
        }

        const formData = new FormData()
        formData.append("id[0]", inventory_id)
        formData.append("inventory[0]", txt_inventory)
        setIsLoading(true)
        await axios.post(BASE_URL + "inventory-update", formData, {
            headers: {
                "Accept": ACCEPT_HEADER,
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.success === 1) {
                    getInventory()
                    setInventory_txt('')
                    setInventory_id('')
                    setVisible(false)
                }
                Toast.show(res.data.message)
                setIsLoading(false)

            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)

            })
    }

    const searchFilter_branch = (text) => {
        const newData = task_arrayholder.filter(function (item) {
            const employee = item.products.name ? item.products.name.toUpperCase() : "".toUpperCase();
            const code1 = item.products.school.name ? item.products.school.name.toUpperCase() : "".toUpperCase();
            const textData = text.toUpperCase();
            return employee.indexOf(textData) > -1 || code1.indexOf(textData) > -1;
        });

        setInventory(newData);
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }} >
            <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
            <View style={{ padding: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.light }} >
                <TouchableOpacity
                    onPress={() => props.navigation.toggleDrawer()}
                >
                    <Ionicons name="md-menu-sharp" size={30} color={Colors.black} />
                </TouchableOpacity>
                <Text style={{ color: Colors.black, fontSize: 18, marginLeft: '5%' }} >
                    Inventory</Text>
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

            <View style={{ flex: 1, padding: '4%' }} >
                <FlatList
                    data={inventory_list}
                    showsVerticalScrollIndicator={false}
                    renderItem={(({ item, index }) => {
                        return (
                            <View style={{ margin: '1%', marginBottom: '2%', backgroundColor: Colors.white, elevation: 2, borderWidth: .5, borderColor: Colors.light, padding: '4%', borderRadius: 5 }} >
                                {item.products !== undefined || item.products !== null ?
                                    <View>
                                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: 'bold' }} >Product: {item.products.name} </Text>
                                        {item.products.school !== undefined || item.products.school !== null ?
                                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: 'bold' }} >School : {item.products.school.name} </Text>
                                            : null}
                                    </View>
                                    : null}
                                {item.genders !== undefined || item.genders !== null ?
                                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: 'bold' }} >Gender : {item.genders.name} </Text>
                                    : null}

                                {item.sizes !== undefined || item.sizes !== null ?
                                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: 'bold' }} >Size : {item.sizes.name} </Text>
                                    : null}
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: 'bold' }} >Inventory : {item.inventory} </Text>

                                <MaterialIcons name='edit' size={25} color={Colors.black} style={{ position: 'absolute', right: 0, padding: '5%' }}
                                    onPress={() => { setInventory_id(item.id), setVisible(true) }} />
                            </View>
                        )
                    })}
                />
            </View>

            <Modal
                isVisible={modal_visibl}
                onBackButtonPress={() => setVisible(false)}
                onBackdropPress={() => setVisible(false)}
            >
                <View style={{ padding: '5%', backgroundColor: Colors.white, borderRadius: 5 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Update Inventory</Text>
                        <MaterialIcons name='close' size={28} onPress={() => setVisible(false)} />
                    </View>
                    <View style={{ borderWidth: .4, borderColor: Colors.gray, marginTop: '10%', borderRadius: 5 }} >
                        <TextInput
                            placeholder='Enter Inventory'
                            keyboardType='numeric'
                            onChangeText={val => setInventory_txt(val)}
                        />
                    </View>

                    <TouchableOpacity style={{ marginTop: '10%', alignSelf: 'center', padding: '4%', backgroundColor: Colors.gray, width: '45%', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}
                        onPress={() => updateInventory()} >
                        {isLoading ?
                            <ActivityIndicator color={Colors.white} size='small' />
                            :
                            <Text style={{ color: Colors.white, fontSize: 16 }} >Update</Text>
                        }
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    );
}
export default Inventory;
