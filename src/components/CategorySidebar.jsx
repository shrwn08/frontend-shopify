import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, getCategories } from "../redux/slices/productSlice";
import { FaTags } from "react-icons/fa";

const CategorySidebar = () => {
  const dispatch = useDispatch();
  const { categories, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setFilters({ category }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <FaTags className="text-[#2563EB] text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleCategoryClick("all")}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
            filters.category === "all"
              ? "bg-[#2563EB] text-white font-semibold"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 capitalize ${
              filters.category === category
                ? "bg-[#2563EB] text-white font-semibold"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;