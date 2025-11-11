import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantityItem,
  getCartItems,
  localUpdateQuantity,
  removeProductFromCart,
  clearCartMessage,
  clearCartError,
} from "../redux/slices/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error, message } = useSelector((state) => state.cart);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

   useEffect(() => {
    if (message) {
      const safeMessage = typeof message === "string" 
        ? message 
        : message?.message || "Success";
      setToast({ message: safeMessage, type: "success" });
      setTimeout(() => dispatch(clearCartMessage()), 3000);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      const safeError = typeof error === "string" 
        ? error 
        : error?.error || error?.message || "An error occurred";
      setToast({ message: safeError, type: "error" });
      setTimeout(() => dispatch(clearCartError()), 3000);
    }
  }, [error, dispatch]);

  const handleQuantityIncrement = (e, id, quantity) => {
    e.preventDefault();
    dispatch(localUpdateQuantity({ id, change: +1 }));
    dispatch(updateQuantityItem({ id, quantity: quantity + 1 }));
  };

  const handleQuantityDecrement = (e, id, quantity) => {
    e.preventDefault();
    if (quantity > 1) {
      dispatch(localUpdateQuantity({ id, change: -1 }));
      dispatch(updateQuantityItem({ id, quantity: quantity - 1 }));
    }
  };

  function handleRemoveButton(id) {
    dispatch(removeProductFromCart({ id }));
  }

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
    : 0;

  
  if (loading && !cart.length) {
    return <p className="text-center mt-32 text-lg">Loading...</p>;
  }

  console.log(cart);
  if (!cart || cart.length === 0) {
    return (
      <>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#F7FAFC] py-10 px-4 mt-20">
          <div className="bg-white shadow-lg rounded-2xl p-12 max-w-md text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-40 h-40 mx-auto mb-6 opacity-70"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Looks like you haven't added anything yet. Start shopping now!
            </p>
            <Link
              to="/"
              className="inline-block bg-[#2B6CB0] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#1E3A8A] transition duration-200 shadow-md hover:shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row justify-between bg-[#F7FAFC] py-10 px-4 md:px-10 mt-20">
        {/* Left: Cart Items */}
        <div className="w-full md:w-8/12 bg-white shadow-md rounded-lg p-6 md:mr-6 mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-[#2B6CB0] mb-6">Your Cart</h1>

          <div className="flex flex-col gap-6">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
              >
                {/* Product Image & Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={product.productId.thumbnail}
                    alt={product.productId.name}
                    className="w-24 h-24 object-cover rounded-md shadow-sm"
                  />
                  <div>
                    <p className="text-lg font-semibold text-[#1A202C]">
                      {product.productId.name.substring(0, 15)}...
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{product.productId.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <button
                    type="button"
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) =>
                      handleQuantityDecrement(e, product._id, product.quantity)
                    }
                    disabled={product.quantity <= 1}
                  >
                    <FaMinus className="text-[#2B6CB0]" />
                  </button>
                  <span className="text-lg font-semibold">
                    {product.quantity}
                  </span>
                  <button
                    type="button"
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    onClick={(e) =>
                      handleQuantityIncrement(e, product._id, product.quantity)
                    }
                  >
                    <FaPlus className="text-[#2B6CB0]" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="flex flex-col justify-center items-center gap-2">
                  <p className="text-lg font-bold text-[#F57C00]">
                    ₹{(product.productId.price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-full"
                    title="Remove from cart"
                    onClick={() => handleRemoveButton(product._id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/12 md:sticky md:top-24 md:self-start">
          <h2 className="text-xl font-bold text-[#1A202C] mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-700 text-base mb-2">
            <p>Subtotal</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-700 text-base mb-2">
            <p>Shipping</p>
            <p className="font-semibold text-green-600">
              {total > 500 ? "Free" : "₹50"}
            </p>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold text-[#F57C00]">
            <p>Total</p>
            <p>₹{total > 500 ? total.toFixed(2) : (total + 50).toFixed(2)}</p>
          </div>

          {/* Checkout Button */}
          <Link to="/checkout">
            <button
              type="button"
              className="mt-6 w-full bg-[#2B6CB0] text-white py-3 rounded-md font-semibold text-lg hover:bg-[#1E3A8A] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Cart;