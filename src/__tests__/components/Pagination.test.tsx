import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";
import { mockState } from "@/__tests__/testUtils/mocks.ts";
import { screen } from "@testing-library/react";
import Pagination from "../../components/UI/Pagination/Pagination.tsx";

const totalItems = 660;
const limit = 40;
const totalPage = Math.ceil(totalItems / limit);

const localMockState = {
  ...mockState,
  pageData: {
    ...mockState.pageData,
    pageParams: {
      offset: 0,
      limit,
      totalItems
    }
  }
};

describe("Pagination", () => {
  it("Should render correct amounts of page", async () => {
    renderWithProviders(
      <Pagination offset={0} limit={limit} totalCards={totalItems} />,
      {
        preloadedState: localMockState
      }
    );

    const button = screen.getByRole("button", { name: `${totalPage}` });
    expect(button).toBeInTheDocument();
  });
});
