import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductTile from "../components/ProductTile";
import { Circles } from "react-loader-spinner";

function Searched() {
  const [searchProduct, setSearchProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  let params = useParams();

  const getSearched = async (name) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${name}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLoading(false);

      // Update this to use the correct field from the API response
      setSearchProduct(data.products || []); // Set products or empty array if data.products is undefined
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchProduct([]); // Optionally clear the searchRecipes state on error
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

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
        <div className="min-h-[80vh] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-7 lg:grid-cols-4 max-w-7xl mx-auto p-3">
          {searchProduct.length ? (
            searchProduct.map((productItem) => (
              <ProductTile key={productItem.id} product={productItem} />
            ))
          ) : (
            <div className="text-center italic text-gray-700 text-xl font-semibold">
              No products found.
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Searched;
