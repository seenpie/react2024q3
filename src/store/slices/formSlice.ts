import { createSlice } from "@reduxjs/toolkit";
import { FormState, FormPayloadAction } from "@/models";

const initialState: FormState = {
  formHook: [],
  formUncontrolled: []
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormHookData: (state, action: FormPayloadAction) => {
      state.formHook.push(action.payload);
    },
    setFormUncontrolledData: (state, action: FormPayloadAction) => {
      state.formUncontrolled.push(action.payload);
    }
  }
});

export const { setFormHookData, setFormUncontrolledData } = formSlice.actions;

export const formSliceReducer = formSlice.reducer;
