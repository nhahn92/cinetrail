import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Favorites from "./pages/Favorites/Favorites";
import ContextReducer from "./contexts";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextReducer>
          <Header />
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/movieDetails/:movieId"} element={<MovieDetails />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/myFavorites"} element={<Favorites />} />
            {/* Universal selector should always be at the end */}
            {/* It keeps the user on Homepage when the endpoint doesn't exist */}
            <Route path={"*"} element={<HomePage />} />
          </Routes>
          <Footer />
        </ContextReducer>
      </BrowserRouter>
    </>
  )
}

export default App