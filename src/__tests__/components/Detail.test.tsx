import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Detail from "../../components/Detail/Detail.tsx";
import { getPokemonByName } from "../../api/api";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../api/api", () => ({
  getPokemonByName: vi.fn()
}));

const mockedGetPokemonByName = getPokemonByName as ReturnType<typeof vi.fn>;

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

describe("Detail", () => {
  it("Should fetch and display correct Pokemon data", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:pokemonId" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getPokemonByName).toHaveBeenCalledWith("pikachu");
      expect(screen.getByText(/Name:/i)).toBeInTheDocument();
      expect(
        screen.getByText(mockPokemonData.pokemon.name)
      ).toBeInTheDocument();

      expect(screen.getByText(/Description:/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          mockPokemonData.description.flavor_text_entries[0].flavor_text
        )
      ).toBeInTheDocument();
    });
  });

  it("Should clicking the close button hides the component", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:pokemonId" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          mockPokemonData.description.flavor_text_entries[0].flavor_text
        )
      ).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /#close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(closeButton).not.toBeInTheDocument();
      expect(
        screen.queryByText(mockPokemonData.pokemon.name)
      ).not.toBeInTheDocument();
    });
  });

  it("Should display loading component", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:pokemonId" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
});
