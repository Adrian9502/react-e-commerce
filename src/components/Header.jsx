import { Link } from "react-router-dom";
import logo from "../public/logo.png";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useCategory } from "./CategoryContext";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "./Search";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ onSearch }) {
  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const { categories, setCategories } = useCategory();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchQuery);
    console.log(searchQuery);
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleCategoryClick(category) {
    navigate(`/category/${category.slug}`);
    setMenuOpen(false); // Close menu on category click
  }

  async function fetchListCategories() {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCategories(data);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchListCategories();
  }, []);

  return (
    <nav className="header-bg bg-gray-900 sticky top-0 left-0 right-0 flex items-center justify-between h-20 mx-auto shadow-md z-50 lg:px-20">
      {/* Logo */}
      <Link to={"/"}>
        <div className="ml-5 w-auto flex gap-2 items-center">
          <img src={logo} className="w-10 md:w-11 lg:w-14" alt="logo" />
          <h1 className="text-slate-100 cursor-pointer tracking-wide italic font-bold text-xl sm:text-2xl md:text-2xl hidden sm:block md:block lg:block">
            QuickBuy
          </h1>
        </div>
      </Link>
      {/* Input section */}
      <Search />
      {/* Hamburger Icon and Menu */}
      <div className="flex items-center lg:hidden mr-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 bg-gray-100 rounded-md"
        >
          <GiHamburgerMenu className="text-gray-800" size={25} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-20 right-3 bg-gray-900 border border-gray-200 rounded-md shadow-lg w-48 z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Menu as="div">
                <MenuButton className="flex shadow-xl items-center justify-center gap-5 w-full font-semibold p-2 text-white">
                  Category
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </MenuButton>
                <MenuItems className="space-y-1 overflow-auto h-24">
                  {categories.length ? (
                    categories.map((category, index) => (
                      <MenuItem
                        key={index}
                        as="button"
                        onClick={() => handleCategoryClick(category)}
                        className="w-full text-slate-200 text-center px-2 py-1 hover:text-slate-400"
                      >
                        {category.name}
                      </MenuItem>
                    ))
                  ) : (
                    <div className="text-gray-500 p-2">No categories found</div>
                  )}
                </MenuItems>
              </Menu>
              <Link
                to={"/cart"}
                className="flex items-center bg-gray-800 rounded-b-md text-white justify-center p-2 hover:bg-gray-700"
              >
                <TiShoppingCart style={{ fontSize: "30px" }} />
                <span className="ml-2 font-semibold">{cartItemCount}</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-6 text-gray-800 font-semibold">
        <Menu as="div" className="relative">
          <MenuButton className="text-gray-200 hover:underline-offset-1 rounded-md cursor-pointer">
            <div className="flex items-center space-x-1">
              <span className="font-medium">Category</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </MenuButton>
          <MenuItems className="absolute z-10 bg-slate-100 h-64 overflow-auto text-gray-500 mt-2 p-2 rounded-md shadow-lg w-48">
            {categories.length ? (
              categories.map((category, index) => (
                <MenuItem
                  key={index}
                  as="button"
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer p-2 flex hover:bg-gray-300 hover:text-gray-600"
                >
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <div className="text-gray-500 p-2">No categories found</div>
            )}
          </MenuItems>
        </Menu>
        <Link
          to={"/cart"}
          className="bg-gray-200 p-2 flex items-center gap-3 px-3 rounded-md cursor-pointer"
        >
          <TiShoppingCart style={{ fontSize: "30px", color: "inherit" }} />
          <span className="text-lg">{cartItemCount}</span>
        </Link>
      </div>
    </nav>
  );
}
