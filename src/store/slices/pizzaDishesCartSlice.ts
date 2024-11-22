import { IPizzaDishes, PizzaDishesCart } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";

interface PizzaDishesCartState {
  pizzaDishesCart: PizzaDishesCart[];
  selectedDish: PizzaDishesCart | null;
}

const initialState: PizzaDishesCartState = {
  pizzaDishesCart: [],
  selectedDish: null,
};

export const selectPizzaCartDishes = (state: RootState) =>
  state.cart.pizzaDishesCart;
export const selectSelectedDish = (state: RootState) => state.cart.selectedDish;

const pizzaDishesCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<IPizzaDishes>) => {
      const indexDish = state.pizzaDishesCart.findIndex(
        (dishCart) => dishCart.dish.id === dish.id,
      );
      if (indexDish === -1) {
        state.pizzaDishesCart.push({ dish, amount: 1 });
      } else {
        const cartCopy = [...state.pizzaDishesCart];
        const copyDishCart = { ...cartCopy[indexDish] };
        copyDishCart.amount++;
        cartCopy[indexDish] = copyDishCart;
        state.pizzaDishesCart = [...cartCopy];
      }
    },
    setSelectedDish: (
      state,
      { payload }: PayloadAction<PizzaDishesCart | null>,
    ) => {
      state.selectedDish = payload;
    },
    clearCart: (state) => {
      state.pizzaDishesCart = [];
    },
  },
});

export const cartReducer = pizzaDishesCartSlice.reducer;
export const { addDish, setSelectedDish, clearCart } =
  pizzaDishesCartSlice.actions;