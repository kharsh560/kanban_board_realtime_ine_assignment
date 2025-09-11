import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootAuthState } from "../reduxStateManagementFiles/store";

const RequireAuthRedirect: React.FC = () => {
  const isLoggedIn = useSelector((state : RootAuthState) => state.auth.isLoggedIn);

  return isLoggedIn ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default RequireAuthRedirect;
