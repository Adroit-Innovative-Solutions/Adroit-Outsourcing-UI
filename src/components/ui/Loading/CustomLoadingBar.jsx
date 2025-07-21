import React, { useEffect, useState } from "react";
import { Box, useTheme, keyframes } from "@mui/material";

// Rotation animation
const roll = keyframes`
  0% { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(360deg); }
`;

const BAR_WIDTH = 300;
const BALL_SIZE = 12;
const GAP = 20;
const SPEED = 2;
const DEFAULT_COUNT = 3;

const ballColors = ["#FF5722", "#2196F3", "#4CAF50", "#E91E63", "#FFC107", "#00BCD4"];

const CustomLoadingBar = ({ count = DEFAULT_COUNT }) => {
  const theme = useTheme();

  const generatePositions = (count, isLeft) =>
    Array.from({ length: count }, (_, i) =>
      isLeft ? 0 - i * GAP - BALL_SIZE : BAR_WIDTH + i * GAP
    );

  const [leftPositions, setLeftPositions] = useState(() => generatePositions(count, true));
  const [rightPositions, setRightPositions] = useState(() => generatePositions(count, false));
  const [direction, setDirection] = useState("inward");
  const [isCollided, setIsCollided] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftPositions((prev) =>
        prev.map((pos) => (direction === "inward" ? pos + SPEED : pos - SPEED))
      );
      setRightPositions((prev) =>
        prev.map((pos) => (direction === "inward" ? pos - SPEED : pos + SPEED))
      );
    }, 16);
    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const leftFirst = leftPositions[0];
    const rightFirst = rightPositions[0];

    if (direction === "inward" && rightFirst - leftFirst <= BALL_SIZE + 4) {
      setIsCollided(true);
      setTimeout(() => setDirection("outward"), 400);
    }

    if (
      direction === "outward" &&
      leftPositions[0] < 0 &&
      rightPositions[0] > BAR_WIDTH
    ) {
      setIsCollided(false);
      setDirection("inward");
    }
  }, [leftPositions, rightPositions, direction]);

  const getColor = (index) => ballColors[index % ballColors.length];

  return (
    <Box
      sx={{
        width: `${BAR_WIDTH}px`,
        height: `${BALL_SIZE * 2}px`,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        position: "relative",
        overflow: "hidden",
        mx: "auto",
        mt: theme.spacing(5),
        backgroundColor: theme.palette.background.paper,
        py: theme.spacing(1.5),
      }}
    >
      {/* Left balls */}
      {leftPositions.map((left, i) => (
        <Box
          key={`left-${i}`}
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left,
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: isCollided ? "2px" : "50%",
            backgroundColor: getColor(i),
            boxShadow: theme.shadows[2],
            transition: "all 0.3s ease",
            animation: isCollided ? `${roll} 0.4s linear infinite` : "none",
          }}
        />
      ))}

      {/* Right balls */}
      {rightPositions.map((left, i) => (
        <Box
          key={`right-${i}`}
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left,
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: isCollided ? "2px" : "50%",
            backgroundColor: getColor(i + count),
            boxShadow: theme.shadows[2],
            transition: "all 0.3s ease",
            animation: isCollided ? `${roll} 0.4s linear infinite` : "none",
          }}
        />
      ))}
    </Box>
  );
};

export default CustomLoadingBar;
