import { createAction } from '@reduxjs/toolkit';

// Definisci le azioni qui
export const addToCart = createAction('cart/addToCart');
export const removeFromCart = createAction('cart/removeFromCart');
// Aggiungi altre azioni se necessario
