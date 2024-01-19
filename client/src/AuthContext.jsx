import React, { createContext, useContext, useEffect, useState } from 'react';

// Creating a context for authentication
const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to manage user authentication
  const [user, setUser] = useState(() => {
    // Retrieving user data from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to handle user login
  const login = (userData) => {
    // Updating the user state with the provided data
    setUser(userData);

    // Saving user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to handle user logout
  const logout = () => {
    // Clearing user data from the state
    setUser(null);

    // Removing user data from localStorage
    localStorage.removeItem('user');
  };

  // Context value with user data and authentication functions
  const contextValue = {
    user,
    login,
    logout,
  };

  // Providing the context value to the components
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw an error if used outside of AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
