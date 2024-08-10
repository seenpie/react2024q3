import { PokeAPI } from "pokeapi-types";

export interface IResourceList extends PokeAPI.NamedAPIResourceList {}
export interface IResource extends PokeAPI.NamedAPIResource {}
export interface IPokemonSpecies extends PokeAPI.PokemonSpecies {}
export interface IPokemon extends PokeAPI.Pokemon {}

export interface IPageParams {
  totalItems: number;
  offset: number;
  limit: number;
}

export interface ISelectedItemData {
  name: string;
  height: number;
  weight: number;
  type: string;
  experience: number;
  image: string;
}

export interface IPageData {
  itemList: IResource[];
  pageParams: IPageParams;
  selectedItem: ISelectedItemData | null;
}
