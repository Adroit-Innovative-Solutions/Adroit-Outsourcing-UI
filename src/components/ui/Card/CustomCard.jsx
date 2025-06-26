import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoreVert } from '@mui/icons-material';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
    : '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 30px rgba(0, 0, 0, 0.4)'
      : '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
}));

export const CustomCard = ({
  title,
  subtitle,
  avatar,
  headerAction,
  children,
  actions,
  elevation = 1,
  ...props
}) => {
  return (
    <StyledCard elevation={elevation} {...props}>
      {(title || subtitle || avatar || headerAction) && (
        <CardHeader
          avatar={avatar && <Avatar src={avatar} />}
          action={headerAction || (
            <IconButton>
              <MoreVert />
            </IconButton>
          )}
          title={title && <Typography variant="h6">{title}</Typography>}
          subheader={subtitle}
        />
      )}
      
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
      
      {actions && (
        <>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            {actions}
          </CardActions>
        </>
      )}
    </StyledCard>
  );
};
