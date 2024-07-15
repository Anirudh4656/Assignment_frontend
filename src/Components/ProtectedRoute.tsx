// src/components/ProtectedRoute.tsx
import { RootState } from "../Store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const result = useSelector((state: RootState) => state.auth.user);

  if (  result?.role !== "ADMIN") {
    return <Navigate to="/" />; 
  }

console.log("user.role in protected route",result?.role)
  return  <>{children}</> ;
};

export default ProtectedRoute;
