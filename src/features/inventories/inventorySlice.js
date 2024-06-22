import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kitchen: [],
  main: [],
};

const inventorySlice = createSlice({
  initialState,
  name: 'inventorySlice',
  reducers: {
    addItem(state, action) {
      const { isMain } = action.payload;
      if (isMain) {
        console.log(action.payload);
        const isExists = state.main.find(itm => itm.id === action.payload.id);
        if (isExists) {
          isExists.quantity = action.payload.quantity;
        } else {
          state.main.push(action.payload);
        }
      }
      if (!isMain) {
        const isExists = state.kitchen.find(
          itm => itm.id === action.payload.id,
        );
        if (isExists) {
          isExists.quantity = action.payload.quantity;
        } else {
          state.kitchen.push(action.payload);
        }
      }
    },

    clearInventoryCart() {
      return initialState;
    },
  },
});

export const { addItem, clearInventoryCart } = inventorySlice.actions;
export default inventorySlice.reducer;
