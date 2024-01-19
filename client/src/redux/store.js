// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Importing individual reducers
import cartReducer from '../reducers/cartReducer';
import authReducer from '../reducers/authReducer';

// Configuration for cart persistence
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'isCartOpen'], // Array of properties to persist
};

// Creating a persisted version of the cart reducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Configuring the Redux store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Creating a persistor for the Redux store
const persistor = persistStore(store);

// Exporting the configured Redux store and persistor
export { store, persistor };
