import React from "react";
import { Drawer, IconButton, Box, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDrawer = ({
  open,
  onClose,
  anchor = "left",
  title = "Drawer Title",
  width = 300,
  topOffset = 66,
  bottomOffset = 5, // 🔽 default no bottom bar
  children,
}) => {
  const getBorderRadius = () => {
    switch (anchor) {
      case "right":
        return {
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
        };
      case "left":
        return {
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        };
      case "top":
        return {
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        };
      case "bottom":
        return {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        };
      default:
        return {};
    }
  };

  const isVertical = anchor === "top" || anchor === "bottom";
  const isHorizontal = anchor === "left" || anchor === "right";

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isHorizontal ? width : "100%",
          height: isVertical || isHorizontal
            ? `calc(100% - ${topOffset + bottomOffset}px)`
            : "100%",
          marginTop: anchor === "top" ? `${topOffset}px` : 0,
          top: isHorizontal ? `${topOffset}px` : undefined,
          marginBottom: anchor === "bottom" ? `${bottomOffset}px` : 0,

          ...getBorderRadius(),

          padding: 2,
          overflow: "auto",
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar - 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box mt={2}>{children}</Box>
    </Drawer>
  );
};

export default CustomDrawer;
