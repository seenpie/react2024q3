import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { CardList } from "@/components/CardList/CardList.tsx";
import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";

const itemList = [
  { name: "a", url: "" },
  { name: "b", url: "" },
  { name: "c", url: "" },
  { name: "d", url: "" },
  { name: "e", url: "" }
];

describe("CardList", () => {
  it("Should render the specified number of cards", () => {
    renderWithProviders(
      <CardList cards={itemList} totalCards={itemList.length} />
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(`total: ${itemList.length}`);
  });

  it("Should display not found if no cards", () => {
    renderWithProviders(
      <CardList
        cards={itemList.slice(itemList.length)}
        totalCards={itemList.length}
      />
    );

    expect(screen.getByText("no results"));
  });
});
