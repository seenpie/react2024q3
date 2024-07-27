import { useEffect, useState } from "react";
import {
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonDescriptionByNameQuery
} from "../state";
import { IPokemon, IPokemonSpecies } from "../state/interfaces.ts";

export interface IData {
  commonData: (IPokemon | undefined)[];
  descriptionData: (IPokemonSpecies | undefined)[];
}

export const useFetchPokemonData = (names: string[]) => {
  const [data, setData] = useState<IData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [trigger] = useLazyGetPokemonByNameQuery();
  const [descriptionTrigger] = useLazyGetPokemonDescriptionByNameQuery();

  useEffect(() => {
    const fetchCommonData = async () => {
      const fetchResults = await Promise.all(
        names.map((name) => {
          return trigger({ pokemonName: name });
        })
      );

      const isCommonDataLoading = fetchResults.some(
        (result) => result.isLoading
      );
      const isCommonDataError = fetchResults.some((result) => result.isError);
      const commonData = fetchResults.map((result) => result.data);

      return { isCommonDataLoading, isCommonDataError, commonData };
    };

    const fetchDescriptionData = async (
      commonData: (IPokemon | undefined)[]
    ) => {
      const fetchDescription = await Promise.all(
        commonData.map((data) => {
          return descriptionTrigger({
            descriptionUrl: data?.species.url ?? ""
          });
        })
      );

      const isDescriptionDataError = fetchDescription.some(
        (result) => result.isError
      );
      const descriptionData = fetchDescription.map((result) => result.data);

      return {
        isDescriptionDataError,
        descriptionData
      };
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { commonData, isCommonDataError } = await fetchCommonData();

        const { descriptionData, isDescriptionDataError } =
          await fetchDescriptionData(commonData);

        setIsError(isCommonDataError || isDescriptionDataError);
        if (commonData) {
          setData({ commonData, descriptionData });
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [names, descriptionTrigger, trigger]);

  return { data, isLoading, isError };
};
