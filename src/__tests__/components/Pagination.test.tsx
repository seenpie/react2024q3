import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../testUtils/test.utils.tsx";
import { screen } from "@testing-library/react";
import Pagination from "../../components/UI/Pagination/Pagination.tsx";
import { createRemixStub } from "@remix-run/testing";

const totalItems = 660;
const limit = 40;
const totalPage = Math.ceil(totalItems / limit);

describe("Pagination", () => {
  it("Should render correct amounts of page", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => (
          <Pagination offset={0} limit={limit} totalCards={totalItems} />
        )
      }
    ]);

    renderWithProviders(<RemixStub />);

    const button = screen.getByRole("button", { name: `${totalPage}` });
    expect(button).toBeInTheDocument();
  });
});
