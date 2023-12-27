// insertMenuItems.js

const mongoose = require('mongoose');
const Product = require('./models/Product'); // Assicurati che il percorso sia corretto

const menuItems = {
  firstCourses: [
    {
      dish: 'Spaghetti Carbonara',
      description: 'Classic Roman pasta with a rich sauce of eggs, cheese, guanciale.',
      price: '$12.99',
      imageUrl: '../images/pastacarbonara.png',
    },
    {
      dish: 'Fusilli Bolognese',
      description: 'Classic Italian pasta with rich meat sauce and tomatoes.',
      price: '$14.99',
      imageUrl: '../images/pastabolognese.png',
    },
    {
      dish: 'Seafood Noodles',
      description: 'Shrimp, calamari, fish, and noodles in a flavorful broth.',
      price: '$15.99',
      imageUrl: '../images/seafoodnoodles.png',
    },
    {
      dish: 'Ramen',
      description: 'Japanese noodle soup with savory broth, topped with veggies, eggs.',
      price: '$18.99',
      imageUrl: '../images/ramen.png',
    },
  ],
  mainCourses: [
    {
      dish: 'Fried Chicken',
      description: 'Crispy and succulent fried chicken, a delightful classic.',
      price: '$16.99',
      imageUrl: '../images/friedchicken.png',
    },
    {
      dish: 'Beef Steak',
      description: 'Juicy and flavorful grilled beef served with golden crispy potatoes.',
      price: '$18.99',
      imageUrl: '../images/beefsteak.png',
    },
    {
      dish: 'Grilled Salmon',
      description: 'Flavorful and tender grilled salmon, a seafood delight.',
      price: '$24.99',
      imageUrl: '../images/grilledsalmon.png',
    },
    {
      dish: 'Vegetable Stir-Fry',
      description: 'A colorful blend of crisp, stir-fried vegetables.',
      price: '$14.99',
      imageUrl: '../images/vegetablestir-fry.png',
    },
  ],
  desserts: [
    {
      dish: 'Tiramisu',
      description: 'Coffee-infused mascarpone layers—Italian delight.',
      price: '$8.99',
      imageUrl: '../images/tiramisu.png',
    },
    {
      dish: 'Strawberry Cheesecake',
      description: 'Creamy cheesecake, sweet strawberries—pure bliss.',
      price: '$10.99',
      imageUrl: '../images/strawberrycheesecake.png',
    },
    {
      dish: 'Panna Cotta',
      description: 'Italian custard dessert topped with caramel sauce.',
      price: '$7.99',
      imageUrl: '../images/pannacotta.png',
    },
    {
      dish: 'Apple Pie',
      description: 'Sweet apples, cinnamon, golden crust—a timeless favorite.',
      price: '$8.99',
      imageUrl: '../images/applepie.png',
    },
  ],
  pizzas: [
    {
      dish: 'Margherita Pizza',
      description: 'Fresh tomatoes, creamy mozzarella, and aromatic basil on a thin.',
      price: '$14.99',
      imageUrl: '../images/margheritapizza.png',
    },
    {
      dish: 'Salami Pizza',
      description: 'Salami slices, tomato sauce, melted mozzarella on a golden crust.',
      price: '$16.99',
      imageUrl: '../images/salamipizza.png',
    },
    {
      dish: 'Seafood Pizza',
      description: 'Shrimp, calamari, mussels on a tomato-cheese melody',
      price: '$15.99',
      imageUrl: '../images/seafoodpizza.png',
    },
    {
      dish: 'Vegetarian Pizza',
      description: 'Assorted vegetables and cheese on a thin crust',
      price: '$20.99',
      imageUrl: '../images/vegetarianpizza.png',
    },
  ],
  beverages: [
    {
      dish: 'Water',
      description: 'Pure, refreshing water to quench your thirst.',
      price: '$2.49',
      imageUrl: '../images/bottleofwater.png',
    },
    {
      dish: 'Pepsi',
      description: 'The classic refreshment with irresistible bubbles.',
      price: '$2.99',
      imageUrl: '../images/pepsi.png',
    },
    {
      dish: 'Coca-Cola',
      description: 'An iconic classic, refreshing and invigorating. ',
      price: '$1.49',
      imageUrl: '../images/coca-cola.png',
    },
    {
      dish: 'Coffee',
      description: 'Bold flavor, rich aroma. Your perfect companion for moments of delight',
      price: '$3.49',
      imageUrl: '../images/coffee.png',
    },
  ],
};

async function insertMenuItems() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
    });

    for (const category in menuItems) {
      for (const menuItem of menuItems[category]) {
        const product = new Product({
          dish: menuItem.dish,
          description: menuItem.description,
          price: parseFloat(menuItem.price.replace('$', '')),
          imageUrl: menuItem.imageUrl,
        });

        await product.save();
      }
    }

    console.log('Menu items inserted successfully!');
  } catch (error) {
    console.error('Error inserting menu items:', error);
  } finally {
    mongoose.disconnect();
  }
}

insertMenuItems();
