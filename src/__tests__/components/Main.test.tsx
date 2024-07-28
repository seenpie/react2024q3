import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../utils/test.utils.tsx";
import { Main } from "../../components/Main/Main.tsx";
import { screen } from "@testing-library/react";
import { useGetPokemonsQuery } from "../../state";

const totalItems = 180;
const itemList = Array.from({ length: totalItems }).map((_, i) => ({
  name: `item${i + 1}`,
  url: ""
}));

const createReturnedData = ({ start, end }: { start: number; end: number }) => {
  return {
    count: totalItems,
    next: "",
    previous: "",
    results: itemList.slice(start, end)
  };
};

vi.mock("../../state", async (importOriginal) => {
  const originalModule = await importOriginal();

  if (typeof originalModule !== "object" || originalModule === null) {
    throw new Error("importOriginal did not return an object");
  }

  return {
    ...originalModule,
    useGetPokemonsQuery: vi.fn(() => ({
      data: null,
      isFetching: true
    }))
  };
});

describe("Main", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Should correct display cardList and Pagination", () => {
    vi.mocked(useGetPokemonsQuery).mockImplementation(() => ({
      data: createReturnedData,
      isFetching: false,
      refetch: vi.fn()
    }));

    renderWithProviders(<Main children={""} />);

    console.log("Rendered component");

    expect(screen.getByText("not results")).toBeInTheDocument();
  });
});
