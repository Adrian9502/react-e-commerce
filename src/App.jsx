import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./index.css";
import ProductDetails from "./pages/ProductDetails";
import { CategoryProvider } from "./components/CategoryContext";
import Header from "./components/Header";
import Searched from "./pages/Searched";

function App() {
  return (
    <CategoryProvider>
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </CategoryProvider>
  );
}

export default App;
