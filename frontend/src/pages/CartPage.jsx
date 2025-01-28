import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import {
  setDishes,
  removeDish,
  increaseQuantity,
  decreaseQuantity,
  setTotalCartItems,
} from "../slices/cartSlice";
import CartList from "../components/cart/CartList";

export default function CartPage({ theme }) {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.cart);
  const makeRequest = useAxios();

  const fetchCart = async () => {
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/cart",
        "GET",
        null,
        true
      );
      console.log("Fetched Cart:", response);

      dispatch(setDishes(response || []));
    } catch (error) {
      console.error("Error fetching cart:", error);
      dispatch(setDishes([]));
    }
  };

  useEffect(() => {
    fetchCart();
  }, [dispatch]);

  const removeItem = async (id) => {
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/cart",
        "DELETE",
        { id },
        true
      );
      console.log("Delete Response:", response);
      if (response) {
        dispatch(removeDish(id));
        dispatch(setTotalCartItems(response.length));
      } else {
        console.error("Failed to remove item:", response);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (id, currentQuantity, action) => {
    let newQuantity = currentQuantity;

    if (action === "inc") {
      newQuantity += 1;
    } else if (action === "dec" && currentQuantity > 1) {
      newQuantity -= 1;
    }

    try {
      const response = await makeRequest(
        `http://localhost:3000/api/cart/${id}`,
        "PUT",
        { quantity: newQuantity },
        true
      );
      console.log("Quantity update response:", response);
      if (response) {
        if (action === "inc") {
          console.log("jijiuhi");

          dispatch(increaseQuantity(id));
        } else if (action === "dec") {
          dispatch(decreaseQuantity(id));
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <CartList
        cart={dishes}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
}
