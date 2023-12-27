// SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './../../AuthContext';
import './SignUp.css';

const SignUp = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await Axios.post(
        'http://localhost:3000/auth/register',
        { email, username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Esegui il login solo se la registrazione è riuscita
      if (response.status === 201) {
        // Reindirizza alla pagina di login
        navigate('/login');
      } else {
        setError('Errore durante la registrazione. Riprova.');
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
  
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === 'User already registered'
      ) {
        setError(
          'Utente già registrato. Accedi o utilizza un altro indirizzo email.'
        );
      } else {
        setError('Errore durante la registrazione. Riprova.');
      }
    }
  };

  const handleKeyDown = (e) => {
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
      <label className="label">Username:</label>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        Already have an account?{' '}
        <Link to="/login" className="login-link-text">
          Log in here
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUp;
