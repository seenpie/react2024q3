import React, { PropsWithChildren } from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import ThemeProvider from "@/context/ThemeContext/ThemeProvider.tsx";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { favoritePokemonListSlice, pokemonApi } from "@/state";

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

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}
