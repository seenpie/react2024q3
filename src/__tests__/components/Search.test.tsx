import { fireEvent, screen } from "@testing-library/react";
import { Header } from "../../components/Header/Header.tsx";
import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";
import userEvent from "@testing-library/user-event";

describe("Search", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const localStorageKey = "term";

  it("Should save the entered value to the local storage", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();

    const inputElement = screen.getByPlaceholderText("#pokemon name");
    const searchButton = screen.getByTestId("searchBtn");

    fireEvent.input(inputElement, { target: { value: "pikachu" } });
    await user.click(searchButton);

    expect(localStorage.getItem("term")).toBe("pikachu");
  });

  it("Should retrieve the value from local storage upon mounting", () => {
    localStorage.setItem(localStorageKey, "charmander");

    renderWithProviders(<Header />);

    const inputElement = screen.getByPlaceholderText("#pokemon name");
    expect(inputElement).toHaveValue("charmander");
  });
});
