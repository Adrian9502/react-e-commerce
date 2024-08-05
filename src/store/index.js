// Import the function to create a Redux store and our cart reducer
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart-slice";

// Create the store using Redux
const store = configureStore({
  // Define the "reducer" property which tells Redux how to manage different pieces of state
  reducer: {
    // Here, "cart" is the name of the state slice, and cartReducer is the function that handles the state for "cart"
    cart: cartReducer,
  },
});

// Export the store so it can be used in other parts of the application
export default store;
