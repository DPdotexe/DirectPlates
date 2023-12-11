import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';  // Updated import statement

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
