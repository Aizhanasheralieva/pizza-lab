import { configureStore } from "@reduxjs/toolkit";
import { variousPizzaDishesReducer } from "../store/slices/variousPizzaDishesSlice.ts";
import { cartReducer } from "../store/slices/pizzaDishesCartSlice.ts";

export const store = configureStore({
  reducer: {
    variousPizzaDishes: variousPizzaDishesReducer,
    orderDish: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
