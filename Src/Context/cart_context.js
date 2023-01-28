import React, {useContext, useReducer, useEffect} from 'react';
import Reducer from '../Reducer/cart_reducer';
import {
  ADD_TO_CART,
  ADD_TO_CART_ACC,
  DECREASE_CART_QTY,
  DECREASE_CART_QTY_ACC,
  INCREASE_CART_QTY,
  INCREASE_CART_QTY_ACC,
  ORDER_BEGIN,
  ORDER_ERROR,
  ORDER_SUCCESS,
  REMOVE_CART_ITEM,
  REMOVE_CART_ITEM_ACC,
  RESTORE_CART,
  RESTORE_TOTAL,
  RESTORE_QTY,
  ADD_TO_CART_RAW,
  REMOVE_CART_ITEM_RAW,
  INCREASE_CART_QTY_RAW,
  DECREASE_CART_QTY_RAW,
  RESTORE_SCGST,
  ADD_TO_ASSTWO,
  REMOVE_CART_ITEM_ASSTWO,
  INCREASE_CART_QTY_ASSTWO,
  DECREASE_CART_QTY_ASSTWO,
  GET_NUMBER,
  ADD_TO_ASSTHREE,
  REMOVE_CART_ITEM_ASSTHREE,
  INCREASE_CART_QTY_ASSTHREE,
  DECREASE_CART_QTY_ASSTHREE,
} from '../type';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';

const initialState = {
  cart: [],
  total: 0,
  acce_cart: [],
  raw_cart: [],
  is_loading: false,
  qty: 0,
  total_scgst: 0,
  AssTwo_cart: [],
  scgst: 0,
  invioce_id: '',
  AccThree_cart: [],
};

