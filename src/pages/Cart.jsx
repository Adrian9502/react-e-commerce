import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTile from "../components/CartTile";

export default function Cart() {
  const { cart } = useSelector((state) => state);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    setTotalCart(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="bg-slate-300 min-h-[80vh] justify-center flex flex-col items-center py-10">
      {cart && cart.length ? (
        <div className="max-w-7xl justify-between w-full flex flex-col md:flex-row">
          {/* products in cart */}
          <div className="flex flex-col w-[800px] max-h-[80vh] overflow-auto justify-start p-5">
            {cart.map((cartItem) => (
              <CartTile key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
          {/* cart container */}
          <div className="max-w-[500px] m-auto flex items-center justify-center">
            {/* cart summary */}
            <div className="bg-white w-[400px] h-[400px] p-5 rounded-lg shadow-lg mt-5 md:mt-0">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Cart Summary
              </h1>
              <p className="text-lg mb-2">
                <span className="font-semibold">Total Items:</span>{" "}
                {cart.length}
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold">Total Amount:</span> $
                {totalCart.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // if cart is empty
        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          <h1 className="text-gray-800 italic text-2xl font-bold mb-2">
            Your cart is empty.
          </h1>
          <Link to={"/"}>
            <button className="bg-teal-500 text-white rounded-lg font-bold py-3 px-6 hover:bg-teal-600 hover:text-slate-200 transition duration-300">
              SHOP NOW
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
