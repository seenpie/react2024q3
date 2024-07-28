import { mockState } from "../utils/mockState.utils.ts";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../utils/test.utils.tsx";
import { Footer } from "../../components/Footer/Footer.tsx";
import { fireEvent, screen, waitFor } from "@testing-library/react";

const originalCreateObjectURL = globalThis.URL.createObjectURL;

const pokemonList = ["1", "2", "3"];

const localMockState = {
  ...mockState,
  favoritePokemonList: {
    pokemonList
  }
};

describe("Footer", () => {
  beforeAll(() => {
    globalThis.URL.createObjectURL = vi.fn(
      () => "blob:https://example.com/fake-url"
    );
  });

  afterAll(() => {
    globalThis.URL.createObjectURL = originalCreateObjectURL;
  });

  it("Should display correct amount of favorite pokemons", () => {
    renderWithProviders(<Footer />, {
      preloadedState: localMockState
    });

    expect(screen.getByText(`selected ${pokemonList.length} pokemons`));
  });

  it("Should clear pokemon list", async () => {
    renderWithProviders(<Footer />, {
      preloadedState: localMockState
    });

    await waitFor(() => {
      const button = screen.getByRole("button", { name: "unselected all" });
      fireEvent.click(button);
    });

    expect(screen.getByText(`selected ${0} pokemon`));
  });
});
