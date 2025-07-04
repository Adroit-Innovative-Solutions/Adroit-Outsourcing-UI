// components/layout/ProfileMenu.jsx
import React from "react";
import { Menu, MenuItem } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ProfileMenu = ({
  anchorEl,
  open,
  onClose,
  isDarkMode,
  onApplyLeave,
  onToggleTheme,
}) => (
  <Menu
    id="profile-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    MenuListProps={{ "aria-labelledby": "profile-button" }}
  >
    <MenuItem onClick={onApplyLeave}>
      <AssignmentIcon sx={{ mr: 1 }} />
      Apply Leave
    </MenuItem>
    <MenuItem onClick={onToggleTheme}>
      {isDarkMode ? (
        <DarkModeIcon sx={{ mr: 1 }} />
      ) : (
        <LightModeIcon sx={{ mr: 1 }} />
      )}
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </MenuItem>
  </Menu>
);

export default ProfileMenu;
