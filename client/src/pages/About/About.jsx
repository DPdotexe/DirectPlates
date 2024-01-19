import React from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';

// About component to display information about the application
const About = () => {
  return (
    <div className="about-container">
      {/* Helmet for dynamic page title */}
      <Helmet>
        <title>About Us - DirectPlates</title>
      </Helmet>

      {/* Main content of the About page */}
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to DirectPlates, your go-to destination for a delightful food delivery experience! We are dedicated to bringing delectable dishes directly to your doorstep. Our chefs meticulously craft each dish using the finest ingredients to ensure a mouth-watering culinary experience that satisfies your every craving. Embrace the convenience of ordering with us and indulge in exceptional flavors with every bite.
      </p>
    </div>
  );
};

export default About;
