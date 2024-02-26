import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

export const myStore = configureStore({
  reducer: {
    todos: todoSlice,
  },
});
