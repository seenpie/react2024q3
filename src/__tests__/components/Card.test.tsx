import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Card } from "../../components/Card/Card.tsx";
import { renderWithProviders } from "../testUtils/test.utils.tsx";
import { createRemixStub } from "@remix-run/testing";
import { RootState } from "../../state";
import userEvent from "@testing-library/user-event";

const cardData = "valid data";
describe("Card", () => {
  it("Should render the relevant card data", () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => <Card name={cardData} />
      }
    ]);

    renderWithProviders(<RemixStub />);

    expect(screen.getByText(cardData, { exact: false })).toBeInTheDocument();
  });
  it("Should correct add and remove favorites from list", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => <Card name={cardData} />
      }
    ]);
    const preloadedState: Partial<RootState> = {
      favoritePokemonList: { pokemonList: [] }
    };
    const { store } = renderWithProviders(<RemixStub />, {
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
