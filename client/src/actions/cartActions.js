// cartActions.js

import { createAction } from '@reduxjs/toolkit';

export const addToCart = createAction('ADD_TO_CART');
export const removeFromCart = createAction('REMOVE_FROM_CART');
export const updateCartItemQuantity = createAction('UPDATE_CART_ITEM_QUANTITY');
