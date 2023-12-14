import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../actions/cartActions';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ onCloseCart }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ index, newQuantity }));
    }
  };

  const handleCloseCart = () => {
    onCloseCart && onCloseCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity,
      0
    );
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
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price}</span>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="item-quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  )}
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
