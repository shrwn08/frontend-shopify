import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCartError, clearCartMessage, placeOrder} from "../redux/slices/cartSlice"
import {clearMessages} from "../redux/slices/authSlice"
import { useEffect } from "react";
import Toast from "../components/Toast";

const Checkout = () => {
  const [address, setAddress] = useState("");
   const [toast, setToast] = useState(null);
   const { cart, loading: cartLoading, message: cartMessage, error: cartError } = useSelector((state) => state.cart);
  const { user, loading: authLoading, successMessage, error: authError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


 useEffect(() => {
    if (successMessage) {
      const safeMessage = typeof successMessage === "string" 
        ? successMessage 
        : successMessage?.message || "Success";
      setToast({ message: safeMessage, type: "success" });
      setTimeout(() => dispatch(clearMessages()), 3000);
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (authError) {
      const safeError = typeof authError === "string" 
        ? authError 
        : authError?.error || authError?.message || "An error occurred";
      setToast({ message: safeError, type: "error" });
      setTimeout(() => dispatch(clearMessages()), 3000);
    }
  }, [authError, dispatch]);

  useEffect(() => {
    if (cartMessage) {
      const safeMessage = typeof cartMessage === "string" 
        ? cartMessage 
        : cartMessage?.message || "Success";
      setToast({ message: safeMessage, type: "success" });
      setTimeout(() => dispatch(clearCartMessage()), 3000);
    }
  }, [cartMessage, dispatch]);

  useEffect(() => {
    if (cartError) {
      const safeError = typeof cartError === "string" 
        ? cartError 
        : cartError?.error || cartError?.message || "An error occurred";
      setToast({ message: safeError, type: "error" });
      setTimeout(() => dispatch(clearCartError()), 3000);
    }
  }, [cartError, dispatch]);

  const handleSubmit = (e) => {
   e.preventDefault();

    if (!address.trim()) {
      setToast({ message: "Please enter your address", type: "error" });
      return;
    }

    if (address.length < 20) {
      setToast({
        message: "Address must be at least 20 characters long",
        type: "error",
      });
      return;
    }

    dispatch(updateAddress(address));
    setAddress("");
  };

  const handlePlaceOrder = () => {
  if (!user || !user.address) {
      setToast({
        message: "Please save your address before placing an order",
        type: "error",
      });
      return;
    }

    dispatch(placeOrder());
    setToast({ message: "Order placed successfully!", type: "success" });
    setTimeout(() => navigate("/"), 3000);
  };



   const loading = cartLoading || authLoading;

     if (loading) return <p className="text-center mt-10">Loading...</p>;

  // Calculate total order amount
  const totalAmount = cart.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <>
       {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address Card */}
        <div className="p-6 shadow-lg rounded-xl bg-white">
          <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Enter your current address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            <input
              type="submit"
              value="Save Address"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
            />
          </form>
        </div>

        {/* Summary Card */}
        <div className="p-6 shadow-lg rounded-xl bg-white">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Order Summary
          </h2>
          {cart && cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => {
                const { _id, productId, quantity } = item;
                const name = productId?.name || "Unknown Product";
                const price = productId?.price || 0;
                const total = price * quantity;

                return (
                  <div
                    key={_id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-gray-600">
                        ${price.toFixed(2)} × {quantity}
                      </p>
                    </div>
                    <p className="font-semibold">${total.toFixed(2)}</p>
                  </div>
                );
              })}

              {/* Total Section */}
              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-lg font-bold text-green-700">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
              >
                Place Order
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
