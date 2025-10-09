import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/slices/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";


const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
 
  if ( !cart || cart.length === 0)
    return  <p className="text-center mt-10 text-gray-600 text-lg">No product added in the Cart</p>;
  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  console.log(cart);

    // Map structure from DB (productId contains details)
  const items = cart.map((item) => ({
    ...item.productId,
    quantity: item.quantity,
  }));

const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

 return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row justify-between bg-[#F7FAFC] py-10 px-4 md:px-10">
      {/* Left: Cart Items */}
      <div className="w-full md:w-8/12 bg-white shadow-md rounded-lg p-6 md:mr-6 mb-6 md:mb-0">
        <h1 className="text-2xl font-bold text-[#2B6CB0] mb-6">Your Cart</h1>

        <div className="flex flex-col gap-6">
          {items.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
            >
              {/* Product Image & Details */}
              <div className="flex items-center gap-4">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md shadow-sm"
                />
                <div>
                  <p className="text-lg font-semibold text-[#1A202C]">
                    {product.name.substring(0,15)}...
                  </p>
                  <p className="text-sm text-gray-600">
                    ₹{product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mt-3 sm:mt-0">
                <button
                  type="button"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  <FaMinus className="text-[#2B6CB0]" />
                </button>
                <span className="text-lg font-semibold">
                  {product.quantity}
                </span>
                <button
                  type="button"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  <FaPlus className="text-[#2B6CB0]" />
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-lg font-bold text-[#F57C00] mt-3 sm:mt-0">
                ₹{(product.price * product.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Summary */}
      <div
        className="
          bg-white shadow-md rounded-lg p-6 w-full md:w-3/12 
          md:sticky md:top-20 md:self-start
        "
      >
        <div>
          <h2 className="text-xl font-bold text-[#1A202C] mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-700 text-base mb-2">
            <p>Subtotal</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-700 text-base mb-2">
            <p>Shipping</p>
            <p>₹{total > 500 ? "Free" : "50"}</p>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold text-[#F57C00]">
            <p>Total</p>
            <p>
              ₹{total > 500 ? total.toFixed(2) : (total + 50).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          type="button"
          className="mt-6 w-full bg-[#2B6CB0] text-white py-3 rounded-md font-semibold text-lg hover:bg-[#1E3A8A] transition-colors duration-200"
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
