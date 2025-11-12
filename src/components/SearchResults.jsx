import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFilters } from "../redux/slices/productSlice";
import { FaTimes } from "react-icons/fa";

const SearchResults = () => {
  const { filters, filteredProducts, products } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const hasActiveFilters =
    filters.search ||
    filters.category !== "all" ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.sort;

  if (!hasActiveFilters) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Search: "{filters.search}"
              </span>
            )}
            {filters.category !== "all" && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {filters.category}
              </span>
            )}
            {filters.minPrice && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Min: ₹{filters.minPrice}
              </span>
            )}
            {filters.maxPrice && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Max: ₹{filters.maxPrice}
              </span>
            )}
            {filters.sort && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {filters.sort.replace("-", ": ").toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Found <strong>{filteredProducts.length}</strong> of{" "}
            <strong>{products.length}</strong> products
          </p>
        </div>
        <button
          onClick={() => dispatch(resetFilters())}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition"
        >
          <FaTimes /> Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchResults;