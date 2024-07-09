import { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "../Components/Admin/SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#bcc4dc",
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        color: "white",
        padding: 3,
        gap: 3,
        boxSizing: "border-box",
        overflowY: "hidden",
        height: "100vh",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: "100%",
          height: "inherit",
          overflowY: "scroll",
          border: "2px solid black",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
