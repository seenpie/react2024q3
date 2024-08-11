import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../testUtils/test.utils.tsx";
import { Main } from "../../components/Main/Main.tsx";
import { screen } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";

const totalItems = 180;
const itemList = Array.from({ length: totalItems }).map((_, i) => ({
  name: `item${i + 1}`,
  url: ""
}));
const offset = 0;
const limit = 40;

const cards = itemList.slice(0, limit);

describe("Main", () => {
  it("Should correct display cardList and Pagination", () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => (
          <Main
            totalCards={totalItems}
            cards={cards}
            offset={offset}
            limit={limit}
          />
        )
      }
    ]);

    renderWithProviders(<RemixStub />);

    const lastPage = Math.ceil(totalItems / limit);
    const moveToLastPageButton = screen.getByRole("button", {
      name: lastPage.toString()
    });
    expect(moveToLastPageButton).toBeInTheDocument();

    const firstItem = screen.getByText("item1");
    const lastItem = screen.getByText("item40");
    expect(firstItem).toBeInTheDocument();
    expect(lastItem).toBeInTheDocument();
  });
});
