// rootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartReducer';
import { authSlice } from './authReducer'; // Importa il tuo slice di autenticazione

// Configura la persistenza per il tuo riduttore del carrello
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'], // Array di campi nel tuo stato del carrello da persistere
};

// Configura la persistenza per il tuo slice di autenticazione
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'user'], // Array di campi nel tuo stato di autenticazione da persistere
};

// Combina tutti i riduttori
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  // Aggiungi altri riduttori qui
});

export default rootReducer;
