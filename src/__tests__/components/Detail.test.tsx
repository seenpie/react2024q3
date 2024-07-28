import { screen, waitFor } from "@testing-library/react";
import Detail from "../../components/Detail/Detail";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../utils/test.utils.tsx";
import { useGetPokemonByNameQuery } from "../../state";

const mockCommonPokemonData = {
  name: "pikachu",
  species: { url: "some-url" }
};

const mockDescriptionPokemonData = {
  flavor_text_entries: [
    { language: { name: "en" }, flavor_text: "A sample description" }
  ]
};

vi.mock("../../state", async (importOriginal) => {
  const originalModule = await importOriginal();

  if (typeof originalModule !== "object" || originalModule === null) {
    throw new Error("importOriginal did not return an object");
  }

  return {
    ...originalModule,
    useGetPokemonByNameQuery: vi.fn(() => ({
      data: mockCommonPokemonData,
      isFetching: false
    })),
    useGetPokemonDescriptionByNameQuery: vi.fn(() => ({
      data: mockDescriptionPokemonData,
      isFetching: false
    }))
  };
});

describe("Detail", () => {
  it("Should display loading component", async () => {
    vi.mocked(useGetPokemonByNameQuery).mockImplementation(() => ({
      data: null,
      isFetching: true,
      refetch: vi.fn()
    }));

    renderWithProviders(<Detail />);

    await waitFor(() => {
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
  });

  it("Should display 'not found' if data isn't found", async () => {
    vi.mocked(useGetPokemonByNameQuery).mockImplementation(() => ({
      data: null,
      isFetching: false,
      refetch: vi.fn()
    }));

    renderWithProviders(<Detail />);

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it("Should display correct pokemon information", async () => {
    vi.mocked(useGetPokemonByNameQuery).mockImplementation(() => ({
      data: mockCommonPokemonData,
      isFetching: false,
      refetch: vi.fn()
    }));

    renderWithProviders(<Detail />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/a sample description/i)).toBeInTheDocument();
  });
});
