import React from 'react';
import { Box, Typography } from '@mui/material';
import { CustomInput } from '../Input/CustomInput';

export const FormField = ({
  label,
  required = false,
  error,
  helperText,
  children,
  ...props
}) => {
  return (
    <Box mb={2}>
      {label && (
        <Typography
          variant="subtitle2"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {label}
          {required && <span style={{ color: 'error.main' }}> *</span>}
        </Typography>
      )}
      {children || <CustomInput error={!!error} helperText={helperText} {...props} />}
    </Box>
  );
};