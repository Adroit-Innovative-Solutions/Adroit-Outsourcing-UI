// components/layout/SideDrawer.jsx
import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 230;

const SideDrawer = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const location = useLocation();

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
        },
      }}
    >
      <Box sx={{ width: drawerWidth, pt: 8 }} role="presentation">
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
        <Divider />
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
