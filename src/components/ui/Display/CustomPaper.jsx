import React from 'react';
import { Paper, useTheme, useMediaQuery } from '@mui/material';

const CustomPaper = ({
  children,
  elevation = 3,
  padding = 2,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={elevation}
      sx={{
        p: isMobile ? 1 : padding,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
