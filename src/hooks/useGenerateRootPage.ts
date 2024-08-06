import { useGetPokemonByNameQuery, useGetPokemonsQuery } from "@/state";
import { IResource } from "@/state/interfaces";
import { useRouter } from "next/router";
import { PokeAPI } from "pokeapi-types";

interface IGenerateRootPageProps {
  itemsPageLimit: number;
  offset: number;
  limit: number;
}

export function useGenerateRootPage({
  offset,
  limit,
  itemsPageLimit
}: IGenerateRootPageProps) {
  const router = useRouter();
  const { search, page, pokemon } = router.query;

  let pageOffset = offset;
  let cards: IResource[] | null = null;
  let totalCards: number = 0;

  const { data } = useGetPokemonsQuery(
    { offset, limit },
    { skip: router.isFallback }
  );

  const { data: pokemonData } = useGetPokemonByNameQuery(
    {
      pokemonName: pokemon as string
    },
    { skip: !pokemon }
  );

  if (data) {
    const { count, results } = data;
    cards = results;
    totalCards = count;

    if (search) {
      const coincidences = results.filter((card) => {
        return card.name.includes(search.toString());
      });

      totalCards = coincidences.length;

      if (!coincidences.length) {
        cards = [];
      } else {
        const result = coincidences.reduce<PokeAPI.NamedAPIResource[][]>(
          (acc, cur, i) => {
            const index = Math.floor(i / itemsPageLimit);
            if (!acc[index]) {
              acc[index] = [];
            }
            acc[index].push(cur);
            return acc;
          },
          []
        );
        const index = page ? Number(page) - 1 : 0;
        cards = result[index];
        pageOffset = index * itemsPageLimit;
        if (!cards) {
          cards = [];
        }
      }
    }
  }

  return { pokemonData, cards, pageOffset, totalCards, pokemon };
}
