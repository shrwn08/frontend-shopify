import { useState, useEffect } from "react";
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleFormDataOnchange}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormDataOnchange}
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type={visiblePass ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleFormDataOnchange}
          />

          <button type="button" onClick={handleVisiblePassword}>
            {visiblePass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          <label>Re-Password :</label>
          <input
            type={visibleRepass ? "text" : "password"}
            onChange={(e) => setRepassword(e.target.value)}
            value={repassword}
          />
          <button type="button" onClick={hanldeVisibleRepassword}>
            {visibleRepass ? <FaEyeSlash /> : <FaEye />}{" "}
          </button>
        </div>
        <div>
          <input
            type="submit"
            value="Register"
            className="hover:cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default Register;
