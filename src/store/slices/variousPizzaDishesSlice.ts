import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addNewPizzaDish,
  deletePizzaDishById,
  fetchAllPizzaDishes,
  fetchOnePizzaDishById,
} from "../thunks/variousPizzaDishes/variousPizzaDishesThunks.ts";
import { RootState } from "../../app/store.ts";

interface variousPizzaDishesState {
  dishes: IPizzaDishes[];
  onePizza: IPizzaDishes | null;
  loadings: {
    fetchingDishes: boolean;
    onePizzaLoading: booolean;
    addingDish: boolean;
    deleteDish: boolean;
  };
}
const initialState: variousPizzaDishesState = {
  dishes: [],
  onePizza: null,
  loadings: {
    fetchingDishes: false,
    onePizzaLoading: false,
    addingDish: false,
    deleteDish: false,
  },
};

export const selectAddPizzaDishLoading = (state: RootState) =>
  state.variousPizzaDishes.loadings.addingDish;
export const selectFetchPizzaDishLoading = (state: RootState) =>
  state.variousPizzaDishes.loadings.fetchingDishes;
export const selectDeletePizzaDishLoading = (state: RootState) =>
  state.variousPizzaDishes.loadings.deleteDish;
export const selectAllPizzaDishes = (state: RootState) =>
  state.variousPizzaDishes.dishes;
export const selectOnePizza = (state: RootState) =>
  state.variousPizzaDishes.onePizza;

export const variousPizzaDishesSlice = createSlice({
  name: "variousPizzaDishes",
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
      })
      .addCase(fetchAllPizzaDishes.pending, (state) => {
        state.loadings.fetchingDishes = true;
      })
      .addCase(
        fetchAllPizzaDishes.fulfilled,
        (state, action: PayloadAction<IPizzaDishes[]>) => {
          state.loadings.fetchingDishes = false;
          state.dishes = action.payload.reverse();
        },
      )
      .addCase(fetchAllPizzaDishes.rejected, (state) => {
        state.loadings.fetchingDishes = false;
      })
      .addCase(deletePizzaDishById.pending, (state) => {
        state.loadings.deleteDish = true;
      })
      .addCase(deletePizzaDishById.fulfilled, (state) => {
        state.loadings.deleteDish = false;
      })
      .addCase(deletePizzaDishById.rejected, (state) => {
        state.loadings.deleteDish = false;
      })
      .addCase(fetchOnePizzaDishById.pending, (state) => {
        state.loadings.onePizzaLoading = true;
      })
      .addCase(
        fetchOnePizzaDishById.fulfilled,
        (state, action: PayloadAction<IPizzaDishes>) => {
          state.loadings.onePizzaLoading = false;
          state.onePizza = action.payload;
        },
      )
      .addCase(fetchOnePizzaDishById.rejected, (state) => {
        state.loadings.onePizzaLoading = false;
      });
  },
});

export const variousPizzaDishesReducer = variousPizzaDishesSlice.reducer;
// export const {} = variousPizzaDishesSlice.actions;
