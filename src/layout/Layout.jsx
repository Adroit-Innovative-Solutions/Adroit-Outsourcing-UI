import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../contexts/ThemeContext"; // Import the theme context

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

import logo from "../assets/adroit_logo.svg";
import CurrentTime from "../utils/CurrentTime";

const drawerWidth = 230;

const navItems = [
  { text: "Hot-List", path: "/", icon: <HomeIcon /> },
  { text: "profiles", path: "/profile", icon: <PersonIcon /> },
  { text: "Placements", path: "/placements", icon: <WorkIcon /> },
  { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
  { text: "UI-lib", path: "/ui-examples", icon: <WidgetsIcon /> },
  { text: "Sample-Form", path: "/sample-form", icon: <WidgetsIcon /> },
  {
    text: "form-components",
    path: "/form-components",
    icon: <DynamicFormIcon />,
  },
];

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);

  const theme = useTheme();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const userId = "ADIT0001";
  const loginTimestamp = new Date().toLocaleString();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleApplyLeave = () => {
    // Handle Apply Leave action
    console.log("Apply Leave clicked");
    handleProfileMenuClose();
  };

  const handleChangeTheme = () => {
    toggleTheme(); // Use the toggleTheme from context
    handleProfileMenuClose();
  };

  const sideNavList = (
    <Box
      sx={{
        width: drawerWidth,
        pt: 8,
        backgroundColor: theme.palette.background.paper,
      }}
      role="presentation"
    >
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
                <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                  {icon}
                </Box>
                <ListItemText primary={text} />
              </Box>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#D84315" : "#D84315",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src={logo}
              alt="Adroit Logo"
              sx={{ height: 45, borderRadius: 1 }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CurrentTime />

            {/* Theme toggle button in toolbar */}
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label="toggle theme"
              sx={{ mr: 1 }}
            >
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            {/* Profile menu */}
            <IconButton
              color="inherit"
              onClick={handleProfileMenuClick}
              aria-controls={profileMenuOpen ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={profileMenuOpen ? "true" : undefined}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={profileAnchorEl}
              open={profileMenuOpen}
              onClose={handleProfileMenuClose}
              MenuListProps={{
                "aria-labelledby": "profile-button",
              }}
            >
              <MenuItem onClick={handleApplyLeave}>
                <AssignmentIcon sx={{ mr: 1 }} />
                Apply Leave
              </MenuItem>
              <MenuItem onClick={handleChangeTheme}>
                {isDarkMode ? (
                  <DarkModeIcon sx={{ mr: 1 }} />
                ) : (
                  <LightModeIcon sx={{ mr: 1 }} />
                )}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {sideNavList}
      </Drawer>

      <Box
        component="main"
        sx={{
          p: 3,
          mt: 8,
          backgroundColor: theme.palette.background.default,
          minHeight: "calc(100vh - 64px)", // Ensure full height
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
