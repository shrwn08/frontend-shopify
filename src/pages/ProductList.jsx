import React  from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProducts, getProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import { addingToCart } from "../redux/slices/cartSlice.js";

function ProductList() {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(getProducts());
    return ()=>(
      dispatch(clearProducts())
    );

  }, [dispatch]);

  console.log(products)


  const handleAddToCartBtn = (id) =>{
   
    
    dispatch(addingToCart({productId : id,quantity : 1}));
 
  }

  if (loading) return <p>loading... </p>;
  if (error) return <p>{error.message}</p>;

 
//   return (
// <section className="w-full min-h-screen bg-[#F7FAFC] flex flex-col items-center">
//   {/* --- Hero Section --- */}
//   <div className="w-full mb-20">
//     <Hero />
//   </div>

//   {/* --- Product List --- */}
//   <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//     {products.map((product) => (
//       <div
//         key={product._id}
//         className="relative bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
//       >
//         {/* Stock Badge */}
//         <p
//           className={`absolute top-2 left-2 ${
//             product.stock > 0 ? "bg-[#2B6CB0]" : "bg-gray-400"
//           } text-white text-xs font-medium px-2 py-1 rounded-md`}
//         >
//           {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
//         </p>

//         {/* Product Image */}
//         <Link to={`/product/${product._id}`} className="block">
//           <img 
//             loading="lazy"
//             src={product.thumbnail}
//             alt={product.name}
//             className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
//           />
//         </Link>

//         {/* Product Info */}
//         <div className="p-4">
//           <p className="text-lg font-semibold text-[#1A202C] truncate">
//             {product.name}
//           </p>
//           <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//             {product.description.slice(0, 50)}...
//           </p>

//           {/* Price & Rating */}
//           <div className="flex justify-between items-center mt-3">
//             <p className="text-lg font-bold text-[#F57C00]">
//               ₹{product.price.toFixed(2)}
//             </p>
//             <p className="text-sm text-yellow-500 font-medium">
//               ⭐ {product.rating ?? "N/A"}
//             </p>
//           </div>

//           {/* Add to Cart Button */}
//         <button
//             type="button"
//             onClick={()=>handleAddToCartBtn(product._id)}
//             className="w-full mt-4 bg-[#2B6CB0] text-white font-semibold py-2 rounded-md hover:bg-[#1E3A8A] transition-colors duration-200 disabled:bg-gray-400 hover:cursor-pointer"
//             disabled={product.stock === 0}
//           >
//             {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
//           </button>
          
//         </div>
//       </div>
//     ))}
//   </div>
// </section>


//   );

return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF] flex flex-col items-center">
      {/* Hero */}
      <div className="w-full mb-16">
        <Hero />
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-20">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Stock Badge */}
            <p
              className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                product.stock > 0
                  ? "bg-green-600 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
            </p>

            {/* Image */}
            <Link to={`/product/${product._id}`} className="block group">
              <img
                loading="lazy"
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Info */}
            <div className="p-5 flex flex-col justify-between h-48">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description.slice(0, 60)}...
                </p>
              </div>

              {/* Price + Rating */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-lg font-bold text-[#F97316]">
                  ₹{product.price.toFixed(2)}
                </p>
                <p className="text-sm font-medium text-yellow-500">
                  ⭐ {product.rating ?? "N/A"}
                </p>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => handleAddToCartBtn(product._id)}
                disabled={product.stock === 0}
                className={`mt-4 w-full py-2 rounded-md font-semibold text-white transition-all duration-300 ${
                  product.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
