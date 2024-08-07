import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "@mui/material/Rating";
import { addToCart, removeFromCart } from "../store/slices/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
export default function ProductTile({ product }) {
  // redux
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
  return (
    <motion.div
      className="bg-gray-100 shadow-lg flex flex-col items-center p-2 h-[380px] justify-center rounded-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* image */}
      <div className="h-[180px] mt-5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-full w-full "
        />
      </div>
      {/* title and price */}
      <div className="font-bold py-1 w-40 text-gray-800 text-center">
        <h1 className="text-xl truncate">{product.title}</h1>
      </div>
      <div className="w-40 text-center relative">
        <h1 className="text-3xl text-gray-900 font-bold relative z-10">
          ${product.price}
          <span className="text-xs absolute bottom-3 right-0 transform translate-x-1/2 translate-y-1/2  text-gray-800 px-1 py-0.5 rounded-lg">
            -{product.discountPercentage}%
          </span>
        </h1>
      </div>

      {/* rating container */}
      <div className="flex items-center justify-center">
        <Rating
          name="half-rating-read"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
        />
        <span className="italic">({product.rating})</span>
      </div>
      {/* View Details and add to cart */}
      <div className="flex items-center justify-center w-full space-x-4 p-3">
        <Link to={`/product/${product.id}`}>
          <button className="bg-teal-500 text-slate-100 hover:text-slate-300 border-2 rounded-lg font-bold p-3">
            View Details
          </button>
        </Link>
        <button
          onClick={
            cart.some((item) => item.id === product.id)
              ? handleRemoveFromCart
              : handleAddToCart
          }
          className={`text-slate-100 transition hover:text-slate-300 border-2 rounded-lg font-bold p-3 ${
            cart.some((item) => item.id === product.id)
              ? "bg-red-500"
              : "bg-cyan-500"
          }`}
        >
          {cart.some((item) => item.id === product.id) ? (
            <RemoveShoppingCartIcon />
          ) : (
            <AddShoppingCartIcon />
          )}
        </button>
      </div>
    </motion.div>
  );
}
