// CheckOut.jsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useAuth } from './../../AuthContext';
import { clearCart } from '../../actions/cartActions';
import './CheckOut.css';

const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useAuth();
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const [orderData, setOrderData] = useState({
    shippingAddress: userProfile?.address || '',
    newShippingAddress: '',
    paymentMethod: '',
  });
  const [orderStatus, setOrderStatus] = useState({ success: false, error: null });
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    try {
      if (!orderData.paymentMethod) {
        throw new Error('Please select a payment method.');
      }

      const storedUserData = localStorage.getItem('user');
      const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

      if (!storedUser || !storedUser.token) {
        throw new Error('User not authenticated.');
      }

      const selectedAddress = orderData.newShippingAddress || orderData.shippingAddress;

      if (!selectedAddress) {
        throw new Error('Please fill in the shipping address.');
      }

      const data = {
        customer: storedUser.userId,
        products: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: parseFloat(item.product.price.replace('$', '')),
        })),
        shippingAddress: selectedAddress,
        paymentMethod: orderData.paymentMethod,
      };

      console.log('Sending order request with data:', data);

      const response = await axios.post('http://localhost:3000/orders', data, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Received order response:', response.data);

      // Verifica se la risposta contiene un campo 'message'
      if (response.data.message === 'Order created successfully') {
        console.log('Order placed successfully!');

        setOrderStatus({ success: true, error: null });
        setOrderData({ shippingAddress: '', newShippingAddress: '', paymentMethod: '' });

        console.log('Before dispatching clearCart');
        dispatch(clearCart());

        // Reindirizza l'utente dopo un breve ritardo
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        console.log('Order placement failed:', response.data.message);

        // Aggiungi il codice per gestire l'errore se necessario
        setOrderStatus({ success: false, error: response.data.message });
      }
    } catch (error) {
      console.error('Error placing order:', error.message);

      if (error.response) {
        console.log('Response data from server:', error.response.data);
      }

      setOrderStatus({ success: false, error: error.message });
    }
  };

  useEffect(() => {
    if (orderStatus.success) {
      console.log('Order success! Redirecting after 3 seconds...');

      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 3000);

      // Pulisci il timeout quando il componente viene smontato
      return () => clearTimeout(redirectTimeout);
    }
  }, [orderStatus.success, navigate]);

  return (
    <div className="checkout-container">
      <Helmet>
        <title>Checkout - Your App Name</title>
      </Helmet>

      <h2>Checkout</h2>

      {!orderStatus.success && cartItems.length === 0 && (
        <p>Your cart is empty. Add items to proceed to checkout.</p>
      )}

      {orderStatus.success && (
        <div className="order-success-message">
          <p className="success-text">
            <span role="img" aria-label="Check Mark">
              ✔️
            </span>{' '}
            Order placed successfully! Thank you for your purchase.
          </p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div>
          <div className="shipping-section">
            <h3>Shipping Address</h3>
            {userProfile && userProfile.address && (
              <>
                <label>
                  <input
                    type="radio"
                    name="shippingAddress"
                    value={userProfile.address}
                    checked={orderData.shippingAddress === userProfile.address}
                    onChange={handleInputChange}
                  />
                  {userProfile.address}
                </label>
                <br />
              </>
            )}
            <input
              type="text"
              name="newShippingAddress"
              placeholder="Enter your shipping address"
              value={orderData.newShippingAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={orderData.paymentMethod === 'creditCard'}
                onChange={handleInputChange}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={orderData.paymentMethod === 'paypal'}
                onChange={handleInputChange}
              />
              PayPal
            </label>
          </div>

          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}

      {!orderStatus.success && (
        <div className="back-to-cart">
          <Link to="/">Back to Home</Link>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
