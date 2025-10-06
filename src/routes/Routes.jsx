import React from 'react'
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Login = lazy(()=>import("../pages/Login.jsx"));
const Register = lazy(()=>import("../pages/Register.jsx"));
const Home = lazy(()=> import("../pages/Home.jsx"));
const ProductDetails = lazy(()=>("../pages/ProductDetails.jsx"));


const router = createBrowserRouter([
    {
        path : "/",
        element : <Home />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/product/:id",
        element : <ProductDetails />
    }
])


const Routes= () => {
  return router;
}

export default Routes;