// profileActions.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Azione asincrona per l'aggiornamento del profilo
export const updateProfileAsync = createAsyncThunk(
  'profile/updateProfileAsync',
  async ({ userId, ...newData }) => {
    try {
      const response = await axios.put(`/users/${userId}/profile`, newData);
      // Puoi ritornare i dati ricevuti dal server se necessario
      return response.data;
    } catch (error) {
      // Puoi gestire gli errori qui, ad esempio lanciando un'eccezione o ritornando un oggetto di errore
      throw error;
    }
  }
);

// Slice del profilo
const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    username: '',
    address: '',
    phoneNumber: '',
  },
  reducers: {
    // Altre azioni sincrone possono essere mantenute qui
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUsername: (state, action) => {
      return { ...state, username: action.payload };
    },
  },
  extraReducers: (builder) => {
    // Aggiungi un reducer per l'azione asincrona
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      // Aggiorna lo stato con i dati ricevuti dal server dopo l'aggiornamento del profilo
      return { ...state, ...action.payload };
    });
  },
});

export const { updateProfile, updateUsername } = profileSlice.actions;
export default profileSlice.reducer;
