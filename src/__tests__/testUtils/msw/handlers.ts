import { http, HttpResponse } from "msw";
import { detailPokemonData } from "@/__tests__/testUtils/mocks.ts";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon", () =>
    HttpResponse.json({ name: 123 })
  ),
  http.get("https://pokeapi.co/api/v2/pokemon/null", () =>
    HttpResponse.json(null)
  ),
  http.get("https://pokeapi.co/api/v2/pokemon/:name", () =>
    HttpResponse.json(detailPokemonData)
  )
];
