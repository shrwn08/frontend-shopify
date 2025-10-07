import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearProductDetails, getProductDetails } from "../redux/slices/productSlice";

const ProductDetails = () => {
  const  {id}  = useParams();
  const { productDetails, error, loading } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails({id}));
    }
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if(!productDetails)return <p className="text-center mt-10">Product not found.</p>;

  const { name, price, description, rating, stock, thumbnail } = productDetails;

  return (
    
    <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={thumbnail}
          alt={name}
          className="w-full max-w-md rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">{name}</h1>

          <div className="flex items-center gap-4 mt-2">
            <p className="text-2xl font-bold text-[#F57C00]">₹{price.toFixed(2)}</p>
            <p className="text-sm text-yellow-500 font-medium">⭐ {rating}</p>
            <p
              className={`text-sm font-medium ${
                stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
            </p>
          </div>

          <p className="text-gray-700 mt-6 leading-relaxed">{description}</p>
        </div>

        <button
          type="button"
          disabled={stock === 0}
          className={`mt-6 w-full md:w-1/2 bg-[#2B6CB0] text-white font-semibold py-3 rounded-md hover:bg-[#1E3A8A] transition-colors duration-200 disabled:bg-gray-400`}
        >
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
