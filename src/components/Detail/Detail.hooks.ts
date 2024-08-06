import { useMemo } from "react";
import { ISelectedItemData } from "@/state/pageData/interfaces.ts";
import { getPokemonImage } from "@/helpers";
import { useRouter } from "next/router";
import { IPokemon } from "@/state/interfaces";

export function useDetail(data: IPokemon) {
  const router = useRouter();
  const { pokemon, ...restQueries } = router.query;

  const imageUrl = pokemon ? getPokemonImage(pokemon as string) : "";

  const parsedPokemonData: ISelectedItemData | null = useMemo(() => {
    return {
      name: data.name,
      height: data.height,
      weight: data.weight,
      happiness: data.base_experience,
      type: data.types[0].type.name,
      image: imageUrl
    };
  }, [data, imageUrl]);

  const handleClose = async () => {
    await router.replace({ query: { ...restQueries } });
  };

  return {
    handleClose,
    parsedPokemonData
  } as const;
}
