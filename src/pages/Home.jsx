import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import ProductTile from "../components/ProductTile";
import Header from "../components/Header";
import BrowseByCategory from "../components/BrowseByCategory";

export default function Home() {
  const { category } = useParams(); // Get category slug from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

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
        if (result.products.length < 20) {
          setDisableButton(true);
        }
        if (!initialLoad) {
          setDisableButton(result.products.length < 20);
        }
      } else {
        setDisableButton(true);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }

  useEffect(() => {
    setProducts([]);
    setCount(0);
    setDisableButton(false);
    setInitialLoad(true);
    fetchListProducts();
  }, [category, count]);

  const handleLoadMore = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleSearch = (query) => {
    // Implement search functionality here
  };

  return (
    <div>
      <main>
        {/* Adjusted margin-left to accommodate the sidebar */}
        <Header onSearch={handleSearch} />
        {loading ? (
          <div className="min-h-screen w-full flex justify-center items-center">
            <Circles
              height={"80"}
              width={"80"}
              color="rgb(67 56 202)"
              visible={true}
            />
          </div>
        ) : (
          <div className="mt-20 min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto p-3">
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
        {!loading && products.length > 0 && (
          <div className="text-center p-4">
            <button
              disabled={disableButton}
              onClick={handleLoadMore}
              className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Load more products
            </button>
            {disableButton && (
              <h6 className="m-3">You have reached the end of products</h6>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
