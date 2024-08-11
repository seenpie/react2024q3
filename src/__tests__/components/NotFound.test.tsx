import { screen } from "@testing-library/react";
import { NotFound } from "@/components/NotFound/NotFound.tsx";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";

vi.mock("next/router", () => ({
  useRouter: vi.fn()
}));

describe("NotFound", () => {
  it("Should render NotFoundPage with 'Not Found' text and back link", () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText("Not Found")).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: "back" });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });
});
