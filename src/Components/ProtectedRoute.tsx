// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

//user state se pta krna ke h ya nhi
//state mestore karwa sakta hu and aur treka?
interface ProtectedRouteProps {
  children: React.ReactNode;
}
//id 

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return true ? <>{children}</> : <Navigate to="/Plans" />;
};

export default ProtectedRoute;
