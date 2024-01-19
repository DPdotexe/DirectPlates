import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoCartOutline, IoChevronDown } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from './../../AuthContext';
import { openCart } from '../../actions/cartActions';
import './Navbar.css';

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const { user, logout } = useAuth();
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [greeting, setGreeting] = useState('Welcome!');
  const [justRegistered, setJustRegistered] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Update greeting based on user and profile changes
    if (user) {
      setGreeting(`Hello, ${profile && profile.username ? profile.username : user.username}`);
    } else {
      setGreeting('Welcome!');
    }
  }, [user, profile]);

  const handleCartClick = () => {
    dispatch(openCart());
    navigate('/cart');
  };

  const handleLogout = () => {
    setJustRegistered(false);
    logout();
    setDropdownVisible(false);
    navigate('/');
  };

  useEffect(() => {
    // Update greeting after user registration
    if (profile && justRegistered) {
      setGreeting(`Hello, ${profile.username}`);
    }
  }, [profile, justRegistered]);

  const isLoginPage = location.pathname === '/login';

  return (
    <nav className={`navbar${isMobileMenuOpen ? ' mobile-menu-open' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img
            src="/images/directplates.png"
            alt="DirectPlates Logo"
            className="logo-image"
          />
        </Link>
        <Link to="/">DirectPlates</Link>
      </div>
      <div className="burger-menu" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
      <div className="nav-center">
        {/* Navigation Links */}
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/menu" className="nav-button">
          Menu
        </Link>
        <Link to="/about" className="nav-button">
          About
        </Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            {isLoginPage ? (
              null
            ) : (
              <>
                {/* User Dropdown */}
                <div className="nav-username" onClick={() => setDropdownVisible(!isDropdownVisible)}>
                  {greeting} <IoChevronDown />
                  {isDropdownVisible && (
                    <div className="overlay" onClick={() => setDropdownVisible(false)}></div>
                  )}
                  {isDropdownVisible && (
                    <div className="dropdown-content">
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setDropdownVisible(false)}
                      >
                        Profile
                      </Link>
                      <span className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <Link to="/login" className="nav-button">
            Login
          </Link>
        )}
        {/* Shopping Cart */}
        <div className="cart">
          <div className="cart-button" onClick={handleCartClick}>
            <IoCartOutline size={30} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </div>
      {/* Mobile Menu Links */}
      <div
        className={`nav-links${isMobileMenuOpen ? ' open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/menu" className="nav-button">
          Menu
        </Link>
        <Link to="/about" className="nav-button">
          About
        </Link>
        {user && (
          <>
            <Link to="/profile" className="nav-button">
              Profile
            </Link>
            <Link to="/cart" className="nav-button">
            Cart
            </Link>
            <span className="nav-button" onClick={handleLogout}>
              Logout
            </span>
          </>
        )}
        {!user && (
          <Link to="/login" className="nav-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
