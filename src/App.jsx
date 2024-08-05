import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./index.css";
import ProductDetails from "./pages/ProductDetails";
import { CategoryProvider } from "./components/CategoryContext";
function App() {
  return (
    <CategoryProvider>
      <div className="bg-slate-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </CategoryProvider>
  );
}

export default App;
