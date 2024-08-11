import { formatPokemonDataToCSV, IPokemonData } from "../../helpers";
import { PokeAPI } from "pokeapi-types";
import { describe, expect, it } from "vitest";

describe("formatPokemonDataToCSV", () => {
  it("should format Pokemon data to CSV correctly", () => {
    const mockPokemonDataList: IPokemonData[] = [
      {
        data: {
          id: 1,
          name: "bulbasaur"
        } as PokeAPI.Pokemon,
        image: "https://example.com/bulbasaur.png",
        description: {
          color: { name: "green" },
          flavor_text_entries: [
            {
              flavor_text:
                "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
              language: { name: "en" }
            }
          ]
        } as PokeAPI.PokemonSpecies
      },
      {
        data: {
          id: 2,
          name: "ivysaur"
        } as PokeAPI.Pokemon,
        image: "https://example.com/ivysaur.png",
        description: {
          color: { name: "green" },
          flavor_text_entries: [
            {
              flavor_text:
                "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
              language: { name: "en" }
            }
          ]
        } as PokeAPI.PokemonSpecies
      }
    ];

    const expectedCsvContent = [
      "id;name;description;color;imageURL\r\n",
      "1;bulbasaur;A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.;green;https://example.com/bulbasaur.png\r\n",
      "2;ivysaur;When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.;green;https://example.com/ivysaur.png\r\n"
    ].join("");

    const csvBlob = formatPokemonDataToCSV(mockPokemonDataList);
    const reader = new FileReader();

    reader.onload = () => {
      const csvContent = reader.result as string;
      expect(csvContent).toBe(expectedCsvContent);
    };

    reader.readAsText(csvBlob);
  });
});
