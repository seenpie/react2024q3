import App from "../App";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
