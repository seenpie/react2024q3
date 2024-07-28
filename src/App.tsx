import "./App.css";
import ErrorBoundary from "./components/ErrorBaundary.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import RootPage from "./pages/RootPage/RootPage.tsx";
import Detail from "./components/Detail/Detail.tsx";
import ThemeProvider from "./context/ThemeContext/ThemeProvider.tsx";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<RootPage />}>
              <Route path="/pokemon/:pokemonId" element={<Detail />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
