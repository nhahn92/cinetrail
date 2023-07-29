import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage/Homepage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
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
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignIn />} />
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