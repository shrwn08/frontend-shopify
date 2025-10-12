import React from "react";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Checkout from "../pages/Checkout.jsx";

const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const ProductList = lazy(()=>import("../pages/ProductList.jsx"))
const ProductDetails = lazy(() => import("../pages/ProductDetails.jsx"));
const Cart = lazy(()=>import("../pages/Cart.jsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path : "/cart",
        element : <Cart />
      },
      {
        path : "/checkout",
        element:<Checkout />
      }
    ],
  },
]);

export default router;
