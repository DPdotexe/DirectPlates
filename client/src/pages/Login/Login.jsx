// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async'; // Importa Helmet da react-helmet-async
import './Login.css'; // Importa i tuoi stili CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Make the login request to your backend
      const response = await Axios.post('/api/login', { email, password });

      // Handle the response, e.g., save the access token in your state or cookies
      // Redirect the user to a protected page or the home page
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials. Please try again.');
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
      />
      <label className="label">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
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
