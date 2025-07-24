// utils/renderRolesChips.tsx
import React from "react";
import {
  Chip,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  Theme,
} from "@mui/material";

/**
 * Renders an array of role strings as MUI Chips.
 * @param roles - An array of role strings (e.g., ["ADMIN", "EMPLOYEE"])
 */
export const RenderRolesChips = ({ roles }) => {
  const theme = useTheme();

  if (!Array.isArray(roles) || roles.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No Roles
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {roles.map((role) => (
        <Chip
          key={role}
          label={role}
          size="small"
          variant="filled"
          sx={{
            backgroundColor: getRoleColor(role, theme),
            color: "#fff",
            fontWeight: 500,
          }}
        />
      ))}
    </Stack>
  );
};

const getRoleColor = (role, theme) => {
  switch (role.toUpperCase()) {
    case "ADMIN":
      return theme.palette.warning.main;
    case "SUPERADMIN":
      return theme.palette.error.main;
    case "TEAMLEAD":
      return theme.palette.info.main;
    case "EMPLOYEE":
      return theme.palette.success.main;
    case "BDM":
      return theme.palette.secondary.main;
    default:
      return theme.palette.primary.main;
  }
};
