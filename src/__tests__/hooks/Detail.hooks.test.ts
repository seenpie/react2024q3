import { useDetail } from "@/components/Detail/Detail.hooks.ts";
import {
  detailPokemonData,
  parsedDetailPokemonData
} from "@/__tests__/testUtils/mocks.ts";
import { renderHook } from "@testing-library/react";

vi.mock("@/helpers", () => ({
  getPokemonImage: () => {
    return "";
  }
}));

vi.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      pokemon: "pikachu"
    }
  })
}));

describe("useDetail hook", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Should correct parse date", () => {
    const { result } = renderHook(() => useDetail(detailPokemonData));
    expect(result.current.parsedPokemonData).toEqual(parsedDetailPokemonData);
  });
});
