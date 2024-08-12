import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
export default function Laptops() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch products
  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://dummyjson.com/products/category/laptops"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProducts(data.products);
      console.log(data);
    } catch (e) {
      console.log("Error: ", e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[340px] w-full flex justify-center items-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={[
            "rgb(20 184 166)",
            "rgb(20 184 166)",
            "rgb(20 184 166)",
            "rgb(20 184 166)",
            "rgb(20 184 166)",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <h1 className="text-2xl text-gray-700 font-bold my-3">Laptops</h1>
      <div className="w-full max-w-7xl">
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            gap: "1.5rem",
            pagination: false,
            arrows: true,
            breakpoints: {
              640: {
                perPage: 1,
              },
              768: {
                perPage: 2,
              },
              1024: {
                perPage: 3,
              },
              1280: {
                perPage: 4,
              },
            },
          }}
        >
          {products.map((product) => (
            <SplideSlide key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-cover h-32 w-32 mb-4 rounded-md"
                  />
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <span>({product.rating})</span>
                  <h2 className="text-xl truncate font-semibold mb-2 text-center max-w-full">
                    {product.title}
                  </h2>
                  <h2 className="text-2xl font-bold text-gray-800">
                    ${product.price}
                  </h2>
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}
