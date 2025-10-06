import React, { useState } from "react";
import Logo from "../assets/image/logo.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuBtn, setMenuBtn] = useState(false);

  const handleMenuToggle = () => {
    setMenuBtn((prev) => !prev);
  };
  return (
    <section className="w-full h-20 bg-[#2B6CB0] flex justify-center items-center relative">
      <header className="w-19/20 h-full flex justify-between items-center">
        <div>
          <img src={Logo} alt="logo" className="h-16" />
        </div>
        <div className="z-100 sm:hidden">
          <button type="button" onClick={handleMenuToggle}>
            {menuBtn ? (
              <IoMdClose
                style={{
                  fontSize: "28px",
                }}
              />
            ) : (
              <IoMdMenu style={{ fontSize: "28px" }} />
            )}
          </button>
        </div>

      </header>
      {menuBtn && (
        <div className="h-screen w-4/5 bg-white absolute top-0 right-0 z-10">
            <div className="h-20 w-full">

            </div>
          <div className="text-xl border-b-2 py-2 border-gray-400/15 hover:cursor-pointer pl-3">
            <Link to="/login">Login</Link>
          </div>
          <div className="text-xl border-b-2 py-2 border-gray-400/15 hover:cursor-pointer pl-3">
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
