import React, { useState } from 'react';
import { Popover, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Example icon, can be overridden

const CustomPopover = ({
  icon = <MoreVertIcon />,       // You can pass any icon/button here
  children,
  popoverWidth = 200,
  position = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'left',
  },
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'custom-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        {icon}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={position}
        transformOrigin={transformOrigin}
      >
        <Box sx={{ width: popoverWidth, p: 2 }}>
          {children}
        </Box>
      </Popover>
    </>
  );
};

export default CustomPopover;
