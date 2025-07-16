// components/layout/Footer.jsx
import React from "react";
import { Box, Typography, useTheme, Link as MuiLink, Stack, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",
        bgcolor: theme.palette.primary.main,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction={isSmDown ? "column" : "row"}
        spacing={2}
        justifyContent="space-between"
        alignItems={isSmDown ? "flex-start" : "center"}
        textAlign={isSmDown ? "left" : "inherit"}
      >
        {/* Left: Copyright */}
        <Typography variant="body2" color="primary.contrastText">
          &copy; {new Date().getFullYear()} Adroit Innovative Solutions. All rights reserved.
        </Typography>

        {/* Right: Support Links */}
        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent={isSmDown ? "flex-start" : "flex-end"}
          alignItems="center"
        >
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
            to="/layout/support"
            underline="hover"
            color="primary.contrastText"
          >
            Support
          </MuiLink>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
