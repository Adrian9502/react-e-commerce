// Import the function to create a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart, which starts as an empty array
const initialState = [];

// Create a slice for the cart
const cartSlice = createSlice({
  // Name of the slice, which is like naming a section in your store
  name: "cart",

  // The initial state of this slice, which is empty at the start
  initialState,

  // Define the actions and how they change the state
  reducers: {
    // Action to add an item to the cart
    addToCart(state, action) {
      // Log the action to the console (useful for debugging)
      // Add the item from the action to the state
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// Export the action to be used in other parts of the application
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
