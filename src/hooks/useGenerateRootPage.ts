import { IResource, IResourceList } from "@/state/interfaces";
import { PokeAPI } from "pokeapi-types";

interface IGenerateRootPageProps {
  itemsPageLimit: number;
  offset: number;
  search: string | undefined;
  page: string | undefined;
  data: IResourceList | undefined;
}

export function useGenerateRootPage({
  offset,
  itemsPageLimit,
  search,
  page,
  data
}: IGenerateRootPageProps) {
  if (!data) {
    return {
      cards: null
    };
  }

  let pageOffset = offset;
  let cards: IResource[];
  let totalCards: number;

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

  return { cards, pageOffset, totalCards };
}
