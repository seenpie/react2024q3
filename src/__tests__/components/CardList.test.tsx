import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { CardList } from "../../components/CardList/CardList.tsx";
import { renderWithProviders } from "../testUtils/test.utils.tsx";
import { createRemixStub } from "@remix-run/testing";

const itemList = [
  { name: "a", url: "" },
  { name: "b", url: "" },
  { name: "c", url: "" },
  { name: "d", url: "" },
  { name: "e", url: "" }
];

describe("CardList", () => {
  it("Should render the specified number of cards", () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => (
          <CardList cards={itemList} totalCards={itemList.length} />
        )
      }
    ]);

    renderWithProviders(<RemixStub />);

    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent(`total: ${itemList.length}`);
  });
});
