import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "./navItems";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  selectUser,
  selectLogoutStatus,
  immediateLogout,
  resetLogoutStatus,
} from "../../store/slices/authSlice";

const drawerWidth = 230;
const collapsedWidth = 70;
const topOffset = 66;
const bottomOffset = 5;

const SideDrawer = ({ open, toggleDrawer, isCollapsed = false }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const logoutStatus = useSelector(selectLogoutStatus);
  const [logoutError, setLogoutError] = useState(null);

  const userId = user?.userId;

  const handleLogout = async () => {
    try {
      setLogoutError(null);
      dispatch(immediateLogout());
      navigate("/");

      if (userId) {
        dispatch(logoutUser(userId));
      }
    } catch (err) {
      console.error("Logout failed:", err);
      setLogoutError(err.message || "Logout failed");
      dispatch(immediateLogout());
      navigate("/");
    }
  };

  useEffect(() => {
    return () => {
      if (logoutStatus !== "idle") {
        dispatch(resetLogoutStatus());
      }
    };
  }, [logoutStatus, dispatch]);

  const isLoggingOut = logoutStatus === "pending";

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? collapsedWidth : drawerWidth,
          height: "100vh", // Ensure full viewport height
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "width 0.3s ease-in-out",
          overflow: "hidden",
        },
      }}
    >
      {/* Scrollable Nav Items Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pt: `${topOffset}px`,
          pb: `${bottomOffset}px`,
        }}
      >
        <List>
          {navItems.map(({ text, path, icon }) => {
            const selected = location.pathname === path;
            const itemContent = (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: isCollapsed ? 0 : 2 }}>{icon}</Box>
                {!isCollapsed && <ListItemText primary={text} />}
              </Box>
            );

            return (
              <Tooltip
                key={text}
                title={isCollapsed ? text : ""}
                placement="right"
                arrow
              >
                <ListItem
                  button
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
                    px: isCollapsed ? 2 : 3,
                    justifyContent: isCollapsed ? "center" : "flex-start",
                  }}
                >
                  {itemContent}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* Logout at Fixed Bottom */}
      <Box
        sx={{
          px: isCollapsed ? 1 : 2,
          pb: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {logoutError && !isCollapsed && (
          <Alert severity="error" sx={{ mb: 1, fontSize: "0.8rem" }}>
            {logoutError}
          </Alert>
        )}

        <Tooltip title={isCollapsed ? "Logout" : ""} placement="top" arrow>
          <ListItem
            button
            onClick={handleLogout}
            disabled={isLoggingOut}
            sx={{
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.error.main,
              },
              px: isCollapsed ? 2 : 3,
              justifyContent: isCollapsed ? "center" : "flex-start",
            }}
          >
            {isLoggingOut ? (
              <CircularProgress size={20} sx={{ mr: isCollapsed ? 0 : 2 }} />
            ) : (
              <LogoutIcon sx={{ mr: isCollapsed ? 0 : 2 }} />
            )}
            {!isCollapsed && (
              <ListItemText
                primary={isLoggingOut ? "Logging out..." : "Logout"}
              />
            )}
          </ListItem>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
