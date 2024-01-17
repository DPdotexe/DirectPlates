// cartReducer.js

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  SET_CART_ITEMS,
  OPEN_CART,
  CLEAR_CART, 
} from '../actions/cartActions';

const initialState = {
  items: [],
  isCartOpen: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('Added to cart:', action.payload.product);
      return {
        ...state,
        items: [...state.items, action.payload.product],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload.index),
      };

    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.index
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        items: action.payload.items,
      };

    case OPEN_CART:
      return {
        ...state,
        isCartOpen: true,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [], 
      };

    default:
      return state;
  }
};

export default cartReducer;
