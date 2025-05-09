import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  length: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.length += action.payload.quantity;
    },

    removeFromCart: (state, action) => {
      const removedItem = state.items.find(item => item.productId === action.payload);
      if (removedItem) {
        state.length -= removedItem.quantity;
      }
      state.items = state.items.filter(item => item.productId !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        state.length += quantity - item.quantity;
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
