import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [repassword, setRepassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRepass, setVisibleRepass] = useState(false);
  const dispatch = useDispatch();

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
    if(formData.password !== repassword){
        alert("Passwords are not matching");
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
    <section className="w-full h-full bg-white flex justify-center items-center relative">
      <form onSubmit={handleSubmit} className="w-80 h-96 bg-[#FEB21A] rounded-md sm:hidden">
        <h2 className="text-center text-3xl font-bold mt-3">Register </h2>
        <div className="w-[95%] flex gap-4 justify-between items-center mt-3">
          <label className="text-xl">Username </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleFormDataOnchange}
            className="h-10 border rounded-md px-2"
          />
        </div>
        <div className="w-[95%] flex gap-4 justify-between items-center mt-3">
          <label className="text-xl">Email </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormDataOnchange}
            className="h-10 border rounded-md px-2"
          />
        </div>
        <div className="w-[95%] flex gap-4 justify-between items-center mt-3 relative">
          <label className="text-xl">Password </label>
          <input
            type={visiblePass ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleFormDataOnchange}
            className="h-10 border rounded-md px-2"
          />

          <button type="button" onClick={handleVisiblePassword} className="absolute right-2">
            {visiblePass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="w-[95%] flex gap-4 justify-between items-center mt-3 relative">
          <label className="text-xl">Re-Pass </label>
          <input
            type={visibleRepass ? "text" : "password"}
            onChange={(e) => setRepassword(e.target.value)}
            value={repassword}
            className="h-10 border rounded-md px-2"
          />
          <button type="button" onClick={hanldeVisibleRepassword} className="absolute right-2">
            {visibleRepass ? <FaEyeSlash /> : <FaEye />}{" "}
          </button>
        </div>
        <div className="w-[95%] flex gap-4 justify-between items-center mt-3">
          <input
            type="submit"
            value="Register"
            className="w-full hover:cursor-pointer text-xl"
          />
        </div>
      </form>
      
    </section>
  );
};

export default Register;
