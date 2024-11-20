import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";

export const addNewPizzaDish = createAsyncThunk<void, IPizzaDishesForm>(
    'variousPizzaDishes/addNewPizzaDish',
  async (pizzaDishToAdd) => {
    await axiosAPI.post('variousPizzaDishes.json', {...pizzaDishToAdd});
  }
);