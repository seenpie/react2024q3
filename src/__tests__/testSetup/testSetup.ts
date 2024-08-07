/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";

import createFetchMock from "vitest-fetch-mock";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

const fetchMocker = createFetchMock(vi);

vi.mock("next/router", () => vi.importActual("next-router-mock"));

fetchMocker.enableMocks();

afterEach(() => {
  cleanup();
});
