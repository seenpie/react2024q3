import { render, screen } from "@testing-library/react";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";

const ErrorComponent = () => {
  throw Error("error");
};

describe("ErrorBoundary", () => {
  it("Should correct render component without an error", () => {
    render(
      <ErrorBoundary>
        <div>correct display</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("correct display")).toBeInTheDocument();
  });

  it("Should throw error if component has an error", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
