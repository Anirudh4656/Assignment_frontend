// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { jwtDecode, JwtPayload } from 'jwt-decode';

//user state se pta krna ke h ya nhi 
//state mestore karwa sakta hu and aur treka?
interface ProtectedRouteProps {
    children: React.ReactNode;
  }
  interface MyToken extends JwtPayload {
    id: any;
    user: string;
    exp: number;
    _doc:any;
    _id:string;
  plans:any;
  }
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const [user, setUser] = useState<MyToken| null>(null);
  // const userData = useSelector((state: RootState) => state.user);
   //plans h ya nhi
   useEffect(() => {
    const token = localStorage.getItem("token");
console.log(token);
    if (token) {
        try{
            const decodedToken = jwtDecode<MyToken>(token);
            console.log(`in decode ${JSON.stringify(decodedToken)}`);
            //check
           
                setUser(decodedToken);
                
      
        }catch(error){console.error('failed todecode',error)};
      }}, [location]);
  return true? <>{children}</> : <Navigate to="/Plans" />;

};

export default ProtectedRoute;
