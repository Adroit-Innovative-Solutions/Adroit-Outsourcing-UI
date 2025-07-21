import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
} from '@mui/material';

/**
 * PageHeader component to display a title, subtitle, actions, breadcrumbs, and optional content.
 */
export const PageHeader = ({
  title,
  subtitle,
  actions,
  breadcrumb,
  children,
  ...props
}) => {
  return (
    <Box component="header" mb={2} {...props}>
      {/* Breadcrumb section */}
      {breadcrumb && (
        <Box mb={1}>
          {breadcrumb}
        </Box>
      )}

      {/* Title and actions */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        {/* Title block */}
        <Box>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Action buttons */}
        {actions && (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {actions}
          </Stack>
        )}
      </Stack>

      {/* Optional children content */}
      {children && (
        <Box mt={2}>
          {children}
        </Box>
      )}

      {/* Divider for separation */}
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};
