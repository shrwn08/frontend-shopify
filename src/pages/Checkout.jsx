import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAddress } from "../redux/slices/authSlice"; 
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }
    dispatch(updateAddress(address));
    setAddress("");
    alert("Thank you!")
    setTimeout(()=>{
        navigate("/");
    },5000)
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-semibold mb-4">Update Address</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your current address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full rounded-md"
          rows="4"
        ></textarea>
        <input
          type="submit"
          value="Update"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer hover:bg-blue-700"
        />
      </form>
    </div>
  );
};

export default Checkout;
