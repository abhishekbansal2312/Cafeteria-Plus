import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/inputs/InputField";
import useAxios from "../hooks/useAxios";

export default function SignUpPage() {
  const makeRequest = useAxios();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const response = await makeRequest(
      "http://localhost:3000/api/auth/register",
      "POST",
      {
        name,
        email,
        password,
      }
    );

    if (response) {
      const { accessToken, refreshToken } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } else {
      console.error("Sign up failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-black rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold">Create Account</h2>
        <p className="text-gray-400 mb-8">Enter your details to sign up</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-md font-medium">
              Your Name
            </label>
            <InputField
              type="name"
              name="name"
              className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white"
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
              className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white"
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
              className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white"
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
              className="w-full p-3 border-2 border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" name="remember" className="accent-white" />
            <label htmlFor="remember" className="text-gray-400">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-1">
          <Link to="/login" className="text-white">
            Already have an account? <span className="font-bold">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
