import {
  GET_ACCESSORIES,
  GET_ACCESSORIESTHREE,
  GET_ACCESSORIESTWO,
  GET_RAWMATERIAL,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  SEARCH_LEAD_MASTER,
  SEARCH_LEAD_MASTER1,
  SEARCH_LEAD_MASTER2,
  SEARCH_LEAD_MASTER3,
} from '../type';

const product_reducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_SUCCESS:
      return {...state, products: action.payload};

    case GET_ACCESSORIES:
      return {...state, accessories_list: action.payload};
    case GET_ACCESSORIESTWO:
      return {...state, AssTwo_list: action.payload};
    case GET_ACCESSORIESTHREE:
      return {...state, accThree_list: action.payload};
    case GET_RAWMATERIAL:
      return {...state, accessories_list1: action.payload};
    case SEARCH_LEAD_MASTER:
      return {...state, accessories_list: action.payload};
    case SEARCH_LEAD_MASTER1:
      return {...state, accessories_list1: action.payload};
    case SEARCH_LEAD_MASTER2:
      return {...state, AssTwo_list: action.payload};
    case SEARCH_LEAD_MASTER3:
      return {...state, accThree_list: action.payload};
    default:
      return state;
  }
  return state;
};

export default product_reducer;
