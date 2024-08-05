import { Link } from "react-router-dom";
import logo from "../public/logo.png";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { TextField, Button, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ onSearch }) {
  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }
  // Function to handle submit
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchQuery); // Pass the search query to the Home component
  }

  // Function to handle input change
  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div>
      <nav className="header top-0 left-0 right-0 flex items-center justify-between h-20 px-20 p-3 mx-auto bg-white shadow-md z-50">
        <Link to={"/"}>
          <div className="ml-5 w-auto flex gap-2 items-center ">
            <img src={logo} className="w-14" alt="logo" />
            <h1 className="text-slate-100  italic font-bold text-xl sm:text-2xl md:text-3xl cursor-pointer tracking-wide">
              QuickBuy
            </h1>
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <TextField
            onChange={handleInputChange}
            value={searchQuery}
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{
              flexGrow: 1,
              backgroundColor: "background.paper",
              "& .MuiInputBase-input": {
                color: "text.primary",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "& fieldset": {
                  borderColor: "grey.300",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
          <IconButton
            type="submit"
            sx={{
              ml: 1,
              color: "primary.main",
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex items-center bg-teal-300 space-x-6 text-gray-800 font-semibold">
          <Link to={"/"} className="bg-indigo-300 p-3">
            <div className="cursor-pointer">Home</div>
          </Link>{" "}
          <Link to={"/cart"} className="bg-red-100 p-3 flex items-center ">
            <TiShoppingCart style={{ fontSize: "30px", color: "black" }} />
            <span>{cartItemCount}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
