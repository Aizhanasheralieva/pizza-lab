import { configureStore } from "@reduxjs/toolkit";
import { variousPizzaDishesReducer } from "../store/slices/variousPizzaDishesSlice.ts";
import { cartReducer } from "../store/slices/pizzaDishesCartSlice.ts";
import {ordersReducer} from "../store/slices/ordersSlice.ts";

export const store = configureStore({
  reducer: {
    variousPizzaDishes: variousPizzaDishesReducer,
    orderDish: cartReducer,
    ordersPizza: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
