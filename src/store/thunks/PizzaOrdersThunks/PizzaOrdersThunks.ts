import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";
import {IOrderItem} from "../../../types";

export const placeOrderDish = createAsyncThunk<void, IOrderItem>(
  'cart/placeOrderDish',
  async (orderDish) => {
    await axiosAPI.post<IOrderItem>('orderDish.json', {...orderDish});
  }
);