import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Hidden, Typography } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import { AppDispatch, RootState } from "../../Store/store";
import { JwtPayload, jwtDecode } from 'jwt-decode';

const navLinks = [
  {
    name: "CreatePlan",
    icon: CreateIcon,
    link: "/Plan",
  },
  {
    name: "Users",
    icon: PersonIcon,
    link: "/Users",
  },
  {
    name: "Plans",
    icon: TaskIcon,
    link: "/Plans",
  }
];



export interface IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  isActive: boolean;
  password: string;
  tasks: object[];
  role: string;
}
interface MyToken extends JwtPayload {
    id: any;
    user: string;
    exp: number;
    _doc:any;
    _id:string;
    role:"USER"|"ADMIN";
  
  }
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<MyToken| null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
console.log(token);
    if (token) {
        try{
            const decodedToken = jwtDecode<MyToken>(token);
            console.log(`in decode ${JSON.stringify(decodedToken)}`);
            //check
            if (decodedToken.exp * 1000 < new Date().getTime()) {
               
              } else {
                setUser(decodedToken);
                
              }
        }catch(error){console.error('failed todecode',error)};
      }}, [location]);

  return (
    <Box
      sx={{
        backgroundColor: "#161d2f",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        alignItems: "center",
        justifyContent: {
          md: "space-between",
          lg: "start",
        },
        width: {
          sm: "100%",
          md: "100%",
          lg: 250,
        },
        boxSizing: "border-box",
      }}
    >
      <Hidden smDown>
        <Typography
          variant="h5"
          component="h1"
          my={2}
          fontWeight={400}
          fontSize={18}
        >
       Admin Panel
        </Typography>
      </Hidden>

      <Box
        sx={{
          py: {
            xs: "0px",
            lg: "16px",
          },
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          gap: 2,
        }}
      >
        {navLinks.map((item) => {
        
          
          return (
            
          <Link
            key={item.name}
            to={item.link}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "white",
                textDecoration: "none",
              }}>
              <item.icon />
              <Hidden mdDown>
                <Typography variant="h5"
                  component="h6"
                  fontWeight={400}
                  fontSize={15}>{item.name}</Typography>
              </Hidden>
            </Box>
          </Link>
        )})}
      </Box>
    </Box>
  )
}



export default Sidebar;