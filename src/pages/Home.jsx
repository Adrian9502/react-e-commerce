import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import ProductTile from "../components/ProductTile";

export default function Home() {
  const { category } = useParams(); // Get category slug from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchListProducts() {
    try {
      setLoading(true);
      const categoryUrl = category
        ? `https://dummyjson.com/products/category/${category}?limit=20&skip=${
            count * 20
          }`
        : `https://dummyjson.com/products?limit=20&skip=${count * 20}`;

      const response = await fetch(categoryUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        console.log(products);

        // Determine if there are more products to load
        if (result.products.length < 20) {
          setDisableButton(true); // No more products to load
        } else {
          setDisableButton(false); // More products are available
        }
      } else {
        setDisableButton(true); // No products found
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setProducts([]);
    setCount(0);
    setDisableButton(false);
    fetchListProducts();
  }, [category, count]);

  const handleLoadMore = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <main className="bg-slate-300">
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <Circles
            height={"80"}
            width={"80"}
            color="rgb(20 184 166)"
            visible={true}
          />
        </div>
      ) : (
        <div className="min-h-[80vh] grid grid-col-2 sm:grid-cols-2 md:grid-cols-3 gap-7 lg:grid-cols-4 max-w-7xl mx-auto p-3">
          {products.length ? (
            products.map((productItem) => (
              <ProductTile key={productItem.id} product={productItem} />
            ))
          ) : (
            <div className="text-center text-xl font-semibold">
              No products found
            </div>
          )}
        </div>
      )}
      {/* Conditionally render the button container */}
      {products.length >= 20 && !loading && (
        <div className="text-center p-4">
          <button
            disabled={disableButton}
            onClick={handleLoadMore}
            className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Load more products
          </button>
          {disableButton && (
            <h6 className="m-3">You have reached the end of products</h6>
          )}
        </div>
      )}
    </main>
  );
}
