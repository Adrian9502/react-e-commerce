import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../components/CategoryContext"; // Import the context
import { Circles } from "react-loader-spinner";
export default function BrowseByCategory() {
  const [loading, setLoading] = useState(false);
  const { categories, setCategories } = useCategory(); // Use context
  const navigate = useNavigate();

  async function fetchListCategories() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products/categories");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCategories(data); // Set categories in context
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListCategories();
  }, []);

  function handleCategoryClick(category) {
    navigate(`/category/${category.slug}`); // Use slug for URL
  }

  return (
    <div className=" bg-white text-gray-500 m-4 p-1 rounded-md shadow-lg">
      <div className="lg:flex flex-col lg:items-center lg:justify-center lg:w-auto">
        <h2 className="text-lg italic  font-bold mb-4  ">Browse by Category</h2>
        {loading ? (
          <div className="min-h-screen w-full flex justify-center items-center">
            <Circles
              height={"80"}
              width={"80"}
              color="rgb(67 56 202)"
              visible={true}
            />
          </div>
        ) : (
          <ul className="list-disc list-inside">
            {categories.length ? (
              categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className="list-none cursor-pointer mb-2 hover:text-gray-800"
                >
                  {category.name}
                </li>
              ))
            ) : (
              <div className="text-white">No categories found</div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
