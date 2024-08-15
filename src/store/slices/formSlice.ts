import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData, FormState } from "@/models";

const initialState: FormState = {
  formHook: [],
  formUncontrolled: []
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormHookData: (state, action: PayloadAction<FormData>) => {
      state.formHook.push(action.payload);
    },
    setFormUncontrolledData: (state, action: PayloadAction<FormData>) => {
      state.formUncontrolled.push(action.payload);
    }
  }
});

export const { setFormHookData, setFormUncontrolledData } = formSlice.actions;

export const formSliceReducer = formSlice.reducer;
