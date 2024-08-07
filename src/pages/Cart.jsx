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
    <div className="bg-slate-300 min-h-[90vh] flex flex-col items-center py-10 px-4">
      {cart && cart.length ? (
        <div className="max-w-7xl w-full m-auto flex flex-col md:flex-row gap-4">
          {/* Products in cart */}
          <div className="flex-1 overflow-auto max-h-[80vh] p-4 md:p-5 rounded-lg">
            {cart.map((cartItem) => (
              <CartTile key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
          {/* Cart summary */}
          <div className="w-full md:w-1/3 text-gray-800 h-auto m-auto bg-white p-4 md:p-5 rounded-lg shadow-lg">
            <h1 className="text-xl md:text-2xl text-center font-bold  mb-4">
              Cart Summary
            </h1>
            <p className="text-base md:text-lg mb-2 ml-6">
              <span className="font-semibold">Total Items: </span>
              <span className="font-bold">{cart.length}</span>
            </p>
            <p className="text-base md:text-lg mb-2 ml-6">
              <span className="font-semibold">Total Amount: </span>
              <span className="font-bold">${totalCart.toFixed(2)}</span>
            </p>
          </div>
        </div>
      ) : (
        // If cart is empty
        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          <h1 className="text-xl md:text-2xl text-gray-800 italic font-bold mb-2">
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
