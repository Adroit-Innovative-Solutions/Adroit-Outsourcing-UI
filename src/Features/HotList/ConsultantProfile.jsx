import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  useTheme,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConsultantById,
  clearConsultant,
} from "../../store/slices/hotlistSlice";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ConsultantProfile = () => {
  const theme = useTheme();
  const { consultantId } = useParams();
  const dispatch = useDispatch();

  const { consultant, loading, error } = useSelector((state) => state.hotlist);

  console.log(consultantId);

  console.log(consultant);

  useEffect(() => {
    if (consultantId) {
      dispatch(fetchConsultantById(consultantId));
    }

    return () => {
      dispatch(clearConsultant());
    };
  }, [consultantId, dispatch]);

  const renderRow = (label, value) => (
    <Grid container spacing={1} sx={{ py: 1 }}>
      <Grid item xs={5} sm={4}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={7} sm={8}>
        {label === "Status" ? (
          <Chip
            label={value}
            color={value === "Available" ? "success" : "default"}
            size="small"
            variant="outlined"
          />
        ) : (
          <Typography variant="body1" color="text.primary">
            {value}
          </Typography>
        )}
      </Grid>
    </Grid>
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!consultant) return <Typography>No consultant found.</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, md: 5 },
        maxWidth: "100%",
        mx: "auto",
        mt: 1,
        borderRadius: 2,
        background: theme.palette.background.default,
      }}
    >
      {/* Header Section */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 64,
            height: 64,
            mr: 2,
            fontSize: 28,
          }}
        >
          {consultant.name?.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {consultant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {consultant.grade} Consultant
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Contact Section */}
      <Stack direction="row" spacing={3} alignItems="center" mb={3}>
        <EmailIcon color="action" />
        <Typography variant="body1">{consultant.emailId}</Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center" mb={3}>
        <PhoneIcon color="action" />
        <Typography variant="body1">{consultant.marketingContact}</Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center" mb={3}>
        <LocationOnIcon color="action" />
        <Typography variant="body1">{consultant.location}</Typography>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Details Section */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          borderLeft: `6px solid ${theme.palette.primary.main}`,
          pl: 2,
          mb: 2,
        }}
      >
        Consultant Details
      </Typography>

      <Box>
        {renderRow("Consultant ID", consultant.consultantId)}
        {renderRow("Experience", consultant.experience)}
        {renderRow("Technology", consultant.technology)}
        {renderRow("Personal Contact", consultant.personalContact)}
        {renderRow("Reference", consultant.reference)}
        {renderRow("Recruiter", consultant.recruiter)}
        {renderRow("Team Lead", consultant.teamLead)}
        {renderRow("Status", consultant.status)}
      </Box>
    </Paper>
  );
};

export default ConsultantProfile;
