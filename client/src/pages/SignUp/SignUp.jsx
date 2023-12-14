import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';

import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await Axios.post('http://localhost:3000/auth/register', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Gestisci la risposta, ad esempio, reindirizza alla pagina di login
    } catch (error) {
      console.error('Errore durante la registrazione:', error);

      if (error.response && error.response.status === 400 && error.response.data.error === 'User already registered') {
        setError('Utente già registrato. Accedi o utilizza un altro indirizzo email.');
      } else {
        setError('Errore durante la registrazione. Riprova.');
      }
    }
  };

  const handleKeyDown = (e) => {
    // Se il tasto "Invio" viene premuto, esegui la registrazione
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="signup-container">
      <Helmet>
        <title>Registration - Your App Name</title>
      </Helmet>

      <h2 className="header">Registration</h2>
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
      <label className="label">Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleSignup} className="button">
        Sign Up
      </button>
      <p className="login-link">
        Already have an account? <Link to="/login" className="login-link-text">Log in here</Link>.
      </p>
    </div>
  );
};

export default SignUp;
