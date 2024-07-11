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
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        color: "white",
        padding: 3,
        gap: 1,
        boxSizing: "border-box",
        overflowY: "hidden",
      
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: "100%",
          height: "inherit"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
