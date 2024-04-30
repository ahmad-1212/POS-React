import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add Item to cart
    addCartItem(state, action) {
      console.log(action.payload);
    },
    // Increase item quantity in cart
    increaseItemQuantity(state, action) {},
    // Decrease item quantity in cart
    decreaseItemQuantity(state, action) {},
    // Delete Item from the cart
    deleteItem(state, action) {},
    // Clear the cart
    clearCart(state, action) {},
  },
});

export const {
  addCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
