import { createContext } from "react";
import { IPokemonData } from "../api/api.ts";

export interface IPokemonContext {
  selectedPokemon: IPokemonData | null;
  selectPokemon: (name: string) => Promise<boolean>;
  deleteSelectedPokemon: () => void;
  loading: boolean;
  error: string;
}

export const PokemonContext = createContext<IPokemonContext>({
  selectedPokemon: null,
  selectPokemon: async () => false,
  deleteSelectedPokemon: () => {},
  loading: false,
  error: ""
});
