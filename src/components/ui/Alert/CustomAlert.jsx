import React, { useEffect } from 'react';
import {
  Alert as MuiAlert,
  AlertTitle,
  Collapse,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  borderRadius: 8,
  '& .MuiAlert-icon': {
    fontSize: '1.5rem',
  },
}));

export const CustomAlert = ({
  severity = 'info',
  variant = 'filled',
  title,
  children,
  onClose,
  open = true,
  autoHideDuration = 5000, // ✅ Default auto-hide duration: 3 seconds
  ...props
}) => {
  // ⏲️ Automatically close after `autoHideDuration` ms
  useEffect(() => {
    if (open && onClose) {
      const timer = setTimeout(onClose, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, open, onClose]);

  return (
    <Collapse in={open}>
      <StyledAlert
        severity={severity}
        variant={variant}
        action={
          onClose && (
            <IconButton color="inherit" size="small" onClick={onClose}>
              <Close fontSize="inherit" />
            </IconButton>
          )
        }
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </StyledAlert>
    </Collapse>
  );
};
