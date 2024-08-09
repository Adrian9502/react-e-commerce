import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { addToCart, removeFromCart } from "../store/slices/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
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
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  // Animation variants
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-[90vh] px-10 bg-slate-300 justify-center flex flex-col items-center">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
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
      ) : product ? (
        <motion.div
          className="bg-slate-50 mt-10 max-w-6xl p-3 h-auto w-full rounded-md shadow-lg"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          {/* products */}
          <div className="flex justify-center flex-row items-center">
            {/* image */}
            <div className="h-[350px] max-w-[50%] flex flex-1 items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="rounded-md object-contain h-full"
              />
            </div>
            {/* description section */}
            <div className="flex flex-col flex-1 px-2 text-center justify-center lg:text-start">
              <h1 className="text-center text-lg lg:text-4xl my-6 font-bold md:text-2xl">
                {product.title}
              </h1>
              <p className="text-base font-semibold text-gray-900 md:text-base lg:text-lg">
                {product.description}
              </p>
              <div className="flex items-center justify-center flex-wrap">
                <p className="text-sm italic p-0 rounded-md text-gray-500">
                  Tags:
                </p>
                {product.tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    <p className="text-sm italic p-0 rounded-md ml-1 text-gray-500">
                      {tag}
                    </p>
                    {index < product.tags.length - 1 && (
                      <span className="text-sm italic p-0 rounded-md ml-1 text-gray-500">
                        ,
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-col items-center justify-around my-2 lg:flex-row gap-3">
                <div className="flex flex-col-reverse items-center">
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <span className="font-semibold italic">
                    Rating: {product.rating}
                  </span>
                </div>
                <div className="text-base text-center font-semibold md:text-base lg:text-lg italic border border-indigo-600 rounded-md px-3 text-indigo-800">
                  {product.warrantyInformation}
                </div>
                <div className="text-base text-center font-semibold md:text-base lg:text-lg italic border border-indigo-600 rounded-md px-3 text-indigo-800">
                  {product.shippingInformation}
                </div>
              </div>
              <p className="text-lg text-center md:text-2xl lg:text-3xl font-bold">
                ${product.price}
              </p>
              <div className="flex items-center justify-center w-full mt-5">
                <button
                  onClick={
                    cart.some((item) => item.id === product.id)
                      ? handleRemoveFromCart
                      : handleAddToCart
                  }
                  className="bg-teal-500 text-white rounded-lg font-semibold lg:py-3 lg:px-6 hover:bg-teal-600 hover:text-slate-200 transition duration-300 px-3 py-2"
                >
                  {cart.some((item) => item.id === product.id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
          {/* Reviews section */}
          <motion.div
            className="bg-slate-300 mx-3 lg:mx-10 p-4 mt-5 rounded-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <h1 className="text-2xl text-center font-bold mb-4">Reviews</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-100 shadow-md rounded-md flex items-start space-x-4 flex-shrink-0 w-full sm:w-auto"
                  >
                    <div className="p-1">
                      <div className="flex items-center justify-around">
                        <div className="w-fit">
                          <img
                            src={`https://randomuser.me/api/portraits/men/${
                              index % 10
                            }.jpg`} // Placeholder image URL
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="w-[70%] flex flex-col">
                          <span className="text-sm italic text-gray-600 mt-1">
                            {review.date.split("T")[0]}
                          </span>
                          <span className="text-md font-bold text-gray-800">
                            {review.reviewerName}
                          </span>
                          <span className="text-sm italic truncate text-gray-500">
                            {review.reviewerEmail}
                          </span>
                          <Rating
                            name="review-rating"
                            defaultValue={review.rating}
                            precision={0.5}
                            readOnly
                            size="medium"
                          />
                        </div>
                      </div>
                      <p className="text-base break-all w-full text-gray-700 mt-2">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-center flex-col p-3 gap-5 m-auto">
          <h1 className="text-2xl font-semibold italic">No product found.</h1>
          <Link to={"/"}>
            <button className="bg-teal-500 text-white rounded-lg font-semibold py-3 px-6 hover:bg-teal-600 hover:text-slate-200 transition duration-300">
              GO BACK
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
