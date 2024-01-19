import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './../../AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  const getOrderNowPath = () => {
    if (user) {
      // Authenticated user, redirect to /menu
      return '/menu';
    } else {
      // Non-authenticated user, redirect to /signup
      return '/signup';
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Home - DirectPlates</title>
        {/* Other head tags can be set here */}
      </Helmet>

      <div className="home-container">
        <h1 className="home-title">Welcome to DirectPlates!</h1>
        <p className="home-description">
          Explore a variety of delicious dishes delivered to your doorstep.
        </p>

        <div className="call-to-action">
          <Link to="/menu" className="menu-button">
            Explore the Menu
          </Link>
        </div>
      </div>

      {/* Container with the main image on the top right */}
      <div className="image-order">
        <img src="/images/foodorder.jpg" alt="Background" className="image" />
      </div>

      {/* Container with the delivery image on the bottom left */}
      <div className="delivery-imagine">
        <img src="/images/foodelivery.jpg" alt="Delivery Background" className="delivery-image" />
      </div>

      <div className="delivery-container">
        <h1 className="delivery-title">Fast and Reliable Delivery</h1>
        <p className="delivery-description">
          Experience quick and reliable delivery services to enjoy your favorite meals.
        </p>
        <div className="call-to-action">
          <Link to={getOrderNowPath()} className="register-button">
            Order now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
