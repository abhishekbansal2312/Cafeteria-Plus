import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UsersPage from "./pages/UsersPage";
import useAuth from "./hooks/useAuth";
import CounterPage from "./pages/CountersPage";
import DishesPage from "./pages/DishesPage";
import CartPage from "./pages/CartPage";
import { ThemeContext } from "./context/ThemeContext";
import SingleCounterPage from "./pages/SingleCounterPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/footer/Footer";

export default function App() {
  useAuth();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} min-h-screen transition-colors duration-300`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage theme={theme} />} />
          <Route path="/counters" element={<CounterPage theme={theme} />} />
          <Route
            path="/counters/:id"
            element={<SingleCounterPage theme={theme} />}
          />
          <Route path="/dishes" element={<DishesPage />} />
          <Route path="/cart" element={<CartPage theme={theme} />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
