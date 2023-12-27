// cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const CLOSE_CART = 'CLOSE_CART';
export const OPEN_CART = 'OPEN_CART'; // Nuova azione per aprire il carrello

// Azione per aggiungere un prodotto al carrello
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: { product },
});

// Azione per rimuovere un prodotto dal carrello
export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: { index },
});

// Azione per aggiornare la quantità di un prodotto nel carrello
export const updateCartItemQuantity = ({ index, newQuantity }) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { index, newQuantity },
});

// Azione per impostare il carrello (usata per la persistenza)
export const setCartItems = (items) => ({
  type: SET_CART_ITEMS,
  payload: { items },
});

// cartActions.js
export const closeCart = () => {
  console.log('closeCart azione chiamata');
  return {
    type: CLOSE_CART,
  };
};

// cartActions.js
export const openCart = () => {
  return {
    type: OPEN_CART,
  };
};
