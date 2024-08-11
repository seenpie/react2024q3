/* eslint-disable react-refresh/only-export-components */
import { Header } from "@/components/Header/Header.tsx";
import { Main } from "@/components/Main/Main.tsx";
import { Footer } from "@/components/Footer/Footer.tsx";
import {
  getPokemonByName,
  getPokemons,
  getRunningQueriesThunk,
  RootState,
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  wrapper
} from "@/state";
import { GetServerSideProps, NextPage } from "next";
import { useSelector } from "react-redux";
import { Detail } from "@/components/Detail/Detail";
import { useGenerateRootPage } from "@/hooks/useGenerateRootPage";
import { useRouter } from "next/router";

const itemsPageLimit = 40;

interface IRootPageProps {
  offset: number;
  limit: number;
}

const Root: NextPage<IRootPageProps> = ({ offset, limit }) => {
  const router = useRouter();
  const favoriteList = useSelector(
    (state: RootState) => state.favoritePokemonList.pokemonList
  );
  const { pokemon, page, search } = router.query;

  const { data } = useGetPokemonsQuery(
    { offset, limit },
    { skip: router.isFallback }
  );

  const { data: pokemonData } = useGetPokemonByNameQuery(
    {
      pokemonName: pokemon as string
    },
    { skip: !pokemon }
  );

  const { cards, totalCards, pageOffset } = useGenerateRootPage({
    offset,
    search: search ? (search as string) : search,
    page: page ? (page as string) : page,
    itemsPageLimit,
    data
  });

  if (!cards) {
    return <div>Service isn't available</div>;
  }

  return (
    <>
      <Header />
      <Main
        cards={cards}
        totalCards={totalCards}
        offset={pageOffset}
        limit={itemsPageLimit}
      >
        {pokemon && <Detail data={pokemonData} />}
      </Main>
      {!!favoriteList.length && <Footer />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { page, search, pokemon } = context.query;
    let limit = itemsPageLimit;
    let offset = page ? itemsPageLimit * Number(page) - itemsPageLimit : 0;

    if (search) {
      limit = 5000;
      offset = 0;
    }

    if (pokemon) {
      store.dispatch(
        getPokemonByName.initiate({ pokemonName: pokemon as string })
      );
    }

    store.dispatch(getPokemons.initiate({ offset, limit }));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        offset,
        limit
      }
    };
  });

export default Root;
