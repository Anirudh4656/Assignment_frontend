import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { JwtPayload, jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/store";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PublicIcon from "@mui/icons-material/Public";


interface MyToken extends JwtPayload {
  apiKey: string;
  id: any;
  user: string;
  exp: number;
  _doc: any;
  _id: string;
}
const Navbar: React.FC = () => {
  const [user, setUser] = useState<MyToken | null>(null);
  console.log(`in navbar user ${JSON.stringify(user)}`);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // ??
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode<MyToken>(token);
        console.log(`in decode ${JSON.stringify(decodedToken)}`);
        //check
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          logout();
        } else {
          setUser(decodedToken);
        }
      } catch (error) {
        console.error("failed todecode", error);
      }
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth");
  };

  const Upload = () => {
    navigate("/upload");
  };
  const homepage = () => {
    navigate("/");
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard", err);
      });
  };
  return (
    <AppBar
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: "53px",
        paddingLeft: "25px",
        backgroundColor: "white",
        borderTop: "1px solid #ccc",
        position: "relative",
      }}
      position="static"
      color="inherit"
    >
      <Button onClick={homepage} variant="contained">
        Home
      </Button>
      <Toolbar
        style={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{user.user}</Typography>
            <Tooltip title="public secret">
                <IconButton onClick={() => copyToClipboard(user.id)}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="api key">
              <IconButton onClick={() => copyToClipboard(user.apiKey)}>
                <PublicIcon />
              </IconButton>
            </Tooltip>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
            <Button variant="contained" color="secondary" onClick={Upload}>
              Upload
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
