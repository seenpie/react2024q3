import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { favoritePokemonListSlice } from "./favoritePokemonList/favoritePokemonListSlice.ts";
import { pokemonApi } from "./pokemonApi.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  favoritePokemonList: favoritePokemonListSlice.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState
  });
  setupListeners(store.dispatch);
  return store;
};

export const state = setupStore();

export type AppState = typeof state;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof state.dispatch;
