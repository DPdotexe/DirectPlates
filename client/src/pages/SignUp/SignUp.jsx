// SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async'; // Importa React Helmet

import './SignUp.css'; // Importa i tuoi stili CSS

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      // Make the signup request to your backend
      const response = await Axios.post('/api/signup', { email, password });

      // Handle the response, e.g., redirect to login page
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Error during registration. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <Helmet>
        <title>Sign Up - Your Name App</title>
      </Helmet>

      <h2 className="header">Register</h2>
      {error && <p className="error">{error}</p>}
      <label className="label">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <label className="label">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <label className="label">Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleSignup} className="button">
        Sign Up
      </button>
      <p className="login-link">
        Already have an account? <Link to="/login" className="login-link-text">Login here</Link>.
      </p>
    </div>
  );
};

export default SignUp;
