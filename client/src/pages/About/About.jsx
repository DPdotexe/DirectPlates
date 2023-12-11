// About.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Utilize Helmet to set the page title */}
      <Helmet>
        <title>About Us - Your App Name</title>
      </Helmet>

      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to DP's Food Delivery App! We are passionate about delivering
        delicious food right to your doorstep. Our chefs use the finest
        ingredients to create mouth-watering dishes that will satisfy your
        cravings. Enjoy the convenience of ordering from us and experience
        exceptional flavors with every bite.
      </p>
    </div>
  );
};

export default About;
