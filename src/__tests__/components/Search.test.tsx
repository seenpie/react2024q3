import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../../components/Header/Header.tsx"; // Убедитесь, что путь к компоненту правильный
import { MemoryRouter } from "react-router-dom";

describe("Search", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const localStorageKey = "term";

  it("Should save the entered value to the local storage", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText("#pokemon name");
    const searchButton = screen.getByTestId("searchBtn");

    fireEvent.input(inputElement, { target: { value: "pikachu" } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem("term")).toBe("pikachu");
  });

  it("Should retrieve the value from local storage upon mounting", () => {
    localStorage.setItem(localStorageKey, "charmander");

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText("#pokemon name");
    expect(inputElement).toHaveValue("charmander");
  });
});
