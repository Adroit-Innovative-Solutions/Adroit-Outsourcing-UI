import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { selectUser } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { formatReadableDate } from "./dateUtils";


const CurrentTime = () => {
  const theme = useTheme();
  const user = useSelector(selectUser);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        mr: 2,
      }}
    >
      {/* User ID and Role */}
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.primary.contrastText,
          fontWeight: 500,
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {user.userId} - {user.roleType}
      </Typography>

      {/* Login Timestamp */}
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.primary.contrastText,
          fontSize: "0.75rem",
        }}
      >
        Last LogIn - {formatReadableDate(user.loginTimestamp , true)}
      </Typography>
    </Box>
  );
};

export default CurrentTime;
