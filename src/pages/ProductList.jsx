import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProducts, getProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import FilterBar from "../components/FilterBar.jsx";
import CategorySidebar from "../components/CategorySidebar.jsx";
import SearchResults from "../components/SearchResults.jsx";
import {
  addingToCart,
  clearCartMessage,
  clearCartError,
} from "../redux/slices/cartSlice.js";
import Toast from "../components/Toast";

function ProductList() {
  const { filteredProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { message: cartMessage, error: cartError } = useSelector(
    (state) => state.cart
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  useEffect(() => {
    if (cartMessage) {
      const safeMessage =
        typeof cartMessage === "string"
          ? cartMessage
          : cartMessage?.message || "Success";
      setToast({ message: safeMessage, type: "success" });
      setTimeout(() => dispatch(clearCartMessage()), 3000);
    }
  }, [cartMessage, dispatch]);

  useEffect(() => {
    if (cartError) {
      const safeError =
        typeof cartError === "string"
          ? cartError
          : cartError?.error || cartError?.message || "An error occurred";
      setToast({ message: safeError, type: "error" });
      setTimeout(() => dispatch(clearCartError()), 3000);
    }
  }, [cartError, dispatch]);

  const handleAddToCartBtn = (id) => {
    if (!isAuthenticated) {
      setToast({
        message: "Please login to add items to cart",
        type: "error",
      });
      return;
    }
    dispatch(addingToCart({ productId: id, quantity: 1 }));
  };

  if (loading)
    return <p className="text-center mt-32 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center mt-32 text-red-500">{error}</p>;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <section className="w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF]">
        {/* Hero */}
        <div className="w-full mb-10 mt-20">
          <Hero />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Bar */}
          <FilterBar />

          {/* Search Results Info */}
          <SearchResults />

          {/* Main Content with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Sidebar - Desktop */}
            <aside className="hidden lg:block lg:w-64">
              <CategorySidebar />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="w-full py-20 text-center bg-white rounded-lg shadow-sm">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
                    alt="No results"
                    className="w-32 h-32 mx-auto mb-4 opacity-50"
                  />
                  <p className="text-2xl text-gray-500 font-semibold">
                    No products found
                  </p>
                  <p className="text-gray-400 mt-2">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-20">
                  {filteredProducts.map((product) => {
                    // CRITICAL FIX: Safely get category with fallback
                    const categoryName = product?.category || "general";
                    const displayCategory = categoryName
                      .replace(/-/g, " ")
                      .replace(/_/g, " ");

                    return (
                      <div
                        key={product._id}
                        className="relative bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Stock Badge */}
                        <p
                          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm z-10 ${
                            product.stock > 0
                              ? "bg-green-600 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {product.stock > 0
                            ? `Stock: ${product.stock}`
                            : "Out of Stock"}
                        </p>

                        {/* Category Badge - COMPLETELY SAFE */}
                        <p className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10 capitalize">
                          {displayCategory}
                        </p>

                        {/* Image */}
                        <Link
                          to={`/product/${product._id}`}
                          className="block group"
                        >
                          <img
                            loading="lazy"
                            src={product.thumbnail || "https://via.placeholder.com/150"}
                            alt={product.name || "Product"}
                            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        {/* Info */}
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                            {product.name || "Unknown Product"}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                            {product.description || "No description available"}
                          </p>

                          <div className="flex justify-between items-center mb-4">
                            <p className="text-xl font-bold text-[#F97316]">
                              ₹{(product.price || 0).toFixed(2)}
                            </p>
                            <p className="text-sm font-medium text-yellow-500">
                              ⭐ {product.rating?.toFixed(1) || "N/A"}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddToCartBtn(product._id)}
                            disabled={product.stock === 0}
                            className={`w-full py-2 rounded-md font-semibold text-white transition-all duration-300 ${
                              product.stock === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                            }`}
                          >
                            {product.stock === 0
                              ? "Out of Stock"
                              : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Category Filter */}
          <div className="lg:hidden mb-6">
            <CategorySidebar />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductList;