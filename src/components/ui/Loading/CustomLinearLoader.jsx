import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const CustomLinearLoader = ({ fullWidth = true, height = 4, color = 'primary', ...rest }) => {
  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <LinearProgress
        color={color}
        sx={{ height }}
        {...rest}
      />
    </Box>
  );
};

export default CustomLinearLoader;
