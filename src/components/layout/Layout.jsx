// components/layout/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { useThemeContext } from "../../contexts/ThemeContext";
import AppHeader from "./AppHeader";
import SideDrawer from "./SideDrawer";
import ProfileMenu from "./ProfileMenu";
import Footer from "./Footer"; // ✅ import the footer

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const profileMenuOpen = Boolean(profileAnchorEl);
  const { isDarkMode, toggleTheme } = useThemeContext();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleProfileMenuClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleApplyLeave = () => {
    console.log("Apply Leave clicked");
    handleProfileMenuClose();
  };

  const handleChangeTheme = () => {
    toggleTheme();
    handleProfileMenuClose();
  };

  return (
    <>
      <AppHeader
        toggleDrawer={toggleDrawer}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        handleProfileMenuClick={handleProfileMenuClick}
        profileMenuOpen={profileMenuOpen}
      />
      <SideDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      <ProfileMenu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
        isDarkMode={isDarkMode}
        onApplyLeave={handleApplyLeave}
        onToggleTheme={handleChangeTheme}
      />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          mt: 8,
          backgroundColor: "background.default",
        }}
      >
        <Box sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
        <Footer /> {/* ✅ Footer placed here */}
      </Box>
    </>
  );
};

export default Layout;
