import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Menu.css';

const Menu = () => {
  const dispatch = useDispatch();

  const menuItems = [
    {
      dish: 'Spaghetti Bolognese',
      description: 'Classic Italian pasta with rich meat sauce',
      price: '$12.99',
      imageUrl: 'url_del_tuo_immagine_spaghetti',
    },
    {
      dish: 'Margherita Pizza',
      description: 'Fresh tomato, mozzarella, and basil',
      price: '$14.99',
      imageUrl: 'url_del_tuo_immagine_pizza',
    },
    {
      dish: 'Chicken Alfredo',
      description: 'Creamy Alfredo sauce with grilled chicken',
      price: '$16.99',
      imageUrl: 'url_del_tuo_immagine_alfredo',
    },
    {
      dish: 'Caesar Salad',
      description: 'Fresh romaine lettuce, croutons, and Caesar dressing',
      price: '$9.99',
      imageUrl: 'url_del_tuo_immagine_caesar',
    },
    {
      dish: 'Lasagna',
      description: 'Layers of pasta, meat sauce, and cheese baked to perfection',
      price: '$15.99',
      imageUrl: 'url_del_tuo_immagine_lasagna',
    },
    // Add more menu items...
  ];

  const handleAddToCart = (item) => {
    const cartItem = {
      name: item.dish, // Usa il nome del piatto come chiave 'name'
      price: item.price,
    };

    dispatch(addToCart(cartItem));

    // Notifica l'aggiunta al carrello
    toast.success(`${item.dish} aggiunto al carrello!`, { position: 'top-right', autoClose: 3000 });
  };

  return (
    <div className="menu-container">
      <Helmet>
        <title>Menu - Your App Name</title>
      </Helmet>

      <h1 className="menu-title">Menu</h1>
      <div className="cards-container">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-card">
            <h2 className="dish-title">{item.dish}</h2>
            <p className="description">{item.description}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.dish} className="dish-image" />}
            <p className="price">{item.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
