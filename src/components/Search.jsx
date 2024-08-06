import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

// component for search input
function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // after form submitted, it will redirect to searched/(user input value)
    navigate("/searched/" + input);
  }

  return (
    <div className="w-1/4 min-w-64 flex items-center justify-between">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative flex items-center gap-2 lg:gap-4 md:gap-4 ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="search"
            id="default-search"
            className="block outline-none w-full py-2 md:py-3 lg:py-3  ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-cyan-500"
            placeholder="Search products.."
          />
          <button
            type="submit"
            className="text-white px-2 py-2 bg-teal-500 hover:bg-teal-600 font-medium rounded-md lg:px-4 lg:py-3 md:px-3 md:py-2.5"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
