// components/layout/AppHeader.jsx
import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import logo from "../../assets/adroit_logo.svg";
import CurrentTime from "../../utils/CurrentTime";

const AppHeader = ({
  toggleDrawer,
  toggleTheme,
  isDarkMode,
  handleProfileMenuClick,
  profileMenuOpen,
}) => (
  <AppBar
    position="fixed"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: (theme) => "#D84315",
    }}
  >
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
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

export default AppHeader;
