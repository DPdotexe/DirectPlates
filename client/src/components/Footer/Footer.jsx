import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Copyright and Brand */}
        <div className="copyright">
          <p>&copy; 2023</p>
          <span className="brand">DP</span>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/daniele-p-099008241/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>

          {/* GitHub Icon */}
          <a href="https://github.com/DPdotexe" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
