// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing Redux store and persistor
import { store, persistor } from './redux/store';

// Importing authentication context provider
import { AuthProvider } from './AuthContext';

// Importing components and pages
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import SignUp from './pages/SignUp/SignUp';
import Cart from './components/Cart/Cart';
import Checkout from './pages/CheckOut/CheckOut';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';

// Main App component
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AuthProvider>
            {/* Navigation bar */}
            <Navbar />
            <Routes>
              {/* Routing for different pages */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            {/* Footer */}
            <Footer />
            {/* Toast notification container */}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
