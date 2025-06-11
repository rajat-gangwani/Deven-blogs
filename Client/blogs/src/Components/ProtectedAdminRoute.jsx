import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // If not an admin, redirect to 404
    return <Navigate to="/not-found" replace />;
  }

  // User is admin
  return children;
};

export default ProtectedAdminRoute;