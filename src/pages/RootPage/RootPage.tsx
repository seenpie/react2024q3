import Header from "../../components/Header/Header.tsx";
import Main from "../../components/Main/Main.tsx";
import Layout from "../../components/Layout/Layout.tsx";
import { Outlet } from "react-router-dom";

function RootPage() {
  return (
    <Layout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
}

export default RootPage;
