// src/components/ui/Display/EmptyState.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { Inbox } from '@mui/icons-material';

export const EmptyState = ({
  title = 'No data found',
  description = 'There is no data to display at the moment.',
  icon: Icon = Inbox,
  action,
  actionText = 'Add New',
  onAction,
  ...props
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={6}
      px={3}
      {...props}
    >
      <Icon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      
      <Typography variant="h6" color="text.primary" gutterBottom>
        {title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" mb={2}>
        {description}
      </Typography>

      {(action || onAction) && (
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onAction}>
            {actionText}
          </Button>
          {action && action}
        </Stack>
      )}
    </Box>
  );
};

export default EmptyState;
