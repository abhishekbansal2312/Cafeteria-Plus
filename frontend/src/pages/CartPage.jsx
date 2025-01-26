import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CartList from "../components/cart/CartList";

export default function CartPage() {
  const makeRequest = useAxios();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/cart",
        "GET",
        null,
        true
      );
      console.log("Fetched Cart:", response);
      setCart(response || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
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

      console.log("Delete Response:", response);

      if (response) {
        console.log(cart);
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
      } else {
        console.error("Failed to remove item:", response);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div>
      <CartList cart={cart} removeItem={removeItem} />
    </div>
  );
}
