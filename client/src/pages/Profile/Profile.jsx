// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    phoneNumber: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth.user) {
      setFormData({
        username: auth.user.username || '',
        address: auth.user.address || '',
        phoneNumber: auth.user.phoneNumber || '',
      });
    }
  }, [auth.user]);

  useEffect(() => {
    console.log('Token from AuthContext:', auth.token);

    // Assicurati che il token sia disponibile prima di effettuare la richiesta
    if (auth.token && isEditMode) {
      handleSave();
    }
  }, [auth.token, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setError(null);
      setIsLoading(true);
  
      // Controlla se il token è disponibile
      if (!auth.token) {
        console.error('Token is missing. User not authenticated.');
        return;
      }
  
      console.log('Token included in the request header:', auth.token);
  
      const response = await axios.put(
        'http://localhost:3000/users/profile',
        {
          address: formData.address,
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
  
      console.log('Response from the server:', response);
  
      setFormData({
        ...formData,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
      });
      setIsEditMode(false);
    } catch (error) {
      console.error('Error during save:', error);
  
      if (error.response) {
        console.error('Response data:', error.response.data);
  
        if (error.response.status === 401) {
          console.error('Unauthorized access. Redirect to login page.');
          auth.logout();
          // Aggiungi qui il codice per reindirizzare l'utente alla pagina di login
        }
  
        setError('An error occurred during save.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="profile-container">
      <Helmet>
        <title>{`${formData.username}'s Profile - Your App Name`}</title>
      </Helmet>

      <h1 className="profile-title">Profile</h1>

      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} readOnly />

        <div className="address-container">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address here..."
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditMode}
          />
        </div>

        <div className="phone-container">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number..."
            value={formData.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEditMode}
          />
        </div>

        {!isEditMode ? (
          <button type="button" onClick={() => setIsEditMode(true)}>
            <FaEdit /> Edit
          </button>
        ) : (
          <button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        )}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Profile;
