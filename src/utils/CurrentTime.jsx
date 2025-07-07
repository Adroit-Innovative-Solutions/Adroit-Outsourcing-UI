import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CurrentTime = () => {
  const theme = useTheme();
  const [time, setTime] = useState("");


  //current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long", // <-- Add day
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formattedTime = now.toLocaleString("en-IN", options);
      setTime(formattedTime);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mr: 2 }}>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.primary.contrastText,
          fontWeight: 500,
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        ADIT0001
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.primary.contrastText,
          fontSize: "0.75rem",
        }}
      >
        {time}
      </Typography>
    </Box>
  );
};

export default CurrentTime;
