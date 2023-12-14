import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../actions/cartActions';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa Link da react-router-dom

import './Cart.css';

const Cart = ({ onCloseCart }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleCloseCart = () => {
    onCloseCart && onCloseCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button className="close-cart" onClick={handleCloseCart}>
          <FaTimes />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price}</span>
                </div>
                <button className="remove-item" onClick={() => handleRemoveFromCart(index)}>
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total: ${calculateTotal().toFixed(2)}</span>
            <Link to="/checkout">
              <button className="checkout-button">Check Out</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
