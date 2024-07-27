const baseImageUrl = "https://img.pokemondb.net/artwork/";

export function getPokemonImage(pokemonId: string): string {
  return baseImageUrl.concat(`${pokemonId}.jpg`);
}
