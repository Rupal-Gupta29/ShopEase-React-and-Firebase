import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import Cart from "./pages/cart/Cart";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetailed from "./pages/productDetailed/ProductDetailed";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetailed />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
