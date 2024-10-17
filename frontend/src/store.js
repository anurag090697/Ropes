/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { ropesReducer } from "./slice";

const store = configureStore({
  reducer: {
    ropes: ropesReducer,
  },
});

export default store;
