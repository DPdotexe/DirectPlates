// Importing necessary Redux and storage-related libraries
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Importing individual reducers
import cartReducer from './cartReducer';
import authSlice from './authSlice';
import profileSlice from './profileSlice';

// Configuration for root-level persistence
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth', 'profile'], // Array of reducers to persist
};

// Combining individual reducers into the root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
});

// Exporting the root reducer with persistence configuration
export default persistReducer(rootPersistConfig, rootReducer);
