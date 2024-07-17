import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PublicIcon from "@mui/icons-material/Public";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

const Navbar: React.FC = () => {

const user=useSelector((state:RootState)=>state.auth.user) 
// if(!user){
//   return
// }
const location = useLocation();
  const navigate = useNavigate();
  console.log("user",user);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const Upload = () => {
    navigate("/upload");
  };
  const homepage = () => {
    navigate("/");
  };
  const dashboard = (id:string) => {
    navigate(`/user/${id}`);
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // console.log("Copied to clipboard:", text);
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard", err);
      });
  };
  const currentPath = location.pathname;
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
             <Button
             color="secondary"
              onClick={() => dashboard(user?._id || '')}
              disabled={currentPath === `/user/${user?._id}`}
            >
             <Typography variant="h6">{user.username}</Typography>
            </Button>
            
            <Tooltip title="public secret">
              <IconButton onClick={() => copyToClipboard(user?._id || '')}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="api key">
              <IconButton onClick={() => copyToClipboard(user?.apiKey || '')}>
                <PublicIcon />
              </IconButton>
            </Tooltip>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
            <Button variant="contained" color="secondary" onClick={Upload} disabled={currentPath === '/upload'}>
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
