/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "@/__tests__/testUtils/msw/server.ts";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })),
  useSearchParams: vi.fn(() => ({
    get: () => ""
  }))
}));

afterEach(() => {
  cleanup();
});
