import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessages } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Toast from "../components/Toast";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
   const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { successMessage, error } = useSelector((state) => state.auth);


  useEffect(() => {
    if (successMessage) {
      setToast({ message: successMessage, type: "success" });
      setTimeout(() => {
        dispatch(clearMessages());
        navigate("/");
      }, 1500);
    }
  }, [successMessage, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: "error" });
      setTimeout(() => dispatch(clearMessages()), 3000);
    }
  }, [error, dispatch]);

  const handleVisiblePassword = () => {
    setVisiblePass((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.trim() || !password.trim()) {
      setToast({ message: "Please fill in all fields", type: "error" });
      return;
    }

    const formData = user.includes("@")
      ? { email: user, password: password }
      : { username: user, password: password };

    dispatch(loginUser(formData));

    setPassword("");
   
  };

  return (
  <>
  {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    <section className="w-full min-h-screen bg-[#F7FAFC] flex justify-center items-center py-10 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-8"
  >
    <h2 className="text-center text-3xl font-bold text-[#2B6CB0] mb-6">
      Welcome Back
    </h2>

    {/* Username or Email */}
    <div className="flex flex-col mb-4">
      <input
        type="text"
        placeholder="Enter your username or email"
        name="user"
        onChange={(e) => setUser(e.target.value)}
        value={user}
        className="h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#2B6CB0] transition"
      />
    </div>

    {/* Password */}
    <div className="flex flex-col mb-6 relative">
      <input
        type={visiblePass ? "text" : "password"}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="h-10 border border-gray-300 rounded-md px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2B6CB0] transition"
        placeholder="Enter your password"
      />
      <button
        type="button"
        onClick={handleVisiblePassword}
        className="absolute right-3 top-3 text-gray-500 hover:text-[#2B6CB0]"
      >
        {visiblePass ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>

    {/* Submit Button */}
    <div className="flex justify-center">
      <input
        type="submit"
        value="Login"
        className="w-full bg-[#F57C00] hover:bg-[#E65100] text-white font-semibold text-lg py-2 rounded-md transition cursor-pointer"
      />
    </div>

    {/* Footer Links */}
    <div className="mt-4 text-center text-sm text-gray-600">
      <p>
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-[#2B6CB0] font-medium hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  </form>
</section>
  </>

  );
};

export default Login;
