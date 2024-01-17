import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './../../AuthContext'; // Assicurati di importare correttamente il tuo contesto di autenticazione
import './Home.css';

const Home = () => {
  const { user } = useAuth(); // Assicurati di avere un hook useAuth() o simile per ottenere lo stato di autenticazione

  // Funzione per determinare il percorso corretto in base allo stato di autenticazione
  const getOrderNowPath = () => {
    if (user) {
      // Utente autenticato, reindirizza a /menu
      return '/menu'; // Sostituisci con il percorso desiderato per gli utenti autenticati
    } else {
      // Utente non autenticato, reindirizza a /signup
      return '/signup';
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Home - Your App Name</title>
        {/* Altri tag head possono essere impostati qui */}
      </Helmet>

      <div className="home-container">
        <h1 className="home-title">Welcome to Our Food Delivery App</h1>
        <p className="home-description">
          Explore a variety of delicious dishes delivered to your doorstep.
        </p>

        <div className="call-to-action">
          <Link to="/menu" className="menu-button">
            Explore the Menu
          </Link>
        </div>
      </div>

      {/* Container con l'immagine principale in alto a destra */}
      <div className="image-order">
        <img src="/images/foodorder.jpg" alt="Background" className="image" />
      </div>

      {/* Container con l'immagine del delivery in basso a sinistra */}
      <div className="delivery-imagine">
        <img src="/images/foodelivery.jpg" alt="Delivery Background" className="delivery-image" />
      </div>

      <div className="delivery-container">
        <h1 className="delivery-title">Fast and Reliable Delivery</h1>
        <p className="delivery-description">
          Experience quick and reliable delivery services to enjoy your favorite meals.
        </p>
        <div className="call-to-action">
          <Link to={getOrderNowPath()} className="register-button">
            Order now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

