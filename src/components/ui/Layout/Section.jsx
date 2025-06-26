import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  marginBottom: theme.spacing(3),
}));

export const Section = ({
  title,
  subtitle,
  children,
  actions,
  elevation = 1,
  ...props
}) => {
  return (
    <StyledSection elevation={elevation} {...props}>
      {(title || subtitle || actions) && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={title || subtitle ? 2 : 0}
        >
          <Box>
            {title && (
              <Typography variant="h6" gutterBottom={!!subtitle}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
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
      )}
      
      {children}
    </StyledSection>
  );
};