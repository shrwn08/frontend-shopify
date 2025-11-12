import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters, getCategories } from "../redux/slices/productSlice";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const FilterBar = () => {
  const dispatch = useDispatch();
  const { filters, categories } = useSelector((state) => state.products);
  const [showFilters, setShowFilters] = React.useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-[#2B6CB0] text-white px-4 py-2 rounded-md"
        >
          <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          <FaTimes /> Reset
        </button>
      </div>

      {/* Filters */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:block space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-4`}
      >
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]"
        />

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="rating-desc">Highest Rated</option>
        </select>
      </div>

      {/* Desktop Reset Button */}
      <div className="hidden md:flex justify-end mt-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
        >
          <FaTimes /> Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;