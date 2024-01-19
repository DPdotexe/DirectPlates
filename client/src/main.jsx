import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Get the root element from the document
const rootElement = document.getElementById('root');

// Use createRoot to render the app into the root element
createRoot(rootElement).render(
  // Wrap the app with HelmetProvider for managing document head changes
  <HelmetProvider>
    {/* Provide the Redux store to the entire app */}
    <Provider store={store}>
      {/* Render the main App component */}
      <App />
    </Provider>
  </HelmetProvider>,
);
