import { createSlice } from '@reduxjs/toolkit';

// Creating a slice for authentication-related state management
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null, 
  },
  reducers: {
    // Reducer function for handling login action
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; 
      state.token = action.payload.token; 
    },
    // Reducer function for handling logout action
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

// Exporting actions for login and logout
export const { login, logout } = authSlice.actions;

// Exporting the reducer function
export default authSlice.reducer;