const CartContext = React.createContext();

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addToCart = item => {
    console.log('----item===== : ', state.cart);
    dispatch({type: ADD_TO_CART, payload: item});
    countTotal();
    countscgst();
    // countQty();
  };

  const removeFromCart = index => {
    dispatch({type: REMOVE_CART_ITEM, payload: index});
  };

  const increment_qty = item => {
    dispatch({type: INCREASE_CART_QTY, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const descrease_qty = item => {
    dispatch({type: DECREASE_CART_QTY, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const countTotal = async () => {
    // console.log("madhav-----");
    var total = 0;

    for (var i = 0; i < state.cart.length; i++) {
      total =
        Number(total) + Number(state.cart[i].user_Total * state.cart[i].qty);
    }
    for (var i = 0; i < state.acce_cart.length; i++) {
      total = Number(total) + Number(state.acce_cart[i].user_price);
    }
    for (var i = 0; i < state.raw_cart.length; i++) {
      total = Number(total) + Number(state.raw_cart[i].total_price);
    }
    for (var i = 0; i < state.AssTwo_cart.length; i++) {
      total =
        Number(total) +
        Number(state.AssTwo_cart[i].user_price * state.AssTwo_cart[i].qty);
    }
    for (var i = 0; i < state.AccThree_cart.length; i++) {
      total =
        Number(total) +
        Number(state.AccThree_cart[i].user_price * state.AccThree_cart[i].qty);
    }

    dispatch({type: RESTORE_TOTAL, payload: total});
    console.log('total : ', total);
  };

  const countscgst = async () => {
    var scgst = 0;
    for (var i = 0; i < state.cart.length; i++) {
      scgst = Number(scgst) + Number(state.cart[i].scgst);
    }
    for (var i = 0; i < state.acce_cart.length; i++) {
      console.log('adadasdd-=->', state.acce_cart[i].scgst);
      scgst = Number(scgst) + Number(state.acce_cart[i].scgst);
    }
    for (var i = 0; i < state.AssTwo_cart.length; i++) {
      scgst = Number(scgst) + Number(state.AssTwo_cart[i].scgst);
    }
    for (var i = 0; i < state.AccThree_cart.length; i++) {
      scgst = Number(scgst) + Number(state.AccThree_cart[i].scgst);
    }

    dispatch({type: RESTORE_SCGST, payload: scgst.toFixed(2)});
    console.log('scgst::', scgst.toFixed(2));
  };

  const countQty = async () => {
    // console.log("madhav-----");
    var qty = 0;
    for (var i = 0; i < state.cart.length; i++) {
      qty = qty + state.cart[i].qty;
    }
    for (var i = 0; i < state.acce_cart.length; i++) {
      qty = qty + state.acce_cart[i].qty;
    }
    for (var i = 0; i < state.raw_cart.length; i++) {
      qty = qty + state.raw_cart[i].qty;
    }
    for (var i = 0; i < state.AssTwo_cart.length; i++) {
      qty = qty + state.AssTwo_cart[i].qty;
    }
    for (var i = 0; i < state.AccThree_cart.length; i++) {
      qty = qty + state.AccThree_cart[i].qty;
    }
    dispatch({type: RESTORE_QTY, payload: qty});
    console.log('-----qty : ', qty);
  };

  const addToCart_accessories = async item => {
    dispatch({type: ADD_TO_CART_ACC, payload: item});
    countTotal();
    countscgst();
    countQty();
  };
  const addToCart_rawmaterial = async item => {
    dispatch({type: ADD_TO_CART_RAW, payload: item});
    countTotal();
    countQty();
  };

  const addTocart_Asstwo = async item => {
    dispatch({type: ADD_TO_ASSTWO, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const addTocart_AccThree = async item => {
    dispatch({type: ADD_TO_ASSTHREE, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const removedItemFromCart_aassThree = async index => {
    console.log('---', index);
    dispatch({type: REMOVE_CART_ITEM_ASSTHREE, payload: index});
  };

  const increment_qty_assthree = item => {
    dispatch({type: INCREASE_CART_QTY_ASSTHREE, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const descrease_qty_assthree = item => {
    dispatch({type: DECREASE_CART_QTY_ASSTHREE, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const removedItemFromCart_accessories = async index => {
    console.log('---', index);
    dispatch({type: REMOVE_CART_ITEM_ACC, payload: index});
    // countTotal();
  };

  const removedItemFromCart_aassTwo = async index => {
    console.log('---', index);
    dispatch({type: REMOVE_CART_ITEM_ASSTWO, payload: index});
  };

  const removedItemFromCart_rawmaterial = async index => {
    console.log('---', index);
    dispatch({type: REMOVE_CART_ITEM_RAW, payload: index});
    // countTotal();
  };

  const increment_qty_acce = item => {
    dispatch({type: INCREASE_CART_QTY_ACC, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const increment_qty_asstwo = item => {
    dispatch({type: INCREASE_CART_QTY_ASSTWO, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const increment_qty_raw = item => {
    dispatch({type: INCREASE_CART_QTY_RAW, payload: item});
    countTotal();
    countQty();
  };

  const descrease_qty_acce = item => {
    dispatch({type: DECREASE_CART_QTY_ACC, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const descrease_qty_asstwo = item => {
    dispatch({type: DECREASE_CART_QTY_ASSTWO, payload: item});
    countTotal();
    countscgst();
    countQty();
  };

  const descrease_qty_raw = item => {
    dispatch({type: DECREASE_CART_QTY_RAW, payload: item});
    countTotal();
    countQty();
  };

  const PlaceOrder = async (param, props) => {
    var token = await AsyncStorage.getItem('token');
    console.log('placeorderdata------>', param);

    dispatch({type: ORDER_BEGIN});
    axios
      .post(BASE_URL + 'newplaceOrder', param, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(async res => {
        console.log(res.data.order.id);

        await AsyncStorage.setItem(
          'invioce_id',
          JSON.stringify(res.data.order.id),
        );
        dispatch({type: GET_NUMBER, payload: res.data});
        if (res.data.success === 1) {
          dispatch({type: ORDER_SUCCESS, payload: res.data});
          props.navigation.navigate('Product');
          Toast.show(res.data.message);
        } else {
          Toast.show(res.data.error);
        }
      })
      .catch(err => {
        Toast.show('Inventory not found');

        console.log(JSON.stringify(err, 2, null));
        dispatch({type: ORDER_ERROR});
      });
  };

  const Orderdone = () => {
    dispatch({type: ORDER_SUCCESS});
  };

  useEffect(() => {
    AsyncStorage.getItem('cart').then(value => {
      if (value) {
        dispatch({type: RESTORE_CART, payload: JSON.parse(value)});
      }
    });

    AsyncStorage.getItem('total').then(value => {
      if (value) {
        dispatch({type: RESTORE_TOTAL, payload: JSON.parse(value)});
      }
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        increment_qty,
        descrease_qty,
        addToCart_accessories,
        removedItemFromCart_accessories,
        increment_qty_acce,
        descrease_qty_acce,
        increment_qty_raw,
        descrease_qty_raw,
        PlaceOrder,
        countQty,
        countTotal,
        countscgst,
        addToCart_rawmaterial,
        removedItemFromCart_rawmaterial,
        addTocart_Asstwo,
        removedItemFromCart_aassTwo,
        increment_qty_asstwo,
        descrease_qty_asstwo,
        Orderdone,
        addTocart_AccThree,
        removedItemFromCart_aassThree,
        increment_qty_assthree,
        descrease_qty_assthree,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
