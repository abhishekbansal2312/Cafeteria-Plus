import React from "react";
import { Link } from "react-router-dom";
import InputField from "../components/inputs/InputField";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartDishes, setTotalCartItems } from "../slices/cartSlice";
import { loginUser } from "../slices/userSlice";
export default function LoginPage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await makeRequest(
      "http://localhost:3000/api/auth/login",
      "POST",
      {
        email,
        password,
      }
    );

    if (response) {
      const { accessToken, refreshToken } = response;
      dispatch(loginUser(response.user));
      dispatch(setTotalCartItems(response.user.cartLength));
      dispatch(setCartDishes(response.user.cart));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen pb-20`}
    >
      <div className="flex items-center justify-center min-h-screen  ">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg border-1">
          <h2 className="text-3xl font-semibold">Login Here</h2>
          <p className=" mb-8">Enter your email and password to sign in</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-md font-medium">
                Your Email
              </label>
              <InputField
                type="email"
                name="email"
                className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent  placeholder-gray-400 focus:outline-none focus:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-md font-medium">
                Your Password
              </label>
              <InputField
                type="password"
                name="password"
                className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:border-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" name="remember" className="accent-white" />
              <label htmlFor="remember" className="text-gray-400">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3  font-semibold rounded-md border-1  focus:outline-none"
            >
              Sign In
            </button>
          </form>

          <div className=" mt-1">
            <Link to="/register" className="">
              Not registered? <span className="font-bold">Create account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
