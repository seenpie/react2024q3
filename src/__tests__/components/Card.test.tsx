import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Card from "../../components/Card/Card.tsx";
import { renderWithProviders } from "../utils/test.utils.tsx";

describe("Card", () => {
  it("Should render the relevant card data", () => {
    const cardData = "valid data";

    renderWithProviders(<Card name={cardData} />);

    expect(screen.getByText(cardData, { exact: false })).toBeInTheDocument();
  });
});
