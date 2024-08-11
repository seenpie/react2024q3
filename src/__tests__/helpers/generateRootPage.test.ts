import { generateRootPage } from "../../helpers";

const data = {
  next: "",
  previous: "",
  count: 3,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" }
  ]
};

describe("generateRootPage", () => {
  it("Should return return correct data", () => {
    const mockPokemons = {
      next: "",
      previous: "",
      count: 150,
      results: Array.from({ length: 20 }, (_, i) => ({
        name: `pokemon${i}`,
        url: `url${i}`
      }))
    };

    const { cards, totalCards, pageOffset } = generateRootPage({
      offset: 0,
      itemsPageLimit: 10,
      data: mockPokemons,
      page: undefined,
      search: undefined
    });

    expect(cards).toEqual(mockPokemons.results);
    expect(totalCards).toBe(150);
    expect(pageOffset).toBe(0);
  });

  it("Should return filtered cards when there is a search term", () => {
    const { cards, pageOffset, totalCards } = generateRootPage({
      offset: 0,
      itemsPageLimit: 10,
      search: "ivy",
      page: undefined,
      data
    });

    expect(cards).toHaveLength(1);
    expect(cards![0].name).toBe("ivysaur");
    expect(pageOffset).toBe(0);
    expect(totalCards).toBe(1);
  });

  it("Should return empty array if no search results match", () => {
    const { cards, pageOffset, totalCards } = generateRootPage({
      offset: 0,
      itemsPageLimit: 10,
      search: "charizard",
      page: undefined,
      data
    });

    expect(cards).toHaveLength(0);
    expect(pageOffset).toBe(0);
    expect(totalCards).toBe(0);
  });
});
