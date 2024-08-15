import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { formSliceReducer } from "@/store/slices/formSlice.ts";
import { countriesSliceReducer } from "@/store/slices/countriesSlice.ts";

const rootReducer = combineReducers({
  form: formSliceReducer,
  countries: countriesSliceReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
