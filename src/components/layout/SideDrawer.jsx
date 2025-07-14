import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "./navItems";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 230;

const SideDrawer = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can add logout logic here (clearing tokens, Redux state, etc.)
    localStorage.clear(); // example
    navigate("/");
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box sx={{ width: drawerWidth, pt: 8 }}>
        <List>
          {navItems.map(({ text, path, icon }) => {
            const selected = location.pathname === path;
            return (
              <ListItem
                button
                key={text}
                component={Link}
                to={path}
                onClick={toggleDrawer}
                sx={{
                  borderLeft: selected
                    ? `4px solid ${theme.palette.primary.main}`
                    : "4px solid transparent",
                  backgroundColor: selected
                    ? theme.palette.action.selected
                    : "inherit",
                  color: selected ? theme.palette.primary.main : "inherit",
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 2 }}>{icon}</Box>
                  <ListItemText primary={text} />
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Logout button at bottom */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.error.main,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LogoutIcon sx={{ mr: 2 }} />
            <ListItemText primary="Logout" />
          </Box>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
