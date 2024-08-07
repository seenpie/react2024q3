import { IPokemon } from "@/state/interfaces.ts";
import { ISelectedItemData } from "@/state/pageData/interfaces.ts";

export const mockState = {
  favoritePokemonList: {
    pokemonList: []
  },
  pageData: {
    itemList: [],
    pageParams: {
      offset: 0,
      totalItems: 0,
      limit: 0
    },
    selectedItem: null
  }
};

export const detailPokemonData: IPokemon = {
  name: "pikachu",
  base_experience: 0,
  weight: 0,
  height: 0,
  types: [
    {
      slot: 1,
      type: {
        url: "",
        name: "normal"
      }
    }
  ]
} as IPokemon;

export const parsedDetailPokemonData: ISelectedItemData = {
  name: detailPokemonData.name,
  happiness: detailPokemonData.base_experience,
  weight: detailPokemonData.weight,
  height: detailPokemonData.height,
  image: "",
  type: detailPokemonData.types[0].type.name
};