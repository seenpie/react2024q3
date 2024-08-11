/* eslint-disable react-refresh/only-export-components */

import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { getPokemonByName, getPokemonList } from "../../services";
import { generateRootPage, IGenerateRootPageReturnedData } from "../../helpers";
import { IPokemon } from "../../state/interfaces.ts";
import { Main } from "../../components/Main/Main.tsx";
import { Detail } from "../../components/Detail/Detail.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import Wrapper from "../../components/Wrapper/Wrapper.tsx";
import Header from "../../components/Header/Header.tsx";
import { Footer } from "../../components/Footer/Footer.tsx";

interface ILoaderReturnedData extends IGenerateRootPageReturnedData {
  pokemonDetailData: IPokemon | null;
}

const itemsPageLimit = 40;

export async function loader({
  request
}: LoaderFunctionArgs): Promise<ILoaderReturnedData> {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const { page, search, pokemon } = {
    page: searchParams.get("page"),
    search: searchParams.get("search"),
    pokemon: searchParams.get("pokemon")
  };

  let limit = itemsPageLimit;
  let offset = page ? itemsPageLimit * Number(page) - itemsPageLimit : 0;

  if (search) {
    limit = 5000;
    offset = 0;
  }

  const data = await getPokemonList(offset, limit);
  const pokemonDetailData = pokemon ? await getPokemonByName(pokemon) : null;

  const { cards, totalCards, pageOffset } = generateRootPage({
    offset,
    search: search ? search : "",
    page: page ? page : "",
    itemsPageLimit,
    data
  });

  return { cards, totalCards, pageOffset, pokemonDetailData };
}

export default function Index() {
  const {
    cards,
    totalCards,
    pageOffset,
    pokemonDetailData
  }: ILoaderReturnedData = useLoaderData();
  const navigation = useNavigation();

  const favoriteList = useSelector(
    (state: RootState) => state.favoritePokemonList.pokemonList
  );

  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      <Main
        totalCards={totalCards}
        cards={cards}
        offset={pageOffset}
        limit={itemsPageLimit}
      >
        {pokemonDetailData && <Detail data={pokemonDetailData} />}
      </Main>
      {favoriteList.length ? <Footer /> : null}
    </Wrapper>
  );
}
