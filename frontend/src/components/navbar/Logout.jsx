import React from "react";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div onClick={logout}>
      <VscSignOut className="h-8 w-6" />
    </div>
  );
}
