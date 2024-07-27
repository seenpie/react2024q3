import { configureStore } from "@reduxjs/toolkit";
import { favoritePokemonListSlice } from "./favoritePokemonList/favoritePokemonListSlice.ts";
import { pageDataSlice } from "./pageData/pageDataSlice.ts";
import { pokemonApi } from "./pokemonApi.ts";

export const state = configureStore({
  reducer: {
    favoritePokemonList: favoritePokemonListSlice.reducer,
    pageData: pageDataSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware)
});

export type RootState = ReturnType<typeof state.getState>;
export type AppDispatch = typeof state.dispatch;
