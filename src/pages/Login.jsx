import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);

  const dispatch = useDispatch();

  const handleVisiblePassword = () => {
    setVisiblePass((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = user.includes("@")
      ? { email: user, password: password }
      : { username: user, password: password };

    dispatch(loginUser(formData));

    setPassword("");
    setUser("");

    console.log("login successFul");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username or email"
            name="user"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
        </div>
        <div>
          <input
            type={visiblePass ? "text" : "password"}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="button" onClick={handleVisiblePassword}>
            {visiblePass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </>
  );
};

export default Login;
