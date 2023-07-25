import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage/Homepage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/movieDetails"} element={<MovieDetails />} />
            {/* Universal selector should always be at the end */}
            {/* It keeps the user on Homepage when the endpoint doesn't exist */}
            <Route path={"*"} element={<Homepage />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App