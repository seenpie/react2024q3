import Loader from "../../components/Loader/Loader.tsx";
import { render, screen } from "@testing-library/react";

describe("Loader", () => {
  it("Should display the loader component", () => {
    render(<Loader />);

    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
  });
});
