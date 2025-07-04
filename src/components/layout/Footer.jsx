// components/layout/Footer.jsx
import React from "react";
import { Box, Typography, useTheme, Link as MuiLink, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // ✅ import from react-router

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",
        bgcolor: theme.palette.primary.main,
        borderTop: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Left: Copyright */}
      <Typography variant="body2" color="primary.contrastText">
        &copy; {new Date().getFullYear()} Adroit Innovative Solutions. All rights reserved.
      </Typography>

      {/* Right: Support Links */}
      <Stack direction="row" spacing={2} alignItems="center">
        <MuiLink
          href="https://adroitinnovative.com"
          target="_blank"
          rel="noopener"
          underline="hover"
          color="primary.contrastText"
        >
          Official Website
        </MuiLink>
        <MuiLink
          href="mailto:support@adroitinnovative.com"
          underline="hover"
          color="primary.contrastText"
        >
          support@adroitinnovative.com
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/support"
          underline="hover"
          color="primary.contrastText"
        >
          Support
        </MuiLink>
      </Stack>
    </Box>
  );
};

export default Footer;
