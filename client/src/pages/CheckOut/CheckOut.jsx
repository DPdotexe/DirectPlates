// Checkout.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet from react-helmet-async
import './CheckOut.css'; 

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePlaceOrder = () => {
    // Implement logic to place the order
    // You can use the cartItems, shippingAddress, and paymentMethod here
    console.log('Placing order...');
  };

  return (
    <div className="checkout-container">
      {/* Use Helmet to set the title dynamically */}
      <Helmet>
        <title>Checkout - Your App Name</title>
      </Helmet>

      <h2>Checkout</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add items to proceed to checkout.</p>
      ) : (
        <div>
          <div className="shipping-section">
            <h3>Shipping Address</h3>
            <input
              type="text"
              placeholder="Enter your shipping address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>
            <label>
              <input
                type="radio"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => setPaymentMethod('creditCard')}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
              />
              PayPal
            </label>
          </div>

          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}

      <div className="back-to-cart">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Checkout;
