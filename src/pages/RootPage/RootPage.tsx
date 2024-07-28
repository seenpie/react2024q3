import Header from "../../components/Header/Header.tsx";
import { Main } from "../../components/Main/Main.tsx";
import Layout from "../../components/Layout/Layout.tsx";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

function RootPage() {
  const pokemonList = useSelector(
    (state: RootState) => state.favoritePokemonList.pokemonList
  );
  return (
    <Layout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      {pokemonList.length > 0 && <Footer />}
    </Layout>
  );
}

export default RootPage;
