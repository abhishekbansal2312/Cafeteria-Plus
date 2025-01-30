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

export default function CartPage({ theme }) {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.cart);
  const makeRequest = useAxios();

  const handleError = (message, error) => {
    console.error(message, error);
    dispatch(setError(message));
    toast.error(message);
  };

  const fetchCart = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/cart",
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
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/cart",
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
        `http://localhost:3000/api/cart/${id}`,
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
        {loading ? (
          <div>Loading cart...</div>
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
