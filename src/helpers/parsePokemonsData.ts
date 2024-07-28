import { IData } from "../hooks/useFetchPokemonData.tsx";
import { getPokemonImage } from "./getPokemonImage.ts";
import { IPokemonData } from "./formatPokemonDataToCSV.ts";

export const parsePokemonsData = (data: IData): IPokemonData[] => {
  const { commonData, descriptionData } = data;
  return commonData.map((item, index) => {
    const data = item;
    const description = descriptionData[index];

    const image = data ? getPokemonImage(data.name) : null;
    return { data, description, image };
  });
};
