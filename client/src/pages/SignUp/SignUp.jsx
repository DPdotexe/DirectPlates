// SignUp.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './../../AuthContext';
import Loader from '../../components/Loader/Loader';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async () => {
    setError(null);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      return;
    }

    try {
      setLoading(true); // Set loader to true before fetching

      const response = await Axios.post(
        'https://direct-plates-server.onrender.com/auth/register',
        { email, username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        login({ username, userId: response.data.userId, token: response.data.token });
        navigate('/login');
      } else {
        setError('Error during registration. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === 'User already registered'
      ) {
        setError('User already registered. Please log in or use a different email address.');
      } else {
        setError('Error during registration. Please try again.');
      }
    } finally {
      setLoading(false); // Set loader to false after fetching completes
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
        <title>Registration - DirectPlates</title>
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
        disabled={loading} 
      />
      <label className="label">Username:</label>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown}
        disabled={loading} 
      />
      <label className="label">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown}
        disabled={loading} 
      />
      <label className="label">Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown}
        disabled={loading} 
      />
      <button onClick={handleSignup} className="button" disabled={loading}>
        Sign Up
      </button>
      {loading && <Loader />} {/* Show loader during loading */}
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
