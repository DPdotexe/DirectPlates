import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Azione asincrona per ottenere il profilo utente dal backend
export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}/profile`);
    return response.data;
  } catch (error) {
    // Puoi gestire gli errori qui
    throw error;
  }
});

const initialState = {
  profiles: {},        // Un oggetto che conterrà i profili utente
  currentUserId: null,  // ID dell'utente corrente
  status: 'idle',       // Stato dell'operazione asincrona
  error: null,          // Eventuale errore nell'operazione asincrona
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    updateProfile: (state, action) => {
      const { userId, profileData } = action.payload;
      state.profiles[userId] = { ...state.profiles[userId], ...profileData };
    },
    updateUsername: (state, action) => {
      const { userId, username } = action.payload;
      state.profiles[userId] = { ...state.profiles[userId], username };
    },
  },
  extraReducers: (builder) => {
    // Azioni asincrone generate da createAsyncThunk
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Aggiorna il profilo utente solo se l'utente corrente è lo stesso dell'azione
      if (state.currentUserId === action.payload.userId) {
        state.profiles[state.currentUserId] = { ...state.profiles[state.currentUserId], ...action.payload.profileData };
      }
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { setCurrentUserId, updateProfile, updateUsername } = profileSlice.actions;
export default profileSlice.reducer;
