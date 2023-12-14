// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import SignUp from './pages/SignUp/SignUp';
import Cart from './components/Cart/Cart';
import Checkout from './pages/CheckOut/CheckOut';



const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/menu"
              element={<Menu addToCart={addToCart} removeFromCart={removeFromCart} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Aggiunta la nuova route */}
          </Routes>
          {isCartOpen && (
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} onCloseCart={handleCloseCart} />
          )}

          <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
