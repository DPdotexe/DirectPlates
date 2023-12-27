// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../reducers/cartReducer';
import authReducer from '../reducers/authReducer';

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'isCartOpen'], // Includi tutte le proprietà che desideri persistere
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
