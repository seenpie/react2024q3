import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Main from "../../components/Main/Main.tsx";
import { getPokemonList } from "../../api/api.ts";

vi.mock("../../api/api.ts", () => ({
  getPokemonList: vi.fn()
}));

const mockedPokemonList = {
  count: 120,
  results: Array.from({ length: 40 }, (_, i) => ({
    name: `pokemon-${i + 1}`,
    url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`
  }))
};

const mockedGetPokemonList = getPokemonList as ReturnType<typeof vi.fn>;

describe("Pagination", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedGetPokemonList.mockResolvedValue(mockedPokemonList);
  });

  it("Should change pagination when page changes", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Main children={""} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const button = screen.getByRole("button", { name: "2" });
      fireEvent.click(button);
    });

    await waitFor(() => {
      const inputElement = screen.getByRole("textbox");
      expect(inputElement).toHaveAttribute("placeholder", "2");
    });
    expect(screen.getByText("pokemon-1")).toBeInTheDocument();
    expect(screen.getByText("pokemon-40")).toBeInTheDocument();

    expect(getPokemonList).toHaveBeenCalledWith(0, 40);
  });
});
