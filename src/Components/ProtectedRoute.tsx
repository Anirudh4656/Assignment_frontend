// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
  children: React.ReactNode;
}
//in case of true  

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return  <>{children}</> ;
};

export default ProtectedRoute;
