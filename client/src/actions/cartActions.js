// cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const OPEN_CART = 'OPEN_CART';

// Action to add a product to the cart
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: { product },
});

// Action to remove a product from the cart
export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: { index },
});

// Action to update the quantity of a product in the cart
export const updateCartItemQuantity = ({ index, newQuantity }) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { index, newQuantity },
});

// Action to set the cart items (used for persistence)
export const setCartItems = (items) => ({
  type: SET_CART_ITEMS,
  payload: { items },
});

// Action to open the cart
export const openCart = () => ({
  type: OPEN_CART,
});
