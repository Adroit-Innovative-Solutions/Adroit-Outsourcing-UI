import React from 'react';
import {
  Tabs as MuiTabs,
  Tab,
  Box,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

export const CustomTabs = ({
  value,
  onChange,
  tabs = [],
  variant = 'standard',
  scrollable = false,
  ...props
}) => {
  return (
    <Box>
      <StyledTabs
        value={value}
        onChange={onChange}
        variant={scrollable ? 'scrollable' : variant}
        scrollButtons={scrollable ? 'auto' : false}
        {...props}
      >
        {tabs.map((tab, index) => (
          <StyledTab
            key={index}
            label={
              tab.badge ? (
                <Badge badgeContent={tab.badge} color="error">
                  {tab.label}
                </Badge>
              ) : (
                tab.label
              )
            }
            icon={tab.icon}
            disabled={tab.disabled}
            {...tab.props}
          />
        ))}
      </StyledTabs>
    </Box>
  );
};
