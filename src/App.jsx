import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage/Homepage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import ThemeContextProvider from "./contexts/ThemeContext";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeContextProvider>
          <Header />
          <Routes>
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/movieDetails/:movieId"} element={<MovieDetails />} />
            {/* Universal selector should always be at the end */}
            {/* It keeps the user on Homepage when the endpoint doesn't exist */}
            <Route path={"*"} element={<Homepage />} />
          </Routes>
          <Footer />
        </ThemeContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App