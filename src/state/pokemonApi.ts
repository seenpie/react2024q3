import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPokemon, IPokemonSpecies, IResourceList } from "./interfaces.ts";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./store.ts";
import { Action, PayloadAction } from "@reduxjs/toolkit";

const baseUrl = "https://pokeapi.co/api/v2/";

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPokemons: builder.query<
      IResourceList,
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => ({
        url: `/pokemon`,
        params: { limit, offset }
      })
    }),
    getPokemonByName: builder.query<IPokemon, { pokemonName: string }>({
      query: ({ pokemonName }) => ({
        url: `/pokemon/${pokemonName}`
      })
    }),
    getPokemonDescriptionByName: builder.query<
      IPokemonSpecies,
      { descriptionUrl: string }
    >({
      query: ({ descriptionUrl }) => ({
        url: descriptionUrl
      })
    })
  })
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
  useGetPokemonDescriptionByNameQuery,
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonDescriptionByNameQuery,
  util: { getRunningQueriesThunk }
} = pokemonApi;

export const { getPokemonByName, getPokemons, getPokemonDescriptionByName } =
  pokemonApi.endpoints;
