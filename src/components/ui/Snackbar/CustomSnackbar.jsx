import React from 'react';
import {
  Snackbar,
  SnackbarContent,
  Button,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';


const variantStyles = {
  success: {
    color: '#fff',
    bgcolor: 'success.main',
    icon: <CheckCircleIcon sx={{ fontSize: 20 }} />,
  },
  error: {
    color: '#fff',
    bgcolor: 'error.main',
    icon: <ErrorIcon sx={{ fontSize: 20 }} />,
  },
  warning: {
    color: '#000',
    bgcolor: 'warning.main',
    icon: <WarningIcon sx={{ fontSize: 20 }} />,
  },
  info: {
    color: '#fff',
    bgcolor: 'info.main',
    icon: <InfoIcon sx={{ fontSize: 20 }} />,
  },
  default: {
    color: '#fff',
    bgcolor: 'primary.main',
    icon: null,
  },
};

const CustomSnackbar = ({
  open,
  message = 'Something went wrong!',
  onClose,
  duration = 6000,
  actionLabel = '',
  onActionClick,
  position = { vertical: 'top', horizontal: 'center' },
  loading = false,
  variant = 'default',
  sx = {},
}) => {
  const { color, bgcolor, icon } = variantStyles[variant] || variantStyles.default;

  const action = (
    <>
      {actionLabel && (
        <Button
          color="secondary"
          size="small"
          onClick={onActionClick}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" thickness={5} />
            ) : null
          }
        >
          {loading ? 'Loading' : actionLabel}
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position}
    >
      <SnackbarContent
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon}
            {message}
            {loading && (
              <CircularProgress
                size={18}
                color="inherit"
                thickness={5}
                sx={{ ml: 1 }}
              />
            )}
          </Box>
        }
        action={action}
        sx={{
          bgcolor,
          color,
          borderRadius: 1,
          ...sx,
        }}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
