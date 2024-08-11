import { render, screen } from "@testing-library/react";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.tsx";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../testUtils/test.utils.tsx";
import { createRemixStub } from "@remix-run/testing";

describe("NotFoundPage", () => {
  it("Should render NotFoundPage with 'Not Found' text and back link", () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => <NotFoundPage />
      }
    ]);

    renderWithProviders(<RemixStub />);

    expect(screen.getByText("Not Found")).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: "back" });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("Should navigate to the home page when clicking on the back link", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/some-bad-route",
        Component: () => <NotFoundPage />
      }
    ]);

    const user = userEvent.setup();

    render(<RemixStub initialEntries={["/some-bad-route"]} />);

    const backLink = screen.getByRole("link", { name: "back" });
    expect(backLink).toBeInTheDocument();

    await user.click(backLink);

    expect(window.location.pathname).toBe("/");
  });
});
