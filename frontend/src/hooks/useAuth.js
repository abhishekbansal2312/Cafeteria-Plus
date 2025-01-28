import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../slices/userSlice";
import useAxios from "./useAxios";

const useAuth = () => {
  const dispatch = useDispatch();
  const makeRequest = useAxios();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("hello");

        const data = await makeRequest(
          `http://localhost:3000/api/auth/me`,
          "GET",
          null,
          true
        );

        console.log(data, "response");

        if (data?.user) {
          const { user } = data;
          dispatch(loginUser(user));
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
