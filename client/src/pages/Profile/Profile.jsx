import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import Loader from '../../components/Loader';
import './Profile.css';

const Profile = () => {
  // State to manage user profile data
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    phoneNumber: '',
  });

  // State to manage edit mode, loading state, and errors
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile data from localStorage on component mount
  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;

    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        address: userProfile.address || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    } else {
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

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const storedUserData = localStorage.getItem('user');
      const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

      // Check for authentication
      if (!storedUser || !storedUser.token) {
        console.error('Token is missing. User not authenticated.');
        return;
      }

      // Send a PUT request to update user profile on the server
      const response = await axios.put(
        'https://direct-plates-server.onrender.com/users/updateProfile',
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

      // Update state after a successful response
      setFormData({
        ...formData,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
      });

      // Update localStorage with new profile data
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
        <title>{`${formData.username}'s Profile - DirectPlates`}</title>
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
          disabled={isLoading} 
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
            disabled={!isEditMode || isLoading} 
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
            disabled={!isEditMode || isLoading} 
          />
        </div>

        {!isEditMode ? (
          <button type="button" onClick={() => setIsEditMode(true)} disabled={isLoading}>
            <FaEdit /> Edit
          </button>
        ) : (
          <button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        )}
        {isLoading && <Loader />} {/* Show the loader during save */}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Profile;
