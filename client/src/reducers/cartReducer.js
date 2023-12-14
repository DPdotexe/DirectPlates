// reducers/cartReducer.js

import { createReducer } from '@reduxjs/toolkit';
import { addToCart, removeFromCart, updateCartItemQuantity } from '../actions/cartActions';

const initialState = {
  items: [],
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    })
    .addCase(removeFromCart, (state, action) => {
      const newItems = state.items.filter((item, index) => index !== action.payload);
      return {
        ...state,
        items: newItems,
      };
    })
    .addCase(updateCartItemQuantity, (state, action) => {
      const { index, newQuantity } = action.payload;
      const updatedItems = state.items.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
      return {
        ...state,
        items: updatedItems,
      };
    });
});

export default cartReducer;
