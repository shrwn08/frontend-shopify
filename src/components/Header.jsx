import React, { useState } from "react";
import Logo from "../assets/image/logo.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { logout } from "../redux/slices/authSlice";
import { setFilters } from "../redux/slices/productSlice";

const Header = () => {
  const [menuBtn, setMenuBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuBtn((prev) => !prev);
  };

  const handleLogOutBtn = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setFilters({ search: searchQuery }));
      navigate("/");
    }
  };

  const cartItemCount = cart?.length || 0;

  return (
    <header className="w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-14 object-contain" />
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white rounded-full px-4 py-2 flex-1 max-w-md mx-6"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-gray-700 px-2"
          />
          <button
            type="submit"
            className="text-[#2563EB] hover:text-[#1E40AF] transition"
          >
            <FaSearch size={18} />
          </button>
        </form>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium">
          {isAuthenticated ? (
            <>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-400 transition-all duration-200"
              >
                Cart <FaCartPlus />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogOutBtn}
                className="bg-[#F97316] px-4 py-2 rounded-md hover:bg-[#EA580C] transition-all duration-200"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#F97316] px-4 py-2 rounded-md text-white hover:bg-[#EA580C] transition-all duration-200"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMenuToggle}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {menuBtn ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <form
        onSubmit={handleSearch}
        className="md:hidden bg-white mx-6 mb-4 rounded-full px-4 py-2 flex items-center"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-gray-700 px-2"
        />
        <button
          type="submit"
          className="text-[#2563EB] hover:text-[#1E40AF] transition"
        >
          <FaSearch size={18} />
        </button>
      </form>

      {/* Mobile Menu */}
      {menuBtn && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg md:hidden animate-slideIn">
          <div className="flex flex-col gap-3 py-6 px-6 text-gray-800 font-semibold">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400"
                  onClick={handleMenuToggle}
                >
                  Cart <FaCartPlus />
                  {cartItemCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    handleLogOutBtn();
                    handleMenuToggle();
                  }}
                  className="bg-[#F97316] text-white px-4 py-2 rounded-md hover:bg-[#EA580C]"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border-b border-gray-200 py-3 hover:bg-gray-50 hover:text-[#2563EB] transition-all"
                  onClick={handleMenuToggle}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-b border-gray-200 py-3 hover:bg-gray-50 hover:text-[#F97316] transition-all"
                  onClick={handleMenuToggle}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;