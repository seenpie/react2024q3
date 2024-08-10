import { PokeAPI } from "pokeapi-types";

export async function getPokemonByName(
  name: string
): Promise<PokeAPI.Pokemon | null> {
  try {
    const fetchPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return await fetchPokemon.json();
  } catch (error) {
    return null;
  }
}

export async function getPokemonList(
  offset = 0,
  limit = 5000
): Promise<PokeAPI.NamedAPIResourceList | undefined> {
  try {
    const pokemonList = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    return await pokemonList.json();
  } catch (error) {
    return undefined;
  }
}
