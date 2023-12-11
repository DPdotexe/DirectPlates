// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = ({ onCartClick }) => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const [isCartOverlayVisible, setCartOverlayVisible] = useState(false);

  const handleCartClick = () => {
    setCartOverlayVisible(true);
    onCartClick && onCartClick();
  };

  const closeCartOverlay = () => {
    setCartOverlayVisible(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/menu" className="nav-button">
          Menu
        </Link>
        <Link to="/about" className="nav-button">
          About
        </Link>
        <Link to="/login" className="nav-button">
          Login
        </Link>
      </div>

      <div className="cart">
        <div className="cart-button" onClick={handleCartClick}>
          <IoCartOutline size={20} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
