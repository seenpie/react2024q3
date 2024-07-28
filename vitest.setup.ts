import createFetchMock from "vitest-fetch-mock";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();

afterEach(() => {
  cleanup();
});
