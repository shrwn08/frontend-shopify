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
    <section className="w-full h-20 bg-[#2B6CB0] flex justify-center items-center relative shadow-md">
  <header className="w-[90%] h-full flex justify-between items-center">
    {/* Logo */}
    <Link to="/">
      <img src={Logo} alt="logo" className="h-14 sm:h-16 object-contain" />
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden sm:flex items-center gap-6 text-white font-medium">
      <Link
        to="/login"
        className="hover:text-[#FACC15] transition-colors duration-200"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-[#F57C00] px-4 py-2 rounded-lg text-white hover:bg-[#E65100] transition-colors duration-200"
      >
        Register
      </Link>
    </nav>

    {/* Mobile Menu Button */}
    <div className="z-50 sm:hidden">
      <button
        type="button"
        onClick={handleMenuToggle}
        className="text-white focus:outline-none"
      >
        {menuBtn ? (
          <IoMdClose style={{ fontSize: "28px" }} />
        ) : (
          <IoMdMenu style={{ fontSize: "28px" }} />
        )}
      </button>
    </div>
  </header>

  {/* Mobile Menu */}
  {menuBtn && (
    <div className="h-screen w-4/5 bg-white absolute top-0 right-0 z-40 shadow-lg animate-slideIn">
      <div className="h-20 w-full flex items-center justify-end pr-6">
        <button type="button" onClick={handleMenuToggle}>
          <IoMdClose style={{ fontSize: "28px", color: "#2B6CB0" }} />
        </button>
      </div>

      <div className="flex flex-col text-xl font-medium">
        <Link
          to="/login"
          className="border-b border-gray-300 py-3 pl-5 text-[#1A202C] hover:bg-[#F7FAFC] hover:text-[#2B6CB0] transition-all"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="border-b border-gray-300 py-3 pl-5 text-[#1A202C] hover:bg-[#F7FAFC] hover:text-[#F57C00] transition-all"
        >
          Register
        </Link>
      </div>
    </div>
  )}
</section>

  );
};

export default Header;
