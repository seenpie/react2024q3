import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Card from "../../components/Card/Card.tsx";
import Detail from "../../components/Detail/Detail.tsx";
import { getPokemonByName } from "../../api/api.ts";

vi.mock("../../api/api", () => ({
  getPokemonByName: vi.fn()
}));

const mockedGetPokemonByName = getPokemonByName as ReturnType<typeof vi.fn>;

describe("Card", () => {
  it("Should render the relevant card data", () => {
    const cardData = "valid data";

    render(
      <MemoryRouter>
        <Card name={cardData} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(cardData);
  });

  it("Should navigate to the detailed card component when clicked", async () => {
    const pokemonId = "pikachu";
    const mockPokemonData = {
      description: {
        flavor_text_entries: [
          { language: { name: "en" }, flavor_text: "A sample description" }
        ]
      },
      pokemon: { name: "pikachu" },
      image: "some-image-url"
    };

    mockedGetPokemonByName.mockResolvedValue(mockPokemonData);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Card name={pokemonId} />} />
          <Route path="/pokemon/:pokemonId" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    const card = screen.getByRole("link");
    fireEvent.click(card);

    await waitFor(() =>
      expect(screen.getByText(pokemonId)).toBeInTheDocument()
    );

    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });
});
