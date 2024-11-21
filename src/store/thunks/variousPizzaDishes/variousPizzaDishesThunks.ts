import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";

export const addNewPizzaDish = createAsyncThunk<void, IPizzaDishesForm>(
    'variousPizzaDishes/addNewPizzaDish',
  async (pizzaDishToAdd) => {
    await axiosAPI.post('variousPizzaDishes.json', {...pizzaDishToAdd});
  }
);

export const fetchOnePizzaDishById = createAsyncThunk<IPizzaDishesForm, string>(
    'variousPizzaDishes/fetchOnePizzaDishById',
    async (id: string) => {
       const response = await axiosAPI.get<IPizzaDishesForm>(`variousPizzaDishes/${id}.json`);
    return response.data || null;
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

export const updatePizza = createAsyncThunk<void, {pizzaDishId: string, pizza: IPizzaDishesFromAPI}>(
    'variousPizzaDishes/updatePizzaDishById',
    async ({pizzaDishId, pizza}) => {
        const response = await axiosAPI.put(`variousPizzaDishes/${pizzaDishId}.json`, pizza);

        return response.data;
    }
);