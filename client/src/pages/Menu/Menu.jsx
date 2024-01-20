  // Menu.jsx
  import React, { useEffect, useState } from 'react';
  import { Helmet } from 'react-helmet-async';
  import { useDispatch } from 'react-redux';
  import { addToCart } from '../../actions/cartActions';
  import { toast } from 'react-toastify';
  import axios from 'axios';
  import { useAuth } from './../../AuthContext'; 
  import 'react-toastify/dist/ReactToastify.css';
  import './Menu.css';

  const Menu = () => {
    // Redux dispatch hook
    const dispatch = useDispatch();
    // Authentication context
    const { user } = useAuth();
  
    // State to store the user ID
    const [userId, setUserId] = useState(null);
  
    // Effect to update the user ID when the user changes
    useEffect(() => {
      if (user) {
        setUserId(user.userId);
      }
    }, [user]);
  
    // Menu items categorized by type
    const menuItems = {
      firstCourses: [
        {
          id: 'P1',
          dish: 'Spaghetti Carbonara',
          description: 'Classic Roman pasta with a rich sauce of eggs, cheese, guanciale.',
          price: '$12.99',
          imageUrl: '../images/pastacarbonara.png',
        },
        {
          id: 'P2',
          dish: 'Fusilli Bolognese',
          description: 'Classic Italian pasta with rich meat sauce and tomatoes.',
          price: '$14.99',
          imageUrl: '../images/pastabolognese.png',
        },
        {
          id: 'P3',
          dish: 'Seafood Noodles',
          description: 'Shrimp, calamari, fish, and noodles in a flavorful broth.',
          price: '$15.99',
          imageUrl: '../images/seafoodnoodles.png',
        },
        {
          id: 'P4',
          dish: 'Ramen',
          description: 'Japanese noodle soup with savory broth, topped with veggies, eggs.',
          price: '$18.99',
          imageUrl: '../images/ramen.png', 
        },
      ],
      mainCourses: [
        {
          id: 'P5',
          dish: 'Fried Chicken',
          description: 'Crispy and succulent fried chicken, a delightful classic.',
          price: '$16.99',
          imageUrl: '../images/friedchicken.png',
        },
        {
          id: 'P6',
          dish: 'Beef Steak',
          description: 'Juicy and flavorful grilled beef served with golden crispy potatoes.',
          price: '$18.99',
          imageUrl: '../images/beefsteak.png',
        },
        {
          id: 'P7',
          dish: 'Grilled Salmon',
          description: 'Flavorful and tender grilled salmon, a seafood delight.',
          price: '$24.99',
          imageUrl: '../images/grilledsalmon.png', 
        },
        {
          id: 'P8',
          dish: 'Vegetable Stir-Fry',
          description: 'A colorful blend of crisp, stir-fried vegetables.',
          price: '$14.99',
          imageUrl: '../images/vegetablestir-fry.png',
        },
      ],
      desserts: [
        {
          id: 'P9',
          dish: 'Tiramisu',
          description: 'Coffee-infused mascarpone layers—Italian delight.',
          price: '$8.99',
          imageUrl: '../images/tiramisu.png',
        },
        {
          id: 'P10',
          dish: 'Strawberry Cheesecake',
          description: 'Creamy cheesecake, sweet strawberries—pure bliss.',
          price: '$10.99',
          imageUrl: '../images/strawberrycheesecake.png',
        },
        {
          id: 'P11',
          dish: 'Panna Cotta',
          description: 'Italian custard dessert topped with caramel sauce.',
          price: '$7.99',
          imageUrl: '../images/pannacotta.png', 
        },
        {
          id: 'P12',
          dish: 'Apple Pie',
          description: 'Sweet apples, cinnamon, golden crust—a timeless favorite.',
          price: '$8.99',
          imageUrl: '../images/applepie.png', 
        },
      ],
      pizzas: [
        {
          id: 'P13',
          dish: 'Margherita Pizza',
          description: 'Fresh tomatoes, creamy mozzarella, and aromatic basil on a thin.',
          price: '$14.99',
          imageUrl: '../images/margheritapizza.png',
        },
        {
          id: 'P14',
          dish: 'Salami Pizza',
          description: 'Salami slices, tomato sauce, melted mozzarella on a golden crust.',
          price: '$16.99',
          imageUrl: '../images/salamipizza.png',
        },
        {
          id: 'P15',
          dish: 'Seafood Pizza',
          description: 'Shrimp, calamari, mussels on a tomato-cheese melody',
          price: '$15.99',
          imageUrl: '../images/seafoodpizza.png', 
        },
        {
          id: 'P16',
          dish: 'Vegetarian Pizza',
          description: 'Assorted vegetables and cheese on a thin crust',
          price: '$20.99',
          imageUrl: '../images/vegetarianpizza.png',
        },
      ],
      beverages: [
        {
          id: 'P17',
          dish: 'Water',
          description: 'Pure, refreshing water to quench your thirst.',
          price: '$2.49',
          imageUrl: '../images/bottleofwater.png',
        },
        {
          id: 'P18',
          dish: 'Pepsi',
          description: 'The classic refreshment with irresistible bubbles.',
          price: '$2.99',
          imageUrl: '../images/pepsi.png',
        },
        {
          id: 'P19',
          dish: 'Coca-Cola',
          description: 'An iconic classic, refreshing and invigorating. ',
          price: '$1.49',
          imageUrl: '../images/coca-cola.png', 
        },
        {
          id: 'P20',
          dish: 'Coffee',
          description: ' Bold flavor, rich aroma. Your perfect companion for moments of delight',
          price: '$3.49',
          imageUrl: '../images/coffee.png', 
        },
      ],
    };
    
 
      // Function to handle adding items to the cart
  const handleAddToCart = async (item) => {
    // Check if the item has a valid ID
    if (!item.id) {
      console.error('The item object does not have a "id" property defined:', item);
      return;
    }

    // Create a cart item object
    const cartItem = {
      product: {
        id: item.id,
        dish: item.dish,
        price: item.price,
        imageUrl: item.imageUrl,
      },
      quantity: 1,
    };

    // If the user is authenticated, update Redux state and make a backend call
    if (user) {
      dispatch(
        addToCart({
          product: cartItem.product,
          quantity: cartItem.quantity,
          userId: user.userId,
        })
      );

      try {
        // Make a POST request to the backend to add the item to the cart
        const response = await axios.post('https://direct-places.onrender.com/cart/add', {
          userId: user.userId,
          product: cartItem.product,
          quantity: cartItem.quantity,
        });

        // Display a success toast notification
        toast.success(`${item.dish} added to the cart!`, { position: 'top-right', autoClose: 3000 });
      } catch (error) {
        // Handle errors during the backend call
        console.error('Error adding to the cart:', error);

        if (error.response) {
          console.error('Error details:', error.response.data);
        }
      }
    } else {
      // If the user is not authenticated, update local storage for the cart
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex((p) => p.product.id === cartItem.product.id);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Update Redux state for non-authenticated users
      dispatch(
        addToCart({
          product: cartItem.product,
          quantity: cartItem.quantity,
          userId: null,
        })
      );
    }
  };

    return (
      <div className="menu-container">
        <Helmet>
          <title>Menu - Your App Name</title>
        </Helmet>

        <h1 className="menu-title">Menu</h1>

        {/* First Courses Section */}
        <div className="menu-section">
          <h2 className="section-title">First Courses</h2>
          <div className="cards-container">
            {menuItems.firstCourses.map((item, index) => (
              <div key={index} className="menu-card">
                <h3 className="dish-name">{item.dish}</h3>
                <p className="description">{item.description}</p>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.dish} className="menu-image" />
                )}
                <p className="price">{item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Courses Section */}
        <div className="menu-section">
          <h2 className="section-title">Main Courses</h2>
          <div className="cards-container">
            {menuItems.mainCourses.map((item, index) => (
              <div key={index} className="menu-card">
                <h3 className="dish-name">{item.dish}</h3>
                <p className="description">{item.description}</p>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.dish} className="menu-image" />
                )}
                <p className="price">{item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Desserts Section */}
        <div className="menu-section">
          <h2 className="section-title">Desserts</h2>
          <div className="cards-container">
            {menuItems.desserts.map((item, index) => (
              <div key={index} className="menu-card">
                <h3 className="dish-name">{item.dish}</h3>
                <p className="description">{item.description}</p>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.dish} className="menu-image" />
                )}
                <p className="price">{item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pizzas Section */}
        <div className="menu-section">
          <h2 className="section-title">Pizzas</h2>
          <div className="cards-container">
            {menuItems.pizzas.map((item, index) => (
              <div key={index} className="menu-card">
                <h3 className="dish-name">{item.dish}</h3>
                <p className="description">{item.description}</p>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.dish} className="menu-image" />
                )}
                <p className="price">{item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Beverages Section */}
        <div className="menu-section">
          <h2 className="section-title">Beverages</h2>
          <div className="cards-container">
            {menuItems.beverages.map((item, index) => (
              <div key={index} className="menu-card">
                <h3 className="dish-name">{item.dish}</h3>
                <p className="description">{item.description}</p>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.dish} className="menu-image" />
                )}
                <p className="price">{item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Menu;
