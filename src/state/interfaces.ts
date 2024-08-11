import { PokeAPI } from "pokeapi-types";

export interface IResourceList extends PokeAPI.NamedAPIResourceList {}
export interface IResource extends PokeAPI.NamedAPIResource {}
export interface IPokemonSpecies extends PokeAPI.PokemonSpecies {}
export interface IPokemon extends PokeAPI.Pokemon {}

export interface ISelectedItemData {
  name: string;
  height: number;
  weight: number;
  type: string;
  experience: number;
  image: string;
}
