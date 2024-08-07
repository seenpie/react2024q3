import { screen } from "@testing-library/react";
import { Card } from "@/components/Card/Card.tsx";
import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";
import userEvent from "@testing-library/user-event";
import { RootState } from "@/state";

const cardData = "valid data";
const mockReplace = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      pokemon: "/"
    },
    replace: mockReplace
  })
}));

describe("Card", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("Should render the relevant card data", () => {
    renderWithProviders(<Card name={cardData} />);

    expect(screen.getByText(cardData, { exact: false })).toBeInTheDocument();
  });

  it("Should redirect on the card name", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Card name={cardData} />);

    const card = screen.getByLabelText("card");
    expect(card).toBeInTheDocument();

    await user.click(card);

    expect(mockReplace).toHaveBeenCalledWith({
      query: { pokemon: cardData }
    });
  });

  it("Should correct add and remove favorites from list", async () => {
    const preloadedState: Partial<RootState> = {
      favoritePokemonList: { pokemonList: [] }
    };
    const { store } = renderWithProviders(<Card name={cardData} />, {
      preloadedState
    });

    const card = screen.getByLabelText("card");
    expect(card).toBeInTheDocument();

    const checkbox = screen.getByLabelText("checkbox");

    let state = store.getState();
    expect(state.favoritePokemonList.pokemonList).not.toContain(cardData);

    await userEvent.click(checkbox);
    state = store.getState();
    expect(state.favoritePokemonList.pokemonList).toContain(cardData);

    await userEvent.click(checkbox);
    state = store.getState();
    expect(state.favoritePokemonList.pokemonList).not.toContain(cardData);
  });
});
