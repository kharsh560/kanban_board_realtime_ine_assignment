import React from "react";
import { Navigate } from "react-router-dom";

import type { RootAuthState } from "../reduxStateManagementFiles/store";
import { useSelector } from "react-redux";
import Navbar from "./navbarComponent";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useSelector((state : RootAuthState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <>
    <Navbar />
        {children}
    </>
  )
};

export default ProtectedRoute;
