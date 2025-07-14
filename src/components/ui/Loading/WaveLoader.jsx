import React, { useEffect, useState } from "react";
import { Box, keyframes, useTheme } from "@mui/material";

// Animation: scale pulse wave
const wavePulse = keyframes`
  0%, 60%, 100% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.6);
  }
`;

const defaultColors = [
  "#FF5722", "#2196F3", "#4CAF50", "#E91E63", "#FFC107", "#00BCD4", "#9C27B0",
];

const WaveLoader = ({
  count = 6,
  size = 8,
  gap = 10,
  initialDuration = 0.5,
  finalDuration = 1.2,
  delayToSlow = 4000,
  containerWidth = 150,
  containerHeight = 30,
  padding = 10,
  colors = defaultColors,
}) => {
  const theme = useTheme();
  const [currentDuration, setCurrentDuration] = useState(initialDuration);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentDuration(finalDuration);
    }, delayToSlow);

    return () => clearTimeout(timeout);
  }, [finalDuration, delayToSlow]);

  return (
    <Box
      sx={{
        width: containerWidth,
        height: containerHeight,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: `${containerHeight / 2}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        mx: "auto",
        mt: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        px: `${padding}px`,
        py: `${padding}px`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: `${gap}px`,
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <Box
            key={i}
            sx={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor: colors[i % colors.length],
              animation: `${wavePulse} ${currentDuration}s ease-in-out infinite`,
              animationDelay: `${(i * currentDuration) / count}s`,
              boxShadow: theme.shadows[2],
              transformOrigin: "center",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default WaveLoader;
