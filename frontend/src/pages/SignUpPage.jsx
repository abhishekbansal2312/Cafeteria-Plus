import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/inputs/InputField";
import useAxios from "../hooks/useAxios";

export default function SignUpPage({ theme }) {
  const makeRequest = useAxios();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await makeRequest(
        "https://dinesync-seamlessdining.onrender.com/api/auth/register",
        "POST",
        { name, email, password }
      );

      if (response) {
        const { accessToken, refreshToken } = response;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/login");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen pb-20`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 border-1 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold">Create Account</h2>
          <p className="text-gray-400 mb-8">Enter your details to sign up</p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-md font-medium">
                Your Name
              </label>
              <InputField
                type="text"
                name="name"
                className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:border-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-md font-medium">
                Your Email
              </label>
              <InputField
                type="email"
                name="email"
                className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:border-white"
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-md font-medium">
                Confirm Password
              </label>
              <InputField
                type="password"
                name="confirmPassword"
                className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:border-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" name="terms" className="" />
              <label htmlFor="terms" className="text-gray-400">
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 border-1 text-black font-semibold rounded-md focus:outline-none"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-1">
            <Link to="/login" className="">
              Already have an account?{" "}
              <span className="font-bold">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
