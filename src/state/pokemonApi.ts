import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPokemon, IPokemonSpecies, IResourceList } from "./interfaces.ts";

const baseUrl = "https://pokeapi.co/api/v2/";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
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
  useLazyGetPokemonDescriptionByNameQuery
} = pokemonApi;
