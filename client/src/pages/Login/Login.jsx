import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Make a login request to your backend
      const response = await Axios.post('http://localhost:3000/auth/login', { email, password });

      // Handle the response, for example, save the access token in your state or cookies
      // Redirect the user to a protected page or the home
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials. Please try again.');
    }
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
