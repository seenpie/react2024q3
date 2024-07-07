import { Component } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBaundary.tsx";
import Header from "./components/Header/Header.tsx";
import Main from "./components/Main/Main.tsx";
import PokemonProvider from "./context/PokemonProvider.tsx";

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <PokemonProvider>
          <Header />
          <Main />
        </PokemonProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
