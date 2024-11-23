import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";
import {IOrderItem} from "../../../types";

export const placeOrderDish = createAsyncThunk<void, IOrderItem>(
  'cart/placeOrderDish',
  async (orderDish) => {
    await axiosAPI.post<IOrderItem>('orderDish.json', {...orderDish});
  }
);

export const fetchOrdersFromAPI = createAsyncThunk<IOrderItem, void>(
  'cart/fetchOrdersFromAPI',
 async () => {
   const response: {data: IOrderItem} = await axiosAPI.get<IOrderItem>(`orderDish/.json`);
   console.log(response.data);
   return response.data || null;
  }
);
