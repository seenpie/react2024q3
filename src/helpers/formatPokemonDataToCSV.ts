import { PokeAPI } from "pokeapi-types";

export interface IPokemonData {
  data: PokeAPI.Pokemon | undefined;
  image: string | null;
  description: PokeAPI.PokemonSpecies | undefined;
}

export const formatPokemonDataToCSV = (pokemonDataList: IPokemonData[]) => {
  const header =
    ["id", "name", "description", "color", "imageURL"].join(";") + "\r\n";
  const csvContent = pokemonDataList.map((dataItem) => {
    const pokemon = dataItem?.data;
    const description = dataItem?.description;
    const id = pokemon?.id;
    const name = pokemon?.name;
    const imageUrl = dataItem?.image;
    const color = description?.color.name;
    const descriptionText =
      description?.flavor_text_entries
        .find((item) => item.language.name === "en")
        ?.flavor_text.replace(/\n/g, " ") ?? "not found description";
    const row = [id, name, descriptionText, color, imageUrl];
    return row.join(";").concat("\r\n");
  });
  csvContent.unshift(header);
  return new Blob(csvContent, { type: "text/csv;charset=utf-8;" });
};
