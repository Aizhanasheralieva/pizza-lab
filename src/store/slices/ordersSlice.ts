import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchOrdersFromAPI} from "../thunks/PizzaOrdersThunks/PizzaOrdersThunks.ts";
import {RootState} from "../../app/store.ts";
import {fetchAllPizzaDishes, fetchOnePizzaDishById} from "../thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import {IPizzaDishes} from "../../types";

interface IOrderItem {
  [dishId: string]: number;
}

interface OrdersState {
  orders: {[orderId: string]: IOrderItem};
  loading: boolean;
}

const initialState: OrdersState = {
  orders: {},
  loading: false,
};

export const selectAllOrders = (state: RootState) =>
  state.ordersPizza.orders;
export const selectOrdersLoading = (state: RootState) => state.ordersPizza.loading;

const ordersSlice = createSlice({
  name: 'ordersPizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersFromAPI.fulfilled, (state, action: PayloadAction<{[orderId: string]: IOrderItem}>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersFromAPI.rejected, (state) => {
        state.loading = false;
      }) ;
  }
});
export const ordersReducer = ordersSlice.reducer;
