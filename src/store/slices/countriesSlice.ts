import { countriesList } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: countriesList
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {}
});

export const countriesSliceReducer = countriesSlice.reducer;
