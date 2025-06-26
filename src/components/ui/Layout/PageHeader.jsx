import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider
} from '@mui/material';

export const PageHeader = ({
  title,
  subtitle,
  actions,
  breadcrumb,
  children,
  ...props
}) => {
  return (
    <Box mb={3} {...props}>
      {breadcrumb}
      
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        mb={2}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {actions && (
          <Stack direction="row" spacing={1}>
            {actions}
          </Stack>
        )}
      </Stack>

      {children}
      
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};
