import React from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const statusColors = {
  active: { bg: '#e8f5e8', color: '#2e7d2e', border: '#4caf50' },
  inactive: { bg: '#f5f5f5', color: '#666666', border: '#9e9e9e' },
  pending: { bg: '#fff3e0', color: '#e65100', border: '#ff9800' },
  error: { bg: '#ffebee', color: '#c62828', border: '#f44336' },
  warning: { bg: '#fff8e1', color: '#ef6c00', border: '#ffc107' },
  info: { bg: '#e3f2fd', color: '#1565c0', border: '#2196f3' },

  // HotList-specific statuses
  available: { bg: '#e8f5e9', color: '#2e7d32', border: '#66bb6a' },
  submitted: { bg: '#e3f2fd', color: '#1565c0', border: '#42a5f5' },
  interviewing: { bg: '#fffde7', color: '#f9a825', border: '#fdd835' },
  hired: { bg: '#ede7f6', color: '#6a1b9a', border: '#ab47bc' },
  rejected: { bg: '#ffebee', color: '#c62828', border: '#ef5350' },
};


const StyledChip = styled(Chip)(({ status, theme }) => {
  const colors = statusColors[status] || statusColors.info;
  
  return {
    backgroundColor: theme.palette.mode === 'dark' 
      ? `${colors.border}20` 
      : colors.bg,
    color: theme.palette.mode === 'dark' 
      ? colors.border 
      : colors.color,
    border: `1px solid ${colors.border}`,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: 24,
  };
});

export const StatusChip = ({
  status = 'info',
  label,
  size = 'small',
  ...props
}) => {
  return (
    <StyledChip
      status={status}
      label={label}
      size={size}
      variant="outlined"
      {...props}
    />
  );
};
