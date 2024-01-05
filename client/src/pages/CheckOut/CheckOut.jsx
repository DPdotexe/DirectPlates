import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Cookies from 'js-cookie'; // Importa la libreria js-cookie
import { useAuth } from './../../AuthContext';
import './CheckOut.css';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { user, token, setToken } = useAuth(); // Aggiungi setToken dal tuo AuthContext
  const [orderData, setOrderData] = useState({
    shippingAddress: '',
    paymentMethod: '',
  });
  const [orderStatus, setOrderStatus] = useState({ success: false, error: null });

  useEffect(() => {
    // Ottieni il token dai cookies all'inizio del rendering del componente
    const tokenFromCookie = Cookies.get('DPCookie');
    
    // Se il token è presente nei cookies, imposta il token nel tuo contesto di autenticazione
    if (tokenFromCookie && !token) {
      setToken(tokenFromCookie);
    }
  }, [token, setToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    try {
      if (!orderData.shippingAddress || !orderData.paymentMethod) {
        throw new Error('Please fill in all required fields.');
      }

      const userId = user ? user.userId : null;

      if (!userId) {
        throw new Error('User not authenticated.');
      }

      const requestData = {
        customer: userId,
        products: cartItems.map((item) => ({ product: item.productId, quantity: item.quantity })),
      };

      if (!token) {
        console.error('Token is undefined. Cannot make the request.');
        // Gestire l'errore o tornare indietro
      } else {
        console.log('Token included in headers:', token);

        const response = await axios.post('http://localhost:3000/orders', requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Se l'ordine è stato piazzato con successo, imposta il token nei cookies
        if (response.data.success) {
          Cookies.set('DPCookie', token, { expires: 1 / 3 }); // Imposta la scadenza dei cookies come 8 ore
        }
      }

      console.log('Order placed successfully:', response.data);
      setOrderStatus({ success: true, error: null });
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus({ success: false, error: error.message });
    }
  };

  return (
    <div className="checkout-container">
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
              name="shippingAddress"
              placeholder="Enter your shipping address"
              value={orderData.shippingAddress}
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

          {orderStatus.success && (
            <div className="order-success-message">
              <p>Order placed successfully! Thank you for your purchase.</p>
            </div>
          )}

          {orderStatus.error && (
            <div className="order-error-message">
              <p>Error placing order: {orderStatus.error}</p>
            </div>
          )}
        </div>
      )}

      <div className="back-to-cart">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Checkout;
