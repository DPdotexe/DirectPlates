import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);

    // Salvataggio nel localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    console.log('User logged in:', userData); // Aggiunto log di debug
  };

  const logout = () => {
    setUser(null);

    // Rimozione dal localStorage
    localStorage.removeItem('user');

    console.log('User logged out'); // Aggiunto log di debug
  };

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
