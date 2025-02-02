import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import {
  setCartDishes,
  setTotalCartItems,
  removeCartDish,
  increaseQuantity,
  decreaseQuantity,
  setLoading,
  setError,
} from "../slices/cartSlice";
import CartList from "../components/cart/CartList";

import CartSkeleton from "../components/cart/CartSkeleton";

export default function CartPage({ theme }) {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.cart);
  const makeRequest = useAxios();
  const { isLoggedIn } = useSelector((state) => state.userDetail);
  console.log(isLoggedIn, "isLoggedIn");

  const handleError = (message, error) => {
    console.error(message, error);
    dispatch(setError(message));
    toast.error(message);
  };

  const fetchCart = useCallback(async () => {
    console.log("bjhbhh");

    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await makeRequest(
        "https://dinesync-seamlessdining.onrender.com/api/cart",
        "GET",
        null,
        true
      );
      dispatch(setCartDishes(response || []));
      dispatch(setTotalCartItems(response?.length || 0));
    } catch (error) {
      handleError("Failed to load cart items.", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, makeRequest]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  const removeItem = async (id) => {
    try {
      const response = await makeRequest(
        "https://dinesync-seamlessdining.onrender.com/api/cart",
        "DELETE",
        { id },
        true
      );
      if (response) {
        dispatch(removeCartDish(id));
        dispatch(setTotalCartItems(response.length));
      } else {
        handleError("Failed to remove item.", response);
      }
    } catch (error) {
      handleError("Error removing item:", error);
    }
  };

  const updateQuantity = async (id, currentQuantity, action) => {
    const newQuantity =
      action === "inc" ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);
    try {
      const response = await makeRequest(
        `https://dinesync-seamlessdining.onrender.com/api/cart/${id}`,
        "PUT",
        { quantity: newQuantity },
        true
      );
      if (response) {
        dispatch(
          action === "inc" ? increaseQuantity(id) : decreaseQuantity(id)
        );
      }
    } catch (error) {
      handleError("Error updating quantity:", error);
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen pb-20`}
    >
      <div className="pb-20 min-h-screen pt-10">
        {error && <div className="text-red-500">{error}</div>}
        {!isLoggedIn ? (
          <a
            href="/login" // Replace with the appropriate login URL
            className="bg-red-500 text-white p-4 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-red-600 transition duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 12l-6 6-6-6" />
            </svg>
            Please log in to view your cart.
          </a>
        ) : loading ? (
          <div>
            <CartSkeleton />
          </div>
        ) : (
          <CartList
            cart={dishes}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        )}
      </div>
    </div>
  );
}
