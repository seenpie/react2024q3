/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import createFetchMock from "vitest-fetch-mock";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();

afterEach(() => {
  cleanup();
});
