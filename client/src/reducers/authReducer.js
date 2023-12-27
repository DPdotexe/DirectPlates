// authReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, // Aggiungi un campo per memorizzare le informazioni dell'utente
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Memorizza le informazioni dell'utente dopo il login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; // Resetta le informazioni dell'utente dopo il logout
    },
  },
});

export const { login, logout } = authSlice.actions;

// Usa la proprietà 'reducer' del slice come riduttore
export default authSlice.reducer;
