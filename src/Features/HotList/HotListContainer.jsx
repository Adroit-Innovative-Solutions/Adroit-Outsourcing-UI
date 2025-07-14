import React from "react";
import { Outlet, useLocation, Link as RouterLink } from "react-router-dom";
import { Box, Breadcrumbs, Typography } from "@mui/material";

const HotListContainer = () => {
  const location = useLocation();
  const isFormPage = location.pathname.includes("/hotlist/form");

  return (
    <Box>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <RouterLink
          to="/layout/home"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Home
        </RouterLink>

        <RouterLink
          to="/layout/hotlist"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Hot List
        </RouterLink>

        <RouterLink
          to="/layout/hotlist/hostlistuser-form"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Create
        </RouterLink>
      </Breadcrumbs>
      {/* Render the nested route content */}
      <Outlet />
    </Box>
  );
};

export default HotListContainer;
