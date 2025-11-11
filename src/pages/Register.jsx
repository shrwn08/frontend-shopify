import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessages } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useEffect } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [repassword, setRepassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRepass, setVisibleRepass] = useState(false);
   const [toast, setToast] = useState(null);
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const { successMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (successMessage) {
      setToast({ message: successMessage, type: "success" });
      setTimeout(() => {
        dispatch(clearMessages());
        navigate("/login");
      }, 2000);
    }
  }, [successMessage, dispatch, navigate]);

  const handleVisiblePassword = () => {
    setVisiblePass((prev) => !prev);
  };

  const hanldeVisibleRepassword = () => {
    setVisibleRepass((prev) => !prev);
  };

  const handleFormDataOnchange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setToast({ message: "Please fill in all fields", type: "error" });
      return;
    }
    if(formData.password !== repassword){
         setToast({ message: "Passwords do not match", type: "error" });
      return;
    }

    if (formData.password.length < 6) {
      setToast({ message: "Password must be at least 6 characters", type: "error" });
      return;
    } 
    dispatch(registerUser(formData));
    setFormData({
        username : "",
        email : "",
        password : ""
    });
    setRepassword("");
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
      Create Account
    </h2>

    {/* Username */}
    <div className="flex flex-col mb-4">
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleFormDataOnchange}
        className="h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#2B6CB0] transition"
        placeholder="Enter your username"
      />
    </div>

    {/* Email */}
    <div className="flex flex-col mb-4">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleFormDataOnchange}
        className="h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#2B6CB0] transition"
        placeholder="Enter your email"
      />
    </div>

    {/* Password */}
    <div className="flex flex-col mb-4 relative">
      <input
        type={visiblePass ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleFormDataOnchange}
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

    {/* Re-enter Password */}
    <div className="flex flex-col mb-6 relative">
      <input
        type={visibleRepass ? "text" : "password"}
        onChange={(e) => setRepassword(e.target.value)}
        value={repassword}
        className="h-10 border border-gray-300 rounded-md px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2B6CB0] transition"
        placeholder="Re-enter password"
      />
      <button
        type="button"
        onClick={hanldeVisibleRepassword}
        className="absolute right-3 bottom-3 text-gray-500 hover:text-[#2B6CB0]"
      >
        {visibleRepass ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>

    {/* Submit Button */}
    <div className="flex justify-center">
      <input
        type="submit"
        value="Register"
        className="w-full bg-[#F57C00] hover:bg-[#E65100] text-white font-semibold text-lg py-2 rounded-md transition cursor-pointer"
      />
    </div>

    {/* Footer */}
    <p className="text-center text-gray-600 text-sm mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-[#2B6CB0] font-medium hover:underline">
        Login here
      </Link>
    </p>
  </form>
</section>
</>

  );
};

export default Register;
