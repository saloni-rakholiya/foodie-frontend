import { createSlice } from "@reduxjs/toolkit";
import Cart from "./cart";

const initialState = { cart: new Cart() };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.totalQty += 1;
      let storedItem = state.cart.items[action.payload._id];
      if (!storedItem) {
        storedItem = state.cart.items[action.payload._id] = {
          item: action.payload,
          qty: 0,
          price: 0,
        };
      }
      storedItem.qty++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      state.cart.totalPrice += storedItem.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
