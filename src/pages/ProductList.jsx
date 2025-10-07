import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";

function ProductList() {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p>loading... </p>;
  if (error) return <p>{error.message}</p>;

  console.log(products);
  return (
 <section className="w-full min-h-screen bg-[#F7FAFC] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
  {products.map((product) => (
    <div
      key={product._id}
      className="relative bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Stock Badge */}
      <p className="absolute top-2 left-2 bg-[#2B6CB0] text-white text-xs font-medium px-2 py-1 rounded-md">
        {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
      </p>

      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="block">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <p className="text-lg font-semibold text-[#1A202C] truncate">
          {product.name}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {product.description.slice(0, 40)}...
        </p>

        {/* Price & Rating */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-[#F57C00]">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="text-sm text-yellow-500 font-medium">
            ⭐ {product.rating?.toFixed(1) ?? "N/A"}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          className="w-full mt-4 bg-[#2B6CB0] text-white font-semibold py-2 rounded-md hover:bg-[#1E3A8A] transition-colors duration-200 disabled:bg-gray-400"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  ))}
</section>


  );
}

export default ProductList;
