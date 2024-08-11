import { useMemo } from "react";
import { getPokemonImage } from "../../helpers";
import { IPokemon, ISelectedItemData } from "../../state/interfaces";
import { useSearchParams } from "@remix-run/react";

export function useDetail(data: IPokemon | undefined) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pokemon = searchParams.get("pokemon");

  const imageUrl = pokemon ? getPokemonImage(pokemon) : "";

  const parsedPokemonData: ISelectedItemData | null = useMemo(() => {
    return data
      ? {
          name: data.name,
          height: data.height,
          weight: data.weight,
          experience: data.base_experience,
          type: data.types[0].type.name,
          image: imageUrl
        }
      : null;
  }, [data, imageUrl]);

  const handleClose = () => {
    const { page, search } = {
      page: searchParams.get("page"),
      search: searchParams.get("search")
    };
    const newSearchParams = new URLSearchParams({
      ...(page && { page }),
      ...(search && { search })
    }).toString();
    setSearchParams(newSearchParams);
  };

  return {
    handleClose,
    parsedPokemonData
  } as const;
}
