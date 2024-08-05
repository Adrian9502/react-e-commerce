import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import Header from "../components/Header";
import StarRating from "../components/StarRating";
import { addToCart, removeFromCart } from "../store/slices/cart-slice";
import { useSelector, useDispatch } from "react-redux";
export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Access only the cart state from Redux
  const cart = useSelector((state) => state.cart);

  // Function to handle adding the product to the cart
  function handleAddToCart(event) {
    event.stopPropagation(); // Prevents the event from propagating to the Link component
    dispatch(addToCart(product));
  }

  // Function to handle removing the product from the cart
  function handleRemoveFromCart(event) {
    event.stopPropagation(); // Prevents the event from propagating to the Link component
    dispatch(removeFromCart(product.id));
  }

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);

        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  return (
    <>
      <Header />
      <div className="min-h-[90vh] mt-20 justify-center flex items-start pt-20 px-48">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Circles
              height={"80"}
              width={"80"}
              color="rgb(67 56 202)"
              visible={true}
            />
          </div>
        ) : // product container
        product ? (
          <div className="bg-white min-w-[70vh] p-3 h-auto w-full rounded-md shadow-lg flex justify-center flex-col lg:flex-row  items-start">
            <div className="h-[400px]  mx-auto">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="rounded-md object-cover h-[400px]"
              />
            </div>
            {/* description section */}
            <div className="lg:w-[50%] px-2 text-center lg:text-start ">
              <h1 className="text-center text-lg   lg:text-4xl my-6 font-bold md:text-2xl">
                {product.title}
              </h1>

              <p className="text-base font-semibold text-gray-900  md:text-base lg:text-lg">
                {product.description}
              </p>
              <div className="flex items-center justify-start flex-wrap">
                <p className="text-sm italic p-0 rounded-md text-gray-500">
                  Category:{" "}
                </p>
                {product.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="text-sm italic p-0 rounded-md ml-1 text-gray-500"
                  >
                    {tag}.
                  </p>
                ))}
              </div>
              {/* rating,shipping,delivery days section */}
              <div className="flex gap-3 flex-col 2xl:flex-row xl:flex-row items-center justify-center  lg:justify-start my-4 ">
                <StarRating rating={product.rating} />
                {product.rating.rate}
                <span className="text-base text-center font-semibold md:text-base lg:text-lg italic border border-indigo-600 rounded-md px-3 text-indigo-800">
                  {product.warrantyInformation}
                </span>
                <span className="text-base text-center font-semibold md:text-base lg:text-lg italic border border-indigo-600 rounded-md px-3 text-indigo-800">
                  {product.shippingInformation}
                </span>
              </div>
              <p className="text-lg text-center lg:text-3xl font-bold ">
                ${product.price}
              </p>

              <div className="flex items-center justify-center w-full mt-5">
                <button
                  onClick={
                    cart.some((item) => item.id === product.id)
                      ? handleRemoveFromCart
                      : handleAddToCart
                  }
                  className="button text-slate-100 hover:text-slate-300 border-2 rounded-lg font-bold p-3 md:mb-3"
                >
                  {cart.some((item) => item.id === product.id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>No product found</div>
        )}
      </div>
    </>
  );
}
