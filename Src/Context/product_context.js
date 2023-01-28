import axios from 'axios';
import React, {useContext, useReducer, useEffect, useState} from 'react';
import reducer from '../Reducer/product_reducer';
import {
  GET_ACCESSORIES,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  SEARCH_LEAD_MASTER,
  GET_RAWMATERIAL,
  SEARCH_LEAD_MASTER1,
  GET_ACCESSORIESTWO,
  SEARCH_LEAD_MASTER2,
  GET_ACCESSORIESTHREE,
  SEARCH_LEAD_MASTER3,
} from '../type';
import DeviceInfo from 'react-native-device-info';
import {AsyncStorage} from 'react-native';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';

const initialState = {
  products: [],
  accessories_list: [],
  AssTwo_list: [],
  accThree_list: [],
};

const ProductContext = React.createContext();

export const ProductProvider = ({children}) => {
  const [task_arrayholder, setBranchArray] = useState([]);
  const [asstwo, SetAssTwo] = useState([]);
  const [accthree, SetAccThree] = useState([]);
  const [task_arrayholder1, setBranchArray1] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getproduct = () => {
    const formData = new FormData();
    formData.append('device_id', DeviceInfo.getDeviceId());
  };

  const getAccessories = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log('-------', token);
    await axios
      .get(BASE_URL + 'accessories', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(res => {
        console.log('-======================', res.data);
        if (res.data.success === 1) {
          setBranchArray(res.data.data);
          dispatch({type: GET_ACCESSORIES, payload: res.data.data});
        }
      })
      .catch(err => {
        console.log('---------err : ', err);
      });
  };

  const getAccessoriesTwo = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log('-------', token);
    await axios
      .get(BASE_URL + 'accessoriestwo', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(res => {
        console.log('-======================', res.data);
        if (res.data.success === 1) {
          SetAssTwo(res.data.data);
          dispatch({type: GET_ACCESSORIESTWO, payload: res.data.data});
        }
      })
      .catch(err => {
        console.log('---------err : ', err);
      });
  };

  const getAccessoriesthree = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log('-------', token);
    await axios
      .get(BASE_URL + 'accessoriesthree', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(res => {
        console.log('-======================', res.data);
        if (res.data.success === 1) {
          // setBranchArray(res.data.data);
          SetAccThree(res.data.data);
          dispatch({type: GET_ACCESSORIESTHREE, payload: res.data.data});
        }
      })
      .catch(err => {
        console.log('---------err : ', err);
      });
  };

  const getRawmaterial = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log('-------', token);
    await axios
      .get(BASE_URL + 'getrawmaterial', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(res => {
        console.log('-======================madhav', res.data);
        if (res.data.success === 1) {
          setBranchArray1(res.data.data);
          dispatch({type: GET_RAWMATERIAL, payload: res.data.data});
        }
      })
      .catch(err => {
        console.log('---------err : ', err);
      });
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
    });
    dispatch({type: SEARCH_LEAD_MASTER, payload: newData});
    //  Setdata(newData);
  };
  const searchFilter_branch1 = text => {
    const newData = task_arrayholder1.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
    });
    dispatch({type: SEARCH_LEAD_MASTER1, payload: newData});
    //  Setdata(newData);
  };

  const searchFilter_branch2 = text => {
    const newData = asstwo.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
    });
    dispatch({type: SEARCH_LEAD_MASTER2, payload: newData});
    //  Setdata(newData);
  };

  const searchFilter_branch3 = text => {
    const newData = accthree.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
    });
    dispatch({type: SEARCH_LEAD_MASTER3, payload: newData});
    //  Setdata(newData);
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        getAccessories,
        searchFilter_branch,
        getRawmaterial,
        searchFilter_branch1,
        getAccessoriesTwo,
        getAccessoriesthree,
        searchFilter_branch2,
        searchFilter_branch3,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useproductContext = () => {
  return useContext(ProductContext);
};
