import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFavoritePokemonListState {
  pokemonList: string[];
}

const initialState: IFavoritePokemonListState = {
  pokemonList: []
};

export const favoritePokemonListSlice = createSlice({
  name: "favoritePokemonList",
  initialState,
  reducers: {
    addPokemonToList: (state, action: PayloadAction<string>) => {
      state.pokemonList.push(action.payload);
    },
    removePokemonFromList: (state, action: PayloadAction<string>) => {
      state.pokemonList = state.pokemonList.filter(
        (pokemon) => pokemon !== action.payload
      );
    },
    cleanPokemonList: (state) => {
      state.pokemonList = [];
    }
  }
});

export const { addPokemonToList, removePokemonFromList, cleanPokemonList } =
  favoritePokemonListSlice.actions;
