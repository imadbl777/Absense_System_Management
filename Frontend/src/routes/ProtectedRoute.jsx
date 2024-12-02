/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuthenticated = !!localStorage.getItem("auth_token");
  const userRole = localStorage.getItem("user_role");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
