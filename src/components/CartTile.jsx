import { Rating } from "@mui/material";
import { removeFromCart } from "../store/slices/cart-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export default function CartTile({ cartItem }) {
  const dispatch = useDispatch();

  function handleRemoveFromCart() {
    dispatch(removeFromCart(cartItem.id));
  }

  return (
    <div className="flex items-center p-4 bg-gray-100 shadow-md rounded-lg mb-4 justify-between space-x-4">
      {/* Image container */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
        <img
          className="object-cover rounded-lg w-full h-full"
          src={cartItem?.thumbnail}
          alt={cartItem?.title}
        />
      </div>
      {/* Title, rating, price */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm md:text-lg truncate font-semibold text-gray-900">
          {cartItem?.title}
        </h1>
        <div className="flex items-center gap-1 mt-1">
          <Rating
            name="half-rating-read"
            defaultValue={cartItem?.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className="italic text-xs md:text-sm">
            Rating: {cartItem?.rating}
          </span>
        </div>
        <h1 className="text-sm md:text-xl font-semibold text-gray-900 mt-1">
          ${cartItem?.price.toFixed(2)}
        </h1>
      </div>
      {/* Buttons */}
      <div className="flex-shrink-0 flex space-x-2">
        <Link to={`/product/${cartItem?.id}`}>
          <button className="bg-teal-400 text-white rounded-md font-semibold px-2 py-1.5 md:px-3 md:py-2 transition hover:bg-teal-500 duration-300">
            View Details
          </button>
        </Link>
        <button
          onClick={handleRemoveFromCart}
          className="bg-red-500 text-white rounded-lg px-2 py-1.5 md:px-3 md:py-2 hover:bg-red-600 transition duration-300"
        >
          <RemoveShoppingCartIcon />
        </button>
      </div>
    </div>
  );
}
