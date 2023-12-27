import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './../../AuthContext'; // Import the authentication context
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await Axios.post('http://localhost:3000/auth/login', { email, password });
  
      // Assicurati che la risposta contenga il token, l'ID utente e l'username
      const { username, userId, token } = response.data;
  
      // Salva il token nei cookie o in localStorage
      saveTokenToStorage(token);

      // Esegui il login e passa l'oggetto utente al contesto di autenticazione
      login({ username, userId, token });
  
      // Redirect l'utente a una pagina protetta o alla home
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  // Funzione per salvare il token nei cookie o in localStorage
  const saveTokenToStorage = (token) => {
    // Puoi scegliere se utilizzare cookie o localStorage a seconda delle tue esigenze
    // Esempio di utilizzo localStorage:
    localStorage.setItem('token', token);
  };
  

  const handleKeyDown = (e) => {
    // If the "Enter" key is pressed, perform the login
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Login - Your App Name</title>
      </Helmet>

      <h2 className="header">Login</h2>
      {error && <p className="error">{error}</p>}
      <label className="label">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown}
      />
      <label className="label">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleLogin} className="button">
        Login
      </button>
      <p className="signup-link">
        Don't have an account? <Link to="/signup" className="signup-link-text">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;
