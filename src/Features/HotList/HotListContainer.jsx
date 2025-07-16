import React from "react";
import { Outlet, useLocation, Link as RouterLink } from "react-router-dom";
import { Box, Breadcrumbs, Typography, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const HotListContainer = () => {
  const theme = useTheme()
  const location = useLocation();
  const isFormPage = location.pathname.includes("/hotlist/form");

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
  };

  return (
    <Box>
      {/* Breadcrumb Navigation with Icons */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <RouterLink to="/layout/home" style={linkStyle}>
          <HomeIcon fontSize="small" />
          Home
        </RouterLink>

        <RouterLink to="/layout/hotlist" style={linkStyle}>
          <ListAltIcon fontSize="small" />
          Hot List
        </RouterLink>

        <RouterLink to="/layout/hotlist/hostlistuser-form" style={linkStyle}>
          <PersonAddIcon fontSize="small" />
          Create
        </RouterLink>
      </Breadcrumbs>

      {/* Render the nested route content */}
      <Outlet />
    </Box>
  );
};

export default HotListContainer;
