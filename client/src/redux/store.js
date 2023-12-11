// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartReducer'; // Correggi il percorso del tuo cartReducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // Se hai altri reducer, aggiungili qui con una nuova chiave
  },
});

export default store;
