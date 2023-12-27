import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from './../../AuthContext';
import { openCart } from '../../actions/cartActions';
import './Navbar.css';

const Navbar = ({ onCartClick }) => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Stato di autenticazione cambiato:', user);
  }, [user]);

  const handleCartClick = () => {
    console.log('Icona del carrello cliccata');

    console.log('Dispatching openCart...');
    dispatch(openCart());

    onCartClick && onCartClick();
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
        {user ? (
          <>
            <span className="nav-username">Hello, {user.username}</span>
            <span className="nav-button logout-button" onClick={logout}>
              Logout
            </span>
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
