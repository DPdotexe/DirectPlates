
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

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle placing an order
  const handlePlaceOrder = async () => {
    try {
      // Check if a payment method is selected
      if (!orderData.paymentMethod) {
        throw new Error('Please select a payment method.');
      }

      // Retrieve user data from local storage
      const storedUserData = localStorage.getItem('user');
      const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

      // Check if the user is authenticated
      if (!storedUser || !storedUser.token) {
        throw new Error('User not authenticated.');
      }

      // Determine the selected shipping address
      const selectedAddress = orderData.newShippingAddress || orderData.shippingAddress;

      // Check if a shipping address is provided
      if (!selectedAddress) {
        throw new Error('Please fill in the shipping address.');
      }

      // Prepare data for the order request
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

      // Send the order request to the server
      const response = await axios.post('https://direct-places.onrender.com/orders', data, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Received order response:', response.data);

      // Check if the response contains a 'message' field
      if (response.data.message === 'Order created successfully') {
        console.log('Order placed successfully!');

        // Set the order status and reset order data
        setOrderStatus({ success: true, error: null });
        setOrderData({ shippingAddress: '', newShippingAddress: '', paymentMethod: '' });

        console.log('Before dispatching clearCart');

        // Dispatch the action to clear the cart
        dispatch(clearCart());

        // Redirect the user after a short delay
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        console.log('Order placement failed:', response.data.message);

        // Handle the error if necessary
        setOrderStatus({ success: false, error: response.data.message });
      }
    } catch (error) {
      console.error('Error placing order:', error.message);

      // Log additional information if available
      if (error.response) {
        console.log('Response data from server:', error.response.data);
      }

      // Set the order status to indicate failure
      setOrderStatus({ success: false, error: error.message });
    }
  };

  // Effect to redirect the user after a successful order placement
  useEffect(() => {
    if (orderStatus.success) {
      console.log('Order success! Redirecting after 3 seconds...');

      // Set a timeout to redirect the user after 3 seconds
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 3000);

      // Clear the timeout when the component is unmounted
      return () => clearTimeout(redirectTimeout);
    }
  }, [orderStatus.success, navigate]);

  // JSX structure for the Checkout component
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
