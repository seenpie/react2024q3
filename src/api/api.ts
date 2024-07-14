import { PokeAPI } from "pokeapi-types";

export interface IPokemonData {
  pokemon: PokeAPI.Pokemon;
  image: string;
  description: PokeAPI.PokemonSpecies;
}

const imageURL = "https://img.pokemondb.net/artwork/";

export async function getPokemonList(
  offset = 0,
  limit = 5000
): Promise<PokeAPI.NamedAPIResourceList | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getPokemonByName(
  name: string
): Promise<IPokemonData | null> {
  try {
    const fetchPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon = await fetchPokemon.json();
    const fetchDescription = await fetch(pokemon.species.url);
    const description = await fetchDescription.json();
    const image = imageURL.concat(`${name}.jpg`);
    return { pokemon, image, description };
  } catch (error) {
    return null;
  }
}
