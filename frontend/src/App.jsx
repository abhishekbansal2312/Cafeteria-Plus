import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
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
import ScrollToTop from "./utils/ScrollToTop";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  useAuth();
  const { theme } = useContext(ThemeContext);
  const isLoggedIn = useSelector((state) => state.userDetail.isLoggedIn);

  function AuthGuard({ children }) {
    const location = useLocation();
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
  }

  function GuestGuard({ children }) {
    return isLoggedIn ? <Navigate to="/" replace /> : children;
  }

  return (
    <div className={`${theme} min-h-screen transition-colors duration-300`}>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route
            path="/login"
            element={
              <GuestGuard>
                <LoginPage theme={theme} />
              </GuestGuard>
            }
          />
          <Route
            path="/register"
            element={
              <GuestGuard>
                <SignUpPage theme={theme} />
              </GuestGuard>
            }
          />
          <Route path="/users" element={<UsersPage theme={theme} />} />
          <Route path="/counters" element={<CounterPage theme={theme} />} />
          <Route
            path="/counters/:id"
            element={<SingleCounterPage theme={theme} />}
          />
          <Route path="/dishes" element={<DishesPage theme={theme} />} />
          <Route path="/cart" element={<CartPage theme={theme} />} />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <ProfilePage theme={theme} />
              </AuthGuard>
            }
          />
          <Route path="*" element={<PageNotFound theme={theme} />} />
        </Routes>
        <Footer theme={theme} />
      </BrowserRouter>
    </div>
  );
}
