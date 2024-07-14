import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Hidden, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import { AppDispatch } from "../../Store/store";
import { JwtPayload, jwtDecode } from "jwt-decode";

const navLinks = [
  {
    name: "Create Plan",
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
  },
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
  _doc: any;
  _id: string;
  role: "USER" | "ADMIN";
}

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<MyToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<MyToken>(token);
        if (decodedToken.exp * 1000 >= new Date().getTime()) {
          setUser(decodedToken);
        }
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
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
        color: "#333",
      }}
    >
      <Hidden smDown>
        <Typography
          variant="h5"
          component="h1"
          my={2}
          fontWeight={400}
          fontSize={18}
          sx={{ color: "#333" }}
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
        {navLinks.map((item) => (
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
                color: "#333",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <item.icon sx={{ color: "#333" }} />
              <Hidden mdDown>
                <Typography
                  variant="h5"
                  component="h6"
                  fontWeight={400}
                  fontSize={15}
                  sx={{ color: "#333" }}
                >
                  {item.name}
                </Typography>
              </Hidden>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
