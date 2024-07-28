import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.tsx";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../utils/test.utils.tsx";

describe("NotFoundPage", () => {
  it("Should render NotFoundPage with 'Not Found' text and back link", () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByText("Not Found")).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: "back" });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("Should navigate to the home page when clicking on the back link", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/some-bad-route"]}>
        <NotFoundPage />
      </MemoryRouter>
    );

    const backLink = screen.getByRole("link", { name: "back" });
    expect(backLink).toBeInTheDocument();

    await user.click(backLink);

    expect(window.location.pathname).toBe("/");
  });
});
