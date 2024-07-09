// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
   

  return  false? <>{children}</> : <Navigate to="/Plans" />;

};

export default ProtectedRoute;
