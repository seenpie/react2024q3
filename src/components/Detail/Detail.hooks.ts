import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  AppDispatch,
  useGetPokemonByNameQuery,
  useGetPokemonDescriptionByNameQuery
} from "../../state";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addSelectedItem } from "../../state/pageData/pageDataSlice.ts";
import { ISelectedItemData } from "../../state/pageData/interfaces.ts";
import { getPokemonImage } from "../../helpers";

export function useDetail() {
  const { pokemonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const imageUrl = pokemonId ? getPokemonImage(pokemonId) : "";

  const { isFetching: isCommonPokemonDataFetching, data: commonPokemonData } =
    useGetPokemonByNameQuery({
      pokemonName: pokemonId || ""
    });

  const {
    isFetching: isDescriptionPokemonDataFetching,
    data: descriptionPokemonData
  } = useGetPokemonDescriptionByNameQuery({
    descriptionUrl: commonPokemonData?.species.url ?? ""
  });

  const pokemonData: ISelectedItemData | null = useMemo(() => {
    if (!commonPokemonData || !descriptionPokemonData?.flavor_text_entries)
      return null;
    return {
      name: commonPokemonData.name,
      description:
        descriptionPokemonData.flavor_text_entries
          .find((item) => item.language.name === "en")
          ?.flavor_text.replace(/\n/g, " ") || "not found description",
      image: imageUrl
    };
  }, [commonPokemonData, descriptionPokemonData, imageUrl]);

  useEffect(() => {
    if (pokemonData) {
      dispatch(addSelectedItem(pokemonData));
    }
  }, [pokemonData, dispatch]);

  const handleClose = () => {
    const path = searchParams ? `/?${searchParams}` : "/";
    navigate(path);
  };

  const isLoading =
    isCommonPokemonDataFetching || isDescriptionPokemonDataFetching;

  return {
    isLoading,
    handleClose,
    pokemonData
  } as const;
}
