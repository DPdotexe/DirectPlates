// Payment.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = ({ handlePlaceOrder }) => {
  const [orderData, setOrderData] = useState({
    shippingAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!orderData.shippingAddress) {
        throw new Error('Please fill in all required fields.');
      }

      const cardElement = elements.getElement(CardElement);

      const { token, error } = await stripe.createToken(cardElement);
      if (error) {
        throw new Error(error.message);
      }

      handlePlaceOrder({
        shippingAddress: orderData.shippingAddress,
        stripeToken: token.id,
      });
    } catch (error) {
      console.error('Error processing payment:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="shipping-section">
          <h3>Shipping Address</h3>
          <input
            type="text"
            name="shippingAddress"
            placeholder="Enter your shipping address"
            value={orderData.shippingAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="payment-section">
          <h3>Payment Method</h3>
          <CardElement />
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Payment;
