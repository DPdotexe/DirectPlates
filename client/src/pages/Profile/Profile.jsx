import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    phoneNumber: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Recupera l'utente memorizzato da localStorage
    const storedUserProfile = localStorage.getItem('userProfile');
    const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;

    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        address: userProfile.address || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    } else {
      // Se non ci sono informazioni salvate, recupera l'utente da localStorage
      const storedUserData = localStorage.getItem('user');
      const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

      if (storedUser) {
        setFormData({
          username: storedUser.username || '',
          address: storedUser.address || '',
          phoneNumber: storedUser.phoneNumber || '',
        });
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const storedUserData = localStorage.getItem('user');
      const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

      if (!storedUser || !storedUser.token) {
        console.error('Token is missing. User not authenticated.');
        return;
      }

      const response = await axios.put(
        'http://localhost:3000/users/updateProfile',
        {
          userId: storedUser.userId,
          username: formData.username,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
          withCredentials: true,
        }
      );

      console.log('Response from the server:', response);

      // Aggiorna lo stato dopo una risposta positiva
      setFormData({
        ...formData,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
      });

      // Aggiorna il localStorage con i nuovi dati del profilo
      localStorage.setItem('userProfile', JSON.stringify({
        ...formData,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
      }));

      setIsEditMode(false);
    } catch (error) {
      console.error('Error during save:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);

        if (error.response.status === 401) {
          console.error('Unauthorized access. Redirect to login page.');
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
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

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
