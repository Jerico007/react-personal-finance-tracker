import React from "react";
// react-router-dom library
import { Outlet, Navigate,useNavigate } from "react-router-dom";
// Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";
// Firebase library
import { auth } from "../../firebase";
// React toastify library
import { toast } from "react-toastify";

import "./PrivateRoute.css";
const PrivateRoute = () => {
  // Auth hooks
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <div className="loader">
        <div className="spinner"></div>
    </div>;
  }

  if (error || !user) {
    toast.warn("Please SignUp/LogIn");
    navigate("/");
    return <></>;
  }

  return <Outlet></Outlet>;
};

export default PrivateRoute;
