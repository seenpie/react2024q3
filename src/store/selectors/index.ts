import { RootState } from "@/store/store.ts";

export const selectHookForm = (state: RootState) => state.form.formUncontrolled;
export const selectUncontrolledForm = (state: RootState) =>
  state.form.formUncontrolled;
export const selectCountries = (state: RootState) => state.countries;
