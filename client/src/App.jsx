import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from './redux/store';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import SignUp from './pages/SignUp/SignUp';
import Cart from './components/Cart/Cart'; // Assicurati che Cart sia importato
import Checkout from './pages/CheckOut/CheckOut';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
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
            <Cart />
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
