import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import {
  setCartDishes,
  setTotalCartItems,
  addCartDish,
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

  const fetchCart = async () => {
    dispatch(setLoading(true));
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/cart",
        "GET",
        null,
        true
      );
      dispatch(setCartDishes(response || []));
      dispatch(setTotalCartItems(response.length || 0));
    } catch (error) {
      console.error("Error fetching cart:", error);
      dispatch(setError("Failed to load cart items."));
    } finally {
      dispatch(setLoading(false));
    }
  };

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
        console.error("Failed to remove item:", response);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (id, currentQuantity, action) => {
    let newQuantity =
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
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="pb-20 min-h-screen">
      {error && <div className="text-red-500">{error}</div>}
      <CartList
        cart={dishes}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
}
