import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartReducer';
import authSlice from './authSlice'; // Assicurati di importare il tuo slice di autenticazione correttamente
import profileSlice from './profileSlice'; // Assicurati di importare il tuo slice del profilo correttamente

// Configura la persistenza per l'intero store
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth', 'profile'], // Includi tutti gli slices che desideri persistere
};

// Combina tutti i riduttori utilizzando combineReducers di Redux Toolkit
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  // Aggiungi altri riduttori qui
});

// Configura la persistenza per l'intero store
export default persistReducer(rootPersistConfig, rootReducer);
