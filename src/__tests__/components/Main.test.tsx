import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";
import { Main } from "@/components/Main/Main.tsx";
import { screen } from "@testing-library/react";

const totalItems = 180;
const itemList = Array.from({ length: totalItems }).map((_, i) => ({
  name: `item${i + 1}`,
  url: ""
}));
const offset = 0;
const limit = 40;

const cards = itemList.slice(0, limit);

vi.mock("@/hooks/useGenerateRootPage.ts", () => ({
  useGenerateRootPage: () => ({
    cards,
    pageOffset: offset,
    totalCards: totalItems
  })
}));

describe("Main", () => {
  it("Should correct display cardList and Pagination", async () => {
    renderWithProviders(
      await (async () => {
        return await Main({ page: "1", search: "" });
      })()
    );

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
