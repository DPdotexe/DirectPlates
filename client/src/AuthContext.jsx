// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al caricamento del componente, verifica se ci sono informazioni di autenticazione nel localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // L'array delle dipendenze vuoto assicura che il useEffect venga eseguito solo una volta

  const login = (userData) => {
    setUser(userData);

    // Salva le informazioni di autenticazione nel localStorage al momento del login
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    // Rimuovi le informazioni di autenticazione dal localStorage al momento del logout
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
