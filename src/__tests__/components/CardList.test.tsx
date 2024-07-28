import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { CardList } from "../../components/CardList/CardList.tsx";
import { renderWithProviders } from "../utils/test.utils.tsx";
import { mockState } from "../utils/mockState.utils.ts";

const itemList = [
  { name: "a", url: "" },
  { name: "b", url: "" },
  { name: "c", url: "" },
  { name: "d", url: "" },
  { name: "e", url: "" }
];

const localMockState = {
  ...mockState,
  pageData: {
    itemList,
    pageParams: {
      offset: 0,
      totalItems: itemList.length,
      limit: 0
    },
    selectedItem: null
  }
};

describe("CardList", () => {
  it("Should render the specified number of cards", () => {
    renderWithProviders(<CardList />, { preloadedState: localMockState });

    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent(`total: ${itemList.length}`);
  });
});
