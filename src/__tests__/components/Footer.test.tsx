import { mockState } from "@/__tests__/testUtils/mocks.ts";
import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";
import { Footer } from "../../components/Footer/Footer.tsx";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    const user = userEvent.setup();
    renderWithProviders(<Footer />, {
      preloadedState: localMockState
    });

    const footer = screen.getByLabelText("favorites");
    expect(footer).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "unselected all" });
    await user.click(button);

    expect(footer).not.toBeInTheDocument();
  });
});
