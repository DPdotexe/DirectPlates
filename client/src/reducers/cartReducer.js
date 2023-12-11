import { createReducer } from '@reduxjs/toolkit';
import { addToCart, removeFromCart } from '../actions/cartActions'; 

const initialState = {
  items: [],
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    })
    .addCase(removeFromCart, (state, action) => {
      const newItems = state.items.filter((item, index) => index !== action.payload);
      return {
        ...state,
        items: newItems,
      };
    });
});

export default cartReducer;
