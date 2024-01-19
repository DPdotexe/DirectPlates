import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  SET_CART_ITEMS,
  OPEN_CART,
  CLEAR_CART, 
} from '../actions/cartActions';

// Initial state for the cart
const initialState = {
  items: [],
  isCartOpen: false,
};

// Reducer function to manage the cart state
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for adding an item to the cart
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload.product],
      };

    // Case for removing an item from the cart
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload.index),
      };

    // Case for updating the quantity of an item in the cart
    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.index
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };

    // Case for setting the cart items
    case SET_CART_ITEMS:
      return {
        ...state,
        items: action.payload.items,
      };

    // Case for opening the cart
    case OPEN_CART:
      return {
        ...state,
        isCartOpen: true,
      };

    // Case for clearing the cart
    case CLEAR_CART:
      return {
        ...state,
        items: [], 
      };

    // Default case, returns the current state
    default:
      return state;
  }
};

// Exporting the cart reducer function
export default cartReducer;
