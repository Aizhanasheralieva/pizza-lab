import {configureStore} from "@reduxjs/toolkit";
import {variousPizzaDishesReducer} from "../store/slices/variousPizzaDishesSlice.ts";

export const store = configureStore({
    reducer: {
        variousPizzaDishes: variousPizzaDishesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;