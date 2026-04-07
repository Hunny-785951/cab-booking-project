import React from "react";
import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ role, children }) {
  const savedRole = localStorage.getItem("role");
  if (!savedRole) return <Navigate to="/login" replace />;
  if (savedRole !== role) return <Navigate to="/unauthorized" replace />;
  return children;
}
