import { removeFromCart } from "../store/slices/cart-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartTile({ cartItem }) {
  const dispatch = useDispatch();

  function handleRemoveFromCart() {
    dispatch(removeFromCart(cartItem.id));
  }

  return (
    <div className="flex items-center p-5 bg-white shadow-md rounded-lg mb-4">
      <div className="h-32 w-32">
        <img
          className="object-cover rounded-lg"
          src={cartItem?.thumbnail}
          alt={cartItem?.title}
        />
      </div>
      <div className="ml-5 flex-1">
        <h1 className="text-lg bg-red-300 font-semibold text-gray-900">
          {cartItem?.title}
        </h1>
        <p className="text-lg font-bold text-gray-900 mt-1">
          ${cartItem?.price.toFixed(2)}
        </p>
      </div>
      <Link to={`/product/${cartItem?.id}`}>
        <button className="bg-teal-500 text-slate-100 hover:text-slate-300 border-2 rounded-lg font-bold p-3">
          View Details
        </button>
      </Link>
      <button
        onClick={handleRemoveFromCart}
        className="bg-red-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-red-600 transition duration-300"
      >
        Remove
      </button>
    </div>
  );
}
