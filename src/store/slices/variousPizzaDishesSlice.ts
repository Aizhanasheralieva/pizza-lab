import {createSlice} from "@reduxjs/toolkit";
import {addNewPizzaDish} from "../thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import {RootState} from "../../app/store.ts";

interface variousPizzaDishesState {
    dishes: IPizzaDishes[],
    loadings: {
        fetchingDishes: boolean;
        addingDish: boolean;
    }
}
const initialState: variousPizzaDishesState = {
   dishes: [],
    loadings: {
       fetchingDishes: false,
        addingDish: false,
    }
};

export const selectAddPizzaDishLoading = (state: RootState) => state.variousPizzaDishes.loadings.addingDish;
export const selectFetchPizzaDishLoading = (state: RootState) => state.variousPizzaDishes.loadings.fetchingDishes;

export const variousPizzaDishesSlice = createSlice({
   name: 'variousPizzaDishes',
   initialState,
   reducers: {},
    extraReducers: (builder) => {
       builder
           .addCase(addNewPizzaDish.pending, (state) => {
               state.loadings.addingDish = true;
           })
           .addCase(addNewPizzaDish.fulfilled, (state) => {
               state.loadings.addingDish = false;
           })
           .addCase(addNewPizzaDish.rejected, (state) => {
               state.loadings.addingDish = false;
           });
    }
});

export const variousPizzaDishesReducer = variousPizzaDishesSlice.reducer;
// export const {} = variousPizzaDishesSlice.actions;

