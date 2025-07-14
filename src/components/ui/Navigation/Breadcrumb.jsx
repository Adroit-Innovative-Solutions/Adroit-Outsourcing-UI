// components/ui/CustomBreadcrumb.jsx
import React from "react";
import {
  Breadcrumbs,
  Typography,
  Link,
  Box
} from "@mui/material";
import { NavigateNext, Home } from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const CustomBreadcrumb = ({ items = [], showHome = true }) => {
  const location = useLocation();

  const defaultItems = showHome
    ? [
        {
          label: "Home",
          path: "/",
          icon: <Home sx={{ mr: 0.5 }} fontSize="inherit" />,
        },
      ]
    : [];

  const breadcrumbItems = [...defaultItems, ...items];

  return (
    <Box mb={2}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isActive = location.pathname === item.path;

          if (isLast || isActive) {
            return (
              <Typography
                key={index}
                color="text.primary"
                sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
              >
                {item.icon} {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              component={RouterLink}
              to={item.path}
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {item.icon} {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
