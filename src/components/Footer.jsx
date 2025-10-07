import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#2B6CB0] text-white mt-10">
      {/* Brand Info */}
      <div className="max-w-7xl mx-auto px-6 py-10 text-center space-y-2">
        <h2 className="text-2xl font-bold">E-Cart</h2>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed">
          Your one-stop ecommerce store for the latest products and best deals.
        </p>
        <p className="text-gray-200 text-sm md:text-base">Created By Shrawan</p>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400/20 py-4 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} E-cart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
