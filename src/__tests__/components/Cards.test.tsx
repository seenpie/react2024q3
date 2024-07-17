import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Cards from "../../components/Cards/Cards.tsx";
import { MemoryRouter } from "react-router-dom";
import { PokeAPI } from "pokeapi-types";

describe("Cards", () => {
  it("Should render the specified number of cards", () => {
    const cardsData = [
      { name: "a", url: "" },
      { name: "b", url: "" },
      { name: "c", url: "" },
      { name: "d", url: "" },
      { name: "e", url: "" }
    ];
    render(
      <MemoryRouter>
        <Cards
          cards={cardsData}
          totalCards={cardsData.length}
          cardsOnPage={cardsData.length}
        />
        );
      </MemoryRouter>
    );

    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(cardsData.length);
  });

  it("Should check that an appropriate message is displayed if no cards are present.", () => {
    const cardsData = [] as PokeAPI.NamedAPIResource[];
    render(
      <MemoryRouter>
        <Cards
          cards={cardsData}
          totalCards={cardsData.length}
          cardsOnPage={cardsData.length}
        />
        );
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("total: 0");
  });
});
