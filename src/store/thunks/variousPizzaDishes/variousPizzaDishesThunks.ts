import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";

export const addNewPizzaDish = createAsyncThunk<void, IPizzaDishesForm>(
    'variousPizzaDishes/addNewPizzaDish',
  async (pizzaDishToAdd) => {
    await axiosAPI.post('variousPizzaDishes.json', {...pizzaDishToAdd});
  }
);

export const fetchAllPizzaDishes = createAsyncThunk<IPizzaDishesFromAPI[], void>(
    'variousPizzaDishes/fetchAllPizzaDishes',
    async () => {
        const response: {data: IPizzaDishesFromAPI} = await axiosAPI<IPizzaDishesFromAPI | null>('variousPizzaDishes.json');

        if(response.data) {
            const pizzaDishesInObject = response.data;
            return Object.keys(pizzaDishesInObject).map((pizzaDishId) => {
                return {
                    ...pizzaDishesInObject[pizzaDishId],
                    id: pizzaDishId,
                };
            });
        }
        return [];
    }
);

export const deletePizzaDishById = createAsyncThunk<void, string>(
    'variousPizzaDishes/deletePizzaDishById',
    async (pizzaDishId) => {
        await axiosAPI.delete(`variousPizzaDishes/${pizzaDishId}.json`);
    }
);