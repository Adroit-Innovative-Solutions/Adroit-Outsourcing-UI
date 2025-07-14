import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  useTheme,
  Divider,
} from "@mui/material";

const ConsultantProfile = () => {
  const theme = useTheme();

  const consultant = {
    consultantId: "CONS00113",
    name: "Issach Emani",
    emailId: "issachemani555@gmail.com",
    grade: "Senior",
    marketingContact: "+91 4646566464",
    personalContact: "+91 4434344343",
    reference: "Madhu",
    recruiter: "Anjali",
    teamLead: "Naveen Kumar B",
    status: "Available",
    location: "Hyderabad",
    experience: "8 Years",
    technology: "React, Node.js, Python",
  };

  const renderRow = (label, value) => (
    <>
      <Grid container spacing={2} sx={{ py: 1 }}>
        <Grid item xs={5} md={4}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs={7} md={8}>
          {label === "Status" ? (
            <Chip
              label={value}
              color={value === "Available" ? "success" : "default"}
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography variant="body1" color="text.primary">
              {value}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
    </>
  );

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 700,
        mx: "auto",
        mt: 6,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
          borderLeft: `6px solid ${theme.palette.primary.main}`,
          pl: 2,
          mb: 3,
        }}
      >
        Consultant Profile
      </Typography>

      <Box>
        {renderRow("Consultant ID", consultant.consultantId)}
        {renderRow("Name", consultant.name)}
        {renderRow("Email ID", consultant.emailId)}
        {renderRow("Grade", consultant.grade)}
        {renderRow("Marketing Contact", consultant.marketingContact)}
        {renderRow("Personal Contact", consultant.personalContact)}
        {renderRow("Reference", consultant.reference)}
        {renderRow("Recruiter", consultant.recruiter)}
        {renderRow("Team Lead", consultant.teamLead)}
        {renderRow("Status", consultant.status)}
        {renderRow("Location", consultant.location)}
        {renderRow("Experience", consultant.experience)}
        {renderRow("Technology", consultant.technology)}
      </Box>
    </Paper>
  );
};

export default ConsultantProfile;
