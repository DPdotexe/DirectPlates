import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>,
);
