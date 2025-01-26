import React from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UsersPage from "./pages/UsersPage";
import useAuth from "./hooks/useAuth";
import CounterPage from "./pages/CountersPage";
import DishesPage from "./pages/DishesPage";
import CartPage from "./pages/CartPage";

export default function App() {
  useAuth();
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/counters" element={<CounterPage />} />
          <Route path="/dishes" element={<DishesPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
