import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './../../AuthContext'; // Importa il contesto di autenticazione
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa la funzione di login dal contesto di autenticazione

// Dopo aver ricevuto il token dalla risposta del server nel tuo componente di gestione dell'autenticazione

const handleLogin = async () => {
  try {
    const response = await Axios.post('http://localhost:3000/auth/login', { email, password });

    // Assicurati che la risposta contenga il token, l'ID utente e l'username
    const { username, userId, token } = response.data;

    // Esegui il login e passa l'oggetto utente al contesto di autenticazione
    login({ username, userId, token });

    // Salva il token nel LocalStorage
    localStorage.setItem('token', token);

    // Aggiungi un log per verificare la presenza del token nella console
    console.log('Token salvato:', token);

    // Redirect l'utente a una pagina protetta o alla home
    navigate('/');
  } catch (error) {
    console.error('Error during login:', error);
    setError('Invalid credentials. Please try again.');
  }
};

  const handleKeyDown = (e) => {
    // Se viene premuto il tasto "Enter", esegui il login
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
