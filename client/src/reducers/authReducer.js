// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null, // Aggiunto il campo token
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; 
      state.token = action.payload.token; // Aggiunto il salvataggio del token durante il login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null; // Pulisci anche il token durante il logout
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
