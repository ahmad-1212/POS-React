import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add Item to cart
    addCartItem(state, action) {
      console.log(action.payload);
      const item = state.items.find(item => item.id === action.payload.id);
      console.log(item);
      if (item) {
        cartSlice.caseReducers.increaseItemQuantity(state, action);
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          price: +action.payload.price,
        });
        state.totalPrice += +action.payload.price;
      }
    },
    // Increase item quantity in cart
    increaseItemQuantity(state, action) {
      const item = state.items.find(itm => itm.id === action.payload.id);
      item.quantity++;
      state.totalPrice += item.price;
    },
    // Decrease item quantity in cart
    decreaseItemQuantity(state, action) {
      const item = state.items.find(itm => itm.id === action.payload.id);
      if (item.quantity === 1) {
        state.totalPrice -= item.price;
        return cartSlice.caseReducers.deleteItem(state, action);
      }

      item.quantity--;
      state.totalPrice -= item.price;
    },
    // Delete Item from the cart
    deleteItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
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
