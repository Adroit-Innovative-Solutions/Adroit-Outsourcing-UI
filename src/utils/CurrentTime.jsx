import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CurrentTime = () => {
  const theme = useTheme();
  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

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
