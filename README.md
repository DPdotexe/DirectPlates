# DirectPlates - Food Delivery App

Welcome to DirectPlates, your go-to food delivery solution designed to provide you with a seamless culinary experience. Order your favorite dishes from our restaurant's menu right from the comfort of your home.

## Key Features

- **Menu Exploration:**
  - Browse our diverse menu with a wide selection of delicious dishes.
  - View details such as ingredients and prices

- **Cart Management:**
  - Easily add your favorite dishes to the cart.
  - Modify item quantities or remove them at any time.

  **Cart Interaction:**
  - Increase or decrease the quantity of items in the cart effortlessly.
  - Remove items from the cart with a simple action.

- **User Account:**
  - Register to order our menu.

  **Additional User Profile Features:**
  - Once logged in, users can access their profile.
  - Add an address and phone number for future orders.
  - The address will be securely saved for convenient future deliveries.

- **Secure Authentication:**
  - Safeguard your account with a secure authentication system based on JSON Web Token (JWT).

- **Intuitive Experience:**
  - Modern and intuitive user interface for effortless navigation.
  - Responsive design for a seamless experience on both desktop and mobile devices.

  **Fully Responsive Design:**
  - Enjoy a consistent and user-friendly experience across various devices.
  - Burger menu for easy navigation on smaller screens.

## Technologies Used

- **Frontend:**
  - React with Vite for a fast development experience.
  - Redux for state management.
  - Axios for making HTTP calls to the backend.

- **Backend:**
  - Node.js as the runtime environment.
  - Express as the web framework for handling HTTP requests.
  - MongoDB as the database, managed through Mongoose for object modeling.
  - JSON Web Token (JWT) for user authentication.

## Installation and Startup

To order your favorite dishes, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/DirectPlates.git
   cd DirectPlates
   
2. Install dependencies:
 ```bash
cd client && npm install
cd server && npm install
 ```
3. Create a .env file in the server directory with the following variables:

```vbnet
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Note: Replace your_mongodb_connection_string and your_jwt_secret with your specific MongoDB connection string and JWT secret.

4. Start the client and server in development mode simultaneously:
   ```bash
   npm start
This command uses concurrently to start both the client and server concurrently.

5. The app will be available at http://localhost:3000

