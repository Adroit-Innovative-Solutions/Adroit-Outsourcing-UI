import React from "react";
import { Box, useTheme } from "@mui/material";

const dotColors = ["#FF5252", "#FFEB3B", "#4CAF50", "#03A9F4", "#9C27B0", "#FF9800"];

const MultiColorSpinner = () => {
  const theme = useTheme();
  const totalDots = 8;
  const radius = 30;

  return (
    <Box
      sx={{
        position: "relative",
        width: 80,
        height: 80,
        animation: "spin 2s linear infinite",
        "@keyframes spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    >
      {Array.from({ length: totalDots }).map((_, index) => {
        const angle = (360 / totalDots) * index;
        const x = 40 + radius * Math.cos((angle * Math.PI) / 180) - 5;
        const y = 40 + radius * Math.sin((angle * Math.PI) / 180) - 5;
        const color = dotColors[index % dotColors.length]; // Cycle colors

        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: color,
              top: y,
              left: x,
            }}
          />
        );
      })}
    </Box>
  );
};

export default MultiColorSpinner;
