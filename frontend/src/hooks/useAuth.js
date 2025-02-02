import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../slices/userSlice";
import useAxios from "./useAxios";
import { setTotalCartItems } from "../slices/cartSlice";
import { setCartDishes } from "../slices/cartSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const makeRequest = useAxios();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await makeRequest(
          `https://dinesync-seamlessdining.onrender.com/api/auth/me`,
          "GET",
          null,
          true
        );

        if (data?.user) {
          const { user } = data;
          dispatch(loginUser(user));
          dispatch(setTotalCartItems(user.cartLength));
          dispatch(setCartDishes(user.cart));
        } else {
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        dispatch(logoutUser());
      }
    };

    checkAuth();
  }, []);
};

export default useAuth;
