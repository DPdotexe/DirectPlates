// Cart.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../actions/cartActions';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [cartItems]);

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ index, newQuantity }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.product?.price?.replace('$', '');
      const parsedPrice = itemPrice ? parseFloat(itemPrice) : 0;
      return total + parsedPrice * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <Link to="/">
          <FaTimes />
        </Link>
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
                    <span className="item-name">{item.product?.dish}</span>
                    <span className="item-price">{item.product?.price}</span>
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
                  {item.product?.imageUrl && (
                    <img src={item.product.imageUrl} alt={item.product.dish} className="cart-item-image" />
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
