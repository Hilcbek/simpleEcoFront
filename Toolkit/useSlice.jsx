import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    username: JSON.parse(localStorage.getItem("username")) || null,
    isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || null,
    profile: JSON?.parse(localStorage.getItem("profile")) || null,
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    LOGIN: (state, action) => {
      state.isAdmin = action.payload.isAdmin;
      state.username = action.payload.username;
      state.profile = action.payload.profile;
      localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
      localStorage.setItem("username", JSON.stringify(action.payload.username));
      localStorage.setItem("profile", JSON.stringify(action.payload.profile));
    },
    AddProdct: (state, action) => {
      if (state.products) {
        let result = state.products.find(
          (product) => product.id === action.payload.id
        );
        if (!result) {
          state.products.push(action.payload);
          state.quantity += 1;
        } else {
          result.quantity += 1;
        }
        state.total += action.payload.quantity * action.payload.price;
      }
    },
    UpdateAmount: (state, action) => {
      let result = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (action.payload.sign === "+") {
        result.quantity += 1;
        state.total += result.price;
      } else if (action.payload.sign === "-") {
        if (result.quantity === 1) {
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
        }
        result.quantity -= 1;
        state.total -= result.price;
      }
    },
    LOGOUT: (state) => {
      localStorage.clear();
      (state.username = ""), (state.isAdmin = null);
      state.products = [];
    },
    DeleteProduct: (state, action) => {
      let product = state.products.filter(
        (product) => product.id === action.payload
      );
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.total -= product[0].quantity * product[0].price;
      state.quantity -= 1;
    },
    Reset: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});
export let { LOGIN, LOGOUT, AddProdct, UpdateAmount, DeleteProduct, Reset } =
  UserSlice.actions;
export default UserSlice.reducer;
