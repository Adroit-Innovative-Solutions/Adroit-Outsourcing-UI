import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ import useTheme
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import logo from "../../assets/mymulya.svg";
import CurrentTime from "../../utils/CurrentTime";


const AppHeader = ({
  toggleDrawer,
  toggleTheme,
  isDarkMode,
  handleProfileMenuClick,
  profileMenuOpen,
  toggleCollapse,
  isCollapsed,
}) => {
  const theme = useTheme(); // ✅ use theme

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main, // ✅ dynamic theme color
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Collapse Toggle */}
          <Tooltip title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleCollapse}
              sx={{ mr: theme.spacing(2) }} // ✅ spacing from theme
            >
              {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>
          </Tooltip>

          <Box
            component="img"
            src={logo}
            alt="Adroit Logo"
            sx={{ height: 45, borderRadius: 1 }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CurrentTime />
          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleProfileMenuClick}
            aria-controls={profileMenuOpen ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={profileMenuOpen ? "true" : undefined}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
