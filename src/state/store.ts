"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { favoritePokemonListSlice } from "./favoritePokemonList/favoritePokemonListSlice.ts";
import { pokemonApi } from "./pokemonApi.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  favoritePokemonList: favoritePokemonListSlice.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware)
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppState = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppState["getState"]>;
export type AppDispatch = AppState["dispatch"];
