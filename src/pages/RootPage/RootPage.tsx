import Header from "../../components/Header/Header.tsx";
import { Main } from "../../components/Main/Main.tsx";
import Wrapper from "../../components/Wrapper/Wrapper.tsx";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

function RootPage() {
  const pokemonList = useSelector(
    (state: RootState) => state.favoritePokemonList.pokemonList
  );
  return (
    <Wrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
      {pokemonList.length > 0 && <Footer />}
    </Wrapper>
  );
}

export default RootPage;
