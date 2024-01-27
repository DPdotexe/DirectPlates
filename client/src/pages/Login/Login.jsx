import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './../../AuthContext';
import Loader from './Loader'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError(null);

    try {
      setLoading(true); // Set loader to true before fetching

      const response = await Axios.post(
        'https://direct-plates-server.onrender.com/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const { username, userId, token } = response.data;

      // Perform login and pass the user object to the authentication context
      login({ username, userId, token });
      
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false); // Set loader to false after fetching completes
    }
  };

  const handleKeyDown = (e) => {
    // If the "Enter" key is pressed, perform login
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Login - DirectPlates</title>
      </Helmet>

      <h2 className="header">Login</h2>
      {loading && <Loader />} {/* Show loader during loading */}
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
      <label className="label">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown}
        disabled={loading} 
      />
      <button onClick={handleLogin} className="button" disabled={loading}>
        Login
      </button>
      <p className="signup-link">
        Don't have an account? <Link to="/signup" className="signup-link-text">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;
