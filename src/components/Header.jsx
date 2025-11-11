import React, { useState } from "react";
import Logo from "../assets/image/logo.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const [menuBtn, setMenuBtn] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    setMenuBtn((prev) => !prev);
  };

  const handleLogOutBtn = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  // return (
  //   <section className="w-full h-20 bg-[#2B6CB0] flex justify-center items-center relative shadow-md">
  //     <header className="w-[90%] h-full flex justify-between items-center">
  //       {/* Logo */}
  //       <Link to="/">
  //         <img src={Logo} alt="logo" className="h-14 sm:h-16 object-contain" />
  //       </Link>

  //       {/* Desktop Nav */}
  //       <nav className="hidden sm:flex items-center gap-6 text-white font-medium">
  //         {isAuthenticated ? (
  //           <>
  //             <Link
  //               to="/cart"
  //               className="bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600 transition-colors duration-200 flex items-center gap-1"
  //             >
  //               Cart <FaCartPlus />
  //             </Link>
  //             <button
  //               type="button"
  //               onClick={handleLogOutBtn}
  //               className="bg-[#F57C00] px-4 py-2 rounded-lg text-white hover:bg-[#E65100] transition-colors duration-200"
  //             >
  //               Log Out
  //             </button>
  //           </>
  //         ) : (
  //           <>
  //             <Link
  //               to="/login"
  //               className="hover:text-[#FACC15] transition-colors duration-200"
  //             >
  //               Login
  //             </Link>
  //             <Link
  //               to="/register"
  //               className="bg-[#F57C00] px-4 py-2 rounded-lg text-white hover:bg-[#E65100] transition-colors duration-200"
  //             >
  //               Register
  //             </Link>
  //           </>
  //         )}
  //       </nav>

  //       {/* Mobile Menu Button */}
  //       <div className="z-50 sm:hidden">
  //         <button
  //           type="button"
  //           onClick={handleMenuToggle}
  //           className="text-white focus:outline-none"
  //         >
  //           {menuBtn ? (
  //             <IoMdClose style={{ fontSize: "28px" }} />
  //           ) : (
  //             <IoMdMenu style={{ fontSize: "28px" }} />
  //           )}
  //         </button>
  //       </div>
  //     </header>

  //     {/* Mobile Menu */}
  //     {menuBtn && (
  //       <div className="h-screen w-4/5 bg-white absolute top-0 right-0 z-40 shadow-lg animate-slideIn">
  //         <div className="h-20 w-full flex items-center justify-end pr-6">
  //           <button type="button" onClick={handleMenuToggle}>
  //             <IoMdClose style={{ fontSize: "28px", color: "#2B6CB0" }} />
  //           </button>
  //         </div>

  //         <div className="flex flex-col text-xl font-medium px-5 gap-4">
  //           {isAuthenticated ? (
  //             <>
  //               <Link
  //                 to="/cart"
  //                 className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600 transition-colors duration-200"
  //                 onClick={handleMenuToggle}
  //               >
  //                 Cart <FaCartPlus />
  //               </Link>
  //               <button
  //                 type="button"
  //                 onClick={() => {
  //                   handleLogOutBtn();
  //                   handleMenuToggle();
  //                 }}
  //                 className="bg-[#F57C00] px-4 py-2 rounded-lg text-white hover:bg-[#E65100] transition-colors duration-200"
  //               >
  //                 Log Out
  //               </button>
  //             </>
  //           ) : (
  //             <>
  //               <Link
  //                 to="/login"
  //                 className="border-b border-gray-300 py-3 pl-5 text-[#1A202C] hover:bg-[#F7FAFC] hover:text-[#2B6CB0] transition-all"
  //                 onClick={handleMenuToggle}
  //               >
  //                 Login
  //               </Link>
  //               <Link
  //                 to="/register"
  //                 className="border-b border-gray-300 py-3 pl-5 text-[#1A202C] hover:bg-[#F7FAFC] hover:text-[#F57C00] transition-all"
  //                 onClick={handleMenuToggle}
  //               >
  //                 Register
  //               </Link>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </section>
  // );
return (
    <header className="w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-14 object-contain" />
         
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-8 text-white font-medium">
          {isAuthenticated ? (
            <>
              <Link
                to="/cart"
                className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-400 transition-all duration-200"
              >
                Cart <FaCartPlus />
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
          className="sm:hidden text-white text-3xl focus:outline-none"
        >
          {menuBtn ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuBtn && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg sm:hidden animate-slideIn">
          <div className="flex flex-col gap-3 py-6 px-6 text-gray-800 font-semibold">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400"
                  onClick={handleMenuToggle}
                >
                  Cart <FaCartPlus />
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
