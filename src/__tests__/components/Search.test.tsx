import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import Header from "../../components/Header/Header.tsx";
import { renderWithProviders } from "../testUtils/test.utils.tsx";
import { createRemixStub } from "@remix-run/testing";

describe("Search", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const localStorageKey = "term";

  it("Should save the entered value to the local storage", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => <Header />
      }
    ]);

    renderWithProviders(<RemixStub />);

    const inputElement = screen.getByPlaceholderText("#pokemon name");
    const searchButton = screen.getByTestId("searchBtn");

    fireEvent.input(inputElement, { target: { value: "pikachu" } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem("term")).toBe("pikachu");
  });

  it("Should retrieve the value from local storage upon mounting", () => {
    localStorage.setItem(localStorageKey, "charmander");
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => <Header />
      }
    ]);

    renderWithProviders(<RemixStub />);

    const inputElement = screen.getByPlaceholderText("#pokemon name");
    expect(inputElement).toHaveValue("charmander");
  });
});
