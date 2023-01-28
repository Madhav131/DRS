import {AsyncStorage} from 'react-native';
import {
  ADD_TO_CART,
  ADD_TO_CART_ACC,
  ADD_TO_CART_RAW,
  DECREASE_CART_QTY,
  DECREASE_CART_QTY_ACC,
  INCREASE_CART_QTY,
  INCREASE_CART_QTY_ACC,
  ORDER_BEGIN,
  ORDER_ERROR,
  ORDER_SUCCESS,
  REMOVE_CART_ITEM,
  REMOVE_CART_ITEM_ACC,
  REMOVE_CART_ITEM_RAW,
  RESTORE_CART,
  RESTORE_QTY,
  INCREASE_CART_QTY_RAW,
  DECREASE_CART_QTY_RAW,
  RESTORE_TOTAL,
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
import Toast from 'react-native-simple-toast';

const cart_reducer = (state, action) => {
  var tempCart = state.cart;
  var tempCart_acc = state.acce_cart;
  var tempCart_Raw = state.raw_cart;
  var tempCart_Asstwo = state.AssTwo_cart;
  var tempCart_Assthree = state.AccThree_cart;

  var removedItemFromCart = state.cart.filter((x, i) => i !== action.payload);
  var removedItemFromCart_acces = state.acce_cart.filter(
    (x, i) => i !== action.payload,
  );
  var removedItemFromCart_asstwo = state.AssTwo_cart.filter(
    (x, i) => i !== action.payload,
  );
  var removedItemFromCart_assthree = state.AccThree_cart.filter(
    (x, i) => i !== action.payload,
  );
  var removedItemFromCart_raw = state.raw_cart.filter(
    (x, i) => i !== action.payload,
  );

  switch (action.type) {
    case ADD_TO_CART:
      if (
        state.cart.every(
          item =>
            item.user_id !== action.payload.user_id ||
            item.gender_ids !== action.payload.gender_ids ||
            item.size_ids !== action.payload.size_ids,
        )
      ) {
        tempCart.push(action.payload);
        Toast.show('product successfully added to cart');
        return {...state, cart: tempCart};
      } else {
        const index_find = state.cart.findIndex(
          (item, i) =>
            item.user_id == action.payload.user_id &&
            item.gender_ids == action.payload.gender_ids &&
            item.size_ids == action.payload.size_ids,
        );

        const temp = state.cart;
        temp[index_find].qty = state.cart[index_find].qty + 1;
        temp[index_find].user_price =
          state.cart[index_find].selectedItemDetails[0].user_price +
          state.cart[index_find].user_price;
        Toast.show('product successfully added to cart');
        return {...state, cart: temp};
      }

    case REMOVE_CART_ITEM:
      const amount = state.total - state.cart[action.payload].user_price;
      const qty_temp = state.qty - state.cart[action.payload].qty;
      return {
        ...state,
        cart: removedItemFromCart,
        total: amount,
        qty: qty_temp,
      };

    case INCREASE_CART_QTY:
      const temp = state.cart;
      temp[action.payload].qty = state.cart[action.payload].qty + 1;
      temp[action.payload].user_price =
        state.cart[action.payload].selectedItemDetails[0].wholesale_price +
        state.cart[action.payload].user_price;
      return {...state, cart: temp};

    case DECREASE_CART_QTY:
      const temp1 = state.cart;
      temp1[action.payload].qty = state.cart[action.payload].qty - 1;
      temp1[action.payload].user_price =
        state.cart[action.payload].user_price -
        state.cart[action.payload].selectedItemDetails[0].wholesale_price;
      return {...state, cart: temp1};

    case RESTORE_CART:
      return {...state, cart: action.payload};

    case RESTORE_TOTAL:
      return {...state, total: action.payload};
    case RESTORE_SCGST:
      return {...state, scgst: action.payload};
    case RESTORE_QTY:
      return {...state, qty: action.payload};

    case ADD_TO_CART_ACC:
      if (
        state.acce_cart.every((item, index) => item.id !== action.payload.id)
      ) {
        tempCart_acc.push(action.payload);
        Toast.show('product successfully added to cart');
        return {...state, acce_cart: tempCart_acc};
      } else {
        const index_find_acc = state.acce_cart.findIndex(
          (item, i) => item.id == action.payload.id,
        );

        const temp_acc = state.acce_cart;
        temp_acc[index_find_acc].qty = state.acce_cart[index_find_acc].qty + 1;
        temp_acc[index_find_acc].user_price =
          Number(state.acce_cart[index_find_acc].user_price) +
          Number(action.payload.user_price);
        temp_acc[index_find_acc].scgst =
          Number(state.acce_cart[index_find_acc].scgst) +
          Number(action.payload.scgst);
        Toast.show('product successfully added to cart');
        return {...state, acce_cart: temp_acc};
      }
    case REMOVE_CART_ITEM_ACC:
      const amount_acc =
        state.total - state.acce_cart[action.payload].user_price;
      const qty_acc = state.qty - state.acce_cart[action.payload].qty;

      return {
        ...state,
        acce_cart: removedItemFromCart_acces,
        total: amount_acc,
        qty: qty_acc,
      };

    case INCREASE_CART_QTY_ACC:
      const temp_inc = state.acce_cart;
      temp_inc[action.payload].qty = state.acce_cart[action.payload].qty + 1;
      temp_inc[action.payload].user_price =
        Number(state.acce_cart[action.payload].user_price) +
        Number(state.acce_cart[action.payload].user_price);
      return {...state, acce_cart: temp_inc};

    case DECREASE_CART_QTY_ACC:
      const temp_dec = state.acce_cart;
      temp_dec[action.payload].qty = state.acce_cart[action.payload].qty - 1;
      temp_dec[action.payload].user_price =
        Number(state.acce_cart[action.payload].user_price) -
        Number(state.acce_cart[action.payload].price);
      return {...state, acce_cart: temp_dec};

    case ADD_TO_CART_RAW:
      if (
        state.raw_cart.every((item, index) => item.id !== action.payload.id)
      ) {
        tempCart_Raw.push(action.payload);
        Toast.show('product successfully added to cart');
        return {...state, raw_cart: tempCart_Raw};
      } else {
        const index_find_raw = state.raw_cart.findIndex(
          (item, i) => item.id == action.payload.id,
        );

        const temp_raw = state.raw_cart;
        temp_raw[index_find_raw].qty =
          state.raw_cart[index_find_raw].qty + action.payload.qty;
        temp_raw[index_find_raw].user_price =
          Number(state.raw_cart[index_find_raw].user_price).toFixed(2) +
          Number(action.payload.total_price).toFixed(2);
        Toast.show('product successfully added to cart');
        return {...state, raw_cart: temp_raw};
      }
    case REMOVE_CART_ITEM_RAW:
      const amount_raw =
        state.total - state.raw_cart[action.payload].total_price;
      const qty_raw = state.qty - state.raw_cart[action.payload].qty;

      return {
        ...state,
        raw_cart: removedItemFromCart_raw,
        total: amount_raw,
        qty: qty_raw,
      };

    case INCREASE_CART_QTY_RAW:
      const temp_inc1 = state.raw_cart;
      temp_inc1[action.payload].qty =
        state.raw_cart[action.payload].qty.slice(0, 3) + 1;
      temp_inc1[action.payload].user_price =
        Number(state.raw_cart[action.payload].user_price) +
        Number(state.raw_cart[action.payload].user_price);
      return {...state, raw_cart: temp_inc1};

    case DECREASE_CART_QTY_RAW:
      const temp_dec1 = state.raw_cart;
      temp_dec1[action.payload].qty =
        state.raw_cart[action.payload].qty.slice(0, 3) - 1;
      temp_dec1[action.payload].user_price =
        Number(state.raw_cart[action.payload].user_price) -
        Number(state.raw_cart[action.payload].user_price);
      return {...state, raw_cart: temp_dec1};

    case ADD_TO_ASSTWO:
      if (
        state.AssTwo_cart.every(
          (item, index) =>
            item.id !== action.payload.id ||
            item.user_price !== action.payload.user_price,
        )
      ) {
        tempCart_Asstwo.push(action.payload);
        Toast.show('product successfully added to cart');
        return {...state, AssTwo_cart: tempCart_Asstwo};
      } else {
        const index_find_Asswto = state.AssTwo_cart.findIndex(
          (item, i) =>
            item.id == action.payload.id &&
            item.user_price == action.payload.user_price,
        );
        const temp_asstwo = state.AssTwo_cart;
        temp_asstwo[index_find_Asswto].qty =
          state.AssTwo_cart[index_find_Asswto].qty + action.payload.qty;
        temp_asstwo[index_find_Asswto].user_price =
          Number(state.AssTwo_cart[index_find_Asswto].user_price) +
          Number(action.payload.total_price);
        temp_asstwo[index_find_Asswto].scgst =
          Number(state.AssTwo_cart[index_find_Asswto].scgst) +
          Number(action.payload.scgst);

        Toast.show('product successfully added to cart');
        return {...state, AssTwo_cart: temp_asstwo};
      }

    case ADD_TO_ASSTHREE:
      if (
        state.AccThree_cart.every(
          (item, index) =>
            item.id !== action.payload.id ||
            item.user_price !== action.payload.user_price,
        )
      ) {
        tempCart_Assthree.push(action.payload);
        Toast.show('product successfully added to cart');
        return {...state, AccThree_cart: tempCart_Assthree};
      } else {
        const index_find_Assthree = state.AccThree_cart.findIndex(
          (item, i) =>
            item.id == action.payload.id &&
            item.user_price == action.payload.user_price,
        );
        const temp_assthree = state.AccThree_cart;
        temp_assthree[index_find_Assthree].qty =
          state.AccThree_cart[index_find_Assthree].qty + action.payload.qty;
        temp_assthree[index_find_Assthree].user_price =
          Number(state.AccThree_cart[index_find_Assthree].user_price) +
          Number(action.payload.total_price);
        temp_assthree[index_find_Assthree].scgst =
          Number(state.AccThree_cart[index_find_Assthree].scgst) +
          Number(action.payload.scgst);

        Toast.show('product successfully added to cart');
        return {...state, AccThree_cart: temp_assthree};
      }
    case REMOVE_CART_ITEM_ASSTWO:
      const amount_asstwo =
        Number(state.total) -
        Number(state.AssTwo_cart[action.payload].user_price);
      const qty_asstwo = state.qty - state.AssTwo_cart[action.payload].qty;

      return {
        ...state,
        AssTwo_cart: removedItemFromCart_asstwo,
        total: amount_asstwo,
        qty: qty_asstwo,
      };
    case REMOVE_CART_ITEM_ASSTHREE:
      const amount_assthree =
        state.total - state.AccThree_cart[action.payload].user_price;
      const qty_assthree = state.qty - state.AccThree_cart[action.payload].qty;
      return {
        ...state,
        AccThree_cart: removedItemFromCart_assthree,
        total: amount_assthree,
        qty: qty_assthree,
      };

    case INCREASE_CART_QTY_ASSTWO:
      const temp_incass = state.AssTwo_cart;
      temp_incass[action.payload].qty =
        state.AssTwo_cart[action.payload].qty + 1;
      // temp_incass[action.payload].user_price =
      //   Number(state.AssTwo_cart[action.payload].user_price) +
      //   Number(state.AssTwo_cart[action.payload].user_price);
      return {...state, AssTwo_cart: temp_incass};

    case INCREASE_CART_QTY_ASSTHREE:
      const temp_incass1 = state.AccThree_cart;
      temp_incass1[action.payload].qty =
        state.AccThree_cart[action.payload].qty + 1;
      // temp_incass1[action.payload].user_price =
      //   Number(state.AccThree_cart[action.payload].user_price) +
      //   Number(state.AccThree_cart[action.payload].user_price);
      return {...state, AccThree_cart: temp_incass1};

    case DECREASE_CART_QTY_ASSTHREE:
      const tmep_desaathree = state.AccThree_cart;
      tmep_desaathree[action.payload].qty =
        state.AccThree_cart[action.payload].qty - 1;
      // tmep_desaathree[action.payload].user_price =
      //   Number(state.AccThree_cart[action.payload].user_price) -
      //   Number(state.AccThree_cart[action.payload].user_price);
      return {...state, AccThree_cart: tmep_desaathree};

    case DECREASE_CART_QTY_ASSTWO:
      const tmep_desaatwo = state.AssTwo_cart;
      tmep_desaatwo[action.payload].qty =
        state.AssTwo_cart[action.payload].qty - 1;
      // tmep_desaatwo[action.payload].user_price =
      //   Number(state.AssTwo_cart[action.payload].user_price) -
      //   Number(state.AssTwo_cart[action.payload].user_price);
      return {...state, AssTwo_cart: tmep_desaatwo};

    case ORDER_BEGIN:
      return {...state, is_loading: true};

    case GET_NUMBER:
      return {...state, invioce_id: action.payload.order.id};

    case ORDER_SUCCESS:
      return {
        ...state,
        cart: [],
        total: 0,
        acce_cart: [],
        raw_cart: [],
        is_loading: false,
        qty: 0,
        AssTwo_cart: [],
        scgst: 0,
        AccThree_cart: [],
      };

    case ORDER_ERROR:
      return {...state, is_loading: false};

    default:
      return state;
  }
  return state;
};

export default cart_reducer;
