import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
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

  useEffect(() => {
    if (user) {
      if (justRegistered) {
        setGreeting('Welcome!');
      } else {
        setGreeting(`Hello, ${profile && profile.username ? profile.username : user.username}`);
      }
    } else {
      setGreeting('Welcome!');
    }
  }, [user, profile, justRegistered]);

  const handleCartClick = () => {
    dispatch(openCart());
    navigate('/cart');
  };

  const handleLogin = () => {
    setJustRegistered(false);
  };

  useEffect(() => {
    // Controlla se profile è definito e l'utente è appena stato registrato
    if (profile && justRegistered) {
      setGreeting(`Hello, ${profile.username}`);
    }
  }, [profile, justRegistered]);

  const isLoginPage = location.pathname === '/login';

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
        {user ? (
          <>
            {isLoginPage ? (
              <Link to="/login" className="nav-button">
                Login
              </Link>
            ) : (
              <>
                <Link to="/profile" className="nav-username" onClick={handleLogin}>
                  {greeting}
                </Link>
                <span className="nav-button logout-button" onClick={logout}>
                  Logout
                </span>
              </>
            )}
          </>
        ) : (
          <Link to="/login" className="nav-button">
            Login
          </Link>
        )}
      </div>

      <div className="cart">
        <div className="cart-button" onClick={handleCartClick}>
          <IoCartOutline size={30} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
